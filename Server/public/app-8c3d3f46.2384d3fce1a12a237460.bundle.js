"use strict";
(self["webpackChunkuccss_old_new"] = self["webpackChunkuccss_old_new"] || []).push([["app-8c3d3f46"],{

/***/ "modules/admin/customers/bulkEmails":
/*!***************************************************!*\
  !*** ./src/modules/admin/customers/bulkEmails.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BulkEmails: function() { return /* binding */ BulkEmails; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../resources/utils/dataTable */ 6847);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../config/appConfig */ 1666);
/* harmony import */ var _resources_utils_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../resources/utils/utils */ 8741);
/* harmony import */ var _resources_data_people__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../resources/data/people */ 353);
/* harmony import */ var _resources_data_is4ua__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../resources/data/is4ua */ 5175);
/* harmony import */ var _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../resources/dialogs/common-dialogs */ 6545);
/* harmony import */ var _resources_utils_validation__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../resources/utils/validation */ 2824);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! jquery */ 5311);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_8__);
var _dec, _class;









let BulkEmails = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_1__.DataTable, _config_appConfig__WEBPACK_IMPORTED_MODULE_2__.AppConfig, _resources_data_people__WEBPACK_IMPORTED_MODULE_4__.People, _resources_utils_utils__WEBPACK_IMPORTED_MODULE_3__.Utils, _resources_data_is4ua__WEBPACK_IMPORTED_MODULE_5__.is4ua, _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_6__.CommonDialogs, _resources_utils_validation__WEBPACK_IMPORTED_MODULE_7__["default"]), _dec(_class = class BulkEmails {
  constructor(datatable, config, people, utils, is4ua, dialog, validation) {
    this.composeEmailPanel = false;
    this.subject = "";
    this.MESSAGE = "";
    this.spinnerHTML = "";
    this.email = new Object();
    this.roleFilterValue = new Array();
    this.roleExcludeFilterValue = new Array();
    this.toolbar = [['style', ['style', 'bold', 'italic', 'underline', 'clear']], ['color', ['color']], ['font', ['strikethrough', 'superscript', 'subscript']], ['layout', ['ul', 'ol', 'paragraph']], ['insert', ['link', 'table', 'hello']], ['misc', ['undo', 'redo', 'fullscreen', 'codeview']]];
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
    this.initialLoaded = false;
  }
  async filterActive() {
    this._clearFilters();
    await this.people.getPeopleBulkEmailArray('?order=lastName&filter=personStatus|eq|' + this.activeFilterValue, true);
    this.dataTable.updateArray(this.people.peopleBulkEmailArray);
  }
  async attached() {
    jquery__WEBPACK_IMPORTED_MODULE_8___default()('[data-toggle="tooltip"]').tooltip();
    jquery__WEBPACK_IMPORTED_MODULE_8___default()('#loading').show();
    let responses = await Promise.all([this.people.getPeopleBulkEmailArray('?order=lastName&filter=personStatus|eq|01'), this.people.getInstitutionsArray('?order=name', true), this.is4ua.loadIs4ua(), this.config.getConfig()]);
    this.activeFilterValue = "01";
    this.filteredArray = this.config.ROLES;
    this.dataTable.updateArray(this.people.peopleBulkEmailArray);
    this.roleSelect = new Array();
    this.config.ROLES.forEach(item => {
      this.roleSelect.push({
        code: item.role,
        description: item.role
      });
    });
    jquery__WEBPACK_IMPORTED_MODULE_8___default()('#loading').hide();
    this.institutionStatusValue = '01';
    this.dataTable.filterList(this.institutionStatusValue, {
      type: 'value',
      filter: 'institutionStatusFilter',
      collectionProperty: 'institutionId.institutionStatus',
      displayProperty: 'institutionId.institutionStatus',
      matchProperty: '',
      compare: 'match'
    });
    this.initialLoaded = true;
  }
  async refresh() {
    this._cleanUpFilters();
    // this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
    jquery__WEBPACK_IMPORTED_MODULE_8___default()('#loading').show();
    await this.people.getPeopleBulkEmailArray('?order=lastName&filter=personStatus|eq|01', true), this.dataTable.updateArray(this.people.peopleBulkEmailArray);
    // this.spinnerHTML = "";
    jquery__WEBPACK_IMPORTED_MODULE_8___default()('#loading').hide();
  }
  _clearFilters() {
    this.CustomerFilter = "";
    // this.activeFilterValue = "";
    this.roleFilterValue = new Array();
    this.roleExcludeFilterValue = new Array();
    this.institutionFilterValue = "";
    this.institutionStatusValue = "";
    this.institutionTypeFilter = "";
    this.memberTypeFilterValue = "";
    this.countryFilterValue = "";
    this.regionFilterValue = "";
    jquery__WEBPACK_IMPORTED_MODULE_8___default()(".filter-option-inner-inner").html('Nothing selected');
    this.dataTable.updateArray(this.people.peopleBulkEmailArray);
  }
  composeEmail() {
    this.email = {
      MESSAGE: "",
      INSTRUCTIONS: this.config.HELP_TICKET_INSTRUCTIONS,
      subject: ""
    };
    this.composeEmailPanel = true;
  }
  cancel() {
    this.composeEmailPanel = false;
    this.email = {
      MESSAGE: "",
      INSTRUCTIONS: this.config.HELP_TICKET_INSTRUCTIONS,
      subject: ""
    };
    // this.email.emailMessage = "";
    // this.email.subject = "";
  }

  sendBulkEmail() {
    if (this.email.MESSAGE === "" || this.email.subject === "") {
      this.utils.showNotification("Enter a subject and messsage", 'warning');
      return;
    }
    if (this.dataTable.baseArray.length === 0) {
      this.utils.showNotification("You must include some recipients", 'warning');
      return;
    }
    return this.dialog.showMessage("Are you sure you want to send the email to these recipients?", "Confirm Send", ['Yes', 'No']).whenClosed(response => {
      if (response.wasCancelled) {
        okToProcess = false;
      } else {
        this.sendTheBulkEmail();
      }
    });
  }
  sendTheBulkEmail() {
    var recipients = new Array();
    this.dataTable.baseArray.forEach(item => {
      recipients.push({
        name: item.fullName,
        email: item.email
      });
    });
    var email = {
      email: this.email,
      recipients: recipients
    };
    this.people.sendBuikEmail(email);
    this.utils.showNotification("Message sent");
  }
  downloadInstExcel() {
    let csvContent = "data:text/csv;charset=utf-8;,First Name,FullName,Last Name,Email,Phone,City,Region,Country,Roles,Institution\r\n";
    this.dataTable.baseArray.forEach((item, index) => {
      csvContent += item.firstName + "," + item.lastName.replace(',', ' ') + "," + item.firstName + " " + item.lastName.replace(',', ' ') + "," + item.email + "," + item.phone + "," + item.institutionId.city + "," + item.institutionId.region + "," + item.institutionId.country + "," + item.roles.join(':') + "," + item.institutionId.name;
      csvContent += "\r\n";
    });
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "bulkEmail.csv");
    document.body.appendChild(link); // Required for FF

    link.click();
  }
  regionCustomFilter(value, item, context) {
    if (item.institutionId && item.institutionId.region) {
      return item.institutionId.region.toUpperCase().indexOf(value.toUpperCase()) > -1;
    }
    return false;
  }
  countryCustomFilter(value, item, context) {
    if (item.institutionId && item.institutionId.country) {
      return item.institutionId.country.toUpperCase().indexOf(value.toUpperCase()) > -1;
    }
    return false;
  }
  roleCustomFilter(value, item, context) {
    var keep = false;
    if (item.roles && item.roles.length > 0 && value) {
      for (let i = 0; i < item.roles.length; i++) {
        for (let j = 0; j < value.length; j++) {
          if (item.roles[i].toUpperCase().indexOf(value[j].toUpperCase()) > -1) keep = true;
        }
      }
    }
    return keep;
  }
  roleExcludeCustomFilter(value, item, context) {
    var keep = true;
    if (item.roles && item.roles.length > 0 && value) {
      for (let i = 0; i < item.roles.length; i++) {
        for (let j = 0; j < value.length; j++) {
          if (item.roles[i].toUpperCase().indexOf(value[j].toUpperCase()) > -1) keep = false;
        }
      }
    }
    return keep;
  }
  memberTypeCustomFilter(value, item, context) {
    var keep = true;
    if (item.instiutionId.memberType && value && item.instiutionId.memberType.indexOf(valu)) {}
    return keep;
  }
  customerCustomFilter(value, item, context) {
    return item.fullName.toUpperCase().indexOf(value.toUpperCase()) > -1;
  }
  institutionCustomFilter(value, item, context) {
    return item.institutionId && item.institutionId.name.toUpperCase().indexOf(value.toUpperCase()) > -1;
  }
  filterRoles() {
    this.dataTable.filterList(this.roleFilterValue, {
      type: 'custom',
      filter: this.roleCustomFilter,
      compare: 'custom'
    });
  }
  excludeRoles() {
    this.dataTable.filterList(this.roleExcludeFilterValue, {
      type: 'custom',
      filter: this.roleExcludeCustomFilter,
      compare: 'custom'
    });
  }
}) || _class);

/***/ }),

/***/ "modules/admin/customers/customers":
/*!**************************************************!*\
  !*** ./src/modules/admin/customers/customers.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Customers: function() { return /* binding */ Customers; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var aurelia_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-router */ 6433);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../config/appConfig */ 1666);
var _dec, _class;



let Customers = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(aurelia_router__WEBPACK_IMPORTED_MODULE_1__.Router, _config_appConfig__WEBPACK_IMPORTED_MODULE_2__.AppConfig), _dec(_class = class Customers {
  constructor(router, config) {
    this.title = "Customers";
    this.tabs = [{
      id: 'editPeople',
      label: 'People'
    }, {
      id: 'editInstitutions',
      label: 'Institutions'
    }];
    this.tabPath = "modules/admin/customers/";
    this.router = router;
    this.config = config;
  }
  activate() {
    this.config.getConfig(true);
  }
  attached() {
    $(".nav a").on("click", function () {
      $(".nav").find(".active").removeClass("active");
      $(this).parent().addClass("active");
    });
  }
  configureRouter(config, router) {
    config.map([{
      route: ['', 'editPeople'],
      moduleId: './editPeople',
      settings: {
        auth: true,
        roles: []
      },
      nav: true,
      name: 'editPeople',
      title: "People"
    }, {
      route: 'editInstitutions',
      moduleId: './editInstitutions',
      settings: {
        auth: true,
        roles: []
      },
      nav: true,
      name: 'editInstitutions',
      title: 'Institutions'
    }, {
      route: 'bulkEmails',
      moduleId: './bulkEmails',
      settings: {
        auth: true,
        roles: []
      },
      nav: true,
      name: 'bulkEmails',
      title: 'Bulk Emails'
    }]);
    this.router = router;
  }
}) || _class);

/***/ }),

/***/ "modules/admin/customers/editInstitutions":
/*!*********************************************************!*\
  !*** ./src/modules/admin/customers/editInstitutions.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EditInstitutions: function() { return /* binding */ EditInstitutions; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../resources/utils/dataTable */ 6847);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../config/appConfig */ 1666);
/* harmony import */ var _resources_utils_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../resources/utils/utils */ 8741);
/* harmony import */ var _resources_data_people__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../resources/data/people */ 353);
/* harmony import */ var _resources_data_is4ua__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../resources/data/is4ua */ 5175);
/* harmony import */ var _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../resources/dialogs/common-dialogs */ 6545);
/* harmony import */ var _resources_utils_validation__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../resources/utils/validation */ 2824);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! jquery */ 5311);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_8__);
var _dec, _class;









let EditInstitutions = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_1__.DataTable, _config_appConfig__WEBPACK_IMPORTED_MODULE_2__.AppConfig, _resources_data_people__WEBPACK_IMPORTED_MODULE_4__.People, _resources_utils_utils__WEBPACK_IMPORTED_MODULE_3__.Utils, _resources_data_is4ua__WEBPACK_IMPORTED_MODULE_5__.is4ua, _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_6__.CommonDialogs, _resources_utils_validation__WEBPACK_IMPORTED_MODULE_7__["default"]), _dec(_class = class EditInstitutions {
  constructor(datatable, config, people, utils, is4ua, dialog, validation) {
    this.institutionSelected = false;
    // spinnerHTML = "";
    this.tabs = [{
      id: 'instAddress',
      title: 'Address'
    }, {
      id: 'instPeople',
      title: 'People'
    }, {
      id: 'instIs4ua',
      title: "IS4UA"
    }];
    this.tabPath = './';
    this.dateConfig = {
      wrap: true
    };
    this.dataTable = datatable;
    this.dataTable.initialize(this);
    this.config = config;
    this.utils = utils;
    this.people = people;
    this.is4ua = is4ua;
    this.dialog = dialog;
    this.validation = validation;
    this._setupValidation();
    this.validation.initialize(this);
    this.userObj = JSON.parse(sessionStorage.getItem('user'));
  }
  async attached() {
    jquery__WEBPACK_IMPORTED_MODULE_8___default()('[data-toggle="tooltip"]').tooltip();
    jquery__WEBPACK_IMPORTED_MODULE_8___default()('#loading').show();
    let responses = await Promise.all([this.people.getPeopleArray('?order=lastName'), this.people.getInstitutionsArray('?order=name', true), this.is4ua.loadIs4ua()]);
    this.dataTable.updateArray(this.people.institutionsArray);
    jquery__WEBPACK_IMPORTED_MODULE_8___default()('#loading').hide();
    this.initialLoaded = true;
  }
  async activate() {
    this.initialLoaded = false;
  }
  async refresh() {
    // this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
    jquery__WEBPACK_IMPORTED_MODULE_8___default()('#loading').show();
    await this.people.getInstitutionsArray('?order=name', true);
    this.dataTable.updateArray(this.people.institutionArray);
    // this.spinnerHTML = "";
    jquery__WEBPACK_IMPORTED_MODULE_8___default()('#loading').hide();
  }
  edit(index, el) {
    this.editIndex = this.dataTable.getOriginalIndex(index);
    this.people.selectInstitution(this.editIndex);
    this.newInstitution = false;
    this.people.getInstitutionPeople('?filter=institutionId|eq|' + this.people.selectedInstitution._id, true);
    jquery__WEBPACK_IMPORTED_MODULE_8___default()("#editName").focus();
    if (this.selectedRow) this.selectedRow.children().removeClass('info');
    this.selectedRow = jquery__WEBPACK_IMPORTED_MODULE_8___default()(el.target).closest('tr');
    this.selectedRow.children().addClass('info');
    this.institutionSelected = true;
  }
  async new() {
    this.editIndex = -1;
    this.people.getInstitutionPeople(-1);
    this.people.selectInstitution();
    this.newInstitution = true;
    jquery__WEBPACK_IMPORTED_MODULE_8___default()("#editName").focus();
    this.institutionSelected = true;
  }
  async save() {
    if (this.validation.validate(1)) {
      let serverResponse = await this.people.saveInstitution();
      if (!serverResponse.error) {
        this.dataTable.updateArray(this.people.institutionsArray);
        this.utils.showNotification(serverResponse.name + " was updated");
      } else {
        this.utils.showNotification("There was a problem updating saving the institution", 'error');
      }
      this._cleanUp();
    } else {
      if (!this.people.selectedInstitution.institutionType || !this.people.selectedInstitution.memberType || !this.people.selectedInstitution.institutionStatus || !this.people.selectedInstitution.highestDegree) {
        return this.dialog.showMessage("The IS4UA fields on the IS4UA tab are required", "Missing Data", ['OK']).then(response => {});
      }
    }
  }
  delete() {
    return this.dialog.showMessage("Are you sure you want to delete the institution?", "Delete Institution", ['Yes', 'No']).whenClosed(response => {
      if (!response.wasCancelled) {
        this.deleteInstitution();
      }
    });
  }
  async deleteInstitution() {
    var name = this.people.selectedInstitution.name;
    let serverResponse = await this.people.deleteInstitution();
    if (!serverResponse.error) {
      this.dataTable.updateArray(this.people.institutionsArray);
      this.utils.showNotification(name + " was deleted");
    } else {
      this.utils.showNotification("There was a problem deleting the user", 'error');
    }
    this._cleanUp();
  }
  cancel() {
    this.people.selectInstitution(this.editIndex);
  }
  back() {
    if (this.people.isInstitutionDirty().length) {
      return this.dialog.showMessage("The institution has been changed. Do you want to save your changes?", "Save Changes", ['Yes', 'No']).whenClosed(response => {
        if (!response.wasCancelled) {
          this.save();
        } else {
          this.institutionSelected = false;
        }
      });
    } else {
      this.institutionSelected = false;
    }
  }
  _setupValidation() {
    this.validation.addRule(1, "editName", [{
      "rule": "required",
      "message": "Name is required",
      "value": "people.selectedInstitution.name"
    }]);
    this.validation.addRule(1, "editInstitutionType", [{
      "rule": "required",
      "message": "Institution type is required",
      "value": "people.selectedInstitution.institutionType"
    }]);
    this.validation.addRule(1, "editMemberType", [{
      "rule": "required",
      "message": "Institution type is required",
      "value": "people.selectedInstitution.memberType"
    }]);
    this.validation.addRule(1, "editInstitutonStatusArray", [{
      "rule": "required",
      "message": "Institution status is required",
      "value": "people.selectedInstitution.institutionStatus"
    }]);
    this.validation.addRule(1, "editHighestDegree", [{
      "rule": "required",
      "message": "Institution type is required",
      "value": "people.selectedInstitution.highestDegree"
    }]);
  }
  downloadInstExcel() {
    let csvContent = "data:text/csv;charset=utf-8;,Name,City,State,Country,Type,Status\r\n";
    this.dataTable.baseArray.forEach(item => {
      csvContent += item.name + "," + item.city + "," + item.region + "," + item.country + "," + item.institutionType + "," + item.institutionStatus;
      csvContent += "\r\n";
    });
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "institutions.csv");
    document.body.appendChild(link); // Required for FF

    link.click();
  }
  _cleanUp() {
    this.newInstitution = false;
    this.institutionSelected = false;
    this._cleanUpFilters();
  }
  _clearFilters() {
    this._cleanUpFilters();
    this.dataTable.updateArray(this.people.institutionsArray);
  }
  _cleanUpFilters() {
    this.nameFilterValue = "";
    this.institutionTypeFilter = "";
    this.memberTypeFilter = "";
    this.highestDegreeFilter = "";
    jquery__WEBPACK_IMPORTED_MODULE_8___default()("#institutionStatus").val("");
  }
  async changeTab(el, index) {
    jquery__WEBPACK_IMPORTED_MODULE_8___default()("#instFormListGroup.list-group").children().removeClass('menuButtons');
    jquery__WEBPACK_IMPORTED_MODULE_8___default()("#instFormListGroup.list-group").children().css("background-color", "");
    jquery__WEBPACK_IMPORTED_MODULE_8___default()("#instFormListGroup.list-group").children().css("color", "");
    jquery__WEBPACK_IMPORTED_MODULE_8___default()(el.target).parent().css("background-color", this.config.SUBMENU_BACKGROUND);
    jquery__WEBPACK_IMPORTED_MODULE_8___default()(el.target).parent().css("color", this.config.ACTIVE_SUBMENU_COLOR);
    jquery__WEBPACK_IMPORTED_MODULE_8___default()(".in").removeClass('active').removeClass('in');
    jquery__WEBPACK_IMPORTED_MODULE_8___default()("#" + el.target.id + "Tab").addClass('in').addClass('active');
  }
}) || _class);

