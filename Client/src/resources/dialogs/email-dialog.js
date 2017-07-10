import {DialogController} from 'aurelia-dialog';
import {inject} from 'aurelia-framework';
import {AppConfig} from '../../config/appConfig'

@inject(DialogController, AppConfig)
export class EmailDialog{
	constructor(dialogController, config) {
		this.dialogController = dialogController;
		this.config = config;
	}
  
	activate(model) {
		this.model = model;
	}
  
	selectOption(option) {
		if(isCancel(option)) {
		this.dialogController.cancel(option);
		} else {
		this.dialogController.ok(this.model);
		}
	}
	}

function isCancel(option) {
  return ['cancel', 'no'].indexOf(option.toLowerCase()) !== -1;
}