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
export class EditMessages {
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
      await this.siteinfo.getMessageArray(true);
      this.updateArray();
      this.dataTable.createPageButtons(1);
    }

    async refresh() {
        this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
        await this.siteinfo.getMessageArray(true);
        this.updateArray();
        this.spinnerHTML = "";
    }

    updateArray(){
        this.displayArray = this.siteinfo.messageArray ? this.siteinfo.messageArray : new Array();
        this.baseArray = this.displayArray;

        for (var i = 0; i < this.baseArray.length; i++) {
            this.baseArray[i].baseIndex = i;
        }
        this._cleanUpFilters();
    }

    async new() {
        this.editIndex = -1;
        
        this.siteinfo.selectMessage(this.editIndex);
        this.siteinfo.selectedMessage.category = this.config.MESSAGE_TYPES[0];

        $("#editKey").focus();
        this.messageItemSelected = true;
    }

    async edit(index, el) {
        this.editIndex = this.displayArray[index + parseInt(this.dataTable.startRecord)].baseIndex;
        this.displayIndex = index + parseInt(this.dataTable.startRecord);
        this.siteinfo.selectMessage(this.editIndex);
        
        this.originalMessage = this.utils.copyObject(this.siteinfo.selectedMessage);

        //Reset the selected row
        if (this.selectedRow) this.selectedRow.children().removeClass('info');
        this.selectedRow = $(el.target).closest('tr');
        this.selectedRow.children().addClass('info')
        this.messageItemSelected = true;
    }

    cancel() {
        if (this.editIndex == -1) {
            this.new();
        } else {
            this.siteinfo.selectMessage(this.editIndex);
        }
    }

    async save() {
        if(this.validation.validate(1, this)){
            let serverResponse = await this.siteinfo.saveMessageItem();
            if (!serverResponse.error) {
                this.updateArray();
                this.utils.showNotification("The message was updated", "", "", "", "", 5);
            }
            this.messageItemSelected = false;
        }
    }

    delete(){
        var cmd = {
            header : "Delete Message",
            message : "Are you sure you want to delete the message?",
            cancelButton : false,
            okButton : true
        };

        this.dialog.open({ viewModel: ConfirmDialog, model: cmd}).then(response => {
            if (!response.wasCancelled) {
                this.deleteMessage();
            }
        });
    }

    async deleteMessage(){
        let serverResponse = await this.siteinfo.deleteMessage();
        if (!serverResponse.error) {
                this.updateArray();
                this.utils.showNotification("The message was deleted", "", "", "", "", 5);
        }
        this.messageItemSelected = false;
    }

    back() {
        var change = this.siteinfo.isMessageDirty(this.originalMessage);
        if(change.length){
            var cmd = {
                header : "Save Changes",
                message : "The message has been changed. Do you want to save your changes?",
                cancelButton : false,
                okButton : true
            };

            this.dialog.open({ viewModel: ConfirmDialog, model: cmd}).then(response => {
                if (!response.wasCancelled) {
                   this.save();
                } else {
                    this.messageItemSelected = false;
                }
            });

        } else {
            this.messageItemSelected = false;
        }

    }

    _cleanUpFilters(){
        $("#key").val("");
    }


    _setupValidation(){
        this.validation.addRule(1,"editKey", {"rule":"required","message":"Title is required", "value": "siteinfo.selectedMessage.key"});
    }

}
