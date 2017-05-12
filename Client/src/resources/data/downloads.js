import {inject} from 'aurelia-framework';
import {DataServices} from './dataServices';
import {Utils} from '../utils/utils';
import {AppConfig} from '../../config/appConfig';
import moment from 'moment';

@inject(DataServices, Utils, AppConfig)
export class Downloads {
    DOWNLOADS_SERVICE = "apps";
    APPLICATION_CATEGORY_SERVICE = "appsCategory";
    DOWNLOADS_UPLOADS = "downloads/upload";

    constructor(data, utils, config) {
        this.data = data;
        this.utils = utils;
        this.config = config; 
    }

    //Downloads
    async getDownloadsArray(refresh, options) {
        if (!this.appDownloadsArray || refresh) {
            var url = this.DOWNLOADS_SERVICE;
            url += options ? options : "";
            try {
                let serverResponse = await this.data.get(url);
                if (!serverResponse.error) {
                    this.appDownloadsArray = serverResponse;
                } 
            } catch (error) {
                console.log(error);
            }
        }
    }

    selectDownload(index) {
        if (!index && index != 0) {
            this.selectedDownload = this.emptyDownload();
        } else {
            try {
                this.selectedDownload = this.utils.copyObject(this.appDownloadsArray[index]);
                this.editDownloadIndex = index;
            } catch (error) {
                this.selectedDownload = this.emptyDownload();
            }

        }

    }

    emptyDownload() {
        var newObj = new Object();
        newObj.name = "";
        newObj.description = "";
        newObj.type = 0;
        newObj.file = "";
        newObj.createdDate = new Date();
        newObj.active = true;
        newObj.helpTicketRelevant = false;

        return newObj;
    }

    async saveDownload() {
        if (!this.selectedDownload) {
            return;
        }

        if (!this.selectedDownload._id) {
            let serverResponse = await this.data.saveObject(this.selectedDownload, this.DOWNLOADS_SERVICE, "post");
            if (!serverResponse.error) {
                this.selectedDownload = serverResponse;
                this.appDownloadsArray.push(this.selectedDownload);
                this.editDownloadIndex = this.appDownloadsArray.length - 1;
            }
            return serverResponse;
        } else {
            var serverResponse = await this.data.saveObject(this.selectedDownload, this.DOWNLOADS_SERVICE, "put");
            if (!serverResponse.error) {
                this.appDownloadsArray[this.editDownloadIndex] = this.utils.copyObject(this.selectedDownload, this.appDownloadsArray[this.editDownloadIndex]);
            }
            return serverResponse;
        }

    }

    async uploadFile(files){
        let response = await this.data.uploadFiles(files, this.DOWNLOADS_UPLOADS + "/" + this.selectedDownload._id + '/' + this.selectedDownload.downCatcode);
        if(!response.error){
            this.appDownloadsArray[this.editDownloadIndex].file = response.file;
        }
    }

    async deleteDownload(){
         let serverResponse = await this.data.deleteObject(this.DOWNLOADS_SERVICE + '/' + this.selectedDownload._id);
            if (!serverResponse.error) {
                this.appDownloadsArray.splice(this.editDownloadIndex, 1);
                this.editDownloadIndex = - 1;
            }
            return serverResponse;
    }

    isDirty(obj){
        if(this.selectedDownload){
            if(!obj){
                var obj = this.emptyDownload();
            }
            var skip = ['file'];  
            return this.utils.objectsEqual(this.selectedDownload, obj, skip );
        }
        return new Array();
     }
     

   
    //Categories
    async getDownloadCategoriesArray(refresh, options) {
        if (!this.appCatsArray || refresh) {
            var url = this.APPLICATION_CATEGORY_SERVICE;
            url += options ? options : "";;
            try {
                let serverResponse = await this.data.get(url);
                if (!serverResponse.error) {
                    this.appCatsArray = serverResponse;
                } 
            } catch (error) {
                console.log(error);
            }
        }
    }

    selectCategory(index) {
        if (!index && index != 0) {
            this.selectedCat = this.emptyCat();
        } else {
            try {
                this.selectedCat = this.utils.copyObject(this.appCatsArray[index]);
                this.editCatIndex = index;
            } catch (error) {
                this.selectedCat = this.emptyCat();
            }

        }
    }

    selectCategoryByCode(code) {
        if (!code && code != 0) {
            this.selectedCat = this.emptyCat();
        } else {
            try {
                this.editCatIndex = 0;
                this.appCatsArray.forEach((item, index) => {
                    if(item.downCatcode == code)  this.editCatIndex = index;
                })
                this.selectedCat = this.utils.copyObject(this.appCatsArray[this.editCatIndex]);
            } catch (error) {
                this.selectedCat = this.emptyCat();
            }

        }
    }

    emptyCat() {
        var newObj = new Object();
        newObj.code = 0;
        newObj.description = "";

        return newObj;
    }

    documentsExist(code){
        if (!code && code != 0) {
           return false;
        } else {
            for(var i = 0; i <  this.appDownloadsArray.length; i++){
                if(this.appDownloadsArray[i].downCatcode == code) return true;
            }
            return false;
        }
    }

    async saveCategory() {
        if (!this.selectedCat) {
            return;
        }

        if (!this.selectedCat._id) {
            let serverResponse = await this.data.saveObject(this.selectedCat, this.APPLICATION_CATEGORY_SERVICE, "post");
            if (!serverResponse.error) {
                this.appCatsArray.push(serverResponse);
                this.selectedCat = serverReponse;
                this.editCatIndex = this.appCatsArrayInternal.length - 1;
            }
            return serverResponse;
        } else {
            var serverResponse = await this.data.saveObject(this.selectedCat, this.APPLICATION_CATEGORY_SERVICE, "put");
            if (!serverResponse.error) {
                this.appCatsArray[this.editCatIndex] = this.utils.copyObject(this.selectedCat, this.appCatsArray[this.editCatIndex]);
            }
            return serverResponse;
        }

    }

    async deleteCat(){
        if (this.selectedCat._id) {
            let serverResponse = await this.data.deleteObject(this.APPLICATION_CATEGORY_SERVICE + '/' + this.selectedCat._id);
            if (!serverResponse.error) {
                this.appCatsArray.splice(this.editCatIndex, 1);
                this.editCatIndex = - 1;
            }
            return serverResponse;
        } else {
            return {error: "no category selected"}
        }
    }
}