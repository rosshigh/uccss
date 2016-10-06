import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";
import {Utils} from '../../resources/utils/utils';
import {AppConfig} from '../../config/appConfig';
import {AppState} from '../../resources/data/appState';
import {SiteInfo} from '../../resources/data/siteInfo';
import {Sessions} from '../../resources/data/sessions';
import {HelpTickets} from '../../resources/data/helpTickets';
import {ClientRequests} from '../../resources/data/clientRequests';
import moment from 'moment';

@inject(Router, Utils, AppConfig, AppState, SiteInfo, Sessions, HelpTickets, ClientRequests)
export class User {

  constructor(router, utils, config, app, siteinfo, sessions, helpTickets, requests) {
    this.router = router;
    this.utils = utils;
    this.config = config;
    this.app = app;
    this.siteinfo = siteinfo;
    this.sessions = sessions;
    this.helpTickets = helpTickets;
    this.requests = requests;
  };
  
  canActivate(){
      if(!this.app.user._id) this.router.navigate('logout');
  }
  
  activate(){
    this.getData();
  }
  
  async getData(){
    // await this.siteinfo.getInfoArray(true, '?filter=itemType|eq|DLNK&order=sortOrder');
    if(this.app.userRole >= this.config.UCC_ROLE){
      await this.helpTickets.getCurrentCount();
      await this.requests.getCurrentCount();  
      var currentDate = moment(new Date()).format("MM-DD-YYYY");
      var options = '?filter=expiredDate|gt|' + currentDate + '&order=sortOrder';
      await this.sessions.getSessionsArray(true, '?filter=[or]sessionStatus|Active:Requests:Next&order=startDate' );
      await this.siteinfo.getInfoArray(true, options);
    } else {
      await this.helpTickets.getCurrentCount(this.app.user._id);
      await this.requests.getCurrentCount('?filter=audit[0].personId|eq|' + this.app.user._id);
      var currentDate = moment(new Date()).format("MM-DD-YYYY");
      var options = '?filter=expiredDate|gt|' + currentDate + '&order=sortOrder';
      await this.sessions.getSessionsArray(true, '?filter=[or]sessionStatus|Active:Requests:Next&order=startDate' );
      await this.siteinfo.getInfoArray(true, options);  
    }
    
  }
  
    
}