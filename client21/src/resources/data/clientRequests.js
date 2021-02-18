import { inject } from 'aurelia-framework';
import { DataServices } from './dataServices';
import { Utils } from '../utils/utils';

@inject(DataServices, Utils)
export class ClientRequests {

    CLIENT_REQUESTS_SERVICES = 'clientRequests';
    CLIENT_REQUEST_DETAILS = 'clientRequestsDetails';
    CLIENT_REQUEST_LOCK_SERVICES = 'clientRequestLocks';
    CUSTOMER_ACTION = 'clientRequests/customerAction';
    CLIENT_REQUEST_EMAIL = "clientRequests/sendMail";

    constructor(data, utils) {
        this.data = data;
        this.utils = utils;
    }

    async getObjectsArray(options) {
        var url = this.CLIENT_REQUESTS_SERVICES;
        url += options ? options : "";
        try {
            let serverResponse = await this.data.get(url);
            if (!serverResponse.error) {
                this.objectsArray = serverResponse;
            } else {
                this.data.processError(serverResponse);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getActiveObjectsArray(personId, sessions) {
        var url = this.CLIENT_REQUESTS_SERVICES;
        url += "/" + personId + "/" + sessions
        try {
            let serverResponse = await this.data.get(url);
            if (!serverResponse.error) {
                this.objectsArray = serverResponse;
            } else {
                this.objectsArray = new Array()
            }
        } catch (error) {
            console.log(error);

        }
    }

    async getRequest(options){
        var url = this.CLIENT_REQUESTS_SERVICES + options;
        let response = await this.data.get(url);
        if(!response.error && response.length > 0){
            this.selectedObject = this.utils.copyObject(response[0]);
        } else {
            this.selectedObject = null;
        }
    }

    setRequest(object) {
        if (object === undefined) {
            this.selectedObject = this.utils.copyObject(this.emptyObject());
        } else {
            this.selectedObject = this.utils.copyObject(object);
        }
    }

    emptyObject() {
        let newObject = {
            courseId: "",
            personId: "",
            institutionId: "",
            sessionId: "",
            startDate: "",
            endDate: "",
            comments: "",
            customerMessage: "",
            requestStatus: "",
            modifiedDate: new Date(),
            createdDate: new Date(),
            graduateIds: 0,
            undergradIds: 0,
            requestDetailsToSave: [],
            requestDetails: []
        };
        return newObject;
    }

    async saveRequest() {
        if (!this.selectedObject) {
            return;
        }
        let url = this.CLIENT_REQUESTS_SERVICES;
        if (!this.selectedObject._id) {
            let response = await this.data.saveObject(this.selectedObject, url, "post");
            return response;
        } else {
            let response = await this.data.saveObject(this.selectedObject, url, "put");
            return response;
        }
    }

    async getRequestDetails(options){
        let url = this.CLIENT_REQUEST_DETAILS;
        url += options ? options : "";
        try {
            let serverResponse = await this.data.get(url);
            if (!serverResponse.error) {
                this.detailsArray = serverResponse;
            } else {
                this.data.processError(serverResponse);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getRequestDetail(id){
        var url = this.CLIENT_REQUEST_DETAILS + "/" + id;
        let response = await this.data.get(url);
        this.selectedDetail = this.utils.copyObject(response);
    }

    setDetail(obj){
        if(obj === undefined){
            this.selectedDetail = {};    
        }
        this.selectedDetail = this.utils.copyObject(obj);
    }

    async cloneRequest(detail){
        if(detail){
            let url = this.CLIENT_REQUEST_DETAILS + '/clone';
            let response = await this.data.saveObject(detail, url, "post");
            if(!response.error){
                this.detailsArray.push(response);
            }
            return response;
        }
        
    }

    async saveRequestDetail(){
        if(!this.selectedDetail){
            return;
        }
        let url = this.CLIENT_REQUEST_DETAILS;
        if (!this.selectedDetail._id) {
            let response = await this.data.saveObject(this.selectedDetail, url, "post");
            return response;
        } else {
            let response = await this.data.saveObject(this.selectedDetail, url, "put");
            return response;
        }
    }

    replaceObject(obj){
        if(!obj._id || !this.detailsArray){
            return;
        }

        for(let i = 0; i < this.detailsArray.length; i++){
            if(this.detailsArray[i]._id === obj._id){
                this.detailsArray[i] = this.utils.copyObject(obj);
                break;
            }
        }
    }

    findDetailIndex(){
        this.detailIndex = -1;
        for(let i = 0; i < this.detailsArray.length; i++){
            if(this.selectedDetail._id === this.detailsArray[i]._id){
                this.detailsArray[i].requestStatus = 9;
                this.detailIndex = i;
                break;
            }
        }
    }

    deleteSelected(){
        if(this.detailIndex && this.detailIndex >= 0){
            this.detailsArray.splice(this.detailIndex, 1);
        }
    }

    async deleteDetail(){
        if(!this.selectedDetail){
            return;
        }
        let url = this.CLIENT_REQUEST_DETAILS + '/' + this.selectedDetail._id + '/' + this.selectedDetail.requestId._id;
        let response = await this.data.deleteObject(url);
        return response;
    }
}