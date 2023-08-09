"use strict";
(self["webpackChunkuccss_old_new"] = self["webpackChunkuccss_old_new"] || []).push([["app-0cb29c41"],{

/***/ "modules/user/requests/clientRequests":
/*!*****************************************************!*\
  !*** ./src/modules/user/requests/clientRequests.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ClientRequests: function() { return /* binding */ ClientRequests; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var aurelia_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-router */ 6433);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../config/appConfig */ 1666);
var _dec, _class;



let ClientRequests = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(aurelia_router__WEBPACK_IMPORTED_MODULE_1__.Router, _config_appConfig__WEBPACK_IMPORTED_MODULE_2__.AppConfig), _dec(_class = class ClientRequests {
  constructor(router, config) {
    this.title = "Product Requests";
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
      route: ['', 'viewRequests'],
      moduleId: './viewRequests',
      settings: {
        auth: true,
        roles: []
      },
      nav: true,
      name: 'viewRequests',
      title: 'View Requests'
    }, {
      route: 'createRequests',
      moduleId: './createRequests',
      settings: {
        auth: true,
        roles: []
      },
      nav: true,
      name: 'createRequests',
      title: 'Create Request'
    }, {
      route: 'viewProducts',
      moduleId: './viewProducts',
      settings: {
        auth: true,
        roles: []
      },
      nav: true,
      name: 'viewProducts',
      title: 'Product List'
    }]);
    this.router = router;
  }
}) || _class);

/***/ }),

/***/ "modules/user/requests/createRequests":
/*!*****************************************************!*\
  !*** ./src/modules/user/requests/createRequests.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ViewHelpTickets: function() { return /* binding */ ViewHelpTickets; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var aurelia_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-router */ 6433);
/* harmony import */ var _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../resources/utils/dataTable */ 6847);
/* harmony import */ var _resources_data_sessions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../resources/data/sessions */ 2073);
/* harmony import */ var _resources_data_products__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../resources/data/products */ 8666);
/* harmony import */ var _resources_data_siteInfo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../resources/data/siteInfo */ 1290);
/* harmony import */ var _resources_data_clientRequests__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../resources/data/clientRequests */ 5446);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../config/appConfig */ 1666);
/* harmony import */ var _resources_utils_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../resources/utils/utils */ 8741);
/* harmony import */ var _resources_data_people__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../resources/data/people */ 353);
/* harmony import */ var _resources_utils_validation__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../resources/utils/validation */ 2824);
/* harmony import */ var _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../resources/dialogs/common-dialogs */ 6545);
/* harmony import */ var _resources_data_sessionData__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../resources/data/sessionData */ 4517);
/* harmony import */ var flatpickr__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! flatpickr */ 7545);
/* harmony import */ var aurelia_event_aggregator__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! aurelia-event-aggregator */ "aurelia-event-aggregator");
/* harmony import */ var fuelux__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! fuelux */ 9424);
/* harmony import */ var fuelux__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(fuelux__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! moment */ 381);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_16__);
var _dec, _class;

















let ViewHelpTickets = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(aurelia_router__WEBPACK_IMPORTED_MODULE_1__.Router, _config_appConfig__WEBPACK_IMPORTED_MODULE_7__.AppConfig, _resources_utils_validation__WEBPACK_IMPORTED_MODULE_10__["default"], _resources_data_people__WEBPACK_IMPORTED_MODULE_9__.People, _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_11__.CommonDialogs, _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_2__.DataTable, _resources_utils_utils__WEBPACK_IMPORTED_MODULE_8__.Utils, _resources_data_sessions__WEBPACK_IMPORTED_MODULE_3__.Sessions, _resources_data_products__WEBPACK_IMPORTED_MODULE_4__.Products, _resources_data_clientRequests__WEBPACK_IMPORTED_MODULE_6__.ClientRequests, _resources_data_siteInfo__WEBPACK_IMPORTED_MODULE_5__.SiteInfo, aurelia_event_aggregator__WEBPACK_IMPORTED_MODULE_14__.EventAggregator), _dec(_class = class ViewHelpTickets {
  constructor(router, config, validation, people, dialog, datatable, utils, sessions, products, requests, siteInfo, ea) {
    this.sessionSelected = false;
    this.courseSelected = false;
    this.sandBoxClient = false;
    this.editCourse = false;
    this.editCourseFlag = false;
    this.showLockMessage = false;
    this.showInfoBox = true;
    this.spinnerHTML = "";
    this.sessionId = -1;
    this.courseId = -1;
    this.requestType = -1;
    this.requestReceived = false;
    this.existingRequest = false;
    this.tempRequests = new Array();
    this.productInfo = new Array();
    this.lockObject = new Object();
    this.minStartDate = "1/1/1900";
    this.maxStartDate = "1/1/9999";
    this.startDate = "";
    this.configDate = {
      "disable": [function (date) {
        // return true to disable
        return date.getDay() === 6 || date.getDay() === 0;
      }],
      "locale": {
        "firstDayOfWeek": 1 // start week on Monday
      }
    };

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
    this.dialog = dialog;
    this.ea = ea;
    this.userObj = JSON.parse(sessionStorage.getItem('user'));
  }
  async activate() {
    let responses = await Promise.all([this.sessions.getSessionsArray('?filter=[or]sessionStatus|Requests&order=sortOrder', true), this.products.getProductsArray('?filter=active|eq|true&order=name', true), this.siteInfo.getMessageArray('?filter=category|eq|CLIENT_REQUESTS', true), this.config.getConfig()]);
    this.people.getPeopleArray();
    this.people.getCoursesArray(true, '?filter=personId|eq|' + this.userObj._id + '&order=number');
    this.requests.selectRequest();
    this.filterList();
    this._setUpValidation();
    this.getMessages();
    this.useSandbox = this.config.SANDBOX_USED;
    if (!this.useSandbox) {
      this.typeSelected = true;
      this.regularClient = true;
      this.requestType = "regularCourse";
    }
  }
  canActivate() {
    if (!this.userObj) {
      this.userObj = this.config.user;
      if (!this.userObj) {
        this.utils.showNotification("Couldn't find your user information.  Try logging in again or call the UCC.", "warning");
        this.router.navigate("home");
      }
    }
  }
  getMessages() {
    this.CLIENT_REQUEST_START = this.siteInfo.selectMessageByKey('CLIENT_REQUEST_START');
    this.SESSION_SELECTED = this.siteInfo.selectMessageByKey('SESSION_SELECTED');
    this.REGULAR_NUMBER_OF_STUDENTS = this.siteInfo.selectMessageByKey('REGULAR_NUMBER_OF_STUDENTS');
    this.START_END_DATES = this.siteInfo.selectMessageByKey('START_END_DATES');
  }
  async getRequests() {
    await this._unLock();
    this.requestReceived = false;
    if (this.sessionId != -1 && this.courseId != -1) {
      this.ILockedIt = false;
      this.existingRequest = false;
      await this.requests.getClientRequestsArray('?filter=[and]personId|eq|' + this.userObj._id + ':sessionId|eq|' + this.sessionId + ':courseId|eq|' + this.courseId, true);
      if (this.requests.requestsArray && this.requests.requestsArray.length > 0) {
        this.requests.selectRequest(0);
        this.originalRequest = this.utils.copyObject(this.requests.selectedRequest);
        this.existingRequestLength = this.requests.selectedRequest.requestDetails.length;
        this.setDates(false);
        await this._lock();
        this.ILockedIt = true;
        this.existingRequest = true;
        if (this.requests.requestsArray && this.requests.requestsArray.length > 0) {
          let dateFoo = moment__WEBPACK_IMPORTED_MODULE_16___default()(new Date(this.requests.selectedRequest.requestDetails[0].createdDate)).format(this.config.DATE_FORMAT_TABLE);
          let existingMsg = this.siteInfo.selectMessageByKey('EXISTING_REQUEST_MESSAGE').content.replace('DATECREATED', dateFoo);
          $("#existingRequestInfo").html('').append(existingMsg).fadeIn();
        } else {
          $("#existingRequestInfo").empty().hide();
        }
        this.requestReceived = true;
      } else {
        $("#existingRequestInfo").empty().hide();
        this.setDates(true);
        this.existingRequestLength = 0;
        this.existingRequest = false;
        this.requests.selectRequest();
        this.requests.selectedRequest.sessionId = this.sessionId;
        this.requestReceived = true;
      }
    } else {
      this.existingRequest = false;
    }
  }
  async refresh() {
    this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
    await this.getRequests();
    this.spinnerHTML = "";
  }
  attached() {
    var wizard = $('.wizard').wizard();
    this.toolTips();
    var that = this;
    wizard.on('actionclicked.fu.wizard', function (e, data) {
      that.step = data.step;
      if (data.direction !== "previous") {
        if (!that.validation.validate(data.step)) {
          e.preventDefault();
        } else if (data.step === 4) {
          that.validation.makeValid($("#productListTable"));
          that.save();
        }
      }
    });
    let config = {
      altInput: true,
      altFormat: "F j, Y"
    };
  }
  deactivate() {
    this._unLock();
  }

  /*******************************************************************
   * User changes the session
   * el - event object
   ******************************************************************/
  async changeSession(el) {
    if (this.sessionId == -1) {
      //Drop down list changed to no session selected
      this.sessionSelected = false;
      this.courseSelected = false;
      this.sandBoxClient = false;
    } else {
      this._unLock();
      this.sessionSelected = true;
      //Select a session
      this.sessions.selectSession(el.target.selectedIndex - 1);
      this.setDates();
      this.validation.makeValid($(el.target));
      await this.getRequests();
    }
  }
  async selectCourse(index, el) {
    this.editCourseIndex = index;
    this.people.selectCourse(this.editCourseIndex);
    this.courseSelected = true;
    this.courseId = this.people.selectedCourse._id;
    await this.getRequests();
    if (this.selectedCourseRow) this.selectedCourseRow.children().removeClass('info');
    this.selectedCourseRow = $(el.target).closest('tr');
    this.selectedCourseRow.children().addClass('info');
  }
  setDates(session) {
    if (session) {
      $("#input-startDate").val("");
      $("#input-endDate").val("");
    }
    this.minStartDate = moment__WEBPACK_IMPORTED_MODULE_16___default()(this.sessions.selectedSession.startDate).add(7, 'hours').format('YYYY-MM-DD');
    this.maxStartDate = this.sessions.selectedSession.endDate;
    this.minEndDate = this.sessions.selectedSession.startDate;
    this.maxEndDate = this.sessions.selectedSession.endDate;
    this.minRequiredDate = this.minStartDate;
    // var nowPlusLeeway = moment(new Date()).add(this.config.REQUEST_LEEWAY + 1,'days');
    // this.minRequiredDate = moment.max(nowPlusLeeway, moment(this.sessions.selectedSession.startDate));
    // this.minRequiredDate = moment(this.minRequiredDate).add(7, 'hours').format('YYYY-MM-DD');
    this.maxRequiredDate = this.sessions.selectedSession.endDate;
  }
  async changeCourse(el) {
    var courseId = el.target.options[el.target.selectedIndex].value;
    this.selectedCourseIndex = el.target.selectedIndex;
    if (courseId === "") {
      this.courseSelected = false;
    } else {
      this.courseSelected = true;
      this.courseName = this.courses[el.target.selectedIndex - 1].number + " - " + this.courses[el.target.selectedIndex - 1].name;
      this.validation.makeValid($(el.target));
      await this.getRequests();
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
  changeBeginDate(evt) {
    if (evt.detail && evt.detail.value.date !== "") {
      this.minEndDate = moment__WEBPACK_IMPORTED_MODULE_16___default()(evt.detail.value.date).format("YYYY-MM-DD");
      this.requests.selectedRequest.endDate = moment__WEBPACK_IMPORTED_MODULE_16___default().max(this.requests.selectedRequest.startDate, this.requests.selectedRequest.endDate);
    }
  }
  async changeRequestType(el) {
    $("#existingRequestInfo").empty().hide();
    switch (el.target.value) {
      case "-1":
        this.typeSelected = false;
        this.courseSelected = false;
        this.sandBoxClient = false;
        break;
      case 'sandboxCourse':
        this.typeSelected = true;
        this.courseSelected = false;
        this.sandBoxClient = true;
        this.regularClient = false;
        this.courseId = this.config.SANDBOX_ID;
        await this.getRequests();
        this.validation.makeValid($(el.target));
        break;
      case 'regularCourse':
        this.typeSelected = true;
        this.courseId = "-1";
        this.regularClient = true;
        this.sandBoxClient = false;
        this.validation.makeValid($(el.target));
        await this.getRequests();
    }
  }
  _cleanRequest() {
    this.request.undergraduates = 0;
    this.request.graduates = 0;
    this.request.comments = "";
    this.tempRequests = [];
    this.tempRequest = {};
  }
  selectProduct(el) {
    if (this.requests.selectedRequest.requestDetails.length < this.config.REQUEST_LIMIT && !this.showLockMessage) {
      if (this.alreadyOnList(el.target.id)) {
        this.utils.showNotification('If you need more than one client of a product, add a comment on the next step.', 'warning');
      } else {
        $("#requestProductsLabel").html("Requested Products");
        var newObj = this.requests.emptyRequestDetail();
        newObj.productId = el.target.id;
        newObj.sessionId = this.requests.selectedRequest.sessionId;
        this.requests.selectedRequest.requestDetails.push(newObj);
        this.products.testFunction();
        this.products.selectedObjectById(newObj.productId);
        this.requests.selectedRequest.requestDetails[this.requests.selectedRequest.requestDetails.length - 1].productName = this.products.selectedProduct.name;
        // this.requiredDates.push(false);
      }
    } else {
      if (this.requests.selectedRequest.requestDetails.length === this.config.REQUEST_LIMIT) {
        this.utils.showNotification('Only ' + this.config.REQUEST_LIMIT + ' products per request are allowed.', 'warning');
      }
    }
    this.validation.makeValid($("#productList"));
  }
  alreadyOnList(id) {
    for (let i = 0; i < this.requests.selectedRequest.requestDetails.length; i++) {
      if (this.requests.selectedRequest.requestDetails[i].productId === id) return true;
    }
    return false;
  }
  removeProduct(el) {
    if (!this.showLockMessage) {
      for (var i = 0; i < this.requests.selectedRequest.requestDetails.length; i++) {
        if (el.target.id === this.requests.selectedRequest.requestDetails[i].productId) {
          if (this.requests.selectedRequest.requestDetails[i]._id) {
            if (this.requests.selectedRequest.requestDetails[i].requestStatus == this.config.ASSIGNED_REQUEST_CODE) {
              return this.dialog.showMessage("That request has already been assigned and cannot be deleted?", "Cannot Delete Request", ['Ok']).whenClosed(response => {});
            } else {
              return this.dialog.showMessage("Are you sure you want to delete that request?", "Delete Request", ['Yes', 'No']).whenClosed(response => {
                if (!response.wasCancelled) {
                  this.requests.selectedRequest.requestDetails[i].delete = true;
                }
              });
            }
            break;
          } else {
            this.requests.selectedRequest.requestDetails.splice(i, 1);
            // this.requiredDates.splice(i,1);
            for (var j = 0; j < this.productInfo.length; j++) {
              if (el.target.id == this.productInfo[j].productId) {
                this.productInfo.splice(j, 1);
                break;
              }
            }
            break;
          }
        }
      }
    }
  }
  showCurriculum(product, $event) {
    this.productInfoObject = this.products.getProductInfo(product._id);
    if (this.productInfoObject) $("#curriculumInfo").css("display", "block");
  }
  hideCurriculum() {
    $("#curriculumInfo").css("display", "none");
  }
  _setUpValidation() {
    this.validation.addRule(1, "course", [{
      "rule": "custom",
      "message": "Select a course",
      "valFunction": function (context) {
        if (context.requestType === "sandboxCourse") {
          return true;
        } else {
          return !(context.courseId == -1);
        }
      }
    }]);
    this.validation.addRule(1, "session", [{
      "rule": "custom",
      "message": "Select a session",
      "valFunction": function (context) {
        return !(context.sessionId == -1);
      }
    }]);
    this.validation.addRule(1, "startDateError", [{
      "rule": "required",
      "message": "Select a date",
      "value": "requests.selectedRequest.startDate"
    }]);
    this.validation.addRule(1, "endDateError", [{
      "rule": "required",
      "message": "Select a date",
      "value": "requests.selectedRequest.endDate"
    }]);
    this.validation.addRule(1, "requestType", [{
      "rule": "custom",
      "message": "Select a request type",
      "valFunction": function (context) {
        return !(context.requestType == -1);
      }
    }]);
    this.validation.addRule(1, "numberOfStudentsError", [{
      "rule": "custom",
      "message": "Enter either the number of undergradate or graduate students",
      "valFunction": function (context) {
        if (context.requestType === "sandboxCourse") {
          return true;
        } else if (context.requests.selectedRequest.undergradIds == 0 && context.requests.selectedRequest.graduateIds == 0) {
          return false;
        } else {
          return true;
        }
      }
    }]);
    this.validation.addRule(2, "productList", [{
      "rule": "custom",
      "message": "Select at least one product",
      "valFunction": function (context) {
        if (context.requests.selectedRequest.requestDetails.length === 0) {
          return false;
        } else {
          return true;
        }
      }
    }]);
    this.validation.addRule(4, "productListTable", [{
      "rule": "custom",
      "message": "Enter all required dates",
      "valFunction": function (context) {
        for (var i = 0; i < context.requests.selectedRequest.requestDetails.length; i++) {
          if (!context.requests.selectedRequest.requestDetails[i].requiredDate || context.requests.selectedRequest.requestDetails[i].requiredDate === "" || moment__WEBPACK_IMPORTED_MODULE_16___default()(context.requests.selectedRequest.requestDetails[i].requiredDate).isBefore(context.minStartDate)) {
            return false;
          }
        }
        return true;
      }
    }, {
      "rule": "custom",
      "message": "Required date cannot be earlier than 5 days from today",
      "valFunction": function (context) {
        var nowPlusLeeway = moment__WEBPACK_IMPORTED_MODULE_16___default()(new Date()).add(context.config.REQUEST_LEEWAY + 1, 'days');
        var minRequiredDate = moment__WEBPACK_IMPORTED_MODULE_16___default().max(nowPlusLeeway, moment__WEBPACK_IMPORTED_MODULE_16___default()(context.sessions.selectedSession.startDate));
        for (var i = context.existingRequestLength; i < context.requests.selectedRequest.requestDetails.length; i++) {
          if (moment__WEBPACK_IMPORTED_MODULE_16___default()(context.requests.selectedRequest.requestDetails[i].requiredDate).isBefore(minRequiredDate, 'day')) {
            return false;
          }
        }
        return true;
      }
    }]);
    this.validation.addRule(5, "number", [{
      "rule": "required",
      "message": "Enter the course number",
      "value": "people.selectedCourse.number"
    }, {
      "rule": "required",
      "message": "Enter the course name",
      "value": "people.selectedCourse.name"
    }]);
  }
  _buildRequest() {
    if (this.existingRequest && this.userObj._id) {
      let changes = this.requests.isRequestDirty(this.originalRequest, ['personId', 'requestDetailsToSave']);
      this.requests.selectedRequest.requestDetailsToSave = this.requests.selectedRequest.requestDetails;
      this.requests.selectedRequest.requestDetailsToSave.forEach((item, index) => {
        if (item.requestStatus != this.config.ASSIGNED_REQUEST_CODE) item.requestStatus = this.config.UPDATED_REQUEST_CODE;
      });
      changes.forEach(item => {
        if (item.property === 'requestDetails') {
          item.oldValue = "";
          this.originalRequest.requestDetails.forEach(item2 => {
            this.products.selectedProductFromId(item.productId);
            item.oldValue += this.products.selectedProduct.name + " ";
          });
          item.newValue = "";
          this.requests.selectedRequest.requestDetails.forEach(item2 => {
            this.products.selectedProductFromId(item.productId);
            item.newValue += this.products.selectedProduct.name + " ";
          });
        }
        this.requests.selectedRequest.audit.push({
          personId: this.userObj._id,
          property: item.property,
          oldValue: item.oldValue,
          newValue: item.newValue
        });
      });
    } else {
      this.requests.selectedRequest.audit[0].personId = this.userObj._id;
    }

    // this.requests.selectedRequest.requestDetails.forEach((item, index) => {
    //   if(!item.requiredDate){
    //      this.requests.selectedRequest.requestDetails[index].requiredDate = this.requiredDates[index];
    //   }
    // });

    this.requests.selectedRequest.institutionId = this.userObj.institutionId._id;
    this.requests.selectedRequest.sessionId = this.sessionId;
    this.requests.selectedRequest.courseId = this.courseId;
    this.requests.selectedRequest.personId = this.userObj._id;
    this.requests.selectedRequest.requestStatus = this.config.UPDATED_REQUEST_CODE;
  }
  async save() {
    if (this.validation.validate(1)) {
      this._buildRequest();
      let email = this._buildEmailObject();
      let serverResponse = await this.requests.saveRequest(email);
      if (!serverResponse.status) {
        this.systemSelected = false;
        this.utils.showNotification("Product request " + serverResponse.clientRequestNo + " was updated");
      }
    }
    this._cleanUp();
  }
  _buildEmailObject() {
    var mailObject = new Object();
    if (this.config.SEND_EMAILS) {
      mailObject.products = new Array();
      this.requests.selectedRequest.requestDetails.forEach((detail, index) => {
        this.products.selectedProductFromId(detail.productId);
        var date = new Date(detail.requiredDate);
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        mailObject.products.push({
          id: detail.productId,
          requiredDate: month + "/" + day + "/" + year,
          name: this.products.selectedProduct.name
        });
      });
      let course = this.people.selectedCourse ? this.people.selectedCourse.name : 'Trial Client';
      mailObject.MESSAGE = this.config.CLIENT_REQUEST_CREATED_TOP.replace('[CUSTOMER]', this.userObj.fullName).replace('[SESSION]', this.sessions.selectedSession.session).replace('[COURSE]', course);
      mailObject.BOTTOM = this.config.CLIENT_REQUEST_CREATED_BOTTOM;
      // mailObject.comments = this.requests.selectedRequest.comments;
      // mailObject.name = this.userObj.fullName;
      mailObject.numStudents = parseInt(this.requests.selectedRequest.undergradIds) + parseInt(this.requests.selectedRequest.graduateIds);
      mailObject.email = this.userObj.email;
      mailObject.cc = this.config.REQUESTS_EMAIL_LIST ? this.config.REQUESTS_EMAIL_LIST : "";
    }
    return mailObject;
  }
  _cleanUp() {
    this._unLock();
    this.requests.selectRequest();
    this.productInfo = new Array();
    this.sessionSelected = false;
    this.typeSelected = false;
    this.sandBoxClient = false;
    this.courseSelected = false;
    this.courseId = "-1";
    this.sessionId = -1;
    this.requestType = -1;
    $("#existingRequestInfo").hide();
    $('.wizard').wizard('selectedItem', {
      step: 1
    });
  }

  //Courses
  async openEditCourseForm() {
    if (!this.showCourses) await this.refreshCourses();
    this.showCourses = !this.showCourses;
  }
  async refreshCourses() {
    await this.people.getCoursesArray(true, '?filter=personId|eq|' + this.userObj._id + '&order=number');
  }
  editACourse() {
    if (this.courseId != -1) {
      this.editCourse = true;
      $("#number").focus();
    }
  }
  newCourse() {
    this.editCourseIndex = -1;
    this.people.selectCourse();
    $("#number").focus();
    this.editCourse = true;
  }
  async saveCourse() {
    if (this.validation.validate(5)) {
      if (this.userObj._id) {
        // if (this.people.selectedCourse._id) this.editCourseIndex = this.baseArray.length;
        this.people.selectedCourse.personId = this.userObj._id;
        let serverResponse = await this.people.saveCourse();
        if (!serverResponse.status) {
          this.utils.showNotification("The course was updated");
        }
        this.editCourse = false;
      }
    }
  }
  cancelEditCourse() {
    this.editCourse = false;
  }
  async _lock() {
    var response = await this.requests.getRequestLock(this.requests.selectedRequest._id);
    if (!response.error) {
      if (response.requestId === 0) {
        //Lock help ticket
        this.requests.lockRequest({
          requestId: this.requests.selectedRequest._id,
          personId: this.userObj._id
        });
        this.showLockMessage = false;
        this.lockObject = {};
      } else {
        if (response[0].personId !== this.userObj._id) {
          this.lockObject = response[0];
          this.showLockMessage = true;
        }
      }
    }
  }
  _unLock() {
    if (this.ILockedIt) {
      if (this.requests.selectedRequest._id) {
        this.showLockMessage = false;
        this.requests.removeRequestLock(this.requests.selectedRequest._id);
      }
    }
  }
  toolTips() {
    $('[data-toggle="tooltip"]').tooltip();
  }
}) || _class);

/***/ }),

