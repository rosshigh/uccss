import {inject} from 'aurelia-framework';
import {DataServices} from './dataServices';
import {Utils} from '../utils/utils';
import {AppConfig} from '../../config/appConfig';
import moment from 'moment';

@inject(DataServices, Utils, AppConfig)
export class DocumentsServices {

    constructor(data, utils, config) {
        this.data = data;
        this.utils = utils;
        this.config = config;
    }

    //Documents
    async getDocumentsArray(refresh, options) {
        if (!this.documentsArray || refresh) {
            var url = this.data.DOCUMENTS_SERVICE;
            url += options ? options : "";
            try {
                let serverResponse = await this.data.get(url);
                if (!serverResponse.status) {
                    this.documentsArray = serverResponse;
                } else {
                    return undefined;
                }
            } catch (error) {
                console.log(error);
                return undefined;
            }
        }
        return this.documentsArray;
    }

    selectDocument(index) {
        if (!index && index != 0) {
            this.selectedDocument = this.emptyDocument();
        } else {
            try {
                this.selectedDocument = this.utils.copyObject(this.documentsArray[index]);
                this.editDocumentIndex = index;
            } catch (error) {
                this.selectedDocument = this.emptyDocument();
            }

        }

    }

    emptyDocument() {
        var newObj = new Object();
        newObj.name = "";
        newObj.description = "";
        newObj.type = 0;
        newObj.files = new Array();
        newObj.active = true;
        newObj.createdDate = new Date();

        return newObj;
    }

    async saveDocument() {
        if (!this.selectedDocument) {
            return;
        }

        if (!this.selectedDocument._id) {
            let serverResponse = await this.data.saveObject(this.selectedDocument, this.data.DOCUMENTS_SERVICE, "post");
            if (!serverResponse.status) {
                this.selectedDocument = serverResponse;
                this.documentsArray.push(this.selectedDocument);
                this.editDocumentIndex = this.documentsArray.length - 1;
            }
            return serverResponse;
        } else {
            var serverResponse = await this.data.saveObject(this.selectedDocument, this.data.DOCUMENTS_SERVICE, "put");
            if (!serverResponse.status) {
                this.documentsArray[this.editDocumentIndex] = this.utils.copyObject(this.selectedDocument, this.documentsArray[this.editDocumentIndex]);
            }
            return serverResponse;
        }

    }

    uploadFile(files, version){
        let path = this.selectedCat.code + '$@' + this.selectedDocument.name
       this.data.uploadFiles(files, this.data.DOCUMENTS_FILE_UPLOAD + "/" + path + '/' + version);
    }

    async deleteFile(index){
        if (!this.selectedDocument || !this.selectedDocument._id) {
            return;
        }
        let serverResponse = await this.data.deleteObject(this.data.DOCUMENTS_FILE_UPLOAD + '/' + this.selectedDocument._id + '/' + index);
        if (!serverResponse.status) {
            this.selectedDocument.files.splice(index,1);
            this.documentsArray[this.editDocumentIndex] = this.utils.copyObject(this.selectedDocument, this.documentsArray[this.editDocumentIndex]);
        }
        return serverResponse;
    }

    async deleteDocument(){
         let serverResponse = await this.data.deleteObject(this.data.DOCUMENTS_SERVICE + '/' + this.selectedDocument._id);
            if (serverResponse.status === 204) {
                this.documentsArray.splice(this.editDocumentIndex, 1);
                this.editDownloadIndex = - 1;
            }
            return serverResponse;
    }

    isDirty(obj){
        if(this.selectedDocument){
            if(!obj){
                var obj = this.emptyDocument();
            }
            var skip = ['file'];
            return this.utils.objectsEqual(this.selectedDocument, obj, skip );
        }
        return new Array();
     }

    //Categories
    async getDocumentsCategoriesArray(refresh, options) {
        if (!this.docCatsArray || refresh) {
            var url = this.data.DOCUMENTS_CATEGORY_SERVICE;
            url += options ? options : "";;
            try {
                let serverResponse = await this.data.get(url);
                if (!serverResponse.error) {
                    this.docCatsArray = serverResponse;
                } else {
                    return undefined;
                }
            } catch (error) {
                console.log(error);
                return undefined;
            }
        }
        return this.docCatsArray;
    }

    selectCategory(index){
         if (!index && index != 0) {
            this.selectedCat = this.emptyCat();
        } else {
            try {
                this.selectedCat = this.utils.copyObject(this.docCatsArray[index]);
                this.editCatIndex = index;
            } catch (error) {
                this.selectedCat = this.emptyCat();
            }
        }
    }

    selectCategoryByCode(index) {
        if (!index && index != 0) {
            this.selectedCat = this.emptyCat();
        } else {
            try {
                for(var i = 0; i<this.docCatsArray.length; i++){
                    if(this.docCatsArray[i].code == index){
                        index = i;
                        break;
                    }
                }
                this.selectedCat = this.utils.copyObject(this.docCatsArray[index]);
                this.editCatIndex = index;
            } catch (error) {
                this.selectedCat = this.emptyCat();
            }
        }
    }

    emptyCat() {
        var newObj = new Object();
        var newCode = 0;
        for(var i = 0; i < this.docCatsArray.length; i++){
            if(this.docCatsArray[i].code > newCode) newCode = this.docCatsArray[i].code;
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
            let serverResponse = await this.data.saveObject(this.selectedCat, this.data.DOCUMENTS_CATEGORY_SERVICE, "post");
            if (!serverResponse.status) {
                this.docCatsArray.push(serverResponse);
                this.editCatIndex = this.docCatsArray.length - 1;
            }
            return serverResponse;
        } else {
            var serverResponse = await this.data.saveObject(this.selectedCat, this.data.DOCUMENTS_CATEGORY_SERVICE, "put");
            if (!serverResponse.status) {
                this.docCatsArray[this.editCatIndex] = this.utils.copyObject(this.selectedCat, this.docCatsArray[this.editCatIndex]);
            }
            return serverResponse;
        }

    }

    async deleteCat(){
        if (this.selectedCat._id) {
            let serverResponse = await this.data.deleteObject(this.data.DOCUMENTS_CATEGORY_SERVICE + '/' + this.selectedCat._id);
            if (serverResponse.status === 204) {
                this.docCatsArray.splice(this.editCatIndex, 1);
                this.editCatIndex = - 1;
            }
            return serverResponse;
        } else {
            return {error: "no category selected"}
        }
    }

}
