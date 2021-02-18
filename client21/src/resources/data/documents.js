import { inject } from 'aurelia-framework';
import { DataServices } from './dataServices';
import { Utils } from '../utils/utils';
import { AppConfig } from '../../appConfig';

@inject(DataServices, Utils, AppConfig)
export class DocumentsServices {

    DOCUMENTS_SERVICE = "documents";
    DOCUMENTS_CATEGORY_SERVICE = "documentCategories";

    constructor(data, utils, config) {
        this.data = data;
        this.utils = utils;
        this.config = config;
    }

    async getDocumentsArray(options) {
        var url = this.DOCUMENTS_SERVICE;
        url += options ? options : "";
        try {
            let serverResponse = await this.data.get(url);
            if (!serverResponse.status) {
                this.objectsArray = serverResponse;
            } else {
                this.objectsArray = [];
                this.data.processError(serverResponse);
            }
        } catch (error) {
            console.log(error);
        }

    }

    async getDocumentsCategoriesArray(options) {
        var url = this.DOCUMENTS_CATEGORY_SERVICE;
        url += options ? options : "";;
        try {
            let serverResponse = await this.data.get(url);
            if (!serverResponse.error) {
                this.objectCategoriesArray = serverResponse;
            } else {
                this.objectCategoriesArray = [];
                this.data.processError(serverResponse);
            }
        } catch (error) {
            console.log(error);
        }
    }

    selectCategory(index) {
        if (!index && index != 0) {
            this.selectedCat = this.emptyCat();
        } else {
            try {
                this.selectedCat = this.utils.copyObject(this.objectCategoriesArray[index]);
                // this.editCatIndex = index;
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
                for (var i = 0; i < this.docCatsArray.length; i++) {
                    if (this.docCatsArray[i].DocCode == index) {
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

    setCategory(obj) {
        this.selectedCat = this.utils.copyObject(obj);
    }

    emptyCat() {
        var newObj = new Object();
        newObj.description = "";
        newObj.subCategories = [];
        newObj.category = 'DOC';
        newObj.sortOrder = this.objectCategoriesArray.length;

        return newObj;
    }

    emptySubCat() {
        var newObj = new Object();
        newObj.description = "";
        newObj.subSubCategories = [];
        newObj.sortOrder = this.selectedCat.subCategories.length;

        return newObj;
    }

    emptySubSubCat(index) {
        var newObj = new Object();
        newObj.description = "";
        newObj.documents = [];
        newObj.sortOrder = this.selectedCat.subCategories[index].subSubCategories.length;

        return newObj;
    }

    async deleteSubSubCategory(subIndex, subSubIndex){
        if (!this.selectedCat) {
            return;
        }

        this.selectedCat.subCategories[subIndex].subSubCategories.splice(subSubIndex, 1);  
console.log( this.selectedCat.subCategories[subIndex].subSubCategories)             
        let serverResponse = await this.data.saveObject(this.selectedCat, this.DOCUMENTS_CATEGORY_SERVICE, "put");
        return serverResponse;
    }

    async saveCategory() {
        if (!this.selectedCat) {
            return;
        }

        if (!this.selectedCat._id) {
            let serverResponse = await this.data.saveObject(this.selectedCat, this.DOCUMENTS_CATEGORY_SERVICE, "post");
            return serverResponse;
        } else {
            var serverResponse = await this.data.saveObject(this.selectedCat, this.DOCUMENTS_CATEGORY_SERVICE, "put");
            return serverResponse;
        }

    }

    async deleteCategory(){
        let serverResponse = await this.data.deleteObject(this.DOCUMENTS_CATEGORY_SERVICE + "/" + this.selectedCat._id);
        return serverResponse;
    }

    setDocument(obj) {
        if (!obj) {
            this.selectedDocument = this.emptyDocument();
        } else {
            this.selectedDocument = this.utils.copyObject(obj);
        }
    }

    emptyDocument() {
        var newObj = new Object();
        newObj.name = "";
        newObj.description = "";
        newObj.active = true;
        newObj.createdDate = new Date();
        newObj.sortOrder = 0;
        newObj.displayDate = new Date();
        newObj.size = 0;
        newObj.guid = this.utils.guid();

        return newObj;
    }

    uploadFile(files, filePrefix) {
        this.data.uploadFiles(files, this.DOCUMENTS_CATEGORY_SERVICE + "/file/" + filePrefix);
    }

}