"use strict";
(self["webpackChunkclient"] = self["webpackChunkclient"] || []).push([["app-6ac23984"],{

/***/ 5446:
/*!**********************************************!*\
  !*** ./src/resources/data/clientRequests.js ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClientRequests": function() { return /* binding */ ClientRequests; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _dataServices__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dataServices */ 5086);
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/utils */ 8741);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
var _dec, _class;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }





var ClientRequests = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_dataServices__WEBPACK_IMPORTED_MODULE_1__.DataServices, _utils_utils__WEBPACK_IMPORTED_MODULE_2__.Utils, _config_appConfig__WEBPACK_IMPORTED_MODULE_3__.AppConfig), _dec(_class = /*#__PURE__*/function () {
  function ClientRequests(data, utils, config) {
    this.CLIENT_REQUESTS_SERVICES = 'clientRequests';
    this.CLIENT_REQUEST_DETAILS = 'clientRequestsDetails';
    this.CLIENT_REQUEST_LOCK_SERVICES = 'clientRequestLocks';
    this.CUSTOMER_ACTION = 'clientRequests/customerAction';
    this.CLIENT_REQUEST_EMAIL = "clientRequests/sendMail";
    this.data = data;
    this.utils = utils;
    this.config = config;
  }

  var _proto = ClientRequests.prototype;

  _proto.getClientRequestsArray = /*#__PURE__*/function () {
    var _getClientRequestsArray = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(options, refresh) {
      var url, serverResponse;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(!this.requestsArray || refresh)) {
                _context.next = 13;
                break;
              }

              url = this.CLIENT_REQUESTS_SERVICES;
              url += options ? options : "";
              _context.prev = 3;
              _context.next = 6;
              return this.data.get(url);

            case 6:
              serverResponse = _context.sent;

              if (!serverResponse.error) {
                this.requestsArray = serverResponse;
              } else {
                this.data.processError(serverResponse);
              }

              _context.next = 13;
              break;

            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](3);
              console.log(_context.t0);

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[3, 10]]);
    }));

    function getClientRequestsArray(_x, _x2) {
      return _getClientRequestsArray.apply(this, arguments);
    }

    return getClientRequestsArray;
  }();

  _proto.getActiveClientRequestsArray = /*#__PURE__*/function () {
    var _getActiveClientRequestsArray = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(personId, sessions) {
      var url, serverResponse;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              url = this.CLIENT_REQUESTS_SERVICES;
              url += "/" + personId + "/" + sessions;
              _context2.prev = 2;
              _context2.next = 5;
              return this.data.get(url);

            case 5:
              serverResponse = _context2.sent;

              if (!serverResponse.error) {
                this.requestsArray = serverResponse;
              } else {
                this.requestsArray = new Array();
              }

              _context2.next = 12;
              break;

            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2["catch"](2);
              console.log(_context2.t0);

            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this, [[2, 9]]);
    }));

    function getActiveClientRequestsArray(_x3, _x4) {
      return _getActiveClientRequestsArray.apply(this, arguments);
    }

    return getActiveClientRequestsArray;
  }();

  _proto.getRequest = /*#__PURE__*/function () {
    var _getRequest = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id) {
      var serverResponse;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return this.data.get(this.CLIENT_REQUESTS_SERVICES + "/" + id);

            case 3:
              serverResponse = _context3.sent;

              if (!serverResponse.error) {
                this.selectedRequest = serverResponse;
              } else {
                this.selectedRequest = null;
              }

              _context3.next = 10;
              break;

            case 7:
              _context3.prev = 7;
              _context3.t0 = _context3["catch"](0);
              console.log(_context3.t0);

            case 10:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this, [[0, 7]]);
    }));

    function getRequest(_x5) {
      return _getRequest.apply(this, arguments);
    }

    return getRequest;
  }();

  _proto.selectRequest = function selectRequest(index) {
    if (index === undefined) {
      this.selectedRequest = this.emptyRequest();
    } else {
      try {
        this.selectedRequest = this.utils.copyObject(this.requestsArray[index]);
        this.editRequestIndex = index;
      } catch (error) {
        console.log(error);
        this.selectedRequest = this.emptyRequest();
      }
    }
  };

  _proto.selectRequstById = function selectRequstById(id) {
    this.selectedRequest = null;

    for (var i = 0; i < this.requestsArray.length; i++) {
      if (this.requestsArray[i]._id === id) {
        this.selectedRequest = this.utils.copyObject(this.requestsArray[i]);
        this.editRequestIndex = i;
        break;
      }
    }
  };

  _proto.setSelectedRequest = function setSelectedRequest(request) {
    this.selectedRequest = this.utils.copyObject(request);
  };

  _proto.emptyRequest = function emptyRequest() {
    var newObj = new Object();
    ;
    newObj.requestStatus = this.config.UNASSIGNED_REQUEST_CODE;
    newObj.undergradIds = 0;
    newObj.graduateIds = 0;
    newObj.startDate = "";
    newObj.endDate = "";
    newObj.addUndergraduates = 0;
    newObj.addGraduates = 0;
    newObj.comments = "";
    newObj.requestDetails = new Array();
    newObj.audit = new Array();
    newObj.audit.push({
      event: 'Created',
      eventDate: new Date(),
      personId: ""
    });
    return newObj;
  };

  _proto.getCurrentCount = /*#__PURE__*/function () {
    var _getCurrentCount = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(options) {
      var url, response;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              url = this.CLIENT_REQUESTS_SERVICES + '/current/count';
              url += options ? options : "";
              _context4.next = 4;
              return this.data.get(url);

            case 4:
              response = _context4.sent;

              if (response.error) {
                _context4.next = 12;
                break;
              }

              this.unassignedRequests = this.utils.countItems(this.config.UNASSIGNED_REQUEST_CODE, 'requestStatus', response);
              this.updatedRequests = this.utils.countItems(this.config.UPDATED_REQUEST_CODE, 'requestStatus', response);
              this.customerActionRequests = this.utils.countItems(this.config.CUSTOMER_ACTION_REQUEST_CODE, 'requestStatus', response);
              return _context4.abrupt("return", response.count);

            case 12:
              return _context4.abrupt("return", null);

            case 13:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function getCurrentCount(_x6) {
      return _getCurrentCount.apply(this, arguments);
    }

    return getCurrentCount;
  }();

  _proto.getClientRequestsDetailsArray = /*#__PURE__*/function () {
    var _getClientRequestsDetailsArray = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(options, refresh) {
      var url, serverResponse;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (!(!this.requestsArray || refresh)) {
                _context5.next = 13;
                break;
              }

              url = this.CLIENT_REQUEST_DETAILS;
              url += options ? options : "";
              _context5.prev = 3;
              _context5.next = 6;
              return this.data.get(url);

            case 6:
              serverResponse = _context5.sent;

              if (!serverResponse.error) {
                this.requestsDetailsArray = serverResponse;
              }

              _context5.next = 13;
              break;

            case 10:
              _context5.prev = 10;
              _context5.t0 = _context5["catch"](3);
              console.log(_context5.t0);

            case 13:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this, [[3, 10]]);
    }));

    function getClientRequestsDetailsArray(_x7, _x8) {
      return _getClientRequestsDetailsArray.apply(this, arguments);
    }

    return getClientRequestsDetailsArray;
  }();

  _proto.getClientRequestsDetailsArrayAnalytics = /*#__PURE__*/function () {
    var _getClientRequestsDetailsArrayAnalytics = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(options, refresh) {
      var url, serverResponse;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (!(!this.requestsArray || refresh)) {
                _context6.next = 13;
                break;
              }

              url = this.CLIENT_REQUEST_DETAILS + "/analytics";
              url += options ? options : "";
              _context6.prev = 3;
              _context6.next = 6;
              return this.data.get(url);

            case 6:
              serverResponse = _context6.sent;

              if (!serverResponse.error) {
                this.requestsDetailsArrayAnalytics = serverResponse;
              }

              _context6.next = 13;
              break;

            case 10:
              _context6.prev = 10;
              _context6.t0 = _context6["catch"](3);
              console.log(_context6.t0);

            case 13:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this, [[3, 10]]);
    }));

    function getClientRequestsDetailsArrayAnalytics(_x9, _x10) {
      return _getClientRequestsDetailsArrayAnalytics.apply(this, arguments);
    }

    return getClientRequestsDetailsArrayAnalytics;
  }();

  _proto.getClientRequestsDetailFaccoArray = /*#__PURE__*/function () {
    var _getClientRequestsDetailFaccoArray = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(sessionId, institutionId, refresh) {
      var serverResponse;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              if (!(!this.requestsDetailsArray || !this.requestsDetailsArray.length || refresh)) {
                _context7.next = 9;
                break;
              }

              _context7.next = 3;
              return this.data.get(this.CLIENT_REQUEST_DETAILS + '/' + sessionId + '/' + institutionId);

            case 3:
              serverResponse = _context7.sent;

              if (serverResponse.error) {
                _context7.next = 8;
                break;
              }

              this.requestsDetailsArray = serverResponse;
              _context7.next = 9;
              break;

            case 8:
              return _context7.abrupt("return", undefined);

            case 9:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function getClientRequestsDetailFaccoArray(_x11, _x12, _x13) {
      return _getClientRequestsDetailFaccoArray.apply(this, arguments);
    }

    return getClientRequestsDetailFaccoArray;
  }();

  _proto.saveRequestWithId = /*#__PURE__*/function () {
    var _saveRequestWithId = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
      var serverResponse;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              if (this.selectedRequest) {
                _context8.next = 2;
                break;
              }

              return _context8.abrupt("return");

            case 2:
              _context8.next = 4;
              return this.data.saveObject(this.selectedRequest, this.CLIENT_REQUESTS_SERVICES + "/" + this.selectedRequest._id, "put");

            case 4:
              serverResponse = _context8.sent;

              if (!serverResponse.error) {
                if (this.requestsArray && this.editRequestIndex) {
                  this.requestsArray[this.editRequestIndex] = this.utils.copyObject(this.selectedRequest);
                }
              }

              return _context8.abrupt("return", serverResponse);

            case 7:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    function saveRequestWithId() {
      return _saveRequestWithId.apply(this, arguments);
    }

    return saveRequestWithId;
  }();

  _proto.saveRequest = /*#__PURE__*/function () {
    var _saveRequest = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(email) {
      var url, _serverResponse, serverResponse;

      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              if (this.selectedRequest) {
                _context9.next = 2;
                break;
              }

              return _context9.abrupt("return");

            case 2:
              url = this.CLIENT_REQUESTS_SERVICES;

              if (this.selectedRequest._id) {
                _context9.next = 11;
                break;
              }

              _context9.next = 6;
              return this.data.saveObject(this.selectedRequest, url, "post");

            case 6:
              _serverResponse = _context9.sent;

              if (!_serverResponse.error) {
                if (email.email) {
                  email.clientRequestNo = _serverResponse.clientRequestNo;
                  email.reason = 1;
                  this.data.saveObject(email, this.CLIENT_REQUEST_EMAIL, "post");
                }

                if (this.requestsArray) {
                  this.requestsArray.push(this.selectedRequest);
                }
              }

              return _context9.abrupt("return", _serverResponse);

            case 11:
              _context9.next = 13;
              return this.data.saveObject(this.selectedRequest, url, "put");

            case 13:
              serverResponse = _context9.sent;

              if (!serverResponse.error) {
                if (email.email) {
                  email.requestNo = this.selectedRequest.requestNo;
                  email.reason = 2;
                  this.data.saveObject(email, this.CLIENT_REQUEST_EMAIL, "post");
                }

                if (this.requestsArray && this.editRequestIndex) {
                  this.requestsArray[this.editRequestIndex] = this.utils.copyObject(this.selectedRequest);
                }
              }

              return _context9.abrupt("return", serverResponse);

            case 16:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, this);
    }));

    function saveRequest(_x14) {
      return _saveRequest.apply(this, arguments);
    }

    return saveRequest;
  }();

  _proto.deleteAssignment = /*#__PURE__*/function () {
    var _deleteAssignment = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(index) {
      var url, serverResponse;
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              if (this.selectedRequest) {
                _context10.next = 2;
                break;
              }

              return _context10.abrupt("return");

            case 2:
              url = this.CLIENT_REQUESTS_SERVICES + "/deleteAssignment";
              _context10.next = 5;
              return this.data.saveObject(this.selectedRequest, url, "put");

            case 5:
              serverResponse = _context10.sent;

              if (!serverResponse.error) {
                this.selectedRequestDetail = serverResponse;

                if (!this.selectedRequestDetail.requestId.courseId || this.selectedRequestDetail.requestId.courseId === null) {
                  this.selectedRequestDetail.requestId.courseId = {
                    _id: this.config.SANDBOX_ID,
                    name: this.config.SANDBOX_NAME
                  };
                }

                this.requestsDetailsArray[index] = this.utils.copyObject(this.selectedRequestDetail);
              }

              return _context10.abrupt("return", serverResponse);

            case 8:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, this);
    }));

    function deleteAssignment(_x15) {
      return _deleteAssignment.apply(this, arguments);
    }

    return deleteAssignment;
  }();

  _proto.updateStatuses = function updateStatuses(updateIds, status) {
    for (var i = 0; i < this.requestsDetailsArray.length; i++) {
      if (updateIds.indexOf(this.requestsDetailsArray[i]._id) > -1) {
        this.requestsDetailsArray[i].requestStatus = status;
        this.requestsDetailsArray[i].requestId.requestStatus = status;
      }
    }
  };

  _proto.assignRequest = /*#__PURE__*/function () {
    var _assignRequest = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(index, email) {
      var url, serverResponse;
      return regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              if (this.selectedRequest) {
                _context11.next = 2;
                break;
              }

              return _context11.abrupt("return");

            case 2:
              url = email ? this.CLIENT_REQUESTS_SERVICES + '/assign/?email=1' : this.CLIENT_REQUESTS_SERVICES + '/assign';
              _context11.next = 5;
              return this.data.saveObject(this.selectedRequest, url, "put");

            case 5:
              serverResponse = _context11.sent;

              if (!serverResponse.error) {
                if (email && email.email) {
                  this.data.saveObject(email, this.CLIENT_REQUEST_EMAIL, "post");
                }

                this.selectedRequestDetail = serverResponse;

                if (!this.selectedRequestDetail.requestId.courseId || this.selectedRequestDetail.requestId.courseId === null) {
                  this.selectedRequestDetail.requestId.courseId = {
                    _id: this.config.SANDBOX_ID,
                    name: this.config.SANDBOX_NAME
                  };
                }

                this.requestsDetailsArray[index] = this.utils.copyObject(this.selectedRequestDetail);
              }

              return _context11.abrupt("return", serverResponse);

            case 8:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11, this);
    }));

    function assignRequest(_x16, _x17) {
      return _assignRequest.apply(this, arguments);
    }

    return assignRequest;
  }();

  _proto.deleteRequest = /*#__PURE__*/function () {
    var _deleteRequest = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
      var serverResponse, _serverResponse2;

      return regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              if (this.selectedRequestDetail._id) {
                _context12.next = 2;
                break;
              }

              return _context12.abrupt("return");

            case 2:
              if (!this.selectedRequestDetail.requestId) {
                _context12.next = 14;
                break;
              }

              _context12.next = 5;
              return this.data.deleteObject(this.CLIENT_REQUEST_DETAILS + '/' + this.selectedRequestDetail._id + '/' + this.selectedRequestDetail.requestId._id);

            case 5:
              serverResponse = _context12.sent;

              if (serverResponse.error) {
                _context12.next = 11;
                break;
              }

              this.requestsDetailsArray.splice(this.requestDetailIndex, 1);
              return _context12.abrupt("return", serverResponse);

            case 11:
              return _context12.abrupt("return", undefined);

            case 12:
              _context12.next = 23;
              break;

            case 14:
              _context12.next = 16;
              return this.data.deleteObject(this.CLIENT_REQUEST_DETAILS + '/' + this.selectedRequestDetail._id);

            case 16:
              _serverResponse2 = _context12.sent;

              if (_serverResponse2.error) {
                _context12.next = 22;
                break;
              }

              this.requestsDetailsArray.splice(this.requestDetailIndex, 1);
              return _context12.abrupt("return", _serverResponse2);

            case 22:
              return _context12.abrupt("return", undefined);

            case 23:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12, this);
    }));

    function deleteRequest() {
      return _deleteRequest.apply(this, arguments);
    }

    return deleteRequest;
  }();

  _proto.isRequestDirty = function isRequestDirty(obj, skip) {
    if (this.selectedRequest) {
      if (!obj) {
        var obj = this.emptyRequest();
      }

      if (!skip) skip = new Array();
      skip.push('audit');
      return this.utils.objectsEqual(this.selectedRequest, obj, skip);
    }

    return new Array();
  };

  _proto.selectRequestDetail = function selectRequestDetail(index) {
    if (index === undefined || index > this.requestsDetailsArray.length - 1) {
      this.emptyRequestDetail();
    } else {
      this.selectedRequestDetail = this.requestsDetailsArray[index];
      this.requestDetailIndex = index;
    }

    return this.selectedRequestDetail;
  };

  _proto.getRequestDetail = /*#__PURE__*/function () {
    var _getRequestDetail = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(id) {
      var serverResponse;
      return regeneratorRuntime.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _context13.next = 2;
              return this.data.get(this.CLIENT_REQUEST_DETAILS + "/" + id);

            case 2:
              serverResponse = _context13.sent;

              if (!serverResponse.error) {
                this.selectedRequestDetail = serverResponse;
              } else {
                this.selectedRequestDetail = null;
              }

              return _context13.abrupt("return", serverResponse);

            case 5:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13, this);
    }));

    function getRequestDetail(_x18) {
      return _getRequestDetail.apply(this, arguments);
    }

    return getRequestDetail;
  }();

  _proto.selectRequestDetailFromId = function selectRequestDetailFromId(id) {
    var _this = this;

    this.requestsDetailsArray.forEach(function (item, index) {
      if (item._id === id) {
        _this.selectedRequestDetail = _this.utils.copyObject(item);
        _this.requestDetailIndex = index;
        return;
      }
    });
    return null;
  };

  _proto.setTheSelectedRequestDetail = function setTheSelectedRequestDetail(request) {
    this.selectedRequestDetail = this.utils.copyObject(request);

    if (this.requestsDetailsArray) {
      for (var i = 0; i < this.requestsDetailsArray.length; i++) {
        if (this.requestsDetailsArray[i]._id === request._id) {
          this.requestDetailIndex = i;
          break;
        }
      }
    }
  };

  _proto.emptyRequestDetail = function emptyRequestDetail() {
    var newObj = new Object();
    ;
    newObj.createdDate = new Date();
    newObj.modifiedDate = new Date();
    newObj.requestStatus = this.config.UNASSIGNED_REQUEST_CODE;
    return newObj;
  };

  _proto.saveRequestDetail = /*#__PURE__*/function () {
    var _saveRequestDetail = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
      var response;
      return regeneratorRuntime.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              if (this.selectedRequestDetail) {
                _context14.next = 2;
                break;
              }

              return _context14.abrupt("return");

            case 2:
              _context14.next = 4;
              return this.data.saveObject(this.selectedRequestDetail, this.CLIENT_REQUEST_DETAILS, "put");

            case 4:
              response = _context14.sent;

              if (response.error) {
                _context14.next = 10;
                break;
              }

              this.selectedRequestDetail = response;

              if (!this.selectedRequestDetail.requestId.courseId || this.selectedRequestDetail.requestId.courseId === null) {
                this.selectedRequestDetail.requestId.courseId = {
                  _id: this.config.SANDBOX_ID,
                  name: this.config.SANDBOX_NAME
                };
              }

              this.requestsDetailsArray[this.requestDetailIndex] = this.utils.copyObject(this.selectedRequestDetail);
              return _context14.abrupt("return", response);

            case 10:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14, this);
    }));

    function saveRequestDetail() {
      return _saveRequestDetail.apply(this, arguments);
    }

    return saveRequestDetail;
  }();

  _proto.isRequestDetailDirty = function isRequestDetailDirty(obj, skip) {
    if (this.selectedRequestDetail) {
      if (!obj) {
        var obj = this.emptyRequestDetail();
      }

      var skip = skip ? skip : new Array();
      skip.push('audit');
      return this.utils.objectsEqual(this.selectedRequestDetail, obj, skip);
    }

    return new Array();
  };

  _proto.getClientRequest = /*#__PURE__*/function () {
    var _getClientRequest = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(id) {
      var serverResponse;
      return regeneratorRuntime.wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              _context15.next = 2;
              return this.data.get(this.CLIENT_REQUEST_DETAILS + '/' + id);

            case 2:
              serverResponse = _context15.sent;

              if (!serverResponse.error) {
                this.selectedRequest = serverResponse;
              }

              return _context15.abrupt("return", serverResponse);

            case 5:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15, this);
    }));

    function getClientRequest(_x19) {
      return _getClientRequest.apply(this, arguments);
    }

    return getClientRequest;
  }();

  _proto.getSessionCount = /*#__PURE__*/function () {
    var _getSessionCount = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(sessionArray, numSessions, options, requestStatus) {
      var url, response, sessions, sessionCount, i;
      return regeneratorRuntime.wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              url = this.CLIENT_REQUESTS_SERVICES;
              url += options ? options : "";
              _context16.next = 4;
              return this.data.get(url);

            case 4:
              response = _context16.sent;

              if (response.error) {
                _context16.next = 13;
                break;
              }

              sessions = new Array();
              sessionCount = new Array();
              numSessions = numSessions < sessionArray.length ? numSessions : sessionArray.length - 1;

              for (i = 0; i <= numSessions; i++) {
                sessions.push(sessionArray[i]._id);
                sessionCount.push({
                  count: 0,
                  session: sessionArray[i].session
                });
              }

              requestStatus = requestStatus ? requestStatus.split(':') : undefined;
              response.forEach(function (request) {
                var index = sessions.indexOf(request.sessionId);

                if (index > -1) {
                  if (requestStatus) {
                    request.requestDetails.forEach(function (detail) {
                      if (requestStatus.indexOf(detail.requestStatus) > -1) {
                        sessionCount[index].count += 1;
                      }
                    });
                  } else {
                    sessionCount[index].count += request.requestDetails.length;
                  }
                }
              });
              return _context16.abrupt("return", sessionCount);

            case 13:
            case "end":
              return _context16.stop();
          }
        }
      }, _callee16, this);
    }));

    function getSessionCount(_x20, _x21, _x22, _x23) {
      return _getSessionCount.apply(this, arguments);
    }

    return getSessionCount;
  }();

  _proto.sendCustomerMessage = /*#__PURE__*/function () {
    var _sendCustomerMessage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(message) {
      var serverResponse;
      return regeneratorRuntime.wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              console.log(message);
              _context17.next = 3;
              return this.data.saveObject(message, this.CLIENT_REQUEST_EMAIL, "post");

            case 3:
              serverResponse = _context17.sent;
              return _context17.abrupt("return", serverResponse);

            case 5:
            case "end":
              return _context17.stop();
          }
        }
      }, _callee17, this);
    }));

    function sendCustomerMessage(_x24) {
      return _sendCustomerMessage.apply(this, arguments);
    }

    return sendCustomerMessage;
  }();

  _proto.updateDetailStatuses = function updateDetailStatuses(selectedRequestNo, status) {
    var _this2 = this;

    this.requestsDetailsArray.forEach(function (item) {
      if (item.requestId && item.requestId.clientRequestNo == selectedRequestNo) {
        if (item.requestStatus != _this2.config.ASSIGNED_REQUEST_CODE) item.requestStatus = status;
      }
    });
  };

  _proto.updateDetailStatus = function updateDetailStatus(id, status) {
    var _this3 = this;

    this.requestsDetailsArray.forEach(function (item) {
      if (item.requestId._id == id) {
        if (item.requestStatus != _this3.config.ASSIGNED_REQUEST_CODE) item.requestStatus = status;
      }
    });
  };

  _proto.groupRequestsByInstitutionCountry = /*#__PURE__*/function () {
    var _groupRequestsByInstitutionCountry = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18() {
      var sortedArray, instID, templateObj, that;
      return regeneratorRuntime.wrap(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              if (this.requestsDetailsArrayAnalytics) {
                _context18.next = 2;
                break;
              }

              return _context18.abrupt("return");

            case 2:
              sortedArray = new Array();
              this.requestsDetailsArrayAnalytics.forEach(function (item) {
                if (item['requestId'] && item['requestId'].institutionId && item['productId'] && item['productId'].name) {
                  item.sortValue = item['requestId'].institutionId.name + item['productId'].name;
                  sortedArray.push(item);
                }
              });
              sortedArray = this.requestsDetailsArrayAnalytics.sort(function (a, b) {
                var result = a.sortValue < b.sortValue ? -1 : a.sortValue > b.sortValue ? 1 : 0;
                return result;
              });
              this.analyticsInstitutionCountryResultArray = new Array();
              instID = "";
              templateObj = new Object();
              that = this;
              sortedArray.forEach(function (item) {
                // if(item.requestId){
                if (item.sortValue != instID) {
                  instID = item.sortValue;
                  var obj = that.utils.copyObject(templateObj);
                  obj.name = item.requestId.institutionId.name;
                  obj.institutionId = item.requestId.institutionId._id;
                  obj.person = item.requestId.clientRequestsDetails.fullName;
                  obj.productName = item.productId.name;
                  obj.country = item.requestId.institutionId.country;
                  obj.total = 0;
                  obj.students = 0;
                  that.analyticsInstitutionCountryResultArray.push(obj);
                } // if(item.requestStatus != skip){


                that.analyticsInstitutionCountryResultArray[that.analyticsInstitutionCountryResultArray.length - 1]['total'] += 1;
                that.analyticsInstitutionCountryResultArray[that.analyticsInstitutionCountryResultArray.length - 1]['students'] += parseInt(item.requestId.undergradIds) + parseInt(item.requestId.graduateIds); // var gradIds = item.requestId.graduateIds != null ? parseInt(item.requestId.graduateIds) : 0;
                // var underIds = item.requestId.undergradIds != null ? parseInt(item.requestId.undergradIds) : 0;
                // that.analyticsInstitutionResultArray[that.analyticsInstitutionResultArray.length-1]['studentIds'] += gradIds + underIds;
                // that.analyticsInstitutionResultArray[that.analyticsInstitutionResultArray.length-1]['studentIds'] += parseInt(item.requestId.graduateIds) + parseInt(item.requestId.undergradIds);
                // }
                // that.analyticsInstitutionResultArray[that.analyticsInstitutionResultArray.length-1][item.requestStatus] += 1;
                // }
              });

            case 10:
            case "end":
              return _context18.stop();
          }
        }
      }, _callee18, this);
    }));

    function groupRequestsByInstitutionCountry() {
      return _groupRequestsByInstitutionCountry.apply(this, arguments);
    }

    return groupRequestsByInstitutionCountry;
  }();

  _proto.groupRequestsByInstitution = /*#__PURE__*/function () {
    var _groupRequestsByInstitution = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19() {
      var sortedArray, instID, numStatuses, templateObj, i, skip, that;
      return regeneratorRuntime.wrap(function _callee19$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              if (this.requestsDetailsArrayAnalytics) {
                _context19.next = 2;
                break;
              }

              return _context19.abrupt("return");

            case 2:
              sortedArray = this.requestsDetailsArrayAnalytics.sort(function (a, b) {
                if (!a['requestId'] || !b['requestId'] || !a['requestId'].institutionId || !b['requestId'].institutionId) return -1;
                var result = a['requestId'].institutionId.name < b['requestId'].institutionId.name ? -1 : a['requestId'].institutionId.name > b['requestId'].institutionId.name ? 1 : 0;
                return result;
              });
              this.analyticsInstitutionResultArray = new Array();
              instID = "";
              numStatuses = this.config.REQUEST_STATUS.length;
              templateObj = new Object();
              templateObj['total'] = 0;
              templateObj['studentIds'] = 0;

              for (i = 0; i < numStatuses; i++) {
                templateObj[this.config.REQUEST_STATUS[i].code] = 0;

                if (this.config.REQUEST_STATUS[i].description === "Cancelled") {
                  skip = this.config.REQUEST_STATUS[i].code;
                }
              }

              that = this;
              sortedArray.forEach(function (item) {
                if (item.requestId) {
                  if (item.requestId.institutionId && item.requestId.institutionId.name != instID) {
                    instID = item.requestId.institutionId.name;
                    var obj = that.utils.copyObject(templateObj);
                    obj.name = item.requestId.institutionId.name;
                    obj.institutionId = item.requestId.institutionId._id;
                    that.analyticsInstitutionResultArray.push(obj);
                  }

                  if (item.requestStatus != skip) {
                    that.analyticsInstitutionResultArray[that.analyticsInstitutionResultArray.length - 1]['total'] += 1;
                    var gradIds = item.requestId.graduateIds != null ? parseInt(item.requestId.graduateIds) : 0;
                    var underIds = item.requestId.undergradIds != null ? parseInt(item.requestId.undergradIds) : 0;
                    that.analyticsInstitutionResultArray[that.analyticsInstitutionResultArray.length - 1]['studentIds'] += gradIds + underIds; // that.analyticsInstitutionResultArray[that.analyticsInstitutionResultArray.length-1]['studentIds'] += parseInt(item.requestId.graduateIds) + parseInt(item.requestId.undergradIds);
                  }

                  that.analyticsInstitutionResultArray[that.analyticsInstitutionResultArray.length - 1][item.requestStatus] += 1;
                }
              });

            case 12:
            case "end":
              return _context19.stop();
          }
        }
      }, _callee19, this);
    }));

    function groupRequestsByInstitution() {
      return _groupRequestsByInstitution.apply(this, arguments);
    }

    return groupRequestsByInstitution;
  }();

  _proto.groupRequestsByProduct = function groupRequestsByProduct() {
    var _this4 = this;

    if (!this.requestsDetailsArrayAnalytics) {
      return;
    }

    var sortedArray = this.requestsDetailsArrayAnalytics.sort(function (a, b) {
      if (!a.productId || !b.productId) return -1;
      var result = a.productId.name < b.productId.name ? -1 : a.productId.name > b.productId.name ? 1 : 0;
      return result;
    });
    this.analyticsProductsResultArray = new Array();
    var prodID = "";
    var numStatuses = this.config.REQUEST_STATUS.length;
    var templateObj = new Object();
    templateObj['total'] = 0;
    templateObj['studentIds'] = 0;

    for (var i = 0; i < numStatuses; i++) {
      templateObj[this.config.REQUEST_STATUS[i].code] = 0;

      if (this.config.REQUEST_STATUS[i].description === "Cancelled") {
        var skip = this.config.REQUEST_STATUS[i].code;
      }
    }

    sortedArray.forEach(function (item) {
      if (item.productId.name != prodID) {
        prodID = item.productId.name;

        var obj = _this4.utils.copyObject(templateObj);

        obj.productId = item.productId;
        obj.country = item.requestId.institutionId.country;

        _this4.analyticsProductsResultArray.push(obj);
      }

      if (item.requestStatus != skip) {
        _this4.analyticsProductsResultArray[_this4.analyticsProductsResultArray.length - 1]['total'] += 1;
        var gradIds = item.requestId.graduateIds != null ? parseInt(item.requestId.graduateIds) : 0;
        var underIds = item.requestId.undergradIds != null ? parseInt(item.requestId.undergradIds) : 0;
        _this4.analyticsProductsResultArray[_this4.analyticsProductsResultArray.length - 1]['studentIds'] += gradIds + underIds;
      }

      _this4.analyticsProductsResultArray[_this4.analyticsProductsResultArray.length - 1][item.requestStatus] += 1;
    });
  };

  _proto.fieldSorter = function fieldSorter(fields) {
    return function (a, b) {
      return fields.map(function (o) {
        var dir = 1;

        if (o[0] === '-') {
          dir = -1;
          o = o.substring(1);
        }

        return a[o] > b[o] ? dir : a[o] < b[o] ? -dir : 0;
      }).reduce(function (p, n) {
        return p ? p : n;
      }, 0);
    };
  };

  _proto.groupRequestsByCountry = function groupRequestsByCountry() {
    var _this5 = this;

    if (!this.requestsDetailsArrayAnalytics) {
      return;
    }

    var preSortedArray = this.requestsDetailsArrayAnalytics.forEach(function (item) {
      if (item.requestId.institutionId && item.requestId.institutionId.country && item.productId.name) {
        item.sortProperty = item.requestId.institutionId.country + item.productId.name;
      } else {
        item.sortProperty = "ZZZZ";
      }
    });
    var sortedArray = this.requestsDetailsArrayAnalytics.sort(function (a, b) {
      var result = a.sortProperty < b.sortProperty ? -1 : a.sortProperty > b.sortProperty ? 1 : 0;
      return result;
    });
    this.analyticsCountryProductsResultArray = new Array();
    var prodID = "";
    var country = "";
    var numStatuses = this.config.REQUEST_STATUS.length;
    var templateObj = new Object();
    templateObj['total'] = 0;
    templateObj['studentIds'] = 0;

    for (var i = 0; i < numStatuses; i++) {
      templateObj[this.config.REQUEST_STATUS[i].code] = 0;

      if (this.config.REQUEST_STATUS[i].description === "Cancelled") {
        var skip = this.config.REQUEST_STATUS[i].code;
      }
    }

    sortedArray.forEach(function (item) {
      if (item.productId.name != prodID || item.requestId.institutionId.country != country) {
        prodID = item.productId.name;
        country = item.requestId.institutionId ? item.requestId.institutionId.country : "";

        var obj = _this5.utils.copyObject(templateObj);

        obj.productId = item.productId;
        obj.country = item.requestId.institutionId ? item.requestId.institutionId.country : "";

        _this5.analyticsCountryProductsResultArray.push(obj);
      }

      if (item.requestStatus != skip) {
        _this5.analyticsCountryProductsResultArray[_this5.analyticsCountryProductsResultArray.length - 1]['total'] += 1;
        var gradIds = item.requestId.graduateIds != null ? parseInt(item.requestId.graduateIds) : 0;
        var underIds = item.requestId.undergradIds != null ? parseInt(item.requestId.undergradIds) : 0;
        _this5.analyticsCountryProductsResultArray[_this5.analyticsCountryProductsResultArray.length - 1]['studentIds'] += gradIds + underIds;
      }

      _this5.analyticsCountryProductsResultArray[_this5.analyticsCountryProductsResultArray.length - 1][item.requestStatus] += 1;
    });
  };

  _proto.lockRequest = function lockRequest(obj) {
    if (obj.requestId) {
      var response = this.data.saveObject(obj, this.CLIENT_REQUEST_LOCK_SERVICES, "post");
    }
  };

  _proto.getRequestLock = /*#__PURE__*/function () {
    var _getRequestLock = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20(id) {
      var response;
      return regeneratorRuntime.wrap(function _callee20$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              _context20.next = 2;
              return this.data.get(this.CLIENT_REQUEST_LOCK_SERVICES + "/" + id);

            case 2:
              response = _context20.sent;

              if (response.error) {
                _context20.next = 7;
                break;
              }

              return _context20.abrupt("return", response);

            case 7:
              this.data.processError(response, "There was an error retrieving the help ticket lock.");

            case 8:
            case "end":
              return _context20.stop();
          }
        }
      }, _callee20, this);
    }));

    function getRequestLock(_x25) {
      return _getRequestLock.apply(this, arguments);
    }

    return getRequestLock;
  }();

  _proto.removeRequestLock = /*#__PURE__*/function () {
    var _removeRequestLock = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee21(id) {
      return regeneratorRuntime.wrap(function _callee21$(_context21) {
        while (1) {
          switch (_context21.prev = _context21.next) {
            case 0:
              _context21.next = 2;
              return this.data.deleteObject(this.CLIENT_REQUEST_LOCK_SERVICES + "/" + id);

            case 2:
            case "end":
              return _context21.stop();
          }
        }
      }, _callee21, this);
    }));

    function removeRequestLock(_x26) {
      return _removeRequestLock.apply(this, arguments);
    }

    return removeRequestLock;
  }();

  return ClientRequests;
}()) || _class);

