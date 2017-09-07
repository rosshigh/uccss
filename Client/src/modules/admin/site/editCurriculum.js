import {inject} from 'aurelia-framework';
import {DataTable} from '../../../resources/utils/dataTable';
import {AppConfig} from '../../../config/appConfig';
import {Utils} from '../../../resources/utils/utils';
import {Curriculum} from '../../../resources/data/curriculum';
import {Products} from '../../../resources/data/products';
import {CommonDialogs} from '../../../resources/dialogs/common-dialogs';
import Validation from '../../../resources/utils/validation';
import {EventAggregator} from 'aurelia-event-aggregator';

import moment from 'moment';

@inject(DataTable, Curriculum, Products, AppConfig, Utils, CommonDialogs, Validation, EventAggregator)
export class EditCurriculum {
    curriculumItemSelected = false;
    spinnerHTML = "";
	newItem = false;
    selectedFile = "";
    removedFiles = new Array();
    filesSelected = false;
    newDownload = false;
    selectedFiles;

    toolbar = [
		['style', ['style', 'bold', 'italic', 'underline','clear']],
		['color', ['color']],
		['font', ['strikethrough', 'superscript', 'subscript']],
		['layout', ['ul', 'ol', 'paragraph']],
		['insert', [ 'link', 'table', 'hello']],
		['misc', ['undo', 'redo', 'fullscreen', 'codeview']]
	];

    constructor(datatable, curriculum, products, config, utils, dialog, validation, ea) {
        this.dataTable = datatable;
        this.dataTable.initialize(this);
        this.utils = utils;
        this.curriculum = curriculum;
		this.products = products;
        this.dialog = dialog;
        this.config = config;
        this.validation = validation;
        this.validation.initialize(this);
        this.ea = ea; 
    }

    attached(){
        this.mySubscription = this.ea.subscribe('upload-progress', obj => {
            let progress = obj.progress/obj.total * 100 + '%'; 
            var elem = $("#progressBar").css('width', progress);
            // elem.style.width = obj.progress/obj.total * 100 + '%'; 
        });
        $('[data-toggle="tooltip"]').tooltip();
		this._setupValidation();
    }

    async activate() {
		 let responses =  await Promise.all([
		 	this.curriculum.getCurriculumCategoryArray(true, '?order=name'),
         	this.curriculum.getCurriculumArray(true, '?order=sortOrder'),
			this.products.getProductsArray('?order=name'),
			this.config.getConfig()
		 ]);
        this.dataTable.updateArray(this.curriculum.curriculumArray);
		this.filterList();
    }

    async refresh() {
        this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
        await this.curriculum.getCurriculumArray(true);
        this.dataTable.updateArray(this.curriculum.curriculumArray);
        this.spinnerHTML = "";
    }

    async new() {
		this.editIndex = -1;
        this.curriculum.selectCurriculum();
        this.curriculumItemSelected = "";
        $("#editTitle").focus();
        this.curriculumItemSelected = true;
		this.newItem = true;
    }

    async edit(index, el) {
        this.editIndex = this.dataTable.getOriginalIndex(index);
        this.curriculum.selectCurriculum(this.editIndex);
		this.originalCurriculumObject = this.utils.copyObject(this.curriculum.selectedCurriculum);
		this.newItem = false;

        //Editing a product
        $("#editTitle").focus();

        //Reset the selected row
        if (this.selectedRow) this.selectedRow.children().removeClass('info');
        this.selectedRow = $(el.target).closest('tr');
        this.selectedRow.children().addClass('info')
        this.curriculumItemSelected = true;
    }

    cancel() {
        if (this.editIndex == -1) {
            this.new();
        } else {
          this.curriculum.selectCurriculum(this.editIndex);
        }
    }

    async save() {
        if(this.validation.validate(1)){
            let serverResponse = await this.curriculum.save();
            if (!serverResponse.error) {
                if (this.filesToUpload && this.filesToUpload.length > 0) {
                    this.uploading = true;
                    await this.curriculum.uploadFile(this.filesToUpload);
                     this.utils.showNotification("The item was saved");
                    this._cleanUp();
                } else {
                    this.utils.showNotification("The item was saved");
                    this._cleanUp();
                }
                 this.dataTable.updateArray(this.curriculum.curriculumArray);
            }
            this.curriculumItemSelected = false;
        }
    }

     changeFiles() {
        this.filesToUpload = new Array(); 
        for(var i = 0; i < this.files.length; i++){
            let addFile = true;
            this.filesToUpload.forEach(item => {
                if(item.name === this.files[i].name) addFile = false;
            })
            if(addFile) this.filesToUpload.push(this.files[i]);
        }
    }

