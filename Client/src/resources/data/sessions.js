import {inject} from 'aurelia-framework';
import {DataServices} from './dataServices';
import {Utils} from '../utils/utils';
import {AppConfig} from '../../config/appConfig';
import moment from 'moment';

@inject(DataServices, Utils, AppConfig)
export class Sessions {
    newSession = false;      //Is the selected product a new product
    editIndex;              //Index of selected product
    dataType;               //The last type of request to the server
    state = null;

    constructor(data, utils, config) {
        this.data = data;
        this.utils = utils;
        this.config = config;
    }

    async getSessionsArray(refresh, options) {
        if (!this.sessionsArray || refresh) {
            var url = this.data.SESSIONS_SERVICE;
            url += options ? options : "";
            try {
                let serverResponse = await this.data.get(url);
                if (!serverResponse.status) {
                    this.sessionsArrayInternal = serverResponse;
                    for (var i = 0, x = this.sessionsArrayInternal.length; i < x; i++) {
                        this.sessionsArrayInternal[i].baseIndex = i;
                    }
                    this.sessionsArray = serverResponse;
                    if(options.sortProp){
                        console.log(this.sessionsArray)
                        this.sessionsArray =  this.sortArray(this.sessionsArrayInternal, options.sortProp, options.direction);
                        console.log(this.sessionsArray)
                    }
                } else {
                    return undefined;
                }
            } catch (error) {
                console.log(error);
                return undefined;
            }
        }
        this.state = 'full';
        return this.sessionsArray;
    }

    async getActiveSessions() {
        if(!this.sessionsInternalArray) await this.getSessionsArray(true,"","",true);

        this.filters = new Array();
        this.sort = new Array();

        this.filters.push({property: 'sessionStatus', value: 'Active:Requests', compound: 'or'});
        this.sort.push({property: "startDate", direction: 'DSC'})
        this.filter();

    }

    async getActiveNextSessions(refresh, options) {
        if(!this.sessionsInternalArray) await this.getSessionsArray(true,options,"",true);

        this.filters = new Array();
        this.sort = new Array();

        this.filters.push({property: 'sessionStatus', value: 'Active:Requests:Next', compound: 'or'});
        this.sort.push({property: "startDate", direction: 'DSC'})
        this.filter();

    }

    selectSession(index) {
        if (!index && index != 0) {
            this.selectedSession = this.emptySession();
        } else {
            try {
                this.selectedSession = this.utils.copyObject(this.sessionsArray[index]);
                this.editIndex = index;
            } catch (error) {
                console.log(error);
                this.selectedSession = this.emptySesssion();
                this.newSession = true;
            }

        }

    }

    selectSessionById(id){
      this.selectedSession = null;
      for(var i = 0; i < this.sessionsArrayInternal.length; i++){
        if(this.sessionsArrayInternal[i]._id === id){
          this.selectedSession = this.utils.copyObject(this.sessionsArrayInternal[i]);
          break;
        }
      }
    }

