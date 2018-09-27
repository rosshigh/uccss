import {inject} from 'aurelia-framework';
import {DataServices} from './dataServices';
import {Utils} from '../utils/utils';
import {AppConfig} from '../../config/appConfig';

@inject(DataServices, Utils, AppConfig)
export class Chapters {

  CHAPTER_REQUESTS_SERVICES = 'chapters';
  
    constructor(data, utils, config) {
        this.data = data;
        this.utils = utils;
        this.config = config;
    }

    async getChaptersArray(options, refresh){
        if (!this.chaptersArray || refresh) {
          var url = this.CHAPTER_REQUESTS_SERVICES;
          url += options ? options : "";
            try {
                let serverResponse = await this.data.get(url);
                if (!serverResponse.error) {
                    this.chaptersArray = serverResponse;
                }  else {
                    this.data.processError(serverResponse);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
}