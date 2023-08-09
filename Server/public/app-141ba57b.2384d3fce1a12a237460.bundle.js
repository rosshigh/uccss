"use strict";
(self["webpackChunkuccss_old_new"] = self["webpackChunkuccss_old_new"] || []).push([["app-141ba57b"],{

/***/ "modules/admin/system/editChanges":
/*!*************************************************!*\
  !*** ./src/modules/admin/system/editChanges.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Changes: function() { return /* binding */ Changes; }
/* harmony export */ });
class Changes {}

/***/ }),

/***/ "modules/admin/system/editProduct":
/*!*************************************************!*\
  !*** ./src/modules/admin/system/editProduct.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EditProducts: function() { return /* binding */ EditProducts; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../resources/utils/dataTable */ 6847);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../config/appConfig */ 1666);
/* harmony import */ var _resources_utils_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../resources/utils/utils */ 8741);
/* harmony import */ var _resources_data_systems__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../resources/data/systems */ 4077);
/* harmony import */ var _resources_data_products__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../resources/data/products */ 8666);
/* harmony import */ var _resources_data_is4ua__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../resources/data/is4ua */ 5175);
/* harmony import */ var _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../resources/dialogs/common-dialogs */ 6545);
/* harmony import */ var _resources_utils_validation__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../resources/utils/validation */ 2824);
/* harmony import */ var _resources_data_documents__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../resources/data/documents */ 7188);
var _dec, _class;










let EditProducts = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_1__.DataTable, _resources_data_products__WEBPACK_IMPORTED_MODULE_5__.Products, _resources_utils_utils__WEBPACK_IMPORTED_MODULE_3__.Utils, _resources_data_systems__WEBPACK_IMPORTED_MODULE_4__.Systems, _resources_data_is4ua__WEBPACK_IMPORTED_MODULE_6__.is4ua, _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_7__.CommonDialogs, _resources_utils_validation__WEBPACK_IMPORTED_MODULE_8__["default"], _config_appConfig__WEBPACK_IMPORTED_MODULE_2__.AppConfig, _resources_data_documents__WEBPACK_IMPORTED_MODULE_9__.DocumentsServices), _dec(_class = class EditProducts {
  constructor(datatable, products, utils, systems, is4ua, dialog, validation, config, documents) {
    this.productSelected = false;
    this.filesSelected = "";
    this.interfaceUpdate = false;
    this.showDocumentForm = false;
    this.showDocuments = false;
    this.selectedFiles = void 0;
    this.removedFiles = new Array();
    this.tabs = [{
      id: 'Assignments'
    }, {
      id: 'Systems'
    }, {
      id: 'is4ua'
    }, {
      id: 'Documents'
    }, {
      id: 'Notes'
    }, {
      id: 'Description'
    }];
    this.tabPath = './';
    this.toolbar = [['style', ['style', 'bold', 'italic', 'underline', 'clear']], ['color', ['color']], ['font', ['strikethrough', 'superscript', 'subscript']], ['fontsize', ['fontsize']], ['layout', ['ul', 'ol', 'paragraph']], ['insert', ['link', 'table', 'hello']], ['misc', ['undo', 'redo', 'fullscreen', 'codeview']]];
    this.dataTable = datatable;
    this.dataTable.initialize(this);
    this.utils = utils;
    this.products = products;
    this.systems = systems;
    this.is4ua = is4ua;
    this.dialog = dialog;
    this.config = config;
    this.documents = documents;
    this.validation = validation;
    this.validation.initialize(this);
    this._setupValidation();
    this.systemChanges = new Array();
  }
  async attached() {
    $('[data-toggle="tooltip"]').tooltip();
    $('#loading').show();
    let responses = await Promise.all([this.products.getProductsArray('?order=name', true), this.systems.getSystemsArray('?order=sid', true), this.is4ua.loadIs4ua(), this.documents.getDocumentsCategoriesArray(), this.config.getConfig()]);
    this.dataTable.updateArray(this.products.productsArray);
    this.filteredDocumentArray = this.documents.docCatsArray;
    this.dataTable.createPageButtons(1);
    $('#loading').hide();
    this.initialLoaded = true;
  }
  async activate() {
    this.initialLoaded = false;
  }
  async refresh() {
    // this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
    $('#loading').show();
    await this.products.getProductsArray('?order=name', true);
    this.dataTable.updateArray(this.products.productsArray);
    // this.spinnerHTML = "";
    $('#loading').hide();
  }
  async new() {
    this.editIndex = -1;
    this.products.selectProduct();
    this.editSystemsString = "";
    this.newProduct = true;
    this.selectedProductSystems = new Array();
    if (this.files && this.files.length !== 0) {
      $("#uploadFiles").wrap('<form>').closest('form').get(0).reset();
      $("#uploadFiles").unwrap();
      this.files = [];
    }
    $("#editClientKey").focus();
    this.productSelected = true;
  }
  async edit(index, el) {
    this.editIndex = this.dataTable.getOriginalIndex(index);
    this.products.selectProduct(this.editIndex);
    this.newProduct = false;
    if (!this.products.selectedProduct.systems) this.products.selectedProduct.systems = new Array();
    if (!this.products.selectedProduct.clientInfo) this.products.selectedProduct.clientInfo = "";
    if (!this.products.selectedProduct.productInfo) this.products.selectedProduct.productInfo = "";
    this.camelizedProductName = this.utils.toCamelCase(this.products.selectedProduct.name);

    //Editing a product
    $("#editClientKey").focus();

    //Reset the selected row
    if (this.selectedRow) this.selectedRow.children().removeClass('info');
    this.selectedRow = $(el.target).closest('tr');
    this.selectedRow.children().addClass('info');
    this.productSelected = true;
  }
  cancel() {
    this.products.selectProduct(this.editIndex);
  }
  async save() {
    if (this.validation.validate(1)) {
      let serverResponse = await this.products.saveProduct();
      if (!serverResponse.error) {
        if (this.systemChanges.length > 0) {
          if (this.newProduct) {
            this.systemChanges.forEach(item => {
              item.productId = serverResponse._id;
            });
          }
          let response = await this.systems.saveProductChanges(this.systemChanges);
        }
        this.dataTable.updateArray(this.products.productsArray);
        this.utils.showNotification("Product " + serverResponse.name + " was updated");
      } else {
        this.utils.showNotification("There was a problem updating the product", 'error');
      }
      this._cleanUp();
    }
  }
  delete() {
    return this.dialog.showMessage("Are you sure you want to delete the product?", "Delete Product", ['Yes', 'No']).whenClosed(response => {
      if (!response.wasCancelled) {
        this.deleteProduct();
      }
    });
  }
  async deleteProduct() {
    return this.dialog.showMessage("Are you sure you want to delete this product?", "Delete Product", ['Yes', 'No']).whenClosed(response => {
      if (!response.wasCancelled) {
        this.deleteAProduct();
      }
    });
  }
  async deleteAProduct() {
    var name = this.products.selectedProduct.name;
    let serverResponse = await this.products.deleteProduct();
    if (!serverResponse.error) {
      this.dataTable.updateArray(this.products.productsArray);
      this.utils.showNotification("Product " + name + " was deleted");
    }
    this._cleanUp();
    this.productSelected = false;
  }
  _cleanUp() {
    this.newProduct = false;
    this.productSelected = false;
    this.systemChanges = new Array();
    this._cleanUpFilters();
    this.validation.makeAllValid(1);
  }
  _cleanUpFilters() {
    this.nameFilterValue = "";
    this.systemFilterValue = "";
    this.activeFilter = "";
    this.sapNameFilterValue = "";
    this.dataTable.updateArray(this.products.productsArray);
  }
  back() {
    if (this.products.isDirty().length) {
      return this.dialog.showMessage("The product has been changed. Do you want to save your changes?", "Save Changes", ['Yes', 'No']).whenClosed(response => {
        if (!response.wasCancelled) {
          this.save();
        } else {
          this.productSelected = false;
          this._cleanUp();
        }
      });
    } else {
      this.productSelected = false;
      this._cleanUp();
    }
  }
  addDocument(index) {
    if (!this.products.selectedProduct.documents) this.products.selectedProduct.documents = new Array();
    for (var i = 0; i < this.products.selectedProduct.documents.length; i++) {
      if (this.products.selectedProduct.documents[i].fileName == this.documents.selectedDocument.files[index].fileName) {
        return;
      }
    }
    var newDoc = {
      categoryCode: this.documents.selectedDocument.categoryCode,
      categoryName: this.documents.selectedDocument.name,
      fileName: this.documents.selectedDocument.files[index].fileName,
      default: true
    };
    this.products.selectedProduct.documents.push(newDoc);
  }
  chooseDocument(index, event) {
    this.documents.selectDocument(index);

    //Reset the selected row
    if (this.selectedRow) this.selectedRow.children().removeClass('info');
    this.selectedRow = $(event.target).closest('tr');
    this.selectedRow.children().addClass('info');
    this.showDocumentForm = true;
  }
  toggleDefault(index) {
    this.products.selectedProduct.documents[index].default = !this.products.selectedProduct.documents[index].default;
  }
  removeDocument(index) {
    this.products.selectedProduct.documents.splice(index, 1);
  }
  async typeChanged(index) {
    if (index >= 0) {
      this.categoryIndex = index;
      this.documents.selectCategory(index);
      await this.documents.getDocumentsArray(true, '?filter=categoryCode|eq|' + this.documents.selectedCat.code);
      this.showDocuments = true;
      this.showDocumentForm = false;
    }
  }
  _setupValidation() {
    this.validation.addRule(1, "editName", [{
      "rule": "required",
      "message": "Product name is required",
      "value": "products.selectedProduct.name"
    }, {
      "rule": "custom",
      "message": "A product with that name already exists",
      "valFunction": function (context) {
        var found = false;
        for (var i = 0; i < context.products.productsArray.length; i++) {
          if (context.products.productsArray[i].name && context.products.productsArray[i].name.toUpperCase() === context.products.selectedProduct.name.toUpperCase()) {
            if (context.products.selectedProduct._id && context.products.selectedProduct._id != context.products.productsArray[i]._id) {
              found = true;
            } else if (!context.products.selectedProduct._id) {
              found = true;
            }
          }
        }
        return !found;
      }
    }]);
  }
  async changeTab(el, index) {
    $("#productListGroup.list-group").children().removeClass('menuButtons');
    $("#productListGroup.list-group").children().css("background-color", "");
    $("#productListGroup.list-group").children().css("color", "");
    $(el.target).parent().css("background-color", this.config.SUBMENU_BACKGROUND);
    $(el.target).parent().css("color", this.config.ACTIVE_SUBMENU_COLOR);
    $(".in").removeClass('active').removeClass('in');
    $("#" + el.target.id + "Tab").addClass('in').addClass('active');
  }
  systemCustomFilter(value, item, context) {
    for (let i = 0; i < item.systems.length; i++) {
      if (item.systems[i].sid.toUpperCase().indexOf(value.toUpperCase()) > -1) return true;
    }
    return false;
  }
}) || _class);

/***/ }),

/***/ "modules/admin/system/editSession":
/*!*************************************************!*\
  !*** ./src/modules/admin/system/editSession.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EditSessions: function() { return /* binding */ EditSessions; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var aurelia_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-router */ 6433);
/* harmony import */ var _resources_utils_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../resources/utils/utils */ 8741);
/* harmony import */ var _resources_data_sessions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../resources/data/sessions */ 2073);
/* harmony import */ var _resources_utils_validation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../resources/utils/validation */ 2824);
/* harmony import */ var _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../resources/utils/dataTable */ 6847);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../config/appConfig */ 1666);
/* harmony import */ var _resources_data_config__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../resources/data/config */ 748);
/* harmony import */ var _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../resources/dialogs/common-dialogs */ 6545);
var _dec, _class;









