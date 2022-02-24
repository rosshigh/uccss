"use strict";
(self["webpackChunkclient"] = self["webpackChunkclient"] || []).push([["app-43e0dfcb"],{

/***/ "modules/admin/inventory/editInventory":
/*!******************************************************!*\
  !*** ./src/modules/admin/inventory/editInventory.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EditInventory": function() { return /* binding */ EditInventory; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var aurelia_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-router */ 6433);
/* harmony import */ var _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../resources/dialogs/common-dialogs */ 6545);
/* harmony import */ var _resources_utils_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../resources/utils/utils */ 8741);
/* harmony import */ var _resources_data_inventory__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../resources/data/inventory */ 5151);
/* harmony import */ var _resources_data_events__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../resources/data/events */ 4247);
/* harmony import */ var _resources_utils_validation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../resources/utils/validation */ 2824);
/* harmony import */ var _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../resources/utils/dataTable */ 6847);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../config/appConfig */ 1666);
/* harmony import */ var _resources_data_documents__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../resources/data/documents */ 7188);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! moment */ 381);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_10__);
var _dec, _class;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }












var EditInventory = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(aurelia_router__WEBPACK_IMPORTED_MODULE_1__.Router, _resources_data_inventory__WEBPACK_IMPORTED_MODULE_4__.Inventory, _resources_utils_validation__WEBPACK_IMPORTED_MODULE_6__["default"], _resources_utils_utils__WEBPACK_IMPORTED_MODULE_3__.Utils, _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_7__.DataTable, _config_appConfig__WEBPACK_IMPORTED_MODULE_8__.AppConfig, _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_2__.CommonDialogs, _resources_data_documents__WEBPACK_IMPORTED_MODULE_9__.DocumentsServices, _resources_data_events__WEBPACK_IMPORTED_MODULE_5__.Events), _dec(_class = /*#__PURE__*/function () {
  // tabs = [ {id: 'Maintenance', title: 'Maintenance'}, {id: 'History', title: 'History'},{id: 'Purchase', title: 'Purchase'}, {id: 'Technical', title: "Technical"}, {id: 'Documents', title: "Documents"}];
  // tabPath = './';
  function EditInventory(router, inventory, validation, utils, datatable, config, dialog, documents, events) {
    this.systemSelected = false;
    this.spinnerHTML = "";
    this.addressSelected = false;
    this.showDocumentForm = false;
    this.showDocuments = false;
    this.address = "";
    this.description = "";
    this.title = "Inventory";
    this.router = router;
    this.inventory = inventory;
    this.utils = utils;
    this.validation = validation;
    this.validation.initialize(this);
    this.dataTable = datatable;
    this.dataTable.initialize(this);
    this.config = config;
    this.dialog = dialog;
    this.documents = documents;
    this.eventLayer = events; // this._setupValidation();

    this.userObj = JSON.parse(sessionStorage.getItem('user'));
  }

  var _proto = EditInventory.prototype;

  _proto.attached = function attached() {
    $('[data-toggle="tooltip"]').tooltip();
  };

  _proto.activate = /*#__PURE__*/function () {
    var _activate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var responses;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return Promise.all([this.inventory.getInventoryArray('?order=systemName', true), this.config.getConfig(), this.documents.getDocumentsCategoriesArray(), this.config.getSessions(), this.eventLayer.getEventsArray('', true)]);

            case 2:
              responses = _context.sent;
              this.dataTable.updateArray(this.inventory.inventoryArray);
              this.filteredDocumentArray = this.documents.docCatsArray;

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

  _proto.tab = function tab(tabID) {
    $("#tabList").children().removeClass('active');
    $("#TabPanes").children().removeClass('active').removeClass('in');
    $("#Tab" + tabID).addClass('active');
    $("#" + tabID).addClass('active').addClass('in');
  };

  _proto.refresh = /*#__PURE__*/function () {
    var _refresh = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
              _context2.next = 3;
              return this.inventory.getInventoryArray('?order=systemName', true);

            case 3:
              this.dataTable.updateArray(this.inventory.inventoryArray);
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

  _proto.new = function _new() {
    this.editIndex = -1;
    this.inventory.selectInventory();
    $("#editSystemName").focus();
    this.systemSelected = true;
  };

  _proto.edit = function edit(index, el) {
    var _this = this;

    this.editIndex = this.dataTable.displayArray[index + parseInt(this.dataTable.startRecord)].baseIndex;
    this.inventory.selectInventory(this.editIndex);
    this.systemSelected = true;
    $("#editSystemName").focus();
    this.isDuplicate = false;
    this.eventScheduled = false;
    this.eventLayer.eventArray.forEach(function (item) {
      if (item.title.indexOf(_this.inventory.selectedInventory.systemName) > -1) {
        _this.eventScheduled = true;
        _this.eventObject = {
          day: moment__WEBPACK_IMPORTED_MODULE_10___default()(item.start).format('YYYY-MM-DD')
        };
      }
    });
    if (this.selectedRow) this.selectedRow.children().removeClass('info');
    this.selectedRow = $(el.target).closest('tr');
    this.selectedRow.children().addClass('info');
  };

  _proto.save = /*#__PURE__*/function () {
    var _save = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var response;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              response = this.inventory.saveInventory();

              if (!response.error) {
                this.utils.showNotification('The system was saved');
              }

              this._cleanUp();

            case 3:
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

  _proto.delete = /*#__PURE__*/function () {
    var _delete2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var _this2 = this;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              this.dialog.showMessage("Are you sure you want to delete this device?", "Delete", ['Yes', 'No']).whenClosed(function (response) {
                if (!response.wasCancelled) {
                  _this2.deleteIt();
                }
              });

            case 1:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function _delete() {
      return _delete2.apply(this, arguments);
    }

    return _delete;
  }();

  _proto.deleteIt = /*#__PURE__*/function () {
    var _deleteIt = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return this.inventory.deleteInventory();

            case 2:
              this._cleanUp();

              this.refresh();

            case 4:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function deleteIt() {
      return _deleteIt.apply(this, arguments);
    }

    return deleteIt;
  }();

  _proto._cleanUp = function _cleanUp() {
    this.systemSelected = false;
  };

  _proto.duplicate = function duplicate() {
    delete this.inventory.selectedInventory._id;
    this.isDuplicate = true;
    this.utils.showNotification('The inventory item was duplicated. You must save it to create the database record.');
  };

  _proto.cancel = function cancel() {};

  _proto.back = function back() {
    this.systemSelected = false;
  };

  _proto.newIP = function newIP() {
    this.address = "";
    this.description = "";
    this.selectedAddress = -1;
    this.addressSelected = true;
  };

  _proto.editIP = function editIP(index, event) {
    this.selectedAddress = index;
    this.address = this.inventory.selectedInventory.IPAddress[index].address;
    this.description = this.inventory.selectedInventory.IPAddress[index].description;
  };

  _proto.saveAddress = function saveAddress() {
    if (this.selectedAddress > -1) {
      this.inventory.selectedInventory.IPAddress[this.selectedAddress].address = this.address;
      this.inventory.selectedInventory.IPAddress[this.selectedAddress].description = this.description;
    } else {
      this.inventory.selectedInventory.IPAddress.push({
        "address": this.address,
        "description": this.description
      });
    }

    this.addressSelected = false;
  };

  _proto.cancelEditAddress = function cancelEditAddress() {
    if (this.selectedAddress > -1) {
      this.address = this.inventory.selectedInventory.IPAddress[this.selectedAddress].address;
      this.description = this.inventory.selectedInventory.IPAddress[this.selectedAddress].description;
    } else {
      this.address = "";
      this.description = "";
    }
  };

  _proto.addDocument = function addDocument(index) {
    if (!this.inventory.selectedInventory.documents) this.inventory.selectedInventory.documents = new Array();

    for (var i = 0; i < this.inventory.selectedInventory.documents.length; i++) {
      if (this.inventory.selectedInventory.documents[i].fileName == this.documents.selectedDocument.files[index].fileName) {
        return;
      }
    }

    var newDoc = {
      categoryCode: this.documents.selectedDocument.categoryCode,
      categoryName: this.documents.selectedDocument.name,
      fileName: this.documents.selectedDocument.files[index].fileName,
      default: true
    };
    this.inventory.selectedInventory.documents.push(newDoc);
  };

  _proto.chooseDocument = function chooseDocument(index, event) {
    this.documents.selectDocument(index); //Reset the selected row

    if (this.selectedRow) this.selectedRow.children().removeClass('info');
    this.selectedRow = $(event.target).closest('tr');
    this.selectedRow.children().addClass('info');
    this.showDocumentForm = true;
  };

  _proto.toggleDefault = function toggleDefault(index) {
    this.inventory.selectedInventory.documents[index].default = !this.inventory.selectedInventory.documents[index].default;
  };

  _proto.removeDocument = function removeDocument(index) {
    this.inventory.selectedInventory.documents.splice(index, 1);
  };

  _proto.scheduleEvent = /*#__PURE__*/function () {
    var _scheduleEvent = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
      var response;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (!(this.inventory.selectedInventory.maintenanceAlert === "0" || !this.inventory.selectedInventory.maintenanceAlert)) {
                _context6.next = 3;
                break;
              }

              this.utils.showNotification('You have to enter a number of days.', 'warning');
              return _context6.abrupt("return");

            case 3:
              this.eventLayer.selectEvent();
              this.eventLayer.selectedEvent.start = moment__WEBPACK_IMPORTED_MODULE_10___default()(this.inventory.selectedInventory.maintenanceEndDate).subtract(parseInt(this.inventory.selectedInventory.maintenanceAlert), 'days');
              this.eventLayer.selectedEvent.end = this.eventLayer.selectedEvent.start;
              this.eventLayer.selectedEvent.title = this.inventory.selectedInventory.systemName + ' expiration notice';
              this.eventLayer.selectedEvent.personId = this.userObj._id;
              this.eventLayer.selectedEvent.scope = "u";
              _context6.next = 11;
              return this.eventLayer.saveEvent();

            case 11:
              response = _context6.sent;

              if (!response.error) {
                this.utils.showNotification('The event was scheuled');
              }

            case 13:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function scheduleEvent() {
      return _scheduleEvent.apply(this, arguments);
    }

    return scheduleEvent;
  }();

  _proto.typeChanged = /*#__PURE__*/function () {
    var _typeChanged = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(index) {
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              if (!(index >= 0)) {
                _context7.next = 6;
                break;
              }

              this.categoryIndex = index;
              this.documents.selectCategory(index);
              _context7.next = 5;
              return this.documents.getDocumentsArray(true, '?filter=categoryCode|eq|' + this.documents.selectedCat.code);

            case 5:
              this.showDocuments = true;

            case 6:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function typeChanged(_x) {
      return _typeChanged.apply(this, arguments);
    }

    return typeChanged;
  }();

  _proto.filterList = function filterList() {
    if (this.filter) {
      var thisFilter = this.filter;
      this.filteredDocumentArray = this.documents.docCatsArray.filter(function (item) {
        return item.description.substring(0, thisFilter.length).toUpperCase() === thisFilter.toUpperCase();
      });
    } else {
      this.filteredDocumentArray = this.documents.docCatsArray;
    }
  };

  _proto.changeTab = /*#__PURE__*/function () {
    var _changeTab = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(el, index) {
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              $("#invFormListGroup.list-group").children().removeClass('active');
              $(el.target).parent().addClass('active');
              $(".in").removeClass('active').removeClass('in');
              $("#" + el.target.id + "Tab").addClass('in').addClass('active');

            case 4:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }));

    function changeTab(_x2, _x3) {
      return _changeTab.apply(this, arguments);
    }

    return changeTab;
  }();

  return EditInventory;
}()) || _class);

/***/ }),

