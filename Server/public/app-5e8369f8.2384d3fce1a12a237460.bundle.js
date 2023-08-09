"use strict";
(self["webpackChunkuccss_old_new"] = self["webpackChunkuccss_old_new"] || []).push([["app-5e8369f8"],{

/***/ "modules/facco/editPeople":
/*!*****************************************!*\
  !*** ./src/modules/facco/editPeople.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EditPeople: function() { return /* binding */ EditPeople; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../resources/utils/dataTable */ 6847);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
/* harmony import */ var _resources_utils_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../resources/utils/utils */ 8741);
/* harmony import */ var _resources_data_people__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../resources/data/people */ 353);
/* harmony import */ var _resources_data_is4ua__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../resources/data/is4ua */ 5175);
/* harmony import */ var _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../resources/dialogs/common-dialogs */ 6545);
var _dec, _class;







let EditPeople = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_1__.DataTable, _config_appConfig__WEBPACK_IMPORTED_MODULE_2__.AppConfig, _resources_data_people__WEBPACK_IMPORTED_MODULE_4__.People, _resources_utils_utils__WEBPACK_IMPORTED_MODULE_3__.Utils, _resources_data_is4ua__WEBPACK_IMPORTED_MODULE_5__.is4ua, _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_6__.CommonDialogs), _dec(_class = class EditPeople {
  constructor(dataTable, config, people, utils, is4ua, dialog) {
    this.spinnerHTML = "";
    this.dataTable = dataTable;
    this.dataTable.initialize(this);
    this.config = config;
    this.utils = utils;
    this.people = people;
    this.is4ua = is4ua;
    this.dialog = dialog;
  }
  attached() {
    $('[data-toggle="tooltip"]').tooltip();
  }
  canActivate() {
    this.userObj = JSON.parse(sessionStorage.getItem('user'));
  }
  async activate() {
    let responses = await Promise.all([this.people.getInstitutionPeople('?filter=institutionId|eq|' + this.userObj.institutionId._id + '&order=lastName', true), this.is4ua.loadIs4ua(), this.config.getConfig()]);
    this.pageSize = this.config.defaultPageSize;
    this.dataTable.updateArray(this.people.instutionPeopleArray);
  }
  async refresh() {
    this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
    await this.people.getInstitutionPeople('?filter=institutionId|eq|' + this.userObj.institutionId._id + '&order=lastName', true);
    this.dataTable.updateArray(this.people.instutionPeopleArray);
    this.spinnerHTML = "";
  }
  buildAudit() {
    var changes = this.people.isPersonDirty(this.originalPerson);
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
    this.buildAudit();
    let serverResponse = await this.people.savePerson();
    if (!serverResponse.error) {
      if (this.people.selectedPerson.personStatus === '01') this.sendActivateEmail();
      this.people.instutionPeopleArray[this.people.editIndex] = this.utils.copyObject(this.people.selectedPerson);
      this.dataTable.updateArray(this.people.instutionPeopleArray);
      this.utils.showNotification(serverResponse.firstName + " " + serverResponse.lastName + " was updated");
    }
    this.personSelected = false;
  }
  sendActivateEmail() {
    var email = {
      email: this.people.selectedPerson.email,
      name: this.people.selectedPerson.firstName
    };
    this.people.activateAccountEmail(email);
  }
  updateStatus(person) {
    this.people.selectedPersonFromId(person._id, 'i');
    this.originalPerson = this.utils.copyObject(this.people.selectedPerson);
    if (this.people.selectedPerson.personStatus === '01') {
      this.people.selectedPerson.personStatus = '02';
    } else {
      this.people.selectedPerson.personStatus = '01';
    }
    this.save();
  }
  cancel() {
    this.people.selectPerson(this.editIndex);
  }
  back() {
    if (this.people.isPersonDirty().length) {
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
  }
  customRoleFilter(value, item) {
    var value = value.toUpperCase();
    for (let i = 0; i < item.roles.length; i++) {
      if (item.roles[i].indexOf(value) > -1) return true;
    }
    return false;
  }
  customStatusFilter(value, item) {
    var value = value.toUpperCase();
    for (let i = 0; i < item.roles.length; i++) {
      if (item.roles[i].indexOf(value) > -1) return true;
    }
    return false;
  }
}) || _class);

