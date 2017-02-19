import {inject} from 'aurelia-framework';
import {DataTable} from '../../../resources/utils/dataTable';
import {AppConfig} from '../../../config/appConfig';
import {Utils} from '../../../resources/utils/utils';
import {SiteInfo} from '../../../resources/data/siteInfo';
import {CommonDialogs} from '../../../resources/dialogs/common-dialogs';
import Validation from '../../../resources/utils/validation';
import $ from 'jquery';

@inject(DataTable, SiteInfo, Utils, CommonDialogs, Validation, AppConfig)
export class EditNews {
    newsItemSelected = false;
    navControl = "newsNavButtons";
    spinnerHTML = "";
    isInformationItem = false;
    isChecked = true;

    constructor(datatable, siteinfo, utils, dialog, validation, config) {
        this.dataTable = datatable;
        this.dataTable.initialize(this);
        this.utils = utils;
        this.siteinfo = siteinfo;
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
        await this.siteinfo.getInfoArray(true, '?order=sortOrder');
        await this.config.getConfig();
        this.dataTable.updateArray(this.siteinfo.siteArray);
        this.filterOutExpired();
    }

    async refresh() {
        this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
        await this.siteinfo.getInfoArray(true);
        this.dataTable.updateArray(this.siteinfo.siteArray);
        this.spinnerHTML = "";
    }

    async new() {
        this.editIndex = -1;
        this.siteinfo.selectSiteItem(this.editIndex);
        $("#editTitle").focus();
        this.newsItemSelected = true;
    }

    async edit(index, el) {
         this.editIndex = this.dataTable.displayArray[index + parseInt(this.dataTable.startRecord)].baseIndex;
        // this.editIndex = this.dataTable.getOriginalIndex(index);
        this.siteinfo.selectSiteItem(this.editIndex);
        this.originalSiteInfo = this.utils.copyObject(this.siteinfo.selectedItem);

        //Editing a product
        $("#editTitle").focus();

        //Reset the selected row
        if (this.selectedRow) this.selectedRow.children().removeClass('info');
        this.selectedRow = $(el.target).closest('tr');
        this.selectedRow.children().addClass('info')
        this.newsItemSelected = true;
    }

    cancel() {
        if (this.editIndex == -1) {
            this.new();
        } else {
            this.siteinfo.selectSiteItem(this.editIndex);
        }
    }

    async save() {
        if(this.validation.validate(1)){
            let serverResponse = await this.siteinfo.saveInfoItem();
            if (!serverResponse.error) {
                 this.dataTable.updateArray(this.siteinfo.siteArray);
                this.utils.showNotification("The item was saved");
                if (this.files && this.files.length > 0) this.siteinfo.uploadFile(this.files);
            }
            this.newsItemSelected = false;
            this._cleanUp();
        }
    }
    
    changeFiles(){
        this.selectedFile = this.files[0].name;
        this.filesSelected = this.siteinfo.selectedItem ? true : false;
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
        let serverResponse = await this.siteinfo.deleteItem();
        if (!serverResponse.error) {
                 this.dataTable.updateArray(this.siteinfo.siteArray);
                this.utils.showNotification("The Item was deleted");
        }
        this.newsItemSelected = false;
        this.selectedFiles = undefined;
        this.files = undefined;
    }
 
    back() {
        var changes = this.siteinfo.isDirty(this.originalSiteInfo);
        if(changes.length){
            return this.dialog.showMessage(
                "The item has been changed. Do you want to save your changes?", 
                "Save Changes", 
                ['Yes', 'No']
                ).then(response => {
                    if(!response.wasCancelled){
                        this.save();    
                    } else {
                        this.newsItemSelected = false;
                    }
                });
        } else {
            this.newsItemSelected = false;
        }

    }

    _cleanUp(){
        this._cleanUpFilters();
        this.selectedFiles = undefined;
        this.files = undefined;
    }

    _cleanUpFilters(){
        $("#title").val("");
        $("#createdDate").val("");
        $("#expiredDate").val("");
        $("#itemType").val("");
        $("#url").val("");
    }

    _setupValidation(){
        this.validation.addRule(1,"editTitle", [{"rule":"required","message":"Title is required", "value": "siteinfo.selectedItem.title"}]);
    }

    //TODO: Fix This
    filterOutExpired(){
        if (this.isChecked) {
            var filterValues = new Array();
            filterValues.push({ property: "expiredDate", value: new Date(), type: 'date', compare: 'after' });
            if (this.dataTable.active) this.dataTable.externalFilter(filterValues);
        } else {
            this.dataTable.updateArray(this.siteinfo.siteArray);
        }
    }

}
