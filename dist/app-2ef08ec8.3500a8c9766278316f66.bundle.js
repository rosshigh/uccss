"use strict";
(self["webpackChunkclient"] = self["webpackChunkclient"] || []).push([["app-2ef08ec8"],{

/***/ "main":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "configure": function() { return /* binding */ configure; }
/* harmony export */ });
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! regenerator-runtime/runtime */ 5666);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _config_environment_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config/environment.json */ 1407);
/* harmony import */ var aurelia_pal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! aurelia-pal */ 1015);



function configure(aurelia) {
  aurelia.use.standardConfiguration().plugin('aurelia-dialog').plugin('au-table').feature('resources/index');
  aurelia.use.developmentLogging(_config_environment_json__WEBPACK_IMPORTED_MODULE_1__.debug ? 'debug' : 'warn');

  if (_config_environment_json__WEBPACK_IMPORTED_MODULE_1__.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  aurelia.start().then(function () {
    return aurelia.setRoot('app');
  });
}

/***/ }),

/***/ "modules/admin/Customers/bulkEmails":
/*!***************************************************!*\
  !*** ./src/modules/admin/Customers/bulkEmails.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BulkEmails": function() { return /* binding */ BulkEmails; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../resources/utils/dataTable */ 6847);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../config/appConfig */ 1666);
/* harmony import */ var _resources_utils_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../resources/utils/utils */ 8741);
/* harmony import */ var _resources_data_people__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../resources/data/people */ 353);
/* harmony import */ var _resources_data_is4ua__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../resources/data/is4ua */ 5175);
/* harmony import */ var _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../resources/dialogs/common-dialogs */ 6545);
/* harmony import */ var _resources_utils_validation__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../resources/utils/validation */ 2824);
var _dec, _class;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }









var BulkEmails = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_1__.DataTable, _config_appConfig__WEBPACK_IMPORTED_MODULE_2__.AppConfig, _resources_data_people__WEBPACK_IMPORTED_MODULE_4__.People, _resources_utils_utils__WEBPACK_IMPORTED_MODULE_3__.Utils, _resources_data_is4ua__WEBPACK_IMPORTED_MODULE_5__.is4ua, _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_6__.CommonDialogs, _resources_utils_validation__WEBPACK_IMPORTED_MODULE_7__["default"]), _dec(_class = /*#__PURE__*/function () {
  function BulkEmails(datatable, config, people, utils, is4ua, dialog, validation) {
    this.composeEmailPanel = false;
    this.subject = "";
    this.MESSAGE = "";
    this.spinnerHTML = "";
    this.email = new Object();
    this.roleFilterValue = new Array();
    this.roleExcludeFilterValue = new Array();
    this.toolbar = [['style', ['style', 'bold', 'italic', 'underline', 'clear']], ['color', ['color']], ['font', ['strikethrough', 'superscript', 'subscript']], ['layout', ['ul', 'ol', 'paragraph']], ['insert', ['link', 'table', 'hello']], ['misc', ['undo', 'redo', 'fullscreen', 'codeview']]];
    this.dataTable = datatable;
    this.dataTable.initialize(this);
    this.config = config;
    this.utils = utils;
    this.people = people;
    this.is4ua = is4ua;
    this.dialog = dialog;
    this.validation = validation;
    this.validation.initialize(this);
    this.userObj = JSON.parse(sessionStorage.getItem('user'));
  }

  var _proto = BulkEmails.prototype;

  _proto.activate = /*#__PURE__*/function () {
    var _activate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              this.initialLoaded = false;

            case 1:
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

  _proto.filterActive = /*#__PURE__*/function () {
    var _filterActive = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              this._clearFilters();

              _context2.next = 3;
              return this.people.getPeopleBulkEmailArray('?order=lastName&filter=personStatus|eq|' + this.activeFilterValue, true);

            case 3:
              this.dataTable.updateArray(this.people.peopleBulkEmailArray);

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function filterActive() {
      return _filterActive.apply(this, arguments);
    }

    return filterActive;
  }();

  _proto.attached = /*#__PURE__*/function () {
    var _attached = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var _this = this;

      var responses;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              $('[data-toggle="tooltip"]').tooltip();
              $('#loading').show();
              _context3.next = 4;
              return Promise.all([this.people.getPeopleBulkEmailArray('?order=lastName&filter=personStatus|eq|01'), this.people.getInstitutionsArray('?order=name', true), this.is4ua.loadIs4ua(), this.config.getConfig()]);

            case 4:
              responses = _context3.sent;
              this.activeFilterValue = "01";
              this.filteredArray = this.config.ROLES;
              this.dataTable.updateArray(this.people.peopleBulkEmailArray);
              this.roleSelect = new Array();
              this.config.ROLES.forEach(function (item) {
                _this.roleSelect.push({
                  code: item.role,
                  description: item.role
                });
              });
              $('#loading').hide();
              this.institutionStatusValue = '01';
              this.dataTable.filterList(this.institutionStatusValue, {
                type: 'value',
                filter: 'institutionStatusFilter',
                collectionProperty: 'institutionId.institutionStatus',
                displayProperty: 'institutionId.institutionStatus',
                matchProperty: '',
                compare: 'match'
              });
              this.initialLoaded = true;

            case 14:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function attached() {
      return _attached.apply(this, arguments);
    }

    return attached;
  }();

  _proto.refresh = /*#__PURE__*/function () {
    var _refresh = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              this._cleanUpFilters(); // this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";


              $('#loading').show();
              _context4.next = 4;
              return this.people.getPeopleBulkEmailArray('?order=lastName&filter=personStatus|eq|01', true);

            case 4:
              this.dataTable.updateArray(this.people.peopleBulkEmailArray);
              // this.spinnerHTML = "";
              $('#loading').hide();

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

  _proto._clearFilters = function _clearFilters() {
    this.CustomerFilter = ""; // this.activeFilterValue = "";

    this.roleFilterValue = new Array();
    this.roleExcludeFilterValue = new Array();
    this.institutionFilterValue = "";
    this.institutionStatusValue = "";
    this.institutionTypeFilter = "";
    this.memberTypeFilterValue = "";
    this.countryFilterValue = "";
    this.regionFilterValue = "";
    $(".filter-option-inner-inner").html('Nothing selected');
    this.dataTable.updateArray(this.people.peopleBulkEmailArray);
  };

  _proto.composeEmail = function composeEmail() {
    this.email = {
      MESSAGE: "",
      INSTRUCTIONS: this.config.HELP_TICKET_INSTRUCTIONS,
      subject: ""
    };
    this.composeEmailPanel = true;
  };

  _proto.cancel = function cancel() {
    this.composeEmailPanel = false;
    this.email = {
      MESSAGE: "",
      INSTRUCTIONS: this.config.HELP_TICKET_INSTRUCTIONS,
      subject: ""
    }; // this.email.emailMessage = "";
    // this.email.subject = "";
  };

  _proto.sendBulkEmail = function sendBulkEmail() {
    var _this2 = this;

    if (this.email.MESSAGE === "" || this.email.subject === "") {
      this.utils.showNotification("Enter a subject and messsage", 'warning');
      return;
    }

    if (this.dataTable.baseArray.length === 0) {
      this.utils.showNotification("You must include some recipients", 'warning');
      return;
    }

    return this.dialog.showMessage("Are you sure you want to send the email to these recipients?", "Confirm Send", ['Yes', 'No']).whenClosed(function (response) {
      if (response.wasCancelled) {
        okToProcess = false;
      } else {
        _this2.sendTheBulkEmail();
      }
    });
  };

  _proto.sendTheBulkEmail = function sendTheBulkEmail() {
    var recipients = new Array();
    this.dataTable.baseArray.forEach(function (item) {
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
  };

  _proto.downloadInstExcel = function downloadInstExcel() {
    var csvContent = "data:text/csv;charset=utf-8;,First Name,FullName,Last Name,Email,Phone,City,Region,Country,Roles,Institution\r\n";
    this.dataTable.baseArray.forEach(function (item, index) {
      csvContent += item.firstName + "," + item.lastName.replace(',', ' ') + "," + item.firstName + " " + item.lastName.replace(',', ' ') + "," + item.email + "," + item.phone + "," + item.institutionId.city + "," + item.institutionId.region + "," + item.institutionId.country + "," + item.roles.join(':') + "," + item.institutionId.name;
      csvContent += "\r\n";
    });
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "bulkEmail.csv");
    document.body.appendChild(link); // Required for FF

    link.click();
  };

  _proto.regionCustomFilter = function regionCustomFilter(value, item, context) {
    if (item.institutionId && item.institutionId.region) {
      return item.institutionId.region.toUpperCase().indexOf(value.toUpperCase()) > -1;
    }

    return false;
  };

  _proto.countryCustomFilter = function countryCustomFilter(value, item, context) {
    if (item.institutionId && item.institutionId.country) {
      return item.institutionId.country.toUpperCase().indexOf(value.toUpperCase()) > -1;
    }

    return false;
  };

  _proto.roleCustomFilter = function roleCustomFilter(value, item, context) {
    var keep = false;

    if (item.roles && item.roles.length > 0 && value) {
      for (var i = 0; i < item.roles.length; i++) {
        for (var j = 0; j < value.length; j++) {
          if (item.roles[i].toUpperCase().indexOf(value[j].toUpperCase()) > -1) keep = true;
        }
      }
    }

    return keep;
  };

  _proto.roleExcludeCustomFilter = function roleExcludeCustomFilter(value, item, context) {
    var keep = true;

    if (item.roles && item.roles.length > 0 && value) {
      for (var i = 0; i < item.roles.length; i++) {
        for (var j = 0; j < value.length; j++) {
          if (item.roles[i].toUpperCase().indexOf(value[j].toUpperCase()) > -1) keep = false;
        }
      }
    }

    return keep;
  };

  _proto.memberTypeCustomFilter = function memberTypeCustomFilter(value, item, context) {
    var keep = true;

    if (item.instiutionId.memberType && value && item.instiutionId.memberType.indexOf(valu)) {}

    return keep;
  };

  _proto.customerCustomFilter = function customerCustomFilter(value, item, context) {
    return item.fullName.toUpperCase().indexOf(value.toUpperCase()) > -1;
  };

  _proto.institutionCustomFilter = function institutionCustomFilter(value, item, context) {
    return item.institutionId && item.institutionId.name.toUpperCase().indexOf(value.toUpperCase()) > -1;
  };

  _proto.filterRoles = function filterRoles() {
    this.dataTable.filterList(this.roleFilterValue, {
      type: 'custom',
      filter: this.roleCustomFilter,
      compare: 'custom'
    });
  };

  _proto.excludeRoles = function excludeRoles() {
    this.dataTable.filterList(this.roleExcludeFilterValue, {
      type: 'custom',
      filter: this.roleExcludeCustomFilter,
      compare: 'custom'
    });
  };

  return BulkEmails;
}()) || _class);

/***/ }),

/***/ "modules/admin/Customers/customers":
/*!**************************************************!*\
  !*** ./src/modules/admin/Customers/customers.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Customers": function() { return /* binding */ Customers; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var aurelia_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-router */ 6433);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../config/appConfig */ 1666);
var _dec, _class;




var Customers = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(aurelia_router__WEBPACK_IMPORTED_MODULE_1__.Router, _config_appConfig__WEBPACK_IMPORTED_MODULE_2__.AppConfig), _dec(_class = /*#__PURE__*/function () {
  function Customers(router, config) {
    this.title = "Customers";
    this.tabs = [{
      id: 'editPeople',
      label: 'People'
    }, {
      id: 'editInstitutions',
      label: 'Institutions'
    }];
    this.tabPath = "modules/admin/customers/";
    this.router = router;
    this.config = config;
  }

  var _proto = Customers.prototype;

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
      route: ['', 'editPeople'],
      moduleId: './editPeople',
      settings: {
        auth: true,
        roles: []
      },
      nav: true,
      name: 'editPeople',
      title: "People"
    }, {
      route: 'editInstitutions',
      moduleId: './editInstitutions',
      settings: {
        auth: true,
        roles: []
      },
      nav: true,
      name: 'editInstitutions',
      title: 'Institutions'
    }, {
      route: 'bulkEmails',
      moduleId: './bulkEmails',
      settings: {
        auth: true,
        roles: []
      },
      nav: true,
      name: 'bulkEmails',
      title: 'Bulk Emails'
    }]);
    this.router = router;
  };

  return Customers;
}()) || _class);

/***/ }),

/***/ "modules/admin/Customers/editInstitutions":
/*!*********************************************************!*\
  !*** ./src/modules/admin/Customers/editInstitutions.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EditInstitutions": function() { return /* binding */ EditInstitutions; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../resources/utils/dataTable */ 6847);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../config/appConfig */ 1666);
/* harmony import */ var _resources_utils_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../resources/utils/utils */ 8741);
/* harmony import */ var _resources_data_people__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../resources/data/people */ 353);
/* harmony import */ var _resources_data_is4ua__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../resources/data/is4ua */ 5175);
/* harmony import */ var _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../resources/dialogs/common-dialogs */ 6545);
/* harmony import */ var _resources_utils_validation__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../resources/utils/validation */ 2824);
var _dec, _class;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }









