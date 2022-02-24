(self["webpackChunkclient"] = self["webpackChunkclient"] || []).push([["app-9a8b795a"],{

/***/ "app":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _class; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var aurelia_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-router */ 6433);
var _dec, _class2;




var _class = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(aurelia_router__WEBPACK_IMPORTED_MODULE_1__.Router), _dec(_class2 = /*#__PURE__*/function () {
  function _class2(router) {
    this.router = router;
  }

  var _proto2 = _class2.prototype;

  _proto2.configureRouter = function configureRouter(config, router) {
    this.router = router;
    config.title = 'UCCSS';
    config.map([{
      route: ['', 'home'],
      moduleId: './modules/home/home',
      name: 'Home',
      settings: {
        auth: false,
        roles: []
      }
    }, {
      route: 'about',
      moduleId: './modules/home/about',
      name: 'About',
      settings: {
        auth: false,
        roles: []
      },
      title: 'About the UCC'
    }, {
      route: 'register',
      moduleId: './modules/home/register',
      name: 'Register',
      settings: {
        auth: false,
        roles: []
      }
    }, {
      route: 'user',
      moduleId: './modules/user/user',
      name: 'User',
      settings: {
        auth: true,
        roles: []
      }
    }, // {
    //   route: 'profile',
    //   moduleId: './modules/user/profile',
    //   name: 'Profile',
    //   settings: { auth: true, roles: [] }
    // },
    // {
    //   route: 'resetPassword/:id',
    //   moduleId: './modules/user/resetPassword',
    //   name: 'ResetPassword',
    //   settings: { auth: false, roles: [] }
    // },
    {
      route: 'system',
      moduleId: './modules/admin/system/system',
      name: 'system',
      settings: {
        auth: true,
        roles: []
      }
    }, {
      route: 'customers',
      moduleId: './modules/admin/Customers/customers',
      name: 'customers',
      settings: {
        auth: true,
        roles: []
      }
    }, {
      route: 'inventory',
      moduleId: './modules/admin/inventory/editInventory',
      name: 'inventory',
      settings: {
        auth: true,
        roles: []
      }
    }, {
      route: 'site',
      moduleId: './modules/admin/site/site',
      name: 'site',
      settings: {
        auth: true,
        roles: []
      }
    }, {
      route: 'documents',
      moduleId: './modules/admin/documents/documents',
      name: 'documents',
      settings: {
        auth: true,
        roles: []
      }
    }, // { 
    //   route: 'notes',           
    //   moduleId: './modules/admin/notes/notes',            
    //   name: 'notes',          
    //   settings: { auth: true, roles: [] } 
    // },
    {
      route: 'facco',
      moduleId: './modules/facco/facco',
      name: 'facco',
      settings: {
        auth: true,
        roles: []
      }
    }, {
      route: 'support',
      moduleId: './modules/user/support/support',
      name: 'support',
      settings: {
        auth: true,
        roles: []
      }
    }, // {
    //   route: 'analytics',
    //   moduleId: './modules/analytics/analytics',          
    //   name: 'analytics',     
    //   settings: { auth: true, roles: [] } 
    // },
    {
      route: 'clientRequests',
      moduleId: './modules/user/requests/clientRequests',
      name: 'clientRequests',
      settings: {
        auth: true,
        roles: []
      }
    }, {
      route: 'techHt/:HTNumber',
      moduleId: './modules/tech/support/support',
      name: 'techHt',
      settings: {
        auth: true,
        roles: []
      }
    }, {
      route: 'techRq',
      moduleId: './modules/tech/requests/techRequests',
      name: 'techRq',
      settings: {
        auth: true,
        roles: []
      }
    } // { 
    //   route: 'chapters',          
    //   moduleId: './modules/social/chapters',                
    //   name: 'chapters',          
    //   settings: { auth: true, roles: [] }
    //  },
    // { 
    //   route: 'htNote/:id',      
    //   moduleId: './modules/tech/support/support',         
    //   name: 'htNote',         
    //   settings: { auth: true, roles: [] } 
    // },
    // { 
    //   route: 'techNotes',      
    //   moduleId: './modules/techNotes/techNotes',         
    //   name: 'techNotes',         
    //   settings: { auth: true, roles: [] } 
    // },
    // { 
    //   route: 'accprodrequests',      
    //   moduleId: './modules/acc/accRequests',         
    //   name: 'accprodrequests',         
    //   settings: { auth: true, roles: [] } 
    // },
    // { 
    //   route: 'acchelptickets',      
    //   moduleId: './modules/acc/accHT',         
    //   name: 'acchelptickets',         
    //   settings: { auth: true, roles: [] } 
    // },
    // { 
    //   route: 'accinstitutions',      
    //   moduleId: './modules/acc/accInstitutions',         
    //   name: 'accinstitutions',         
    //   settings: { auth: true, roles: [] } 
    // },
    // { 
    //   route: 'accinvoices',      
    //   moduleId: './modules/acc/accInvoice',         
    //   name: 'accinvoices',         
    //   settings: { auth: true, roles: [] } 
    // }
    ]);
  };

  return _class2;
}()) || _class2);



var AuthorizeStep = /*#__PURE__*/function () {
  function AuthorizeStep() {}

  var _proto = AuthorizeStep.prototype;

  _proto.run = function run(navigationInstruction, next) {
    if (navigationInstruction.getAllInstructions().some(function (i) {
      return i.config.settings.auth;
    })) {
      var role = sessionStorage.getItem('role');

      if (!role) {
        return next.cancel(new Redirect('home'));
      }
    }

    return next();
  };

  return AuthorizeStep;
}();

/***/ }),

