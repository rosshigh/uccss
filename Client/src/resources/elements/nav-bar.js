import { inject, BindingEngine } from 'aurelia-framework';
import { Router } from "aurelia-router";
import { EventAggregator } from 'aurelia-event-aggregator';
import { Auth } from '../data/auth';
import { Utils } from '../../resources/utils/utils';
import { People } from '../../resources/data/people';
import { AppConfig } from "../../config/appConfig";
import { CommonDialogs } from '../dialogs/common-dialogs';
import {APJClientRequests} from '../../resources/data/apjClientRequests';
import moment from 'moment';
import * as toastr from "toastr";
import $ from "jquery";

@inject(Router, EventAggregator, BindingEngine, Auth, Utils, People, AppConfig, CommonDialogs, APJClientRequests)
export class NavBar {

    isAuthenticated = false;
    subscription = {};

    constructor(router, eventAggregator, bindingEngine, auth, utils, people, config, dialog, apjRequests) {
        this.eventAggregator = eventAggregator;
        this.router = router;
        this.bindingEngine = bindingEngine;
        this.auth = auth;
        this.utils = utils;
        this.people = people;
        this.config = config;
        this.dialog = dialog;
        this.apjRequests = apjRequests;

        this.isAuthenticated = this.auth.isAuthenticated();
        this.userObj = JSON.parse(sessionStorage.getItem('user'));
    }

    async attached() {
        this.hideProfile();
        $(".dropdown-toggle").dropdown();
        if (this.userObj) this.people.getNotifications(this.userObj._id);
        setInterval(() => {
            this.people.getNotifications(this.userObj._id);
        }, 10 * 60 * 1000);
        await this.apjRequests.getClientRequestsDetailsArray('?filter=requestStatus|eq|1',true);
        this.apjUnassignedRequests = this.apjRequests.requestsDetailsArray;
        console.log(this.apjUnassignedRequests)
    }

    async login() {
        let response = await this.auth.login(this.email, this.password)
        if (!response.error) {
            sessionStorage.setItem('uccweather', JSON.stringify({ temp: response.temp, icon: response.icon }));
            this.loginError = "";
            this.loginSuccess();
            this.isAuthenticated = this.auth.isAuthenticated();
        } else {
            this.loginError = "Invalid credentials.";
        }
    }

    logout() {
        if (this.userObj) this.auth.logout(this.userObj.email);
        this.userObj = new Object();
        this.isAuthenticated = this.auth.isAuthenticated();
        this.router.navigate("home");
    }

