import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";

import {DialogService} from 'aurelia-dialog';

import {DataTable} from '../../../resources/utils/dataTable';
import {HelpTickets} from '../../../resources/data/helpTickets';
import {Sessions} from '../../../resources/data/sessions';
import {Products} from '../../../resources/data/products';
import {Downloads} from '../../../resources/data/downloads';
import {AppConfig} from '../../../config/appConfig';
import {Utils} from '../../../resources/utils/utils';
import {People} from '../../../resources/data/people';
import {AppState} from '../../../resources/data/appState';
import Validation from '../../../resources/utils/validation';
import {ConfirmDialog} from '../../../resources/elements/confirm-dialog';

import moment from 'moment';

@inject(Router, AppConfig, Validation, People, AppState, DialogService, DataTable, Utils, HelpTickets, Sessions, Downloads, Products)
export class ArchiveHelpTickets {
    helpTicketSelected = false;
    enterResponse = false;

    navControl = "supportNavButtons";
    spinnerHTML = "";
    filterValues = new Array();

  constructor(router, config, validation, people, app, dialog, datatable, utils, helpTickets, sessions, apps, products) {
    this.router = router;
    this.config = config;
    this.validation = validation;
    this.app = app;
    this.people = people;
    this.dataTable = datatable;
    this.dataTable.initialize(this);
    this.utils = utils;
    this.helpTickets = helpTickets;
    this.sessions = sessions;
    this.apps = apps;
    this.products = products;
  };

  activate() {
    this.getData();
    this._setUpValidation();
  }

  async getData(){
    let responses = await Promise.all([
      this.helpTickets.getHelpTicketArray(true, "?filter=helpTicketStatus|gt|" + this.config.FOLLOW_UP_HELPTICKET_STATUS + "&order=createdDate:DSC","",true),
      this.sessions.getSessionsArray(true, '?order=startDate'),
      this.apps.getDownloadsArray(true,'?filter=helpTicketRelevant|eq|true&order=name'),
      this.people.getPeopleArray(true,'?order=lastName&fields=firstName lastName email phone fullName')
    ]);
    this.updateArray();

    //Filter help tickets for new help tickets
    
    // this.filterValues.push({property:"helpTicketStatus", value:this.config.NEW_HELPTICKET_STATUS, type:'select-one'});
    // if(this.baseArray) this.displayArray = this.dataTable.filter(this.filterValues);
    // this.helpTicket = this.baseArray[0];
    this.dataTable.createPageButtons(1);
  }
  
  attached(){
    $("#helpTicketStatus").val(this.config.NEW_HELPTICKET_STATUS).change();
  }

  async refresh(){
    this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
    this.helpTickets.getHelpTicketArray(true, "?filter=helpTicketStatus|lte|" + this.config.FOLLOW_UP_HELPTICKET_STATUS + "&order=createdDate:DSC","",true),
    this. updateArray();
    this.spinnerHTML = "";
  }

  updateArray(){
    this.displayArray = this.helpTickets.helpTicketsArray;
    this.baseArray = this.displayArray;
     for(var i = 0; i<this.baseArray.length; i++){
      this.baseArray[i].originalIndex = i;
    }
    this._cleanUpFilters();
  }

  filterInsList(el){
    this.selectInstitutions = this.institutions.filter(function (obj) {
      return obj.name.toUpperCase().indexOf(this.instSearch.toUpperCase()) > -1
    });
  }

  /*****************************************************************************************
  * User selected a help ticket
  * el - event object
  * index - index of selected help ticket
  *****************************************************************************************/
  async selectHelpTicket(el, index){
      //Make the selected help ticket the selected help ticket
      this.editIndex = this.displayArray[index + parseInt(this.dataTable.startRecord)].baseIndex;
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
    this.helpTickets.selectedHelpTicketContent.personId = this.app.user._id;
    this.helpTickets.selectedHelpTicketContent.type =  this.config.HELP_TICKET_RESPONSE_TYPE;
  }

