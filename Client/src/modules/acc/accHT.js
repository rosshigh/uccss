import { inject } from 'aurelia-framework';
import { Router } from "aurelia-router";
import { AppConfig } from '../../config/appConfig';

@inject(Router, AppConfig)
export class ACCHT {
    title = "ACC Help Tickets"

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
                route: ['', 'viewHTs'],
                moduleId: './viewHTs',
                settings: { auth: true, roles: [] },
                nav: true,
                name: 'viewHTs',
                title: 'Veiw Help Tickets'
            },
            {
                route: 'accCreateHT',
                moduleId: './accCreateHT',
                settings: { auth: true, roles: [] },
                nav: true,
                name: 'createHT',
                title: 'Create Help Tickets'
            }
        ]);

        this.router = router;
    }

}