"use strict";
(self["webpackChunkuccss_old_new"] = self["webpackChunkuccss_old_new"] || []).push([["app-a9114bfc"],{

/***/ "modules/analytics/analytics":
/*!********************************************!*\
  !*** ./src/modules/analytics/analytics.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Analytics: function() { return /* binding */ Analytics; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var aurelia_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-router */ 6433);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
var _dec, _class;



let Analytics = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(aurelia_router__WEBPACK_IMPORTED_MODULE_1__.Router, _config_appConfig__WEBPACK_IMPORTED_MODULE_2__.AppConfig), _dec(_class = class Analytics {
  constructor(router, config) {
    this.title = "Analytics";
    this.router = router;
    this.config = config;
  }
  attached() {
    $(".nav a").on("click", function () {
      $(".nav").find(".active").removeClass("active");
      $(this).parent().addClass("active");
    });
  }
  activate() {
    this.config.getConfig(true);
  }
  configureRouter(config, router) {
    config.map([{
      route: ['', 'clientRequestsAnalytics'],
      moduleId: './clientRequests',
      settings: {
        auth: true,
        roles: []
      },
      nav: true,
      name: 'clientRequests',
      title: 'Client Requests'
    }, {
      route: 'helpTicketAnalytics',
      moduleId: './helpTickets',
      settings: {
        auth: true,
        roles: []
      },
      nav: true,
      name: 'helpTickets',
      title: 'Help Tickets'
    }, {
      route: 'institutions',
      moduleId: './institutions',
      settings: {
        auth: true,
        roles: []
      },
      nav: true,
      name: 'institutions',
      title: 'Institutions'
    }]);
    this.router = router;
  }
}) || _class);

/***/ }),

/***/ "modules/analytics/clientRequests":
/*!*************************************************!*\
  !*** ./src/modules/analytics/clientRequests.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ClientRequestAnalytics: function() { return /* binding */ ClientRequestAnalytics; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var aurelia_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-router */ 6433);
/* harmony import */ var _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../resources/dialogs/common-dialogs */ 6545);
/* harmony import */ var _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../resources/utils/dataTable */ 6847);
/* harmony import */ var _resources_data_sessions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../resources/data/sessions */ 2073);
/* harmony import */ var _resources_data_systems__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../resources/data/systems */ 4077);
/* harmony import */ var _resources_data_products__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../resources/data/products */ 8666);
/* harmony import */ var _resources_data_clientRequests__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../resources/data/clientRequests */ 5446);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
/* harmony import */ var _resources_utils_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../resources/utils/utils */ 8741);
/* harmony import */ var _resources_data_people__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../resources/data/people */ 353);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! moment */ 381);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_11__);
var _dec, _class;












