import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";
import {DataTable} from '../../../resources/utils/dataTable';
import {AppConfig} from '../../../config/appConfig';
import {Utils} from '../../../resources/utils/utils';
import {DocumentsServices} from '../../../resources/data/documents';
import {People} from '../../../resources/data/people';
import {CommonDialogs} from '../../../resources/dialogs/common-dialogs';
import Validation from '../../../resources/utils/validation';
import {EventAggregator} from 'aurelia-event-aggregator';
import $ from 'jquery';

@inject(Router, DataTable, DocumentsServices, People, Utils, AppConfig, CommonDialogs, Validation, EventAggregator)
export class Documents {
    navControl = "documentssNavButtons";
    spinnerHTML = "";
    filterValues = new Array();
    typeSelected = "";
    categoryForm = false;
    showDocumentForm = false;
    showDocuments = false;
    displayTitle = "";
    title="Documents";

    constructor(router, datatable, documents, people, utils, config, dialog, validation, eventAggregator) {
        this.router = router;
        this.dataTable = datatable;
        this.dataTable.initialize(this);
        this.utils = utils;
        this.documents = documents;
        this.config = config;
        this.people = people;
        this.dialog = dialog;
        this.eventAggregator = eventAggregator;
        this.validation = validation;
        this.validation.initialize(this);

         this.userObj = JSON.parse(sessionStorage.getItem('user')); 
    }

    async activate() {
        let responses = await Promise.all([
            this.documents.getDocumentsCategoriesArray(),
            this.people.getPeopleArray(),
            this.config.getConfig()
        ]);
        this.filteredDocumentArray = this.documents.docCatsArray;
        await this.selectFirstCategory()
    }

    attached(){
        $('[data-toggle="tooltip"]').tooltip();
        this._setupValidation();
        this.mySubscription = this.eventAggregator.subscribe('upload-progress', obj => {
            var elem = document.getElementById("progressBar");
            elem.style.width = obj.progress/obj.total * 100 + '%'; 
        });
    }

    async refresh() {
        this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
        await this.documents.getDocumentsArray(true);
         this.dataTable.updateArray(this.documents.docCatsArray);
        this.spinnerHTML = "";
    }

    editDocument(index, el){
        this.editIndex = this.dataTable.getOriginalIndex(index);
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
                return item.description.toUpperCase().indexOf(thisFilter.toUpperCase()) > -1;
            });
        } else {
            this.filteredDocumentArray = this.documents.docCatsArray;
        }
    }

    async selectFirstCategory(){
        this.categoryIndex = 0;
        if(this.documents.selectCategory && this.documents.selectCategory.length > 0){
            this.documents.selectCategory(0);
            await this.documents.getDocumentsArray(true, '?filter=categoryCode|eq|' + this.documents.selectedCat.code);
            this.dataTable.updateArray(this.documents.documentsArray);
            this.showDocuments = true;
            this.showDocumentForm =  false;
        }
         this.displayTitle = "Documents";
       
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

        $("#categoryList.list-group").children().removeClass('menuButtons');
        $("#categoryList.list-group").children().css("background-color","");
        $("#categoryList.list-group").children().css("color","");
        $(el.target).css("background-color",this.config.BUTTONS_BACKGROUND);
        $(el.target).css("color",this.config.ACTIVE_SUBMENU_COLOR);

        // if (this.selectedRow) this.selectedRow.removeClass('info');
        // this.selectedRow = $(el.target);
        // this.selectedRow.addClass('info')
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
            "This will delete the document from the database and remove all the files.  Are you sure you want to delete the document?", 
            "Delete Document", 
            ['Yes', 'No']
            ).whenClosed(response => {
                if(!response.wasCancelled){
                     this.deleteDocument();    
                }
            });
    }

    async deleteDocument(){
        let serverResponse = await this.documents.deleteDocument();
        if (!serverResponse.error) {
                this.utils.showNotification("The document was deleted");
                this.refresh();
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
        ).whenClosed(response => {
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
            let fileNameArray =  this.files[0].name.split('.');
            let fileName = fileNameArray[0] + " (" + version + ")." + fileNameArray[1]
            var newFile = {
                personId: this.userObj._id,
                originalFilename: this.files[0].name,
                fileName:  fileName ,
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
                if (this.filesToUpload && this.filesToUpload.length > 0) {
                    this.uploading = true;
                    this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
                    await this.documents.uploadFile(this.filesToUpload, this.documents.selectedDocument.files[0].version);
                    this.spinnerHTML = "";
                    $("#spinner").toggle().toggle();
                    this. _cleanUp();
                    this.selectedFile = "";
                    this.utils.showNotification("The document was saved");
                } else {
                    this. _cleanUp();
                    this.utils.showNotification("The document was saved");
                }
                
            }
            
        }
    }

    changeFiles(){
        this.filesToUpload =  new Array(); 
        this.filesToUpload.push(this.files[0]);
    }

    removeFile(index){
        this.filesToUpload.splice(index,1);
    }

    newCategory(){
        this.categoryForm = true;
        this.documents.selectCategory();
    }

    editCategory(){
        if(this.documents.selectedCat) this.categoryForm = true;
    }

    saveCategory(){
        let serverResponse = this.documents.saveCategory();
         if (!serverResponse.status) {
                this.utils.showNotification("Category Saved");
                this.categoryForm = false;
        }
    }

    _cleanUp(){
        this.selectedFiles = undefined;
        this.files = undefined;
        this.uploading = false;    
        this.filesToUpload = new Array();
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
    }
}
