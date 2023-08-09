"use strict";
(self["webpackChunkuccss_old_new"] = self["webpackChunkuccss_old_new"] || []).push([["app-92e19ffb"],{

/***/ "modules/home/institutions":
/*!******************************************!*\
  !*** ./src/modules/home/institutions.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ViewInstitutions: function() { return /* binding */ ViewInstitutions; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../resources/utils/dataTable */ 6847);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
/* harmony import */ var _resources_data_people__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../resources/data/people */ 353);
/* harmony import */ var _resources_data_is4ua__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../resources/data/is4ua */ 5175);
var _dec, _class;





let ViewInstitutions = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_1__.DataTable, _config_appConfig__WEBPACK_IMPORTED_MODULE_2__.AppConfig, _resources_data_people__WEBPACK_IMPORTED_MODULE_3__.People, _resources_data_is4ua__WEBPACK_IMPORTED_MODULE_4__.is4ua), _dec(_class = class ViewInstitutions {
  constructor(datatable, config, people, is4ua) {
    this.dataTable = datatable;
    this.dataTable.initialize(this);
    this.config = config;
    this.people = people;
    this.is4ua = is4ua;
  }
  async activate() {
    let responses = await Promise.all([this.people.getInstitutionsArray('?filter=institutionStatus|eq|01&order=name', true), this.is4ua.loadIs4ua()]);
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
    this.dataTable.updateArray(this.people.institutionsArray);
    this.dataTable.numRowsShown = "50";
    this.dataTable.updateTake();
    var inst = this.people.institutionsArray[0];
    this.institutionName = inst.name;
    this.institutionAddress = inst.address1 + "," + inst.city + ", " + inst.region + ", " + inst.postalCode;
    this.geocoder = new google.maps.Geocoder();
  }
  attached() {
    this.selectedRow = $('#firstRow');
    var that = this;
    var map;
    this.geocoder.geocode({
      'address': this.institutionAddress
    }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        that.map = new google.maps.Map(document.getElementById('map'), {
          center: results[0].geometry.location,
          zoom: 8
        });
      }
    });
  }
  getAddress(inst, el) {
    this.institutionName = inst.name;
    this.institutionAddress = inst.address1 + "," + inst.city + ", " + inst.region + ", " + inst.postalCode;
    if (this.selectedRow) this.selectedRow.children().removeClass('info');
    this.selectedRow = $(el.target).closest('tr');
    this.selectedRow.children().addClass('info');
    this.drawMap();
  }
  drawMap() {
    var map = this.map;
    this.geocoder.geocode({
      'address': this.institutionAddress
    }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
}) || _class);

/***/ }),

/***/ "modules/home/products":
/*!**************************************!*\
  !*** ./src/modules/home/products.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ViewProducts: function() { return /* binding */ ViewProducts; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../resources/utils/dataTable */ 6847);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
/* harmony import */ var _resources_data_products__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../resources/data/products */ 8666);
/* harmony import */ var _resources_data_is4ua__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../resources/data/is4ua */ 5175);
var _dec, _class;





let ViewProducts = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_1__.DataTable, _resources_data_products__WEBPACK_IMPORTED_MODULE_3__.Products, _resources_data_is4ua__WEBPACK_IMPORTED_MODULE_4__.is4ua, _config_appConfig__WEBPACK_IMPORTED_MODULE_2__.AppConfig), _dec(_class = class ViewProducts {
  constructor(datatable, products, is4ua, config) {
    this.dataTable = datatable;
    this.dataTable.initialize(this);
    this.products = products;
    this.is4ua = is4ua;
    this.config = config;
  }
  async activate() {
    let responses = await Promise.all([this.products.getProductsArray('?filter=active|eq|true&order=name', true), this.is4ua.loadIs4ua(), this.config.getConfig()]);
    this.dataTable.updateArray(this.products.productsArray);
    this.dataTable.numRowsShown = "50";
    this.dataTable.updateTake();
  }
}) || _class);

/***/ }),

/***/ "modules/home/register":
/*!**************************************!*\
  !*** ./src/modules/home/register.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Register: function() { return /* binding */ Register; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var aurelia_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-router */ 6433);
/* harmony import */ var _resources_utils_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../resources/utils/utils */ 8741);
/* harmony import */ var _resources_data_people__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../resources/data/people */ 353);
/* harmony import */ var _resources_data_is4ua__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../resources/data/is4ua */ 5175);
/* harmony import */ var _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../resources/dialogs/common-dialogs */ 6545);
/* harmony import */ var _resources_utils_validation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../resources/utils/validation */ 2824);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
var _dec, _class;