var EditInstitutions = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_1__.DataTable, _config_appConfig__WEBPACK_IMPORTED_MODULE_2__.AppConfig, _resources_data_people__WEBPACK_IMPORTED_MODULE_4__.People, _resources_utils_utils__WEBPACK_IMPORTED_MODULE_3__.Utils, _resources_data_is4ua__WEBPACK_IMPORTED_MODULE_5__.is4ua, _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_6__.CommonDialogs, _resources_utils_validation__WEBPACK_IMPORTED_MODULE_7__["default"]), _dec(_class = /*#__PURE__*/function () {
  // spinnerHTML = "";
  // tabs = [ {id: 'instAddress', title: 'Address'}, {id: 'instPeople', title: 'People'}, {id: 'instIs4ua', title: "IS4UA"}];
  // tabPath = './';
  function EditInstitutions(datatable, config, people, utils, is4ua, dialog, validation) {
    this.institutionSelected = false;
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

  var _proto = EditInstitutions.prototype;

  _proto.attached = /*#__PURE__*/function () {
    var _attached = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var responses;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              $('[data-toggle="tooltip"]').tooltip();
              $('#loading').show();
              _context.next = 4;
              return Promise.all([this.people.getPeopleArray('?order=lastName'), this.people.getInstitutionsArray('?order=name', true), this.is4ua.loadIs4ua()]);

            case 4:
              responses = _context.sent;
              this.dataTable.updateArray(this.people.institutionsArray);
              $('#loading').hide();
              this.initialLoaded = true;

            case 8:
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
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              this.initialLoaded = false;

            case 1:
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

  _proto.tab = function tab(tabID) {
    $("#tabList").children().removeClass('active');
    $("#TabPanes").children().removeClass('active').removeClass('in');
    $("#Tab" + tabID).addClass('active');
    $("#" + tabID).addClass('active').addClass('in');
  };

  _proto.refresh = /*#__PURE__*/function () {
    var _refresh = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              // this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
              $('#loading').show();
              _context3.next = 3;
              return this.people.getInstitutionsArray('?order=name', true);

            case 3:
              this.dataTable.updateArray(this.people.institutionArray); // this.spinnerHTML = "";

              $('#loading').hide();

            case 5:
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

  _proto.edit = function edit(index, el) {
    this.editIndex = this.dataTable.getOriginalIndex(index);
    this.people.selectInstitution(this.editIndex);
    this.newInstitution = false;
    this.people.getInstitutionPeople('?filter=institutionId|eq|' + this.people.selectedInstitution._id, true);
    $("#editName").focus();
    if (this.selectedRow) this.selectedRow.children().removeClass('info');
    this.selectedRow = $(el.target).closest('tr');
    this.selectedRow.children().addClass('info');
    this.institutionSelected = true;
  };

  _proto.new = /*#__PURE__*/function () {
    var _new2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              this.editIndex = -1;
              this.people.getInstitutionPeople(-1);
              this.people.selectInstitution();
              this.newInstitution = true;
              $("#editName").focus();
              this.institutionSelected = true;

            case 6:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function _new() {
      return _new2.apply(this, arguments);
    }

    return _new;
  }();

  _proto.save = /*#__PURE__*/function () {
    var _save = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      var serverResponse;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (!this.validation.validate(1)) {
                _context5.next = 8;
                break;
              }

              _context5.next = 3;
              return this.people.saveInstitution();

            case 3:
              serverResponse = _context5.sent;

              if (!serverResponse.error) {
                this.dataTable.updateArray(this.people.institutionsArray);
                this.utils.showNotification(serverResponse.name + " was updated");
              } else {
                this.utils.showNotification("There was a problem updating saving the institution", 'error');
              }

              this._cleanUp();

              _context5.next = 10;
              break;

            case 8:
              if (!(!this.people.selectedInstitution.institutionType || !this.people.selectedInstitution.memberType || !this.people.selectedInstitution.institutionStatus || !this.people.selectedInstitution.highestDegree)) {
                _context5.next = 10;
                break;
              }

              return _context5.abrupt("return", this.dialog.showMessage("The IS4UA fields on the IS4UA tab are required", "Missing Data", ['OK']).then(function (response) {}));

            case 10:
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

    return this.dialog.showMessage("Are you sure you want to delete the institution?", "Delete Institution", ['Yes', 'No']).whenClosed(function (response) {
      if (!response.wasCancelled) {
        _this.deleteInstitution();
      }
    });
  };

  _proto.deleteInstitution = /*#__PURE__*/function () {
    var _deleteInstitution = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
      var name, serverResponse;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              name = this.people.selectedInstitution.name;
              _context6.next = 3;
              return this.people.deleteInstitution();

            case 3:
              serverResponse = _context6.sent;

              if (!serverResponse.error) {
                this.dataTable.updateArray(this.people.institutionsArray);
                this.utils.showNotification(name + " was deleted");
              } else {
                this.utils.showNotification("There was a problem deleting the user", 'error');
              }

              this._cleanUp();

            case 6:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function deleteInstitution() {
      return _deleteInstitution.apply(this, arguments);
    }

    return deleteInstitution;
  }();

  _proto.cancel = function cancel() {
    this.people.selectInstitution(this.editIndex);
  };

  _proto.back = function back() {
    var _this2 = this;

    if (this.people.isInstitutionDirty().length) {
      return this.dialog.showMessage("The institution has been changed. Do you want to save your changes?", "Save Changes", ['Yes', 'No']).whenClosed(function (response) {
        if (!response.wasCancelled) {
          _this2.save();
        } else {
          _this2.institutionSelected = false;
        }
      });
    } else {
      this.institutionSelected = false;
    }
  };

  _proto._setupValidation = function _setupValidation() {
    this.validation.addRule(1, "editName", [{
      "rule": "required",
      "message": "Name is required",
      "value": "people.selectedInstitution.name"
    }]);
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
  };

  _proto.downloadInstExcel = function downloadInstExcel() {
    var csvContent = "data:text/csv;charset=utf-8;,Name,City,State,Country,Type,Status\r\n";
    this.dataTable.baseArray.forEach(function (item) {
      csvContent += item.name + "," + item.city + "," + item.region + "," + item.country + "," + item.institutionType + "," + item.institutionStatus;
      csvContent += "\r\n";
    });
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "institutions.csv");
    document.body.appendChild(link); // Required for FF

    link.click();
  };

  _proto._cleanUp = function _cleanUp() {
    this.newInstitution = false;
    this.institutionSelected = false;

    this._cleanUpFilters();
  };

  _proto._clearFilters = function _clearFilters() {
    this._cleanUpFilters();

    this.dataTable.updateArray(this.people.institutionsArray);
  };

  _proto._cleanUpFilters = function _cleanUpFilters() {
    this.nameFilterValue = "";
    this.institutionTypeFilter = "";
    this.memberTypeFilter = "";
    this.highestDegreeFilter = "";
    $("#institutionStatus").val("");
  };

  _proto.changeTab = /*#__PURE__*/function () {
    var _changeTab = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(el, index) {
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              $("#instFormListGroup.list-group").children().removeClass('menuButtons');
              $("#instFormListGroup.list-group").children().css("background-color", "");
              $("#instFormListGroup.list-group").children().css("color", "");
              $(el.target).parent().css("background-color", this.config.BUTTONS_BACKGROUND);
              $(el.target).parent().css("color", this.config.ACTIVE_SUBMENU_COLOR);
              $(".in").removeClass('active').removeClass('in');
              $("#" + el.target.id + "Tab").addClass('in').addClass('active');

            case 7:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function changeTab(_x, _x2) {
      return _changeTab.apply(this, arguments);
    }

    return changeTab;
  }();

  return EditInstitutions;
}()) || _class);

/***/ }),

/***/ "modules/admin/Customers/editPeople":
/*!***************************************************!*\
  !*** ./src/modules/admin/Customers/editPeople.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EditPeople": function() { return /* binding */ EditPeople; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../resources/utils/dataTable */ 6847);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../config/appConfig */ 1666);
/* harmony import */ var _resources_utils_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../resources/utils/utils */ 8741);
/* harmony import */ var _resources_data_people__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../resources/data/people */ 353);
/* harmony import */ var _resources_data_is4ua__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../resources/data/is4ua */ 5175);
/* harmony import */ var _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../resources/dialogs/common-dialogs */ 6545);
/* harmony import */ var _resources_utils_validation__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../resources/utils/validation */ 2824);
var _dec, _class;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }









