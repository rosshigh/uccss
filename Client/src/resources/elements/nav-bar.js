import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";

import {AuthService} from 'aurelia-auth';

import {People} from '../../resources/data/people';
import {AppState} from '../../resources/data/appState';
import {Utils} from '../../resources/utils/utils';
import {AppConfig} from "../../config/appConfig";


@inject(Router, AuthService, People, AppState, Utils, AppConfig)
export class NavBar {

    constructor(router, auth, people, app, utils, config) {
        this.people = people;
        this.app = app;
        this.auth = auth;
        this.utils = utils;
        this.router = router;
        this.config = config;
    }

    login() {
        return this.auth.login(this.email, this.password)
            .then(response => {
                console.log("Login response: " + response);
                this.loginSuccess(response._id);
                localStorage.setItem("user", response._id);
                this.loginError = "";
            })
            .catch(error => {
                console.log(error);
                this.loginError = "Invalid credentials.";
            });
    };

    async loginSuccess(user) {
        var userObj = await this.people.getPerson(user);
        if (userObj) {
            var instObj = await this.people.getInstitution(userObj.institutionId);
            if (instObj.institutionStatus !== this.config.INSTITUTIONS_ACTIVE) {
                this.utils.showNotification("You must belong to an active institution to access the web site");
                this.router.navigate("logout");
            } else {
                if (userObj.personStatus !== this.config.ACTIVE_PERSON) {
                    this.utils.showNotification("You must have an active account to access the web site", "", "", "", "", 6);
                    this.router.navigate("logout");
                } else {
                    this.app.setUser(userObj);
                    // this.app.setRole(userObj.roles);
                    if (!this.app.userRole) this.router.navigate("logout");
                    if (this.app.userRole == this.config.PROV_USER) {
                        this.utils.showNotification("Please complete your profile", "", "", "", "", 5)
                        this.router.navigate("profile");
                    } else {
                        this.router.navigate("user");
                    }
                }
            }
        } else {
            this.utils.showNotification("There was a problem validating your account", "", "", "", "", 6)
            this.router.navigate("home");
        }

    }

    get isAuthenticated() {
        if (!this.auth.isAuthenticated) {
            console.log("You have been timed out");
            this.router.navigate("logout");
        }
        return this.auth.isAuthenticated();
    }

    setPassword() {
        this.utils.showNotification("yet to be implemented");
    }

}