    removeFile(index){
        this.filesToUpload.splice(index,1);
    }

	filterList(){
      if(this.filter){
        var thisFilter = this.filter
        this.filteredProductsArray = this.products.productsArray.filter((item) => {
          return item.name.toUpperCase().indexOf(thisFilter.toUpperCase()) != -1;
        });
      } else {
          this.filteredProductsArray = this.products.productsArray;
      }
  	}

	selectProduct(el){
		$("#requestProductsLabel").html("Requested Products");
		if( this.curriculum.selectedCurriculum.products.indexOf(el.target.id) === -1) this.curriculum.selectedCurriculum.products.push(el.target.id);
	}

	removeProduct(el){
		for(var i = 0; i<this.curriculum.selectedCurriculum.products.length; i++){
		if(el.target.id === this.curriculum.selectedCurriculum.products[i]){
			this.curriculum.selectedCurriculum.products.splice(i,1);
		}
		}
	}

	delete(){
		return this.dialog.showMessage(
			"Are you sure you want to delete the item?", 
			"Delete Item", 
			['Yes', 'No']
			).whenClosed(response => {
				if(!response.wasCancelled){
					this.deleteItem();    
				}
			});
	}

    async deleteItem(){
        let serverResponse = await this.curriculum.delete();
        if (!serverResponse.error) {
                this.dataTable.updateArray(this.curriculum.curriculumArray);
                this.utils.showNotification("The Item was deleted");
        }
        this.curriculumItemSelected = false;
    }

    back() {
        var changes = this.curriculum.isDirty(this.originalCurriculumObject);
        if(changes.length){
            return this.dialog.showMessage(
                "The item has been changed. Do you want to save your changes?", 
                "Save Changes", 
                ['Yes', 'No']
                ).whenClosed(response => {
                    if(!response.wasCancelled){
                        this.save();    
                    } else {
                        this._cleanUp();
                    }
                });
        } else {
           this._cleanUp();
        }

    }

    openEditCatForm(newOrEdit){ 
        if(newOrEdit === 'new'){
            this.curriculum.selectCurriculumCategory();
            this.categoryDescription = "";
            this.showCategoryForm = true; 
            this.editCategoryFlag = false;
        } else {
            this.curriculum.selectCurriculumCategoryByName(this.curriculum.selectedCurriculum.category);
             this.categoryDescription = this.curriculum.selectedCurriculumCategory.description;
            this.showCategoryForm = true;
            this.editCategoryFlag = true;
        }
    }

    async saveCategory(){
        if(this.validation.validate(2)){
            this.curriculum.selectedCurriculumCategory.description = this.categoryDescription;
            let serverResponse = await this.curriculum.saveCategory();
            if (!serverResponse.error) {
                this.utils.showNotification("The category was saved");
            }
            this.showCategoryForm = false;
        }
    }

    cancelEditCategory(){
         this.showCategoryForm = false;
    }

    deleteCat(){
        if(this.curriculum.curriculumExist(this.curriculum.selectedCurriculum.category)){
            return this.dialog.showMessage(
            "You can't delete that category because there are exisitng curricula that use it?",
            "Can't Delete Category",
            ['OK']
        ).then(response => {
            
        });
        } else {
            return this.dialog.showMessage(
                "Are you sure you want to delete the category?",
                "Delete Category",
                ['Yes', 'No']
            ).whenClosed(response => {
                if (!response.wasCancelled) {
                    this.deleteCategory();
                }
            });
        }  
    }

    async deleteCategory(){
        var name = this.curriculum.selectedCurriculumCategory.name;
        let serverResponse = await this.curriculum.deleteCategory();
        if (!serverResponse.error) {
            this.utils.showNotification("Category " + name + " was deleted");
        }
    }

    _cleanUp(){
        this.showCategoryForm = false;
        this.curriculumItemSelected = false;
        this.selectedFiles = undefined;
        this.files = null;
        this.selectedFile = "";
        this.filesToUpload = new Array();
        $("#progressBar").css('width', 0);
    }

    _setupValidation(){
        this.validation.addRule(1,"editTitle", [{"rule":"required","message":"Title is required", "value": "curriculum.selectedCurriculum.title"}]);
		this.validation.addRule(1,"itemType", [{"rule":"required","message":"Title is required", "value": "curriculum.selectedCurriculum.category"}]);
        this.validation.addRule(2,"editCategoryName", [{"rule":"required","message":"Name is required", "value": "curriculum.selectedCurriculumCategory.name"}]);
    }
}