/***/ }),

/***/ 748:
/*!**************************************!*\
  !*** ./src/resources/data/config.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Config": function() { return /* binding */ Config; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _dataServices__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dataServices */ 5086);
var _dec, _class;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



var Config = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_dataServices__WEBPACK_IMPORTED_MODULE_1__.DataServices), _dec(_class = /*#__PURE__*/function () {
  function Config(data) {
    this.CONFIG_SERVICE = 'config';
    this.SESSIONS_CONFIG_SERVICE = 'semesterConfig';
    this.token = void 0;
    this.user = void 0;
    this.data = data;
  }

  var _proto = Config.prototype;

  _proto.getConfigArray = /*#__PURE__*/function () {
    var _getConfigArray = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(refresh, options) {
      var url, serverResponse;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(!this.configArray || refresh)) {
                _context.next = 13;
                break;
              }

              url = this.data.CONFIG_SERVICE;
              url += options ? options : "";
              _context.prev = 3;
              _context.next = 6;
              return this.data.get(url);

            case 6:
              serverResponse = _context.sent;

              if (!serverResponse.error) {
                this.configArray = serverResponse;
              } else {
                this.data.processError(serverResponse);
              }

              _context.next = 13;
              break;

            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](3);
              console.log(_context.t0);

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[3, 10]]);
    }));

    function getConfigArray(_x, _x2) {
      return _getConfigArray.apply(this, arguments);
    }

    return getConfigArray;
  }();

  _proto.saveAll = /*#__PURE__*/function () {
    var _saveAll = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(saveConfigArray) {
      var saveObj, response;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!saveConfigArray) {
                _context2.next = 11;
                break;
              }

              saveObj = {
                parameters: saveConfigArray
              };
              _context2.next = 4;
              return this.data.saveObject(saveObj, this.CONFIG_SERVICE + '/saveAll', "put");

            case 4:
              response = _context2.sent;

              if (response.error) {
                _context2.next = 9;
                break;
              }

              return _context2.abrupt("return", response);

            case 9:
              this.data.processError(response, "There was an error updating the configuration.");

            case 10:
              return _context2.abrupt("return", response);

            case 11:
              return _context2.abrupt("return", null);

            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function saveAll(_x3) {
      return _saveAll.apply(this, arguments);
    }

    return saveAll;
  }();

  _proto.saveSessions = /*#__PURE__*/function () {
    var _saveSessions = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(saveSessionArray) {
      var response;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!saveSessionArray) {
                _context3.next = 10;
                break;
              }

              _context3.next = 3;
              return this.data.saveObject(saveSessionArray, this.SESSIONS_CONFIG_SERVICE, "put");

            case 3:
              response = _context3.sent;

              if (response.error) {
                _context3.next = 8;
                break;
              }

              return _context3.abrupt("return", response);

            case 8:
              this.data.processError(response, "There was an error updating the configuration.");

            case 9:
              return _context3.abrupt("return", response);

            case 10:
              return _context3.abrupt("return", null);

            case 11:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function saveSessions(_x4) {
      return _saveSessions.apply(this, arguments);
    }

    return saveSessions;
  }();

  return Config;
}()) || _class);

