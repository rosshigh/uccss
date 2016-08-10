import {inject} from 'aurelia-framework';
import {DialogService} from 'aurelia-dialog';

import {SiteInfo} from '../../resources/data/siteInfo';
import {Sessions} from '../../resources/data/sessions';
import {AppConfig} from '../../config/appConfig';

import moment from 'moment';

@inject( Sessions, SiteInfo, AppConfig)
export class Home {
    email = '';
    password = '';
    loginError = '';

    constructor( sessions, siteinfo, config) {
        this.sessions = sessions;
        this.siteinfo = siteinfo;
        this.config = config;
    }

    async activate() {
        await this.getData();
    }

    async getData() {
      var currentDate = moment(new Date()).format("MM-DD-YYYY");
      var options = '?filter=expiredDate|gt|' + currentDate + '&order=sortOrder';
      await this.sessions.getSessionsArray(true, '?filter=[or]sessionStatus|Active:Requests:Next&order=startDate' );
      await this.siteinfo.getInfoArray(true, options);
    }

    
}
