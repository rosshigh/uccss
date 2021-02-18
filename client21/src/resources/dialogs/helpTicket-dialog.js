import {inject} from "aurelia-framework";
import {DialogController} from 'aurelia-dialog';
import {Utils} from '../utils/utils';
import {AppConfig} from '../../appConfig';


@inject(DialogController, Utils, AppConfig)
export class HelpTicketDialog {

    constructor(controller, utils, config) {
      this.controller = controller;
      this.utils = utils;
      this.config = config;
    }
    
    message ="";
    activate(data) {
        this.message = data.message; 
        this.header = data.header == undefined ? "Confirmation" : data.header;
    }

    attached(){
        this.refreshSelects();
    }

    refreshSelects(){
        this.utils.refreshSelect("#reason", this.config.HELP_TICKET_CLOSE_REASONS, "code", this.model.selectedReason);
        // this.utils.refreshSelect("#institutionSelect", this.people.institutionsArray, "_id", this.people.selectedPerson.institutionId);
        // this.utils.refreshSelect("#specializationSelect", this.is4ua.specialArray, "code", this.people.selectedPerson.personSpecialization);
        // this.utils.refreshSelect("#departmentSelect", this.is4ua.deptArray, "code", this.people.selectedPerson.departmentCategory);
    }
}