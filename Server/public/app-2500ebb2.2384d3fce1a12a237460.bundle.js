"use strict";
(self["webpackChunkuccss_old_new"] = self["webpackChunkuccss_old_new"] || []).push([["app-2500ebb2"],{

/***/ 6545:
/*!*************************************************!*\
  !*** ./src/resources/dialogs/common-dialogs.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CommonDialogs: function() { return /* binding */ CommonDialogs; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var aurelia_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-dialog */ "aurelia-dialog");
/* harmony import */ var _message_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./message-dialog */ "resources/dialogs/message-dialog");
/* harmony import */ var _note_dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./note-dialog */ "resources/dialogs/note-dialog");
/* harmony import */ var _email_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./email-dialog */ "resources/dialogs/email-dialog");
/* harmony import */ var _document_dialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./document-dialog */ "resources/dialogs/document-dialog");
/* harmony import */ var _password_dialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./password-dialog */ "resources/dialogs/password-dialog");
/* harmony import */ var _event_dialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./event-dialog */ "resources/dialogs/event-dialog");
/* harmony import */ var _input_dialog__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./input-dialog */ "resources/dialogs/input-dialog");
/* harmony import */ var _helpTicket_dialog__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./helpTicket-dialog */ "resources/dialogs/helpTicket-dialog");
var _dec, _class;










let CommonDialogs = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(aurelia_dialog__WEBPACK_IMPORTED_MODULE_1__.DialogService), _dec(_class = class CommonDialogs {
  constructor(dialogService) {
    this.noteBody = "";
    this.dialogService = dialogService;
  }
  showMessage(message, title, options) {
    if (title === void 0) {
      title = 'Message';
    }
    if (options === void 0) {
      options = ['Ok'];
    }
    return this.dialogService.open({
      viewModel: _message_dialog__WEBPACK_IMPORTED_MODULE_2__.MessageDialog,
      model: {
        message,
        title,
        options
      }
    });
  }
  showNote(title, note, options) {
    if (title === void 0) {
      title = 'Enter Note';
    }
    return this.dialogService.open({
      viewModel: _note_dialog__WEBPACK_IMPORTED_MODULE_3__.NoteDialog,
      model: {
        title,
        note,
        options
      }
    });
  }
  showEmail(title, email, options) {
    if (title === void 0) {
      title = 'Enter Email';
    }
    return this.dialogService.open({
      viewModel: _email_dialog__WEBPACK_IMPORTED_MODULE_4__.EmailDialog,
      model: {
        title,
        email,
        options
      }
    });
  }
  showDocument(title, documents, options) {
    if (title === void 0) {
      title = "Select Document";
    }
    return this.dialogService.open({
      viewModel: _document_dialog__WEBPACK_IMPORTED_MODULE_5__.DocumentDialog,
      model: {
        title,
        documents,
        options
      }
    });
  }
  showPassword(title, passwords, options) {
    if (title === void 0) {
      title = "Change Password";
    }
    return this.dialogService.open({
      viewModel: _password_dialog__WEBPACK_IMPORTED_MODULE_6__.PasswordDialog,
      model: {
        title,
        passwords,
        options
      }
    });
  }
  showEvent(title, event, options) {
    if (title === void 0) {
      title = 'Enter Event';
    }
    return this.dialogService.open({
      viewModel: _event_dialog__WEBPACK_IMPORTED_MODULE_7__.EventDialog,
      model: {
        title,
        event,
        options
      }
    });
  }
  input(title, value, options) {
    if (title === void 0) {
      title = 'Enter Value';
    }
    return this.dialogService.open({
      viewModel: _input_dialog__WEBPACK_IMPORTED_MODULE_8__.InputDialog,
      model: {
        title,
        value,
        options
      }
    });
  }
  showCloseHelpTicket(title, helpTicket, options) {
    if (title === void 0) {
      title = "Close Help Ticket";
    }
    return this.dialogService.open({
      viewModel: _helpTicket_dialog__WEBPACK_IMPORTED_MODULE_9__.HelpTicketDialog,
      model: {
        title,
        helpTicket,
        options
      }
    });
  }
}) || _class);

/***/ }),

/***/ "resources/dialogs/document-dialog":
/*!**************************************************!*\
  !*** ./src/resources/dialogs/document-dialog.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DocumentDialog: function() { return /* binding */ DocumentDialog; }
/* harmony export */ });
/* harmony import */ var aurelia_dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-dialog */ "aurelia-dialog");
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _data_documents__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../data/documents */ 7188);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
var _dec, _class;




let DocumentDialog = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_1__.inject)(aurelia_dialog__WEBPACK_IMPORTED_MODULE_0__.DialogController, _data_documents__WEBPACK_IMPORTED_MODULE_2__.DocumentsServices, _config_appConfig__WEBPACK_IMPORTED_MODULE_3__.AppConfig), _dec(_class = class DocumentDialog {
  constructor(dialogController, documents, config) {
    this.dialogController = dialogController;
    this.documents = documents;
    this.config = config;
  }
  activate(model) {
    this.model = model;
    this.filteredDocumentArray = model.documents.documentCats;
  }
  selectOption(option) {
    if (isCancel(option)) {
      this.dialogController.cancel(option);
    } else {
      this.dialogController.ok(this.model);
    }
  }
  filterList() {
    if (this.filter) {
      var thisFilter = this.filter;
      this.filteredDocumentArray = this.model.documents.documentCats.filter(item => {
        return item.description.substring(0, thisFilter.length).toUpperCase() === thisFilter.toUpperCase();
      });
    } else {
      this.filteredDocumentArray = this.model.documents.documentCats;
    }
  }
  async typeChanged(index) {
    if (index >= 0) {
      this.categoryIndex = index;
      this.documents.selectCategory(index);
      await this.documents.getDocumentsArray(true, '?filter=categoryCode|eq|' + this.documents.selectedCat.code);
      this.showDocuments = true;
    }
  }
  chooseDocument(index, event) {
    this.documents.selectDocument(index);

    //Reset the selected row
    if (this.selectedRow) this.selectedRow.children().removeClass('info');
    this.selectedRow = $(event.target).closest('tr');
    this.selectedRow.children().addClass('info');
    this.showDocumentForm = true;
  }
  addDocument(index) {
    // if(!this.selectedDocuments) this.selectedDocuments = new Array();
    for (var i = 0; i < this.model.documents.documents.length; i++) {
      if (this.model.documents.documents[i].fileName == this.documents.selectedDocument.files[index].fileName) {
        return;
      }
    }
    var newDoc = {
      categoryCode: this.documents.selectedDocument.categoryCode,
      categoryName: this.documents.selectedDocument.name,
      fileName: this.documents.selectedDocument.files[index].fileName,
      default: true
    };
    this.model.documents.documents.push(newDoc);
  }
  removeDocument(index) {
    this.selectedDocuments.splice(index, 1);
  }
}) || _class);
function isCancel(option) {
  return ['cancel', 'no'].indexOf(option.toLowerCase()) !== -1;
}

/***/ }),

/***/ "resources/dialogs/email-dialog":
/*!***********************************************!*\
  !*** ./src/resources/dialogs/email-dialog.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EmailDialog: function() { return /* binding */ EmailDialog; }
/* harmony export */ });
/* harmony import */ var aurelia_dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-dialog */ "aurelia-dialog");
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
var _dec, _class;



let EmailDialog = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_1__.inject)(aurelia_dialog__WEBPACK_IMPORTED_MODULE_0__.DialogController, _config_appConfig__WEBPACK_IMPORTED_MODULE_2__.AppConfig), _dec(_class = class EmailDialog {
  constructor(dialogController, config) {
    this.editorid = void 0;
    this.dialogController = dialogController;
    this.config = config;
  }
  activate(model) {
    this.model = model;
  }
  selectProduct(product, index) {
    $("#" + this.editorid).summernote('editor.restoreRange');
    $("#" + this.editorid).summernote('editor.focus');
    $("#" + this.editorid).summernote('editor.insertText', product.productId.name);
    if (!this.model.email.productsSelected) this.model.email.productsSelected = new Array();
    product.index = index;
    this.model.email.productsSelected.push(product);
  }
  selectOption(option) {
    if (isCancel(option)) {
      this.dialogController.cancel(option);
    } else {
      this.dialogController.ok(this.model);
    }
  }
}) || _class);
function isCancel(option) {
  return ['cancel', 'no'].indexOf(option.toLowerCase()) !== -1;
}

/***/ }),

/***/ "resources/dialogs/event-dialog":
/*!***********************************************!*\
  !*** ./src/resources/dialogs/event-dialog.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EventDialog: function() { return /* binding */ EventDialog; }
/* harmony export */ });
/* harmony import */ var aurelia_dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-dialog */ "aurelia-dialog");
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
var _dec, _class;



let EventDialog = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_1__.inject)(aurelia_dialog__WEBPACK_IMPORTED_MODULE_0__.DialogController, _config_appConfig__WEBPACK_IMPORTED_MODULE_2__.AppConfig), _dec(_class = class EventDialog {
  constructor(dialogController, config) {
    this.flatpickrConfig = {
      enableTime: true
    };
    this.dialogController = dialogController;
    this.config = config;
  }
  activate(model) {
    this.model = model;
  }
  attached() {
    $(this.titleInput).focus();
  }
  selectOption(option) {
    if (isCancel(option)) {
      this.dialogController.cancel(option);
    } else {
      this.dialogController.ok(this.model);
    }
  }
}) || _class);
function isCancel(option) {
  return ['cancel', 'no'].indexOf(option.toLowerCase()) !== -1;
}

/***/ }),

/***/ "resources/dialogs/helpTicket-dialog":
/*!****************************************************!*\
  !*** ./src/resources/dialogs/helpTicket-dialog.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HelpTicketDialog: function() { return /* binding */ HelpTicketDialog; }
/* harmony export */ });
/* harmony import */ var aurelia_dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-dialog */ "aurelia-dialog");
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
var _dec, _class;



let HelpTicketDialog = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_1__.inject)(aurelia_dialog__WEBPACK_IMPORTED_MODULE_0__.DialogController, _config_appConfig__WEBPACK_IMPORTED_MODULE_2__.AppConfig), _dec(_class = class HelpTicketDialog {
  constructor(dialogController, config) {
    this.dialogController = dialogController;
    this.config = config;
    this.otherReason = "";
    this.method = "";
  }
  activate(model) {
    this.model = model;
    this.model.selectedReason = "";
  }
  selectOption(option) {
    if (isCancel(option)) {
      this.dialogController.cancel(option);
    } else {
      this.dialogController.ok(this.model);
    }
  }
  reasonSelected() {
    if (this.model.selectedReason == this.config.HELP_TICKET_CLOSE_REASON_OTHER) {
      setTimeout(() => {
        $("#otherReason").focus();
      }, 200);
    } else {
      $("#method").focus();
    }
  }
}) || _class);
function isCancel(option) {
  return ['cancel', 'no'].indexOf(option.toLowerCase()) !== -1;
}

/***/ }),

/***/ "resources/dialogs/input-dialog":
/*!***********************************************!*\
  !*** ./src/resources/dialogs/input-dialog.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InputDialog: function() { return /* binding */ InputDialog; }
/* harmony export */ });
/* harmony import */ var aurelia_dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-dialog */ "aurelia-dialog");
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
var _dec, _class;



let InputDialog = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_1__.inject)(aurelia_dialog__WEBPACK_IMPORTED_MODULE_0__.DialogController, _config_appConfig__WEBPACK_IMPORTED_MODULE_2__.AppConfig), _dec(_class = class InputDialog {
  constructor(dialogController, config) {
    this.flatpickrConfig = {
      enableTime: true
    };
    this.dialogController = dialogController;
    this.config = config;
  }
  activate(model) {
    this.model = model;
  }
  attached() {
    $(this.valueInput).focus();
  }
  selectOption(option) {
    if (isCancel(option)) {
      this.dialogController.cancel(option);
    } else {
      this.dialogController.ok(this.model);
    }
  }
}) || _class);
function isCancel(option) {
  return ['cancel', 'no'].indexOf(option.toLowerCase()) !== -1;
}

/***/ }),

/***/ "resources/dialogs/message-dialog":
/*!*************************************************!*\
  !*** ./src/resources/dialogs/message-dialog.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MessageDialog: function() { return /* binding */ MessageDialog; }
/* harmony export */ });
/* harmony import */ var aurelia_dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-dialog */ "aurelia-dialog");
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
var _dec, _class;



let MessageDialog = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_1__.inject)(aurelia_dialog__WEBPACK_IMPORTED_MODULE_0__.DialogController, _config_appConfig__WEBPACK_IMPORTED_MODULE_2__.AppConfig), _dec(_class = class MessageDialog {
  constructor(dialogController, config) {
    this.dialogController = dialogController;
    this.config = config;
  }
  activate(model) {
    this.model = model;
  }
  selectOption(option) {
    if (isCancel(option)) {
      this.dialogController.cancel(option);
    } else {
      this.dialogController.ok(option);
    }
  }
}) || _class);
function isCancel(option) {
  return ['cancel', 'no'].indexOf(option.toLowerCase()) !== -1;
}

/***/ }),

/***/ "resources/dialogs/note-dialog":
/*!**********************************************!*\
  !*** ./src/resources/dialogs/note-dialog.js ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NoteDialog: function() { return /* binding */ NoteDialog; }
/* harmony export */ });
/* harmony import */ var aurelia_dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-dialog */ "aurelia-dialog");
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
var _dec, _class;



let NoteDialog = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_1__.inject)(aurelia_dialog__WEBPACK_IMPORTED_MODULE_0__.DialogController, _config_appConfig__WEBPACK_IMPORTED_MODULE_2__.AppConfig), _dec(_class = class NoteDialog {
  constructor(dialogController, config) {
    this.dialogController = dialogController;
    this.config = config;
  }
  activate(model) {
    this.model = model;
  }
  selectOption(option) {
    if (isCancel(option)) {
      this.dialogController.cancel(option);
    } else {
      this.dialogController.ok(this.model);
    }
  }
}) || _class);
function isCancel(option) {
  return ['cancel', 'no'].indexOf(option.toLowerCase()) !== -1;
}

/***/ }),

/***/ "resources/dialogs/password-dialog":
/*!**************************************************!*\
  !*** ./src/resources/dialogs/password-dialog.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PasswordDialog: function() { return /* binding */ PasswordDialog; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var aurelia_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-dialog */ "aurelia-dialog");
/* harmony import */ var _resources_utils_validation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../resources/utils/validation */ 2824);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
var _dec, _class;




let PasswordDialog = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(aurelia_dialog__WEBPACK_IMPORTED_MODULE_1__.DialogController, _resources_utils_validation__WEBPACK_IMPORTED_MODULE_2__["default"], _config_appConfig__WEBPACK_IMPORTED_MODULE_3__.AppConfig), _dec(_class = class PasswordDialog {
  constructor(dialogController, validation, config) {
    this.dialogController = dialogController;
    this.config = config;
    this.validation = validation;
    this.validation.initialize(this);
    this._setupValidation();
    this.thresholdLength = 6;
    this.threshold = 3;
  }
  activate(model) {
    this.model = model;
  }
  passwordComplexity() {
    var newValue = this.password;
    this.longPassword = newValue.length >= this.thresholdLength;
    let strength = 0;
    strength += /[A-Z]+/.test(newValue) ? 1 : 0;
    strength += /[a-z]+/.test(newValue) ? 1 : 0;
    strength += /[0-9]+/.test(newValue) ? 1 : 0;
    strength += /[\W]+/.test(newValue) ? 1 : 0;
    this.complexPassword = strength >= this.threshold && this.longPassword;
    this.validation.validate(4);
  }
  _setupValidation() {
    this.validation.addRule(1, "register_password", [{
      "rule": "required",
      "message": "Password is required",
      "value": "password"
    }]);
    this.validation.addRule(1, "register_password_repeat", [{
      "rule": "custom",
      "message": "Passwords must match",
      "valFunction": function (context) {
        return context.password === context.password_repeat;
      }
    }], true);
    this.validation.addRule(4, "register_password", [{
      "rule": "custom",
      "message": "Insufficient Complexity",
      "valFunction": function (context) {
        return context.complexPassword;
      }
    }]);
  }
  selectOption(option) {
    if (isCancel(option)) {
      this.dialogController.cancel(option);
    } else {
      if (this.validation.validate(1)) {
        this.model.password = this.password;
        this.model.password_repeat = this.password_repeat;
        this.dialogController.ok(this.model);
      }
    }
  }
}) || _class);
function isCancel(option) {
  return ['cancel', 'no'].indexOf(option.toLowerCase()) !== -1;
}

/***/ }),

/***/ "resources/editor/editor":
/*!****************************************!*\
  !*** ./src/resources/editor/editor.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Editor: function() { return /* binding */ Editor; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var aurelia_binding__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-binding */ 6778);
/* harmony import */ var summernote__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! summernote */ 9912);
/* harmony import */ var summernote__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(summernote__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! jquery */ 5311);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_3__);
var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;
function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }




let Editor = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(Element, aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.ObserverLocator), _dec2 = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.bindable)({
  defaultBindingMode: aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.bindingMode.twoWay
}), _dec(_class = (_class2 = class Editor {
  constructor(element, observerLocator) {
    _initializerDefineProperty(this, "value", _descriptor, this);
    _initializerDefineProperty(this, "height", _descriptor2, this);
    _initializerDefineProperty(this, "editorid", _descriptor3, this);
    _initializerDefineProperty(this, "toolbar", _descriptor4, this);
    this.editor = null;
    this.element = element;
    this.subscriptions = [observerLocator.getObserver(this, 'value').subscribe(newValue => {
      if (this.editor && newValue !== this.editor.summernote('code')) {
        this.editor.summernote('code', newValue);
      }
    })];
  }
  attached() {
    var that = this;
    this.editor = jquery__WEBPACK_IMPORTED_MODULE_3___default()(`#${this.editorid}`);
    this.editor.data('view-model', this);
    this.editor.summernote({
      height: this.height,
      toolbar: this.toolbar,
      callbacks: {
        onChange: function (contents) {
          that.value = contents;
          jquery__WEBPACK_IMPORTED_MODULE_3___default()("#" + this.editorid).summernote('editor.saveRange');
        },
        onFocus: function (contents) {
          console.log('');
        }
        // onPaste: function(e) {
        // 	var node = document.createElement('p');
        // 	// @param {Node} node
        // 	$('#summernote').summernote('insertNode', node);
        // 	console.log('Called event paste');
        // }
      }
    });

    this.editor.summernote('code', this.value);
  }
  detached() {
    this.editor.summernote('destroy');
  }
  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }
}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "value", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "height", [aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 250;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "editorid", [aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return "summernote-" + this.guid();
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "toolbar", [aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [['style', ['style', 'bold', 'clear']], ['color', ['color']], ['font', ['strikethrough', 'superscript', 'subscript']], ['fontsize', ['fontsize']], ['layout', ['ul', 'ol', 'paragraph']], ['insert', ['picture', 'link', 'table', 'hello']], ['misc', ['undo', 'redo', 'fullscreen']]];
  }
})), _class2)) || _class);

