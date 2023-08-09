"use strict";
(self["webpackChunkuccss_old_new"] = self["webpackChunkuccss_old_new"] || []).push([["app-a9233e0e"],{

/***/ "modules/tech/support/archiveHelpTickets":
/*!********************************************************!*\
  !*** ./src/modules/tech/support/archiveHelpTickets.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ArchiveHelpTickets: function() { return /* binding */ ArchiveHelpTickets; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var aurelia_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-router */ 6433);
/* harmony import */ var _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../resources/utils/dataTable */ 6847);
/* harmony import */ var _resources_data_helpTickets__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../resources/data/helpTickets */ 8142);
/* harmony import */ var _resources_data_sessions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../resources/data/sessions */ 2073);
/* harmony import */ var _resources_data_products__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../resources/data/products */ 8666);
/* harmony import */ var _resources_data_downloads__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../resources/data/downloads */ 9132);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../config/appConfig */ 1666);
/* harmony import */ var _resources_utils_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../resources/utils/utils */ 8741);
/* harmony import */ var _resources_data_people__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../resources/data/people */ 353);
/* harmony import */ var _resources_utils_validation__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../resources/utils/validation */ 2824);
/* harmony import */ var _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../resources/dialogs/common-dialogs */ 6545);
/* harmony import */ var _resources_data_systems__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../resources/data/systems */ 4077);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! moment */ 381);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_13__);
var _dec, _class;














let ArchiveHelpTickets = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(aurelia_router__WEBPACK_IMPORTED_MODULE_1__.Router, _config_appConfig__WEBPACK_IMPORTED_MODULE_7__.AppConfig, _resources_utils_validation__WEBPACK_IMPORTED_MODULE_10__["default"], _resources_data_people__WEBPACK_IMPORTED_MODULE_9__.People, _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_2__.DataTable, _resources_utils_utils__WEBPACK_IMPORTED_MODULE_8__.Utils, _resources_data_helpTickets__WEBPACK_IMPORTED_MODULE_3__.HelpTickets, _resources_data_sessions__WEBPACK_IMPORTED_MODULE_4__.Sessions, _resources_data_downloads__WEBPACK_IMPORTED_MODULE_6__.Downloads, _resources_data_products__WEBPACK_IMPORTED_MODULE_5__.Products, _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_11__.CommonDialogs, _resources_data_systems__WEBPACK_IMPORTED_MODULE_12__.Systems), _dec(_class = class ArchiveHelpTickets {
  constructor(router, config, validation, people, datatable, utils, helpTickets, sessions, apps, products, dialogs, systems) {
    this.searchResults = false;
    this.helpTicketSelected = false;
    this.showPanel = false;
    this.showCustomer = false;
    this.showInstituion = false;
    this.colSpan = 10;
    this.navControl = "supportNavButtons";
    this.spinnerHTML = "";
    this.helpTicketNo = "";
    this.dateFrom = void 0;
    this.dateTo = void 0;
    this.selectedProducts = new Array();
    this.selectedPeople = new Array();
    this.selectedInstitutions = new Array();
    this.router = router;
    this.config = config;
    this.validation = validation;
    this.validation.initialize(this);
    this.people = people;
    this.dataTable = datatable;
    this.dataTable.initialize(this);
    this.utils = utils;
    this.helpTickets = helpTickets;
    this.sessions = sessions;
    this.apps = apps;
    this.products = products;
    this.dialogs = dialogs;
    this.systems = systems;
    this.userObj = JSON.parse(sessionStorage.getItem('user'));
    this.isUCC = this.userObj.userRole >= this.config.UCC_ROLE;
  }
  async activate() {
    this.systems.getSystemsArray();
  }
  async attached() {
    $("#loading").hide();
    let responses = await Promise.all([this.helpTickets.getHelpTicketTypes('?order=category'), this.sessions.getSessionsArray('?order=startDate', true), this.products.getProductsArray('?order=name'), this.people.getInstitutionsArray('?order=name'), this.people.getPeopleArray('?order=lastName'), this.config.getConfig()]);
    this.filterList();
    this.filterPeopleList();
    this.filterInstitutionsList();
    $("#helpTicketStatus").val(this.config.NEW_HELPTICKET_STATUS).change();
    this.dateFrom = "";
    this.dateTo = "";
    this.toolTips();
    // this.selectedStatus = "99";
  }

  toolTips() {
    $('[data-toggle="tooltip"]').tooltip();
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
  buildSearchCriteria() {
    this.searchObj = new Object();
    if (this.helpTicketNo) {
      this.searchObj.helpTicketNo = this.helpTicketNo;
    }
    if (this.dateFrom || this.dateTo) {
      this.searchObj.dateRange = {
        dateFrom: this.dateFrom,
        dateTo: this.dateTo
      };
    }
    if (this.selectedStatus) {
      if (this.selectedStatus == this.config.MY_HELPTICKET_STATUS) {
        this.searchObj.owner = this.userObj._id;
      } else {
        this.searchObj.status = this.selectedStatus;
      }
    }
    if (this.keyWords) {
      this.searchObj.keyWords = this.keyWords;
    }
    if (this.content) {
      this.searchObj.content = this.content;
    }
    if (this.selectedType != -1) {
      this.searchObj.helpTicketType = this.selectedType;
    }
    if (this.selectedProducts && this.selectedProducts.length) {
      this.searchObj.productIds = this.selectedProducts;
    }
    if (this.selectedPeople && this.selectedPeople.length) {
      this.searchObj.peopleIds = this.selectedPeople;
    }
    if (this.selectedInstitutions && this.selectedInstitutions.length) {
      this.searchObj.institutionIds = this.selectedInstitutions;
    }
  }
  async search() {
    $("#loading").show();
    let searchCollection = this.isCheckedCurrent ? 'current' : 'archive';
    this.buildSearchCriteria();
    this.resultArray = await this.helpTickets.archiveSearch(this.searchObj, searchCollection);
    this.helpTicketSelected = true;
    this.dataTable.updateArray(this.resultArray);
    setTimeout(this.toolTips(), 3000);
    $("#loading").hide();
  }
  helpTicketNoEntered() {
    if (this.helpTicketNo.length > 0) {
      $('#elementsToOperateOn :input').attr('disabled', true);
    } else {
      $('#elementsToOperateOn :input').removeAttr('disabled');
    }
  }
  async typeChanged(type) {
    this.helpTickets.helpTicketTypesArray.forEach(item => {
      item.subtypes.forEach(item2 => {
        if (item2.type === this.selectedType) {
          this.selectedSubType = item2;
        }
      });
    });
    var index = parseInt(this.selectedType) - 1;
    if (this.selectedSubType.appsRequired) {
      await this.apps.getDownloadsArray(true, '?fields=helpTicketRelevant|eq|true&order=name');
    } else {
      await this.products.getProductsArray('?fields=_id name');
    }
  }
  _hideTypes() {
    for (var i = 0; i < this.config.HELP_TICKET_TYPES.length; i++) {
      this.config.HELP_TICKET_TYPES[i].show = false;
    }
  }
  filterList() {
    if (this.filter) {
      var thisFilter = this.filter;
      this.filteredProductsArray = this.products.productsArray.filter(item => {
        return item.name.toUpperCase().indexOf(thisFilter.toUpperCase()) != -1;
      });
    } else {
      this.filteredProductsArray = this.products.productsArray;
    }
  }
  selectProduct(el) {
    $("#requestProductsLabel").html("Requested Products");
    this.selectedProducts.push(el.target.id);
  }
  removeProduct(el) {
    this.selectedProducts.splice(this.selectedProducts.indexOf(el.target.id), 1);
  }
  async save(changes) {
    changes = changes ? changes : this.helpTickets.isHelpTicketDirty(this.oroginalHelpTicket, ["requestId", "courseId", "personId", "institutionId"]);
    if (changes && changes.length > 0) {
      changes.forEach(item => {
        this.helpTickets.selectedHelpTicket.audit.push({
          property: item.property,
          oldValue: item.oldValue,
          newValue: item.newValue,
          eventDate: new Date(),
          personId: this.userObj._id
        });
      });
    }
    var email = {};
    let serverResponse = await this.helpTickets.saveHelpTicket(email);
    if (!serverResponse.error) {
      this.dataTable.updateArray(this.helpTickets.helpTicketsArray);
      this.utils.showNotification("The help ticket was updated");
    }
    this._cleanUp();
  }
  filterPeopleList() {
    if (this.peopleFilter) {
      var thisFilter = this.peopleFilter;
      this.filteredPersonArray = this.people.peopleArray.filter(item => {
        return item.fullName.toUpperCase().indexOf(thisFilter.toUpperCase()) != -1;
      });
    } else {
      this.filteredPersonArray = this.people.peopleArray;
    }
  }
  selectPerson(el, person) {
    $("#requestProductsLabel").html("Requested Person");
    this.selectedPeople.push(person._id);
  }
  removePerson(el) {
    this.selectedPeople.splice(this.selectedPeople.indexOf(el.target.id), 1);
  }
  filterInstitutionsList() {
    if (this.institutionsFilter) {
      var thisFilter = this.institutionsFilter;
      this.filteredInstitutionArray = this.people.institutionsArray.filter(item => {
        return item.name.toUpperCase().indexOf(thisFilter.toUpperCase()) != -1;
      });
    } else {
      this.filteredInstitutionArray = this.people.institutionsArray;
    }
  }
  selectInstitution(el) {
    this.selectedInstitutions.push(el.target.id);
  }
  removeInstitution(el) {
    this.selectedInstitutions.splice(this.selectedInstitutions.indexOf(el.target.id), 1);
  }
  clearCriteria() {
    this.selectedInstitutions = new Array();
    this.selectedPeople = new Array();
    this.selectedProducts = new Array();
    this.searchInstitution = false;
    this.searchPeople = false;
    this.searchProduct = false;
    this.keyWords = "";
    this.content = "";
    this.dateFrom = "";
    this.dateTo = "";
    this.selectedStatus = new Array();
    this.helpTicketNo = "";
    $('#elementsToOperateOn :input').removeAttr('disabled');
  }

  /*****************************************************************************************
  * User selected a help ticket
  * el - event object
  * index - index of selected help ticket
  *****************************************************************************************/
  async selectHelpTicket(helpTicket, el) {
    //Make the selected help ticket the selected help ticket
    // this.helpTickets.setHelpTicket(helpTicket);
    await this.helpTickets.getArchiveHelpTicket(helpTicket._id);
    //If the help ticket has a systemId, retrieve the system from the server
    if (this.helpTickets.selectedHelpTicket.content[0].content.systemId) {
      await this.systems.getSystem(this.helpTickets.content.content.systemId);
    }
    if (this.selectedRow) this.selectedRow.children().removeClass('info');
    this.selectedRow = $(el.target).closest('tr');
    this.selectedRow.children().addClass('info');
    this.searchResults = true;
    this.showRequestDetails = true;
    this.showCourse = true;
    this.viewHelpTicketsHeading = "Help Ticket " + this.helpTickets.selectedHelpTicket.helpTicketNo;
  }
  _cleanUp() {
    this.enterResponse = false;
  }
  back() {
    this.searchResults = false;
  }
  backToSearch() {
    this.helpTicketSelected = false;
  }
  _cleanUpFilters() {
    $("#type").val("");
    $("#status").val("");
    $("#personStatus").val("");
  }
  toggleProduct() {
    this.showPanel = !this.showPanel;
  }
  toggleCustomer() {
    this.showCustomer = !this.showCustomer;
  }
  toggleInstitution() {
    this.showInstitution = !this.showInstitution;
  }
  async openHelpTicket(helpTicket) {
    $("#loading").show();
    this.helpTickets.setHelpTicket(helpTicket);
    var obj = {
      property: "helpTicketStatus",
      oldValue: this.helpTickets.selectedHelpTicket.helpTicketStatus,
      newValue: this.config.REVIEW_HELPTICKET_STATUS,
      personId: this.userObj._id,
      date: new Date()
    };
    this.helpTickets.selectedHelpTicket.audit.push(obj);
    this.helpTickets.selectHelpTicketContent();
    this.responseMessage = "Help Ticket reopened by " + this.userObj.fullName;
    this._createResponse();
    this.helpTickets.selectedHelpTicket.helpTicketStatus = this.config.REVIEW_HELPTICKET_STATUS;
    let serverResponse = await this.helpTickets.reopenHelpTicket();
    if (!serverResponse.error) {
      this.utils.showNotification("The help ticket was updated");
    }
    $("#loading").hide();
  }

  /*****************************************************************************************
  * Create the response object
  *****************************************************************************************/
  _createResponse() {
    this.helpTickets.selectedHelpTicketContent.personId = this.userObj._id;
    this.helpTickets.selectedHelpTicketContent.type = this.config.HELP_TICKET_OTHER_TYPE;
    this.helpTickets.selectedHelpTicketContent.emailSent = this.sendEmail;
    this.helpTickets.selectedHelpTicketContent.content.comments = this.responseMessage;
    this.helpTickets.selectedHelpTicketContent.displayForm = this.config.HELP_TICKET_OTHER_TYPE;
  }
  async archiveClosedTickets() {
    $("#loading").show();
    var closedHelpTickets = 0;
    let response = await this.helpTickets.countHelpTicketsStatus(this.config.CLOSED_HELPTICKET_STATUS);
    if (!response.error) closedHelpTickets = response.count;
    if (closedHelpTickets) {
      return this.dialogs.showMessage("This will archive " + closedHelpTickets + " closed help tickets.  Are you sure you want to do that?", "Archive Help Tickets", ['Yes', 'No']).whenClosed(response => {
        if (!response.wasCancelled) {
          this.archiveTickets();
        }
      });
    } else {
      this.utils.showNotification('There are currently no closed help tickets in the active help ticket collection.');
    }
    $("#loading").hide();
  }
  async archiveTickets() {
    let response = await this.helpTickets.archiveHelpTickets();
    if (!response.error) {
      this.utils.showNotification(response.number + ' Help Tickets were archived successfully');
    }
  }
  showComment(helpTicket, el) {
    this.commentShown = helpTicket.content[0].content.comments;
    $(".hover").css("top", el.clientY - 100);
    $(".hover").css("left", el.clientX + 10);
    $(".hover").css("display", "block");
  }
  hideComment() {
    $(".hover").css("display", "none");
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
  customOwnerFilter(value, item, context) {
    if (item.owner[0].personId === null) return false;
    return item.owner[0].personId.fullName.toUpperCase().indexOf(value.toUpperCase()) > -1;
  }
  customNameFilter(value, item, context) {
    return item.personId.fullName.toUpperCase().indexOf(value.toUpperCase()) > -1;
  }
  institutionCustomFilter(value, item, context) {
    return item.institutionId.name.toUpperCase().indexOf(value.toUpperCase()) > -1;
  }
  customOwnerSorter(sortProperty, sortDirection, sortArray, context) {
    context.sortDirection = context.sortDirection === null ? 1 : context.sortDirection === 1 ? -1 : 1;
    return sortArray.sort((a, b) => {
      if (a.owner[0].personId === null && b.owner[0].personId === null) return 0;
      if (a.owner[0].personId === null && b.owner[0].personId !== null) return context.sortDirection * -1;
      if (a.owner[0].personId !== null && b.owner[0].personId === null) return context.sortDirection;
      var result = a.owner[0].personId.lastName < b.owner[0].personId.lastName ? -1 : a.owner[0].personId.lastName > b.owner[0].personId.lastName ? 1 : 0;
      return result * context.sortDirection;
    });
  }
  changeMe() {
    console.log(this.selectedStatus);
  }
}) || _class);

/***/ }),

