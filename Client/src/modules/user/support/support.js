import { inject } from 'aurelia-framework';
import { Router } from "aurelia-router";
import {AppConfig} from '../../../config/appConfig'; 

@inject(Router, AppConfig)
export class Support {
    title="Support";

    constructor(router, config) {
        this.router = router;
        this.config = config;
        
        this.userObj = JSON.parse(sessionStorage.getItem('user'));
    }

    attached(){
        $(".nav a").on("click", function(){
            $(".nav").find(".active").removeClass("active");
            $(this).parent().addClass("active");
        });
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
                route: 'downloads',
                moduleId: './downloads',
                settings: { auth: true, roles: [] },
                nav: true,
                name: 'downloads',
                title: 'Downloads'
            },
            {
                route: 'curriculum',
                moduleId: './curriculum',
               settings: { auth: true, roles: [] },
                nav: true,
                name: 'curriculum',
                title: 'Curriculum'
            },
             {
                route: 'links',
                moduleId: './links',
                settings: { auth: true, roles: [] },
                nav: true,
                name: 'links',
                title: 'Useful Information'
            }
        ]);

        this.router = router;
    }
}