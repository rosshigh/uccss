import {inject} from 'aurelia-framework';
import {DataServices} from './dataServices';
import {Utils} from '../utils/utils';
import {AppConfig} from '../../config/appConfig';

@inject(DataServices, Utils, AppConfig)
export class ClientRequests {
    editIndex;              //Index of selected product

    constructor(data, utils, config) {
        this.data = data;
        this.utils = utils;
        this.config = config;
    }

    async getClientRequestsArray(options, fields, refresh){
        if (!this.requestsArray || refresh) {
          var url = this.data.CLIENT_REQUESTS_SERVICES;
          url += options ? options : "";
            try {
                let serverResponse = await this.data.get(url);
                if (!serverResponse.error) {
                    this.requestsArray = serverResponse;
                } else {
                    return undefined;
                }
            } catch (error) {
                console.log(error);
                return undefined;
            }
        }
        return this.requestsArray;
    }

    async getActiveClientRequestsArray(personId, sessions){
        var url = this.data.CLIENT_REQUESTS_SERVICES;
        url += "/" + personId + "/" + sessions
        try {
            let serverResponse = await this.data.get(url);
            if (!serverResponse.error) {
                this.requestsArray = serverResponse;
            } else {
                return undefined;
            }
        } catch (error) {
            console.log(error);
            return undefined;
        }
        return this.requestsArray;

    }

    async getPersonClientRequestsArray(options, refresh){
        var url = this.data.CLIENT_REQUESTS_SERVICES;
        url += options ? options : "";
        try {
            let serverResponse = await this.data.get(url);
            if (!serverResponse.error) {
                this.requestsArray = serverResponse;
            } else {
                return undefined;
            }
        } catch (error) {
            console.log(error);
            return undefined;
        }
        return this.requestsArray;
    }

	 async getCurrentCount(options){
        var url = this.data.CLIENT_REQUESTS_SERVICES +'/current/count';
        url += options ? options : "";
        var response = await this.data.get(url);
        if (!response.error) {
            this.unassignedRequests = this.utils.countItems(this.config.UNASSIGNED_CLIENT_REQUEST, 'requestStatus', response);
            this.updatedRequests =  this.utils.countItems(this.config.UPDATED_CLIENT_REQUEST, 'requestStatus', response);
            this.customerActionRequests =  this.utils.countItems(this.config.CUSTOMER_ACTION_CLIENT_REQUEST, 'requestStatus', response);
            return response.count;
        } else {
            return null;
        }
    }

