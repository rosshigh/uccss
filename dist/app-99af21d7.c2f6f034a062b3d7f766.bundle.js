"use strict";
(self["webpackChunkclient"] = self["webpackChunkclient"] || []).push([["app-99af21d7"],{

/***/ "modules/tech/requests/archiveClientRequests":
/*!************************************************************!*\
  !*** ./src/modules/tech/requests/archiveClientRequests.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ArchiveRequests": function() { return /* binding */ ArchiveRequests; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../resources/utils/dataTable */ 6847);
/* harmony import */ var _resources_data_sessions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../resources/data/sessions */ 2073);
/* harmony import */ var _resources_data_systems__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../resources/data/systems */ 4077);
/* harmony import */ var _resources_data_products__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../resources/data/products */ 8666);
/* harmony import */ var _resources_data_clientRequests__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../resources/data/clientRequests */ 5446);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../config/appConfig */ 1666);
/* harmony import */ var _resources_utils_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../resources/utils/utils */ 8741);
/* harmony import */ var _resources_data_people__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../resources/data/people */ 353);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! moment */ 381);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_9__);
var _dec, _class;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }











var ArchiveRequests = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_config_appConfig__WEBPACK_IMPORTED_MODULE_6__.AppConfig, _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_1__.DataTable, _resources_utils_utils__WEBPACK_IMPORTED_MODULE_7__.Utils, _resources_data_sessions__WEBPACK_IMPORTED_MODULE_2__.Sessions, _resources_data_products__WEBPACK_IMPORTED_MODULE_4__.Products, _resources_data_systems__WEBPACK_IMPORTED_MODULE_3__.Systems, _resources_data_people__WEBPACK_IMPORTED_MODULE_8__.People, _resources_data_clientRequests__WEBPACK_IMPORTED_MODULE_5__.ClientRequests), _dec(_class = /*#__PURE__*/function () {
  function ArchiveRequests(config, datatable, utils, sessions, products, systems, people, requests) {
    this.requestSelected = false;
    this.title = "Tech Staff Client Assignments";
    this.spinnerHTML = "";
    this.isCheckedAssigned = true;
    this.config = config;
    this.dataTable = datatable;
    this.dataTable.initialize(this);
    this.utils = utils;
    this.sessions = sessions;
    this.products = products;
    this.clientRequests = requests;
    this.systems = systems;
    this.people = people;
    this.userObj = JSON.parse(sessionStorage.getItem('user'));
  }

  var _proto = ArchiveRequests.prototype;

  _proto.attached = function attached() {
    $('[data-toggle="tooltip"]').tooltip();
  } //?order=startDate:DSC',
  ;

  _proto.activate =
  /*#__PURE__*/
  function () {
    var _activate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var responses, uccRoles;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return Promise.all([this.sessions.getSessionsArray('?filter=sessionStatus|eq|Closed&order=startDate:DSC', true), this.products.getProductsArray('?order=name'), this.systems.getSystemsArray(), this.config.getConfig()]);

            case 2:
              responses = _context.sent;
              uccRoles = "";
              this.config.ROLES.forEach(function (item) {
                if (item.UCConly) uccRoles += item.role + ":";
              });
              this.people.getUCCStaff(uccRoles);
              this.selectedSession = this.sessions.sessionsArray[0]._id;
              this.getRequests();

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

  _proto.getRequests = /*#__PURE__*/function () {
    var _getRequests = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var _this = this;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!this.selectedSession) {
                _context2.next = 7;
                break;
              }

              this.sessions.selectSessionById(this.selectedSession);
              _context2.next = 4;
              return this.clientRequests.getClientRequestsDetailsArray('?filter=sessionId|eq|' + this.selectedSession, true);

            case 4:
              if (this.clientRequests.requestsDetailsArray && this.clientRequests.requestsDetailsArray.length) {
                this.clientRequests.requestsDetailsArray.forEach(function (item) {
                  if (item.requestId && item.requestId.courseId === null) item.requestId.courseId = {
                    _id: _this.config.SANDBOX_ID,
                    name: _this.config.SANDBOX_NAME
                  };
                });
                this.dataTable.updateArray(this.clientRequests.requestsDetailsArray);
              } else {
                this.displayArray = new Array();
              }

              _context2.next = 8;
              break;

            case 7:
              this.displayArray = new Array();

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function getRequests() {
      return _getRequests.apply(this, arguments);
    }

    return getRequests;
  }();

  _proto.refresh = /*#__PURE__*/function () {
    var _refresh = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
              _context3.next = 3;
              return this.getRequests();

            case 3:
              this.spinnerHTML = "";

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function refresh() {
      return _refresh.apply(this, arguments);
    }

    return refresh;
  }();

  _proto.selectARequest = /*#__PURE__*/function () {
    var _selectARequest = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(index, el, request) {
      var response;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return this.clientRequests.getRequestDetail(request._id);

            case 2:
              response = _context4.sent;

              if (!response.error) {
                this.selectedRequestDetail = response;
                if (this.selectedRequestDetail.requestId && this.selectedRequestDetail.requestId.courseId === null) this.selectedRequestDetail.requestId.courseId = {
                  _id: this.config.SANDBOX_ID,
                  name: this.config.SANDBOX_NAME
                };
                this.originalRequestDetail = this.utils.copyObject(this.selectedRequestDetail);
              } //     this.editIndex = this.dataTable.getOriginalIndex(index);
              //     this.selectedRequestDetail = this.utils.copyObject(request);
              // this.productId = this.selectedRequestDetail.productId._id;
              //     this.products.selectedProductFromId(this.productId);
              //     if(this.selectedRequestDetail.assignments && this.selectedRequestDetail.assignments.length > 0) this.systems.selectedSystemFromId(this.selectedRequestDetail.assignments[0].systemId);
              //     this.idsRequired = parseInt(this.selectedRequestDetail.requestId.graduateIds) + parseInt(this.selectedRequestDetail.requestId.undergradIds);
              //     this.totalIdsAssigned = 0;
              //     if(this.selectedRequestDetail.assignments && this.selectedRequestDetail.assignments.length > 0){
              //         this.selectedRequestDetail.assignments.forEach(item => {
              //             this.totalIdsAssigned += item.idsAssigned;
              //         })
              //     }
              //     this.idsRemaining = this.idsRequired - this.totalIdsAssigned > 0 ?  this.idsRequired - this.totalIdsAssigned : 0;


              this.requestSelected = true;
              if (this.selectedRow) this.selectedRow.children().removeClass('info');
              this.selectedRow = $(el.target).closest('tr');
              this.selectedRow.children().addClass('info');

            case 8:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function selectARequest(_x, _x2, _x3) {
      return _selectARequest.apply(this, arguments);
    }

    return selectARequest;
  }();

  _proto.back = function back() {
    this.requestSelected = false;
  };

  _proto.customNameFilter = function customNameFilter(value, item, context) {
    return item.requestId && item.requestId.personId.fullName.toUpperCase().indexOf(value.toUpperCase()) > -1;
  };

  _proto.statusCustomFilter = function statusCustomFilter(value, item, context) {
    if (item.requestStatus == value) return false;
    return true;
  };

  _proto.institutionCustomFilter = function institutionCustomFilter(value, item, context) {
    return item.requestId && item.requestId.institutionId.name.toUpperCase().indexOf(value.toUpperCase()) > -1;
  };

  _proto.courseCustomFilter = function courseCustomFilter(value, item, context) {
    return item.requestId && item.requestId.courseId.name.toUpperCase().indexOf(value.toUpperCase()) > -1;
  };

  _proto.customProductNameFilter = function customProductNameFilter(value, item, context) {
    for (var i = 0; i < context.products.productsArray.length; i++) {
      if (item.productId._id == context.products.productsArray[i]._id) {
        return context.products.productsArray[i].name.toUpperCase().indexOf(value.toUpperCase()) > -1;
      }
    }

    return false;
  };

  _proto.customCourseSorter = function customCourseSorter(sortProperty, sortDirection, sortArray, context) {
    return sortArray.sort(function (a, b) {
      if (a['requestId']['courseId']['name'] && b['requestId']['courseId']['name']) {
        var result = a['requestId']['courseId']['name'] < b['requestId']['courseId']['name'] ? -1 : a['requestId']['courseId']['name'] > b['requestId']['courseId']['name'] ? 1 : 0;
      } else {
        var result = -1;
      }

      return result * sortDirection;
    });
  };

  _proto.customInstitutionsSorter = function customInstitutionsSorter(sortProperty, sortDirection, sortArray, context) {
    return sortArray.sort(function (a, b) {
      if (a['requestId']['institutionId']['name'] && b['requestId']['institutionId']['name']) {
        var result = a['requestId']['institutionId']['name'] < b['requestId']['institutionId']['name'] ? -1 : a['requestId']['institutionId']['name'] > b['requestId']['institutionId']['name'] ? 1 : 0;
      } else {
        var result = -1;
      }

      return result * sortDirection;
    });
  };

  _proto.customPersonSorter = function customPersonSorter(sortProperty, sortDirection, sortArray, context) {
    return sortArray.sort(function (a, b) {
      if (a['requestId']['personId']['lastName'] && b['requestId']['personId']['lastName']) {
        var result = a['requestId']['personId']['lastName'] < b['requestId']['personId']['lastName'] ? -1 : a['requestId']['personId']['lastName'] > b['requestId']['personId']['lastName'] ? 1 : 0;
      } else {
        var result = -1;
      }

      return result * sortDirection;
    });
  };

  _proto.customRequestStatusSorter = function customRequestStatusSorter(sortProperty, sortDirection, sortArray, context) {
    return sortArray.sort(function (a, b) {
      var result = a[sortProperty] < b[sortProperty] ? -1 : a[sortProperty] > b[sortProperty] ? 1 : 0;
      return result * sortDirection;
    });
  };

  _proto.downloadExcel = function downloadExcel() {
    var csvContent = "data:text/csv;charset=utf-8;,Due,Created,IDs,Product,Course,Faculty,Institution";
    csvContent += "\r\n";
    this.dataTable.baseArray.forEach(function (item) {
      var graduateIds = item.requestId.graduateIds === null ? 0 : item.requestId.graduateIds;
      var undergradIds = item.requestId.undergradIds === null ? 0 : item.requestId.undergradIds;
      var ids = parseInt(graduateIds) + parseInt(undergradIds);
      csvContent += item.requiredDate + ',';
      csvContent += item.createdDate + ',';
      csvContent += ids + ',';
      csvContent += item.productId.name + ',';
      csvContent += item.requestId.courseId.name + ',';
      csvContent += item.requestId.personId.fullName + ',';
      csvContent += item.requestId.institutionId.name + ',';
      csvContent += "\r\n";
    });
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "requestsArchive.csv");
    document.body.appendChild(link);
    link.click();
  };

  return ArchiveRequests;
}()) || _class);

/***/ }),

/***/ "modules/tech/requests/assignments":
/*!**************************************************!*\
  !*** ./src/modules/tech/requests/assignments.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Assignments": function() { return /* binding */ Assignments; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../resources/dialogs/common-dialogs */ 6545);
/* harmony import */ var _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../resources/utils/dataTable */ 6847);
/* harmony import */ var _resources_data_sessions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../resources/data/sessions */ 2073);
/* harmony import */ var _resources_data_systems__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../resources/data/systems */ 4077);
/* harmony import */ var _resources_data_products__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../resources/data/products */ 8666);
/* harmony import */ var _resources_data_clientRequests__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../resources/data/clientRequests */ 5446);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../config/appConfig */ 1666);
/* harmony import */ var _resources_utils_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../resources/utils/utils */ 8741);
/* harmony import */ var _resources_data_people__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../resources/data/people */ 353);
/* harmony import */ var _resources_utils_validation__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../resources/utils/validation */ 2824);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! moment */ 381);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_11__);
var _dec, _class;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }













