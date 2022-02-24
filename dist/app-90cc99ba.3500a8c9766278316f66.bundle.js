"use strict";
(self["webpackChunkclient"] = self["webpackChunkclient"] || []).push([["app-90cc99ba"],{

/***/ "modules/admin/system/editChanges":
/*!*************************************************!*\
  !*** ./src/modules/admin/system/editChanges.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Changes": function() { return /* binding */ Changes; }
/* harmony export */ });
var Changes = function Changes() {};

/***/ }),

/***/ "modules/admin/system/editProduct":
/*!*************************************************!*\
  !*** ./src/modules/admin/system/editProduct.js ***!
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
/* harmony import */ var _resources_data_systems__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../resources/data/systems */ 4077);
/* harmony import */ var _resources_data_products__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../resources/data/products */ 8666);
/* harmony import */ var _resources_data_is4ua__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../resources/data/is4ua */ 5175);
/* harmony import */ var _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../resources/dialogs/common-dialogs */ 6545);
/* harmony import */ var _resources_utils_validation__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../resources/utils/validation */ 2824);
/* harmony import */ var _resources_data_documents__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../resources/data/documents */ 7188);
var _dec, _class;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }











var EditProducts = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_1__.DataTable, _resources_data_products__WEBPACK_IMPORTED_MODULE_5__.Products, _resources_utils_utils__WEBPACK_IMPORTED_MODULE_3__.Utils, _resources_data_systems__WEBPACK_IMPORTED_MODULE_4__.Systems, _resources_data_is4ua__WEBPACK_IMPORTED_MODULE_6__.is4ua, _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_7__.CommonDialogs, _resources_utils_validation__WEBPACK_IMPORTED_MODULE_8__["default"], _config_appConfig__WEBPACK_IMPORTED_MODULE_2__.AppConfig, _resources_data_documents__WEBPACK_IMPORTED_MODULE_9__.DocumentsServices), _dec(_class = /*#__PURE__*/function () {
  // spinnerHTML = "";
  // tabs = [{id: 'Assignments'}, {id: 'Systems'}, {id: 'is4ua'}, {id: 'Documents'}, {id: 'Notes'}, {id: 'Description'}];
  // tabPath = './';
  function EditProducts(datatable, products, utils, systems, is4ua, dialog, validation, config, documents) {
    this.productSelected = false;
    this.filesSelected = "";
    this.interfaceUpdate = false;
    this.showDocumentForm = false;
    this.showDocuments = false;
    this.selectedFiles = void 0;
    this.removedFiles = new Array();
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

  var _proto = EditProducts.prototype;

  _proto.tab = function tab(tabID) {
    $("#tabList").children().removeClass('active');
    $("#TabPanes").children().removeClass('active').removeClass('in');
    $("#Tab" + tabID).addClass('active');
    $("#" + tabID).addClass('active').addClass('in');
  };

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
              return Promise.all([this.products.getProductsArray('?order=name', true), this.systems.getSystemsArray('?order=sid', true), this.is4ua.loadIs4ua(), this.documents.getDocumentsCategoriesArray(), this.config.getConfig()]);

            case 4:
              responses = _context.sent;
              this.dataTable.updateArray(this.products.productsArray);
              this.filteredDocumentArray = this.documents.docCatsArray;
              this.dataTable.createPageButtons(1);
              $('#loading').hide();
              this.initialLoaded = true;

            case 10:
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

  _proto.refresh = /*#__PURE__*/function () {
    var _refresh = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              // this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
              $('#loading').show();
              _context3.next = 3;
              return this.products.getProductsArray('?order=name', true);

            case 3:
              this.dataTable.updateArray(this.products.productsArray); // this.spinnerHTML = "";

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

  _proto.new = /*#__PURE__*/function () {
    var _new2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
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

            case 8:
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

  _proto.edit = /*#__PURE__*/function () {
    var _edit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(index, el) {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              this.editIndex = this.dataTable.getOriginalIndex(index);
              this.products.selectProduct(this.editIndex);
              this.newProduct = false;
              if (!this.products.selectedProduct.systems) this.products.selectedProduct.systems = new Array();
              if (!this.products.selectedProduct.clientInfo) this.products.selectedProduct.clientInfo = "";
              if (!this.products.selectedProduct.productInfo) this.products.selectedProduct.productInfo = "";
              this.camelizedProductName = this.utils.toCamelCase(this.products.selectedProduct.name); //Editing a product

              $("#editClientKey").focus(); //Reset the selected row

              if (this.selectedRow) this.selectedRow.children().removeClass('info');
              this.selectedRow = $(el.target).closest('tr');
              this.selectedRow.children().addClass('info');
              this.productSelected = true;

            case 12:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function edit(_x, _x2) {
      return _edit.apply(this, arguments);
    }

    return edit;
  }();

  _proto.cancel = function cancel() {
    this.products.selectProduct(this.editIndex);
  };

  _proto.save = /*#__PURE__*/function () {
    var _save = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
      var serverResponse, response;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (!this.validation.validate(1)) {
                _context6.next = 16;
                break;
              }

              _context6.next = 3;
              return this.products.saveProduct();

            case 3:
              serverResponse = _context6.sent;

              if (serverResponse.error) {
                _context6.next = 14;
                break;
              }

              if (!(this.systemChanges.length > 0)) {
                _context6.next = 10;
                break;
              }

              if (this.newProduct) {
                this.systemChanges.forEach(function (item) {
                  item.productId = serverResponse._id;
                });
              }

              _context6.next = 9;
              return this.systems.saveProductChanges(this.systemChanges);

            case 9:
              response = _context6.sent;

            case 10:
              this.dataTable.updateArray(this.products.productsArray);
              this.utils.showNotification("Product " + serverResponse.name + " was updated");
              _context6.next = 15;
              break;

            case 14:
              this.utils.showNotification("There was a problem updating the product", 'error');

            case 15:
              this._cleanUp();

            case 16:
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
    var _this = this;

    return this.dialog.showMessage("Are you sure you want to delete the product?", "Delete Product", ['Yes', 'No']).whenClosed(function (response) {
      if (!response.wasCancelled) {
        _this.deleteProduct();
      }
    });
  };

  _proto.deleteProduct = /*#__PURE__*/function () {
    var _deleteProduct = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
      var _this2 = this;

      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              return _context7.abrupt("return", this.dialog.showMessage("Are you sure you want to delete this product?", "Delete Product", ['Yes', 'No']).whenClosed(function (response) {
                if (!response.wasCancelled) {
                  _this2.deleteAProduct();
                }
              }));

            case 1:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function deleteProduct() {
      return _deleteProduct.apply(this, arguments);
    }

    return deleteProduct;
  }();

  _proto.deleteAProduct = /*#__PURE__*/function () {
    var _deleteAProduct = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
      var name, serverResponse;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              name = this.products.selectedProduct.name;
              _context8.next = 3;
              return this.products.deleteProduct();

            case 3:
              serverResponse = _context8.sent;

              if (!serverResponse.error) {
                this.dataTable.updateArray(this.products.productsArray);
                this.utils.showNotification("Product " + name + " was deleted");
              }

              this._cleanUp();

              this.productSelected = false;

            case 7:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    function deleteAProduct() {
      return _deleteAProduct.apply(this, arguments);
    }

    return deleteAProduct;
  }();

  _proto._cleanUp = function _cleanUp() {
    this.newProduct = false;
    this.productSelected = false;
    this.systemChanges = new Array();

    this._cleanUpFilters();

    this.validation.makeAllValid(1);
  };

  _proto._cleanUpFilters = function _cleanUpFilters() {
    this.nameFilterValue = "";
    this.systemFilterValue = "";
    this.activeFilter = "";
    this.sapNameFilterValue = "";
    this.dataTable.updateArray(this.products.productsArray);
  };

  _proto.back = function back() {
    var _this3 = this;

    if (this.products.isDirty().length) {
      return this.dialog.showMessage("The product has been changed. Do you want to save your changes?", "Save Changes", ['Yes', 'No']).whenClosed(function (response) {
        if (!response.wasCancelled) {
          _this3.save();
        } else {
          _this3.productSelected = false;

          _this3._cleanUp();
        }
      });
    } else {
      this.productSelected = false;

      this._cleanUp();
    }
  };

  _proto.addDocument = function addDocument(index) {
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
  };

  _proto.chooseDocument = function chooseDocument(index, event) {
    this.documents.selectDocument(index); //Reset the selected row

    if (this.selectedRow) this.selectedRow.children().removeClass('info');
    this.selectedRow = $(event.target).closest('tr');
    this.selectedRow.children().addClass('info');
    this.showDocumentForm = true;
  };

  _proto.toggleDefault = function toggleDefault(index) {
    this.products.selectedProduct.documents[index].default = !this.products.selectedProduct.documents[index].default;
  };

  _proto.removeDocument = function removeDocument(index) {
    this.products.selectedProduct.documents.splice(index, 1);
  };

  _proto.typeChanged = /*#__PURE__*/function () {
    var _typeChanged = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(index) {
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              if (!(index >= 0)) {
                _context9.next = 7;
                break;
              }

              this.categoryIndex = index;
              this.documents.selectCategory(index);
              _context9.next = 5;
              return this.documents.getDocumentsArray(true, '?filter=categoryCode|eq|' + this.documents.selectedCat.code);

            case 5:
              this.showDocuments = true;
              this.showDocumentForm = false;

            case 7:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, this);
    }));

    function typeChanged(_x3) {
      return _typeChanged.apply(this, arguments);
    }

    return typeChanged;
  }();

  _proto._setupValidation = function _setupValidation() {
    this.validation.addRule(1, "editName", [{
      "rule": "required",
      "message": "Product name is required",
      "value": "products.selectedProduct.name"
    }, {
      "rule": "custom",
      "message": "A product with that name already exists",
      "valFunction": function valFunction(context) {
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
  };

  _proto.changeTab = /*#__PURE__*/function () {
    var _changeTab = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(el, index) {
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              $("#productListGroup.list-group").children().removeClass('menuButtons');
              $("#productListGroup.list-group").children().css("background-color", "");
              $("#productListGroup.list-group").children().css("color", "");
              $(el.target).parent().css("background-color", this.config.BUTTONS_BACKGROUND);
              $(el.target).parent().css("color", this.config.ACTIVE_SUBMENU_COLOR);
              $(".in").removeClass('active').removeClass('in');
              $("#" + el.target.id + "Tab").addClass('in').addClass('active');

            case 7:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, this);
    }));

    function changeTab(_x4, _x5) {
      return _changeTab.apply(this, arguments);
    }

    return changeTab;
  }();

  _proto.systemCustomFilter = function systemCustomFilter(value, item, context) {
    for (var i = 0; i < item.systems.length; i++) {
      if (item.systems[i].sid.toUpperCase().indexOf(value.toUpperCase()) > -1) return true;
    }

    return false;
  };

  return EditProducts;
}()) || _class);

/***/ }),

/***/ "modules/admin/system/editSession":
/*!*************************************************!*\
  !*** ./src/modules/admin/system/editSession.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EditSessions": function() { return /* binding */ EditSessions; }
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

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }










