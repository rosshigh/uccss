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
    customerEmail = false;
    emailSubject = "";
    emailMessage = "";
    navControl = "peopleNavButtons";
    spinnerHTML = "";

    tabs = [{ id: 'Address' }, { id: 'Roles' }, { id: 'Courses' }, { id: 'Password' }, { id: 'Audit' },{id: "Email"}];
    tabPath = './';
//, { id: 'is4ua' }

    toolbar = [
		['style', ['style', 'bold', 'italic', 'underline','clear']],
		['color', ['color']],
		['font', ['strikethrough', 'superscript', 'subscript']],
		['layout', ['ul', 'ol', 'paragraph']],
		['insert', [ 'link', 'table', 'hello']],
		['misc', ['undo', 'redo', 'fullscreen', 'codeview']]
	];
    
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
            this.people.getPeopleArray('?order=lastName&filter=personStatus|eq|01'),
            this.people.getInstitutionsArray('?order=name', true),
            this.is4ua.loadIs4ua(),
            this.config.getConfig()
        ]);
        this.activeFilterValue = "01";
        this.filteredArray = this.config.ROLES;
        this.dataTable.updateArray(this.people.peopleArray);
    }

    async filterActive(){
        await this.people.getPeopleArray('?order=lastName&filter=personStatus|eq|' + this.activeFilterValue, true);
        this.dataTable.updateArray(this.people.peopleArray);
    }

    attached() {
        $('[data-toggle="tooltip"]').tooltip();
        this._setupValidation();
    }

    async refresh() {
        this._cleanUpFilters();
        this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
        await this.people.getPeopleArray('?order=lastName&filter=personStatus|eq|01', true),
        this.dataTable.updateArray(this.people.peopleArray);
        this.spinnerHTML = "";
    }

    edit(index, el) {
        this.editIndex = this.dataTable.getOriginalIndex(index);
        this.people.selectPerson(this.editIndex);
        this.oldEmail = this.people.selectedPerson.email;
        this.institutionId = this.people.selectedPerson.institutionId;
        this.orginalObject = this.people.selectedPerson;
        this.filterRoles();
        this.newPerson = false;
        $("#editFirstName").focus();

        if (this.selectedRow) this.selectedRow.children().removeClass('info');
        this.selectedRow = $(el.target).closest('tr');
        this.selectedRow.children().addClass('info')
        this.personSelected = true;
    }

    async new() {
        this.editIndex = -1;
        this.people.selectPerson();
        this.newPerson = true;
        this.oldEmail = this.people.selectedPerson.email;
        $("#editFirstName").focus();
        this.personSelected = true;
    }

    filterRoles(){
        this.filteredArray = this.config.ROLES.filter(item =>{
            return this.people.selectedPerson.roles.indexOf(item.role) === -1;
		});
		if(this.filteredArray.length === 0) this.filteredArray.push({role: "NOROLE", label: "No Roles Remaining"});
    }

    selectRole(event, role){
        if(role.role === 'NOROLE') return;
        this.people.selectedPerson.roles.push(role.role);
        this.filterRoles();
    }

    removeRole(index, role){
        this.people.selectedPerson.roles.splice(index,1);
        this.filterRoles();
    }

    buildAudit(){
        var changes = this.people.isPersonDirty(this.orginalObject);
        changes.forEach(item => {
            this.people.selectedPerson.audit.push({
                 property: item.property,
                eventDate: new Date(),
                oldValue: item.oldValue,
                newValue: item.newValue,
                personId: JSON.parse(sessionStorage.getItem('user'))._id
            })
        });
    }

    async save() {
        if (this.validation.validate(1)) {
            if(this.people.selectedPerson._id){
                this.buildAudit();
            } else {
                this.people.selectedPerson.institutionId = this.institutionId;
            }
            let serverResponse = await this.people.savePerson();
            if (!serverResponse.error) {
                this.dataTable.updateArray(this.people.peopleArray);
                this.utils.showNotification(serverResponse.firstName + " " + serverResponse.lastName + " was updated");
            } else {
                 this.utils.showNotification("There was a problem saving the person");
            }
            this._cleanUp();
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
        if (this.people.isPersonDirty(this.orginalObject).length) {
            return this.dialog.showMessage(
                "The account has been changed. Do you want to save your changes?",
                "Save Changes",
                ['Yes', 'No']
            ).then(response => {
                if (!response.wasCancelled) {
                    this.save();
                } else {
                     this.personSelected = false;
                    // this._cleanUp();
                }
            });
        } else {
             this.personSelected = false;
            // this._cleanUp();
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

    changeInstitution(){
        if(this.people.selectedPerson._id){
            return this.dialog.showMessage(
                "Are you sure you want to change the institution? This should normally only be done if the account was created in the wrong institution.  If the user has changed institutions, create a new account." ,
                "Change Institution",
                ['Yes', 'No']
            ).then(response => {
                if (!response.wasCancelled) {
                    this.people.selectedPerson.institutionId = this.institutionId;
                } else {
                    this.institutionId = this.people.selectedPerson.institutionId;
                }
            });
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
        if (this.validation.validate(2)) {
            if (this.people.selectedPerson._id) {
                this.people.selectedCourse.personId = this.people.selectedPerson._id;
                let serverResponse = await this.people.saveCourse();
                if (!serverResponse.error) {
                    this.utils.showNotification("The course was updated");
                }
                this._cleanUp();
                // this.courseSelected = false;
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
            if (!response.error) {
                this.utils.showNotification("The password was updated");
                $("#newPassword").val("");
                this.newPassword = "";
            }
            this.showPassword = false;
        }
    }

    copyInstAddress() {
        if (this.institutionId) {
            this.people.selectInstitutionByID(this.institutionId);
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

    _cleanUp(){
        this.institutionId = "";
        this.personSelected = false;
        this.newPerson = false;
        this. _cleanUpFilters();
        this.validation.makeAllValid(1);
    }

    _setupValidation() {
        this.validation.addRule(1, "editFirstName", [{ "rule": "required", "message": "First name is required", "value": "people.selectedPerson.firstName" },
         {"rule":"custom", "message":"A person with that name at that institution already exists",
            "valFunction":function(context){
                var found = false;
                for(var i = 0; i < context.people.peopleArray.length; i++){
                    if( context.people.peopleArray[i].firstName.toUpperCase() === context.people.selectedPerson.firstName.toUpperCase()
                        && context.people.peopleArray[i].lastName.toUpperCase() === context.people.selectedPerson.lastName.toUpperCase()
                        && context.people.peopleArray[i].institutionId === context.people.selectedPerson.institutionId){
                        if(context.people.selectedPerson._id && context.people.selectedPerson._id != context.people.peopleArray[i]._id){
                            found = true;
                        } else if (!context.people.selectedPerson._id){
                            found = true;
                        }
                    }
                }
                return !found;
            }}]);
        this.validation.addRule(1, "editLastName", [{ "rule": "required", "message": "Last name is required", "value": "people.selectedPerson.lastName" }]);
        this.validation.addRule(1, "editStatus", [{ "rule": "required", "message": "Status is required", "value": "people.selectedPerson.personStatus" }]);
        this.validation.addRule(1, "editPhone", [{ "rule": "required", "message": "Phone number is required", "value": "people.selectedPerson.phone" },
        {"rule":"length","message":"Phone number isn't valid", "value": "people.selectedPerson.phone","ruleValue": 10}]);
          this.validation.addRule(1,"editMobile",[{"rule":"length","message":"Phone number isn't valid", "value": "people.selectedPerson.mobile","ruleValue": 10}]);
        this.validation.addRule(1, "editEmail", [{ "rule": "required", "message": "Email is required", "value": "people.selectedPerson.email" },
            {"rule": "custom", "message": "An account with that email exists",
                "valFunction": function (context) {
                    return !context.duplicateAccount;
                }
            },
            {"rule":"custom","message":"Enter a valid email address",
                "valFunction":function(context){
                    return ( /^[a-z0-9]+([-._][a-z0-9]+)*@([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,4}$/.test(context.people.selectedPerson.email));
                }
            }]);
        this.validation.addRule(1, "editInstitution", [{ "rule": "required", "message": "Institution is required", "value": "institutionId" }]);
        this.validation.addRule(1, "editRoles", [{
            "rule": "custom", "message": "The person must be assigned a role.",
            "valFunction": function (context) {
                return (context.people.selectedPerson.roles.length > 0);
            }
        }]);
        this.validation.addRule(2, "number", [{ "rule": "required", "message": "Course number is required", "value": "people.selectedCourse.number" }]);
        this.validation.addRule(2, "name", [{ "rule": "required", "message": "Course name is required", "value": "people.selectedCourse.name" }]);
        this.validation.addRule(3, "password", [{ "rule": "required", "message": "Password is required", "value": "newPassword" }]);
        this.validation.addRule(4, "editEmail", [{
            "rule": "custom", "message": "An account with that email exists",
            "valFunction": function (context) {
                return !context.duplicateAccount;
            }
        },
            {"rule":"custom","message":"Enter a valid email address",
                "valFunction":function(context){
                    return (/^\w+([\.-]?\ w+)*@\w+([\.-]?\ w+)*(\.\w{2,3})+$/.test(context.people.selectedPerson.email));
                }
            }]);
    }

    _clearFilters(){
        this._cleanUpFilters();
        this.dataTable.updateArray(this.people.peopleArray);
    }

    _cleanUpFilters() {
        $("#fullName").val("");
        $("#institutionId-name").val("");
        $("#roles").val("");
        $("#personStatus").val("");
    }

    cancelCustomerEmail(){
        this.emailMessage = "";
        this.emailSubject = "";
    }

    sendAnEmail(id){
        if(id){
            let email = {emailBody: "", emailSubject: "", emailId: id};
            return this.dialog.showEmail(
                    "Enter Email",
                    email,
                    ['Submit', 'Cancel']
                ).then(response => {
                    if (!response.wasCancelled) {
                        this.sendTheEmail(response.output);
                    } else {
                        console.log("Cancelled");
                    }
                });
        }
    }

    async sendTheEmail(email){
        if(!this.people.selectedPerson || this.people.selectedPerson._id !== email.email.emailId) this.people.selectedPersonFromId(email.email.emailId);
        if(email){
            var message = {
                id: email.email.emailId,
                message : email.email.emailBody,
                email: this.people.selectedPerson.email,
                subject: email.email.emailSubject,
                audit: {
                    property: 'Send Message',
                    eventDate: new Date(),
                    newValue: email.email.emailBody,
                    personId: this.userObj._id
                }
            };     
            let serverResponse = await this.people.sendCustomerMessage(message);
            if (!serverResponse.error) {
                this.utils.showNotification("The message was sent");
            }
        } 
    }

    async sendCustomerEmail(){
        if(this.emailMessage){
            var message = {
                id: this.people.selectedPerson._id,
                message : this.emailMessage,
                email: this.people.selectedPerson.email,
                subject: this.emailSubject,
                audit: {
                    property: 'Send Message',
                    eventDate: new Date(),
                    newValue: this.emailMessage,
                    personId: this.userObj._id
                }
            };     
            let serverResponse = await this.people.sendCustomerMessage(message);
            if (!serverResponse.error) {
                this.utils.showNotification("The message was sent");
            }
        } 
    }

    async toggleStatus(id, personStatus){
        if(id && personStatus){
            this.people.selectedPersonFromId(id);
            this.people.selectedPerson.personStatus = personStatus === this.config.ACTIVE_PERSON ? this.config.INACTIVE_PERSON : this.config.ACTIVE_PERSON;
            this.people.selectedPerson.audit.push({
                    property: 'personStatus',
                    eventDate: new Date(),
                    newValue: this.people.selectedPerson.personStatus,
                    personId: this.userObj._id
                })
            let serverResponse = await this.people.savePerson();
            if (!serverResponse.error) {
                this.utils.showNotification(serverResponse.firstName + " " + serverResponse.lastName + " was updated");
            } else {
                this.utils.showNotification("There was a problem saving the person");
            }
        } 
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