 /*****************************************************************************************
 * Save the response
 *****************************************************************************************/
  async saveResponse(){
      // if(this.validation.validate(1, this)){
        this. _createResponse();
        let serverResponse = await this.helpTickets.saveHelpTicketResponse();
        if (!serverResponse.status) {
            this.utils.showNotification("The help ticket was updated", "", "", "", "", 5);
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
            this.utils.showNotification("The help ticket was updated", "", "", "", "", 5);
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
            this.utils.showNotification("The help ticket was updated", "", "", "", "", 5);
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
          personId: this.app.user._id
        }
        let serverResponse = await this.helpTickets.updateOwner(obj);
        if (!serverResponse.status) {
            this.utils.showNotification("The help ticket was updated", "", "", "", "", 5);
        }
        this._cleanUp();
    }
  }

  _cleanUp(){
    this.enterResponse = false;
  }

  /*****************************************************************************************
  * Retrieve a person's courses
  *****************************************************************************************/
  // async getCourses(){
  //   let courseResponse = await this.data.getAllObjects(this.data.PERSON_COURSES + this.coursePerson);
  //   this.courses = courseResponse;
  // }

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

  _setUpValidation(){
    this.validation.addRule("00","curriculumTitle",{"rule":"required","message":"Curriculum Title is required"});
    this.validation.addRule("00","client",{"rule":"required","message":"You must select a client",
      "valFunction":function(context){
        return (context.helpTicket.clientId !== undefined);
      }});
    this.validation.addRule("01","resetPasswordUserIDs",{"rule":"required","message":"You must enter the passwords to reset"});
    this.validation.addRule("01","client",{"rule":"required","message":"You must enter the passwords to reset",
      "valFunction":function(context){
        return (context.helpTicket.clientId !== undefined);
      }});
    this.validation.addRule("02","application",{"rule":"required","message":"You must select the application",
      "valFunction":function(context){
        return (context.content.application !== undefined);
      }});
      this.validation.addRule("9","owner",{"rule":"required","message":"You are already the owner",
      "valFunction":function(context){
        return (context.helpTickets.selectedHelpTicket.owner[0].personId !== context.app.user._id);
      }});
  }

  // _cleanUpNewHelpTicket(){
  //   this.newHelpTicket = {}
  //   this.newHelpTicket.sessionId = ""
  //   this.newHelpTicket.courseId = ""
  //   this.content = {}
  //   this.clients = []
  // }

  // async _cleanUp(){
  //   if(this.isTech()){
  //     this.getTechData();
  //   } else {
  //     this.getData();
  //   }

  //   this._cleanUpNewHelpTicket()
  //   this._hideTypes();
  //   if(this.selectedRow) this.selectedRow.children().removeClass('rowSelected');
  //   this.showAdditionalInfo = false;
  //   this.enableButton = false;
  //   if(this.files.length !== 0 && this.files !== null) {
  //     $("#uploadFiles").wrap('<form>').closest('form').get(0).reset();
  //     $("#uploadFiles").unwrap();
  //     this.files = [];
  //   }
  //   this.filesSelected="";
  // }


  // async _cleanUpResponse(){
  //   this.enterResponse = false;
  //   this.responseContent = undefined;
  // }

  // _cleanUpFiles(){
  //   if (this.files.length !== 0 && this.cleanUpFiles) {
  //     for(var i = 0; i<this.files.length; i++){
  //       this.fileList.push(this.files[i])
  //     }
  //     $("#uploadFiles").wrap('<form>').closest('form').get(0).reset();
  //     $("#uploadFiles").unwrap();
  //     this.files = [];
  //     this.filesSelected = "";
  //   }
  // }

    _cleanUpFilters(){
        $("#type").val("");
        $("#status").val("");
        $("#personStatus").val("");
    }

  // async changeTab(el, index){
  //       $(".list-group").children().removeClass('active');
  //       $(el.target).parent().addClass('active');
  //       $(".in").removeClass('active').removeClass('in');
  //       $("#" + el.target.id + "Tab").addClass('in').addClass('active');
  //   }
}
