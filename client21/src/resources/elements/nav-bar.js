import { inject, BindingEngine } from 'aurelia-framework';
import { Auth } from '../data/auth';
import { Utils } from '../../resources/utils/utils';
import { Store } from 'aurelia-store';

@inject(Auth, Utils, Store)
export class NavBar {

    constructor(auth, utils, store) {
        this.auth = auth;
        this.utils = utils;
        this.store = store;

        this.isAuthenticated = this.auth.isAuthenticated();
        // this.userObj = JSON.parse(sessionStorage.getItem('user'));
    }

    bind() {
        this.subscription = this.store.state.subscribe(
            (state) => this.state = state
        );
    }

    unbind() {
        this.subscription.unsubscribe();
    }

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
        if (this.userObj) this.auth.logout(this.userObj.email);
        delete this.store.token;
        delete this.store.user;
        this.userObj = new Object();
        this.isAuthenticated = this.auth.isAuthenticated();
        this.router.navigate("home");
    }

    async loginSuccess() {
        this.userObj = JSON.parse(this.store.user);
        // this.userObj = JSON.parse(sessionStorage.getItem('user'));
        if (this.userObj) {
            if (this.userObj.institutionId.institutionStatus !== this.store.config.INSTITUTIONS_ACTIVE) {
                this.utils.showNotification("You must belong to an active institution to access the web site");
                this.logout();
            } else {
                if (this.userObj.personStatus !== this.store.config.ACTIVE_PERSON) {
                    return this.dialog.showMessage(
                        "You must have an active account to access the web site.  Contact your faculty coordinator to activate your account.",
                        "Account Not Active",
                        ['OK']
                    ).whenClosed(response => {
                        this.logout();
                    });
                } else {
                    if (!this.userObj.userRole) this.logout();
                    sessionStorage.setItem('role', this.userObj.userRole)
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

}
