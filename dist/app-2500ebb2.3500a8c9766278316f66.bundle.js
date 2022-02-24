"use strict";
(self["webpackChunkclient"] = self["webpackChunkclient"] || []).push([["app-2500ebb2"],{

/***/ 6545:
/*!*************************************************!*\
  !*** ./src/resources/dialogs/common-dialogs.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CommonDialogs": function() { return /* binding */ CommonDialogs; }
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











var CommonDialogs = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(aurelia_dialog__WEBPACK_IMPORTED_MODULE_1__.DialogService), _dec(_class = /*#__PURE__*/function () {
  function CommonDialogs(dialogService) {
    this.noteBody = "";
    this.dialogService = dialogService;
  }

  var _proto = CommonDialogs.prototype;

  _proto.showMessage = function showMessage(message, title, options) {
    if (title === void 0) {
      title = 'Message';
    }

    if (options === void 0) {
      options = ['Ok'];
    }

    return this.dialogService.open({
      viewModel: _message_dialog__WEBPACK_IMPORTED_MODULE_2__.MessageDialog,
      model: {
        message: message,
        title: title,
        options: options
      }
    });
  };

  _proto.showNote = function showNote(title, note, options) {
    if (title === void 0) {
      title = 'Enter Note';
    }

    return this.dialogService.open({
      viewModel: _note_dialog__WEBPACK_IMPORTED_MODULE_3__.NoteDialog,
      model: {
        title: title,
        note: note,
        options: options
      }
    });
  };

  _proto.showEmail = function showEmail(title, email, options) {
    if (title === void 0) {
      title = 'Enter Email';
    }

    return this.dialogService.open({
      viewModel: _email_dialog__WEBPACK_IMPORTED_MODULE_4__.EmailDialog,
      model: {
        title: title,
        email: email,
        options: options
      }
    });
  };

  _proto.showDocument = function showDocument(title, documents, options) {
    if (title === void 0) {
      title = "Select Document";
    }

    return this.dialogService.open({
      viewModel: _document_dialog__WEBPACK_IMPORTED_MODULE_5__.DocumentDialog,
      model: {
        title: title,
        documents: documents,
        options: options
      }
    });
  };

  _proto.showPassword = function showPassword(title, passwords, options) {
    if (title === void 0) {
      title = "Change Password";
    }

    return this.dialogService.open({
      viewModel: _password_dialog__WEBPACK_IMPORTED_MODULE_6__.PasswordDialog,
      model: {
        title: title,
        passwords: passwords,
        options: options
      }
    });
  };

  _proto.showEvent = function showEvent(title, event, options) {
    if (title === void 0) {
      title = 'Enter Event';
    }

    return this.dialogService.open({
      viewModel: _event_dialog__WEBPACK_IMPORTED_MODULE_7__.EventDialog,
      model: {
        title: title,
        event: event,
        options: options
      }
    });
  };

  _proto.input = function input(title, value, options) {
    if (title === void 0) {
      title = 'Enter Value';
    }

    return this.dialogService.open({
      viewModel: _input_dialog__WEBPACK_IMPORTED_MODULE_8__.InputDialog,
      model: {
        title: title,
        value: value,
        options: options
      }
    });
  };

  _proto.showCloseHelpTicket = function showCloseHelpTicket(title, helpTicket, options) {
    if (title === void 0) {
      title = "Close Help Ticket";
    }

    return this.dialogService.open({
      viewModel: _helpTicket_dialog__WEBPACK_IMPORTED_MODULE_9__.HelpTicketDialog,
      model: {
        title: title,
        helpTicket: helpTicket,
        options: options
      }
    });
  };

  return CommonDialogs;
}()) || _class);

/***/ }),

/***/ "resources/dialogs/document-dialog":
/*!**************************************************!*\
  !*** ./src/resources/dialogs/document-dialog.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DocumentDialog": function() { return /* binding */ DocumentDialog; }
/* harmony export */ });
/* harmony import */ var aurelia_dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-dialog */ "aurelia-dialog");
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _data_documents__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../data/documents */ 7188);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
var _dec, _class;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }





var DocumentDialog = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_1__.inject)(aurelia_dialog__WEBPACK_IMPORTED_MODULE_0__.DialogController, _data_documents__WEBPACK_IMPORTED_MODULE_2__.DocumentsServices, _config_appConfig__WEBPACK_IMPORTED_MODULE_3__.AppConfig), _dec(_class = /*#__PURE__*/function () {
  function DocumentDialog(dialogController, documents, config) {
    this.dialogController = dialogController;
    this.documents = documents;
    this.config = config;
  }

  var _proto = DocumentDialog.prototype;

  _proto.activate = function activate(model) {
    this.model = model;
    this.filteredDocumentArray = model.documents.documentCats;
  };

  _proto.selectOption = function selectOption(option) {
    if (isCancel(option)) {
      this.dialogController.cancel(option);
    } else {
      this.dialogController.ok(this.model);
    }
  };

  _proto.filterList = function filterList() {
    if (this.filter) {
      var thisFilter = this.filter;
      this.filteredDocumentArray = this.model.documents.documentCats.filter(function (item) {
        return item.description.substring(0, thisFilter.length).toUpperCase() === thisFilter.toUpperCase();
      });
    } else {
      this.filteredDocumentArray = this.model.documents.documentCats;
    }
  };

  _proto.typeChanged = /*#__PURE__*/function () {
    var _typeChanged = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(index) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(index >= 0)) {
                _context.next = 6;
                break;
              }

              this.categoryIndex = index;
              this.documents.selectCategory(index);
              _context.next = 5;
              return this.documents.getDocumentsArray(true, '?filter=categoryCode|eq|' + this.documents.selectedCat.code);

            case 5:
              this.showDocuments = true;

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function typeChanged(_x) {
      return _typeChanged.apply(this, arguments);
    }

    return typeChanged;
  }();

  _proto.chooseDocument = function chooseDocument(index, event) {
    this.documents.selectDocument(index); //Reset the selected row

    if (this.selectedRow) this.selectedRow.children().removeClass('info');
    this.selectedRow = $(event.target).closest('tr');
    this.selectedRow.children().addClass('info');
    this.showDocumentForm = true;
  };

  _proto.addDocument = function addDocument(index) {
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
  };

  _proto.removeDocument = function removeDocument(index) {
    this.selectedDocuments.splice(index, 1);
  };

  return DocumentDialog;
}()) || _class);

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
/* harmony export */   "EmailDialog": function() { return /* binding */ EmailDialog; }
/* harmony export */ });
/* harmony import */ var aurelia_dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-dialog */ "aurelia-dialog");
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
var _dec, _class;




var EmailDialog = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_1__.inject)(aurelia_dialog__WEBPACK_IMPORTED_MODULE_0__.DialogController, _config_appConfig__WEBPACK_IMPORTED_MODULE_2__.AppConfig), _dec(_class = /*#__PURE__*/function () {
  function EmailDialog(dialogController, config) {
    this.editorid = void 0;
    this.dialogController = dialogController;
    this.config = config;
  }

  var _proto = EmailDialog.prototype;

  _proto.activate = function activate(model) {
    this.model = model;
  };

  _proto.selectProduct = function selectProduct(product, index) {
    $("#" + this.editorid).summernote('editor.restoreRange');
    $("#" + this.editorid).summernote('editor.focus');
    $("#" + this.editorid).summernote('editor.insertText', product.productId.name);
    if (!this.model.email.productsSelected) this.model.email.productsSelected = new Array();
    product.index = index;
    this.model.email.productsSelected.push(product);
  };

  _proto.selectOption = function selectOption(option) {
    if (isCancel(option)) {
      this.dialogController.cancel(option);
    } else {
      this.dialogController.ok(this.model);
    }
  };

  return EmailDialog;
}()) || _class);

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
/* harmony export */   "EventDialog": function() { return /* binding */ EventDialog; }
/* harmony export */ });
/* harmony import */ var aurelia_dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-dialog */ "aurelia-dialog");
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
var _dec, _class;




var EventDialog = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_1__.inject)(aurelia_dialog__WEBPACK_IMPORTED_MODULE_0__.DialogController, _config_appConfig__WEBPACK_IMPORTED_MODULE_2__.AppConfig), _dec(_class = /*#__PURE__*/function () {
  function EventDialog(dialogController, config) {
    this.flatpickrConfig = {
      enableTime: true
    };
    this.dialogController = dialogController;
    this.config = config;
  }

  var _proto = EventDialog.prototype;

  _proto.activate = function activate(model) {
    this.model = model;
  };

  _proto.attached = function attached() {
    $(this.titleInput).focus();
  };

  _proto.selectOption = function selectOption(option) {
    if (isCancel(option)) {
      this.dialogController.cancel(option);
    } else {
      this.dialogController.ok(this.model);
    }
  };

  return EventDialog;
}()) || _class);

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
/* harmony export */   "HelpTicketDialog": function() { return /* binding */ HelpTicketDialog; }
/* harmony export */ });
/* harmony import */ var aurelia_dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-dialog */ "aurelia-dialog");
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
var _dec, _class;




var HelpTicketDialog = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_1__.inject)(aurelia_dialog__WEBPACK_IMPORTED_MODULE_0__.DialogController, _config_appConfig__WEBPACK_IMPORTED_MODULE_2__.AppConfig), _dec(_class = /*#__PURE__*/function () {
  function HelpTicketDialog(dialogController, config) {
    this.dialogController = dialogController;
    this.config = config;
    this.otherReason = "";
    this.method = "";
  }

  var _proto = HelpTicketDialog.prototype;

  _proto.activate = function activate(model) {
    this.model = model;
    this.model.selectedReason = "";
  };

  _proto.selectOption = function selectOption(option) {
    if (isCancel(option)) {
      this.dialogController.cancel(option);
    } else {
      this.dialogController.ok(this.model);
    }
  };

  _proto.reasonSelected = function reasonSelected() {
    if (this.model.selectedReason == this.config.HELP_TICKET_CLOSE_REASON_OTHER) {
      setTimeout(function () {
        $("#otherReason").focus();
      }, 200);
    } else {
      $("#method").focus();
    }
  };

  return HelpTicketDialog;
}()) || _class);

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
/* harmony export */   "InputDialog": function() { return /* binding */ InputDialog; }
/* harmony export */ });
/* harmony import */ var aurelia_dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-dialog */ "aurelia-dialog");
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
var _dec, _class;




var InputDialog = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_1__.inject)(aurelia_dialog__WEBPACK_IMPORTED_MODULE_0__.DialogController, _config_appConfig__WEBPACK_IMPORTED_MODULE_2__.AppConfig), _dec(_class = /*#__PURE__*/function () {
  function InputDialog(dialogController, config) {
    this.flatpickrConfig = {
      enableTime: true
    };
    this.dialogController = dialogController;
    this.config = config;
  }

  var _proto = InputDialog.prototype;

  _proto.activate = function activate(model) {
    this.model = model;
  };

  _proto.attached = function attached() {
    $(this.valueInput).focus();
  };

  _proto.selectOption = function selectOption(option) {
    if (isCancel(option)) {
      this.dialogController.cancel(option);
    } else {
      this.dialogController.ok(this.model);
    }
  };

  return InputDialog;
}()) || _class);

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
/* harmony export */   "MessageDialog": function() { return /* binding */ MessageDialog; }
/* harmony export */ });
/* harmony import */ var aurelia_dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-dialog */ "aurelia-dialog");
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
var _dec, _class;




var MessageDialog = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_1__.inject)(aurelia_dialog__WEBPACK_IMPORTED_MODULE_0__.DialogController, _config_appConfig__WEBPACK_IMPORTED_MODULE_2__.AppConfig), _dec(_class = /*#__PURE__*/function () {
  function MessageDialog(dialogController, config) {
    this.dialogController = dialogController;
    this.config = config;
  }

  var _proto = MessageDialog.prototype;

  _proto.activate = function activate(model) {
    this.model = model;
  };

  _proto.selectOption = function selectOption(option) {
    if (isCancel(option)) {
      this.dialogController.cancel(option);
    } else {
      this.dialogController.ok(option);
    }
  };

  return MessageDialog;
}()) || _class);

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
/* harmony export */   "NoteDialog": function() { return /* binding */ NoteDialog; }
/* harmony export */ });
/* harmony import */ var aurelia_dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-dialog */ "aurelia-dialog");
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
var _dec, _class;




var NoteDialog = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_1__.inject)(aurelia_dialog__WEBPACK_IMPORTED_MODULE_0__.DialogController, _config_appConfig__WEBPACK_IMPORTED_MODULE_2__.AppConfig), _dec(_class = /*#__PURE__*/function () {
  function NoteDialog(dialogController, config) {
    this.dialogController = dialogController;
    this.config = config;
  }

  var _proto = NoteDialog.prototype;

  _proto.activate = function activate(model) {
    this.model = model;
  };

  _proto.selectOption = function selectOption(option) {
    if (isCancel(option)) {
      this.dialogController.cancel(option);
    } else {
      this.dialogController.ok(this.model);
    }
  };

  return NoteDialog;
}()) || _class);

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
/* harmony export */   "PasswordDialog": function() { return /* binding */ PasswordDialog; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var aurelia_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-dialog */ "aurelia-dialog");
/* harmony import */ var _resources_utils_validation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../resources/utils/validation */ 2824);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
var _dec, _class;





