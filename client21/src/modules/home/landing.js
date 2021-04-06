import { Aurelia, inject } from 'aurelia-framework';
import { Router } from "aurelia-router";
import { Auth } from '../../resources/data/auth';
import { AppConfig } from '../../appConfig';
import { Utils } from '../../resources/utils/utils';
import { Store } from '../../store/store';
import { Config } from '../../resources/data/config';
import { People } from '../../resources/data/people';
import { is4ua } from '../../resources/data/is4ua';

@inject(Auth, AppConfig, Router, Utils, Aurelia, Store,People, is4ua, Config)
export class Landing {


    constructor(auth, appConfig, router, utils, aurelia, store, people, is4ua, config) {
        this.auth = auth;
        this.router = router;
        this.aurelia = aurelia;
        this.utils = utils;
        this.config = config;
        this.store = store;
        this.people = people;
        this.is4ua = is4ua;
        this.appConfig = appConfig;

        this.thresholdLength = 6;
        this.threshold = 3;
        this.useMask = true;

        this.screenHeight = $(window).height();
    }

    async activate() {
        this.store.retrieveConfig();
        await this.people.getInstitutionArray('?filter=institutionStatus|eq|01&order=name&fields=_id name');
        await this.is4ua.loadIs4ua();
        this.people.selectPerson();
        this.filterList();
        this.refreshSelects();
    }

    refreshSelects() {
        this.utils.refreshSelect("#register_institution", this.people.institutionsArray, "_id", this.people.selectedPerson.institutionId);
    }

    attached() {
        var wizard = $('.wizard').wizard();
        var that = this;

        wizard.on('actionclicked.fu.wizard', (e, data) => {
            that.step = data.step;
            if (data.direction !== "previous") {
                switch (data.step) {
                    case 1:
                        that.validateStepOne();
                        if (that.stepOneErrors.length) {
                            e.preventDefault();
                        }
                        break;
                    case 2:
                        that.validateStepTwo();
                        if (that.stepTwoErrors.length) {
                            e.preventDefault();
                        }
                        break;
                    case 3:
                        that.validateStepThree();
                        if (that.stepThreeErrors.length) {
                            e.preventDefault();
                        } else {
                            that.save();
                        }
                        break;

                }
            }
        })
    }

    validateStepOne() {
        this.stepOneErrors = [];
        if (this.people.selectedPerson.firstName.length === 0) {
            this.stepOneErrors.push("You must enter a first name");
        }
        if (this.people.selectedPerson.lastName.length === 0) {
            this.stepOneErrors.push("You must enter a last name");
        }
    }

    validateStepTwo() {
        this.stepTwoErrors = [];
        if (!this.people.selectedPerson.institutionId || this.people.selectedPerson.institutionId === "") {
            this.stepTwoErrors.push("You must select an institution");
        }

    }

    validateStepThree() {
        this.stepThreeErrors = [];
        if (this.people.selectedPerson.phone.length === 0) {
            this.stepThreeErrors.push('You must enter a phone number');
        }
        if (this.people.selectedPerson.email.length === 0) {
            this.stepThreeErrors.push('You must enter an email address');
        }
        if (this.people.selectedPerson.password.length === 0) {
            this.stepThreeErrors.push('You must enter a password');
        }
        if (!this.complexPassword) {
            this.stepThreeErrors.push('The password is not complex enough');
        }
        if (this.people.selectedPerson.password !== this.password_repeat) {
            this.stepThreeErrors.push('The passwords must match');
        }
    }

    async institutionSelected(id) {
        this.people.selectedPerson.institutionId = id;
        await this.people.getInstitution(this.people.selectedPerson.institutionId);
        this.people.selectedPerson.address1 = this.people.selectedInstitution.address1;
        this.people.selectedPerson.address2 = this.people.selectedInstitution.address2;
        this.people.selectedPerson.country = this.people.selectedInstitution.country;
        this.people.selectedPerson.region = this.people.selectedInstitution.region;
        this.people.selectedPerson.postalCode = this.people.selectedInstitution.postalCode;
        this.people.selectedPerson.city = this.people.selectedInstitution.city;
        if (this.people.selectedInstitution.country !== 'CA' && this.people.selectedInstitution.country !== 'US') {
            this.useMask = false;
        } else {
            this.useMask = true;
        }
    }

    filterList() {
        if (this.filter) {
            var thisFilter = this.filter
            this.filteredInstitutionsArray = this.people.institutionsArray.filter((item) => {
                return item.name.toUpperCase().indexOf(thisFilter.toUpperCase()) != -1;
            });
        } else {
            this.filteredInstitutionsArray = this.people.institutionsArray;
        }
    }

    async checkEmail() {
        if (await this.people.checkEmail()) {
            this.duplicateAccount = true;
        } else {
            this.duplicateAccount = false;
        }
    }

    passwordComplexity() {
        var newValue = this.people.selectedPerson.password;
        this.longPassword = newValue.length >= this.thresholdLength;
        let strength = 0;
        strength += /[A-Z]+/.test(newValue) ? 1 : 0;
        strength += /[a-z]+/.test(newValue) ? 1 : 0;
        strength += /[0-9]+/.test(newValue) ? 1 : 0;
        strength += /[\W]+/.test(newValue) ? 1 : 0;

        this.complexPassword = strength >= this.threshold && this.longPassword;
        return true;
    }

    DoThePasswordsMatch() {
        setTimeout(() => { this.passwordsMatch = this.people.selectedPerson.password === this.password_repeat; }, 200);
        return true;
    }

    async save() {
        this.people.selectedPerson.personStatus = this.appConfig.INACTIVE_PERSON;
        let response = await this.people.savePerson()
        if (!response.error) {
            $("#registerModal").modal('hide');
            setTimeout(()=> { $("#confirmModal").modal('show')},500);
            // this.sendFacDevEmail();
            // return this.dialog.showMessage(
            //   "Your account has been created.  Your faculty coordinator must activate the account before you can log on to the UCCSS.",
            //   "Account Created",
            //   ['OK']
            // ).whenClosed(response => {
            //   this.router.navigate("home");
            // });
        } else {
            this.utils.showNotification("An error occurred creating the account", 'error');
        }
    };

    async login() {
        let response = await this.auth.login(this.email, this.password)
        if (!response.error) {
            this.loginError = "";
            this.loginSuccess();
            this.isAuthenticated = this.auth.isAuthenticated();
        } else {
            this.loginError = "Invalid credentials.";
        }
    }

    async loginSuccess() {
        this.userObj = this.store.getUser('user');
        if (this.userObj) {
            if (this.userObj.institutionId.institutionStatus !== this.appConfig.INSTITUTIONS_ACTIVE) {
                this.utils.showNotification("You must belong to an active institution to access the web site");
                this.logout();
            } else {
                if (this.userObj.personStatus !== this.appConfig.ACTIVE_PERSON) {
                    $("#activeModal").modal('show');
                    // return this.dialog.showMessage(
                    //     "You must have an active account to access the web site.  Contact your faculty coordinator to activate your account.",
                    //     "Account Not Active",
                    //     ['OK']
                    // ).whenClosed(response => {
                    //     this.logout();
                    // });
                } else {
                    if (!this.userObj.userRole) this.logout();
                    this.store.setUserRole(this.userObj.userRole);
                    this.aurelia.setRoot(PLATFORM.moduleName('app'));
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

    logoff(){
        console.log('logging off');
    }

    openRegisterModal() {
        $('#registerModal').modal('show');
        setTimeout(() => { $('#register_firstName').focus(); }, 500);
    }

    saveRegistration() {

    }

}