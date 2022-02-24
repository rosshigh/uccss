"use strict";
(self["webpackChunkclient"] = self["webpackChunkclient"] || []).push([["app-92bcf446"],{

/***/ "modules/facco/viewAssignments":
/*!**********************************************!*\
  !*** ./src/modules/facco/viewAssignments.js ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ViewAssignments": function() { return /* binding */ ViewAssignments; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../resources/utils/dataTable */ 6847);
/* harmony import */ var _resources_data_sessions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../resources/data/sessions */ 2073);
/* harmony import */ var _resources_data_systems__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../resources/data/systems */ 4077);
/* harmony import */ var _resources_data_products__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../resources/data/products */ 8666);
/* harmony import */ var _resources_data_clientRequests__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../resources/data/clientRequests */ 5446);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
/* harmony import */ var _resources_utils_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../resources/utils/utils */ 8741);
/* harmony import */ var _resources_data_people__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../resources/data/people */ 353);
var _dec, _class;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }










var ViewAssignments = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_config_appConfig__WEBPACK_IMPORTED_MODULE_6__.AppConfig, _resources_data_people__WEBPACK_IMPORTED_MODULE_8__.People, _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_1__.DataTable, _resources_utils_utils__WEBPACK_IMPORTED_MODULE_7__.Utils, _resources_data_sessions__WEBPACK_IMPORTED_MODULE_2__.Sessions, _resources_data_products__WEBPACK_IMPORTED_MODULE_4__.Products, _resources_data_systems__WEBPACK_IMPORTED_MODULE_3__.Systems, _resources_data_clientRequests__WEBPACK_IMPORTED_MODULE_5__.ClientRequests), _dec(_class = /*#__PURE__*/function () {
  function ViewAssignments(config, people, datatable, utils, sessions, products, systems, requests) {
    this.spinnerHTML = "";
    this.config = config;
    this.people = people;
    this.dataTable = datatable;
    this.dataTable.initialize(this);
    this.utils = utils;
    this.sessions = sessions;
    this.products = products;
    this.requests = requests;
    this.systems = systems;
  }

  var _proto = ViewAssignments.prototype;

  _proto.attached = function attached() {
    $('[data-toggle="tooltip"]').tooltip();
  };

  _proto.canActivate = function canActivate() {
    this.userObj = JSON.parse(sessionStorage.getItem('user'));
  };

  _proto.activate = /*#__PURE__*/function () {
    var _activate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var responses;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return Promise.all([this.sessions.getSessionsArray('?order=startDate:DSC', true), this.people.getInstitutionPeople('?filter=institutionId|eq|' + this.userObj.institutionId._id + '&order=lastName'), this.products.getProductsArray('?filter=active|eq|true&order=name'), this.systems.getSystemsArray(), this.config.getConfig()]);

            case 2:
              responses = _context.sent;

            case 3:
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

  _proto.getAssignments = /*#__PURE__*/function () {
    var _getAssignments = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!this.selectedSession) {
                _context2.next = 8;
                break;
              }

              this.sessions.selectSessionById(this.selectedSession);
              _context2.next = 4;
              return this.requests.getClientRequestsDetailFaccoArray(this.selectedSession, this.userObj.institutionId._id, true);

            case 4:
              this.getAssignmentsArray();
              this.dataTable.updateArray(this.assignmentsArray);
              _context2.next = 9;
              break;

            case 8:
              this.dataTable.updateArray([]);

            case 9:
              this.clearFilters();

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function getAssignments() {
      return _getAssignments.apply(this, arguments);
    }

    return getAssignments;
  }();

  _proto.getAssignmentsArray = function getAssignmentsArray() {
    var _this = this;

    this.assignmentsArray = [];
    this.requests.requestsDetailsArray.forEach(function (item) {
      if (item.assignments) {
        item.assignments.forEach(function (assign) {
          _this.assignmentsArray.push({
            person: item.requestId.personId.fullName,
            lastName: item.requestId.personId.lastName,
            product: item.productId.name,
            dateRequested: item.createdDate,
            dateRequired: item.requiredDate,
            dateAssigned: assign.assignedDate,
            systemId: assign.systemId,
            client: assign.client,
            studentUserIds: assign.studentUserIds,
            facultyUserIds: assign.facultyUserIds,
            studentPasswords: assign.studentPassword,
            facultyPasswords: assign.facultyPassword,
            course: item.requestId.courseId !== null ? item.requestId.courseId.number : _this.config.SANDBOX_NAME
          });
        });
      }
    });
  };

  _proto.refresh = /*#__PURE__*/function () {
    var _refresh = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
              _context3.next = 3;
              return this.getAssignments();

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

  _proto.clearFilters = function clearFilters() {
    this.productFilterValue = "";
    this.helpTicketTypeFilterValue = "";
  };

  _proto.courseCustomFilter = function courseCustomFilter(value, item, context) {
    if (value == 'Regular' && item.requestId.courseId != context.config.SANDBOX_ID) return true;
    if (value == context.config.SANDBOX_ID && item.requestId.courseId == context.config.SANDBOX_ID) return true;
    return false;
  };

  _proto.nameCustomFilter = function nameCustomFilter(value, item, context) {
    for (var i = 0; i < context.people.instutionPeopleArray.length; i++) {
      if (item.requestId.personId == context.people.instutionPeopleArray[i]._id) {
        return context.people.instutionPeopleArray[i].fullName.toUpperCase().indexOf(value.toUpperCase()) > -1;
      }
    }

    return false;
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

  _proto.customNameFilter = function customNameFilter(value, item, context) {
    return item.person.toUpperCase().indexOf(value.toUpperCase()) > -1;
  };

  _proto.customProductNameFilter = function customProductNameFilter(value, item, context) {
    return item.product.toUpperCase().indexOf(value.toUpperCase()) > -1;
  };

  return ViewAssignments;
}()) || _class);

/***/ }),