/***/ }),

/***/ "resources/elements/add-systems":
/*!***********************************************!*\
  !*** ./src/resources/elements/add-systems.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AddSystems: function() { return /* binding */ AddSystems; }
/* harmony export */ });
/* harmony import */ var _data_dataServices__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data/dataServices */ 5086);
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;
function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }



let AddSystems = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_1__.inject)(_data_dataServices__WEBPACK_IMPORTED_MODULE_0__.DataServices), _dec(_class = (_class2 = class AddSystems {
  constructor(data) {
    this.filter = "";
    this.enable = false;
    _initializerDefineProperty(this, "selectedproduct", _descriptor, this);
    _initializerDefineProperty(this, "systemsarray", _descriptor2, this);
    _initializerDefineProperty(this, "filteredsystemsarray", _descriptor3, this);
    _initializerDefineProperty(this, "systemstring", _descriptor4, this);
    _initializerDefineProperty(this, "systemchanges", _descriptor5, this);
    this.data = data;
    //  this.systemsArray = this.systemsarray;
  }

  enableEdit() {
    this.enable = true;
  }
  filterList() {
    if (this.filter) {
      var thisFilter = this.filter;
      this.filteredsystemsarray = this.systemsarray.filter(item => {
        return item.sid.substring(0, thisFilter.length).toUpperCase() === thisFilter.toUpperCase();
      });
    } else {
      this.filteredsystemsarray = this.systemsarray;
    }
  }
  selectSystem(el, system) {
    if (this.enable) {
      if (!this._systemAlreadySelected(system.sid)) {
        this.systemchanges.push({
          productId: this.selectedproduct._id,
          systemId: system._id,
          operation: "add"
        });
        this.selectedproduct.systems.push({
          sid: system.sid,
          systemId: system._id
        });
      }
    }
  }
  _systemAlreadySelected(sid) {
    for (var i = 0; i < this.selectedproduct.systems.length; i++) {
      if (this.selectedproduct.systems[i].sid === sid) return true;
    }
    return false;
  }
  removeSystem(el, system) {
    if (this.enable) {
      for (var i = 0; i < this.selectedproduct.systems.length; i++) {
        if (system.systemId === this.selectedproduct.systems[i].systemId) {
          for (var j = 0; j < this.systemchanges.length; j++) {
            if (this.systemchanges[j].systemId === system.systemId) break;
          }
          if (this.systemChanges && j === this.systemChanges.length) {
            this.systemchanges.splice(j, 1);
          } else {
            this.systemchanges.push({
              productId: this.selectedproduct._id,
              systemId: system.systemId,
              operation: "delete"
            });
          }
          this.selectedproduct.systems.splice(i, 1);
          break;
        }
      }
    }
  }
}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "selectedproduct", [aurelia_framework__WEBPACK_IMPORTED_MODULE_1__.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "systemsarray", [aurelia_framework__WEBPACK_IMPORTED_MODULE_1__.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "filteredsystemsarray", [aurelia_framework__WEBPACK_IMPORTED_MODULE_1__.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "systemstring", [aurelia_framework__WEBPACK_IMPORTED_MODULE_1__.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "systemchanges", [aurelia_framework__WEBPACK_IMPORTED_MODULE_1__.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);

/***/ }),

/***/ "resources/elements/flat-picker":
/*!***********************************************!*\
  !*** ./src/resources/elements/flat-picker.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FlatPickerCustomElement: function() { return /* binding */ FlatPickerCustomElement; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var flatpickr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flatpickr */ 7545);
var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;
function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }


let FlatPickerCustomElement = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(Element), _dec2 = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.bindable)({
  defaultBindingMode: aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.bindingMode.twoWay
}), _dec(_class = (_class2 = class FlatPickerCustomElement {
  constructor(element) {
    this.backgroundColor = 'white';
    _initializerDefineProperty(this, "config", _descriptor, this);
    _initializerDefineProperty(this, "startdate", _descriptor2, this);
    _initializerDefineProperty(this, "enddate", _descriptor3, this);
    _initializerDefineProperty(this, "controlid", _descriptor4, this);
    _initializerDefineProperty(this, "disabled", _descriptor5, this);
    _initializerDefineProperty(this, "value", _descriptor6, this);
    this.element = element;
  }
  bind() {
    const defaultConfig = {
      altInput: true,
      altFormat: "F j, Y",
      minDate: this.startdate,
      maxDate: this.enddate,
      wrap: true,
      onReady: function (dateObj, dateStr, instance) {
        var $cal = $(instance.calendarContainer);
        if ($cal.find('.flatpickr-clear').length < 1) {
          $cal.append('<div class="flatpickr-clear">Clear</div>');
          $cal.find('.flatpickr-clear').on('click', function () {
            instance.clear();
            instance.close();
          });
        }
      }
    };
    this._config = Object.assign({}, defaultConfig, this.config);
    this._config.onChange = this._config.onMonthChange = this._config.onYearChange = this.onChange.bind(this);
  }
  attached() {
    this.flatpickr = new flatpickr__WEBPACK_IMPORTED_MODULE_1__["default"](this.element.querySelector('.aurelia-flatpickr'), this._config);
    this.valueChanged();
  }
  fireEvent(element, type, data) {
    let changeEvent;
    if (window.CustomEvent) {
      changeEvent = new CustomEvent('change', {
        detail: {
          value: data
        },
        bubbles: true
      });
    } else {
      changeEvent = document.createEvent('CustomEvent');
      changeEvent.initCustomEvent('change', true, true, {
        detail: {
          value: data
        }
      });
    }
    this.element.dispatchEvent(changeEvent);
  }
  startdateChanged(newValue, oldValue) {
    if (this.flatpickr) {
      this.flatpickr.set("minDate", newValue);
    }
  }
  enddateChanged(newValue, oldValue) {
    if (this.flatpickr) {
      this.flatpickr.set("maxDate", newValue);
    }
  }
  onChange(selectedDates, dateStr, instance) {
    if (!this._datesAreSynced(this.value, selectedDates)) {
      switch (selectedDates.length) {
        case 0:
          this.value = undefined;
          break;
        case 1:
          this.value = this._cloneDate(selectedDates[0]);
          break;
        default:
          this.value = selectedDates.map(d => this._cloneDate(d));
          break;
      }
    }
    this.fireEvent(this.element, 'changeBeginDate', {
      date: this.value
    });
  }
  clear() {
    if (!this.flatpickr) {
      return;
    }

    // this.flatpickr.clear();
  }

  valueChanged() {
    if (!this.flatpickr) {
      return;
    }
    if (this._datesAreSynced(this.value, this.flatpickr.selectedDates)) {
      return;
    }
    let newDate;
    if (!this.value) {
      newDate = undefined;
    } else if (!Array.isArray(this.value)) {
      newDate = this._cloneDate(this.value);
    } else {
      newDate = this.value.map(d => this._cloneDate(d));
    }
    this.flatpickr.setDate(newDate);
  }
  _datesAreSynced(model, view) {
    model = model || [];
    let modelDates = Array.isArray(model) ? model : [model];
    for (let d = 0; d < modelDates.length; d++) {
      let modelDate = modelDates[d];
      if (view.findIndex(v => v.valueOf() === modelDate.valueOf()) > -1) {
        continue;
      }
      return false;
    }
    for (let d = 0; d < view.length; d++) {
      let viewDate = view[d];
      if (modelDates.findIndex(m => m.valueOf() === viewDate.valueOf()) > -1) {
        continue;
      }
      return false;
    }
    return true;
  }
  _cloneDate(d) {
    return new Date(d.getTime ? d.valueOf() : d);
  }
}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "config", [aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return {};
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "startdate", [aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "enddate", [aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "controlid", [aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "disabled", [aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "value", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);

/***/ }),

/***/ "resources/elements/multiselect":
/*!***********************************************!*\
  !*** ./src/resources/elements/multiselect.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MultiselectCustomElement: function() { return /* binding */ MultiselectCustomElement; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var bootstrap_select__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bootstrap-select */ 300);
/* harmony import */ var bootstrap_select__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bootstrap_select__WEBPACK_IMPORTED_MODULE_1__);
var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3;
function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }


let MultiselectCustomElement = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.TaskQueue), _dec2 = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.bindable)({
  defaultBindingMode: aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.bindingMode.twoWay
}), _dec(_class = (_class2 = class MultiselectCustomElement {
  constructor(taskQueue) {
    _initializerDefineProperty(this, "options", _descriptor, this);
    _initializerDefineProperty(this, "label", _descriptor2, this);
    _initializerDefineProperty(this, "value", _descriptor3, this);
    this.taskQueue = taskQueue;
  }
  valueChanged(newValue, oldValue) {
    if (newValue && newValue.length === 0) $('span.filter-option').html("");
  }
  bind() {
    console.log('laksjdflj');
  }
  attached() {
    $(this.select).selectpicker({
      onChange: (option, checked) => {
        if (checked) {
          this.value.push(option[0].value);
        } else {
          let index = this.value.indexOf(option[0].value);
          this.value.splice(index, 1);
        }
      }
    });
  }
  optionsChanged(newValue, oldValue) {
    if (oldValue) {
      this.taskQueue.queueTask(() => {
        this.value = [];
        $(this.select).multiselect('rebuild');
      });
    }
  }
}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "options", [aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "label", [aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "value", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
})), _class2)) || _class);

/***/ }),

/***/ "resources/elements/nav-bar":
/*!*******************************************!*\
  !*** ./src/resources/elements/nav-bar.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NavBar: function() { return /* binding */ NavBar; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var aurelia_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-router */ 6433);
/* harmony import */ var aurelia_event_aggregator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! aurelia-event-aggregator */ "aurelia-event-aggregator");
/* harmony import */ var _data_auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../data/auth */ 5849);
/* harmony import */ var _resources_utils_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../resources/utils/utils */ 8741);
/* harmony import */ var _resources_data_people__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../resources/data/people */ 353);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
/* harmony import */ var _dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../dialogs/common-dialogs */ 6545);
/* harmony import */ var _resources_data_apjClientRequests__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../resources/data/apjClientRequests */ 3444);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! moment */ 381);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! toastr */ 8901);
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(toastr__WEBPACK_IMPORTED_MODULE_10__);
var _dec, _class;











// import $ from "jquery";

let NavBar = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(aurelia_router__WEBPACK_IMPORTED_MODULE_1__.Router, aurelia_event_aggregator__WEBPACK_IMPORTED_MODULE_2__.EventAggregator, aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.BindingEngine, _data_auth__WEBPACK_IMPORTED_MODULE_3__.Auth, _resources_utils_utils__WEBPACK_IMPORTED_MODULE_4__.Utils, _resources_data_people__WEBPACK_IMPORTED_MODULE_5__.People, _config_appConfig__WEBPACK_IMPORTED_MODULE_6__.AppConfig, _dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_7__.CommonDialogs, _resources_data_apjClientRequests__WEBPACK_IMPORTED_MODULE_8__.APJClientRequests), _dec(_class = class NavBar {
  constructor(router, eventAggregator, bindingEngine, auth, utils, people, config, dialog, apjRequests) {
    this.isAuthenticated = false;
    this.subscription = {};
    this.eventAggregator = eventAggregator;
    this.router = router;
    this.bindingEngine = bindingEngine;
    this.auth = auth;
    this.utils = utils;
    this.people = people;
    this.config = config;
    this.dialog = dialog;
    this.apjRequests = apjRequests;
    this.isAuthenticated = this.auth.isAuthenticated();
    this.userObj = JSON.parse(sessionStorage.getItem('user'));
  }
  async attached() {
    this.hideProfile();
    $(".dropdown-toggle").dropdown();
    if (this.userObj) this.getNotices(this.userObj._id);
    setInterval(() => {
      this.getNotices(this.userObj._id);
    }, 10 * 60 * 1000);
    await this.apjRequests.getClientRequestsDetailsArray('?filter=requestStatus|eq|1', true);
    this.apjUnassignedRequests = this.apjRequests.requestsDetailsArray;
    console.log(this.apjUnassignedRequests);
  }
  async login() {
    let response = await this.auth.login(this.email, this.password);
    if (!response.error) {
      sessionStorage.setItem('uccweather', JSON.stringify({
        temp: response.temp,
        icon: response.icon
      }));
      this.loginError = "";
      this.loginSuccess();
      this.isAuthenticated = this.auth.isAuthenticated();
    } else {
      this.loginError = "Invalid credentials.";
    }
  }
  logout() {
    if (this.userObj) this.auth.logout(this.userObj.email);
    this.userObj = new Object();
    this.isAuthenticated = this.auth.isAuthenticated();
    this.router.navigate("home");
  }
  async loginSuccess() {
    this.userObj = JSON.parse(sessionStorage.getItem('user'));
    if (this.userObj) {
      if (this.userObj.institutionId.institutionStatus !== this.config.INSTITUTIONS_ACTIVE) {
        this.utils.showNotification("You must belong to an active institution to access the web site");
        this.logout();
      } else {
        if (this.userObj.personStatus !== this.config.ACTIVE_PERSON) {
          return this.dialog.showMessage("You must have an active account to access the web site.  Contact your faculty coordinator to activate your account.", "Account Not Active", ['OK']).whenClosed(response => {
            this.logout();
          });
        } else {
          if (!this.userObj.userRole) this.logout();
          sessionStorage.setItem('role', this.userObj.userRole);
          this.router.navigate("user");
        }
      }
    } else {
      this.utils.showNotification("There was a problem validating your account");
      this.router.navigate("home");
    }
  }
  async requestPasswordReset() {
    if (this.email) {
      let response = await this.people.requestPasswordReset({
        email: this.email
      });
      if (response && !response.error) {
        this.utils.showNotification("An email has been sent to the provided email address with a link you can use to reset your password");
      } else if (response.status = 404) {
        this.utils.showNotification("There is no registered user with that email address");
      } else if (response.status = 401) {
        this.utils.showNotification("The account with the provided address has been deactivated.  Please contact your faculty coordinator.");
      }
    } else {
      this.utils.showNotification("Please enter an email address");
    }
  }
  enterNote() {
    var note = {
      noteBody: "",
      noteCategories: this.userObj.noteCategories,
      selectedCategory: 0
    };
    return this.dialog.showNote("Enter Note", note, ['Submit', 'Cancel']).whenClosed(response => {
      if (!response.wasCancelled) {
        this.saveNote(response.output);
      } else {
        console.log("Cancelled");
      }
    });
  }
  async saveNote(note) {
    this.people.selectNote();
    this.people.selectedNote.personId = this.userObj._id;
    this.people.selectedNote.category = this.userObj.noteCategories[note.selectedCategory];
    this.people.selectedNote.note = note.note.noteBody;
    let response = await this.people.saveNote();
    if (!response.error) {
      this.utils.showNotification('The note was saved');
    }
  }
  showProfile(el) {
    this.toggleProfile = this.toggleProfile ? false : true;
    if (this.toggleProfile) {
      $(".noticeProfile").css("top", el.clientY + 25);
      $(".noticeProfile").css("left", $("#noticeLabel")[0].offsetLeft);
      $(".noticeProfile").css("display", "block");
      $(".noticeProfile").css('position', 'fixed');
    } else {
      this.hideProfile();
    }
  }
  hideProfile() {
    $(".noticeProfile").css("display", "none");
  }
  filterNotifications() {
    this.noticeArray = [];
    let updatedItems = 0;
    if (Array.isArray(this.people.notificationsArray)) {
      this.people.notificationsArray.forEach(notice => {
        if (notice.notice.indexOf('Closed') > -1) {
          this.noticeArray.push(notice);
        } else if (updatedItems < 5) {
          this.noticeArray.push(notice);
          updatedItems = updatedItems + 1;
        }
      });
    } else {
      this.noticeArray = [];
    }
  }
  updateNotification(notice, index) {
    let htNumber = notice.notice.split(' ');
    notice.checked = true;
    this.people.saveNotification(notice);
    this.people.notificationsArray.splice(index, 1);
    if (htNumber[4] != 'closed') this.router.navigateToRoute('techHt', {
      HTNumber: htNumber[2]
    });
    this.hideProfile();
    this.filterNotifications();
  }
  deleteNotice(notice, index) {
    notice.checked = true;
    this.people.saveNotification(notice);
    this.people.notificationsArray.splice(index, 1);
    this.filterNotifications();
  }
  async getNotices(id) {
    await this.people.getNotifications(id);
    this.filterNotifications();
  }
  async events() {
    await this.eventLayer.getEventsArray('', true);
    let today = new Date();
    this.eventLayer.eventArray.forEach(item => {
      if (item.personId === this.userObj._id || item.scope === 'u') {
        if (moment__WEBPACK_IMPORTED_MODULE_9___default()(today).isBetween(item.start, item.end)) ;
        this.events.push(item);
      }
    });
  }
}) || _class);

/***/ }),

/***/ "resources/elements/rate-it":
/*!*******************************************!*\
  !*** ./src/resources/elements/rate-it.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RateIt: function() { return /* binding */ RateIt; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery */ 5311);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_1__);
var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3;
function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }


