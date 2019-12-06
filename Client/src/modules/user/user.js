import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";
import {Utils} from '../../resources/utils/utils';
import {AppConfig} from '../../config/appConfig';
import {SiteInfo} from '../../resources/data/siteInfo';
import {Sessions} from '../../resources/data/sessions';
import {People} from '../../resources/data/people';
import {HelpTickets} from '../../resources/data/helpTickets';
import {ClientRequests} from '../../resources/data/clientRequests';
import {APJClientRequests} from '../../resources/data/apjClientRequests';
import {Events} from '../../resources/data/events';
import moment from 'moment';

@inject(Router, Utils, AppConfig, SiteInfo, Sessions, HelpTickets, ClientRequests, People, APJClientRequests, Events)
export class User {

  constructor(router, utils, config, siteinfo, sessions, helpTickets, requests, people, events, apjRequests){
    this.router = router;
    this.utils = utils;
    this.config = config;
    this.siteinfo = siteinfo;
    this.sessions = sessions;
    this.helpTickets = helpTickets;
    this.requests = requests;
    this.people = people;
    this.apjRequests = apjRequests;
    this.events = events;

    this.userObj = JSON.parse(sessionStorage.getItem('user'));
  };

  attached(){
    $('.carousel').carousel({
        interval: 10000
    });

    // this.updateTwitter(document,"script","twitter-wjs");

    this.alertIndex = this.utils.arrayContainsValue(this.siteinfo.siteArray, "itemType", "ALRT");
    if(!sessionStorage.getItem('alert')){
        if(this.alertIndex > -1){
            this.openAlert(this.siteinfo.siteArray[this.alertIndex]);
        }
    }

    $("#notice").fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  }

  canActivate(){
    if(!this.userObj) {
        this.userObj = this.config.user;
        if(!this.userObj) {
            this.utils.showNotification("Couldn't find your user information.  Try logging in again or call the UCC.");
            this.router.navigate("home");
        }
    }
  }   

  async activate(){
    await this.getData();
    this.config.getConfig(true);
    // this.getEvents();

    // this.helpTicketArray = [
    //     {
    //         value: this.helpTickets.newHelpTickets || 0,
    //         color:"#F7464A",
    //         highlight: "#FF5A5E",
    //         label: "New"
    //     },
    //     {
    //         value: this.helpTickets.underReviewHelpTickets || 0,
    //         color: "#46BFBD",
    //         highlight: "#5AD3D1",
    //         label: "Under Review"
    //     },
    //     {
    //         value: this.helpTickets.customerActionHelpTickets || 0,
    //         color: "#FDB45C",
    //         highlight: "#FFC870",
    //         label: "Customer Action"
    //     }
    // ]

    // this.clientRequestsArray = [
    //     {
    //         value: this.requests.unassignedRequests || 0,
    //         color:"#F7464A",
    //         highlight: "#FF5A5E",
    //         label: "Unassigned"
    //     },
    //     {
    //         value: this.requests.updatedRequests || 0,
    //         color: "#46BFBD",
    //         highlight: "#5AD3D1",
    //         label: "Updated"
    //     },
    //     {
    //         value: this.requests.customerActionRequests || 0,
    //         color: "#FDB45C",
    //         highlight: "#FFC870",
    //         label: "Customer Action"
    //     }
    // ]

  }

  async getData(){
    // let apjUnassignedRequests = await this.apjRequests.getClientRequestsDetailsArray('?filter=requestStatus|eq|1',true);
    var currentDate = moment(new Date()).format("MM-DD-YYYY");
    var options = '?filter=expiredDate|gt|' + currentDate + '&order=sortOrder';
    if(this.userObj.userRole >= this.config.UCC_ROLE){
        // var countOptions = '';
        // this.countHeader = "Recent Request History";
        let responses = await Promise.all([
            // this.helpTickets.getCurrentCount(),
            // this.requests.getCurrentCount(),
            // this.requests.getClientRequestsDetailsArray('?filter=institutionId|eq|' + this.userObj.institutionId._id, true),
            this.sessions.getSessionsArray('?order=startDate'),
            this.siteinfo.getInfoArray(true, options),
             this.config.getConfig()
          ]);
        //   this.showRequests = this.requests.updatedRequests + this.requests.unassignedRequests;
        //   this.showHelpTickets = this.helpTickets.newHelpTickets;
          this.showCarousel = this.siteinfo.showCarousel();
    } else {
        // var countOptions = '?filter=institutionId|eq|' + this.userObj.institutionId._id;
        // this.countHeader = "Your Institution's Recent Request History";
        let responses = await Promise.all([
        //   this.helpTickets.getCurrentCount('?filter=personId|eq|'+ this.userObj._id),
        //   this.requests.getCurrentCount('?filter=audit[0].personId|eq|' + this.userObj._id),
          this.sessions.getSessionsArray('?order=startDate'),
          this.siteinfo.getInfoArray(true, options),
           this.config.getConfig()
        ]);
        // this.showRequests = this.requests.customerActionRequests;
        // this.showHelpTickets = this.helpTickets.customerActionHelpTickets;
        this.showCarousel = this.siteinfo.showCarousel();
    }
    // this.requestsCount = new Array();
    // this.countLabels = new Array();
    // var requestCountArray = await this.requests.getSessionCount(this.sessions.sessionsArray, 4, countOptions);
    // if(requestCountArray){
    //     requestCountArray.forEach((item) => {
    //         this.requestsCount.push(item.count);
    //         this.countLabels.push(item.session);
    //     })
    // }

    this.temp = undefined;

    if(!sessionStorage.getItem('weather')){
            if(this.userObj.postalCode){
            let weather = await this.siteinfo.getWeather(this.userObj.institutionId.postalCode); 
            if(weather && weather.main){
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
    }

  }

   async getEvents(){
    this.eventArray = new Array();
    await this.events.getEventsArray('', true); 
    let today =  moment(new Date()).format('YYYY-MM-DD');
    this.events.eventArray.forEach(item => {
        if(item.personId === this.userObj._id || item.scope === 'u') {
            let start = moment(item.start).format('YYYY-MM-DD')
            let end = moment(item.end).format('YYYY-MM-DD')
            if(moment(today).isBetween(start, end)){
                 this.eventArray.push(item);
            } else if(moment(today).isSame(start)){
                 this.eventArray.push(item);
            }
        }
    })
   }

  moreInfoExists(item){
      return item.url && item.url.length > 0;
  }

}
