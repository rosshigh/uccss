"use strict";
(self["webpackChunkclient"] = self["webpackChunkclient"] || []).push([["app-5faa557d"],{

/***/ 6617:
/*!*************************************!*\
  !*** ./src/resources/data/admin.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AdminData": function() { return /* binding */ AdminData; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _dataServices__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dataServices */ 5086);
var _dec, _class;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



var AdminData = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_dataServices__WEBPACK_IMPORTED_MODULE_1__.DataServices), _dec(_class = /*#__PURE__*/function () {
  function AdminData(data) {
    this.AUTH_SERVICE = "/adminLog/";
    this.LOG_SERVICE = "/log/";
    this.FILES_SERVICE = '/files/';
    this.FOREVER_SERVICE = '/pm2Log/';
    this.data = data;
  }

  var _proto = AdminData.prototype;

  _proto.getLogs = /*#__PURE__*/function () {
    var _getLogs = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(type) {
      var url, response;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.t0 = type;
              _context.next = _context.t0 === 'auth' ? 3 : _context.t0 === 'log' ? 5 : _context.t0 === 'forl' ? 7 : _context.t0 === 'fore' ? 9 : 11;
              break;

            case 3:
              url = this.AUTH_SERVICE;
              return _context.abrupt("break", 11);

            case 5:
              url = this.LOG_SERVICE;
              return _context.abrupt("break", 11);

            case 7:
              url = this.FOREVER_SERVICE + 'fileList/out';
              return _context.abrupt("break", 11);

            case 9:
              url = this.FOREVER_SERVICE + 'fileList/err';
              return _context.abrupt("break", 11);

            case 11:
              _context.next = 13;
              return this.data.get(url);

            case 13:
              response = _context.sent;

              if (!response.error) {
                this.logFileArray = response;
              }

              return _context.abrupt("return", response);

            case 16:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function getLogs(_x) {
      return _getLogs.apply(this, arguments);
    }

    return getLogs;
  }();

  _proto.getLogFile = /*#__PURE__*/function () {
    var _getLogFile = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(fileName, type) {
      var url, response;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(fileName && type)) {
                _context2.next = 14;
                break;
              }

              _context2.t0 = type;
              _context2.next = _context2.t0 === 'auth' ? 4 : _context2.t0 === 'log' ? 6 : _context2.t0 === 'forl' ? 8 : _context2.t0 === 'fore' ? 8 : _context2.t0 === 'foreo' ? 8 : 9;
              break;

            case 4:
              url = this.AUTH_SERVICE;
              return _context2.abrupt("break", 9);

            case 6:
              url = this.LOG_SERVICE;
              return _context2.abrupt("break", 9);

            case 8:
              url = this.FOREVER_SERVICE;

            case 9:
              _context2.next = 11;
              return this.data.get(url + fileName);

            case 11:
              response = _context2.sent;

              if (!response.error) {
                this.logContents = response;
              }

              return _context2.abrupt("return", response);

            case 14:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function getLogFile(_x2, _x3) {
      return _getLogFile.apply(this, arguments);
    }

    return getLogFile;
  }() // async getAuthLogs(){
  // 	let response = await this.data.get(this.AUTH_SERVICE);
  // 	if(!response.error){
  // 		this.authLogFileArray = response;
  // 	} 
  // 	return response;
  // }
  ;

  _proto.getAuthLogFile =
  /*#__PURE__*/
  function () {
    var _getAuthLogFile = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(fileName) {
      var response;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!fileName) {
                _context3.next = 6;
                break;
              }

              _context3.next = 3;
              return this.data.get(this.AUTH_SERVICE + fileName);

            case 3:
              response = _context3.sent;

              if (!response.error) {
                this.authLogContents = response;
              }

              return _context3.abrupt("return", response);

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function getAuthLogFile(_x4) {
      return _getAuthLogFile.apply(this, arguments);
    }

    return getAuthLogFile;
  }();

  _proto.deleteAuthFiles = /*#__PURE__*/function () {
    var _deleteAuthFiles = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(filesToDelete) {
      var obj, response;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              obj = {
                files: filesToDelete
              };
              _context4.next = 3;
              return this.data.saveObject(obj, this.AUTH_SERVICE, "put");

            case 3:
              response = _context4.sent;
              return _context4.abrupt("return", response);

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function deleteAuthFiles(_x5) {
      return _deleteAuthFiles.apply(this, arguments);
    }

    return deleteAuthFiles;
  }() // async getLogs(){
  // 	let response = await this.data.get(this.LOG_SERVICE);
  // 	if(!response.error){
  // 		this.authLogFileArray = response;
  // 	} 
  // 	return response;
  // }
  // async getLogFile(fileName){
  // 	if(fileName){
  // 		let response = await this.data.get(this.LOG_SERVICE + fileName);
  // 		if(!response.error){
  // 			this.logContents = response;
  // 		}
  // 		return response;
  // 	}
  // }
  ;

  _proto.deleteLogFiles =
  /*#__PURE__*/
  function () {
    var _deleteLogFiles = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(filesToDelete) {
      var obj, response;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              obj = {
                files: filesToDelete
              };
              _context5.next = 3;
              return this.data.saveObject(obj, this.LOG_SERVICE, "put");

            case 3:
              response = _context5.sent;
              return _context5.abrupt("return", response);

            case 5:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function deleteLogFiles(_x6) {
      return _deleteLogFiles.apply(this, arguments);
    }

    return deleteLogFiles;
  }();

  _proto.getFiles = /*#__PURE__*/function () {
    var _getFiles = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
      var response;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return this.data.get(this.FILES_SERVICE);

            case 2:
              response = _context6.sent;

              if (!response.error) {
                this.parseFileList(response);
              }

              return _context6.abrupt("return", response);

            case 5:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function getFiles() {
      return _getFiles.apply(this, arguments);
    }

    return getFiles;
  }();

  _proto.parseFileList = function parseFileList(response) {
    var _this = this;

    this.files = response;
    this.filesList = {
      name: "Uploaded Files",
      value: "root",
      file: false,
      children: new Array()
    };
    this.files.forEach(function (item) {
      var parts = item.split('\\');

      var index = _this.categoryIndex(parts[2]);

      if (index === -1) {
        _this.filesList.children.push({
          name: parts[2],
          value: parts[2],
          file: false,
          children: []
        });
      }
    });

    for (var index = 0; index < this.files.length; index++) {
      var parts = this.files[index].split('\\');
      var fileListindex = this.categoryIndex(parts[2]);

      if (parts.length === 4) {
        index = this.processShallowTree(fileListindex, index);
      } else {
        index = this.processDeepTree(fileListindex, index);
      }
    }
  };

  _proto.processShallowTree = function processShallowTree(fileListindex, index) {
    var parts = this.files[index].split('\\');
    var thisCategory = parts[2];
    var fileName = parts[3];

    do {
      this.filesList.children[fileListindex].children.push({
        name: fileName,
        value: thisCategory + '-' + fileName,
        file: true,
        path: this.files[index]
      });
      index++;
      parts = this.files[index].split('\\');
      fileName = parts[3];
    } while (thisCategory === parts[2]);

    return --index;
  };

  _proto.processDeepTree = function processDeepTree(fileListindex, index) {
    var parts = this.files[index].split('\\');
    var thisCategory = parts[2];
    var thisSubCategory = parts[3];
    var fileName = parts[4];
    this.filesList.children[fileListindex].children.push({
      name: thisSubCategory,
      value: thisCategory + '-' + thisSubCategory,
      file: false,
      children: [{
        name: fileName,
        value: thisSubCategory + '-' + fileName,
        file: true,
        path: this.files[index]
      }]
    });
    index++;

    if (index < this.files.length) {
      parts = this.files[index].split('\\');
      var childIndex = this.filesList.children[fileListindex].children.length - 1;

      while (thisSubCategory === parts[3]) {
        fileName = parts[4];
        this.filesList.children[fileListindex].children[childIndex].children.push({
          name: fileName,
          value: thisSubCategory + '-' + fileName,
          file: true,
          path: this.files[index]
        });
        index++;

        if (index < this.files.length) {
          parts = this.files[index].split('\\');
        } else {
          break;
        }
      }
    }

    return --index;
  };

  _proto.categoryIndex = function categoryIndex(category) {
    for (var i = 0; i < this.filesList.children.length; i++) {
      if (this.filesList.children[i].name === category) return i;
    }

    return -1;
  };

  _proto.deleteFile = /*#__PURE__*/function () {
    var _deleteFile = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(file) {
      var response;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              if (!file) {
                _context7.next = 6;
                break;
              }

              file = file.split('\\').join('$@');
              _context7.next = 4;
              return this.data.deleteObject(this.FILES_SERVICE + "/" + file);

            case 4:
              response = _context7.sent;
              return _context7.abrupt("return", response);

            case 6:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function deleteFile(_x7) {
      return _deleteFile.apply(this, arguments);
    }

    return deleteFile;
  }();

  _proto.renameALogFile = /*#__PURE__*/function () {
    var _renameALogFile = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(oldFile, newFile) {
      var response;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              if (!(oldFile && newFile)) {
                _context8.next = 7;
                break;
              }

              oldFile = oldFile.split('\\').join('$@');
              newFile = newFile.split('\\').join('$@');
              _context8.next = 5;
              return this.data.saveObject({}, this.FOREVER_SERVICE + "/rename/" + oldFile + "/" + newFile, "put");

            case 5:
              response = _context8.sent;
              return _context8.abrupt("return", response);

            case 7:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    function renameALogFile(_x8, _x9) {
      return _renameALogFile.apply(this, arguments);
    }

    return renameALogFile;
  }();

  return AdminData;
}()) || _class);

/***/ }),

/***/ 3444:
/*!*************************************************!*\
  !*** ./src/resources/data/apjClientRequests.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "APJClientRequests": function() { return /* binding */ APJClientRequests; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _dataServices__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dataServices */ 5086);
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/utils */ 8741);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
var _dec, _class;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }





