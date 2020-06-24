import { inject } from 'aurelia-framework';
import { ValidationRules, ValidationControllerFactory, validationMessages } from 'aurelia-validation';
import { People } from '../../../resources/data/people';
import { is4ua } from '../../../resources/data/is4ua';
import { AppConfig } from '../../../appConfig';
import { Store } from '../../../store/store';
import { Utils } from '../../../resources/utils/utils';
import Validation from '../../../resources/utils/validation';

@inject(ValidationControllerFactory, People, is4ua, AppConfig, Store, Utils, Validation)
export class EditPeople {

    pageSize = 50;
    defaultPhoneMask = "999-999-9999";

    constructor(ValidationControllerFactory, people, is4ua, config, store, utils, validation) {
        this.controller = ValidationControllerFactory.createForCurrentScope();
        this.people = people;
        this.is4ua = is4ua;
        this.config = config;
        this.store = store;
        this.utils = utils;
        this.validation = validation;

        this.configParameters = this.store.getConfig();

        this.filters = [
            { value: '', keys: ['fullName', 'institutionId.name', 'email', 'roles'] },
            { value: this.config.ACTIVE_PERSON, keys: ['personStatus'] }
        ];

        this.validationErrors = [];

        this.view = 'table';
    }

    async activate() {
        let responses = await Promise.all([
            this.people.getPeopleArray('?order=lastName'), //PLATFORM.moduleName('./value-converters/phone-number')
            this.is4ua.loadIs4ua(),
            this.people.getInstitutionsArray('?order=name')
        ]);
    }

    attached() {
        $('#filterField').focus();
        $('[data-toggle="tooltip"]').tooltip();
    }

    async refresh() {
        this.clearFilters();
        $('#loading').show();
        await this.people.getPeopleArray('?order=lastName'), //&filter=personStatus|eq|01
            $('#loading').hide();
    }

    new() {
        this.people.selectPerson();
        this.createValidationRules();
        this.getPhoneMask();
        this.view = 'form';
    }

    async edit(person) {
        this.selectedPersonId = person._id;
        await this.people.getPerson(person._id);
        this.createValidationRules();
        this.getPhoneMask();
        this.filterRoles();
        this.view = 'form';
    }

    createValidationRules() {

        validationMessages['required'] = 'You must enter \${$displayName}.'
        ValidationRules
            .ensure('firstName').displayName('a First Name').required()
            .ensure('lastName').displayName('a Last Name').required()
            .ensure('email').displayName('an eMail').required()
            .ensure('phone').displayName('a Phone Number').required().minLength(10)
            .ensure('mobile').displayName('a mobile Number').minLength(10)
            .ensure('personStatus').displayName('a Status').required()
            .ensure('institutionId').displayName('an institution').required()
            .on(this.people.selectedPerson);

        ValidationRules
            .ensure('newPassword').displayName('Password').required()
    }

    async save() {
        this.controller.validate()
            .then(result => {
                if (result.valid) {
                    this.savePerson();
                } else {
                    $("#fixErrors").modal();
                }
            });
    }

    async savePerson() {
        this.localValidation()
        if (this.validationErrors.length === 0) {
            let serverResponse = await this.people.savePerson();
            if (!serverResponse.error) {
                this.utils.showNotification(serverResponse.firstName + " " + serverResponse.lastName + " was updated");
                this.refresh();
            } else {
                this.utils.showNotification("There was a problem saving the person", 'error');
            }
            this._cleanUp();
        } else {
            $("#fixErrors").modal();
        }
    }

    delete() {
        return this.dialog.showMessage(
            "Are you sure you want to delete the person?",
            "Delete Person",
            ['Yes', 'No']
        ).whenClosed(response => {
            if (!response.wasCancelled) {
                this.deletePerson();
            }
        });
    }

    async deletePerson() {
        var name = this.people.selectedPerson.fullName;
        let serverResponse = await this.people.deletePerson();
        if (!serverResponse.error) {
            this.utils.showNotification(name + " was deleted");
            this.refresh();
        }
        this._cleanUp();
    }

    back() {
        if (this.people.isPersonDirty(this.people.selectedPerson).length) {
            $("#personChanged").modal()
        } else {
            this.goBack();
        }
    }

    goBack() {
        this.view = 'table';
    }

    cancel() {
        this.people.selectedPersonById(this.selectedPersonId);
    }

    downloadInstExcel() {
        let csvContent = "data:text/csv;charset=utf-8;,First Name,Last Name,Email,Phone,Institution,Country,Region,Status,Roles\r\n";
        this.dataTable.baseArray.forEach(item => {
            let isActive = item.personStatus == '01' ? 'Active' : 'Inactive';
            csvContent += item.firstName + ","
                + item.lastName.replace(',', ' ') + ","
                + item.email + ","
                + item.phone + ","
                + item.institutionId.name.replace(",", " ") + ","
                + item.country + ","
                + item.region + ","
                + isActive + ","
                + item.roles.join(":");
            csvContent += "\r\n";
        })
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "people.csv");
        document.body.appendChild(link); // Required for FF

