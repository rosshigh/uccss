import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";
import {AppConfig} from '../../../config/appConfig'; 

@inject(Router, AppConfig)
export class Notes{

    title="Notes";
    
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
            route: ['', 'editNotes'],
            moduleId: './editNotes',
            settings: { auth: true, roles: [] },
            nav: true,
            name: 'editNotes',
            title: "Notes"
        },
        {
            route: 'editCalendar',
            moduleId: './editCalendar',
            settings: { auth: true, roles: [] },
            nav: true,
            name: 'editCalendar',
            title: 'Calendar'
        }
        ]);

        this.router = router;
    }
    
}