let Register = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(aurelia_router__WEBPACK_IMPORTED_MODULE_1__.Router, _resources_data_people__WEBPACK_IMPORTED_MODULE_3__.People, _resources_data_is4ua__WEBPACK_IMPORTED_MODULE_4__.is4ua, _resources_utils_utils__WEBPACK_IMPORTED_MODULE_2__.Utils, _config_appConfig__WEBPACK_IMPORTED_MODULE_7__.AppConfig, _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_5__.CommonDialogs, _resources_utils_validation__WEBPACK_IMPORTED_MODULE_6__["default"]), _dec(_class = class Register {
  constructor(router, people, is4ua, utils, config, dialog, validation) {
    this.title = "Create a new Account";
    this.router = router;
    this.people = people;
    this.is4ua = is4ua;
    this.utils = utils;
    this.validation = validation;
    this.config = config;
    this.dialog = dialog;
    this.validation.initialize(this);
    this.thresholdLength = 6;
    this.threshold = 3;
  }
  attached() {
    this._setUpValidation();
    $('[data-toggle="tooltip"]').tooltip();
  }
  async activate() {
    await this.people.getInstitutionsArray('?filter=institutionStatus|eq|01&order=name&fields=_id name');
    await this.is4ua.loadIs4ua();
    this.people.selectPerson();
    this.config.getConfig(true);
  }
  async checkEmail() {
    if (await this.people.checkEmail()) {
      this.duplicateAccount = true;
      this.validation.validate(2);
    } else {
      this.duplicateAccount = false;
      this.validation.makeValid($("#register_email"));
    }
  }
  async checkName() {
    if (await this.people.checkName()) {
      this.duplicateName = true;
      this.validation.validate(3);
    } else {
      this.duplicateName = false;
      this.validation.makeValid($("#register_institution"));
    }
  }
  passwordComplexity() {
    var newValue = this.people.selectedPerson.password;
    this.longPassword = newValue.length >= this.thresholdLength;
    let strength = 0;
    strength += /[A-Z]+/.test(newValue) ? 1 : 0;
    strength += /[a-z]+/.test(newValue) ? 1 : 0;
    strength += /[0-9]+/.test(newValue) ? 1 : 0;
    strength += /[\W]+/.test(newValue) ? 1 : 0;
    this.complexPassword = strength >= this.threshold && this.longPassword;
    this.validation.validate(4);
  }
  _setUpValidation() {
    this.validation.addRule(1, "register_firstName", [{
      "rule": "required",
      "message": "First Name is required",
      "value": "people.selectedPerson.firstName"
    }]);
    this.validation.addRule(1, "register_lastName", [{
      "rule": "required",
      "message": "Last Name is required",
      "value": "people.selectedPerson.lastName"
    }]);
    this.validation.addRule(1, "register_email", [{
      "rule": "required",
      "message": "Email is required",
      "value": "people.selectedPerson.email"
    }, {
      "rule": "custom",
      "message": "An account with that email exists",
      "valFunction": function (context) {
        return !context.duplicateAccount;
      }
    }, {
      "rule": "custom",
      "message": "Enter a valid email address",
      "valFunction": function (context) {
        return context.people.selectedPerson.email.indexOf('@') > -1;
      }
    }]);
    this.validation.addRule(1, "register_phone", [{
      "rule": "required",
      "message": "Phone number is required",
      "value": "people.selectedPerson.phone"
    }, {
      "rule": "length",
      "message": "Phone number isn't valid",
      "value": "people.selectedPerson.phone",
      "ruleValue": 10
    }]);
    this.validation.addRule(1, "register_mobile", [{
      "rule": "length",
      "message": "Phone number isn't valid",
      "value": "people.selectedPerson.mobile",
      "ruleValue": 10
    }]);
    this.validation.addRule(1, "register_institution", [{
      "rule": "required",
      "message": "Institution is required",
      "value": "people.selectedPerson.institutionId"
    }, {
      "rule": "custom",
      "message": "An account with that name at this institution exists",
      "valFunction": function (context) {
        return !context.duplicateName;
      }
    }]);
    this.validation.addRule(1, "register_password", [{
      "rule": "required",
      "message": "Password is required",
      "value": "people.selectedPerson.password"
    }]);
    this.validation.addRule(1, "register_password_repeat", [{
      "rule": "custom",
      "message": "Passwords must match",
      "valFunction": function (context) {
        return context.people.selectedPerson.password === context.password_repeat;
      }
    }], true);
    this.validation.addRule(2, "register_email", [{
      "rule": "custom",
      "message": "An account with that email exists",
      "valFunction": function (context) {
        return !context.duplicateAccount;
      }
    }]);
    this.validation.addRule(3, "register_institution", [{
      "rule": "custom",
      "message": "An account with that name at this institution exists",
      "valFunction": function (context) {
        return !context.duplicateName;
      }
    }]);
    this.validation.addRule(4, "register_password", [{
      "rule": "custom",
      "message": "Password should be at least " + this.thresholdLength + " characters long and should contain " + (this.threshold < 4 ? "at least " + this.threshold + " of the following groups:" : "a combination of") + " of the following groups: a combination of lowercase letters, uppercase letters, digits or special characters",
      "valFunction": function (context) {
        return context.complexPassword;
      }
    }]);
  }
  async save() {
    if (this.validation.validate(1)) {
      this.people.selectedPerson.personStatus = this.config.INACTIVE_PERSON;
      let response = await this.people.savePerson('register');
      if (!response.error) {
        this.sendFacDevEmail();
        return this.dialog.showMessage("Your account has been created.  Your faculty coordinator must activate the account before you can log on to the UCCSS.", "Account Created", ['OK']).whenClosed(response => {
          this.router.navigate("home");
        });
      } else {
        this.utils.showNotification("An error occurred creating the account", 'error');
      }
    }
  }
  sendFacDevEmail() {
    var email = new Object();
    this.people.selectInstitutionByID(this.people.selectedPerson.institutionId);
    email.email = this.people.selectedPerson.email;
    email.institutionId = this.people.selectedPerson.institutionId;
    email.institution = this.people.selectedInstitution.name;
    email.USER_MESSAGE = this.config.WELCOME_MESSAGE.replace("[[Name]]", this.people.selectedPerson.firstName + " " + this.people.selectedPerson.lastName);
    email.USER_SUBJECT = this.config.USER_NEW_CUSTOMER_SUBJECT;
    email.FACDEV_MESSAGE = this.config.FACDEV_NEW_CUSTOMER_MESSAGE.replace("[[Name]]", this.people.selectedPerson.firstName + " " + this.people.selectedPerson.lastName).replace("[[Institution]]", this.people.selectedInstitution.name);
    email.FACDEV_SUBJECT = this.config.FACDEV_NEW_CUSTOMER_SUBJECT;
    email.Name = this.people.selectedPerson.firstName + " " + this.people.selectedPerson.lastName;
    email.cc = this.config.HELP_TICKET_EMAIL_LIST ? this.config.HELP_TICKET_EMAIL_LIST : "";
    this.people.sendNewRegisterEmail(email);
  }
  back() {
    window.history.back();
  }
}) || _class);

