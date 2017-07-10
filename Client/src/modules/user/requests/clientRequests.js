import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";
import {AppConfig} from '../../../config/appConfig'; 

@inject(Router, AppConfig)
export class ClientRequests{
    title="Product Requests";
    
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
            route: ['', 'viewRequests'],
            moduleId: './viewRequests',
            settings: { auth: true, roles: [] },
            nav: true,
            name: 'viewRequests',
            title: 'View Requests'
        },
        {
            route: 'createRequests',
            moduleId: './createRequests',
            settings: { auth: true, roles: [] },
            nav: true,
            name: 'createRequests',
            title: 'Create Request'
        },       
        {
            route: 'viewProducts',
            moduleId: './viewProducts',
            settings: { auth: true, roles: [] },
            nav: true,
            name: 'viewProducts',
            title: 'Product List'
        }
        ]);

        this.router = router;
    }
}
