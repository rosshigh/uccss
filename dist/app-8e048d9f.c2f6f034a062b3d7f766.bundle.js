"use strict";
(self["webpackChunkclient"] = self["webpackChunkclient"] || []).push([["app-8e048d9f"],{

/***/ "modules/admin/site/admin":
/*!*****************************************!*\
  !*** ./src/modules/admin/site/admin.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Admin": function() { return /* binding */ Admin; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../resources/utils/dataTable */ 6847);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../config/appConfig */ 1666);
/* harmony import */ var _resources_utils_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../resources/utils/utils */ 8741);
/* harmony import */ var _resources_data_admin__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../resources/data/admin */ 6617);
/* harmony import */ var _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../resources/dialogs/common-dialogs */ 6545);
/* harmony import */ var aurelia_event_aggregator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! aurelia-event-aggregator */ "aurelia-event-aggregator");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! moment */ 381);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_7__);
var _dec, _class;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }









var Admin = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_1__.DataTable, _config_appConfig__WEBPACK_IMPORTED_MODULE_2__.AppConfig, _resources_utils_utils__WEBPACK_IMPORTED_MODULE_3__.Utils, _resources_data_admin__WEBPACK_IMPORTED_MODULE_4__.AdminData, _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_5__.CommonDialogs, aurelia_event_aggregator__WEBPACK_IMPORTED_MODULE_6__.EventAggregator), _dec(_class = /*#__PURE__*/function () {
  function Admin(dataTable, config, utils, admin, dialog, EventAggregator) {
    this.screenToShow = "";
    this.spinnerHTML = "";
    this.foreverLog = "";
    this.showFileList = false;
    this.tabs = [{
      id: 'Authorization Log',
      screenToShow: 'auth'
    }, {
      id: 'Transaction Log',
      screenToShow: 'log'
    }, {
      id: 'Files',
      screenToShow: 'files'
    }, {
      id: 'PM2 Log',
      screenToShow: 'forl'
    }, {
      id: 'PM2 Error Log',
      screenToShow: 'fore'
    }];
    this.tabPath = './';
    this.dataTable = dataTable;
    this.dataTable.initialize(this);
    this.config = config;
    this.utils = utils;
    this.admin = admin;
    this.dialog = dialog;
    this.ea = EventAggregator;
    this.userObj = JSON.parse(sessionStorage.getItem('user'));
  }

  var _proto = Admin.prototype;

  _proto.activate = function activate() {
    this.firstLoad();
  };

  _proto.attached = function attached() {
    var _this = this;

    $('[data-toggle="tooltip"]').tooltip();
    this.ea.subscribe('delete-file', function (obj) {
      if (obj.file.file) _this.deleteFile(obj);
    });
  };

  _proto.refresh = /*#__PURE__*/function () {
    var _refresh = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.typeSelected();

            case 2:
              this.fileSelected(this.fileIndex);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function refresh() {
      return _refresh.apply(this, arguments);
    }

    return refresh;
  }();

  _proto.firstLoad = /*#__PURE__*/function () {
    var _firstLoad = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var response, i;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              this.screenToShow = 'auth';
              _context2.next = 3;
              return this.admin.getLogs(this.screenToShow);

            case 3:
              response = _context2.sent;

              if (!response.error) {
                this.fileList = this.utils.copyArray(response);

                for (i = 0; i < this.fileList.length; i++) {
                  this.fileList[i] = this.fileList[i].substring(0, this.fileList[i].indexOf('.log'));
                }

                ;
                this.fileList.reverse();
              }

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function firstLoad() {
      return _firstLoad.apply(this, arguments);
    }

    return firstLoad;
  }();

  _proto.updateButtons = function updateButtons(el) {
    if (el.target.id != "") {
      $("#buttonGroup").children().removeClass('menuButtons');
      $("#buttonGroup").children().css("background-color", "");
      $("#buttonGroup").children().css("color", "");
      $(el.target).css("background-color", this.config.BUTTONS_BACKGROUND);
      $(el.target).css("color", this.config.ACTIVE_SUBMENU_COLOR);
    }
  };

  _proto.typeSelected = /*#__PURE__*/function () {
    var _typeSelected = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(el, index, type) {
      var logResponse, i, fileResponse;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              this.updateButtons(el, index);
              this.clearFilters();
              this.screenToShow = type.screenToShow;
              _context3.t0 = this.screenToShow;
              _context3.next = _context3.t0 === 'auth' ? 6 : _context3.t0 === 'log' ? 6 : _context3.t0 === 'forl' ? 6 : _context3.t0 === 'fore' ? 6 : _context3.t0 === 'files' ? 12 : 18;
              break;

            case 6:
              this.foreverLog = "";
              _context3.next = 9;
              return this.admin.getLogs(this.screenToShow);

            case 9:
              logResponse = _context3.sent;

              if (!logResponse.error) {
                this.fileList = this.utils.copyArray(logResponse);

                for (i = 0; i < this.fileList.length; i++) {
                  this.fileList[i] = this.fileList[i].substring(0, this.fileList[i].indexOf('.log'));
                }

                ;
                this.fileList.reverse();
              }

              return _context3.abrupt("break", 19);

            case 12:
              _context3.next = 14;
              return this.admin.getFiles();

            case 14:
              fileResponse = _context3.sent;

              if (!fileResponse.error) {
                this.showFileList = true;
                this.uploadedFileList = this.admin.filesList;
              }

              this.fileList = new Array();
              return _context3.abrupt("break", 19);

            case 18:
              this.fileList = new Array();

            case 19:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function typeSelected(_x, _x2, _x3) {
      return _typeSelected.apply(this, arguments);
    }

    return typeSelected;
  }();

  _proto.fileSelected = /*#__PURE__*/function () {
    var _fileSelected = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(index) {
      var response, i, array, dateTime, logResponse, _i, j, code, _dateTime, _array, data, foreveLogResponse;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              this.clearFilters();
              this.fileIndex = index;
              _context4.t0 = this.screenToShow;
              _context4.next = _context4.t0 === 'auth' ? 5 : _context4.t0 === 'log' ? 10 : _context4.t0 === 'forl' ? 15 : _context4.t0 === 'fore' ? 15 : _context4.t0 === 'foro' ? 15 : 20;
              break;

            case 5:
              _context4.next = 7;
              return this.admin.getAuthLogFile(this.fileList[index] + '.log');

            case 7:
              response = _context4.sent;

              if (!response.error) {
                this.fileContents = new Array();

                for (i = 0; i < this.admin.authLogContents.length; i++) {
                  if (this.admin.authLogContents[i].message) {
                    array = this.admin.authLogContents[i].message.split('-');
                    dateTime = new Date(this.admin.authLogContents[i].timestamp);
                    this.fileContents.push({
                      event: array[0],
                      data: array[1],
                      date: moment__WEBPACK_IMPORTED_MODULE_7___default()(dateTime).format("YYYY-MM-DD HH:mm:ss")
                    });
                  }
                }

                ;
                this.dataTable.updateArray(this.fileContents);
              }

              return _context4.abrupt("break", 21);

            case 10:
              _context4.next = 12;
              return this.admin.getLogFile(this.fileList[index] + '.log', this.screenToShow);

            case 12:
              logResponse = _context4.sent;

              if (!logResponse.error) {
                this.fileContents = new Array();

                for (_i = 0; _i < this.admin.logContents.length; _i++) {
                  if (this.admin.logContents[_i].message) {
                    _dateTime = new Date(this.admin.logContents[_i].timestamp);
                    _array = this.admin.logContents[_i].message.split('@@');
                    data = "";

                    if (this.admin.logContents[_i].level !== 'error') {
                      j = 0;
                      code = "";
                    } else {
                      j = 1;
                      code = _array[0];
                    }

                    for (; j < _array.length; j++) {
                      data = data + _array[j] + '</br>';
                    }

                    this.fileContents.push({
                      event: this.admin.logContents[_i].level,
                      code: code,
                      data: data.replace(/%/g, ":"),
                      date: moment__WEBPACK_IMPORTED_MODULE_7___default()(_dateTime).format("YYYY-MM-DD HH:mm:ss")
                    });
                  }
                }

                ;
                this.dataTable.updateArray(this.fileContents);
              }

              return _context4.abrupt("break", 21);

            case 15:
              _context4.next = 17;
              return this.admin.getLogFile(this.fileList[index] + '.log', this.screenToShow);

            case 17:
              foreveLogResponse = _context4.sent;

              if (!foreveLogResponse.error) {
                this.foreverLog = foreveLogResponse;
              }

              return _context4.abrupt("break", 21);

            case 20:
              this.fileList = new Array();

            case 21:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function fileSelected(_x4) {
      return _fileSelected.apply(this, arguments);
    }

    return fileSelected;
  }();

  _proto.uploadedFileSelected = function uploadedFileSelected(file) {
    this.selectedCategoryFiles = file;
    this.uploadedFilesArray = file.files;
    this.dataTable.updateArray(this.uploadedFilesArray);
  };

  _proto.deleteLogFile = function deleteLogFile(file, index, path) {
    var _this2 = this;

    this.deletedFileIndex = index;

    if (file.indexOf('auth') > -1) {
      var path = "log-auth\\";
    } else if (file.indexOf('results') > -1) {
      var path = "log\\";
    } else {
      var path = "forever-log\\";
    }

    file = path + file + ".log";
    var msg = "Are you sure you want to delete the file? This cannot be undone.";
    return this.dialog.showMessage(msg, "Confirm", ['Yes', 'No']).whenClosed(function (response) {
      if (!response.wasCancelled) {
        _this2.deleteALogFile(file);
      }
    });
  };

  _proto.deleteALogFile = /*#__PURE__*/function () {
    var _deleteALogFile = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(path) {
      var response;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return this.admin.deleteFile(path);

            case 2:
              response = _context5.sent;

              if (!response.error) {
                this.fileList.splice(this.deletedFileIndex, 1);
                this.utils.showNotification('The file was deleted');
              }

            case 4:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function deleteALogFile(_x5) {
      return _deleteALogFile.apply(this, arguments);
    }

    return deleteALogFile;
  }();

  _proto.deleteFile = function deleteFile(obj) {
    var _this3 = this;

    var type = obj.file.value.split('-');
    this.deletedFile = obj.file.value;
    var msg = "Are you sure you want to delete the file?  It may affect links in other parts of the system.";
    return this.dialog.showMessage(msg, "Confirm", ['Yes', 'No']).whenClosed(function (response) {
      if (!response.wasCancelled) {
        _this3.deleteAFile(obj.file.path);
      }
    });
  };

  _proto.deleteAFile = /*#__PURE__*/function () {
    var _deleteAFile = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(path) {
      var response;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return this.admin.deleteFile(path);

            case 2:
              response = _context6.sent;

              if (!response.error) {
                this.sliceDeletedFile();
                this.utils.showNotification('The file was deleted');
              }

            case 4:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function deleteAFile(_x6) {
      return _deleteAFile.apply(this, arguments);
    }

    return deleteAFile;
  }();

  _proto.sliceDeletedFile = function sliceDeletedFile() {
    console.log(this.uploadedFileList);

    for (var i = 0; i < this.uploadedFileList.children.length; i++) {
      for (var j = 0; j < this.uploadedFileList.children[i].children.length; j++) {
        if (this.uploadedFileList.children[i].children[j].file) {
          if (this.uploadedFileList.children[i].children[j].value === this.deletedFile) {
            this.uploadedFileList.children[i].children.splice(j, 1);
          }
        } else {
          for (var k = 0; k < this.uploadedFileList.children[i].children[j].children.length; k++) {
            if (this.uploadedFileList.children[i].children[j].children[k].value === this.deletedFile) {
              this.uploadedFileList.children[i].children[j].children.splice(k, 1);
            }
          }
        }
      }
    }

    console.log(this.uploadedFileList);
    console.log(this.deletedFile);
  };

  _proto.deleteFiles = function deleteFiles() {
    var _this4 = this;

    if (!this.filesToDelete || this.filesToDelete <= 0) return;
    var msg = "Are you sure you want to delete " + this.filesToDelete + " log files?  This action cannot be undone.";
    return this.dialog.showMessage(msg, "Confirm", ['Yes', 'No']).whenClosed(function (response) {
      if (!response.wasCancelled) {
        _this4.deleteTheFiles();
      }
    });
  };

  _proto.deleteTheFiles = /*#__PURE__*/function () {
    var _deleteTheFiles = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
      var deleteFileArray, i, response, _i2, _response;

      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.t0 = this.screenToShow;
              _context7.next = _context7.t0 === 'auth' ? 3 : _context7.t0 === 'log' ? 12 : 21;
              break;

            case 3:
              this.filesToDelete = parseInt(this.filesToDelete) <= this.fileList.length - 1 ? parseInt(this.filesToDelete) : this.fileList.length - 1;

              if (!(this.filesToDelete > 0)) {
                _context7.next = 11;
                break;
              }

              deleteFileArray = new Array();

              for (i = 1; i <= this.filesToDelete; i++) {
                deleteFileArray.push(this.fileList[this.fileList.length - i]);
              }

              _context7.next = 9;
              return this.admin.deleteAuthFiles(deleteFileArray);

            case 9:
              response = _context7.sent;

              if (!response.error) {
                this.utils.showNotification(this.filesToDelete + ' files were deleted');
              } else {
                this.utils.showNotification('There was problem deleting the files', 'error');
              }

            case 11:
              return _context7.abrupt("break", 21);

            case 12:
              this.filesToDelete = parseInt(this.filesToDelete) <= this.fileList.length - 1 ? parseInt(this.filesToDelete) : this.fileList.length - 1;

              if (!(this.filesToDelete > 0)) {
                _context7.next = 20;
                break;
              }

              deleteFileArray = new Array();

              for (_i2 = 1; _i2 <= this.filesToDelete; _i2++) {
                deleteFileArray.push(this.fileList[this.fileList.length - _i2]);
              }

              _context7.next = 18;
              return this.admin.deleteLogFiles(deleteFileArray);

            case 18:
              _response = _context7.sent;

              if (!_response.error) {
                this.utils.showNotification(this.filesToDelete + ' files were deleted');
              } else {
                this.utils.showNotification('There was problem deleting the files', 'error');
              }

            case 20:
              return _context7.abrupt("break", 21);

            case 21:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function deleteTheFiles() {
      return _deleteTheFiles.apply(this, arguments);
    }

    return deleteTheFiles;
  }();

  _proto.rename = function rename(oldFile, index) {
    var _this5 = this;

    this.renamedFileIndex = index;
    var msg = "Enter the new name";
    var fileObject = {
      title: "New name:",
      valueName: ""
    };
    return this.dialog.input("Enter New Name", fileObject, ['Save', 'Cancel']).whenClosed(function (response) {
      if (!response.wasCancelled) {
        _this5.renameAFile(oldFile, response.output.valueName);
      }
    });
  };

  _proto.renameAFile = /*#__PURE__*/function () {
    var _renameAFile = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(oldFile, newFile) {
      var response, screenToShow, logResponse, i;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return this.admin.renameALogFile(oldFile, newFile);

            case 2:
              response = _context8.sent;

              if (response.error) {
                _context8.next = 11;
                break;
              }

              if (oldFile.indexOf('forever') > -1) {
                screenToShow = 'forl';
              } else if (oldFile.indexOf('error') > -1) {
                screenToShow = 'fore';
              } else {
                screenToShow = 'foro';
              }

              this.foreverLog = "";
              _context8.next = 8;
              return this.admin.getLogs(this.screenToShow);

            case 8:
              logResponse = _context8.sent;

              if (!logResponse.error) {
                this.fileList = this.utils.copyArray(logResponse);

                for (i = 0; i < this.fileList.length; i++) {
                  this.fileList[i] = this.fileList[i].substring(0, this.fileList[i].indexOf('.log'));
                }

                ;
                this.fileList.reverse();
              }

              this.utils.showNotification('The file was renamed');

            case 11:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    function renameAFile(_x7, _x8) {
      return _renameAFile.apply(this, arguments);
    }

    return renameAFile;
  }();

  _proto.clearFilters = function clearFilters() {
    $(this.eventFilter).val('');
    $(this.codeFilter).val('');
    $(this.eventFilter).val('');
  };

  return Admin;
}()) || _class);

/***/ }),

/***/ "modules/admin/site/editConfig":
/*!**********************************************!*\
  !*** ./src/modules/admin/site/editConfig.js ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EditConfig": function() { return /* binding */ EditConfig; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../resources/utils/dataTable */ 6847);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../config/appConfig */ 1666);
/* harmony import */ var _resources_utils_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../resources/utils/utils */ 8741);
/* harmony import */ var _resources_data_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../resources/data/config */ 748);
var _dec, _class;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }






var EditConfig = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_1__.DataTable, _resources_data_config__WEBPACK_IMPORTED_MODULE_4__.Config, _resources_utils_utils__WEBPACK_IMPORTED_MODULE_3__.Utils, _config_appConfig__WEBPACK_IMPORTED_MODULE_2__.AppConfig), _dec(_class = /*#__PURE__*/function () {
  function EditConfig(datatable, siteConfig, utils, config) {
    this.parameterSelected = false;
    this.navControl = "configNavButtons";
    this.spinnerHTML = "";
    this.tabCode = "a";
    this.tabs = [{
      id: 'Assignments'
    }, {
      id: 'Interface'
    }, {
      id: 'UCC Information'
    }, {
      id: "Email Content"
    }];
    this.tabPath = './';
    this.dataTable = datatable;
    this.dataTable.initialize(this);
    this.utils = utils;
    this.siteConfig = siteConfig;
    this.config = config;
  }

  var _proto = EditConfig.prototype;

  _proto.attached = function attached() {
    $('[data-toggle="tooltip"]').tooltip();
  };

  _proto.activate = /*#__PURE__*/function () {
    var _activate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.siteConfig.getConfigArray(true);

            case 2:
              this.dataTable.updateArray(this.siteConfig.configArray);
              this.visibleCategory = "a";
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

  _proto.refresh = /*#__PURE__*/function () {
    var _refresh = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
              _context2.next = 3;
              return this.siteConfig.getConfigArray(true);

            case 3:
              _context2.next = 5;
              return this.config.getConfig(true);

            case 5:
              this.dataTable.updateArray(this.siteConfig.configArray);
              this.filterList();
              this.spinnerHTML = "";

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function refresh() {
      return _refresh.apply(this, arguments);
    }

    return refresh;
  }();

  _proto.edit = function edit(parameter) {
    var index;

    for (var i = 0; i < this.siteConfig.configArray.length; i++) {
      if (this.siteConfig.configArray[i].parameter === parameter.parameter) {
        index = i;
      }
    }

    this.selectedIndex = index;
    this.originalParameter = this.utils.copyObject(this.siteConfig.configArray[index]);
    this.parameterSelected = true;
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  };

  _proto.save = /*#__PURE__*/function () {
    var _save = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var response;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return this.siteConfig.saveAll(this.dataTable.displayArray);

            case 2:
              response = _context3.sent;

              if (!response.error) {
                this.refresh();
                this.parameterSelected = false;
                this.utils.showNotification('The confiugration was saved.');
              }

            case 4:
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

  _proto.back = function back() {
    this.parameterSelected = false;
  };

  _proto.cancel = function cancel() {
    this.siteConfig.configArray[this.selectedIndex] = this.utils.copyObject(this.originalParameter);
  };

  _proto.switchValue = function switchValue(parameter, value) {
    var index;

    for (var i = 0; i < this.siteConfig.configArray.length; i++) {
      if (this.siteConfig.configArray[i].parameter === parameter.parameter) {
        index = i;
      }
    }

    this.siteConfig.configArray[index].value = this.siteConfig.configArray[index].value == 'false' || this.siteConfig.configArray[index].value == false;
  };

  _proto.cancel = function cancel() {
    this.siteConfig.configArray;
  };

  _proto.filterList = function filterList() {
    this.dataTable.filterList(this.visibleCategory, {
      type: 'text',
      filter: 'category',
      collectionProperty: 'category',
      compare: 'match'
    });
  };

  _proto.changeTab = /*#__PURE__*/function () {
    var _changeTab = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(el, index) {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              $("#configListGroup.list-group").children().removeClass('menuButtons');
              $("#configListGroup.list-group").children().css("background-color", "");
              $("#configListGroup.list-group").children().css("color", "");
              $(el.target).parent().css("background-color", this.config.BUTTONS_BACKGROUND);
              $(el.target).parent().css("color", this.config.ACTIVE_SUBMENU_COLOR);
              this.visibleCategory = el.target.id.substring(0, 1).toLowerCase();
              this.filterList();

            case 7:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function changeTab(_x, _x2) {
      return _changeTab.apply(this, arguments);
    }

    return changeTab;
  }();

  return EditConfig;
}()) || _class);

/***/ }),

