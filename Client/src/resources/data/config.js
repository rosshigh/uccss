import {inject} from 'aurelia-framework';

import {DataServices} from './dataServices';

@inject(DataServices)
export class Config {
    configArray = undefined;

    constructor(data) {
        this.data = data;   
    }

    activate() {
        this.getData();
    }

    async getData(){
        if(!this.configArray){
            let serverResponse = await this.data.get(this.data.CONFIG_SERVICE);
            if(!serverResponse.status){
                this.configArray = serverResponse;
            }
        }
        
    }

    async getConfigArray(refresh, options) {
        if (!this.configArray || refresh) {
            var url = this.data.CONFIG_SERVICE;
            url += options ? options : "";
            try {
                let serverResponse = await this.data.get(url);
                if (!serverResponse.status) {
                    this.configArrayInternal = serverResponse;
                    this.configArray = serverResponse;
                    for (var i = 0, x = this.configArrayInternal.length; i < x; i++) {
                        this.configArrayInternal[i].baseIndex = i;
                    }
                } else {
                    this.data.processError(serverResponse);
                    return undefined;
                }
            } catch (error) {
                console.log(error);
                return undefined;
            }
        }
        return this.configArray;
    }

    async saveAll(saveConfigArray){
        if(saveConfigArray){
            var saveObj = {parameters: saveConfigArray};
            let response = await this.data.saveObject(saveObj, this.data.CONFIG_SERVICE + '/saveAll', "put")
            if (!response.error) {
                if(this.configArray){
                }
            }  else {
                this.data.processError(response, "There was an error updating the configuration.");
            }
            return response;
        }
        return null;
    }
}