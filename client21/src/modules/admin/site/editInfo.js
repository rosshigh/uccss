import { inject } from 'aurelia-framework';
import { ValidationRules, ValidationControllerFactory, validationMessages } from 'aurelia-validation';
import { DialogService } from 'aurelia-dialog';
import { ConfirmDialog } from '../../../resources/dialogs/confirm-dialog';
import { MessageDialog } from '../../../resources/dialogs/message-dialog';
import { SiteInfo } from '../../../resources/data/site';
import { DocumentsServices } from '../../../resources/data/documents';
import { AppConfig } from '../../../appConfig';
import { Store } from '../../../store/store';
import { Utils } from '../../../resources/utils/utils';
// import moment from 'moment';

@inject(ValidationControllerFactory, SiteInfo, DocumentsServices, AppConfig, Store, Utils, DialogService)
export class EditInfo {

    pageSize = 200;
    todayMoment = moment(new Date());
    priorities = ['INFO', 'WARN', 'DANG'];

    constructor(ValidationControllerFactory, siteInfo, documentsServices, config, store, utils, dialogService) {
        this.controller = ValidationControllerFactory.createForCurrentScope();
        this.siteInfo = siteInfo;
        this.documentsService = documentsServices;
        this.config = config;
        this.store = store;
        this.utils = utils;
        this.dialogService = dialogService;

        this.configParameters = this.store.getConfig();

        this.filters = [
            { value: '', keys: ['title'] },
            { value: '', keys: ['itemType'] },
            { value: true, custom: this.expiredFilter }
        ];

        this.view = 'table';
    }

    expiredFilter(filterValue, row) {
        let dt = moment(row.expiredDate);
        return !filterValue || moment(dt).isAfter(this.todayMoment);
    }

    async activate() {
        this.refresh();
    }

    attached() {
        $('#filterField').focus();
        $('[data-toggle="tooltip"]').tooltip();
        $('.selectpicker').selectpicker();
    }

    async refresh() {
        await this.siteInfo.getObjectArray('?order=createdDate')
    }

    new() {
        this.siteInfo.selectObject();
        this.refreshSelects();
        this.createValidationRules();
        this.view = 'form';
    }

    async edit(info) {
        this.selectedInfoId = info._id;
        await this.siteInfo.getObject(this.selectedInfoId);
        this.refreshSelects();
        this.createValidationRules();
        this.view = 'form';
    }

    refreshSelects() {
        this.utils.refreshSelect("#itemType", this.config.SITE_INFO_TYPES, "type", this.siteInfo.selectedObject.itemType);
        this.utils.refreshSelect("#priority", this.priorities, "priority", this.siteInfo.selectedObject.priority);
        this.utils.refreshSelect("#typeFilter", this.config.SITE_INFO_TYPES, "value", this.filters[1].value);
    }

    createValidationRules() {

        validationMessages['required'] = 'You must enter \${$displayName}.'
        ValidationRules
            .ensure('title').displayName('a Title').required()
            .ensure('content').displayName('a Content').required()
            .on(this.siteInfo.selectedObject);
    }

    async save() {
        this.controller.validate()
            .then(result => {
                if (result.valid) {
                    this.saveObject();
                } else {
                    let message = 'You must fix the errors before you can save the system?';
                    let title = "Fix Errors";
                    let options = ['Ok'];
                    this.dialog.open({ viewModel: MessageDialog, model: { message, title, options }, lock: false }).whenClosed(response => {
                        return;
                    });
                }
            });
    }

    async saveObject() {
        
        let serverResponse = await this.siteInfo.saveObject();
        if (!serverResponse.error) {
            this.utils.showNotification("The Item was saved");
            if (this.filesToUpload && this.filesToUpload.length) {
                let today = new Date();
                let year = today.getFullYear();
                let month = today.getMonth();
                this.documentsService.uploadFile(this.filesToUpload, 'site', year, month);
            }
            this.refresh();
        } else {
            this.utils.showNotification("There was a problem saving the item", 'error');
        }
        this._cleanUp();
    }

    getURL(){
        let today = new Date();
        let year = today.getFullYear();
        let month = today.getMonth();
        this.siteInfo.selectedObject.url = this.config.DOWNLOAD_URL + '/site/' + year + "/" + month + "/" + this.filesToUpload[0].name;
        this.siteInfo.selectedObject.file.fileName = this.filesToUpload[0].name;
    }

    async delete() {
        let message = 'Are you sure you want to delete this item?';
        let title = "Confirm Delete";
        let options = {};
        this.dialogService.open({ viewModel: ConfirmDialog, model: { message, title, options }, lock: false }).whenClosed(response => {
            if (!response.wasCancelled) {
                this.deleteObject();
            } else {
                this.goBack();
            }
        });
    }

    async deleteObject() {
        let serverResponse = await this.siteInfo.deleteObject();
        if (!serverResponse.error) {
            this.utils.showNotification("The item was deleted");
            this.refresh();
        }
        this._cleanUp();
    }

    back() {
        if (this.siteInfo.isObjectDirty().length) {
            let message = 'Do you want to save the item?';
            let title = "Save Item";
            let options = {};
            this.dialogService.open({ viewModel: ConfirmDialog, model: { message, title, options }, lock: false }).whenClosed(response => {
                if (!response.wasCancelled) {
                    this.save();
                } else {
                    this.goBack();
                }
            });
        } else {
            this.goBack();
        }
    }

    goBack() {
        this.view = 'table';
    }

    cancel() {
        this.siteInfo.refreshOriginalObject();
        this.refreshSelects();
    }

    clearFilters() {
        this.filters[0].value = "";
        this.filters[1].value = "";
        this.refreshSelects();
        $('#filterField').focus();
    }

    changeFiles() {
        this.filesToUpload = new Array();
        this.filesToUpload.push(this.files[0]);
        this.getURL();
    }

    removeFile(index) {
        this.filesToUpload.splice(index, 1);
    }

    _cleanUp() {
        this.goBack();
    }

}