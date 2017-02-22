import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";

@inject(Router)
export class Support{
    
    // tabs = [{id: 'viewHelpTicket', title: 'View Help Ticket'},{id: 'createHelpTicket', title: 'Create Help Ticket'}];
    // tabPath = "./";
    
    constructor(router){
        this.router = router;
    }

    canActivate(){
        this.userObj = JSON.parse(sessionStorage.getItem('user'));
    }

    attached(){
        $(".nav a").on("click", function(){
            $(".nav").find(".active").removeClass("active");
            $(this).parent().addClass("active");
        });
    }

    getClass(first){
        return first ? 'active' : '';
    }
    
    configureRouter(config, router) {
        config.map([
        {
            route: ['', 'viewHelpTickets'],
            moduleId: './viewHelpTickets',
            settings: { auth: true, roles: [] },
            nav: true,
            name: 'viewHelpTickets',
            title: 'View Help Tickets'
        },
        {
            route: 'createHelpTickets',
            moduleId: './createHelpTickets',
            settings: { auth: true, roles: [] },
            nav: true,
            name: 'createHelpTickets',
            title: 'Create Help Tickets'
        },
        {
            route: 'archiveHelpTickets',
            moduleId: './archiveHelpTickets',
            settings: { auth: true, roles: [] },
            nav: true,
            name: 'archiveHelpTickets',
            title: 'Help Tickets Archive'
        }
        ]);

        this.router = router;
    }
}