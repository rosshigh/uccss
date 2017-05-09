import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";
import {Utils} from '../../resources/utils/utils';
import {People} from '../../resources/data/people';
import {is4ua} from '../../resources/data/is4ua';
import {CommonDialogs} from '../../resources/dialogs/common-dialogs';
import Validation from '../../resources/utils/validation';
import {AppConfig} from '../../config/appConfig';

@inject(Router, People, is4ua, Utils, AppConfig, CommonDialogs, Validation)
export class Register {

  constructor(router, people, is4ua, utils, config, dialog, validation) {
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
  };

  attached(){
    this._setUpValidation();
    $('[data-toggle="tooltip"]').tooltip();
  }

  async activate(){
    await this.people.getInstitutionsArray('?filter=institutionStatus|eq|01&order=name&fields=_id name');
    await this.is4ua.loadIs4ua();
    this.people.selectPerson();
  }

  async checkEmail(){
    if(await this.people.checkEmail()){
      this.duplicateAccount = true;
      this.validation.validate(2);
    } else {
      this.duplicateAccount = false;
      this.validation.makeValid($("#register_email"));
    }
  }

  async checkName(){
    if(await this.people.checkName()){
      this.duplicateName = true;
      this.validation.validate(3);
    } else {
      this.duplicateName = false;
      this.validation.makeValid($("#register_institution"));
    }
  }

  passwordComplexity(){

    var newValue = this.people.selectedPerson.password;

    this.longPassword = newValue.length >=  this.thresholdLength;

    let strength = 0;
    strength += /[A-Z]+/.test(newValue) ? 1 : 0;
    strength += /[a-z]+/.test(newValue) ? 1 : 0;
    strength += /[0-9]+/.test(newValue) ? 1 : 0;
    strength += /[\W]+/.test(newValue) ? 1 : 0;

    this.complexPassword = strength >= this.threshold && this.longPassword;
    this.validation.validate(4);
  }

  _setUpValidation(){
    this.validation.addRule(1,"register_firstName",[{"rule":"required","message":"First Name is required", "value": "people.selectedPerson.firstName"}]);
    this.validation.addRule(1,"register_lastName",[{"rule":"required","message":"Last Name is required", "value": "people.selectedPerson.lastName"}]);
    this.validation.addRule(1,"register_email",[
      {"rule":"required","message":"Email is required", "value": "people.selectedPerson.email"},
      {"rule":"custom","message":"An account with that email exists",
      "valFunction":function(context){
        return !context.duplicateAccount;
      }},
      {"rule":"custom","message":"Enter a valid email address",
      "valFunction":function(context){
        return (context.people.selectedPerson.email.indexOf('@') > -1);
      }
      }]);
    this.validation.addRule(1,"register_phone",[{"rule":"required","message":"Phone number is required", "value": "people.selectedPerson.phone"},
    {"rule":"length","message":"Phone number isn't valid", "value": "people.selectedPerson.phone","ruleValue": 10}]);
     this.validation.addRule(1,"register_mobile",[{"rule":"length","message":"Phone number isn't valid", "value": "people.selectedPerson.mobile","ruleValue": 10}]);
    this.validation.addRule(1,"register_institution",[
      {"rule":"required","message":"Institution is required", "value": "people.selectedPerson.institutionId"},
      {"rule":"custom","message":"An account with that name at this institution exists",
      "valFunction":function(context){
        return !context.duplicateName;
      }}]
      );
    this.validation.addRule(1,"register_password",[{"rule":"required","message":"Password is required", "value": "people.selectedPerson.password"}]);
    this.validation.addRule(1,"register_password_repeat",[{"rule":"custom","message":"Passwords must match",
      "valFunction":function(context){
        return (context.people.selectedPerson.password === context.password_repeat);
      }}], true);
    this.validation.addRule(2,"register_email",[{"rule":"custom","message":"An account with that email exists",
      "valFunction":function(context){
        return !context.duplicateAccount;
      }}]);
    this.validation.addRule(3,"register_institution",[{"rule":"custom","message":"An account with that name at this institution exists",
      "valFunction":function(context){
        return !context.duplicateName;
      }}]);
    this.validation.addRule(4,"register_password",[{"rule":"custom","message": "Password should be at least " + this.thresholdLength + " characters long and should contain "  + (this.threshold < 4 ? "at least " + this.threshold + " of the following groups:" : "a combination of") + " of the following groups: a combination of lowercase letters, uppercase letters, digits or special characters",
      "valFunction":function(context){
        return context.complexPassword;
      }}]);
  }

  async save() {
    if(this.validation.validate(1)) {
        this.people.selectedPerson.personStatus = this.config.INACTIVE_PERSON;
        let response = await this.people.savePerson('register')
            if(!response.error) {
              return this.dialog.showMessage(
                  "Your account has been created.  Your faculty coordinator must activate the account before you can log on to the UCCSS.",
                  "Account Created",
                  ['OK']
                  ).whenClosed(response => {
                    this.sendFacDevEmail();
                  });
            } else {
                this.utils.showNotification("An error occurred creating the account");
            }
    }
  };

  sendFacDevEmail(){
    var email = new Object();
    this.people.selectInstitutionByID(this.people.selectedPerson.institutionId);
    email.email = this.people.selectedPerson.email;
    email.institutionId = this.people.selectedPerson.institutionId;
    email.institution = this.people.selectedInstitution.name;
    email.fullName = this.people.selectedPerson.firstName + " " +  this.people.selectedPerson.lastName;
    email.cc = this.config.HELP_TICKET_EMAIL_LIST ? this.config.HELP_TICKET_EMAIL_LIST : "";

    this.people.sendNewRegisterEmail(email);
    this.router.navigate("home");
  }

  back(){
    window.history.back()
  }

}
