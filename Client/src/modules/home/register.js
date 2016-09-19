import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";

import {DialogService} from 'aurelia-dialog';

import {Utils} from '../../resources/utils/utils';
import {People} from '../../resources/data/people';
import Validation from '../../resources/utils/validation';
import {AppConfig} from '../../config/appConfig';
import {SuccessDialog} from '../../resources/elements/success-dialog';
import $ from 'jquery';

@inject(Router, People, Validation, Utils, AppConfig, DialogService)
export class Register {

  constructor(router, people, validation, utils, config, dialog) {
    this.router = router;
    this.people = people;
    this.utils = utils;
    this.validation = validation;
    this.config = config;
    this.dialog = dialog;
  };

  attached(){
      $('[data-toggle="tooltip"]').tooltip();
  }

  async activate(){
    this.getData();
  }


  async getData() {
    await this.people.getInstitutionsArray(true, '?order=name&fields=_id name');
    await this.people.selectPerson();
    this._setUpValidation();
  }

  async checkEmail(){
    if(await this.people.checkEmail()){
        // this.utils.showNote("An account with that email already exists");
        this.utils.showNotification("An account with that email already exists", "","","","",6);
        this.duplicateAccount = true;
    } else {
    this.duplicateAccount = false;
    }
  }

  _setUpValidation(){
    this.validation.addRule(1,"register_firstName",{"rule":"required","message":"First Name is required", "value": "people.selectedPerson.firstName"});
    this.validation.addRule(1,"register_lastName",{"rule":"required","message":"Last Name is required", "value": "people.selectedPerson.lastName"});
    this.validation.addRule(1,"register_email",{"rule":"required","message":"Email is required", "value": "people.selectedPerson.email"});
    this.validation.addRule(1,"register_email",{"rule":"required","message":"An account with that email exists",
      "valFunction":function(context){
        return !context.duplicateAccount;
      }});
    this.validation.addRule(1,"register_institution",{"rule":"required","message":"Institution is required", "value": "people.selectedPerson.institutionId"});
    this.validation.addRule(1,"register_password",{"rule":"required","message":"Password is required", "value": "people.selectedPerson.password"});
    this.validation.addRule(1,"register_password_repeat",{"rule":"required","message":"Passwords must match",
      "valFunction":function(context){
        return (context.people.selectedPerson.password === context.password_repeat);
      }});
  }

  async save() {
    if(this.validation.validate(1,this)) {
        console.log(this.people.selectedPerson)
        this.people.selectedPerson.personStatus = this.config.INACTIVE_PERSON;
        this.people.selectedPerson.roles.push('PROV');
        let response = await this.people.savePerson('register')
            if(!response.status) {
                var cmd = {
                    header : "Account Created",
                    message : "Your account has been created.  Your faculty coordinator must activate the account before you can log on to the UCCSS.",
                    cancelButton : false,
                    okButton : true
                };

                this.dialog.open({ viewModel: SuccessDialog, model: cmd}).then(response => {
                    if (!response.wasCancelled) {
                        console.log('good - ', response.output);
                    } else {
                        console.log('bad');
                    }
                    console.log(response.output);
                    this.router.navigate("home");
                });
            } else {
                this.utils.showNotification("An error occurred creating the account", "","","","",6);
            }
    }
  };


  cancel(){
    this.user = this.original;
    this.router.navigate("login");
  }

  back(){
    window.history.back()
  }

  activate() {
    return this.getData();
  }
}
