import { inject } from 'aurelia-framework';
import { ValidationRules, ValidationControllerFactory, validationMessages } from 'aurelia-validation';
import { DialogService } from 'aurelia-dialog';
import { ConfirmDialog } from '../../../resources/dialogs/confirm-dialog';
import { MessageDialog } from '../../../resources/dialogs/message-dialog';
import { Sessions } from '../../../resources/data/sessions';
import { AppConfig } from '../../../appConfig';
import { Store } from '../../../store/store';
import { Utils } from '../../../resources/utils/utils';

@inject(ValidationControllerFactory, Sessions, AppConfig, Store, Utils, DialogService)
export class EditSessions {

    constructor(ValidationControllerFactory, sessions, config, store, utils, dialogService) {
        this.controller = ValidationControllerFactory.createForCurrentScope();
        this.sessions = sessions;
        this.config = config;
        this.store = store;
        this.utils = utils;
        this.dialogService = dialogService;

        this.configParameters = this.store.getConfig();

        this.filters = [
            { value: true, custom: this.closedFilter }
        ];

        this.validationErrors = [];

        this.view = 'table';
    }

    closedFilter(filterValue, row){
        return !filterValue || row.sessionStatus !== 'Closed';
    }

    async activate() {
        let responses = await Promise.all([
            this.sessions.getSessionsArray('?order=startDate:DSC'),
        ]);
    }

    attached() {
        $('#filterField').focus();
        $('[data-toggle="tooltip"]').tooltip();
    }

    async refresh() {
        this.clearFilters();
        await this.sessions.getSessionsArray('?order=startDate:DSC');
    }

    new() {
        this.sessions.selectSession();
        this.createValidationRules();
        this.view = 'form';
    }

    async edit(session) {
        await this.sessions.getSession(session._id);
        this.createValidationRules();
        this.view = 'form';
    }

    createValidationRules() {

        validationMessages['required'] = 'You must enter \${$displayName}.'
        ValidationRules
            .ensure('session').displayName('a Session').required()
            .ensure('year').displayName('a Year').required()
            .ensure('startDate').displayName('a Start Date').required()
            .ensure('endDate').displayName('an End Date').required().minLength(10)
            .ensure('requestsOpenDate').displayName('a Requst Open Date').required()
            .on(this.sessions.selectedSession);
    }

    async save() {
        this.controller.validate()
            .then(result => {
                if (result.valid) {
                    this.saveSession();
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

    async saveSession() {
        let serverResponse = await this.sessions.saveSession();
        if (!serverResponse.error) {
            this.utils.showNotification("The session was updated");
            this.refresh();
        } else {
            this.utils.showNotification("There was a problem saving the session", 'error');
        }
        this._cleanUp();
    }

    saveSortOrder(session){
        this.sessions.setSession(session);
        let serverResponse = this.sessions.saveSession();
    }

    async refreshConfig(){
        await this.sessions.getSessionParameters()
        this.editSessionConfig();
    }

    editSessionConfig() {
        this.editSessionConfigArray = new Array();
        this.sessions.SESSION_PARAMS.forEach((item) => {
            this.editSessionConfigArray.push(this.utils.copyObject(item));
        })
        this.view = 'config';
    }

    backConfig() {
        this.view = 'table';
    }

    async cancelConfig() {
        this.editSessionConfigArray = new Array();
        await this.refreshConfig();
    }

    async saveConfig() {
        if (this.editSessionConfigArray) {
            let serverResponse = await this.sessions.saveSessionConfig(this.editSessionConfigArray);
            if (!serverResponse.error) {
                await this.refreshConfig();
                this.utils.showNotification("Session configuration updated");
                this.view = 'table';
            }
        }
    }

    updateStatus(index, session) {
        if(session.sessionStatus === "Closed") return;
        
        this.sessions.selectSessionById(session._id);

        switch (session.sessionStatus) {
            case "Next":
                this.editStatus = "Requests";
                break;
            case "Requests":
                this.editStatus = "Active";
                break;
            case "Active":
                this.editStatus = "Closed"
                break;
        }
        this.sessions.selectedSession.sessionStatus = this.editStatus;
        this.save();
    }

    back() {
        if (this.sessions.isSessionDirty().length) {
            let message = 'Do you want to save the session?';
            let title = "Save Session";
            let options = {};
            this.dialog.open({ viewModel: ConfirmDialog, model: { message, title, options }, lock: false }).whenClosed(response => {
                if (!response.wasCancelled) {
                    this.saveSession();
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
        this.sessions.selectSessionById(this.sessions.selectedSession._id);
    }

    clearFilters() {
        this.filters[0].value = true;
    }

    _cleanUp() {
        this.institutionId = "";
        this.goBack();
    }
}