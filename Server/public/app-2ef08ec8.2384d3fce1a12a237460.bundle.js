"use strict";
(self["webpackChunkuccss_old_new"] = self["webpackChunkuccss_old_new"] || []).push([["app-2ef08ec8"],{

/***/ "main":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   configure: function() { return /* binding */ configure; }
/* harmony export */ });
/* harmony import */ var _config_environment_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config/environment.json */ 1407);
/* harmony import */ var aurelia_pal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-pal */ 1015);


function configure(aurelia) {
  aurelia.use.standardConfiguration().plugin('aurelia-dialog').globalResources('aurelia-mask/masked-input').feature('resources/index');
  aurelia.use.developmentLogging(_config_environment_json__WEBPACK_IMPORTED_MODULE_0__.debug ? 'debug' : 'warn');
  if (_config_environment_json__WEBPACK_IMPORTED_MODULE_0__.testing) {
    aurelia.use.plugin('aurelia-testing');
  }
  aurelia.start().then(() => aurelia.setRoot('app'));
}

/***/ }),

/***/ "modules/acc/accCreateRequest":
/*!*********************************************!*\
  !*** ./src/modules/acc/accCreateRequest.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ACCClientRequest: function() { return /* binding */ ACCClientRequest; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var aurelia_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-router */ 6433);
/* harmony import */ var _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../resources/utils/dataTable */ 6847);
/* harmony import */ var _resources_data_sessions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../resources/data/sessions */ 2073);
/* harmony import */ var _resources_data_products__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../resources/data/products */ 8666);
/* harmony import */ var _resources_data_siteInfo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../resources/data/siteInfo */ 1290);
/* harmony import */ var _resources_data_apjClientRequests__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../resources/data/apjClientRequests */ 3444);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
/* harmony import */ var _resources_utils_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../resources/utils/utils */ 8741);
/* harmony import */ var _resources_data_people__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../resources/data/people */ 353);
/* harmony import */ var _resources_data_systems__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../resources/data/systems */ 4077);
/* harmony import */ var _resources_utils_validation__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../resources/utils/validation */ 2824);
/* harmony import */ var _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../resources/dialogs/common-dialogs */ 6545);
/* harmony import */ var flatpickr__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! flatpickr */ 7545);
/* harmony import */ var aurelia_event_aggregator__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! aurelia-event-aggregator */ "aurelia-event-aggregator");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! moment */ 381);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_15__);
var _dec, _class;
















let ACCClientRequest = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(aurelia_router__WEBPACK_IMPORTED_MODULE_1__.Router, _config_appConfig__WEBPACK_IMPORTED_MODULE_7__.AppConfig, _resources_data_systems__WEBPACK_IMPORTED_MODULE_10__.Systems, _resources_utils_validation__WEBPACK_IMPORTED_MODULE_11__["default"], _resources_data_people__WEBPACK_IMPORTED_MODULE_9__.People, _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_12__.CommonDialogs, _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_2__.DataTable, _resources_utils_utils__WEBPACK_IMPORTED_MODULE_8__.Utils, _resources_data_sessions__WEBPACK_IMPORTED_MODULE_3__.Sessions, _resources_data_products__WEBPACK_IMPORTED_MODULE_4__.Products, _resources_data_apjClientRequests__WEBPACK_IMPORTED_MODULE_6__.APJClientRequests, _resources_data_siteInfo__WEBPACK_IMPORTED_MODULE_5__.SiteInfo, aurelia_event_aggregator__WEBPACK_IMPORTED_MODULE_14__.EventAggregator), _dec(_class = class ACCClientRequest {
  constructor(router, config, systems, validation, people, dialog, datatable, utils, sessions, products, requests, siteInfo, ea) {
    this.configDate = {};
    this.router = router;
    this.config = config;
    this.validation = validation;
    this.validation.initialize(this);
    this.people = people;
    this.dataTable = datatable;
    this.dataTable.initialize(this);
    this.utils = utils;
    this.sessions = sessions;
    this.products = products;
    this.requests = requests;
    this.siteInfo = siteInfo;
    this.systems = systems;
    this.dialog = dialog;
    this.ea = ea;
    this.userObj = JSON.parse(sessionStorage.getItem('user'));
    ;
    this.invoiceRelevant = false;
  }
  async activate() {
    let responses = await Promise.all([this.products.getProductsArray('?filter=apj|eq|true&order=name', true), this.people.getInstitutionsArray('?filter=[and]institutionStatus|eq|01:apj|eq|true&order=name', true), this.siteInfo.getMessageArray('?filter=category|eq|CLIENT_REQUESTS', true), this.people.getAPJPackages(), this.systems.getSystemsArray('?filter=apj|eq|true', true), this.config.getConfig()]);
    $('#loading').hide();
    this.requests.selectRequest();
    this.filterList();
    this._setUpValidation();

    // this.useSandbox = this.config.SANDBOX_USED;
    // if (!this.config.SANDBOX_USED) {
    // 	this.typeSelected = true;
    // 	this.regularClient = true;
    // 	this.requestType = "regularCourse";
    // }
    this.filterInstitutions();
  }
  filterInstitutions() {
    this.insitutionsArray = this.people.institutionsArray.filter(item => {
      return item.packageId !== null;
    });
  }
  filterInstiutionList() {
    if (!this.filterValue) {
      this.filterInstitutions();
      return;
    }
    let filterValue = this.filterValue.toLowerCase();
    this.insitutionsArray = this.people.institutionsArray.filter(item => {
      return item.packageId !== null && item.name.toLowerCase().indexOf(filterValue) > -1;
    });
  }
  attached() {
    $('#loading').hide();
  }
  selectProduct(product) {
    if (this.requestDetails.length >= this.selectedPackage.maxClients) {
      // this.utils.showNotification("This university has reached their maximum requested products.", "error");
      return this.dialog.showMessage("This university has reached their maximum requested products.  Are you sure you want to proceed?", "Extra Client", ['Yes', 'No']).whenClosed(response => {
        if (response.output.toUpperCase() == 'YES') {
          this.invoiceRelevant = true;
          this.addTheClient(product);
          return;
        } else {
          this.invoiceRelevant = false;
          this.addTheClient(product);
          return;
        }
      });
    }
    this.invoiceRelevant = false;
    this.addTheClient(product);
  }
  addTheClient(product) {
    $("#requestProductsLabel").html("Requested Products");
    var newObj = this.requests.emptyRequestDetail();
    newObj.productId = product._id;
    this.requestDetails.push(newObj);
    this.requests.selectedRequest.requestDetails.push(newObj);
    this.products.selectedProductFromId(newObj.productId);
    this.requests.selectedRequest.requestDetails[this.requests.selectedRequest.requestDetails.length - 1].productName = product.name;
    this.requests.selectedRequest.requestDetails[this.requests.selectedRequest.requestDetails.length - 1].invoiceRelevant = this.invoiceRelevant;
    if (this.invoiceRelevant) {
      this.requests.selectedRequest.requestDetails[this.requests.selectedRequest.requestDetails.length - 1].price = product.price;
    }
    this.validation.makeValid($("#productList"));
  }
  alreadyOnList(id) {
    for (let i = 0; i < this.requests.selectedRequest.requestDetails.length; i++) {
      if (this.requests.selectedRequest.requestDetails[i].productId === id) return true;
    }
    return false;
  }
  async removeProduct(index) {
    if (this.requestDetails[index].requestStatus == this.config.ASSIGNED_REQUEST_CODE) {
      return this.dialog.showMessage("That request has already been assigned.  Are you sure you want to retire that assignment?", "Retire Assignment", ['Yes', 'No']).whenClosed(response => {
        if (!response.wasCancelled) {
          this.requestDetails[index].requestStatus = this.config.RETIRED_REQUEST_CODE;
          this.saveIt();
          this.updateClient(this.requestDetails[index]);
        }
      });
    } else {
      return this.dialog.showMessage("Are you sure you want to delete that request?", "Delete Request", ['Yes', 'No']).whenClosed(response => {
        if (!response.wasCancelled) {
          this.requestDetails[index].delete = true;
          this.removeRequestDetail(this.requestDetails[index]);
          this.requestDetails.splice(index, 1);
          this.saveIt();
        }
      });
    }
  }
  removeRequestDetail(request) {
    let spliceIndex = -1;
    this.requests.selectedRequest.requestDetails.forEach((item, index) => {
      if (item._id === request._id) spliceIndex = index;
    });
    this.requests.selectedRequest.requestDetails.splice(spliceIndex, 1);
  }
  async updateClient(request) {
    var clientToProcess;
    request.assignments.forEach(item => {
      clientToProcess = -1;
      let retireClient = true;
      this.systems.selectedSystemFromId(item.systemId);
      for (let i = 0; i < this.systems.selectedSystem.clients.length; i++) {
        if (this.systems.selectedSystem.clients[i].client == item.client) {
          clientToProcess = i;
          this.systems.selectedSystem.clients[i].assignments.forEach((assign, index) => {
            if (request._id === assign.assignment) {
              this.systems.selectedSystem.clients[clientToProcess].assignments[index].statusCurrent = false;
            }
          });
          retireClient = true;
          this.systems.selectedSystem.clients[clientToProcess].assignments.forEach(item => {
            if (item.statusCurrent === undefined || item.statusCurrent) retireClient = false;
          });
          if (this.systems.selectedSystem.clients[clientToProcess].assignments.length === 0 || retireClient) {
            this.systems.selectedSystem.clients[clientToProcess].clientStatus = this.config.RETIRED_CLIENT_CODE;
          }
        }
      }
      this.systems.saveSystem();
    });
  }
  _buildRequest() {
    if (this.requests.selectedRequest._id) {
      this.requests.selectedRequest.requestDetails.invoiceRelevant = this.invoiceRelevant;
      this.requests.selectedRequest.requestDetailsToSave = this.requests.selectedRequest.requestDetails;
      this.requests.selectedRequest.requestDetailsToSave.forEach((item, index) => {
        if (item.requestStatus != this.config.ASSIGNED_REQUEST_CODE && item.requestStatus != this.config.RETIRED_REQUEST_CODE) item.requestStatus = this.config.UPDATED_REQUEST_CODE;
        // if (item.requestStatus == this.config.RETIRED_REQUEST_CODE) {
        //   this.requests.selectedRequest.requestDetails.splice(index, 1);
        // }
      });

      this.requests.selectedRequest.requestStatus = this.config.UPDATED_REQUEST_CODE;
    } else {
      this.requests.selectedRequest.requestStatus = this.config.UNASSIGNED_REQUEST_CODE;
    }
    this.requests.selectedRequest.institutionId = this.selectedInstitution;
  }
  _cleanUp() {
    this.requests.selectRequest();
    this.institutionSelected = false;
    this.selectedInstitution = "";
    this.personSelected = false;
    this.typeSelected = false;
    if (!this.config.SANDBOX_USED) {
      this.typeSelected = true;
      this.regularClient = true;
      this.requestType = "regularCourse";
    }
    this.sandBoxClient = false;
    $("#existingRequestInfo").hide();
    this.requestType = -1;
  }
  async changeInstitution(el) {
    if (this.selectedInstitution != "") {
      await this.people.selectInstitutionByID(this.selectedInstitution);
      this.getPackage();
      this.institutionSelected = true;
      if (!this.config.SANDBOX_USED) {
        this.typeSelected = true;
        this.regularClient = true;
        this.requestType = "regularCourse";
      }
      this.selectedPerson = "";
      this.requestType = "";
      $("#existingRequestInfo").empty().hide();
      await this.requests.getAPJInstitutionRequests('?filter=institutionId|eq|' + this.selectedInstitution, true);
      if (!this.requests.apjInstitutionRequestArray.length) {
        this.requests.selectRequest();
      } else {
        this.requests.selectRequest(0);
      }
      this.filterNotActiveRequests();
    } else {
      this.people.selectInstitution();
      this.institutionSelected = false;
    }
  }
  filterNotActiveRequests() {
    this.requestDetails = [];
    this.requests.selectedRequest.requestDetails.forEach(item => {
      if (item.requestStatus != this.config.RETIRED_REQUEST_CODE) {
        this.requestDetails.push(item);
      }
    });
  }
  getPackage() {
    this.selectedPackage = undefined;
    this.people.packageArray.forEach(item => {
      if (this.people.selectedInstitution.packageId != null && item._id === this.people.selectedInstitution.packageId.packageId) this.selectedPackage = item;
    });
  }
  changePerson(el) {
    this.personSelected = true;
    this.people.selectedPersonFromId(this.selectedPerson, 'i');
    if (!this.config.SANDBOX_USED) {
      this.people.getCoursesArray(true, '?filter=personId|eq|' + this.selectedPerson + '&order=number', true);
    }
  }
  changeRequestType(el) {
    switch (this.requestType) {
      case -1:
        if (!this.config.SANDBOX_USED) {
          this.typeSelected = true;
          this.regularClient = true;
          this.requestType = "regularCourse";
        }
        break;
      case "regularCourse":
        this.typeSelected = true;
        this.regularClient = true;
        this.requestType = "regularCourse";
        this.people.getCoursesArray(true, '?filter=personId|eq|' + this.selectedPerson + '&order=number', true);
        break;
      case "sandboxCourse":
        this.courseId = this.config.SANDBOX_ID;
        this.sandBoxClient = true;
        this.regularClient = false;
        break;
    }
  }
  filterList() {
    if (this.filter) {
      var thisFilter = this.filter;
      this.filteredProductsArray = this.products.productsArray.filter(item => {
        return item.name.toUpperCase().indexOf(thisFilter.toUpperCase()) != -1;
      });
    } else {
      this.filteredProductsArray = this.products.productsArray;
    }
  }
  setDates(session) {
    if (session) {
      $("#input-startDate").val("");
      $("#input-endDate").val("");
    }
    this.minStartDate = this.sessions.selectedSession.startDate;
    this.maxStartDate = this.sessions.selectedSession.endDate;
    this.minEndDate = this.sessions.selectedSession.startDate;
    this.maxEndDate = this.sessions.selectedSession.endDate;
    var nowPlusLeeway = moment__WEBPACK_IMPORTED_MODULE_15___default()(new Date()).add(this.config.REQUEST_LEEWAY, 'days');
    this.minRequiredDate = moment__WEBPACK_IMPORTED_MODULE_15___default().max(nowPlusLeeway, moment__WEBPACK_IMPORTED_MODULE_15___default()(this.sessions.selectedSession.startDate));
    this.minRequiredDate = moment__WEBPACK_IMPORTED_MODULE_15___default()(this.minRequiredDate._d).format('YYYY-MM-DD');
    this.maxRequiredDate = this.sessions.selectedSession.endDate;
  }
  _setUpValidation() {
    this.validation.addRule(1, "institution", [{
      "rule": "custom",
      "message": "Select an institution",
      "valFunction": function (context) {
        return !(context.selectedInstitution == "");
      }
    }]);
    this.validation.addRule(1, "numberOfStudentsError", [{
      "rule": "custom",
      "message": "Enter the number of students",
      "valFunction": function (context) {
        var now = moment__WEBPACK_IMPORTED_MODULE_15___default()(new Date());
        for (var i = 0; i < context.requests.selectedRequest.requestDetails.length; i++) {
          if (moment__WEBPACK_IMPORTED_MODULE_15___default()(context.requests.selectedRequest.requestDetails[i].createdDate).diff(now, 'day') === 0) {
            if (!context.requests.selectedRequest.requestDetails[i].numberOfStudents || context.requests.selectedRequest.requestDetails[i].numberOfStudents == 0) {
              return false;
            }
          }
        }
        return true;
      }
    }]);
    this.validation.addRule(1, "requiredDateError", [{
      "rule": "custom",
      "message": "Required date cannot be earlier than 5 days from today",
      "valFunction": function (context) {
        var nowPlusLeeway = moment__WEBPACK_IMPORTED_MODULE_15___default()(new Date()).add(context.config.REQUEST_LEEWAY + 1, 'days');
        var now = moment__WEBPACK_IMPORTED_MODULE_15___default()(new Date());
        for (var i = 0; i < context.requests.selectedRequest.requestDetails.length; i++) {
          if (moment__WEBPACK_IMPORTED_MODULE_15___default()(context.requests.selectedRequest.requestDetails[i].createdDate).diff(now, 'day') === 0) {
            if (moment__WEBPACK_IMPORTED_MODULE_15___default()(context.requests.selectedRequest.requestDetails[i].requiredDate).isBefore(nowPlusLeeway, 'day')) {
              return false;
            }
          }
        }
        return true;
      }
    }]);
    this.validation.addRule(1, "dateError", [{
      "rule": "custom",
      "message": "Enter all required dates",
      "valFunction": function (context) {
        for (var i = 0; i < context.requests.selectedRequest.requestDetails.length; i++) {
          if (!context.requests.selectedRequest.requestDetails[i].requiredDate || context.requests.selectedRequest.requestDetails[i].requiredDate === "") {
            return false;
          }
        }
        return true;
      }
    }]);
  }
  async saveIt() {
    if (this.validation.validate(1)) {
      if (!this.requests.selectedRequest._id) {
        this._buildRequest();
        let serverResponse = await this.requests.saveRequest();
        if (!serverResponse.status) {
          this.systemSelected = false;
          this.utils.showNotification("Product request " + serverResponse.clientRequestNo + " was updated");
        }
      } else {
        this._buildRequest();
        let serverResponse = await this.requests.saveRequestWithId();
        if (!serverResponse.status) {
          this.utils.showNotification("The product request was updated");
          this.systemSelected = false;
        }
      }
      this._cleanUp();
    }
  }
}) || _class);

