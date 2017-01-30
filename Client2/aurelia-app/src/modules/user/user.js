import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";
import {Utils} from '../../resources/utils/utils';
import {AppConfig} from '../../config/appConfig';
import {SiteInfo} from '../../resources/data/siteInfo';
import {Sessions} from '../../resources/data/sessions';
import {HelpTickets} from '../../resources/data/helpTickets';
import {ClientRequests} from '../../resources/data/clientRequests';
import moment from 'moment';

// @inject(Router, Utils, AppConfig, AppState, SiteInfo, Sessions, HelpTickets, ClientRequests)
@inject(Router, Utils, AppConfig, SiteInfo, Sessions, HelpTickets, ClientRequests)
export class User {

  constructor(router, utils, config, siteinfo, sessions, helpTickets, requests){
//   , app, siteinfo, sessions, helpTickets, requests) {
    this.router = router;
    this.utils = utils;
    this.config = config;
    this.siteinfo = siteinfo;
    this.sessions = sessions;
    this.helpTickets = helpTickets;
    this.requests = requests;
  };

  attached(){
    $('.carousel').carousel({
        interval: 10000
    });
    this.updateTwitter(document,"script","twitter-wjs");
  }

  updateTwitter(d,s,id){
      var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';
      if(!d.getElementById(id)){
          js=d.createElement(s);
          js.id=id;
          js.src=p+"://platform.twitter.com/widgets.js";
          fjs.parentNode.insertBefore(js,fjs);
        }
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
    this.userObj = JSON.parse(sessionStorage.getItem('user'));
    var currentDate = moment(new Date()).format("MM-DD-YYYY");
    var options = '?filter=expiredDate|gt|' + currentDate + '&order=sortOrder';
    if(this.userObj.userRole >= this.config.UCC_ROLE){
        var countOptions = '';
        this.countHeader = "Recent Request History";
        let responses = await Promise.all([
            this.helpTickets.getCurrentCount(),
            this.requests.getCurrentCount(),  
            this.requests.getClientRequestsDetailsArray('?filter=institutionId|eq|' + this.userObj.institutionId, true),
            this.sessions.getSessionsArray(false),
            this.siteinfo.getInfoArray(false, options)
            ]);
            this.showRequests = this.requests.updatedRequests + this.requests.unassignedRequests;
            this.showHelpTickets = this.helpTickets.newHelpTickets;
    } else {
        var countOptions = '?filter=institutionId|eq|' + this.userObj.institutionId;
        this.countHeader = "Your Institution's Recent Request History";
        let responses = await Promise.all([
            this.helpTickets.getCurrentCount('?filter=personId|eq|'+ this.userObj._id),
            this.requests.getCurrentCount('?filter=audit[0].personId|eq|' + this.userObj._id),
            this.sessions.getSessionsArray(false),
            this.siteinfo.getInfoArray(false, options)  
        ]);
        this.showRequests = this.requests.customerActionRequests;
        this.showHelpTickets = this.helpTickets.customerActionHelpTickets;
    }
    this.requestsCount = new Array();
    this.countLabels = new Array();
    var requestCountArray = await this.requests.getSessionCount(this.sessions.sessionsArray, 4, countOptions);
    if(requestCountArray){
        requestCountArray.forEach((item) => {
            this.requestsCount.push(item.count);
            this.countLabels.push(item.session);
        })
    } 

    this.temp = undefined;
    if(!sessionStorage.getItem('weather')){
            let weather = await this.siteinfo.getWeather(this.userObj.city);
            this.temp = (parseFloat(weather.main.temp) - 273.15).toFixed(1);
            this.temp = this.temp + "\u00b0 C";
            this.weatherIcon = "http://openweathermap.org/img/w/" + weather.weather[0].icon + ".png";
            var weatherObj = {temp: this.temp, url: this.weatherIcon};
            sessionStorage.setItem('weather',JSON.stringify(weatherObj));
        } else {
            let weather = JSON.parse(sessionStorage.getItem('weather'));
             this.temp = weather.temp;
            this.weatherIcon = weather.url; 
        }
        let uccweather = JSON.parse(sessionStorage.getItem('uccweather'));
        this.ucctemp = (parseFloat(uccweather.temp) - 273.15).toFixed(1) + "\u00b0 C";
        this.uccweatherIcon = "http://openweathermap.org/img/w/" + uccweather.icon + ".png";
  }

  moreInfoExists(item){
      return item.url && item.url.length > 0;
  }
  
    
}