import {inject} from 'aurelia-framework';
import {DialogController} from 'aurelia-dialog';

@inject(DialogController)
export class SuccessDialog {
    
    constructor(controller){
        this.controller = controller;
    }
    
     ok(){
      alert("OK");
    }
    
    activate(cmd){
        console.log(cmd);
        this.cmd = cmd;
    }
}