    emptySession() {
        var newSessionObj = new Object();
        newSessionObj.session = "";
        newSessionObj.year = "";
        newSessionObj.startDate = "";
        newSessionObj.endDate = "";
        newSessionObj.requestsOpenDate = "";
        newSessionObj.sessionStatus = "Next";

        var nextSession = -1;
        //Search for the most recent session and set the next session
        if(!this.sessionsArrayInternal[0]){
            var today = new Date();
            var month = today.getMonth();
            nextSession = 1;
            for (var i = 0, x = this.config.SESSION_PARAMS.length; i < x; i++) {
                if(month >= this.config.SESSION_PARAMS[i].startMonth && month <= this.config.SESSION_PARAMS[i].endMonth ){
                    nextSession = i + 1;
                    break;
                }
            }

        } else {
            for (var i = 0, x = this.config.SESSION_PARAMS.length; i < x; i++) {
                if (this.sessionsArrayInternal[0].session === this.config.SESSION_PARAMS[i].session) {
                    nextSession = i + 1;
                    break;
                }
            }
        }

        //If the next session is the fifth session then set it to the first session
        if (nextSession === 4) nextSession = 0;
        //Set the session name
        newSessionObj.session = this.config.SESSION_PARAMS[nextSession].session;
        //And the year
        var thisYear = new Date().getFullYear();
        newSessionObj.year = thisYear;
        if (nextSession === 3) {
            newSessionObj.year = thisYear + "/" + (parseInt(thisYear) + 1);
        }

        //Set the dates
        newSessionObj.startDate = thisYear + "-" + this.config.SESSION_PARAMS[nextSession].startMonth + "-" + this.config.SESSION_PARAMS[nextSession].startDay;
        if (nextSession === 3){
            thisYear = parseInt(thisYear) + 1;
            newSessionObj.endDate = thisYear + "-" + this.config.SESSION_PARAMS[nextSession].endMonth + "-" + this.config.SESSION_PARAMS[nextSession].endDay;
        } else {
            newSessionObj.endDate = thisYear + "-" + this.config.SESSION_PARAMS[nextSession].endMonth + "-" + this.config.SESSION_PARAMS[nextSession].endDay;
        }
        newSessionObj.requestsOpenDate = thisYear + "-" + this.config.SESSION_PARAMS[nextSession].openMonth + "-" + this.config.SESSION_PARAMS[nextSession].openDay;

        return newSessionObj;
    }

    async saveSession() {
        if (!this.selectedSession) {
            return;
        }

        if (!this.selectedSession._id) {
            let serverResponse = await this.data.saveObject(this.selectedSession, this.data.SESSIONS_SERVICE, "post");
            if (!serverResponse.status) {
                this.sessionsArrayInternal.push(serverResponse);
                this.sessionsArray = this.sessionsArrayInternal;
            }
            return serverResponse;
        } else {
            var serverResponse = await this.data.saveObject(this.selectedSession, this.data.SESSIONS_SERVICE, "put");
            if (!serverResponse.status) {
                 this.sessionsArrayInternal[this.sessionsArray[this.editIndex].baseIndex] = Object.assign(this.selectedSession);
                 this.sessionsArray = this.sessionsArrayInternal;
                // this.sessionsArray[this.editIndex] = Object.assign(this.selectedSession);// this.utils.copyObject(this.selectedSession, this.sessionsArray[this.editIndex]);
                // this.sessionsArrayInternal[this.sessionsArray[this.editIndex].baseIndex] = this.utils.copyObject(this.selectedSession, this.sessionsArrayInternal[this.sessionsArray[this.editIndex].baseIndex]);
            }
            return serverResponse;
        }

    }

     isDirty(){

        if(this.selectedSession){
            if(this.selectedSession._id){
                var obj = this.sessionsArray[this.editIndex];
            } else {
                var obj = this.emptySession();
            }
            return this.utils.objectsEqual(this.selectedSession, obj);
        }
    }

    filter() {
        var keep;
        var index = 0;
        var filters = this.filters;
        this.sessionsArray = this.sessionsArrayInternal.filter((item) => {
            //Assume the item should be eliminated
            keep = false;
            //For each filter in filterValues
            for (var i = 0, x = filters.length; i < x; i++) {
                switch (filters[i].compound){
                    case 'or':
                        var values = filters[i].value.split(':');
                        for(var j = 0; j < values.length; j++){
                            keep = keep || item[filters[i].property] === values[j];
                        }
                        break;
                    case 'and':
                    break;
                    default:
                }

                if (!keep) break;
            }
            return keep;
        })

        if (this.sort && this.sort.length) {
            this.sessionsArray = this.sortArray();
        }
    }

    sortArray() {
        var sortDirection = this.sort[0].direction == "ASC" ? 1 : -1;
        var propName = this.sort[0].property;
        return  this.sessionsArray
            .sort((a, b) => {
                return ((a[propName] < b[propName]) ? -1 : (a[propName] > b[propName]) ? 1 : 0) * sortDirection;
            });
    }

}