/***/ }),

/***/ "modules/acc/accInstitute":
/*!*****************************************!*\
  !*** ./src/modules/acc/accInstitute.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   accInstitute: function() { return /* binding */ accInstitute; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../resources/utils/dataTable */ 6847);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
/* harmony import */ var _resources_utils_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../resources/utils/utils */ 8741);
/* harmony import */ var _resources_data_people__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../resources/data/people */ 353);
/* harmony import */ var _resources_data_is4ua__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../resources/data/is4ua */ 5175);
/* harmony import */ var _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../resources/dialogs/common-dialogs */ 6545);
/* harmony import */ var _resources_utils_validation__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../resources/utils/validation */ 2824);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! jquery */ 5311);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_8__);
var _dec, _class;









let accInstitute = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_1__.DataTable, _config_appConfig__WEBPACK_IMPORTED_MODULE_2__.AppConfig, _resources_data_people__WEBPACK_IMPORTED_MODULE_4__.People, _resources_utils_utils__WEBPACK_IMPORTED_MODULE_3__.Utils, _resources_data_is4ua__WEBPACK_IMPORTED_MODULE_5__.is4ua, _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_6__.CommonDialogs, _resources_utils_validation__WEBPACK_IMPORTED_MODULE_7__["default"]), _dec(_class = class accInstitute {
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
    let responses = await Promise.all([this.people.getPeopleArray('?order=lastName'), this.people.getInstitutionsArray('?filter=apj|eq|true&order=name', true), this.is4ua.loadIs4ua(), this.people.getAPJPackages('?order=price')]);
    this.dataTable.updateArray(this.people.institutionsArray);
    jquery__WEBPACK_IMPORTED_MODULE_8___default()('#loading').hide();
    this.initialLoaded = true;
  }
  async activate() {
    this.initialLoaded = false;
  }
  async refresh() {
    jquery__WEBPACK_IMPORTED_MODULE_8___default()('#loading').show();
    await this.people.getInstitutionsArray('?filter=apj|eq|true&order=name', true);
    this.dataTable.updateArray(this.people.institutionArray);
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
    this.people.selectedInstitution.apj = true;
    this.newInstitution = true;
    jquery__WEBPACK_IMPORTED_MODULE_8___default()("#editName").focus();
    this.institutionSelected = true;
  }
  async save() {
    if (this.validation.validate(1)) {
      if (!this.people.selectedInstitution._id) {
        this.people.selectedInstitution.packageId = this.people.selectedInstitution.packageId.packageId;
      }
      let serverResponse = await this.people.saveAPJInstitution();
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
    // this.validation.addRule(1,"editInstitutonPakage",[{"rule":"required","message":"Package is required", "value": "people.selectedInstitution.packageId"}]);
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
    let csvContent = "data:text/csv;charset=utf-8;,Name,City,State,Type\r\n";
    this.dataTable.baseArray.forEach(item => {
      csvContent += item.name + "," + item.city + "," + item.state + "," + item.institutionType;
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

/***/ "modules/acc/accInstitutions":
/*!********************************************!*\
  !*** ./src/modules/acc/accInstitutions.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ACCCustomers: function() { return /* binding */ ACCCustomers; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var aurelia_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-router */ 6433);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
var _dec, _class;



let ACCCustomers = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(aurelia_router__WEBPACK_IMPORTED_MODULE_1__.Router, _config_appConfig__WEBPACK_IMPORTED_MODULE_2__.AppConfig), _dec(_class = class ACCCustomers {
  constructor(router, config) {
    this.title = "ACC Customers";
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
      route: ['', 'accInstitute'],
      moduleId: './accInstitute',
      settings: {
        auth: true,
        roles: []
      },
      nav: true,
      name: 'accInstitute',
      title: 'Institutions'
    }
    // ,
    //  {
    //     route: 'people',
    //     moduleId: './accPeople',
    //     settings: { auth: true, roles: [] },
    //     nav: true,
    //     name: 'accPeople',
    //     title: 'People'
    // }
    ]);

    this.router = router;
  }
}) || _class);

/***/ }),

/***/ "modules/acc/accRequests":
/*!****************************************!*\
  !*** ./src/modules/acc/accRequests.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ACCRequests: function() { return /* binding */ ACCRequests; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var aurelia_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-router */ 6433);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
var _dec, _class;



let ACCRequests = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(aurelia_router__WEBPACK_IMPORTED_MODULE_1__.Router, _config_appConfig__WEBPACK_IMPORTED_MODULE_2__.AppConfig), _dec(_class = class ACCRequests {
  constructor(router, config) {
    this.title = "ACC Client Assignments";
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
      route: ['', 'accCreateRequest'],
      moduleId: './accCreateRequest',
      settings: {
        auth: true,
        roles: []
      },
      nav: true,
      name: 'createRequest',
      title: 'Create Request'
    }, {
      route: 'viewUserRequests',
      moduleId: './viewUserRequests',
      settings: {
        auth: true,
        roles: []
      },
      nav: true,
      name: 'viewUserRequests',
      title: 'View User Requests'
    },
    // {
    //     route: 'clientRequestsAnalytics',
    //     moduleId: '../../analytics/clientRequests',
    //     settings: { auth: true, roles: [] },
    //     nav: true,
    //     name: 'clientRequests',
    //     title: 'Client Requests Analytics'
    // },
    {
      route: 'apjAssignments',
      moduleId: './apjAssignments',
      settings: {
        auth: true,
        roles: []
      },
      nav: true,
      name: 'apjAssignments',
      title: 'Assignments'
    }]);
    this.router = router;
  }
}) || _class);

/***/ }),

/***/ "modules/acc/apjAssignments":
/*!*******************************************!*\
  !*** ./src/modules/acc/apjAssignments.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   APJAssignments: function() { return /* binding */ APJAssignments; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var aurelia_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-router */ 6433);
/* harmony import */ var _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../resources/utils/dataTable */ 6847);
/* harmony import */ var _resources_data_sessions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../resources/data/sessions */ 2073);
/* harmony import */ var _resources_data_products__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../resources/data/products */ 8666);
/* harmony import */ var _resources_data_siteInfo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../resources/data/siteInfo */ 1290);
/* harmony import */ var _resources_data_apjClientRequests__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../resources/data/apjClientRequests */ 3444);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
/* harmony import */ var _resources_utils_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../resources/utils/utils */ 8741);
/* harmony import */ var _resources_data_people__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../resources/data/people */ 353);
/* harmony import */ var _resources_data_systems__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../resources/data/systems */ 4077);
/* harmony import */ var _resources_utils_validation__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../resources/utils/validation */ 2824);
/* harmony import */ var _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../resources/dialogs/common-dialogs */ 6545);
/* harmony import */ var flatpickr__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! flatpickr */ 7545);
/* harmony import */ var aurelia_event_aggregator__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! aurelia-event-aggregator */ "aurelia-event-aggregator");
/* harmony import */ var fuelux__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! fuelux */ 9424);
/* harmony import */ var fuelux__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(fuelux__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! moment */ 381);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_16__);
var _dec, _class;

















