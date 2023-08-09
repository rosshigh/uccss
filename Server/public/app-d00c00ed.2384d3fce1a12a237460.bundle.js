"use strict";
(self["webpackChunkuccss_old_new"] = self["webpackChunkuccss_old_new"] || []).push([["app-d00c00ed"],{

/***/ "modules/user/profile":
/*!*************************************!*\
  !*** ./src/modules/user/profile.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Profile: function() { return /* binding */ Profile; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var aurelia_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-router */ 6433);
/* harmony import */ var _resources_utils_validation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../resources/utils/validation */ 2824);
/* harmony import */ var _resources_utils_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../resources/utils/utils */ 8741);
/* harmony import */ var _resources_data_is4ua__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../resources/data/is4ua */ 5175);
/* harmony import */ var _resources_data_people__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../resources/data/people */ 353);
/* harmony import */ var _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../resources/dialogs/common-dialogs */ 6545);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
var _dec, _class;








let Profile = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_resources_data_is4ua__WEBPACK_IMPORTED_MODULE_4__.is4ua, _resources_data_people__WEBPACK_IMPORTED_MODULE_5__.People, aurelia_router__WEBPACK_IMPORTED_MODULE_1__.Router, _resources_utils_utils__WEBPACK_IMPORTED_MODULE_3__.Utils, _resources_utils_validation__WEBPACK_IMPORTED_MODULE_2__["default"], _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_6__.CommonDialogs, _config_appConfig__WEBPACK_IMPORTED_MODULE_7__.AppConfig), _dec(_class = class Profile {
  constructor(is4ua, people, router, utils, validation, dialog, config) {
    this.title = "Profile";
    this.phoneMask = "";
    this.is4ua = is4ua;
    this.people = people;
    this.router = router;
    this.utils = utils;
    this.dialog = dialog;
    this.config = config;
    this.validation = validation;
    this.validation.initialize(this);
    this._setupValidation();
    this.userObj = JSON.parse(sessionStorage.getItem('user'));
  }
  _setupValidation() {
    this.validation.addRule(1, "editFirstName", [{
      "rule": "required",
      "message": "First Name is required",
      "value": "people.selectedPerson.firstName"
    }]);
    this.validation.addRule(1, "editLastName", [{
      "rule": "required",
      "message": "Last Name is required",
      "value": "people.selectedPerson.lastName"
    }]);
    this.validation.addRule(1, "editInstitution", [{
      "rule": "required",
      "message": "Institution is required",
      "value": "people.selectedPerson.institutionId"
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
        return context.password === context.password_repeat;
      }
    }], true);
    this.validation.addRule(4, "register_password", [{
      "rule": "custom",
      "message": "Password should be at least " + this.thresholdLength + " characters long and should contain " + (this.threshold < 4 ? "at least " + this.threshold + " of the following groups:" : "a combination of") + " of the following groups: a combination of lowercase letters, uppercase letters, digits or special characters",
      "valFunction": function (context) {
        return context.complexPassword;
      }
    }]);
  }
  attached() {
    $('[data-toggle="tooltip"]').tooltip();
  }
  getPhoneMask() {
    this.phoneMask = "";
    setTimeout(() => {
      for (let i = 0; i < this.config.PHONE_MASKS.length; i++) {
        if (this.people.selectedPerson.country === this.config.PHONE_MASKS[i].country) {
          this.phoneMask = this.config.PHONE_MASKS[i].mask;
          break;
        }
      }
    }, 500);
  }
  async activate() {
    let responses = await Promise.all([this.people.getPerson(this.userObj._id), this.people.getInstitutionsArray('?fields=_id name&order=name'), this.is4ua.loadIs4ua()]);
    this.config.getConfig(true);
    this.user = this.people.selectedPerson;
    if (this.people.selectedPerson.file && this.people.selectedPerson.file.fileName) {
      this.personImage = this.people.selectedPerson.file.fileName;
    }
    this.getPhoneMask();
  }
  canActivate() {
    if (!this.userObj) {
      this.userObj = this.config.user;
      if (!this.userObj) {
        this.utils.showNotification("Couldn't find your user information.  Try logging in again or call the UCC.");
        this.router.navigate("home");
      }
    }
  }
  buildAudit() {
    var changes = this.people.isPersonDirty(this.user);
    changes.forEach(item => {
      this.people.selectedPerson.audit.push({
        property: item.property,
        eventDate: new Date(),
        oldValue: item.oldValue,
        newValue: item.newValue,
        personId: JSON.parse(sessionStorage.getItem('user'))._id
      });
    });
  }
  async save() {
    if (this.validation.validate(1, this)) {
      if (this.password && this.password.length > 0) {
        this.people.selectedPerson.password = this.password;
      }
      if (this.people.selectedPerson.roles.indexOf("PROV") > -1) {
        this.people.selectedPerson.roles.splice(this.people.selectedPerson.roles.indexOf("PROV"), 1);
      }
      this.buildAudit();
      let response = await this.people.savePerson();
      if (!response.error) {
        if (this.filesToUpload && this.filesToUpload.length > 0) {
          await this.people.uploadFile(this.filesToUpload);
          this.personImage = this.people.selectedPerson._id + this.people.selectedPerson.file.fileName.substring(this.people.selectedPerson.file.fileName.indexOf('.'));
        }
        this.utils.showNotification("Your profile has been updated.");
        this.showPreview = false;
      } else {
        this.utils.showNotification("An error occurred updating your profile");
      }
    }
  }
  changePassword() {
    var passwords = {
      password: "",
      password_repeat: ""
    };
    return this.dialog.showPassword("Change Password", passwords, ['Submit', 'Cancel']).whenClosed(response => {
      if (!response.wasCancelled) {
        this.savePassword(response.output.password);
      } else {
        console.log("Cancelled");
      }
    });
  }
  async savePassword(password) {
    var obj = {
      password: password
    };
    let response = await this.people.updatePassword(obj);
    if (!response.error) {
      this.utils.showNotification("The password was updated");
    }
  }
  cancel() {
    this.utils.copyObject(this.users, this.people.selectedPerson);
  }
  changeFiles() {
    if (this.files[0].size > 100000) {
      this.utils.showNotification("That image is too large.  The limit is 100,000 KB");
      return;
    }
    if (!this.people.selectedPerson.file) this.people.selectedPerson.file = new Object();
    this.filesToUpload = new Array();
    this.filesToUpload.push(this.files[0]);
    this.people.selectedPerson.file.fileName = this.filesToUpload[0].name;
    this.previewFile();
  }
  previewFile() {
    var preview = this.preview;
    var reader = new FileReader();
    this.showPreview = true;
    reader.onloadend = function () {
      preview.src = reader.result;
    };
    if (this.files[0]) {
      reader.readAsDataURL(this.files[0]);
    } else {
      preview.src = "";
    }
  }
  deleteImage() {
    this.people.selectedPerson.file = new Object();
    this.preview.src = "";
    document.getElementById("fileUpload").value = "";
    this.personImage = undefined;
    this.showPreview = false;
  }
}) || _class);

