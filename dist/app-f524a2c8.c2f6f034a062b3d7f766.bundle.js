"use strict";
(self["webpackChunkclient"] = self["webpackChunkclient"] || []).push([["app-f524a2c8"],{

/***/ 353:
/*!**************************************!*\
  !*** ./src/resources/data/people.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "People": function() { return /* binding */ People; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _dataServices__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dataServices */ 5086);
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/utils */ 8741);
var _dec, _class;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }




var People = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_dataServices__WEBPACK_IMPORTED_MODULE_1__.DataServices, _utils_utils__WEBPACK_IMPORTED_MODULE_2__.Utils), _dec(_class = /*#__PURE__*/function () {
  function People(data, utils) {
    this.newObject = false;
    this.cleanObject = true;
    this.peopleArray = undefined;
    this.UCC_STAFF_SERVICE = 'uccStaff';
    this.PEOPLE_SERVICE = "people";
    this.PERSON_REGISTER = "people/register";
    this.CHECK_EMAIL = 'people/checkEmail';
    this.CHECK_NAME = 'people/checkName';
    this.SEND_MAIL = 'people/sendMail';
    this.PASSWORD_RESET = 'passwordReset';
    this.NOTES_SERVICE = "notes";
    this.TECHNOTES_SERVICE = "techNotes";
    this.TECHNOTESCAT_SERVICE = "technotecats";
    this.INSTITUTION_SERVICES = "institutions";
    this.COURSES_SERVICE = 'courses';
    this.PEOPLE_UPLOAD_SERVICE = '/people/upload/';
    this.NOTIFICATION_SERVICE = 'notifications';
    this.PACKAGES_SERVICES = 'apj/packages';
    this.data = data;
    this.utils = utils;
  }

  var _proto = People.prototype;

  _proto.getPeopleArray = /*#__PURE__*/function () {
    var _getPeopleArray = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(options, refresh) {
      var url, serverResponse;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(!this.peopleArray || refresh)) {
                _context.next = 19;
                break;
              }

              url = this.PEOPLE_SERVICE;
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

              this.peopleArray = serverResponse;
              _context.next = 13;
              break;

            case 11:
              this.data.processError(serverResponse);
              return _context.abrupt("return", undefined);

            case 13:
              _context.next = 19;
              break;

            case 15:
              _context.prev = 15;
              _context.t0 = _context["catch"](3);
              console.log(_context.t0);
              return _context.abrupt("return", undefined);

            case 19:
              return _context.abrupt("return", this.peopleArray);

            case 20:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[3, 15]]);
    }));

    function getPeopleArray(_x, _x2) {
      return _getPeopleArray.apply(this, arguments);
    }

    return getPeopleArray;
  }();

  _proto.getUCCStaff = /*#__PURE__*/function () {
    var _getUCCStaff = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(uccRoles) {
      var url, serverResponse;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              url = this.UCC_STAFF_SERVICE + '/' + uccRoles;
              _context2.prev = 1;
              _context2.next = 4;
              return this.data.get(url);

            case 4:
              serverResponse = _context2.sent;

              if (!serverResponse.error) {
                this.uccPeople = serverResponse;
              } else {
                this.data.processError(serverResponse);
              }

              _context2.next = 11;
              break;

            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](1);
              console.log(_context2.t0);

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this, [[1, 8]]);
    }));

    function getUCCStaff(_x3) {
      return _getUCCStaff.apply(this, arguments);
    }

    return getUCCStaff;
  }();

  _proto.getInstitutionPeople = /*#__PURE__*/function () {
    var _getInstitutionPeople = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(options, refresh) {
      var url, serverResponse;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!(!this.peopleArray || refresh)) {
                _context3.next = 13;
                break;
              }

              url = this.PEOPLE_SERVICE;
              url += options ? options : "";
              _context3.prev = 3;
              _context3.next = 6;
              return this.data.get(url);

            case 6:
              serverResponse = _context3.sent;

              if (!serverResponse.error) {
                this.instutionPeopleArray = serverResponse;
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

    function getInstitutionPeople(_x4, _x5) {
      return _getInstitutionPeople.apply(this, arguments);
    }

    return getInstitutionPeople;
  }();

  _proto.getPeopleBulkEmailArray = /*#__PURE__*/function () {
    var _getPeopleBulkEmailArray = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(options, refresh) {
      var url, serverResponse;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (!(!this.peopleBulkEmailArray || refresh)) {
                _context4.next = 13;
                break;
              }

              url = this.PEOPLE_SERVICE + '/bulkEmail';
              url += options ? options : "";
              _context4.prev = 3;
              _context4.next = 6;
              return this.data.get(url);

            case 6:
              serverResponse = _context4.sent;

              if (!serverResponse.error) {
                this.peopleBulkEmailArray = serverResponse;
              } else {
                this.data.processError(serverResponse);
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

    function getPeopleBulkEmailArray(_x6, _x7) {
      return _getPeopleBulkEmailArray.apply(this, arguments);
    }

    return getPeopleBulkEmailArray;
  }();

  _proto.getNotifications = /*#__PURE__*/function () {
    var _getNotifications = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(personId) {
      var response;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              this.notificationsArray = [];
              _context5.next = 3;
              return this.data.get(this.NOTIFICATION_SERVICE + "/" + personId + "?filter=checked|eq|false&order=dateCreated:DSC" + false);

            case 3:
              response = _context5.sent;

              if (!response.error) {
                this.notificationsArray = response;
              }

            case 5:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function getNotifications(_x8) {
      return _getNotifications.apply(this, arguments);
    }

    return getNotifications;
  }();

  _proto.saveNotification = function saveNotification(notice) {
    this.data.saveObject(notice, this.NOTIFICATION_SERVICE, "put");
  };

  _proto.getPerson = /*#__PURE__*/function () {
    var _getPerson = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(id) {
      var url, serverResponse;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              url = this.PEOPLE_SERVICE + "/" + id;
              _context6.prev = 1;
              _context6.next = 4;
              return this.data.get(url);

            case 4:
              serverResponse = _context6.sent;

              if (!serverResponse.error) {
                this.selectedPerson = serverResponse;
              } else {
                this.selectedPerson = undefined;
                this.data.processError(serverResponse);
              }

              _context6.next = 13;
              break;

            case 8:
              _context6.prev = 8;
              _context6.t0 = _context6["catch"](1);
              this.selectedPerson = undefined;
              console.log(_context6.t0);
              return _context6.abrupt("return", this.selectedPerson);

            case 13:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this, [[1, 8]]);
    }));

    function getPerson(_x9) {
      return _getPerson.apply(this, arguments);
    }

    return getPerson;
  }();

  _proto.selectPerson = function selectPerson(index, array) {
    if (index === undefined) {
      this.selectedPerson = this.emptyPerson();
    } else {
      if (array && array === 'i') {
        this.selectedPerson = this.utils.copyObject(this.instutionPeopleArray[index]);
        this.editIndex = index;
      } else {
        this.selectedPerson = this.utils.copyObject(this.peopleArray[index]);
        this.editIndex = index;
      }
    }
  };

  _proto.selectedPersonFromId = function selectedPersonFromId(id, array) {
    var _this = this;

    if (array && array === 'i') {
      this.instutionPeopleArray.forEach(function (item, index) {
        if (item._id === id) {
          _this.editIndex = index;
          _this.selectedPerson = _this.utils.copyObject(item);
        }
      });
      return;
    } else {
      this.peopleArray.forEach(function (item, index) {
        if (item._id === id) {
          _this.editIndex = index;
          _this.selectedPerson = _this.utils.copyObject(item);
        }
      });
      return;
    }
  };

  _proto.setSelectedPerson = function setSelectedPerson(userObj) {
    if (userObj) {
      this.selectedPerson = this.utils.copyObject(userObj);
    }
  };

  _proto.emptyPerson = function emptyPerson() {
    var obj = new Object();
    obj.lastName = "";
    obj.firstName = "";
    obj.middleName = "";
    obj.lastName = "";
    obj.nickName = "";
    obj.status = "";
    obj.phone = "";
    obj.mobile = "";
    obj.email = "";
    obj.gender = "";
    obj.roles = new Array();
    obj.roles.push("USER");
    obj.password = "";
    obj.institution = "";
    obj.active = false;
    obj.coursesArray = new Array();
    obj.file = new Object();
    var auditObj = {
      property: "Created",
      eventDate: new Date()
    };
    obj.audit = [auditObj];
    return obj;
  };

  _proto.checkEmail = /*#__PURE__*/function () {
    var _checkEmail = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
      var serverResponse;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              if (!this.selectedPerson.email) {
                _context7.next = 9;
                break;
              }

              _context7.next = 3;
              return this.data.get(this.CHECK_EMAIL + '?email=' + this.selectedPerson.email);

            case 3:
              serverResponse = _context7.sent;

              if (!(serverResponse.code === 409)) {
                _context7.next = 8;
                break;
              }

              return _context7.abrupt("return", true);

            case 8:
              return _context7.abrupt("return", false);

            case 9:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function checkEmail() {
      return _checkEmail.apply(this, arguments);
    }

    return checkEmail;
  }();

  _proto.checkName = /*#__PURE__*/function () {
    var _checkName = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
      var serverResponse;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              if (!(this.selectedPerson.firstName && this.selectedPerson.lastName && this.selectedPerson.institutionId)) {
                _context8.next = 9;
                break;
              }

              _context8.next = 3;
              return this.data.get(thisCHECK_NAME + '?filter=[and]firstName|eq|' + this.selectedPerson.firstName + ':lastName|eq|' + this.selectedPerson.lastName + ':institutionId|eq|' + this.selectedPerson.institutionId);

            case 3:
              serverResponse = _context8.sent;

              if (!(serverResponse.code === 409)) {
                _context8.next = 8;
                break;
              }

              return _context8.abrupt("return", true);

            case 8:
              return _context8.abrupt("return", false);

            case 9:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    function checkName() {
      return _checkName.apply(this, arguments);
    }

    return checkName;
  }();

  _proto.savePerson = /*#__PURE__*/function () {
    var _savePerson = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(register) {
      var url, _response, _response2;

      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              if (this.selectedPerson._id) {
                _context9.next = 9;
                break;
              }

              if (register) {
                url = this.PERSON_REGISTER;
              } else {
                url = this.PEOPLE_SERVICE;
              }

              _context9.next = 4;
              return this.data.saveObject(this.selectedPerson, url, "post");

            case 4:
              _response = _context9.sent;

              if (!_response.error) {
                if (this.peopleArray) {
                  this.peopleArray.push(_response);
                  ;
                }
              } else {
                this.data.processError(_response, "There was an error creating the account.");
              }

              return _context9.abrupt("return", _response);

            case 9:
              _context9.next = 11;
              return this.data.saveObject(this.selectedPerson, this.PEOPLE_SERVICE, "put");

            case 11:
              _response2 = _context9.sent;

              if (!_response2.error) {
                if (this.peopleArray) {
                  this.peopleArray[this.editIndex] = this.utils.copyObject(this.selectedPerson, this.peopleArray[this.editIndex]);
                }
              }

              return _context9.abrupt("return", _response2);

            case 14:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, this);
    }));

    function savePerson(_x10) {
      return _savePerson.apply(this, arguments);
    }

    return savePerson;
  }();

  _proto.deletePerson = /*#__PURE__*/function () {
    var _deletePerson = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
      var serverResponse;
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              if (!this.selectedPerson._id) {
                _context10.next = 6;
                break;
              }

              _context10.next = 3;
              return this.data.deleteObject(this.PEOPLE_SERVICE + '/' + this.selectedPerson._id);

            case 3:
              serverResponse = _context10.sent;

              if (!serverResponse.error) {
                this.peopleArray.splice(this.editIndex, 1);
                this.editIndex = -1;
              }

              return _context10.abrupt("return", serverResponse);

            case 6:
              return _context10.abrupt("return", null);

            case 7:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, this);
    }));

    function deletePerson() {
      return _deletePerson.apply(this, arguments);
    }

    return deletePerson;
  }();

  _proto.isPersonDirty = function isPersonDirty(originalObj) {
    if (this.selectedPerson) {
      if (originalObj) {
        var obj = originalObj;
      } else if (this.selectedPerson._id) {
        var obj = this.selectedPersonFromId(this.selectedPerson._id);
      } else {
        var obj = this.emptyPerson();
      }

      return this.utils.objectsEqual(this.selectedPerson, obj);
    }
  };

  _proto.uploadFile = /*#__PURE__*/function () {
    var _uploadFile = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(files) {
      var response;
      return regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return this.data.uploadFiles(files, this.PEOPLE_UPLOAD_SERVICE + "/" + this.selectedPerson._id);

            case 2:
              response = _context11.sent;

            case 3:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11, this);
    }));

    function uploadFile(_x11) {
      return _uploadFile.apply(this, arguments);
    }

    return uploadFile;
  }();

  _proto.uploadTechFile = /*#__PURE__*/function () {
    var _uploadTechFile = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(files, id) {
      var response;
      return regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return this.data.uploadFiles(files, this.TECHNOTES_SERVICE + "/upload/" + id);

            case 2:
              response = _context12.sent;

            case 3:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12, this);
    }));

    function uploadTechFile(_x12, _x13) {
      return _uploadTechFile.apply(this, arguments);
    }

    return uploadTechFile;
  }();

  _proto.sendCustomerMessage = /*#__PURE__*/function () {
    var _sendCustomerMessage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(message) {
      var serverResponse;
      return regeneratorRuntime.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              if (!message.email) {
                _context13.next = 7;
                break;
              }

              _context13.next = 3;
              return this.data.saveObject(message, this.SEND_MAIL, "put");

            case 3:
              serverResponse = _context13.sent;
              return _context13.abrupt("return", serverResponse);

            case 7:
              return _context13.abrupt("return", {
                error: "no email"
              });

            case 8:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13, this);
    }));

    function sendCustomerMessage(_x14) {
      return _sendCustomerMessage.apply(this, arguments);
    }

    return sendCustomerMessage;
  }();

  _proto.sendNewRegisterEmail = function sendNewRegisterEmail(email) {
    this.data.saveObject(email, this.PERSON_REGISTER + "/facDev", 'post');
  };

  _proto.sendBuikEmail = function sendBuikEmail(email) {
    if (email.email) {
      var serverResponse = this.data.saveObject(email, this.PEOPLE_SERVICE + '/sendBulkEmail', "post");
      return serverResponse;
    } else {
      return {
        error: "no email"
      };
    }
  };

  _proto.getEmailLog = /*#__PURE__*/function () {
    var _getEmailLog = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(options, refresh) {
      var url, serverResponse;
      return regeneratorRuntime.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              if (this.selectedPerson._id) {
                _context14.next = 2;
                break;
              }

              return _context14.abrupt("return");

            case 2:
              if (!(!this.emailArray || refresh)) {
                _context14.next = 15;
                break;
              }

              url = this.PEOPLE_SERVICE + "/emailLog";
              url += options ? options : "";
              _context14.prev = 5;
              _context14.next = 8;
              return this.data.get(url);

            case 8:
              serverResponse = _context14.sent;

              if (!serverResponse.error) {
                this.emailArray = serverResponse;
              } else {
                this.data.processError(serverResponse);
              }

              _context14.next = 15;
              break;

            case 12:
              _context14.prev = 12;
              _context14.t0 = _context14["catch"](5);
              console.log(_context14.t0);

            case 15:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14, this, [[5, 12]]);
    }));

    function getEmailLog(_x15, _x16) {
      return _getEmailLog.apply(this, arguments);
    }

    return getEmailLog;
  }();

  _proto.updatePassword = function updatePassword(obj) {
    if (this.selectedPerson._id) {
      return this.data.saveObject(obj, this.PEOPLE_SERVICE + '/password/' + this.selectedPerson._id, "put");
    }
  };

  _proto.activateAccountEmail = function activateAccountEmail(email) {
    this.data.saveObject(email, this.PEOPLE_SERVICE + "/facDev/activate", 'post');
  };

  _proto.countPeopleStatus = /*#__PURE__*/function () {
    var _countPeopleStatus = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(status) {
      var response;
      return regeneratorRuntime.wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              _context15.next = 2;
              return this.data.get(this.PEOPLE_SERVICE + '/count/' + status);

            case 2:
              response = _context15.sent;
              return _context15.abrupt("return", response);

            case 4:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15, this);
    }));

    function countPeopleStatus(_x17) {
      return _countPeopleStatus.apply(this, arguments);
    }

    return countPeopleStatus;
  }();

  _proto.archiveInactivePeople = /*#__PURE__*/function () {
    var _archiveInactivePeople = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16() {
      var response;
      return regeneratorRuntime.wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              _context16.next = 2;
              return this.data.saveObject({}, this.PEOPLE_SERVICE + '/archive', "post");

            case 2:
              response = _context16.sent;
              return _context16.abrupt("return", response);

            case 4:
            case "end":
              return _context16.stop();
          }
        }
      }, _callee16, this);
    }));

    function archiveInactivePeople() {
      return _archiveInactivePeople.apply(this, arguments);
    }

    return archiveInactivePeople;
  }() //Institutions
  ;

  _proto.getInstitutionsArray =
  /*#__PURE__*/
  function () {
    var _getInstitutionsArray = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(options, refresh) {
      var url, _response3;

      return regeneratorRuntime.wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              if (!(!this.institutionsArray || refresh)) {
                _context17.next = 7;
                break;
              }

              url = this.INSTITUTION_SERVICES;
              url += options ? options : "";
              _context17.next = 5;
              return this.data.get(url);

            case 5:
              _response3 = _context17.sent;

              if (!_response3.error) {
                this.institutionsArray = _response3;
              } else {
                this.institutionsArray = undefined;
              }

            case 7:
            case "end":
              return _context17.stop();
          }
        }
      }, _callee17, this);
    }));

    function getInstitutionsArray(_x18, _x19) {
      return _getInstitutionsArray.apply(this, arguments);
    }

    return getInstitutionsArray;
  }();

  _proto.getAPJPackages = /*#__PURE__*/function () {
    var _getAPJPackages = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18(options, refresh) {
      var url, _response4;

      return regeneratorRuntime.wrap(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              if (!(!this.packageArray || refresh)) {
                _context18.next = 7;
                break;
              }

              url = this.PACKAGES_SERVICES;
              url += options ? options : "";
              _context18.next = 5;
              return this.data.get(url);

            case 5:
              _response4 = _context18.sent;

              if (!_response4.error) {
                this.packageArray = _response4;
              } else {
                this.packageArray = undefined;
              }

            case 7:
            case "end":
              return _context18.stop();
          }
        }
      }, _callee18, this);
    }));

    function getAPJPackages(_x20, _x21) {
      return _getAPJPackages.apply(this, arguments);
    }

    return getAPJPackages;
  }();

  _proto.getInstitution = /*#__PURE__*/function () {
    var _getInstitution = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19(id) {
      var url, response;
      return regeneratorRuntime.wrap(function _callee19$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              url = this.INSTITUTION_SERVICES + '/' + id;
              _context19.next = 3;
              return this.data.get(url);

            case 3:
              response = _context19.sent;

              if (response.status) {
                _context19.next = 8;
                break;
              }

              return _context19.abrupt("return", response);

            case 8:
              return _context19.abrupt("return", {
                institutionStatus: '99'
              });

            case 9:
            case "end":
              return _context19.stop();
          }
        }
      }, _callee19, this);
    }));

    function getInstitution(_x22) {
      return _getInstitution.apply(this, arguments);
    }

    return getInstitution;
  }();

  _proto.selectInstitution = function selectInstitution(index) {
    if (index === undefined) {
      this.selectedInstitution = this.emptyInstitution();
      this.newInstitution = true;
    } else {
      try {
        this.selectedInstitution = this.utils.copyObject(this.institutionsArray[index]);
        this.newInstitution = false;
        this.editInstitutionIndex = index;
      } catch (error) {
        console.log(error);
        this.selectedInstitution = this.emptyInstitution();
        this.newInstitution = true;
      }
    }
  };

  _proto.selectInstitutionByID = function selectInstitutionByID(id) {
    var _this2 = this;

    this.institutionsArray.forEach(function (item, index) {
      if (item._id === id) {
        _this2.selectedInstitution = _this2.utils.copyObject(item);
        _this2.editInstitutionIndex = index;
        return;
      }
    });
    return null;
  };

  _proto.emptyInstitution = function emptyInstitution() {
    var newInstitution = new Object();
    newInstitution.joinDate = new Date();
    newInstitution.name = "";
    return newInstitution;
  };

  _proto.saveInstitution = /*#__PURE__*/function () {
    var _saveInstitution = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20() {
      var _response5, _response6;

      return regeneratorRuntime.wrap(function _callee20$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              if (this.selectedInstitution._id) {
                _context20.next = 8;
                break;
              }

              _context20.next = 3;
              return this.data.saveObject(this.selectedInstitution, this.INSTITUTION_SERVICES, "post");

            case 3:
              _response5 = _context20.sent;

              if (!_response5.error) {
                if (this.institutionsArray) {
                  this.institutionsArray.push(_response5);
                }
              }

              return _context20.abrupt("return", _response5);

            case 8:
              _context20.next = 10;
              return this.data.saveObject(this.selectedInstitution, this.INSTITUTION_SERVICES, "put");

            case 10:
              _response6 = _context20.sent;

              if (!_response6.status) {
                if (this.institutionsArray) {
                  this.institutionsArray[this.editInstitutionIndex] = this.utils.copyObject(this.selectedInstitution, this.institutionsArray[this.editInstitutionIndex]);
                }
              }

              return _context20.abrupt("return", _response6);

            case 13:
            case "end":
              return _context20.stop();
          }
        }
      }, _callee20, this);
    }));

    function saveInstitution() {
      return _saveInstitution.apply(this, arguments);
    }

    return saveInstitution;
  }();

  _proto.saveAPJInstitution = /*#__PURE__*/function () {
    var _saveAPJInstitution = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee21() {
      var _response7, _response8;

      return regeneratorRuntime.wrap(function _callee21$(_context21) {
        while (1) {
          switch (_context21.prev = _context21.next) {
            case 0:
              if (this.selectedInstitution._id) {
                _context21.next = 8;
                break;
              }

              _context21.next = 3;
              return this.data.saveObject(this.selectedInstitution, 'apj/' + this.INSTITUTION_SERVICES, "post");

            case 3:
              _response7 = _context21.sent;

              if (!_response7.error) {
                if (this.institutionsArray) {
                  this.institutionsArray.push(_response7);
                }
              }

              return _context21.abrupt("return", _response7);

            case 8:
              _context21.next = 10;
              return this.data.saveObject(this.selectedInstitution, 'apj/' + this.INSTITUTION_SERVICES, "put");

            case 10:
              _response8 = _context21.sent;

              if (!_response8.status) {
                if (this.institutionsArray) {
                  this.institutionsArray[this.editInstitutionIndex] = this.utils.copyObject(this.selectedInstitution, this.institutionsArray[this.editInstitutionIndex]);
                }
              }

              return _context21.abrupt("return", _response8);

            case 13:
            case "end":
              return _context21.stop();
          }
        }
      }, _callee21, this);
    }));

    function saveAPJInstitution() {
      return _saveAPJInstitution.apply(this, arguments);
    }

    return saveAPJInstitution;
  }();

  _proto.deleteInstitution = /*#__PURE__*/function () {
    var _deleteInstitution = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee22() {
      var serverResponse;
      return regeneratorRuntime.wrap(function _callee22$(_context22) {
        while (1) {
          switch (_context22.prev = _context22.next) {
            case 0:
              _context22.next = 2;
              return this.data.deleteObject(this.INSTITUTION_SERVICES + '/' + this.selectedInstitution._id);

            case 2:
              serverResponse = _context22.sent;

              if (!serverResponse.error) {
                this.institutionsArray.splice(this.editInstitutionIndex, 1);
                this.editInstitutionIndex = -1;
              }

              return _context22.abrupt("return", serverResponse);

            case 5:
            case "end":
              return _context22.stop();
          }
        }
      }, _callee22, this);
    }));

    function deleteInstitution() {
      return _deleteInstitution.apply(this, arguments);
    }

    return deleteInstitution;
  }();

  _proto.isInstitutionDirty = function isInstitutionDirty() {
    if (this.selectedInstitution) {
      if (this.selectedInstitution._id) {
        var obj = this.institutionsArray[this.editInstitutionIndex];
      } else {
        var obj = this.emptyInstitution();
      }

      return this.utils.objectsEqual(this.selectedInstitution, obj);
    }
  } //notes
  ;

  _proto.getNotesArray =
  /*#__PURE__*/
  function () {
    var _getNotesArray = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee23(options, refresh) {
      var url, serverResponse;
      return regeneratorRuntime.wrap(function _callee23$(_context23) {
        while (1) {
          switch (_context23.prev = _context23.next) {
            case 0:
              if (!(!this.notesArray || refresh)) {
                _context23.next = 19;
                break;
              }

              url = this.NOTES_SERVICE;
              url += options ? options : "";
              _context23.prev = 3;
              _context23.next = 6;
              return this.data.get(url);

            case 6:
              serverResponse = _context23.sent;

              if (serverResponse.error) {
                _context23.next = 11;
                break;
              }

              this.notesArray = serverResponse;
              _context23.next = 13;
              break;

            case 11:
              this.data.processError(serverResponse);
              return _context23.abrupt("return", undefined);

            case 13:
              _context23.next = 19;
              break;

            case 15:
              _context23.prev = 15;
              _context23.t0 = _context23["catch"](3);
              console.log(_context23.t0);
              return _context23.abrupt("return", undefined);

            case 19:
            case "end":
              return _context23.stop();
          }
        }
      }, _callee23, this, [[3, 15]]);
    }));

    function getNotesArray(_x23, _x24) {
      return _getNotesArray.apply(this, arguments);
    }

    return getNotesArray;
  }();

  _proto.getRemindersArray = /*#__PURE__*/function () {
    var _getRemindersArray = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee24(options, refresh) {
      var url, serverResponse;
      return regeneratorRuntime.wrap(function _callee24$(_context24) {
        while (1) {
          switch (_context24.prev = _context24.next) {
            case 0:
              if (!(!this.remindersArray || refresh)) {
                _context24.next = 21;
                break;
              }

              url = this.NOTES_SERVICE;
              url += options ? options : "";
              _context24.prev = 3;
              _context24.next = 6;
              return this.data.get(url);

            case 6:
              serverResponse = _context24.sent;

              if (serverResponse.error) {
                _context24.next = 13;
                break;
              }

              this.remindersArray = serverResponse;

              if (Object.prototype.toString.call(this.remindersArray) === '[object Array]') {
                this.remindersArray = this.remindersArray.filter(function (item) {
                  return item.isReminder;
                });
              }

              return _context24.abrupt("return", serverResponse);

            case 13:
              this.data.processError(serverResponse);
              return _context24.abrupt("return", undefined);

            case 15:
              _context24.next = 21;
              break;

            case 17:
              _context24.prev = 17;
              _context24.t0 = _context24["catch"](3);
              console.log(_context24.t0);
              return _context24.abrupt("return", undefined);

            case 21:
            case "end":
              return _context24.stop();
          }
        }
      }, _callee24, this, [[3, 17]]);
    }));

    function getRemindersArray(_x25, _x26) {
      return _getRemindersArray.apply(this, arguments);
    }

    return getRemindersArray;
  }();

  _proto.selectNote = function selectNote(index) {
    if (index === undefined) {
      this.selectedNote = this.emptyNote();
    } else {
      try {
        this.selectedNote = this.utils.copyObject(this.notesArray[index]);
        this.editNoteIndex = index;
      } catch (error) {
        console.log(error);
        this.selectedNote = this.emptyNote();
      }
    }
  };

  _proto.selectNoteById = function selectNoteById(id) {
    if (!id) return;

    for (var i = 0; i < this.notesArray.length; i++) {
      if (this.notesArray[i]._id === id) {
        this.selectedNote = this.utils.copyObject(this.notesArray[i]);
        this.editNoteIndex = i;
        return;
      }
    }

    this.selectedNote = this.emptyNote();
  };

  _proto.emptyNote = function emptyNote() {
    var obj = new Object();
    obj.note = "";
    obj.dateCreated = new Date();
    obj.category = "";
    obj.type = "g";
    return obj;
  };

  _proto.saveNote = /*#__PURE__*/function () {
    var _saveNote = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee25(index) {
      var _serverResponse, serverResponse;

      return regeneratorRuntime.wrap(function _callee25$(_context25) {
        while (1) {
          switch (_context25.prev = _context25.next) {
            case 0:
              if (this.selectedNote) {
                _context25.next = 2;
                break;
              }

              return _context25.abrupt("return");

            case 2:
              if (this.selectedNote._id) {
                _context25.next = 10;
                break;
              }

              _context25.next = 5;
              return this.data.saveObject(this.selectedNote, this.NOTES_SERVICE, "post");

            case 5:
              _serverResponse = _context25.sent;

              if (!_serverResponse.error) {
                if (this.notesArray) {
                  this.notesArray.push(this.selectedNote);
                  this.editNoteIndex = this.notesArray.length - 1;
                }
              } else {
                this.data.processError(response, "There was an error creating the note.");
              }

              return _context25.abrupt("return", _serverResponse);

            case 10:
              _context25.next = 12;
              return this.data.saveObject(this.selectedNote, this.NOTES_SERVICE, "put");

            case 12:
              serverResponse = _context25.sent;

              if (!serverResponse.error) {
                this.notesArray[this.editNoteIndex] = this.utils.copyObject(this.selectedNote, this.notesArray[this.editNoteIndex]);
              } else {
                this.data.processError(response, "There was an error updating the course.");
              }

              return _context25.abrupt("return", serverResponse);

            case 15:
            case "end":
              return _context25.stop();
          }
        }
      }, _callee25, this);
    }));

    function saveNote(_x27) {
      return _saveNote.apply(this, arguments);
    }

    return saveNote;
  }();

  _proto.saveReminder = /*#__PURE__*/function () {
    var _saveReminder = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee26(item, index) {
      var serverResponse;
      return regeneratorRuntime.wrap(function _callee26$(_context26) {
        while (1) {
          switch (_context26.prev = _context26.next) {
            case 0:
              console.log(item);

              if (!(item === undefined)) {
                _context26.next = 3;
                break;
              }

              return _context26.abrupt("return");

            case 3:
              _context26.next = 5;
              return this.data.saveObject(item, this.NOTES_SERVICE, "put");

            case 5:
              serverResponse = _context26.sent;

              if (!serverResponse.error) {
                this.remindersArray[index] = this.utils.copyObject(this.noteToSave, this.remindersArray[index]);
              } else {
                this.data.processError(response, "There was an error updating the course.");
              }

              return _context26.abrupt("return", serverResponse);

            case 8:
            case "end":
              return _context26.stop();
          }
        }
      }, _callee26, this);
    }));

    function saveReminder(_x28, _x29) {
      return _saveReminder.apply(this, arguments);
    }

    return saveReminder;
  }();

  _proto.deleteNote = /*#__PURE__*/function () {
    var _deleteNote = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee27() {
      var serverResponse;
      return regeneratorRuntime.wrap(function _callee27$(_context27) {
        while (1) {
          switch (_context27.prev = _context27.next) {
            case 0:
              if (this.selectedNote) {
                _context27.next = 2;
                break;
              }

              return _context27.abrupt("return");

            case 2:
              _context27.next = 4;
              return this.data.deleteObject(this.NOTES_SERVICE + '/' + this.selectedNote._id);

            case 4:
              serverResponse = _context27.sent;

              if (!serverResponse.error) {
                this.notesArray.splice(this.editNoteIndex, 1);
                this.editNoteIndex = -1;
              }

              return _context27.abrupt("return", serverResponse);

            case 7:
            case "end":
              return _context27.stop();
          }
        }
      }, _callee27, this);
    }));

    function deleteNote() {
      return _deleteNote.apply(this, arguments);
    }

    return deleteNote;
  }() //tech notes
  ;

  _proto.getTechNotesArray =
  /*#__PURE__*/
  function () {
    var _getTechNotesArray = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee28(options, refresh) {
      var url, serverResponse;
      return regeneratorRuntime.wrap(function _callee28$(_context28) {
        while (1) {
          switch (_context28.prev = _context28.next) {
            case 0:
              if (!(!this.notesArray || refresh)) {
                _context28.next = 19;
                break;
              }

              url = this.TECHNOTES_SERVICE;
              url += options ? options : "";
              _context28.prev = 3;
              _context28.next = 6;
              return this.data.get(url);

            case 6:
              serverResponse = _context28.sent;

              if (serverResponse.error) {
                _context28.next = 11;
                break;
              }

              this.techNotesArray = serverResponse;
              _context28.next = 13;
              break;

            case 11:
              this.data.processError(serverResponse);
              return _context28.abrupt("return", undefined);

            case 13:
              _context28.next = 19;
              break;

            case 15:
              _context28.prev = 15;
              _context28.t0 = _context28["catch"](3);
              console.log(_context28.t0);
              return _context28.abrupt("return", undefined);

            case 19:
            case "end":
              return _context28.stop();
          }
        }
      }, _callee28, this, [[3, 15]]);
    }));

    function getTechNotesArray(_x30, _x31) {
      return _getTechNotesArray.apply(this, arguments);
    }

    return getTechNotesArray;
  }();

  _proto.selectTechNote = function selectTechNote(index) {
    if (index === undefined) {
      this.selectedTechNote = this.emptyTechNote();
    } else {
      try {
        this.selectedTechNote = this.utils.copyObject(this.techNotesArray[index]);
        this.editTechNoteIndex = index;
      } catch (error) {
        console.log(error);
        this.selectedTechNote = this.emptyTechNote();
      }
    }
  };

  _proto.emptyTechNote = function emptyTechNote() {
    var obj = new Object();
    obj.note = "";
    obj.dateCreated = new Date();
    obj.file = {};
    obj.category = "";
    return obj;
  };

  _proto.saveTechNote = /*#__PURE__*/function () {
    var _saveTechNote = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee29() {
      var _serverResponse2, serverResponse;

      return regeneratorRuntime.wrap(function _callee29$(_context29) {
        while (1) {
          switch (_context29.prev = _context29.next) {
            case 0:
              if (this.selectedTechNote) {
                _context29.next = 2;
                break;
              }

              return _context29.abrupt("return");

            case 2:
              if (this.selectedTechNote._id) {
                _context29.next = 9;
                break;
              }

              _context29.next = 5;
              return this.data.saveObject(this.selectedTechNote, this.TECHNOTES_SERVICE, "post");

            case 5:
              _serverResponse2 = _context29.sent;
              return _context29.abrupt("return", _serverResponse2);

            case 9:
              _context29.next = 11;
              return this.data.saveObject(this.selectedTechNote, this.TECHNOTES_SERVICE, "put");

            case 11:
              serverResponse = _context29.sent;
              return _context29.abrupt("return", serverResponse);

            case 13:
            case "end":
              return _context29.stop();
          }
        }
      }, _callee29, this);
    }));

    function saveTechNote() {
      return _saveTechNote.apply(this, arguments);
    }

    return saveTechNote;
  }();

  _proto.deleteTechNote = /*#__PURE__*/function () {
    var _deleteTechNote = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee30() {
      var serverResponse;
      return regeneratorRuntime.wrap(function _callee30$(_context30) {
        while (1) {
          switch (_context30.prev = _context30.next) {
            case 0:
              if (this.selectedTechNote) {
                _context30.next = 2;
                break;
              }

              return _context30.abrupt("return");

            case 2:
              _context30.next = 4;
              return this.data.deleteObject(this.TECHNOTES_SERVICE + '/' + this.selectedTechNote._id);

            case 4:
              serverResponse = _context30.sent;

              if (!serverResponse.error) {
                this.techNotesArray.splice(this.editTechNoteIndex, 1);
                this.editTechNoteIndex = -1;
              }

              return _context30.abrupt("return", serverResponse);

            case 7:
            case "end":
              return _context30.stop();
          }
        }
      }, _callee30, this);
    }));

    function deleteTechNote() {
      return _deleteTechNote.apply(this, arguments);
    }

    return deleteTechNote;
  }();

  _proto.getTechNotesCatArray = /*#__PURE__*/function () {
    var _getTechNotesCatArray = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee31(options, refresh) {
      var url, serverResponse;
      return regeneratorRuntime.wrap(function _callee31$(_context31) {
        while (1) {
          switch (_context31.prev = _context31.next) {
            case 0:
              if (!(!this.notesArray || refresh)) {
                _context31.next = 19;
                break;
              }

              url = this.TECHNOTESCAT_SERVICE;
              url += options ? options : "";
              _context31.prev = 3;
              _context31.next = 6;
              return this.data.get(url);

            case 6:
              serverResponse = _context31.sent;

              if (serverResponse.error) {
                _context31.next = 11;
                break;
              }

              this.techNotesCatArray = serverResponse;
              _context31.next = 13;
              break;

            case 11:
              this.data.processError(serverResponse);
              return _context31.abrupt("return", undefined);

            case 13:
              _context31.next = 19;
              break;

            case 15:
              _context31.prev = 15;
              _context31.t0 = _context31["catch"](3);
              console.log(_context31.t0);
              return _context31.abrupt("return", undefined);

            case 19:
            case "end":
              return _context31.stop();
          }
        }
      }, _callee31, this, [[3, 15]]);
    }));

    function getTechNotesCatArray(_x32, _x33) {
      return _getTechNotesCatArray.apply(this, arguments);
    }

    return getTechNotesCatArray;
  }();

  _proto.selectTechNoteCat = function selectTechNoteCat(index) {
    if (index === undefined) {
      this.selectedTechNoteCat = this.emptyTechNoteCat();
    } else {
      try {
        this.selectedTechNoteCat = this.utils.copyObject(this.techNotesCatArray[index]);
        this.editTechNoteCatIndex = index;
      } catch (error) {
        console.log(error);
        this.selectedTechNoteCat = this.emptyTechNoteCat();
      }
    }
  };

  _proto.selectTechNoteCatByID = function selectTechNoteCatByID(id) {
    var _this3 = this;

    this.techNotesCatArray.forEach(function (item, index) {
      if (item._id === id) {
        _this3.selectedTechNoteCat = _this3.utils.copyObject(item);
        _this3.editTechNoteCatIndex = index;
        return;
      }
    });
    return null;
  };

  _proto.emptyTechNoteCat = function emptyTechNoteCat() {
    var obj = new Object();
    obj.category = "";
    return obj;
  };

  _proto.saveTechNoteCat = /*#__PURE__*/function () {
    var _saveTechNoteCat = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee32() {
      var _serverResponse3, serverResponse;

      return regeneratorRuntime.wrap(function _callee32$(_context32) {
        while (1) {
          switch (_context32.prev = _context32.next) {
            case 0:
              if (this.selectedTechNoteCat) {
                _context32.next = 2;
                break;
              }

              return _context32.abrupt("return");

            case 2:
              if (this.selectedTechNoteCat._id) {
                _context32.next = 10;
                break;
              }

              _context32.next = 5;
              return this.data.saveObject(this.selectedTechNoteCat, this.TECHNOTESCAT_SERVICE, "post");

            case 5:
              _serverResponse3 = _context32.sent;

              if (!_serverResponse3.error) {
                if (this.notesArray) {
                  this.techNotesCatArray.push(this.selectedTechNoteCat);
                  this.editTechNoteCatIndex = this.techNotesCatArray.length - 1;
                }
              } else {
                this.data.processError(response, "There was an error creating the note.");
              }

              return _context32.abrupt("return", _serverResponse3);

            case 10:
              _context32.next = 12;
              return this.data.saveObject(this.selectedTechNoteCat, this.TECHNOTESCAT_SERVICE, "put");

            case 12:
              serverResponse = _context32.sent;

              if (!serverResponse.error) {
                this.techNotesCatArray[this.editTechNoteCatIndex] = this.utils.copyObject(this.selectedTechNoteCat, this.techNotesCatArray[this.editTechNoteCatIndex]);
              } else {
                this.data.processError(response, "There was an error updating the tech note.");
              }

              return _context32.abrupt("return", serverResponse);

            case 15:
            case "end":
              return _context32.stop();
          }
        }
      }, _callee32, this);
    }));

    function saveTechNoteCat() {
      return _saveTechNoteCat.apply(this, arguments);
    }

    return saveTechNoteCat;
  }();

  _proto.deleteTechNoteCat = /*#__PURE__*/function () {
    var _deleteTechNoteCat = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee33() {
      var serverResponse;
      return regeneratorRuntime.wrap(function _callee33$(_context33) {
        while (1) {
          switch (_context33.prev = _context33.next) {
            case 0:
              if (!this.selectedTechNoteCat._id) {
                _context33.next = 6;
                break;
              }

              _context33.next = 3;
              return this.data.deleteObject(this.TECHNOTESCAT_SERVICE + '/' + this.selectedTechNoteCat._id);

            case 3:
              serverResponse = _context33.sent;

              if (!serverResponse.error) {
                this.techNotesCatArray.splice(this.editTechNoteCatIndex, 1);
                this.editTechNoteCatIndex = -1;
              }

              return _context33.abrupt("return", serverResponse);

            case 6:
              return _context33.abrupt("return", null);

            case 7:
            case "end":
              return _context33.stop();
          }
        }
      }, _callee33, this);
    }));

    function deleteTechNoteCat() {
      return _deleteTechNoteCat.apply(this, arguments);
    }

    return deleteTechNoteCat;
  }() //courses
  ;

  _proto.getCoursesArray =
  /*#__PURE__*/
  function () {
    var _getCoursesArray = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee34(refresh, options, fields) {
      var url, serverResponse;
      return regeneratorRuntime.wrap(function _callee34$(_context34) {
        while (1) {
          switch (_context34.prev = _context34.next) {
            case 0:
              if (!(!this.coursesArray || refresh)) {
                _context34.next = 14;
                break;
              }

              url = this.COURSES_SERVICE;
              url += options ? options : "";
              _context34.prev = 3;
              _context34.next = 6;
              return this.data.get(url);

            case 6:
              serverResponse = _context34.sent;

              if (!serverResponse.error) {
                this.coursesArray = serverResponse;
              }

              _context34.next = 13;
              break;

            case 10:
              _context34.prev = 10;
              _context34.t0 = _context34["catch"](3);
              console.log(_context34.t0);

            case 13:
              ;

            case 14:
            case "end":
              return _context34.stop();
          }
        }
      }, _callee34, this, [[3, 10]]);
    }));

    function getCoursesArray(_x34, _x35, _x36) {
      return _getCoursesArray.apply(this, arguments);
    }

    return getCoursesArray;
  }();

  _proto.selectCourse = function selectCourse(index) {
    if (index === undefined) {
      this.selectedCourse = this.emptyCourse();
    } else {
      try {
        this.selectedCourse = this.utils.copyObject(this.coursesArray[index]);
        this.editCourseIndex = index;
      } catch (error) {
        console.log(error);
        this.selectedCourse = this.emptyCourse();
      }
    }
  };

  _proto.emptyCourse = function emptyCourse() {
    var newObj = new Object();
    ;
    newObj.name = "";
    newObj.description = "";
    newObj.number = "";
    newObj.active = true;
    return newObj;
  };

  _proto.saveCourse = /*#__PURE__*/function () {
    var _saveCourse = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee35() {
      var _serverResponse4, serverResponse;

      return regeneratorRuntime.wrap(function _callee35$(_context35) {
        while (1) {
          switch (_context35.prev = _context35.next) {
            case 0:
              if (this.selectedCourse) {
                _context35.next = 2;
                break;
              }

              return _context35.abrupt("return");

            case 2:
              if (this.selectedCourse._id) {
                _context35.next = 10;
                break;
              }

              _context35.next = 5;
              return this.data.saveObject(this.selectedCourse, this.COURSES_SERVICE, "post");

            case 5:
              _serverResponse4 = _context35.sent;

              if (!_serverResponse4.error) {
                this.selectedCourse = this.utils.copyObject(_serverResponse4);
                if (this.coursesArray) this.coursesArray.push(this.selectedCourse);
                this.editIneditCourseIndex = this.coursesArray.length - 1;
              } else {
                this.data.processError(response, "There was an error creating the product.");
              }

              return _context35.abrupt("return", _serverResponse4);

            case 10:
              _context35.next = 12;
              return this.data.saveObject(this.selectedCourse, this.COURSES_SERVICE, "put");

            case 12:
              serverResponse = _context35.sent;

              if (!serverResponse.error) {
                this.selectedCourse = this.utils.copyObject(serverResponse);
                this.coursesArray[this.editCourseIndex] = this.utils.copyObject(this.selectedCourse, this.coursesArray[this.editCourseIndex]);
              } else {
                this.data.processError(response, "There was an error updating the course.");
              }

              return _context35.abrupt("return", serverResponse);

            case 15:
            case "end":
              return _context35.stop();
          }
        }
      }, _callee35, this);
    }));

    function saveCourse() {
      return _saveCourse.apply(this, arguments);
    }

    return saveCourse;
  }();

  _proto.isCourseDirty = function isCourseDirty() {
    if (this.editCourseIndex >= 0 && this.selectedCourse) {
      return this.utils.objectsEqual(this.selectedCourse, this.coursesArray[this.editCourseIndex]);
    }
  };

  _proto.requestPasswordReset = /*#__PURE__*/function () {
    var _requestPasswordReset = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee36(obj) {
      var serverResponse;
      return regeneratorRuntime.wrap(function _callee36$(_context36) {
        while (1) {
          switch (_context36.prev = _context36.next) {
            case 0:
              _context36.next = 2;
              return this.data.saveObject(obj, this.PASSWORD_RESET, "post");

            case 2:
              serverResponse = _context36.sent;
              return _context36.abrupt("return", serverResponse);

            case 4:
            case "end":
              return _context36.stop();
          }
        }
      }, _callee36, this);
    }));

    function requestPasswordReset(_x37) {
      return _requestPasswordReset.apply(this, arguments);
    }

    return requestPasswordReset;
  }();

  _proto.getPasswordReset = /*#__PURE__*/function () {
    var _getPasswordReset = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee37(validationCode) {
      var serverResponse;
      return regeneratorRuntime.wrap(function _callee37$(_context37) {
        while (1) {
          switch (_context37.prev = _context37.next) {
            case 0:
              _context37.next = 2;
              return this.data.get(this.PASSWORD_RESET + '/' + validationCode);

            case 2:
              serverResponse = _context37.sent;

              if (!serverResponse.code) {
                this.selectedPerson = serverResponse;
              }

              return _context37.abrupt("return", serverResponse);

            case 5:
            case "end":
              return _context37.stop();
          }
        }
      }, _callee37, this);
    }));

    function getPasswordReset(_x38) {
      return _getPasswordReset.apply(this, arguments);
    }

    return getPasswordReset;
  }();

  return People;
}()) || _class);