let EditSessions = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(aurelia_router__WEBPACK_IMPORTED_MODULE_1__.Router, _resources_data_sessions__WEBPACK_IMPORTED_MODULE_3__.Sessions, _resources_utils_validation__WEBPACK_IMPORTED_MODULE_4__["default"], _resources_utils_utils__WEBPACK_IMPORTED_MODULE_2__.Utils, _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_5__.DataTable, _config_appConfig__WEBPACK_IMPORTED_MODULE_6__.AppConfig, _resources_data_config__WEBPACK_IMPORTED_MODULE_7__.Config, _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_8__.CommonDialogs), _dec(_class = class EditSessions {
  constructor(router, sessions, validation, utils, datatable, config, siteConfig, dialog) {
    this.navControl = "sessionNavButtons";
    this.showScreen = 'sessionTable';
    this.spinnerHTML = "";
    this.isChecked = true;
    this.router = router;
    this.sessions = sessions;
    this.utils = utils;
    this.validation = validation;
    this.validation.initialize(this);
    this.dataTable = datatable;
    this.dataTable.initialize(this);
    this.config = config;
    this.dialog = dialog;
    this.siteConfig = siteConfig;
    this._setupValidation();
  }
  attached() {
    this.toolTips();
  }
  async activate() {
    let responses = await Promise.all([this.sessions.getSessionsArray('?order=startDate:DSC', true), this.config.getConfig(), this.config.getSessions()]);
    this.dataTable.updateArray(this.sessions.sessionsArray, 'startDate', -1);
    this.filterOutClosed();
  }
  async refresh() {
    this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
    await this.sessions.getSessionsArray('?order=startDate', true);
    this.dataTable.updateArray(this.sessions.sessionsArray, 'startDate', -1);
    this.filterOutClosed();
    this.spinnerHTML = "";
  }
  new() {
    this.sessions.selectSession();
    this.showScreen = 'editSession';
    this.sessionSelected = true;
    this.editSystem = true;
    this.newSession = true;
    $("#editSession").focus();
    if (this.selectedRow) this.selectedRow.children().removeClass('rowSelected');
  }

  //User clicked a session to edit
  edit(index, el) {
    //Open edit form
    this.showScreen = 'editSession';
    //Save the index of the item to be edited
    this.editIndex = this.dataTable.getOriginalIndex(index);
    this.sessions.selectSession(this.editIndex);

    //Not a new session
    this.editSession = true;
    $("#editSession").focus();

    //Used to update the table appearance during navigation
    if (this.selectedRow) this.selectedRow.children().removeClass('info');
    this.selectedRow = $(el.target).closest('tr');
    this.selectedRow.children().addClass('info');
  }
  async save() {
    if (this.validation.validate(1)) {
      let serverResponse = await this.sessions.saveSession();
      if (!serverResponse.error) {
        this.dataTable.updateArray(this.sessions.sessionsArray, 'startDate', -1);
        this.utils.showNotification("Session " + this.sessions.selectedSession.session + " " + this.sessions.selectedSession.year + " was updated");
        this.showScreen = 'sessionTable';
        this.toolTips();
      }
    }
  }
  saveSortOrder(session) {
    this.sessions.setSession(session);
    let serverResponse = this.sessions.saveSession();
  }
  async refreshConfig() {
    await this.config.getSessions(true);
    this.editSessionConfig();
  }
  editSessionConfig() {
    this.editSessionConfigArray = new Array();
    this.config.SESSION_PARAMS.forEach(item => {
      this.editSessionConfigArray.push(this.utils.copyObject(item));
    });
    this.showScreen = 'editConfig';
  }
  async saveConfig() {
    if (this.editSessionConfigArray) {
      let serverResponse = await this.siteConfig.saveSessions(this.editSessionConfigArray);
      if (!serverResponse.error) {
        this.editSessionConfigArray.forEach((item, index) => {
          this.config.SESSION_PARAMS[index] = item;
        });
        this.utils.showNotification("Session configuration updated");
        this.showScreen = 'sessionTable';
      }
    }
  }
  updateStatus(index, session, el) {
    if (session.sessionStatus === "Closed") return;
    this.editIndex = this.dataTable.getOriginalIndex(index);
    this.sessions.selectSession(this.editIndex);
    switch (session.sessionStatus) {
      case "Next":
        this.editStatus = "Requests";
        break;
      case "Requests":
        this.editStatus = "Active";
        break;
      case "Active":
        this.editStatus = "Closed";
        break;
    }
    this.sessions.selectedSession.sessionStatus = this.editStatus;
    this.save();
  }
  filterOutClosed() {
    if (this.isChecked) {
      this.dataTable.filterList("Closed", {
        type: 'text',
        filter: 'sessionStatus',
        collectionProperty: 'sessionStatus',
        compare: 'not-match'
      });
    } else {
      this.dataTable.updateArray(this.sessions.sessionsArray, 'startDate', -1);
    }
    this.toolTips();
  }
  _setupValidation() {
    this.validation.addRule(1, "editName", {
      "rule": "required",
      "message": "Session name is required",
      "value": "sessions.selectedSession.session"
    });
    this.validation.addRule(1, "editYear", {
      "rule": "required",
      "message": "Session year is required",
      "value": "sessions.selectedSession.year"
    });
    this.validation.addRule(1, "editStartDate", {
      "rule": "required",
      "message": "Session start date is required",
      "value": "sessions.selectedSession.startDate"
    });
    this.validation.addRule(1, "editEndDate", {
      "rule": "required",
      "message": "Session end date is required",
      "value": "sessions.selectedSession.endDate"
    });
    this.validation.addRule(1, "editRequestsOpenDate", {
      "rule": "required",
      "message": "Session requests open date is required",
      "value": "sessions.selectedSession.requestsOpenDate"
    });
  }
  cancel() {
    this.sessions.selectSession(this.editIndex);
  }
  cancelConfig() {
    this.editSessionConfigArray = new Array();
    this.config.SESSION_PARAMS.forEach(item => {
      this.editSessionConfigArray.push(this.utils.copyObject(item));
    });
  }
  backConfig() {
    this.showScreen = 'sessionTable';
  }
  back() {
    if (this.sessions.isDirty().length) {
      return this.dialog.showMessage("The session has been changed. Do you want to save your changes?", "Save Changes", ['Yes', 'No']).whenClosed(response => {
        if (!response.wasCancelled) {
          this.save();
        } else {
          this.showScreen = 'sessionTable';
        }
      });
    } else {
      this.showScreen = 'sessionTable';
    }
  }
  toolTips() {
    // $('[data-toggle="tooltip"]').tooltip();
  }
}) || _class);

/***/ }),

/***/ "modules/admin/system/editSystem":
/*!************************************************!*\
  !*** ./src/modules/admin/system/editSystem.js ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EditSystem: function() { return /* binding */ EditSystem; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../resources/dialogs/common-dialogs */ 6545);
/* harmony import */ var _resources_utils_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../resources/utils/utils */ 8741);
/* harmony import */ var _resources_data_systems__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../resources/data/systems */ 4077);
/* harmony import */ var _resources_data_sessions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../resources/data/sessions */ 2073);
/* harmony import */ var _resources_data_products__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../resources/data/products */ 8666);
/* harmony import */ var _resources_utils_validation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../resources/utils/validation */ 2824);
/* harmony import */ var _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../resources/utils/dataTable */ 6847);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../config/appConfig */ 1666);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! moment */ 381);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_9__);
var _dec, _class;