/***/ "modules/user/requests/viewProducts":
/*!***************************************************!*\
  !*** ./src/modules/user/requests/viewProducts.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ViewProducts: function() { return /* binding */ ViewProducts; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../resources/utils/dataTable */ 6847);
/* harmony import */ var _resources_data_products__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../resources/data/products */ 8666);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../config/appConfig */ 1666);
var _dec, _class;




let ViewProducts = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_config_appConfig__WEBPACK_IMPORTED_MODULE_3__.AppConfig, _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_1__.DataTable, _resources_data_products__WEBPACK_IMPORTED_MODULE_2__.Products), _dec(_class = class ViewProducts {
  constructor(config, datatable, products) {
    this.config = config;
    this.dataTable = datatable;
    this.dataTable.initialize(this);
    this.products = products;
    this.userObj = JSON.parse(sessionStorage.getItem('user'));
  }
  async activate() {
    let responses = await Promise.all([this.products.getProductsArray('?filter=active|eq|true&order=name', true), this.config.getConfig()]);
    //  this.dataTable.updateArray(this.products.productsArray);
    this.filterList();
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
  showCurriculum(product, $event) {
    this.productInfoObject = this.products.getProductInfo(product._id);
    if (this.productInfoObject) $("#curriculumInfo").css("display", "block");
  }
  hideCurriculum() {
    $("#curriculumInfo").css("display", "none");
  }
}) || _class);

/***/ }),

/***/ "modules/user/requests/viewRequests":
/*!***************************************************!*\
  !*** ./src/modules/user/requests/viewRequests.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ViewRequests: function() { return /* binding */ ViewRequests; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var aurelia_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-router */ 6433);
/* harmony import */ var _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../resources/utils/dataTable */ 6847);
/* harmony import */ var _resources_data_sessions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../resources/data/sessions */ 2073);
/* harmony import */ var _resources_data_systems__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../resources/data/systems */ 4077);
/* harmony import */ var _resources_data_products__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../resources/data/products */ 8666);
/* harmony import */ var _resources_data_clientRequests__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../resources/data/clientRequests */ 5446);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../config/appConfig */ 1666);
/* harmony import */ var _resources_utils_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../resources/utils/utils */ 8741);
/* harmony import */ var _resources_data_people__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../resources/data/people */ 353);
/* harmony import */ var _resources_utils_validation__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../resources/utils/validation */ 2824);
/* harmony import */ var _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../resources/dialogs/common-dialogs */ 6545);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! moment */ 381);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_12__);
var _dec, _class;













let ViewRequests = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(aurelia_router__WEBPACK_IMPORTED_MODULE_1__.Router, _config_appConfig__WEBPACK_IMPORTED_MODULE_7__.AppConfig, _resources_utils_validation__WEBPACK_IMPORTED_MODULE_10__["default"], _resources_data_people__WEBPACK_IMPORTED_MODULE_9__.People, _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_2__.DataTable, _resources_utils_utils__WEBPACK_IMPORTED_MODULE_8__.Utils, _resources_data_sessions__WEBPACK_IMPORTED_MODULE_3__.Sessions, _resources_data_systems__WEBPACK_IMPORTED_MODULE_4__.Systems, _resources_data_products__WEBPACK_IMPORTED_MODULE_5__.Products, _resources_data_clientRequests__WEBPACK_IMPORTED_MODULE_6__.ClientRequests, _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_11__.CommonDialogs), _dec(_class = class ViewRequests {
  constructor(router, config, validation, people, datatable, utils, sessions, systems, products, requests, dialogs) {
    this.requestSelected = false;
    this.showLockMessage = false;
    this.showRequests = false;
    this.noRequests = true;
    this.statusClass = ["", "unassigned", "assigned", "", "customer"];
    this.navControl = "requestsNavButtons";
    this.spinnerHTML = "";
    this.lockObject = new Object();
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
    this.dialogs = dialogs;
    this.userObj = JSON.parse(sessionStorage.getItem('user'));
  }
  canActivate() {
    if (!this.userObj) {
      this.userObj = this.config.user;
      this.isUCC = this.userObj.userRole >= this.config.UCC_ROLE;
      if (!this.userObj) {
        this.utils.showNotification("Couldn't find your user information.  Try logging in again or call the UCC.", 'warning');
        this.router.navigate("home");
      }
    }
  }
  async activate() {
    $("#infoBox").fadeOut();
    $("#existingRequestInfo").fadeOut();
    let responses = await Promise.all([this.sessions.getSessionsArray('?order=startDate:DSC', true), this.people.getCoursesArray(true, "?filter=personId|eq|" + this.userObj._id), this.products.getProductsArray('?order=Category'), this.systems.getSystemsArray(), this.config.getConfig()]);
    this.people.coursesArray.push({
      _id: this.config.SANDBOX_ID,
      name: this.config.SANDBOX_NAME
    });
    this.sessions.sessionsArray = this.sessions.sessionsArray.filter(item => {
      return item.sessionStatus !== 'Next';
    });
    this.selectedSession = this.sessions.sessionsArray[0]._id;
    this.getRequests();
  }
  deactivate() {
    this._unLock();
  }
  async getRequests() {
    if (this.selectedSession) {
      this.sessions.selectSessionById(this.selectedSession);
      await this.requests.getClientRequestsArray('?filter=[and]sessionId|eq|' + this.selectedSession + ':personId|eq|' + this.userObj._id, true);
      if (this.requests.requestsArray && this.requests.requestsArray.length) {
        this.dataTable.updateArray(this.requests.requestsArray);
        this.noRequests = false;
      } else {
        this.noRequests = true;
      }
    }
  }
  async refresh() {
    await this._unLock();
    this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
    await this.getRequests();
    this.spinnerHTML = "";
  }
  async edit(product, el, index) {
    this.requestSelected = true;
    this.selectedDetailIndex = index;
    this.showDetails = true;
    this.requests.setTheSelectedRequestDetail(product);
    this.customerActionRequired = this.requests.selectedRequestDetail.requestStatus == this.config.CUSTOMER_ACTION_REQUEST_CODE;
    this.requests.selectRequstById(product.requestId);
    this.customerMessage = this.requests.selectedRequest.customerMessage ? this.requests.selectedRequest.customerMessage : "";
    this.sessions.selectSessionById(this.requests.selectedRequest.sessionId);
    this.products.selectedProductFromId(this.requests.selectedRequestDetail.productId);
    if (this.requests.selectedRequestDetail.assignments.length) {
      this.selectedAssignmentIndex = 0;
      this.systems.selectedSystemFromId(this.requests.selectedRequestDetail.assignments[this.selectedAssignmentIndex].systemId);
    }
    this.selectedRowAss = $("#assignmentTable").closest('tr');
    if (this.selectedRow) this.selectedRow.children().removeClass('info');
    this.selectedRow = $(el.target).closest('tr');
    this.selectedRow.children().addClass('info');
  }
  back() {
    this.requestSelected = false;
  }
  customerActionResponse(request, el) {
    if (request.requestStatus == this.config.CUSTOMER_ACTION_REQUEST_CODE) {
      this.requests.setSelectedRequest(request);
      this.showDetails = false;
      this.requestSelected = true;
      this.customerActionRequired = true;
      this.selectedDetailIndex = -1;
      this.customerMessage = request.customerMessage ? request.customerMessage : "";
      if (this.selectedRow) this.selectedRow.children().removeClass('info');
      this.selectedRow = $(el.target).closest('tr');
      this.selectedRow.children().addClass('info');
    }
  }
  async save() {
    if (!this.showLockMessage) {
      if (this._buildRequest()) {
        let serverResponse = await this.requests.saveRequest(this.config.SEND_EMAILS);
        if (!serverResponse.error) {
          this.getRequests();
          this.utils.showNotification("The request was updated");
        }
        this._cleanUp();
      }
    } else {
      this.utils.showNotification("The request is locked and can't be saved", 'warning');
    }
  }
  _buildRequest() {
    //Update the selected request to update
    this.requests.selectedRequest.requestDetails.forEach(item => {
      if (item.requestStatus != this.config.ASSIGNED_REQUEST_CODE) item.requestStatus = this.config.REPLIED_REQUEST_CODE;
      item.modifiedDate = new Date();
    });
    this.requests.selectedRequest.requestStatus = this.config.REPLIED_REQUEST_CODE;
    this.requests.selectedRequest.comments = '<div class="well">' + this.customerResponse + '</div><p>' + this.requests.selectedRequest.comments;
    this.requests.selectedRequest.audit.push({
      property: "Replied to Message",
      newValue: this.customerResponse,
      personId: this.userObj._id
    });
    this.requests.selectedRequest.requestDetailsToSave = new Array();
    this.requests.selectedRequest.requestDetailsToSave = this.requests.selectedRequest.requestDetails;
    this.requests.selectedRequest.requestDetails = new Array();
    this.requests.selectedRequest.requestDetailsToSave.forEach(item => {
      this.requests.selectedRequest.requestDetails.push(item._id);
    });
    return true;
  }
  delete() {
    return this.dialogs.showMessage("Are you sure you want to delete that request?", "Delete Request", ['Yes', 'No']).whenClosed(response => {
      if (!response.wasCancelled) {
        this.deleteRequest();
      }
    });
  }
  async deleteRequest() {
    this.requests.selectedRequest.requestDetails[this.selectedDetailIndex].delete = true;
    this.requests.selectedRequest.audit.push({
      property: "Deleted Product",
      newValue: this.requests.selectedRequest.requestDetails[this.selectedDetailIndex].productId,
      personId: this.userObj._id
    });
    this.requests.selectedRequest.requestDetailsToSave = new Array();
    this.requests.selectedRequest.requestDetailsToSave = this.requests.selectedRequest.requestDetails;
    this.requests.selectedRequest.requestDetails = new Array();
    this.requests.selectedRequest.requestDetailsToSave.forEach(item => {
      this.requests.selectedRequest.requestDetails.push(item._id);
    });
    var flushRequestArray = false;
    if (this.requests.selectedRequest.requestDetails.length === 1) flushRequestArray = true;
    let serverResponse = await this.requests.saveRequest(this.config.SEND_EMAILS);
    if (!serverResponse.error) {
      if (flushRequestArray) {
        this.requests.requestsArray = new Array();
        this.dataTable.updateArray(this.requests.requestsArray);
      } else {
        this.getRequests();
      }
      this.utils.showNotification("The request was deleted");
    }
    this._cleanUp();
  }
  _cleanUp() {
    this.requestSelected = false;
    this.customeResponse = "";
  }
  selectAssignment(assign, index, el) {
    this.selectedAssignmentIndex = index;
    this.systems.selectedSystemFromId(assign.systemId);
    if (this.selectedRowAss) this.selectedRowAss.children().removeClass('info');
    this.selectedRowAss = $(el.target).closest('tr');
    this.selectedRowAss.children().addClass('info');
  }
  cancel() {
    this.requests.selectRequest(0);
  }
  changeBeginDate(evt) {
    this.minEndDate = moment__WEBPACK_IMPORTED_MODULE_12___default()(evt.detail.event.date).format("MM/DD/YYYY");
    this.requests.selectedRequest.endDate = moment__WEBPACK_IMPORTED_MODULE_12___default().max(moment__WEBPACK_IMPORTED_MODULE_12___default()(this.requests.selectedRequest.startDate).format("MM/DD/YYYY"), moment__WEBPACK_IMPORTED_MODULE_12___default()(this.requests.selectedRequest.endDate).format("MM/DD/YYYY")).format("MM/DD/YYYY");
  }
  async _lock() {
    var response = await this.requests.getRequestLock(this.requests.selectedRequest._id);
    if (!response.error) {
      if (response.requestId === 0) {
        //Lock help ticket
        this.requests.lockRequest({
          requestId: this.requests.selectedRequest._id,
          personId: this.userObj._id
        });
        this.showLockMessage = false;
        this.lockObject = {};
      } else {
        this.lockObject = response[0];
        this.showLockMessage = true;
      }
    }
  }
  _unLock() {
    if (!this.showLockMessage) {
      if (this.requests.selectedRequest && this.requests.selectedRequest._id) {
        this.showLockMessage = false;
        this.requests.removeRequestLock(this.requests.selectedRequest._id);
      }
    }
  }
}) || _class);

/***/ }),

/***/ "modules/user/support/createHelpTicketsWiz":
/*!**********************************************************!*\
  !*** ./src/modules/user/support/createHelpTicketsWiz.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CreateHelpTickets: function() { return /* binding */ CreateHelpTickets; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _resources_utils_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../resources/utils/utils */ 8741);
/* harmony import */ var _resources_data_sessions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../resources/data/sessions */ 2073);
/* harmony import */ var _resources_data_downloads__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../resources/data/downloads */ 9132);
/* harmony import */ var _resources_data_products__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../resources/data/products */ 8666);
/* harmony import */ var _resources_data_systems__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../resources/data/systems */ 4077);
/* harmony import */ var _resources_data_helpTickets__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../resources/data/helpTickets */ 8142);
/* harmony import */ var _resources_data_clientRequests__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../resources/data/clientRequests */ 5446);
/* harmony import */ var _resources_data_people__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../resources/data/people */ 353);
/* harmony import */ var _resources_utils_validation__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../resources/utils/validation */ 2824);
/* harmony import */ var _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../resources/utils/dataTable */ 6847);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../config/appConfig */ 1666);
/* harmony import */ var _resources_data_siteInfo__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../resources/data/siteInfo */ 1290);
/* harmony import */ var fuelux__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! fuelux */ 9424);
/* harmony import */ var fuelux__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(fuelux__WEBPACK_IMPORTED_MODULE_13__);
var _dec, _class;














