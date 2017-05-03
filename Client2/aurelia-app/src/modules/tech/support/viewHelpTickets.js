import {inject, TemplatingEngine} from 'aurelia-framework';
import { Router } from "aurelia-router";
import { DataTable } from '../../../resources/utils/dataTable';
import { HelpTickets } from '../../../resources/data/helpTickets';
import { Sessions } from '../../../resources/data/sessions';
import { Systems } from '../../../resources/data/systems';
import { Products } from '../../../resources/data/products';
import { Downloads } from '../../../resources/data/downloads';
import { AppConfig } from '../../../config/appConfig';
import { Utils } from '../../../resources/utils/utils';
import { People } from '../../../resources/data/people';
import Validation from '../../../resources/utils/validation';
import { CommonDialogs } from '../../../resources/dialogs/common-dialogs';
import {ClientRequests} from '../../../resources/data/clientRequests';
import {DocumentsServices} from '../../../resources/data/documents';

import $ from 'jquery';

@inject(Router, AppConfig, Validation, People, CommonDialogs, DataTable, Utils, HelpTickets, Sessions, Systems, Downloads, Products, TemplatingEngine, ClientRequests, DocumentsServices)
export class ViewHelpTickets {
  helpTicketSelected = false;
  enterResponse = false;
  showLockMessage = false;
  sendMailDisable = false;
  notesHistory = false;
  lockMessage = "";

  colSpan = 10;

  // navControl = "supportNavButtons";
  spinnerHTML = "";
  filterValues = new Array();
  commentShown = "";
  responseMessage = "";

  constructor(router, config, validation, people, dialog, datatable, utils, helpTickets, sessions, systems, apps, products, templatingEngine, requests, documents) {
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
    this.dialog = dialog;
    this.templatingEngine = templatingEngine;
    this.requests = requests;
    this.documents = documents;
  };

  canActivate() {
    this.userObj = JSON.parse(sessionStorage.getItem('user'));
    this.isUCC = this.userObj.userRole >= this.config.UCC_ROLE;
  }

  /*****************************************************************************************
  * Retrieve the help tickets, sessions, downloads and people
  * Only active help tickets are retrieved
  *****************************************************************************************/
  async activate(params) {
    let responses = await Promise.all([
      this.helpTickets.getHelpTicketTypes('?order=category'),
      this.helpTickets.getHelpTicketArray("?filter=helpTicketStatus|lt|" + this.config.CLOSED_HELPTICKET_STATUS + "&order=createdDate:DSC", true),
      this.people.getPeopleArray(),
      this.people.getInstitutionsArray('?order=name'),
      this.config.getConfig()
    ]);

    this.sessions.getSessionsArray('?order=startDate');
    this.apps.getDownloadsArray(true, '?filter=helpTicketRelevant|eq|true&order=name');
    this.systems.getSystemsArray();
    this.documents.getDocumentsCategoriesArray();

    this.peopleArray = this.people.peopleArray;
    this.dataTable.updateArray(this.helpTickets.helpTicketsArray);
    this.sendEmail = this.config.SEND_EMAILS;
    this._setUpValidation();
    this.helpTicketTypes = this.config.HELP_TICKET_STATUSES.filter(item => {
       return item.code !== this.config.CLOSED_HELPTICKET_STATUS;
    })

    if(params.id) {
      this.notesHistory = true;
      this.helpTickets.selectHelpTicketByID(params.id);
      this.openHelpTicket();
    }

    this.helpTicketTypeLookupArray = new Array();
    this.helpTickets.helpTicketTypesArray.forEach(item => {
      item.subtypes.forEach(item2 => {
        this.helpTicketTypeLookupArray.push({helpTicketType: item2.type, description: item2.description});
      })
    })

    this.removeHTStatus = [this.config.NEW_HELPTICKET_STATUS, this.config.REPLIED_HELPTICKET_STATUS];
  }

  attached() {
    $('[data-toggle="tooltip"]').tooltip();
  }

  detached() {
    this._unLock();
  }

  sendMailNow() {
    this.helpTickets.sendMail();
  }

  showComment(helpTicket, el) {
    this.commentShown = helpTicket.content[0].content.comments;
    $(".hover").css("top", el.clientY - 100);
    $(".hover").css("left", el.clientX + 10);
    $(".hover").css("display", "block");
  }

  hideComment() {
    $(".hover").css("display", "none");
  }

