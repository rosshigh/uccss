
 import {inject, PLATFORM} from 'aurelia-framework';
 import {DataServices} from './resources/data/dataServices';

 @inject(DataServices)
export class App {

  constructor(data){
    this.data = data;
  }

  configureRouter(config, router) {
    config.title = 'UCCSS';
    config.options.pushState = true;
    config.options.root = '/';
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
      // {
      //   route: 'editPerson/:id',
      //   moduleId: PLATFORM.moduleName('./modules/admin/Customers/editPerson'),
      //   name: 'editPerson',
      //   settings: { auth: false, roles: [] }
      // },
      // {
      //   route: 'systems',
      //   moduleId: PLATFORM.moduleName('./modules/admin/systems/systems'),
      //   name: 'systems',
      //   settings: { auth: false, roles: [] }
      // },
      // {
      //   route: 'documents',
      //   moduleId: PLATFORM.moduleName('./modules/admin/documents/documents'),
      //   name: 'documents',
      //   settings: { auth: false, roles: [] }
      // },
      // {
      //   route: 'site',
      //   moduleId: PLATFORM.moduleName('./modules/admin/site/site'),
      //   name: 'site',
      //   settings: { auth: false, roles: [] }
      // },
      // {
      //   route: 'downloads/:id',
      //   moduleId: PLATFORM.moduleName('./modules/user/resources/downloads'),
      //   name: 'downloads',
      //   settings: { auth: false, roles: [] }
      // },
      // {
      //   route: 'helpTickets',
      //   moduleId: PLATFORM.moduleName('./modules/user/helpTickets/helpTickets'),
      //   name: 'helpTickets',
      //   settings: { auth: false, roles: [] }
      // },
      // {
      //   route: 'faq',
      //   moduleId: PLATFORM.moduleName('./modules/user/faq'),
      //   name: 'faq',
      //   settings: { auth: false, roles: [] }
      // },
      // {
      //   route: 'helpTicketsTech',
      //   moduleId: PLATFORM.moduleName('./modules/tech/helpTickets/helpTickets'),
      //   name: 'helpTicketsTech',
      //   settings: { auth: false, roles: [] }
      // },
      // {
      //   route: 'productRequests',
      //   moduleId: PLATFORM.moduleName('./modules/user/requests/productRequests'),
      //   name: 'productRequests',
      //   settings: { auth: false, roles: [] }
      // },
      // {
      //   route: 'techProductRequests',
      //   moduleId: PLATFORM.moduleName('./modules/tech/requests/productRequests'),
      //   name: 'productRequests',
      //   settings: { auth: false, roles: [] }
      // },
      // {
      //   route: 'profile',
      //   moduleId: PLATFORM.moduleName('./modules/user/profile'),
      //   name: 'profile',
      //   settings: { auth: false, roles: [] }
      // },
      // {
      //   route: 'facCoord',
      //   moduleId: PLATFORM.moduleName('./modules/user/facCoord'),
      //   name: 'facCoord',
      //   settings: { auth: false, roles: [] }
      // }
    ]);
    this.router = router;
  }
}
