import {inject, BindingEngine} from 'aurelia-framework';
import {Router} from "aurelia-router";
import {EventAggregator} from 'aurelia-event-aggregator';
import {Auth} from '../data/auth';
import {Utils} from '../../resources/utils/utils';
import {People} from '../../resources/data/people';
import {AppConfig} from "../../config/appConfig";
import { CommonDialogs } from '../dialogs/common-dialogs';


// @inject(Router, AuthService, People, AppState, Utils, AppConfig, BindingEngine)
@inject(Router, EventAggregator, BindingEngine, Auth, Utils, People, AppConfig, CommonDialogs)
export class NavBar {

    isAuthenticated = false;
    subscription = {};

    constructor(router, eventAggregator, bindingEngine, auth, utils, people, config, dialog){
        this.eventAggregator = eventAggregator;
        this.router = router;
        this.bindingEngine = bindingEngine;
        this.auth = auth;
        this.utils = utils;
        this.people = people;
        this.config = config;
        this.dialog = dialog;

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
        this.userObj = new Object();
        sessionStorage.removeItem('user');
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
                    sessionStorage.setItem('role',this.userObj.userRole)
                    this.router.navigate("user");
                }
            }
        } else {
            this.utils.showNotification("There was a problem validating your account")
            this.router.navigate("home");
        }
    }

    async requestPasswordReset(){
        if(this.email){
            let response = await this.people.requestPasswordReset({email: this.email});
            if(!response.error){
                this.utils.showNotification("An email has been sent to the provided email address with a link you can use to reset your password");
            } else if(response.status = 404){
                this.utils.showNotification("There is no registered user with that email address");
            } else if(response.status = 401){
                this.utils.showNotification("The account with the provided address has been deactivated.  Please contact your faculty coordinator.");
            }
        } else {
            this.utils.showNotification("Please enter an email address");
        }
        
    }

    enterNote(){
        var note = {noteBody: "", noteCategories: this.userObj.noteCategories, selectedCategory: 0};
         return this.dialog.showNote(
                "Save Changes",
                note,
                ['Submit', 'Cancel']
            ).then(response => {
                if (!response.wasCancelled) {
                    this.saveNote(response.output);
                } else {
                    console.log("Cancelled");
                }
            });
    }

    async saveNote(note){
        this.people.selectNote();
        this.people.selectedNote.personId = this.userObj._id;
        this.people.selectedNote.category = this.userObj.noteCategories[note.selectedCategory];
        this.people.selectedNote.note = note.note.noteBody;
        let response = await this.people.saveNote();
            if(!response.error){
                this.utils.showNotification('The note was saved');
            }
        // console.log(note.note.noteBody);
        // console.log(note.selectedCategory);
    }

}