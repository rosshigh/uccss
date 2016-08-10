import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";
import {AppState} from '../../resources/data/appState';

@inject(Router, AppState)
export class Analytics{
    
    constructor(router, app){
        this.router = router;
        this.app = app;
    }
    
    canActivate(){
        if(!this.app.user._id) this.router.navigate('logout');    
    }
    
    configureRouter(config, router) {
        config.map([
        {
            route: ['', 'clientRequestsAnalytics'],
            moduleId: './clientRequests',
            auth: true,
            nav: true,
            name: 'clientRequests',
            title: 'Client Requests'
        },
        {
            route: 'helpTicketAnalytics',
            moduleId: './helpTickets',
            auth: true,
            nav: true,
            name: 'helpTickets',
            title: 'Help TIcktes'
        }
        ]);

        this.router = router;
    }
}