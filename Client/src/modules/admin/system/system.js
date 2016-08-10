
import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";
import {AppState} from '../../../resources/data/appState';

@inject(Router, AppState)
export class System{
    
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
            route: ['', 'editSessions'],
            moduleId: './editSession',
            auth: true,
            nav: true,
            name: 'editSessions',
            title: 'Sessions'
        },
        {
            route: 'editSystems',
            moduleId: './editSystem',
            auth: true,
            nav: true,
            name: 'editSystems',
            title: 'Systems'
        },
        {
            route: 'editProducts',
            moduleId: './editProduct',
            auth: true,
            nav: true,
            name: 'editProducts',
            title: 'Products'
        }
        ]);

        this.router = router;
    }
}