  showProfile(helpTicket, el){
      this.profileHelpTicket = helpTicket;
      this.people.selectedPersonFromId(helpTicket.personId);
      $(".hoverProfile").css("top", el.clientY - 175);
      $(".hoverProfile").css("left", el.clientX - 100);
      $(".hoverProfile").css("display", "block");
  }

  hideProfile(){
     $(".hoverProfile").css("display", "none");
  }

  sendAnEmail(id){
    if(id){
      let email = {emailBody: "", emailSubject: "", emailId: id};
      return this.dialog.showEmail(
            "Enter Email",
            email,
            ['Submit', 'Cancel']
        ).then(response => {
            if (!response.wasCancelled) {
                this.sendTheEmail(response.output);
            } else {
                console.log("Cancelled");
            }
        });
    }
  }

  async sendTheEmail(email){
    console.log( email.email.emailBody);
    if(!this.people.selectedPerson || this.people.selectedPerson._id !== email.email.emailId) this.people.selectedPersonFromId(email.email.emailId);
    if(email){
        var message = {
            id: email.email.emailId,
            message : email.email.emailBody,
            email: this.people.selectedPerson.email,
            subject: email.email.emailSubject,
            audit: {
                property: 'Send Message',
                eventDate: new Date(),
                newValue: email.email.emailBody,
                personId: this.userObj._id
            }
        };     
        let serverResponse = await this.people.sendCustomerMessage(message);
        if (!serverResponse.error) {
            this.utils.showNotification("The message was sent");
            this.hideProfile();
        }
    } 
  }

  confidentialChecked() {
    if (document.getElementById('confidentialCheckBox').checked) {
      this.sendMailDisable = true;
      this.sendEmail = false;
    } else {
      this.sendMailDisable = false;
      this.sendEmail = true;
    }
  }

  /*****************************************************************************************
  * Refresh the helpticket collection
  *****************************************************************************************/
  async refresh() {
    this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
    this.helpTickets.getHelpTicketArray("?filter=helpTicketStatus|lt|" + this.config.CLOSED_HELPTICKET_STATUS + "&order=createdDate:DSC", true),
      this.dataTable.updateArray(this.helpTickets.helpTicketsArray);
    this.spinnerHTML = "";
    this._cleanUpFilters()
  }

