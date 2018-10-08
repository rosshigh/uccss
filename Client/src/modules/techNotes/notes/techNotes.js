import {inject} from 'aurelia-framework';
import {DataTable} from '../../../resources/utils/dataTable';
import {AppConfig} from '../../../config/appConfig';
import {Utils} from '../../../resources/utils/utils';
import {Systems} from '../../../resources/data/systems';
import {Products} from '../../../resources/data/products';
import {CommonDialogs} from '../../../resources/dialogs/common-dialogs';
import Validation from '../../../resources/utils/validation';
import {DocumentsServices} from '../../../resources/data/documents';
import {People} from '../../../resources/data/people';

@inject(DataTable, Products, Utils, Systems, CommonDialogs, Validation, AppConfig, DocumentsServices, People)
export class EditProducts {
    selectedFiles;
    removedFiles = new Array();
    spinnerHTML = "";

    toolbar = [
		['style', ['style', 'bold', 'italic', 'underline','clear']],
		['color', ['color']],
        ['font', ['strikethrough', 'superscript', 'subscript']],
        ['fontsize', ['fontsize']],
		['layout', ['ul', 'ol', 'paragraph']],
		['insert', [ 'link', 'table', 'hello']],
		['misc', ['undo', 'redo', 'fullscreen', 'codeview']]
	];

    constructor(datatable, products, utils, systems, dialog, validation, config, documents, people) {
        this.dataTable = datatable;
        this.dataTable.initialize(this);
        this.utils = utils;
        this.products = products;
        this.systems = systems;
        this.dialog = dialog;
        this.config = config;
        this.documents = documents;
        this.people = people;
        this.validation = validation;
        this.validation.initialize(this);
        this._setupValidation();

        this.userObj = JSON.parse(sessionStorage.getItem('user'));
    }

    _setupValidation(){
        this.validation.addRule(1,"category",[{"rule":"required","message":"Category is required", "value": "people.selectedTechNote.categoryId"}]);
        this.validation.addRule(1,"noteError",[{"rule":"required","message":"The text of the note is required", "value": "people.selectedTechNote.note"}]);
    }

    attached(){
        $('[data-toggle="tooltip"]').tooltip();
    }

    async activate() {
        let responses = await Promise.all([
            this.people.getTechNotesArray('?order=dateCreated:DSC', true),
            this.people.getTechNotesCatArray('?order=category', true),
            this.products.getProductsArray('?order=name', true),
            this.systems.getSystemsArray('?order=sid', true),
            this.config.getConfig()
        ]);
        this.dataTable.updateArray(this.people.techNotesArray);
        this.dataTable.createPageButtons(1);
    }

    async refresh() {
        this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
        await this.people.getTechNotesArray('?order=dateCreated:DSC', true);
        this.dataTable.updateArray(this.people.techNotesArray);
        this.spinnerHTML = "";
        this. _cleanUpFilters();
    }

    _cleanUpFilters(){

    }

    new(){
        this.people.selectTechNote();
        this.noteSelected = true;
    }

    edit(index, event){
        this.people.selectTechNote(index);
        this.noteSelected = true;
    }

    back(){
        this.noteSelected = false;
    }

    cancel(){
        this.people.selectTechNote();
    }

    async save(){
        if(this.validation.validate(1)){
            this.people.selectedTechNote.personId = this.userObj._id;
            let response = await this.people.saveTechNote();
            if(!response.error){
                this.utils.showNotification('The note was saved');
                this.dataTable.updateArray(this.people.techNotesArray);
            }
        }
	}

    changeFiles(){
        this.filesToUpload = new Array(); 
        this.filesToUpload.push(this.files[0]);
        this.siteinfo.selectedItem.url = this.config.DOWNLOAD_URL + '/site/'  + this.filesToUpload[0].name;  
        this.siteinfo.selectedItem.file.fileName = this.filesToUpload[0].name;
    }

	removeFile(index){
        this.filesToUpload.splice(index,1);
    }

    openEditCatForm( newOrEdit){ 
        if(newOrEdit === 'new'){
            this.people.selectTechNoteCat();
            this.categoryDescription = "";
            this.showCategoryForm = true; 
        } else {
            if(this.people.selectedTechNote.categoryId){
                this.people.selectTechNoteCatByID(this.people.selectedTechNote.categoryId);
                this.showCategoryForm = true;
            }
        }
    }

	cancelEditCategory(){
		this.showCategoryForm = false;
	}

	async saveCategory(){
        let response = await this.people.saveTechNoteCat();
        if(!response.error){
            await this.people.getTechNotesCatArray('?order=category', true);
            this.showCategoryForm = false; 
        } else {
            this.utils.showNotification('There was an error saving the category.')
        }
		
	}

	async deleteCat(){
        let response = await this.people.deleteTechNoteCat();
        if(response.error){
            this.utils.showNotification('There was an error deleting the category');
        } else {
            this.showCategoryForm = false;
        }
	}
}