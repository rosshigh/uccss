import { inject } from 'aurelia-framework';
import { DataTable } from '../../../resources/utils/dataTable';
import { AppConfig } from '../../../config/appConfig';
import { Utils } from '../../../resources/utils/utils';
import { People } from '../../../resources/data/people';
import { is4ua } from '../../../resources/data/is4ua';
import { CommonDialogs } from '../../../resources/dialogs/common-dialogs';
import Validation from '../../../resources/utils/validation';
import $ from 'jquery';

@inject(DataTable, AppConfig, People, Utils, is4ua, CommonDialogs, Validation)
export class EditPeople {
    personSelected = false;
    showCourses = false;
    courseSelected = false;
    showPassword = false;
    navControl = "peopleNavButtons";
    spinnerHTML = "";

    tabs = [{ id: 'Address' }, { id: 'Roles' }, { id: 'Courses' }, { id: 'Password' }, { id: 'is4ua' }];
    tabPath = './';

    constructor(datatable, config, people, utils, is4ua, dialog, validation) {
        this.dataTable = datatable;
        this.dataTable.initialize(this);
        this.config = config;
        this.utils = utils;
        this.people = people;
        this.is4ua = is4ua;
        this.dialog = dialog;
        this.validation = validation;
        this.validation.initialize(this);

        this.userObj = JSON.parse(sessionStorage.getItem('user'));
    }

    async activate() {
        let responses = await Promise.all([
            this.people.getPeopleArray(true, '?order=lastName'),
            this.people.getInstitutionsArray(true, '?order=name'),
            this.is4ua.loadIs4ua()
        ]);

        this.dataTable.updateArray(this.people.peopleArray);

        this.dataTable.createPageButtons(1);
    }

    attached() {
        $('[data-toggle="tooltip"]').tooltip();
        this._setupValidation();
    }

    async refresh() {
        this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
        await this.people.getPeopleArray(true, '?order=lastName');
        this.dataTable.updateArray(this.people.peopleArray);
        this.spinnerHTML = "";
    }

    edit(index, el) {
        this.editIndex = this.dataTable.getOriginalIndex(index);
        this.people.selectPerson(this.editIndex);
        this.oldEmail = this.people.selectedPerson.email;
        $("#editFirstName").focus();

        if (this.selectedRow) this.selectedRow.children().removeClass('info');
        this.selectedRow = $(el.target).closest('tr');
        this.selectedRow.children().addClass('info')
        this.personSelected = true;
    }

    async new() {
        this.editIndex = -1;
        this.people.selectPerson();
        this.oldEmail = this.people.selectedPerson.email;
        $("#editFirstName").focus();
        this.personSelected = true;
    }

    async save() {
        if (this.validation.validate(1)) {
            let serverResponse = await this.people.savePerson();
            if (!serverResponse.error) {
                this.dataTable.updateArray(this.people.peopleArray);
                this.utils.showNotification(serverResponse.firstName + " " + serverResponse.lastName + " was updated");
            }
            this.personSelected = false;
        }
    }

    delete() {
        return this.dialog.showMessage(
            "Are you sure you want to delete the person?",
            "Delete Person",
            ['Yes', 'No']
        ).then(response => {
            if (!response.wasCancelled) {
                this.deletePerson();
            }
        });
    }

    async deletePerson() {
        var name = this.people.selectedPerson.fullName;
        let serverResponse = await this.people.deletePerson();
        if (!serverResponse.error) {
            this.dataTable.updateArray(this.people.peopleArray);
            this.utils.showNotification(name + " was deleted");
        }
        this.personSelected = false;
    }

    cancel() {
        this.people.selectPerson(this.editIndex);
    }

    back() {
        if (this.people.isPersonDirty().length) {
            return this.dialog.showMessage(
                "The account has been changed. Do you want to save your changes?",
                "Save Changes",
                ['Yes', 'No']
            ).then(response => {
                if (!response.wasCancelled) {
                    this.save();
                } else {
                    this.personSelected = false;
                }
            });
        } else {
            this.personSelected = false;
        }

    }

    async checkEmail() {
        if(this.oldEmail != this.people.selectedPerson.email){
            if (await this.people.checkEmail()) {
                this.duplicateAccount = true;
                this.validation.validate(4);
            } else {
                this.duplicateAccount = false;
                this.validation.makeValid($("#register_email"));
            }
        }
    }

    async openEditCourseForm() {
        if (!this.showCourses) await this.refreshCourses();
        this.showCourses = !this.showCourses;
    }

    async refreshCourses() {
        await this.people.getCoursesArray(true, '?filter=personId|eq|' + this.people.selectedPerson._id + '&order=number');
    }

