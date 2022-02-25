"use strict";
(self["webpackChunkclient"] = self["webpackChunkclient"] || []).push([["app-fc1603ca"],{

/***/ "modules/tech/requests/createRequest":
/*!****************************************************!*\
  !*** ./src/modules/tech/requests/createRequest.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateRequestTech": function() { return /* binding */ CreateRequestTech; }
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
/* harmony import */ var flatpickr__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! flatpickr */ 7545);
/* harmony import */ var aurelia_event_aggregator__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! aurelia-event-aggregator */ "aurelia-event-aggregator");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! moment */ 381);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_14__);
var _dec, _class;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }














 // import fuelux from 'fuelux';


var CreateRequestTech = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(aurelia_router__WEBPACK_IMPORTED_MODULE_1__.Router, _config_appConfig__WEBPACK_IMPORTED_MODULE_7__.AppConfig, _resources_utils_validation__WEBPACK_IMPORTED_MODULE_10__["default"], _resources_data_people__WEBPACK_IMPORTED_MODULE_9__.People, _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_11__.CommonDialogs, _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_2__.DataTable, _resources_utils_utils__WEBPACK_IMPORTED_MODULE_8__.Utils, _resources_data_sessions__WEBPACK_IMPORTED_MODULE_3__.Sessions, _resources_data_products__WEBPACK_IMPORTED_MODULE_4__.Products, _resources_data_clientRequests__WEBPACK_IMPORTED_MODULE_6__.ClientRequests, _resources_data_siteInfo__WEBPACK_IMPORTED_MODULE_5__.SiteInfo, aurelia_event_aggregator__WEBPACK_IMPORTED_MODULE_13__.EventAggregator), _dec(_class = /*#__PURE__*/function () {
  function CreateRequestTech(router, config, validation, people, dialog, datatable, utils, sessions, products, requests, siteInfo, ea) {
    this.sessionSelected = false;
    this.spinnerHTML = "";
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
    this.dialog = dialog;
    this.ea = ea;
    this.userObj = JSON.parse(sessionStorage.getItem('user'));
    ;
  }

  var _proto = CreateRequestTech.prototype;

  _proto.activate = /*#__PURE__*/function () {
    var _activate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var responses;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return Promise.all([this.sessions.getSessionsArray('?filter=[or]sessionStatus|Active:Requests&order=sortOrder', true), this.products.getProductsArray('?filter=active|eq|true&order=name', true), this.people.getInstitutionsArray('?filter=[and]institutionStatus|eq|01:apj|ne|true&order=name'), this.siteInfo.getMessageArray('?filter=category|eq|CLIENT_REQUESTS', true), this.config.getConfig()]);

            case 2:
              responses = _context.sent;
              this.requests.selectRequest();
              this.filterList();

              this._setUpValidation();

              this.useSandbox = this.config.SANDBOX_USED;

              if (!this.config.SANDBOX_USED) {
                this.typeSelected = true;
                this.regularClient = true;
                this.requestType = "regularCourse";
              }

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function activate() {
      return _activate.apply(this, arguments);
    }

    return activate;
  }();

  _proto.changeBeginDate = function changeBeginDate(evt) {
    if (evt.detail && evt.detail.value.date !== "") {
      this.minEndDate = moment__WEBPACK_IMPORTED_MODULE_14___default()(evt.detail.value.date).format("MM/DD/YYYY");
      this.requests.selectedRequest.endDate = moment__WEBPACK_IMPORTED_MODULE_14___default().max(this.requests.selectedRequest.startDate, this.requests.selectedRequest.endDate);
    }
  };

  _proto.selectProduct = function selectProduct(el) {
    if (!this.showLockMessage) {
      if (this.alreadyOnList(el.target.id)) {
        this.utils.showNotification("You can't add the same product more than once.", "warning");
      } else {
        $("#requestProductsLabel").html("Requested Products");
        var newObj = this.requests.emptyRequestDetail();
        newObj.productId = el.target.id;
        newObj.sessionId = this.sessionId;
        newObj.courseId = this.courseId;
        this.requests.selectedRequest.requestDetails.push(newObj);
        this.products.selectedProductFromId(newObj.productId);
        this.requests.selectedRequest.requestDetails[this.requests.selectedRequest.requestDetails.length - 1].productName = this.products.selectedProduct.name; // var productInfo = this.products.selectedProduct.productInfo ? this.products.selectedProduct.productInfo : "";
        // if(productInfo) {
        // 	this.productInfo.push({
        // 		info: productInfo,
        // 		productId: newObj.productId,
        // 		header: this.products.selectedProduct.name
        // 	});
        // }
      }
    }

    this.validation.makeValid($("#productList"));
  };

  _proto.alreadyOnList = function alreadyOnList(id) {
    for (var i = 0; i < this.requests.selectedRequest.requestDetails.length; i++) {
      if (this.requests.selectedRequest.requestDetails[i].productId === id) return true;
    }

    return false;
  };

  _proto.removeProduct = function removeProduct(el) {
    var _this = this;

    if (!this.showLockMessage) {
      for (var i = 0; i < this.requests.selectedRequest.requestDetails.length; i++) {
        if (el.target.id === this.requests.selectedRequest.requestDetails[i].productId) {
          if (this.requests.selectedRequest.requestDetails[i]._id) {
            if (this.requests.selectedRequest.requestDetails[i].requestStatus == this.config.ASSIGNED_REQUEST_CODE) {
              return this.dialog.showMessage("That request has already been assigned and cannot be deleted?", "Cannot Delete Request", ['Ok']).whenClosed(function (response) {});
            } else {
              return this.dialog.showMessage("Are you sure you want to delete that request?", "Delete Request", ['Yes', 'No']).whenClosed(function (response) {
                if (!response.wasCancelled) {
                  _this.requests.selectedRequest.requestDetails[i].delete = true; // this.requests.selectedRequest.requestDetails.splice(i,1);
                }
              });
            }

            break;
          } else {
            this.requests.selectedRequest.requestDetails.splice(i, 1);

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
  };

  _proto._buildRequest = function _buildRequest() {
    var _this2 = this;

    if (this.requests.selectedRequest._id) {
      this.requests.selectedRequest.requestDetailsToSave = this.requests.selectedRequest.requestDetails;
      this.requests.selectedRequest.requestDetailsToSave.forEach(function (item, index) {
        if (item.requestStatus != _this2.config.ASSIGNED_REQUEST_CODE) item.requestStatus = _this2.config.UPDATED_REQUEST_CODE;
      });
      this.requests.selectedRequest.requestStatus = this.config.UPDATED_REQUEST_CODE;
    } else {
      this.requests.selectedRequest.requestStatus = this.config.UNASSIGNED_REQUEST_CODE;
    } // this.requests.selectedRequest.audit[0].personId = this.userObj._id;


    this.requests.selectedRequest.institutionId = this.selectedInstitution;
    this.requests.selectedRequest.sessionId = this.sessionId;
    this.requests.selectedRequest.courseId = this.courseId;
    this.requests.selectedRequest.personId = this.selectedPerson;
  };

  _proto.save = /*#__PURE__*/function () {
    var _save = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var serverResponse;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!this.validation.validate(1)) {
                _context2.next = 7;
                break;
              }

              this._buildRequest(); // let email = this._buildEmailObject();


              _context2.next = 4;
              return this.requests.saveRequest({});

            case 4:
              serverResponse = _context2.sent;

              if (!serverResponse.status) {
                this.utils.showNotification("The product request was updated");
                this.systemSelected = false;
              }

              this._cleanUp();

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function save() {
      return _save.apply(this, arguments);
    }

    return save;
  }();

  _proto._buildEmailObject = function _buildEmailObject() {
    var _this3 = this;

    var mailObject = new Object();
    mailObject.products = new Array();
    this.requests.selectedRequest.requestDetails.forEach(function (detail, index) {
      _this3.products.selectedProductFromId(detail.productId);

      var date = new Date(detail.requiredDate);
      var day = date.getDate();
      var month = date.getMonth();
      var year = date.getFullYear();
      mailObject.products.push({
        id: detail.productId,
        requiredDate: month + "/" + day + "/" + year,
        name: _this3.products.selectedProduct.name
      });
    });
    mailObject.comments = this.requests.selectedRequest.comments;
    mailObject.name = this.userObj.fullName;
    mailObject.numStudents = parseInt(this.requests.selectedRequest.undergradIds) + parseInt(this.requests.selectedRequest.graduateIds);
    mailObject.email = this.people.selectedPerson.email;
    mailObject.reason = 1;
    mailObject.cc = this.config.REQUESTS_EMAIL_LIST ? this.config.REQUESTS_EMAIL_LIST : ""; // mailObject.message = "The status was changed to " + description;

    return mailObject;
  };

  _proto._cleanUp = function _cleanUp() {
    this.requests.selectRequest();
    this.productInfo = new Array();
    this.sessionSelected = false;
    this.institutionSelected = false;
    this.personSelected = false;
    this.typeSelected = false;
    this.courseSelected = false;

    if (!this.config.SANDBOX_USED) {
      this.typeSelected = true;
      this.regularClient = true;
      this.requestType = "regularCourse";
    }

    this.sandBoxClient = false;
    $("#existingRequestInfo").hide();
    this.courseId = "-1";
    this.sessionId = "";
    this.requestType = -1;
  }
  /*******************************************************************
   * User changes the session
   * el - event object
   ******************************************************************/
  ;

  _proto.changeSession =
  /*#__PURE__*/
  function () {
    var _changeSession = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(el) {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (this.sessionId == "") {
                //Drop down list changed to no session selected
                this.sessionSelected = false;
                this.courseSelected = false;
                this.sandBoxClient = false;
              } else {
                // this._unLock();
                this.sessionSelected = true; //Select a session

                this.sessions.selectSession(el.target.selectedIndex - 1);
                this.setDates(); // this.validation.makeValid( $(el.target));
                // await this.getRequests();
              }

            case 1:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function changeSession(_x) {
      return _changeSession.apply(this, arguments);
    }

    return changeSession;
  }();

  _proto.changeInstitution = function changeInstitution(el) {
    console.log(this.selectedInstitution);
    this.institutionSelected = true;
    this.courseSelected = false;
    this.personSelected = false;

    if (!this.config.SANDBOX_USED) {
      this.typeSelected = true;
      this.regularClient = true;
      this.requestType = "regularCourse";
    }

    this.selectedPerson = "";
    this.requestType = "";
    $("#existingRequestInfo").empty().hide();
    this.people.getInstitutionPeople('?filter=institutionId|eq|' + this.selectedInstitution + '&order=lastName', true);
  };

  _proto.changePerson = function changePerson(el) {
    this.personSelected = true;
    this.people.selectedPersonFromId(this.selectedPerson, 'i');

    if (!this.config.SANDBOX_USED) {
      this.people.getCoursesArray(true, '?filter=personId|eq|' + this.selectedPerson + '&order=number', true);
    }
  };

  _proto.changeRequestType = function changeRequestType(el) {
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
        break;
    }
  } //Courses
  ;

  _proto.openEditCourseForm =
  /*#__PURE__*/
  function () {
    var _openEditCourseForm = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (this.showCourses) {
                _context4.next = 3;
                break;
              }

              _context4.next = 3;
              return this.refreshCourses();

            case 3:
              this.showCourses = !this.showCourses;

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function openEditCourseForm() {
      return _openEditCourseForm.apply(this, arguments);
    }

    return openEditCourseForm;
  }();

  _proto.refreshCourses = /*#__PURE__*/function () {
    var _refreshCourses = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return this.people.getCoursesArray(true, '?filter=personId|eq|' + this.selectedPerson + '&order=number', true);

            case 2:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function refreshCourses() {
      return _refreshCourses.apply(this, arguments);
    }

    return refreshCourses;
  }();

  _proto.editACourse = function editACourse() {
    if (this.courseId != -1) {
      this.editCourse = true;
      $("#number").focus();
    }
  };

  _proto.newCourse = function newCourse() {
    this.editCourseIndex = -1;
    this.people.selectCourse();
    $("#number").focus();
    this.editCourse = true;
  };

  _proto.saveCourse = /*#__PURE__*/function () {
    var _saveCourse = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
      var serverResponse;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (!this.validation.validate(5)) {
                _context6.next = 9;
                break;
              }

              if (!this.userObj._id) {
                _context6.next = 9;
                break;
              }

              if (this.people.selectedCourse._id) this.editCourseIndex = this.baseArray.length;
              this.people.selectedCourse.personId = this.userObj._id;
              _context6.next = 6;
              return this.people.saveCourse();

            case 6:
              serverResponse = _context6.sent;

              if (!serverResponse.status) {
                this.utils.showNotification("The course was updated");
              }

              this.editCourse = false;

            case 9:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function saveCourse() {
      return _saveCourse.apply(this, arguments);
    }

    return saveCourse;
  }();

  _proto.cancelEditCourse = function cancelEditCourse() {
    this.editCourse = false;
  };

  _proto.selectCourse = /*#__PURE__*/function () {
    var _selectCourse = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(index, el) {
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              this.editCourseIndex = index;
              this.people.selectCourse(this.editCourseIndex);
              this.courseSelected = true;
              this.courseId = this.people.selectedCourse._id;
              _context7.next = 6;
              return this.getRequests();

            case 6:
              if (this.selectedCourseRow) this.selectedCourseRow.children().removeClass('info');
              this.selectedCourseRow = $(el.target).closest('tr');
              this.selectedCourseRow.children().addClass('info');

            case 9:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function selectCourse(_x2, _x3) {
      return _selectCourse.apply(this, arguments);
    }

    return selectCourse;
  }();

  _proto.getRequests = /*#__PURE__*/function () {
    var _getRequests = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
      var dateFoo, existingMsg;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              if (!(this.sessionId != -1 && this.courseId != -1)) {
                _context8.next = 8;
                break;
              }

              this.ILockedIt = false;
              this.existingRequest = false;
              _context8.next = 5;
              return this.requests.getClientRequestsArray('?filter=[and]personId|eq|' + this.selectedPerson + ':sessionId|eq|' + this.sessionId + ':courseId|eq|' + this.courseId, true);

            case 5:
              if (this.requests.requestsArray && this.requests.requestsArray.length > 0) {
                this.requests.selectRequest(0);
                this.setDates(false); // await this._lock();

                this.ILockedIt = true;
                this.existingRequest = true;

                if (this.requests.requestsArray && this.requests.requestsArray.length > 0) {
                  dateFoo = moment__WEBPACK_IMPORTED_MODULE_14___default()(new Date(this.requests.selectedRequest.requestDetails[0].createdDate)).format(this.config.DATE_FORMAT_TABLE);
                  existingMsg = this.siteInfo.selectMessageByKey('EXISTING_REQUEST_MESSAGE').content.replace('DATECREATED', dateFoo);
                  $("#existingRequestInfo").html('').append(existingMsg).fadeIn();
                } else {
                  $("#existingRequestInfo").empty().hide();
                }
              } else {
                $("#existingRequestInfo").empty().hide();
                this.setDates(true);
                this.existingRequest = false;
                this.requests.selectRequest();
                this.requests.selectedRequest.sessionId = this.sessionId;
              }

              _context8.next = 9;
              break;

            case 8:
              this.existingRequest = false;

            case 9:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    function getRequests() {
      return _getRequests.apply(this, arguments);
    }

    return getRequests;
  }();

  _proto.filterList = function filterList() {
    if (this.filter) {
      var thisFilter = this.filter;
      this.filteredProductsArray = this.products.productsArray.filter(function (item) {
        return item.name.toUpperCase().indexOf(thisFilter.toUpperCase()) != -1;
      });
    } else {
      this.filteredProductsArray = this.products.productsArray;
    }
  };

  _proto.setDates = function setDates(session) {
    if (session) {
      $("#input-startDate").val("");
      $("#input-endDate").val("");
    }

    this.minStartDate = this.sessions.selectedSession.startDate;
    this.maxStartDate = this.sessions.selectedSession.endDate;
    this.minEndDate = this.sessions.selectedSession.startDate;
    this.maxEndDate = this.sessions.selectedSession.endDate;
    var nowPlusLeeway = moment__WEBPACK_IMPORTED_MODULE_14___default()(new Date()).add(this.config.REQUEST_LEEWAY, 'days');
    this.minRequiredDate = moment__WEBPACK_IMPORTED_MODULE_14___default().max(nowPlusLeeway, moment__WEBPACK_IMPORTED_MODULE_14___default()(this.sessions.selectedSession.startDate));
    this.minRequiredDate = moment__WEBPACK_IMPORTED_MODULE_14___default()(this.minRequiredDate._d).format('YYYY-MM-DD');
    this.maxRequiredDate = this.sessions.selectedSession.endDate;
  };

  _proto.changeCourse = /*#__PURE__*/function () {
    var _changeCourse = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(el) {
      var courseId;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              courseId = el.target.options[el.target.selectedIndex].value;
              this.selectedCourseIndex = el.target.selectedIndex;

              if (!(courseId === "")) {
                _context9.next = 6;
                break;
              }

              this.courseSelected = false;
              _context9.next = 11;
              break;

            case 6:
              this.courseSelected = true;
              this.courseName = this.courses[el.target.selectedIndex - 1].number + " - " + this.courses[el.target.selectedIndex - 1].name;
              this.validation.makeValid($(el.target));
              _context9.next = 11;
              return this.getRequests();

            case 11:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, this);
    }));

    function changeCourse(_x4) {
      return _changeCourse.apply(this, arguments);
    }

    return changeCourse;
  }();

  _proto._setUpValidation = function _setUpValidation() {
    this.validation.addRule(1, "session", [{
      "rule": "custom",
      "message": "Select a session",
      "valFunction": function valFunction(context) {
        return !(context.sessionId == -1);
      }
    }]);
    this.validation.addRule(1, "institution", [{
      "rule": "custom",
      "message": "Select an institution",
      "valFunction": function valFunction(context) {
        return !(context.selectedInstitution == "");
      }
    }]);
    this.validation.addRule(1, "faculty", [{
      "rule": "custom",
      "message": "Select a person",
      "valFunction": function valFunction(context) {
        return !(context.selectedPerson == "");
      }
    }]);
    this.validation.addRule(1, "course", [{
      "rule": "custom",
      "message": "Select a course",
      "valFunction": function valFunction(context) {
        return context.courseId != undefined && !(context.courseId == "-1");
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
      "valFunction": function valFunction(context) {
        return !(context.requestType == -1);
      }
    }]);
    this.validation.addRule(1, "numberOfStudentsError", [{
      "rule": "custom",
      "message": "Enter either the number of undergradate or graduate students",
      "valFunction": function valFunction(context) {
        if (context.requestType === "sandboxCourse") {
          return true; // } else if(($("#undergraduates").val() === "" || $("#undergraduates").val() == 0) && ($("#graduates").val() === "" || $("#graduates").val() == 0)){
        } else if (context.requests.selectedRequest.undergradIds == 0 && context.requests.selectedRequest.graduateIds == 0) {
          return false;
        } else {
          return true;
        }
      }
    }]);
    this.validation.addRule(1, "productList", [{
      "rule": "custom",
      "message": "Select at least one product",
      "valFunction": function valFunction(context) {
        if (context.requests.selectedRequest.requestDetails.length === 0) {
          return false;
        } else {
          return true;
        }
      }
    }]);
    this.validation.addRule(1, "productListTable", [{
      "rule": "custom",
      "message": "Enter all required dates",
      "valFunction": function valFunction(context) {
        for (var i = 0; i < context.requests.selectedRequest.requestDetails.length; i++) {
          if (!context.requests.selectedRequest.requestDetails[i].requiredDate || context.requests.selectedRequest.requestDetails[i].requiredDate === "") {
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
  };

  return CreateRequestTech;
}()) || _class);

/***/ }),

/***/ "modules/tech/requests/techRequests":
/*!***************************************************!*\
  !*** ./src/modules/tech/requests/techRequests.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TechRequests": function() { return /* binding */ TechRequests; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var aurelia_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-router */ 6433);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../config/appConfig */ 1666);
var _dec, _class;




var TechRequests = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(aurelia_router__WEBPACK_IMPORTED_MODULE_1__.Router, _config_appConfig__WEBPACK_IMPORTED_MODULE_2__.AppConfig), _dec(_class = /*#__PURE__*/function () {
  function TechRequests(router, config) {
    this.title = "Tech Staff Client Assignments";
    this.router = router;
    this.config = config;
  }

  var _proto = TechRequests.prototype;

  _proto.attached = function attached() {
    $(".nav a").on("click", function () {
      $(".nav").find(".active").removeClass("active");
      $(this).parent().addClass("active");
    });
  };

  _proto.activate = function activate() {
    this.config.getConfig(true);
  };

  _proto.configureRouter = function configureRouter(config, router) {
    config.map([{
      route: ['', 'assignments'],
      moduleId: './assignments',
      settings: {
        auth: true,
        roles: []
      },
      nav: true,
      name: 'assignments',
      title: "Assignments"
    }, {
      route: 'createRequest',
      moduleId: './createRequest',
      settings: {
        auth: true,
        roles: []
      },
      nav: true,
      name: 'createRequest',
      title: 'Create Request'
    }, // {
    //     route: 'clientRequestsAnalytics',
    //     moduleId: PLATFORM.moduleName('../../analytics/clientRequests'),
    //     settings: { auth: true, roles: [] },
    //     nav: true,
    //     name: 'clientRequests',
    //     title: 'Client Requests Analytics'
    // },
    {
      route: 'clientRequestsArchive',
      moduleId: './archiveClientRequests',
      settings: {
        auth: true,
        roles: []
      },
      nav: true,
      name: 'archiveClientRequests',
      title: 'Client Requests Archive'
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
    } // {
    //     route: 'apjRequests',
    //     moduleId: PLATFORM.moduleName('./apjRequests'),
    //     settings: { auth: true, roles: [] },
    //     nav: true,
    //     name: 'apjRequests',
    //     title: 'APJ Requests'
    // }
    ]);
    this.router = router;
  };

  return TechRequests;
}()) || _class);

/***/ }),

