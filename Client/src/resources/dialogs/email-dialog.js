import {DialogController} from 'aurelia-dialog';
import {inject} from 'aurelia-framework';
import {AppConfig} from '../../config/appConfig'

@inject(DialogController, AppConfig)
export class EmailDialog{
	editorid;

	constructor(dialogController, config) {
		this.dialogController = dialogController;
		this.config = config;
	}
  
	activate(model) {
		this.model = model;
	}

	selectProduct(product, index){
		$("#" +  this.editorid).summernote('editor.restoreRange');
		$("#" +  this.editorid).summernote('editor.focus');
		$("#" +  this.editorid).summernote('editor.insertText', product.productId.name);
		if(!this.model.email.productsSelected) this.model.email.productsSelected = new Array()
		product.index = index;
		this.model.email.productsSelected.push(product);
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