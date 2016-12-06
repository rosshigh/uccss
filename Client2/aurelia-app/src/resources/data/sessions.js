import { inject } from 'aurelia-framework';
import { DataServices } from './dataServices';
import { Utils } from '../utils/utils';
import { AppConfig } from '../../config/appConfig';
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
                if (!serverResponse.error) {
                    this.sessionsArray = serverResponse;
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

    selectSessionById(id) {
        this.selectedSession = null;
        for (var i = 0; i < this.sessionsArray.length; i++) {
            if (this.sessionsArray[i]._id === id) {
                this.selectedSession = this.utils.copyObject(this.sessionsArray[i]);
                this.editIndex = i;
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

        let sessions = this.sessionsArray.sort((a,b) => {
            return moment(a.startDate).isBefore( b.startDate);
        });

        var nextSession = -1;
        //Search for the most recent session and set the next session
        if (!sessions[0]) {
            var today = new Date();
            var month = today.getMonth();
            nextSession = 1;
            for (var i = 0, x = this.config.SESSION_PARAMS.length; i < x; i++) {
                if (month >= this.config.SESSION_PARAMS[i].startMonth && month <= this.config.SESSION_PARAMS[i].endMonth) {
                    nextSession = i + 1;
                    break;
                }
            }

        } else {
            for (var i = 0, x = this.config.SESSION_PARAMS.length; i < x; i++) {
                if (sessions[0].session === this.config.SESSION_PARAMS[i].session) {
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
        let thisYear = parseInt(sessions[0].year);
        if(nextSession === 0) thisYear++;
        newSessionObj.year = thisYear;
        if (nextSession === 3) {
            newSessionObj.year = thisYear + "/" + (parseInt(thisYear) + 1);
        }

        //Set the dates
        newSessionObj.startDate = thisYear + "-" + this.config.SESSION_PARAMS[nextSession].startMonth + "-" + this.config.SESSION_PARAMS[nextSession].startDay;
        if (nextSession === 3) {
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
            if (!serverResponse.error) {
                this.sessionsArray.push(serverResponse);
            }
            return serverResponse;
        } else {
            var serverResponse = await this.data.saveObject(this.selectedSession, this.data.SESSIONS_SERVICE, "put");
            if (!serverResponse.error) {
                this.sessionsArray[this.editIndex] = this.utils.copyObject(this.selectedSession);
            }
            return serverResponse;
        }

    }

    isDirty() {

        if (this.selectedSession) {
            if (this.selectedSession._id) {
                var obj = this.sessionsArray[this.editIndex];
            } else {
                var obj = this.emptySession();
            }
            return this.utils.objectsEqual(this.selectedSession, obj);
        }
    }
}