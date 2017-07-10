import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";
import {AppConfig} from '../../../config/appConfig'; 

@inject(Router, AppConfig)
export class Site{
    title="Site Information"
    
    constructor(router, config){
        this.router = router;
        this.config = config;
    }

    activate(){
         this.config.getConfig(true);
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
            route: ['', 'editNews'],
            moduleId: './editNews',
            settings: { auth: false, roles: [] },
            nav: true,
            name: 'editNews',
            title: 'Site Information'
        },
        {
            route: 'downloads',
            moduleId: './editDownloads',
            settings: { auth: false, roles: [] },
            nav: true,
            name: 'downloads',
            title: 'Downloads'
        },
        {
            route: 'messages',
            moduleId: './editMessages',
            settings: { auth: false, roles: [] },
            nav: true,
            name: 'messages',
            title: 'Messages'
        },
        {
            route: 'config',
            moduleId: './editConfig',
            settings: { auth: false, roles: [] },
            nav: true,
            name: 'config',
            title: 'Config'
        },
        {
            route: 'curriculum',
            moduleId: './editCurriculum',
            settings: { auth: false, roles: [] },
            nav: true,
            name: 'curriculum',
            title: 'Curriculum'
        },
        {
            route: 'helptickets',
            moduleId: './editHelpTickets',
            settings: { auth: false, roles: [] },
            nav: true,
            name: 'helptickets',
            title: 'Help Tickets'
        },
        {
            route: 'admin',
            moduleId: './admin',
            settings: { auth: false, roles: [] },
            nav: true,
            name: 'admin',
            title: 'Server Admin'
        }
        ]);

        this.router = router;
    }
}