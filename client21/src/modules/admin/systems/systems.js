import { inject } from 'aurelia-framework';
import {Router} from "aurelia-router";

@inject(Router)
export class EditSystem{
    
    constructor(router){
        this.router = router;
    }

    attached(){
     
    }

    configureRouter(config, router) {
        config.map([
        {
            route: ['', 'editSessions'],
            moduleId: PLATFORM.moduleName('./editSessions'),
            settings: { auth: true, roles: [] },
            nav: true,
            name: 'editSessions',
            title: 'Sessions'
        },
        {
            route: 'editSystems',
            moduleId: PLATFORM.moduleName('./editSystems'),
            settings: { auth: true, roles: [] },
            nav: true,
            name: 'editSystems',
            title: 'Systems'
        },
        {
            route: 'editProducts',
            moduleId: PLATFORM.moduleName('./editProducts'),
            settings: { auth: true, roles: [] },
            nav: true,
            name: 'editProduct',
            title: 'Products'
        }
        ]);

        this.router = router;
    }
}