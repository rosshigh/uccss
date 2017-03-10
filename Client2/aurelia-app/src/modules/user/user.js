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
import * as toastr from "toastr";

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

    this.reminders();
   
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
            this.sessions.getSessionsArray('?order=startDate'),
            this.siteinfo.getInfoArray(true, options)
            ]);
            this.showRequests = this.requests.updatedRequests + this.requests.unassignedRequests;
            this.showHelpTickets = this.helpTickets.newHelpTickets;
    } else {
        var countOptions = '?filter=institutionId|eq|' + this.userObj.institutionId;
        this.countHeader = "Your Institution's Recent Request History";
        let responses = await Promise.all([
            this.helpTickets.getCurrentCount('?filter=personId|eq|'+ this.userObj._id),
            this.requests.getCurrentCount('?filter=audit[0].personId|eq|' + this.userObj._id),
            this.sessions.getSessionsArray('?order=startDate'),
            this.siteinfo.getInfoArray(true, options)  
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

  openAlert(alert){
    this.alert = alert;
    $(".hoverProfile").css("top", 100);
    $(".hoverProfile").css("left", 100);
    $(".hoverProfile").css("display", "block");
    sessionStorage.setItem('alert',true);
  }
  
  hideAlert(){
     $(".hoverProfile").css("display", "none");
  }

    async reminders(){

        let response = await this.people.getRemindersArray('?filter=personId|eq|' + this.userObj._id, true);
        if(!response.error && this.people){
            toastr.options.closeButton = true;
            toastr.options.closeMethod = 'fadeOut';
            toastr.options.closeDuration = 300;
            toastr.options.closeEasing = 'swing';
            this.timeReminders = new Array();
            var now = new Date();
            var weekDay = now.getDay()
            var monthDay = now.getDate();
            this.reccurentReminders = new Array();
            this.people.remindersArray.forEach((item, index) => {
                switch(item.reminderType){
                     case "D":
                        if(!item.lastSeen || !moment(now).isSame(item.lastSeen,'day')) {
                            if(item.priority == 1){
                                toastr.error(item.note, "Reminder");
                            } else {
                                toastr.info(item.note, "Reminder");
                            }
                            item.lastSeen = now;
                            this.people.saveReminder(item, index);
                        }
                        break;
                    case "W":
                        if(item.reminderDay == weekDay && (!item.lastSeen || !moment(now).isSame(item.lastSeen,'day'))) {
                            if(item.priority == 1){
                                toastr.error(item.note, "Reminder");
                            } else {
                                toastr.info(item.note, "Reminder");
                            }
                            item.lastSeen = now;
                            this.people.saveReminder(item, index);
                        }
                        break;
                    case "M":
                        if(item.reminderDay == monthDay && (!item.lastSeen || !moment(now).isSame(item.lastSeen,'month'))) {
                            if(item.priority == 1){
                                toastr.error(item.note, "Reminder");
                            } else {
                                toastr.info(item.note, "Reminder");
                            }
                            item.lastSeen = now;
                            this.people.saveReminder(item, index);
                        }
                        break;
                    case "A":
                        if(moment(now).isSame(item.dateStartRemind,'day') && (!item.lastSeen || !moment(now).isSame(item.lastSeen,'month'))) {
                            if(item.priority == 1){
                                toastr.error(item.note, "Reminder");
                            } else {
                                toastr.info(item.note, "Reminder");
                            }
                            item.lastSeen = now;
                            this.people.saveReminder(item, index);
                        }
                        break;
                    case "T":
                    console.log(moment(now).isSame(item.dateStartRemind,'day') )
                    console.log(!moment(now).isSame(item.lastSeen,'month'))
                        if(moment(now).isSame(item.dateStartRemind,'day') && (!item.lastSeen || !moment(now).isSame(item.lastSeen,'month'))) {
                            let diff = moment(now).diff(item.dateStartRemind, 'minutes');
                            if(diff >= -15){
                                if(item.priority == 1){
                                    toastr.error(item.note, "Reminder");
                                } else {
                                    toastr.info(item.note, "Reminder");
                                }
                                item.lastSeen = now;
                                this.people.saveReminder(item, index);
                            } else {
                                this.timeReminders.push({item: item, index: index});
                            }
                        }
                }
            })

            if(this.timeReminders.length > 0){
                 setInterval(() => {
                    console.log('Checked reminders');
                    var now = new Date();
                    this.timeReminders.forEach(item => {
                        let diff = moment().diff(item.item.dateStartRemind, 'minutes');
                        if(item.priority == 1){
                            toastr.error(item.item.note, "Reminder");
                        } else {
                            toastr.info(item.note, "Reminder");
                        }
                        item.lastSeen = now;
                        this.people.saveReminder(item.item.item, item.index);
                    });
                    
                }, 10000);
            }

           
        }
    }
    
}