import {inject, TemplatingEngine} from 'aurelia-framework';
import { Router } from "aurelia-router";
import { DataTable } from '../../../resources/utils/dataTable';
import { HelpTickets } from '../../../resources/data/helpTickets';
import { Sessions } from '../../../resources/data/sessions';
import { Systems } from '../../../resources/data/systems';
import { Products } from '../../../resources/data/products';
import { ClientRequests } from '../../../resources/data/clientRequests';
import { Downloads } from '../../../resources/data/downloads';
import { AppConfig } from '../../../config/appConfig';
import { Utils } from '../../../resources/utils/utils';
import { CommonDialogs } from '../../../resources/dialogs/common-dialogs';
import { People } from '../../../resources/data/people';

import Validation from '../../../resources/utils/validation';

import moment from 'moment';
import $ from 'jquery';

@inject(Router, AppConfig, Validation, People, DataTable, Utils, HelpTickets, Sessions, Systems, Downloads, Products, ClientRequests, CommonDialogs, TemplatingEngine)
export class ViewHelpTickets {
  helpTicketSelected = false;
  enterResponse = false;
  showLockMessage = false; 
  responseMessage = "";

  navControl = "supportNavButtons";
  spinnerHTML = "";
  filterValues = new Array();
  lockObject = new Object();

  constructor(router, config, validation, people, datatable, utils, helpTickets, sessions, systems, apps, products, requests, dialog, templatingEngine) {
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
    this.systems = systems;
    this.apps = apps;
    this.products = products;
    this.requests = requests;
    this.dialog = dialog;
    this.templatingEngine = templatingEngine;
  };

  attached() {
    $('[data-toggle="tooltip"]').tooltip();
  }

  deactivate(){
    this._unLock();
  }
  
  canActivate() {
    this.userObj = JSON.parse(sessionStorage.getItem('user'));
  }

  async activate() {
    let responses = await Promise.all([
      this.helpTickets.getHelpTicketTypes('?order=category'),
      this.helpTickets.getHelpTicketArray("?filter=personId|eq|" + this.userObj._id + "&order=modifiedDate:DSC", true),
      this.sessions.getSessionsArray('?order=startDate', true),
      this.apps.getDownloadsArray(true, '?filter=helpTicketRelevant|eq|true&order=name'),
      this.people.getPeopleArray('?order=lastName&fields=firstName lastName email phone fullName'),
      this.systems.getSystemsArray(),
      this.config.getConfig()
    ]);
    this.updateArray();

    this.sendEmail = false;;

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

    await this.getDetails();

    var response = await this.helpTickets.getHelpTicketLock(this.helpTickets.selectedHelpTicket._id);
    if(!response.error){
      if(response.helpTicketId === 0){
            //Lock help ticket
          this.helpTickets.lockHelpTicket({
            helpTicketId: this.helpTickets.selectedHelpTicket._id,
            personId: this.userObj._id
          });
          this.responseMessage = "";
          this.showLockMessage = false;
          this.lockObject = {}; 
      } else {
          this.lockObject = response[0];
          this.responseMessage = "Help Ticket is currently locked by " + this.getName();
          this.showLockMessage = true;  
      }
    }

    let subTypeIndex = this.getIndex(this.helpTickets.helpTicketTypesArray[this.helpTickets.selectedHelpTicket.helpTicketCategory].subtypes, this.helpTickets.selectedHelpTicket.content[0].type);
    this.createOutputForm(this.helpTickets.helpTicketTypesArray[this.helpTickets.selectedHelpTicket.helpTicketCategory].subtypes[subTypeIndex].outputForm)

    if (this.selectedRow) this.selectedRow.children().removeClass('info');
    this.selectedRow = $(el.target).closest('tr');
    this.selectedRow.children().addClass('info')
    this.helpTicketSelected = true;

    this.viewHelpTicketsHeading = "Help Ticket " + this.helpTickets.selectedHelpTicket.helpTicketNo;
  }

  getIndex(subtypes, type){
    for(let i = 0; i < subtypes.length; i++){
      if(subtypes[i].type === type){
        return i;
      }
    }
    return null;
  }

  createOutputForm(html){
    let el = document.getElementById('container');
    el.innerHTML = html;

    if (el) {
        if (!el.querySelectorAll('.au-target').length) {
            this.templatingEngine.enhance({element: el, bindingContext: this});
        }
    }
  }

