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
        if (!this.siteArrayInternal || refresh) {
            var url = this.data.INFO_SERVICES;
            url += options ? options : "";
            try {
                let serverResponse = await this.data.get(url);
                if (!serverResponse.status) {
                    this.siteArrayInternal = serverResponse;
                     this.siteArray = this.siteArrayInternal;
                    for (var i = 0, x = this.siteArrayInternal.length; i < x; i++) {
                        this.siteArrayInternal[i].baseIndex = i;
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
        return this.siteArrayInternal;
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
                 this.siteArrayInternal.push(this.selectedItem);
                 this.siteArray = this.siteArrayInternal;
            }
            return serverResponse;
        } else {
            var serverResponse = await this.data.saveObject(this.selectedItem, this.data.INFO_SERVICES, "put");
            if(!serverResponse.error){
                this.siteArray[this.editIndex] = this.utils.copyObject(this.selectedItem, this.siteArray[this.editIndex]);
                this.siteArrayInternal = this.siteArray;
            }
            return serverResponse;
        }
    }
    
    async uploadFile(files){
       let response = await this.data.upLoadFiles(files, this.data.SITE_SERVICES + '/upload/' + this.selectedItem._id);
       if(!response.error){
            this.siteArray[this.editIndex] = this.utils.copyObject(response, this.siteArray[this.editIndex]);
            this.siteArrayInternal = this.siteArray;
       }
    }


    async deleteItem(){
         let serverResponse = await this.data.deleteObject(this.data.INFO_SERVICES + '/' + this.selectedItem._id);
            if (!response.error) {
                this.siteArrayInternal.splice(this.editIndex, 1);
                this.siteArray = this.siteArrayInternal;
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
        if (!this.messageArrayInternal || refresh) {
            var url = this.data. MESSAGE_SERVICES;
            url += options ? options : "";
            try {
                let serverResponse = await this.data.get(url);
                if (!serverResponse.error) {
                    this.messageArrayInternal = serverResponse;
                    this.messageArray = this.messageArrayInternal;
                    for (var i = 0, x = this.messageArrayInternal.length; i < x; i++) {
                        this.messageArray[i].baseIndex = i;
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
        return this.messageArrayInternal;
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
                 this.messageArrayInternal.push(this.selectedMessage);
                 this.messageArray = this.messageArrayInternal;
            }
            return serverResponse;
        } else {
            var serverResponse = await this.data.saveObject(this.selectedMessage, this.data.MESSAGE_SERVICES, "put");
            if(!response.error){
                this.messageArray[this.editMessageIndex] = this.utils.copyObject(this.selectedMessage, this.messageArray[this.editMessageIndex]);
                this.messageArrayInternal[this.messageArray[this.editMessageIndex].baseIndex] = this.utils.copyObject(this.selectedMessage, this.messageArray[this.messageArrayInternal[this.editMessageIndex].baseIndex]);

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
                this.messageArrayInternal.splice(this.editMessageIndex, 1);
                this.messageArray = this.messageArrayInternal;
                this.editMessageIndex = - 1;
            }
            return serverResponse;
    }

    async getWeather(city){

        let response = this.data.getNoAuth(this.data.OPEN_WEATHER_MAP_SERVICE  + '?q=' + city + '&APPID=' + this.data.API_KEY);
        //"http://openweathermap.org/img/w/";'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=0f85bb931f8faad7e35b6f685aa4e931');
        return response;
    }


}
