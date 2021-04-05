import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { ValidationRules, ValidationControllerFactory, validationMessages } from 'aurelia-validation';
import { People } from '../../../resources/data/people';
import { is4ua } from '../../../resources/data/is4ua';
import { AppConfig } from '../../../appConfig';
import { Utils } from '../../../resources/utils/utils';

@inject(Router, ValidationControllerFactory, People, is4ua, AppConfig, Utils)
export class EditPerson {

    pageSize = 200;
    defaultPhoneMask = "999-999-9999";

    constructor(router, ValidationControllerFactory, people, is4ua, config, utils) {
        this.router = router;
        this.controller = ValidationControllerFactory.createForCurrentScope();
        this.people = people;
        this.is4ua = is4ua;
        this.config = config;
        this.utils = utils;

        this.validationErrors = [];
    }

    async activate(params, routeConfig) {

        $("#loading").show();
        this.selectedPersonId = params.id;
        await this.people.getPerson(this.selectedPersonId);
        // let responses = await Promise.all([
        //     this.people.getPeopleArray('?order=lastName&filter=personStatus|eq|01'),
        //     this.is4ua.loadIs4ua(),
        //     this.people.getInstitutionArray('?order=name')
        // ]);
        $("#loading").hide();
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
                    let message = 'You must fix the errors before you can save the system?';
                    let title = "Fix Errors";
                    let options = ['Ok'];
                    this.dialog.open({ viewModel: MessageDialog, model: { message, title, options }, lock: false }).whenClosed(response => {
                        return;
                    });
                }
            });
    }

    async savePerson() {
        this.localValidation()
        if (this.validationErrors.length === 0) {
            let serverResponse = await this.people.savePerson();
            if (!serverResponse.error) {
                this.utils.updateArrayItem(serverResponse, this.people.peopleArray);
                this.utils.showNotification(serverResponse.firstName + " " + serverResponse.lastName + " was updated");
                this.refresh();
            } else {
                this.utils.showNotification("There was a problem saving the person", 'error');
            }
            this._cleanUp();
        } else {
            let message = 'You must fix the errors before you can save the system?';
            let title = "Fix Errors";
            let options = ['Ok'];
            this.dialog.open({ viewModel: MessageDialog, model: { message, title, options }, lock: false }).whenClosed(response => {
                return;
            });
        }
    }

    async delete() {
        let message = 'Are you sure you want to delete this person?';
        let title = "Confirm Delete";
        let options = {};
        this.dialog.open({ viewModel: ConfirmDialog, model: { message, title, options }, lock: false }).whenClosed(response => {
            if (!response.wasCancelled) {
                this.deletePersion();
            } else {
                this.goBack();
            }
        });
    }

    async deletePersion() {
        var name = this.people.selectedPerson.fullName;
        let serverResponse = await this.people.deletePerson();
        if (!serverResponse.error) {
            this.utils.showNotification(name + " was deleted");
            this.refresh();
        }
        this._cleanUp();
    }

    back() {
        // if (this.people.isPersonDirty(this.people.selectedPerson).length) {
        //     let message = 'Do you want to save the system?';
        //     let title = "Save System";
        //     let options = {};
        //     this.dialog.open({ viewModel: ConfirmDialog, model: { message, title, options }, lock: false }).whenClosed(response => {
        //         if (!response.wasCancelled) {
        //             this.save();
        //         } else {
        //             this.goBack();
        //         }
        //     });
        // } else {
            this.goBack();
        // }
    }

    goBack() {
        this.router.navigateBack()
    }

    cancel() {
        this.people.selectedPersonById(this.people.selectedPerson._id);
    }

 

    clearFilters() {
        this.filters[0].value = "";
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
    async toggleStatus(id, personStatus, event) {
        event.stopPropagation();
        if (id && personStatus) {
            this.people.selectedPersonById(id);
            this.people.selectedPerson.personStatus = personStatus === this.config.ACTIVE_PERSON ? this.config.INACTIVE_PERSON : this.config.ACTIVE_PERSON;
            let serverResponse = await this.people.savePerson();
            if (!serverResponse.error) {
                this.utils.updateArrayItem(serverResponse, this.people.peopleArray);
                this.utils.showNotification(serverResponse.firstName + " " + serverResponse.lastName + " was updated");
            } else {
                this.utils.showNotification("There was a problem saving the person", 'error');
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
        this.filteredArray = this.config.ROLES.filter(item => {
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

    copyEmail(person, event) {
        event.stopPropagation();
        const el = document.createElement('textarea');
        el.value = person.email;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        this.utils.showNotification('Email copied')
    }
}
