import {inject} from 'aurelia-framework';
import {DataServices} from './dataServices';
import {Utils} from '../utils/utils';
import {AppConfig} from '../../config/appConfig';

@inject(DataServices, Utils, AppConfig)
export class Systems{

	SYSTEMS_SERVICE = "systems";

    constructor(data, utils, config){
        this.data = data;
        this.utils = utils;
        this.config = config;
    }

    async getSystemsArray(options, refresh){
        if(!this.systemsArray || refresh) {
            var url = this.SYSTEMS_SERVICE;
            url += options ? options : "";
             try{
                let serverResponse = await this.data.get(url);
                if(!serverResponse.error){
                    this.systemsArray = serverResponse;
                } 
            } catch(error){
                console.log(error);
                this.systemsArray = undefined;
            }
        }
    }
}