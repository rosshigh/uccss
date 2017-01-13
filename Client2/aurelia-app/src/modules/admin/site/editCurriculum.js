import {inject} from 'aurelia-framework';
import {DataTable} from '../../../resources/utils/dataTable';
import {AppConfig} from '../../../config/appConfig';
import {Utils} from '../../../resources/utils/utils';
import {Curriculum} from '../../../resources/data/curriculum';
import {Products} from '../../../resources/data/products';
import {CommonDialogs} from '../../../resources/dialogs/common-dialogs';
import Validation from '../../../resources/utils/validation';
import $ from 'jquery';
import moment from 'moment';

@inject(DataTable, Curriculum, Products, AppConfig, Utils, CommonDialogs, Validation)
export class EditCurriculum {
    curriculumItemSelected = false;
    // navControl = "newsNavButtons";
    spinnerHTML = "";
    curriculumContent = " ";
	newItem = false;

    constructor(datatable, curriculum, products, config, utils, dialog, validation) {
        this.dataTable = datatable;
        this.dataTable.initialize(this);
        this.utils = utils;
        this.curriculum = curriculum;
		this.products = products;
        this.dialog = dialog;
        this.config = config;
        this.validation = validation;
        this.validation.initialize(this);
    }

    attached(){
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
        // this.dataTable.createPageButtons(1);
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
        this.curriculumContent = "";
        $("#editTitle").focus();
        this.curriculumItemSelected = true;
		this.newItem = true;
    }

    async edit(index, el) {
        this.editIndex = this.dataTable.getOriginalIndex(index);
        this.curriculum.selectCurriculum(this.editIndex);
        this.curriculumContent =  this.curriculum.selectedCurriculum.description ? this.curriculum.selectedCurriculum.description : " ";
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
            this.curriculum.selectedCurriculum.description = this.curriculumContent;
            let serverResponse = await this.curriculum.save();
            if (!serverResponse.error) {
                 this.dataTable.updateArray(this.curriculum.curriculumArray);
                this.utils.showNotification("The item was saved");
            }
            this.curriculumItemSelected = false;
        }
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
			).then(response => {
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
                ).then(response => {
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
            ).then(response => {
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
    }

    _setupValidation(){
        this.validation.addRule(1,"editTitle", [{"rule":"required","message":"Title is required", "value": "curriculum.selectedCurriculum.title"}]);
		this.validation.addRule(1,"itemType", [{"rule":"required","message":"Title is required", "value": "curriculum.selectedCurriculum.category"}]);
        this.validation.addRule(2,"editCategoryName", [{"rule":"required","message":"Name is required", "value": "curriculum.selectedCurriculumCategory.name"}]);
    }
}