/***/ 1666:
/*!*********************************!*\
  !*** ./src/config/appConfig.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppConfig": function() { return /* binding */ AppConfig; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var aurelia_http_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-http-client */ 3139);
var _dec, _class;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



var AppConfig = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(aurelia_http_client__WEBPACK_IMPORTED_MODULE_1__.HttpClient), _dec(_class = /*#__PURE__*/function () {
  // BASE_URL = "https://uccsstest.ucc.uwm.edu/api/";
  // IMG_DOWNLOAD_URL = "https://uccsstest.ucc.uwm.edu/img/";  
  // BASE_URL = this.HOST + "/api/";
  // IMG_DOWNLOAD_URL = this.HOST + '/img/';  
  //Name used for sandbox requests
  //Wildcard in id templates
  //Help Ticket parameters
  // HELP_TICKET_TYPES = [
  //       {
  //         "code": 0,
  //         "description": "Help with My Product Requests",
  //         "message": "This includes any problems with requested or assigned products in current sessions. </p>",
  //         "showSubtypes": true,
  //         "subtypes": [
  //             {
  //                 "code": this.HELP_TICKET_CURRICULUM_TYPE,
  //                 "description": "Issues with curriculum exercises",
  //                 "message": "Select the product for which you need help and provide as much information about the curriculum as possible.  <br><br><p>If you can, upload screen shots of error messages.</p>",
  //                 "clientRequired": true,
  //                 "appsRequired": false,
  //                 "show": false
  //             },
  //             {
  //                 "code": this.HELP_TICKET_PASSWORD_RESET_TYPE,
  //                 "description": "Reset Passwords",
  //                 "message": "Select the product and enter the user ids of the passwords you need reset.<br><br><p>If the user ids are on a ERP system, you can reset passwords and unlock user accounts in transaction SU01.</p>",
  //                 "clientRequired": true,
  //                 "appsRequired": false,
  //                 "show": false
  //             },
  //             {
  //                 "code": this.HELP_TICKET_LOGON_TYPE,
  //                 "description": "Other logon or connection problems",
  //                 "message": "Select the product and describe the problem as thouroughly as possible.",
  //                 "clientRequired": true,
  //                 "appsRequired": false,
  //                 "show": false
  //             },
  //             {
  //                 "code": this.HELP_TICKET_CLIENT_REFRESH_TYPE,
  //                 "description": "Refresh an ERPSim client",
  //                 "message": "Select the client to refresh",
  //                 "clientRequired": true,
  //                 "appsRequired": false,
  //                 "show": false
  //             },
  //             {
  //                 "code": this.HELP_TICKET_CLIENT_OTHER_TYPE,
  //                 "description": "Other",
  //                 "message": "Select the product request and enter a description of the problem.",
  //                 "clientRequired": true,
  //                 "appsRequired": false,
  //                 "show": false
  //             }
  //         ]
  //     },
  //     {
  //         "code": 1,
  //         "description": "Desktop Application Help",
  //         "message": "This includes applications other than those hosted at the UCC.  Select the product from the drop down list and provide as much information about the error as possible.<br><br><p>If possible upload screen shots that show the problem.</p>",
  //         "clientRequired": false,
  //         "appsRequired": true,
  //         "show": false,
  //         "showSubtypes": false,
  //         "subtypes": [
  //             {
  //                 "code": this.HELP_TICKET_APP_ERROR_TYPE,
  //                 "description": "Application or Installation problems",
  //                 "message": "Select the application software and provide as many details as possible.",
  //                 "clientRequired": false,
  //                 "appsRequired": true,
  //                 "show": false
  //             },
  //             {
  //                 "code": this.HELP_TICKET_APP_LICENSE_TYPE,
  //                 "description": "License keys for analytics software",
  //                 "message": "Select the application software.",
  //                 "clientRequired": false,
  //                 "appsRequired": true,
  //                 "show": false
  //             },
  //             {
  //                 "code": this.HELP_TICKET_APP_OTHER_TYPE,
  //                 "description": "Other issuew with software",
  //                 "message": "Select the application software.",
  //                 "clientRequired": false,
  //                 "appsRequired": true,
  //                 "show": false
  //             }
  //         ]
  //     },
  //     {
  //         "code": 2,
  //         "description": "Other",
  //         "message": "Use this for any issue that doesn't fall easily into one of the other categories.",
  //         "clientRequired": false,
  //         "appsRequired": false,
  //         "show": false,
  //         "showSubtypes": false,
  //         "subtypes": [
  //             {
  //                 "code": this.HELP_TICKET_OTHER_UA_TYPE,
  //                 "description": "Questions about the UA or UA Learning Hub",
  //                 "message": "Select the application software and provide as many details as possible.",
  //                 "clientRequired": false,
  //                 "appsRequired": false,
  //                 "show": false
  //             },
  //             {
  //                 "code": this.HELP_TICKET_OTHER_UCCSS_TYPE,
  //                 "description": "Questions about the UCCSS or faculy accounts",
  //                 "message": "Select the application software.",
  //                 "clientRequired": false,
  //                 "appsRequired": false,
  //                 "show": false
  //             },
  //             {
  //                 "code": this.HELP_TICKET_OTHER_CURRICULUM_TYPE,
  //                 "description": "General questions on UA curriculum",
  //                 "message": "Select the application software.",
  //                 "clientRequired": false,
  //                 "appsRequired": false,
  //                 "show": false
  //             },
  //             {
  //                 "code": this.HELP_TICKET_OTHER_TYPE,
  //                 "description": "Other questions",
  //                 "message": "Select the application software.",
  //                 "clientRequired": false,
  //                 "appsRequired": false,
  //                 "show": false
  //             }
  //         ]
  //     }
  // ];
  //Message types
  function AppConfig(http) {
    this.HOST = location.origin;
    this.DOWNLOAD_URL = this.HOST + '/uploadedFiles';
    this.BASE_URL = "http://localhost/api/";
    this.IMG_DOWNLOAD_URL = "http://localhost/img/";
    this.isMobile = false;
    this.UCC_PACKAGE_PERCENTAGE = .5;
    this.HELPTICKET_FILE_DOWNLOAD_URL = this.HOST + "/uploadedFiles/helpTickets";
    this.PRODUCT_FILE_DOWNLOAD_URL = this.HOST + "/uploadedFiles/productFiles";
    this.DOWNLOAD_FILE_DOWNLOAD_URL = this.HOST + '/uploadedFiles/downloads';
    this.DOCUMENT_FILE_DOWNLOAD_URL = this.HOST + '/uploadedFiles/documents';
    this.TECHNOTE_FILE_DOWNLOAD_URL = this.HOST + '/uploadedFiles/techNotes';
    this.DOCUMENT_FILE_CURRICULUM_URL = this.HOST + '/uploadedFiles/curriculum';
    this.SITE_FILE_DOWNLOAD_URL = this.HOST + '/uploadedFiles/site/';
    this.PERSON_IMAGE_DOWNLOAD_URL = this.HOST + '/uploadedFiles/peopleImages';
    this.INSTITUTIONS_ACTIVE = '01';
    this.ACTIVE_PERSON = "01";
    this.INACTIVE_PERSON = "02";
    this.PHONE_MASKS = [{
      country: 'US',
      mask: '999-999-9999'
    }, {
      country: 'CA',
      mask: '999-999-9999'
    }, {
      country: 'BR',
      mask: '99 99999 9999'
    }, {
      country: 'CO',
      mask: '9999999999999'
    }];
    this.ROLES = [{
      role: 'USER',
      label: 'User',
      UCConly: false,
      authLevel: 2
    }, {
      role: 'FACU',
      label: 'Faculty',
      UCConly: false,
      authLevel: 3
    }, {
      role: 'PROV',
      label: "Provisional",
      UCConly: false,
      authLevel: 1
    }, {
      role: 'LEGL',
      label: 'Legal',
      UCConly: false,
      authLevel: 2
    }, {
      role: 'BUSI',
      label: 'Billing',
      UCConly: false,
      authLevel: 2
    }, {
      role: 'PRIM',
      label: 'Primary',
      UCConly: false,
      authLevel: 4
    }, {
      role: 'TECH',
      label: 'Technical',
      UCConly: false,
      authLevel: 2
    }, {
      role: "ACCT",
      label: "ACC",
      UCCOnly: false,
      authLevel: 5
    }, {
      role: 'UCCT',
      label: 'UCC Technical Staff',
      UCConly: true,
      authLevel: 8
    }, {
      role: 'UCCA',
      label: 'UCC Admin Staff',
      UCConly: true,
      authLevel: 6
    }, {
      role: 'UCSA',
      label: 'UCCSS Admin',
      UCConly: true,
      authLevel: 11
    }, {
      role: 'BLOG',
      label: 'Blog Author',
      UCConly: false,
      authLevel: 2
    }, {
      role: "TMAN",
      label: "Director",
      UCConly: true,
      authLevel: 11
    }, {
      role: "EDIR",
      label: "Executive Director",
      UCConly: true,
      authLevel: 11
    }, {
      role: "TDIR",
      label: "Technical Director",
      UCConly: true,
      authLevel: 11
    }, {
      role: "TMGR",
      label: "Technical Manager",
      UCConly: true,
      authLevel: 11
    }, {
      role: "STUT",
      label: "Student Worker",
      UCConly: true,
      authLevel: 8
    }, {
      role: "UAST",
      label: "UA Staff",
      UCConly: false,
      authLevel: 7
    }];
    this.UCC_ROLE = 6;
    this.UCC_TECH_ROLE = 8;
    this.UA_ROLE = 7;
    this.ACC_ROLE = 5;
    this.USER_ROLE = 4;
    this.PROV_USER = 1;
    this.rowOptions = [5, 10, 15, 20, 50];
    this.defaultPageSize = 20;
    this.systemTypes = ['Switch', 'Router', 'Server', 'Storage', 'Other'];
    this.SESSION_STATUSES = ["Closed", "Active", "Requests", "Next"];
    this.ASSIGNED_REQUEST_CODE = 2;
    this.UNASSIGNED_REQUEST_CODE = 1;
    this.UPDATED_REQUEST_CODE = 3;
    this.CUSTOMER_ACTION_REQUEST_CODE = 4;
    this.CANCELLED_REQUEST_CODE = 5;
    this.PROVISIONAL_REQUEST_CODE = 6;
    this.REPLIED_REQUEST_CODE = 7;
    this.RETIRED_REQUEST_CODE = 8;
    this.REQUEST_STATUS = [{
      code: this.UNASSIGNED_REQUEST_CODE,
      description: 'Unassigned',
      status: ""
    }, {
      code: this.ASSIGNED_REQUEST_CODE,
      description: 'Assigned',
      status: "assign"
    }, {
      code: this.UPDATED_REQUEST_CODE,
      description: 'Updated',
      status: "success"
    }, {
      code: this.CUSTOMER_ACTION_REQUEST_CODE,
      description: 'Customer Action',
      status: "warning"
    }, {
      code: this.CANCELLED_REQUEST_CODE,
      description: 'Cancelled',
      status: ""
    }, {
      code: this.PROVISIONAL_REQUEST_CODE,
      description: 'Provisional',
      status: ""
    }, {
      code: this.REPLIED_REQUEST_CODE,
      description: 'Replied',
      status: "danger"
    }, {
      code: this.RETIRED_REQUEST_CODE,
      description: 'Retired',
      status: "danger"
    }];
    this.SANDBOX_ID = 'a1a1a1a1a1a1a1a1a1a1a1a1';
    this.ID_WILDCARD = "#";
    this.SANDBOX_NAME = "Trial Client";
    this.FIRST_DEFAULT_ID = 1;
    this.FACULTY_ID_BUFFER = 2;
    this.DEFAULT_FACULTY_IDS = 2;
    this.ASSIGNED_CLIENT_CODE = 4;
    this.UNASSIGNED_CLIENT_CODE = 1;
    this.SHARED_CLIENT_CODE = 2;
    this.REFRESHED_CLIENT_CODE = 3;
    this.SANDBOX_CLIENT_CODE = 5;
    this.RETIRED_CLIENT_CODE = 6;
    this.CLIENT_STATUSES = [{
      code: this.ASSIGNED_CLIENT_CODE,
      description: "Assigned",
      OKToDelete: false,
      lock: true
    }, {
      code: this.REFRESHED_CLIENT_CODE,
      description: "Refresh",
      OKToDelete: true,
      lock: true
    }, {
      code: this.RETIRED_CLIENT_CODE,
      description: "Retired",
      OKToDelete: false,
      lock: false
    }, {
      code: this.SHARED_CLIENT_CODE,
      description: "Shared",
      OKToDelete: false,
      lock: false
    }, {
      code: 1,
      description: "Unassigned",
      OKToDelete: true,
      lock: false
    }, {
      code: this.SANDBOX_CLIENT_CODE,
      description: this.SANDBOX_NAME,
      OKToDelete: false,
      lock: false
    }];
    this.HELP_TICKET_OTHER_TYPE = "2";
    this.HELP_TICKET_APP_TYPE = 3;
    this.HELP_TICKET_PASSWORD_RESET_TYPE = "02";
    this.HELP_TICKET_CURRICULUM_TYPE = "01";
    this.HELP_TICKET_PRODUCT_REQUESTS = 0;
    this.HELP_TICKET_CLIENT_REFRESH_TYPE = 5;
    this.HELP_TICKET_LOGON_TYPE = 6;
    this.HELP_TICKET_CLIENT_OTHER_TYPE = 7;
    this.HELP_TICKET_APP_ERROR_TYPE = "1";
    this.HELP_TICKET_APP_LICENSE_TYPE = 9;
    this.HELP_TICKET_APP_OTHER_TYPE = 10;
    this.HELP_TICKET_OTHER_UA_TYPE = 11;
    this.HELP_TICKET_OTHER_UCCSS_TYPE = 12;
    this.HELP_TICKET_OTHER_CURRICULUM_TYPE = 13;
    this.HELP_TICKET_OTHER_TYPE = 99;
    this.HELP_TICKET_PRIORITIES = [{
      priority: "Low",
      message: "Not time sensitive",
      status: ""
    }, {
      priority: "Medium",
      message: "Time sensitive but doesn't require immediate attention",
      status: "warning"
    }, {
      priority: "Critical",
      message: "Critical, time sensitive issue",
      status: "danger"
    }];
    this.REFRESH_KEYWORDS = ["ERPSIM"];
    this.SYSTEM_TYPES = ["ERP", "HANA", "BO"];
    this.NEW_HELPTICKET_STATUS = 1;
    this.REVIEW_HELPTICKET_STATUS = 2;
    this.IN_PROCESS_HELPTICKET_STATUS = 3;
    this.CUSTOMER_ACTION_HELPTICKET_STATUS = 4;
    this.REPLIED_HELPTICKET_STATUS = 5;
    this.CLOSED_HELPTICKET_STATUS = 6;
    this.MY_HELPTICKET_STATUS = 7;
    this.HELP_TICKET_EMAIL_CREATE = 1;
    this.HELP_TICKET_EMAIL_STATUS_CHANGE = 9;
    this.HELP_TICKET_STATUSES = [{
      "code": this.NEW_HELPTICKET_STATUS,
      "description": "New"
    }, {
      "code": this.REVIEW_HELPTICKET_STATUS,
      "description": "Review"
    }, {
      "code": this.IN_PROCESS_HELPTICKET_STATUS,
      "description": "In Process"
    }, {
      "code": this.CUSTOMER_ACTION_HELPTICKET_STATUS,
      "description": "Customer Action"
    }, {
      "code": this.REPLIED_HELPTICKET_STATUS,
      "description": "Replied"
    }, {
      "code": this.CLOSED_HELPTICKET_STATUS,
      "description": "Closed"
    }, {
      "code": this.MY_HELPTICKET_STATUS,
      "description": "My Help Tickets"
    }];
    this.HELP_TICKET_CLOSE_REASON_OTHER = 3;
    this.HELP_TICKET_CLOSE_REASONS = [{
      "reason": "Help ticket was submitted in error"
    }, {
      "reason": "I was able to resolve the issue"
    }, {
      "reason": "The issue is no longer relevant"
    }, {
      "reason": "Other"
    }];
    this.SITE_INFO_TYPES = [{
      'type': 'INFO',
      'description': 'Session Information'
    }, {
      'type': 'NEWS',
      'description': 'UCC and UA News'
    }, {
      'type': 'ILNK',
      'description': 'Useful Links - Useful Info Page'
    }, {
      'type': 'OLNK',
      'description': 'Useful Links - Home Page'
    }, {
      'type': 'SYST',
      'description': 'System Status'
    }, {
      'type': "DLNK",
      'description': 'Useful Information - Home Page'
    }, {
      'type': "ALRT",
      'description': 'Alerts'
    }, {
      'type': "CARO",
      'description': 'Carousel'
    }, {
      'type': "CONT",
      'description': 'Contact Info'
    }, {
      'type': "BANN",
      'description': 'Banner Notification'
    }];
    this.MESSAGE_TYPES = ['CLIENT_REQUESTS', 'HELP_TICKETS'];
    this.http = http;
  }

  var _proto = AppConfig.prototype;

  _proto.getConfig = /*#__PURE__*/function () {
    var _getConfig = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(refresh) {
      var _this = this;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(refresh || !this.configArray)) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return", this.http.createRequest('/config').asGet().withHeader('Authorization', 'JWT ' + sessionStorage.getItem('token')).send().then(function (response) {
                if (!response.isSuccess) {
                  return response;
                } else {
                  _this.configArray = JSON.parse(response.response);

                  _this.setParameters();
                }
              }).catch(function (e) {
                _this.configArray = new Array();
                console.log(e);
                return {
                  error: true,
                  code: e.statusCode,
                  message: e.statusText
                };
              }));

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function getConfig(_x) {
      return _getConfig.apply(this, arguments);
    }

    return getConfig;
  }();

  _proto.getSessions = /*#__PURE__*/function () {
    var _getSessions = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(refresh) {
      var _this2 = this;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(refresh || !this.SESSION_PARAMS)) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return", this.http.createRequest('/semesterConfig').asGet().withHeader('Authorization', 'JWT ' + sessionStorage.getItem('token')).send().then(function (response) {
                if (!response.isSuccess) {
                  return response;
                } else {
                  _this2.SESSION_PARAMS = JSON.parse(response.response);
                }
              }).catch(function (e) {
                _this2.SESSION_PARAMS = new Array();
                console.log(e);
                return {
                  error: true,
                  code: e.statusCode,
                  message: e.statusText
                };
              }));

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function getSessions(_x2) {
      return _getSessions.apply(this, arguments);
    }

    return getSessions;
  }();

  _proto.setParameters = function setParameters() {
    //Client request parameters
    this.DEFAULT_FACULTY_IDS = parseInt(this.getParameter('DEFAULT_FACULTY_IDS'));
    this.REQUEST_LIMIT = parseInt(this.getParameter('REQUEST_LIMIT'));
    this.REQUEST_LEEWAY = parseInt(this.getParameter('REQUEST_LEEWAY'));
    this.REGULAR_ID_BUFFER = parseInt(this.getParameter('REGULAR_ID_BUFFER'));
    this.REGULAR_ID_ALLOWANCE = parseInt(this.getParameter('REGULAR_ID_ALLOWANCE'));
    this.SANDBOX_ID_BUFFER = parseInt(this.getParameter('SANDBOX_ID_BUFFER'));
    this.SHARED_ID_BUFFER = parseInt(this.getParameter('SHARED_ID_BUFFER'));
    this.SANDBOX_ID_COUNT = parseInt(this.getParameter('SANDBOX_ID_COUNT'));
    this.CLIENT_INTERVAL = parseInt(this.getParameter('CLIENT_INTERVAL'));
    this.DATE_FORMAT_TABLE = this.getParameter('DATE_FORMAT_TABLE');
    this.UCC_HOME = this.getParameter('UCC_HOME');
    this.SANDBOX_USED = this.getParameter('SANDBOX_USED');
    this.HOME_WELCOME = this.getParameter('HOME_WELCOME');
    this.DEFAULT_HOME_IMAGE = this.getParameter('DEFAULT_HOME_IMAGE');
    this.WEATHER_API_KEY = this.getParameter('WEATHER_API_KEY');
    this.UCC_PHONE = this.getParameter('UCC_PHONE');
    this.UCC_EMAIL = this.getParameter('UCC_EMAIL');
    this.UCC_ADMIN_PHONE = this.getParameter('UCC_ADMIN_PHONE');
    this.UCC_ADMIN_EMAIL = this.getParameter('UCC_ADMIN_EMAIL');
    this.UCC_ADDRESS = this.getParameter('UCC_ADDRESS');
    this.SHOW_STAFF_CONTACT = this.getParameter('SHOW_STAFF_CONTACT');
    this.UCC_HEADER_IMAGE = this.getParameter('UCC_HEADER_IMAGE');
    this.CONTACT_CONTENT = this.getParameter('CONTACT_CONTENT');
    this.SEND_EMAILS = this.getParameter('SEND_EMAILS');
    this.TEMP_SCALE = this.getParameter('TEMP_SCALE');
    this.HELP_TICKET_EMAIL_LIST = this.getParameter('HELP_TICKET_EMAIL_LIST');
    this.SESSION_EXPLANATION = this.getParameter('SESSION_EXPLANATION');
    this.SUBMENU_BACKGROUND = this.getParameter('SUBMENU_BACKGROUND');
    this.SUBMENU_COLOR = this.getParameter('SUBMENU_COLOR');
    this.ACTIVE_SUBMENU_COLOR = this.getParameter('ACTIVE_SUBMENU_COLOR');
    this.SUBMENU_BACKGROUND = this.getParameter('SUBMENU_BACKGROUND');
    this.MENU_COLOR = this.getParameter('MENU_COLOR');
    this.MENU_BACKGROUND = this.getParameter('MENU_BACKGROUND');
    this.ACTIVE_MENU_COLOR = this.getParameter('ACTIVE_MENU_COLOR');
    this.MENU_BACKGROUND = this.getParameter('MENU_BACKGROUND');
    this.HOVER_SUBMENU_BACKGROUND = this.getParameter('HOVER_SUBMENU_BACKGROUND');
    this.HOME_PAGE_UCC_TITLE = this.getParameter('HOME_PAGE_UCC_TITLE');
    this.HOME_PAGE_LEFT = this.getParameter('HOME_PAGE_LEFT');
    this.HOME_PAGE_MIDDLE = this.getParameter('HOME_PAGE_MIDDLE');
    this.HOME_PAGE_RIGHT = this.getParameter('HOME_PAGE_RIGHT');
    this.UCC_PARALLAX_LOGO = this.getParameter('UCC_PARALLAX_LOGO');
    this.NAVBAR_LOGO = this.getParameter('NAVBAR_LOGO');
    this.PRODUCT_REQUESTS_EMAIL_LIST = this.getParameter('PRODUCT_REQUESTS_EMAIL_LIST');
    this.BUTTONS_BACKGROUND = this.getParameter('BUTTONS_BACKGROUND');
    this.ACTIVE_REQUEST_OVERLAP = this.getParameter('ACTIVE_REQUEST_OVERLAP');
    this.SESSION_SORT_ORDER = this.getParameter('SESSION_SORT_ORDER');
    this.REGISTER_PAGE_MESSAGE = this.getParameter('REGISTER_PAGE_MESSAGE');
    this.TECH_STAFF_CREATED_HELP_TICKET_MESSAGE = this.getParameter('TECH_STAFF_CREATED_HELP_TICKET_MESSAGE');
    this.TECH_STAFF_CREATED_HELP_TICKET_SUBJECT = this.getParameter('TECH_STAFF_CREATED_HELP_TICKET_SUBJECT');
    this.HELP_TICKET_INSTRUCTIONS = this.getParameter('HELP_TICKET_INSTRUCTIONS');
    this.HELP_TICKET_CREATED_SUBJECT = this.getParameter('HELP_TICKET_CREATED_SUBJECT');
    this.HELP_TICKET_CREATED_MESSAGE = this.getParameter('HELP_TICKET_CREATED_MESSAGE');
    this.HELP_TICKET_UPDATED_MESSAGE_CA = this.getParameter('HELP_TICKET_UPDATED_MESSAGE_CA');
    this.HELP_TICKET_UPDATED_SUBJECT_CA = this.getParameter('HELP_TICKET_UPDATED_SUBJECT_CA');
    this.HELP_TICKET_UPDATE_MESSAGE_R = this.getParameter('HELP_TICKET_UPDATE_MESSAGE_R');
    this.HELP_TICKET_UPDATE_SUBJECT_R = this.getParameter('HELP_TICKET_UPDATE_SUBJECT_R');
    this.HELP_TICKET_UPDATE_CLOSED_MESSAGE_C = this.getParameter('HELP_TICKET_UPDATE_CLOSED_MESSAGE_C');
    this.HELP_TICKET_UPDATE_CLOSED_SUBJECT_C = this.getParameter('HELP_TICKET_UPDATE_CLOSED_SUBJECT_C');
    this.HELP_TICKET_USER_UPDATE_MESSAGE = this.getParameter('HELP_TICKET_USER_UPDATE_MESSAGE');
    this.HELP_TICKET_USER_UPDATE_SUBJECT = this.getParameter('HELP_TICKET_USER_UPDATE_SUBJECT');
    this.WELCOME_MESSAGE = this.getParameter('WELCOME_MESSAGE');
    this.FACDEV_NEW_CUSTOMER_MESSAGE = this.getParameter('FACDEV_NEW_CUSTOMER_MESSAGE');
    this.USER_NEW_CUSTOMER_SUBJECT = this.getParameter('USER_NEW_CUSTOMER_SUBJECT');
    this.FACDEV_NEW_CUSTOMER_SUBJECT = this.getParameter('FACDEV_NEW_CUSTOMER_SUBJECT');
    this.CLIENT_REQUEST_ASSIGNED_MESSAGE = this.getParameter('CLIENT_REQUEST_ASSIGNED_MESSAGE');
    this.CLIENT_REQUEST_CREATED_TOP = this.getParameter('CLIENT_REQUEST_CREATED_TOP');
    this.CLIENT_REQUEST_CREATED_BOTTOM = this.getParameter('CLIENT_REQUEST_CREATED_BOTTOM');
    this.HELP_TICKET_REFRESH_INTERVAL = this.getParameter('HELP_TICKET_REFRESH_INTERVAL');
    this.CLIENT_REQUEST_REFRESH_INTERVAL = this.getParameter('CLIENT_REQUEST_REFRESH_INTERVAL');
    this.EXCHANGE_RATE = this.getParameter('EXCHANGE_RATE');
    this.EXCHANGE_RATE_CEILING = this.getParameter('EXCHANGE_RATE_CEILING');
    this.EXCHANGE_RATE_FLOOR = this.getParameter('EXCHANGE_RATE_FLOOR');
    this.ACC_ADDRESS = this.getParameter('ACC_ADDRESS');
  };

  _proto.getParameter = function getParameter(parameter) {
    for (var i = 0; i < this.configArray.length; i++) {
      if (this.configArray[i].parameter === parameter) {
        if (this.configArray[i].type === 'boolean') {
          return this.configArray[i].value == "true";
        } else {
          return this.configArray[i].value;
        }
      }
    }

    return null;
  };

  return AppConfig;
}()) || _class);