let EditSystem = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_resources_data_systems__WEBPACK_IMPORTED_MODULE_3__.Systems, _resources_data_products__WEBPACK_IMPORTED_MODULE_5__.Products, _resources_utils_validation__WEBPACK_IMPORTED_MODULE_6__["default"], _resources_utils_utils__WEBPACK_IMPORTED_MODULE_2__.Utils, _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_7__.DataTable, _config_appConfig__WEBPACK_IMPORTED_MODULE_8__.AppConfig, _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_1__.CommonDialogs, _resources_data_sessions__WEBPACK_IMPORTED_MODULE_4__.Sessions), _dec(_class = class EditSystem {
  constructor(systems, products, validation, utils, datatable, config, dialog, sessions) {
    this.systemSelected = false;
    this.editClients = false;
    this.showChanges = false;
    this.showChangesForm = false;
    this.selectedProduct = "";
    this.dateConfig = {
      wrap: true
    };
    this.systems = systems;
    this.products = products;
    this.utils = utils;
    this.validation = validation;
    this.validation.initialize(this);
    this.dataTable = datatable;
    this.dataTable.initialize(this);
    this.config = config;
    this.dialog = dialog;
    this.sessions = sessions;
    this._setupValidation();
    this.userObj = JSON.parse(sessionStorage.getItem('user'));
  }
  async attached() {
    $('#loading').show();
    let responses = await Promise.all([this.systems.getSystemsArray('?order=sid', true), this.products.getProductsArray('?filter=active|eq|true&order=name', true), this.sessions.getSessionsArray(), this.config.getConfig(), this.config.getSessions()]);
    this.dataTable.updateArray(this.systems.systemsArray);
    this.clientInterval = this.config.CLIENT_INTERVAL;
    $('#loading').hide();
    $('[data-toggle="tooltip"]').tooltip();
    this.initialLoaded = true;
  }
  async activate() {
    this.initialLoaded = false;
  }
  async refresh() {
    $('#loading').show();
    await this.systems.getSystemsArray('?order=sid', true);
    this.dataTable.updateArray(this.systems.systemsArray);
    $('#loading').hide();
    this._cleanUpFilters();
  }
  new() {
    this.editIndex = -1;
    this.systemDetails = true;
    this.displayIndex = -1;
    this.systems.selectSystem();
    this.editStatus = true;
    // this.saveClients = false;
    $("#editSid").focus();
    this.systemSelected = true;
    this.newSystem = true;
  }
  async edit(index, el) {
    this.systemDetails = true;
    this.editIndex = this.dataTable.getOriginalIndex(index);
    let response = await this.systems.getSystem(this.editIndex);
    // this.systems.selectSystem(this.editIndex);
    if (response.error) {
      this.utils.showNotification('There was an error retrieving the system', 'error');
      return;
    }
    this.originalSystem = this.utils.copyObject(this.systems.selectedSystem);
    this.editSystem = true;
    this.systemSelected = true;
    this.newSystem = false;
    $("#editSid").focus();
    if (this.selectedRow) this.selectedRow.children().removeClass('info');
    this.selectedRow = $(el.target).closest('tr');
    this.selectedRow.children().addClass('info');
    this.showTable = false;
    setTimeout(function () {
      $('[data-toggle="tooltip"]').tooltip();
    }, 500);
  }
  async save() {
    if (this.validation.validate(1)) {
      this.systems.selectedSystem.sid = this.systems.selectedSystem.sid.toUpperCase();
      this.systems.selectedSystem.server = this.systems.selectedSystem.server.toUpperCase();
      let serverResponse = await this.systems.saveSystem();
      if (!serverResponse.error) {
        if (this.saveProduct) this.products.saveProduct();
        if (this.productsToUpdate && this.productsToUpdate.length > 0) {
          this.productsToUpdate.forEach(item => {
            this.products.selectedProductFromId(item._id);
            this.products.selectedProduct.systems = item.systems;
            this.products.saveProduct();
          });
          this.productsToUpdate = new Array();
        }
        this.utils.showNotification("System " + this.systems.selectedSystem.sid + " was updated");
        this._cleanUp();
      }
    }
  }
  async saveBackups(system) {
    this.systems.setSelectedSystem(system);
    let serverResponse = await this.systems.saveSystem();
    if (!serverResponse.error) {
      this.utils.showNotification("System " + this.systems.selectedSystem.sid + " was updated");
    }
  }
  toggleSandBox(index) {
    if (this.systems.selectedSystem.clients[index].assignments.length > 0) {
      this.utils.showNotification("The client has assignments. You must refresh it before changing it's status", 'warning');
    } else {
      this.systems.selectedSystem.clients[index].clientStatus = this.systems.selectedSystem.clients[index].clientStatus == this.config.SANDBOX_CLIENT_CODE ? this.config.UNASSIGNED_CLIENT_CODE : this.config.SANDBOX_CLIENT_CODE;
    }
  }
  updateProduct(client, index) {
    if (client.assignments.length > 1) {
      this.utils.showNotification("The client has assignments. You must refresh it before changing it's product", 'warning');
    } else {
      if (this.selectedProduct === "") {
        this.utils.showNotification("Select a product first", 'warning');
      } else {
        this.systems.selectedSystem.clients[index].productId = this.selectedProduct;
        this.saveProduct = true;
        this.products.selectedProductFromId(this.selectedProduct);
        if (this.products.selectedProduct.systems && this.products.selectedProduct.systems.length > 0) {
          this.products.selectedProduct.systems.forEach(item => {
            if (item.sid === this.systems.selectedSystem.sid) this.saveProduct = false;
          });
        } else {
          this.saveProduct = true;
        }
        if (this.saveProduct) {
          this.products.selectedProduct.systems.push({
            systemId: this.systems.selectedSystem._id,
            sid: this.systems.selectedSystem.sid
          });
        }
      }
    }
  }
  updateAllProducts() {
    if (this.selectedProduct === "") {
      this.utils.showNotification("Select a product first", 'warning');
    } else {
      this.dialog.showMessage("This will only update the products for clients that have no assignments. Continue?", "Refresh Clients", ['Yes', 'No']).whenClosed(response => {
        if (!response.wasCancelled) {
          this.systems.selectedSystem.clients.forEach(item => {
            if (item.assignments.length === 0) {
              item.productId = this.selectedProduct;
            }
          });
          this.saveProduct = true;
          this.products.selectedProductFromId(this.selectedProduct);
          if (this.products.selectedProduct.systems && this.products.selectedProduct.systems.length > 0) {
            this.products.selectedProduct.systems.forEach(item => {
              if (item.sid === this.systems.selectedSystem.sid) this.saveProduct = false;
            });
          } else {
            this.saveProduct = true;
          }
          if (this.saveProduct) {
            this.products.selectedProduct.systems.push({
              systemId: this.systems.selectedSystem._id,
              sid: this.systems.selectedSystem.sid
            });
          }
        }
      });
    }
  }
  refreshClient(index) {
    this.dialog.showMessage("This will return the client to the initial state.  You must save the system for this to take effect. Do you want to continue?", "Refresh Clients", ['Yes', 'No']).whenClosed(response => {
      if (!response.wasCancelled) {
        this.systems.selectedSystem.clients[index].clientStatus = this.config.UNASSIGNED_REQUEST_CODE;
        this.systems.selectedSystem.clients[index].assignments = new Array();
        this.systems.selectedSystem.clients[index].idsAvailable = this.systems.selectedSystem.idsAvailable;
      }
    });
  }
  delete() {
    this.dialog.showMessage("Are you sure you want to delete the system?", "Delete System", ['Yes', 'No']).whenClosed(response => {
      if (!response.wasCancelled) {
        this.deleteSystem();
      }
    });
  }
  async deleteSystem() {
    var name = this.systems.selectedSystem.sid;
    let serverResponse = await this.systems.deleteSystem();
    if (!serverResponse.error) {
      this.dataTable.updateArray(this.systems.systemsArray);
      this.utils.showNotification("System " + name + " was deleted");
    }
    this._cleanUp();
    this.systemSelected = false;
  }
  editClientsButton() {
    this.editClients = !this.editClients;
  }
  generateClients() {
    if (this.selectedProduct === "") {
      this.dialog.showMessage("You must select a product.", "Select a Product", ['OK']).whenClosed(response => {
        return;
      });
    }
    if (this.idsAvailable === "0") {
      this.dialog.showMessage("You must enter the number of IDs available.", "Enter IDS Available", ['OK']).whenClosed(response => {
        return;
      });
    }
    if (!this.editFirstClient || !this.editLastClient || this.editFirstClient.length != 3 || this.editLastClient.length != 3) {
      this.dialog.showMessage("Clients must have three digits", "Invalid Client Number", ['OK']).whenClosed(response => {
        return;
      });
    }
    var start = parseInt(this.editFirstClient);
    var end = parseInt(this.editLastClient);
    if (end < start) {
      this.dialog.showMessage("The first client number must be less than the last client number.", "Invalid Client Number", ['OK']).whenClosed(response => {
        return;
      });
    }
    this.saveProduct = true;
    var result = this.systems.generateClients(start, end, this.editClientStatus, this.products.selectedProduct, parseInt(this.clientInterval), this.idsAvailable);
    if (result.error) {
      this.utils.showNotification(result.error, 'error');
    } else {
      this.products.selectedProductFromId(this.selectedProduct);
      if (this.products.selectedProduct.systems && this.products.selectedProduct.systems.length > 0) {
        this.products.selectedProduct.systems.forEach(item => {
          if (item.sid === this.systems.selectedSystem.sid) this.saveProduct = false;
        });
      } else {
        this.saveProduct = true;
      }
      if (this.saveProduct) {
        this.products.selectedProduct.systems.push({
          systemId: this.systems.selectedSystem._id,
          sid: this.systems.selectedSystem.sid
        });
      }
    }
  }
  refreshClients() {
    if (!this.systems.selectedSystem.clients || this.systems.selectedSystem.clients.length === 0) {
      this.dialog.showMessage("The system doesn't have clients to refresh", "No Clients", ['OK']).whenClosed(response => {
        return;
      });
    }
    this.dialog.showMessage("This will return clients to an initial state.  You must save the system for this to take effect. Do you want to continue?", "Refresh Clients", ['Yes', 'No']).whenClosed(response => {
      if (!response.wasCancelled) {
        this.systems.refreshClients(this.config.UNASSIGNED_REQUEST_CODE, this.products.productsArray);
      }
    });
  }
  refreshTheClients() {
    this.systems.refreshClients(this.config.UNASSIGNED_REQUEST_CODE, this.products.productsArray);
    console.log(this.systems.selectedSystem);
  }
  deleteClients() {
    this.dialog.showMessage("Are you sure about this, this action cannot be undone?", "Delete Clients", ['Yes', 'No']).whenClosed(response => {
      if (!response.wasCancelled) {
        this.deleteAllClients();
      }
    });
  }
  deleteAllClients() {
    var id = this.systems.selectedSystem._id;
    this.productsToUpdate = new Array();
    var processedProducts = new Array();
    this.systems.selectedSystem.clients.forEach(item => {
      if (item.productId) {
        if (processedProducts.indexOf(item.productId) === -1) {
          processedProducts.push(item.productId);
          this.products.selectedProductFromId(item.productId);
          if (this.products.selectedProduct._id) {
            this.products.selectedProduct.systems.forEach((system, index) => {
              if (system.systemId === id) {
                this.products.selectedProduct.systems.splice(index, 1);
                this.productsToUpdate.push(this.products.selectedProduct);
              }
            });
          }
        }
      }
    });
    this.systems.deleteAllClients();
    this.utils.showNotification("You must save the system to complete the deletion", 'warning');
  }
  editAClient(client, index, el) {
    this.selectedClientIndex = index;
    this.selectedClient = client;
    this.systems.selectClient(index);
    if (this.selectedRow) this.selectedRow.children().removeClass('info');
    this.selectedRow = $(el.target).closest('tr');
    this.selectedRow.children().addClass('info');
    this.interfaceUpdate = true;
  }
  deleteClient(index) {
    if (!this._okToDeleteClient(this.systems.selectedSystem.clients[index])) {
      this.utils.showNotification("The client either has assignments or the status doesn't allow deletion. You must refresh it before deleting it.", 'warning');
    } else {
      this.dialog.showMessage("Are you sure about this, this action cannot be undone?", "Delete Clients", ['Yes', 'No']).whenClosed(response => {
        if (!response.wasCancelled) {
          var productId = this.systems.selectedSystem.clients[index].productId;
          var id = this.systems.selectedSystem._id;
          var noUpdates = false;
          this.productsToUpdate = new Array();
          if (this.systems.selectedSystem.clients.length > 0) {
            for (let i = 0; i < this.systems.selectedSystem.clients.length; i++) {
              if (this.systems.selectedSystem.clients[i].productId === productId) {
                noUpdates = true;
                break;
              }
            }
          }
          this.systems.selectedSystem.clients.splice(index, 1);
          if (!noUpdates) {
            this.products.selectedProductFromId(productId);
            this.products.selectedProduct.systems.forEach((system, index) => {
              if (system.systemId === id) {
                this.products.selectedProduct.systems.splice(index, 1);
                this.productsToUpdate.push(this.products.selectedProduct);
              }
            });
          }
        }
        this.utils.showNotification("You must save the system to complete the deletion", 'warning');
      });
    }
  }
  _okToDeleteClient(client) {
    if (client.assignments.length > 0) return false;
    let status = client.clientStatus;
    for (var i = 0; i < this.config.CLIENT_STATUSES.length; i++) {
      if (this.config.CLIENT_STATUSES[i].code == status && this.config.CLIENT_STATUSES[i].OKToDelete) {
        return true;
      }
    }
    return false;
  }
  async deleteC() {
    this.systems.deleteClient();
    this.utils.showNotification("The client was deleted but you must save the system to complete the deltion");
  }
  selectClient(client, index) {
    this.selectedClient = this.utils.copyObject(client);
    this.clientSelected = true;
    this.selectedClientIndex = index;
  }
  backClient() {
    this.clientSelected = false;
  }
  saveClient() {
    this.systems.selectedSystem.clients[this.selectedClientIndex] = this.selectedClient;
    this.products.selectedProductFromId(this.selectedClient.productId);
    if (this.products.selectedProduct.systems && this.products.selectedProduct.systems.length > 0) {
      this.products.selectedProduct.systems.forEach(item => {
        if (item.sid === this.systems.selectedSystem.sid) this.saveProduct = false;
      });
    } else {
      this.saveProduct = true;
    }
    if (this.saveProduct) {
      this.products.selectedProduct.systems.push({
        systemId: this.systems.selectedSystem._id,
        sid: this.systems.selectedSystem.sid
      });
    }
    this.clientSelected = false;
    this.utils.showNotification("You must save the system for any changes to take effect.");
  }
  _cleanUp() {
    this.systemSelected = false;
    this.newSystem = false;
    this.clientSelected = false;
    this.editClients = false;
    this.validation.makeAllValid(1);
    this.systemDetails = true;
  }
  _cleanUpFilters() {
    this.sidFilterValue = "";
    this.descriptionFilterValue = "";
    this.serverFilterValue = "";
    this.activeFilter = "";
    this.dataTable.updateArray(this.systems.systemsArray);
  }
  back() {
    if (this.systems.isDirty(this.originalSystem).length) {
      this.dialog.showMessage("The system has been changed. Do you want to save your changes?", "Save Changes", ['Yes', 'No']).whenClosed(response => {
        if (!response.wasCancelled) {
          this.save();
        } else {
          this._cleanUp();
        }
      });
    } else {
      this._cleanUp();
    }
  }
  cancel() {
    this.systems.selectSystem(this.editIndex);
  }
  _setupValidation() {
    this.validation.addRule(1, "editSid", [{
      "rule": "required",
      "message": "SID is required",
      "value": "systems.selectedSystem.sid"
    }, {
      "rule": "custom",
      "message": "A system with that SID and description already exists",
      "valFunction": function (context) {
        if (!context.systems.selectedSystem._id) {
          var found = false;
          for (var i = 0; i < context.systems.systemsArray.length; i++) {
            if (context.systems.systemsArray[i].sid.toUpperCase() === context.systems.selectedSystem.sid.toUpperCase() && context.systems.systemsArray[i].description.toUpperCase() === context.systems.selectedSystem.description.toUpperCase()) {
              if (context.systems.selectedSystem._id && context.systems.selectedSystem._id != context.systems.systemsArray[i]._id) {
                found = true;
              } else if (!context.systems.selectedSystem._id) {
                found = true;
              }
            }
          }
          return !found;
        }
        return true;
      }
    }], true);
    this.validation.addRule(1, "editDesc", [{
      "rule": "required",
      "message": "Description is required",
      "value": "systems.selectedSystem.description"
    }]);
    this.validation.addRule(1, "editInst", [{
      "rule": "required",
      "message": "Instance is required",
      "value": "systems.selectedSystem.instance"
    }]);
    this.validation.addRule(2, "editCategoryName", [{
      "rule": "required",
      "message": "Name is required",
      "value": "systems.selectedChangeCategory.category"
    }]);
  }
  selectProduct() {
    this.products.selectedProductFromId(this.selectedProduct);
    if (this.products.selectedProduct) this.idsAvailable = this.products.selectedProduct.idsAvailable ? this.products.selectedProduct.idsAvailable : 0;
  }
  async assignmentDetails() {
    await this.systems.getAssignmentDetails(this.systems.selectedSystem._id);
    this.systemDetails = false;
  }
  backAssignmentDetails() {
    this.systemDetails = true;
  }
  sortOnFaculty(el) {
    this.facultySort = this.facultySort ? this.facultySort * -1 : 1;
    this.systems.assignmentDetailsArray = this.systems.assignmentDetailsArray.sort((a, b) => {
      return (a.lastName < b.lastName ? -1 : 1) * this.facultySort;
    });
    $(".sortable").next().replaceWith('<i class="fa fa-sort"></i>');
    if (this.facultySort < 0) {
      var icon = '<i class="fa fa-sort-amount-desc" aria-hidden="true"></i>';
    } else {
      var icon = '<i class="fa fa-sort-amount-asc" aria-hidden="true"></i>';
    }
    $(el.target).next().replaceWith(icon);
  }
  sortOnClient(el) {
    this.clientSort = this.clientSort ? this.clientSort * -1 : 1;
    this.systems.assignmentDetailsArray = this.systems.assignmentDetailsArray.sort((a, b) => {
      return (a.client < b.client ? -1 : 1) * this.clientSort;
    });
    $(".sortable").next().replaceWith('<i class="fa fa-sort"></i>');
    if (this.clientSort < 0) {
      var icon = '<i class="fa fa-sort-amount-desc" aria-hidden="true"></i>';
    } else {
      var icon = '<i class="fa fa-sort-amount-asc" aria-hidden="true"></i>';
    }
    $(el.target).next().replaceWith(icon);
  }
  sortOnInst(el) {
    this.instSort = this.instSort ? this.instSort * -1 : 1;
    this.systems.assignmentDetailsArray = this.systems.assignmentDetailsArray.sort((a, b) => {
      return (a.institution < b.institution ? -1 : 1) * this.instSort;
    });
    $(".sortable").next().replaceWith('<i class="fa fa-sort"></i>');
    if (this.instSort < 0) {
      var icon = '<i class="fa fa-sort-amount-desc" aria-hidden="true"></i>';
    } else {
      var icon = '<i class="fa fa-sort-amount-asc" aria-hidden="true"></i>';
    }
    $(el.target).next().replaceWith(icon);
  }
  downloadExcel() {
    var exportArray = this.systems.assignmentDetailsArray;
    var htmlContent = "<table><tr><th>Faculty</th><th>Institution</th><th>Client</th><th>Student IDs</th><th>FacultyIDs</th></tr>";
    exportArray.forEach(item => {
      var line = "<tr><td>" + item.firstName + " " + item.lastName + "</td><td>" + item.institution + "</td><td>" + item.client + "</td><td>" + item.studentIds + "</td><td>" + item.facultyIds + "</td>";
      line += "</tr>";
      htmlContent += line;
    });
    htmlContent += "</table>";
    window.open('data:application/vnd.ms-excel,' + htmlContent);
  }
  async openChangeMgt(system) {
    this.systems.setSelectedSystem(system);
    await this.systems.getChangeArray('?filter=systemId|eq|' + this.systems.selectedSystem._id + '&order=dateCreated:ASC', true);
    this.dataTable.updateArray(this.systems.changeArray);
    this.showChangesForm = false;
    this.showChanges = true;
  }
  async showChangeForm(index) {
    await this.systems.getChangeCategoryArray();
    this.systems.selectChange(index);
    this.showChangesForm = true;
  }
  openEditCatForm(newOrEdit) {
    if (newOrEdit === 'new') {
      this.systems.selectChangeCategory();
      this.categoryDescription = "";
      this.showCategoryForm = true;
      this.editCategoryFlag = false;
    } else {
      this.systems.selectChangeCategoryByCategory(this.systems.selectedChange.category);
      this.showCategoryForm = true;
      this.editCategoryFlag = true;
    }
  }
  async saveCategory() {
    if (this.validation.validate(2)) {
      let serverResponse = await this.systems.saveChangeCategory();
      if (!serverResponse.error) {
        this.utils.showNotification("The category was saved");
      }
      this.showCategoryForm = false;
    }
  }
  cancelEditCategory() {
    this.showCategoryForm = false;
  }
  deleteCat() {
    if (this.systems.categortInUse()) {
      return this.dialog.showMessage("You can't delete that category because there are exisitng changes that use it.", "Can't Delete Category", ['OK']).then(response => {});
    } else {
      return this.dialog.showMessage("Are you sure you want to delete the category?", "Delete Category", ['Yes', 'No']).whenClosed(response => {
        if (!response.wasCancelled) {
          this.deleteCategory();
        }
      });
    }
  }
  async deleteCategory() {
    let serverResponse = await this.systems.deleteChangeCategory();
    if (!serverResponse.error) {
      this.utils.showNotification("The category was deleted");
    }
  }
  backFromChangeForm() {
    this.showChangesForm = false;
    this.showChanges = true;
  }
  backFromChangeTable() {
    this.dataTable.updateArray(this.systems.systemsArray);
    this.showChanges = false;
    this.systemSelected = false;
  }
  async saveChange() {
    this.systems.selectedChange.systemId = this.systems.selectedSystem._id;
    this.systems.selectedChange.personId = this.userObj._id;
    await this.systems.saveChange();
    this.showChangesForm = false;
    this.showChanges = true;
  }
  cancelChange() {
    this.systems.selectChange();
  }
  async deleteChange() {
    await this.systems.deleteChange();
    this.showChangesForm = false;
    this.showChanges = true;
  }
}) || _class);

/***/ }),

/***/ "modules/admin/system/system":
/*!********************************************!*\
  !*** ./src/modules/admin/system/system.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EditSystem: function() { return /* binding */ EditSystem; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var aurelia_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-router */ 6433);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../config/appConfig */ 1666);
var _dec, _class;



let EditSystem = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(aurelia_router__WEBPACK_IMPORTED_MODULE_1__.Router, _config_appConfig__WEBPACK_IMPORTED_MODULE_2__.AppConfig), _dec(_class = class EditSystem {
  constructor(router, config) {
    this.title = "System";
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
      route: ['', 'editSessions'],
      moduleId: './editSession',
      settings: {
        auth: true,
        roles: []
      },
      nav: true,
      name: 'editSessions',
      title: 'Sessions'
    }, {
      route: 'editSystems',
      moduleId: './editSystem',
      settings: {
        auth: true,
        roles: []
      },
      nav: true,
      name: 'editSystems',
      title: 'Systems'
    }, {
      route: 'editProduct',
      moduleId: './editProduct',
      settings: {
        auth: true,
        roles: []
      },
      nav: true,
      name: 'editProduct',
      title: 'Products'
    }, {
      route: 'changes',
      moduleId: './editChanges',
      settings: {
        auth: true,
        roles: []
      },
      nav: false,
      name: 'editChanges',
      title: 'Changes'
    }]);
    this.router = router;
  }
}) || _class);

/***/ }),

