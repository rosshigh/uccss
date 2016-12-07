import {bindable} from 'aurelia-framework';
import {inject} from 'aurelia-framework';
// import {Utils} from '../utils/utils';
import {AppConfig} from '../../config/appConfig'; 

@inject( AppConfig)
export class EditClient{
    
  assignmentArray = [];

  @bindable
  clientObj;

  @bindable
  sid;

  @bindable
  showForm;

  @bindable
  showeditclient;

  @bindable
  showSessionSelect; 

  @bindable
  sessionArray;
  
   @bindable
   action1=()=>{};
   
   @bindable
   action2=()=>{};

   constructor(config){
     this.config = config;
   }
  
  save(){
    this.action2();  
  }
  
  async deleteClient(){
    this.action1();   
  }

  back(){
    this.showForm = false;
  }


}