/***/ "modules/tech/requests/viewUserRequests":
/*!*******************************************************!*\
  !*** ./src/modules/tech/requests/viewUserRequests.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ViewUserRequests": function() { return /* binding */ ViewUserRequests; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../resources/utils/dataTable */ 6847);
/* harmony import */ var _resources_data_sessions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../resources/data/sessions */ 2073);
/* harmony import */ var _resources_data_products__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../resources/data/products */ 8666);
/* harmony import */ var _resources_data_systems__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../resources/data/systems */ 4077);
/* harmony import */ var _resources_data_clientRequests__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../resources/data/clientRequests */ 5446);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../config/appConfig */ 1666);
/* harmony import */ var _resources_data_people__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../resources/data/people */ 353);
/* harmony import */ var flatpickr__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! flatpickr */ 7545);
var _dec, _class;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }










var ViewUserRequests = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_config_appConfig__WEBPACK_IMPORTED_MODULE_6__.AppConfig, _resources_data_people__WEBPACK_IMPORTED_MODULE_7__.People, _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_1__.DataTable, _resources_data_sessions__WEBPACK_IMPORTED_MODULE_2__.Sessions, _resources_data_products__WEBPACK_IMPORTED_MODULE_3__.Products, _resources_data_clientRequests__WEBPACK_IMPORTED_MODULE_5__.ClientRequests, _resources_data_systems__WEBPACK_IMPORTED_MODULE_4__.Systems), _dec(_class = /*#__PURE__*/function () {
  function ViewUserRequests(config, people, datatable, sessions, products, requests, systems) {
    this.sessionSelected = false;
    this.spinnerHTML = "";
    this.configDate = {};
    this.config = config;
    this.people = people;
    this.dataTable = datatable;
    this.dataTable.initialize(this);
    this.sessions = sessions;
    this.products = products;
    this.requests = requests;
    this.systems = systems;
    this.userObj = JSON.parse(sessionStorage.getItem('user'));
    ;
  }

  var _proto = ViewUserRequests.prototype;

  _proto.activate = /*#__PURE__*/function () {
    var _activate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var responses;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return Promise.all([this.sessions.getSessionsArray('?order=startDate:DSC', true), this.products.getProductsArray('?filter=active|eq|true&order=name', true), this.people.getInstitutionsArray('?filter=institutionStatus|eq|01&order=name'), this.systems.getSystemsArray(), this.config.getConfig()]);

            case 2:
              responses = _context.sent;
              this.requests.selectRequest();
              this.filterList();

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function activate() {
      return _activate.apply(this, arguments);
    }

    return activate;
  }();

  _proto.filterList = function filterList() {
    if (this.filter) {
      var thisFilter = this.filter;
      this.filteredProductsArray = this.products.productsArray.filter(function (item) {
        return item.name.toUpperCase().indexOf(thisFilter.toUpperCase()) != -1;
      });
    } else {
      this.filteredProductsArray = this.products.productsArray;
    }
  }
  /*******************************************************************
   * User changes the session
   * el - event object
   ******************************************************************/
  ;

  _proto.changeSession =
  /*#__PURE__*/
  function () {
    var _changeSession = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(el) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (this.sessionId == "") {
                //Drop down list changed to no session selected
                this.sessionSelected = false;
              } else {
                this.sessionSelected = true;
                this.sessions.selectSessionById(this.sessionId); // this.sessions.selectSession(el.target.selectedIndex - 1);

                this.getRequests();
              }

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function changeSession(_x) {
      return _changeSession.apply(this, arguments);
    }

    return changeSession;
  }();

  _proto.changeInstitution = function changeInstitution(el) {
    console.log(this.selectedInstitution);
    this.institutionSelected = true;
    this.personSelected = false;
    this.selectedPerson = "";
    $("#existingRequestInfo").empty().hide();
    this.people.getInstitutionPeople('?filter=institutionId|eq|' + this.selectedInstitution + '&order=lastName', true);
  };

  _proto.changePerson = function changePerson(el) {
    this.personSelected = true;
    this.people.selectedPersonFromId(this.selectedPerson, 'i');
  };

  _proto.getRequests = /*#__PURE__*/function () {
    var _getRequests = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!this.personSelected) {
                _context3.next = 4;
                break;
              }

              _context3.next = 3;
              return this.requests.getClientRequestsArray('?filter=[and]sessionId|eq|' + this.sessions.selectedSession._id + ':personId|eq|' + this.people.selectedPerson._id, true);

            case 3:
              if (this.requests.requestsArray && this.requests.requestsArray.length) {
                this.dataTable.updateArray(this.requests.requestsArray);
                this.noRequests = false;
              } else {
                this.noRequests = true;
              }

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function getRequests() {
      return _getRequests.apply(this, arguments);
    }

    return getRequests;
  }();

  _proto.refresh = /*#__PURE__*/function () {
    var _refresh = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return this._unLock();

            case 2:
              this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
              _context4.next = 5;
              return this.getRequests();

            case 5:
              this.spinnerHTML = "";

            case 6:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function refresh() {
      return _refresh.apply(this, arguments);
    }

    return refresh;
  }();

  _proto.edit = /*#__PURE__*/function () {
    var _edit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(product, el, index) {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
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

            case 14:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function edit(_x2, _x3, _x4) {
      return _edit.apply(this, arguments);
    }

    return edit;
  }();

  _proto.back = function back() {
    this.requestSelected = false;
  };

  return ViewUserRequests;
}()) || _class);

/***/ }),

