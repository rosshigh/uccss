import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";
import {AppState} from '../../../resources/data/appState';

@inject(Router, AppState)
export class ClientRequests{
    
    tabs = [{id: 'viewRequests', title: 'View Requests'},{id: 'createRequests', title: 'Create Request'}];
    tabPath = "./";
    
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
            route: ['', 'viewRequests'],
            moduleId: './viewRequests',
            auth: true,
            nav: true,
            name: 'viewRequests',
            title: 'View Requests'
        },
        {
            route: 'createRequests',
            moduleId: './createRequests',
            auth: true,
            nav: true,
            name: 'createRequests',
            title: 'Create Request'
        }
        ]);

        this.router = router;
    }
}
