import {inject} from 'aurelia-framework';
import AppRouterConfig from './config/routerConfig';
import {DataServices} from './resources/data/dataServices';

@inject(AppRouterConfig, DataServices)
export class App {
  constructor(appRouterConfig, data) {
    this.appRouterConfig = appRouterConfig;
    this.data = data;
    this.message = 'Hello World!';
  }

  activate(){
     this.appRouterConfig.configure();
  }
}