let ClientRequestAnalytics = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(aurelia_router__WEBPACK_IMPORTED_MODULE_1__.Router, _config_appConfig__WEBPACK_IMPORTED_MODULE_8__.AppConfig, _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_2__.CommonDialogs, _resources_data_people__WEBPACK_IMPORTED_MODULE_10__.People, _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_3__.DataTable, _resources_utils_utils__WEBPACK_IMPORTED_MODULE_9__.Utils, _resources_data_sessions__WEBPACK_IMPORTED_MODULE_4__.Sessions, _resources_data_products__WEBPACK_IMPORTED_MODULE_6__.Products, _resources_data_systems__WEBPACK_IMPORTED_MODULE_5__.Systems, _resources_data_clientRequests__WEBPACK_IMPORTED_MODULE_7__.ClientRequests), _dec(_class = class ClientRequestAnalytics {
  constructor(router, config, dialog, people, datatable, utils, sessions, products, systems, requests) {
    this.chartOptions = {
      legend: {
        display: false
      }
    };
    this.summerTable = true;
    this.summerInstTable = true;
    this.categories = [{
      code: 0,
      description: 'Requests by Institution'
    }, {
      code: 1,
      description: 'Requests by Product'
    }, {
      code: 2,
      description: 'Products by Country'
    }, {
      code: 3,
      description: 'Institution, Country and Products'
    }];
    this.backgroundColors = ['#cc3300', '#99e600', '#0099cc', '#ff0066', '#6666ff', '#1a8cff', '#000080', '#66ff99', '#1aff66', '#808000', '#ffff66', '#4d4d00', '#ccffff', '#006666', '#339933', '#b3ffff', '#000099', '#66ff33', '#269900', '#ffff00', '#ffff66', '#9999ff', '#6600cc', '#009933', '', '#0000b3', '#ff0000', '#00004d', '#0000cc', '#ff0000', '#ff0000', '#ffb3b3', '#ffb3b3', '#e63900', '#ffb3b3', '#330d00', '#ffb3b3', '#3333ff', '#0000cc'];
    this.selectedTab = "institution";
    this.institutionTableSelected = true;
    this.productTableSelected = true;
    this.sapCountryTableSelected = true;
    this.showExportPanel = false;
    this.router = router;
    this.config = config;
    this.dialog = dialog;
    this.people = people;
    this.dataTable = datatable;
    this.dataTable.initialize(this);
    this.utils = utils;
    this.sessions = sessions;
    this.products = products;
    this.requests = requests;
    this.systems = systems;
    this.userObj = JSON.parse(sessionStorage.getItem('user'));
    this.chartCount = 10;
  }
  async attached() {
    $('[data-toggle="tooltip"]').tooltip();
    $('#loading').show();
    let responses = await Promise.all([this.sessions.getSessionsArray('?order=startDate', true), this.people.getInstitutionsArray('?order=name'), this.config.getConfig()]);
    this.selectedCategory = this.categories[0];
    this.selectedSession = this.sessions.sessionsArray[0]._id;
    this.requests.requestsArray = new Array();

    // this.getProductsRequests();
    await this.getInstitutionRequests();
    this.dataTable.updateArray(this.requests.analyticsInstitutionResultArray);
    this.institutionChartDataFunction();
    $('#loading').hide();
  }
  async activate() {}
  async typeChanged(category, el) {
    $('#loading').show();
    this.selectedCategory = category;
    $('.categoryButtons').css("background-color", "");
    $('.categoryButtons').css("color", "");
    $('.categoryButtons').removeClass('menuButtons');
    if (el) {
      $(el.target).css("background-color", this.config.BUTTONS_BACKGROUND);
      $(el.target).css("color", this.config.ACTIVE_SUBMENU_COLOR);
    }
    switch (category.code) {
      case 0:
        if (!this.analyticsInstitutionResultArray || this.analyticsInstitutionResultArray.length === 0) {
          await this.getInstitutionRequests();
        }
        this.dataTable.updateArray(this.requests.analyticsInstitutionResultArray);
        this.institutionChartDataFunction();
        this.selectedTab = "institution";
        break;
      case 1:
        if (!this.requests.analyticsProductsResultArray || this.requests.analyticsProductsResultArray.length === 0) {
          await this.getProductsRequests();
        }
        this.dataTable.updateArray(this.requests.analyticsProductsResultArray);
        this.productChartDataFunction();
        this.selectedTab = "products";
        break;
      case 2:
        if (!this.requests.analyticsCountryProductsResultArray || this.requests.analyticsCountryProductsResultArray.length === 0) {
          await this.getCountryProductsRequests();
        }
        this.dataTable.updateArray(this.requests.analyticsCountryProductsResultArray);
        // this.sapProductChartDataFunction();
        this.selectedTab = "sapProducts";
        break;
      case 3:
        this.getInstitutionsProductsCountryRequests();
        this.dataTable.updateArray(this.requests.analyticsInstitutionCountryResultArray);
    }
    $('#loading').hide();
  }
  async getSessionData() {
    switch (this.selectedTab) {
      case 'institution':
        await this.getInstitutionRequests();
        this.dataTable.updateArray(this.requests.analyticsInstitutionResultArray);
        break;
      case 'products':
        await this.getProductsRequests();
        this.dataTable.updateArray(this.requests.analyticsProductsResultArray);
        break;
      case 'sapProducts':
        await this.getCountryProductsRequests();
        this.dataTable.updateArray(this.requests.analyticsCountryProductsResultArray);
        break;
    }
  }
  async getInstitutionRequests() {
    if (this.selectedSession) {
      this.numCols = this.config.REQUEST_STATUS.length + 1;
      this.sessions.selectSessionById(this.selectedSession);
      await this.requests.getClientRequestsDetailsArrayAnalytics('?filter=sessionId|eq|' + this.selectedSession, true);
      if (this.requests.requestsDetailsArrayAnalytics && this.requests.requestsDetailsArrayAnalytics.length) {
        await this.requests.groupRequestsByInstitution();
        this.totalsInstitutionArray = new Array();
        this.config.REQUEST_STATUS.forEach(item => {
          this.totalsInstitutionArray.push(0);
        });
        this.totalsInstitutionArray.push(0);
        this.totalsInstitutionArray.push(0);
        this.requests.analyticsInstitutionResultArray.forEach(item => {
          this.totalsInstitutionArray[0] += item['total'];
          this.totalsInstitutionArray[1] += item[1];
          this.totalsInstitutionArray[2] += item[2];
          this.totalsInstitutionArray[3] += item[3];
          this.totalsInstitutionArray[4] += item[4];
          this.totalsInstitutionArray[5] += item[5];
          this.totalsInstitutionArray[6] += item[6];
          this.totalsInstitutionArray[7] += item[7];
          this.totalsInstitutionArray[8] += item['studentIds'];
        });
        // this.dataTable.updateArray(this.requests.analyticsInstitutionResultArray);
        // this.institutionChartDataFunction();
      }
    }
  }

  institutionChartDataFunction() {
    if (this.requests.analyticsInstitutionResultArray && this.requests.analyticsInstitutionResultArray.length) {
      this.instChartData = new Array();
      this.instChartCategories = new Array();
      this.config.REQUEST_STATUS.forEach(item => {
        this.instChartData.push(new Array());
      });
      var sortedArray = this.requests.analyticsInstitutionResultArray.sort((a, b) => {
        return a['total'] < b['total'] ? -1 : a['total'] > b['total'] ? 1 : 0;
      });
      sortedArray.forEach(item => {
        this.instChartData[0].push(item["1"]);
        this.instChartData[1].push(item["2"]);
        this.instChartData[2].push(item["3"]);
        this.instChartData[3].push(item["4"]);
        this.instChartData[4].push(item["5"]);
        this.instChartData[5].push(item["6"]);
        this.instChartData[6].push(item["7"]);
        this.instChartCategories.push(item.name);
      });
      this.fastBackIns();
    }
  }
  backwardIns() {
    if (this.firstInstitutionChartRecord - this.chartCount < 0) {
      return;
    } else {
      var count = this.chartCount;
      this.firstInstitutionChartRecord = this.firstInstitutionChartRecord - this.chartCount;
    }
    this.pageInstitutionChartData(count);
  }
  forwardIns() {
    if (this.firstInstitutionChartRecord + this.chartCount < this.instChartCategories.length) {
      var count = this.chartCount;
      this.firstInstitutionChartRecord = this.firstInstitutionChartRecord + this.chartCount;
    } else {
      return;
    }
    this.pageInstitutionChartData(count);
  }
  fastBackIns() {
    this.firstInstitutionChartRecord = 0;
    if (this.firstInstitutionChartRecord + this.chartCount < this.instChartCategories.length) {
      var count = this.chartCount;
    } else {
      var count = this.instChartCategories.length - this.firstInstitutionChartRecord;
    }
    this.pageInstitutionChartData(count);
  }
  fastForwardIns() {
    if (this.instChartCategories.length > this.chartCount) {
      this.firstInstitutionChartRecord = this.instChartCategories.length - this.chartCount;
      var count = this.chartCount;
    } else {
      this.firstInstitutionChartRecord = 0;
      var count = this.instChartCategories.length - this.firstInstitutionChartRecord;
    }
    this.pageInstitutionChartData(count);
  }
  pageInstitutionChartData(count) {
    var data = [];
    for (let index = 0; index < this.instChartData.length; index++) {
      data[index] = this.instChartData[index].slice(this.firstInstitutionChartRecord, this.firstInstitutionChartRecord + count);
    }
    var categories = this.instChartCategories.slice(this.firstInstitutionChartRecord, this.firstInstitutionChartRecord + count);
    this.institutionChartData = {
      labels: categories,
      maintainAspectRatio: false,
      datasets: [{
        label: this.config.REQUEST_STATUS[0].description,
        data: data[0],
        backgroundColor: this.backgroundColors[0],
        hoverBackgroundColor: this.backgroundColors[0],
        hoverBorderWidth: 2,
        hoverBorderColor: 'lightgrey'
      }, {
        label: this.config.REQUEST_STATUS[1].description,
        data: data[1],
        backgroundColor: this.backgroundColors[1],
        hoverBackgroundColor: this.backgroundColors[1],
        hoverBorderWidth: 2,
        hoverBorderColor: 'lightgrey'
      }, {
        label: this.config.REQUEST_STATUS[2].description,
        data: data[2],
        backgroundColor: this.backgroundColors[2],
        hoverBackgroundColor: this.backgroundColors[2],
        hoverBorderWidth: 2,
        hoverBorderColor: 'lightgrey'
      }, {
        label: this.config.REQUEST_STATUS[3].description,
        data: data[3],
        backgroundColor: this.backgroundColors[3],
        hoverBackgroundColor: this.backgroundColors[3],
        hoverBorderWidth: 2,
        hoverBorderColor: 'lightgrey'
      }, {
        label: this.config.REQUEST_STATUS[4].description,
        data: data[4],
        backgroundColor: this.backgroundColors[4],
        hoverBackgroundColor: this.backgroundColors[4],
        hoverBorderWidth: 2,
        hoverBorderColor: 'lightgrey'
      }, {
        label: this.config.REQUEST_STATUS[5].description,
        data: data[5],
        backgroundColor: this.backgroundColors[5],
        hoverBackgroundColor: this.backgroundColors[5],
        hoverBorderWidth: 2,
        hoverBorderColor: 'lightgrey'
      }, {
        label: this.config.REQUEST_STATUS[6].description,
        data: data[6],
        backgroundColor: this.backgroundColors[6],
        hoverBackgroundColor: this.backgroundColors[6],
        hoverBorderWidth: 2,
        hoverBorderColor: 'lightgrey'
      }]
    };
  }
  async getProductsRequests() {
    if (this.selectedSession) {
      this.numCols = this.config.REQUEST_STATUS.length + 1;
      this.sessions.selectSessionById(this.selectedSession);
      await this.requests.getClientRequestsDetailsArrayAnalytics('?filter=sessionId|eq|' + this.selectedSession, true);
      if (this.requests.requestsDetailsArrayAnalytics && this.requests.requestsDetailsArrayAnalytics.length) {
        this.requests.groupRequestsByProduct();
      } else {
        this.displayArray = new Array();
      }
    } else {
      this.displayArray = new Array();
    }

    // this.dataTable.updateArray(this.requests.analyticsProductsResultArray);
    // this.productChartDataFunction();
  }

  productChartDataFunction() {
    this.prodChartdata = new Array();
    this.prodChartCategories = new Array();
    this.config.REQUEST_STATUS.forEach(item => {
      this.prodChartdata.push(new Array());
    });
    var sortedArray = this.requests.analyticsProductsResultArray.sort((a, b) => {
      return a['total'] < b['total'] ? -1 : a['total'] > b['total'] ? 1 : 0;
    });
    sortedArray.forEach(item => {
      this.prodChartdata[0].push(item["1"]);
      this.prodChartdata[1].push(item["2"]);
      this.prodChartdata[2].push(item["3"]);
      this.prodChartdata[3].push(item["4"]);
      this.prodChartdata[4].push(item["5"]);
      this.prodChartdata[5].push(item["6"]);
      this.prodChartdata[6].push(item["7"]);
      this.prodChartCategories.push(item.productId.name);
    });
    this.fastBackProd();
  }
  backwardProd() {
    if (this.firstProductChartRecord - this.chartCount < 0) {
      return;
    } else {
      var count = this.chartCount;
      this.firstProductChartRecord = this.firstProductChartRecord - this.chartCount;
    }
    this.pageProductChartData(count);
  }
  forwardProd() {
    if (this.firstProductChartRecord + this.chartCount < this.prodChartCategories.length) {
      var count = this.chartCount;
      this.firstProductChartRecord = this.firstProductChartRecord + this.chartCount;
    } else {
      return;
    }
    this.pageProductChartData(count);
  }
  fastBackProd() {
    this.firstProductChartRecord = 0;
    if (this.firstProductChartRecord + this.chartCount < this.prodChartCategories.length) {
      var count = this.chartCount;
    } else {
      var count = this.prodChartCategories.length - this.firstProductChartRecord;
    }
    this.pageProductChartData(count);
  }
  fastForwardProd() {
    if (this.prodChartCategories.length > this.chartCount) {
      this.firstProductChartRecord = this.prodChartCategories.length - this.chartCount;
      var count = this.chartCount;
    } else {
      this.firstProductChartRecord = 0;
      var count = this.prodChartCategories.length - this.firstProductChartRecord;
    }
    this.pageProductChartData(count);
  }
  pageProductChartData(count) {
    var data = [];
    for (let index = 0; index < this.prodChartdata.length; index++) {
      data[index] = this.prodChartdata[index].slice(this.firstProductChartRecord, this.firstProductChartRecord + count);
    }
    var categories = this.prodChartCategories.slice(this.firstProductChartRecord, this.firstProductChartRecord + count);
    this.productChartData = {
      labels: categories,
      maintainAspectRatio: false,
      datasets: [{
        label: this.config.REQUEST_STATUS[0].description,
        data: data[0],
        backgroundColor: this.backgroundColors[0],
        hoverBackgroundColor: this.backgroundColors[0],
        hoverBorderWidth: 2,
        hoverBorderColor: 'lightgrey'
      }, {
        label: this.config.REQUEST_STATUS[1].description,
        data: data[1],
        backgroundColor: this.backgroundColors[1],
        hoverBackgroundColor: this.backgroundColors[1],
        hoverBorderWidth: 2,
        hoverBorderColor: 'lightgrey'
      }, {
        label: this.config.REQUEST_STATUS[2].description,
        data: data[2],
        backgroundColor: this.backgroundColors[2],
        hoverBackgroundColor: this.backgroundColors[2],
        hoverBorderWidth: 2,
        hoverBorderColor: 'lightgrey'
      }, {
        label: this.config.REQUEST_STATUS[3].description,
        data: data[3],
        backgroundColor: this.backgroundColors[3],
        hoverBackgroundColor: this.backgroundColors[3],
        hoverBorderWidth: 2,
        hoverBorderColor: 'lightgrey'
      }, {
        label: this.config.REQUEST_STATUS[4].description,
        data: data[4],
        backgroundColor: this.backgroundColors[4],
        hoverBackgroundColor: this.backgroundColors[4],
        hoverBorderWidth: 2,
        hoverBorderColor: 'lightgrey'
      }, {
        label: this.config.REQUEST_STATUS[5].description,
        data: data[5],
        backgroundColor: this.backgroundColors[5],
        hoverBackgroundColor: this.backgroundColors[5],
        hoverBorderWidth: 2,
        hoverBorderColor: 'lightgrey'
      }, {
        label: this.config.REQUEST_STATUS[6].description,
        data: data[6],
        backgroundColor: this.backgroundColors[6],
        hoverBackgroundColor: this.backgroundColors[6],
        hoverBorderWidth: 2,
        hoverBorderColor: 'lightgrey'
      }]
    };
  }
  async getCountryProductsRequests() {
    if (this.selectedSession) {
      this.numCols = this.config.REQUEST_STATUS.length + 1;
      this.sessions.selectSessionById(this.selectedSession);
      await this.requests.getClientRequestsDetailsArrayAnalytics('?filter=sessionId|eq|' + this.selectedSession, true);
      if (this.requests.requestsDetailsArrayAnalytics && this.requests.requestsDetailsArrayAnalytics.length) {
        await this.requests.groupRequestsByCountry();
        this.totalsCountryArray = new Array();
        this.config.REQUEST_STATUS.forEach(item => {
          this.totalsCountryArray.push(0);
        });
        this.totalsCountryArray.push(0);
        this.requests.analyticsCountryProductsResultArray.forEach(item => {
          this.totalsCountryArray[0] += item['total'];
          this.totalsCountryArray[1] += item[1];
          this.totalsCountryArray[2] += item[2];
          this.totalsCountryArray[3] += item[3];
          this.totalsCountryArray[4] += item[4];
          this.totalsCountryArray[5] += item[5];
          this.totalsCountryArray[6] += item[6];
          this.totalsCountryArray[7] += item[7];
        });
        // this.dataTable.updateArray(this.requests.analyticsInstitutionResultArray);
        // this.institutionChartDataFunction();
      }
    }
  }

  async getInstitutionsProductsCountryRequests() {
    await this.requests.groupRequestsByInstitutionCountry();
  }
  sapProductChartDataFunction() {
    var data = new Array();
    var categories = new Array();
    this.config.REQUEST_STATUS.forEach(item => {
      data.push(new Array());
    });
    var sortedArray = this.requests.analyticsInstitutionResultArray.sort((a, b) => {
      return a['total'] < b['total'] ? -1 : a['total'] > b['total'] ? 1 : 0;
    });
    sortedArray.forEach(item => {
      data[0].push(item["1"]);
      data[1].push(item["2"]);
      data[2].push(item["3"]);
      data[3].push(item["4"]);
      data[4].push(item["5"]);
      data[5].push(item["6"]);
      data[6].push(item["7"]);
      categories.push(item.name);
    });
    this.institutionChartData = {
      labels: categories,
      maintainAspectRatio: false,
      datasets: [{
        label: this.config.REQUEST_STATUS[0].description,
        data: data[0],
        backgroundColor: this.backgroundColors[0],
        hoverBackgroundColor: this.backgroundColors[0],
        hoverBorderWidth: 2,
        hoverBorderColor: 'lightgrey'
      }, {
        label: this.config.REQUEST_STATUS[1].description,
        data: data[1],
        backgroundColor: this.backgroundColors[1],
        hoverBackgroundColor: this.backgroundColors[1],
        hoverBorderWidth: 2,
        hoverBorderColor: 'lightgrey'
      }, {
        label: this.config.REQUEST_STATUS[2].description,
        data: data[2],
        backgroundColor: this.backgroundColors[2],
        hoverBackgroundColor: this.backgroundColors[2],
        hoverBorderWidth: 2,
        hoverBorderColor: 'lightgrey'
      }, {
        label: this.config.REQUEST_STATUS[3].description,
        data: data[3],
        backgroundColor: this.backgroundColors[3],
        hoverBackgroundColor: this.backgroundColors[3],
        hoverBorderWidth: 2,
        hoverBorderColor: 'lightgrey'
      }, {
        label: this.config.REQUEST_STATUS[4].description,
        data: data[4],
        backgroundColor: this.backgroundColors[4],
        hoverBackgroundColor: this.backgroundColors[4],
        hoverBorderWidth: 2,
        hoverBorderColor: 'lightgrey'
      }, {
        label: this.config.REQUEST_STATUS[5].description,
        data: data[5],
        backgroundColor: this.backgroundColors[5],
        hoverBackgroundColor: this.backgroundColors[5],
        hoverBorderWidth: 2,
        hoverBorderColor: 'lightgrey'
      }, {
        label: this.config.REQUEST_STATUS[6].description,
        data: data[6],
        backgroundColor: this.backgroundColors[6],
        hoverBackgroundColor: this.backgroundColors[6],
        hoverBorderWidth: 2,
        hoverBorderColor: 'lightgrey'
      }]
    };
  }
  async showProductDetail(product) {
    this.summerTable = !this.summerTable;
    if (!this.summerTable) {
      let response = await this.requests.getClientRequestsDetailsArray('?filter=[and]productId|eq|' + product.productId._id + ':sessionId|eq|' + this.selectedSession, true);
      this.dataTable.updateArray(this.requests.requestsDetailsArray);
      this.selectedProductDetails = product.productId.name;
    } else {
      this.dataTable.updateArray(this.requests.analyticsProductsResultArray);
    }
  }
  async showProductInstitutionDetail(product) {
    this.summerInstTable = !this.summerInstTable;
    if (!this.summerInstTable) {
      let response = await this.requests.getClientRequestsDetailFaccoArray(this.selectedSession, product.institutionId, true);
      this.dataTable.updateArray(this.requests.requestsDetailsArray);
      this.selectedInstitutionDetail = product.requestId.institutionId.name;
    } else {
      this.dataTable.updateArray(this.requests.analyticsInstitutionResultArray);
    }
  }
  showInstitutionTable() {
    this.institutionTableSelected = true;
  }
  showInstitutionGraph() {
    this.institutionTableSelected = false;
  }
  showProductTable() {
    this.productTableSelected = true;
  }
  showProductGraph() {
    this.productTableSelected = false;
  }
  showSAPProductTable() {
    this.sapProductTableSelected = true;
  }
  showSAPProductGraph() {
    this.sapProductTableSelected = false;
  }
  customerActionDialog() {
    if (this.profileRequest) {
      this.model = 'header';
      this.selectedRequestNo = this.profileRequest.requestId.clientRequestNo;
      this.requestId = this.profileRequest.requestId._id;
      this.course = this.profileRequest.requestId.courseId ? this.profileRequest.requestId.courseId.name : this.config.SANDBOX_NAME;
      this.productName = this.profileRequest.productId.name;
      this.requiredDate = this.profileRequest.requiredDate;
      this.email = this.profileRequest.requestId.personId.email;
      this.hideProfile();
    }
    let subject = "Question about product request " + this.selectedRequestNo;
    let email = {
      emailBody: "",
      emailSubject: subject,
      emailId: this.email
    };
    return this.dialog.showEmail("Enter Email", email, ['Submit', 'Cancel']).whenClosed(response => {
      if (!response.wasCancelled) {
        this.sendTheEmail(response.output);
      } else {
        console.log("Cancelled");
      }
    });
  }
  async sendTheEmail(email) {
    if (email) {
      var date = new Date(this.requiredDate);
      var day = date.getDate();
      var month = date.getMonth() + 1;
      var year = date.getFullYear();
      this.message = {
        reason: 3,
        id: this.requestId,
        customerMessage: email.email.emailBody,
        email: email.email.emailId,
        subject: email.email.emailSubject,
        clientRequestNo: this.selectedRequestNo,
        product: [{
          name: this.productName,
          requiredDate: month + "/" + day + "/" + year
        }],
        session: this.sessions.selectedSession.session + ' ' + this.sessions.selectedSession.year,
        course: this.course,
        requestStatus: this.config.CUSTOMER_ACTION_REQUEST_CODE,
        model: this.model,
        audit: {
          property: 'Send Message',
          eventDate: new Date(),
          newValue: email.email.emailBody,
          personId: this.userObj._id
        }
      };
      let serverResponse = await this.requests.sendCustomerMessage(this.message);
      if (!serverResponse.error) {
        this.utils.showNotification("The message was sent");
      }
    }
  }
  showProfile(request, el) {
    this.profileRequest = request;
    $(".hoverProfile").css("top", el.clientY - 250);
    $(".hoverProfile").css("left", el.clientX - 300);
    $(".hoverProfile").css("display", "block");
  }
  hideProfile() {
    $(".hoverProfile").css("display", "none");
  }
  downloadExcel() {
    let csvContent = "data:text/csv;charset=utf-8;,Product";
    this.config.REQUEST_STATUS.forEach(item => {
      csvContent += "," + item.description;
    });
    csvContent += "\r\n";
    this.dataTable.baseArray.forEach(item => {
      csvContent += item.productId.name;
      this.config.REQUEST_STATUS.forEach((field, index) => {
        csvContent += "," + item[field.code];
      });
      csvContent += "\r\n";
    });
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "requestsByProduct.csv");
    document.body.appendChild(link);
    link.click();
  }
  downloadAllInstitutionCountriesExcel() {
    let csvContent = "data:text/csv;charset=utf-8;,Institution,Faculty,Country,Product,Clients,Students";
    csvContent += "\r\n";
    this.dataTable.baseArray.forEach(item => {
      csvContent += item.name.replace(",", " ") + "," + item.person.replace(",", " ") + "," + item.country + "," + item.productName.replace(",", " ") + "," + item.total + "," + item.students;
      csvContent += "\r\n";
    });
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "requestsByInstituionCountries.csv");
    document.body.appendChild(link); // Required for FF

    link.click();
  }
  downloadAllCountriesExcel() {
    let csvContent = "data:text/csv;charset=utf-8;,Product,Country,Total";
    this.config.REQUEST_STATUS.forEach(item => {
      csvContent += "," + item.description;
    });
    csvContent += "\r\n";
    this.dataTable.baseArray.forEach(item => {
      csvContent += item.productId.name + "," + item.country + "," + item.total;
      this.config.REQUEST_STATUS.forEach((field, index) => {
        csvContent += "," + item[field.code];
      });
      csvContent += "\r\n";
    });
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "requestsByCountries.csv");
    document.body.appendChild(link); // Required for FF

    link.click();
  }
  downloadInstExcel() {
    let csvContent = "data:text/csv;charset=utf-8;,Institution";
    this.config.REQUEST_STATUS.forEach(item => {
      csvContent += "," + item.description;
    });
    csvContent += "\r\n";
    this.dataTable.baseArray.forEach(item => {
      csvContent += item.name;
      this.config.REQUEST_STATUS.forEach((field, index) => {
        csvContent += "," + item[field.code];
      });
      csvContent += "\r\n";
    });
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "requestsByInstitution.csv");
    document.body.appendChild(link);
    link.click();

    // var exportArray = this.utils.copyArray(this.requests.analyticsInstitutionResultArray);
    // var htmlContent = "<table><tr><th>Product</th>";
    // var numFields = this.config.REQUEST_STATUS.length;

    // this.config.REQUEST_STATUS.forEach(item => {
    //     htmlContent += "<th>" + item.description + "</th>";
    // })
    // htmlContent += "</tr>";

    // exportArray.forEach(item => {
    //     var line = "<tr><td>" + item.name + "</td>";
    //     this.config.REQUEST_STATUS.forEach((field, index) => {
    //         line += "<td>" + item[field.code] + "</td>"; 
    //     })
    //     line += "</tr>";
    //     htmlContent += line;
    // });
    // htmlContent += "</table>";
    // window.open('data:application/vnd.ms-excel,' + htmlContent);
  }

  customProductSorter(sortProperty, sortDirection, sortArray, context) {
    return sortArray.sort((a, b) => {
      var result = a['productId']['name'] < b['productId']['name'] ? -1 : a['productId']['name'] > b['productId']['name'] ? 1 : 0;
      return result * sortDirection;
    });
  }
  customInstitutionSorter(sortProperty, sortDirection, sortArray, context) {
    return sortArray.sort((a, b) => {
      var result = a['name'] < b['name'] ? -1 : a['name'] > b['name'] ? 1 : 0;
      return result * sortDirection;
    });
  }
  customNameFilterValue(value, item, context) {
    return item.name.toUpperCase().indexOf(value.toUpperCase()) > -1;
  }
  customProductFilterValue(value, item, context) {
    return item.productId.name.toUpperCase().indexOf(value.toUpperCase()) > -1;
  }
  customPersonSorter(sortProperty, sortDirection, sortArray, context) {
    return sortArray.sort((a, b) => {
      var result = a['requestId']['personId']['lastName'] < b['requestId']['personId']['lastName'] ? -1 : a['requestId']['personId']['lastName'] > b['requestId']['personId']['lastName'] ? 1 : 0;
      return result * sortDirection;
    });
  }
  customInstituteSorter(sortProperty, sortDirection, sortArray, context) {
    return sortArray.sort((a, b) => {
      var result = a['requestId']['institutionId']['name'] < b['requestId']['institutionId']['name'] ? -1 : a['requestId']['institutionId']['name'] > b['requestId']['institutionId']['name'] ? 1 : 0;
      return result * sortDirection;
    });
  }
  customRequestStatusSorter(sortProperty, sortDirection, sortArray, context) {
    return sortArray.sort((a, b) => {
      var result = a[sortProperty] < b[sortProperty] ? -1 : a[sortProperty] > b[sortProperty] ? 1 : 0;
      return result * sortDirection;
    });
  }
  customProductDetailSorter(sortProperty, sortDirection, sortArray, context) {
    return sortArray.sort((a, b) => {
      var result = a.productId.name < b.productId.name ? -1 : a.productId.name > b.productId.name ? 1 : 0;
      return result * sortDirection;
    });
  }
  customNameFilter(value, item, context) {
    return item.requestId.personId.fullName.toUpperCase().indexOf(value.toUpperCase()) > -1;
  }
  statusCustomFilter(value, item, context) {
    if (item.requestStatus == value) return false;
    return true;
  }
  institutionCustomFilter(value, item, context) {
    return item.requestId.institutionId.name.toUpperCase().indexOf(value.toUpperCase()) > -1;
  }
  institutionCountryCustomFilter(value, item, context) {
    return item.name.toUpperCase().indexOf(value.toUpperCase()) > -1;
  }
  productNameFilter(value, item, context) {
    return item.productName.toUpperCase().indexOf(value.toUpperCase()) > -1;
  }
  customProductFilter(value, item, context) {
    return item.productId.name.toUpperCase().indexOf(value.toUpperCase()) > -1;
  }
}) || _class);

