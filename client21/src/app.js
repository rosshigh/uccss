import { EventAggregator } from 'aurelia-event-aggregator';
import { Config } from 'resources/data/config';
import { inject } from 'aurelia-dependency-injection';
import { Store } from './store/store';

@inject(Config, EventAggregator, Store)

export class App {
  constructor(config, eventAggregator, store) {
    this.config = config;
    this.eventAggregator = eventAggregator;
    this.store = store;
    this.validateUser();
    this.subscribe();
  }

  validateUser(){
    this.userObj = this.store.getUser('user');
    this.isAuthenticated = this.userObj;
    console.log(this.isAuthenticated);
  }

  subscribe() {
    this.subscriber = this.eventAggregator.subscribe('auth:login', payload => {
       this.isAuthenticated = payload == 'login';
       console.log(this.isAuthenticated);
    });
 }

  configureRouter(config, router) {
    this.router = router;
    config.title = 'UCCSS';
    config.map([
      {
        route: ['', 'user'],
        moduleId: PLATFORM.moduleName('./modules/user/user'),
        name: 'User',
        settings: { auth: false, roles: [] }
      },
      {
        route: 'customers',
        moduleId: PLATFORM.moduleName('./modules/admin/Customers/customers'),
        name: 'customers',
        settings: { auth: false, roles: [] }
      },
      {
        route: 'systems',
        moduleId: PLATFORM.moduleName('./modules/admin/systems/systems'),
        name: 'systems',
        settings: { auth: false, roles: [] }
      }
    ]);
  }

}