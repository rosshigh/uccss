import {inject} from 'aurelia-framework';
import {Utils} from '../utils/utils';
import {DataServices} from './dataServices';

@inject(DataServices, Utils)
export class Curriculum {
    curriculumArray = undefined;
	curriculumCatArray = undefined;

    constructor(data, utils) {
        this.data = data;
		this.utils = utils;   
    }

    async getCurriculumArray(refresh, options) {
        if (!this.configArray || refresh) {
            var url = this.data.CURRICULUM_SERVICE;
            url += options ? options : "";
            try {
                let serverResponse = await this.data.get(url);
                if (!serverResponse.error) {
                    this.curriculumArray = serverResponse;
                } else {
                    this.data.processError(serverResponse);
                    return undefined;
                }
            } catch (error) {
                console.log(error);
                return undefined;
            }
        }
        return this.curriculumArray;
    }

	async getCurriculumCategoryArray(refresh, options) {
        if (!this.configArray || refresh) {
            var url = this.data.CURRICULUM_CATEGORY_SERVICE;
            url += options ? options : "";
            try {
                let serverResponse = await this.data.get(url);
                if (!serverResponse.error) {
                    this.curriculumCatArray = serverResponse;
                } else {
                    this.data.processError(serverResponse);
                    return undefined;
                }
            } catch (error) {
                console.log(error);
                return undefined;
            }
        }
        return this.curriculumCatArray;
    }

	selectCurriculum(index) {
        if (index === undefined) {
            this.selectedCurriculum = this.emptyCurriculum();
        } else {
            try {
                this.selectedCurriculum = this.utils.copyObject(this.curriculumArray[index]);
                this.editIndex = index;
            } catch (error) {
                console.log(error);
                this.selectedCurriculum = this.emptyCurriculum();
            }
        }
    }

	emptyCurriculum() {
        var obj  = new Object();
        obj.category = "";
        obj.title = "";
        obj.description = "";
		obj.notes = "";
        obj.rating = 0;
        obj.comments = new Array();
        obj.products = new Array();
        return obj;
    }

	async save() {
        if (!this.selectedCurriculum._id) {
            let response = await this.data.saveObject(this.selectedCurriculum, this.data.CURRICULUM_SERVICE, "post")
                if (!response.error) {
                    if(this.curriculumArray){
                        this.curriculumArray.push(response);;
                    }
                } else {
                     this.data.processError(response, "There was an error creating the curriculum.");
                }
                return response;
        } else {
            let response = await this.data.saveObject(this.selectedCurriculum, this.data.CURRICULUM_SERVICE, "put")
                if (!response.error) {
                    if(this.curriculumArray){
                        this.curriculumArray[this.editIndex] = this.utils.copyObject(this.selectedCurriculum, this.curriculumArray[this.editIndex]);
                    }
                }  
                return response;
        }
    }

	isDirty(obj){
      if(this.selectedCurriculum){
		if(!obj){
			var obj = this.emptyCurriculum();
		}
		return this.utils.objectsEqual(this.selectedCurriculum, obj);
        }
        return new Array();
    }

	async delete(){
		if(this.selectedCurriculum._id){
			let serverResponse = await this.data.deleteObject(this.data.CURRICULUM_SERVICE + '/' + this.selectedCurriculum._id);
			if (!serverResponse.error) {
				this.curriculumArray.splice(this.editIndex, 1);
				this.editIndex = - 1;
			}
			return serverResponse;
		}
	}

    selectCurriculumCategory(index){
         if (index === undefined) {
            this.selectedCurriculumCategory = this.emptyCurriculumCategory();
        } else {
            try {
                this.selectedCurriculumCategory = this.utils.copyObject(this.curriculumCatArray[index]);
                this.editCategoryIndex = index;
            } catch (error) {
                console.log(error);
                this.selectedCurriculumCategory = this.emptyCurriculumCategory();
            }

        }
    }

    selectCurriculumCategoryByName(name){
         if (name === undefined) {
            this.selectedCurriculumCategory = this.emptyCurriculumCategory();
        } else {
            try {
                for(var i = 0; i < this.curriculumCatArray.length; i++ ){
                    if( this.curriculumCatArray[i].name === name){
                        this.selectedCurriculumCategory = this.utils.copyObject(this.curriculumCatArray[i]);
                        this.editCategoryIndex = i;
                        break;
                    }
                }
                
            } catch (error) {
                console.log(error);
                this.selectedCurriculumCategory = this.emptyCurriculumCategory();
            }
        }
    }

    emptyCurriculumCategory() {
        var obj  = new Object();
        obj.name = "";
        obj.description = "";
        return obj;
    }

    async saveCategory(){
         if (!this.selectedCurriculumCategory._id) {
            let response = await this.data.saveObject(this.selectedCurriculumCategory, this.data.CURRICULUM_CATEGORY_SERVICE, "post")
                if (!response.error) {
                    if(this.curriculumCatArray){
                        this.curriculumCatArray.push(response);;
                    }
                } else {
                     this.data.processError(response, "There was an error creating the curriculum catgory.");
                }
                return response;
        } else {
            let response = await this.data.saveObject(this.selectedCurriculumCategory, this.data.CURRICULUM_CATEGORY_SERVICE, "put")
                if (!response.error) {
                    if(this.curriculumCatArray){
                        this.curriculumCatArray[this.editCategoryIndex] = this.utils.copyObject(this.selectedCurriculumCategory, this.curriculumCatArray[this.editCategoryIndex]);
                    }
                } else {
                     this.data.processError(response, "There was an error creating the curriculum catgory.");
                }
                return response;
        }
    }

    async deleteCategory(){
        if(this.selectedCurriculumCategory._id){
			let serverResponse = await this.data.deleteObject(this.data.CURRICULUM_CATEGORY_SERVICE + '/' + this.selectedCurriculumCategory._id);
			if (!serverResponse.error) {
				this.curriculumCatArray.splice(this.editCategoryIndex, 1);
				this.editCategoryIndex = - 1;
			}
			return serverResponse;
		}
    }

    curriculumExist(category){
         let exists = false;
         for(var i = 0; i < this.curriculumArray.length; i++){
             if(this.curriculumArray[i].category === category){
                 exists = true;
                 break;
             }
         }
         return exists;
    }

}