/***/ }),

/***/ 7701:
/*!******************************************!*\
  !*** ./src/resources/data/curriculum.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Curriculum": function() { return /* binding */ Curriculum; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/utils */ 8741);
/* harmony import */ var _dataServices__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dataServices */ 5086);
var _dec, _class;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }




var Curriculum = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_dataServices__WEBPACK_IMPORTED_MODULE_2__.DataServices, _utils_utils__WEBPACK_IMPORTED_MODULE_1__.Utils), _dec(_class = /*#__PURE__*/function () {
  function Curriculum(data, utils) {
    this.curriculumArray = undefined;
    this.curriculumCatArray = undefined;
    this.CURRICULUM_SERVICE = 'curriculum';
    this.CURRICULUM_CATEGORY_SERVICE = 'curriculumcategory';
    this.data = data;
    this.utils = utils;
  }

  var _proto = Curriculum.prototype;

  _proto.getCurriculumArray = /*#__PURE__*/function () {
    var _getCurriculumArray = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(refresh, options) {
      var url, serverResponse;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(!this.configArray || refresh)) {
                _context.next = 13;
                break;
              }

              url = this.CURRICULUM_SERVICE;
              url += options ? options : "";
              _context.prev = 3;
              _context.next = 6;
              return this.data.get(url);

            case 6:
              serverResponse = _context.sent;

              if (!serverResponse.error) {
                this.curriculumArray = serverResponse;
              } else {
                this.data.processError(serverResponse);
              }

              _context.next = 13;
              break;

            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](3);
              console.log(_context.t0);

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[3, 10]]);
    }));

    function getCurriculumArray(_x, _x2) {
      return _getCurriculumArray.apply(this, arguments);
    }

    return getCurriculumArray;
  }();

  _proto.getCurriculumCategoryArray = /*#__PURE__*/function () {
    var _getCurriculumCategoryArray = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(refresh, options) {
      var url, serverResponse;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(!this.configArray || refresh)) {
                _context2.next = 13;
                break;
              }

              url = this.CURRICULUM_CATEGORY_SERVICE;
              url += options ? options : "";
              _context2.prev = 3;
              _context2.next = 6;
              return this.data.get(url);

            case 6:
              serverResponse = _context2.sent;

              if (!serverResponse.error) {
                this.curriculumCatArray = serverResponse;
              } else {
                this.data.processError(serverResponse);
              }

              _context2.next = 13;
              break;

            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2["catch"](3);
              console.log(_context2.t0);

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this, [[3, 10]]);
    }));

    function getCurriculumCategoryArray(_x3, _x4) {
      return _getCurriculumCategoryArray.apply(this, arguments);
    }

    return getCurriculumCategoryArray;
  }();

  _proto.selectCurriculum = function selectCurriculum(index) {
    if (index === undefined) {
      this.selectedCurriculum = this.emptyCurriculum();
    } else {
      try {
        this.selectedCurriculum = this.utils.copyObject(this.curriculumArray[index]);
        this.editIndex = index;
      } catch (error) {
        console.log(error);
        this.selectedCurriculum = this.emptyCurriculum();
      }
    }
  };

  _proto.selectCurriculumById = function selectCurriculumById(id) {
    if (!id) {
      this.selectedCurriculum = this.emptyCurriculum();
    } else {
      for (var i = 0; i < this.curriculumArray.length; i++) {
        if (this.curriculumArray[i]._id === id) {
          this.selectedCurriculum = this.utils.copyObject(this.curriculumArray[i]);
          this.editIndex = i;
          return;
        }
      }
    }
  };

  _proto.emptyCurriculum = function emptyCurriculum() {
    var obj = new Object();
    obj.category = "";
    obj.title = "";
    obj.description = "";
    obj.notes = "";
    obj.rating = 0;
    obj.comments = new Array();
    obj.products = new Array();
    return obj;
  };

  _proto.save = /*#__PURE__*/function () {
    var _save = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var response, _response;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (this.selectedCurriculum._id) {
                _context3.next = 8;
                break;
              }

              _context3.next = 3;
              return this.data.saveObject(this.selectedCurriculum, this.CURRICULUM_SERVICE, "post");

            case 3:
              response = _context3.sent;

              if (!response.error) {
                if (this.curriculumArray) {
                  this.curriculumArray.push(response);
                  ;
                }
              } else {
                this.data.processError(response, "There was an error creating the curriculum.");
              }

              return _context3.abrupt("return", response);

            case 8:
              _context3.next = 10;
              return this.data.saveObject(this.selectedCurriculum, this.CURRICULUM_SERVICE, "put");

            case 10:
              _response = _context3.sent;

              if (!_response.error) {
                if (this.curriculumArray) {
                  this.curriculumArray[this.editIndex] = this.utils.copyObject(this.selectedCurriculum, this.curriculumArray[this.editIndex]);
                }
              }

              return _context3.abrupt("return", _response);

            case 13:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function save() {
      return _save.apply(this, arguments);
    }

    return save;
  }();

  _proto.isDirty = function isDirty(obj) {
    if (this.selectedCurriculum) {
      if (!obj) {
        var obj = this.emptyCurriculum();
      }

      return this.utils.objectsEqual(this.selectedCurriculum, obj, ['file']);
    }

    return new Array();
  };

  _proto.delete = /*#__PURE__*/function () {
    var _delete2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var serverResponse;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (!this.selectedCurriculum._id) {
                _context4.next = 6;
                break;
              }

              _context4.next = 3;
              return this.data.deleteObject(this.CURRICULUM_SERVICE + '/' + this.selectedCurriculum._id);

            case 3:
              serverResponse = _context4.sent;

              if (!serverResponse.error) {
                this.curriculumArray.splice(this.editIndex, 1);
                this.editIndex = -1;
              }

              return _context4.abrupt("return", serverResponse);

            case 6:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function _delete() {
      return _delete2.apply(this, arguments);
    }

    return _delete;
  }();

  _proto.selectCurriculumCategory = function selectCurriculumCategory(index) {
    if (index === undefined) {
      this.selectedCurriculumCategory = this.emptyCurriculumCategory();
    } else {
      try {
        this.selectedCurriculumCategory = this.utils.copyObject(this.curriculumCatArray[index]);
        this.editCategoryIndex = index;
      } catch (error) {
        console.log(error);
        this.selectedCurriculumCategory = this.emptyCurriculumCategory();
      }
    }
  };

  _proto.selectCurriculumCategoryByName = function selectCurriculumCategoryByName(name) {
    if (name === undefined) {
      this.selectedCurriculumCategory = this.emptyCurriculumCategory();
    } else {
      try {
        for (var i = 0; i < this.curriculumCatArray.length; i++) {
          if (this.curriculumCatArray[i].name === name) {
            this.selectedCurriculumCategory = this.utils.copyObject(this.curriculumCatArray[i]);
            this.editCategoryIndex = i;
            break;
          }
        }
      } catch (error) {
        console.log(error);
        this.selectedCurriculumCategory = this.emptyCurriculumCategory();
      }
    }
  };

  _proto.emptyCurriculumCategory = function emptyCurriculumCategory() {
    var obj = new Object();
    obj.name = "";
    obj.description = "";
    return obj;
  };

  _proto.saveCategory = /*#__PURE__*/function () {
    var _saveCategory = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      var response, _response2;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (this.selectedCurriculumCategory._id) {
                _context5.next = 8;
                break;
              }

              _context5.next = 3;
              return this.data.saveObject(this.selectedCurriculumCategory, this.CURRICULUM_CATEGORY_SERVICE, "post");

            case 3:
              response = _context5.sent;

              if (!response.error) {
                if (this.curriculumCatArray) {
                  this.curriculumCatArray.push(response);
                  ;
                }
              } else {
                this.data.processError(response, "There was an error creating the curriculum catgory.");
              }

              return _context5.abrupt("return", response);

            case 8:
              _context5.next = 10;
              return this.data.saveObject(this.selectedCurriculumCategory, this.CURRICULUM_CATEGORY_SERVICE, "put");

            case 10:
              _response2 = _context5.sent;

              if (!_response2.error) {
                if (this.curriculumCatArray) {
                  this.curriculumCatArray[this.editCategoryIndex] = this.utils.copyObject(this.selectedCurriculumCategory, this.curriculumCatArray[this.editCategoryIndex]);
                }
              } else {
                this.data.processError(_response2, "There was an error creating the curriculum catgory.");
              }

              return _context5.abrupt("return", _response2);

            case 13:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function saveCategory() {
      return _saveCategory.apply(this, arguments);
    }

    return saveCategory;
  }();

  _proto.deleteCategory = /*#__PURE__*/function () {
    var _deleteCategory = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
      var serverResponse;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (!this.selectedCurriculumCategory._id) {
                _context6.next = 6;
                break;
              }

              _context6.next = 3;
              return this.data.deleteObject(this.CURRICULUM_CATEGORY_SERVICE + '/' + this.selectedCurriculumCategory._id);

            case 3:
              serverResponse = _context6.sent;

              if (!serverResponse.error) {
                this.curriculumCatArray.splice(this.editCategoryIndex, 1);
                this.editCategoryIndex = -1;
              }

              return _context6.abrupt("return", serverResponse);

            case 6:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function deleteCategory() {
      return _deleteCategory.apply(this, arguments);
    }

    return deleteCategory;
  }();

  _proto.curriculumExist = function curriculumExist(category) {
    var exists = false;

    for (var i = 0; i < this.curriculumArray.length; i++) {
      if (this.curriculumArray[i].category === category) {
        exists = true;
        break;
      }
    }

    return exists;
  };

  _proto.uploadFile = /*#__PURE__*/function () {
    var _uploadFile = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(files) {
      var response;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return this.data.uploadFiles(files, this.CURRICULUM_SERVICE + "/upload" + "/" + this.selectedCurriculum._id + '/' + this.selectedCurriculum.category);

            case 2:
              response = _context7.sent;

              if (!response.error) {
                this.curriculumArray[this.editIndex].file = response.file;
              }

            case 4:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function uploadFile(_x5) {
      return _uploadFile.apply(this, arguments);
    }

    return uploadFile;
  }();

  return Curriculum;
}()) || _class);

/***/ }),

/***/ 5086:
/*!********************************************!*\
  !*** ./src/resources/data/dataServices.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataServices": function() { return /* binding */ DataServices; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var aurelia_http_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-http-client */ 3139);
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/utils */ 8741);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
/* harmony import */ var aurelia_event_aggregator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! aurelia-event-aggregator */ "aurelia-event-aggregator");
var _dec, _class;