let RateIt = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(Element), _dec(_class = (_class2 = class RateIt {
  constructor(element) {
    _initializerDefineProperty(this, "rating", _descriptor, this);
    _initializerDefineProperty(this, "raters", _descriptor2, this);
    _initializerDefineProperty(this, "thiselement", _descriptor3, this);
    this.ratedIt = false;
    this.element = element;
  }
  attached() {
    this.id = this.element.getAttribute("id");
    this.rates = [{
      value: "5",
      title: 'Awesome - 5 stars',
      class: 'full',
      checked: false,
      id: "5" + this.id,
      name: this.id
    }, {
      value: "4.5",
      title: 'Pretty good - 4.5 stars',
      class: 'half',
      checked: false,
      id: "4.5" + this.id,
      name: this.id
    }, {
      value: "4",
      title: 'Pretty good - 4 stars',
      class: 'full',
      checked: false,
      id: "4" + this.id,
      name: this.id
    }, {
      value: "3.5",
      title: 'Meh - 3.5 stars',
      class: 'half',
      checked: false,
      id: "3.5" + this.id,
      name: this.id
    }, {
      value: "3",
      title: 'Meh - 3 stars',
      class: 'full',
      checked: false,
      id: "3" + this.id,
      name: this.id
    }, {
      value: "2.5",
      title: 'Kinda bad - 2.5 stars',
      class: 'half',
      checked: false,
      id: "2.5" + this.id,
      name: this.id
    }, {
      value: "2",
      title: 'Kinda bad - 2 stars',
      class: 'full',
      checked: false,
      id: "2" + this.id,
      name: this.id
    }, {
      value: "1.5",
      title: 'Meh - 1.5 stars',
      class: 'half',
      checked: false,
      id: "1.5" + this.id,
      name: this.id
    }, {
      value: "1",
      title: 'Sucks big time - 1 star',
      class: 'full',
      checked: false,
      id: "1" + this.id,
      name: this.id
    }, {
      value: ".5",
      title: 'Sucks big time - 0.5 stars',
      class: 'half',
      checked: false,
      id: ".5" + this.id,
      name: this.id
    }];
  }
  rateIt(value, index) {
    if (!this.ratedIt) {
      this.ratedIt = true;
      this.raters += 1;
      this.rating = (this.rating + Number(value)) / this.raters;
      document.getElementById(this.rates[index].id).checked = "true";
      // this.ratecurriculum(this.rating, this.id);
      let changeEvent;
      if (window.CustomEvent) {
        changeEvent = new CustomEvent('change', {
          detail: {
            rating: this.rating,
            id: this.id
          },
          bubbles: true
        });
      } else {
        changeEvent = document.createEvent('CustomEvent');
        changeEvent.initCustomEvent('change', true, true, {
          detail: {
            rating: this.rating,
            id: this.id
          }
        });
      }
      this.element.dispatchEvent(changeEvent);
    }
  }
}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "rating", [aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "raters", [aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "thiselement", [aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);

/***/ }),

/***/ "resources/elements/submenu":
/*!*******************************************!*\
  !*** ./src/resources/elements/submenu.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SubMenu: function() { return /* binding */ SubMenu; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
var _class, _descriptor, _descriptor2, _descriptor3;
function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

let SubMenu = (_class = class SubMenu {
  constructor() {
    _initializerDefineProperty(this, "title", _descriptor, this);
    _initializerDefineProperty(this, "menuitems", _descriptor2, this);
    _initializerDefineProperty(this, "config", _descriptor3, this);
  }
  bind() {
    console.log(this.title);
  }
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "title", [aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "menuitems", [aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "config", [aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class);

/***/ }),

/***/ "resources/elements/table-navigation-bar":
/*!********************************************************!*\
  !*** ./src/resources/elements/table-navigation-bar.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TableNavigationBar: function() { return /* binding */ TableNavigationBar; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
var _class, _descriptor, _descriptor2, _descriptor3;
function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

let TableNavigationBar = (_class = class TableNavigationBar {
  constructor() {
    _initializerDefineProperty(this, "columnspan", _descriptor, this);
    _initializerDefineProperty(this, "dataTable", _descriptor2, this);
    _initializerDefineProperty(this, "pagebuttons", _descriptor3, this);
  }
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "columnspan", [aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "dataTable", [aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "pagebuttons", [aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class);

/***/ }),

/***/ "resources/elements/tree-node":
/*!*********************************************!*\
  !*** ./src/resources/elements/tree-node.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   treeNode: function() { return /* binding */ treeNode; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var aurelia_event_aggregator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-event-aggregator */ "aurelia-event-aggregator");
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7;
function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }



let treeNode = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(Element, aurelia_event_aggregator__WEBPACK_IMPORTED_MODULE_1__.EventAggregator, _config_appConfig__WEBPACK_IMPORTED_MODULE_2__.AppConfig), _dec2 = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.bindable)({
  attribute: 'selected-node',
  defaultBindingMode: aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.bindingMode.twoWay
}), _dec3 = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.bindable)({
  attribute: 'visible',
  defaultBindingMode: aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.bindingMode.twoWay
}), _dec4 = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.bindable)({
  defaultBindingMode: aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.bindingMode.twoWay
}), _dec5 = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.computedFrom)('data'), (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.containerless)(_class = _dec(_class = (_class2 = class treeNode {
  constructor(element, EventAggregator, config) {
    _initializerDefineProperty(this, "data", _descriptor, this);
    _initializerDefineProperty(this, "level", _descriptor2, this);
    _initializerDefineProperty(this, "selectedNode", _descriptor3, this);
    _initializerDefineProperty(this, "visible", _descriptor4, this);
    _initializerDefineProperty(this, "maxLevel", _descriptor5, this);
    _initializerDefineProperty(this, "callback", _descriptor6, this);
    _initializerDefineProperty(this, "selectedFile", _descriptor7, this);
    this.childrenVisible = false;
    this.element = element;
    this.ea = EventAggregator;
    this.config = config;
  }
  get itemCount() {
    return this.countNodes(this.data);
  }
  bind() {
    console.log(this.data);
  }
  attached() {
    this.childrenVisible = this.level < this.maxLevel;
  }
  countNodes(node_item) {
    let count = 0;
    if (node_item) {
      if (node_item.children !== undefined) node_item.children.forEach(node_child => count += this.countNodes(node_child) + 1);
    }
    return count;
  }
  visibleChanged(newValue) {
    if (newValue = false) {
      this.childrenVisible = false;
    }
  }
  toggleExpand() {
    this.childrenVisible = !this.childrenVisible;
  }
  clickMe(data) {
    if (data.path) window.open(this.config.HOST + data.path.substring(6), '_blank');
    this.selectedNode = data;
  }
  deleteFile(data) {
    if (data.file) this.selectedFile = data;
    this.callback(data);
  }
  deleteFile2(data) {
    if (data.file) {
      this.ea.publish('delete-file', {
        file: data
      });
    }
  }
  fireEvent(element, type, data) {
    let changeEvent;
    if (window.CustomEvent) {
      changeEvent = new CustomEvent('click', {
        detail: {
          value: data
        },
        bubbles: true
      });
    } else {
      changeEvent = document.createEvent('CustomEvent');
      changeEvent.initCustomEvent('click', true, true, {
        detail: {
          value: data
        }
      });
    }
    this.element.dispatchEvent(changeEvent);
  }
}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "data", [aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "level", [aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "selectedNode", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "visible", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return true;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "maxLevel", [aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 2;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "callback", [aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "selectedFile", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "itemCount", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "itemCount"), _class2.prototype)), _class2)) || _class) || _class);

/***/ }),

/***/ "resources/index":
/*!********************************!*\
  !*** ./src/resources/index.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   configure: function() { return /* binding */ configure; }
/* harmony export */ });
function configure(config) {
  config.globalResources(['./editor/editor',
  // PLATFORM.moduleName('./elements/calendar'),
  './elements/multiselect', './elements/tree-node', './elements/submenu', './elements/nav-bar', './elements/rate-it',
  // PLATFORM.moduleName('./elements/loading-indicator'),
  './elements/table-navigation-bar', './elements/flat-picker', './elements/add-systems', './value-converters/info-filter', './value-converters/lookup-ht-status', './value-converters/arrow', './value-converters/request-status-class', './value-converters/course-name', './value-converters/parse-assignments', './value-converters/parse-apjassignments', './value-converters/format-number', './value-converters/session-name', './value-converters/session-type', './value-converters/date-format', './value-converters/gravatar-url', './value-converters/gravatar-url-id', './value-converters/ucc-title', './value-converters/phone-number', './value-converters/lookup-value', './value-converters/sandbox', './value-converters/idsRequested', './value-converters/person-status-button', './value-converters/session-status-button', './value-converters/translate-status', './value-converters/to-uppercase', './value-converters/sort-array', './value-converters/system-list', './value-converters/check-box', './value-converters/activate-button', './value-converters/help-ticket-type', './value-converters/help-ticket-subtypes', './value-converters/session', './value-converters/sort-date-time', './value-converters/file-type', './value-converters/format-digits', './value-converters/format-phone', './value-converters/onoff-switch', './value-converters/get-array-value', './value-converters/help-ticket-statuses', './value-converters/stat-value', './value-converters/filter-clients', './value-converters/overlap', './value-converters/filter-array', './value-converters/filter-sessions', './value-converters/session-systems', './value-converters/ucc-staff', './value-converters/filter-apjrequestdetails', './value-converters/filter-notice']);
}

/***/ }),

/***/ 6847:
/*!******************************************!*\
  !*** ./src/resources/utils/dataTable.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DataTable: function() { return /* binding */ DataTable; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ 381);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ 8741);
var _dec, _dec2, _class;




let DataTable = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.transient)(), _dec2 = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_utils__WEBPACK_IMPORTED_MODULE_2__.Utils), _dec(_class = _dec2(_class = class DataTable {
  constructor(utils) {
    this.currentPage = 0;
    this.pages = [];
    this.rowOptions = [5, 10, 15, 20, 50, 100, 200];
    this.filterValues = [];
    this.displayLength = void 0;
    this.DEFAULT_TAKE = 50;
    this.DEFAULT_START = 0;
    this.sortProperty = '';
    this.sortDirection = 1;
    this.currentPageElement = 0;
    this.startRecord = this.DEFAULT_START;
    this.take = this.DEFAULT_TAKE;
    this.firstVisible = this.startRecord + 1;
    this.lastVisible = this.startRecord + this.take - 1;
    this.numRowsShown = this.take.toString();
    this.active = false;
    this.utils = utils;
  }
  initialize(context) {
    this.context = context;
  }
  pageOne() {
    setTimeout(() => {
      $(".pagination").children().removeClass('active');
      $($(".pagination").children()[1]).addClass('active');
      // $("#" + this.context.navControl).children().removeClass('active');
      // $($("#" + this.context.navControl).children()[1]).addClass('active');
    }, 100);
  }
  createPageButtons(start) {
    this.displayLength = this.baseArray.length;
    this.lastVisible = parseInt(this.take) < this.displayLength ? parseInt(this.take) : this.displayLength;
    var maxButtons = 7;
    this.currentPage = 1;
    this.pageButtons = [];
    this.numPageButtons = Math.ceil((this.displayLength - (start - 1) * this.take) / this.take);
    for (var j = 1; j < this.numPageButtons; j++) {
      this.pages[j] = j;
    }
    if (this.numPageButtons <= maxButtons + 1) {
      for (var i = start; i < this.numPageButtons + start; i++) {
        this.pageButtons.push(i);
      }
    } else {
      for (var i = start; i < maxButtons + start; i++) {
        this.pageButtons.push(i);
      }
      this.pageButtons.push('...');
      this.pageButtons.push(this.pages.length);
    }
  }
  buildDisplayArray() {
    this.displayArray = new Array();
    for (var i = 0; i <= this.take; i++) {
      if (i + this.startRecord >= this.baseArray.length) break;
      this.displayArray.push(this.baseArray[i + this.startRecord]);
    }
    this.createPageButtons(1);
  }
  forward() {
    $(".pagination").children().removeClass('active');
    // $("#" + this.context.navControl).children().removeClass('active');
    this.currentPageElement = this.currentPageElement < this.pageButtons.length - 1 ? this.currentPageElement += 1 : this.currentPageElement;
    if (this.pageButtons[this.currentPageElement] == "...") {
      this.createPageButtons(this.pageButtons[0] + 1);
      this.currentPageElement -= 1;
    }
    $($(".pagination").children()[this.currentPageElement + 1]).addClass('active');
    // $($("#" + this.context.navControl).children()[this.currentPageElement + 1]).addClass('active');
    var start = parseInt(this.startRecord);
    var tk = parseInt(this.take);
    this.startRecord = start + tk > this.baseArray.length ? start : start + tk;
    this.firstVisible = this.startRecord + 1;
    this.lastVisible = parseInt(this.firstVisible) + tk - 1 > this.displayArray.length ? this.displayArray.length : parseInt(this.firstVisible) + tk - 1;
    this.buildDisplayArray();
    // if(typeof(this.context.navigate) === 'function')  this.context.navigate();
  }

  createPage() {
    $($(".pagination")[this.currentPage - 1]).addClass('active');
  }
  backward() {
    $(".pagination").children().removeClass('active');
    this.currentPageElement = this.currentPageElement > 0 ? this.currentPageElement -= 1 : this.currentPageElement;
    if (this.currentPageElement == 0 && this.pageButtons[this.currentPageElement] != 1) {
      this.createPageButtons(this.pageButtons[0] - 1);
    }
    if (this.pageButtons[this.currentPageElement] == "...") {
      var start = this.numPageButtons >= 8 ? this.numPageButtons - 8 : 1;
      this.createPageButtons(start);
      //this.context.currentPageElement = 1
    }

    $($(".pagination").children()[this.currentPageElement + 1]).addClass('active');
    //  $($("#" + this.context.navControl).children()[this.currentPageElement + 1]).addClass('active');
    var start = parseInt(this.startRecord);
    var tk = parseInt(this.take);
    this.startRecord = start - tk < 0 ? 0 : this.startRecord = start - tk;
    this.firstVisible = this.startRecord + 1;
    this.lastVisible = parseInt(this.firstVisible) + tk - 1;
    this.buildDisplayArray();
    // if(typeof(this.context.navigate) === 'function')  this.context.navigate();
  }

  pageButton(index, el) {
    $(".pagination").children().removeClass('active');
    //  $("#" + this.context.navControl).children().removeClass('active');
    $(el.target).closest('li').addClass('active');
    this.currentPageElement = index;
    var start = parseInt(this.startRecord);
    var tk = parseInt(this.take);
    if (this.pageButtons[index] !== '...') {
      this.startRecord = (this.pageButtons[index] - 1) * tk;
      this.firstVisible = this.startRecord + 1;
      this.lastVisible = parseInt(this.firstVisible) + tk - 1 > this.displayArray.length ? this.displayArray.length : parseInt(this.firstVisible) + tk - 1;
    }
    // if(typeof(this.context.navigate) === 'function')  this.context.navigate();
    this.buildDisplayArray();
  }
  updateTake() {
    this.take = this.numRowsShown;
    this.startRecord = 0;
    this.lastVisible = parseInt(this.firstVisible) + parseInt(this.take) - 1;
    this.createPageButtons(1);
    this.pageOne();
    this.buildDisplayArray();
  }
  filterList(el, array) {
    el.preventDefault();
    array = array || new Array();
    //If the property is already in filterValues, filter it out
    this.filterValues = this.filterValues.filter(function (obj) {
      return obj.property !== el.target.id;
    });

    //If the filter value is not set to empty, add it to filterValues
    if (el.target.value !== "") {
      switch (el.target.type) {
        case 'select-one':
          this.filterValues.push({
            property: el.target.id,
            value: el.target.options[el.target.selectedIndex].value,
            type: el.target.type,
            compare: $(el.target).attr("compare")
          });
          break;
        default:
          this.filterValues.push({
            property: el.target.id,
            value: el.target.value,
            type: el.target.type,
            compare: $(el.target).attr("compare")
          });
      }
    }

    //If there are no filters in filterValues, reset the displayArray to the original list
    if (this.filterValues.length > 0) {
      this.baseArray = this.filter(this.filterValues, array);
    } else {
      this.baseArray = this.sourceArray;
    }
    this.startRecord = this.DEFAULT_START;
    this.firstVisible = 1;
    this.buildDisplayArray();
    this.lastVisible = parseInt(this.take) < this.displayLength ? parseInt(this.take) : this.displayLength;
    this.pageOne();
  }
  filterList(value, options) {
    options.lookupArray = options.lookupArray || new Array();
    //If the property is already in filterValues, filter it out
    this.filterValues = this.filterValues.filter(function (obj) {
      return obj.options.filter !== options.filter;
    });

    //Parse collection property
    if (options.type.indexOf('obj') == -1 && options.type != 'custom') {
      var properties = options.collectionProperty.split('.');
      var condition = "item";
      for (var j = 0; j < properties.length; j++) {
        if (properties[j].indexOf('[') > -1) {
          condition += properties[j];
        } else {
          condition += "['" + properties[j] + "']";
        }
      }
      options.collectionProperty = condition;
    }

    //If the filter value is not set to empty, add it to filterValues 
    if (typeof value == 'object' && !(value instanceof Date) && !Array.isArray(value)) value = value.target.value;
    if (value !== "") {
      this.filterValues.push({
        options: options,
        value: value
      });
    }

    //If there are no filters in filterValues, reset the displayArray to the original list
    if (this.filterValues.length > 0) {
      this.baseArray = this.filter(this.filterValues);
    } else {
      this.baseArray = this.sourceArray;
    }
    this.startRecord = this.DEFAULT_START;
    this.firstVisible = 1;
    this.buildDisplayArray();
    this.lastVisible = parseInt(this.take) < this.displayLength ? parseInt(this.take) : this.displayLength;
    this.pageOne();
  }
  applyFilters() {
    this.filter(this.filterValues);
  }
  filter(filters) {
    var keep;
    var index = 0;
    var that = this;
    return this.sourceArray.filter(item => {
      keep = false;
      for (let i = 0; i < filters.length; i++) {
        let filterItem = filters[i];
        var matchValue = undefined;
        if (filterItem.options.compare.indexOf('custom') > -1) {
          matchValue = true;
        } else {
          try {
            matchValue = eval(filterItem.options.collectionProperty);
          } catch (err) {
            matchValue = false;
          }
        }
        if (matchValue != undefined || filterItem.options.type === "boolean" && matchValue == undefined) {
          switch (filterItem.options.type) {
            case 'custom':
              keep = filterItem.options.filter(filterItem.value, item, that.context);
              break;
            case 'text':
              if (filterItem.options.compare.indexOf('not') > -1) {
                keep = matchValue.toUpperCase().indexOf(filterItem.value.toUpperCase()) == -1;
              } else {
                keep = matchValue.toUpperCase().indexOf(filterItem.value.toUpperCase()) > -1;
              }
              break;
            case 'value':
              if (filterItem.options.compare.indexOf('not') > -1) {
                keep = matchValue != filterItem.value;
              } else {
                keep = matchValue == filterItem.value;
              }
              break;
            case "boolean":
              if (matchValue == undefined) {
                keep = eval(filterItem.value) == false;
              } else {
                keep = matchValue === eval(filterItem.value);
              }
              break;
            case "date":
              switch (filterItem.options.compare) {
                case 'after':
                  if (matchValue) {
                    var dt = moment__WEBPACK_IMPORTED_MODULE_1___default()(matchValue).format('YYYY-MM-DD');
                    keep = moment__WEBPACK_IMPORTED_MODULE_1___default()(dt).isAfter(filters[i].value);
                  }
                  break;
                default:
                  if (matchValue) {
                    var dt = moment__WEBPACK_IMPORTED_MODULE_1___default()(matchValue).format('YYYY-MM-DD');
                    keep = moment__WEBPACK_IMPORTED_MODULE_1___default()(dt).isSame(filters[i].value);
                  }
              }
          }
        }
        if (!keep) break;
      }
      return keep;
    });
  }

  /***************************************************************
   * propertyName - property to sort on unless a surrogate is provided 
   * type - indicates an alternate sorting method
   * surrogateArray - array that contains the property on which you want to sort
   * surrogateProperty - property in surrogate array that matches propertyname
   * sortProperty - property showing in table on which sort is actually performed
   * sortDirectionParam - direction of sort
   */
  sortArray(el, options, reSort) {
    //propertyName, type, surrogateArray, surrogateProperty, sortProperty, sortDirectionParam){
    if (reSort) {
      if (!this.lastOption || !this.lastEl) return;
      el = this.lastEl;
      options = this.lastOption;
    } else {
      this.lastEl = el;
      this.lastOption = options;
    }
    if (options.sortDirectionParam) this.sortDirection = sortDirectionParam;
    this.sortProperty = options.propertyName;
    if (options.propertyName === this.sortProperty) {
      this.sortDirection *= -1;
    } else {
      this.sortDirection = 1;
    }
    $(".sortable").next().replaceWith('<i class="fa fa-sort"></i>');
    if (this.sortDirection < 0) {
      var icon = '<i class="fa fa-sort-amount-desc" aria-hidden="true"></i>';
    } else {
      var icon = '<i class="fa fa-sort-amount-asc" aria-hidden="true"></i>';
    }
    $(el.target).next().replaceWith(icon);
    if (!options.type) {
      if (options.propertyName.indexOf('.') > -1) {
        var array = options.propertyName.split('.');
      }
      if (array) {
        this.baseArray = this.baseArray.sort((a, b) => {
          var result = a[array[0]][array[1]] < b[array[0]][array[1]] ? -1 : a[array[0]][array[1]] > b[array[0]][array[1]] ? 1 : 0;
          return result * this.sortDirection;
        });
      } else {
        this.baseArray = this.baseArray.sort((a, b) => {
          var result = a[options.propertyName] < b[options.propertyName] ? -1 : a[options.propertyName] > b[options.propertyName] ? 1 : 0;
          return result * this.sortDirection;
        });
      }
    } else if (options.type == 'custom') {
      if (typeof options.sorter == 'function') {
        var sortArray = this.utils.copyArray(this.baseArray);
        this.baseArray = options.sorter(this.sortProperty, this.sortDirection, sortArray, this.context);
      }
    } else {
      var properties = options.searchProperty.split('.');
      var condition = "item";
      for (let j = 0; j < properties.length; j++) {
        if (properties[j].indexOf('[') > -1) {
          condition += properties[j];
        } else {
          condition += "['" + properties[j] + "']";
        }
      }
      var sortArray = this.utils.copyArray(this.baseArray);
      sortArray.forEach(item => {
        var obj = this.findObj(options.surrogateArray, options.surrogateProperty, eval(condition));
        item[options.propertyName] = obj ? obj[options.propertyName] : null;
      });
      this.baseArray = sortArray.sort((a, b) => {
        var result = a[options.propertyName] < b[options.propertyName] ? -1 : a[options.propertyName] > b[options.propertyName] ? 1 : 0;
        return result * this.sortDirection;
      });
    }
    this.startRecord = this.DEFAULT_START;
    this.firstVisible = 1;
    this.buildDisplayArray();
    this.lastVisible = parseInt(this.take) < this.displayLength ? parseInt(this.take) : this.displayLength;
    this.pageOne();
  }
  findObj(surrogateArray, surrogateProperty, propertyValue) {
    for (var i = 0, x = surrogateArray.length; i < x; i++) {
      if (surrogateArray[i][surrogateProperty] == propertyValue) return surrogateArray[i];
    }
    return null;
  }
  updateArray(sourceArray, sortProperty, sortDirection) {
    if (sourceArray) {
      this.sourceArray = new Array();
      this.baseArray = new Array();
      this.active = true;
      this.filterValues = new Array();
      sourceArray.forEach((item, index) => {
        item.baseIndex = index;
        item.originalIndex = index;
        this.sourceArray.push(item);
        this.baseArray.push(item);
      });

      // this.baseArray.forEach(function(item, index){
      //   item.baseIndex = index;
      //   item.originalIndex = index;
      // });

      if (sortProperty) {
        this.baseArray.sort((a, b) => {
          let result = a[sortProperty] - b[sortProperty];
          return result * sortDirection;
        });
      }
      this.buildDisplayArray();
    }
  }
  updateArrayMaintainFilters(sourceArray, sortProperty, sortDirection) {
    if (sourceArray) {
      this.sourceArray = new Array();
      this.baseArray = new Array();
      this.active = true;
      sourceArray.forEach(item => {
        this.sourceArray.push(item);
        this.baseArray.push(item);
      });
      if (this.filterValues.length) this.baseArray = this.filter(this.filterValues);
      this.baseArray.forEach(function (item, index) {
        item.baseIndex = index;
        item.originalIndex = index;
      });
      if (sortProperty) {
        this.baseArray.sort((a, b) => {
          let result = a[sortProperty] - b[sortProperty];
          return result * sortDirection;
        });
      }

      // this.filter(this.filterValues);
      this.buildDisplayArray();
    }
  }
  getOriginalIndex(index) {
    return this.displayArray[index].originalIndex;
  }
}) || _class) || _class);