var Assignments = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_config_appConfig__WEBPACK_IMPORTED_MODULE_7__.AppConfig, _resources_utils_validation__WEBPACK_IMPORTED_MODULE_10__["default"], _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_1__.CommonDialogs, _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_2__.DataTable, _resources_utils_utils__WEBPACK_IMPORTED_MODULE_8__.Utils, _resources_data_sessions__WEBPACK_IMPORTED_MODULE_3__.Sessions, _resources_data_products__WEBPACK_IMPORTED_MODULE_5__.Products, _resources_data_systems__WEBPACK_IMPORTED_MODULE_4__.Systems, _resources_data_people__WEBPACK_IMPORTED_MODULE_9__.People, _resources_data_clientRequests__WEBPACK_IMPORTED_MODULE_6__.ClientRequests), _dec(_class = /*#__PURE__*/function () {
  function Assignments(config, validation, dialog, datatable, utils, sessions, products, systems, people, requests) {
    this.requestSelected = 'table';
    this.title = "Tech Staff Client Assignments";
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
    this.sessions = sessions;
    this.products = products;
    this.clientRequests = requests;
    this.systems = systems;
    this.people = people;
    this.dialog = dialog;
    this.userObj = JSON.parse(sessionStorage.getItem('user'));
  }

  var _proto = Assignments.prototype;

  _proto.attached = /*#__PURE__*/function () {
    var _attached = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var _this = this;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              $('[data-toggle="tooltip"]').tooltip();
              this.initialLoaded = true;
              _context.next = 4;
              return this.getRequests();

            case 4:
              $('#loading').hide();
              setInterval(function () {
                if (_this.requestSelected == 'table') _this.getRequests();
              }, this.refreshInterval * 60 * 1000);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function attached() {
      return _attached.apply(this, arguments);
    }

    return attached;
  }();

  _proto.activate = /*#__PURE__*/function () {
    var _activate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var responses, uccRoles;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return Promise.all([this.sessions.getSessionsArray('?filter=[in]sessionStatus[list]Active:Requests&order=sortOrder', true), this.products.getProductsArray('?filter=active|eq|true&order=name', true), this.systems.getSystemsArray('', true), this.config.getConfig(true)]);

            case 2:
              responses = _context2.sent;
              uccRoles = "";
              this.config.ROLES.forEach(function (item) {
                if (item.UCConly) uccRoles += item.role + ":";
              });
              this.people.getUCCStaff(uccRoles);
              this.manualMode = localStorage.getItem('manualMode') ? localStorage.getItem('manualMode') == "true" : false;
              this.unassignedOnly = localStorage.getItem('unassignedOnly') ? localStorage.getItem('unassignedOnly') == "true" : false;
              this.facultyDetails = localStorage.getItem("facultyDetails") ? localStorage.getItem("facultyDetails") == "true" : false;
              ;
              this.numFacultyIDs = this.config.DEFAULT_FACULTY_IDS;
              this.selectedSession = this.sessions.sessionsArray[0]._id;
              this.initialLoaded = false;
              this.refreshInterval = this.config.CLIENT_REQUEST_REFRESH_INTERVAL;

            case 14:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function activate() {
      return _activate.apply(this, arguments);
    }

    return activate;
  }();

  _proto.getRequests = /*#__PURE__*/function () {
    var _getRequests = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!this.selectedSession) {
                _context3.next = 7;
                break;
              }

              this.isCheckedAssigned = true;
              this.sessions.selectSessionById(this.selectedSession);
              _context3.next = 5;
              return this.filterInAssigned();

            case 5:
              _context3.next = 8;
              break;

            case 7:
              this.displayArray = new Array();

            case 8:
              this.clearFilters();

            case 9:
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
              $('#loading').show();
              _context4.next = 3;
              return this.getRequests();

            case 3:
              $('#loading').hide();
              this.spinnerHTML = "";

            case 5:
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

  _proto.editRequest = /*#__PURE__*/function () {
    var _editRequest = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(index, request) {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              this.editIndex = index;
              this.selectedRequestDetail = this.utils.copyObject(request);
              _context5.next = 4;
              return this.products.selectedProductFromId(this.selectedRequestDetail.productId._id);

            case 4:
              _context5.next = 6;
              return this.people.getCoursesArray(true, '?filter=personId|eq|' + this.selectedRequestDetail.requestId.personId._id);

            case 6:
              this.editStartDate = this.selectedRequestDetail.requestId.startDate;
              this.originalRequestDetail = this.utils.copyObject(this.selectedRequestDetail);
              this.requestSelected = 'edit';

            case 9:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function editRequest(_x, _x2) {
      return _editRequest.apply(this, arguments);
    }

    return editRequest;
  }();

  _proto.backEdit = function backEdit() {
    this.requestSelected = 'table';
  };

  _proto.saveEdit = /*#__PURE__*/function () {
    var _saveEdit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
      var email, serverResponse;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              email = {}; // this.buildAuditDetail();

              this.clientRequests.setTheSelectedRequestDetail(this.selectedRequestDetail);
              _context6.next = 4;
              return this.clientRequests.saveRequestDetail();

            case 4:
              serverResponse = _context6.sent;

              if (!serverResponse.error) {
                // this.clientRequests.setSelectedRequest(this.electedRequestDetail.requestId);
                // let serverResponse = await this.clientRequests.saveRequest();
                this.utils.showNotification("The request was updated");
                this.dataTable.updateArrayMaintainFilters(this.clientRequests.requestsDetailsArray);
                this.reSort(); // this.dataTable.applyFilters();
                // await this.filterInAssigned();

                this._cleanUp();
              }

            case 6:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function saveEdit() {
      return _saveEdit.apply(this, arguments);
    }

    return saveEdit;
  }() // buildAuditDetail(){
  //     var obj = this.selectedRequestDetail;
  //     if(obj.productId != this.originalRequestDetail.productId._id){
  //         this.selectedRequestDetail.requestId.audit.push({
  //             property: "productId",
  //             eventDate: new Date(),
  //             oldValue: this.originalRequestDetail.productId._id,
  //             newValue: obj.productId._id,
  //             personId: this.userObj._id
  //         })
  //     }
  //     if(obj.requestStatus != this.originalRequestDetail.requestStatus){
  //         this.selectedRequestDetail.requestId.audit.push({
  //             property: 'requestStatus',
  //             eventDate: new Date(),
  //             oldValue: this.originalRequestDetail.requestStatus,
  //             newValue: obj.requestStatus,
  //             personId: this.userObj._id
  //         })
  //     }
  //     if(obj.requestId.undergradIds != this.originalRequestDetail.requestId.undergradIds){
  //         this.selectedRequestDetail.requestId.audit.push({
  //             property: "undergradIds",
  //             eventDate: new Date(),
  //             oldValue: this.originalRequestDetail.requestId.undergradIds,
  //             newValue: obj.requestId.undergradIds,
  //             personId: this.userObj._id
  //         })
  //     }
  //     if(obj.requestId.graduateIds != this.originalRequestDetail.requestId.graduateIds){
  //         this.selectedRequestDetail.requestId.audit.push({
  //             property: "graduateIds",
  //             eventDate: new Date(),
  //             oldValue: this.originalRequestDetail.requestId.graduateIds,
  //             newValue: obj.requestId.graduateIds,
  //             personId: this.userObj._id
  //         })
  //     }
  //     if(obj.requestId.startDate != this.originalRequestDetail.requestId.startDate){
  //         this.selectedRequestDetail.requestId.audit.push({
  //             property: 'startDate',
  //             eventDate: new Date(),
  //             oldValue: this.originalRequestDetailrequestId.startDate,
  //             newValue: obj.requestId.startDate,
  //             personId: this.userObj._id
  //         })
  //     }
  //     if(obj.requestId.endDate != this.originalRequestDetail.requestId.endDate){
  //         this.selectedRequestDetail.requestId.audit.push({
  //             property: 'endDate',
  //             eventDate: new Date(),
  //             oldValue: this.originalRequestDetail.requestId.endDate,
  //             newValue: obj.requestId.endDate,
  //             personId: this.userObj._id
  //         })
  //     }
  //     if(obj.requiredDate != this.originalRequestDetail.requiredDate){
  //         this.selectedRequestDetail.requestId.audit.push({
  //             property: "requiredDate",
  //             eventDate: new Date(),
  //             oldValue: this.originalRequestDetail.requiredDate,
  //             newValue: obj.requiredDate,
  //             personId: this.userObj._id
  //         })
  //     }
  //      if(obj.requestId.courseId != this.originalRequestDetail.requestId.courseId){
  //         this.selectedRequestDetail.requestId.audit.push({
  //             property: 'courseId',
  //             eventDate: new Date(),
  //             oldValue: this.originalRequestDetail.requestId.courseId,
  //             newValue: obj.requestId.courseId,
  //             personId: this.userObj._id
  //         })
  //     }
  // }
  // /*****************************************************************************************************
  //  * User selected a requests table
  //  * index - index of the item selected
  //  * el - event object
  //  * request - the selected request object
  //  ****************************************************************************************************/
  ;

  _proto.selectARequest =
  /*#__PURE__*/
  function () {
    var _selectARequest = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(index, el, request) {
      var _this2 = this;

      var response;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              this.sendEmail = this.config.SEND_EMAILS;
              this.selectedRequestDetail = {};
              _context7.next = 4;
              return this.clientRequests.getRequestDetail(request._id);

            case 4:
              response = _context7.sent;

              if (!response.error) {
                this.selectedRequestDetail = response;
                if (this.selectedRequestDetail.requestId && this.selectedRequestDetail.requestId.courseId === null) this.selectedRequestDetail.requestId.courseId = {
                  _id: this.config.SANDBOX_ID,
                  name: this.config.SANDBOX_NAME
                };
                this.originalRequestDetail = this.utils.copyObject(this.selectedRequestDetail);
              } //Initiate temp arrays to hold selected clients and assignment details


              this.profileRequest = undefined;
              this.forceManual = false;
              this.manualMode = localStorage.getItem('manualMode') ? localStorage.getItem('manualMode') == "true" : false; //Initiate interface flags

              this.requestSelected = 'form';
              if (this.manualMode) $(this.proposedIDRange).focus(); //Retrieve relevant data

              this.editIndex = this.dataTable.getOriginalIndex(index);
              this.productId = this.selectedRequestDetail.productId._id;
              this.products.selectedProductFromId(this.productId);
              this.provisionalAssignment = this.selectedRequestDetail.requestStatus == this.config.PROVISIONAL_REQUEST_CODE;
              this.oldRequest = this.utils.copyObject(this.selectedRequestDetail);
              this.productSystems = new Array();

              if (this.products.selectedProduct.systems[0]) {
                _context7.next = 21;
                break;
              }

              this.utils.showNotification("You need to assign a system to this product before you can assign this request", 'warning');
              _context7.next = 23;
              break;

            case 21:
              _context7.next = 23;
              return this.getProductSystems();

            case 23:
              if (this.systemConfigured) {
                this.selectedSystemIndex = 0;
                setTimeout(function () {
                  _this2.systemSelected();
                }, 100);
              }

              this.clientRequired();
              if (this.selectedRow) this.selectedRow.children().removeClass('info');
              this.selectedRow = $(el.target).closest('tr');
              this.selectedRow.children().addClass('info');

            case 28:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function selectARequest(_x3, _x4, _x5) {
      return _selectARequest.apply(this, arguments);
    }

    return selectARequest;
  }();

  _proto.getProductSystems = /*#__PURE__*/function () {
    var _getProductSystems = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
      var _this3 = this;

      var productSystemsSIDs, response;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              this.systemConfigured = false;
              this.productSystems = new Array();
              productSystemsSIDs = "";
              this.products.selectedProduct.systems.forEach(function (item) {
                var delimiterChar = productSystemsSIDs.length ? ":" : "";
                productSystemsSIDs += delimiterChar + item.sid;
              });
              _context8.next = 6;
              return this.systems.getConfiguredProductSystems(productSystemsSIDs);

            case 6:
              response = _context8.sent;

              if (!response.error) {
                response.forEach(function (item) {
                  if (item.sessions.indexOf(_this3.sessions.selectedSession.session) > -1 && item.active) _this3.productSystems.push(item);
                });
              }

              if (this.productSystems != null && this.productSystems.length) this.systemConfigured = true;
              this.productSystems = this.productSystems.sort(function (a, b) {
                return a['sid'] < b['sid'] ? -1 : a['sid'] > b['sid'] ? 1 : 0;
              });

            case 10:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    function getProductSystems() {
      return _getProductSystems.apply(this, arguments);
    }

    return getProductSystems;
  }();

  _proto.clientRequired = function clientRequired() {
    //Parse id templates into an array
    this.studentIDTemplates = this.products.selectedProduct.defaultStudentIdPrefix ? this.products.selectedProduct.defaultStudentIdPrefix.split(":") : new Array();
    this.facultyIDTemplates = this.products.selectedProduct.defaultFacultyIdPrefix ? this.products.selectedProduct.defaultFacultyIdPrefix.split(":") : new Array();

    if (this.studentIDTemplates.length === 0) {
      this.forceManual = true;
      this.manualMode = true;
    } //Booleans to determine whether the id templates exist: they are present, contain a wildcard and, for faculty ids, the request isn't a sandbox


    this.studentIDTemplateAvailable = this.studentIDTemplates.length > 0 && this.products.selectedProduct.defaultStudentIdPrefix.indexOf(this.config.ID_WILDCARD) != -1;
    this.facultyIDTemplateAvailable = this.facultyIDTemplates.length > 0 && this.products.selectedProduct.defaultFacultyIdPrefix.indexOf(this.config.ID_WILDCARD) != -1 && this.selectedRequestDetail.requestId.courseId._id !== this.config.SANDBOX_ID; //Check if the request is a sandbox request

    if (this.selectedRequestDetail.requestId.courseId._id === this.config.SANDBOX_ID) {
      this.idBuffer = localStorage.getItem('idSandboxBuffer') ? localStorage.getItem('idSandboxBuffer') : this.config.SANDBOX_ID_BUFFER;
      this.numberOfIds = localStorage.getItem('sandBoxIDs') ? localStorage.getItem('sandBoxIDs') : this.config.SANDBOX_ID_COUNT;
      this.sandBoxOnly = false;
    } else {
      this.idBuffer = localStorage.getItem('idBuffer') ? localStorage.getItem('idBuffer') : this.config.REGULAR_ID_BUFFER;
      this.selectedRequestDetail.requestId.graduateIds = this.selectedRequestDetail.requestId.graduateIds === null ? 0 : this.selectedRequestDetail.requestId.graduateIds;
      this.selectedRequestDetail.requestId.undergradIds = this.selectedRequestDetail.requestId.undergradIds === null ? 0 : this.selectedRequestDetail.requestId.undergradIds;
      this.numberOfIds = parseInt(this.selectedRequestDetail.requestId.graduateIds) + parseInt(this.selectedRequestDetail.requestId.undergradIds);
      this.sandBoxOnly = false;
    } //Check to see if an assignment has already been made


    if (!this.selectedRequestDetail.assignments || this.selectedRequestDetail.assignments.length == 0) {
      //No assignment has been made
      this.selectedRequestDetail.techComments = this.products.selectedProduct.productInfo ? this.products.selectedProduct.productInfo : "";
      this.idsRequired = parseInt(this.numberOfIds) + parseInt(this.idBuffer);
      this.idsRemaining = this.idsRequired;
      this.existingRequest = false;
      this.totalIdsAssigned = 0;
      this.idsAssigned = 0; // this.assignmentDetails = new Array();
    } else {
      //An assignment has already been made
      this.existingRequest = true;
      this.unassignedOnly = false;
      this.idsAssigned = this.selectedRequestDetail.idsAssigned;
      this.idsRequired = parseInt(this.numberOfIds);
      this.numberOfIds = this.numberOfIds - this.idsAssigned > 0 ? this.numberOfIds - this.idsAssigned : 0;
      this.totalIdsAssigned = this.idsAssigned;
      this.idsRemaining = this.idsRequired - this.idsAssigned > 0 ? this.idsRequired - this.idsAssigned : 0; // this.assignmentDetails = this.selectedRequestDetail.assignments;
      // this.findAssignedClients(); 
    }

    this.assignmentDetailIndex = -1;
    this.calcLastID();
  } // /*****************************************************************************************************
  //  * Calculate the last id when a client is selected
  //  ****************************************************************************************************/
  ;

  _proto.calcLastID = function calcLastID() {
    //If the requested ids are more than the product supprts
    if (this.firstID + this.idsRemaining > this.lastIDAvailable) {
      //set the last id to the last id supported by the product
      this.lastID = this.lastIDAvailable;
    } else {
      //set the last id to the first id plus the ids requested
      this.lastID = parseInt(this.firstID) + parseInt(this.idsRemaining);
    } //Save the last id


    this.oldLastID = this.lastID; //   if(this.firstID > this.lastIDAvailable) return
  } // /*****************************************************************************************************
  //  * User selected a client in the client list
  //  * index - index of the item selected
  //  * el - event object
  //  * client - the selected client object
  //  ****************************************************************************************************/
  ;

  _proto.selectClient = function selectClient(index, client, el) {
    var _this4 = this;

    if (this.deleteClicked) {
      this.deleteProposedClient(this.assignmentDetailIndex);
      this.deleteClicked = false;
      return;
    }

    for (var k = 0; k < this.selectedRequestDetail.assignments.length; k++) {
      if (this.selectedRequestDetail.assignments[k].client == client.client && this.selectedRequestDetail.assignments[k].systemId == client.systemId) return;
    }

    var message,
        okToProcess = true; //Don't allow a client to be selected if there are no ids to be assigned
    // if (!this.idsRemaining > 0) {
    //     this.utils.showNotification("There are no more ids required for this request");
    //     return;
    // }
    //Make sure the selected client is compatible with the selected request

    if (this.selectedRequestDetail.requestId.courseId._id === this.config.SANDBOX_ID && client.clientStatus != this.config.SANDBOX_CLIENT_CODE) {
      message = "The request is for a sandbox and the client isn't a sandbox client.  Are you sure you want to assign it?";
    }

    if (this.selectedRequestDetail.requestId.courseId._id != this.config.SANDBOX_ID && client.clientStatus == this.config.SANDBOX_CLIENT_CODE) {
      message = "The request is for a regular course and the client is a sandbox client.  Are you sure you want to assign it?";
    }

    if (message) {
      return this.dialog.showMessage(message, "Confirm Assignment", ['Yes', 'No']).whenClosed(function (response) {
        if (response.wasCancelled) {
          okToProcess = false;
        } else {
          _this4.processClient(index, client, el);
        }
      });
    } else {
      this.processClient(index, client, el);
    }
  };

  _proto.updateClientAssignments = function updateClientAssignments() {
    this.selectedSystem.clients[this.selectedClientIndex].assignments[this.clientSelectedIndex].studentIDRange = this.selectedRequestDetail.assignments[this.assignmentDetailIndex].studentUserIds;
  };

  _proto.updateClientFacultyAssignments = function updateClientFacultyAssignments() {
    this.selectedSystem.clients[this.selectedClientIndex].assignments[this.clientSelectedIndex].facultyIDRange = this.selectedRequestDetail.assignments[this.assignmentDetailIndex].facultyUserIds;
  };

  _proto.processClient = function processClient(index, client, el) {
    if (client.manual) {
      this.manualMode = true;
      this.forceManual = true;
    } else {
      this.forceManual = false;
      this.manualMode = localStorage.getItem('manualMode') ? localStorage.getItem('manualMode') == "true" : false;
    }

    this.selectedClient = client;
    this.setClientIndex(client.client);
    if (this.manualMode) $(this.proposedIDRange).focus();
    this.lastIDAvailable = this.products.selectedProduct.lastAllowableId ? parseInt(this.products.selectedProduct.lastAllowableId) : parseInt(this.products.selectedProduct.idsAvailable);

    if (client.firstAllowableID && client.firstAllowableID > 0) {
      this.firstID = client.firstAllowableID ? parseInt(client.firstAllowableID) : this.config.FIRST_DEFAULT_ID;
    } else {
      this.firstID = this.products.selectedProduct.firstAllowableId ? parseInt(this.products.selectedProduct.firstAllowableId) : this.config.FIRST_DEFAULT_ID;
    }

    this.lastFirstID = this.firstID;
    this.firstAllowableID = this.firstID;
    this.firstNumericFacID = this.firstID;
    this.lastNumericFacID = this.firstNumericFacID + this.numFacultyIDs - 1; //Look for the highest assigned id and set the first id equal to that plus the id buffer

    if (client.assignments.length > 0) {
      var maxId = 0;
      client.assignments.forEach(function (item) {
        if (parseInt(item.lastID) > parseInt(maxId)) maxId = parseInt(item.lastID);
      });
      this.firstID = parseInt(maxId) + parseInt(this.idBuffer);
    }

    if (this.firstID > this.lastIDAvailable) return; //Save the first id 

    this.lastFirstID = this.firstID;
    this.firstNumericFacID = client.lastFacIdAssigned == 0 ? parseInt(client.lastFacIdAssigned) : parseInt(client.lastFacIdAssigned) + parseInt(this.numFacultyIDs); //FACULTY_ID_BUFFER);

    this.lastNumericFacID = this.firstNumericFacID + this.numFacultyIDs; //config.DEFAULT_FACULTY_IDS;

    this.calcLastID();
    this.selectedRequestDetail.assignments.push({
      staffId: this.userObj._id,
      client: client.client,
      systemId: client.systemId,
      firstID: this.firstID,
      lastID: this.lastID,
      firstFacID: this.firstNumericFacID,
      lastFacID: this.lastNumericFacID,
      firstFacIdAssigned: this.firstNumericFacID,
      lastFacIdAssigned: this.lastNumericFacID,
      idsAssigned: parseInt(this.lastID) - parseInt(this.firstID)
    }); //Calculate the total ids assigned so far

    this.totalIdsAssigned = parseInt(this.totalIdsAssigned) + parseInt(this.lastID) - parseInt(this.firstID);
    this.assignmentDetailIndex = this.selectedRequestDetail.assignments.length - 1; //Calculate the user ids and passwords

    if (this.studentIDTemplates.length) {
      this.calcAssignment();
      this.idsRemaining = parseInt(this.idsRemaining) - this.selectedRequestDetail.assignments[this.assignmentDetailIndex].idsAssigned;
    }

    this.insertAssignmentIntoSystem(client, this.selectedRequestDetail.assignments[this.assignmentDetailIndex]);
    this.assignClientStatus();
    this.clientSelected = true;
    this.enableButton = true;
    if (this.selectedRow) this.selectedRow.children().removeClass('info');
    this.selectedRow = $(el.target).closest('tr');
    this.selectedRow.children().addClass('info');
  };

  _proto.assignClientStatus = function assignClientStatus() {
    if (this.selectedSystem.clients[this.selectedClientIndex].clientStatus !== this.config.SANDBOX_CLIENT_CODE) {
      if (this.selectedSystem.clients[this.selectedClientIndex].assignments && this.selectedSystem.clients[this.selectedClientIndex].assignments.length === 0) {
        this.selectedSystem.clients[this.selectedClientIndex].clientStatus = this.config.UNASSIGNED_CLIENT_CODE; // this.productSystems[this.selectedSystemIndex].clients[this.selectedClientIndex].clientStatus = this.config.UNASSIGNED_CLIENT_CODE;
      } else if (this.selectedSystem.clients[this.selectedClientIndex].assignments.length === 1) {
        this.selectedSystem.clients[this.selectedClientIndex].clientStatus = this.config.ASSIGNED_CLIENT_CODE; // this.productSystems[this.selectedSystemIndex].clients[this.selectedClientIndex].clientStatus = this.config.ASSIGNED_CLIENT_CODE;
      } else {
        this.selectedSystem.clients[this.selectedClientIndex].clientStatus = this.config.SHARED_CLIENT_CODE; // this.productSystems[this.selectedSystemIndex].clients[this.selectedClientIndex].clientStatus = this.config.SHARED_CLIENT_CODE;
      }
    }
  };

  _proto.insertAssignmentIntoSystem = function insertAssignmentIntoSystem(client, details) {
    client.idsAvailable = client.idsAvailable - (parseInt(details.lastID) - parseInt(details.firstID));
    var clientCopy = this.utils.copyObject(client);
    clientCopy.assignments.push({
      assignment: this.selectedRequestDetail._id,
      studentIDRange: details.studentUserIds,
      facultyIDRange: details.facultyUserIds,
      institutionId: this.selectedRequestDetail.requestId.institutionId,
      personId: this.selectedRequestDetail.requestId.personId,
      firstID: details.firstID,
      lastID: details.lastID,
      provisional: true
    });
    this.updateProductSystemsClient(clientCopy, clientCopy.systemId);
  };

  _proto.calcAssignment = function calcAssignment() {
    this.calcIDRangeFromTemplate();
    this.calculatePasswords();
  } // /*****************************************************************************************************
  //  * Calculates the student and faculty id ranges from the configured id template
  //  ****************************************************************************************************/
  ;

  _proto.calcIDRangeFromTemplate = function calcIDRangeFromTemplate() {
    //If the user has selected manual mode or no assignment is selected, skip the calculation
    if (this.manualMode || this.assignmentDetailIndex == -1) {
      return;
    } //If there is no template, set the range to empty string


    if (!this.studentIDTemplateAvailable) {
      this.selectedRequestDetail.assignments[this.assignmentDetailIndex].studentUserIds = this.products.selectedProduct.defaultStudentIdPrefix ? this.products.selectedProduct.defaultStudentIdPrefix : "";
    } else {
      //Determine if user has selected a template and if not, select the first one
      var selectedStudentIDTemplates = new Array();

      if (this.selectedStudentIDTemplate.length == 0) {
        selectedStudentIDTemplates.push(this.studentIDTemplates[0]);
      } else {
        for (var k = 0; k < this.selectedStudentIDTemplate.length; k++) {
          selectedStudentIDTemplates.push(this.studentIDTemplates[parseInt(this.selectedStudentIDTemplate[k])]);
        }
      } //For each selected template, calculate the id range and add them to the ids allocated


      this.selectedRequestDetail.assignments[this.assignmentDetailIndex].studentUserIds = "";

      for (var i = 0; i < selectedStudentIDTemplates.length; i++) {
        var firstStudentId = this.getID(selectedStudentIDTemplates[i], this.firstID);
        var lastStudentId = this.getID(selectedStudentIDTemplates[i], this.lastID);
        this.selectedRequestDetail.assignments[this.assignmentDetailIndex].studentUserIds += firstStudentId + " to " + lastStudentId + ":";
      } //Strip off the last colon


      this.selectedRequestDetail.assignments[this.assignmentDetailIndex].studentUserIds = this.selectedRequestDetail.assignments[this.assignmentDetailIndex].studentUserIds.substring(0, this.selectedRequestDetail.assignments[this.assignmentDetailIndex].studentUserIds.length - 1);
      this.selectedRequestDetail.assignments[this.assignmentDetailIndex].notValid = this.validateIDRange(this.selectedSystem.clients[this.selectedClientIndex], this.selectedRequestDetail.assignments[this.assignmentDetailIndex], this.selectedRequestDetail._id) ? '' : 'danger';
      if (this.selectedRequestDetail.assignments[this.assignmentDetailIndex].notValid != 'danger') this.validation.makeValid($("#errorRange"));
    }

    this.calcFacIDRangeFromTemplate();
  };

  _proto.calcFacIDRangeFromTemplate = function calcFacIDRangeFromTemplate() {
    //If there is no template configured for faculty ids or if this is a sandbox request set the faculty ids to empty string
    if (this.products.selectedProduct.defaultFacultyIdPrefix && this.products.selectedProduct.defaultFacultyIdPrefix.indexOf(this.config.ID_WILDCARD) == -1 || this.selectedRequestDetail.requestId.courseId._id === this.config.SANDBOX_ID || this.facultyIDTemplates.length == 0) {
      if (this.selectedRequestDetail.requestId.courseId._id !== this.config.SANDBOX_ID) this.selectedRequestDetail.assignments[this.assignmentDetailIndex].facultyUserIds = this.products.selectedProduct.defaultFacultyIdPrefix;
    } else {
      var selectedFacultyIDTemplates = new Array();

      if (this.selectedStudentIDTemplate.length == 0) {
        selectedFacultyIDTemplates.push(this.facultyIDTemplates[0]);
      } else {
        for (var k = 0; k < this.selectedStudentIDTemplate.length; k++) {
          selectedFacultyIDTemplate.push(this.facultyIDTemplates[parseInt(this.selectedFacultyIDTemplate[k])]);
        }
      }

      this.selectedRequestDetail.assignments[this.assignmentDetailIndex].facultyUserIds = "";

      for (var i = 0; i < selectedFacultyIDTemplates.length; i++) {
        var firstFacID = this.getID(selectedFacultyIDTemplates[i], this.selectedRequestDetail.assignments[this.assignmentDetailIndex].firstFacID);
        var lastFacID = this.getID(selectedFacultyIDTemplates[i], this.selectedRequestDetail.assignments[this.assignmentDetailIndex].lastFacID);
        this.selectedRequestDetail.assignments[this.assignmentDetailIndex].facultyUserIds += firstFacID + " to " + lastFacID + ":";
      } //Strip off the last colon


      this.selectedRequestDetail.assignments[this.assignmentDetailIndex].facultyUserIds = this.selectedRequestDetail.assignments[this.assignmentDetailIndex].facultyUserIds.substring(0, this.selectedRequestDetail.assignments[this.assignmentDetailIndex].facultyUserIds.length - 1);
    }
  } //  /*****************************************************************************************************
  //  * Calculate a user id from a template
  //  * idPrefix -an id template.  Templates are defined for products.
  //  * id - an integer
  //  ****************************************************************************************************/
  ;

  _proto.getID = function getID(idPrefix, id) {
    if (idPrefix) {
      var len = idPrefix.lastIndexOf(this.config.ID_WILDCARD) - idPrefix.indexOf(this.config.ID_WILDCARD) + 1;
      var prefix = "000".substr(0, len - id.toString().length);
      return idPrefix.substr(0, idPrefix.indexOf(this.config.ID_WILDCARD)) + prefix + id;
    }

    return "";
  } // /*****************************************************************************************************
  //  * Calculate a password from a template
  //  ****************************************************************************************************/
  ;

  _proto.calculatePasswords = function calculatePasswords() {
    //If the user selected manual mode or if no assignment is selected, return
    if (this.manualMode || this.assignmentDetailIndex == -1) {
      return;
    }

    if (this.selectedRequestDetail.assignments.length > 0) {
      this.selectedRequestDetail.assignments[this.assignmentDetailIndex].facultyPassword = this.selectedRequestDetail.assignments[0].facultyPassword;
      this.selectedRequestDetail.assignments[this.assignmentDetailIndex].studentPassword = this.selectedRequestDetail.assignments[0].studentPassword;
    }

    var random;
    var prefix;
    var len; //If the product student password template is defined with a wildcard calculate the password 

    if (this.products.selectedProduct.defaultStudentPassword && this.products.selectedProduct.defaultStudentPassword.indexOf(this.config.ID_WILDCARD) != -1) {
      len = this.products.selectedProduct.defaultStudentPassword.lastIndexOf(this.config.ID_WILDCARD) - this.products.selectedProduct.defaultStudentPassword.indexOf(this.config.ID_WILDCARD) + 1;
      prefix = "9" + "000".substr(0, len - 1);
      random = Math.floor(Math.random() * parseInt(prefix));
      this.selectedRequestDetail.assignments[this.assignmentDetailIndex].studentPassword = this.products.selectedProduct.defaultStudentPassword.substr(0, this.products.selectedProduct.defaultStudentPassword.indexOf(this.config.ID_WILDCARD)) + random;
    } else {
      this.selectedRequestDetail.assignments[this.assignmentDetailIndex].studentPassword = this.products.selectedProduct.defaultStudentPassword;
    } //Sandbox assignments don't have faculty ids so set the password to empty string


    if (this.selectedRequestDetail.requestId.courseId._id === this.config.SANDBOX_ID) {
      this.selectedRequestDetail.assignments[this.assignmentDetailIndex].facultyPassword = "";
    } else {
      //If the product faculty password template is defined with a wildcard calculate the password
      if (this.products.selectedProduct.defaultFacultyPassword && this.products.selectedProduct.defaultFacultyPassword.indexOf(this.config.ID_WILDCARD) != -1) {
        len = this.products.selectedProduct.defaultFacultyPassword.lastIndexOf(this.config.ID_WILDCARD) - this.products.selectedProduct.defaultFacultyPassword.indexOf(this.config.ID_WILDCARD) + 1;
        prefix = "9" + "000".substr(0, len - 1);
        random = Math.floor(Math.random() * parseInt(prefix));
        this.selectedRequestDetail.assignments[this.assignmentDetailIndex].facultyPassword = this.products.selectedProduct.defaultFacultyPassword.substr(0, this.products.selectedProduct.defaultFacultyPassword.indexOf(this.config.ID_WILDCARD)) + random;
      } else {
        this.selectedRequestDetail.assignments[this.assignmentDetailIndex].facultyPassword = this.products.selectedProduct.defaultFacultyPassword;
      }
    }
  } // /*****************************************************************************************************
  //  * The user changed the first id field
  //  ****************************************************************************************************/
  ;

  _proto.firstIDChanged = function firstIDChanged() {
    this.firstID = $("#firstID").val(); //Make sure the id isn't lower than the first allowable id for the product

    if (this.firstID < this.firstAllowableID) this.firstID = this.firstAllowableID;

    if (parseInt(this.lastID) + parseInt(this.firstID) - parseInt(this.lastFirstID) > this.lastIDAvailable) {
      this.firstID = this.lastFirstID;
      return;
    } //Calculate the last id using the difference between the previous firstID and the current firstID


    this.lastID = parseInt(this.lastID) + parseInt(this.firstID) - parseInt(this.lastFirstID); //If a client has been selected, update the assignment firstID then recalculate the id range

    if (this.assignmentDetailIndex > -1) {
      this.selectedRequestDetail.assignments[this.assignmentDetailIndex].firstID = this.firstID;
      this.selectedRequestDetail.assignments[this.assignmentDetailIndex].lastID = this.lastID;
      this.calcIDRangeFromTemplate();
    } //Save the new firstID


    this.selectedSystem.clients[this.selectedClientIndex].idsAvailable = this.selectedSystem.clients[this.selectedClientIndex].idsAvailable + (parseInt(this.firstID) - parseInt(this.lastFirstID));
    this.lastFirstID = this.firstID;
    this.selectedSystem.clients[this.selectedClientIndex].assignments[this.clientSelectedIndex].studentIDRange = this.selectedRequestDetail.assignments[this.assignmentDetailIndex].studentUserIds; // this.productSystems[this.selectedSystemIndex].clients[this.selectedClientIndex].studentIDRange = this.selectedRequestDetail.assignments[this.assignmentDetailIndex].studentUserIds;

    setTimeout(function () {
      $("#lastID").focus();
      $("#firstID").focus();
    }, 100);
  } // /*****************************************************************************************************
  //  * The user changed the last id field
  //  ****************************************************************************************************/
  ;

  _proto.lastIDChanged = function lastIDChanged() {
    this.lastID = $("#lastID").val(); //Make sure the lastID isn't higher than the last ID available for the product

    if (this.lastID > this.lastIDAvailable) {
      this.lastID = this.lastIDAvailable;
    } //Adjust the required ids 


    this.idsRequired = parseInt(this.idsRequired) + parseInt(this.lastID) - parseInt(this.oldLastID); //If a client is selected and the assignment has already been saved

    if (this.assignmentDetailIndex > -1) {
      //Adjust the ids assigned
      this.selectedRequestDetail.assignments[this.assignmentDetailIndex].idsAssigned = parseInt(this.selectedRequestDetail.assignments[this.assignmentDetailIndex].idsAssigned) + parseInt(this.lastID) - parseInt(this.oldLastID);
      this.totalIdsAssigned = parseInt(this.totalIdsAssigned) + parseInt(this.lastID) - parseInt(this.oldLastID); //Set the lastID in the assignment

      this.selectedRequestDetail.assignments[this.assignmentDetailIndex].lastID = this.lastID;
      this.selectedSystem.clients[this.selectedClientIndex].lastIdAssigned = this.lastID; // this.productSystems[this.selectedSystemIndex].clients[this.selectedClientIndex].lastIdAssigned = this.lastID;
      //Recalculate the id range

      this.calcIDRangeFromTemplate();
    } else {
      //No client selected and no assignment, adjus the ids remaining
      this.idsRemaining = parseInt(this.idsRemaining) + parseInt(this.lastID) - parseInt(this.oldLastID);
    }

    this.selectedSystem.clients[this.selectedClientIndex].idsAvailable = this.selectedSystem.clients[this.selectedClientIndex].idsAvailable + (parseInt(this.oldLastID) - parseInt(this.lastID));
    this.oldLastID = this.lastID;
    this.selectedSystem.clients[this.selectedClientIndex].assignments[this.clientSelectedIndex].studentIDRange = this.selectedRequestDetail.assignments[this.assignmentDetailIndex].studentUserIds; // this.productSystems[this.selectedSystemIndex].clients[this.selectedClientIndex].studentIDRange = this.selectedRequestDetail.assignments[this.assignmentDetailIndex].studentUserIds;

    setTimeout(function () {
      $("#firstID").focus();
      $("#lastID").focus();
    }, 100);
  };

  _proto.lastFacIDChanged = function lastFacIDChanged() {
    this.numFacultyIDs = parseInt(this.lastNumericFacID) - parseInt(this.firstNumericFacID) + 1;

    if (this.assignmentDetailIndex > -1) {
      this.selectedSystem.clients[this.selectedClientIndex].lastFacIdAssigned = parseInt(this.lastNumericFacID); // this.productSystems[this.selectedSystemIndex].clients[this.selectedClientIndex].lastFacIdAssigned = parseInt(this.lastNumericFacID);

      this.selectedRequestDetail.assignments[this.assignmentDetailIndex].lastFacID = parseInt(this.lastNumericFacID);
      this.calcFacIDRangeFromTemplate();
    } //NEED TO UPDATE PROPOSED CLIENT ASSIGNMENT


    this.selectedSystem.clients[this.selectedClientIndex].assignments[this.clientSelectedIndex].facultyIDRange = this.selectedRequestDetail.assignments[this.assignmentDetailIndex].facultyUserIds; // this.productSystems[this.selectedSystemIndex].clients[this.selectedClientIndex].facultyIDRange = this.selectedRequestDetail.assignments[this.assignmentDetailIndex].facultyUserIds;

    setTimeout(function () {
      $("#firstFacID").focus();
      $("#lastFacID").focus();
    }, 100);
  };

  _proto.firstFacIDChanged = function firstFacIDChanged() {
    this.lastNumericFacID = parseInt($("#firstFacID").val()) + parseInt(this.numFacultyIDs) - 1;

    if (this.assignmentDetailIndex > -1) {
      this.selectedSystem.clients[this.selectedClientIndex].firstFacIdAssigned = this.firstNumericFacID;
      this.selectedRequestDetail.assignments[this.assignmentDetailIndex].firstFacID = this.firstNumericFacID;
      this.selectedSystem.clients[this.selectedClientIndex].lastFacIdAssigned = this.lastNumericFacID;
      this.selectedRequestDetail.assignments[this.assignmentDetailIndex].lastFacID = this.lastNumericFacID;
      this.calcFacIDRangeFromTemplate();
    }

    this.selectedSystem.clients[this.selectedClientIndex].assignments[this.clientSelectedIndex].facultyIDRange = this.selectedRequestDetail.assignments[this.assignmentDetailIndex].facultyUserIds; // this.productSystems[this.selectedSystemIndex].clients[this.selectedClientIndex].facultyIDRange = this.selectedRequestDetail.assignments[this.assignmentDetailIndex].facultyUserIds;

    setTimeout(function () {
      $("#lastFacID").focus();
      $("#firstFacID").focus();
    }, 100);
  }
  /*****************************************************************************************************
   * Check to see if an id range overlaps other assignments in the same client
   ****************************************************************************************************/
  ;

  _proto.validateIDRange = function validateIDRange(client, assignment, id) {
    var _this5 = this;

    if (!client.assignments || client.assignments.length == 1) return true;
    client.assignments.forEach(function (item) {
      if (item.firstID === null || item.firstID == "" || item.lastID === null || item.lastID === "") {
        return _this5.dialog.showMessage("You must enter the ID range manually with this client.", "Manual Assignment", ['OK']).whenClosed(function (response) {
          return true;
        });
      }
    });
    var valid = true;
    var x1 = parseInt(assignment.firstID);
    var x2 = parseInt(assignment.lastID);

    for (var i = 0; i < client.assignments.length - 1; i++) {
      // if(this.existingRequest  && client.assignments[i].assignment == id){
      var y1 = parseInt(client.assignments[i].firstID);
      var y2 = parseInt(client.assignments[i].lastID);

      if (x1 === y1 && x2 === y2) {
        continue;
      } else {
        if (!(x2 < y1 || x1 > y2)) valid = false;
      }
    }

    return valid;
  }
  /*****************************************************************************************************
      * The user selects an assignment 
      * index - the index of the selected assignment
      * el - the event object
      ****************************************************************************************************/
  ;

  _proto.selectProposedClient = function selectProposedClient(index, el) {
    //Save the index 
    this.assignmentDetailIndex = index;
    this.setClientIndex(this.selectedRequestDetail.assignments[this.assignmentDetailIndex].client);
    this.setClientAssignmentIndex(this.selectedSystem.clients[this.selectedClientIndex]);

    if (this.assignmentDetailIndex == -1) {
      this.selectedAssignedClient = "";
      if (this.selectedRow) this.selectedRow.children().removeClass('info');
    } else {
      this.selectedAssignedClient = this.selectedRequestDetail.assignments[this.assignmentDetailIndex].client; //Update the firstID and lastID fileds with the assignment firstID and lastID

      this.firstID = this.selectedRequestDetail.assignments[this.assignmentDetailIndex].firstID;
      this.lastID = this.selectedRequestDetail.assignments[this.assignmentDetailIndex].lastID;
      this.selectedSystem.clients[this.selectedClientIndex].lastIdAssigned = this.lastID; // this.productSystems[this.selectedSystemIndex].clients[this.selectedClientIndex].lastIdAssigned = this.lastID;

      this.firstNumericFacID = this.selectedRequestDetail.assignments[this.assignmentDetailIndex].firstFacID;
      this.lastNumericFacID = this.selectedRequestDetail.assignments[this.assignmentDetailIndex].lastFacID;
      this.selectedSystem.clients[this.selectedClientIndex].lastFacIdAssigned = this.selectedRequestDetail.assignments[this.assignmentDetailIndex].lastFacID; // this.productSystems[this.selectedSystemIndex].clients[this.selectedClientIndex].lastFacIdAssigned = this.selectedRequestDetail.assignments[this.assignmentDetailIndex].lastFacID;

      this.oldIdsAssigned = parseInt(this.lastID) - parseInt(this.lastID);
      this.oldLastID = this.lastID;
      this.lastFirstID = this.firstID;
      this.forceManual = this.selectedSystem.clients[this.selectedClientIndex].manual;
      this.manualMode = this.selectedSystem.clients[this.selectedClientIndex].manual; //Highlight the table row

      if (this.selectedAssignmentRow) this.selectedAssignmentRow.children().removeClass('info');
      this.selectedAssignmentRow = $(el.target).closest('tr');
      this.selectedAssignmentRow.children().addClass('info');
    }
  };

  _proto.deleteTest = function deleteTest(assignment, index) {
    this.setAssignmentIndex(assignment.client);
    this.setClientIndex(assignment.client);
    this.clientSelectedIndex = index;
    this.deleteClicked = true;
  };

  _proto.deleteTable = function deleteTable(assignment) {
    this.setAssignmentIndex(assignment.client);
    this.setClientIndex(assignment.client);
    this.setClientAssignmentIndex(this.selectedSystem.clients[this.selectedClientIndex]);
    this.deleteProposedClient(assignment);
  }
  /*****************************************************************************************************
   * The user deletes an assignment 
   * index - the index of the selected assignment
   ****************************************************************************************************/
  ;

  _proto.deleteProposedClient =
  /*#__PURE__*/
  function () {
    var _deleteProposedClient = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
      var _this6 = this;

      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              if (!this.selectedRequestDetail.assignments[this.assignmentDetailIndex].assignedDate) {
                _context9.next = 4;
                break;
              }

              return _context9.abrupt("return", this.dialog.showMessage("This will delete the assignment.  Are you sure you want to do that?", "Delete Assignment", ['Yes', 'No']).whenClosed(function (response) {
                if (!response.wasCancelled) {
                  _this6.deleteSaved(_this6.assignmentDetailIndex);
                }
              }));

            case 4:
              if (this.forceManual) this.manualMode = false;
              this.forceManual = false; //Undo the changes made by the assignment

              this.idsRemaining = parseInt(this.idsRemaining) + parseInt(this.selectedRequestDetail.assignments[this.assignmentDetailIndex].idsAssigned);
              this.selectedSystem.clients[this.selectedClientIndex].idsAvailable = parseInt(this.selectedSystem.clients[this.selectedClientIndex].idsAvailable) + parseInt(this.selectedRequestDetail.assignments[this.assignmentDetailIndex].idsAssigned);
              this.totalIdsAssigned = parseInt(this.totalIdsAssigned) - parseInt(this.selectedRequestDetail.assignments[this.assignmentDetailIndex].idsAssigned); //Delete the assignment and the client

              this.deleteProvisinoalClientAssignment();
              this.assignClientStatus();
              this.assignmentDetailIndex = -1;
              if (this.selectedRow) this.selectedRow.children().removeClass('info');

            case 13:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, this);
    }));

    function deleteProposedClient() {
      return _deleteProposedClient.apply(this, arguments);
    }

    return deleteProposedClient;
  }() //Find index of client in selected system
  ;

  _proto.setClientIndex = function setClientIndex(client) {
    for (var k = 0; k < this.selectedSystem.clients.length; k++) {
      if (this.selectedSystem.clients[k].client == client) {
        this.selectedClientIndex = k;
        return;
      }
    }
  } //Find index of assignment in request detail
  ;

  _proto.setAssignmentIndex = function setAssignmentIndex(client) {
    for (var k = 0; k < this.selectedRequestDetail.assignments.length; k++) {
      if (this.selectedRequestDetail.assignments[k].client == client) {
        this.assignmentDetailIndex = k;
        return;
      }
    }
  };

  _proto.setClientAssignmentIndex = function setClientAssignmentIndex(client) {
    for (var k = 0; k < client.assignments.length; k++) {
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
  };

  _proto.deleteProvisinoalClientAssignment = function deleteProvisinoalClientAssignment() {
    this.setClientIndex(this.selectedRequestDetail.assignments[this.assignmentDetailIndex].client); // this.productSystems[this.selectedSystemIndex].clients[this.selectedClientIndex].assignments.splice(this.clientSelectedIndex, 1);

    this.selectedSystem.clients[this.selectedClientIndex].assignments.splice(this.clientSelectedIndex, 1);
    this.selectedRequestDetail.assignments.splice(this.assignmentDetailIndex, 1);
  }
  /*****************************************************************************************************
   * Delete the assignment in the database
   ****************************************************************************************************/
  ;

  _proto.deleteSaved =
  /*#__PURE__*/
  function () {
    var _deleteSaved = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(index) {
      var request, serverResponse;
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              //Update the client
              this.selectedSystem.clients[this.selectedClientIndex].idsAvailable = parseInt(this.selectedSystem.clients[this.selectedClientIndex].idsAvailable) + parseInt(this.selectedRequestDetail.assignments[this.assignmentDetailIndex].idsAssigned);
              this.idsRemaining = parseInt(this.idsRemaining) + parseInt(this.selectedRequestDetail.assignments[this.assignmentDetailIndex].idsAssigned);
              this.totalIdsAssigned = parseInt(this.totalIdsAssigned) - parseInt(this.selectedRequestDetail.assignments[this.assignmentDetailIndex].idsAssigned); //Construct the object to submit to the server

              this.selectedRequestDetail.idsAssigned = parseInt(this.selectedRequestDetail.idsAssigned) - parseInt(this.selectedRequestDetail.assignments[this.assignmentDetailIndex].idsAssigned);
              this.deleteProvisinoalClientAssignment();
              this.assignClientStatus();
              this.selectedRequestDetail.requestStatus = this.selectedRequestDetail.assignments && this.selectedRequestDetail.assignments.length > 0 ? this.config.ASSIGNED_REQUEST_CODE : this.config.UNASSIGNED_REQUEST_CODE;
              this.requestToSave = this.utils.copyObject(this.selectedRequestDetail.requestId); // this.requestToSave.audit.push({
              //     property: 'Delete Assignment',
              //     newValue: JSON.stringify(this.assignment),
              //     oldValue: this.selectedRequestDetail.productId.name,
              //     eventDate: new  Date(),
              //     personId: this.userObj.fullName
              // })

              this.requestToSave.requestDetailsToSave = new Array();
              request = this.utils.copyObject(this.selectedRequestDetail);
              delete request['requestId'];
              this.requestToSave.requestDetailsToSave.push(request);
              this.requestToSave.systemsToSave = [this.selectedSystem];
              this.clientRequests.setSelectedRequest(this.requestToSave);
              _context10.next = 16;
              return this.clientRequests.assignRequest(this.editIndex);

            case 16:
              serverResponse = _context10.sent;

              if (serverResponse.status) {
                _context10.next = 23;
                break;
              }

              this.dataTable.updateArrayMaintainFilters(this.clientRequests.requestsDetailsArray);
              this.reSort();
              _context10.next = 22;
              return this.filterInAssigned();

            case 22:
              this.utils.showNotification("The assignment was deleted");

            case 23:
              this.selectedAssignedClient = "";

            case 24:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, this);
    }));

    function deleteSaved(_x6) {
      return _deleteSaved.apply(this, arguments);
    }

    return deleteSaved;
  }()
  /**
  * Delete the request
  */
  ;

  _proto.delete = function _delete() {
    var _this7 = this;

    if (this.selectedRequestDetail.assignments && this.selectedRequestDetail.assignments.length > 0) {
      return this.dialog.showMessage("Please delete the assignments before deleting the request", "Delete Request", ['OK']).whenClosed(function (response) {
        if (!response.wasCancelled) {
          return;
        }
      });
    } else {
      return this.dialog.showMessage("Are you sure you want to delete the request?", "Delete Request", ['Yes', 'No']).whenClosed(function (response) {
        if (!response.wasCancelled) {
          _this7.deleteRequest();
        }
      });
    }
  };

  _proto.deleteRequest = /*#__PURE__*/function () {
    var _deleteRequest = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
      var serverResponse;
      return regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              this.clientRequests.setTheSelectedRequestDetail(this.selectedRequestDetail);
              _context11.next = 3;
              return this.clientRequests.deleteRequest();

            case 3:
              serverResponse = _context11.sent;

              if (serverResponse.error) {
                _context11.next = 9;
                break;
              }

              _context11.next = 7;
              return this.filterInAssigned();

            case 7:
              this.utils.showNotification("The request was deleted");
              this.dataTable.updateArray(this.clientRequests.requestsDetailsArray);

            case 9:
              this.requestSelected = 'table';

            case 10:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11, this);
    }));

    function deleteRequest() {
      return _deleteRequest.apply(this, arguments);
    }

    return deleteRequest;
  }()
  /*****************************************************************************************************
      * Save the request 
      ****************************************************************************************************/
  ;

  _proto.save =
  /*#__PURE__*/
  function () {
    var _save = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
      var email, serverResponse;
      return regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              if (!this.validation.validate(1)) {
                _context12.next = 8;
                break;
              }

              if (!this._buildRequest()) {
                _context12.next = 8;
                break;
              }

              this.clientRequests.setSelectedRequest(this.requestToSave);
              email = this._buildEmailObject();
              _context12.next = 6;
              return this.clientRequests.assignRequest(this.editIndex, email);

            case 6:
              serverResponse = _context12.sent;

              if (!serverResponse.status) {
                this.utils.showNotification("The request was updated");
                this.dataTable.updateArrayMaintainFilters(this.clientRequests.requestsDetailsArray);
                this.reSort(); // await this.filterInAssigned();

                this._cleanUp();
              }

            case 8:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12, this);
    }));

    function save() {
      return _save.apply(this, arguments);
    }

    return save;
  }();

  _proto._buildEmailObject = function _buildEmailObject() {
    var mailObject = {};
    if (!this.sendEmail) return mailObject;
    var date = new Date(this.selectedRequestDetail.requiredDate);
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (this.selectedRequestDetail.requestStatus !== this.config.PROVISIONAL_REQUEST_CODE) {
      mailObject.reason = 2;
      mailObject.email = this.selectedRequestDetail.requestId.personId.email;
      mailObject.subject = "Your product request has been assigned";
      mailObject.MESSAGE = this.config.CLIENT_REQUEST_ASSIGNED_MESSAGE.replace('[CUSTOMER]', this.selectedRequestDetail.requestId.personId.fullName).replace('[SESSION]', this.sessions.selectedSession.session).replace('[PRODUCT]', this.selectedRequestDetail.productId.name).replace('[COURSE_NAME]', this.selectedRequestDetail.requestId.courseId.name).replace('[COURSE_NUMBER]', this.selectedRequestDetail.requestId.courseId.number);
      mailObject.cc = this.config.PRODUCT_REQUESTS_EMAIL_LIST ? this.config.PRODUCT_REQUESTS_EMAIL_LIST : "";
    }

    return mailObject;
  }
  /*****************************************************************************************************
  * Build the data objects to send to the server 
  ****************************************************************************************************/
  ;

  _proto._buildRequest = function _buildRequest() {
    var _this8 = this;

    this.productSystems.forEach(function (system) {
      system.clients.forEach(function (client) {
        client.assignments.forEach(function (assignment) {
          assignment.provisional = false;
        });
      });
    });
    this.systemQueue = new Array();
    this.selectedRequestDetail.assignments.forEach(function (item, index) {
      var saveSystem = true;

      _this8.systemQueue.forEach(function (system) {
        if (item.systemId === system._id) saveSystem = false;
      });

      if (saveSystem) _this8.systemQueue.push(_this8._getSystem(item.systemId));
      delete item['provisional'];
      item.assignedDate = item.assignedDate ? item.assignedDate : new Date();
    });
    this.systemQueue.forEach(function (server) {
      server.clients.forEach(function (client) {
        client.assignments.forEach(function (assignment) {
          assignment.assignment = assignment.assignment != null && assignment.assignment._id ? assignment.assignment._id : assignment.assignment;
        });
      });
    });
    this.selectedRequestDetail.idsAssigned = parseInt(this.totalIdsAssigned);
    this.selectedRequestDetail.requestStatus = this.selectedRequestDetail.assignments && this.selectedRequestDetail.assignments.length > 0 ? this.config.ASSIGNED_REQUEST_CODE : this.config.UNASSIGNED_REQUEST_CODE; // this.selectedRequestDetail.requestStatus = this.config.ASSIGNED_REQUEST_CODE;

    this.requestToSave = this.utils.copyObject(this.selectedRequestDetail.requestId); // this.requestToSave.audit.push({
    //    property: 'Assigned',
    //    newValue: JSON.stringify(this.selectedRequestDetail.assignments),
    //    oldValue: this.selectedRequestDetail.productId.name,
    //    eventDate: new  Date(),
    //    personId: this.userObj.fullName
    // })

    this.requestToSave.requestDetailsToSave = new Array();
    var request = this.utils.copyObject(this.selectedRequestDetail);
    delete request['requestId'];
    this.requestToSave.requestDetailsToSave.push(request);
    this.requestToSave.systemsToSave = this.systemQueue;
    return true;
  };

  _proto._getSystem = function _getSystem(id) {
    for (var k = 0; k < this.productSystems.length; k++) {
      if (this.productSystems[k]._id === id) return this.productSystems[k];
    }

    return null;
  } // buildSystemToSave(client){
  //     let system = this.originalProductSystems[this.selectedSystemIndex].clients[this.selectedClientIndex] = this.utils.copyObject(client);
  //     return system;
  // }
  ;

  _proto.updateProductSystemsClient = function updateProductSystemsClient(client) {
    this.selectedSystem.clients[this.selectedClientIndex].assignments = client.assignments;
    this.clientSelectedIndex = client.assignments.length - 1;
  };

  _proto.back = function back() {
    var _this9 = this;

    this.clientRequests.setTheSelectedRequestDetail(this.selectedRequestDetail);
    var changes = this.clientRequests.isRequestDetailDirty(this.originalRequestDetail, ['requestId', 'productId', 'techComments']);
    var newAssignment = false;

    if (this.selectedRequestDetail.assignments) {
      this.selectedRequestDetail.assignments.forEach(function (item) {
        if (!item.assignedDate) newAssignment = true;
      });
    }

    if (this.selectedRequestDetail.assignments.length > 0 && (changes.length > 0 || newAssignment)) {
      return this.dialog.showMessage("There is an unsaved assignment. Are you sure you want to leave this page?", "Confirm Back", ['Yes', 'No']).whenClosed(function (response) {
        if (response.wasCancelled) {
          return;
        } else {
          _this9._cleanUp();
        }
      });
    }

    this._cleanUp();
  };

  _proto.viewAssignment = /*#__PURE__*/function () {
    var _viewAssignment = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(index, request) {
      var response;
      return regeneratorRuntime.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              this.editIndex = index; // this.selectedRequestDetail = this.utils.copyObject(request);

              _context13.next = 3;
              return this.clientRequests.getRequestDetail(request._id);

            case 3:
              response = _context13.sent;

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

            case 5:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13, this);
    }));

    function viewAssignment(_x7, _x8) {
      return _viewAssignment.apply(this, arguments);
    }

    return viewAssignment;
  }();

  _proto.backView = function backView() {
    this.requestSelected = 'table';
  };

  _proto.systemSelected = function systemSelected() {
    this.selectProductSystem(this.selectedSystemId);

    if (!this.products.selectedProduct.clientRelevant) {
      this.calcAssignment();
    }
  };

  _proto.selectProductSystem = function selectProductSystem(id) {
    var _this10 = this;

    this.selectedSystemId = id;
    this.productSystems.forEach(function (item, index) {
      if (item._id === id) {
        _this10.selectedSystem = item;
        _this10.selectedSystemIndex = index;
      }
    });
    this.checkClientConfigured();
  };

  _proto.checkClientConfigured = function checkClientConfigured() {
    this.clientsConfigured = false;

    for (var i = 0; i < this.selectedSystem.clients.length; i++) {
      if (this.selectedSystem.clients[i].productId === this.products.selectedProduct._id) {
        this.clientsConfigured = true;
        break;
      }
    }
  };

  _proto.customerActionDialog = /*#__PURE__*/function () {
    var _customerActionDialog = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
      var _this11 = this;

      var subject, email;
      return regeneratorRuntime.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              if (!this.profileRequest) {
                _context14.next = 7;
                break;
              }

              _context14.next = 3;
              return this.clientRequests.getRequest(this.profileRequest.requestId._id);

            case 3:
              this.model = 'header';
              this.hideProfile();
              _context14.next = 9;
              break;

            case 7:
              _context14.next = 9;
              return this.clientRequests.getRequest(this.selectedRequestDetail.requestId._id);

            case 9:
              this.selectedRequestNo = this.clientRequests.selectedRequest.clientRequestNo;
              this.requestId = this.clientRequests.selectedRequest._id;
              this.course = this.clientRequests.selectedRequest.courseId !== null ? this.clientRequests.selectedRequest.courseId.name : this.config.SANDBOX_NAME;
              this.email = this.clientRequests.selectedRequest.personId.email;
              this.personId = this.clientRequests.selectedRequest.personId._id;
              this.emailProducts = this.clientRequests.selectedRequest.requestDetails;
              this.productsSelected = new Array();
              subject = "Question about product request " + this.selectedRequestNo;
              email = {
                emailBody: "",
                emailSubject: subject,
                emailId: this.email,
                products: this.clientRequests.selectedRequest.requestDetails,
                productsSelected: this.productsSelected
              };
              return _context14.abrupt("return", this.dialog.showEmail("Enter Email", email, ['Submit', 'Cancel']).whenClosed(function (response) {
                if (!response.wasCancelled) {
                  _this11.sendTheEmail(response.output);
                } else {
                  console.log("Cancelled");
                }
              }));

            case 19:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14, this);
    }));

    function customerActionDialog() {
      return _customerActionDialog.apply(this, arguments);
    }

    return customerActionDialog;
  }();

  _proto.sendTheEmail = /*#__PURE__*/function () {
    var _sendTheEmail = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(email) {
      var _this12 = this;

      var updateIds, date, day, month, year, response, serverResponse;
      return regeneratorRuntime.wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              if (!email) {
                _context15.next = 24;
                break;
              }

              this.clientRequests.selectedRequest.requestStatus = this.config.CUSTOMER_ACTION_REQUEST_CODE;
              updateIds = new Array();
              this.productsSelected.forEach(function (item) {
                // this.clientRequests.selectedRequest.requestDetails[item.index].audit.push({
                //         property: 'Customer Action',
                //         newValue: this.config.CUSTOMER_ACTION_REQUEST_CODE,
                //         oldValue: item.requestStatus,
                //         eventDate: new  Date(),
                //         personId: this.userObj._id
                //     });
                _this12.clientRequests.selectedRequest.requestDetails[item.index].requestStatus = _this12.config.CUSTOMER_ACTION_REQUEST_CODE;
                updateIds.push(item._id);
              });
              _context15.next = 6;
              return this.filterInAssigned();

            case 6:
              date = new Date(this.requiredDate);
              day = date.getDate();
              month = date.getMonth() + 1;
              year = date.getFullYear();
              this.message = {
                reason: 3,
                personId: this.personId,
                from: this.userObj._id,
                id: this.requestId,
                customerMessage: email.email.emailBody,
                email: email.email.emailId,
                subject: email.email.emailSubject,
                clientRequestNo: this.selectedRequestNo,
                // product: [{name: this.productName, requiredDate: month + "/" + day + "/" + year}],
                session: this.sessions.selectedSession.session + ' ' + this.sessions.selectedSession.year,
                course: this.course,
                requestStatus: this.config.CUSTOMER_ACTION_REQUEST_CODE,
                model: this.model
              }; // this.clientRequests.selectedRequest.audit.push({
              //     property: 'Send Message',
              //     eventDate: new Date(),
              //     newValue: email.email.emailBody,
              //     personId: this.userObj._id
              // });

              this.clientRequests.selectedRequest.customerMessage = email.email.emailBody;
              _context15.next = 14;
              return this.clientRequests.saveRequestWithId();

            case 14:
              response = _context15.sent;

              if (response.error) {
                _context15.next = 24;
                break;
              }

              this.clientRequests.updateStatuses(updateIds, this.config.CUSTOMER_ACTION_REQUEST_CODE);
              this.dataTable.updateArray(this.clientRequests.requestsDetailsArray);
              _context15.next = 20;
              return this.clientRequests.sendCustomerMessage(this.message);

            case 20:
              serverResponse = _context15.sent;

              if (!serverResponse.error) {
                this.utils.showNotification("The message was sent");
              }

              _context15.next = 24;
              return this.filterInAssigned();

            case 24:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15, this);
    }));

    function sendTheEmail(_x9) {
      return _sendTheEmail.apply(this, arguments);
    }

    return sendTheEmail;
  }();

  _proto.showProfile = function showProfile(request, el) {
    this.profileRequest = request;
    $(".hoverProfile").css("top", window.pageYOffset + el.clientY - 175);
    $(".hoverProfile").css("left", el.clientX - 200);
    $(".hoverProfile").css("display", "block");
  };

  _proto.hideProfile = function hideProfile() {
    $(".hoverProfile").css("display", "none");
  };

  _proto.showComment = function showComment(request, el) {
    if (request.requestStatus == this.config.REPLIED_REQUEST_CODE) {
      this.commentShown = request.requestId.comments;
      $(".hover").css("top", el.clientY - 200);
      $(".hover").css("left", el.clientX - 10);
      $(".hover").css("display", "block");
    }
  };

  _proto.hideComment = function hideComment() {
    $(".hover").css("display", "none");
  } // openAudit(){
  //     this.showAudit = !this.showAudit;
  // }
  ;

  _proto.openEditStudentTemplate = function openEditStudentTemplate() {
    this.showAddStudentTemplate = !this.showAddStudentTemplate;
  };

  _proto.openStudentTemplate = function openStudentTemplate() {
    this.showTemplates = !this.showTemplates;
  };

  _proto.cancelEditStudentTemplate = function cancelEditStudentTemplate() {
    this.showAddStudentTemplate = false;
  };

  _proto.saveStudentTemplate = /*#__PURE__*/function () {
    var _saveStudentTemplate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16() {
      return regeneratorRuntime.wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              _context16.next = 2;
              return this.products.saveProduct();

            case 2:
              this.studentIDTemplates = this.products.selectedProduct.defaultStudentIdPrefix.split(":");

              if (this.studentIDTemplates.length > 0 && (!this.selectedAssignedClient || !this.selectedAssignedClient.manual)) {
                this.forceManual = false;
                this.manualMode = false;
              }

              this.showAddStudentTemplate = false;

            case 5:
            case "end":
              return _context16.stop();
          }
        }
      }, _callee16, this);
    }));

    function saveStudentTemplate() {
      return _saveStudentTemplate.apply(this, arguments);
    }

    return saveStudentTemplate;
  }();

  _proto.openSettings = function openSettings() {
    this.showSettings = !this.showSettings;

    if (this.showSettings) {
      this.idSandboxBuffer = localStorage.getItem('idSandboxBuffer') ? localStorage.getItem('idBuffer') : this.config.SANDBOX_ID_BUFFER;
      this.idBuffer = localStorage.getItem('idBuffer') ? localStorage.getItem('idBuffer') : this.config.REGULAR_ID_BUFFER;
      this.sandBoxIDs = localStorage.getItem('sandBoxIDs') ? localStorage.getItem('sandBoxIDs') : this.config.SANDBOX_ID_COUNT;
      this.numFacultyIDs = localStorage.getItem('numFacultyIDs') ? localStorage.getItem('numFacultyIDs') : this.config.DEFAULT_FACULTY_IDS;
    }
  };

  _proto.saveSettings = function saveSettings() {
    localStorage.setItem('idSandboxBuffer', this.idSandboxBuffer);
    localStorage.setItem('idBuffer', this.idBuffer);
    localStorage.setItem('sandBoxIDs', this.sandBoxIDs);
    localStorage.setItem('numFacultyIDs', this.numFacultyIDs);
    this.showSettings = false;
  };

  _proto.restoreDefaults = function restoreDefaults() {
    this.idBuffer = this.config.REGULAR_ID_BUFFER;
    this.sandBoxIDs = this.config.SANDBOX_ID_COUNT;
    localStorage.setItem('idBuffer', this.config.REGULAR_ID_BUFFER);
    localStorage.setItem('sandBoxIDs', this.config.SANDBOX_ID_BUFFER);
    localStorage.setItem('numFacultyIDs', this.config.DEFAULT_FACULTY_IDS);
  };

  _proto.openFacultyDetails = function openFacultyDetails() {
    this.facultyDetails = !this.facultyDetails;
    localStorage.setItem("facultyDetails", this.facultyDetails);
  };

  _proto.changeUnassignedOnly = function changeUnassignedOnly() {
    localStorage.setItem('unassignedOnly', this.unassignedOnly);
  };

  _proto._setUpValidation = function _setUpValidation() {
    this.validation.addRule(1, "errorRange", [{
      "rule": "custom",
      "message": "Invalid ID range",
      "valFunction": function valFunction(context) {
        var valid = true;

        if (context.assignmentDetails) {
          for (var i = 0; i < context.assignmentDetails.length; i++) {
            if (context.assignmentDetails[i].notValid == 'danger') valid = false;
          }
        }

        return valid;
      }
    }]);
  };

  _proto._cleanUp = function _cleanUp() {
    this.firstID = 0;
    this.lastID = 0;
    this.requestSelected = 'table';
    this.customerMessage = false;
    this.selectedRequestDetail.assignments = [];
    this.selectedSystem = {};
  };

  _proto.flag = function flag() {
    var _this13 = this;

    var note = {
      noteBody: "",
      noteCategories: this.userObj.noteCategories,
      selectedCategory: 0
    };
    return this.dialog.showNote("Save Changes", note, ['Submit', 'Cancel']).whenClosed(function (response) {
      if (!response.wasCancelled) {
        _this13.saveNote(response.output);
      } else {
        console.log("Cancelled");
      }
    });
  };

  _proto.saveNote = /*#__PURE__*/function () {
    var _saveNote = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(note) {
      var response;
      return regeneratorRuntime.wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              this.people.selectNote();
              this.people.selectedNote.type = "r";
              this.people.selectedNote.personId = this.userObj._id;
              this.people.selectedNote.category = this.userObj.noteCategories[note.selectedCategory];
              this.people.selectedNote.note = note.note.noteBody;
              this.people.selectedNote.reference = this.selectedRequestDetail._id;
              this.people.selectedNote.referenceNo = this.selectedRequestDetail.requestId.clientRequestNo;
              _context17.next = 9;
              return this.people.saveNote();

            case 9:
              response = _context17.sent;

              if (!response.error) {
                this.utils.showNotification('The note was saved');
              }

            case 11:
            case "end":
              return _context17.stop();
          }
        }
      }, _callee17, this);
    }));

    function saveNote(_x10) {
      return _saveNote.apply(this, arguments);
    }

    return saveNote;
  }();

  _proto.deleteRecipient = function deleteRecipient(index) {
    this.emailArray.splice(index, 1);
  };

  _proto.bulkEmail = function bulkEmail() {
    var _this14 = this;

    this.email = {
      MESSAGE: "",
      INSTRUCTIONS: this.config.HELP_TICKET_INSTRUCTIONS,
      subject: ""
    };
    this.emailArray = new Array();
    this.dataTable.baseArray.forEach(function (item) {
      var keep = true;

      for (var i = 0; i < _this14.emailArray.length; i++) {
        if (!item.requestId || !item.requestId.personId || item.requestId.personId.email === _this14.emailArray[i].email) keep = false;
      }

      if (keep) {
        var systemsAssigned = "Unassigned";

        if (item.assignments && item.assignments.length) {
          systemsAssigned = "";
          item.assignments.forEach(function (item) {
            _this14.systems.selectedSystemFromId(item.systemId);

            systemsAssigned += _this14.systems.selectedSystem.sid + "(" + item.client + ") ";
          });
        }

        _this14.emailArray.push({
          fullName: item.requestId.personId.fullName,
          email: item.requestId.personId.email,
          institution: item.requestId.institutionId.name,
          status: systemsAssigned
        });
      }
    });
    this.requestSelected = 'email';
  };

  _proto.backBulkEmail = function backBulkEmail() {
    this.requestSelected = 'table';
  };

  _proto.sendBulkEmail = function sendBulkEmail() {
    var _this15 = this;

    if (this.email.MESSAGE === "" || this.email.subject === "") {
      this.utils.showNotification("Enter a subject and messsage", 'warning');
      return;
    }

    if (this.emailArray.length === 0) {
      this.utils.showNotification("You must include some recipients", 'warning');
      return;
    }

    return this.dialog.showMessage("Are you sure you want to send the email to these recipients?", "Confirm Send", ['Yes', 'No']).whenClosed(function (response) {
      if (response.wasCancelled) {
        okToProcess = false;
      } else {
        _this15.sendTheBulkEmail();
      }
    });
  };

  _proto.sendTheBulkEmail = function sendTheBulkEmail() {
    var recipients = new Array();
    this.emailArray.forEach(function (item) {
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
    this.requestSelected = 'table';
  };

  _proto.clearFilters = /*#__PURE__*/function () {
    var _clearFilters = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18() {
      return regeneratorRuntime.wrap(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              this.requiredDateFilterValue = "";
              this.createdDateFilterValue = "";
              this.requestStatusFilter = "";
              this.productFilterValue = "";
              this.courseFilterValue = "";
              this.helpTicketTypeFilterValue = "";
              this.institutionFilterValue = "";
              this.dataTable.updateArray(this.clientRequests.requestsDetailsArray); // await this.filterInAssigned();

            case 8:
            case "end":
              return _context18.stop();
          }
        }
      }, _callee18, this);
    }));

    function clearFilters() {
      return _clearFilters.apply(this, arguments);
    }

    return clearFilters;
  }();

  _proto.filterInAssigned = /*#__PURE__*/function () {
    var _filterInAssigned = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19() {
      var _this16 = this;

      return regeneratorRuntime.wrap(function _callee19$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              this.requiredDateFilterValue = "";
              this.createdDateFilterValue = "";
              this.requestStatusFilter = "";
              this.productFilterValue = "";
              this.courseFilterValue = "";
              this.helpTicketTypeFilterValue = "";
              this.institutionFilterValue = "";

              if (!this.isCheckedAssigned) {
                _context19.next = 15;
                break;
              }

              $('#loading').show();
              _context19.next = 11;
              return this.clientRequests.getClientRequestsDetailsArray('?filter=[and]sessionId|eq|' + this.selectedSession + ':requestStatus|in|' + this.config.UNASSIGNED_REQUEST_CODE + '$' + this.config.UPDATED_REQUEST_CODE + '$' + this.config.CUSTOMER_ACTION_REQUEST_CODE, true);

            case 11:
              $('#loading').hide();

              if (this.clientRequests.requestsDetailsArray && this.clientRequests.requestsDetailsArray.length) {
                this.noRequests = false;
                this.clientRequests.requestsDetailsArray.forEach(function (item) {
                  if (item.requestId && item.requestId.courseId === null) item.requestId.courseId = {
                    _id: _this16.config.SANDBOX_ID,
                    name: _this16.config.SANDBOX_NAME
                  };
                });
                this.dataTable.updateArray(this.clientRequests.requestsDetailsArray, 'requiredDate', -1);
              } else {
                this.noRequests = true;
                this.displayArray = new Array();
              }

              _context19.next = 22;
              break;

            case 15:
              $('#loading').show();
              _context19.next = 18;
              return this.clientRequests.getClientRequestsDetailsArray('?filter=sessionId|eq|' + this.selectedSession, true);

            case 18:
              $('#loading').hide();
              this.clientRequests.requestsDetailsArray.forEach(function (item) {
                if (item.requestId && item.requestId.courseId === null) item.requestId.courseId = {
                  _id: _this16.config.SANDBOX_ID,
                  name: _this16.config.SANDBOX_NAME
                };
              });
              this.dataTable.updateArray(this.clientRequests.requestsDetailsArray, 'requiredDate', -1);
              if (this.clientRequests.requestsDetailsArray.length) this.noRequests = false;

            case 22:
            case "end":
              return _context19.stop();
          }
        }
      }, _callee19, this);
    }));

    function filterInAssigned() {
      return _filterInAssigned.apply(this, arguments);
    }

    return filterInAssigned;
  }();

  _proto.changeManualMode = function changeManualMode() {
    localStorage.setItem('manualMode', this.manualMode);
  };

  _proto.customNameFilter = function customNameFilter(value, item, context) {
    return item.requestId && item.requestId.personId.fullName.toUpperCase().indexOf(value.toUpperCase()) > -1;
  };

  _proto.statusCustomFilter = function statusCustomFilter(value, item, context) {
    if (item.requestStatus == context.config.ASSIGNED_REQUEST_CODE || item.requestStatus == context.config.CANCELLED_REQUEST_CODE) return false;
    return true;
  };

  _proto.institutionCustomFilter = function institutionCustomFilter(value, item, context) {
    return item.requestId && item.requestId.institutionId && item.requestId.institutionId.name.toUpperCase().indexOf(value.toUpperCase()) > -1;
  };

  _proto.courseCustomFilter = function courseCustomFilter(value, item, context) {
    return item.requestId && item.requestId.courseId.name.toUpperCase().indexOf(value.toUpperCase()) > -1;
  };

  _proto.customProductNameFilter = function customProductNameFilter(value, item, context) {
    return item.productId.name.toUpperCase().indexOf(value.toUpperCase()) > -1;
  };

  _proto.customCourseSorter = function customCourseSorter(sortProperty, sortDirection, sortArray, context) {
    this.sortProperty = 'course';
    this.sortDirection = sortDirection;
    return sortArray.sort(function (a, b) {
      if (a['requestId'] !== null && b['requestId'] !== null && a['requestId']['courseId']['name'] && b['requestId']['courseId']['name']) {
        var result = a['requestId']['courseId']['name'] < b['requestId']['courseId']['name'] ? -1 : a['requestId']['courseId']['name'] > b['requestId']['courseId']['name'] ? 1 : 0;
      } else {
        var result = -1;
      }

      return result * sortDirection;
    });
  };

  _proto.customInstitutionsSorter = function customInstitutionsSorter(sortProperty, sortDirection, sortArray, context) {
    this.sortProperty = 'institution';
    this.sortDirection = sortDirection;
    return sortArray.sort(function (a, b) {
      if (a['requestId'] !== null && b['requestId'] !== null && a['requestId']['institutionId'] && b['requestId']['institutionId']) {
        var result = a['requestId']['institutionId']['name'] < b['requestId']['institutionId']['name'] ? -1 : a['requestId']['institutionId']['name'] > b['requestId']['institutionId']['name'] ? 1 : 0;
      } else {
        var result = -1;
      }

      return result * sortDirection;
    });
  };

  _proto.customPersonSorter = function customPersonSorter(sortProperty, sortDirection, sortArray, context) {
    this.sortProperty = 'person';
    this.sortDirection = sortDirection;
    return sortArray.sort(function (a, b) {
      if (a['requestId'] !== null && b['requestId'] !== null && a['requestId']['personId']['lastName'] && b['requestId']['personId']['lastName']) {
        var result = a['requestId']['personId']['lastName'] < b['requestId']['personId']['lastName'] ? -1 : a['requestId']['personId']['lastName'] > b['requestId']['personId']['lastName'] ? 1 : 0;
      } else {
        var result = -1;
      }

      return result * sortDirection;
    });
  };

  _proto.customRequestStatusSorter = function customRequestStatusSorter(sortProperty, sortDirection, sortArray, context) {
    this.sortProperty = 'status';
    this.sortDirection = sortDirection;
    return sortArray.sort(function (a, b) {
      var result = a[sortProperty] < b[sortProperty] ? -1 : a[sortProperty] > b[sortProperty] ? 1 : 0;
      return result * sortDirection;
    });
  };

  _proto.reSort = function reSort() {
    this.dataTable.sortArray({}, {}, true);
  };

  _proto.downloadExcel = function downloadExcel() {
    var csvContent = "data:text/csv;charset=utf-8;,Due,Created,IDs,Product,Course,Faculty,Institution";
    csvContent += "\r\n";
    this.dataTable.baseArray.forEach(function (item) {
      var graduateIds = item.requestId.graduateIds === null ? 0 : item.requestId.graduateIds;
      var undergradIds = item.requestId.undergradIds === null ? 0 : item.requestId.undergradIds;
      var ids = parseInt(graduateIds) + parseInt(undergradIds);
      csvContent += item.requiredDate + ',';
      csvContent += item.createdDate + ',';
      csvContent += ids + ',';
      csvContent += item.productId.name + ',';
      csvContent += item.requestId.courseId.name + ',';
      csvContent += item.requestId.personId.fullName + ',';
      csvContent += item.requestId.institutionId.name + ',';
      csvContent += "\r\n";
    });
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "requestsArchive.csv");
    document.body.appendChild(link);
    link.click();
  };

  return Assignments;
}()) || _class);

