import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {AppConfig} from '../../../config/appConfig';
import {AppState} from '../../../resources/data/appState';
import {SiteInfo} from '../../../resources/data/siteInfo';
import {Utils} from '../../../resources/utils/utils';
import moment from 'moment';

@inject(Router,  AppState, AppConfig, SiteInfo, Utils)
export class UsefulInfo {
    email = '';
    password = '';
    loginError = '';

    constructor(router, app, config, siteinfo, utils) {
        this.router = router;
        this.app = app;
        this.config = config;
        this.siteinfo = siteinfo;
        this.utils = utils;
    }

    async activate() {
        await this.getData();
    }

    async getData() {
        var currentDate = moment(new Date()).format("MM-DD-YYYY");
        var options = '?filter=[and]itemType|eq|ILNK:expiredDate|gt|' + currentDate + '&order=Category';
        await this.siteinfo.getInfoArray(true, options);

        this.linkArray = new Array();
        var category = "";
        for(var i = 0; i<this.siteinfo.siteArray.length; i++){
          if(this.siteinfo.siteArray[i].category != category){
            var obj = new Object();
            var j = i;
            obj.category = this.siteinfo.siteArray[i].category;
            category = this.siteinfo.siteArray[i].category;
            var objLinks = new Array();
            while (i<this.siteinfo.siteArray.length && this.siteinfo.siteArray[i].category == category){
              objLinks.push(this.siteinfo.siteArray[i]);
              i++;
            }
            i--;
            obj.links = objLinks;
            this.linkArray.push(obj);
          }
        };
    }
}