/***/ "modules/admin/site/editCurriculum":
/*!**************************************************!*\
  !*** ./src/modules/admin/site/editCurriculum.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EditCurriculum": function() { return /* binding */ EditCurriculum; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../resources/utils/dataTable */ 6847);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../config/appConfig */ 1666);
/* harmony import */ var _resources_utils_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../resources/utils/utils */ 8741);
/* harmony import */ var _resources_data_curriculum__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../resources/data/curriculum */ 7701);
/* harmony import */ var _resources_data_products__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../resources/data/products */ 8666);
/* harmony import */ var _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../resources/dialogs/common-dialogs */ 6545);
/* harmony import */ var _resources_utils_validation__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../resources/utils/validation */ 2824);
/* harmony import */ var aurelia_event_aggregator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! aurelia-event-aggregator */ "aurelia-event-aggregator");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! moment */ 381);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_9__);
var _dec, _class;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }











var EditCurriculum = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_1__.DataTable, _resources_data_curriculum__WEBPACK_IMPORTED_MODULE_4__.Curriculum, _resources_data_products__WEBPACK_IMPORTED_MODULE_5__.Products, _config_appConfig__WEBPACK_IMPORTED_MODULE_2__.AppConfig, _resources_utils_utils__WEBPACK_IMPORTED_MODULE_3__.Utils, _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_6__.CommonDialogs, _resources_utils_validation__WEBPACK_IMPORTED_MODULE_7__["default"], aurelia_event_aggregator__WEBPACK_IMPORTED_MODULE_8__.EventAggregator), _dec(_class = /*#__PURE__*/function () {
  function EditCurriculum(datatable, curriculum, products, config, utils, dialog, validation, ea) {
    this.curriculumItemSelected = false;
    this.spinnerHTML = "";
    this.newItem = false;
    this.selectedFile = "";
    this.removedFiles = new Array();
    this.filesSelected = false;
    this.newDownload = false;
    this.selectedFiles = void 0;
    this.toolbar = [['style', ['style', 'bold', 'italic', 'underline', 'clear']], ['color', ['color']], ['font', ['strikethrough', 'superscript', 'subscript']], ['layout', ['ul', 'ol', 'paragraph']], ['insert', ['link', 'table', 'hello']], ['misc', ['undo', 'redo', 'fullscreen', 'codeview']]];
    this.dataTable = datatable;
    this.dataTable.initialize(this);
    this.utils = utils;
    this.curriculum = curriculum;
    this.products = products;
    this.dialog = dialog;
    this.config = config;
    this.validation = validation;
    this.validation.initialize(this);
    this.ea = ea;
  }

  var _proto = EditCurriculum.prototype;

  _proto.attached = function attached() {
    this.mySubscription = this.ea.subscribe('upload-progress', function (obj) {
      var progress = obj.progress / obj.total * 100 + '%';
      var elem = $("#progressBar").css('width', progress); // elem.style.width = obj.progress/obj.total * 100 + '%'; 
    });
    $('[data-toggle="tooltip"]').tooltip();

    this._setupValidation();
  };

  _proto.activate = /*#__PURE__*/function () {
    var _activate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var responses;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return Promise.all([this.curriculum.getCurriculumCategoryArray(true, '?order=name'), this.curriculum.getCurriculumArray(true, '?order=sortOrder'), this.products.getProductsArray('?order=name'), this.config.getConfig()]);

            case 2:
              responses = _context.sent;
              this.dataTable.updateArray(this.curriculum.curriculumArray);
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

  _proto.refresh = /*#__PURE__*/function () {
    var _refresh = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
              _context2.next = 3;
              return this.curriculum.getCurriculumArray(true);

            case 3:
              this.dataTable.updateArray(this.curriculum.curriculumArray);
              this.spinnerHTML = "";

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function refresh() {
      return _refresh.apply(this, arguments);
    }

    return refresh;
  }();

  _proto.new = /*#__PURE__*/function () {
    var _new2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              this.editIndex = -1;
              this.curriculum.selectCurriculum();
              this.curriculumItemSelected = "";
              $("#editTitle").focus();
              this.curriculumItemSelected = true;
              this.newItem = true;

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function _new() {
      return _new2.apply(this, arguments);
    }

    return _new;
  }();

  _proto.edit = /*#__PURE__*/function () {
    var _edit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(index, el) {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              this.editIndex = this.dataTable.getOriginalIndex(index);
              this.curriculum.selectCurriculum(this.editIndex);
              this.originalCurriculumObject = this.utils.copyObject(this.curriculum.selectedCurriculum);
              this.newItem = false; //Editing a product

              $("#editTitle").focus(); //Reset the selected row

              if (this.selectedRow) this.selectedRow.children().removeClass('info');
              this.selectedRow = $(el.target).closest('tr');
              this.selectedRow.children().addClass('info');
              this.curriculumItemSelected = true;
              document.body.scrollTop = document.documentElement.scrollTop = 0;

            case 10:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function edit(_x, _x2) {
      return _edit.apply(this, arguments);
    }

    return edit;
  }();

  _proto.cancel = function cancel() {
    if (this.editIndex == -1) {
      this.new();
    } else {
      this.curriculum.selectCurriculum(this.editIndex);
    }
  };

  _proto.save = /*#__PURE__*/function () {
    var _save = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      var serverResponse;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (!this.validation.validate(1)) {
                _context5.next = 17;
                break;
              }

              _context5.next = 3;
              return this.curriculum.save();

            case 3:
              serverResponse = _context5.sent;

              if (serverResponse.error) {
                _context5.next = 16;
                break;
              }

              if (!(this.filesToUpload && this.filesToUpload.length > 0)) {
                _context5.next = 13;
                break;
              }

              this.uploading = true;
              _context5.next = 9;
              return this.curriculum.uploadFile(this.filesToUpload);

            case 9:
              this.utils.showNotification("The item was saved");

              this._cleanUp();

              _context5.next = 15;
              break;

            case 13:
              this.utils.showNotification("The item was saved");

              this._cleanUp();

            case 15:
              this.dataTable.updateArray(this.curriculum.curriculumArray);

            case 16:
              this.curriculumItemSelected = false;

            case 17:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function save() {
      return _save.apply(this, arguments);
    }

    return save;
  }();

  _proto.changeFiles = function changeFiles() {
    var _this = this;

    this.filesToUpload = new Array();

    for (var i = 0; i < this.files.length; i++) {
      var addFile = true;
      this.filesToUpload.forEach(function (item) {
        if (item.name === _this.files[i].name) addFile = false;
      });
      if (addFile) this.filesToUpload.push(this.files[i]);
    }
  };

  _proto.removeFile = function removeFile(index) {
    this.filesToUpload.splice(index, 1);
  };

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

  _proto.selectProduct = function selectProduct(el) {
    $("#requestProductsLabel").html("Requested Products");
    if (this.curriculum.selectedCurriculum.products.indexOf(el.target.id) === -1) this.curriculum.selectedCurriculum.products.push(el.target.id);
  };

  _proto.removeProduct = function removeProduct(el) {
    for (var i = 0; i < this.curriculum.selectedCurriculum.products.length; i++) {
      if (el.target.id === this.curriculum.selectedCurriculum.products[i]) {
        this.curriculum.selectedCurriculum.products.splice(i, 1);
      }
    }
  };

  _proto.delete = function _delete() {
    var _this2 = this;

    return this.dialog.showMessage("Are you sure you want to delete the item?", "Delete Item", ['Yes', 'No']).whenClosed(function (response) {
      if (!response.wasCancelled) {
        _this2.deleteItem();
      }
    });
  };

  _proto.deleteItem = /*#__PURE__*/function () {
    var _deleteItem = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
      var serverResponse;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return this.curriculum.delete();

            case 2:
              serverResponse = _context6.sent;

              if (!serverResponse.error) {
                this.dataTable.updateArray(this.curriculum.curriculumArray);
                this.utils.showNotification("The Item was deleted");
              }

              this.curriculumItemSelected = false;

            case 5:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function deleteItem() {
      return _deleteItem.apply(this, arguments);
    }

    return deleteItem;
  }();

  _proto.back = function back() {
    var _this3 = this;

    var changes = this.curriculum.isDirty(this.originalCurriculumObject);

    if (changes.length) {
      return this.dialog.showMessage("The item has been changed. Do you want to save your changes?", "Save Changes", ['Yes', 'No']).whenClosed(function (response) {
        if (!response.wasCancelled) {
          _this3.save();
        } else {
          _this3._cleanUp();
        }
      });
    } else {
      this._cleanUp();
    }
  };

  _proto.openEditCatForm = function openEditCatForm(newOrEdit) {
    if (newOrEdit === 'new') {
      this.curriculum.selectCurriculumCategory();
      this.categoryDescription = "";
      this.showCategoryForm = true;
      this.editCategoryFlag = false;
    } else {
      this.curriculum.selectCurriculumCategoryByName(this.curriculum.selectedCurriculum.category);
      this.categoryDescription = this.curriculum.selectedCurriculumCategory.description;
      this.showCategoryForm = true;
      this.editCategoryFlag = true;
    }
  };

  _proto.saveCategory = /*#__PURE__*/function () {
    var _saveCategory = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
      var serverResponse;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              if (!this.validation.validate(2)) {
                _context7.next = 7;
                break;
              }

              this.curriculum.selectedCurriculumCategory.description = this.categoryDescription;
              _context7.next = 4;
              return this.curriculum.saveCategory();

            case 4:
              serverResponse = _context7.sent;

              if (!serverResponse.error) {
                this.utils.showNotification("The category was saved");
              }

              this.showCategoryForm = false;

            case 7:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function saveCategory() {
      return _saveCategory.apply(this, arguments);
    }

    return saveCategory;
  }();

  _proto.cancelEditCategory = function cancelEditCategory() {
    this.showCategoryForm = false;
  };

  _proto.deleteCat = function deleteCat() {
    var _this4 = this;

    if (this.curriculum.curriculumExist(this.curriculum.selectedCurriculum.category)) {
      return this.dialog.showMessage("You can't delete that category because there are exisitng curricula that use it?", "Can't Delete Category", ['OK']).then(function (response) {});
    } else {
      return this.dialog.showMessage("Are you sure you want to delete the category?", "Delete Category", ['Yes', 'No']).whenClosed(function (response) {
        if (!response.wasCancelled) {
          _this4.deleteCategory();
        }
      });
    }
  };

  _proto.deleteCategory = /*#__PURE__*/function () {
    var _deleteCategory = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
      var name, serverResponse;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              name = this.curriculum.selectedCurriculumCategory.name;
              _context8.next = 3;
              return this.curriculum.deleteCategory();

            case 3:
              serverResponse = _context8.sent;

              if (!serverResponse.error) {
                this.utils.showNotification("Category " + name + " was deleted");
              }

            case 5:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    function deleteCategory() {
      return _deleteCategory.apply(this, arguments);
    }

    return deleteCategory;
  }();

  _proto._cleanUp = function _cleanUp() {
    this.showCategoryForm = false;
    this.curriculumItemSelected = false;
    this.selectedFiles = undefined;
    this.files = new Array();
    this.selectedFile = "";
    this.filesToUpload = new Array();
    $("#progressBar").css('width', 0);
    this.uploading = false; // var input = $("#uploadControl");
    // input.replaceWith(input.val('').clone(true));
  };

  _proto._setupValidation = function _setupValidation() {
    this.validation.addRule(1, "editTitle", [{
      "rule": "required",
      "message": "Title is required",
      "value": "curriculum.selectedCurriculum.title"
    }]);
    this.validation.addRule(1, "itemType", [{
      "rule": "required",
      "message": "Title is required",
      "value": "curriculum.selectedCurriculum.category"
    }]);
    this.validation.addRule(2, "editCategoryName", [{
      "rule": "required",
      "message": "Name is required",
      "value": "curriculum.selectedCurriculumCategory.name"
    }]);
  };

  return EditCurriculum;
}()) || _class);

/***/ }),

/***/ "modules/admin/site/editDownloads":
/*!*************************************************!*\
  !*** ./src/modules/admin/site/editDownloads.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EditProducts": function() { return /* binding */ EditProducts; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../resources/utils/dataTable */ 6847);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../config/appConfig */ 1666);
/* harmony import */ var _resources_utils_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../resources/utils/utils */ 8741);
/* harmony import */ var _resources_data_downloads__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../resources/data/downloads */ 9132);
/* harmony import */ var _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../resources/dialogs/common-dialogs */ 6545);
/* harmony import */ var _resources_utils_validation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../resources/utils/validation */ 2824);
/* harmony import */ var aurelia_event_aggregator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! aurelia-event-aggregator */ "aurelia-event-aggregator");
var _dec, _class;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }









