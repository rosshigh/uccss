import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";
import {Utils} from '../../resources/utils/utils';
import {AppConfig} from '../../config/appConfig';
import {SiteInfo} from '../../resources/data/siteInfo';
import {Sessions} from '../../resources/data/sessions';
import {People} from '../../resources/data/people';
import {HelpTickets} from '../../resources/data/helpTickets';
import {ClientRequests} from '../../resources/data/clientRequests';
import moment from 'moment';

@inject(Router, Utils, AppConfig, SiteInfo, Sessions, HelpTickets, ClientRequests, People)
export class User {

  constructor(router, utils, config, siteinfo, sessions, helpTickets, requests, people){
    this.router = router;
    this.utils = utils;
    this.config = config;
    this.siteinfo = siteinfo;
    this.sessions = sessions;
    this.helpTickets = helpTickets;
    this.requests = requests;
    this.people = people;
  };

  attached(){
    $('.carousel').carousel({
        interval: 10000
    });

    this.updateTwitter(document,"script","twitter-wjs");

    this.alertIndex = this.utils.arrayContainsValue(this.siteinfo.siteArray, "itemType", "ALRT");
    if(!sessionStorage.getItem('alert')){
        if(this.alertIndex > -1){
            this.openAlert(this.siteinfo.siteArray[this.alertIndex]);
        }
    }
  }

  updateTwitter(d,s,id){
    var js, fjs = d.getElementsByTagName(s)[0],
        t = window.twttr || {};
    if (d.getElementById(id)) return t;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);

    t._e = [];
    t.ready = function(f) {
        t._e.push(f);
    };

  return t;
  }

  async activate(){
    await this.getData();
    this.config.getConfig(true);

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
            this.requests.getClientRequestsDetailsArray('?filter=institutionId|eq|' + this.userObj.institutionId._id, true),
            this.sessions.getSessionsArray('?order=startDate'),
            this.siteinfo.getInfoArray(true, options),
             this.config.getConfig()
          ]);
          this.showRequests = this.requests.updatedRequests + this.requests.unassignedRequests;
          this.showHelpTickets = this.helpTickets.newHelpTickets;
          this.showCarousel = this.siteinfo.showCarousel();
    } else {
        var countOptions = '?filter=institutionId|eq|' + this.userObj.institutionId._id;
        this.countHeader = "Your Institution's Recent Request History";
        let responses = await Promise.all([
          this.helpTickets.getCurrentCount('?filter=personId|eq|'+ this.userObj._id),
          this.requests.getCurrentCount('?filter=audit[0].personId|eq|' + this.userObj._id),
          this.sessions.getSessionsArray('?order=startDate'),
          this.siteinfo.getInfoArray(true, options),
           this.config.getConfig()
        ]);
        this.showRequests = this.requests.customerActionRequests;
        this.showHelpTickets = this.helpTickets.customerActionHelpTickets;
        this.showCarousel = this.siteinfo.showCarousel();
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
            if(this.userObj.postalCode){
            let weather = await this.siteinfo.getWeather(this.userObj.institutionId.postalCode); 
            this.temp =  (parseFloat(weather.main.temp) - 273.15);
            if(this.config.TEMP_SCALE == 'C'){
                this.temp = this.temp.toFixed(1) + "\u00b0 C";
            } else {
                this.temp = (parseFloat(this.temp) * 1.8 + 32).toFixed(1) + "\u00b0 F";
            }
            this.weatherIcon = this.config.IMG_DOWNLOAD_URL + "icons/" +  weather.weather[0].icon + ".png";
            var weatherObj = {temp: this.temp, url: this.weatherIcon};
            sessionStorage.setItem('weather', JSON.stringify(weatherObj));
        }
    } else {
        let weather = JSON.parse(sessionStorage.getItem('weather'));
        this.temp = weather.temp;
        this.weatherIcon = weather.url;
    }
    if(sessionStorage.getItem('uccweather')){
        let uccweather = JSON.parse(sessionStorage.getItem('uccweather'));
        this.ucctemp = (parseFloat(uccweather.temp) - 273.15);
        if(this.config.TEMP_SCALE == 'C'){
            this.ucctemp = this.ucctemp.toFixed(1) + "\u00b0 C";
        } else {
            this.ucctemp = (parseFloat(this.ucctemp) * 1.8 + 32).toFixed(1) + "\u00b0 F";
        }
        this.uccweatherIcon = this.config.IMG_DOWNLOAD_URL  + 'icons/' + uccweather.icon + ".png";
        console.log(this.uccweatherIcon)
    }

  }

  moreInfoExists(item){
      return item.url && item.url.length > 0;
  }

}
