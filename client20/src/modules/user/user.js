import { inject } from 'aurelia-dependency-injection';
import { SiteInfo } from '../../resources/data/site';
import { Sessions } from '../../resources/data/sessions';
import { AppConfig } from '../../appConfig';
// import { Utils } from '../../../resources/utils/utils';

@inject(SiteInfo, Sessions, AppConfig)

export class User {
    pageTitle = "UCC Self Service Home";

    constructor(site, sessions, config ) {
        this.site = site;
        this.sessions = sessions;
        this.config = config;

        this.userObj = JSON.parse(sessionStorage.getItem('user'));
    }

    async activate() {
        let today = new Date();
        let responses = await Promise.all([
            this.site.getObjectArray('?filter=expiredDate|gt|' + today),
            this.sessions.getObjectsArray('/active')
        ]);

        this.getSystemMessage();
    }

    getSystemMessage(){
        this.systemMessage = undefined;
        this.site.objectArray.forEach(item => {
            if(item.itemType === 'MESS'){
                this.systemMessage = item.title;
            }
        });
        if(this.systemMessage && this.systemMessage.length) sessionStorage.setItem('systemMessage', this.systemMessage);
    }

    attached(){
        $("#systemMessage").fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500);
    }
}