let CreateHelpTickets = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_resources_data_sessions__WEBPACK_IMPORTED_MODULE_2__.Sessions, _resources_data_downloads__WEBPACK_IMPORTED_MODULE_3__.Downloads, _resources_data_helpTickets__WEBPACK_IMPORTED_MODULE_6__.HelpTickets, _resources_utils_validation__WEBPACK_IMPORTED_MODULE_9__["default"], _resources_utils_utils__WEBPACK_IMPORTED_MODULE_1__.Utils, _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_10__.DataTable, _config_appConfig__WEBPACK_IMPORTED_MODULE_11__.AppConfig, _resources_data_people__WEBPACK_IMPORTED_MODULE_8__.People, _resources_data_clientRequests__WEBPACK_IMPORTED_MODULE_7__.ClientRequests, _resources_data_products__WEBPACK_IMPORTED_MODULE_4__.Products, _resources_data_systems__WEBPACK_IMPORTED_MODULE_5__.Systems, _resources_data_siteInfo__WEBPACK_IMPORTED_MODULE_12__.SiteInfo, aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.TemplatingEngine), _dec(_class = class CreateHelpTickets {
  constructor(sessions, apps, helpTickets, validation, utils, datatable, config, people, clientRequests, products, systems, site, templatingEngine) {
    this.showInfoBox = false;
    this.courseSelected = false;
    this.showHelpTicketDescription = false;
    this.showInputForm = false;
    this.showRequests = false;
    this.inputForm = null;
    this.showTypes = false;
    this.inputHTML = "";
    this.filesSelected = void 0;
    this.selectedFiles = void 0;
    this.removedFiles = new Array();
    this.test = true;
    this.showAdditionalInfo = false;
    this.sessions = sessions;
    this.apps = apps;
    this.helpTickets = helpTickets;
    this.people = people;
    this.utils = utils;
    this.validation = validation;
    this.validation.initialize(this);
    this.dataTable = datatable;
    this.dataTable.initialize(this);
    this.config = config;
    this.clientRequests = clientRequests;
    this.products = products;
    this.systems = systems;
    this.site = site;
    this.templatingEngine = templatingEngine;
    this.userObj = JSON.parse(sessionStorage.getItem('user'));
  }
  canActivate() {
    if (!this.userObj) {
      this.userObj = this.config.user;
      this.isUCC = this.userObj.userRole >= this.config.UCC_ROLE;
      if (!this.userObj) {
        this.utils.showNotification("Couldn't find your user information.  Try logging in again or call the UCC.", 'warning');
        this.router.navigate("home");
      }
    }
  }
  attached() {
    // $('[data-toggle="tooltip"]').tooltip();
    var wizard = $('.wizard').wizard();
    var that = this;
    wizard.on('actionclicked.fu.wizard', (e, data) => {
      that.step = data.step;
      if (data.direction !== "previous") {
        if (!that.validation.validate(data.step)) {
          e.preventDefault();
        } else if (data.step === 2) {
          that.createInputForm(this.helpTickets.helpTicketTypesArray[this.catIndex].subtypes[this.selectedHelpTicketType].inputForm);
          this.setupValidation(this.helpTickets.helpTicketTypesArray[this.catIndex].subtypes[this.selectedHelpTicketType].validation);
          // $("#comments").focus();
        } else if (data.step === 3) {
          setTimeout(() => {
            $(".note-editable:first").focus().scroll();
          }, 500);
        } else if (data.step === 4) {
          this.outputForm = this.helpTickets.helpTicketTypesArray[this.catIndex].subtypes[this.selectedHelpTicketType].outputForm;
          this.createOutputForm(this.outputForm);
        } else if (data.step === 5) {
          that.save();
        }
      } else {
        that.validation.makeAllValid(data.step);
      }
    });
  }
  async activate() {
    let responses = await Promise.all([this.helpTickets.getHelpTicketTypes('?order=category'), this.sessions.getSessionsArray('?filter=[or]sessionStatus|Active:Requests&order=startDate', true), this.people.getCoursesArray(true, '?filter=personId|eq|' + this.userObj._id + '&order=number'), this.apps.getDownloadsArray(true, '?filter=helpTicketRelevant[eq]true&order=name'), this.systems.getSystemsArray(), this.config.getConfig(), this.site.getMessageArray('?filter=category|eq|HELP_TICKETS', true)]);
    this._setUpValidation();
    this.initialize();
    this.sendEmail = this.config.SEND_EMAILS;
    this.appsArray = this.apps.appDownloadsArray.filter(item => {
      return item.helpTicketRelevant;
    });
    this.editorMessage = this.getMessage('EDITOR_DESCRIPTION_MESSAGE');
    this.fileUploadMessage = this.getMessage('FILE_UPLOAD_DESCRIPTION');
    this.stepsMessage = this.getMessage('RECREATE_STEPS');
  }
  initialize() {
    this.helpTickets.selectHelpTicket();
  }
  async categoryChanged() {
    this.catIndex = this.getCategoryIndex();
    await this.getActiveRequests();
    this.showTypes = true;
  }
  getCategoryIndex() {
    var index = 0;
    this.helpTickets.helpTicketTypesArray.forEach((item, categoryIndex) => {
      if (this.helpTickets.selectedHelpTicket.helpTicketCategory == item.category) {
        index = categoryIndex;
      }
    });
    return index;
  }

  // /*****************************************************************************************
  // * The user selected a request
  // *****************************************************************************************/
  async requestChosen(el, index) {
    this.showAdditionalInfo = true;
    if (this.SelectedClientRequest && this.SelectedClientRequest._id === this.clientRequestsArray[index]._id) {
      this.SelectedClientRequest = undefined;
      this.selectedSessionId = undefined;
      if (this.selectedProductRow) this.selectedProductRow.children().removeClass('info');
    } else {
      this.SelectedClientRequest = this.clientRequestsArray[index];
      this.selectedSessionId = this.clientRequestsArray[index].sessionId;
      if (this.selectedProductRow) this.selectedProductRow.children().removeClass('info');
      this.selectedProductRow = $(el.target).closest('tr');
      this.selectedProductRow.children().addClass('info');
    }
  }
  typeChanged() {
    this.selectedHelpTicketType = this.getTypeIndex();
    this.requestsRequired = this.helpTickets.helpTicketTypesArray[this.catIndex].requestsRequired;
    this.descriptionRequired = this.helpTickets.helpTicketTypesArray[this.catIndex].subtypes[this.selectedHelpTicketType].descriptionRequired;
    this.showForm = true;
  }
  getTypeIndex() {
    var typeIndex = 0;
    this.helpTickets.helpTicketTypesArray[this.catIndex].subtypes.forEach((item, typIndex) => {
      if (this.helpTickets.selectedHelpTicket.helpTicketType == item.type) {
        typeIndex = typIndex;
      }
    });
    return typeIndex;
  }
  async getActiveRequests() {
    var sessions = "";
    this.sessions.sessionsArray.forEach(item => {
      sessions += item._id + ":";
    });
    sessions = sessions.substring(0, sessions.length - 1);
    await this.clientRequests.getActiveClientRequestsArray(this.userObj._id, sessions);
    this.originalClientRequestsArray = new Array();
    this.clientRequestsArray = new Array();
    //Cycle through request array
    this.clientRequests.requestsArray.forEach(item => {
      //Cycle through details of request
      item.requestDetails.forEach(item2 => {
        //If there are assignments
        if (item2.assignments && item2.assignments.length > 0) {
          //Cycle through the assignments
          item2.assignments.forEach(assign => {
            this.originalClientRequestsArray.push({
              productId: item2.productId,
              productName: item2.productId.name,
              sessionId: item.sessionId,
              requestStatus: item2.requestStatus,
              systemId: assign.systemId,
              courseName: item.courseId ? item.courseId.name : 'Trial Client',
              courseId: item.courseId ? item.courseId._id : null,
              client: assign.client,
              clientId: assign.clientId,
              _id: item2._id
            });
          });
        } else {
          this.originalClientRequestsArray.push({
            productName: item2.productId.name,
            sessionId: item.sessionId,
            requestStatus: item2.requestStatus,
            courseName: item.courseId ? item.courseId.name : 'Trial Client',
            _id: item2._id
          });
        }
      });
    });
    this.originalClientRequestsArray.forEach(item => {
      this.clientRequestsArray.push(item);
    });
  }

  // /*****************************************************************************************
  // * Save the help ticket
  // *****************************************************************************************/
  async save() {
    await this.buldHelpTicket();
    var email = new Object();
    if (this.sendEmail) {
      email.MESSAGE = this.config.HELP_TICKET_CREATED_MESSAGE;
      email.INSTRUCTIONS = this.config.HELP_TICKET_INSTRUCTIONS;
      email.subject = this.config.HELP_TICKET_CREATED_SUBJECT.replace('[[faculty name]]', this.userObj.fullName);
      email.email = this.userObj.email;
      email.helpTicketNo = 0;
      email.cc = this.config.HELP_TICKET_EMAIL_LIST ? this.config.HELP_TICKET_EMAIL_LIST : "";
    }
    let serverResponse = await this.helpTickets.saveHelpTicket(email);
    if (!serverResponse.status) {
      this.utils.showNotification("Help ticket number " + serverResponse.helpTicketNo + " was created");
      if (this.filesToUpload && this.filesToUpload.length > 0) {
        this.helpTickets.uploadFile(this.filesToUpload, serverResponse.content[0]._id, this.helpTickets.selectedHelpTicket);
      }
    }
    this._cleanUp();
  }

  // /*****************************************************************************************
  // * Prepare the help ticket to submit to the server
  // *****************************************************************************************/
  async buldHelpTicket() {
    this.helpTickets.selectedHelpTicket.owner = [{
      "personId": "b1b1b1b1b1b1b1b1b1b1b1b1",
      "date": new Date()
    }];
    this.helpTickets.selectedHelpTicket.personId = this.userObj._id;
    this.helpTickets.selectedHelpTicket.institutionId = this.userObj.institutionId._id;
    this.helpTickets.selectedHelpTicket.sessionId = this.selectedSessionId;
    if (!this.SelectedClientRequest || !this.SelectedClientRequest._id) {
      //If the help ticket type doesn't require a course, insert a dummy courseId
      this.helpTickets.selectedHelpTicket.courseId = 'b1b1b1b1b1b1b1b1b1b1b1b1';
    } else {
      this.helpTickets.selectedHelpTicket.requestId = this.SelectedClientRequest._id;
      this.helpTickets.selectedHelpTicket.systemId = this.SelectedClientRequest.systemId;
      this.helpTickets.selectedHelpTicket.client = this.SelectedClientRequest.client;
      this.helpTickets.selectedHelpTicket.productId = this.SelectedClientRequest.productId;
      this.helpTickets.selectedHelpTicket.courseId = this.SelectedClientRequest.courseId;
    }
    this.helpTickets.selectedHelpTicketContent.personId = this.userObj._id;
    this.helpTickets.selectedHelpTicketContent.type = this.helpTickets.selectedHelpTicket.helpTicketType;
    // this.helpTickets.selectedHelpTicketContent.displayForm = this.inputForm;
    this.helpTickets.selectedHelpTicket.content.push(this.helpTickets.selectedHelpTicketContent);
  }
  _cleanUp() {
    this.showTypes = false;
    // this.helpTicketTypeMessage = undefined;
    // this.showAdditionalInfo = false;
    // this.helpTickets.selectHelpTicket();
    this.helpTickets.selectHelpTicketContent();
    this.clearTables();
    this.filesToUpload = new Array();
    this.showDetails = false;
    this.initialize();
    $('.wizard').wizard('selectedItem', {
      step: 1
    });
  }

  // /*****************************************************************************************
  // * Remove styling from selected rows on tables
  // *****************************************************************************************/
  clearTables() {
    if (this.selectedCourseRow) this.selectedCourseRow.children().removeClass('rowSelected');
    if (this.selectedProductRow) this.selectedProductRow.children().removeClass('rowSelected');
  }
  _setUpValidation() {
    this.validation.addRule(1, "helpTicketCategory", [{
      "rule": "custom",
      "message": "Select a category",
      "valFunction": function (context) {
        return !(context.helpTickets.selectedHelpTicket.helpTicketCategory == -1);
      }
    }]);
    this.validation.addRule(1, "helpTicketType", [{
      "rule": "custom",
      "message": "Select a type",
      "valFunction": function (context) {
        return !(context.helpTickets.selectedHelpTicket.helpTicketType == -1);
      }
    }]);
    this.validation.addRule(2, "selectProductRequestError", [{
      "rule": "custom",
      "message": "Select a product request",
      "valFunction": function (context) {
        if (context.requestsRequired) {
          return context.SelectedClientRequest;
        } else {
          return true;
        }
      }
    }]);
    this.validation.addRule(4, "descriptionErrorMessage", [{
      "rule": "custom",
      "message": "Enter a description of the problem",
      "valFunction": function (context) {
        return !context.descriptionRequired || context.helpTickets.selectedHelpTicketContent.content.comments;
      }
    }]);
  }
  setupValidation(rules) {
    this.validation.clearRuleGroup(3);
    rules.forEach(item => {
      this.validation.addRule(3, item.control, [{
        "rule": item.rule,
        "message": item.message,
        "value": item.value
      }]);
    });
  }
  getMessage(messageKey) {
    for (var i = 0; i < this.site.messageArray.length; i++) {
      if (this.site.messageArray[i].key === messageKey) return this.site.messageArray[i].content;
    }
    return "";
  }
  createInputForm(html) {
    $('#container').html(html);
    let extendedInput = $('.extend');
    for (let i = 0; i < extendedInput.length; i++) {
      this.helpTickets.selectedHelpTicketContent.content[$(extendedInput[i]).attr('id')] = "";
    }
    let el = document.getElementById('container');
    if (el) {
      if (!el.querySelectorAll('.au-target').length) {
        this.templatingEngine.enhance({
          element: el,
          bindingContext: this
        });
      }
    }
  }
  createOutputForm(html) {
    html = html.split('selectedHelpTicket.content[0]').join('selectedHelpTicketContent');
    // html = html.replace('selectedHelpTicket.content[0]','selectedHelpTicketContent');
    let el = document.getElementById('outputContainer');
    el.innerHTML = html;
    if (el) {
      if (!el.querySelectorAll('.au-target').length) {
        this.templatingEngine.enhance({
          element: el,
          bindingContext: this
        });
      }
    }
  }
  toggleField(el) {
    this.helpTickets.selectedHelpTicketContent.content[$(el.target).parent().attr('id')] = !this.helpTickets.selectedHelpTicketContent.content[$(el.target).parent().attr('id')];
  }

  // /*****************************************************************************************
  // * THe user selected files to upload to update the ineterface with the file names
  // *****************************************************************************************/
  changeFiles() {
    this.filesToUpload = this.filesToUpload ? this.filesToUpload : new Array();
    for (var i = 0; i < this.files.length; i++) {
      let addFile = true;
      this.filesToUpload.forEach(item => {
        if (item.name === this.files[i].name) addFile = false;
      });
      if (addFile) this.filesToUpload.push(this.files[i]);
    }
  }
  removeFile(index) {
    this.filesToUpload.splice(index, 1);
  }
}) || _class);

/***/ }),

/***/ "modules/user/support/curriculum":
/*!************************************************!*\
  !*** ./src/modules/user/support/curriculum.js ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CurrInfo: function() { return /* binding */ CurrInfo; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../resources/utils/dataTable */ 6847);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../config/appConfig */ 1666);
/* harmony import */ var _resources_utils_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../resources/utils/utils */ 8741);
/* harmony import */ var _resources_data_curriculum__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../resources/data/curriculum */ 7701);
/* harmony import */ var _resources_data_products__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../resources/data/products */ 8666);
var _dec, _class;






let CurrInfo = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_1__.DataTable, _resources_data_curriculum__WEBPACK_IMPORTED_MODULE_4__.Curriculum, _resources_data_products__WEBPACK_IMPORTED_MODULE_5__.Products, _config_appConfig__WEBPACK_IMPORTED_MODULE_2__.AppConfig, _resources_utils_utils__WEBPACK_IMPORTED_MODULE_3__.Utils), _dec(_class = class CurrInfo {
  constructor(datatable, curriculum, products, config, utils) {
    this.curriculumItemSelected = false;
    this.spinnerHTML = "";
    this.curriculumContent = " ";
    this.newItem = false;
    this.curriculumSelected = false;
    this.addComment = false;
    this.description = "";
    this.comment = "";
    this.dataTable = datatable;
    this.dataTable.initialize(this);
    this.utils = utils;
    this.curriculum = curriculum;
    this.products = products;
    this.config = config;
    this.userObj = JSON.parse(sessionStorage.getItem('user'));
  }
  canActivate() {
    if (!this.userObj) {
      this.userObj = this.config.user;
      this.isUCC = this.userObj.userRole >= this.config.UCC_ROLE;
      if (!this.userObj) {
        this.utils.showNotification("Couldn't find your user information.  Try logging in again or call the UCC.", 'warning');
        this.router.navigate("home");
      }
    }
  }
  attached() {
    $('[data-toggle="tooltip"]').tooltip();
  }
  async activate() {
    let responses = await Promise.all([this.curriculum.getCurriculumCategoryArray(true, '?order=name'), this.curriculum.getCurriculumArray(true, '?order=sortOrder'), this.products.getProductsArray('?order=name', true), this.config.getConfig()]);
    this.curriculum.selectCurriculumCategory(0);
    this.curriculum.selectCurriculum();
    this.filterList();
  }
  filterList() {
    this.curriculumArray = this.curriculum.curriculumArray.filter(item => {
      return item.category === this.curriculum.selectedCurriculumCategory.name;
    });
  }
  typeChanged(index, el) {
    this.curriculum.selectCurriculumCategory(index);
    $("#buttonGroup").children().removeClass('menuButtons');
    $("#buttonGroup").children().css("background-color", "");
    $("#buttonGroup").children().css("color", "");
    $(el.target).css("background-color", this.config.BUTTONS_BACKGROUND);
    $(el.target).css("color", this.config.ACTIVE_SUBMENU_COLOR);
    this.filterList();
    this.curriculumSelected = false;
  }
  togglePanel(el) {
    let panel = $(el.target);
    if (!panel.hasClass('panel-collapsed')) {
      panel.parents('.panel').find('.panel-body').slideUp();
      panel.addClass('panel-collapsed');
      panel.find('i').removeClass('fa-chevron-up').addClass('fa-chevron-down');
    } else {
      panel.parents('.panel').find('.panel-body').slideDown();
      panel.removeClass('panel-collapsed');
      panel.find('i').removeClass('fa-chevron-down').addClass('fa-chevron-up');
    }
  }
  selectCurriculum(curriculum) {
    this.curriculum.selectCurriculumById(curriculum._id);
    this.curriculumSelected = true;
  }
  add() {
    this.addComment = true;
  }
  cancel() {
    this.addComment = false;
    this.comment = "";
  }
  async save() {
    if (this.comment) {
      if (!this.curriculum.selectedCurriculum.customerComments) {
        this.curriculum.selectedCurriculum.customerComments = new Array();
      }
      this.curriculum.selectedCurriculum.customerComments.unshift({
        authorEmail: this.userObj.email,
        comment: this.comment,
        dateCreated: new Date()
      });
      let serverResponse = await this.curriculum.save();
      this.addComment = false;
    }
  }
  back() {
    this.curriculumSelected = false;
  }
  rateCurriculum(el) {
    this.curriculum.selectCurriculumById(el.detail.id);
    this.curriculum.selectedCurriculum.rating = el.detail.rating;
    this.curriculum.selectedCurriculum.raters = this.curriculum.selectedCurriculum.raters ? this.curriculum.selectedCurriculum.raters + 1 : 0;
    let serverResponse = this.curriculum.save();
  }
}) || _class);

/***/ }),

/***/ "modules/user/support/downloads":
/*!***********************************************!*\
  !*** ./src/modules/user/support/downloads.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Download: function() { return /* binding */ Download; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../resources/utils/dataTable */ 6847);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../config/appConfig */ 1666);
/* harmony import */ var _resources_utils_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../resources/utils/utils */ 8741);
/* harmony import */ var _resources_data_downloads__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../resources/data/downloads */ 9132);
var _dec, _class;





let Download = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_1__.DataTable, _resources_data_downloads__WEBPACK_IMPORTED_MODULE_4__.Downloads, _resources_utils_utils__WEBPACK_IMPORTED_MODULE_3__.Utils, _config_appConfig__WEBPACK_IMPORTED_MODULE_2__.AppConfig), _dec(_class = class Download {
  constructor(datatable, downloads, utils, config) {
    this.navControl = "downloadsNavButtons";
    this.spinnerHTML = "";
    this.filterValues = new Array();
    this.dataTable = datatable;
    this.dataTable.initialize(this);
    this.utils = utils;
    this.downloads = downloads;
    this.config = config;
  }
  async activate() {
    await this.downloads.getDownloadsArray(true, "?filter=active|eq|true&order=name");
    await this.downloads.getDownloadCategoriesArray();
    this.updateArray();
    this.typeSelected = this.downloads.appCatsArray[0].downCatcode;
    this.filterList();
  }
  async refresh() {
    this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
    await this.downloads.getDownloadsArray(true);
    this.updateArray();
    this.spinnerHTML = "";
  }
  updateArray() {
    this.dataTable.updateArray(this.downloads.appDownloadsArray);
  }
  typeChanged(el) {
    if (el.target.id != "") {
      $("#buttonGroup").children().removeClass('menuButtons');
      $("#buttonGroup").children().css("background-color", "");
      $("#buttonGroup").children().css("color", "");
      $(el.target).css("background-color", this.config.BUTTONS_BACKGROUND);
      $(el.target).css("color", this.config.ACTIVE_SUBMENU_COLOR);
      this.typeSelected = el.target.id;
      this.filterList();
    }
  }
  filterList() {
    this.dataTable.filterList(this.typeSelected, {
      type: 'value',
      filter: "downCatcodeFilter",
      collectionProperty: 'downCatcode',
      compare: 'match'
    });
  }
}) || _class);

/***/ }),

/***/ "modules/user/support/links":
/*!*******************************************!*\
  !*** ./src/modules/user/support/links.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UsefulInfo: function() { return /* binding */ UsefulInfo; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var aurelia_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-router */ 6433);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../config/appConfig */ 1666);
/* harmony import */ var _resources_data_siteInfo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../resources/data/siteInfo */ 1290);
/* harmony import */ var _resources_utils_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../resources/utils/utils */ 8741);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! moment */ 381);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_5__);
var _dec, _class;






let UsefulInfo = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(aurelia_router__WEBPACK_IMPORTED_MODULE_1__.Router, _config_appConfig__WEBPACK_IMPORTED_MODULE_2__.AppConfig, _resources_data_siteInfo__WEBPACK_IMPORTED_MODULE_3__.SiteInfo, _resources_utils_utils__WEBPACK_IMPORTED_MODULE_4__.Utils), _dec(_class = class UsefulInfo {
  constructor(router, config, siteinfo, utils) {
    this.email = '';
    this.password = '';
    this.loginError = '';
    this.router = router;
    this.config = config;
    this.siteinfo = siteinfo;
    this.utils = utils;
  }
  async activate() {
    var currentDate = moment__WEBPACK_IMPORTED_MODULE_5___default()(new Date()).format("MM-DD-YYYY");
    var options = '?filter=[and]itemType|eq|ILNK:expiredDate|gt|' + currentDate + '&order=Category';
    await this.siteinfo.getInfoArray(true, options);
    this.linkArray = new Array();
    var category = "";
    for (var i = 0; i < this.siteinfo.siteArray.length; i++) {
      if (this.siteinfo.siteArray[i].category != category) {
        var obj = new Object();
        var j = i;
        obj.category = this.siteinfo.siteArray[i].category;
        category = this.siteinfo.siteArray[i].category;
        var objLinks = new Array();
        while (i < this.siteinfo.siteArray.length && this.siteinfo.siteArray[i].category == category) {
          objLinks.push(this.siteinfo.siteArray[i]);
          i++;
        }
        i--;
        obj.links = objLinks;
        this.linkArray.push(obj);
      }
    }
    ;
  }
}) || _class);