var DataServices = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(aurelia_http_client__WEBPACK_IMPORTED_MODULE_1__.HttpClient, _utils_utils__WEBPACK_IMPORTED_MODULE_2__.Utils, _config_appConfig__WEBPACK_IMPORTED_MODULE_3__.AppConfig, aurelia_event_aggregator__WEBPACK_IMPORTED_MODULE_4__.EventAggregator), _dec(_class = /*#__PURE__*/function () {
  function DataServices(http, utils, config, eventAggregator) {
    var _this = this;

    this.isRequesting = false;
    this.FILE_URL = "http://localhost:5000/api/upload";
    this.FILE_DOWNLOAD_URL = "http://localhost:5000/";
    this.IS4UA = 'is4ua';
    this.CLIENTS_SERVICE = 'clients';
    this.DELETE_ALL_CLIENTS = 'clients/system/SYSTEMID';
    this.COURSES_SERVICE = 'courses';
    this.PERSON_COURSES_SERVICE = 'courses/person/PERSONID';
    this.CONFIG_SERVICE = 'config';
    this.SESSIONS_CONFIG_SERVICE = 'semesterConfig';
    this.DOCUMENTS_FILE_UPLOAD = 'documents/file';
    this.http = http;
    this.utils = utils;
    this.config = config;
    this.eventAggregator = eventAggregator;
    this.http.configure(function (x) {
      x.withBaseUrl(_this.config.BASE_URL);
    });
  }

  var _proto = DataServices.prototype;

  _proto.activate = function activate() {};

  _proto.get = function get(url) {
    var _this2 = this;

    this.isRequesting = true;
    return this.http.createRequest(url).asGet().withHeader('Authorization', 'JWT ' + sessionStorage.getItem('token')).send().then(function (response) {
      _this2.isRequesting = false;

      if (!response.isSuccess) {
        return response;
      } else {
        return JSON.parse(response.response);
      }
    }).catch(function (e) {
      _this2.isRequesting = false;
      console.log(e);
      return {
        error: true,
        code: e.statusCode,
        message: e.statusText
      };
    });
  };

  _proto.getNoAuth = function getNoAuth(url) {
    var _this3 = this;

    this.isRequesting = true;
    return this.http.createRequest(url).asGet().send().then(function (response) {
      _this3.isRequesting = false;

      if (!response.isSuccess) {
        return response;
      } else {
        return JSON.parse(response.response);
      }
    }).catch(function (e) {
      _this3.isRequesting = false;
      console.log(e);
      return {
        error: true,
        code: e.statusCode,
        message: e.statusText
      };
    });
  };

  _proto.saveObject = function saveObject(content, url, method) {
    var _this4 = this;

    this.isRequesting = true;

    if (method === 'put') {
      return this.http.createRequest(url).asPut().withHeader('Authorization', 'JWT ' + sessionStorage.getItem('token')).withContent(content).send().then(function (response) {
        _this4.isRequesting = false;

        if (!response.isSuccess) {
          return response;
        } else {
          return JSON.parse(response.response);
        }
      }).catch(function (e) {
        _this4.isRequesting = false;
        console.log(e);
        return {
          error: true,
          code: e.statusCode,
          message: e.statusText
        };
      });
    } else if (method === 'post') {
      return this.http.createRequest(url).asPost().withHeader('Authorization', 'JWT ' + sessionStorage.getItem('token')).withContent(content).send().then(function (response) {
        _this4.isRequesting = false;

        if (!response.isSuccess) {
          return response;
        } else {
          return JSON.parse(response.response);
        }
      }).catch(function (e) {
        _this4.isRequesting = false;
        console.log(e);
        return {
          error: true,
          code: e.statusCode,
          message: e.statusText
        };
      });
    }
  };

  _proto.deleteObject = function deleteObject(url) {
    var _this5 = this;

    this.isRequesting = true;
    return this.http.createRequest(url).asDelete().withHeader('Authorization', 'JWT ' + sessionStorage.getItem('token')).send().then(function (response) {
      _this5.isRequesting = false;

      if (!response.isSuccess) {
        return response;
      } else {
        if (response.statusCode === 204) {
          return response;
        } else {
          return JSON.parse(response.response);
        }
      }
    }).catch(function (e) {
      _this5.isRequesting = false;
      console.log(e);
      return {
        error: true,
        code: e.statusCode,
        message: e.statusText
      };
    });
  };

  _proto.sendMail = function sendMail(content) {
    var _this6 = this;

    this.isRequesting = true;
    return this.http.createRequest('sendMail').asPost().withHeader('Authorization', 'JWT ' + sessionStorage.getItem('token')).withContent(content).send().then(function (response) {
      _this6.isRequesting = false;

      if (!response.isSuccess) {
        return response;
      } else {
        return JSON.parse(response.response);
      }
    }).catch(function (e) {
      _this6.isRequesting = false;
      console.log(e);
      return {
        error: true,
        code: e.statusCode,
        message: e.statusText
      };
    });
  };

  _proto.login = function login(content, url) {
    var _this7 = this;

    return this.http.createRequest(url).asPost().withContent(content).send().then(function (response) {
      _this7.isRequesting = false;
      return JSON.parse(response.response);
    }).catch(function (e) {
      _this7.isRequesting = false;
      console.log(e);
      return {
        error: true,
        code: e.statusCode,
        message: e.statusText
      };
    });
  };

  _proto.uploadFiles = function uploadFiles(files, url) {
    var _this8 = this;

    // this.isRequesting = true;
    this.progress = 0;
    var formData = new FormData();
    files.forEach(function (item, index) {
      formData.append("file" + index, item);
    });
    return this.http.createRequest(url).asPost().withHeader('Authorization', 'JWT ' + sessionStorage.getItem('token')).withContent(formData).skipContentProcessing().withProgressCallback(function (progress) {
      console.log(progress.loaded);

      _this8.eventAggregator.publish('upload-progress', {
        progress: progress.loaded,
        total: progress.total
      });

      _this8.progress = progress.loaded / progress.total;
    }).send().then(function (response) {
      _this8.isRequesting = false;

      if (!response.isSuccess) {
        return response;
      } else {
        return JSON.parse(response.response);
      }
    }).catch(function (e) {
      _this8.isRequesting = false;
      console.log(e);
      return {
        error: true,
        code: e.statusCode,
        message: e.statusText
      };
    });
  };

  _proto.processError = function processError(obj, message) {
    console.log(obj);
    var msg = (message ? message : "") + " ";

    switch (obj.code) {
      case 404:
        msg = undefined;
        break;

      case 422:
        msg = msg += "The request was bad.  Contact your UCC.";
        break;

      case 409:
        msg = msg += "The record already exists.";
        break;

      case 500:
        msg = msg += "An unspecified error occured on the server.  Contact your UCC.";
        break;

      default:
        msg = msg += "An unspecified error occured.  Contact your UCC.";
    }

    if (msg && msg.length > 0) this.utils.showNotification(msg);
  } // //File URLs
  // API_KEY='0f85bb931f8faad7e35b6f685aa4e931';
  // OPEN_WEATHER_MAP_SERVICE = 'http://api.openweathermap.org/data/2.5/weather';
  ;

  return DataServices;
}()) || _class);

/***/ }),

/***/ 7188:
/*!*****************************************!*\
  !*** ./src/resources/data/documents.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DocumentsServices": function() { return /* binding */ DocumentsServices; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _dataServices__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dataServices */ 5086);
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/utils */ 8741);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! moment */ 381);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_4__);
var _dec, _class;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }






var DocumentsServices = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_dataServices__WEBPACK_IMPORTED_MODULE_1__.DataServices, _utils_utils__WEBPACK_IMPORTED_MODULE_2__.Utils, _config_appConfig__WEBPACK_IMPORTED_MODULE_3__.AppConfig), _dec(_class = /*#__PURE__*/function () {
  function DocumentsServices(data, utils, config) {
    this.DOCUMENTS_SERVICE = "documents";
    this.DOCUMENTS_CATEGORY_SERVICE = "documentCategory";
    this.data = data;
    this.utils = utils;
    this.config = config;
  } //Documents


  var _proto = DocumentsServices.prototype;

  _proto.getDocumentsArray =
  /*#__PURE__*/
  function () {
    var _getDocumentsArray = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(refresh, options) {
      var url, serverResponse;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(!this.documentsArray || refresh)) {
                _context.next = 18;
                break;
              }

              url = this.DOCUMENTS_SERVICE;
              url += options ? options : "";
              _context.prev = 3;
              _context.next = 6;
              return this.data.get(url);

            case 6:
              serverResponse = _context.sent;

              if (serverResponse.status) {
                _context.next = 11;
                break;
              }

              this.documentsArray = serverResponse;
              _context.next = 12;
              break;

            case 11:
              return _context.abrupt("return", undefined);

            case 12:
              _context.next = 18;
              break;

            case 14:
              _context.prev = 14;
              _context.t0 = _context["catch"](3);
              console.log(_context.t0);
              return _context.abrupt("return", undefined);

            case 18:
              return _context.abrupt("return", this.documentsArray);

            case 19:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[3, 14]]);
    }));

    function getDocumentsArray(_x, _x2) {
      return _getDocumentsArray.apply(this, arguments);
    }

    return getDocumentsArray;
  }();

  _proto.selectDocument = function selectDocument(index) {
    if (!index && index != 0) {
      this.selectedDocument = this.emptyDocument();
    } else {
      try {
        this.selectedDocument = this.utils.copyObject(this.documentsArray[index]);
        this.editDocumentIndex = index;
      } catch (error) {
        this.selectedDocument = this.emptyDocument();
      }
    }
  };

  _proto.emptyDocument = function emptyDocument() {
    var newObj = new Object();
    newObj.name = "";
    newObj.description = "";
    newObj.type = 0;
    newObj.files = new Array();
    newObj.active = true;
    newObj.createdDate = new Date();
    return newObj;
  };

  _proto.saveDocument = /*#__PURE__*/function () {
    var _saveDocument = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var _serverResponse, serverResponse;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (this.selectedDocument) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return");

            case 2:
              if (this.selectedDocument._id) {
                _context2.next = 10;
                break;
              }

              _context2.next = 5;
              return this.data.saveObject(this.selectedDocument, this.DOCUMENTS_SERVICE, "post");

            case 5:
              _serverResponse = _context2.sent;

              if (!_serverResponse.status) {
                this.selectedDocument = _serverResponse;
                this.documentsArray.push(this.selectedDocument);
                this.editDocumentIndex = this.documentsArray.length - 1;
              }

              return _context2.abrupt("return", _serverResponse);

            case 10:
              _context2.next = 12;
              return this.data.saveObject(this.selectedDocument, this.DOCUMENTS_SERVICE, "put");

            case 12:
              serverResponse = _context2.sent;

              if (!serverResponse.status) {
                this.documentsArray[this.editDocumentIndex] = this.utils.copyObject(this.selectedDocument, this.documentsArray[this.editDocumentIndex]);
              }

              return _context2.abrupt("return", serverResponse);

            case 15:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function saveDocument() {
      return _saveDocument.apply(this, arguments);
    }

    return saveDocument;
  }();

  _proto.uploadFile = function uploadFile(files, version) {
    var path = this.selectedCat.code + '$@' + this.selectedDocument.name;
    this.data.uploadFiles(files, this.data.DOCUMENTS_FILE_UPLOAD + "/" + path + '/' + version);
  };

  _proto.deleteFile = /*#__PURE__*/function () {
    var _deleteFile = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(index) {
      var serverResponse;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!(!this.selectedDocument || !this.selectedDocument._id)) {
                _context3.next = 2;
                break;
              }

              return _context3.abrupt("return");

            case 2:
              _context3.next = 4;
              return this.data.deleteObject(this.data.DOCUMENTS_FILE_UPLOAD + '/' + this.selectedDocument._id + '/' + index);

            case 4:
              serverResponse = _context3.sent;

              if (!serverResponse.status) {
                this.selectedDocument.files.splice(index, 1);
                this.documentsArray[this.editDocumentIndex] = this.utils.copyObject(this.selectedDocument, this.documentsArray[this.editDocumentIndex]);
              }

              return _context3.abrupt("return", serverResponse);

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function deleteFile(_x3) {
      return _deleteFile.apply(this, arguments);
    }

    return deleteFile;
  }();

  _proto.deleteDocument = /*#__PURE__*/function () {
    var _deleteDocument = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var serverResponse;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return this.data.deleteObject(this.DOCUMENTS_SERVICE + '/' + this.selectedDocument._id);

            case 2:
              serverResponse = _context4.sent;

              if (serverResponse.status === 204) {
                this.documentsArray.splice(this.editDocumentIndex, 1);
                this.editDownloadIndex = -1;
              }

              return _context4.abrupt("return", serverResponse);

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function deleteDocument() {
      return _deleteDocument.apply(this, arguments);
    }

    return deleteDocument;
  }();

  _proto.isDirty = function isDirty(obj) {
    if (this.selectedDocument) {
      if (!obj) {
        var obj = this.emptyDocument();
      }

      var skip = ['file'];
      return this.utils.objectsEqual(this.selectedDocument, obj, skip);
    }

    return new Array();
  } //Categories
  ;

  _proto.getDocumentsCategoriesArray =
  /*#__PURE__*/
  function () {
    var _getDocumentsCategoriesArray = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(refresh, options) {
      var url, serverResponse;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (!(!this.docCatsArray || refresh)) {
                _context5.next = 19;
                break;
              }

              url = this.DOCUMENTS_CATEGORY_SERVICE;
              url += options ? options : "";
              ;
              _context5.prev = 4;
              _context5.next = 7;
              return this.data.get(url);

            case 7:
              serverResponse = _context5.sent;

              if (serverResponse.error) {
                _context5.next = 12;
                break;
              }

              this.docCatsArray = serverResponse;
              _context5.next = 13;
              break;

            case 12:
              return _context5.abrupt("return", undefined);

            case 13:
              _context5.next = 19;
              break;

            case 15:
              _context5.prev = 15;
              _context5.t0 = _context5["catch"](4);
              console.log(_context5.t0);
              return _context5.abrupt("return", undefined);

            case 19:
              return _context5.abrupt("return", this.docCatsArray);

            case 20:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this, [[4, 15]]);
    }));

    function getDocumentsCategoriesArray(_x4, _x5) {
      return _getDocumentsCategoriesArray.apply(this, arguments);
    }

    return getDocumentsCategoriesArray;
  }();

  _proto.selectCategory = function selectCategory(index) {
    if (!index && index != 0) {
      this.selectedCat = this.emptyCat();
    } else {
      try {
        this.selectedCat = this.utils.copyObject(this.docCatsArray[index]);
        this.editCatIndex = index;
      } catch (error) {
        this.selectedCat = this.emptyCat();
      }
    }
  };

  _proto.selectCategoryByCode = function selectCategoryByCode(index) {
    if (!index && index != 0) {
      this.selectedCat = this.emptyCat();
    } else {
      try {
        for (var i = 0; i < this.docCatsArray.length; i++) {
          if (this.docCatsArray[i].code == index) {
            index = i;
            break;
          }
        }

        this.selectedCat = this.utils.copyObject(this.docCatsArray[index]);
        this.editCatIndex = index;
      } catch (error) {
        this.selectedCat = this.emptyCat();
      }
    }
  };

  _proto.emptyCat = function emptyCat() {
    var newObj = new Object();
    var newCode = 0;

    for (var i = 0; i < this.docCatsArray.length; i++) {
      if (this.docCatsArray[i].code > newCode) newCode = this.docCatsArray[i].code;
    }

    newObj.code = newCode + 1;
    newObj.description = "";
    return newObj;
  };

  _proto.saveCategory = /*#__PURE__*/function () {
    var _saveCategory = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
      var _serverResponse2, serverResponse;

      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (this.selectedCat) {
                _context6.next = 2;
                break;
              }

              return _context6.abrupt("return");

            case 2:
              if (this.selectedCat._id) {
                _context6.next = 10;
                break;
              }

              _context6.next = 5;
              return this.data.saveObject(this.selectedCat, this.DOCUMENTS_CATEGORY_SERVICE, "post");

            case 5:
              _serverResponse2 = _context6.sent;

              if (!_serverResponse2.status) {
                this.docCatsArray.push(_serverResponse2);
                this.editCatIndex = this.docCatsArray.length - 1;
              }

              return _context6.abrupt("return", _serverResponse2);

            case 10:
              _context6.next = 12;
              return this.data.saveObject(this.selectedCat, this.DOCUMENTS_CATEGORY_SERVICE, "put");

            case 12:
              serverResponse = _context6.sent;

              if (!serverResponse.status) {
                this.docCatsArray[this.editCatIndex] = this.utils.copyObject(this.selectedCat, this.docCatsArray[this.editCatIndex]);
              }

              return _context6.abrupt("return", serverResponse);

            case 15:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function saveCategory() {
      return _saveCategory.apply(this, arguments);
    }

    return saveCategory;
  }();

  _proto.deleteCat = /*#__PURE__*/function () {
    var _deleteCat = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
      var serverResponse;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              if (!this.selectedCat._id) {
                _context7.next = 8;
                break;
              }

              _context7.next = 3;
              return this.data.deleteObject(this.DOCUMENTS_CATEGORY_SERVICE + '/' + this.selectedCat._id);

            case 3:
              serverResponse = _context7.sent;

              if (serverResponse.status === 204) {
                this.docCatsArray.splice(this.editCatIndex, 1);
                this.editCatIndex = -1;
              }

              return _context7.abrupt("return", serverResponse);

            case 8:
              return _context7.abrupt("return", {
                error: "no category selected"
              });

            case 9:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function deleteCat() {
      return _deleteCat.apply(this, arguments);
    }

    return deleteCat;
  }();

  return DocumentsServices;
}()) || _class);

/***/ }),

/***/ 9132:
/*!*****************************************!*\
  !*** ./src/resources/data/downloads.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Downloads": function() { return /* binding */ Downloads; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _dataServices__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dataServices */ 5086);
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/utils */ 8741);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! moment */ 381);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_4__);
var _dec, _class;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }






