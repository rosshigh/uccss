import {inject} from 'aurelia-framework';
import {DataServices} from './dataServices';
import {Utils} from '../utils/utils';
import {AppConfig} from '../../config/appConfig';
import moment from 'moment';

@inject(DataServices, Utils, AppConfig)
export class SiteInfo {

    SITE_SERVICES = 'site';
    MESSAGE_SERVICES = 'messages';

    constructor(data, utils, config) {
        this.data = data;
        this.utils = utils;
        this.config = config;
    }

    async getInfoArray(refresh, options){
        if (!this.siteArray || refresh) {
            var url = this.SITE_SERVICES;
            url += options ? options : "";
            try {
                let serverResponse = await this.data.get(url);
                if (!serverResponse.error) {
                    this.siteArray = serverResponse;
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    async getWeather(city){
        let response = this.data.get('getWeather/' + city)
        return response;
    }

    showCarousel(){
        for(let i = 0; i < this.siteArray.length; i++){
            if(this.siteArray[i].itemType === 'CARO') return true
        }
        return false;
    }

}