let APJAssignments = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(aurelia_router__WEBPACK_IMPORTED_MODULE_1__.Router, _config_appConfig__WEBPACK_IMPORTED_MODULE_7__.AppConfig, _resources_utils_validation__WEBPACK_IMPORTED_MODULE_11__["default"], _resources_data_people__WEBPACK_IMPORTED_MODULE_9__.People, _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_12__.CommonDialogs, _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_2__.DataTable, _resources_utils_utils__WEBPACK_IMPORTED_MODULE_8__.Utils, _resources_data_sessions__WEBPACK_IMPORTED_MODULE_3__.Sessions, _resources_data_products__WEBPACK_IMPORTED_MODULE_4__.Products, _resources_data_systems__WEBPACK_IMPORTED_MODULE_10__.Systems, _resources_data_apjClientRequests__WEBPACK_IMPORTED_MODULE_6__.APJClientRequests, _resources_data_siteInfo__WEBPACK_IMPORTED_MODULE_5__.SiteInfo, aurelia_event_aggregator__WEBPACK_IMPORTED_MODULE_14__.EventAggregator), _dec(_class = class APJAssignments {
  constructor(router, config, validation, people, dialog, datatable, utils, sessions, products, systems, requests, siteInfo, ea) {
    this.router = router;
    this.config = config;
    this.validation = validation;
    this.validation.initialize(this);
    this.people = people;
    this.dataTable = datatable;
    this.dataTable.initialize(this);
    this.utils = utils;
    this.sessions = sessions;
    this.products = products;
    this.requests = requests;
    this.systems = systems;
    this.dialog = dialog;
    this.ea = ea;
    this.userObj = JSON.parse(sessionStorage.getItem('user'));
    // this.showTable = true;
    this.assignmentDetailIndex = 0;
  }
  async activate() {
    let responses = await Promise.all([this.products.getProductsArray('?filter=apj|eq|true&order=name', true), this.people.getInstitutionsArray('?filter=[and]institutionStatus|eq|01:apj|eq|true&order=name'), this.systems.getSystemsArray('?filter=apj|eq|true', true), this.people.getAPJPackages(), this.config.getConfig()]);
    this.requestSelected = "table";
    $('#loading').hide();
    this.getRequests();
  }
  attached() {
    $('#loading').hide();
  }
  async getRequests() {
    this.isCheckedAssigned = true;
    await this.filterInAssigned();
    this.clearFilters();
  }
  async refresh() {
    $('#loading').show();
    await this.getRequests();
    $('#loading').hide();
    this.spinnerHTML = "";
  }
  async filterInAssigned() {
    this.requiredDateFilterValue = "";
    this.createdDateFilterValue = "";
    this.requestStatusFilter = "";
    this.productFilterValue = "";
    this.courseFilterValue = "";
    this.helpTicketTypeFilterValue = "";
    this.institutionFilterValue = "";
    if (this.isCheckedAssigned) {
      $('#loading').show();
      await this.requests.getClientRequestsDetailsArray('?filter=[in]requestStatus[list]' + this.config.UNASSIGNED_REQUEST_CODE + ':' + this.config.UPDATED_REQUEST_CODE + ':' + this.config.CUSTOMER_ACTION_REQUEST_CODE, true);
      $('#loading').hide();
      if (this.requests.requestsDetailsArray && this.requests.requestsDetailsArray.length) {
        this.noRequests = false;
        this.dataTable.updateArray(this.requests.requestsDetailsArray, 'requiredDate', -1);
      } else {
        this.noRequests = true;
        this.dataTable.displayArray = new Array();
      }
    } else {
      $('#loading').show();
      await this.requests.getClientRequestsDetailsArray('', true);
      $('#loading').hide();
      this.dataTable.updateArray(this.requests.requestsDetailsArray, 'requiredDate', -1);
      if (this.requests.requestsDetailsArray.length) this.noRequests = false;
    }
  }
  async clearFilters() {
    this.requiredDateFilterValue = "";
    this.createdDateFilterValue = "";
    this.requestStatusFilter = "";
    this.productFilterValue = "";
    this.courseFilterValue = "";
    this.helpTicketTypeFilterValue = "";
    this.institutionFilterValue = "";
    this.dataTable.updateArray(this.requests.requestsDetailsArray);
  }
  async selectARequest(index, request) {
    this.editIndex = index;
    let response = await this.requests.getRequestDetail(request._id);
    if (!response.error) {
      this.selectedRequestDetail = response;
      this.products.selectedProductFromId(this.selectedRequestDetail.productId._id);
      if (!this.selectedRequestDetail.techComments || !this.selectedRequestDetail.techComments.length) {
        this.selectedRequestDetail.techComments = this.products.selectedProduct.productInfoApj ? this.products.selectedProduct.productInfoApj : "";
      }
      if (this.selectedRequestDetail.assignments && this.selectedRequestDetail.assignments.length > 0) this.systems.selectedSystemFromId(this.selectedRequestDetail.assignments[0].systemId);
      await this.getProductSystems();
      this.requestSelected = 'form';
    }
  }
  async viewAssignment(index, request) {
    this.editIndex = index;
    let response = await this.requests.getRequestDetail(request._id);
    if (!response.error) {
      this.selectedRequestDetail = response;
      this.products.selectedProductFromId(this.selectedRequestDetail.productId._id);
      if (this.selectedRequestDetail.assignments && this.selectedRequestDetail.assignments.length > 0) this.systems.selectedSystemFromId(this.selectedRequestDetail.assignments[0].systemId);
      await this.getProductSystems();
      this.requestSelected = 'view';
    }
  }
  async getProductSystems() {
    this.systemConfigured = false;
    this.productSystems = new Array();
    var productSystemsSIDs = "";
    this.products.selectedProduct.systems.forEach(item => {
      let delimiterChar = productSystemsSIDs.length ? ":" : "";
      productSystemsSIDs += delimiterChar + item.sid;
    });
    let response = await this.systems.getAPJConfiguredProductSystems(productSystemsSIDs);
    if (!response.error) {
      response.forEach(item => {
        if (item.active) this.productSystems.push(item);
      });
    }
    if (this.productSystems != null && this.productSystems.length) {
      this.systemConfigured = true;
      this.productSystems = this.productSystems.sort((a, b) => {
        return a['sid'] < b['sid'] ? -1 : a['sid'] > b['sid'] ? 1 : 0;
      });
      this.selectedSystem = this.productSystems[0];
      this.clientsConfigured = true;
    }
  }
  selectClient(index, client) {
    this.selectedClientIndex = index;
    for (let k = 0; k < this.selectedRequestDetail.assignments.length; k++) {
      if (this.selectedRequestDetail.assignments[k].client == client.client) return;
    }
    this.selectedRequestDetail.assignments.push({
      staffId: this.userObj._id,
      client: client.client,
      systemId: client.systemId
    });
    // this.selectedRequestDetail.techComments = this.products.selectedProduct.productInfo ? this.products.selectedProduct.productInfo : "";

    this.insertAssignmentIntoSystem(client, this.selectedRequestDetail.assignments);
    this.assignClientStatus();
  }
  insertAssignmentIntoSystem(client, details) {
    let clientCopy = this.utils.copyObject(client);
    clientCopy.assignments.push({
      assignment: this.selectedRequestDetail._id,
      studentIDRange: details.studentUserIds,
      facultyIDRange: details.facultyUserIds,
      institutionId: this.selectedRequestDetail.requestId.institutionId,
      provisional: true
    });
    this.updateProductSystemsClient(clientCopy, clientCopy.systemId);
  }
  updateProductSystemsClient(client) {
    this.selectedSystem.clients[this.selectedClientIndex].assignments = client.assignments;
    this.clientSelectedIndex = client.assignments.length - 1;
  }
  assignClientStatus() {
    if (this.selectedSystem.clients[this.selectedClientIndex].clientStatus !== this.config.SANDBOX_CLIENT_CODE) {
      if (this.selectedSystem.clients[this.selectedClientIndex].assignments && this.selectedSystem.clients[this.selectedClientIndex].assignments.length === 0) {
        this.selectedSystem.clients[this.selectedClientIndex].clientStatus = this.config.UNASSIGNED_CLIENT_CODE;
      } else if (this.selectedSystem.clients[this.selectedClientIndex].assignments.length === 1) {
        this.selectedSystem.clients[this.selectedClientIndex].clientStatus = this.config.ASSIGNED_CLIENT_CODE;
      } else {
        this.selectedSystem.clients[this.selectedClientIndex].clientStatus = this.config.SHARED_CLIENT_CODE;
      }
    }
  }

  /*****************************************************************************************************
  * The user selects an assignment 
  * index - the index of the selected assignment
  * el - the event object
  ****************************************************************************************************/
  selectProposedClient(index, el) {
    //Save the index 
    this.assignmentDetailIndex = index;
    this.setClientIndex(this.selectedRequestDetail.assignments[this.assignmentDetailIndex].client);
    this.setClientAssignmentIndex(this.selectedSystem.clients[this.selectedClientIndex]);
    if (this.assignmentDetailIndex == -1) {
      this.selectedAssignedClient = "";
      if (this.selectedRow) this.selectedRow.children().removeClass('info');
    } else {
      this.selectedAssignedClient = this.selectedRequestDetail.assignments[this.assignmentDetailIndex].client;
      //Highlight the table row
      if (this.selectedAssignmentRow) this.selectedAssignmentRow.children().removeClass('info');
      this.selectedAssignmentRow = $(el.target).closest('tr');
      this.selectedAssignmentRow.children().addClass('info');
    }
  }

  /*****************************************************************************************************
    * Save the request 
    ****************************************************************************************************/
  async save() {
    if (this._buildRequest()) {
      this.requests.setSelectedRequest(this.requestToSave);
      let serverResponse = await this.requests.assignRequest(this.editIndex);
      if (!serverResponse.status) {
        this.utils.showNotification("The request was updated");
        this._cleanUp();
        this.dataTable.updateArrayMaintainFilters(this.requests.requestsDetailsArray);
        this.reSort();
        await this.filterInAssigned();
        this._cleanUp();
      }
    }
  }
  _cleanUp() {
    this.selectedRequestDetail.assignments = [];
    this.selectedSystem = {};
    this.requestSelected = "table";
    // this.showTable = true;
  }

  reSort() {
    this.dataTable.sortArray({}, {}, true);
  }
  systemSelected() {
    this.selectProductSystem(this.selectedSystemId);
  }
  selectProductSystem(id) {
    this.selectedSystemId = id;
    this.productSystems.forEach((item, index) => {
      if (item._id === id) {
        this.selectedSystem = item;
        this.selectedSystemIndex = index;
      }
    });
    this.checkClientConfigured();
  }
  checkClientConfigured() {
    this.clientsConfigured = false;
    for (let i = 0; i < this.selectedSystem.clients.length; i++) {
      if (this.selectedSystem.clients[i].productId === this.products.selectedProduct._id) {
        this.clientsConfigured = true;
        break;
      }
    }
  }

  /*****************************************************************************************************
  * Build the data objects to send to the server 
  ****************************************************************************************************/
  _buildRequest() {
    this.productSystems.forEach(system => {
      system.clients.forEach(client => {
        client.assignments.forEach(assignment => {
          assignment.provisional = false;
        });
      });
    });
    this.systemQueue = new Array();
    this.selectedRequestDetail.assignments.forEach((item, index) => {
      let saveSystem = true;
      this.systemQueue.forEach(system => {
        if (item.systemId === system._id) saveSystem = false;
      });
      if (saveSystem) this.systemQueue.push(this._getSystem(item.systemId));
      delete item['provisional'];
      item.assignedDate = item.assignedDate ? item.assignedDate : new Date();
    });
    this.systemQueue.forEach(server => {
      server.clients.forEach(client => {
        client.assignments.forEach(assignment => {
          assignment.assignment = assignment.assignment != null && assignment.assignment._id ? assignment.assignment._id : assignment.assignment;
        });
      });
    });
    this.selectedRequestDetail.requestStatus = this.selectedRequestDetail.assignments && this.selectedRequestDetail.assignments.length > 0 ? this.config.ASSIGNED_REQUEST_CODE : this.config.UNASSIGNED_REQUEST_CODE;
    this.requestToSave = this.utils.copyObject(this.selectedRequestDetail.requestId);
    this.requestToSave.requestDetailsToSave = new Array();
    var request = this.utils.copyObject(this.selectedRequestDetail);
    delete request['requestId'];
    this.requestToSave.requestDetailsToSave.push(request);
    this.requestToSave.systemsToSave = this.systemQueue;
    return true;
  }
  _getSystem(id) {
    for (let k = 0; k < this.productSystems.length; k++) {
      if (this.productSystems[k]._id === id) return this.productSystems[k];
    }
    return null;
  }
  updateClientAssignments() {
    if (this.selectedClientIndex) {
      // this.selectedSystem.clients[this.selectedClientIndex].assignments[this.clientSelectedIndex].studentIDRange
      this.selectedSystem.clients[this.selectedClientIndex].assignments[this.clientSelectedIndex].studentIDRange = this.selectedRequestDetail.assignments[this.assignmentDetailIndex].studentUserIds;
      this.selectedSystem.clients[this.selectedClientIndex].assignments[this.clientSelectedIndex].studentPassword = this.selectedRequestDetail.assignments[this.assignmentDetailIndex].studentPassword;
      this.selectedSystem.clients[this.selectedClientIndex].assignments[this.clientSelectedIndex].facultyIDRange = this.selectedRequestDetail.assignments[this.assignmentDetailIndex].facultyIDRange;
      this.selectedSystem.clients[this.selectedClientIndex].assignments[this.clientSelectedIndex].facultyPassword = this.selectedRequestDetail.assignments[this.assignmentDetailIndex].facultyPassword;
    }
  }
  back() {
    // this.showTable = true;
    this.requestSelected = "table";
  }
  backView() {
    this.requestSelected = "table";
  }
  deleteTable(assignment) {
    this.setAssignmentIndex(assignment.client);
    this.setClientIndex(assignment.client);
    this.setClientAssignmentIndex(this.selectedSystem.clients[this.selectedClientIndex]);
    this.deleteProposedClient(assignment);
  }
  findSystemClient(assignment) {
    this.selectedClientIndex = null;
    this.selectedSystem.clients.forEach((item, index) => {
      if (item.client == assignment.client) {
        this.selectedClientIndex = index;
      }
    });
  }

  //Find index of assignment in request detail
  setAssignmentIndex(client) {
    for (let k = 0; k < this.selectedRequestDetail.assignments.length; k++) {
      if (this.selectedRequestDetail.assignments[k].client == client) {
        this.assignmentDetailIndex = k;
        return;
      }
    }
  }

  //Find index of client in selected system
  setClientIndex(client) {
    for (let k = 0; k < this.selectedSystem.clients.length; k++) {
      if (this.selectedSystem.clients[k].client == client) {
        this.selectedClientIndex = k;
        return;
      }
    }
  }
  setClientAssignmentIndex(client) {
    for (let k = 0; k < client.assignments.length; k++) {
      if (client.assignments[k].assignment._id) {
        if (client.assignments[k].assignment._id === this.selectedRequestDetail._id) {
          this.clientSelectedIndex = k;
          return;
        }
      } else if (client.assignments[k].assignment === this.selectedRequestDetail._id) {
        this.clientSelectedIndex = k;
        return;
      }
    }
  }

  /*****************************************************************************************************
  * The user deletes an assignment 
  * index - the index of the selected assignment
  ****************************************************************************************************/
  async deleteProposedClient() {
    //Is this a saved assignment
    if (this.selectedRequestDetail.assignments[this.assignmentDetailIndex].assignedDate) {
      return this.dialog.showMessage("This will delete the assignment.  Are you sure you want to do that?", "Delete Assignment", ['Yes', 'No']).whenClosed(response => {
        if (!response.wasCancelled) {
          this.deleteSaved(this.assignmentDetailIndex);
        }
      });
    } else {
      // if (this.forceManual) this.manualMode = false;
      // this.forceManual = false;
      //Undo the changes made by the assignment
      // this.idsRemaining = parseInt(this.idsRemaining) + parseInt(this.selectedRequestDetail.assignments[this.assignmentDetailIndex].idsAssigned);
      // this.selectedSystem.clients[this.selectedClientIndex].idsAvailable = parseInt(this.selectedSystem.clients[this.selectedClientIndex].idsAvailable) + parseInt(this.selectedRequestDetail.assignments[this.assignmentDetailIndex].idsAssigned);
      // this.totalIdsAssigned = parseInt(this.totalIdsAssigned) - parseInt(this.selectedRequestDetail.assignments[this.assignmentDetailIndex].idsAssigned);

      //Delete the assignment and the client
      this.deleteProvisinoalClientAssignment();
      this.assignClientStatus();
      this.assignmentDetailIndex = -1;
      if (this.selectedRow) this.selectedRow.children().removeClass('info');
    }
  }
  deleteProvisinoalClientAssignment() {
    this.setClientIndex(this.selectedRequestDetail.assignments[this.assignmentDetailIndex].client);
    // this.productSystems[this.selectedSystemIndex].clients[this.selectedClientIndex].assignments.splice(this.clientSelectedIndex, 1);
    this.selectedSystem.clients[this.selectedClientIndex].assignments.splice(this.clientSelectedIndex, 1);
    this.selectedRequestDetail.assignments.splice(this.assignmentDetailIndex, 1);
  }
  assignClientStatus() {
    if (this.selectedSystem.clients[this.selectedClientIndex].clientStatus !== this.config.SANDBOX_CLIENT_CODE) {
      if (this.selectedSystem.clients[this.selectedClientIndex].assignments && this.selectedSystem.clients[this.selectedClientIndex].assignments.length === 0) {
        this.selectedSystem.clients[this.selectedClientIndex].clientStatus = this.config.UNASSIGNED_CLIENT_CODE;
        // this.productSystems[this.selectedSystemIndex].clients[this.selectedClientIndex].clientStatus = this.config.UNASSIGNED_CLIENT_CODE;
      } else if (this.selectedSystem.clients[this.selectedClientIndex].assignments.length === 1) {
        this.selectedSystem.clients[this.selectedClientIndex].clientStatus = this.config.ASSIGNED_CLIENT_CODE;
        // this.productSystems[this.selectedSystemIndex].clients[this.selectedClientIndex].clientStatus = this.config.ASSIGNED_CLIENT_CODE;
      } else {
        this.selectedSystem.clients[this.selectedClientIndex].clientStatus = this.config.SHARED_CLIENT_CODE;
        // this.productSystems[this.selectedSystemIndex].clients[this.selectedClientIndex].clientStatus = this.config.SHARED_CLIENT_CODE;
      }
    }
  }

  institutionCustomFilter(value, item, context) {
    return item.requestId && item.requestId.institutionId && item.requestId.institutionId.name.toUpperCase().indexOf(value.toUpperCase()) > -1;
  }
  customInstitutionsSorter(sortProperty, sortDirection, sortArray, context) {
    this.sortProperty = 'institution';
    this.sortDirection = sortDirection;
    return sortArray.sort((a, b) => {
      if (a['requestId'] !== null && b['requestId'] !== null && a['requestId']['institutionId'] && b['requestId']['institutionId']) {
        var result = a['requestId']['institutionId']['name'] < b['requestId']['institutionId']['name'] ? -1 : a['requestId']['institutionId']['name'] > b['requestId']['institutionId']['name'] ? 1 : 0;
      } else {
        var result = -1;
      }
      return result * sortDirection;
    });
  }
  customProductNameFilter(value, item, context) {
    return item.productId.name.toUpperCase().indexOf(value.toUpperCase()) > -1;
  }
  getStatus(status) {
    let statusDescription = "";
    this.config.REQUEST_STATUS.forEach(item => {
      if (item.code == status) statusDescription = item.description;
    });
    return statusDescription;
  }
  downloadAssignExcel() {
    let csvContent = "data:text/csv;charset=utf-8;,Due Date,Created Date,Status,Product,Institution\r\n";
    this.dataTable.displayArray.forEach(item => {
      csvContent += moment__WEBPACK_IMPORTED_MODULE_16___default()(item.requiredDate).format('MMM Do YYYY') + "," + moment__WEBPACK_IMPORTED_MODULE_16___default()(item.createdDate).format('MMM Do YYYY') + "," + this.getStatus(item.requestStatus) + "," + item.productId.name + "," + item.requestId.institutionId.name;
      csvContent += "\r\n";
    });
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "assignments.csv");
    document.body.appendChild(link); // Required for FF

    link.click();
  }
  async editRequest(index, request) {
    this.editIndex = index;
    this.selectedRequestDetail = this.utils.copyObject(request);
    await this.products.selectedProductFromId(this.selectedRequestDetail.productId._id);
    // await this.people.getCoursesArray(true, '?filter=personId|eq|' + this.selectedRequestDetail.requestId.personId._id);
    this.editStartDate = this.selectedRequestDetail.requestId.startDate;
    this.originalRequestDetail = this.utils.copyObject(this.selectedRequestDetail);
    this.requestSelected = 'edit';
  }
  backEdit() {
    this.requestSelected = 'table';
  }
  async saveEdit() {
    this.requests.setTheSelectedRequestDetail(this.selectedRequestDetail);
    let serverResponse = await this.requests.saveRequestDetail();
    if (!serverResponse.error) {
      this.utils.showNotification("The request was updated");
      this.dataTable.updateArrayMaintainFilters(this.requests.requestsDetailsArray);
      this.reSort();
      await this.filterInAssigned();
      this._cleanUp();
    }
  }
}) || _class);

/***/ }),

/***/ "modules/acc/viewUserRequests":
/*!*********************************************!*\
  !*** ./src/modules/acc/viewUserRequests.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ViewUserAssignments: function() { return /* binding */ ViewUserAssignments; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../resources/dialogs/common-dialogs */ 6545);
/* harmony import */ var _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../resources/utils/dataTable */ 6847);
/* harmony import */ var _resources_data_systems__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../resources/data/systems */ 4077);
/* harmony import */ var _resources_data_products__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../resources/data/products */ 8666);
/* harmony import */ var _resources_data_apjClientRequests__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../resources/data/apjClientRequests */ 3444);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
/* harmony import */ var _resources_utils_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../resources/utils/utils */ 8741);
/* harmony import */ var _resources_data_people__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../resources/data/people */ 353);
/* harmony import */ var _resources_utils_validation__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../resources/utils/validation */ 2824);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! moment */ 381);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_10__);
var _dec, _class;