var Downloads = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_dataServices__WEBPACK_IMPORTED_MODULE_1__.DataServices, _utils_utils__WEBPACK_IMPORTED_MODULE_2__.Utils, _config_appConfig__WEBPACK_IMPORTED_MODULE_3__.AppConfig), _dec(_class = /*#__PURE__*/function () {
  function Downloads(data, utils, config) {
    this.DOWNLOADS_SERVICE = "apps";
    this.APPLICATION_CATEGORY_SERVICE = "appsCategory";
    this.DOWNLOADS_UPLOADS = "downloads/upload";
    this.data = data;
    this.utils = utils;
    this.config = config;
  } //Downloads


  var _proto = Downloads.prototype;

  _proto.getDownloadsArray =
  /*#__PURE__*/
  function () {
    var _getDownloadsArray = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(refresh, options) {
      var url, serverResponse;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(!this.appDownloadsArray || refresh)) {
                _context.next = 13;
                break;
              }

              url = this.DOWNLOADS_SERVICE;
              url += options ? options : "";
              _context.prev = 3;
              _context.next = 6;
              return this.data.get(url);

            case 6:
              serverResponse = _context.sent;

              if (!serverResponse.error) {
                this.appDownloadsArray = serverResponse;
              }

              _context.next = 13;
              break;

            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](3);
              console.log(_context.t0);

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[3, 10]]);
    }));

    function getDownloadsArray(_x, _x2) {
      return _getDownloadsArray.apply(this, arguments);
    }

    return getDownloadsArray;
  }();

  _proto.selectDownload = function selectDownload(index) {
    if (!index && index != 0) {
      this.selectedDownload = this.emptyDownload();
    } else {
      try {
        this.selectedDownload = this.utils.copyObject(this.appDownloadsArray[index]);
        this.editDownloadIndex = index;
      } catch (error) {
        this.selectedDownload = this.emptyDownload();
      }
    }
  };

  _proto.emptyDownload = function emptyDownload() {
    var newObj = new Object();
    newObj.name = "";
    newObj.description = "";
    newObj.type = 0;
    newObj.file = "";
    newObj.createdDate = new Date();
    newObj.active = true;
    newObj.helpTicketRelevant = false;
    return newObj;
  };

  _proto.saveDownload = /*#__PURE__*/function () {
    var _saveDownload = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var _serverResponse, serverResponse;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (this.selectedDownload) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return");

            case 2:
              if (this.selectedDownload._id) {
                _context2.next = 10;
                break;
              }

              _context2.next = 5;
              return this.data.saveObject(this.selectedDownload, this.DOWNLOADS_SERVICE, "post");

            case 5:
              _serverResponse = _context2.sent;

              if (!_serverResponse.error) {
                this.selectedDownload = _serverResponse;
                this.appDownloadsArray.push(this.selectedDownload);
                this.editDownloadIndex = this.appDownloadsArray.length - 1;
              }

              return _context2.abrupt("return", _serverResponse);

            case 10:
              _context2.next = 12;
              return this.data.saveObject(this.selectedDownload, this.DOWNLOADS_SERVICE, "put");

            case 12:
              serverResponse = _context2.sent;

              if (!serverResponse.error) {
                this.appDownloadsArray[this.editDownloadIndex] = this.utils.copyObject(this.selectedDownload, this.appDownloadsArray[this.editDownloadIndex]);
              }

              return _context2.abrupt("return", serverResponse);

            case 15:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function saveDownload() {
      return _saveDownload.apply(this, arguments);
    }

    return saveDownload;
  }();

  _proto.uploadFile = /*#__PURE__*/function () {
    var _uploadFile = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(files) {
      var response;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return this.data.uploadFiles(files, this.DOWNLOADS_UPLOADS + "/" + this.selectedDownload._id + '/' + this.selectedDownload.downCatcode);

            case 2:
              response = _context3.sent;

              if (!response.error) {
                this.appDownloadsArray[this.editDownloadIndex].file = response.file;
              }

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function uploadFile(_x3) {
      return _uploadFile.apply(this, arguments);
    }

    return uploadFile;
  }();

  _proto.deleteDownload = /*#__PURE__*/function () {
    var _deleteDownload = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var serverResponse;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return this.data.deleteObject(this.DOWNLOADS_SERVICE + '/' + this.selectedDownload._id);

            case 2:
              serverResponse = _context4.sent;

              if (!serverResponse.error) {
                this.appDownloadsArray.splice(this.editDownloadIndex, 1);
                this.editDownloadIndex = -1;
              }

              return _context4.abrupt("return", serverResponse);

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function deleteDownload() {
      return _deleteDownload.apply(this, arguments);
    }

    return deleteDownload;
  }();

  _proto.isDirty = function isDirty(obj) {
    if (this.selectedDownload) {
      if (!obj) {
        var obj = this.emptyDownload();
      }

      var skip = ['file'];
      return this.utils.objectsEqual(this.selectedDownload, obj, skip);
    }

    return new Array();
  } //Categories
  ;

  _proto.getDownloadCategoriesArray =
  /*#__PURE__*/
  function () {
    var _getDownloadCategoriesArray = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(refresh, options) {
      var url, serverResponse;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (!(!this.appCatsArray || refresh)) {
                _context5.next = 14;
                break;
              }

              url = this.APPLICATION_CATEGORY_SERVICE;
              url += options ? options : "";
              ;
              _context5.prev = 4;
              _context5.next = 7;
              return this.data.get(url);

            case 7:
              serverResponse = _context5.sent;

              if (!serverResponse.error) {
                this.appCatsArray = serverResponse;
              }

              _context5.next = 14;
              break;

            case 11:
              _context5.prev = 11;
              _context5.t0 = _context5["catch"](4);
              console.log(_context5.t0);

            case 14:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this, [[4, 11]]);
    }));

    function getDownloadCategoriesArray(_x4, _x5) {
      return _getDownloadCategoriesArray.apply(this, arguments);
    }

    return getDownloadCategoriesArray;
  }();

  _proto.selectCategory = function selectCategory(index) {
    if (!index && index != 0) {
      this.selectedCat = this.emptyCat();
    } else {
      try {
        this.selectedCat = this.utils.copyObject(this.appCatsArray[index]);
        this.editCatIndex = index;
      } catch (error) {
        this.selectedCat = this.emptyCat();
      }
    }
  };

  _proto.selectCategoryByCode = function selectCategoryByCode(code) {
    var _this = this;

    if (!code && code != 0) {
      this.selectedCat = this.emptyCat();
    } else {
      try {
        this.editCatIndex = 0;
        this.appCatsArray.forEach(function (item, index) {
          if (item.downCatcode == code) _this.editCatIndex = index;
        });
        this.selectedCat = this.utils.copyObject(this.appCatsArray[this.editCatIndex]);
      } catch (error) {
        this.selectedCat = this.emptyCat();
      }
    }
  };

  _proto.emptyCat = function emptyCat() {
    var newObj = new Object();
    newObj.code = 0;
    newObj.description = "";
    return newObj;
  };

  _proto.documentsExist = function documentsExist(code) {
    if (!code && code != 0) {
      return false;
    } else {
      for (var i = 0; i < this.appDownloadsArray.length; i++) {
        if (this.appDownloadsArray[i].downCatcode == code) return true;
      }

      return false;
    }
  };

  _proto.saveCategory = /*#__PURE__*/function () {
    var _saveCategory = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
      var _serverResponse2, serverResponse;

      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (this.selectedCat) {
                _context6.next = 2;
                break;
              }

              return _context6.abrupt("return");

            case 2:
              if (this.selectedCat._id) {
                _context6.next = 10;
                break;
              }

              _context6.next = 5;
              return this.data.saveObject(this.selectedCat, this.APPLICATION_CATEGORY_SERVICE, "post");

            case 5:
              _serverResponse2 = _context6.sent;

              if (!_serverResponse2.error) {
                this.appCatsArray.push(_serverResponse2);
                this.selectedCat = serverReponse;
                this.editCatIndex = this.appCatsArrayInternal.length - 1;
              }

              return _context6.abrupt("return", _serverResponse2);

            case 10:
              _context6.next = 12;
              return this.data.saveObject(this.selectedCat, this.APPLICATION_CATEGORY_SERVICE, "put");

            case 12:
              serverResponse = _context6.sent;

              if (!serverResponse.error) {
                this.appCatsArray[this.editCatIndex] = this.utils.copyObject(this.selectedCat, this.appCatsArray[this.editCatIndex]);
              }

              return _context6.abrupt("return", serverResponse);

            case 15:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function saveCategory() {
      return _saveCategory.apply(this, arguments);
    }

    return saveCategory;
  }();

  _proto.deleteCat = /*#__PURE__*/function () {
    var _deleteCat = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
      var serverResponse;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              if (!this.selectedCat._id) {
                _context7.next = 8;
                break;
              }

              _context7.next = 3;
              return this.data.deleteObject(this.APPLICATION_CATEGORY_SERVICE + '/' + this.selectedCat._id);

            case 3:
              serverResponse = _context7.sent;

              if (!serverResponse.error) {
                this.appCatsArray.splice(this.editCatIndex, 1);
                this.editCatIndex = -1;
              }

              return _context7.abrupt("return", serverResponse);

            case 8:
              return _context7.abrupt("return", {
                error: "no category selected"
              });

            case 9:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function deleteCat() {
      return _deleteCat.apply(this, arguments);
    }

    return deleteCat;
  }();

  return Downloads;
}()) || _class);

/***/ }),

/***/ 4247:
/*!**************************************!*\
  !*** ./src/resources/data/events.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Events": function() { return /* binding */ Events; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _dataServices__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dataServices */ 5086);
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/utils */ 8741);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! moment */ 381);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_3__);
var _dec, _class;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }





var Events = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_dataServices__WEBPACK_IMPORTED_MODULE_1__.DataServices, _utils_utils__WEBPACK_IMPORTED_MODULE_2__.Utils), _dec(_class = /*#__PURE__*/function () {
  function Events(data, utils) {
    this.EVENTS_SERVICE = 'events';
    this.data = data;
    this.utils = utils;
  }

  var _proto = Events.prototype;

  _proto.getEventsArray = /*#__PURE__*/function () {
    var _getEventsArray = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(options, refresh) {
      var url, serverResponse;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(!this.eventArray || refresh)) {
                _context.next = 13;
                break;
              }

              url = this.EVENTS_SERVICE;
              url += options ? options : "";
              _context.prev = 3;
              _context.next = 6;
              return this.data.get(url);

            case 6:
              serverResponse = _context.sent;

              if (!serverResponse.error) {
                if (Object.prototype.toString.call(serverResponse) == '[object Array]') {
                  this.eventArray = serverResponse;
                } else {
                  this.eventArray = new Array();
                  ;
                }
              } else {
                this.data.processError(serverResponse);
              }

              _context.next = 13;
              break;

            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](3);
              console.log(_context.t0);

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[3, 10]]);
    }));

    function getEventsArray(_x, _x2) {
      return _getEventsArray.apply(this, arguments);
    }

    return getEventsArray;
  }();

  _proto.getEventsPersonArray = /*#__PURE__*/function () {
    var _getEventsPersonArray = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(personId, refresh) {
      var url, serverResponse;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(!this.eventArray || refresh)) {
                _context2.next = 12;
                break;
              }

              url = this.EVENTS_SERVICE + "/" + personId;
              _context2.prev = 2;
              _context2.next = 5;
              return this.data.get(url);

            case 5:
              serverResponse = _context2.sent;

              if (!serverResponse.error) {
                if (Object.prototype.toString.call(serverResponse) == '[object Array]') {
                  this.eventArray = serverResponse;
                } else {
                  this.eventArray = new Array();
                  ;
                }
              } else {
                this.data.processError(serverResponse);
              }

              _context2.next = 12;
              break;

            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2["catch"](2);
              console.log(_context2.t0);

            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this, [[2, 9]]);
    }));

    function getEventsPersonArray(_x3, _x4) {
      return _getEventsPersonArray.apply(this, arguments);
    }

    return getEventsPersonArray;
  }();

  _proto.selectEvent = function selectEvent(index) {
    if (index === undefined) {
      this.selectedEvent = this.emptyEvent();
    } else {
      this.selectedEvent = this.utils.copyObject(this.eventArray[index]);
      this.editIndex = index;
    }
  };

  _proto.selectEventById = function selectEventById(eventId) {
    if (eventId == undefined) {
      this.selectedEvent = this.emptyEvent();
    } else {
      for (var i = 0; i < this.eventArray.length; i++) {
        if (this.eventArray[i]._id === eventId) {
          this.editIndex = i;
          this.selectedEvent = this.utils.copyObject(this.eventArray[i]);
          return;
        }
      }
    }

    this.selectedEvent = this.emptyEvent();
  };

  _proto.setEvent = function setEvent(event) {
    this.selectedEvent = this.utils.copyObject(event);
  };

  _proto.createEvent = function createEvent(event) {
    var obj = new Object();
    obj.title = event.eventTitle;
    obj.end = event.eventEnd;
    obj.start = event.eventStart;
    obj.eventType = "";
    obj.allDay = false;
    obj.notes = event.notes;
    obj.scope = event.scope ? "u" : "p";
    return obj;
  };

  _proto.emptyEvent = function emptyEvent() {
    var obj = new Object();
    obj.title = "";
    obj.eventType = "";
    obj.allDay = false;
    obj.notes = "";
    obj.scope = "p";
    return obj;
  };

  _proto.saveEvent = /*#__PURE__*/function () {
    var _saveEvent = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var response, _response;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (this.selectedEvent._id) {
                _context3.next = 8;
                break;
              }

              _context3.next = 3;
              return this.data.saveObject(this.selectedEvent, this.EVENTS_SERVICE, "post");

            case 3:
              response = _context3.sent;

              if (!response.error) {
                if (this.eventArray) {
                  this.selectedEvent = response;
                  this.eventArray.push(response);
                }
              } else {
                this.data.processError(response, "There was an error creating the event.");
              }

              return _context3.abrupt("return", response);

            case 8:
              _context3.next = 10;
              return this.data.saveObject(this.selectedEvent, this.EVENTS_SERVICE, "put");

            case 10:
              _response = _context3.sent;

              if (!_response.error) {
                if (this.eventArray) {
                  this.eventArray[this.editIndex] = this.utils.copyObject(this.selectedEvent, this.eventArray[this.editIndex]);
                }
              }

              return _context3.abrupt("return", _response);

            case 13:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function saveEvent() {
      return _saveEvent.apply(this, arguments);
    }

    return saveEvent;
  }();

  _proto.deleteEvent = /*#__PURE__*/function () {
    var _deleteEvent = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var serverResponse;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (!this.selectedEvent._id) {
                _context4.next = 6;
                break;
              }

              _context4.next = 3;
              return this.data.deleteObject(this.EVENTS_SERVICE + '/' + this.selectedEvent._id);

            case 3:
              serverResponse = _context4.sent;

              if (!serverResponse.error) {
                this.eventArray.splice(this.editIndex, 1);
                this.editIndex = -1;
              }

              return _context4.abrupt("return", serverResponse);

            case 6:
              return _context4.abrupt("return", null);

            case 7:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function deleteEvent() {
      return _deleteEvent.apply(this, arguments);
    }

    return deleteEvent;
  }();

  return Events;
}()) || _class);

/***/ }),

/***/ 8142:
/*!*******************************************!*\
  !*** ./src/resources/data/helpTickets.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HelpTickets": function() { return /* binding */ HelpTickets; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _dataServices__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dataServices */ 5086);
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/utils */ 8741);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! moment */ 381);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_4__);
var _dec, _class;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }






