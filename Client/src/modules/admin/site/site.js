import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";
import {AppState} from '../../../resources/data/appState';

@inject(Router, AppState)
export class Site{
    
    constructor(router, app){
        this.router = router;
        this.app = app;
    }
    
    canActivate(){
        if(!this.app.user._id) this.router.navigate('logout');    
    }
    
    configureRouter(config, router) {
        config.map([
        {
            route: ['', 'editNews'],
            moduleId: './editNews',
            auth: true,
            nav: true,
            name: 'editNews',
            title: 'Site Information'
        },
        {
            route: 'downloads',
            moduleId: './editDownloads',
            auth: true,
            nav: true,
            name: 'downloads',
            title: 'Downloads'
        },
        {
            route: 'messages',
            moduleId: './editMessages',
            auth: true,
            nav: true,
            name: 'messages',
            title: 'Messages'
        }
        // ,
        // {
        //     route: 'editInfo',
        //     moduleId: './editInfo',
        //     auth: true,
        //     nav: true,
        //     name: 'editInfo'
        // }
        ]);

        this.router = router;
    }
}