import {inject} from 'aurelia-framework';

import {DataServices} from './dataServices';

@inject(DataServices)
export class Config {
    CONFIG_SERVICE = 'config';
    SESSIONS_CONFIG_SERVICE = 'semesterConfig';

    token;
	user;

    constructor(data) {
        this.data = data;   
    }

    async getConfigArray(refresh, options) {
        if (!this.configArray || refresh) {
            var url = this.data.CONFIG_SERVICE;
            url += options ? options : "";
            try {
                let serverResponse = await this.data.get(url);
                if (!serverResponse.error) {
                    this.configArray = serverResponse;
                } else {
                    this.data.processError(serverResponse);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    async saveAll(saveConfigArray){
        if(saveConfigArray){
            var saveObj = {parameters: saveConfigArray};
            let response = await this.data.saveObject(saveObj, this.CONFIG_SERVICE + '/saveAll', "put")
            if (!response.error) {
                return response;
            }  else {
                this.data.processError(response, "There was an error updating the configuration.");
            }
            return response;
        }
        return null;
    }

     async saveSessions(saveSessionArray){
        if(saveSessionArray){
            let response = await this.data.saveObject(saveSessionArray, this.SESSIONS_CONFIG_SERVICE, "put")
            if (!response.error) {
                return response;
            }  else {
                this.data.processError(response, "There was an error updating the configuration.");
            }
            return response;
        }
        return null;
    }
}