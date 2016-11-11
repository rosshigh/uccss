import {inject} from 'aurelia-framework';
import {DataTable} from '../../../resources/utils/dataTable';
import {AppConfig} from '../../../config/appConfig';
import {Utils} from '../../../resources/utils/utils';
import {Downloads} from '../../../resources/data/downloads';
import {CommonDialogs} from '../../../resources/dialogs/common-dialogs';
import Validation from '../../../resources/utils/validation';
import $ from 'jquery';

@inject(DataTable, Downloads, Utils, CommonDialogs, Validation, AppConfig)
export class EditProducts {
    downloadItemSelected = false;
    editCat = false;
    navControl = "downloadsNavButtons";
    spinnerHTML = "";
    selectedFile = "";
    removedFiles = new Array();
    filesSelected = false;

    constructor(datatable, downloads, utils, dialog, validation, config) {
        this.dataTable = datatable;
        this.dataTable.initialize(this);
        this.utils = utils;
        this.downloads = downloads;
        this.dialog = dialog;
        this.config = config;
        this.validation = validation;
        this.validation.initialize(this);
        this._setupValidation();
    }

    attached(){
        $('[data-toggle="tooltip"]').tooltip();
    }

    async activate() {
        let responses = await Promise.all([
            this.downloads.getDownloadsArray(true),
            this.downloads.getDownloadCategoriesArray()
        ]);

        this.dataTable.updateArray(this.downloads.appDownloadsArray);
        this.dataTable.createPageButtons(1);
    }

    async refresh() {
        this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
        await this.downloads.getDownloadsArray(true);
        this.dataTable.updateArray(this.downloads.appDownloadsArray);
        this.spinnerHTML = "";
    }

    async new() {
        this.editIndex = -1;
        this.downloads.selectDownload();

        $("#editName").focus();
        this.downloadSelected = true;
    }

    async edit(index, el) {
        this.editIndex = this.dataTable.getOriginalIndex(index);
        this.downloads.selectDownload(this.editIndex);
        
         this.originalDownload = this.utils.copyObject(this.downloads.selectedDownload);
         this.downloads.selectedDownload.downCatcode = this.downloads.selectedDownload.downCatcode.toString();

        this.selectedURL = this.config.FILE_DOWNLOAD_URL + '/downloads/' + this.downloads.selectedDownload.file.fileName;

        //Editing a product
        $("#editName").focus();

        //Reset the selected row
        if (this.selectedRow) this.selectedRow.children().removeClass('info');
        this.selectedRow = $(el.target).closest('tr');
        this.selectedRow.children().addClass('info')
        this.downloadSelected = true;
    }

    cancel() {
        if (this.editIndex == -1) {
            this.new();
        } else {
            this.downloads.selectDownload(this.editIndex);
        }
    }

    async save() {
        if(this.validation.validate(1, this)){
            let serverResponse = await this.downloads.saveDownload();
            if (!serverResponse.error) {
                this.dataTable.updateArray(this.downloads.appDownloadsArray);
                 this.utils.showNotification("Download " + this.downloads.selectedDownload.name + " was updated");
                 this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
                 if (this.files && this.files.length > 0) await this.downloads.uploadFile(this.files);
                 this.spinnerHTML = "";
            }
            this.downloadSelected = false;
            this.selectedFiles = undefined;
            this.files = undefined;
            this.selectedFile = "";
        }
    }

    deleteFile(){
        this.downloads.selectedDownload = ""
    }

    changeFiles(){
        this.selectedFile = this.files[0].name;
        this.filesSelected = this.downloads.selectedDownload ? true : false;
    }

    delete(){
        return this.dialog.showMessage(
            "Are you sure you want to delete the download?", 
            "Delete Download", 
            ['Yes', 'No']
            ).then(response => {
                if(!response.wasCancelled){
                    this.deleteDownload();    
                }
            });
    }

    async deleteDownload(){
        var name = this.downloads.selectedDownload.name;
        let serverResponse = await this.downloads.deleteDownload();
        if (!serverResponse.error) {
                this.dataTable.updateArray(this.downloads.appDownloadsArray);
                this.utils.showNotification("Download ${name} was deleted");
        }
        this.downloadSelected = false;
        this.selectedFiles = undefined;
        this.files = undefined;
    }

    back() {
        var change = this.downloads.isDirty(this.originalDownload);
        if(change.length){
            return this.dialog.showMessage(
                "The item has been changed. Do you want to save your changes?", 
                "Save Changes", 
                ['Yes', 'No']
                ).then(response => {
                    if(!response.wasCancelled){
                       this.save();
                    } else {
                        this.downloadSelected = false;
                    }    
                });
        } else {
            this.downloadSelected = false;
        }

    }

    _setupValidation(){
        this.validation.addRule(1,"editName", {"rule":"required","message":"Name is required", "value": "downloads.selectedDownload.name"});
        this.validation.addRule(1,"editType", {"rule":"required","message":"Type is required", "value": "downloads.selectedDownload.downCatcode"});
         this.validation.addRule(2,"editCatDescription", {"rule":"required","message":"Description is required", "value": "downloads.selectedCat.description"});
    }

     openEditCatForm(action){
        this.editCourseFlag = action === 'edit'
        if(this.editCourseFlag){
            if($("#editType").val() != ""){
                this.editCat = true;
                this.downloads.selectCategory(this.downloads.selectedDownload.type);
            }
        } else {
            this.editCat = true;
            this.downloads.selectCategory();
        }
    }

    cancelEditCat(){
        this.editCat = false;
        this.validation.makeValid($("#editCatDescription"));
    }

    async saveCat(){
         if(this.validation.validate(2, this)){
            let serverResponse = await this.downloads.saveCategory();
            if (!serverResponse.error) {
                this.utils.showNotification("Download category " + this.downloads.selectedCat.description + " was updated");
            }

            this.editCat = false;
         }
    }

    async deleteCat(){
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

    async deleteCategory(){
        var name = this.downloads.selectedCat.description;
        let serverResponse = await this.downloads.deleteCat();
        if (!serverResponse.error) {
            this.utils.showNotification("Category " + name + " was deleted");
        }
        this.editCat = false;
    }

    _cleanUpFilters(){
        $("#name").val("");
        $("#file.originalFilename").val("");
        $("#type").val("");
        $("#active").val("");
        $("#helpTicketRelevant").val("");
    }

}
