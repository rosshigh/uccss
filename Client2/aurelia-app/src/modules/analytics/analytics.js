import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";

@inject(Router)
export class Analytics{
    
    constructor(router){
        this.router = router;
    }
    
    configureRouter(config, router) {
        config.map([
        {
            route: ['', 'clientRequestsAnalytics'],
            moduleId: './clientRequests',
            settings: { auth: true, roles: [] },
            nav: true,
            name: 'clientRequests',
            title: 'Client Requests'
        },
        {
            route: 'helpTicketAnalytics',
            moduleId: './helpTickets',
            settings: { auth: true, roles: [] },
            nav: true,
            name: 'helpTickets',
            title: 'Help Tickets'
        }
        ]);

        this.router = router;
    }
}