var EditSessions = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(aurelia_router__WEBPACK_IMPORTED_MODULE_1__.Router, _resources_data_sessions__WEBPACK_IMPORTED_MODULE_3__.Sessions, _resources_utils_validation__WEBPACK_IMPORTED_MODULE_4__["default"], _resources_utils_utils__WEBPACK_IMPORTED_MODULE_2__.Utils, _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_5__.DataTable, _config_appConfig__WEBPACK_IMPORTED_MODULE_6__.AppConfig, _resources_data_config__WEBPACK_IMPORTED_MODULE_7__.Config, _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_8__.CommonDialogs), _dec(_class = /*#__PURE__*/function () {
  function EditSessions(router, sessions, validation, utils, datatable, config, siteConfig, dialog) {
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

  var _proto = EditSessions.prototype;

  _proto.attached = function attached() {
    this.toolTips();
  };

  _proto.activate = /*#__PURE__*/function () {
    var _activate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var responses;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return Promise.all([this.sessions.getSessionsArray('?order=startDate:DSC', true), this.config.getConfig(), this.config.getSessions()]);

            case 2:
              responses = _context.sent;
              this.dataTable.updateArray(this.sessions.sessionsArray, 'startDate', -1);
              this.filterOutClosed();

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
              return this.sessions.getSessionsArray('?order=startDate', true);

            case 3:
              this.dataTable.updateArray(this.sessions.sessionsArray, 'startDate', -1);
              this.filterOutClosed();
              this.spinnerHTML = "";

            case 6:
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

  _proto.new = function _new() {
    this.sessions.selectSession();
    this.showScreen = 'editSession';
    this.sessionSelected = true;
    this.editSystem = true;
    this.newSession = true;
    $("#editSession").focus();
    if (this.selectedRow) this.selectedRow.children().removeClass('rowSelected');
  } //User clicked a session to edit
  ;

  _proto.edit = function edit(index, el) {
    //Open edit form
    this.showScreen = 'editSession'; //Save the index of the item to be edited

    this.editIndex = this.dataTable.getOriginalIndex(index);
    this.sessions.selectSession(this.editIndex); //Not a new session

    this.editSession = true;
    $("#editSession").focus(); //Used to update the table appearance during navigation

    if (this.selectedRow) this.selectedRow.children().removeClass('info');
    this.selectedRow = $(el.target).closest('tr');
    this.selectedRow.children().addClass('info');
  };

  _proto.save = /*#__PURE__*/function () {
    var _save = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var serverResponse;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!this.validation.validate(1)) {
                _context3.next = 5;
                break;
              }

              _context3.next = 3;
              return this.sessions.saveSession();

            case 3:
              serverResponse = _context3.sent;

              if (!serverResponse.error) {
                this.dataTable.updateArray(this.sessions.sessionsArray, 'startDate', -1);
                this.utils.showNotification("Session " + this.sessions.selectedSession.session + " " + this.sessions.selectedSession.year + " was updated");
                this.showScreen = 'sessionTable';
                this.toolTips();
              }

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

  _proto.saveSortOrder = function saveSortOrder(session) {
    this.sessions.setSession(session);
    var serverResponse = this.sessions.saveSession();
  };

  _proto.refreshConfig = /*#__PURE__*/function () {
    var _refreshConfig = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return this.config.getSessions(true);

            case 2:
              this.editSessionConfig();

            case 3:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function refreshConfig() {
      return _refreshConfig.apply(this, arguments);
    }

    return refreshConfig;
  }();

  _proto.editSessionConfig = function editSessionConfig() {
    var _this = this;

    this.editSessionConfigArray = new Array();
    this.config.SESSION_PARAMS.forEach(function (item) {
      _this.editSessionConfigArray.push(_this.utils.copyObject(item));
    });
    this.showScreen = 'editConfig';
  };

  _proto.saveConfig = /*#__PURE__*/function () {
    var _saveConfig = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      var _this2 = this;

      var serverResponse;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (!this.editSessionConfigArray) {
                _context5.next = 5;
                break;
              }

              _context5.next = 3;
              return this.siteConfig.saveSessions(this.editSessionConfigArray);

            case 3:
              serverResponse = _context5.sent;

              if (!serverResponse.error) {
                this.editSessionConfigArray.forEach(function (item, index) {
                  _this2.config.SESSION_PARAMS[index] = item;
                });
                this.utils.showNotification("Session configuration updated");
                this.showScreen = 'sessionTable';
              }

            case 5:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function saveConfig() {
      return _saveConfig.apply(this, arguments);
    }

    return saveConfig;
  }();

  _proto.updateStatus = function updateStatus(index, session, el) {
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
  };

  _proto.filterOutClosed = function filterOutClosed() {
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
  };

  _proto._setupValidation = function _setupValidation() {
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
  };

  _proto.cancel = function cancel() {
    this.sessions.selectSession(this.editIndex);
  };

  _proto.cancelConfig = function cancelConfig() {
    var _this3 = this;

    this.editSessionConfigArray = new Array();
    this.config.SESSION_PARAMS.forEach(function (item) {
      _this3.editSessionConfigArray.push(_this3.utils.copyObject(item));
    });
  };

  _proto.backConfig = function backConfig() {
    this.showScreen = 'sessionTable';
  };

  _proto.back = function back() {
    var _this4 = this;

    if (this.sessions.isDirty().length) {
      return this.dialog.showMessage("The session has been changed. Do you want to save your changes?", "Save Changes", ['Yes', 'No']).whenClosed(function (response) {
        if (!response.wasCancelled) {
          _this4.save();
        } else {
          _this4.showScreen = 'sessionTable';
        }
      });
    } else {
      this.showScreen = 'sessionTable';
    }
  };

  _proto.toolTips = function toolTips() {
    $('[data-toggle="tooltip"]').tooltip();
  };

  return EditSessions;
}()) || _class);

/***/ }),

/***/ "modules/admin/system/editSystem":
/*!************************************************!*\
  !*** ./src/modules/admin/system/editSystem.js ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EditSystem": function() { return /* binding */ EditSystem; }
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

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }











