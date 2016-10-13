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
        value: this.helpTickets.underReviewHelpTickets || 0,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Under Review"
    },
    {
        value: this.helpTickets.customerActionHelpTickets || 0,
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
          this.requests.getClientRequestsDetailsArray(true,'?filter=institutionId|eq|' + this.app.user.institutionId),
          this.sessions.getSessionsArray(false, '?filter=[or]sessionStatus|Active:Requests:Next&order=startDate' ),
          this.siteinfo.getInfoArray(false, options)
        ]);
    } else {
      let responses = await Promise.all([
          this.helpTickets.getCurrentCount('?filter=personId|eq|'+ this.app.user._id),
          this.requests.getCurrentCount('?filter=audit[0].personId|eq|' + this.app.user._id),
          this.sessions.getSessionsArray(false, '?filter=[or]sessionStatus|Active:Requests:Next&order=startDate' ),
          this.siteinfo.getInfoArray(false, options),  
      ]);
    }
    this.temp = undefined;
    if(!localStorage.getItem('weather')){
            let weather = await this.siteinfo.getWeather(this.app.user.city);
             this.temp = (parseFloat(weather.main.temp) - 273.15).toFixed(1);
            this.temp = this.temp + "\u00b0 C";
            this.weatherIcon = "http://openweathermap.org/img/w/" + weather.weather[0].icon + ".png";
            var weatherObj = {temp: this.temp, url: this.weatherIcon};
            localStorage.setItem('weather',JSON.stringify(weatherObj));
        } else {
            let weather = JSON.parse(localStorage.getItem('weather'));
             this.temp = weather.temp;
            this.weatherIcon = weather.url; //"http://openweathermap.org/img/w/" + weather.weather[0].icon + ".png";
        }
        let uccweather = JSON.parse(localStorage.getItem('uccweather'));
        this.ucctemp = (parseFloat(uccweather.temp) - 273.15).toFixed(1) + "\u00b0 C";
        this.uccweatherIcon = "http://openweathermap.org/img/w/" + uccweather.icon + ".png";
  }
  
    
}