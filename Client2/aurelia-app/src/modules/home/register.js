import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";
import {Utils} from '../../resources/utils/utils';
import {People} from '../../resources/data/people';
import {CommonDialogs} from '../../resources/dialogs/common-dialogs';
import Validation from '../../resources/utils/validation';
import {AppConfig} from '../../config/appConfig';
import $ from 'jquery';

@inject(Router, People,  Utils, AppConfig, CommonDialogs, Validation)
export class Register {

  constructor(router, people,  utils, config, dialog, validation) {
    this.router = router;
    this.people = people;
    this.utils = utils;
    this.validation = validation;
    this.config = config;
    this.dialog = dialog;
    this.validation.initialize(this);
  };

  attached(){
    this._setUpValidation();
    $('[data-toggle="tooltip"]').tooltip();
  }

  async activate(){
    await this.people.getInstitutionsArray(true, '?order=name&fields=_id name');
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

  _setUpValidation(){
    this.validation.addRule(1,"register_firstName",{"rule":"required","message":"First Name is required", "value": "people.selectedPerson.firstName"});
    this.validation.addRule(1,"register_lastName",{"rule":"required","message":"Last Name is required", "value": "people.selectedPerson.lastName"});
    this.validation.addRule(1,"register_email",{"rule":"custom","message":"An account with that email exists",
      "valFunction":function(context){
        return !context.duplicateAccount;
      }});
    this.validation.addRule(1,"register_email",{"rule":"required","message":"Email is required", "value": "people.selectedPerson.email"});
    this.validation.addRule(1,"register_institution",{"rule":"required","message":"Institution is required", "value": "people.selectedPerson.institutionId"});
    this.validation.addRule(1,"register_password",{"rule":"required","message":"Password is required", "value": "people.selectedPerson.password"});
    this.validation.addRule(1,"register_password_repeat",{"rule":"custom","message":"Passwords must match",
      "valFunction":function(context){
        return (context.people.selectedPerson.password === context.password_repeat);
      }});
    this.validation.addRule(2,"register_email",{"rule":"custom","message":"An account with that email exists",
      "valFunction":function(context){
        return !context.duplicateAccount;
      }});
  }

  async save() {
    if(this.validation.validate(1)) {
        console.log(this.people.selectedPerson)
        this.people.selectedPerson.personStatus = this.config.INACTIVE_PERSON;
        this.people.selectedPerson.roles.push('PROV');
        let response = await this.people.savePerson('register')
            if(!response.error) {
              return this.dialog.showMessage(
                  "Your account has been created.  Your faculty coordinator must activate the account before you can log on to the UCCSS.", 
                  "Account Created", 
                  ['OK']
                  ).then(response => {
                      this.router.navigate("home");
                  });              
            } else {
                this.utils.showNotification("An error occurred creating the account");
            }
    }
  };


  cancel(){
    this.router.navigate("login");
  }

  back(){
    window.history.back()
  }

}