var EditSystem = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_resources_data_systems__WEBPACK_IMPORTED_MODULE_3__.Systems, _resources_data_products__WEBPACK_IMPORTED_MODULE_5__.Products, _resources_utils_validation__WEBPACK_IMPORTED_MODULE_6__["default"], _resources_utils_utils__WEBPACK_IMPORTED_MODULE_2__.Utils, _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_7__.DataTable, _config_appConfig__WEBPACK_IMPORTED_MODULE_8__.AppConfig, _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_1__.CommonDialogs, _resources_data_sessions__WEBPACK_IMPORTED_MODULE_4__.Sessions), _dec(_class = /*#__PURE__*/function () {
  function EditSystem(systems, products, validation, utils, datatable, config, dialog, sessions) {
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

  var _proto = EditSystem.prototype;

  _proto.attached = /*#__PURE__*/function () {
    var _attached = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var responses;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              $('#loading').show();
              _context.next = 3;
              return Promise.all([this.systems.getSystemsArray('?order=sid', true), this.products.getProductsArray('?filter=active|eq|true&order=name', true), this.sessions.getSessionsArray(), this.config.getConfig(), this.config.getSessions()]);

            case 3:
              responses = _context.sent;
              this.dataTable.updateArray(this.systems.systemsArray);
              this.clientInterval = this.config.CLIENT_INTERVAL;
              $('#loading').hide();
              $('[data-toggle="tooltip"]').tooltip();
              this.initialLoaded = true;

            case 9:
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

  _proto.refresh = /*#__PURE__*/function () {
    var _refresh = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              $('#loading').show();
              _context3.next = 3;
              return this.systems.getSystemsArray('?order=sid', true);

            case 3:
              this.dataTable.updateArray(this.systems.systemsArray);
              $('#loading').hide();

              this._cleanUpFilters();

            case 6:
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

  _proto.new = function _new() {
    this.editIndex = -1;
    this.systemDetails = true;
    this.displayIndex = -1;
    this.systems.selectSystem();
    this.editStatus = true; // this.saveClients = false;

    $("#editSid").focus();
    this.systemSelected = true;
    this.newSystem = true;
  };

  _proto.edit = /*#__PURE__*/function () {
    var _edit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(index, el) {
      var response;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              this.systemDetails = true;
              this.editIndex = this.dataTable.getOriginalIndex(index);
              _context4.next = 4;
              return this.systems.getSystem(this.editIndex);

            case 4:
              response = _context4.sent;

              if (!response.error) {
                _context4.next = 8;
                break;
              }

              this.utils.showNotification('There was an error retrieving the system', 'error');
              return _context4.abrupt("return");

            case 8:
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

            case 18:
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

  _proto.save = /*#__PURE__*/function () {
    var _save = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      var _this = this;

      var serverResponse;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (!this.validation.validate(1)) {
                _context5.next = 7;
                break;
              }

              this.systems.selectedSystem.sid = this.systems.selectedSystem.sid.toUpperCase();
              this.systems.selectedSystem.server = this.systems.selectedSystem.server.toUpperCase();
              _context5.next = 5;
              return this.systems.saveSystem();

            case 5:
              serverResponse = _context5.sent;

              if (!serverResponse.error) {
                if (this.saveProduct) this.products.saveProduct();

                if (this.productsToUpdate && this.productsToUpdate.length > 0) {
                  this.productsToUpdate.forEach(function (item) {
                    _this.products.selectedProductFromId(item._id);

                    _this.products.selectedProduct.systems = item.systems;

                    _this.products.saveProduct();
                  });
                  this.productsToUpdate = new Array();
                }

                this.utils.showNotification("System " + this.systems.selectedSystem.sid + " was updated");

                this._cleanUp();
              }

            case 7:
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

  _proto.saveBackups = /*#__PURE__*/function () {
    var _saveBackups = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(system) {
      var serverResponse;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              this.systems.setSelectedSystem(system);
              _context6.next = 3;
              return this.systems.saveSystem();

            case 3:
              serverResponse = _context6.sent;

              if (!serverResponse.error) {
                this.utils.showNotification("System " + this.systems.selectedSystem.sid + " was updated");
              }

            case 5:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function saveBackups(_x3) {
      return _saveBackups.apply(this, arguments);
    }

    return saveBackups;
  }();

  _proto.toggleSandBox = function toggleSandBox(index) {
    if (this.systems.selectedSystem.clients[index].assignments.length > 0) {
      this.utils.showNotification("The client has assignments. You must refresh it before changing it's status", 'warning');
    } else {
      this.systems.selectedSystem.clients[index].clientStatus = this.systems.selectedSystem.clients[index].clientStatus == this.config.SANDBOX_CLIENT_CODE ? this.config.UNASSIGNED_CLIENT_CODE : this.config.SANDBOX_CLIENT_CODE;
    }
  };

  _proto.updateProduct = function updateProduct(client, index) {
    var _this2 = this;

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
          this.products.selectedProduct.systems.forEach(function (item) {
            if (item.sid === _this2.systems.selectedSystem.sid) _this2.saveProduct = false;
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
  };

  _proto.updateAllProducts = function updateAllProducts() {
    var _this3 = this;

    if (this.selectedProduct === "") {
      this.utils.showNotification("Select a product first", 'warning');
    } else {
      this.dialog.showMessage("This will only update the products for clients that have no assignments. Continue?", "Refresh Clients", ['Yes', 'No']).whenClosed(function (response) {
        if (!response.wasCancelled) {
          _this3.systems.selectedSystem.clients.forEach(function (item) {
            if (item.assignments.length === 0) {
              item.productId = _this3.selectedProduct;
            }
          });

          _this3.saveProduct = true;

          _this3.products.selectedProductFromId(_this3.selectedProduct);

          if (_this3.products.selectedProduct.systems && _this3.products.selectedProduct.systems.length > 0) {
            _this3.products.selectedProduct.systems.forEach(function (item) {
              if (item.sid === _this3.systems.selectedSystem.sid) _this3.saveProduct = false;
            });
          } else {
            _this3.saveProduct = true;
          }

          if (_this3.saveProduct) {
            _this3.products.selectedProduct.systems.push({
              systemId: _this3.systems.selectedSystem._id,
              sid: _this3.systems.selectedSystem.sid
            });
          }
        }
      });
    }
  };

  _proto.refreshClient = function refreshClient(index) {
    var _this4 = this;

    this.dialog.showMessage("This will return the client to the initial state.  You must save the system for this to take effect. Do you want to continue?", "Refresh Clients", ['Yes', 'No']).whenClosed(function (response) {
      if (!response.wasCancelled) {
        _this4.systems.selectedSystem.clients[index].clientStatus = _this4.config.UNASSIGNED_REQUEST_CODE;
        _this4.systems.selectedSystem.clients[index].assignments = new Array();
        _this4.systems.selectedSystem.clients[index].idsAvailable = _this4.systems.selectedSystem.idsAvailable;
      }
    });
  };

  _proto.delete = function _delete() {
    var _this5 = this;

    this.dialog.showMessage("Are you sure you want to delete the system?", "Delete System", ['Yes', 'No']).whenClosed(function (response) {
      if (!response.wasCancelled) {
        _this5.deleteSystem();
      }
    });
  };

  _proto.deleteSystem = /*#__PURE__*/function () {
    var _deleteSystem = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
      var name, serverResponse;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              name = this.systems.selectedSystem.sid;
              _context7.next = 3;
              return this.systems.deleteSystem();

            case 3:
              serverResponse = _context7.sent;

              if (!serverResponse.error) {
                this.dataTable.updateArray(this.systems.systemsArray);
                this.utils.showNotification("System " + name + " was deleted");
              }

              this._cleanUp();

              this.systemSelected = false;

            case 7:
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

  _proto.editClientsButton = function editClientsButton() {
    this.editClients = !this.editClients;
  };

  _proto.generateClients = function generateClients() {
    var _this6 = this;

    if (this.selectedProduct === "") {
      this.dialog.showMessage("You must select a product.", "Select a Product", ['OK']).whenClosed(function (response) {
        return;
      });
    }

    if (this.idsAvailable === "0") {
      this.dialog.showMessage("You must enter the number of IDs available.", "Enter IDS Available", ['OK']).whenClosed(function (response) {
        return;
      });
    }

    if (!this.editFirstClient || !this.editLastClient || this.editFirstClient.length != 3 || this.editLastClient.length != 3) {
      this.dialog.showMessage("Clients must have three digits", "Invalid Client Number", ['OK']).whenClosed(function (response) {
        return;
      });
    }

    var start = parseInt(this.editFirstClient);
    var end = parseInt(this.editLastClient);

    if (end < start) {
      this.dialog.showMessage("The first client number must be less than the last client number.", "Invalid Client Number", ['OK']).whenClosed(function (response) {
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
        this.products.selectedProduct.systems.forEach(function (item) {
          if (item.sid === _this6.systems.selectedSystem.sid) _this6.saveProduct = false;
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
  };

  _proto.refreshClients = function refreshClients() {
    var _this7 = this;

    if (!this.systems.selectedSystem.clients || this.systems.selectedSystem.clients.length === 0) {
      this.dialog.showMessage("The system doesn't have clients to refresh", "No Clients", ['OK']).whenClosed(function (response) {
        return;
      });
    }

    this.dialog.showMessage("This will return clients to an initial state.  You must save the system for this to take effect. Do you want to continue?", "Refresh Clients", ['Yes', 'No']).whenClosed(function (response) {
      if (!response.wasCancelled) {
        _this7.systems.refreshClients(_this7.config.UNASSIGNED_REQUEST_CODE, _this7.products.productsArray);
      }
    });
  };

  _proto.refreshTheClients = function refreshTheClients() {
    this.systems.refreshClients(this.config.UNASSIGNED_REQUEST_CODE, this.products.productsArray);
    console.log(this.systems.selectedSystem);
  };

  _proto.deleteClients = function deleteClients() {
    var _this8 = this;

    this.dialog.showMessage("Are you sure about this, this action cannot be undone?", "Delete Clients", ['Yes', 'No']).whenClosed(function (response) {
      if (!response.wasCancelled) {
        _this8.deleteAllClients();
      }
    });
  };

  _proto.deleteAllClients = function deleteAllClients() {
    var _this9 = this;

    var id = this.systems.selectedSystem._id;
    this.productsToUpdate = new Array();
    var processedProducts = new Array();
    this.systems.selectedSystem.clients.forEach(function (item) {
      if (item.productId) {
        if (processedProducts.indexOf(item.productId) === -1) {
          processedProducts.push(item.productId);

          _this9.products.selectedProductFromId(item.productId);

          if (_this9.products.selectedProduct._id) {
            _this9.products.selectedProduct.systems.forEach(function (system, index) {
              if (system.systemId === id) {
                _this9.products.selectedProduct.systems.splice(index, 1);

                _this9.productsToUpdate.push(_this9.products.selectedProduct);
              }
            });
          }
        }
      }
    });
    this.systems.deleteAllClients();
    this.utils.showNotification("You must save the system to complete the deletion", 'warning');
  };

  _proto.editAClient = function editAClient(client, index, el) {
    this.selectedClientIndex = index;
    this.selectedClient = client;
    this.systems.selectClient(index);
    if (this.selectedRow) this.selectedRow.children().removeClass('info');
    this.selectedRow = $(el.target).closest('tr');
    this.selectedRow.children().addClass('info');
    this.interfaceUpdate = true;
  };

  _proto.deleteClient = function deleteClient(index) {
    var _this10 = this;

    if (!this._okToDeleteClient(this.systems.selectedSystem.clients[index])) {
      this.utils.showNotification("The client either has assignments or the status doesn't allow deletion. You must refresh it before deleting it.", 'warning');
    } else {
      this.dialog.showMessage("Are you sure about this, this action cannot be undone?", "Delete Clients", ['Yes', 'No']).whenClosed(function (response) {
        if (!response.wasCancelled) {
          var productId = _this10.systems.selectedSystem.clients[index].productId;
          var id = _this10.systems.selectedSystem._id;
          var noUpdates = false;
          _this10.productsToUpdate = new Array();

          if (_this10.systems.selectedSystem.clients.length > 0) {
            for (var i = 0; i < _this10.systems.selectedSystem.clients.length; i++) {
              if (_this10.systems.selectedSystem.clients[i].productId === productId) {
                noUpdates = true;
                break;
              }
            }
          }

          _this10.systems.selectedSystem.clients.splice(index, 1);

          if (!noUpdates) {
            _this10.products.selectedProductFromId(productId);

            _this10.products.selectedProduct.systems.forEach(function (system, index) {
              if (system.systemId === id) {
                _this10.products.selectedProduct.systems.splice(index, 1);

                _this10.productsToUpdate.push(_this10.products.selectedProduct);
              }
            });
          }
        }

        _this10.utils.showNotification("You must save the system to complete the deletion", 'warning');
      });
    }
  };

  _proto._okToDeleteClient = function _okToDeleteClient(client) {
    if (client.assignments.length > 0) return false;
    var status = client.clientStatus;

    for (var i = 0; i < this.config.CLIENT_STATUSES.length; i++) {
      if (this.config.CLIENT_STATUSES[i].code == status && this.config.CLIENT_STATUSES[i].OKToDelete) {
        return true;
      }
    }

    return false;
  };

  _proto.deleteC = /*#__PURE__*/function () {
    var _deleteC = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              this.systems.deleteClient();
              this.utils.showNotification("The client was deleted but you must save the system to complete the deltion");

            case 2:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    function deleteC() {
      return _deleteC.apply(this, arguments);
    }

    return deleteC;
  }();

  _proto.selectClient = function selectClient(client, index) {
    this.selectedClient = this.utils.copyObject(client);
    this.clientSelected = true;
    this.selectedClientIndex = index;
  };

  _proto.backClient = function backClient() {
    this.clientSelected = false;
  };

  _proto.saveClient = function saveClient() {
    var _this11 = this;

    this.systems.selectedSystem.clients[this.selectedClientIndex] = this.selectedClient;
    this.products.selectedProductFromId(this.selectedClient.productId);

    if (this.products.selectedProduct.systems && this.products.selectedProduct.systems.length > 0) {
      this.products.selectedProduct.systems.forEach(function (item) {
        if (item.sid === _this11.systems.selectedSystem.sid) _this11.saveProduct = false;
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
  };

  _proto._cleanUp = function _cleanUp() {
    this.systemSelected = false;
    this.newSystem = false;
    this.clientSelected = false;
    this.editClients = false;
    this.validation.makeAllValid(1);
    this.systemDetails = true;
  };

  _proto._cleanUpFilters = function _cleanUpFilters() {
    this.sidFilterValue = "";
    this.descriptionFilterValue = "";
    this.serverFilterValue = "";
    this.activeFilter = "";
    this.dataTable.updateArray(this.systems.systemsArray);
  };

  _proto.back = function back() {
    var _this12 = this;

    if (this.systems.isDirty(this.originalSystem).length) {
      this.dialog.showMessage("The system has been changed. Do you want to save your changes?", "Save Changes", ['Yes', 'No']).whenClosed(function (response) {
        if (!response.wasCancelled) {
          _this12.save();
        } else {
          _this12._cleanUp();
        }
      });
    } else {
      this._cleanUp();
    }
  };

  _proto.cancel = function cancel() {
    this.systems.selectSystem(this.editIndex);
  };

  _proto._setupValidation = function _setupValidation() {
    this.validation.addRule(1, "editSid", [{
      "rule": "required",
      "message": "SID is required",
      "value": "systems.selectedSystem.sid"
    }, {
      "rule": "custom",
      "message": "A system with that SID and description already exists",
      "valFunction": function valFunction(context) {
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
  };

  _proto.selectProduct = function selectProduct() {
    this.products.selectedProductFromId(this.selectedProduct);
    if (this.products.selectedProduct) this.idsAvailable = this.products.selectedProduct.idsAvailable ? this.products.selectedProduct.idsAvailable : 0;
  };

  _proto.assignmentDetails = /*#__PURE__*/function () {
    var _assignmentDetails = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return this.systems.getAssignmentDetails(this.systems.selectedSystem._id);

            case 2:
              this.systemDetails = false;

            case 3:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, this);
    }));

    function assignmentDetails() {
      return _assignmentDetails.apply(this, arguments);
    }

    return assignmentDetails;
  }();

  _proto.backAssignmentDetails = function backAssignmentDetails() {
    this.systemDetails = true;
  };

  _proto.sortOnFaculty = function sortOnFaculty(el) {
    var _this13 = this;

    this.facultySort = this.facultySort ? this.facultySort * -1 : 1;
    this.systems.assignmentDetailsArray = this.systems.assignmentDetailsArray.sort(function (a, b) {
      return (a.lastName < b.lastName ? -1 : 1) * _this13.facultySort;
    });
    $(".sortable").next().replaceWith('<i class="fa fa-sort"></i>');

    if (this.facultySort < 0) {
      var icon = '<i class="fa fa-sort-amount-desc" aria-hidden="true"></i>';
    } else {
      var icon = '<i class="fa fa-sort-amount-asc" aria-hidden="true"></i>';
    }

    $(el.target).next().replaceWith(icon);
  };

  _proto.sortOnClient = function sortOnClient(el) {
    var _this14 = this;

    this.clientSort = this.clientSort ? this.clientSort * -1 : 1;
    this.systems.assignmentDetailsArray = this.systems.assignmentDetailsArray.sort(function (a, b) {
      return (a.client < b.client ? -1 : 1) * _this14.clientSort;
    });
    $(".sortable").next().replaceWith('<i class="fa fa-sort"></i>');

    if (this.clientSort < 0) {
      var icon = '<i class="fa fa-sort-amount-desc" aria-hidden="true"></i>';
    } else {
      var icon = '<i class="fa fa-sort-amount-asc" aria-hidden="true"></i>';
    }

    $(el.target).next().replaceWith(icon);
  };

  _proto.sortOnInst = function sortOnInst(el) {
    var _this15 = this;

    this.instSort = this.instSort ? this.instSort * -1 : 1;
    this.systems.assignmentDetailsArray = this.systems.assignmentDetailsArray.sort(function (a, b) {
      return (a.institution < b.institution ? -1 : 1) * _this15.instSort;
    });
    $(".sortable").next().replaceWith('<i class="fa fa-sort"></i>');

    if (this.instSort < 0) {
      var icon = '<i class="fa fa-sort-amount-desc" aria-hidden="true"></i>';
    } else {
      var icon = '<i class="fa fa-sort-amount-asc" aria-hidden="true"></i>';
    }

    $(el.target).next().replaceWith(icon);
  };

  _proto.downloadExcel = function downloadExcel() {
    var exportArray = this.systems.assignmentDetailsArray;
    var htmlContent = "<table><tr><th>Faculty</th><th>Institution</th><th>Client</th><th>Student IDs</th><th>FacultyIDs</th></tr>";
    exportArray.forEach(function (item) {
      var line = "<tr><td>" + item.firstName + " " + item.lastName + "</td><td>" + item.institution + "</td><td>" + item.client + "</td><td>" + item.studentIds + "</td><td>" + item.facultyIds + "</td>";
      line += "</tr>";
      htmlContent += line;
    });
    htmlContent += "</table>";
    window.open('data:application/vnd.ms-excel,' + htmlContent);
  };

  _proto.openChangeMgt = /*#__PURE__*/function () {
    var _openChangeMgt = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(system) {
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              this.systems.setSelectedSystem(system);
              _context10.next = 3;
              return this.systems.getChangeArray('?filter=systemId|eq|' + this.systems.selectedSystem._id + '&order=dateCreated:ASC', true);

            case 3:
              this.dataTable.updateArray(this.systems.changeArray);
              this.showChangesForm = false;
              this.showChanges = true;

            case 6:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, this);
    }));

    function openChangeMgt(_x4) {
      return _openChangeMgt.apply(this, arguments);
    }

    return openChangeMgt;
  }();

  _proto.showChangeForm = /*#__PURE__*/function () {
    var _showChangeForm = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(index) {
      return regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return this.systems.getChangeCategoryArray();

            case 2:
              this.systems.selectChange(index);
              this.showChangesForm = true;

            case 4:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11, this);
    }));

    function showChangeForm(_x5) {
      return _showChangeForm.apply(this, arguments);
    }

    return showChangeForm;
  }();

  _proto.openEditCatForm = function openEditCatForm(newOrEdit) {
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
  };

  _proto.saveCategory = /*#__PURE__*/function () {
    var _saveCategory = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
      var serverResponse;
      return regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              if (!this.validation.validate(2)) {
                _context12.next = 6;
                break;
              }

              _context12.next = 3;
              return this.systems.saveChangeCategory();

            case 3:
              serverResponse = _context12.sent;

              if (!serverResponse.error) {
                this.utils.showNotification("The category was saved");
              }

              this.showCategoryForm = false;

            case 6:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12, this);
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
    var _this16 = this;

    if (this.systems.categortInUse()) {
      return this.dialog.showMessage("You can't delete that category because there are exisitng changes that use it.", "Can't Delete Category", ['OK']).then(function (response) {});
    } else {
      return this.dialog.showMessage("Are you sure you want to delete the category?", "Delete Category", ['Yes', 'No']).whenClosed(function (response) {
        if (!response.wasCancelled) {
          _this16.deleteCategory();
        }
      });
    }
  };

  _proto.deleteCategory = /*#__PURE__*/function () {
    var _deleteCategory = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
      var serverResponse;
      return regeneratorRuntime.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _context13.next = 2;
              return this.systems.deleteChangeCategory();

            case 2:
              serverResponse = _context13.sent;

              if (!serverResponse.error) {
                this.utils.showNotification("The category was deleted");
              }

            case 4:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13, this);
    }));

    function deleteCategory() {
      return _deleteCategory.apply(this, arguments);
    }

    return deleteCategory;
  }();

  _proto.backFromChangeForm = function backFromChangeForm() {
    this.showChangesForm = false;
    this.showChanges = true;
  };

  _proto.backFromChangeTable = function backFromChangeTable() {
    this.dataTable.updateArray(this.systems.systemsArray);
    this.showChanges = false;
    this.systemSelected = false;
  };

  _proto.saveChange = /*#__PURE__*/function () {
    var _saveChange = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
      return regeneratorRuntime.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              this.systems.selectedChange.systemId = this.systems.selectedSystem._id;
              this.systems.selectedChange.personId = this.userObj._id;
              _context14.next = 4;
              return this.systems.saveChange();

            case 4:
              this.showChangesForm = false;
              this.showChanges = true;

            case 6:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14, this);
    }));

    function saveChange() {
      return _saveChange.apply(this, arguments);
    }

    return saveChange;
  }();

  _proto.cancelChange = function cancelChange() {
    this.systems.selectChange();
  };

  _proto.deleteChange = /*#__PURE__*/function () {
    var _deleteChange = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15() {
      return regeneratorRuntime.wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              _context15.next = 2;
              return this.systems.deleteChange();

            case 2:
              this.showChangesForm = false;
              this.showChanges = true;

            case 4:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15, this);
    }));

    function deleteChange() {
      return _deleteChange.apply(this, arguments);
    }

    return deleteChange;
  }();

  return EditSystem;
}()) || _class);

