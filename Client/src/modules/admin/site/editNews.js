import {inject} from 'aurelia-framework';
import {DataTable} from '../../../resources/utils/dataTable';
import {AppConfig} from '../../../config/appConfig';
import {Utils} from '../../../resources/utils/utils';
import {SiteInfo} from '../../../resources/data/siteInfo';
import {ConfirmDialog} from '../../../resources/elements/confirm-dialog';
import Validation from '../../../resources/utils/validation';
import {DialogService} from 'aurelia-dialog';
import $ from 'jquery';
import moment from 'moment';

@inject(DataTable, SiteInfo, Utils, DialogService, Validation, AppConfig)
export class EditNews {
    newsItemSelected = false;
    navControl = "newsNavButtons";
    spinnerHTML = "";
    isInformationItem = false;

    constructor(datatable, siteinfo, utils, dialog, validation, config) {
        this.dataTable = datatable;
        this.dataTable.initialize(this);
        this.utils = utils;
        this.siteinfo = siteinfo;
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
      var currentDate = moment(new Date()).format("MM-DD-YYYY");
    //   var options = '?filter=expiredDate|gt|' + currentDate + '&order=sortOrder';
      var options = '?order=sortOrder';
      await this.siteinfo.getInfoArray(true, options);
      this.updateArray();
      this.dataTable.createPageButtons(1);
    }

    async refresh() {
        this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
        await this.siteinfo.getInfoArray(true);
        this.updateArray();
        this.spinnerHTML = "";
    }

    updateArray(){
        this.displayArray = this.siteinfo.siteArray ? this.siteinfo.siteArray : new Array();
        this.baseArray = this.displayArray;

        for (var i = 0; i < this.baseArray.length; i++) {
            this.baseArray[i].baseIndex = i;
        }
        this.isChecked = true;
        this.filterOutExpired();
        this._cleanUpFilters();
    }

    async new() {
        this.editIndex = -1;
        // this.displayIndex = -1;
        this.siteinfo.selectSiteItem(this.editIndex);

        $("#editTitle").focus();
        this.newsItemSelected = true;
    }

    async edit(index, el) {
        this.editIndex = this.displayArray[index + parseInt(this.dataTable.startRecord)].baseIndex;
        this.displayIndex = index + parseInt(this.dataTable.startRecord);
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
        if(this.validation.validate(1, this)){
            let serverResponse = await this.siteinfo.saveInfoItem();
            if (!serverResponse.error) {
                this.updateArray();
                this.utils.showNotification("The item was updated", "", "", "", "", 5);
                if (this.files && this.files.length > 0) this.siteinfo.uploadFile(this.files);
            }
            this.newsItemSelected = false;
             this.selectedFiles = undefined;
            this.files = undefined;
        }
    }
    
    changeFiles(){
        this.selectedFile = this.files[0].name;
        this.filesSelected = this.siteinfo.selectedItem ? true : false;
    }

    delete(){
        var cmd = {
            header : "Delete Item",
            message : "Are you sure you want to delete the item?",
            cancelButton : false,
            okButton : true
        };

        this.dialog.open({ viewModel: ConfirmDialog, model: cmd}).then(response => {
            if (!response.wasCancelled) {
                this.deleteItem();
            }
        });
    }

    async deleteItem(){
        let serverResponse = await this.siteinfo.deleteItem();
        if (!serverResponse.error) {
                this.updateArray();
                this.utils.showNotification("The Item was deleted", "", "", "", "", 5);
        }
        this.newsItemSelected = false;
        this.selectedFiles = undefined;
        this.files = undefined;
    }

    back() {
        var changes = this.siteinfo.isDirty(this.originalSiteInfo);
        if(changes.length){
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
                    this.newsItemSelected = false;
                }
            });

        } else {
            this.newsItemSelected = false;
        }

    }

    _cleanUpFilters(){
        $("#title").val("");
    }


    _setupValidation(){
        this.validation.addRule(1,"editTitle", {"rule":"required","message":"Title is required", "value": "siteinfo.selectedItem.title"});
    }

    filterOutExpired(){
        if (this.isChecked) {
            var currentDate = moment(new Date()).format("MM-DD-YYYY");
    
            this.displayArray = this.baseArray.filter((item) => {
                return moment(currentDate).isBefore(item.expiredDate)
            })
        } else {
            this.displayArray = this.baseArray;
        }
    }

}