	async getSessionCount(sessionArray, numSessions, options, requestStatus){
        var url = this.data.CLIENT_REQUESTS_SERVICES;
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

	//Client Request Details
	async getClientRequestsDetailsArray(options, refresh){      
        if (!this.requestsArray || refresh) {
          var url = this.data.CLIENT_REQUEST_DETAILS;
          url += options ? options : "";
            try {
                let serverResponse = await this.data.get(url);
                if (!serverResponse.error) {
                    this.requestsDetailsArray = serverResponse;
                } else {
                    return undefined;
                }
            } catch (error) {
                console.log(error);
                return undefined;
            }
        }
        return this.requestsDetailsArray;
    }

    async getClientRequestsDetailFaccoArray(sessionId, institutionId){
        let serverResponse = await this.data.get(this.data.CLIENT_REQUEST_DETAILS + '/' + sessionId + '/' + institutionId);
        if (!serverResponse.error) {
            this.requestsDetailsArray = serverResponse;
        } else {
            return undefined;
        }
    }

    async getClientRequest(id){
         let serverResponse = await this.data.get(this.data.CLIENT_REQUEST_DETAILS + '/' + id);
        if (!serverResponse.error) {
            this.selectedRequest = serverResponse;
        } 
        return serverResponse;
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

    async selectRequestDetails(index){
        if(this.selectedRequest._id){
            if(index === undefined || index > this.selectedRequest.requestDetails.length-1){
                this.emptyRequestDetail();
            } else {
                this.selectedRequestDetail = this.selectedRequest.requestDetails[index];
                this.requestDetailIndex = index;
            }
            return this.selectedRequestDetail;
        }
    }

    selectRequestDetail(index){
          if(index === undefined || index > this.requestsDetailsArray.length - 1){
              this.emptyRequestDetail();
          } else {
              this.selectedRequestDetail = this.requestsDetailsArray[index];
              this.requestDetailIndex = index;
          }
          return this.selectedRequestDetail;
    }

    setSelectedRequestDetail(request){
      this.selectedRequestDetail = this.utils.copyObject(request);
    }

    emptyRequestDetail(){
        var newObj = new Object();;
        newObj.createdDate = this.utils.convertUTCDateToLocalDate(new Date());
        newObj.modifiedDate = this.utils.convertUTCDateToLocalDate(new Date());;
        newObj.requestStatus = this.config.UNASSIGNED_REQUEST_CODE;
        return newObj;
    }

    async saveRequest(email){
        if(!this.selectedRequest){
            return;
        }
var url =  this.data.CLIENT_REQUESTS_SERVICES;
        // var url = email ? this.data.CLIENT_REQUESTS_SERVICES + '?email=1' : this.data.CLIENT_REQUESTS_SERVICES;

        if(!this.selectedRequest._id){
            let serverResponse = await this.data.saveObject(this.selectedRequest, url, "post");
            if(!serverResponse.error){
                if(this.requestsArray){
                    this.requestsArray.push(this.selectedRequest);
                }
            }
            return serverResponse;
        } else {
            var serverResponse = await this.data.saveObject(this.selectedRequest, url, "put");
            if(!serverResponse.error){
                 if(this.requestsArray && this.editRequestIndex){
                    this.requestsArray[this.editRequestIndex]  = this.utils.copyObject(this.selectedRequest);
                 }
            }
            return serverResponse;
        }
    }

    async assignRequest(email){
        if(!this.selectedRequest){
            return;
        }
var url = this.data.CLIENT_REQUESTS_SERVICES + '/assign';
        // var url = email ? this.data.CLIENT_REQUESTS_SERVICES + '/assign/?email=1' : this.data.CLIENT_REQUESTS_SERVICES + '/assign';
         var serverResponse = await this.data.saveObject(this.selectedRequest, url, "put");
        if(!serverResponse.error){
                if(this.requestsArray && this.editRequestIndex){
                this.requestsArray[this.editRequestIndex]  = this.utils.copyObject(this.selectedRequest);
                }
        }
        return serverResponse;
    }

    isRequestDirty(obj){
      if(this.selectedRequest){
          if(!obj){
              var obj = this.emptyRequest();
          }
            var skip = ['audit'];
            return this.utils.objectsEqual(this.selectedRequest, obj, skip);
        }
        return new Array();
    }

    groupRequestsByInstitution(){
        if(!this.requestsDetailsArray) {
            return;
        }
        var sortedArray = this.requestsDetailsArray 
            .sort((a, b) => {
                var result = (a['requestId'].institutionId < b['requestId'].institutionId) ? -1 : (a['requestId'].institutionId > b['requestId'].institutionId) ? 1 : 0;
                return result;
            });

        this.analyticsResultArray = new Array();
        var instID = "";
        var numStatuses = this.config.REQUEST_STATUS.length;
        var templateObj = new Object();
        for(var i = 0; i < numStatuses; i++){
            templateObj[this.config.REQUEST_STATUS[i].code] = 0;
        }
        var that = this;
        sortedArray.forEach(function(item){
            if(item.requestId.institutionId != instID){
                instID = item.requestId.institutionId;
                var obj = that.utils.copyObject(templateObj);
                obj.institutionId = item.requestId.institutionId;
                that.analyticsResultArray.push(obj);
            }
            that.analyticsResultArray[that.analyticsResultArray.length-1][item.requestStatus] += 1;
        })
        
    }

    async sendCustomerMessage(message){
        var serverResponse = await this.data.saveObject(message, this.data.CUSTOMER_ACTION, "put");
        return serverResponse;
    }

    updateDetailStatuses(selectedRequestNo, status){
        this.requestsDetailsArray.forEach(item => {
            if(item.requestId.clientRequestNo == selectedRequestNo){
                if(item.requestStatus != this.config.ASSIGNED_REQUEST_CODE) item.requestStatus = status;
            }
        })
    }

    updateDetailStatus(id, status){
         this.requestsDetailsArray.forEach(item => {
            if(item.requestId._id == id){
                if(item.requestStatus != this.config.ASSIGNED_REQUEST_CODE) item.requestStatus = status;
            }
        })
    }

    lockRequest(obj){
        if(obj.requestId) {
            var response = this.data.saveObject(obj, this.data.CLIENT_REQUEST_LOCK_SERVICES, "post");
        }
    }

    async getRequestLock(id){
        var response = await this.data.get(this.data.CLIENT_REQUEST_LOCK_SERVICES + "/" + id);
        if (!response.error) {
                return response;
        } else {
                this.data.processError(response, "There was an error retrieving the help ticket lock.");
        }
    }

    removeRequestLock(id){
        var response = this.data.deleteObject(this.data.CLIENT_REQUEST_LOCK_SERVICES + "/" + id);
    }
}