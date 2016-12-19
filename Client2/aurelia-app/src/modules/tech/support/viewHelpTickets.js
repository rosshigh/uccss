import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";
import {DataTable} from '../../../resources/utils/dataTable';
import {HelpTickets} from '../../../resources/data/helpTickets';
import {Sessions} from '../../../resources/data/sessions';
import {Products} from '../../../resources/data/products';
import {Downloads} from '../../../resources/data/downloads';
import {AppConfig} from '../../../config/appConfig';
import {Utils} from '../../../resources/utils/utils';
import {People} from '../../../resources/data/people';
import Validation from '../../../resources/utils/validation';
import {CommonDialogs} from '../../../resources/dialogs/common-dialogs';

import moment from 'moment';
import $ from 'jquery';

@inject(Router, AppConfig, Validation, People, CommonDialogs, DataTable, Utils, HelpTickets, Sessions, Downloads, Products)
export class ViewHelpTickets {
    helpTicketSelected = false;
    enterResponse = false;
    sendEmail = false;

    navControl = "supportNavButtons";
    spinnerHTML = "";
    filterValues = new Array();
    responseContent = "";
    commentShown = "";

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

  canActivate(){
    this.userObj = JSON.parse(sessionStorage.getItem('user'));
  }

  /*****************************************************************************************
  * Retrieve the help tickets, sessions, downloads and people
  * Only active help tickets are retrieved
  *****************************************************************************************/
  async activate() {
    let responses = await Promise.all([
      this.helpTickets.getHelpTicketArray("?filter=helpTicketStatus|lte|" + this.config.FOLLOW_UP_HELPTICKET_STATUS + "&order=createdDate:DSC","",true),
      this.sessions.getSessionsArray('?order=startDate'),
      this.apps.getDownloadsArray(true,'?filter=helpTicketRelevant|eq|true&order=name'),
      this.people.getPeopleArray(),
      this.config.getConfig()
    ]);
    this.dataTable.updateArray(this.helpTickets.helpTicketsArray);

    this.dataTable.createPageButtons(1);
    this._setUpValidation();
  }

  attached(){
        $('[data-toggle="tooltip"]').tooltip();

        // $('.hover').mouseover(function(el) {
        //   // var foo = $(el.target).children()[0];
        //   var foo = $(el.target).next();
        //   $(foo).css("display","block");
        // });

        // $('.hover').mouseout(function(el) {
        //   var foo = $(el.target).children()[0];
        //   $(foo).css("display","none");
        // });
  }

  showComment(helpTicket, el){
    this.commentShown = helpTicket.content[0].content.comments;
    $(".hover").css("top",el.clientY - 100);
    $(".hover").css("left",el.clientX + 10);
    $(".hover").css("display","block");
  }

  hideComment(){
    $(".hover").css("display","none");
  }
  
  /*****************************************************************************************
  * Refresh the helpticket collection
  *****************************************************************************************/
  async refresh(){
    this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
    this.helpTickets.getHelpTicketArray("?filter=helpTicketStatus|lte|" + this.config.FOLLOW_UP_HELPTICKET_STATUS + "&order=createdDate:DSC","",true),
    this.dataTable.updateArray(this.helpTickets.helpTicketsArray);
    this.spinnerHTML = "";
  }

  /*****************************************************************************************
  * User selected a help ticket
  * el - event object
  * index - index of selected help ticket
  *****************************************************************************************/
  async selectHelpTicket(el, index){
      //Make the selected help ticket the selected help ticket
      this.editIndex = this.dataTable.displayArray[index + parseInt(this.dataTable.startRecord)].baseIndex;
      this.helpTickets.selectHelpTicket(this.editIndex);

      //If the help ticket has a systemId, retrieve the system from the server
      if(this.helpTickets.selectedHelpTicket.content[0].content.systemId){
        await this.sytems.getSystem(this.helpTickets.content.content.systemId);
      }

      if (this.selectedRow) this.selectedRow.children().removeClass('info');
      this.selectedRow = $(el.target).closest('tr');
      this.selectedRow.children().addClass('info')
      this.helpTicketSelected = true;

      this.viewHelpTicketsHeading = "Help Ticket " + this.helpTickets.selectedHelpTicket.helpTicketNo;
  }

