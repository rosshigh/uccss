"use strict";
(self["webpackChunkuccss_old_new"] = self["webpackChunkuccss_old_new"] || []).push([["app-34726010"],{

/***/ "modules/facco/viewAssignments":
/*!**********************************************!*\
  !*** ./src/modules/facco/viewAssignments.js ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ViewAssignments: function() { return /* binding */ ViewAssignments; }
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









let ViewAssignments = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_config_appConfig__WEBPACK_IMPORTED_MODULE_6__.AppConfig, _resources_data_people__WEBPACK_IMPORTED_MODULE_8__.People, _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_1__.DataTable, _resources_utils_utils__WEBPACK_IMPORTED_MODULE_7__.Utils, _resources_data_sessions__WEBPACK_IMPORTED_MODULE_2__.Sessions, _resources_data_products__WEBPACK_IMPORTED_MODULE_4__.Products, _resources_data_systems__WEBPACK_IMPORTED_MODULE_3__.Systems, _resources_data_clientRequests__WEBPACK_IMPORTED_MODULE_5__.ClientRequests), _dec(_class = class ViewAssignments {
  constructor(config, people, datatable, utils, sessions, products, systems, requests) {
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
  attached() {
    $('[data-toggle="tooltip"]').tooltip();
  }
  canActivate() {
    this.userObj = JSON.parse(sessionStorage.getItem('user'));
  }
  async activate() {
    let responses = await Promise.all([this.sessions.getSessionsArray('?order=startDate:DSC', true), this.people.getInstitutionPeople('?filter=institutionId|eq|' + this.userObj.institutionId._id + '&order=lastName'), this.products.getProductsArray('?filter=active|eq|true&order=name'), this.systems.getSystemsArray(), this.config.getConfig()]);
  }
  async getAssignments() {
    if (this.selectedSession) {
      this.sessions.selectSessionById(this.selectedSession);
      await this.requests.getClientRequestsDetailFaccoArray(this.selectedSession, this.userObj.institutionId._id, true);
      this.getAssignmentsArray();
      this.dataTable.updateArray(this.assignmentsArray);
    } else {
      this.dataTable.updateArray([]);
    }
    this.clearFilters();
  }
  getAssignmentsArray() {
    this.assignmentsArray = [];
    this.requests.requestsDetailsArray.forEach(item => {
      if (item.assignments) {
        item.assignments.forEach(assign => {
          this.assignmentsArray.push({
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
            course: item.requestId.courseId !== null ? item.requestId.courseId.number : this.config.SANDBOX_NAME
          });
        });
      }
    });
  }
  async refresh() {
    this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
    await this.getAssignments();
    this.spinnerHTML = "";
  }
  clearFilters() {
    this.productFilterValue = "";
    this.helpTicketTypeFilterValue = "";
  }
  courseCustomFilter(value, item, context) {
    if (value == 'Regular' && item.requestId.courseId != context.config.SANDBOX_ID) return true;
    if (value == context.config.SANDBOX_ID && item.requestId.courseId == context.config.SANDBOX_ID) return true;
    return false;
  }
  nameCustomFilter(value, item, context) {
    for (let i = 0; i < context.people.instutionPeopleArray.length; i++) {
      if (item.requestId.personId == context.people.instutionPeopleArray[i]._id) {
        return context.people.instutionPeopleArray[i].fullName.toUpperCase().indexOf(value.toUpperCase()) > -1;
      }
    }
    return false;
  }
  customPersonSorter(sortProperty, sortDirection, sortArray, context) {
    return sortArray.sort((a, b) => {
      if (a['requestId']['personId']['lastName'] && b['requestId']['personId']['lastName']) {
        var result = a['requestId']['personId']['lastName'] < b['requestId']['personId']['lastName'] ? -1 : a['requestId']['personId']['lastName'] > b['requestId']['personId']['lastName'] ? 1 : 0;
      } else {
        var result = -1;
      }
      return result * sortDirection;
    });
  }
  customNameFilter(value, item, context) {
    return item.person.toUpperCase().indexOf(value.toUpperCase()) > -1;
  }
  customProductNameFilter(value, item, context) {
    return item.product.toUpperCase().indexOf(value.toUpperCase()) > -1;
  }
}) || _class);

/***/ }),

