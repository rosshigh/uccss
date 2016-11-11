import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";

@inject(Router)
export class Site{
    
    constructor(router){
        this.router = router;
    }
    
    configureRouter(config, router) {
        config.map([
        {
            route: ['', 'editNews'],
            moduleId: './editNews',
            settings: { auth: false, roles: [] },
            nav: true,
            name: 'editNews',
            title: 'Site Information'
        },
        {
            route: 'downloads',
            moduleId: './editDownloads',
            settings: { auth: false, roles: [] },
            nav: true,
            name: 'downloads',
            title: 'Downloads'
        },
        {
            route: 'messages',
            moduleId: './editMessages',
            settings: { auth: false, roles: [] },
            nav: true,
            name: 'messages',
            title: 'Messages'
        },
        {
            route: 'config',
            moduleId: './editConfig',
            settings: { auth: false, roles: [] },
            nav: true,
            name: 'config',
            title: 'Config'
        }
        ]);

        this.router = router;
    }
}