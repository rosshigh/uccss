import { inject } from 'aurelia-framework';

import { DataServices } from './dataServices';

@inject(DataServices)
export class Config {
    CONFIG_SERVICE = 'config';
    SESSIONS_CONFIG_SERVICE = 'semesterConfig';
    token;
    user;

    constructor(data) {
        this.data = data;
    }

    async getObjectArray(options) {
        var url = this.CONFIG_SERVICE;
        url += options ? options : "";
        try {
            let serverResponse = await this.data.get(url);
            if (!serverResponse.error) {
                this.objectArray = serverResponse;
            } else {
                this.data.processError(serverResponse);
            }
        } catch (error) {
            console.log(error);
        }
    }

    objectifyConfig() {
        this.configObject = {};
        if (this.objectArray) {
            this.objectArray.forEach(item => {
                this.configObject[item.parameter] = item.value;
            })
        }
    }

    async save(obj) {
        if (!obj) {
            return;
        }
        let url = this.CONFIG_SERVICE;
        if (!obj._id) {
            let response = await this.data.saveObject(obj, url, "post");
            return response;
        } else {
            let response = await this.data.saveObject(obj, url, "put");
            return response;
        }
    }

    async saveAll() {
        if (this.objectArray) {
            var saveObj = { parameters: this.objectArray };
            let response = await this.data.saveObject(saveObj, this.CONFIG_SERVICE + '/saveAll', "put")
            if (!response.error) {
                return response;
            } else {
                this.data.processError(response, "There was an error updating the configuration.");
            }
            return response;
        }
        return null;
    }
}