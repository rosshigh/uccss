import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";
import {AppState} from '../../../resources/data/appState';

@inject(Router, AppState)
export class Support{
    
    tabs = [{id: 'viewHelpTicket', title: 'View Help Ticket'},{id: 'createHelpTicket', title: 'Create Help Ticket'}];
    tabPath = "./";
    
    constructor(router, app){
        this.router = router;
        this.app = app;
    }
    
    canActivate(){
        if(!this.app.user._id) this.router.navigate('logout');    
    }
    //HERE
    
    configureRouter(config, router) {
        config.map([
        {
            route: ['', 'viewHelpTickets'],
            moduleId: './viewHelpTickets',
            auth: true,
            nav: true,
            name: 'viewHelpTickets',
            title: 'View Help Tickets'
        },
        {
            route: 'createHelpTickets',
            moduleId: './createHelpTickets',
            auth: true,
            nav: true,
            name: 'createHelpTickets',
            title: 'Create Help Tickets'
        },
        {
            route: 'archiveHelpTickets',
            moduleId: './archiveHelpTickets',
            auth: true,
            nav: true,
            name: 'archiveHelpTickets',
            title: 'Help Tickets Archive'
        }
        ]);

        this.router = router;
    }
}