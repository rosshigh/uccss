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

    async getObjectsArray(refresh, options){
        if (!this.objectsArray || refresh) {
            var url = this.SITE_SERVICES;
            url += options ? options : "";
            try {
                let serverResponse = await this.data.get(url);
                if (!serverResponse.error) {
                    this.objectsArray = serverResponse;
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    selectObject(index){
        if (!index || index === -1) {
            this.selectedItem = this.emptyItem();
        } else {
            try {
            this.selectedItem = this.utils.copyObject(this.objectsArray[index]);
            this.editIndex = index;
            } catch (error) {
                console.log(error);
            }

        }
    }

    setObject(item){
        this.selectedItem = this.utils.copyObject(item);
    }

    emptyItem(){
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

    async saveObject(){
         if(!this.selectedItem){
            return;
        }

        if(!this.selectedItem._id){
            let serverResponse = await this.data.saveObject(this.selectedItem, this.SITE_SERVICES, "post");
           
            return serverResponse;
        } else {
            var serverResponse = await this.data.saveObject(this.selectedItem, this.SITE_SERVICES, "put");
            
            return serverResponse;
        }
    }
    
    async uploadFile(files){
       let response = await this.data.uploadFiles(files, this.SITE_SERVICES + '/upload/' + this.selectedItem._id);
       if(!response.error){
            this.objectsArray[this.editIndex] = this.utils.copyObject(response, this.objectsArray[this.editIndex]);
       }
    }

    async deleteObject(){
         let serverResponse = await this.data.deleteObject(this.SITE_SERVICES + '/' + this.selectedItem._id);
            if (!serverResponse.error) {
                this.objectsArray.splice(this.editIndex, 1);
                this.editIndex = - 1;
            }
            return serverResponse;
    }

    isDirty(obj){
        if(this.selectedItem){
            if(!obj){
                 var obj = this.emptyItem();
            }
            var skip = ['file'];
            return this.utils.objectsEqual(this.selectedItem, obj, skip);
        } 
        return new Array();
    }

    async getWeather(city){
        let response = this.data.get('getWeather/' + city)
        return response;
    }

    showCarousel(){
        for(let i = 0; i < this.objectsArray.length; i++){
            if(this.objectsArray[i].itemType === 'CARO') return true
        }
        return false;
    }

    async getMessageArray(options, refresh){
        if (!this.messageArray || refresh) {
            var url = this.MESSAGE_SERVICES;
            url += options ? options : "";
            try {
                let serverResponse = await this.data.get(url);
                if (!serverResponse.error) {
                    this.messageArray = serverResponse;
                } else {
                    this.data.processError(serverResponse);
                    return undefined;
                }
            } catch (error) {
                console.log(error);
                return undefined;
            }
        }
        return this.messageArray;
    }
    
    selectMessageByKey(key){
        var index = this.utils.arrayContainsValue(this.messageArray, 'key', key);
        if(index > -1){
            return this.messageArray[index];
        }
        return null;
    }
    
    selectMessage(index){
        if (index === -1) {
            this.selectedMessage = this.emptyMessage();
        } else {
            try {
            this.selectedMessage = this.utils.copyObject(this.messageArray[index]);
            this.editMessageIndex = index;
            } catch (error) {
                console.log(error);
            }

        }
    }

    emptyMessage(){
        var newMessage = new Object();;
        newMessage.description = "";
        newMessage.content = "";
        return newMessage;
    }
 
    async saveMessageItem(){
         if(!this.selectedMessage){
            return;
        }

        if(!this.selectedMessage._id){
            let serverResponse = await this.data.saveObject(this.selectedMessage, this.MESSAGE_SERVICES, "post");
            if(!serverResponse.error){
                 this.messageArray.push(this.selectedMessage);
            }
            return serverResponse;
        } else {
            var serverResponse = await this.data.saveObject(this.selectedMessage, this.MESSAGE_SERVICES, "put");
            if(!serverResponse.error){
                this.messageArray[this.editMessageIndex] = this.utils.copyObject(this.selectedMessage, this.messageArray[this.editMessageIndex]);
            }
            return serverResponse;
        }
    }
    
    isMessageDirty(obj){
        if(this.selectedMessage){
            if(!obj){
                 var obj = this.emptyItem();
            }
            return this.utils.objectsEqual(this.selectedMessage, obj);
        }
        return new Array();
    }

    async deleteMessage(){
         let serverResponse = await this.data.deleteObject(this.SITE_SERVICES + '/' + this.selectedMessage._id);
            if (!serverResponse.error) {
                this.messageArray.splice(this.editMessageIndex, 1);
                this.editMessageIndex = - 1;
            }
            return serverResponse;
    }

}