var EditProducts = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_1__.DataTable, _resources_data_downloads__WEBPACK_IMPORTED_MODULE_4__.Downloads, _resources_utils_utils__WEBPACK_IMPORTED_MODULE_3__.Utils, _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_5__.CommonDialogs, _resources_utils_validation__WEBPACK_IMPORTED_MODULE_6__["default"], _config_appConfig__WEBPACK_IMPORTED_MODULE_2__.AppConfig, aurelia_event_aggregator__WEBPACK_IMPORTED_MODULE_7__.EventAggregator), _dec(_class = /*#__PURE__*/function () {
  function EditProducts(datatable, downloads, utils, dialog, validation, config, eventAggregator) {
    this.downloadItemSelected = false;
    this.editCat = false;
    this.spinnerHTML = "";
    this.selectedFile = "";
    this.removedFiles = new Array();
    this.filesSelected = false;
    this.newDownload = false;
    this.selectedFiles = void 0;
    this.dataTable = datatable;
    this.dataTable.initialize(this);
    this.utils = utils;
    this.downloads = downloads;
    this.dialog = dialog;
    this.config = config;
    this.validation = validation;
    this.validation.initialize(this);

    this._setupValidation();

    this.eventAggregator = eventAggregator;
  }

  var _proto = EditProducts.prototype;

  _proto.attached = function attached() {
    $('[data-toggle="tooltip"]').tooltip();
    this.mySubscription = this.eventAggregator.subscribe('upload-progress', function (obj) {
      var elem = document.getElementById("progressBar");
      elem.style.width = obj.progress / obj.total * 100 + '%';
    });
  };

  _proto.detached = function detached() {
    this.mySubscription.dispose();
  };

  _proto.activate = /*#__PURE__*/function () {
    var _activate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var responses;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return Promise.all([this.downloads.getDownloadsArray(true), this.downloads.getDownloadCategoriesArray()]);

            case 2:
              responses = _context.sent;
              this.dataTable.updateArray(this.downloads.appDownloadsArray);
              this.dataTable.createPageButtons(1);

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

  _proto.refresh = /*#__PURE__*/function () {
    var _refresh = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
              _context2.next = 3;
              return this.downloads.getDownloadsArray(true);

            case 3:
              this.dataTable.updateArray(this.downloads.appDownloadsArray);
              this.spinnerHTML = "";

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function refresh() {
      return _refresh.apply(this, arguments);
    }

    return refresh;
  }();

  _proto.new = /*#__PURE__*/function () {
    var _new2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              this.editIndex = -1;
              this.downloads.selectDownload();
              this.newDownload = true;
              $("#editName").focus();
              this.downloadSelected = true;

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function _new() {
      return _new2.apply(this, arguments);
    }

    return _new;
  }();

  _proto.edit = /*#__PURE__*/function () {
    var _edit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(index, el) {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              this.editIndex = this.dataTable.getOriginalIndex(index);
              this.downloads.selectDownload(this.editIndex);
              this.newDownload = false;
              this.originalDownload = this.utils.copyObject(this.downloads.selectedDownload);
              this.downloads.selectedDownload.downCatcode = this.downloads.selectedDownload.downCatcode.toString();
              this.selectedURL = this.config.DOWNLOAD_FILE_DOWNLOAD_URL + '/' + this.downloads.selectedDownload.downCatcode + '/' + this.downloads.selectedDownload.file.fileName; //Editing a product

              $("#editName").focus(); //Reset the selected row

              if (this.selectedRow) this.selectedRow.children().removeClass('info');
              this.selectedRow = $(el.target).closest('tr');
              this.selectedRow.children().addClass('info');
              this.downloadSelected = true;

            case 11:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function edit(_x, _x2) {
      return _edit.apply(this, arguments);
    }

    return edit;
  }();

  _proto.cancel = function cancel() {
    this.filesToUpload = new Array();

    if (this.editIndex == -1) {
      this.new();
    } else {
      this.downloads.selectDownload(this.editIndex);
      this.originalDownload = this.utils.copyObject(this.downloads.selectedDownload);
      this.downloads.selectedDownload.downCatcode = this.downloads.selectedDownload.downCatcode.toString();
    }
  };

  _proto.save = /*#__PURE__*/function () {
    var _save = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      var serverResponse;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (!this.validation.validate(1, this)) {
                _context5.next = 15;
                break;
              }

              _context5.next = 3;
              return this.downloads.saveDownload();

            case 3:
              serverResponse = _context5.sent;

              if (serverResponse.error) {
                _context5.next = 15;
                break;
              }

              if (!(this.filesToUpload && this.filesToUpload.length > 0)) {
                _context5.next = 13;
                break;
              }

              this.uploading = true;
              _context5.next = 9;
              return this.downloads.uploadFile(this.filesToUpload);

            case 9:
              this.utils.showNotification("Download " + this.downloads.selectedDownload.name + " was updated");

              this._cleanUp();

              _context5.next = 15;
              break;

            case 13:
              this.utils.showNotification("Download " + this.downloads.selectedDownload.name + " was updated");

              this._cleanUp();

            case 15:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function save() {
      return _save.apply(this, arguments);
    }

    return save;
  }();

  _proto.deleteFile = function deleteFile() {
    this.downloads.selectedDownload = "";
  };

  _proto.changeFiles = function changeFiles() {
    this.selectedFile = this.files[0].name;
    this.filesSelected = this.downloads.selectedDownload ? true : false;
  };

  _proto.delete = function _delete() {
    var _this = this;

    return this.dialog.showMessage("Are you sure you want to delete the download?", "Delete Download", ['Yes', 'No']).whenClosed(function (response) {
      if (!response.wasCancelled) {
        _this.deleteDownload();
      }
    });
  };

  _proto.deleteDownload = /*#__PURE__*/function () {
    var _deleteDownload = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
      var name, serverResponse;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              name = this.downloads.selectedDownload.name;
              _context6.next = 3;
              return this.downloads.deleteDownload();

            case 3:
              serverResponse = _context6.sent;

              if (!serverResponse.error) {
                this.dataTable.updateArray(this.downloads.appDownloadsArray);
                this.utils.showNotification("Download ${name} was deleted");
              }

              this._cleanUp();

            case 6:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function deleteDownload() {
      return _deleteDownload.apply(this, arguments);
    }

    return deleteDownload;
  }();

  _proto.back = function back() {
    var _this2 = this;

    var change = this.downloads.isDirty(this.originalDownload);

    if (change.length) {
      return this.dialog.showMessage("The item has been changed. Do you want to save your changes?", "Save Changes", ['Yes', 'No']).whenClosed(function (response) {
        if (!response.wasCancelled) {
          _this2.save();
        } else {
          _this2.downloadSelected = false;
        }
      });
    } else {
      this.downloadSelected = false;
    }
  };

  _proto._setupValidation = function _setupValidation() {
    this.validation.addRule(1, "editName", [{
      "rule": "required",
      "message": "Name is required",
      "value": "downloads.selectedDownload.name"
    }]);
    this.validation.addRule(1, "editType", [{
      "rule": "required",
      "message": "Type is required",
      "value": "downloads.selectedDownload.downCatcode"
    }]);
    this.validation.addRule(2, "editCatDescription", [{
      "rule": "required",
      "message": "Description is required",
      "value": "downloads.selectedCat.description"
    }, {
      "rule": "custom",
      "message": "An category with that description already exists",
      "valFunction": function valFunction(context) {
        var valid = true;
        context.downloads.appCatsArray.forEach(function (item) {
          if (context.downloads.selectedCat.description === item.description) valid = false;
        });
        return valid;
      }
    }]);
  };

  _proto.openEditCatForm = function openEditCatForm(action) {
    this.editCourseFlag = action === 'edit';

    if (this.editCourseFlag) {
      if ($("#editType").val() != "") {
        this.editCat = true;
        this.downloads.selectCategoryByCode(this.downloads.selectedDownload.downCatcode);
      }
    } else {
      this.editCat = true;
      this.downloads.selectCategory();
    }
  };

  _proto.cancelEditCat = function cancelEditCat() {
    this.editCat = false;
    this.validation.makeValid($("#editCatDescription"));
  };

  _proto.saveCat = /*#__PURE__*/function () {
    var _saveCat = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
      var serverResponse;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              if (!this.validation.validate(2)) {
                _context7.next = 6;
                break;
              }

              _context7.next = 3;
              return this.downloads.saveCategory();

            case 3:
              serverResponse = _context7.sent;

              if (!serverResponse.error) {
                this.utils.showNotification("Download category " + this.downloads.selectedCat.description + " was updated");
              }

              this.editCat = false;

            case 6:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function saveCat() {
      return _saveCat.apply(this, arguments);
    }

    return saveCat;
  }();

  _proto.deleteCat = /*#__PURE__*/function () {
    var _deleteCat = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
      var _this3 = this;

      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              if (!this.downloads.documentsExist(this.downloads.selectedDownload.downCatcode)) {
                _context8.next = 4;
                break;
              }

              return _context8.abrupt("return", this.dialog.showMessage("You can't delete that category because there are exisitng downloads that use it?", "Can't Delete Category", ['OK']).whenClosed(function (response) {}));

            case 4:
              return _context8.abrupt("return", this.dialog.showMessage("Are you sure you want to delete the category?", "Delete Category", ['Yes', 'No']).whenClosed(function (response) {
                if (!response.wasCancelled) {
                  _this3.deleteCategory();
                }
              }));

            case 5:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    function deleteCat() {
      return _deleteCat.apply(this, arguments);
    }

    return deleteCat;
  }();

  _proto.deleteCategory = /*#__PURE__*/function () {
    var _deleteCategory = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
      var name, serverResponse;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              name = this.downloads.selectedCat.description;
              _context9.next = 3;
              return this.downloads.deleteCat();

            case 3:
              serverResponse = _context9.sent;

              if (!serverResponse.error) {
                this.utils.showNotification("Category " + name + " was deleted");
              }

              this.editCat = false;

            case 6:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, this);
    }));

    function deleteCategory() {
      return _deleteCategory.apply(this, arguments);
    }

    return deleteCategory;
  }();

  _proto._cleanUp = function _cleanUp() {
    // this. _cleanUpFilters();
    this.uploading = false;
    this.downloadSelected = false;
    this.selectedFiles = undefined;
    this.files = new Array();
    this.selectedFile = "";
    this.newDownload = false;
    this.filesToUpload = new Array();
  };

  _proto.changeFiles = function changeFiles() {
    var _this4 = this;

    this.filesToUpload = new Array();

    for (var i = 0; i < this.files.length; i++) {
      var addFile = true;
      this.filesToUpload.forEach(function (item) {
        if (item.name === _this4.files[i].name) addFile = false;
      });
      if (addFile) this.filesToUpload.push(this.files[i]);
    }
  };

  _proto.removeFile = function removeFile(index) {
    this.filesToUpload.splice(index, 1);
  };

  _proto._cleanUpFilters = function _cleanUpFilters() {
    $("#name").val("");
    $("#file.originalFilename").val("");
    $("#type").val("");
    $("#active").val("");
    $("#helpTicketRelevant").val("");
    this.dataTable.updateArray(this.downloads.appDownloadsArray);
  };

  _proto.customFileNameSorter = function customFileNameSorter(sortProperty, sortDirection, sortArray, context) {
    return sortArray.sort(function (a, b) {
      var result = a["file"]["originalFilename"] < b["file"]["originalFilename"] ? -1 : a["file"]["originalFilename"] > b["file"]["originalFilename"] ? 1 : 0;
      return result * sortDirection;
    });
  };

  _proto.customCatSorter = function customCatSorter(sortProperty, sortDirection, sortArray, context) {
    return sortArray.sort(function (a, b) {
      var aDescription = context.lookupCategory(a["downCatcode"]);
      var bDesription = context.lookupCategory(b["downCatcode"]);
      var result = aDescription < bDesription ? -1 : aDescription > bDesription ? 1 : 0;
      return result * sortDirection;
    });
  };

  _proto.lookupCategory = function lookupCategory(value) {
    for (var i = 0; i < this.downloads.appCatsArray.length; i++) {
      if (this.downloads.appCatsArray[i].downCatcode === value) return this.downloads.appCatsArray[i].description;
    }

    return "";
  };

  return EditProducts;
}()) || _class);

/***/ }),

/***/ "modules/admin/site/editHelpTickets":
/*!***************************************************!*\
  !*** ./src/modules/admin/site/editHelpTickets.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EditHelpTickets": function() { return /* binding */ EditHelpTickets; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _resources_data_helpTickets__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../resources/data/helpTickets */ 8142);
/* harmony import */ var _resources_utils_validation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../resources/utils/validation */ 2824);
/* harmony import */ var _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../resources/utils/dataTable */ 6847);
/* harmony import */ var _resources_data_documents__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../resources/data/documents */ 7188);
var _dec, _class;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }






var EditHelpTickets = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_resources_data_helpTickets__WEBPACK_IMPORTED_MODULE_1__.HelpTickets, _resources_utils_validation__WEBPACK_IMPORTED_MODULE_2__["default"], _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_3__.DataTable, _resources_data_documents__WEBPACK_IMPORTED_MODULE_4__.DocumentsServices), _dec(_class = /*#__PURE__*/function () {
  function EditHelpTickets(helpTickets, validation, dataTable, documents) {
    this.htTypeSelected = false;
    this.spinnerHTML = "";
    this.html = "<h2>htmlText</h2>";
    this.helpTickets = helpTickets;
    this.validation = validation;
    this.dataTable = dataTable;
    this.dataTable.initialize(this);
    this.documents = documents;
  }

  var _proto = EditHelpTickets.prototype;

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
              return Promise.all([this.helpTickets.getHelpTicketTypes('?order=category', true), this.documents.getDocumentsCategoriesArray()]);

            case 2:
              responses = _context.sent;
              this.dataTable.updateArray(this.helpTickets.helpTicketTypesArray);
              this.filteredDocumentArray = this.documents.docCatsArray;

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

  _proto.refresh = /*#__PURE__*/function () {
    var _refresh = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
              _context2.next = 3;
              return this.helpTickets.getHelpTicketTypes('?order=category', true);

            case 3:
              _context2.next = 5;
              return _context2.sent;

            case 5:
              this.updateArray();
              this.spinnerHTML = "";

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function refresh() {
      return _refresh.apply(this, arguments);
    }

    return refresh;
  }();

  _proto.selectCategory = function selectCategory() {
    if (this.selectedCategory > -1) {
      this.helpTickets.selectHelpTicketTypeCategory(this.selectedCategory);
    }
  };

  _proto.typeSelected = function typeSelected() {
    if (this.selectedSubtype > -1) {
      this.htSubTypeSelected = true;
    } else {
      this.htTypeSelected = false;
    }
  };

  _proto.back = function back() {
    this.htTypeSelected = false;
  };

  _proto.save = /*#__PURE__*/function () {
    var _save = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var resposne;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return this.helpTickets.saveHelpTicketType();

            case 2:
              resposne = _context3.sent;

              if (!response.error) {
                this.dataTable.updateArray(this.helpTickets.helpTicketTypesArray);
                this.filteredDocumentArray = this.documents.docCatsArray;
                this.utils.showNotification('The help ticket type was updated');
              }

              this.htTypeSelected = false;

            case 5:
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

  _proto.cancel = function cancel() {
    if (this.selectedCategory > -1) {
      this.helpTickets.selectHelpTicketTypeCategory(this.selectedCategory);
    }
  };

  _proto.newCategory = function newCategory() {};

  _proto.newSubtype = function newSubtype() {};

  _proto.addDocument = function addDocument(index) {
    if (!this.helpTickets.selectedHelpTicketType.subtypes[this.selectedSubtype].documents) this.helpTickets.selectedHelpTicketType.subtypes[this.selectedSubtype].documents = new Array();

    for (var i = 0; i < this.helpTickets.selectedHelpTicketType.subtypes[this.selectedSubtype].documents.length; i++) {
      if (this.helpTickets.selectedHelpTicketType.subtypes[this.selectedSubtype].documents[i].fileName == this.documents.selectedDocument.files[index].fileName) {
        return;
      }
    }

    var newDoc = {
      categoryCode: this.documents.selectedDocument.categoryCode,
      categoryName: this.documents.selectedDocument.name,
      fileName: this.documents.selectedDocument.files[index].fileName,
      default: true
    };
    this.helpTickets.selectedHelpTicketType.subtypes[this.selectedSubtype].documents.push(newDoc);
  };

  _proto.chooseDocument = function chooseDocument(index, event) {
    this.documents.selectDocument(index); //Reset the selected row

    if (this.selectedRow) this.selectedRow.children().removeClass('info');
    this.selectedRow = $(event.target).closest('tr');
    this.selectedRow.children().addClass('info');
    this.showDocumentForm = true;
  };

  _proto.toggleDefault = function toggleDefault(index) {
    this.helpTickets.selectedHelpTicketType.subtypes[this.selectedSubtype].documents[index].default = !this.helpTickets.selectedHelpTicketType.subtypes[this.selectedSubtype].documents[index].default;
  };

  _proto.removeDocument = function removeDocument(index) {
    this.helpTickets.selectedHelpTicketType.subtypes[this.selectedSubtype].documents.splice(index, 1);
  };

  _proto.typeChanged = /*#__PURE__*/function () {
    var _typeChanged = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(index) {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (!(index >= 0)) {
                _context4.next = 6;
                break;
              }

              this.categoryIndex = index;
              this.documents.selectCategory(index);
              _context4.next = 5;
              return this.documents.getDocumentsArray(true, '?filter=categoryCode|eq|' + this.documents.selectedCat.code);

            case 5:
              this.showDocuments = true;

            case 6:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function typeChanged(_x) {
      return _typeChanged.apply(this, arguments);
    }

    return typeChanged;
  }();

  return EditHelpTickets;
}()) || _class);

/***/ }),

/***/ "modules/admin/site/editMessages":
/*!************************************************!*\
  !*** ./src/modules/admin/site/editMessages.js ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EditMessages": function() { return /* binding */ EditMessages; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../resources/utils/dataTable */ 6847);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../config/appConfig */ 1666);
/* harmony import */ var _resources_utils_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../resources/utils/utils */ 8741);
/* harmony import */ var _resources_data_siteInfo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../resources/data/siteInfo */ 1290);
/* harmony import */ var _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../resources/dialogs/common-dialogs */ 6545);
/* harmony import */ var _resources_utils_validation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../resources/utils/validation */ 2824);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! moment */ 381);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_7__);
var _dec, _class;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }









var EditMessages = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_1__.DataTable, _resources_data_siteInfo__WEBPACK_IMPORTED_MODULE_4__.SiteInfo, _resources_utils_utils__WEBPACK_IMPORTED_MODULE_3__.Utils, _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_5__.CommonDialogs, _resources_utils_validation__WEBPACK_IMPORTED_MODULE_6__["default"], _config_appConfig__WEBPACK_IMPORTED_MODULE_2__.AppConfig), _dec(_class = /*#__PURE__*/function () {
  function EditMessages(datatable, siteinfo, utils, dialog, validation, config) {
    this.newsItemSelected = false;
    this.navControl = "newsNavButtons";
    this.spinnerHTML = "";
    this.isInformationItem = false;
    this.toolbar = [['style', ['style', 'bold', 'italic', 'underline', 'clear']], ['color', ['color']], ['font', ['strikethrough', 'superscript', 'subscript']], ['layout', ['ul', 'ol', 'paragraph']], ['insert', ['link', 'table', 'hello']], ['misc', ['undo', 'redo', 'fullscreen', 'codeview']]];
    this.dataTable = datatable;
    this.dataTable.initialize(this);
    this.utils = utils;
    this.siteinfo = siteinfo;
    this.dialog = dialog;
    this.config = config;
    this.validation = validation;
    this.validation.initialize(this);

    this._setupValidation();
  }

  var _proto = EditMessages.prototype;

  _proto.attached = function attached() {
    $('[data-toggle="tooltip"]').tooltip();
  };

  _proto.activate = /*#__PURE__*/function () {
    var _activate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var responses;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return Promise.all([this.siteinfo.getMessageArray('', true), this.config.getConfig()]);

            case 2:
              responses = _context.sent;
              this.dataTable.updateArray(this.siteinfo.messageArray);
              this.dataTable.createPageButtons(1);

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

  _proto.refresh = /*#__PURE__*/function () {
    var _refresh = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
              _context2.next = 3;
              return this.siteinfo.getMessageArray('', true);

            case 3:
              this.dataTable.updateArray(this.siteinfo.messageArray);
              this.spinnerHTML = "";

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function refresh() {
      return _refresh.apply(this, arguments);
    }

    return refresh;
  }();

  _proto.new = /*#__PURE__*/function () {
    var _new2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              this.editIndex = -1;
              this.siteinfo.selectMessage(this.editIndex);
              this.siteinfo.selectedMessage.category = this.config.MESSAGE_TYPES[0];
              $("#editKey").focus();
              this.messageItemSelected = true;

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function _new() {
      return _new2.apply(this, arguments);
    }

    return _new;
  }();

  _proto.edit = /*#__PURE__*/function () {
    var _edit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(index, el) {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              this.editIndex = this.dataTable.getOriginalIndex(index);
              this.siteinfo.selectMessage(this.editIndex);
              this.originalMessage = this.utils.copyObject(this.siteinfo.selectedMessage); //Reset the selected row

              if (this.selectedRow) this.selectedRow.children().removeClass('info');
              this.selectedRow = $(el.target).closest('tr');
              this.selectedRow.children().addClass('info');
              this.messageItemSelected = true;
              document.body.scrollTop = document.documentElement.scrollTop = 0;

            case 8:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function edit(_x, _x2) {
      return _edit.apply(this, arguments);
    }

    return edit;
  }();

  _proto.cancel = function cancel() {
    if (this.editIndex == -1) {
      this.new();
    } else {
      this.siteinfo.selectMessage(this.editIndex);
    }
  };

  _proto.save = /*#__PURE__*/function () {
    var _save = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      var serverResponse;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (!this.validation.validate(1)) {
                _context5.next = 6;
                break;
              }

              _context5.next = 3;
              return this.siteinfo.saveMessageItem();

            case 3:
              serverResponse = _context5.sent;

              if (!serverResponse.error) {
                this.dataTable.updateArray(this.siteinfo.messageArray);
                this.utils.showNotification("The message was updated");
              }

              this.messageItemSelected = false;

            case 6:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function save() {
      return _save.apply(this, arguments);
    }

    return save;
  }();

  _proto.delete = function _delete() {
    var _this = this;

    return this.dialog.showMessage("Are you sure you want to delete the message?", "Delete Message", ['Yes', 'No']).then(function (response) {
      if (!response.wasCancelled) {
        _this.deleteMessage();
      }
    });
  };

  _proto.deleteMessage = /*#__PURE__*/function () {
    var _deleteMessage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
      var serverResponse;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return this.siteinfo.deleteMessage();

            case 2:
              serverResponse = _context6.sent;

              if (!serverResponse.error) {
                this.dataTable.updateArray(this.siteinfo.messageArray);
                this.utils.showNotification("The message was deleted");
              }

              this.messageItemSelected = false;

            case 5:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function deleteMessage() {
      return _deleteMessage.apply(this, arguments);
    }

    return deleteMessage;
  }();

  _proto.back = function back() {
    var _this2 = this;

    var change = this.siteinfo.isMessageDirty(this.originalMessage);

    if (change.length) {
      return this.dialog.showMessage("The message has been changed. Do you want to save your changes?", "Save Changes", ['Yes', 'No']).then(function (response) {
        if (!response.wasCancelled) {
          _this2.save();
        } else {
          _this2.messageItemSelected = false;
        }
      });
    } else {
      this.messageItemSelected = false;
    }
  };

  _proto._cleanUpFilters = function _cleanUpFilters() {
    $("#key").val("");
  };

  _proto._setupValidation = function _setupValidation() {
    this.validation.addRule(1, "editKey", [{
      "rule": "required",
      "message": "Title is required",
      "value": "siteinfo.selectedMessage.key"
    }]);
  };

  return EditMessages;
}()) || _class);

/***/ }),