var HelpTickets = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_dataServices__WEBPACK_IMPORTED_MODULE_1__.DataServices, _utils_utils__WEBPACK_IMPORTED_MODULE_2__.Utils, _config_appConfig__WEBPACK_IMPORTED_MODULE_3__.AppConfig), _dec(_class = /*#__PURE__*/function () {
  //Is the selected product a new product
  //Index of selected product
  function HelpTickets(data, utils, config) {
    this.newHelpTicket = false;
    this.editIndex = void 0;
    this.HELP_TICKET_SERVICES = 'helpTickets';
    this.HELP_TICKET_CONTENT_SERVICES = "helpTickets/content/HELPTICKETID/STATUS";
    this.HELP_TICKET_LOCK_SERVICES = "helpTicketLocks";
    this.HELP_TICKET_TYPES = "helpTicketsTypes";
    this.HELP_TICKET_EMAIL = "helpTickets/sendMail";
    this.NOTIFICATION_SERVICES = "notifications";
    this.data = data;
    this.utils = utils;
    this.config = config;
  }

  var _proto = HelpTickets.prototype;

  _proto.getHelpTicketArray = /*#__PURE__*/function () {
    var _getHelpTicketArray = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(options, refresh) {
      var url, serverResponse;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(!this.helpTicketsArray || refresh)) {
                _context.next = 13;
                break;
              }

              url = this.HELP_TICKET_SERVICES;
              url += options ? options : "";
              _context.prev = 3;
              _context.next = 6;
              return this.data.get(url);

            case 6:
              serverResponse = _context.sent;

              if (!serverResponse.error) {
                this.helpTicketsArray = serverResponse;
              }

              _context.next = 13;
              break;

            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](3);
              console.log(_context.t0);

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[3, 10]]);
    }));

    function getHelpTicketArray(_x, _x2) {
      return _getHelpTicketArray.apply(this, arguments);
    }

    return getHelpTicketArray;
  }();

  _proto.getMyHelpTickets = /*#__PURE__*/function () {
    var _getMyHelpTickets = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id) {
      var serverResponse;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this.data.get(this.HELP_TICKET_SERVICES + '/mine/' + id);

            case 2:
              serverResponse = _context2.sent;

              if (!serverResponse.error) {
                this.helpTicketsArray = serverResponse;
              }

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function getMyHelpTickets(_x3) {
      return _getMyHelpTickets.apply(this, arguments);
    }

    return getMyHelpTickets;
  }();

  _proto.getUserHelpTicketArray = /*#__PURE__*/function () {
    var _getUserHelpTicketArray = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(options, refresh) {
      var url, serverResponse;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!(!this.helpTicketsArray || refresh)) {
                _context3.next = 13;
                break;
              }

              url = this.HELP_TICKET_SERVICES + '/users';
              url += options ? options : "";
              _context3.prev = 3;
              _context3.next = 6;
              return this.data.get(url);

            case 6:
              serverResponse = _context3.sent;

              if (!serverResponse.error) {
                this.helpTicketsArray = serverResponse;
              }

              _context3.next = 13;
              break;

            case 10:
              _context3.prev = 10;
              _context3.t0 = _context3["catch"](3);
              console.log(_context3.t0);

            case 13:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this, [[3, 10]]);
    }));

    function getUserHelpTicketArray(_x4, _x5) {
      return _getUserHelpTicketArray.apply(this, arguments);
    }

    return getUserHelpTicketArray;
  }();

  _proto.getArchivedHelpTicketArray = /*#__PURE__*/function () {
    var _getArchivedHelpTicketArray = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(options, refresh) {
      var url, serverResponse;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (!(!this.helpTicketsArray || refresh)) {
                _context4.next = 13;
                break;
              }

              url = this.HELP_TICKET_SERVICES + '/archived';
              url += options ? options : "";
              _context4.prev = 3;
              _context4.next = 6;
              return this.data.get(url);

            case 6:
              serverResponse = _context4.sent;

              if (!serverResponse.error) {
                this.helpTicketsArray = serverResponse;
              }

              _context4.next = 13;
              break;

            case 10:
              _context4.prev = 10;
              _context4.t0 = _context4["catch"](3);
              console.log(_context4.t0);

            case 13:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this, [[3, 10]]);
    }));

    function getArchivedHelpTicketArray(_x6, _x7) {
      return _getArchivedHelpTicketArray.apply(this, arguments);
    }

    return getArchivedHelpTicketArray;
  }();

  _proto.getHelpTicketsArrayAnalytics = /*#__PURE__*/function () {
    var _getHelpTicketsArrayAnalytics = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(options, refresh) {
      var url, serverResponse;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (!(!this.requestsArray || refresh)) {
                _context5.next = 13;
                break;
              }

              url = this.HELP_TICKET_SERVICES + "/analytics";
              url += options ? options : "";
              _context5.prev = 3;
              _context5.next = 6;
              return this.data.get(url);

            case 6:
              serverResponse = _context5.sent;

              if (!serverResponse.error) {
                this.helpTicketArrayAnalytics = serverResponse;
              }

              _context5.next = 13;
              break;

            case 10:
              _context5.prev = 10;
              _context5.t0 = _context5["catch"](3);
              console.log(_context5.t0);

            case 13:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this, [[3, 10]]);
    }));

    function getHelpTicketsArrayAnalytics(_x8, _x9) {
      return _getHelpTicketsArrayAnalytics.apply(this, arguments);
    }

    return getHelpTicketsArrayAnalytics;
  }();

  _proto.getHelpTicket = /*#__PURE__*/function () {
    var _getHelpTicket = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(id) {
      var serverResponse;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (!id) {
                _context6.next = 13;
                break;
              }

              _context6.prev = 1;
              _context6.next = 4;
              return this.data.get(this.HELP_TICKET_SERVICES + "/" + id);

            case 4:
              serverResponse = _context6.sent;

              if (!serverResponse.error) {
                this.selectedHelpTicket = serverResponse;
              }

              return _context6.abrupt("return", serverResponse);

            case 9:
              _context6.prev = 9;
              _context6.t0 = _context6["catch"](1);
              console.log(_context6.t0);
              return _context6.abrupt("return", undefined);

            case 13:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this, [[1, 9]]);
    }));

    function getHelpTicket(_x10) {
      return _getHelpTicket.apply(this, arguments);
    }

    return getHelpTicket;
  }();

  _proto.getHelpTicketByNumber = /*#__PURE__*/function () {
    var _getHelpTicketByNumber = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(id) {
      var serverResponse;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              if (!id) {
                _context7.next = 13;
                break;
              }

              _context7.prev = 1;
              _context7.next = 4;
              return this.data.get(this.HELP_TICKET_SERVICES + "?filter=helpTicketNo|eq|" + id);

            case 4:
              serverResponse = _context7.sent;

              if (!serverResponse.error) {
                this.selectedHelpTicket = serverResponse[0];
              }

              return _context7.abrupt("return", serverResponse);

            case 9:
              _context7.prev = 9;
              _context7.t0 = _context7["catch"](1);
              console.log(_context7.t0);
              return _context7.abrupt("return", undefined);

            case 13:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this, [[1, 9]]);
    }));

    function getHelpTicketByNumber(_x11) {
      return _getHelpTicketByNumber.apply(this, arguments);
    }

    return getHelpTicketByNumber;
  }();

  _proto.getArchiveHelpTicket = /*#__PURE__*/function () {
    var _getArchiveHelpTicket = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(id) {
      var serverResponse;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              if (!id) {
                _context8.next = 13;
                break;
              }

              _context8.prev = 1;
              _context8.next = 4;
              return this.data.get(this.HELP_TICKET_SERVICES + "/archive" + "/" + id);

            case 4:
              serverResponse = _context8.sent;

              if (!serverResponse.error) {
                this.selectedHelpTicket = serverResponse;
              }

              return _context8.abrupt("return", serverResponse);

            case 9:
              _context8.prev = 9;
              _context8.t0 = _context8["catch"](1);
              console.log(_context8.t0);
              return _context8.abrupt("return", undefined);

            case 13:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this, [[1, 9]]);
    }));

    function getArchiveHelpTicket(_x12) {
      return _getArchiveHelpTicket.apply(this, arguments);
    }

    return getArchiveHelpTicket;
  }();

  _proto.setHelpTicket = function setHelpTicket(helpTicket) {
    if (!helpTicket) {
      this.emptyHelpTicket();
    } else {
      this.selectedHelpTicket = this.utils.copyObject(helpTicket);
    }
  };

  _proto.getCurrentCount = /*#__PURE__*/function () {
    var _getCurrentCount = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(options) {
      var url, response;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              url = this.HELP_TICKET_SERVICES + '/current/count';
              url += options ? "/" + options : "";
              _context9.next = 4;
              return this.data.get(url);

            case 4:
              response = _context9.sent;

              if (response.status) {
                _context9.next = 13;
                break;
              }

              this.newHelpTickets = this.utils.countItems(this.config.NEW_HELPTICKET_STATUS, 'helpTicketStatus', response);
              this.inProcessHelpTickets = this.utils.countItems(this.config.IN_PROCESS_HELPTICKET_STATUS, 'helpTicketStatus', response);
              this.underReviewHelpTickets = this.utils.countItems(this.config.UNDER_REVIEW_HELPTICKET_STATUS, 'helpTicketStatus', response);
              this.customerActionHelpTickets = this.utils.countItems(this.config.CUSTOMER_ACTION_HELPTICKET_STATUS, 'helpTicketStatus', response);
              return _context9.abrupt("return", response.count);

            case 13:
              return _context9.abrupt("return", null);

            case 14:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, this);
    }));

    function getCurrentCount(_x13) {
      return _getCurrentCount.apply(this, arguments);
    }

    return getCurrentCount;
  }();

  _proto.selectHelpTicket = function selectHelpTicket(index) {
    if (!index && index != 0) {
      this.emptyHelpTicket();
    } else {
      try {
        this.selectedHelpTicket = this.utils.copyObject(this.helpTicketsArray[index]);
        this.editIndex = index;
      } catch (error) {
        this.selectedHelpTicket = this.emptyHelpTicket();
      }
    }
  };

  _proto.updateHelpTicket = function updateHelpTicket(helpTicket) {
    for (var i = 0; i < this.helpTicketsArray.length; i++) {
      if (this.helpTicketsArray[i]._id === helpTicket._id) {
        this.helpTicketsArray[i] = this.utils.copyObject(helpTicket, this.helpTicketsArray[i]);
      }
    }
  };

  _proto.selectHelpTicketByID = function selectHelpTicketByID(id) {
    var _this = this;

    this.helpTicketsArray.forEach(function (item, index) {
      if (item._id === id) {
        _this.selectedHelpTicket = _this.utils.copyObject(item);
        _this.editIndex = index;
        return;
      }
    });
    return null;
  };

  _proto.emptyHelpTicket = function emptyHelpTicket() {
    var newHelpTicketObj = new Object();
    newHelpTicketObj.sessionId = "";
    newHelpTicketObj.type = "";
    newHelpTicketObj.courseId = "";
    newHelpTicketObj.personId = "";
    newHelpTicketObj.helpTicketType = "";
    newHelpTicketObj.helpTicketStatus = this.config.NEW_HELPTICKET_STATUS;
    newHelpTicketObj.priority = "0";
    newHelpTicketObj.content = new Array();
    newHelpTicketObj.owner = new Array();
    newHelpTicketObj.createdDate = new Date();
    newHelpTicketObj.modifiedDate = new Date();
    newHelpTicketObj.audit = new Array();
    newHelpTicketObj.audit.push({
      event: 'Created',
      eventDate: new Date()
    });
    this.selectedHelpTicket = newHelpTicketObj;
    this.emptyHelpTicketContent();
  };

  _proto.selectHelpTicketContent = function selectHelpTicketContent(index) {
    if (!index && index != 0) {
      this.emptyHelpTicketContent();
    } else {
      try {} catch (error) {
        console.log(error);
        this.emptyHelpTicketContent();
      }
    }
  };

  _proto.emptyHelpTicketContent = function emptyHelpTicketContent() {
    var newHelpTicketContent = new Object();
    newHelpTicketContent.type = 0;
    newHelpTicketContent.createdDate = new Date();
    newHelpTicketContent.helpTicketId = "";
    newHelpTicketContent.files = new Array();
    newHelpTicketContent.confidential = false;
    newHelpTicketContent.personId = "";
    newHelpTicketContent.content = {};
    newHelpTicketContent.content.comments = "";
    this.selectedHelpTicketContent = newHelpTicketContent;
  };

  _proto.getOwner = /*#__PURE__*/function () {
    var _getOwner = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(id) {
      var serverResponse;
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return this.data.get(this.HELP_TICKET_SERVICES + '/owner/' + id);

            case 2:
              serverResponse = _context10.sent;
              return _context10.abrupt("return", serverResponse);

            case 4:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, this);
    }));

    function getOwner(_x14) {
      return _getOwner.apply(this, arguments);
    }

    return getOwner;
  }();

  _proto.updateOwner = /*#__PURE__*/function () {
    var _updateOwner = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(obj) {
      var response;
      return regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              if (this.selectedHelpTicket) {
                _context11.next = 2;
                break;
              }

              return _context11.abrupt("return");

            case 2:
              _context11.next = 4;
              return this.data.saveObject(obj, this.HELP_TICKET_SERVICES + "/owner/" + this.selectedHelpTicket._id, "put");

            case 4:
              response = _context11.sent;

              if (!response.error) {
                this.selectedHelpTicket = response;
                this.updateHelpTicket(this.selectedHelpTicket);
              } else {
                this.data.processError(response, "There was an error updating the help ticket.");
              }

              return _context11.abrupt("return", response);

            case 7:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11, this);
    }));

    function updateOwner(_x15) {
      return _updateOwner.apply(this, arguments);
    }

    return updateOwner;
  }();

  _proto.updateStatus = /*#__PURE__*/function () {
    var _updateStatus = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(email) {
      var response;
      return regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              if (this.selectedHelpTicket) {
                _context12.next = 2;
                break;
              }

              return _context12.abrupt("return");

            case 2:
              _context12.next = 4;
              return this.data.saveObject(this.selectedHelpTicket, this.HELP_TICKET_SERVICES + "/status/" + this.selectedHelpTicket._id, "put");

            case 4:
              response = _context12.sent;

              if (!response.error) {
                this.helpTicketsArray[this.editIndex].helpTicketStatus = response.helpTicketStatus;
              } else {
                this.data.processError(response, "There was an error updating the help ticket.");
              }

              return _context12.abrupt("return", response);

            case 7:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12, this);
    }));

    function updateStatus(_x16) {
      return _updateStatus.apply(this, arguments);
    }

    return updateStatus;
  }();

  _proto.updateKeywords = /*#__PURE__*/function () {
    var _updateKeywords = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
      var response;
      return regeneratorRuntime.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              if (this.selectedHelpTicket) {
                _context13.next = 2;
                break;
              }

              return _context13.abrupt("return");

            case 2:
              _context13.next = 4;
              return this.data.saveObject(this.selectedHelpTicket, this.HELP_TICKET_SERVICES + "/keywords/" + this.selectedHelpTicket._id, "put");

            case 4:
              response = _context13.sent;

              if (!response.error) {
                this.helpTicketsArray[this.editIndex].keyWords = response.keyWords;
              } else {
                this.data.processError(response, "There was an error updating the help ticket.");
              }

              return _context13.abrupt("return", response);

            case 7:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13, this);
    }));

    function updateKeywords() {
      return _updateKeywords.apply(this, arguments);
    }

    return updateKeywords;
  }();

  _proto.reopenHelpTicket = /*#__PURE__*/function () {
    var _reopenHelpTicket = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
      var url, response;
      return regeneratorRuntime.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              if (this.selectedHelpTicket) {
                _context14.next = 2;
                break;
              }

              return _context14.abrupt("return");

            case 2:
              if (this.selectedHelpTicketContent) this.selectedHelpTicket.content.push(this.selectedHelpTicketContent);
              url = this.HELP_TICKET_SERVICES + '/reopen';
              _context14.next = 6;
              return this.data.saveObject(this.selectedHelpTicket, url, "put");

            case 6:
              response = _context14.sent;

              if (!response.error) {} else {
                this.data.processError(response, "There was an error updating the help ticket.");
              }

              return _context14.abrupt("return", response);

            case 9:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14, this);
    }));

    function reopenHelpTicket() {
      return _reopenHelpTicket.apply(this, arguments);
    }

    return reopenHelpTicket;
  }();

  _proto.closeHelpTicket = /*#__PURE__*/function () {
    var _closeHelpTicket = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15() {
      var response;
      return regeneratorRuntime.wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              if (this.selectedHelpTicket) {
                _context15.next = 2;
                break;
              }

              return _context15.abrupt("return");

            case 2:
              if (this.selectedHelpTicketContent) this.selectedHelpTicket.content.push(this.selectedHelpTicketContent);
              _context15.next = 5;
              return this.data.saveObject(this.selectedHelpTicket, this.HELP_TICKET_SERVICES + '/close', "put");

            case 5:
              response = _context15.sent;

              if (!response.error) {
                this.helpTicketsArray.splice(this.editIndex, 1);
              } else {
                this.data.processError(response, "There was an error updating the help ticket.");
              }

              return _context15.abrupt("return", response);

            case 8:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15, this);
    }));

    function closeHelpTicket() {
      return _closeHelpTicket.apply(this, arguments);
    }

    return closeHelpTicket;
  }();

  _proto.saveHelpTicket = /*#__PURE__*/function () {
    var _saveHelpTicket = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(email) {
      var url, response, HTNo, status;
      return regeneratorRuntime.wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              if (this.selectedHelpTicket) {
                _context16.next = 2;
                break;
              }

              return _context16.abrupt("return");

            case 2:
              url = this.HELP_TICKET_SERVICES;

              if (this.selectedHelpTicket._id) {
                _context16.next = 11;
                break;
              }

              _context16.next = 6;
              return this.data.saveObject(this.selectedHelpTicket, url, "post");

            case 6:
              response = _context16.sent;

              if (!response.error) {
                if (email && email.email) {
                  HTNo = response.helpTicketNo ? response.helpTicketNo : " ";
                  email.subject = email.subject.replace('[[No]]', HTNo);
                  email.MESSAGE = email.MESSAGE.replace('[[No]]', HTNo);
                  this.data.saveObject(email, this.HELP_TICKET_EMAIL, "post");
                }

                this.selectedHelpTicket = this.utils.copyObject(response);
                if (this.helpTicketsArray) this.helpTicketsArray.push(this.selectedHelpTicket);
              } else {
                this.data.processError(response, "There was an error creating the help ticket.");
              }

              return _context16.abrupt("return", response);

            case 11:
              status = this.selectedHelpTicket.helpTicketStatus;
              _context16.next = 14;
              return this.data.saveObject(this.selectedHelpTicket, url, "put");

            case 14:
              response = _context16.sent;

              if (!response.error) {
                if (email && email.email) {
                  this.selectedHelpTicket = this.utils.copyObject(response);
                  this.data.saveObject(email, this.HELP_TICKET_EMAIL, "post");
                }

                this.selectHelpTicketByID(this.selectedHelpTicket._id);

                if (status !== this.config.CLOSED_HELPTICKET_STATUS) {
                  // this.updateHelpTicket(this.selectedHelpTicket);
                  this.helpTicketsArray[this.editIndex] = this.utils.copyObject(response, this.helpTicketsArray[this.editIndex]);
                } else {
                  this.helpTicketsArray.splice(this.editIndex, 1);
                }
              } else {
                this.data.processError(response, "There was an error updating the help ticket.");
              }

              return _context16.abrupt("return", response);

            case 17:
            case "end":
              return _context16.stop();
          }
        }
      }, _callee16, this);
    }));

    function saveHelpTicket(_x17) {
      return _saveHelpTicket.apply(this, arguments);
    }

    return saveHelpTicket;
  }();

  _proto.saveHelpTicketResponse = /*#__PURE__*/function () {
    var _saveHelpTicketResponse = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(email) {
      var url, response;
      return regeneratorRuntime.wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              if (!this.selectedHelpTicket._id) {
                _context17.next = 7;
                break;
              }

              url = this.HELP_TICKET_CONTENT_SERVICES.replace("HELPTICKETID", this.selectedHelpTicket._id).replace("STATUS", this.selectedHelpTicket.helpTicketStatus);
              _context17.next = 4;
              return this.data.saveObject(this.selectedHelpTicketContent, url, "put");

            case 4:
              response = _context17.sent;

              if (!response.error) {
                if (!this.selectedHelpTicketContent.confidential && email.email) this.data.saveObject(email, this.HELP_TICKET_EMAIL, "post");
                this.selectedHelpTicket = this.utils.copyObject(response);
                this.updateHelpTicket(this.selectedHelpTicket); // this.helpTicketsArray[this.editIndex] = this.utils.copyObject(this.selectedHelpTicket, this.helpTicketsArray[this.editIndex]);
              } else {
                this.data.processError(response, "There was an error updating the help ticket.");
              }

              return _context17.abrupt("return", response);

            case 7:
            case "end":
              return _context17.stop();
          }
        }
      }, _callee17, this);
    }));

    function saveHelpTicketResponse(_x18) {
      return _saveHelpTicketResponse.apply(this, arguments);
    }

    return saveHelpTicketResponse;
  }();

  _proto.saveHelpTicketResponseAndCLose = /*#__PURE__*/function () {
    var _saveHelpTicketResponseAndCLose = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18(email) {
      var url, response;
      return regeneratorRuntime.wrap(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              if (!this.selectedHelpTicket._id) {
                _context18.next = 7;
                break;
              }

              url = this.HELP_TICKET_CONTENT_SERVICES.replace("HELPTICKETID", this.selectedHelpTicket._id).replace("STATUS", this.selectedHelpTicket.helpTicketStatus);
              _context18.next = 4;
              return this.data.saveObject(this.selectedHelpTicketContent, url, "put");

            case 4:
              response = _context18.sent;

              if (!response.error) {
                if (!this.selectedHelpTicketContent.confidential && email.email) this.data.saveObject(email, this.HELP_TICKET_EMAIL, "post");
                this.selectedHelpTicket = this.utils.copyObject(response);
                this.updateHelpTicket(this.selectedHelpTicket);
                this.helpTicketsArray[this.editIndex] = this.utils.copyObject(this.selectedHelpTicket, this.helpTicketsArray[this.editIndex]);
              } else {
                this.data.processError(response, "There was an error updating the help ticket.");
              }

              return _context18.abrupt("return", response);

            case 7:
            case "end":
              return _context18.stop();
          }
        }
      }, _callee18, this);
    }));

    function saveHelpTicketResponseAndCLose(_x19) {
      return _saveHelpTicketResponseAndCLose.apply(this, arguments);
    }

    return saveHelpTicketResponseAndCLose;
  }();

  _proto.saveNotification = function saveNotification(notice) {
    this.data.saveObject(notice, this.NOTIFICATION_SERVICES, "post");
  };

  _proto.isHelpTicketDirty = function isHelpTicketDirty(obj, skip) {
    if (this.selectedHelpTicket) {
      if (!this.selectedHelpTicket._id) {
        //     var obj = obj ? this.helpTicketsArray[this.editIndex] : obj;
        // } else {
        var obj = this.emptyHelpTicket();
      }

      return this.utils.objectsEqual(this.selectedHelpTicket, obj, skip);
    }

    return new Array();
  };

  _proto.uploadFile = /*#__PURE__*/function () {
    var _uploadFile = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19(files, content) {
      var response;
      return regeneratorRuntime.wrap(function _callee19$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              _context19.next = 2;
              return this.data.uploadFiles(files, this.HELP_TICKET_SERVICES + "/upload/" + this.selectedHelpTicket._id + '/' + this.selectedHelpTicket.helpTicketNo + '/' + content);

            case 2:
              response = _context19.sent;

              if (!response.error) {
                if (this.selectedHelpTicket) this.selectedHelpTicket = this.utils.copyObject(response);
                if (this.helpTicketsArray && this.editIndex) this.updateHelpTicket(this.selectHelpTicket); // this.helpTicketsArray[this.editIndex] = this.utils.copyObject(this.selectedHelpTicket, this.helpTicketsArray[this.editIndex]);
              }

            case 4:
            case "end":
              return _context19.stop();
          }
        }
      }, _callee19, this);
    }));

    function uploadFile(_x20, _x21) {
      return _uploadFile.apply(this, arguments);
    }

    return uploadFile;
  }();

  _proto.uploadFileArchive = /*#__PURE__*/function () {
    var _uploadFileArchive = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20(files, content) {
      var response;
      return regeneratorRuntime.wrap(function _callee20$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              _context20.next = 2;
              return this.data.uploadFiles(files, this.HELP_TICKET_SERVICES + "/uploadArchive/" + this.selectedHelpTicket._id + '/' + this.selectedHelpTicket.helpTicketNo + '/' + content);

            case 2:
              response = _context20.sent;

              if (!response.error) {
                if (this.selectedHelpTicket) this.selectedHelpTicket = this.utils.copyObject(response);
                if (this.helpTicketsArray && this.editIndex) this.updateHelpTicket(this.selectHelpTicket); // this.helpTicketsArray[this.editIndex] = this.utils.copyObject(this.selectedHelpTicket, this.helpTicketsArray[this.editIndex]);
              }

            case 4:
            case "end":
              return _context20.stop();
          }
        }
      }, _callee20, this);
    }));

    function uploadFileArchive(_x22, _x23) {
      return _uploadFileArchive.apply(this, arguments);
    }

    return uploadFileArchive;
  }();

  _proto.calcHelpTicketAges = function calcHelpTicketAges() {
    var _this2 = this;

    this.helpTickeAges = {
      today: [0, 0],
      yesterday: [0, 0],
      oneWeek: [0, 0],
      twoWeeks: [0, 0],
      older: [0, 0]
    };
    var today = moment__WEBPACK_IMPORTED_MODULE_4___default()(new Date());
    this.helpTicketsArray.forEach(function (item) {
      // let index = item.owner[0].personId === null ? 1 : 0;
      var ageCreated = today.diff(moment__WEBPACK_IMPORTED_MODULE_4___default()(item.createdDate), 'days');
      var ageModifed = today.diff(moment__WEBPACK_IMPORTED_MODULE_4___default()(item.modifiedDate), 'days');

      if (ageCreated === 0) {
        _this2.helpTickeAges.today[0] += 1;
      } else if (ageCreated === 1) {
        _this2.helpTickeAges.yesterday[0] += 1;
      } else if (ageCreated <= 7) {
        _this2.helpTickeAges.oneWeek[0] += 1;
      } else if (ageCreated <= 14) {
        _this2.helpTickeAges.twoWeeks[0] += 1;
      } else {
        _this2.helpTickeAges.older[0] += 1;
      }

      if (ageModifed === 0) {
        _this2.helpTickeAges.today[1] += 1;
      } else if (ageModifed === 1) {
        _this2.helpTickeAges.yesterday[1] += 1;
      } else if (ageModifed <= 7) {
        _this2.helpTickeAges.oneWeek[1] += 1;
      } else if (ageModifed <= 14) {
        _this2.helpTickeAges.twoWeeks[1] += 1;
      } else {
        _this2.helpTickeAges.older[1] += 1;
      }
    });
  };

  _proto.getHelpTicketTypes = /*#__PURE__*/function () {
    var _getHelpTicketTypes = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee21(options, refresh) {
      var url, serverResponse;
      return regeneratorRuntime.wrap(function _callee21$(_context21) {
        while (1) {
          switch (_context21.prev = _context21.next) {
            case 0:
              if (!(!this.helpTicketTypesArray || refresh)) {
                _context21.next = 13;
                break;
              }

              url = this.HELP_TICKET_TYPES;
              url += options ? options : "";
              _context21.prev = 3;
              _context21.next = 6;
              return this.data.get(url);

            case 6:
              serverResponse = _context21.sent;

              if (!serverResponse.error) {
                this.helpTicketTypesArray = serverResponse.sort(function (a, b) {
                  return a.category < b.category ? 0 : -1;
                });
              }

              _context21.next = 13;
              break;

            case 10:
              _context21.prev = 10;
              _context21.t0 = _context21["catch"](3);
              console.log(_context21.t0);

            case 13:
            case "end":
              return _context21.stop();
          }
        }
      }, _callee21, this, [[3, 10]]);
    }));

    function getHelpTicketTypes(_x24, _x25) {
      return _getHelpTicketTypes.apply(this, arguments);
    }

    return getHelpTicketTypes;
  }();

  _proto.selectHelpTicketTypeCategory = function selectHelpTicketTypeCategory(index) {
    if (!index && index != 0) {
      this.selectedHelpTicketType = this.emptyHelpTicketType();
    } else {
      try {
        this.selectedHelpTicketType = this.utils.copyObject(this.helpTicketTypesArray[index]);
        this.editTypeIndex = index;
      } catch (error) {
        this.selectedHelpTicket = this.emptyHelpTicketType();
      }
    }
  };

  _proto.emptyHelpTicketType = function emptyHelpTicketType() {
    var obj = new Object();
    return obj;
  };

  _proto.saveHelpTicketType = /*#__PURE__*/function () {
    var _saveHelpTicketType = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee22() {
      var url, response;
      return regeneratorRuntime.wrap(function _callee22$(_context22) {
        while (1) {
          switch (_context22.prev = _context22.next) {
            case 0:
              if (this.selectedHelpTicketType) {
                _context22.next = 2;
                break;
              }

              return _context22.abrupt("return");

            case 2:
              url = this.HELP_TICKET_TYPES;

              if (this.selectedHelpTicketType._id) {
                _context22.next = 11;
                break;
              }

              _context22.next = 6;
              return this.data.saveObject(this.selectedHelpTicket, url, "post");

            case 6:
              response = _context22.sent;

              if (!response.error) {
                this.selectedHelpTicketType = this.utils.copyObject(response);
                if (this.helpTicketTypesArray) this.helpTicketTypesArray.push(this.selectedHelpTicketType);
              } else {
                this.data.processError(response, "There was an error creating the help ticket type.");
              }

              return _context22.abrupt("return", response);

            case 11:
              _context22.next = 13;
              return this.data.saveObject(this.selectedHelpTicketType, url, "put");

            case 13:
              response = _context22.sent;

              if (!response.error) {
                this.selectedHelpTicketType = this.utils.copyObject(response);
                this.helpTicketTypesArray[this.editTypeIndex] = this.utils.copyObject(this.selectedHelpTicketType, this.helpTicketTypesArray[this.editTypeIndex]);
              } else {
                this.data.processError(response, "There was an error updating the help ticket type.");
              }

              return _context22.abrupt("return", response);

            case 16:
            case "end":
              return _context22.stop();
          }
        }
      }, _callee22, this);
    }));

    function saveHelpTicketType() {
      return _saveHelpTicketType.apply(this, arguments);
    }

    return saveHelpTicketType;
  }();

  _proto.countHelpTicketsStatus = /*#__PURE__*/function () {
    var _countHelpTicketsStatus = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee23(status) {
      var response;
      return regeneratorRuntime.wrap(function _callee23$(_context23) {
        while (1) {
          switch (_context23.prev = _context23.next) {
            case 0:
              _context23.next = 2;
              return this.data.get(this.HELP_TICKET_SERVICES + '/count/' + status);

            case 2:
              response = _context23.sent;
              return _context23.abrupt("return", response);

            case 4:
            case "end":
              return _context23.stop();
          }
        }
      }, _callee23, this);
    }));

    function countHelpTicketsStatus(_x26) {
      return _countHelpTicketsStatus.apply(this, arguments);
    }

    return countHelpTicketsStatus;
  }();

  _proto.groupRequestsByType = function groupRequestsByType() {
    var _this3 = this;

    if (!this.helpTicketArrayAnalytics) {
      return;
    }

    var sortedArray = this.helpTicketArrayAnalytics.sort(function (a, b) {
      var result = a.helpTicketType < b.helpTicketType ? -1 : a.helpTicketType > b.helpTicketType ? 1 : 0;
      return result;
    });
    this.helpTicketTypeArrayAnalytics = new Array();
    var type = "";
    var templateObj = new Object({
      helpTicketType: "",
      count: 0
    });
    sortedArray.forEach(function (item) {
      if (item.helpTicketType != type) {
        type = item.helpTicketType;

        var obj = _this3.utils.copyObject(templateObj);

        obj.helpTicketType = item.helpTicketType;

        _this3.helpTicketTypeArrayAnalytics.push(obj);
      }

      _this3.helpTicketTypeArrayAnalytics[_this3.helpTicketTypeArrayAnalytics.length - 1].count += 1;
    });
  };

  _proto.groupRequestsByCurriculum = function groupRequestsByCurriculum() {
    var _this4 = this;

    if (!this.helpTicketArrayAnalytics) {
      return;
    }

    var filteredArray = this.helpTicketArrayAnalytics.filter(function (item) {
      return item.content[0].content.curriculumTitle != undefined;
    });
    var sortedArray = filteredArray.sort(function (a, b) {
      var result = a.content[0].content.curriculumTitle < b.content[0].content.curriculumTitle ? -1 : a.content[0].content.curriculumTitle > b.content[0].content.curriculumTitle ? 1 : 0;
      return result;
    });
    this.helpTicketCurriculumArrayAnalytics = new Array();
    var type = "";
    var templateObj = new Object({
      curriculum: "",
      count: 0
    });
    sortedArray.forEach(function (item) {
      if (item.content[0].content.curriculumTitle != type) {
        type = item.content[0].content.curriculumTitle;

        var obj = _this4.utils.copyObject(templateObj);

        obj.curriculumTitle = item.content[0].content.curriculumTitle;

        _this4.helpTicketCurriculumArrayAnalytics.push(obj);
      }

      if (_this4.helpTicketCurriculumArrayAnalytics[_this4.helpTicketCurriculumArrayAnalytics.length - 1]) _this4.helpTicketCurriculumArrayAnalytics[_this4.helpTicketCurriculumArrayAnalytics.length - 1].count += 1;
    });
  };

  _proto.groupHelpTicketsByInstitution = function groupHelpTicketsByInstitution() {
    var _this5 = this;

    if (!this.helpTicketArrayAnalytics) {
      return;
    }

    var sortedArray = this.helpTicketArrayAnalytics.sort(function (a, b) {
      var result = a.institutionId.name < b.institutionId.name ? -1 : a.institutionId.name > b.institutionId.name ? 1 : 0;
      return result;
    });
    this.helpTicketInstitutionArrayAnalytics = new Array();
    var type = "";
    var templateObj = new Object({
      institution: "",
      count: 0
    });
    sortedArray.forEach(function (item) {
      if (item.institutionId.name != type) {
        type = item.institutionId.name;

        var obj = _this5.utils.copyObject(templateObj);

        obj.institution = item.institutionId.name;

        _this5.helpTicketInstitutionArrayAnalytics.push(obj);
      }

      if (_this5.helpTicketInstitutionArrayAnalytics[_this5.helpTicketInstitutionArrayAnalytics.length - 1]) _this5.helpTicketInstitutionArrayAnalytics[_this5.helpTicketInstitutionArrayAnalytics.length - 1].count += 1;
    });
  };

  _proto.groupHelpTicketsByPeople = function groupHelpTicketsByPeople() {
    var _this6 = this;

    if (!this.helpTicketArrayAnalytics) {
      return;
    }

    var sortedArray = this.helpTicketArrayAnalytics.sort(function (a, b) {
      if (!a['personId'] || !b['personId']) return -1;
      var result = a.personId.fullName < b.personId.fullName ? -1 : a.personId.fullName > b.personId.fullName ? 1 : 0;
      return result;
    });
    this.helpTicketPeopleArrayAnalytics = new Array();
    var type = "";
    var templateObj = new Object({
      name: "",
      count: 0
    });
    sortedArray.forEach(function (item) {
      if (item.personId) {
        if (item.personId.fullName != type) {
          type = item.personId.fullName;

          var obj = _this6.utils.copyObject(templateObj);

          obj.name = item.personId.fullName;

          _this6.helpTicketPeopleArrayAnalytics.push(obj);
        }

        if (_this6.helpTicketPeopleArrayAnalytics[_this6.helpTicketPeopleArrayAnalytics.length - 1]) _this6.helpTicketPeopleArrayAnalytics[_this6.helpTicketPeopleArrayAnalytics.length - 1].count += 1;
      }
    });
  };

  _proto.groupHelpTicketsByStatus = function groupHelpTicketsByStatus() {
    var _this7 = this;

    if (!this.helpTicketArrayAnalytics) {
      return;
    }

    var sortedArray = this.helpTicketArrayAnalytics.sort(function (a, b) {
      var result = a.helpTicketStatus < b.helpTicketStatus ? -1 : a.helpTicketStatus > b.helpTicketStatus ? 1 : 0;
      return result;
    });
    this.helpTicketStatusArrayAnalytics = new Array();
    var type = "";
    var templateObj = new Object({
      helpTicketStatus: "",
      count: 0
    });
    sortedArray.forEach(function (item) {
      if (item.helpTicketStatus != type) {
        type = item.helpTicketStatus;

        var obj = _this7.utils.copyObject(templateObj);

        obj.helpTicketStatus = item.helpTicketStatus;

        _this7.helpTicketStatusArrayAnalytics.push(obj);
      }

      if (_this7.helpTicketStatusArrayAnalytics[_this7.helpTicketStatusArrayAnalytics.length - 1]) _this7.helpTicketStatusArrayAnalytics[_this7.helpTicketStatusArrayAnalytics.length - 1].count += 1;
    });
  };

  _proto.archiveSearch = /*#__PURE__*/function () {
    var _archiveSearch = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee24(searchObj, collection) {
      var url, resultArray, response;
      return regeneratorRuntime.wrap(function _callee24$(_context24) {
        while (1) {
          switch (_context24.prev = _context24.next) {
            case 0:
              if (!searchObj) {
                _context24.next = 12;
                break;
              }

              url = this.HELP_TICKET_SERVICES + "/archive" + (collection ? '/' + collection : '');
              resultArray = new Array();
              _context24.next = 5;
              return this.data.saveObject(searchObj, url, "post");

            case 5:
              response = _context24.sent;

              if (response.error) {
                _context24.next = 11;
                break;
              }

              resultArray = response;
              return _context24.abrupt("return", resultArray);

            case 11:
              return _context24.abrupt("return", new Array());

            case 12:
            case "end":
              return _context24.stop();
          }
        }
      }, _callee24, this);
    }));

    function archiveSearch(_x27, _x28) {
      return _archiveSearch.apply(this, arguments);
    }

    return archiveSearch;
  }();

  _proto.advancedSearch = function advancedSearch(searchObj) {
    var resultArray = this.utils.copyArray(this.helpTicketsArray);

    if (searchObj.helpTicketNo.length > 0) {
      resultArray = resultArray.filter(function (item) {
        return item.helpTicketNo == searchObj.helpTicketNo;
      });
    } else {
      //Dates
      if (searchObj.dateRange && searchObj.dateRange.dateFrom !== "" && searchObj.dateRange.dateFrom !== "Invalid date") {
        if (!searchObj.dateRange.dateTo || searchObj.dateRange.dateTo == "Invalid date") {
          resultArray = resultArray.filter(function (item) {
            var dt = moment__WEBPACK_IMPORTED_MODULE_4___default()(item.createdDate).format('YYYY-MM-DD');
            return moment__WEBPACK_IMPORTED_MODULE_4___default()(item.createdDate).isAfter(searchObj.dateRange.dateFrom);
          });
        } else {
          resultArray = resultArray.filter(function (item) {
            var dt = moment__WEBPACK_IMPORTED_MODULE_4___default()(item.createdDate).format('YYYY-MM-DD');
            return moment__WEBPACK_IMPORTED_MODULE_4___default()(item.createdDate).isAfter(searchObj.dateRange.dateFrom) && moment__WEBPACK_IMPORTED_MODULE_4___default()(item.createdDate).isBefore(searchObj.dateRange.dateTo);
          });
        }
      } //Status


      if (searchObj.status && searchObj.status.length > 0) {
        for (var i = 0; i < searchObj.status.length; i++) {
          searchObj.status[i] = parseInt(searchObj.status[i]);
        }

        resultArray = resultArray.filter(function (item) {
          return searchObj.status.indexOf(item.helpTicketStatus) > -1;
        });
      } //Keywords


      if (searchObj.keyWords && searchObj.keyWords.length > 0) {
        var searchKeyword = searchObj.keyWords.toUpperCase();
        resultArray = resultArray.filter(function (item) {
          if (item.keyWords) {
            var htKeyword = item.keyWords.toUpperCase();
            return htKeyword.indexOf(searchKeyword) > -1;
          } else {
            return false;
          }
        });
      } //Content


      if (searchObj.content && searchObj.content.length > 0) {
        var searchContent = searchObj.content.toUpperCase();
        resultArray = resultArray.filter(function (item) {
          for (var i = 0; i < item.content.length; i++) {
            if (item.content[i].content.comments.toUpperCase().indexOf(searchContent) > -1) {
              return true;
            }
          }

          return false;
        });
      } //Type


      if (searchObj.type && searchObj.type != -1) {
        resultArray = resultArray.filter(function (item) {
          return searchObj.type == item.helpTicketType;
        });
      } //Products


      if (searchObj.productIds && searchObj.productIds.length > 0) {
        resultArray = resultArray.filter(function (item) {
          return searchObj.productIds.indexOf(item.productId) > -1;
        });
      } //People


      if (searchObj.peopleIds && searchObj.peopleIds.length > 0) {
        resultArray = resultArray.filter(function (item) {
          return searchObj.peopleIds.indexOf(item.personId._id) > -1;
        });
      } //Instituions


      if (searchObj.institutionIds && searchObj.institutionIds.length > 0) {
        resultArray = resultArray.filter(function (item) {
          return searchObj.institutionIds.indexOf(item.institutionId._id) > -1;
        });
      }
    }

    return resultArray;
  };

  _proto.lockHelpTicket = function lockHelpTicket(obj) {
    if (obj.helpTicketId) {
      var response = this.data.saveObject(obj, this.HELP_TICKET_LOCK_SERVICES, "post");
    }
  };

  _proto.getHelpTicketLock = /*#__PURE__*/function () {
    var _getHelpTicketLock = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee25(id) {
      var response;
      return regeneratorRuntime.wrap(function _callee25$(_context25) {
        while (1) {
          switch (_context25.prev = _context25.next) {
            case 0:
              _context25.next = 2;
              return this.data.get(this.HELP_TICKET_LOCK_SERVICES + "/" + id);

            case 2:
              response = _context25.sent;

              if (response.error) {
                _context25.next = 7;
                break;
              }

              return _context25.abrupt("return", response);

            case 7:
              this.data.processError(response, "There was an error retrieving the help ticket lock.");

            case 8:
            case "end":
              return _context25.stop();
          }
        }
      }, _callee25, this);
    }));

    function getHelpTicketLock(_x29) {
      return _getHelpTicketLock.apply(this, arguments);
    }

    return getHelpTicketLock;
  }();

  _proto.removeHelpTicketLock = function removeHelpTicketLock(id) {
    var response = this.data.deleteObject(this.HELP_TICKET_LOCK_SERVICES + "/" + id);
  };

  _proto.archiveHelpTickets = /*#__PURE__*/function () {
    var _archiveHelpTickets = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee26() {
      var response;
      return regeneratorRuntime.wrap(function _callee26$(_context26) {
        while (1) {
          switch (_context26.prev = _context26.next) {
            case 0:
              _context26.next = 2;
              return this.data.saveObject({}, this.HELP_TICKET_SERVICES + '/archiveClosed', "post");

            case 2:
              response = _context26.sent;
              return _context26.abrupt("return", response);

            case 4:
            case "end":
              return _context26.stop();
          }
        }
      }, _callee26, this);
    }));

    function archiveHelpTickets() {
      return _archiveHelpTickets.apply(this, arguments);
    }

    return archiveHelpTickets;
  }();

  return HelpTickets;
}()) || _class);