/***/ }),

/***/ 8666:
/*!****************************************!*\
  !*** ./src/resources/data/products.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Products": function() { return /* binding */ Products; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _dataServices__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dataServices */ 5086);
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/utils */ 8741);
var _dec, _class;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }




var Products = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_dataServices__WEBPACK_IMPORTED_MODULE_1__.DataServices, _utils_utils__WEBPACK_IMPORTED_MODULE_2__.Utils), _dec(_class = /*#__PURE__*/function () {
  function Products(data, utils) {
    this.PRODUCTS_SERVICE = 'products';
    this.data = data;
    this.utils = utils;
  }

  var _proto = Products.prototype;

  _proto.getProductsArray = /*#__PURE__*/function () {
    var _getProductsArray = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(options, refresh) {
      var url, serverResponse;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(!this.productsArray || refresh)) {
                _context.next = 13;
                break;
              }

              url = this.PRODUCTS_SERVICE;
              url += options ? options : "";
              _context.prev = 3;
              _context.next = 6;
              return this.data.get(url);

            case 6:
              serverResponse = _context.sent;

              if (!serverResponse.error) {
                this.productsArray = serverResponse;
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

    function getProductsArray(_x, _x2) {
      return _getProductsArray.apply(this, arguments);
    }

    return getProductsArray;
  }();

  _proto.getProduct = /*#__PURE__*/function () {
    var _getProduct = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(index) {
      var id, serverResponse;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!index) {
                _context2.next = 7;
                break;
              }

              id = this.productsArray[index]._id;
              _context2.next = 4;
              return this.data.get(this.PRODUCTS_SERVICE + "/" + id);

            case 4:
              serverResponse = _context2.sent;

              if (!serverResponse.error) {
                this.selectedProduct = serverResponse;
                this.productsArray[index] = this.utils.copyObject(this.selectedProduct);
              }

              return _context2.abrupt("return", serverResponse);

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function getProduct(_x3) {
      return _getProduct.apply(this, arguments);
    }

    return getProduct;
  }();

  _proto.selectProduct = function selectProduct(index) {
    if (index === undefined) {
      this.selectedProduct = this.emptyProduct();
      this.newSystem = true;
    } else {
      try {
        this.selectedProduct = this.utils.copyObject(this.productsArray[index]);
        this.newSystem = false;
        this.editIndex = index;
      } catch (error) {
        console.log(error);
        this.selectedProduct = this.emptyProduct();
        this.newSystem = true;
      }
    }
  };

  _proto.selectedProductFromId = function selectedProductFromId(id) {
    var _this = this;

    this.selectedProduct = this.emptyProduct();
    this.productsArray.forEach(function (item) {
      if (item._id === id) {
        _this.selectedProduct = _this.utils.copyObject(item);
        return;
      }
    });
    return null;
  };

  _proto.emptyProduct = function emptyProduct() {
    var newProduct = new Object();
    ;
    newProduct.clientKey = "";
    newProduct.name = "";
    newProduct.sapName = "";
    newProduct.hostWhere = "";
    newProduct.uaCurriculum = "";
    newProduct.defaultStudentIdPrefix = "";
    newProduct.defaultFacultyIdPrefix = "";
    newProduct.defaultStudentPassword = "";
    newProduct.defaultFacultyPassword = "";
    newProduct.comment = "";
    newProduct.Client_Info = "";
    newProduct.fileName = "";
    newProduct.dataset = "";
    newProduct.idsAvailable = "";
    newProduct.firstAllowableId = 1;
    newProduct.active = true;
    newProduct.systems = new Array();
    return newProduct;
  };

  _proto.getProductInfo = function getProductInfo(id) {
    if (!id) return null;

    for (var i = 0; i < this.productsArray.length; i++) {
      if (this.productsArray[i]._id === id) {
        if (this.productsArray[i].productDescription) {
          return {
            info: this.productsArray[i].productDescription,
            productId: id,
            header: this.productsArray[i].name
          };
        } else {
          return null;
        }
      }
    }

    return null;
  };

  _proto.saveProduct = /*#__PURE__*/function () {
    var _saveProduct = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var _serverResponse, serverResponse;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (this.selectedProduct) {
                _context3.next = 2;
                break;
              }

              return _context3.abrupt("return");

            case 2:
              if (this.selectedProduct._id) {
                _context3.next = 10;
                break;
              }

              _context3.next = 5;
              return this.data.saveObject(this.selectedProduct, this.PRODUCTS_SERVICE, "post");

            case 5:
              _serverResponse = _context3.sent;

              if (!_serverResponse.error) {
                this.productsArray.push(_serverResponse);
                this.editIndex = this.productsArray.length - 1;
              } else {
                this.data.processError(_serverResponse, "There was an error creating the product.");
              }

              return _context3.abrupt("return", _serverResponse);

            case 10:
              _context3.next = 12;
              return this.data.saveObject(this.selectedProduct, this.PRODUCTS_SERVICE, "put");

            case 12:
              serverResponse = _context3.sent;

              if (!serverResponse.error) {
                this.productsArray[this.editIndex] = this.utils.copyObject(this.selectedProduct, this.productsArray[this.editIndex]);
              } else {
                this.data.processError(serverResponse, "There was an error updating the product.");
              }

              return _context3.abrupt("return", serverResponse);

            case 15:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function saveProduct() {
      return _saveProduct.apply(this, arguments);
    }

    return saveProduct;
  }();

  _proto.deleteProduct = /*#__PURE__*/function () {
    var _deleteProduct = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var serverResponse;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return this.data.deleteObject(this.PRODUCTS_SERVICE + '/' + this.selectedProduct._id);

            case 2:
              serverResponse = _context4.sent;

              if (!serverResponse.error) {
                this.productsArray.splice(this.editIndex, 1);
                this.editIndex = -1;
              }

              return _context4.abrupt("return", serverResponse);

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function deleteProduct() {
      return _deleteProduct.apply(this, arguments);
    }

    return deleteProduct;
  }();

  _proto.isDirty = function isDirty() {
    if (this.selectedProduct) {
      if (this.selectedProduct._id) {
        var obj = this.productsArray[this.editIndex];
      } else {
        var obj = this.emptyProduct();
      }

      return this.utils.objectsEqual(this.selectedProduct, obj);
    }
  };

  return Products;
}()) || _class);

