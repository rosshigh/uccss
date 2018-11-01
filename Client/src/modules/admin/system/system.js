import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";
import {AppConfig} from '../../../config/appConfig'; 

@inject(Router, AppConfig)
export class EditSystem{
    title="System";
    
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
            route: ['', 'editSessions'],
            moduleId: './editSession',
            settings: { auth: true, roles: [] },
            nav: true,
            name: 'editSessions',
            title: 'Sessions'
        },
        {
            route: 'editSystems',
            moduleId: './editSystem',
            settings: { auth: true, roles: [] },
            nav: true,
            name: 'editSystems',
            title: 'Systems'
        },
        {
            route: 'editProduct',
            moduleId: './editProduct',
            settings: { auth: true, roles: [] },
            nav: true,
            name: 'editProduct',
            title: 'Products'
        },
        {
            route: 'changes',
            moduleId: './editChanges',
            settings: { auth: true, roles: [] },
            nav: false,
            name: 'editChanges',
            title: 'Changes'
        }
        ]);

        this.router = router;
    }
}