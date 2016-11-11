import {inject, BindingEngine} from 'aurelia-framework';
import {Router} from "aurelia-router";
import {EventAggregator} from 'aurelia-event-aggregator';
import {Auth} from '../data/auth';
import {Utils} from '../../resources/utils/utils';
import {People} from '../../resources/data/people';
import {AppConfig} from "../../config/appConfig";


// @inject(Router, AuthService, People, AppState, Utils, AppConfig, BindingEngine)
@inject(Router, EventAggregator, BindingEngine, Auth, Utils, People, AppConfig)
export class NavBar {

    isAuthenticated = false;
    subscription = {};

    constructor(router, eventAggregator, bindingEngine, auth, utils, people, config){
        this.eventAggregator = eventAggregator;
        this.router = router;
        this.bindingEngine = bindingEngine;
        this.auth = auth;
        this.utils = utils;
        this.people = people;
        this.config = config;

        this.isAuthenticated = this.auth.isAuthenticated();
        this.userObj = JSON.parse(sessionStorage.getItem('user'));
    }

    attached() {
       setInterval(() => {
           this.userObj = JSON.parse(sessionStorage.getItem('user'));
           console.log('Checked token');
           if(this.userObj.userRole < this.config.UCC_ROLE){
                this.isAuthenticated = this.auth.isAuthenticated();
                if(!this.isAuthenticated){
                    this.logout();
                }
           }
        }, 6000000);
    }

    async login(){
        let response = await this.auth.login(this.email, this.password)
        if(!response.error){
            sessionStorage.setItem('uccweather', JSON.stringify({temp: response.temp, icon: response.icon}));
            this.loginError = "";
            console.log(response);
            this.loginSuccess();
            this.isAuthenticated = this.auth.isAuthenticated(); 
        } else {
            console.log(response);
            this.loginError = "Invalid credentials.";
        }
    }

    logout(){
        this.auth.logout();
        this.userRole = 0;
        sessionStorage.removeItem('role');
        this.isAuthenticated = this.auth.isAuthenticated(); 
        this.router.navigate("home");
    }

    async loginSuccess() {
        this.userObj = JSON.parse(sessionStorage.getItem('user'));
        if (this.userObj) {
            var instObj = await this.people.getInstitution(this.userObj.institutionId);
            if (instObj.institutionStatus !== this.config.INSTITUTIONS_ACTIVE) {
                this.utils.showNotification("You must belong to an active institution to access the web site");
                this.logout();
            } else {
                if (this.userObj.personStatus !== this.config.ACTIVE_PERSON) {
                    this.utils.showNotification("You must have an active account to access the web site");
                     this.logout();
                } else {
                    if (!this.userObj.userRole)  this.logout();
                    if (this.userObj.userRole == this.config.PROV_USER) {
                        this.utils.showNotification("Please complete your profile")
                        this.router.navigate("profile");
                    } else {
                        sessionStorage.setItem('role',this.userObj.userRole)
                        this.router.navigate("user");
                    }
                }
            }
        } else {
            this.utils.showNotification("There was a problem validating your account")
            this.router.navigate("home");
        }
    }

}