/***/ "modules/facco/viewRequests":
/*!*******************************************!*\
  !*** ./src/modules/facco/viewRequests.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ViewRequests: function() { return /* binding */ ViewRequests; }
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









let ViewRequests = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_config_appConfig__WEBPACK_IMPORTED_MODULE_6__.AppConfig, _resources_data_people__WEBPACK_IMPORTED_MODULE_8__.People, _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_1__.DataTable, _resources_utils_utils__WEBPACK_IMPORTED_MODULE_7__.Utils, _resources_data_sessions__WEBPACK_IMPORTED_MODULE_2__.Sessions, _resources_data_products__WEBPACK_IMPORTED_MODULE_4__.Products, _resources_data_systems__WEBPACK_IMPORTED_MODULE_3__.Systems, _resources_data_clientRequests__WEBPACK_IMPORTED_MODULE_5__.ClientRequests), _dec(_class = class ViewRequests {
  constructor(config, people, datatable, utils, sessions, products, systems, requests) {
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
  attached() {
    $('[data-toggle="tooltip"]').tooltip();
  }
  canActivate() {
    this.userObj = JSON.parse(sessionStorage.getItem('user'));
  }
  async activate() {
    let responses = await Promise.all([this.sessions.getSessionsArray('?order=startDate:DSC', true), this.people.getInstitutionPeople('?filter=institutionId|eq|' + this.userObj.institutionId._id + '&order=lastName'), this.products.getProductsArray('?filter=active|eq|true&order=name'), this.systems.getSystemsArray(), this.config.getConfig()]);
  }
  async getRequests() {
    if (this.selectedSession) {
      this.sessions.selectSessionById(this.selectedSession);
      await this.requests.getClientRequestsDetailFaccoArray(this.selectedSession, this.userObj.institutionId._id, true);
      this.requests.requestsDetailsArray.forEach(item => {
        item.course = item.requestId.courseId !== null ? item.requestId.courseId.number : this.config.SANDBOX_NAME;
      });
      this.dataTable.updateArray(this.requests.requestsDetailsArray);
    } else {
      this.dataTable.updateArray([]);
    }
    this.clearFilters();
  }
  async refresh() {
    this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
    await this.getRequests();
    this.spinnerHTML = "";
  }
  clearFilters() {
    this.courseFilter = "";
    this.requestStatusFilter = "";
    this.productFilterValue = "";
    this.helpTicketTypeFilterValue = "";
  }
  courseCustomFilter(value, item, context) {
    if (value == 'Regular' && item.requestId.courseId != context.config.SANDBOX_ID) return true;
    if (value == context.config.SANDBOX_ID && item.requestId.courseId == context.config.SANDBOX_ID) return true;
    return false;
  }
  nameCustomFilter(value, item, context) {
    for (let i = 0; i < context.people.instutionPeopleArray.length; i++) {
      if (item.requestId.personId == context.people.instutionPeopleArray[i]._id) {
        return context.people.instutionPeopleArray[i].fullName.toUpperCase().indexOf(value.toUpperCase()) > -1;
      }
    }
    return false;
  }
  customPersonSorter(sortProperty, sortDirection, sortArray, context) {
    return sortArray.sort((a, b) => {
      if (a['requestId']['personId']['lastName'] && b['requestId']['personId']['lastName']) {
        var result = a['requestId']['personId']['lastName'] < b['requestId']['personId']['lastName'] ? -1 : a['requestId']['personId']['lastName'] > b['requestId']['personId']['lastName'] ? 1 : 0;
      } else {
        var result = -1;
      }
      return result * sortDirection;
    });
  }
  customNameFilter(value, item, context) {
    return item.requestId && item.requestId.personId.fullName.toUpperCase().indexOf(value.toUpperCase()) > -1;
  }
  customProductNameFilter(value, item, context) {
    return item.productId.name.toUpperCase().indexOf(value.toUpperCase()) > -1;
  }
}) || _class);

