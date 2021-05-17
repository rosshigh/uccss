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

  validateUser() {
    this.userObj = this.store.getUser('user');
    this.isAuthenticated = this.userObj;
  }

  subscribe() {
    this.subscriber = this.eventAggregator.subscribe('auth:login', payload => {
      this.isAuthenticated = payload == 'login';
    });
  }

  logout() {
    this.auth.logout();
    this.isAuthenticated = this.auth.isAuthenticated();
    this.router.navigate("home");
}

  toggleTheSideBar() {
    $('#sidebar').slideToggle();
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
      },
      {
        route: 'documents',
        moduleId: PLATFORM.moduleName('./modules/admin/documents/documents'),
        name: 'documents',
        settings: { auth: false, roles: [] }
      },
      {
        route: 'site',
        moduleId: PLATFORM.moduleName('./modules/admin/site/site'),
        name: 'site',
        settings: { auth: false, roles: [] }
      },
      {
        route: 'downloads/:id',
        moduleId: PLATFORM.moduleName('./modules/user/resources/downloads'),
        name: 'downloads',
        settings: { auth: false, roles: [] }
      },
      {
        route: 'helpTickets',
        moduleId: PLATFORM.moduleName('./modules/user/helpTickets/helpTickets'),
        name: 'helpTickets',
        settings: { auth: false, roles: [] }
      },
      {
        route: 'faq',
        moduleId: PLATFORM.moduleName('./modules/user/faq'),
        name: 'faq',
        settings: { auth: false, roles: [] }
      },
      {
        route: 'helpTicketsTech/:HTNumber',
        moduleId: PLATFORM.moduleName('./modules/tech/helpTickets/helpTickets'),
        name: 'helpTicketsTech',
        settings: { auth: false, roles: [] }
      },
      {
        route: 'helpTicketsTechMenu',
        moduleId: PLATFORM.moduleName('./modules/tech/helpTickets/helpTickets'),
        name: 'helpTicketsTechMenu',
        settings: { auth: false, roles: [] }
      },
      {
        route: 'productRequests',
        moduleId: PLATFORM.moduleName('./modules/user/requests/productRequests'),
        name: 'productRequests',
        settings: { auth: false, roles: [] }
      },
      {
        route: 'apj',
        moduleId: PLATFORM.moduleName('./modules/tech/apj/apj'),
        name: 'apj',
        settings: { auth: false, roles: [] }
      },
      {
        route: 'techProductRequests',
        moduleId: PLATFORM.moduleName('./modules/tech/requests/productRequests'),
        name: 'productRequests',
        settings: { auth: false, roles: [] }
      },
      {
        route: 'profile',
        moduleId: PLATFORM.moduleName('./modules/user/profile'),
        name: 'profile',
        settings: { auth: false, roles: [] }
      },
      {
        route: 'facCoord',
        moduleId: PLATFORM.moduleName('./modules/user/facCoord'),
        name: 'facCoord',
        settings: { auth: false, roles: [] }
      },
      {
        route: 'about',
        moduleId: PLATFORM.moduleName('./modules/home/about'),
        name: 'about',
        settings: { auth: false, roles: [] }
      },
      {
        route: 'inventory',
        moduleId: PLATFORM.moduleName('./modules/admin/inventory/inventory'),
        name: 'inventory',
        settings: { auth: false, roles: [] }
      },
      {
        route: 'viewRequests',
        moduleId: PLATFORM.moduleName('./modules/user/requests/viewRequests'),
        settings: { auth: true, roles: [] },
        nav: true,
        name: 'viewRequests',
        title: "View Requests"
    },
    {
        route: 'createRequest',
        moduleId: PLATFORM.moduleName('./modules/user/requests/createRequest'),
        settings: { auth: true, roles: [] },
        nav: true,
        name: 'createRequest',
        title: 'Create/Modify Request'
    }
    ]);
  }

}