import {inject} from 'aurelia-framework';
import {DataServices} from './dataServices';
import {Utils} from '../utils/utils';
import {AppConfig} from '../../config/appConfig';

@inject(DataServices, Utils, AppConfig)
export class ClientRequests {

  CLIENT_REQUESTS_SERVICES = 'clientRequests';
  CLIENT_REQUEST_DETAILS='clientRequestsDetails';
  CLIENT_REQUEST_LOCK_SERVICES = 'clientRequestLocks';
  CUSTOMER_ACTION = 'clientRequests/customerAction';

    constructor(data, utils, config) {
        this.data = data;
        this.utils = utils;
        this.config = config;
    }

    async getClientRequestsArray(options, fields, refresh){
        if (!this.requestsArray || refresh) {
          var url = this.CLIENT_REQUESTS_SERVICES;
          url += options ? options : "";
            try {
                let serverResponse = await this.data.get(url);
                if (!serverResponse.error) {
                    this.requestsArray = serverResponse;
                }  else {
                    this.data.processError(serverResponse);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    async getActiveClientRequestsArray(personId, sessions){
        var url = this.CLIENT_REQUESTS_SERVICES;
        url += "/" + personId + "/" + sessions
        try {
            let serverResponse = await this.data.get(url);
            if (!serverResponse.error) {
                this.requestsArray = serverResponse;
            } else {
               this.requestsArray = new Array()
            }
        } catch (error) {
            console.log(error);
          
        }
    }

    async getCurrentCount(options){
       var url = this.CLIENT_REQUESTS_SERVICES +'/current/count';
       url += options ? options : "";
       var response = await this.data.get(url);
       if (!response.error) {
           this.unassignedRequests = this.utils.countItems(this.config.UNASSIGNED_REQUEST_CODE, 'requestStatus', response);
           this.updatedRequests =  this.utils.countItems(this.config.UPDATED_REQUEST_CODE, 'requestStatus', response);
           this.customerActionRequests =  this.utils.countItems(this.config.CUSTOMER_ACTION_REQUEST_CODE, 'requestStatus', response);
           return response.count;
       } else {
           return null;
       }
   }

    async getClientRequestsDetailsArray(options, refresh){
        if (!this.requestsArray || refresh) {
          var url = this.CLIENT_REQUEST_DETAILS;
          url += options ? options : "";
            try {
                let serverResponse = await this.data.get(url);
                if (!serverResponse.error) {
                    this.requestsDetailsArray = serverResponse;
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    async getClientRequestsDetailFaccoArray(sessionId, institutionId){
        let serverResponse = await this.data.get(this.CLIENT_REQUEST_DETAILS + '/' + sessionId + '/' + institutionId);
        if (!serverResponse.error) {
            this.requestsDetailsArray = serverResponse;
        } else {
            return undefined;
        }
    }

    async getSessionCount(sessionArray, numSessions, options, requestStatus){
      var url = this.CLIENT_REQUESTS_SERVICES;
      url += options ? options : "";
      var response = await this.data.get(url);
      if(!response.error){
          var sessions = new Array();
          var sessionCount = new Array();
          numSessions = numSessions < sessionArray.length ? numSessions : sessionArray.length - 1;
          for(var i = 0; i <= numSessions; i++){
              sessions.push(sessionArray[i]._id);
              sessionCount.push({count: 0, session: sessionArray[i].session});
          }
          requestStatus = requestStatus ? requestStatus.split(':') : undefined;
          response.forEach((request) => {
              var index = sessions.indexOf(request.sessionId);
              if( index > -1){
                  if(requestStatus){
                      request.requestDetails.forEach((detail) => {
                          if(requestStatus.indexOf(detail.requestStatus) > -1) {
                              sessionCount[index].count += 1;
                          }
                      });
                  } else {
                      sessionCount[index].count += request.requestDetails.length;
                  }

              }
          });
         return sessionCount;
      }
  }
}
