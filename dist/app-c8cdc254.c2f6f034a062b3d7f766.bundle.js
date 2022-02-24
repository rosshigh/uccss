"use strict";
(self["webpackChunkclient"] = self["webpackChunkclient"] || []).push([["app-c8cdc254"],{

/***/ "modules/home/about":
/*!***********************************!*\
  !*** ./src/modules/home/about.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "About": function() { return /* binding */ About; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var aurelia_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-router */ 6433);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
var _dec, _class;




var About = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(aurelia_router__WEBPACK_IMPORTED_MODULE_1__.Router, _config_appConfig__WEBPACK_IMPORTED_MODULE_2__.AppConfig), _dec(_class = /*#__PURE__*/function () {
  function About(router, config) {
    this.title = "UCC Contact Information";
    this.router = router;
    this.config = config;
  }

  var _proto = About.prototype;

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
      route: ['', 'contact'],
      moduleId: './contact',
      settings: {
        auth: false,
        roles: []
      },
      nav: true,
      name: 'contact',
      title: 'Contact Us'
    }, {
      route: 'institutions',
      moduleId: './institutions',
      settings: {
        auth: false,
        roles: []
      },
      nav: true,
      name: 'institutions',
      title: 'Our Customers'
    }, {
      route: 'products',
      moduleId: './products',
      settings: {
        auth: false,
        roles: []
      },
      nav: true,
      name: 'products',
      title: 'Products we support'
    }]);
    this.router = router;
  };

  return About;
}()) || _class);

/***/ }),

/***/ "modules/home/contact":
/*!*************************************!*\
  !*** ./src/modules/home/contact.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Contact": function() { return /* binding */ Contact; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _resources_data_siteInfo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../resources/data/siteInfo */ 1290);
/* harmony import */ var _resources_data_people__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../resources/data/people */ 353);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
var _dec, _class;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }





var Contact = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_resources_data_siteInfo__WEBPACK_IMPORTED_MODULE_1__.SiteInfo, _resources_data_people__WEBPACK_IMPORTED_MODULE_2__.People, _config_appConfig__WEBPACK_IMPORTED_MODULE_3__.AppConfig), _dec(_class = /*#__PURE__*/function () {
  function Contact(siteinfo, people, config) {
    this.siteinfo = siteinfo;
    this.people = people;
    this.config = config;
  }

  var _proto = Contact.prototype;

  _proto.activate = /*#__PURE__*/function () {
    var _activate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var _this = this;

      var uccRoles;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              uccRoles = "";
              this.config.ROLES.forEach(function (item) {
                if (item.UCConly) uccRoles += item.role + ":";
              }); // await this.siteinfo.getInfoArray();

              _context.next = 4;
              return this.config.getConfig();

            case 4:
              _context.next = 6;
              return this.people.getUCCStaff(uccRoles);

            case 6:
              this.showPersonalContactInfo = this.config.SHOW_STAFF_CONTACT == 0;
              this.directors = new Array();
              this.staff = new Array();
              this.admin = new Array();
              this.people.uccPeople.forEach(function (item) {
                if (item.roles.indexOf('TMAN') > -1) {
                  _this.directors.push({
                    item: item,
                    role: 'TMAN'
                  });
                } else if (item.roles.indexOf('EDIR') > -1) {
                  _this.directors.push({
                    item: item,
                    role: 'EDIR'
                  });
                } else if (item.roles.indexOf('TDIR') > -1) {
                  _this.directors.push({
                    item: item,
                    role: 'TDIR'
                  });
                } else if (item.roles.indexOf('TMGR') > -1) {
                  _this.directors.push({
                    item: item,
                    role: 'TMGR'
                  });
                } else if (item.roles.indexOf('UCCT') > -1 && item.roles.indexOf('STUT') == -1) {
                  _this.staff.push(item);
                } else if (item.roles.indexOf('UCCA') > -1) {
                  _this.admin.push(item);
                }
              });
              this.staff = this.staff.sort(function (a, b) {
                return a.lastName > b.lastName;
              });
              this.directors = this.directors.sort(function (a, b) {
                return a.role > b.role;
              });

            case 13:
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

  return Contact;
}()) || _class);

