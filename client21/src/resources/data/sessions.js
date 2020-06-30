import { inject } from 'aurelia-framework';
import { DataServices } from './dataServices';
import { Utils } from '../utils/utils';

@inject(DataServices, Utils)
export class Sessions {

    SESSIONS_SERVICE = "sessions";
    SESSIONS_CONFIG_SERVICE = "semesterConfig";

    constructor(data, utils) {
        this.data = data;
        this.utils = utils;
    }

    async getSessionsArray(options) {
        var url = this.SESSIONS_SERVICE;
        url += options ? options : "";
        try {
            let serverResponse = await this.data.get(url);
            if (!serverResponse.error) {
                this.sessionsArray = serverResponse;
            } else {
                this.data.processError(serverResponse);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getSession(id) {
        let url = this.SESSIONS_SERVICE + '/' + id;
        try {
            let serverResponse = await this.data.get(url);
            if (!serverResponse.error) {
                this.selectedSession = serverResponse;
                this.originalSession = this.utils.copyObject(serverResponse);
            } else {
                this.data.processError(serverResponse);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getSessionParameters() {
        var url = this.SESSIONS_CONFIG_SERVICE;
        try {
            let serverResponse = await this.data.get(url);
            if (!serverResponse.error) {
                this.SESSION_PARAMS = serverResponse;
            } else {
                this.data.processError(serverResponse);
            }
        } catch (error) {
            console.log(error);
        }
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
                this.selectedSession = this.emptySession();
                this.originalSession = this.utils.copyObject(his.selectedSession);
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

    setSession(session) {
        this.selectedSession = session;
    }

    emptySession() {
        let newSessionObj = new Object();

        let today = new Date();
        let month = today.getMonth();
        let year = today.getFullYear();

        newSessionObj.session = "";
        newSessionObj.year = year;
        newSessionObj.startDate = today;
        newSessionObj.endDate = today;
        newSessionObj.requestsOpenDate = today;
        newSessionObj.sessionStatus = "Requests";

        return newSessionObj;
    }

    async saveSession() {
        if (!this.selectedSession) {
            return;
        }

        if (!this.selectedSession._id) {
            let serverResponse = await this.data.saveObject(this.selectedSession, this.SESSIONS_SERVICE, "post");
            if (!serverResponse.error) {
                this.sessionsArray.unshift(serverResponse);
            }
            return serverResponse;
        } else {
            var serverResponse = await this.data.saveObject(this.selectedSession, this.SESSIONS_SERVICE, "put");
            return serverResponse;
        }

    }

    async saveSessionConfig(saveSessionArray) {
        if (saveSessionArray) {
            let response = await this.data.saveObject(saveSessionArray, this.SESSIONS_CONFIG_SERVICE, "put")
            if (!response.error) {
                return response;
            } else {
                this.data.processError(response, "There was an error updating the configuration.");
            }
            return response;
        }
        return null;
    }

    isSessionDirty() {
        return this.utils.objectsEqual(this.selectedSession, this.originalSession);
    }
}
