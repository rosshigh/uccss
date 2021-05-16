import { inject, BindingEngine } from 'aurelia-framework';
import { Router } from "aurelia-router";
import { Auth } from '../data/auth';
import {SiteInfo} from '../data/site';

@inject(Auth,SiteInfo)
export class NavBar {

    constructor(auth, site){
        this.auth = auth;
        this.site = site;
    }
    
    
    logout() {
        this.auth.logout();
        this.isAuthenticated = this.auth.isAuthenticated();
        this.router.navigate("home");
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