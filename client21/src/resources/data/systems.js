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

    async getObjectsArrayWithClients(options) {
        var url = this.SYSTEMS_SERVICE + '/clients';
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
        let serverResponse = await this.data.get(url);
        if (!serverResponse.error) {
            this.selectedSystem = serverResponse;
            this.originalSystem = this.utils.copyObject(this.selectedSystem);
        } else {
            this.data.processError(serverResponse);
        }
    }

    selectObject(index) {
        if (!index && index != 0) {
            this.selectedSystem = this.emptySystem();
        } else {
            try {
                this.selectedSystem = this.utils.copyObject(this.objectsArray[index]);
                this.originalSystem = this.utils.copyObject(this.selectedSystem);
            } catch (error) {
                console.log(error);
                this.selectedSystem = this.emptySystem();
                this.newSystem = true;
            }

        }
    }

    selectedSystemById(id) {
        this.selectedSystem = null;
        for (var i = 0, x = this.objectsArray.length; i < x; i++) {
            if (this.objectsArray[i]._id === id) {
                this.selectedSystem = this.utils.copyObject(this.objectsArray[i]);
                this.originalSystem = this.utils.copyObject(this.selectedSystem);
                break;
            }
        };
    }

    setObject(object) {
        this.selectedSystem = this.utils.copyObject(object);
    }

    emptySystem() {
        var newSystemObj = {};
        newSystemObj.sid = "";
        newSystemObj.active = true;
        newSystemObj.description = "";
        newSystemObj.server = "";
        newSystemObj.systemNotes = "";
        newSystemObj.instance = "00";
        newSystemObj.its = "";
        newSystemObj.terms = "";
        newSystemObj.idsAvailable = 0;
        newSystemObj.type = "ERP";
        newSystemObj.productId = new Array();
        newSystemObj.clients = [];
        return newSystemObj;
    }

    async saveObject() {
        if (!this.selectedSystem) {
            return;
        }

        if (!this.selectedSystem._id) {
            let serverResponse = await this.data.saveObject(this.selectedSystem, this.SYSTEMS_SERVICE, "post");
            return serverResponse;
        } else {
            var serverResponse = await this.data.saveObject(this.selectedSystem, this.SYSTEMS_SERVICE, "put");
            return serverResponse;
        }
    }

    isObjectDirty() {
        return this.utils.objectsEqual(this.selectedSystem, this.originalSystem);
    }

    async deleteObject() {
        let serverResponse = await this.data.deleteObject(this.SYSTEMS_SERVICE + '/' + this.selectedSystem._id);
        return serverResponse;
    }

    emptyClient(clientNo, status, product, idsAvailable) {
        let obj = new Object();
        obj.client = clientNo;
        obj.clientStatus = status;
        obj.systemId = this.selectedSystem._id;
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

    async getConfiguredProductSystems(sids) {
        if (sids) {
            let serverResponse = await this.data.get(this.SYSTEMS_SERVICE + "/product/" + sids);
            return serverResponse;
        }
    }

    async getAPJConfiguredProductSystems(sids) {
        if (sids) {
            let serverResponse = await this.data.get('apj/' + this.SYSTEMS_SERVICE + "/product/" + sids);
            return serverResponse;
        }
    }

}