let ViewUserAssignments = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_config_appConfig__WEBPACK_IMPORTED_MODULE_6__.AppConfig, _resources_utils_validation__WEBPACK_IMPORTED_MODULE_9__["default"], _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_1__.CommonDialogs, _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_2__.DataTable, _resources_utils_utils__WEBPACK_IMPORTED_MODULE_7__.Utils, _resources_data_products__WEBPACK_IMPORTED_MODULE_4__.Products, _resources_data_systems__WEBPACK_IMPORTED_MODULE_3__.Systems, _resources_data_people__WEBPACK_IMPORTED_MODULE_8__.People, _resources_data_apjClientRequests__WEBPACK_IMPORTED_MODULE_5__.APJClientRequests), _dec(_class = class ViewUserAssignments {
  constructor(config, validation, dialog, datatable, utils, products, systems, people, requests) {
    this.requestSelected = 'table';
    this.title = "ACC Product Requests";
    this.spinnerHTML = "";
    this.isCheckedAssigned = true;
    this.noRequests = true;
    this.sortProperty = '';
    this.sortDirection = void 0;
    this.config = config;
    this.validation = validation;
    this.validation.initialize(this);
    this._setUpValidation();
    this.dataTable = datatable;
    this.dataTable.initialize(this);
    this.utils = utils;
    this.products = products;
    this.clientRequests = requests;
    this.systems = systems;
    this.people = people;
    this.dialog = dialog;
    this.userObj = JSON.parse(sessionStorage.getItem('user'));
  }
  async attached() {
    $('[data-toggle="tooltip"]').tooltip();
    this.initialLoaded = true;
    await this.getRequests();
    $('#loading').hide();
    setInterval(() => {
      if (this.requestSelected == 'table') this.getRequests();
    }, this.refreshInterval * 60 * 1000);
  }
  async activate() {
    let responses = await Promise.all([this.products.getProductsArray('?filter=active|eq|true&order=name', true), this.systems.getSystemsArray('', true), this.config.getConfig(true)]);
    let uccRoles = "";
    this.config.ROLES.forEach(item => {
      if (item.UCConly) uccRoles += item.role + ":";
    });
    this.people.getUCCStaff(uccRoles);
    this.unassignedOnly = localStorage.getItem('unassignedOnly') ? localStorage.getItem('unassignedOnly') == "true" : false;
    this.facultyDetails = localStorage.getItem("facultyDetails") ? localStorage.getItem("facultyDetails") == "true" : false;
    ;
    this.initialLoaded = false;
    this.refreshInterval = this.config.CLIENT_REQUEST_REFRESH_INTERVAL;
  }
  async getRequests() {
    this.isCheckedAssigned = true;
    await this.filterInAssigned();
    this.clearFilters();
  }
  async refresh() {
    $('#loading').show();
    await this.getRequests();
    $('#loading').hide();
    this.spinnerHTML = "";
  }
  async editRequest(index, request) {
    this.editIndex = index;
    this.selectedRequestDetail = this.utils.copyObject(request);
    await this.products.selectedProductFromId(this.selectedRequestDetail.productId._id);
    this.editStartDate = this.selectedRequestDetail.requestId.startDate;
    this.originalRequestDetail = this.utils.copyObject(this.selectedRequestDetail);
    this.requestSelected = 'edit';
  }
  backEdit() {
    this.requestSelected = 'table';
  }
  async saveEdit() {
    var email = {};
    // this.buildAuditDetail();
    this.clientRequests.setTheSelectedRequestDetail(this.selectedRequestDetail);
    let serverResponse = await this.clientRequests.saveRequestDetail();
    if (!serverResponse.error) {
      this.utils.showNotification("The request was updated");
      this.dataTable.updateArrayMaintainFilters(this.clientRequests.requestsDetailsArray);
      this.reSort();
      this._cleanUp();
    }
  }

  /*****************************************************************************************************
   * Delete the assignment in the database
   ****************************************************************************************************/
  async deleteSaved(index) {
    //Update the client
    this.selectedSystem.clients[this.selectedClientIndex].idsAvailable = parseInt(this.selectedSystem.clients[this.selectedClientIndex].idsAvailable) + parseInt(this.selectedRequestDetail.assignments[this.assignmentDetailIndex].idsAssigned);
    this.idsRemaining = parseInt(this.idsRemaining) + parseInt(this.selectedRequestDetail.assignments[this.assignmentDetailIndex].idsAssigned);
    this.totalIdsAssigned = parseInt(this.totalIdsAssigned) - parseInt(this.selectedRequestDetail.assignments[this.assignmentDetailIndex].idsAssigned);

    //Construct the object to submit to the server
    this.selectedRequestDetail.idsAssigned = parseInt(this.selectedRequestDetail.idsAssigned) - parseInt(this.selectedRequestDetail.assignments[this.assignmentDetailIndex].idsAssigned);
    this.deleteProvisinoalClientAssignment();
    this.assignClientStatus();
    this.selectedRequestDetail.requestStatus = this.selectedRequestDetail.assignments && this.selectedRequestDetail.assignments.length > 0 ? this.config.ASSIGNED_REQUEST_CODE : this.config.UNASSIGNED_REQUEST_CODE;
    this.requestToSave = this.utils.copyObject(this.selectedRequestDetail.requestId);
    this.requestToSave.requestDetailsToSave = new Array();
    var request = this.utils.copyObject(this.selectedRequestDetail);
    delete request['requestId'];
    this.requestToSave.requestDetailsToSave.push(request);
    this.requestToSave.systemsToSave = [this.selectedSystem];
    this.clientRequests.setSelectedRequest(this.requestToSave);
    let serverResponse = await this.clientRequests.assignRequest(this.editIndex);
    if (!serverResponse.status) {
      this.dataTable.updateArrayMaintainFilters(this.clientRequests.requestsDetailsArray);
      this.reSort();
      await this.filterInAssigned();
      this.utils.showNotification("The assignment was deleted");
    }
    this.selectedAssignedClient = "";
  }

  /**
  * Delete the request
  */
  delete() {
    if (this.selectedRequestDetail.assignments && this.selectedRequestDetail.assignments.length > 0) {
      return this.dialog.showMessage("Please delete the assignments before deleting the request", "Delete Request", ['OK']).whenClosed(response => {
        if (!response.wasCancelled) {
          return;
        }
      });
    } else {
      return this.dialog.showMessage("Are you sure you want to delete the request?", "Delete Request", ['Yes', 'No']).whenClosed(response => {
        if (!response.wasCancelled) {
          this.deleteRequest();
        }
      });
    }
  }
  async deleteRequest() {
    this.clientRequests.setTheSelectedRequestDetail(this.selectedRequestDetail);
    let serverResponse = await this.clientRequests.deleteRequest();
    if (!serverResponse.error) {
      await this.filterInAssigned();
      this.utils.showNotification("The request was deleted");
      this.dataTable.updateArray(this.clientRequests.requestsDetailsArray);
    }
    this.requestSelected = 'table';
  }
  back() {
    this.clientRequests.setTheSelectedRequestDetail(this.selectedRequestDetail);
    let changes = this.clientRequests.isRequestDetailDirty(this.originalRequestDetail, ['requestId', 'productId', 'techComments']);
    var newAssignment = false;
    if (this.selectedRequestDetail.assignments) {
      this.selectedRequestDetail.assignments.forEach(item => {
        if (!item.assignedDate) newAssignment = true;
      });
    }
    if (this.selectedRequestDetail.assignments.length > 0 && (changes.length > 0 || newAssignment)) {
      return this.dialog.showMessage("There is an unsaved assignment. Are you sure you want to leave this page?", "Confirm Back", ['Yes', 'No']).whenClosed(response => {
        if (response.wasCancelled) {
          return;
        } else {
          this._cleanUp();
        }
      });
    }
    this._cleanUp();
  }
  async viewAssignment(index, request) {
    this.editIndex = index;
    let response = await this.clientRequests.getRequestDetail(request._id);
    if (!response.error) {
      this.selectedRequestDetail = response;
      if (this.selectedRequestDetail.requestId && this.selectedRequestDetail.requestId.courseId === null) this.selectedRequestDetail.requestId.courseId = {
        _id: this.config.SANDBOX_ID,
        name: this.config.SANDBOX_NAME
      };
      this.products.selectedProductFromId(this.selectedRequestDetail.productId._id);
      if (this.selectedRequestDetail.assignments && this.selectedRequestDetail.assignments.length > 0) this.systems.selectedSystemFromId(this.selectedRequestDetail.assignments[0].systemId);
      this.requestSelected = 'view';
    }
  }
  backView() {
    this.requestSelected = 'table';
  }
  systemSelected() {
    this.selectProductSystem(this.selectedSystemId);
    if (!this.products.selectedProduct.clientRelevant) {
      this.calcAssignment();
    }
  }
  selectProductSystem(id) {
    this.selectedSystemId = id;
    this.productSystems.forEach((item, index) => {
      if (item._id === id) {
        this.selectedSystem = item;
        this.selectedSystemIndex = index;
      }
    });
    this.checkClientConfigured();
  }
  checkClientConfigured() {
    this.clientsConfigured = false;
    for (let i = 0; i < this.selectedSystem.clients.length; i++) {
      if (this.selectedSystem.clients[i].productId === this.products.selectedProduct._id) {
        this.clientsConfigured = true;
        break;
      }
    }
  }
  showProfile(request, el) {
    this.profileRequest = request;
    $(".hoverProfile").css("top", window.pageYOffset + el.clientY - 175);
    $(".hoverProfile").css("left", el.clientX - 200);
    $(".hoverProfile").css("display", "block");
  }
  hideProfile() {
    $(".hoverProfile").css("display", "none");
  }
  showComment(request, el) {
    if (request.requestStatus == this.config.REPLIED_REQUEST_CODE) {
      this.commentShown = request.requestId.comments;
      $(".hover").css("top", el.clientY - 200);
      $(".hover").css("left", el.clientX - 10);
      $(".hover").css("display", "block");
    }
  }
  hideComment() {
    $(".hover").css("display", "none");
  }
  openFacultyDetails() {
    this.facultyDetails = !this.facultyDetails;
    localStorage.setItem("facultyDetails", this.facultyDetails);
  }
  changeUnassignedOnly() {
    localStorage.setItem('unassignedOnly', this.unassignedOnly);
  }
  _setUpValidation() {
    this.validation.addRule(1, "errorRange", [{
      "rule": "custom",
      "message": "Invalid ID range",
      "valFunction": function (context) {
        var valid = true;
        if (context.assignmentDetails) {
          for (var i = 0; i < context.assignmentDetails.length; i++) {
            if (context.assignmentDetails[i].notValid == 'danger') valid = false;
          }
        }
        return valid;
      }
    }]);
  }
  _cleanUp() {
    this.firstID = 0;
    this.lastID = 0;
    this.requestSelected = 'table';
    this.customerMessage = false;
    this.selectedRequestDetail.assignments = [];
    this.selectedSystem = {};
  }
  async clearFilters() {
    this.requiredDateFilterValue = "";
    this.createdDateFilterValue = "";
    this.requestStatusFilter = "";
    this.productFilterValue = "";
    this.courseFilterValue = "";
    this.helpTicketTypeFilterValue = "";
    this.institutionFilterValue = "";
    this.dataTable.updateArray(this.clientRequests.requestsDetailsArray);
    // await this.filterInAssigned();
  }

  async filterInAssigned() {
    this.requiredDateFilterValue = "";
    this.createdDateFilterValue = "";
    this.requestStatusFilter = "";
    this.productFilterValue = "";
    this.courseFilterValue = "";
    this.helpTicketTypeFilterValue = "";
    this.institutionFilterValue = "";
    if (this.isCheckedAssigned) {
      $('#loading').show();
      await this.clientRequests.getClientRequestsDetailsArray('?filter=[in]requestStatus[list]' + this.config.UNASSIGNED_REQUEST_CODE + ':' + this.config.UPDATED_REQUEST_CODE + ':' + this.config.CUSTOMER_ACTION_REQUEST_CODE, true);
      $('#loading').hide();
      if (this.clientRequests.requestsDetailsArray && this.clientRequests.requestsDetailsArray.length) {
        this.noRequests = false;
        this.dataTable.updateArray(this.clientRequests.requestsDetailsArray, 'requiredDate', -1);
      } else {
        this.noRequests = true;
        this.dataTable.displayArray = new Array();
      }
    } else {
      $('#loading').show();
      await this.clientRequests.getClientRequestsDetailsArray('', true);
      $('#loading').hide();
      this.dataTable.updateArray(this.clientRequests.requestsDetailsArray, 'requiredDate', -1);
      if (this.clientRequests.requestsDetailsArray.length) this.noRequests = false;
    }

    // this.requiredDateFilterValue = "";
    // this.createdDateFilterValue = "";
    // this.requestStatusFilter = "";
    // this.productFilterValue = "";
    // this.courseFilterValue = "";
    // this.helpTicketTypeFilterValue = "";
    // this.institutionFilterValue = "";
    // if (this.isCheckedAssigned) {
    //     $('#loading').show();
    //     await this.clientRequests.getClientRequestsDetailsArray('?filter=requestStatus|in|' + this.config.UNASSIGNED_REQUEST_CODE + '$' + this.config.UPDATED_REQUEST_CODE + '$' + this.config.CUSTOMER_ACTION_REQUEST_CODE, true);
    //     $('#loading').hide();
    //     if (this.clientRequests.requestsDetailsArray && this.clientRequests.requestsDetailsArray.length) {
    //         this.noRequests = false;
    //         this.dataTable.updateArray(this.clientRequests.requestsDetailsArray, 'requiredDate', -1);
    //     } else {
    //         this.noRequests = true;
    //         this.displayArray = new Array();
    //     }

    // } else {
    //     $('#loading').show();
    //     await this.clientRequests.getClientRequestsDetailsArray('', true);
    //     $('#loading').hide();
    //     this.dataTable.updateArray(this.clientRequests.requestsDetailsArray, 'requiredDate', -1);
    //     if(this.clientRequests.requestsDetailsArray.length) this.noRequests = false;
    // }
  }

  customNameFilter(value, item, context) {
    return item.requestId && item.requestId.personId.fullName.toUpperCase().indexOf(value.toUpperCase()) > -1;
  }
  statusCustomFilter(value, item, context) {
    if (item.requestStatus == context.config.ASSIGNED_REQUEST_CODE || item.requestStatus == context.config.CANCELLED_REQUEST_CODE) return false;
    return true;
  }
  institutionCustomFilter(value, item, context) {
    return item.requestId && item.requestId.institutionId && item.requestId.institutionId.name.toUpperCase().indexOf(value.toUpperCase()) > -1;
  }
  courseCustomFilter(value, item, context) {
    return item.requestId && item.requestId.courseId.name.toUpperCase().indexOf(value.toUpperCase()) > -1;
  }
  customProductNameFilter(value, item, context) {
    return item.productId.name.toUpperCase().indexOf(value.toUpperCase()) > -1;
  }
  customCourseSorter(sortProperty, sortDirection, sortArray, context) {
    this.sortProperty = 'course';
    this.sortDirection = sortDirection;
    return sortArray.sort((a, b) => {
      if (a['requestId'] !== null && b['requestId'] !== null && a['requestId']['courseId']['name'] && b['requestId']['courseId']['name']) {
        var result = a['requestId']['courseId']['name'] < b['requestId']['courseId']['name'] ? -1 : a['requestId']['courseId']['name'] > b['requestId']['courseId']['name'] ? 1 : 0;
      } else {
        var result = -1;
      }
      return result * sortDirection;
    });
  }
  customInstitutionsSorter(sortProperty, sortDirection, sortArray, context) {
    this.sortProperty = 'institution';
    this.sortDirection = sortDirection;
    return sortArray.sort((a, b) => {
      if (a['requestId'] !== null && b['requestId'] !== null && a['requestId']['institutionId'] && b['requestId']['institutionId']) {
        var result = a['requestId']['institutionId']['name'] < b['requestId']['institutionId']['name'] ? -1 : a['requestId']['institutionId']['name'] > b['requestId']['institutionId']['name'] ? 1 : 0;
      } else {
        var result = -1;
      }
      return result * sortDirection;
    });
  }
  customPersonSorter(sortProperty, sortDirection, sortArray, context) {
    this.sortProperty = 'person';
    this.sortDirection = sortDirection;
    return sortArray.sort((a, b) => {
      if (a['requestId'] !== null && b['requestId'] !== null && a['requestId']['personId']['lastName'] && b['requestId']['personId']['lastName']) {
        var result = a['requestId']['personId']['lastName'] < b['requestId']['personId']['lastName'] ? -1 : a['requestId']['personId']['lastName'] > b['requestId']['personId']['lastName'] ? 1 : 0;
      } else {
        var result = -1;
      }
      return result * sortDirection;
    });
  }
  customRequestStatusSorter(sortProperty, sortDirection, sortArray, context) {
    this.sortProperty = 'status';
    this.sortDirection = sortDirection;
    return sortArray.sort((a, b) => {
      var result = a[sortProperty] < b[sortProperty] ? -1 : a[sortProperty] > b[sortProperty] ? 1 : 0;
      return result * sortDirection;
    });
  }
  reSort() {
    this.dataTable.sortArray({}, {}, true);
  }
}) || _class);

/***/ }),

