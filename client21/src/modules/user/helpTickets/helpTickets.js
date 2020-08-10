import { inject } from 'aurelia-framework';
import { Router } from "aurelia-router";

@inject(Router)
export class UserHelpTickets {

    constructor(router) {
        this.router = router;
        this.pageTitle = 'Help Tickets';
    }

    configureRouter(config, router) {
        config.map([
            {
                route: ['', 'viewHelpTickets'],
                moduleId: PLATFORM.moduleName('./viewHelpTickets'),
                settings: { auth: true, roles: [] },
                nav: true,
                name: 'viewHelpTickets',
                title: "View Help Tickets"
            },
            {
                route: 'createHelpTicket',
                moduleId: PLATFORM.moduleName('./createHelpTicket'),
                settings: { auth: true, roles: [] },
                nav: true,
                name: 'createHelpTicket',
                title: 'Create Help Ticket'
            }
        ]);

        this.router = router;
    }
}