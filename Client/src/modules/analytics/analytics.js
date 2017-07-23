import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";
import {AppConfig} from '../../config/appConfig'; 

@inject(Router, AppConfig)
export class Analytics{
    title="Analytics";
    
    constructor(router, config){
        this.router = router;
        this.config = config;
    }

    attached(){
        $(".nav a").on("click", function(){
            $(".nav").find(".active").removeClass("active");
            $(this).parent().addClass("active");
        });
    }    

    activate(){
         this.config.getConfig(true);
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
        },
        {
            route: 'institutions',
            moduleId: './institutions',
            settings: { auth: true, roles: [] },
            nav: true,
            name: 'institutions',
            title: 'Institutions'
        }
        ]);

        this.router = router;
    }
}