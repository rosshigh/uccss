import {inject} from 'aurelia-framework';
import AppRouterConfig from './config/routerConfig';

@inject( AppRouterConfig )
export class App {
  
  constructor( appRouterConfig ){
         this.appRouterConfig = appRouterConfig;
    }
    
  activate(){
      this.appRouterConfig.configure();
  }
  
}