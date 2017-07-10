import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";
import {AppConfig} from '../../../config/appConfig'; 

@inject(Router, AppConfig)
export class Customers{
    
    tabs = [{id: 'editPeople', label: 'People'},{id: 'editInstitutions', label: 'Institutions'}];
    tabPath = "modules/admin/customers/";
    
    constructor(router, config){
        this.router = router;
        this.appConfig = config;
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
            route: ['', 'assignments'],
            moduleId: './assignments',
            settings: { auth: true, roles: [] },
            nav: true,
            name: 'assignments',
            title: "Assignments"
        },
        {
            route: 'createRequest',
            moduleId: './createRequest',
            settings: { auth: true, roles: [] },
            nav: true,
            name: 'createRequest',
            title: 'Create Request'
        }
        ]);

        this.router = router;
    }
    
}