/***/ }),

/***/ "modules/admin/system/system":
/*!********************************************!*\
  !*** ./src/modules/admin/system/system.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EditSystem": function() { return /* binding */ EditSystem; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var aurelia_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-router */ 6433);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../config/appConfig */ 1666);
var _dec, _class;




var EditSystem = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(aurelia_router__WEBPACK_IMPORTED_MODULE_1__.Router, _config_appConfig__WEBPACK_IMPORTED_MODULE_2__.AppConfig), _dec(_class = /*#__PURE__*/function () {
  function EditSystem(router, config) {
    this.title = "System";
    this.router = router;
    this.config = config;
  }

  var _proto = EditSystem.prototype;

  _proto.attached = function attached() {
    $(".nav a").on("click", function () {
      $(".nav").find(".active").removeClass("active");
      $(this).parent().addClass("active");
    });
  };

  _proto.activate = function activate() {
    this.config.getConfig(true);
  };

  _proto.configureRouter = function configureRouter(config, router) {
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
  };

  return EditSystem;
}()) || _class);

/***/ }),

/***/ "modules/facco/editPeople":
/*!*****************************************!*\
  !*** ./src/modules/facco/editPeople.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EditPeople": function() { return /* binding */ EditPeople; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../resources/utils/dataTable */ 6847);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
/* harmony import */ var _resources_utils_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../resources/utils/utils */ 8741);
/* harmony import */ var _resources_data_people__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../resources/data/people */ 353);
/* harmony import */ var _resources_data_is4ua__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../resources/data/is4ua */ 5175);
/* harmony import */ var _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../resources/dialogs/common-dialogs */ 6545);
var _dec, _class;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }








var EditPeople = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_1__.DataTable, _config_appConfig__WEBPACK_IMPORTED_MODULE_2__.AppConfig, _resources_data_people__WEBPACK_IMPORTED_MODULE_4__.People, _resources_utils_utils__WEBPACK_IMPORTED_MODULE_3__.Utils, _resources_data_is4ua__WEBPACK_IMPORTED_MODULE_5__.is4ua, _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_6__.CommonDialogs), _dec(_class = /*#__PURE__*/function () {
  function EditPeople(dataTable, config, people, utils, is4ua, dialog) {
    this.spinnerHTML = "";
    this.dataTable = dataTable;
    this.dataTable.initialize(this);
    this.config = config;
    this.utils = utils;
    this.people = people;
    this.is4ua = is4ua;
    this.dialog = dialog;
  }

  var _proto = EditPeople.prototype;

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
              return Promise.all([this.people.getInstitutionPeople('?filter=institutionId|eq|' + this.userObj.institutionId._id + '&order=lastName', true), this.is4ua.loadIs4ua(), this.config.getConfig()]);

            case 2:
              responses = _context.sent;
              this.pageSize = this.config.defaultPageSize;
              this.dataTable.updateArray(this.people.instutionPeopleArray);

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
              return this.people.getInstitutionPeople('?filter=institutionId|eq|' + this.userObj.institutionId._id + '&order=lastName', true);

            case 3:
              this.dataTable.updateArray(this.people.instutionPeopleArray);
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

  _proto.buildAudit = function buildAudit() {
    var _this = this;

    var changes = this.people.isPersonDirty(this.originalPerson);
    changes.forEach(function (item) {
      _this.people.selectedPerson.audit.push({
        property: item.property,
        eventDate: new Date(),
        oldValue: item.oldValue,
        newValue: item.newValue,
        personId: _this.userObj._id
      });
    });
  };

  _proto.save = /*#__PURE__*/function () {
    var _save = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var serverResponse;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              this.buildAudit();
              _context3.next = 3;
              return this.people.savePerson();

            case 3:
              serverResponse = _context3.sent;

              if (!serverResponse.error) {
                if (this.people.selectedPerson.personStatus === '01') this.sendActivateEmail();
                this.people.instutionPeopleArray[this.people.editIndex] = this.utils.copyObject(this.people.selectedPerson);
                this.dataTable.updateArray(this.people.instutionPeopleArray);
                this.utils.showNotification(serverResponse.firstName + " " + serverResponse.lastName + " was updated");
              }

              this.personSelected = false;

            case 6:
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

  _proto.sendActivateEmail = function sendActivateEmail() {
    var email = {
      email: this.people.selectedPerson.email,
      name: this.people.selectedPerson.firstName
    };
    this.people.activateAccountEmail(email);
  };

  _proto.updateStatus = function updateStatus(person) {
    this.people.selectedPersonFromId(person._id, 'i');
    this.originalPerson = this.utils.copyObject(this.people.selectedPerson);

    if (this.people.selectedPerson.personStatus === '01') {
      this.people.selectedPerson.personStatus = '02';
    } else {
      this.people.selectedPerson.personStatus = '01';
    }

    this.save();
  };

  _proto.cancel = function cancel() {
    this.people.selectPerson(this.editIndex);
  };

  _proto.back = function back() {
    var _this2 = this;

    if (this.people.isPersonDirty().length) {
      return this.dialog.showMessage("The account has been changed. Do you want to save your changes?", "Save Changes", ['Yes', 'No']).whenClosed(function (response) {
        if (!response.wasCancelled) {
          _this2.save();
        } else {
          _this2.personSelected = false;
        }
      });
    } else {
      this.personSelected = false;
    }
  };

  _proto.customRoleFilter = function customRoleFilter(value, item) {
    var value = value.toUpperCase();

    for (var i = 0; i < item.roles.length; i++) {
      if (item.roles[i].indexOf(value) > -1) return true;
    }

    return false;
  };

  _proto.customStatusFilter = function customStatusFilter(value, item) {
    var value = value.toUpperCase();

    for (var i = 0; i < item.roles.length; i++) {
      if (item.roles[i].indexOf(value) > -1) return true;
    }

    return false;
  };

  return EditPeople;
}()) || _class);

/***/ }),