/***/ "modules/tech/support/createHelpTickets":
/*!*******************************************************!*\
  !*** ./src/modules/tech/support/createHelpTickets.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CreateHelpTickets: function() { return /* binding */ CreateHelpTickets; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var aurelia_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-router */ 6433);
/* harmony import */ var _resources_utils_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../resources/utils/utils */ 8741);
/* harmony import */ var _resources_data_sessions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../resources/data/sessions */ 2073);
/* harmony import */ var _resources_data_downloads__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../resources/data/downloads */ 9132);
/* harmony import */ var _resources_data_products__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../resources/data/products */ 8666);
/* harmony import */ var _resources_data_systems__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../resources/data/systems */ 4077);
/* harmony import */ var _resources_data_helpTickets__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../resources/data/helpTickets */ 8142);
/* harmony import */ var _resources_data_clientRequests__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../resources/data/clientRequests */ 5446);
/* harmony import */ var _resources_data_people__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../resources/data/people */ 353);
/* harmony import */ var _resources_utils_validation__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../resources/utils/validation */ 2824);
/* harmony import */ var _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../resources/utils/dataTable */ 6847);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../config/appConfig */ 1666);
/* harmony import */ var _resources_data_siteInfo__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../resources/data/siteInfo */ 1290);
var _dec, _class;














let CreateHelpTickets = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(aurelia_router__WEBPACK_IMPORTED_MODULE_1__.Router, _resources_data_sessions__WEBPACK_IMPORTED_MODULE_3__.Sessions, _resources_data_downloads__WEBPACK_IMPORTED_MODULE_4__.Downloads, _resources_data_helpTickets__WEBPACK_IMPORTED_MODULE_7__.HelpTickets, _resources_utils_validation__WEBPACK_IMPORTED_MODULE_10__["default"], _resources_utils_utils__WEBPACK_IMPORTED_MODULE_2__.Utils, _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_11__.DataTable, _config_appConfig__WEBPACK_IMPORTED_MODULE_12__.AppConfig, _resources_data_people__WEBPACK_IMPORTED_MODULE_9__.People, _resources_data_clientRequests__WEBPACK_IMPORTED_MODULE_8__.ClientRequests, _resources_data_products__WEBPACK_IMPORTED_MODULE_5__.Products, _resources_data_systems__WEBPACK_IMPORTED_MODULE_6__.Systems, _resources_data_siteInfo__WEBPACK_IMPORTED_MODULE_13__.SiteInfo, aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.TemplatingEngine), _dec(_class = class CreateHelpTickets {
  constructor(router, sessions, apps, helpTickets, validation, utils, datatable, config, people, clientRequests, products, systems, site, templatingEngine) {
    this.showInfoBox = false;
    this.courseSelected = false;
    this.showHelpTicketDescription = false;
    this.showInputForm = false;
    this.showRequests = false;
    this.inputForm = null;
    this.showTypes = false;
    this.showCategories = false;
    this.inputHTML = "";
    this.spinnerHTML = "";
    this.filesSelected = void 0;
    this.selectedFiles = void 0;
    this.removedFiles = new Array();
    this.showAdditionalInfo = false;
    this.router = router;
    this.sessions = sessions;
    this.apps = apps;
    this.helpTickets = helpTickets;
    this.people = people;
    this.utils = utils;
    this.validation = validation;
    this.validation.initialize(this);
    this.dataTable = datatable;
    this.dataTable.initialize(this);
    this.config = config;
    this.clientRequests = clientRequests;
    this.products = products;
    this.systems = systems;
    this.site = site;
    this.templatingEngine = templatingEngine;
    this.userObj = JSON.parse(sessionStorage.getItem('user'));
  }
  canActivate() {
    if (!this.userObj) {
      this.userObj = this.config.user;
      this.isUCC = this.userObj.userRole >= this.config.UCC_ROLE;
      if (!this.userObj) {
        this.utils.showNotification("Couldn't find your user information.  Try logging in again or call the UCC.");
        this.router.navigate("home");
      }
    }
  }
  attached() {
    $('[data-toggle="tooltip"]').tooltip();
  }
  async activate() {
    let responses = await Promise.all([this.helpTickets.getHelpTicketTypes('?order=category'), this.sessions.getSessionsArray('?filter=[or]sessionStatus|Active:Requests&order=startDate', true), this.people.getInstitutionsArray('?filter=institutionStatus|eq|01&order=name', true), this.apps.getDownloadsArray(true, '?filter=helpTicketRelevant[eq]true&order=name'), this.systems.getSystemsArray(), this.config.getConfig(), this.site.getMessageArray('?filter=category|eq|HELP_TICKETS', true)]);
    this.helpTickets.selectHelpTicket();
    this.sendEmail = this.config.SEND_EMAILS;
    this.appsArray = this.apps.appDownloadsArray.filter(item => {
      return item.helpTicketRelevant;
    });
    this.editorMessage = this.getMessage('EDITOR_DESCRIPTION_MESSAGE');
    this.fileUploadMessage = this.getMessage('FILE_UPLOAD_DESCRIPTION');
  }
  async changeInstitution(event) {
    await this.people.getPeopleArray('?filter=[and]institutionId|eq|' + this.selectedInstitution + ':personStatus|eq|01&order=lastName', true);
  }
  changePerson() {
    this.showCategories = this.selectedPerson != "";
    this.people.selectedPersonFromId(this.selectedPerson);
    this.helpTickets.selectedHelpTicket.helpTicketCategory = -1;
    this.helpTickets.selectedHelpTicket.helpTicketType = null;
  }
  async categoryChanged() {
    this.catIndex = this.getCategoryIndex();
    this.requestsRequired = this.helpTickets.helpTicketTypesArray[this.catIndex].requestsRequired;
    await this.getActiveRequests();
    this.showTypes = true;
  }
  getCategoryIndex() {
    var index = 0;
    this.helpTickets.helpTicketTypesArray.forEach((item, categoryIndex) => {
      if (this.helpTickets.selectedHelpTicket.helpTicketCategory == item.category) {
        index = categoryIndex;
      }
    });
    return index;
  }
  getMessage(messageKey) {
    for (var i = 0; i < this.site.messageArray.length; i++) {
      if (this.site.messageArray[i].key === messageKey) return this.site.messageArray[i].content;
    }
    return "";
  }
  createInputForm(html) {
    $('#container').html(html);
    let extendedInput = $('.extend');
    for (let i = 0; i < extendedInput.length; i++) {
      this.helpTickets.selectedHelpTicketContent.content[$(extendedInput[i]).attr('id')] = "";
    }
    let el = document.getElementById('container');
    if (el) {
      if (!el.querySelectorAll('.au-target').length) {
        this.templatingEngine.enhance({
          element: el,
          bindingContext: this
        });
      }
    }
  }

  // /*****************************************************************************************
  // * User selected a helpticket type
  // * el - event object
  // *****************************************************************************************/
  async typeChanged(el) {
    this.selectedHelpTicketType = this.getTypeIndex();
    this.requestsRequired = this.helpTickets.helpTicketTypesArray[this.catIndex].requestsRequired;
    this.descriptionRequired = this.helpTickets.helpTicketTypesArray[this.catIndex].subtypes[this.selectedHelpTicketType].descriptionRequired;
    this.showForm = true;
    if (this.clientRequestsArray.length > 0) this.showRequests = true;
    this.showAdditionalInfo = true;
  }
  getTypeIndex() {
    var typeIndex = 0;
    this.helpTickets.helpTicketTypesArray[this.catIndex].subtypes.forEach((item, typIndex) => {
      if (this.helpTickets.selectedHelpTicket.helpTicketType == item.type) {
        typeIndex = typIndex;
      }
    });
    return typeIndex;
  }
  setupValidation(rules) {
    this.validation.clearRules();
    rules.forEach(item => {
      this.validation.addRule(1, item.control, [{
        "rule": item.rule,
        "message": item.message,
        "value": item.value
      }]);
    });
  }
  getIndex() {
    var returnIndex;
    this.helpTickets.helpTicketTypesArray[this.helpTickets.selectedHelpTicket.helpTicketCategory].subtypes.forEach((item, index) => {
      if (item.type === this.helpTickets.selectedHelpTicket.helpTicketType) {
        returnIndex = index;
      }
    });
    return returnIndex;
  }
  async getActiveRequests() {
    var sessions = "";
    this.sessions.sessionsArray.forEach(item => {
      sessions += item._id + ":";
    });
    sessions = sessions.substring(0, sessions.length - 1);
    await this.clientRequests.getActiveClientRequestsArray(this.selectedPerson, sessions);
    this.originalClientRequestsArray = new Array();
    this.clientRequestsArray = new Array();
    //Cycle through request array
    this.clientRequests.requestsArray.forEach(item => {
      //Cycle through details of request
      item.requestDetails.forEach(item2 => {
        //If there are assignments
        if (item2.assignments && item2.assignments.length > 0) {
          //Cycle through the assignments
          item2.assignments.forEach(assign => {
            this.originalClientRequestsArray.push({
              productId: item2.productId,
              productName: item2.productId.name,
              sessionId: item.sessionId,
              requestStatus: item2.requestStatus,
              systemId: assign.systemId,
              courseName: item.courseId ? item.courseId.name : 'Trial Client',
              courseId: item.courseId ? item.courseId._id : null,
              client: assign.client,
              clientId: assign.clientId,
              _id: item2._id
            });
          });
        } else {
          this.originalClientRequestsArray.push({
            productName: item2.productId.name,
            sessionId: item.sessionId,
            requestStatus: item2.requestStatus,
            courseName: item.courseId ? item.courseId.name : 'Trial Client',
            //item.courseId.name,
            _id: item2._id
          });
        }
      });
    });
    this.originalClientRequestsArray.forEach(item => {
      this.clientRequestsArray.push(item);
    });
  }

  // /*****************************************************************************************
  // * The user selected a request
  // *****************************************************************************************/
  async requestChosen(el, index) {
    this.SelectedClientRequest = this.clientRequestsArray[index];
    this.selectedSessionId = this.clientRequestsArray[index].sessionId;
    if (this.selectedProductRow) this.selectedProductRow.children().removeClass('info');
    this.selectedProductRow = $(el.target).closest('tr');
    this.selectedProductRow.children().addClass('info');
  }
  cancel() {
    this.helpTickets.selectHelpTicket();
    this.helpTickets.selectHelpTicketContent();
    this.showHelpTicketDescription = false;
    this.courseSelected = false;
    this.showAdditionalInfo = false;
    this.showRequests = false;
  }

  // /*****************************************************************************************
  // * Prepare the help ticket to submit to the server
  // *****************************************************************************************/
  async buldHelpTicket() {
    this.helpTickets.selectedHelpTicket.owner = [{
      "personId": "b1b1b1b1b1b1b1b1b1b1b1b1",
      "date": new Date()
    }];
    this.helpTickets.selectedHelpTicket.personId = this.selectedPerson;
    this.helpTickets.selectedHelpTicket.institutionId = this.selectedInstitution;
    this.helpTickets.selectedHelpTicket.sessionId = this.selectedSessionId;
    // this.helpTickets.selectedHelpTicket.helpTicketType = this.inputForm;

    if (!this.showTypes) {
      //If the help ticket type doesn't require a course, insert a dummy courseId
      this.helpTickets.selectedHelpTicket.courseId = 'b1b1b1b1b1b1b1b1b1b1b1b1';
    } else {
      if (this.SelectedClientRequest) {
        this.helpTickets.selectedHelpTicket.requestId = this.SelectedClientRequest._id;
        this.helpTickets.selectedHelpTicket.systemId = this.SelectedClientRequest.systemId;
        this.helpTickets.selectedHelpTicket.clientId = this.SelectedClientRequest.clientId;
        this.helpTickets.selectedHelpTicket.productId = this.SelectedClientRequest.productId;
        this.helpTickets.selectedHelpTicket.courseId = this.SelectedClientRequest.courseId;
      } else {
        this.helpTickets.selectedHelpTicket.courseId = 'b1b1b1b1b1b1b1b1b1b1b1b1';
      }
    }
    this.helpTickets.selectedHelpTicketContent.personId = this.userObj._id;
    this.helpTickets.selectedHelpTicketContent.type = this.helpTickets.selectedHelpTicket.helpTicketType;
    this.helpTickets.selectedHelpTicketContent.displayForm = this.inputForm;
    this.helpTickets.selectedHelpTicket.content.push(this.helpTickets.selectedHelpTicketContent);
  }

  // /*****************************************************************************************
  // * Save the help ticket
  // *****************************************************************************************/
  async save() {
    if (this.validation.validate(1)) {
      await this.buldHelpTicket();
      var email = new Object();
      if (this.sendEmail) {
        email.MESSAGE = this.config.TECH_STAFF_CREATED_HELP_TICKET_MESSAGE;
        email.INSTRUCTIONS = this.config.HELP_TICKET_INSTRUCTIONS;
        email.subject = this.config.TECH_STAFF_CREATED_HELP_TICKET_SUBJECT.replace('[[faculty name]]', this.people.selectedPerson.fullName);
        email.email = this.people.selectedPerson.email;
        email.helpTicketNo = 0;
        email.cc = this.config.HELP_TICKET_EMAIL_LIST ? this.config.HELP_TICKET_EMAIL_LIST + ";" + this.userObj.email : "";
      }
      let serverResponse = await this.helpTickets.saveHelpTicket(email);
      if (!serverResponse.status) {
        this.utils.showNotification("The help ticket was created");
        if (this.filesToUpload && this.filesToUpload.length > 0) {
          this.helpTickets.uploadFile(this.filesToUpload, serverResponse.content[0]._id, this.helpTickets.selectedHelpTicket);
        }
      }
      this._cleanUp();
    }
  }
  _cleanUp() {
    this.showTypes = false;
    this.selectedInstitution = "";
    this.selectedPerson = "";
    this.showCategories = false;
    this.showHelpTicketDescription = false;
    this.showRequests = false;
    this.showAdditionalInfo = false;
    this.helpTickets.selectHelpTicket();
    this.helpTickets.selectHelpTicketContent();
    this.clearTables();
    this.filesSelected = "";
  }

  // /*****************************************************************************************
  // * Remove styling from selected rows on tables
  // *****************************************************************************************/
  clearTables() {
    if (this.selectedCourseRow) this.selectedCourseRow.children().removeClass('rowSelected');
    if (this.selectedProductRow) this.selectedProductRow.children().removeClass('rowSelected');
  }

  // /*****************************************************************************************
  // * Upload files
  // *****************************************************************************************/
  uploadFiles() {
    this.helpTickets.uploadFile(this.files);
  }

  // /*****************************************************************************************
  // * THe user selected files to upload to update the ineterface with the file names
  // *****************************************************************************************/
  changeFiles() {
    this.filesToUpload = this.filesToUpload ? this.filesToUpload : new Array();
    for (var i = 0; i < this.files.length; i++) {
      let addFile = true;
      this.filesToUpload.forEach(item => {
        if (item.name === this.files[i].name) addFile = false;
      });
      if (addFile) this.filesToUpload.push(this.files[i]);
    }
  }
  removeFile(index) {
    this.filesToUpload.splice(index, 1);
  }
}) || _class);

