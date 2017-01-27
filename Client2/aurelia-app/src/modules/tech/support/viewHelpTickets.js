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
import { CommonDialogs } from '../../../resources/dialogs/common-dialogs';

import $ from 'jquery';

@inject(Router, AppConfig, Validation, People, CommonDialogs, DataTable, Utils, HelpTickets, Sessions, Downloads, Products)
export class ViewHelpTickets {
  helpTicketSelected = false;
  enterResponse = false;
  sendEmail = false;
  showLockMessage = false;
  sendMailDisable = false;
  responseMessage = "Click here to respond";

  navControl = "supportNavButtons";
  spinnerHTML = "";
  filterValues = new Array();
  responseContent = "";
  commentShown = "";
  setValue = "";

  constructor(router, config, validation, people, dialog, datatable, utils, helpTickets, sessions, apps, products) {
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

  canActivate() {
    this.userObj = JSON.parse(sessionStorage.getItem('user'));
  }

  /*****************************************************************************************
  * Retrieve the help tickets, sessions, downloads and people
  * Only active help tickets are retrieved
  *****************************************************************************************/
  async activate() {
    let responses = await Promise.all([
      this.helpTickets.getHelpTicketArray("?filter=helpTicketStatus|lte|" + this.config.FOLLOW_UP_HELPTICKET_STATUS + "&order=createdDate:DSC", "", true),
      this.sessions.getSessionsArray('?order=startDate'),
      this.apps.getDownloadsArray(true, '?filter=helpTicketRelevant|eq|true&order=name'),
      this.people.getPeopleArray('', true),
      this.people.getInstitutionsArray(),
      this.config.getConfig()
    ]);
    this.dataTable.updateArray(this.helpTickets.helpTicketsArray);
    this.sendEmail = this.config.SEND_EMAILS;
    this._setUpValidation();
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
    this.helpTickets.getHelpTicketArray("?filter=helpTicketStatus|lte|" + this.config.FOLLOW_UP_HELPTICKET_STATUS + "&order=createdDate:DSC", true),
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

    //If the help ticket has a systemId, retrieve the system from the server
    if (this.helpTickets.selectedHelpTicket.content[0].content.systemId) {
      await this.sytems.getSystem(this.helpTickets.content.content.systemId);
    }

    var response = await this.helpTickets.getHelpTicketLock(this.helpTickets.selectedHelpTicket._id);
    if (!response.error) {
      if (response.helpTicketId === 0) {
        //Lock help ticket
        this.helpTickets.lockHelpTicket({
          helpTicketId: this.helpTickets.selectedHelpTicket._id,
          personId: this.userObj._id
        });
        this.responseMessage = "Click here to respond";
        this.showLockMessage = false;
        this.lockObject = { personId: this.userObj._id };
      } else {
        if (response[0].personId === this.userObj._id) {
          this.showLockMessage = false;
          this.responseMessage = "Click here to respond";
          this.lockObject = { personId: this.userObj._id };
        } else {
          this.lockObject = response[0];
           this.responseMessage = "Help Ticket is currently locked by " + this.getName();
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

  getName(){
    for(var i = 0; i < this.people.peopleArray.length; i++){
      if(this.people.peopleArray[i]._id == this.lockObject.personId) return this.people.peopleArray[i].fullName;
    }
    return "someone";
  }

  /*****************************************************************************************
  * Open the response form and create an empty help ticket content object
  *****************************************************************************************/
  respond() {
    if (!this.showLockMessage) {
      this.helpTickets.selectHelpTicketContent();
      this.responseContent = this.helpTickets.selectedHelpTicketContent.content.comments;
      this.responseContent = "";
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
    this.helpTickets.selectedHelpTicketContent.content.comments = this.responseContent;
    this.helpTickets.selectedHelpTicketContent.emailSent = this.sendEmail;
  }

  /*****************************************************************************************
  * Save the response
  *****************************************************************************************/
  async saveResponse() {
    // if(this.validation.validate(1)){
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

  /*****************************************************************************************
  * Update the helpticket status
  *****************************************************************************************/
  async updateStatus() {
    // if(this.validation.validate(1, this)){
    let serverResponse = await this.helpTickets.updateStatus();
    if (!serverResponse.status) {
      this.utils.showNotification("The help ticket was updated");
    }
    this._cleanUp();
    // }
  }

  /*****************************************************************************************
  * Update the help ticket keywords
  *****************************************************************************************/
  async updateKeywords() {
    // if(this.validation.validate(1, this)){
    let serverResponse = await this.helpTickets.updateKeywords();
    if (!serverResponse.status) {
      this.utils.showNotification("The help ticket was updated");
    }
    this._cleanUp();
    // }
  }

  /*****************************************************************************************
  * Update the help ticket ownder
  *****************************************************************************************/
  async own() {
    if(this.helpTickets.selectedHelpTicket.owner[0].personId != this.userObj._id){
      if (!this.showLockMessage) {
        var obj = {
          personId: this.userObj._id,
          status: this.config.UNDER_REVIEW_HELPTICKET_STATUS
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

  async ownHelpTicket(helpTicket) {
    this.helpTickets.selectHelpTicketByID(helpTicket._id);
    if(this.helpTickets.selectedHelpTicket.owner[0].personId != this.userObj._id){
      var response = await this.helpTickets.getHelpTicketLock(this.helpTickets.selectedHelpTicket._id);
      if (!response.error) {
        if (response.helpTicketId === 0) {
          var obj = {
            personId: this.userObj._id,
            status: this.config.UNDER_REVIEW_HELPTICKET_STATUS
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
  }

  /*****************************************************************************************
  * Retrieve a person's courses
  *****************************************************************************************/
  // async getCourses(){
  //   let courseResponse = await this.data.getAllObjects(this.data.PERSON_COURSES + this.coursePerson);
  //   this.courses = courseResponse;
  // }

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
    this.helpTicketSelected = false;
    this._cleanUp();
    this._unLock();
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