/***/ }),

/***/ 8741:
/*!**************************************!*\
  !*** ./src/resources/utils/utils.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Utils: function() { return /* binding */ Utils; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var aurelia_notification__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-notification */ 4204);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moment */ 381);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
var _dec, _class;

// import $ from 'jquery';
// import * as toastr from "toastr";



let Utils = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(aurelia_notification__WEBPACK_IMPORTED_MODULE_1__.Notification, _config_appConfig__WEBPACK_IMPORTED_MODULE_3__.AppConfig), _dec(_class = class Utils {
  constructor(notification, config) {
    this.config = config;
    this.notification = notification;
    this.notification.waitForMove = true;
    toastr.options.extendedTimeOut = "1000";
    toastr.options.timeOut = "1500";
    this.notification.note('it worked');

    // toastr.options = {
    //   "closeButton": false,
    //   "debug": false,
    //   "newestOnTop": false,
    //   "progressBar": false,
    //   "positionClass": "toast-top-right",
    //   "preventDuplicates": false,
    //   "onclick": null,
    //   "showDuration": "100",
    //   "hideDuration": "1000",
    //   "timeOut": "1000",
    //   "extendedTimeOut": "1000",
    //   "showEasing": "swing",
    //   "hideEasing": "linear",
    //   "showMethod": "fadeIn",
    //   "hideMethod": "fadeOut"
    // }
  }

  guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : r & 0x3 | 0x8;
      return v.toString(16);
    });
  }

  /*****************************************************************************
   * Display a notification
   * msg - the message to display
   ****************************************************************************/
  showNotification(msg, type) {
    type = type ? type : "success";
    toastr[type](msg);
    // this.notification.note(msg);
  }

  /*****************************************************************************
  * Determine users role for authorizations
  ****************************************************************************/
  setRole(roles) {
    let userRole = 1;
    for (let i = 0; i < roles.length; i++) {
      this.config.ROLES.forEach(item => {
        if (roles[i] == item.role) {
          userRole = item.authLevel > userRole ? item.authLevel : userRole;
        }
      });
    }
    return userRole;
  }

  /*****************************************************************************
   * Count the the items in an array
   * value - the value to count
   * property - the object property to look for the value
   * itemArray - the array
   ****************************************************************************/
  countItems(value, property, itemArray) {
    var countArray = itemArray.filter(function (item) {
      return item[property] == value;
    });
    return countArray.length;
  }
  arrayContainsValue(array, property, value) {
    for (var i = 0, x = array.length; i < x; i++) {
      if (array[i][property] == value) {
        return i;
      }
    }
    return -1;
  }

  /*************************************************************************
  * Compare to objects to determine if they are equal
  * obj1 - first object
  * obj2 - second object
  * skip - an array of properties to skip
  *************************************************************************/
  objectsEqual(obj1, obj2, skip) {
    var changes = new Array();
    var skipArray = skip || new Array();
    for (var property in obj1) {
      if (obj1.hasOwnProperty(property)) {
        if (!obj1[property] && !obj2[property] || skipArray.indexOf(property) !== -1) {
          continue;
        } else if (Array.isArray(obj1[property])) {
          if (!this.arraysEqual(obj1[property], obj2[property])) {
            changes.push({
              property: property,
              oldValue: obj2[property].length,
              newValue: obj1[property].length
            });
          }
        } else if (property.indexOf('Date') > -1 || property.indexOf('date') > -1 || obj1[property] instanceof Date) {
          var date1 = new Date(obj1[property]);
          var date2 = new Date(obj2[property]);
          if (!moment__WEBPACK_IMPORTED_MODULE_2___default()(date1).isSame(date2, 'year') || !moment__WEBPACK_IMPORTED_MODULE_2___default()(date1).isSame(date2, 'month') || !moment__WEBPACK_IMPORTED_MODULE_2___default()(date1).isSame(date2, 'day')) {
            changes.push({
              property: property,
              oldValue: obj2[property],
              newValue: obj1[property]
            });
          }
        } else if (typeof obj1[property] === 'object') {
          var areEqual = true;
          for (var x in obj1[property]) {
            if (obj1[property][x] != obj2[property][x]) areEqual = false;
          }
          if (!areEqual) {
            changes.push({
              property: property,
              oldValue: obj2[property],
              newValue: obj1[property]
            });
          }
        } else {
          if (obj1[property] != obj2[property]) {
            if (!(obj1[property] === "" && obj2[property] === undefined)) {
              changes.push({
                property: property,
                oldValue: obj2[property],
                newValue: obj1[property]
              });
            }
          }
        }
      }
    }
    return changes;
  }

  /********************************************************************************
  * Compare to arrays
  ********************************************************************************/
  arraysEqual(array1, array2) {
    var arraysEqual = true;
    if (array1.length != array2.length) {
      return false;
    } else {
      var newArray = new Array();
      for (var i = 0; i < array1.length; i++) {
        newArray[i] = JSON.stringify(array1[i]);
      }
      for (var i = 0; i < array1.length; i++) {
        if (newArray.indexOf(JSON.stringify(array2[i])) == -1) {
          return false;
        }
      }
    }
    return true;
  }

  /************************************************************************************
  * Copy one object into another, used when you want a completly new object and not a reference
  * objFrom - object to copy from
  * objTO - object to copy to
  * properties - an array of specific properties to copy
  ***********************************************************************************/
  copyObject(objFrom, objTo, properties) {
    objTo = objTo || new Object();
    ;
    if (!properties) {
      for (var property in objFrom) {
        if (objFrom.hasOwnProperty(property)) {
          if (Array.isArray(objFrom[property])) {
            objTo[property] = this.copyArray(objFrom[property]);
          } else if (objFrom[property] instanceof Date) {
            objTo[property] = objFrom[property];
          } else if (this.isObject(objFrom[property])) {
            objTo[property] = this.copyObject(objFrom[property]);
          } else {
            objTo[property] = objFrom[property];
          }
        }
      }
    } else {
      for (var i = 0, x = properties.length; i < x; i++) {
        if (objFrom.hasOwnProperty(properties[i])) {
          if (Array.isArray(objFrom[property])) {
            objTo[property] = this.copyArray(objFrom[property]);
          } else if (objFrom[property] instanceof Date) {
            objTo[property] = objFrom[property];
          } else if (this.isObject(objFrom[property])) {
            objTo[property] = this.copyObject(objFrom[property]);
          } else {
            objTo[property] = objFrom[property];
          }
        }
      }
    }
    return objTo;
  }

  /*******************************************************************************
   * Return a copy of an array
   *******************************************************************************/
  copyArray(array) {
    if (array) {
      var newArray = new Array();
      array.forEach(item => {
        if (Array.isArray(item)) {
          newArray.push(this.copyArray(item));
        } else if (this.isObject(item)) {
          newArray.push(this.copyObject(item));
        } else {
          newArray.push(item);
        }
      });
      return newArray;
    }
    return null;
  }

  /*********************************************************************************
   * Test of a variable is an object
  *********************************************************************************/
  isObject(obj) {
    return obj === Object(obj);
  }
  toCamelCase(str) {
    return str.toLowerCase().replace(/['"]/g, '').replace(/\W+/g, ' ').replace(/ (.)/g, function ($1) {
      return $1.toUpperCase();
    }).replace(/ /g, '');
  }
  lookupValue(value, array, lookUpProperty, returnProperty) {
    if (!value || !array) {
      return;
    }
    for (var i = 0, x = array.length; i < x; i++) {
      if (array[i][lookUpProperty] == value) {
        return array[i][returnProperty];
      }
    }
    return null;
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
}) || _class);

/***/ }),

/***/ 2824:
/*!*******************************************!*\
  !*** ./src/resources/utils/validation.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _class; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
var _dec, _class2;
/**
 * Created by Ross on 11/30/2015.
 */

let _class = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.transient)(), _dec(_class2 = class _class2 {
  constructor() {
    this.ruleGroups = [];
    this.rules = [];
    /**
     *
     * @param ruleGroup - A group of rules
     * @param field - Field the rule applies to
     * @param rule - Rule is an object - rule: name of the rule, val: Value defining limit, valFunction: custom validation function
       */
    this.addRule = function (ruleGroup, field, rule, blur) {
      if (blur) {
        var that = this;
        $("#" + field).blur(function () {
          that.validateRule(rule, field);
        });
      }
      var index = -1;
      //See if rule group exists already
      for (var k = 0; k < this.rules.length; k++) {
        if (this.rules[k].ruleGroup === ruleGroup) {
          index = k;
          break;
        }
      }
      var fieldArray = [];
      var ruleArray = []; //The rules that apply to a field
      if (index === -1) {
        //This is a new rule group
        this.rules.push({
          ruleGroup: ruleGroup,
          fields: fieldArray
        });
        this.rules[this.rules.length - 1].fields[0] = {
          field: field,
          rules: ruleArray
        };
        this.rules[this.rules.length - 1].fields[0].rules = rule;
      } else {
        //Existing rule group
        var found = false;
        // for(var i = 0; i<this.rules[index].fields.length; i++){
        //   if(this.rules[index].fields[i].field === field){
        //     this.rules[index].fields[i].rules.push(rule);
        //     found = true;
        //     break;
        //   }

        // }
        if (!found) {
          this.rules[index].fields.push({
            field: field,
            rules: ruleArray
          });
          this.rules[index].fields[this.rules[index].fields.length - 1].rules = rule;
        }
      }
    };
    this.validate = function (ruleGroup) {
      var index = -1;
      for (var k = 0; k < this.rules.length; k++) {
        if (this.rules[k].ruleGroup == ruleGroup) {
          index = k;
          break;
        }
      }
      if (index === -1) {
        return true;
      } else {
        var valid = true;
        for (var i = 0; i < this.rules[index].fields.length; i++) {
          var fields = this.rules[index].fields[i];
          var thisValid = true;
          for (var k = 0; k < fields.rules.length; k++) {
            thisValid = true;
            var rules = fields.rules[k];
            thisValid = this.validateRule(rules, fields.field);
            if (!thisValid) {
              valid = false;
              break;
            }
          }
        }
      }
      return valid;
    };
    this._inValidate = function (field, rule) {
      var el = $("#" + field);
      if (el.next().is("span.help-block")) {
        el.next().html(rule.message);
      } else {
        var msg = "<span class='help-block'>{message}</span>".replace("{message}", rule.message);
      }
      if (el.is(':visible')) {
        if (!el.parent().hasClass("has-error")) {
          el.parent().addClass("has-error");
          if (!el.next().is("span.help-block")) {
            el.after(msg);
          }
        }
      }
    };
    this.makeValid = function (field) {
      field.parent().removeClass("has-error");
      if (field.next().is("span.help-block")) {
        field.next().html("");
      }
    };
    this.makeAllValid = function (ruleGroup) {
      var index = -1;
      for (var k = 0; k < this.rules.length; k++) {
        if (this.rules[k].ruleGroup == ruleGroup) {
          index = k;
          break;
        }
      }
      if (index === -1) {
        return true;
      } else {
        for (var i = 0; i < this.rules[index].fields.length; i++) {
          this.makeValid($('#' + this.rules[index].fields[i].field));
        }
      }
    };
  }
  initialize(context) {
    this.context = context;
  }
  validateRule(rules, field) {
    var thisValid = true;
    switch (rules.rule) {
      case "custom":
        thisValid = rules.valFunction(this.context);
        break;
      case "required":
        if (!eval('this.context.' + rules.value) || eval('this.context.' + rules.value).length === 0) {
          thisValid = false;
        }
        break;
      case "min":
        if (eval('this.context.' + rules.value) < rules.ruleValue) {
          thisValid = false;
        }
        break;
      case "max":
        if (eval('this.context.' + rules.value) > rules.ruleValue) {
          thisValid = false;
        }
        break;
      case "length":
        if (eval('this.context.' + rules.value).length > 0 && eval('this.context.' + rules.value).length < rules.ruleValue) {
          thisValid = false;
        }
        break;
    }
    if (thisValid) {
      if (thisValid) this.makeValid($("#" + field));
    } else {
      this._inValidate(field, rules);
    }
    return thisValid;
  }
  clearRules() {
    this.ruleGroups = [];
    this.rules = [];
  }
  clearRuleGroup(group) {
    this.ruleGroups[group] = "";
    this.rules.forEach((rule, index) => {
      if (rule.ruleGroup == group) {
        this.rules.splice(index, 1);
      }
    });
  }
}) || _class2);


/***/ }),

/***/ "resources/value-converters/activate-button":
/*!***********************************************************!*\
  !*** ./src/resources/value-converters/activate-button.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ActivateButtonValueConverter: function() { return /* binding */ ActivateButtonValueConverter; }
/* harmony export */ });
class ActivateButtonValueConverter {
  toView(value) {
    if (value == '02') {
      return '<i class="fa fa-toggle-on fa-lg" aria-hidden="true"></i>';
    } else {
      return '<i class="fa fa-toggle-off fa-lg" aria-hidden="true"></i>';
    }
  }
}

/***/ }),

/***/ "resources/value-converters/arrow":
/*!*************************************************!*\
  !*** ./src/resources/value-converters/arrow.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ArrowValueConverter: function() { return /* binding */ ArrowValueConverter; }
/* harmony export */ });
class ArrowValueConverter {
  toView(value1, value2, value3, value4) {
    if (value1 == value2 && value3 == value4) {
      return '<i class="fa fa-arrow-left" aria-hidden="true"></i>';
    } else {
      return '';
    }
  }
}

/***/ }),