/***/ "modules/admin/site/editNews":
/*!********************************************!*\
  !*** ./src/modules/admin/site/editNews.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EditNews": function() { return /* binding */ EditNews; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../resources/utils/dataTable */ 6847);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../config/appConfig */ 1666);
/* harmony import */ var _resources_utils_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../resources/utils/utils */ 8741);
/* harmony import */ var _resources_data_siteInfo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../resources/data/siteInfo */ 1290);
/* harmony import */ var _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../resources/dialogs/common-dialogs */ 6545);
/* harmony import */ var _resources_utils_validation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../resources/utils/validation */ 2824);
var _dec, _class;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }








var EditNews = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_1__.DataTable, _resources_data_siteInfo__WEBPACK_IMPORTED_MODULE_4__.SiteInfo, _resources_utils_utils__WEBPACK_IMPORTED_MODULE_3__.Utils, _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_5__.CommonDialogs, _resources_utils_validation__WEBPACK_IMPORTED_MODULE_6__["default"], _config_appConfig__WEBPACK_IMPORTED_MODULE_2__.AppConfig), _dec(_class = /*#__PURE__*/function () {
  function EditNews(datatable, siteinfo, utils, dialog, validation, config) {
    this.newsItemSelected = false;
    this.spinnerHTML = "";
    this.isInformationItem = false;
    this.isChecked = true;
    this.toolbar = [['style', ['style', 'bold', 'italic', 'underline', 'clear']], ['color', ['color']], ['font', ['strikethrough', 'superscript', 'subscript']], ['layout', ['ul', 'ol', 'paragraph']], ['insert', ['link', 'table', 'hello']], ['misc', ['undo', 'redo', 'fullscreen', 'codeview']]];
    this.dataTable = datatable;
    this.dataTable.initialize(this);
    this.utils = utils;
    this.siteinfo = siteinfo;
    this.dialog = dialog;
    this.config = config;
    this.validation = validation;
    this.validation.initialize(this);

    this._setupValidation();

    this.userObj = JSON.parse(sessionStorage.getItem('user'));
  }

  var _proto = EditNews.prototype;

  _proto.attached = function attached() {
    $('[data-toggle="tooltip"]').tooltip();
  };

  _proto.activate = /*#__PURE__*/function () {
    var _activate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.siteinfo.getInfoArray(true, '?order=createdDate');

            case 2:
              _context.next = 4;
              return this.config.getConfig();

            case 4:
              this.dataTable.updateArray(this.siteinfo.siteArray);
              this.filterOutExpired();

            case 6:
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

  _proto.refresh = /*#__PURE__*/function () {
    var _refresh = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
              _context2.next = 3;
              return this.siteinfo.getInfoArray(true);

            case 3:
              this.dataTable.updateArray(this.siteinfo.siteArray);
              this.spinnerHTML = "";

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function refresh() {
      return _refresh.apply(this, arguments);
    }

    return refresh;
  }();

  _proto.new = /*#__PURE__*/function () {
    var _new2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              this.editIndex = -1;
              this.siteinfo.selectSiteItem(this.editIndex);
              $("#editTitle").focus();
              this.newsItemSelected = true;

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function _new() {
      return _new2.apply(this, arguments);
    }

    return _new;
  }();

  _proto.edit = /*#__PURE__*/function () {
    var _edit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(index, el, item) {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              this.siteinfo.setSiteItem(item);
              this.originalSiteInfo = this.utils.copyObject(this.siteinfo.selectedItem); //Editing a product

              $("#editTitle").focus(); //Reset the selected row

              if (this.selectedRow) this.selectedRow.children().removeClass('info');
              this.selectedRow = $(el.target).closest('tr');
              this.selectedRow.children().addClass('info');
              document.body.scrollTop = document.documentElement.scrollTop = 0;
              this.newsItemSelected = true;

            case 8:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function edit(_x, _x2, _x3) {
      return _edit.apply(this, arguments);
    }

    return edit;
  }();

  _proto.cancel = function cancel() {
    if (this.editIndex == -1) {
      this.new();
    } else {
      this.siteinfo.selectSiteItem(this.editIndex);
    }
  };

  _proto.save = /*#__PURE__*/function () {
    var _save = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      var serverResponse;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (!this.validation.validate(1)) {
                _context5.next = 6;
                break;
              }

              _context5.next = 3;
              return this.siteinfo.saveInfoItem();

            case 3:
              serverResponse = _context5.sent;

              if (!serverResponse.error) {
                this.dataTable.updateArray(this.siteinfo.siteArray);
                this.utils.showNotification("The item was saved");

                if (this.filesToUpload && this.filesToUpload.length > 0) {
                  this.siteinfo.uploadFile(this.filesToUpload);
                }
              } else {
                this.utils.showNotification("There was a problem saving the item", 'error');
              }

              this._cleanUp();

            case 6:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function save() {
      return _save.apply(this, arguments);
    }

    return save;
  }();

  _proto.changeFiles = function changeFiles() {
    this.filesToUpload = new Array();
    this.filesToUpload.push(this.files[0]);
    this.siteinfo.selectedItem.url = this.config.DOWNLOAD_URL + '/site/' + this.filesToUpload[0].name;
    this.siteinfo.selectedItem.file.fileName = this.filesToUpload[0].name;
  };

  _proto.removeFile = function removeFile(index) {
    this.filesToUpload.splice(index, 1);
  };

  _proto.delete = function _delete() {
    var _this = this;

    return this.dialog.showMessage("Are you sure you want to delete the item?", "Delete Item", ['Yes', 'No']).whenClosed(function (response) {
      if (!response.wasCancelled) {
        _this.deleteItem();
      }
    });
  };

  _proto.deleteItem = /*#__PURE__*/function () {
    var _deleteItem = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
      var serverResponse;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return this.siteinfo.deleteItem();

            case 2:
              serverResponse = _context6.sent;

              if (!serverResponse.error) {
                this.dataTable.updateArray(this.siteinfo.siteArray);
                this.utils.showNotification("The Item was deleted");
              }

              this.newsItemSelected = false;
              this.selectedFiles = undefined;
              this.files = undefined;

            case 7:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function deleteItem() {
      return _deleteItem.apply(this, arguments);
    }

    return deleteItem;
  }();

  _proto.back = function back() {
    var _this2 = this;

    var changes = this.siteinfo.isDirty(this.originalSiteInfo);

    if (changes.length) {
      return this.dialog.showMessage("The item has been changed. Do you want to save your changes?", "Save Changes", ['Yes', 'No']).whenClosed(function (response) {
        if (!response.wasCancelled) {
          _this2.save();
        } else {
          _this2.newsItemSelected = false;
        }
      });
    } else {
      this.newsItemSelected = false;
    }
  };

  _proto._cleanUp = function _cleanUp() {
    this._cleanUpFilters();

    this.filesToUpload = new Array();
    this.selectedFiles = undefined;
    this.files = undefined;
    this.newsItemSelected = false;
  };

  _proto._cleanUpFilters = function _cleanUpFilters() {
    this.urlFilterValue = "";
    this.itemTypeFilter = "";
    this.expiredDateFilterValue = "";
    this.createdDateFilterValue = "";
    this.titleFilterValue = "";
    this.urlFilterValue = "";
    this.dataTable.updateArray(this.siteinfo.siteArray);
    this.filterOutExpired();
  };

  _proto._setupValidation = function _setupValidation() {
    this.validation.addRule(1, "editTitle", [{
      "rule": "required",
      "message": "Title is required",
      "value": "siteinfo.selectedItem.title"
    }]);
  } //TODO: Fix This
  ;

  _proto.filterOutExpired = function filterOutExpired() {
    // this._cleanUpFilters();
    if (this.isChecked) {
      this.dataTable.filterList(new Date(), {
        type: 'date',
        filter: "expiredFilter",
        collectionProperty: 'expiredDate',
        compare: 'after'
      });
    } else {
      this.dataTable.updateArray(this.siteinfo.siteArray);
    }
  };

  return EditNews;
}()) || _class);

/***/ }),

/***/ "modules/admin/site/site":
/*!****************************************!*\
  !*** ./src/modules/admin/site/site.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Site": function() { return /* binding */ Site; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var aurelia_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-router */ 6433);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../config/appConfig */ 1666);
var _dec, _class;




var Site = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(aurelia_router__WEBPACK_IMPORTED_MODULE_1__.Router, _config_appConfig__WEBPACK_IMPORTED_MODULE_2__.AppConfig), _dec(_class = /*#__PURE__*/function () {
  function Site(router, config) {
    this.title = "Site Information";
    this.router = router;
    this.config = config;
  }

  var _proto = Site.prototype;

  _proto.activate = function activate() {
    this.config.getConfig(true);
  };

  _proto.attached = function attached() {
    $(".nav a").on("click", function () {
      $(".nav").find(".active").removeClass("active");
      $(this).parent().addClass("active");
    });
  };

  _proto.configureRouter = function configureRouter(config, router) {
    config.map([{
      route: ['', 'editNews'],
      moduleId: './editNews',
      settings: {
        auth: false,
        roles: []
      },
      nav: true,
      name: 'editNews',
      title: 'Site Information'
    }, {
      route: 'downloads',
      moduleId: './editDownloads',
      settings: {
        auth: false,
        roles: []
      },
      nav: true,
      name: 'downloads',
      title: 'Downloads'
    }, {
      route: 'messages',
      moduleId: './editMessages',
      settings: {
        auth: false,
        roles: []
      },
      nav: true,
      name: 'messages',
      title: 'Messages'
    }, {
      route: 'config',
      moduleId: './editConfig',
      settings: {
        auth: false,
        roles: []
      },
      nav: true,
      name: 'config',
      title: 'Config'
    }, {
      route: 'curriculum',
      moduleId: './editCurriculum',
      settings: {
        auth: false,
        roles: []
      },
      nav: true,
      name: 'curriculum',
      title: 'Curriculum'
    }, {
      route: 'helptickets',
      moduleId: './editHelpTickets',
      settings: {
        auth: false,
        roles: []
      },
      nav: true,
      name: 'helptickets',
      title: 'Help Tickets'
    }, {
      route: 'admin',
      moduleId: './admin',
      settings: {
        auth: false,
        roles: []
      },
      nav: true,
      name: 'admin',
      title: 'Server Admin'
    }]);
    this.router = router;
  };

  return Site;
}()) || _class);

/***/ }),

