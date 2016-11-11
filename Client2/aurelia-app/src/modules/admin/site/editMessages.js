import {inject} from 'aurelia-framework';
import {DataTable} from '../../../resources/utils/dataTable';
import {AppConfig} from '../../../config/appConfig';
import {Utils} from '../../../resources/utils/utils';
import {SiteInfo} from '../../../resources/data/siteInfo';
import {CommonDialogs} from '../../../resources/dialogs/common-dialogs';
import Validation from '../../../resources/utils/validation';
import $ from 'jquery';
import moment from 'moment';

@inject(DataTable, SiteInfo, Utils, CommonDialogs, Validation, AppConfig)
export class EditMessages {
    newsItemSelected = false;
    navControl = "newsNavButtons";
    spinnerHTML = "";
    isInformationItem = false;
    messageContent = "";

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
         let responses = await Promise.all([
            this.siteinfo.getMessageArray(true),
            this.config.getConfig()
         ]);
        this.dataTable.updateArray(this.siteinfo.messageArray);
        this.dataTable.createPageButtons(1);
    }

    async refresh() {
        this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
        await this.siteinfo.getMessageArray(true);
       this.dataTable.updateArray(this.siteinfo.messageArray);
        this.spinnerHTML = "";
    }

    async new() {
        this.editIndex = -1; 
        this.siteinfo.selectMessage(this.editIndex);
        this.siteinfo.selectedMessage.category = this.config.MESSAGE_TYPES[0];
        this.messageContent = "";

        $("#editKey").focus();
        this.messageItemSelected = true;
    }

    async edit(index, el) {
         this.editIndex = this.dataTable.getOriginalIndex(index);
        this.siteinfo.selectMessage(this.editIndex);
        
        this.originalMessage = this.utils.copyObject(this.siteinfo.selectedMessage);
        this.messageContent = this.siteinfo.selectedMessage.content;

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
        if(this.validation.validate(1)){
             this.siteinfo.selectedMessage.content = this.messageContent;
            let serverResponse = await this.siteinfo.saveMessageItem();
            if (!serverResponse.error) {
                this.dataTable.updateArray(this.siteinfo.messageArray);
                this.utils.showNotification("The message was updated");
            }
            this.messageItemSelected = false;
        }
    }

    delete(){
        return this.dialog.showMessage(
            "Are you sure you want to delete the message?", 
            "Delete Message", 
            ['Yes', 'No']
            ).then(response => {
                if(!response.wasCancelled){
                     this.deleteMessage();   
                }
            });
    }

    async deleteMessage(){
        let serverResponse = await this.siteinfo.deleteMessage();
        if (!serverResponse.error) {
                this.dataTable.updateArray(this.siteinfo.messageArray);
                this.utils.showNotification("The message was deleted");
        }
        this.messageItemSelected = false;
    }

    back() {
        var change = this.siteinfo.isMessageDirty(this.originalMessage);
        if(change.length){
            return this.dialog.showMessage(
                "The message has been changed. Do you want to save your changes?", 
                "Save Changes", 
                ['Yes', 'No']
                ).then(response => {
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
