import {inject} from 'aurelia-framework';
import {DataTable} from '../../../resources/utils/dataTable';
import {AppConfig} from '../../../config/appConfig';
import {Utils} from '../../../resources/utils/utils';
import {Downloads} from '../../../resources/data/downloads';
import {CommonDialogs} from '../../../resources/dialogs/common-dialogs';
import Validation from '../../../resources/utils/validation';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(DataTable, Downloads, Utils, CommonDialogs, Validation, AppConfig, EventAggregator)
export class EditProducts {
    downloadItemSelected = false;
    editCat = false;
    spinnerHTML = "";
    selectedFile = "";
    removedFiles = new Array();
    filesSelected = false;
    newDownload = false;
    selectedFiles;

    constructor(datatable, downloads, utils, dialog, validation, config, eventAggregator) {
        this.dataTable = datatable;
        this.dataTable.initialize(this);
        this.utils = utils;
        this.downloads = downloads;
        this.dialog = dialog;
        this.config = config;
        this.validation = validation;
        this.validation.initialize(this);
        this._setupValidation();
        this.eventAggregator = eventAggregator;
    }

    attached(){
        $('[data-toggle="tooltip"]').tooltip();
        this.mySubscription = this.eventAggregator.subscribe('upload-progress', obj => {
            var elem = document.getElementById("progressBar");
            elem.style.width = obj.progress/obj.total * 100 + '%'; 
        });
    }

    detached() {
        this.mySubscription.dispose();
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
        this.newDownload = true;

        $("#editName").focus();
        this.downloadSelected = true;
    }

    async edit(index, el) {
        this.editIndex = this.dataTable.getOriginalIndex(index);
        this.downloads.selectDownload(this.editIndex);
        this.newDownload = false;
         this.originalDownload = this.utils.copyObject(this.downloads.selectedDownload);
         this.downloads.selectedDownload.downCatcode = this.downloads.selectedDownload.downCatcode.toString();

        this.selectedURL = this.config.DOWNLOAD_FILE_DOWNLOAD_URL + '/' + this.downloads.selectedDownload.downCatcode + '/' +  this.downloads.selectedDownload.file.fileName;

        //Editing a product
        $("#editName").focus();

        //Reset the selected row
        if (this.selectedRow) this.selectedRow.children().removeClass('info');
        this.selectedRow = $(el.target).closest('tr');
        this.selectedRow.children().addClass('info')
        this.downloadSelected = true;
    }

    cancel() {
        this.filesToUpload = new Array();
        if (this.editIndex == -1) {
            this.new();
        } else {
            this.downloads.selectDownload(this.editIndex);
            this.originalDownload = this.utils.copyObject(this.downloads.selectedDownload);
            this.downloads.selectedDownload.downCatcode = this.downloads.selectedDownload.downCatcode.toString();
        }
    }

    async save() {
        if(this.validation.validate(1, this)){
            let serverResponse = await this.downloads.saveDownload();
            if (!serverResponse.error) {
                // this.dataTable.updateArray(this.downloads.appDownloadsArray);
                  if (this.filesToUpload && this.filesToUpload.length > 0) {
                    this.uploading = true;
                    await this.downloads.uploadFile(this.filesToUpload);
                    this.utils.showNotification("Download " + this.downloads.selectedDownload.name + " was updated");
                    this._cleanUp();
                } else {
                    this.utils.showNotification("Download " + this.downloads.selectedDownload.name + " was updated");
                    this._cleanUp();
                }
            }
           
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
            ).whenClosed(response => {
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
        this._cleanUp();
    }

    back() {
        var change = this.downloads.isDirty(this.originalDownload);
        if(change.length){
            return this.dialog.showMessage(
                "The item has been changed. Do you want to save your changes?", 
                "Save Changes", 
                ['Yes', 'No']
                ).whenClosed(response => {
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
        this.validation.addRule(1,"editName", [{"rule":"required","message":"Name is required", "value": "downloads.selectedDownload.name"}]);
        this.validation.addRule(1,"editType", [{"rule":"required","message":"Type is required", "value": "downloads.selectedDownload.downCatcode"}]);
        this.validation.addRule(2,"editCatDescription",[{"rule":"required","message":"Description is required", "value": "downloads.selectedCat.description"},
         {"rule":"custom","message":"An category with that description already exists",
            "valFunction":function(context){
                var valid = true;
                context.downloads.appCatsArray.forEach((item) => {
                    if(context.downloads.selectedCat.description === item.description) valid = false;
                }); 
                return valid;
        }}]);
    }

    openEditCatForm(action){
        this.editCourseFlag = action === 'edit'
        if(this.editCourseFlag){
            if($("#editType").val() != ""){
                this.editCat = true;
                this.downloads.selectCategoryByCode(this.downloads.selectedDownload.downCatcode);
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
         if(this.validation.validate(2)){
            let serverResponse = await this.downloads.saveCategory();
            if (!serverResponse.error) {
                this.utils.showNotification("Download category " + this.downloads.selectedCat.description + " was updated");
            }

            this.editCat = false;
         }
    }

    async deleteCat(){
        if(this.downloads.documentsExist(this.downloads.selectedDownload.downCatcode)){
            return this.dialog.showMessage(
            "You can't delete that category because there are exisitng downloads that use it?",
            "Can't Delete Category",
            ['OK']
        ).whenClosed(response => {
            
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
        var name = this.downloads.selectedCat.description;
        let serverResponse = await this.downloads.deleteCat();
        if (!serverResponse.error) {
            this.utils.showNotification("Category " + name + " was deleted");
        }
        this.editCat = false;
    }

    _cleanUp(){
        // this. _cleanUpFilters();
        this.uploading = false;
        this.downloadSelected = false;
        this.selectedFiles = undefined;
        this.files = null;
        this.selectedFile = "";
        this.newDownload = false;
        this.filesToUpload = new Array();
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

    _cleanUpFilters(){
        $("#name").val("");
        $("#file.originalFilename").val("");
        $("#type").val("");
        $("#active").val("");
        $("#helpTicketRelevant").val("");
        this.dataTable.updateArray(this.downloads.appDownloadsArray);
    }

    customFileNameSorter(sortProperty, sortDirection, sortArray, context){
      return sortArray.sort((a, b) => {
          var result = (a["file"]["originalFilename"] < b["file"]["originalFilename"]) ? -1 : (a["file"]["originalFilename"] > b["file"]["originalFilename"]) ? 1 : 0;
            return result * sortDirection;
      });
    }

    customCatSorter(sortProperty, sortDirection, sortArray, context){
      return sortArray.sort((a, b) => {
         let aDescription = context.lookupCategory(a["downCatcode"]);
         let bDesription = context.lookupCategory(b["downCatcode"]);
         var result = (aDescription < bDesription) ? -1 : (aDescription > bDesription) ? 1 : 0;
         return result * sortDirection;
      })
    }

    lookupCategory(value){
        for(let i = 0; i < this.downloads.appCatsArray.length; i++){
            if(this.downloads.appCatsArray[i].downCatcode === value) return this.downloads.appCatsArray[i].description;
        }
        return "";
    }

}
