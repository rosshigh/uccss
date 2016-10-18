import {inject} from 'aurelia-framework';
import {DataServices} from './dataServices';
import {Utils} from '../utils/utils';
import {AppConfig} from '../../config/appConfig';
import moment from 'moment';

@inject(DataServices, Utils, AppConfig)
export class SiteInfo {
    editIndex;              //Index of selected product

    constructor(data, utils, config) {
        this.data = data;
        this.utils = utils;
        this.config = config;
    }

    async getInfoArray(refresh, options){
        if (!this.siteArray || refresh) {
            var url = this.data.INFO_SERVICES;
            url += options ? options : "";
            try {
                let serverResponse = await this.data.get(url);
                if (!serverResponse.error) {
                    this.siteArray = serverResponse;
                } else {
                    this.data.processError(serverResponse);
                    return undefined;
                }
            } catch (error) {
                console.log(error);
                return undefined;
            }
        }
        return this.siteArray;
    }

    selectSiteItem(index){
        if (index === -1) {
            this.selectedItem = this.emptyItem();
        } else {
            try {
            this.selectedItem = this.utils.copyObject(this.siteArray[index]);
            this.editIndex = index;
            } catch (error) {
                console.log(error);
            }

        }
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
        return newItem;
    }

    async saveInfoItem(){
         if(!this.selectedItem){
            return;
        }

        if(!this.selectedItem._id){
            let serverResponse = await this.data.saveObject(this.selectedItem, this.data.INFO_SERVICES, "post");
            if(!serverResponse.error){
                 this.siteArray.push(this.selectedItem);
            }
            return serverResponse;
        } else {
            var serverResponse = await this.data.saveObject(this.selectedItem, this.data.INFO_SERVICES, "put");
            if(!serverResponse.error){
                this.siteArray[this.editIndex] = this.utils.copyObject(this.selectedItem, this.siteArray[this.editIndex]);
            }
            return serverResponse;
        }
    }
    
    async uploadFile(files){
       let response = await this.data.upLoadFiles(files, this.data.SITE_SERVICES + '/upload/' + this.selectedItem._id);
       if(!response.error){
            this.siteArray[this.editIndex] = this.utils.copyObject(response, this.siteArray[this.editIndex]);
       }
    }

    async deleteItem(){
         let serverResponse = await this.data.deleteObject(this.data.INFO_SERVICES + '/' + this.selectedItem._id);
            if (!response.error) {
                this.siteArray.splice(this.editIndex, 1);
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


    async getMessageArray(refresh, options){
        if (!this.messageArray || refresh) {
            var url = this.data. MESSAGE_SERVICES;
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
            let serverResponse = await this.data.saveObject(this.selectedMessage, this.data.MESSAGE_SERVICES, "post");
            if(!response.error){
                 this.messageArray.push(this.selectedMessage);
            }
            return serverResponse;
        } else {
            var serverResponse = await this.data.saveObject(this.selectedMessage, this.data.MESSAGE_SERVICES, "put");
            if(!response.error){
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

    async deleteItem(){
         let serverResponse = await this.data.deleteObject(this.data.INFO_SERVICES + '/' + this.selectedMessage._id);
            if (!response.error) {
                this.messageArray.splice(this.editMessageIndex, 1);
                this.editMessageIndex = - 1;
            }
            return serverResponse;
    }

    async getWeather(city){
        let response = this.data.getNoAuth(this.data.OPEN_WEATHER_MAP_SERVICE  + '?q=' + city + '&APPID=' + this.data.API_KEY);
        return response;
    } 

}
