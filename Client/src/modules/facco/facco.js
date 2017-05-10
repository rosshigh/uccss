import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";

@inject(Router)
export class FacCo{

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
            route: ['', 'editPeople'],
            moduleId: './editPeople',
            settings: { auth: true, roles: [] },
            nav: true,
            name: 'editPeople',
            title: 'People'
        },
        {
            route: 'viewRequests',
            moduleId: './viewRequests',
            settings: { auth: true, roles: [] },
            nav: true,
            name: 'viewRequests',
            title: 'Clients Requests'
        }
        ]);

        this.router = router;
    }
}