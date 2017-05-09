import {inject} from "aurelia-framework";
import {DialogController} from 'aurelia-dialog';

@inject(DialogController)
export class ConfirmDialog {

    constructor(controller) {
      this.controller = controller;
    }
    
    message ="";
    activate(data) {
        this.message = data.message; 
        this.header = data.header == undefined ? "Confirmation" : data.header;
    }
}