/***/ }),

/***/ "modules/user/support/support":
/*!*********************************************!*\
  !*** ./src/modules/user/support/support.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Support: function() { return /* binding */ Support; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var aurelia_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-router */ 6433);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../config/appConfig */ 1666);
var _dec, _class;



let Support = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(aurelia_router__WEBPACK_IMPORTED_MODULE_1__.Router, _config_appConfig__WEBPACK_IMPORTED_MODULE_2__.AppConfig), _dec(_class = class Support {
  constructor(router, config) {
    this.title = "Support";
    this.router = router;
    this.config = config;
    this.userObj = JSON.parse(sessionStorage.getItem('user'));
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
      route: ['', 'viewHelpTickets'],
      moduleId: './viewHelpTickets',
      settings: {
        auth: true,
        roles: []
      },
      nav: true,
      name: 'viewHelpTickets',
      title: 'View Help Tickets'
    }, {
      route: 'createHelpTickets',
      moduleId: './createHelpTicketsWiz',
      settings: {
        auth: true,
        roles: []
      },
      nav: true,
      name: 'createHelpTickets',
      title: 'Create Help Tickets'
    }, {
      route: 'downloads',
      moduleId: './downloads',
      settings: {
        auth: true,
        roles: []
      },
      nav: true,
      name: 'downloads',
      title: 'Downloads'
    }, {
      route: 'curriculum',
      moduleId: './curriculum',
      settings: {
        auth: true,
        roles: []
      },
      nav: true,
      name: 'curriculum',
      title: 'Curriculum'
    }, {
      route: 'links',
      moduleId: './links',
      settings: {
        auth: true,
        roles: []
      },
      nav: true,
      name: 'links',
      title: 'Useful Information'
    }]);
    this.router = router;
  }
}) || _class);

/***/ }),

/***/ "modules/user/support/viewHelpTickets":
/*!*****************************************************!*\
  !*** ./src/modules/user/support/viewHelpTickets.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ViewHelpTickets: function() { return /* binding */ ViewHelpTickets; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../resources/utils/dataTable */ 6847);
/* harmony import */ var _resources_data_helpTickets__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../resources/data/helpTickets */ 8142);
/* harmony import */ var _resources_data_sessions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../resources/data/sessions */ 2073);
/* harmony import */ var _resources_data_systems__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../resources/data/systems */ 4077);
/* harmony import */ var _resources_data_products__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../resources/data/products */ 8666);
/* harmony import */ var _resources_data_clientRequests__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../resources/data/clientRequests */ 5446);
/* harmony import */ var _resources_data_downloads__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../resources/data/downloads */ 9132);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../config/appConfig */ 1666);
/* harmony import */ var _resources_utils_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../resources/utils/utils */ 8741);
/* harmony import */ var _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../resources/dialogs/common-dialogs */ 6545);
/* harmony import */ var _resources_data_people__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../resources/data/people */ 353);
/* harmony import */ var _resources_utils_validation__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../resources/utils/validation */ 2824);
var _dec, _class;













let ViewHelpTickets = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_config_appConfig__WEBPACK_IMPORTED_MODULE_8__.AppConfig, _resources_utils_validation__WEBPACK_IMPORTED_MODULE_12__["default"], _resources_data_people__WEBPACK_IMPORTED_MODULE_11__.People, _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_1__.DataTable, _resources_utils_utils__WEBPACK_IMPORTED_MODULE_9__.Utils, _resources_data_helpTickets__WEBPACK_IMPORTED_MODULE_2__.HelpTickets, _resources_data_sessions__WEBPACK_IMPORTED_MODULE_3__.Sessions, _resources_data_systems__WEBPACK_IMPORTED_MODULE_4__.Systems, _resources_data_downloads__WEBPACK_IMPORTED_MODULE_7__.Downloads, _resources_data_products__WEBPACK_IMPORTED_MODULE_5__.Products, _resources_data_clientRequests__WEBPACK_IMPORTED_MODULE_6__.ClientRequests, _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_10__.CommonDialogs, aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.TemplatingEngine), _dec(_class = class ViewHelpTickets {
  constructor(config, validation, people, datatable, utils, helpTickets, sessions, systems, apps, products, requests, dialog, templatingEngine) {
    this.helpTicketSelected = false;
    this.enterResponse = false;
    this.responseMessage = "";
    this.isChecked = false;
    this.nohelpTickets = true;
    this.toolbar = void 0;
    this.spinnerHTML = "";
    this.filterValues = new Array();
    this.config = config;
    this.validation = validation;
    this.validation.initialize(this);
    this.people = people;
    this.dataTable = datatable;
    this.dataTable.initialize(this);
    this.utils = utils;
    this.helpTickets = helpTickets;
    this.sessions = sessions;
    this.systems = systems;
    this.apps = apps;
    this.products = products;
    this.requests = requests;
    this.dialog = dialog;
    this.templatingEngine = templatingEngine;
    this.userObj = JSON.parse(sessionStorage.getItem('user'));
    this.isUCC = this.userObj.userRole >= this.config.UCC_ROLE;
  }
  canActivate() {
    if (!this.userObj) {
      this.userObj = this.config.user;
      this.isUCC = this.userObj.userRole >= this.config.UCC_ROLE;
      if (!this.userObj) {
        this.utils.showNotification("Couldn't find your user information.  Try logging in again or call the UCC.", 'warning');
        this.router.navigate("home");
      }
    }
  }
  attached() {
    if (!this.mobile) this.toolTips();
  }
  deactivate() {
    // this._unLock();
  }
  async activate() {
    let uccRoles = "";
    this.config.ROLES.forEach(item => {
      if (item.UCConly) uccRoles += item.role + ":";
    });
    let responses = await Promise.all([this.helpTickets.getUserHelpTicketArray("?filter=personId|eq|" + this.userObj._id + "&order=modifiedDate:DSC", true), this.people.getUCCStaff(uccRoles), this.helpTickets.getHelpTicketTypes('?order=category'), this.products.getProductsArray('', true), this.sessions.getSessionsArray('?order=startDate', true), this.apps.getDownloadsArray(true, '?filter=helpTicketRelevant|eq|true&order=name'), this.systems.getSystemsArray(), this.config.getConfig()]);
    if (this.helpTickets.helpTicketsArray && this.helpTickets.helpTicketsArray.length > 0) {
      this.nohelpTickets = false;
    }
    this.people = this.people.uccPeople;
    this.updateArray();
    this.filterOutClosed();
    this.sendEmail = this.config.SEND_EMAILS;
    ;
    this.helpTicketTypeLookupArray = new Array();
    this.helpTickets.helpTicketTypesArray.forEach(item => {
      item.subtypes.forEach(item2 => {
        this.helpTicketTypeLookupArray.push({
          helpTicketType: item2.type,
          description: item2.description
        });
      });
    });
    this._setUpValidation();
    if (this.utils.isMobile()) {
      this.mobile = true;
      this.toolbar = [['style', ['style', 'bold', 'clear']]];
    }
  }
  async retrieveClosedHelpTickets() {
    await this.helpTickets.getArchivedHelpTicketArray("?filter=personId|eq|" + this.userObj._id + "&order=modifiedDate:DSC", true);
  }
  async refresh() {
    this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
    await this.helpTickets.getUserHelpTicketArray("?filter=personId|eq|" + this.userObj._id + "&order=modifiedDate:DSC", true);
    this.updateArray();
    this.spinnerHTML = "";
  }
  updateArray() {
    this.dataTable.updateArray(this.helpTickets.helpTicketsArray);
    this._cleanUpFilters();
  }
  async selectHelpTicket(el, index) {
    this.editIndex = this.dataTable.displayArray[index + parseInt(this.dataTable.startRecord)].baseIndex;
    this.helpTickets.selectHelpTicket(this.editIndex);
    await this.getDetails();
    this.categoryIndex = this.getCatIndex();
    this.createOutputForm(this.helpTickets.helpTicketTypesArray[this.categoryIndex.categoryIndex].subtypes[this.categoryIndex.subTypeIndex].outputForm);
    if (this.selectedRow) this.selectedRow.children().removeClass('info');
    this.selectedRow = $(el.target).closest('tr');
    this.selectedRow.children().addClass('info');
    this.helpTicketSelected = true;
    this.viewHelpTicketsHeading = "Help Ticket " + this.helpTickets.selectedHelpTicket.helpTicketNo;
  }
  getIndex(subtypes, type) {
    for (let i = 0; i < subtypes.length; i++) {
      if (subtypes[i].type === type) {
        return i;
      }
    }
    return null;
  }
  getCatIndex() {
    for (var j = 0; j < this.helpTickets.helpTicketTypesArray.length; j++) {
      for (var i = 0; i < this.helpTickets.helpTicketTypesArray[j].subtypes.length; i++) {
        if (this.helpTickets.helpTicketTypesArray[j].subtypes[i].type === this.helpTickets.selectedHelpTicket.content[0].type || this.helpTickets.helpTicketTypesArray[j].subtypes[i].type === 'OTHER_OTHER' && this.helpTickets.selectedHelpTicket.content[0].type === 'OTHER') {
          return {
            subTypeIndex: i,
            categoryIndex: j
          };
        }
      }
    }
  }
  getCategoryIndex() {
    for (var i = 0; i < this.helpTickets.helpTicketTypesArray.length; i++) {
      if (this.helpTickets.helpTicketTypesArray[i] == this.helpTickets.selectedHelpTicket.helpTicketCategory) {
        return i;
      }
    }
  }
  createOutputForm(html) {
    let el = document.getElementById('container');
    el.innerHTML = html;
    if (el) {
      if (!el.querySelectorAll('.au-target').length) {
        this.templatingEngine.enhance({
          element: el,
          bindingContext: this
        });
      }
    }
  }
  async getDetails() {
    this.showRequestDetails = false;
    if (this.helpTickets.selectedHelpTicket.requestId) {
      if (this.helpTickets.selectedHelpTicket.requestId.assignments && this.helpTickets.selectedHelpTicket.requestId.assignments.length > 0) this.showRequestDetails = true;
      this.showCourse = false;
      this.course = "";
      this.showCourse = true;
      if (this.helpTickets.selectedHelpTicket.courseId) {
        this.course = this.helpTickets.selectedHelpTicket.courseId.number + " - " + this.helpTickets.selectedHelpTicket.courseId.name;
      } else {
        this.course = this.config.SANDBOX_NAME;
      }
    }
  }
  getName() {
    for (var i = 0; i < this.people.uccPeople.length; i++) {
      return this.people.uccPeople[i].fullName;
    }
    return "someone";
  }
  respond() {
    if (!this.enterResponse) {
      this.helpTickets.selectHelpTicketContent();
      this.enterResponse = true;
      this.enableButton = true;
    }
  }
  cancelResponse() {
    this.response = new Object();
    this.isUnchanged = true;
    this.enterResponse = false;
  }
  _createResponse() {
    this.helpTickets.selectedHelpTicket.helpTicketStatus = this.config.REPLIED_HELPTICKET_STATUS;
    this.helpTickets.selectedHelpTicketContent.personId = this.userObj._id;
    this.helpTickets.selectedHelpTicketContent.type = this.config.HELP_TICKET_OTHER_TYPE;
    this.helpTickets.selectedHelpTicketContent.emailSent = this.sendEmail;
    // this.helpTickets.selectedHelpTicketContent.content.comments = this.responseMessage;
    this.helpTickets.selectedHelpTicketContent.displayForm = this.config.HELP_TICKET_OTHER_TYPE;
  }
  async saveResponse() {
    this._createResponse();
    var email = new Object();
    if (this.sendEmail) {
      email.MESSAGE = this.config.HELP_TICKET_USER_UPDATE_MESSAGE.replace('[[No]]', this.helpTickets.selectedHelpTicket.helpTicketNo);
      email.subject = this.config.HELP_TICKET_USER_UPDATE_SUBJECT.replace('[[No]]', this.helpTickets.selectedHelpTicket.helpTicketNo);
      email.email = this.userObj.email;
      email.cc = this.config.HELP_TICKET_EMAIL_LIST ? this.config.HELP_TICKET_EMAIL_LIST : "";
    }
    let serverResponse = await this.helpTickets.saveHelpTicketResponse(email);
    if (!serverResponse.error) {
      this.updateArray();
      this.filterOutClosed();
      this.utils.showNotification("The help ticket was updated");
      if (this.filesToUpload && this.filesToUpload.length > 0) this.helpTickets.uploadFile(this.filesToUpload, serverResponse.content[serverResponse.content.length - 1]._id);
      if (this.helpTickets.selectedHelpTicket.owner[0].personId != null) {
        let notice = {
          personId: this.userObj._id,
          uccStaffId: this.helpTickets.selectedHelpTicket.owner[0].personId._id,
          notice: "Help Ticket " + this.helpTickets.selectedHelpTicket.helpTicketNo + " was updated"
        };
        this.helpTickets.saveNotification(notice);
      }
    }
    this._cleanUp();
  }
  closeHelpTicket(helpTicket) {
    return this.dialog.showCloseHelpTicket("You have chosen to close this help ticket.", "Close Help Ticket", ['Submit', 'Cancel']).whenClosed(response => {
      if (!response.wasCancelled) {
        this.helpTickets.selectHelpTicketByID(helpTicket._id);
        this.helpTickets.selectHelpTicketContent();
        this.responseMessage = "Help Ticket closed by " + this.userObj.fullName + "<p>Reason: " + this.config.HELP_TICKET_CLOSE_REASONS[response.output.selectedReason].reason + "</p>";
        if (response.output.selectedReason == this.config.HELP_TICKET_CLOSE_REASON_OTHER) {
          if (response.output.otherReason) {
            this.responseMessage += "<p>Other reason:  " + response.output.otherReason + "</p>";
          } else {
            this.responseMessage += "<p>No elboration provide for other reason for closing ticket.</p>";
          }
        }
        if (response.output.method) {
          this.responseMessage += this.responseMessage = "<p>Method for resolving: " + response.output.method + "</p>";
        } else {
          this.responseMessage += "<p>No method was provided for resolving the issue.</p>";
        }
        this.helpTickets.selectedHelpTicketContent.content.comments = this.responseMessage;
        this._createResponse();
        this.closeTicket(helpTicket);
      } else {
        this._cleanUp();
      }
    });
  }
  async closeTicket(helpTicket) {
    var email = new Object();
    if (this.sendEmail) {
      email.reason = this.config.CLOSED_HELPTICKET_STATUS;
      email.fullName = this.userObj.fullName;
      email.email = this.userObj.email;
      email.helpTicketNo = this.helpTickets.selectedHelpTicket.helpTicketNo;
      email.cc = this.config.HELP_TICKET_EMAIL_LIST ? this.config.HELP_TICKET_EMAIL_LIST : "";
      email.message = "The help ticket was closed by " + this.userObj.fullName;
    }
    this.helpTickets.selectedHelpTicket.helpTicketStatus = this.config.CLOSED_HELPTICKET_STATUS;
    let serverResponse = await this.helpTickets.closeHelpTicket();
    if (!serverResponse.error) {
      this.refresh();
      this.utils.showNotification("The help ticket was updated");
    }
    if (this.helpTickets.selectedHelpTicket.owner[0].personId != null) {
      let notice = {
        personId: this.userObj._id,
        uccStaffId: this.helpTickets.selectedHelpTicket.owner[0].personId._id,
        notice: "Help Ticket " + this.helpTickets.selectedHelpTicket.helpTicketNo + " was closed"
      };
      this.helpTickets.saveNotification(notice);
    }
    if (this.isChecked) this.filterOutClosed();
    this._cleanUp();
  }
  async openHelpTicket(helpTicket) {
    this.helpTickets.selectHelpTicketByID(helpTicket._id);
    var email = new Object();
    if (this.sendEmail) {
      email.reason = 2;
      email.fullName = this.userObj.fullName;
      email.email = this.userObj.email;
      email.helpTicketNo = this.helpTickets.selectedHelpTicket.helpTicketNo;
      email.cc = this.config.HELP_TICKET_EMAIL_LIST ? this.config.HELP_TICKET_EMAIL_LIST : "";
      email.message = "The help ticket was reopened by " + this.userObj.fullName;
    }
    this.helpTickets.selectedHelpTicket.helpTicketStatus = this.config.REVIEW_HELPTICKET_STATUS;
    let serverResponse = await this.helpTickets.updateStatus(email);
    if (!serverResponse.error) {
      this.updateArray();
      this.filterOutClosed();
      this.utils.showNotification("The help ticket was updated");
    }
    this._cleanUp();
  }

  /*****************************************************************************************
  * THe user selected files to upload to update the ineterface with the file names
  *****************************************************************************************/
  changeFiles() {
    this.filesSelected = "";
    this.selectedFiles = new Array();
    for (var i = 0; i < this.files.length; i++) {
      this.selectedFiles.push(this.files[i].name);
      this.filesSelected += this.files[i].name + " ";
    }
  }
  _cleanUp() {
    this.enterResponse = false;
    this.files = new Array();
    this.filesSelected = "";
    this.filesToUpload = new Array();
  }

  // _unLock(){
  //    if(!this.showLockMessage){
  //     if(this.helpTickets.selectedHelpTicket && this.helpTickets.selectedHelpTicket._id){
  //       this.helpTickets.removeHelpTicketLock(this.helpTickets.selectedHelpTicket._id);
  //     }    
  //   }
  // }

  back() {
    this.helpTicketSelected = false;
    this._cleanUp();
    // this._unLock();
  }

  filterOutClosed() {
    if (this.isChecked) {
      this.dataTable.filterList(this.config.CLOSED_HELPTICKET_STATUS, {
        type: 'value',
        filter: "expiredFilter",
        collectionProperty: 'helpTicketStatus',
        compare: 'not-match'
      });
    } else {
      this.updateArray();
    }
    this.toolTips();
  }
  async _cleanUpResponse() {
    this.enterResponse = false;
  }
  _cleanUpFilters() {
    $("#type").val("");
    $("#status").val("");
    $("#personStatus").val("");
  }
  changeFiles() {
    this.filesToUpload = this.filesToUpload ? this.filesToUpload : new Array();
    for (var i = 0; i < this.files.length; i++) {
      let addFile = true;
      this.filesToUpload.forEach(item => {
        if (item.name === this.files[i].name) addFile = false;
      });
      if (addFile) this.filesToUpload.push(this.files[i]);
    }
  }
  removeFile(index) {
    this.filesToUpload.splice(index, 1);
  }
  toolTips() {
    $('[data-toggle="tooltip"]').tooltip();
  }
  showComment(helpTicket, el) {
    if (helpTicket.content[0].content) {
      this.commentShown = helpTicket.content[0].content.comments;
      $(".hover").css("top", el.clientY - 100);
      $(".hover").css("left", el.clientX + 10);
      $(".hover").css("display", "block");
    }
  }
  hideComment() {
    $(".hover").css("display", "none");
  }
  customHelpTicketTypeFilter(value, item, context) {
    var foo = value.toUpperCase();
    for (let i = 0; i < context.helpTickets.helpTicketTypesArray.length; i++) {
      for (let j = 0; j < context.helpTickets.helpTicketTypesArray[i].subtypes.length; j++) {
        if (context.helpTickets.helpTicketTypesArray[i].subtypes[j].type == item.helpTicketType) {
          return context.helpTickets.helpTicketTypesArray[i].subtypes[j].description.toUpperCase().indexOf(foo) > -1;
        }
      }
    }
    return false;
  }
  _setUpValidation() {
    this.validation.addRule("00", "curriculumTitle", [{
      "rule": "required",
      "message": "Curriculum Title is required"
    }]);
    this.validation.addRule("00", "client", [{
      "rule": "custom",
      "message": "You must select a client",
      "valFunction": function (context) {
        return context.helpTicket.clientId !== undefined;
      }
    }]);
    this.validation.addRule("01", "resetPasswordUserIDs", [{
      "rule": "required",
      "message": "You must enter the passwords to reset"
    }]);
    this.validation.addRule("01", "client", [{
      "rule": "custom",
      "message": "You must enter the passwords to reset",
      "valFunction": function (context) {
        return context.helpTicket.clientId !== undefined;
      }
    }]);
    this.validation.addRule("02", "application", [{
      "rule": "custom",
      "message": "You must select the application",
      "valFunction": function (context) {
        return context.content.application !== undefined;
      }
    }]);
  }
}) || _class);

