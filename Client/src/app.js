import {inject} from 'aurelia-framework';
import AppRouterConfig from './config/routerConfig';
import $ from 'bootstrap'
import 'bootstrap';

@inject(AppRouterConfig)
export class App {
  constructor(appRouterConfig, data) {
    this.appRouterConfig = appRouterConfig;
    this.data = data;
    this.message = 'Hello World!';
  }

  activate(){
     this.appRouterConfig.configure();
     $.fn.selectpicker.Constructor.BootstrapVersion = '3';

  }
}
