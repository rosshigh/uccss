import {inject} from "aurelia-framework";
import {DialogController} from 'aurelia-dialog';
import Validation from '../../resources/utils/validation';
import {AppConfig} from '../../config/appConfig';

@inject(DialogController, Validation, AppConfig)
export class PasswordDialog {
constructor(dialogController, validation, config) {
    this.dialogController = dialogController;
    this.config = config;
    this.validation = validation;
    this.validation.initialize(this);
    this._setupValidation();

    this.thresholdLength = 6;
    this.threshold = 3;  
  }
  
  activate(model) {
    this.model = model;
  }

   passwordComplexity(){
    
        var newValue = this.password;
        
        this.longPassword = newValue.length >=  this.thresholdLength;

        let strength = 0;
        strength += /[A-Z]+/.test(newValue) ? 1 : 0;
        strength += /[a-z]+/.test(newValue) ? 1 : 0;
        strength += /[0-9]+/.test(newValue) ? 1 : 0;
        strength += /[\W]+/.test(newValue) ? 1 : 0;
        
        this.complexPassword = strength >= this.threshold && this.longPassword;
        this.validation.validate(4);
    }


   _setupValidation(){
        this.validation.addRule(1,"register_password",[{"rule":"required","message":"Password is required", "value": "password"}]);
        this.validation.addRule(1,"register_password_repeat",[{"rule":"custom","message":"Passwords must match",
        "valFunction":function(context){
            return (context.password === context.password_repeat);
        }}], true); 
        this.validation.addRule(4,"register_password",[{"rule":"custom","message": "Insufficient Complexity",
            "valFunction":function(context){
            return context.complexPassword;
        }}]);
    }
  
  selectOption(option) {
    if(isCancel(option)) {
      this.dialogController.cancel(option);
    } else {
      if(this.validation.validate(1)) {
        this.model.password = this.password;
        this.model.password_repeat = this.password_repeat;
        this.dialogController.ok(this.model);
      }
    }
  }
}

function isCancel(option) {
  return ['cancel', 'no'].indexOf(option.toLowerCase()) !== -1;
}
