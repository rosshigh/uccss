import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";

@inject(Router)
export class ClientRequests{
    
    constructor(router){
        this.router = router;
    }

    configureRouter(config, router) {
        config.map([
        {
            route: ['', 'viewRequests'],
            moduleId: './viewRequests',
            settings: { auth: true, roles: [] },
            nav: true,
            name: 'viewRequests',
            title: 'View Requests'
        },
        {
            route: 'createRequests',
            moduleId: './createRequests',
             settings: { auth: true, roles: [] },
            nav: true,
            name: 'createRequests',
            title: 'Create Request'
        }
        ]);

        this.router = router;
    }
}
