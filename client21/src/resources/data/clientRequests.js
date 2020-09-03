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
}