/***/ }),

/***/ "modules/analytics/helpTickets":
/*!**********************************************!*\
  !*** ./src/modules/analytics/helpTickets.js ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HelpTicketAnalytics: function() { return /* binding */ HelpTicketAnalytics; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../resources/utils/dataTable */ 6847);
/* harmony import */ var _resources_data_helpTickets__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../resources/data/helpTickets */ 8142);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
/* harmony import */ var _resources_utils_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../resources/utils/utils */ 8741);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! moment */ 381);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_5__);
var _dec, _class;


// import {Sessions} from '../../resources/data/sessions';
// import {Systems} from '../../resources/data/systems';
// import {Products} from '../../resources/data/products';



// import {People} from '../../resources/data/people';


let HelpTicketAnalytics = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_config_appConfig__WEBPACK_IMPORTED_MODULE_3__.AppConfig, _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_1__.DataTable, _resources_utils_utils__WEBPACK_IMPORTED_MODULE_4__.Utils, _resources_data_helpTickets__WEBPACK_IMPORTED_MODULE_2__.HelpTickets), _dec(_class = class HelpTicketAnalytics {
  constructor(config, datatable, utils, helpTickets) {
    this.chartOptions = {
      legend: {
        display: false
      }
    };
    this.backgroundColors = ['#cc3300', '#99e600', '#0099cc', '#ff0066', '#6666ff', '#1a8cff', '#000080', '#66ff99', '#1aff66', '#808000', '#ffff66', '#4d4d00', '#ccffff', '#006666', '#339933', '#b3ffff', '#000099', '#66ff33', '#269900', '#ffff00', '#ffff66', '#9999ff', '#6600cc', '#009933', '', '#0000b3', '#ff0000', '#00004d', '#0000cc', '#ff0000', '#ff0000', '#ffb3b3', '#ffb3b3', '#e63900', '#ffb3b3', '#330d00', '#ffb3b3', '#3333ff', '#0000cc'];
    this.categories = [{
      code: 0,
      description: 'Help Tickets By Types'
    }, {
      code: 1,
      description: 'Help Tickets by Curriculum'
    }, {
      code: 2,
      description: 'Help Tickets by Institution'
    }, {
      code: 3,
      description: 'Help Tickets by People'
    }, {
      code: 4,
      description: 'Help Tickets by Status'
    }];
    this.backgroundColors = ['#cc3300', '#99e600', '#0099cc', '#ff0066', '#6666ff', '#006666', '#000080', '#66ff99', '#1aff66', '#808000', '#ffff66', '#4d4d00', '#ccffff', '#006666', '#339933', '#b3ffff', '#000099', '#66ff33', '#269900', '#ffff00', '#ffff66', '#9999ff', '#6600cc', '#009933', '', '#0000b3', '#ff0000', '#00004d', '#0000cc', '#ff0000', '#ff0000', '#ffb3b3', '#ffb3b3', '#e63900', '#ffb3b3', '#330d00', '#ffb3b3', '#3333ff', '#0000cc'];
    this.selectedTab = "types";
    this.typeTableSelected = true;
    this.curriculumtableSelected = true;
    this.institutiontableSelected = true;
    this.peopleTableSelected = true;
    this.statusTableSelected = true;
    this.config = config;
    this.dataTable = datatable;
    this.dataTable.initialize(this);
    this.utils = utils;
    this.helpTickets = helpTickets;
    this.userObj = JSON.parse(sessionStorage.getItem('user'));
  }
  async attached() {
    $('[data-toggle="tooltip"]').tooltip();
    $('#loading').show();
    let responses = await Promise.all([this.helpTickets.getHelpTicketTypes(), this.config.getConfig(), this.helpTickets.getHelpTicketsArrayAnalytics()]);
    this.selectedCategory = this.categories[0];
    this.getTypeHelpTickets();
    this.selectedTab = "types";
    $('#loading').hide();
  }
  async activate() {

    // this.getInstitutionHelpTickets();
    // this.getCurriculumHelpTickets();
    // this.getPeopleHelpTickets();
    // this.getStatusHelpTickets();
  }
  async typeChanged(category, el) {
    $('#loading').show();
    this.selectedCategory = category;
    $('.categoryButtons').css("background-color", "");
    $('.categoryButtons').css("color", "");
    $('.categoryButtons').removeClass('menuButtons');
    if (el) {
      $(el.target).css("background-color", this.config.BUTTONS_BACKGROUND);
      $(el.target).css("color", this.config.ACTIVE_SUBMENU_COLOR);
    }
    switch (category.code) {
      case 0:
        this.getTypeHelpTickets();
        this.selectedTab = "types";
        break;
      case 1:
        this.getCurriculumHelpTickets();
        this.selectedTab = "curriculum";
        this.dataTable.updateArray(this.helpTickets.helpTicketCurriculumArrayAnalytics);
        break;
      case 2:
        this.getInstitutionHelpTickets();
        this.dataTable.updateArray(this.helpTickets.helpTicketInstitutionArrayAnalytics);
        this.selectedTab = 'institutions';
        break;
      case 3:
        this.getPeopleHelpTickets();
        this.dataTable.updateArray(this.helpTickets.helpTicketPeopleArrayAnalytics);
        this.selectedTab = 'people';
        break;
      case 4:
        this.getStatusHelpTickets();
        this.dataTable.updateArray(this.helpTickets.helpTicketStatusArrayAnalytics);
        this.selectedTab = 'status';
        break;
    }
    $('#loading').hide();
  }
  async getTypeHelpTickets() {
    if (this.selectedTab) {
      this.numCols = 2;
      // await this.helpTickets.getHelpTicketsArrayAnalytics();
      if (this.helpTickets.helpTicketArrayAnalytics && this.helpTickets.helpTicketArrayAnalytics.length) {
        this.helpTickets.groupRequestsByType();
        this.substituteTypeDescriptions();
        this.dataTable.updateArray(this.helpTickets.helpTicketTypeArrayAnalytics);
        this.typeChartDataFunction();
      } else {
        this.displayArray = new Array();
      }
    } else {
      this.displayArray = new Array();
    }
  }
  substituteTypeDescriptions() {
    this.helpTickets.helpTicketTypeArrayAnalytics.forEach((item, index) => {
      for (let i = 0; i < this.helpTickets.helpTicketTypesArray.length; i++) {
        for (let j = 0; j < this.helpTickets.helpTicketTypesArray[i].subtypes.length; j++) {
          if (this.helpTickets.helpTicketTypesArray[i].subtypes[j].type == item.helpTicketType) {
            this.helpTickets.helpTicketTypeArrayAnalytics[index].description = this.helpTickets.helpTicketTypesArray[i].subtypes[j].description;
          }
        }
      }
    });
  }
  typeChartDataFunction() {
    var data = new Array();
    var categories = new Array();
    var sortedArray = this.helpTickets.helpTicketTypeArrayAnalytics.sort((a, b) => {
      if (!a['description'] || !b['description']) return -1;
      return a['description'] < b['description'] ? -1 : a['description'] > b['description'] ? 1 : 0;
    });
    sortedArray.forEach(item => {
      categories.push(item.description);
      data.push(item.count);
    });
    this.typeChartData = {
      labels: categories,
      datasets: [{
        data: data,
        backgroundColor: this.backgroundColors,
        hoverBackgroundColor: this.backgroundColors,
        hoverBorderWidth: 2,
        hoverBorderColor: 'lightgrey'
      }]
    };
  }
  async getCurriculumHelpTickets() {
    if (this.selectedTab) {
      // await this.helpTickets.getHelpTicketsArrayAnalytics();
      if (this.helpTickets.helpTicketArrayAnalytics && this.helpTickets.helpTicketArrayAnalytics.length) {
        this.helpTickets.groupRequestsByCurriculum();
        this.curriculumChartDataFunction();
      } else {
        this.displayArray = new Array();
      }
    } else {
      this.displayArray = new Array();
    }
  }
  curriculumChartDataFunction() {
    var data = new Array();
    var categories = new Array();
    var sortedArray = this.helpTickets.helpTicketCurriculumArrayAnalytics.sort((a, b) => {
      if (!a['curriculumTitle'] || !b['curriculumTitle']) return -1;
      return a['curriculumTitle'] < b['curriculumTitle'] ? -1 : a['curriculumTitle'] > b['curriculumTitle'] ? 1 : 0;
    });
    sortedArray.forEach(item => {
      categories.push(item.curriculumTitle);
      data.push(item.count);
    });
    this.curriculumChartData = {
      labels: categories,
      datasets: [{
        data: data,
        backgroundColor: this.backgroundColors,
        hoverBackgroundColor: this.backgroundColors,
        hoverBorderWidth: 2,
        hoverBorderColor: 'lightgrey'
      }]
    };
  }
  async getInstitutionHelpTickets() {
    if (this.selectedTab) {
      // await this.helpTickets.getHelpTicketsArrayAnalytics();
      if (this.helpTickets.helpTicketArrayAnalytics && this.helpTickets.helpTicketArrayAnalytics.length) {
        this.helpTickets.groupHelpTicketsByInstitution();
        this.institutionChartDataFunction();
      } else {
        this.displayArray = new Array();
      }
    } else {
      this.displayArray = new Array();
    }
  }
  institutionChartDataFunction() {
    var data = new Array();
    var categories = new Array();
    var sortedArray = this.helpTickets.helpTicketInstitutionArrayAnalytics.sort((a, b) => {
      if (!a['institution'] || !b['institution']) return -1;
      return a['institution'] < b['institution'] ? -1 : a['institution'] > b['institution'] ? 1 : 0;
    });
    sortedArray.forEach(item => {
      categories.push(item.institution);
      data.push(item.count);
    });
    this.institutionChartData = {
      labels: categories,
      datasets: [{
        data: data,
        backgroundColor: this.backgroundColors,
        hoverBackgroundColor: this.backgroundColors,
        hoverBorderWidth: 2,
        hoverBorderColor: 'lightgrey'
      }]
    };
  }
  async getPeopleHelpTickets() {
    if (this.selectedTab) {
      // await this.helpTickets.getHelpTicketsArrayAnalytics();
      if (this.helpTickets.helpTicketArrayAnalytics && this.helpTickets.helpTicketArrayAnalytics.length) {
        this.helpTickets.groupHelpTicketsByPeople();
        this.peopleChartDataFunction();
      } else {
        this.displayArray = new Array();
      }
    } else {
      this.displayArray = new Array();
    }
  }
  peopleChartDataFunction() {
    var data = new Array();
    var categories = new Array();
    var sortedArray = this.helpTickets.helpTicketPeopleArrayAnalytics.sort((a, b) => {
      if (!a['name'] || !b['name']) return -1;
      return a['name'] < b['name'] ? -1 : a['name'] > b['name'] ? 1 : 0;
    });
    sortedArray.forEach(item => {
      categories.push(item.name);
      data.push(item.count);
    });
    this.peopleChartData = {
      labels: categories,
      datasets: [{
        data: data,
        backgroundColor: this.backgroundColors,
        hoverBackgroundColor: this.backgroundColors,
        hoverBorderWidth: 2,
        hoverBorderColor: 'lightgrey'
      }]
    };
  }
  async getStatusHelpTickets() {
    if (this.selectedTab) {
      // await this.helpTickets.getHelpTicketsArrayAnalytics();
      if (this.helpTickets.helpTicketArrayAnalytics && this.helpTickets.helpTicketArrayAnalytics.length) {
        this.helpTickets.groupHelpTicketsByStatus();
        this.substituteStatusDescriptions();
        this.statusChartDataFunction();
      } else {
        this.displayArray = new Array();
      }
    } else {
      this.displayArray = new Array();
    }
  }
  substituteStatusDescriptions() {
    this.helpTickets.helpTicketStatusArrayAnalytics.forEach((item, index) => {
      for (let i = 0; i < this.config.HELP_TICKET_STATUSES.length; i++) {
        if (this.config.HELP_TICKET_STATUSES[i].code == item.helpTicketStatus) {
          this.helpTickets.helpTicketStatusArrayAnalytics[index].helpTicketStatus = this.config.HELP_TICKET_STATUSES[i].description;
        }
      }
    });
  }
  statusChartDataFunction() {
    var data = new Array();
    var categories = new Array();
    var sortedArray = this.helpTickets.helpTicketStatusArrayAnalytics.sort((a, b) => {
      if (!a['helpTicketStatus'] || !b['helpTicketStatus']) return -1;
      return a['helpTicketStatus'] < b['helpTicketStatus'] ? -1 : a['helpTicketStatus'] > b['helpTicketStatus'] ? 1 : 0;
    });
    sortedArray.forEach(item => {
      categories.push(item.helpTicketStatus);
      data.push(item.count);
    });
    this.statusChartData = {
      labels: categories,
      datasets: [{
        data: data,
        backgroundColor: this.backgroundColors,
        hoverBackgroundColor: this.backgroundColors,
        hoverBorderWidth: 2,
        hoverBorderColor: 'lightgrey'
      }]
    };
  }
  showTypeTable() {
    this.typeTableSelected = true;
  }
  showTypeGraph() {
    this.typeTableSelected = false;
  }
  showCurriculumTable() {
    this.curriculumtableSelected = true;
  }
  showCurriculumGraph() {
    this.curriculumtableSelected = false;
  }
  showInstitutionTable() {
    this.institutiontableSelected = true;
  }
  showInstitutionGraph() {
    this.institutiontableSelected = false;
  }
  showPeopleTable() {
    this.peopleTableSelected = true;
  }
  showPeopleGraph() {
    this.peopleTableSelected = false;
  }
  showStatusTable() {
    this.statusTableSelected = true;
  }
  showStatusGraph() {
    this.statusTableSelected = false;
  }
  customHelpTicketTypeFilter(value, item, context) {
    var foo = value.toUpperCase();
    for (let i = 0; i < context.helpTickets.helpTicketTypesArray.length; i++) {
      for (let j = 0; j < context.helpTickets.helpTicketTypesArray[i].subtypes.length; j++) {
        if (context.helpTickets.helpTicketTypesArray[i].subtypes[j].type == item.helpTicketType) {
          return context.helpTickets.helpTicketTypesArray[i].subtypes[j].description.toUpperCase().indexOf(foo) > -1;
        }
      }
    }
    return false;
  }
  customProductSorter(sortProperty, sortDirection, sortArray, context) {
    return sortArray.sort((a, b) => {
      var result = a['productId']['name'] < b['productId']['name'] ? -1 : a['productId']['name'] > b['productId']['name'] ? 1 : 0;
      return result * sortDirection;
    });
  }
  customInstitutionSorter(sortProperty, sortDirection, sortArray, context) {
    return sortArray.sort((a, b) => {
      var result = a['name'] < b['name'] ? -1 : a['name'] > b['name'] ? 1 : 0;
      return result * sortDirection;
    });
  }
  customNameFilterValue(value, item, context) {
    return item.name.toUpperCase().indexOf(value.toUpperCase()) > -1;
  }
  customProductFilterValue(value, item, context) {
    return item.productId.name.toUpperCase().indexOf(value.toUpperCase()) > -1;
  }
}) || _class);