/***/ "modules/admin/inventory/components/History.html":
/*!*************************************************************!*\
  !*** ./src/modules/admin/inventory/components/History.html ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/inventory/components/Maintenance.html":
/*!*****************************************************************!*\
  !*** ./src/modules/admin/inventory/components/Maintenance.html ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t<div class=\"row\">\r\n\t\t<div class=\"col-lg-3\">\r\n\t\t\t<div class=\"form-group\">\r\n\t\t\t\t<div class=\"col-sm-10\">\r\n\t\t\t\t\t<label>Vendor Name</label>\r\n\t\t\t\t\t<input value.bind=\"inventory.selectedInventory.maintenanceProvider\"  class=\"form-control\" placeholder=\"Vendor Name\" type=\"text\" />\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class=\"col-lg-3\">\r\n\t\t\t<div class=\"form-group\">\r\n\t\t\t\t<div class=\"col-sm-10\">\r\n\t\t\t\t\t<label>Contract Number</label>\r\n\t\t\t\t\t<input value.bind=\"inventory.selectedInventory.maintenanceContract\"  class=\"form-control\" placeholder=\"Contract Number\" type=\"text\" />\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class=\"col-lg-3\">\r\n\t\t\t<div class=\"form-group\">\r\n\t\t\t\t<div class=\"col-sm-10\">\r\n\t\t\t\t\t<label>Customer Number</label>\r\n\t\t\t\t\t<input value.bind=\"inventory.selectedInventory.maintenanceCustomerNumber\"  class=\"form-control\" placeholder=\"Customer Number\" type=\"text\" />\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class=\"col-lg-3\">\r\n\t\t\t<div class=\"form-group\">\r\n\t\t\t\t<div class=\"col-sm-10\">\r\n\t\t\t\t\t<label>Contact Name</label>\r\n\t\t\t\t\t<input value.bind=\"inventory.selectedInventory.maintenanceContact\"  class=\"form-control\" placeholder=\"Contact\" type=\"text\" />\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n\t<div class=\"row\">\r\n\t\t<div class=\"col-lg-3\">\r\n\t\t\t<div class=\"form-group\">\r\n\t\t\t\t<div class=\"col-sm-10\">\r\n\t\t\t\t\t<label>Phone</label>\r\n\t\t\t\t\t<input value.bind=\"inventory.selectedInventory.maintenancePhone\"  class=\"form-control\" placeholder=\"Phone\" type=\"text\" />\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class=\"col-lg-3\">\r\n\t\t\t<div class=\"form-group\">\r\n\t\t\t\t<div class=\"col-sm-10\">\r\n\t\t\t\t\t<label>Email</label>\r\n\t\t\t\t\t<input value.bind=\"inventory.selectedInventory.maintenanceEmail\"  class=\"form-control\" placeholder=\"Vendor Email\" type=\"text\" />\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class=\"col-lg-3\">\r\n\t\t\t<div class=\"form-group\">\r\n\t\t\t\t<div class=\"col-sm-10\">\r\n\t\t\t\t\t<label>URL</label>\r\n\t\t\t\t\t<input value.bind=\"inventory.selectedInventory.maintenanceUrl\"  class=\"form-control\" placeholder=\"Contract URL\" type=\"text\" />\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class=\"col-lg-3\">\r\n\t\t\t<div class=\"form-group\">\r\n\t\t\t\t<div class=\"col-sm-10\">\r\n\t\t\t\t\t<label>User ID</label>\r\n\t\t\t\t\t<input value.bind=\"inventory.selectedInventory.maintenaceUserId\"  class=\"form-control\" placeholder=\"User ID\" type=\"text\" />\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\t\r\n\t</div>\r\n\t<div class=\"row\">\r\n\t\t<div class=\"col-lg-3\">\r\n\t\t\t<div class=\"form-group\">\r\n\t\t\t\t<div class=\"col-sm-10\">\r\n\t\t\t\t\t<label>Password</label>\r\n\t\t\t\t\t<input value.bind=\"inventory.selectedInventory.maintenancePassword\"  class=\"form-control\" placeholder=\"Password\" type=\"text\" />\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class=\"col-lg-3\">\r\n\t\t\t<div class=\"form-group\">\r\n\t\t\t\t<div class=\"col-sm-10\">\r\n\t\t\t\t\t<label>Date Created</label>\r\n\t\t\t\t\t<flat-picker controlid=\"maintenanceStartDate\" config.bind=\"config\" value.bind=\"inventory.selectedInventory.maintenanceStartDate\"></flat-picker>\r\n\t\t\t\t\t<!-- <date-picker value.two-way=\"inventory.selectedInventory.maintenanceStartDate\"  controlid=\"maintenanceStartDate\"></date-picker> -->\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class=\"col-lg-3\">\r\n\t\t\t<div class=\"form-group\">\r\n\t\t\t\t<div class=\"col-sm-10\">\r\n\t\t\t\t\t<label>End Date</label>\r\n\t\t\t\t\t<flat-picker controlid=\"maintenanceEndDate\" config.bind=\"config\" value.bind=\"inventory.selectedInventory.maintenanceEndDate\"></flat-picker>\r\n\t\t\t\t\t<!-- <date-picker value.two-way=\"inventory.selectedInventory.maintenanceEndDate\"  controlid=\"maintenanceEndDate\"></date-picker> -->\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class=\"col-lg-3\">\r\n\t\t\t<div class=\"form-group\">\r\n\t\t\t\t<div class=\"col-sm-10\">\r\n\t\t\t\t\t<label show.bind=\"!eventScheduled\" class=\"control-label\">Days of warning before expiration</label>\r\n\t\t\t\t\t<label show.bind=\"eventScheduled\" class=\"control-label\">Days of warning before expiration (event scheduled for ${eventObject.day})</label>\r\n\t\t\t\t\t<div class=\"input-group\">\r\n\t\t\t\t\t\t<input value.bind=\"inventory.selectedInventory.maintenanceAlert\" type=\"number\" placeholder=\"Days\" class=\"form-control\">\r\n\t\t\t\t\t\t <span click.delegate=\"scheduleEvent()\" class=\"input-group-addon\">\r\n\t\t\t\t\t\t\t<i class=\"fa fa-calendar\" aria-hidden=\"true\"></i>\r\n\t\t\t\t\t\t</span>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<!--\r\n\t\t\t<button class=\"btn btn-default\" type=\"button\">Button</button>\r\n\t\t<div class=\"col-lg-3\">\r\n\t\t\t<div class=\"form-group\">\r\n\t\t\t\t<div class=\"col-sm-10\">\r\n\t\t\t\t\t<label>Days of warning before expiration</label>\r\n\t\t\t\t\t<input value.bind=\"inventory.selectedInventory.maintenanceAlert\"  class=\"form-control\" placeholder=\"Days\" type=\"number\" />\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t-->\r\n\t</div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/inventory/components/Purchase.html":
/*!**************************************************************!*\
  !*** ./src/modules/admin/inventory/components/Purchase.html ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t<div class=\"row\">\r\n\t\t<div class=\"col-lg-3\">\r\n\t\t\t<div class=\"form-group\">\r\n\t\t\t\t<div class=\"col-sm-10\">\r\n\t\t\t\t\t<label>Vendor Name</label>\r\n\t\t\t\t\t<input value.bind=\"inventory.selectedInventory.vendorName\"  class=\"form-control\" placeholder=\"Vendor Name\" type=\"text\" />\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class=\"col-lg-3\">\r\n\t\t\t<div class=\"form-group\">\r\n\t\t\t\t<div class=\"col-sm-10\">\r\n\t\t\t\t\t<label>Date Purchased</label>\r\n\t\t\t\t\t<flat-picker controlid=\"datePurchased\" config.bind=\"config\" value.bind=\"inventory.selectedInventory.datePurchased\"></flat-picker>\r\n\t\t\t\t<!--\t<date-picker value.two-way=\"inventory.selectedInventory.datePurchased\"  controlid=\"createdDate\"></date-picker> -->\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class=\"col-lg-3\">\r\n\t\t\t<div class=\"form-group\">\r\n\t\t\t\t<div class=\"col-sm-10\">\r\n\t\t\t\t\t<label>PO Number</label>\r\n\t\t\t\t\t<input value.bind=\"inventory.selectedInventory.poNumber\"  class=\"form-control\" placeholder=\"PO Number\" type=\"text\" />\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n\t<div class=\"row\">\r\n\t\t<div class=\"col-lg-3\">\r\n\t\t\t<div class=\"form-group\">\r\n\t\t\t\t<div class=\"col-sm-10\">\r\n\t\t\t\t\t<label>Vendor Contact </label>\r\n\t\t\t\t\t<input value.bind=\"inventory.selectedInventory.vendorContact\"  class=\"form-control\" placeholder=\"Contact Name\" type=\"text\" />\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class=\"col-lg-3\">\r\n\t\t\t<div class=\"form-group\">\r\n\t\t\t\t<div class=\"col-sm-10\">\r\n\t\t\t\t\t<label>Vendor Phone</label>\r\n\t\t\t\t\t<input value.bind=\"inventory.selectedInventory.vendorPhone\"  class=\"form-control\" placeholder=\"Phone\" type=\"text\" />\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class=\"col-lg-3\">\r\n\t\t\t<div class=\"form-group\">\r\n\t\t\t\t<div class=\"col-sm-10\">\r\n\t\t\t\t\t<label>Vendor Email</label>\r\n\t\t\t\t\t<input value.bind=\"inventory.selectedInventory.vendorEmail\"  class=\"form-control\" placeholder=\"Email\" type=\"text\" />\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/inventory/components/Technical.html":
/*!***************************************************************!*\
  !*** ./src/modules/admin/inventory/components/Technical.html ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t<div class=\"row\">\r\n\t\t<div class=\"col-lg-3\">\r\n\t\t\t<div class=\"form-group\">\r\n\t\t\t\t<div class=\"col-sm-10\">\r\n\t\t\t\t\t<label>Admin User ID</label>\r\n\t\t\t\t\t<input value.bind=\"inventory.selectedInventory.adminUserId\"  class=\"form-control\" placeholder=\"Admin User ID\" type=\"text\" />\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class=\"col-lg-3\">\r\n\t\t\t<div class=\"form-group\">\r\n\t\t\t\t<div class=\"col-sm-10\">\r\n\t\t\t\t\t<label>Admin Password</label>\r\n\t\t\t\t\t<input value.bind=\"inventory.selectedInventory.adminPassword\"  class=\"form-control\" placeholder=\"Admin Password\" type=\"text\" />\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class=\"col-lg-3\">\r\n\t\t\t<div class=\"form-group\">\r\n\t\t\t\t<div class=\"col-sm-10\">\r\n\t\t\t\t\t<label>System URL</label>\r\n\t\t\t\t\t<input value.bind=\"inventory.selectedInventory.systemUrl\"  class=\"form-control\" placeholder=\"System URL\" type=\"text\" />\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n\t<div class=\"topMargin\">\r\n        <table  class=\"table table-striped table-hover\">\r\n            <thead>\r\n                <tr>\r\n                    <td colspan='6'>\r\n                        <span click.delegate=\"newIP()\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"New Course\"><i class=\"fa fa-plus\" aria-hidden=\"true\"></i></span>\r\n                        <span class=\"pull-right\" id=\"spinner\" innerhtml.bind=\"spinnerHTML\"></span>\r\n                    </td>\r\n                </tr>\r\n                <tr>\r\n                    <th style=\"width:20rem;\">IP </th>\r\n                    <th style=\"width:30rem;\">Description</th>\r\n                </tr>\r\n            </thead>\r\n            <tbody>\r\n                <tr id=\"selectCourse\" click.delegate=\"editIP($index, $event)\"  repeat.for=\"address of inventory.selectedInventory.IPAddress\">\r\n                    <td data-title=\"Address\">${address.address} </td>\r\n                    <td data-title=\"Descriptino\">${address.description}</td>\r\n                </tr>\r\n            </tbody>\r\n        </table>\r\n\r\n        <div class=\"row\" show.bind=\"addressSelected\">\r\n            <div class=\"panel panel-default col-md-12\">\r\n                <div class=\"panel-body\">\r\n                    <div class=\"bottomMargin\">\r\n                        <div class=\"bottomMargin list-group-item\">\r\n                            <span click.delegate=\"saveAddress()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Save\"><i class=\"fa fa-floppy-o fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n                            <span click.delegate=\"cancelEditAddress()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Cancel Changes\"><i class=\"fa fa-ban fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n                        </div>  \r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <input id=\"number\" value.bind=\"address\" ref=\"ipAddress\" type=\"text\" placeholder=\"Address\" class=\"form-control\"/>\r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <input id=\"name\" value.bind=\"description\" ref=\"ipDescription\" type=\"text\" placeholder=\"Description\" class=\"form-control\"/>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/inventory/components/inventoryDetails.html":
/*!**********************************************************************!*\
  !*** ./src/modules/admin/inventory/components/inventoryDetails.html ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div class=\"topMargin leftMargin\">\r\n        <form class=\"form-horizontal topMargin\">\r\n            <div class=\"row\">\r\n                <div class=\"col-lg-3\">\r\n                    <div class=\"form-group\">\r\n                        <div class=\"col-sm-10\">\r\n                            <label>Name *</label>\r\n                            <input value.bind=\"inventory.selectedInventory.systemName\" id=\"editSystemName\" class=\"form-control\"\r\n                                placeholder=\"Name\" type=\"text\" />\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"col-lg-3\">\r\n                    <div class=\"form-group\">\r\n                        <div class=\"col-sm-10\">\r\n                            <label>Description *</label>\r\n                            <input value.bind=\"inventory.selectedInventory.description\" id=\"editDescription\" class=\"form-control\"\r\n                                placeholder=\"Description\" type=\"text\" />\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"col-lg-3\">\r\n                    <div class=\"form-group\">\r\n                        <div class=\"col-sm-10\">\r\n                            <label>Date Created</label>\r\n                            <flat-picker controlid=\"dateCreated\" config.bind=\"config\" value.bind=\"inventory.selectedInventory.dateCreated\"></flat-picker>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"col-lg-3\">\r\n                    <table id=\"coursesTable\" class=\"table table-striped table-hover\">\r\n                        <thead>\r\n                            <tr>\r\n                                <th>Document </th>\r\n                                <th>Default</th>\r\n                                <th></th>\r\n                            </tr>\r\n                        </thead>\r\n                        <tbody>\r\n                            <tr repeat.for=\"document of inventory.selectedInventory.documents\">\r\n                                <td data-title=\"name\"><a target=\"_blank\" href=\"${config.DOCUMENT_FILE_DOWNLOAD_URL}/${document.categoryCode}/${document.categoryName}/${document.fileName}\">${document.fileName}</a></td>\r\n                                <td data-title=\"default\" click.trigger=\"toggleDefault($index)\" innerhtml.bind='document.default | checkBox'></td>\r\n                                <td click.trigger=\"removeDocument($index)\"><i class=\"fa fa-trash\"></i></td>\r\n                            </tr>\r\n                        </tbody>\r\n                    </table>\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <div class=\"col-lg-3\">\r\n                    <div class=\"form-group\">\r\n                        <div class=\"col-sm-10\">\r\n                            <label>Serial Number</label>\r\n                            <input value.bind=\"inventory.selectedInventory.serialNumber\" class=\"form-control\"\r\n                                placeholder=\"Serial Number\" type=\"text\" />\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"col-lg-3\">\r\n                    <div class=\"form-group\">\r\n                        <div class=\"col-sm-10\">\r\n                            <label>Model Number</label>\r\n                            <input value.bind=\"inventory.selectedInventory.modelNumber\" class=\"form-control\"\r\n                                placeholder=\"Model Number\" type=\"text\" />\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"col-sm-12 col-lg-3\">\r\n                    <div class=\"form-group\">\r\n                        <div class=\"col-sm-10\">\r\n                            <label class=\"left\">Type *</label>\r\n                            <select value.bind=\"inventory.selectedInventory.type\" class=\"form-control\">\r\n                                <option value=\"\">Select an option</option>\r\n                                <option repeat.for=\"type of config.systemTypes\" value.bind=\"type\">${type}</option>\r\n                            </select>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </form>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/inventory/components/inventoryForm.html":
/*!*******************************************************************!*\
  !*** ./src/modules/admin/inventory/components/inventoryForm.html ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t<style>\r\n\t\t.menuButtons {\r\n\t\t\tcolor:$ {\r\n\t\t\t\tconfig.ACTIVE_SUBMENU_COLOR\r\n\t\t\t}\r\n\r\n\t\t\t;\r\n\r\n\t\t\tbackground-color:$ {\r\n\t\t\t\tconfig.BUTTONS_BACKGROUND\r\n\t\t\t}\r\n\t\t}\r\n\t</style>\r\n\t<div class=\"fluid-container\">\r\n\r\n\t\t<div class=\"list-group-item toolbar\">\r\n\t\t\t<span click.delegate=\"back()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n\t\t\t title=\"\" data-original-title=\"Back\"><i class=\"fa fa-arrow-left fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n\t\t\t<span click.delegate=\"save()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n\t\t\t title=\"\" data-original-title=\"Save\"><i class=\"fa fa-floppy-o fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n\t\t\t<span click.delegate=\"cancel()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n\t\t\t title=\"\" data-original-title=\"Cancel Changes\"><i class=\"fa fa-ban fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n\t\t\t<span click.delegate=\"duplicate()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n\t\t\t title=\"\" data-original-title=\"Duplicate\"><i class=\"fa fa-files-o fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n\t\t\t<span  click.delegate=\"delete()\" class=\"smallMarginRight\"\r\n\t\t\t bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Delete\"><i class=\"fa fa-trash fa-lg fa-border text-danger\"\r\n\t\t\t\t aria-hidden=\"true\"></i></span>\r\n\t\t\t<span show.bind=\"isDuplicate\">Duplicate</span>\r\n\t\t</div>\r\n\t\t<div class=\"panel panel-info positionUnderToolbar\">\r\n\t\t\t<div class=\"panel-body\" style=\"padding:5px;\">\r\n\r\n\t\t\t\t<compose view=\"./inventoryDetails.html\"></compose>\r\n\t\t\t\t<compose view=\"./inventoryPanels.html\"></compose>\r\n\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/inventory/components/inventoryPanels.html":
/*!*********************************************************************!*\
  !*** ./src/modules/admin/inventory/components/inventoryPanels.html ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div class=\"panel panel-default\">\r\n        <div class=\"panel-body\">\r\n\r\n            <div class=\"smallTopMargin\">\r\n                <ul class=\"nav nav-tabs\" role=\"tablist\" id=\"tabList\">\r\n                    <li role=\"presentation\" class=\"active\"><a click.trigger=\"tab('maintenance')\" id=\"Tabhome\" href=\"#maintenance\" aria-controls=\"home\" role=\"tab\"\r\n                            data-toggle=\"tab\">Maintenance</a></li>\r\n                    <li role=\"presentation\"><a click.trigger=\"tab('history')\" href=\"#history\" aria-controls=\"assignments\" role=\"tab\"\r\n                            data-toggle=\"tab\">History</a></li>\r\n                    <li role=\"presentation\"><a click.trigger=\"tab('purchase')\" href=\"#purchase\" aria-controls=\"messages\" role=\"tab\"\r\n                            data-toggle=\"tab\">Purchase</a></li>\r\n                    <li role=\"presentation\"><a click.trigger=\"tab('technical')\" href=\"#technical\" aria-controls=\"password\" role=\"tab\"\r\n                            data-toggle=\"tab\">Technical</a></li>\r\n                </ul>\r\n\r\n                <div class=\"tab-content\" id='TabPanes'>\r\n                    <div role=\"tabpanel\" class=\"tab-pane fade in active\" id=\"maintenance\">\r\n                        <compose view=\"./Maintenance.html\"></compose>\r\n                    </div>\r\n                    <div role=\"tabpanel\" class=\"tab-pane fade\" id=\"history\">\r\n                        <compose view=\"./History.html\"></compose>\r\n                    </div>\r\n                    <div role=\"tabpanel\" class=\"tab-pane fade\" id=\"purchase\">\r\n                        <compose view=\"./Purchase.html\"></compose>\r\n                    </div>\r\n                    <div role=\"tabpanel\" class=\"tab-pane fade\" id=\"technical\">\r\n                        <compose view=\"./Technical.html\"></compose>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n\r\n            <!-- <div class=\"col-lg-2\">\r\n                <div id=\"invFormListGroup\" class=\"list-group\">\r\n                    <a class=\"${ $first ? 'menuButtons' : ''} list-group-item\" repeat.for=\"tab of tabs\" href=\"\" \r\n                        click.delegate=\"changeTab($event, $index)\">\r\n                        <h4 id=\"${tab.id}\" class=\"list-group-item-heading\">${tab.title}</h4>\r\n                    </a>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"col-lg-10\">\r\n                <div class=\"tab-content\">\r\n                    <div repeat.for=\"tab of tabs\" id=\"${tab.id + 'Tab'}\" class=\"${ $first ? 'tab-pane fade in active' : 'tab-pane fade' }\">\r\n                        <compose view=\"${tabPath + tab.id + '.html'}\"></compose>\r\n                    </div>\r\n                </div>\r\n            </div> -->\r\n        </div>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/inventory/components/inventoryTable.html":
/*!********************************************************************!*\
  !*** ./src/modules/admin/inventory/components/inventoryTable.html ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <div class=\"panel panel-info\">\r\n        <div class=\"panel-body\">\r\n            <div class=\"row\">\r\n                <div class=\"col-lg-12\" style='padding:15px;'>\r\n                    <div class='col-lg-10 col-lg-offset-1 bottomMargin'>\r\n                        <div id=\"no-more-tables\">\r\n                            <table id=\"productsTable\" class=\"table table-striped table-hover cf\">\r\n                                <thead class=\"cf\">\r\n                                    <tr colspan='4'>\r\n                                        <compose view=\"../../../../resources/elements/table-navigation-bar.html\"></compose>\r\n                                    </tr>\r\n                                    <tr>\r\n                                        <td colspan='4'>\r\n                                            <span click.delegate=\"refresh()\" class=\"smallMarginRight\" bootstrap-tooltip\r\n                                                data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"\r\n                                                data-original-title=\"Refresh\"><i class=\"fa fa-refresh\" aria-hidden=\"true\"></i></span>\r\n                                            <span click.delegate=\"new()\" bootstrap-tooltip data-toggle=\"tooltip\"\r\n                                                data-placement=\"bottom\" title=\"\" data-original-title=\"New\"><i class=\"fa fa-plus\"\r\n                                                    aria-hidden=\"true\"></i></span>\r\n                                            <span class=\"pull-right\" id=\"spinner\" innerhtml.bind=\"spinnerHTML\"></span>\r\n                                        </td>\r\n                                    </tr>\r\n                                    <tr>\r\n                                        <th><span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'systemName'})\">Name\r\n                                            </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                                        <th><span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'serialNumber'})\">Serial\r\n                                                Number </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                                        <th><span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'modelNumber'})\">Model\r\n                                            </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                                        <th><span class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'type'})\">Type\r\n                                            </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                                    </tr>\r\n                                </thead>\r\n                                <tbody>\r\n                                    <tr>\r\n                                        <th>\r\n                                            <input value.bind=\"systemNameFilterValue\" input.delegate=\"dataTable.filterList(systemNameFilterValue, { type: 'text',  filter: 'systemNameFilter', collectionProperty: 'systemName', displayProperty: 'systemName',  compare:'match'} )\"\r\n                                                class=\"form-control\" />\r\n                                        </th>\r\n                                        <th>\r\n                                            <input value.bind=\"serialNumberFilterValue\" input.delegate=\"dataTable.filterList(serialNumberFilterValue, { type: 'text',  filter: 'serialNumberFilter', collectionProperty: 'serialNumber', displayProperty: 'serialNumber',  compare:'match'} )\"\r\n                                                class=\"form-control\" />\r\n                                        </th>\r\n                                        <th>\r\n                                            <input value.bind=\"modelNumberFilterValue\" input.delegate=\"dataTable.filterList(modelNumberFilterValue, { type: 'text',  filter: 'modelNumberFilter', collectionProperty: 'modelNumber', displayProperty: 'modelNumber',  compare:'match'} )\"\r\n                                                class=\"form-control\" />\r\n                                        </th>\r\n                                        <th>\r\n                                            <select value.bind=\"typeFilter\" input.delegate=\"dataTable.filterList($event, { type: 'value',  filter: 'typeFilter',  collectionProperty: 'type', displayProperty: 'type', compare:'match'} )\"\r\n                                                class=\"form-control\">\r\n                                                <option value=\"\"></option>\r\n                                                <option repeat.for=\"type of config.systemTypes\" value=\"${type}\">${type}</option>\r\n                                            </select>\r\n                                        </th>\r\n                                    </tr>\r\n                                    <tr class=\"clickable\" click.trigger=\"edit($index, $event)\" repeat.for=\"system of dataTable.displayArray\">\r\n                                        <td data-title=\"Name\">${system.systemName}</td>\r\n                                        <td data-title=\"Name\">${system.serialNumber}</td>\r\n                                        <td data-title=\"Name\">${system.modelNumber}</td>\r\n                                        <td data-title=\"Name\">${system.type}</td>\r\n                                    </tr>\r\n                                </tbody>\r\n                            </table>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/admin/inventory/editInventory.html":
/*!********************************************************!*\
  !*** ./src/modules/admin/inventory/editInventory.html ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <compose view='../../../resources/elements/submenu.html'></compose>\r\n    <div show.bind=\"!systemSelected\" class=\"col-lg-12\">\r\n        <compose view=\"./components/inventoryTable.html\"></compose>\r\n    </div>\r\n    <div show.bind=\"systemSelected\" class=\"col-lg-12\">\r\n        <compose view=\"./components/inventoryForm.html\"></compose>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ })

}]);
//# sourceMappingURL=app-43e0dfcb.3500a8c9766278316f66.bundle.js.map