var APJClientRequests = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_dataServices__WEBPACK_IMPORTED_MODULE_1__.DataServices, _utils_utils__WEBPACK_IMPORTED_MODULE_2__.Utils, _config_appConfig__WEBPACK_IMPORTED_MODULE_3__.AppConfig), _dec(_class = /*#__PURE__*/function () {
  function APJClientRequests(data, utils, config) {
    this.CLIENT_REQUESTS_SERVICES = 'apj/clientRequests';
    this.CLIENT_REQUEST_DETAILS = 'apj/clientRequestsDetails';
    this.CUSTOMER_ACTION = 'clientRequests/customerAction';
    this.CLIENT_REQUEST_EMAIL = "clientRequests/sendMail";
    this.INVOICE_DATA = "apj/invoicedata";
    this.INVOICES_SERVICE = 'apj/invoices';
    this.data = data;
    this.utils = utils;
    this.config = config;
  }

  var _proto = APJClientRequests.prototype;

  _proto.getClientRequestsDetailsArray = /*#__PURE__*/function () {
    var _getClientRequestsDetailsArray = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(options, refresh) {
      var url, serverResponse;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(!this.requestsArray || refresh)) {
                _context.next = 13;
                break;
              }

              url = this.CLIENT_REQUEST_DETAILS;
              url += options ? options : "";
              _context.prev = 3;
              _context.next = 6;
              return this.data.get(url);

            case 6:
              serverResponse = _context.sent;

              if (!serverResponse.error) {
                this.requestsDetailsArray = serverResponse;
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

    function getClientRequestsDetailsArray(_x, _x2) {
      return _getClientRequestsDetailsArray.apply(this, arguments);
    }

    return getClientRequestsDetailsArray;
  }();

  _proto.getAPJInstitutionRequests = /*#__PURE__*/function () {
    var _getAPJInstitutionRequests = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(options, refresh) {
      var url, response;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(!this.apjInstitutionRequestArray || refresh)) {
                _context2.next = 7;
                break;
              }

              url = this.CLIENT_REQUESTS_SERVICES;
              url += options ? options : "";
              _context2.next = 5;
              return this.data.get(url);

            case 5:
              response = _context2.sent;

              if (!response.error) {
                this.apjInstitutionRequestArray = response;
              } else {
                this.apjInstitutionRequestArray = undefined;
              }

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function getAPJInstitutionRequests(_x3, _x4) {
      return _getAPJInstitutionRequests.apply(this, arguments);
    }

    return getAPJInstitutionRequests;
  }();

  _proto.getRequestDetail = /*#__PURE__*/function () {
    var _getRequestDetail = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id) {
      var serverResponse;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return this.data.get(this.CLIENT_REQUEST_DETAILS + "/" + id);

            case 2:
              serverResponse = _context3.sent;

              if (!serverResponse.error) {
                this.selectedRequestDetail = serverResponse;
              } else {
                this.selectedRequestDetail = null;
              }

              return _context3.abrupt("return", serverResponse);

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function getRequestDetail(_x5) {
      return _getRequestDetail.apply(this, arguments);
    }

    return getRequestDetail;
  }();

  _proto.selectRequest = function selectRequest(index) {
    if (index === undefined) {
      this.selectedRequest = this.emptyRequest();
    } else {
      try {
        this.selectedRequest = this.utils.copyObject(this.apjInstitutionRequestArray[index]);
        this.editRequestIndex = index;
      } catch (error) {
        console.log(error);
        this.selectedRequest = this.emptyRequest();
      }
    }
  };

  _proto.emptyRequest = function emptyRequest() {
    var newObj = new Object();
    ;
    newObj.requestStatus = this.config.UNASSIGNED_REQUEST_CODE;
    newObj.startDate = "";
    newObj.endDate = "";
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
    var _saveRequestDetail = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var response;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (this.selectedRequestDetail) {
                _context4.next = 2;
                break;
              }

              return _context4.abrupt("return");

            case 2:
              _context4.next = 4;
              return this.data.saveObject(this.selectedRequestDetail, this.CLIENT_REQUEST_DETAILS, "put");

            case 4:
              response = _context4.sent;

              if (response.error) {
                _context4.next = 9;
                break;
              }

              this.selectedRequestDetail = response;
              this.requestsDetailsArray[this.requestDetailIndex] = this.utils.copyObject(this.selectedRequestDetail);
              return _context4.abrupt("return", response);

            case 9:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function saveRequestDetail() {
      return _saveRequestDetail.apply(this, arguments);
    }

    return saveRequestDetail;
  }();

  _proto.setSelectedRequest = function setSelectedRequest(request) {
    this.selectedRequest = this.utils.copyObject(request);
  };

  _proto.assignRequest = /*#__PURE__*/function () {
    var _assignRequest = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(index) {
      var url, serverResponse;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (this.selectedRequest) {
                _context5.next = 2;
                break;
              }

              return _context5.abrupt("return");

            case 2:
              url = this.CLIENT_REQUESTS_SERVICES + '/assign';
              _context5.next = 5;
              return this.data.saveObject(this.selectedRequest, url, "put");

            case 5:
              serverResponse = _context5.sent;

              if (!serverResponse.error) {
                this.selectedRequestDetail = serverResponse; // if(!this.selectedRequestDetail.requestId.courseId || this.selectedRequestDetail.requestId.courseId === null){
                //   this.selectedRequestDetail.requestId.courseId = {_id: this.config.SANDBOX_ID, name: this.config.SANDBOX_NAME};
                // }

                this.requestsDetailsArray[index] = this.utils.copyObject(this.selectedRequestDetail);
              }

              return _context5.abrupt("return", serverResponse);

            case 8:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function assignRequest(_x6) {
      return _assignRequest.apply(this, arguments);
    }

    return assignRequest;
  }();

  _proto.saveRequest = /*#__PURE__*/function () {
    var _saveRequest = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
      var url, _serverResponse, serverResponse;

      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (this.selectedRequest) {
                _context6.next = 2;
                break;
              }

              return _context6.abrupt("return");

            case 2:
              url = this.CLIENT_REQUESTS_SERVICES;

              if (this.selectedRequest._id) {
                _context6.next = 11;
                break;
              }

              _context6.next = 6;
              return this.data.saveObject(this.selectedRequest, url, "post");

            case 6:
              _serverResponse = _context6.sent;

              if (!_serverResponse.error) {
                if (this.requestsArray) {
                  this.requestsArray.push(this.selectedRequest);
                }
              }

              return _context6.abrupt("return", _serverResponse);

            case 11:
              _context6.next = 13;
              return this.data.saveObject(this.selectedRequest, url, "put");

            case 13:
              serverResponse = _context6.sent;

              if (!serverResponse.error) {
                if (this.requestsArray && this.editRequestIndex) {
                  this.requestsArray[this.editRequestIndex] = this.utils.copyObject(this.selectedRequest);
                }
              }

              return _context6.abrupt("return", serverResponse);

            case 16:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function saveRequest() {
      return _saveRequest.apply(this, arguments);
    }

    return saveRequest;
  }();

  _proto.saveRequestWithId = /*#__PURE__*/function () {
    var _saveRequestWithId = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
      var serverResponse;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              if (this.selectedRequest) {
                _context7.next = 2;
                break;
              }

              return _context7.abrupt("return");

            case 2:
              _context7.next = 4;
              return this.data.saveObject(this.selectedRequest, this.CLIENT_REQUESTS_SERVICES + "/" + this.selectedRequest._id, "put");

            case 4:
              serverResponse = _context7.sent;

              if (!serverResponse.error) {
                if (this.requestsArray && this.editRequestIndex) {
                  this.requestsArray[this.editRequestIndex] = this.utils.copyObject(this.selectedRequest);
                }
              }

              return _context7.abrupt("return", serverResponse);

            case 7:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function saveRequestWithId() {
      return _saveRequestWithId.apply(this, arguments);
    }

    return saveRequestWithId;
  }();

  _proto.getInvoiceDataArray = /*#__PURE__*/function () {
    var _getInvoiceDataArray = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(options, refresh) {
      var url, serverResponse;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              if (!(!this.invoiceDataArray || refresh)) {
                _context8.next = 13;
                break;
              }

              url = this.INVOICE_DATA;
              url += options ? options : "";
              _context8.prev = 3;
              _context8.next = 6;
              return this.data.get(url);

            case 6:
              serverResponse = _context8.sent;

              if (!serverResponse.error) {
                this.invoiceDataArray = serverResponse;
              }

              _context8.next = 13;
              break;

            case 10:
              _context8.prev = 10;
              _context8.t0 = _context8["catch"](3);
              console.log(_context8.t0);

            case 13:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this, [[3, 10]]);
    }));

    function getInvoiceDataArray(_x7, _x8) {
      return _getInvoiceDataArray.apply(this, arguments);
    }

    return getInvoiceDataArray;
  }();

  _proto.getInvoices = /*#__PURE__*/function () {
    var _getInvoices = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(options) {
      var url, serverResponse;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              url = this.INVOICES_SERVICE;
              url += options ? options : "";
              _context9.prev = 2;
              _context9.next = 5;
              return this.data.get(url);

            case 5:
              serverResponse = _context9.sent;

              if (!serverResponse.error) {
                this.invoicesArray = serverResponse;
              }

              _context9.next = 12;
              break;

            case 9:
              _context9.prev = 9;
              _context9.t0 = _context9["catch"](2);
              console.log(_context9.t0);

            case 12:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, this, [[2, 9]]);
    }));

    function getInvoices(_x9) {
      return _getInvoices.apply(this, arguments);
    }

    return getInvoices;
  }();

  _proto.saveInvoice = /*#__PURE__*/function () {
    var _saveInvoice = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(invoiceToSave) {
      var response;
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              if (invoiceToSave) {
                _context10.next = 2;
                break;
              }

              return _context10.abrupt("return");

            case 2:
              _context10.next = 4;
              return this.data.saveObject(invoiceToSave, this.INVOICES_SERVICE, "post");

            case 4:
              response = _context10.sent;

              if (response.error) {
                _context10.next = 7;
                break;
              }

              return _context10.abrupt("return", response);

            case 7:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, this);
    }));

    function saveInvoice(_x10) {
      return _saveInvoice.apply(this, arguments);
    }

    return saveInvoice;
  }();

  _proto.createPDF = /*#__PURE__*/function () {
    var _createPDF = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(object) {
      var url, serverResponse;
      return regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              url = 'apj/invoices/createPDF'; // let object = {page: html};

              _context11.next = 3;
              return this.data.saveObject(object, url, "post");

            case 3:
              serverResponse = _context11.sent;
              return _context11.abrupt("return", serverResponse);

            case 5:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11, this);
    }));

    function createPDF(_x11) {
      return _createPDF.apply(this, arguments);
    }

    return createPDF;
  }();

  return APJClientRequests;
}()) || _class);

