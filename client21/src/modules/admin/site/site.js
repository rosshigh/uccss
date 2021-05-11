import { inject } from 'aurelia-framework';
import { Router } from "aurelia-router";
import { SiteInfo } from '../../../resources/data/site';

@inject(Router, SiteInfo)
export class Site {

    constructor(router, site) {
        this.router = router;
        this.site = site;
        this.pageTitle = 'Site';

        this.systemMessage = sessionStorage.getItem('systemMessage');
    }

    attached() {
        $("#systemMessage").fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500);
    }

    toggleTheSideBar() {
        this.sideBarShown = !this.sideBarShown;
        if (!this.sideBarShown) {
            $('#sidebar').hide();
            $('.main-panel').css('width', '100%');
        } else {
            $('#sidebar').show();
            $('.main-panel').css('width', '');
        }
    }

    configureRouter(config, router) {
        config.map([
            {
                route: ['', 'editInfo'],
                moduleId: PLATFORM.moduleName('./editInfo'),
                settings: { auth: true, roles: [] },
                nav: true,
                name: 'editInfo',
                title: "Site Info"
            },
            {
                route: 'editConfig',
                moduleId: PLATFORM.moduleName('./editConfig'),
                settings: { auth: true, roles: [] },
                nav: true,
                name: 'editConfig',
                title: 'Configuration'
            },
            {
                route: 'editFAQ',
                moduleId: PLATFORM.moduleName('./editFAQ'),
                settings: { auth: true, roles: [] },
                nav: true,
                name: 'editFAQ',
                title: 'FAQ'
            }
        ]);

        this.router = router;
    }

   
}