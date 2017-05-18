import { inject } from 'aurelia-framework';
import { Router } from "aurelia-router";
import { Utils } from '../../../resources/utils/utils';
import { Sessions } from '../../../resources/data/sessions';
import Validation from '../../../resources/utils/validation';
import { DataTable } from '../../../resources/utils/dataTable';
import { AppConfig } from '../../../config/appConfig';
import { Config } from '../../../resources/data/config';
import { CommonDialogs } from '../../../resources/dialogs/common-dialogs';

@inject(Router, Sessions, Validation, Utils, DataTable, AppConfig, Config, CommonDialogs)
export class EditSessions {
    navControl = "sessionNavButtons";
    showScreen = 'sessionTable';
    spinnerHTML = "";
    isChecked = true;

    constructor(router, sessions, validation, utils, datatable, config, siteConfig, dialog) {
        this.router = router;
        this.sessions = sessions;
        this.utils = utils;
        this.validation = validation;
        this.validation.initialize(this);
        this.dataTable = datatable;
        this.dataTable.initialize(this);
        this.config = config;
        this.dialog = dialog;
        this.siteConfig = siteConfig;

        this._setupValidation();
    };

    attached() {
        this.toolTips();
    }

    async activate() {
        await this.sessions.getSessionsArray('?order=startDate:DSC', true);
        await this.config.getConfig();
        await this.config.getSessions();
        this.dataTable.updateArray(this.sessions.sessionsArray,'startDate',-1);
        this.filterOutClosed();
    }

    async refresh() {
        this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
        await this.sessions.getSessionsArray('?order=startDate', true);
        this.dataTable.updateArray(this.sessions.sessionsArray,'startDate',-1);
        this.spinnerHTML = "";
    }

    new() {
        this.sessions.selectSession();
        this.showScreen = 'editSession';
        this.sessionSelected = true;
        this.editSystem = true;
        this.newSession = true;
        $("#editSession").focus();
        if (this.selectedRow) this.selectedRow.children().removeClass('rowSelected');
    }

    //User clicked a session to edit
    edit(index, el) {
        //Open edit form
        this.showScreen = 'editSession';
        //Save the index of the item to be edited
        this.editIndex = this.dataTable.getOriginalIndex(index);
        this.sessions.selectSession(this.editIndex);

        //Not a new session
        this.editSession = true;
        $("#editSession").focus();

        //Used to update the table appearance during navigation
        if (this.selectedRow) this.selectedRow.children().removeClass('info');
        this.selectedRow = $(el.target).closest('tr');
        this.selectedRow.children().addClass('info')
    }

    async save() {
        if (this.validation.validate(1)) {
            let serverResponse = await this.sessions.saveSession();
            if (!serverResponse.error) {
                this.dataTable.updateArray(this.sessions.sessionsArray,'startDate',-1);
                this.utils.showNotification("Session " + this.sessions.selectedSession.session + " " + this.sessions.selectedSession.year + " was updated");
                this.showScreen = 'sessionTable';
            }
        }
    }

     async refreshConfig(){
       await this.config.getSessions(true);
        this.editSessionConfig();
    }

    editSessionConfig() {
        this.editSessionConfigArray = new Array();
        this.config.SESSION_PARAMS.forEach((item) => {
            this.editSessionConfigArray.push(this.utils.copyObject(item));
        })
        this.showScreen = 'editConfig';
    }

    async saveConfig() {
        if (this.editSessionConfigArray) {
            let serverResponse = await this.siteConfig.saveSessions(this.editSessionConfigArray);
            if (!serverResponse.error) {
                this.editSessionConfigArray.forEach((item, index) => {
                    this.config.SESSION_PARAMS[index] = item;
                })
                this.utils.showNotification("Session configuration updated");
                this.showScreen = 'sessionTable';
            }
        }
    }

    updateStatus(index, session, el) {
        if(session.sessionStatus === "Closed") return;
        
        this.editIndex = this.dataTable.getOriginalIndex(index);
        this.sessions.selectSession(this.editIndex);

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

    filterOutClosed() {
        if (this.isChecked) {
            this.dataTable.filterList("Closed", {type: 'value', filter: "closedFilter",  collectionProperty: 'sessionStatus', compare: 'not-match'});
        } else {
            this.dataTable.updateArray(this.sessions.sessionsArray,'startDate',-1);
        }
        this.toolTips();
    }

    cancel() {
        this.sessions.selectSession(this.editIndex);
    }

    cancelConfig() {
        this.editSessionConfigArray = new Array();
        this.config.SESSION_PARAMS.forEach((item) => {
            this.editSessionConfigArray.push(this.utils.copyObject(item));
        })
    }

    backConfig() {
        this.showScreen = 'sessionTable';
    }

    back() {
        if (this.sessions.isDirty().length) {
            return this.dialog.showMessage(
                "The session has been changed. Do you want to save your changes?",
                "Save Changes",
                ['Yes', 'No']
            ).then(response => {
                if (!response.wasCancelled) {
                    this.save();
                } else {
                    this.showScreen = 'sessionTable';
                }
            });
        } else {
           this.showScreen = 'sessionTable';
        }
    }

    _setupValidation() {
        this.validation.addRule(1, "editName", { "rule": "required", "message": "Session name is required", "value": "sessions.selectedSession.session" });
        this.validation.addRule(1, "editYear", { "rule": "required", "message": "Session year is required", "value": "sessions.selectedSession.year" });
        this.validation.addRule(1, "editStartDate", { "rule": "required", "message": "Session start date is required", "value": "sessions.selectedSession.startDate" });
        this.validation.addRule(1, "editEndDate", { "rule": "required", "message": "Session end date is required", "value": "sessions.selectedSession.endDate" });
        this.validation.addRule(1, "editRequestsOpenDate", { "rule": "required", "message": "Session requests open date is required", "value": "sessions.selectedSession.requestsOpenDate" });
    }

    toolTips(){
        $('[data-toggle="tooltip"]').tooltip();
    }

}
