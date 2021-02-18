import { inject } from 'aurelia-framework';
import { DataServices } from './dataServices';
import { Utils } from '../utils/utils';
import { AppConfig } from '../../appConfig';

@inject(DataServices, Utils, AppConfig)
export class FAQServices {

    DOCUMENTS_SERVICE = "documents";
    DOCUMENTS_CATEGORY_SERVICE = "documentCategories";

    constructor(data, utils, config) {
        this.data = data;
        this.utils = utils;
        this.config = config;
    }

    async getQuestionsArray(options) {
        var url = this.DOCUMENTS_CATEGORY_SERVICE;
        url += options ? options : "";
        try {
            let serverResponse = await this.data.get(url);
            if (!serverResponse.error) {
                this.objectQuesitonsArray = serverResponse;
            } else {
                this.objectQuesitonsArray = [];
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
                this.selectedCat = this.utils.copyObject(this.objectQuesitonsArray[index]);
            } catch (error) {
                this.selectedCat = this.emptyCat();
            }
        }
    }

    emptyCat() {
        var newObj = new Object();
        newObj.description = "";
        newObj.subCategories = [];
        newObj.category = 'FAQ';
        newObj.sortOrder = this.objectQuesitonsArray.length ? this.objectQuesitonsArray.length : 0;

        return newObj;
    }

    emptySubCat() {
        var newObj = new Object();
        newObj.description = "";
        newObj.questions = new Array();
        newObj.sortOrder = this.selectedCat.subCategories.length;

        return newObj;
    }

    setCategory(obj){
        if(obj){
            this.selectedCat = this.utils.copyObject(obj);
        }
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

    async deleteCategory() {
        let serverResponse = await this.data.deleteObject(this.DOCUMENTS_CATEGORY_SERVICE + "/" + this.selectedCat._id);
        return serverResponse;
    }

    setCategory(obj) {
        if (!obj) {
            this.selectedCat = this.emptyCat();
        } else {
            this.selectedCat = this.utils.copyObject(obj);
        }
    }

    selectQuestion(index) {
        if (!index && index != 0) {
            this.selectedQuestion = this.emptyQuestion();
        } 
        // else {
        //     try {
        //         this.selectedCat = this.utils.copyObject(this.selectedCat.objectQuesitonsArray[index]);
        //     } catch (error) {
        //         this.selectedCat = this.emptyCat();
        //     }
        // }
    }

    emptyQuestion(){
        let newObj = new Object();
        newObj.question = "";
        newObj.answer = "";
        newObj.links = new Array();

        return newObj;
    }

    setQuestion(question){
        this.selectedQuestion = this.utils.copyObject(question);
    }

}
