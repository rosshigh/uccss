import { inject } from 'aurelia-framework';
import { DataServices } from './dataServices';
import { Utils } from '../utils/utils';

@inject(DataServices, Utils)
export class SiteInfo {

    SITE_SERVICES = 'site';
    MESSAGE_SERVICES = 'messages';

    constructor(data, utils) {
        this.data = data;
        this.utils = utils;
    }

    async getObjectArray(ptions) {
        var url = this.SITE_SERVICES;
        url += options ? options : "";
        try {
            let serverResponse = await this.data.get(url);
            if (!serverResponse.error) {
                this.objectArray = serverResponse;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getobject(id){
        let url = this.SITE_SERVICES + '/' + id;
        try {
          let serverResponse = await this.data.get(url);
          if (!serverResponse.error) {
            this.selectedObject = serverResponse;
            this.originalObject = this.utils.copyObject(serverResponse);
          } else {
            this.data.processError(serverResponse);
          }
        } catch (error) {
          console.log(error);
        }
    }
}