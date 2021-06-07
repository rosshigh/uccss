import { Aurelia, inject } from 'aurelia-framework';
import{ EventAggregator } from 'aurelia-event-aggregator';
import { Router } from "aurelia-router";
import { Auth } from '../data/auth';
import {SiteInfo} from '../data/site';

@inject(Auth, SiteInfo, EventAggregator, Router,  Aurelia)
export class NavBar {

    constructor(auth, site, eventAggregator, router, aurelia){
        this.auth = auth;
        this.site = site;
        this.eventAggregator = eventAggregator;
        this.router = router;
        this.aurelia = aurelia;

        this.pageTitle = 'UCC Support System Home';

        this.subscribe();
    }

    subscribe(){
        this.subscriber = this.eventAggregator.subscribe('pageTitleUpdate', payload => {
            this.pageTitle = payload;
        })
    }
    
    logout() {
        this.router.navigate("");
        this.auth.logout();
        this.isAuthenticated = this.auth.isAuthenticated();
        this.aurelia.setRoot(PLATFORM.moduleName('home'));
    }

    toggleSideBar(){
        $('#sidebar').slideToggle();
    }

    async showBannerMessage(){
        await this.site.getObjectArray('?filter=itemType|eq|MESS')
        this.modalMessage = this.site.objectArray[0].content;
        this.title = 'System Message';
    }
}