/***/ }),

/***/ 4517:
/*!*******************************************!*\
  !*** ./src/resources/data/sessionData.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SessionObj": function() { return /* binding */ SessionObj; }
/* harmony export */ });
var SessionObj = function SessionObj() {
  this.token = void 0;
  this.user = void 0;
};

/***/ }),

/***/ 2073:
/*!****************************************!*\
  !*** ./src/resources/data/sessions.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Sessions": function() { return /* binding */ Sessions; }
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






var Sessions = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_dataServices__WEBPACK_IMPORTED_MODULE_1__.DataServices, _utils_utils__WEBPACK_IMPORTED_MODULE_2__.Utils, _config_appConfig__WEBPACK_IMPORTED_MODULE_3__.AppConfig), _dec(_class = /*#__PURE__*/function () {
  function Sessions(data, utils, config) {
    this.SESSIONS_SERVICE = "sessions";
    this.data = data;
    this.utils = utils;
    this.config = config;
  }

  var _proto = Sessions.prototype;

  _proto.getSessionsArray = /*#__PURE__*/function () {
    var _getSessionsArray = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(options, refresh) {
      var url, serverResponse;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(!this.sessionsArray || refresh)) {
                _context.next = 18;
                break;
              }

              url = this.SESSIONS_SERVICE;
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

              this.sessionsArray = serverResponse;
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
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[3, 14]]);
    }));

    function getSessionsArray(_x, _x2) {
      return _getSessionsArray.apply(this, arguments);
    }

    return getSessionsArray;
  }();

  _proto.selectSession = function selectSession(index) {
    if (!index && index != 0) {
      this.selectedSession = this.emptySession();
    } else {
      try {
        this.selectedSession = this.utils.copyObject(this.sessionsArray[index]);
        this.editIndex = index;
      } catch (error) {
        console.log(error);
        this.selectedSession = this.emptySesssion();
        this.newSession = true;
      }
    }
  };

  _proto.selectSessionById = function selectSessionById(id) {
    this.selectedSession = null;

    for (var i = 0; i < this.sessionsArray.length; i++) {
      if (this.sessionsArray[i]._id === id) {
        this.selectedSession = this.utils.copyObject(this.sessionsArray[i]);
        this.editIndex = i;
        break;
      }
    }
  };

  _proto.setSession = function setSession(session) {
    this.selectedSession = session;
  };

  _proto.emptySession = function emptySession() {
    var newSessionObj = new Object();
    newSessionObj.session = "";
    newSessionObj.year = "";
    newSessionObj.startDate = "";
    newSessionObj.endDate = "";
    newSessionObj.requestsOpenDate = "";
    newSessionObj.sessionStatus = "Next";
    var sessions = this.sessionsArray.sort(function (a, b) {
      return moment__WEBPACK_IMPORTED_MODULE_4___default()(a.startDate).isBefore(b.startDate);
    });
    var nextSession = -1; //Search for the most recent session and set the next session

    if (!sessions[0]) {
      var today = new Date();
      var month = today.getMonth();
      var year = today.getFullYear();
      nextSession = 1;

      for (var i = 0, x = this.config.SESSION_PARAMS.length; i < x; i++) {
        if (month >= parseInt(this.config.SESSION_PARAMS[i].startMonth) && month <= parseInt(this.config.SESSION_PARAMS[i].endMonth)) {
          nextSession = i + 1;
          break;
        }
      }

      var thisYear = nextSession != 4 ? year : year--;
    } else {
      for (var i = 0, x = this.config.SESSION_PARAMS.length; i < x; i++) {
        if (sessions[0].session === this.config.SESSION_PARAMS[i].session) {
          nextSession = i + 1;
          break;
        }
      }

      var thisYear = parseInt(sessions[0].year);
    } //If the next session is the fifth session then set it to the first session


    if (nextSession === 4) nextSession = 0; //Set the session name

    newSessionObj.session = this.config.SESSION_PARAMS[nextSession].session; //And the year
    // let thisYear = parseInt(sessions[0].year);

    if (nextSession === 0) thisYear++;
    newSessionObj.year = thisYear;

    if (nextSession === 3) {
      newSessionObj.year = thisYear + "/" + (parseInt(thisYear) + 1);
    } //Set the dates


    newSessionObj.startDate = thisYear + "-" + this.config.SESSION_PARAMS[nextSession].startMonth + "-" + this.config.SESSION_PARAMS[nextSession].startDay;

    if (nextSession === 3) {
      thisYear = parseInt(thisYear) + 1;
      newSessionObj.endDate = thisYear + "-" + this.config.SESSION_PARAMS[nextSession].endMonth + "-" + this.config.SESSION_PARAMS[nextSession].endDay;
    } else {
      newSessionObj.endDate = thisYear + "-" + this.config.SESSION_PARAMS[nextSession].endMonth + "-" + this.config.SESSION_PARAMS[nextSession].endDay;
    }

    newSessionObj.requestsOpenDate = thisYear + "-" + this.config.SESSION_PARAMS[nextSession].openMonth + "-" + this.config.SESSION_PARAMS[nextSession].openDay;
    return newSessionObj;
  };

  _proto.saveSession = /*#__PURE__*/function () {
    var _saveSession = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var _serverResponse, serverResponse;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (this.selectedSession) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return");

            case 2:
              if (this.selectedSession._id) {
                _context2.next = 10;
                break;
              }

              _context2.next = 5;
              return this.data.saveObject(this.selectedSession, this.SESSIONS_SERVICE, "post");

            case 5:
              _serverResponse = _context2.sent;

              if (!_serverResponse.error) {
                this.sessionsArray.unshift(_serverResponse);
              }

              return _context2.abrupt("return", _serverResponse);

            case 10:
              _context2.next = 12;
              return this.data.saveObject(this.selectedSession, this.SESSIONS_SERVICE, "put");

            case 12:
              serverResponse = _context2.sent;

              if (!serverResponse.error) {
                this.sessionsArray[this.editIndex] = this.utils.copyObject(this.selectedSession);
              }

              return _context2.abrupt("return", serverResponse);

            case 15:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function saveSession() {
      return _saveSession.apply(this, arguments);
    }

    return saveSession;
  }();

  _proto.isDirty = function isDirty() {
    if (this.selectedSession) {
      if (this.selectedSession._id) {
        var obj = this.sessionsArray[this.editIndex];
      } else {
        var obj = this.emptySession();
      }

      return this.utils.objectsEqual(this.selectedSession, obj);
    }
  };

  return Sessions;
}()) || _class);

