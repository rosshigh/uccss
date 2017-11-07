import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";
import {AppConfig} from '../../../config/appConfig'; 

@inject(Router, AppConfig)
export class TechRequests{
    title="Tech Staff Client Assignments"
    
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
        },
         {
            route: 'clientRequestsAnalytics',
            moduleId: '../../analytics/clientRequests',
            settings: { auth: true, roles: [] },
            nav: true,
            name: 'clientRequests',
            title: 'Client Requests Analytics'
        },
         {
            route: 'clientRequestsArchive',
            moduleId: './archiveClientRequests',
            settings: { auth: true, roles: [] },
            nav: true,
            name: 'archiveClientRequests',
            title: 'Client Requests Archive'
        },
        {
           route: 'viewUserRequests',
           moduleId: './viewUserRequests',
           settings: { auth: true, roles: [] },
           nav: true,
           name: 'viewUserRequests',
           title: 'View User Requests'
       }
        ]);

        this.router = router;
    }
    
}