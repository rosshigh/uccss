import {inject} from 'aurelia-framework';
import {SiteInfo} from '../../resources/data/siteInfo';
import {Sessions} from '../../resources/data/sessions';
import {AppConfig} from '../../config/appConfig';
import moment from 'moment';

@inject(SiteInfo, Sessions, AppConfig)
export class Home {
    email = '';
    password = '';
    loginError = '';

    constructor( siteinfo, sessions, config) {
        this.sessions = sessions;
        this.siteinfo = siteinfo;
        this.config = config;
        this.config.getConfig(true);
    }

    async activate() {
        var currentDate = moment(new Date()).format("MM-DD-YYYY");
        var options = '?filter=expiredDate|gt|' + currentDate + '&order=sortOrder';
        await this.sessions.getSessionsArray(true, '?order=startDate' );
        await this.siteinfo.getInfoArray(true, options);
    }

    
}