/***/ }),

/***/ 5151:
/*!*****************************************!*\
  !*** ./src/resources/data/inventory.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Inventory": function() { return /* binding */ Inventory; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _dataServices__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dataServices */ 5086);
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/utils */ 8741);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
var _dec, _class;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }





var Inventory = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_dataServices__WEBPACK_IMPORTED_MODULE_1__.DataServices, _utils_utils__WEBPACK_IMPORTED_MODULE_2__.Utils, _config_appConfig__WEBPACK_IMPORTED_MODULE_3__.AppConfig), _dec(_class = /*#__PURE__*/function () {
  function Inventory(data, utils, config) {
    this.INVENTORY_SERVICE = 'inventory';
    this.data = data;
    this.utils = utils;
    this.config = config;
  } //Downloads


  var _proto = Inventory.prototype;

  _proto.getInventoryArray =
  /*#__PURE__*/
  function () {
    var _getInventoryArray = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(options, refresh) {
      var url, serverResponse;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(!this.inventoryArray || refresh)) {
                _context.next = 18;
                break;
              }

              url = this.INVENTORY_SERVICE;
              url += options ? options : "";
              _context.prev = 3;
              _context.next = 6;
              return this.data.get(url);

            case 6:
              serverResponse = _context.sent;

              if (serverResponse.error) {
                _context.next = 11;
                break;
              }

              this.inventoryArray = serverResponse;
              _context.next = 12;
              break;

            case 11:
              return _context.abrupt("return", undefined);

            case 12:
              _context.next = 18;
              break;

            case 14:
              _context.prev = 14;
              _context.t0 = _context["catch"](3);
              console.log(_context.t0);
              return _context.abrupt("return", undefined);

            case 18:
              return _context.abrupt("return", this.inventoryArray);

            case 19:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[3, 14]]);
    }));

    function getInventoryArray(_x, _x2) {
      return _getInventoryArray.apply(this, arguments);
    }

    return getInventoryArray;
  }();

  _proto.selectInventory = function selectInventory(index) {
    if (!index && index != 0) {
      this.selectedInventory = this.emptyInventory();
    } else {
      try {
        this.selectedInventory = this.utils.copyObject(this.inventoryArray[index]);
        this.selectedIndex = index;
      } catch (error) {
        this.selectedInventory = this.emptyInventory();
      }
    }
  };

  _proto.emptyInventory = function emptyInventory() {
    var newObj = new Object();
    newObj.IPAddress = new Array();
    return newObj;
  };

  _proto.saveInventory = /*#__PURE__*/function () {
    var _saveInventory = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var _serverResponse, serverResponse;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (this.selectedInventory) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return");

            case 2:
              if (this.selectedInventory._id) {
                _context2.next = 10;
                break;
              }

              _context2.next = 5;
              return this.data.saveObject(this.selectedInventory, this.INVENTORY_SERVICE, "post");

            case 5:
              _serverResponse = _context2.sent;

              if (!_serverResponse.error) {
                this.selectedInventory = _serverResponse;
                this.inventoryArray.push(this.selectedInventory);
                this.selectedIndex = this.inventoryArray.length - 1;
              }

              return _context2.abrupt("return", _serverResponse);

            case 10:
              _context2.next = 12;
              return this.data.saveObject(this.selectedInventory, this.INVENTORY_SERVICE, "put");

            case 12:
              serverResponse = _context2.sent;

              if (!serverResponse.error) {
                this.inventoryArray[this.selectedIndex] = this.utils.copyObject(this.selectedInventory, this.inventoryArray[this.selectedIndex]);
              }

              return _context2.abrupt("return", serverResponse);

            case 15:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function saveInventory() {
      return _saveInventory.apply(this, arguments);
    }

    return saveInventory;
  }();

  _proto.isDirty = function isDirty(obj) {
    if (this.selectedInventory) {
      if (!obj) {
        var obj = this.emptyInventory();
      }

      var skip = ['file'];
      return this.utils.objectsEqual(this.selectedInventory, obj, skip);
    }

    return new Array();
  };

  _proto.deleteInventory = /*#__PURE__*/function () {
    var _deleteInventory = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var response;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (this.selectedInventory._id) {
                response = this.data.deleteObject(this.INVENTORY_SERVICE + "/" + this.selectedInventory._id);
              }

            case 1:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function deleteInventory() {
      return _deleteInventory.apply(this, arguments);
    }

    return deleteInventory;
  }();

  return Inventory;
}()) || _class);

