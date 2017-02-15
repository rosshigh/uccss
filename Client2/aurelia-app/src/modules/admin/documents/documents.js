import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";
import {DataTable} from '../../../resources/utils/dataTable';
import {AppConfig} from '../../../config/appConfig';
import {Utils} from '../../../resources/utils/utils';
import {DocumentsServices} from '../../../resources/data/documents';
import {People} from '../../../resources/data/people';
import {CommonDialogs} from '../../../resources/dialogs/common-dialogs';
import Validation from '../../../resources/utils/validation';
import $ from 'jquery';

@inject(Router, DataTable, DocumentsServices, People, Utils, AppConfig, CommonDialogs, Validation)
export class Documents {
    navControl = "documentssNavButtons";
    spinnerHTML = "";
    filterValues = new Array();
    typeSelected = "";
    categoryForm = false;
    showDocumentForm = false;
    showDocuments = false;
    displayTitle = "";

    constructor(router, datatable, documents, people, utils, config, dialog, validation) {
        this.router = router;
        this.dataTable = datatable;
        this.dataTable.initialize(this);
        this.utils = utils;
        this.documents = documents;
        this.config = config;
        this.people = people;
        this.dialog = dialog;
        this.validation = validation;
        this.validation.initialize(this);
    }

    canActivate(){
        this.userObj = JSON.parse(sessionStorage.getItem('user')); 
    }

    async activate() {
        let responses = await Promise.all([
            this.documents.getDocumentsCategoriesArray(),
            this.people.getPeopleArray(),
            this.config.getConfig()
        ]);
        this.filteredDocumentArray = this.documents.docCatsArray;

         this.dataTable.updateArray(this.documents.docCatsArray);

        this.dataTable.createPageButtons(1);
    }

    attached(){
        $('[data-toggle="tooltip"]').tooltip();
         this._setupValidation();
    }

    async refresh() {
        this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
        await this.documents.getDocumentsArray(true);
         this.dataTable.updateArray(this.documents.docCatsArray);
        this.spinnerHTML = "";
    }

    editDocument(index, el){
        this.editIndex = this.dataTable.getOriginalIndex(index);
        // this.displayIndex = index + parseInt(this.dataTable.startRecord);
        this.documents.selectDocument(this.editIndex);
         this.displayTitle = "Files";

        //Reset the selected row
        if (this.selectedRow) this.selectedRow.children().removeClass('info');
        this.selectedRow = $(el.target).closest('tr');
        this.selectedRow.children().addClass('info')
        this.showDocumentForm = true;
    }

    filterList(){
        if(this.filter){
            var thisFilter = this.filter
            this.filteredDocumentArray = this.documents.docCatsArray.filter((item) => {
            return item.description.substring(0, thisFilter.length).toUpperCase() === thisFilter.toUpperCase();
            });
        } else {
            this.filteredDocumentArray = this.documents.docCatsArray;
        }
    }

    async typeChanged(index, el){
      if(index >= 0){
        this.categoryIndex = index;
        this.documents.selectCategory(index);
        await this.documents.getDocumentsArray(true, '?filter=categoryCode|eq|' + this.documents.selectedCat.code);
        this.dataTable.updateArray(this.documents.documentsArray);
        this.showDocuments = true;
        this.showDocumentForm =  false;
        this.displayTitle = "Documents";

        if (this.selectedRow) this.selectedRow.removeClass('info');
        this.selectedRow = $(el.target);
        this.selectedRow.addClass('info')
      }
    }

    new(){
        this.editIndex = "";
        this.showDocumentForm = true;
        this.documents.selectDocument();
    }

    back(){
        this.displayTitle = "Documents";
        this.showDocumentForm = false;
    }

    cancel(){
        this.documents.selectDocument(this.editIndex);
    }

    async delete(){
        return this.dialog.showMessage(
            "This will delete the document from the database and remove all the files.  <br>Are you sure you want to delete the document?", 
            "Delete Document", 
            ['Yes', 'No']
            ).then(response => {
                if(!response.wasCancelled){
                     this.deleteDocument();    
                }
            });
    }

    async deleteDocument(){
        let serverResponse = await this.documents.deleteDocument();
        if (!serverResponse.error) {
                this.utils.showNotification("The document was deleted");
                this.showDocumentForm = false;
        }
        this. _cleanUp();
    }

    toggleFileActive(index){
        this.documents.selectedDocument.files[index].active = !this.documents.selectedDocument.files[index].active;
    }

    deleteFile(index){
         return this.dialog.showMessage(
            "Are you sure you want to delete the file?",
            "Delete File",
            ['Yes', 'No']
        ).then(response => {
            if (!response.wasCancelled) {
               this.documents.deleteFile(index);
            }
        });
    }

    buildDocument(){
        if(!this.documents.selectedDocument._id){
            this.documents.selectedDocument.categoryCode =this.documents.selectedCat.code;
            this.documents.selectedDocument.dateCreated = new Date();
        }
        if(this.files && this.files.length > 0){
            var version = 1;
            for(var i = 0; i<this.documents.selectedDocument.files.length; i++){
                if(this.documents.selectedDocument.files[i].originalFilename == this.files[0].name){
                    version++;
                }
            }
            var newFile = {
                personId: this.userObj._id,
                originalFilename: this.files[0].name,
                fileName: this.files[0].name + " - version " + version ,
                dateUploaded: new Date(),
                active: true,
                version: version
            };
            this.documents.selectedDocument.files.unshift(newFile);
        }
       
    }

    async save(){
         this.buildDocument();
          if(this.validation.validate(1)){ 
            let serverResponse = await this.documents.saveDocument();
            if (!serverResponse.error) {
                 this.dataTable.updateArray(this.documents.documentsArray);
                 this.utils.showNotification("The document was saved");
                this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
                 if (this.files && this.files.length > 0) await this.documents.uploadFile(this.files, this.documents.selectedDocument.files[0].version);
                 this.spinnerHTML = "";
                 $("#spinner").toggle().toggle();
            }
            this. _cleanUp();
            this.selectedFile = "";
        }
    }

    changeFiles(){
        this.selectedFile = this.files[0].name;
        this.filesSelected = this.documents.selectedDocument ? true : false;
    }

    newCategory(){
        this.categoryForm = true;
        this.documents.selectCategory();
    }

    editCategory(){
        this.categoryForm = true;
    }

    saveCategory(){
        let serverResponse = this.documents.saveCategory();
         if (!serverResponse.status) {
                this.utils.showNotification("Category Saved");
                this.categoryForm = false;
        }
    }

    _cleanUp(){
        document.getElementById("uploadFiles").value = "";
        this.selectedFiles = undefined;
        this.files = undefined;
    }

    backCategory(){
        this.categoryForm = false;
    }

    cancelEditCategory(){
         this.documents.selectCategory();
    }

    _setupValidation(){
         this.validation.addRule(1, "editName", [{ "rule": "required", "message": "Document name is required", "value": "documents.selectedDocument.name" }]);
         this.validation.addRule(1, "editDescription", [{ "rule": "required", "message": "Document description is required", "value": "documents.selectedDocument.description" }]);
        //  this.validation.addRule(1, "editFiles", [{ "rule": "required", "message": "Document description is required", "value": "files" }]);
    }
}
