import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";

@inject(Router)
export class Customers{
    
    tabs = [{id: 'editPeople', label: 'People'},{id: 'editInstitutions', label: 'Institutions'}];
    tabPath = "modules/admin/customers/";
    
    constructor(router){
        this.router = router;
    }
    
    configureRouter(config, router) {
        config.map([
        {
            route: ['', 'editPeople'],
            moduleId: './editPeople',
            settings: { auth: true, roles: [] },
            nav: true,
            name: 'editPeople',
            title: "People"
        },
        {
            route: 'editInstitutions',
            moduleId: './editInstitutions',
            settings: { auth: true, roles: [] },
            nav: true,
            name: 'editInstitutions',
            title: 'Institutions'
        }
        ]);

        this.router = router;
    }
    
}