  /*****************************************************************************************
  * User selected a help ticket
  * el - event object
  * index - index of selected help ticket
  *****************************************************************************************/
  async selectHelpTicket(el, index) {
    //Make the selected help ticket the selected help ticket
    this.editIndex = this.dataTable.displayArray[index + parseInt(this.dataTable.startRecord)].baseIndex;
    this.helpTickets.selectHelpTicket(this.editIndex);
    this.openHelpTicket();

    let categoryIndex = this.helpTickets.selectedHelpTicket.helpTicketCategory;
    let subTypeIndex = this.getIndex(this.helpTickets.helpTicketTypesArray[categoryIndex].subtypes, this.helpTickets.selectedHelpTicket.content[0].type);
     this.clientRequired = this.helpTickets.helpTicketTypesArray[categoryIndex].subtypes[subTypeIndex].clientRequired;
    this.createOutputForm(this.helpTickets.helpTicketTypesArray[categoryIndex].subtypes[subTypeIndex].outputForm);

    if (this.selectedRow) this.selectedRow.children().removeClass('info');
    this.selectedRow = $(el.target).closest('tr');
    this.selectedRow.children().addClass('info');

    this.viewHelpTicketsHeading = "Help Ticket " + this.helpTickets.selectedHelpTicket.helpTicketNo;
    this.helpTicketSelected = true;

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

  async openHelpTicket(){
    if(this.helpTickets.selectedHelpTicket._id.length){
      await this.getDetails();
      var response = await this.helpTickets.getHelpTicketLock(this.helpTickets.selectedHelpTicket._id);
      if (!response.error) {
        if (response.helpTicketId === 0) {
          //Lock help ticket
          this.helpTickets.lockHelpTicket({
            helpTicketId: this.helpTickets.selectedHelpTicket._id,
            personId: this.userObj._id
          });
          this.lockMessage = "";
          this.showLockMessage = false;
          this.lockObject = { personId: this.userObj._id };
        } else {
          if (response[0].personId === this.userObj._id) {
            this.showLockMessage = false;
            this.lockMessage = "";
            this.lockObject = { personId: this.userObj._id };
          } else {
             if(response[0].personId !== this.userObj._id){
              this.lockObject = response[0];
              this.lockMessage = "Help Ticket is currently locked by " + this.getName();
              this.showLockMessage = true;
             }
          }
        }
      }
    } else {
      this.utils.showNotification('Help Ticket not found')
    }
   
  }

  async getDetails(){
    this.requestDetailsUpdated = false;
    this.showRequestDetails = false;
    if(this.helpTickets.selectedHelpTicket.requestId){
      if(this.helpTickets.selectedHelpTicket.systemId){
        this.showRequestDetails = true;
        for(var i = 0; i < this.systems.systemsArray.length; i++){
          if(this.systems.systemsArray[i]._id === this.helpTickets.selectedHelpTicket.systemId){
            this.systems.selectClientFromID(this.helpTickets.selectedHelpTicket.systemId, this.helpTickets.selectedHelpTicket.clientId);
            return;
          }
        }
      } else {
        let response = await this.requests.getClientRequest(this.helpTickets.selectedHelpTicket.requestId);
        if(!response.error){
          if(this.requests.selectedRequest.assignments && this.requests.selectedRequest.assignments.length > 0){
            this.requestDetailsUpdated = true;
            this.helpTickets.selectedHelpTicket.systemId = this.requests.selectedRequest.assignments[0].systemId;
            this.helpTickets.selectedHelpTicket.clientId = this.requests.selectedRequest.assignments[0].clientId;
             this.showRequestDetails = true;
            for(var i = 0; i < this.systems.systemsArray.length; i++){
              if(this.systems.systemsArray[i]._id === this.helpTickets.selectedHelpTicket.systemId){
                this.systems.selectClientFromID(this.helpTickets.selectedHelpTicket.systemId, this.helpTickets.selectedHelpTicket.clientId);
                return;
              }
            }
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

  async save(){
    var changes = this.helpTickets.isHelpTicketDirty();
     if(changes && changes.length > 0){
       changes.forEach(item => {
         this.helpTickets.selectedHelpTicket.audit.push({
           property: item.property,
           oldValue: item.oldValue,
           newValue: item.newValue,
           eventDate: new  Date(),
           personId: this.userObj._id
         })
       })
     }
    
      var response = await this.helpTickets.getHelpTicketLock(this.helpTickets.selectedHelpTicket._id);
      if (!response.error) {
        if (response.helpTicketId === 0 || response[0].personId === this.userObj._id) {
          var email = new Object();
          var lastChange = this.helpTickets.selectedHelpTicket.audit[this.helpTickets.selectedHelpTicket.audit.length -1 ];
          if(this.sendEmail){
              this.people.selectedPersonFromId(this.helpTickets.selectedHelpTicket.personId);
              email.reason = 2;
              email.fullName = this.people.selectedPerson.fullName;
              email.email = this.people.selectedPerson.email;
              email.helpTicketNo =  this.helpTickets.selectedHelpTicket.helpTicketNo;
              email.cc = this.config.HELP_TICKET_EMAIL_LIST ? this.config.HELP_TICKET_EMAIL_LIST : "";
              if(lastChange.property == 'helpTicketStatus') {
                email.reason = lastChange.newValue;
                email.message =  "The status was changed to " + this.getStatusDescription(lastChange.newValue);
              } else if (lastChange.property == 'priority'){
                email.reason = 2;
                email.message =  "The priority was changed to " + this.config.HELP_TICKET_PRIORITIES[lastChange.newValue].priority;
              } else {
                var email = new Object();
              }
           
          }
          let serverResponse = await this.helpTickets.saveHelpTicket(email);
          if (!serverResponse.error) {
            this.dataTable.updateArray(this.helpTickets.helpTicketsArray);
            this.utils.showNotification("The help ticket was updated");
          }
          this._cleanUp();
        }
    }
  }

  getStatusDescription(status){
    for(let i = 0; i < this.config.HELP_TICKET_STATUSES.length; i++){
      if(status == this.config.HELP_TICKET_STATUSES[i].code){
        return this.config.HELP_TICKET_STATUSES[i].description;
      }
    }
    return "";
  }

  /*****************************************************************************************
  * Open the response form and create an empty help ticket content object
  *****************************************************************************************/
  respond() {
    if (!this.showLockMessage && !this.enterResponse) {
      this.sendMailDisable = false;
      this.responseMessage = "";
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

  /*****************************************************************************************
  * Create the response object
  *****************************************************************************************/
  _createResponse() {
    this.helpTickets.selectedHelpTicketContent.personId = this.userObj._id;
    this.helpTickets.selectedHelpTicketContent.type = this.config.HELP_TICKET_OTHER_TYPE;
    this.helpTickets.selectedHelpTicketContent.emailSent = this.sendEmail;
    this.helpTickets.selectedHelpTicketContent.content.comments = this.responseMessage;
    this.helpTickets.selectedHelpTicketContent.displayForm = this.config.HELP_TICKET_OTHER_TYPE;
  }

  /*****************************************************************************************
  * Save the response
  *****************************************************************************************/
  async saveResponse(status) {
    this.helpTickets.selectedHelpTicket.helpTicketStatus = status;
    this._createResponse();
    var email = new Object();
    if(this.sendEmail){
       this.people.selectedPersonFromId(this.helpTickets.selectedHelpTicket.personId);
        email.reason = status;
        email.fullName = this.people.selectedPerson.fullName;
        email.email = this.people.selectedPerson.email;
        email.helpTicketNo =  this.helpTickets.selectedHelpTicket.helpTicketNo;
        email.cc = this.config.HELP_TICKET_EMAIL_LIST ? this.config.HELP_TICKET_EMAIL_LIST : "";
        email.message = status == this.config.CUSTOMER_ACTION_HELPTICKET_STATUS ? this.userObj.fullName + " has asked for more information." : this.userObj.fullName + " has responded to the help ticket."
    }
    let serverResponse = await this.helpTickets.saveHelpTicketResponse(email);
    if (!serverResponse.error) {
      if(status = this.config.CLOSED_HELPTICKET_STATUS) await this.refresh();
      this.dataTable.updateArray(this.helpTickets.helpTicketsArray);
      this.utils.showNotification("The help ticket was updated");
      if (this.filesToUpload && this.filesToUpload.length > 0) this.helpTickets.uploadFile(this.filesToUpload, serverResponse._id);
    }
    this._cleanUp();
  }

  async ownHelpTicket(helpTicket) {
    if(helpTicket) {
      this.helpTickets.selectHelpTicketByID(helpTicket._id);
    }
    if(this.helpTickets.selectedHelpTicket.owner[0].personId != this.userObj._id){
      if(!this.showLockMessage){
          var email = new Object();
          email.personId = this.userObj._id;
          email.status = this.config.REVIEW_HELPTICKET_STATUS;
          if(this.sendEmail){    
            this.people.selectedPersonFromId(this.helpTickets.selectedHelpTicket.personId);
              email.reason = 2;
              email.fullName = this.people.selectedPerson.fullName;
              email.personId = this.userObj._id;
              email.status = this.config.REVIEW_HELPTICKET_STATUS;
              email.email = this.people.selectedPerson.email;
              email.helpTicketNo =  this.helpTickets.selectedHelpTicket.helpTicketNo;
              email.cc = this.config.HELP_TICKET_EMAIL_LIST ? this.config.HELP_TICKET_EMAIL_LIST : "";
              email.message = this.userObj.fullName + " has taken ownership of the help ticket.";
          }
          let serverResponse = await this.helpTickets.updateOwner(email);
          if (!serverResponse.error) {
            this.dataTable.updateArray(this.helpTickets.helpTicketsArray);
            this.utils.showNotification("The help ticket was updated");
          }
          if(helpTicket){
            this._cleanUp();
          }
      }
    }
  }

  async changeStatus(helpTicket, status, description){
    this.helpTickets.selectHelpTicketByID(helpTicket._id);
      var response = await this.helpTickets.getHelpTicketLock(this.helpTickets.selectedHelpTicket._id);
      if (!response.error) {
        if (response.helpTicketId === 0) {
          var obj = {
            property: "helpTicketStatus",
            oldValue: this.helpTickets.selectedHelpTicket.helpTicketStatus,
            newValue: status,
            personId: this.userObj._id,
            date: new Date
          }
          this.helpTickets.selectedHelpTicket.audit.push(obj);
          var email = new Object();
          if(this.sendEmail){
            this.people.selectedPersonFromId(this.helpTickets.selectedHelpTicket.personId);
              email.reason = status;
              email.fullName = this.people.selectedPerson.fullName;
              email.email = this.people.selectedPerson.email;
              email.helpTicketNo =  this.helpTickets.selectedHelpTicket.helpTicketNo;
              email.cc = this.config.HELP_TICKET_EMAIL_LIST ? this.config.HELP_TICKET_EMAIL_LIST : "";
              email.message = "The status was changed to " + description;
          }
          this.helpTickets.selectedHelpTicket.helpTicketStatus = status;
          let serverResponse = await this.helpTickets.saveHelpTicket(email);
          if (!serverResponse.error) {
            this.dataTable.updateArray(this.helpTickets.helpTicketsArray);
            this.utils.showNotification("The help ticket was updated");
          }
          this._cleanUp();
        }
    }
  }

  _unLock() {
    if (!this.showLockMessage) {
      if (this.helpTickets.selectedHelpTicket && this.helpTickets.selectedHelpTicket._id) {
        this.helpTickets.removeHelpTicketLock(this.helpTickets.selectedHelpTicket._id);
      }
    }
  }

  _cleanUp() {
    this.enterResponse = false;
    this.filesToUpload = new Array();
    this.files = new Array();
    this.filesSelected = "";
    this._unLock();
    this.helpTicketSelected = false;
  }

  flag(){
     var note = {noteBody: "", noteCategories: this.userObj.noteCategories, selectedCategory: 0};
         return this.dialog.showNote(
                "Save Changes",
                note,
                ['Submit', 'Cancel']
            ).then(response => {
                if (!response.wasCancelled) {
                    this.saveNote(response.output);
                } else {
                    console.log("Cancelled");
                }
            });
  }

  async saveNote(note){
        this.people.selectNote();
        this.people.selectedNote.personId = this.userObj._id;
        this.people.selectedNote.category = this.userObj.noteCategories[note.selectedCategory];
        this.people.selectedNote.note = note.note.noteBody;
        this.people.selectedNote.reference = this.helpTickets.selectedHelpTicket._id;
        this.people.selectedNote.helpTicketNo = this.helpTickets.selectedHelpTicket.helpTicketNo;
        let response = await this.people.saveNote();
            if(!response.error){
                this.utils.showNotification('The note was saved');
            }
  }
    
  back() {
     var changes = this.helpTickets.isHelpTicketDirty();
     if (this.helpTickets.isHelpTicketDirty().length) {
       let that = this;
        if(this.requestDetailsUpdated) { 
          this.message = "The product assignment details were updated.  Do you want to save the changes?"
        } else {
          this.message = "The help ticket has been changed. Do you want to save your changes?"
        }
          return this.dialog.showMessage(
              that.message,
              "Save Changes",
              ['Yes', 'No']
          ).then(response => {
              if (!response.wasCancelled) {
                  this.save();
              } else {
                  this._cleanUp();
              }
          });
      } else {
          this._cleanUp();
      }
  }

  /*****************************************************************************************
  * Setup validation rules for each help ticket type
  *****************************************************************************************/
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
    this.validation.addRule("02", "application", [{
      "rule": "custom", "message": "You must select the application",
      "valFunction": function (context) {
        return (context.content.application !== undefined);
      }
    }]);
    this.validation.addRule("9", "owner", [{
      "rule": "custom", "message": "You are already the owner",
      "valFunction": function (context) {
        return (context.helpTickets.selectedHelpTicket.owner[0].personId !== context.userObj._id);
      }
    }]);
  }

  _cleanUpFilters() {
    $("#helpTicketType-description").val("");
    $(this.ownerFilter).val("");
    $(this.nameFilter).val("");
    $("#helpTicketStatus").val("");
    this.dataTable.updateArray(this.helpTickets.helpTicketsArray);
  }

  checkSendMail() {
    console.log(this.sendMail)
    this.sendMail = !this.sendMail;
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

  insertDocument(){
    var document = {documentURL: "", documentCats: this.documents.docCatsArray, documents: new Array(), selectedCategory: 0};
        return this.dialog.showDocument(
              "Select Document",
              document,
              ['Submit', 'Cancel']
          ).then(response => {
              if (!response.wasCancelled) {
                this.helpTickets.selectedHelpTicketContent.documents = this.helpTickets.selectedHelpTicketContent.documents ? this.helpTickets.selectedHelpTicketContent.documents : new Array();
                response.output.documents.documents.forEach(item => {
                  this.helpTickets.selectedHelpTicketContent.documents.push({
                    categoryCode: item.categoryCode,
                    categoryName: item.categoryName,
                    fileName: item.fileName,
                  });
                })
              } else {
                  console.log("Cancelled");
              }
          });
  }

  removeDocument(index){
     this.helpTickets.selectedHelpTicketContent.documents.splice(index,1);
  }

}
