import { inject } from 'aurelia-framework';
import { ValidationRules, ValidationControllerFactory, validationMessages } from 'aurelia-validation';
import { People } from '../../../resources/data/people';
import { is4ua } from '../../../resources/data/is4ua';
import { AppConfig } from '../../../appConfig';
import { Utils } from '../../../resources/utils/utils';

@inject(ValidationControllerFactory, People, is4ua, AppConfig, Utils)
export class EditPeople {

    pageSize = 200;
    defaultPhoneMask = "999-999-9999";

    constructor(ValidationControllerFactory, people, is4ua, config, utils) {
        this.controller = ValidationControllerFactory.createForCurrentScope();
        this.people = people;
        this.is4ua = is4ua;
        this.config = config;
        this.utils = utils;

        this.filters = [
            { value: '', custom: this.filterName },
            { value: '', custom: this.filterInstiutionName },
            { value: '', keys: ['email'] },
            { value: '', keys: ['roles'] },
            { value: '', keys: ['phone'] }
        ];

        this.screenHeight = $(window).height();

        this.validationErrors = [];

        this.view = 'table';
    }

    filterName(filterValue, row) {
        if (filterValue === null || filterValue === undefined || filterValue === "") return true;
        let filterVal = filterValue.toUpperCase();
        return (row.fullName !== null && row.fullName.toUpperCase().indexOf(filterVal) > -1) || (row.nickName && row.nickName !== null && row.nickName.toUpperCase().indexOf(filterVal) > -1);
    }

    filterInstiutionName(filterValue, row) {
        if (filterValue === null || filterValue === undefined || filterValue === "") return true;
        return row.institutionId !== null && row.institutionId.name.toUpperCase().indexOf(filterValue.toUpperCase()) > -1;
    }

    async activate() {
        $("#loading").show();
        let responses = await Promise.all([
            this.people.getPeopleArray('?order=lastName&filter=personStatus|eq|01'),
            this.is4ua.loadIs4ua(),
            this.people.getInstitutionArray('?order=name')
        ]);
        $("#loading").hide();
    }

    attached() {
        $("#loading").hide();
        var $th = $('.tableFixHead').find('thead th')
        $('.tableFixHead').on('scroll', function () {
            $th.css('transform', 'translateY(' + this.scrollTop + 'px)');
        });
        $('#filterField').focus();
        $('[data-toggle="tooltip"]').tooltip();
        // $('.selectpicker').selectpicker();
    }

    async refresh() {
        $('#loading').show();
        if (this.loadStatus === "03") {
            await this.people.getPeopleArray('?order=lastName');
        } else {
            await this.people.getPeopleArray('?order=lastName&filter=personStatus|eq|' + this.loadStatus);
        }
        $('#loading').hide();
    }

    institutionName(row) {
        if (row.institutionId !== null) {
            return row.institutionId.name;
        } else {
            return null;
        }
    }

    sortInstitutionName(a, b, sortOrder) {

        if (a.institutionId == null || b.institutionId == null) {
            return -1 * sortOrder;
        }

        let name1 = a.institutionId.name;
        let name2 = b.institutionId.name;

        if (name1 === name2) {
            return 0;
        }

        if (name1 > name2) {
            return 1 * sortOrder;
        }

        return -1 * sortOrder;
    }

    new() {
        this.people.selectPerson();
        // this.refreshSelects();
        this.createValidationRules();
        this.getPhoneMask();
        this.filterRoles();
        // this.utils.refreshSelect("#editStatus", this.is4ua.personStatusArray, "code", this.people.selectedPerson.personStatus);
        this.view = 'form';
    }

    async edit(person) {
        this.selectedPersonId = person._id;
        await this.people.getPerson(this.selectedPersonId);
        // this.refreshSelects();
        this.createValidationRules();
        this.getPhoneMask();
        this.filterRoles();
        this.view = 'form';
    }

