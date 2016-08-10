import {inject} from 'aurelia-framework';
import {DataTable} from '../../../resources/utils/dataTable';
import {AppConfig} from '../../../config/appConfig';
import {Utils} from '../../../resources/utils/utils';
import {Downloads} from '../../../resources/data/downloads';
import {ConfirmDialog} from '../../../resources/elements/confirm-dialog';
import Validation from '../../../resources/utils/validation';
import {DialogService} from 'aurelia-dialog';
import $ from 'jquery';

@inject(DataTable, Downloads, Utils, DialogService, Validation, AppConfig)
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
        this._setupValidation();
    }

    attached(){
        $('[data-toggle="tooltip"]').tooltip();
    }

    async activate() {
        await this.getData();
    }

    async getData() {
      let responses = await Promise.all([
        this.downloads.getDownloadsArray(true),
        this.downloads.getDownloadCategoriesArray()
      ]);

        this.updateArray();

        this.dataTable.createPageButtons(1);
    }

    async refresh() {
        this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
        await this.downloads.getDownloadsArray(true);
        this.updateArray();
        this.spinnerHTML = "";
    }

    updateArray(){
        this.displayArray = this.downloads.appDownloadsArray ? this.downloads.appDownloadsArray : new Array();
        this.baseArray = this.displayArray;

        for (var i = 0; i < this.baseArray.length; i++) {
            this.baseArray[i].baseIndex = i;
        }
        this._cleanUpFilters();
    }

    async new() {
        this.editIndex = -1;
        // this.displayIndex = -1;
        this.downloads.selectDownload();

        $("#editName").focus();
        this.downloadSelected = true;
    }

    async edit(index, el) {
        this.editIndex = this.displayArray[index + parseInt(this.dataTable.startRecord)].baseIndex;
        this.displayIndex = index + parseInt(this.dataTable.startRecord);
        this.downloads.selectDownload(this.editIndex);
        
         this.originalDownload = this.utils.copyObject(this.downloads.selectedDownload);

        this.selectedURL = this.config.FILE_DOWNLOAD_URL + 'uploadedFiles/downloads/' + this.downloads.selectedDownload.file.fileName;

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
                 this.updateArray();
                 this.utils.showNotification("Download " + this.downloads.selectedDownload.name + " was updated", "", "", "", "", 5);
                 if (this.files && this.files.length > 0) this.downloads.uploadFile(this.files);
            }
            this.downloadSelected = false;
            this.selectedFiles = undefined;
            this.files = undefined;
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
        var cmd = {
            header : "Delete Download",
            message : "Are you sure you want to delete the download?",
            cancelButton : false,
            okButton : true
        };

        this.dialog.open({ viewModel: ConfirmDialog, model: cmd}).then(response => {
            if (!response.wasCancelled) {
                this.deleteDownload();
            }
        });
    }

    async deleteDownload(){
        var name = this.downloads.selectedDownload.name;
        let serverResponse = await this.downloads.deleteDownload();
        if (!serverResponse.error) {
                this.updateArray();
                this.utils.showNotification("Download " + name + " was deleted", "", "", "", "", 5);
        }
        this.downloadSelected = false;
        this.selectedFiles = undefined;
        this.files = undefined;
    }

    back() {
        var change = this.downloads.isDirty(this.originalDownload);
        if(change.length){
            var cmd = {
                header : "Save Changes",
                message : "The item has been changed. Do you want to save your changes?",
                cancelButton : false,
                okButton : true
            };

            this.dialog.open({ viewModel: ConfirmDialog, model: cmd}).then(response => {
                if (!response.wasCancelled) {
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
        this.validation.addRule(1,"editType", {"rule":"required","message":"Type is required", "value": "downloads.selectedDownload.type"});
         this.validation.addRule(2,"editCatDescription", {"rule":"required","message":"Description is required", "value": "downloads.selectedCat.description"});
        // this.validation.addRule(2,"editCode", {"rule":"required","message":"Code is required", "value": "downloads.selectedCat.code"});
        // this.validation.addRule(2,"editCode", {"rule":"required","message":"That code is already used", "value": "downloads.selectedCat.code",
        // "valFunction":function(context){
        //     for(var i = 0; i<context.downloads.appCatsArray.length; i++){
        //         if(context.downloads.selectedCat.code == context.downloads.appCatsArray[i].code){
        //             return false;
        //         }
        //         return true;
        //     }
        // }});
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
                this.utils.showNotification("Download category " + this.downloads.selectedCat.description + " was updated", "", "", "", "", 5);
            }

            this.editCat = false;
         }
    }

    async deleteCat(){
        if(this.downloads.selectedCat._id){
            var cmd = {
                header : "Delete Category",
                message : "Are you sure you want to delete the category?",
                cancelButton : false,
                okButton : true
            };

        this.dialog.open({ viewModel: ConfirmDialog, model: cmd}).then(response => {
            if (!response.wasCancelled) {
                 this.deleteCategory();
            }
        });

        }
    }

    async deleteCategory(){
        var name = this.downloads.selectedDownload.description;
        let serverResponse = await this.downloads.deleteCat();
        if (!serverResponse.error) {
            this.utils.showNotification("Category " + name + " was deleted", "", "", "", "", 5);
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