  async getDetails(){
    this.showRequestDetails = false;
    // this.helpTickets.selectedHelpTicket.content[0].comments = this.helpTickets.selectedHelpTicket.content[0].comments ? this.helpTickets.selectedHelpTicket.content[0].comments : " ";
    if(this.helpTickets.selectedHelpTicket.requestId){
      // await this.requests.getClientRequest(this.helpTickets.selectedHelpTicket.requestId);
      if(this.helpTickets.selectedHelpTicket.systemId){
        this.showRequestDetails = true;
        for(var i = 0; i < this.systems.systemsArray.length; i++){
          if(this.systems.systemsArray[i]._id === this.helpTickets.selectedHelpTicket.systemId){
            // this.systems.selectedSystemFromId(this.helpTickets.selectedHelpTicket.systemId);
            this.systems.selectClientFromID(this.helpTickets.selectedHelpTicket.systemId, this.helpTickets.selectedHelpTicket.clientId);
            break;
          }
        }
      }
    }
  }

  getName(){
    for(var i = 0; i < this.people.peopleArray.length; i++){
      if(this.people.peopleArray[i]._id == this.lockObject.personId) return this.people.peopleArray[i].fullName;
    }
    return "someone";
  }

  respond() {
     if(!this.showLockMessage && !this.enterResponse){
        this.helpTickets.selectHelpTicketContent();
        this.enterResponse = true;
        this.enableButton = true;
     }
  }

  cancelResponse() {
    this.response = new Object();
    this.isUnchanged = true;
    this.enterResponse = false;
  }
 
  _createResponse() {
    this.helpTickets.selectedHelpTicket.helpTicketStatus = this.config.REPLIED_HELPTICKET_STATUS;
    this.helpTickets.selectedHelpTicketContent.personId = this.userObj._id;
    this.helpTickets.selectedHelpTicketContent.type = this.config.HELP_TICKET_OTHER_TYPE;
    this.helpTickets.selectedHelpTicketContent.emailSent = this.sendEmail;
    this.helpTickets.selectedHelpTicketContent.displayForm = this.config.HELP_TICKET_OTHER_TYPE;
  }

  async saveResponse() {
    // if(this.validation.validate(1)){
    this._createResponse();
    let serverResponse = await this.helpTickets.saveHelpTicketResponse(this.sendEmail);
    if (!serverResponse.error) {
      this.updateArray()
      this.utils.showNotification("The help ticket was updated");
      if (this.filesToUpload && this.filesToUpload.length > 0) this.helpTickets.uploadFile(this.filesToUpload, serverResponse._id);
    }
    this._cleanUp();
    // }
  }

  closeHelpTicket(helpTicket){
     return this.dialog.showMessage(
          "Are you sure you want to close the help ticket?",
          "Close Help Ticket",
          ['Yes', 'No']
      ).then(response => {
          if (!response.wasCancelled) {
              this.closeTicket(helpTicket);
          } else {
              this._cleanUp();
          }
      });
  }

  async closeTicket(helpTicket){
    this.helpTickets.selectHelpTicketByID(helpTicket._id);
      var response = await this.helpTickets.getHelpTicketLock(this.helpTickets.selectedHelpTicket._id);
      if (!response.error) {
        if (response.helpTicketId === 0) {
          this.helpTickets.selectedHelpTicket.helpTicketStatus = this.config.CLOSED_HELPTICKET_STATUS;
          let serverResponse = await this.helpTickets.updateStatus();
          if (!serverResponse.error) {
            this.dataTable.updateArray(this.helpTickets.helpTicketsArray);
            this.utils.showNotification("The help ticket was updated");
          }
          this._cleanUp();
        }
    }
  }

  async openHelpTicket(helpTicket){
    this.helpTickets.selectHelpTicketByID(helpTicket._id);
      var response = await this.helpTickets.getHelpTicketLock(this.helpTickets.selectedHelpTicket._id);
      if (!response.error) {
        if (response.helpTicketId === 0) {
          this.helpTickets.selectedHelpTicket.helpTicketStatus = this.config.REVIEW_HELPTICKET_STATUS;
          let serverResponse = await this.helpTickets.updateStatus();
          if (!serverResponse.error) {
            this.dataTable.updateArray(this.helpTickets.helpTicketsArray);
            this.utils.showNotification("The help ticket was updated");
          }
          this._cleanUp();
        }
    }
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
    this.filesToUpload = new Array();
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
  }

  _cleanUpFilters() {
    $("#type").val("");
    $("#status").val("");
    $("#personStatus").val("");
  }

  changeFiles() {
        this.filesToUpload = this.filesToUpload ? this.filesToUpload : new Array(); 
        for(var i = 0; i < this.files.length; i++){
            let addFile = true;
            this.filesToUpload.forEach(item => {
                if(item.name === this.files[i].name) addFile = false;
            })
            if(addFile) this.filesToUpload.push(this.files[i]);
        }
    }

    removeFile(index){
        this.filesToUpload.splice(index,1);
    }

}
