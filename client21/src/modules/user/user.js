import { inject } from 'aurelia-dependency-injection';
import { Router } from "aurelia-router";
import { SiteInfo } from '../../resources/data/site';
import { Sessions } from '../../resources/data/sessions';
import { People } from '../../resources/data/people';
import { HelpTickets } from '../../resources/data/helpTickets';
import { Utils } from '../../resources/utils/utils';
import { AppConfig } from '../../appConfig';

@inject(Router, SiteInfo, Sessions, People, HelpTickets, Utils, AppConfig)

export class User {
    pageTitle = "UCC Self Service Home";

    constructor(router, site, sessions, people, helpTickets, utils, config) {
        this.router = router;
        this.site = site;
        this.sessions = sessions;
        this.people = people;
        this.helpTickets = helpTickets;
        this.utils = utils;
        this.config = config;
        this.screenHeight = $(window).height();

        this.userObj = JSON.parse(sessionStorage.getItem('user'));
        this.role = parseInt(sessionStorage.getItem('role'));

        this.showUserHome = localStorage.getItem('showUserHome') === 'true';
    }

    async activate() {
        let today = new Date();
        let responses = await Promise.all([
            this.site.getObjectArray('?filter=expiredDate|gt|' + today),
            this.sessions.getObjectsArray('/active')
        ]);

        if (this.role >= this.config.UCC_ROLE) {
            // this.showUserHome = false;
            this.refreshReminders();
            this.refreshHelpTickets();
        }

        await this.getSystemMessage();
    }

    async getSystemMessage() {
        this.systemMessage = undefined;
        await this.site.getSystemMessage()
        // this.site.objectArray.forEach(item => {
        //     if (item.itemType === 'MESS') {
        //         this.systemMessage = item.title;
        //     }
        // });

        if (this.site.systemMessage && this.site.systemMessage.title.length) {
            this.systemMessage = this.site.systemMessage.title;
            sessionStorage.setItem('systemMessage', JSON.stringify(this.site.systemMessage));
        }
    }

    attached() {
        $("#systemMessage").fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500);
    }

    refreshReminders() {
        this.people.getReminders(this.userObj._id);
    }

    editReminder(reminder){
        this.reminder = reminder;
        this.showEditReminder = true;
    }

    saveReminder(){
        this.people.saveReminder(this.reminder);
        this.showEditReminder = false;
        this.refreshReminders();
    }

    deleteReminder(reminder){
        this.people.deleteReminder(reminder);
        this.showEditReminder = false;
        this.refreshReminders();
    }

    cancelEditReminder(){
        this.showEditReminder = false;
    }

    refreshHelpTickets(){
        this.helpTickets.getMyObjectArray(this.userObj._id);
    }

    navigateToHelpTicket(helpTicket){
        this.router.navigateToRoute('helpTicketsTech', { HTNumber: helpTicket._id });
    }

    updateHomePreference(){
        localStorage.setItem('showUserHome', !this.showUserHome);
        return true;
    }
}