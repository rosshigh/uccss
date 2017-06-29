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
  CLIENT_REQIEST_EMAIL = "clientRequests/sendMail";

    constructor(data, utils, config) {
        this.data = data;
        this.utils = utils;
        this.config = config;
    }

    async getClientRequestsArray(options, refresh){
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

    selectRequest(index){
        if (index === undefined) {
            this.selectedRequest = this.emptyRequest();
        } else {
            try {
                this.selectedRequest = this.utils.copyObject(this.requestsArray[index]);
                this.editRequestIndex = index;
            } catch (error) {
                console.log(error);
                this.selectedRequest = this.emptyRequest();
            }

        }
    }

    selectRequstById(id){
      this.selectedRequest = null;
      for(var i = 0; i < this.requestsArray.length; i++){
        if(this.requestsArray[i]._id === id){
          this.selectedRequest = this.utils.copyObject(this.requestsArray[i]);
           this.editRequestIndex = i;
          break;
        }
      }
    }

    setSelectedRequest(request){
      this.selectedRequest = this.utils.copyObject(request);
    }

    emptyRequest(){
        var newObj = new Object();;
        newObj.requestStatus = this.config.UNASSIGNED_REQUEST_CODE;
        newObj.undergradIds = 0;
        newObj.graduateIds = 0;
        newObj.startDate = "";
        newObj.endDate = "";
        newObj.addUndergraduates = 0;
        newObj.addGraduates = 0;
        newObj.comments = "";
        newObj.requestDetails = new Array();
        newObj.audit = new Array();
        newObj.audit.push({
            event: 'Created',
            eventDate: new Date(),
            personId: ""
        })
        return newObj;
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

    async saveRequest(email){
        if(!this.selectedRequest){
            return;
        }
        var url =  this.CLIENT_REQUESTS_SERVICES;

        if(!this.selectedRequest._id){
            let serverResponse = await this.data.saveObject(this.selectedRequest, url, "post");
            if(!serverResponse.error){
                if(email.email){
                    email.clientRequestNo = serverResponse.clientRequestNo;
                    email.reason = 1;
                    this.data.saveObject(email, this.CLIENT_REQIEST_EMAIL, "post");
                }
                if(this.requestsArray){
                    this.requestsArray.push(this.selectedRequest);
                }
            }
            return serverResponse;
        } else {
            var serverResponse = await this.data.saveObject(this.selectedRequest, url, "put");
            if(!serverResponse.error){
                 if(email.email){
                    email.requestNo = this.selectedRequest.requestNo;
                     email.reason = 2;
                    this.data.saveObject(email, this.CLIENT_REQIEST_EMAIL, "post");
                }
                if(this.requestsArray && this.editRequestIndex){
                    this.requestsArray[this.editRequestIndex]  = this.utils.copyObject(this.selectedRequest);
                }
            }
            return serverResponse;
        }
    }

    setSelectedRequestDetail(request){
      this.selectedRequestDetail = this.utils.copyObject(request);
    }

    emptyRequestDetail(){
        var newObj = new Object();;
        newObj.createdDate = new Date();
        newObj.modifiedDate = new Date();
        newObj.requestStatus = this.config.UNASSIGNED_REQUEST_CODE;
        return newObj;
    }

    async getClientRequest(id){
         let serverResponse = await this.data.get(this.CLIENT_REQUEST_DETAILS + '/' + id);
        if (!serverResponse.error) {
            this.selectedRequest = serverResponse;
        } 
        return serverResponse;
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

    lockRequest(obj){
        if(obj.requestId) {
            var response = this.data.saveObject(obj, this.CLIENT_REQUEST_LOCK_SERVICES, "post");
        }
    }

    async getRequestLock(id){
        var response = await this.data.get(this.CLIENT_REQUEST_LOCK_SERVICES + "/" + id);
        if (!response.error) {
                return response;
        } else {
                this.data.processError(response, "There was an error retrieving the help ticket lock.");
        }
    }

    async removeRequestLock(id){
        await this.data.deleteObject(this.CLIENT_REQUEST_LOCK_SERVICES + "/" + id);
    }
}