var PasswordDialog = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(aurelia_dialog__WEBPACK_IMPORTED_MODULE_1__.DialogController, _resources_utils_validation__WEBPACK_IMPORTED_MODULE_2__["default"], _config_appConfig__WEBPACK_IMPORTED_MODULE_3__.AppConfig), _dec(_class = /*#__PURE__*/function () {
  function PasswordDialog(dialogController, validation, config) {
    this.dialogController = dialogController;
    this.config = config;
    this.validation = validation;
    this.validation.initialize(this);

    this._setupValidation();

    this.thresholdLength = 6;
    this.threshold = 3;
  }

  var _proto = PasswordDialog.prototype;

  _proto.activate = function activate(model) {
    this.model = model;
  };

  _proto.passwordComplexity = function passwordComplexity() {
    var newValue = this.password;
    this.longPassword = newValue.length >= this.thresholdLength;
    var strength = 0;
    strength += /[A-Z]+/.test(newValue) ? 1 : 0;
    strength += /[a-z]+/.test(newValue) ? 1 : 0;
    strength += /[0-9]+/.test(newValue) ? 1 : 0;
    strength += /[\W]+/.test(newValue) ? 1 : 0;
    this.complexPassword = strength >= this.threshold && this.longPassword;
    this.validation.validate(4);
  };

  _proto._setupValidation = function _setupValidation() {
    this.validation.addRule(1, "register_password", [{
      "rule": "required",
      "message": "Password is required",
      "value": "password"
    }]);
    this.validation.addRule(1, "register_password_repeat", [{
      "rule": "custom",
      "message": "Passwords must match",
      "valFunction": function valFunction(context) {
        return context.password === context.password_repeat;
      }
    }], true);
    this.validation.addRule(4, "register_password", [{
      "rule": "custom",
      "message": "Insufficient Complexity",
      "valFunction": function valFunction(context) {
        return context.complexPassword;
      }
    }]);
  };

  _proto.selectOption = function selectOption(option) {
    if (isCancel(option)) {
      this.dialogController.cancel(option);
    } else {
      if (this.validation.validate(1)) {
        this.model.password = this.password;
        this.model.password_repeat = this.password_repeat;
        this.dialogController.ok(this.model);
      }
    }
  };

  return PasswordDialog;
}()) || _class);

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
/* harmony export */   "Editor": function() { return /* binding */ Editor; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var aurelia_binding__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-binding */ 6778);
var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }



var Editor = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(Element, aurelia_binding__WEBPACK_IMPORTED_MODULE_1__.ObserverLocator), _dec2 = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.bindable)({
  defaultBindingMode: aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.bindingMode.twoWay
}), _dec(_class = (_class2 = /*#__PURE__*/function () {
  function Editor(element, observerLocator) {
    var _this = this;

    _initializerDefineProperty(this, "value", _descriptor, this);

    _initializerDefineProperty(this, "height", _descriptor2, this);

    _initializerDefineProperty(this, "editorid", _descriptor3, this);

    _initializerDefineProperty(this, "toolbar", _descriptor4, this);

    _initializerDefineProperty(this, "placeholder", _descriptor5, this);

    this.editor = null;
    this.element = element;
    this.subscriptions = [observerLocator.getObserver(this, 'value').subscribe(function (newValue) {
      if (_this.editor && newValue !== _this.editor.summernote('code')) {
        _this.editor.summernote('code', newValue);
      }
    })];
  }

  var _proto = Editor.prototype;

  _proto.attached = function attached() {
    var that = this;
    this.editor = $("#" + this.editorid);
    this.editor.data('view-model', this);
    this.editor.summernote({
      placeholder: this.placeholder,
      height: this.height,
      toolbar: this.toolbar,
      callbacks: {
        onChange: function onChange(contents) {
          that.value = contents;
          $("#" + this.editorid).summernote('editor.saveRange');
        },
        onFocus: function onFocus(contents) {
          console.log('');
        } // onPaste: function(e) {
        // 	var node = document.createElement('p');
        // 	// @param {Node} node
        // 	$('#summernote').summernote('insertNode', node);
        // 	console.log('Called event paste');
        // }

      }
    });
    this.editor.summernote('code', this.value);
  };

  _proto.detached = function detached() {
    this.editor.summernote('destroy');
  };

  _proto.guid = function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  };

  return Editor;
}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "value", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "height", [aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 250;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "editorid", [aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return "summernote-" + this.guid();
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "toolbar", [aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [['style', ['style']], ['font', ['bold', 'italic', 'underline', 'clear']], ['color', ['color']], ['fontname', ['fontname']], ['fontsize', ['fontsize']], ['pata', ['ul', 'ol', 'paragraph']], ['insert', ['picture', 'link', 'table', 'hello']], ['misc', ['undo', 'redo', 'fullscreen']]];
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "placeholder", [aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);

/***/ }),

/***/ "resources/elements/add-systems":
/*!***********************************************!*\
  !*** ./src/resources/elements/add-systems.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AddSystems": function() { return /* binding */ AddSystems; }
/* harmony export */ });
/* harmony import */ var _data_dataServices__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data/dataServices */ 5086);
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }




