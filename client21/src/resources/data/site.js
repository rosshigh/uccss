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

  async getObjectArray(options) {
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

  async getSystemMessage(){
    var url = this.SITE_SERVICES + '?filter=itemType|eq|MESS';
    let response = await this.data.get(url);
    if(!response.error){
      this.systemMessage = response;
    }
  }
  
  async showBannerMessage() {
    await this.getSystemMessage();
    if (this.systemMessage[0].content.length) {
        this.modalMessage = this.systemMessage[0].content;
        this.title = 'System Message';
        $("#messageModal").modal('show');
    }
}

  async getObject(id) {
    let url = this.SITE_SERVICES + '/' + id;
    console.log(url)
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

  selectObject(index) {
    if (!index || index === -1) {
      this.selectedObject = this.emptyObject();
      this.originalObject = this.utils.copyObject(this.selectedObject);
    } else {
      try {
        this.selectedObject = this.utils.copyObject(this.objectArray[index]);
      } catch (error) {
        console.log(error);
      }

    }
  }

  emptyObject() {
    var newItem = new Object();;
    newItem.title = "";
    newItem.content = "";
    newItem.url = "";
    newItem.createdDate = new Date();
    newItem.expiredDate = moment(new Date()).add(1, 'years');
    newItem.image = "";
    newItem.priority = "INFO";
    newItem.itemType = "NEWS";
    newItem.sortOrder = 0;
    newItem.file = new Object();
    return newItem;
  }

  refreshOriginalObject() {
    this.selectedObject = this.utils.copyObject(this.originalObject);
  }

  selectedObjectById(id) {
    if (!id) {
      this.selectedObject = this.emptyObject();
      return;
    }
    this.objectArray.forEach((item, index) => {
      if (item._id === id) {
        this.selectedObject = this.utils.copyObject(item);
      }
    });
    return;
  }

  async saveObject() {
    if (!this.selectedObject) {
      return;
    }

    if (!this.selectedObject._id) {
      let serverResponse = await this.data.saveObject(this.selectedObject, this.SITE_SERVICES, "post");
      return serverResponse;
    } else {
      var serverResponse = await this.data.saveObject(this.selectedObject, this.SITE_SERVICES, "put");
      return serverResponse;
    }
  }

  async deleteObject() {
    if (this.selectedObject._id) {
      let serverResponse = await this.data.deleteObject(this.SITE_SERVICES + '/' + this.selectedObject._id);
      return serverResponse;
    }
    return null;
  }

  isObjectDirty() {
    if (this.selectedObject) {
      return this.utils.objectsEqual(this.selectedObject, this.originalObject);
    }
  }
}