/***/ }),

/***/ 1290:
/*!****************************************!*\
  !*** ./src/resources/data/siteInfo.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SiteInfo": function() { return /* binding */ SiteInfo; }
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






var SiteInfo = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_dataServices__WEBPACK_IMPORTED_MODULE_1__.DataServices, _utils_utils__WEBPACK_IMPORTED_MODULE_2__.Utils, _config_appConfig__WEBPACK_IMPORTED_MODULE_3__.AppConfig), _dec(_class = /*#__PURE__*/function () {
  function SiteInfo(data, utils, config) {
    this.SITE_SERVICES = 'site';
    this.MESSAGE_SERVICES = 'messages';
    this.data = data;
    this.utils = utils;
    this.config = config;
  }

  var _proto = SiteInfo.prototype;

  _proto.getInfoArray = /*#__PURE__*/function () {
    var _getInfoArray = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(refresh, options) {
      var url, serverResponse;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(!this.siteArray || refresh)) {
                _context.next = 13;
                break;
              }

              url = this.SITE_SERVICES;
              url += options ? options : "";
              _context.prev = 3;
              _context.next = 6;
              return this.data.get(url);

            case 6:
              serverResponse = _context.sent;

              if (!serverResponse.error) {
                this.siteArray = serverResponse;
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

    function getInfoArray(_x, _x2) {
      return _getInfoArray.apply(this, arguments);
    }

    return getInfoArray;
  }();

  _proto.selectSiteItem = function selectSiteItem(index) {
    if (!index || index === -1) {
      this.selectedItem = this.emptyItem();
    } else {
      try {
        this.selectedItem = this.utils.copyObject(this.siteArray[index]);
        this.editIndex = index;
      } catch (error) {
        console.log(error);
      }
    }
  };

  _proto.setSiteItem = function setSiteItem(item) {
    this.selectedItem = this.utils.copyObject(item);
  };

  _proto.emptyItem = function emptyItem() {
    var newItem = new Object();
    ;
    newItem.title = "";
    newItem.content = "";
    newItem.url = "";
    newItem.createdDate = new Date();
    newItem.expiredDate = moment__WEBPACK_IMPORTED_MODULE_4___default()(new Date()).add(1, 'years');
    newItem.image = "";
    newItem.priority = "INFO";
    newItem.itemType = "NEWS";
    newItem.sortOrder = 0;
    newItem.file = new Object();
    return newItem;
  };

  _proto.saveInfoItem = /*#__PURE__*/function () {
    var _saveInfoItem = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var _serverResponse, serverResponse;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (this.selectedItem) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return");

            case 2:
              if (this.selectedItem._id) {
                _context2.next = 10;
                break;
              }

              _context2.next = 5;
              return this.data.saveObject(this.selectedItem, this.SITE_SERVICES, "post");

            case 5:
              _serverResponse = _context2.sent;

              if (!_serverResponse.error) {
                this.selectedItem = this.utils.copyObject(_serverResponse);
                this.siteArray.push(_serverResponse);
              }

              return _context2.abrupt("return", _serverResponse);

            case 10:
              _context2.next = 12;
              return this.data.saveObject(this.selectedItem, this.SITE_SERVICES, "put");

            case 12:
              serverResponse = _context2.sent;

              if (!serverResponse.error) {
                this.selectedItem = this.utils.copyObject(serverResponse);
                this.siteArray[this.editIndex] = this.utils.copyObject(this.selectedItem, this.siteArray[this.editIndex]);
              }

              return _context2.abrupt("return", serverResponse);

            case 15:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function saveInfoItem() {
      return _saveInfoItem.apply(this, arguments);
    }

    return saveInfoItem;
  }();

  _proto.uploadFile = /*#__PURE__*/function () {
    var _uploadFile = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(files) {
      var response;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return this.data.uploadFiles(files, this.SITE_SERVICES + '/upload/' + this.selectedItem._id);

            case 2:
              response = _context3.sent;

              if (!response.error) {
                this.siteArray[this.editIndex] = this.utils.copyObject(response, this.siteArray[this.editIndex]);
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

  _proto.deleteItem = /*#__PURE__*/function () {
    var _deleteItem = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var serverResponse;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return this.data.deleteObject(this.SITE_SERVICES + '/' + this.selectedItem._id);

            case 2:
              serverResponse = _context4.sent;

              if (!serverResponse.error) {
                this.siteArray.splice(this.editIndex, 1);
                this.editIndex = -1;
              }

              return _context4.abrupt("return", serverResponse);

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function deleteItem() {
      return _deleteItem.apply(this, arguments);
    }

    return deleteItem;
  }();

  _proto.isDirty = function isDirty(obj) {
    if (this.selectedItem) {
      if (!obj) {
        var obj = this.emptyItem();
      }

      var skip = ['file'];
      return this.utils.objectsEqual(this.selectedItem, obj, skip);
    }

    return new Array();
  };

  _proto.getWeather = /*#__PURE__*/function () {
    var _getWeather = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(city) {
      var response;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              response = this.data.get('getWeather/' + city);
              return _context5.abrupt("return", response);

            case 2:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function getWeather(_x4) {
      return _getWeather.apply(this, arguments);
    }

    return getWeather;
  }();

  _proto.showCarousel = function showCarousel() {
    for (var i = 0; i < this.siteArray.length; i++) {
      if (this.siteArray[i].itemType === 'CARO') return true;
    }

    return false;
  };

  _proto.getMessageArray = /*#__PURE__*/function () {
    var _getMessageArray = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(options, refresh) {
      var url, serverResponse;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (!(!this.messageArray || refresh)) {
                _context6.next = 19;
                break;
              }

              url = this.MESSAGE_SERVICES;
              url += options ? options : "";
              _context6.prev = 3;
              _context6.next = 6;
              return this.data.get(url);

            case 6:
              serverResponse = _context6.sent;

              if (serverResponse.error) {
                _context6.next = 11;
                break;
              }

              this.messageArray = serverResponse;
              _context6.next = 13;
              break;

            case 11:
              this.data.processError(serverResponse);
              return _context6.abrupt("return", undefined);

            case 13:
              _context6.next = 19;
              break;

            case 15:
              _context6.prev = 15;
              _context6.t0 = _context6["catch"](3);
              console.log(_context6.t0);
              return _context6.abrupt("return", undefined);

            case 19:
              return _context6.abrupt("return", this.messageArray);

            case 20:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this, [[3, 15]]);
    }));

    function getMessageArray(_x5, _x6) {
      return _getMessageArray.apply(this, arguments);
    }

    return getMessageArray;
  }();

  _proto.selectMessageByKey = function selectMessageByKey(key) {
    var index = this.utils.arrayContainsValue(this.messageArray, 'key', key);

    if (index > -1) {
      return this.messageArray[index];
    }

    return null;
  };

  _proto.selectMessage = function selectMessage(index) {
    if (index === -1) {
      this.selectedMessage = this.emptyMessage();
    } else {
      try {
        this.selectedMessage = this.utils.copyObject(this.messageArray[index]);
        this.editMessageIndex = index;
      } catch (error) {
        console.log(error);
      }
    }
  };

  _proto.emptyMessage = function emptyMessage() {
    var newMessage = new Object();
    ;
    newMessage.description = "";
    newMessage.content = "";
    return newMessage;
  };

  _proto.saveMessageItem = /*#__PURE__*/function () {
    var _saveMessageItem = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
      var _serverResponse2, serverResponse;

      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              if (this.selectedMessage) {
                _context7.next = 2;
                break;
              }

              return _context7.abrupt("return");

            case 2:
              if (this.selectedMessage._id) {
                _context7.next = 10;
                break;
              }

              _context7.next = 5;
              return this.data.saveObject(this.selectedMessage, this.MESSAGE_SERVICES, "post");

            case 5:
              _serverResponse2 = _context7.sent;

              if (!_serverResponse2.error) {
                this.messageArray.push(this.selectedMessage);
              }

              return _context7.abrupt("return", _serverResponse2);

            case 10:
              _context7.next = 12;
              return this.data.saveObject(this.selectedMessage, this.MESSAGE_SERVICES, "put");

            case 12:
              serverResponse = _context7.sent;

              if (!serverResponse.error) {
                this.messageArray[this.editMessageIndex] = this.utils.copyObject(this.selectedMessage, this.messageArray[this.editMessageIndex]);
              }

              return _context7.abrupt("return", serverResponse);

            case 15:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function saveMessageItem() {
      return _saveMessageItem.apply(this, arguments);
    }

    return saveMessageItem;
  }();

  _proto.isMessageDirty = function isMessageDirty(obj) {
    if (this.selectedMessage) {
      if (!obj) {
        var obj = this.emptyItem();
      }

      return this.utils.objectsEqual(this.selectedMessage, obj);
    }

    return new Array();
  };

  _proto.deleteMessage = /*#__PURE__*/function () {
    var _deleteMessage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
      var serverResponse;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return this.data.deleteObject(this.SITE_SERVICES + '/' + this.selectedMessage._id);

            case 2:
              serverResponse = _context8.sent;

              if (!serverResponse.error) {
                this.messageArray.splice(this.editMessageIndex, 1);
                this.editMessageIndex = -1;
              }

              return _context8.abrupt("return", serverResponse);

            case 5:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    function deleteMessage() {
      return _deleteMessage.apply(this, arguments);
    }

    return deleteMessage;
  }();

  return SiteInfo;
}()) || _class);

/***/ }),

