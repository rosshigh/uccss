import {inject, TemplatingEngine} from 'aurelia-framework';
import {SiteInfo} from '../../resources/data/siteInfo';
import {Sessions} from '../../resources/data/sessions';
import {AppConfig} from '../../config/appConfig';
import moment from 'moment';

@inject(SiteInfo, Sessions, AppConfig, TemplatingEngine)
export class Home {
    email = '';
    password = '';
    loginError = '';

    constructor(siteinfo, sessions, config, templatingEngine) {
        this.sessions = sessions;
        this.siteinfo = siteinfo;
        this.config = config;
        this.config.getConfig(true);
        this.templatingEngine = templatingEngine;
    }

    async activate() {
        var currentDate = moment(new Date()).format("MM-DD-YYYY");
        var options = '?filter=expiredDate|gt|' + currentDate + '&order=sortOrder';
         let responses = await Promise.all([
           this.sessions.getSessionsArray('?order=startDate', true ),
           this.siteinfo.getInfoArray(true, options)
         ]);
    }

    attached(){
        $("#leftContainer").html(this.config.HOME_PAGE_LEFT)
         let el1 = document.getElementById('leftContainer');

        if (el1) {
            if (!el1.querySelectorAll('.au-target').length) {
                this.templatingEngine.enhance({element: el1, bindingContext: this});
            }
        }
        
         $("#middleContainer").html(this.config.HOME_PAGE_MIDDLE)
         let el2 = document.getElementById('middleContainer');

        if (el2) {
            if (!el2.querySelectorAll('.au-target').length) {
                this.templatingEngine.enhance({element: el2, bindingContext: this});
            }
        }

         $("#rightContainer").html(this.config.HOME_PAGE_RIGHT)
         let el3 = document.getElementById('rightContainer');

        if (el3) {
            if (!el3.querySelectorAll('.au-target').length) {
                this.templatingEngine.enhance({element: el3, bindingContext: this});
            }
        }

    }


}