/***/ }),

/***/ "modules/user/user":
/*!**********************************!*\
  !*** ./src/modules/user/user.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   User: function() { return /* binding */ User; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var aurelia_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-router */ 6433);
/* harmony import */ var _resources_utils_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../resources/utils/utils */ 8741);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
/* harmony import */ var _resources_data_siteInfo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../resources/data/siteInfo */ 1290);
/* harmony import */ var _resources_data_sessions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../resources/data/sessions */ 2073);
/* harmony import */ var _resources_data_people__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../resources/data/people */ 353);
/* harmony import */ var _resources_data_helpTickets__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../resources/data/helpTickets */ 8142);
/* harmony import */ var _resources_data_clientRequests__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../resources/data/clientRequests */ 5446);
/* harmony import */ var _resources_data_apjClientRequests__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../resources/data/apjClientRequests */ 3444);
/* harmony import */ var _resources_data_events__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../resources/data/events */ 4247);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! moment */ 381);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_11__);
var _dec, _class;












let User = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(aurelia_router__WEBPACK_IMPORTED_MODULE_1__.Router, _resources_utils_utils__WEBPACK_IMPORTED_MODULE_2__.Utils, _config_appConfig__WEBPACK_IMPORTED_MODULE_3__.AppConfig, _resources_data_siteInfo__WEBPACK_IMPORTED_MODULE_4__.SiteInfo, _resources_data_sessions__WEBPACK_IMPORTED_MODULE_5__.Sessions, _resources_data_helpTickets__WEBPACK_IMPORTED_MODULE_7__.HelpTickets, _resources_data_clientRequests__WEBPACK_IMPORTED_MODULE_8__.ClientRequests, _resources_data_people__WEBPACK_IMPORTED_MODULE_6__.People, _resources_data_apjClientRequests__WEBPACK_IMPORTED_MODULE_9__.APJClientRequests, _resources_data_events__WEBPACK_IMPORTED_MODULE_10__.Events), _dec(_class = class User {
  constructor(router, utils, config, siteinfo, sessions, helpTickets, requests, people, events, apjRequests) {
    this.router = router;
    this.utils = utils;
    this.config = config;
    this.siteinfo = siteinfo;
    this.sessions = sessions;
    this.helpTickets = helpTickets;
    this.requests = requests;
    this.people = people;
    this.apjRequests = apjRequests;
    this.events = events;
    this.userObj = JSON.parse(sessionStorage.getItem('user'));
  }
  attached() {
    $('.carousel').carousel({
      interval: 10000
    });
    this.alertIndex = this.utils.arrayContainsValue(this.siteinfo.siteArray, "itemType", "ALRT");
    if (!sessionStorage.getItem('alert')) {
      if (this.alertIndex > -1) {
        this.openAlert(this.siteinfo.siteArray[this.alertIndex]);
      }
    }
    $("#notice").fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  }
  canActivate() {
    if (!this.userObj) {
      this.userObj = this.config.user;
      if (!this.userObj) {
        this.utils.showNotification("Couldn't find your user information.  Try logging in again or call the UCC.");
        this.router.navigate("home");
      }
    }
  }
  async activate() {
    await this.getData();
    this.config.getConfig(true);
  }
  async getData() {
    var currentDate = moment__WEBPACK_IMPORTED_MODULE_11___default()(new Date()).format("MM-DD-YYYY");
    var options = '?filter=expiredDate|gt|' + currentDate + '&order=sortOrder';
    if (this.userObj.userRole >= this.config.UCC_ROLE) {
      let responses = await Promise.all([this.sessions.getSessionsArray('?order=startDate'), this.siteinfo.getInfoArray(true, options), this.config.getConfig()]);
      this.showCarousel = this.siteinfo.showCarousel();
    } else {
      let responses = await Promise.all([this.sessions.getSessionsArray('?order=startDate'), this.siteinfo.getInfoArray(true, options), this.config.getConfig()]);
      this.showCarousel = this.siteinfo.showCarousel();
    }
    this.temp = undefined;
    if (!sessionStorage.getItem('weather')) {
      if (this.userObj.postalCode) {
        let weather = await this.siteinfo.getWeather(this.userObj.institutionId.postalCode);
        if (weather && weather.main) {
          this.temp = parseFloat(weather.main.temp) - 273.15;
          if (this.config.TEMP_SCALE == 'C') {
            this.temp = this.temp.toFixed(1) + "\u00b0 C";
          } else {
            this.temp = (parseFloat(this.temp) * 1.8 + 32).toFixed(1) + "\u00b0 F";
          }
          this.weatherIcon = this.config.IMG_DOWNLOAD_URL + "icons/" + weather.weather[0].icon + ".png";
          var weatherObj = {
            temp: this.temp,
            url: this.weatherIcon
          };
          sessionStorage.setItem('weather', JSON.stringify(weatherObj));
        }
      }
    } else {
      let weather = JSON.parse(sessionStorage.getItem('weather'));
      this.temp = weather.temp;
      this.weatherIcon = weather.url;
    }
    if (sessionStorage.getItem('uccweather')) {
      let uccweather = JSON.parse(sessionStorage.getItem('uccweather'));
      this.ucctemp = parseFloat(uccweather.temp) - 273.15;
      if (this.config.TEMP_SCALE == 'C') {
        this.ucctemp = this.ucctemp.toFixed(1) + "\u00b0 C";
      } else {
        this.ucctemp = (parseFloat(this.ucctemp) * 1.8 + 32).toFixed(1) + "\u00b0 F";
      }
      this.uccweatherIcon = this.config.IMG_DOWNLOAD_URL + 'icons/' + uccweather.icon + ".png";
    }
  }
  async getEvents() {
    this.eventArray = new Array();
    await this.events.getEventsArray('', true);
    let today = moment__WEBPACK_IMPORTED_MODULE_11___default()(new Date()).format('YYYY-MM-DD');
    this.events.eventArray.forEach(item => {
      if (item.personId === this.userObj._id || item.scope === 'u') {
        let start = moment__WEBPACK_IMPORTED_MODULE_11___default()(item.start).format('YYYY-MM-DD');
        let end = moment__WEBPACK_IMPORTED_MODULE_11___default()(item.end).format('YYYY-MM-DD');
        if (moment__WEBPACK_IMPORTED_MODULE_11___default()(today).isBetween(start, end)) {
          this.eventArray.push(item);
        } else if (moment__WEBPACK_IMPORTED_MODULE_11___default()(today).isSame(start)) {
          this.eventArray.push(item);
        }
      }
    });
  }
  moreInfoExists(item) {
    return item.url && item.url.length > 0;
  }
}) || _class);

/***/ }),

