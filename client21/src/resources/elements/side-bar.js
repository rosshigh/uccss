import { Aurelia, inject } from 'aurelia-framework';
import { Router } from "aurelia-router";
import { RouterEvent } from 'aurelia-router';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Auth } from '../data/auth';
import { AppConfig } from '../../appConfig';
import { Utils } from '../../resources/utils/utils';
import {Store} from '../../store/store';

@inject(Auth, AppConfig, Router, Utils, EventAggregator, Aurelia, Store)
export class SideBar {

    constructor(auth, config, router, utils, eventAggregator, aurelia, store) {
        this.auth = auth;
        this.router = router;
        this.utils = utils;
        this.aurelia = aurelia;
        this.config = config;
        this.eventAggregator = eventAggregator;
        this.store = store;
        this.userObj = this.store.getUser('user');
        this.isAuthenticated = this.auth.isAuthenticated();

        this.sideBarVisible = true;
        this.pageTitle ="Customers";

        // this.eventAggregator.subscribe(RouterEvent.Complete, (event) => {
        //     this
        //     console.log(event.instruction);
        //     console.log(event);
        //     this.currentRoute = this.router.currentInstruction.config.name;
        //   })
          
    }

    // activate(){
    //     this.userObj = this.actions.getUser('user');
    //     this.isAuthenticated = this.auth.isAuthenticated();
    // }

    async login() {
        let response = await this.auth.login(this.email, this.password)
        if (!response.error) {
            //   sessionStorage.setItem('uccweather', JSON.stringify({ temp: response.temp, icon: response.icon }));
            this.loginError = "";
            this.loginSuccess();
            this.isAuthenticated = this.auth.isAuthenticated();
        } else {
            this.loginError = "Invalid credentials.";
        }
    }

    logout() {
        this.auth.logout();
        this.isAuthenticated = this.auth.isAuthenticated();
        this.aurelia.setRoot(PLATFORM.moduleName('home'));
    }

    async loginSuccess() {
        // this.userObj = JSON.parse(this.store.user);
        this.userObj = this.store.getUser('user');
        if (this.userObj) {
            if (this.userObj.institutionId.institutionStatus !== this.config.INSTITUTIONS_ACTIVE) {
                this.utils.showNotification("You must belong to an active institution to access the web site");
                this.logout();
            } else {
                if (this.userObj.personStatus !== this.config.ACTIVE_PERSON) {
                    return this.dialog.showMessage(
                        "You must have an active account to access the web site.  Contact your faculty coordinator to activate your account.",
                        "Account Not Active",
                        ['OK']
                    ).whenClosed(response => {
                        this.logout();
                    });
                } else {
                    if (!this.userObj.userRole) this.logout();
                    this.store.setUserRole(this.userObj.userRole);
                    this.router.navigate("user");
                }
            }
        } else {
            this.utils.showNotification("There was a problem validating your account")
            this.router.navigate("home");
        }
    }

    async requestPasswordReset() {
        if (this.email) {
            let response = await this.people.requestPasswordReset({ email: this.email });
            if (response && !response.error) {
                this.utils.showNotification("An email has been sent to the provided email address with a link you can use to reset your password");
            } else if (response.status = 404) {
                this.utils.showNotification("There is no registered user with that email address");
            } else if (response.status = 401) {
                this.utils.showNotification("The account with the provided address has been deactivated.  Please contact your faculty coordinator.");
            }
        } else {
            this.utils.showNotification("Please enter an email address");
        }

    }

    // configureRouter(config, router) {
    //     config.map([
    //         {
    //             route: ['', 'user'],
    //             moduleId: PLATFORM.moduleName('../../modules/user/user'),
    //             settings: { auth: true, roles: [] },
    //             nav: true,
    //             name: 'user',
    //             title: "User"
    //         },
    //         {
    //             route: 'Customers',
    //             moduleId: PLATFORM.moduleName('../../modules/admin/Customers/customers'),
    //             settings: { auth: true, roles: [] },
    //             nav: true,
    //             name: 'customers',
    //             title: 'Customers'
    //         },
    //         {
    //             route: 'editPeople',
    //             moduleId: PLATFORM.moduleName('../../modules/admin/Customers/editPeople'),
    //             settings: { auth: true, roles: [] },
    //             nav: true,
    //             name: 'editPeople',
    //             title: "People"
    //         },
    //         {
    //             route: 'editInstitutions',
    //             moduleId: PLATFORM.moduleName('../../modules/admin/Customers/editInstitutions'),
    //             settings: { auth: true, roles: [] },
    //             nav: true,
    //             name: 'editInstitutions',
    //             title: 'Institutions'
    //         },
    //         {
    //             route: 'bulkEmails',
    //             moduleId: PLATFORM.moduleName('../../modules/admin/Customers/bulkEmails'),
    //             settings: { auth: true, roles: [] },
    //             nav: true,
    //             name: 'bulkEmails',
    //             title: 'Bulk Emails'
    //         },
    //         {
    //             route: 'documents',
    //             moduleId: PLATFORM.moduleName('../../modules/admin/documents/documents'),
    //             settings: { auth: true, roles: [] },
    //             nav: true,
    //             name: 'documents',
    //             title: 'Documents'
    //         }
    //         // {
    //         //     route: 'home',
    //         //     moduleId: PLATFORM.moduleName('../../modules/home/home'),
    //         //     name: 'Home',
    //         //     settings: { auth: false, roles: [] },
    //         //     title: 'UCCSS'
    //         //   },
    //         // {
    //         //     route: 'bulkEmails',
    //         //     moduleId: PLATFORM.moduleName('./bulkEmails'),
    //         //     settings: { auth: true, roles: [] },
    //         //     nav: true,
    //         //     name: 'bulkEmails',
    //         //     title: 'Bulk Emails'
    //         // }
    //     ]);

    //     this.router = router;
    // }

}