var EditPeople = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_1__.DataTable, _config_appConfig__WEBPACK_IMPORTED_MODULE_2__.AppConfig, _resources_data_people__WEBPACK_IMPORTED_MODULE_4__.People, _resources_utils_utils__WEBPACK_IMPORTED_MODULE_3__.Utils, _resources_data_is4ua__WEBPACK_IMPORTED_MODULE_5__.is4ua, _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_6__.CommonDialogs, _resources_utils_validation__WEBPACK_IMPORTED_MODULE_7__["default"]), _dec(_class = /*#__PURE__*/function () {
  // spinnerHTML = "";
  // tabs = [{ id: 'Address' }, { id: 'Roles' }, { id: 'Courses' }, { id: 'Password' }, { id: 'Audit' },{id: "Email"},{id: "Log"}];
  // tabPath = './';
  function EditPeople(datatable, config, people, utils, is4ua, dialog, validation) {
    this.personSelected = false;
    this.showCourses = false;
    this.courseSelected = false;
    this.showPassword = false;
    this.customerEmail = false;
    this.bulkEmailSelected = false;
    this.youSelectedAnEmail = false;
    this.emailSubject = "";
    this.emailMessage = "";
    this.phoneMask = "";
    this.toolbar = [['style', ['style', 'bold', 'italic', 'underline', 'clear']], ['color', ['color']], ['font', ['strikethrough', 'superscript', 'subscript']], ['layout', ['ul', 'ol', 'paragraph']], ['insert', ['link', 'table', 'hello']], ['misc', ['undo', 'redo', 'fullscreen', 'codeview']]];
    this.dataTable = datatable;
    this.dataTable.initialize(this);
    this.config = config;
    this.utils = utils;
    this.people = people;
    this.is4ua = is4ua;
    this.dialog = dialog;
    this.validation = validation;
    this.validation.initialize(this);
    this.userObj = JSON.parse(sessionStorage.getItem('user'));
  }

  var _proto = EditPeople.prototype;

  _proto.activate = /*#__PURE__*/function () {
    var _activate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var responses;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              this.initialLoaded = false;
              _context.next = 3;
              return Promise.all([this.people.getPeopleArray('?order=lastName&filter=personStatus|eq|01'), this.people.getInstitutionsArray('?order=name', true), this.is4ua.loadIs4ua(), this.config.getConfig()]);

            case 3:
              responses = _context.sent;
              this.activeFilterValue = "01";
              this.filteredArray = this.config.ROLES;
              this.dataTable.updateArray(this.people.peopleArray);

              this._setupValidation();

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

  _proto.tab = function tab(tabID) {
    $("#tabList").children().removeClass('active');
    $("#TabPanes").children().removeClass('active').removeClass('in');
    $("#Tab" + tabID).addClass('active');
    $("#" + tabID).addClass('active').addClass('in');
  };

  _proto.filterActive = /*#__PURE__*/function () {
    var _filterActive = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              this._clearFilters();

              $('#loading').show();

              if (!(this.activeFilterValue == "")) {
                _context2.next = 7;
                break;
              }

              _context2.next = 5;
              return this.people.getPeopleArray('?order=lastName', true);

            case 5:
              _context2.next = 9;
              break;

            case 7:
              _context2.next = 9;
              return this.people.getPeopleArray('?order=lastName&filter=personStatus|eq|' + this.activeFilterValue, true);

            case 9:
              this.dataTable.updateArray(this.people.peopleArray);
              $('#loading').hide();

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function filterActive() {
      return _filterActive.apply(this, arguments);
    }

    return filterActive;
  }();

  _proto.attached = /*#__PURE__*/function () {
    var _attached = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              $('[data-toggle="tooltip"]').tooltip();
              $('#loading').show(); // let responses = await Promise.all([
              //     this.people.getPeopleArray('?order=lastName&filter=personStatus|eq|01'),
              //     this.people.getInstitutionsArray('?order=name', true),
              //     this.is4ua.loadIs4ua(),
              //     this.config.getConfig()
              // ]);
              // this.activeFilterValue = "01";
              // this.filteredArray = this.config.ROLES;
              // this.dataTable.updateArray(this.people.peopleArray);
              // this._setupValidation();

              $('#loading').hide();
              this.initialLoaded = true;

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function attached() {
      return _attached.apply(this, arguments);
    }

    return attached;
  }();

  _proto.refresh = /*#__PURE__*/function () {
    var _refresh = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              this._cleanUpFilters(); // this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";


              $('#loading').show();
              _context4.next = 4;
              return this.people.getPeopleArray('?order=lastName&filter=personStatus|eq|01', true);

            case 4:
              this.dataTable.updateArray(this.people.peopleArray);
              // this.spinnerHTML = "";
              $('#loading').hide();

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

  _proto.edit = function edit(index, el) {
    this.editIndex = this.dataTable.getOriginalIndex(index);
    this.people.selectPerson(this.editIndex);
    this.oldEmail = this.people.selectedPerson.email;
    this.institutionId = this.people.selectedPerson.institutionId._id || null;
    this.orginalObject = this.people.selectedPerson;
    this.filterRoles();
    this.newPerson = false;
    $("#editFirstName").focus();
    this.getPhoneMask();
    this.people.getEmailLog('?filter=personId|eq|' + this.people.selectedPerson._id + '&order=date', true);
    if (this.selectedRow) this.selectedRow.children().removeClass('info');
    this.selectedRow = $(el.target).closest('tr');
    this.selectedRow.children().addClass('info');
    this.personSelected = true;
    this.setFirstTab();
  };

  _proto.getPhoneMask = function getPhoneMask() {
    var _this = this;

    this.phoneMask = "";
    setTimeout(function () {
      for (var i = 0; i < _this.config.PHONE_MASKS.length; i++) {
        if (_this.people.selectedPerson.country === _this.config.PHONE_MASKS[i].country) {
          _this.phoneMask = _this.config.PHONE_MASKS[i].mask;
          break;
        }
      }
    }, 500);
  };

  _proto.selectEmail = function selectEmail(email) {
    this.selectedEmail = email;
    this.youSelectedAnEmail = true;
  };

  _proto.backEmail = function backEmail() {
    this.youSelectedAnEmail = false;
  };

  _proto.new = /*#__PURE__*/function () {
    var _new2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              this.editIndex = -1;
              this.people.selectPerson();
              this.newPerson = true;
              this.oldEmail = this.people.selectedPerson.email;
              $("#editFirstName").focus();
              this.personSelected = true;
              this.phoneMask = "";
              this.setFirstTab();

            case 8:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function _new() {
      return _new2.apply(this, arguments);
    }

    return _new;
  }();

  _proto.filterRoles = function filterRoles() {
    var _this2 = this;

    this.filteredArray = this.config.ROLES.filter(function (item) {
      return _this2.people.selectedPerson.roles.indexOf(item.role) === -1;
    });
    if (this.filteredArray.length === 0) this.filteredArray.push({
      role: "NOROLE",
      label: "No Roles Remaining"
    });
  };

  _proto.selectRole = function selectRole(event, role) {
    if (role.role === 'NOROLE') return;
    this.people.selectedPerson.roles.push(role.role);
    this.filterRoles();
  };

  _proto.removeRole = function removeRole(index, role) {
    this.people.selectedPerson.roles.splice(index, 1);
    this.filterRoles();
  };

  _proto.buildAudit = function buildAudit() {
    var _this3 = this;

    var changes = this.people.isPersonDirty(this.orginalObject);
    changes.forEach(function (item) {
      _this3.people.selectedPerson.audit.push({
        property: item.property,
        eventDate: new Date(),
        oldValue: item.oldValue,
        newValue: item.newValue,
        personId: _this3.userObj._id
      });
    });
  };

  _proto.save = /*#__PURE__*/function () {
    var _save = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
      var serverResponse;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (!this.validation.validate(1)) {
                _context6.next = 7;
                break;
              }

              if (this.people.selectedPerson._id) {
                this.buildAudit();
              } else {
                this.people.selectedPerson.institutionId = this.institutionId;
              }

              _context6.next = 4;
              return this.people.savePerson();

            case 4:
              serverResponse = _context6.sent;

              if (!serverResponse.error) {
                this.dataTable.updateArray(this.people.peopleArray);
                this.utils.showNotification(serverResponse.firstName + " " + serverResponse.lastName + " was updated");
              } else {
                this.utils.showNotification("There was a problem saving the person", 'error');
              }

              this._cleanUp();

            case 7:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function save() {
      return _save.apply(this, arguments);
    }

    return save;
  }();

  _proto.delete = function _delete() {
    var _this4 = this;

    return this.dialog.showMessage("Are you sure you want to delete the person?", "Delete Person", ['Yes', 'No']).whenClosed(function (response) {
      if (!response.wasCancelled) {
        _this4.deletePerson();
      }
    });
  };

  _proto.deletePerson = /*#__PURE__*/function () {
    var _deletePerson = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
      var name, serverResponse;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              name = this.people.selectedPerson.fullName;
              _context7.next = 3;
              return this.people.deletePerson();

            case 3:
              serverResponse = _context7.sent;

              if (!serverResponse.error) {
                this.dataTable.updateArray(this.people.peopleArray);
                this.utils.showNotification(name + " was deleted");
              }

              this.personSelected = false;

            case 6:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function deletePerson() {
      return _deletePerson.apply(this, arguments);
    }

    return deletePerson;
  }();

  _proto.cancel = function cancel() {
    this.people.selectPerson(this.editIndex);
  };

  _proto.back = function back() {
    var _this5 = this;

    if (this.people.isPersonDirty(this.orginalObject).length) {
      return this.dialog.showMessage("The account has been changed. Do you want to save your changes?", "Save Changes", ['Yes', 'No']).whenClosed(function (response) {
        if (!response.wasCancelled) {
          _this5.save();
        } else {
          _this5.personSelected = false;
        }
      });
    } else {
      this.personSelected = false;
    }

    this.institutionId = "";
  };

  _proto.checkEmail = /*#__PURE__*/function () {
    var _checkEmail = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              if (!(this.oldEmail != this.people.selectedPerson.email)) {
                _context8.next = 10;
                break;
              }

              _context8.next = 3;
              return this.people.checkEmail();

            case 3:
              if (!_context8.sent) {
                _context8.next = 8;
                break;
              }

              this.duplicateAccount = true;
              this.validation.validate(4);
              _context8.next = 10;
              break;

            case 8:
              this.duplicateAccount = false;
              this.validation.makeValid($("#register_email"));

            case 10:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    function checkEmail() {
      return _checkEmail.apply(this, arguments);
    }

    return checkEmail;
  }();

  _proto.changeInstitution = function changeInstitution() {
    var _this6 = this;

    if (this.people.selectedPerson._id) {
      return this.dialog.showMessage("Are you sure you want to change the institution? This should normally only be done if the account was created in the wrong institution.  If the user has changed institutions, create a new account.", "Change Institution", ['Yes', 'No']).whenClosed(function (response) {
        if (!response.wasCancelled) {
          _this6.people.selectedPerson.institutionId._id = _this6.institutionId;
          setTimeout(function () {
            _this6.copyInstAddress();
          }, 1000);
        } else {
          _this6.institutionId = _this6.people.selectedPerson.institutionId._id;
        }
      });
    } else {
      setTimeout(function () {
        _this6.copyInstAddress();
      }, 1000);
    }
  };

  _proto.openEditCourseForm = /*#__PURE__*/function () {
    var _openEditCourseForm = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              if (this.showCourses) {
                _context9.next = 3;
                break;
              }

              _context9.next = 3;
              return this.refreshCourses();

            case 3:
              this.showCourses = !this.showCourses;

            case 4:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, this);
    }));

    function openEditCourseForm() {
      return _openEditCourseForm.apply(this, arguments);
    }

    return openEditCourseForm;
  }();

  _proto.refreshCourses = /*#__PURE__*/function () {
    var _refreshCourses = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              if (!this.people.selectedPerson._id) {
                _context10.next = 3;
                break;
              }

              _context10.next = 3;
              return this.people.getCoursesArray(true, '?filter=personId|eq|' + this.people.selectedPerson._id + '&order=number');

            case 3:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, this);
    }));

    function refreshCourses() {
      return _refreshCourses.apply(this, arguments);
    }

    return refreshCourses;
  }();

  _proto.editACourse = function editACourse(index, el) {
    this.editCourseIndex = index;
    this.people.selectCourse(this.editCourseIndex);
    $("#number").focus();
    if (this.selectedCourseRow) this.selectedCourseRow.children().removeClass('info');
    this.selectedCourseRow = $(el.target).closest('tr');
    this.selectedCourseRow.children().addClass('info');
    this.courseSelected = true;
  };

  _proto.newCourse = function newCourse() {
    this.editCourseIndex = -1;
    this.people.selectCourse();
    $("#number").focus();
    this.editCourse = true;
    this.courseSelected = true;
  };

  _proto.saveCourse = /*#__PURE__*/function () {
    var _saveCourse = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
      var serverResponse;
      return regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              if (!this.validation.validate(2)) {
                _context11.next = 7;
                break;
              }

              if (!this.people.selectedPerson._id) {
                _context11.next = 7;
                break;
              }

              this.people.selectedCourse.personId = this.people.selectedPerson._id;
              _context11.next = 5;
              return this.people.saveCourse();

            case 5:
              serverResponse = _context11.sent;

              if (!serverResponse.error) {
                this.utils.showNotification("The course was updated");
              }

            case 7:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11, this);
    }));

    function saveCourse() {
      return _saveCourse.apply(this, arguments);
    }

    return saveCourse;
  }();

  _proto.cancelEditCourse = function cancelEditCourse() {
    this.courseSelected = false;
  };

  _proto.openEditPasswordForm = function openEditPasswordForm() {
    this.showPassword = true;
  };

  _proto.cancelEditPassword = function cancelEditPassword() {
    this.newPassword = "";
    this.newPassword_repeat = "";
    this.showPassword = false;
  };

  _proto.savePassword = /*#__PURE__*/function () {
    var _savePassword = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
      var obj, response;
      return regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              this.newPassword = $("#newPassword").val();

              if (!this.validation.validate(3, this)) {
                _context12.next = 8;
                break;
              }

              obj = {
                password: this.newPassword
              };
              _context12.next = 5;
              return this.people.updatePassword(obj);

            case 5:
              response = _context12.sent;

              if (!response.error) {
                this.utils.showNotification("The password was updated");
                $("#newPassword").val("");
                this.newPassword = "";
              }

              this.showPassword = false;

            case 8:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12, this);
    }));

    function savePassword() {
      return _savePassword.apply(this, arguments);
    }

    return savePassword;
  }();

  _proto.copyInstAddress = function copyInstAddress() {
    if (this.institutionId) {
      this.people.selectInstitutionByID(this.institutionId);

      if (this.people.selectedInstitution._id) {
        this.people.selectedPerson.address1 = this.people.selectedInstitution.address1;
        this.people.selectedPerson.address2 = this.people.selectedInstitution.address2;
        this.people.selectedPerson.city = this.people.selectedInstitution.city;
        this.people.selectedPerson.region = this.people.selectedInstitution.region;
        this.people.selectedPerson.postalCode = this.people.selectedInstitution.postalCode;
        this.people.selectedPerson.country = this.people.selectedInstitution.country;
        this.people.selectedPerson.POBox = this.people.selectedInstitution.POBox;
        this.getPhoneMask();
      }
    }
  };

  _proto.cancelCustomerEmail = function cancelCustomerEmail() {
    this.emailMessage = "";
    this.emailSubject = "";
  };

  _proto.sendAnEmail = function sendAnEmail(id) {
    var _this7 = this;

    if (id) {
      var email = {
        emailBody: "",
        emailSubject: "",
        emailId: id,
        from: this.userObj._id
      };
      return this.dialog.showEmail("Enter Email", email, ['Submit', 'Cancel']).whenClosed(function (response) {
        if (!response.wasCancelled) {
          _this7.sendTheEmail(response.output);
        } else {
          console.log("Cancelled");
        }
      });
    }
  };

  _proto.sendTheEmail = /*#__PURE__*/function () {
    var _sendTheEmail = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(email) {
      var message, serverResponse;
      return regeneratorRuntime.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              if (!this.people.selectedPerson || this.people.selectedPerson._id !== email.email.emailId) this.people.selectedPersonFromId(email.email.emailId);

              if (!email) {
                _context13.next = 7;
                break;
              }

              message = {
                from: email.email.from,
                id: email.email.emailId,
                message: email.email.emailBody,
                email: this.people.selectedPerson.email,
                subject: email.email.emailSubject
              };
              _context13.next = 5;
              return this.people.sendCustomerMessage(message);

            case 5:
              serverResponse = _context13.sent;

              if (!serverResponse.error) {
                this.utils.showNotification("The message was sent");
              }

            case 7:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13, this);
    }));

    function sendTheEmail(_x) {
      return _sendTheEmail.apply(this, arguments);
    }

    return sendTheEmail;
  }();

  _proto.sendCustomerEmail = /*#__PURE__*/function () {
    var _sendCustomerEmail = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
      var message, serverResponse;
      return regeneratorRuntime.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              if (!this.emailMessage) {
                _context14.next = 6;
                break;
              }

              message = {
                id: this.people.selectedPerson._id,
                from: this.userObj._id,
                message: this.emailMessage,
                email: this.people.selectedPerson.email,
                subject: this.emailSubject,
                audit: {
                  property: 'Send Message',
                  eventDate: new Date(),
                  newValue: this.emailMessage,
                  personId: this.userObj._id
                }
              };
              _context14.next = 4;
              return this.people.sendCustomerMessage(message);

            case 4:
              serverResponse = _context14.sent;

              if (!serverResponse.error) {
                this.utils.showNotification("The message was sent");
              }

            case 6:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14, this);
    }));

    function sendCustomerEmail() {
      return _sendCustomerEmail.apply(this, arguments);
    }

    return sendCustomerEmail;
  }();

  _proto.toggleStatus = /*#__PURE__*/function () {
    var _toggleStatus = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(id, personStatus) {
      var serverResponse;
      return regeneratorRuntime.wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              if (!(id && personStatus)) {
                _context15.next = 8;
                break;
              }

              this.people.selectedPersonFromId(id);
              this.people.selectedPerson.personStatus = personStatus === this.config.ACTIVE_PERSON ? this.config.INACTIVE_PERSON : this.config.ACTIVE_PERSON;
              this.people.selectedPerson.audit.push({
                property: 'personStatus',
                eventDate: new Date(),
                newValue: this.people.selectedPerson.personStatus,
                personId: this.userObj._id
              });
              _context15.next = 6;
              return this.people.savePerson();

            case 6:
              serverResponse = _context15.sent;

              if (!serverResponse.error) {
                this.utils.showNotification(serverResponse.firstName + " " + serverResponse.lastName + " was updated");
              } else {
                this.utils.showNotification("There was a problem saving the person", 'error');
              }

            case 8:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15, this);
    }));

    function toggleStatus(_x2, _x3) {
      return _toggleStatus.apply(this, arguments);
    }

    return toggleStatus;
  }();

  _proto.setFirstTab = function setFirstTab() {
    $("#peopleFormListGroup.list-group").children().removeClass('active');
    var target = $("#peopleFormListGroup.list-group").children()[0]; // $(el.target).parent().css("background-color",this.config.BUTTONS_BACKGROUND);
    // $(el.target).parent().css("color",this.config.ACTIVE_SUBMENU_COLOR);
    // $(".in").removeClass('active').removeClass('in');
    // $("#AddressTab").addClass('in').addClass('active');
  };

  _proto.changeTab = /*#__PURE__*/function () {
    var _changeTab = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(el, index) {
      return regeneratorRuntime.wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              $("#peopleFormListGroup.list-group").children().removeClass('menuButtons');
              $("#peopleFormListGroup.list-group").children().css("background-color", "");
              $("#peopleFormListGroup.list-group").children().css("color", "");
              $(el.target).parent().css("background-color", this.config.BUTTONS_BACKGROUND);
              $(el.target).parent().css("color", this.config.ACTIVE_SUBMENU_COLOR);
              $(".in").removeClass('active').removeClass('in');
              $("#" + el.target.id + "Tab").addClass('in').addClass('active');
              _context16.t0 = el.target.id;
              _context16.next = _context16.t0 === 'Courses' ? 10 : 13;
              break;

            case 10:
              _context16.next = 12;
              return this.refreshCourses();

            case 12:
              return _context16.abrupt("break", 13);

            case 13:
            case "end":
              return _context16.stop();
          }
        }
      }, _callee16, this);
    }));

    function changeTab(_x4, _x5) {
      return _changeTab.apply(this, arguments);
    }

    return changeTab;
  }();

  _proto._cleanUp = function _cleanUp() {
    this.institutionId = "";
    this.personSelected = false;
    this.newPerson = false;

    this._cleanUpFilters();

    this.validation.makeAllValid(1);
  };

  _proto._setupValidation = function _setupValidation() {
    this.validation.addRule(1, "editFirstName", [{
      "rule": "required",
      "message": "First name is required",
      "value": "people.selectedPerson.firstName"
    }, {
      "rule": "custom",
      "message": "A person with that name at that institution already exists",
      "valFunction": function valFunction(context) {
        var found = false;

        for (var i = 0; i < context.people.peopleArray.length; i++) {
          if (context.people.peopleArray[i].firstName.toUpperCase() === context.people.selectedPerson.firstName.toUpperCase() && context.people.peopleArray[i].lastName.toUpperCase() === context.people.selectedPerson.lastName.toUpperCase() && context.people.peopleArray[i].institutionId === context.people.selectedPerson.institutionId) {
            if (context.people.selectedPerson._id && context.people.selectedPerson._id != context.people.peopleArray[i]._id) {
              found = true;
            } else if (!context.people.selectedPerson._id) {
              found = true;
            }
          }
        }

        return !found;
      }
    }]);
    this.validation.addRule(1, "editLastName", [{
      "rule": "required",
      "message": "Last name is required",
      "value": "people.selectedPerson.lastName"
    }]);
    this.validation.addRule(1, "editStatus", [{
      "rule": "required",
      "message": "Status is required",
      "value": "people.selectedPerson.personStatus"
    }]);
    this.validation.addRule(1, "editPhone", [{
      "rule": "required",
      "message": "Phone number is required",
      "value": "people.selectedPerson.phone"
    }, {
      "rule": "length",
      "message": "Phone number isn't valid",
      "value": "people.selectedPerson.phone",
      "ruleValue": 10
    }]);
    this.validation.addRule(1, "editMobile", [{
      "rule": "length",
      "message": "Phone number isn't valid",
      "value": "people.selectedPerson.mobile",
      "ruleValue": 10
    }]);
    this.validation.addRule(1, "editEmail", [{
      "rule": "required",
      "message": "Email is required",
      "value": "people.selectedPerson.email"
    }, {
      "rule": "custom",
      "message": "An account with that email exists",
      "valFunction": function valFunction(context) {
        return !context.duplicateAccount;
      }
    }, {
      "rule": "custom",
      "message": "Enter a valid email address",
      "valFunction": function valFunction(context) {
        return context.people.selectedPerson.email.indexOf('@') > -1;
      }
    }]);
    this.validation.addRule(1, "editInstitution", [{
      "rule": "required",
      "message": "Institution is required",
      "value": "institutionId"
    }]);
    this.validation.addRule(1, "editRoles", [{
      "rule": "custom",
      "message": "The person must be assigned a role.",
      "valFunction": function valFunction(context) {
        return context.people.selectedPerson.roles.length > 0;
      }
    }]);
    this.validation.addRule(2, "number", [{
      "rule": "required",
      "message": "Course number is required",
      "value": "people.selectedCourse.number"
    }]);
    this.validation.addRule(2, "name", [{
      "rule": "required",
      "message": "Course name is required",
      "value": "people.selectedCourse.name"
    }]);
    this.validation.addRule(3, "password", [{
      "rule": "required",
      "message": "Password is required",
      "value": "newPassword"
    }]);
    this.validation.addRule(4, "editEmail", [{
      "rule": "custom",
      "message": "An account with that email exists",
      "valFunction": function valFunction(context) {
        return !context.duplicateAccount;
      }
    }, {
      "rule": "custom",
      "message": "Enter a valid email address",
      "valFunction": function valFunction(context) {
        return /^\w+([\.-]?\ w+)*@\w+([\.-]?\ w+)*(\.\w{2,3})+$/.test(context.people.selectedPerson.email);
      }
    }]);
  };

  _proto._clearFilters = function _clearFilters() {
    this._cleanUpFilters();

    this.dataTable.updateArray(this.people.peopleArray);
  };

  _proto._cleanUpFilters = function _cleanUpFilters() {
    this.roleFilter = "";
    this.nameFilterValue = "";
    this.nickNameFilterValue = "";
    this.institutionFilterValue = "";
  };

  _proto.downloadInstExcel = function downloadInstExcel() {
    var csvContent = "data:text/csv;charset=utf-8;,First Name,Last Name,Email,Phone,Institution,Country,Region,Status,Roles\r\n";
    this.dataTable.baseArray.forEach(function (item) {
      var isActive = item.personStatus == '01' ? 'Active' : 'Inactive';
      csvContent += item.firstName + "," + item.lastName.replace(',', ' ') + "," + item.email + "," + item.phone + "," + item.institutionId.name.replace(",", " ") + "," + item.country + "," + item.region + "," + isActive + "," + item.roles.join(":");
      csvContent += "\r\n";
    });
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "people.csv");
    document.body.appendChild(link); // Required for FF

    link.click();
  };

  _proto.archiveInactivePeople = /*#__PURE__*/function () {
    var _archiveInactivePeople = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17() {
      var _this8 = this;

      var inactivePeople, response;
      return regeneratorRuntime.wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              inactivePeople = 0;
              _context17.next = 3;
              return this.people.countPeopleStatus(this.config.INACTIVE_PERSON);

            case 3:
              response = _context17.sent;
              if (!response.error) inactivePeople = response.count;

              if (!inactivePeople) {
                _context17.next = 9;
                break;
              }

              return _context17.abrupt("return", this.dialogs.showMessage("This will archive " + inactivePeople + " inactive people.  Are you sure you want to do that?", "Archive People", ['Yes', 'No']).whenClosed(function (response) {
                if (!response.wasCancelled) {
                  _this8.archiveTickets();
                }
              }));

            case 9:
              this.utils.showNotification('There are currently no inactive people in the active person collection.', 'warning');

            case 10:
            case "end":
              return _context17.stop();
          }
        }
      }, _callee17, this);
    }));

    function archiveInactivePeople() {
      return _archiveInactivePeople.apply(this, arguments);
    }

    return archiveInactivePeople;
  }();

  _proto.archivePeople = /*#__PURE__*/function () {
    var _archivePeople = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18() {
      var response;
      return regeneratorRuntime.wrap(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              _context18.next = 2;
              return this.people.archiveInactivePeople();

            case 2:
              response = _context18.sent;

              if (!response.error) {
                this.utils.showNotification(response.number + ' people were archived successfully');
              }

            case 4:
            case "end":
              return _context18.stop();
          }
        }
      }, _callee18, this);
    }));

    function archivePeople() {
      return _archivePeople.apply(this, arguments);
    }

    return archivePeople;
  }();

  _proto.customInstitutionSorter = function customInstitutionSorter(sortProperty, sortDirection, sortArray, context) {
    return sortArray.sort(function (a, b) {
      if (a['institutionId'] !== null && b['institutionId'] !== null) {
        var result = a['institutionId']['name'] < b['institutionId']['name'] ? -1 : a['institutionId']['name'] > b['institutionId']['name'] ? 1 : 0;
      } else {
        var result = -1;
      }

      return result * sortDirection;
    });
  };

  _proto.institutionCustomFilter = function institutionCustomFilter(value, item, context) {
    return item.institutionId && item.institutionId.name.toUpperCase().indexOf(value.toUpperCase()) > -1;
  };

  _proto.customRoleFilter = function customRoleFilter(value, item, context) {
    var keep = false;

    if (item.roles && item.roles.length > 0) {
      for (var i = 0; i < item.roles.length; i++) {
        if (item.roles[i].toUpperCase().indexOf(value.toUpperCase()) > -1) keep = true;
      }
    }

    return keep;
  };

  return EditPeople;
}()) || _class);