    async loginSuccess() {
        this.userObj = JSON.parse(sessionStorage.getItem('user'));
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
                    sessionStorage.setItem('role', this.userObj.userRole)
                    // this.events();
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

    enterNote() {
        var note = { noteBody: "", noteCategories: this.userObj.noteCategories, selectedCategory: 0 };
        return this.dialog.showNote(
            "Enter Note",
            note,
            ['Submit', 'Cancel']
        ).whenClosed(response => {
            if (!response.wasCancelled) {
                this.saveNote(response.output);
            } else {
                console.log("Cancelled");
            }
        });
    }

    async saveNote(note) {
        this.people.selectNote();
        this.people.selectedNote.personId = this.userObj._id;
        this.people.selectedNote.category = this.userObj.noteCategories[note.selectedCategory];
        this.people.selectedNote.note = note.note.noteBody;
        let response = await this.people.saveNote();
        if (!response.error) {
            this.utils.showNotification('The note was saved');
        }
    }

    // openAlert(alert){
    //     this.alert = alert;
    //     $(".hoverProfile").css("top", 100);
    //     $(".hoverProfile").css("left", 100);
    //     $(".hoverProfile").css("display", "block");
    //     sessionStorage.setItem('alert',true);
    // }

    // hideAlert(){
    //     $(".hoverProfile").css("display", "none");
    // }

    showProfile(el) {
        this.toggleProfile = this.toggleProfile ? false : true;
        if (this.toggleProfile) {
            $(".noticeProfile").css("top", el.clientY + 25);
            $(".noticeProfile").css("left", $("#noticeLabel")[0].offsetLeft);
            $(".noticeProfile").css("display", "block");
            $(".noticeProfile").css('position', 'fixed');
        } else {
            this.hideProfile();
        }
    }

    hideProfile() {
        $(".noticeProfile").css("display", "none");
    }

    updateNotification(notice, index){
        notice.checked = true;
        this.people.saveNotification(notice);
        this.people.notificationsArray.splice(index, 1);
    }

    async events() {
        await this.eventLayer.getEventsArray('', true);
        let today = new Date();
        this.eventLayer.eventArray.forEach(item => {
            if (item.personId === this.userObj._id || item.scope === 'u') {
                if (moment(today).isBetween(item.start, item.end));
                this.events.push(item);
            }
        })

        // let response = await this.people.getRemindersArray('?filter=personId|eq|' + this.userObj._id, true);
        // if(response && !response.error && this.people && Object.prototype.toString.call(this.people.remindersArray) === '[object Array]'){
        //     toastr.options.closeButton = true;
        //     toastr.options.closeMethod = 'fadeOut';
        //     toastr.options.closeDuration = 300;
        //     toastr.options.closeEasing = 'swing';
        //     this.timeReminders = new Array();
        //     var now = new Date();
        //     var weekDay = now.getDay()
        //     var monthDay = now.getDate();
        //     this.reccurentReminders = new Array();
        //     this.people.remindersArray.forEach((item, index) => {
        //         switch(item.reminderType){
        //              case "D":
        //                 if(!item.lastSeen || !moment(now).isSame(item.lastSeen,'day')) {
        //                     if(item.priority == 1){
        //                         toastr.error(item.note, "Reminder");
        //                     } else {
        //                         toastr.info(item.note, "Reminder");
        //                     }
        //                     item.lastSeen = now;
        //                     this.people.saveReminder(item, index);
        //                 }
        //                 break;
        //             case "W":
        //                 if(item.reminderDay == weekDay && (!item.lastSeen || !moment(now).isSame(item.lastSeen,'day'))) {
        //                     if(item.priority == 1){
        //                         toastr.error(item.note, "Reminder");
        //                     } else {
        //                         toastr.info(item.note, "Reminder");
        //                     }
        //                     item.lastSeen = now;
        //                     this.people.saveReminder(item, index);
        //                 }
        //                 break;
        //             case "M":
        //                 if(item.reminderDay == monthDay && (!item.lastSeen || !moment(now).isSame(item.lastSeen,'month'))) {
        //                     if(item.priority == 1){
        //                         toastr.error(item.note, "Reminder");
        //                     } else {
        //                         toastr.info(item.note, "Reminder");
        //                     }
        //                     item.lastSeen = now;
        //                     this.people.saveReminder(item, index);
        //                 }
        //                 break;
        //             case "A":
        //                 if(moment(now).isSame(item.dateStartRemind,'day') && (!item.lastSeen || !moment(now).isSame(item.lastSeen,'month'))) {
        //                     if(item.priority == 1){
        //                         toastr.error(item.note, "Reminder");
        //                     } else {
        //                         toastr.info(item.note, "Reminder");
        //                     }
        //                     item.lastSeen = now;
        //                     this.people.saveReminder(item, index);
        //                 }
        //                 break;
        //             case "T":
        //                 if(moment(now).isSame(item.dateStartRemind,'day') && (!item.lastSeen || !moment(now).isSame(item.lastSeen,'month'))) {
        //                     let diff = moment(now).diff(item.dateStartRemind, 'minutes');
        //                     if(diff >= -15){
        //                         if(item.priority == 1){
        //                             toastr.error(item.note, "Reminder");
        //                         } else {
        //                             toastr.info(item.note, "Reminder");
        //                         }
        //                         item.lastSeen = now;
        //                         this.people.saveReminder(item, index);
        //                     } else {
        //                         this.timeReminders.push({item: item, index: index});
        //                     }
        //                 }
        //         }
        //     })

        //     if(this.timeReminders.length > 0){
        //          setInterval(() => {
        //             console.log('Checked reminders');
        //             var now = new Date();
        //             this.timeReminders.forEach(item => {
        //                 let diff = moment().diff(item.item.dateStartRemind, 'minutes');
        //                 if(diff >= -15){
        //                     if(item.priority == 1){
        //                         toastr.error(item.item.note, "Reminder");
        //                     } else {
        //                         toastr.info(item.note, "Reminder");
        //                     }
        //                     item.lastSeen = now;
        //                     this.people.saveReminder(item.item, item.index);
        //                 }
        //             });

        //         }, 10000);
        //     }


        // }
    }

}