/***/ }),

/***/ "modules/home/home":
/*!**********************************!*\
  !*** ./src/modules/home/home.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Home": function() { return /* binding */ Home; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _resources_data_siteInfo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../resources/data/siteInfo */ 1290);
/* harmony import */ var _resources_data_sessions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../resources/data/sessions */ 2073);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! moment */ 381);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_4__);
var _dec, _class;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }






var Home = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_resources_data_siteInfo__WEBPACK_IMPORTED_MODULE_1__.SiteInfo, _resources_data_sessions__WEBPACK_IMPORTED_MODULE_2__.Sessions, _config_appConfig__WEBPACK_IMPORTED_MODULE_3__.AppConfig, aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.TemplatingEngine), _dec(_class = /*#__PURE__*/function () {
  function Home(siteinfo, sessions, config, templatingEngine) {
    this.email = '';
    this.password = '';
    this.loginError = '';
    this.sessions = sessions;
    this.siteinfo = siteinfo;
    this.config = config;
    this.config.getConfig(true);
    this.templatingEngine = templatingEngine;
  }

  var _proto = Home.prototype;

  _proto.activate = /*#__PURE__*/function () {
    var _activate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var currentDate, options, responses;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              currentDate = moment__WEBPACK_IMPORTED_MODULE_4___default()(new Date()).format("MM-DD-YYYY");
              options = '?filter=expiredDate|gt|' + currentDate + '&order=sortOrder';
              _context.next = 4;
              return Promise.all([this.sessions.getSessionsArray('?order=startDate', true), this.siteinfo.getInfoArray(true, options)]);

            case 4:
              responses = _context.sent;

              if (this.isMobile()) {
                console.log('Mobile');
                this.config.isMobile = true;
              }

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

  _proto.attached = /*#__PURE__*/function () {
    var _attached = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var _this = this;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              setTimeout(function () {
                setTimeout(function () {
                  _this.letsEnhance();
                }, 100);
              }, 100);

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function attached() {
      return _attached.apply(this, arguments);
    }

    return attached;
  }();

  _proto.isMobile = function isMobile(device) {
    switch (device) {
      case 'Android':
        return navigator.userAgent.match(/Android/i);
        break;

      case 'iOS':
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        break;

      default:
        return navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone|iPad|iPod/i);
        break;
    } // var isMobile = {
    //     Android: function() {
    //         return navigator.userAgent.match(/Android/i);
    //     },
    //     BlackBerry: function() {
    //         return navigator.userAgent.match(/BlackBerry/i);
    //     },
    //     iOS: function() {
    //         return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    //     },
    //     Opera: function() {
    //         return navigator.userAgent.match(/Opera Mini/i);
    //     },
    //     Windows: function() {
    //         return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    //     },
    //     any: function() {
    //         return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    //     }
    // };

  };

  _proto.letsEnhance = function letsEnhance() {
    $("#leftContainer").html(this.config.HOME_PAGE_LEFT);
    var el1 = document.getElementById('leftContainer');

    if (el1) {
      if (!el1.querySelectorAll('.au-target').length) {
        this.templatingEngine.enhance({
          element: el1,
          bindingContext: this
        });
      }
    }

    $("#middleContainer").html(this.config.HOME_PAGE_MIDDLE);
    var el2 = document.getElementById('middleContainer');

    if (el2) {
      if (!el2.querySelectorAll('.au-target').length) {
        this.templatingEngine.enhance({
          element: el2,
          bindingContext: this
        });
      }
    }

    $("#rightContainer").html(this.config.HOME_PAGE_RIGHT);
    var el3 = document.getElementById('rightContainer');

    if (el3) {
      if (!el3.querySelectorAll('.au-target').length) {
        this.templatingEngine.enhance({
          element: el3,
          bindingContext: this
        });
      }
    }
  };

  return Home;
}()) || _class);

/***/ }),

