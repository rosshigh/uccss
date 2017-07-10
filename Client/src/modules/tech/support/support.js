import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";
import {AppConfig} from '../../../config/appConfig'; 

@inject(Router, AppConfig)
export class Support{
    title="Tech Staff Help Tickets";
    
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
        /*
        {
            route: 'archiveHelpTickets',
            moduleId: './archiveHelpTickets',
            settings: { auth: true, roles: [] },
            nav: true,
            name: 'archiveHelpTickets',
            title: 'Help Tickets Archive'
        }
        */
        ]);

        this.router = router;
    }
}