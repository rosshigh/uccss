import { inject } from 'aurelia-framework';
import { Router } from "aurelia-router";

@inject(Router)
export class UserHelpTickets {

    constructor(router) {
        this.router = router;
        this.pageTitle = 'Product Requests';

        this.systemMessage = sessionStorage.getItem('systemMessage');
    }

    attached(){
        $("#systemMessage").fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500);
        if(this.router.currentInstruction.fragment.length){
            $(".nav-link").removeClass('active');
            $("#" + this.router.currentInstruction.fragment).addClass('active');
        }
    }

    navigate(el){
        $(".nav-link").removeClass('active');
        $(el.target).addClass('active');
        this.router.navigate(el.target.id)
    }

    configureRouter(config, router) {
        config.map([
            {
                route: ['', 'viewRequests'],
                moduleId: PLATFORM.moduleName('./viewRequests'),
                settings: { auth: true, roles: [] },
                nav: true,
                name: 'viewRequests',
                title: "View Requests"
            },
            {
                route: 'createRequest',
                moduleId: PLATFORM.moduleName('./createRequest'),
                settings: { auth: true, roles: [] },
                nav: true,
                name: 'createRequest',
                title: 'Create/Modify Request'
            }
        ]);

        this.router = router;
    }
}