/***/ 4077:
/*!***************************************!*\
  !*** ./src/resources/data/systems.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Systems": function() { return /* binding */ Systems; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _dataServices__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dataServices */ 5086);
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/utils */ 8741);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
var _dec, _class;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }







var Systems = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_dataServices__WEBPACK_IMPORTED_MODULE_1__.DataServices, _utils_utils__WEBPACK_IMPORTED_MODULE_2__.Utils, _config_appConfig__WEBPACK_IMPORTED_MODULE_3__.AppConfig), _dec(_class = /*#__PURE__*/function () {
  function Systems(data, utils, config) {
    this.SYSTEMS_SERVICE = "systems";
    this.CHANGE_SERVICE = "change";
    this.CHANGE_CATEGORY_SERVICE = "changeCategory";
    this.data = data;
    this.utils = utils;
    this.config = config;
  }

  var _proto = Systems.prototype;

  _proto.getSystemsArray = /*#__PURE__*/function () {
    var _getSystemsArray = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(options, refresh) {
      var url, serverResponse;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(!this.systemsArray || refresh)) {
                _context.next = 14;
                break;
              }

              url = this.SYSTEMS_SERVICE;
              url += options ? options : "";
              _context.prev = 3;
              _context.next = 6;
              return this.data.get(url);

            case 6:
              serverResponse = _context.sent;

              if (!serverResponse.error) {
                this.systemsArray = serverResponse;
              }

              _context.next = 14;
              break;

            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](3);
              console.log(_context.t0);
              this.systemsArray = undefined;

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[3, 10]]);
    }));

    function getSystemsArray(_x, _x2) {
      return _getSystemsArray.apply(this, arguments);
    }

    return getSystemsArray;
  }();

  _proto.getSystem = /*#__PURE__*/function () {
    var _getSystem = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(index) {
      var id, serverResponse;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(index >= 0)) {
                _context2.next = 7;
                break;
              }

              id = this.systemsArray[index]._id;
              _context2.next = 4;
              return this.data.get(this.SYSTEMS_SERVICE + "/" + id);

            case 4:
              serverResponse = _context2.sent;

              if (!serverResponse.error) {
                this.selectedSystem = serverResponse;
                this.systemsArray[index] = this.utils.copyObject(this.selectedSystem);
              }

              return _context2.abrupt("return", serverResponse);

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function getSystem(_x3) {
      return _getSystem.apply(this, arguments);
    }

    return getSystem;
  }();

  _proto.getConfiguredProductSystems = /*#__PURE__*/function () {
    var _getConfiguredProductSystems = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(sids) {
      var serverResponse;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!sids) {
                _context3.next = 5;
                break;
              }

              _context3.next = 3;
              return this.data.get(this.SYSTEMS_SERVICE + "/product/" + sids);

            case 3:
              serverResponse = _context3.sent;
              return _context3.abrupt("return", serverResponse);

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function getConfiguredProductSystems(_x4) {
      return _getConfiguredProductSystems.apply(this, arguments);
    }

    return getConfiguredProductSystems;
  }();

  _proto.getAPJConfiguredProductSystems = /*#__PURE__*/function () {
    var _getAPJConfiguredProductSystems = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(sids) {
      var serverResponse;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (!sids) {
                _context4.next = 5;
                break;
              }

              _context4.next = 3;
              return this.data.get('apj/' + this.SYSTEMS_SERVICE + "/product/" + sids);

            case 3:
              serverResponse = _context4.sent;
              return _context4.abrupt("return", serverResponse);

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function getAPJConfiguredProductSystems(_x5) {
      return _getAPJConfiguredProductSystems.apply(this, arguments);
    }

    return getAPJConfiguredProductSystems;
  }();

  _proto.selectSystem = function selectSystem(index) {
    if (!index && index != 0) {
      this.selectedSystem = this.emptySystem();
      this.newSystem = true;
    } else {
      try {
        this.selectedSystem = this.utils.copyObject(this.systemsArray[index]);
        this.newSystem = false;
        this.editIndex = index;
      } catch (error) {
        console.log(error);
        this.selectedSystem = this.emptySystem();
        this.newSystem = true;
      }
    }
  };

  _proto.selectedSystemFromId = function selectedSystemFromId(id) {
    this.selectedSystem = null;

    for (var i = 0, x = this.systemsArray.length; i < x; i++) {
      if (this.systemsArray[i]._id === id) {
        this.selectedSystem = this.utils.copyObject(this.systemsArray[i]);
        this.editIndex = i;
        break;
      }
    }

    ;
  };

  _proto.selectedProductSystemFromId = function selectedProductSystemFromId(id, systems) {
    this.selectedSystem = null;

    for (var i = 0, x = systems.length; i < x; i++) {
      if (systems[i]._id === id) {
        this.selectedSystem = this.utils.copyObject(systems[i]);
        this.editIndex = i;
        break;
      }
    }

    ;
  };

  _proto.setSelectedSystem = function setSelectedSystem(system) {
    this.selectedSystem = this.utils.copyObject(system);
  };

  _proto.emptySystem = function emptySystem() {
    var newSystemObj = {};
    newSystemObj.sid = "";
    newSystemObj.active = true;
    newSystemObj.description = "";
    newSystemObj.server = "";
    newSystemObj.instance = "";
    newSystemObj.its = "";
    newSystemObj.terms = "";
    newSystemObj.idsAvailable = 0;
    newSystemObj.productId = new Array();
    newSystemObj.clients = [];
    return newSystemObj;
  };

  _proto.saveSystem = /*#__PURE__*/function () {
    var _saveSystem = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      var _serverResponse, serverResponse;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (this.selectedSystem) {
                _context5.next = 2;
                break;
              }

              return _context5.abrupt("return");

            case 2:
              if (this.selectedSystem._id) {
                _context5.next = 10;
                break;
              }

              _context5.next = 5;
              return this.data.saveObject(this.selectedSystem, this.SYSTEMS_SERVICE, "post");

            case 5:
              _serverResponse = _context5.sent;

              if (!_serverResponse.error) {
                this.systemsArray.push(_serverResponse);
              } else {
                this.data.processError(_serverResponse, "Error updating the system.<br>");
              }

              return _context5.abrupt("return", _serverResponse);

            case 10:
              _context5.next = 12;
              return this.data.saveObject(this.selectedSystem, this.SYSTEMS_SERVICE, "put");

            case 12:
              serverResponse = _context5.sent;

              if (!serverResponse.error) {
                this.selectedSystem = serverResponse;
                this.systemsArray[this.editIndex] = this.utils.copyObject(this.selectedSystem);
              } else {
                this.data.processError(serverResponse, "Error updating the system.<br>");
              }

              return _context5.abrupt("return", serverResponse);

            case 15:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function saveSystem() {
      return _saveSystem.apply(this, arguments);
    }

    return saveSystem;
  }();

  _proto.saveClient = /*#__PURE__*/function () {
    var _saveClient = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(clientToSave) {
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return this.data.saveObject(clientToSave, this.SYSTEMS_SERVICE + "/client", "put");

            case 2:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function saveClient(_x6) {
      return _saveClient.apply(this, arguments);
    }

    return saveClient;
  }();

  _proto.deleteSystem = /*#__PURE__*/function () {
    var _deleteSystem = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
      var serverResponse;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return this.data.deleteObject(this.SYSTEMS_SERVICE + '/' + this.selectedSystem._id);

            case 2:
              serverResponse = _context7.sent;

              if (!serverResponse.error) {
                this.systemsArray.splice(this.editIndex, 1);
                this.editIndex = -1;
              } else {
                this.data.processError(serverResponse, "Error deleting the system.<br>");
              }

              return _context7.abrupt("return", serverResponse);

            case 5:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function deleteSystem() {
      return _deleteSystem.apply(this, arguments);
    }

    return deleteSystem;
  }();

  _proto.saveProductChanges = /*#__PURE__*/function () {
    var _saveProductChanges = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(obj) {
      var response;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return this.data.saveObject(obj, this.SYSTEMS_SERVICE + '/product/', "put");

            case 2:
              response = _context8.sent;
              return _context8.abrupt("return", response);

            case 4:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    function saveProductChanges(_x7) {
      return _saveProductChanges.apply(this, arguments);
    }

    return saveProductChanges;
  }();

  _proto.isDirty = function isDirty(obj, skip) {
    if (this.selectedSystem) {
      if (!obj) {
        var obj = this.emptySystem();
      }

      return this.utils.objectsEqual(this.selectedSystem, obj, skip);
    }

    return new Array();
  };

  _proto.deleteAllClients = /*#__PURE__*/function () {
    var _deleteAllClients = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              if (this.selectedSystem._id) {
                this.selectedSystem.clients = new Array();
              }

            case 1:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, this);
    }));

    function deleteAllClients() {
      return _deleteAllClients.apply(this, arguments);
    }

    return deleteAllClients;
  }();

  _proto.generateClients = function generateClients(start, end, status, product, interval, idsAvailable) {
    if (!this.selectedSystem) {
      return {
        error: "No system selected."
      };
    }

    this.selectedSystem.clients = this.selectedSystem.clients || new Array();
    var lastClientIndex = this.selectedSystem.clients.length - 1;

    if (start > 0 && end > 0 && end >= start) {
      for (var i = start; i <= end; i += interval) {
        if (this._findClient(i, 0, lastClientIndex) < 0) {
          this.selectedSystem.clients.push(this.emptyClient(i, status, product, idsAvailable));
        }
      }

      return true;
    } else {
      return {
        error: "Enter valid start and end client numbers"
      };
    }
  };

  _proto.refreshClients = function refreshClients(status, products) {
    var _this = this;

    for (var i = 0, x = this.selectedSystem.clients.length; i < x; i++) {
      var aProduct = {
        firstAllowableID: 1,
        _id: null
      };
      this.selectedSystem.clients.forEach(function (item) {
        if (item.productId !== aProduct._id) {
          for (var j = 0; j < products.length; j++) {
            if (products[j]._id === item.productId) {
              aProduct = products[j];
              _this.selectedSystem.clients[i] = _this.emptyClient(_this.selectedSystem.clients[i].client, status, aProduct, aProduct.idsAvailable);
              break;
            }
          }
        } else {
          _this.selectedSystem.clients[i] = _this.emptyClient(_this.selectedSystem.clients[i].client, status, aProduct, aProduct.idsAvailable);
        }
      });
    }
  };

  _proto._findClient = function _findClient(client, start, end) {
    if (end >= 0) {
      for (var i = start; i <= end; i++) {
        if (parseInt(this.selectedSystem.clients[i].client) === client) return i;
      }
    }

    return -1;
  };

  _proto.selectClient = function selectClient(index) {
    if (index != undefined) {
      this.selectedClient = this.utils.copyObject(this.selectedSystem.clients[index]);
      this.clientIndex = index;
    }
  };

  _proto.selectClientFromIDNoSystem = function selectClientFromIDNoSystem(systemId, clientId) {
    console.log('The wrong function');
    this.selectedClient = null;

    for (var i = 0, x = this.systemsArray.length; i < x; i++) {
      if (this.systemsArray[i]._id === systemId) {
        for (var j = 0; j < this.systemsArray[i].clients.length; j++) {
          if (this.systemsArray[i].clients[j].client == clientId) {
            this.selectedClient = this.utils.copyObject(this.systemsArray[i].clients[j]);
            this.clientIndex = j;
            break;
          }
        }
      }
    }
  };

  _proto.selectClientFromIDNoSystem = function selectClientFromIDNoSystem(systemId, clientId, systems) {
    console.log('Using the right one');
    this.selectedClient = null;

    for (var i = 0, x = systems.length; i < x; i++) {
      if (systems[i]._id === systemId) {
        for (var j = 0; j < systems[i].clients.length; j++) {
          if (systems[i].clients[j].client == clientId) {
            this.selectedClient = this.utils.copyObject(systems[i].clients[j]);
            this.clientIndex = j;
            break;
          }
        }
      }
    }
  };

  _proto.selectClientFromID = function selectClientFromID(systemId, clientId) {
    this.selectedClient = null;

    for (var i = 0, x = this.systemsArray.length; i < x; i++) {
      if (this.systemsArray[i]._id === systemId) {
        this.selectedSystem = this.utils.copyObject(this.systemsArray[i]);

        for (var j = 0; j < this.systemsArray[i].clients.length; j++) {
          if (this.systemsArray[i].clients[j].client == clientId) {
            this.selectedClient = this.utils.copyObject(this.systemsArray[i].clients[j]);
            this.clientIndex = j;
            break;
          }
        }
      }
    }
  };

  _proto.selectClientFromNumber = function selectClientFromNumber(systemId, client) {
    this.selectedClient = null;

    for (var i = 0, x = this.systemsArray.length; i < x; i++) {
      if (this.systemsArray[i]._id === systemId) {
        this.selectedSystem = this.utils.copyObject(this.systemsArray[i]);

        for (var j = 0; j < this.systemsArray[i].clients.length; j++) {
          if (this.systemsArray[i].clients[j].client === client) {
            this.selectedClient = this.utils.copyObject(this.systemsArray[i].clients[j]);
            this.clientIndex = j;
            break;
          }
        }
      }
    }
  };

  _proto.emptyClient = function emptyClient(clientNo, status, product, idsAvailable) {
    var obj = new Object();
    obj.client = clientNo;
    obj.clientStatus = status;
    obj.systemId = this.selectedSystem._id;
    obj.idsAvailable = product.idsAvailable;
    obj.assignments = new Array();
    obj.createdDate = new Date();
    obj.lastIdAssigned = 0;
    obj.lastFacIdAssigned = 0;
    obj.firstFacIdAssigned = 0;
    obj.manual = false;
    obj.productId = product ? product._id : null;
    obj.firstAllowableID = product.firstAllowableId ? parseInt(product.firstAllowableId) : 1;
    return obj;
  };

  _proto.selectClient = function selectClient(index) {
    if (index != undefined) {
      this.selectedClient = this.utils.copyObject(this.selectedSystem.clients[index]);
      this.clientIndex = index;
    }
  }
  /*****************************************************************************************************
   * Find the client in a systems client list and update it, used by client request assignment
   ****************************************************************************************************/
  ;

  _proto.updateClient = function updateClient(client, systemId) {
    if (!systemId) {
      for (var i = 0, x = this.systemsArray.length; i < x; i++) {
        if (this.systemsArray[i]._id === client.systemId) {
          for (var j = 0; j < this.systemsArray[i].clients.length; j++) {
            if (this.systemsArray[i].clients[j].client == client.client) {
              this.systemsArray[i].clients[j] = this.utils.copyObject(client);
              break;
            }
          }
        }
      }

      ;
    } else {
      for (var j = 0; j < this.systemsArray[i].clients.length; j++) {
        if (this.systemsArray[i].clients[j].client == client.client) {
          this.systemsArray[i].clients[j] = this.utils.copyObject(client);
          break;
        }
      }
    }
  };

  _proto.getAssignmentDetails = /*#__PURE__*/function () {
    var _getAssignmentDetails = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(id) {
      var url, serverResponse;
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              url = "/serverAssignments/" + id;
              _context10.next = 3;
              return this.data.get(url);

            case 3:
              serverResponse = _context10.sent;

              if (!serverResponse.error) {
                this.assignmentDetailsArray = serverResponse.sort(function (a, b) {
                  return a.lastName < b.lastName ? -1 : 1;
                });
              } else {
                this.data.processError(serverResponse);
              }

            case 5:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, this);
    }));

    function getAssignmentDetails(_x8) {
      return _getAssignmentDetails.apply(this, arguments);
    }

    return getAssignmentDetails;
  }() //Change
  ;

  _proto.getChangeArray =
  /*#__PURE__*/
  function () {
    var _getChangeArray = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(options, refresh) {
      var url, serverResponse;
      return regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              if (!(!this.changeArray || refresh)) {
                _context11.next = 14;
                break;
              }

              url = this.CHANGE_SERVICE;
              url += options ? options : "";
              _context11.prev = 3;
              _context11.next = 6;
              return this.data.get(url);

            case 6:
              serverResponse = _context11.sent;

              if (!serverResponse.error) {
                this.changeArray = serverResponse;
              }

              _context11.next = 14;
              break;

            case 10:
              _context11.prev = 10;
              _context11.t0 = _context11["catch"](3);
              console.log(_context11.t0);
              this.changeArray = undefined;

            case 14:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11, this, [[3, 10]]);
    }));

    function getChangeArray(_x9, _x10) {
      return _getChangeArray.apply(this, arguments);
    }

    return getChangeArray;
  }();

  _proto.getChange = /*#__PURE__*/function () {
    var _getChange = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(index) {
      var id, serverResponse;
      return regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              if (!(index >= 0)) {
                _context12.next = 7;
                break;
              }

              id = this.changeArray[index]._id;
              _context12.next = 4;
              return this.data.get(this.CHANGE_SERVICE + "/" + id);

            case 4:
              serverResponse = _context12.sent;

              if (!serverResponse.error) {
                this.selectedChange = serverResponse;
                this.changeArray[index] = this.utils.copyObject(this.selectedChange);
              }

              return _context12.abrupt("return", serverResponse);

            case 7:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12, this);
    }));

    function getChange(_x11) {
      return _getChange.apply(this, arguments);
    }

    return getChange;
  }();

  _proto.selectChange = function selectChange(index) {
    if (!index && index != 0) {
      this.selectedChange = this.emptyChange();
    } else {
      try {
        this.selectedChange = this.utils.copyObject(this.changeArray[index]);
        this.changeIndex = index;
      } catch (error) {
        console.log(error);
        this.selectedChange = this.emptyChange();
      }
    }
  };

  _proto.emptyChange = function emptyChange() {
    var newObj = {};
    newObj.category = "";
    newObj.content = "";
    return newObj;
  };

  _proto.saveChange = /*#__PURE__*/function () {
    var _saveChange = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
      var _serverResponse2, serverResponse;

      return regeneratorRuntime.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              if (this.selectedChange) {
                _context13.next = 2;
                break;
              }

              return _context13.abrupt("return");

            case 2:
              if (this.selectedChange._id) {
                _context13.next = 10;
                break;
              }

              _context13.next = 5;
              return this.data.saveObject(this.selectedChange, this.CHANGE_SERVICE, "post");

            case 5:
              _serverResponse2 = _context13.sent;

              if (!_serverResponse2.error) {
                this.changeArray.push(_serverResponse2);
              } else {
                this.data.processError(_serverResponse2, "Error updating the change.<br>");
              }

              return _context13.abrupt("return", _serverResponse2);

            case 10:
              _context13.next = 12;
              return this.data.saveObject(this.selectedChange, this.CHANGE_SERVICE, "put");

            case 12:
              serverResponse = _context13.sent;

              if (!serverResponse.error) {
                this.selectedChange = serverResponse;
                this.changeArray[this.changeIndex] = this.utils.copyObject(this.selectedChange);
              } else {
                this.data.processError(serverResponse, "Error updating the change .<br>");
              }

              return _context13.abrupt("return", serverResponse);

            case 15:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13, this);
    }));

    function saveChange() {
      return _saveChange.apply(this, arguments);
    }

    return saveChange;
  }();

  _proto.deleteChange = /*#__PURE__*/function () {
    var _deleteChange = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
      var serverResponse;
      return regeneratorRuntime.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              _context14.next = 2;
              return this.data.deleteObject(this.CHANGE_SERVICE + '/' + this.selectedChange._id);

            case 2:
              serverResponse = _context14.sent;

              if (!serverResponse.error) {
                this.changeArray.splice(this.editIndex, 1);
                this.editIndex = -1;
              } else {
                this.data.processError(serverResponse, "Error deleting the change.<br>");
              }

              return _context14.abrupt("return", serverResponse);

            case 5:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14, this);
    }));

    function deleteChange() {
      return _deleteChange.apply(this, arguments);
    }

    return deleteChange;
  }() //Change Category
  ;

  _proto.getChangeCategoryArray =
  /*#__PURE__*/
  function () {
    var _getChangeCategoryArray = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(options, refresh) {
      var url, serverResponse;
      return regeneratorRuntime.wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              if (!(!this.changeCategoryArray || refresh)) {
                _context15.next = 14;
                break;
              }

              url = this.CHANGE_CATEGORY_SERVICE;
              url += options ? options : "";
              _context15.prev = 3;
              _context15.next = 6;
              return this.data.get(url);

            case 6:
              serverResponse = _context15.sent;

              if (!serverResponse.error) {
                this.changeCategoryArray = serverResponse;
              }

              _context15.next = 14;
              break;

            case 10:
              _context15.prev = 10;
              _context15.t0 = _context15["catch"](3);
              console.log(_context15.t0);
              this.changeCategoryArray = undefined;

            case 14:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15, this, [[3, 10]]);
    }));

    function getChangeCategoryArray(_x12, _x13) {
      return _getChangeCategoryArray.apply(this, arguments);
    }

    return getChangeCategoryArray;
  }();

  _proto.getChangeCategory = /*#__PURE__*/function () {
    var _getChangeCategory = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(index) {
      var id, serverResponse;
      return regeneratorRuntime.wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              if (!(index >= 0)) {
                _context16.next = 7;
                break;
              }

              id = this.changeCategoryArray[index]._id;
              _context16.next = 4;
              return this.data.get(this.CHANGE_CATEGORY_SERVICE + "/" + id);

            case 4:
              serverResponse = _context16.sent;

              if (!serverResponse.error) {
                this.selectedChangeCategory = serverResponse;
                this.changeCategoryArray[index] = this.utils.copyObject(this.selectedChangeCategory);
              }

              return _context16.abrupt("return", serverResponse);

            case 7:
            case "end":
              return _context16.stop();
          }
        }
      }, _callee16, this);
    }));

    function getChangeCategory(_x14) {
      return _getChangeCategory.apply(this, arguments);
    }

    return getChangeCategory;
  }();

  _proto.selectChangeCategory = function selectChangeCategory(index) {
    if (!index && index != 0) {
      this.selectedChangeCategory = this.emptyChangeCategory();
    } else {
      try {
        this.selectedChangeCategory = this.utils.copyObject(this.changeCategoryArray[index]);
        this.categoryIndex = index;
      } catch (error) {
        console.log(error);
        this.selectedChangeCategory = this.emptyChangeCategory();
      }
    }
  };

  _proto.selectChangeCategoryByCategory = function selectChangeCategoryByCategory(category) {
    var _this2 = this;

    this.changeCategoryArray.forEach(function (item, index) {
      if (item.category == category) {
        _this2.selectedChangeCategory = _this2.utils.copyObject(item);
        _this2.categoryIndex = index;
      }
    });
  };

  _proto.emptyChangeCategory = function emptyChangeCategory() {
    var newCategoryObj = {};
    newCategoryObj.category = "";
    return newCategoryObj;
  };

  _proto.categortInUse = /*#__PURE__*/function () {
    var _categortInUse = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17() {
      var response;
      return regeneratorRuntime.wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              _context17.next = 2;
              return this.data.get(this.CHANGE_CATEGORY_SERVICE + "?filter=category|eq|" + this.selectedChangeCategory.category);

            case 2:
              response = _context17.sent;

              if (response.error) {
                _context17.next = 7;
                break;
              }

              return _context17.abrupt("return", true);

            case 7:
              return _context17.abrupt("return", false);

            case 8:
            case "end":
              return _context17.stop();
          }
        }
      }, _callee17, this);
    }));

    function categortInUse() {
      return _categortInUse.apply(this, arguments);
    }

    return categortInUse;
  }();

  _proto.saveChangeCategory = /*#__PURE__*/function () {
    var _saveChangeCategory = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18() {
      var _serverResponse3, serverResponse;

      return regeneratorRuntime.wrap(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              if (this.selectedChangeCategory) {
                _context18.next = 2;
                break;
              }

              return _context18.abrupt("return");

            case 2:
              if (this.selectedChangeCategory._id) {
                _context18.next = 10;
                break;
              }

              _context18.next = 5;
              return this.data.saveObject(this.selectedChangeCategory, this.CHANGE_CATEGORY_SERVICE, "post");

            case 5:
              _serverResponse3 = _context18.sent;

              if (!_serverResponse3.error) {
                this.changeCategoryArray.push(_serverResponse3);
              } else {
                this.data.processError(_serverResponse3, "Error updating the change category.<br>");
              }

              return _context18.abrupt("return", _serverResponse3);

            case 10:
              _context18.next = 12;
              return this.data.saveObject(this.selectedChangeCategory, this.CHANGE_CATEGORY_SERVICE, "put");

            case 12:
              serverResponse = _context18.sent;

              if (!serverResponse.error) {
                this.selectedChangeCategory = serverResponse;
                this.changeCategoryArray[this.categoryIndex] = this.utils.copyObject(this.selectedChangeCategory);
              } else {
                this.data.processError(serverResponse, "Error updating the change category.<br>");
              }

              return _context18.abrupt("return", serverResponse);

            case 15:
            case "end":
              return _context18.stop();
          }
        }
      }, _callee18, this);
    }));

    function saveChangeCategory() {
      return _saveChangeCategory.apply(this, arguments);
    }

    return saveChangeCategory;
  }();

  _proto.deleteChangeCategory = /*#__PURE__*/function () {
    var _deleteChangeCategory = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19() {
      var serverResponse;
      return regeneratorRuntime.wrap(function _callee19$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              _context19.next = 2;
              return this.data.deleteObject(this.CHANGE_CATEGORY_SERVICE + '/' + this.selectedChangeCategory._id);

            case 2:
              serverResponse = _context19.sent;

              if (!serverResponse.error) {
                this.changeCategoryArray.splice(this.editIndex, 1);
                this.editIndex = -1;
              } else {
                this.data.processError(serverResponse, "Error deleting the change category.<br>");
              }

              return _context19.abrupt("return", serverResponse);

            case 5:
            case "end":
              return _context19.stop();
          }
        }
      }, _callee19, this);
    }));

    function deleteChangeCategory() {
      return _deleteChangeCategory.apply(this, arguments);
    }

    return deleteChangeCategory;
  }();

  return Systems;
}()) || _class);

/***/ })

}]);
//# sourceMappingURL=app-f524a2c8.c2f6f034a062b3d7f766.bundle.js.map