/***/ "modules/tech/requests/components/ArchiveRequestsForm.html":
/*!***********************************************************************!*\
  !*** ./src/modules/tech/requests/components/ArchiveRequestsForm.html ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n  <div class=\"bottomMargin list-group-item leftMargin rightMargin\">\r\n    <span click.delegate=\"back()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n      data-placement=\"bottom\" title=\"\" data-original-title=\"Back\"><i class=\"fa fa-arrow-left fa-lg fa-border\"\r\n        aria-hidden=\"true\"></i></span>\r\n    <span click.delegate=\"openFacultyDetails()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n      data-placement=\"bottom\" title=\"\" data-original-title=\"Details\"><i class=\"fa fa-user fa-lg fa-border\"\r\n        aria-hidden=\"true\"></i></span>\r\n    <span click.delegate=\"openSettings()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n      data-placement=\"bottom\" title=\"\" data-original-title=\"Settings\"><i class=\"fa fa-cog fa-lg fa-border\"\r\n        aria-hidden=\"true\"></i></span>\r\n    <span click.delegate=\"openAudit()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n      data-placement=\"bottom\" title=\"\" data-original-title=\"Audit\"><i class=\"fa fa-history fa-lg fa-border\"\r\n        aria-hidden=\"true\"></i></span>\r\n  </div>\r\n  <div class=\"row leftMargin rightMargin\">\r\n    <div show.bind=\"!facultyDetails\" class=\"well col-lg-12\">\r\n      <div class=\"col-lg-4\">\r\n        <div class=\"col-lg-12\">\r\n          <h5>Request No: ${selectedRequestDetail.requestNo}</h5>\r\n        </div>\r\n        <div class=\"col-lg-12\">\r\n          <h5>Required Date: ${selectedRequestDetail.requiredDate | dateFormat:config.DATE_FORMAT_TABLE}</h5>\r\n        </div>\r\n        <div class=\"col-lg-12\">\r\n          <h5>Product: ${selectedRequestDetail.productId.name}</h5>\r\n        </div>\r\n        <div class=\"col-lg-12\">\r\n          <h5>Course: ${selectedRequestDetail.requestId.courseId.name}</h5>\r\n        </div>\r\n      </div>\r\n      <div class=\"col-lg-4\">\r\n        <div class=\"col-lg-12\">\r\n          <h5>Faculty: ${selectedRequestDetail.requestId.personId.fullName}</h5>\r\n        </div>\r\n        <div class=\"col-lg-12\">\r\n          <h5>Email: ${selectedRequestDetail.requestId.personId.email}</h5>\r\n        </div>\r\n        <div class=\"col-lg-12\">\r\n          <h5>Institution: ${selectedRequestDetail.requestId.institutionId.name}</h5>\r\n        </div>\r\n        <div class=\"col-lg-12\">\r\n          <h5>Phone: ${selectedRequestDetail.requestId.personId.phone | phoneNumber} Mobile:\r\n            ${selectedRequestDetail.requestId.personId.mobile | phoneNumber}</h5>\r\n        </div>\r\n      </div>\r\n      <div class=\"col-lg-4\">\r\n        <div class=\"col-lg-12\">\r\n          <h5><strong>IDs Required: ${idsRequired}</strong></h5>\r\n        </div>\r\n        <div class=\"col-lg-12\">\r\n          <h5><strong>IDs Assigned: ${totalIdsAssigned}</strong></h5>\r\n        </div>\r\n        <div class=\"col-lg-12\">\r\n          <h5><strong>IDs Remaining: ${idsRemaining}</strong></h5>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n  </div>\r\n  <div show.bind=\"showAudit\">\r\n    <table class=\"table table-striped table-hover\">\r\n      <thead>\r\n        <tr>\r\n          <th>Date</th>\r\n          <th>Property</th>\r\n          <th>Old Value</th>\r\n          <th>New Value</th>\r\n          <th>Person</th>\r\n        </tr>\r\n      </thead>\r\n      <tbody>\r\n        <tr repeat.for=\"item of selectedRequestDetail.requestId.audit\">\r\n          <td>${item.eventDate | dateFormat:config.DATE_FORMAT_TABLE}</td>\r\n          <td>${item.property}</td>\r\n          <td>${item.oldValue}</td>\r\n          <td>${item.newValue}</td>\r\n          <td>${item.personId | lookupValue:people.uccPeople:\"_id\":\"fullName\"}</td>\r\n        </tr>\r\n      </tbody>\r\n    </table>\r\n  </div>\r\n\r\n  <div show.bind=\"!showAudit\" class=\"row\">\r\n    <div class=\"row leftMargin rightMargin\">\r\n      <table id=\"assignmentTable\" class=\"table table-striped table-hover\">\r\n        <thead>\r\n          <tr>\r\n            <th class=\"col-sm-1\">System</th>\r\n            <th class=\"col-sm-1\">Client</th>\r\n            <th class=\"col-sm-1\">Assigned IDs</th>\r\n            <th>Student IDs</th>\r\n            <th>Student Password</th>\r\n            <th>Faculty IDs</th>\r\n            <th>Faculty Password</th>\r\n            <th>Assigned Date</th>\r\n            <th>Status</th>\r\n            <th></th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr class=\"dropbtn\" click.trigger=\"selectProposedClient($index, $event)\"\r\n            repeat.for=\"client of assignmentDetails\" class=\"${client.notValid}\">\r\n            <td>${client.systemId | lookupValue:systems.systemsArray:\"_id\":\"sid\"}</td>\r\n            <td>${client.client}</td>\r\n            <td>${client.idsAssigned}</td>\r\n            <td>${client.studentUserIds}</td>\r\n            <td>${client.studentPassword}</td>\r\n            <td>${client.facultyUserIds}</td>\r\n            <td>${client.facultyPassword}</td>\r\n            <td>${client.assignedDate | dateFormat:config.DATE_FORMAT_TABLE}</td>\r\n            <td>${client.notValid | overlap}\r\n            <td><span click.delegate=\"deleteProposedClient($index)\" class=\"smallMarginRight\" bootstrap-tooltip\r\n                data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Delete\"><i\r\n                  class=\"fa fa-trash-o\" aria-hidden=\"true\"></i></span></td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n  </div>\r\n\r\n  <div show.bind=\"!showAudit\" class=\"row leftMargin\">\r\n    <div class=\"panel panel-default col-lg-5 leftMargin\">\r\n      <div class=\"panel-body\">\r\n        <h3>Request Details</h3>\r\n        <h5 class=\"topMargin\">Product: ${selectedRequestDetail.productId.name}</h5>\r\n        <h5 class=\"topMargin\">Required Date: ${selectedRequestDetail.requiredDate | dateFormat:config.DATE_FORMAT_TABLE}\r\n        </h5>\r\n        <h5 show.bind=\"selectedRequestDetail.requestId.courseId != config.SANDBOX_ID\" class=\"topMargin\">Undergraduates:\r\n          ${selectedRequestDetail.requestId.undergradIds}</h5>\r\n        <h5 show.bind=\"selectedRequestDetail.requestId.courseId != config.SANDBOX_ID\" class=\"topMargin\">Graduates:\r\n          ${selectedRequestDetail.requestId.graduateIds}</h5>\r\n        <h5 class=\"topMargin\">Begin Date: ${selectedRequestDetail.requestId.startDate |\r\n          dateFormat:config.DATE_FORMAT_TABLE}</h5>\r\n        <h5 class=\"topMargin\">End Date: ${selectedRequestDetail.requestId.endDate | dateFormat:config.DATE_FORMAT_TABLE}\r\n        </h5>\r\n        <div if.bind=\"selectedRequestDetail.requestId.comments.length > 0\" class=\"row topMargin\">\r\n          <div class=\"col-sm-12\">\r\n            <div class=\"form-group\">\r\n              <h5>Comments:</h5>\r\n              <div class=\"topMargin\" innerhtml.bind=\"selectedRequestDetail.requestId.comments\"></div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div if.bind=\"selectedRequestDetail.techComments.length > 0\" class=\"row topMargin\">\r\n          <div class=\"col-sm-12\">\r\n            <div class=\"form-group\">\r\n              <h5>Comments:</h5>\r\n              <div class=\"topMargin\" innerhtml.bind=\"selectedRequestDetail.techComments\"></div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <!-- show.bind=\"requests.selectedRequestDetail.assignments.length > 0\" -->\r\n\r\n    <div class=\"panel panel-default col-lg-6 rightMargin leftMargin\">\r\n      <div class=\"panel-body\">\r\n        <!-- show.bind=\"requests.selectedRequestDetail.requestStatus == config.ASSIGNED_REQUEST_CODE\" -->\r\n        <div class=\"panel panel-primary topMargin\">\r\n          <div class=\"panel-body\">\r\n\r\n            <table class=\"table table-striped table-hover\">\r\n              <thead>\r\n                <tr>\r\n                  <th>System</th>\r\n                  <th>Client</th>\r\n                  <th>Student IDs</th>\r\n                  <th>Student Password</th>\r\n                </tr>\r\n              </thead>\r\n              <tbody>\r\n                <tr repeat.for=\"assign of selectedRequestDetail.assignments\"\r\n                  click.trigger=\"selectAssignment(assign, $index)\">\r\n                  <td>${assign.systemId | lookupValue:systems.systemsArray:\"_id\":\"sid\"}</td>\r\n                  <td>${assign.client}</td>\r\n                  <td>${assign.studentUserIds}</td>\r\n                  <td>${assign.studentPassword}</td>\r\n                </tr>\r\n              </tbody>\r\n            </table>\r\n\r\n            <h4 show.bind=\"selectedRequestDetail.requestId.courseId != config.SANDBOX_ID\" class=\"topMargin\">\r\n              <strong>Faculty IDs</strong></h4>\r\n            <div class=\"form-group\">\r\n              <h5 show.bind=\"selectedRequestDetail.requestId.courseId != config.SANDBOX_ID\" class=\"panel-title\">Faculty\r\n                IDs: ${requests.selectedRequestDetail.assignments[selectedAssignmentIndex].facultyUserIds}</h3>\r\n            </div>\r\n            <div class=\"form-group\">\r\n              <h5 show.bind=\"selectedRequestDetail.requestId.courseId != config.SANDBOX_ID\" class=\"panel-title\">Faculty\r\n                Password: ${requests.selectedRequestDetail.assignments[selectedAssignmentIndex].facultyPassword}</h5>\r\n            </div>\r\n\r\n            <h4 class=\"bigTopMargin\"><strong>System Details</strong></h4>\r\n            <div class=\"form-group\">\r\n              <h5 class=\"panel-title\">SID: ${systems.selectedSystem.sid}</h3>\r\n            </div>\r\n            <div class=\"form-group\">\r\n              <h5 class=\"panel-title\">Server: ${systems.selectedSystem.server}</h3>\r\n            </div>\r\n            <div class=\"form-group\">\r\n              <h5 class=\"panel-title\">System Number: ${systems.selectedSystem.instance}</h3>\r\n            </div>\r\n            <div class=\"form-group\">\r\n              <h5 class=\"panel-title\">ITS: ${systems.selectedSystem.its}</h3>\r\n            </div>\r\n            <label show.bind=\"products.selectedProduct.documents && products.selectedProduct.documents.length > 0\"\r\n              class=\"topMargin\">Helpful Documents</label>\r\n            <div class=\"list-group\">\r\n              <a repeat.for=\"document of products.selectedProduct.documents\"\r\n                href=\"${config.DOCUMENT_FILE_DOWNLOAD_URL}/${document.categoryCode}/${document.categoryName}/${document.fileName}\"\r\n                target=\"_blank\">${document.fileName}</a>\r\n            </div>\r\n            <label\r\n              show.bind=\"requests.selectedRequestDetail.techComments && requests.selectedRequestDetail.techComments.length > 0\"\r\n              class=\"topMargin\">Assignment Comments</label>\r\n            <div\r\n              show.bind=\"requests.selectedRequestDetail.techComments && requests.selectedRequestDetail.techComments.length > 0\"\r\n              class=\"col-lg-12 topMargin well overFlow\" innerhtml.bind=\"requests.selectedRequestDetail.techComments\">\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  </div>\r\n  </div>\r\n</template>\r\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/tech/requests/components/ArchiveRequestsTable.html":
/*!************************************************************************!*\
  !*** ./src/modules/tech/requests/components/ArchiveRequestsTable.html ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t  <div class=\"row\">\r\n      <!-- Session Select -->\r\n      <div class=\"col-lg-4\">\r\n        <div class=\"form-group topMargin leftMargin\">\r\n            <select value.bind=\"selectedSession\" change.delegate=\"getRequests()\" id=\"session\" class=\"form-control\">\r\n              <option repeat.for=\"session of sessions.sessionsArray\"\r\n                      value.bind=\"session._id\">Session ${session.session} - ${session.year}</option>\r\n            </select>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n      <div show.bind=\"selectedSession\">\r\n        <div class=\"row\">\r\n          <div class=\"col-lg-12\">\r\n            <compose view=\"./archiveTable.html\"></compose>\r\n          </div>\r\n      </div>\r\n  </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/tech/requests/components/Courses.html":
/*!***********************************************************!*\
  !*** ./src/modules/tech/requests/components/Courses.html ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div class=\"topMargin\">\r\n        <H4>Choose a Course</h4>\r\n        <table id=\"coursesTable\" class=\"table table-striped table-hover\">\r\n            <thead>\r\n                <tr>\r\n                    <td colspan='6'>\r\n                        <span click.delegate=\"refreshCourses()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Refresh\"><i class=\"fa fa-refresh\" aria-hidden=\"true\"></i></span>\r\n                        <span click.delegate=\"newCourse()\" class=\"smallMarginRight\"  bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"New Course\"><i class=\"fa fa-plus\" aria-hidden=\"true\"></i></span>\r\n                        <span style=\"margin-left:5px;\"  class=\"smallMarginRight\"  bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Save\" click.delegate=\"editACourse()\"><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></span>\r\n                        <span class=\"pull-right\" id=\"spinner\" innerhtml.bind=\"spinnerHTML\"></span>\r\n                    </td>\r\n                </tr>\r\n                <tr>\r\n                    <th style=\"width:20rem;\">Number </th>\r\n                    <th style=\"width:30rem;\">Name</th>\r\n                </tr>\r\n            </thead>\r\n            <tbody>\r\n                <tr id=\"selectCourse\" click.delegate=\"selectCourse($index, $event)\"  repeat.for=\"course of people.coursesArray\">\r\n                    <td data-title=\"nummber\">${course.number} </td>\r\n                    <td data-title=\"name\">${course.name}</td>\r\n                </tr>\r\n            </tbody>\r\n        </table>\r\n\r\n        <div class=\"row\" show.bind=\"editCourse\">\r\n            <div class=\"panel panel-default col-md-10 col-md-offset-1\" style=\"background-color:ghostwhite;\">\r\n                <div class=\"bottomMargin list-group-item leftMargin rightMargin topMargin\">\r\n                    <span click.trigger=\"saveCourse()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Save Course\"><i class=\"fa fa-floppy-o fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n                    <span click.trigger=\"cancelEditCourse()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Cancel\"><i class=\"fa fa-ban fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n                </div>\r\n                <div class=\"panel-body\">\r\n                    <div class=\"form-group\">\r\n                        <input id=\"number\" value.bind=\"people.selectedCourse.number\" type=\"text\" placeholder=\"Course Number\"\r\n                            class=\"form-control\"/>\r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <input id=\"name\" value.bind=\"people.selectedCourse.name\" type=\"text\" placeholder=\"Course Name\"\r\n                            class=\"form-control\"/>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <span id=\"course\"></span>\r\n</template>\r\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/tech/requests/components/archiveTable.html":
/*!****************************************************************!*\
  !*** ./src/modules/tech/requests/components/archiveTable.html ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n  <div class=\"col-lg-12 letMargin rightMargin\">\r\n      <table id=\"requestsTable\" class=\"table table-striped table-hover\">\r\n        <thead>\r\n          <tr>\r\n            <td colspan='9'>\r\n              <compose view=\"../../../../resources/elements/table-navigation-bar.html\"></compose>\r\n            </td>\r\n          </tr>\r\n          <tr>\r\n            <td colspan='9'>\r\n              <span click.delegate=\"refresh()\"class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Refresh\"><i class=\"fa fa-refresh\" aria-hidden=\"true\"></i></span>\r\n              <span click.delegate=\"clearFilters()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Clear Filters\"><i class=\"fa fa-filter\" aria-hidden=\"true\"></i></span>\r\n              <span click.delegate=\"downloadExcel()\"  class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Export to Excel\"><i class=\"fa fa-download\" aria-hidden=\"true\"></i></span>\r\n            </td>\r\n            <td></td>\r\n          </tr>\r\n          <tr>\r\n           <!-- <th class=\"col-xs-1\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'requestNo'})\">No </span><span><i class=\"fa fa-sort\"></i></span></th> -->\r\n            <th class=\"col-lg-1\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'requiredDate'})\">Due </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n            <th class=\"col-lg-1\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'createdDate'})\">Created </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n            <th class=\"col-lg-1\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {type: 'custom', sorter: customRequestStatusSorter, propertyName: 'requestStatus'})\">Status </span><i class=\"fa fa-sort\"></i></th>   \r\n            <th class=\"col-sm-1\">IDS Requestd</th>\r\n            <th class=\"col-lg-2\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'productId.name'})\">Product </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n            <th class=\"col-lg-2\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {type: 'custom', sorter: customCourseSorter, propertyName: 'requestId.courseId.name'})\">Course </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n            <th class=\"col-lg-1\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {type: 'custom', sorter: customPersonSorter, propertyName: 'requestId.personId.lastName'})\">Faculty </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n            <th class=\"col-lg-1\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {type: 'custom', sorter: customInstitutionsSorter, propertyName: 'requestId.institutionId'})\">Institution </span><i class=\"fa fa-sort\"></i></th>\r\n            \r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr>\r\n            <th>\r\n              <input type=\"date\" value.bind=\"requiredDateFilterValue\" input.delegate=\"dataTable.filterList(requiredDateFilterValue, {type: 'date', filter: 'requiredDate',  collectionProperty: 'requiredDate', compare: 'after'} )\"  class=\"form-control\" />\r\n            </th>\r\n            <th>\r\n              <input type=\"date\" value.bind=\"createdDateFilterValue\" input.delegate=\"dataTable.filterList(createdDateFilterValue, {type: 'date', filter: 'createdDate',  collectionProperty: 'createdDate', compare: 'after'} )\"  class=\"form-control\" />\r\n            </th>\r\n            <th>\r\n              <select value.bind=\"requestStatusFilter\" input.delegate=\"dataTable.filterList($event, { type: 'value',  filter: 'requestStatusFilter',  collectionProperty: 'requestStatus', displayProperty: 'requestStatus',  compare:'match'} )\" class=\"form-control\">\r\n                <option value=\"\"></option>\r\n                <option repeat.for=\"status of config.REQUEST_STATUS\" value=\"${status.code}\">${status.description}</option>\r\n              </select>\r\n            </th>\r\n            <th></th>\r\n            <th>\r\n              <input value.bind=\"productFilterValue\" input.delegate=\"dataTable.filterList(productFilterValue, { type: 'custom',  filter: customProductNameFilter,  compare:'custom'} )\"  class=\"form-control\" />\r\n            </th>\r\n            <th>\r\n              <input value.bind=\"courseFilterValue\" input.delegate=\"dataTable.filterList(courseFilterValue, { type: 'custom',  filter: courseCustomFilter, compare:'custom'} )\"  class=\"form-control\" />\r\n            </th>\r\n            <th>\r\n              <input value.bind=\"helpTicketTypeFilterValue\" input.delegate=\"dataTable.filterList(helpTicketTypeFilterValue, { type: 'custom',  filter: customNameFilter,  compare:'custom'} )\"  class=\"form-control\" />\r\n            </th>\r\n            <th>\r\n              <input value.bind=\"institutionFilterValue\" input.delegate=\"dataTable.filterList(institutionFilterValue, { type: 'custom',  filter: institutionCustomFilter, compare:'custom'} )\"  class=\"form-control\" />\r\n            </th>\r\n           \r\n          </tr>\r\n          <tr click.delegate=\"selectARequest($index, $event, request)\" repeat.for=\"request of dataTable.displayArray\" class=\"${request.requestStatus | getArrayValue:config.REQUEST_STATUS:'status':-1}\">\r\n            <td  data-title=\"requiredDate\">${request.requiredDate | dateFormat:config.DATE_FORMAT_TABLE}</td>\r\n            <td  data-title=\"dateCreated\">${request.createdDate | dateFormat:config.DATE_FORMAT_TABLE}</td>\r\n            <td  data-title=\"status\">${request.requestStatus | lookupValue:config.REQUEST_STATUS:\"code\":\"description\"}</td>\r\n            <td  data-title=\"ids-requested\">${request.requestId | idsRequested}\r\n            <td  data-title=\"product\">${request.productId.name}</td>\r\n            <td data-title=\"Course\">${request.requestId.courseId.name}</td>\r\n            <td  data-title=\"Name\">${request.requestId.personId.fullName} </td>\r\n            <td data-title=\"Name\">${request.requestId.institutionId.name}</td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n  </div>\r\n</template>\r\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/tech/requests/components/assignmentDetails.html":
/*!*********************************************************************!*\
  !*** ./src/modules/tech/requests/components/assignmentDetails.html ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div show.bind=\"selectedRequestDetail.assignments.length > 0\">\r\n      <h4 class=\"topMargin\"><strong>Assignments</strong></h4>\r\n      <div show.bind=\"selectedRequestDetail.requestStatus == config.ASSIGNED_REQUEST_CODE\" class=\"panel panel-primary topMargin\">\r\n        <div class=\"panel-body\">  \r\n          <ul style=\"padding-left:10px;\">\r\n\t\t\t\t\t\t<li class=\"list-group-item\" repeat.for=\"assign of selectedRequestDetail.assignments\">\r\n             <compose if.bind=\"systems.selectedSystem.type === 'ERP' || !systems.selectedSystem.type\" view=\"./erp.html\"></compose>\r\n             <compose if.bind=\"systems.selectedSystem.type === 'HANA'\" view=\"./hana.html\"></compose>\r\n              <compose if.bind=\"systems.selectedSystem.type === 'BO'\" view=\"./bo.html\"></compose>\r\n\t\t\t\t\t\t</li>\r\n          </ul>\r\n\r\n          <label show.bind=\"products.selectedProduct.documents && products.selectedProduct.documents.length > 0\" class=\"topMargin\">Helpful Documents</label>\r\n          <div class=\"list-group\">\r\n            <a repeat.for=\"document of products.selectedProduct.documents\" href=\"${config.DOCUMENT_FILE_DOWNLOAD_URL}/${document.categoryCode}/${document.categoryName}/${document.fileName}\"  target=\"_blank\">${document.fileName}</a>\r\n          </div>\r\n          <label show.bind=\"selectedRequestDetail.techComments && selectedRequestDetail.techComments.length > 0\" class=\"topMargin\">Assignment Comments</label>\r\n          <div show.bind=\"selectedRequestDetail.techComments && selectedRequestDetail.techComments.length > 0\" class=\"col-lg-12 topMargin well overFlow\" innerhtml.bind=\"selectedRequestDetail.techComments\"></div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>\r\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/tech/requests/components/bo.html":
/*!******************************************************!*\
  !*** ./src/modules/tech/requests/components/bo.html ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t\t <div class=\"row leftMargin\">\r\n\t\t\t<h4>URL</h4>\r\n\t\t\t<h5 class=\"leftMargin\"><a href=\"${systems.selectedSystem.its}\" target=\"_blank\">${systems.selectedSystem.its}</a></h5>\r\n\r\n\t\t\t<h4 class=\"topMargin\">Users</h4>\r\n\t\t\t<h5 class=\"leftMargin\">Student IDs: <span class=\"bold\"> ${assign.studentUserIds}</span></h5>\r\n\t\t\t<h5 class=\"leftMargin\">Student Password: <span class=\"bold\"> ${assign.studentPassword}</span></h5>\r\n\t\t\t<span show.bind=\"requests.selectedRequest.courseId !== null\">\r\n\t\t\t\t<h5 class=\"leftMargin\" class=\"topMargin\">Faculty IDs <span class=\"bold\">: ${selectedRequestDetail.assignments[selectedAssignmentIndex].facultyUserIds}</span></h5>\r\n\t\t\t\t<h5 class=\"leftMargin\">Faculty Password: <span class=\"bold\"> ${selectedRequestDetail.assignments[selectedAssignmentIndex].facultyPassword}</span></h5>\r\n\t\t\t</span>\r\n\t\t</div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/tech/requests/components/bulkEmailForm.html":
/*!*****************************************************************!*\
  !*** ./src/modules/tech/requests/components/bulkEmailForm.html ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t<div class=\"panel panel-default rightMargin leftMargin\" style=\"margin-top:50px;\">\r\n\t\t<div class=\"panel-body\">\r\n\t\t\t<div class=\"row\">\r\n\t\t\t\t<div class=\"list-group-item toolbar\">\r\n\t\t\t\t\t<span click.delegate=\"backBulkEmail()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n\t\t\t\t\t data-placement=\"bottom\" title=\"\" data-original-title=\"Back\"><i class=\"fa fa-arrow-left fa-lg fa-border\"\r\n\t\t\t\t\t\t aria-hidden=\"true\"></i></span>\r\n\t\t\t\t\t<span click.delegate=\"sendBulkEmail()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n\t\t\t\t\t data-placement=\"bottom\" title=\"\" data-original-title=\"Send\"><i class=\"fa fa-envelope fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n\t\t\t\t</div>\r\n\r\n\t\t\t\t<div class=\"col-md-4 topMargin\">\r\n\t\t\t\t\t<label id=\"productList\">Recipients: ${emailArray.length}</label>\r\n\t\t\t\t\t<div class=\"well well2 overFlow\" style=\"height:800px;\">\r\n\t\t\t\t\t\t<ul>\r\n\t\t\t\t\t\t\t<li class=\"list-group-item\" repeat.for=\"person of emailArray\">\r\n\t\t\t\t\t\t\t\t<span class=\"col-lg-10\" style=\"padding-left:0px;\">\r\n\t\t\t\t\t\t\t\t\t<h5>${person.fullName}</h5>\r\n\t\t\t\t\t\t\t\t</span>\r\n\t\t\t\t\t\t\t\t<span class=\"col-lg-1\">\r\n\t\t\t\t\t\t\t\t\t<span class=\"col-lg-2 icon glyphicon glyphicon-trash pull-right smallMarginRight\" click.delegate=\"deleteRecipient($index)\"></span>\r\n\t\t\t\t\t\t\t\t</span>\r\n\t\t\t\t\t\t\t\t<h6>${person.email}</h6>\r\n\t\t\t\t\t\t\t\t<h6>${person.institution}</h6>\r\n\t\t\t\t\t\t\t\t<h7>${person.status}</h7>\r\n\t\t\t\t\t\t\t</li>\r\n\t\t\t\t\t\t</ul>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"col-md-8\">\r\n\t\t\t\t\t<input class=\"form-control topMargin bottomMargin\" value.bind=\"email.subject\" placeholder=\"Subject\" />\r\n\t\t\t\t\t<div class=\"topMargin\">\r\n\t\t\t\t\t\t<editor value.bind=\"email.MESSAGE\" height=\"600\" editorid=\"bulkEmail\"></editor>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/tech/requests/components/editRequestsForm.html":
/*!********************************************************************!*\
  !*** ./src/modules/tech/requests/components/editRequestsForm.html ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t\t<div  class=\"panel panel-default rightMargin leftMargin\" style=\"margin-top:50px;\">\r\n        <div class=\"panel-body\">\r\n            <div class=\"row\">\r\n  <div class=\"hoverProfile\" >\r\n      <span  click.delegate=\"hideProfile()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Close\"><i class=\"fa fa-window-close-o\" aria-hidden=\"true\"></i></span>\r\n      <span  click.delegate=\"customerActionDialog()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Send Email\"><i class=\"fa fa-envelope-o\" aria-hidden=\"true\"></i></span>\r\n      <hr/>\r\n      <div class=\"col-md-4\">\r\n\t\t\t\t <div class=\"topMargin\">\r\n            <img if.bind=\"personImage\" class=\"circular--square leftMargin\" src =\"${config.PERSON_IMAGE_DOWNLOAD_URL}/${selectedRequestDetail.requestId.personId.file.fileName}\" height=\"100\">\r\n        </div>\r\n        <div if.bind=\"!personImage\" style=\"height:100px;width:100px;\" innerhtml.bind=\"selectedRequestDetail.requestId.personId.email | gravatarUrl:100:6\"></div>\r\n      </div>\r\n      <div class=\"col-md-8\">\r\n        <h5>Nickname: ${selectedRequestDetail.requestId.personId.nickName}</h5>\r\n        <h5>Phone: ${selectedRequestDetail.requestId.personId.phone | formatPhone}</h5>\r\n        <h5>Mobile: ${selectedRequestDetail.requestId.personId.mobile | formatPhone}</h5>\r\n        <h5>Email: ${selectedRequestDetail.requestId.personId.email}</h5>\r\n      </div>\r\n  </div>\r\n<div class=\"fluid-container\">\r\n\t<div class=\"list-group-item toolbar\">\r\n\t\t<span click.delegate=\"backEdit()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Back\"><i class=\"fa fa-arrow-left fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n\t\t<span click.delegate=\"saveEdit()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Save\"><i class=\"fa fa-floppy-o fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n\t\t<span click.delegate=\"customerActionDialog()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Customer Action\"><i class=\"fa fa-paper-plane fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n\t\t<span click.delegate=\"openAudit()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Audit\"><i class=\"fa fa-history fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n\t\t<span click.delegate=\"delete()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Delete\"><i class=\"fa fa-trash fa-lg fa-border text-danger\" aria-hidden=\"true\"></i></span>\r\n\t</div>\r\n\r\n\t<div show.bind=\"showAudit\">\r\n    <table class=\"table table-striped table-hover\">\r\n      <thead>\r\n        <tr>\r\n          <th>Date</th>\r\n          <th>Property</th>\r\n          <th>Old Value</th>\r\n          <th>New Value</th>\r\n          <th>Person</th>\r\n        </tr>\r\n      </thead>\r\n      <tbody>\r\n        <tr  repeat.for=\"item of selectedRequestDetail.requestId.audit\">\r\n          <td>${item.eventDate | dateFormat:config.DATE_FORMAT_TABLE}</td>\r\n          <td>${item.property}</td>\r\n          <td>${item.oldValue}</td>\r\n          <td>${item.newValue}</td>\r\n          <td>${item.personId.fullName}</td>\r\n        </tr>\r\n      </tbody>\r\n    </table>\r\n  </div>\r\n\r\n\t<div show.bind=\"!showAudit\" class=\"col-lg-10 col-lg-offset-1\">\r\n\t\t<h4>Request No. ${selectedRequestDetail.requestNo}</h4>\r\n\t\t<h5 class=\"dropbtn\" click.delegate=\"showProfile(selectedRequestDetail, $event)\">Faculty: ${selectedRequestDetail.requestId.personId.fullName} <i class=\"fa fa-info\" aria-hidden=\"true\"></i></h5>\r\n\t\t<h5>Institution: ${selectedRequestDetail.requestId.institutionId | lookupValue:people.institutionsArray:\"_id\":\"name\"}</h5>\r\n\t\r\n\t<div class=\"col-lg-5\" >\r\n\t\t<div class=\"topMargin\">\r\n\t\t\t<label class=\"form-control-label \">Status</label>\r\n\t\t\t<select class=\"form-control\" value.bind=\"selectedRequestDetail.requestStatus\">\r\n\t\t\t\t<option repeat.for=\"status of config.REQUEST_STATUS\" value=\"${status.code}\">${status.description}</option>\r\n\t\t\t</select>\r\n\t\t</div>\r\n\t\t<div class=\"topMargin\">\r\n\t\t\t<label for=\"undergraduates\" class=\"control-label\">Undergraduates</label>\r\n\t\t\t<input  id=\"undergraduates\"  type=\"number\" placeholder=\"Number of Undergraduates\" class=\"form-control\" value.bind=\"selectedRequestDetail.requestId.undergradIds\"/>\r\n\t\t</div>\r\n\t\t<div class=\"topMargin\">\r\n\t\t\t<label for=\"graduates\" class=\"control-label\">Graduates</label>\r\n\t\t\t<input id=\"graduates\" type=\"number\" placeholder=\"Number of Graduates\" class=\"form-control\" value.bind=\"selectedRequestDetail.requestId.graduateIds\"/>\r\n\t\t</div>\r\n\t\t <div class=\"row col-lg-offset-3\">\r\n\t\t\t<span class=\"col-lg-8 \" id=\"numberOfStudentsError\"></span>\r\n\t\t</div>\r\n\t\t<div class=\"topMargin\">\r\n\t\t\t<label class=\"form-control-label \">Product</label>\r\n\t\t\t<select class=\"form-control\" value.bind=\"selectedRequestDetail.productId._id\">\r\n\t\t\t\t<option repeat.for=\"product of products.productsArray\" value=\"${product._id}\">${product.name}</option>\r\n\t\t\t</select>\r\n\t\t</div>\r\n  </div>\r\n\r\n\t<div class=\"col-lg-5\" >\r\n\t\t<div  show.bind=\"config.SANDBOX_USED\" class=\"topMargin\">\r\n\t\t\t<label class=\"form-control-label \">Request Type</label>\r\n\t\t\t<select class=\"form-control\" value.bind=\"selectedRequestDetail.requestId.courseId._id\">\r\n\t\t\t\t<option model.bind=\"config.SANDBOX_ID\">${config.SANDBOX_NAME}</option>\r\n\t\t\t\t<option repeat.for=\"course of people.coursesArray\" model.bind=\"course._id\">${course.number} ${course.name}</option>\r\n\t\t\t</select>\r\n\t\t</div>\r\n\t\t<div class=\"topMargin\">\r\n\t\t\t<label class=\"form-control-label \">Start Date</label>\r\n\t\t\t<flat-picker controlid=\"startDate\" config.bind=\"dateConfig\"  \r\n\t\t\t\t\tvalue.bind=\"selectedRequestDetail.requestId.startDate\" startdate.bind=\"minStartDate\" enddate.bind=\"maxStartDate\"></flat-picker>\r\n\t\t\t<span id='startDateError'></span>\r\n\t\t</div>\r\n\t\t<div class=\"topMargin\">\r\n\t\t\t<label class=\"form-control-label \">End Date</label>\r\n\t\t\t\t<flat-picker controlid=\"endDate\" config.bind=\"dateConfig\" value.bind=\"selectedRequestDetail.requestId.endDate\" startdate.bind=\"minEndDate\" enddate.bind=\"maxEndDate\"></flat-picker>\r\n\t\t\t\t<span id='endDateError'></span>\r\n\t\t</div>\r\n\t\t\t<div class=\"topMargin\">\r\n\t\t\t<label class=\"form-control-label \">Required Date</label>\r\n\t\t\t\t<flat-picker controlid=\"requiredDate\" config.bind=\"dateConfig\" value.bind=\"selectedRequestDetail.requiredDate\" startdate.bind=\"minEndDate\" enddate.bind=\"maxEndDate\"></flat-picker>\r\n\t\t\t\t<span id='requiredDateError'></span>\r\n    </div>\r\n    <div class=\"col-lg-12 topMargin\" innerhtml.bind=\"selectedRequestDetail.requestId.comments\"></div>\r\n\t</div>\r\n  <!-- <div class=\"col-lg-12\">\r\n    <div class=\"row topMargin\">\r\n      <label class=\"form-control-label \">Comments</label>\r\n      <editor value.bind=\"selectedRequestDetail.requestId.comments\" height=\"250\"></editor> -->\r\n  \r\n     <!-- <div class=\"col-lg-12 topMargin\" innerhtml.bind=\"selectedRequestDetail.requestId.comments\"></div> -->\r\n     \r\n  <!-- </div>\r\n  </div> -->\r\n\r\n</div>\r\n</div>\r\n</div>\r\n</template>\r\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/tech/requests/components/erp.html":
/*!*******************************************************!*\
  !*** ./src/modules/tech/requests/components/erp.html ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n  <div class=\"row\" style=\"word-wrap: break-word;\">\r\n      <span class=\"col-lg-4\">\r\n        <h5 class=\"leftMargin\">System: <span class=\"bold\">${assign.systemId | lookupValue:systems.systemsArray:\"_id\":\"sid\"}</span></h5>\r\n        <h5 class=\"leftMargin\">Client: <span class=\"bold\"> ${assign.client} </span></h5>\r\n        <h5 class=\"leftMargin\">Server: <span class=\"bold\"> ${assign.systemId | lookupValue:systems.systemsArray:\"_id\":\"server\"} </span></h5>\r\n        <h5 class=\"leftMargin\">System Number: <span class=\"bold\"> ${assign.systemId | lookupValue:systems.systemsArray:\"_id\":\"instance\"} </span></h5>\r\n      </span>\r\n      <span class=\"col-lg-6\">\r\n        <h5>Student IDs: <span class=\"bold\"> ${assign.studentUserIds ? assign.studentUserIds : 'N/A'}</span></h5>\r\n        <h5>Student Password: <span class=\"bold\"> ${assign.studentPassword ? assign.studentPassword : 'N/A'}</span></h5>\r\n        <span>\r\n          <h5 class=\"topMargin\">Faculty IDs <span class=\"bold\">: ${assign.facultyUserIds ? assign.facultyUserIds : 'N/A'}</span></h5>\r\n          <h5>Faculty Password: <span class=\"bold\"> ${assign.facultyPassword ? assign.facultyPassword : 'N/A'}</span></h5>\r\n        </span>\r\n      </span>\r\n      <span class=\"col-lg-12\">\r\n          <h5 show.bind=\"systems.selectedSystem.its && systems.selectedSystem.its.length > 0\" class=\"leftMargin bigTopMargin\">ITS:</h5>\r\n          <h5 show.bind=\"systems.selectedSystem.its && systems.selectedSystem.its.length > 0\"><span class=\"bold\"> <a href=\"${systems.selectedSystem.its}\" target=\"_blank\">${systems.selectedSystem.its}</a> </span></h5>                       \r\n      </span>\r\n  </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/tech/requests/components/hana.html":
/*!********************************************************!*\
  !*** ./src/modules/tech/requests/components/hana.html ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t\t <div class=\"row leftMargin\">\r\n\t\t\t<h4>SAP HANA Launchpad URL</h4>\r\n\t\t\t<h5 class=\"leftMargin\"><a href=\"${systems.selectedSystem.its}\" target=\"_blank\">${systems.selectedSystem.its}</a></h5>\r\n\r\n\t\t\t<h4 class=\"topMargin\">Users</h4>\r\n\t\t\t<h5 class=\"leftMargin\">Student IDs: <span class=\"bold\"> ${assign.studentUserIds}</span></h5>\r\n\t\t\t<h5 class=\"leftMargin\">Student Password: <span class=\"bold\"> ${assign.studentPassword}</span></h5>\r\n\t\t\t<span show.bind=\"requests.selectedRequest.courseId !== null\">\r\n\t\t\t\t<h5 class=\"leftMargin\" class=\"topMargin\">Faculty IDs <span class=\"bold\">: ${assign.facultyUserIds}</span></h5>\r\n\t\t\t\t\t<!-- ${selectedRequestDetail.assignments[selectedAssignmentIndex].facultyUserIds} -->\r\n\t\t\t\t<h5 class=\"leftMargin\">Faculty Password: <span class=\"bold\"> ${assign.facultyPassword}</span></h5>\r\n\t\t\t</span>\r\n\r\n\t\t\t<h4 class=\"topMargin\">Lumira / Predictive Analytics Connection</h4>\r\n\t\t\t<h5 class=\"leftMargin\">System: <span class=\"bold\">${assign.systemId | lookupValue:systems.systemsArray:\"_id\":\"sid\"}</span></h5>\r\n\t\t\t<h5 class=\"leftMargin\">Server: <span class=\"bold\"> ${systems.selectedSystem.server} </span></h5>\r\n\t\t\t<h5 class=\"leftMargin\">Port: <span class=\"bold\"> ${systems.selectedSystem.port} </span></h5>\r\n\t\t\t<h5 class=\"leftMargin\">System Number: <span class=\"bold\"> ${systems.selectedSystem.instance} </span></h5> \r\n\t\t</div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/tech/requests/components/requestDetails.html":
/*!******************************************************************!*\
  !*** ./src/modules/tech/requests/components/requestDetails.html ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n   <div class=\"row\">\r\n\t\t<div class=\"col-lg-12\">\r\n\t\t\t<h4 class=\"topMargin\"><strong>Request Details</strong></h4>\r\n\t\t\t<div class=\"panel panel-default topMargin\">\r\n\t\t\t\t<div class=\"panel-body leftJustify\">\r\n\t\t\t\t\t<div  class=\"form-horizontal topMargin\">\r\n\t\t\t\t\t\t<h4>Product: ${selectedRequestDetail.productId.name}</h4>\r\n\t\t\t\t\t\t<h5>Course: ${selectedRequestDetail.requestId.courseId.name}</h5>\r\n\t\t\t\t\t\t<div class=\"topMargin\" show.bind=\"requests.selectedRequest.courseId != config.SANDBOX_ID\">\r\n\t\t\t\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t\t\t\t<div class=\"col-lg-5 leftMargin\">\r\n\t\t\t\t\t\t\t\t\t<h5>Undergrads: <b>${selectedRequestDetail.requestId.undergradIds}</b></h5>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t<div class=\"col-lg-5\">\r\n\t\t\t\t\t\t\t\t\t<h5>Graduate: <b>${selectedRequestDetail.requestId.graduateIds}</b></h5>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div> \r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t\t\t<div class=\"col-lg-5 leftMargin\">\r\n\t\t\t\t\t\t\t\t<h5>Start Date:  <b>${selectedRequestDetail.requestId.startDate | dateFormat:config.DATE_FORMAT_TABLE}</b></h5>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class=\"col-lg-5\">\r\n\t\t\t\t\t\t\t\t<h5>End Date: <b>${selectedRequestDetail.requestId.endDate | dateFormat:config.DATE_FORMAT_TABLE}</b></h5>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div show.bind=\"selectedRequestDetail.requestId.customerMessage && selectedRequestDetail.requestId.customerMessage.length > 0\">\r\n\t\t\t\t\t\t\t<label class=\"topMargin\">Requests from the UCC</label>\r\n\t\t\t\t\t\t\t<div class=\"well\" innerhtml.bind=\"selectedRequestDetail.requestId.customerMessage\"></div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div show.bind=\"selectedRequestDetail.requestId.comments && selectedRequestDetail.requestId.comments.length > 0\">\r\n\t\t\t\t\t\t\t<label class=\"topMargin\">Comments</label>\r\n\t\t\t\t\t\t\t<div innerhtml.bind=\"selectedRequestDetail.requestId.comments\"></div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n\t<div show.bind=\"products.selectedProduct.productDescription\">\r\n\t\t<h4>Product Information</h4>\r\n\t\t<div innerhtml.bind=\"products.selectedProduct.productDescription\"></div>\r\n\t</div>\r\n</template>\r\n    ";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/tech/requests/components/requestsTable.html":
/*!*****************************************************************!*\
  !*** ./src/modules/tech/requests/components/requestsTable.html ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\r\n  <div class=\"hover\" innerhtml.bind=\"commentShown\"></div>\r\n  <div class=\"hoverProfile\">\r\n    <span click.delegate=\"hideProfile()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n      title=\"\" data-original-title=\"Close\">\r\n      <i class=\"fa fa-window-close-o\" aria-hidden=\"true\"></i>\r\n    </span>\r\n    <span click.delegate=\"customerActionDialog()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n      title=\"\" data-original-title=\"Send Email\">\r\n      <i class=\"fa fa-envelope-o\" aria-hidden=\"true\"></i>\r\n    </span>\r\n    <hr/>\r\n    <div class=\"col-md-4\">\r\n      <div class=\"topMargin\">\r\n        <img if.bind=\"profileRequest.requestId.personId.file.fileName\" class=\"circular--square leftMargin\" src=\"${config.PERSON_IMAGE_DOWNLOAD_URL}/${profileRequest.requestId.personId.file.fileName}\"\r\n          height=\"100\">\r\n      </div>\r\n      <div if.bind=\"!profileRequest.requestId.personId.file.fileName\" style=\"height:100px;width:100px;\" innerhtml.bind=\"profileRequest.requestId.personId.email | gravatarUrl:100:6\"></div>\r\n    </div>\r\n    <div class=\"col-md-8\">\r\n      <h5 if.bind=\"profileRequest.requestId.personId.nickName\">Nickname: ${profileRequest.requestId.personId.nickName}</h5>\r\n      <h5>Phone: ${profileRequest.requestId.personId.phone | phoneNumber:config.PHONE_MASKS:profileRequest.requestId.personId.country:profileRequest.requestId.personId.ext}<span if.bind=\"profileRequest.requestId.personId.ext\">${profileRequest.requestId.personId.ext}</span></h5>\r\n      <h5>Mobile: ${profileRequest.requestId.personId.mobile | phoneNumber:config.PHONE_MASKS:profileRequest.requestId.personId.country}</h5>\r\n      <h5>Email: ${profileRequest.requestId.personId.email}</h5>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"col-lg-12 letMargin rightMargin\">\r\n    <div id=\"no-more-tables\">\r\n      <table id=\"requestsTable\" class=\"table table-striped table-hover\">\r\n        <thead>\r\n                   <!--\r\n          <tr>\r\n   \r\n            <td colspan='7'>\r\n              <div class=\"checkbox\">\r\n                <label>\r\n                  <input checked.bind=\"isCheckedAssigned\" change.trigger=\"filterInAssigned()\" type=\"checkbox\"> Filter out Assigned Requests\r\n                </label>\r\n              </div>\r\n            </td>\r\n          </tr>\r\n        -->\r\n          <tr>\r\n            <td colspan='10'>\r\n              <compose view=\"../../../../resources/elements/table-navigation-bar.html\"></compose>\r\n            </td>\r\n          </tr>\r\n          <tr>\r\n            <td colspan='10'>\r\n              <span click.delegate=\"refresh()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n                title=\"\" data-original-title=\"Refresh\">\r\n                <i class=\"fa fa-refresh\" aria-hidden=\"true\"></i>\r\n              </span>\r\n              <span click.delegate=\"clearFilters()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n                title=\"\" data-original-title=\"Clear Filters\">\r\n                <i class=\"fa fa-filter\" aria-hidden=\"true\"></i>\r\n              </span>\r\n              <span click.delegate=\"bulkEmail()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n                title=\"\" data-original-title=\"Bulk Email\">\r\n                <i class=\"fa fa-paper-plane\" aria-hidden=\"true\"></i>\r\n              </span>\r\n              \r\n              <span click.delegate=\"downloadExcel()\"  class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Export to Excel\"><i class=\"fa fa-download\" aria-hidden=\"true\"></i></span>\r\n              <!--<span class=\"pull-right\" id=\"spinner\" innerhtml.bind=\"spinnerHTML\"></span>-->\r\n            </td>\r\n            <td></td>\r\n            <td></td>\r\n          </tr>\r\n          <tr>\r\n            <th class=\"col-lg-1\">\r\n              <span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'requiredDate'})\">Due </span>\r\n              <span>\r\n                <i class=\"fa fa-sort\"></i>\r\n              </span>\r\n            </th>\r\n            <th class=\"col-lg-1\" class=\"hidden-sm\">\r\n              <span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'createdDate'})\">Created </span>\r\n              <span>\r\n                <i class=\"fa fa-sort\"></i>\r\n              </span>\r\n            </th>\r\n            <th class=\"col-lg-1\">\r\n              <span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {type: 'custom', sorter: customRequestStatusSorter, propertyName: 'requestStatus'})\">Status </span>\r\n              <i class=\"fa fa-sort\"></i>\r\n            </th>\r\n            <th class=\"col-xs-1\">IDS Requestd</th>\r\n            <th class=\"col-lg-2\">\r\n              <span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'productId.name'})\">Product </span>\r\n              <span>\r\n                <i class=\"fa fa-sort\"></i>\r\n              </span>\r\n            </th>\r\n            <th class=\"col-lg-2\">\r\n              <span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {type: 'custom', sorter: customCourseSorter, propertyName: 'requestId.courseId.name'})\">Course </span>\r\n              <span>\r\n                <i class=\"fa fa-sort\"></i>\r\n              </span>\r\n            </th>\r\n            <th class=\"col-lg-2\">\r\n              <span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {type: 'custom', sorter: customPersonSorter, propertyName: 'requestId.personId.lastName'})\">Faculty </span>\r\n              <span>\r\n                <i class=\"fa fa-sort\"></i>\r\n              </span>\r\n            </th>\r\n            <th class=\"col-lg-1\">\r\n              <span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {type: 'custom', sorter: customInstitutionsSorter, propertyName: 'requestId.institutionId'})\">Institution </span>\r\n              <i class=\"fa fa-sort\"></i>\r\n            </th>\r\n            <th show.bind=\"!isCheckedAssigned\">Assignments</th>\r\n            <th></th>\r\n            <th></th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr class=\"hidden-sm hidden-xs\">\r\n            <th>\r\n              <input type=\"date\" value.bind=\"requiredDateFilterValue\" input.delegate=\"dataTable.filterList(requiredDateFilterValue, {type: 'date', filter: 'requiredDate',  collectionProperty: 'requiredDate', compare: 'after'} )\"\r\n                class=\"form-control\" />\r\n            </th>\r\n            <th>\r\n              <input type=\"date\" value.bind=\"createdDateFilterValue\" input.delegate=\"dataTable.filterList(createdDateFilterValue, {type: 'date', filter: 'createdDate',  collectionProperty: 'createdDate', compare: 'after'} )\"\r\n                class=\"form-control hidden-sm\" />\r\n            </th>\r\n            <th>\r\n              <select value.bind=\"requestStatusFilter\" input.delegate=\"dataTable.filterList($event, { type: 'value',  filter: 'requestStatusFilter',  collectionProperty: 'requestStatus', displayProperty: 'requestStatus',  compare:'match'} )\"\r\n                class=\"form-control\">\r\n                <option value=\"\"></option>\r\n                <option repeat.for=\"status of config.REQUEST_STATUS\" value=\"${status.code}\">${status.description}</option>\r\n              </select>\r\n            </th>\r\n            <th></th>\r\n            <th>\r\n              <input value.bind=\"productFilterValue\" input.delegate=\"dataTable.filterList(productFilterValue, { type: 'custom',  filter: customProductNameFilter,  compare:'custom'} )\"\r\n                class=\"form-control\" />\r\n            </th>\r\n            <th>\r\n              <input value.bind=\"courseFilterValue\" input.delegate=\"dataTable.filterList(courseFilterValue, { type: 'custom',  filter: courseCustomFilter, compare:'custom'} )\"\r\n                class=\"form-control\" />\r\n            </th>\r\n            <th>\r\n              <input value.bind=\"helpTicketTypeFilterValue\" input.delegate=\"dataTable.filterList(helpTicketTypeFilterValue, { type: 'custom',  filter: customNameFilter,  compare:'custom'} )\"\r\n                class=\"form-control\" />\r\n            </th>\r\n            <th>\r\n              <input value.bind=\"institutionFilterValue\" input.delegate=\"dataTable.filterList(institutionFilterValue, { type: 'custom',  filter: institutionCustomFilter, compare:'custom'} )\"\r\n                class=\"form-control\" />\r\n            </th>\r\n            <th show.bind=\"!isCheckedAssigned\"></th>\r\n            <th></th>\r\n            <th></th>\r\n          </tr>\r\n          <tr repeat.for=\"request of dataTable.displayArray\" class=\"clickable ${request.requestStatus | getArrayValue:config.REQUEST_STATUS:'status':-1}\">\r\n            <!--  <td click.delegate=\"selectARequest($index, $event, request)\" data-title=\"requestNo\">${request.requestNo}</td> -->\r\n            <td click.delegate=\"selectARequest($index, $event, request)\" data-title=\"requiredDate\">${request.requiredDate | dateFormat:config.DATE_FORMAT_TABLE}</td>\r\n            <td click.delegate=\"selectARequest($index, $event, request)\" class=\"hidden-sm\" data-title=\"dateCreated\">${request.createdDate | dateFormat:config.DATE_FORMAT_TABLE}</td>\r\n            <td click.delegate=\"selectARequest($index, $event, request)\" mouseover.delegate=\"showComment(request, $event)\" mouseout.delegate=\"hideComment()\"\r\n              data-title=\"status\">${request.requestStatus | lookupValue:config.REQUEST_STATUS:\"code\":\"description\"}</td>\r\n            <td click.delegate=\"selectARequest($index, $event, request)\" data-title=\"ids-requested\">${request.requestId | idsRequested}\r\n              <td click.delegate=\"selectARequest($index, $event, request)\" data-title=\"product\">${request.productId.name}</td>\r\n              <td click.delegate=\"selectARequest($index, $event, request)\" data-title=\"Course\">${request.requestId.courseId.name}</td>\r\n              <td class=\"dropbtn\" click.delegate=\"showProfile(request, $event)\" data-title=\"Name\">\r\n                ${request.requestId.personId.fullName}\r\n                <i class=\"fa fa-info\" aria-hidden=\"true\"></i>\r\n              </td>\r\n              <td click.delegate=\"selectARequest($index, $event, request)\" data-title=\"Name\">${request.requestId.institutionId.name}</td>\r\n              <td show.bind=\"!isCheckedAssigned\" innerhtml.bind=\"request.assignments | parseAssignments:systems.systemsArray\"></td>\r\n              <td>\r\n                <span class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Edit\">\r\n                  <i class=\"fa fa-pencil fa-lg fa-border\" click.delegate=\"editRequest($index, request)\" aria-hidden=\"true\"></i>\r\n                </span>\r\n              </td>\r\n              <td>\r\n                <span class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"View Assignment\">\r\n                  <i class=\"fa fa-eye fa-lg fa-border\" click.delegate=\"viewAssignment($index, request)\" aria-hidden=\"true\"></i>\r\n                </span>\r\n              </td>\r\n          </tr>\r\n          <tr>\r\n              <td colspan='10'>\r\n                <compose view=\"../../../../resources/elements/table-navigation-bar.html\"></compose>\r\n              </td>\r\n            </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n  </div>\r\n  </div>\r\n\r\n\r\n</template>\r\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/tech/requests/components/userAssignmentDetails.html":
/*!*************************************************************************!*\
  !*** ./src/modules/tech/requests/components/userAssignmentDetails.html ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t\t<div show.bind=\"requests.selectedRequestDetail.assignments.length > 0\">\r\n\t\t  <h4 class=\"topMargin\"><strong>Assignments</strong></h4>\r\n\t\t  <div show.bind=\"requests.selectedRequestDetail.requestStatus == config.ASSIGNED_REQUEST_CODE\" class=\"panel panel-primary topMargin\">\r\n\t\t\t<div class=\"panel-body\">  \r\n\t\t\t  <ul style=\"padding-left:10px;\">\r\n\t\t\t\t\t\t\t<li class=\"list-group-item\" repeat.for=\"assign of requests.selectedRequestDetail.assignments\">\r\n\t\t\t\t  <compose if.bind=\"systems.selectedSystem.type === 'ERP' || !systems.selectedSystem.type\" view=\"./erp.html\"></compose>\r\n\t\t\t\t  <compose if.bind=\"systems.selectedSystem.type === 'HANA'\" view=\"./hana.html\"></compose>\r\n\t\t\t\t  <compose if.bind=\"systems.selectedSystem.type === 'BO'\" view=\"./bo.html\"></compose>\r\n\t\t\t\t\t\t\t</li>\r\n\t\t\t  </ul>\r\n\t\r\n\t\t\t  <label show.bind=\"products.selectedProduct.documents && products.selectedProduct.documents.length > 0\" class=\"topMargin\">Helpful Documents</label>\r\n\t\t\t  <div class=\"list-group\">\r\n\t\t\t\t<a repeat.for=\"document of products.selectedProduct.documents\" href=\"${config.DOCUMENT_FILE_DOWNLOAD_URL}/${document.categoryCode}/${document.categoryName}/${document.fileName}\"  target=\"_blank\">${document.fileName}</a>\r\n\t\t\t  </div>\r\n\t\t\t  <label show.bind=\"requests.selectedRequestDetail.techComments && requests.selectedRequestDetail.techComments.length > 0\" class=\"topMargin\">Assignment Comments</label>\r\n\t\t\t  <div show.bind=\"requests.selectedRequestDetail.techComments && requests.selectedRequestDetail.techComments.length > 0\" class=\"col-lg-12 topMargin well overFlow\" innerhtml.bind=\"requests.selectedRequestDetail.techComments\"></div>\r\n\t\t\t</div>\r\n\t\t  </div>\r\n\t\t</div>\r\n\t  </div>\r\n\t</template>\r\n\t";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/tech/requests/components/userRequestDetails.html":
/*!**********************************************************************!*\
  !*** ./src/modules/tech/requests/components/userRequestDetails.html ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t\t<div class=\"row\">\r\n\t\t\t<div class=\"col-lg-12\">\r\n\t\t\t\t<h4 class=\"topMargin\"><strong>Request Details</strong></h4>\r\n\t\t\t\t<div class=\"panel panel-default topMargin\">\r\n\t\t\t\t\t<div class=\"panel-body leftJustify\">\r\n\t\t\t\t\t\t<div class=\"form-group bottomMargin\" show.bind=\"customerActionRequired\">\r\n\t\t\t\t\t\t\t<h5 for=\"message\">The UCC staff has asked you to provide additional information</h5>\r\n\t\t\t\t\t\t\t<div class=\"well col-lg-12\" id=\"message\" innerhtml.bind=\"customerMessage\" class=\"form-control\"></div>\r\n\t\t\t\t\t\t\t<h5>Enter your response in the comments box below and click save</h5>\r\n\t\t\t\t\t\t\t<editor value.bind=\"customerResponse\" height=\"250\"></editor>\t\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div show.bind=\"showDetails\" class=\"form-horizontal topMargin\">\r\n\t\t\t\t\t\t\t<h4>Product: ${requests.selectedRequestDetail.productId | lookupValue:products.productsArray:\"_id\":\"name\"}</h4>\r\n\t\t\t\t\t\t\t<h5>Course: ${requests.selectedRequest.courseId | courseName:people.coursesArray}</h5>\r\n\t\t\t\t\t\t\t<div class=\"topMargin\" show.bind=\"requests.selectedRequest.courseId != config.SANDBOX_ID\">\r\n\t\t\t\t\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t\t\t\t\t<div class=\"col-lg-5 leftMargin\">\r\n\t\t\t\t\t\t\t\t\t\t<h5>Undergrads: <b>${requests.selectedRequest.undergradIds}</b></h5>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t<div class=\"col-lg-5\">\r\n\t\t\t\t\t\t\t\t\t\t<h5>Graduate: <b>${requests.selectedRequest.graduateIds}</b></h5>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</div> \r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t\t\t\t<div class=\"col-lg-5 leftMargin\">\r\n\t\t\t\t\t\t\t\t\t<h5>Start Date:  <b>${requests.selectedRequest.startDate | dateFormat:config.DATE_FORMAT_TABLE}</b></h5>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t<div class=\"col-lg-5\">\r\n\t\t\t\t\t\t\t\t\t<h5>End Date: <b>${requests.selectedRequest.endDate | dateFormat:config.DATE_FORMAT_TABLE}</b></h5>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div show.bind=\"requests.selectedRequest.customerMessage && requests.selectedRequest.customerMessage.length > 0\">\r\n\t\t\t\t\t\t\t\t<label class=\"topMargin\">Requests from the UCC</label>\r\n\t\t\t\t\t\t\t\t<div class=\"well\" innerhtml.bind=\"requests.selectedRequest.customerMessage\"></div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div show.bind=\"requests.selectedRequest.comments && requests.selectedRequest.comments.length > 0\">\r\n\t\t\t\t\t\t\t\t<label class=\"topMargin\">Comments</label>\r\n\t\t\t\t\t\t\t\t<div innerhtml.bind=\"requests.selectedRequest.comments\"></div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div show.bind=\"products.selectedProduct.productDescription\">\r\n\t\t\t<h4>Product Information</h4>\r\n\t\t\t<div innerhtml.bind=\"products.selectedProduct.productDescription\"></div>\r\n\t\t</div>\r\n\t\r\n\t</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/tech/requests/components/viewAssignmentForm.html":
/*!**********************************************************************!*\
  !*** ./src/modules/tech/requests/components/viewAssignmentForm.html ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t<div class=\"panel panel-default\" style=\"margin-top:50px;\">\r\n\t\t<div class=\"panel-body\">\r\n\t\t\t<div class=\"row\">\r\n\t\t\t\t<div class=\"fluid-container\">\r\n\t\t\t\t\t<!-- Buttons -->\r\n\t\t\t\t\t<div class=\"toolbar list-group-item\">\r\n\t\t\t\t\t\t<span click.delegate=\"backView()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n\t\t\t\t\t\t title=\"\" data-original-title=\"Back\"><i class=\"fa fa-arrow-left fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class=\"col-lg-6 col-md-12\">\r\n\t\t\t\t\t\t<compose view=\"./requestDetails.html\"></compose>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class=\"col-lg-6 col-md-12\">\r\n\t\t\t\t\t\t<compose view=\"./assignmentDetails.html\"></compose>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/tech/requests/components/viewRequestsForm.html":
/*!********************************************************************!*\
  !*** ./src/modules/tech/requests/components/viewRequestsForm.html ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t<div class=\"panel panel-default\" style=\"margin-top:50px;\">\r\n\t\t<div class=\"panel-body\">\r\n\t\t\t<div class=\"row\">\r\n\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t<div class=\" list-group-item toolbar\">\r\n\t\t\t\t\t\t<span click.delegate=\"back()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n\t\t\t\t\t\t title=\"\" data-original-title=\"Back\"><i class=\"fa fa-arrow-left fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n\t\t\t\t\t\t<span click.delegate=\"save()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n\t\t\t\t\t\t title=\"\" data-original-title=\"Save\"><i class=\"fa fa-floppy-o fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n\t\t\t\t\t\t<span click.delegate=\"customerActionDialog()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n\t\t\t\t\t\t data-placement=\"bottom\" title=\"\" data-original-title=\"Customer Action\"><i class=\"fa fa-paper-plane fa-lg fa-border\"\r\n\t\t\t\t\t\t\t aria-hidden=\"true\"></i></span>\r\n\t\t\t\t\t\t<span click.delegate=\"openFacultyDetails()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n\t\t\t\t\t\t data-placement=\"bottom\" title=\"\" data-original-title=\"Details\"><i class=\"fa fa-user fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n\t\t\t\t\t\t<span click.delegate=\"openSettings()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n\t\t\t\t\t\t data-placement=\"bottom\" title=\"\" data-original-title=\"Settings\"><i class=\"fa fa-cog fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n\t\t\t\t\t\t<span click.delegate=\"flag()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n\t\t\t\t\t\t title=\"\" data-original-title=\"Flag\"><i class=\"fa fa-flag fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n\t\t\t\t\t\t<span click.delegate=\"delete()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n\t\t\t\t\t\t title=\"\" data-original-title=\"Delete\"><i class=\"fa fa-trash fa-lg fa-border text-danger\" aria-hidden=\"true\"></i></span>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t<div class=\"col-lg-5\">\r\n\t\t\t\t\t\t<div show.bind=\"!facultyDetails\" class=\"well smallLeftMargin\">\r\n\t\t\t\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t\t\t\t<div class=\"col-lg-6\">\r\n\t\t\t\t\t\t\t\t\t<div class=\"col-lg-12\">\r\n\t\t\t\t\t\t\t\t\t\t<h5>Request No: ${selectedRequestDetail.requestNo}</h5>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t<div class=\"col-lg-12\">\r\n\t\t\t\t\t\t\t\t\t\t<h5>${selectedRequestDetail.requiredDate | dateFormat:config.DATE_FORMAT_TABLE}</h5>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t<div class=\"col-lg-12\">\r\n\t\t\t\t\t\t\t\t\t\t<h5>${selectedRequestDetail.productId.name}</h5>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t<div class=\"col-lg-12\">\r\n\t\t\t\t\t\t\t\t\t\t<h5>${selectedRequestDetail.requestId.courseId.name}</h5>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t<div class=\"col-lg-6\">\r\n\t\t\t\t\t\t\t\t\t<div class=\"col-lg-12\">\r\n\t\t\t\t\t\t\t\t\t\t<h5>${selectedRequestDetail.requestId.personId.fullName}</h5>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t<div class=\"col-lg-12\">\r\n\t\t\t\t\t\t\t\t\t\t<h5>${selectedRequestDetail.requestId.personId.email}</h5>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t<div class=\"col-lg-12\">\r\n\t\t\t\t\t\t\t\t\t\t<h5>${selectedRequestDetail.requestId.institutionId.name}</h5>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t<div class=\"col-lg-12\">\r\n\t\t\t\t\t\t\t\t\t\t<h5>${selectedRequestDetail.requestId.personId.phone |\r\n\t\t\t\t\t\t\t\t\t\t\tphoneNumber:config.PHONE_MASKS:selectedRequestDetail.requestId.personId.country} Mobile:\r\n\t\t\t\t\t\t\t\t\t\t\t${selectedRequestDetail.requestId.personId.mobile |\r\n\t\t\t\t\t\t\t\t\t\t\tphoneNumber:config.PHONE_MASKS:selectedRequestDetail.requestId.personId.country}</h5>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\t<div show.bind=\"!showAudit\">\r\n\t\t\t\t\t\t\t<div show.bind=\"showSettings\" class=\"smallLeftMargin\">\r\n\t\t\t\t\t\t\t\t<div class=\"panel panel-default editPanel\">\r\n\t\t\t\t\t\t\t\t\t<div class=\"panel-body\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"bottomMargin list-group-item leftMargin rightMargin\">\r\n\t\t\t\t\t\t\t\t\t\t\t<span click.delegate=\"saveSettings()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n\t\t\t\t\t\t\t\t\t\t\t data-placement=\"bottom\" title=\"\" data-original-title=\"Save\"><i class=\"fa fa-floppy-o fa-lg fa-border\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t aria-hidden=\"true\"></i></span>\r\n\t\t\t\t\t\t\t\t\t\t\t<span click.delegate=\"restoreDefaults()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n\t\t\t\t\t\t\t\t\t\t\t data-placement=\"bottom\" title=\"\" data-original-title=\"Restore Defaults\"><i class=\"fa fa-refresh fa-lg fa-border\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t aria-hidden=\"true\"></i></span>\r\n\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group col-lg-12\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<label>Regular ID Buffer</label>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<input value.bind=\"idBuffer\" id=\"bufferIds\" class=\"form-control\" type=\"number\" />\r\n\t\t\t\t\t\t\t\t\t\t\t\t<label>Added to the number of ids requested. Default is ${config.REGULAR_ID_BUFFER}</label>\r\n\t\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group col-lg-12\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<label>Number of Sandbox IDs</label>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<input value.bind=\"sandBoxIDs\" id=\"sandBoxIDs\" class=\"form-control\" type=\"number\" />\r\n\t\t\t\t\t\t\t\t\t\t\t\t<label>Number of sandbox IDs assigned. Default is ${config.SANDBOX_ID_COUNT}</label>\r\n\t\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group col-lg-12\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<label>Sandbox ID Buffer</label>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<input value.bind=\"sandBoxIDs\" id=\"sandBoxIDs\" class=\"form-control\" type=\"number\" />\r\n\t\t\t\t\t\t\t\t\t\t\t\t<label>Number of IDs between assignments assigned. Default is ${config.SANDBOX_ID_BUFFER}</label>\r\n\t\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group col-lg-12\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<label>Number of Faculty IDs</label>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<input value.bind=\"numFacultyIDs\" id=\"numFacultyIDs\" class=\"form-control\" type=\"number\" />\r\n\t\t\t\t\t\t\t\t\t\t\t\t<label>Number of faculty IDs assigned. Default is ${config.DEFAULT_FACULTY_IDS}</label>\r\n\t\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t<div show.bind=\"!showAudit\" class=\"row smallLeftMargin\">\r\n\t\t\t\t\t\t\t<div class=\"panel panel-default\">\r\n\t\t\t\t\t\t\t\t<div class=\"panel-body\">\r\n\t\t\t\t\t\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"col-lg-12\">\r\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"checkbox\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<label class=\"pull-left\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input checked.bind=\"provisionalAssignment\" id=\"provisionalCheckBox\" type=\"checkbox\" data-toggle=\"checkbox\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tProvisional\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t</label>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<label class=\"pull-left leftMargin\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input checked.bind=\"sendEmail\" id=\"sendEmailCheckBox\" type=\"checkbox\" data-toggle=\"checkbox\"> Send Email\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t</label>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<label class=\"pull-left leftMargin\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input disabled.bind=\"forceManual\" checked.bind=\"manualMode\" id=\"manualCheckBox\" type=\"checkbox\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t change.trigger=\"changeManualMode()\" data-toggle=\"checkbox\"> Manual\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t</label>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<label class=\"pull-left leftMargin\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tStudent ID Template\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class=\"smallLeftMargin\" click.delegate=\"openEditStudentTemplate()\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t data-placement=\"bottom\" title=\"\" data-original-title=\"Edit Template\"><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></span>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class=\"smallLeftMargin\" click.delegate=\"openStudentTemplate()\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t data-placement=\"bottom\" title=\"\" data-original-title=\"View Templates\"><i class=\"fa fa-eye\" aria-hidden=\"true\"></i></span>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t</label>\r\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t<div class=\"form-group row\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"col-sm-12\">\r\n\t\t\t\t\t\t\t\t\t\t\t<select show.bind=\"showTemplates\" id=\"studentIdTemplate\" multiple value.bind=\"selectedStudentIDTemplate\"\r\n\t\t\t\t\t\t\t\t\t\t\t class=\"form-control input-md topMargin\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<option repeat.for=\"template of studentIDTemplates\" value.bind=\"$index\">${template}</option>\r\n\t\t\t\t\t\t\t\t\t\t\t</select>\r\n\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t<div class=\"row\" show.bind=\"showAddStudentTemplate\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"panel panel-default col-md-12 editPanel\">\r\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"panel-body\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"bottomMargin\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<span click.delegate=\"saveStudentTemplate()\" class=\"smallLeftMargin\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t data-placement=\"bottom\" title=\"\" data-original-title=\"Save Template\"><i class=\"fa fa-floppy-o fa-lg\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t aria-hidden=\"true\"></i></span>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<span click.delegate=\"cancelEditStudentTemplate()\" class=\"smallLeftMargin\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t data-placement=\"bottom\" title=\"\" data-original-title=\"Cancel\"><i class=\"fa fa-ban fa-lg\" aria-hidden=\"true\"></i></span>\r\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<input id=\"number\" value.bind=\"products.selectedProduct.defaultStudentIdPrefix\" type=\"text\" placeholder=\"Template\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t class=\"form-control\" />\r\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"form-group col-lg-6\">\r\n\t\t\t\t\t\t\t\t\t\t\t<label>Student IDs</label>\r\n\t\t\t\t\t\t\t\t\t\t\t<input disabled.bind=\"!manualMode\" keyup.delegate=\"updateClientAssignments()\" value.bind=\"selectedRequestDetail.assignments[assignmentDetailIndex].studentUserIds\"\r\n\t\t\t\t\t\t\t\t\t\t\t id=\"proposedIDRange\" placeholder=\"Proposed IDs\" class=\"form-control\" type=\"text\" ref=\"proposedIDRange\" />\r\n\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t<div show.bind=\"studentIDTemplateAvailable\" class=\"form-group col-lg-2\">\r\n\t\t\t\t\t\t\t\t\t\t\t<label>First ID</label>\r\n\t\t\t\t\t\t\t\t\t\t\t<input disabled.bind=\"manualMode\" min=\"0\" value.bind=\"firstID\" change.trigger=\"firstIDChanged()\" style=\"width:75px;margin-right:10px;\"\r\n\t\t\t\t\t\t\t\t\t\t\t id=\"firstID\" class=\"form-control input-sm\" type=\"number\" />\r\n\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t<div show.bind=\"studentIDTemplateAvailable\" class=\"form-group col-lg-2\">\r\n\t\t\t\t\t\t\t\t\t\t\t<label>Last ID</label>\r\n\t\t\t\t\t\t\t\t\t\t\t<input disabled.bind=\"manualMode\" value.bind=\"lastID\" change.trigger=\"lastIDChanged()\" style=\"width:75px;margin-right:10px;\"\r\n\t\t\t\t\t\t\t\t\t\t\t id=\"lastID\" class=\"form-control input-sm\" type=\"number\" />\r\n\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t\t\t\t\t\t<fieldset class=\"form-group\">\r\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-lg-6\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<input value.bind=\"selectedRequestDetail.assignments[assignmentDetailIndex].studentPassword\" id=\"proposedStudentPassword\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t placeholder=\"Proposed Password\" class=\"form-control\" type=\"text\" />\r\n\t\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t</fieldset>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"form-group col-lg-6\">\r\n\t\t\t\t\t\t\t\t\t\t\t<label>Faculty IDs</label>\r\n\t\t\t\t\t\t\t\t\t\t\t<input keyup.delegate=\"updateClientFacultyAssignments()\" value.bind=\"selectedRequestDetail.assignments[assignmentDetailIndex].facultyUserIds\" id=\"proposedFacultyIDRange\"\r\n\t\t\t\t\t\t\t\t\t\t\t placeholder=\"Proposed Faculty IDs\" class=\"form-control\" type=\"text\" />\r\n\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t<div show.bind=\"facultyIDTemplateAvailable\" class=\"form-group col-lg-2\">\r\n\t\t\t\t\t\t\t\t\t\t\t<label>First ID</label>\r\n\t\t\t\t\t\t\t\t\t\t\t<input disabled.bind=\"manualMode\" min=\"0\" value.bind=\"firstNumericFacID\" change.trigger=\"firstFacIDChanged()\"\r\n\t\t\t\t\t\t\t\t\t\t\t style=\"width:75px;margin-right:10px;\" id=\"firstFacID\" class=\"form-control input-sm\" type=\"number\" />\r\n\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t<div show.bind=\"facultyIDTemplateAvailable\" class=\"form-group col-lg-2\">\r\n\t\t\t\t\t\t\t\t\t\t\t<label>Last ID</label>\r\n\t\t\t\t\t\t\t\t\t\t\t<input disabled.bind=\"manualMode\" value.bind=\"lastNumericFacID\" change.trigger=\"lastFacIDChanged()\" style=\"width:75px;margin-right:10px;\"\r\n\t\t\t\t\t\t\t\t\t\t\t id=\"lastFacID\" class=\"form-control input-sm\" type=\"number\" />\r\n\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t\t\t\t\t\t<fieldset class=\"form-group\">\r\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-lg-6\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<input value.bind=\"selectedRequestDetail.assignments[assignmentDetailIndex].facultyPassword\" id=\"proposedFacultyPassword\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t placeholder=\"Proposed Faculty Password\" class=\"form-control\" type=\"text\" />\r\n\t\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t</fieldset>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t\t\t<div class=\"row smallLeftMargin smallMarginRight\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"col-lg-4 \">\r\n\t\t\t\t\t\t\t\t\t\t\t<h5><strong>IDs Required: ${idsRequired}</strong></h5>\r\n\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"col-lg-4 \">\r\n\t\t\t\t\t\t\t\t\t\t\t<h5><strong>IDs Remaining: ${idsRemaining}</strong></h5>\r\n\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"col-lg-4 \">\r\n\t\t\t\t\t\t\t\t\t\t\t<h5><strong>IDs Assigned: ${totalIdsAssigned}</strong></h5>\r\n\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t\t\t<div class=\"row smallLeftMargin topMargin\">\r\n\t\t\t\t\t\t\t\t\t\t<table id=\"assignmentTable\" class=\"table table-striped table-hover\">\r\n\t\t\t\t\t\t\t\t\t\t\t<thead>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<th style=\"width:20px;\">System</th>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<th style=\"width:20px;\">Client</th>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<th style=\"width:20px;\">Assigned IDs</th>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<th style=\"width:175px;\">Student IDs/<br>Password</th>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<th style=\"width:175px;\">Faculty IDs/<br>Password</th>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<th style=\"width:30px;\">Assigned Date</th>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<th style=\"width:20px;\">Status</th>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<th style=\"width:20px;\"></th>\r\n\t\t\t\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t\t\t</thead>\r\n\t\t\t\t\t\t\t\t\t\t\t<tbody>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<tr class=\"${client.notValid} dropbtn\" click.trigger=\"selectProposedClient($index, $event)\" repeat.for=\"client of selectedRequestDetail.assignments\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<td>${client.systemId | lookupValue:systems.systemsArray:\"_id\":\"sid\"}</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<td>${client.client}</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<td>${client.idsAssigned}</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<td>${client.studentUserIds}<br>${client.studentPassword}</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<td>${client.facultyUserIds}<br>${client.facultyPassword}</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<td>${client.assignedDate | dateFormat:config.DATE_FORMAT_TABLE}</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<td>${client.notValid | overlap}\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<td><span click.trigger=\"deleteTable(client)\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t data-placement=\"bottom\" title=\"\" data-original-title=\"Delete\"><i class=\"fa fa-trash-o\" aria-hidden=\"true\"></i></span></td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t\t\t</tbody>\r\n\t\t\t\t\t\t\t\t\t\t</table>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t<span id=\"errorRange\"></span>\r\n\t\t\t\t\t\t\t\t\t<div if.bind=\"selectedRequestDetail.requestId.comments.length > 0\" class=\"row topMargin\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"col-sm-12\">\r\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<h5>Comments:</h5>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"topMargin\" innerhtml.bind=\"selectedRequestDetail.requestId.comments\"></div>\r\n\t\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t<div class=\"row topMargin\">\r\n\t\t\t\t\t\t\t\t\t\t<fieldset class=\"form-group\">\r\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-lg-12\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<editor value.bind=\"selectedRequestDetail.techComments\" height=\"250\"></editor>\r\n\t\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t</fieldset>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t<h3>Request Details</h3>\r\n\t\t\t\t\t\t\t\t\t<div if.bind=\"selectedRequestDetail.requestId.comments.length > 0\" class=\"row topMargin\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"col-sm-12\">\r\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<h5>Comments:</h5>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"topMargin\" innerhtml.bind=\"selectedRequestDetail.requestId.comments\"></div>\r\n\t\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t<h5 class=\"topMargin\">Product: ${selectedRequestDetail.productId.name}</h5>\r\n\t\t\t\t\t\t\t\t\t<h5 class=\"topMargin\">Required Date: ${selectedRequestDetail.requiredDate |\r\n\t\t\t\t\t\t\t\t\t\tdateFormat:config.DATE_FORMAT_TABLE}</h5>\r\n\t\t\t\t\t\t\t\t\t<h5 show.bind=\"selectedRequestDetail.requestId.courseId != config.SANDBOX_ID\" class=\"topMargin\">Undergraduates:\r\n\t\t\t\t\t\t\t\t\t\t${selectedRequestDetail.requestId.undergradIds}</h5>\r\n\t\t\t\t\t\t\t\t\t<h5 show.bind=\"selectedRequestDetail.requestId.courseId != config.SANDBOX_ID\" class=\"topMargin\">Graduates:\r\n\t\t\t\t\t\t\t\t\t\t${selectedRequestDetail.requestId.graduateIds}</h5>\r\n\t\t\t\t\t\t\t\t\t<h5 show.bind=\"selectedRequestDetail.requestId.courseId != config.SANDBOX_ID\" class=\"topMargin\">Add\r\n\t\t\t\t\t\t\t\t\t\tUndergraduates: ${selectedRequestDetail.requestId.addUndergraduates}</h5>\r\n\t\t\t\t\t\t\t\t\t<h5 show.bind=\"selectedRequestDetail.requestId.courseId != config.SANDBOX_ID\" class=\"topMargin\">Add Graduates:\r\n\t\t\t\t\t\t\t\t\t\t${selectedRequestDetail.requestId.addGraduates}</h5>\r\n\t\t\t\t\t\t\t\t\t<h5 class=\"topMargin\">Begin Date: ${selectedRequestDetail.requestId.startDate |\r\n\t\t\t\t\t\t\t\t\t\tdateFormat:config.DATE_FORMAT_TABLE}</h5>\r\n\t\t\t\t\t\t\t\t\t<h5 class=\"topMargin\">End Date: ${selectedRequestDetail.requestId.endDate |\r\n\t\t\t\t\t\t\t\t\t\tdateFormat:config.DATE_FORMAT_TABLE}</h5>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class=\"col-lg-7\">\r\n\t\t\t\t\t\t<div class=\"panel panel-default smallLeftMargin smallMarginRight\">\r\n\t\t\t\t\t\t\t<div class=\"panel-body\">\r\n\t\t\t\t\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t\t\t\t\t<div class=\"col-lg-6 pull-right\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"col-lg-7\" show.bind=\"!sandBoxOnly\">\r\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"checkbox\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<label>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<input checked.bind=\"unassignedOnly\" id=\"unassignedCheckBox\" type=\"checkbox\" change.trigger=\"changeUnassignedOnly()\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t data-toggle=\"checkbox\"> Unassigned only\r\n\t\t\t\t\t\t\t\t\t\t\t\t</label>\r\n\t\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"col-lg-5 pull-right\">\r\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"checkbox\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<label>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<input checked.bind=\"sandBoxOnly\" id=\"sandBoxOnlyCheckBox\" type=\"checkbox\" data-toggle=\"checkbox\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t${config.SANDBOX_NAME} only\r\n\t\t\t\t\t\t\t\t\t\t\t\t</label>\r\n\t\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t\t\t\t<label class=\"control-label col-sm-3 hideOnPhone\">Systems</label>\r\n\t\t\t\t\t\t\t\t\t<select change.delegate=\"systemSelected()\" class=\"form-control\" value.bind=\"selectedSystemId\">\r\n\t\t\t\t\t\t\t\t\t\t<option repeat.for='sys of productSystems' model.bind=\"sys._id\">${sys.sid}</option>\r\n\t\t\t\t\t\t\t\t\t</select>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"topMargin smallMarginRight\">\r\n\t\t\t\t\t\t\t<div show.bind=\"clientsConfigured\">\r\n\t\t\t\t\t\t\t\t<table id=\"clientTable\" class=\"table table-striped table-hover\">\r\n\t\t\t\t\t\t\t\t\t<thead>\r\n\t\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t\t<th class=\"col-sm-1\">Client</th>\r\n\t\t\t\t\t\t\t\t\t\t\t<th class=\"col-sm-1\">Status</th>\r\n\t\t\t\t\t\t\t\t\t\t\t<th class=\"col-sm-1\">IDs Available</th>\r\n\t\t\t\t\t\t\t\t\t\t\t<th>Product</th>\r\n\t\t\t\t\t\t\t\t\t\t\t<th class=\"col-sm-6\">Assignments</th>\r\n\t\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t</thead>\r\n\t\t\t\t\t\t\t\t</table>\r\n\t\t\t\t\t\t\t\t<div style=\"overflow:auto;height:800px;\">\r\n\t\t\t\t\t\t\t\t\t<table id=\"clientTable2\" class=\"table table-striped table-hover\">\r\n\t\t\t\t\t\t\t\t\t\t<tbody>\r\n\t\t\t\t\t\t\t\t\t\t\t<tr class=\"dropbtn clickable\" click.trigger=\"selectClient($index, client, $event)\" repeat.for=\"client of selectedSystem.clients | \r\n\t\t\t\t\t\t\t\tfilterClients:unassignedOnly:config.UNASSIGNED_CLIENT_CODE:sandBoxOnly:config.SANDBOX_CLIENT_CODE:products.selectedProduct._id\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<td>${client.client}</br><span class=\"smallLeftMargin\" if.bind=\"client.manual\"><i class=\"fa fa-hand-paper-o\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t aria-hidden=\"true\"></i></span></td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<td>${client.clientStatus | lookupValue:config.CLIENT_STATUSES:\"code\":\"description\"}</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<td>${client.idsAvailable}</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<td>${products.selectedProduct.name}</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<table class=\"col-sm-12\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr repeat.for=\"assignment of client.assignments\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-lg-12 list-group-item \r\n\t\t\t\t\t\t\t\t\t\t${assignment.provisional ? 'provisional' : ''} \r\n\t\t\t\t\t\t\t\t\t\t${assignment.assignment.requestId == selectedRequestDetail.requestId._id ? 'existing' : ''}\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p class=\"list-group-item-text\"><strong>${assignment.studentIDRange} <span class=\"pull-right\">${assignment.facultyIDRange}</span></strong>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<br style=\"margin-top:10px;\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t${assignment.assignment.studentIDRange}\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span if.bind=\"assignment.personId\">${assignment.personId.fullName}</span>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class=\"pull-right\">${assignment.institutionId.name}</span></br></p>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span if.bind=\"assignment.assignment.requestId == selectedRequestDetail.requestId._id || assignment.provisional\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t click.trigger=\"deleteTest($parent.client, $index)\" class=\"smallMarginRight\" bootstrap-tooltip\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Delete\"><i class=\"fa fa-trash-o\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t aria-hidden=\"true\"></i></span>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t</table>\r\n\t\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t</tbody>\r\n\t\t\t\t\t\t\t\t\t</table>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div show.bind=\"!clientsConfigured && productSystems.length\">\r\n\t\t\t\t\t\t\t\t<h5>There are no clients configured for this product in ${systems.selectedSystem.sid}</h5>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/tech/requests/components/viewRequestsTable.html":
/*!*********************************************************************!*\
  !*** ./src/modules/tech/requests/components/viewRequestsTable.html ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div show.bind=\"dataTable.displayArray && dataTable.displayArray.length || initialLoaded\" class=\"panel panel-default rightMargin leftMargin\">\r\n        <div class=\"panel-body\">\r\n            <div class=\"row\">\r\n  <div class=\"row\">\r\n \r\n      <!-- Session Select -->\r\n      <div class=\"col-lg-4\">\r\n        <div class=\"form-group topMargin leftMargin\">\r\n            <select value.bind=\"selectedSession\" change.delegate=\"getRequests()\" id=\"session\" class=\"form-control\">\r\n              <option repeat.for=\"session of sessions.sessionsArray\"\r\n                      value.bind=\"session._id\">Session ${session.session} - ${session.year}</option>\r\n            </select>\r\n        </div>\r\n        <div class=\"checkbox leftMargin\">\r\n          <label>\r\n            <input checked.bind=\"isCheckedAssigned\" change.trigger=\"filterInAssigned()\" type=\"checkbox\"> Filter out Assigned Requests\r\n          </label>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n      <div show.bind=\"selectedSession\">\r\n        <div class=\"row\">\r\n          <div class=\"col-lg-12\">\r\n            <div show.bind=\"noRequests\" class=\"bottomMargin leftMargin\">\r\n                <h4>There are no requests for this session</h4>\r\n            </div>\r\n            <compose  show.bind=\"!noRequests\" view=\"./requestsTable.html\"></compose>\r\n          </div>\r\n      </div>\r\n  </div>\r\n\r\n  </div>\r\n  </div>\r\n  </div>\r\n</template>\r\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/tech/requests/components/viewUserRequestsForm.html":
/*!************************************************************************!*\
  !*** ./src/modules/tech/requests/components/viewUserRequestsForm.html ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t\t<div class=\"fluid-container\">\r\n\t\t\t<!-- Buttons -->\r\n\t\t\t<div class=\"bottomMargin topMargin list-group-item\">\r\n\t\t\t\t<span click.trigger=\"back()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n\t\t\t\t\tdata-original-title=\"Back\"><i class=\"fa fa-arrow-left fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"col-lg-6 col-md-12\">\r\n\t\t\t\t<compose view=\"./userRequestDetails.html\"></compose>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"col-lg-6 col-md-12\">\r\n\t\t\t\t<compose view=\"./userAssignmentDetails.html\"></compose>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/tech/requests/components/viewUserRequestsTable.html":
/*!*************************************************************************!*\
  !*** ./src/modules/tech/requests/components/viewUserRequestsTable.html ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t<style>\r\n\t\t.warning {\r\n\t\t\tbackground-color: #fcf8e3;\r\n\t\t}\r\n\r\n\t\t.assign {\r\n\t\t\tbackground-color: #d9edf7;\r\n\t\t}\r\n\t</style>\r\n\t<div class=\"container\">\r\n\t\t<div class='row'>\r\n\t\t\t<div show.bind=\"dataTable.displayArray.length > 0\" class='bottomMargin'>\r\n\t\t\t\t<compose view=\"../../../../resources/elements/table-navigation-bar.html\"></compose>\r\n\t\t\t\t<div id=\"no-more-tables\">\r\n\t\t\t\t\t<table class=\"table table-striped table-hover cf\">\r\n\t\t\t\t\t\t<thead class=\"cf\">\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td colspan='6'>\r\n\t\t\t\t\t\t\t\t\t<span click.trigger=\"refresh()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n\t\t\t\t\t\t\t\t\t title=\"\" data-original-title=\"Refresh\">\r\n\t\t\t\t\t\t\t\t\t\t<i class=\"fa fa-refresh\" aria-hidden=\"true\"></i>\r\n\t\t\t\t\t\t\t\t\t</span>\r\n\t\t\t\t\t\t\t\t\t<span class=\"pull-right\" id=\"spinner\" innerhtml.bind=\"spinnerHTML\"></span>\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<th></th>\r\n\t\t\t\t\t\t\t\t<th></th>\r\n\t\t\t\t\t\t\t\t<th></th>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<th>\r\n\t\t\t\t\t\t\t\t\tCourse\r\n\t\t\t\t\t\t\t\t\t<span click.trigger=\"dataTable.sortArray('courseId','id', people.coursesArray, '_id', 'name')\">\r\n\t\t\t\t\t\t\t\t\t\t<i class=\"fa fa-sort\"></i>\r\n\t\t\t\t\t\t\t\t\t</span>\r\n\t\t\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t\t\t<th>\r\n\t\t\t\t\t\t\t\t\tSession\r\n\t\t\t\t\t\t\t\t\t<span click.trigger=\"dataTable.sortArray('sessionId','id',sessions.sessionsArray,'_id','startDate')\">\r\n\t\t\t\t\t\t\t\t\t\t<i class=\"fa fa-sort\"></i>\r\n\t\t\t\t\t\t\t\t\t</span>\r\n\t\t\t\t\t\t\t\t\t<br>\r\n\t\t\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t\t\t<th>\r\n\t\t\t\t\t\t\t\t\tProduct Requests (Click to see the details)\r\n\t\t\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t</thead>\r\n\t\t\t\t\t\t<tbody>\r\n\t\t\t\t\t\t\t<tr repeat.for=\"request of dataTable.displayArray\">\r\n\t\t\t\t\t\t\t\t<td click.trigger=\"customerActionResponse(request, $event)\" data-title=\"Course\">\r\n\t\t\t\t\t\t\t\t\t<h5>${request.courseId | courseName:people.coursesArray:config.SANDBOX_ID:config.SANDBOX_NAME}</h5>\r\n\t\t\t\t\t\t\t\t\t<h6>Undergraduates: ${request.undergradIds} Graduates: ${request.graduateIds}</h6>\r\n\t\t\t\t\t\t\t\t\t<h7>Request No: ${request.clientRequestNo}</h7>\r\n\t\t\t\t\t\t\t\t\t<h6 show.bind=\"request.requestStatus == config.CUSTOMER_ACTION_REQUEST_CODE\">\r\n\t\t\t\t\t\t\t\t\t\t<b>CUSTOMER ACTION REQUIRED (click here to respond)</b>\r\n\t\t\t\t\t\t\t\t\t</h6>\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t<td data-title=\"Session\">\r\n\t\t\t\t\t\t\t\t\t<h5>${request.sessionId | sessionName:sessions.sessionsArray}</h5>\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<ul>\r\n\t\t\t\t\t\t\t\t\t\t<li class=\"${detail.requestStatus | getArrayValue:config.REQUEST_STATUS:'status':-1} list-group-item\" click.trigger=\"edit(detail, $event, $index)\"\r\n\t\t\t\t\t\t\t\t\t\t repeat.for=\"detail of request.requestDetails\">\r\n\t\t\t\t\t\t\t\t\t\t\t<h5>${detail.productId | lookupValue:products.productsArray:\"_id\":\"name\"}</h5>\r\n\t\t\t\t\t\t\t\t\t\t\tStatus: ${detail.requestStatus | lookupValue:config.REQUEST_STATUS:\"code\":\"description\"}\r\n\t\t\t\t\t\t\t\t\t\t\t<h7 class=\"leftMargin\">Required: ${detail.requiredDate | dateFormat:config.DATE_FORMAT_TABLE}</h7>\r\n\t\t\t\t\t\t\t\t\t\t\t<h7 class=\"pull-right\" show.bind=\"detail.requestStatus == config.CUSTOMER_ACTION_REQUEST_CODE && request.requestStatus != config.CUSTOMER_ACTION_REQUEST_CODE\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<b>CUSTOMER ACTION REQUIRED (click here to respond)</b>\r\n\t\t\t\t\t\t\t\t\t\t\t</h7>\r\n\t\t\t\t\t\t\t\t\t\t</li>\r\n\t\t\t\t\t\t\t\t\t</ul>\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t</tbody>\r\n\t\t\t\t\t</table>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n\t</div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/tech/requests/createRequest.html":
/*!******************************************************!*\
  !*** ./src/modules/tech/requests/createRequest.html ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\r\n\t<div class=\"fluid-container\">\r\n\t<div class=\"bottomMargin list-group-item\">\r\n\t\t\t<span click.delegate=\"save()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n\t\t\t\tdata-original-title=\"Save\"><i class=\"fa fa-floppy-o fa-lg fa-border\" aria-hidden=\"true\" ></i></span>\r\n\t\t</div>\r\n\t<div class=\"row\">\r\n\t\t<div class=\"col-lg-4\">\r\n\t\t\t<div class=\"topMargin\">\r\n\t\t\t\t<select id=\"session\" value.bind=\"sessionId\" class=\"form-control\" change.delegate=\"changeSession($event)\" id=\"session\">\r\n\t\t\t\t\t<option value=\"-1\">Select a session</option>\r\n\t\t\t\t\t<option repeat.for=\"session of sessions.sessionsArray\"\r\n\t\t\t\t\t\tvalue.bind=\"session._id\">Session ${session.session} - ${session.year}</option>\r\n\t\t\t\t</select>\r\n\t\t\t</div>\r\n\r\n\t\t\t<div show.bind=\"sessionSelected\" class=\"topMargin\">\r\n\t\t\t\t<select id=\"institution\" value.bind=\"selectedInstitution\" change.delegate=\"changeInstitution($event)\" class=\"form-control\">\r\n\t\t\t\t\t<option value=\"\">Choose the Institution</option>\r\n\t\t\t\t\t<option repeat.for=\"item of people.institutionsArray\" value=\"${item._id}\">${item.name}</option>\r\n\t\t\t\t</select>\r\n\t\t\t</div>\r\n\r\n\t\t\t<div show.bind=\"institutionSelected\" class=\"topMargin\">\r\n\t\t\t\t<select id=\"faculty\" value.bind=\"selectedPerson\" change.delegate=\"changePerson($event)\" class=\"form-control\">\r\n\t\t\t\t\t<option value=\"\">Choose the Faculty</option>\r\n\t\t\t\t\t<option repeat.for=\"item of people.instutionPeopleArray\" value=\"${item._id}\">${item.fullName}</option>\r\n\t\t\t\t</select>\r\n\t\t\t</div>\r\n  \r\n\t\t\t<div id=\"course\" show.bind=\"personSelected && useSandbox\" class=\"topMargin\">\r\n\t\t\t\t<select value.bind=\"requestType\" change.delegate=\"changeRequestType($event)\" id=\"requestType\" class=\"form-control\">\r\n\t\t\t\t\t<option value=\"-1\">Choose the Type of The Request</option>\r\n\t\t\t\t\t<option value=\"sandboxCourse\">${config.SANDBOX_NAME}</option>\r\n\t\t\t\t\t<option value=\"regularCourse\">Regular Course</option>\r\n\t\t\t\t</select>\r\n\t\t\t</div>\r\n\t\t\t\t\r\n\t\t\t<compose show.bind=\"regularClient && personSelected\" view='./components/Courses.html'></compose>\r\n\r\n\t\t\t<div id=\"existingRequestInfo\"></div>\r\n\r\n\t\t\t<div class=\"row\"  id=\"numStudents\" show.bind=\"courseSelected && regularClient\">\r\n\t\t\t\t<div class=\"topMargin col-lg-5\">\r\n\t\t\t\t\t<label for=\"undergraduates\" class=\"control-label\">Undergraduates</label>\r\n\t\t\t\t\t<input  id=\"undergraduates\"  type=\"number\" placeholder=\"Number of Undergraduates\"\r\n\t\t\t\t\tclass=\"form-control\" value.bind=\"requests.selectedRequest.undergradIds\"/>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"topMargin col-lg-5\">\r\n\t\t\t\t\t<label for=\"graduates\" class=\"control-label\">Graduates</label>\r\n\t\t\t\t\t<input id=\"graduates\" type=\"number\" placeholder=\"Number of Graduates\"\r\n\t\t\t\t\t\tclass=\"form-control\" value.bind=\"requests.selectedRequest.graduateIds\"/>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"row col-lg-offset-3\" show.bind=\"courseSelected\">\r\n\t\t\t\t<span class=\"col-lg-8 \" id=\"numberOfStudentsError\"></span>\r\n\t\t\t</div>\r\n\r\n\t\t\t<!-- Begin and End Date -->\r\n\t\t\t<div class=\"row\" show.bind=\"sandBoxClient || courseSelected\">\r\n      \t\t\t<div class=\"col-lg-5 topMargin\">\r\n\t\t\t\t\t<label class=\"form-control-label \">Start Date</label>\r\n\t\t\t\t\t<flat-picker disabled.bind=\"showLockMessage\" controlid=\"startDate\" config.bind=\"config\" change.delegate=\"changeBeginDate($event)\"  \r\n\t\t\t\t\t\tvalue.bind=\"requests.selectedRequest.startDate\" startdate.bind=\"minStartDate\" enddate.bind=\"maxStartDate\"></flat-picker>\r\n\t\t\t\t\t<span id='startDateError'></span>\r\n           \t\t</div>\r\n\t\t\t\t<div class=\"col-lg-5 topMargin\">\r\n\t\t\t\t\t<label class=\"form-control-label \">End Date</label>\r\n\t\t\t\t\t<flat-picker disabled.bind=\"showLockMessage\" controlid=\"endDate\" config.bind=\"config\" value.bind=\"requests.selectedRequest.endDate\" startdate.bind=\"minEndDate\" enddate.bind=\"maxEndDate\"></flat-picker>\r\n\t\t\t\t\t<span id='endDateError'></span>\r\n\t\t\t\t</div>\r\n      \t\t</div>\r\n\t\t\t\r\n\t\t</div>\r\n\t\t<div show.bind=\"sandBoxClient || courseSelected\" class=\"col-lg-8\">\r\n\t\t<div class=\"row\">\t\r\n\t\t\t<div class=\"col-md-5 topMargin\">\r\n\t\t\t\t<label id=\"productList\">Available Products</label>\r\n\t\t\t\t<div class=\"well well2 overFlow\" style=\"height:400px;\">\r\n\t\t\t\t\t<input class=\"form-control\" value.bind=\"filter\" input.trigger=\"filterList()\" placeholder=\"Filter products\"/>\r\n\t\t\t\t\t<ul class=\"list-group\">\r\n\t\t\t\t\t\t<a click.trigger=\"selectProduct($event)\" type=\"button\" repeat.for=\"product of filteredProductsArray\" id=\"${product._id}\" class=\"list-group-item dropbtn\">${product.name}</a>\r\n\t\t\t\t\t</ul>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"col-md-5 col-md-offset-1 topMargin\">\r\n\t\t\t\t<label id=\"requestProductsLabel\">Requested Products</label>\r\n\t\t\t\t<div class=\"well well2 overflow\" style=\"height:400px;\">\r\n\t\t\t\t\t<ul class=\"list-group\">\r\n\t\t\t\t\t\t<a  show.bind=\"!product.delete\" click.trigger=\"removeProduct($event)\" type=\"button\" repeat.for=\"product of requests.selectedRequest.requestDetails\" id=\"${product.productId}\"\r\n\t\t\t\t\t\t\t\tclass=\"list-group-item dropbtn\">${product.productId | lookupValue:products.productsArray:\"_id\":\"name\"}</a>\r\n\t\t\t\t\t</ul>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"row\" id=\"productListTable\">\r\n\t\t\t\t<div show.bind=\"requests.selectedRequest.requestDetails.length > 0\">\r\n\t\t\t\t\t<table class=\"table table-striped table-bordered col-md-10 topMargin\">\r\n\t\t\t\t\t\t<thead>\r\n\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t<th>Requested Product</th>\r\n\t\t\t\t\t\t<th>Date Required</th>\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t<tbody id=\"requiredProductsTable\">\r\n\t\t\t\t\t\t<tr repeat.for=\"request of requests.selectedRequest.requestDetails\">\r\n\t\t\t\t\t\t<td>${request.productId | lookupValue:products.productsArray:\"_id\":\"name\"}</td> \r\n\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t<div class=\"form-group  col-md-8\">\r\n\t\t\t\t\t\t\t<flat-picker controlid=\"requiredDate-${$index}\" config.bind=\"configDate\" value.bind=\"request.requiredDate\"></flat-picker>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t</tbody>\r\n\t\t\t\t\t</table>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"row\">\r\n\r\n\t\t\t\t<div class=\"topMargin\" show.bind=\"sandBoxClient || courseSelected\">\r\n\t\t\t\t\t<editor value.bind=\"requests.selectedRequest.comments\" height=\"250\"></editor>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/tech/requests/techRequests.html":
/*!*****************************************************!*\
  !*** ./src/modules/tech/requests/techRequests.html ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <compose view='../../../resources/elements/submenu.html'></compose>   \r\n    <div class=\"col-lg-12\">\r\n        <router-view></router-view>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/tech/requests/viewUserRequests.html":
/*!*********************************************************!*\
  !*** ./src/modules/tech/requests/viewUserRequests.html ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t<div class=\"fluid-container\">\r\n\t\t<div show.bind=\"!requestSelected\" class=\"row\">\r\n\t\t\t<div class=\"col-lg-4\">\t\r\n\t\t\t\t<div class=\"topMargin\">\r\n\t\t\t\t\t<select id=\"institution\" value.bind=\"selectedInstitution\" change.delegate=\"changeInstitution($event)\" class=\"form-control\">\r\n\t\t\t\t\t\t<option value=\"\">Choose the Institution</option>\r\n\t\t\t\t\t\t<option repeat.for=\"item of people.institutionsArray\" value=\"${item._id}\">${item.name}</option>\r\n\t\t\t\t\t</select>\r\n\t\t\t\t</div>\r\n\t\r\n\t\t\t\t<div show.bind=\"institutionSelected\" class=\"topMargin\">\r\n\t\t\t\t\t<select id=\"faculty\" value.bind=\"selectedPerson\" change.delegate=\"changePerson($event)\" class=\"form-control\">\r\n\t\t\t\t\t\t<option value=\"\">Choose the Faculty</option>\r\n\t\t\t\t\t\t<option repeat.for=\"item of people.instutionPeopleArray\" value=\"${item._id}\">${item.fullName}</option>\r\n\t\t\t\t\t</select>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"col-lg-8\">\r\n\t\t\t\t<div show.bind=\"personSelected && !requestSelected\" class=\"col-lg-12\">\r\n\t\t\t\t\t<div class=\"topMargin\">\r\n\t\t\t\t\t\t<select id=\"session\" value.bind=\"sessionId\" class=\"form-control\" change.delegate=\"changeSession($event)\" id=\"session\">\r\n\t\t\t\t\t\t\t<option value=\"-1\">Select a session</option>\r\n\t\t\t\t\t\t\t<option repeat.for=\"session of sessions.sessionsArray\"\r\n\t\t\t\t\t\t\t\tvalue.bind=\"session._id\">Session ${session.session} - ${session.year}</option>\r\n\t\t\t\t\t\t</select>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div show.bind=\"noRequests\" class=\"bottomMargin topMargin leftMargin\">\r\n\t\t\t\t\t\t<h4>You have no existing requests for this session</h4>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<compose show.bind=\"!noRequests\"view=\"./components/viewUserRequestsTable.html\"></compose>\r\n\t\t\t\t</div> \r\n\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div show.bind=\"requestSelected\" class=\"col-lg-12\">\r\n\t\t\t<compose view=\"./components/viewUserRequestsForm.html\"></compose>\r\n\t\t</div>\r\n\t</div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ })

}]);
//# sourceMappingURL=app-fc1603ca.ee17626ecdf4fddfd304.bundle.js.map