/***/ }),

/***/ "modules/tech/requests/archiveClientRequests.html":
/*!**************************************************************!*\
  !*** ./src/modules/tech/requests/archiveClientRequests.html ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t<div class=\"panel panel-default rightMargin leftMargin\">\r\n      <div class=\"panel-body\">\r\n        <div class=\"row\">\r\n            <div show.bind=\"!requestSelected\">\r\n                <compose view=\"./components/ArchiveRequestsTable.html\"></compose>\r\n            </div> \r\n            <div show.bind=\"requestSelected\" >\r\n                <compose view=\"./components/ArchiveRequestsForm.html\"></compose>\r\n            </div>\r\n        </div> \r\n      </div> \r\n\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/tech/requests/assignments.html":
/*!****************************************************!*\
  !*** ./src/modules/tech/requests/assignments.html ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <span id=\"loading\">\r\n        <ul class=\"bokeh\">\r\n            <li></li>\r\n            <li></li>\r\n            <li></li>\r\n        </ul>\r\n    </span>\r\n    <!--\r\n    <div show.bind=\"dataTable.displayArray && dataTable.displayArray.length || initialLoaded\" class=\"panel panel-default rightMargin leftMargin\">\r\n        <div class=\"panel-body\">\r\n            <div class=\"row\">\r\n            -->\r\n                <div show.bind=\"requestSelected == 'table'\">\r\n                    <compose view=\"./components/viewRequestsTable.html\"></compose>\r\n                </div>\r\n                <div show.bind=\"requestSelected == 'form'\">\r\n                    <compose view=\"./components/viewRequestsForm.html\"></compose>\r\n                </div>\r\n                <div show.bind=\"requestSelected == 'edit'\">\r\n                    <compose view=\"./components/editRequestsForm.html\"></compose>\r\n                </div>\r\n                <div show.bind=\"requestSelected == 'view'\">\r\n                    <compose view=\"./components/viewAssignmentForm.html\"></compose>\r\n                </div>\r\n                <div show.bind=\"requestSelected == 'email'\">\r\n                    <compose view=\"./components/bulkEmailForm.html\"></compose>\r\n                </div>\r\n                <!--\r\n            </div>\r\n        </div>\r\n    -->\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ })

}]);
//# sourceMappingURL=app-99af21d7.c2f6f034a062b3d7f766.bundle.js.map