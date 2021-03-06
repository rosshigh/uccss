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
  CLIENT_REQUEST_EMAIL = "clientRequests/sendMail";

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

    async getRequest(id){
         try {
            let serverResponse = await this.data.get(this.CLIENT_REQUESTS_SERVICES + "/" + id);
            if (!serverResponse.error) {
                this.selectedRequest = serverResponse;
            } else {
                this.selectedRequest = null;
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

    async getClientRequestsDetailsArrayAnalytics(options, refresh){
        if (!this.requestsArray || refresh) {
          var url = this.CLIENT_REQUEST_DETAILS + "/analytics"; 
          url += options ? options : "";
            try {
                let serverResponse = await this.data.get(url);
                if (!serverResponse.error) {
                    this.requestsDetailsArrayAnalytics = serverResponse;
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    async getClientRequestsDetailFaccoArray(sessionId, institutionId, refresh){
        if(!this.requestsDetailsArray || !this.requestsDetailsArray.length || refresh){
            let serverResponse = await this.data.get(this.CLIENT_REQUEST_DETAILS + '/' + sessionId + '/' + institutionId);
            if (!serverResponse.error) {
                this.requestsDetailsArray = serverResponse;
            } else {
                return undefined;
            }
        }
    }

    async saveRequestWithId(){
        if(!this.selectedRequest){
            return;
        }

        var serverResponse = await this.data.saveObject(this.selectedRequest, this.CLIENT_REQUESTS_SERVICES + "/" + this.selectedRequest._id, "put");
            if(!serverResponse.error){
                if(this.requestsArray && this.editRequestIndex){
                    this.requestsArray[this.editRequestIndex]  = this.utils.copyObject(this.selectedRequest);
                }
            }
            return serverResponse;
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
                    this.data.saveObject(email, this.CLIENT_REQUEST_EMAIL, "post");
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
                    this.data.saveObject(email, this.CLIENT_REQUEST_EMAIL, "post");
                }
                if(this.requestsArray && this.editRequestIndex){
                    this.requestsArray[this.editRequestIndex]  = this.utils.copyObject(this.selectedRequest);
                }
            }
            return serverResponse;
        }
    }

    async deleteAssignment(index){
         if(!this.selectedRequest){
            return;
        }
        var url =  this.CLIENT_REQUESTS_SERVICES + "/deleteAssignment";
        var serverResponse = await this.data.saveObject(this.selectedRequest, url, "put");
        if(!serverResponse.error){
            this.selectedRequestDetail = serverResponse;
            if(!this.selectedRequestDetail.requestId.courseId || this.selectedRequestDetail.requestId.courseId === null){
                this.selectedRequestDetail.requestId.courseId = {_id: this.config.SANDBOX_ID, name: this.config.SANDBOX_NAME};
            }
            this.requestsDetailsArray[index]  = this.utils.copyObject(this.selectedRequestDetail);
        }
        return serverResponse;

    }

    updateStatuses(updateIds, status){
        for(let i = 0; i < this.requestsDetailsArray.length; i++){
           if(updateIds.indexOf(this.requestsDetailsArray[i]._id) > -1){
               this.requestsDetailsArray[i].requestStatus = status;
               this.requestsDetailsArray[i].requestId.requestStatus = status;
           }
        }
    }

    async assignRequest(index, email){
        if(!this.selectedRequest){
            return;
        }
        var url = email ? this.CLIENT_REQUESTS_SERVICES + '/assign/?email=1' : this.CLIENT_REQUESTS_SERVICES + '/assign';
         var serverResponse = await this.data.saveObject(this.selectedRequest, url, "put");
        if(!serverResponse.error){
            if(email && email.email){
                this.data.saveObject(email, this.CLIENT_REQUEST_EMAIL, "post");
            }
            this.selectedRequestDetail = serverResponse;
            if(!this.selectedRequestDetail.requestId.courseId || this.selectedRequestDetail.requestId.courseId === null){
              this.selectedRequestDetail.requestId.courseId = {_id: this.config.SANDBOX_ID, name: this.config.SANDBOX_NAME};
            }
            this.requestsDetailsArray[index]  = this.utils.copyObject(this.selectedRequestDetail);
        }
        return serverResponse;
    }

    async deleteRequest(){
        if(!this.selectedRequestDetail._id){
            return;
        }

        if(this.selectedRequestDetail.requestId){
            let serverResponse = await this.data.deleteObject(this.CLIENT_REQUEST_DETAILS + '/' + this.selectedRequestDetail._id + '/' + this.selectedRequestDetail.requestId._id);
            if (!serverResponse.error) {
                this.requestsDetailsArray.splice(this.requestDetailIndex, 1);
                return serverResponse;
            } else {
                return undefined;
            }
        } else {
            let serverResponse = await this.data.deleteObject(this.CLIENT_REQUEST_DETAILS + '/' + this.selectedRequestDetail._id);
            if (!serverResponse.error) {
                this.requestsDetailsArray.splice(this.requestDetailIndex, 1);
                return serverResponse;
            } else {
                return undefined;
            }
        }
    }

    isRequestDirty(obj, skip){ 
      if(this.selectedRequest){
          if(!obj){
              var obj = this.emptyRequest();
          }
            if(!skip) skip = new Array();
            skip.push('audit');
            return this.utils.objectsEqual(this.selectedRequest, obj, skip);
        }
        return new Array();
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

    async getRequestDetail(id){
        
        let serverResponse = await this.data.get(this.CLIENT_REQUEST_DETAILS + "/" + id);
        if (!serverResponse.error) {
            this.selectedRequestDetail = serverResponse;
            
        } else {
            this.selectedRequestDetail = null;
        }
        return serverResponse;
    }

    selectRequestDetailFromId(id){
        this.requestsDetailsArray.forEach((item, index) => {
          if(item._id === id){
            this.selectedRequestDetail = this.utils.copyObject(item);
            this.requestDetailIndex = index;
            return;
          }
        });
        return null;
    }

    setTheSelectedRequestDetail(request){
      this.selectedRequestDetail = this.utils.copyObject(request);
      if(this.requestsDetailsArray) {
          for(let i = 0; i < this.requestsDetailsArray.length; i++){
              if(this.requestsDetailsArray[i]._id === request._id) {
                  this.requestDetailIndex = i;
                   break;
              }
          }
      }
    }

    emptyRequestDetail(){
        var newObj = new Object();;
        newObj.createdDate = new Date();
        newObj.modifiedDate = new Date();
        newObj.requestStatus = this.config.UNASSIGNED_REQUEST_CODE;
        return newObj;
    }

    async saveRequestDetail(){
        if(!this.selectedRequestDetail){ 
            return;
        }
        let response = await this.data.saveObject(this.selectedRequestDetail, this.CLIENT_REQUEST_DETAILS, "put");
        if(!response.error){
            this.selectedRequestDetail = response;
            if(!this.selectedRequestDetail.requestId.courseId || this.selectedRequestDetail.requestId.courseId === null){
              this.selectedRequestDetail.requestId.courseId = {_id: this.config.SANDBOX_ID, name: this.config.SANDBOX_NAME};
            }
            this.requestsDetailsArray[this.requestDetailIndex] = this.utils.copyObject(this.selectedRequestDetail);
            return response;
        }
    }

    isRequestDetailDirty(obj, skip){
      if(this.selectedRequestDetail){
          if(!obj){
              var obj = this.emptyRequestDetail();
          }
            var skip = skip ? skip : new Array();
            skip.push('audit');
            return this.utils.objectsEqual(this.selectedRequestDetail, obj, skip);
        }
        return new Array();
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

    async sendCustomerMessage(message){
        console.log(message)
        var serverResponse = await this.data.saveObject(message, this.CLIENT_REQUEST_EMAIL, "post");
        return serverResponse;
    }

    updateDetailStatuses(selectedRequestNo, status){
        this.requestsDetailsArray.forEach(item => {
            if(item.requestId && item.requestId.clientRequestNo == selectedRequestNo){
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

    async groupRequestsByInstitutionCountry(){
        if(!this.requestsDetailsArrayAnalytics) {
            return;
        }
        var sortedArray = new Array();
        this.requestsDetailsArrayAnalytics.forEach(item => {
            if(item['requestId'] &&  item['requestId'].institutionId && item['productId'] && item['productId'].name ){
                item.sortValue = item['requestId'].institutionId.name + item['productId'].name;
                sortedArray.push(item);
            } 
        });

        var sortedArray = this.requestsDetailsArrayAnalytics 
            .sort((a, b) => {
                var result = (a.sortValue < b.sortValue) ? -1 : (a.sortValue > b.sortValue) ? 1 : 0;
                return result;
            });

        this.analyticsInstitutionCountryResultArray = new Array(); 
        var instID = "";
        var templateObj = new Object();
        var that = this;
        sortedArray.forEach(function(item){
            // if(item.requestId){
                if(item.sortValue != instID){
                    instID = item.sortValue;
                    var obj = that.utils.copyObject(templateObj);
                    obj.name = item.requestId.institutionId.name;
                    obj.institutionId = item.requestId.institutionId._id;
                    obj.person = item.requestId.clientRequestsDetails.fullName;
                    obj.productName = item.productId.name;
                    obj.country = item.requestId.institutionId.country;
                    obj.total = 0;
                    obj.students = 0;
                    that.analyticsInstitutionCountryResultArray.push(obj);
                }
                // if(item.requestStatus != skip){
                    that.analyticsInstitutionCountryResultArray[that.analyticsInstitutionCountryResultArray.length-1]['total'] += 1;
                    that.analyticsInstitutionCountryResultArray[that.analyticsInstitutionCountryResultArray.length-1]['students'] += parseInt(item.requestId.undergradIds) + parseInt(item.requestId.graduateIds);
                    // var gradIds = item.requestId.graduateIds != null ? parseInt(item.requestId.graduateIds) : 0;
                    // var underIds = item.requestId.undergradIds != null ? parseInt(item.requestId.undergradIds) : 0;
                    // that.analyticsInstitutionResultArray[that.analyticsInstitutionResultArray.length-1]['studentIds'] += gradIds + underIds;
                    // that.analyticsInstitutionResultArray[that.analyticsInstitutionResultArray.length-1]['studentIds'] += parseInt(item.requestId.graduateIds) + parseInt(item.requestId.undergradIds);
                // }
                // that.analyticsInstitutionResultArray[that.analyticsInstitutionResultArray.length-1][item.requestStatus] += 1;
            // }
          
        })
    }

    async groupRequestsByInstitution(){
        if(!this.requestsDetailsArrayAnalytics) {
            return;
        }
        var sortedArray = this.requestsDetailsArrayAnalytics 
            .sort((a, b) => {
                if(!a['requestId'] || !b['requestId'] || !a['requestId'].institutionId || !b['requestId'].institutionId ) return -1;
                var result = (a['requestId'].institutionId.name < b['requestId'].institutionId.name) ? -1 : (a['requestId'].institutionId.name > b['requestId'].institutionId.name) ? 1 : 0;
                return result;
            });

        this.analyticsInstitutionResultArray = new Array();
        var instID = "";
        var numStatuses = this.config.REQUEST_STATUS.length;
        var templateObj = new Object();
         templateObj['total'] = 0;
         templateObj['studentIds'] = 0;
        for(var i = 0; i < numStatuses; i++){
            templateObj[this.config.REQUEST_STATUS[i].code] = 0;
            if(this.config.REQUEST_STATUS[i].description === "Cancelled") {
                var skip = this.config.REQUEST_STATUS[i].code;
            }
        }
        var that = this;
        sortedArray.forEach(function(item){
            if(item.requestId){
                if(item.requestId.institutionId && item.requestId.institutionId.name != instID){
                    instID = item.requestId.institutionId.name;
                    var obj = that.utils.copyObject(templateObj);
                    obj.name = item.requestId.institutionId.name;
                    obj.institutionId = item.requestId.institutionId._id;
                    that.analyticsInstitutionResultArray.push(obj);
                }
                if(item.requestStatus != skip){
                    that.analyticsInstitutionResultArray[that.analyticsInstitutionResultArray.length-1]['total'] += 1;
                    var gradIds = item.requestId.graduateIds != null ? parseInt(item.requestId.graduateIds) : 0;
                    var underIds = item.requestId.undergradIds != null ? parseInt(item.requestId.undergradIds) : 0;
                    that.analyticsInstitutionResultArray[that.analyticsInstitutionResultArray.length-1]['studentIds'] += gradIds + underIds;
                    // that.analyticsInstitutionResultArray[that.analyticsInstitutionResultArray.length-1]['studentIds'] += parseInt(item.requestId.graduateIds) + parseInt(item.requestId.undergradIds);
                }
                that.analyticsInstitutionResultArray[that.analyticsInstitutionResultArray.length-1][item.requestStatus] += 1;
            }
          
        })
        
    }

    groupRequestsByProduct(){
         if(!this.requestsDetailsArrayAnalytics) {
            return;
        }
        var sortedArray = this.requestsDetailsArrayAnalytics 
            .sort((a, b) => {
                if(!a.productId || !b.productId) return -1;
                var result = (a.productId.name < b.productId.name) ? -1 : (a.productId.name > b.productId.name) ? 1 : 0;
                return result;
            });

        this.analyticsProductsResultArray = new Array();
        var prodID = "";
        var numStatuses = this.config.REQUEST_STATUS.length;
        var templateObj = new Object();
        templateObj['total'] = 0;
        templateObj['studentIds'] = 0;
        for(var i = 0; i < numStatuses; i++){
            templateObj[this.config.REQUEST_STATUS[i].code] = 0;
            if(this.config.REQUEST_STATUS[i].description === "Cancelled") {
                var skip = this.config.REQUEST_STATUS[i].code;
            }            
        }

        sortedArray.forEach(item => {
            if(item.productId.name != prodID){ 
                prodID = item.productId.name;
                var obj = this.utils.copyObject(templateObj);
                obj.productId = item.productId;
                obj.country = item.requestId.institutionId.country;
                this.analyticsProductsResultArray.push(obj);
            }
            if(item.requestStatus != skip){
                this.analyticsProductsResultArray[this.analyticsProductsResultArray.length-1]['total'] += 1;
                var gradIds = item.requestId.graduateIds != null ? parseInt(item.requestId.graduateIds) : 0;
                var underIds = item.requestId.undergradIds != null ? parseInt(item.requestId.undergradIds) : 0;
                this.analyticsProductsResultArray[this.analyticsProductsResultArray.length-1]['studentIds'] += gradIds + underIds;
            }            
            this.analyticsProductsResultArray[this.analyticsProductsResultArray.length-1][item.requestStatus] += 1;
        })
    }

    fieldSorter(fields) {
        return (a, b) => fields.map(o => {
            let dir = 1;
            if (o[0] === '-') { dir = -1; o=o.substring(1); }
            return a[o] > b[o] ? dir : a[o] < b[o] ? -(dir) : 0;
        }).reduce((p,n) => p ? p : n, 0);
    }

    groupRequestsByCountry(){
        if(!this.requestsDetailsArrayAnalytics) {
            return;
        }

        var preSortedArray = this.requestsDetailsArrayAnalytics.forEach(item => {
            if(item.requestId.institutionId && item.requestId.institutionId.country && item.productId.name) {
                item.sortProperty = item.requestId.institutionId.country + item.productId.name;
            } else { 
                item.sortProperty = "ZZZZ";
            }
            
        });

        var sortedArray = this.requestsDetailsArrayAnalytics.sort((a, b) =>{
            var result = (a.sortProperty < b.sortProperty) ? -1 : (a.sortProperty > b.sortProperty) ? 1 : 0;
            return result;
        });

        this.analyticsCountryProductsResultArray = new Array();
        var prodID = "";
        var country = "";
        var numStatuses = this.config.REQUEST_STATUS.length;
        var templateObj = new Object();
        templateObj['total'] = 0;
        templateObj['studentIds'] = 0;
        for(var i = 0; i < numStatuses; i++){
            templateObj[this.config.REQUEST_STATUS[i].code] = 0;
            if(this.config.REQUEST_STATUS[i].description === "Cancelled") {
                var skip = this.config.REQUEST_STATUS[i].code;
            }            
        }

        sortedArray.forEach(item => {
            if(item.productId.name != prodID || item.requestId.institutionId.country != country){ 
                prodID = item.productId.name;
                country = item.requestId.institutionId ? item.requestId.institutionId.country : "";
                var obj = this.utils.copyObject(templateObj);
                obj.productId = item.productId;
                obj.country = item.requestId.institutionId ? item.requestId.institutionId.country : "";
                this.analyticsCountryProductsResultArray.push(obj);
            }
            if(item.requestStatus != skip){
                this.analyticsCountryProductsResultArray[this.analyticsCountryProductsResultArray.length-1]['total'] += 1;
                var gradIds = item.requestId.graduateIds != null ? parseInt(item.requestId.graduateIds) : 0;
                var underIds = item.requestId.undergradIds != null ? parseInt(item.requestId.undergradIds) : 0;
                this.analyticsCountryProductsResultArray[this.analyticsCountryProductsResultArray.length-1]['studentIds'] += gradIds + underIds;
            }            
            this.analyticsCountryProductsResultArray[this.analyticsCountryProductsResultArray.length-1][item.requestStatus] += 1;
        })
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