/***/ }),

/***/ "modules/analytics/institutions":
/*!***********************************************!*\
  !*** ./src/modules/analytics/institutions.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Institutions: function() { return /* binding */ Institutions; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../resources/utils/dataTable */ 6847);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
/* harmony import */ var _resources_utils_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../resources/utils/utils */ 8741);
/* harmony import */ var _resources_data_people__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../resources/data/people */ 353);
/* harmony import */ var _resources_data_is4ua__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../resources/data/is4ua */ 5175);
var _dec, _class;






// import { Chart } from 'node_modules/chart.js/dist/Chart.js';

let Institutions = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_1__.DataTable, _config_appConfig__WEBPACK_IMPORTED_MODULE_2__.AppConfig, _resources_utils_utils__WEBPACK_IMPORTED_MODULE_3__.Utils, _resources_data_people__WEBPACK_IMPORTED_MODULE_4__.People, _resources_data_is4ua__WEBPACK_IMPORTED_MODULE_5__.is4ua), _dec(_class = class Institutions {
  constructor(datatable, config, utils, people, is4ua) {
    this.spinnerHTML = "";
    this.unselectedFields = [{
      field: 'address',
      displayName: 'Address'
    }, {
      field: 'postalCode',
      displayName: 'Postal Code'
    }, {
      field: 'dropDate',
      displayName: 'Drop Date'
    }, {
      field: 'joinDate',
      displayName: 'Join Date'
    }];
    this.selectedFields = [{
      field: 'name',
      displayName: 'Name'
    }, {
      field: 'institutionType',
      displayName: 'Institution Type'
    }, {
      field: 'memberType',
      displayName: 'Member Type'
    }, {
      field: 'highestDegree',
      displayName: 'Highest Degree'
    }, {
      field: 'region',
      displayName: 'Region'
    }, {
      field: 'country',
      displayName: 'Country'
    }, {
      field: 'institutionStatus',
      displayName: 'Status'
    }];
    this.fileName = 'institutions.csv';
    this.tableSelected = true;
    this.backgroundColors = ['#cc3300', '#99e600', '#0099cc', '#ff0066', '#6666ff', '#1a8cff', '#000080', '#66ff99', '#1aff66', '#808000', '#ffff66', '#4d4d00', '#ccffff', '#006666', '#339933', '#b3ffff', '#000099', '#66ff33', '#269900', '#ffff00', '#ffff66', '#9999ff', '#6600cc', '#009933', '', '#0000b3', '#ff0000', '#00004d', '#0000cc', '#ff0000', '#ff0000', '#ffb3b3', '#ffb3b3', '#e63900', '#ffb3b3', '#330d00', '#ffb3b3', '#3333ff', '#0000cc'];
    this.dataTable = datatable;
    this.dataTable.initialize(this);
    this.config = config;
    this.utils = utils;
    this.people = people;
    this.is4ua = is4ua;
    this.userObj = JSON.parse(sessionStorage.getItem('user'));
    this.DynamicDoughnutData = {};
    this.SimpleLineData = {};

    // this.resetLineData();
  }

  resetPieData() {
    this.DynamicDoughnutData = {
      labels: ["Red", "Green", "Yellow"],
      datasets: [{
        data: [300, 50, 100],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
      }]
    };
  }
  resetLineData() {
    this.SimpleLineData = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [{
        label: "Healthy People",
        backgroundColor: "rgba(220,220,220,0.2)",
        borderColor: "rgba(220,220,220,1)",
        pointColor: "rgba(220,220,220,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)",
        data: [65, 59, 80, 81, 56, 55, 40]
      }, {
        label: "Ill People",
        backgroundColor: "rgba(151,187,205,0.2)",
        borderColor: "rgba(151,187,205,1)",
        pointColor: "rgba(151,187,205,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(151,187,205,1)",
        data: [28, 48, 40, 19, 86, 27, 90]
      }]
    };
  }
  async attached() {
    $('[data-toggle="tooltip"]').tooltip();
    $('#loading').show();
    let responses = await Promise.all([
    // this.people.getPeopleArray('?order=lastName'),
    this.people.getInstitutionsArray('?order=name', true), this.is4ua.loadIs4ua()]);
    this.people.institutionsArray.forEach((item, index) => {
      if (item.name == 'HEC Montréal') {
        this.people.institutionsArray.splice(index, 1);
      }
      if (item.name == '-- UA Staff --') {
        this.people.institutionsArray.splice(index, 1);
      }
      if (item.memberType == '04') {
        this.people.institutionsArray.splice(index, 1);
      }
    });
    this.config.getConfig(true);
    this.dataTable.updateArray(this.people.institutionsArray);
    this.resetIS4UADataIT();
    this.resetIS4UADataMT();
    this.resetIS4UADataHD();
    this.resetCountryData();
    this.resetRegionData();
    this.resetStatusDataMT();
    $('#loading').hide();
  }
  async activate() {}
  async refresh() {
    $('#loading').show();
    await this.people.getInstitutionsArray('?order=name', true);
    this.dataTable.updateArray(this.people.institutionsArray);
    $('#loading').hide();
  }
  showTable() {
    this.tableSelected = true;
  }
  showGraph() {
    this.tableSelected = false;
  }
  resetIS4UADataIT() {
    var labels = new Array();
    var data = new Array();
    var categories = new Array();
    var index;
    this.is4ua.institutionTypes.forEach((item, i) => {
      labels.push(item.description);
      categories.push(item.code);
      data.push(0);
    });
    this.people.institutionsArray.forEach(item => {
      index = categories.indexOf(item.institutionType);
      if (index > -1) data[index]++;
    });
    this.DynamicDoughnutData = {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: this.backgroundColors,
        hoverBackgroundColor: this.backgroundColors
      }]
    };
  }
  resetIS4UADataHD() {
    var labels = new Array();
    var data = new Array();
    var categories = new Array();
    var index;
    var backGroundColors = new Array();
    this.is4ua.highestDegrees.forEach((item, i) => {
      labels.push(item.description);
      categories.push(item.code);
      data.push(0);
      backGroundColors.push(this.backgroundColors[i]);
    });
    this.people.institutionsArray.forEach(item => {
      index = categories.indexOf(item.highestDegree);
      if (index > -1) data[index]++;
    });
    this.DynamicDoughnutDataHD = {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: this.backgroundColors,
        hoverBackgroundColor: this.backgroundColors
      }]
    };
  }
  resetIS4UADataMT() {
    var labels = new Array();
    var data = new Array();
    var categories = new Array();
    var index;
    var backGroundColors = new Array();
    this.is4ua.memberTypes.forEach((item, i) => {
      labels.push(item.description);
      categories.push(item.code);
      data.push(0);
      backGroundColors.push(this.backgroundColors[i]);
    });
    this.people.institutionsArray.forEach(item => {
      index = categories.indexOf(item.memberType);
      if (index > -1) data[index]++;
    });
    this.DynamicDoughnutDataMT = {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: this.backgroundColors,
        hoverBackgroundColor: this.backgroundColors
      }]
    };
  }
  resetCountryData() {
    var data = new Array();
    var categories = new Array();
    var index;
    var backGroundColors = new Array();
    this.people.institutionsArray.forEach(item => {
      if (categories.indexOf(item.country) === -1) {
        categories.push(item.country);
        data.push(0);
      }
      index = categories.indexOf(item.country);
      if (index > -1) data[index]++;
    });
    this.DynamicDoughnutDataCountries = {
      labels: categories,
      datasets: [{
        data: data,
        backgroundColor: this.backgroundColors,
        hoverBackgroundColor: this.backgroundColors
      }]
    };
  }
  resetRegionData() {
    var data = new Array();
    var categories = new Array();
    var index;
    var backGroundColors = new Array();
    this.people.institutionsArray.forEach(item => {
      if (categories.indexOf(item.region) === -1) {
        categories.push(item.region);
        data.push(0);
      }
      index = categories.indexOf(item.region);
      if (index > -1) data[index]++;
    });
    this.DynamicDoughnutDataRegions = {
      labels: categories,
      datasets: [{
        data: data,
        backgroundColor: this.backgroundColors,
        hoverBackgroundColor: this.backgroundColors
      }]
    };
  }
  resetStatusDataMT() {
    var labels = new Array();
    var data = new Array();
    var categories = new Array();
    var index;
    this.is4ua.institutonStatusArray.forEach((item, i) => {
      labels.push(item.description);
      categories.push(item.code);
      data.push(0);
    });
    this.people.institutionsArray.forEach(item => {
      index = categories.indexOf(item.institutionStatus);
      if (index > -1) data[index]++;
    });
    this.DynamicDoughnutDataStatus = {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: this.backgroundColors,
        hoverBackgroundColor: this.backgroundColors
      }]
    };
  }
  export() {
    this.showExportPanel = !this.showExportPanel;
  }
  selectField(index) {
    this.selectedFields.push(this.unselectedFields.splice(index, 1)[0]);
  }
  removeField(index) {
    this.unselectedFields.push(this.selectedFields.splice(index, 1)[0]);
  }
  downloadCSV() {
    if (this.selectedFields.length) {
      var exportArray = this.utils.copyArray(this.dataTable.displayArray);
      var csvContent = "";
      var lines = new Array();
      var delimiter = ',';
      var lineDelimiter = '\n';
      var numFields = this.selectedFields.length;
      if (this.substituteDescriptions) exportArray = this.subIs4uaValues(exportArray);
      exportArray.forEach(item => {
        var line = "";
        this.selectedFields.forEach((field, index) => {
          line += item[field.field];
          if (index < numFields) {
            line += delimiter;
          }
        });
        lines.push(line);
      });
      csvContent = lines.join(lineDelimiter);
      console.log(csvContent);
      var blob = new Blob([csvContent], {
        type: 'text/csv;charset=utf-8;'
      });
      if (navigator.msSaveBlob) {
        // IE 10+
        navigator.msSaveBlob(blob, this.fileName);
      } else {
        var link = document.createElement("a");
        if (link.download !== undefined) {
          // feature detection
          // Browsers that support HTML5 download attribute
          var url = URL.createObjectURL(blob);
          link.setAttribute("href", url);
          link.setAttribute("download", this.fileName);
          link.style.visibility = 'hidden';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }
      this.showExportPanel = false;
    }
  }
  downloadExcel() {
    if (this.selectedFields.length) {
      var exportArray = this.utils.copyArray(this.dataTable.baseArray);
      if (this.substituteDescriptions) exportArray = this.subIs4uaValues(exportArray);
      let csvContent = "data:text/csv;charset=utf-8;";
      this.selectedFields.forEach(item => {
        csvContent += "," + item.displayName;
      });
      csvContent += "\r\n";
      exportArray.forEach(item => {
        this.selectedFields.forEach((field, index) => {
          if (index > 0) csvContent += ",";
          csvContent += item[field.field] ? item[field.field].replace(",", " ") : "";
        });
        csvContent += "\r\n";
      });
      var encodedUri = encodeURI(csvContent);
      var link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "institutions.csv");
      document.body.appendChild(link);
      link.click();

      // var exportArray = this.utils.copyArray(this.dataTable.baseArray);
      // var htmlContent = "<table><tr>";
      // var numFields = this.selectedFields.length;
      // if(this.substituteDescriptions) exportArray = this.subIs4uaValues(exportArray);

      // this.selectedFields.forEach(item => {
      // 	htmlContent += "<th>" + item.displayName + "</th>";
      // })
      // htmlContent += "</tr>";

      // exportArray.forEach(item => {
      // 	var line = "<tr>";
      // 	this.selectedFields.forEach((field, index) => {
      // 		line += "<td>" + item[field.field] + "</td>"; 
      // 	})
      // 	line += "</tr>";
      // 	htmlContent += line;
      // });
      // htmlContent += "</table>";
      // window.open('data:application/vnd.ms-excel,' + htmlContent);
      // this.showExportPanel = false;
    } else {
      this.utils.showNotification("You haven't chosen any fields to include");
    }
  }
  subIs4uaValues(exportArray) {
    var institutionType = $.grep(this.selectedFields, function (e) {
      return e.field == 'institutionType';
    });
    var memberType = $.grep(this.selectedFields, function (e) {
      return e.field == 'memberType';
    });
    var highestDegree = $.grep(this.selectedFields, function (e) {
      return e.field == 'highestDegree';
    });
    if (institutionType.length) {
      exportArray.forEach(item => {
        var obj = this.dataTable.findObj(this.is4ua.institutionTypes, 'code', item.institutionType);
        item['institutionType'] = obj ? obj['description'] : null;
      });
    }
    if (memberType.length) {
      exportArray.forEach(item => {
        var obj = this.dataTable.findObj(this.is4ua.memberTypes, 'code', item.memberType);
        item['memberType'] = obj ? obj['description'] : null;
      });
    }
    if (highestDegree.length) {
      exportArray.forEach(item => {
        var obj = this.dataTable.findObj(this.is4ua.highestDegrees, 'code', item.highestDegree);
        item['highestDegree'] = obj ? obj['description'] : null;
      });
    }
    return exportArray;
  }
  cancelDownload() {
    this.showExportPanel = false;
  }
  customInstitutionTypeSorter(sortProperty, sortDirection, sortArray, context) {
    sortArray.forEach(item => {
      var obj = context.dataTable.findObj(context.is4ua.institutionTypes, 'code', item.institutionType);
      item['sortProperty'] = obj ? obj['description'] : null;
    });
    return sortArray.sort((a, b) => {
      var result = a['sortProperty'] < b['sortProperty'] ? -1 : a['sortProperty'] > b['sortProperty'] ? 1 : 0;
      return result * sortDirection;
    });
  }
  customMemberTypeSorter(sortProperty, sortDirection, sortArray, context) {
    sortArray.forEach(item => {
      var obj = context.dataTable.findObj(context.is4ua.memberTypes, 'code', item.memberType);
      item['sortProperty'] = obj ? obj['description'] : null;
    });
    return sortArray.sort((a, b) => {
      var result = a['sortProperty'] < b['sortProperty'] ? -1 : a['sortProperty'] > b['sortProperty'] ? 1 : 0;
      return result * sortDirection;
    });
  }
  customHighestDegreeSorter(sortProperty, sortDirection, sortArray, context) {
    sortArray.forEach(item => {
      var obj = context.dataTable.findObj(context.is4ua.highestDegrees, 'code', item.highestDegree);
      item['sortProperty'] = obj ? obj['description'] : null;
    });
    return sortArray.sort((a, b) => {
      var result = a['sortProperty'] < b['sortProperty'] ? -1 : a['sortProperty'] > b['sortProperty'] ? 1 : 0;
      return result * sortDirection;
    });
  }
}) || _class);

