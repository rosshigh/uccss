import { inject } from 'aurelia-framework';
import { DataServices } from './dataServices';
import { Utils } from '../utils/utils';
import { AppConfig } from '../../appConfig';

@inject(DataServices, Utils, AppConfig)
export class Systems {

    SYSTEMS_SERVICE = "systems";
    CHANGE_SERVICE = "change";
    CHANGE_CATEGORY_SERVICE = "changeCategory";

    constructor(data, utils, config) {
        this.data = data;
        this.utils = utils;
        this.config = config;
    }

    async getObjectsArray(options) {
        var url = this.SYSTEMS_SERVICE;
        url += options ? options : "";
        try {
            let serverResponse = await this.data.get(url);
            if (!serverResponse.error) {
                this.objectsArray = serverResponse;
            }
        } catch (error) {
            console.log(error);
            this.objectsArray = undefined;
        }
    }

    async getObject(id) {
        let url = this.SYSTEMS_SERVICE + '/' + id;
        try {
            let serverResponse = await this.data.get(url);
            if (!serverResponse.error) {
                this.selectedObject = serverResponse;
                this.originalObject = this.utils.copyObject(this.selectedObject);
            } else {
                this.data.processError(serverResponse);
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    selectObject(index){
        if(!index && index != 0) {
            this.selectedObject = this.emptySystem();
        } else {
            try{
                this.selectedObject = this.utils.copyObject(this.systemsArray[index]);
                this.newSystem = false;
                this.editIndex = index;
            } catch (error){
                console.log(error);
                this.selectedObject = this.emptySystem();
                this.newSystem = true;
            }

        }
    }

    selectedObjectById(id) {
        this.selectedObject = null;
        for (var i = 0, x = this.systemsArray.length; i < x; i++) {
            if (this.systemsArray[i]._id === id) {
                this.selectedObject = this.utils.copyObject(this.systemsArray[i]);
                break;
            }
        };
    }

    emptySystem() {
        var newSystemObj = {};
        newSystemObj.sid = "";
        newSystemObj.active = true;
        newSystemObj.description = "";
        newSystemObj.server = "";
        newSystemObj.instance = "";
        newSystemObj.its = "";
        newSystemObj.terms = "";
        newSystemObj.idsAvailable = 0;
        newSystemObj.productId = new Array();
        newSystemObj.clients = [];
        return newSystemObj;
    }

    async saveObject() {
        if (!this.selectedObject) {
            return;
        }

        if (!this.selectedObject._id) {
            let serverResponse = await this.data.saveObject(this.selectedObject, this.SYSTEMS_SERVICE, "post");
            if (!serverResponse.error) {
                this.systemsArray.push(serverResponse);
            } else {
                this.data.processError(serverResponse, "Error updating the system.<br>")
            }
            return serverResponse;
        } else {
            var serverResponse = await this.data.saveObject(this.selectedObject, this.SYSTEMS_SERVICE, "put");
            if (!serverResponse.error) {
                return serverResponse;
            } else {
                this.data.processError(serverResponse, "Error updating the system.<br>")
            }
            return serverResponse;
        }
    }

    isObjectDirty() {
        return this.utils.objectsEqual(this.selectedObject, this.originalObject);
    }

    async deleteObject() {
        let serverResponse = await this.data.deleteObject(this.SYSTEMS_SERVICE + '/' + this.selectedObject._id);
        return serverResponse;
    }

    emptyClient(clientNo, status, product, idsAvailable){
        let obj = new Object();
        obj.client = clientNo;
        obj.clientStatus = status;
        obj.systemId = this.selectedObject._id;
        obj.idsAvailable = product.idsAvailable;
        obj.assignments = new Array(); 
        obj.createdDate = new Date();
        obj.lastIdAssigned = 0;
        obj.lastFacIdAssigned = 0;
        obj.firstFacIdAssigned = 0;
        obj.manual = false;
        obj.productId = product;
        obj.firstAllowableID = product.firstAllowableId ? parseInt(product.firstAllowableId) : 1;
        return obj;
    }

}