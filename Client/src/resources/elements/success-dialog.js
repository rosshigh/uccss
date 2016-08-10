import {DialogController} from 'aurelia-dialog';

export class SuccessDialog {
    static inject = [DialogController];
    
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