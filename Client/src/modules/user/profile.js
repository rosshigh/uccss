import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";

import {DialogService} from 'aurelia-dialog';

import Validation from '../../resources/utils/validation';
import {Utils} from '../../resources/utils/utils';
import {is4ua} from '../../resources/data/is4ua';
import {People} from '../../resources/data/people';
import {AppState} from '../../resources/data/appState';

import {SuccessDialog} from '../../resources/elements/success-dialog';
import moment from 'moment';
import $ from 'jquery';

@inject(is4ua,People, Router, Utils, AppState, DialogService, Validation)
export class Profile {

    constructor(is4ua, people, router, utils, app, dialog, validation) {
        this.is4ua = is4ua;
        this.people = people;
        this.router = router;
        this.utils = utils;
        this.app = app;
        this.dialog = dialog;
        this.validation = validation;

        this.validation.addRule(1,"editFirstName",{"rule":"required","message":"First Name is required", "value": "people.selectedPerson.firstName"});
        this.validation.addRule(1,"editLastName",{"rule":"required","message":"Last Name is required", "value": "people.selectedPerson.lastName"});
        // this.validation.addRule(1,"editEmail",{"rule":"required","message":"Email is required", "value": "people.selectedPerson.email"});
        this.validation.addRule(1,"editInstitution",{"rule":"required","message":"Institution is required", "value": "people.selectedPerson.institutionId"});
        // this.validation.addRule(1,"register_password",{"rule":"required","message":"Password is required", "value": "people.selectedPerson.password"});
        // this.validation.addRule(1,"register_password_repeat",{"rule":"required","message":"Passwords must match",
        //     "valFunction":function(context){
        //         return (context.people.selectedPerson.password === context.password_repeat);
        //     }});
    };

    attached(){
        $('[data-toggle="tooltip"]').tooltip();
    }

    canActivate(){
        //If the user object doesn't exist, logout
        if(!this.app.user._id) this.router.navigate('logout')
    }

    activate() {
        this.getData();
    }

  async getData() {
    let responses = await Promise.all([
      this.people.getPerson(this.app.user._id),
      this.people.getInstitutionsArray(true, '?fields=_id name&order=name'),
      this.is4ua.loadIs4ua()
    ]);
    this.user = this.people.selectedPerson;
  }

  async save() {
    if(this.validation.validate(1,this)) {
        if(this.people.selectedPerson.roles.indexOf("PROV") > -1){
             this.people.selectedPerson.roles.splice(this.people.selectedPerson.roles.indexOf("PROV"), 1);
        }
        let response = await this.people.savePerson()
        if(!response.error){
                var cmd = {
                    header : "Account Updated",
                    message : "Your profile has been updated.",
                    cancelButton : false,
                    okButton : true
                };

                this.dialog.open({ viewModel: SuccessDialog, model: cmd}).then(response => {
                this.router.navigate("user");
                });
        } else {
            this.utils.showNotification("An error occurred updating your profile");
        }
    }
  };

  cancel(){
      this.utils.copyObject(this.users, this.people.selectedPerson);
  }

}