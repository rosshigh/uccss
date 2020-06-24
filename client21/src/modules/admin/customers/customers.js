import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";

@inject(Router)
export class Customers {

    constructor(router){
        this.router = router;
        this.pageTitle = 'Customers';
    }

    // attached(){
    //     this.userObj = JSON.parse(this.store.user);
    //  }

    configureRouter(config, router) {
        config.map([
        {
            route: ['', 'editPeople'],
            moduleId: PLATFORM.moduleName('./editPeople'),
            settings: { auth: true, roles: [] },
            nav: true,
            name: 'editPeople',
            title: "People"
        },
        {
            route: 'editInstitutions',
            moduleId: PLATFORM.moduleName('./editInstitutions'),
            settings: { auth: true, roles: [] },
            nav: true,
            name: 'editInstitutions',
            title: 'Institutions'
        },
        {
            route: 'bulkEmails',
            moduleId: PLATFORM.moduleName('./bulkEmails'),
            settings: { auth: true, roles: [] },
            nav: true,
            name: 'bulkEmails',
            title: 'Bulk Emails'
        }
        ]);

        this.router = router;
    }
}