var AddSystems = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_1__.inject)(_data_dataServices__WEBPACK_IMPORTED_MODULE_0__.DataServices), _dec(_class = (_class2 = /*#__PURE__*/function () {
  function AddSystems(data) {
    this.filter = "";
    this.enable = false;

    _initializerDefineProperty(this, "selectedproduct", _descriptor, this);

    _initializerDefineProperty(this, "systemsarray", _descriptor2, this);

    _initializerDefineProperty(this, "filteredsystemsarray", _descriptor3, this);

    _initializerDefineProperty(this, "systemstring", _descriptor4, this);

    _initializerDefineProperty(this, "systemchanges", _descriptor5, this);

    this.data = data; //  this.systemsArray = this.systemsarray;
  }

  var _proto = AddSystems.prototype;

  _proto.enableEdit = function enableEdit() {
    this.enable = true;
  };

  _proto.filterList = function filterList() {
    if (this.filter) {
      var thisFilter = this.filter;
      this.filteredsystemsarray = this.systemsarray.filter(function (item) {
        return item.sid.substring(0, thisFilter.length).toUpperCase() === thisFilter.toUpperCase();
      });
    } else {
      this.filteredsystemsarray = this.systemsarray;
    }
  };

  _proto.selectSystem = function selectSystem(el, system) {
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
  };

  _proto._systemAlreadySelected = function _systemAlreadySelected(sid) {
    for (var i = 0; i < this.selectedproduct.systems.length; i++) {
      if (this.selectedproduct.systems[i].sid === sid) return true;
    }

    return false;
  };

  _proto.removeSystem = function removeSystem(el, system) {
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
  };

  return AddSystems;
}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "selectedproduct", [aurelia_framework__WEBPACK_IMPORTED_MODULE_1__.bindable], {
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
/* harmony export */   "FlatPickerCustomElement": function() { return /* binding */ FlatPickerCustomElement; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var flatpickr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flatpickr */ 7545);
var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }



var FlatPickerCustomElement = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(Element), _dec2 = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.bindable)({
  defaultBindingMode: aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.bindingMode.twoWay
}), _dec(_class = (_class2 = /*#__PURE__*/function () {
  function FlatPickerCustomElement(element) {
    this.backgroundColor = 'white';

    _initializerDefineProperty(this, "config", _descriptor, this);

    _initializerDefineProperty(this, "startdate", _descriptor2, this);

    _initializerDefineProperty(this, "enddate", _descriptor3, this);

    _initializerDefineProperty(this, "controlid", _descriptor4, this);

    _initializerDefineProperty(this, "placeholder", _descriptor5, this);

    _initializerDefineProperty(this, "disabled", _descriptor6, this);

    _initializerDefineProperty(this, "value", _descriptor7, this);

    this.element = element;
  }

  var _proto = FlatPickerCustomElement.prototype;

  _proto.bind = function bind() {
    var defaultConfig = {
      altInput: true,
      altFormat: "F j, Y",
      minDate: this.startdate,
      maxDate: this.enddate,
      wrap: true,
      onReady: function onReady(dateObj, dateStr, instance) {
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
  };

  _proto.attached = function attached() {
    this.flatpickr = new flatpickr__WEBPACK_IMPORTED_MODULE_1__["default"](this.element.querySelector('.aurelia-flatpickr'), this._config);
    this.valueChanged();
  };

  _proto.fireEvent = function fireEvent(element, type, data) {
    var changeEvent;

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
  };

  _proto.startdateChanged = function startdateChanged(newValue, oldValue) {
    if (this.flatpickr) {
      this.flatpickr.set("minDate", newValue);
    }
  };

  _proto.enddateChanged = function enddateChanged(newValue, oldValue) {
    if (this.flatpickr) {
      this.flatpickr.set("maxDate", newValue);
    }
  };

  _proto.onChange = function onChange(selectedDates, dateStr, instance) {
    var _this = this;

    if (!this._datesAreSynced(this.value, selectedDates)) {
      switch (selectedDates.length) {
        case 0:
          this.value = undefined;
          break;

        case 1:
          this.value = this._cloneDate(selectedDates[0]);
          break;

        default:
          this.value = selectedDates.map(function (d) {
            return _this._cloneDate(d);
          });
          break;
      }
    }

    this.fireEvent(this.element, 'changeBeginDate', {
      date: this.value
    });
  };

  _proto.clear = function clear() {
    if (!this.flatpickr) {
      return;
    } // this.flatpickr.clear();

  };

  _proto.valueChanged = function valueChanged() {
    var _this2 = this;

    if (!this.flatpickr) {
      return;
    }

    if (this._datesAreSynced(this.value, this.flatpickr.selectedDates)) {
      return;
    }

    var newDate;

    if (!this.value) {
      newDate = undefined;
    } else if (!Array.isArray(this.value)) {
      newDate = this._cloneDate(this.value);
    } else {
      newDate = this.value.map(function (d) {
        return _this2._cloneDate(d);
      });
    }

    this.flatpickr.setDate(newDate);
  };

  _proto._datesAreSynced = function _datesAreSynced(model, view) {
    model = model || [];
    var modelDates = Array.isArray(model) ? model : [model];

    var _loop = function _loop(d) {
      var modelDate = modelDates[d];

      if (view.findIndex(function (v) {
        return v.valueOf() === modelDate.valueOf();
      }) > -1) {
        return "continue";
      }

      return {
        v: false
      };
    };

    for (var d = 0; d < modelDates.length; d++) {
      var _ret = _loop(d);

      if (_ret === "continue") continue;
      if (typeof _ret === "object") return _ret.v;
    }

    var _loop2 = function _loop2(_d) {
      var viewDate = view[_d];

      if (modelDates.findIndex(function (m) {
        return m.valueOf() === viewDate.valueOf();
      }) > -1) {
        return "continue";
      }

      return {
        v: false
      };
    };

    for (var _d = 0; _d < view.length; _d++) {
      var _ret2 = _loop2(_d);

      if (_ret2 === "continue") continue;
      if (typeof _ret2 === "object") return _ret2.v;
    }

    return true;
  };

  _proto._cloneDate = function _cloneDate(d) {
    return new Date(d.getTime ? d.valueOf() : d);
  };

  return FlatPickerCustomElement;
}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "config", [aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
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
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "placeholder", [aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "disabled", [aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "value", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);

/***/ }),

/***/ "resources/elements/nav-bar":
/*!*******************************************!*\
  !*** ./src/resources/elements/nav-bar.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NavBar": function() { return /* binding */ NavBar; }
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

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }











 // import * as $ from 'jquery'
// import 'bootstrap';

var NavBar = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(aurelia_router__WEBPACK_IMPORTED_MODULE_1__.Router, aurelia_event_aggregator__WEBPACK_IMPORTED_MODULE_2__.EventAggregator, aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.BindingEngine, _data_auth__WEBPACK_IMPORTED_MODULE_3__.Auth, _resources_utils_utils__WEBPACK_IMPORTED_MODULE_4__.Utils, _resources_data_people__WEBPACK_IMPORTED_MODULE_5__.People, _config_appConfig__WEBPACK_IMPORTED_MODULE_6__.AppConfig, _dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_7__.CommonDialogs, _resources_data_apjClientRequests__WEBPACK_IMPORTED_MODULE_8__.APJClientRequests), _dec(_class = /*#__PURE__*/function () {
  function NavBar(router, eventAggregator, bindingEngine, auth, utils, people, config, dialog, apjRequests) {
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

  var _proto = NavBar.prototype;

  _proto.attached = /*#__PURE__*/function () {
    var _attached = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var _this = this;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              this.hideProfile();
              $(".dropdown-toggle").dropdown();
              if (this.userObj) this.getNotices(this.userObj._id);
              setInterval(function () {
                _this.getNotices(_this.userObj._id);
              }, 10 * 60 * 1000);
              _context.next = 6;
              return this.apjRequests.getClientRequestsDetailsArray('?filter=requestStatus|eq|1', true);

            case 6:
              this.apjUnassignedRequests = this.apjRequests.requestsDetailsArray;
              console.log(this.apjUnassignedRequests);

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

  _proto.login = /*#__PURE__*/function () {
    var _login = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var response;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this.auth.login(this.email, this.password);

            case 2:
              response = _context2.sent;

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

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function login() {
      return _login.apply(this, arguments);
    }

    return login;
  }();

  _proto.logout = function logout() {
    if (this.userObj) this.auth.logout(this.userObj.email);
    this.userObj = new Object();
    this.isAuthenticated = this.auth.isAuthenticated();
    this.router.navigate("home");
  };

  _proto.loginSuccess = /*#__PURE__*/function () {
    var _loginSuccess = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var _this2 = this;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              this.userObj = JSON.parse(sessionStorage.getItem('user'));

              if (!this.userObj) {
                _context3.next = 16;
                break;
              }

              if (!(this.userObj.institutionId.institutionStatus !== this.config.INSTITUTIONS_ACTIVE)) {
                _context3.next = 7;
                break;
              }

              this.utils.showNotification("You must belong to an active institution to access the web site");
              this.logout();
              _context3.next = 14;
              break;

            case 7:
              if (!(this.userObj.personStatus !== this.config.ACTIVE_PERSON)) {
                _context3.next = 11;
                break;
              }

              return _context3.abrupt("return", this.dialog.showMessage("You must have an active account to access the web site.  Contact your faculty coordinator to activate your account.", "Account Not Active", ['OK']).whenClosed(function (response) {
                _this2.logout();
              }));

            case 11:
              if (!this.userObj.userRole) this.logout();
              sessionStorage.setItem('role', this.userObj.userRole); // this.events();

              this.router.navigate("user");

            case 14:
              _context3.next = 18;
              break;

            case 16:
              this.utils.showNotification("There was a problem validating your account");
              this.router.navigate("home");

            case 18:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function loginSuccess() {
      return _loginSuccess.apply(this, arguments);
    }

    return loginSuccess;
  }();

  _proto.requestPasswordReset = /*#__PURE__*/function () {
    var _requestPasswordReset = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var response;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (!this.email) {
                _context4.next = 7;
                break;
              }

              _context4.next = 3;
              return this.people.requestPasswordReset({
                email: this.email
              });

            case 3:
              response = _context4.sent;

              if (response && !response.error) {
                this.utils.showNotification("An email has been sent to the provided email address with a link you can use to reset your password");
              } else if (response.status = 404) {
                this.utils.showNotification("There is no registered user with that email address");
              } else if (response.status = 401) {
                this.utils.showNotification("The account with the provided address has been deactivated.  Please contact your faculty coordinator.");
              }

              _context4.next = 8;
              break;

            case 7:
              this.utils.showNotification("Please enter an email address");

            case 8:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function requestPasswordReset() {
      return _requestPasswordReset.apply(this, arguments);
    }

    return requestPasswordReset;
  }();

  _proto.enterNote = function enterNote() {
    var _this3 = this;

    var note = {
      noteBody: "",
      noteCategories: this.userObj.noteCategories,
      selectedCategory: 0
    };
    return this.dialog.showNote("Enter Note", note, ['Submit', 'Cancel']).whenClosed(function (response) {
      if (!response.wasCancelled) {
        _this3.saveNote(response.output);
      } else {
        console.log("Cancelled");
      }
    });
  };

  _proto.saveNote = /*#__PURE__*/function () {
    var _saveNote = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(note) {
      var response;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              this.people.selectNote();
              this.people.selectedNote.personId = this.userObj._id;
              this.people.selectedNote.category = this.userObj.noteCategories[note.selectedCategory];
              this.people.selectedNote.note = note.note.noteBody;
              _context5.next = 6;
              return this.people.saveNote();

            case 6:
              response = _context5.sent;

              if (!response.error) {
                this.utils.showNotification('The note was saved');
              }

            case 8:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function saveNote(_x) {
      return _saveNote.apply(this, arguments);
    }

    return saveNote;
  }() // openAlert(alert){
  //     this.alert = alert;
  //     $(".hoverProfile").css("top", 100);
  //     $(".hoverProfile").css("left", 100);
  //     $(".hoverProfile").css("display", "block");
  //     sessionStorage.setItem('alert',true);
  // }
  // hideAlert(){
  //     $(".hoverProfile").css("display", "none");
  // }
  ;

  _proto.showProfile = function showProfile(el) {
    this.toggleProfile = this.toggleProfile ? false : true;

    if (this.toggleProfile) {
      $(".noticeProfile").css("top", el.clientY + 25);
      $(".noticeProfile").css("left", $("#noticeLabel")[0].offsetLeft);
      $(".noticeProfile").css("display", "block");
      $(".noticeProfile").css('position', 'fixed');
    } else {
      this.hideProfile();
    }
  };

  _proto.hideProfile = function hideProfile() {
    $(".noticeProfile").css("display", "none");
  };

  _proto.filterNotifications = function filterNotifications() {
    var _this4 = this;

    this.noticeArray = [];
    var updatedItems = 0;

    if (Array.isArray(this.people.notificationsArray)) {
      this.people.notificationsArray.forEach(function (notice) {
        if (notice.notice.indexOf('Closed') > -1) {
          _this4.noticeArray.push(notice);
        } else if (updatedItems < 5) {
          _this4.noticeArray.push(notice);

          updatedItems = updatedItems + 1;
        }
      });
    }
  };

  _proto.updateNotification = function updateNotification(notice, index) {
    var htNumber = notice.notice.split(' ');
    notice.checked = true;
    this.people.saveNotification(notice);
    this.people.notificationsArray.splice(index, 1);
    if (htNumber[4] != 'closed') this.router.navigateToRoute('techHt', {
      HTNumber: htNumber[2]
    });
    this.hideProfile();
    this.filterNotifications();
  };

  _proto.deleteNotice = function deleteNotice(notice, index) {
    notice.checked = true;
    this.people.saveNotification(notice);
    this.people.notificationsArray.splice(index, 1);
    this.filterNotifications();
  };

  _proto.getNotices = /*#__PURE__*/function () {
    var _getNotices = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(id) {
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return this.people.getNotifications(id);

            case 2:
              this.filterNotifications();

            case 3:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function getNotices(_x2) {
      return _getNotices.apply(this, arguments);
    }

    return getNotices;
  }();

  _proto.events = /*#__PURE__*/function () {
    var _events = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
      var _this5 = this;

      var today;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return this.eventLayer.getEventsArray('', true);

            case 2:
              today = new Date();
              this.eventLayer.eventArray.forEach(function (item) {
                if (item.personId === _this5.userObj._id || item.scope === 'u') {
                  if (moment__WEBPACK_IMPORTED_MODULE_9___default()(today).isBetween(item.start, item.end)) ;

                  _this5.events.push(item);
                }
              }); // let response = await this.people.getRemindersArray('?filter=personId|eq|' + this.userObj._id, true);
              // if(response && !response.error && this.people && Object.prototype.toString.call(this.people.remindersArray) === '[object Array]'){
              //     toastr.options.closeButton = true;
              //     toastr.options.closeMethod = 'fadeOut';
              //     toastr.options.closeDuration = 300;
              //     toastr.options.closeEasing = 'swing';
              //     this.timeReminders = new Array();
              //     var now = new Date();
              //     var weekDay = now.getDay()
              //     var monthDay = now.getDate();
              //     this.reccurentReminders = new Array();
              //     this.people.remindersArray.forEach((item, index) => {
              //         switch(item.reminderType){
              //              case "D":
              //                 if(!item.lastSeen || !moment(now).isSame(item.lastSeen,'day')) {
              //                     if(item.priority == 1){
              //                         toastr.error(item.note, "Reminder");
              //                     } else {
              //                         toastr.info(item.note, "Reminder");
              //                     }
              //                     item.lastSeen = now;
              //                     this.people.saveReminder(item, index);
              //                 }
              //                 break;
              //             case "W":
              //                 if(item.reminderDay == weekDay && (!item.lastSeen || !moment(now).isSame(item.lastSeen,'day'))) {
              //                     if(item.priority == 1){
              //                         toastr.error(item.note, "Reminder");
              //                     } else {
              //                         toastr.info(item.note, "Reminder");
              //                     }
              //                     item.lastSeen = now;
              //                     this.people.saveReminder(item, index);
              //                 }
              //                 break;
              //             case "M":
              //                 if(item.reminderDay == monthDay && (!item.lastSeen || !moment(now).isSame(item.lastSeen,'month'))) {
              //                     if(item.priority == 1){
              //                         toastr.error(item.note, "Reminder");
              //                     } else {
              //                         toastr.info(item.note, "Reminder");
              //                     }
              //                     item.lastSeen = now;
              //                     this.people.saveReminder(item, index);
              //                 }
              //                 break;
              //             case "A":
              //                 if(moment(now).isSame(item.dateStartRemind,'day') && (!item.lastSeen || !moment(now).isSame(item.lastSeen,'month'))) {
              //                     if(item.priority == 1){
              //                         toastr.error(item.note, "Reminder");
              //                     } else {
              //                         toastr.info(item.note, "Reminder");
              //                     }
              //                     item.lastSeen = now;
              //                     this.people.saveReminder(item, index);
              //                 }
              //                 break;
              //             case "T":
              //                 if(moment(now).isSame(item.dateStartRemind,'day') && (!item.lastSeen || !moment(now).isSame(item.lastSeen,'month'))) {
              //                     let diff = moment(now).diff(item.dateStartRemind, 'minutes');
              //                     if(diff >= -15){
              //                         if(item.priority == 1){
              //                             toastr.error(item.note, "Reminder");
              //                         } else {
              //                             toastr.info(item.note, "Reminder");
              //                         }
              //                         item.lastSeen = now;
              //                         this.people.saveReminder(item, index);
              //                     } else {
              //                         this.timeReminders.push({item: item, index: index});
              //                     }
              //                 }
              //         }
              //     })
              //     if(this.timeReminders.length > 0){
              //          setInterval(() => {
              //             console.log('Checked reminders');
              //             var now = new Date();
              //             this.timeReminders.forEach(item => {
              //                 let diff = moment().diff(item.item.dateStartRemind, 'minutes');
              //                 if(diff >= -15){
              //                     if(item.priority == 1){
              //                         toastr.error(item.item.note, "Reminder");
              //                     } else {
              //                         toastr.info(item.note, "Reminder");
              //                     }
              //                     item.lastSeen = now;
              //                     this.people.saveReminder(item.item, item.index);
              //                 }
              //             });
              //         }, 10000);
              //     }
              // }

            case 4:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function events() {
      return _events.apply(this, arguments);
    }

    return events;
  }();

  return NavBar;
}()) || _class);

/***/ }),

/***/ "resources/elements/submenu":
/*!*******************************************!*\
  !*** ./src/resources/elements/submenu.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SubMenu": function() { return /* binding */ SubMenu; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
var _class, _descriptor, _descriptor2, _descriptor3;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }


var SubMenu = (_class = /*#__PURE__*/function () {
  function SubMenu() {
    _initializerDefineProperty(this, "title", _descriptor, this);

    _initializerDefineProperty(this, "menuitems", _descriptor2, this);

    _initializerDefineProperty(this, "config", _descriptor3, this);
  }

  var _proto = SubMenu.prototype;

  _proto.bind = function bind() {
    console.log(this.title);
  };

  return SubMenu;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "title", [aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.bindable], {
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

/***/ "resources/index":
/*!********************************!*\
  !*** ./src/resources/index.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "configure": function() { return /* binding */ configure; }
/* harmony export */ });
function configure(config) {
  config.globalResources(['./editor/editor', // PLATFORM.moduleName('./elements/calendar'),
  // PLATFORM.moduleName('./elements/multiselect'),
  // PLATFORM.moduleName('./elements/tree-node'),
  './elements/submenu', './elements/nav-bar', // PLATFORM.moduleName('./elements/rate-it'),
  // PLATFORM.moduleName('./elements/loading-indicator'),
  // PLATFORM.moduleName('./elements/table-navigation-bar'),
  './elements/flat-picker', './elements/add-systems', './value-converters/info-filter', './value-converters/lookup-ht-status', // PLATFORM.moduleName('./value-converters/arrow'),
  // PLATFORM.moduleName('./value-converters/request-status-class'),
  './value-converters/course-name', './value-converters/parse-assignments', // PLATFORM.moduleName('./value-converters/parse-apjassignments'),
  // PLATFORM.moduleName('./value-converters/format-number'),
  './value-converters/session-name', './value-converters/session-type', './value-converters/date-format', './value-converters/gravatar-url', // PLATFORM.moduleName('./value-converters/gravatar-url-id'),
  // PLATFORM.moduleName('./value-converters/ucc-title'),
  './value-converters/phone-number', './value-converters/lookup-value', // PLATFORM.moduleName('./value-converters/sandbox'),
  './value-converters/idsRequested', './value-converters/person-status-button', './value-converters/session-status-button', './value-converters/translate-status', './value-converters/to-uppercase', './value-converters/sort-array', './value-converters/system-list', './value-converters/check-box', './value-converters/activate-button', './value-converters/help-ticket-type', './value-converters/help-ticket-subtypes', './value-converters/session', './value-converters/sort-date-time', // PLATFORM.moduleName('./value-converters/file-type'),
  // PLATFORM.moduleName('./value-converters/format-digits'),
  './value-converters/format-phone', './value-converters/onoff-switch', './value-converters/get-array-value', './value-converters/help-ticket-statuses', // PLATFORM.moduleName('./value-converters/stat-value'),
  './value-converters/filter-clients', './value-converters/overlap', // PLATFORM.moduleName('./value-converters/filter-array'),
  './value-converters/filter-sessions' // PLATFORM.moduleName('./value-converters/session-systems'),
  // PLATFORM.moduleName('./value-converters/ucc-staff'),
  // PLATFORM.moduleName('./value-converters/filter-apjrequestdetails'),
  // PLATFORM.moduleName('./value-converters/filter-notice')
  ]);
}

/***/ }),

/***/ "resources/elements/flatpickr.css":
/*!**********************************************!*\
  !*** ./src/resources/elements/flatpickr.css ***!
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
___CSS_LOADER_EXPORT___.push([module.id, ".flatpickr-calendar {\n  background: transparent;\n  opacity: 0;\n  display: none;\n  text-align: center;\n  visibility: hidden;\n  padding: 0;\n  -webkit-animation: none;\n          animation: none;\n  direction: ltr;\n  border: 0;\n  font-size: 14px;\n  line-height: 24px;\n  border-radius: 5px;\n  position: absolute;\n  width: 307.875px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  -ms-touch-action: manipulation;\n      touch-action: manipulation;\n  background: #fff;\n  -webkit-box-shadow: 1px 0 0 #e6e6e6, -1px 0 0 #e6e6e6, 0 1px 0 #e6e6e6, 0 -1px 0 #e6e6e6, 0 3px 13px rgba(0,0,0,0.08);\n          box-shadow: 1px 0 0 #e6e6e6, -1px 0 0 #e6e6e6, 0 1px 0 #e6e6e6, 0 -1px 0 #e6e6e6, 0 3px 13px rgba(0,0,0,0.08);\n}\n.flatpickr-calendar.open,\n.flatpickr-calendar.inline {\n  opacity: 1;\n  max-height: 640px;\n  visibility: visible;\n}\n.flatpickr-calendar.open {\n  display: inline-block;\n  z-index: 99999;\n}\n.flatpickr-calendar.animate.open {\n  -webkit-animation: fpFadeInDown 300ms cubic-bezier(0.23, 1, 0.32, 1);\n          animation: fpFadeInDown 300ms cubic-bezier(0.23, 1, 0.32, 1);\n}\n.flatpickr-calendar.inline {\n  display: block;\n  position: relative;\n  top: 2px;\n}\n.flatpickr-calendar.static {\n  position: absolute;\n  top: calc(100% + 2px);\n}\n.flatpickr-calendar.static.open {\n  z-index: 999;\n  display: block;\n}\n.flatpickr-calendar.multiMonth .flatpickr-days .dayContainer:nth-child(n+1) .flatpickr-day.inRange:nth-child(7n+7) {\n  -webkit-box-shadow: none !important;\n          box-shadow: none !important;\n}\n.flatpickr-calendar.multiMonth .flatpickr-days .dayContainer:nth-child(n+2) .flatpickr-day.inRange:nth-child(7n+1) {\n  -webkit-box-shadow: -2px 0 0 #e6e6e6, 5px 0 0 #e6e6e6;\n          box-shadow: -2px 0 0 #e6e6e6, 5px 0 0 #e6e6e6;\n}\n.flatpickr-calendar .hasWeeks .dayContainer,\n.flatpickr-calendar .hasTime .dayContainer {\n  border-bottom: 0;\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0;\n}\n.flatpickr-calendar .hasWeeks .dayContainer {\n  border-left: 0;\n}\n.flatpickr-calendar.showTimeInput.hasTime .flatpickr-time {\n  height: 40px;\n  border-top: 1px solid #e6e6e6;\n}\n.flatpickr-calendar.noCalendar.hasTime .flatpickr-time {\n  height: auto;\n}\n.flatpickr-calendar:before,\n.flatpickr-calendar:after {\n  position: absolute;\n  display: block;\n  pointer-events: none;\n  border: solid transparent;\n  content: '';\n  height: 0;\n  width: 0;\n  left: 22px;\n}\n.flatpickr-calendar.rightMost:before,\n.flatpickr-calendar.rightMost:after {\n  left: auto;\n  right: 22px;\n}\n.flatpickr-calendar:before {\n  border-width: 5px;\n  margin: 0 -5px;\n}\n.flatpickr-calendar:after {\n  border-width: 4px;\n  margin: 0 -4px;\n}\n.flatpickr-calendar.arrowTop:before,\n.flatpickr-calendar.arrowTop:after {\n  bottom: 100%;\n}\n.flatpickr-calendar.arrowTop:before {\n  border-bottom-color: #e6e6e6;\n}\n.flatpickr-calendar.arrowTop:after {\n  border-bottom-color: #fff;\n}\n.flatpickr-calendar.arrowBottom:before,\n.flatpickr-calendar.arrowBottom:after {\n  top: 100%;\n}\n.flatpickr-calendar.arrowBottom:before {\n  border-top-color: #e6e6e6;\n}\n.flatpickr-calendar.arrowBottom:after {\n  border-top-color: #fff;\n}\n.flatpickr-calendar:focus {\n  outline: 0;\n}\n.flatpickr-wrapper {\n  position: relative;\n  display: inline-block;\n}\n.flatpickr-months {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n}\n.flatpickr-months .flatpickr-month {\n  background: transparent;\n  color: rgba(0,0,0,0.9);\n  fill: rgba(0,0,0,0.9);\n  height: 34px;\n  line-height: 1;\n  text-align: center;\n  position: relative;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  overflow: hidden;\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n}\n.flatpickr-months .flatpickr-prev-month,\n.flatpickr-months .flatpickr-next-month {\n  text-decoration: none;\n  cursor: pointer;\n  position: absolute;\n  top: 0;\n  height: 34px;\n  padding: 10px;\n  z-index: 3;\n  color: rgba(0,0,0,0.9);\n  fill: rgba(0,0,0,0.9);\n}\n.flatpickr-months .flatpickr-prev-month.flatpickr-disabled,\n.flatpickr-months .flatpickr-next-month.flatpickr-disabled {\n  display: none;\n}\n.flatpickr-months .flatpickr-prev-month i,\n.flatpickr-months .flatpickr-next-month i {\n  position: relative;\n}\n.flatpickr-months .flatpickr-prev-month.flatpickr-prev-month,\n.flatpickr-months .flatpickr-next-month.flatpickr-prev-month {\n/*\n      /*rtl:begin:ignore*/\n/*\n      */\n  left: 0;\n/*\n      /*rtl:end:ignore*/\n/*\n      */\n}\n/*\n      /*rtl:begin:ignore*/\n/*\n      /*rtl:end:ignore*/\n.flatpickr-months .flatpickr-prev-month.flatpickr-next-month,\n.flatpickr-months .flatpickr-next-month.flatpickr-next-month {\n/*\n      /*rtl:begin:ignore*/\n/*\n      */\n  right: 0;\n/*\n      /*rtl:end:ignore*/\n/*\n      */\n}\n/*\n      /*rtl:begin:ignore*/\n/*\n      /*rtl:end:ignore*/\n.flatpickr-months .flatpickr-prev-month:hover,\n.flatpickr-months .flatpickr-next-month:hover {\n  color: #959ea9;\n}\n.flatpickr-months .flatpickr-prev-month:hover svg,\n.flatpickr-months .flatpickr-next-month:hover svg {\n  fill: #f64747;\n}\n.flatpickr-months .flatpickr-prev-month svg,\n.flatpickr-months .flatpickr-next-month svg {\n  width: 14px;\n  height: 14px;\n}\n.flatpickr-months .flatpickr-prev-month svg path,\n.flatpickr-months .flatpickr-next-month svg path {\n  -webkit-transition: fill 0.1s;\n  transition: fill 0.1s;\n  fill: inherit;\n}\n.numInputWrapper {\n  position: relative;\n  height: auto;\n}\n.numInputWrapper input,\n.numInputWrapper span {\n  display: inline-block;\n}\n.numInputWrapper input {\n  width: 100%;\n}\n.numInputWrapper input::-ms-clear {\n  display: none;\n}\n.numInputWrapper input::-webkit-outer-spin-button,\n.numInputWrapper input::-webkit-inner-spin-button {\n  margin: 0;\n  -webkit-appearance: none;\n}\n.numInputWrapper span {\n  position: absolute;\n  right: 0;\n  width: 14px;\n  padding: 0 4px 0 2px;\n  height: 50%;\n  line-height: 50%;\n  opacity: 0;\n  cursor: pointer;\n  border: 1px solid rgba(57,57,57,0.15);\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n.numInputWrapper span:hover {\n  background: rgba(0,0,0,0.1);\n}\n.numInputWrapper span:active {\n  background: rgba(0,0,0,0.2);\n}\n.numInputWrapper span:after {\n  display: block;\n  content: \"\";\n  position: absolute;\n}\n.numInputWrapper span.arrowUp {\n  top: 0;\n  border-bottom: 0;\n}\n.numInputWrapper span.arrowUp:after {\n  border-left: 4px solid transparent;\n  border-right: 4px solid transparent;\n  border-bottom: 4px solid rgba(57,57,57,0.6);\n  top: 26%;\n}\n.numInputWrapper span.arrowDown {\n  top: 50%;\n}\n.numInputWrapper span.arrowDown:after {\n  border-left: 4px solid transparent;\n  border-right: 4px solid transparent;\n  border-top: 4px solid rgba(57,57,57,0.6);\n  top: 40%;\n}\n.numInputWrapper span svg {\n  width: inherit;\n  height: auto;\n}\n.numInputWrapper span svg path {\n  fill: rgba(0,0,0,0.5);\n}\n.numInputWrapper:hover {\n  background: rgba(0,0,0,0.05);\n}\n.numInputWrapper:hover span {\n  opacity: 1;\n}\n.flatpickr-current-month {\n  font-size: 135%;\n  line-height: inherit;\n  font-weight: 300;\n  color: inherit;\n  position: absolute;\n  width: 75%;\n  left: 12.5%;\n  padding: 7.48px 0 0 0;\n  line-height: 1;\n  height: 34px;\n  display: inline-block;\n  text-align: center;\n  -webkit-transform: translate3d(0px, 0px, 0px);\n          transform: translate3d(0px, 0px, 0px);\n}\n.flatpickr-current-month span.cur-month {\n  font-family: inherit;\n  font-weight: 700;\n  color: inherit;\n  display: inline-block;\n  margin-left: 0.5ch;\n  padding: 0;\n}\n.flatpickr-current-month span.cur-month:hover {\n  background: rgba(0,0,0,0.05);\n}\n.flatpickr-current-month .numInputWrapper {\n  width: 6ch;\n  width: 7ch\\0;\n  display: inline-block;\n}\n.flatpickr-current-month .numInputWrapper span.arrowUp:after {\n  border-bottom-color: rgba(0,0,0,0.9);\n}\n.flatpickr-current-month .numInputWrapper span.arrowDown:after {\n  border-top-color: rgba(0,0,0,0.9);\n}\n.flatpickr-current-month input.cur-year {\n  background: transparent;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  color: inherit;\n  cursor: text;\n  padding: 0 0 0 0.5ch;\n  margin: 0;\n  display: inline-block;\n  font-size: inherit;\n  font-family: inherit;\n  font-weight: 300;\n  line-height: inherit;\n  height: auto;\n  border: 0;\n  border-radius: 0;\n  vertical-align: initial;\n  -webkit-appearance: textfield;\n  -moz-appearance: textfield;\n  appearance: textfield;\n}\n.flatpickr-current-month input.cur-year:focus {\n  outline: 0;\n}\n.flatpickr-current-month input.cur-year[disabled],\n.flatpickr-current-month input.cur-year[disabled]:hover {\n  font-size: 100%;\n  color: rgba(0,0,0,0.5);\n  background: transparent;\n  pointer-events: none;\n}\n.flatpickr-current-month .flatpickr-monthDropdown-months {\n  appearance: menulist;\n  background: transparent;\n  border: none;\n  border-radius: 0;\n  box-sizing: border-box;\n  color: inherit;\n  cursor: pointer;\n  font-size: inherit;\n  font-family: inherit;\n  font-weight: 300;\n  height: auto;\n  line-height: inherit;\n  margin: -1px 0 0 0;\n  outline: none;\n  padding: 0 0 0 0.5ch;\n  position: relative;\n  vertical-align: initial;\n  -webkit-box-sizing: border-box;\n  -webkit-appearance: menulist;\n  -moz-appearance: menulist;\n  width: auto;\n}\n.flatpickr-current-month .flatpickr-monthDropdown-months:focus,\n.flatpickr-current-month .flatpickr-monthDropdown-months:active {\n  outline: none;\n}\n.flatpickr-current-month .flatpickr-monthDropdown-months:hover {\n  background: rgba(0,0,0,0.05);\n}\n.flatpickr-current-month .flatpickr-monthDropdown-months .flatpickr-monthDropdown-month {\n  background-color: transparent;\n  outline: none;\n  padding: 0;\n}\n.flatpickr-weekdays {\n  background: transparent;\n  text-align: center;\n  overflow: hidden;\n  width: 100%;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  height: 28px;\n}\n.flatpickr-weekdays .flatpickr-weekdaycontainer {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n}\nspan.flatpickr-weekday {\n  cursor: default;\n  font-size: 90%;\n  background: transparent;\n  color: rgba(0,0,0,0.54);\n  line-height: 1;\n  margin: 0;\n  text-align: center;\n  display: block;\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  font-weight: bolder;\n}\n.dayContainer,\n.flatpickr-weeks {\n  padding: 1px 0 0 0;\n}\n.flatpickr-days {\n  position: relative;\n  overflow: hidden;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: start;\n  -webkit-align-items: flex-start;\n      -ms-flex-align: start;\n          align-items: flex-start;\n  width: 307.875px;\n}\n.flatpickr-days:focus {\n  outline: 0;\n}\n.dayContainer {\n  padding: 0;\n  outline: 0;\n  text-align: left;\n  width: 307.875px;\n  min-width: 307.875px;\n  max-width: 307.875px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  display: inline-block;\n  display: -ms-flexbox;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-flex-wrap: wrap;\n          flex-wrap: wrap;\n  -ms-flex-wrap: wrap;\n  -ms-flex-pack: justify;\n  -webkit-justify-content: space-around;\n          justify-content: space-around;\n  -webkit-transform: translate3d(0px, 0px, 0px);\n          transform: translate3d(0px, 0px, 0px);\n  opacity: 1;\n}\n.dayContainer + .dayContainer {\n  -webkit-box-shadow: -1px 0 0 #e6e6e6;\n          box-shadow: -1px 0 0 #e6e6e6;\n}\n.flatpickr-day {\n  background: none;\n  border: 1px solid transparent;\n  border-radius: 150px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  color: #393939;\n  cursor: pointer;\n  font-weight: 400;\n  width: 14.2857143%;\n  -webkit-flex-basis: 14.2857143%;\n      -ms-flex-preferred-size: 14.2857143%;\n          flex-basis: 14.2857143%;\n  max-width: 39px;\n  height: 39px;\n  line-height: 39px;\n  margin: 0;\n  display: inline-block;\n  position: relative;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  text-align: center;\n}\n.flatpickr-day.inRange,\n.flatpickr-day.prevMonthDay.inRange,\n.flatpickr-day.nextMonthDay.inRange,\n.flatpickr-day.today.inRange,\n.flatpickr-day.prevMonthDay.today.inRange,\n.flatpickr-day.nextMonthDay.today.inRange,\n.flatpickr-day:hover,\n.flatpickr-day.prevMonthDay:hover,\n.flatpickr-day.nextMonthDay:hover,\n.flatpickr-day:focus,\n.flatpickr-day.prevMonthDay:focus,\n.flatpickr-day.nextMonthDay:focus {\n  cursor: pointer;\n  outline: 0;\n  background: #e6e6e6;\n  border-color: #e6e6e6;\n}\n.flatpickr-day.today {\n  border-color: #959ea9;\n}\n.flatpickr-day.today:hover,\n.flatpickr-day.today:focus {\n  border-color: #959ea9;\n  background: #959ea9;\n  color: #fff;\n}\n.flatpickr-day.selected,\n.flatpickr-day.startRange,\n.flatpickr-day.endRange,\n.flatpickr-day.selected.inRange,\n.flatpickr-day.startRange.inRange,\n.flatpickr-day.endRange.inRange,\n.flatpickr-day.selected:focus,\n.flatpickr-day.startRange:focus,\n.flatpickr-day.endRange:focus,\n.flatpickr-day.selected:hover,\n.flatpickr-day.startRange:hover,\n.flatpickr-day.endRange:hover,\n.flatpickr-day.selected.prevMonthDay,\n.flatpickr-day.startRange.prevMonthDay,\n.flatpickr-day.endRange.prevMonthDay,\n.flatpickr-day.selected.nextMonthDay,\n.flatpickr-day.startRange.nextMonthDay,\n.flatpickr-day.endRange.nextMonthDay {\n  background: #569ff7;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n  color: #fff;\n  border-color: #569ff7;\n}\n.flatpickr-day.selected.startRange,\n.flatpickr-day.startRange.startRange,\n.flatpickr-day.endRange.startRange {\n  border-radius: 50px 0 0 50px;\n}\n.flatpickr-day.selected.endRange,\n.flatpickr-day.startRange.endRange,\n.flatpickr-day.endRange.endRange {\n  border-radius: 0 50px 50px 0;\n}\n.flatpickr-day.selected.startRange + .endRange:not(:nth-child(7n+1)),\n.flatpickr-day.startRange.startRange + .endRange:not(:nth-child(7n+1)),\n.flatpickr-day.endRange.startRange + .endRange:not(:nth-child(7n+1)) {\n  -webkit-box-shadow: -10px 0 0 #569ff7;\n          box-shadow: -10px 0 0 #569ff7;\n}\n.flatpickr-day.selected.startRange.endRange,\n.flatpickr-day.startRange.startRange.endRange,\n.flatpickr-day.endRange.startRange.endRange {\n  border-radius: 50px;\n}\n.flatpickr-day.inRange {\n  border-radius: 0;\n  -webkit-box-shadow: -5px 0 0 #e6e6e6, 5px 0 0 #e6e6e6;\n          box-shadow: -5px 0 0 #e6e6e6, 5px 0 0 #e6e6e6;\n}\n.flatpickr-day.flatpickr-disabled,\n.flatpickr-day.flatpickr-disabled:hover,\n.flatpickr-day.prevMonthDay,\n.flatpickr-day.nextMonthDay,\n.flatpickr-day.notAllowed,\n.flatpickr-day.notAllowed.prevMonthDay,\n.flatpickr-day.notAllowed.nextMonthDay {\n  color: rgba(57,57,57,0.3);\n  background: transparent;\n  border-color: transparent;\n  cursor: default;\n}\n.flatpickr-day.flatpickr-disabled,\n.flatpickr-day.flatpickr-disabled:hover {\n  cursor: not-allowed;\n  color: rgba(57,57,57,0.1);\n}\n.flatpickr-day.week.selected {\n  border-radius: 0;\n  -webkit-box-shadow: -5px 0 0 #569ff7, 5px 0 0 #569ff7;\n          box-shadow: -5px 0 0 #569ff7, 5px 0 0 #569ff7;\n}\n.flatpickr-day.hidden {\n  visibility: hidden;\n}\n.rangeMode .flatpickr-day {\n  margin-top: 1px;\n}\n.flatpickr-weekwrapper {\n  float: left;\n}\n.flatpickr-weekwrapper .flatpickr-weeks {\n  padding: 0 12px;\n  -webkit-box-shadow: 1px 0 0 #e6e6e6;\n          box-shadow: 1px 0 0 #e6e6e6;\n}\n.flatpickr-weekwrapper .flatpickr-weekday {\n  float: none;\n  width: 100%;\n  line-height: 28px;\n}\n.flatpickr-weekwrapper span.flatpickr-day,\n.flatpickr-weekwrapper span.flatpickr-day:hover {\n  display: block;\n  width: 100%;\n  max-width: none;\n  color: rgba(57,57,57,0.3);\n  background: transparent;\n  cursor: default;\n  border: none;\n}\n.flatpickr-innerContainer {\n  display: block;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  overflow: hidden;\n}\n.flatpickr-rContainer {\n  display: inline-block;\n  padding: 0;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n.flatpickr-time {\n  text-align: center;\n  outline: 0;\n  display: block;\n  height: 0;\n  line-height: 40px;\n  max-height: 40px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  overflow: hidden;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n}\n.flatpickr-time:after {\n  content: \"\";\n  display: table;\n  clear: both;\n}\n.flatpickr-time .numInputWrapper {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  width: 40%;\n  height: 40px;\n  float: left;\n}\n.flatpickr-time .numInputWrapper span.arrowUp:after {\n  border-bottom-color: #393939;\n}\n.flatpickr-time .numInputWrapper span.arrowDown:after {\n  border-top-color: #393939;\n}\n.flatpickr-time.hasSeconds .numInputWrapper {\n  width: 26%;\n}\n.flatpickr-time.time24hr .numInputWrapper {\n  width: 49%;\n}\n.flatpickr-time input {\n  background: transparent;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n  border: 0;\n  border-radius: 0;\n  text-align: center;\n  margin: 0;\n  padding: 0;\n  height: inherit;\n  line-height: inherit;\n  color: #393939;\n  font-size: 14px;\n  position: relative;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  -webkit-appearance: textfield;\n  -moz-appearance: textfield;\n  appearance: textfield;\n}\n.flatpickr-time input.flatpickr-hour {\n  font-weight: bold;\n}\n.flatpickr-time input.flatpickr-minute,\n.flatpickr-time input.flatpickr-second {\n  font-weight: 400;\n}\n.flatpickr-time input:focus {\n  outline: 0;\n  border: 0;\n}\n.flatpickr-time .flatpickr-time-separator,\n.flatpickr-time .flatpickr-am-pm {\n  height: inherit;\n  float: left;\n  line-height: inherit;\n  color: #393939;\n  font-weight: bold;\n  width: 2%;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  -webkit-align-self: center;\n      -ms-flex-item-align: center;\n          align-self: center;\n}\n.flatpickr-time .flatpickr-am-pm {\n  outline: 0;\n  width: 18%;\n  cursor: pointer;\n  text-align: center;\n  font-weight: 400;\n}\n.flatpickr-time input:hover,\n.flatpickr-time .flatpickr-am-pm:hover,\n.flatpickr-time input:focus,\n.flatpickr-time .flatpickr-am-pm:focus {\n  background: #eee;\n}\n.flatpickr-input[readonly] {\n  cursor: pointer;\n}\n@-webkit-keyframes fpFadeInDown {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -20px, 0);\n            transform: translate3d(0, -20px, 0);\n  }\n  to {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 0, 0);\n            transform: translate3d(0, 0, 0);\n  }\n}\n@keyframes fpFadeInDown {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -20px, 0);\n            transform: translate3d(0, -20px, 0);\n  }\n  to {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 0, 0);\n            transform: translate3d(0, 0, 0);\n  }\n}\n", "",{"version":3,"sources":["webpack://./src/resources/elements/flatpickr.css"],"names":[],"mappings":"AAAA;EACE,uBAAuB;EACvB,UAAU;EACV,aAAa;EACb,kBAAkB;EAClB,kBAAkB;EAClB,UAAU;EACV,uBAAuB;UACf,eAAe;EACvB,cAAc;EACd,SAAS;EACT,eAAe;EACf,iBAAiB;EACjB,kBAAkB;EAClB,kBAAkB;EAClB,gBAAgB;EAChB,8BAA8B;UACtB,sBAAsB;EAC9B,8BAA8B;MAC1B,0BAA0B;EAC9B,gBAAgB;EAChB,qHAAqH;UAC7G,6GAA6G;AACvH;AACA;;EAEE,UAAU;EACV,iBAAiB;EACjB,mBAAmB;AACrB;AACA;EACE,qBAAqB;EACrB,cAAc;AAChB;AACA;EACE,oEAAoE;UAC5D,4DAA4D;AACtE;AACA;EACE,cAAc;EACd,kBAAkB;EAClB,QAAQ;AACV;AACA;EACE,kBAAkB;EAClB,qBAAqB;AACvB;AACA;EACE,YAAY;EACZ,cAAc;AAChB;AACA;EACE,mCAAmC;UAC3B,2BAA2B;AACrC;AACA;EACE,qDAAqD;UAC7C,6CAA6C;AACvD;AACA;;EAEE,gBAAgB;EAChB,6BAA6B;EAC7B,4BAA4B;AAC9B;AACA;EACE,cAAc;AAChB;AACA;EACE,YAAY;EACZ,6BAA6B;AAC/B;AACA;EACE,YAAY;AACd;AACA;;EAEE,kBAAkB;EAClB,cAAc;EACd,oBAAoB;EACpB,yBAAyB;EACzB,WAAW;EACX,SAAS;EACT,QAAQ;EACR,UAAU;AACZ;AACA;;EAEE,UAAU;EACV,WAAW;AACb;AACA;EACE,iBAAiB;EACjB,cAAc;AAChB;AACA;EACE,iBAAiB;EACjB,cAAc;AAChB;AACA;;EAEE,YAAY;AACd;AACA;EACE,4BAA4B;AAC9B;AACA;EACE,yBAAyB;AAC3B;AACA;;EAEE,SAAS;AACX;AACA;EACE,yBAAyB;AAC3B;AACA;EACE,sBAAsB;AACxB;AACA;EACE,UAAU;AACZ;AACA;EACE,kBAAkB;EAClB,qBAAqB;AACvB;AACA;EACE,oBAAoB;EACpB,qBAAqB;EACrB,oBAAoB;EACpB,aAAa;AACf;AACA;EACE,uBAAuB;EACvB,sBAAsB;EACtB,qBAAqB;EACrB,YAAY;EACZ,cAAc;EACd,kBAAkB;EAClB,kBAAkB;EAClB,yBAAyB;KACtB,sBAAsB;MACrB,qBAAqB;UACjB,iBAAiB;EACzB,gBAAgB;EAChB,mBAAmB;EACnB,eAAe;MACX,WAAW;UACP,OAAO;AACjB;AACA;;EAEE,qBAAqB;EACrB,eAAe;EACf,kBAAkB;EAClB,MAAM;EACN,YAAY;EACZ,aAAa;EACb,UAAU;EACV,sBAAsB;EACtB,qBAAqB;AACvB;AACA;;EAEE,aAAa;AACf;AACA;;EAEE,kBAAkB;AACpB;AACA;;AAEA;yBACyB;AACzB;OACO;EACL,OAAO;AACT;uBACuB;AACvB;OACO;AACP;AACA;yBACyB;AACzB;uBACuB;AACvB;;AAEA;yBACyB;AACzB;OACO;EACL,QAAQ;AACV;uBACuB;AACvB;OACO;AACP;AACA;yBACyB;AACzB;uBACuB;AACvB;;EAEE,cAAc;AAChB;AACA;;EAEE,aAAa;AACf;AACA;;EAEE,WAAW;EACX,YAAY;AACd;AACA;;EAEE,6BAA6B;EAC7B,qBAAqB;EACrB,aAAa;AACf;AACA;EACE,kBAAkB;EAClB,YAAY;AACd;AACA;;EAEE,qBAAqB;AACvB;AACA;EACE,WAAW;AACb;AACA;EACE,aAAa;AACf;AACA;;EAEE,SAAS;EACT,wBAAwB;AAC1B;AACA;EACE,kBAAkB;EAClB,QAAQ;EACR,WAAW;EACX,oBAAoB;EACpB,WAAW;EACX,gBAAgB;EAChB,UAAU;EACV,eAAe;EACf,qCAAqC;EACrC,8BAA8B;UACtB,sBAAsB;AAChC;AACA;EACE,2BAA2B;AAC7B;AACA;EACE,2BAA2B;AAC7B;AACA;EACE,cAAc;EACd,WAAW;EACX,kBAAkB;AACpB;AACA;EACE,MAAM;EACN,gBAAgB;AAClB;AACA;EACE,kCAAkC;EAClC,mCAAmC;EACnC,2CAA2C;EAC3C,QAAQ;AACV;AACA;EACE,QAAQ;AACV;AACA;EACE,kCAAkC;EAClC,mCAAmC;EACnC,wCAAwC;EACxC,QAAQ;AACV;AACA;EACE,cAAc;EACd,YAAY;AACd;AACA;EACE,qBAAqB;AACvB;AACA;EACE,4BAA4B;AAC9B;AACA;EACE,UAAU;AACZ;AACA;EACE,eAAe;EACf,oBAAoB;EACpB,gBAAgB;EAChB,cAAc;EACd,kBAAkB;EAClB,UAAU;EACV,WAAW;EACX,qBAAqB;EACrB,cAAc;EACd,YAAY;EACZ,qBAAqB;EACrB,kBAAkB;EAClB,6CAA6C;UACrC,qCAAqC;AAC/C;AACA;EACE,oBAAoB;EACpB,gBAAgB;EAChB,cAAc;EACd,qBAAqB;EACrB,kBAAkB;EAClB,UAAU;AACZ;AACA;EACE,4BAA4B;AAC9B;AACA;EACE,UAAU;EACV,YAAY;EACZ,qBAAqB;AACvB;AACA;EACE,oCAAoC;AACtC;AACA;EACE,iCAAiC;AACnC;AACA;EACE,uBAAuB;EACvB,8BAA8B;UACtB,sBAAsB;EAC9B,cAAc;EACd,YAAY;EACZ,oBAAoB;EACpB,SAAS;EACT,qBAAqB;EACrB,kBAAkB;EAClB,oBAAoB;EACpB,gBAAgB;EAChB,oBAAoB;EACpB,YAAY;EACZ,SAAS;EACT,gBAAgB;EAChB,uBAAuB;EACvB,6BAA6B;EAC7B,0BAA0B;EAC1B,qBAAqB;AACvB;AACA;EACE,UAAU;AACZ;AACA;;EAEE,eAAe;EACf,sBAAsB;EACtB,uBAAuB;EACvB,oBAAoB;AACtB;AACA;EACE,oBAAoB;EACpB,uBAAuB;EACvB,YAAY;EACZ,gBAAgB;EAChB,sBAAsB;EACtB,cAAc;EACd,eAAe;EACf,kBAAkB;EAClB,oBAAoB;EACpB,gBAAgB;EAChB,YAAY;EACZ,oBAAoB;EACpB,kBAAkB;EAClB,aAAa;EACb,oBAAoB;EACpB,kBAAkB;EAClB,uBAAuB;EACvB,8BAA8B;EAC9B,4BAA4B;EAC5B,yBAAyB;EACzB,WAAW;AACb;AACA;;EAEE,aAAa;AACf;AACA;EACE,4BAA4B;AAC9B;AACA;EACE,6BAA6B;EAC7B,aAAa;EACb,UAAU;AACZ;AACA;EACE,uBAAuB;EACvB,kBAAkB;EAClB,gBAAgB;EAChB,WAAW;EACX,oBAAoB;EACpB,qBAAqB;EACrB,oBAAoB;EACpB,aAAa;EACb,yBAAyB;EACzB,2BAA2B;MACvB,sBAAsB;UAClB,mBAAmB;EAC3B,YAAY;AACd;AACA;EACE,oBAAoB;EACpB,qBAAqB;EACrB,oBAAoB;EACpB,aAAa;EACb,mBAAmB;EACnB,eAAe;MACX,WAAW;UACP,OAAO;AACjB;AACA;EACE,eAAe;EACf,cAAc;EACd,uBAAuB;EACvB,uBAAuB;EACvB,cAAc;EACd,SAAS;EACT,kBAAkB;EAClB,cAAc;EACd,mBAAmB;EACnB,eAAe;MACX,WAAW;UACP,OAAO;EACf,mBAAmB;AACrB;AACA;;EAEE,kBAAkB;AACpB;AACA;EACE,kBAAkB;EAClB,gBAAgB;EAChB,oBAAoB;EACpB,qBAAqB;EACrB,oBAAoB;EACpB,aAAa;EACb,wBAAwB;EACxB,+BAA+B;MAC3B,qBAAqB;UACjB,uBAAuB;EAC/B,gBAAgB;AAClB;AACA;EACE,UAAU;AACZ;AACA;EACE,UAAU;EACV,UAAU;EACV,gBAAgB;EAChB,gBAAgB;EAChB,oBAAoB;EACpB,oBAAoB;EACpB,8BAA8B;UACtB,sBAAsB;EAC9B,qBAAqB;EACrB,oBAAoB;EACpB,oBAAoB;EACpB,qBAAqB;EACrB,aAAa;EACb,uBAAuB;UACf,eAAe;EACvB,mBAAmB;EACnB,sBAAsB;EACtB,qCAAqC;UAC7B,6BAA6B;EACrC,6CAA6C;UACrC,qCAAqC;EAC7C,UAAU;AACZ;AACA;EACE,oCAAoC;UAC5B,4BAA4B;AACtC;AACA;EACE,gBAAgB;EAChB,6BAA6B;EAC7B,oBAAoB;EACpB,8BAA8B;UACtB,sBAAsB;EAC9B,cAAc;EACd,eAAe;EACf,gBAAgB;EAChB,kBAAkB;EAClB,+BAA+B;MAC3B,oCAAoC;UAChC,uBAAuB;EAC/B,eAAe;EACf,YAAY;EACZ,iBAAiB;EACjB,SAAS;EACT,qBAAqB;EACrB,kBAAkB;EAClB,wBAAwB;EACxB,+BAA+B;MAC3B,qBAAqB;UACjB,uBAAuB;EAC/B,kBAAkB;AACpB;AACA;;;;;;;;;;;;EAYE,eAAe;EACf,UAAU;EACV,mBAAmB;EACnB,qBAAqB;AACvB;AACA;EACE,qBAAqB;AACvB;AACA;;EAEE,qBAAqB;EACrB,mBAAmB;EACnB,WAAW;AACb;AACA;;;;;;;;;;;;;;;;;;EAkBE,mBAAmB;EACnB,wBAAwB;UAChB,gBAAgB;EACxB,WAAW;EACX,qBAAqB;AACvB;AACA;;;EAGE,4BAA4B;AAC9B;AACA;;;EAGE,4BAA4B;AAC9B;AACA;;;EAGE,qCAAqC;UAC7B,6BAA6B;AACvC;AACA;;;EAGE,mBAAmB;AACrB;AACA;EACE,gBAAgB;EAChB,qDAAqD;UAC7C,6CAA6C;AACvD;AACA;;;;;;;EAOE,yBAAyB;EACzB,uBAAuB;EACvB,yBAAyB;EACzB,eAAe;AACjB;AACA;;EAEE,mBAAmB;EACnB,yBAAyB;AAC3B;AACA;EACE,gBAAgB;EAChB,qDAAqD;UAC7C,6CAA6C;AACvD;AACA;EACE,kBAAkB;AACpB;AACA;EACE,eAAe;AACjB;AACA;EACE,WAAW;AACb;AACA;EACE,eAAe;EACf,mCAAmC;UAC3B,2BAA2B;AACrC;AACA;EACE,WAAW;EACX,WAAW;EACX,iBAAiB;AACnB;AACA;;EAEE,cAAc;EACd,WAAW;EACX,eAAe;EACf,yBAAyB;EACzB,uBAAuB;EACvB,eAAe;EACf,YAAY;AACd;AACA;EACE,cAAc;EACd,oBAAoB;EACpB,qBAAqB;EACrB,oBAAoB;EACpB,aAAa;EACb,8BAA8B;UACtB,sBAAsB;EAC9B,gBAAgB;AAClB;AACA;EACE,qBAAqB;EACrB,UAAU;EACV,8BAA8B;UACtB,sBAAsB;AAChC;AACA;EACE,kBAAkB;EAClB,UAAU;EACV,cAAc;EACd,SAAS;EACT,iBAAiB;EACjB,gBAAgB;EAChB,8BAA8B;UACtB,sBAAsB;EAC9B,gBAAgB;EAChB,oBAAoB;EACpB,qBAAqB;EACrB,oBAAoB;EACpB,aAAa;AACf;AACA;EACE,WAAW;EACX,cAAc;EACd,WAAW;AACb;AACA;EACE,mBAAmB;EACnB,eAAe;MACX,WAAW;UACP,OAAO;EACf,UAAU;EACV,YAAY;EACZ,WAAW;AACb;AACA;EACE,4BAA4B;AAC9B;AACA;EACE,yBAAyB;AAC3B;AACA;EACE,UAAU;AACZ;AACA;EACE,UAAU;AACZ;AACA;EACE,uBAAuB;EACvB,wBAAwB;UAChB,gBAAgB;EACxB,SAAS;EACT,gBAAgB;EAChB,kBAAkB;EAClB,SAAS;EACT,UAAU;EACV,eAAe;EACf,oBAAoB;EACpB,cAAc;EACd,eAAe;EACf,kBAAkB;EAClB,8BAA8B;UACtB,sBAAsB;EAC9B,6BAA6B;EAC7B,0BAA0B;EAC1B,qBAAqB;AACvB;AACA;EACE,iBAAiB;AACnB;AACA;;EAEE,gBAAgB;AAClB;AACA;EACE,UAAU;EACV,SAAS;AACX;AACA;;EAEE,eAAe;EACf,WAAW;EACX,oBAAoB;EACpB,cAAc;EACd,iBAAiB;EACjB,SAAS;EACT,yBAAyB;KACtB,sBAAsB;MACrB,qBAAqB;UACjB,iBAAiB;EACzB,0BAA0B;MACtB,2BAA2B;UACvB,kBAAkB;AAC5B;AACA;EACE,UAAU;EACV,UAAU;EACV,eAAe;EACf,kBAAkB;EAClB,gBAAgB;AAClB;AACA;;;;EAIE,gBAAgB;AAClB;AACA;EACE,eAAe;AACjB;AACA;EACE;IACE,UAAU;IACV,2CAA2C;YACnC,mCAAmC;EAC7C;EACA;IACE,UAAU;IACV,uCAAuC;YAC/B,+BAA+B;EACzC;AACF;AACA;EACE;IACE,UAAU;IACV,2CAA2C;YACnC,mCAAmC;EAC7C;EACA;IACE,UAAU;IACV,uCAAuC;YAC/B,+BAA+B;EACzC;AACF","sourcesContent":[".flatpickr-calendar {\n  background: transparent;\n  opacity: 0;\n  display: none;\n  text-align: center;\n  visibility: hidden;\n  padding: 0;\n  -webkit-animation: none;\n          animation: none;\n  direction: ltr;\n  border: 0;\n  font-size: 14px;\n  line-height: 24px;\n  border-radius: 5px;\n  position: absolute;\n  width: 307.875px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  -ms-touch-action: manipulation;\n      touch-action: manipulation;\n  background: #fff;\n  -webkit-box-shadow: 1px 0 0 #e6e6e6, -1px 0 0 #e6e6e6, 0 1px 0 #e6e6e6, 0 -1px 0 #e6e6e6, 0 3px 13px rgba(0,0,0,0.08);\n          box-shadow: 1px 0 0 #e6e6e6, -1px 0 0 #e6e6e6, 0 1px 0 #e6e6e6, 0 -1px 0 #e6e6e6, 0 3px 13px rgba(0,0,0,0.08);\n}\n.flatpickr-calendar.open,\n.flatpickr-calendar.inline {\n  opacity: 1;\n  max-height: 640px;\n  visibility: visible;\n}\n.flatpickr-calendar.open {\n  display: inline-block;\n  z-index: 99999;\n}\n.flatpickr-calendar.animate.open {\n  -webkit-animation: fpFadeInDown 300ms cubic-bezier(0.23, 1, 0.32, 1);\n          animation: fpFadeInDown 300ms cubic-bezier(0.23, 1, 0.32, 1);\n}\n.flatpickr-calendar.inline {\n  display: block;\n  position: relative;\n  top: 2px;\n}\n.flatpickr-calendar.static {\n  position: absolute;\n  top: calc(100% + 2px);\n}\n.flatpickr-calendar.static.open {\n  z-index: 999;\n  display: block;\n}\n.flatpickr-calendar.multiMonth .flatpickr-days .dayContainer:nth-child(n+1) .flatpickr-day.inRange:nth-child(7n+7) {\n  -webkit-box-shadow: none !important;\n          box-shadow: none !important;\n}\n.flatpickr-calendar.multiMonth .flatpickr-days .dayContainer:nth-child(n+2) .flatpickr-day.inRange:nth-child(7n+1) {\n  -webkit-box-shadow: -2px 0 0 #e6e6e6, 5px 0 0 #e6e6e6;\n          box-shadow: -2px 0 0 #e6e6e6, 5px 0 0 #e6e6e6;\n}\n.flatpickr-calendar .hasWeeks .dayContainer,\n.flatpickr-calendar .hasTime .dayContainer {\n  border-bottom: 0;\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0;\n}\n.flatpickr-calendar .hasWeeks .dayContainer {\n  border-left: 0;\n}\n.flatpickr-calendar.showTimeInput.hasTime .flatpickr-time {\n  height: 40px;\n  border-top: 1px solid #e6e6e6;\n}\n.flatpickr-calendar.noCalendar.hasTime .flatpickr-time {\n  height: auto;\n}\n.flatpickr-calendar:before,\n.flatpickr-calendar:after {\n  position: absolute;\n  display: block;\n  pointer-events: none;\n  border: solid transparent;\n  content: '';\n  height: 0;\n  width: 0;\n  left: 22px;\n}\n.flatpickr-calendar.rightMost:before,\n.flatpickr-calendar.rightMost:after {\n  left: auto;\n  right: 22px;\n}\n.flatpickr-calendar:before {\n  border-width: 5px;\n  margin: 0 -5px;\n}\n.flatpickr-calendar:after {\n  border-width: 4px;\n  margin: 0 -4px;\n}\n.flatpickr-calendar.arrowTop:before,\n.flatpickr-calendar.arrowTop:after {\n  bottom: 100%;\n}\n.flatpickr-calendar.arrowTop:before {\n  border-bottom-color: #e6e6e6;\n}\n.flatpickr-calendar.arrowTop:after {\n  border-bottom-color: #fff;\n}\n.flatpickr-calendar.arrowBottom:before,\n.flatpickr-calendar.arrowBottom:after {\n  top: 100%;\n}\n.flatpickr-calendar.arrowBottom:before {\n  border-top-color: #e6e6e6;\n}\n.flatpickr-calendar.arrowBottom:after {\n  border-top-color: #fff;\n}\n.flatpickr-calendar:focus {\n  outline: 0;\n}\n.flatpickr-wrapper {\n  position: relative;\n  display: inline-block;\n}\n.flatpickr-months {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n}\n.flatpickr-months .flatpickr-month {\n  background: transparent;\n  color: rgba(0,0,0,0.9);\n  fill: rgba(0,0,0,0.9);\n  height: 34px;\n  line-height: 1;\n  text-align: center;\n  position: relative;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  overflow: hidden;\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n}\n.flatpickr-months .flatpickr-prev-month,\n.flatpickr-months .flatpickr-next-month {\n  text-decoration: none;\n  cursor: pointer;\n  position: absolute;\n  top: 0;\n  height: 34px;\n  padding: 10px;\n  z-index: 3;\n  color: rgba(0,0,0,0.9);\n  fill: rgba(0,0,0,0.9);\n}\n.flatpickr-months .flatpickr-prev-month.flatpickr-disabled,\n.flatpickr-months .flatpickr-next-month.flatpickr-disabled {\n  display: none;\n}\n.flatpickr-months .flatpickr-prev-month i,\n.flatpickr-months .flatpickr-next-month i {\n  position: relative;\n}\n.flatpickr-months .flatpickr-prev-month.flatpickr-prev-month,\n.flatpickr-months .flatpickr-next-month.flatpickr-prev-month {\n/*\n      /*rtl:begin:ignore*/\n/*\n      */\n  left: 0;\n/*\n      /*rtl:end:ignore*/\n/*\n      */\n}\n/*\n      /*rtl:begin:ignore*/\n/*\n      /*rtl:end:ignore*/\n.flatpickr-months .flatpickr-prev-month.flatpickr-next-month,\n.flatpickr-months .flatpickr-next-month.flatpickr-next-month {\n/*\n      /*rtl:begin:ignore*/\n/*\n      */\n  right: 0;\n/*\n      /*rtl:end:ignore*/\n/*\n      */\n}\n/*\n      /*rtl:begin:ignore*/\n/*\n      /*rtl:end:ignore*/\n.flatpickr-months .flatpickr-prev-month:hover,\n.flatpickr-months .flatpickr-next-month:hover {\n  color: #959ea9;\n}\n.flatpickr-months .flatpickr-prev-month:hover svg,\n.flatpickr-months .flatpickr-next-month:hover svg {\n  fill: #f64747;\n}\n.flatpickr-months .flatpickr-prev-month svg,\n.flatpickr-months .flatpickr-next-month svg {\n  width: 14px;\n  height: 14px;\n}\n.flatpickr-months .flatpickr-prev-month svg path,\n.flatpickr-months .flatpickr-next-month svg path {\n  -webkit-transition: fill 0.1s;\n  transition: fill 0.1s;\n  fill: inherit;\n}\n.numInputWrapper {\n  position: relative;\n  height: auto;\n}\n.numInputWrapper input,\n.numInputWrapper span {\n  display: inline-block;\n}\n.numInputWrapper input {\n  width: 100%;\n}\n.numInputWrapper input::-ms-clear {\n  display: none;\n}\n.numInputWrapper input::-webkit-outer-spin-button,\n.numInputWrapper input::-webkit-inner-spin-button {\n  margin: 0;\n  -webkit-appearance: none;\n}\n.numInputWrapper span {\n  position: absolute;\n  right: 0;\n  width: 14px;\n  padding: 0 4px 0 2px;\n  height: 50%;\n  line-height: 50%;\n  opacity: 0;\n  cursor: pointer;\n  border: 1px solid rgba(57,57,57,0.15);\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n.numInputWrapper span:hover {\n  background: rgba(0,0,0,0.1);\n}\n.numInputWrapper span:active {\n  background: rgba(0,0,0,0.2);\n}\n.numInputWrapper span:after {\n  display: block;\n  content: \"\";\n  position: absolute;\n}\n.numInputWrapper span.arrowUp {\n  top: 0;\n  border-bottom: 0;\n}\n.numInputWrapper span.arrowUp:after {\n  border-left: 4px solid transparent;\n  border-right: 4px solid transparent;\n  border-bottom: 4px solid rgba(57,57,57,0.6);\n  top: 26%;\n}\n.numInputWrapper span.arrowDown {\n  top: 50%;\n}\n.numInputWrapper span.arrowDown:after {\n  border-left: 4px solid transparent;\n  border-right: 4px solid transparent;\n  border-top: 4px solid rgba(57,57,57,0.6);\n  top: 40%;\n}\n.numInputWrapper span svg {\n  width: inherit;\n  height: auto;\n}\n.numInputWrapper span svg path {\n  fill: rgba(0,0,0,0.5);\n}\n.numInputWrapper:hover {\n  background: rgba(0,0,0,0.05);\n}\n.numInputWrapper:hover span {\n  opacity: 1;\n}\n.flatpickr-current-month {\n  font-size: 135%;\n  line-height: inherit;\n  font-weight: 300;\n  color: inherit;\n  position: absolute;\n  width: 75%;\n  left: 12.5%;\n  padding: 7.48px 0 0 0;\n  line-height: 1;\n  height: 34px;\n  display: inline-block;\n  text-align: center;\n  -webkit-transform: translate3d(0px, 0px, 0px);\n          transform: translate3d(0px, 0px, 0px);\n}\n.flatpickr-current-month span.cur-month {\n  font-family: inherit;\n  font-weight: 700;\n  color: inherit;\n  display: inline-block;\n  margin-left: 0.5ch;\n  padding: 0;\n}\n.flatpickr-current-month span.cur-month:hover {\n  background: rgba(0,0,0,0.05);\n}\n.flatpickr-current-month .numInputWrapper {\n  width: 6ch;\n  width: 7ch\\0;\n  display: inline-block;\n}\n.flatpickr-current-month .numInputWrapper span.arrowUp:after {\n  border-bottom-color: rgba(0,0,0,0.9);\n}\n.flatpickr-current-month .numInputWrapper span.arrowDown:after {\n  border-top-color: rgba(0,0,0,0.9);\n}\n.flatpickr-current-month input.cur-year {\n  background: transparent;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  color: inherit;\n  cursor: text;\n  padding: 0 0 0 0.5ch;\n  margin: 0;\n  display: inline-block;\n  font-size: inherit;\n  font-family: inherit;\n  font-weight: 300;\n  line-height: inherit;\n  height: auto;\n  border: 0;\n  border-radius: 0;\n  vertical-align: initial;\n  -webkit-appearance: textfield;\n  -moz-appearance: textfield;\n  appearance: textfield;\n}\n.flatpickr-current-month input.cur-year:focus {\n  outline: 0;\n}\n.flatpickr-current-month input.cur-year[disabled],\n.flatpickr-current-month input.cur-year[disabled]:hover {\n  font-size: 100%;\n  color: rgba(0,0,0,0.5);\n  background: transparent;\n  pointer-events: none;\n}\n.flatpickr-current-month .flatpickr-monthDropdown-months {\n  appearance: menulist;\n  background: transparent;\n  border: none;\n  border-radius: 0;\n  box-sizing: border-box;\n  color: inherit;\n  cursor: pointer;\n  font-size: inherit;\n  font-family: inherit;\n  font-weight: 300;\n  height: auto;\n  line-height: inherit;\n  margin: -1px 0 0 0;\n  outline: none;\n  padding: 0 0 0 0.5ch;\n  position: relative;\n  vertical-align: initial;\n  -webkit-box-sizing: border-box;\n  -webkit-appearance: menulist;\n  -moz-appearance: menulist;\n  width: auto;\n}\n.flatpickr-current-month .flatpickr-monthDropdown-months:focus,\n.flatpickr-current-month .flatpickr-monthDropdown-months:active {\n  outline: none;\n}\n.flatpickr-current-month .flatpickr-monthDropdown-months:hover {\n  background: rgba(0,0,0,0.05);\n}\n.flatpickr-current-month .flatpickr-monthDropdown-months .flatpickr-monthDropdown-month {\n  background-color: transparent;\n  outline: none;\n  padding: 0;\n}\n.flatpickr-weekdays {\n  background: transparent;\n  text-align: center;\n  overflow: hidden;\n  width: 100%;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  height: 28px;\n}\n.flatpickr-weekdays .flatpickr-weekdaycontainer {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n}\nspan.flatpickr-weekday {\n  cursor: default;\n  font-size: 90%;\n  background: transparent;\n  color: rgba(0,0,0,0.54);\n  line-height: 1;\n  margin: 0;\n  text-align: center;\n  display: block;\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  font-weight: bolder;\n}\n.dayContainer,\n.flatpickr-weeks {\n  padding: 1px 0 0 0;\n}\n.flatpickr-days {\n  position: relative;\n  overflow: hidden;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: start;\n  -webkit-align-items: flex-start;\n      -ms-flex-align: start;\n          align-items: flex-start;\n  width: 307.875px;\n}\n.flatpickr-days:focus {\n  outline: 0;\n}\n.dayContainer {\n  padding: 0;\n  outline: 0;\n  text-align: left;\n  width: 307.875px;\n  min-width: 307.875px;\n  max-width: 307.875px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  display: inline-block;\n  display: -ms-flexbox;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-flex-wrap: wrap;\n          flex-wrap: wrap;\n  -ms-flex-wrap: wrap;\n  -ms-flex-pack: justify;\n  -webkit-justify-content: space-around;\n          justify-content: space-around;\n  -webkit-transform: translate3d(0px, 0px, 0px);\n          transform: translate3d(0px, 0px, 0px);\n  opacity: 1;\n}\n.dayContainer + .dayContainer {\n  -webkit-box-shadow: -1px 0 0 #e6e6e6;\n          box-shadow: -1px 0 0 #e6e6e6;\n}\n.flatpickr-day {\n  background: none;\n  border: 1px solid transparent;\n  border-radius: 150px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  color: #393939;\n  cursor: pointer;\n  font-weight: 400;\n  width: 14.2857143%;\n  -webkit-flex-basis: 14.2857143%;\n      -ms-flex-preferred-size: 14.2857143%;\n          flex-basis: 14.2857143%;\n  max-width: 39px;\n  height: 39px;\n  line-height: 39px;\n  margin: 0;\n  display: inline-block;\n  position: relative;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  text-align: center;\n}\n.flatpickr-day.inRange,\n.flatpickr-day.prevMonthDay.inRange,\n.flatpickr-day.nextMonthDay.inRange,\n.flatpickr-day.today.inRange,\n.flatpickr-day.prevMonthDay.today.inRange,\n.flatpickr-day.nextMonthDay.today.inRange,\n.flatpickr-day:hover,\n.flatpickr-day.prevMonthDay:hover,\n.flatpickr-day.nextMonthDay:hover,\n.flatpickr-day:focus,\n.flatpickr-day.prevMonthDay:focus,\n.flatpickr-day.nextMonthDay:focus {\n  cursor: pointer;\n  outline: 0;\n  background: #e6e6e6;\n  border-color: #e6e6e6;\n}\n.flatpickr-day.today {\n  border-color: #959ea9;\n}\n.flatpickr-day.today:hover,\n.flatpickr-day.today:focus {\n  border-color: #959ea9;\n  background: #959ea9;\n  color: #fff;\n}\n.flatpickr-day.selected,\n.flatpickr-day.startRange,\n.flatpickr-day.endRange,\n.flatpickr-day.selected.inRange,\n.flatpickr-day.startRange.inRange,\n.flatpickr-day.endRange.inRange,\n.flatpickr-day.selected:focus,\n.flatpickr-day.startRange:focus,\n.flatpickr-day.endRange:focus,\n.flatpickr-day.selected:hover,\n.flatpickr-day.startRange:hover,\n.flatpickr-day.endRange:hover,\n.flatpickr-day.selected.prevMonthDay,\n.flatpickr-day.startRange.prevMonthDay,\n.flatpickr-day.endRange.prevMonthDay,\n.flatpickr-day.selected.nextMonthDay,\n.flatpickr-day.startRange.nextMonthDay,\n.flatpickr-day.endRange.nextMonthDay {\n  background: #569ff7;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n  color: #fff;\n  border-color: #569ff7;\n}\n.flatpickr-day.selected.startRange,\n.flatpickr-day.startRange.startRange,\n.flatpickr-day.endRange.startRange {\n  border-radius: 50px 0 0 50px;\n}\n.flatpickr-day.selected.endRange,\n.flatpickr-day.startRange.endRange,\n.flatpickr-day.endRange.endRange {\n  border-radius: 0 50px 50px 0;\n}\n.flatpickr-day.selected.startRange + .endRange:not(:nth-child(7n+1)),\n.flatpickr-day.startRange.startRange + .endRange:not(:nth-child(7n+1)),\n.flatpickr-day.endRange.startRange + .endRange:not(:nth-child(7n+1)) {\n  -webkit-box-shadow: -10px 0 0 #569ff7;\n          box-shadow: -10px 0 0 #569ff7;\n}\n.flatpickr-day.selected.startRange.endRange,\n.flatpickr-day.startRange.startRange.endRange,\n.flatpickr-day.endRange.startRange.endRange {\n  border-radius: 50px;\n}\n.flatpickr-day.inRange {\n  border-radius: 0;\n  -webkit-box-shadow: -5px 0 0 #e6e6e6, 5px 0 0 #e6e6e6;\n          box-shadow: -5px 0 0 #e6e6e6, 5px 0 0 #e6e6e6;\n}\n.flatpickr-day.flatpickr-disabled,\n.flatpickr-day.flatpickr-disabled:hover,\n.flatpickr-day.prevMonthDay,\n.flatpickr-day.nextMonthDay,\n.flatpickr-day.notAllowed,\n.flatpickr-day.notAllowed.prevMonthDay,\n.flatpickr-day.notAllowed.nextMonthDay {\n  color: rgba(57,57,57,0.3);\n  background: transparent;\n  border-color: transparent;\n  cursor: default;\n}\n.flatpickr-day.flatpickr-disabled,\n.flatpickr-day.flatpickr-disabled:hover {\n  cursor: not-allowed;\n  color: rgba(57,57,57,0.1);\n}\n.flatpickr-day.week.selected {\n  border-radius: 0;\n  -webkit-box-shadow: -5px 0 0 #569ff7, 5px 0 0 #569ff7;\n          box-shadow: -5px 0 0 #569ff7, 5px 0 0 #569ff7;\n}\n.flatpickr-day.hidden {\n  visibility: hidden;\n}\n.rangeMode .flatpickr-day {\n  margin-top: 1px;\n}\n.flatpickr-weekwrapper {\n  float: left;\n}\n.flatpickr-weekwrapper .flatpickr-weeks {\n  padding: 0 12px;\n  -webkit-box-shadow: 1px 0 0 #e6e6e6;\n          box-shadow: 1px 0 0 #e6e6e6;\n}\n.flatpickr-weekwrapper .flatpickr-weekday {\n  float: none;\n  width: 100%;\n  line-height: 28px;\n}\n.flatpickr-weekwrapper span.flatpickr-day,\n.flatpickr-weekwrapper span.flatpickr-day:hover {\n  display: block;\n  width: 100%;\n  max-width: none;\n  color: rgba(57,57,57,0.3);\n  background: transparent;\n  cursor: default;\n  border: none;\n}\n.flatpickr-innerContainer {\n  display: block;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  overflow: hidden;\n}\n.flatpickr-rContainer {\n  display: inline-block;\n  padding: 0;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n.flatpickr-time {\n  text-align: center;\n  outline: 0;\n  display: block;\n  height: 0;\n  line-height: 40px;\n  max-height: 40px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  overflow: hidden;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n}\n.flatpickr-time:after {\n  content: \"\";\n  display: table;\n  clear: both;\n}\n.flatpickr-time .numInputWrapper {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  width: 40%;\n  height: 40px;\n  float: left;\n}\n.flatpickr-time .numInputWrapper span.arrowUp:after {\n  border-bottom-color: #393939;\n}\n.flatpickr-time .numInputWrapper span.arrowDown:after {\n  border-top-color: #393939;\n}\n.flatpickr-time.hasSeconds .numInputWrapper {\n  width: 26%;\n}\n.flatpickr-time.time24hr .numInputWrapper {\n  width: 49%;\n}\n.flatpickr-time input {\n  background: transparent;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n  border: 0;\n  border-radius: 0;\n  text-align: center;\n  margin: 0;\n  padding: 0;\n  height: inherit;\n  line-height: inherit;\n  color: #393939;\n  font-size: 14px;\n  position: relative;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  -webkit-appearance: textfield;\n  -moz-appearance: textfield;\n  appearance: textfield;\n}\n.flatpickr-time input.flatpickr-hour {\n  font-weight: bold;\n}\n.flatpickr-time input.flatpickr-minute,\n.flatpickr-time input.flatpickr-second {\n  font-weight: 400;\n}\n.flatpickr-time input:focus {\n  outline: 0;\n  border: 0;\n}\n.flatpickr-time .flatpickr-time-separator,\n.flatpickr-time .flatpickr-am-pm {\n  height: inherit;\n  float: left;\n  line-height: inherit;\n  color: #393939;\n  font-weight: bold;\n  width: 2%;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  -webkit-align-self: center;\n      -ms-flex-item-align: center;\n          align-self: center;\n}\n.flatpickr-time .flatpickr-am-pm {\n  outline: 0;\n  width: 18%;\n  cursor: pointer;\n  text-align: center;\n  font-weight: 400;\n}\n.flatpickr-time input:hover,\n.flatpickr-time .flatpickr-am-pm:hover,\n.flatpickr-time input:focus,\n.flatpickr-time .flatpickr-am-pm:focus {\n  background: #eee;\n}\n.flatpickr-input[readonly] {\n  cursor: pointer;\n}\n@-webkit-keyframes fpFadeInDown {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -20px, 0);\n            transform: translate3d(0, -20px, 0);\n  }\n  to {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 0, 0);\n            transform: translate3d(0, 0, 0);\n  }\n}\n@keyframes fpFadeInDown {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -20px, 0);\n            transform: translate3d(0, -20px, 0);\n  }\n  to {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 0, 0);\n            transform: translate3d(0, 0, 0);\n  }\n}\n"],"sourceRoot":""}]);
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
var code = "<template>\r\n    <style>\r\n      .enable {\r\n        background-color: white;\r\n      }\r\n\r\n      .aurelia-flatpickr .aurelia-flatpickr {\r\n        background-color: white;\r\n      }\r\n      .disable{\r\n        background-color: #eeeeee;\r\n      }\r\n    </style>\r\n    <require from=\"./flatpickr.css\"></require>\r\n     <div class=\"input-group aurelia-flatpickr\">\r\n      <input type=\"text\" class=\"aurelia-flatpickr form-control enable\" placeholder=\"${placeholder}\" data-input>\r\n  </div>\r\n</template>";
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
var code = "<template>\r\n    <style>\r\n       \r\n        .accAlert {\r\n          color: ${config.MENU_COLOR};\r\n          background-color:${config.SUBMENU_BACKGROUND};\r\n        }\r\n        \r\n        .navbar-default {\r\n            color: $ {\r\n                config.MENU_COLOR\r\n            }\r\n\r\n            ;\r\n\r\n            background-color:$ {\r\n                config.MENU_BACKGROUND\r\n            }\r\n        }\r\n\r\n        .navbar-inverse .navbar-nav>.active>a,\r\n        .navbar-inverse .navbar-nav>.active>a:hover,\r\n        .navbar-inverse .navbar-nav>.active>a:focus {\r\n            color: $ {\r\n                config.ACTIVE_MENU_COLOR\r\n            }\r\n\r\n            ;\r\n\r\n            background-color:$ {\r\n                config.MENU_BACKGROUND\r\n            }\r\n        }\r\n    </style>\r\n    <div class=\"noticeProfile\" style=\"z-index:1001;\" class=\"noticeProfile\">\r\n        <ul class=\"list-group\">\r\n            <li class=\"list-group-item sortable\"\r\n                style=\"background-color:Cyan;\" repeat.for=\"notice of noticeArray\">\r\n                <span style=\"font-weight:bold;\" click.trigger=\"updateNotification(notice, $index)\">${notice.notice}</span><br />\r\n                by ${notice.personId.fullName} on ${notice.dateCreated | dateFormat:config.DATE_FORMAT_TABLE:false}\r\n                <span click.delegate=\"deleteNotice(notice, $index)\"\r\n                class=\"smallMarginRight\" bootstrap-tooltip\r\n                data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n                data-original-title=\"Delete Client\"><i class=\"fa fa-trash\"\r\n                  aria-hidden=\"true\"></i></span>\r\n            </li>\r\n        </ul>\r\n    </div>\r\n    <nav class=\"navbar navbar-default navbar-fixed-top\">\r\n        <div class=\"container-fluid\">\r\n            <!-- Brand and toggle get grouped for better mobile display -->\r\n            <div class=\"navbar-header\">\r\n                <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\"\r\n                    data-target=\"#bs-example-navbar-collapse-1\" aria-expanded=\"false\">\r\n                    <span class=\"sr-only\">Toggle navigation</span>\r\n                    <span class=\"icon-bar\"></span>\r\n                    <span class=\"icon-bar\"></span>\r\n                    <span class=\"icon-bar\"></span>\r\n                </button>\r\n\r\n                <span>\r\n                    <a if.bind=\"config.NAVBAR_LOGO && config.NAVBAR_LOGO.length>0 && isAuthenticated\"\r\n                        class=\"navbar-brand\" href=\"#/user\"><img src=\"${config.IMG_DOWNLOAD_URL}${config.NAVBAR_LOGO}\"></a>\r\n                    <a if.bind=\"config.NAVBAR_LOGO && config.NAVBAR_LOGO.length>0 && !isAuthenticated\"\r\n                        class=\"navbar-brand\" href=\"#/home\"><img src=\"${config.IMG_DOWNLOAD_URL}${config.NAVBAR_LOGO}\"></a>\r\n                </span>\r\n                <span>\r\n                    <a if.bind=\"(!config.NAVBAR_LOGO.length || config.NAVBAR_LOGO.length===0) && isAuthenticated\"\r\n                        class=\"navbar-brand\" href=\"#/user\"><i class=\"fa fa-home\"></i> UCCSS</a>\r\n                    <a if.bind=\"(!config.NAVBAR_LOGO.length || config.NAVBAR_LOGO.length===0) && !isAuthenticated\"\r\n                        class=\"navbar-brand\" href=\"#/home\"><i class=\"fa fa-home\"></i> UCCSS</a>\r\n                </span>\r\n            </div>\r\n\r\n            <!-- Collect the nav links, forms, and other content for toggling -->\r\n            <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\r\n\r\n                <form if.bind=\"!isAuthenticated && !passwordReset\" class=\"navbar-form navbar-left\" role=\"search\">\r\n                    <div class=\"form-group\">\r\n                        <input value.bind=\"email\" type=\"email\" autofocus class=\"form-control\" id=\"email\"\r\n                            placeholder=\"Email\"></input>\r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <input value.bind=\"password\" type=\"password\" class=\"form-control\" id=\"password\"\r\n                            placeholder=\"Password\"></input>\r\n                    </div>\r\n                    <button class=\"btn btn-default\" click.delegate='login()'>Login</button>\r\n                    <button class=\"btn btn-link\" click.delegate=\"requestPasswordReset()\">Forgot password</button>\r\n                    <label if.bind=\"loginError\" style=\"color:white;\">${loginError}</label>\r\n                </form>\r\n                <ul class=\"nav navbar-nav\">\r\n                    <li class=\"dropdown\">\r\n                        <a if.bind=\"userObj.userRole >= config.UCC_ROLE\" href=\"#\" class=\"dropdown-toggle\"\r\n                            data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\"\r\n                            aria-expanded=\"false\">Administration <span class=\"caret\"></span></a>\r\n                        <ul class=\"dropdown-menu\">\r\n                            <li><a href=\"#/system\">System Admin</a></li>\r\n                            <li><a href=\"#/customers\">Customers</a></li>\r\n                            <li><a href=\"#/site\">Site</a></li>\r\n                            <li><a href=\"#/documents\">Documents</a></li>\r\n                            <li><a href=\"#/inventory\">Inventory</a></li>\r\n                        </ul>\r\n                    </li>\r\n                    <li class=\"dropdown\">\r\n                        <a if.bind=\"userObj.userRole >= config.UCC_TECH_ROLE\" href=\"#\" class=\"dropdown-toggle\"\r\n                            data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">Technical\r\n                            <span class=\"caret\"></span></a>\r\n                        <ul class=\"dropdown-menu\">\r\n                            <li><a href=\"#/techRq\">Product Requests</a></li>\r\n                            <!-- route-href=\"route: contactdetail; params.bind: {id:contact.id}\" -->\r\n                            <!-- <li><a href=\"#/techHt\">Help Tickets</a></li> -->\r\n                            <li><a route-href=\"route: techHt; params.bind: {HTNumber: -1}\">Help Tickets</a></li>\r\n                            <li><a href=\"#/techNotes\">Tech Notes</a></li>\r\n                        </ul>\r\n                    </li>\r\n                    <!-- <li class=\"hidden-sm hidden-md\" if.bind=\"isAuthenticated\"><a href=\"#/chapters\">Chapters</a></li> -->\r\n                    <li class=\"hidden-sm\" if.bind=\"userObj.userRole >= config.USER_ROLE\"><a href=\"#/facco\">Faculty\r\n                            Coordinator</a></li>\r\n                    <li if.bind=\"isAuthenticated\"><a href=\"#/support\">Support</a></li>\r\n                    <li if.bind=\"isAuthenticated\"><a href=\"#/clientRequests\">Product Requests</a></li>\r\n                    <li class=\"hidden-sm hidden-md\" if.bind=\"isAuthenticated && userObj.userRole >= config.UA_ROLE\"><a\r\n                            href=\"#/analytics\">Analytics</a></li>\r\n                    <li class=\"dropdown\">\r\n                        <a  if.bind=\"userObj.userRole >= config.ACC_ROLE\" href=\"#\" class=\"dropdown-toggle ${apjUnassignedRequests.length ? 'accAlert' : ''}\"\r\n                            data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">ACC <span\r\n                                class=\"caret\"></span></a>\r\n                        <ul class=\"dropdown-menu\">\r\n                            <li><a href=\"#/accinstitutions\">Customers</a></li>\r\n                            <li><a href=\"#/accprodrequests\">Product Requests</a></li>\r\n                            <li><a href=\"#/acchelptickets\">Help Tickets</a></li>\r\n                            <li><a href=\"#/accinvoices\">Invoices</a></li>\r\n                        </ul>\r\n                    </li>\r\n                </ul>\r\n\r\n                <ul class=\"nav navbar-nav navbar-right\">\r\n                    <li id=\"noticeLabel\" class=\"sortable\" click.trigger=\"showProfile($event)\"\r\n                        if.bind=\"noticeArray.length\"><a class=\"rightMargin\"\r\n                            style=\"text-decoration: none;\">Notifications\r\n                            <span class=\"badge\">${noticeArray.length}</span></a></li>\r\n                    <!-- <li class=\"dropdown\">\r\n                        <a if.bind=\"userObj.userRole >= config.UCC_ROLE\" href=\"#\" class=\"dropdown-toggle\"\r\n                            data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">Notes<span\r\n                                class=\"caret\"></span></a>\r\n                        <ul class=\"dropdown-menu\">\r\n                            <li><a click.trigger=\"enterNote()\" href=\"#\">Enter Note</a></li>\r\n                            <li><a href=\"#/notes\">Notes</a></li>\r\n                        </ul>\r\n                    </li> -->\r\n\r\n                    <li if.bind=\"!isAuthenticated\"><a href=\"#/register\">Register</a></li>\r\n                    <li class=\"hidden-sm hidden-md\" if.bind=\"isAuthenticated\"><a href=\"#/profile\">Profile</a></li>\r\n                    <li class=\"hidden-sm hidden-md\"><a href=\"#/about\">About the UCC</a></li>\r\n\r\n                    <li class=\"dropdown hidden-md\">\r\n                        <a href=\"#\" class=\"dropdown-toggle hidden-lg\" data-toggle=\"dropdown\">More <b\r\n                                class=\"caret\"></b></a>\r\n                        <ul class=\"dropdown-menu\">\r\n                            <li class=\"hidden-lg\" if.bind=\"isAuthenticated\"><a href=\"#/social\">Social</a></li>\r\n                            <li class=\"hidden-lg\" if.bind=\"userObj.userRole >= config.USER_ROLE\"><a\r\n                                    href=\"#/facco\">Faculty\r\n                                    Coordinator</a></li>\r\n                            <li class=\"hidden-lg\" if.bind=\"isAuthenticated && userObj.userRole >= config.UA_ROLE\"><a\r\n                                    href=\"#/analytics\">Analytics</a></li>\r\n                            <li class=\"hidden-lg\" if.bind=\"isAuthenticated\"><a href=\"#/profile\">Profile</a></li>\r\n                            <li class=\"hidden-lg\"><a href=\"#/about\">About the UCC</a></li>\r\n                        </ul>\r\n                    </li>\r\n                    <li if.bind=\"isAuthenticated\" click.trigger=\"logout()\"><a href=\"#\">Logout</a></li>\r\n                </ul>\r\n\r\n            </div>\r\n        </div>\r\n    </nav>\r\n</template>\r\n";
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

/***/ })

}]);
//# sourceMappingURL=app-2500ebb2.3500a8c9766278316f66.bundle.js.map