 /*****************************************************************************************
 * Open the response form and create an empty help ticket content object
 *****************************************************************************************/
  respond(){
    this.helpTickets.selectHelpTicketContent();
    this.responseContent = this.helpTickets.selectedHelpTicketContent.content.comments;
    this.responseContent = "";
    this.enterResponse = true;
    this.enableButton = true;
  }

  cancelResponse(){
    this.response = new Object();
    this.isUnchanged = true;
    this.enterResponse = false;
  }

 /*****************************************************************************************
 * Create the response object
 *****************************************************************************************/
  _createResponse(){
    this.helpTickets.selectedHelpTicketContent.personId = this.userObj._id;
    this.helpTickets.selectedHelpTicketContent.type =  this.config.HELP_TICKET_OTHER_TYPE;
    this.helpTickets.selectedHelpTicketContent.content.comments = this.responseContent; 
  }

 /*****************************************************************************************
 * Save the response
 *****************************************************************************************/
  async saveResponse(){
      // if(this.validation.validate(1, this)){
        this. _createResponse();
        let serverResponse = await this.helpTickets.saveHelpTicketResponse();
        if (!serverResponse.status) {
          this.dataTable.updateArray(this.helpTickets.helpTicketsArray);
          if(this.sendEmail){
            var obj = {
              id: this.helpTickets.selectedHelpTicket._id,
              audit: {
                    property: 'Send Response Message',
                    eventDate: new Date(),
                    oldValue: "",
                    personId: this.userObj._id
                }
            };
             this.helpTickets.sendMail(obj);
          }
            this.utils.showNotification("The help ticket was updated");
            if (this.files && this.files.length > 0) this.helpTickets.uploadFile(this.files,serverResponse._id);
        }
        this._cleanUp();
    // }
  }
  
  /*****************************************************************************************
  * Update the helpticket status
  *****************************************************************************************/
  async updateStatus(){
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
  async updateKeywords(){
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
  async own(){
     if(this.validation.validate(9, this)){
        var obj = {
          personId: this.userObj._id
        }
        let serverResponse = await this.helpTickets.updateOwner(obj);
        if (!serverResponse.error) {
          this.dataTable.updateArray(this.helpTickets.helpTicketsArray);
          this.utils.showNotification("The help ticket was updated");
        }
        this._cleanUp();
    }
  }

  _cleanUp(){
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
  changeFiles(){
    var foo = "";
    for(var i = 0; i < this.files.length; i++){
      foo += this.files[i].name;
      if (i < this.files.length - 1) foo += ", ";
    }
    this.filesSelected = foo;
  }

  back(){
    this.helpTicketSelected = false;
  }

  /*****************************************************************************************
  * Setup validation rules for each help ticket type
  *****************************************************************************************/
  _setUpValidation(){
    this.validation.addRule("00","curriculumTitle",[{"rule":"required","message":"Curriculum Title is required"}]);
    this.validation.addRule("00","client",[{"rule":"custom","message":"You must select a client",
      "valFunction":function(context){
        return (context.helpTicket.clientId !== undefined);
      }}]);
    this.validation.addRule("01","resetPasswordUserIDs",[{"rule":"required","message":"You must enter the passwords to reset"}]);
    this.validation.addRule("01","client",[{"rule":"custom","message":"You must enter the passwords to reset",
      "valFunction":function(context){
        return (context.helpTicket.clientId !== undefined);
      }}]);
    this.validation.addRule("02","application",[{"rule":"custom","message":"You must select the application",
      "valFunction":function(context){
        return (context.content.application !== undefined);
      }}]);
      this.validation.addRule("9","owner",[{"rule":"custom","message":"You are already the owner",
      "valFunction":function(context){
        return (context.helpTickets.selectedHelpTicket.owner[0].personId !== context.userObj._id);
      }}]);
  }
  
  
  _cleanUpFilters(){
      $("#helpTicketType").val("");
      $("#helpTicketStatus").val("");
  }

  checkSendMail(){
    this.sendMail = !this.sendMail;
  }

}