/***/ }),

/***/ "modules/tech/support/support":
/*!*********************************************!*\
  !*** ./src/modules/tech/support/support.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Support: function() { return /* binding */ Support; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var aurelia_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-router */ 6433);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../config/appConfig */ 1666);
var _dec, _class;



let Support = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(aurelia_router__WEBPACK_IMPORTED_MODULE_1__.Router, _config_appConfig__WEBPACK_IMPORTED_MODULE_2__.AppConfig), _dec(_class = class Support {
  constructor(router, config) {
    this.title = "Tech Staff Help Tickets";
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
  getClass(first) {
    return first ? 'active' : '';
  }
  configureRouter(config, router) {
    config.map([{
      route: ['', 'viewHelpTickets'],
      moduleId: './viewHelpTickets',
      settings: {
        auth: true,
        roles: []
      },
      nav: true,
      name: 'viewHelpTickets',
      title: 'View Help Tickets'
    }, {
      route: 'createHelpTickets',
      moduleId: './createHelpTickets',
      settings: {
        auth: true,
        roles: []
      },
      nav: true,
      name: 'createHelpTickets',
      title: 'Create Help Tickets'
    }, {
      route: 'archiveHelpTickets',
      moduleId: './archiveHelpTickets',
      settings: {
        auth: true,
        roles: []
      },
      nav: true,
      name: 'archiveHelpTickets',
      title: 'Help Tickets Archive'
    }]);
    this.router = router;
  }
}) || _class);

/***/ }),

