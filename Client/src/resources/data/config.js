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
}