/***/ "resources/value-converters/check-box":
/*!*****************************************************!*\
  !*** ./src/resources/value-converters/check-box.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CheckBoxValueConverter: function() { return /* binding */ CheckBoxValueConverter; }
/* harmony export */ });
class CheckBoxValueConverter {
  toView(value) {
    if (value) {
      return '<i class="fa fa-check-square-o"></i>';
    } else {
      return '<i class="fa fa-square-o"></i>';
    }
  }
}

/***/ }),

/***/ "resources/value-converters/course-name":
/*!*******************************************************!*\
  !*** ./src/resources/value-converters/course-name.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CourseNameValueConverter: function() { return /* binding */ CourseNameValueConverter; }
/* harmony export */ });
class CourseNameValueConverter {
  toView(value, array, sandboxID, sandboxName) {
    if (value && array) {
      if (value === sandboxID) return sandboxName;
      for (var i = 0; i < array.length; i++) {
        if (value._id === array[i]._id) {
          return array[i].name;
        }
      }
    }
    return "";
  }
}

/***/ }),

/***/ "resources/value-converters/date-format":
/*!*******************************************************!*\
  !*** ./src/resources/value-converters/date-format.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DateFormatValueConverter: function() { return /* binding */ DateFormatValueConverter; }
/* harmony export */ });
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ 381);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);

class DateFormatValueConverter {
  toView(value, format, fromNow) {
    if (format === void 0) {
      format = 'MMM Do YYYY';
    }
    if (value === undefined || value === null) {
      return;
    }
    if (fromNow) {
      var formattedDate = moment__WEBPACK_IMPORTED_MODULE_0___default()(value).calendar();
    } else {
      var formattedDate = moment__WEBPACK_IMPORTED_MODULE_0___default()(value).format(format);
    }
    return formattedDate === "Invalid date" ? "" : formattedDate;
  }
}

/***/ }),

/***/ "resources/value-converters/file-type":
/*!*****************************************************!*\
  !*** ./src/resources/value-converters/file-type.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FileTypeValueConverter: function() { return /* binding */ FileTypeValueConverter; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
var _dec, _class;


let FileTypeValueConverter = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_config_appConfig__WEBPACK_IMPORTED_MODULE_1__.AppConfig), _dec(_class = class FileTypeValueConverter {
  constructor(appconfig) {
    this.config = appconfig;
  }
  toView(file, number, type, orignalFilename) {
    if (type === void 0) {
      type = 'helpTickets';
    }
    var ext = file.substr(file.indexOf('.') + 1);
    var html = "";
    switch (ext.toUpperCase()) {
      case "GIF":
      case "PNG":
      case "JPG":
        html = orignalFilename + "<span><img src='" + this.config.HELPTICKET_FILE_DOWNLOAD_URL + "/" + number + "/" + file + "' /></span>";
        break;
      default:
        html = file;
    }
    return html;
  }
}) || _class);

/***/ }),

/***/ "resources/value-converters/filter-apjrequestdetails":
/*!********************************************************************!*\
  !*** ./src/resources/value-converters/filter-apjrequestdetails.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   filterApjRequestDetailsValueConverter: function() { return /* binding */ filterApjRequestDetailsValueConverter; }
/* harmony export */ });
class filterApjRequestDetailsValueConverter {
  toView(array) {
    let returnArray = [];
    if (!array || !array.length) return returnArray;
    array.forEach(item => {
      if (item.active === null || item.active === undefined || item.active) {
        returnArray.push(item);
      }
    });
    return returnArray;
  }
}

/***/ }),

/***/ "resources/value-converters/filter-array":
/*!********************************************************!*\
  !*** ./src/resources/value-converters/filter-array.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   filterArrayValueConverter: function() { return /* binding */ filterArrayValueConverter; }
/* harmony export */ });
class filterArrayValueConverter {
  toView(array, property, value) {
    if (array && property && value) {
      return array.filter(item => {
        return item[property] === value;
      });
    }
  }
}

/***/ }),

/***/ "resources/value-converters/filter-clients":
/*!**********************************************************!*\
  !*** ./src/resources/value-converters/filter-clients.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FilterClientsValueConverter: function() { return /* binding */ FilterClientsValueConverter; }
/* harmony export */ });
class FilterClientsValueConverter {
  toView(array, unassigned, unassignedCode, sandbox, sandboxCode, product) {
    if (array) {
      // if(!clientRelevant) return array;
      if (product) {
        array = array.filter(item => {
          return item.productId === product;
        });
      }
      if (sandbox) {
        array = array.filter(item => {
          return item.clientStatus == sandboxCode;
        });
      } else if (unassigned) {
        array = array.filter(item => {
          return item.clientStatus == unassignedCode;
        });
      }
      // else {
      //     array = array.filter((item) => {
      //         return item.clientStatus != sandboxCode;
      //     })
      // }
    }

    return array;
  }
}

/***/ }),

/***/ "resources/value-converters/filter-notice":
/*!*********************************************************!*\
  !*** ./src/resources/value-converters/filter-notice.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   filterNoticeValueConverter: function() { return /* binding */ filterNoticeValueConverter; }
/* harmony export */ });
class filterNoticeValueConverter {
  toView(array) {
    if (array) {
      if (array.length > 5) {
        let newArray = [];
        let updatedItems = 0;
        array.forEach(notice => {
          if (notice.notice.indexOf('Closed') > -1) {
            newArray.push(notice);
          } else if (updatedItems < 5) {
            newArray.push(notice);
            updatedItems = updatedItems++;
          }
        });
      } else if (array.length <= 5) {
        return array;
      }
    }
  }
}

/***/ }),

/***/ "resources/value-converters/filter-sessions":
/*!***********************************************************!*\
  !*** ./src/resources/value-converters/filter-sessions.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   filterSessionsValueConverter: function() { return /* binding */ filterSessionsValueConverter; }
/* harmony export */ });
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ 381);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);

class filterSessionsValueConverter {
  toView(array, filter, keep, sort) {
    if (array && filter) {
      let activePresent = false;
      let requestPresent = false;
      array.forEach(item => {
        if (item.sessionStatus === 'Active') activePresent = true;
        if (item.sessionStatus === 'Requests') requestPresent = true;
      });
      if (activePresent && requestPresent) {
        return array.filter(item => {
          return item['sessionStatus'] === keep;
        });
      }
    }
    if (sort) {
      var sortOrder = sort ? -1 : 1;
      array.sort((a, b) => {
        var sort = moment__WEBPACK_IMPORTED_MODULE_0___default()(a['startDate']).isAfter(b['startDate']) ? 1 : -1;
        return sort * sortOrder;
      });
    }
    return array;
  }
}

/***/ }),

/***/ "resources/value-converters/format-digits":
/*!*********************************************************!*\
  !*** ./src/resources/value-converters/format-digits.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FormatDigitsValueConverter: function() { return /* binding */ FormatDigitsValueConverter; }
/* harmony export */ });
class FormatDigitsValueConverter {
  toView(value, digits) {
    if (value) {
      digits = digits || 2;
      if (typeof value === "string") value = Number(value);
      return +value.toFixed(digits);
    }
  }
}

/***/ }),

/***/ "resources/value-converters/format-number":
/*!*********************************************************!*\
  !*** ./src/resources/value-converters/format-number.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FormatNumberValueConverter: function() { return /* binding */ FormatNumberValueConverter; }
/* harmony export */ });
class FormatNumberValueConverter {
  toView(value, digits) {
    if (value) {
      let x = value.toFixed(2);
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
}

/***/ }),

/***/ "resources/value-converters/format-phone":
/*!********************************************************!*\
  !*** ./src/resources/value-converters/format-phone.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FormatPhoneValueConverter: function() { return /* binding */ FormatPhoneValueConverter; }
/* harmony export */ });
class FormatPhoneValueConverter {
  toView(value, ext) {
    if (!value) return;
    let phone = value.substring(0, 3) + "-" + value.substring(3, 6) + "-" + value.substring(6, 10);
    if (ext) phone += ' ext. ' + ext;
    return phone;
  }
}

/***/ }),

/***/ "resources/value-converters/get-array-value":
/*!***********************************************************!*\
  !*** ./src/resources/value-converters/get-array-value.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GetArrayValueValueConverter: function() { return /* binding */ GetArrayValueValueConverter; }
/* harmony export */ });
class GetArrayValueValueConverter {
  toView(value, array, property, indexAdjust) {
    if (value != undefined && array && property) {
      let index = indexAdjust ? parseInt(value) + indexAdjust : parseInt(value);
      return array[index][property];
    }
    return "";
  }
}

/***/ }),

/***/ "resources/value-converters/gravatar-url-id":
/*!***********************************************************!*\
  !*** ./src/resources/value-converters/gravatar-url-id.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GravatarUrlIdValueConverter: function() { return /* binding */ GravatarUrlIdValueConverter; }
/* harmony export */ });
class GravatarUrlIdValueConverter {
  toView(id, array, size, alt) {
    var email = "";
    if (id !== undefined && array !== undefined) {
      for (var i = 0; i < array.length; i++) {
        if (id === array[i]._id) {
          email = array[i].email;
          break;
        }
      }
      var size = size || 80;
      return '<img src="https://secure.gravatar.com/avatar/' + CryptoJS.MD5(email.toLowerCase()) + '.jpg?s=' + size + '"/>';
    } else {
      switch (alt) {
        case 1:
        case 6:
          return "<i class='fa fa-file-text'></i>";
      }
    }
  }
}

/***/ }),

/***/ "resources/value-converters/gravatar-url":
/*!********************************************************!*\
  !*** ./src/resources/value-converters/gravatar-url.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GravatarUrlValueConverter: function() { return /* binding */ GravatarUrlValueConverter; }
/* harmony export */ });
/**
 * Created by Ross on 12/11/2015.
 */

class GravatarUrlValueConverter {
  toView(email, size) {
    if (email) {
      var size = size || 80;
      var html = '<img class="img-circle" src="https://secure.gravatar.com/avatar/' + CryptoJS.MD5(email.toLowerCase()) + '.jpg?s=' + size + '"/>';
      return html;
    } else {
      return "<i class='fa fa-file-text'></i>";
    }
  }
}

/***/ }),

/***/ "resources/value-converters/help-ticket-statuses":
/*!****************************************************************!*\
  !*** ./src/resources/value-converters/help-ticket-statuses.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HelpTicketStatusesValueConverter: function() { return /* binding */ HelpTicketStatusesValueConverter; }
/* harmony export */ });
class HelpTicketStatusesValueConverter {
  toView(array, remove) {
    if (array === undefined) return;
    if (remove === undefined) return array;
    var newArray = new Array();
    array.forEach(item => {
      if (remove.indexOf(item.code) === -1) {
        newArray.push(item);
      }
    });
    return newArray;
  }
}

/***/ }),

/***/ "resources/value-converters/help-ticket-subtypes":
/*!****************************************************************!*\
  !*** ./src/resources/value-converters/help-ticket-subtypes.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HelpTicketSubtypesValueConverter: function() { return /* binding */ HelpTicketSubtypesValueConverter; }
/* harmony export */ });
class HelpTicketSubtypesValueConverter {
  toView(array) {
    if (array === undefined) return;
    var newArray = new Array();
    array.forEach(item => {
      item.subtypes.forEach(itemSub => {
        newArray.push(itemSub);
      });
    });
    return newArray;
  }
}

/***/ }),

/***/ "resources/value-converters/help-ticket-type":
/*!************************************************************!*\
  !*** ./src/resources/value-converters/help-ticket-type.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HelpTicketTypeValueConverter: function() { return /* binding */ HelpTicketTypeValueConverter; }
/* harmony export */ });
class HelpTicketTypeValueConverter {
  toView(value, array) {
    if (value === undefined || array === undefined) return;
    if (value === "OTHER") return "Other General";
    for (var j = 0; j < array.length; j++) {
      for (var i = 0; i < array[j].subtypes.length; i++) {
        if (array[j].subtypes[i].type === value) return array[j].subtypes[i].description;
      }
    }
    return "";
  }
}

/***/ }),

/***/ "resources/value-converters/idsRequested":
/*!********************************************************!*\
  !*** ./src/resources/value-converters/idsRequested.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IdsRequestedValueConverter: function() { return /* binding */ IdsRequestedValueConverter; }
/* harmony export */ });
class IdsRequestedValueConverter {
  toView(value) {
    if (value) {
      value.graduateIds = value.graduateIds === null ? 0 : value.graduateIds;
      value.undergradIds = value.undergradIds === null ? 0 : value.undergradIds;
      return parseInt(value.graduateIds) + parseInt(value.undergradIds);
    }
    return 0;
  }
}

/***/ }),

/***/ "resources/value-converters/info-filter":
/*!*******************************************************!*\
  !*** ./src/resources/value-converters/info-filter.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InfoFilterValueConverter: function() { return /* binding */ InfoFilterValueConverter; }
/* harmony export */ });
class InfoFilterValueConverter {
  toView(array, value, length) {
    if (value && array) {
      return array.filter(item => {
        return item.itemType == value;
      });
    }
    return length ? array.length > 0 : array;
  }
}

/***/ }),

/***/ "resources/value-converters/lookup-ht-status":
/*!************************************************************!*\
  !*** ./src/resources/value-converters/lookup-ht-status.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LookupHTStatusValueConverter: function() { return /* binding */ LookupHTStatusValueConverter; }
/* harmony export */ });
class LookupHTStatusValueConverter {
  toView(value, array) {
    if (value && array) {
      if (value > 6) {
        value = parseInt(value / 10);
      }
      for (var i = 0; i < array.length; i++) {
        if (value == array[i].code) {
          return array[i].description;
        }
      }
    }
    return "";
  }
}

/***/ }),

/***/ "resources/value-converters/lookup-value":
/*!********************************************************!*\
  !*** ./src/resources/value-converters/lookup-value.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LookupValueValueConverter: function() { return /* binding */ LookupValueValueConverter; }
/* harmony export */ });
class LookupValueValueConverter {
  toView(value, array, key, property) {
    if (value && array && property && key) {
      for (var i = 0; i < array.length; i++) {
        if (value == array[i][key]) {
          return array[i][property];
        }
      }
    }
    return "";
  }
}

/***/ }),

/***/ "resources/value-converters/onoff-switch":
/*!********************************************************!*\
  !*** ./src/resources/value-converters/onoff-switch.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OnoffSwitchValueConverter: function() { return /* binding */ OnoffSwitchValueConverter; }
/* harmony export */ });
class OnoffSwitchValueConverter {
  toView(value) {
    if (value == 'false') {
      return '<i class="fa fa-toggle-on fa-lg" aria-hidden="true"></i> Turn On';
    } else {
      return '<i class="fa fa-toggle-off fa-lg" aria-hidden="true"></i> Turn Off';
    }
  }
}

/***/ }),

/***/ "resources/value-converters/overlap":
/*!***************************************************!*\
  !*** ./src/resources/value-converters/overlap.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OverlapValueConverter: function() { return /* binding */ OverlapValueConverter; }
/* harmony export */ });
class OverlapValueConverter {
  toView(value) {
    if (value) {
      return value == 'danger' ? 'Overlapping Range' : 'Valid Range';
    }
    return "";
  }
}

/***/ }),

/***/ "resources/value-converters/parse-apjassignments":
/*!****************************************************************!*\
  !*** ./src/resources/value-converters/parse-apjassignments.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ParseAPJAssignmentsValueConverter: function() { return /* binding */ ParseAPJAssignmentsValueConverter; }
/* harmony export */ });
class ParseAPJAssignmentsValueConverter {
  toView(value, systems) {
    if (!value || value === null) {
      return "";
    } else {
      let assignments = "";
      value.forEach(item => {
        let system = "";
        for (let i = 0; i < systems.length; i++) {
          if (systems[i]._id === item.systemId) {
            system = systems[i].sid;
            break;
          }
        }
        if (system === "") system = "NA";
        assignments += system + " " + item.client + "<br>";
      });
      return assignments;
    }
  }
}

/***/ }),

/***/ "resources/value-converters/parse-assignments":
/*!*************************************************************!*\
  !*** ./src/resources/value-converters/parse-assignments.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ParseAssignmentsValueConverter: function() { return /* binding */ ParseAssignmentsValueConverter; }
/* harmony export */ });
class ParseAssignmentsValueConverter {
  toView(value, systems) {
    if (!value || value === null) {
      return "";
    } else {
      let assignments = "";
      value.forEach(item => {
        let system = "";
        for (let i = 0; i < systems.length; i++) {
          if (systems[i]._id === item.systemId) {
            system = systems[i].sid;
            break;
          }
        }
        if (system === "") system = "NA";
        assignments += system + " " + item.client + "<br>";
      });
      return assignments;
    }
  }
}

/***/ }),

/***/ "resources/value-converters/person-status-button":
/*!****************************************************************!*\
  !*** ./src/resources/value-converters/person-status-button.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PersonStatusButtonValueConverter: function() { return /* binding */ PersonStatusButtonValueConverter; }
/* harmony export */ });
class PersonStatusButtonValueConverter {
  toView(value) {
    if (!value) return;
    switch (value) {
      case '01':
        return '<span bootstrap-tooltip data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Deactivate"><i class="fa fa-toggle-off" aria-hidden="true"></i></span>';
        break;
      case '02':
        return '<span bootstrap-tooltip data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Activate"><i class="fa fa-toggle-on" aria-hidden="true"></i></span>';
        break;
      default:
        return "";
    }
  }
}

/***/ }),

/***/ "resources/value-converters/phone-number":
/*!********************************************************!*\
  !*** ./src/resources/value-converters/phone-number.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PhoneNumberValueConverter: function() { return /* binding */ PhoneNumberValueConverter; }
/* harmony export */ });
class PhoneNumberValueConverter {
  toView(value, masks, country, ext) {
    // var mask = "___-___-____";
    if (!country || country === '99') return value;
    if (value) {
      value = value.replace(/ /g, '');
      value = value.replace(/-/g, '');
      var mask = "";
      let returnValue = "";
      for (let i = 0; i < masks.length; i++) {
        if (masks[i].country === country) {
          mask = masks[i].mask;
          break;
        }
      }
      if (mask) {
        let numChars = mask.length;
        for (let j = 0; j < numChars; j++) {
          let digit = mask.substr(0, 1);
          mask = mask.slice(1);
          if (digit === '9') {
            returnValue += value.substr(0, 1);
            value = value.slice(1);
          } else {
            returnValue += digit;
          }
        }
      } else {
        return value;
      }
      if (ext) returnValue += ' ext. ' + ext;
      return returnValue;

      // if(value.length > 10) value = value.substr(0,10);
      // if(value.length === 0){
      // 	return mask;
      // }
      // else if(value.length <= 3){
      //   return value;// + mask.substr(value.length);
      // } else if (value.length > 3 && value.length <= 6) {
      //   return value.substr(0,3) + "-" + value.substr(3, value.length - 3);// + mask.substr(value.length + 1);
      // } else {
      //   return value.substr(0,3) + "-" + value.substr(3,3) + "-" + value.substr(6,value.length);// + mask.substr(value.length + 2);
      // }
    }
  }
}

