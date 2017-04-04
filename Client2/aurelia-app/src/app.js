import {inject} from 'aurelia-framework';
import AppRouterConfig from './config/routerConfig';
import {DataServices} from './resources/data/dataServices';
import {Router} from 'aurelia-router';

@inject( AppRouterConfig, DataServices, Router )
export class App {
  
  constructor( appRouterConfig, data, router ){
         this.appRouterConfig = appRouterConfig;
         this.data = data;
         this.router = router;
    }
    
  activate(){
      this.appRouterConfig.configure();
  }
  
}