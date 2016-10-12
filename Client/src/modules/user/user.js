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
  
  async activate(){
    await this.getData();
    
    this.helpTicketArray = [
    {
        value: this.helpTickets.newHelpTickets || 0,
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "New"
    },
    {
        value: this.helpTickets.underReviewHelpTicketsUser || 0,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Under Review"
    },
    {
        value: this.helpTickets.customerActionHelpTicketsUser || 0,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "Customer Action"
    }
]

    this.clientRequestsArray = [
    {
        value: this.requests.unassignedRequests || 0,
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "Unassigned"
    },
    {
        value: this.requests.updatedRequests || 0,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Updated"
    },
    {
        value: this.requests.customerActionRequests || 0,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "Customer Action"
    }
]

  }
  
  async getData(){
    var currentDate = moment(new Date()).format("MM-DD-YYYY");
      var options = '?filter=expiredDate|gt|' + currentDate + '&order=sortOrder';
    if(this.app.userRole >= this.config.UCC_ROLE){
       let responses = await Promise.all([
          this.helpTickets.getCurrentCount(),
          this.requests.getCurrentCount(),  
          this.sessions.getSessionsArray(true, '?filter=[or]sessionStatus|Active:Requests:Next&order=startDate' ),
          this.siteinfo.getInfoArray(true, options)
       ]);
    } else {
      // var currentDate = moment(new Date()).format("MM-DD-YYYY");
      // var options = '?filter=expiredDate|gt|' + currentDate + '&order=sortOrder';
      let responses = await Promise.all([
          this.helpTickets.getCurrentCount(this.app.user._id),
          this.requests.getCurrentCount('?filter=audit[0].personId|eq|' + this.app.user._id),
          this.sessions.getSessionsArray(true, '?filter=[or]sessionStatus|Active:Requests:Next&order=startDate' ),
          this.siteinfo.getInfoArray(true, options),  
      ]);
    }
  }
  
    
}