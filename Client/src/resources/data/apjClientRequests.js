import {inject} from 'aurelia-framework';
import {DataServices} from './dataServices';
import {Utils} from '../utils/utils';
import {AppConfig} from '../../config/appConfig';

@inject(DataServices, Utils, AppConfig)
export class APJClientRequests {

  CLIENT_REQUESTS_SERVICES = 'apj/clientRequests';
  CLIENT_REQUEST_DETAILS='apj/clientRequestsDetails';

  CUSTOMER_ACTION = 'clientRequests/customerAction';
  CLIENT_REQUEST_EMAIL = "clientRequests/sendMail";

    constructor(data, utils, config) {
        this.data = data;
        this.utils = utils;
        this.config = config;
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

    async getAPJInstitutionRequests(options, refresh){
        if (!this.apjInstitutionRequestArray || refresh) {
            var url = this.CLIENT_REQUESTS_SERVICES;
            url += options ? options : "";
            let response = await this.data.get(url)
            if (!response.error) {
                this.apjInstitutionRequestArray = response;
            } else {
                this.apjInstitutionRequestArray = undefined;
            }

        }
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

    selectRequest(index){
        if (index === undefined) {
            this.selectedRequest = this.emptyRequest();
        } else {
            try {
                this.selectedRequest = this.utils.copyObject(this.apjInstitutionRequestArray[index]);
                this.editRequestIndex = index;
            } catch (error) {
                console.log(error);
                this.selectedRequest = this.emptyRequest();
            }

        }
    }


    emptyRequest(){
        var newObj = new Object();;
        newObj.requestStatus = this.config.UNASSIGNED_REQUEST_CODE;
        newObj.startDate = "";
        newObj.endDate = "";
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
            this.requestsDetailsArray[this.requestDetailIndex] = this.utils.copyObject(this.selectedRequestDetail);
            return response;
        }
    }


    async saveRequest(){
        if(!this.selectedRequest){
            return;
        }
        var url =  this.CLIENT_REQUESTS_SERVICES; 

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
}