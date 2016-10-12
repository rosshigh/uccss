import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";
import {DataTable} from '../../../resources/utils/dataTable';
import {AppConfig} from '../../../config/appConfig';
import {Utils} from '../../../resources/utils/utils';
import {DocumentsServices} from '../../../resources/data/documents';
import {People} from '../../../resources/data/people';
import {AppState} from '../../../resources/data/appState';
import {CommonDialogs} from '../../../resources/dialogs/common-dialogs';
import $ from 'jquery';

@inject(Router, DataTable, DocumentsServices, People, Utils, AppConfig, AppState, CommonDialogs)
export class Documents {
    navControl = "documentssNavButtons";
    spinnerHTML = "";
    filterValues = new Array();
    typeSelected = "";
    categoryForm = false;
    showDocumentForm = false;
    showDocuments = false;

    constructor(router, datatable, documents, people, utils, config, app, dialog) {
        this.router = router;
        this.dataTable = datatable;
        this.dataTable.initialize(this);
        this.utils = utils;
        this.documents = documents;
        this.config = config;
        this.app = app;
        this.people = people;
        this.dialog = dialog;
    }

    canActivate(){
        if(!this.app.user._id) this.router.navigate('logout'); 
    }

    async activate() {
        await this.getData();
    }

    attached(){
        $('[data-toggle="tooltip"]').tooltip();
    }

    async getData() {
        
        await this.documents.getDocumentsCategoriesArray();
        await this.people.getPeopleArray(true);
        this.filteredDocumentArray = this.documents.docCatsArray;

        this.updateArray();

        this.dataTable.createPageButtons(1);
    }

    async refresh() {
        this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
        await this.documents.getDocumentsArray(true);
        this.updateArray();
        this.spinnerHTML = "";
    }

    updateArray(){
        this.displayArray = this.documents.documentsArray ? this.documents.documentsArray : new Array();
        this.baseArray = this.displayArray;

        for (var i = 0; i < this.baseArray.length; i++) {
            this.baseArray[i].baseIndex = i;
        }
    }

    editDocument(index, el){
        this.editIndex = this.displayArray[index + parseInt(this.dataTable.startRecord)].baseIndex;
        this.displayIndex = index + parseInt(this.dataTable.startRecord);
        this.documents.selectDocument(this.editIndex);

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

    async typeChanged(index){
      if(index >= 0){
        this.categoryIndex = index;
        this.documents.selectCategory(index);
        await this.documents.getDocumentsArray(true, '?filter=categoryCode|eq|' + this.documents.selectedCat.code);
        this.updateArray();
        this.showDocuments = true;
      }
    }

    new(){
        this.editIndex = "";
        this.showDocumentForm = true;
        this.documents.selectDocument();
    }

    back(){
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
    }

    toggleFileActive(index){
        this.documents.selectedDocument.files[index].active = !this.documents.selectedDocument.files[index].active;
    }

    deleteFile(index){
        var cmd = {
            header : "Delete File",
            message : "Are you sure you want to delete the file?",
            cancelButton : false,
            okButton : true
        };

        this.dialog.open({ viewModel: ConfirmDialog, model: cmd}).then(response => {
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
                personId: this.app.user._id,
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
        //   if(this.validation.validate(1, this)){ 
            let serverResponse = await this.documents.saveDocument();
            if (!serverResponse.error) {
                 this.updateArray();
                 this.utils.showNotification("The document was saved");
                this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
                 if (this.files && this.files.length > 0) await this.documents.uploadFile(this.files, this.documents.selectedDocument.files[0].version);
                 this.spinnerHTML = "";
                 $("#spinner").toggle().toggle();
            }
            this.selectedFiles = undefined;
            this.files = undefined;
            this.selectedFile = "";
        // }
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

    backCategory(){
        this.categoryForm = false;
    }

    cancelEditCategory(){
         this.documents.selectCategory();
    }
}