/***/ "modules/admin/system/components/Assignments.html":
/*!**************************************************************!*\
  !*** ./src/modules/admin/system/components/Assignments.html ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n  <div class=\"col-lg-12\">\r\n    <div class=\"col-lg-6\">\r\n\r\n      <div class=\"form-group\">\r\n        <label for=\"editStudentId\" class=\"control-label hideOnPhone\">Student ID Prefix</label>\r\n        <input value.bind=\"products.selectedProduct.defaultStudentIdPrefix\" id=\"editStudentId\" class=\"form-control \"\r\n          placeholder=\"Student ID Prefix\" type=\"text\" />\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <label for=\"editFacultyId\" class=\"control-label\">Faculty ID Prefix</label>\r\n        <input value.bind=\"products.selectedProduct.defaultFacultyIdPrefix\" id=\"editFacultyId\" class=\"form-control \"\r\n          placeholder=\"Faculty ID Prefix\" type=\"text\" />\r\n      </div>\r\n      <div class=\"form-group \">\r\n        <label for=\"editIdsAvailable \" class=\"control-label \">Number of IDs</label>\r\n        <input value.bind=\"products.selectedProduct.idsAvailable \" id=\"editIdsAvailable \" class=\"form-control\"\r\n          placeholder=\"Number of IDs \" type=\"text \" />\r\n      </div>\r\n      <div class=\"form-group \">\r\n        <label for=\"editFirstUsableID \" class=\"control-label \">First usable ID</label>\r\n        <input value.bind=\"products.selectedProduct.firstAllowableId \" id=\"editFirstUsableID \" class=\"form-control \"\r\n          placeholder=\"First Usable ID \" type=\"number\" />\r\n      </div>\r\n      <div class=\"form=group\">\r\n        <h4>Systems assigned to this product: ${products.selectedProduct.systems | systemList}</h4>\r\n        <h6>To change the systems assigned to a product, create clients on the Systems page</h6>\r\n      </div>\r\n\r\n    </div>\r\n\r\n    <div class=\"col-lg-5 col-sm-offset-1\">\r\n      <div class=\"form-group\">\r\n        <label for=\"editStudentPassword\" class=\"control-label\">Student Password</label>\r\n        <input value.bind=\"products.selectedProduct.defaultStudentPassword\" id=\"editStudentPassword\"\r\n          class=\"form-control \" placeholder=\"Student Password\" type=\"text\" />\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <label for=\"editFacultyPassword\" class=\"control-label\">Faculty Password</label>\r\n        <input value.bind=\"products.selectedProduct.defaultFacultyPassword\" id=\"editFacultyPassword\"\r\n          class=\"form-control \" placeholder=\"Faculty Password\" type=\"text\" />\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <label class=\"control-label hideOnPhone\">Clients</label>\r\n        <div class=\"checkbox\">\r\n          <label class=\"pull-left\">\r\n            <input id=\"clientRelevant\" checked.bind=\"products.selectedProduct.clientRelevant\" type=\"checkbox\"> Not\r\n            client relevant\r\n          </label>\r\n        </div>\r\n      </div>\r\n      <div class=\"form-group \">\r\n        <label for=\"editLastUsableID \" class=\"control-label \">Last usable ID</label>\r\n        <input value.bind=\"products.selectedProduct.lastAllowableId \" id=\"editLastUsableID \" class=\"form-control \"\r\n          placeholder=\"Last Usable ID \" type=\"number\" />\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"col-lg-12\">\r\n    <label class=\"control-label \">Assignment Comments</label>\r\n    <editor value.bind=\"products.selectedProduct.productInfo\" toolbar.bind=\"toolbar\" height=\"250\"></editor>\r\n  </div>\r\n  <div class=\"col-lg-12\">\r\n    <label class=\"control-label \">APJ Comments</label>\r\n    <editor value.bind=\"products.selectedProduct.productInfoApj\" toolbar.bind=\"toolbar\" height=\"250\"></editor>\r\n  </div>\r\n\r\n  </div>\r\n</template>\r\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/system/components/Description.html":
/*!**************************************************************!*\
  !*** ./src/modules/admin/system/components/Description.html ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div class=\"col-lg-12\">\r\n        <div class=\"form-group \">\r\n\t\t\t<label>Product Information for Customers</label>\r\n             <editor value.bind=\"products.selectedProduct.productDescription\" toolbar.bind=\"toolbar\" height=\"250\"></editor>\r\n        </div>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/system/components/Documents.html":
/*!************************************************************!*\
  !*** ./src/modules/admin/system/components/Documents.html ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div class=\"panel panel-default\">\r\n        <div class=\"panel-body\">\r\n            <div class=\"row\">\r\n                <div class=\"col-lg-4\">\r\n                    <div show.bind=\"!categoryForm\">\r\n                        <label>Available Categories</label>\r\n                        <div class=\"well well2 overFlow\" style=\"height:400px;\">\r\n                            <input class=\"form-control\" value.bind=\"filter\" input.trigger=\"filterList()\" placeholder=\"Filter Categories\" />\r\n                            <ul class=\"list-group\">\r\n                                <button click.trigger=\"typeChanged($index)\" type=\"button\" repeat.for=\"type of filteredDocumentArray\" id=\"${type.code}\" class=\"list-group-item\">${type.description}</button>\r\n                            </ul>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n\r\n                <div show.bind=\"showDocuments\" class=\"col-lg-8\" style='padding:15px;'>\r\n                    <div show.bind=\"showDocumentForm\">\r\n                        <compose view=\"./documentForm.html\"></compose>\r\n                    </div>\r\n                    <compose show.bind=\"!showDocumentForm\" view=\"./documentsTable.html\"></compose>\r\n                </div>\r\n            </div>\r\n        </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/system/components/Notes.html":
/*!********************************************************!*\
  !*** ./src/modules/admin/system/components/Notes.html ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div class=\"col-lg-12\">\r\n        <div class=\"form-group \">\r\n            <label>Internal Comments</label>\r\n             <editor value.bind=\"products.selectedProduct.clientInfo\" toolbar.bind=\"toolbar\" height=\"250\"></editor>\r\n        </div>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/system/components/Systems.html":
/*!**********************************************************!*\
  !*** ./src/modules/admin/system/components/Systems.html ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\n     <div class=\"fluid-container\">\n         <h5 class=\"bottomMargin\">To assign systems to products, you should use the Systems client generation process.</h5>\n        <add-systems systemstring.two-way=\"editSystemsString\" systemchanges.two-way=\"systemChanges\" systemsarray.bind=\"systems.systemsArray\"  filteredsystemsarray.bind=\"systems.systemsArray\" selectedproduct.two-way=\"products.selectedProduct\"></add-systems>\n    </div>\n</template>\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/system/components/changesForm.html":
/*!**************************************************************!*\
  !*** ./src/modules/admin/system/components/changesForm.html ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div class=\"bottomMargin list-group-item leftMargin rightMargin\">\r\n        <span click.delegate=\"backFromChangeForm()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n            title=\"\" data-original-title=\"Back\"><i class=\"fa fa-arrow-left fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n        <span click.delegate=\"saveChange()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n            title=\"\" data-original-title=\"Save\"><i class=\"fa fa-floppy-o fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n        <span click.delegate=\"cancelChange()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n            title=\"\" data-original-title=\"Cancel Changes\"><i class=\"fa fa-ban fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n        <span show.bind=\"!newItem\" click.delegate=\"deleteChange()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n            data-placement=\"bottom\" title=\"\" data-original-title=\"Delete\"><i class=\"fa fa-trash fa-lg fa-border text-danger\"\r\n                aria-hidden=\"true\"></i></span>\r\n    </div>\r\n\r\n    <div class=\"col-lg-offset-2\">\r\n        <h2>${systems.selectedSystem.sid}</h2>\r\n    </div>\r\n    <form class=\"form-horizontal topMargin\">\r\n        <div class=\"row\">\r\n            <div class=\"col-sm-12 col-lg-12\">\r\n                <div class=\"form-group\">\r\n                    <label for=\"editCategory\" class=\"col-sm-2 control-label hideOnPhone\">Type</label>\r\n                    <div class=\"col-sm-8\">\r\n                        <select value.bind=\"systems.selectedChange.category\" id=\"editCategory\" class=\"form-control\">\r\n                            <option value=\"\">Select the change category</option>\r\n                            <option repeat.for=\"type of systems.changeCategoryArray\" model.bind=\"type.category\">${type.category}</option>\r\n                        </select>\r\n                        <a class=\"btn btn-link\" click.trigger=\"openEditCatForm('new')\" aria-hidden=\"true\">(Add a\r\n                            Category)</a>\r\n                        <a class=\"btn btn-link\" disable.bind=\"systems.selectedChange.category == ''\"\r\n                            click.trigger=\"openEditCatForm('edit')\" aria-hidden=\"true\">(Edit this Category)</a>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div show.bind=\"showCategoryForm\" class=\"row\">\r\n            <div class=\"panel panel-default col-lg-8 col-lg-offset-2\" style=\"background-color:ghostwhite;\">\r\n                <div class=\"panel-body\">\r\n                    <div class=\"list-group-item bottomMargin col-sm-12 topMargin\">\r\n                        <span click.delegate=\"saveCategory()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n                            data-placement=\"bottom\" title=\"\" data-original-title=\"Save\"><i class=\"fa fa-floppy-o fa-lg fa-border\"\r\n                                aria-hidden=\"true\"></i></span>\r\n                        <span click.delegate=\"cancelEditCategory()\" class=\"smallMarginRight\" bootstrap-tooltip\r\n                            data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Cancel Changes\"><i\r\n                                class=\"fa fa-ban fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n                        <span show.bind=\" editCategoryFlag\" click.delegate=\"deleteCat()\" class=\"smallMarginRight\"\r\n                            bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n                            data-original-title=\"Delete\"><i class=\"fa fa-trash fa-lg fa-border text-danger\" aria-hidden=\"true\"></i></span>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-sm-12 col-lg-12\">\r\n                            <div class=\"form-group\">\r\n                                <label for=\"editTitle\" class=\"col-sm-2 control-label hideOnPhone\">Title</label>\r\n                                <div class=\"col-sm-8\">\r\n                                    <input value.bind=\"systems.selectedChangeCategory.category\" id=\"editCategoryName\"\r\n                                        class=\"form-control \" placeholder=\"Name\" type=\"text\" />\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-sm-12 col-lg-12\">\r\n                            <div class=\"form-group\">\r\n                                <label for=\"editCategory\" class=\"col-sm-2 control-label hideOnPhone\">Description</label>\r\n                                <div class=\"col-sm-8\">\r\n                                    <editor value.bind=\"systems.selectedChangeCategory.categoryDescription\"\r\n                                        toolbar.bind=\"toolbar\" height=\"250\"></editor>\r\n\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"row\">\r\n            <div class=\"col-sm-12 col-lg-12\">\r\n                <div class=\"form-group\">\r\n                    <label for=\"editCategory\" class=\"col-sm-2 control-label hideOnPhone\">Change</label>\r\n                    <div class=\"col-sm-8\">\r\n                        <editor value.bind=\"systems.selectedChange.content\" toolbar.bind=\"toolbar\" height=\"250\"></editor>    \r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </form>\r\n\r\n\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/system/components/changesTable.html":
/*!***************************************************************!*\
  !*** ./src/modules/admin/system/components/changesTable.html ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div class=\"bottomMargin list-group-item leftMargin rightMargin\">\r\n        <span click.delegate=\"backFromChangeTable()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n            data-placement=\"bottom\" title=\"\" data-original-title=\"Back\"><i class=\"fa fa-arrow-left fa-lg fa-border\"\r\n                aria-hidden=\"true\"></i></span>\r\n        <span click.delegate=\"showChangeForm()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n            data-placement=\"bottom\" title=\"\" data-original-title=\"New Change\"><i class=\"fa fa-plus fa-lg fa-border\"\r\n                aria-hidden=\"true\"></i></span>\r\n    </div>\r\n    <div class=\"container\">\r\n        <div>\r\n            <h2>System: ${systems.selectedSystem.sid}</h2>\r\n        </div>\r\n        <div show.bind=\"dataTable.displayArray && dataTable.displayArray.length\" class='col-lg-10'>\r\n            <div id=\"no-more-tables\">\r\n                <table id=\"changeTable\" class=\"table table-striped table-hover cf\">\r\n                    <thead class=\"cf\">\r\n                        <tr colspan='5'>\r\n                            <compose view=\"../../../../resources/elements/table-navigation-bar.html\"></compose>\r\n                        </tr>\r\n                        <tr>\r\n                            <td colspan='5'>\r\n                                <span click.delegate=\"refreshChanges()\" class=\"smallMarginRight\" bootstrap-tooltip\r\n                                    data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Refresh\"><i\r\n                                        class=\"fa fa-refresh\" aria-hidden=\"true\"></i></span>\r\n                                <span click.delegate=\"showChangeForm()\" class=\"smallMarginRight\" bootstrap-tooltip\r\n                                    data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"New\"><i\r\n                                        class=\"fa fa-plus\" aria-hidden=\"true\"></i></span>\r\n                                <span click.delegate=\"_cleanUpChangeFilters()\" class=\"smallMarginRight\"\r\n                                    bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n                                    data-original-title=\"Clear Filters\"><i class=\"fa fa-filter\" aria-hidden=\"true\"></i></span>\r\n                            </td>\r\n                        </tr>\r\n                        <tr>\r\n                            <th>Date</th>\r\n                            <th>Category</th>\r\n                            <th>Person</th>\r\n                        </tr>\r\n                        <tr>\r\n                            <th></th>\r\n                            <th></th>\r\n                            <th></th>\r\n                        </tr>\r\n                    </thead>\r\n                    <tbody>\r\n                        <tr repeat.for=\"change of dataTable.displayArray\">\r\n                            <td>${change.dateCreated | dateFormat}</td>\r\n                            <td>${change.category}</td>\r\n                            <td>${change.personId.fullName}</td>\r\n                        </tr>\r\n                    </tbody>\r\n                </table>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/system/components/documentForm.html":
/*!***************************************************************!*\
  !*** ./src/modules/admin/system/components/documentForm.html ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div id=\"no-more-tables\">\r\n        <table class=\"table table-striped table-hover cf\">\r\n            <thead class=\"cf\">\r\n                <tr>\r\n                    <th>Select</th>\r\n                    <th>Name</th>\r\n                    <th>Version</th>\r\n                    <th>Date Uploaded</th>\r\n                    <th>Status</th>\r\n                </tr>\r\n            </thead>\r\n            <tbody>\r\n                <tr repeat.for=\"item of documents.selectedDocument.files\">\r\n                    <td click.trigger=\"addDocument($index)\"><i class=\"fa fa-plus\" aria-hidden=\"true\"></i></td>\r\n                    <td data-title=\"Name\"><a target=\"_blank\" href=\"${config.DOCUMENT_FILE_DOWNLOAD_URL}/${documents.selectedDocument.categoryCode}/${documents.selectedDocument.name}/${item.fileName}\">${item.originalFilename}</a></td>\r\n                    <td data-title=\"Version\">${item.version}</td>\r\n                    <td data-title=\"Date Uploaded\">${item.dateUploaded | dateFormat:config.DATE_FORMAT_TABLE}</td>\r\n                    <td data-title=\"Active\"  innerhtml.bind='item.active | checkBox'></td>\r\n                </tr>\r\n            </tbody>\r\n        </table>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/system/components/documentsTable.html":
/*!*****************************************************************!*\
  !*** ./src/modules/admin/system/components/documentsTable.html ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div class='row'>\r\n        <div class='col-lg-10 col-lg-offset-1 bottomMargin'>\r\n            <div id=\"no-more-tables\">\r\n                <table class=\"table table-striped table-hover cf\">\r\n                    <thead class=\"cf\">\r\n                        <tr>\r\n                            <th>Name </th>\r\n                            <th>Description</th>\r\n                            <th>Date Created</th>\r\n                        </tr>\r\n                    </thead>\r\n                    <tbody>\r\n                        <tr click.trigger=\"chooseDocument($index, $event)\" repeat.for=\"item of documents.documentsArray\">\r\n                            <td data-title=\"name\">${item.name}</td>\r\n                            <td data-title=\"description\">${item.description}</td>\r\n                            <td data-title=\"createdDate\">${item.createdDate | dateFormat:config.DATE_FORMAT_TABLE}</td>\r\n                        </tr>\r\n                    </tbody>\r\n                </table>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/system/components/edit-client-form.html":
/*!*******************************************************************!*\
  !*** ./src/modules/admin/system/components/edit-client-form.html ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t<div id=\"home\" class=\"tab-pane fade active in\">\r\n\t\t<div class=\"bottomMargin topMargin list-group-item leftMargin rightMargin\">\r\n\t\t\t<span click.delegate=\"backClient()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n\t\t\t data-original-title=\"Back\"><i class=\"fa fa-arrow-left fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n\t\t\t<span click.delegate=\"saveClient()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n\t\t\t data-original-title=\"Save\"><i class=\"fa fa-floppy-o fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n\t\t</div>\r\n\r\n\t\t<fieldset>\r\n\t\t\t<div class=\"col-lg-12\">\r\n\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t<label for=\"client\" class=\"col-lg-2 control-label topMargin\">Client</label>\r\n\t\t\t\t\t<div class=\"col-lg-10\">\r\n\t\t\t\t\t\t<input disabled.bind=\"selectedClient.assignments.length > 0\" value.bind=\"selectedClient.client\" id=\"client\" class=\"form-control topMargin\" placeholder=\"Product\" type=\"text\"\r\n\t\t\t\t\t\t/>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t<label for=\"idsavaialble\" class=\"col-lg-2 control-label topMargin\">IDs Available</label>\r\n\t\t\t\t\t<div class=\"col-lg-10\">\r\n\t\t\t\t\t\t<input disabled.bind=\"selectedClient.assignments.length > 0\" value.bind=\"selectedClient.idsAvailable\" id=\"idsavaialble\"\r\n\t\t\t\t\t\t class=\"form-control topMargin\" placeholder=\"IDs Available\" type=\"number\" />\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t<label for=\"lastID\" class=\"col-lg-2 control-label topMargin\">Last ID Assigned</label>\r\n\t\t\t\t\t<div class=\"col-lg-10\">\r\n\t\t\t\t\t\t<input value.bind=\"selectedClient.lastIdAssigned\" id=\"lastID\" class=\"form-control topMargin\" placeholder=\"Last ID Allocated\"\r\n\t\t\t\t\t\t type=\"number\" />\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t<label for=\"lastID\" class=\"col-lg-2 control-label topMargin\">First Allowable ID</label>\r\n\t\t\t\t\t<div class=\"col-lg-10\">\r\n\t\t\t\t\t\t<input value.bind=\"selectedClient.firstAllowableID\" id=\"lastID\" class=\"form-control topMargin\" placeholder=\"Last ID Allocated\"\r\n\t\t\t\t\t\t type=\"number\" />\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t<label  class=\"control-label col-lg-2 topMargin\">Product</label>\r\n\t\t\t\t\t<div class=\"col-lg-10\">\r\n\t\t\t\t\t<select class=\"form-control topMargin\"  value.bind=\"selectedClient.productId\">\r\n\t\t\t\t\t\t<option value=\"\">Choose a product</option>\r\n\t\t\t\t\t\t<option repeat.for=\"product of products.productsArray\" model.bind=\"product._id\">${product.name}</option>\r\n\t\t\t\t\t</select>\r\n\t\t\t\t</div>\t\t\t\t\r\n\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t<label for=\"status\" class=\"col-lg-2 control-label topMargin\">Status</label>\r\n\t\t\t\t\t<div class=\"col-lg-10\">\r\n\t\t\t\t\t\t<select value.bind=\"selectedClient.clientStatus\" class=\"form-control topMargin\" id=\"status\">\r\n\t\t\t\t\t\t\t<option value=\"\">Select an option</option>\r\n\t\t\t\t\t\t\t<option repeat.for=\"name of config.CLIENT_STATUSES\" model.bind=\"name.code\">${name.description}</option>\r\n\t\t\t\t\t\t</select>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</fieldset>\r\n\t</div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/system/components/is4ua.html":
/*!********************************************************!*\
  !*** ./src/modules/admin/system/components/is4ua.html ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div class=\"col-lg-6\">\r\n        <div class=\"form-group\">\r\n            <label for=\"editSapName\" class=\"control-label\">SAP Name</label>\r\n            <select value.two-way=\"products.selectedProduct.sapProduct\" id=\"editSapName\" class=\"form-control \" placeholder=\"SAP Name\">\r\n                <option value=\"\">Select an option</option>\r\n                <option repeat.for=\"name of is4ua.sapProductsArray\" value=\"${name.code}\">${name.description}</option>\r\n            </select>\r\n        </div>\r\n        <div class=\"form-group\">\r\n            <label for=\"editHostedWhere\" class=\"control-label\">Hosted</label>\r\n            <select value.bind=\"products.selectedProduct.hostWhere\" id=\"editHostedWhere\" class=\"form-control \">\r\n                <option value=\"\">Select an option</option>\r\n                <option value=\"UCC\">UCC</option>\r\n                <option value=\"Other\">Other</option>\r\n            </select>\r\n        </div>\r\n    \r\n        <div class=\"form-group\">\r\n            <label for=\"editUaCurriculum\" class=\"control-label\">UA Curriculum</label>\r\n            <select value.bind=\"products.selectedProduct.uaCurriculum\" id=editUaCurriculum \" class=\"form-control  \">\r\n                <option value=\" \">Select an option</option>\r\n                <option repeat.for=\"name of is4ua.uaCurriculumArray \" value=\"${name.code} \">${name.description}</option>\r\n            </select>\r\n        </div>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/system/components/productForm.html":
/*!**************************************************************!*\
  !*** ./src/modules/admin/system/components/productForm.html ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\n  <style>\n    .menuButtons {\n      color: ${config.ACTIVE_SUBMENU_COLOR};\n      background-color:${config.BUTTONS_BACKGROUND}\n    }\n  </style>\n  <div class=\"col-lg-12\">\n    <compose view=\"./productFormToolbar.html\"></compose>\n    <div class=\"panel panel-info positionUnderToolbar\">\n      <div class=\"panel-body\">\n\n        <compose view=\"./productFormHeader.html\"></compose>\n\n        <div class=\"row topMargin\">\n          <div class=\"col-lg-12\">\n            <div class=\"panel panel-default\">\n              <div class=\"panel-body\">\n                <div class=\"col-lg-2\">\n                  <div id=\"productListGroup\" class=\"list-group\">\n                    <a class=\"${ $first ? 'menuButtons' : ''} list-group-item\" repeat.for=\"tab of tabs\" href=\"\"\n                      class=\"list-group-item\" click.delegate=\"changeTab($event, $index)\">\n                      <h4 id=\"${tab.id}\" class=\"list-group-item-heading\">${tab.id}</h4>\n                    </a>\n                  </div>\n                </div>\n                <div class=\"col-lg-10\">\n                  <div class=\"tab-content\">\n                    <div id=\"AssignmentsTab\" class=\"tab-pane fade in active' }\">\n                      <compose view=\"./Assignments.html\"></compose>\n                    </div>\n                    <div id=\"SystemsTab\" class=\"tab-pane fade\">\n                      <compose view=\"./Systems.html\"></compose>\n                    </div>\n                    <div id=\"is4uaTab\" class=\"tab-pane fade\">\n                      <compose view=\"./is4ua.html\"></compose>\n                    </div>\n                    <div id=\"DocumentsTab\" class=\"tab-pane fade\">\n                      <compose view=\"./Documents.html\"></compose>\n                    </div>\n                    <div id=\"NotesTab\" class=\"tab-pane fade\">\n                      <compose view=\"./Notes.html\"></compose>\n                    </div>\n                    <div id=\"DescriptionTab\" class=\"tab-pane fade\">\n                      <compose view=\"./Description.html\"></compose>\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </div>\n            </form>\n          </div>\n        </div>\n      </div>\n</template>\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/system/components/productFormHeader.html":
/*!********************************************************************!*\
  !*** ./src/modules/admin/system/components/productFormHeader.html ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div class=\" topMargin blackText\">\r\n        <!-- <form class=\"form-horizontal topMargin\"> -->\r\n            <!-- Row 1 -->\r\n            <div class=\"row\">\r\n                <div class=\"col-lg-6\">\r\n                    <div class=\"row\">\r\n                        <div class=\"col-lg-12\">\r\n                            <div class=\"form-group\">\r\n                                <label for=\"editName\" class=\"col-sm-3 control-label hideOnPhone\">Name</label>\r\n                                <div class=\"col-sm-8\">\r\n                                    <input value.bind=\"products.selectedProduct.name\" id=\"editName\"\r\n                                        class=\"form-control \" placeholder=\"Name\" type=\"text\" />\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-lg-2 topMargin\">\r\n                            <div class=\"form-group\">\r\n                                <div class=\"col-sm-8\">\r\n                                    <div class=\"checkbox\">\r\n                                        <label class=\"pull-left\">\r\n                                            <input id=\"activeProduct\" checked.bind=\"products.selectedProduct.active\"\r\n                                                type=\"checkbox\"> Active\r\n                                        </label>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-lg-3 topMargin\">\r\n                            <div class=\"form-group\">\r\n                                <div class=\"col-sm-8\">\r\n                                    <div class=\"checkbox\">\r\n                                        <label class=\"pull-left\">\r\n                                            <input id=\"apjProduct\" checked.bind=\"products.selectedProduct.apj\"\r\n                                                type=\"checkbox\"> Available in APJ\r\n                                        </label>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-lg-7 topMargin\">\r\n                          <div class=\"form-group\">\r\n                              <label for=\"editPrice\" class=\"col-sm-2 control-label hideOnPhone\">Price</label>\r\n                              <div class=\"col-sm-8\">\r\n                                  <input value.bind=\"products.selectedProduct.price\" id=\"editPrice\"\r\n                                      class=\"form-control \" placeholder=\"Price\" type=\"text\" />\r\n                              </div>\r\n                          </div>\r\n                      </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"col-lg-6\">\r\n                    <table id=\"coursesTable\" class=\"table table-striped table-hover\">\r\n                        <thead>\r\n                            <tr>\r\n                                <th>Document </th>\r\n                                <th>Default</th>\r\n                                <th></th>\r\n                            </tr>\r\n                        </thead>\r\n                        <tbody>\r\n                            <tr repeat.for=\"document of products.selectedProduct.documents\">\r\n                                <td data-title=\"name\">${document.fileName} </td>\r\n                                <td data-title=\"default\" click.trigger=\"toggleDefault($index)\"\r\n                                    innerhtml.bind='document.default | checkBox'></td>\r\n                                <td click.trigger=\"removeDocument($index)\"><i class=\"fa fa-trash\"></i></td>\r\n                            </tr>\r\n                        </tbody>\r\n                    </table>\r\n                </div>\r\n            </div>\r\n        <!-- </form> -->\r\n    </div>\r\n</template>\r\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/system/components/productFormToolbar.html":
/*!*********************************************************************!*\
  !*** ./src/modules/admin/system/components/productFormToolbar.html ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div class=\"list-group-item toolbar\">\r\n        <span click.delegate=\"back()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n            data-placement=\"bottom\" title=\"\" data-original-title=\"Back\"><i class=\"fa fa-arrow-left fa-lg fa-border\"\r\n                aria-hidden=\"true\"></i></span>\r\n        <span click.delegate=\"save()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n            data-placement=\"bottom\" title=\"\" data-original-title=\"Save\"><i class=\"fa fa-floppy-o fa-lg fa-border\"\r\n                aria-hidden=\"true\"></i></span>\r\n        <span click.delegate=\"cancel()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n            data-placement=\"bottom\" title=\"\" data-original-title=\"Cancel Changes\"><i class=\"fa fa-ban fa-lg fa-border\"\r\n                aria-hidden=\"true\"></i></span>\r\n        <span show.bind=\"!newProduct\" click.delegate=\"delete()\" class=\"smallMarginRight\" bootstrap-tooltip\r\n            data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Delete\"><i\r\n                class=\"fa fa-trash fa-lg fa-border text-danger\" aria-hidden=\"true\"></i></span>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/system/components/productTable.html":
/*!***************************************************************!*\
  !*** ./src/modules/admin/system/components/productTable.html ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\n    <div class=\"panel panel-info\">\n        <div class=\"panel-body\">\n            <div class=\"row\">\n                <div class=\"col-lg-12\" style='padding:15px;'>\n                    <div class='row'>\n                        <div class='col-lg-10 col-lg-offset-1 bottomMargin'>\n                            <div id=\"no-more-tables\">\n                                <table id=\"productsTable\" class=\"table table-striped table-hover cf\">\n                                    <thead class=\"cf\">\n                                        <tr colspan='5'>\n                                            <compose view=\"../../../../resources/elements/table-navigation-bar.html\"></compose>\n                                        </tr>\n                                        <tr>\n                                        <tr>\n                                            <td colspan='5'>\n                                                <span click.delegate=\"refresh()\" class=\"smallMarginRight\"\n                                                    bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\n                                                    title=\"\" data-original-title=\"Refresh\"><i class=\"fa fa-refresh\"\n                                                        aria-hidden=\"true\"></i></span>\n                                                <span click.delegate=\"new()\" class=\"smallMarginRight\" bootstrap-tooltip\n                                                    data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\n                                                    data-original-title=\"New\"><i class=\"fa fa-plus\" aria-hidden=\"true\"></i></span>\n                                                <span click.delegate=\"_cleanUpFilters()\" class=\"smallMarginRight\"\n                                                    bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\n                                                    title=\"\" data-original-title=\"Clear Filters\"><i class=\"fa fa-filter\"\n                                                        aria-hidden=\"true\"></i></span>\n                                                <!--  <span class=\"pull-right\" id=\"spinner\" innerhtml.bind=\"spinnerHTML\"></span> -->\n                                            </td>\n                                        </tr>\n                                        <tr>\n                                            <th style=\"width:75px;\"><span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'clientKey'})\">Key\n                                                </span><i class=\"fa fa-sort\"></i></th>\n                                            <th><span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'name'})\">Name\n                                                </span><span><i class=\"fa fa-sort\"></i></span></th>\n                                            <th style=\"width:150px;\">SAP Product</th>\n                                            <th>Status </th>\n                                            <th>Systems</th>\n                                        </tr>\n                                    </thead>\n                                    <tbody>\n                                        <tr>\n                                            <th></th>\n                                            <th>\n                                                <input value.bind=\"nameFilterValue\" input.delegate=\"dataTable.filterList(nameFilterValue, { type: 'text',  filter: 'nameFilterValue', collectionProperty: 'name', displayProperty: 'name',  compare:'match'} )\"\n                                                    class=\"form-control\" />\n                                            </th>\n                                            <th>\n                                                <select value.bind=\"sapNameFilterValue\" input.delegate=\"dataTable.filterList($event, { type: 'value',  filter: 'sapNameFilter', collectionProperty: 'sapProduct', displayProperty: 'sapProduct',  compare:'match'} )\"\n                                                    class=\"form-control \">\n                                                    <option value=\"\"></option>\n                                                    <option repeat.for=\"product of is4ua.sapProductsArray\" value=\"${product.code}\">${product.description}</option>\n                                                </select>\n                                            </th>\n                                            <th>\n                                                <select value.bind=\"activeFilter\" input.delegate=\"dataTable.filterList($event, { type: 'boolean',  filter: 'activeFilter', lookupArray: '', lookupProperty: '', collectionProperty: 'active', displayProperty: 'active', matchProperty:'', compare:'boolean'} )\"\n                                                    class=\"form-control\">\n                                                    <option value=\"\"></option>\n                                                    <option value=\"true\">Active</option>\n                                                    <option value=\"false\">Inactive</option>\n                                                </select>\n                                            </th>\n                                            <th>\n                                                <input value.bind=\"systemFilterValue\" input.delegate=\"dataTable.filterList(systemFilterValue, { type: 'custom',  filter: systemCustomFilter, collectionProperty: 'systems.sid', compare:'custom'} )\"\n                                                    class=\"form-control\" />\n                                            </th>\n                                        </tr>\n                                        <tr class=\"sortable\" click.trigger=\"edit($index, $event)\" repeat.for=\"system of dataTable.displayArray\">\n                                            <td data-title=\"Client Key\">${system.clientKey}</td>\n                                            <td data-title=\"Name\">${system.name}</td>\n                                            <td data-title=\"SAP Product\">${system.sapProduct |\n                                                lookupValue:is4ua.sapProductsArray:\"code\":\"description\"}</td>\n                                            <td class=\"centerText\" data-title=\"Status\">${system.active |\n                                                translateStatus}</td>\n                                            <td data-title=\"Systems\">${system.systems | systemList}</td>\n                                        </tr>\n                                    </tbody>\n                                </table>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</template>\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/system/components/sessionConfigTable.html":
/*!*********************************************************************!*\
  !*** ./src/modules/admin/system/components/sessionConfigTable.html ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div class=\"list-group-item toolbar\">\r\n        <span click.delegate=\"backConfig()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n            data-placement=\"bottom\" title=\"\" data-original-title=\"Back\"><i class=\"fa fa-arrow-left fa-lg fa-border\"\r\n                aria-hidden=\"true\"></i></span>\r\n        <span click.delegate=\"saveConfig()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n            data-placement=\"bottom\" title=\"\" data-original-title=\"Save\"><i class=\"fa fa-floppy-o fa-lg fa-border\"\r\n                aria-hidden=\"true\"></i></span>\r\n        <span click.delegate=\"cancelConfig()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n            data-placement=\"bottom\" title=\"\" data-original-title=\"Cancel Changes\"><i class=\"fa fa-ban fa-lg fa-border\"\r\n                aria-hidden=\"true\"></i></span>\r\n    </div>\r\n    <div class=\"panel panel-info positionUnderToolbar\">\r\n        <div class=\"panel-body\">\r\n            <div class=\"row\">\r\n                <div class=\"col-lg-12 col-sm-12\" style='padding:15px;'>\r\n                    <div class='row'>\r\n\r\n                        <div class='col-lg-12 bottomMargin'>\r\n                            <compose view=\"../../../../resources/elements/table-navigation-bar.html\"></compose>\r\n                            <div id=\"no-more-tables\">\r\n                                <table id=\"newsTable\" class=\"table table-striped table-hover cf\">\r\n                                    <thead class=\"cf\">\r\n                                        <tr>\r\n                                            <td colspan='5'>\r\n                                                <span click.delegate=\"refreshConfig()\" class=\"smallMarginRight\"\r\n                                                    bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n                                                    title=\"\" data-original-title=\"Refresh\"><i class=\"fa fa-refresh\"\r\n                                                        aria-hidden=\"true\"></i></span>\r\n                                                <span class=\"pull-right\" id=\"spinner\" innerhtml.bind=\"spinnerHTML\"></span>\r\n                                            </td>\r\n                                        </tr>\r\n                                        <tr>\r\n                                            <th>Session</th>\r\n                                            <th>Start Day</th>\r\n                                            <th>Start Month</th>\r\n                                            <th>End Day</th>\r\n                                            <th>End Month</th>\r\n                                            <th>Open Day</th>\r\n                                            <th>Open Month</th>\r\n                                        </tr>\r\n                                    </thead>\r\n                                    <tbody>\r\n                                        <tr repeat.for=\"item of editSessionConfigArray\">\r\n                                            <td><input value.bind=\"item.session\" class=\"form-control\" type=\"text\" /></td>\r\n                                            <td><input value.bind=\"item.startDay\" class=\"form-control\" type=\"text\" /></td>\r\n                                            <td><input value.bind=\"item.startMonth\" class=\"form-control\" type=\"text\" /></td>\r\n                                            <td><input value.bind=\"item.endDay\" class=\"form-control\" type=\"text\" /></td>\r\n                                            <td><input value.bind=\"item.endMonth\" class=\"form-control\" type=\"text\" /></td>\r\n                                            <td><input value.bind=\"item.openDay\" class=\"form-control\" type=\"text\" /></td>\r\n                                            <td><input value.bind=\"item.openMonth\" class=\"form-control\" type=\"text\" /></td>\r\n                                        </tr>\r\n                                    </tbody>\r\n                                </table>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/system/components/sessionForm.html":
/*!**************************************************************!*\
  !*** ./src/modules/admin/system/components/sessionForm.html ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t<div class=\"list-group-item toolbar\">\r\n\t\t<span click.delegate=\"back()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n\t\t title=\"\" data-original-title=\"Back\"><i class=\"fa fa-arrow-left fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n\t\t<span click.delegate=\"save()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n\t\t title=\"\" data-original-title=\"Save\"><i class=\"fa fa-floppy-o fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n\t\t<span click.delegate=\"cancel()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n\t\t title=\"\" data-original-title=\"Cancel Changes\"><i class=\"fa fa-ban fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n\t</div>\r\n\t<div class=\"panel panel-info positionUnderToolbar\">\r\n\t\t<div class=\"panel-body\">\r\n\t\t\t<div class=\"row\">\r\n\t\t\t\t<div class=\"container\">\r\n\t\t\t\t\t<div class=\"topMargin\">\r\n\t\t\t\t\t\t<div class=\"col-lg-5 topMargin\">\r\n\t\t\t\t\t\t\t<label for=\"editSession\" class=\"form-control-label\">Session</label>\r\n\t\t\t\t\t\t\t<select value.bind=\"sessions.selectedSession.session\" class=\"form-control\" id=\"editSession\">\r\n\t\t\t\t\t\t\t\t<option></option>\r\n\t\t\t\t\t\t\t\t<option repeat.for=\"session of config.SESSION_PARAMS\">${session.session}</option>\r\n\t\t\t\t\t\t\t</select>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"col-lg-5 col-lg-offset-1 topMargin\">\r\n\t\t\t\t\t\t\t<label for=\"editYear\" class=\"form-control-label \">Year</label>\r\n\t\t\t\t\t\t\t<input value.bind=\"sessions.selectedSession.year\" id=\"editYear\" class=\" form-control\" placeholder=\"Year\" type=\"text\" />\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"col-lg-5 topMargin\">\r\n\t\t\t\t\t\t\t<label class=\"form-control-label \">Start Date</label>\r\n\t\t\t\t\t\t\t<flat-picker controlid=\"startDate\" config.bind=\"config\" value.bind=\"sessions.selectedSession.startDate\"></flat-picker>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"col-lg-5 col-lg-offset-1 topMargin\">\r\n\t\t\t\t\t\t\t<label class=\"form-control-label \">End Date</label>\r\n\t\t\t\t\t\t\t<flat-picker controlid=\"endDate\" config.bind=\"config\" value.bind=\"sessions.selectedSession.endDate\"></flat-picker>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"col-lg-5 topMargin\">\r\n\t\t\t\t\t\t\t<label class=\"form-control-label \">Requests Open</label>\r\n\t\t\t\t\t\t\t<flat-picker controlid=\"requestsOpenDate\" config.bind=\"config\" value.bind=\"sessions.selectedSession.requestsOpenDate\"></flat-picker>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"col-lg-5 col-lg-offset-1 topMargin\">\r\n\t\t\t\t\t\t\t<label for=\"editStatus\" class=\"form-control-label\">Status</label>\r\n\t\t\t\t\t\t\t<select value.bind=\"sessions.selectedSession.sessionStatus\" id=\"editStatus\" class=\"form-control\" id=\"editStatus\">\r\n\t\t\t\t\t\t\t\t<option repeat.for=\"session of config.SESSION_STATUSES\" value.bind=\"session\">${session}</option>\r\n\t\t\t\t\t\t\t</select>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/system/components/sessionTable.html":
/*!***************************************************************!*\
  !*** ./src/modules/admin/system/components/sessionTable.html ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "sessionTable.html\n<template>\n\t<div class=\"panel panel-info\">\n\t\t<div class=\"panel-body\">\n\t\t\t<div class=\"row\">\n\t\t\t\t<div class='col-lg-10 col-lg-offset-1 bottomMargin'>\n\t\t\t\t\t<compose view=\"../../../../resources/elements/table-navigation-bar.html\"></compose>\n\t\t\t\t\t<div id=\"no-more-tables\">\n\t\t\t\t\t\t<table id=\"sessionsTable\" class=\"table table-striped table-hover cf\">\n\t\t\t\t\t\t\t<thead class=\"cf\">\n\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t<td colspan='6'>\n\t\t\t\t\t\t\t\t\t\t<div class=\"checkbox\">\n\t\t\t\t\t\t\t\t\t\t\t<label>\n\t\t\t\t\t\t\t\t\t\t\t\t<input checked.bind=\"isChecked\" change.trigger=\"filterOutClosed()\" type=\"checkbox\"> Hide inactive sessions\n\t\t\t\t\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t<td colspan='7'>\n\t\t\t\t\t\t\t\t\t\t<span click.delegate=\"refresh()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\n\t\t\t\t\t\t\t\t\t\t data-placement=\"bottom\" title=\"\" data-original-title=\"Refresh\"><i class=\"fa fa-refresh\" aria-hidden=\"true\"></i></span>\n\t\t\t\t\t\t\t\t\t\t<span click.delegate=\"new()\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\n\t\t\t\t\t\t\t\t\t\t data-original-title=\"New\"><i class=\"smallMarginRight fa fa-plus\" aria-hidden=\"true\"></i></span>\n\t\t\t\t\t\t\t\t\t\t<span click.delegate=\"editSessionConfig()\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\n\t\t\t\t\t\t\t\t\t\t title=\"\" data-original-title=\"Config\"><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></span>\n\t\t\t\t\t\t\t\t\t\t<span class=\"pull-right\" id=\"spinner\" innerhtml.bind=\"spinnerHTML\"></span>\n\t\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t<th><span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'session'})\">Session\n\t\t\t\t\t\t\t\t\t\t</span> <span><i class=\"fa fa-sort\"></i></span></th>\n\t\t\t\t\t\t\t\t\t<th><span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'startDate'})\">Start Date\n\t\t\t\t\t\t\t\t\t\t</span><span><i class=\"fa fa-sort\"></i></span></th>\n\t\t\t\t\t\t\t\t\t<th><span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'endDate'})\">End Date\n\t\t\t\t\t\t\t\t\t\t</span><span><i class=\"fa fa-sort\"></i></span></th>\n\t\t\t\t\t\t\t\t\t<th><span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'requestsOpenDate'})\">Requests\n\t\t\t\t\t\t\t\t\t\t\tOpen </span><span><i class=\"fa fa-sort\"></i></span></th>\n\t\t\t\t\t\t\t\t\t<th><span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'sortOrder'})\">Sort Order\n\t\t\t\t\t\t\t\t\t\t</span><span><i class=\"fa fa-sort\"></i></span></th>\n\t\t\t\t\t\t\t\t\t<th>Status</th>\n\t\t\t\t\t\t\t\t\t<th></th>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t</thead>\n\t\t\t\t\t\t\t<tbody>\n\t\t\t\t\t\t\t\t<tr class=\"sortable\" repeat.for=\"session of dataTable.displayArray\">\n\t\t\t\t\t\t\t\t\t<td data-title=\"Session\" click.trigger=\"edit($index, $event)\">${session.session} - ${session.year}</td>\n\t\t\t\t\t\t\t\t\t<td data-title=\"StartDate\" click.trigger=\"edit($index, $event)\">\n\t\t\t\t\t\t\t\t\t\t<div style=\"width: 100px\">${session.startDate | dateFormat:config.DATE_FORMAT_TABLE}</div>\n\t\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t\t<td data-title=\"EndDate\" click.trigger=\"edit($index, $event)\">\n\t\t\t\t\t\t\t\t\t\t<div style=\"width: 100px\">${session.endDate | dateFormat:config.DATE_FORMAT_TABLE}</div>\n\t\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t\t<td data-title=\"RequestsOpen\" click.trigger=\"edit($index, $event)\">\n\t\t\t\t\t\t\t\t\t\t<div style=\"width: 100px\">${session.requestsOpenDate | dateFormat:config.DATE_FORMAT_TABLE}</div>\n\t\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t\t<td> <Input change.trigger=\"saveSortOrder(session)\" type=\"number\" value.bind=\"session.sortOrder\" /> </td>\n\t\t\t\t\t\t\t\t\t<td data-title=\"createdDate\" click.trigger=\"edit($index, $event)\">${session.sessionStatus}</td>\n\t\t\t\t\t\t\t\t\t<td data-title=\"Update\" style=\"width: 100px\" click.trigger=\"updateStatus($index, session, $event)\"\n\t\t\t\t\t\t\t\t\t innerhtml.bind=\"session.sessionStatus | sessionStatusButton\">\n\t\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t</tbody>\n\t\t\t\t\t\t</table>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t</div>\n</template>\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/system/components/systemForm.html":
/*!*************************************************************!*\
  !*** ./src/modules/admin/system/components/systemForm.html ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t<div show.bind=\"systemDetails\" class=\"col-lg-12\">\r\n\t\t<div class=\"list-group-item toolbar\">\r\n\t\t\t<span click.delegate=\"back()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n\t\t\t\tdata-placement=\"bottom\" title=\"\" data-original-title=\"Back\"><i class=\"fa fa-arrow-left fa-lg fa-border\"\r\n\t\t\t\t\taria-hidden=\"true\"></i></span>\r\n\t\t\t<span click.delegate=\"save()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n\t\t\t\tdata-placement=\"bottom\" title=\"\" data-original-title=\"Save\"><i class=\"fa fa-floppy-o fa-lg fa-border\"\r\n\t\t\t\t\taria-hidden=\"true\"></i></span>\r\n\t\t\t<span click.delegate=\"cancel()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n\t\t\t\tdata-placement=\"bottom\" title=\"\" data-original-title=\"Cancel Changes\"><i\r\n\t\t\t\t\tclass=\"fa fa-ban fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n\t\t\t<span show.bind=\"!newSystem\" click.delegate=\"delete()\" class=\"smallMarginRight\" bootstrap-tooltip\r\n\t\t\t\tdata-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Delete\"><i\r\n\t\t\t\t\tclass=\"fa fa-trash fa-lg fa-border text-danger\" aria-hidden=\"true\"></i></span>\r\n\t\t\t<span click.delegate=\"editClientsButton()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n\t\t\t\tdata-placement=\"bottom\" title=\"\" data-original-title=\"Edit Client List\"><i\r\n\t\t\t\t\tclass=\"fa fa-pencil fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n\t\t</div>\r\n\t\t<div class=\"panel panel-info positionUnderToolbar\">\r\n\t\t\t<div class=\"panel-body\">\r\n\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t<!-- Edit Form -->\r\n\t\t\t\t\t<div class=\"col-lg-6 \">\r\n\t\t\t\t\t\t<div class=\"col-lg-6\">\r\n\t\t\t\t\t\t\t<div class=\"col-lg-12\">\r\n\t\t\t\t\t\t\t\t<label for=\"editSid\" class=\"form-control-label\">SID</label>\r\n\t\t\t\t\t\t\t\t<input value.bind=\"systems.selectedSystem.sid | toUppercase\" id=\"editSid\"\r\n\t\t\t\t\t\t\t\t\tclass=\"form-control\" placeholder=\"SID\" type=\"text\" />\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class=\"col-lg-10\">\r\n\t\t\t\t\t\t\t\t<div class=\"checkbox\">\r\n\t\t\t\t\t\t\t\t\t<label>\r\n\t\t\t\t\t\t\t\t\t\t<input checked.bind=\"systems.selectedSystem.active\" type=\"checkbox\"> Active\r\n\t\t\t\t\t\t\t\t\t</label>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class=\"col-lg-12\">\r\n\t\t\t\t\t\t\t\t<label for=\"editDesc\" class=\"form-control-label\">Description</label>\r\n\t\t\t\t\t\t\t\t<input value.bind=\"systems.selectedSystem.description\" id=\"editDesc\"\r\n\t\t\t\t\t\t\t\t\tclass=\"form-control\" placeholder=\"Description\" type=\"text\" />\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class=\"col-lg-12\">\r\n\t\t\t\t\t\t\t\t<label for=\"editServer\" class=\"form-control-label\">Server</label>\r\n\t\t\t\t\t\t\t\t<input value.bind=\"systems.selectedSystem.server | toUppercase\" id=\"editServer\"\r\n\t\t\t\t\t\t\t\t\tclass=\"form-control\" placeholder=\"Server\" type=\"text\" />\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class=\"col-lg-12\">\r\n\t\t\t\t\t\t\t\t<label for=\"editPort\" class=\"form-control-label\">Port</label>\r\n\t\t\t\t\t\t\t\t<input value.bind=\"systems.selectedSystem.port\" id=\"editPort\" class=\"form-control\"\r\n\t\t\t\t\t\t\t\t\tplaceholder=\"Port\" type=\"number\" />\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class=\"col-lg-12\">\r\n\t\t\t\t\t\t\t\t<label for=\"editInst\" class=\"form-control-label\">Instance</label>\r\n\t\t\t\t\t\t\t\t<input value.bind=\"systems.selectedSystem.instance\" id=\"editInst\" class=\"form-control\"\r\n\t\t\t\t\t\t\t\t\tplaceholder=\"Instance\" type=\"text\" maxLength=\"2\" />\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class=\"col-lg-12\">\r\n\t\t\t\t\t\t\t\t<label for=\"editIpAddress\" class=\"form-control-label\">IP Address</label>\r\n\t\t\t\t\t\t\t\t<input value.bind=\"systems.selectedSystem.ipAddress\" id=\"editIpAddress\"\r\n\t\t\t\t\t\t\t\t\tclass=\"form-control\" placeholder=\"IP Address\" type=\"text\" />\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class=\"col-lg-12\">\r\n\t\t\t\t\t\t\t\t<label for=\"edittype\" class=\"control-label\">System Type</label>\r\n\t\t\t\t\t\t\t\t<select value.bind=\"systems.selectedSystem.type\" id=\"edittype\" class=\"form-control \">\r\n\t\t\t\t\t\t\t\t\t<option model.bind=\"type\" repeat.for=\"type of config.SYSTEM_TYPES\">${type}</option>\r\n\t\t\t\t\t\t\t\t</select>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class=\"col-lg-12\">\r\n\t\t\t\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t\t\t\t<div class=\"col-sm-10\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"checkbox\">\r\n\t\t\t\t\t\t\t\t\t\t\t<label>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<input checked.bind=\"systems.selectedSystem.apj\" type=\"checkbox\"> APJ\r\n\t\t\t\t\t\t\t\t\t\t\t</label>\r\n\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"col-lg-6\">\r\n\t\t\t\t\t\t\t<div class=\"col-lg-12\">\r\n\t\t\t\t\t\t\t\t<label for=\"editOs\" class=\"form-control-label\">OS</label>\r\n\t\t\t\t\t\t\t\t<input value.bind=\"systems.selectedSystem.os\" id=\"editOs\" class=\"form-control\"\r\n\t\t\t\t\t\t\t\t\tplaceholder=\"Operating System\" type=\"text\" />\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class=\"col-lg-12\">\r\n\t\t\t\t\t\t\t\t<label for=\"editOsVersion\" class=\"form-control-label\">OS Version</label>\r\n\t\t\t\t\t\t\t\t<input value.bind=\"systems.selectedSystem.osVersion\" id=\"editOsVersion\"\r\n\t\t\t\t\t\t\t\t\tclass=\"form-control\" placeholder=\"OS Version\" type=\"text\" />\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class=\"col-lg-12\">\r\n\t\t\t\t\t\t\t\t<label for=\"editDB\" class=\"form-control-label\">Database</label>\r\n\t\t\t\t\t\t\t\t<input value.bind=\"systems.selectedSystem.dbType\" id=\"editDB\" class=\"form-control\"\r\n\t\t\t\t\t\t\t\t\tplaceholder=\"Database\" type=\"text\" />\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class=\"col-lg-12\">\r\n\t\t\t\t\t\t\t\t<label for=\"editDBVersion\" class=\"form-control-label\">Dataabase Version</label>\r\n\t\t\t\t\t\t\t\t<input value.bind=\"systems.selectedSystem.dbVersion\" id=\"editDBVersion\"\r\n\t\t\t\t\t\t\t\t\tclass=\"form-control\" placeholder=\"Database Version\" type=\"text\" />\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class=\"col-lg-12\">\r\n\t\t\t\t\t\t\t\t<label for=\"editIts\" class=\"form-control-label\">URL</label>\r\n\t\t\t\t\t\t\t\t<input value.bind=\"systems.selectedSystem.its\" id=\"editIts\" class=\"form-control\"\r\n\t\t\t\t\t\t\t\t\tplaceholder=\"URL\" type=\"text\" />\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class=\"col-lg-12\">\r\n\t\t\t\t\t\t\t\t<label for=\"editTerms\" class=\"form-control-label\">Sessions</label>\r\n\t\t\t\t\t\t\t\t<select multiple value.bind=\"systems.selectedSystem.sessions\" class=\"form-control\">\r\n\t\t\t\t\t\t\t\t\t<option value=\"${session.session}\" repeat.for=\"session of config.SESSION_PARAMS\">\r\n\t\t\t\t\t\t\t\t\t\t${session.session}</option>\r\n\t\t\t\t\t\t\t\t</select>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class=\"col-lg-6\">\r\n\t\t\t\t\t\t\t\t<div class=\"checkbox\">\r\n\t\t\t\t\t\t\t\t\t<label class=\"form-control-label topMargin\">\r\n\t\t\t\t\t\t\t\t\t\t<input checked.bind=\"systems.selectedSystem.goldBackup\" type=\"checkbox\"> Gold\r\n\t\t\t\t\t\t\t\t\t\tBackup\r\n\t\t\t\t\t\t\t\t\t</label>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class=\"col-lg-6\">\r\n\t\t\t\t\t\t\t\t<div class=\"checkbox\">\r\n\t\t\t\t\t\t\t\t\t<label class=\"form-control-label topMargin\">\r\n\t\t\t\t\t\t\t\t\t\t<input checked.bind=\"systems.selectedSystem.snapShot\" type=\"checkbox\"> Snapshot\r\n\t\t\t\t\t\t\t\t\t</label>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class=\"col-lg-12\">\r\n\t\t\t\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t\t\t\t<label class=\"form-control-label\">Gold Backup Date</label>\r\n\t\t\t\t\t\t\t\t\t<flat-picker controlid=\"goldBackupDate\" config.bind=\"dateConfig\"\r\n\t\t\t\t\t\t\t\t\t\tvalue.bind=\"systems.selectedSystem.goldBackupDate\"></flat-picker>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"col-lg-12 bottomMargin\">\r\n\t\t\t\t\t\t\t<label for=\"editNotes\" class=\"form-control-label\">Notes</label>\r\n\t\t\t\t\t\t\t<textarea value.bind=\"systems.selectedSystem.notes\" id=\"editNotes\" rows=\"8\"\r\n\t\t\t\t\t\t\t\tclass=\"form-control\"></textarea>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class=\"col-lg-6\">\r\n\t\t\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t\t\t<div show.bind=\"editClients\" class=\"panel panel-default editPanel col-sm-9\">\r\n\t\t\t\t\t\t\t\t<div class=\"panel-body\">\r\n\t\t\t\t\t\t\t\t\t<div class=\"topMargin leftmargin\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"bottomMargin list-group-item leftMargin rightMargin\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<span click.delegate=\"generateClients()\" class=\"smallMarginRight\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\tbootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\ttitle=\"\" data-original-title=\"Add Clients\"><i\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tclass=\"fa fa-plus fa-lg fa-border\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\taria-hidden=\"true\"></i></span>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<span click.delegate=\"refreshClients()\" class=\"smallMarginRight\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\tbootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\ttitle=\"\" data-original-title=\"Refresh Clients\"><i\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tclass=\"fa fa-refresh fa-lg fa-border text-danger\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\taria-hidden=\"true\"></i></span>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<span click.delegate=\"deleteClients()\" class=\"smallMarginRight\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\tbootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\ttitle=\"\" data-original-title=\"Delete Clients\"><i\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tclass=\"fa fa-trash-o fa-lg fa-border text-danger\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\taria-hidden=\"true\"></i></span>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<span click.delegate=\"editClientsButton()\" class=\"smallMarginRight\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\tbootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\ttitle=\"\" data-original-title=\"Cancel Changes\"><i\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tclass=\"fa fa-ban fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<span click.trigger=\"updateAllProducts()\" class=\"smallMarginRight\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\tbootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\ttitle=\"\" data-original-title=\"Update Products\"><i\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tclass=\"fa fa-product-hunt fa-lg fa-border\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\taria-hidden=\"true\"></i></span>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<span click.delegate=\"assignmentDetails()\" class=\"smallMarginRight\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\tbootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\ttitle=\"\" data-original-title=\"Details\"><i\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tclass=\"fa fa-eye fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n\t\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"leftMargin bottomMargin topMargin\">\r\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-sm-2\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<input value.bind=\"editFirstClient\" id=\"editFirstClient\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\tplaceholder=\"Start\" class=\"form-control input-sm\" type=\"number\" />\r\n\t\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-sm-2 \">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<input value.bind=\"editLastClient\" id=\"editLastClient\" placeholder=\"End\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\tclass=\"form-control input-sm\" type=\"number\" />\r\n\t\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-sm-2 \">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<input value.bind=\"idsAvailable\" id=\"editClientIdsAvailable\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\tplaceholder=\"IDS Available\" class=\"form-control input-sm\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\ttype=\"number\" />\r\n\t\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-sm-4\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<select value.bind=\"editClientStatus\" class=\"form-control\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\tdata-title=\"Single Select\" data-style=\"btn-default btn-block\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\tdata-menu-style=\"dropdown-blue\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option repeat.for=\"status of config.CLIENT_STATUSES\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalue=\"${status.code}\">${status.description}</option>\r\n\t\t\t\t\t\t\t\t\t\t\t\t</select>\r\n\t\t\t\t\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-lg-3\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<label class=\"form-control-label topMargin\">Client Interval</label>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<input value.bind=\"clientInterval\" id=\"clientInterval\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\tplaceholder=\"Interval\" class=\"form-control input-sm\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\ttype=\"number\" />\r\n\t\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-lg-8\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<label class=\"form-control-label topMargin\">Product</label>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<select class=\"form-control col-lg-8\" value.bind=\"selectedProduct\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\tclick.delegate=\"selectProduct()\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value=\"\">Choose a product</option>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option repeat.for=\"product of products.productsArray\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tmodel.bind=\"product._id\">${product.name}</option>\r\n\t\t\t\t\t\t\t\t\t\t\t\t</select>\r\n\t\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t<div show.bind=\"systems.selectedSystem.clients.length > 0 && !clientSelected\" class=\"col-sm-9\">\r\n\t\t\t\t\t\t\t<div class=\"panel panel-default\">\r\n\t\t\t\t\t\t\t\t<div class=\"panel-body\">\r\n\t\t\t\t\t\t\t\t\t<div style=\"overflow:auto;height:800px;\">\r\n\t\t\t\t\t\t\t\t\t\t<ul>\r\n\t\t\t\t\t\t\t\t\t\t\t<li class=\"list-group-item\"\r\n\t\t\t\t\t\t\t\t\t\t\t\trepeat.for=\"client of systems.selectedSystem.clients | sortArray:'client':'ASC'\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<span class=\"col-sm-7\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h5>Client ${client.client} <span class=\"leftMargin\">IDs:\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t${client.idsAvailable}</span></h5>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t</span>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<span class=\"col-sm-5\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span click.delegate=\"refreshClient($index)\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tclass=\"smallMarginRight\" bootstrap-tooltip\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdata-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdata-original-title=\"Refresh Client\"><i\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tclass=\"fa fa-refresh\" aria-hidden=\"true\"></i></span>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span click.delegate=\"toggleSandBox($index)\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tclass=\"smallMarginRight\" bootstrap-tooltip\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdata-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdata-original-title=\"Toggle Sandbox\"><i class=\"fa fa-users\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\taria-hidden=\"true\"></i></span>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span click.delegate=\"deleteClient($index)\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tclass=\"smallMarginRight\" bootstrap-tooltip\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdata-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdata-original-title=\"Delete Client\"><i class=\"fa fa-trash\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\taria-hidden=\"true\"></i></span>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span click.trigger=\"selectClient(client, $index)\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tclass=\"smallMarginRight\" bootstrap-tooltip\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdata-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdata-original-title=\"Edit Client\"><i class=\"fa fa-pencil\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\taria-hidden=\"true\"></i></span>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span click.trigger=\"updateProduct(client, $index)\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tclass=\"smallMarginRight\" bootstrap-tooltip\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdata-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdata-original-title=\"Update Product\"><i\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tclass=\"fa fa-product-hunt\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\taria-hidden=\"true\"></i></span>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t</span>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<span class=\"col-sm-12\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h7>Product: ${client.productId |\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tlookupValue:products.productsArray:\"_id\":\"name\"}</h7></br>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h7> <span>Assignments: ${client.assignments.length}</span></h7>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h6>Status: ${client.clientStatus |\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tlookupValue:config.CLIENT_STATUSES:\"code\":\"description\"}\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</h6>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t</span>\r\n\r\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t\t</li>\r\n\t\t\t\t\t\t\t\t\t\t</ul>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div show.bind=\"clientSelected\">\r\n\t\t\t\t\t\t\t<compose view=\"./edit-client-form.html\"></compose>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div show.bind=\"!systemDetails\" class=\"col-lg-12\">\r\n\t\t\t\t\t<h3>System: ${systems.selectedSystem.sid}</h3>\r\n\t\t\t\t\t<div class='col-lg-10 col-lg-offset-1'>\r\n\t\t\t\t\t\t<div class=\"bottomMargin list-group-item\">\r\n\t\t\t\t\t\t\t<span click.delegate=\"backAssignmentDetails()\" class=\"smallMarginRight\" bootstrap-tooltip\r\n\t\t\t\t\t\t\t\tdata-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Back\"><i\r\n\t\t\t\t\t\t\t\t\tclass=\"fa fa-arrow-left fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div id=\"no-more-tables2\">\r\n\t\t\t\t\t\t\t<table class=\"table table-striped table-hover cf\">\r\n\t\t\t\t\t\t\t\t<thead class=\"cf\">\r\n\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t<td colspan='5'>\r\n\t\t\t\t\t\t\t\t\t\t\t<span click.delegate=\"downloadExcel()\" class=\"smallMarginRight\"\r\n\t\t\t\t\t\t\t\t\t\t\t\tbootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n\t\t\t\t\t\t\t\t\t\t\t\tdata-original-title=\"Export to Excel\"><i class=\"fa fa-download\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\taria-hidden=\"true\"></i></span>\r\n\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t<th><span class=\"sortable\"\r\n\t\t\t\t\t\t\t\t\t\t\t\tclick.delegate=\"sortOnFaculty($event)\">Faculty</span><span><i\r\n\t\t\t\t\t\t\t\t\t\t\t\t\tclass=\"fa fa-sort\"></i></span></th>\r\n\t\t\t\t\t\t\t\t\t\t<th><span class=\"sortable\"\r\n\t\t\t\t\t\t\t\t\t\t\t\tclick.delegate=\"sortOnInst($event)\">Institution</span><span><i\r\n\t\t\t\t\t\t\t\t\t\t\t\t\tclass=\"fa fa-sort\"></i></span></th>\r\n\t\t\t\t\t\t\t\t\t\t<th class=\"col-sm-1\"><span class=\"sortable\"\r\n\t\t\t\t\t\t\t\t\t\t\t\tclick.delegate=\"sortOnClient($event)\">Client </span><span><i\r\n\t\t\t\t\t\t\t\t\t\t\t\t\tclass=\"fa fa-sort\"></i></span></th>\r\n\t\t\t\t\t\t\t\t\t\t<th>Student IDs</th>\r\n\t\t\t\t\t\t\t\t\t\t<th>Faculty IDs</th>\r\n\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t</thead>\r\n\t\t\t\t\t\t\t\t<tbody>\r\n\t\t\t\t\t\t\t\t\t<tr repeat.for=\"assign of systems.assignmentDetailsArray\">\r\n\t\t\t\t\t\t\t\t\t\t<td data-title=\"Faculty\">${assign.firstName} ${assign.lastName}</td>\r\n\t\t\t\t\t\t\t\t\t\t<td data-title=\"Institution\">${assign.institution}</td>\r\n\t\t\t\t\t\t\t\t\t\t<td data-title=\"Client\">${assign.client}</td>\r\n\t\t\t\t\t\t\t\t\t\t<td data-title=\"StudentIDs\">${assign.studentIds}</td>\r\n\t\t\t\t\t\t\t\t\t\t<td data-title=\"FacultyIDs\">${assign.facultyIds}</td>\r\n\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t</tbody>\r\n\t\t\t\t\t\t\t</table>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/system/components/systemTable.html":
/*!**************************************************************!*\
  !*** ./src/modules/admin/system/components/systemTable.html ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\n    <div class=\"panel panel-info\">\n        <div class=\"panel-body\">\n            <div class=\"row\">\n                <div class='col-lg-10 col-lg-offset-1'>\n                    <div id=\"no-more-tables\">\n                        <table id=\"systemsTable\" class=\"table table-striped table-hover cf\">\n                            <thead class=\"cf\">\n                                <tr colspan='5'>\n                                    <compose view=\"../../../../resources/elements/table-navigation-bar.html\"></compose>\n                                </tr>\n                                <tr>\n                                    <td colspan='5'>\n                                        <span click.delegate=\"refresh()\" class=\"smallMarginRight\" bootstrap-tooltip\n                                            data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Refresh\"><i\n                                                class=\"fa fa-refresh\" aria-hidden=\"true\"></i></span>\n                                        <span click.delegate=\"new()\" class=\"smallMarginRight\" bootstrap-tooltip\n                                            data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"New\"><i\n                                                class=\"fa fa-plus\" aria-hidden=\"true\"></i></span>\n                                        <span click.delegate=\"_cleanUpFilters()\" class=\"smallMarginRight\"\n                                            bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\n                                            data-original-title=\"Clear Filters\"><i class=\"fa fa-filter\" aria-hidden=\"true\"></i></span>\n                                    </td>\n                                </tr>\n                                <tr>\n                                    <th style=\"width:100px;\"><span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'sid'})\">SID\n                                        </span><span><i class=\"fa fa-sort\"></i></span></th>\n                                    <th><span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'description'})\">Description\n                                        </span><span><i class=\"fa fa-sort\"></i></span></th>\n                                    <th><span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'server'})\">Server\n                                        </span><span><i class=\"fa fa-sort\"></i></span></th>\n                                    <th class=\"hidden-xs hidden-sm\">Instance</th>\n                                    <th class=\"hidden-xs hidden-sm\">Status</th>\n                                    <th>Gold Backup</th>\n                                    <th>Gold Backup Date</th>\n                                    <th>Snapshot </th>\n                                    <th>Changes</th>\n                                </tr>\n\n                                <tr>\n                                    <th>\n                                        <input value.bind=\"sidFilterValue\" placeholder=\"SID\" input.delegate=\"dataTable.filterList(sidFilterValue, { type: 'text',  filter: 'sidFilterValue', lookupArray: '', lookupProperty: '', collectionProperty: 'sid', displayProperty: 'sid', matchProperty:'', compare:'match'} )\"\n                                            class=\"form-control\" />\n                                    </th>\n                                    <th>\n                                        <input value.bind=\"descriptionFilterValue\" placeholder=\"Description\"\n                                            input.delegate=\"dataTable.filterList(descriptionFilterValue, { type: 'text',  filter: 'descriptionFilterValue', lookupArray: '', lookupProperty: '', collectionProperty: 'description', displayProperty: 'description', matchProperty:'', compare:'match'} )\"\n                                            class=\"form-control\" />\n                                    </th>\n                                    <th class=\"hidden-xs hidden-sm\">\n                                        <input value.bind=\"serverFilterValue\" placeholder=\"Host name\" input.delegate=\"dataTable.filterList(serverFilterValue, { type: 'text',  filter: 'serverFilterValue', lookupArray: '', lookupProperty: '', collectionProperty: 'server', displayProperty: 'server', matchProperty:'', compare:'match'} )\"\n                                            class=\"form-control\" />\n                                    </th>\n                                    <th class=\"hidden-xs hidden-sm\"></th>\n                                    <th class=\"hidden-xs hidden-sm\">\n                                        <select value.bind=\"activeFilter\" input.delegate=\"dataTable.filterList($event, { type: 'boolean',  filter: 'activeFilter', collectionProperty: 'active', displayProperty: 'active', compare:'boolean'} )\"\n                                            class=\"form-control\">\n                                            <option value=\"\"></option>\n                                            <option value=true>Active</option>\n                                            <option value=false>Inactive</option>\n                                        </select>\n                                    </th>\n                                    <th>\n                                        <select value.bind=\"goldBackupFilter\" input.delegate=\"dataTable.filterList($event, { type: 'boolean',  filter: 'goldBackup', collectionProperty: 'goldBackup', displayProperty: 'goldBackup', compare:'boolean'} )\"\n                                            class=\"form-control\">\n                                            <option value=\"\"></option>\n                                            <option value=true>Backup</option>\n                                            <option value=false>No Backup</option>\n                                        </select>\n                                    </th>\n                                    <th>\n                                        <input type=\"date\" value.bind=\"goldBackupDateFilterValue\" input.delegate=\"dataTable.filterList(goldBackupDateFilterValue, {type: 'date', filter: 'goldBackupDate',  collectionProperty: 'goldBackupDate', compare: 'after'} )\"\n                                            class=\"form-control hidden-sm\" />\n                                    </th>\n                                    <th>\n                                        <select value.bind=\"snapShotFilter\" input.delegate=\"dataTable.filterList($event, { type: 'boolean',  filter: '', collectionProperty: 'snapShot', displayProperty: 'snapShot', compare:'boolean'} )\"\n                                            class=\"form-control\">\n                                            <option value=\"\"></option>\n                                            <option value=true>Snapshot</option>\n                                            <option value=false>No Snapshot</option>\n                                        </select>\n                                    </th>\n                                    <th></th>\n                                </tr>\n                            </thead>\n                            <tbody>\n                                <tr class=\"sortable\" repeat.for=\"system of dataTable.displayArray\">\n                                    <td click.trigger=\"edit($index, $event)\" data-title=\"SID\">${system.sid}</td>\n                                    <td click.trigger=\"edit($index, $event)\" data-title=\"Description\">${system.description}</td>\n                                    <td click.trigger=\"edit($index, $event)\" class=\"hidden-xs hidden-sm\" data-title=\"Server\">${system.server}</td>\n                                    <td click.trigger=\"edit($index, $event)\" class=\"hidden-xs hidden-sm\" data-title=\"Instance\">${system.instance}</td>\n                                    <td click.trigger=\"edit($index, $event)\" class=\"hidden-xs hidden-sm\" data-title=\"Status\">${system.active\n                                        | translateStatus}</td>\n                                    <td data-title=\"Gold\">\n                                        <div class=\"checkbox\">\n                                            <label>\n                                                <input change.delegate=\"saveBackups(system)\" checked.bind=\"system.goldBackup\"\n                                                    type=\"checkbox\">\n                                            </label>\n                                        </div>\n                                    </td>\n                                    <td click.trigger=\"edit($index, $event)\" class=\"hidden-xs hidden-sm\" data-title=\"Gold Date\">${system.goldBackupDate\n                                        | dateFormat}</td>\n                                    <td data-title=\"Snapshot\">\n                                        <div class=\"checkbox\">\n                                            <label>\n                                                <input change.delegate=\"saveBackups(system)\" checked.bind=\"system.snapShot\"\n                                                    type=\"checkbox\">\n                                            </label>\n                                        </div>\n                                    </td>\n                                    <td><button class=\"btn btn-primary btn-xs\" click.trigger=\"openChangeMgt(system)\">Changes</button></td>\n                                </tr>\n                            </tbody>\n                        </table>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</template>\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/system/editChanges.html":
/*!***************************************************!*\
  !*** ./src/modules/admin/system/editChanges.html ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    here\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/system/editProduct.html":
/*!***************************************************!*\
  !*** ./src/modules/admin/system/editProduct.html ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <span id=\"loading\">\r\n        <ul class=\"bokeh\">\r\n            <li></li>\r\n            <li></li>\r\n            <li></li>\r\n        </ul>\r\n    </span>\r\n    <div show.bind=\"dataTable.displayArray && dataTable.displayArray.length || initialLoaded\">\r\n        <div show.bind=\"!productSelected\" class=\"col-lg-12\">\r\n            <compose view=\"./components/productTable.html\"></compose>\r\n        </div> <!-- Table Div -->\r\n        <div show.bind=\"productSelected\" class=\"col-lg-12\">\r\n            <compose view=\"./components/productForm.html\"></compose>\r\n        </div> <!-- Form Div -->\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/system/editSession.html":
/*!***************************************************!*\
  !*** ./src/modules/admin/system/editSession.html ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\n    <div show.bind=\"showScreen == 'sessionTable'\" >\n        <compose view=\"./components/sessionTable.html\"></compose>\n    </div> \n    <div show.bind=\"showScreen == 'editSession'\">\n        <compose view=\"./components/sessionForm.html\"></compose>\n    </div> \n    <div show.bind=\"showScreen == 'editConfig'\">\n        <compose view=\"./components/sessionConfigTable.html\"></compose>\n    </div>\n</template>\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/system/editSystem.html":
/*!**************************************************!*\
  !*** ./src/modules/admin/system/editSystem.html ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <span id=\"loading\">\r\n        <ul class=\"bokeh\">\r\n            <li></li>\r\n            <li></li>\r\n            <li></li>\r\n        </ul>\r\n    </span>\r\n    <div show.bind=\"dataTable.displayArray && dataTable.displayArray.length || initialLoaded\">\r\n        <div show.bind=\"!systemSelected && !showChanges\" class=\"col-lg-12\">\r\n            <compose view=\"./components/systemTable.html\"></compose>\r\n        </div>\r\n        <div show.bind=\"!systemSelected && showChanges && !showChangesForm\" class=\"col-lg-12\">\r\n            <compose view=\"./components/changesTable.html\"></compose>\r\n        </div>\r\n        <div show.bind=\"!systemSelected && showChanges && showChangesForm\" class=\"col-lg-12\">\r\n            <compose view=\"./components/changesForm.html\"></compose>\r\n        </div>\r\n        <div show.bind=\"systemSelected\" class=\"col-lg-12\">\r\n            <compose view=\"./components/systemForm.html\"></compose>\r\n        </div>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/system/system.html":
/*!**********************************************!*\
  !*** ./src/modules/admin/system/system.html ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\n    <compose view='../../../resources/elements/submenu.html'></compose>\n    <div class=\"fluid-container\">\n        <router-view></router-view>\n    </div>\n</template>\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ })

}]);
//# sourceMappingURL=app-141ba57b.2384d3fce1a12a237460.bundle.js.map