/***/ "modules/acc/accCreateRequest.html":
/*!***********************************************!*\
  !*** ./src/modules/acc/accCreateRequest.html ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n  <span id=\"loading\">\r\n    <ul class=\"bokeh\">\r\n      <li></li>\r\n      <li></li>\r\n      <li></li>\r\n    </ul>\r\n  </span>\r\n\r\n  <div class=\"fluid-container\">\r\n    <div class=\"panel panel-default\" style=\"margin-top:50px;padding:5px;\">\r\n      <div class=\"panel-body\">\r\n        <div class=\"row\">\r\n          <div class=\"bottomMargin list-group-item  toolbar\">\r\n            <span click.delegate=\"saveIt()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n              data-placement=\"bottom\" title=\"\" data-original-title=\"Save\"><i class=\"fa fa-floppy-o fa-lg fa-border\"\r\n                aria-hidden=\"true\"></i></span>\r\n          </div>\r\n        </div> \r\n        <div class=\"row\">\r\n          <div class=\"col-lg-4\">\r\n\r\n            <div class=\"topMargin\">\r\n              <div>\r\n                <input input.delegate=\"filterInstiutionList()\" value.bind=\"filterValue\" id=\"filterValue\"\r\n                  class=\"form-control \" placeholder=\"Filter institution\" type=\"text\" />\r\n              </div>\r\n              <div class=\"smallTopMargin\">\r\n                <select id=\"institution\" value.bind=\"selectedInstitution\" change.delegate=\"changeInstitution($event)\"\r\n                  class=\"form-control\">\r\n                  <option value=\"\">Choose the Institution</option>\r\n                  <option repeat.for=\"item of insitutionsArray\" value=\"${item._id}\">${item.name}\r\n                  </option>\r\n                </select>\r\n              </div>\r\n            </div>\r\n\r\n            <span show.bind=\"institutionSelected && selectedPackage\">\r\n              <h5>Package: <strong>${selectedPackage.name}</strong> Max Clients:\r\n                <strong>${selectedPackage.maxClients}</strong> Active Clients:\r\n                <strong>${requests.selectedRequest.requestDetails.length}</strong>\r\n              </h5>\r\n            </span>\r\n            <span show.bind=\"institutionSelected && !selectedPackage\">\r\n              <h5>Currently there is no package assigned to the institution.</h5>\r\n            </span>\r\n\r\n            <div show.bind=\"institutionSelected && requests.apjInstitutionRequestArray.length\" id=\"existingRequestInfo\">\r\n\r\n            </div>\r\n            <div show.bind=\"institutionSelected && !requests.apjInstitutionRequestArray.length\"\r\n              id=\"existingRequestInfo\">\r\n              <h3>This institution has no active requests</h3>\r\n            </div>\r\n\r\n            <compose view=\"./components/Requests.html\"></compose>\r\n\r\n            <div show.bind=\"institutionSelected\" class=\"form-group col-md-12\">\r\n              <editor value.bind=\"requests.selectedRequest.comments\" height=\"250\"></editor>\r\n            </div>\r\n\r\n          </div>\r\n          <div show.bind=\"institutionSelected\" class=\"col-lg-8\">\r\n            <div class=\"row\">\r\n              <div class=\"col-md-5 topMargin\">\r\n                <label id=\"productList\">Available Products</label>\r\n                <div class=\"well well2 overFlow\" style=\"height:400px;\">\r\n                  <input class=\"form-control\" value.bind=\"filter\" input.trigger=\"filterList()\"\r\n                    placeholder=\"Filter products\" />\r\n                  <ul class=\"list-group\">\r\n                    <li click.trigger=\"selectProduct(product)\" repeat.for=\"product of filteredProductsArray\"\r\n                      id=\"${product._id}\" class=\"list-group-item dropbtn\">\r\n                      <h4>${product.name}</h4>\r\n                    </li>\r\n                  </ul>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-md-5 col-md-offset-1 topMargin\">\r\n                <label id=\"requestProductsLabel\">Requested Products</label>\r\n                <div class=\" overflow well well2\" style=\"height:400px;overflow-y: scroll;\">\r\n                  <ul class=\"list-group\">\r\n                    <li click.trigger=\"removeProduct($index)\"\r\n                      repeat.for=\"product of requestDetails\" id=\"${product.productId}\"\r\n                      class=\"${product.assignments.length ? 'assignedColor list-group-item dropbtn' : 'list-group-item dropbtn'}\">\r\n                      <!-- <div class=\"row\">\r\n                      <div class=\"col-sm-12\"> -->\r\n                        <h4>${product.productId | lookupValue:products.productsArray:\"_id\":\"name\"}\r\n                        </h4>\r\n                      <!-- </div>\r\n                    </div> -->\r\n                    </li>\r\n                  </ul>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"col\"><span id=\"numberOfStudentsError\"></span></div>\r\n              <div class=\"col\"><span id=\"dateError\"></span></div>\r\n              <div class=\"col\"><span id=\"requiredDateError\"></span></div>\r\n            </div>\r\n            <div class=\"row\" id=\"productListTable\">\r\n              <div show.bind=\"requests.selectedRequest.requestDetails.length > 0\">\r\n                <table class=\"table table-striped table-bordered col-md-10 topMargin\">\r\n                  <thead>\r\n                    <tr>\r\n                      <th>Requested Product</th>\r\n                      <!-- <th>Price</th> -->\r\n                      <th>Number of Students</th>\r\n                      <th>Date Required</th>\r\n                    </tr>\r\n                  <tbody id=\"requiredProductsTable\">\r\n                    <tr repeat.for=\"request of requestDetails\"\r\n                      class=\"${request.assignments.length ? 'success sortable' : 'sortable'}\">\r\n                      <td>${request.productId | lookupValue:products.productsArray:\"_id\":\"name\"}\r\n                      </td>\r\n                      <!-- <td>\r\n                        <input readonly.bind=\"!request.invoiceRelevant\" type=\"number\" class=\"form-control\"\r\n                          value.bind=\"request.price\">\r\n                        ${request.invoiceRelevant}\r\n                      </td> -->\r\n                      <td>\r\n                        <input type=\"number\" class=\"form-control\" value.bind=\"request.numberOfStudents\">\r\n                      </td>\r\n                      <td>\r\n                        <div class=\"form-group  col-md-8\">\r\n                          <flat-picker controlid=\"requiredDate-${$index}\" config.bind=\"configDate\"\r\n                            value.bind=\"request.requiredDate\">\r\n                          </flat-picker>\r\n                        </div>\r\n                      </td>\r\n                    </tr>\r\n                  </tbody>\r\n                </table>\r\n              </div>\r\n            </div>\r\n            <div class=\"row\">\r\n\r\n              <div class=\"topMargin\" show.bind=\"sandBoxClient || personSelected\">\r\n                <editor value.bind=\"requests.selectedRequest.comments\" height=\"250\"></editor>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>\r\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/acc/accInstitute.html":
/*!*******************************************!*\
  !*** ./src/modules/acc/accInstitute.html ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n        <span id=\"loading\">\r\n            <ul class=\"bokeh\">\r\n                <li></li>\r\n                <li></li>\r\n                <li></li>\r\n            </ul>\r\n        </span>\r\n        <div show.bind=\"dataTable.displayArray && dataTable.displayArray.length || initialLoaded\">\r\n            <div show.bind=\"!institutionSelected\" class=\"col-lg-12\">\r\n                <compose view=\"./components/institutionsTable.html\"></compose>\r\n            </div> <!-- Table Div -->\r\n            <div show.bind=\"institutionSelected\" class=\"col-lg-12\">\r\n                <compose view=\"./components/institutionsForm.html\"></compose>\r\n            </div> <!-- Form Div -->\r\n        </div> <!-- Panel Body -->\r\n    </template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/acc/accInstitutions.html":
/*!**********************************************!*\
  !*** ./src/modules/acc/accInstitutions.html ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <compose view='../../resources/elements/submenu.html'></compose>\r\n    <div class=\"col-lg-12\">\r\n        <router-view></router-view>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/acc/accRequests.html":
/*!******************************************!*\
  !*** ./src/modules/acc/accRequests.html ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <compose view='../../resources/elements/submenu.html'></compose>   \r\n    <div class=\"col-lg-12\">\r\n        <router-view></router-view>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/acc/apjAssignments.html":
/*!*********************************************!*\
  !*** ./src/modules/acc/apjAssignments.html ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div show.bind=\"requestSelected == 'table'\">\r\n        <compose view=\"./components/assignRequestTable.html\"></compose>\r\n    </div>\r\n    <div show.bind=\"requestSelected == 'form'\">\r\n        <compose view=\"./components/requestForm.html\"></compose>\r\n    </div>\r\n    <div show.bind=\"requestSelected == 'view'\">\r\n        <compose view=\"./components/viewAssignmentForm.html\"></compose>\r\n    </div>\r\n    <div show.bind=\"requestSelected == 'edit'\">\r\n        <compose view=\"./components/editRequestsForm.html\"></compose>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/acc/components/Requests.html":
/*!**************************************************!*\
  !*** ./src/modules/acc/components/Requests.html ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n      <div class=\"topMargin\">\r\n        <span id=\"selectProductRequestError\"></span>\r\n        <table id=\"clientTable\" show.bind=\"requests.selectedRequest.requestDetails.length\" class=\"table table-bordered table-responsive\" style=\"background:white;\">\r\n          <thead>\r\n          <tr class=\"header\">\r\n            <th>Product</th>\r\n            <th>System</th>\r\n            <th>Client</th>\r\n            <th>Status</th>\r\n          </tr>\r\n          </thead>\r\n          <tbody>\r\n            <tr class=\"${product.assignments.length ? 'success sortable' : 'sortable'}\" id=\"${product.id}\" productId=\"${product.productId}\" \r\n                repeat.for=\"product of requestDetails\">\r\n              <td>${product.productId  | lookupValue:products.productsArray:\"_id\":\"name\"}</td> \r\n              <td>${product.assignments[0].systemId | lookupValue:systems.systemsArray:\"_id\":\"sid\"}</td>\r\n              <td>${product.assignments[0].client}</td>\r\n              <td>${product.requestStatus | lookupValue:config.REQUEST_STATUS:\"code\":\"description\"}</td>\r\n            </tr>\r\n          </tbody>\r\n        </table>\r\n        <span id=\"client\"></span>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>\r\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/acc/components/assignRequestTable.html":
/*!************************************************************!*\
  !*** ./src/modules/acc/components/assignRequestTable.html ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n  <div class=\"container\">\r\n    <div class=\"row\">\r\n      <!-- Session Select -->\r\n      <div class=\"col-lg-4\">\r\n        <div class=\"checkbox leftMargin\">\r\n          <label>\r\n            <input checked.bind=\"isCheckedAssigned\" change.trigger=\"filterInAssigned()\" type=\"checkbox\"> Filter out\r\n            Assigned Requests\r\n          </label>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div id=\"no-more-tables\">\r\n      <table id=\"requestsTable\" class=\"table table-striped table-hover\">\r\n        <thead>\r\n          <tr>\r\n            <td colspan='10'>\r\n              <compose view=\"../../../resources/elements/table-navigation-bar.html\"></compose>\r\n            </td>\r\n          </tr>\r\n          <tr>\r\n            <td colspan='10'>\r\n              <span click.delegate=\"refresh()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n                data-placement=\"bottom\" title=\"\" data-original-title=\"Refresh\">\r\n                <i class=\"fa fa-refresh\" aria-hidden=\"true\"></i>\r\n              </span>\r\n              <span click.delegate=\"clearFilters()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n                data-placement=\"bottom\" title=\"\" data-original-title=\"Clear Filters\">\r\n                <i class=\"fa fa-filter\" aria-hidden=\"true\"></i>\r\n              </span>\r\n              <span click.delegate=\"downloadAssignExcel()\"\r\n                class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n                data-original-title=\"Export to Excel\"><i class=\"fa fa-download\" aria-hidden=\"true\"></i></span>\r\n            </td>\r\n            <td></td>\r\n            <td></td>\r\n          </tr>\r\n          <tr>\r\n            <th class=\"col-lg-1\">\r\n              <span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'requiredDate'})\">Due\r\n              </span>\r\n              <span>\r\n                <i class=\"fa fa-sort\"></i>\r\n              </span>\r\n            </th>\r\n            <th class=\"col-lg-1\" class=\"hidden-sm\">\r\n              <span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'createdDate'})\">Created\r\n              </span>\r\n              <span>\r\n                <i class=\"fa fa-sort\"></i>\r\n              </span>\r\n            </th>\r\n            <th># of Students</th>\r\n            <th class=\"col-lg-1\">\r\n              <span class=\"sortable\"\r\n                click.trigger=\"dataTable.sortArray($event, {type: 'custom', sorter: customRequestStatusSorter, propertyName: 'requestStatus'})\">Status\r\n              </span>\r\n              <i class=\"fa fa-sort\"></i>\r\n            </th>\r\n\r\n            <th class=\"col-lg-2\">\r\n              <span class=\"sortable\"\r\n                click.trigger=\"dataTable.sortArray($event, {propertyName: 'productId.name'})\">Product </span>\r\n              <span>\r\n                <i class=\"fa fa-sort\"></i>\r\n              </span>\r\n            </th>\r\n\r\n            <th class=\"col-lg-1\">\r\n              <span class=\"sortable\"\r\n                click.trigger=\"dataTable.sortArray($event, {type: 'custom', sorter: customInstitutionsSorter, propertyName: 'requestId.institutionId'})\">Institution\r\n              </span>\r\n              <i class=\"fa fa-sort\"></i>\r\n            </th>\r\n            <th show.bind=\"!isCheckedAssigned\">Assignments</th>\r\n            <th></th>\r\n            <th></th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr class=\"hidden-sm hidden-xs\">\r\n            <th>\r\n              <input type=\"date\" value.bind=\"requiredDateFilterValue\"\r\n                input.delegate=\"dataTable.filterList(requiredDateFilterValue, {type: 'date', filter: 'requiredDate',  collectionProperty: 'requiredDate', compare: 'after'} )\"\r\n                class=\"form-control\" />\r\n            </th>\r\n            <th>\r\n              <input type=\"date\" value.bind=\"createdDateFilterValue\"\r\n                input.delegate=\"dataTable.filterList(createdDateFilterValue, {type: 'date', filter: 'createdDate',  collectionProperty: 'createdDate', compare: 'after'} )\"\r\n                class=\"form-control hidden-sm\" />\r\n            </th>\r\n            <th></th>\r\n            <th>\r\n              <select value.bind=\"requestStatusFilter\"\r\n                input.delegate=\"dataTable.filterList($event, { type: 'value',  filter: 'requestStatusFilter',  collectionProperty: 'requestStatus', displayProperty: 'requestStatus',  compare:'match'} )\"\r\n                class=\"form-control\">\r\n                <option value=\"\"></option>\r\n                <option repeat.for=\"status of config.REQUEST_STATUS\" value=\"${status.code}\">${status.description}\r\n                </option>\r\n              </select>\r\n            </th>\r\n\r\n            <th>\r\n              <input value.bind=\"productFilterValue\"\r\n                input.delegate=\"dataTable.filterList(productFilterValue, { type: 'custom',  filter: customProductNameFilter,  compare:'custom'} )\"\r\n                class=\"form-control\" />\r\n            </th>\r\n\r\n            <th>\r\n              <input value.bind=\"institutionFilterValue\"\r\n                input.delegate=\"dataTable.filterList(institutionFilterValue, { type: 'custom',  filter: institutionCustomFilter, compare:'custom'} )\"\r\n                class=\"form-control\" />\r\n            </th>\r\n            <th show.bind=\"!isCheckedAssigned\"></th>\r\n            <th></th>\r\n            <th></th>\r\n          </tr>\r\n          <tr repeat.for=\"request of dataTable.displayArray\"\r\n            class=\"${request.requestStatus | getArrayValue:config.REQUEST_STATUS:'status':-1}\">\r\n            <td click.delegate=\"selectARequest($index, request)\" data-title=\"requiredDate\">${request.requiredDate |\r\n              dateFormat:config.DATE_FORMAT_TABLE}</td>\r\n            <td click.delegate=\"selectARequest($index, request)\" class=\"hidden-sm\" data-title=\"dateCreated\">\r\n              ${request.createdDate | dateFormat:config.DATE_FORMAT_TABLE}</td>\r\n            <td click.delegate=\"selectARequest($index, request)\" data-title=\"Students\">${request.numberOfStudents}</td>\r\n            <td click.delegate=\"selectARequest($index, request)\" data-title=\"status\">${request.requestStatus |\r\n              lookupValue:config.REQUEST_STATUS:\"code\":\"description\"}</td>\r\n\r\n            <td click.delegate=\"selectARequest($index, request)\" data-title=\"product\">${request.productId.name}</td>\r\n\r\n            <td click.delegate=\"selectARequest($index, request)\" data-title=\"Name\">\r\n              ${request.requestId.institutionId.name}</td>\r\n            <td show.bind=\"!isCheckedAssigned\"\r\n              innerhtml.bind=\"request.assignments | parseAssignments:systems.systemsArray\"></td>\r\n            <td>\r\n              <span class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n                data-original-title=\"Edit\">\r\n                <i class=\"fa fa-pencil fa-lg fa-border\" click.delegate=\"editRequest($index, request)\"\r\n                  aria-hidden=\"true\"></i>\r\n              </span>\r\n            </td>\r\n            <td>\r\n              <span class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n                data-original-title=\"View Assignment\">\r\n                <i class=\"fa fa-eye fa-lg fa-border\" click.delegate=\"viewAssignment($index, request)\"\r\n                  aria-hidden=\"true\"></i>\r\n              </span>\r\n            </td>\r\n          </tr>\r\n          <tr if.bind=\"dataTable.displayArray.length > 20\">\r\n            <td colspan='10'>\r\n              <compose view=\"../../../resources/elements/table-navigation-bar.html\"></compose>\r\n            </td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n  </div>\r\n  </div>\r\n\r\n\r\n</template>\r\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/acc/components/assignmentDetails.html":
/*!***********************************************************!*\
  !*** ./src/modules/acc/components/assignmentDetails.html ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div show.bind=\"selectedRequestDetail.assignments.length > 0\">\r\n      <h4 class=\"topMargin\"><strong>Assignments</strong></h4>\r\n      <div show.bind=\"selectedRequestDetail.requestStatus == config.ASSIGNED_REQUEST_CODE\" class=\"panel panel-primary topMargin\">\r\n        <div class=\"panel-body\">  \r\n          <ul style=\"padding-left:10px;\">\r\n\t\t\t\t\t\t<li class=\"list-group-item\" repeat.for=\"assign of selectedRequestDetail.assignments\">\r\n             <compose if.bind=\"systems.selectedSystem.type === 'ERP' || !systems.selectedSystem.type\" view=\"./erp.html\"></compose>\r\n             <compose if.bind=\"systems.selectedSystem.type === 'HANA'\" view=\"./hana.html\"></compose>\r\n              <compose if.bind=\"systems.selectedSystem.type === 'BO'\" view=\"./bo.html\"></compose>\r\n\t\t\t\t\t\t</li>\r\n          </ul>\r\n\r\n          <label show.bind=\"products.selectedProduct.documents && products.selectedProduct.documents.length > 0\" class=\"topMargin\">Helpful Documents</label>\r\n          <div class=\"list-group\">\r\n            <a repeat.for=\"document of products.selectedProduct.documents\" href=\"${config.DOCUMENT_FILE_DOWNLOAD_URL}/${document.categoryCode}/${document.categoryName}/${document.fileName}\"  target=\"_blank\">${document.fileName}</a>\r\n          </div>\r\n          <label show.bind=\"selectedRequestDetail.techComments && selectedRequestDetail.techComments.length > 0\" class=\"topMargin\">Assignment Comments</label>\r\n          <div show.bind=\"selectedRequestDetail.techComments && selectedRequestDetail.techComments.length > 0\" class=\"col-lg-12 topMargin well overFlow\" innerhtml.bind=\"selectedRequestDetail.techComments\"></div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>\r\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/acc/components/bo.html":
/*!********************************************!*\
  !*** ./src/modules/acc/components/bo.html ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t\t <div class=\"row leftMargin\">\r\n\t\t\t<h4>URL</h4>\r\n\t\t\t<h5 class=\"leftMargin\"><a href=\"${systems.selectedSystem.its}\" target=\"_blank\">${systems.selectedSystem.its}</a></h5>\r\n\r\n\t\t\t<h4 class=\"topMargin\">Users</h4>\r\n\t\t\t<h5 class=\"leftMargin\">Student IDs: <span class=\"bold\"> ${assign.studentUserIds}</span></h5>\r\n\t\t\t<h5 class=\"leftMargin\">Student Password: <span class=\"bold\"> ${assign.studentPassword}</span></h5>\r\n\t\t\t<span show.bind=\"requests.selectedRequest.courseId !== null\">\r\n\t\t\t\t<h5 class=\"leftMargin\" class=\"topMargin\">Faculty IDs <span class=\"bold\">: ${selectedRequestDetail.assignments[selectedAssignmentIndex].facultyUserIds}</span></h5>\r\n\t\t\t\t<h5 class=\"leftMargin\">Faculty Password: <span class=\"bold\"> ${selectedRequestDetail.assignments[selectedAssignmentIndex].facultyPassword}</span></h5>\r\n\t\t\t</span>\r\n\t\t</div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/acc/components/editRequestsForm.html":
/*!**********************************************************!*\
  !*** ./src/modules/acc/components/editRequestsForm.html ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t<div class=\"panel panel-default rightMargin leftMargin\" style=\"margin-top:50px;\">\r\n\t\t<div class=\"panel-body\">\r\n\t\t\t<div class=\"row\">\r\n\t\t\t\t<div class=\"fluid-container\">\r\n\t\t\t\t\t<div class=\"list-group-item toolbar\">\r\n\t\t\t\t\t\t<span click.delegate=\"backEdit()\" class=\"smallMarginRight\" bootstrap-tooltip\r\n\t\t\t\t\t\t\tdata-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Back\"><i\r\n\t\t\t\t\t\t\t\tclass=\"fa fa-arrow-left fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n\t\t\t\t\t\t<span click.delegate=\"saveEdit()\" class=\"smallMarginRight\" bootstrap-tooltip\r\n\t\t\t\t\t\t\tdata-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Save\"><i\r\n\t\t\t\t\t\t\t\tclass=\"fa fa-floppy-o fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t<div class=\"col-lg-10 col-lg-offset-1\">\r\n\t\t\t\t\t\t<h4>Request No. ${selectedRequestDetail.requestNo}</h4>\r\n\t\t\t\t\t\t<h5 class=\"dropbtn\" click.delegate=\"showProfile(selectedRequestDetail, $event)\">Faculty:\r\n\t\t\t\t\t\t\t${selectedRequestDetail.requestId.personId.fullName} <i class=\"fa fa-info\"\r\n\t\t\t\t\t\t\t\taria-hidden=\"true\"></i></h5>\r\n\t\t\t\t\t\t<h5>Institution: ${selectedRequestDetail.requestId.institutionId.name}</h5>\r\n\r\n\t\t\t\t\t\t<div class=\"col-lg-5\">\r\n\t\t\t\t\t\t\t<div class=\"topMargin\">\r\n\t\t\t\t\t\t\t\t<label class=\"form-control-label \">Status</label>\r\n\t\t\t\t\t\t\t\t<select class=\"form-control\" value.bind=\"selectedRequestDetail.requestStatus\">\r\n\t\t\t\t\t\t\t\t\t<option repeat.for=\"status of config.REQUEST_STATUS\" value=\"${status.code}\">\r\n\t\t\t\t\t\t\t\t\t\t${status.description}</option>\r\n\t\t\t\t\t\t\t\t</select>\r\n\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t<div class=\"topMargin\">\r\n\t\t\t\t\t\t\t\t<label class=\"form-control-label \">Product</label>\r\n\t\t\t\t\t\t\t\t<select class=\"form-control\" value.bind=\"selectedRequestDetail.productId._id\">\r\n\t\t\t\t\t\t\t\t\t<option repeat.for=\"product of products.productsArray\" value=\"${product._id}\">\r\n\t\t\t\t\t\t\t\t\t\t${product.name}</option>\r\n\t\t\t\t\t\t\t\t</select>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t<div class=\"col-lg-5\">\r\n\t\t\t\t\t\t\t<div class=\"topMargin\">\r\n\t\t\t\t\t\t\t\t<label class=\"form-control-label \">Required Date</label>\r\n\t\t\t\t\t\t\t\t<flat-picker controlid=\"requiredDate\" config.bind=\"dateConfig\"\r\n\t\t\t\t\t\t\t\t\tvalue.bind=\"selectedRequestDetail.requiredDate\" startdate.bind=\"minEndDate\"\r\n\t\t\t\t\t\t\t\t\tenddate.bind=\"maxEndDate\"></flat-picker>\r\n\t\t\t\t\t\t\t\t<span id='requiredDateError'></span>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"col-lg-12 topMargin\" innerhtml.bind=\"selectedRequestDetail.requestId.comments\">\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/acc/components/erp.html":
/*!*********************************************!*\
  !*** ./src/modules/acc/components/erp.html ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n  <div class=\"row\" style=\"word-wrap: break-word;\">\r\n      <span class=\"col-lg-4\">\r\n        <h5 class=\"leftMargin\">System: <span class=\"bold\">${assign.systemId | lookupValue:systems.systemsArray:\"_id\":\"sid\"}</span></h5>\r\n        <h5 class=\"leftMargin\">Client: <span class=\"bold\"> ${assign.client} </span></h5>\r\n        <h5 class=\"leftMargin\">Server: <span class=\"bold\"> ${assign.systemId | lookupValue:systems.systemsArray:\"_id\":\"server\"} </span></h5>\r\n        <h5 class=\"leftMargin\">System Number: <span class=\"bold\"> ${assign.systemId | lookupValue:systems.systemsArray:\"_id\":\"instance\"} </span></h5>\r\n      </span>\r\n      <span class=\"col-lg-6\">\r\n        <h5>Student IDs: <span class=\"bold\"> ${assign.studentUserIds ? assign.studentUserIds : 'N/A'}</span></h5>\r\n        <h5>Student Password: <span class=\"bold\"> ${assign.studentPassword ? assign.studentPassword : 'N/A'}</span></h5>\r\n        <span>\r\n          <h5 class=\"topMargin\">Faculty IDs <span class=\"bold\">: ${assign.facultyUserIds ? assign.facultyUserIds : 'N/A'}</span></h5>\r\n          <h5>Faculty Password: <span class=\"bold\"> ${assign.facultyPassword ? assign.facultyPassword : 'N/A'}</span></h5>\r\n        </span>\r\n      </span>\r\n      <span class=\"col-lg-12\">\r\n          <h5 show.bind=\"systems.selectedSystem.its && systems.selectedSystem.its.length > 0\" class=\"leftMargin bigTopMargin\">ITS:</h5>\r\n          <h5 show.bind=\"systems.selectedSystem.its && systems.selectedSystem.its.length > 0\"><span class=\"bold\"> <a href=\"${systems.selectedSystem.its}\" target=\"_blank\">${systems.selectedSystem.its}</a> </span></h5>                       \r\n      </span>\r\n  </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/acc/components/hana.html":
/*!**********************************************!*\
  !*** ./src/modules/acc/components/hana.html ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t\t <div class=\"row leftMargin\">\r\n\t\t\t<h4>SAP HANA Launchpad URL</h4>\r\n\t\t\t<h5 class=\"leftMargin\"><a href=\"${systems.selectedSystem.its}\" target=\"_blank\">${systems.selectedSystem.its}</a></h5>\r\n\r\n\t\t\t<h4 class=\"topMargin\">Users</h4>\r\n\t\t\t<h5 class=\"leftMargin\">Student IDs: <span class=\"bold\"> ${assign.studentUserIds}</span></h5>\r\n\t\t\t<h5 class=\"leftMargin\">Student Password: <span class=\"bold\"> ${assign.studentPassword}</span></h5>\r\n\t\t\t<span show.bind=\"requests.selectedRequest.courseId !== null\">\r\n\t\t\t\t<h5 class=\"leftMargin\" class=\"topMargin\">Faculty IDs <span class=\"bold\">: ${assign.facultyUserIds}</span></h5>\r\n\t\t\t\t\t<!-- ${selectedRequestDetail.assignments[selectedAssignmentIndex].facultyUserIds} -->\r\n\t\t\t\t<h5 class=\"leftMargin\">Faculty Password: <span class=\"bold\"> ${assign.facultyPassword}</span></h5>\r\n\t\t\t</span>\r\n\r\n\t\t\t<h4 class=\"topMargin\">Lumira / Predictive Analytics Connection</h4>\r\n\t\t\t<h5 class=\"leftMargin\">System: <span class=\"bold\">${assign.systemId | lookupValue:systems.systemsArray:\"_id\":\"sid\"}</span></h5>\r\n\t\t\t<h5 class=\"leftMargin\">Server: <span class=\"bold\"> ${systems.selectedSystem.server} </span></h5>\r\n\t\t\t<h5 class=\"leftMargin\">Port: <span class=\"bold\"> ${systems.selectedSystem.port} </span></h5>\r\n\t\t\t<h5 class=\"leftMargin\">System Number: <span class=\"bold\"> ${systems.selectedSystem.instance} </span></h5> \r\n\t\t</div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/acc/components/instAddress.html":
/*!*****************************************************!*\
  !*** ./src/modules/acc/components/instAddress.html ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div class=\"row topMargin\">\r\n        <!-- Row 5 -->\r\n        <div class=\"col-lg-6 topMargin\">\r\n            <div class=\"col-sm-12 col-lg-12\">\r\n                <div class=\"form-group\">\r\n                    <div class=\"col-sm-10\">\r\n                        <label>Address 1</label>\r\n                        <input value.bind=\"people.selectedInstitution.address1\" id=\"editAddress1\" class=\"form-control\"\r\n                            placeholder=\"Address 1\" type=\"text\" />\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"col-sm-12 col-lg-12\">\r\n                <div class=\"form-group\">\r\n                    <div class=\"col-sm-10\">\r\n                        <label>Address 2</label>\r\n                        <input value.bind=\"people.selectedInstitution.address2\" id=\"editAddress1\" class=\"form-control\"\r\n                            placeholder=\"Address 2\" type=\"text\" />\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"col-sm-12 col-lg-12\">\r\n                <div class=\"form-group\">\r\n                    <div class=\"col-sm-10\">\r\n                        <label>City</label>\r\n                        <input value.bind=\"people.selectedInstitution.city\" id=\"editCity\" class=\"form-control\"\r\n                            placeholder=\"City\" type=\"text\" />\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"col-sm-12 col-lg-12\">\r\n                <div class=\"form-group\">\r\n                    <div class=\"col-sm-10\">\r\n                        <label>Region</label>\r\n                        <input value.bind=\"people.selectedInstitution.region\" id=\"editRegion\" class=\"form-control\"\r\n                            placeholder=\"Region\" type=\"text\" />\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"col-sm-12 col-lg-12\">\r\n                <div class=\"form-group\">\r\n                    <div class=\"col-sm-10\">\r\n                        <label>Postal Code</label>\r\n                        <input value.bind=\"people.selectedInstitution.postalCode\" id=\"editPostalCode\"\r\n                            class=\"form-control\" placeholder=\"Postal Code\" type=\"text\" />\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"col-sm-12 col-lg-12\">\r\n                <div class=\"form-group\">\r\n                    <div class=\"col-sm-10\">\r\n                        <label>Country</label>\r\n                        <input value.bind=\"people.selectedInstitution.country\" id=\"editCountry\" class=\"form-control\"\r\n                            placeholder=\"Country\" type=\"text\" />\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-lg-6 topMargin\">\r\n            <div class=\"col-sm-12 col-lg-12\">\r\n                <div class=\"form-group\">\r\n                    <div class=\"col-sm-10\">\r\n                        <label>URL</label>\r\n                        <input value.bind=\"people.selectedInstitution.url\" id=\"editCountry\" class=\"form-control\"\r\n                            placeholder=\"URL\" type=\"text\" />\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"col-sm-12 col-lg-12\">\r\n                <div class=\"form-group\">\r\n                    <div class=\"col-sm-10\">\r\n                        <label>Time Zone</label>\r\n                        <select value.bind=\"people.selectedInstitution.timeZone\" class=\"form-control\">\r\n                            <option value=\"\">Select an option</option>\r\n                            <option repeat.for=\"zone of config.TIMEZONES\" value=\"${zone}\">${zone}</option>\r\n                        </select>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"col-sm-12 col-lg-12\">\r\n                <div class=\"form-group\">\r\n                    <div class=\"col-sm-10\">\r\n                        <div class=\"checkbox\">\r\n                            <label>\r\n                                <input disabled checked.bind=\"people.selectedInstitution.apj\" type=\"checkbox\"> APJ\r\n                            </label>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n\r\n        </div>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/acc/components/instIs4ua.html":
/*!***************************************************!*\
  !*** ./src/modules/acc/components/instIs4ua.html ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div class=\"col-lg-6 topMargin\">\r\n        <div class=\"col-lg-12\">\r\n            <div class=\"form-group\">\r\n                <div class=\"col-sm-10\">\r\n                    <label>Institution Type *</label>\r\n                    <select value.bind=\"people.selectedInstitution.institutionType\" id=\"editInstitutionType\" class=\"form-control\">\r\n                        <option value=\"\">Select an option</option>\r\n                        <option repeat.for=\"status of is4ua.institutionTypes\" value=\"${status.code}\">${status.description}</option>\r\n                    </select>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-lg-12\">\r\n            <div class=\"form-group\">\r\n                <div class=\"col-sm-10\">\r\n                    <label>Member Type *</label>\r\n                    <select value.bind=\"people.selectedInstitution.memberType\" id=\"editMemberType\" class=\"form-control\">\r\n                        <option value=\"\">Select an option</option>\r\n                        <option repeat.for=\"status of is4ua.memberTypes\" value=\"${status.code}\">${status.description}</option>\r\n                    </select>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n     <div class=\"col-lg-6 topMargin\">\r\n        <div class=\"col-lg-12\">\r\n            <div class=\"form-group\">\r\n                <div class=\"col-sm-10\">\r\n                    <label class=\"left\">Highest Degree *</label>\r\n                    <select value.bind=\"people.selectedInstitution.highestDegree\" id=\"editHighestDegree\" class=\"form-control\">\r\n                        <option value=\"\">Select an option</option>\r\n                        <option repeat.for=\"status of is4ua.highestDegrees\" value=\"${status.code}\">${status.description}</option>\r\n                    </select>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-lg-12\">\r\n            <div class=\"form-group\">\r\n                <div class=\"col-sm-10\">\r\n                    <label>Department</label>\r\n                    <input value.bind=\"people.selectedInstitution.universityDept\" id=\"editDepartment\" class=\"form-control\" placeholder=\"Department\" type=\"text\" />\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/acc/components/instPeople.html":
/*!****************************************************!*\
  !*** ./src/modules/acc/components/instPeople.html ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n            <div class=\"col-lg-10 col-offset-lg-1\" style=\"padding:15px;\">\r\n\r\n            <table id=\"personTable2\" class=\"table table-striped table-hover\">\r\n                <thead>\r\n                    <tr>\r\n                        <th style=\"width:20rem;\">Name</th>\r\n                        <th style=\"width:15rem;\">Phone</th>\r\n                        <th style=\"width:20rem;\">eMail</th>\r\n                        <th>Role</th>\r\n                        <th>Status</th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody>\r\n                    <tr repeat.for=\"person of people.instutionPeopleArray\" class=\"blackText\">\r\n                        <td data-title=\"name\">${person.firstName} ${person.lastName}</td>\r\n                        <td data-tile=\"phone\">${person.phone | phoneNumber}</td>\r\n                        <td data-title=\"email\">${person.email}</td>\r\n                        <td data-title=\"role\">${person.roles}</td>\r\n                        <td data-title=\"status\">${person.personStatus | lookupValue:is4ua.personStatusArray:\"code\":\"description\"}</td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/acc/components/institutionDetails.html":
/*!************************************************************!*\
  !*** ./src/modules/acc/components/institutionDetails.html ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <form class=\"form-horizontal\">\r\n        <div class=\"row\">\r\n            <div class=\"col-lg-3\">\r\n                <div class=\"form-group\">\r\n                    <div class=\"col-sm-10\">\r\n                        <label>Name *</label>\r\n                        <input value.bind=\"people.selectedInstitution.name\" id=\"editName\" class=\"form-control\"\r\n                            placeholder=\"Name\" type=\"text\" />\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"col-lg-3\">\r\n                <div class=\"form-group\">\r\n                    <div class=\"col-sm-10\">\r\n                        <label>Date Joined</label>\r\n                        <flat-picker controlid=\"joinDate\" config.bind=\"dateConfig\"\r\n                            value.bind=\"people.selectedInstitution.joinDate\"></flat-picker>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"col-lg-3\">\r\n                <div class=\"form-group\">\r\n                    <div class=\"col-sm-10\">\r\n                        <label class=\"left\">Status *</label>\r\n                        <select value.bind=\"people.selectedInstitution.institutionStatus\" id=\"editInstitutonStatusArray\"\r\n                            class=\"form-control\">\r\n                            <option value=\"\">Select an option</option>\r\n                            <option repeat.for=\"status of is4ua.institutonStatusArray\" value=\"${status.code}\">\r\n                                ${status.description}</option>\r\n                        </select>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"col-lg-3\">\r\n                <div class=\"form-group\">\r\n                    <div class=\"col-sm-10\">\r\n                        <label>Date Dropped</label>\r\n                        <flat-picker controlid=\"dropDate\" config.bind=\"dateConfig\"\r\n                            value.bind=\"people.selectedInstitution.dropDate\"></flat-picker>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"row\">\r\n            <div class=\"col-lg-3\">\r\n                <div class=\"form-group\">\r\n                    <div class=\"col-sm-10\">\r\n                        <label class=\"left\">Package *</label>\r\n                        <select value.bind=\"people.selectedInstitution.packageId.packageId\" id=\"editInstitutonPakage\"\r\n                            class=\"form-control\">\r\n                            <option model.bind=\"null\">Select an option</option>\r\n                             <option repeat.for=\"package of people.packageArray\" model.bind=\"package._id\">${package.name}\r\n                            </option>\r\n                        </select>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"col-lg-3\">\r\n                <div class=\"form-group\">\r\n                    <div class=\"col-sm-10\">\r\n                        <label>Package Start Date</label>\r\n                        <flat-picker controlid=\"packageStartDate\" config.bind=\"dateConfig\"\r\n                            value.bind=\"people.selectedInstitution.packageId.dateStarted\"></flat-picker>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"col-lg-3\">\r\n                <div class=\"form-group\">\r\n                    <div class=\"col-sm-10\">\r\n                        <label>Package Invoice Date</label>\r\n                        <flat-picker controlid=\"packageInvoiceDate\" config.bind=\"dateConfig\"\r\n                            value.bind=\"people.selectedInstitution.packageId.dateInvoiced\"></flat-picker>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"col-lg-3\">\r\n                <div class=\"form-group\">\r\n                    <div class=\"col-sm-10\">\r\n                        <label>Package Pay Date</label>\r\n                        <flat-picker controlid=\"packagePayDate\" config.bind=\"dateConfig\"\r\n                            value.bind=\"people.selectedInstitution.packageId.datePaid\"></flat-picker>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </form>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/acc/components/institutionPanels.html":
/*!***********************************************************!*\
  !*** ./src/modules/acc/components/institutionPanels.html ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\n    <div class=\"panel panel-default topMargin panelContrastColor\">\n        <div class=\"panel-body\">\n            <div class=\"col-lg-2\">\n                <div id=\"instFormListGroup\" class=\"list-group\">\n                    <a class=\"${ $first ? 'menuButtons' : ''} list-group-item\" repeat.for=\"tab of tabs\" href=\"\" class=\"list-group-item\"\n                        click.delegate=\"changeTab($event, $index)\">\n                        <h4 id=\"${tab.id}\" class=\"list-group-item-heading\">${tab.title}</h4>\n                    </a>\n                </div>\n            </div>\n\n            <div class=\"col-lg-10\">\n                <div class=\"tab-content\">\n                  <div id=\"instAddressTab\" class=\"tab-pane fade in active' }\">\n                    <compose view=\"./instAddress.html\"></compose>\n                  </div>\n                  <div id=\"instPeopleTab\" class=\"tab-pane fade\">\n                    <compose view=\"./instPeople.html\"></compose>\n                  </div>\n                  <div id=\"instIs4uaTab\" class=\"tab-pane fade\">\n                    <compose view=\"./instIs4ua.html\"></compose>\n                  </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</template>\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/acc/components/institutionsForm.html":
/*!**********************************************************!*\
  !*** ./src/modules/acc/components/institutionsForm.html ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <style>\r\n        .menuButtons {\r\n            color:${config.ACTIVE_SUBMENU_COLOR}\r\n            ;\r\n            background-color:${config.BUTTONS_BACKGROUND}\r\n        }\r\n    </style>\r\n    <div class=\"list-group-item toolbar\">\r\n        <span click.delegate=\"back()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n            title=\"\" data-original-title=\"Back\"><i class=\"fa fa-arrow-left fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n        <span click.delegate=\"save()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n            title=\"\" data-original-title=\"Save\"><i class=\"fa fa-floppy-o fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n        <span click.delegate=\"cancel()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n            title=\"\" data-original-title=\"Cancel Changes\"><i class=\"fa fa-ban fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n        <span show.bind=\"!newInstitution\" click.delegate=\"delete()\" class=\"smallMarginRight\" bootstrap-tooltip\r\n            data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Delete\"><i class=\"fa fa-trash fa-lg fa-border text-danger\"\r\n                aria-hidden=\"true\"></i></span>\r\n    </div>\r\n\r\n    <div class=\"panel panel-default positionUnderToolbar\">\r\n        <div class=\"panel-body\">\r\n            <compose view=\"./institutionDetails.html\"></compose>\r\n            <compose view=\"./institutionPanels.html\"></compose>\r\n        </div>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/acc/components/institutionsTable.html":
/*!***********************************************************!*\
  !*** ./src/modules/acc/components/institutionsTable.html ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div class=\"panel panel-info\">\r\n        <div class=\"panel-body\">\r\n            <div class=\"row\">\r\n                <div class='col-lg-10 col-lg-offset-1 bottomMargin'>\r\n                    <div id=\"no-more-tables\">\r\n\r\n                        <table class=\"table table-striped table-hover cf\">\r\n                            <thead class=\"cf\">\r\n                                <tr colspan='6'>\r\n                                    <compose view=\"../../../resources/elements/table-navigation-bar.html\"></compose>\r\n                                </tr>\r\n                                <tr>\r\n                                    <td colspan='6'>\r\n                                        <span click.delegate=\"refresh()\" class=\"smallMarginRight\" bootstrap-tooltip\r\n                                            data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Refresh\"><i\r\n                                                class=\"fa fa-refresh\" aria-hidden=\"true\"></i></span>\r\n                                        <span click.delegate=\"new()\" class=\"smallMarginRight\" bootstrap-tooltip\r\n                                            data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"New\"><i\r\n                                                class=\"fa fa-plus\" aria-hidden=\"true\"></i></span>\r\n                                        <span click.delegate=\"downloadInstExcel()\" class=\"smallMarginRight\"\r\n                                            bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n                                            data-original-title=\"Export to Excel\"><i class=\"fa fa-download\" aria-hidden=\"true\"></i></span>\r\n                                        <span click.delegate=\"_clearFilters()\" class=\"smallMarginRight\"\r\n                                            bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n                                            data-original-title=\"Clear Filters\"><i class=\"fa fa-filter\" aria-hidden=\"true\"></i></span>\r\n\r\n                                    </td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <th><span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'name'})\">Name\r\n                                        </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                                    <th>Institution Type</th>\r\n                                    <th>Package</th>\r\n                                    <th>Status</th>\r\n                                </tr>\r\n                            </thead>\r\n                            <tbody>\r\n                                <tr>\r\n                                    <th>\r\n                                        <input value.bind=\"nameFilterValue\" input.delegate=\"dataTable.filterList(nameFilterValue, { type: 'text',  filter: 'nameFilter', lookupArray: '', lookupProperty: '', collectionProperty: 'name', displayProperty: 'fullnameName', matchProperty:'', compare:'match'} )\"\r\n                                            class=\"form-control\" />\r\n                                    </th>\r\n                                    <th>\r\n                                        <select value.bind=\"institutionTypes\" input.delegate=\"dataTable.filterList($event, { type: 'value',  filter: 'institutionType',  collectionProperty: 'institutionType', displayProperty: 'institutionType', compare:'match'} )\"\r\n                                            class=\"form-control\">\r\n                                            <option value=\"\"></option>\r\n                                            <option repeat.for=\"institution of is4ua.institutionTypes\" value=\"${institution.code}\">${institution.description}</option>\r\n                                        </select>\r\n                                    </th>\r\n                                    <th>\r\n                                        <select value.bind=\"institutionPackageFilter\" input.delegate=\"dataTable.filterList($event, { type: 'value',  filter: 'institutionPackageFilter', lookupArray: '', lookupProperty: '', collectionProperty: 'packageId.packageId', displayProperty: 'memberType', matchProperty:'', compare:'match'} )\"\r\n                                            class=\"form-control\">\r\n                                            <option value=\"\"></option>\r\n                                            <option repeat.for=\"institution of people.packageArray\" value=\"${institution._id}\">${institution.name}</option>\r\n                                        </select>\r\n                                    </th>\r\n                                    <th>\r\n                                        <select value.bind=\"institutionStatusFilter\" input.delegate=\"dataTable.filterList($event, { type: 'value',  filter: 'institutionStatusFilter', lookupArray: '', lookupProperty: '', collectionProperty: 'institutionStatus', displayProperty: 'institutionStatus', matchProperty:'', compare:'match'} )\"\r\n                                            class=\"form-control\">\r\n                                            <option value=\"\"></option>\r\n                                            <option repeat.for='status of is4ua.institutonStatusArray' value=\"${status.code}\">${status.description}</option>\r\n                                        </select>\r\n                                    </th>\r\n                                </tr>\r\n                                <tr click.trigger=\"edit($index, $event)\" repeat.for=\"inst of dataTable.displayArray\">\r\n                                    <td data-title=\"Name\">${inst.name}</td>\r\n                                    <td data-title=\"Type\">${inst.institutionType |\r\n                                        lookupValue:is4ua.institutionTypes:\"code\":\"description\"}</td>\r\n                                    <td data-tile=\"Phone\">${inst.packageId.packageId |\r\n                                        lookupValue:people.packageArray:\"_id\":\"name\"}</td>\r\n                                    <td data-title=\"Status\">${inst.institutionStatus |\r\n                                        lookupValue:is4ua.institutonStatusArray:\"code\":\"description\"}</td>\r\n                                </tr>\r\n                            </tbody>\r\n                        </table>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/acc/components/requestDetails.html":
/*!********************************************************!*\
  !*** ./src/modules/acc/components/requestDetails.html ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t<div class=\"row\">\r\n\t\t<div class=\"col-lg-12\">\r\n\t\t\t<h4 class=\"topMargin\"><strong>Request Details</strong></h4>\r\n\t\t\t<div class=\"panel panel-default topMargin\">\r\n\t\t\t\t<div class=\"panel-body leftJustify\">\r\n\t\t\t\t\t<div class=\"form-horizontal topMargin\">\r\n\t\t\t\t\t\t<h4>Product: ${selectedRequestDetail.productId.name}</h4>\r\n\r\n\t\t\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t\t\t<div class=\"col-lg-5 leftMargin\">\r\n\t\t\t\t\t\t\t\t<h5>Student accounts: <b>${selectedRequestDetail.numberOfStudents}</b></h5>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t\t\t<div class=\"col-lg-5 leftMargin\">\r\n\t\t\t\t\t\t\t\t<h5>Required Date: <b>${selectedRequestDetail.requiredDate |\r\n\t\t\t\t\t\t\t\t\t\tdateFormat:config.DATE_FORMAT_TABLE}</b></h5>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div\r\n\t\t\t\t\t\t\tshow.bind=\"selectedRequestDetail.requestId.customerMessage && selectedRequestDetail.requestId.customerMessage.length > 0\">\r\n\t\t\t\t\t\t\t<label class=\"topMargin\">Requests from the UCC</label>\r\n\t\t\t\t\t\t\t<div class=\"well\" innerhtml.bind=\"selectedRequestDetail.requestId.customerMessage\"></div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div\r\n\t\t\t\t\t\t\tshow.bind=\"selectedRequestDetail.requestId.comments && selectedRequestDetail.requestId.comments.length > 0\">\r\n\t\t\t\t\t\t\t<label class=\"topMargin\">Comments</label>\r\n\t\t\t\t\t\t\t<div innerhtml.bind=\"selectedRequestDetail.requestId.comments\"></div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n\t<div show.bind=\"products.selectedProduct.productDescription\">\r\n\t\t<h4>Product Information</h4>\r\n\t\t<div innerhtml.bind=\"products.selectedProduct.productDescription\"></div>\r\n\t</div>\r\n</template>\r\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/acc/components/requestForm.html":
/*!*****************************************************!*\
  !*** ./src/modules/acc/components/requestForm.html ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n  <div class=\"panel panel-default\" style=\"margin-top:50px;\">\r\n    <div class=\"panel-body\">\r\n      <div class=\"row\">\r\n        <div class=\"row\">\r\n          <div class=\"list-group-item toolbar\">\r\n            <span click.delegate=\"back()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n              data-placement=\"bottom\" title=\"\" data-original-title=\"Back\"><i class=\"fa fa-arrow-left fa-lg fa-border\"\r\n                aria-hidden=\"true\"></i></span>\r\n            <span click.delegate=\"save()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n              data-placement=\"bottom\" title=\"\" data-original-title=\"Save\"><i class=\"fa fa-floppy-o fa-lg fa-border\"\r\n                aria-hidden=\"true\"></i></span>\r\n          </div>\r\n        </div>\r\n        <div class=\"row\">\r\n          <div class=\"leftMargin col-lg-4\">\r\n            <div class=\"panel panel-default\">\r\n              <div class=\"panel-body\">\r\n                <h4>Institution: ${selectedRequestDetail.requestId.institutionId.name}\r\n                </h4>\r\n                <h5 class=\"topMargin\">Product: ${selectedRequestDetail.productId.name}</h5>\r\n                <h5 class=\"topMargin\">Required Date: ${selectedRequestDetail.requiredDate |\r\n                  dateFormat:config.DATE_FORMAT_TABLE}</h5>\r\n              </div>\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"form-group col-lg-6\">\r\n                <label>Student IDs</label>\r\n                <input value.bind=\"selectedRequestDetail.assignments[assignmentDetailIndex].studentUserIds\"\r\n                  id=\"proposedIDRange\" disabled.bind=\"selectedClientIndex === undefined\"\r\n                  keyup.delegate=\"updateClientAssignments()\" placeholder=\"Proposed IDs\" class=\"form-control\" type=\"text\"\r\n                  ref=\"proposedIDRange\" />\r\n              </div>\r\n\r\n              <div class=\"form-group col-lg-6\">\r\n                <label>Student Password</label>\r\n                <input value.bind=\"selectedRequestDetail.assignments[assignmentDetailIndex].studentPassword\"\r\n                  id=\"proposedStudentPassword\" disabled.bind=\"selectedClientIndex === undefined\"\r\n                  placeholder=\"Proposed Password\" class=\"form-control\" type=\"text\" />\r\n              </div>\r\n\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"form-group col-lg-6\">\r\n                <label>Faculty IDs</label>\r\n                <input value.bind=\"selectedRequestDetail.assignments[assignmentDetailIndex].facultyUserIds\"\r\n                  id=\"proposedFacultyIDRange\" disabled.bind=\"selectedClientIndex === undefined\"\r\n                  keyup.delegate=\"updateClientAssignments()\" placeholder=\"Proposed Faculty IDs\" class=\"form-control\"\r\n                  type=\"text\" />\r\n              </div>\r\n\r\n              <div class=\"form-group col-lg-6\">\r\n                <label>Faculty Password</label>\r\n                <input value.bind=\"selectedRequestDetail.assignments[assignmentDetailIndex].facultyPassword\"\r\n                  id=\"proposedFacultyPassword\" disabled.bind=\"selectedClientIndex === undefined\"\r\n                  placeholder=\"Proposed Faculty Password\" class=\"form-control\" type=\"text\" />\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"row smallLeftMargin topMargin\">\r\n              <table id=\"assignmentTable\" class=\"table table-striped table-hover\">\r\n                <thead>\r\n                  <tr>\r\n                    <th style=\"width:20px;\">System</th>\r\n                    <th style=\"width:20px;\">Client</th>\r\n                    <th style=\"width:30px;\">Assigned Date</th>\r\n                    <th style=\"width:20px;\"></th>\r\n                  </tr>\r\n                </thead>\r\n                <tbody>\r\n                  <tr class=\"${client.notValid} dropbtn\" repeat.for=\"client of selectedRequestDetail.assignments\">\r\n                    <td click.trigger=\"selectProposedClient($index, $event)\">${client.systemId |\r\n                      lookupValue:systems.systemsArray:\"_id\":\"sid\"}</td>\r\n                    <td click.trigger=\"selectProposedClient($index, $event)\">${client.client}</td>\r\n                    <td click.trigger=\"selectProposedClient($index, $event)\">${client.assignedDate |\r\n                      dateFormat:config.DATE_FORMAT_TABLE}</td>\r\n                    <td><span click.trigger=\"deleteTable(client, $index)\" class=\"smallMarginRight\" bootstrap-tooltip\r\n                        data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Delete\"><i\r\n                          class=\"fa fa-trash-o\" aria-hidden=\"true\"></i></span></td>\r\n                  </tr>\r\n                </tbody>\r\n              </table>\r\n            </div>\r\n            <div class=\"row topMargin\">\r\n              <fieldset class=\"form-group\">\r\n                <div class=\"col-lg-12\">\r\n                  <editor value.bind=\"selectedRequestDetail.techComments\" height=\"250\"></editor>\r\n                </div>\r\n              </fieldset>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-lg-6 col-lg-offset-1\">\r\n            <div class=\"panel panel-default smallLeftMargin smallMarginRight\">\r\n              <div class=\"panel-body\">\r\n                <div class=\"row\">\r\n                  <div class=\"col-lg-6 pull-right\">\r\n                    <div class=\"col-lg-7\" show.bind=\"!sandBoxOnly\">\r\n                      <div class=\"checkbox\">\r\n                        <label>\r\n                          <input checked.bind=\"unassignedOnly\" id=\"unassignedCheckBox\" type=\"checkbox\"\r\n                            change.trigger=\"changeUnassignedOnly()\" data-toggle=\"checkbox\"> Unassigned only\r\n                        </label>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"col-lg-5 pull-right\">\r\n                      <div class=\"checkbox\">\r\n                        <label>\r\n                          <input checked.bind=\"sandBoxOnly\" id=\"sandBoxOnlyCheckBox\" type=\"checkbox\"\r\n                            data-toggle=\"checkbox\">\r\n                          ${config.SANDBOX_NAME} only\r\n                        </label>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"form-group\">\r\n                  <label class=\"control-label col-sm-3 hideOnPhone\">Systems</label>\r\n                  <select change.delegate=\"systemSelected()\" class=\"form-control\" value.bind=\"selectedSystemId\">\r\n                    <option repeat.for='sys of productSystems' model.bind=\"sys._id\">${sys.sid}\r\n                    </option>\r\n                  </select>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"topMargin smallMarginRight\">\r\n              <div show.bind=\"clientsConfigured\">\r\n                <table id=\"clientTable\" class=\"table table-striped table-hover\">\r\n                  <thead>\r\n                    <tr>\r\n                      <th class=\"col-sm-1\">Client</th>\r\n                      <th class=\"col-sm-1\">Status</th>\r\n                      <th>Product</th>\r\n                      <th class=\"col-sm-6\">Assignments</th>\r\n                    </tr>\r\n                  </thead>\r\n                </table>\r\n                <div style=\"overflow:auto;height:800px;\">\r\n                  <table id=\"clientTable2\" class=\"table table-striped table-hover\">\r\n                    <tbody>\r\n                      <tr  class=\"${client.clientStatus == config.RETIRED_CLIENT_CODE ? 'success dropbtn' : 'dropbtn'}\"\r\n                      click.trigger=\"selectClient($index, client)\"\r\n                        repeat.for=\"client of selectedSystem.clients\">\r\n                        <td class=\"col-sm-1\">${client.client}</br><span class=\"smallLeftMargin\"\r\n                            if.bind=\"client.manual\"><i class=\"fa fa-hand-paper-o\" aria-hidden=\"true\"></i></span></td>\r\n                        <td class=\"col-sm-1\">${client.clientStatus |\r\n                          lookupValue:config.CLIENT_STATUSES:\"code\":\"description\"}</td>\r\n                        <td>${products.selectedProduct.name}</td>\r\n                        <td class=\"col-sm-6\">\r\n                          <table class=\"col-sm-12\">\r\n                            <tr repeat.for=\"assignment of client.assignments\" class=\"${assignment.statusCurrent ? '': 'success'}\">\r\n                              <td>\r\n                                <div class=\"col-lg-12 list-group-item\">\r\n                                  <p class=\"list-group-item-text\">\r\n                                    <span>${assignment.institutionId.name}</span></br>\r\n                                  </p>\r\n                                  <p class=\"list-group-item-text\">\r\n                                    <span>Student IDS:\r\n                                      ${assignment.assignment.assignments[0].studentUserIds}</span></br>\r\n                                  </p>\r\n                                  <p>\r\n                                    <b>${assignment.statusCurrent === undefined || assignment.statusCurrent ? '' : 'Retired'}</b>\r\n                                  </p>\r\n                                </div>\r\n                              </td>\r\n                            </tr>\r\n                          </table>\r\n                        </td>\r\n                    </tbody>\r\n                  </table>\r\n                </div>\r\n              </div>\r\n              <div show.bind=\"!clientsConfigured && productSystems.length\">\r\n                <h5>There are no clients configured for this product in ${systems.selectedSystem.sid}\r\n                </h5>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>\r\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/acc/components/requestsTable.html":
/*!*******************************************************!*\
  !*** ./src/modules/acc/components/requestsTable.html ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n  <div class=\"container\">\r\n    <div class=\"row\">\r\n      <!-- Session Select -->\r\n      <div class=\"col-lg-4\">\r\n        <div class=\"checkbox leftMargin\">\r\n          <label>\r\n            <input checked.bind=\"isCheckedAssigned\" change.trigger=\"filterInAssigned()\" type=\"checkbox\"> Filter out\r\n            Assigned Requests\r\n          </label>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div id=\"no-more-tables\">\r\n      <table id=\"requestsTable\" class=\"table table-striped table-hover\">\r\n        <thead>\r\n          <tr>\r\n            <td colspan='10'>\r\n              <compose view=\"../../../resources/elements/table-navigation-bar.html\"></compose>\r\n            </td>\r\n          </tr>\r\n          <tr>\r\n            <td colspan='10'>\r\n              <span click.delegate=\"refresh()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n                data-placement=\"bottom\" title=\"\" data-original-title=\"Refresh\">\r\n                <i class=\"fa fa-refresh\" aria-hidden=\"true\"></i>\r\n              </span>\r\n              <span click.delegate=\"clearFilters()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n                data-placement=\"bottom\" title=\"\" data-original-title=\"Clear Filters\">\r\n                <i class=\"fa fa-filter\" aria-hidden=\"true\"></i>\r\n              </span>\r\n            </td>\r\n            <td></td>\r\n            <td></td>\r\n          </tr>\r\n          <tr>\r\n            <th class=\"col-lg-1\">\r\n              <span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'requiredDate'})\">Due\r\n              </span>\r\n              <span>\r\n                <i class=\"fa fa-sort\"></i>\r\n              </span>\r\n            </th>\r\n            <th class=\"col-lg-1\" class=\"hidden-sm\">\r\n              <span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'createdDate'})\">Created\r\n              </span>\r\n              <span>\r\n                <i class=\"fa fa-sort\"></i>\r\n              </span>\r\n            </th>\r\n            <th># of Students</th>\r\n            <th class=\"col-lg-1\">\r\n              <span class=\"sortable\"\r\n                click.trigger=\"dataTable.sortArray($event, {type: 'custom', sorter: customRequestStatusSorter, propertyName: 'requestStatus'})\">Status\r\n              </span>\r\n              <i class=\"fa fa-sort\"></i>\r\n            </th>\r\n\r\n            <th class=\"col-lg-2\">\r\n              <span class=\"sortable\"\r\n                click.trigger=\"dataTable.sortArray($event, {propertyName: 'productId.name'})\">Product </span>\r\n              <span>\r\n                <i class=\"fa fa-sort\"></i>\r\n              </span>\r\n            </th>\r\n\r\n            <th class=\"col-lg-1\">\r\n              <span class=\"sortable\"\r\n                click.trigger=\"dataTable.sortArray($event, {type: 'custom', sorter: customInstitutionsSorter, propertyName: 'requestId.institutionId'})\">Institution\r\n              </span>\r\n              <i class=\"fa fa-sort\"></i>\r\n            </th>\r\n            <th show.bind=\"!isCheckedAssigned\">Assignments</th>\r\n            <th></th>\r\n            <th></th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr class=\"hidden-sm hidden-xs\">\r\n            <th>\r\n              <input type=\"date\" value.bind=\"requiredDateFilterValue\"\r\n                input.delegate=\"dataTable.filterList(requiredDateFilterValue, {type: 'date', filter: 'requiredDate',  collectionProperty: 'requiredDate', compare: 'after'} )\"\r\n                class=\"form-control\" />\r\n            </th>\r\n            <th>\r\n              <input type=\"date\" value.bind=\"createdDateFilterValue\"\r\n                input.delegate=\"dataTable.filterList(createdDateFilterValue, {type: 'date', filter: 'createdDate',  collectionProperty: 'createdDate', compare: 'after'} )\"\r\n                class=\"form-control hidden-sm\" />\r\n            </th>\r\n            <th></th>\r\n            <th>\r\n              <select value.bind=\"requestStatusFilter\"\r\n                input.delegate=\"dataTable.filterList($event, { type: 'value',  filter: 'requestStatusFilter',  collectionProperty: 'requestStatus', displayProperty: 'requestStatus',  compare:'match'} )\"\r\n                class=\"form-control\">\r\n                <option value=\"\"></option>\r\n                <option repeat.for=\"status of config.REQUEST_STATUS\" value=\"${status.code}\">${status.description}\r\n                </option>\r\n              </select>\r\n            </th>\r\n\r\n            <th>\r\n              <input value.bind=\"productFilterValue\"\r\n                input.delegate=\"dataTable.filterList(productFilterValue, { type: 'custom',  filter: customProductNameFilter,  compare:'custom'} )\"\r\n                class=\"form-control\" />\r\n            </th>\r\n\r\n            <th>\r\n              <input value.bind=\"institutionFilterValue\"\r\n                input.delegate=\"dataTable.filterList(institutionFilterValue, { type: 'custom',  filter: institutionCustomFilter, compare:'custom'} )\"\r\n                class=\"form-control\" />\r\n            </th>\r\n            <th show.bind=\"!isCheckedAssigned\"></th>\r\n            <th></th>\r\n            <th></th>\r\n          </tr>\r\n          <tr repeat.for=\"request of dataTable.displayArray\"\r\n            class=\"${request.requestStatus | getArrayValue:config.REQUEST_STATUS:'status':-1}\">\r\n            <td  data-title=\"requiredDate\">${request.requiredDate |\r\n              dateFormat:config.DATE_FORMAT_TABLE}</td>\r\n            <td class=\"hidden-sm\" data-title=\"dateCreated\">\r\n              ${request.createdDate | dateFormat:config.DATE_FORMAT_TABLE}</td>\r\n            <td data-title=\"Students\">${request.numberOfStudents}</td>\r\n            <td data-title=\"status\">${request.requestStatus |\r\n              lookupValue:config.REQUEST_STATUS:\"code\":\"description\"}</td>\r\n           \r\n            <td data-title=\"product\">${request.productId.name}</td>\r\n\r\n            <td data-title=\"Name\">\r\n              ${request.requestId.institutionId.name}</td>\r\n            <td show.bind=\"!isCheckedAssigned\"\r\n              innerhtml.bind=\"request.assignments | parseAssignments:systems.systemsArray\"></td>\r\n            <td>\r\n              <span class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n                data-original-title=\"Edit\">\r\n                <i class=\"fa fa-pencil fa-lg fa-border\" click.delegate=\"editRequest($index, request)\"\r\n                  aria-hidden=\"true\"></i>\r\n              </span>\r\n            </td>\r\n            <td>\r\n              <span class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n                data-original-title=\"View Assignment\">\r\n                <i class=\"fa fa-eye fa-lg fa-border\" click.delegate=\"viewAssignment($index, request)\"\r\n                  aria-hidden=\"true\"></i>\r\n              </span>\r\n            </td>\r\n          </tr>\r\n          <tr if.bind=\"dataTable.displayArray.length > 20\">\r\n            <td colspan='10'>\r\n              <compose view=\"../../../resources/elements/table-navigation-bar.html\"></compose>\r\n            </td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n  </div>\r\n  </div>\r\n\r\n\r\n</template>\r\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/acc/components/viewAssignmentForm.html":
/*!************************************************************!*\
  !*** ./src/modules/acc/components/viewAssignmentForm.html ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t<div class=\"panel panel-default\" style=\"margin-top:50px;\">\r\n\t\t<div class=\"panel-body\">\r\n\t\t\t<div class=\"row\">\r\n\t\t\t\t<div class=\"fluid-container\">\r\n\t\t\t\t\t<!-- Buttons -->\r\n\t\t\t\t\t<div class=\"toolbar list-group-item\">\r\n\t\t\t\t\t\t<span click.delegate=\"backView()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n\t\t\t\t\t\t title=\"\" data-original-title=\"Back\"><i class=\"fa fa-arrow-left fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class=\"col-lg-6 col-md-12\">\r\n\t\t\t\t\t\t<compose view=\"./requestDetails.html\"></compose>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class=\"col-lg-6 col-md-12\">\r\n\t\t\t\t\t\t<compose view=\"./assignmentDetails.html\"></compose> \r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/acc/components/viewRequestsTable.html":
/*!***********************************************************!*\
  !*** ./src/modules/acc/components/viewRequestsTable.html ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div show.bind=\"dataTable.displayArray && dataTable.displayArray.length || initialLoaded\" class=\"panel panel-default rightMargin leftMargin\">\r\n        <div class=\"panel-body\">\r\n            <div class=\"row\">\r\n  <div class=\"row\">\r\n \r\n    \r\n    </div>\r\n\r\n      <div>\r\n        <div class=\"row\">\r\n          <div class=\"col-lg-12\">\r\n            <compose view=\"./requestsTable.html\"></compose>\r\n          </div>\r\n      </div>\r\n  </div>\r\n\r\n  </div>\r\n  </div>\r\n  </div>\r\n</template>\r\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/acc/viewUserRequests.html":
/*!***********************************************!*\
  !*** ./src/modules/acc/viewUserRequests.html ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <span id=\"loading\">\r\n        <ul class=\"bokeh\">\r\n            <li></li>\r\n            <li></li>\r\n            <li></li>\r\n        </ul>\r\n    </span>\r\n\r\n    <div show.bind=\"requestSelected == 'table'\">\r\n        <compose view=\"./components/viewRequestsTable.html\"></compose>\r\n    </div>\r\n    <div show.bind=\"requestSelected == 'edit'\">\r\n        <compose view=\"./components/editRequestsForm.html\"></compose>\r\n    </div>\r\n    <div show.bind=\"requestSelected == 'view'\">\r\n        <compose view=\"./components/viewAssignmentForm.html\"></compose>\r\n    </div>\r\n\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ })

}]);
//# sourceMappingURL=app-2ef08ec8.2384d3fce1a12a237460.bundle.js.map