/***/ }),

/***/ "resources/value-converters/request-status-class":
/*!****************************************************************!*\
  !*** ./src/resources/value-converters/request-status-class.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RequestStatusClassValueConverter: function() { return /* binding */ RequestStatusClassValueConverter; }
/* harmony export */ });
class RequestStatusClassValueConverter {
  toView(value, array, request, customerActionStatus) {
    if (!value || !array || !request) return;
    customerActionStatus = customerActionStatus ? customerActionStatus : '4';
    if (request.requestStatus == customerActionStatus) return "";
    return array[value];
  }
}

/***/ }),

/***/ "resources/value-converters/sandbox":
/*!***************************************************!*\
  !*** ./src/resources/value-converters/sandbox.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SandboxValueConverter: function() { return /* binding */ SandboxValueConverter; }
/* harmony export */ });
class SandboxValueConverter {
  toView(value, sandbox) {
    if (value === null) {
      return sandbox;
    } else {
      return 'Regular';
    }
  }
}

/***/ }),

/***/ "resources/value-converters/session-name":
/*!********************************************************!*\
  !*** ./src/resources/value-converters/session-name.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SessionNameValueConverter: function() { return /* binding */ SessionNameValueConverter; }
/* harmony export */ });
class SessionNameValueConverter {
  toView(value, array) {
    if (value === undefined || array === undefined) return;
    for (var i = 0; i < array.length; i++) {
      if (value === array[i]._id) {
        return array[i].session + " " + array[i].year;
      }
    }
    return "Unknown";
  }
}

/***/ }),

/***/ "resources/value-converters/session-status-button":
/*!*****************************************************************!*\
  !*** ./src/resources/value-converters/session-status-button.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SessionStatusButtonValueConverter: function() { return /* binding */ SessionStatusButtonValueConverter; }
/* harmony export */ });
class SessionStatusButtonValueConverter {
  toView(value) {
    if (!value) return;
    switch (value) {
      case 'Active':
        return '<span bootstrap-tooltip data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Close"><i class="fa fa-hourglass-end" aria-hidden="true"></i></span>';
        break;
      case 'Requests':
        return '<span bootstrap-tooltip data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Activate"><i class="fa fa-check-square-o" aria-hidden="true"></i></span>';
        break;
      case 'Next':
        return '<span bootstrap-tooltip data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Open"><i class="fa fa-cart-plus" aria-hidden="true"></i></span>';
        break;
      default:
        return "";
    }
  }
}

/***/ }),

/***/ "resources/value-converters/session-systems":
/*!***********************************************************!*\
  !*** ./src/resources/value-converters/session-systems.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SessionSystemsValueConverter: function() { return /* binding */ SessionSystemsValueConverter; }
/* harmony export */ });
class SessionSystemsValueConverter {
  toView(value, session, systems) {
    if (value && session && systems) {
      return value.filter(item => {
        for (let i = 0; i < systems.length; i++) {
          if (systems[i]._id === item.systemId) {
            return systems[i].sessions.indexOf(session) > -1;
          }
        }
        return false;
      });
    }
  }
}

/***/ }),

/***/ "resources/value-converters/session-type":
/*!********************************************************!*\
  !*** ./src/resources/value-converters/session-type.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SessionTypeValueConverter: function() { return /* binding */ SessionTypeValueConverter; }
/* harmony export */ });
class SessionTypeValueConverter {
  toView(array, value) {
    var sessions = [];
    var statuses = value.split(':');
    if (value === undefined || array === undefined) return sessions;
    array.forEach(function (session) {
      if (statuses.indexOf(session.sessionStatus) > -1) {
        sessions.push(session);
      }
    });
    return sessions;
  }
}

/***/ }),

/***/ "resources/value-converters/session":
/*!***************************************************!*\
  !*** ./src/resources/value-converters/session.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SessionValueConverter: function() { return /* binding */ SessionValueConverter; }
/* harmony export */ });
class SessionValueConverter {
  toView(value, array) {
    var openSessions = [];
    if (value === undefined || array === undefined) return;
    for (var i = 0; i < array.length; i++) {
      if (value === array[i]._id && array[i].status !== 'Next') {
        return array[i].session + " " + array[i].year;
      }
    }
    return "Unknown";
  }
}

/***/ }),

/***/ "resources/value-converters/sort-array":
/*!******************************************************!*\
  !*** ./src/resources/value-converters/sort-array.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SortArrayValueConverter: function() { return /* binding */ SortArrayValueConverter; }
/* harmony export */ });
class SortArrayValueConverter {
  toView(array, propertyName, direction) {
    if (array && propertyName) {
      this.sortDirection = direction === "ASC" ? 1 : -1;
      return array.sort((a, b) => {
        var result = a[propertyName] < b[propertyName] ? -1 : a[propertyName] > b[propertyName] ? 1 : 0;
        return result * this.sortDirection;
      });
    }
  }
}

/***/ }),

/***/ "resources/value-converters/sort-date-time":
/*!**********************************************************!*\
  !*** ./src/resources/value-converters/sort-date-time.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SortDateTimeValueConverter: function() { return /* binding */ SortDateTimeValueConverter; }
/* harmony export */ });
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ 381);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);

class SortDateTimeValueConverter {
  toView(array, propertyName, sortProp, tech, trim) {
    if (array === undefined) return;
    var sortOrder = sortProp === "ASC" ? 1 : -1;
    var sortArray = [];
    var firstItem;
    array.forEach((item, index) => {
      if (index === 0) {
        firstItem = item;
      } else {
        if (tech || !tech && !item.confidential) sortArray.push(item);
        ;
      }
    });
    sortArray.sort((a, b) => {
      var sort = moment__WEBPACK_IMPORTED_MODULE_0___default()(a[propertyName]).isAfter(b[propertyName]) ? 1 : -1;
      return sort * sortOrder;
    });
    if (!trim) sortArray.unshift(firstItem);
    return sortArray;
  }
}

/***/ }),

/***/ "resources/value-converters/stat-value":
/*!******************************************************!*\
  !*** ./src/resources/value-converters/stat-value.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StatValueValueConverter: function() { return /* binding */ StatValueValueConverter; }
/* harmony export */ });
class StatValueValueConverter {
  toView(value, array, index) {
    if (value && array && index >= 0) {
      return value[array[index].code];
    }
  }
}

/***/ }),

/***/ "resources/value-converters/system-list":
/*!*******************************************************!*\
  !*** ./src/resources/value-converters/system-list.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SystemListValueConverter: function() { return /* binding */ SystemListValueConverter; }
/* harmony export */ });
class SystemListValueConverter {
  toView(array) {
    if (array !== undefined && array.length > 0) {
      var list = "";
      for (var i = 0; i < array.length; i++) {
        list += array[i].sid + " ";
      }
      return list;
    }
    return "";
  }
}

/***/ }),

/***/ "resources/value-converters/to-uppercase":
/*!********************************************************!*\
  !*** ./src/resources/value-converters/to-uppercase.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ToUppercaseValueConverter: function() { return /* binding */ ToUppercaseValueConverter; }
/* harmony export */ });
class ToUppercaseValueConverter {
  toView(value) {
    if (value) {
      return value.toUpperCase();
    }
  }
}

/***/ }),

/***/ "resources/value-converters/translate-status":
/*!************************************************************!*\
  !*** ./src/resources/value-converters/translate-status.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TranslateStatusValueConverter: function() { return /* binding */ TranslateStatusValueConverter; }
/* harmony export */ });
/**
 * Created by Ross on 1/21/2016.
 */
class TranslateStatusValueConverter {
  toView(value) {
    return value ? "Active" : "Inactive";
  }
}

/***/ }),

/***/ "resources/value-converters/ucc-staff":
/*!*****************************************************!*\
  !*** ./src/resources/value-converters/ucc-staff.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UccStaffValueConverter: function() { return /* binding */ UccStaffValueConverter; }
/* harmony export */ });
class UccStaffValueConverter {
  toView(array) {
    if (array) {
      return array.filter(item => {
        return item.roles.indexOf('UCCT') > -1;
      });
    }
    return array;
  }
}

/***/ }),

/***/ "resources/value-converters/ucc-title":
/*!*****************************************************!*\
  !*** ./src/resources/value-converters/ucc-title.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   uccTitleValueConverter: function() { return /* binding */ uccTitleValueConverter; }
/* harmony export */ });
class uccTitleValueConverter {
  toView(value, array) {
    for (let i = 0; i < array.length; i++) {
      if (value == array[i].role) return array[i].label;
    }
    return "";
  }
}

/***/ }),

