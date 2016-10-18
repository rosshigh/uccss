import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";
import {AppState} from '../../../resources/data/appState';

@inject(Router, AppState)
export class Support{
    
    // tabs = [
    //     {id: 'viewHelpTicket', title: 'View Help Ticket'},
    //     {id: 'createHelpTicket', title: 'Create Help Ticket'}, 
    //     {id: 'downloads', title: 'Downloads'},
    //     {id: "tutorials",title:'Tutorials'},
    //     {id: "curriculum",title:'Curriculum'},
    //     {id: "links",title:'Useful Information'}];
    // tabPath = "./";
    
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
            route: 'downloads',
            moduleId: './downloads',
            auth: true,
            nav: true,
            name: 'downloads',
            title: 'Downloads'
        },
        {
            route: 'curriculum',
            moduleId: './currInfo',
            auth: true,
            nav: true,
            name: 'curriculum',
            title: 'Curriculum'
        },
         {
            route: 'links',
            moduleId: './usefulInfo',
            auth: true,
            nav: true,
            name: 'links',
            title: 'Useful Information'
        }
        ]);

        this.router = router;
    }
}