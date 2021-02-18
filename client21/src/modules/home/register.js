import { inject } from 'aurelia-framework';
import { Router } from "aurelia-router";
import { Utils } from '../../resources/utils/utils';
import { People } from '../../resources/data/people';
import { is4ua } from '../../resources/data/is4ua';
import { AppConfig } from '../../appConfig';

@inject(Router, People, is4ua, Utils, AppConfig)
export class Register {
  title = "Create a new Account"

  constructor(router, people, is4ua, utils, config) {
    this.router = router;
    this.people = people;
    this.is4ua = is4ua;
    this.utils = utils;
    this.config = config;

    this.thresholdLength = 6;
    this.threshold = 3;
  };

  attached() {
    $('[data-toggle="tooltip"]').tooltip();
  }

  async activate() {
    await this.people.getInstitutionArray('?filter=institutionStatus|eq|01&order=name&fields=_id name');
    await this.is4ua.loadIs4ua();
    this.people.selectPerson();
    this. refreshSelects();
  }

  refreshSelects() {
    this.utils.refreshSelect("#register_institution", this.people.institutionsArray, "_id", this.people.selectedPerson.institutionId);
}

  async checkEmail() {
    if (await this.people.checkEmail()) {
      this.duplicateAccount = true;
    } else {
      this.duplicateAccount = false;
    }
  }

  async checkName() {
    if (await this.people.checkName()) {
      this.duplicateName = true;
    } else {
      this.duplicateName = false;
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
  }

  // _setUpValidation(){
  //   this.validation.addRule(1,"register_firstName",[{"rule":"required","message":"First Name is required", "value": "people.selectedPerson.firstName"}]);
  //   this.validation.addRule(1,"register_lastName",[{"rule":"required","message":"Last Name is required", "value": "people.selectedPerson.lastName"}]);
  //   this.validation.addRule(1,"register_email",[
  //     {"rule":"required","message":"Email is required", "value": "people.selectedPerson.email"},
  //     {"rule":"custom","message":"An account with that email exists",
  //     "valFunction":function(context){
  //       return !context.duplicateAccount;
  //     }},
  //     {"rule":"custom","message":"Enter a valid email address",
  //     "valFunction":function(context){
  //       return (context.people.selectedPerson.email.indexOf('@') > -1);
  //     }
  //     }]);
  //   this.validation.addRule(1,"register_phone",[{"rule":"required","message":"Phone number is required", "value": "people.selectedPerson.phone"},
  //   {"rule":"length","message":"Phone number isn't valid", "value": "people.selectedPerson.phone","ruleValue": 10}]);
  //    this.validation.addRule(1,"register_mobile",[{"rule":"length","message":"Phone number isn't valid", "value": "people.selectedPerson.mobile","ruleValue": 10}]);
  //   this.validation.addRule(1,"register_institution",[
  //     {"rule":"required","message":"Institution is required", "value": "people.selectedPerson.institutionId"},
  //     {"rule":"custom","message":"An account with that name at this institution exists",
  //     "valFunction":function(context){
  //       return !context.duplicateName;
  //     }}]
  //     );
  //   this.validation.addRule(1,"register_password",[{"rule":"required","message":"Password is required", "value": "people.selectedPerson.password"}]);
  //   this.validation.addRule(1,"register_password_repeat",[{"rule":"custom","message":"Passwords must match",
  //     "valFunction":function(context){
  //       return (context.people.selectedPerson.password === context.password_repeat);
  //     }}], true);
  //   this.validation.addRule(2,"register_email",[{"rule":"custom","message":"An account with that email exists",
  //     "valFunction":function(context){
  //       return !context.duplicateAccount;
  //     }}]);
  //   this.validation.addRule(3,"register_institution",[{"rule":"custom","message":"An account with that name at this institution exists",
  //     "valFunction":function(context){
  //       return !context.duplicateName;
  //     }}]);
  //   this.validation.addRule(4,"register_password",[{"rule":"custom","message": "Password should be at least " + this.thresholdLength + " characters long and should contain "  + (this.threshold < 4 ? "at least " + this.threshold + " of the following groups:" : "a combination of") + " of the following groups: a combination of lowercase letters, uppercase letters, digits or special characters",
  //     "valFunction":function(context){
  //       return context.complexPassword;
  //     }}]);
  // }

  async save() {
    this.people.selectedPerson.personStatus = this.config.INACTIVE_PERSON;
    let response = await this.people.savePerson('register')
    if (!response.error) {
      // this.sendFacDevEmail();
      // return this.dialog.showMessage(
      //   "Your account has been created.  Your faculty coordinator must activate the account before you can log on to the UCCSS.",
      //   "Account Created",
      //   ['OK']
      // ).whenClosed(response => {
      //   this.router.navigate("home");
      // });
    } else {
      this.utils.showNotification("An error occurred creating the account", 'error');
    }
  };

  sendFacDevEmail() {
    var email = new Object();
    this.people.selectInstitutionByID(this.people.selectedPerson.institutionId);
    email.email = this.people.selectedPerson.email;
    email.institutionId = this.people.selectedPerson.institutionId;
    email.institution = this.people.selectedInstitution.name;

    email.USER_MESSAGE = this.config.WELCOME_MESSAGE
      .replace("[[Name]]", this.people.selectedPerson.firstName + " " + this.people.selectedPerson.lastName);
    email.USER_SUBJECT = this.config.USER_NEW_CUSTOMER_SUBJECT;
    email.FACDEV_MESSAGE = this.config.FACDEV_NEW_CUSTOMER_MESSAGE
      .replace("[[Name]]", this.people.selectedPerson.firstName + " " + this.people.selectedPerson.lastName)
      .replace("[[Institution]]", this.people.selectedInstitution.name);
    email.FACDEV_SUBJECT = this.config.FACDEV_NEW_CUSTOMER_SUBJECT;
    email.Name = this.people.selectedPerson.firstName + " " + this.people.selectedPerson.lastName;
    email.cc = this.config.HELP_TICKET_EMAIL_LIST ? this.config.HELP_TICKET_EMAIL_LIST : "";

    this.people.sendNewRegisterEmail(email);
  }

  back() {
    window.history.back()
  }

}
