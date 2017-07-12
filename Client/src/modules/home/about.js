import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";
import {AppConfig} from '../../config/appConfig'; 

@inject(Router, AppConfig)
export class About{
    title="UCC Contact Information";
    
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
            route: ['', 'contact'],
            moduleId: './contact',
            settings: { auth: false, roles: [] },
            nav: true,
            name: 'contact',
            title: 'Contact Us'
        },
        {
            route: 'institutions',
            moduleId: './institutions',
            settings: { auth: false, roles: [] },
            nav: true,
            name: 'institutions',
            title: 'Our Customers'
        },
        {
            route: 'products',
            moduleId: './products',
            settings: { auth: false, roles: [] },
            nav: true,
            name: 'products',
            title: 'Products we support'
        }
        ]);

        this.router = router;
    }
}