/***/ "modules/admin/site/admin.html":
/*!*******************************************!*\
  !*** ./src/modules/admin/site/admin.html ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t<style>\r\n        .menuButtons {\r\n\t\t\tcolor: ${config.ACTIVE_SUBMENU_COLOR};\r\n\t\t\tbackground-color:${config.SUBMENU_BACKGROUND}\r\n        }\r\n    </style>\r\n\t<div class=\"fluid-container\">\r\n\r\n\t\t<div class=\"panel panel-default\">\r\n\t\t<div class=\"panel-body\">\r\n\t\t\t<div class=\"col-lg-3\">\r\n\t\t\t<h4>Files</h4>\r\n\t\t\t<div>\r\n\t\t\t\t<ul class=\"list-group\" id=\"buttonGroup\">\r\n\t\t\t\t\t<button click.trigger=\"typeSelected($event, $index, type)\" type=\"button\" repeat.for=\"type of tabs\" id=\"${type.screenToShow}\"\r\n\t\t\t\t\t\tclass=\"${ $first ? 'menuButtons list-group-item' : 'list-group-item'}\">${type.id}</button>\r\n\t\t\t\t</ul>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class=\"col-lg-9\">\r\n\t\t\t\r\n\t\t\t<compose if.bind=\"(screenToShow == 'log' || screenToShow == 'auth') && fileList.length\" view='./components/logFileTable.html'></compose>\r\n\t\t\t\r\n\t\t\t<compose if.bind=\"screenToShow === 'forl' || screenToShow === 'fore' || screenToShow === 'foro'\" view='./components/foreverLogs.html'></compose>\r\n\t\t\t\r\n\t\t\t<compose if.bind=\"showFileList && screenToShow === 'files'\" view='./components/uploadedFilesTable.html'></compose>\r\n\t\t</div>\r\n\t</div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/site/components/configForm.html":
/*!***********************************************************!*\
  !*** ./src/modules/admin/site/components/configForm.html ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t<div class=\"col-lg-12 bottomMargin\">\r\n\t\t<div class=\"list-group-item toolbar\">\r\n\t\t\t<span click.delegate=\"back()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n\t\t\t title=\"\" data-original-title=\"Back\"><i class=\"fa fa-arrow-left fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n\t\t\t<span click.delegate=\"save()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n\t\t\t title=\"\" data-original-title=\"Save\"><i class=\"fa fa-floppy-o fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n\t\t\t<span click.delegate=\"cancel()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n\t\t\t title=\"\" data-original-title=\"Cancel Changes\"><i class=\"fa fa-ban fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n\t\t</div>\r\n\t</div>\r\n\t<div class=\"panel panel-info positionUnderToolbar\">\r\n\t\t<div class=\"panel-body\">\r\n\t\t\t<div class=\"row\">\r\n\t\t\t\t<div class=\"row bigTopMargin\">\r\n\t\t\t\t\t<div class=\"col-lg-10 col-lg-offset-1\">\r\n\t\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t\t<editor value.bind=\"siteConfig.configArray[selectedIndex].value\" toolbar.bind=\"toolbar\" height=\"250\"></editor>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div innerhtml.bind=\"siteConfig.configArray[selectedIndex].value\" class=\"col-lg-10 col-lg-offset-1 bigTopMargin\">\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/site/components/configTable.html":
/*!************************************************************!*\
  !*** ./src/modules/admin/site/components/configTable.html ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n     <style>\r\n        .menuButtons {\r\n\t\t\tcolor: ${config.ACTIVE_SUBMENU_COLOR};\r\n\t\t\tbackground-color:${config.BUTTONS_BACKGROUND}\r\n        }\r\n    </style>\r\n    <div class=\"col-lg-2 lefMargin\">\r\n        <div id=\"configListGroup\" class=\"list-group\">\r\n            <a class=\"${ $first ? 'menuButtons' : ''} list-group-item\" repeat.for=\"tab of tabs\" href=\"\" class=\"list-group-item\" click.delegate=\"changeTab($event, $index)\">\r\n                <h4 id=\"${tab.id}\" class=\"list-group-item-heading\">${tab.id}</h4>\r\n            </a>\r\n        </div>\r\n    </div>\r\n    <div class=\"col-lg-10\">\r\n        <div class=\"col-lg-12 col-sm-12\" style='padding:15px;'>\r\n            <div class='row'>\r\n                <div class=\"bottomMargin list-group-item leftMargin rightMargin panelContrastColor\">\r\n                    <span click.delegate=\"save()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Save\"><i class=\"fa fa-floppy-o fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n                    <span click.delegate=\"cancel()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Cancel Changes\"><i class=\"fa fa-ban fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n                </div>   \r\n                <div class='col-lg-12 bottomMargin'>\r\n                    <compose view=\"../../../../resources/elements/table-navigation-bar.html\"></compose>\r\n                    <div id=\"no-more-tables\">\r\n                        <table id=\"newsTable\" class=\"table table-striped table-hover cf\">\r\n                            <thead class=\"cf\">\r\n                                <tr>\r\n                                    <td colspan='5'>\r\n                                        <span click.delegate=\"refresh()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n                                            title=\"\" data-original-title=\"Refresh\"><i class=\"fa fa-refresh\" aria-hidden=\"true\"></i></span>\r\n                                        <span class=\"pull-right\" id=\"spinner\" innerhtml.bind=\"spinnerHTML\"></span>\r\n                                    </td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <th style=\"width:200px;\"><span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'parameter'})\">Parameter </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                                    <th style=\"width:300px;\">Description</th>\r\n                                    <th style=\"width:100px;\">Value</th>\r\n                                    <th style=\"width:200px;\">Date Modified</th>\r\n                                </tr>\r\n                            </thead>\r\n                            <tbody>\r\n                                <tr>\r\n                                    <th>\r\n                                        <input value.bind=\"parameterFilterValue\" input.delegate=\"dataTable.filterList(parameterFilterValue, { type: 'text',  filter: 'parameterFilter', collectionProperty: 'parameter', displayProperty: 'parameter',  compare:'match'} )\"  class=\"form-control\" />\r\n                                    </th>\r\n                                    <th></th>\r\n                                    <th></th>\r\n                                </tr>\r\n                                <tr  repeat.for=\"item of dataTable.displayArray\">\r\n                                    <td data-title=\"Parameter\">${item.parameter}</td>\r\n                                    <td data-title=\"Description\">${item.description}</td>\r\n                                    <td data-title=\"Value\">\r\n                                        <input show.bind=\"item.type == 'value'\" readonly.bind=\"item.readOnly\" value.bind=\"item.value\" id=\"editValue\" class=\"form-control\" type=\"text\" />\r\n                                        <div show.bind=\"item.type == 'boolean'\">\r\n                                            <span  click.delegate=\"switchValue(item)\" innerhtml=\"${item.value | onoffSwitch}\"></span>\r\n                                        </div>\r\n                                        <div show.bind=\"item.type == 'html'\">\r\n                                            <span click.delegate=\"edit(item)\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Edit\"><i class=\"fa fa-pencil fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n                                        </div> \r\n                                    </td>\r\n\r\n                                    <td data-title=\"Modified Date\"><div>${item.dateModified | dateFormat:config.DATE_FORMAT_TABLE}</div></td>\r\n                                </tr>\r\n                            </tbody>\r\n                        </table>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/site/components/curriculumForm.html":
/*!***************************************************************!*\
  !*** ./src/modules/admin/site/components/curriculumForm.html ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div class=\"col-lg-12\">\r\n\r\n        <div class=\"list-group-item toolbar\">\r\n            <span click.delegate=\"back()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n                data-placement=\"bottom\" title=\"\" data-original-title=\"Back\"><i class=\"fa fa-arrow-left fa-lg fa-border\"\r\n                    aria-hidden=\"true\"></i></span>\r\n            <span click.delegate=\"save()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n                data-placement=\"bottom\" title=\"\" data-original-title=\"Save\"><i class=\"fa fa-floppy-o fa-lg fa-border\"\r\n                    aria-hidden=\"true\"></i></span>\r\n            <span click.delegate=\"cancel()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n                data-placement=\"bottom\" title=\"\" data-original-title=\"Cancel Changes\"><i class=\"fa fa-ban fa-lg fa-border\"\r\n                    aria-hidden=\"true\"></i></span>\r\n            <span show.bind=\"!newItem\" click.delegate=\"delete()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n                data-placement=\"bottom\" title=\"\" data-original-title=\"Delete\"><i class=\"fa fa-trash fa-lg fa-border text-danger\"\r\n                    aria-hidden=\"true\"></i></span>\r\n        </div>\r\n        <div class=\"panel panel-info positionUnderToolbar\">\r\n            <div class=\"panel-body\">\r\n                <div class=\"row\">\r\n                    <form class=\"form-horizontal topMargin\">\r\n                        <div class=\"row\">\r\n                            <div class=\"col-sm-12 col-lg-12\">\r\n                                <div class=\"form-group\">\r\n                                    <label for=\"editType\" class=\"col-sm-2 control-label hideOnPhone\">Category</label>\r\n                                    <div class=\"col-sm-8\">\r\n                                        <select value.bind=\"curriculum.selectedCurriculum.category\" class=\"form-control\"\r\n                                            id=\"itemType\">\r\n                                            <option value=\"\">--- Choose a Category ---</option>\r\n                                            <option value=\"${category.name}\" repeat.for=\"category of curriculum.curriculumCatArray\">${category.name}</optionp>\r\n                                        </select>\r\n                                        <a class=\"btn btn-link\" click.trigger=\"openEditCatForm('new')\" aria-hidden=\"true\">(Add\r\n                                            a Category)</a>\r\n                                        <a class=\"btn btn-link\" disable.bind=\"curriculum.selectedCurriculum.category == ''\"\r\n                                            click.trigger=\"openEditCatForm('edit')\" aria-hidden=\"true\">(Edit this\r\n                                            Category)</a>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div show.bind=\"showCategoryForm\" class=\"row\">\r\n                            <div class=\"panel panel-default col-lg-8 col-lg-offset-2\" style=\"background-color:ghostwhite;\">\r\n                                <div class=\"panel-body\">\r\n                                    <div class=\"list-group-item bottomMargin col-sm-12 topMargin\">\r\n                                        <span click.delegate=\"saveCategory()\" class=\"smallMarginRight\"\r\n                                            bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n                                            data-original-title=\"Save\"><i class=\"fa fa-floppy-o fa-lg fa-border\"\r\n                                                aria-hidden=\"true\"></i></span>\r\n                                        <span click.delegate=\"cancelEditCategory()\" class=\"smallMarginRight\"\r\n                                            bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n                                            data-original-title=\"Cancel Changes\"><i class=\"fa fa-ban fa-lg fa-border\"\r\n                                                aria-hidden=\"true\"></i></span>\r\n                                        <span show.bind=\" editCategoryFlag\" click.delegate=\"deleteCat()\" class=\"smallMarginRight\"\r\n                                            bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n                                            data-original-title=\"Delete\"><i class=\"fa fa-trash fa-lg fa-border text-danger\"\r\n                                                aria-hidden=\"true\"></i></span>\r\n                                    </div>\r\n                                    <div class=\"row\">\r\n                                        <div class=\"col-sm-12 col-lg-12\">\r\n                                            <div class=\"form-group\">\r\n                                                <label for=\"editTitle\" class=\"col-sm-2 control-label hideOnPhone\">Title</label>\r\n                                                <div class=\"col-sm-8\">\r\n                                                    <input value.bind=\"curriculum.selectedCurriculumCategory.name\" id=\"editCategoryName\"\r\n                                                        class=\"form-control \" placeholder=\"Name\" type=\"text\" />\r\n                                                </div>\r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"row\">\r\n                                        <div class=\"col-sm-12 col-lg-12\">\r\n                                            <div class=\"form-group\">\r\n                                                <label for=\"editCategory\" class=\"col-sm-2 control-label hideOnPhone\">Description</label>\r\n                                                <div class=\"col-sm-8\">\r\n                                                    <editor value.bind=\"curriculum.selectedCurriculumCategory.categoryDescription\"\r\n                                                        toolbar.bind=\"toolbar\" height=\"250\"></editor>\r\n\r\n                                                </div>\r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"row\">\r\n                            <div class=\"col-sm-12 col-lg-12\">\r\n                                <div class=\"form-group\">\r\n                                    <label for=\"editTitle\" class=\"col-sm-2 control-label hideOnPhone\">Title</label>\r\n                                    <div class=\"col-sm-8\">\r\n                                        <input value.bind=\"curriculum.selectedCurriculum.title\" id=\"editTitle\" class=\"form-control \"\r\n                                            placeholder=\"Title\" type=\"text\" />\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"row\">\r\n                            <div class=\"col-sm-12 col-lg-12\">\r\n                                <div class=\"form-group\">\r\n                                    <label for=\"editContent\" class=\"col-sm-2 control-label hideOnPhone\">Description</label>\r\n                                    <div class=\"col-sm-8\">\r\n                                        <editor value.bind=\"curriculum.selectedCurriculum.description\" toolbar.bind=\"toolbar\"\r\n                                            height=\"250\"></editor>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"row\">\r\n                            <div class=\"col-sm-12 col-lg-12\">\r\n                                <div class=\"form-group\">\r\n                                    <label show.bind=\"curriculum.selectedCurriculum.file.fileName\" for=\"editFile\" class=\"col-sm-2 control-label hideOnPhone topMargin\">File</label>\r\n                                    <div class=\"col-sm-3 topMargin\" show.bind=\"curriculum.selectedCurriculum.file.fileName != undefined\">\r\n                                        <a href=\"${config.DOWNLOAD_URL}/curriculum/${curriculum.selectedCurriculum.category}/${curriculum.selectedCurriculum.file.fileName}\"\r\n                                            innerhtml.bind='curriculum.selectedCurriculum.file.fileName' target='_blank'></a>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"row\">\r\n                            <div class=\"col-lg-2 col-lg-offset-2\">\r\n                                <label class=\"btn btn-primary\">\r\n                                    Browse for files&hellip; <input id=\"uploadControl\" type=\"file\" style=\"display: none;\"\r\n                                        change.delegate=\"changeFiles()\" files.bind=\"files\">\r\n                                </label>\r\n                            </div>\r\n                            <div class=\"col-lg-6\">\r\n                                <ul show.bind=\"!uploading\">\r\n                                    <li repeat.for=\"file of filesToUpload\" class=\"list-group-item\">${file.name}<span\r\n                                            click.delegate=\"removeFile($index)\" class=\"pull-right\"><i class=\"fa fa-trash\"\r\n                                                aria-hidden=\"true\"></i></span></li>\r\n                                </ul>\r\n                                <div show.bind=\"uploading\" class=\"progress progress-striped active\">\r\n                                    <div id=\"progressBar\" class=\"progress-bar\" style=\"width: 0%\"></div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-12\">\r\n                            <div class=\"col-md-5 topMargin\">\r\n                                <label>Available Products</label>\r\n                                <div class=\"well well2 overFlow\" style=\"height:400px;\">\r\n                                    <input class=\"form-control\" value.bind=\"filter\" input.trigger=\"filterList()\"\r\n                                        placeholder=\"Filter products\" />\r\n                                    <ul class=\"list-group\">\r\n                                        <button click.trigger=\"selectProduct($event)\" type=\"button\" repeat.for=\"product of filteredProductsArray\"\r\n                                            id=\"${product._id}\" class=\"list-group-item\">${product.name}</button>\r\n                                    </ul>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"col-md-5 col-md-offset-1 topMargin\">\r\n                                <label id=\"requestProductsLabel\">Requested Products</label>\r\n                                <div class=\"well well2 overflow\" style=\"height:400px;\">\r\n                                    <ul class=\"list-group\">\r\n                                        <button click.trigger=\"removeProduct($event)\" type=\"button\" repeat.for=\"product of curriculum.selectedCurriculum.products\"\r\n                                            id=\"${product}\" class=\"list-group-item\">${product |\r\n                                            lookupValue:products.productsArray:\"_id\":\"name\"}</button>\r\n                                    </ul>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </form>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/site/components/curriculumTable.html":
/*!****************************************************************!*\
  !*** ./src/modules/admin/site/components/curriculumTable.html ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div class=\"panel panel-info\">\r\n        <div class=\"panel-body\">\r\n            <div class=\"row\">\r\n                <div class=\"col-lg-12 col-sm-12\" style='padding:15px;'>\r\n                    <div class='row'>\r\n                        <div class='col-lg-12 bottomMargin'>\r\n                            <compose view=\"../../../../resources/elements/table-navigation-bar.html\"></compose>\r\n                            <div id=\"no-more-tables\">\r\n                                <table id=\"newsTable\" class=\"table table-striped table-hover cf\">\r\n                                    <thead class=\"cf\">\r\n                                        <tr>\r\n                                            <td colspan='5'>\r\n                                                <span click.delegate=\"refresh()\" class=\"smallMarginRight\"\r\n                                                    bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n                                                    title=\"\" data-original-title=\"Refresh\"><i class=\"fa fa-refresh\"\r\n                                                        aria-hidden=\"true\"></i></span>\r\n                                                <span click.delegate=\"new()\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n                                                    data-placement=\"bottom\" title=\"\" data-original-title=\"New\"><i class=\"fa fa-plus\"\r\n                                                        aria-hidden=\"true\"></i></span>\r\n                                                <span class=\"pull-right\" id=\"spinner\" innerhtml.bind=\"spinnerHTML\"></span>\r\n                                            </td>\r\n                                        </tr>\r\n                                        <tr>\r\n                                            <th style=\"width:250px;\"><span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'category'})\">Category\r\n                                                </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                                            <th style=\"width:250px;\"><span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'title'})\">Title\r\n                                                </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                                            <th style=\"width:150px;\"><span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'dateCreated'})\">Created\r\n                                                </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                                            <th style=\"width:150px;\"><span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'dateModified'})\">Modified\r\n                                                </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                                        </tr>\r\n                                    </thead>\r\n                                    <tbody>\r\n                                        <tr>\r\n                                            <th>\r\n                                                <select value.bind=\"categoryFilter\" input.delegate=\"dataTable.filterList($event, { type: 'value',  filter: 'categoryFilter',  collectionProperty: 'category', displayProperty: 'category', matchProperty:'', compare:'match'} )\"\r\n                                                    class=\"form-control\">\r\n                                                    <option value=\"\"></option>\r\n                                                    <option repeat.for=\"category of curriculum.curriculumCatArray\"\r\n                                                        value=\"${category.name}\">${category.name}</option>\r\n                                                </select>\r\n                                            </th>\r\n                                            <th>\r\n                                                <input value.bind=\"titleFilterValue\" input.delegate=\"dataTable.filterList(titleFilterValue, { type: 'text',  filter: 'titleFilter', collectionProperty: 'title', displayProperty: 'title',  compare:'match'} )\"\r\n                                                    class=\"form-control\" />\r\n                                            </th>\r\n                                            <th>\r\n                                                <input value.bind=\"dateCreatedFilterValue\" input.delegate=\"dataTable.filterList(dateCreatedFilterValue, {type: 'date', filter: 'dateCreated',  collectionProperty: 'dateCreated', compare: 'after'} )\"\r\n                                                    class=\"form-control\" />\r\n                                            </th>\r\n                                            <th>\r\n                                                <input value.bind=\"dateModifiedFilterValue\" input.delegate=\"dataTable.filterList(dateModifiedFilterValue, {type: 'date', filter: 'dateModified',  collectionProperty: 'dateModified', compare: 'after'} )\"\r\n                                                    class=\"form-control\" />\r\n                                            </th>\r\n                                        </tr>\r\n                                        <tr click.trigger=\"edit($index, $event)\" repeat.for=\"item of dataTable.displayArray\">\r\n                                            <td data-title=\"Category\">${item.category}</td>\r\n                                            <td data-title=\"Title\">${item.title}</td>\r\n                                            <td data-title=\"Date Created\" style=\"width: 75px\">\r\n                                                <div>${item.dateCreated | dateFormat:config.DATE_FORMAT_TABLE}</div>\r\n                                            </td>\r\n                                            <td data-title=\"Date Expired\" style=\"width: 75px\">\r\n                                                <div>${item.dateModified | dateFormat:config.DATE_FORMAT_TABLE}</div>\r\n                                            </td>\r\n                                        </tr>\r\n                                    </tbody>\r\n                                </table>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/site/components/document.html":
/*!*********************************************************!*\
  !*** ./src/modules/admin/site/components/document.html ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t<div class=\"panel panel-default\">\r\n        <div class=\"panel-body\">\r\n            <div class=\"row\">\r\n                <div class=\"col-lg-4\">\r\n                    <div show.bind=\"!categoryForm\">\r\n                        <label>Available Categories</label>\r\n                        <div class=\"well well2 overFlow\" style=\"height:400px;\">\r\n                            <input class=\"form-control\" value.bind=\"filter\" input.trigger=\"filterList()\" placeholder=\"Filter Categories\" />\r\n                            <ul class=\"list-group\">\r\n                                <button click.trigger=\"typeChanged($index)\" type=\"button\" repeat.for=\"type of filteredDocumentArray\" id=\"${type.code}\" class=\"list-group-item\">${type.description}</button>\r\n                            </ul>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"col-lg-8\" style='padding:15px;'>\r\n\t\t\t\t\t\t<table id=\"coursesTable\" class=\"table table-striped table-hover\">\r\n\t\t\t\t\t\t\t<thead>\r\n\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t<th>Document </th>\r\n\t\t\t\t\t\t\t\t\t<th>Default</th>\r\n\t\t\t\t\t\t\t\t\t<th></th>\r\n\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t</thead>\r\n\t\t\t\t\t\t\t<tbody>\r\n\t\t\t\t\t\t\t\t<tr repeat.for=\"document of helpTickets.selectedHelpTicketType.subtypes[selectedSubtype].documents\">\r\n\t\t\t\t\t\t\t\t\t<td data-title=\"name\"><a target=\"_blank\" href=\"${config.DOCUMENT_FILE_DOWNLOAD_URL}/${document.categoryCode}/${document.categoryName}/${document.fileName}\">${document.fileName}</a></td>\r\n\t\t\t\t\t\t\t\t\t<td data-title=\"default\" click.trigger=\"toggleDefault($index)\" innerhtml.bind='document.default | checkBox'></td>\r\n\t\t\t\t\t\t\t\t\t<td  click.trigger=\"removeDocument($index)\"><i class=\"fa fa-trash\"></i></td>\r\n\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t</tbody>\r\n\t\t\t\t\t\t</table>\r\n                <div show.bind=\"showDocuments\" >\r\n                    <div show.bind=\"showDocumentForm\">\r\n                        <compose view=\"./documentForm.html\"></compose>\r\n                    </div>\r\n                    <compose show.bind=\"!showDocumentForm\" view=\"./documentsTable.html\"></compose>\r\n                </div>\r\n            </div>\r\n            </div>\r\n        </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/site/components/documentForm.html":
/*!*************************************************************!*\
  !*** ./src/modules/admin/site/components/documentForm.html ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div id=\"no-more-tables\">\r\n        <table class=\"table table-striped table-hover cf\">\r\n            <thead class=\"cf\">\r\n                <tr>\r\n                    <th>Add</th>\r\n                    <th>Name</th>\r\n                    <th>Version</th>\r\n                    <th>Date Uploaded</th>\r\n                    <th>Status</th>\r\n                </tr>\r\n            </thead>\r\n            <tbody>\r\n                <tr repeat.for=\"item of documents.selectedDocument.files\">\r\n                    <td click.trigger=\"addDocument($index)\"><i class=\"fa fa-plus\" aria-hidden=\"true\"></i></td>\r\n                    <td data-title=\"Name\"><a target=\"_blank\" href=\"${config.DOCUMENT_FILE_DOWNLOAD_URL}/${documents.selectedDocument.name}/${item.fileName}\">${item.originalFilename}</a></td>\r\n                    <td data-title=\"Version\">${item.version}</td>\r\n                    <td data-title=\"Date Uploaded\">${item.dateUploaded | dateFormat:config.DATE_FORMAT_TABLE}</td>\r\n                    <td data-title=\"Active\"  innerhtml.bind='item.active | checkBox'></td>\r\n                </tr>\r\n            </tbody>\r\n        </table>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/site/components/documentsTable.html":
/*!***************************************************************!*\
  !*** ./src/modules/admin/site/components/documentsTable.html ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div class='row'>\r\n        <div class='col-lg-10 col-lg-offset-1 bottomMargin'>\r\n            <div id=\"no-more-tables\">\r\n                <table class=\"table table-striped table-hover cf\">\r\n                    <thead class=\"cf\">\r\n                        <tr>\r\n                            <th>Name </th>\r\n                            <th>Description</th>\r\n                            <th>Date Created</th>\r\n                        </tr>\r\n                    </thead>\r\n                    <tbody>\r\n                        <tr click.trigger=\"chooseDocument($index, $event)\" repeat.for=\"item of documents.documentsArray\">\r\n                            <td data-title=\"name\">${item.name}</td>\r\n                            <td data-title=\"description\">${item.description}</td>\r\n                            <td data-title=\"createdDate\">${item.createdDate | dateFormat:config.DATE_FORMAT_TABLE}</td>\r\n                        </tr>\r\n                    </tbody>\r\n                </table>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/site/components/downloadForm.html":
/*!*************************************************************!*\
  !*** ./src/modules/admin/site/components/downloadForm.html ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div class=\"col-lg-12\">\r\n        <div class=\"list-group-item toolbar\">\r\n            <span click.delegate=\"back()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n                data-placement=\"bottom\" title=\"\" data-original-title=\"Back\"><i class=\"fa fa-arrow-left fa-lg fa-border\"\r\n                    aria-hidden=\"true\"></i></span>\r\n            <span click.delegate=\"save()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n                data-placement=\"bottom\" title=\"\" data-original-title=\"Save\"><i class=\"fa fa-floppy-o fa-lg fa-border\"\r\n                    aria-hidden=\"true\"></i></span>\r\n            <span click.delegate=\"cancel()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n                data-placement=\"bottom\" title=\"\" data-original-title=\"Cancel Changes\"><i class=\"fa fa-ban fa-lg fa-border\"\r\n                    aria-hidden=\"true\"></i></span>\r\n            <span show.bind=\"!newDownload\" click.delegate=\"delete()\" class=\"smallMarginRight\" bootstrap-tooltip\r\n                data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Delete\"><i class=\"fa fa-trash fa-lg fa-border text-danger\"\r\n                    aria-hidden=\"true\"></i></span>\r\n        </div>\r\n        <div class=\"panel panel-info positionUnderToolbar\">\r\n            <div class=\"panel-body\">\r\n                <div class=\"row\">\r\n                    <form class=\"form-horizontal topMargin\">\r\n\r\n                        <!-- Row 1 -->\r\n                        <div class=\"row\">\r\n                            <div class=\"col-sm-12 col-lg-6\">\r\n                                <div class=\"form-group\">\r\n                                    <label class=\"control-label col-sm-3 hideOnPhone\">Status</label>\r\n                                    <div class=\"col-sm-8\">\r\n                                        <div class=\"checkbox\">\r\n                                            <label class=\"pull-left\">\r\n                                                <input id=\"activeProduct\" checked.bind=\"downloads.selectedDownload.active\"\r\n                                                    type=\"checkbox\"> Active\r\n                                            </label>\r\n                                        </div>\r\n                                        <div class=\"checkbox\">\r\n                                            <label class=\"pull-left\">\r\n                                                <input id=\"activeProduct\" checked.bind=\"downloads.selectedDownload.helpTicketRelevant\"\r\n                                                    type=\"checkbox\"> Help Ticket Relevant\r\n                                            </label>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"row\">\r\n                            <div class=\"col-sm-12 col-lg-12\">\r\n                                <div class=\"form-group\">\r\n                                    <label for=\"editName\" class=\"col-sm-2 control-label hideOnPhone\">Name</label>\r\n                                    <div class=\"col-sm-8\">\r\n                                        <input value.bind=\"downloads.selectedDownload.name\" id=\"editName\" class=\"form-control\"\r\n                                            placeholder=\"Name\" type=\"text\" />\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"row\">\r\n                            <div class=\"col-sm-12 col-lg-12\">\r\n                                <div class=\"form-group\">\r\n                                    <label for=\"editDescription\" class=\"col-sm-2 control-label hideOnPhone\">Description</label>\r\n                                    <div class=\"col-sm-8\">\r\n                                        <input value.bind=\"downloads.selectedDownload.description\" id=\"editDescription\"\r\n                                            class=\"form-control \" placeholder=\"Description\" type=\"text\" />\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"row\">\r\n                            <div class=\"col-sm-12 col-lg-12\">\r\n                                <div class=\"form-group\">\r\n                                    <label for=\"editType\" class=\"col-sm-2 control-label hideOnPhone\">Type</label>\r\n                                    <div class=\"col-sm-8\">\r\n                                        <select value.bind=\"downloads.selectedDownload.downCatcode\" class=\"form-control\"\r\n                                            id=\"editType\">\r\n                                            <option value=\"\">Select an option</option>\r\n                                            <option repeat.for=\"category of downloads.appCatsArray\" value=\"${category.downCatcode}\">${category.description}</options>\r\n                                        </select>\r\n                                        <a class=\"btn btn-link\" click.trigger=\"openEditCatForm('new')\" aria-hidden=\"true\">(Add\r\n                                            a Category)</a>\r\n                                        <a class=\"btn btn-link\" disable.bind=\"this.downloads.selectedDownload.downCatcode == 0\"\r\n                                            click.trigger=\"openEditCatForm('edit')\" aria-hidden=\"true\">(Edit this\r\n                                            Category)</a>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n\r\n                        <!-- Edit Category -->\r\n                        <div class=\"row topMargin col-sm-8 col-sm-offset-2\" show.bind=\"editCat\">\r\n                            <div class=\"panel panel-default\" style=\"background-color:ghostwhite;\">\r\n                                <div class=\"panel-body\">\r\n                                    <div class=\"list-group-item bottomMargin col-sm-12 topMargin\">\r\n                                        <span click.delegate=\"saveCat()\" class=\"smallMarginRight\" bootstrap-tooltip\r\n                                            data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Save Category\"><i\r\n                                                class=\"fa fa-floppy-o fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n                                        <span click.delegate=\"cancelEditCat()\" class=\"smallMarginRight\"\r\n                                            bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n                                            data-original-title=\"Cancel Changes\"><i class=\"fa fa-ban fa-lg fa-border\"\r\n                                                aria-hidden=\"true\"></i></span>\r\n                                        <span show.bind=\" editCourseFlag\" click.delegate=\"deleteCat()\" class=\"smallMarginRight\"\r\n                                            bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n                                            data-original-title=\"Delete Category\"><i class=\"fa fa-trash fa-lg fa-border text-danger\"\r\n                                                aria-hidden=\"true\"></i></span>\r\n                                    </div>\r\n                                    <div class=\"form-group\">\r\n                                        <div class=\"col-sm-8\">\r\n                                            <input id=\"editCatDescription\" value.bind=\"downloads.selectedCat.description\"\r\n                                                type=\"text\" placeholder=\"Description\" class=\"form-control\" />\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n\r\n                            </div>\r\n                        </div>\r\n\r\n                        <div class=\"row\">\r\n                            <div class=\"col-sm-12 col-lg-12\">\r\n                                <div class=\"form-group\">\r\n                                    <label show.bind=\"downloads.selectedDownload.file.fileName\" for=\"editFile\" class=\"col-sm-2 control-label hideOnPhone topMargin\">File</label>\r\n                                    <div class=\"col-sm-3 topMargin\" show.bind=\"downloads.selectedDownload.file.fileName != undefined\">\r\n                                        <a href.bind=\"selectedURL\" innerhtml.bind='downloads.selectedDownload.file.fileName'\r\n                                            target='_blank'></a>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"row\">\r\n                            <div class=\"col-lg-2 col-lg-offset-2\">\r\n                                <label class=\"btn btn-primary\">\r\n                                    Browse for files&hellip; <input type=\"file\" style=\"display: none;\" change.delegate=\"changeFiles()\"\r\n                                        files.bind=\"files\">\r\n                                </label>\r\n                            </div>\r\n                            <div class=\"col-lg-6\">\r\n                                <ul show.bind=\"!uploading\">\r\n                                    <li repeat.for=\"file of filesToUpload\" class=\"list-group-item\">${file.name}<span\r\n                                            click.delegate=\"removeFile($index)\" class=\"pull-right\"><i class=\"fa fa-trash\"\r\n                                                aria-hidden=\"true\"></i></span></li>\r\n                                </ul>\r\n                                <div show.bind=\"uploading\" class=\"progress progress-striped active\">\r\n                                    <div id=\"progressBar\" class=\"progress-bar\" style=\"width: 0%\"></div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                </div>\r\n            </div>\r\n            </form>\r\n        </div>\r\n    </div>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/site/components/downloadTable.html":
/*!**************************************************************!*\
  !*** ./src/modules/admin/site/components/downloadTable.html ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div class=\"panel panel-info\">\r\n        <div class=\"panel-body\">\r\n            <div class=\"row\">\r\n                <div class=\"col-lg-12 col-sm-12\" style='padding:15px;'>\r\n                    <div class='row'>\r\n                        <div class='col-lg-12 bottomMargin'>\r\n                            <compose view=\"../../../../resources/elements/table-navigation-bar.html\"></compose>\r\n                            <div id=\"no-more-tables\">\r\n                                <table id=\"newsTable\" class=\"table table-striped table-hover cf\">\r\n                                    <thead class=\"cf\">\r\n\r\n                                        <tr>\r\n                                            <td colspan='5'>\r\n                                                <span click.delegate=\"refresh()\" class=\"smallMarginRight\"\r\n                                                    bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n                                                    title=\"\" data-original-title=\"Refresh\"><i class=\"fa fa-refresh\"\r\n                                                        aria-hidden=\"true\"></i></span>\r\n                                                <span click.delegate=\"new()\" class=\"smallMarginRight\" bootstrap-tooltip\r\n                                                    data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n                                                    data-original-title=\"New Download\"><i class=\"fa fa-plus\"\r\n                                                        aria-hidden=\"true\"></i></span>\r\n                                                <span click.delegate=\"_cleanUpFilters()\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n                                                    data-placement=\"bottom\" title=\"\" data-original-title=\"Clear Filters\"><i\r\n                                                        class=\"fa fa-filter\" aria-hidden=\"true\"></i></span>\r\n                                                <span class=\"pull-right\" id=\"spinner\" innerhtml.bind=\"spinnerHTML\"></span>\r\n                                            </td>\r\n                                        </tr>\r\n                                        <tr>\r\n                                            <th style=\"width:20rem;\"><span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'name'})\">Name\r\n                                                </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                                            <th style=\"width:150px;\"><span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'file.originalFilename', type: 'custom', sorter: customFileNameSorter})\">File\r\n                                                </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                                            <th style=\"width:150px;\"><span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'downloads.appCatsArray', type: 'custom', sorter: customCatSorter})\">Type\r\n                                                </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                                            <th style=\"width:150px;\"><span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'active'})\">Status\r\n                                                </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                                            <th style=\"width:150px;\"><span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'helpTicketRelevant'})\">Help\r\n                                                    Ticket Relevant </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                                        </tr>\r\n                                    </thead>\r\n                                    <tbody>\r\n                                        <tr>\r\n                                            <th>\r\n                                                <input value.bind=\"nameFilterValue\" input.delegate=\"dataTable.filterList(nameFilterValue, { type: 'text',  filter: 'nameFilter', collectionProperty: 'name', displayProperty: 'name',  compare:'match'} )\"\r\n                                                    class=\"form-control\" />\r\n                                            </th>\r\n                                            <th>\r\n                                                <input value.bind=\"fileNameFilterValue\" input.delegate=\"dataTable.filterList(fileNameFilterValue, { type: 'text',  filter: 'fileNameFilter', collectionProperty: 'file.originalFilename', displayProperty: 'file.originalFilename',  compare:'match'} )\"\r\n                                                    class=\"form-control\" />\r\n                                            </th>\r\n                                            <th>\r\n                                                <select value.bind=\"downCatcodeFilter\" input.delegate=\"dataTable.filterList($event, { type: 'value',  filter: 'downCatcodeFilter',  collectionProperty: 'downCatcode', displayProperty: 'downCatcode', matchProperty:'', compare:'match'} )\"\r\n                                                    class=\"form-control\">\r\n                                                    <option value=\"\"></option>\r\n                                                    <option repeat.for=\"category of downloads.appCatsArray\" value=\"${category.downCatcode}\">${category.description}</option>\r\n                                                </select>\r\n                                            </th>\r\n                                            <th>\r\n                                                <select value.bind=\"activeFilter\" input.delegate=\"dataTable.filterList($event, { type: 'boolean',  filter: 'activeFilter',  collectionProperty: 'active', displayProperty: 'active', matchProperty:'', compare:'boolean'} )\"\r\n                                                    class=\"form-control\">\r\n                                                    <option value=\"\"></option>\r\n                                                    <option value=\"true\">Active</option>\r\n                                                    <option value=\"false\">Inactive</options>\r\n                                                </select>\r\n                                            </th>\r\n                                            <th>\r\n                                                <select value.bind=\"helpTicketRelevantFilter\" input.delegate=\"dataTable.filterList($event, { type: 'boolean',  filter: 'helpTicketRelevantFilter',  collectionProperty: 'helpTicketRelevant', displayProperty: 'helpTicketRelevant', matchProperty:'', compare:'boolean'} )\"\r\n                                                    class=\"form-control\">\r\n                                                    <option value=\"\"></option>\r\n                                                    <option value=\"true\">True</option>\r\n                                                    <option value=\"false\">False</options>\r\n                                                </select>\r\n                                            </th>\r\n                                        </tr>\r\n                                        <tr click.trigger=\"edit($index, $event)\" repeat.for=\"item of dataTable.displayArray\">\r\n                                            <td data-title=\"Name\">${item.name}</td>\r\n                                            <td data-title=\"Original Filename\" style=\"width: 75px\">\r\n                                                <div>${item.file.originalFilename}</div>\r\n                                            </td>\r\n                                            <td data-title=\"Type\" style=\"width: 75px\">\r\n                                                <div>${item.downCatcode |\r\n                                                    lookupValue:downloads.appCatsArray:'downCatcode':\"description\"}</div>\r\n                                            </td>\r\n                                            <td data-title=\"Status\">${item.active | translateStatus}</td>\r\n                                            <td data-title=\"Help Ticket Relevant\">${item.helpTicketRelevant}</a>\r\n                                            </td>\r\n                                        </tr>\r\n                                    </tbody>\r\n                                </table>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/site/components/foreverLogs.html":
/*!************************************************************!*\
  !*** ./src/modules/admin/site/components/foreverLogs.html ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t<div class=\"col-lg-3 topMargin\">\r\n\t\t<div  class=\"panel panel-default\">\r\n\t\t\t<div class=\"panel-body\">\r\n\t\t\t\t<div class=\"col-sm-12 col-lg-12\">\r\n\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t<div class=\"input-group\">\r\n\t\t\t\t\t\t\t<span click.delegate=\"deleteFiles()\" class=\"smallMarginRight input-group-addon\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Delete oldest files\"><i class=\"fa fa-trash\" aria-hidden=\"true\"></i></span>\r\n\t\t\t\t\t\t\t<input value.bind=\"filesToDelete\" id=\"filesToDelete\" class=\"form-control\"  type=\"number\" ria-describedby=\"basic-addon1\" placeholder=\"# of oldest files to delete\"/>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t\t<label>Files</label>\r\n\t\t\t\t<div class=\"well well2 overFlow\" style=\"height:600px;\">\r\n\t\t\t\t\t<ul class=\"list-group\">\r\n\t\t\t\t\t\t<button click.trigger=\"fileSelected($index)\" type=\"button\" repeat.for=\"file of fileList\" id=\"${file}\" class=\"list-group-item\">${file}\r\n\t\t\t\t\t\t\t<span class=\"icon glyphicon glyphicon-pencil pull-right smallMarginRight\" click.delegate=\"rename(file, $index)\"></span>\r\n\t\t\t\t\t\t\t<span class=\"icon glyphicon glyphicon-trash pull-right smallMarginRight\" click.delegate=\"deleteLogFile(file, $index)\"></span>\r\n\t\t\t\t\t\t</button>\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t</ul>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n\t<div class=\"col-lg-9 topMargin\">\r\n\t\t<textarea class=\"form-control col-lg-12\" show.bind=\"foreverLog.length > 0\" innerhtml.bind=\"foreverLog\" rows=\"50\"></textarea>\r\n\t</div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/site/components/htTypeForm.html":
/*!***********************************************************!*\
  !*** ./src/modules/admin/site/components/htTypeForm.html ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t<div class=\"col-lg-12\">\r\n\t\t<div class=\"bottomMargin list-group-item leftMargin rightMargin\">\r\n\t\t\t<span click.delegate=\"back()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n\t\t\t\tdata-original-title=\"Back\"><i class=\"fa fa-arrow-left fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n\t\t\t<span click.delegate=\"save()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n\t\t\t\tdata-original-title=\"Save\"><i class=\"fa fa-floppy-o fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n\t\t\t<span click.delegate=\"cancel()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n\t\t\t\ttitle=\"\" data-original-title=\"Cancel Changes\"><i class=\"fa fa-ban fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n\t\t</div>\r\n\t\t<div class=\"bottomMargin panel panel-default leftMargin rightMargin\">\r\n\t\t\t<div class=\"panel-body\">\r\n\t\t\t\t<div class=\"col-lg-12\">\r\n\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t<label for=\"editDescription\" class=\"col-sm-2 control-label hideOnPhone\">Description</label>\r\n\t\t\t\t\t\t<div class=\"col-lg-4\">\r\n\t\t\t\t\t\t\t<input value.bind=\"helpTickets.selectedHelpTicketType.description\" id=\"editDescription\" class=\"form-control \" placeholder=\"Description\"\r\n\t\t\t\t\t\t\t\ttype=\"text\" />\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"col-lg-12\">\r\n\t\t\t\t\t<div class=\"col-lg-1 topMargin\">\r\n\t\t\t\t\t\t<div class=\"checkbox \">\r\n\t\t\t\t\t\t\t<label>\r\n\t\t\t\t\t\t\t<input checked.bind=\"helpTickets.selectedHelpTicketType.showSubtypes\" id=\"subtypesCheckBox\" type=\"checkbox\"> Show subtypes\r\n\t\t\t\t\t\t</label>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\r\n\t</div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/site/components/htTypeTable.html":
/*!************************************************************!*\
  !*** ./src/modules/admin/site/components/htTypeTable.html ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t<div class=\"bottomMargin list-group-item leftMargin rightMargin\">\r\n\t\t<span click.delegate=\"save()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n\t\t\tdata-original-title=\"Save\"><i class=\"fa fa-floppy-o fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n\t\t<span click.delegate=\"cancel()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n\t\t\ttitle=\"\" data-original-title=\"Cancel Changes\"><i class=\"fa fa-ban fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n\t</div>\r\n\t<div class=\"fluid-container\">\r\n\t\t<div class=\"row leftMargin rightMargin\">\r\n\t\t\t<div class=\"form-group topMargin col-lg-5\">\r\n\t\t\t\t<select value.bind=\"selectedCategory\" change.delegate=\"selectCategory()\" id=\"category\" class=\"form-control\">\r\n\t\t\t\t<option value=\"-1\">Select a Category</option>\r\n\t\t\t\t<option repeat.for=\"type of helpTickets.helpTicketTypesArray\"\r\n\t\t\t\t\t\tvalue.bind=\"$index\">${type.description}</option>\r\n\t\t\t\t</select>\r\n\t\t\t\t <a class=\"btn btn-link\" click.trigger=\"newCategory()\" aria-hidden=\"true\">(Add a Category)</a>\r\n\t\t\t<!--\t<span click.delegate=\"newCategory()\" class=\"topMargin\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"New Category\"><i class=\"fa fa-plus\" aria-hidden=\"true\"></i></span> -->\r\n\t\t\t</div>\r\n\t\t\t<div show.bind=\"selectedCategory > -1\" class=\"form-group topMargin col-lg-5\">\r\n\t\t\t\t<select value.bind=\"selectedSubtype\" change.delegate=\"typeSelected()\" id=\"course\"\r\n\t\t\t\t\t\tclass=\"form-control\">\r\n\t\t\t\t<option value=\"-1\">Select a Subtype</option>\r\n\t\t\t\t<option repeat.for=\"subtype of helpTickets.selectedHelpTicketType.subtypes\"\r\n\t\t\t\t\t\tvalue.bind=\"$index\">${subtype.description}</option>\r\n\t\t\t\t</select>\r\n\t\t\t\t <a class=\"btn btn-link\" click.trigger=\"newCategory()\" aria-hidden=\"true\">(Add a Subtype)</a>\r\n\t\t\t<!--\t<span click.delegate=\"newSubtype()\" class=\"topMargin\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"New Subtype\"><i class=\"fa fa-plus\" aria-hidden=\"true\"></i></span> -->\r\n\t\t\t</div>\r\n\t\t</div>\r\n\r\n\t\t<div show.bind=\"selectedCategory > -1\">\r\n\t\t\t<h4>Category</h4>\r\n\t\t\t<div class=\"bottomMargin panel panel-default leftMargin rightMargin\">\r\n\t\t\t\t<div class=\"panel-body\">\r\n\t\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t\t<div class=\"col-lg-4\">\r\n\t\t\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t\t\t<label for=\"editDescription\" class=\"col-sm-2 control-label hideOnPhone\">Description</label>\r\n\t\t\t\t\t\t\t\t<input value.bind=\"helpTickets.selectedHelpTicketType.description\" id=\"editDescription\" class=\"form-control \" placeholder=\"Description\"\r\n\t\t\t\t\t\t\t\t\ttype=\"text\" />\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"col-lg-8\">\r\n\t\t\t\t\t\t\t<div class=\"col-lg-2 topMargin\">\r\n\t\t\t\t\t\t\t\t<div class=\"checkbox \">\r\n\t\t\t\t\t\t\t\t\t<label>\r\n\t\t\t\t\t\t\t\t\t<input checked.bind=\"helpTickets.selectedHelpTicketType.showSubtypes\" id=\"subtypesCheckBox\" type=\"checkbox\"> Show subtypes\r\n\t\t\t\t\t\t\t\t</label>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div show.bind=\"selectedSubtype > -1\">\r\n\t\t\t\t<h4>Subtype</h4>\r\n\t\t\t\t<div class=\"bottomMargin panel panel-default leftMargin rightMargin\">\r\n\t\t\t\t\t<div class=\"panel-body\">\r\n\t\t\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t\t\t<div class=\"col-lg-2 topMargin\">\r\n\t\t\t\t\t\t\t\t<div class=\"checkbox \">\r\n\t\t\t\t\t\t\t\t\t<label>\r\n\t\t\t\t\t\t\t\t\t<input checked.bind=\"helpTickets.selectedHelpTicketType.subtypes[selectedSubtype].active\" id=\"activeSubtypesCheckBox\" type=\"checkbox\"> Active\r\n\t\t\t\t\t\t\t\t</label>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t\t\t<div class=\"col-lg-4\">\r\n\t\t\t\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t\t\t\t<label for=\"editKey\" class=\"col-sm-2 control-label hideOnPhone\">Key</label>\r\n\t\t\t\t\t\t\t\t\t<input value.bind=\"helpTickets.selectedHelpTicketType.subtypes[selectedSubtype].type\" id=\"editKey\" class=\"form-control \" placeholder=\"Key\"\r\n\t\t\t\t\t\t\t\t\t\ttype=\"text\" />\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class=\"col-lg-2 topMargin\">\r\n\t\t\t\t\t\t\t\t<div class=\"checkbox \">\r\n\t\t\t\t\t\t\t\t\t<label>\r\n\t\t\t\t\t\t\t\t\t<input checked.bind=\"helpTickets.selectedHelpTicketType.subtypes[selectedSubtype].public\" id=\"publicSubtypesCheckBox\" type=\"checkbox\"> Public\r\n\t\t\t\t\t\t\t\t</label>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class=\"col-lg-2 topMargin\">\r\n\t\t\t\t\t\t\t\t<div class=\"checkbox \">\r\n\t\t\t\t\t\t\t\t\t<label>\r\n\t\t\t\t\t\t\t\t\t<input checked.bind=\"helpTickets.selectedHelpTicketType.subtypes[selectedSubtype].appsRequired\" id=\"appsSubtypesCheckBox\" type=\"checkbox\"> Applications Required\r\n\t\t\t\t\t\t\t\t</label>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class=\"col-lg-2 topMargin\">\r\n\t\t\t\t\t\t\t\t<div class=\"checkbox \">\r\n\t\t\t\t\t\t\t\t\t<label>\r\n\t\t\t\t\t\t\t\t\t<input checked.bind=\"helpTickets.selectedHelpTicketType.subtypes[selectedSubtype].clientRequried\" id=\"clientSubtypesCheckBox\" type=\"checkbox\"> Client Required\r\n\t\t\t\t\t\t\t\t</label>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t\t\t<div class=\"col-lg-4\">\r\n\t\t\t\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t\t\t\t<label for=\"editDescription\" class=\"col-sm-2 control-label hideOnPhone\">Description</label>\r\n\t\t\t\t\t\t\t\t\t<input value.bind=\"helpTickets.selectedHelpTicketType.subtypes[selectedSubtype].description\" id=\"editSubtypeDescription\" class=\"form-control \" placeholder=\"Description\"\r\n\t\t\t\t\t\t\t\t\t\ttype=\"text\" />\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<hr/>\r\n\t\t\t\t\t\t<div class=\"row\">\t\r\n\t\t\t\t\t\t\t<div class=\"col-lg-6\">\r\n\t\t\t\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t\t\t\t<label for=\"editInputForm\" class=\"col-sm-4 control-label hideOnPhone\">Input Form</label>\r\n\t\t\t\t\t\t\t\t\t<textarea value.bind=\"helpTickets.selectedHelpTicketType.subtypes[selectedSubtype].inputForm\" id=\"editInputForm\" class=\"form-control \" placeholder=\"Input Form\" rows=\"20\" ></textarea>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class=\"bottomMargin panel panel-default col-lg-5\">\r\n\t\t\t\t\t\t\t\t<div class=\"panel-body\">\r\n\t\t\t\t\t\t\t\t\t<label class=\"col-sm-12 control-label hideOnPhone\">Preview</label>\r\n\t\t\t\t\t\t\t\t\t<div innerhtml.bind=\"helpTickets.selectedHelpTicketType.subtypes[selectedSubtype].inputForm\"></div>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"row\">\t\r\n\t\t\t\t\t\t\t<div class=\"col-lg-6\">\r\n\t\t\t\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t\t\t\t<label for=\"editOutputForm\" class=\"col-sm-4 control-label hideOnPhone\">Output Form</label>\r\n\t\t\t\t\t\t\t\t\t<textarea value.bind=\"helpTickets.selectedHelpTicketType.subtypes[selectedSubtype].outputForm\" id=\"editOutputForm\" class=\"form-control \" placeholder=\"Input Form\" rows=\"20\" ></textarea>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class=\"bottomMargin panel panel-default col-lg-5\">\r\n\t\t\t\t\t\t\t\t<div class=\"panel-body\">\r\n\t\t\t\t\t\t\t\t\t<label class=\"col-sm-12 control-label hideOnPhone\">Preview</label>\r\n\t\t\t\t\t\t\t\t\t<div innerhtml.bind=\"helpTickets.selectedHelpTicketType.subtypes[selectedSubtype].outputForm\"></div>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t\t\t<div class=\"form-group topMargin col-lg-5\">\r\n\t\t\t\t\t\t\t\t<select value.bind=\"selectedValidationRules\" change.delegate=\"selectCategory()\" id=\"validation\" class=\"form-control\">\r\n\t\t\t\t\t\t\t\t<option value=\"-1\">Select a Rule</option>\r\n\t\t\t\t\t\t\t\t<option repeat.for=\"type of helpTickets.selectedHelpTicketType.subtypes[selectedSubtype].validation\"\r\n\t\t\t\t\t\t\t\t\t\tvalue.bind=\"$index\">${type.rule} - ${type.value}</option>\r\n\t\t\t\t\t\t\t\t</select>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div show.bind=\"selectedValidationRules > -1\" class=\"col-lg-6\">\r\n\t\t\t\t\t\t\t\t<div class=\"col-lg-10\">\r\n\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t\t\t\t\t<label for=\"editRule\" class=\"col-sm-2 control-label hideOnPhone\">Rule</label>\r\n\t\t\t\t\t\t\t\t\t\t<input value.bind=\"helpTickets.selectedHelpTicketType.subtypes[selectedSubtype].validation[selectedValidationRules].rule\" id=\"editRule\" class=\"form-control\" placeholder=\"Rule\"\r\n\t\t\t\t\t\t\t\t\t\t\ttype=\"text\" />\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t\t\t\t\t<label for=\"editRule\" class=\"col-sm-2 control-label hideOnPhone\">Value</label>\r\n\t\t\t\t\t\t\t\t\t\t<input value.bind=\"helpTickets.selectedHelpTicketType.subtypes[selectedSubtype].validation[selectedValidationRules].value\" id=\"editRule\" class=\"form-control\" placeholder=\"Value\"\r\n\t\t\t\t\t\t\t\t\t\t\ttype=\"text\" />\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t\t\t\t\t<label for=\"editRule\" class=\"col-sm-2 control-label hideOnPhone\">Message</label>\r\n\t\t\t\t\t\t\t\t\t\t<input value.bind=\"helpTickets.selectedHelpTicketType.subtypes[selectedSubtype].validation[selectedValidationRules].message\" id=\"editRule\" class=\"form-control\" placeholder=\"Message\"\r\n\t\t\t\t\t\t\t\t\t\t\ttype=\"text\" />\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t\t\t\t\t<label for=\"editRule\" class=\"col-sm-2 control-label hideOnPhone\">Control</label>\r\n\t\t\t\t\t\t\t\t\t\t<input value.bind=\"helpTickets.selectedHelpTicketType.subtypes[selectedSubtype].validation[selectedValidationRules].control\" id=\"editRule\" class=\"form-control\" placeholder=\"Control\"\r\n\t\t\t\t\t\t\t\t\t\t\ttype=\"text\" />\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<compose view=\"./document.html\"></compose>\r\n\t\t</div>\r\n      </div>\r\n\t\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/site/components/logFileTable.html":
/*!*************************************************************!*\
  !*** ./src/modules/admin/site/components/logFileTable.html ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t<div class=\"col-lg-3 topMargin\">\r\n\t\t<div  class=\"panel panel-default\">\r\n\t\t\t<div class=\"panel-body\">\r\n\t\t\t\t<div class=\"col-sm-12 col-lg-12\">\r\n\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t<div class=\"input-group\">\r\n\t\t\t\t\t\t\t<span click.delegate=\"deleteFiles()\" class=\"smallMarginRight input-group-addon\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Delete oldest files\"><i class=\"fa fa-trash\" aria-hidden=\"true\"></i></span>\r\n\t\t\t\t\t\t\t<input value.bind=\"filesToDelete\" id=\"filesToDelete\" class=\"form-control\"  type=\"number\" ria-describedby=\"basic-addon1\" placeholder=\"# of oldest files to delete\"/>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t\t<label>Files</label>\r\n\t\t\t\t<div class=\"well well2 overFlow\" style=\"height:600px;\">\r\n\t\t\t\t\t<ul class=\"list-group\">\r\n\t\t\t\t\t\t<button click.trigger=\"fileSelected($index)\" type=\"button\" repeat.for=\"file of fileList\" id=\"${type.code}\" class=\"list-group-item\">${file}\r\n\t\t\t\t\t\t\t\t<span class=\"icon glyphicon glyphicon-trash pull-right\" click.delegate=\"deleteLogFile(file, $index)\"></span>\r\n\t\t\t\t\t\t</button>\r\n\t\t\t\t\t</ul>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n\t<div class=\"col-lg-9 topMargin\">\r\n\t\t<compose view=\"../../../../resources/elements/table-navigation-bar.html\"></compose>\r\n\t\t<div id=\"no-more-tables\">\r\n\t\t\t<table class=\"table table-striped table-hover cf\">\r\n\t\t\t\t<thead class=\"cf\">\r\n\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t<td colspan='3'>\r\n\t\t\t\t\t\t\t<span click.delegate=\"refresh()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Refresh\"><i class=\"fa fa-refresh\" aria-hidden=\"true\"></i></span>\r\n\t\t\t\t\t\t\t<span class=\"pull-right\" id=\"spinner\" innerhtml.bind=\"spinnerHTML\"></span>\r\n\t\t\t\t\t\t</td>\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t<th style=\"width:8em;\"><span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'event'})\">Event </span><span><i class=\"fa fa-sort\"></i></span></th>Event<span click.trigger=\"dataTable.sortArray('event')\"><i class=\"fa fa-sort\"></i></span></th>\r\n\t\t\t\t\t\t<th style=\"width:8em;\" if.bind=\"screenToShow==='log'\">Code</th>\r\n\t\t\t\t\t\t<th><span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'user'})\">Data </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n\t\t\t\t\t\t<th><span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'date'})\">Time </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t</thead>\r\n\t\t\t\t<tbody>\r\n\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t<th>\r\n\t\t\t\t\t\t\t<input value.bind=\"eventFilterValue\" input.delegate=\"dataTable.filterList(eventFilterValue, { type: 'text',  filter: 'eventFilter', collectionProperty: 'event', displayProperty: 'event',  compare:'match'} )\"  class=\"form-control\" />\r\n\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t<th if.bind=\"screenToShow==='log'\">\r\n\t\t\t\t\t\t\t<input value.bind=\"codeFilterValue\" input.delegate=\"dataTable.filterList(codeFilterValue, { type: 'text',  filter: 'codeFilter', collectionProperty: 'code', displayProperty: 'code',  compare:'match'} )\"  class=\"form-control\" />\r\n\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t<th>\r\n\t\t\t\t\t\t\t<input value.bind=\"dataFilterValue\" input.delegate=\"dataTable.filterList(dataFilterValue, { type: 'text',  filter: 'dataFilter', collectionProperty: 'data', displayProperty: 'data',  compare:'match'} )\"  class=\"form-control\" />\r\n\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t<th>\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t</th>\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t\t<tr repeat.for=\"item of dataTable.displayArray\">\r\n\t\t\t\t\t\t<td data-title=\"Event\">${item.event}</td>\r\n\t\t\t\t\t\t<td if.bind=\"screenToShow==='log'\" data-title=\"Code\">${item.code}</td>\r\n\t\t\t\t\t\t<td data-title=\"Data\"><span innerhtml.bind=\"item.data\"></span></td>\r\n\t\t\t\t\t\t<td data-title=\"Date\">${item.date}</td>\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t</tbody>\r\n\t\t\t</table>\r\n\t\t</div>\r\n\t</div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/site/components/messageForm.html":
/*!************************************************************!*\
  !*** ./src/modules/admin/site/components/messageForm.html ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div class=\"col-lg-12\">\r\n        <div class=\"list-group-item toolbar\">\r\n            <span click.delegate=\"back()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n                data-placement=\"bottom\" title=\"\" data-original-title=\"Back\"><i class=\"fa fa-arrow-left fa-lg fa-border\"\r\n                    aria-hidden=\"true\"></i></span>\r\n            <span click.delegate=\"save()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n                data-placement=\"bottom\" title=\"\" data-original-title=\"Save\"><i class=\"fa fa-floppy-o fa-lg fa-border\"\r\n                    aria-hidden=\"true\"></i></span>\r\n            <span click.delegate=\"cancel()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n                data-placement=\"bottom\" title=\"\" data-original-title=\"Cancel Changes\"><i class=\"fa fa-ban fa-lg fa-border\"\r\n                    aria-hidden=\"true\"></i></span>\r\n            <!--\r\n            <span click.delegate=\"delete()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Delete\"><i class=\"fa fa-trash fa-lg fa-border text-danger\" aria-hidden=\"true\"></i></span>\r\n            -->\r\n        </div>\r\n        <div class=\"panel panel-info positionUnderToolbar\">\r\n            <div class=\"panel-body\">\r\n                <div class=\"row\">\r\n                    <form class=\"form-horizontal topMargin\">\r\n\r\n                        <!-- Row 1 -->\r\n                        <div class=\"row\">\r\n                            <div class=\"col-sm-12 col-lg-12\">\r\n                                <div class=\"form-group\">\r\n                                    <label for=\"editCategory\" class=\"col-sm-2 control-label hideOnPhone\">Type</label>\r\n                                    <div class=\"col-sm-8\">\r\n                                        <select value.bind=\"siteinfo.selectedMessage.category\" class=\"form-control\" id=\"category\">\r\n                                            <option value=\"\">-- Select an Option --</option>\r\n                                            <option value=\"${type}\" repeat.for=\"type of config.MESSAGE_TYPES\">${type}</option>\r\n                                        </select>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"row\">\r\n                            <div class=\"col-sm-12 col-lg-12\">\r\n                                <div class=\"form-group\">\r\n                                    <label for=\"editKey\" class=\"col-sm-2 control-label hideOnPhone\">Key</label>\r\n                                    <div class=\"col-sm-8\">\r\n                                        <input value.bind=\"siteinfo.selectedMessage.key\" id=\"editKey\" class=\"form-control \"\r\n                                            placeholder=\"Key\" type=\"text\" />\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"row\">\r\n                            <div class=\"col-sm-12 col-lg-12\">\r\n                                <div class=\"form-group\">\r\n                                    <label for=\"editDescription\" class=\"col-sm-2 control-label hideOnPhone\">Description</label>\r\n                                    <div class=\"col-sm-8\">\r\n                                        <input value.bind=\"siteinfo.selectedMessage.description\" id=\"editDescription\"\r\n                                            class=\"form-control \" placeholder=\"Description\" type=\"text\" />\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"row\">\r\n                            <div class=\"col-sm-12 col-lg-12\">\r\n                                <div class=\"form-group\">\r\n                                    <label for=\"editContent\" class=\"col-sm-2 control-label hideOnPhone\">Content</label>\r\n                                    <div class=\"col-sm-8\">\r\n                                        <editor value.bind=\"siteinfo.selectedMessage.content\" toolbar.bind=\"toolbar\"\r\n                                            height=\"250\"></editor>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </form>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/site/components/messageTable.html":
/*!*************************************************************!*\
  !*** ./src/modules/admin/site/components/messageTable.html ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div class=\"panel panel-info\">\r\n        <div class=\"panel-body\">\r\n            <div class=\"row\">\r\n                <div class=\"col-lg-12 col-sm-12\" style='padding:15px;'>\r\n                    <div class='row'>\r\n                        <div class='col-lg-12 bottomMargin'>\r\n                            <compose view=\"../../../../resources/elements/table-navigation-bar.html\"></compose>\r\n                            <div id=\"no-more-tables\">\r\n                                <table class=\"table table-striped table-hover cf\">\r\n                                    <thead class=\"cf\">\r\n                                        <tr>\r\n                                            <td colspan='3'>\r\n                                                <span click.delegate=\"refresh()\" class=\"smallMarginRight\"\r\n                                                    bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n                                                    title=\"\" data-original-title=\"Refresh\"><i class=\"fa fa-refresh\"\r\n                                                        aria-hidden=\"true\"></i></span>\r\n                                                <span class=\"pull-right\" id=\"spinner\" innerhtml.bind=\"spinnerHTML\"></span>\r\n                                            </td>\r\n                                        </tr>\r\n                                        <tr>\r\n                                            <th style=\"width:250px;\"><span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'key'})\">Key\r\n                                                </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                                            <th style=\"width:150px;\"><span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'category'})\">Category\r\n                                                </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                                            <th style=\"width:150px;\"><span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'description'})\">Description\r\n                                                </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                                        </tr>\r\n                                    </thead>\r\n                                    <tbody>\r\n                                        <tr>\r\n                                            <th>\r\n                                                <input value.bind=\"keyFilterValue\" input.delegate=\"dataTable.filterList(keyFilterValue, { type: 'text',  filter: 'keyFilter', collectionProperty: 'key', displayProperty: 'key',  compare:'match'} )\"\r\n                                                    class=\"form-control\" />\r\n                                            </th>\r\n                                            <th>\r\n                                                <select value.bind=\"categoryFilter\" input.delegate=\"dataTable.filterList($event, { type:\r\n                                    'value',  filter: 'categoryFilter',  collectionProperty: 'category', displayProperty: 'category', matchProperty:'', compare:'match'} )\"\r\n                                                    class=\"form-control\">\r\n                                                    <option value=\"\"></option>\r\n                                                    <option value=\"${type}\" repeat.for=\"type of config.MESSAGE_TYPES\">${type}</option>\r\n                                                </select>\r\n                                            </th>\r\n                                            <th>\r\n                                                <input value.bind=\"descriptionFilterValue\" input.delegate=\"dataTable.filterList(descriptionFilterValue, { type: 'text',  filter: 'descriptionFilter', collectionProperty: 'description', displayProperty: 'description',  compare:'match'} )\"\r\n                                                    class=\"form-control\" />\r\n                                            </th>\r\n                                        </tr>\r\n                                        <tr click.trigger=\"edit($index, $event)\" repeat.for=\"item of dataTable.displayArray\">\r\n                                            <td data-title=\"Key\">${item.key}</td>\r\n                                            <td data-title=\"Category\" style=\"width: 75px\">\r\n                                                <div>${item.category}</div>\r\n                                            </td>\r\n                                            <td data-title=\"Description\" style=\"width: 75px\">\r\n                                                <div>${item.description}</div>\r\n                                            </td>\r\n                                        </tr>\r\n                                    </tbody>\r\n                                </table>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/site/components/newsForm.html":
/*!*********************************************************!*\
  !*** ./src/modules/admin/site/components/newsForm.html ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div class=\"col-lg-12\">\r\n        <div class=\" list-group-item toolbar\">\r\n            <span click.delegate=\"back()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n                data-placement=\"bottom\" title=\"\" data-original-title=\"Back\"><i class=\"fa fa-arrow-left fa-lg fa-border\"\r\n                    aria-hidden=\"true\"></i></span>\r\n            <span click.delegate=\"save()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n                data-placement=\"bottom\" title=\"\" data-original-title=\"Save\"><i class=\"fa fa-floppy-o fa-lg fa-border\"\r\n                    aria-hidden=\"true\"></i></span>\r\n            <span click.delegate=\"cancel()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n                data-placement=\"bottom\" title=\"\" data-original-title=\"Cancel Changes\"><i class=\"fa fa-ban fa-lg fa-border\"\r\n                    aria-hidden=\"true\"></i></span>\r\n            <span show.bind=\"siteinfo.selectedItem._id\" click.delegate=\"delete()\" class=\"smallMarginRight\"\r\n                bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Delete\"><i\r\n                    class=\"fa fa-trash fa-lg fa-border text-danger\" aria-hidden=\"true\"></i></span>\r\n        </div>\r\n        <div class=\"panel panel-info positionUnderToolbar\">\r\n            <div class=\"panel-body\">\r\n                <div class=\"row\">\r\n                    <form class=\"form-horizontal topMargin\">\r\n\r\n                        <!-- Row 1 -->\r\n                        <div class=\"row\">\r\n                            <div class=\"col-sm-12 col-lg-12\">\r\n                                <div class=\"form-group\">\r\n                                    <label for=\"editType\" class=\"col-sm-2 control-label hideOnPhone\">Type</label>\r\n                                    <div class=\"col-sm-8\">\r\n                                        <select value.bind=\"siteinfo.selectedItem.itemType\" class=\"form-control\" id=\"itemType\">\r\n                                            <option value=\"${type.type}\" repeat.for=\"type of config.SITE_INFO_TYPES\">${type.description}</optionp>\r\n                                        </select>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"row\" show.bind=\"siteinfo.selectedItem.itemType == 'SYST'\">\r\n                            <div class=\"col-sm-12 col-lg-12\">\r\n                                <div class=\"form-group\">\r\n                                    <label for=\"editPriority\" class=\"col-sm-2 control-label hideOnPhone\">Priority</label>\r\n                                    <div class=\"col-sm-8\">\r\n                                        <select value.bind=\"siteinfo.selectedItem.priority\" class=\"form-control \" id=\"priority\">\r\n                                            <option value=\"\"></option>\r\n                                            <option value=\"INFO\">Information</option>\r\n                                            <option value=\"WARN\">Warning</options>\r\n                                            <option value=\"DANG\">Danger</options>\r\n                                        </select>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"row\" show.bind=\"siteinfo.selectedItem.itemType == 'ILNK'\">\r\n                            <div class=\"col-sm-12 col-lg-12\">\r\n                                <div class=\"form-group\">\r\n                                    <label for=\"editCategory\" class=\"col-sm-2 control-label hideOnPhone\">Category</label>\r\n                                    <div class=\"col-sm-8\">\r\n                                        <input value.bind=\"siteinfo.selectedItem.category\" id=\"editUrl\" class=\"form-control \"\r\n                                            placeholder=\"Category\" type=\"text\" />\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"row\">\r\n                            <div class=\"col-sm-12 col-lg-12\">\r\n                                <div class=\"form-group\">\r\n                                    <label for=\"editTitle\" class=\"col-sm-2 control-label hideOnPhone\">Title</label>\r\n                                    <div class=\"col-sm-8\">\r\n                                        <input value.bind=\"siteinfo.selectedItem.title\" id=\"editTitle\" class=\"form-control \"\r\n                                            placeholder=\"Title\" type=\"text\" />\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"row\">\r\n                            <div class=\"col-sm-12 col-lg-12\">\r\n                                <div class=\"form-group\">\r\n                                    <label for=\"editContent\" class=\"col-sm-2 control-label hideOnPhone\">Content</label>\r\n                                    <div class=\"col-sm-8\">\r\n                                        <editor value.bind=\"siteinfo.selectedItem.content\" toolbar.bind=\"toolbar\"\r\n                                            height=\"250\"></editor>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"row\">\r\n                            <div class=\"col-sm-12 col-lg-12\">\r\n                                <div class=\"form-group\">\r\n                                    <label for=\"editUrl\" class=\"col-sm-2 control-label hideOnPhone\"><a href=\"${siteinfo.selectedItem.url}\"\r\n                                            target=\"_blank\">URL</a></label>\r\n                                    <div class=\"col-sm-8\">\r\n                                        <input value.bind=\"siteinfo.selectedItem.url\" id=\"editUrl\" class=\"form-control \"\r\n                                            placeholder=\"URL\" type=\"text\" />\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"row\">\r\n                            <div class=\"col-sm-12 col-lg-12\">\r\n                                <div class=\"form-group\">\r\n                                    <label for=\"editCreatedDate\" class=\"col-sm-2 control-label hideOnPhone\">Date\r\n                                        Created</label>\r\n                                    <div class=\"col-sm-8\">\r\n                                        <flat-picker controlid=\"editCreatedDate\" config.bind=\"config\" value.bind=\"siteinfo.selectedItem.createdDate\"></flat-picker>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"row\">\r\n                            <div class=\"col-sm-12 col-lg-12\">\r\n                                <div class=\"form-group\">\r\n                                    <label for=\"editExpireddDate\" class=\"col-sm-2 control-label hideOnPhone\">Date\r\n                                        Expires</label>\r\n                                    <div class=\"col-sm-8\">\r\n                                        <flat-picker controlid=\"editCreatedDate\" config.bind=\"config\" value.bind=\"siteinfo.selectedItem.expiredDate\"></flat-picker>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"row\">\r\n                            <div class=\"col-sm-12 col-lg-12\">\r\n                                <div class=\"form-group\">\r\n                                    <label for=\"editImageUrl\" class=\"col-sm-2 control-label hideOnPhone\">Image URL</label>\r\n                                    <div class=\"col-sm-8\">\r\n                                        <input value.bind=\"siteinfo.selectedItem.image\" id=\"editImageUrl\" class=\"form-control \"\r\n                                            placeholder=\"Image URL\" type=\"text\" />\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"row\">\r\n                          <div class=\"col-sm-12 col-lg-12\">\r\n                              <div class=\"form-group\">\r\n                                  <label for=\"editSortOrder\" class=\"col-sm-2 control-label hideOnPhone\">Sort order</label>\r\n                                  <div class=\"col-sm-8\">\r\n                                      <input value.bind=\"siteinfo.selectedItem.sortOrder\" id=\"editSortOrder\" class=\"form-control \"\r\n                                          placeholder=\"Sort Order\" type=\"number\" />\r\n                                  </div>\r\n                              </div>\r\n                          </div>\r\n                      </div>\r\n                        <div class=\"row\">\r\n                            <div class=\"col-lg-9 col-lg-offset-2\">\r\n                                <div class=\"col-lg-2\">\r\n                                    <label class=\"btn btn-primary\">\r\n                                        Browse for files&hellip; <input type=\"file\" style=\"display: none;\"\r\n                                            change.delegate=\"changeFiles()\" files.bind=\"files\">\r\n                                    </label>\r\n                                </div>\r\n                                <div class=\"col-lg-6\">\r\n                                    <ul>\r\n                                        <li repeat.for=\"file of filesToUpload\" class=\"list-group-item\">${file.name}<span\r\n                                                click.delegate=\"removeFile($index)\" class=\"pull-right\"><i class=\"fa fa-trash\"\r\n                                                    aria-hidden=\"true\"></i></span></li>\r\n                                    </ul>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </form>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>\r\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/site/components/newsTable.html":
/*!**********************************************************!*\
  !*** ./src/modules/admin/site/components/newsTable.html ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t<div class=\"panel panel-info\">\r\n\t\t<div class=\"panel-body\">\r\n\t\t\t<div class=\"row\">\r\n\t\t\t\t<div class=\"col-lg-12\" style='padding:15px;'>\r\n\t\t\t\t\t<div class='col-lg-12 bottomMargin'>\r\n\t\t\t\t\t\t<compose view=\"../../../../resources/elements/table-navigation-bar.html\"></compose>\r\n\t\t\t\t\t\t<div id=\"no-more-tables\">\r\n\t\t\t\t\t\t\t<table id=\"newsTable\" class=\"table table-striped table-hover cf\">\r\n\t\t\t\t\t\t\t\t<thead class=\"cf\">\r\n\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t<td colspan='5'>\r\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"checkbox\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<label>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<input checked.bind=\"isChecked\" change.trigger=\"filterOutExpired()\" type=\"checkbox\"> Hide expired entries\r\n\t\t\t\t\t\t\t\t\t\t\t\t</label>\r\n\t\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t<td colspan='5'>\r\n\t\t\t\t\t\t\t\t\t\t\t<span click.delegate=\"refresh()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n\t\t\t\t\t\t\t\t\t\t\t data-placement=\"bottom\" title=\"\" data-original-title=\"Refresh\"><i class=\"fa fa-refresh\" aria-hidden=\"true\"></i></span>\r\n\t\t\t\t\t\t\t\t\t\t\t<span click.delegate=\"new()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n\t\t\t\t\t\t\t\t\t\t\t title=\"\" data-original-title=\"New\"><i class=\"fa fa-plus\" aria-hidden=\"true\"></i></span>\r\n\t\t\t\t\t\t\t\t\t\t\t<span click.delegate=\" _cleanUpFilters()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n\t\t\t\t\t\t\t\t\t\t\t data-placement=\"bottom\" title=\"\" data-original-title=\"Clear Filters\"><i class=\"fa fa-filter\" aria-hidden=\"true\"></i></span>\r\n\t\t\t\t\t\t\t\t\t\t\t<span class=\"pull-right\" id=\"spinner\" innerhtml.bind=\"spinnerHTML\"></span>\r\n\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t<th style=\"width:250px;\"><span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'title'})\">title\r\n\t\t\t\t\t\t\t\t\t\t\t</span><i class=\"fa fa-sort\"></i></th>\r\n\t\t\t\t\t\t\t\t\t\t<th style=\"width:150px;\"><span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'createdDate'})\">Created\r\n\t\t\t\t\t\t\t\t\t\t\t</span><i class=\"fa fa-sort\"></i></span></th>\r\n\t\t\t\t\t\t\t\t\t\t<th style=\"width:150px;\"><span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'expiredDate'})\">Expires\r\n\t\t\t\t\t\t\t\t\t\t\t</span><i class=\"fa fa-sort\"></i></span></th>\r\n\t\t\t\t\t\t\t\t\t\t<th style=\"width:150px;\"><span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'itemType'})\">Type\r\n\t\t\t\t\t\t\t\t\t\t\t</span><i class=\"fa fa-sort\"></i></span></th>\r\n\t\t\t\t\t\t\t\t\t\t<th style=\"width:150px;\"><span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'url'})\">URL\r\n\t\t\t\t\t\t\t\t\t\t\t</span><i class=\"fa fa-sort\"></i></span></th>\r\n\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t</thead>\r\n\t\t\t\t\t\t\t\t<tbody>\r\n\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t<th>\r\n\t\t\t\t\t\t\t\t\t\t\t<input value.bind=\"titleFilterValue\" input.delegate=\"dataTable.filterList(titleFilterValue, { type: 'text',  filter: 'titleFilter', collectionProperty: 'title', displayProperty: 'title',  compare:'match'} )\"\r\n\t\t\t\t\t\t\t\t\t\t\t class=\"form-control\" />\r\n\t\t\t\t\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t\t\t\t\t<th>\r\n\t\t\t\t\t\t\t\t\t\t\t<input value.bind=\"createdDateFilterValue\" input.delegate=\"dataTable.filterList(createdDateFilterValue, {type: 'date', filter: 'createdDate',  collectionProperty: 'createdDate', compare: 'after'} )\"\r\n\t\t\t\t\t\t\t\t\t\t\t class=\"form-control\" />\r\n\t\t\t\t\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t\t\t\t\t<th>\r\n\t\t\t\t\t\t\t\t\t\t\t<input value.bind=\"expiredDateFilterValue\" input.delegate=\"dataTable.filterList(expiredDateFilterValue, {type: 'date', filter: 'expiredDate',  collectionProperty: 'expiredDate', compare: 'after'} )\"\r\n\t\t\t\t\t\t\t\t\t\t\t class=\"form-control\" />\r\n\t\t\t\t\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t\t\t\t\t<th>\r\n\t\t\t\t\t\t\t\t\t\t\t<select value.bind=\"itemTypeFilter\" input.delegate=\"dataTable.filterList($event, { type: 'value',  filter: 'itemTypeFilter',  collectionProperty: 'itemType', displayProperty: 'itemType', matchProperty:'', compare:'match'} )\"\r\n\t\t\t\t\t\t\t\t\t\t\t class=\"form-control\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<option value=\"\"></option>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<option value=\"${type.type}\" repeat.for=\"type of config.SITE_INFO_TYPES\">${type.description}</optionp>\r\n\t\t\t\t\t\t\t\t\t\t\t</select>\r\n\t\t\t\t\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t\t\t\t\t<th>\r\n\t\t\t\t\t\t\t\t\t\t\t<input value.bind=\"urlFilterValue\" input.delegate=\"dataTable.filterList(urlFilterValue, { type: 'text',  filter: 'urlFilter', collectionProperty: 'url', displayProperty: 'url',  compare:'match'} )\"\r\n\t\t\t\t\t\t\t\t\t\t\t class=\"form-control\" />\r\n\t\t\t\t\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t<tr click.trigger=\"edit($index, $event, item)\" repeat.for=\"item of dataTable.displayArray\">\r\n\t\t\t\t\t\t\t\t\t\t<td data-title=\"Title\">${item.title}</td>\r\n\t\t\t\t\t\t\t\t\t\t<td data-title=\"Date Created\" style=\"width: 75px\">\r\n\t\t\t\t\t\t\t\t\t\t\t<div>${item.createdDate | dateFormat:config.DATE_FORMAT_TABLE}</div>\r\n\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t<td data-title=\"Date Expired\" style=\"width: 75px\">\r\n\t\t\t\t\t\t\t\t\t\t\t<div>${item.expiredDate | dateFormat:config.DATE_FORMAT_TABLE}</div>\r\n\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t<td data-title=\"Type\">${item.itemType}</td>\r\n\t\t\t\t\t\t\t\t\t\t<td data-title=\"url\"><a href=\"${item.url}\" target=\"_blank\">${item.url}</a></td>\r\n\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t</tbody>\r\n\t\t\t\t\t\t\t</table>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/site/components/uploadedFilesTable.html":
/*!*******************************************************************!*\
  !*** ./src/modules/admin/site/components/uploadedFilesTable.html ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t<div class=\"topMargin\">\r\n\t\t<tree-node data.bind=\"uploadedFileList\" callback.call=\"deleteFile(data)\" level.bind=\"0\" selected-file.bind=\"selectedFile\" selected-node.bind=\"selectedNode\" max-level.bind=\"1\"></tree-node>\r\n\t</div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/site/editConfig.html":
/*!************************************************!*\
  !*** ./src/modules/admin/site/editConfig.html ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div show.bind=\"!parameterSelected\" class=\"col-lg-12\">\r\n        <compose view=\"./components/configTable.html\"></compose>\r\n    </div> <!-- Table Div -->\r\n    <div show.bind=\"parameterSelected\" class=\"col-lg-12\">\r\n        <compose view=\"./components/configForm.html\"></compose>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/site/editCurriculum.html":
/*!****************************************************!*\
  !*** ./src/modules/admin/site/editCurriculum.html ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div show.bind=\"!curriculumItemSelected\" class=\"col-lg-12\">\r\n        <compose view=\"./components/curriculumTable.html\"></compose>\r\n    </div> <!-- Table Div -->\r\n    <div show.bind=\"curriculumItemSelected\" class=\"col-lg-12\">\r\n        <compose view=\"./components/curriculumForm.html\"></compose>\r\n    </div> <!-- Form Div -->\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/site/editDownloads.html":
/*!***************************************************!*\
  !*** ./src/modules/admin/site/editDownloads.html ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div show.bind=\"!downloadSelected\" class=\"col-lg-12\">\r\n        <compose view=\"./components/downloadTable.html\"></compose>\r\n    </div> <!-- Table Div -->\r\n    <div show.bind=\"downloadSelected\" class=\"col-lg-12\">\r\n        <compose view=\"./components/downloadForm.html\"></compose>\r\n    </div> <!-- Form Div -->\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/site/editHelpTickets.html":
/*!*****************************************************!*\
  !*** ./src/modules/admin/site/editHelpTickets.html ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t<div class=\"panel panel-info\">\r\n      <div class=\"panel-body\">\r\n        <div class=\"row\">\r\n            <div show.bind=\"!htTypeSelected\" class=\"col-lg-12\">\r\n                <compose view=\"./components/htTypeTable.html\"></compose>\r\n            </div> <!-- Table Div -->\r\n            <div show.bind=\"htTypeSelected\" class=\"col-lg-12\">\r\n                <compose view=\"./components/htTypeForm.html\"></compose>\r\n            </div> <!-- Form Div -->\r\n        </div> <!-- Row -->\r\n      </div> <!-- Panel Body -->\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/site/editMessages.html":
/*!**************************************************!*\
  !*** ./src/modules/admin/site/editMessages.html ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div show.bind=\"!messageItemSelected\" class=\"col-lg-12\">\r\n        <compose view=\"./components/messageTable.html\"></compose>\r\n    </div> <!-- Table Div -->\r\n    <div show.bind=\"messageItemSelected\" class=\"col-lg-12\">\r\n        <compose view=\"./components/messageForm.html\"></compose>\r\n    </div> <!-- Form Div -->\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/site/editNews.html":
/*!**********************************************!*\
  !*** ./src/modules/admin/site/editNews.html ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div show.bind=\"!newsItemSelected\" class=\"col-lg-12\">\r\n        <compose view=\"./components/newsTable.html\"></compose>\r\n    </div> <!-- Table Div -->\r\n    <div show.bind=\"newsItemSelected\" class=\"col-lg-12\">\r\n        <compose view=\"./components/newsForm.html\"></compose>\r\n    </div> <!-- Form Div -->\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/site/site.html":
/*!******************************************!*\
  !*** ./src/modules/admin/site/site.html ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <compose view='../../../resources/elements/submenu.html'></compose>\r\n    <div class=\"col-lg-12\">\r\n        <router-view></router-view>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ })

}]);
//# sourceMappingURL=app-8e048d9f.c2f6f034a062b3d7f766.bundle.js.map