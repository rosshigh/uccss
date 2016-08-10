import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";
import {AppState} from '../../resources/data/appState';

@inject(Router, AppState)
export class FacCo{
    
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
            route: ['', 'editPeople'],
            moduleId: './editPeople',
            auth: true,
            nav: true,
            name: 'editPeople',
            title: 'People'
        },
        {
            route: 'editClients',
            moduleId: './editClients',
            auth: true,
            nav: true,
            name: 'editClients',
            title: 'Clients Requests'
        }
        ]);

        this.router = router;
    }
}