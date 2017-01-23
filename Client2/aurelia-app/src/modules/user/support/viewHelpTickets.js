import { inject } from 'aurelia-framework';
import { Router } from "aurelia-router";
import { DataTable } from '../../../resources/utils/dataTable';
import { HelpTickets } from '../../../resources/data/helpTickets';
import { Sessions } from '../../../resources/data/sessions';
import { Products } from '../../../resources/data/products';
import { Downloads } from '../../../resources/data/downloads';
import { AppConfig } from '../../../config/appConfig';
import { Utils } from '../../../resources/utils/utils';
import { People } from '../../../resources/data/people';

import Validation from '../../../resources/utils/validation';

import moment from 'moment';
import $ from 'jquery';

@inject(Router, AppConfig, Validation, People, DataTable, Utils, HelpTickets, Sessions, Downloads, Products)
export class ViewHelpTickets {
  helpTicketSelected = false;
  enterResponse = false;
  showLockMessage = false; 

  navControl = "supportNavButtons";
  spinnerHTML = "";
  filterValues = new Array();
  lockObject = new Object();
  responseContent = " ";

  constructor(router, config, validation, people, datatable, utils, helpTickets, sessions, apps, products) {
    this.router = router;
    this.config = config;
    this.validation = validation;
    this.validation.initialize(this);
    this.people = people;
    this.dataTable = datatable;
    this.dataTable.initialize(this);
    this.utils = utils;
    this.helpTickets = helpTickets;
    this.sessions = sessions;
    this.apps = apps;
    this.products = products;
  };

  attached() {
    $('[data-toggle="tooltip"]').tooltip();
  }

  detached(){
    this. _unLock();
  }
  
  canActivate() {
    this.userObj = JSON.parse(sessionStorage.getItem('user'));
  }

  async activate() {
    let responses = await Promise.all([
      this.helpTickets.getHelpTicketArray("?filter=personId|eq|" + this.userObj._id + "&order=modifiedDate:DSC"),
      this.sessions.getSessionsArray('?order=startDate', true),
      this.apps.getDownloadsArray(true, '?filter=helpTicketRelevant|eq|true&order=name'),
      this.people.getPeopleArray('?order=lastName&fields=firstName lastName email phone fullName'),
      this.config.getConfig()
    ]);
    this.updateArray();

    this.sendEmail = this.config.SEND_EMAILS;

    this.isUCC = this.userObj.userRole >= this.config.UCC_TECH_ROLE;

    this.dataTable.createPageButtons(1);
    this.filterValues.push({ property: "helpTicketStatus", value: this.config.NEW_HELPTICKET_STATUS, type: 'select-one' });
    if (this.dataTable.active) this.dataTable.filter(this.filterValues);
    this._setUpValidation();
  }

  async refresh() {
    this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
    await this.helpTickets.getHelpTicketArray('?filter=personId|eq|' + this.userObj._id, true);
    this.updateArray();
    this.spinnerHTML = "";
  }

  updateArray() {
    this.dataTable.updateArray(this.helpTickets.helpTicketsArray);
    this._cleanUpFilters();
  }

  async selectHelpTicket(el, index) {
    this.editIndex = this.dataTable.displayArray[index + parseInt(this.dataTable.startRecord)].baseIndex;
    this.helpTickets.selectHelpTicket(this.editIndex);

    if (this.helpTickets.selectedHelpTicket.content[0].content.systemId) {
      await this.sytems.getSystem(this.helpTickets.content.content.systemId);
    }

    var response = await this.helpTickets.getHelpTicketLock(this.helpTickets.selectedHelpTicket._id);
    if(!response.error){
      if(response.helpTicketId === 0){
            //Lock help ticket
          this.helpTickets.lockHelpTicket({
            helpTicketId: this.helpTickets.selectedHelpTicket._id,
            personId: this.userObj._id
          });
          this.showLockMessage = false;
          this.lockObject = {}; 
      } else {
          this.lockObject = response[0];
          this.showLockMessage = true;  
      }
    }

    if (this.selectedRow) this.selectedRow.children().removeClass('info');
    this.selectedRow = $(el.target).closest('tr');
    this.selectedRow.children().addClass('info')
    this.helpTicketSelected = true;

    this.viewHelpTicketsHeading = "Help Ticket " + this.helpTickets.selectedHelpTicket.referenceNo;
  }

