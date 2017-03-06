import {inject} from 'aurelia-framework';
import AppRouterConfig from './config/routerConfig';
// import {DataServices} from './resources/data/dataServices';

@inject( AppRouterConfig )
export class App {
  
  constructor( appRouterConfig ){
         this.appRouterConfig = appRouterConfig;
        //  this.data = data;
    }
    
  activate(){
      this.appRouterConfig.configure();
  }
  
}