/***/ }),

/***/ "modules/facco/facco":
/*!************************************!*\
  !*** ./src/modules/facco/facco.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FacCo: function() { return /* binding */ FacCo; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var aurelia_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-router */ 6433);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
var _dec, _class;



let FacCo = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(aurelia_router__WEBPACK_IMPORTED_MODULE_1__.Router, _config_appConfig__WEBPACK_IMPORTED_MODULE_2__.AppConfig), _dec(_class = class FacCo {
  constructor(router, config) {
    this.title = "Faculty Coordinator";
    this.router = router;
    this.config = config;
  }
  attached() {
    $(".nav a").on("click", function () {
      $(".nav").find(".active").removeClass("active");
      $(this).parent().addClass("active");
    });
  }
  activate() {
    this.config.getConfig(true);
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
      title: 'People'
    }, {
      route: 'viewRequests',
      moduleId: './viewRequests',
      settings: {
        auth: true,
        roles: []
      },
      nav: true,
      name: 'viewRequests',
      title: 'Clients Requests'
    }, {
      route: 'viewAssignments',
      moduleId: './viewAssignments',
      settings: {
        auth: true,
        roles: []
      },
      nav: true,
      name: 'viewAssignments',
      title: 'Assignments'
    }]);
    this.router = router;
  }
}) || _class);

/***/ }),