/***/ }),

/***/ 5849:
/*!************************************!*\
  !*** ./src/resources/data/auth.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Auth": function() { return /* binding */ Auth; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var aurelia_event_aggregator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-event-aggregator */ "aurelia-event-aggregator");
/* harmony import */ var _dataServices__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dataServices */ 5086);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
var _dec, _class;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }





var Auth = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(aurelia_event_aggregator__WEBPACK_IMPORTED_MODULE_1__.EventAggregator, _dataServices__WEBPACK_IMPORTED_MODULE_2__.DataServices, _config_appConfig__WEBPACK_IMPORTED_MODULE_3__.AppConfig), _dec(_class = /*#__PURE__*/function () {
  function Auth(eventAggregator, data, config) {
    this.loginUrl = 'users/login';
    this.logoutUrl = 'users/logout';
    this.eventAggregator = eventAggregator;
    this.data = data;
    this.config = config;
  }

  var _proto = Auth.prototype;

  _proto.login = /*#__PURE__*/function () {
    var _login = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(email, password) {
      var content, response;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              content = {
                'email': email,
                'password': password
              };
              _context.next = 3;
              return this.data.login(content, this.loginUrl);

            case 3:
              response = _context.sent;

              if (!response.error) {
                response.user.userRole = this.setRole(response.user.roles);
                sessionStorage.setItem('token', response.token);
                sessionStorage.setItem('user', JSON.stringify(response.user));
                this.config.token = response.token;
                this.config.user = response.user;
              }

              this.eventAggregator.publish('auth:login', response);
              return _context.abrupt("return", response);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function login(_x, _x2) {
      return _login.apply(this, arguments);
    }

    return login;
  }();

  _proto.logout = function logout(email) {
    this.data.saveObject({
      email: email
    }, this.logoutUrl, 'post');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('alert');
  };

  _proto.isAuthenticated = function isAuthenticated() {
    var token = sessionStorage.getItem('token'); // There's no token, so user is not authenticated.

    if (!token) {
      return false;
    } // There is a token, but in a different format. Return true.


    if (token.split('.').length !== 3) {
      return true;
    }

    var exp;

    try {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      exp = JSON.parse(window.atob(base64)).exp;
    } catch (error) {
      return false;
    }

    if (exp) {
      return Math.round(new Date().getTime() / 1000) <= exp;
    }

    return true;
  }
  /*****************************************************************************
  * Determine users role for authorizations
  ****************************************************************************/
  ;

  _proto.setRole = function setRole(roles) {
    var _this = this;

    var userRole = 1;

    var _loop = function _loop(i) {
      _this.config.ROLES.forEach(function (item) {
        if (roles[i] == item.role) {
          userRole = item.authLevel > userRole ? item.authLevel : userRole;
        }
      });
    };

    for (var i = 0; i < roles.length; i++) {
      _loop(i);
    }

    return userRole;
  };

  return Auth;
}()) || _class);

/***/ })

}]);
//# sourceMappingURL=app-5faa557d.3500a8c9766278316f66.bundle.js.map