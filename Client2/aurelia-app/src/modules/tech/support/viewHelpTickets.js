import { inject } from 'aurelia-framework';
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

import $ from 'jquery';

@inject(Router, AppConfig, Validation, People, CommonDialogs, DataTable, Utils, HelpTickets, Sessions, Systems, Downloads, Products)
export class ViewHelpTickets {
  helpTicketSelected = false;
  enterResponse = false;
  sendEmail = false;
  showLockMessage = false;
  sendMailDisable = false;
  lockMessage = "";

  navControl = "supportNavButtons";
  spinnerHTML = "";
  filterValues = new Array();
  commentShown = "";
  responseMessage = "";

  constructor(router, config, validation, people, dialog, datatable, utils, helpTickets, sessions, systems, apps, products) {
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
  };

  canActivate() {
    this.userObj = JSON.parse(sessionStorage.getItem('user'));
  }

  /*****************************************************************************************
  * Retrieve the help tickets, sessions, downloads and people
  * Only active help tickets are retrieved
  *****************************************************************************************/
  async activate() {
    let responses = await Promise.all([
      this.helpTickets.getHelpTicketTypes('?order=category'),
      this.helpTickets.getHelpTicketArray("?filter=helpTicketStatus|lt|" + this.config.CLOSED_HELPTICKET_STATUS + "&order=createdDate:DSC", "", true),
      this.sessions.getSessionsArray('?order=startDate'),
      this.apps.getDownloadsArray(true, '?filter=helpTicketRelevant|eq|true&order=name'),
      this.people.getPeopleArray('', true),
      this.people.getInstitutionsArray('?order=name'),
      this.systems.getSystemsArray(),
      this.config.getConfig()
    ]);
    this.dataTable.updateArray(this.helpTickets.helpTicketsArray);
    this.sendEmail = this.config.SEND_EMAILS;
    this._setUpValidation();
    this.helpTicketTypes = this.config.HELP_TICKET_STATUSES.filter(item => {
       return item.code !== this.config.CLOSED_HELPTICKET_STATUS;
    })

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
          this.lockObject = response[0];
           this.lockMessage = "Help Ticket is currently locked by " + this.getName();
          this.showLockMessage = true;
        }
      }
    }

    if (this.selectedRow) this.selectedRow.children().removeClass('info');
    this.selectedRow = $(el.target).closest('tr');
    this.selectedRow.children().addClass('info')
    this.helpTicketSelected = true;

    this.viewHelpTicketsHeading = "Help Ticket " + this.helpTickets.selectedHelpTicket.helpTicketNo;
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
          let serverResponse = await this.helpTickets.saveHelpTicket(false);
          if (!serverResponse.error) {
            this.dataTable.updateArray(this.helpTickets.helpTicketsArray);
            this.utils.showNotification("The help ticket was updated");
          }
          this._cleanUp();
        }
    }
  }

  /*****************************************************************************************
  * Open the response form and create an empty help ticket content object
  *****************************************************************************************/
  respond() {
    if (!this.showLockMessage) {
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
  }

  /*****************************************************************************************
  * Save the response
  *****************************************************************************************/
  async saveResponse(status) {
    // if(this.validation.validate(1)){
    this.helpTickets.selectedHelpTicket.helpTicketStatus = status;
    this._createResponse();
    let serverResponse = await this.helpTickets.saveHelpTicketResponse(this.sendEmail);
    if (!serverResponse.error) {
      this.dataTable.updateArray(this.helpTickets.helpTicketsArray);
      this.utils.showNotification("The help ticket was updated");
      if (this.files && this.files.length > 0) this.helpTickets.uploadFile(this.files, serverResponse._id);
    }
    this._cleanUp();
    // }
  }

  async ownHelpTicket(helpTicket) {
    this.helpTickets.selectHelpTicketByID(helpTicket._id);
    if(this.helpTickets.selectedHelpTicket.owner[0].personId != this.userObj._id){
      var response = await this.helpTickets.getHelpTicketLock(this.helpTickets.selectedHelpTicket._id);
      if (!response.error) {
        if (response.helpTicketId === 0) {
          var obj = {
            personId: this.userObj._id,
            status: this.config.REVIEW_HELPTICKET_STATUS
          }
          let serverResponse = await this.helpTickets.updateOwner(obj);
          if (!serverResponse.error) {
            this.dataTable.updateArray(this.helpTickets.helpTicketsArray);
            this.utils.showNotification("The help ticket was updated");
          }
          this._cleanUp();
        }
      }
    }
  }

  async changeStatus(helpTicket, status){
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
          this.helpTickets.selectedHelpTicket.helpTicketStatus = status;
          let serverResponse = await this.helpTickets.saveHelpTicket();
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
    this.files = new Array();
    this.filesSelected = "";
    this.helpTicketSelected = false;
    this._unLock();
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
        let response = await this.people.saveNote();
            if(!response.error){
                this.utils.showNotification('The note was saved');
            }
    }
    
  /*****************************************************************************************
  * COnstruct the string to display the files chosen
  *****************************************************************************************/
  changeFiles() {
    var foo = "";
    for (var i = 0; i < this.files.length; i++) {
      foo += this.files[i].name;
      if (i < this.files.length - 1) foo += ", ";
    }
    this.filesSelected = foo;
  }

  back() {
     var changes = this.helpTickets.isHelpTicketDirty();
     if (this.helpTickets.isHelpTicketDirty().length) {
            return this.dialog.showMessage(
                "The help ticket has been changed. Do you want to save your changes?",
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
    $("#helpTicketType").val("");
    $("#helpTicketStatus").val("");
    $(this.ownerFilter).val("");
    $(this.nameFilter).val("");
    $(this.nickNameFilter).val("");
    $("#institutionId").val("");
  }

  checkSendMail() {
    this.sendMail = !this.sendMail;
  }

}