/***/ }),

/***/ "modules/home/institutions.html":
/*!********************************************!*\
  !*** ./src/modules/home/institutions.html ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <style>\r\n    #map {\r\n        height: 600px;\r\n      }\r\n    </style>\r\n    <div class=\"col-lg-12 col-sm-12\">\r\n        <div class='col-lg-6 bottomMargin'>\r\n            <div id=\"no-more-tables\">\r\n                <table class=\"table table-striped table-hover cf\">\r\n                    <thead class=\"cf\">\r\n                        <tr colspan='4'>\r\n                                <compose view=\"../../resources/elements/table-navigation-bar.html\"></compose>\r\n                        </tr>\r\n                        <tr>\r\n                            <th class=\"col-lg-1\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'name'})\">Institution </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                            <th class=\"col-lg-1\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'city'})\">City </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                            <th class=\"col-lg-1\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'region'})\">Region </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                            <th class=\"col-lg-1\"><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'country'})\">Country </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                            \r\n                        </tr>\r\n                    </thead>\r\n                    <tbody>\r\n                        <tr>\r\n                            <th>\r\n                            \t<input value.bind=\"nameFilterValue\" input.delegate=\"dataTable.filterList(nameFilterValue, { type: 'text',  filter: 'nameFilter', lookupArray: '', lookupProperty: '', collectionProperty: 'name', displayProperty: 'name', matchProperty:'', compare:'match'} )\"  class=\"form-control\" />\r\n                            </th>\r\n                            <th>\r\n                                <input value.bind=\"cityFilterValue\" input.delegate=\"dataTable.filterList(cityFilterValue, { type: 'text',  filter: 'cityFilter', lookupArray: '', lookupProperty: '', collectionProperty: 'city', displayProperty: 'city', matchProperty:'', compare:'match'} )\"  class=\"form-control\" />\r\n                            </th>\r\n                            <th>\r\n                                <input value.bind=\"regionFilterValue\" input.delegate=\"dataTable.filterList(regionFilterValue, { type: 'text',  filter: 'regionFilter', lookupArray: '', lookupProperty: '', collectionProperty: 'region', displayProperty: 'region', matchProperty:'', compare:'match'} )\"  class=\"form-control\" />\r\n                            </th>\r\n                            <th>\r\n\t\t\t\t\t\t\t\t<input value.bind=\"countryFilterValue\" input.delegate=\"dataTable.filterList(countryFilterValue, { type: 'text',  filter: 'countryFilter', lookupArray: '', lookupProperty: '', collectionProperty: 'country', displayProperty: 'country', matchProperty:'', compare:'match'} )\"  class=\"form-control\" />\r\n                            </th>\r\n\t\t\t\t\t\t\t\r\n                        </tr>\r\n                        <tr id=\"${$first ? 'firstRow' : ''}\" click.trigger=\"getAddress(inst, $event)\" repeat.for=\"inst of dataTable.displayArray\">\r\n                            <td class=\"${$first ? 'info' : ''}\" data-title=\"Name\">${inst.name}</td>\r\n\t\t\t\t\t\t\t<td class=\"${$first ? 'info' : ''}\" data-title=\"City\">${inst.city}</td>\r\n\t\t\t\t\t\t\t<td class=\"${$first ? 'info' : ''}\" data-title=\"Region\">${inst.region}</td>\r\n\t\t\t\t\t\t\t<td class=\"${$first ? 'info' : ''}\" data-title=\"Country\">${inst.country}</td>\r\n                           \r\n                        </tr>\r\n                    </tbody>\r\n                </table>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"col-lg-6 fixed\">\r\n            <h3 style=\"margin-top:100px;margin-left:100px;\">${institutionName}</h3>\r\n            <div style=\"margin-left:100px;border-style: groove;padding-left:0px;padding-right:0px;\" id=\"map\"></div>\r\n        </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/home/products.html":
/*!****************************************!*\
  !*** ./src/modules/home/products.html ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t<div class=\"col-lg-12\" style='padding:15px;'>\r\n        <div class='row'>\r\n            <div class='col-lg-8 col-lg-offset-2 bottomMargin'>\r\n                <div id=\"no-more-tables\">\r\n                    <table id=\"productsTable\" class=\"table table-striped table-hover cf\">\r\n                        <thead class=\"cf\">\r\n                            <tr colspan='5'>\r\n                                 <compose view=\"../../resources/elements/table-navigation-bar.html\"></compose>\r\n                                 </tr>\r\n                            <tr>                            \r\n                            <tr>\r\n                                <th><span  class=\"sortable\" click.trigger=\"dataTable.sortArray($event, {propertyName: 'name'})\">Name </span><span><i class=\"fa fa-sort\"></i></span></th>\r\n                                <th style=\"width:150px;\">SAP Product</th>\r\n                            </tr>\r\n                        </thead>\r\n                        <tbody>\r\n                            <tr>\r\n                                <th>\r\n\t\t\t\t\t\t\t\t\t<input value.bind=\"nameFilterValue\" input.delegate=\"dataTable.filterList(nameFilterValue, { type: 'text',  filter: 'nameFilterValue', collectionProperty: 'name', displayProperty: 'name',  compare:'match'} )\"  class=\"form-control\" />\r\n                                </th>\r\n                                <th>\r\n                                    <select value.bind=\"sapNameFilterValue\" input.delegate=\"dataTable.filterList($event, { type: 'value',  filter: 'sapNameFilter', collectionProperty: 'sapProduct', displayProperty: 'sapProduct',  compare:'match'} )\" class=\"form-control \" >\r\n                                        <option value=\"\"></option>\r\n                                        <option repeat.for=\"product of is4ua.sapProductsArray\" value=\"${product.code}\">${product.description}</option>\r\n                                    </select>\r\n                                </th>\r\n                            </tr>\r\n                            <tr click.trigger=\"edit($index, $event)\" repeat.for=\"system of dataTable.displayArray\">\r\n                                <td data-title=\"Name\">${system.name}</td>\r\n                                <td data-title=\"SAP Product\">${system.sapProduct | lookupValue:is4ua.sapProductsArray:\"code\":\"description\"}</td>\r\n                            </tr>\r\n                        </tbody>\r\n                    </table>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/home/register.html":
/*!****************************************!*\
  !*** ./src/modules/home/register.html ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n     <compose view='../../resources/elements/submenu.html'></compose>\r\n     <div class=\"col-lg-10 col-lg-offset-1\">\r\n      <div class=\"panel panel-primary topMargin\">\r\n        <div class=\"panel-body\">\r\n          <div class=\"bottomMargin list-group-item leftMargin rightMargin\">\r\n              <span click.delegate=\"back()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Backve\"><i class=\"fa fa-arrow-left fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n              <span click.delegate=\"save()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Save\"><i class=\"fa fa-floppy-o fa-lg fa-border\" aria-hidden=\"true\"></i></span>\r\n              <span>${config.REGISTER_PAGE_MESSAGE}</span>\r\n          </div>\r\n          <div class=\"topMargin col-lg-1\">\r\n           <div style=\"height:100px;width:100px;\" innerhtml.bind=\"people.selectedPerson.email | gravatarUrl:100:6\"></div>\r\n           <div class=\"topMargin\">\r\n               <h6>Register your email with <a href=\"https://en.gravatar.com/\">gravatar.com</a> to show your image.</h6>\r\n           </div>\r\n         </div>\r\n         <div class=\"col-sm-12 col-lg-10 leftMargin topMargin\">\r\n           <form class=\"form-horizontal\">\r\n               <!-- Row 1 -->\r\n               <div class=\"col-lg-3\">\r\n                 <label for=\"register_firstName\" class=\"control-label \">First Name *</label>\r\n                 <input value.bind=\"people.selectedPerson.firstName\" id=\"register_firstName\" class=\"form-control\" placeholder=\"First Name\" type=\"text\" />\r\n               </div>\r\n               <div class=\"col-lg-3\">\r\n                  <label for=\"register_middletName\" class=\"control-label \">Middle Name</label>\r\n                  <input value.bind=\"people.selectedPerson.middleName\" id=\"register_middletName\" class=\"form-control\" placeholder=\"Middle Name\" type=\"text\" />\r\n              </div>\r\n              <div class=\"col-lg-3\">\r\n                <label for=\"register_lastName\" class=\"control-label \">Last Name *</label>\r\n                <input value.bind=\"people.selectedPerson.lastName\" id=\"register_lastName\" class=\"form-control\" placeholder=\"Last Name\" type=\"text\" />\r\n              </div>\r\n              <div class=\"col-lg-3\">\r\n                <label for=\"editNickName\" class=\"control-label\">Nickname</label>\r\n                <input value.bind=\"people.selectedPerson.nickName\" id=\"editNickName\" class=\"form-control \" placeholder=\"Nickname\" type=\"text\" />\r\n              </div>\r\n              <div class=\"row\">\r\n                <div class=\"col-lg-5\">\r\n                  <div class=\"col-lg-12\">\r\n                    <label for=\"register_phone\" class=\"control-label \">Phone *</label>\r\n                    <input class=\"form-control\" id=\"register_phone\" masked=\"value.bind: people.selectedPerson.phone; mask: 999-999-9999; placeholder: *\" />\r\n                  </div>\r\n                  <div class=\"col-lg-12\">\r\n                    <label for=\"register_mobile\" class=\"control-label \">Mobile</label>\r\n                    <input id=\"register_mobile\" class=\"form-control\" masked=\"value.bind: people.selectedPerson.mobile; mask: 999-999-9999; placeholder: *\" />\r\n                  </div>\r\n                  <div class=\"col-lg-12\">\r\n                    <label for=\"register_email\" class=\"control-label\">Email *</label>\r\n                    <input blur.trigger=\"checkEmail()\" value.bind=\"people.selectedPerson.email\" id=\"register_email\" class=\"form-control\" placeholder=\"Email\" type=\"text\" />\r\n                  </div>\r\n                  <div class=\"col-lg-12\">\r\n                    <label for=\"register_institution\" class=\"control-label\">Institution *</label>\r\n                    <select value.bind=\"people.selectedPerson.institutionId\" id=\"register_institution\" class=\"form-control\" placeholder=\"Institution\">\r\n                        <option value=\"\">Select an option</option>\r\n                        <option repeat.for=\"institution of people.institutionsArray\" value=\"${institution._id}\">${institution.name}</option>\r\n                    </select>\r\n                  </div>\r\n                  <div class=\"col-lg-12\">\r\n                    <label for=\"register_password\" class=\"control-label\">Password *</label>\r\n                    <input id=\"register_password\" type=\"password\" placeholder=\"Password\"\r\n                        class=\"form-control\"\r\n                        value.bind=\"people.selectedPerson.password\"\r\n                        blur.trigger=\"passwordComplexity()\" />\r\n                  </div>\r\n                  <div class=\"col-lg-12\">\r\n                    <label for=\"register_password_repeat\" class=\"control-label\">Repeat Password *</label>\r\n                    <input id=\"register_password_repeat\" type=\"password\" placeholder=\"Password\"\r\n                        class=\"form-control\"\r\n                        value.bind=\"password_repeat\" />\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-lg-5 col-lg-offset-1\">\r\n                  <div class=\"col-lg-12\">\r\n                    <label for=\"register_address1\" class=\"control-label \">Address 1</label>\r\n                    <input value.bind=\"people.selectedPerson.address1\" id=\"register_address1\" class=\"form-control\" placeholder=\"Address 1\" type=\"text\" />\r\n                  </div>\r\n                  <div class=\"col-lg-12\">\r\n                    <label for=\"register_address2\" class=\"control-label \">Address 2</label>\r\n                    <input value.bind=\"people.selectedPerson.address2\" id=\"register_address2\" class=\"form-control\" placeholder=\"Address2\" type=\"text\" />\r\n                  </div>\r\n                  <div class=\"col-lg-12\">\r\n                    <label for=\"register_city\" class=\"control-label \">City</label>\r\n                    <input value.bind=\"people.selectedPerson.city\" id=\"register_city\" class=\"form-control\" placeholder=\"City\" type=\"text\" />\r\n                  </div>\r\n                  <div class=\"col-lg-12\">\r\n                    <label for=\"register_region\" class=\"control-label \">Region</label>\r\n                    <input value.bind=\"people.selectedPerson.region\" id=\"register_region\" class=\"form-control\" placeholder=\"Region\" type=\"text\" />\r\n                  </div>\r\n                  <div class=\"col-lg-12\">\r\n                    <label for=\"register_postal_code\" class=\"control-label \">Postal Code</label>\r\n                    <input value.bind=\"people.selectedPerson.postalCode\" id=\"register_postal_code\" class=\"form-control\" placeholder=\"Postal Code\" type=\"text\" />\r\n                  </div>\r\n                  <div class=\"col-lg-12\">\r\n                    <label for=\"register_country\" class=\"control-label \">Country</label>\r\n                    <input value.bind=\"people.selectedPerson.country\" id=\"register_country\" class=\"form-control\" placeholder=\"Country\" type=\"text\" />\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"topMargin\">Password should be at least ${thresholdLength} characters long and should contain a combination of the following groups: a combination of lowercase letters, uppercase letters, digits or special characters</div>\r\n              <div class=\"row topMargin\">\r\n               <div class=\"col-lg-5\">\r\n                 <label for=\"register_specialization\" class=\"control-label\">Specialization</label>\r\n                 <select value.bind=\"people.selectedPerson.personSpecialization\" id=\"register_specialization\" class=\"form-control\" placeholder=\"Specializatin\">\r\n                     <option value=\"\">Select an option</option>\r\n                     <option repeat.for=\"name of is4ua.specialArray\" value=\"${name.code}\">${name.description}</option>\r\n                 </select>\r\n               </div>\r\n               <div class=\"col-lg-5 col-lg-offset-1\">\r\n                 <label for=\"register_department\" class=\"control-label\">Department</label>\r\n                 <select value.bind=\"people.selectedPerson.departmentCategory\" id=\"register_department\" class=\"form-control\" placeholder=\"Department\">\r\n                     <option value=\"\">Select an option</option>\r\n                     <option repeat.for=\"name of is4ua.deptArray\" value=\"${name.code}\">${name.description}</option>\r\n                 </select>\r\n               </div>\r\n           </div>\r\n         </form>\r\n         </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>\r\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ })

}]);
//# sourceMappingURL=app-92e19ffb.2384d3fce1a12a237460.bundle.js.map