/***/ }),

/***/ "modules/admin/customers/editPeople":
/*!***************************************************!*\
  !*** ./src/modules/admin/customers/editPeople.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EditPeople: function() { return /* binding */ EditPeople; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../resources/utils/dataTable */ 6847);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../config/appConfig */ 1666);
/* harmony import */ var _resources_utils_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../resources/utils/utils */ 8741);
/* harmony import */ var _resources_data_people__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../resources/data/people */ 353);
/* harmony import */ var _resources_data_is4ua__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../resources/data/is4ua */ 5175);
/* harmony import */ var _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../resources/dialogs/common-dialogs */ 6545);
/* harmony import */ var _resources_utils_validation__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../resources/utils/validation */ 2824);
var _dec, _class;








let EditPeople = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_1__.DataTable, _config_appConfig__WEBPACK_IMPORTED_MODULE_2__.AppConfig, _resources_data_people__WEBPACK_IMPORTED_MODULE_4__.People, _resources_utils_utils__WEBPACK_IMPORTED_MODULE_3__.Utils, _resources_data_is4ua__WEBPACK_IMPORTED_MODULE_5__.is4ua, _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_6__.CommonDialogs, _resources_utils_validation__WEBPACK_IMPORTED_MODULE_7__["default"]), _dec(_class = class EditPeople {
  constructor(datatable, config, people, utils, is4ua, dialog, validation) {
    this.personSelected = false;
    this.showCourses = false;
    this.courseSelected = false;
    this.showPassword = false;
    this.customerEmail = false;
    this.bulkEmailSelected = false;
    this.youSelectedAnEmail = false;
    this.emailSubject = "";
    this.emailMessage = "";
    this.phoneMask = "";
    this.tabs = [{
      id: 'Address'
    }, {
      id: 'Roles'
    }, {
      id: 'Courses'
    }, {
      id: 'Password'
    }, {
      id: 'Audit'
    }, {
      id: "Email"
    }, {
      id: "Log"
    }];
    this.tabPath = './';
    this.toolbar = [['style', ['style', 'bold', 'italic', 'underline', 'clear']], ['color', ['color']], ['font', ['strikethrough', 'superscript', 'subscript']], ['layout', ['ul', 'ol', 'paragraph']], ['insert', ['link', 'table', 'hello']], ['misc', ['undo', 'redo', 'fullscreen', 'codeview']]];
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
    this.initialLoaded = false;
    let responses = await Promise.all([this.people.getPeopleArray('?order=lastName&filter=personStatus|eq|01'), this.people.getInstitutionsArray('?order=name', true), this.is4ua.loadIs4ua(), this.config.getConfig()]);
    this.activeFilterValue = "01";
    this.filteredArray = this.config.ROLES;
    this.dataTable.updateArray(this.people.peopleArray);
    this._setupValidation();
  }
  async filterActive() {
    this._clearFilters();
    $('#loading').show();
    if (this.activeFilterValue == "") {
      await this.people.getPeopleArray('?order=lastName', true);
    } else {
      await this.people.getPeopleArray('?order=lastName&filter=personStatus|eq|' + this.activeFilterValue, true);
    }
    this.dataTable.updateArray(this.people.peopleArray);
    $('#loading').hide();
  }
  async attached() {
    $('[data-toggle="tooltip"]').tooltip();
    $('#loading').show();
    // let responses = await Promise.all([
    //     this.people.getPeopleArray('?order=lastName&filter=personStatus|eq|01'),
    //     this.people.getInstitutionsArray('?order=name', true),
    //     this.is4ua.loadIs4ua(),
    //     this.config.getConfig()
    // ]);

    // this.activeFilterValue = "01";
    // this.filteredArray = this.config.ROLES;
    // this.dataTable.updateArray(this.people.peopleArray);
    // this._setupValidation();
    $('#loading').hide();
    this.initialLoaded = true;
  }
  async refresh() {
    this._cleanUpFilters();
    // this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
    $('#loading').show();
    await this.people.getPeopleArray('?order=lastName&filter=personStatus|eq|01', true), this.dataTable.updateArray(this.people.peopleArray);
    // this.spinnerHTML = "";
    $('#loading').hide();
  }
  edit(index, el) {
    this.editIndex = this.dataTable.getOriginalIndex(index);
    this.people.selectPerson(this.editIndex);
    this.oldEmail = this.people.selectedPerson.email;
    this.institutionId = this.people.selectedPerson.institutionId._id || null;
    this.orginalObject = this.people.selectedPerson;
    this.filterRoles();
    this.newPerson = false;
    $("#editFirstName").focus();
    this.getPhoneMask();
    this.people.getEmailLog('?filter=personId|eq|' + this.people.selectedPerson._id + '&order=date', true);
    if (this.selectedRow) this.selectedRow.children().removeClass('info');
    this.selectedRow = $(el.target).closest('tr');
    this.selectedRow.children().addClass('info');
    this.personSelected = true;
    this.setFirstTab();
  }
  getPhoneMask() {
    this.phoneMask = "";
    setTimeout(() => {
      for (let i = 0; i < this.config.PHONE_MASKS.length; i++) {
        if (this.people.selectedPerson.country === this.config.PHONE_MASKS[i].country) {
          this.phoneMask = this.config.PHONE_MASKS[i].mask;
          break;
        }
      }
    }, 500);
  }
  selectEmail(email) {
    this.selectedEmail = email;
    this.youSelectedAnEmail = true;
  }
  backEmail() {
    this.youSelectedAnEmail = false;
  }
  async new() {
    this.editIndex = -1;
    this.people.selectPerson();
    this.newPerson = true;
    this.oldEmail = this.people.selectedPerson.email;
    $("#editFirstName").focus();
    this.personSelected = true;
    this.phoneMask = "";
    this.setFirstTab();
  }
  filterRoles() {
    this.filteredArray = this.config.ROLES.filter(item => {
      return this.people.selectedPerson.roles.indexOf(item.role) === -1;
    });
    if (this.filteredArray.length === 0) this.filteredArray.push({
      role: "NOROLE",
      label: "No Roles Remaining"
    });
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
  buildAudit() {
    var changes = this.people.isPersonDirty(this.orginalObject);
    changes.forEach(item => {
      this.people.selectedPerson.audit.push({
        property: item.property,
        eventDate: new Date(),
        oldValue: item.oldValue,
        newValue: item.newValue,
        personId: this.userObj._id
      });
    });
  }
  async save() {
    if (this.validation.validate(1)) {
      if (this.people.selectedPerson._id) {
        this.buildAudit();
      } else {
        this.people.selectedPerson.institutionId = this.institutionId;
      }
      let serverResponse = await this.people.savePerson();
      if (!serverResponse.error) {
        this.dataTable.updateArray(this.people.peopleArray);
        this.utils.showNotification(serverResponse.firstName + " " + serverResponse.lastName + " was updated");
      } else {
        this.utils.showNotification("There was a problem saving the person", 'error');
      }
      this._cleanUp();
    }
  }
  delete() {
    return this.dialog.showMessage("Are you sure you want to delete the person?", "Delete Person", ['Yes', 'No']).whenClosed(response => {
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
      return this.dialog.showMessage("The account has been changed. Do you want to save your changes?", "Save Changes", ['Yes', 'No']).whenClosed(response => {
        if (!response.wasCancelled) {
          this.save();
        } else {
          this.personSelected = false;
        }
      });
    } else {
      this.personSelected = false;
    }
    this.institutionId = "";
  }
  async checkEmail() {
    if (this.oldEmail != this.people.selectedPerson.email) {
      if (await this.people.checkEmail()) {
        this.duplicateAccount = true;
        this.validation.validate(4);
      } else {
        this.duplicateAccount = false;
        this.validation.makeValid($("#register_email"));
      }
    }
  }
  changeInstitution() {
    if (this.people.selectedPerson._id) {
      return this.dialog.showMessage("Are you sure you want to change the institution? This should normally only be done if the account was created in the wrong institution.  If the user has changed institutions, create a new account.", "Change Institution", ['Yes', 'No']).whenClosed(response => {
        if (!response.wasCancelled) {
          this.people.selectedPerson.institutionId._id = this.institutionId;
          setTimeout(() => {
            this.copyInstAddress();
          }, 1000);
        } else {
          this.institutionId = this.people.selectedPerson.institutionId._id;
        }
      });
    } else {
      setTimeout(() => {
        this.copyInstAddress();
      }, 1000);
    }
  }
  async openEditCourseForm() {
    if (!this.showCourses) await this.refreshCourses();
    this.showCourses = !this.showCourses;
  }
  async refreshCourses() {
    if (this.people.selectedPerson._id) {
      await this.people.getCoursesArray(true, '?filter=personId|eq|' + this.people.selectedPerson._id + '&order=number');
    }
  }
  editACourse(index, el) {
    this.editCourseIndex = index;
    this.people.selectCourse(this.editCourseIndex);
    $("#number").focus();
    if (this.selectedCourseRow) this.selectedCourseRow.children().removeClass('info');
    this.selectedCourseRow = $(el.target).closest('tr');
    this.selectedCourseRow.children().addClass('info');
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
      };
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
        this.getPhoneMask();
      }
    }
  }
  cancelCustomerEmail() {
    this.emailMessage = "";
    this.emailSubject = "";
  }
  sendAnEmail(id) {
    if (id) {
      let email = {
        emailBody: "",
        emailSubject: "",
        emailId: id,
        from: this.userObj._id
      };
      return this.dialog.showEmail("Enter Email", email, ['Submit', 'Cancel']).whenClosed(response => {
        if (!response.wasCancelled) {
          this.sendTheEmail(response.output);
        } else {
          console.log("Cancelled");
        }
      });
    }
  }
  async sendTheEmail(email) {
    if (!this.people.selectedPerson || this.people.selectedPerson._id !== email.email.emailId) this.people.selectedPersonFromId(email.email.emailId);
    if (email) {
      var message = {
        from: email.email.from,
        id: email.email.emailId,
        message: email.email.emailBody,
        email: this.people.selectedPerson.email,
        subject: email.email.emailSubject
      };
      let serverResponse = await this.people.sendCustomerMessage(message);
      if (!serverResponse.error) {
        this.utils.showNotification("The message was sent");
      }
    }
  }
  async sendCustomerEmail() {
    if (this.emailMessage) {
      var message = {
        id: this.people.selectedPerson._id,
        from: this.userObj._id,
        message: this.emailMessage,
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
  async toggleStatus(id, personStatus) {
    if (id && personStatus) {
      this.people.selectedPersonFromId(id);
      this.people.selectedPerson.personStatus = personStatus === this.config.ACTIVE_PERSON ? this.config.INACTIVE_PERSON : this.config.ACTIVE_PERSON;
      this.people.selectedPerson.audit.push({
        property: 'personStatus',
        eventDate: new Date(),
        newValue: this.people.selectedPerson.personStatus,
        personId: this.userObj._id
      });
      let serverResponse = await this.people.savePerson();
      if (!serverResponse.error) {
        this.utils.showNotification(serverResponse.firstName + " " + serverResponse.lastName + " was updated");
      } else {
        this.utils.showNotification("There was a problem saving the person", 'error');
      }
    }
  }
  setFirstTab() {
    $("#peopleFormListGroup.list-group").children().removeClass('active');
    let target = $("#peopleFormListGroup.list-group").children()[0];
    // $(el.target).parent().css("background-color",this.config.BUTTONS_BACKGROUND);
    // $(el.target).parent().css("color",this.config.ACTIVE_SUBMENU_COLOR);
    // $(".in").removeClass('active').removeClass('in');
    // $("#AddressTab").addClass('in').addClass('active');
  }

  async changeTab(el, index) {
    $("#peopleFormListGroup.list-group").children().removeClass('menuButtons');
    $("#peopleFormListGroup.list-group").children().css("background-color", "");
    $("#peopleFormListGroup.list-group").children().css("color", "");
    $(el.target).parent().css("background-color", this.config.SUBMENU_BACKGROUND);
    $(el.target).parent().css("color", this.config.ACTIVE_SUBMENU_COLOR);
    $(".in").removeClass('active').removeClass('in');
    $("#" + el.target.id + "Tab").addClass('in').addClass('active');
    switch (el.target.id) {
      case 'Courses':
        await this.refreshCourses();
        break;
    }
  }
  _cleanUp() {
    this.institutionId = "";
    this.personSelected = false;
    this.newPerson = false;
    this._cleanUpFilters();
    this.validation.makeAllValid(1);
  }
  _setupValidation() {
    this.validation.addRule(1, "editFirstName", [{
      "rule": "required",
      "message": "First name is required",
      "value": "people.selectedPerson.firstName"
    }, {
      "rule": "custom",
      "message": "A person with that name at that institution already exists",
      "valFunction": function (context) {
        var found = false;
        for (var i = 0; i < context.people.peopleArray.length; i++) {
          if (context.people.peopleArray[i].firstName.toUpperCase() === context.people.selectedPerson.firstName.toUpperCase() && context.people.peopleArray[i].lastName.toUpperCase() === context.people.selectedPerson.lastName.toUpperCase() && context.people.peopleArray[i].institutionId === context.people.selectedPerson.institutionId) {
            if (context.people.selectedPerson._id && context.people.selectedPerson._id != context.people.peopleArray[i]._id) {
              found = true;
            } else if (!context.people.selectedPerson._id) {
              found = true;
            }
          }
        }
        return !found;
      }
    }]);
    this.validation.addRule(1, "editLastName", [{
      "rule": "required",
      "message": "Last name is required",
      "value": "people.selectedPerson.lastName"
    }]);
    this.validation.addRule(1, "editStatus", [{
      "rule": "required",
      "message": "Status is required",
      "value": "people.selectedPerson.personStatus"
    }]);
    this.validation.addRule(1, "editPhone", [{
      "rule": "required",
      "message": "Phone number is required",
      "value": "people.selectedPerson.phone"
    }, {
      "rule": "length",
      "message": "Phone number isn't valid",
      "value": "people.selectedPerson.phone",
      "ruleValue": 10
    }]);
    this.validation.addRule(1, "editMobile", [{
      "rule": "length",
      "message": "Phone number isn't valid",
      "value": "people.selectedPerson.mobile",
      "ruleValue": 10
    }]);
    this.validation.addRule(1, "editEmail", [{
      "rule": "required",
      "message": "Email is required",
      "value": "people.selectedPerson.email"
    }, {
      "rule": "custom",
      "message": "An account with that email exists",
      "valFunction": function (context) {
        return !context.duplicateAccount;
      }
    }, {
      "rule": "custom",
      "message": "Enter a valid email address",
      "valFunction": function (context) {
        return context.people.selectedPerson.email.indexOf('@') > -1;
      }
    }]);
    this.validation.addRule(1, "editInstitution", [{
      "rule": "required",
      "message": "Institution is required",
      "value": "institutionId"
    }]);
    this.validation.addRule(1, "editRoles", [{
      "rule": "custom",
      "message": "The person must be assigned a role.",
      "valFunction": function (context) {
        return context.people.selectedPerson.roles.length > 0;
      }
    }]);
    this.validation.addRule(2, "number", [{
      "rule": "required",
      "message": "Course number is required",
      "value": "people.selectedCourse.number"
    }]);
    this.validation.addRule(2, "name", [{
      "rule": "required",
      "message": "Course name is required",
      "value": "people.selectedCourse.name"
    }]);
    this.validation.addRule(3, "password", [{
      "rule": "required",
      "message": "Password is required",
      "value": "newPassword"
    }]);
    this.validation.addRule(4, "editEmail", [{
      "rule": "custom",
      "message": "An account with that email exists",
      "valFunction": function (context) {
        return !context.duplicateAccount;
      }
    }, {
      "rule": "custom",
      "message": "Enter a valid email address",
      "valFunction": function (context) {
        return /^\w+([\.-]?\ w+)*@\w+([\.-]?\ w+)*(\.\w{2,3})+$/.test(context.people.selectedPerson.email);
      }
    }]);
  }
  _clearFilters() {
    this._cleanUpFilters();
    this.dataTable.updateArray(this.people.peopleArray);
  }
  _cleanUpFilters() {
    this.roleFilter = "";
    this.nameFilterValue = "";
    this.nickNameFilterValue = "";
    this.institutionFilterValue = "";
  }
  downloadInstExcel() {
    let csvContent = "data:text/csv;charset=utf-8;,First Name,Last Name,Email,Phone,Institution,Country,Region,Status,Roles\r\n";
    this.dataTable.baseArray.forEach(item => {
      let isActive = item.personStatus == '01' ? 'Active' : 'Inactive';
      csvContent += item.firstName + "," + item.lastName.replace(',', ' ') + "," + item.email + "," + item.phone + "," + item.institutionId.name.replace(",", " ") + "," + item.country + "," + item.region + "," + isActive + "," + item.roles.join(":");
      csvContent += "\r\n";
    });
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "people.csv");
    document.body.appendChild(link); // Required for FF

    link.click();
  }
  async archiveInactivePeople() {
    var inactivePeople = 0;
    let response = await this.people.countPeopleStatus(this.config.INACTIVE_PERSON);
    if (!response.error) inactivePeople = response.count;
    if (inactivePeople) {
      return this.dialogs.showMessage("This will archive " + inactivePeople + " inactive people.  Are you sure you want to do that?", "Archive People", ['Yes', 'No']).whenClosed(response => {
        if (!response.wasCancelled) {
          this.archiveTickets();
        }
      });
    } else {
      this.utils.showNotification('There are currently no inactive people in the active person collection.', 'warning');
    }
  }
  async archivePeople() {
    let response = await this.people.archiveInactivePeople();
    if (!response.error) {
      this.utils.showNotification(response.number + ' people were archived successfully');
    }
  }
  customInstitutionSorter(sortProperty, sortDirection, sortArray, context) {
    return sortArray.sort((a, b) => {
      if (a['institutionId'] !== null && b['institutionId'] !== null) {
        var result = a['institutionId']['name'] < b['institutionId']['name'] ? -1 : a['institutionId']['name'] > b['institutionId']['name'] ? 1 : 0;
      } else {
        var result = -1;
      }
      return result * sortDirection;
    });
  }
  institutionCustomFilter(value, item, context) {
    return item.institutionId && item.institutionId.name.toUpperCase().indexOf(value.toUpperCase()) > -1;
  }
  customRoleFilter(value, item, context) {
    var keep = false;
    if (item.roles && item.roles.length > 0) {
      for (let i = 0; i < item.roles.length; i++) {
        if (item.roles[i].toUpperCase().indexOf(value.toUpperCase()) > -1) keep = true;
      }
    }
    return keep;
  }
}) || _class);

/***/ }),

/***/ "modules/admin/documents/documents":
/*!**************************************************!*\
  !*** ./src/modules/admin/documents/documents.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Documents: function() { return /* binding */ Documents; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var aurelia_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-router */ 6433);
/* harmony import */ var _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../resources/utils/dataTable */ 6847);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../config/appConfig */ 1666);
/* harmony import */ var _resources_utils_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../resources/utils/utils */ 8741);
/* harmony import */ var _resources_data_documents__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../resources/data/documents */ 7188);
/* harmony import */ var _resources_data_people__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../resources/data/people */ 353);
/* harmony import */ var _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../resources/dialogs/common-dialogs */ 6545);
/* harmony import */ var _resources_utils_validation__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../resources/utils/validation */ 2824);
/* harmony import */ var aurelia_event_aggregator__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! aurelia-event-aggregator */ "aurelia-event-aggregator");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! jquery */ 5311);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_10__);
var _dec, _class;