/***/ }),

/***/ "modules/admin/documents/documents":
/*!**************************************************!*\
  !*** ./src/modules/admin/documents/documents.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Documents": function() { return /* binding */ Documents; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var aurelia_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-router */ 6433);
/* harmony import */ var _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../resources/utils/dataTable */ 6847);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../config/appConfig */ 1666);
/* harmony import */ var _resources_utils_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../resources/utils/utils */ 8741);
/* harmony import */ var _resources_data_documents__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../resources/data/documents */ 7188);
/* harmony import */ var _resources_data_people__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../resources/data/people */ 353);
/* harmony import */ var _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../resources/dialogs/common-dialogs */ 6545);
/* harmony import */ var _resources_utils_validation__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../resources/utils/validation */ 2824);
/* harmony import */ var aurelia_event_aggregator__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! aurelia-event-aggregator */ "aurelia-event-aggregator");
var _dec, _class;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }











var Documents = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(aurelia_router__WEBPACK_IMPORTED_MODULE_1__.Router, _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_2__.DataTable, _resources_data_documents__WEBPACK_IMPORTED_MODULE_5__.DocumentsServices, _resources_data_people__WEBPACK_IMPORTED_MODULE_6__.People, _resources_utils_utils__WEBPACK_IMPORTED_MODULE_4__.Utils, _config_appConfig__WEBPACK_IMPORTED_MODULE_3__.AppConfig, _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_7__.CommonDialogs, _resources_utils_validation__WEBPACK_IMPORTED_MODULE_8__["default"], aurelia_event_aggregator__WEBPACK_IMPORTED_MODULE_9__.EventAggregator), _dec(_class = /*#__PURE__*/function () {
  function Documents(router, datatable, documents, people, utils, config, dialog, validation, eventAggregator) {
    this.navControl = "documentssNavButtons";
    this.spinnerHTML = "";
    this.filterValues = new Array();
    this.typeSelected = "";
    this.categoryForm = false;
    this.showDocumentForm = false;
    this.showDocuments = false;
    this.displayTitle = "";
    this.title = "Documents";
    this.router = router;
    this.dataTable = datatable;
    this.dataTable.initialize(this);
    this.utils = utils;
    this.documents = documents;
    this.config = config;
    this.people = people;
    this.dialog = dialog;
    this.eventAggregator = eventAggregator;
    this.validation = validation;
    this.validation.initialize(this);
    this.userObj = JSON.parse(sessionStorage.getItem('user'));
  }

  var _proto = Documents.prototype;

  _proto.activate = /*#__PURE__*/function () {
    var _activate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var responses;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return Promise.all([this.documents.getDocumentsCategoriesArray(), this.people.getPeopleArray(), this.config.getConfig()]);

            case 2:
              responses = _context.sent;
              this.filteredDocumentArray = this.documents.docCatsArray;

              if (!this.filteredDocumentArray.length) {
                _context.next = 7;
                break;
              }

              _context.next = 7;
              return this.selectFirstCategory();

            case 7:
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

  _proto.attached = function attached() {
    $('[data-toggle="tooltip"]').tooltip();

    this._setupValidation();

    this.mySubscription = this.eventAggregator.subscribe('upload-progress', function (obj) {
      var elem = document.getElementById("progressBar");
      elem.style.width = obj.progress / obj.total * 100 + '%';
    });
  };

  _proto.refresh = /*#__PURE__*/function () {
    var _refresh = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
              _context2.next = 3;
              return this.documents.getDocumentsArray(true);

            case 3:
              this.dataTable.updateArray(this.documents.docCatsArray);
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

  _proto.editDocument = function editDocument(index, el) {
    this.editIndex = this.dataTable.getOriginalIndex(index);
    this.documents.selectDocument(this.editIndex);
    this.displayTitle = "Files"; //Reset the selected row

    if (this.selectedRow) this.selectedRow.children().removeClass('info');
    this.selectedRow = $(el.target).closest('tr');
    this.selectedRow.children().addClass('info');
    this.showDocumentForm = true;
  };

  _proto.filterList = function filterList() {
    if (this.filter) {
      var thisFilter = this.filter;
      this.filteredDocumentArray = this.documents.docCatsArray.filter(function (item) {
        return item.description.toUpperCase().indexOf(thisFilter.toUpperCase()) > -1;
      });
    } else {
      this.filteredDocumentArray = this.documents.docCatsArray;
    }
  };

  _proto.selectFirstCategory = /*#__PURE__*/function () {
    var _selectFirstCategory = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              this.categoryIndex = 0;

              if (!(this.documents.selectCategory && this.documents.selectCategory.length > 0)) {
                _context3.next = 8;
                break;
              }

              this.documents.selectCategory(0);
              _context3.next = 5;
              return this.documents.getDocumentsArray(true, '?filter=categoryCode|eq|' + this.documents.selectedCat.code);

            case 5:
              this.dataTable.updateArray(this.documents.documentsArray);
              this.showDocuments = true;
              this.showDocumentForm = false;

            case 8:
              this.displayTitle = "Documents";

            case 9:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function selectFirstCategory() {
      return _selectFirstCategory.apply(this, arguments);
    }

    return selectFirstCategory;
  }();

  _proto.typeChanged = /*#__PURE__*/function () {
    var _typeChanged = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(index, el) {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (!(index >= 0)) {
                _context4.next = 14;
                break;
              }

              this.categoryIndex = index;
              this.documents.selectCategory(index);
              _context4.next = 5;
              return this.documents.getDocumentsArray(true, '?filter=categoryCode|eq|' + this.documents.selectedCat.code);

            case 5:
              this.dataTable.updateArray(this.documents.documentsArray);
              this.showDocuments = true;
              this.showDocumentForm = false;
              this.displayTitle = "Documents";
              $("#categoryList.list-group").children().removeClass('menuButtons');
              $("#categoryList.list-group").children().css("background-color", "");
              $("#categoryList.list-group").children().css("color", "");
              $(el.target).css("background-color", this.config.BUTTONS_BACKGROUND);
              $(el.target).css("color", this.config.ACTIVE_SUBMENU_COLOR); // if (this.selectedRow) this.selectedRow.removeClass('info');
              // this.selectedRow = $(el.target);
              // this.selectedRow.addClass('info')

            case 14:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function typeChanged(_x, _x2) {
      return _typeChanged.apply(this, arguments);
    }

    return typeChanged;
  }();

  _proto.new = function _new() {
    this.editIndex = "";
    this.showDocumentForm = true;
    this.documents.selectDocument();
  };

  _proto.back = function back() {
    this.displayTitle = "Documents";
    this.showDocumentForm = false;
  };

  _proto.cancel = function cancel() {
    this.documents.selectDocument(this.editIndex);
  };

  _proto.delete = /*#__PURE__*/function () {
    var _delete2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      var _this = this;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              return _context5.abrupt("return", this.dialog.showMessage("This will delete the document from the database and remove all the files.  Are you sure you want to delete the document?", "Delete Document", ['Yes', 'No']).whenClosed(function (response) {
                if (!response.wasCancelled) {
                  _this.deleteDocument();
                }
              }));

            case 1:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function _delete() {
      return _delete2.apply(this, arguments);
    }

    return _delete;
  }();

  _proto.deleteDocument = /*#__PURE__*/function () {
    var _deleteDocument = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
      var serverResponse;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return this.documents.deleteDocument();

            case 2:
              serverResponse = _context6.sent;

              if (!serverResponse.error) {
                this.utils.showNotification("The document was deleted");
                this.refresh();
                this.showDocumentForm = false;
              }

              this._cleanUp();

            case 5:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function deleteDocument() {
      return _deleteDocument.apply(this, arguments);
    }

    return deleteDocument;
  }();

  _proto.toggleFileActive = function toggleFileActive(index) {
    this.documents.selectedDocument.files[index].active = !this.documents.selectedDocument.files[index].active;
  };

  _proto.deleteFile = function deleteFile(index) {
    var _this2 = this;

    return this.dialog.showMessage("Are you sure you want to delete the file?", "Delete File", ['Yes', 'No']).whenClosed(function (response) {
      if (!response.wasCancelled) {
        _this2.documents.deleteFile(index);
      }
    });
  };

  _proto.buildDocument = function buildDocument() {
    if (!this.documents.selectedDocument._id) {
      this.documents.selectedDocument.categoryCode = this.documents.selectedCat.code;
      this.documents.selectedDocument.dateCreated = new Date();
    }

    if (this.files && this.files.length > 0) {
      var version = 1;

      for (var i = 0; i < this.documents.selectedDocument.files.length; i++) {
        if (this.documents.selectedDocument.files[i].originalFilename == this.files[0].name) {
          version++;
        }
      }

      var fileNameArray = this.files[0].name.split('.');
      var fileName = fileNameArray[0] + " (" + version + ")." + fileNameArray[1];
      var newFile = {
        personId: this.userObj._id,
        originalFilename: this.files[0].name,
        fileName: fileName,
        dateUploaded: new Date(),
        active: true,
        version: version
      };
      this.documents.selectedDocument.files.unshift(newFile);
    }
  };

  _proto.save = /*#__PURE__*/function () {
    var _save = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
      var serverResponse;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              this.buildDocument();

              if (!this.validation.validate(1)) {
                _context7.next = 21;
                break;
              }

              _context7.next = 4;
              return this.documents.saveDocument();

            case 4:
              serverResponse = _context7.sent;

              if (serverResponse.error) {
                _context7.next = 21;
                break;
              }

              this.dataTable.updateArray(this.documents.documentsArray);

              if (!(this.filesToUpload && this.filesToUpload.length > 0)) {
                _context7.next = 19;
                break;
              }

              this.uploading = true;
              this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
              _context7.next = 12;
              return this.documents.uploadFile(this.filesToUpload, this.documents.selectedDocument.files[0].version);

            case 12:
              this.spinnerHTML = "";
              $("#spinner").toggle().toggle();

              this._cleanUp();

              this.selectedFile = "";
              this.utils.showNotification("The document was saved");
              _context7.next = 21;
              break;

            case 19:
              this._cleanUp();

              this.utils.showNotification("The document was saved");

            case 21:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function save() {
      return _save.apply(this, arguments);
    }

    return save;
  }();

  _proto.changeFiles = function changeFiles() {
    this.filesToUpload = new Array();
    this.filesToUpload.push(this.files[0]);
  };

  _proto.removeFile = function removeFile(index) {
    this.filesToUpload.splice(index, 1);
  };

  _proto.newCategory = function newCategory() {
    this.categoryForm = true;
    this.documents.selectCategory();
  };

  _proto.editCategory = function editCategory() {
    if (this.documents.selectedCat) this.categoryForm = true;
  };

  _proto.saveCategory = function saveCategory() {
    var serverResponse = this.documents.saveCategory();

    if (!serverResponse.status) {
      this.utils.showNotification("Category Saved");
      this.categoryForm = false;
    }
  };

  _proto._cleanUp = function _cleanUp() {
    this.selectedFiles = undefined;
    this.files = undefined;
    this.uploading = false;
    this.filesToUpload = new Array();
  };

  _proto.backCategory = function backCategory() {
    this.categoryForm = false;
  };

  _proto.cancelEditCategory = function cancelEditCategory() {
    this.documents.selectCategory();
  };

  _proto._setupValidation = function _setupValidation() {
    this.validation.addRule(1, "editName", [{
      "rule": "required",
      "message": "Document name is required",
      "value": "documents.selectedDocument.name"
    }]);
    this.validation.addRule(1, "editDescription", [{
      "rule": "required",
      "message": "Document description is required",
      "value": "documents.selectedDocument.description"
    }]);
  };

  return Documents;
}()) || _class);

/***/ }),