/***/ }),

/***/ "modules/home/about":
/*!***********************************!*\
  !*** ./src/modules/home/about.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   About: function() { return /* binding */ About; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var aurelia_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-router */ 6433);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
var _dec, _class;



let About = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(aurelia_router__WEBPACK_IMPORTED_MODULE_1__.Router, _config_appConfig__WEBPACK_IMPORTED_MODULE_2__.AppConfig), _dec(_class = class About {
  constructor(router, config) {
    this.title = "UCC Contact Information";
    this.router = router;
    this.config = config;
  }
  activate() {
    this.config.getConfig(true);
  }
  attached() {
    $(".nav a").on("click", function () {
      $(".nav").find(".active").removeClass("active");
      $(this).parent().addClass("active");
    });
  }
  configureRouter(config, router) {
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
  }
}) || _class);

/***/ }),

/***/ "modules/home/contact":
/*!*************************************!*\
  !*** ./src/modules/home/contact.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Contact: function() { return /* binding */ Contact; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _resources_data_siteInfo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../resources/data/siteInfo */ 1290);
/* harmony import */ var _resources_data_people__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../resources/data/people */ 353);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
var _dec, _class;




let Contact = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_resources_data_siteInfo__WEBPACK_IMPORTED_MODULE_1__.SiteInfo, _resources_data_people__WEBPACK_IMPORTED_MODULE_2__.People, _config_appConfig__WEBPACK_IMPORTED_MODULE_3__.AppConfig), _dec(_class = class Contact {
  constructor(siteinfo, people, config) {
    this.siteinfo = siteinfo;
    this.people = people;
    this.config = config;
  }
  async activate() {
    let uccRoles = "";
    this.config.ROLES.forEach(item => {
      if (item.UCConly) uccRoles += item.role + ":";
    });

    // await this.siteinfo.getInfoArray();
    await this.config.getConfig();
    await this.people.getUCCStaff(uccRoles);
    this.showPersonalContactInfo = this.config.SHOW_STAFF_CONTACT == 0;
    this.directors = new Array();
    this.staff = new Array();
    this.admin = new Array();
    this.people.uccPeople.forEach(item => {
      if (item.roles.indexOf('TMAN') > -1) {
        this.directors.push({
          item: item,
          role: 'TMAN'
        });
      } else if (item.roles.indexOf('EDIR') > -1) {
        this.directors.push({
          item: item,
          role: 'EDIR'
        });
      } else if (item.roles.indexOf('TDIR') > -1) {
        this.directors.push({
          item: item,
          role: 'TDIR'
        });
      } else if (item.roles.indexOf('TMGR') > -1) {
        this.directors.push({
          item: item,
          role: 'TMGR'
        });
      } else if (item.roles.indexOf('UCCT') > -1 && item.roles.indexOf('STUT') == -1) {
        this.staff.push(item);
      } else if (item.roles.indexOf('UCCA') > -1) {
        this.admin.push(item);
      }
    });
    this.staff = this.staff.sort((a, b) => {
      return a.lastName > b.lastName;
    });
    this.directors = this.directors.sort((a, b) => {
      return a.role > b.role;
    });
  }
}) || _class);

/***/ }),

/***/ "modules/home/home":
/*!**********************************!*\
  !*** ./src/modules/home/home.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Home: function() { return /* binding */ Home; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _resources_data_siteInfo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../resources/data/siteInfo */ 1290);
/* harmony import */ var _resources_data_sessions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../resources/data/sessions */ 2073);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! moment */ 381);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_4__);
var _dec, _class;