let Documents = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(aurelia_router__WEBPACK_IMPORTED_MODULE_1__.Router, _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_2__.DataTable, _resources_data_documents__WEBPACK_IMPORTED_MODULE_5__.DocumentsServices, _resources_data_people__WEBPACK_IMPORTED_MODULE_6__.People, _resources_utils_utils__WEBPACK_IMPORTED_MODULE_4__.Utils, _config_appConfig__WEBPACK_IMPORTED_MODULE_3__.AppConfig, _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_7__.CommonDialogs, _resources_utils_validation__WEBPACK_IMPORTED_MODULE_8__["default"], aurelia_event_aggregator__WEBPACK_IMPORTED_MODULE_9__.EventAggregator), _dec(_class = class Documents {
  constructor(router, datatable, documents, people, utils, config, dialog, validation, eventAggregator) {
    this.navControl = "documentssNavButtons";
    this.spinnerHTML = "";
    this.filterValues = new Array();
    this.typeSelected = "";
    this.categoryForm = false;
    this.showDocumentForm = false;
    this.showDocuments = false;
    this.displayTitle = "";
    this.title = "Documents";
    this.router = router;
    this.dataTable = datatable;
    this.dataTable.initialize(this);
    this.utils = utils;
    this.documents = documents;
    this.config = config;
    this.people = people;
    this.dialog = dialog;
    this.eventAggregator = eventAggregator;
    this.validation = validation;
    this.validation.initialize(this);
    this.userObj = JSON.parse(sessionStorage.getItem('user'));
  }
  async activate() {
    let responses = await Promise.all([this.documents.getDocumentsCategoriesArray(), this.people.getPeopleArray(), this.config.getConfig()]);
    this.filteredDocumentArray = this.documents.docCatsArray;
    await this.selectFirstCategory();
  }
  attached() {
    jquery__WEBPACK_IMPORTED_MODULE_10___default()('[data-toggle="tooltip"]').tooltip();
    this._setupValidation();
    this.mySubscription = this.eventAggregator.subscribe('upload-progress', obj => {
      var elem = document.getElementById("progressBar");
      elem.style.width = obj.progress / obj.total * 100 + '%';
    });
  }
  async refresh() {
    this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
    await this.documents.getDocumentsArray(true);
    this.dataTable.updateArray(this.documents.docCatsArray);
    this.spinnerHTML = "";
  }
  editDocument(index, el) {
    this.editIndex = this.dataTable.getOriginalIndex(index);
    this.documents.selectDocument(this.editIndex);
    this.displayTitle = "Files";

    //Reset the selected row
    if (this.selectedRow) this.selectedRow.children().removeClass('info');
    this.selectedRow = jquery__WEBPACK_IMPORTED_MODULE_10___default()(el.target).closest('tr');
    this.selectedRow.children().addClass('info');
    this.showDocumentForm = true;
  }
  filterList() {
    if (this.filter) {
      var thisFilter = this.filter;
      this.filteredDocumentArray = this.documents.docCatsArray.filter(item => {
        return item.description.toUpperCase().indexOf(thisFilter.toUpperCase()) > -1;
      });
    } else {
      this.filteredDocumentArray = this.documents.docCatsArray;
    }
  }
  async selectFirstCategory() {
    this.categoryIndex = 0;
    if (this.documents.selectCategory && this.documents.selectCategory.length > 0) {
      this.documents.selectCategory(0);
      await this.documents.getDocumentsArray(true, '?filter=categoryCode|eq|' + this.documents.selectedCat.code);
      this.dataTable.updateArray(this.documents.documentsArray);
      this.showDocuments = true;
      this.showDocumentForm = false;
    }
    this.displayTitle = "Documents";
  }
  async typeChanged(index, el) {
    if (index >= 0) {
      this.categoryIndex = index;
      this.documents.selectCategory(index);
      await this.documents.getDocumentsArray(true, '?filter=categoryCode|eq|' + this.documents.selectedCat.code);
      this.dataTable.updateArray(this.documents.documentsArray);
      this.showDocuments = true;
      this.showDocumentForm = false;
      this.displayTitle = "Documents";
      jquery__WEBPACK_IMPORTED_MODULE_10___default()("#categoryList.list-group").children().removeClass('menuButtons');
      jquery__WEBPACK_IMPORTED_MODULE_10___default()("#categoryList.list-group").children().css("background-color", "");
      jquery__WEBPACK_IMPORTED_MODULE_10___default()("#categoryList.list-group").children().css("color", "");
      jquery__WEBPACK_IMPORTED_MODULE_10___default()(el.target).css("background-color", this.config.SUBMENU_BACKGROUND);
      jquery__WEBPACK_IMPORTED_MODULE_10___default()(el.target).css("color", this.config.ACTIVE_SUBMENU_COLOR);
    }
  }
  new() {
    this.editIndex = "";
    this.showDocumentForm = true;
    this.documents.selectDocument();
  }
  back() {
    this.displayTitle = "Documents";
    this.showDocumentForm = false;
  }
  cancel() {
    this.documents.selectDocument(this.editIndex);
  }
  async delete() {
    return this.dialog.showMessage("This will delete the document from the database and remove all the files.  Are you sure you want to delete the document?", "Delete Document", ['Yes', 'No']).whenClosed(response => {
      if (!response.wasCancelled) {
        this.deleteDocument();
      }
    });
  }
  async deleteDocument() {
    let serverResponse = await this.documents.deleteDocument();
    if (!serverResponse.error) {
      this.utils.showNotification("The document was deleted");
      this.refresh();
      this.showDocumentForm = false;
    }
    this._cleanUp();
  }
  toggleFileActive(index) {
    this.documents.selectedDocument.files[index].active = !this.documents.selectedDocument.files[index].active;
  }
  deleteFile(index) {
    return this.dialog.showMessage("Are you sure you want to delete the file?", "Delete File", ['Yes', 'No']).whenClosed(response => {
      if (!response.wasCancelled) {
        this.documents.deleteFile(index);
      }
    });
  }
  buildDocument() {
    if (!this.documents.selectedDocument._id) {
      this.documents.selectedDocument.categoryCode = this.documents.selectedCat.code;
      this.documents.selectedDocument.dateCreated = new Date();
    }
    if (this.files && this.files.length > 0) {
      var version = 1;
      for (var i = 0; i < this.documents.selectedDocument.files.length; i++) {
        if (this.documents.selectedDocument.files[i].originalFilename == this.files[0].name) {
          version++;
        }
      }
      let fileNameArray = this.files[0].name.split('.');
      let fileName = fileNameArray[0] + " (" + version + ")." + fileNameArray[1];
      var newFile = {
        personId: this.userObj._id,
        originalFilename: this.files[0].name,
        fileName: fileName,
        dateUploaded: new Date(),
        active: true,
        version: version
      };
      this.documents.selectedDocument.files.unshift(newFile);
    }
  }
  async save() {
    this.buildDocument();
    if (this.validation.validate(1)) {
      let serverResponse = await this.documents.saveDocument();
      if (!serverResponse.error) {
        this.dataTable.updateArray(this.documents.documentsArray);
        if (this.filesToUpload && this.filesToUpload.length > 0) {
          this.uploading = true;
          this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
          await this.documents.uploadFile(this.filesToUpload, this.documents.selectedDocument.files[0].version);
          this.spinnerHTML = "";
          jquery__WEBPACK_IMPORTED_MODULE_10___default()("#spinner").toggle().toggle();
          this._cleanUp();
          this.selectedFile = "";
          this.utils.showNotification("The document was saved");
        } else {
          this._cleanUp();
          this.utils.showNotification("The document was saved");
        }
      }
    }
  }
  changeFiles() {
    this.filesToUpload = new Array();
    this.filesToUpload.push(this.files[0]);
  }
  removeFile(index) {
    this.filesToUpload.splice(index, 1);
  }
  newCategory() {
    this.categoryForm = true;
    this.documents.selectCategory();
  }
  editCategory() {
    if (this.documents.selectedCat) this.categoryForm = true;
  }
  saveCategory() {
    let serverResponse = this.documents.saveCategory();
    if (!serverResponse.status) {
      this.utils.showNotification("Category Saved");
      this.categoryForm = false;
    }
  }
  _cleanUp() {
    this.selectedFiles = undefined;
    this.files = undefined;
    this.uploading = false;
    this.filesToUpload = new Array();
  }
  backCategory() {
    this.categoryForm = false;
  }
  cancelEditCategory() {
    this.documents.selectCategory();
  }
  _setupValidation() {
    this.validation.addRule(1, "editName", [{
      "rule": "required",
      "message": "Document name is required",
      "value": "documents.selectedDocument.name"
    }]);
    this.validation.addRule(1, "editDescription", [{
      "rule": "required",
      "message": "Document description is required",
      "value": "documents.selectedDocument.description"
    }]);
  }
}) || _class);

/***/ }),

/***/ "modules/admin/inventory/editInventory":
/*!******************************************************!*\
  !*** ./src/modules/admin/inventory/editInventory.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EditInventory: function() { return /* binding */ EditInventory; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var aurelia_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-router */ 6433);
/* harmony import */ var _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../resources/dialogs/common-dialogs */ 6545);
/* harmony import */ var _resources_utils_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../resources/utils/utils */ 8741);
/* harmony import */ var _resources_data_inventory__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../resources/data/inventory */ 5151);
/* harmony import */ var _resources_data_events__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../resources/data/events */ 4247);
/* harmony import */ var _resources_utils_validation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../resources/utils/validation */ 2824);
/* harmony import */ var _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../resources/utils/dataTable */ 6847);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../config/appConfig */ 1666);
/* harmony import */ var _resources_data_documents__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../resources/data/documents */ 7188);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! moment */ 381);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_10__);
var _dec, _class;











let EditInventory = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(aurelia_router__WEBPACK_IMPORTED_MODULE_1__.Router, _resources_data_inventory__WEBPACK_IMPORTED_MODULE_4__.Inventory, _resources_utils_validation__WEBPACK_IMPORTED_MODULE_6__["default"], _resources_utils_utils__WEBPACK_IMPORTED_MODULE_3__.Utils, _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_7__.DataTable, _config_appConfig__WEBPACK_IMPORTED_MODULE_8__.AppConfig, _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_2__.CommonDialogs, _resources_data_documents__WEBPACK_IMPORTED_MODULE_9__.DocumentsServices, _resources_data_events__WEBPACK_IMPORTED_MODULE_5__.Events), _dec(_class = class EditInventory {
  constructor(router, inventory, validation, utils, datatable, config, dialog, documents, events) {
    this.systemSelected = false;
    this.spinnerHTML = "";
    this.addressSelected = false;
    this.showDocumentForm = false;
    this.showDocuments = false;
    this.address = "";
    this.description = "";
    this.title = "Inventory";
    this.tabs = [{
      id: 'Maintenance',
      title: 'Maintenance'
    }, {
      id: 'History',
      title: 'History'
    }, {
      id: 'Purchase',
      title: 'Purchase'
    }, {
      id: 'Technical',
      title: "Technical"
    }, {
      id: 'Documents',
      title: "Documents"
    }];
    this.tabPath = './';
    this.router = router;
    this.inventory = inventory;
    this.utils = utils;
    this.validation = validation;
    this.validation.initialize(this);
    this.dataTable = datatable;
    this.dataTable.initialize(this);
    this.config = config;
    this.dialog = dialog;
    this.documents = documents;
    this.eventLayer = events;
    // this._setupValidation();

    this.userObj = JSON.parse(sessionStorage.getItem('user'));
  }
  attached() {
    $('[data-toggle="tooltip"]').tooltip();
  }
  async activate() {
    let responses = await Promise.all([this.inventory.getInventoryArray('?order=systemName', true), this.config.getConfig(), this.documents.getDocumentsCategoriesArray(), this.config.getSessions(), this.eventLayer.getEventsArray('', true)]);
    this.dataTable.updateArray(this.inventory.inventoryArray);
    this.filteredDocumentArray = this.documents.docCatsArray;
  }
  async refresh() {
    this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
    await this.inventory.getInventoryArray('?order=systemName', true);
    this.dataTable.updateArray(this.inventory.inventoryArray);
    this.spinnerHTML = "";
  }
  new() {
    this.editIndex = -1;
    this.inventory.selectInventory();
    $("#editSystemName").focus();
    this.systemSelected = true;
  }
  edit(index, el) {
    this.editIndex = this.dataTable.displayArray[index + parseInt(this.dataTable.startRecord)].baseIndex;
    this.inventory.selectInventory(this.editIndex);
    this.systemSelected = true;
    $("#editSystemName").focus();
    this.isDuplicate = false;
    this.eventScheduled = false;
    this.eventLayer.eventArray.forEach(item => {
      if (item.title.indexOf(this.inventory.selectedInventory.systemName) > -1) {
        this.eventScheduled = true;
        this.eventObject = {
          day: moment__WEBPACK_IMPORTED_MODULE_10___default()(item.start).format('YYYY-MM-DD')
        };
      }
    });
    if (this.selectedRow) this.selectedRow.children().removeClass('info');
    this.selectedRow = $(el.target).closest('tr');
    this.selectedRow.children().addClass('info');
  }
  async save() {
    let response = this.inventory.saveInventory();
    if (!response.error) {
      this.utils.showNotification('The system was saved');
    }
    this._cleanUp();
  }
  async delete() {
    this.dialog.showMessage("Are you sure you want to delete this device?", "Delete", ['Yes', 'No']).whenClosed(response => {
      if (!response.wasCancelled) {
        this.deleteIt();
      }
    });
  }
  async deleteIt() {
    await this.inventory.deleteInventory();
    this._cleanUp();
    this.refresh();
  }
  _cleanUp() {
    this.systemSelected = false;
  }
  duplicate() {
    delete this.inventory.selectedInventory._id;
    this.isDuplicate = true;
    this.utils.showNotification('The inventory item was duplicated. You must save it to create the database record.');
  }
  cancel() {}
  back() {
    this.systemSelected = false;
  }
  newIP() {
    this.address = "";
    this.description = "";
    this.selectedAddress = -1;
    this.addressSelected = true;
  }
  editIP(index, event) {
    this.selectedAddress = index;
    this.address = this.inventory.selectedInventory.IPAddress[index].address;
    this.description = this.inventory.selectedInventory.IPAddress[index].description;
  }
  saveAddress() {
    if (this.selectedAddress > -1) {
      this.inventory.selectedInventory.IPAddress[this.selectedAddress].address = this.address;
      this.inventory.selectedInventory.IPAddress[this.selectedAddress].description = this.description;
    } else {
      this.inventory.selectedInventory.IPAddress.push({
        "address": this.address,
        "description": this.description
      });
    }
    this.addressSelected = false;
  }
  cancelEditAddress() {
    if (this.selectedAddress > -1) {
      this.address = this.inventory.selectedInventory.IPAddress[this.selectedAddress].address;
      this.description = this.inventory.selectedInventory.IPAddress[this.selectedAddress].description;
    } else {
      this.address = "";
      this.description = "";
    }
  }
  addDocument(index) {
    if (!this.inventory.selectedInventory.documents) this.inventory.selectedInventory.documents = new Array();
    for (var i = 0; i < this.inventory.selectedInventory.documents.length; i++) {
      if (this.inventory.selectedInventory.documents[i].fileName == this.documents.selectedDocument.files[index].fileName) {
        return;
      }
    }
    var newDoc = {
      categoryCode: this.documents.selectedDocument.categoryCode,
      categoryName: this.documents.selectedDocument.name,
      fileName: this.documents.selectedDocument.files[index].fileName,
      default: true
    };
    this.inventory.selectedInventory.documents.push(newDoc);
  }
  chooseDocument(index, event) {
    this.documents.selectDocument(index);

    //Reset the selected row
    if (this.selectedRow) this.selectedRow.children().removeClass('info');
    this.selectedRow = $(event.target).closest('tr');
    this.selectedRow.children().addClass('info');
    this.showDocumentForm = true;
  }
  toggleDefault(index) {
    this.inventory.selectedInventory.documents[index].default = !this.inventory.selectedInventory.documents[index].default;
  }
  removeDocument(index) {
    this.inventory.selectedInventory.documents.splice(index, 1);
  }
  async scheduleEvent() {
    if (this.inventory.selectedInventory.maintenanceAlert === "0" || !this.inventory.selectedInventory.maintenanceAlert) {
      this.utils.showNotification('You have to enter a number of days.', 'warning');
      return;
    }
    this.eventLayer.selectEvent();
    this.eventLayer.selectedEvent.start = moment__WEBPACK_IMPORTED_MODULE_10___default()(this.inventory.selectedInventory.maintenanceEndDate).subtract(parseInt(this.inventory.selectedInventory.maintenanceAlert), 'days');
    this.eventLayer.selectedEvent.end = this.eventLayer.selectedEvent.start;
    this.eventLayer.selectedEvent.title = this.inventory.selectedInventory.systemName + ' expiration notice';
    this.eventLayer.selectedEvent.personId = this.userObj._id;
    this.eventLayer.selectedEvent.scope = "u";
    let response = await this.eventLayer.saveEvent();
    if (!response.error) {
      this.utils.showNotification('The event was scheuled');
    }
  }
  async typeChanged(index) {
    if (index >= 0) {
      this.categoryIndex = index;
      this.documents.selectCategory(index);
      await this.documents.getDocumentsArray(true, '?filter=categoryCode|eq|' + this.documents.selectedCat.code);
      this.showDocuments = true;
    }
  }
  filterList() {
    if (this.filter) {
      var thisFilter = this.filter;
      this.filteredDocumentArray = this.documents.docCatsArray.filter(item => {
        return item.description.substring(0, thisFilter.length).toUpperCase() === thisFilter.toUpperCase();
      });
    } else {
      this.filteredDocumentArray = this.documents.docCatsArray;
    }
  }
  async changeTab(el, index) {
    $("#invFormListGroup.list-group").children().removeClass('active');
    $(el.target).parent().addClass('active');
    $(".in").removeClass('active').removeClass('in');
    $("#" + el.target.id + "Tab").addClass('in').addClass('active');
  }
}) || _class);

/***/ }),