/***/ }),

/***/ "modules/analytics/analytics.html":
/*!**********************************************!*\
  !*** ./src/modules/analytics/analytics.html ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <compose view='../../resources/elements/submenu.html'></compose>\r\n    <div class=\"col-lg-12\">\r\n        <router-view></router-view>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/analytics/clientRequests.html":
/*!***************************************************!*\
  !*** ./src/modules/analytics/clientRequests.html ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <style>\r\n        .menuButtons {\r\n\t\t\tcolor: ${config.ACTIVE_SUBMENU_COLOR};\r\n\t\t\tbackground-color:${config.BUTTONS_BACKGROUND}\r\n        }\r\n    </style>\r\n    <span id=\"loading\">\r\n        <ul class=\"bokeh\">\r\n            <li></li>\r\n            <li></li>\r\n            <li></li>\r\n        </ul>\r\n    </span>\r\n    <div show.bind=\"dataTable.displayArray && dataTable.displayArray.length\" class=\"col-lg-2\">\r\n        <div>\r\n            <ul class=\"list-group\">\r\n                <button click.trigger=\"typeChanged(category, $event)\" type=\"button\" repeat.for=\"category of categories\"\r\n                    id=\"${category.code}\" class=\"${$first ? 'list-group-item menuButtons categoryButtons' : 'list-group-item categoryButtons'}\">${category.description}</button>\r\n            </ul>\r\n        </div>\r\n    </div>\r\n\r\n    <div show.bind=\"dataTable.displayArray && dataTable.displayArray.length\" class=\"panel panel-default rightMargin leftMargin col-lg-9\">\r\n        <div class=\"panel-body\">\r\n            <div class=\"row\">\r\n                <!-- Session Select -->\r\n                <div class=\"col-lg-4\">\r\n                    <div class=\"form-group topMargin leftMargin\">\r\n                        <select value.bind=\"selectedSession\" change.delegate=\"getSessionData()\" id=\"session\" class=\"form-control\">\r\n                            <option repeat.for=\"session of sessions.sessionsArray\" value.bind=\"session._id\">Session\r\n                                ${session.session} - ${session.year}</option>\r\n                        </select>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <div show.bind=\"selectedCategory.code === 0\">\r\n                    <compose view=\"./components/requestsByInstitution.html\"></compose>\r\n                </div>\r\n                <div show.bind=\"selectedCategory.code === 1\">\r\n                    <compose view=\"./components/requestsByProducts.html\"></compose>\r\n                </div>\r\n                <div show.bind=\"selectedCategory.code === 2\">\r\n                    <compose view=\"./components/requestsByCountry.html\"></compose>\r\n                </div>\r\n                <div show.bind=\"selectedCategory.code === 3\">\r\n                    <compose view=\"./components/requestsByInstitutionCountry.html\"></compose>\r\n                </div>\r\n            </div>\r\n        </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/analytics/components/countryInstitutionProductRequestsTable.html":
/*!**************************************************************************************!*\
  !*** ./src/modules/analytics/components/countryInstitutionProductRequestsTable.html ***!
  \**************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div show.bind=\"summerTable\" class='col-lg-12'>\r\n        <compose view=\"../../../resources/elements/table-navigation-bar.html\"></compose>\r\n        <table class=\"table table-striped table-hover cf\">\r\n            <thead class=\"cf\">\r\n                <tr>\r\n                    <td colspan='9'>\r\n                        <span click.delegate=\"downloadAllInstitutionCountriesExcel()\"  class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Export to Excel\"><i class=\"fa fa-download\" aria-hidden=\"true\"></i></span>\r\n                    </td>\r\n                </tr>\r\n                <tr>\r\n                    <th style=\"width:40rem;\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'name'})\">Institution </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                    <th>Person</th>\r\n                    <th><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'country'})\">Country </span><i class=\"fa fa-sort\"></i></th>\r\n\t\t\t\t\t<th><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'productName'})\">Product </span><i class=\"fa fa-sort\"></i></th>\r\n                    <th><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'total'})\">Clients  </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                    <th>Student IDs</th>\r\n                </tr>\r\n                 <tr>\r\n                    <th>\r\n                        <input value.bind=\"institutionCustomFilterValue\" input.delegate=\"dataTable.filterList(institutionCustomFilterValue, { type: 'custom',  filter: institutionCountryCustomFilter, compare:'custom'} )\"  class=\"form-control\" />\r\n                    </th>\r\n                    <th></th>\r\n\t\t\t\t\t<th> \r\n\t\t\t\t\t\t<input value.bind=\"countryFilterValue\" input.delegate=\"dataTable.filterList(countryFilterValue, { type: 'text',  filter: 'countryFilter', collectionProperty: 'country', displayProperty: 'country',  compare:'match'} )\"  class=\"form-control\" />\r\n\t\t\t\t\t</th>\r\n\t\t\t\t\t<th>\r\n                            <input value.bind=\"productNameFilterValue\" input.delegate=\"dataTable.filterList(productNameFilterValue, { type: 'text',  filter: 'productNameFilter', collectionProperty: 'productName', displayProperty: 'productName',  compare:'match'} )\"  class=\"form-control\" />\r\n                    </th>\r\n                    <th></th> \r\n                    <th></th> \r\n                </tr>\r\n            </thead>\r\n            <tbody>\r\n                <tr click.delegate=\"showProductDetail(stat)\" repeat.for=\"stat of dataTable.displayArray\">\r\n                    <td data-title=\"Institution\">${stat.name}</td>\r\n                    <td data-title=\"Facutly\">${stat.person}</td>\r\n\t\t\t\t\t<td data-title=\"Country\" style=\"width:100px;\">${stat.country}</td>\r\n\t\t\t\t\t<td data-title=\"Product\">${stat.productName}</td>\r\n                    <td data-title=\"Total\">${stat.total | formatNumber}</td>\r\n                    <td data-title=\"IDs\">${stat.students}</td>\r\n                </tr>\r\n            </tbody>\r\n        </table>\r\n    </div>\r\n    <compose show.bind=\"!summerTable\" view=\"./productRequestsDetail.html\"></compose>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/analytics/components/countryProductRequestsTable.html":
/*!***************************************************************************!*\
  !*** ./src/modules/analytics/components/countryProductRequestsTable.html ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div show.bind=\"summerTable\" class='col-lg-12'>\r\n        <compose view=\"../../../resources/elements/table-navigation-bar.html\"></compose>\r\n        <table class=\"table table-striped table-hover cf\">\r\n            <thead class=\"cf\">\r\n                <tr>\r\n                    <td colspan='9'>\r\n                        <span click.delegate=\"downloadAllCountriesExcel()\"  class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Export to Excel\"><i class=\"fa fa-download\" aria-hidden=\"true\"></i></span>\r\n                    </td>\r\n                </tr>\r\n                <tr>\r\n\t\t\t\t\t<th><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {type: 'custom', sorter: customProductSorter, propertyName: 'productId'})\">Product </span><i class=\"fa fa-sort\"></i></th>\r\n\t\t\t\t\t<th><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'country'})\">Country </span><i class=\"fa fa-sort\"></i></th>\r\n                    <th><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'total'})\">Total  </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                    <th><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: '1'})\">${config.REQUEST_STATUS[0].description}  </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                    <th><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: '2'})\">${config.REQUEST_STATUS[1].description}  </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                    <th><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: '3'})\">${config.REQUEST_STATUS[2].description}  </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                    <th><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: '4'})\">${config.REQUEST_STATUS[3].description}  </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                    <th><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: '5'})\">${config.REQUEST_STATUS[4].description}  </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                    <th><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: '6'})\">${config.REQUEST_STATUS[5].description}  </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                    <th><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: '7'})\">${config.REQUEST_STATUS[6].description}  </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                    <th><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'studentIds'})\">Student IDs  </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                </tr>\r\n                 <tr>\r\n                    <th>\r\n                        <input value.bind=\"productFilterValue\" input.delegate=\"dataTable.filterList(productFilterValue, { type: 'custom',  filter: customProductFilterValue, compare:'custom'} )\"  class=\"form-control\" />\r\n                    </th>\r\n\t\t\t\t\t<th> \r\n\t\t\t\t\t\t<input value.bind=\"countryFilterValue\" input.delegate=\"dataTable.filterList(countryFilterValue, { type: 'text',  filter: 'countryFilter', collectionProperty: 'country', displayProperty: 'country',  compare:'match'} )\"  class=\"form-control\" />\r\n\t\t\t\t\t</th>\r\n\t\t\t\t\t<th></th>\r\n                    <th></th>\r\n                    <th></th>\r\n                    <th></th>\r\n                    <th></th>\r\n                    <th></th>\r\n                    <th></th>\r\n                    <th></th> \r\n                    <th></th> \r\n                    <th></th> \r\n                </tr>\r\n            </thead>\r\n            <tbody>\r\n                <tr click.delegate=\"showProductDetail(stat)\" repeat.for=\"stat of dataTable.displayArray\">\r\n\t\t\t\t\t<td data-title=\"Product\">${stat.productId.name}</td>\r\n\t\t\t\t\t<td style=\"width:100px;\" data-title=\"Country\">${stat.country}</td>\r\n                    <td data-title=\"Institution\">${stat.total | formatNumber}</td>\r\n                    <td data-title=\"${config.REQUEST_STATUS[$index].description}\" repeat.for=\"status of config.REQUEST_STATUS\">${stat | statValue:config.REQUEST_STATUS:$index}</td>\r\n                    <td>${stat.studentIds | formatNumber}</td>\r\n                </tr>\r\n            </tbody>\r\n        </table>\r\n    </div>\r\n    <compose show.bind=\"!summerTable\" view=\"./productRequestsDetail.html\"></compose>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/analytics/components/curriculumHTChart.html":
/*!*****************************************************************!*\
  !*** ./src/modules/analytics/components/curriculumHTChart.html ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t\t<fieldset if.bind=\"!curriculumtableSelected\" class=\"col-lg-12\">\r\n\t\t\t<legend>Requests</legend>\r\n\t\t\t<chart id=\"typeChart\" type=\"horizontalBar\" native-options.bind=\"chartOptions\" style=\"width: 100%; height: 100%; display: block;\" should-update=\"true\" throttle=\"2000\" data.bind=\"curriculumChartData\"></chart>\r\n\t\t</fieldset>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/analytics/components/curriculumHTTable.html":
/*!*****************************************************************!*\
  !*** ./src/modules/analytics/components/curriculumHTTable.html ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n     <h4 show.bind=\"dataTable.displayArray.length === 0\" class=\"topMargin leftMargin\">There are no items for this session</h4>\r\n    <div class=\"col-lg-10 col-lg-offset-1\">\r\n        <div class='row'  show.bind=\"dataTable.displayArray.length > 0\" >\r\n            <compose view=\"../../../resources/elements/table-navigation-bar.html\"></compose>\r\n            <div id=\"no-more-tables\">\r\n                <table class=\"table table-striped table-hover cf\">\r\n                    <thead class=\"cf\">\r\n                        <tr>\r\n                            <th><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'curriculumTitle'})\">Type  </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                            <th><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'count'})\">Count  </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                        </tr>\r\n                        <tr>\r\n                            <th>\r\n                                <input value.bind=\"helpTicketTypeFilterValue\" input.delegate=\"dataTable.filterList(helpTicketTypeFilterValue, { type: 'custom',  filter: customHelpTicketTypeFilter, collectionProperty: 'helpTicketType', displayProperty: 'helpTicketType',  compare:'custom'} )\"  class=\"form-control\" />\r\n                            </th>\r\n                            <th></th>\r\n                        </tr>\r\n                        <tr>\r\n                            <th>Totals:</th>\r\n                            <th>${total}</th>\r\n                        </tr>\r\n                    </thead>\r\n                    <tbody>\r\n                        <tr repeat.for=\"stat of dataTable.displayArray\">\r\n                            <td data-title=\"Type\">${stat.curriculumTitle}</td>\r\n                            <td data-title=\"Total\">${stat.count}</td>\r\n                        </tr>\r\n                    </tbody>\r\n                </table>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/analytics/components/helpTicketsByCurriculum.html":
/*!***********************************************************************!*\
  !*** ./src/modules/analytics/components/helpTicketsByCurriculum.html ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div class=\"row\">\r\n        <div class=\"col-lg-12\">\r\n          <div class=\"bottomMargin list-group-item leftMargin rightMargin\">\r\n            <span click.delegate=\"showCurriculumTable()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n                data-original-title=\"Table\"><i class=\"fa fa-table fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n            <span click.delegate=\"showCurriculumGraph()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n                data-original-title=\"Graphs\"><i class=\"fa fa-pie-chart fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n          </div>\r\n          <div show.bind=\"curriculumtableSelected\" class=\"col-lg-12\">\r\n              <compose view=\"./curriculumHTTable.html\"></compose>\r\n          </div> \r\n          <div show.bind=\"!curriculumtableSelected\" class=\"col-lg-12\">\r\n              <compose view=\"./curriculumHTChart.html\"></compose>\r\n          </div>\r\n        </div>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/analytics/components/helpTicketsByInstitution.html":
/*!************************************************************************!*\
  !*** ./src/modules/analytics/components/helpTicketsByInstitution.html ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div class=\"row\">\r\n        <div class=\"col-lg-12\">\r\n          <div class=\"bottomMargin list-group-item leftMargin rightMargin\">\r\n            <span click.delegate=\"showInstitutionTable()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n                data-original-title=\"Table\"><i class=\"fa fa-table fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n            <span click.delegate=\"showInstitutionGraph()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n                data-original-title=\"Graphs\"><i class=\"fa fa-pie-chart fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n          </div>\r\n          <div show.bind=\"institutiontableSelected\" class=\"col-lg-12\">\r\n              <compose view=\"./institutionHTTable.html\"></compose>\r\n          </div> \r\n          <div show.bind=\"!institutiontableSelected\" class=\"col-lg-12\">\r\n              <compose view=\"./institutionHTChart.html\"></compose>\r\n          </div>\r\n        </div>\r\n    </div>\t\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/analytics/components/helpTicketsByPeople.html":
/*!*******************************************************************!*\
  !*** ./src/modules/analytics/components/helpTicketsByPeople.html ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n  <div>\r\n    <div class=\"row\">\r\n        <div class=\"col-lg-12\">\r\n          <div class=\"bottomMargin list-group-item leftMargin rightMargin\">\r\n            <span click.delegate=\"showPeopleTable()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n                data-original-title=\"Table\"><i class=\"fa fa-table fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n            <span click.delegate=\"showPeopleGraph()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n                data-original-title=\"Graphs\"><i class=\"fa fa-pie-chart fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n          </div>\r\n          <div show.bind=\"peopleTableSelected\" class=\"col-lg-12\">\r\n              <compose view=\"./peopleHTTable.html\"></compose>\r\n          </div> \r\n          <div show.bind=\"!peopleTableSelected\" class=\"col-lg-12\">\r\n              <compose view=\"./peopleHTChart.html\"></compose>\r\n          </div>\r\n        </div>\r\n    </div>\r\n  </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/analytics/components/helpTicketsByStatus.html":
/*!*******************************************************************!*\
  !*** ./src/modules/analytics/components/helpTicketsByStatus.html ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n  <div>\r\n    <div class=\"row\">\r\n        <div class=\"col-lg-12\">\r\n          <div class=\"bottomMargin list-group-item leftMargin rightMargin\">\r\n            <span click.delegate=\"showStatusTable()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n                data-original-title=\"Table\"><i class=\"fa fa-table fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n            <span click.delegate=\"showStatusGraph()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n                data-original-title=\"Graphs\"><i class=\"fa fa-pie-chart fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n          </div>\r\n          <div show.bind=\"statusTableSelected\" class=\"col-lg-12\">\r\n              <compose view=\"./statusHTTable.html\"></compose>\r\n          </div> \r\n          <div show.bind=\"!statusTableSelected\" class=\"col-lg-12\">\r\n              <compose view=\"./statusHTChart.html\"></compose>\r\n          </div>\r\n        </div>\r\n    </div>\r\n  </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/analytics/components/helpTicketsByType.html":
/*!*****************************************************************!*\
  !*** ./src/modules/analytics/components/helpTicketsByType.html ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n  <div>\r\n    <div class=\"row\">\r\n        <div class=\"col-lg-12\">\r\n          <div class=\"bottomMargin list-group-item leftMargin rightMargin\">\r\n            <span click.delegate=\"showTypeTable()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n                data-original-title=\"Table\"><i class=\"fa fa-table fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n            <span click.delegate=\"showTypeGraph()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n                data-original-title=\"Graphs\"><i class=\"fa fa-pie-chart fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n          </div>\r\n          <div show.bind=\"typeTableSelected\" class=\"col-lg-12\">\r\n              <compose view=\"./typeHTTable.html\"></compose>\r\n          </div> \r\n          <div show.bind=\"!typeTableSelected\" class=\"col-lg-12\">\r\n              <compose view=\"./typeHTChart.html\"></compose>\r\n          </div>\r\n        </div>\r\n    </div>\r\n  </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/analytics/components/institutionHTChart.html":
/*!******************************************************************!*\
  !*** ./src/modules/analytics/components/institutionHTChart.html ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t\t<fieldset if.bind=\"!institutiontableSelected\" class=\"col-lg-12\">\r\n\t\t\t<legend>Requests</legend>\r\n\t\t\t<chart id=\"typeChart\" type=\"horizontalBar\" native-options.bind=\"chartOptions\" style=\"width: 100%; height: 100%; display: block;\" should-update=\"true\" throttle=\"2000\" data.bind=\"institutionChartData\"></chart>\r\n\t\t</fieldset>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/analytics/components/institutionHTTable.html":
/*!******************************************************************!*\
  !*** ./src/modules/analytics/components/institutionHTTable.html ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n     <h4 show.bind=\"dataTable.displayArray.length === 0\" class=\"topMargin leftMargin\">There are no items for this session</h4>\r\n    <div class=\"col-lg-10 col-lg-offset-1\">\r\n        <div class='row'  show.bind=\"dataTable.displayArray.length > 0\" >\r\n            <compose view=\"../../../resources/elements/table-navigation-bar.html\"></compose>\r\n            <div id=\"no-more-tables\">\r\n                <table class=\"table table-striped table-hover cf\">\r\n                    <thead class=\"cf\">\r\n                        <tr>\r\n                            <th><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'institution'})\">Institution  </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                            <th><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'count'})\">Count  </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                        </tr>\r\n                        <tr>\r\n                            <th>\r\n                                <input value.bind=\"helpTicketTypeFilterValue\" input.delegate=\"dataTable.filterList(helpTicketTypeFilterValue, { type: 'custom',  filter: customHelpTicketTypeFilter, collectionProperty: 'helpTicketType', displayProperty: 'helpTicketType',  compare:'custom'} )\"  class=\"form-control\" />\r\n                            </th>\r\n                            <th></th>\r\n                        </tr>\r\n                        <tr>\r\n                            <th>Totals:</th>\r\n                            <th>${total}</th>\r\n                        </tr>\r\n                    </thead>\r\n                    <tbody>\r\n                        <tr repeat.for=\"stat of dataTable.displayArray\">\r\n                            <td data-title=\"Type\">${stat.institution}</td>\r\n                            <td data-title=\"Total\">${stat.count}</td>\r\n                        </tr>\r\n                    </tbody>\r\n                </table>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/analytics/components/institutionRequestsDetail.html":
/*!*************************************************************************!*\
  !*** ./src/modules/analytics/components/institutionRequestsDetail.html ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t\r\n\t<div class=\"col-lg-12\">\r\n\t\t<div class=\"bottomMargin list-group-item\">\r\n\t\t\t<span click.delegate=\"showProductInstitutionDetail()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n\t\t\t\tdata-original-title=\"Back\"><i class=\"fa fa-arrow-left fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n\t\t</div>\r\n\t\r\n\t\t<h2 class=\"bottomMargin topMargin\" >${selectedInstitutionDetail}</h2>\r\n\t\t<compose view=\"../../../resources/elements/table-navigation-bar.html\"></compose>\r\n        <table class=\"table table-striped table-hover cf\">\r\n            <thead class=\"cf\">\r\n                <tr>\r\n\t\t\t\t\t<th class=\"col-lg-1\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {type: 'custom', sorter: customPersonSorter, propertyName: 'requestId.personId.lastName'})\">Faculty </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n\t\t\t\t\t<th class=\"col-lg-3\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {type: 'custom', sorter: customProductDetailSorter, propertyName: 'productId.name'})\">Product </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n\t\t\t\t\t<th class=\"col-lg-1\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'requiredDate'})\">Due </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n\t\t\t\t\t<th class=\"col-lg-1\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'createdDate'})\">Created </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n            \t\t<th class=\"col-lg-1\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {type: 'custom', sorter: customRequestStatusSorter, propertyName: 'requestStatus'})\">Status </span><i class=\"fa fa-sort\"></i></th>   \r\n\t\t\t\t\t<th>IDs Requested</th>\r\n                </tr>\r\n                 <tr> \r\n                    <th>\r\n                        <input value.bind=\"helpTicketTypeFilterValue\" input.delegate=\"dataTable.filterList(helpTicketTypeFilterValue, { type: 'custom',  filter: customNameFilter,  compare:'custom'} )\"  class=\"form-control\" />\r\n\t\t\t\t\t</th>\r\n\t\t\t\t\t<th>\r\n\t\t\t\t\t\t<input value.bind=\"productFilterValue\" input.delegate=\"dataTable.filterList(productFilterValue, { type: 'custom',  filter: customProductFilter,  compare:'custom'} )\"  class=\"form-control\" />\r\n\t\t\t\t\t</th>\r\n\t\t\t\t\t<th>\r\n\t\t\t\t\t\t<input type=\"date\" value.bind=\"requiredDateFilterValue\" input.delegate=\"dataTable.filterList(requiredDateFilterValue, {type: 'date', filter: 'requiredDate',  collectionProperty: 'requiredDate', compare: 'after'} )\"  class=\"form-control\" />\r\n\t\t\t\t\t</th>\r\n\t\t\t\t\t<th>\r\n\t\t\t\t\t\t<input type=\"date\" value.bind=\"createdDateFilterValue\" input.delegate=\"dataTable.filterList(createdDateFilterValue, {type: 'date', filter: 'createdDate',  collectionProperty: 'createdDate', compare: 'after'} )\"  class=\"form-control\" />\r\n\t\t\t\t\t</th>\r\n\t\t\t\t\t<th>\r\n\t\t\t\t\t\t<select value.bind=\"requestStatusFilter\" input.delegate=\"dataTable.filterList($event, { type: 'value',  filter: 'requestStatusFilter',  collectionProperty: 'requestStatus', displayProperty: 'requestStatus',  compare:'match'} )\" class=\"form-control\">\r\n\t\t\t\t\t\t\t<option value=\"\"></option>\r\n\t\t\t\t\t\t\t<option repeat.for=\"status of config.REQUEST_STATUS\" value=\"${status.code}\">${status.description}</option>\r\n\t\t\t\t\t\t</select>\r\n\t\t\t\t\t</th>\r\n\t\t\t\t\t<th></th>\r\n                </tr>\r\n            </thead>\r\n            <tbody>\r\n                <tr repeat.for=\"request of dataTable.displayArray\">\r\n\t\t\t\t\t<td class=\"dropbtn\" click.delegate=\"showProfile(request, $event)\" data-title=\"Customer\">${request.requestId.personId.fullName}</td>\r\n\t\t\t\t\t<td  data-title=\"Product\">${request.productId.name}</td>\r\n\t\t\t\t\t<td  data-title=\"requiredDate\">${request.requiredDate | dateFormat:config.DATE_FORMAT_TABLE}</td>\r\n\t\t\t\t\t<td  data-title=\"dateCreated\">${request.createdDate | dateFormat:config.DATE_FORMAT_TABLE}</td>\r\n\t\t\t\t\t<td  data-title=\"status\">${request.requestStatus | lookupValue:config.REQUEST_STATUS:\"code\":\"description\"}</td>\r\n\t\t\t\t\t<td  data-title=\"ids-requested\">${request.requestId | idsRequested}\r\n                </tr>\r\n            </tbody>\r\n\t\t</table>\r\n\t</div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/analytics/components/institutionsTable.html":
/*!*****************************************************************!*\
  !*** ./src/modules/analytics/components/institutionsTable.html ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t<div class=\"col-lg-12 bottomMargin\">\r\n        <div show.bind=\"showExportPanel\">\r\n            <div class=\"panel panel-default\">\r\n                <div class=\"panel-body\">\r\n                    <div class=\"bottomMargin list-group-item leftMargin rightMargin\">\r\n                        <span click.delegate=\"downloadExcel()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n                            data-original-title=\"Download\"><i class=\"fa fa-download fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n                        <span click.delegate=\"cancelDownload()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n                            data-original-title=\"Cancel\"><i class=\"fa fa-ban fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n                    </div>\r\n                    <div class=\"checkbox\"><label><input checked.bind=\"substituteDescriptions\" type=\"checkbox\"> Substitute IS4UA Descriptions</label></div>\r\n                    <div class=\"topMargin\">\r\n                        <div class=\"col-md-5 topMargin\">\r\n                            <label id=\"productList\">Available Fields</label>\r\n                            <div class=\"well well2 overFlow\" style=\"height:400px;\">\r\n                            <input class=\"form-control\" value.bind=\"filter\" input.trigger=\"filterList()\" placeholder=\"Filter products\"/>\r\n                            <ul class=\"list-group\">\r\n                                <a  click.trigger=\"selectField($index)\" type=\"button\" repeat.for=\"product of unselectedFields\" id=\"${$index}\"\r\n                                        class=\"list-group-item dropbtn\">${product.displayName}</a>\r\n                            </ul>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-5 col-md-offset-1 topMargin\">\r\n                            <label id=\"requestProductsLabel\">Selected Fields</label>\r\n                            <div class=\"well well2 overflow\" style=\"height:400px;\">\r\n                            <ul class=\"list-group\">\r\n                                <a click.trigger=\"removeField($index)\" type=\"button\" repeat.for=\"product of selectedFields\" id=\"${$index}\"\r\n                                        class=\"list-group-item dropbtn\">${product.displayName}</a>\r\n                            </ul>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n        <div id=\"no-more-tables\">\r\n            <table class=\"table table-striped table-hover cf\">\r\n                <thead class=\"cf\">\r\n                    <tr colspan='8'>\r\n                            <compose view=\"../../../resources/elements/table-navigation-bar.html\"></compose>\r\n                    </tr>\r\n                    <tr>\r\n                        <td colspan='8'>\r\n                            <span click.delegate=\"refresh()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Refresh\"><i class=\"fa fa-refresh\" aria-hidden=\"true\"></i></span>\r\n                            <span click.delegate=\"_clearFilters()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Clear Filters\"><i class=\"fa fa-filter\" aria-hidden=\"true\"></i></span>\r\n                                <span click.delegate=\"export()\"  class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Export to Excel\"><i class=\"fa fa-download\" aria-hidden=\"true\"></i></span>\r\n                            <span class=\"pull-right\" id=\"spinner\" innerhtml.bind=\"spinnerHTML\"></span>\r\n                        </td>\r\n                    </tr>\r\n                    <tr>\r\n                        <th style=\"width:20rem;\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'name'})\">Name </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                        <th style=\"width:30rem;\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {type: 'custom', sorter: customInstitutionTypeSorter, propertyName: 'institutionType'})\">Institution Type </span><i class=\"fa fa-sort\"></i></th>\r\n                        <th style=\"width:15rem;\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {type: 'custom', sorter: customMemberTypeSorter, propertyName: 'memberType'})\">Member Type </span><i class=\"fa fa-sort\"></i></th>\r\n                        <th><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {type: 'custom', sorter: customHighestDegreeSorter, propertyName: 'highestDegree'})\">Highest Degree </span><i class=\"fa fa-sort\"></i></th>\r\n                        <th><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'region'})\">Region </span><i class=\"fa fa-sort\"></i></th>\r\n                        <th><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'country'})\">Country </span><i class=\"fa fa-sort\"></i></th>\r\n                        <th style=\"width:20rem;\">Member Since</th>\r\n                        <th>Status</th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody>\r\n                    <tr>\r\n                        <th>\r\n                            <input value.bind=\"nameFilterValue\" input.delegate=\"dataTable.filterList(nameFilterValue, { type: 'text',  filter: 'nameFilter', lookupArray: '', lookupProperty: '', collectionProperty: 'name', displayProperty: 'fullnameName', matchProperty:'', compare:'match'} )\"  class=\"form-control\" />\r\n                        </th>\r\n                        <th>\r\n                            <select value.bind=\"institutionTypeFilter\" input.delegate=\"dataTable.filterList($event, { type: 'value',  filter: 'institutionTypeFilter',  collectionProperty: 'institutionType', displayProperty: 'institutionType', compare:'match'} )\" class=\"form-control\">\r\n                                <option value=\"\"></option>\r\n                                <option repeat.for=\"institution of is4ua.institutionTypes\" value=\"${institution.code}\">${institution.description}</option>\r\n                            </select>\r\n                        </th>\r\n                        <th>\r\n                            <select value.bind=\"memberTypeFilter\" input.delegate=\"dataTable.filterList($event, { type: 'value',  filter: 'memberTypeFilter', lookupArray: '', lookupProperty: '', collectionProperty: 'memberType', displayProperty: 'memberType', matchProperty:'', compare:'match'} )\" class=\"form-control\">\r\n                                <option value=\"\"></option>\r\n                                <option repeat.for=\"institution of is4ua.memberTypes\" value=\"${institution.code}\">${institution.description}</option>\r\n                            </select>\r\n                        </th>\r\n                        <th>\r\n                        <select value.bind=\"highestDegreeFilter\" input.delegate=\"dataTable.filterList($event, { type: 'value',  filter: 'highestDegreeFilter', lookupArray: '', lookupProperty: '', collectionProperty: 'highestDegree', displayProperty: 'highestDegree', matchProperty:'', compare:'match'} )\" class=\"form-control\">\r\n                                <option value=\"\"></option>\r\n                                <option repeat.for=\"institution of is4ua.highestDegrees\" value=\"${institution.code}\">${institution.description}</option>\r\n                            </select>\r\n                        </th>\r\n                        <th>\r\n                            <input value.bind=\"regionFilterValue\" input.delegate=\"dataTable.filterList(regionFilterValue, { type: 'text',  filter: 'regionFilter', lookupArray: '', lookupProperty: '', collectionProperty: 'region', displayProperty: 'country', matchProperty:'', compare:'match'} )\"  class=\"form-control\" />\r\n                        </th>\r\n                        <th>\r\n                            <input value.bind=\"countryFilterValue\" input.delegate=\"dataTable.filterList(countryFilterValue, { type: 'text',  filter: 'countryFilter', lookupArray: '', lookupProperty: '', collectionProperty: 'country', displayProperty: 'country', matchProperty:'', compare:'match'} )\"  class=\"form-control\" />\r\n                        </th>\r\n                            <th></th>\r\n                        <th>\r\n                            <select value.bind=\"institutionStatusFilter\" input.delegate=\"dataTable.filterList($event, { type: 'value',  filter: 'institutionStatusFilter', lookupArray: '', lookupProperty: '', collectionProperty: 'institutionStatus', displayProperty: 'institutionStatus', matchProperty:'', compare:'match'} )\" class=\"form-control\">\r\n                                <option value=\"\"></option>\r\n                                <option repeat.for='status of is4ua.institutonStatusArray' value=\"${status.code}\">${status.description}</option>\r\n                            </select>\r\n                        </th>\r\n                    </tr>\r\n                    <tr repeat.for=\"inst of dataTable.displayArray\">\r\n                        <td data-title=\"Name\">${inst.name}</td>\r\n                        <td data-title=\"Type\">${inst.institutionType | lookupValue:is4ua.institutionTypes:\"code\":\"description\"}</td>\r\n                        <td data-tile=\"Member Type\">${inst.memberType | lookupValue:is4ua.memberTypes:\"code\":\"description\"}</td>\r\n                        <td data-title=\"Degree\">${inst.highestDegree | lookupValue:is4ua.highestDegrees:\"code\":\"description\"}</td>\r\n                        <td data-title=\"Region\">${inst.region}</td>\r\n                        <td data-title=\"Country\">${inst.country}</td>\r\n                        <td data-title=\"JoinDate\">${inst.joinDate | dateFormat:config.DATE_FORMAT_TABLE:true}</td>\r\n                        <td data-title=\"Status\">${inst.institutionStatus | lookupValue:is4ua.institutonStatusArray:\"code\":\"description\"}</td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/analytics/components/peopleHTChart.html":
/*!*************************************************************!*\
  !*** ./src/modules/analytics/components/peopleHTChart.html ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t\t<fieldset if.bind=\"!peopleTableSelected\" class=\"col-lg-12\">\r\n\t\t\t<legend>Requests</legend>\r\n\t\t\t<chart id=\"typeChart\" type=\"horizontalBar\" native-options.bind=\"chartOptions\" style=\"width: 100%; height: 100%; display: block;\" should-update=\"true\" throttle=\"2000\" data.bind=\"peopleChartData\"></chart>\r\n\t\t</fieldset>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/analytics/components/peopleHTTable.html":
/*!*************************************************************!*\
  !*** ./src/modules/analytics/components/peopleHTTable.html ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div class=\"col-lg-10 col-lg-offset-1\">\r\n        <div class='row'>\r\n            <compose view=\"../../../resources/elements/table-navigation-bar.html\"></compose>\r\n            <div id=\"no-more-tables\">\r\n                <table class=\"table table-striped table-hover cf\">\r\n                    <thead class=\"cf\">\r\n                        <tr>\r\n                            <th><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'name'})\">Faculty  </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                            <th><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'count'})\">Count  </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                        </tr>\r\n                        <tr>\r\n                            <th>\r\n                                <input value.bind=\"helpTicketTypeFilterValue\" input.delegate=\"dataTable.filterList(helpTicketTypeFilterValue, { type: 'custom',  filter: customHelpTicketTypeFilter, collectionProperty: 'helpTicketType', displayProperty: 'helpTicketType',  compare:'custom'} )\"  class=\"form-control\" />\r\n                            </th>\r\n                            <th></th>\r\n                        </tr>\r\n                        <tr>\r\n                            <th>Totals:</th>\r\n                            <th>${total}</th>\r\n                        </tr>\r\n                    </thead>\r\n                    <tbody>\r\n                        <tr repeat.for=\"stat of dataTable.displayArray\">\r\n                            <td data-title=\"Type\">${stat.name}</td>\r\n                            <td data-title=\"Total\">${stat.count}</td>\r\n                        </tr>\r\n                    </tbody>\r\n                </table>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/analytics/components/productRequestsDetail.html":
/*!*********************************************************************!*\
  !*** ./src/modules/analytics/components/productRequestsDetail.html ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t\r\n\t<div class=\"col-lg-12\">\r\n\t\t<div class=\"bottomMargin list-group-item\">\r\n\t\t\t<span click.delegate=\"showProductDetail()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n\t\t\t\tdata-original-title=\"Back\"><i class=\"fa fa-arrow-left fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n\t\t</div>\r\n\t\r\n\t\t<h2 class=\"bottomMargin topMargin\" >${selectedProductDetails}</h2>\r\n\t\t<compose view=\"../../../resources/elements/table-navigation-bar.html\"></compose>\r\n        <table class=\"table table-striped table-hover cf\">\r\n            <thead class=\"cf\">\r\n                <tr>\r\n\t\t\t\t\t<th class=\"col-lg-1\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {type: 'custom', sorter: customPersonSorter, propertyName: 'requestId.personId.lastName'})\">Faculty </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n\t\t\t\t\t<th class=\"col-lg-3\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {type: 'custom', sorter: customInstituteSorter, propertyName: 'requestId.institutionId'})\">Institution </span><i class=\"fa fa-sort\"></i></th>\r\n\t\t\t\t\t<th class=\"col-lg-1\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'requiredDate'})\">Due </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n\t\t\t\t\t<th class=\"col-lg-1\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'createdDate'})\">Created </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n            \t\t<th class=\"col-lg-1\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {type: 'custom', sorter: customRequestStatusSorter, propertyName: 'requestStatus'})\">Status </span><i class=\"fa fa-sort\"></i></th>   \r\n\t\t\t\t\t<th>IDs Requested</th>\r\n                </tr>\r\n                 <tr>\r\n                    <th>\r\n                        <input value.bind=\"helpTicketTypeFilterValue\" input.delegate=\"dataTable.filterList(helpTicketTypeFilterValue, { type: 'custom',  filter: customNameFilter,  compare:'custom'} )\"  class=\"form-control\" />\r\n\t\t\t\t\t</th>\r\n\t\t\t\t\t<th>\r\n\t\t\t\t\t<input value.bind=\"institutionFilterValue\" input.delegate=\"dataTable.filterList(institutionFilterValue, { type: 'custom',  filter: institutionCustomFilter, compare:'custom'} )\"  class=\"form-control\" />\r\n\t\t\t\t\t</th>\r\n\t\t\t\t\t<th>\r\n\t\t\t\t\t\t<input type=\"date\" value.bind=\"requiredDateFilterValue\" input.delegate=\"dataTable.filterList(requiredDateFilterValue, {type: 'date', filter: 'requiredDate',  collectionProperty: 'requiredDate', compare: 'after'} )\"  class=\"form-control\" />\r\n\t\t\t\t\t</th>\r\n\t\t\t\t\t<th>\r\n\t\t\t\t\t\t<input type=\"date\" value.bind=\"createdDateFilterValue\" input.delegate=\"dataTable.filterList(createdDateFilterValue, {type: 'date', filter: 'createdDate',  collectionProperty: 'createdDate', compare: 'after'} )\"  class=\"form-control\" />\r\n\t\t\t\t\t</th>\r\n\t\t\t\t\t<th>\r\n\t\t\t\t\t\t<select value.bind=\"requestStatusFilter\" input.delegate=\"dataTable.filterList($event, { type: 'value',  filter: 'requestStatusFilter',  collectionProperty: 'requestStatus', displayProperty: 'requestStatus',  compare:'match'} )\" class=\"form-control\">\r\n\t\t\t\t\t\t\t<option value=\"\"></option>\r\n\t\t\t\t\t\t\t<option repeat.for=\"status of config.REQUEST_STATUS\" value=\"${status.code}\">${status.description}</option>\r\n\t\t\t\t\t\t</select>\r\n\t\t\t\t\t</th>\r\n\t\t\t\t\t<th></th>\r\n                </tr>\r\n            </thead>\r\n            <tbody>\r\n                <tr repeat.for=\"request of dataTable.displayArray\">\r\n\t\t\t\t\t<td class=\"dropbtn\" click.delegate=\"showProfile(request, $event)\" data-title=\"Customer\">${request.requestId.personId.fullName}</td>\r\n\t\t\t\t\t<td data-title=\"Name\">${request.requestId.institutionId.name}</td>\r\n\t\t\t\t\t<td  data-title=\"requiredDate\">${request.requiredDate | dateFormat:config.DATE_FORMAT_TABLE}</td>\r\n\t\t\t\t\t<td  data-title=\"dateCreated\">${request.createdDate | dateFormat:config.DATE_FORMAT_TABLE}</td>\r\n\t\t\t\t\t<td  data-title=\"status\">${request.requestStatus | lookupValue:config.REQUEST_STATUS:\"code\":\"description\"}</td>\r\n\t\t\t\t\t<td  data-title=\"ids-requested\">${request.requestId | idsRequested}\r\n                </tr>\r\n            </tbody>\r\n\t\t</table>\r\n\t</div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/analytics/components/productRequestsTable.html":
/*!********************************************************************!*\
  !*** ./src/modules/analytics/components/productRequestsTable.html ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div show.bind=\"summerTable\" class='col-lg-12'>\r\n        <compose view=\"../../../resources/elements/table-navigation-bar.html\"></compose>\r\n        <table class=\"table table-striped table-hover cf\">\r\n            <thead class=\"cf\">\r\n                <tr>\r\n                    <td colspan='9'>\r\n                        <span click.delegate=\"downloadExcel()\"  class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Export to Excel\"><i class=\"fa fa-download\" aria-hidden=\"true\"></i></span>\r\n                    </td>\r\n                </tr>\r\n                <tr>\r\n                    <th><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {type: 'custom', sorter: customProductSorter, propertyName: 'productId'})\">Product </span><i class=\"fa fa-sort\"></i></th>\r\n                    <th><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'total'})\">Total  </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                    <th><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: '1'})\">${config.REQUEST_STATUS[0].description}  </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                    <th><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: '2'})\">${config.REQUEST_STATUS[1].description}  </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                    <th><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: '3'})\">${config.REQUEST_STATUS[2].description}  </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                    <th><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: '4'})\">${config.REQUEST_STATUS[3].description}  </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                    <th><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: '5'})\">${config.REQUEST_STATUS[4].description}  </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                    <th><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: '6'})\">${config.REQUEST_STATUS[5].description}  </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                    <th><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: '7'})\">${config.REQUEST_STATUS[6].description}  </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                    <th><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'studentIds'})\">Student IDs  </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                </tr>\r\n                 <tr>\r\n                    <th>\r\n                        <input value.bind=\"productFilterValue\" input.delegate=\"dataTable.filterList(productFilterValue, { type: 'custom',  filter: customProductFilterValue, compare:'custom'} )\"  class=\"form-control\" />\r\n                    </th>\r\n                    <th></th>\r\n                    <th></th>\r\n                    <th></th>\r\n                    <th></th>\r\n                    <th></th>\r\n                    <th></th>\r\n                    <th></th>\r\n                    <th></th> \r\n                    <th></th> \r\n                    <th></th> \r\n                </tr>\r\n            </thead>\r\n            <tbody>\r\n                <tr click.delegate=\"showProductDetail(stat)\" repeat.for=\"stat of dataTable.displayArray\">\r\n                    <td data-title=\"Product\">${stat.productId.name}</td>\r\n                    <td data-title=\"Institution\">${stat.total | formatNumber}</td>\r\n                    <td data-title=\"${config.REQUEST_STATUS[$index].description}\" repeat.for=\"status of config.REQUEST_STATUS\">${stat | statValue:config.REQUEST_STATUS:$index}</td>\r\n                    <td>${stat.studentIds | formatNumber}</td>\r\n                </tr>\r\n            </tbody>\r\n        </table>\r\n    </div>\r\n    <compose show.bind=\"!summerTable\" view=\"./productRequestsDetail.html\"></compose>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/analytics/components/requestsByCountry.html":
/*!*****************************************************************!*\
  !*** ./src/modules/analytics/components/requestsByCountry.html ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div show.bind=\"selectedSession\">\r\n    <div class=\"row\">\r\n        <div class=\"col-lg-12\">\r\n            <!--\r\n          <div class=\"bottomMargin list-group-item leftMargin rightMargin\">\r\n            <span click.delegate=\"showSAPProductTable()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n                data-original-title=\"Table\"><i class=\"fa fa-table fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n                \r\n            <span click.delegate=\"showSAPProductGraph()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n                data-original-title=\"Graphs\"><i class=\"fa fa-pie-chart fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n          </div>\r\n        -->\r\n          <div show.bind=\"sapCountryTableSelected\" class=\"col-lg-12\">\r\n              <compose view=\"./countryProductRequestsTable.html\"></compose>\r\n          </div> \r\n        </div>\r\n    </div>\r\n  </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/analytics/components/requestsByInstitution.html":
/*!*********************************************************************!*\
  !*** ./src/modules/analytics/components/requestsByInstitution.html ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n  <div show.bind=\"selectedSession\">\r\n    <div class=\"row\">\r\n        <div class=\"col-lg-12\">\r\n          <div class=\"bottomMargin list-group-item leftMargin rightMargin\">\r\n            <span click.delegate=\"showInstitutionTable()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n                data-original-title=\"Table\"><i class=\"fa fa-table fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n            <span click.delegate=\"showInstitutionGraph()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n                data-original-title=\"Graphs\"><i class=\"fa fa-pie-chart fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n          </div>\r\n          <div show.bind=\"institutionTableSelected\" class=\"col-lg-12\">\r\n              <compose view=\"./requestsTable.html\"></compose>\r\n          </div> \r\n          <div show.bind=\"!institutionTableSelected\" class=\"col-lg-12\">\r\n              <compose view=\"./requestsInstitutionChart.html\"></compose>\r\n          </div>\r\n        </div>\r\n    </div>\r\n  </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/analytics/components/requestsByInstitutionCountry.html":
/*!****************************************************************************!*\
  !*** ./src/modules/analytics/components/requestsByInstitutionCountry.html ***!
  \****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div show.bind=\"selectedSession\">\r\n        <div class=\"row\">\r\n            <div class=\"col-lg-12\">\r\n                <!--\r\n              <div class=\"bottomMargin list-group-item leftMargin rightMargin\">\r\n                <span click.delegate=\"showSAPProductTable()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n                    data-original-title=\"Table\"><i class=\"fa fa-table fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n                    \r\n                <span click.delegate=\"showSAPProductGraph()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n                    data-original-title=\"Graphs\"><i class=\"fa fa-pie-chart fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n              </div>\r\n            -->\r\n              <div show.bind=\"sapCountryTableSelected\" class=\"col-lg-12\">\r\n                  <compose view=\"./countryInstitutionProductRequestsTable.html\"></compose>\r\n              </div> \r\n            </div>\r\n        </div>\r\n      </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/analytics/components/requestsByProducts.html":
/*!******************************************************************!*\
  !*** ./src/modules/analytics/components/requestsByProducts.html ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div show.bind=\"selectedSession\">\r\n    <div class=\"row\">\r\n        <div class=\"col-lg-12\">\r\n          <div class=\"bottomMargin list-group-item leftMargin rightMargin\">\r\n            <span click.delegate=\"showProductTable()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n                data-original-title=\"Table\"><i class=\"fa fa-table fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n            <span click.delegate=\"showProductGraph()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n                data-original-title=\"Graphs\"><i class=\"fa fa-pie-chart fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n          </div>\r\n          <div show.bind=\"productTableSelected\" class=\"col-lg-12\">\r\n              <compose view=\"./productRequestsTable.html\"></compose>\r\n          </div> \r\n          <div show.bind=\"!productTableSelected\" class=\"col-lg-12\">\r\n              <compose view=\"./requestsProductChart.html\"></compose>\r\n          </div>\r\n        </div>\r\n    </div>\r\n  </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/analytics/components/requestsInstitutionChart.html":
/*!************************************************************************!*\
  !*** ./src/modules/analytics/components/requestsInstitutionChart.html ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t</fieldset>\r\n\t    <fieldset if.bind=\"!institutionTableSelected\" class=\"col-lg-12\">\r\n\t\t\t<legend>Requests  \r\n\t\t\t\t\t<span click.delegate=\"fastBackIns()\" class=\"smallMarginLeft\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n\t\t\t\t\ttitle=\"\" data-original-title=\"Beginning\">\r\n\t\t\t\t\t <i class=\"fa fa-fast-backward fa-border\" aria-hidden=\"true\"></i>\r\n\t\t\t\t\t </span>\r\n\t\t\t\t<span click.delegate=\"backwardIns()\" class=\"smallMarginLeft\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n\t\t\t\t\tdata-original-title=\"Back\"><i class=\"fa fa-step-backward fa-border\" aria-hidden=\"true\"></i></span>\r\n\t\t\t\t<span click.delegate=\"forwardIns()\" class=\"smallMarginLeft\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n\t\t\t\tdata-original-title=\"Forward\"><i class=\"fa fa-step-forward fa-border\" aria-hidden=\"true\"></i></span>\r\n\t\t\t\t<span click.delegate=\"fastForwardIns()\" class=\"smallMarginLeft\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n\t\t\t\ttitle=\"\" data-original-title=\"End\">\r\n\t\t\t\t<i class=\"fa fa-fast-forward fa-border\" aria-hidden=\"true\"></i>\r\n\t\t\t</span>\r\n\t\t\t</legend>\r\n\t\t\t<chart id=\"institutionRequestsChart\" type=\"horizontalBar\" style=\"width: 100%; height: 100%; display: block;\" should-update=\"true\" throttle=\"2000\" data.bind=\"institutionChartData\"></chart>\r\n\t\t</fieldset>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/analytics/components/requestsProductChart.html":
/*!********************************************************************!*\
  !*** ./src/modules/analytics/components/requestsProductChart.html ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t<fieldset if.bind=\"!productTableSelected\" class=\"col-lg-12\">\r\n\t\t<legend>Requests\r\n\t\t\t<span click.delegate=\"fastBackProd()\" class=\"smallMarginLeft\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n\t\t\t title=\"\" data-original-title=\"Beginning\">\r\n\t\t\t\t<i class=\"fa fa-fast-backward fa-border\" aria-hidden=\"true\"></i>\r\n\t\t\t</span>\r\n\t\t\t<span click.delegate=\"backwardProd()\" class=\"smallMarginLeft\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n\t\t\t title=\"\" data-original-title=\"Back\">\r\n\t\t\t\t<i class=\"fa fa-step-backward fa-border\" aria-hidden=\"true\"></i>\r\n\t\t\t</span>\r\n\t\t\t<span click.delegate=\"forwardProd()\" class=\"smallMarginLeft\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n\t\t\t title=\"\" data-original-title=\"Forward\">\r\n\t\t\t\t<i class=\"fa fa-step-forward fa-border\" aria-hidden=\"true\"></i>\r\n\t\t\t</span>\r\n\t\t\t<span click.delegate=\"fastForwardProd()\" class=\"smallMarginLeft\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n\t\t\t title=\"\" data-original-title=\"End\">\r\n\t\t\t\t<i class=\"fa fa-fast-forward fa-border\" aria-hidden=\"true\"></i>\r\n\t\t\t</span>\r\n\t\t</legend>\r\n\t\t<chart id=\"regionsChart\" type=\"horizontalBar\" style=\"width: 100%; height: 100%; display: block;\" should-update=\"true\" throttle=\"2000\"\r\n\t\t data.bind=\"productChartData\"></chart>\r\n\t</fieldset>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/analytics/components/requestsTable.html":
/*!*************************************************************!*\
  !*** ./src/modules/analytics/components/requestsTable.html ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div show.bind=\"summerInstTable\">\r\n    <h4 show.bind=\"dataTable.displayArray.length === 0\" class=\"topMargin leftMargin\">There are no items for this session</h4>\r\n    <div class=\"col-lg-10 col-lg-offset-1\">\r\n        <div class='row'  show.bind=\"dataTable.displayArray.length > 0\" >\r\n            <compose view=\"../../../resources/elements/table-navigation-bar.html\"></compose>\r\n            <div id=\"no-more-tables\">\r\n                <table class=\"table table-striped table-hover cf\"> \r\n                    <thead class=\"cf\">\r\n                         <tr>\r\n                            <td colspan='9'>\r\n                                <span click.delegate=\"downloadInstExcel()\"  class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Export to Excel\"><i class=\"fa fa-download\" aria-hidden=\"true\"></i></span>\r\n                            </td>\r\n                        </tr>\r\n                        <tr>\r\n                            <th><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {type: 'custom', sorter: customInstitutionSorter, propertyName: 'productId'})\">Institution  </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                            <th><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'total'})\">Total  </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                            <th><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: '1'})\">${config.REQUEST_STATUS[0].description}  </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                            <th><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: '2'})\">${config.REQUEST_STATUS[1].description}  </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                            <th><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: '3'})\">${config.REQUEST_STATUS[2].description}  </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                            <th><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: '4'})\">${config.REQUEST_STATUS[3].description}  </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                            <th><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: '5'})\">${config.REQUEST_STATUS[4].description}  </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                            <th><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: '6'})\">${config.REQUEST_STATUS[5].description}  </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                            <th><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: '7'})\">${config.REQUEST_STATUS[6].description}  </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                            <th><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'studentIds'})\">Student IDs  </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                        </tr>\r\n                        <tr>\r\n                            <th>\r\n                                <input value.bind=\"nameFilterValue\" input.delegate=\"dataTable.filterList(nameFilterValue, { type: 'custom',  filter: customNameFilterValue, compare:'custom'} )\"  class=\"form-control\" />\r\n                            </th>\r\n                            <th></th>\r\n                            <th></th>\r\n                            <th></th>\r\n                            <th></th>\r\n                            <th></th>\r\n                            <th></th>\r\n                            <th></th>\r\n                            <th></th>\r\n                            <th></th>\r\n                        </tr>\r\n                        <tr>\r\n                            <th>Totals:</th>\r\n                            <th repeat.for=\"total of totalsInstitutionArray\">${total | formatNumber}</th>\r\n                        </tr>\r\n                    </thead>\r\n                    <tbody>\r\n                        <tr click.delegate=\"showProductInstitutionDetail(stat)\" repeat.for=\"stat of dataTable.displayArray\">\r\n                            <td data-title=\"Institution\">${stat.name}</td>\r\n                            <td data-title=\"Total\">${stat.total}</td>\r\n                            <td data-title=\"${config.REQUEST_STATUS[$index].description}\" repeat.for=\"status of config.REQUEST_STATUS\">${stat | statValue:config.REQUEST_STATUS:$index}</td>\r\n                            <td>${stat.studentIds | formatNumber}</td>\r\n                        </tr>\r\n                    </tbody>\r\n                </table> \r\n            </div>\r\n        </div>\r\n    </div>\r\n    </div>\r\n    <compose show.bind=\"!summerInstTable\" view=\"./institutionRequestsDetail.html\"></compose>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/analytics/components/statusHTChart.html":
/*!*************************************************************!*\
  !*** ./src/modules/analytics/components/statusHTChart.html ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t\t<fieldset if.bind=\"!statusTableSelected\" class=\"col-lg-12\">\r\n\t\t\t<legend>Requests</legend>\r\n\t\t\t<chart id=\"typeChart\" type=\"horizontalBar\" native-options.bind=\"chartOptions\" style=\"width: 100%; height: 100%; display: block;\" should-update=\"true\" throttle=\"2000\" data.bind=\"statusChartData\"></chart>\r\n\t\t</fieldset>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/analytics/components/statusHTTable.html":
/*!*************************************************************!*\
  !*** ./src/modules/analytics/components/statusHTTable.html ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <h4 show.bind=\"dataTable.displayArray.length === 0\" class=\"topMargin leftMargin\">There are no items for this session</h4>\r\n    <div class=\"col-lg-10 col-lg-offset-1\">\r\n        <div class='row'  show.bind=\"dataTable.displayArray.length > 0\" >\r\n            <compose view=\"../../../resources/elements/table-navigation-bar.html\"></compose>\r\n            <div id=\"no-more-tables\">\r\n                <table class=\"table table-striped table-hover cf\">\r\n                    <thead class=\"cf\">\r\n                        <tr>\r\n                            <th><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'helpTicketStatus'})\">Status  </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                            <th><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'count'})\">Count  </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                        </tr>\r\n                        <tr>\r\n                            <th>\r\n                                <input value.bind=\"helpTicketTypeFilterValue\" input.delegate=\"dataTable.filterList(helpTicketTypeFilterValue, { type: 'custom',  filter: customHelpTicketTypeFilter, collectionProperty: 'helpTicketType', displayProperty: 'helpTicketType',  compare:'custom'} )\"  class=\"form-control\" />\r\n                            </th>\r\n                            <th></th>\r\n                        </tr>\r\n                        <tr>\r\n                            <th>Totals:</th>\r\n                            <th>${total}</th>\r\n                        </tr>\r\n                    </thead>\r\n                    <tbody>\r\n                        <tr repeat.for=\"stat of dataTable.displayArray\">\r\n                            <td data-title=\"Type\">${stat.helpTicketStatus}</td>\r\n                            <td data-title=\"Total\">${stat.count}</td>\r\n                        </tr>\r\n                    </tbody>\r\n                </table>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/analytics/components/typeHTChart.html":
/*!***********************************************************!*\
  !*** ./src/modules/analytics/components/typeHTChart.html ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t\t<fieldset if.bind=\"!typeTableSelected\" class=\"col-lg-12\">\r\n\t\t\t<legend>Requests</legend>\r\n\t\t\t<chart id=\"typeChart\" type=\"horizontalBar\" native-options.bind=\"chartOptions\" style=\"width: 100%; height: 100%; display: block;\" should-update=\"true\" throttle=\"2000\" data.bind=\"typeChartData\"></chart>\r\n\t\t</fieldset>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/analytics/components/typeHTTable.html":
/*!***********************************************************!*\
  !*** ./src/modules/analytics/components/typeHTTable.html ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <h4 show.bind=\"dataTable.displayArray.length === 0\" class=\"topMargin leftMargin\">There are no items for this session</h4>\r\n    <div class=\"col-lg-10 col-lg-offset-1\">\r\n        <div class='row'  show.bind=\"dataTable.displayArray.length > 0\" >\r\n            <compose view=\"../../../resources/elements/table-navigation-bar.html\"></compose>\r\n            <div id=\"no-more-tables\">\r\n                <table class=\"table table-striped table-hover cf\">\r\n                    <thead class=\"cf\">\r\n                        <tr>\r\n                            <th><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'description'})\">Type  </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                            <th><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'count'})\">Count  </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                        </tr>\r\n                        <tr>\r\n                            <th>\r\n                                <input value.bind=\"helpTicketTypeFilterValue\" input.delegate=\"dataTable.filterList(helpTicketTypeFilterValue, { type: 'custom',  filter: customHelpTicketTypeFilter, collectionProperty: 'helpTicketType', displayProperty: 'helpTicketType',  compare:'custom'} )\"  class=\"form-control\" />\r\n                            </th>\r\n                            <th></th>\r\n                        </tr>\r\n                        <tr>\r\n                            <th>Totals:</th>\r\n                            <th>${total}</th>\r\n                        </tr>\r\n                    </thead>\r\n                    <tbody>\r\n                        <tr repeat.for=\"stat of dataTable.displayArray\">\r\n                            <td data-title=\"Type\">${stat.description}</td>\r\n                            <td data-title=\"Total\">${stat.count}</td>\r\n                        </tr>\r\n                    </tbody>\r\n                </table>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/analytics/helpTickets.html":
/*!************************************************!*\
  !*** ./src/modules/analytics/helpTickets.html ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <style>\r\n        .menuButtons {\r\n\t\t\tcolor: ${config.ACTIVE_SUBMENU_COLOR};\r\n\t\t\tbackground-color:${config.SUBMENU_BACKGROUND}\r\n        }\r\n    </style>\r\n    <span id=\"loading\">\r\n        <ul class=\"bokeh\">\r\n            <li></li>\r\n            <li></li>\r\n            <li></li>\r\n        </ul>\r\n    </span>\r\n    <div show.bind=\"dataTable.displayArray && dataTable.displayArray.length\" class=\"col-lg-2\">\r\n        <h4>Categories</h4>\r\n        <div>\r\n            <ul class=\"list-group\">\r\n                <button click.trigger=\"typeChanged(category, $event)\" type=\"button\" repeat.for=\"category of categories\"\r\n                    id=\"${category.code}\" class=\"${$first ? 'list-group-item menuButtons categoryButtons' : 'list-group-item categoryButtons'}\">${category.description}</button>\r\n            </ul>\r\n        </div>\r\n    </div>\r\n\r\n    <div show.bind=\"dataTable.displayArray && dataTable.displayArray.length\" class=\"panel panel-default rightMargin leftMargin col-lg-9\">\r\n        <div class=\"panel-body\">\r\n            <div show.bind=\"selectedTab === 'types'\">\r\n                <compose view=\"./components/helpTicketsByType.html\"></compose>\r\n            </div>\r\n            <div show.bind=\"selectedTab === 'curriculum'\">\r\n                <compose view=\"./components/helpTicketsByCurriculum.html\"></compose>\r\n            </div>\r\n            <div show.bind=\"selectedTab === 'institutions'\">\r\n                <compose view=\"./components/helpTicketsByInstitution.html\"></compose>\r\n            </div>\r\n            <div show.bind=\"selectedTab === 'people'\">\r\n                <compose view=\"./components/helpTicketsByPeople.html\"></compose>\r\n            </div>\r\n            <div show.bind=\"selectedTab === 'status'\">\r\n                <compose view=\"./components/helpTicketsByStatus.html\"></compose>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/analytics/institutions.html":
/*!*************************************************!*\
  !*** ./src/modules/analytics/institutions.html ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\n    <span id=\"loading\">\n        <ul class=\"bokeh\">\n            <li></li>\n            <li></li>\n            <li></li>\n        </ul>\n    </span>\n    <div show.bind=\"dataTable.displayArray && dataTable.displayArray.length\" class=\"panel panel-info\">\n        <div class=\"panel-body\">\n            <div class=\"col-lg-10 col-lg-offset-1\">\n                <div class=\"bottomMargin list-group-item leftMargin rightMargin\">\n                    <span click.delegate=\"showTable()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\n                        data-placement=\"bottom\" title=\"\" data-original-title=\"Table\"><i class=\"fa fa-table fa-lg fa-border\"\n                            aria-hidden=\"true\"></i></span>\n                    <span click.delegate=\"showGraph()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\n                        data-placement=\"bottom\" title=\"\" data-original-title=\"Graphs\"><i class=\"fa fa-pie-chart fa-lg fa-border\"\n                            aria-hidden=\"true\"></i></span>\n                </div>\n                <div class=\"row\">\n                    <div show.bind=\"tableSelected\" class=\"col-lg-12\">\n                        <compose view=\"./components/institutionsTable.html\"></compose>\n                    </div>\n                    <!-- <div show.bind=\"!tableSelected\" class=\"col-lg-12\">\n                        <compose view=\"./components/institutionsCharts.html\"></compose>\n                    </div> -->\n                </div>\n            </div>\n        </div>\n    </div>\n</template>\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ })

}]);
//# sourceMappingURL=app-a9114bfc.2384d3fce1a12a237460.bundle.js.map