import { inject } from 'aurelia-framework';
import { Router } from "aurelia-router";
import { AppConfig } from '../../config/appConfig';

@inject(Router, AppConfig)
export class ACCRequests {
    title = "ACC Client Assignments"

    constructor(router, config) {
        this.router = router;
        this.config = config;
    }

    attached() {
        $(".nav a").on("click", function () {
            $(".nav").find(".active").removeClass("active");
            $(this).parent().addClass("active");
        });
    }

    activate() {
        this.config.getConfig(true);
    }

    configureRouter(config, router) {
        config.map([
            {
                route: ['', 'accCreateRequest'],
                moduleId: './accCreateRequest',
                settings: { auth: true, roles: [] },
                nav: true,
                name: 'createRequest',
                title: 'Create Request'
            },
            {
                route: 'viewUserRequests',
                moduleId: './viewUserRequests',
                settings: { auth: true, roles: [] },
                nav: true,
                name: 'viewUserRequests',
                title: 'View User Requests'
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
                route: 'apjAssignments',
                moduleId: './apjAssignments',
                settings: { auth: true, roles: [] },
                nav: true,
                name: 'apjAssignments',
                title: 'Assignments'
            }
        ]);

        this.router = router;
    }

}