        link.click();
    }
  
    clearFilters() {
        this.filters[0].value = "";
        this.filters[1].value = this.config.ACTIVE_PERSON;
        $('#filterField').focus();
    }

    _cleanUp() {
        this.institutionId = "";
        this.clearFilters();
        // this.validation.makeAllValid(1);
        this.goBack();
    }

    //Validation
    localValidation() {
        this.checkDuplicateRecord();
    }

    checkDuplicateRecord() {
        var found = false;
        for (var i = 0; i < this.people.peopleArray.length; i++) {
            if (this.people.peopleArray[i].firstName.trim().toUpperCase() === this.people.selectedPerson.firstName.trim().toUpperCase()
                && this.people.peopleArray[i].lastName.trim().toUpperCase() === this.people.selectedPerson.lastName.trim().toUpperCase()
                && this.people.peopleArray[i].institutionId._id === this.people.selectedPerson.institutionId) {
                if (this.people.selectedPerson._id && this.people.selectedPerson._id != this.people.peopleArray[i]._id) {
                    found = true;
                } else if (!this.people.selectedPerson._id) {
                    found = true;
                }
            }
        }
        this.addValidationError('A person with that name at that institution already exists.', found);
    }

    checkPasswordBlank() {
        this.newPassword = $("#newPassword").val();
        this.addValidationError('You must enter a password.', this.newPassword.length === 0);
    }

    addValidationError(msg, add) {
        if (add) {
            if (this.validationErrors.indexOf(msg) === -1) {
                this.validationErrors.push(msg);
            }
        } else {
            let msgIndex = this.validationErrors.indexOf(msg);
            if (msgIndex > -1) {
                this.validationErrors.splice(msgIndex, 1);
            }
        }
    }

    //Specifically editPerson
    async toggleStatus(id, personStatus){
        if(id && personStatus){
            this.people.selectedPersonById(id);
            this.people.selectedPerson.personStatus = personStatus === this.config.ACTIVE_PERSON ? this.config.INACTIVE_PERSON : this.config.ACTIVE_PERSON;
            let serverResponse = await this.people.savePerson();
            if (!serverResponse.error) {
                this.utils.showNotification(serverResponse.firstName + " " + serverResponse.lastName + " was updated");
            } else {
                this.utils.showNotification("There was a problem saving the person",'error');
            }
        } 
    }

    async copyInstAddress() {
        if (this.people.selectedPerson.institutionId) {
            await this.people.getInstitution(this.people.selectedPerson.institutionId);
            this.people.selectedPerson.address1 = this.people.selectedInstitution.address1;
            this.people.selectedPerson.address2 = this.people.selectedInstitution.address2;
            this.people.selectedPerson.city = this.people.selectedInstitution.city;
            this.people.selectedPerson.region = this.people.selectedInstitution.region;
            this.people.selectedPerson.postalCode = this.people.selectedInstitution.postalCode;
            this.people.selectedPerson.country = this.people.selectedInstitution.country;
            this.people.selectedPerson.POBox = this.people.selectedInstitution.POBox;
            this.getPhoneMask();
        }
    }

    getPhoneMask() {
        this.phoneMask = this.defaultPhoneMask;
        setTimeout(() => {
            for (let i = 0; i < this.config.PHONE_MASKS.length; i++) {
                if (this.people.selectedPerson.country === this.config.PHONE_MASKS[i].country) {
                    this.phoneMask = this.config.PHONE_MASKS[i].mask;
                    break;
                }
            }
        }, 500)
    }

    filterRoles() {
        this.filteredArray = this.configParameters.ROLES.filter(item => {
            return this.people.selectedPerson.roles.indexOf(item.role) === -1;
        });
        if (this.filteredArray.length === 0) this.filteredArray.push({ role: "NOROLE", label: "No Roles Remaining" });
    }

    selectRole(event, role) {
        if (role.role === 'NOROLE') return;
        this.people.selectedPerson.roles.push(role.role);
        this.filterRoles();
    }

    removeRole(index, role) {
        this.people.selectedPerson.roles.splice(index, 1);
        this.filterRoles();
    }

    cancelEditPassword() {
        this.newPassword = "";
        this.newPassword_repeat = "";
        this.showPassword = false;
    }

    async savePassword() {
        // this.newPassword = $("#newPassword").val();
        // if (this.validation.validate(3, this)) {
        this.checkPasswordBlank();
        if (this.validationErrors.length === 0) {
            var obj = {
                password: this.newPassword
            }
            let response = await this.people.updatePassword(obj);
            if (!response.error) {
                this.utils.showNotification("The password was updated");
                this.newPassword = "";
            }
        }
    }
}