let Home = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_resources_data_siteInfo__WEBPACK_IMPORTED_MODULE_1__.SiteInfo, _resources_data_sessions__WEBPACK_IMPORTED_MODULE_2__.Sessions, _config_appConfig__WEBPACK_IMPORTED_MODULE_3__.AppConfig, aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.TemplatingEngine), _dec(_class = class Home {
  constructor(siteinfo, sessions, config, templatingEngine) {
    this.email = '';
    this.password = '';
    this.loginError = '';
    this.sessions = sessions;
    this.siteinfo = siteinfo;
    this.config = config;
    this.config.getConfig(true);
    this.templatingEngine = templatingEngine;
  }
  async activate() {
    var currentDate = moment__WEBPACK_IMPORTED_MODULE_4___default()(new Date()).format("MM-DD-YYYY");
    var options = '?filter=expiredDate|gt|' + currentDate + '&order=sortOrder';
    let responses = await Promise.all([this.sessions.getSessionsArray('?order=startDate', true), this.siteinfo.getInfoArray(true, options)]);
    if (this.isMobile()) {
      console.log('Mobile');
      this.config.isMobile = true;
    }
  }
  async attached() {
    setTimeout(() => {
      setTimeout(() => {
        this.letsEnhance();
      }, 100);
    }, 100);
  }
  isMobile(device) {
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
    }
    // var isMobile = {
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
  }

  letsEnhance() {
    $("#leftContainer").html(this.config.HOME_PAGE_LEFT);
    let el1 = document.getElementById('leftContainer');
    if (el1) {
      if (!el1.querySelectorAll('.au-target').length) {
        this.templatingEngine.enhance({
          element: el1,
          bindingContext: this
        });
      }
    }
    $("#middleContainer").html(this.config.HOME_PAGE_MIDDLE);
    let el2 = document.getElementById('middleContainer');
    if (el2) {
      if (!el2.querySelectorAll('.au-target').length) {
        this.templatingEngine.enhance({
          element: el2,
          bindingContext: this
        });
      }
    }
    $("#rightContainer").html(this.config.HOME_PAGE_RIGHT);
    let el3 = document.getElementById('rightContainer');
    if (el3) {
      if (!el3.querySelectorAll('.au-target').length) {
        this.templatingEngine.enhance({
          element: el3,
          bindingContext: this
        });
      }
    }
  }
}) || _class);

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
var code = "<template>\r\n  <div>\r\n    <div class=\"col-md-6 bottomMargin\">\r\n      <a href.bind=item.url target=\"_blank\">${item.title}</a>\r\n      <br><span innerhtml.bind=\"item.content\"></span>\r\n    </div>\r\n  </div>\r\n</template>";
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
var code = "<template>\r\n  <div class=\"bottomMargin\">\r\n    <span class=\"col-md-12 newsTitle topMargin\">${item.title}</span>\r\n    <span innerhtml.bind=\"item.content\"></span>\r\n    <span class=\"newsUrl\"><a href.bind=\"item.url\" target=\"_blank\">more info...</a></span>\r\n  </div>\r\n</template>";
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
var code = "<template>\r\n\t<div class=\"home-page-header underline\">${config.HOME_PAGE_UCC_TITLE}</div>\r\n\t<div id=\"leftContainer\" class=\"col-lg-3\"><!--\r\n\t\t<h3 class=\"underline\">Current Sessions</h3>\r\n\t\t<div class=\"list-group\">\r\n\t\t\t<a class=\"list-group-item\" repeat.for=\"session of sessions.sessionsArray | sessionType:'Active:Requests:Next'\">\r\n\t\t\t\t<h4 class=\"list-group-item-heading\">${session.sessionStatus}: Session ${session.session} - ${session.year}</h4>\r\n\t\t\t\t<p class=\"list-group-item-text\">Requests open: ${session.requestsOpenDate | dateFormat:config.DATE_FORMAT_TABLE}</p>\r\n\t\t\t\t<p class=\"list-group-item-text\">Clients available: ${session.startDate | dateFormat:config.DATE_FORMAT_TABLE}</p>\r\n\t\t\t\t<p class=\"list-group-item-text\">Session ends: ${session.endDate | dateFormat:config.DATE_FORMAT_TABLE}</p>\r\n\t\t\t</a>\r\n\t\t</div>\r\n\t\t-->\r\n\t</div>\r\n\t<div id=\"middleContainer\" class=\"col-lg-4 col-lg-offset-1\">\r\n\t\t<!--\r\n\t\t<h3 class=\"underline\">Sessions Schedule</h3>\r\n\t\t<div repeat.for=\"item of siteinfo.siteArray | infoFilter:'INFO'\">\r\n\t\t\t<h3>${item.title}</h3>\r\n\t\t\t<span innerhtml=\"${item.content}\"></span>\r\n\t\t</div>\r\n\t\t-->\r\n\t</div>\r\n\t<div id=\"rightContainer\" class=\"col-lg-3\">\r\n\t\t<!--\r\n\t\t<h3 class=\"underline\">UCC Sessions</h3>\r\n\t\t<span innerhtml.bind=\"config.SESSION_EXPLANATION\"></span>\r\n\t\t-->\r\n\t</div>\r\n\r\n</template>\r\n";
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
var code = "<template>\n    <style>\n        .navbar-inverse {\n            color: ${config.SUBMENU_COLOR};\n            background-color:${config.SUBMENU_BACKGROUND}\n        }\n        .navbar-inverse .navbar-nav>.active>a, .navbar-inverse .navbar-nav>.active>a:hover, .navbar-inverse .navbar-nav>.active>a:focus {\n            color: ${config.ACTIVE_SUBMENU_COLOR};\n            background-color:${config.SUBMENU_BACKGROUND}\n        }\n    </style>\n    <div class=\"${item.priority} textContainer banner\" repeat.for=\"item of siteinfo.siteArray | infoFilter:'SYST'\">\n        <h4 class=\"leftMargin\">${item.title}</h4>\n   <!--     <h6>${item.content}</h6> -->\n    </div>\n\n    <div class=\"parallax1\">\n        <div if.bind=\"config.HOME_WELCOME.length === 0\" class=\"pull-right topMargin rightMargin\">\n            <img src=\"${config.IMG_DOWNLOAD_URL}img/${config.UCC_PARALLAX_LOGO}\" width=\"300px\">\n        </div>\n        <div if.bind=\"config.HOME_WELCOME.length > 0\" class=\"caption\">\n        <span class=\"border\">${config.HOME_WELCOME}</span> \n        </div>\n    </div>\n\n<div class=\"row center-text\" style=\"color: #777;background-color:white;text-align:center;padding:25px 80px;text-align: justify;\">\n       <compose view=\"./components/uccInformation.html\"></compose>\n</div>\n\n <div class=\"parallax1\"></div>\n\n <div class=\"row bigMarginTop\" style=\"color: #777;background-color:white;text-align:center;padding:50px 80px;text-align: justify;\">\n        <div class=\"col-lg-3 bigMarginTop\">\n            <h2 class=\"underline\">Useful Information</h2>\n            <div repeat.for=\"item of siteinfo.siteArray | infoFilter:'DLNK'\">\n                <compose view=\"./components/newsItem.html\"></compose>\n            </div>\n        </div>\n        <div class=\"col-lg-5 bigMarginTop leftMargin\">\n            <h2 class=\"underline bottomMargin\">Useful Links</h2>\n            <div repeat.for=\"item of siteinfo.siteArray | infoFilter:'OLNK'\">\n                <compose view=\"./components/homePageLinks.html\"></compose>\n            </div>\n        </div>\n        <div class=\"col-md-3 bigMarginTop leftMargin\">\n            <h2 class=\"underline\">UCC and UA News</h2>\n            <div repeat.for=\"item of siteinfo.siteArray | infoFilter:'NEWS'\">\n                <compose view=\"./components/newsItem.html\"></compose>\n            </div>\n        </div>\n    </div>\n</template>\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ })

}]);
//# sourceMappingURL=app-34726010.2384d3fce1a12a237460.bundle.js.map