/***/ "modules/admin/customers/bulkEmails.html":
/*!*****************************************************!*\
  !*** ./src/modules/admin/customers/bulkEmails.html ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n  <span id=\"loading\">\r\n    <ul class=\"bokeh\">\r\n      <li></li>\r\n      <li></li>\r\n      <li></li>\r\n    </ul>\r\n  </span>\r\n  <div show.bind=\"dataTable.displayArray && dataTable.displayArray.length || initialLoaded\">\r\n    <compose view=\"./components/selectionForm.html\"></compose>\r\n  </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/customers/components/Address.html":
/*!*************************************************************!*\
  !*** ./src/modules/admin/customers/components/Address.html ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n     <div class=\"topMargin\">\r\n        <div class=\"bottomMargin list-group-item leftMargin rightMargin\">\r\n            <span click.delegate=\"copyInstAddress()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Copy Instituion Address\"><i class=\"fa fa-files-o fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n        </div>\r\n        <div class=\"topMargin\">\r\n            <div class=\"col-sm-12 col-lg-12\">\r\n                <label for=\"editAddress1\" class=\"control-label hideOnPhone\">Address 1</label>\r\n                <input value.bind=\"people.selectedPerson.address1\" id=\"editAddress1\" class=\"form-control \" placeholder=\"Address 1\" type=\"text\" />\r\n            </div>\r\n            <div class=\"col-sm-12 col-lg-12\">\r\n                <label for=\"editAddress2\" class=\"control-label hideOnPhone\">Address 2</label>\r\n                <input value.bind=\"people.selectedPerson.address2\" id=\"editAddress2\" class=\"form-control \" placeholder=\"Address2\" type=\"text\" />\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"col-sm-12 col-lg-12\">\r\n                <label for=\"editCity\" class=\"control-label hideOnPhone\">City</label>\r\n                <input value.bind=\"people.selectedPerson.city\" id=\"editCity\" class=\"form-control \" placeholder=\"City\" type=\"text\" />\r\n            </div>\r\n            <div class=\"col-sm-12 col-lg-12\">\r\n                <label for=\"editRegion\" class=\"control-label hideOnPhone\">Region</label>\r\n                <input value.bind=\"people.selectedPerson.region\" id=\"editRegion\" class=\"form-control \" placeholder=\"Region\" type=\"text\" />\r\n            </div>\r\n            <div class=\"col-sm-12 col-lg-12\">\r\n                <label for=\"editPostalCode\" class=\"control-label hideOnPhone\">Postal Code</label>\r\n                <input value.bind=\"people.selectedPerson.postalCode\" id=\"editPostalCode\" class=\"form-control \" placeholder=\"Postal Code\" type=\"text\" />\r\n            </div>\r\n            <div class=\"col-sm-12 col-lg-12\">\r\n                <label for=\"editCountry\" class=\"control-label hideOnPhone\">Country</label>\r\n                <input value.bind=\"people.selectedPerson.country\" change.trigger=\"getPhoneMask()\" id=\"editCountry\" class=\"form-control\" placeholder=\"Country\" type=\"text\" />\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/customers/components/Audit.html":
/*!***********************************************************!*\
  !*** ./src/modules/admin/customers/components/Audit.html ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t<div class=\"topMargin\">\r\n        <table id=\"auditTable\" class=\"table table-striped table-hover\">\r\n            <thead>\r\n                <tr>\r\n                    <th style=\"width:20rem;\">Property </th>\r\n                    <th style=\"width:30rem;\">Date</th>\r\n                    <th style=\"width:15rem;\">Old Value</th>\r\n\t\t\t\t\t<th style=\"width:15rem;\">New Value</th>\r\n\t\t\t\t\t<th style=\"width:15rem;\">Person</th>\r\n                </tr>\r\n            </thead>\r\n            <tbody>\r\n                <tr repeat.for=\"change of people.selectedPerson.audit\">\r\n                    <td>${change.property} </td>\r\n                    <td>${change.eventDate | dateFormat:config.DATE_FORMAT_TABLE}</td>\r\n                    <td>${change.oldValue}</td>\r\n\t\t\t\t\t<td>${change.newValue}</td>\r\n\t\t\t\t\t<td>${change.personId | lookupValue:people.peopleArray:\"_id\":\"fullName\"}</td>\r\n                </tr>\r\n            </tbody>\r\n        </table>\r\n\t</div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/customers/components/Courses.html":
/*!*************************************************************!*\
  !*** ./src/modules/admin/customers/components/Courses.html ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div class=\"topMargin\">\r\n        <table id=\"coursesTable\" class=\"table table-striped table-hover\">\r\n            <thead>\r\n                <tr>\r\n                    <td colspan='6'>\r\n                        <span click.delegate=\"refreshCourses()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Refresh\"><i class=\"fa fa-refresh\" aria-hidden=\"true\"></i></span>\r\n                        <span click.delegate=\"newCourse()\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"New Course\"><i class=\"fa fa-plus\" aria-hidden=\"true\"></i></span>\r\n                        <span class=\"pull-right\" id=\"spinner\" innerhtml.bind=\"spinnerHTML\"></span>\r\n                    </td>\r\n                </tr>\r\n                <tr>\r\n                    <th style=\"width:20rem;\">Number </th>\r\n                    <th style=\"width:30rem;\">Name</th>\r\n                    <th style=\"width:15rem;\">Status</th>\r\n                </tr>\r\n            </thead>\r\n            <tbody>\r\n                <tr id=\"selectCourse\" click.delegate=\"editACourse($index, $event)\"  repeat.for=\"course of people.coursesArray\">\r\n                    <td data-title=\"name\">${course.number} </td>\r\n                    <td data-title=\"insitution\">${course.name}</td>\r\n                    <td data-tile=\"phone\">${course.active | translateStatus}</td>\r\n                </tr>\r\n            </tbody>\r\n        </table>\r\n\r\n        <div class=\"row\" show.bind=\"courseSelected\">\r\n            <div class=\"panel panel-default col-md-12\">\r\n                <div class=\"panel-body\">\r\n                    <div class=\"bottomMargin\">\r\n                        <div class=\"bottomMargin list-group-item\">\r\n                            <span click.delegate=\"saveCourse()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Save\"><i class=\"fa fa-floppy-o fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n                            <span click.delegate=\"cancelEditCourse()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Cancel Changes\"><i class=\"fa fa-ban fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n                        </div>  \r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <input id=\"number\" value.bind=\"people.selectedCourse.number\" type=\"text\" placeholder=\"Course Number\"\r\n                            class=\"form-control\"/>\r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <input id=\"name\" value.bind=\"people.selectedCourse.name\" type=\"text\" placeholder=\"Course Name\"\r\n                            class=\"form-control\"/>\r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <div class=\"checkbox\">\r\n                            <label class=\"pull-left\">\r\n                                <input id=\"activeProduct\" checked.bind=\"people.selectedCourse.active\" type=\"checkbox\"> Active\r\n                            </label>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                \r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/customers/components/Email.html":
/*!***********************************************************!*\
  !*** ./src/modules/admin/customers/components/Email.html ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t<div class=\"row\">\r\n\t\t<fieldset class=\"form-group\">\r\n\t\t\t<div class=\"col-lg-12\">\r\n\t\t\t\t<label for=\"studentIdTemplate\" class=\"col-sm-6 form-control-label topMargin\">\r\n                Customer Message\r\n                <span class=\"smallLeftMargin\" click.delegate=\"sendCustomerEmail()\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Send\"><i class=\"fa fa-paper-plane\" aria-hidden=\"true\"></i></span>\r\n                <span class=\"smallLeftMargin\" click.delegate=\"cancelCustomerEmail()\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Cancel\"><i class=\"fa fa-ban\" aria-hidden=\"true\"></i></span>\r\n              </label>\r\n\t\t\t  <div class=\"col-lg-11\">\r\n\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t<Input class=\"form-control\" value.bind=\"email.subject\" placeholder=\"Email Subject\" />\r\n\t\t\t\t</div>\r\n\t\t\t  </div>\r\n\t\t\t  <div class=\"col-lg-11\">\r\n\t\t\t\t<div class=\"form-group\"> \r\n\t\t\t\t\t<editor value.bind=\"email.MESSAGE\" height=\"250\" toolbar.bind=\"toolbar\" ></editor>\r\n\t\t\t\t</div>\r\n\t\t\t  </div>\r\n\t\t\t</div>\r\n\t\t</fieldset>\r\n\t</div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/customers/components/Log.html":
/*!*********************************************************!*\
  !*** ./src/modules/admin/customers/components/Log.html ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t<div if.bind=\"!youSelectedAnEmail\" class=\"topMargin\">\r\n        <table id=\"auditTable\" class=\"table table-striped table-hover\">\r\n            <thead>\r\n                <tr>\r\n                    <th style=\"width:20rem;\">Date </th>\r\n                    <th style=\"width:30rem;\">Subject</th>\r\n                    <th style=\"width:15rem;\">Sender</th>\r\n                    <th>Email</th>\r\n                </tr>\r\n            </thead>\r\n            <tbody>\r\n                <tr click.trigger=\"selectEmail(email)\" repeat.for=\"email of people.emailArray\" > \r\n                    <td>${email.date | dateFormat:config.DATE_FORMAT_TABLE} </td>\r\n                    <td>${email.subject}</td>\r\n                    <td>${email.from | lookupValue:people.peopleArray:\"_id\":\"fullName\"}</td>\r\n                    <td>${email.email}</td>\r\n                </tr>\r\n            </tbody>\r\n        </table>\r\n    </div>\r\n    <div if.bind=\"youSelectedAnEmail\">\r\n        <div class=\"bottomMargin list-group-item\"> \r\n            <span click.delegate=\"backEmail()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n                data-original-title=\"Back\"><i class=\"fa fa-arrow-left fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n        </div>\r\n        <div class=\"overflow topMargin\" innerhtml.bind=\"selectedEmail.body\">\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/customers/components/Roles.html":
/*!***********************************************************!*\
  !*** ./src/modules/admin/customers/components/Roles.html ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div class=\"topMargin\">\r\n         <form>\r\n      <div class=\"col-md-5 topMargin\">\r\n        <label>Roles</label>\r\n        <div class=\"well well2 overFlow\" style=\"height:400px;\">\r\n            <ul class=\"list-group\">\r\n              <button click.trigger=\"selectRole($event, role)\" type=\"button\" repeat.for=\"role of filteredArray\" id=\"${role.role}\"\r\n                      class=\"list-group-item\">${role.label}</button>\r\n            </ul>\r\n        </div>\r\n      </div>\r\n      <div class=\"col-md-5 topMargin col-md-offset-1\">\r\n        <label>Assigned Roles</label>\r\n        <div class=\"well well2 overFlow\" style=\"height:400px;\">\r\n          <ul class=\"list-group\">\r\n            <button click.trigger=\"removeRole($index, role)\" type=\"button\" repeat.for=\"role of people.selectedPerson.roles\" id=\"${role}\"\r\n                    class=\"list-group-item\">${role | lookupValue:config.ROLES:'role':'label'}</button>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </form>\r\n</template";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/customers/components/composeEmail.html":
/*!******************************************************************!*\
  !*** ./src/modules/admin/customers/components/composeEmail.html ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div show.bind=\"composeEmailPanel\" class=\"panel panel-info leftMargin rightMargin topMargin bottomMargin\">\r\n        <div class=\"panel-body\">\r\n            <div class=\"list-group-item col-md-12 topMargin\">\r\n                <span click.delegate=\"sendTheBulkEmail()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n                    data-placement=\"bottom\" title=\"\" data-original-title=\"Send Email\"><i class=\"fa fa-floppy-o fa-lg fa-border\"\r\n                        aria-hidden=\"true\"></i></span>\r\n                <span click.delegate=\"cancel()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n                    data-placement=\"bottom\" title=\"\" data-original-title=\"Cancel\"><i class=\"fa fa-ban fa-lg fa-border\"\r\n                        aria-hidden=\"true\"></i></span>\r\n            </div>\r\n            <div class=\"col-lg-10 col-lg-offset-1 topMargin\">\r\n                <input value.bind=\"email.subject\" class=\"form-control\" placeholder=\"Subject\" />\r\n                <div class=\"topMargin\">\r\n                    <editor value.bind=\"email.MESSAGE\" height=\"250\" toolbar.bind=\"toolbar\"></editor>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/customers/components/emailTable.html":
/*!****************************************************************!*\
  !*** ./src/modules/admin/customers/components/emailTable.html ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\n    <div class='col-lg-10 col-lg-offset-1 bottomMargin'>\n        <div id=\"no-more-tables\">\n            <table class=\"table table-striped table-hover cf\">\n                <thead class=\"cf\">\n                    <tr colspan='7'>\n                            <compose view=\"../../../../resources/elements/table-navigation-bar.html\"></compose>\n                    </tr>  \n                    <tr>\n                        <td colspan='7'>\n                            <span click.delegate=\"downloadInstExcel()\"  class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Export to Excel\"><i class=\"fa fa-download\" aria-hidden=\"true\"></i></span>\n                        </td>\n                    </tr>                          \n                    <tr>\n                        <th style=\"width:20rem;\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'lastName'})\">Name </span><i class=\"fa fa-sort\"></i></th>                              \n                        <th style=\"width:30rem;\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'institutionId.name'})\">Institution </span><i class=\"fa fa-sort\"></i></th>\n                        <th>Institution Status</th>\n                        <th style=\"width:15rem;\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'city'})\">City </span><i class=\"fa fa-sort\"></i></th>\n                        <th style=\"width:15rem;\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'institutionId.region'})\">Region </span><i class=\"fa fa-sort\"></i></th>\n                        <th style=\"width:20rem;\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'email'})\">Email </span><i class=\"fa fa-sort\"></i></th>\n                        <th>Role</th>\n                        <th>Person Status</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    <tr class=\"sortable\" repeat.for=\"person of dataTable.displayArray\">\n                        <td  data-title=\"Name\">${person.firstName} ${person.lastName}</td>\n                        <td  data-title=\"Insitution\">${person.institutionId._id | lookupValue:people.institutionsArray:\"_id\":\"name\"}</td>\n                        <td data-title=\"Status\">${person.institutionId.institutionStatus | lookupValue:is4ua.institutonStatusArray:\"code\":\"description\"}</td>\n                        <td  data-tile=\"City\">${person.institutionId.city}</td>\n                        <td  data-tile=\"Region\">${person.institutionId.region}</td>\n                        <td  data-title=\"Email\">${person.email}</td>\n                        <td  data-title=\"Role\">${person.roles}</td>\n                        <td  data-title=\"Status\">${person.personStatus | lookupValue:is4ua.personStatusArray:\"code\":\"description\"}</td>\n                    </tr>\n                </tbody>\n            </table>\n        </div>\n    </div>\n</template>\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/customers/components/instAddress.html":
/*!*****************************************************************!*\
  !*** ./src/modules/admin/customers/components/instAddress.html ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div class=\"row topMargin\">\r\n        <!-- Row 5 -->\r\n        <div class=\"col-lg-6 topMargin\">\r\n            <div class=\"col-sm-12 col-lg-12\">\r\n                <div class=\"form-group\">\r\n                    <div class=\"col-sm-10\">\r\n                        <label>Address 1</label>\r\n                        <input value.bind=\"people.selectedInstitution.address1\" id=\"editAddress1\" class=\"form-control\"\r\n                            placeholder=\"Address 1\" type=\"text\" />\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"col-sm-12 col-lg-12\">\r\n                <div class=\"form-group\">\r\n                    <div class=\"col-sm-10\">\r\n                        <label>Address 2</label>\r\n                        <input value.bind=\"people.selectedInstitution.address2\" id=\"editAddress1\" class=\"form-control\"\r\n                            placeholder=\"Address 2\" type=\"text\" />\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"col-sm-12 col-lg-12\">\r\n                <div class=\"form-group\">\r\n                    <div class=\"col-sm-10\">\r\n                        <label>City</label>\r\n                        <input value.bind=\"people.selectedInstitution.city\" id=\"editCity\" class=\"form-control\"\r\n                            placeholder=\"City\" type=\"text\" />\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"col-sm-12 col-lg-12\">\r\n                <div class=\"form-group\">\r\n                    <div class=\"col-sm-10\">\r\n                        <label>Region</label>\r\n                        <input value.bind=\"people.selectedInstitution.region\" id=\"editRegion\" class=\"form-control\"\r\n                            placeholder=\"Region\" type=\"text\" />\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"col-sm-12 col-lg-12\">\r\n                <div class=\"form-group\">\r\n                    <div class=\"col-sm-10\">\r\n                        <label>Postal Code</label>\r\n                        <input value.bind=\"people.selectedInstitution.postalCode\" id=\"editPostalCode\"\r\n                            class=\"form-control\" placeholder=\"Postal Code\" type=\"text\" />\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"col-sm-12 col-lg-12\">\r\n                <div class=\"form-group\">\r\n                    <div class=\"col-sm-10\">\r\n                        <label>Country</label>\r\n                        <input value.bind=\"people.selectedInstitution.country\" id=\"editCountry\" class=\"form-control\"\r\n                            placeholder=\"Country\" type=\"text\" />\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-lg-6 topMargin\">\r\n            <div class=\"col-sm-12 col-lg-12\">\r\n                <div class=\"form-group\">\r\n                    <div class=\"col-sm-10\">\r\n                        <label>URL</label>\r\n                        <input value.bind=\"people.selectedInstitution.url\" id=\"editCountry\" class=\"form-control\"\r\n                            placeholder=\"URL\" type=\"text\" />\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"col-sm-12 col-lg-12\">\r\n                <div class=\"form-group\">\r\n                    <div class=\"col-sm-10\">\r\n                        <label>Time Zone</label>\r\n                        <select value.bind=\"people.selectedInstitution.timeZone\" class=\"form-control\">\r\n                            <option value=\"\">Select an option</option>\r\n                            <option repeat.for=\"zone of config.TIMEZONES\" value=\"${zone}\">${zone}</option>\r\n                        </select>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"col-sm-12 col-lg-12\">\r\n                <div class=\"form-group\">\r\n                    <div class=\"col-sm-10\">\r\n                        <div class=\"checkbox\">\r\n                            <label>\r\n                                <input checked.bind=\"people.selectedInstitution.apj\" type=\"checkbox\"> APJ\r\n                            </label>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n\r\n        </div>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/customers/components/instIs4ua.html":
/*!***************************************************************!*\
  !*** ./src/modules/admin/customers/components/instIs4ua.html ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div class=\"col-lg-6 topMargin\">\r\n        <div class=\"col-lg-12\">\r\n            <div class=\"form-group\">\r\n                <div class=\"col-sm-10\">\r\n                    <label>Institution Type *</label>\r\n                    <select value.bind=\"people.selectedInstitution.institutionType\" id=\"editInstitutionType\" class=\"form-control\">\r\n                        <option value=\"\">Select an option</option>\r\n                        <option repeat.for=\"status of is4ua.institutionTypes\" value=\"${status.code}\">${status.description}</option>\r\n                    </select>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-lg-12\">\r\n            <div class=\"form-group\">\r\n                <div class=\"col-sm-10\">\r\n                    <label>Member Type *</label>\r\n                    <select value.bind=\"people.selectedInstitution.memberType\" id=\"editMemberType\" class=\"form-control\">\r\n                        <option value=\"\">Select an option</option>\r\n                        <option repeat.for=\"status of is4ua.memberTypes\" value=\"${status.code}\">${status.description}</option>\r\n                    </select>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n     <div class=\"col-lg-6 topMargin\">\r\n        <div class=\"col-lg-12\">\r\n            <div class=\"form-group\">\r\n                <div class=\"col-sm-10\">\r\n                    <label class=\"left\">Highest Degree *</label>\r\n                    <select value.bind=\"people.selectedInstitution.highestDegree\" id=\"editHighestDegree\" class=\"form-control\">\r\n                        <option value=\"\">Select an option</option>\r\n                        <option repeat.for=\"status of is4ua.highestDegrees\" value=\"${status.code}\">${status.description}</option>\r\n                    </select>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-lg-12\">\r\n            <div class=\"form-group\">\r\n                <div class=\"col-sm-10\">\r\n                    <label>Department</label>\r\n                    <input value.bind=\"people.selectedInstitution.universityDept\" id=\"editDepartment\" class=\"form-control\" placeholder=\"Department\" type=\"text\" />\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/customers/components/instPeople.html":
/*!****************************************************************!*\
  !*** ./src/modules/admin/customers/components/instPeople.html ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n            <div class=\"col-lg-10 col-offset-lg-1\" style=\"padding:15px;\">\r\n\r\n            <table id=\"personTable2\" class=\"table table-striped table-hover\">\r\n                <thead>\r\n                    <tr>\r\n                        <th style=\"width:20rem;\">Name</th>\r\n                        <th style=\"width:15rem;\">Phone</th>\r\n                        <th style=\"width:20rem;\">eMail</th>\r\n                        <th>Role</th>\r\n                        <th>Status</th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody>\r\n                    <tr repeat.for=\"person of people.instutionPeopleArray\" class=\"blackText\">\r\n                        <td data-title=\"name\">${person.firstName} ${person.lastName}</td>\r\n                        <td data-tile=\"phone\">${person.phone | phoneNumber}</td>\r\n                        <td data-title=\"email\">${person.email}</td>\r\n                        <td data-title=\"role\">${person.roles}</td>\r\n                        <td data-title=\"status\">${person.personStatus | lookupValue:is4ua.personStatusArray:\"code\":\"description\"}</td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/customers/components/institutionDetails.html":
/*!************************************************************************!*\
  !*** ./src/modules/admin/customers/components/institutionDetails.html ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\n    <form class=\"form-horizontal\">\n        <div class=\"row\">\n            <div class=\"col-lg-3\">\n                <div class=\"form-group\">\n                    <div class=\"col-sm-10\">\n                        <label>Name *</label>\n                        <input value.bind=\"people.selectedInstitution.name\" id=\"editName\" class=\"form-control\"\n                            placeholder=\"Name\" type=\"text\" />\n                    </div>\n                </div>\n            </div>\n            <div class=\"col-lg-3\">\n                <div class=\"form-group\">\n                    <div class=\"col-sm-10\">\n                        <label>Modifed Date</label>\n                        <flat-picker controlid=\"modifiedDate\" config.bind=\"dateConfig\" value.bind=\"people.selectedInstitution.dateModified\"></flat-picker>\n                    </div>\n                </div>\n            </div>\n            <div class=\"col-lg-3\">\n                <div class=\"form-group\">\n                    <div class=\"col-sm-10\">\n                        <label>Date Joined</label>\n                        <flat-picker controlid=\"joinDate\" config.bind=\"dateConfig\" value.bind=\"people.selectedInstitution.joinDate\"></flat-picker>\n                    </div>\n                </div>\n            </div>\n            <div class=\"col-lg-3\">\n                <div class=\"form-group\">\n                    <div class=\"col-sm-10\">\n                        <label>Date Dropped</label>\n                        <flat-picker controlid=\"dropDate\" config.bind=\"dateConfig\" value.bind=\"people.selectedInstitution.dropDate\"></flat-picker>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-lg-3\">\n                <div class=\"form-group\">\n                    <div class=\"col-sm-10\">\n                        <label class=\"left\">Status *</label>\n                        <select value.bind=\"people.selectedInstitution.institutionStatus\" id=\"editInstitutonStatusArray\"\n                            class=\"form-control\">\n                            <option value=\"\">Select an option</option>\n                            <option repeat.for=\"status of is4ua.institutonStatusArray\" value=\"${status.code}\">${status.description}</option>\n                        </select>\n                    </div>\n                </div>\n            </div>\n             <div class=\"col-lg-3\">\n                <div class=\"form-group\">\n                    <div class=\"col-sm-10\">\n                        <label>MAC</label>\n                        <input value.bind=\"people.selectedInstitution.mac\" id=\"editMac\" class=\"form-control\"\n                            placeholder=\"Mac\" type=\"text\" />\n                    </div>\n                </div>\n            </div>\n        </div>\n    </form>\n</template>\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/customers/components/institutionPanels.html":
/*!***********************************************************************!*\
  !*** ./src/modules/admin/customers/components/institutionPanels.html ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\n    <div class=\"panel panel-default topMargin panelContrastColor\">\n        <div class=\"panel-body\">\n            <div class=\"col-lg-2\">\n                <div id=\"instFormListGroup\" class=\"list-group\">\n                    <a class=\"${ $first ? 'menuButtons' : ''} list-group-item\" repeat.for=\"tab of tabs\" href=\"\" class=\"list-group-item\"\n                        click.delegate=\"changeTab($event, $index)\">\n                        <h4 id=\"${tab.id}\" class=\"list-group-item-heading\">${tab.title}</h4>\n                    </a>\n                </div>\n            </div>\n\n            <div class=\"col-lg-10\">\n                <div class=\"tab-content\">\n                  <div id=\"instAddressTab\" class=\"tab-pane fade in active' }\">\n                    <compose view=\"./instAddress.html\"></compose>\n                  </div>\n                  <div id=\"RolesTab\" class=\"tab-pane fade\">\n                    <compose view=\"./Roles.html\"></compose>\n                  </div>\n                  <div id=\"instPeopleTab\" class=\"tab-pane fade\">\n                    <compose view=\"./instPeople.html\"></compose>\n                  </div>\n                  <div id=\"instIs4uaTab\" class=\"tab-pane fade\">\n                    <compose view=\"./instIs4ua.html\"></compose>\n                  </div>\n                \n                    <!-- <div repeat.for=\"tab of tabs\" id=\"${tab.id + 'Tab'}\" class=\"${ $first ? 'tab-pane fade in active' : 'tab-pane fade' }\">\n                        <compose view=\"${tabPath + tab.id + '.html'}\"></compose>\n                    </div> -->\n                </div>\n            </div>\n        </div>\n    </div>\n</template>\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/customers/components/institutionsForm.html":
/*!**********************************************************************!*\
  !*** ./src/modules/admin/customers/components/institutionsForm.html ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <style>\r\n        .menuButtons {\r\n            color:${config.ACTIVE_SUBMENU_COLOR}\r\n            ;\r\n            background-color:${config.BUTTONS_BACKGROUND}\r\n        }\r\n    </style>\r\n    <div class=\"list-group-item toolbar\">\r\n        <span click.delegate=\"back()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n            title=\"\" data-original-title=\"Back\"><i class=\"fa fa-arrow-left fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n        <span click.delegate=\"save()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n            title=\"\" data-original-title=\"Save\"><i class=\"fa fa-floppy-o fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n        <span click.delegate=\"cancel()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n            title=\"\" data-original-title=\"Cancel Changes\"><i class=\"fa fa-ban fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n        <span show.bind=\"!newInstitution\" click.delegate=\"delete()\" class=\"smallMarginRight\" bootstrap-tooltip\r\n            data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Delete\"><i class=\"fa fa-trash fa-lg fa-border text-danger\"\r\n                aria-hidden=\"true\"></i></span>\r\n    </div>\r\n\r\n    <div class=\"panel panel-default positionUnderToolbar\">\r\n        <div class=\"panel-body\">\r\n            <compose view=\"./institutionDetails.html\"></compose>\r\n            <compose view=\"./institutionPanels.html\"></compose>\r\n        </div>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/customers/components/institutionsTable.html":
/*!***********************************************************************!*\
  !*** ./src/modules/admin/customers/components/institutionsTable.html ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\n    <div class=\"panel panel-info\">\n        <div class=\"panel-body\">\n            <div class=\"row\">\n                <div class='col-lg-10 col-lg-offset-1 bottomMargin'>\n                    <div id=\"no-more-tables\">\n\n                        <table class=\"table table-striped table-hover cf\">\n                            <thead class=\"cf\">\n                                <tr colspan='6'>\n                                    <compose view=\"../../../../resources/elements/table-navigation-bar.html\"></compose>\n                                </tr>\n                                <tr>\n                                    <td colspan='6'>\n                                        <span click.delegate=\"refresh()\" class=\"smallMarginRight\" bootstrap-tooltip\n                                            data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Refresh\"><i\n                                                class=\"fa fa-refresh\" aria-hidden=\"true\"></i></span>\n                                        <span click.delegate=\"new()\" class=\"smallMarginRight\" bootstrap-tooltip\n                                            data-toggle=\"tooltip\" |data-placement=\"bottom\" title=\"\" data-original-title=\"New\"><i\n                                                class=\"fa fa-plus\" aria-hidden=\"true\"></i></span>\n                                        <span click.delegate=\"downloadInstExcel()\" class=\"smallMarginRight\"\n                                            bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\n                                            data-original-title=\"Export to Excel\"><i class=\"fa fa-download\" aria-hidden=\"true\"></i></span>\n                                        <span click.delegate=\"_clearFilters()\" class=\"smallMarginRight\"\n                                            bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\n                                            data-original-title=\"Clear Filters\"><i class=\"fa fa-filter\" aria-hidden=\"true\"></i></span>\n                                     \n                                <span class=\"pull-right\" id=\"spinner\" innerhtml.bind=\"spinnerHTML\"></span>\n                              \n\n                                    </td>\n                                </tr>\n                                <tr>\n                                    <th style=\"width:20rem;\"><span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'name'})\">Name\n                                        </span><span><i class=\"fa fa-sort\"></i></span></th>\n                                    <th style=\"width:10rem;\">Country</th>\n                                    <th style=\"width:10rem;\">Region</th>\n                                    <th style=\"width:30rem;\">Institution Type</th>\n                                    <th style=\"width:15rem;\">Member Type</th>\n                                    <th style=\"width:20rem;\">Member Since</th>\n                                    <th>Highest Degree</th>\n                                    <th>Status</th>\n                                </tr>\n                            </thead>\n                            <tbody>\n                                <tr>\n                                    <th>\n                                        <input value.bind=\"nameFilterValue\" input.delegate=\"dataTable.filterList(nameFilterValue, { type: 'text',  filter: 'nameFilter', lookupArray: '', lookupProperty: '', collectionProperty: 'name', displayProperty: 'fullnameName', matchProperty:'', compare:'match'} )\"\n                                            class=\"form-control\" />\n                                    </th>\n                                    <th>\n                                      <input value.bind=\"countryFilterValue\" input.delegate=\"dataTable.filterList(countryFilterValue, { type: 'text',  filter: 'countryFilter', lookupArray: '', lookupProperty: '', collectionProperty: 'country', displayProperty: 'country', matchProperty:'', compare:'match'} )\"\n                                          class=\"form-control\" />\n                                  </th>\n                                  <th>\n                                    <input value.bind=\"regionFilterValue\" input.delegate=\"dataTable.filterList(regionFilterValue, { type: 'text',  filter: 'regionFilter', lookupArray: '', lookupProperty: '', collectionProperty: 'region', displayProperty: 'region', matchProperty:'', compare:'match'} )\"\n                                        class=\"form-control\" />\n                                </th>\n                                    <th>\n                                        <select value.bind=\"institutionTypeFilter\" input.delegate=\"dataTable.filterList($event, { type: 'value',  filter: 'institutionTypeFilter',  collectionProperty: 'institutionType', displayProperty: 'institutionType', compare:'match'} )\"\n                                            class=\"form-control\">\n                                            <option value=\"\"></option>\n                                            <option repeat.for=\"institution of is4ua.institutionTypes\" value=\"${institution.code}\">${institution.description}</option>\n                                        </select>\n                                    </th>\n                                    <th>\n                                        <select value.bind=\"memberTypeFilter\" input.delegate=\"dataTable.filterList($event, { type: 'value',  filter: 'memberTypeFilter', lookupArray: '', lookupProperty: '', collectionProperty: 'memberType', displayProperty: 'memberType', matchProperty:'', compare:'match'} )\"\n                                            class=\"form-control\">\n                                            <option value=\"\"></option>\n                                            <option repeat.for=\"institution of is4ua.memberTypes\" value=\"${institution.code}\">${institution.description}</option>\n                                        </select>\n                                    </th>\n                                    <th></th>\n                                    <th>\n                                        <select value.bind=\"highestDegreeFilter\" input.delegate=\"dataTable.filterList($event, { type: 'value',  filter: 'highestDegreeFilter', lookupArray: '', lookupProperty: '', collectionProperty: 'highestDegree', displayProperty: 'highestDegree', matchProperty:'', compare:'match'} )\"\n                                            class=\"form-control\">\n                                            <option value=\"\"></option>\n                                            <option repeat.for=\"institution of is4ua.highestDegrees\" value=\"${institution.code}\">${institution.description}</option>\n                                        </select>\n                                    </th>\n                                    <th>\n                                        <select value.bind=\"institutionStatusFilter\" input.delegate=\"dataTable.filterList($event, { type: 'value',  filter: 'institutionStatusFilter', lookupArray: '', lookupProperty: '', collectionProperty: 'institutionStatus', displayProperty: 'institutionStatus', matchProperty:'', compare:'match'} )\"\n                                            class=\"form-control\">\n                                            <option value=\"\"></option>\n                                            <option repeat.for='status of is4ua.institutonStatusArray' value=\"${status.code}\">${status.description}</option>\n                                        </select>\n                                    </th>\n                                </tr>\n                                <tr class=\"sortable\" click.trigger=\"edit($index, $event)\" repeat.for=\"inst of dataTable.displayArray\">\n                                    <td data-title=\"Name\">${inst.name}</td>\n                                    <td data-tile=\"Country\">${inst.country}</td>\n                                    <td data-tile=\"Region\">${inst.region}</td>\n                                    <td data-title=\"Type\">${inst.institutionType |\n                                        lookupValue:is4ua.institutionTypes:\"code\":\"description\"}</td>\n                                    <td data-tile=\"Phone\">${inst.memberType |\n                                        lookupValue:is4ua.memberTypes:\"code\":\"description\"}</td>\n                                    <td data-title=\"Email\">${inst.joinDate | dateFormat:config.DATE_FORMAT_TABLE:true}</td>\n                                    <td data-title=\"Role\">${inst.highestDegree |\n                                        lookupValue:is4ua.highestDegrees:\"code\":\"description\"}</td>\n                                    <td data-title=\"Status\">${inst.institutionStatus |\n                                        lookupValue:is4ua.institutonStatusArray:\"code\":\"description\"}</td>\n                                </tr>\n                            </tbody>\n                        </table>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div> \n</template>\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/customers/components/peopleForm.html":
/*!****************************************************************!*\
  !*** ./src/modules/admin/customers/components/peopleForm.html ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\n    <style>\n        .menuButtons {\n\t\t\tcolor: ${config.ACTIVE_SUBMENU_COLOR};\n\t\t\tbackground-color:${config.BUTTONS_BACKGROUND}\n        }\n    </style>\n    <div class=\"list-group-item toolbar\">\n        <span click.delegate=\"back()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\n            title=\"\" data-original-title=\"Back\"><i class=\"fa fa-arrow-left fa-lg fa-border\" aria-hidden=\"true\"></i></span>\n        <span click.delegate=\"save()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\n            title=\"\" data-original-title=\"Save\"><i class=\"fa fa-floppy-o fa-lg fa-border\" aria-hidden=\"true\"></i></span>\n        <span click.delegate=\"cancel()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\n            title=\"\" data-original-title=\"Cancel Changes\"><i class=\"fa fa-ban fa-lg fa-border\" aria-hidden=\"true\"></i></span>\n        <span show.bind=\"!newPerson\" click.delegate=\"delete()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\n            data-placement=\"bottom\" title=\"\" data-original-title=\"Delete\"><i class=\"fa fa-trash fa-lg fa-border text-danger\"\n                aria-hidden=\"true\"></i></span>\n    </div>\n\n    <div class=\"panel panel-info positionUnderToolbar\">\n        <div class=\"panel-body\">\n            <div class=\"row\">\n                <form class=\"form-horizontal topMargin\">\n                    <div class=\"row\">\n                        <div class=\"col-lg-1\">\n                            <div class=\"topMargin\">\n                                <img if.bind=\"profileHelpTicket.personId.file.fileName\" class=\"circular--square leftMargin\"\n                                    src=\"${config.PERSON_IMAGE_DOWNLOAD_URL}/${people.selectedPerson.file.fileName}\"\n                                    height=\"100\">\n                            </div>\n                            <div if.bind=\"!profileHelpTicket.personId.file.fileName\" style=\"height:100px;width:100px;\"\n                                innerhtml.bind=\"people.selectedPerson.email | gravatarUrl:100:6\"></div>\n                        </div>\n                        <div class=\"col-lg-11\">\n                            <form class=\"horizontal-form\">\n                                <div class=\"col-lg-4\">\n                                    <div class=\"form-group\">\n                                        <label for=\"editFirstName\" class=\"col-sm-3 control-label hideOnPhone\">First\n                                            Name *</label>\n                                        <div class=\"col-sm-8\">\n                                            <input value.bind=\"people.selectedPerson.firstName\" id=\"editFirstName\"\n                                                class=\"form-control \" placeholder=\"First Name\" type=\"text\" />\n                                        </div>\n                                    </div>\n                                </div>\n                                <div class=\"col-lg-4\">\n                                    <div class=\"form-group\">\n                                        <label for=\"editMiddleName\" class=\"col-sm-3 control-label hideOnPhone\">Middle\n                                            Name</label>\n                                        <div class=\"col-sm-8\">\n                                            <input value.bind=\"people.selectedPerson.middleName\" id=\"editMiddleName\"\n                                                class=\"form-control \" placeholder=\"Middle Name\" type=\"text\" />\n                                        </div>\n                                    </div>\n                                </div>\n                                <div class=\"col-lg-4\">\n                                    <div class=\"form-group\">\n                                        <label for=\"editLastName\" class=\"col-sm-3 control-label hideOnPhone\">Last\n                                            Name *</label>\n                                        <div class=\"col-sm-8\">\n                                            <input value.bind=\"people.selectedPerson.lastName\" id=\"editLastName\" class=\"form-control \"\n                                                placeholder=\"Last Name\" type=\"text\" />\n                                        </div>\n                                    </div>\n                                </div>\n                                <div class=\"col-lg-4\">\n                                    <div class=\"form-group\">\n                                        <label for=\"editLastName\" class=\"col-sm-3 control-label hideOnPhone\">Nickname</label>\n                                        <div class=\"col-sm-8\">\n                                            <input value.bind=\"people.selectedPerson.nickName\" id=\"editLastName\" class=\"form-control \"\n                                                placeholder=\"Nickname\" type=\"text\" />\n                                        </div>\n                                    </div>\n                                </div>\n                                <div class=\"col-lg-4\">\n                                    <div class=\"form-group\">\n                                        <label class=\"control-label col-sm-3 hideOnPhone\">Status *</label>\n                                        <div class=\"col-sm-8\">\n                                            <select keypress.bind=\"setStatus($event)\" value.bind=\"people.selectedPerson.personStatus\"\n                                                id=\"editStatus\" class=\"form-control \" placeholder=\"Status\">\n                                                <option value=\"\">Select an option</option>\n                                                <option repeat.for='status of is4ua.personStatusArray' value=\"${status.code}\">${status.description}</option>\n                                            </select>\n                                        </div>\n                                    </div>\n                                </div>\n                                <div class=\"col-lg-4\">\n                                    <div class=\"form-group\">\n                                        <label for=\"editMobile\" class=\"col-sm-3 control-label hideOnPhone\">Mobile</label>\n                                        <div class=\"col-sm-8\">\n                                            <input if.bind=\"phoneMask\" class=\"form-control\" id=\"editMobile\" masked=\"value.bind: people.selectedPerson.mobile; mask.bind: phoneMask; placeholder: *\" />\n                                            <input if.bind=\"!phoneMask\" class=\"form-control\" id=\"editMobile\" value.bind=\"people.selectedPerson.mobile\" />\n                                        </div>\n                                    </div>\n                                </div>\n                                <div class=\"col-lg-4\">\n                                    <div class=\"form-group\">\n                                        <label for=\"editPhone\" class=\"col-sm-3 control-label hideOnPhone\">Phone *</label>\n                                        <div class=\"col-sm-8\">\n                                            <input if.bind=\"phoneMask\" class=\"form-control\" id=\"editPhone\" masked=\"value.bind: people.selectedPerson.phone; mask.bind: phoneMask; placeholder: *\" />\n                                            <input if.bind=\"!phoneMask\" class=\"form-control\" id=\"editPhone\" value.bind=\"people.selectedPerson.phone\" />\n                                        </div>\n                                    </div>\n                                </div>\n                                <div class=\"col-lg-4\">\n                                    <div class=\"form-group\">\n                                        <label for=\"editPhone\" class=\"col-sm-3 control-label hideOnPhone\">Extension</label>\n                                        <div class=\"col-sm-8\">\n                                            <input class=\"form-control\" id=\"editPhoneExt\" value.bind=\"people.selectedPerson.ext\" />\n                                        </div>\n                                    </div>\n                                </div>\n                                <div class=\"col-lg-4\">\n                                    <div class=\"form-group\">\n                                        <label for=\"editEmail\" class=\"col-sm-3 control-label hideOnPhone\">Email *</label>\n                                        <div class=\"col-sm-8\">\n                                            <input value.bind=\"people.selectedPerson.email\" id=\"editEmail\" class=\"form-control \"\n                                                placeholder=\"Email\" type=\"text\" blur.trigger=\"checkEmail()\" />\n                                        </div>\n                                    </div>\n                                </div>\n\n                                <div class=\"col-lg-4\">\n                                    <div class=\"form-group\">\n                                        <label for=\"editInstitution\" class=\"col-sm-3 control-label\">Institution *</label>\n                                        <div class=\"col-sm-8\">\n                                            <select change.trigger=\"changeInstitution()\" value.bind=\"institutionId\" id=\"editInstitution\"\n                                                class=\"form-control \" placeholder=\"Institution\">\n                                                <option value=\"\">Select an option</option>\n                                                <option repeat.for=\"institution of people.institutionsArray\" value=\"${institution._id}\">${institution.name}</option>\n                                            </select>\n                                        </div>\n                                    </div>\n                                </div>\n\n                                <div class=\"col-lg-4\">\n                                    <div class=\"form-group\">\n                                        <label for=\"editSpecialization\" class=\"col-sm-3 control-label\">Specialization</label>\n                                        <div class=\"col-sm-8\">\n                                            <select value.two-way=\"people.selectedPerson.personSpecialization\" id=\"editSpecialization\"\n                                                class=\"form-control \" placeholder=\"Specializatin\">\n                                                <option value=\"\">Select an option</option>\n                                                <option repeat.for=\"name of is4ua.specialArray\" value=\"${name.code}\">${name.description}</option>\n                                            </select>\n                                        </div>\n                                    </div>\n                                </div>\n                                <div class=\"col-lg-4\">\n                                    <div class=\"form-group\">\n                                        <label for=\"editDepartment\" class=\"col-sm-3 control-label\">Department</label>\n                                        <div class=\"col-sm-8\">\n                                            <select value.two-way=\"people.selectedPerson.departmentCategory\" id=\"editDepartment\"\n                                                class=\"form-control \" placeholder=\"Department\">\n                                                <option value=\"\">Select an option</option>\n                                                <option repeat.for=\"name of is4ua.deptArray\" value=\"${name.code}\">${name.description}</option>\n                                            </select>\n                                        </div>\n                                    </div>\n                                </div>\n                        </div>\n                </form>\n            </div>\n\n            <div class=\"row bigTopMargin\">\n                <div class=\"col-lg-9 col-lg-offset-2\">\n                    <div class=\"row\">\n                        <div class=\"panel panel-default panelContrastColor\">\n                            <div class=\"panel-body\">\n                                <div class=\"col-lg-2\">\n                                    <div id=\"peopleFormListGroup\" class=\"list-group\">\n                                        <a class=\"${ $first ? 'menuButtons' : ''} list-group-item\" repeat.for=\"tab of tabs\"\n                                            href=\"\" class=\"list-group-item\" click.delegate=\"changeTab($event, $index)\">\n                                            <h4 id=\"${tab.id}\" class=\"list-group-item-heading\">${tab.id}</h4>\n                                        </a>\n                                    </div>\n                                </div>\n                                <div class=\"col-lg-10\">\n                                  <div class=\"tab-content\">\n                                    <div id=\"AddressTab\" class=\"tab-pane fade in active' }\">\n                                      <compose view=\"./Address.html\"></compose>\n                                    </div>\n                                    <div id=\"RolesTab\" class=\"tab-pane fade\">\n                                      <compose view=\"./Roles.html\"></compose>\n                                    </div>\n                                    <div id=\"CoursesTab\" class=\"tab-pane fade\">\n                                      <compose view=\"./Courses.html\"></compose>\n                                    </div>\n                                    <div id=\"AuditTab\" class=\"tab-pane fade\">\n                                      <compose view=\"./Audit.html\"></compose>\n                                    </div>\n                                    <div id=\"EmailTab\" class=\"tab-pane fade\">\n                                      <compose view=\"./Email.html\"></compose>\n                                    </div>\n                                    <div id=\"LogTab\" class=\"tab-pane fade\">\n                                      <compose view=\"./Log.html\"></compose>\n                                    </div>\n                                  </div>\n                                </div>\n\n                                <!-- <div class=\"col-lg-10\">\n                                    <div class=\"tab-content\">\n                                        <div repeat.for=\"tab of tabs\" id=\"${tab.id + 'Tab'}\" class=\"${ $first ? 'tab-pane fade in active' : 'tab-pane fade' }\">\n                                            <compose view=\"${tabPath + tab.id + '.html'}\"></compose>\n                                        </div>\n                                    </div>\n                                </div> -->\n\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            </form>\n        </div>\n    </div>\n</template>\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/customers/components/peopleTable.html":
/*!*****************************************************************!*\
  !*** ./src/modules/admin/customers/components/peopleTable.html ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\n    <div class=\"panel panel-info\">\n        <div class=\"panel-body\">\n            <div class=\"row\">\n                <div class=\"col-lg-12 col-sm-12\">\n                    <div class='row'>\n                        <div class='col-lg-10 col-lg-offset-1 bottomMargin'>\n                            <div id=\"no-more-tables\">\n                                <table class=\"table table-striped table-hover cf\">\n                                    <thead class=\"cf\">\n                                        <tr colspan='7'>\n                                            <compose view=\"../../../../resources/elements/table-navigation-bar.html\"></compose>\n                                        </tr>\n                                        <tr>\n                                        <tr>\n                                            <td colspan='7'>\n                                                <span click.delegate=\"refresh()\" class=\"smallMarginRight\"\n                                                    bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\n                                                    title=\"\" data-original-title=\"Refresh\"><i class=\"fa fa-refresh\"\n                                                        aria-hidden=\"true\"></i></span>\n                                                <span click.delegate=\"new()\" class=\"smallMarginRight\" bootstrap-tooltip\n                                                    data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\n                                                    data-original-title=\"New\"><i class=\"fa fa-plus\" aria-hidden=\"true\"></i></span>\n                                                <span click.delegate=\"downloadInstExcel()\" class=\"smallMarginRight\"\n                                                    bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\n                                                    title=\"\" data-original-title=\"Export to Excel\"><i class=\"fa fa-download\"\n                                                        aria-hidden=\"true\"></i></span>\n                                                <span click.delegate=\"_clearFilters()\" class=\"smallMarginRight\"\n                                                    bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\n                                                    title=\"\" data-original-title=\"Clear Filters\"><i class=\"fa fa-filter\"\n                                                        aria-hidden=\"true\"></i></span>\n                                                <!--\n                                    <span  click.delegate=\"archiveInactivePeople()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Archive Inactive\"><i class=\"fa fa-archive\" aria-hidden=\"true\"></i></span> \n                                    \n                                    <span class=\"pull-right\" id=\"spinner\" innerhtml.bind=\"spinnerHTML\"></span>\n                                    -->\n\n                                            </td>\n                                        </tr>\n                                        <tr>\n                                            <th style=\"width:20rem;\"><span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'fullName'})\">Name\n                                                </span><i class=\"fa fa-sort\"></i></th>\n                                            <th class=\"col-lg-1\"><span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'nickName'})\">Nickname\n                                                </span><i class=\"fa fa-sort\"></i></th>\n                                            <th style=\"width:30rem;\"><span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {type: 'custom', sorter: customInstitutionSorter, propertyName: 'intitutionId'})\">Institution\n                                                </span><i class=\"fa fa-sort\"></i></th>\n                                            <th style=\"width:15rem;\">Phone</th>\n                                            <th style=\"width:20rem;\"><span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'email'})\">Email\n                                                </span><i class=\"fa fa-sort\"></i></th>\n                                            <th>Role</th>\n                                            <th>Status</th>\n                                        </tr>\n                                    </thead>\n                                    <tbody>\n                                        <tr>\n                                            <th>\n                                                <input value.bind=\"nameFilterValue\" input.delegate=\"dataTable.filterList(nameFilterValue, { type: 'text',  filter: 'nameFilter', collectionProperty: 'fullName', displayProperty: 'fullName',  compare:'match'} )\"\n                                                    class=\"form-control\" />\n                                            </th>\n                                            <th>\n                                                <input value.bind=\"nickNameFilterValue\" input.delegate=\"dataTable.filterList(nickNameFilterValue, { type: 'text',  filter: 'nickNameFilter',  collectionProperty: 'nickName', displayProperty: 'nickName',  compare:'match'} )\"\n                                                    class=\"form-control\" />\n                                            </th>\n                                            <th>\n                                                <input value.bind=\"institutionFilterValue\" input.delegate=\"dataTable.filterList(institutionFilterValue, { type: 'custom',  filter: institutionCustomFilter, compare:'custom'} )\"\n                                                    class=\"form-control\" />\n                                            </th>\n                                            <th></th>\n                                            <th>\n                                                <input value.bind=\"emailFilterValue\" input.delegate=\"dataTable.filterList(emailFilterValue, { type: 'text',  filter: 'emailFilter',  collectionProperty: 'email', displayProperty: 'email',  compare:'match'} )\"\n                                                    class=\"form-control\" />\n                                            </th>\n                                            <th>\n                                                <input value.bind=\"roleFilter\" input.delegate=\"dataTable.filterList($event, { type: 'custom',  filter: customRoleFilter, compare:'custom'} )\"\n                                                    class=\"form-control\" />\n\n                                            </th>\n                                            <th>\n                                                <select value.bind=\"activeFilterValue\" change.delegate=\"filterActive()\"\n                                                    class=\"form-control \" id=\"personStatus\">\n                                                    <option value=\"\"></option>\n                                                    <option repeat.for='status of is4ua.personStatusArray' model.bind='status.code'>${status.description}</option>\n                                                </select>\n                                            </th>\n                                        </tr>\n                                        <tr class=\"sortable\" repeat.for=\"person of dataTable.displayArray\">\n                                            <td click.trigger=\"edit($index, $event)\" data-title=\"Name\">${person.firstName}\n                                                ${person.lastName}</td>\n                                            <td click.trigger=\"edit($index, $event)\" data-title=\"Nickname\">${person.nickName}</td>\n                                            <td click.trigger=\"edit($index, $event)\" data-title=\"Insitution\">${person.institutionId.name}</d>\n                                            <td click.trigger=\"edit($index, $event)\" data-tile=\"Phone\">${person.phone |\n                                                phoneNumber:config.PHONE_MASKS:person.country}</td>\n                                            <td class=\"dropbtn\" data-title=\"Email\" click.delegate=\"sendAnEmail(person._id)\">${person.email}</td>\n                                            <td click.trigger=\"edit($index, $event)\" data-title=\"Role\">${person.roles}</td>\n                                            <td class=\"dropbtn\" click.trigger=\"toggleStatus(person._id, person.personStatus)\"\n                                                data-title=\"Status\">${person.personStatus |\n                                                lookupValue:is4ua.personStatusArray:\"code\":\"description\"}\n                                                <span click.delegate=\"toggleStatus(person._id, person.personStatus)\"\n                                                    innerhtml=\"${person.personStatus | activateButton}\"></span>\n                                            </td>\n                                        </tr>\n                                    </tbody>\n                                </table>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</template>\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/customers/components/selectionForm.html":
/*!*******************************************************************!*\
  !*** ./src/modules/admin/customers/components/selectionForm.html ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t<div class=\" list-group-item toolbar\">\r\n\t\t<span click.delegate=\"save()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n\t\t title=\"\" data-original-title=\"Save\"><i class=\"fa fa-floppy-o fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n\t\t<span click.delegate=\"_clearFilters()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n\t\t data-placement=\"bottom\" title=\"\" data-original-title=\"Clear Filters\"><i class=\"fa fa-filter\" aria-hidden=\"true\"></i></span>\r\n\t\t<span click.delegate=\"composeEmail()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n\t\t title=\"\" data-original-title=\"Send\"><i class=\"fa fa-paper-plane fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n\t</div>\r\n\t<div class=\"panel panel-info positionUnderToolbar\">\r\n\t\t<div class=\"panel-body\">\r\n\t\t\t<div class=\"row\">\r\n\t\t\t\t<compose view=\"./composeEmail.html\"></compose>\r\n\t\t\t\t<compose view=\"./selectionPanel.html\"></compose>\r\n\t\t\t\t<compose view=\"./emailTable.html\"></compose>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/customers/components/selectionPanel.html":
/*!********************************************************************!*\
  !*** ./src/modules/admin/customers/components/selectionPanel.html ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n  <div class=\"panel panel-info leftMargin rightMargin\">\r\n    <div class=\"panel-body\">\r\n      <div class=\"row\">\r\n        <div class=\"col-lg-2\">\r\n          <label class=\"control-label hideOnPhone\">Customer</label>\r\n          <input value.bind=\"CustomerFilter\"\r\n            input.delegate=\"dataTable.filterList(CustomerFilter, { type: 'custom',  filter: customerCustomFilter, compare:'custom'} )\"\r\n            class=\"form-control\" ref=\"nameFilter\" />\r\n        </div>\r\n        <div class=\"col-lg-2\">\r\n          <label class=\"control-labelhideOnPhone\">Status</label>\r\n          <select value.bind=\"activeFilterValue\" change.delegate=\"filterActive()\" class=\"form-control \"\r\n            id=\"personStatus\">\r\n            <option value=\"\"></option>\r\n            <option repeat.for='item of is4ua.personStatusArray' value='${item.code}'>${item.description}</option>\r\n          </select>\r\n        </div>\r\n        <div class=\"col-lg-2\">\r\n          <label>Include Roles</label>\r\n          <select class=\"form-control\" multiple label=\"Include Roles\" value.bind=\"roleFilterValue\" change.trigger=\"filterRoles()\">\r\n            <option model.bind=\"null\">Choose...</option>\r\n            <option repeat.for=\"role of config.ROLES\" model.bind=\"role.role\">${role.label}</option>\r\n          </select>\r\n\r\n          <!-- <multiselect label=\"Include Roles\" options.bind=\"roleSelect\" value.bind=\"roleFilterValue\"\r\n                        change.trigger=\"filterRoles()\"></multiselect> -->\r\n        </div>\r\n        <div class=\"col-lg-2\">\r\n          <label>Exclude Roles</label>\r\n          <select class=\"form-control\" multiple label=\"Exclude Roles\" value.bind=\"roleExcludeFilterValue\"\r\n            change.trigger=\"excludeRoles()\">\r\n            <option model.bind=\"null\">Choose...</option>\r\n            <option repeat.for=\"role of config.ROLES\" model.bind=\"role.role\">${role.label}</option>\r\n          </select>\r\n          <!-- <multiselect label=\"Exclude Roles\" options.bind=\"roleSelect\" value.bind=\"roleExcludeFilterValue\"\r\n                        change.trigger=\"excludeRoles()\"></multiselect> -->\r\n        </div>\r\n      </div>\r\n      <div class=\"row\">\r\n        <div class=\"col-lg-2\">\r\n          <label class=\"control-label hideOnPhone\">Institution</label>\r\n          <input value.bind=\"institutionFilterValue\"\r\n            input.delegate=\"dataTable.filterList(institutionFilterValue, { type: 'custom',  filter: institutionCustomFilter, compare:'custom'} )\"\r\n            class=\"form-control\" />\r\n        </div>\r\n        <div class=\"col-lg-2\">\r\n          <label class=\"control-labelhideOnPhone\">Status</label>\r\n          <select value.bind=\"institutionStatusValue\"\r\n            input.delegate=\"dataTable.filterList($event, { type: 'value',  filter: 'institutionStatusFilter', lookupArray: '', lookupProperty: '', collectionProperty: 'institutionId.institutionStatus', displayProperty: 'institutionId.institutionStatus', matchProperty:'', compare:'match'} )\"\r\n            class=\"form-control \" id=\"personStatus\">\r\n            <option value=\"\"></option>\r\n            <option repeat.for='item of is4ua.institutonStatusArray' value='${item.code}'>${item.description}</option>\r\n          </select>\r\n        </div>\r\n        <div class=\"col-lg-2\">\r\n          <label class=\"control-label hideOnPhone\">Institution Type</label>\r\n          <select value.bind=\"institutionTypeFilter\"\r\n            input.delegate=\"dataTable.filterList($event, { type: 'value',  filter: 'institutionTypeFilter', lookupArray: '', lookupProperty: '', collectionProperty: 'institutionId.institutionType', displayProperty: 'institutionId.institutionType', matchProperty:'', compare:'match'} )\"\r\n            class=\"form-control\">\r\n            <option value=\"\"></option>\r\n            <option repeat.for=\"institution of is4ua.institutionTypes\" value=\"${institution.code}\">\r\n              ${institution.description}</option>\r\n          </select>\r\n        </div>\r\n        <div class=\"col-lg-2\">\r\n          <multiselect label=\"Member Type\" options.bind=\"is4ua.memberTypes\" value.bind=\"memberTypeFilterValue\"\r\n            change.trigger=\"dataTable.filterList($event, { type: 'custom',  filter: memberTypeCustomFilter, compare:'custom'} )\">\r\n          </multiselect>\r\n        </div>\r\n        <div class=\"col-lg-2\">\r\n          <label class=\"control-label hideOnPhone\">Region</label>\r\n          <input value.bind=\"regionFilterValue\"\r\n            input.delegate=\"dataTable.filterList(regionFilterValue, { type: 'custom',  filter: regionCustomFilter, collectionProperty: 'institutionId.region', compare:'custom'} )\"\r\n            class=\"form-control\" ref=\"regionFilter\" />\r\n        </div>\r\n        <div class=\"col-lg-2\">\r\n          <label class=\"control-label hideOnPhone\">Country</label>\r\n          <input value.bind=\"countryFilterValue\"\r\n            input.delegate=\"dataTable.filterList(countryFilterValue, { type: 'custom',  filter: countryCustomFilter, compare:'custom'} )\"\r\n            class=\"form-control\" ref=\"countryFilter\" />\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>\r\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/customers/customers.html":
/*!****************************************************!*\
  !*** ./src/modules/admin/customers/customers.html ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <compose view='../../../resources/elements/submenu.html'></compose>\r\n    <div class=\"col-lg-12\">\r\n        <router-view></router-view>\r\n    </div>\r\n</template";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/customers/editInstitutions.html":
/*!***********************************************************!*\
  !*** ./src/modules/admin/customers/editInstitutions.html ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <span id=\"loading\">\r\n        <ul class=\"bokeh\">\r\n            <li></li>\r\n            <li></li>\r\n            <li></li>\r\n        </ul>\r\n    </span>\r\n    <div show.bind=\"dataTable.displayArray && dataTable.displayArray.length || initialLoaded\">\r\n        <div show.bind=\"!institutionSelected\" class=\"col-lg-12\">\r\n            <compose view=\"./components/institutionsTable.html\"></compose>\r\n        </div> <!-- Table Div -->\r\n        <div show.bind=\"institutionSelected\" class=\"col-lg-12\">\r\n            <compose view=\"./components/institutionsForm.html\"></compose>\r\n        </div> <!-- Form Div -->\r\n    </div> <!-- Panel Body -->\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/customers/editPeople.html":
/*!*****************************************************!*\
  !*** ./src/modules/admin/customers/editPeople.html ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <span id=\"loading\">\r\n        <ul class=\"bokeh\">\r\n            <li></li>\r\n            <li></li>\r\n            <li></li>\r\n        </ul>\r\n    </span>\r\n    <div show.bind=\"dataTable.displayArray && dataTable.displayArray.length || initialLoaded\">\r\n        <div show.bind=\"!personSelected && !bulkEmailSelected\" class=\"col-lg-12\">\r\n            <compose view=\"./components/peopleTable.html\"></compose>\r\n        </div>\r\n        <div show.bind=\"personSelected && !bulkEmailSelected\" class=\"col-lg-12\">\r\n            <compose view=\"./components/peopleForm.html\"></compose>\r\n        </div>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/documents/components/documentForm.html":
/*!******************************************************************!*\
  !*** ./src/modules/admin/documents/components/documentForm.html ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n        <div class='col-lg-10 col-lg-offset-1 bottomMargin'>\r\n            <div class=\"bottomMargin list-group-item panelContrastColor\">\r\n                <span click.delegate=\"back()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n                    data-original-title=\"Back\"><i class=\"fa fa-arrow-left fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n                <span click.delegate=\"save()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n                    data-original-title=\"Save\"><i class=\"fa fa-floppy-o fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n                <span click.delegate=\"cancel()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n                    title=\"\" data-original-title=\"Cancel Changes\"><i class=\"fa fa-ban fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n                <span show.bind=\"documents.selectedDocument.files && documents.selectedDocument.files.length\" click.delegate=\"delete()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n                    title=\"\" data-original-title=\"Delete\"><i class=\"fa fa-trash fa-lg fa-border text-danger\" aria-hidden=\"true\"></i></span>\r\n            </div>\r\n\r\n            <div class=\"panel panel-default\" style=\"background-color:ghostwhite;\">\r\n                <div class=\"panel-body\">\r\n                    <form class=\"form-horizontal topMargin\">\r\n                        <div class=\"row\">\r\n                            <div class=\"col-sm-12 col-lg-12\">\r\n                                <div class=\"form-group\">\r\n                                    <label for=\"activeDoc\" class=\"control-label col-sm-2 hideOnPhone\">Status</label>\r\n                                    <div class=\"col-sm-8\">\r\n                                        <div class=\"checkbox\">\r\n                                            <label class=\"pull-left\">\r\n                                                            <input id=\"activeDoc\" checked.bind=\"documents.selectedDocument.active\" type=\"checkbox\"> Active\r\n                                                        </label>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"row\">\r\n                            <div class=\"col-sm-12 col-lg-12\">\r\n                                <div class=\"form-group\">\r\n                                    <label for=\"editName\" class=\"col-sm-2 control-label hideOnPhone\">Name</label>\r\n                                    <div class=\"col-sm-8\">\r\n                                        <input value.bind=\"documents.selectedDocument.name\" id=\"editName\" class=\"form-control\" placeholder=\"Name\" type=\"text\" />\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"row\">\r\n                            <div class=\"col-sm-12 col-lg-12\">\r\n                                <div class=\"form-group\">\r\n                                    <label for=\"editDescription\" class=\"col-sm-2 control-label hideOnPhone\">Description</label>\r\n                                    <div class=\"col-sm-8\">\r\n                                        <input value.bind=\"documents.selectedDocument.description\" id=\"editDescription\" class=\"form-control \" placeholder=\"Description\"\r\n                                            type=\"text\" />\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"row\">\r\n                            <div class=\"col-lg-2 col-lg-offset-2\">\r\n                                <label class=\"btn btn-primary\">\r\n                                            Browse for files&hellip; <input type=\"file\" style=\"display: none;\" change.delegate=\"changeFiles()\" files.bind=\"files\">\r\n                                </label>\r\n                            </div>\r\n                            <div class=\"col-lg-6\">\r\n                                <ul show.bind=\"!uploading\" >\r\n                                    <li repeat.for=\"file of filesToUpload\" class=\"list-group-item\">${file.name}<span click.delegate=\"removeFile($index)\" class=\"pull-right\"><i class=\"fa fa-trash\" aria-hidden=\"true\"></i></span></li>\r\n                                </ul>\r\n                                <div show.bind=\"uploading\" class=\"progress progress-striped active\">\r\n                                    <div id=\"progressBar\" class=\"progress-bar\" style=\"width: 0%\"></div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-lg-6 col-lg-offset-2\">\r\n                            <div id=\"editFiles\"></div>\r\n                        </div>\r\n                    </form>\r\n                </div>\r\n            </div>\r\n            <div class=\"row topMargin\">\r\n                <div id=\"no-more-tables\">\r\n                    <table class=\"table table-striped table-hover cf\">\r\n                        <thead class=\"cf\">\r\n                            <tr>\r\n                                <th>Name</th>\r\n                                <th>Version</th>\r\n                                <th>Date Uploaded</th>\r\n                                <th>Uploaded By</th>\r\n                                <th>Status</th>\r\n                            </tr>\r\n                        </thead>\r\n                        <tbody>\r\n                            <tr repeat.for=\"item of documents.selectedDocument.files\">\r\n                                <td data-title=\"Name\"><a target=\"_blank\" href=\"${config.DOCUMENT_FILE_DOWNLOAD_URL}/${documents.selectedCat.code}/${documents.selectedDocument.name}/${item.fileName}\">${item.originalFilename}</a></td>\r\n                                <td data-title=\"Version\">${item.version}</td>\r\n                                <td data-title=\"Date Uploaded\">${item.dateUploaded | dateFormat:config.DATE_FORMAT_TABLE}</td>\r\n                                <td data-title=\"Person\">${item.personId | lookupValue:people.peopleArray:\"_id\":\"fullName\"}</td>\r\n                                <td data-title=\"Active\" click.trigger=\"toggleFileActive($index)\" innerhtml.bind='item.active | checkBox'></td>\r\n                                <td data-title=\"Delete\" click.trigger=\"deleteFile($index)\"><i class=\"fa fa-trash\"></i></td>\r\n                            </tr>\r\n                        </tbody>\r\n                    </table>\r\n                </div>\r\n            </div>\r\n    </div>\r\n\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/documents/components/documentsTable.html":
/*!********************************************************************!*\
  !*** ./src/modules/admin/documents/components/documentsTable.html ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div class='row'>\r\n        <div class='col-lg-10 col-lg-offset-1 bottomMargin'>\r\n            <compose view=\"../../../../resources/elements/table-navigation-bar.html\"></compose>\r\n            <div id=\"no-more-tables\">\r\n                <table class=\"table table-striped table-hover cf\">\r\n                    <thead class=\"cf\">\r\n                        <tr>\r\n                            <td colspan='6'>\r\n                                <span click.delegate=\"new()\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n                                    title=\"\" data-original-title=\"New Document\"><i class=\"fa fa-plus\" aria-hidden=\"true\"></i></span>\r\n                            </td>\r\n                        </tr>\r\n                        <tr>\r\n                            <th>Name </th>\r\n                            <th>Description</th>\r\n                            <th>Date Created</th>\r\n                        </tr>\r\n                    </thead>\r\n                    <tbody>\r\n                        <tr click.trigger=\"editDocument($index, $event)\" repeat.for=\"item of dataTable.displayArray\">\r\n                            <td data-title=\"name\">${item.name}</td>\r\n                            <td data-title=\"description\">${item.description}</td>\r\n                            <td data-title=\"createdDate\">${item.createdDate | dateFormat:config.DATE_FORMAT_TABLE}</td>\r\n                        </tr>\r\n                    </tbody>\r\n                </table>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/documents/documents.html":
/*!****************************************************!*\
  !*** ./src/modules/admin/documents/documents.html ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <style>\r\n        .menuButtons {\r\n\t\t\tcolor: ${config.ACTIVE_SUBMENU_COLOR};\r\n\t\t\tbackground-color:${config.BUTTONS_BACKGROUND}\r\n        }\r\n    </style>\r\n    <compose view='../../../resources/elements/submenu.html'></compose>\r\n\r\n    <div class=\"panel panel-default\">\r\n        <div class=\"panel-body\">\r\n            <div class=\"row\">\r\n                <div class=\"col-lg-3\">\r\n                    <div class=\"bottomMargin list-group-item panelContrastColor\">\r\n                        <span click.delegate=\"newCategory()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n                            title=\"\" data-original-title=\"New Category\"><i class=\"fa fa-plus fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n                        <span disabled.bind=\"showDocuments\" click.delegate=\"editCategory()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n                            title=\"\" data-original-title=\"Edit\"><i class=\"fa fa-pencil fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n                        <span click.delegate=\"refresh()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n                            title=\"\" data-original-title=\"Refresh\"><i class=\"fa fa-refresh fa-lg fa-border\" aria-hidden=\"true\"></i></span> \r\n                    </div>\r\n                    <div show.bind=\"categoryForm\">\r\n                        <div class=\"panel panel-default\" style=\"background-color:ghostwhite;\">\r\n                            <div class=\"panel-body\">\r\n                                <div class=\"bottomMargin\">\r\n                                    <div class=\"bottomMargin list-group-item\">\r\n                                        <span click.delegate=\"backCategory()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" \r\n                                            title=\"\" data-original-title=\"Back\"><i class=\"fa fa-arrow-left fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n                                        <span click.delegate=\"saveCategory()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n                                            title=\"\" data-original-title=\"Save\"><i class=\"fa fa-floppy-o fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n                                        <span click.delegate=\"cancelEditCategory()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n                                            title=\"\" data-original-title=\"Cancel Changes\"><i class=\"fa fa-ban fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n                                                                                    \r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"form-group\">\r\n                                    <input id=\"name\" value.bind=\"documents.selectedCat.description\" type=\"text\" placeholder=\"Category Name\" class=\"form-control\"/>\r\n                                </div>\r\n                            </div>\r\n\r\n                        </div>\r\n                    </div>\r\n                    <div show.bind=\"!categoryForm\">\r\n                        <label>Available Categories</label>\r\n                        <div class=\"well well2 overFlow\" style=\"height:600px;\">\r\n                            <input class=\"form-control\" value.bind=\"filter\" input.trigger=\"filterList()\" placeholder=\"Filter Categories\" />\r\n                            <ul id=\"categoryList\" class=\"list-group\">\r\n                                <button click.trigger=\"typeChanged($index, $event)\" type=\"button\" repeat.for=\"type of filteredDocumentArray\" id=\"${type.code}\" class=\"${ $first ? 'menuButtons' : ''} list-group-item\">${type.description}</button>\r\n                            </ul>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n\r\n                <div show.bind=\"showDocuments\" class=\"col-lg-9\" >\r\n                    <div class='col-lg-10 col-lg-offset-1 bottomMargin'>\r\n                        <h3>${documents.selectedCat.description}</h3>\r\n                        <h5>${displayTitle}</h5>\r\n                    </div>\r\n                    <div show.bind=\"showDocumentForm\">\r\n                        <compose view=\"./components/documentForm.html\"></compose>\r\n                    </div>\r\n                    <compose show.bind=\"!showDocumentForm\" view=\"./components/documentsTable.html\"></compose>\r\n                </div>\r\n            </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/inventory/components/Documents.html":
/*!***************************************************************!*\
  !*** ./src/modules/admin/inventory/components/Documents.html ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div class=\"panel panel-default\">\r\n        <div class=\"panel-body\">\r\n            <div class=\"row\">\r\n                <div class=\"col-lg-4\">\r\n                    <div show.bind=\"!categoryForm\">\r\n                        <label>Available Categories</label>\r\n                        <div class=\"well well2 overFlow\" style=\"height:400px;\">\r\n                            <input class=\"form-control\" value.bind=\"filter\" input.trigger=\"filterList()\" placeholder=\"Filter Categories\" />\r\n                            <ul class=\"list-group\">\r\n                                <button click.trigger=\"typeChanged($index)\" type=\"button\" repeat.for=\"type of filteredDocumentArray\" id=\"${type.code}\" class=\"list-group-item\">${type.description}</button>\r\n                            </ul>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n\r\n                <div show.bind=\"showDocuments\" class=\"col-lg-8\" style='padding:15px;'>\r\n                    <div show.bind=\"showDocumentForm\">\r\n                        <compose view=\"./documentForm.html\"></compose>\r\n                    </div>\r\n                    <compose show.bind=\"!showDocumentForm\" view=\"./documentsTable.html\"></compose>\r\n                </div>\r\n            </div>\r\n        </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/inventory/components/History.html":
/*!*************************************************************!*\
  !*** ./src/modules/admin/inventory/components/History.html ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/inventory/components/Maintenance.html":
/*!*****************************************************************!*\
  !*** ./src/modules/admin/inventory/components/Maintenance.html ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t<div class=\"row\">\r\n\t\t<div class=\"col-lg-3\">\r\n\t\t\t<div class=\"form-group\">\r\n\t\t\t\t<div class=\"col-sm-10\">\r\n\t\t\t\t\t<label>Vendor Name</label>\r\n\t\t\t\t\t<input value.bind=\"inventory.selectedInventory.maintenanceProvider\"  class=\"form-control\" placeholder=\"Vendor Name\" type=\"text\" />\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class=\"col-lg-3\">\r\n\t\t\t<div class=\"form-group\">\r\n\t\t\t\t<div class=\"col-sm-10\">\r\n\t\t\t\t\t<label>Contract Number</label>\r\n\t\t\t\t\t<input value.bind=\"inventory.selectedInventory.maintenanceContract\"  class=\"form-control\" placeholder=\"Contract Number\" type=\"text\" />\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class=\"col-lg-3\">\r\n\t\t\t<div class=\"form-group\">\r\n\t\t\t\t<div class=\"col-sm-10\">\r\n\t\t\t\t\t<label>Customer Number</label>\r\n\t\t\t\t\t<input value.bind=\"inventory.selectedInventory.maintenanceCustomerNumber\"  class=\"form-control\" placeholder=\"Customer Number\" type=\"text\" />\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class=\"col-lg-3\">\r\n\t\t\t<div class=\"form-group\">\r\n\t\t\t\t<div class=\"col-sm-10\">\r\n\t\t\t\t\t<label>Contact Name</label>\r\n\t\t\t\t\t<input value.bind=\"inventory.selectedInventory.maintenanceContact\"  class=\"form-control\" placeholder=\"Contact\" type=\"text\" />\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n\t<div class=\"row\">\r\n\t\t<div class=\"col-lg-3\">\r\n\t\t\t<div class=\"form-group\">\r\n\t\t\t\t<div class=\"col-sm-10\">\r\n\t\t\t\t\t<label>Phone</label>\r\n\t\t\t\t\t<input value.bind=\"inventory.selectedInventory.maintenancePhone\"  class=\"form-control\" placeholder=\"Phone\" type=\"text\" />\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class=\"col-lg-3\">\r\n\t\t\t<div class=\"form-group\">\r\n\t\t\t\t<div class=\"col-sm-10\">\r\n\t\t\t\t\t<label>Email</label>\r\n\t\t\t\t\t<input value.bind=\"inventory.selectedInventory.maintenanceEmail\"  class=\"form-control\" placeholder=\"Vendor Email\" type=\"text\" />\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class=\"col-lg-3\">\r\n\t\t\t<div class=\"form-group\">\r\n\t\t\t\t<div class=\"col-sm-10\">\r\n\t\t\t\t\t<label>URL</label>\r\n\t\t\t\t\t<input value.bind=\"inventory.selectedInventory.maintenanceUrl\"  class=\"form-control\" placeholder=\"Contract URL\" type=\"text\" />\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class=\"col-lg-3\">\r\n\t\t\t<div class=\"form-group\">\r\n\t\t\t\t<div class=\"col-sm-10\">\r\n\t\t\t\t\t<label>User ID</label>\r\n\t\t\t\t\t<input value.bind=\"inventory.selectedInventory.maintenaceUserId\"  class=\"form-control\" placeholder=\"User ID\" type=\"text\" />\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\t\r\n\t</div>\r\n\t<div class=\"row\">\r\n\t\t<div class=\"col-lg-3\">\r\n\t\t\t<div class=\"form-group\">\r\n\t\t\t\t<div class=\"col-sm-10\">\r\n\t\t\t\t\t<label>Password</label>\r\n\t\t\t\t\t<input value.bind=\"inventory.selectedInventory.maintenancePassword\"  class=\"form-control\" placeholder=\"Password\" type=\"text\" />\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class=\"col-lg-3\">\r\n\t\t\t<div class=\"form-group\">\r\n\t\t\t\t<div class=\"col-sm-10\">\r\n\t\t\t\t\t<label>Date Created</label>\r\n\t\t\t\t\t<flat-picker controlid=\"maintenanceStartDate\" config.bind=\"config\" value.bind=\"inventory.selectedInventory.maintenanceStartDate\"></flat-picker>\r\n\t\t\t\t\t<!-- <date-picker value.two-way=\"inventory.selectedInventory.maintenanceStartDate\"  controlid=\"maintenanceStartDate\"></date-picker> -->\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class=\"col-lg-3\">\r\n\t\t\t<div class=\"form-group\">\r\n\t\t\t\t<div class=\"col-sm-10\">\r\n\t\t\t\t\t<label>End Date</label>\r\n\t\t\t\t\t<flat-picker controlid=\"maintenanceEndDate\" config.bind=\"config\" value.bind=\"inventory.selectedInventory.maintenanceEndDate\"></flat-picker>\r\n\t\t\t\t\t<!-- <date-picker value.two-way=\"inventory.selectedInventory.maintenanceEndDate\"  controlid=\"maintenanceEndDate\"></date-picker> -->\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class=\"col-lg-3\">\r\n\t\t\t<div class=\"form-group\">\r\n\t\t\t\t<div class=\"col-sm-10\">\r\n\t\t\t\t\t<label show.bind=\"!eventScheduled\" class=\"control-label\">Days of warning before expiration</label>\r\n\t\t\t\t\t<label show.bind=\"eventScheduled\" class=\"control-label\">Days of warning before expiration (event scheduled for ${eventObject.day})</label>\r\n\t\t\t\t\t<div class=\"input-group\">\r\n\t\t\t\t\t\t<input value.bind=\"inventory.selectedInventory.maintenanceAlert\" type=\"number\" placeholder=\"Days\" class=\"form-control\">\r\n\t\t\t\t\t\t <span click.delegate=\"scheduleEvent()\" class=\"input-group-addon\">\r\n\t\t\t\t\t\t\t<i class=\"fa fa-calendar\" aria-hidden=\"true\"></i>\r\n\t\t\t\t\t\t</span>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<!--\r\n\t\t\t<button class=\"btn btn-default\" type=\"button\">Button</button>\r\n\t\t<div class=\"col-lg-3\">\r\n\t\t\t<div class=\"form-group\">\r\n\t\t\t\t<div class=\"col-sm-10\">\r\n\t\t\t\t\t<label>Days of warning before expiration</label>\r\n\t\t\t\t\t<input value.bind=\"inventory.selectedInventory.maintenanceAlert\"  class=\"form-control\" placeholder=\"Days\" type=\"number\" />\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t-->\r\n\t</div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/inventory/components/Purchase.html":
/*!**************************************************************!*\
  !*** ./src/modules/admin/inventory/components/Purchase.html ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t<div class=\"row\">\r\n\t\t<div class=\"col-lg-3\">\r\n\t\t\t<div class=\"form-group\">\r\n\t\t\t\t<div class=\"col-sm-10\">\r\n\t\t\t\t\t<label>Vendor Name</label>\r\n\t\t\t\t\t<input value.bind=\"inventory.selectedInventory.vendorName\"  class=\"form-control\" placeholder=\"Vendor Name\" type=\"text\" />\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class=\"col-lg-3\">\r\n\t\t\t<div class=\"form-group\">\r\n\t\t\t\t<div class=\"col-sm-10\">\r\n\t\t\t\t\t<label>Date Purchased</label>\r\n\t\t\t\t\t<flat-picker controlid=\"datePurchased\" config.bind=\"config\" value.bind=\"inventory.selectedInventory.datePurchased\"></flat-picker>\r\n\t\t\t\t<!--\t<date-picker value.two-way=\"inventory.selectedInventory.datePurchased\"  controlid=\"createdDate\"></date-picker> -->\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class=\"col-lg-3\">\r\n\t\t\t<div class=\"form-group\">\r\n\t\t\t\t<div class=\"col-sm-10\">\r\n\t\t\t\t\t<label>PO Number</label>\r\n\t\t\t\t\t<input value.bind=\"inventory.selectedInventory.poNumber\"  class=\"form-control\" placeholder=\"PO Number\" type=\"text\" />\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n\t<div class=\"row\">\r\n\t\t<div class=\"col-lg-3\">\r\n\t\t\t<div class=\"form-group\">\r\n\t\t\t\t<div class=\"col-sm-10\">\r\n\t\t\t\t\t<label>Vendor Contact </label>\r\n\t\t\t\t\t<input value.bind=\"inventory.selectedInventory.vendorContact\"  class=\"form-control\" placeholder=\"Contact Name\" type=\"text\" />\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class=\"col-lg-3\">\r\n\t\t\t<div class=\"form-group\">\r\n\t\t\t\t<div class=\"col-sm-10\">\r\n\t\t\t\t\t<label>Vendor Phone</label>\r\n\t\t\t\t\t<input value.bind=\"inventory.selectedInventory.vendorPhone\"  class=\"form-control\" placeholder=\"Phone\" type=\"text\" />\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class=\"col-lg-3\">\r\n\t\t\t<div class=\"form-group\">\r\n\t\t\t\t<div class=\"col-sm-10\">\r\n\t\t\t\t\t<label>Vendor Email</label>\r\n\t\t\t\t\t<input value.bind=\"inventory.selectedInventory.vendorEmail\"  class=\"form-control\" placeholder=\"Email\" type=\"text\" />\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/inventory/components/Technical.html":
/*!***************************************************************!*\
  !*** ./src/modules/admin/inventory/components/Technical.html ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t<div class=\"row\">\r\n\t\t<div class=\"col-lg-3\">\r\n\t\t\t<div class=\"form-group\">\r\n\t\t\t\t<div class=\"col-sm-10\">\r\n\t\t\t\t\t<label>Admin User ID</label>\r\n\t\t\t\t\t<input value.bind=\"inventory.selectedInventory.adminUserId\"  class=\"form-control\" placeholder=\"Admin User ID\" type=\"text\" />\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class=\"col-lg-3\">\r\n\t\t\t<div class=\"form-group\">\r\n\t\t\t\t<div class=\"col-sm-10\">\r\n\t\t\t\t\t<label>Admin Password</label>\r\n\t\t\t\t\t<input value.bind=\"inventory.selectedInventory.adminPassword\"  class=\"form-control\" placeholder=\"Admin Password\" type=\"text\" />\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class=\"col-lg-3\">\r\n\t\t\t<div class=\"form-group\">\r\n\t\t\t\t<div class=\"col-sm-10\">\r\n\t\t\t\t\t<label>System URL</label>\r\n\t\t\t\t\t<input value.bind=\"inventory.selectedInventory.systemUrl\"  class=\"form-control\" placeholder=\"System URL\" type=\"text\" />\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n\t<div class=\"topMargin\">\r\n        <table  class=\"table table-striped table-hover\">\r\n            <thead>\r\n                <tr>\r\n                    <td colspan='6'>\r\n                        <span click.delegate=\"newIP()\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"New Course\"><i class=\"fa fa-plus\" aria-hidden=\"true\"></i></span>\r\n                        <span class=\"pull-right\" id=\"spinner\" innerhtml.bind=\"spinnerHTML\"></span>\r\n                    </td>\r\n                </tr>\r\n                <tr>\r\n                    <th style=\"width:20rem;\">IP </th>\r\n                    <th style=\"width:30rem;\">Description</th>\r\n                </tr>\r\n            </thead>\r\n            <tbody>\r\n                <tr id=\"selectCourse\" click.delegate=\"editIP($index, $event)\"  repeat.for=\"address of inventory.selectedInventory.IPAddress\">\r\n                    <td data-title=\"Address\">${address.address} </td>\r\n                    <td data-title=\"Descriptino\">${address.description}</td>\r\n                </tr>\r\n            </tbody>\r\n        </table>\r\n\r\n        <div class=\"row\" show.bind=\"addressSelected\">\r\n            <div class=\"panel panel-default col-md-12\">\r\n                <div class=\"panel-body\">\r\n                    <div class=\"bottomMargin\">\r\n                        <div class=\"bottomMargin list-group-item\">\r\n                            <span click.delegate=\"saveAddress()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Save\"><i class=\"fa fa-floppy-o fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n                            <span click.delegate=\"cancelEditAddress()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Cancel Changes\"><i class=\"fa fa-ban fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n                        </div>  \r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <input id=\"number\" value.bind=\"address\" ref=\"ipAddress\" type=\"text\" placeholder=\"Address\" class=\"form-control\"/>\r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <input id=\"name\" value.bind=\"description\" ref=\"ipDescription\" type=\"text\" placeholder=\"Description\" class=\"form-control\"/>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/inventory/components/documentForm.html":
/*!******************************************************************!*\
  !*** ./src/modules/admin/inventory/components/documentForm.html ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div id=\"no-more-tables\">\r\n        <table class=\"table table-striped table-hover cf\">\r\n            <thead class=\"cf\">\r\n                <tr>\r\n                    <th>Add</th>\r\n                    <th>Name</th>\r\n                    <th>Version</th>\r\n                    <th>Date Uploaded</th>\r\n                    <th>Status</th>\r\n                </tr>\r\n            </thead>\r\n            <tbody>\r\n                <tr repeat.for=\"item of documents.selectedDocument.files\">\r\n                    <td click.trigger=\"addDocument($index)\"><i class=\"fa fa-plus\" aria-hidden=\"true\"></i></td>\r\n                    <td data-title=\"Name\"><a target=\"_blank\" href=\"${config.DOCUMENT_FILE_DOWNLOAD_URL}/${documents.selectedDocument.categoryCode}/${documents.selectedDocument.name}/${item.fileName}\">${item.originalFilename}</a></td>\r\n                    <td data-title=\"Version\">${item.version}</td>\r\n                    <td data-title=\"Date Uploaded\">${item.dateUploaded | dateFormat:config.DATE_FORMAT_TABLE}</td>\r\n                    <td data-title=\"Active\"  innerhtml.bind='item.active | checkBox'></td>\r\n                </tr>\r\n            </tbody>\r\n        </table>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/inventory/components/documentsTable.html":
/*!********************************************************************!*\
  !*** ./src/modules/admin/inventory/components/documentsTable.html ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div class='row'>\r\n        <div class='col-lg-10 col-lg-offset-1 bottomMargin'>\r\n            <div id=\"no-more-tables\">\r\n                <table class=\"table table-striped table-hover cf\">\r\n                    <thead class=\"cf\">\r\n                        <tr>\r\n                            <th>Name </th>\r\n                            <th>Description</th>\r\n                            <th>Date Created</th>\r\n                        </tr>\r\n                    </thead>\r\n                    <tbody>\r\n                        <tr click.trigger=\"chooseDocument($index, $event)\" repeat.for=\"item of documents.documentsArray\">\r\n                            <td data-title=\"name\">${item.name}</td>\r\n                            <td data-title=\"description\">${item.description}</td>\r\n                            <td data-title=\"createdDate\">${item.createdDate | dateFormat:config.DATE_FORMAT_TABLE}</td>\r\n                        </tr>\r\n                    </tbody>\r\n                </table>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/inventory/components/inventoryDetails.html":
/*!**********************************************************************!*\
  !*** ./src/modules/admin/inventory/components/inventoryDetails.html ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div class=\"topMargin leftMargin\">\r\n        <form class=\"form-horizontal topMargin\">\r\n            <div class=\"row\">\r\n                <div class=\"col-lg-3\">\r\n                    <div class=\"form-group\">\r\n                        <div class=\"col-sm-10\">\r\n                            <label>Name *</label>\r\n                            <input value.bind=\"inventory.selectedInventory.systemName\" id=\"editSystemName\" class=\"form-control\"\r\n                                placeholder=\"Name\" type=\"text\" />\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"col-lg-3\">\r\n                    <div class=\"form-group\">\r\n                        <div class=\"col-sm-10\">\r\n                            <label>Description *</label>\r\n                            <input value.bind=\"inventory.selectedInventory.description\" id=\"editDescription\" class=\"form-control\"\r\n                                placeholder=\"Description\" type=\"text\" />\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"col-lg-3\">\r\n                    <div class=\"form-group\">\r\n                        <div class=\"col-sm-10\">\r\n                            <label>Date Created</label>\r\n                            <flat-picker controlid=\"dateCreated\" config.bind=\"config\" value.bind=\"inventory.selectedInventory.dateCreated\"></flat-picker>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"col-lg-3\">\r\n                    <table id=\"coursesTable\" class=\"table table-striped table-hover\">\r\n                        <thead>\r\n                            <tr>\r\n                                <th>Document </th>\r\n                                <th>Default</th>\r\n                                <th></th>\r\n                            </tr>\r\n                        </thead>\r\n                        <tbody>\r\n                            <tr repeat.for=\"document of inventory.selectedInventory.documents\">\r\n                                <td data-title=\"name\"><a target=\"_blank\" href=\"${config.DOCUMENT_FILE_DOWNLOAD_URL}/${document.categoryCode}/${document.categoryName}/${document.fileName}\">${document.fileName}</a></td>\r\n                                <td data-title=\"default\" click.trigger=\"toggleDefault($index)\" innerhtml.bind='document.default | checkBox'></td>\r\n                                <td click.trigger=\"removeDocument($index)\"><i class=\"fa fa-trash\"></i></td>\r\n                            </tr>\r\n                        </tbody>\r\n                    </table>\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <div class=\"col-lg-3\">\r\n                    <div class=\"form-group\">\r\n                        <div class=\"col-sm-10\">\r\n                            <label>Serial Number</label>\r\n                            <input value.bind=\"inventory.selectedInventory.serialNumber\" class=\"form-control\"\r\n                                placeholder=\"Serial Number\" type=\"text\" />\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"col-lg-3\">\r\n                    <div class=\"form-group\">\r\n                        <div class=\"col-sm-10\">\r\n                            <label>Model Number</label>\r\n                            <input value.bind=\"inventory.selectedInventory.modelNumber\" class=\"form-control\"\r\n                                placeholder=\"Model Number\" type=\"text\" />\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"col-sm-12 col-lg-3\">\r\n                    <div class=\"form-group\">\r\n                        <div class=\"col-sm-10\">\r\n                            <label class=\"left\">Type *</label>\r\n                            <select value.bind=\"inventory.selectedInventory.type\" class=\"form-control\">\r\n                                <option value=\"\">Select an option</option>\r\n                                <option repeat.for=\"type of config.systemTypes\" value.bind=\"type\">${type}</option>\r\n                            </select>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </form>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/inventory/components/inventoryForm.html":
/*!*******************************************************************!*\
  !*** ./src/modules/admin/inventory/components/inventoryForm.html ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t<style>\r\n\t\t.menuButtons {\r\n\t\t\tcolor:$ {\r\n\t\t\t\tconfig.ACTIVE_SUBMENU_COLOR\r\n\t\t\t}\r\n\r\n\t\t\t;\r\n\r\n\t\t\tbackground-color:$ {\r\n\t\t\t\tconfig.BUTTONS_BACKGROUND\r\n\t\t\t}\r\n\t\t}\r\n\t</style>\r\n\t<div class=\"fluid-container\">\r\n\r\n\t\t<div class=\"list-group-item toolbar\">\r\n\t\t\t<span click.delegate=\"back()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n\t\t\t title=\"\" data-original-title=\"Back\"><i class=\"fa fa-arrow-left fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n\t\t\t<span click.delegate=\"save()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n\t\t\t title=\"\" data-original-title=\"Save\"><i class=\"fa fa-floppy-o fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n\t\t\t<span click.delegate=\"cancel()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n\t\t\t title=\"\" data-original-title=\"Cancel Changes\"><i class=\"fa fa-ban fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n\t\t\t<span click.delegate=\"duplicate()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n\t\t\t title=\"\" data-original-title=\"Duplicate\"><i class=\"fa fa-files-o fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n\t\t\t<span  click.delegate=\"delete()\" class=\"smallMarginRight\"\r\n\t\t\t bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Delete\"><i class=\"fa fa-trash fa-lg fa-border text-danger\"\r\n\t\t\t\t aria-hidden=\"true\"></i></span>\r\n\t\t\t<span show.bind=\"isDuplicate\">Duplicate</span>\r\n\t\t</div>\r\n\t\t<div class=\"panel panel-info positionUnderToolbar\">\r\n\t\t\t<div class=\"panel-body\" style=\"padding:5px;\">\r\n\r\n\t\t\t\t<compose view=\"./inventoryDetails.html\"></compose>\r\n\t\t\t\t<compose view=\"./inventoryPanels.html\"></compose>\r\n\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/inventory/components/inventoryPanels.html":
/*!*********************************************************************!*\
  !*** ./src/modules/admin/inventory/components/inventoryPanels.html ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\n    <div class=\"panel panel-default\">\n        <div class=\"panel-body\">\n            <div class=\"col-lg-2\">\n                <div id=\"invFormListGroup\" class=\"list-group\">\n                    <a class=\"${ $first ? 'menuButtons' : ''} list-group-item\" repeat.for=\"tab of tabs\" href=\"\" \n                        click.delegate=\"changeTab($event, $index)\">\n                        <h4 id=\"${tab.id}\" class=\"list-group-item-heading\">${tab.title}</h4>\n                    </a>\n                </div>\n            </div>\n\n            <div class=\"col-lg-10\">\n                <div class=\"tab-content\">\n                  <div id=\"MaintenanceTab\" class=\"tab-pane fade in active' }\">\n                    <compose view=\"./Maintenance.html\"></compose>\n                  </div>\n                  <div id=\"HistoryTab\" class=\"tab-pane fade\">\n                    <compose view=\"./History.html\"></compose>\n                  </div>\n                  <div id=\"PurchaseTab\" class=\"tab-pane fade\">\n                    <compose view=\"./Purchase.html\"></compose>\n                  </div>\n                  <div id=\"TechnicalTab\" class=\"tab-pane fade\">\n                    <compose view=\"./Technical.html\"></compose>\n                  </div>\n                  <div id=\"DocumentsTab\" class=\"tab-pane fade\">\n                    <compose view=\"./Documents.html\"></compose>\n                  </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</template>\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/inventory/components/inventoryTable.html":
/*!********************************************************************!*\
  !*** ./src/modules/admin/inventory/components/inventoryTable.html ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div class=\"panel panel-info\">\r\n        <div class=\"panel-body\">\r\n            <div class=\"row\">\r\n                <div class=\"col-lg-12\" style='padding:15px;'>\r\n                    <div class='col-lg-10 col-lg-offset-1 bottomMargin'>\r\n                        <div id=\"no-more-tables\">\r\n                            <table id=\"productsTable\" class=\"table table-striped table-hover cf\">\r\n                                <thead class=\"cf\">\r\n                                    <tr colspan='4'>\r\n                                        <compose view=\"../../../../resources/elements/table-navigation-bar.html\"></compose>\r\n                                    </tr>\r\n                                    <tr>\r\n                                        <td colspan='4'>\r\n                                            <span click.delegate=\"refresh()\" class=\"smallMarginRight\" bootstrap-tooltip\r\n                                                data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n                                                data-original-title=\"Refresh\"><i class=\"fa fa-refresh\" aria-hidden=\"true\"></i></span>\r\n                                            <span click.delegate=\"new()\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n                                                data-placement=\"bottom\" title=\"\" data-original-title=\"New\"><i class=\"fa fa-plus\"\r\n                                                    aria-hidden=\"true\"></i></span>\r\n                                            <span class=\"pull-right\" id=\"spinner\" innerhtml.bind=\"spinnerHTML\"></span>\r\n                                        </td>\r\n                                    </tr>\r\n                                    <tr>\r\n                                        <th><span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'systemName'})\">Name\r\n                                            </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                                        <th><span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'serialNumber'})\">Serial\r\n                                                Number </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                                        <th><span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'modelNumber'})\">Model\r\n                                            </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                                        <th><span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'type'})\">Type\r\n                                            </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                                    </tr>\r\n                                </thead>\r\n                                <tbody>\r\n                                    <tr>\r\n                                        <th>\r\n                                            <input value.bind=\"systemNameFilterValue\" input.delegate=\"dataTable.filterList(systemNameFilterValue, { type: 'text',  filter: 'systemNameFilter', collectionProperty: 'systemName', displayProperty: 'systemName',  compare:'match'} )\"\r\n                                                class=\"form-control\" />\r\n                                        </th>\r\n                                        <th>\r\n                                            <input value.bind=\"serialNumberFilterValue\" input.delegate=\"dataTable.filterList(serialNumberFilterValue, { type: 'text',  filter: 'serialNumberFilter', collectionProperty: 'serialNumber', displayProperty: 'serialNumber',  compare:'match'} )\"\r\n                                                class=\"form-control\" />\r\n                                        </th>\r\n                                        <th>\r\n                                            <input value.bind=\"modelNumberFilterValue\" input.delegate=\"dataTable.filterList(modelNumberFilterValue, { type: 'text',  filter: 'modelNumberFilter', collectionProperty: 'modelNumber', displayProperty: 'modelNumber',  compare:'match'} )\"\r\n                                                class=\"form-control\" />\r\n                                        </th>\r\n                                        <th>\r\n                                            <select value.bind=\"typeFilter\" input.delegate=\"dataTable.filterList($event, { type: 'value',  filter: 'typeFilter',  collectionProperty: 'type', displayProperty: 'type', compare:'match'} )\"\r\n                                                class=\"form-control\">\r\n                                                <option value=\"\"></option>\r\n                                                <option repeat.for=\"type of config.systemTypes\" value=\"${type}\">${type}</option>\r\n                                            </select>\r\n                                        </th>\r\n                                    </tr>\r\n                                    <tr click.trigger=\"edit($index, $event)\" repeat.for=\"system of dataTable.displayArray\">\r\n                                        <td data-title=\"Name\">${system.systemName}</td>\r\n                                        <td data-title=\"Name\">${system.serialNumber}</td>\r\n                                        <td data-title=\"Name\">${system.modelNumber}</td>\r\n                                        <td data-title=\"Name\">${system.type}</td>\r\n                                    </tr>\r\n                                </tbody>\r\n                            </table>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/inventory/editInventory.html":
/*!********************************************************!*\
  !*** ./src/modules/admin/inventory/editInventory.html ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <compose view='../../../resources/elements/submenu.html'></compose>\r\n    <div show.bind=\"!systemSelected\" class=\"col-lg-12\">\r\n        <compose view=\"./components/inventoryTable.html\"></compose>\r\n    </div>\r\n    <div show.bind=\"systemSelected\" class=\"col-lg-12\">\r\n        <compose view=\"./components/inventoryForm.html\"></compose>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ })

}]);
//# sourceMappingURL=app-8c3d3f46.2384d3fce1a12a237460.bundle.js.map