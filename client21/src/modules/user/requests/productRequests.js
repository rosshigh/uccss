import { inject } from 'aurelia-framework';
import { Router } from "aurelia-router";

@inject(Router)
export class UserHelpTickets {

    constructor(router) {
        this.router = router;
        this.pageTitle = 'Product Requests';

        this.systemMessage = sessionStorage.getItem('systemMessage');
    }

    attached(){
        $("#systemMessage").fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500);
    }

    configureRouter(config, router) {
        config.map([
            {
                route: ['', 'viewRequests'],
                moduleId: PLATFORM.moduleName('./viewRequests'),
                settings: { auth: true, roles: [] },
                nav: true,
                name: 'viewRequests',
                title: "View Requests"
            },
            {
                route: 'createReques',
                moduleId: PLATFORM.moduleName('./createRequest'),
                settings: { auth: true, roles: [] },
                nav: true,
                name: 'createRequest',
                title: 'Create/Modify Request'
            }
        ]);

        this.router = router;
    }
}