/***/ "modules/facco/facco":
/*!************************************!*\
  !*** ./src/modules/facco/facco.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FacCo": function() { return /* binding */ FacCo; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var aurelia_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-router */ 6433);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
var _dec, _class;




var FacCo = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(aurelia_router__WEBPACK_IMPORTED_MODULE_1__.Router, _config_appConfig__WEBPACK_IMPORTED_MODULE_2__.AppConfig), _dec(_class = /*#__PURE__*/function () {
  function FacCo(router, config) {
    this.title = "Faculty Coordinator";
    this.router = router;
    this.config = config;
  }

  var _proto = FacCo.prototype;

  _proto.attached = function attached() {
    $(".nav a").on("click", function () {
      $(".nav").find(".active").removeClass("active");
      $(this).parent().addClass("active");
    });
  };

  _proto.activate = function activate() {
    this.config.getConfig(true);
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
      title: 'People'
    }, {
      route: 'viewRequests',
      moduleId: './viewRequests',
      settings: {
        auth: true,
        roles: []
      },
      nav: true,
      name: 'viewRequests',
      title: 'Clients Requests'
    }, {
      route: 'viewAssignments',
      moduleId: './viewAssignments',
      settings: {
        auth: true,
        roles: []
      },
      nav: true,
      name: 'viewAssignments',
      title: 'Assignments'
    }]);
    this.router = router;
  };

  return FacCo;
}()) || _class);

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

