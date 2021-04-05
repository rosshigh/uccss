import { inject } from 'aurelia-framework';
import { ValidationRules, ValidationControllerFactory, validationMessages } from 'aurelia-validation';
import { Sessions } from '../../../resources/data/sessions';
import { AppConfig } from '../../../appConfig';
import { Utils } from '../../../resources/utils/utils';

@inject(ValidationControllerFactory, Sessions, AppConfig, Utils)
export class EditSessions {

    constructor(ValidationControllerFactory, sessions, config, utils) {
        this.controller = ValidationControllerFactory.createForCurrentScope();
        this.sessions = sessions;
        this.config = config;
        this.utils = utils;

        this.filters = [
            { value: true, custom: this.closedFilter }
        ];

        this.validationErrors = [];

        this.view = 'table';
    }

    closedFilter(filterValue, row) {
        return !filterValue || row.sessionStatus !== 'Closed';
    }

    async activate() {
        let responses = await Promise.all([
            this.sessions.getObjectsArray('?order=startDate:DSC'),
            this.sessions.getSessionParameters()
        ]);
    }

    attached() {
        $('#filterField').focus();
        $('[data-toggle="tooltip"]').tooltip();
        $('.selectpicker').selectpicker();
    }

    async refresh() {
        this.clearFilters();
        await this.sessions.getObjectsArray('?order=startDate:DSC');
    }

    new() {
        this.sessions.selectSession();
        this.refreshSelects();
        this.createValidationRules();
        this.view = 'form';
    }

    async edit(session) {
        await this.sessions.getSession(session._id);
        this.refreshSelects();
        this.createValidationRules();
        this.view = 'form';
    }

    refreshSelects() {
        this.utils.refreshSelect("#editSession", this.sessions.SESSION_PARAMS, "session", this.sessions.selectedObject.session);
        this.utils.refreshSelect("#editStatus", this.config.SESSION_STATUSES, "status", this.sessions.selectedObject.sessionStatus);
    }

    createValidationRules() {

        validationMessages['required'] = 'You must enter \${$displayName}.'
        ValidationRules
            .ensure('session').displayName('a Session').required()
            .ensure('year').displayName('a Year').required()
            .ensure('startDate').displayName('a Start Date').required()
            .ensure('endDate').displayName('an End Date').required().minLength(10)
            .ensure('requestsOpenDate').displayName('a Requst Open Date').required()
            .on(this.sessions.selectedObject);
    }

    async save() {
        this.controller.validate()
            .then(result => {
                if (result.valid) {
                    this.saveSession();
                } else {
                    $("#fixErrorsModal").modal('show');
                }
            });
    }

    async saveSession() {
        let serverResponse = await this.sessions.saveSession();
        if (!serverResponse.error) {
            this.utils.updateArrayItem(serverResponse, this.sessions.objectsArray);
            this.utils.showNotification("The session was updated");
            this.refresh();
        } else {
            this.utils.showNotification("There was a problem saving the session", 'error');
        }
        this._cleanUp();
    }

    saveSortOrder(session, event) {
        event.stopPropagation();
        this.sessions.setSession(session);
        let serverResponse = this.sessions.saveSession();
        this.utils.updateArrayItem(serverResponse, this.sessions.objectsArray);
    }

    async refreshConfig() {
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

    updateStatus(index, session, event) {
        event.stopPropagation();
        if (session.sessionStatus === "Closed") return;

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
        this.sessions.selectedObject.sessionStatus = this.editStatus;
        this.save();
    }

    back() {
        if (this.sessions.isSessionDirty().length) {
            this.modalMessage = 'Do you want to save the session?';
            $("#confirmSaveModal").modal('show');
        } else {
            this.goBack();
        }
    }

    goBack() {
        this.view = 'table';
    }

    cancel() {
        this.sessions.selectSessionById(this.sessions.selectedObject._id);
    }

    clearFilters() {
        this.filters[0].value = true;
    }

    _cleanUp() {
        this.institutionId = "";
        this.goBack();
    }
}