/***/ "modules/facco/viewRequests":
/*!*******************************************!*\
  !*** ./src/modules/facco/viewRequests.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ViewRequests": function() { return /* binding */ ViewRequests; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../resources/utils/dataTable */ 6847);
/* harmony import */ var _resources_data_sessions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../resources/data/sessions */ 2073);
/* harmony import */ var _resources_data_systems__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../resources/data/systems */ 4077);
/* harmony import */ var _resources_data_products__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../resources/data/products */ 8666);
/* harmony import */ var _resources_data_clientRequests__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../resources/data/clientRequests */ 5446);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
/* harmony import */ var _resources_utils_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../resources/utils/utils */ 8741);
/* harmony import */ var _resources_data_people__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../resources/data/people */ 353);
var _dec, _class;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }










var ViewRequests = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_config_appConfig__WEBPACK_IMPORTED_MODULE_6__.AppConfig, _resources_data_people__WEBPACK_IMPORTED_MODULE_8__.People, _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_1__.DataTable, _resources_utils_utils__WEBPACK_IMPORTED_MODULE_7__.Utils, _resources_data_sessions__WEBPACK_IMPORTED_MODULE_2__.Sessions, _resources_data_products__WEBPACK_IMPORTED_MODULE_4__.Products, _resources_data_systems__WEBPACK_IMPORTED_MODULE_3__.Systems, _resources_data_clientRequests__WEBPACK_IMPORTED_MODULE_5__.ClientRequests), _dec(_class = /*#__PURE__*/function () {
  function ViewRequests(config, people, datatable, utils, sessions, products, systems, requests) {
    this.spinnerHTML = "";
    this.config = config;
    this.people = people;
    this.dataTable = datatable;
    this.dataTable.initialize(this);
    this.utils = utils;
    this.sessions = sessions;
    this.products = products;
    this.requests = requests;
    this.systems = systems;
  }

  var _proto = ViewRequests.prototype;

  _proto.attached = function attached() {
    $('[data-toggle="tooltip"]').tooltip();
  };

  _proto.canActivate = function canActivate() {
    this.userObj = JSON.parse(sessionStorage.getItem('user'));
  };

  _proto.activate = /*#__PURE__*/function () {
    var _activate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var responses;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return Promise.all([this.sessions.getSessionsArray('?order=startDate:DSC', true), this.people.getInstitutionPeople('?filter=institutionId|eq|' + this.userObj.institutionId._id + '&order=lastName'), this.products.getProductsArray('?filter=active|eq|true&order=name'), this.systems.getSystemsArray(), this.config.getConfig()]);

            case 2:
              responses = _context.sent;

            case 3:
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
                _context2.next = 8;
                break;
              }

              this.sessions.selectSessionById(this.selectedSession);
              _context2.next = 4;
              return this.requests.getClientRequestsDetailFaccoArray(this.selectedSession, this.userObj.institutionId._id, true);

            case 4:
              this.requests.requestsDetailsArray.forEach(function (item) {
                item.course = item.requestId.courseId !== null ? item.requestId.courseId.number : _this.config.SANDBOX_NAME;
              });
              this.dataTable.updateArray(this.requests.requestsDetailsArray);
              _context2.next = 9;
              break;

            case 8:
              this.dataTable.updateArray([]);

            case 9:
              this.clearFilters();

            case 10:
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

  _proto.clearFilters = function clearFilters() {
    this.courseFilter = "";
    this.requestStatusFilter = "";
    this.productFilterValue = "";
    this.helpTicketTypeFilterValue = "";
  };

  _proto.courseCustomFilter = function courseCustomFilter(value, item, context) {
    if (value == 'Regular' && item.requestId.courseId != context.config.SANDBOX_ID) return true;
    if (value == context.config.SANDBOX_ID && item.requestId.courseId == context.config.SANDBOX_ID) return true;
    return false;
  };

  _proto.nameCustomFilter = function nameCustomFilter(value, item, context) {
    for (var i = 0; i < context.people.instutionPeopleArray.length; i++) {
      if (item.requestId.personId == context.people.instutionPeopleArray[i]._id) {
        return context.people.instutionPeopleArray[i].fullName.toUpperCase().indexOf(value.toUpperCase()) > -1;
      }
    }

    return false;
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

  _proto.customNameFilter = function customNameFilter(value, item, context) {
    return item.requestId && item.requestId.personId.fullName.toUpperCase().indexOf(value.toUpperCase()) > -1;
  };

  _proto.customProductNameFilter = function customProductNameFilter(value, item, context) {
    return item.productId.name.toUpperCase().indexOf(value.toUpperCase()) > -1;
  };

  return ViewRequests;
}()) || _class);

/***/ }),

/***/ "modules/facco/viewAssignments.html":
/*!************************************************!*\
  !*** ./src/modules/facco/viewAssignments.html ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t<div class=\"panel panel-default rightMargin leftMargin\">\r\n\t\t<div class=\"panel-body\">\r\n\t\t\t\t<compose view=\"./components/viewAssignmentsTable.html\"></compose>\r\n\t\t</div> <!-- Panel Body -->\r\n\t</div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/facco/viewRequests.html":
/*!*********************************************!*\
  !*** ./src/modules/facco/viewRequests.html ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n   <div class=\"panel panel-default rightMargin leftMargin\">\r\n    <div class=\"panel-body\">\r\n            <compose view=\"./components/viewRequestsTable.html\"></compose>\r\n    </div> <!-- Panel Body -->\r\n   </div>\r\n</template>\r\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ })

}]);
//# sourceMappingURL=app-92bcf446.c2f6f034a062b3d7f766.bundle.js.map