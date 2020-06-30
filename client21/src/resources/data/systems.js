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

    async getSystemsArray(options) {
        var url = this.SYSTEMS_SERVICE;
        url += options ? options : "";
        try {
            let serverResponse = await this.data.get(url);
            if (!serverResponse.error) {
                this.systemsArray = serverResponse;
            }
        } catch (error) {
            console.log(error);
            this.systemsArray = undefined;
        }
    }

    async getSystem(id) {
        let url = this.SYSTEMS_SERVICE + '/' + id;
        try {
            let serverResponse = await this.data.get(url);
            if (!serverResponse.error) {
                this.selectedSystem = serverResponse;
                this.originalSystem = this.utils.copyObject(this.selectedSystem);
            } else {
                this.data.processError(serverResponse);
            }
        } catch (error) {
            console.log(error);
        }
    }

    emptySystem(){
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

    async saveSystem(){
        if(!this.selectedSystem){
            return;
        }

        if(!this.selectedSystem._id){
            let serverResponse = await this.data.saveObject(this.selectedSystem, this.SYSTEMS_SERVICE, "post");
            if(!serverResponse.error){
                 this.systemsArray.push(serverResponse);
            } else {
                this.data.processError(serverResponse,"Error updating the system.<br>")
            }
            return serverResponse;
        } else {
            var serverResponse = await this.data.saveObject(this.selectedSystem, this.SYSTEMS_SERVICE, "put");
            if(!serverResponse.error){
                return serverResponse;
            } else {
                this.data.processError(serverResponse,"Error updating the system.<br>")
            }
            return serverResponse;
        }
    }

    isSystemDirty() {
        return this.utils.objectsEqual(this.selectedSystem, this.originalSystem);
    }
}