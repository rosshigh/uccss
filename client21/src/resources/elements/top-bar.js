import { inject, BindingEngine } from 'aurelia-framework';
import { Router } from "aurelia-router";
import { Auth } from '../data/auth';


@inject(Auth)
export class TopBar {

    constructor(auth){
        this.auth = auth;
    }
    
    
    logout() {
        this.auth.logout();
        this.isAuthenticated = this.auth.isAuthenticated();
        this.router.navigate("home");
    }
}