import { inject } from 'aurelia-framework';
import { Router } from "aurelia-router";
import { AppConfig } from '../../config/appConfig';

@inject(Router, AppConfig)
export class ACCInvoice {
    title = "ACC Invoices"

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
                route: ['', 'accViewInvoice'],
                moduleId: './accViewInvoice',
                settings: { auth: true, roles: [] },
                nav: true,
                name: 'viewInvoice',
                title: 'View Invoice'
            },
            {
                route: 'accCreateInvoice',
                moduleId: './accCreateInvoice',
                settings: { auth: true, roles: [] },
                nav: true,
                name: 'accCreateInvoice',
                title: 'Create Invoice'
            }
        ]);

        this.router = router;
    }
}