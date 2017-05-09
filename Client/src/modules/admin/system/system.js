import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";

@inject(Router)
export class System{
    
    constructor(router){
        this.router = router;
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
            route: 'editProducts',
            moduleId: './editProduct',
            settings: { auth: true, roles: [] },
            nav: true,
            name: 'editProducts',
            title: 'Products'
        }
        ]);

        this.router = router;
    }
}