/***/ "modules/user/requests/clientRequests.html":
/*!*******************************************************!*\
  !*** ./src/modules/user/requests/clientRequests.html ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <compose view='../../../resources/elements/submenu.html'></compose>     \r\n    <div class=\"col-lg-12\">\r\n        <router-view></router-view>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/user/requests/components/Courses.html":
/*!***********************************************************!*\
  !*** ./src/modules/user/requests/components/Courses.html ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div class=\"topMargin\">\r\n        <H4>Choose a Course</h4>\r\n        <table id=\"coursesTable\" class=\"table table-striped table-hover\">\r\n            <thead>\r\n                <tr>\r\n                    <td colspan='6'>\r\n                        <span click.delegate=\"refreshCourses()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Refresh\"><i class=\"fa fa-refresh\" aria-hidden=\"true\"></i></span>\r\n                        <span click.delegate=\"newCourse()\" class=\"smallMarginRight\"  bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"New Course\"><i class=\"fa fa-plus\" aria-hidden=\"true\"></i></span>\r\n                        <span style=\"margin-left:5px;\"  class=\"smallMarginRight\"  bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Save\" click.delegate=\"editACourse()\"><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></span>\r\n                        <span class=\"pull-right\" id=\"spinner\" innerhtml.bind=\"spinnerHTML\"></span>\r\n                    </td>\r\n                </tr>\r\n                <tr>\r\n                    <th style=\"width:20rem;\">Number </th>\r\n                    <th style=\"width:30rem;\">Name</th>\r\n                </tr>\r\n            </thead>\r\n            <tbody>\r\n                <tr id=\"selectCourse\" click.delegate=\"selectCourse($index, $event)\"  repeat.for=\"course of people.coursesArray\">\r\n                    <td data-title=\"nummber\">${course.number} </td>\r\n                    <td data-title=\"name\">${course.name}</td>\r\n                </tr>\r\n            </tbody>\r\n        </table>\r\n\r\n        <div class=\"row\" show.bind=\"editCourse\">\r\n            <div class=\"panel panel-default col-md-10 col-md-offset-1\" style=\"background-color:ghostwhite;\">\r\n                <div class=\"bottomMargin list-group-item leftMargin rightMargin topMargin\">\r\n                    <span click.trigger=\"saveCourse()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Save Course\"><i class=\"fa fa-floppy-o fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n                    <span click.trigger=\"cancelEditCourse()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Cancel\"><i class=\"fa fa-ban fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n                </div>\r\n                <div class=\"panel-body\">\r\n                    <div class=\"form-group\">\r\n                        <input id=\"number\" value.bind=\"people.selectedCourse.number\" type=\"text\" placeholder=\"Course Number\"\r\n                            class=\"form-control\"/>\r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <input id=\"name\" value.bind=\"people.selectedCourse.name\" type=\"text\" placeholder=\"Course Name\"\r\n                            class=\"form-control\"/>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <span id=\"course\"></span>\r\n</template>\r\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/user/requests/components/assignmentDetails.html":
/*!*********************************************************************!*\
  !*** ./src/modules/user/requests/components/assignmentDetails.html ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div show.bind=\"requests.selectedRequestDetail.assignments.length > 0\">\r\n      <h4 class=\"topMargin\"><strong>Assignments</strong></h4>\r\n      <div show.bind=\"requests.selectedRequestDetail.requestStatus == config.ASSIGNED_REQUEST_CODE\" class=\"panel panel-primary topMargin\">\r\n        <div class=\"panel-body\">  \r\n          <ul style=\"padding-left:10px;\">\r\n\t\t\t\t\t\t<li class=\"list-group-item\" repeat.for=\"assign of requests.selectedRequestDetail.assignments\">\r\n              <compose if.bind=\"systems.selectedSystem.type === 'ERP' || !systems.selectedSystem.type\" view=\"./erp.html\"></compose>\r\n              <compose if.bind=\"systems.selectedSystem.type === 'HANA'\" view=\"./hana.html\"></compose>\r\n              <compose if.bind=\"systems.selectedSystem.type === 'BO'\" view=\"./bo.html\"></compose>\r\n\t\t\t\t\t\t</li>\r\n          </ul>\r\n\r\n          <label show.bind=\"products.selectedProduct.documents && products.selectedProduct.documents.length > 0\" class=\"topMargin\">Helpful Documents</label>\r\n          <div class=\"list-group\">\r\n            <a repeat.for=\"document of products.selectedProduct.documents\" href=\"${config.DOCUMENT_FILE_DOWNLOAD_URL}/${document.categoryCode}/${document.categoryName}/${document.fileName}\"  target=\"_blank\">${document.fileName}</a>\r\n          </div>\r\n          <label show.bind=\"requests.selectedRequestDetail.techComments && requests.selectedRequestDetail.techComments.length > 0\" class=\"topMargin\">Assignment Comments</label>\r\n          <div show.bind=\"requests.selectedRequestDetail.techComments && requests.selectedRequestDetail.techComments.length > 0\" class=\"col-lg-12 topMargin well overFlow\" innerhtml.bind=\"requests.selectedRequestDetail.techComments\"></div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>\r\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/user/requests/components/bo.html":
/*!******************************************************!*\
  !*** ./src/modules/user/requests/components/bo.html ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t\t <div class=\"row leftMargin\">\r\n\t\t\t<h4>URL</h4>\r\n\t\t\t<h5 class=\"leftMargin\"><a href=\"${systems.selectedSystem.its}\" target=\"_blank\">${systems.selectedSystem.its}</a></h5>\r\n\r\n\t\t\t<h4 class=\"topMargin\">Users</h4>\r\n\t\t\t<h5 class=\"leftMargin\">Student IDs: <span class=\"bold\"> ${assign.studentUserIds}</span></h5>\r\n\t\t\t<h5 class=\"leftMargin\">Student Password: <span class=\"bold\"> ${assign.studentPassword}</span></h5>\r\n\t\t\t<span show.bind=\"requests.selectedRequest.courseId !== null\">\r\n\t\t\t\t<h5 class=\"leftMargin\" class=\"topMargin\">Faculty IDs <span class=\"bold\">: ${requests.selectedRequestDetail.assignments[selectedAssignmentIndex].facultyUserIds}</span></h5>\r\n\t\t\t\t<h5 class=\"leftMargin\">Faculty Password: <span class=\"bold\"> ${requests.selectedRequestDetail.assignments[selectedAssignmentIndex].facultyPassword}</span></h5>\r\n\t\t\t</span>\r\n\t\t</div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/user/requests/components/client-request-step1.html":
/*!************************************************************************!*\
  !*** ./src/modules/user/requests/components/client-request-step1.html ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\n  <!-- Term Select -->\n  <div class=\"row\">\n    <div class=\"col-sm-12\">\n      <div class=\"form-group leftJustify\">\n        <select value.bind=\"sessionId\" class=\"form-control\" change.trigger=\"changeSession($event)\" id=\"session\">\n          <option value=\"-1\">Select a session</option>\n          <option repeat.for=\"session of sessions.sessionsArray | filterSessions:config.ACTIVE_REQUEST_OVERLAP:'Requests':config.SESSION_SORT_ORDER\"\n                  value.bind=\"session._id\">Session ${session.session} - ${session.year}</option>\n        </select>\n      </div>\n    </div>\n  </div>\n  \n  <div class=\"row\">\n    <div show.bind=\"sessionSelected && useSandbox\" class=\"col-sm-12\">\n      <div class=\"form-group\">\n        <select value.bind=\"requestType\" change.trigger=\"changeRequestType($event)\" id=\"requestType\" class=\"form-control\">\n          <option value=\"-1\">Choose the Type of The Request</option>\n           <option value=\"sandboxCourse\">${config.SANDBOX_NAME}</option>\n           <option value=\"regularCourse\">Regular Course</option>\n        </select>\n      </div>\n    </div>\n  </div>\n\n  <compose show.bind=\"regularClient && sessionSelected && typeSelected\" view='./Courses.html'></compose>\n\n  <!-- Number of students -->\n  <div show.bind=\"requestReceived\">\n    <div class=\"row\"  id=\"numStudents\" show.bind=\"courseSelected\">\n      <div class=\"topMargin col-lg-10 leftMargin rightMargin\" innerhtml.bind=\"REGULAR_NUMBER_OF_STUDENTS.content\"></div>\n      <div class=\"topMargin col-lg-5\">\n        <div class=\"form-group\">\n          <div show.bind=\"!existingRequest\">\n            <label for=\"undergraduates\" class=\"col-sm-3 control-label\">Undergraduates</label>\n            <div class=\"col-sm-8\">\n              <input disabled.bind=\"existingRequest\" id=\"undergraduates\"  type=\"number\" placeholder=\"Number of Undergraduates\"\n                      class=\"form-control\" value.bind=\"requests.selectedRequest.undergradIds\"/>\n            </div>\n          </div>\n          <div show.bind=\"existingRequest\" class=\"col-lg-5\">\n            <h5>Undergrads: <b>${requests.selectedRequest.undergradIds}</b></h5>\n          </div>\n                \n        </div>\n      </div>\n      <div class=\"topMargin col-lg-5\">\n        <div class=\"form-group\">\n          <div show.bind=\"!existingRequest\">\n              <label for=\"graduates\" class=\"col-sm-3 control-label\">Graduates</label>\n              <div class=\"col-sm-8\">\n                <input disabled.bind=\"existingRequest\" id=\"graduates\" type=\"number\" placeholder=\"Number of Graduates\"\n                      class=\"form-control\" value.bind=\"requests.selectedRequest.graduateIds\"/>\n              </div>\n            </div>\n              <div show.bind=\"existingRequest\" class=\"col-lg-5\">\n                  <h5>Graduate: <b>${requests.selectedRequest.graduateIds}</b></h5>\n              </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"row col-lg-offset-3\" show.bind=\"courseSelected\">\n        <span class=\"col-lg-8 \" id=\"numberOfStudentsError\"></span>\n    </div>\n\n    <!-- Begin and End Date -->\n    <div class=\"row\" show.bind=\"sandBoxClient || courseSelected\">\n      <div class=\"topMargin col-lg-10 leftMargin rightMargin\" innerhtml.bind=\"START_END_DATES.content\"></div>\n        <div class=\"col-lg-5\">\n          <div class=\"form-group topMargin\">\n            <div show.bind=\"!existingRequest\">\n            <label class=\"col-sm-3 form-control-label \">Start Date</label>\n            <div show.bind=\"!existingRequest\" class=\"col-sm-8\">\n                <flat-picker  controlid=\"startDate\" config.bind=\"configDate\" change.delegate=\"changeBeginDate($event)\"  \n                    value.bind=\"requests.selectedRequest.startDate\" startdate.bind=\"minStartDate\" enddate.bind=\"maxStartDate\"></flat-picker>\n              <span id='startDateError'></span>\n            </div>\n            </div>\n            <div show.bind=\"existingRequest\" class=\"col-sm-8\">\n              <h5>Start Date:  <b>${requests.selectedRequest.startDate | dateFormat:config.DATE_FORMAT_TABLE}</b></h5>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-lg-5\">\n          <div class=\"form-group topMargin\">\n            <div show.bind=\"!existingRequest\">\n              <label class=\"col-sm-3 form-control-label \">End Date</label>\n              <div  class=\"col-sm-8\">\n                <flat-picker controlid=\"endDate\" config.bind=\"configDate\" value.bind=\"requests.selectedRequest.endDate\" startdate.bind=\"minEndDate\" enddate.bind=\"maxEndDate\"></flat-picker>\n              <span id='endDateError'></span>\n              </div>\n            </div>\n            <div show.bind=\"existingRequest\" class=\"col-sm-8\">\n              <h5>End Date:  <b>${requests.selectedRequest.endDate | dateFormat:config.DATE_FORMAT_TABLE}</b></h5>\n            </div>\n          </div>\n        </div>\n        \n      </div>\n    </div>\n  <div show.bind=\"sessionId == -1 && requestType == -1\" innerhtml.bind=\"CLIENT_REQUEST_START.content\"></div>\n  <div show.bind=\"sessionId != -1 && requestType == -1 && useSandbox\" innerhtml.bind=\"SESSION_SELECTED.content\"></div>\n  \n  <div show.bind=\"showInfoBox\" class=\"topMargin leftMargin\" style=\"display: none;\" id=\"infoBox\"></div>\n</template>\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/user/requests/components/client-request-step2.html":
/*!************************************************************************!*\
  !*** ./src/modules/user/requests/components/client-request-step2.html ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n  <div class=\"row\">\r\n    <div class=\"col-md-12\"  >\r\n      <div  class=\"well well-sm col-md-10 col-sm-offset-1\" innerhtml.bind =\"siteInfo.selectMessageByKey('SELECT_PRODUCT_WELL').content.replace('REQUEST_LIMIT', config.REQUEST_LIMIT)\"></div>\r\n    </div>\r\n    \r\n    <div class=\"col-md-12\" >\r\n      <div class=\"col-md-5 topMargin\">\r\n        <label id=\"productList\">Available Products</label>\r\n        <div class=\"well well2 overFlow\" style=\"height:400px;\">\r\n          <input class=\"form-control\" value.bind=\"filter\" input.trigger=\"filterList()\" placeholder=\"Filter products\"/>\r\n          <ul class=\"list-group\">\r\n            <a  click.trigger=\"selectProduct($event)\" type=\"button\" repeat.for=\"product of filteredProductsArray\" id=\"${product._id}\"\r\n                    mouseover.delegate=\"showCurriculum(product, $event)\" mouseout.delegate=\"hideCurriculum()\"\r\n                    class=\"list-group-item dropbtn\">${product.name}</a>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n      <div class=\"col-md-5 col-md-offset-1 topMargin\">\r\n        <label id=\"requestProductsLabel\">Requested Products</label>\r\n        <div class=\"well well2 overflow\" style=\"height:400px;\">\r\n          <ul class=\"list-group\">\r\n            <a show.bind=\"!product.delete\" click.trigger=\"removeProduct($event)\" type=\"button\" repeat.for=\"product of requests.selectedRequest.requestDetails\" id=\"${product.productId}\"\r\n                    class=\"list-group-item dropbtn\">${product.productId | lookupValue:products.productsArray:\"_id\":\"name\"}</a>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>\r\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/user/requests/components/client-request-step3.html":
/*!************************************************************************!*\
  !*** ./src/modules/user/requests/components/client-request-step3.html ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n  <div class=\"row\">\r\n    <div class=\"col-md-12\">\r\n      <div  class=\"well well-sm col-md-10 col-sm-offset-1\">${siteInfo.selectMessageByKey('CLIENT_REQUESTS_COMMENTS').content}</div>\r\n    </div>\r\n    <div show.bind=\"!existingRequest\" class=\"form-group col-md-12\">\r\n      <editor  disabled.bind=\"existingRequest\" value.bind=\"requests.selectedRequest.comments\" height=\"250\"></editor>\r\n    </div>\r\n    <div show.bind=\"existingRequest\" class=\"col-sm-8\" >\r\n      <h4>Comments</h4>\r\n      <div innerhtml.bind=\"requests.selectedRequest.comments\"></div>\r\n    </div>\r\n  </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/user/requests/components/client-request-step4.html":
/*!************************************************************************!*\
  !*** ./src/modules/user/requests/components/client-request-step4.html ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\r\n  <div class=\"col-md-12\" >\r\n    <div  class=\"well well-sm col-md-10 col-sm-offset-1\" innerhtml.bind=\"siteInfo.selectMessageByKey('CLIENT_REQUESTS_SUMMARY').content\"></div>\r\n  </div>\r\n  <div class=\"form-group col-md-12\">\r\n    <div class=\"row\">\r\n      <h4 show.bind=\"requestType != 'sandboxCourse'\" class=\"col-md-5 topMargin\">Course: <b>${courseId | courseName:people.coursesArray}</b></h4>\r\n      <h4 show.bind=\"requestType == 'sandboxCourse'\" class=\"col-md-5 topMargin\">Course: <b>Sandbox</b></h4>\r\n    </div>\r\n    <div class=\"row\">\r\n      <h4 class=\"col-md-5 topMargin\" show.bind=\"requestType != 'sandboxCourse'\">Undergraduates: <b>${requests.selectedRequest.undergradIds}</b></h4>\r\n      <h4 class=\"col-md-5 topMargin\" show.bind=\"requestType != 'sandboxCourse'\">Graduates: <b>${requests.selectedRequest.graduateIds}</b> </h4>\r\n    </div>\r\n    <div class=\"row\">\r\n      <h4 class=\"col-md-5 topMargin\">Course Begins: <b>${requests.selectedRequest.startDate | dateFormat:'YYYY-MM-DD'}</b></h4>\r\n      <h4 class=\"col-md-5 topMargin\">Course Ends: <b>${requests.selectedRequest.endDate | dateFormat:'YYYY-MM-DD'}</b></h4>\r\n    </div>\r\n    <div class=\"col-md-12\"></div>\r\n    <div class=\"row\" id=\"productListTable\">\r\n      <table class=\"table table-striped table-bordered col-md-10 topMargin\">\r\n        <thead>\r\n        <tr>\r\n          <th>Requested Product</th>\r\n          <th>Date Required</th>\r\n        </tr>\r\n        <tbody id=\"requiredProductsTable\">\r\n        <tr repeat.for=\"request of requests.selectedRequest.requestDetails\">\r\n          <td>\r\n            ${request.productId | lookupValue:products.productsArray:\"_id\":\"name\"}\r\n            <span if.bind=\"request.delete\" class=\"label label-warning\">Delete this product</span>\r\n          </td>\r\n          <td> \r\n            <div show.bind=\"!existingRequest || !request.requiredDate || $index >= existingRequestLength\" class=\"form-group col-md-8\">\r\n               <flat-picker if.bind=\"!request.delete\" controlid=\"requiredDate-${$index}\" config.bind=\"configDate\" value.bind=\"request.requiredDate\" startdate.bind=\"minRequiredDate\" enddate.bind=\"maxRequiredDate\"></flat-picker>\r\n            </div>\r\n            <div show.bind=\"existingRequest && request.requiredDate && $index < existingRequestLength\" class=\"col-sm-8\">\r\n              <h5><b>${request.requiredDate | dateFormat:config.DATE_FORMAT_TABLE}</b></h5>\r\n            </div>\r\n          </td>\r\n        </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n\r\n    <div class=\"row\">\r\n      <div class=\"col-sm-12\">\r\n        <div class=\"form-group\" show.bind=\"comments !== ''\">\r\n          <label >Comments:</label>\r\n          <div class=\"topMargin\" rows=\"12\" innerhtml.bind=\"requests.selectedRequest.comments\"></div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n  </div>\r\n</template>\r\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/user/requests/components/erp.html":
/*!*******************************************************!*\
  !*** ./src/modules/user/requests/components/erp.html ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n  <div class=\"row\" style=\"word-wrap: break-word;\">\r\n      <span class=\"col-lg-4\">\r\n        <h5 class=\"leftMargin\">System: <span class=\"bold\">${assign.systemId | lookupValue:systems.systemsArray:\"_id\":\"sid\"}</span></h5>\r\n        <h5 class=\"leftMargin\">Client: <span class=\"bold\"> ${assign.client} </span></h5>\r\n        <h5 class=\"leftMargin\">Server: <span class=\"bold\"> ${assign.systemId | lookupValue:systems.systemsArray:\"_id\":\"server\"} </span></h5>\r\n        <h5 class=\"leftMargin\">System Number: <span class=\"bold\"> ${assign.systemId | lookupValue:systems.systemsArray:\"_id\":\"instance\"} </span></h5>\r\n      </span>\r\n      <span class=\"col-lg-6\">\r\n        <h5>Student IDs: <span class=\"bold\"> ${assign.studentUserIds ? assign.studentUserIds : 'N/A'}</span></h5>\r\n        <h5>Student Password: <span class=\"bold\"> ${assign.studentPassword ? assign.studentPassword : 'N/A'}</span></h5>\r\n        <span>\r\n          <h5  class=\"topMargin\">Faculty IDs <span class=\"bold\">: ${assign.facultyUserIds ? assign.facultyUserIds : 'N/A'}</span></h5>\r\n          <h5>Faculty Password: <span class=\"bold\"> ${assign.facultyPassword ? assign.facultyPassword : 'N/A'}</span></h5>\r\n        </span>\r\n      </span>\r\n      <span class=\"col-lg-12\">\r\n          <h5 show.bind=\"systems.selectedSystem.its && systems.selectedSystem.its.length > 0\" class=\"leftMargin bigTopMargin\">Web URL:</h5>\r\n          <h5 show.bind=\"systems.selectedSystem.its && systems.selectedSystem.its.length > 0\"><span class=\"bold\"> <a href=\"${systems.selectedSystem.its}\" target=\"_blank\">${systems.selectedSystem.its}</a> </span></h5>            \r\n      </span>\r\n  </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/user/requests/components/hana.html":
/*!********************************************************!*\
  !*** ./src/modules/user/requests/components/hana.html ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t\t <div class=\"row leftMargin\">\r\n\t\t\t<h4>SAP HANA Launchpad URL</h4>\r\n\t\t\t<h5 class=\"leftMargin\"><a href=\"${systems.selectedSystem.its}\" target=\"_blank\">${systems.selectedSystem.its}</a></h5>\r\n\r\n\t\t\t<h4 class=\"topMargin\">Users</h4>\r\n\t\t\t<h5 class=\"leftMargin\">Student IDs: <span class=\"bold\"> ${assign.studentUserIds}</span></h5>\r\n\t\t\t<h5 class=\"leftMargin\">Student Password: <span class=\"bold\"> ${assign.studentPassword}</span></h5>\r\n\t\t\t<span show.bind=\"requests.selectedRequest.courseId !== null\">\r\n\t\t\t\t<h5 class=\"leftMargin\" class=\"topMargin\">Faculty IDs <span class=\"bold\">: ${requests.selectedRequestDetail.assignments[selectedAssignmentIndex].facultyUserIds}</span></h5>\r\n\t\t\t\t<h5 class=\"leftMargin\">Faculty Password: <span class=\"bold\"> ${requests.selectedRequestDetail.assignments[selectedAssignmentIndex].facultyPassword}</span></h5>\r\n\t\t\t</span>\r\n\r\n\t\t\t<h4 class=\"topMargin\">Lumira / Predictive Analytics Connection</h4>\r\n\t\t\t<h5 class=\"leftMargin\">System: <span class=\"bold\">${assign.systemId | lookupValue:systems.systemsArray:\"_id\":\"sid\"}</span></h5>\r\n\t\t\t<h5 class=\"leftMargin\">Server: <span class=\"bold\"> ${systems.selectedSystem.server} </span></h5>\r\n\t\t\t<h5 class=\"leftMargin\">Port: <span class=\"bold\"> ${systems.selectedSystem.port} </span></h5>\r\n\t\t\t<h5 class=\"leftMargin\">System Number: <span class=\"bold\"> ${systems.selectedSystem.instance} </span></h5> \r\n\t\t</div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/user/requests/components/requestDetails.html":
/*!******************************************************************!*\
  !*** ./src/modules/user/requests/components/requestDetails.html ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t<div class=\"row\">\r\n\t\t<div class=\"col-lg-12\">\r\n\t\t\t<h4 class=\"topMargin\"><strong>Request Details</strong></h4>\r\n\t\t\t<div class=\"panel panel-default topMargin\">\r\n\t\t\t\t<div class=\"panel-body leftJustify\">\r\n\t\t\t\t\t<div class=\"form-group bottomMargin\" show.bind=\"customerActionRequired\">\r\n\t\t\t\t\t\t<h5 for=\"message\">The UCC staff has asked you to provide additional information</h5>\r\n\t\t\t\t\t\t<div class=\"well col-lg-12\" id=\"message\" innerhtml.bind=\"customerMessage\" class=\"form-control\"></div>\r\n\t\t\t\t\t\t<h5>Enter your response in the comments box below and click save</h5>\r\n\t\t\t\t\t\t<editor value.bind=\"customerResponse\" height=\"250\"></editor>\t\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div show.bind=\"showDetails\" class=\"form-horizontal topMargin\">\r\n\t\t\t\t\t\t<h4>Product: ${requests.selectedRequestDetail.productId | lookupValue:products.productsArray:\"_id\":\"name\"}</h4>\r\n\t\t\t\t\t\t<h5>Course: ${requests.selectedRequest.courseId | courseName:people.coursesArray}</h5>\r\n\t\t\t\t\t\t<div class=\"topMargin\" show.bind=\"requests.selectedRequest.courseId != config.SANDBOX_ID\">\r\n\t\t\t\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t\t\t\t<div class=\"col-lg-5 leftMargin\">\r\n\t\t\t\t\t\t\t\t\t<h5>Undergrads: <b>${requests.selectedRequest.undergradIds}</b></h5>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t<div class=\"col-lg-5\">\r\n\t\t\t\t\t\t\t\t\t<h5>Graduate: <b>${requests.selectedRequest.graduateIds}</b></h5>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div> \r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t\t\t<div class=\"col-lg-5 leftMargin\">\r\n\t\t\t\t\t\t\t\t<h5>Start Date:  <b>${requests.selectedRequest.startDate | dateFormat:config.DATE_FORMAT_TABLE}</b></h5>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class=\"col-lg-5\">\r\n\t\t\t\t\t\t\t\t<h5>End Date: <b>${requests.selectedRequest.endDate | dateFormat:config.DATE_FORMAT_TABLE}</b></h5>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div show.bind=\"requests.selectedRequest.customerMessage && requests.selectedRequest.customerMessage.length > 0\">\r\n\t\t\t\t\t\t\t<label class=\"topMargin\">Requests from the UCC</label>\r\n\t\t\t\t\t\t\t<div class=\"well\" innerhtml.bind=\"requests.selectedRequest.customerMessage\"></div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div show.bind=\"requests.selectedRequest.comments && requests.selectedRequest.comments.length > 0\">\r\n\t\t\t\t\t\t\t<label class=\"topMargin\">Comments</label>\r\n\t\t\t\t\t\t\t<div innerhtml.bind=\"requests.selectedRequest.comments\"></div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n\t<div show.bind=\"products.selectedProduct.productDescription\">\r\n\t\t<h4>Product Information</h4>\r\n\t\t<div innerhtml.bind=\"products.selectedProduct.productDescription\"></div>\r\n\t</div>\r\n\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/user/requests/components/viewRequestsForm.html":
/*!********************************************************************!*\
  !*** ./src/modules/user/requests/components/viewRequestsForm.html ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t<div class=\"fluid-container\">\r\n\t\t<!-- Buttons -->\r\n\t\t<div class=\"bottomMargin list-group-item\">\r\n\t\t\t<span click.trigger=\"back()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n\t\t\t\tdata-original-title=\"Back\"><i class=\"fa fa-arrow-left fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n\t\t\t<span show.bind=\"customerActionRequired\" click.trigger=\"save()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n\t\t\t\tdata-original-title=\"Save\"><i class=\"fa fa-floppy-o fa-lg fa-border\" aria-hidden=\"true\" ></i></span>\r\n\t\t\t<span show.bind=\"customerActionRequired\" click.trigger=\"cancel()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n\t\t\t\tdata-title=\"Cancel\" title=\"Cancel\"><i class=\"fa fa-ban fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n\t\t\t<span show.bind=\"requests.selectedRequestDetail.assignments.length === 0\" click.trigger=\"delete()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n                title=\"\" data-original-title=\"Delete\"><i class=\"fa fa-trash fa-lg fa-border text-danger\" aria-hidden=\"true\"></i></span>\r\n\t\t</div>\r\n\t\t<div class=\"col-lg-6 col-md-12\">\r\n\t\t\t<compose view=\"./requestDetails.html\"></compose>\r\n\t\t</div>\r\n\t\t<div class=\"col-lg-6 col-md-12\">\r\n\t\t\t<compose view=\"./assignmentDetails.html\"></compose>\r\n\t\t</div>\r\n\t</div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/user/requests/components/viewRequestsTable.html":
/*!*********************************************************************!*\
  !*** ./src/modules/user/requests/components/viewRequestsTable.html ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n  <style>\r\n    .warning {\r\n      background-color: #fcf8e3;\r\n    }\r\n    .assign{\r\n      background-color: #d9edf7;\r\n    }\r\n  </style>\r\n  <div class=\"container\">\r\n    <div class='row'>\r\n      <div show.bind=\"dataTable.displayArray.length > 0\" class='bottomMargin'>\r\n        <compose view=\"../../../../resources/elements/table-navigation-bar.html\"></compose>\r\n        <div id=\"no-more-tables\">\r\n          <table class=\"table table-striped table-hover cf\">\r\n            <thead class=\"cf\">\r\n              <tr>\r\n                <td colspan='6'>\r\n                  <span click.trigger=\"refresh()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n                    title=\"\" data-original-title=\"Refresh\"><i class=\"fa fa-refresh\" aria-hidden=\"true\"></i></span>\r\n                  <span class=\"pull-right\" id=\"spinner\" innerhtml.bind=\"spinnerHTML\"></span>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <th></th>\r\n                <th></th>\r\n                <th></th>\r\n              </tr>\r\n              <tr>\r\n                <th>\r\n                  Course <span click.trigger=\"dataTable.sortArray('courseId','id', people.coursesArray, '_id', 'name')\"><i class=\"fa fa-sort\"></i></span>\r\n                </th>\r\n                <th>\r\n                  Session <span click.trigger=\"dataTable.sortArray('sessionId','id',sessions.sessionsArray,'_id','startDate')\"><i class=\"fa fa-sort\"></i></span><br>\r\n                </th>\r\n                <th>\r\n                  Product Requests (Click to see the details)\r\n                </th>\r\n              </tr>\r\n            </thead>\r\n            <tbody>\r\n              <tr  repeat.for=\"request of dataTable.displayArray\">\r\n                <td click.trigger=\"customerActionResponse(request, $event)\" data-title=\"Course\">\r\n                  <h5>${request.courseId | courseName:people.coursesArray:config.SANDBOX_ID:config.SANDBOX_NAME}</h5>\r\n                  <h6>Undergraduates: ${request.undergradIds} Graduates: ${request.graduateIds}</h6>\r\n                  <h7>Request No: ${request.clientRequestNo}</h7>\r\n                  <h6 show.bind=\"request.requestStatus == config.CUSTOMER_ACTION_REQUEST_CODE\" ><b>CUSTOMER ACTION REQUIRED (click here to respond)</b></h6>\r\n                </td>\r\n                <td data-title=\"Session\">\r\n                  <h5>${request.sessionId | sessionName:sessions.sessionsArray}</h5>\r\n                </td>\r\n                <td>\r\n                  <ul>\r\n                    <li class=\"${detail.requestStatus | getArrayValue:config.REQUEST_STATUS:'status':-1} list-group-item\" click.trigger=\"edit(detail, $event, $index)\" repeat.for=\"detail of request.requestDetails\" >\r\n                      <h5>${detail.productId | lookupValue:products.productsArray:\"_id\":\"name\"}</h5>\r\n                      Status: ${detail.requestStatus | lookupValue:config.REQUEST_STATUS:\"code\":\"description\"}\r\n                      <h7 class=\"leftMargin\">Required: ${detail.requiredDate | dateFormat:config.DATE_FORMAT_TABLE}</h7>\r\n                      <h7 class=\"pull-right\" show.bind=\"detail.requestStatus == config.CUSTOMER_ACTION_REQUEST_CODE && request.requestStatus != config.CUSTOMER_ACTION_REQUEST_CODE\" ><b>CUSTOMER ACTION REQUIRED (click here to respond)</b></h7>\r\n                    </li>\r\n                  </ul>\r\n                </td>\r\n              </tr>\r\n            </tbody>\r\n          </table>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/user/requests/createRequests.html":
/*!*******************************************************!*\
  !*** ./src/modules/user/requests/createRequests.html ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\n<!-- <require from=\"fuelux/css/fuelux.min.css\"></require>\n<require from=\"flatpickr/flatpickr.css\"></require> -->\n<div class=\"row\">\n <span  show.bind=\"showLockMessage\" class=\"leftMargin bottomMargin\" >Request is currently locked by ${lockObject.personId | lookupValue:people.peopleArray:\"_id\":'fullName'}</span>\n \n</div>\n  <div class=\"fuelux col-lg-7 blackText\" style=\"height:1000px;\">\n    <div class=\"wizard\" data-initialize=\"wizard\" id=\"myWizard\">\n      <div class=\"steps-container\">\n        <ul class=\"steps\">\n          <li data-step=\"1\"  data-target=\"#step1\" class=\"active\">\n            <span class=\"badge badge-info\">1</span>Step 1<span class=\"chevron\"></span>\n          </li>\n          <li data-step=\"2\" data-target=\"#step2\">\n            <span class=\"badge\">2</span>Step 2<span class=\"chevron\"></span>\n          </li>\n          <li data-step=\"3\" data-target=\"#step3\">\n            <span class=\"badge\">3</span>Step 3<span class=\"chevron\"></span>\n          </li>\n          <li data-step=\"4\" data-target=\"#step4\">\n            <span class=\"badge\">4</span>Step 4<span class=\"chevron\"></span>\n          </li>\n        </ul>\n      </div>\n      <div class=\"actions\">\n        <button type=\"button\" class=\"btn btn-default btn-prev btn-md\">\n           <span><i class=\"fa fa-chevron-left\" aria-hidden=\"true\"></i></span>Prev</button>\n        <button type=\"button\" class=\"btn btn-primary btn-next btn-md\" data-last=\"Complete\">Next\n          <span><i class=\"fa fa-chevron-right\" aria-hidden=\"true\"></i></span>\n        </button>\n      </div>\n      <div class=\"step-content\">\n\n        <div class=\"step-pane active\" id=\"step1\" data-step=\"1\">\n          <h3><strong>Step 1 </strong> - Course Information</h3>\n          <compose view=\"./components/client-request-step1.html\"></compose>\n        </div>\n\n        <div class=\"step-pane\" id=\"step2\"  data-step=\"2\">\n          <h3><strong>Step 2 </strong> - Products</h3>\n\n          <compose view=\"./components/client-request-step2.html\"></compose>\n\n        </div>\n\n        <div class=\"step-pane\" id=\"step3\"  data-step=\"3\">\n          <h3><strong>Step 3 </strong> - Additional Comments</h3>\n          <compose view=\"./components/client-request-step3.html\"></compose>\n        </div>\n\n        <div class=\"step-pane\" id=\"step4\"  data-step=\"4\">\n          <h3><strong>Step 4 </strong> - Requested Dates</h3>\n          <compose view=\"./components/client-request-step4.html\"></compose>\n        </div>\n\n      </div>\n    </div>\n  </div>\n  <div class=\"col-lg-4 leftMargin\" id=\"SessionInfo\">\n\t\t\t<h2 class=\"underline\">Current Sessions</h2>\n\t\t\t<div class=\"list-group\">\n\t\t\t\t<a class=\"list-group-item\" repeat.for=\"session of sessions.sessionsArray\">\n\t\t\t\t\t<h4 class=\"list-group-item-heading\">${session.sessionStatus}: Session ${session.session} - ${session.year}</h4>\n\t\t\t\t\t<p class=\"list-group-item-text\">Requests open: ${session.requestsOpenDate | dateFormat:config.DATE_FORMAT_TABLE}</p>\n\t\t\t\t\t<p class=\"list-group-item-text\">Clients available: ${session.startDate | dateFormat:config.DATE_FORMAT_TABLE}</p>\n\t\t\t\t\t<p class=\"list-group-item-text\">Session ends: ${session.endDate | dateFormat:config.DATE_FORMAT_TABLE}</p>\n\t\t\t\t</a>\n    </div>\n  </div>\n  <div show.bind=\"sessionSelected\" class=\"topMargin col-lg-4 leftMargin\"><h4>Session: ${sessions.selectedSession.session} - ${sessions.selectedSession.year}</h4></div> \n  <div show.bind=\"sandBoxClient\" class=\"topMargin col-lg-4 leftMargin\"><h4>Course: ${config.SANDBOX_NAME}</h4></div> \n  <div show.bind=\"courseSelected\" class=\"topMargin col-lg-4 leftMargin\"><h4>Course: ${people.selectedCourse.number} - ${people.selectedCourse.name}</h4></div> \n  <div class=\"topMargin col-lg-4 leftMargin\" style=\"display: none;\" id=\"existingRequestInfo\"></div>\n\n  <div id=\"curriculumInfo\" class=\"topMargin col-lg-4 leftMargin\" >\n    <div class=\"panel panel-default\" >\n      <div class=\"panel-heading\">${productInfoObject.header}</div>\n      <div class=\"panel-body\" innerhtml.bind=\"productInfoObject.info\"></div>\n    </div>\n  </div>\n</div>\n  \n</template>\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/user/requests/viewProducts.html":
/*!*****************************************************!*\
  !*** ./src/modules/user/requests/viewProducts.html ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n  <div class=\"container\">\r\n   <div class=\"col-lg-5 topMargin\">\r\n        <label id=\"productList\">Available Products</label>\r\n        <div class=\"well well2 overFlow\">\r\n          <input class=\"form-control\" value.bind=\"filter\" input.trigger=\"filterList()\" placeholder=\"Filter products\"/>\r\n          <ul class=\"list-group\">\r\n            <a  click.trigger=\"selectProduct($event)\" type=\"button\" repeat.for=\"product of filteredProductsArray\" id=\"${product._id}\"\r\n                    mouseover.delegate=\"showCurriculum(product, $event)\" mouseout.delegate=\"hideCurriculum()\"\r\n                    class=\"list-group-item dropbtn\">${product.name}</a>\r\n          </ul>\r\n        </div>\r\n\t</div>\r\n\t <div id=\"curriculumInfo\" class=\"topMargin col-lg-6 leftMargin\">\r\n\t\t<div class=\"col-lg-6\" style=\"position:fixed;\">\r\n\t\t\t<h2>${productInfoObject.header}</h2>\r\n\t\t\t<div class=\"panel-body\" innerhtml.bind=\"productInfoObject.info\"></div>\r\n\t\t</div>\r\n\t</div>\r\n  </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/user/requests/viewRequests.html":
/*!*****************************************************!*\
  !*** ./src/modules/user/requests/viewRequests.html ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div class=\"panel panel-default\">\r\n      <div class=\"panel-body\">\r\n        <div class=\"col-lg-4\">\r\n            <div class=\"form-group topMargin leftMargin\">\r\n                <select show.bind=\"!requestSelected\" value.bind=\"selectedSession\" change.delegate=\"getRequests()\" id=\"session\" class=\"form-control\">\r\n                <option repeat.for=\"session of sessions.sessionsArray\"\r\n                        value.bind=\"session._id\">Session ${session.session} - ${session.year}</option>\r\n                </select>\r\n            </div>\r\n        </div>\r\n\r\n        <div show.bind=\"!requestSelected\" class=\"col-lg-12\">\r\n            <div show.bind=\"noRequests\" class=\"bottomMargin leftMargin\">\r\n                <h4>You have no existing requests for this session</h4>\r\n            </div>\r\n            <compose  show.bind=\"!noRequests\"view=\"./components/viewRequestsTable.html\"></compose>\r\n        </div> \r\n        <div show.bind=\"requestSelected\" class=\"col-lg-12\">\r\n            <compose view=\"./components/viewRequestsForm.html\"></compose>\r\n        </div>\r\n      </div>\r\n    </div> \r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/user/support/components/Requests.html":
/*!***********************************************************!*\
  !*** ./src/modules/user/support/components/Requests.html ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n      <h5>These are your current product requests.  If the issue you are having is related to a specific product, please select it.</h5>\r\n      <div class=\"topMargin\">\r\n        <span id=\"selectProductRequestError\"></span>\r\n        <h5 show.bind=\"clientRequestsArray.length === 0\">You have no product requests that apply to this type of help ticket.</h5>\r\n        <table id=\"clientTable\" show.bind=\"clientRequestsArray.length > 0\" class=\"table table-bordered table-responsive\" style=\"background:white;\">\r\n          <thead>\r\n          <tr class=\"header\">\r\n            <th>Course</th>\r\n            <th>Session</th>\r\n            <th>Product</th>\r\n            <th>System</th>\r\n            <th>Client</th>\r\n            <th>Status</th>\r\n          </tr>\r\n          </thead>\r\n          <tbody>\r\n            <tr class=\"sortable\" id=\"${product.id}\" productId=\"${product.productId}\" \r\n                repeat.for=\"product of clientRequestsArray\"\r\n                click.trigger=\"requestChosen($event, $index)\">\r\n              <td>${product.courseName}</td>\r\n              <td>${product.sessionId | session:sessions.sessionsArray}</td>\r\n              <td>${product.productName}</td> \r\n              <td>${product.systemId | lookupValue:systems.systemsArray:\"_id\":\"sid\"}</td>\r\n              <td>${product.client}</td>\r\n              <td>${product.requestStatus | lookupValue:config.REQUEST_STATUS:\"code\":\"description\"}</td>\r\n            </tr>\r\n          </tbody>\r\n        </table>\r\n        <span id=\"client\"></span>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/user/support/components/comment.html":
/*!**********************************************************!*\
  !*** ./src/modules/user/support/components/comment.html ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n  <div class=\"smart-timeline-icon bottomMarginLg\" innerhtml.bind=\"comment.authorEmail | gravatarUrl:100:1\">\r\n\r\n  </div>\r\n  <div class=\"smart-timeline-time\">\r\n    <small>${comment.dateCreated | dateFormat:'YYYY-MM-DD':true}</small>\r\n  </div>\r\n  <div class=\"smart-timeline-content borderTop leftJustify\">\r\n\t<div class=\"form-group\">\r\n     \t<div innerhtml.bind=\"comment.comment\"></div>\r\n    </div>\r\n</div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/user/support/components/help-ticket-step1.html":
/*!********************************************************************!*\
  !*** ./src/modules/user/support/components/help-ticket-step1.html ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div class='topMargin bottomMargin'>\r\n        <label for=\"prioritySelect\" class='class=\"bigLabel topMargin'>Priority</label>\r\n        <select class=\"form-control\"\r\n            id=\"prioritySelect\" value.bind=\"helpTickets.selectedHelpTicket.priority\">\r\n            <option repeat.for=\"priority of config.HELP_TICKET_PRIORITIES\" value.bind=\"$index\">${priority.priority}</option>\r\n        </select>\r\n        <span>${config.HELP_TICKET_PRIORITIES[helpTickets.selectedHelpTicket.priority].message}</span>\r\n    </div>\r\n\r\n    <!-- Category Select -->\r\n    <div class=\"form-group\" show.bind=\"helpTickets.selectedHelpTicket.priority\">\r\n        <Label class=\"bigLabel topMargin\">To help us define your issue, select the category.</Label>\r\n        <select value.bind=\"helpTickets.selectedHelpTicket.helpTicketCategory\" change.delegate=\"categoryChanged()\" id=\"helpTicketCategory\"\r\n            class=\"form-control\">\r\n            <option value=\"-1\">Select the help ticket category</option>\r\n            <option repeat.for=\"types of helpTickets.helpTicketTypesArray | sortArray:'category':'ASC'\" model.bind=\"types.category\">${types.description}</option>\r\n        </select>\r\n    </div>\r\n\r\n    <!-- Type Select -->\r\n    <div show.bind=\"showTypes\" class=\"form-group\">\r\n        <Label class=\"bigLabel topMargin\">To help us further define your issue, select the type.</Label>\r\n        <select value.bind=\"helpTickets.selectedHelpTicket.helpTicketType\" change.delegate=\"typeChanged()\" id=\"helpTicketType\" class=\"form-control\">\r\n            <option value=\"-1\">Select the help ticket type</option>\r\n            <option repeat.for=\"types of helpTickets.helpTicketTypesArray[catIndex].subtypes\" model.bind=\"types.type\">${types.description}</option>\r\n        </select>\r\n    </div>\r\n\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/user/support/components/help-ticket-step2.html":
/*!********************************************************************!*\
  !*** ./src/modules/user/support/components/help-ticket-step2.html ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <compose view=\"./Requests.html\"></compose>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/user/support/components/help-ticket-step3.html":
/*!********************************************************************!*\
  !*** ./src/modules/user/support/components/help-ticket-step3.html ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div class=\"row\">\r\n      <div id=\"container\"></div>\r\n      <!--   <compose if.bind=\"showForm\" view=\"./inputForm-${catIndex}-${selectedHelpTicketType}.html\"></compose>  -->\r\n    </div>\r\n\r\n    <div class=\"leftMargin rightMargin topMargin panel panel-default\" style=\"padding:5px;\">\r\n        <div class='panel-body'>\r\n            <div class=\"row\">\r\n                <div>\r\n                    <label>Upload screenshots or other files that will help us solve you problem.</lable></br>\r\n                        <label>If you want to upload multiple files, hold the control key while selecting files</label>\r\n                </div>\r\n\r\n\r\n                <div class=\"col-lg-2\">\r\n                    <label class=\"btn btn-primary\">\r\n                        Browse for files&hellip; <input type=\"file\" style=\"display: none;\" change.delegate=\"changeFiles()\"\r\n                            files.bind=\"files\" multiple>\r\n                    </label>\r\n                </div>\r\n                <div class=\"col-lg-6 col-lg-offset-2\">\r\n                    <ul>\r\n                        <li repeat.for=\"file of filesToUpload\" class=\"list-group-item\" style=\"background-color:cyan;\">${file.name}<span click.delegate=\"removeFile($index)\"\r\n                                class=\"pull-right\" ><i class=\"fa fa-trash\" aria-hidden=\"true\"></i></span></li>\r\n                    </ul>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/user/support/components/help-ticket-step4.html":
/*!********************************************************************!*\
  !*** ./src/modules/user/support/components/help-ticket-step4.html ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\n    <div class=\"row topMargin leftMargin rightMargin\" id=\"descriptionGroup\">\n        <span id=\"descriptionErrorMessage\"></span>\n        <div class=\"form-group\">\n            <div innerhtml.bind=\"editorMessage\"></div>\n            <p>&nbsp;</p>\n            <editor id=\"comments\" value.bind=\"helpTickets.selectedHelpTicketContent.content.comments\" height=\"250\"></editor>\n        </div>\n\n        <div class=\"form-group topMargin\">\n            <div innerhtml.bind=\"stepsMessage\"></div>\n            <p>&nbsp;</p>\n            <editor id=\"steps\" value.bind=\"helpTickets.selectedHelpTicketContent.content.steps\" height=\"250\"></editor>\n        </div>\n    </div>\n</template>\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/user/support/components/help-ticket-step5.html":
/*!********************************************************************!*\
  !*** ./src/modules/user/support/components/help-ticket-step5.html ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div class=\"leftMargin rightMargin\">\r\n        <div show.bind=\"outputForm\">\r\n            <h3 class=\"topMargin\">Details:</h3>\r\n            <div class=\"card-title\" style=\"padding:20px;\" id=\"outputContainer\"></div>\r\n        </div>\r\n        <div show.bind=\"SelectedClientRequest\">\r\n            <h3 class=\"topMargin\">Product Request</h3>\r\n            <div class=\"card-title\">\r\n                <h4>Session: ${SelectedClientRequest.sessionId | session:sessions.sessionsArray}</h4>\r\n                <h4>Product: ${SelectedClientRequest.productName}</h4>\r\n                <h4>System: ${SelectedClientRequest.systemId | lookupValue:systems.systemsArray:\"_id\":\"sid\"}</h4>\r\n                <h4>Client: ${SelectedClientRequest.client}</h4>\r\n                <h4>Course: ${SelectedClientRequest.courseName}</h4>\r\n            </div>\r\n        </div>\r\n        <h3 class=\"topMargin\">Attachments:</h3>\r\n        <div show.bind=\"filesToUpload.length\" class=\"topMargin card-title\">\r\n            <ul>\r\n                <li repeat.for=\"file of filesToUpload\" class=\"list-group-item\">${file.name}<span click.delegate=\"removeFile($index)\"\r\n                        class=\"pull-right\"><i class=\"fa fa-trash\" aria-hidden=\"true\"></i></span></li>\r\n            </ul>\r\n        </div>\r\n        <div show.bind=\"!filesToUpload.length\" class=\"topMargin card-title\">Are you sure you don't want to add an\r\n            attachement?</div>\r\n        <h3 class=\"topMargin\">Description:</h3>\r\n        <div show.bind=\"helpTickets.selectedHelpTicketContent.content.comments\" class=\"topMargin card-title\"\r\n            innerhtml.bind=\"helpTickets.selectedHelpTicketContent.content.comments\"></div>\r\n        <div show.bind=\"!helpTickets.selectedHelpTicketContent.content.comments\" class=\"topMargin card-title\">Are you\r\n            sure you don't wish to provide a description?</div>\r\n        <h3 class=\"topMargin\">Steps to Reproduce:</h3>\r\n        <div show.bind=\"helpTickets.selectedHelpTicketContent.content.steps\" class=\"topMargin card-title\"\r\n            innerhtml.bind=\"helpTickets.selectedHelpTicketContent.content.steps\"></div>\r\n        <div show.bind=\"!helpTickets.selectedHelpTicketContent.content.steps\" class=\"topMargin card-title\">Are you sure\r\n            you don't wish to provide the steps to reproduce the problem?</div>\r\n    </div>\r\n\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/user/support/components/helpTicketWizard.html":
/*!*******************************************************************!*\
  !*** ./src/modules/user/support/components/helpTicketWizard.html ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\n    <!-- <require from=\"fuelux/css/fuelux.min.css\"></require>\n    <require from=\"flatpickr/flatpickr.css\"></require> -->\n\n    <div class=\"fuelux col-lg-7 blackText\" style=\"height:1000px;\">\n        <div class=\"wizard\" data-initialize=\"wizard\" id=\"myWizard\">\n            <div class=\"steps-container\">\n                <ul class=\"steps\">\n                    <li data-step=\"1\" data-bs-target=\"#step1\" class=\"active\">\n                        <span class=\"badge badge-info\">1</span>Step 1<span class=\"chevron\"></span>\n                    </li>\n                    <li data-step=\"2\" data-bs-target=\"#step2\">\n                        <span class=\"badge\">2</span>Step 2<span class=\"chevron\"></span>\n                    </li>\n                    <li data-step=\"3\" data-bs-target=\"#step3\">\n                        <span class=\"badge\">3</span>Step 3<span class=\"chevron\"></span>\n                    </li>\n                    <li data-step=\"4\" data-bs-target=\"#step4\">\n                        <span class=\"badge\">4</span>Step 4<span class=\"chevron\"></span>\n                    </li>\n                    <li data-step=\"5\" data-bs-target=\"#step5\">\n                        <span class=\"badge\">5</span>Step 5<span class=\"chevron\"></span>\n                    </li>\n                </ul>\n            </div>\n            <div class=\"actions\">\n                <button type=\"button\" class=\"btn btn-default btn-prev btn-md\">\n                    <span><i class=\"fa fa-chevron-left\" aria-hidden=\"true\"></i></span>Prev</button>\n                <button type=\"button\" class=\"btn btn-primary btn-next btn-md\" data-last=\"Complete\">Next\n                    <span><i class=\"fa fa-chevron-right\" aria-hidden=\"true\"></i></span>\n                </button>\n            </div>\n            <div class=\"step-content\">\n\n                 <div class=\"step-pane active\" id=\"step1\" data-step=\"1\">\n                    <h3><strong>Step 1 </strong> - Help Ticket Type</h3>\n                    <compose view=\"./help-ticket-step1.html\"></compose>\n                </div>\n\n              <div class=\"step-pane\" id=\"step2\" data-step=\"2\">\n                    <h3><strong>Step 2 </strong> - Which product request does this apply to</h3>\n\n                    <compose view=\"./help-ticket-step2.html\"></compose>\n\n                </div>\n\n                <div class=\"step-pane\" id=\"step3\" data-step=\"3\">\n                    <h3><strong>Step 3 </strong> - Give us some details and add attachments</h3>\n                    <compose view=\"./help-ticket-step3.html\"></compose>\n                </div>\n\n                 <div class=\"step-pane\" id=\"step4\" data-step=\"4\">\n                    <h3><strong>Step 4 </strong> - Describe the problem and tell us how to reproduce it</h3>\n                    <compose view=\"./help-ticket-step4.html\"></compose>\n                </div>\n\n                <div class=\"step-pane\" id=\"step5\" data-step=\"5\">\n                    <h3><strong>Step 5 </strong> - Review and Confirm</h3>\n                    <compose view=\"./help-ticket-step5.html\"></compose>\n                </div>\n\n            </div>\n        </div>\n    </div>\n</template>\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/user/support/components/viewHTForm.html":
/*!*************************************************************!*\
  !*** ./src/modules/user/support/components/viewHTForm.html ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div class=\"panel panel-default\" style=\"padding:5px;\">\r\n        <div class=\"panel-body\" >\r\n          <div class=\"row\">\r\n\r\n  <div class=\"fluid-container\">\r\n\r\n    <!-- Buttons -->\r\n    <div class=\"bottomMargin list-group-item\" style=\"position:fixed;z-index:1000;width:100%;top:91px;left:0;background-color:ghostwhite;\">\r\n      <span click.trigger=\"back()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n        data-original-title=\"Back\"><i class=\"fa fa-arrow-left fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n      <span show.bind=\"helpTickets.selectedHelpTicket.helpTicketStatus !== config.CLOSED_HELPTICKET_STATUS\" click.trigger=\"respond()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n        title=\"\" data-original-title=\"Respond\"><i class=\"fa fa-paper-plane fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n        <span class=\"leftMargin largeFont\">${viewHelpTicketsHeading}</span>\r\n    </div>\r\n\r\n    <!-- Help Ticket Header -->\r\n    <div class=\"topMargin\">\r\n      <!-- Enter Response -->\r\n      <div show.bind=\"enterResponse\" class=\"topMargin bottomMargin\">\r\n\r\n        <div class=\"panel panel-default leftMargin rightMargin\" style=\"background-color:ghostwhite;\">\r\n          <div class=\"panel-body\">\r\n    \r\n \r\n            <div class=\"bottomMargin list-group-item leftMargin rightMargin\">\r\n              <span click.trigger=\"saveResponse()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n                title=\"\" data-original-title=\"Send Response\"><i class=\"fa fa-floppy-o fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n              <span click.trigger=\"cancelResponse()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n                title=\"\" data-original-title=\"Cancel\"><i class=\"fa fa-ban fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n            </div>\r\n\r\n            <div class=\"row leftMargin rightMargin\">\r\n              <editor toolbar.bind=\"toolbar\" value.bind=\"helpTickets.selectedHelpTicketContent.content.comments\" height=\"250\"></editor>\r\n      \r\n              <p>&nbsp;</p>\r\n              <div class=\"row hidden-xs hidden-sm\">\r\n                <h4>Upload screenshots or other files that will help us solve you problem</h4>\r\n                  <div class=\"col-lg-2\">\r\n                      <label class=\"btn btn-primary\">\r\n                          Browse for files&hellip; <input type=\"file\" style=\"display: none;\" change.delegate=\"changeFiles()\"files.bind=\"files\" multiple>\r\n                      </label>\r\n                  </div>\r\n                  <div class=\"col-lg-6\">\r\n                      <ul>\r\n                          <li repeat.for = \"file of filesToUpload\" class=\"list-group-item\">${file.name}<span click.delegate=\"removeFile($index)\" class=\"pull-right\"><i class=\"fa fa-trash\" aria-hidden=\"true\"></i></span></li>\r\n                      </ul>\r\n                  </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"row\">\r\n        <div class=\"list-group-item leftMargin rightMargin\">\r\n            <div class=\"row\">\r\n              <div class=\"col-md-6\">\r\n                <div class=\"form-group\">\r\n                  <h4 class=\"col-md-offset-1\">Created: ${helpTickets.selectedHelpTicket.createdDate | dateFormat:'YYYY-MM-DD'} ${helpTickets.selectedHelpTicket.createdDate\r\n                    | dateFormat:'h:mm A'}</h4>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-md-5\">\r\n                <div class=\"form-group col-md-10\">\r\n                  <h4>Type: ${helpTickets.selectedHelpTicket.helpTicketType | lookupValue:config.HELP_TICKET_TYPES:\"code\":\"description\"}</h4>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"col-md-6\">\r\n                <div class=\"form-group\">\r\n                  <h4 class=\"col-md-offset-1\">Session: ${helpTickets.selectedHelpTicket.sessionId | session:sessions.sessionsArray}</h4>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-md-5\">\r\n                <div class=\"form-group col-md-10\">\r\n                  <h4>Status: ${helpTickets.selectedHelpTicket.helpTicketStatus | lookupValue:config.HELP_TICKET_STATUSES:\"code\":\"description\"}</h4>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"col-md-6\">\r\n                <div class=\"form-group\">\r\n                  <label class=\"col-md-offset-1\">Owner: ${helpTickets.selectedHelpTicket.owner[0].personId |  lookupValue:people:\"_id\":'fullName'}</label>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-md-5\">\r\n                <div class=\"form-group col-md-10\">\r\n                  <label>Keywords: ${helpTickets.selectedHelpTicket.keyWords}</label>\r\n                </div>\r\n              </div>\r\n            </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <compose view=\"../../../../resources/htTimeline/timeline.html\"></compose>\r\n</div>\r\n\r\n</div>\r\n</div>\r\n</div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/user/support/components/viewHTTable.html":
/*!**************************************************************!*\
  !*** ./src/modules/user/support/components/viewHTTable.html ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\n\n    <div class=\"panel panel-default\">\n        <div class=\"panel-body\">\n          <div class=\"row\">\n              <div show.bind=\"!helpTicketSelected\" class=\"col-lg-12\">\n                  <div show.bind=\"nohelpTickets\" class=\"bottomMargin leftMargin\">\n                      <h4>You have no open help tickets</h4>\n                      <span class=\"checkbox marginLeft\" style=\"white-space: nowrap;display:inline;\">\n              <label>\n                <input checked.bind=\"isCheckedCurrent\" change.trigger=\"retrieveClosedHelpTickets()\" type=\"checkbox\"> View closed help tickets\n              </label>\n            </span>\n                  </div>\n\n    <div class=\"hover\" innerhtml.bind=\"commentShown\"></div>\n\n  <div class=\"container\">\n      <div id='no-more-tables'>\n        <table class=\"table table-striped table-hover cf marginRight\">\n            <thead class=\"cf\">\n              <tr colspan=\"7\">\n                <compose view=\"../../../../resources/elements/table-navigation-bar.html\"></compose> \n              </tr>\n              <tr>\n                <td colspan='7'>\n                    <div class=\"checkbox\">\n                        <label>\n                            <input checked.bind=\"isChecked\" change.trigger=\"filterOutClosed()\" type=\"checkbox\"> Hide closed help tickets\n                        </label>\n                    </div>\n                </td>\n              </tr>\n              <tr>\n                <td colspan='7'>\n                  <span click.delegate=\"refresh()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\n                    title=\"\" data-original-title=\"Refresh\"><i class=\"fa fa-refresh\" aria-hidden=\"true\"></i></span>\n                  <span class=\"pull-right\" id=\"spinner\" innerhtml.bind=\"spinnerHTML\"></span>\n                </td>\n              </tr>\n              <tr> \n                <th><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'helpTicketNo'})\">Number </span><i class=\"fa fa-sort\"></i></th>\n                <th><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'helpTicketType'})\">Type </span><i class=\"fa fa-sort\"></i></th>\n                 <th>Owner</th>\n                <th  class=\"hidden-xs hidden-sm\"></th>\n                <th><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'helpTicketStatus'})\">Status </span><i class=\"fa fa-sort\"></i></th>\n                <th><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'createdDate'})\">Date Created </span><i class=\"fa fa-sort\"></i></th>\n                <th><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'modifiedDate'})\">Date Modified </span><i class=\"fa fa-sort\"></i></th>\n              </tr>\n               <tr>\n                <th></th>\n                <th>\n                  <input value.bind=\"helpTicketTypeFilterValue\" input.delegate=\"dataTable.filterList(helpTicketTypeFilterValue, { type: 'custom',  filter: customHelpTicketTypeFilter, collectionProperty: 'helpTicketType', displayProperty: 'helpTicketType',  compare:'custom'} )\"  class=\"form-control\" />\n                </th>\n                <th></th>\n                <th class=\"hidden-xs hidden-sm\"></th>\n                <th> \n                  <select value.bind=\"helpTicketStatusFilter\" input.delegate=\"dataTable.filterList($event, { type: 'value',  filter: 'helpTicketStatusFilter',  collectionProperty: 'helpTicketStatus', displayProperty: 'helpTicketStatus',  compare:'match'} )\" class=\"form-control\">\n                        <option value=\"\"></option>\n                        <option repeat.for=\"status of config.HELP_TICKET_STATUSES\" value.bind=\"status.code\">${status.description}</option>\n                  </select>\n                </th>\n                <th>\n                  <input type=\"date\" value.bind=\"createdDateFilterValue\" input.delegate=\"dataTable.filterList(createdDateFilterValue, {type: 'date', filter: 'createdDate',  collectionProperty: 'createdDate', compare: 'after'} )\"  class=\"form-control\" />\n                </th>\n                 <th>\n                  <input type=\"date\" value.bind=\"modifiedDateFilterValue\" input.delegate=\"dataTable.filterList(modifiedDateFilterValue, {type: 'date', filter: 'modifiedDate',  collectionProperty: 'modifiedDate', compare: 'after'} )\"  class=\"form-control\" />\n                </th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr class=\"sortable\" repeat.for=\"helpTicket of dataTable.displayArray\">\n                <td click.trigger=\"selectHelpTicket($event, $index)\" data-title=\"Number\">${helpTicket.helpTicketNo}</td>\n                <td  mouseover.delegate=\"showComment(helpTicket, $event)\" mouseout.delegate=\"hideComment()\" click.trigger=\"selectHelpTicket($event, $index)\"\n                data-title=\"Type\">${helpTicket.helpTicketType | helpTicketType:helpTickets.helpTicketTypesArray}\n              </td>\n                <td style=\"width:12rem;\" data-tile=\"Owner\">${helpTicket.owner[0].personId.fullName}</td> \n                <td style=\"width:2rem;\"  class=\"hidden-xs hidden-sm\" data-title=\"Close\">\n                  <span click.trigger=\"closeHelpTicket(helpTicket)\" show.bind=\"helpTicket.helpTicketStatus != config.CLOSED_HELPTICKET_STATUS\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Close Help Ticket\"><i class=\"fa fa-window-close-o fa-lg\" aria-hidden=\"true\"></i></span>\n                </td>  \n                <td click.trigger=\"selectHelpTicket($event, $index)\" data-title=\"Status\">${helpTicket.helpTicketStatus | lookupHTStatus:config.HELP_TICKET_STATUSES}</td>             \n                <td click.trigger=\"selectHelpTicket($event, $index)\" data-title=\"Created Date\">${helpTicket.createdDate | dateFormat:config.DATE_FORMAT_TABLE:false}</td>\n                <td data-title=\"Modified Date\" click.delegate=\"selectHelpTicket($event, $index)\">${helpTicket.modifiedDate | dateFormat:config.DATE_FORMAT_TABLE:false}</td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n      </div>\n  </div>\n\n       \n</div> \n</div> \n</div>\n</template>\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/user/support/createHelpTicketsWiz.html":
/*!************************************************************!*\
  !*** ./src/modules/user/support/createHelpTicketsWiz.html ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\n    <div class=\"panel panel-default\">\n        <div class=\"panel-body\">\n\n            <compose view='./components/helpTicketWizard.html'></compose>\n\n        </div>\n    </div> <!-- Panel Body -->\n</template>\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/user/support/curriculum.html":
/*!**************************************************!*\
  !*** ./src/modules/user/support/curriculum.html ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t<style>\r\n        .menuButtons {\r\n\t\t\tcolor: ${config.ACTIVE_SUBMENU_COLOR};\r\n\t\t\tbackground-color:${config.BUTTONS_BACKGROUND}\r\n        }\r\n    </style>\r\n\t<div class=\"col-lg-3\">\r\n\t\t<h4>Curriculum Categories</h4>\r\n\t\t<div>\r\n\t\t\t<ul id=\"buttonGroup\" class=\"list-group\">\r\n\t\t\t\t<button click.trigger=\"typeChanged($index, $event)\" type=\"button\" repeat.for=\"category of curriculum.curriculumCatArray\"\r\n\t\t\t\t\tid=\"${category.name}\" class=\"${ $first ? 'list-group-item menuButtons' : 'list-group-item'}\">${category.name}</button>\r\n\t\t\t</ul>\r\n\t\t</div>\r\n\t</div>\r\n\t<div class=\"col-lg-9\">\r\n\t\t<div show.bind=\"typeSelected != '' && !curriculumSelected\" style='padding:15px;'>\r\n\t\t\t<div class='row'>\r\n\t\t\t\t<div class='col-lg-12 bottomMargin'>\r\n\t\t\t\t\t<table id=\"newsTable\" class=\"table table-striped table-hover\">\r\n\t\t\t\t\t\t<thead>\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td colspan='4'>\r\n\t\t\t\t\t\t\t\t\t<compose view=\"../../../resources/elements/table-navigation-bar.html\"></compose>\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<th>Title </th>\r\n\t\t\t\t\t\t\t\t<th>Products</th>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t</thead>\r\n\t\t\t\t\t\t<tbody>\r\n\t\t\t\t\t\t\t<tr repeat.for=\"curriculum of curriculumArray\">\r\n\t\t\t\t\t\t\t\t<td click.delegate=\"selectCurriculum(curriculum)\" data-title=\"Title\" class=\"col-lg-6\">${curriculum.title}</td>\r\n\t\t\t\t\t\t\t\t<td data-title=\"Products\" class=\"col-lg-4\">\r\n\t\t\t\t\t\t\t\t\t<ul class=\"list-group\">\r\n\t\t\t\t\t\t\t\t\t\t<li repeat.for=\"product of curriculum.products\" class=\"list-group-item\">${product | lookupValue:products.productsArray:\"_id\":\"name\"}</li>\r\n\t\t\t\t\t\t\t\t\t</ul>\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t</tbody>\r\n\t\t\t\t\t</table>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div show.bind=\"curriculumSelected\">\r\n\t\t\t<div class=\"bottomMargin list-group-item leftMargin rightMargin\">\r\n\t\t\t\t<span click.delegate=\"back()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n\t\t\t\t\tdata-original-title=\"Back\"><i class=\"fa fa-arrow-left fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n\t\t\t\t<span click.delegate=\"add()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n\t\t\t\t\tdata-original-title=\"Add Comment\"><i class=\"fa fa-plus fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n\t\t\t\t<span show.bind=\"addComment\" click.delegate=\"save()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n\t\t\t\t\tdata-original-title=\"Save\"><i class=\"fa fa-floppy-o fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n\t\t\t\t<span show.bind=\"addComment\" click.delegate=\"cancel()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n\t\t\t\t\ttitle=\"\" data-original-title=\"Cancel Changes\"><i class=\"fa fa-ban fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"panel panel-default leftMargin rightMargin\">\r\n\t\t\t\t <div class=\"panel-heading\">\r\n\t\t\t\t\t<h3 class=\"panel-title\">${curriculum.selectedCurriculum.title}</h3>\r\n\t\t\t\t</div>\r\n\t\t\t\t\t<div show.bind=\"curriculum.selectedCurriculum.description.length > 0\" class=\"panel-body\" innerhtml.bind=\"curriculum.selectedCurriculum.description\">\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"row\">\r\n\t\t\t\t<div class=\"topMargin bigLeftMargin\" show.bind=\"curriculum.selectedCurriculum.file.fileName != undefined\">\r\n\t\t\t\t\t<a href=\"${config.DOWNLOAD_URL}/curriculum/${curriculum.selectedCurriculum.category}/${curriculum.selectedCurriculum.file.fileName}\" innerhtml.bind='curriculum.selectedCurriculum.file.fileName' target='_blank'></a>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div show.bind=\"addComment\">\r\n\t\t\t\t<h3>Comments are not anonymous</h3>\r\n\t\t\t\t <editor value.bind=\"comment\" height=\"250\"></editor>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"well well-sm topMargin leftMargin rightMargin\" show.bind=\"curriculum.selectedCurriculum.customerComments.length > 0\">\r\n\t\t\t\t<!-- Timeline Content -->\r\n\t\t\t\t<div class=\"smart-timeline\">\r\n\t\t\t\t\t<ul class=\"smart-timeline-list\">\r\n\t\t\t\t\t\t<li  repeat.for=\"comment of curriculum.selectedCurriculum.customerComments\">\r\n\t\t\t\t\t\t\t<compose view=\"./components/comment.html\"></compose>\r\n\t\t\t\t\t\t</li>\r\n\t\t\t\t\t</ul>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n\r\n</template>\r\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/user/support/downloads.html":
/*!*************************************************!*\
  !*** ./src/modules/user/support/downloads.html ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <style>\r\n        .menuButtons {\r\n\t\t\tcolor: ${config.ACTIVE_SUBMENU_COLOR};\r\n\t\t\tbackground-color:${config.SUBMENU_BACKGROUND}\r\n        }\r\n    </style>\r\n    <div class=\"panel panel-default\">\r\n      <div class=\"panel-body\">\r\n          <div class=\"col-lg-3\">\r\n\t\t<h4>Download Categories</h4>\r\n\t\t<div>\r\n\t\t\t<ul class=\"list-group\" id=\"buttonGroup\">\r\n\t\t\t\t<button click.trigger=\"typeChanged($event, $index)\" type=\"button\" repeat.for=\"type of downloads.appCatsArray\" id=\"${type.downCatcode}\"\r\n\t\t\t\t\tclass=\"${ $first ? 'menuButtons list-group-item' : 'list-group-item'}\">${type.description}</button>\r\n\t\t\t</ul>\r\n\t\t</div>\r\n\t</div>\r\n       \r\n\r\n        <div show.bind=\"typeSelected != ''\" class=\"col-lg-9\" style='padding:15px;'>\r\n            <div class='row'>\r\n                <div class='col-lg-12 bottomMargin'>\r\n                    <table id=\"newsTable\" class=\"table table-striped table-hover\">\r\n                        <thead>\r\n                            <tr>\r\n                                <td colspan='4'>\r\n                                    <compose view=\"../../../resources/elements/table-navigation-bar.html\"></compose> \r\n                                </td>\r\n                            </tr>\r\n                            <tr>\r\n                                <th><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'name'})\"> Name  </span><i class=\"fa fa-sort\"></i></th>\r\n                                <th>File</th>\r\n                                <th>Decription</th>\r\n                                <th><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'file.dateUploaded'})\"> Date </span><i class=\"fa fa-sort\"></i></th>\r\n                            </tr>\r\n                        </thead>\r\n                        <tbody>\r\n                            <tr repeat.for=\"item of dataTable.displayArray\">\r\n                                <td data-title=\"name\" class=\"col-md-2\">${item.name}</td>\r\n                                <td data-title=\"originalFilename\" class=\"col-md-2\">\r\n                                    <a href=\"${config.DOWNLOAD_URL}/downloads/${typeSelected}/${item.file.originalFilename}\" target=\"_blank\">${item.file.originalFilename}</a>\r\n                                </td>\r\n                                <td data-title=\"description\" class=\"col-md-6\">\r\n                                    <div>${item.description}</div>\r\n                                </td>\r\n                                <td class=\"col-md-2\">${item.file.dateUploaded | dateFormat}</td>\r\n                            </tr>\r\n                        </tbody>\r\n                    </table>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n   </div>\r\n</template>\r\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/user/support/links.html":
/*!*********************************************!*\
  !*** ./src/modules/user/support/links.html ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div class=\"row\">\r\n      <div repeat.for=\"category of linkArray\" class=\"col-lg-3\">\r\n        <h2>${category.category}</h2>\r\n        <div>\r\n          <a repeat.for=\"link of category.links\" href=\"${link.url}\" class=\"list-group-item link-shadow topMargin\" target=\"_blank\">\r\n            <h4 class=\"list-group-item-heading\">${link.title}</h4>\r\n            <p class=\"list-group-item-text\">${link.content}</p>\r\n          </a>\r\n        </div>\r\n      </div>\r\n  </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/user/support/support.html":
/*!***********************************************!*\
  !*** ./src/modules/user/support/support.html ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <compose view='../../../resources/elements/submenu.html'></compose>   \r\n    <div class=\"col-lg-12\">\r\n        <router-view></router-view>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/user/support/viewHelpTickets.html":
/*!*******************************************************!*\
  !*** ./src/modules/user/support/viewHelpTickets.html ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n<!--\r\n    <div class=\"panel panel-default\">\r\n      <div class=\"panel-body\">\r\n        <div class=\"row\">\r\n   \r\n            <div show.bind=\"!helpTicketSelected\" class=\"col-lg-12\">\r\n                <div show.bind=\"nohelpTickets\" class=\"bottomMargin leftMargin\">\r\n                    <h4>You have no open help tickets</h4>\r\n                    <span class=\"checkbox marginLeft\" style=\"white-space: nowrap;display:inline;\">\r\n\t\t\t\t\t\t<label>\r\n\t\t\t\t\t\t  <input checked.bind=\"isCheckedCurrent\" change.trigger=\"retrieveClosedHelpTickets()\" type=\"checkbox\"> View closed help tickets\r\n\t\t\t\t\t\t</label>\r\n\t\t\t\t\t</span>\r\n                </div>\r\n            --><div>\r\n                <compose show.bind=\"!nohelpTickets\" view=\"./components/viewHTTable.html\"></compose>\r\n            </div> \r\n           \r\n            <div show.bind=\"helpTicketSelected\" class=\"col-lg-12\">\r\n                <compose view=\"./components/viewHTForm.html\"></compose>\r\n            </div> \r\n     <!--\r\n        </div> \r\n      </div> \r\n    -->\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/user/user.html":
/*!************************************!*\
  !*** ./src/modules/user/user.html ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\n    <compose view=\"./components/banner.html\"></compose>\n\n    <div class=\"fluid-container\">\n\n        <div class=\"row\">\n            <div class=\"col-lg-3 col-lg-offset-1\">\n                <div class=\"bigMarginTop leftMargin\">\n                    <compose view=\"./components/uccInformation.html\"></compose>\n                </div>\n            </div>\n           \n            <div class=\"col-lg-3 col-md-11 col-sm-11 bigLeftMargin\">\n                <h2 show.bind=\"siteinfo.siteArray | infoFilter:'NEWS':true\" class=\"underline topMargin\">UCC and UA News</h2>\n                <img style=\"height: 150px; width: 100%; display: block;\" src=\"${config.IMG_DOWNLOAD_URL}img/uaucc.png\" alt=\"Card image\">\n                <div repeat.for=\"item of siteinfo.siteArray | infoFilter:'NEWS'\">\n                    <compose view=\"./components/newsItem.html\"></compose>\n                </div>\n            </div>\n\n            <div class=\"col-lg-3 col-md-11 col-sm-11  bigLeftMargin\">\n                <h2 class=\"underline bottomMargin\">Useful Links</h2>\n                <img style=\"height: 150px; width: 100%; display: block;\" src=\"${config.IMG_DOWNLOAD_URL}img/ua2.jpg\" alt=\"Card image\">\n                <div repeat.for=\"item of siteinfo.siteArray | infoFilter:'OLNK'\">\n                    <compose view=\"./components/homePageLinks.html\"></compose>\n                </div>\n            </div>\n\n        </div>\n\n    </div>\n</template>\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ })

}]);
//# sourceMappingURL=app-0cb29c41.2384d3fce1a12a237460.bundle.js.map