/***/ }),

/***/ 5175:
/*!*************************************!*\
  !*** ./src/resources/data/is4ua.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "is4ua": function() { return /* binding */ is4ua; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _dataServices__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dataServices */ 5086);
var _dec, _class;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



var is4ua = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_dataServices__WEBPACK_IMPORTED_MODULE_1__.DataServices), _dec(_class = /*#__PURE__*/function () {
  function is4ua(data) {
    this.data = data;
  }

  var _proto = is4ua.prototype;

  _proto.loadIs4ua = /*#__PURE__*/function () {
    var _loadIs4ua = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var responses;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.data.get(this.data.IS4UA);

            case 2:
              responses = _context.sent;
              this.personStatusArray = responses[0].personStatus;
              this.deptArray = responses[0].deptCat;
              this.specialArray = responses[0].personSpecialization;
              this.sapProductsArray = responses[0].sapProducts;
              this.uaCurriculumArray = responses[0].uaCurriculum;
              this.uaDataSetsArray = responses[0].uaDatasets;
              this.institutonStatusArray = responses[0].institutionStatus;
              this.institutionTypes = responses[0].institutionTypes;
              this.memberTypes = responses[0].memberTypes;
              this.highestDegrees = responses[0].highestDegree; // }

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function loadIs4ua() {
      return _loadIs4ua.apply(this, arguments);
    }

    return loadIs4ua;
  }();

  _proto.loadProductKeys = /*#__PURE__*/function () {
    var _loadProductKeys = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var responses;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return Promise.all([this.data.getAllObjects(this.data.SAP_PRODUCTS), this.data.getAllObjects(this.data.UA_CURRICULUM), this.data.getAllObjects(this.data.UA_DATA_SETS)]);

            case 2:
              responses = _context2.sent;
              this.sapProductsArray = responses[0];
              this.uaCurriculumArray = responses[1];
              this.uaDataSetsArray = responses[2];

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function loadProductKeys() {
      return _loadProductKeys.apply(this, arguments);
    }

    return loadProductKeys;
  }();

  _proto.loadPeopleKeys = /*#__PURE__*/function () {
    var _loadPeopleKeys = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var responses;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return Promise.all([this.data.getAllObjects(this.data.UA_PERSON_STATUS), this.data.getAllObjects(this.data.UA_PERSON_DEPT), this.data.getAllObjects(this.data.UA_PERSON_SPECIAL)]);

            case 2:
              responses = _context3.sent;
              this.personStatusArray = responses[0];
              this.deptArray = responses[1];
              this.specialArray = responses[2];

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function loadPeopleKeys() {
      return _loadPeopleKeys.apply(this, arguments);
    }

    return loadPeopleKeys;
  }();

  _proto.loadInstitutionKeys = /*#__PURE__*/function () {
    var _loadInstitutionKeys = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var responses;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return Promise.all([this.data.getAllObjects(this.data.UA_INST_STATUS), this.data.getAllObjects(this.data.UA_INST_TYPES), this.data.getAllObjects(this.data.UA_MEMBER_TYPES), this.data.getAllObjects(this.data.UA_INST_DEGREES)]);

            case 2:
              responses = _context4.sent;
              this.institutonStatusArray = responses[0];
              this.institutionTypes = responses[1];
              this.memberTypes = responses[2];
              this.highestDegrees = responses[3];

            case 7:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function loadInstitutionKeys() {
      return _loadInstitutionKeys.apply(this, arguments);
    }

    return loadInstitutionKeys;
  }();

  return is4ua;
}()) || _class);

/***/ })

}]);
//# sourceMappingURL=app-6ac23984.3500a8c9766278316f66.bundle.js.map