  respond() {
     if(!this.showLockMessage){
        this.responseContent = "";
        this.helpTickets.selectHelpTicketContent();
        this.enterResponse = true;
        this.enableButton = true;
        tinyMCE.activeEditor.focus();
     }
  }

  cancelResponse() {
    this.response = new Object();
    this.isUnchanged = true;
    this.enterResponse = false;
  }

  _createResponse() {
    this.helpTickets.selectedHelpTicketContent.personId = this.userObj._id;
    this.helpTickets.selectedHelpTicketContent.type = this.config.HELP_TICKET_OTHER_TYPE;
    this.helpTickets.selectedHelpTicketContent.content.comments = this.responseContent
  }

  async saveResponse() {
    // if(this.validation.validate(1)){
    this._createResponse();
    let serverResponse = await this.helpTickets.saveHelpTicketResponse(this.sendEmail);
    if (!serverResponse.error) {
      this.updateArray()
      this.utils.showNotification("The help ticket was updated");
      if (this.files && this.files.length > 0) this.helpTickets.uploadFile(this.files, serverResponse._id);
    }
    this._cleanUp();
    // }
  }

  /*****************************************************************************************
 * THe user selected files to upload to update the ineterface with the file names
 *****************************************************************************************/
  changeFiles() {
    this.filesSelected = "";
    this.selectedFiles = new Array();
    for (var i = 0; i < this.files.length; i++) {
      this.selectedFiles.push(this.files[i].name);
      this.filesSelected += this.files[i].name + " ";
    }

  }

  _cleanUp() {
    this.enterResponse = false;
    this.files = new Array();
    this.filesSelected = "";
  }

  _unLock(){
     if(!this.showLockMessage){
      if(this.helpTickets.selectedHelpTicket && this.helpTickets.selectedHelpTicket._id){
        this.helpTickets.removeHelpTicketLock(this.helpTickets.selectedHelpTicket._id);
      }    
    }
  }

  back() {
    this.helpTicketSelected = false;
    this._cleanUp();
    this._unLock();
  }

  _setUpValidation() {
    this.validation.addRule("00", "curriculumTitle", [{ "rule": "required", "message": "Curriculum Title is required" }]);
    this.validation.addRule("00", "client", [{
      "rule": "custom", "message": "You must select a client",
      "valFunction": function (context) {
        return (context.helpTicket.clientId !== undefined);
      }
    }]);
    this.validation.addRule("01", "resetPasswordUserIDs", [{ "rule": "required", "message": "You must enter the passwords to reset" }]);
    this.validation.addRule("01", "client", [{
      "rule": "custom", "message": "You must enter the passwords to reset",
      "valFunction": function (context) {
        return (context.helpTicket.clientId !== undefined);
      }
    }]);
    this.validation.addRule("02", "application",[ {
      "rule": "custom", "message": "You must select the application",
      "valFunction": function (context) {
        return (context.content.application !== undefined);
      }
    }]);
  }

  async _cleanUpResponse() {
    this.enterResponse = false;
    this.responseContent = undefined;
  }

  _cleanUpFilters() {
    $("#type").val("");
    $("#status").val("");
    $("#personStatus").val("");
  }

  async changeTab(el, index) {
    $(".list-group").children().removeClass('active');
    $(el.target).parent().addClass('active');
    $(".in").removeClass('active').removeClass('in');
    $("#" + el.target.id + "Tab").addClass('in').addClass('active');
  }
}
