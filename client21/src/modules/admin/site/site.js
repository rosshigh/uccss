import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";

@inject(Router)
export class Site {

    constructor(router){
        this.router = router;
        this.pageTitle = 'Site';
    }

    configureRouter(config, router) {
        config.map([
        {
            route: ['', 'editInfo'],
            moduleId: PLATFORM.moduleName('./editInfo'),
            settings: { auth: true, roles: [] },
            nav: true,
            name: 'editInfo',
            title: "Site Info"
        },
        {
            route: 'editConfig',
            moduleId: PLATFORM.moduleName('./editConfig'),
            settings: { auth: true, roles: [] },
            nav: true,
            name: 'editConfig',
            title: 'Configuration'
        }
        ]);

        this.router = router;
    }
}