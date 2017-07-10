import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";
import {AppConfig} from '../../../config/appConfig'; 

@inject(Router, AppConfig)
export class Customers{

    title="Customers";
    
    tabs = [{id: 'editPeople', label: 'People'},{id: 'editInstitutions', label: 'Institutions'}];
    tabPath = "modules/admin/customers/";
    
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
            route: ['', 'editPeople'],
            moduleId: './editPeople',
            settings: { auth: true, roles: [] },
            nav: true,
            name: 'editPeople',
            title: "People"
        },
        {
            route: 'editInstitutions',
            moduleId: './editInstitutions',
            settings: { auth: true, roles: [] },
            nav: true,
            name: 'editInstitutions',
            title: 'Institutions'
        },
        {
            route: 'bulkEmails',
            moduleId: './bulkEmails',
            settings: { auth: true, roles: [] },
            nav: true,
            name: 'bulkEmails',
            title: 'Bulk Emails'
        }
        ]);

        this.router = router;
    }
    
}