/***/ }),

/***/ "modules/user/profile.html":
/*!***************************************!*\
  !*** ./src/modules/user/profile.html ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\n    <compose view='../../resources/elements/submenu.html'></compose>   \n\n <div class=\"col-lg-8 col-lg-offset-2\">\n  <div class=\"panel panel-primary topMargin\">\n    <div class=\"panel-body\">\n      <div class=\"bottomMargin list-group-item leftMargin rightMargin\">\n          <span click.delegate=\"save()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Save\"><i class=\"fa fa-floppy-o fa-lg fa-border\" aria-hidden=\"true\"></i></span>\n          <span click.delegate=\"changePassword()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Change Password\"><i class=\"fa fa-key fa-lg fa-border\" aria-hidden=\"true\"></i></span>\n          <span click.delegate=\"cancel()\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\" data-original-title=\"Cancel Changes\"><i class=\"fa fa-ban fa-lg fa-border\" aria-hidden=\"true\"></i></span>\n      </div>\n      <div class=\"topMargin col-lg-2\">\n        <div class=\"topMargin\">\n            <img if.bind=\"personImage\" class=\"circular--square leftMargin\" src =\"${config.PERSON_IMAGE_DOWNLOAD_URL}/${personImage}\" height=\"100\">\n        </div>\n        <div if.bind=\"!personImage\" style=\"height:100px;width:100px;\" innerhtml.bind=\"people.selectedPerson.email | gravatarUrl:100:6\"></div>\n        <div class=\"topMargin\">\n            <h6>Register your email with <a href=\"https://en.gravatar.com/\">gravatar.com</a> to show your image.</h6>\n        </div>\n        \n        <label class=\"btn btn-primary\">\n                Or Upload a Photo&hellip; <input type=\"file\" id=\"fileUpload\" style=\"display: none;\" change.delegate=\"changeFiles()\" files.bind=\"files\">\n        </label>\n        <button if.bind=\"people.selectedPerson.file.fileName\" class=\"btn btn-danger topMargin\" click.trigger=\"deleteImage()\">Delete Image</button>\n        <div show.bind=\"showPreview\" class=\"topMargin\">\n            <!-- <img id=\"preview\"  class=\"circular--square leftMargin\" src=\"\" height=\"100\" alt=\"Image preview...\" ref=\"preview\"> -->\n            <label>Preview</label>\n        </div>\n      </div>\n      <div class=\"col-lg-9 leftMargin topMargin\">\n        <form class=\"form-horizontal\">\n          <div class=\"row\">\n            <!-- Row 1 -->\n            <div class=\"col-lg-4\">\n              <label for=\"editFirstName\" class=\"control-label hideOnPhone\">Name</label>\n              <input value.bind=\"people.selectedPerson.firstName\" id=\"editFirstName\" class=\"form-control input-md\" placeholder=\"First Name\" type=\"text\" />\n            </div>\n            <div class=\"col-lg-4\">\n              <label for=\"editMiddleName\" class=\"control-label hideOnPhone\">Middle Name</label>\n              <input value.bind=\"people.selectedPerson.middleName\" id=\"editMiddleName\" class=\"form-control input-md\" placeholder=\"Middle Name\" type=\"text\" />\n            </div>\n            <div class=\"col-lg-4\">\n              <label for=\"editLastName\" class=\"control-label hideOnPhone\">Last Name</label>\n              <input value.bind=\"people.selectedPerson.lastName\" id=\"editLastName\" class=\"form-control input-md\" placeholder=\"Last Name\" type=\"text\" />\n            </div>\n          </div>\n          <!-- Row 2 -->\n          <div class=\"row topMargin\">\n            <div class=\"col-lg-5\">\n              <div class=\"col-lg-12\">\n                  <label for=\"editPhone\" class=\"control-label hideOnPhone\">Phone</label>\n                  <input if.bind=\"phoneMask\" class=\"form-control\" id=\"editMobile\" masked=\"value.bind: people.selectedPerson.phone; mask.bind: phoneMask; placeholder: *\"/>\n                  <input if.bind=\"!phoneMask\" class=\"form-control\" id=\"editMobile\" value.bind=\"people.selectedPerson.phone\" />\n                  <!--o\n                  <input value.bind=\"people.selectedPerson.phone| phoneNumber\" id=\"editPhone\" class=\"form-control input-md\" placeholder=\"Phone\" type=\"text\" />\n                  -->\n              </div>\n              <div class=\"col-lg-12\">\n                  <label for=\"editext\" class=\"control-label hideOnPhone\">Extension</label>\n                  <input value.bind=\"people.selectedPerson.ext\" id=\"editext\" class=\"form-control input-md\" placeholder=\"Extension\" type=\"text\" />\n              </div>\n              <div class=\"col-lg-12\">\n                  <label for=\"editMobile\" class=\"control-label hideOnPhone\">Mobile</label>\n                  <input if.bind=\"phoneMask\" class=\"form-control\" id=\"editMobile\" masked=\"value.bind: people.selectedPerson.mobile; mask.bind: phoneMask; placeholder: *\"/>\n                  <input if.bind=\"!phoneMask\" class=\"form-control\" id=\"editMobile\" value.bind=\"people.selectedPerson.mobile\" />\n                  <!--\n                  <input value.bind=\"people.selectedPerson.mobile | phoneNumber\" id=\"editMobile\" class=\"form-control input-md\" placeholder=\"Mobile\" type=\"text\" />\n                  -->\n              </div>\n              <div class=\"col-lg-12\">\n                  <label for=\"editEmail\" class=\"control-label hideOnPhone\">Email</label>\n                  <input disabled value.bind=\"people.selectedPerson.email\" id=\"editEmail\" class=\"form-control input-md\" placeholder=\"Email\" type=\"text\" />\n              </div>\n              <div class=\"col-lg-12\">\n                  <label for=\"editInstitution\" class=\"control-label\">Institution</label>\n                  <select value.bind=\"people.selectedPerson.institutionId\" id=\"editInstitution\" class=\"form-control input-md\" placeholder=\"Institution\">\n                      <option value=\"\">Select an option</option>\n                      <option repeat.for=\"institution of people.institutionsArray\" value=\"${institution._id}\">${institution.name}</option>\n                  </select>\n              </div>\n            </div>\n            <div class=\"col-lg-5 col-lg-offset-1\">\n              <div class=\"col-lg-12\">\n                  <label for=\"editAddress1\" class=\"control-label hideOnPhone\">Address 1</label>\n                  <input value.bind=\"people.selectedPerson.address1\" id=\"editAddress1\" class=\"form-control input-md\" placeholder=\"Address 1\" type=\"text\" />\n              </div>\n              <div class=\"col-lg-12\">\n                  <label for=\"editAddress2\" class=\"control-label hideOnPhone\">Address 2</label>\n                  <input value.bind=\"people.selectedPerson.address2\" id=\"editAddress2\" class=\"form-control input-md\" placeholder=\"Address2\" type=\"text\" />\n              </div>\n              <div class=\"col-lg-12\">\n                  <label for=\"editCity\" class=\"control-label hideOnPhone\">City</label>\n                  <input value.bind=\"people.selectedPerson.city\" id=\"editCity\" class=\"form-control input-md\" placeholder=\"City\" type=\"text\" />\n              </div>\n              <div class=\"col-lg-12\">\n                  <label for=\"editRegion\" class=\"control-label hideOnPhone\">Region</label>\n                  <input value.bind=\"people.selectedPerson.region\" id=\"editRegion\" class=\"form-control input-md\" placeholder=\"Region\" type=\"text\" />\n              </div>\n              <div class=\"col-lg-12\">\n                  <label for=\"editPostalCode\" class=\"control-label hideOnPhone\">Postal Code</label>\n                  <input value.bind=\"people.selectedPerson.postalCode\" id=\"editPostalCode\" class=\"form-control input-md\" placeholder=\"Postal Code\" type=\"text\" />\n              </div>\n              <div class=\"col-lg-12\">\n                  <label for=\"editCountry\" class=\"control-label hideOnPhone\">Country</label>\n                  <input value.bind=\"people.selectedPerson.country\" id=\"editCountry\" class=\"form-control input-md\" placeholder=\"Country\" type=\"text\" />\n              </div>\n          </div>\n            <div class=\"row topMargin\">\n              <div class=\"col-lg-5\">\n               <label for=\"editSpecialization\" class=\"control-label\">Specialization</label>\n               <select value.bind=\"people.selectedPerson.personSpecialization\" id=\"editSpecialization\" class=\"form-control input-md\" placeholder=\"Specializatin\">\n                   <option value=\"\">Select an option</option>\n                   <option repeat.for=\"name of is4ua.specialArray\" value=\"${name.code}\">${name.description}</option>\n               </select>\n              </div>\n              <div class=\"col-lg-5 col-lg-offset-1\">\n               <label for=\"editDepartment\" class=\"control-label\">Department</label>\n               <select value.bind=\"people.selectedPerson.departmentCategory\" id=\"editDepartment\" class=\"form-control input-md\" placeholder=\"Department\">\n                   <option value=\"\">Select an option</option>\n                   <option repeat.for=\"name of is4ua.deptArray\" value=\"${name.code}\">${name.description}</option>\n               </select>\n              </div>\n            </div>\n          </div>\n        </form>\n     </div>\n   </div>\n </div>\n</div>\n</template>\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ })

}]);
//# sourceMappingURL=app-d00c00ed.2384d3fce1a12a237460.bundle.js.map