/***/ "modules/admin/Customers/bulkEmails.html":
/*!*****************************************************!*\
  !*** ./src/modules/admin/Customers/bulkEmails.html ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n  <span id=\"loading\">\r\n    <ul class=\"bokeh\">\r\n      <li></li>\r\n      <li></li>\r\n      <li></li>\r\n    </ul>\r\n  </span>\r\n  <div show.bind=\"dataTable.displayArray && dataTable.displayArray.length || initialLoaded\">\r\n    <compose view=\"./components/selectionForm.html\"></compose>\r\n  </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/Customers/components/Courses.html":
/*!*************************************************************!*\
  !*** ./src/modules/admin/Customers/components/Courses.html ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div class=\"topMargin\">\r\n        <table id=\"coursesTable\" class=\"table table-striped table-hover\">\r\n            <thead>\r\n                <tr>\r\n                    <td colspan='6'>\r\n                        <span click.delegate=\"refreshCourses()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Refresh\"><i class=\"fa fa-refresh\" aria-hidden=\"true\"></i></span>\r\n                        <span click.delegate=\"newCourse()\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"New Course\"><i class=\"fa fa-plus\" aria-hidden=\"true\"></i></span>\r\n                        <span class=\"pull-right\" id=\"spinner\" innerhtml.bind=\"spinnerHTML\"></span>\r\n                    </td>\r\n                </tr>\r\n                <tr>\r\n                    <th style=\"width:20rem;\">Number </th>\r\n                    <th style=\"width:30rem;\">Name</th>\r\n                    <th style=\"width:15rem;\">Status</th>\r\n                </tr>\r\n            </thead>\r\n            <tbody>\r\n                <tr id=\"selectCourse\" click.delegate=\"editACourse($index, $event)\"  repeat.for=\"course of people.coursesArray\">\r\n                    <td data-title=\"name\">${course.number} </td>\r\n                    <td data-title=\"insitution\">${course.name}</td>\r\n                    <td data-tile=\"phone\">${course.active | translateStatus}</td>\r\n                </tr>\r\n            </tbody>\r\n        </table>\r\n\r\n        <div class=\"row\" show.bind=\"courseSelected\">\r\n            <div class=\"panel panel-default col-md-12\">\r\n                <div class=\"panel-body\">\r\n                    <div class=\"bottomMargin\">\r\n                        <div class=\"bottomMargin list-group-item\">\r\n                            <span click.delegate=\"saveCourse()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Save\"><i class=\"fa fa-floppy-o fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n                            <span click.delegate=\"cancelEditCourse()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Cancel Changes\"><i class=\"fa fa-ban fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n                        </div>  \r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <input id=\"number\" value.bind=\"people.selectedCourse.number\" type=\"text\" placeholder=\"Course Number\"\r\n                            class=\"form-control\"/>\r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <input id=\"name\" value.bind=\"people.selectedCourse.name\" type=\"text\" placeholder=\"Course Name\"\r\n                            class=\"form-control\"/>\r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <div class=\"checkbox\">\r\n                            <label class=\"pull-left\">\r\n                                <input id=\"activeProduct\" checked.bind=\"people.selectedCourse.active\" type=\"checkbox\"> Active\r\n                            </label>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                \r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/Customers/components/Password.html":
/*!**************************************************************!*\
  !*** ./src/modules/admin/Customers/components/Password.html ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div class=\"topMargin\">\r\n        <div class=\"panel panel-default col-md-12\">\r\n            <div class=\"panel-body\">\r\n                <div class=\"bottomMargin\">\r\n                        <div class=\"bottomMargin list-group-item\">\r\n                            <span click.delegate=\"savePassword()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Save\"><i class=\"fa fa-floppy-o fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n                            <span click.delegate=\"cancelEditPassword()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Cancel Changes\"><i class=\"fa fa-ban fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n                        </div>  \r\n                    </div>\r\n                <div class=\"form-group\">\r\n                    <input id=\"newPassword\" type=\"text\" placeholder=\"New Password\"\r\n                        class=\"form-control topMargin\"\r\n                        value.bind=\"newPassword\" />\r\n                </div>\r\n                <!--\r\n                <div class=\"form-group\">\r\n                    <input id=\"password_repeat\" type=\"text\" placeholder=\"Repeat Password\"\r\n                        class=\"form-control topMargin\"\r\n                        value.bind=\"newPassword_repeat\" />\r\n                </div>\r\n                -->\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/Customers/components/Roles.html":
/*!***********************************************************!*\
  !*** ./src/modules/admin/Customers/components/Roles.html ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div class=\"topMargin\">\r\n         <form>\r\n      <div class=\"col-md-5 topMargin\">\r\n        <label>Roles</label>\r\n        <div class=\"well well2 overFlow\" style=\"height:400px;\">\r\n            <ul class=\"list-group\">\r\n              <button click.trigger=\"selectRole($event, role)\" type=\"button\" repeat.for=\"role of filteredArray\" id=\"${role.role}\"\r\n                      class=\"list-group-item\">${role.label}</button>\r\n            </ul>\r\n        </div>\r\n      </div>\r\n      <div class=\"col-md-5 topMargin col-md-offset-1\">\r\n        <label>Assigned Roles</label>\r\n        <div class=\"well well2 overFlow\" style=\"height:400px;\">\r\n          <ul class=\"list-group\">\r\n            <button click.trigger=\"removeRole($index, role)\" type=\"button\" repeat.for=\"role of people.selectedPerson.roles\" id=\"${role}\"\r\n                    class=\"list-group-item\">${role | lookupValue:config.ROLES:'role':'label'}</button>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </form>\r\n</template";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/Customers/components/composeEmail.html":
/*!******************************************************************!*\
  !*** ./src/modules/admin/Customers/components/composeEmail.html ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div show.bind=\"composeEmailPanel\" class=\"panel panel-info leftMargin rightMargin topMargin bottomMargin\">\r\n        <div class=\"panel-body\">\r\n            <div class=\"list-group-item col-md-12 topMargin\">\r\n                <span click.delegate=\"sendTheBulkEmail()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n                    data-placement=\"bottom\" title=\"\" data-original-title=\"Send Email\"><i class=\"fa fa-floppy-o fa-lg fa-border\"\r\n                        aria-hidden=\"true\"></i></span>\r\n                <span click.delegate=\"cancel()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n                    data-placement=\"bottom\" title=\"\" data-original-title=\"Cancel\"><i class=\"fa fa-ban fa-lg fa-border\"\r\n                        aria-hidden=\"true\"></i></span>\r\n            </div>\r\n            <div class=\"col-lg-10 col-lg-offset-1 topMargin\">\r\n                <input value.bind=\"email.subject\" class=\"form-control\" placeholder=\"Subject\" />\r\n                <div class=\"topMargin\">\r\n                    <editor value.bind=\"email.MESSAGE\" height=\"250\" toolbar.bind=\"toolbar\"></editor>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/Customers/components/emailTable.html":
/*!****************************************************************!*\
  !*** ./src/modules/admin/Customers/components/emailTable.html ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div class='col-lg-10 col-lg-offset-1 bottomMargin'>\r\n        <div id=\"no-more-tables\">\r\n            <table class=\"table table-striped table-hover cf\">\r\n                <thead class=\"cf\">\r\n                    <tr colspan='7'>\r\n                            <compose view=\"../../../../resources/elements/table-navigation-bar.html\"></compose>\r\n                    </tr>  \r\n                    <tr>\r\n                        <td colspan='7'>\r\n                            <span click.delegate=\"downloadInstExcel()\"  class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Export to Excel\"><i class=\"fa fa-download\" aria-hidden=\"true\"></i></span>\r\n                        </td>\r\n                    </tr>                          \r\n                    <tr>\r\n                        <th style=\"width:20rem;\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'lastName'})\">Name </span><i class=\"fa fa-sort\"></i></th>                              \r\n                        <th style=\"width:30rem;\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'institutionId.name'})\">Institution </span><i class=\"fa fa-sort\"></i></th>\r\n                        <th>Institution Status</th>\r\n                        <th style=\"width:15rem;\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'city'})\">City </span><i class=\"fa fa-sort\"></i></th>\r\n                        <th style=\"width:15rem;\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'institutionId.region'})\">Region </span><i class=\"fa fa-sort\"></i></th>\r\n                        <th style=\"width:20rem;\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'email'})\">Email </span><i class=\"fa fa-sort\"></i></th>\r\n                        <th>Role</th>\r\n                        <th>Person Status</th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody>\r\n                    <tr repeat.for=\"person of dataTable.displayArray\">\r\n                        <td  data-title=\"Name\">${person.firstName} ${person.lastName}</td>\r\n                        <td  data-title=\"Insitution\">${person.institutionId._id | lookupValue:people.institutionsArray:\"_id\":\"name\"}</td>\r\n                        <td data-title=\"Status\">${person.institutionId.institutionStatus | lookupValue:is4ua.institutonStatusArray:\"code\":\"description\"}</td>\r\n                        <td  data-tile=\"City\">${person.institutionId.city}</td>\r\n                        <td  data-tile=\"Region\">${person.institutionId.region}</td>\r\n                        <td  data-title=\"Email\">${person.email}</td>\r\n                        <td  data-title=\"Role\">${person.roles}</td>\r\n                        <td  data-title=\"Status\">${person.personStatus | lookupValue:is4ua.personStatusArray:\"code\":\"description\"}</td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/Customers/components/instAddress.html":
/*!*****************************************************************!*\
  !*** ./src/modules/admin/Customers/components/instAddress.html ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div class=\"row topMargin\">\r\n        <!-- Row 5 -->\r\n        <div class=\"col-lg-6 topMargin\">\r\n            <div class=\"col-sm-12 col-lg-12\">\r\n                <div class=\"form-group\">\r\n                    <div class=\"col-sm-10\">\r\n                        <label>Address 1</label>\r\n                        <input value.bind=\"people.selectedInstitution.address1\" id=\"editAddress1\" class=\"form-control\"\r\n                            placeholder=\"Address 1\" type=\"text\" />\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"col-sm-12 col-lg-12\">\r\n                <div class=\"form-group\">\r\n                    <div class=\"col-sm-10\">\r\n                        <label>Address 2</label>\r\n                        <input value.bind=\"people.selectedInstitution.address2\" id=\"editAddress1\" class=\"form-control\"\r\n                            placeholder=\"Address 2\" type=\"text\" />\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"col-sm-12 col-lg-12\">\r\n                <div class=\"form-group\">\r\n                    <div class=\"col-sm-10\">\r\n                        <label>City</label>\r\n                        <input value.bind=\"people.selectedInstitution.city\" id=\"editCity\" class=\"form-control\"\r\n                            placeholder=\"City\" type=\"text\" />\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"col-sm-12 col-lg-12\">\r\n                <div class=\"form-group\">\r\n                    <div class=\"col-sm-10\">\r\n                        <label>Region</label>\r\n                        <input value.bind=\"people.selectedInstitution.region\" id=\"editRegion\" class=\"form-control\"\r\n                            placeholder=\"Region\" type=\"text\" />\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"col-sm-12 col-lg-12\">\r\n                <div class=\"form-group\">\r\n                    <div class=\"col-sm-10\">\r\n                        <label>Postal Code</label>\r\n                        <input value.bind=\"people.selectedInstitution.postalCode\" id=\"editPostalCode\"\r\n                            class=\"form-control\" placeholder=\"Postal Code\" type=\"text\" />\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"col-sm-12 col-lg-12\">\r\n                <div class=\"form-group\">\r\n                    <div class=\"col-sm-10\">\r\n                        <label>Country</label>\r\n                        <input value.bind=\"people.selectedInstitution.country\" id=\"editCountry\" class=\"form-control\"\r\n                            placeholder=\"Country\" type=\"text\" />\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-lg-6 topMargin\">\r\n            <div class=\"col-sm-12 col-lg-12\">\r\n                <div class=\"form-group\">\r\n                    <div class=\"col-sm-10\">\r\n                        <label>URL</label>\r\n                        <input value.bind=\"people.selectedInstitution.url\" id=\"editCountry\" class=\"form-control\"\r\n                            placeholder=\"URL\" type=\"text\" />\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"col-sm-12 col-lg-12\">\r\n                <div class=\"form-group\">\r\n                    <div class=\"col-sm-10\">\r\n                        <label>Time Zone</label>\r\n                        <select value.bind=\"people.selectedInstitution.timeZone\" class=\"form-control\">\r\n                            <option value=\"\">Select an option</option>\r\n                            <option repeat.for=\"zone of config.TIMEZONES\" value=\"${zone}\">${zone}</option>\r\n                        </select>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"col-sm-12 col-lg-12\">\r\n                <div class=\"form-group\">\r\n                    <div class=\"col-sm-10\">\r\n                        <div class=\"checkbox\">\r\n                            <label>\r\n                                <input checked.bind=\"people.selectedInstitution.apj\" type=\"checkbox\"> APJ\r\n                            </label>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n\r\n        </div>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/Customers/components/instPeople.html":
/*!****************************************************************!*\
  !*** ./src/modules/admin/Customers/components/instPeople.html ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n            <div class=\"col-lg-10 col-offset-lg-1\" style=\"padding:15px;\">\r\n\r\n            <table id=\"personTable2\" class=\"table table-striped table-hover\">\r\n                <thead>\r\n                    <tr>\r\n                        <th style=\"width:20rem;\">Name</th>\r\n                        <th style=\"width:15rem;\">Phone</th>\r\n                        <th style=\"width:20rem;\">eMail</th>\r\n                        <th>Role</th>\r\n                        <th>Status</th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody>\r\n                    <tr repeat.for=\"person of people.instutionPeopleArray\" class=\"blackText\">\r\n                        <td data-title=\"name\">${person.firstName} ${person.lastName}</td>\r\n                        <td data-tile=\"phone\">${person.phone | phoneNumber}</td>\r\n                        <td data-title=\"email\">${person.email}</td>\r\n                        <td data-title=\"role\">${person.roles}</td>\r\n                        <td data-title=\"status\">${person.personStatus | lookupValue:is4ua.personStatusArray:\"code\":\"description\"}</td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/Customers/components/institutionDetails.html":
/*!************************************************************************!*\
  !*** ./src/modules/admin/Customers/components/institutionDetails.html ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <form class=\"form-horizontal\">\r\n        <div class=\"row\">\r\n            <div class=\"col-lg-3\">\r\n                <div class=\"form-group\">\r\n                    <div class=\"col-sm-10\">\r\n                        <label>Name *</label>\r\n                        <input value.bind=\"people.selectedInstitution.name\" id=\"editName\" class=\"form-control\"\r\n                            placeholder=\"Name\" type=\"text\" />\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"col-lg-3\">\r\n                <div class=\"form-group\">\r\n                    <div class=\"col-sm-10\">\r\n                        <label>Modifed Date</label>\r\n                        <flat-picker controlid=\"modifiedDate\" config.bind=\"dateConfig\" value.bind=\"people.selectedInstitution.dateModified\"></flat-picker>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"col-lg-3\">\r\n                <div class=\"form-group\">\r\n                    <div class=\"col-sm-10\">\r\n                        <label>Date Joined</label>\r\n                        <flat-picker controlid=\"joinDate\" config.bind=\"dateConfig\" value.bind=\"people.selectedInstitution.joinDate\"></flat-picker>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"col-lg-3\">\r\n                <div class=\"form-group\">\r\n                    <div class=\"col-sm-10\">\r\n                        <label>Date Dropped</label>\r\n                        <flat-picker controlid=\"dropDate\" config.bind=\"dateConfig\" value.bind=\"people.selectedInstitution.dropDate\"></flat-picker>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <!-- <div class=\"row\">\r\n            <div class=\"col-lg-3\">\r\n                <div class=\"form-group\">\r\n                    <div class=\"col-sm-10\">\r\n                        <label class=\"left\">Status *</label>\r\n                        <select value.bind=\"people.selectedInstitution.institutionStatus\" id=\"editInstitutonStatusArray\"\r\n                            class=\"form-control\">\r\n                            <option value=\"\">Select an option</option>\r\n                            <option repeat.for=\"status of is4ua.institutonStatusArray\" value=\"${status.code}\">${status.description}</option>\r\n                        </select>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div> -->\r\n    <div class=\"row\">\r\n        <compose view=\"./instAddress.html\"></compose>\r\n    </div>\r\n    </form>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/Customers/components/institutionsForm.html":
/*!**********************************************************************!*\
  !*** ./src/modules/admin/Customers/components/institutionsForm.html ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <style>\r\n        .menuButtons {\r\n            color:${config.ACTIVE_SUBMENU_COLOR}\r\n            ;\r\n            background-color:${config.BUTTONS_BACKGROUND}\r\n        }\r\n    </style>\r\n    <div class=\"list-group-item toolbar\">\r\n        <span click.delegate=\"back()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n            title=\"\" data-original-title=\"Back\"><i class=\"fa fa-arrow-left fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n        <span click.delegate=\"save()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n            title=\"\" data-original-title=\"Save\"><i class=\"fa fa-floppy-o fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n        <span click.delegate=\"cancel()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n            title=\"\" data-original-title=\"Cancel Changes\"><i class=\"fa fa-ban fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n        <span show.bind=\"!newInstitution\" click.delegate=\"delete()\" class=\"smallMarginRight\" bootstrap-tooltip\r\n            data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Delete\"><i class=\"fa fa-trash fa-lg fa-border text-danger\"\r\n                aria-hidden=\"true\"></i></span>\r\n    </div>\r\n\r\n    <div class=\"panel panel-default positionUnderToolbar\">\r\n        <div class=\"panel-body\">\r\n            <div class=\"smallTopMargin\">\r\n                <ul class=\"nav nav-tabs\" role=\"tablist\" id=\"tabList\">\r\n                    <li role=\"presentation\" class=\"active\"><a click.trigger=\"tab('home')\" id=\"Tabhome\" href=\"#home\" aria-controls=\"home\" role=\"tab\"\r\n                            data-toggle=\"tab\">Info</a></li>\r\n                    <!-- <li role=\"presentation\"><a click.trigger=\"tab('address')\" href=\"#address\" aria-controls=\"address\" role=\"tab\"\r\n                            data-toggle=\"tab\">Address</a></li> -->\r\n                    <li role=\"presentation\"><a click.trigger=\"tab('people')\" href=\"#people\" aria-controls=\"messages\" role=\"tab\"\r\n                            data-toggle=\"tab\">People</a></li>\r\n                    <!-- <li role=\"presentation\"><a click.trigger=\"tab('password')\" href=\"#password\" aria-controls=\"password\" role=\"tab\"\r\n                            data-toggle=\"tab\">Password</a></li> -->\r\n                </ul>\r\n\r\n                <div class=\"tab-content\" id='TabPanes'>\r\n                    <div role=\"tabpanel\" class=\"tab-pane fade in active\" id=\"home\">\r\n                        <compose view=\"./institutionDetails.html\"></compose>\r\n                    </div>\r\n                    <!-- <div role=\"tabpanel\" class=\"tab-pane fade\" id=\"address\">\r\n                        <compose view=\"./instAddress.html\"></compose>\r\n                    </div> -->\r\n                    <div role=\"tabpanel\" class=\"tab-pane fade\" id=\"people\">\r\n                        <compose view=\"./instPeople.html\"></compose>\r\n                    </div>\r\n                    <!-- <div role=\"tabpanel\" class=\"tab-pane fade\" id=\"password\">\r\n                        <compose view=\"./Password.html\"></compose>\r\n                    </div> -->\r\n                </div>\r\n            </div>\r\n\r\n            <!-- <compose view=\"./institutionDetails.html\"></compose>\r\n            <compose view=\"./institutionPanels.html\"></compose> -->\r\n        </div>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/Customers/components/institutionsTable.html":
/*!***********************************************************************!*\
  !*** ./src/modules/admin/Customers/components/institutionsTable.html ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div class=\"panel panel-info\">\r\n        <div class=\"panel-body\">\r\n            <div class=\"row\">\r\n                <div class='col-lg-10 col-lg-offset-1 bottomMargin'>\r\n                    <div id=\"no-more-tables\">\r\n\r\n                        <table class=\"table table-striped table-hover cf\">\r\n                            <thead class=\"cf\">\r\n                                <tr colspan='6'>\r\n                                    <compose view=\"../../../../resources/elements/table-navigation-bar.html\"></compose>\r\n                                </tr>\r\n                                <tr>\r\n                                    <td colspan='6'>\r\n                                        <span click.delegate=\"refresh()\" class=\"smallMarginRight\" bootstrap-tooltip\r\n                                            data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Refresh\"><i\r\n                                                class=\"fa fa-refresh\" aria-hidden=\"true\"></i></span>\r\n                                        <span click.delegate=\"new()\" class=\"smallMarginRight\" bootstrap-tooltip\r\n                                            data-toggle=\"tooltip\" |data-placement=\"bottom\" title=\"\" data-original-title=\"New\"><i\r\n                                                class=\"fa fa-plus\" aria-hidden=\"true\"></i></span>\r\n                                        <span click.delegate=\"downloadInstExcel()\" class=\"smallMarginRight\"\r\n                                            bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n                                            data-original-title=\"Export to Excel\"><i class=\"fa fa-download\" aria-hidden=\"true\"></i></span>\r\n                                        <span click.delegate=\"_clearFilters()\" class=\"smallMarginRight\"\r\n                                            bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n                                            data-original-title=\"Clear Filters\"><i class=\"fa fa-filter\" aria-hidden=\"true\"></i></span>\r\n                                     \r\n                                <span class=\"pull-right\" id=\"spinner\" innerhtml.bind=\"spinnerHTML\"></span>\r\n                              \r\n\r\n                                    </td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <th style=\"width:20rem;\"><span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'name'})\">Name\r\n                                        </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                                    <th style=\"width:10rem;\">Country</th>\r\n                                    <th style=\"width:10rem;\">Region</th>\r\n                                    <th style=\"width:30rem;\">Institution Type</th>\r\n                                    <th style=\"width:15rem;\">Member Type</th>\r\n                                    <th style=\"width:20rem;\">Member Since</th>\r\n                                    <th>Highest Degree</th>\r\n                                    <th>Status</th>\r\n                                </tr>\r\n                            </thead>\r\n                            <tbody>\r\n                                <tr>\r\n                                    <th>\r\n                                        <input value.bind=\"nameFilterValue\" input.delegate=\"dataTable.filterList(nameFilterValue, { type: 'text',  filter: 'nameFilter', lookupArray: '', lookupProperty: '', collectionProperty: 'name', displayProperty: 'fullnameName', matchProperty:'', compare:'match'} )\"\r\n                                            class=\"form-control\" />\r\n                                    </th>\r\n                                    <th>\r\n                                      <input value.bind=\"countryFilterValue\" input.delegate=\"dataTable.filterList(countryFilterValue, { type: 'text',  filter: 'countryFilter', lookupArray: '', lookupProperty: '', collectionProperty: 'country', displayProperty: 'country', matchProperty:'', compare:'match'} )\"\r\n                                          class=\"form-control\" />\r\n                                  </th>\r\n                                  <th>\r\n                                    <input value.bind=\"regionFilterValue\" input.delegate=\"dataTable.filterList(regionFilterValue, { type: 'text',  filter: 'regionFilter', lookupArray: '', lookupProperty: '', collectionProperty: 'region', displayProperty: 'region', matchProperty:'', compare:'match'} )\"\r\n                                        class=\"form-control\" />\r\n                                </th>\r\n                                    <th>\r\n                                        <select value.bind=\"institutionTypeFilter\" input.delegate=\"dataTable.filterList($event, { type: 'value',  filter: 'institutionTypeFilter',  collectionProperty: 'institutionType', displayProperty: 'institutionType', compare:'match'} )\"\r\n                                            class=\"form-control\">\r\n                                            <option value=\"\"></option>\r\n                                            <option repeat.for=\"institution of is4ua.institutionTypes\" value=\"${institution.code}\">${institution.description}</option>\r\n                                        </select>\r\n                                    </th>\r\n                                    <th>\r\n                                        <select value.bind=\"memberTypeFilter\" input.delegate=\"dataTable.filterList($event, { type: 'value',  filter: 'memberTypeFilter', lookupArray: '', lookupProperty: '', collectionProperty: 'memberType', displayProperty: 'memberType', matchProperty:'', compare:'match'} )\"\r\n                                            class=\"form-control\">\r\n                                            <option value=\"\"></option>\r\n                                            <option repeat.for=\"institution of is4ua.memberTypes\" value=\"${institution.code}\">${institution.description}</option>\r\n                                        </select>\r\n                                    </th>\r\n                                    <th></th>\r\n                                    <th>\r\n                                        <select value.bind=\"highestDegreeFilter\" input.delegate=\"dataTable.filterList($event, { type: 'value',  filter: 'highestDegreeFilter', lookupArray: '', lookupProperty: '', collectionProperty: 'highestDegree', displayProperty: 'highestDegree', matchProperty:'', compare:'match'} )\"\r\n                                            class=\"form-control\">\r\n                                            <option value=\"\"></option>\r\n                                            <option repeat.for=\"institution of is4ua.highestDegrees\" value=\"${institution.code}\">${institution.description}</option>\r\n                                        </select>\r\n                                    </th>\r\n                                    <th>\r\n                                        <select value.bind=\"institutionStatusFilter\" input.delegate=\"dataTable.filterList($event, { type: 'value',  filter: 'institutionStatusFilter', lookupArray: '', lookupProperty: '', collectionProperty: 'institutionStatus', displayProperty: 'institutionStatus', matchProperty:'', compare:'match'} )\"\r\n                                            class=\"form-control\">\r\n                                            <option value=\"\"></option>\r\n                                            <option repeat.for='status of is4ua.institutonStatusArray' value=\"${status.code}\">${status.description}</option>\r\n                                        </select>\r\n                                    </th>\r\n                                </tr>\r\n                                <tr class=\"clickable\" click.trigger=\"edit($index, $event)\" repeat.for=\"inst of dataTable.displayArray\">\r\n                                    <td data-title=\"Name\">${inst.name}</td>\r\n                                    <td data-tile=\"Country\">${inst.country}</td>\r\n                                    <td data-tile=\"Region\">${inst.region}</td>\r\n                                    <td data-title=\"Type\">${inst.institutionType |\r\n                                        lookupValue:is4ua.institutionTypes:\"code\":\"description\"}</td>\r\n                                    <td data-tile=\"Phone\">${inst.memberType |\r\n                                        lookupValue:is4ua.memberTypes:\"code\":\"description\"}</td>\r\n                                    <td data-title=\"Email\">${inst.joinDate | dateFormat:config.DATE_FORMAT_TABLE:true}</td>\r\n                                    <td data-title=\"Role\">${inst.highestDegree |\r\n                                        lookupValue:is4ua.highestDegrees:\"code\":\"description\"}</td>\r\n                                    <td data-title=\"Status\">${inst.institutionStatus |\r\n                                        lookupValue:is4ua.institutonStatusArray:\"code\":\"description\"}</td>\r\n                                </tr>\r\n                            </tbody>\r\n                        </table>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div> \r\n</template>\r\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/Customers/components/peopleForm.html":
/*!****************************************************************!*\
  !*** ./src/modules/admin/Customers/components/peopleForm.html ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <style>\r\n        .menuButtons {\r\n\t\t\tcolor: ${config.ACTIVE_SUBMENU_COLOR};\r\n\t\t\tbackground-color:${config.BUTTONS_BACKGROUND}\r\n        }\r\n    </style>\r\n    <div class=\"list-group-item toolbar\">\r\n        <span click.delegate=\"back()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n            title=\"\" data-original-title=\"Back\"><i class=\"fa fa-arrow-left fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n        <span click.delegate=\"save()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n            title=\"\" data-original-title=\"Save\"><i class=\"fa fa-floppy-o fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n        <span click.delegate=\"cancel()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n            title=\"\" data-original-title=\"Cancel Changes\"><i class=\"fa fa-ban fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n        <span show.bind=\"!newPerson\" click.delegate=\"delete()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n            data-placement=\"bottom\" title=\"\" data-original-title=\"Delete\"><i class=\"fa fa-trash fa-lg fa-border text-danger\"\r\n                aria-hidden=\"true\"></i></span>\r\n    </div>\r\n\r\n    <div class=\"panel panel-info positionUnderToolbar\">\r\n        <div class=\"panel-body\">\r\n            <div class=\"smallTopMargin\">\r\n                <ul class=\"nav nav-tabs\" role=\"tablist\" id=\"tabList\">\r\n                    <li role=\"presentation\" class=\"active\"><a click.trigger=\"tab('home')\" id=\"Tabhome\" href=\"#home\" aria-controls=\"home\" role=\"tab\"\r\n                            data-toggle=\"tab\">Home</a></li>\r\n                    <li role=\"presentation\"><a click.trigger=\"tab('roles')\" href=\"#assignments\" aria-controls=\"assignments\" role=\"tab\"\r\n                            data-toggle=\"tab\">Roles</a></li>\r\n                    <li role=\"presentation\"><a click.trigger=\"tab('courses')\" href=\"#courses\" aria-controls=\"messages\" role=\"tab\"\r\n                            data-toggle=\"tab\">Courses</a></li>\r\n                    <li role=\"presentation\"><a click.trigger=\"tab('password')\" href=\"#password\" aria-controls=\"password\" role=\"tab\"\r\n                            data-toggle=\"tab\">Password</a></li>\r\n                </ul>\r\n\r\n                <div class=\"tab-content\" id='TabPanes'>\r\n                    <div role=\"tabpanel\" class=\"tab-pane fade in active\" id=\"home\">\r\n                        <compose view=\"./peopleInfo.html\"></compose>\r\n                    </div>\r\n                    <div role=\"tabpanel\" class=\"tab-pane fade\" id=\"roles\">\r\n                        <compose view=\"./Roles.html\"></compose>\r\n                    </div>\r\n                    <div role=\"tabpanel\" class=\"tab-pane fade\" id=\"courses\">\r\n                        <compose view=\"./Courses.html\"></compose>\r\n                    </div>\r\n                    <div role=\"tabpanel\" class=\"tab-pane fade\" id=\"password\">\r\n                        <compose view=\"./Password.html\"></compose>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n<!-- \r\n            <div class=\"row bigTopMargin\">\r\n                <div class=\"col-lg-9 col-lg-offset-2\">\r\n                    <div class=\"row\">\r\n                        <div class=\"panel panel-default panelContrastColor\">\r\n                            <div class=\"panel-body\">\r\n                                <div class=\"col-lg-2\">\r\n                                    <div id=\"peopleFormListGroup\" class=\"list-group\">\r\n                                        <a class=\"${ $first ? 'menuButtons' : ''} list-group-item\" repeat.for=\"tab of tabs\"\r\n                                            href=\"\" class=\"list-group-item\" click.delegate=\"changeTab($event, $index)\">\r\n                                            <h4 id=\"${tab.id}\" class=\"list-group-item-heading\">${tab.id}</h4>\r\n                                        </a>\r\n                                    </div>\r\n                                </div>\r\n\r\n                                <div class=\"col-lg-10\">\r\n                                    <div class=\"tab-content\">\r\n                                        <div repeat.for=\"tab of tabs\" id=\"${tab.id + 'Tab'}\" class=\"${ $first ? 'tab-pane fade in active' : 'tab-pane fade' }\">\r\n                                            <compose view=\"${tabPath + tab.id + '.html'}\"></compose>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div> -->\r\n            <!-- </form> -->\r\n        <!-- </div>\r\n    </div> -->\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/Customers/components/peopleInfo.html":
/*!****************************************************************!*\
  !*** ./src/modules/admin/Customers/components/peopleInfo.html ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div class=\"row\">\r\n        <form class=\"form-horizontal topMargin\">\r\n            <div class=\"row\">\r\n                <div class=\"col-lg-1\">\r\n                    <div class=\"topMargin\">\r\n                        <img if.bind=\"profileHelpTicket.personId.file.fileName\" class=\"circular--square leftMargin\"\r\n                            src=\"${config.PERSON_IMAGE_DOWNLOAD_URL}/${people.selectedPerson.file.fileName}\"\r\n                            height=\"100\">\r\n                    </div>\r\n                    <div if.bind=\"!profileHelpTicket.personId.file.fileName\" style=\"height:100px;width:100px;\"\r\n                        innerhtml.bind=\"people.selectedPerson.email | gravatarUrl:100:6\"></div>\r\n                </div>\r\n                <div class=\"col-lg-11\">\r\n                    <form class=\"horizontal-form\">\r\n                        <div class=\"col-lg-4\">\r\n                            <div class=\"form-group\">\r\n                                <label for=\"editFirstName\" class=\"col-sm-3 control-label hideOnPhone\">First\r\n                                    Name *</label>\r\n                                <div class=\"col-sm-8\">\r\n                                    <input value.bind=\"people.selectedPerson.firstName\" id=\"editFirstName\"\r\n                                        class=\"form-control \" placeholder=\"First Name\" type=\"text\" />\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-lg-4\">\r\n                            <div class=\"form-group\">\r\n                                <label for=\"editMiddleName\" class=\"col-sm-3 control-label hideOnPhone\">Middle\r\n                                    Name</label>\r\n                                <div class=\"col-sm-8\">\r\n                                    <input value.bind=\"people.selectedPerson.middleName\" id=\"editMiddleName\"\r\n                                        class=\"form-control \" placeholder=\"Middle Name\" type=\"text\" />\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-lg-4\">\r\n                            <div class=\"form-group\">\r\n                                <label for=\"editLastName\" class=\"col-sm-3 control-label hideOnPhone\">Last\r\n                                    Name *</label>\r\n                                <div class=\"col-sm-8\">\r\n                                    <input value.bind=\"people.selectedPerson.lastName\" id=\"editLastName\" class=\"form-control \"\r\n                                        placeholder=\"Last Name\" type=\"text\" />\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-lg-4\">\r\n                            <div class=\"form-group\">\r\n                                <label for=\"editLastName\" class=\"col-sm-3 control-label hideOnPhone\">Nickname</label>\r\n                                <div class=\"col-sm-8\">\r\n                                    <input value.bind=\"people.selectedPerson.nickName\" id=\"editLastName\" class=\"form-control \"\r\n                                        placeholder=\"Nickname\" type=\"text\" />\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-lg-4\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"control-label col-sm-3 hideOnPhone\">Status *</label>\r\n                                <div class=\"col-sm-8\">\r\n                                    <select keypress.bind=\"setStatus($event)\" value.bind=\"people.selectedPerson.personStatus\"\r\n                                        id=\"editStatus\" class=\"form-control \" placeholder=\"Status\">\r\n                                        <option value=\"\">Select an option</option>\r\n                                        <option repeat.for='status of is4ua.personStatusArray' value=\"${status.code}\">${status.description}</option>\r\n                                    </select>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-lg-4\">\r\n                            <div class=\"form-group\">\r\n                                <label for=\"editMobile\" class=\"col-sm-3 control-label hideOnPhone\">Mobile</label>\r\n                                <div class=\"col-sm-8\">\r\n                                    <input if.bind=\"phoneMask\" class=\"form-control\" id=\"editMobile\" masked=\"value.bind: people.selectedPerson.mobile; mask.bind: phoneMask; placeholder: *\" />\r\n                                    <input if.bind=\"!phoneMask\" class=\"form-control\" id=\"editMobile\" value.bind=\"people.selectedPerson.mobile\" />\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-lg-4\">\r\n                            <div class=\"form-group\">\r\n                                <label for=\"editPhone\" class=\"col-sm-3 control-label hideOnPhone\">Phone *</label>\r\n                                <div class=\"col-sm-8\">\r\n                                    <input if.bind=\"phoneMask\" class=\"form-control\" id=\"editPhone\" masked=\"value.bind: people.selectedPerson.phone; mask.bind: phoneMask; placeholder: *\" />\r\n                                    <input if.bind=\"!phoneMask\" class=\"form-control\" id=\"editPhone\" value.bind=\"people.selectedPerson.phone\" />\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-lg-4\">\r\n                            <div class=\"form-group\">\r\n                                <label for=\"editPhone\" class=\"col-sm-3 control-label hideOnPhone\">Extension</label>\r\n                                <div class=\"col-sm-8\">\r\n                                    <input class=\"form-control\" id=\"editPhoneExt\" value.bind=\"people.selectedPerson.ext\" />\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-lg-4\">\r\n                            <div class=\"form-group\">\r\n                                <label for=\"editEmail\" class=\"col-sm-3 control-label hideOnPhone\">Email *</label>\r\n                                <div class=\"col-sm-8\">\r\n                                    <input value.bind=\"people.selectedPerson.email\" id=\"editEmail\" class=\"form-control \"\r\n                                        placeholder=\"Email\" type=\"text\" blur.trigger=\"checkEmail()\" />\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n\r\n                        <div class=\"col-lg-4\">\r\n                            <div class=\"form-group\">\r\n                                <label for=\"editInstitution\" class=\"col-sm-3 control-label\">Institution *</label>\r\n                                <div class=\"col-sm-8\">\r\n                                    <select change.trigger=\"changeInstitution()\" value.bind=\"institutionId\" id=\"editInstitution\"\r\n                                        class=\"form-control \" placeholder=\"Institution\">\r\n                                        <option value=\"\">Select an option</option>\r\n                                        <option repeat.for=\"institution of people.institutionsArray\" value=\"${institution._id}\">${institution.name}</option>\r\n                                    </select>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n\r\n                        <div class=\"col-lg-4\">\r\n                            <div class=\"form-group\">\r\n                                <label for=\"editSpecialization\" class=\"col-sm-3 control-label\">Specialization</label>\r\n                                <div class=\"col-sm-8\">\r\n                                    <select value.two-way=\"people.selectedPerson.personSpecialization\" id=\"editSpecialization\"\r\n                                        class=\"form-control \" placeholder=\"Specializatin\">\r\n                                        <option value=\"\">Select an option</option>\r\n                                        <option repeat.for=\"name of is4ua.specialArray\" value=\"${name.code}\">${name.description}</option>\r\n                                    </select>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-lg-4\">\r\n                            <div class=\"form-group\">\r\n                                <label for=\"editDepartment\" class=\"col-sm-3 control-label\">Department</label>\r\n                                <div class=\"col-sm-8\">\r\n                                    <select value.two-way=\"people.selectedPerson.departmentCategory\" id=\"editDepartment\"\r\n                                        class=\"form-control \" placeholder=\"Department\">\r\n                                        <option value=\"\">Select an option</option>\r\n                                        <option repeat.for=\"name of is4ua.deptArray\" value=\"${name.code}\">${name.description}</option>\r\n                                    </select>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                </div>\r\n        </form>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/Customers/components/peopleTable.html":
/*!*****************************************************************!*\
  !*** ./src/modules/admin/Customers/components/peopleTable.html ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div class=\"panel panel-info\">\r\n        <div class=\"panel-body\">\r\n            <div class=\"row\">\r\n                <div class=\"col-lg-12 col-sm-12\">\r\n                    <div class='row'>\r\n                        <div class='col-lg-10 col-lg-offset-1 bottomMargin'>\r\n                            <div id=\"no-more-tables\">\r\n                                <table class=\"table table-striped table-hover cf\">\r\n                                    <thead class=\"cf\">\r\n                                        <tr colspan='7'>\r\n                                            <compose view=\"../../../../resources/elements/table-navigation-bar.html\"></compose>\r\n                                        </tr>\r\n                                        <tr>\r\n                                        <tr>\r\n                                            <td colspan='7'>\r\n                                                <span click.delegate=\"refresh()\" class=\"smallMarginRight\"\r\n                                                    bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n                                                    title=\"\" data-original-title=\"Refresh\"><i class=\"fa fa-refresh\"\r\n                                                        aria-hidden=\"true\"></i></span>\r\n                                                <span click.delegate=\"new()\" class=\"smallMarginRight\" bootstrap-tooltip\r\n                                                    data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n                                                    data-original-title=\"New\"><i class=\"fa fa-plus\" aria-hidden=\"true\"></i></span>\r\n                                                <span click.delegate=\"downloadInstExcel()\" class=\"smallMarginRight\"\r\n                                                    bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n                                                    title=\"\" data-original-title=\"Export to Excel\"><i class=\"fa fa-download\"\r\n                                                        aria-hidden=\"true\"></i></span>\r\n                                                <span click.delegate=\"_clearFilters()\" class=\"smallMarginRight\"\r\n                                                    bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n                                                    title=\"\" data-original-title=\"Clear Filters\"><i class=\"fa fa-filter\"\r\n                                                        aria-hidden=\"true\"></i></span>\r\n                                                <!--\r\n                                    <span  click.delegate=\"archiveInactivePeople()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Archive Inactive\"><i class=\"fa fa-archive\" aria-hidden=\"true\"></i></span> \r\n                                    \r\n                                    <span class=\"pull-right\" id=\"spinner\" innerhtml.bind=\"spinnerHTML\"></span>\r\n                                    -->\r\n\r\n                                            </td>\r\n                                        </tr>\r\n                                        <tr>\r\n                                            <th style=\"width:20rem;\"><span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'fullName'})\">Name\r\n                                                </span><i class=\"fa fa-sort\"></i></th>\r\n                                            <th class=\"col-lg-1\"><span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'nickName'})\">Nickname\r\n                                                </span><i class=\"fa fa-sort\"></i></th>\r\n                                            <th style=\"width:30rem;\"><span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {type: 'custom', sorter: customInstitutionSorter, propertyName: 'intitutionId'})\">Institution\r\n                                                </span><i class=\"fa fa-sort\"></i></th>\r\n                                            <th style=\"width:15rem;\">Phone</th>\r\n                                            <th style=\"width:20rem;\"><span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'email'})\">Email\r\n                                                </span><i class=\"fa fa-sort\"></i></th>\r\n                                            <th>Role</th>\r\n                                            <th>Status</th>\r\n                                        </tr>\r\n                                    </thead>\r\n                                    <tbody>\r\n                                        <tr>\r\n                                            <th>\r\n                                                <input value.bind=\"nameFilterValue\" input.delegate=\"dataTable.filterList(nameFilterValue, { type: 'text',  filter: 'nameFilter', collectionProperty: 'fullName', displayProperty: 'fullName',  compare:'match'} )\"\r\n                                                    class=\"form-control\" />\r\n                                            </th>\r\n                                            <th>\r\n                                                <input value.bind=\"nickNameFilterValue\" input.delegate=\"dataTable.filterList(nickNameFilterValue, { type: 'text',  filter: 'nickNameFilter',  collectionProperty: 'nickName', displayProperty: 'nickName',  compare:'match'} )\"\r\n                                                    class=\"form-control\" />\r\n                                            </th>\r\n                                            <th>\r\n                                                <input value.bind=\"institutionFilterValue\" input.delegate=\"dataTable.filterList(institutionFilterValue, { type: 'custom',  filter: institutionCustomFilter, compare:'custom'} )\"\r\n                                                    class=\"form-control\" />\r\n                                            </th>\r\n                                            <th></th>\r\n                                            <th>\r\n                                                <input value.bind=\"emailFilterValue\" input.delegate=\"dataTable.filterList(emailFilterValue, { type: 'text',  filter: 'emailFilter',  collectionProperty: 'email', displayProperty: 'email',  compare:'match'} )\"\r\n                                                    class=\"form-control\" />\r\n                                            </th>\r\n                                            <th>\r\n                                                <input value.bind=\"roleFilter\" input.delegate=\"dataTable.filterList($event, { type: 'custom',  filter: customRoleFilter, compare:'custom'} )\"\r\n                                                    class=\"form-control\" />\r\n\r\n                                            </th>\r\n                                            <th>\r\n                                                <select value.bind=\"activeFilterValue\" change.delegate=\"filterActive()\"\r\n                                                    class=\"form-control \" id=\"personStatus\">\r\n                                                    <option value=\"\"></option>\r\n                                                    <option repeat.for='status of is4ua.personStatusArray' model.bind='status.code'>${status.description}</option>\r\n                                                </select>\r\n                                            </th>\r\n                                        </tr>\r\n                                        <tr class=\"clickable\" repeat.for=\"person of dataTable.displayArray\">\r\n                                            <td click.trigger=\"edit($index, $event)\" data-title=\"Name\">${person.firstName}\r\n                                                ${person.lastName}</td>\r\n                                            <td click.trigger=\"edit($index, $event)\" data-title=\"Nickname\">${person.nickName}</td>\r\n                                            <td click.trigger=\"edit($index, $event)\" data-title=\"Insitution\">${person.institutionId.name}</d>\r\n                                            <td click.trigger=\"edit($index, $event)\" data-tile=\"Phone\">${person.phone |\r\n                                                phoneNumber:config.PHONE_MASKS:person.country}</td>\r\n                                            <td class=\"dropbtn\" data-title=\"Email\" click.delegate=\"sendAnEmail(person._id)\">${person.email}</td>\r\n                                            <td click.trigger=\"edit($index, $event)\" data-title=\"Role\">${person.roles}</td>\r\n                                            <td class=\"dropbtn\" click.trigger=\"toggleStatus(person._id, person.personStatus)\"\r\n                                                data-title=\"Status\">${person.personStatus |\r\n                                                lookupValue:is4ua.personStatusArray:\"code\":\"description\"}\r\n                                                <span click.delegate=\"toggleStatus(person._id, person.personStatus)\"\r\n                                                    innerhtml=\"${person.personStatus | activateButton}\"></span>\r\n                                            </td>\r\n                                        </tr>\r\n                                    </tbody>\r\n                                </table>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/Customers/components/selectionForm.html":
/*!*******************************************************************!*\
  !*** ./src/modules/admin/Customers/components/selectionForm.html ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t<div class=\" list-group-item toolbar\">\r\n\t\t<span click.delegate=\"save()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n\t\t title=\"\" data-original-title=\"Save\"><i class=\"fa fa-floppy-o fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n\t\t<span click.delegate=\"_clearFilters()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n\t\t data-placement=\"bottom\" title=\"\" data-original-title=\"Clear Filters\"><i class=\"fa fa-filter\" aria-hidden=\"true\"></i></span>\r\n\t\t<span click.delegate=\"composeEmail()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n\t\t title=\"\" data-original-title=\"Send\"><i class=\"fa fa-paper-plane fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n\t</div>\r\n\t<div class=\"panel panel-info positionUnderToolbar\">\r\n\t\t<div class=\"panel-body\">\r\n\t\t\t<div class=\"row\">\r\n\t\t\t\t<compose view=\"./composeEmail.html\"></compose>\r\n\t\t\t\t<compose view=\"./selectionPanel.html\"></compose>\r\n\t\t\t\t<compose view=\"./emailTable.html\"></compose>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/Customers/components/selectionPanel.html":
/*!********************************************************************!*\
  !*** ./src/modules/admin/Customers/components/selectionPanel.html ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n  <div class=\"panel panel-info leftMargin rightMargin\">\r\n    <div class=\"panel-body\">\r\n      <div class=\"row\">\r\n        <div class=\"col-lg-2\">\r\n          <label class=\"control-label hideOnPhone\">Customer</label>\r\n          <input value.bind=\"CustomerFilter\"\r\n            input.delegate=\"dataTable.filterList(CustomerFilter, { type: 'custom',  filter: customerCustomFilter, compare:'custom'} )\"\r\n            class=\"form-control\" ref=\"nameFilter\" />\r\n        </div>\r\n        <div class=\"col-lg-2\">\r\n          <label class=\"control-labelhideOnPhone\">Status</label>\r\n          <select value.bind=\"activeFilterValue\" change.delegate=\"filterActive()\" class=\"form-control \"\r\n            id=\"personStatus\">\r\n            <option value=\"\"></option>\r\n            <option repeat.for='item of is4ua.personStatusArray' value='${item.code}'>${item.description}</option>\r\n          </select>\r\n        </div>\r\n        <div class=\"col-lg-2\">\r\n          <label>Include Roles</label>\r\n          <select class=\"form-control\" multiple label=\"Include Roles\" value.bind=\"roleFilterValue\" change.trigger=\"filterRoles()\">\r\n            <option model.bind=\"null\">Choose...</option>\r\n            <option repeat.for=\"role of config.ROLES\" model.bind=\"role.role\">${role.label}</option>\r\n          </select>\r\n\r\n          <!-- <multiselect label=\"Include Roles\" options.bind=\"roleSelect\" value.bind=\"roleFilterValue\"\r\n                        change.trigger=\"filterRoles()\"></multiselect> -->\r\n        </div>\r\n        <div class=\"col-lg-2\">\r\n          <label>Exclude Roles</label>\r\n          <select class=\"form-control\" multiple label=\"Exclude Roles\" value.bind=\"roleExcludeFilterValue\"\r\n            change.trigger=\"excludeRoles()\">\r\n            <option model.bind=\"null\">Choose...</option>\r\n            <option repeat.for=\"role of config.ROLES\" model.bind=\"role.role\">${role.label}</option>\r\n          </select>\r\n          <!-- <multiselect label=\"Exclude Roles\" options.bind=\"roleSelect\" value.bind=\"roleExcludeFilterValue\"\r\n                        change.trigger=\"excludeRoles()\"></multiselect> -->\r\n        </div>\r\n      </div>\r\n      <div class=\"row\">\r\n        <div class=\"col-lg-2\">\r\n          <label class=\"control-label hideOnPhone\">Institution</label>\r\n          <input value.bind=\"institutionFilterValue\"\r\n            input.delegate=\"dataTable.filterList(institutionFilterValue, { type: 'custom',  filter: institutionCustomFilter, compare:'custom'} )\"\r\n            class=\"form-control\" />\r\n        </div>\r\n        <div class=\"col-lg-2\">\r\n          <label class=\"control-labelhideOnPhone\">Status</label>\r\n          <select value.bind=\"institutionStatusValue\"\r\n            input.delegate=\"dataTable.filterList($event, { type: 'value',  filter: 'institutionStatusFilter', lookupArray: '', lookupProperty: '', collectionProperty: 'institutionId.institutionStatus', displayProperty: 'institutionId.institutionStatus', matchProperty:'', compare:'match'} )\"\r\n            class=\"form-control \" id=\"personStatus\">\r\n            <option value=\"\"></option>\r\n            <option repeat.for='item of is4ua.institutonStatusArray' value='${item.code}'>${item.description}</option>\r\n          </select>\r\n        </div>\r\n        <div class=\"col-lg-2\">\r\n          <label class=\"control-label hideOnPhone\">Institution Type</label>\r\n          <select value.bind=\"institutionTypeFilter\"\r\n            input.delegate=\"dataTable.filterList($event, { type: 'value',  filter: 'institutionTypeFilter', lookupArray: '', lookupProperty: '', collectionProperty: 'institutionId.institutionType', displayProperty: 'institutionId.institutionType', matchProperty:'', compare:'match'} )\"\r\n            class=\"form-control\">\r\n            <option value=\"\"></option>\r\n            <option repeat.for=\"institution of is4ua.institutionTypes\" value=\"${institution.code}\">\r\n              ${institution.description}</option>\r\n          </select>\r\n        </div>\r\n        <div class=\"col-lg-2\">\r\n          <multiselect label=\"Member Type\" options.bind=\"is4ua.memberTypes\" value.bind=\"memberTypeFilterValue\"\r\n            change.trigger=\"dataTable.filterList($event, { type: 'custom',  filter: memberTypeCustomFilter, compare:'custom'} )\">\r\n          </multiselect>\r\n        </div>\r\n        <div class=\"col-lg-2\">\r\n          <label class=\"control-label hideOnPhone\">Region</label>\r\n          <input value.bind=\"regionFilterValue\"\r\n            input.delegate=\"dataTable.filterList(regionFilterValue, { type: 'custom',  filter: regionCustomFilter, collectionProperty: 'institutionId.region', compare:'custom'} )\"\r\n            class=\"form-control\" ref=\"regionFilter\" />\r\n        </div>\r\n        <div class=\"col-lg-2\">\r\n          <label class=\"control-label hideOnPhone\">Country</label>\r\n          <input value.bind=\"countryFilterValue\"\r\n            input.delegate=\"dataTable.filterList(countryFilterValue, { type: 'custom',  filter: countryCustomFilter, compare:'custom'} )\"\r\n            class=\"form-control\" ref=\"countryFilter\" />\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>\r\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/Customers/customers.html":
/*!****************************************************!*\
  !*** ./src/modules/admin/Customers/customers.html ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <compose view='../../../resources/elements/submenu.html'></compose>\r\n    <div class=\"col-lg-12\">\r\n        <router-view></router-view>\r\n    </div>\r\n</template";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/Customers/editInstitutions.html":
/*!***********************************************************!*\
  !*** ./src/modules/admin/Customers/editInstitutions.html ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <span id=\"loading\">\r\n        <ul class=\"bokeh\">\r\n            <li></li>\r\n            <li></li>\r\n            <li></li>\r\n        </ul>\r\n    </span>\r\n    <div show.bind=\"dataTable.displayArray && dataTable.displayArray.length || initialLoaded\">\r\n        <div show.bind=\"!institutionSelected\" class=\"col-lg-12\">\r\n            <compose view=\"./components/institutionsTable.html\"></compose>\r\n        </div> <!-- Table Div -->\r\n        <div show.bind=\"institutionSelected\" class=\"col-lg-12\">\r\n            <compose view=\"./components/institutionsForm.html\"></compose>\r\n        </div> <!-- Form Div -->\r\n    </div> <!-- Panel Body -->\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/Customers/editPeople.html":
/*!*****************************************************!*\
  !*** ./src/modules/admin/Customers/editPeople.html ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <span id=\"loading\">\r\n        <ul class=\"bokeh\">\r\n            <li></li>\r\n            <li></li>\r\n            <li></li>\r\n        </ul>\r\n    </span>\r\n    <div show.bind=\"dataTable.displayArray && dataTable.displayArray.length || initialLoaded\">\r\n        <div show.bind=\"!personSelected && !bulkEmailSelected\" class=\"col-lg-12\">\r\n            <compose view=\"./components/peopleTable.html\"></compose>\r\n        </div>\r\n        <div show.bind=\"personSelected && !bulkEmailSelected\" class=\"col-lg-12\">\r\n            <compose view=\"./components/peopleForm.html\"></compose>\r\n        </div>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/documents/components/documentForm.html":
/*!******************************************************************!*\
  !*** ./src/modules/admin/documents/components/documentForm.html ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n        <div class='col-lg-10 col-lg-offset-1 bottomMargin'>\r\n            <div class=\"bottomMargin list-group-item panelContrastColor\">\r\n                <span click.delegate=\"back()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n                    data-original-title=\"Back\"><i class=\"fa fa-arrow-left fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n                <span click.delegate=\"save()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n                    data-original-title=\"Save\"><i class=\"fa fa-floppy-o fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n                <span click.delegate=\"cancel()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n                    title=\"\" data-original-title=\"Cancel Changes\"><i class=\"fa fa-ban fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n                <span show.bind=\"documents.selectedDocument.files && documents.selectedDocument.files.length\" click.delegate=\"delete()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n                    title=\"\" data-original-title=\"Delete\"><i class=\"fa fa-trash fa-lg fa-border text-danger\" aria-hidden=\"true\"></i></span>\r\n            </div>\r\n\r\n            <div class=\"panel panel-default\" style=\"background-color:ghostwhite;\">\r\n                <div class=\"panel-body\">\r\n                    <form class=\"form-horizontal topMargin\">\r\n                        <div class=\"row\">\r\n                            <div class=\"col-sm-12 col-lg-12\">\r\n                                <div class=\"form-group\">\r\n                                    <label for=\"activeDoc\" class=\"control-label col-sm-2 hideOnPhone\">Status</label>\r\n                                    <div class=\"col-sm-8\">\r\n                                        <div class=\"checkbox\">\r\n                                            <label class=\"pull-left\">\r\n                                                            <input id=\"activeDoc\" checked.bind=\"documents.selectedDocument.active\" type=\"checkbox\"> Active\r\n                                                        </label>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"row\">\r\n                            <div class=\"col-sm-12 col-lg-12\">\r\n                                <div class=\"form-group\">\r\n                                    <label for=\"editName\" class=\"col-sm-2 control-label hideOnPhone\">Name</label>\r\n                                    <div class=\"col-sm-8\">\r\n                                        <input value.bind=\"documents.selectedDocument.name\" id=\"editName\" class=\"form-control\" placeholder=\"Name\" type=\"text\" />\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"row\">\r\n                            <div class=\"col-sm-12 col-lg-12\">\r\n                                <div class=\"form-group\">\r\n                                    <label for=\"editDescription\" class=\"col-sm-2 control-label hideOnPhone\">Description</label>\r\n                                    <div class=\"col-sm-8\">\r\n                                        <input value.bind=\"documents.selectedDocument.description\" id=\"editDescription\" class=\"form-control \" placeholder=\"Description\"\r\n                                            type=\"text\" />\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"row\">\r\n                            <div class=\"col-lg-2 col-lg-offset-2\">\r\n                                <label class=\"btn btn-primary\">\r\n                                            Browse for files&hellip; <input type=\"file\" style=\"display: none;\" change.delegate=\"changeFiles()\" files.bind=\"files\">\r\n                                </label>\r\n                            </div>\r\n                            <div class=\"col-lg-6\">\r\n                                <ul show.bind=\"!uploading\" >\r\n                                    <li repeat.for=\"file of filesToUpload\" class=\"list-group-item\">${file.name}<span click.delegate=\"removeFile($index)\" class=\"pull-right\"><i class=\"fa fa-trash\" aria-hidden=\"true\"></i></span></li>\r\n                                </ul>\r\n                                <div show.bind=\"uploading\" class=\"progress progress-striped active\">\r\n                                    <div id=\"progressBar\" class=\"progress-bar\" style=\"width: 0%\"></div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-lg-6 col-lg-offset-2\">\r\n                            <div id=\"editFiles\"></div>\r\n                        </div>\r\n                    </form>\r\n                </div>\r\n            </div>\r\n            <div class=\"row topMargin\">\r\n                <div id=\"no-more-tables\">\r\n                    <table class=\"table table-striped table-hover cf\">\r\n                        <thead class=\"cf\">\r\n                            <tr>\r\n                                <th>Name</th>\r\n                                <th>Version</th>\r\n                                <th>Date Uploaded</th>\r\n                                <th>Uploaded By</th>\r\n                                <th>Status</th>\r\n                            </tr>\r\n                        </thead>\r\n                        <tbody>\r\n                            <tr repeat.for=\"item of documents.selectedDocument.files\">\r\n                                <td data-title=\"Name\"><a target=\"_blank\" href=\"${config.DOCUMENT_FILE_DOWNLOAD_URL}/${documents.selectedCat.code}/${documents.selectedDocument.name}/${item.fileName}\">${item.originalFilename}</a></td>\r\n                                <td data-title=\"Version\">${item.version}</td>\r\n                                <td data-title=\"Date Uploaded\">${item.dateUploaded | dateFormat:config.DATE_FORMAT_TABLE}</td>\r\n                                <td data-title=\"Person\">${item.personId | lookupValue:people.peopleArray:\"_id\":\"fullName\"}</td>\r\n                                <td data-title=\"Active\" click.trigger=\"toggleFileActive($index)\" innerhtml.bind='item.active | checkBox'></td>\r\n                                <td data-title=\"Delete\" click.trigger=\"deleteFile($index)\"><i class=\"fa fa-trash\"></i></td>\r\n                            </tr>\r\n                        </tbody>\r\n                    </table>\r\n                </div>\r\n            </div>\r\n    </div>\r\n\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/documents/components/documentsTable.html":
/*!********************************************************************!*\
  !*** ./src/modules/admin/documents/components/documentsTable.html ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div class='row'>\r\n        <div class='col-lg-10 col-lg-offset-1 bottomMargin'>\r\n            <compose view=\"../../../../resources/elements/table-navigation-bar.html\"></compose>\r\n            <div id=\"no-more-tables\">\r\n                <table class=\"table table-striped table-hover cf\">\r\n                    <thead class=\"cf\">\r\n                        <tr>\r\n                            <td colspan='6'>\r\n                                <span click.delegate=\"new()\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n                                    title=\"\" data-original-title=\"New Document\"><i class=\"fa fa-plus\" aria-hidden=\"true\"></i></span>\r\n                            </td>\r\n                        </tr>\r\n                        <tr>\r\n                            <th>Name </th>\r\n                            <th>Description</th>\r\n                            <th>Date Created</th>\r\n                        </tr>\r\n                    </thead>\r\n                    <tbody>\r\n                        <tr click.trigger=\"editDocument($index, $event)\" repeat.for=\"item of dataTable.displayArray\">\r\n                            <td data-title=\"name\">${item.name}</td>\r\n                            <td data-title=\"description\">${item.description}</td>\r\n                            <td data-title=\"createdDate\">${item.createdDate | dateFormat:config.DATE_FORMAT_TABLE}</td>\r\n                        </tr>\r\n                    </tbody>\r\n                </table>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/documents/documents.html":
/*!****************************************************!*\
  !*** ./src/modules/admin/documents/documents.html ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <style>\r\n        .menuButtons {\r\n\t\t\tcolor: ${config.ACTIVE_SUBMENU_COLOR};\r\n\t\t\tbackground-color:${config.BUTTONS_BACKGROUND}\r\n        }\r\n    </style>\r\n    <compose view='../../../resources/elements/submenu.html'></compose>\r\n\r\n    <div class=\"panel panel-default\">\r\n        <div class=\"panel-body\">\r\n            <div class=\"row\">\r\n                <div class=\"col-lg-3\">\r\n                    <div class=\"bottomMargin list-group-item panelContrastColor\">\r\n                        <span click.delegate=\"newCategory()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n                            title=\"\" data-original-title=\"New Category\"><i class=\"fa fa-plus fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n                        <span disabled.bind=\"showDocuments\" click.delegate=\"editCategory()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n                            title=\"\" data-original-title=\"Edit\"><i class=\"fa fa-pencil fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n                        <span click.delegate=\"refresh()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n                            title=\"\" data-original-title=\"Refresh\"><i class=\"fa fa-refresh fa-lg fa-border\" aria-hidden=\"true\"></i></span> \r\n                    </div>\r\n                    <div show.bind=\"categoryForm\">\r\n                        <div class=\"panel panel-default\" style=\"background-color:ghostwhite;\">\r\n                            <div class=\"panel-body\">\r\n                                <div class=\"bottomMargin\">\r\n                                    <div class=\"bottomMargin list-group-item\">\r\n                                        <span click.delegate=\"backCategory()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" \r\n                                            title=\"\" data-original-title=\"Back\"><i class=\"fa fa-arrow-left fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n                                        <span click.delegate=\"saveCategory()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n                                            title=\"\" data-original-title=\"Save\"><i class=\"fa fa-floppy-o fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n                                        <span click.delegate=\"cancelEditCategory()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n                                            title=\"\" data-original-title=\"Cancel Changes\"><i class=\"fa fa-ban fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n                                                                                    \r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"form-group\">\r\n                                    <input id=\"name\" value.bind=\"documents.selectedCat.description\" type=\"text\" placeholder=\"Category Name\" class=\"form-control\"/>\r\n                                </div>\r\n                            </div>\r\n\r\n                        </div>\r\n                    </div>\r\n                    <div show.bind=\"!categoryForm\">\r\n                        <label>Available Categories</label>\r\n                        <div class=\"well well2 overFlow\" style=\"height:600px;\">\r\n                            <input class=\"form-control\" value.bind=\"filter\" input.trigger=\"filterList()\" placeholder=\"Filter Categories\" />\r\n                            <ul id=\"categoryList\" class=\"list-group\">\r\n                                <button click.trigger=\"typeChanged($index, $event)\" type=\"button\" repeat.for=\"type of filteredDocumentArray\" id=\"${type.code}\" class=\"${ $first ? 'menuButtons' : ''} list-group-item\">${type.description}</button>\r\n                            </ul>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n\r\n                <div show.bind=\"showDocuments\" class=\"col-lg-9\" >\r\n                    <div class='col-lg-10 col-lg-offset-1 bottomMargin'>\r\n                        <h3>${documents.selectedCat.description}</h3>\r\n                        <h5>${displayTitle}</h5>\r\n                    </div>\r\n                    <div show.bind=\"showDocumentForm\">\r\n                        <compose view=\"./components/documentForm.html\"></compose>\r\n                    </div>\r\n                    <compose show.bind=\"!showDocumentForm\" view=\"./components/documentsTable.html\"></compose>\r\n                </div>\r\n            </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ })

}]);
//# sourceMappingURL=app-2ef08ec8.3500a8c9766278316f66.bundle.js.map