/***/ "resources/elements/tree-node.css":
/*!**********************************************!*\
  !*** ./src/resources/elements/tree-node.css ***!
  \**********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ 7537);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ 3645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".treeview .list-group-item {\r\n  cursor: pointer;\r\n}\r\n\r\n.treeview span.indent {\r\n  margin-left: 10px;\r\n  margin-right: 10px;\r\n}\r\n\r\n.treeview span.icon {\r\n  width: 12px;\r\n  margin-right: 5px;\r\n}\r\n\r\n.treeview .node-disabled {\r\n  color: silver;\r\n  cursor: not-allowed;\r\n}\r\n", "",{"version":3,"sources":["webpack://./src/resources/elements/tree-node.css"],"names":[],"mappings":"AAAA;EACE,eAAe;AACjB;;AAEA;EACE,iBAAiB;EACjB,kBAAkB;AACpB;;AAEA;EACE,WAAW;EACX,iBAAiB;AACnB;;AAEA;EACE,aAAa;EACb,mBAAmB;AACrB","sourcesContent":[".treeview .list-group-item {\r\n  cursor: pointer;\r\n}\r\n\r\n.treeview span.indent {\r\n  margin-left: 10px;\r\n  margin-right: 10px;\r\n}\r\n\r\n.treeview span.icon {\r\n  width: 12px;\r\n  margin-right: 5px;\r\n}\r\n\r\n.treeview .node-disabled {\r\n  color: silver;\r\n  cursor: not-allowed;\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "resources/dialogs/document-dialog.html":
/*!****************************************************!*\
  !*** ./src/resources/dialogs/document-dialog.html ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <style>\r\n\t\tux-dialog-header {\r\n\t\t\tcolor: ${config.SUBMENU_COLOR};\r\n\t\t\tbackground-color:${config.SUBMENU_BACKGROUND}\r\n\t\t}\r\n\t</style>\r\n\t<ux-dialog style=\"width:800px;\">\r\n\t\t<ux-dialog-header>${model.title}</ux-dialog-header>\r\n\t\t<ux-dialog-body>\r\n\t\t\t<div class=\"panel panel-default\">\r\n\t\t\t\t<div class=\"panel-body\">\r\n\t\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t\t<div class=\"col-lg-4\">\r\n\t\t\t\t\t\t\t<div show.bind=\"!categoryForm\">\r\n\t\t\t\t\t\t\t\t<label>Avuxlable Categories</label>\r\n\t\t\t\t\t\t\t\t<div class=\"well well2 overFlow\" style=\"height:400px;\">\r\n\t\t\t\t\t\t\t\t\t<input class=\"form-control\" value.bind=\"filter\" input.trigger=\"filterList()\" placeholder=\"Filter Categories\" />\r\n\t\t\t\t\t\t\t\t\t<ul class=\"list-group\">\r\n\t\t\t\t\t\t\t\t\t\t<button click.trigger=\"typeChanged($index)\" type=\"button\" repeat.for=\"type of filteredDocumentArray\" id=\"${type.code}\" class=\"list-group-item\">${type.description}</button>\r\n\t\t\t\t\t\t\t\t\t</ul>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t<div class=\"col-lg-8\" style='padding:15px;'>\r\n\t\t\t\t\t\t\t<table show.bind=\"model.documents.documents.length > 0\" id=\"coursesTable\" class=\"table table-striped table-hover\">\r\n\t\t\t\t\t\t\t\t<thead>\r\n\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t<th>Document </th>\r\n\t\t\t\t\t\t\t\t\t\t<th></th>\r\n\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t</thead>\r\n\t\t\t\t\t\t\t\t<tbody>\r\n\t\t\t\t\t\t\t\t\t<tr repeat.for=\"document of model.documents.documents\">\r\n\t\t\t\t\t\t\t\t\t\t<td data-title=\"name\"><a target=\"_blank\" href=\"${config.DOCUMENT_FILE_DOWNLOAD_URL}/${document.categoryCode}/${document.categoryName}/${document.fileName}\">${document.fileName}</a></td>\r\n\t\t\t\t\t\t\t\t\t\t<td click.trigger=\"removeDocument($index)\"><i class=\"fa fa-trash\"></i></td>\r\n\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t</tbody>\r\n\t\t\t\t\t\t\t</table>\r\n\t\t\t\t\t\t\t<div show.bind=\"showDocuments\">\r\n\t\t\t\t\t\t\t\t<div show.bind=\"showDocumentForm\">\r\n\t\t\t\t\t\t\t\t\t<compose view=\"./documentForm.html\"></compose>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t<compose show.bind=\"!showDocumentForm\" view=\"./documentsTable.html\"></compose>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t</ux-dialog-body>\r\n\r\n\t\t<ux-dialog-footer>\r\n\t\t\t<div class=\"pull-right topMargin bottomMargin rightMargin\">\r\n\t\t\t\t<button class=\"btn btn-primary smallMarginRight\" repeat.for=\"option of model.options\" click.trigger=\"selectOption(option)\">${option}</button>\r\n\t\t\t</div>\r\n\t\t</ux-dialog-footer>\r\n\t</ux-dialog>\r\n</template>\r\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "resources/dialogs/documentForm.html":
/*!*************************************************!*\
  !*** ./src/resources/dialogs/documentForm.html ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div id=\"no-more-tables\">\r\n        <table class=\"table table-striped table-hover cf\">\r\n            <thead class=\"cf\">\r\n                <tr>\r\n                    <th>Add</th>\r\n                    <th>Name</th>\r\n                    <th>Version</th>\r\n                    <th>Date Uploaded</th>\r\n                </tr>\r\n            </thead>\r\n            <tbody>\r\n                <tr repeat.for=\"item of documents.selectedDocument.files\">\r\n                    <td click.trigger=\"addDocument($index)\"><i class=\"fa fa-plus\" aria-hidden=\"true\"></i></td>\r\n                    <td data-title=\"Name\"><a target=\"_blank\" href=\"${config.DOCUMENT_FILE_DOWNLOAD_URL}/${documents.selectedDocument.categoryCode}/${documents.selectedDocument.name}/${item.fileName}\">${item.originalFilename}</a></td>\r\n                    <td data-title=\"Version\">${item.version}</td>\r\n                    <td data-title=\"Date Uploaded\">${item.dateUploaded | dateFormat:config.DATE_FORMAT_TABLE}</td>\r\n                </tr>\r\n            </tbody>\r\n        </table>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "resources/dialogs/documentsTable.html":
/*!***************************************************!*\
  !*** ./src/resources/dialogs/documentsTable.html ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div class='row'>\r\n        <div class='col-lg-10 col-lg-offset-1 bottomMargin'>\r\n            <div id=\"no-more-tables\">\r\n                <table class=\"table table-striped table-hover cf\">\r\n                    <thead class=\"cf\">\r\n                        <tr>\r\n                            <th>Name </th>\r\n                            <th>Description</th>\r\n                            <th>Date Created</th>\r\n                        </tr>\r\n                    </thead>\r\n                    <tbody>\r\n                        <tr click.trigger=\"chooseDocument($index, $event)\" repeat.for=\"item of documents.documentsArray\">\r\n                            <td data-title=\"name\">${item.name}</td>\r\n                            <td data-title=\"description\">${item.description}</td>\r\n                            <td data-title=\"createdDate\">${item.createdDate | dateFormat:config.DATE_FORMAT_TABLE}</td>\r\n                        </tr>\r\n                    </tbody>\r\n                </table>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "resources/dialogs/email-dialog.html":
/*!*************************************************!*\
  !*** ./src/resources/dialogs/email-dialog.html ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <style>\r\n\t\tux-dialog-header {\r\n\t\t\tcolor: ${config.SUBMENU_COLOR};\r\n\t\t\tbackground-color:${config.SUBMENU_BACKGROUND}\r\n\t\t}\r\n\t</style>\r\n\t<ux-dialog style=\"max-width: 600px\">\r\n    \t<ux-dialog-header>${model.title}</ux-dialog-header>\r\n\r\n\t\t<ux-dialog-body>\r\n\t\t\t<input class=\"form-control bottomMargin\" value.bind=\"model.email.emailSubject\" placeholder=\"Subject\"/>\r\n\r\n\t\t\t<ul show.bind=\"model.email.products && model.email. products.length\" class=\"list-group\">\r\n\t\t\t\t<li click.delegate=\"selectProduct(product, $index)\" repeat.for=\"product of model.email.products\" class=\"list-group-item\">\r\n\t\t\t\t\t${product.productId.name}\r\n\t\t\t\t</li>\r\n\t\t\t</ul>\r\n\r\n\t\t\t<div class=\"topMargin\">\r\n\t\t\t\t<editor value.bind=\"model.email.emailBody\" height=\"250\" editorid.two-way=\"editorId\"></editor>\r\n\t\t\t</div>\r\n\t\t</ux-dialog-body>\r\n\r\n\t\t<ux-dialog-footer>\r\n\t\t\t<button class=\"btn btn-primary\" repeat.for=\"option of model.options\" click.trigger=\"selectOption(option)\">${option}</button>\r\n\t\t</ux-dialog-footer>\r\n  \t</ux-dialog>\r\n</template>\r\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "resources/dialogs/event-dialog.html":
/*!*************************************************!*\
  !*** ./src/resources/dialogs/event-dialog.html ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t<style>\r\n\t\tux-dialog-header {\r\n\t\t\tcolor: ${config.SUBMENU_COLOR};\r\n\t\t\tbackground-color:${config.SUBMENU_BACKGROUND}\r\n\t\t}\r\n\t</style>\r\n  <ux-dialog style=\"max-width: 800px\">\r\n    <ux-dialog-header>${model.title}</ux-dialog-header>\r\n\r\n    <ux-dialog-body>\r\n\t\t<label>Title</label>\r\n\t\t<input class=\"form-control\" value.bind=\"model.event.eventTitle\" ref=\"titleInput\"></input>\r\n\t\t<label>Start Time</label>\r\n\t\t<flat-picker controlid=\"startDate\" config.bind=\"flatpickrConfig\" value.bind=\"model.event.eventStart\"></flat-picker>\r\n\t\t<div class=\"form-group\">\r\n\t\t\t<div class=\"checkbox\">\r\n\t\t\t\t<label class=\"pull-left\">\r\n\t\t\t\t\t<input id=\"activeProduct\" checked.bind=\"model.event.allDay\" type=\"checkbox\"> All day\r\n\t\t\t\t</label>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<br/>\r\n\t\t<div show.bind=\"!model.event.allDay\">\r\n\t\t\t<label>End Time</label>\r\n\t\t\t<flat-picker controlid=\"endDate\" config.bind=\"flatpickrConfig\" value.bind=\"model.event.eventEnd\"></flat-picker>\r\n\t\t</div>\r\n\t\t<div class=\"form-group\">\r\n\t\t\t<div class=\"checkbox\">\r\n\t\t\t\t<label class=\"pull-left\">\r\n\t\t\t\t\t<input id=\"uccRelated\" checked.bind=\"model.event.scope\" type=\"checkbox\"> Notification\r\n\t\t\t\t</label>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<br/>\r\n\t\t\t<label>Notes</label>\r\n\t\t\t<editor value.bind=\"model.event.notes\" height=\"250\"></editor>\r\n\t\t\r\n    </ux-dialog-body>\r\n\r\n    <ux-dialog-footer> \r\n      <button class=\"btn btn-primary smallMarginRight\" repeat.for=\"option of model.options\" click.trigger=\"selectOption(option)\">${option}</button>\r\n    </ux-dialog-footer>\r\n  </ux-dialog>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "resources/dialogs/helpTicket-dialog.html":
/*!******************************************************!*\
  !*** ./src/resources/dialogs/helpTicket-dialog.html ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <style>\r\n        ux-dialog-header {\r\n            color: $ {\r\n                config.SUBMENU_COLOR\r\n            }\r\n\r\n            ;\r\n\r\n            background-color:$ {\r\n                config.SUBMENU_BACKGROUND\r\n            }\r\n        }\r\n    </style>\r\n    <ux-dialog style=\"width:800px;\">\r\n        <ux-dialog-header>${model.title}</ux-dialog-header>\r\n\r\n        <ux-dialog-body>\r\n            <label>Please provide the reason for closing the help ticket</label>\r\n            <select class=\"form-control\" change.delegate=\"reasonSelected()\" value.bind=\"model.selectedReason\">\r\n                <option value=\"\">Please select a reason</option>\r\n                <option repeat.for=\"option of config.HELP_TICKET_CLOSE_REASONS\" model.bind=\"$index\">${option.reason}</option>\r\n            </select>\r\n            <div show.bind=\"model.selectedReason == config.HELP_TICKET_CLOSE_REASON_OTHER\" class=\"topMargin\">\r\n                <label>Please provide the reason</label>\r\n                <textarea  class=\"form-control\" id=\"otherReason\" value.bind=\"model.otherReason\" rows=\"5\"></textarea>\r\n            </div>\r\n            <div class=\"topMargin\">\r\n                <label>One of our goals is to learn from each other and share the knowledge</label>\r\n                <label>Please let us know how you resolved the issue</label>\r\n                <textarea  class=\"form-control\" id=\"method\" value.bind=\"model.method\" rows=\"5\"></textarea>\r\n            </div>\r\n        </ux-dialog-body>\r\n\r\n        <ux-dialog-footer>\r\n            <button class=\"btn btn-primary smallMarginRight\" repeat.for=\"option of model.options\" click.trigger=\"selectOption(option)\">${option}</button>\r\n        </ux-dialog-footer>\r\n    </ux-dialog>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "resources/dialogs/input-dialog.html":
/*!*************************************************!*\
  !*** ./src/resources/dialogs/input-dialog.html ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t<style>\r\n\t\tux-dialog-header {\r\n\t\t\tcolor: ${config.SUBMENU_COLOR};\r\n\t\t\tbackground-color:${config.SUBMENU_BACKGROUND}\r\n\t\t}\r\n\t</style>\r\n  <ux-dialog style=\"max-width: 800px\">\r\n    <ux-dialog-header>${model.title}</ux-dialog-header>\r\n\r\n    <ux-dialog-body>\r\n\t\t<input class=\"form-control\" value.bind=\"model.valueName\" ref=\"valueInput\"></input>\r\n    </ux-dialog-body>\r\n\r\n    <ux-dialog-footer> \r\n      <button class=\"btn btn-primary smallMarginRight\" repeat.for=\"option of model.options\" click.trigger=\"selectOption(option)\">${option}</button>\r\n    </ux-dialog-footer>\r\n  </ux-dialog>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "resources/dialogs/message-dialog.html":
/*!***************************************************!*\
  !*** ./src/resources/dialogs/message-dialog.html ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n  <style>\r\n\t\tux-dialog-header {\r\n\t\t\tcolor: ${config.SUBMENU_COLOR};\r\n\t\t\tbackground-color:${config.SUBMENU_BACKGROUND}\r\n\t\t}\r\n\t</style>\r\n  <ux-dialog style=\"max-width: 325px\">\r\n    <ux-dialog-header>${model.title}</ux-dialog-header>\r\n\r\n    <ux-dialog-body>\r\n      ${model.message}\r\n    </ux-dialog-body>\r\n\r\n    <ux-dialog-footer>\r\n      <button repeat.for=\"option of model.options\" click.trigger=\"selectOption(option)\">${option}</button>\r\n    </ux-dialog-footer>\r\n  </ux-dialog>\r\n</template>\r\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "resources/dialogs/note-dialog.html":
/*!************************************************!*\
  !*** ./src/resources/dialogs/note-dialog.html ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n  <style>\r\n\t\tux-dialog-header {\r\n\t\t\tcolor: ${config.SUBMENU_COLOR};\r\n\t\t\tbackground-color:${config.SUBMENU_BACKGROUND}\r\n\t\t}\r\n\t</style>\r\n  <ux-dialog style=\"max-width: 600px\">\r\n    <ux-dialog-header>${model.title}</ux-dialog-header>\r\n\r\n    <ux-dialog-body>\r\n\t\t<select class=\"form-control\" value.bind=\"model.selectedCategory\">\r\n\t\t\t<option repeat.for=\"option of model.note.noteCategories\" model.bind=\"$index\">${option}</option>\r\n\t\t</select>\r\n      \t<editor value.bind=\"model.note.noteBody\" height=\"250\"></editor>\r\n    </ux-dialog-body>\r\n\r\n    <ux-dialog-footer>\r\n      <button class=\"btn btn-primary smallMarginRight\" repeat.for=\"option of model.options\" click.trigger=\"selectOption(option)\">${option}</button>\r\n    </ux-dialog-footer>\r\n  </ux-dialog>\r\n</template>\r\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "resources/dialogs/password-dialog.html":
/*!****************************************************!*\
  !*** ./src/resources/dialogs/password-dialog.html ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <style>\r\n\t\tux-dialog-header {\r\n\t\t\tcolor: ${config.SUBMENU_COLOR};\r\n\t\t\tbackground-color:${config.SUBMENU_BACKGROUND}\r\n\t\t}\r\n\t</style>\r\n\t<ux-dialog style=\"width: 600px;\">\r\n\t\t<ux-dialog-header>${model.title}</ux-dialog-header>\r\n\r\n\t\t<ux-dialog-body style=\"height:300px;\">\r\n\t\t\t<h6>Password should be at least ${thresholdLength} characters long and should contain a combination of the following groups:  </h6>\r\n\t\t\t\t<ul>\r\n\t\t\t\t\t<li><h6>lowercase letters</h6></li>\r\n\t\t\t\t\t<li><h6>uppercase letters</h6></li>\r\n\t\t\t\t\t<li><h6> digits or special characters</h6></li>\r\n\t\t\t\t</ul>\r\n\t\t\t<div class=\"topMargin\" style=\"height:50px;\">\r\n\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t<label for=\"register_password\" class=\"col-sm-3 control-label\">Password</label>\r\n\t\t\t\t\t<div class=\"col-md-8\">\r\n\t\t\t\t\t\t<input id=\"register_password\" type=\"password\" attach-focus=\"true\" placeholder=\"Password\" class=\"form-control input-md\" value.bind=\"password\"\r\n\t\t\t\t\t\tblur.trigger=\"passwordComplexity()\" />\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"topMargin\">\r\n\t\t\t\t<div class=\"form-group topMargin\" >\r\n\t\t\t\t\t<label for=\"register_password_repeat\" class=\"col-sm-3 control-label\">Repeat Password</label>\r\n\t\t\t\t\t<div class=\"col-md-8\">\r\n\t\t\t\t\t\t<input id=\"register_password_repeat\" type=\"password\" placeholder=\"Password\" class=\"form-control input-md\" value.bind=\"password_repeat\"\r\n\t\t\t\t\t\t/>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</ux-dialog-body>\r\n\r\n\t\t<ux-dialog-footer>\r\n\t\t\t<button class=\"btn btn-primary smallMarginRight\" repeat.for=\"option of model.options\" click.trigger=\"selectOption(option)\">${option}</button>\r\n\t\t</ux-dialog-footer>\r\n\t</ux-dialog>\r\n</template>\r\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "resources/editor/editor.html":
/*!******************************************!*\
  !*** ./src/resources/editor/editor.html ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t<div class=\"summernote-host\" id.bind=\"editorid\" ref=\"editor\"></div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "resources/elements/add-systems.html":
/*!*************************************************!*\
  !*** ./src/resources/elements/add-systems.html ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n  <div class=\"col-lg-12\">\r\n    <form>\r\n      <div class=\"col-lg-10\">\r\n\t\t\t\t<div class=\"checkbox\">\r\n\t\t\t\t<label>\r\n\t\t\t\t\t<input checked.bind=\"enable\" type=\"checkbox\"> Enable editing\r\n\t\t\t\t</label>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n      <div class=\"col-md-5 topMargin\">\r\n        <label>Available Systems</label>\r\n        <div class=\"well well2 overFlow\" style=\"height:400px;\">\r\n            <input class=\"form-control\" value.bind=\"filter\" input.trigger=\"filterList()\" placeholder=\"Filter systems\"/>\r\n            <ul class=\"list-group\">\r\n              <button click.trigger=\"selectSystem($event, system)\" type=\"button\" repeat.for=\"system of filteredsystemsarray\" id=\"${system._id}\"\r\n                      class=\"list-group-item\">${system.sid}</button>\r\n            </ul>\r\n        </div>\r\n      </div>\r\n      <div class=\"col-md-5 topMargin col-md-offset-1\">\r\n        <label>Assigned Systems</label>\r\n        <div class=\"well well2 overFlow\" style=\"height:400px;\">\r\n          <ul class=\"list-group\">\r\n            <button click.trigger=\"removeSystem($event, system)\" type=\"button\" repeat.for=\"system of selectedproduct.systems\" id=\"${system._id}\"\r\n                    class=\"list-group-item\">${system.sid}</button>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </form>\r\n  </div>\r\n</template>\r\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "resources/elements/flat-picker.html":
/*!*************************************************!*\
  !*** ./src/resources/elements/flat-picker.html ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\n    <style>\n      .enable {\n        background-color: white;\n      }\n      .disable{\n        background-color: #eeeeee;\n      }\n    </style>\n    <!-- <require from=\"flatpickr/flatpickr.css\"></require> -->\n     <div class=\"input-group aurelia-flatpickr\">\n      <input type=\"text\" class=\"aurelia-flatpickr form-control enable\" placeholder=\"Select date\" data-input>\n      <span class=\"input-group-btn\">\n        <button style=\"height:39px;\" class=\"btn btn-default\" type=\"button\" data-clear><i class=\"fa fa-trash fa-border\"></i></button>\n      </span>\n  </div>\n</template>\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "resources/elements/multiselect.html":
/*!*************************************************!*\
  !*** ./src/resources/elements/multiselect.html ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t<label>${label}</label><br/>\r\n\t<select style=\"background-color:white;\" value.bind=\"value\" multiple ref=\"select\" class=\"selectpicker form-control\">\r\n    \t<option repeat.for=\"option of options\" value.bind=\"option.code\">${option.description}</option>\r\n  \t</select>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "resources/elements/nav-bar.html":
/*!*********************************************!*\
  !*** ./src/resources/elements/nav-bar.html ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\n    <style>\n       \n        .accAlert {\n          color: ${config.MENU_COLOR};\n          background-color:${config.SUBMENU_BACKGROUND};\n        }\n        \n        .navbar-default {\n            color: $ {\n                config.MENU_COLOR\n            }\n\n            ;\n\n            background-color:$ {\n                config.MENU_BACKGROUND\n            }\n        }\n\n        .navbar-inverse .navbar-nav>.active>a,\n        .navbar-inverse .navbar-nav>.active>a:hover,\n        .navbar-inverse .navbar-nav>.active>a:focus {\n            color: $ {\n                config.ACTIVE_MENU_COLOR\n            }\n\n            ;\n\n            background-color:$ {\n                config.MENU_BACKGROUND\n            }\n        }\n    </style>\n    <div class=\"noticeProfile\" style=\"z-index:1001;\" class=\"noticeProfile\">\n        <ul class=\"list-group\">\n            <li class=\"list-group-item sortable\"\n                style=\"background-color:Cyan;\" repeat.for=\"notice of noticeArray\">\n                <span style=\"font-weight:bold;\" click.trigger=\"updateNotification(notice, $index)\">${notice.notice}</span><br />\n                by ${notice.personId.fullName} on ${notice.dateCreated | dateFormat:config.DATE_FORMAT_TABLE:false}\n                <span click.delegate=\"deleteNotice(notice, $index)\"\n                class=\"smallMarginRight\" bootstrap-tooltip\n                data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\n                data-original-title=\"Delete Client\"><i class=\"fa fa-trash\"\n                  aria-hidden=\"true\"></i></span>\n            </li>\n        </ul>\n    </div>\n    <nav class=\"navbar navbar-default navbar-fixed-top\">\n        <div class=\"container-fluid\">\n            <!-- Brand and toggle get grouped for better mobile display -->\n            <div class=\"navbar-header\">\n                <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\"\n                    data-target=\"#bs-example-navbar-collapse-1\" aria-expanded=\"false\">\n                    <span class=\"sr-only\">Toggle navigation</span>\n                    <span class=\"icon-bar\"></span>\n                    <span class=\"icon-bar\"></span>\n                    <span class=\"icon-bar\"></span>\n                </button>\n\n                <span>\n                    <a if.bind=\"config.NAVBAR_LOGO && config.NAVBAR_LOGO.length>0 && isAuthenticated\"\n                        class=\"navbar-brand\" href=\"#/user\"><img src=\"${config.IMG_DOWNLOAD_URL}img/${config.NAVBAR_LOGO}\"></a>\n                    <a if.bind=\"config.NAVBAR_LOGO && config.NAVBAR_LOGO.length>0 && !isAuthenticated\"\n                        class=\"navbar-brand\" href=\"#/home\"><img src=\"${config.IMG_DOWNLOAD_URL}img/${config.NAVBAR_LOGO}\"></a>\n                </span>\n                <span>\n                    <a if.bind=\"(!config.NAVBAR_LOGO.length || config.NAVBAR_LOGO.length===0) && isAuthenticated\"\n                        class=\"navbar-brand\" href=\"#/user\"><i class=\"fa fa-home\"></i> UCCSS</a>\n                    <a if.bind=\"(!config.NAVBAR_LOGO.length || config.NAVBAR_LOGO.length===0) && !isAuthenticated\"\n                        class=\"navbar-brand\" href=\"#/home\"><i class=\"fa fa-home\"></i> UCCSS</a>\n                </span>\n            </div>\n\n            <!-- Collect the nav links, forms, and other content for toggling -->\n            <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\n\n                <form if.bind=\"!isAuthenticated && !passwordReset\" class=\"navbar-form navbar-left\" role=\"search\">\n                    <div class=\"form-group\">\n                        <input value.bind=\"email\" type=\"email\" autofocus class=\"form-control\" id=\"email\"\n                            placeholder=\"Email\"></input>\n                    </div>\n                    <div class=\"form-group\">\n                        <input value.bind=\"password\" type=\"password\" class=\"form-control\" id=\"password\"\n                            placeholder=\"Password\"></input>\n                    </div>\n                    <button class=\"btn btn-default\" click.delegate='login()'>Login</button>\n                    <button class=\"btn btn-link\" click.delegate=\"requestPasswordReset()\">Forgot password</button>\n                    <label if.bind=\"loginError\" style=\"color:white;\">${loginError}</label>\n                </form>\n                <ul class=\"nav navbar-nav\">\n                    <li class=\"dropdown\">\n                        <a if.bind=\"userObj.userRole >= config.UCC_ROLE\" href=\"#\" class=\"dropdown-toggle\"\n                            data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\"\n                            aria-expanded=\"false\">Administration <span class=\"caret\"></span></a>\n                        <ul class=\"dropdown-menu\">\n                            <li><a href=\"#/system\">System Admin</a></li>\n                            <li><a href=\"#/customers\">Customers</a></li>\n                            <li><a href=\"#/site\">Site</a></li>\n                            <li><a href=\"#/documents\">Documents</a></li>\n                            <li><a href=\"#/inventory\">Inventory</a></li>\n                        </ul>\n                    </li>\n                    <li class=\"dropdown\">\n                        <a if.bind=\"userObj.userRole >= config.UCC_TECH_ROLE\" href=\"#\" class=\"dropdown-toggle\"\n                            data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">Technical\n                            <span class=\"caret\"></span></a>\n                        <ul class=\"dropdown-menu\">\n                            <li><a href=\"#/techRq\">Product Requests</a></li>\n                            <!-- route-href=\"route: contactdetail; params.bind: {id:contact.id}\" -->\n                            <!-- <li><a href=\"#/techHt\">Help Tickets</a></li> -->\n                            <li><a route-href=\"route: techHt; params.bind: {HTNumber: -1}\">Help Tickets</a></li>\n                            <li><a href=\"#/techNotes\">Tech Notes</a></li>\n                        </ul>\n                    </li>\n                    <!-- <li class=\"hidden-sm hidden-md\" if.bind=\"isAuthenticated\"><a href=\"#/chapters\">Chapters</a></li> -->\n                    <li class=\"hidden-sm\" if.bind=\"userObj.userRole >= config.USER_ROLE\"><a href=\"#/facco\">Faculty\n                            Coordinator</a></li>\n                    <li if.bind=\"isAuthenticated\"><a href=\"#/support\">Support</a></li>\n                    <li if.bind=\"isAuthenticated\"><a href=\"#/clientRequests\">Product Requests</a></li>\n                    <li class=\"hidden-sm hidden-md\" if.bind=\"isAuthenticated && userObj.userRole >= config.UA_ROLE\"><a\n                            href=\"#/analytics\">Analytics</a></li>\n                    <li class=\"dropdown\">\n                        <a  if.bind=\"userObj.userRole >= config.ACC_ROLE\" href=\"#\" class=\"dropdown-toggle ${apjUnassignedRequests.length ? 'accAlert' : ''}\"\n                            data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">ACC <span\n                                class=\"caret\"></span></a>\n                        <ul class=\"dropdown-menu\">\n                            <li><a href=\"#/accinstitutions\">Customers</a></li> \n                            <li><a href=\"#/accprodrequests\">Product Requests</a></li>\n                            <!-- <li><a href=\"#/acchelptickets\">Help Tickets</a></li>\n                            <li><a href=\"#/accinvoices\">Invoices</a></li> -->\n                        </ul>\n                    </li>\n                </ul>\n\n                <ul class=\"nav navbar-nav navbar-right\">\n                    <li id=\"noticeLabel\" class=\"sortable\" click.trigger=\"showProfile($event)\"\n                        if.bind=\"noticeArray.length\"><a class=\"rightMargin\"\n                            style=\"text-decoration: none;\">Notifications\n                            <span class=\"badge\">${noticeArray.length}</span></a></li>\n                    <!-- <li class=\"dropdown\">\n                        <a if.bind=\"userObj.userRole >= config.UCC_ROLE\" href=\"#\" class=\"dropdown-toggle\"\n                            data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">Notes<span\n                                class=\"caret\"></span></a>\n                        <ul class=\"dropdown-menu\">\n                            <li><a click.trigger=\"enterNote()\" href=\"#\">Enter Note</a></li>\n                            <li><a href=\"#/notes\">Notes</a></li>\n                        </ul>\n                    </li> -->\n\n                    <li if.bind=\"!isAuthenticated\"><a href=\"#/register\">Register</a></li>\n                    <li class=\"hidden-sm hidden-md\" if.bind=\"isAuthenticated\"><a href=\"#/profile\">Profile</a></li>\n                    <li class=\"hidden-sm hidden-md\"><a href=\"#/about\">About the UCC</a></li>\n\n                    <li class=\"dropdown hidden-md\">\n                        <a href=\"#\" class=\"dropdown-toggle hidden-lg\" data-toggle=\"dropdown\">More <b\n                                class=\"caret\"></b></a>\n                        <ul class=\"dropdown-menu\">\n                            <li class=\"hidden-lg\" if.bind=\"isAuthenticated\"><a href=\"#/social\">Social</a></li>\n                            <li class=\"hidden-lg\" if.bind=\"userObj.userRole >= config.USER_ROLE\"><a\n                                    href=\"#/facco\">Faculty\n                                    Coordinator</a></li>\n                            <li class=\"hidden-lg\" if.bind=\"isAuthenticated && userObj.userRole >= config.UA_ROLE\"><a\n                                    href=\"#/analytics\">Analytics</a></li>\n                            <li class=\"hidden-lg\" if.bind=\"isAuthenticated\"><a href=\"#/profile\">Profile</a></li>\n                            <li class=\"hidden-lg\"><a href=\"#/about\">About the UCC</a></li>\n                        </ul>\n                    </li>\n                    <li if.bind=\"isAuthenticated\" click.trigger=\"logout()\"><a href=\"#\">Logout</a></li>\n                </ul>\n\n            </div>\n        </div>\n    </nav>\n</template>\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "resources/elements/rate-it.html":
/*!*********************************************!*\
  !*** ./src/resources/elements/rate-it.html ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <fieldset class=\"rating\">\r\n\t\t<span repeat.for=\"rate of rates\" >\r\n\t\t\t<input  type=\"radio\" name=\"${rate.name}\" id=\"${rate.id}\" title=\"${rate.title}\" />\r\n\t\t\t<label click.delegate=\"rateIt(rate.value, $index)\" class=\"${rate.class}\" for=\"${rate.title}\" title=\"${rate.title}\"></label>\r\n\t\t</span>\r\n    </fieldset>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "resources/elements/submenu.html":
/*!*********************************************!*\
  !*** ./src/resources/elements/submenu.html ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t<style>\r\n\t\t.navbar-inverse .navbar-brand {\r\n\t\t\tcolor: ${config.SUBMENU_COLOR};\r\n\t\t}\r\n\t\t.navbar-inverse .navbar-nav>li>a {\r\n\t\t\tcolor: ${config.SUBMENU_COLOR};\r\n\t\t}\r\n\t\t.navbar-inverse {\r\n\t\t\tcolor: ${config.SUBMENU_COLOR};\r\n\t\t\tbackground-color:${config.SUBMENU_BACKGROUND}\r\n\t\t}\r\n\t\t.navbar-inverse .navbar-nav>.active>a, .navbar-inverse .navbar-nav>.active>a:hover, .navbar-inverse .navbar-nav>.active>a:focus {\r\n\t\t\tcolor: ${config.ACTIVE_SUBMENU_COLOR};\r\n\t\t\tbackground-color:${config.SUBMENU_BACKGROUND}\r\n\t\t}\r\n\t\t.navbar-inverse .navbar-nav > li > a:hover, .navbar-inverse .navbar-nav > li > a:focus {\r\n\t\t\tbackground-color: ${config.HOVER_SUBMENU_BACKGROUND};;\r\n\t\t\tcolor: ${config.ACTIVE_SUBMENU_COLOR};\r\n\t\t}\r\n\t</style>\r\n    <div class=\"subMenu-container\" style=\"z-index:1000;\"> \r\n        <nav class=\"navbar navbar-inverse subMenu\">\r\n            <div class=\"navbar-header\">\r\n\t\t\t\t<button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-2\"\r\n                aria-expanded=\"false\">\r\n                    <span class=\"sr-only\">Toggle navigation</span>\r\n                    <span class=\"icon-bar\"></span>\r\n                    <span class=\"icon-bar\"></span>\r\n                    <span class=\"icon-bar\"></span>\r\n                </button>\r\n                <a class=\"navbar-brand\">${title}</a>\r\n            </div>\r\n            <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-2\">\r\n                <ul class=\"nav navbar-nav\">\r\n                    <li class=\"${row.isActive ? 'active' : ''}\" repeat.for=\"row of router.navigation\"><a href.bind=\"row.href\">${row.title}</a></li>\r\n                </ul>\r\n            </div>\r\n        </nav>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "resources/elements/table-navigation-bar.html":
/*!**********************************************************!*\
  !*** ./src/resources/elements/table-navigation-bar.html ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div class='row'>\r\n        <div class=\"col-lg-2\">\r\n            <label style=\"padding-left:15px;\" class=\"pull-left\">Records ${dataTable.firstVisible} - ${dataTable.lastVisible}/${dataTable.displayLength}</label>\r\n        </div>\r\n        <div class=\"col-lg-8 text-center\">\r\n            <div  class=\"center-block\">\r\n                <span show.bind=\"dataTable.pageButtons.length > 1\">\r\n                    <ul class=\"pagination\" id=\"${navControl}\">\r\n                        <li click.trigger=\"dataTable.backward()\"><a href=\"#!\"><i class=\"fa fa-chevron-left\"></i></a></li>\r\n                            <li click.trigger=\"dataTable.pageButton($index, $event)\" class=\"hidden-xs hidden-sm waves-effect ${$first ? 'active' : ''}\" repeat.for=\"page of dataTable.pageButtons\"><a>${page}</a></li>\r\n                        <li click.trigger=\"dataTable.forward()\"><a href=\"#!\"><i class=\"fa fa-chevron-right\"></i></a></li>\r\n                    </ul>\r\n                </span>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-lg-2\">\r\n            <div class=\"input-field col-sm-12 hidden-xs hidden-sm\">\r\n                <label>Rows</label>\r\n                <select id=\"rowsShownSelect\" value.bind=\"dataTable.numRowsShown\" change.delegate=\"dataTable.updateTake()\" class=\"pull-right form-control\"\r\n                    style=\"width:100px;margin-left:5px;\">\r\n                    <option repeat.for=\"rows of dataTable.rowOptions\" value.bind=\"rows\">${rows}</option>\r\n                </select>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "resources/elements/tree-node.html":
/*!***********************************************!*\
  !*** ./src/resources/elements/tree-node.html ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t<style>\r\n\t\t.menuButtons {\r\n\t\t\tcolor: ${config.ACTIVE_SUBMENU_COLOR};\r\n\t\t\tbackground-color:${config.BUTTONS_BACKGROUND}\r\n\t\t}\r\n\t</style>\r\n\t<require from=\"./tree-node.css\"></require>\r\n\t<li if.bind=\"visible\" class=\"list-group-item treeview ${selectedNode == data?'menuButtons':''}\" click.delegate=\"clickMe(data)\">\r\n\t\t<span class=\"indent\" repeat.for=\"i of level\"></span>\r\n\t\t<span if.bind=\"data.children\" class=\"icon glyphicon ${childrenVisible?'glyphicon-triangle-bottom':'glyphicon-triangle-right'}\" click.delegate=\"toggleExpand(data)\"></span>\r\n\t\t<span if.bind=\"!data.children\" class=\"icon glyphicon\"></span>\r\n\t\t${data.name}<span if.bind=\"!childrenVisible && itemCount != 0\" class=\"badge\" click.delegate=\"toggleExpand()\">${itemCount}</span>\r\n\t\t <span if.bind=\"!data.children\" class=\"icon glyphicon glyphicon-trash pull-right\" click.delegate=\"callback(data)\"></span>\r\n\t</li>\r\n\t<tree-node if.bind=\"visible\"  callback.call=\"deleteFile2(node)\" selected-file.bind=\"selectedFile\" repeat.for=\"node of data.children\" data.bind=\"node\" level.bind=\"level + 1\" visible.bind=\"childrenVisible\" max-level.bind=\"maxLevel\" selected-node.bind=\"selectedNode\"></tree-node>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "resources/htTimeline/response.html":
/*!************************************************!*\
  !*** ./src/resources/htTimeline/response.html ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t <div class=\"topMargin\">\r\n\t\t<img if.bind=\"event.personId.file.fileName\" class=\"smart-timeline-icon bottomMarginLg\" src =\"${config.PERSON_IMAGE_DOWNLOAD_URL}/${event.personId.file.fileName}\" height=\"100\">\r\n\t</div>\r\n\r\n    <div if.bind=\"!event.personId.file.fileName\" class=\"smart-timeline-icon bottomMarginLg\" innerhtml.bind=\"event.personId.email | gravatarUrl:100:1\"></div>\r\n\t<div class=\"smart-timeline-time\">\r\n\t\t<small>${event.createdDate | dateFormat:'YYYY-MM-DD':true}</small>\r\n\t\t<p><span if.bind=\"event.emailSent\"  ><i class=\"fa fa-envelope\" aria-hidden=\"true\"></i></span></p>\r\n    \t<span if.bind=\"event.confidential\"  ><i class=\"fa fa-user-secret\" aria-hidden=\"true\"></i></i></span> \r\n\t</div>\r\n\t<div class=\"smart-timeline-content borderTop leftJustify\">\r\n\t\t<div class=\"form-group\">\r\n\t\t\t<p>${event.personId.fullName}</p>\r\n\t\t\t<div class=\"row\">\r\n\t\t\t\t<div class=\"topMargin bottomMargin\"  innerhtml.bind=\"event.content.comments ? event.content.comments : ' ' \"></div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class=\"form-group\">\r\n\t\t\t<div class=\"hover_img\" repeat.for=\"file of event.files\">\r\n\t\t\t\t<a href=\"${config.HELPTICKET_FILE_DOWNLOAD_URL}/${helpTickets.selectedHelpTicket.helpTicketNo}/${file.fileName}\" target=\"_blank\"\r\n\t\t\t\t\tinnerhtml.bind=\"file.fileName | fileType:helpTickets.selectedHelpTicket.helpTicketNo:'helpTickets':file.originalFilename\"></a>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class=\"form-group\">\r\n\t\t\t<div class=\"hover_img\" repeat.for=\"document of event.documents\">\r\n\t\t\t\t<a href=\"${config.DOCUMENT_FILE_DOWNLOAD_URL}/${document.categoryCode}/${document.categoryName}/${document.fileName}\" target=\"_blank\">${document.fileName}</a>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "resources/htTimeline/timeline.html":
/*!************************************************!*\
  !*** ./src/resources/htTimeline/timeline.html ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n  <div class=\"well well-sm topMargin\">\r\n      <div class=\"smart-timeline\">\r\n        <ul class=\"smart-timeline-list\">\r\n          <li>\r\n            <div class=\"topMargin\">\r\n                <img if.bind=\"helpTickets.selectedHelpTicket.personId.file.fileName\" class=\"smart-timeline-icon bottomMarginLg\" src =\"${config.PERSON_IMAGE_DOWNLOAD_URL}/${helpTickets.selectedHelpTicket.personId.file.fileName}\" height=\"100\">\r\n            </div>\r\n\r\n            <div if.bind=\"!helpTickets.selectedHelpTicket.personId.file.fileName\" class=\"smart-timeline-icon bottomMarginLg\" innerhtml.bind=\"helpTickets.selectedHelpTicket.personId.email | gravatarUrl:100:1\"></div>\r\n              <div class=\"smart-timeline-time\">\r\n                <small>${helpTickets.selectedHelpTicket.createdDate | dateFormat:'YYYY-MM-DD':true}</small>\r\n              </div>\r\n              <div class=\"smart-timeline-content borderTop leftJustify\">\r\n                <div class=\"form-group\">\r\n                  <p>${helpTickets.selectedHelpTicket.personId.fullName}</p>\r\n                  <div class=\"row\">\r\n                    <div class=\"col-lg-4\">\r\n                      <span class=\"col-sm-11 col-sm-offset-1\" id=\"container\"></span>\r\n                      <h4 show.bind=\"showCourse\" class=\"col-sm-11 col-sm-offset-1 topMargin\">Course: ${course}</h4>\r\n                      <div show.bind=\"showRequestDetails\">\r\n                        <h4  class=\"col-sm-11 col-sm-offset-1 topMargin\">Request: ${helpTickets.selectedHelpTicket.requestId.requestNo}</h4>\r\n                        <h4  class=\"col-sm-11 col-sm-offset-1\">Product: ${helpTickets.selectedHelpTicket.productId | lookupValue:products.productsArray:\"_id\":\"name\"}</h4>\r\n                                                  \r\n                        <table class=\"col-sm-11 col-sm-offset-1\">\r\n                          <tr>\r\n                            <th class=\"col-lg-1\">System</th>\r\n                            <th class=\"col-lg-1\">Client</th>\r\n                          </tr>\r\n                          <tr repeat.for=\"assign of helpTickets.selectedHelpTicket.requestId.assignments\">\r\n                            <td class=\"${assign.client == helpTickets.selectedHelpTicket.client ? 'col-lg-1 redText' : 'col-lg-1'}\"><h4>${assign.systemId | lookupValue:systems.systemsArray:\"_id\":\"sid\"}</h4></td>\r\n                            <td class=\"${assign.client == helpTickets.selectedHelpTicket.client ? 'col-lg-1 redText' : 'col-lg-1'}\"><h4>${assign.client}</h4></td>\r\n                            <td innerhtml=\"${assign.client | arrow:helpTickets.selectedHelpTicket.client:helpTickets.selectedHelpTicket.systemId:assign.systemId}\"></td>\r\n                          </tr>\r\n                      \r\n                        </table>\r\n                      </div>\r\n                      <h4 show.bind=\"!showRequestDetails && clientRequired\" class=\"col-sm-11 col-sm-offset-1 topMargin\">Client not assigned</h4>\r\n                   \r\n                      <div class=\"form-group topMargin\">\r\n                          <div class=\"hover_img\" repeat.for=\"file of helpTickets.selectedHelpTicket.content[0].files\">\r\n                            <a href=\"${config.HELPTICKET_FILE_DOWNLOAD_URL}/${helpTickets.selectedHelpTicket.helpTicketNo}/${file.fileName}\"\r\n                              target=\"_blank\"\r\n                              innerhtml.bind=\"file.fileName | fileType:helpTickets.selectedHelpTicket.helpTicketNo:'helpTickets':file.originalFilename\"></a>\r\n                          </div>\r\n                      </div>\r\n                     </div>\r\n                    <div class=\"col-lg-7\">\r\n                      <div class=\"topMargin bottomMargin\"  innerhtml.bind=\"helpTickets.selectedHelpTicket.content[0].content.comments ? helpTickets.selectedHelpTicket.content[0].content.comments : ' ' \"></div>\r\n                      <div show.bind=\"helpTickets.selectedHelpTicket.content[0].content.steps\">\r\n                        <hr/>\r\n                        <h4 >Steps to reproduce the problem</h4>\r\n                        <div class=\"topMargin bottomMargin\"  innerhtml.bind=\"helpTickets.selectedHelpTicket.content[0].content.steps ? helpTickets.selectedHelpTicket.content[0].content.steps : ' ' \"></div>\r\n                      </div>\r\n                    </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </li>\r\n          <li repeat.for=\"event of helpTickets.selectedHelpTicket.content | sortDateTime:'createdDate':'DESC':isUCC:true\">\r\n            <compose view=\"./response.html\"></compose>\r\n          </li>\r\n        </ul>\r\n      </div>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ 5311:
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/***/ (function(module) {

module.exports = jQuery;

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["vendors-7e9c6a9f","vendors-319a6989","vendors-15ab478a","vendors-46c71041","vendors-4d44ba9e","vendors-4e64aa37","vendors-3ce50090","vendors-fcadf5bb","vendors-da7e83e9","vendors-49d0a293","vendors-2b4841d6","vendors-2c8f807c","vendors-38f9e564","vendors-86f4a106","vendors-148cdb19","vendors-bb3d84b5","vendors-7f302a9e","vendors-2bff9eb7","vendors-ba5cce0a","vendors-16aa39bf","vendors-b63e7516","vendors-5ee9077d","vendors-b7633cdf","vendors-0ac0411d","vendors-3e3507c7","vendors-40bb74a1","vendors-c99f8745","app-9a8b795a","app-2ef08ec8","app-8c3d3f46","app-8e048d9f","app-141ba57b","app-a9114bfc","app-5e8369f8","app-34726010","app-92e19ffb","app-bdef046b","app-fc1603ca","app-a9233e0e","app-c9f59502","app-d00c00ed","app-0cb29c41","app-efc01b10"], function() { return __webpack_exec__(4639), __webpack_exec__(3231), __webpack_exec__(7062); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=app-2500ebb2.2384d3fce1a12a237460.bundle.js.map