/***/ "modules/facco/components/assignmentsTable.html":
/*!************************************************************!*\
  !*** ./src/modules/facco/components/assignmentsTable.html ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t\t<div class=\"col-lg-12\">\r\n\t\t\t\t<compose view=\"../../../resources/elements/table-navigation-bar.html\"></compose>\r\n\t\t\t\t  <div id=\"no-more-tables\">\r\n\t\t\t\t\t<table class=\"table table-striped table-hover cf\">\r\n\t\t\t\t\t  <thead class=\"cf\">\r\n\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t  <td colspan='7'>\r\n\t\t\t\t\t\t\t<span click.delegate=\"refresh()\" class=\"smallMarginRight\"><i class=\"fa fa-refresh\" aria-hidden=\"true\"></i></span>\r\n\t\t\t\t\t\t\t<span class=\"pull-right\" id=\"spinner\" innerhtml.bind=\"spinnerHTML\"></span>\r\n\t\t\t\t\t\t  </td>\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t  <th class=\"col-lg-1\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'dateRequired'})\">Due </span><i class=\"fa fa-sort\"></i></th>\r\n\t\t\t\t\t\t  <th class=\"col-lg-1\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'dateRequested'})\">Created </span><i class=\"fa fa-sort\"></i></th>\r\n\t\t\t\t\t\t  <th class=\"col-lg-1\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'dateAssigned'})\">Assigned </span><i class=\"fa fa-sort\"></i></th>\r\n\t\t\t\t\t\t  <th class=\"col-lg-2\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'product'})\">Product </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n\t\t\t\t\t\t  <th>System</th>\r\n\t\t\t\t\t\t  <th><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'client'})\"></span>Client</th>\r\n\t\t\t\t\t\t  <th>Student IDS/Passwords</th>\r\n\t\t\t\t\t\t  <th>Faculty IDS/Passwords</th>\r\n\t\t\t\t\t\t\t<th class=\"col-lg-2\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'lastName'})\">Faculty </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n\t\t\t\t\t\t\t<th class=\"col-lg-1\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'course'})\">Course </span><i class=\"fa fa-sort\"></i></th>\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t  </thead>\r\n\t\t\t\t\t  <tbody>\r\n\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t<th>\r\n\t\t\t\t\t\t\t\t<input value.bind=\"requiredDateFilter\" change.delegate=\"dataTable.filterList(requiredDateFilter, { type: 'date',  filter: 'requiredDateFilter', collectionProperty: 'dateRequired', compare:'after' })\" type=\"date\" class=\"form-control datepicker\" data-dateformat=config.DATE_FORMAT_TABLE>\r\n\t\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t\t<th>\r\n\t\t\t\t\t\t\t\t<input value.bind=\"createdDateFilter\" change.delegate=\"dataTable.filterList(createdDateFilter, { type: 'date',  filter: 'createdDateFilter', collectionProperty: 'dateRequested', compare:'after' })\" type=\"date\" class=\"form-control datepicker\" data-dateformat=config.DATE_FORMAT_TABLE>\r\n\t\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t\t<th>\r\n\t\t\t\t\t\t\t\t<input value.bind=\"assigneddDateFilter\" change.delegate=\"dataTable.filterList(assigneddDateFilter, { type: 'date',  filter: 'assigneddDateFilter', collectionProperty: 'dateAssigned', compare:'after' })\" type=\"date\" class=\"form-control datepicker\" data-dateformat=config.DATE_FORMAT_TABLE>\r\n\t\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t\t<th>\r\n\t\t\t\t\t\t\t\t<input value.bind=\"productFilterValue\" input.delegate=\"dataTable.filterList(productFilterValue, { type: 'custom',  filter: customProductNameFilter,  compare:'custom'} )\"\r\n                class=\"form-control\" />\r\n\t\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t\t<th>\r\n\t\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t\t<th>\r\n\t\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t\t<th>\r\n\t\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t\t<th></th>\r\n\t\t\t\t\t\t\t<th>\r\n\t\t\t\t\t\t\t\t<input value.bind=\"helpTicketTypeFilterValue\" input.delegate=\"dataTable.filterList(helpTicketTypeFilterValue, { type: 'custom',  filter: customNameFilter,  compare:'custom'} )\"  class=\"form-control\" />\r\n\t\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t\t<th>\r\n\t\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t<tr click.trigger=\"selectRequest($index, $event, request)\" repeat.for=\"request of dataTable.displayArray\">\r\n\t\t\t\t\t\t  <td data-title=\"Required Date\">${request.dateRequired | dateFormat:config.DATE_FORMAT_TABLE}</td>\r\n\t\t\t\t\t\t  <td data-title=\"Date Created\">${request.dateRequested | dateFormat:config.DATE_FORMAT_TABLE}</td>\r\n\t\t\t\t\t\t  <td data-title=\"Date Created\">${request.dateAssigned | dateFormat:config.DATE_FORMAT_TABLE}</td>\r\n\t\t\t\t\t\t  <td data-title=\"Product\">${request.product }</td>\r\n\t\t\t\t\t\t  <td data-title=\"System\">${request.systemId | lookupValue:systems.systemsArray:\"_id\":\"sid\"}</td>\r\n\t\t\t\t\t\t  <td data-title=\"Client\">${request.client}</td>\r\n\t\t\t\t\t\t  <td data-title=\"Student IDs\"><p>${request.studentUserIds} </p> ${request.studentPasswords}</td>\r\n\t\t\t\t\t\t  <td data-title=\"Faculty IDs\"><p>${request.facultyUserIds} </p> ${request.facultyPasswords}</td>\r\n\t\t\t\t\t\t\t<td data-title=\"Person\">${request.person}</td>\r\n\t\t\t\t\t\t\t<td data-title=\"Course\">${request.course}</td>\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t  </tbody>\r\n\t\t\t\t\t</table>\r\n\t\t\t\t  </div>\r\n\t\t\t\t</div>\r\n\t\t\t  </div>\r\n\t\t\t  </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/facco/components/peopleTable.html":
/*!*******************************************************!*\
  !*** ./src/modules/facco/components/peopleTable.html ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n   <div class='col-lg-10 col-lg-offset-1 bottomMargin'>\r\n      <compose view=\"../../../resources/elements/table-navigation-bar.html\"></compose>\r\n      <div id=\"no-more-tables\">\r\n          <table class=\"table table-striped table-hover cf\">\r\n              <thead class=\"cf\">\r\n                  <tr>\r\n                      <td colspan='7'>\r\n                          <span click.delegate=\"refresh()\" class=\"smallMarginRight\"><i class=\"fa fa-refresh\" aria-hidden=\"true\"></i></span>\r\n                          <span class=\"pull-right\" id=\"spinner\" innerhtml.bind=\"spinnerHTML\"></span>\r\n                      </td>\r\n                  </tr>\r\n                  <tr>\r\n                      <th style=\"width:20rem;\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'lastName'})\">Name </span><i class=\"fa fa-sort\"></i></th>\r\n                      <th style=\"width:15rem;\">Phone</th>\r\n                      <th style=\"width:15rem;\">Mobile</th>\r\n                      <th style=\"width:20rem;\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'email'})\">Email </span> <i class=\"fa fa-sort\"></i></th>\r\n                      <th>Role</th>\r\n                      <th>Status</th>\r\n                      <th>Change Status</th>\r\n                  </tr>\r\n              </thead>\r\n              <tbody>\r\n                  <tr>\r\n                      <th>\r\n                          <input value.bind=\"nameFilterValue\" input.delegate=\"dataTable.filterList(nameFilterValue, { type: 'text',  filter: 'nameFilter', collectionProperty: 'fullName', compare:'match'} )\"  class=\"form-control\" />\r\n                      </th>\r\n                      <th></th>\r\n                      <th></th>\r\n                      <th></th>\r\n                      <th>\r\n                         <input value.bind=\"roleFilter\" input.delegate=\"dataTable.filterList(roleFilter, { type: 'custom', filter: customRoleFilter, compare: 'custom'})\"  class=\"form-control\" />\r\n                      </th>\r\n                      <th>\r\n                          <select value.bind=\"personStatusFilter\" input.delegate=\"dataTable.filterList($event, { type: 'value',  filter: 'personStatusFilter',  collectionProperty: 'personStatus', displayProperty: 'personStatus',  compare:'match'} )\" class=\"form-control\" >\r\n                              <option value=\"\"></option>\r\n                              <option repeat.for='status of is4ua.personStatusArray' value='${status.code}'>${status.description}</option>\r\n                          </select>\r\n                      </th>\r\n                      <th></th>\r\n                  </tr>\r\n                  <tr  repeat.for=\"person of dataTable.displayArray\">\r\n                      <td  data-title=\"Name\">${person.fullName}</td>\r\n                      <td  data-title=\"Phone\">${person.phone | phoneNumber}</td>\r\n                      <td  data-title=\"Phone\">${person.mobile | phoneNumber}</td>\r\n                      <td  data-title=\"Email\">${person.email}</td>\r\n                      <td  data-title=\"Role\">${person.roles}</td>\r\n                      <td  data-title=\"Status\">${person.personStatus | lookupValue:is4ua.personStatusArray:\"code\":\"description\"}</td>\r\n                      <td data-title=\"Update\" style=\"width: 100px\" click.trigger=\"updateStatus(person)\" innerhtml.bind=\"person.personStatus | personStatusButton\">\r\n                  </tr>\r\n              </tbody>\r\n          </table>\r\n      </div>\r\n  </div>\r\n</template>\r\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/facco/components/requestDetailDetails.html":
/*!****************************************************************!*\
  !*** ./src/modules/facco/components/requestDetailDetails.html ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t<div class=\"col-lg-5\" show.bind=\"showRequest\">\r\n    \t<div class=\"panel panel-primary topMargin\">\r\n      \t\t<div class=\"panel-heading\">\r\n        \t\t<h3 class=\"panel-title\">${selectedProductID | lookupValue:products.productsArray:\"_id\":\"name\"}</h3>\r\n      \t\t</div>\r\n\t      \t<div class=\"panel-body\">\r\n\t        \t<h5>Request status: ${requests.selectedRequestDetail.requestStatus | lookupValue:config.REQUEST_STATUS:\"code\":\"desscription\"}</h5>\r\n\t        \t<h5>Assigned system: ${requests.selectedRequestDetail.assignment.systemId | lookupValue:systems.systemsArray:\"_id\":\"sid\"}</h5>\r\n\t        \t<h5>Assigned client: ${requests.selectedRequestDetail.assignment.clientId | lookupValue:systems.systemsArray:\"_id\":\"sid\"}</h5>\r\n\t      \t</div>\r\n    \t</div>\r\n  \t</div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/facco/components/requestsTable.html":
/*!*********************************************************!*\
  !*** ./src/modules/facco/components/requestsTable.html ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n<div class=\"col-lg-10 col-lg-offset-1\">\r\n    <compose view=\"../../../resources/elements/table-navigation-bar.html\"></compose>\r\n      <div id=\"no-more-tables\">\r\n        <table class=\"table table-striped table-hover cf\">\r\n          <thead class=\"cf\">\r\n            <tr>\r\n              <td colspan='7'>\r\n                <span click.delegate=\"refresh()\" class=\"smallMarginRight\"><i class=\"fa fa-refresh\" aria-hidden=\"true\"></i></span>\r\n                <span class=\"pull-right\" id=\"spinner\" innerhtml.bind=\"spinnerHTML\"></span>\r\n              </td>\r\n            </tr>\r\n            <tr>\r\n              <th class=\"col-xs-1\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'requestNo'})\">No </span> <i class=\"fa fa-sort\"></i></th>\r\n              <th class=\"col-lg-1\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'requiredDate'})\">Due </span><i class=\"fa fa-sort\"></i></th>\r\n              <th class=\"col-lg-1\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'createdDate'})\">Created </span><i class=\"fa fa-sort\"></i></th>\r\n              <th class=\"col-lg-1\">Type</th>\r\n              <th class=\"col-lg-1\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'requestStatus'})\">Status </span><i class=\"fa fa-sort\"></i></th>\r\n              <th class=\"col-sm-1\">IDS Requestd</th>\r\n              <th class=\"col-lg-2\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'productId.name'})\">Product </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n              <th class=\"col-lg-2\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {type: 'custom', sorter: customPersonSorter, propertyName: 'requestId.personId.lastName'})\">Faculty </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n              <th class=\"col-lg-2\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'course'})\">Course </span><i class=\"fa fa-sort\"></i></th>\r\n            </tr>\r\n          </thead>\r\n          <tbody>\r\n            <tr>\r\n              <th></th>\r\n              <th>\r\n                <input value.bind=\"requiredDateFilter\" change.delegate=\"dataTable.filterList(requiredDateFilter, { type: 'date',  filter: 'requiredDateFilter', collectionProperty: 'requiredDate', compare:'after' })\" type=\"date\" class=\"form-control datepicker\" data-dateformat=config.DATE_FORMAT_TABLE>\r\n              </th>\r\n              <th>\r\n                <input value.bind=\"createdDateFilter\" change.delegate=\"dataTable.filterList(createdDateFilter, { type: 'date',  filter: 'createdDateFilter', collectionProperty: 'createdDate', compare:'after' })\" type=\"date\" class=\"form-control datepicker\" data-dateformat=config.DATE_FORMAT_TABLE>\r\n              </th>\r\n              <th>\r\n           \t\t<select value.bind=\"courseFilter\" input.delegate=\"dataTable.filterList($event, { type: 'custom',  filter: courseCustomFilter,  collectionProperty: 'requestId.courseId', displayProperty: 'courseId',  compare:'custom'} )\" class=\"form-control\" >\r\n                \t<option value=\"\"></option>\r\n                   <option  value=\"${config.SANDBOX_ID}\">Sandbox</option>\r\n                   <option  value=\"Regular\">Regular</option>\r\n              \t</select>\r\n              </th>\r\n              <th>\r\n               \t<select value.bind=\"requestStatusFilter\" input.delegate=\"dataTable.filterList($event, { type: 'value',  filter: 'requestStatusFilter',  collectionProperty: 'requestStatus', displayProperty: 'requestStatus',  compare:'match'} )\" class=\"form-control\" >\r\n\t                  <option value=\"\"></option>\r\n\t                   <option repeat.for=\"status of config.REQUEST_STATUS\" value=\"${status.code}\">${status.description}</option>\r\n\t              </select>\r\n              </th>\r\n              <th></th>\r\n              <th>\r\n                <input value.bind=\"productFilterValue\" input.delegate=\"dataTable.filterList(productFilterValue, { type: 'custom',  filter: customProductNameFilter,  compare:'custom'} )\"\r\n                class=\"form-control\" />\r\n              </th>\r\n              <th>\r\n                <input value.bind=\"helpTicketTypeFilterValue\" input.delegate=\"dataTable.filterList(helpTicketTypeFilterValue, { type: 'custom',  filter: customNameFilter,  compare:'custom'} )\"  class=\"form-control\" />\r\n              </th>\r\n              <th></th>\r\n            </tr>\r\n            <tr click.trigger=\"selectRequest($index, $event, request)\" repeat.for=\"request of dataTable.displayArray\">\r\n              <td data-title=\"Request No\">${request.requestNo}</td>\r\n              <td data-title=\"Required Date\">${request.requiredDate | dateFormat:config.DATE_FORMAT_TABLE}</td>\r\n              <td data-title=\"Date Created\">${request.createdDate | dateFormat:config.DATE_FORMAT_TABLE}</td>\r\n              <td data-title=\"Course\">${request.requestId.courseId | sandbox:config.SANDBOX_NAME}</td>\r\n              <td data-title=\"Status\">${request.requestStatus | lookupValue:config.REQUEST_STATUS:\"code\":\"description\"}</td>\r\n              <td data-title=\"IDs Requested\">${request.requestId | idsRequested}</td>\r\n              <td data-title=\"Product\">${request.productId.name }</td>\r\n              <td data-title=\"Person\">${request.requestId.personId.fullName}</td>\r\n              <td data-title=\"Course\">${request.course}</td>\r\n            </tr>\r\n          </tbody>\r\n        </table>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/facco/components/viewAssignmentsTable.html":
/*!****************************************************************!*\
  !*** ./src/modules/facco/components/viewAssignmentsTable.html ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t<div class=\"row\">\r\n\t\t<div class=\"col-lg-4\">\r\n\t\t\t<div class=\"form-group topMargin leftMargin\">\r\n\t\t\t\t<select value.bind=\"selectedSession\" change.delegate=\"getAssignments()\" id=\"session\" class=\"form-control\">\r\n\t\t\t\t<option value=\"\">Select a session</option>\r\n\t\t\t\t<option repeat.for=\"session of sessions.sessionsArray\"\r\n\t\t\t\t\t\tvalue.bind=\"session._id\">Session ${session.session} - ${session.year}</option>\r\n\t\t\t\t</select>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t</div>\r\n\t\r\n\t\t<div show.bind=\"selectedSession != ''\">\r\n\t\t\t<div class=\"row\">\r\n\t\t\t<div class=\"col-lg-12\">\r\n\t\t\t\t<!-- Request Table -->\r\n\t\t\t\t<compose view=\"./assignmentsTable.html\"></compose>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/facco/components/viewRequestsTable.html":
/*!*************************************************************!*\
  !*** ./src/modules/facco/components/viewRequestsTable.html ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t<div class=\"row\">\r\n      <div class=\"col-lg-4\">\r\n        <div class=\"form-group topMargin leftMargin\">\r\n            <select value.bind=\"selectedSession\" change.delegate=\"getRequests()\" id=\"session\" class=\"form-control\">\r\n              <option value=\"\">Select a session</option>\r\n              <option repeat.for=\"session of sessions.sessionsArray\"\r\n                      value.bind=\"session._id\">Session ${session.session} - ${session.year}</option>\r\n            </select>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n      <div show.bind=\"selectedSession != ''\">\r\n        <div class=\"row\">\r\n          <div class=\"col-lg-12\">\r\n            <!-- Request Table -->\r\n            <compose view=\"./requestsTable.html\"></compose>\r\n          </div>\r\n      </div>\r\n  </div>\r\n\r\n  <compose view=\"./requestDetailDetails.html\"></compose>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/facco/editPeople.html":
/*!*******************************************!*\
  !*** ./src/modules/facco/editPeople.html ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n  <div class=\"panel panel-info\">\r\n    <div class=\"panel-body\">\r\n      <div class=\"row\">\r\n          <div class=\"col-lg-12\">\r\n              <compose view=\"./components/peopleTable.html\"></compose>\r\n          </div>\r\n    </div>\r\n</template>\r\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/facco/facco.html":
/*!**************************************!*\
  !*** ./src/modules/facco/facco.html ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <compose view='../../resources/elements/submenu.html'></compose>\r\n    <div class=\"col-lg-12\">\r\n        <router-view></router-view>\r\n    </div>\r\n</template>\r\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ })

}]);
//# sourceMappingURL=app-5e8369f8.2384d3fce1a12a237460.bundle.js.map