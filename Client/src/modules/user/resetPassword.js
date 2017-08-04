import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";
import Validation from '../../resources/utils/validation';
import {Utils} from '../../resources/utils/utils';
import {People} from '../../resources/data/people';

@inject(People, Router,  Validation, Utils)
export class ResetPassword {

	constructor( people, router, validation, utils) {
		this.people = people;
		this.router = router;
		this.validation = validation;
		this.validation.initialize(this);
		this._setupValidation();
		this.utils = utils;
		this.thresholdLength = 6;
  		this.threshold = 3;
		this.showForm = true;
		this.passwordReset = true;
    };

	async activate(params) {
		if(!params.id) this.router.navigate("home");
		let validationCode = atob(params.id).substring(0,24);
		let response = await this.people.getPasswordReset(validationCode);
		if(response.code === 404){
			this.showForm = false;
		}
	}

	passwordComplexity(){

		var newValue = this.newPassword;

		this.longPassword = newValue.length >=  this.thresholdLength;

		let strength = 0;
		strength += /[A-Z]+/.test(newValue) ? 1 : 0;
		strength += /[a-z]+/.test(newValue) ? 1 : 0;
		strength += /[0-9]+/.test(newValue) ? 1 : 0;
		strength += /[\W]+/.test(newValue) ? 1 : 0;

		this.complexPassword = strength >= this.threshold && this.longPassword;
		this.validation.validate(4);
	}

	async savePassword() {
        if (this.validation.validate(1)) {
            var obj = {
                password: this.newPassword
            }
            let response = await this.people.updatePassword(obj);
            if (!response.error) {
                this.utils.showNotification("The password was updated");
		            this.router.navigate("home");
            }
        }
    }

	_setupValidation(){
		this.validation.addRule(1,"register_password",[{"rule":"required","message":"Password is required", "value": "newPassword"}]);
		this.validation.addRule(1,"register_password_repeat",[{"rule":"custom","message":"Passwords must match",
		"valFunction":function(context){
			return (context.newPassword === context.password_repeat);
		}}], true);
		this.validation.addRule(4,"register_password",[{"rule":"custom","message": "Password should be at least " + this.thresholdLength + " characters long and should contain "  + (this.threshold < 4 ? "at least " + this.threshold + " of the following groups:" : "a combination of") + " of the following groups: a combination of lowercase letters, uppercase letters, digits or special characters",
		"valFunction":function(context){
			return context.complexPassword;
		}}]);
	}

}