/***/ "modules/admin/system/components/Systems.html":
/*!**********************************************************!*\
  !*** ./src/modules/admin/system/components/Systems.html ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n     <div class=\"col-lg-12 topMargin\">\r\n         <h5 class=\"bottomMargin\">To assign systems to products, you should use the Systems client generation process.</h5>\r\n        <add-systems systemstring.two-way=\"editSystemsString\" systemchanges.two-way=\"systemChanges\" systemsarray.bind=\"systems.systemsArray\"  filteredsystemsarray.bind=\"systems.systemsArray\" selectedproduct.two-way=\"products.selectedProduct\"></add-systems>\r\n    </div>\r\n</template>";
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

/***/ "modules/admin/system/components/productForm.html":
/*!**************************************************************!*\
  !*** ./src/modules/admin/system/components/productForm.html ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div class=\"col-lg-12\">\r\n        <div class=\"panel panel-info positionUnderToolbar\">\r\n            <div class=\"panel-body\">\r\n                <compose view=\"./productFormToolbar.html\"></compose>\r\n                <!-- Nav tabs -->\r\n                <div class=\"smallTopMargin\">\r\n                    <ul class=\"nav nav-tabs\" role=\"tablist\" id=\"tabList\">\r\n                        <li role=\"presentation\" class=\"active\"><a click.trigger=\"tab('home')\" id=\"Tabhome\" href=\"#home\" aria-controls=\"home\" role=\"tab\"\r\n                                data-toggle=\"tab\">Home</a></li>\r\n                        <li role=\"presentation\"><a click.trigger=\"tab('assignments')\" href=\"#assignments\" aria-controls=\"assignments\" role=\"tab\"\r\n                                data-toggle=\"tab\">Assignments</a></li>\r\n                        <!-- <li role=\"presentation\"><a click.trigger=\"tab('systems')\" href=\"#systems\" aria-controls=\"messages\" role=\"tab\"\r\n                                data-toggle=\"tab\">Systems</a></li> -->\r\n                        <!-- <li role=\"presentation\"><a href=\"#settings\" aria-controls=\"settings\" role=\"tab\"\r\n                                data-toggle=\"tab\">Settings</a></li> -->\r\n                    </ul>\r\n\r\n                    <div class=\"tab-content\" id='TabPanes'>\r\n                        <div role=\"tabpanel\" class=\"tab-pane fade in active\" id=\"home\">\r\n                            <compose view=\"./productFormHeader.html\"></compose>\r\n                        </div>\r\n                        <div role=\"tabpanel\" class=\"tab-pane fade\" id=\"assignments\">\r\n                            <compose view=\"./Assignments.html\"></compose>\r\n                        </div>\r\n                        <!-- <div role=\"tabpanel\" class=\"tab-pane fade\" id=\"systems\">\r\n                            <compose view=\"./systems.html\"></compose>\r\n                        </div> -->\r\n                        <!-- <div role=\"tabpanel\" class=\"tab-pane fade\" id=\"settings\">...</div> -->\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <!-- <style>\r\n        .menuButtons {\r\n\t\t\tcolor: ${config.ACTIVE_SUBMENU_COLOR};\r\n\t\t\tbackground-color:${config.BUTTONS_BACKGROUND}\r\n        }\r\n    </style>\r\n    <div class=\"col-lg-12\">\r\n        <compose view=\"./productFormToolbar.html\"></compose>\r\n        <div class=\"panel panel-info positionUnderToolbar\">\r\n            <div class=\"panel-body\">\r\n\r\n                    <compose view=\"./productFormHeader.html\"></compose>\r\n\r\n                            <div class=\"row topMargin\">\r\n                                <div class=\"col-lg-12\">\r\n                                   \r\n                                        <div class=\"panel panel-default\">\r\n                                            <div class=\"panel-body\">\r\n                                                <div class=\"col-lg-2\">\r\n                                                    <div id=\"productListGroup\" class=\"list-group\">\r\n                                                        <a class=\"${ $first ? 'menuButtons' : ''} list-group-item\"\r\n                                                            repeat.for=\"tab of tabs\" href=\"\" class=\"list-group-item\"\r\n                                                            click.delegate=\"changeTab($event, $index)\">\r\n                                                            <h4 id=\"${tab.id}\" class=\"list-group-item-heading\">${tab.id}</h4>\r\n                                                        </a>\r\n                                                    </div>\r\n                                                </div>\r\n\r\n                                                <div class=\"col-lg-10\">\r\n                                                    <div class=\"tab-content\">\r\n                                                        <div repeat.for=\"tab of tabs\" id=\"${tab.id + 'Tab'}\" class=\"${ $first ? 'tab-pane fade in active' : 'tab-pane fade' }\">\r\n                                                            <compose view=\"${tabPath + tab.id + '.html'}\"></compose>\r\n                                                        </div>\r\n                                                    </div>\r\n                                                </div>\r\n                                            </div>\r\n                                        </div>\r\n                                   \r\n                                </div>\r\n                            </div>\r\n                        </form>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div> -->\r\n</template>";
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
var code = "<template>\r\n    <div class=\" topMargin blackText\">\r\n        <!-- <form class=\"form-horizontal topMargin\"> -->\r\n            <!-- Row 1 -->\r\n            <div class=\"row\">\r\n                <div class=\"col-lg-12\">\r\n                    <div class=\"row\">\r\n                        <div class=\"col-lg-3\">\r\n                            <div class=\"form-group\">\r\n                                <label for=\"editName\" class=\"col-sm-3 control-label hideOnPhone\">Name</label>\r\n                                <div class=\"col-sm-8\">\r\n                                    <input value.bind=\"products.selectedProduct.name\" id=\"editName\"\r\n                                        class=\"form-control \" placeholder=\"Name\" type=\"text\" />\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-lg-3\">\r\n                            <div class=\"form-group\">\r\n                                <div class=\"col-sm-8\">\r\n                                    <div class=\"checkbox\">\r\n                                        <label class=\"pull-left\">\r\n                                            <input id=\"activeProduct\" checked.bind=\"products.selectedProduct.active\"\r\n                                                type=\"checkbox\"> Active\r\n                                        </label>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-lg-3\">\r\n                            <div class=\"form-group\">\r\n                                <div class=\"col-sm-8\">\r\n                                    <div class=\"checkbox\">\r\n                                        <label class=\"pull-left\">\r\n                                            <input id=\"apjProduct\" checked.bind=\"products.selectedProduct.apj\"\r\n                                                type=\"checkbox\"> Available in APJ\r\n                                        </label>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                      \r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <compose view=\"./Systems.html\"></compose>\r\n                <!-- <div class=\"col-lg-12\">\r\n                    <table id=\"coursesTable\" class=\"table table-striped table-hover\">\r\n                        <thead>\r\n                            <tr>\r\n                                <th>Document </th>\r\n                                <th>Default</th>\r\n                                <th></th>\r\n                            </tr>\r\n                        </thead>\r\n                        <tbody>\r\n                            <tr repeat.for=\"document of products.selectedProduct.documents\">\r\n                                <td data-title=\"name\">${document.fileName} </td>\r\n                                <td data-title=\"default\" click.trigger=\"toggleDefault($index)\"\r\n                                    innerhtml.bind='document.default | checkBox'></td>\r\n                                <td click.trigger=\"removeDocument($index)\"><i class=\"fa fa-trash\"></i></td>\r\n                            </tr>\r\n                        </tbody>\r\n                    </table>\r\n                    <compose view=\"./Documents.html\"></compose>\r\n                </div> -->\r\n            </div>\r\n            <div class=\"row\">\r\n             \r\n            </div>\r\n        <!-- </form> -->\r\n    </div>\r\n</template>\r\n";
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
var code = "<template>\r\n    <div class=\"panel panel-info\">\r\n        <div class=\"panel-body\">\r\n            <div class=\"row\">\r\n                <div class=\"col-lg-12\" style='padding:15px;'>\r\n                    <div class='row'>\r\n                        <div class='col-lg-10 col-lg-offset-1 bottomMargin'>\r\n                            <div id=\"no-more-tables\">\r\n                                <table id=\"productsTable\" class=\"table table-striped table-hover cf\">\r\n                                    <thead class=\"cf\">\r\n                                        <tr colspan='5'>\r\n                                            <compose view=\"../../../../resources/elements/table-navigation-bar.html\"></compose>\r\n                                        </tr>\r\n                                        <tr>\r\n                                        <tr>\r\n                                            <td colspan='5'>\r\n                                                <span click.delegate=\"refresh()\" class=\"smallMarginRight\"\r\n                                                    bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n                                                    title=\"\" data-original-title=\"Refresh\"><i class=\"fa fa-refresh\"\r\n                                                        aria-hidden=\"true\"></i></span>\r\n                                                <span click.delegate=\"new()\" class=\"smallMarginRight\" bootstrap-tooltip\r\n                                                    data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n                                                    data-original-title=\"New\"><i class=\"fa fa-plus\" aria-hidden=\"true\"></i></span>\r\n                                                <span click.delegate=\"_cleanUpFilters()\" class=\"smallMarginRight\"\r\n                                                    bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n                                                    title=\"\" data-original-title=\"Clear Filters\"><i class=\"fa fa-filter\"\r\n                                                        aria-hidden=\"true\"></i></span>\r\n                                                <!--  <span class=\"pull-right\" id=\"spinner\" innerhtml.bind=\"spinnerHTML\"></span> -->\r\n                                            </td>\r\n                                        </tr>\r\n                                        <tr>\r\n                                            <!-- <th style=\"width:75px;\"><span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'clientKey'})\">Key\r\n                                                </span><i class=\"fa fa-sort\"></i></th> -->\r\n                                            <th><span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'name'})\">Name\r\n                                                </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                                            <th style=\"width:150px;\">SAP Product</th>\r\n                                            <th>Status </th>\r\n                                            <th>Systems</th>\r\n                                        </tr>\r\n                                    </thead>\r\n                                    <tbody>\r\n                                        <tr>\r\n                                            <!-- <th></th> -->\r\n                                            <th>\r\n                                                <input value.bind=\"nameFilterValue\" input.delegate=\"dataTable.filterList(nameFilterValue, { type: 'text',  filter: 'nameFilterValue', collectionProperty: 'name', displayProperty: 'name',  compare:'match'} )\"\r\n                                                    class=\"form-control\" />\r\n                                            </th>\r\n                                            <th>\r\n                                                <select value.bind=\"sapNameFilterValue\" input.delegate=\"dataTable.filterList($event, { type: 'value',  filter: 'sapNameFilter', collectionProperty: 'sapProduct', displayProperty: 'sapProduct',  compare:'match'} )\"\r\n                                                    class=\"form-control \">\r\n                                                    <option value=\"\"></option>\r\n                                                    <option repeat.for=\"product of is4ua.sapProductsArray\" value=\"${product.code}\">${product.description}</option>\r\n                                                </select>\r\n                                            </th>\r\n                                            <th>\r\n                                                <select value.bind=\"activeFilter\" input.delegate=\"dataTable.filterList($event, { type: 'boolean',  filter: 'activeFilter', lookupArray: '', lookupProperty: '', collectionProperty: 'active', displayProperty: 'active', matchProperty:'', compare:'boolean'} )\"\r\n                                                    class=\"form-control\">\r\n                                                    <option value=\"\"></option>\r\n                                                    <option value=\"true\">Active</option>\r\n                                                    <option value=\"false\">Inactive</option>\r\n                                                </select>\r\n                                            </th>\r\n                                            <th>\r\n                                                <input value.bind=\"systemFilterValue\" input.delegate=\"dataTable.filterList(systemFilterValue, { type: 'custom',  filter: systemCustomFilter, collectionProperty: 'systems.sid', compare:'custom'} )\"\r\n                                                    class=\"form-control\" />\r\n                                            </th>\r\n                                        </tr>\r\n                                        <tr class=\"clickable\" click.trigger=\"edit($index, $event)\" repeat.for=\"system of dataTable.displayArray\">\r\n                                            <!-- <td class=\"clickable\" data-title=\"Client Key\">${system.clientKey}</td> -->\r\n                                            <td data-title=\"Name\">${system.name}</td>\r\n                                            <td data-title=\"SAP Product\">${system.sapProduct |\r\n                                                lookupValue:is4ua.sapProductsArray:\"code\":\"description\"}</td>\r\n                                            <td class=\"centerText\" data-title=\"Status\">${system.active |\r\n                                                translateStatus}</td>\r\n                                            <td data-title=\"Systems\">${system.systems | systemList}</td>\r\n                                        </tr>\r\n                                    </tbody>\r\n                                </table>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>";
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
var code = "sessionTable.html\r\n<template>\r\n\t<div class=\"panel panel-info\">\r\n\t\t<div class=\"panel-body\">\r\n\t\t\t<div class=\"row\">\r\n\t\t\t\t<div class='col-lg-10 col-lg-offset-1 bottomMargin'>\r\n\t\t\t\t\t<compose view=\"../../../../resources/elements/table-navigation-bar.html\"></compose>\r\n\t\t\t\t\t<div id=\"no-more-tables\">\r\n\t\t\t\t\t\t<table id=\"sessionsTable\" class=\"table table-striped table-hover cf\">\r\n\t\t\t\t\t\t\t<thead class=\"cf\">\r\n\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t<td colspan='6'>\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"checkbox\">\r\n\t\t\t\t\t\t\t\t\t\t\t<label>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<input checked.bind=\"isChecked\" change.trigger=\"filterOutClosed()\" type=\"checkbox\"> Hide inactive sessions\r\n\t\t\t\t\t\t\t\t\t\t\t</label>\r\n\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t<td colspan='7'>\r\n\t\t\t\t\t\t\t\t\t\t<span click.delegate=\"refresh()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n\t\t\t\t\t\t\t\t\t\t data-placement=\"bottom\" title=\"\" data-original-title=\"Refresh\"><i class=\"fa fa-refresh\" aria-hidden=\"true\"></i></span>\r\n\t\t\t\t\t\t\t\t\t\t<span click.delegate=\"new()\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n\t\t\t\t\t\t\t\t\t\t data-original-title=\"New\"><i class=\"smallMarginRight fa fa-plus\" aria-hidden=\"true\"></i></span>\r\n\t\t\t\t\t\t\t\t\t\t<span click.delegate=\"editSessionConfig()\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n\t\t\t\t\t\t\t\t\t\t title=\"\" data-original-title=\"Config\"><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></span>\r\n\t\t\t\t\t\t\t\t\t\t<span class=\"pull-right\" id=\"spinner\" innerhtml.bind=\"spinnerHTML\"></span>\r\n\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t<th><span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'session'})\">Session\r\n\t\t\t\t\t\t\t\t\t\t</span> <span><i class=\"fa fa-sort\"></i></span></th>\r\n\t\t\t\t\t\t\t\t\t<th><span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'startDate'})\">Start Date\r\n\t\t\t\t\t\t\t\t\t\t</span><span><i class=\"fa fa-sort\"></i></span></th>\r\n\t\t\t\t\t\t\t\t\t<th><span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'endDate'})\">End Date\r\n\t\t\t\t\t\t\t\t\t\t</span><span><i class=\"fa fa-sort\"></i></span></th>\r\n\t\t\t\t\t\t\t\t\t<th><span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'requestsOpenDate'})\">Requests\r\n\t\t\t\t\t\t\t\t\t\t\tOpen </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n\t\t\t\t\t\t\t\t\t<th><span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'sortOrder'})\">Sort Order\r\n\t\t\t\t\t\t\t\t\t\t</span><span><i class=\"fa fa-sort\"></i></span></th>\r\n\t\t\t\t\t\t\t\t\t<th>Status</th>\r\n\t\t\t\t\t\t\t\t\t<th></th>\r\n\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t</thead>\r\n\t\t\t\t\t\t\t<tbody>\r\n\t\t\t\t\t\t\t\t<tr repeat.for=\"session of dataTable.displayArray\">\r\n\t\t\t\t\t\t\t\t\t<td data-title=\"Session\" click.trigger=\"edit($index, $event)\">${session.session} - ${session.year}</td>\r\n\t\t\t\t\t\t\t\t\t<td data-title=\"StartDate\" click.trigger=\"edit($index, $event)\">\r\n\t\t\t\t\t\t\t\t\t\t<div style=\"width: 100px\">${session.startDate | dateFormat:config.DATE_FORMAT_TABLE}</div>\r\n\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t<td data-title=\"EndDate\" click.trigger=\"edit($index, $event)\">\r\n\t\t\t\t\t\t\t\t\t\t<div style=\"width: 100px\">${session.endDate | dateFormat:config.DATE_FORMAT_TABLE}</div>\r\n\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t<td data-title=\"RequestsOpen\" click.trigger=\"edit($index, $event)\">\r\n\t\t\t\t\t\t\t\t\t\t<div style=\"width: 100px\">${session.requestsOpenDate | dateFormat:config.DATE_FORMAT_TABLE}</div>\r\n\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t<td> <Input change.trigger=\"saveSortOrder(session)\" type=\"number\" value.bind=\"session.sortOrder\" /> </td>\r\n\t\t\t\t\t\t\t\t\t<td data-title=\"createdDate\" click.trigger=\"edit($index, $event)\">${session.sessionStatus}</td>\r\n\t\t\t\t\t\t\t\t\t<td data-title=\"Update\" style=\"width: 100px\" click.trigger=\"updateStatus($index, session, $event)\"\r\n\t\t\t\t\t\t\t\t\t innerhtml.bind=\"session.sessionStatus | sessionStatusButton\">\r\n\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t</tbody>\r\n\t\t\t\t\t\t</table>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n\t</div>\r\n</template>";
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
var code = "<template>\r\n    <div class=\"panel panel-info\">\r\n        <div class=\"panel-body\">\r\n            <div class=\"row\">\r\n                <div class='col-lg-10 col-lg-offset-1'>\r\n                    <div id=\"no-more-tables\">\r\n                        <table id=\"systemsTable\" class=\"table table-striped table-hover cf\">\r\n                            <thead class=\"cf\">\r\n                                <tr colspan='5'>\r\n                                    <compose view=\"../../../../resources/elements/table-navigation-bar.html\"></compose>\r\n                                </tr>\r\n                                <tr>\r\n                                    <td colspan='5'>\r\n                                        <span click.delegate=\"refresh()\" class=\"smallMarginRight\" bootstrap-tooltip\r\n                                            data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Refresh\"><i\r\n                                                class=\"fa fa-refresh\" aria-hidden=\"true\"></i></span>\r\n                                        <span click.delegate=\"new()\" class=\"smallMarginRight\" bootstrap-tooltip\r\n                                            data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"New\"><i\r\n                                                class=\"fa fa-plus\" aria-hidden=\"true\"></i></span>\r\n                                        <span click.delegate=\"_cleanUpFilters()\" class=\"smallMarginRight\"\r\n                                            bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n                                            data-original-title=\"Clear Filters\"><i class=\"fa fa-filter\" aria-hidden=\"true\"></i></span>\r\n                                    </td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <th style=\"width:100px;\"><span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'sid'})\">SID\r\n                                        </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                                    <th><span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'description'})\">Description\r\n                                        </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                                    <th><span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'server'})\">Server\r\n                                        </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                                    <th class=\"hidden-xs hidden-sm\">Instance</th>\r\n                                    <th class=\"hidden-xs hidden-sm\">Status</th>\r\n                                    <th>Gold Backup</th>\r\n                                    <th>Gold Backup Date</th>\r\n                                    <th>Snapshot </th>\r\n                                    <th>Changes</th>\r\n                                </tr>\r\n\r\n                                <tr>\r\n                                    <th>\r\n                                        <input value.bind=\"sidFilterValue\" placeholder=\"SID\" input.delegate=\"dataTable.filterList(sidFilterValue, { type: 'text',  filter: 'sidFilterValue', lookupArray: '', lookupProperty: '', collectionProperty: 'sid', displayProperty: 'sid', matchProperty:'', compare:'match'} )\"\r\n                                            class=\"form-control\" />\r\n                                    </th>\r\n                                    <th>\r\n                                        <input value.bind=\"descriptionFilterValue\" placeholder=\"Description\"\r\n                                            input.delegate=\"dataTable.filterList(descriptionFilterValue, { type: 'text',  filter: 'descriptionFilterValue', lookupArray: '', lookupProperty: '', collectionProperty: 'description', displayProperty: 'description', matchProperty:'', compare:'match'} )\"\r\n                                            class=\"form-control\" />\r\n                                    </th>\r\n                                    <th class=\"hidden-xs hidden-sm\">\r\n                                        <input value.bind=\"serverFilterValue\" placeholder=\"Host name\" input.delegate=\"dataTable.filterList(serverFilterValue, { type: 'text',  filter: 'serverFilterValue', lookupArray: '', lookupProperty: '', collectionProperty: 'server', displayProperty: 'server', matchProperty:'', compare:'match'} )\"\r\n                                            class=\"form-control\" />\r\n                                    </th>\r\n                                    <th class=\"hidden-xs hidden-sm\"></th>\r\n                                    <th class=\"hidden-xs hidden-sm\">\r\n                                        <select value.bind=\"activeFilter\" input.delegate=\"dataTable.filterList($event, { type: 'boolean',  filter: 'activeFilter', collectionProperty: 'active', displayProperty: 'active', compare:'boolean'} )\"\r\n                                            class=\"form-control\">\r\n                                            <option value=\"\"></option>\r\n                                            <option value=true>Active</option>\r\n                                            <option value=false>Inactive</option>\r\n                                        </select>\r\n                                    </th>\r\n                                    <th>\r\n                                        <select value.bind=\"goldBackupFilter\" input.delegate=\"dataTable.filterList($event, { type: 'boolean',  filter: 'goldBackup', collectionProperty: 'goldBackup', displayProperty: 'goldBackup', compare:'boolean'} )\"\r\n                                            class=\"form-control\">\r\n                                            <option value=\"\"></option>\r\n                                            <option value=true>Backup</option>\r\n                                            <option value=false>No Backup</option>\r\n                                        </select>\r\n                                    </th>\r\n                                    <th>\r\n                                        <input type=\"date\" value.bind=\"goldBackupDateFilterValue\" input.delegate=\"dataTable.filterList(goldBackupDateFilterValue, {type: 'date', filter: 'goldBackupDate',  collectionProperty: 'goldBackupDate', compare: 'after'} )\"\r\n                                            class=\"form-control hidden-sm\" />\r\n                                    </th>\r\n                                    <th>\r\n                                        <select value.bind=\"snapShotFilter\" input.delegate=\"dataTable.filterList($event, { type: 'boolean',  filter: '', collectionProperty: 'snapShot', displayProperty: 'snapShot', compare:'boolean'} )\"\r\n                                            class=\"form-control\">\r\n                                            <option value=\"\"></option>\r\n                                            <option value=true>Snapshot</option>\r\n                                            <option value=false>No Snapshot</option>\r\n                                        </select>\r\n                                    </th>\r\n                                    <th></th>\r\n                                </tr>\r\n                            </thead>\r\n                            <tbody>\r\n                                <tr class=\"clickable\" repeat.for=\"system of dataTable.displayArray\">\r\n                                    <td click.trigger=\"edit($index, $event)\" data-title=\"SID\">${system.sid}</td>\r\n                                    <td click.trigger=\"edit($index, $event)\" data-title=\"Description\">${system.description}</td>\r\n                                    <td click.trigger=\"edit($index, $event)\" class=\"hidden-xs hidden-sm\" data-title=\"Server\">${system.server}</td>\r\n                                    <td click.trigger=\"edit($index, $event)\" class=\"hidden-xs hidden-sm\" data-title=\"Instance\">${system.instance}</td>\r\n                                    <td click.trigger=\"edit($index, $event)\" class=\"hidden-xs hidden-sm\" data-title=\"Status\">${system.active\r\n                                        | translateStatus}</td>\r\n                                    <td data-title=\"Gold\">\r\n                                        <div class=\"checkbox\">\r\n                                            <label>\r\n                                                <input change.delegate=\"saveBackups(system)\" checked.bind=\"system.goldBackup\"\r\n                                                    type=\"checkbox\">\r\n                                            </label>\r\n                                        </div>\r\n                                    </td>\r\n                                    <td click.trigger=\"edit($index, $event)\" class=\"hidden-xs hidden-sm\" data-title=\"Gold Date\">${system.goldBackupDate\r\n                                        | dateFormat}</td>\r\n                                    <td data-title=\"Snapshot\">\r\n                                        <div class=\"checkbox\">\r\n                                            <label>\r\n                                                <input change.delegate=\"saveBackups(system)\" checked.bind=\"system.snapShot\"\r\n                                                    type=\"checkbox\">\r\n                                            </label>\r\n                                        </div>\r\n                                    </td>\r\n                                    <td><button class=\"btn btn-primary btn-xs\" click.trigger=\"openChangeMgt(system)\">Changes</button></td>\r\n                                </tr>\r\n                            </tbody>\r\n                        </table>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>";
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
var code = "<template>\r\n    <div show.bind=\"showScreen == 'sessionTable'\" class=\"col-lg-12\">\r\n        <compose view=\"./components/sessionTable.html\"></compose>\r\n    </div> <!-- Table Div -->\r\n    <div show.bind=\"showScreen == 'editSession'\" class=\"col-lg-12\">\r\n        <compose view=\"./components/sessionForm.html\"></compose>\r\n    </div> <!-- Form Div -->\r\n    <div show.bind=\"showScreen == 'editConfig'\" class=\"col-lg-12\">\r\n        <compose view=\"./components/sessionConfigTable.html\"></compose>\r\n    </div>\r\n</template>";
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
var code = "<template>\r\n    <compose view='../../../resources/elements/submenu.html'></compose>\r\n    <div class=\"col-lg-12\">\r\n        <router-view></router-view>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/facco/components/assignmentsTable.html":
/*!************************************************************!*\
  !*** ./src/modules/facco/components/assignmentsTable.html ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t\t<div class=\"col-lg-12\">\r\n\t\t\t\t<compose view=\"../../../resources/elements/table-navigation-bar.html\"></compose>\r\n\t\t\t\t  <div id=\"no-more-tables\">\r\n\t\t\t\t\t<table class=\"table table-striped table-hover cf\">\r\n\t\t\t\t\t  <thead class=\"cf\">\r\n\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t  <td colspan='7'>\r\n\t\t\t\t\t\t\t<span click.delegate=\"refresh()\" class=\"smallMarginRight\"><i class=\"fa fa-refresh\" aria-hidden=\"true\"></i></span>\r\n\t\t\t\t\t\t\t<span class=\"pull-right\" id=\"spinner\" innerhtml.bind=\"spinnerHTML\"></span>\r\n\t\t\t\t\t\t  </td>\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t  <th class=\"col-lg-1\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'dateRequired'})\">Due </span><i class=\"fa fa-sort\"></i></th>\r\n\t\t\t\t\t\t  <th class=\"col-lg-1\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'dateRequested'})\">Created </span><i class=\"fa fa-sort\"></i></th>\r\n\t\t\t\t\t\t  <th class=\"col-lg-1\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'dateAssigned'})\">Assigned </span><i class=\"fa fa-sort\"></i></th>\r\n\t\t\t\t\t\t  <th class=\"col-lg-2\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'product'})\">Product </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n\t\t\t\t\t\t  <th>System</th>\r\n\t\t\t\t\t\t  <th><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'client'})\"></span>Client</th>\r\n\t\t\t\t\t\t  <th>Student IDS/Passwords</th>\r\n\t\t\t\t\t\t  <th>Faculty IDS/Passwords</th>\r\n\t\t\t\t\t\t\t<th class=\"col-lg-2\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'lastName'})\">Faculty </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n\t\t\t\t\t\t\t<th class=\"col-lg-1\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'course'})\">Course </span><i class=\"fa fa-sort\"></i></th>\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t  </thead>\r\n\t\t\t\t\t  <tbody>\r\n\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t<th>\r\n\t\t\t\t\t\t\t\t<input value.bind=\"requiredDateFilter\" change.delegate=\"dataTable.filterList(requiredDateFilter, { type: 'date',  filter: 'requiredDateFilter', collectionProperty: 'dateRequired', compare:'after' })\" type=\"date\" class=\"form-control datepicker\" data-dateformat=config.DATE_FORMAT_TABLE>\r\n\t\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t\t<th>\r\n\t\t\t\t\t\t\t\t<input value.bind=\"createdDateFilter\" change.delegate=\"dataTable.filterList(createdDateFilter, { type: 'date',  filter: 'createdDateFilter', collectionProperty: 'dateRequested', compare:'after' })\" type=\"date\" class=\"form-control datepicker\" data-dateformat=config.DATE_FORMAT_TABLE>\r\n\t\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t\t<th>\r\n\t\t\t\t\t\t\t\t<input value.bind=\"assigneddDateFilter\" change.delegate=\"dataTable.filterList(assigneddDateFilter, { type: 'date',  filter: 'assigneddDateFilter', collectionProperty: 'dateAssigned', compare:'after' })\" type=\"date\" class=\"form-control datepicker\" data-dateformat=config.DATE_FORMAT_TABLE>\r\n\t\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t\t<th>\r\n\t\t\t\t\t\t\t\t<input value.bind=\"productFilterValue\" input.delegate=\"dataTable.filterList(productFilterValue, { type: 'custom',  filter: customProductNameFilter,  compare:'custom'} )\"\r\n                class=\"form-control\" />\r\n\t\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t\t<th>\r\n\t\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t\t<th>\r\n\t\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t\t<th>\r\n\t\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t\t<th></th>\r\n\t\t\t\t\t\t\t<th>\r\n\t\t\t\t\t\t\t\t<input value.bind=\"helpTicketTypeFilterValue\" input.delegate=\"dataTable.filterList(helpTicketTypeFilterValue, { type: 'custom',  filter: customNameFilter,  compare:'custom'} )\"  class=\"form-control\" />\r\n\t\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t\t<th>\r\n\t\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t<tr click.trigger=\"selectRequest($index, $event, request)\" repeat.for=\"request of dataTable.displayArray\">\r\n\t\t\t\t\t\t  <td data-title=\"Required Date\">${request.dateRequired | dateFormat:config.DATE_FORMAT_TABLE}</td>\r\n\t\t\t\t\t\t  <td data-title=\"Date Created\">${request.dateRequested | dateFormat:config.DATE_FORMAT_TABLE}</td>\r\n\t\t\t\t\t\t  <td data-title=\"Date Created\">${request.dateAssigned | dateFormat:config.DATE_FORMAT_TABLE}</td>\r\n\t\t\t\t\t\t  <td data-title=\"Product\">${request.product }</td>\r\n\t\t\t\t\t\t  <td data-title=\"System\">${request.systemId | lookupValue:systems.systemsArray:\"_id\":\"sid\"}</td>\r\n\t\t\t\t\t\t  <td data-title=\"Client\">${request.client}</td>\r\n\t\t\t\t\t\t  <td data-title=\"Student IDs\"><p>${request.studentUserIds} </p> ${request.studentPasswords}</td>\r\n\t\t\t\t\t\t  <td data-title=\"Faculty IDs\"><p>${request.facultyUserIds} </p> ${request.facultyPasswords}</td>\r\n\t\t\t\t\t\t\t<td data-title=\"Person\">${request.person}</td>\r\n\t\t\t\t\t\t\t<td data-title=\"Course\">${request.course}</td>\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t  </tbody>\r\n\t\t\t\t\t</table>\r\n\t\t\t\t  </div>\r\n\t\t\t\t</div>\r\n\t\t\t  </div>\r\n\t\t\t  </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/facco/components/peopleTable.html":
/*!*******************************************************!*\
  !*** ./src/modules/facco/components/peopleTable.html ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n   <div class='col-lg-10 col-lg-offset-1 bottomMargin'>\r\n      <compose view=\"../../../resources/elements/table-navigation-bar.html\"></compose>\r\n      <div id=\"no-more-tables\">\r\n          <table class=\"table table-striped table-hover cf\">\r\n              <thead class=\"cf\">\r\n                  <tr>\r\n                      <td colspan='7'>\r\n                          <span click.delegate=\"refresh()\" class=\"smallMarginRight\"><i class=\"fa fa-refresh\" aria-hidden=\"true\"></i></span>\r\n                          <span class=\"pull-right\" id=\"spinner\" innerhtml.bind=\"spinnerHTML\"></span>\r\n                      </td>\r\n                  </tr>\r\n                  <tr>\r\n                      <th style=\"width:20rem;\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'lastName'})\">Name </span><i class=\"fa fa-sort\"></i></th>\r\n                      <th style=\"width:15rem;\">Phone</th>\r\n                      <th style=\"width:15rem;\">Mobile</th>\r\n                      <th style=\"width:20rem;\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'email'})\">Email </span> <i class=\"fa fa-sort\"></i></th>\r\n                      <th>Role</th>\r\n                      <th>Status</th>\r\n                      <th>Change Status</th>\r\n                  </tr>\r\n              </thead>\r\n              <tbody>\r\n                  <tr>\r\n                      <th>\r\n                          <input value.bind=\"nameFilterValue\" input.delegate=\"dataTable.filterList(nameFilterValue, { type: 'text',  filter: 'nameFilter', collectionProperty: 'fullName', compare:'match'} )\"  class=\"form-control\" />\r\n                      </th>\r\n                      <th></th>\r\n                      <th></th>\r\n                      <th></th>\r\n                      <th>\r\n                         <input value.bind=\"roleFilter\" input.delegate=\"dataTable.filterList(roleFilter, { type: 'custom', filter: customRoleFilter, compare: 'custom'})\"  class=\"form-control\" />\r\n                      </th>\r\n                      <th>\r\n                          <select value.bind=\"personStatusFilter\" input.delegate=\"dataTable.filterList($event, { type: 'value',  filter: 'personStatusFilter',  collectionProperty: 'personStatus', displayProperty: 'personStatus',  compare:'match'} )\" class=\"form-control\" >\r\n                              <option value=\"\"></option>\r\n                              <option repeat.for='status of is4ua.personStatusArray' value='${status.code}'>${status.description}</option>\r\n                          </select>\r\n                      </th>\r\n                      <th></th>\r\n                  </tr>\r\n                  <tr  repeat.for=\"person of dataTable.displayArray\">\r\n                      <td  data-title=\"Name\">${person.fullName}</td>\r\n                      <td  data-title=\"Phone\">${person.phone | phoneNumber}</td>\r\n                      <td  data-title=\"Phone\">${person.mobile | phoneNumber}</td>\r\n                      <td  data-title=\"Email\">${person.email}</td>\r\n                      <td  data-title=\"Role\">${person.roles}</td>\r\n                      <td  data-title=\"Status\">${person.personStatus | lookupValue:is4ua.personStatusArray:\"code\":\"description\"}</td>\r\n                      <td data-title=\"Update\" style=\"width: 100px\" click.trigger=\"updateStatus(person)\" innerhtml.bind=\"person.personStatus | personStatusButton\">\r\n                  </tr>\r\n              </tbody>\r\n          </table>\r\n      </div>\r\n  </div>\r\n</template>\r\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/facco/components/requestDetailDetails.html":
/*!****************************************************************!*\
  !*** ./src/modules/facco/components/requestDetailDetails.html ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t<div class=\"col-lg-5\" show.bind=\"showRequest\">\r\n    \t<div class=\"panel panel-primary topMargin\">\r\n      \t\t<div class=\"panel-heading\">\r\n        \t\t<h3 class=\"panel-title\">${selectedProductID | lookupValue:products.productsArray:\"_id\":\"name\"}</h3>\r\n      \t\t</div>\r\n\t      \t<div class=\"panel-body\">\r\n\t        \t<h5>Request status: ${requests.selectedRequestDetail.requestStatus | lookupValue:config.REQUEST_STATUS:\"code\":\"desscription\"}</h5>\r\n\t        \t<h5>Assigned system: ${requests.selectedRequestDetail.assignment.systemId | lookupValue:systems.systemsArray:\"_id\":\"sid\"}</h5>\r\n\t        \t<h5>Assigned client: ${requests.selectedRequestDetail.assignment.clientId | lookupValue:systems.systemsArray:\"_id\":\"sid\"}</h5>\r\n\t      \t</div>\r\n    \t</div>\r\n  \t</div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/facco/components/requestsTable.html":
/*!*********************************************************!*\
  !*** ./src/modules/facco/components/requestsTable.html ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n<div class=\"col-lg-10 col-lg-offset-1\">\r\n    <compose view=\"../../../resources/elements/table-navigation-bar.html\"></compose>\r\n      <div id=\"no-more-tables\">\r\n        <table class=\"table table-striped table-hover cf\">\r\n          <thead class=\"cf\">\r\n            <tr>\r\n              <td colspan='7'>\r\n                <span click.delegate=\"refresh()\" class=\"smallMarginRight\"><i class=\"fa fa-refresh\" aria-hidden=\"true\"></i></span>\r\n                <span class=\"pull-right\" id=\"spinner\" innerhtml.bind=\"spinnerHTML\"></span>\r\n              </td>\r\n            </tr>\r\n            <tr>\r\n              <th class=\"col-xs-1\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'requestNo'})\">No </span> <i class=\"fa fa-sort\"></i></th>\r\n              <th class=\"col-lg-1\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'requiredDate'})\">Due </span><i class=\"fa fa-sort\"></i></th>\r\n              <th class=\"col-lg-1\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'createdDate'})\">Created </span><i class=\"fa fa-sort\"></i></th>\r\n              <th class=\"col-lg-1\">Type</th>\r\n              <th class=\"col-lg-1\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'requestStatus'})\">Status </span><i class=\"fa fa-sort\"></i></th>\r\n              <th class=\"col-sm-1\">IDS Requestd</th>\r\n              <th class=\"col-lg-2\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'productId.name'})\">Product </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n              <th class=\"col-lg-2\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {type: 'custom', sorter: customPersonSorter, propertyName: 'requestId.personId.lastName'})\">Faculty </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n              <th class=\"col-lg-2\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'course'})\">Course </span><i class=\"fa fa-sort\"></i></th>\r\n            </tr>\r\n          </thead>\r\n          <tbody>\r\n            <tr>\r\n              <th></th>\r\n              <th>\r\n                <input value.bind=\"requiredDateFilter\" change.delegate=\"dataTable.filterList(requiredDateFilter, { type: 'date',  filter: 'requiredDateFilter', collectionProperty: 'requiredDate', compare:'after' })\" type=\"date\" class=\"form-control datepicker\" data-dateformat=config.DATE_FORMAT_TABLE>\r\n              </th>\r\n              <th>\r\n                <input value.bind=\"createdDateFilter\" change.delegate=\"dataTable.filterList(createdDateFilter, { type: 'date',  filter: 'createdDateFilter', collectionProperty: 'createdDate', compare:'after' })\" type=\"date\" class=\"form-control datepicker\" data-dateformat=config.DATE_FORMAT_TABLE>\r\n              </th>\r\n              <th>\r\n           \t\t<select value.bind=\"courseFilter\" input.delegate=\"dataTable.filterList($event, { type: 'custom',  filter: courseCustomFilter,  collectionProperty: 'requestId.courseId', displayProperty: 'courseId',  compare:'custom'} )\" class=\"form-control\" >\r\n                \t<option value=\"\"></option>\r\n                   <option  value=\"${config.SANDBOX_ID}\">Sandbox</option>\r\n                   <option  value=\"Regular\">Regular</option>\r\n              \t</select>\r\n              </th>\r\n              <th>\r\n               \t<select value.bind=\"requestStatusFilter\" input.delegate=\"dataTable.filterList($event, { type: 'value',  filter: 'requestStatusFilter',  collectionProperty: 'requestStatus', displayProperty: 'requestStatus',  compare:'match'} )\" class=\"form-control\" >\r\n\t                  <option value=\"\"></option>\r\n\t                   <option repeat.for=\"status of config.REQUEST_STATUS\" value=\"${status.code}\">${status.description}</option>\r\n\t              </select>\r\n              </th>\r\n              <th></th>\r\n              <th>\r\n                <input value.bind=\"productFilterValue\" input.delegate=\"dataTable.filterList(productFilterValue, { type: 'custom',  filter: customProductNameFilter,  compare:'custom'} )\"\r\n                class=\"form-control\" />\r\n              </th>\r\n              <th>\r\n                <input value.bind=\"helpTicketTypeFilterValue\" input.delegate=\"dataTable.filterList(helpTicketTypeFilterValue, { type: 'custom',  filter: customNameFilter,  compare:'custom'} )\"  class=\"form-control\" />\r\n              </th>\r\n              <th></th>\r\n            </tr>\r\n            <tr click.trigger=\"selectRequest($index, $event, request)\" repeat.for=\"request of dataTable.displayArray\">\r\n              <td data-title=\"Request No\">${request.requestNo}</td>\r\n              <td data-title=\"Required Date\">${request.requiredDate | dateFormat:config.DATE_FORMAT_TABLE}</td>\r\n              <td data-title=\"Date Created\">${request.createdDate | dateFormat:config.DATE_FORMAT_TABLE}</td>\r\n              <td data-title=\"Course\">${request.requestId.courseId | sandbox:config.SANDBOX_NAME}</td>\r\n              <td data-title=\"Status\">${request.requestStatus | lookupValue:config.REQUEST_STATUS:\"code\":\"description\"}</td>\r\n              <td data-title=\"IDs Requested\">${request.requestId | idsRequested}</td>\r\n              <td data-title=\"Product\">${request.productId.name }</td>\r\n              <td data-title=\"Person\">${request.requestId.personId.fullName}</td>\r\n              <td data-title=\"Course\">${request.course}</td>\r\n            </tr>\r\n          </tbody>\r\n        </table>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/facco/components/viewAssignmentsTable.html":
/*!****************************************************************!*\
  !*** ./src/modules/facco/components/viewAssignmentsTable.html ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t<div class=\"row\">\r\n\t\t<div class=\"col-lg-4\">\r\n\t\t\t<div class=\"form-group topMargin leftMargin\">\r\n\t\t\t\t<select value.bind=\"selectedSession\" change.delegate=\"getAssignments()\" id=\"session\" class=\"form-control\">\r\n\t\t\t\t<option value=\"\">Select a session</option>\r\n\t\t\t\t<option repeat.for=\"session of sessions.sessionsArray\"\r\n\t\t\t\t\t\tvalue.bind=\"session._id\">Session ${session.session} - ${session.year}</option>\r\n\t\t\t\t</select>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t</div>\r\n\t\r\n\t\t<div show.bind=\"selectedSession != ''\">\r\n\t\t\t<div class=\"row\">\r\n\t\t\t<div class=\"col-lg-12\">\r\n\t\t\t\t<!-- Request Table -->\r\n\t\t\t\t<compose view=\"./assignmentsTable.html\"></compose>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/facco/components/viewRequestsTable.html":
/*!*************************************************************!*\
  !*** ./src/modules/facco/components/viewRequestsTable.html ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t<div class=\"row\">\r\n      <div class=\"col-lg-4\">\r\n        <div class=\"form-group topMargin leftMargin\">\r\n            <select value.bind=\"selectedSession\" change.delegate=\"getRequests()\" id=\"session\" class=\"form-control\">\r\n              <option value=\"\">Select a session</option>\r\n              <option repeat.for=\"session of sessions.sessionsArray\"\r\n                      value.bind=\"session._id\">Session ${session.session} - ${session.year}</option>\r\n            </select>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n      <div show.bind=\"selectedSession != ''\">\r\n        <div class=\"row\">\r\n          <div class=\"col-lg-12\">\r\n            <!-- Request Table -->\r\n            <compose view=\"./requestsTable.html\"></compose>\r\n          </div>\r\n      </div>\r\n  </div>\r\n\r\n  <compose view=\"./requestDetailDetails.html\"></compose>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/facco/editPeople.html":
/*!*******************************************!*\
  !*** ./src/modules/facco/editPeople.html ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n  <div class=\"panel panel-info\">\r\n    <div class=\"panel-body\">\r\n      <div class=\"row\">\r\n          <div class=\"col-lg-12\">\r\n              <compose view=\"./components/peopleTable.html\"></compose>\r\n          </div>\r\n    </div>\r\n</template>\r\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/facco/facco.html":
/*!**************************************!*\
  !*** ./src/modules/facco/facco.html ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <compose view='../../resources/elements/submenu.html'></compose>\r\n    <div class=\"col-lg-12\">\r\n        <router-view></router-view>\r\n    </div>\r\n</template>\r\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ })

}]);
//# sourceMappingURL=app-90cc99ba.3500a8c9766278316f66.bundle.js.map