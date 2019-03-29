import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";
import {AppConfig} from '../../config/appConfig'; 

@inject(Router, AppConfig)
export class ACCCustomers {
    title="ACC Customers"
    
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
            route: ['','accInstitute'],
            moduleId: './accInstitute',
            settings: { auth: true, roles: [] },
            nav: true,
            name: 'accInstitute',
            title: 'Institutions'
        },
         {
            route: 'people',
            moduleId: './accPeople',
            settings: { auth: true, roles: [] },
            nav: true,
            name: 'accPeople',
            title: 'People'
        }
        ]);

        this.router = router;
    }
    
}