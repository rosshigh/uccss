import { Aurelia } from 'aurelia-framework';
import { Router } from "aurelia-router";

export class Joe {

    constructor(){

    }
    
    configureRouter(config, router) {
        this.router = router;
        config.title = 'UCCSS';
        config.map([
            {
                route: ['', 'home'],
                moduleId: PLATFORM.moduleName('./home'),
                name: 'Home',
                settings: { auth: false, roles: [] }
            },
            {
                route: 'register',
                moduleId: PLATFORM.moduleName('./modules/home/register'),
                name: 'register',
                settings: { auth: false, roles: [] }
            }
        ]);
    }
}  