/***/ }),

/***/ "app.html":
/*!**********************!*\
  !*** ./src/app.html ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\n  <require from=\"resources/styles/styles.css\"></require>\n  <nav-bar></nav-bar>\n  <div class=\"page-host\">\n    <router-view></router-view>\n  </div>\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ 6700:
/*!***************************************************!*\
  !*** ./node_modules/moment/locale/ sync ^\.\/.*$ ***!
  \***************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var map = {
	"./af": 2786,
	"./af.js": 2786,
	"./ar": 867,
	"./ar-dz": 4130,
	"./ar-dz.js": 4130,
	"./ar-kw": 6135,
	"./ar-kw.js": 6135,
	"./ar-ly": 6440,
	"./ar-ly.js": 6440,
	"./ar-ma": 7702,
	"./ar-ma.js": 7702,
	"./ar-sa": 6040,
	"./ar-sa.js": 6040,
	"./ar-tn": 7100,
	"./ar-tn.js": 7100,
	"./ar.js": 867,
	"./az": 1083,
	"./az.js": 1083,
	"./be": 9808,
	"./be.js": 9808,
	"./bg": 8338,
	"./bg.js": 8338,
	"./bm": 7438,
	"./bm.js": 7438,
	"./bn": 8905,
	"./bn-bd": 6225,
	"./bn-bd.js": 6225,
	"./bn.js": 8905,
	"./bo": 1560,
	"./bo.js": 1560,
	"./br": 1278,
	"./br.js": 1278,
	"./bs": 622,
	"./bs.js": 622,
	"./ca": 2468,
	"./ca.js": 2468,
	"./cs": 5822,
	"./cs.js": 5822,
	"./cv": 877,
	"./cv.js": 877,
	"./cy": 7373,
	"./cy.js": 7373,
	"./da": 4780,
	"./da.js": 4780,
	"./de": 9740,
	"./de-at": 217,
	"./de-at.js": 217,
	"./de-ch": 894,
	"./de-ch.js": 894,
	"./de.js": 9740,
	"./dv": 5300,
	"./dv.js": 5300,
	"./el": 837,
	"./el.js": 837,
	"./en-au": 8348,
	"./en-au.js": 8348,
	"./en-ca": 7925,
	"./en-ca.js": 7925,
	"./en-gb": 2243,
	"./en-gb.js": 2243,
	"./en-ie": 6436,
	"./en-ie.js": 6436,
	"./en-il": 7207,
	"./en-il.js": 7207,
	"./en-in": 4175,
	"./en-in.js": 4175,
	"./en-nz": 6319,
	"./en-nz.js": 6319,
	"./en-sg": 1662,
	"./en-sg.js": 1662,
	"./eo": 2915,
	"./eo.js": 2915,
	"./es": 5655,
	"./es-do": 5251,
	"./es-do.js": 5251,
	"./es-mx": 6112,
	"./es-mx.js": 6112,
	"./es-us": 1146,
	"./es-us.js": 1146,
	"./es.js": 5655,
	"./et": 5603,
	"./et.js": 5603,
	"./eu": 7763,
	"./eu.js": 7763,
	"./fa": 6959,
	"./fa.js": 6959,
	"./fi": 1897,
	"./fi.js": 1897,
	"./fil": 2549,
	"./fil.js": 2549,
	"./fo": 4694,
	"./fo.js": 4694,
	"./fr": 5596,
	"./fr-ca": 3049,
	"./fr-ca.js": 3049,
	"./fr-ch": 2330,
	"./fr-ch.js": 2330,
	"./fr.js": 5596,
	"./fy": 5044,
	"./fy.js": 5044,
	"./ga": 9295,
	"./ga.js": 9295,
	"./gd": 2101,
	"./gd.js": 2101,
	"./gl": 8794,
	"./gl.js": 8794,
	"./gom-deva": 7884,
	"./gom-deva.js": 7884,
	"./gom-latn": 3168,
	"./gom-latn.js": 3168,
	"./gu": 5349,
	"./gu.js": 5349,
	"./he": 4206,
	"./he.js": 4206,
	"./hi": 94,
	"./hi.js": 94,
	"./hr": 316,
	"./hr.js": 316,
	"./hu": 2138,
	"./hu.js": 2138,
	"./hy-am": 1423,
	"./hy-am.js": 1423,
	"./id": 9218,
	"./id.js": 9218,
	"./is": 135,
	"./is.js": 135,
	"./it": 626,
	"./it-ch": 150,
	"./it-ch.js": 150,
	"./it.js": 626,
	"./ja": 9183,
	"./ja.js": 9183,
	"./jv": 4286,
	"./jv.js": 4286,
	"./ka": 2105,
	"./ka.js": 2105,
	"./kk": 7772,
	"./kk.js": 7772,
	"./km": 8758,
	"./km.js": 8758,
	"./kn": 9282,
	"./kn.js": 9282,
	"./ko": 3730,
	"./ko.js": 3730,
	"./ku": 1408,
	"./ku.js": 1408,
	"./ky": 3291,
	"./ky.js": 3291,
	"./lb": 6841,
	"./lb.js": 6841,
	"./lo": 5466,
	"./lo.js": 5466,
	"./lt": 7010,
	"./lt.js": 7010,
	"./lv": 7595,
	"./lv.js": 7595,
	"./me": 9861,
	"./me.js": 9861,
	"./mi": 5493,
	"./mi.js": 5493,
	"./mk": 5966,
	"./mk.js": 5966,
	"./ml": 7341,
	"./ml.js": 7341,
	"./mn": 5115,
	"./mn.js": 5115,
	"./mr": 370,
	"./mr.js": 370,
	"./ms": 9847,
	"./ms-my": 1237,
	"./ms-my.js": 1237,
	"./ms.js": 9847,
	"./mt": 2126,
	"./mt.js": 2126,
	"./my": 6165,
	"./my.js": 6165,
	"./nb": 4924,
	"./nb.js": 4924,
	"./ne": 6744,
	"./ne.js": 6744,
	"./nl": 3901,
	"./nl-be": 9814,
	"./nl-be.js": 9814,
	"./nl.js": 3901,
	"./nn": 3877,
	"./nn.js": 3877,
	"./oc-lnc": 2135,
	"./oc-lnc.js": 2135,
	"./pa-in": 5858,
	"./pa-in.js": 5858,
	"./pl": 4495,
	"./pl.js": 4495,
	"./pt": 9520,
	"./pt-br": 7971,
	"./pt-br.js": 7971,
	"./pt.js": 9520,
	"./ro": 6459,
	"./ro.js": 6459,
	"./ru": 1793,
	"./ru.js": 1793,
	"./sd": 950,
	"./sd.js": 950,
	"./se": 490,
	"./se.js": 490,
	"./si": 124,
	"./si.js": 124,
	"./sk": 4249,
	"./sk.js": 4249,
	"./sl": 4985,
	"./sl.js": 4985,
	"./sq": 1104,
	"./sq.js": 1104,
	"./sr": 9131,
	"./sr-cyrl": 9915,
	"./sr-cyrl.js": 9915,
	"./sr.js": 9131,
	"./ss": 5893,
	"./ss.js": 5893,
	"./sv": 8760,
	"./sv.js": 8760,
	"./sw": 1172,
	"./sw.js": 1172,
	"./ta": 7333,
	"./ta.js": 7333,
	"./te": 3110,
	"./te.js": 3110,
	"./tet": 2095,
	"./tet.js": 2095,
	"./tg": 7321,
	"./tg.js": 7321,
	"./th": 9041,
	"./th.js": 9041,
	"./tk": 9005,
	"./tk.js": 9005,
	"./tl-ph": 5768,
	"./tl-ph.js": 5768,
	"./tlh": 9444,
	"./tlh.js": 9444,
	"./tr": 2397,
	"./tr.js": 2397,
	"./tzl": 8254,
	"./tzl.js": 8254,
	"./tzm": 1106,
	"./tzm-latn": 699,
	"./tzm-latn.js": 699,
	"./tzm.js": 1106,
	"./ug-cn": 9288,
	"./ug-cn.js": 9288,
	"./uk": 7691,
	"./uk.js": 7691,
	"./ur": 3795,
	"./ur.js": 3795,
	"./uz": 6791,
	"./uz-latn": 588,
	"./uz-latn.js": 588,
	"./uz.js": 6791,
	"./vi": 9822,
	"./vi.js": 9822,
	"./x-pseudo": 4378,
	"./x-pseudo.js": 4378,
	"./yo": 5805,
	"./yo.js": 5805,
	"./zh-cn": 3839,
	"./zh-cn.js": 3839,
	"./zh-hk": 5726,
	"./zh-hk.js": 5726,
	"./zh-mo": 9807,
	"./zh-mo.js": 9807,
	"./zh-tw": 4152,
	"./zh-tw.js": 4152
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 6700;

/***/ }),

/***/ 1407:
/*!*********************************!*\
  !*** ./config/environment.json ***!
  \*********************************/
/***/ (function(module) {

"use strict";
module.exports = JSON.parse('{"debug":true,"testing":true}');

/***/ })

}]);
//# sourceMappingURL=app-9a8b795a.c2f6f034a062b3d7f766.bundle.js.map