/***/ "modules/tech/support/archiveHelpTickets.html":
/*!**********************************************************!*\
  !*** ./src/modules/tech/support/archiveHelpTickets.html ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <span id=\"loading\">\r\n        <ul class=\"bokeh\">\r\n            <li></li>\r\n            <li></li>\r\n            <li></li>\r\n        </ul>\r\n    </span>\r\n    <!-- <div class=\"panel panel-default\">\r\n        <div class=\"panel-body\">\r\n            <div class=\"row\"> -->\r\n                <div show.bind=\"!helpTicketSelected\" class=\"col-lg-12\">\r\n                    <compose view=\"./components/searchHTForm.html\"></compose>\r\n                </div> <!-- Table Div -->\r\n                <div show.bind=\"helpTicketSelected\" class=\"col-lg-12\">\r\n                    <compose view=\"./components/viewHTSearchResults.html\"></compose>\r\n                </div> <!-- Form Div -->\r\n            <!-- </div> \r\n        </div> -->\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/tech/support/components/Requests.html":
/*!***********************************************************!*\
  !*** ./src/modules/tech/support/components/Requests.html ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <h5>These are your current product requests.  If the issue you are having is related to a specific product, please select it.</h5>\r\n    <div class=\"topMargin\">\r\n      <span id=\"selectProductRequestError\"></span>\r\n      <h5 show.bind=\"clientRequestsArray.length === 0\">You have no product requests that apply to this type of help ticket.</h5>\r\n      <table id=\"clientTable\" show.bind=\"clientRequestsArray.length > 0\" class=\"table table-bordered table-responsive\" style=\"background:white;\">\r\n        <thead>\r\n        <tr class=\"header\">\r\n          <th>Course</th>\r\n          <th>Session</th>\r\n          <th>Product</th>\r\n          <th>System</th>\r\n          <th>Client</th>\r\n          <th>Status</th>\r\n          <th></th>\r\n        </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr class=\"sortable\" id=\"${product.id}\" productId=\"${product.productId}\" \r\n              repeat.for=\"product of clientRequestsArray\"\r\n              click.trigger=\"requestChosen($event, $index)\">\r\n            <td>${product.courseName}</td>\r\n            <td>${product.sessionId | session:sessions.sessionsArray}</td>\r\n            <td>${product.productName}</td> \r\n            <td>${product.systemId | lookupValue:systems.systemsArray:\"_id\":\"sid\"}</td>\r\n            <td>${product.client}</td>\r\n            <td>${product.requestStatus | lookupValue:config.REQUEST_STATUS:\"code\":\"description\"}</td>\r\n            <td>\r\n              <span class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"View Assignment\">\r\n                <i class=\"fa fa-eye fa-lg fa-border\" click.delegate=\"viewAssignment($index, product)\" aria-hidden=\"true\"></i>\r\n              </span>\r\n            </td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n      <span id=\"client\"></span>\r\n    </div>\r\n  </div>\r\n</div>\r\n      <!-- <div>\r\n        <h5 show.bind=\"clientRequestsArray.length === 0\">You have no product requests that apply to this type of help ticket.</h5>\r\n        <table id=\"clientTable\" show.bind=\"clientRequestsArray.length > 0\" class=\"table table-bordered table-responsive\" style=\"background:white;\">\r\n          <thead>\r\n          <tr class=\"header\">\r\n            <th>Course</th>\r\n            <th>Session</th>\r\n            <th>Product</th>\r\n            <th>System</th>\r\n            <th>Client</th>\r\n            <th>Status</th>\r\n            <th show.bind=\"viewHelpTickets\">User IDS</th>\r\n            <th show.bind=\"viewHelpTickets\">Faculty IDs</th>\r\n            <th></th>\r\n          </tr>\r\n          </thead>\r\n          <tbody>\r\n            <tr id=\"${product.id}\" productId=\"${product.productId}\" \r\n                repeat.for=\"product of clientRequestsArray\">\r\n              <td>${product.courseId | courseName:people.coursesArray}</td>\r\n              <td>${product.sessionId | sessionName:sessions.sessionsArray}</td>\r\n              <td>${product.productId._id | lookupValue:products.productsArray:\"_id\":\"name\"}</td>\r\n              <td>${product.systemId | lookupValue:systems.systemsArray:\"_id\":\"sid\"}</td>\r\n              <td>${product.client}</td>\r\n              <td>${product.requestStatus | lookupValue:config.REQUEST_STATUS:\"code\":\"description\"}</td>\r\n              <td show.bind=\"viewHelpTickets\">${product.studentIds}<br>${product.studentPassword}</td>\r\n              <td show.bind=\"viewHelpTickets\">${product.facultyIds}<br>${product.facultyPassword}</td>\r\n              <td>\r\n                <span class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"View Assignment\">\r\n                  <i class=\"fa fa-eye fa-lg fa-border\" click.delegate=\"viewAssignment($index, product)\" aria-hidden=\"true\"></i>\r\n                </span>\r\n              </td>\r\n            </tr>\r\n          </tbody>\r\n        </table>\r\n        <span id=\"client\"></span>\r\n      </div>\r\n    </div>\r\n  </div> -->\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/tech/support/components/assignmentDetails.html":
/*!********************************************************************!*\
  !*** ./src/modules/tech/support/components/assignmentDetails.html ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div show.bind=\"selectedRequestDetail.assignments.length > 0\">\r\n      <h4 class=\"topMargin\"><strong>Assignments</strong></h4>\r\n      <div show.bind=\"selectedRequestDetail.requestStatus == config.ASSIGNED_REQUEST_CODE\" class=\"panel panel-primary topMargin\">\r\n        <div class=\"panel-body\">  \r\n          <ul style=\"padding-left:10px;\">\r\n\t\t\t\t\t\t<li class=\"list-group-item\" repeat.for=\"assign of selectedRequestDetail.assignments\">\r\n             <compose if.bind=\"systems.selectedSystem.type === 'ERP' || !systems.selectedSystem.type\" view=\"./erp.html\"></compose>\r\n             <compose if.bind=\"systems.selectedSystem.type === 'HANA'\" view=\"./hana.html\"></compose>\r\n              <compose if.bind=\"systems.selectedSystem.type === 'BO'\" view=\"./bo.html\"></compose>\r\n\t\t\t\t\t\t</li>\r\n          </ul>\r\n\r\n          <label show.bind=\"products.selectedProduct.documents && products.selectedProduct.documents.length > 0\" class=\"topMargin\">Helpful Documents</label>\r\n          <div class=\"list-group\">\r\n            <a repeat.for=\"document of products.selectedProduct.documents\" href=\"${config.DOCUMENT_FILE_DOWNLOAD_URL}/${document.categoryCode}/${document.categoryName}/${document.fileName}\"  target=\"_blank\">${document.fileName}</a>\r\n          </div>\r\n          <label show.bind=\"selectedRequestDetail.techComments && selectedRequestDetail.techComments.length > 0\" class=\"topMargin\">Assignment Comments</label>\r\n          <div show.bind=\"selectedRequestDetail.techComments && selectedRequestDetail.techComments.length > 0\" class=\"col-lg-12 topMargin well overFlow\" innerhtml.bind=\"selectedRequestDetail.techComments\"></div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>\r\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/tech/support/components/bo.html":
/*!*****************************************************!*\
  !*** ./src/modules/tech/support/components/bo.html ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t\t <div class=\"row leftMargin\">\r\n\t\t\t<h4>URL</h4>\r\n\t\t\t<h5 class=\"leftMargin\"><a href=\"${systems.selectedSystem.its}\" target=\"_blank\">${systems.selectedSystem.its}</a></h5>\r\n\r\n\t\t\t<h4 class=\"topMargin\">Users</h4>\r\n\t\t\t<h5 class=\"leftMargin\">Student IDs: <span class=\"bold\"> ${assign.studentUserIds}</span></h5>\r\n\t\t\t<h5 class=\"leftMargin\">Student Password: <span class=\"bold\"> ${assign.studentPassword}</span></h5>\r\n\t\t\t<span show.bind=\"requests.selectedRequest.courseId !== null\">\r\n\t\t\t\t<h5 class=\"leftMargin\" class=\"topMargin\">Faculty IDs <span class=\"bold\">: ${selectedRequestDetail.assignments[selectedAssignmentIndex].facultyUserIds}</span></h5>\r\n\t\t\t\t<h5 class=\"leftMargin\">Faculty Password: <span class=\"bold\"> ${selectedRequestDetail.assignments[selectedAssignmentIndex].facultyPassword}</span></h5>\r\n\t\t\t</span>\r\n\t\t</div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/tech/support/components/erp.html":
/*!******************************************************!*\
  !*** ./src/modules/tech/support/components/erp.html ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n  <div class=\"row\" style=\"word-wrap: break-word;\">\r\n      <span class=\"col-lg-4\">\r\n        <h5 class=\"leftMargin\">System: <span class=\"bold\">${assign.systemId | lookupValue:systems.systemsArray:\"_id\":\"sid\"}</span></h5>\r\n        <h5 class=\"leftMargin\">Client: <span class=\"bold\"> ${assign.client} </span></h5>\r\n        <h5 class=\"leftMargin\">Server: <span class=\"bold\"> ${assign.systemId | lookupValue:systems.systemsArray:\"_id\":\"server\"} </span></h5>\r\n        <h5 class=\"leftMargin\">System Number: <span class=\"bold\"> ${assign.systemId | lookupValue:systems.systemsArray:\"_id\":\"instance\"} </span></h5>\r\n      </span>\r\n      <span class=\"col-lg-6\">\r\n        <h5>Student IDs: <span class=\"bold\"> ${assign.studentUserIds ? assign.studentUserIds : 'N/A'}</span></h5>\r\n        <h5>Student Password: <span class=\"bold\"> ${assign.studentPassword ? assign.studentPassword : 'N/A'}</span></h5>\r\n        <span>\r\n          <h5 class=\"topMargin\">Faculty IDs <span class=\"bold\">: ${assign.facultyUserIds ? assign.facultyUserIds : 'N/A'}</span></h5>\r\n          <h5>Faculty Password: <span class=\"bold\"> ${assign.facultyPassword ? assign.facultyPassword : 'N/A'}</span></h5>\r\n        </span>\r\n      </span>\r\n      <span class=\"col-lg-12\">\r\n          <h5 show.bind=\"systems.selectedSystem.its && systems.selectedSystem.its.length > 0\" class=\"leftMargin bigTopMargin\">ITS:</h5>\r\n          <h5 show.bind=\"systems.selectedSystem.its && systems.selectedSystem.its.length > 0\"><span class=\"bold\"> <a href=\"${systems.selectedSystem.its}\" target=\"_blank\">${systems.selectedSystem.its}</a> </span></h5>                       \r\n      </span>\r\n  </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/tech/support/components/hana.html":
/*!*******************************************************!*\
  !*** ./src/modules/tech/support/components/hana.html ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t\t <div class=\"row leftMargin\">\r\n\t\t\t<h4>SAP HANA Launchpad URL</h4>\r\n\t\t\t<h5 class=\"leftMargin\"><a href=\"${systems.selectedSystem.its}\" target=\"_blank\">${systems.selectedSystem.its}</a></h5>\r\n\r\n\t\t\t<h4 class=\"topMargin\">Users</h4>\r\n\t\t\t<h5 class=\"leftMargin\">Student IDs: <span class=\"bold\"> ${assign.studentUserIds}</span></h5>\r\n\t\t\t<h5 class=\"leftMargin\">Student Password: <span class=\"bold\"> ${assign.studentPassword}</span></h5>\r\n\t\t\t<span show.bind=\"requests.selectedRequest.courseId !== null\">\r\n\t\t\t\t<h5 class=\"leftMargin\" class=\"topMargin\">Faculty IDs <span class=\"bold\">: ${selectedRequestDetail.assignments[selectedAssignmentIndex].facultyUserIds}</span></h5>\r\n\t\t\t\t<h5 class=\"leftMargin\">Faculty Password: <span class=\"bold\"> ${selectedRequestDetail.assignments[selectedAssignmentIndex].facultyPassword}</span></h5>\r\n\t\t\t</span>\r\n\r\n\t\t\t<h4 class=\"topMargin\">Lumira / Predictive Analytics Connection</h4>\r\n\t\t\t<h5 class=\"leftMargin\">System: <span class=\"bold\">${assign.systemId | lookupValue:systems.systemsArray:\"_id\":\"sid\"}</span></h5>\r\n\t\t\t<h5 class=\"leftMargin\">Server: <span class=\"bold\"> ${systems.selectedSystem.server} </span></h5>\r\n\t\t\t<h5 class=\"leftMargin\">Port: <span class=\"bold\"> ${systems.selectedSystem.port} </span></h5>\r\n\t\t\t<h5 class=\"leftMargin\">System Number: <span class=\"bold\"> ${systems.selectedSystem.instance} </span></h5> \r\n\t\t</div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/tech/support/components/helpTicketDetails.html":
/*!********************************************************************!*\
  !*** ./src/modules/tech/support/components/helpTicketDetails.html ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div class=\"bottomMargin list-group-item leftMargin rightMargin\">\r\n        <span click.delegate=\"save()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Save Response\"><i class=\"fa fa-floppy-o fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n        <span click.delegate=\"cancel()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Cancel\"><i class=\"fa fa-ban fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n    </div> \r\n    <div class=\"col-lg-2 topMargin leftMargin\">\r\n        <div class=\"checkbox\">\r\n          <label>\r\n            <input disabled.bind=\"sendMailDisable\" checked.bind=\"sendEmail\" type=\"checkbox\"> Send Email\r\n          </label>\r\n        </div>\r\n      </div>\r\n    \r\n     <div class=\"col-lg-12 topMargin\">\r\n          <div id=\"container\" ></div>\r\n            \r\n        <!-- Additional Information Panel -->\r\n        <div class=\"col-lg-12 topMargin\" id=\"descriptionGroup\">\r\n            <div class=\"form-group\">\r\n            <label for=\"descriptionID\">Enter a description of the issue. Be as specific as possible and include steps that led up to the issue.</label>\r\n            <editor value.bind=\"helpTickets.selectedHelpTicketContent.content.comments\" height=\"250\"></editor>\r\n        </div>\r\n\r\n        <div class=\"col-lg-2\">\r\n            <label class=\"btn btn-primary\">\r\n                Browse for files&hellip; <input type=\"file\" style=\"display: none;\" change.delegate=\"changeFiles()\"files.bind=\"files\" multiple>\r\n            </label>\r\n        </div>\r\n        <div class=\"col-lg-6\">\r\n            <ul>\r\n                <li repeat.for = \"file of filesToUpload\" class=\"list-group-item\">${file.name}<span click.delegate=\"removeFile($index)\" class=\"pull-right\"><i class=\"fa fa-trash\" aria-hidden=\"true\"></i></span></li>\r\n            </ul>\r\n        </div>\r\n        </div>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/tech/support/components/helpTicketType.html":
/*!*****************************************************************!*\
  !*** ./src/modules/tech/support/components/helpTicketType.html ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n \r\n    <div class=\"form-group topMargin\" >\r\n      <select value.bind=\"selectedInstitution\" change.delegate=\"changeInstitution()\" id=\"institution\" class=\"form-control\">\r\n        <option value=\"\">Select an institution</option>\r\n        <option repeat.for=\"institution of people.institutionsArray\"\r\n                value.bind=\"institution._id\">${institution.name}</option>\r\n      </select>\r\n    </div>\r\n\r\n    <div class=\"form-group\" show.bind=\"selectedInstitution != ''\">\r\n      <select value.bind=\"selectedPerson\" id=\"person\" change.delegate=\"changePerson()\" class=\"form-control\">\r\n        <option value=\"\">Select a person</option>\r\n        <option repeat.for=\"person of people.peopleArray\"\r\n                value.bind=\"person._id\">${person._id | lookupValue:people.peopleArray:\"_id\":\"fullName\"}</option>\r\n      </select>\r\n    </div>\r\n\r\n    <div show.bind=\"selectedPerson !== ''\">\r\n        <div class=\"form-group\">\r\n          <select show.bind=\"showCategories\" value.bind=\"helpTickets.selectedHelpTicket.helpTicketCategory\" change.delegate=\"categoryChanged()\" id=\"helpTicketCategory\" class=\"form-control\">\r\n            <option value=\"-1\">Select the category of help ticket</option>\r\n            <option repeat.for=\"types of helpTickets.helpTicketTypesArray  | sortArray:'category':'ASC'\"\" \r\n                    model.bind=\"types.category\">${types.description}</option>\r\n          </select>\r\n        </div>\r\n\r\n        <div class=\"form-group\">\r\n          <select show.bind=\"showTypes\" value.bind=\"helpTickets.selectedHelpTicket.helpTicketType\" change.delegate=\"typeChanged($event)\" id=\"helpTicketPurpose\"\r\n            class=\"form-control\">\r\n            <option value=\"NULL\">Select the type of help ticket</option>\r\n            <option repeat.for=\"types of helpTickets.helpTicketTypesArray[helpTickets.selectedHelpTicket.helpTicketCategory].subtypes\"\r\n                    model.bind=\"types.type\">${types.description}</option>\r\n          </select>\r\n        </div>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/tech/support/components/requestDetails.html":
/*!*****************************************************************!*\
  !*** ./src/modules/tech/support/components/requestDetails.html ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n   <div class=\"row\">\r\n\t\t<div class=\"col-lg-12\">\r\n\t\t\t<h4 class=\"topMargin\"><strong>Request Details</strong></h4>\r\n\t\t\t<div class=\"panel panel-default topMargin\">\r\n\t\t\t\t<div class=\"panel-body leftJustify\">\r\n\t\t\t\t\t<div  class=\"form-horizontal topMargin\">\r\n\t\t\t\t\t\t<h4>Product: ${selectedRequestDetail.productId.name}</h4>\r\n\t\t\t\t\t\t<h5>Course: ${selectedRequestDetail.requestId.courseId.name}</h5>\r\n\t\t\t\t\t\t<div class=\"topMargin\" show.bind=\"requests.selectedRequest.courseId != config.SANDBOX_ID\">\r\n\t\t\t\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t\t\t\t<div class=\"col-lg-5 leftMargin\">\r\n\t\t\t\t\t\t\t\t\t<h5>Undergrads: <b>${selectedRequestDetail.requestId.undergradIds}</b></h5>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t<div class=\"col-lg-5\">\r\n\t\t\t\t\t\t\t\t\t<h5>Graduate: <b>${selectedRequestDetail.requestId.graduateIds}</b></h5>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div> \r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t\t\t<div class=\"col-lg-5 leftMargin\">\r\n\t\t\t\t\t\t\t\t<h5>Start Date:  <b>${selectedRequestDetail.requestId.startDate | dateFormat:config.DATE_FORMAT_TABLE}</b></h5>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class=\"col-lg-5\">\r\n\t\t\t\t\t\t\t\t<h5>End Date: <b>${selectedRequestDetail.requestId.endDate | dateFormat:config.DATE_FORMAT_TABLE}</b></h5>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div show.bind=\"selectedRequestDetail.requestId.customerMessage && selectedRequestDetail.requestId.customerMessage.length > 0\">\r\n\t\t\t\t\t\t\t<label class=\"topMargin\">Requests from the UCC</label>\r\n\t\t\t\t\t\t\t<div class=\"well\" innerhtml.bind=\"selectedRequestDetail.requestId.customerMessage\"></div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div show.bind=\"selectedRequestDetail.requestId.comments && selectedRequestDetail.requestId.comments.length > 0\">\r\n\t\t\t\t\t\t\t<label class=\"topMargin\">Comments</label>\r\n\t\t\t\t\t\t\t<div innerhtml.bind=\"selectedRequestDetail.requestId.comments\"></div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n\t<div show.bind=\"products.selectedProduct.productDescription\">\r\n\t\t<h4>Product Information</h4>\r\n\t\t<div innerhtml.bind=\"products.selectedProduct.productDescription\"></div>\r\n\t</div>\r\n</template>\r\n    ";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/tech/support/components/searchHTForm.html":
/*!***************************************************************!*\
  !*** ./src/modules/tech/support/components/searchHTForm.html ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\r\n\r\n\t<div class=\"row\">\r\n\t\t<div class=\"list-group-item toolbar\">\r\n\t\t\t<span click.delegate=\"search()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n\t\t\t title=\"\" data-original-title=\"Search\"><i class=\"fa fa-search fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n\t\t\t<span click.delegate=\"clearCriteria()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n\t\t\t data-placement=\"bottom\" title=\"\" data-original-title=\"Clear Criteria\"><i class=\"fa fa-ban fa-lg fa-border\"\r\n\t\t\t\t aria-hidden=\"true\"></i></span>\r\n\t\t\t<!-- <span  click.delegate=\"archiveClosedTickets()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" \r\n\t\t\t\t\ttitle=\"\" data-original-title=\"Archive Tickets\"><i class=\"fa fa-archive fa-lg fa-border\" aria-hidden=\"true\"></i></span> \r\n\t\t\t\t\t<span class=\"checkbox marginLeft\" style=\"white-space: nowrap;display:inline;\">\r\n\t\t\t\t\t\t<label>\r\n\t\t\t\t\t\t  <input checked.bind=\"isCheckedCurrent\" type=\"checkbox\"> Search current help ticket collection\r\n\t\t\t\t\t\t</label>\r\n\t\t\t\t\t</span> -->\r\n\t\t</div>\r\n\t</div>\r\n\r\n\t\t<div class=\"container positionUnderToolbar\">\r\n\t\t\t<div class=\"panel panel-default marginTop\"> \r\n\t\t\t\t<div class=\"panel-body\">\r\n\t\t\t\t\t<div class=\"row\">\r\n\r\n\t\t\t\t\t\t<div class=\"col-lg-3\">\r\n\t\t\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t\t\t<div class=\"col-lg-12 topMargin\">\r\n\t\t\t\t\t\t\t\t\t<label>Help Ticket Number</label>\r\n\t\t\t\t\t\t\t\t\t<input input.delegate=\"helpTicketNoEntered()\" class=\"form-control\" value.bind=\"helpTicketNo\" type=\"text\" />\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div id=\"elementsToOperateOn\">\r\n\t\t\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t\t\t<div class=\"col-lg-5 topMargin\">\r\n\t\t\t\t\t\t\t\t<label>Date Created</label>\r\n\t\t\t\t\t\t\t\t<div class=\"panel panel-primary topMargin\">\r\n\t\t\t\t\t\t\t\t\t<div class=\"panel-body\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-lg-12\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<label>Date From</label>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<flat-picker controlid=\"endDate\" config.bind=\"configDate\" value.bind=\"dateFrom\"></flat-picker>\r\n\t\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-lg-12  topMargin\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<label>Date To</label>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<flat-picker controlid=\"endDateTo\" config.bind=\"configDate\" value.bind=\"dateTo\"></flat-picker>\r\n\t\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class=\"col-lg-5  col-lg-offset-1\">\r\n\t\t\t\t\t\t\t\t<div class=\"col-lg-12\">\r\n\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t\t\t\t\t<label>KeyWords</label>\r\n\t\t\t\t\t\t\t\t\t\t<input class=\"form-control\" value.bind=\"keyWords\" type=\"text\" />\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t<div class=\"col-lg-12\">\r\n\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t\t\t\t\t<label>Content</label>\r\n\t\t\t\t\t\t\t\t\t\t<input class=\"form-control\" value.bind=\"content\" type=\"text\" />\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t<div class=\"col-lg-12\">\r\n\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t\t\t\t\t<label>Type</label>\r\n\t\t\t\t\t\t\t\t\t\t<select change.delegate=\"typeChanged()\" value.bind=\"selectedType\" id=\"helpTicketPurpose\" class=\"form-control\">\r\n\t\t\t\t\t\t\t\t\t\t\t<option value=\"-1\"></option>\r\n\t\t\t\t\t\t\t\t\t\t\t<option repeat.for=\"types of helpTickets.helpTicketTypesArray | helpTicketSubtypes\" model.bind=\"types.type\">${types.description}</option>\r\n\t\t\t\t\t\t\t\t\t\t</select>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t\t<div class=\"col-lg-12\">\r\n\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"col-lg-6\">\r\n\t\t\t\t\t\t\t\t\t\t\t<multiselect label=\"Status\" options.bind=\"config.HELP_TICKET_STATUSES\" value.bind=\"selectedStatus\"></multiselect>\r\n\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t\t\t<div class=\"col-lg-12 topMargin\">\r\n\t\t\t\t\t\t\t\t<div class=\"panel-group\" id=\"accordion\">\r\n\t\t\t\t\t\t\t\t\t<div class=\"panel panel-primary\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"panel-heading dropbtn\" style=\"background-color:${config.SUBMENU_BACKGROUND}\">\r\n\t\t\t\t\t\t\t\t\t\t\t<h4 click.trigger=\"toggleProduct()\" class=\"panel-title\">Search by Product</h4>\r\n\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t<div show.bind=\"showPanel\" class=\"panel-body\">\r\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-5 topMargin\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<label id=\"productList\">Available Products</label>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"well well2 overFlow\" style=\"height:400px;\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<input class=\"form-control\" value.bind=\"filter\" input.trigger=\"filterList()\" placeholder=\"Filter products\" />\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<ul class=\"list-group\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button click.trigger=\"selectProduct($event)\" type=\"button\" repeat.for=\"product of filteredProductsArray\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t id=\"${product._id}\" class=\"list-group-item\">${product.name}</button>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t</ul>\r\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-5 col-md-offset-1 topMargin\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<label id=\"requestProductsLabel\">Requested Products</label>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"well well2 overflow\" style=\"height:400px;\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<ul class=\"list-group\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button click.trigger=\"removeProduct($event)\" type=\"button\" repeat.for=\"product of selectedProducts\" id=\"${product}\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t class=\"list-group-item\">${product | lookupValue:products.productsArray:\"_id\":\"name\"}</button>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t</ul>\r\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t<div class=\"panel panel-primary\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"panel-heading dropbtn\" style=\"background-color:${config.SUBMENU_BACKGROUND}\">\r\n\t\t\t\t\t\t\t\t\t\t\t<h4 click.trigger=\"toggleCustomer()\" class=\"panel-title\">Search by Customer</h4>\r\n\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t<div show.bind=\"showCustomer\" class=\"panel-body\">\r\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-5 topMargin\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<label id=\"productList\">Available People</label>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"well well2 overFlow\" style=\"height:400px;\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<input class=\"form-control\" value.bind=\"peopleFilter\" input.trigger=\"filterPeopleList()\" placeholder=\"Filter people\" />\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<ul class=\"list-group\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button click.trigger=\"selectPerson($event, person)\" type=\"button\" repeat.for=\"person of filteredPersonArray\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t id=\"${person._id}\" class=\"list-group-item\">${person.fullName}</button>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t</ul>\r\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-5 col-md-offset-1 topMargin\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<label>Requested Person</label>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"well well2 overflow\" style=\"height:400px;\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<ul class=\"list-group\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button click.trigger=\"removePerson($event)\" type=\"button\" repeat.for=\"person of selectedPeople\" id=\"${person}\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t class=\"list-group-item\">${person | lookupValue:people.peopleArray:\"_id\":\"fullName\"}</button>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t</ul>\r\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t<div class=\"panel panel-primary\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"panel-heading dropbtn\" style=\"background-color:${config.SUBMENU_BACKGROUND}\">\r\n\t\t\t\t\t\t\t\t\t\t\t<h4 click.trigger=\"toggleInstitution()\" class=\"panel-title\">Search by Institution</h4>\r\n\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t<div show.bind=\"showInstitution\" class=\"panel-body\">\r\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-5 topMargin\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<label id=\"productList\">Available Institutions</label>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"well well2 overFlow\" style=\"height:400px;\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<input class=\"form-control\" value.bind=\"institutionsFilter\" input.trigger=\"filterInstitutionsList()\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t placeholder=\"Filter institutions\" />\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<ul class=\"list-group\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button click.trigger=\"selectInstitution($event)\" type=\"button\" repeat.for=\"institution of filteredInstitutionArray\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t id=\"${institution._id}\" class=\"list-group-item\">${institution.name}</button>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t</ul>\r\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-5 col-md-offset-1 topMargin\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<label>Requested Institution</label>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"well well2 overflow\" style=\"height:400px;\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<ul class=\"list-group\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button click.trigger=\"removeInstitution($event)\" type=\"button\" repeat.for=\"institution of selectedInstitutions\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t id=\"${institution}\" class=\"list-group-item\">${institution |\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tlookupValue:people.institutionsArray:\"_id\":\"name\"}</button>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t</ul>\r\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/tech/support/components/viewArchiveHTForm.html":
/*!********************************************************************!*\
  !*** ./src/modules/tech/support/components/viewArchiveHTForm.html ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t    <div class=\"col-lg-12\">\r\n      <div class=\"row\">\r\n        <span class=\"leftMargin largeFont\">${viewHelpTicketsHeading}</span>\r\n      </div>\r\n\r\n    <!-- Buttons -->\r\n    <div class=\"row\">\r\n      <div class=\"list-group-item toolbar\" id=\"toolbar\">\r\n          <span click.trigger=\"back()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Back\"><i class=\"fa fa-arrow-left fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n          <span click.trigger=\"flag()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Flag\"><i class=\"fa fa-flag fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n          <span class=\"pull-right\">${lockMessage}</span>\r\n          <span class=\"leftMargin largeFont\">${viewHelpTicketsHeading}</span>\r\n      </div> \r\n    </div>\r\n    \r\n    <!-- Help Ticket Header -->\r\n    <div class=\"topMargin\">\r\n        <!-- widget content -->\r\n        <div class=\"row\">\r\n          <div class=\"panel panel-default  leftMargin rightMargin\">        \r\n            <div class=\"panel-body\">\r\n              <div class=\"row\">\r\n                 <div class=\"col-md-3\">\r\n                  <div class=\"form-group\">\r\n                    <h5 class=\"col-md-offset-1\">Customer: ${helpTickets.selectedHelpTicket.personId.fullName}</h5>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-md-3\">\r\n                  <div class=\"form-group\">\r\n                    <h5 class=\"col-md-offset-1\">Institution: ${helpTickets.selectedHelpTicket.institutionId.name}</h5>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-md-3\">\r\n                  <div class=\"form-group\">\r\n                    <h5 class=\"col-md-offset-1\">Last modified: ${helpTickets.selectedHelpTicket.modifiedDate | dateFormat:config.DATE_FORMAT_TABLE:true}</h5>\r\n                  </div>\r\n                </div>\r\n                 <div class=\"col-md-3\">\r\n                  <div class=\"form-group\">\r\n                    <h5 class=\"col-md-offset-1\">Created: ${helpTickets.selectedHelpTicket.createdDate | dateFormat:'YYYY-MM-DD'} ${helpTickets.selectedHelpTicket.createdDate | dateFormat:'h:mm A'}</h5>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"row\">\r\n                 <div class=\"col-md-3\">\r\n                  <div class=\"form-group\">\r\n                    <h5 class=\"col-md-offset-1\">Session: ${helpTickets.selectedHelpTicket.sessionId | session:sessions.sessionsArray}</h5>\r\n                  </div>\r\n                </div>\r\n                 <div class=\"col-md-3\">\r\n                  <div class=\"form-group\">\r\n                    <h5 class=\"col-md-offset-1\">Keywords: ${helpTickets.selectedHelpTicket.keyWords}</h5>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-md-3\">\r\n                  <div class=\"form-group\">\r\n                    <h5 class=\"col-md-offset-1\">Phone: ${helpTickets.selectedHelpTicket.personId.phone | phoneNumber} Mobile: ${helpTickets.selectedHelpTicket.personId.mobile | phoneNumber}</h5>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-md-3\">\r\n                  <div class=\"form-group\">\r\n                    <h5 class=\"col-md-offset-1\">Owner: ${helpTickets.selectedHelpTicket.owner[0].personId.fullName}</h5>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"row\">\r\n                  <div class=\"form-group col-md-3\">\r\n                     <h5 class=\"col-md-offset-1\">Type: ${helpTickets.selectedHelpTicket.helpTicketType | helpTicketType:helpTickets.helpTicketTypesArray}</h5>\r\n                  </div>\r\n                  <div class=\"form-group col-md-3\">\r\n\t\t\t\t\t  <h5 class=\"col-md-offset-1\">Status: ${helpTickets.selectedHelpTicket.helpTicketStatus | lookupValue:config.HELP_TICKET_STATUSES:\"code\":\"description\"}</h5>\r\n                   </div>\r\n                  <div class=\"form-group col-md-3\">\r\n\t\t\t\t\t   <h5 class=\"col-md-offset-1\">Priority: ${helpTickets.selectedHelpTicket.priority  | getArrayValue:config.HELP_TICKET_PRIORITIES:'priority'}</h5>\r\n                  </div>\r\n                </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n\r\n        <compose view=\"../../../../resources/htTimeline/timeline.html\"></compose>\r\n  \r\n\t</div>\r\n\t</template>\r\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/tech/support/components/viewAssignmentForm.html":
/*!*********************************************************************!*\
  !*** ./src/modules/tech/support/components/viewAssignmentForm.html ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t<div class=\"fluid-container\">\r\n\t\t<!-- Buttons -->\r\n\t\t<div class=\"bottomMargin leftMargin rightMargin list-group-item\">\r\n\t\t\t<span click.delegate=\"backView()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n\t\t\t\tdata-original-title=\"Back\"><i class=\"fa fa-arrow-left fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n\t\t</div>\r\n\t\t<div class=\"col-lg-6 col-md-12\">\r\n\t\t\t<compose view=\"./requestDetails.html\"></compose>\r\n\t\t</div>\r\n\t\t<div class=\"col-lg-6 col-md-12\">\r\n\t\t\t<compose view=\"./assignmentDetails.html\"></compose>\r\n\t\t</div>\r\n\t</div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/tech/support/components/viewHTForm.html":
/*!*************************************************************!*\
  !*** ./src/modules/tech/support/components/viewHTForm.html ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\n  <div class=\"panel panel-default\" style=\"padding:5px;\">\n    <div class=\"panel-body\">\n      <div class=\"row\">\n        <compose view=\"./viewHoverProfile.html\"></compose>\n\n        <!-- Buttons -->\n        <compose view=\"./viewToolbarButtons.html\"></compose>\n\n        <compose view=\"./viewRequestsPanel.html\"></compose>\n\n        <!-- Help Ticket Header -->\n        <div class=\"topMargin\">\n          <!-- Enter Response -->\n          <div show.bind=\"enterResponse\" class=\"topMargin bottomMargin \">\n\n            <div class=\"panel panel-default leftMargin rightMargin\" style=\"background-color:ghostwhite;\">\n              <div class=\"panel-body\">\n                <div class=\"list-group-item col-md-12 topMargin\">\n                  <span click.trigger=\"saveResponse(config.REVIEW_HELPTICKET_STATUS)\" class=\"smallMarginRight\"\n                    bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Save Response\"><i\n                      class=\"fa fa-floppy-o fa-lg fa-border\" aria-hidden=\"true\"></i></span>\n                  <span click.trigger=\"saveResponse(config.CUSTOMER_ACTION_HELPTICKET_STATUS)\" class=\"smallMarginRight\"\n                    bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Save and Customer Action\"><i\n                      class=\"fa fa-users fa-lg fa-border\" aria-hidden=\"true\"></i></span>\n                  <span click.trigger=\"saveResponse(config.CLOSED_HELPTICKET_STATUS)\" class=\"smallMarginRight\"\n                    bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Save and Close\"><i\n                      class=\"fa fa-window-close-o fa-lg fa-border\" aria-hidden=\"true\"></i></span>\n                  <span click.trigger=\"cancelResponse()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\n                    data-placement=\"bottom\" title=\"\" data-original-title=\"Cancel\"><i class=\"fa fa-ban fa-lg fa-border\"\n                      aria-hidden=\"true\"></i></span>\n                </div>\n                <div class=\"row\">\n                  <div class=\"col-lg-1 topMargin\">\n                    <div class=\"checkbox \">\n                      <label>\n                        <input change.trigger=\"confidentialChecked()\" checked.bind=\"helpTickets.selectedHelpTicketContent.confidential\"\n                          id=\"confidentialCheckBox\" type=\"checkbox\"> Tech Staff\n                      </label>\n                    </div>\n                  </div>\n                  <div class=\"col-lg-2 topMargin\">\n                    <div class=\"checkbox\">\n                      <label>\n                        <input disabled.bind=\"sendMailDisable\" checked.bind=\"sendEmail\" type=\"checkbox\"> Send Email\n                      </label>\n                    </div>\n                  </div>\n                </div>\n\n                <div class=\"leftMargin rightMargin\">\n                  <editor value.bind=\"responseMessage\" toolbar.bind=\"toolbar\" height=\"250\"></editor>\n                  <p>&nbsp;</p>\n\n                  <div class=\"row hidden-xs hidden-sm\">\n                    <div class=\"col-lg-6\">\n                      <div class=\"col-lg-3\">\n                        <label id=\"fileControlLabel\" class=\"btn btn-primary\">\n                          Browse for files <input type=\"file\" style=\"display: none;\" change.delegate=\"changeFiles()\"\n                            files.bind=\"files\" multiple>\n                        </label>\n                      </div>\n                    </div>\n\n                    <div class=\"col-lg-6\">\n                      <button click.delegate=\"insertDocument()\" class=\"btn btn-primary\">Insert Document</button>\n                    </div>\n                    <div class=\"col-lg-6 topMargin\">\n                      <div class=\"col-lg-10\">\n                        <ul>\n                          <li repeat.for=\"file of filesToUpload\" class=\"list-group-item\">${file.name}<span\n                              click.delegate=\"removeFile($index)\" class=\"pull-right\"><i class=\"fa fa-trash\" aria-hidden=\"true\"></i></span></li>\n                        </ul>\n                      </div>\n                    </div>\n                    <div class='col-lg-6 topMargin'>\n                      <div class=\"col-lg-10\">\n                        <ul>\n                          <li repeat.for=\"file of helpTickets.selectedHelpTicketContent.documents\" class=\"list-group-item\">${file.fileName}<span\n                              click.delegate=\"removeDocument($index)\" class=\"pull-right\"><i class=\"fa fa-trash\"\n                                aria-hidden=\"true\"></i></span></li>\n                        </ul>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n\n          <!-- widget content -->\n          <div class=\"row\">\n            <div class=\"panel panel-default  leftMargin rightMargin\" id=\"form\">\n              <div class=\"panel-body\">\n                <div class=\"row\">\n                  <div class=\"col-md-3\">\n                    <div class=\"form-group\">\n                      <h5 class=\"col-md-offset-1\" class=\"dropbtn\" click.delegate=\"showProfile(selectedRequestDetail, $event)\">Customer:\n                        ${helpTickets.selectedHelpTicket.personId.fullName} <i class=\"fa fa-info\" aria-hidden=\"true\"></i></h5>\n                    </div>\n                  </div>\n                  <div class=\"col-md-3\">\n                    <div class=\"form-group\">\n                      <h5 class=\"col-md-offset-1\">Institution: ${helpTickets.selectedHelpTicket.institutionId.name}</h5>\n                    </div>\n                  </div>\n                  <div class=\"col-md-3\">\n                    <div class=\"form-group\">\n                      <h5 class=\"col-md-offset-1\">Last modified: ${helpTickets.selectedHelpTicket.modifiedDate |\n                        dateFormat:config.DATE_FORMAT_TABLE:true}</h5>\n                    </div>\n                  </div>\n                  <div class=\"col-md-3\">\n                    <div class=\"form-group\">\n                      <h5 class=\"col-md-offset-1\">Created: ${helpTickets.selectedHelpTicket.createdDate |\n                        dateFormat:'YYYY-MM-DD'} ${helpTickets.selectedHelpTicket.createdDate | dateFormat:'h:mm A'}</h5>\n                    </div>\n                  </div>\n                </div>\n                <div class=\"row\">\n                  <div class=\"col-md-3\">\n                    <div class=\"form-group\">\n                      <h5 class=\"col-md-offset-1\">Session: ${helpTickets.selectedHelpTicket.sessionId |\n                        session:sessions.sessionsArray}</h5>\n                    </div>\n                  </div>\n                  <div class=\"col-md-3\">\n                    <div class=\"form-group\">\n                      <h5 class=\"col-md-offset-1\">Keywords: ${helpTickets.selectedHelpTicket.keyWords}</h5>\n                    </div>\n                  </div>\n                  <div class=\"col-md-3\">\n                    <div class=\"form-group\">\n                      <h5 if.bind=\"phoneMask\" class=\"col-md-offset-1\">Phone:\n                        ${helpTickets.selectedHelpTicket.personId.phone |\n                        phoneNumber:config.PHONE_MASKS:helpTickets.selectedHelpTicket.personId.country} Mobile:\n                        ${helpTickets.selectedHelpTicket.personId.mobile |\n                        phoneNumber:config.PHONE_MASKS:helpTickets.selectedHelpTicket.personId.country}</h5>\n                    </div>\n                  </div>\n                  <div class=\"col-md-3\">\n                    <div class=\"form-group\">\n                      <h5 class=\"col-md-offset-1\">Owner: ${helpTickets.selectedHelpTicket.owner[0].personId.fullName}</h5>\n                    </div>\n                  </div>\n                </div>\n                <div class=\"row\">\n                  <div class=\"form-group col-lg-3\">\n                    <div class=\"input-group col-lg-11\">\n                      <label class=\" col-md-offset-1\">Type:</label>\n                      <select value.bind=\"helpTickets.selectedHelpTicket.helpTicketType\" class=\"form-control col-md-offset-1\"\n                        id=\"helpTicketType\">\n                        <option repeat.for=\"type of helpTickets.helpTicketTypesArray | helpTicketSubtypes\" model.bind=\"type.type\">${type.description}</option>\n                      </select>\n                    </div>\n                  </div>\n                  <div class=\"form-group col-lg-3\">\n                    <div class=\"input-group col-lg-11\">\n                      <label class=\"col-md-offset-1\">Status</label>\n                      <select id=\"helpTicketStatus\" value.bind=\"helpTickets.selectedHelpTicket.helpTicketStatus\" class=\"form-control col-md-offset-1\">\n                        <option repeat.for=\"status of config.HELP_TICKET_STATUSES\" model.bind=\"status.code\">${status.description}</option>\n                      </select>\n                    </div>\n                  </div>\n                  <div class=\"form-group col-lg-3\">\n                    <div class=\"input-group col-lg-11\">\n                      <label class=\"col-md-offset-1\">Priority</label>\n                      <select id=\"priority\" value.bind=\"helpTickets.selectedHelpTicket.priority\" class=\"form-control col-md-offset-1\">\n                        <option repeat.for=\"priority of config.HELP_TICKET_PRIORITIES\" model.bind=\"$index\">${priority.priority}</option>\n                      </select>\n                    </div>\n                  </div>\n                  <div class=\"form-group col-lg-3\">\n                    <div class=\"input-group col-lg-11\">\n                      <label class=\"col-md-offset-1\">Keywords</label>\n                      <input type=\"text\" value.bind=\"helpTickets.selectedHelpTicket.keyWords\" class=\"form-control col-md-offset-1\">\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n\n          <compose view=\"../../../../resources/htTimeline/timeline.html\"></compose>\n\n        </div>\n\n      </div>\n    </div>\n  </div>\n</template>\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/tech/support/components/viewHTSearchResults.html":
/*!**********************************************************************!*\
  !*** ./src/modules/tech/support/components/viewHTSearchResults.html ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div class=\"hover\" innerhtml.bind=\"commentShown\"></div>\r\n  <div show.bind=\"!searchResults\">\r\n    <div class=\"row\">\r\n        <div class=\"list-group-item toolbar\">\r\n            <span click.delegate=\"backToSearch()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Back\"><i class=\"fa fa-arrow-left fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n            <span class=\"leftMargin largeFont\">${viewHelpTicketsHeading}</span>\r\n        </div> \r\n    </div>\r\n\r\n    <div class=\"col-lg-12\">\r\n      <div class='row'>\r\n        <div id='no-more-tables'>\r\n          <table id=\"helpTicketTable\" class=\"table table-striped table-hover\">\r\n            <thead>\r\n              <tr>\r\n                <td colspan.bind='colSpan'><compose view=\"../../../../resources/elements/table-navigation-bar.html\"></compose></td>\r\n              </tr>\r\n              <tr>\r\n                <td colspan='colSpan'>\r\n                  <span click.trigger=\"refresh()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Refresh\"><i class=\"fa fa-refresh\" aria-hidden=\"true\"></i></span>\r\n                  <span click.trigger=\"_cleanUpFilters()\" class=\"mousePointer\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Clear Filters\"><i class=\"fa fa-filter fa-ban\" aria-hidden=\"true\"></i></span>\r\n                  <span class=\"pull-right\" id=\"spinner\" innerhtml.bind=\"spinnerHTML\"></span>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <th><span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'helpTicketNo'})\">No </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                <th style=\"width:20em\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'helpTicketType'})\">Type </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                <th style=\"width:15em\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {type: 'custom', sorter: customOwnerSorter, propertyName: 'ownder'})\">Owner </span><i class=\"fa fa-sort\"></i></th>                   \r\n                <th style=\"width:10em;\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'helpTicketStatus'})\">Status </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                <th style=\"width:8em\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'createdDate'})\">Date Created </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                <th style=\"width:8em\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'modifiedDate'})\">Modified Created </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                <th style=\"width:15em\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'personId.lastName'})\">Faculty </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                <th style=\"width:20em\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'institutionId.name'})\">Institution </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                <th>Email</th>\r\n              </tr>\r\n              <tr>\r\n                <th></th>\r\n                <th>\r\n                  <input value.bind=\"helpTicketTypeFilterValue\" input.trigger=\"dataTable.filterList(helpTicketTypeFilterValue, { type: 'custom',  filter: customHelpTicketTypeFilter, collectionProperty: 'helpTicketType', displayProperty: 'helpTicketType',  compare:'custom'} )\"  class=\"form-control\" />\r\n                </th>\r\n                <th>\r\n                  <input value.bind=\"ownerFilterValue\" input.trigger=\"dataTable.filterList(ownerFilterValue, { type: 'custom',  filter: customOwnerFilter, collectionProperty: 'owner', displayProperty: 'helpTicketType',  compare:'custom'} )\"  class=\"form-control\" />\r\n                </th>\r\n                <th>\r\n                  <select value.bind=\"helpTicketStatusFilter\" input.trigger=\"dataTable.filterList($event, { type: 'value',  filter: 'helpTicketStatusFilter',  collectionProperty: 'helpTicketStatus', displayProperty: 'helpTicketStatus',  compare:'match'} )\" class=\"form-control\">\r\n                    <option value=\"\"></option>\r\n                    <option repeat.for=\"status of helpTicketTypes\"\r\n                            value.bind=\"status.code\">${status.description}</option>\r\n                  </select>\r\n                </th>\r\n                <th>\r\n                  <input type=\"date\" value.bind=\"createdDateFilterValue\" input.trigger=\"dataTable.filterList(createdDateFilterValue, {type: 'date', filter: 'createdDate',  collectionProperty: 'createdDate', compare: 'after'} )\"  class=\"form-control\" />\r\n                </th>\r\n                <th>\r\n                  <input type=\"date\" value.bind=\"modifiedDateFilterValue\" input.trigger=\"dataTable.filterList(modifiedDateFilterValue, {type: 'date', filter: 'modifiedDate',  collectionProperty: 'modifiedDate', compare: 'after'} )\"  class=\"form-control\" />\r\n                </th>\r\n                <th>\r\n                  <input value.bind=\"personFilterValue\" input.trigger=\"dataTable.filterList(personFilterValue, { type: 'custom',  filter: customNameFilter,  compare:'custom'} )\"  class=\"form-control\" />\r\n                </th>\r\n                <th>\r\n                  <input value.bind=\"institutionFilterValue\" input.trigger=\"dataTable.filterList(institutionFilterValue, { type: 'custom',  filter: institutionCustomFilter, compare:'custom'} )\"  class=\"form-control\" />\r\n                </th>\r\n                <th></th>\r\n              </tr>\r\n              \r\n            </thead>\r\n            <tbody>\r\n              <tr repeat.for=\"helpTicket of dataTable.displayArray\">\r\n                <td click.trigger=\"selectHelpTicket(helpTicket, $event)\" data-title=\"Number\">${helpTicket.helpTicketNo}</td>\r\n                <td mouseover.delegate=\"showComment(helpTicket, $event)\" mouseout.delegate=\"hideComment()\" click.trigger=\"selectHelpTicket(helpTicket, $event)\" data-title=\"Type\">${helpTicket.helpTicketType | helpTicketType:helpTickets.helpTicketTypesArray}</td>\r\n                <td click.trigger=\"selectHelpTicket(helpTicket, $event)\" data-title=\"Owner\">\r\n                  <span show.bind=\"helpTicket.owner[0].personId === null\"></span>\r\n                  <span show.bind=\"helpTicket.owner[0].personId !== null\"> ${helpTicket.owner[0].personId.fullName}</span>\r\n                </td>\r\n                <td data-title=\"Status\"> \r\n                  ${helpTicket.helpTicketStatus | lookupValue:config.HELP_TICKET_STATUSES:\"code\":\"description\"}\r\n                  <span show.bind=\"helpTicket.helpTicketStatus === config.CLOSED_HELPTICKET_STATUS\" click.delegate=\"openHelpTicket(helpTicket)\" class=\"marginLeft\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Open\"><i class=\"fa fa-folder-open-o\" aria-hidden=\"true\"></i></span>\r\n                </td>\r\n                <td click.trigger=\"selectHelpTicket(helpTicket, $event)\" data-title=\"Created Date\" >${helpTicket.createdDate | dateFormat:config.DATE_FORMAT_TABLE:false}</td>\r\n                <td click.trigger=\"selectHelpTicket(helpTicket, $event)\" data-title=\"Modified Date\">${helpTicket.modifiedDate | dateFormat:config.DATE_FORMAT_TABLE:false}</td>\r\n                <td click.trigger=\"selectHelpTicket(helpTicket, $event)\" class=\"hidden-xs hidden-sm hidden-md\" style=\"width:10rem;\" data-title=\"Customer\">${helpTicket.personId.firstName} ${helpTicket.personId.lastName}</td>\r\n                <td click.trigger=\"selectHelpTicket(helpTicket, $event)\" data-title=\"Insitution\">${helpTicket.institutionId.name}</td>\r\n                <td click.trigger=\"selectHelpTicket(helpTicket, $event)\" data-title=\"Email\" >${helpTicket.personId.email}</td>\r\n              </tr>\r\n            </tbody>\r\n          </table>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  </div>\r\n  <div class=\"row\" show.bind=\"searchResults\">\r\n    <compose view=\"./viewArchiveHTForm.html\"></compose>\r\n  </div>\r\n\t\r\n</template>\r\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/tech/support/components/viewHTTable.html":
/*!**************************************************************!*\
  !*** ./src/modules/tech/support/components/viewHTTable.html ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div class=\"panel panel-default\">\r\n        <div class=\"panel-body\">\r\n          <div class=\"row\">\r\n              <div show.bind=\"!helpTicketSelected\" class=\"col-lg-12\">\r\n                  <div show.bind=\"nohelpTickets\" class=\"bottomMargin leftMargin\">\r\n                      <h4>You have no open help tickets</h4>\r\n                      <span class=\"checkbox marginLeft\" style=\"white-space: nowrap;display:inline;\">\r\n              <label>\r\n                <input checked.bind=\"isCheckedCurrent\" change.trigger=\"retrieveClosedHelpTickets()\" type=\"checkbox\"> View closed help tickets\r\n              </label>\r\n            </span>\r\n                  </div>\r\n                  \r\n  <div class=\"col-lg-12\">\r\n    <div class=\"hover\" innerhtml.bind=\"commentShown\"></div>\r\n    <div class=\"hoverProfile\" >\r\n        <span  click.trigger=\"hideProfile()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Close\"><i class=\"fa fa-window-close-o\" aria-hidden=\"true\"></i></span>\r\n        <span  click.trigger=\"sendAnEmail(profileHelpTicket.personId)\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Send Email\"><i class=\"fa fa-envelope-o\" aria-hidden=\"true\"></i></span>\r\n        <hr/>\r\n        <div class=\"col-md-4\">\r\n          <div  class=\"topMargin\">\r\n              <img if.bind=\"profileHelpTicket.personId.file.fileName\" class=\"circular--square leftMargin\" src =\"${config.PERSON_IMAGE_DOWNLOAD_URL}/${profileHelpTicket.personId.file.fileName}\" height=\"100\">\r\n          </div>\r\n          <div if.bind=\"!profileHelpTicket.personId.file.fileName\" style=\"height:100px;width:100px;\" innerhtml.bind=\"profileHelpTicket.personId.email | gravatarUrl:100:6\"></div>\r\n        </div>\r\n        <div class=\"col-md-8\">\r\n          <h5>Nickname: ${profileHelpTicket.personId.nickName}</h5>\r\n          <h5>Phone: ${profileHelpTicket.personId.phone  | formatPhone}</h5>\r\n          <h5>Mobile: ${profileHelpTicket.personId.mobile | formatPhone}</h5>\r\n        </div>\r\n    </div>\r\n\r\n    <div class='row'>\r\n      <div id='no-more-tables'>\r\n        <table id=\"helpTicketTable\" class=\"table table-striped table-hover\">\r\n          <thead>\r\n            <tr>\r\n                <td colspan='${colSpan}'>\r\n                  <div class=\"checkbox\">\r\n                    <label>\r\n                      <input disabled.bind=\"sendMailDisable\" checked.bind=\"sendEmail\" type=\"checkbox\"> Send Email\r\n                    </label>\r\n                  </div>\r\n                  <div class=\"col-xs-2\">\r\n                    <h4>Today:</h4> <h7>Created: ${helpTickets.helpTickeAges.today[0]} Modified: ${helpTickets.helpTickeAges.today[1]}</h7>\r\n                  </div>\r\n                  <div class=\"col-xs-2\">\r\n                    <h4>Yesterday:</h4><h7>Created: ${helpTickets.helpTickeAges.yesterday[0]} Modified: ${helpTickets.helpTickeAges.yesterday[1]}</h7>\r\n                </div>\r\n                <div class=\"col-xs-2\">\r\n                  <h4>One Week:</h4> <h7>Created: ${helpTickets.helpTickeAges.oneWeek[0]} Modified: ${helpTickets.helpTickeAges.oneWeek[1]}</h7>\r\n                </div>\r\n                <div class=\"col-xs-2\">\r\n                  <h4>Two Weeks:</h4> <h7>Created: ${helpTickets.helpTickeAges.twoWeeks[0]} Modified: ${helpTickets.helpTickeAges.twoWeeks[1]}</h7>\r\n                </div>\r\n                <div class=\"col-xs-2\" style=\"color:red;\" show.bind=\"helpTickets.helpTickeAges.older[0]>0 || helpTickets.helpTickeAges.older[1] > 0\">\r\n                  <h4>Older:</h4> <h7>Created: ${helpTickets.helpTickeAges.older[0]} Modified: ${helpTickets.helpTickeAges.older[1]}</h7>\r\n                </div>\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n              <td colspan.bind='colSpan'><compose view=\"../../../../resources/elements/table-navigation-bar.html\"></compose></td>\r\n            </tr>\r\n            <tr>\r\n              <td colspan='colSpan'>\r\n                <span click.trigger=\"refresh()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Refresh\"><i class=\"fa fa-refresh\" aria-hidden=\"true\"></i></span>\r\n                <span click.trigger=\"_cleanUpFilters()\" class=\"mousePointer\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Clear Filters\"><i class=\"fa fa-filter fa-ban\" aria-hidden=\"true\"></i></span>\r\n \r\n                <span class=\"pull-right\" id=\"spinner\" innerhtml.bind=\"spinnerHTML\"></span>\r\n              </td>\r\n            </tr>\r\n            <tr>\r\n              <th style=\"width:10em\"><span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'helpTicketNo'})\">No </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n              <th style=\"width:20em\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'helpTicketType'})\">Type </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n              <th style=\"width:15em\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {type: 'custom', sorter: customOwnerSorter, propertyName: 'ownder'})\">Owner </span><i class=\"fa fa-sort\"></i></th>                   \r\n              <th style=\"width:10em;\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'helpTicketStatus'})\">Status </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n              <th style=\"width:8em\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'createdDate'})\">Date Created </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n              <th style=\"width:8em\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'modifiedDate'})\">Date Modified </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n              <th style=\"width:15em\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'personId.lastName'})\">Faculty </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n              <th style=\"width:20em\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'institutionId.name'})\">Institution </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n              <th style=\"width:15em\">Email</th>\r\n            </tr>\r\n            <tr>\r\n              <th>\r\n                  <input value.bind=\"helpTicketNoFilterValue\" input.trigger=\"dataTable.filterList(helpTicketNoFilterValue, { type: 'value',  filter: 'helpTicketNoFilter', collectionProperty: 'helpTicketNo', displayProperty: 'helpTicketNo',  compare:'match'} )\"  class=\"form-control\" />\r\n              </th>\r\n              <th>\r\n                <input value.bind=\"helpTicketTypeFilterValue\" input.trigger=\"dataTable.filterList(helpTicketTypeFilterValue, { type: 'custom',  filter: customHelpTicketTypeFilter, collectionProperty: 'helpTicketType', displayProperty: 'helpTicketType',  compare:'custom'} )\"  class=\"form-control\" />\r\n              </th>\r\n              <th>\r\n                <input value.bind=\"ownerFilterValue\" input.trigger=\"dataTable.filterList(ownerFilterValue, { type: 'custom',  filter: customOwnerFilter, collectionProperty: 'owner', displayProperty: 'helpTicketType',  compare:'custom'} )\"  class=\"form-control\" />\r\n              </th>\r\n              <th>\r\n                <select value.bind=\"helpTicketStatusFilter\" change.trigger=\"customHelpTicketStatusFilter()\" class=\"form-control\">\r\n                <!--input.trigger=\"dataTable.filterList($event, { type: 'value',  filter: 'helpTicketStatusFilter',  collectionProperty: 'helpTicketStatus', displayProperty: 'helpTicketStatus',  compare:'match'} )\" --> \r\n                  <option value=\"\"></option>\r\n                  <option repeat.for=\"status of helpTicketTypes\"\r\n                          value.bind=\"status.code\">${status.description}</option>\r\n                </select>\r\n              </th>\r\n              <th>\r\n                <input type=\"date\" value.bind=\"createdDateFilterValue\" input.trigger=\"dataTable.filterList(createdDateFilterValue, {type: 'date', filter: 'createdDate',  collectionProperty: 'createdDate', compare: 'after'} )\"  class=\"form-control\" />\r\n              </th>\r\n               <th>\r\n                <input type=\"date\" value.bind=\"modifiedDateFilterValue\" input.trigger=\"dataTable.filterList(modifiedDateFilterValue, {type: 'date', filter: 'modifiedDate',  collectionProperty: 'modifiedDate', compare: 'after'} )\"  class=\"form-control\" />\r\n              </th>\r\n              <th>\r\n                <input value.bind=\"personFilterValue\" input.trigger=\"dataTable.filterList(personFilterValue, { type: 'custom',  filter: customNameFilter,  compare:'custom'} )\"  class=\"form-control\" />\r\n              </th>\r\n              <th>\r\n                <input value.bind=\"institutionFilterValue\" input.trigger=\"dataTable.filterList(institutionFilterValue, { type: 'custom',  filter: institutionCustomFilter, compare:'custom'} )\"  class=\"form-control\" />\r\n              </th>\r\n              <th></th>\r\n            </tr>\r\n            \r\n          </thead>\r\n          <tbody>\r\n            <tr repeat.for=\"helpTicket of dataTable.displayArray\" class=\"${helpTicket.priority | getArrayValue:config.HELP_TICKET_PRIORITIES:'status'}\">\r\n              <td style=\"width:100px;\" data-title=\"Number\">${helpTicket.helpTicketNo}</td>\r\n              <td  mouseover.delegate=\"showComment(helpTicket, $event)\" mouseout.delegate=\"hideComment()\" click.trigger=\"selectHelpTicket($event, $index, helpTicket)\"\r\n                data-title=\"Type\">${helpTicket.helpTicketType | helpTicketType:helpTickets.helpTicketTypesArray}\r\n              </td>\r\n              <td data-title=\"Owner\">\r\n                <span show.bind=\"helpTicket.owner[0].personId === null\" click.trigger=\"ownHelpTicket(helpTicket)\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Take Ownership\"><i class=\"fa fa-child fa-lg\" aria-hidden=\"true\"></i></span>\r\n                <span show.bind=\"helpTicket.owner[0].personId !== null\" click.trigger=\"ownHelpTicket(helpTicket)\"><i class=\"fa fa-child\" aria-hidden=\"true\"></i></span><span click.trigger=\"selectHelpTicket($event, $index, helpTicket)\" show.bind=\"helpTicket.owner[0].personId !== null\" > ${helpTicket.owner[0].personId.fullName} </span>\r\n                <!-- click.trigger=\"selectHelpTicket($event, $index, helpTicket)\" -->\r\n              </td>\r\n              <td \r\n              <td class=\"dropbtn\" data-title=\"Status\">\r\n                <div class=\"dropdown hidden-xs hidden-sm hidden-md\">\r\n                  <span class=\"dropbtn\"> ${helpTicket.helpTicketStatus | lookupHTStatus:config.HELP_TICKET_STATUSES}\r\n                    <div show.bind=\"helpTicket.helpTicketStatus !== config.CLOSED_HELPTICKET_STATUS && helpTicket.helpTicketStatus !== config.NEW_HELPTICKET_STATUS\" class=\"dropdown-content\">\r\n                      <a href=\"#\" click.trigger=\"changeStatus(helpTicket, status.code, status.description)\" repeat.for=\"status of config.HELP_TICKET_STATUSES | helpTicketStatuses:removeHTStatus\">${status.description}</a>\r\n                    </div>\r\n                  </span>\r\n                </div> \r\n                <div class=\"hidden-lg\">${helpTicket.helpTicketStatus | lookupHTStatus:config.HELP_TICKET_STATUSES}</div>\r\n\r\n              </td>\r\n              <td  data-title=\"Created Date\" click.trigger=\"selectHelpTicket($event, $index, helpTicket)\">${helpTicket.createdDate | dateFormat:config.DATE_FORMAT_TABLE:false}</td>\r\n              <td  data-title=\"Modified Date\" click.trigger=\"selectHelpTicket($event, $index, helpTicket)\">${helpTicket.modifiedDate | dateFormat:config.DATE_FORMAT_TABLE:false}</td>\r\n              <td class=\"dropbtn hidden-xs hidden-sm hidden-md\" style=\"width:10rem;\" click.trigger=\"selectHelpTicket($event, $index, helpTicket)\" data-title=\"Customer\">${helpTicket.personId.firstName} ${helpTicket.personId.lastName}</td>\r\n              <td class=\"hidden-lg\" style=\"width:10rem;\" click.trigger=\"selectHelpTicket($event, $index, helpTicket)\" data-title=\"Customer\" >${helpTicket.personId.firstName} ${helpTicket.personId.lastName}</td>\r\n              <td  data-title=\"Insitution\" click.trigger=\"selectHelpTicket($event, $index, helpTicket)\">${helpTicket.institutionId.name}</td>\r\n              <td class=\"dropbtn\"  click.trigger=\"sendAnEmail(helpTicket.personId)\" data-title=\"Email\" >${helpTicket.personId.email}</td>\r\n            </tr>\r\n          </tbody>\r\n        </table>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  </div>\r\n\r\n</div> \r\n</div> \r\n</div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/tech/support/components/viewHoverProfile.html":
/*!*******************************************************************!*\
  !*** ./src/modules/tech/support/components/viewHoverProfile.html ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div class=\"hoverProfile\">\r\n        <span click.delegate=\"hideProfile()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n            data-placement=\"bottom\" title=\"\" data-original-title=\"Close\"><i class=\"fa fa-window-close-o\" aria-hidden=\"true\"></i></span>\r\n        <hr />\r\n        <div class=\"col-md-4\">\r\n            <div class=\"topMargin\">\r\n                <img if.bind=\"personImage\" class=\"circular--square leftMargin\" src=\"${config.PERSON_IMAGE_DOWNLOAD_URL}/${selectedRequestDetail.requestId.personId.file.fileName}\"\r\n                    height=\"100\">\r\n            </div>\r\n            <div if.bind=\"!personImage\" style=\"height:100px;width:100px;\" innerhtml.bind=\"selectedRequestDetail.requestId.personId.email | gravatarUrl:100:6\"></div>\r\n        </div>\r\n        <div class=\"col-md-8\">\r\n            <h5>Name: ${helpTickets.selectedHelpTicket.personId.fullName}</h5>\r\n            <h5>Phone: ${helpTickets.selectedHelpTicket.personId.phone | formatPhone}</h5>\r\n            <h5>Mobile: ${helpTickets.selectedHelpTicket.personId.mobile | formatPhone}</h5>\r\n            <h5>Email: ${helpTickets.selectedHelpTicket.personId.email}</h5>\r\n        </div>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/tech/support/components/viewRequestsPanel.html":
/*!********************************************************************!*\
  !*** ./src/modules/tech/support/components/viewRequestsPanel.html ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div show.bind=\"showRequestPanel\">\r\n        <div class=\"row\">\r\n            <!-- Session Select -->\r\n            <div class=\"col-lg-4\">\r\n                <div class=\"form-group topMargin leftMargin\">\r\n                    <select value.bind=\"selectedSession\" change.delegate=\"getRequests()\" id=\"session\" class=\"form-control\">\r\n                        <option repeat.for=\"session of sessions.sessionsArray\" value.bind=\"session._id\">Session\r\n                            ${session.session} - ${session.year}</option>\r\n                    </select>\r\n                </div>\r\n            </div>\r\n            <div class=\"col-lg-6 topMargin\">\r\n                <compose view=\"./Requests.html\"></compose>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/tech/support/components/viewToolbarButtons.html":
/*!*********************************************************************!*\
  !*** ./src/modules/tech/support/components/viewToolbarButtons.html ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div class=\"row\">\r\n        <div class=\"list-group-item toolbar\" id=\"toolbar\">\r\n            <span click.trigger=\"back()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n                data-placement=\"bottom\" title=\"\" data-original-title=\"Back\"><i class=\"fa fa-arrow-left fa-lg fa-border\"\r\n                    aria-hidden=\"true\"></i></span>\r\n            <span click.trigger=\"save()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n                data-placement=\"bottom\" title=\"\" data-original-title=\"Save\"><i class=\"fa fa-floppy-o fa-lg fa-border\"\r\n                    aria-hidden=\"true\"></i></span>\r\n            <span click.trigger=\"respond()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n                data-placement=\"bottom\" title=\"\" data-original-title=\"Respond\"><i class=\"fa fa-paper-plane fa-lg fa-border\"\r\n                    aria-hidden=\"true\"></i></span>\r\n            <span click.trigger=\"ownHelpTicket()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n                data-placement=\"bottom\" title=\"\" data-original-title=\"Take Ownership\"><i class=\"fa fa-child fa-lg fa-border\"\r\n                    aria-hidden=\"true\"></i></span>\r\n            <span click.trigger=\"flag()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n                data-placement=\"bottom\" title=\"\" data-original-title=\"Flag\"><i class=\"fa fa-flag fa-lg fa-border\"\r\n                    aria-hidden=\"true\"></i></span>\r\n            <span click.trigger=\"showRequestsPanel()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n                data-placement=\"bottom\" title=\"\" data-original-title=\"Requests\"><i class=\"fa fa-shopping-cart fa-lg fa-border\"\r\n                    aria-hidden=\"true\"></i></span>\r\n            <span show.bind=\"showLockMessage\" click.trigger=\"unlockIt()\" class=\"smallMarginRight\" bootstrap-tooltip\r\n                data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Unlock\"><i class=\"fa fa-unlock-alt fa-lg fa-border\"\r\n                    aria-hidden=\"true\"></i></span>\r\n            <span class=\"leftMargin largeFont\">${viewHelpTicketsHeading}</span>\r\n        </div>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/tech/support/createHelpTickets.html":
/*!*********************************************************!*\
  !*** ./src/modules/tech/support/createHelpTickets.html ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div class=\"panel panel-default\">\r\n      <div class=\"panel-body\">\r\n        <div class=\"col-lg-4\">\r\n            <compose view='./components/helpTicketType.html'></compose>\r\n            <compose view='./components/Requests.html' show.bind=\"showRequests\"></compose>\r\n        </div>\r\n        <div class=\"col-lg-8\">\r\n            <compose show.bind=\"showAdditionalInfo\" view='./components/helpTicketDetails.html'></compose>\r\n        </div>\r\n      </div>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/tech/support/support.html":
/*!***********************************************!*\
  !*** ./src/modules/tech/support/support.html ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <compose view='../../../resources/elements/submenu.html'></compose>   \r\n    <div class=\"col-lg-12\">\r\n        <router-view></router-view>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ })

}]);
//# sourceMappingURL=app-a9233e0e.2384d3fce1a12a237460.bundle.js.map