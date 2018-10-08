import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";
import {AppConfig} from '../../config/appConfig'; 

@inject(Router, AppConfig)
export class TechNotes{
    title="Tech Notes";
    
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
            route: ['', 'editTechNotes'],
            moduleId: './editTechNotes',
            settings: { auth: true, roles: [] },
            nav: true,
            name: 'editTechNotes',
            title: 'Tech Notes'
        },
        {
            route: 'editChecklists',
            moduleId: './editCheckLists',
            settings: { auth: true, roles: [] },
            nav: true,
            name: 'editCheckLists',
            title: 'Check Lists'
        },
        {
            route: 'editSystemUpdates',
            moduleId: './editSystemUpdates',
            settings: { auth: true, roles: [] },
            nav: true,
            name: 'editSystemUpdates',
            title: 'System Updates'
        }
        ]);

        this.router = router;
    }
}