    refreshSelects() {
        this.utils.refreshSelect("#editStatus", this.is4ua.personStatusArray, "code", this.people.selectedPerson.personStatus);
        this.utils.refreshSelect("#institutionSelect", this.people.institutionsArray, "_id", this.people.selectedPerson.institutionId);
        this.utils.refreshSelect("#specializationSelect", this.is4ua.specialArray, "code", this.people.selectedPerson.personSpecialization);
        this.utils.refreshSelect("#departmentSelect", this.is4ua.deptArray, "code", this.people.selectedPerson.departmentCategory);
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
                    $("#fixCustomerErrorsModal").modal('show');
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
            $("#fixCustomerErrorsModal").modal('show');
        }
    }

    async deletePerson() {
        this.modalMessage = 'Are you sure you want to delete this person?';
        $("#confirmDeleteModal").modal('show');
    }

    async delete() {
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
            this.modalMessage = 'Do you want to save the person?';
            $("#confirmSaveModal").modal('show');
        } else {
            this.goBack();
        }
    }

    goBack() {
        this.view = 'table';
    }

    cancel() {
        this.people.selectedPersonById(this.people.selectedPerson._id);
    }

    filterPeopleArray() {
        this.downLoadArray = [];
        let keep;
        let nameFilter = this.filters[0].value.toUpperCase();
        let instFilter = this.filters[1].value.toUpperCase();
        let emailFilter = this.filters[2].value.toUpperCase();
        let rolesFilter = this.filters[3].value.toUpperCase();
        this.people.peopleArray.forEach(item => {
            keep = false;
            if (nameFilter.length) {
                keep = (item.fullName !== null && item.fullName.toUpperCase().indexOf(nameFilter) > -1) || (item.nickName !== undefined && item.nickName !== null && item.nickName.toUpperCase().indexOf(nameFilter) > -1);
            } else {
                keep = true;
            }
            if (keep) this.downLoadArray.push(item);
        });
        if (instFilter.length) {
            this.downLoadArray = this.downLoadArray.filter(item => {
                return item.institutionId !== null && item.institutionId.name.toUpperCase().indexOf(instFilter) > -1;

            })
        }
        if (emailFilter.length) {
            this.downLoadArray = this.downLoadArray.filter(item => {
                return item.email !== null && item.email.toUpperCase().indexOf(emailFilter) > -1;

            })
        }
        if (rolesFilter.length) {
            this.downLoadArray = this.downLoadArray.filter(item => {
                return item.roles !== null && item.roles.indexOf(rolesFilter) > -1;

            })
        }

    }

    fnExcelReport() {
        this.filterPeopleArray();
        var tab_text = "<table><tr><th>First Name</th><th>Last Name</th><th>Email</th><th>Phone</th><th>Institution</th><th>Country</th><th>Region</th><th>Status</th><th>Roles</th></tr><tr>";

        this.downLoadArray.forEach(item => {
            if (item.institutionId === null) item.institutionId = { name: "" };
            let isActive = item.personStatus == '01' ? 'Active' : 'Inactive';
            tab_text = tab_text + "<td>" + item.firstName + "</td>"
                + "<td>" + item.lastName + "</td>"
                + "<td>" + item.email + "</td>"
                + "<td>" + item.phone + "</td>"
                + "<td>" + item.institutionId.name + "</td>"
                + "<td>" + item.country + "</td>"
                + "<td>" + item.region + "</td>"
                + "<td>" + isActive + "</td>"
                + "<td>" + item.roles.join(":") + "</td></tr>";
        });

        tab_text = tab_text + "</table>";

        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");

        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
            txtArea1.document.open("txt/html", "replace");
            txtArea1.document.write(tab_text);
            txtArea1.document.close();
            txtArea1.focus();
            sa = txtArea1.document.execCommand("SaveAs", true, "people.xls");
        } else {
            var link = document.createElement('a');
            link.download = "people.xls";
            link.href = 'data:application/vnd.ms-excel,' + encodeURIComponent(tab_text);
            link.click();
        }
    }

    clearFilters() {
        this.filters.forEach(item => {
            item.value = "";
            $('#filterField').focus();
        })
    }

    _cleanUp() {
        this.institutionId = "";
        this.clearFilters();
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
        if (!this.newPassword.length) {
            this.addValidationError('You must enter a password.', this.newPassword.length === 0);
        }

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
