import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";
import {Utils} from '../../../resources/utils/utils';
import {Sessions} from '../../../resources/data/sessions';
import Validation from '../../../resources/utils/validation';
import {DataTable} from '../../../resources/utils/dataTable';
import {AppConfig} from '../../../config/appConfig';
import {CommonDialogs} from '../../../resources/dialogs/common-dialogs';
import moment from 'moment';

@inject(Router, Sessions, Validation, Utils, DataTable, AppConfig, CommonDialogs)
export class EditSessions {
    navControl = "sessionNavButtons";
    sessionSelected = false;
    columnspan = 5;
    spinnerHTML="";

    constructor(router, sessions, validation, utils, datatable, config, dialog) {
        this.router = router;
        this.sessions = sessions;
        this.utils = utils;
        this.validation = validation;
        this.dataTable = datatable;
        this.dataTable.initialize(this);
        this.config = config;
        this.dialog = dialog;

        this._setupValidation();
    };

    attached(){
        $('[data-toggle="tooltip"]').tooltip();
    }

    async activate() {
        await this.getData();
    }

    async getData() {
        await this.sessions.getSessionsArray(true, '?order=startDate');
        this.updateArray();
        this.dataTable.createPageButtons(1);
    }

    async refresh() {
        this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
        await this.sessions.getSessionsArray(true, '?order=startDate');
        this.updateArray();
        this.spinnerHTML = "";
    }

    updateArray(){
         this.displayArray = this.sessions.sessionsArray;
        this.baseArray = this.displayArray;
        for (var i = 0; i < this.baseArray.length; i++) {
            this.baseArray[i].baseIndex = i;
        }
        this.isChecked = true;
        this.filterOutClosed();
    }

    new() {
        this.sessions.selectSession();
        this.sessionSelected = true;
        this.editSystem = true;
        this.newSession = true;
        $("#editSession").focus();
        if (this.selectedRow) this.selectedRow.children().removeClass('rowSelected');
    }

    //User clicked a session to edit
    edit(index, el) {
        //Open edit form
        this.sessionSelected = true;
        //Save the index of the item to be edited
        this.editIndex = this.displayArray[index + parseInt(this.dataTable.startRecord)].baseIndex;
        this.displayIndex = index + parseInt(this.dataTable.startRecord);
        this.sessions.selectSession(this.editIndex);

        //Not a new session
        this.editSession = true;
        $("#editSession").focus();

        //Used to update the table appearance during navigation
        // this.interfaceUpdate = true;
        if (this.selectedRow) this.selectedRow.children().removeClass('info');
        this.selectedRow = $(el.target).closest('tr');
        this.selectedRow.children().addClass('info')
    }

    async save() {
        if(this.validation.validate(1,this)){
            let serverResponse = await this.sessions.saveSession();
            if (!serverResponse.status) {
                this.updateArray();
                this.utils.showNotification("Session " + this.sessions.selectedSession.session + " " + this.sessions.selectedSession.year + " was updated", "", "", "", "", 5);
                this.sessionSelected = false;
            }
        }
    }

    updateStatus(index, session, el) {
        this.editIndex = this.displayArray[index + parseInt(this.dataTable.startRecord)].baseIndex;
        this.displayIndex = index + parseInt(this.dataTable.startRecord);
        this.sessions.selectSession(this.editIndex);

        switch (el.target.value) {
            case "Open":
                this.editStatus = "Requests";
                break;
            case "Activate":
                this.editStatus = "Active";
                break;
            case "Close":
                this.editStatus = "Closed";
        }
        this.sessions.selectedSession.sessionStatus = this.editStatus;
        this.save();
    }

    filterOutClosed() {
        if (this.isChecked) {
            this.displayArray = this.baseArray.filter((item) => {
                return item.sessionStatus !== 'Closed';
            })
        } else {
            this.displayArray = this.baseArray;
        }
    }

    cancel(){
        this.sessions.selectSession(this.editIndex);
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
                        this.sessionSelected = false;
                    }
                });
        } else {
            this.sessionSelected = false;
        }
    }

    _setupValidation(){
        this.validation.addRule(1,"editName",{"rule":"required","message":"Session name is required", "value": "sessions.selectedSession.session"});
        this.validation.addRule(1,"editYear",{"rule":"required","message":"Session year is required", "value": "sessions.selectedSession.year"});
        this.validation.addRule(1,"editStartDate",{"rule":"required","message":"Session start date is required", "value": "sessions.selectedSession.startDate"});
        this.validation.addRule(1,"editEndDate",{"rule":"required","message":"Session end date is required", "value": "sessions.selectedSession.endDate"});
        this.validation.addRule(1,"editRequestsOpenDate",{"rule":"required","message":"Session requests open date is required", "value": "sessions.selectedSession.requestsOpenDate"});
    }

}
