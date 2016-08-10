import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";
import {AppState} from '../../../resources/data/appState';

@inject(Router, AppState)
export class Customers{
    
    tabs = [{id: 'editPeople', label: 'People'},{id: 'editInstitutions', label: 'Institutions'}];
    tabPath = "modules/admin/customers/";
    
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
            title: "People"
        },
        {
            route: 'editInstitutions',
            moduleId: './editInstitutions',
            auth: true,
            nav: true,
            name: 'editInstitutions',
            title: 'Institutions'
        }
        ]);

        this.router = router;
    }
    
    changeTab(tab){
        console.log(tab);
    }
}