    editACourse(index, el) {
        this.editCourseIndex = index;
        this.people.selectCourse(this.editCourseIndex);

        $("#number").focus();

        if (this.selectedCourseRow) this.selectedCourseRow.children().removeClass('info');
        this.selectedCourseRow = $(el.target).closest('tr');
        this.selectedCourseRow.children().addClass('info')
        this.courseSelected = true;
    }

    newCourse() {
        this.editCourseIndex = -1;
        this.people.selectCourse();
        $("#number").focus();
        this.editCourse = true;
        this.courseSelected = true;
    }

    async saveCourse() {
        if (this.validation.validate(2, this)) {
            if (this.people.selectedPerson._id) {
                this.people.selectedCourse.personId = this.people.selectedPerson._id;
                let serverResponse = await this.people.saveCourse();
                if (!serverResponse.error) {
                    this.utils.showNotification("The course was updated");
                }
                this.courseSelected = false;
            }
        }
    }

    cancelEditCourse() {
        this.courseSelected = false;
    }

    openEditPasswordForm() {
        this.showPassword = true;
    }

    cancelEditPassword() {
        this.newPassword = "";
        this.newPassword_repeat = "";
        this.showPassword = false;
    }

    async savePassword() {
        this.newPassword = $("#newPassword").val();
        if (this.validation.validate(3, this)) {
            var obj = {
                password: this.newPassword
            }
            let response = await this.people.updatePassword(obj);
            if (!response.status) {
                this.utils.showNotification("The password was updated");
            }
            this.showPassword = false;
        }
    }

    copyInstAddress() {
        if (this.people.selectedPerson.institutionId) {
            this.people.selectInstitutionByID(this.people.selectedPerson.institutionId);
            if (this.people.selectedInstitution._id) {
                this.people.selectedPerson.address1 = this.people.selectedInstitution.address1;
                this.people.selectedPerson.address2 = this.people.selectedInstitution.address2;
                this.people.selectedPerson.city = this.people.selectedInstitution.city;
                this.people.selectedPerson.region = this.people.selectedInstitution.region;
                this.people.selectedPerson.postalCode = this.people.selectedInstitution.postalCode;
                this.people.selectedPerson.country = this.people.selectedInstitution.country;
                this.people.selectedPerson.POBox = this.people.selectedInstitution.POBox;
            }
        }
    }

    _setupValidation() {
        this.validation.addRule(1, "editFirstName", { "rule": "required", "message": "First name is required", "value": "people.selectedPerson.firstName" });
        this.validation.addRule(1, "editLastName", { "rule": "required", "message": "Last name is required", "value": "people.selectedPerson.lastName" });
        this.validation.addRule(1, "editStatus", { "rule": "required", "message": "Status is required", "value": "people.selectedPerson.personStatus" });
        this.validation.addRule(1, "editEmail", { "rule": "required", "message": "Email is required", "value": "people.selectedPerson.email" });
        this.validation.addRule(1, "editEmail", {
            "rule": "custom", "message": "An account with that email exists",
            "valFunction": function (context) {
                return !context.duplicateAccount;
            }
        });
        this.validation.addRule(1, "editInstitution", { "rule": "required", "message": "Institution is required", "value": "people.selectedPerson.institutionId" });
        this.validation.addRule(1, "editRoles", {
            "rule": "custom", "message": "The person must be assigned a role.",
            "valFunction": function (context) {
                return (context.people.selectedPerson.roles.length > 0);
            }
        });
        this.validation.addRule(2, "number", { "rule": "required", "message": "Course number is required", "value": "people.selectedCourse.number" });
        this.validation.addRule(2, "name", { "rule": "required", "message": "Course name is required", "value": "people.selectedCourse.name" });
        this.validation.addRule(3, "password", { "rule": "required", "message": "Password is required", "value": "newPassword" });
        this.validation.addRule(4, "editEmail", {
            "rule": "custom", "message": "An account with that email exists",
            "valFunction": function (context) {
                return !context.duplicateAccount;
            }
        });
    }

    _cleanUpFilters() {
        $("#lastName").val("");
        $("#institutionId").val("");
        $("#roles").val("");
        $("#personStatus").val("");
    }

    async changeTab(el, index) {
        $("#peopleFormListGroup.list-group").children().removeClass('active');
        var target = $(el.target);
        if (target.is('a')) target = $(target.children()[0]);
        target.parent().addClass('active');
        $(".in").removeClass('active').removeClass('in');
        $("#" + target.html() + "Tab").addClass('in').addClass('active');
        switch (target.attr('id')) {
            case 'Courses':
                await this.refreshCourses();
                break;
        }
    }

}
