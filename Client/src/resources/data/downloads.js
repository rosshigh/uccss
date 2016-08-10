import {inject} from 'aurelia-framework';
import {DataServices} from './dataServices';
import {Utils} from '../utils/utils';
import {AppConfig} from '../../config/appConfig';
import moment from 'moment';

@inject(DataServices, Utils, AppConfig)
export class Downloads {
    editIndex;              //Index of selected product

    constructor(data, utils, config) {
        this.data = data;
        this.utils = utils;
        this.config = config; 
    }

    //Downloads
    async getDownloadsArray(refresh, options) {
        if (!this.appDownloadsArray || refresh) {
            var url = this.data.DOWNLOADS_SERVICE;
            url += options ? options : "";
            try {
                let serverResponse = await this.data.get(url);
                if (!serverResponse.status) {
                    this.appDownloadsInternal = serverResponse;
                    for (var i = 0, x = this.appDownloadsInternal.length; i < x; i++) {
                        this.appDownloadsInternal[i].baseIndex = i;
                    }
                    this.appDownloadsArray = serverResponse;
                } else {
                    return undefined;
                }
            } catch (error) {
                console.log(error);
                return undefined;
            }
        }
        return this.appDownloadsArray;
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
            let serverResponse = await this.data.saveObject(this.selectedDownload, this.data.DOWNLOADS_SERVICE, "post");
            if (!serverResponse.status) {
                this.selectedDownload = serverResponse;
                this.appDownloadsInternal.push(this.selectedDownload);
                this.appDownloadsArray = this.appDownloadsInternal;
                this.editDownloadIndex = this.appDownloadsInternal.length - 1;
            }
            return serverResponse;
        } else {
            var serverResponse = await this.data.saveObject(this.selectedDownload, this.data.DOWNLOADS_SERVICE, "put");
            if (!serverResponse.status) {
                this.appDownloadsArray[this.editDownloadIndex] = this.utils.copyObject(this.selectedDownload, this.appDownloadsArray[this.editDownloadIndex]);
                this.appDownloadsInternal[this.appDownloadsArray[this.editDownloadIndex].baseIndex] = this.utils.copyObject(this.selectedDownload, this.appDownloadsInternal[this.appDownloadsArray[this.editDownloadIndex].baseIndex]);
            }
            return serverResponse;
        }

    }

    uploadFile(files){
       this.data.upLoadFiles(this.selectedDownload._id, this.utils.toCamelCase(this.selectedDownload.name), files, "download")
    }

    async deleteDownload(){
         let serverResponse = await this.data.deleteObject(this.data.DOWNLOADS_SERVICE + '/' + this.selectedDownload._id);
            if (serverResponse.status === 204) {
                this.appDownloadsInternal.splice(this.editDownloadIndex, 1);
                this.appDownloadsArray = this.appDownloadsInternal;
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
            var url = this.data.APPLICATION_CATEGORY_SERVICE;
            url += options ? options : "";;
            try {
                let serverResponse = await this.data.get(url);
                if (!serverResponse.status) {
                    this.appCatsArrayInternal = serverResponse;
                    for (var i = 0, x = this.appCatsArrayInternal.length; i < x; i++) {
                        this.appCatsArrayInternal[i].baseIndex = i;
                    }
                    this.appCatsArray = serverResponse;
                } else {
                    return undefined;
                }
            } catch (error) {
                console.log(error);
                return undefined;
            }
        }
        return this.appCatsArray;
    }

    selectCategory(index) {
        if (!index && index != 0) {
            this.selectedCat = this.emptyCat();
        } else {
            try {
                for(var i = 0; i<this.appCatsArray.length; i++){
                    if(this.appCatsArray[i].code == index){
                        index = i;
                        break;
                    }
                }
                this.selectedCat = this.utils.copyObject(this.appCatsArray[index]);
                this.editCatIndex = index;
            } catch (error) {
                this.selectedCat = this.emptyCat();
            }
        }
    }

    emptyCat() {
        var newObj = new Object();
        var newCode = 0;
        for(var i = 0; i < this.appCatsArray.length; i++){
            if(this.appCatsArray[i].code > newCode) newCode = this.appCatsArray[i].code;
        }
        newObj.code = newCode + 1;
        newObj.description = "";

        return newObj;
    }

    async saveCategory() {
        if (!this.selectedCat) {
            return;
        }

        if (!this.selectedCat._id) {
            let serverResponse = await this.data.saveObject(this.selectedCat, this.data.APPLICATION_CATEGORY_SERVICE, "post");
            if (!serverResponse.status) {
                this.appCatsArrayInternal.push(serverResponse);
                this.appCatsArray = this.appCatsArrayInternal
                this.editCatIndex = this.appCatsArrayInternal.length - 1;
            }
            return serverResponse;
        } else {
            var serverResponse = await this.data.saveObject(this.selectedCat, this.data.APPLICATION_CATEGORY_SERVICE, "put");
            if (!serverResponse.status) {
                this.appCatsArray[this.editCatIndex] = this.utils.copyObject(this.selectedCat, this.appCatsArray[this.editCatIndex]);
                this.appCatsArrayInternal[this.appCatsArray[this.editCatIndex].baseIndex] = this.utils.copyObject(this.selectedCat, this.appCatsArrayInternal[this.appCatsArray[this.editCatIndex].baseIndex]);
            }
            return serverResponse;
        }

    }

    async deleteCat(){
        if (this.selectedCat._id) {
            let serverResponse = await this.data.deleteObject(this.data.APPLICATION_CATEGORY_SERVICE + '/' + this.selectedCat._id);
            if (serverResponse.status === 204) {
                this.appCatsArrayInternal.splice(this.editCatIndex, 1);
                this.appCatsArray = this.appCatsArrayInternal;
                this.editCatIndex = - 1;
            }
            return serverResponse;
        } else {
            return {error: "no category selected"}
        }
    }


    //     if(this.editIndex >= 0 && this.selectedSession){
    //         for (var property in this.selectedSession) {
    //             if (this.selectedSession.hasOwnProperty(property)) {
    //                 switch(property){
    //                      case 'startDate':
    //                     case 'endDate':
    //                     case 'requestsOpenDate':
    //                         if(new Date(this.selectedSession[property]).getTime() != new Date(this.sessionsArray[this.editIndex][property]).getTime()){
    //                             return true;
    //                         }
    //                     default:
    //                         if(this.selectedSession[property] != this.sessionsArray[this.editIndex][property]) {
    //                             if(!(this.selectedSession[property] === ""  && this.sessionsArray[this.editIndex][property] === undefined)){
    //                                 return true;
    //                             }
    //                         }
    //                         break;

    //                 }

    //             }
    //         }
    //     }
    //     return false;
    // }


    // filter() {
    //     var keep;
    //     var index = 0;
    //     var filters = this.filters;
    //     this.sessionsArray = this.sessionsArrayInternal.filter((item) => {
    //         //Assume the item should be eliminated
    //         keep = false;
    //         //For each filter in filterValues
    //         for (var i = 0, x = filters.length; i < x; i++) {
    //             switch (filters[i].compound){
    //                 case 'or':
    //                     var values = filters[i].value.split(':');
    //                     for(var j = 0; j < values.length; j++){
    //                         keep = keep || item[filters[i].property] === values[j];
    //                     }
    //                     break;
    //                 case 'and':
    //                 break;
    //                 default:
    //             }

    //             if (!keep) break;
    //         }
    //         return keep;
    //     })

    //     if (this.sort && this.sort.length) {
    //         this.sessionsArray = this.sortArray();
    //     }
    // }

    // sortArray() {
    //     var sortDirection = this.sort[0].direction == "ASC" ? 1 : -1;
    //     var propName = this.sort[0].property;
    //     return  this.sessionsArray
    //         .sort((a, b) => {
    //             return ((a[propName] < b[propName]) ? -1 : (a[propName] > b[propName]) ? 1 : 0) * sortDirection;
    //         });
    // }

}