/***/ "modules/home/about.html":
/*!*************************************!*\
  !*** ./src/modules/home/about.html ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t<compose view='../../resources/elements/submenu.html'></compose>\r\n    <div class=\"col-lg-12\">\r\n        <router-view></router-view>\r\n    </div>\r\n</template>\r\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/home/components/homePageLinks.html":
/*!********************************************************!*\
  !*** ./src/modules/home/components/homePageLinks.html ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div>\r\n      <div class=\"col-md-6 bottomMargin\">\r\n        <a href.bind=item.url target=\"_blank\">${item.title}</a>\r\n        <br><span innerhtml.bind=\"item.content\"></span>\r\n      </div>\r\n    </div>\r\n  </template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/home/components/newsItem.html":
/*!***************************************************!*\
  !*** ./src/modules/home/components/newsItem.html ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div class=\"bottomMargin\">\r\n      <span class=\"col-md-12 newsTitle topMargin\">${item.title}</span>\r\n      <span innerhtml.bind=\"item.content\"></span>\r\n      <span class=\"newsUrl\"><a href.bind=\"item.url\" target=\"_blank\">more info...</a></span>\r\n    </div>\r\n  </template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/home/components/uccInformation.html":
/*!*********************************************************!*\
  !*** ./src/modules/home/components/uccInformation.html ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t<div class=\"home-page-header underline\">${config.configObject.HOME_PAGE_UCC_TITLE}</div>\r\n\r\n\t<div class=\"row\">\r\n\t\t<div id=\"leftContainer\" class=\"col-lg-3\">\r\n\t\t\t<h3 class=\"underline\">Current Sessions</h3>\r\n\t\t\t<div class=\"list-group\">\r\n\t\t\t\t<a class=\"list-group-item\" repeat.for=\"session of sessions.objectsArray\">\r\n\t\t\t\t\t<h4 class=\"bold\">${session.sessionStatus}: Session ${session.session} -\r\n\t\t\t\t\t\t${session.year}</h4>\r\n\t\t\t\t\tRequests open: ${session.requestsOpenDate |\r\n\t\t\t\t\tdateFormat:appConfig.DATE_FORMAT_TABLE}<br />\r\n\t\t\t\t\tClients available: ${session.startDate |\r\n\t\t\t\t\tdateFormat:appConfig.DATE_FORMAT_TABLE}<br />\r\n\t\t\t\t\tSession ends: ${session.endDate |\r\n\t\t\t\t\tdateFormat:appConfig.DATE_FORMAT_TABLE}<br />\r\n\t\t\t\t</a>\r\n\t\t\t</div>\r\n\r\n\t\t</div>\r\n\t\t<div id=\"middleContainer\" class=\"col-lg-4 offset-1\">\r\n\t\t\t<!-- <h3 class=\"underline\">Sessions Schedule</h3> -->\r\n\t\t\t<span innerhtml.bind=\"config.configObject.HOME_PAGE_MIDDLE\"></span>\r\n\t\t</div>\r\n\r\n\t<div id=\"rightContainer\" class=\"col-lg-3\">\r\n\t\t<h3 class=\"underline\">What is the SAP UCC?</h3>\r\n\t\t<span innerhtml.bind=\"config.configObject.HOME_PAGE_RIGHT\"></span>\r\n\t</div>\r\n\t</div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/home/contact.html":
/*!***************************************!*\
  !*** ./src/modules/home/contact.html ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t<div class=\"fluid-container col-lg-10 col-lg-offset-1\">\r\n\t\t<div class=\"panel panel-primary topMargin\">\r\n\t\t\t<div class=\"panel-body\">\r\n\t\t\t\t\t<div class=\"col-lg-4\">\r\n\t\t\t\t\t\t<div innerhtml.bind=\"config.UCC_ADDRESS\"></div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div show.bind=\"config.IMG_DOWNLOAD_URL.length && config.IMG_DOWNLOAD_URL.length > 0\" class=\"col-lg-8 center\">\r\n\t\t\t\t\t\t<img src=\"${config.IMG_DOWNLOAD_URL}${config.UCC_HEADER_IMAGE}\" class=\"img-responsive pull-right\">\r\n\t\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class=\"col-lg-6\">\r\n\t\t\t<div class=\"col-lg-12\" show.bind=\"directors.length > 0\">\r\n\t\t\t\t<ul>\r\n\t\t\t\t\t<li class=\"list-group-item  topMargin\" repeat.for=\"person of directors\">\r\n\t\t\t\t\t\t<img if.bind=\"helpTickets.selectedHelpTicket.personId.file.fileName\" class=\"smart-timeline-icon bottomMarginLg\" src =\"${config.PERSON_IMAGE_DOWNLOAD_URL}/${helpTickets.selectedHelpTicket.personId.file.fileName}\" height=\"100\">\r\n\t\t\t\t\t\t<div if.bind=\"!helpTickets.selectedHelpTicket.personId.file.fileName\" class=\"media-left\" innerhtml='${person.item.email | gravatarUrl:100:1}'></div>\r\n\t\t\t\t\t\t<div class=\"media-body\">\r\n\t\t\t\t\t\t\t<div class=\"col-lg-12\">\r\n\t\t\t\t\t\t\t\t<h4>${person.item.fullName}</h4>\r\n\t\t\t\t\t\t\t\t<h5>${person.role | uccTitle:config.ROLES}</h5>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class=\"col-lg-12\">\r\n\t\t\t\t\t\t\t\t<span>${person.item.phone | phoneNumber:config.PHONE_MASKS:person.item.country}</span>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class=\"col-lg-12\">\r\n\t\t\t\t\t\t\t\t<span><a href=\"mailto:${person.item.email}\">${person.item.email}</a></span>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</li>\r\n\t\t\t\t</ul>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"col-lg-12 bigTopMargin\" show.bind=\"staff.length > 0\">\r\n\t\t\t\t<h3>Technical Staff</h3>\r\n\t\t\t\t<ul>\r\n\t\t\t\t\t<li class=\"list-group-item  topMargin\" repeat.for=\"person of staff\">\r\n\t\t\t\t\t\t<div class=\"media-left\" innerhtml='${person.email | gravatarUrl:100:1}'></div>\r\n\t\t\t\t\t\t<div class=\"media-body\">\r\n\t\t\t\t\t\t\t<div class=\"col-lg-12\">\r\n\t\t\t\t\t\t\t\t<h4>${person.fullName}</h4>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class=\"col-lg-12\">\r\n\t\t\t\t\t\t\t\t<span show.bind=\"!showPersonalContactInfo\">${config.UCC_PHONE | phoneNumber:config.PHONE_MASKS:person.country}</span>\r\n\t\t\t\t\t\t\t\t<span show.bind=\"showPersonalContactInfo\">${person.phone | phoneNumber:config.PHONE_MASKS:person.country}</span>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class=\"col-lg-12\">\r\n\t\t\t\t\t\t\t\t<span show.bind=\"!showPersonalContactInfo\"><a href=\"mailto:${config.UCC_EMAIL}\">${config.UCC_EMAIL}</a></span>\r\n\t\t\t\t\t\t\t\t<span show.bind=\"showPersonalContactInfo\"><a href=\"mailto:${person.email}\">${person.email}</a></span>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</li>\r\n\t\t\t\t</ul>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"col-lg-12 bigTopMargin bottomMargin\" show.bind=\"admin.length > 0\">\r\n\t\t\t\t<h3>Administrative Support</h3>\r\n\t\t\t\t<ul>\r\n\t\t\t\t\t<li class=\"list-group-item topMargin\" repeat.for=\"person of admin\">\r\n\t\t\t\t\t\t<div class=\"media-left\" innerhtml='${person.email | gravatarUrl:100:1}'></div>\r\n\t\t\t\t\t\t<div class=\"media-body\">\r\n\t\t\t\t\t\t\t<div class=\"col-lg-12\">\r\n\t\t\t\t\t\t\t\t<h4>${person.fullName}</h4>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class=\"col-lg-12\">\r\n\t\t\t\t\t\t\t\t<span show.bind=\"!showPersonalContactInfo\">${config.UCC_ADMIN_PHONE | phoneNumber:config.PHONE_MASKS:person.country}</span>\r\n\t\t\t\t\t\t\t\t<span show.bind=\"showPersonalContactInfo\">${person.phone | phoneNumber:config.PHONE_MASKS:person.country}</span>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class=\"col-lg-12\">\r\n\t\t\t\t\t\t\t\t<span show.bind=\"!showPersonalContactInfo\"><a href=\"mailto:${config.UCC_ADMIN_EMAIL}\">${config.UCC_ADMIN_EMAIL}</a></span>\r\n\t\t\t\t\t\t\t\t<span show.bind=\"showPersonalContactInfo\"><a href=\"mailto:${person.email}\">${person.email}</a></span>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</li>\r\n\t\t\t\t</ul>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class=\"col-lg-6 bigTopMargin\" innerhtml.bind=\"config.CONTACT_CONTENT\">\r\n\t\t</div>\r\n\t</div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/home/home.html":
/*!************************************!*\
  !*** ./src/modules/home/home.html ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <style>\r\n        .navbar-inverse {\r\n            color: ${config.SUBMENU_COLOR};\r\n            background-color:${config.SUBMENU_BACKGROUND}\r\n        }\r\n        .navbar-inverse .navbar-nav>.active>a, .navbar-inverse .navbar-nav>.active>a:hover, .navbar-inverse .navbar-nav>.active>a:focus {\r\n            color: ${config.ACTIVE_SUBMENU_COLOR};\r\n            background-color:${config.SUBMENU_BACKGROUND}\r\n        }\r\n    </style>\r\n    <!-- <div class=\"${item.priority} textContainer banner\" repeat.for=\"item of siteinfo.siteArray | infoFilter:'SYST'\">\r\n        <h4 class=\"leftMargin\">${item.title}</h4>\r\n       <h6>${item.content}</h6>\r\n    </div> -->\r\n\r\n    <div class=\"parallax1\">\r\n        <div if.bind=\"config.HOME_WELCOME.length === 0\" class=\"pull-right topMargin rightMargin\">\r\n            <img src=\"${config.IMG_DOWNLOAD_URL}UCCSS_BLACK.png\" width=\"300px\">\r\n        </div>\r\n        <div if.bind=\"config.HOME_WELCOME.length > 0\" class=\"caption\">\r\n        <span class=\"border\">${config.HOME_WELCOME}</span> \r\n        </div>\r\n    </div>\r\n\r\n<div class=\"row center-text\" style=\"color: #777;background-color:white;text-align:center;padding:25px 80px;text-align: justify;\">\r\n       <compose view=\"./components/uccInformation.html\"></compose>\r\n</div>\r\n\r\n <div class=\"parallax1\"></div>\r\n\r\n <div class=\"row bigMarginTop\" style=\"color: #777;background-color:white;text-align:center;padding:50px 80px;text-align: justify;\">\r\n        <div class=\"col-lg-3 bigMarginTop\">\r\n            <h2 class=\"underline\">Useful Information</h2>\r\n            <div repeat.for=\"item of siteinfo.siteArray | infoFilter:'DLNK'\">\r\n                <compose view=\"./components/newsItem.html\"></compose>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-lg-5 bigMarginTop leftMargin\">\r\n            <h2 class=\"underline bottomMargin\">Useful Links</h2>\r\n            <div repeat.for=\"item of siteinfo.siteArray | infoFilter:'OLNK'\">\r\n                <compose view=\"./components/homePageLinks.html\"></compose>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-md-3 bigMarginTop leftMargin\">\r\n            <h2 class=\"underline\">UCC and UA News</h2>\r\n            <div repeat.for=\"item of siteinfo.siteArray | infoFilter:'NEWS'\">\r\n                <compose view=\"./components/newsItem.html\"></compose>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>\r\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ })

}]);
//# sourceMappingURL=app-c8cdc254.c2f6f034a062b3d7f766.bundle.js.map