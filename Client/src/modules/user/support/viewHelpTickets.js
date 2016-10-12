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
import {AppState} from '../../../resources/data/appState';

import Validation from '../../../resources/utils/validation';

import moment from 'moment';
import $ from 'jquery';

@inject(Router, AppConfig, Validation, People, AppState, DataTable, Utils, HelpTickets, Sessions, Downloads, Products)
export class ViewHelpTickets {
    helpTicketSelected = false;
    enterResponse = false;

    navControl = "supportNavButtons";
    spinnerHTML = "";
    filterValues = new Array();

  constructor(router, config, validation, people, app, datatable, utils, helpTickets, sessions, apps, products) {
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

  attached(){
      $('[data-toggle="tooltip"]').tooltip();
  }

  activate() {
    this.getData();
    // this._setUpValidation();
  }

  async getData(){
    let responses = await Promise.all([
      this.helpTickets.getHelpTicketArray(true,"?filter=personId|eq|" + this.app.user._id,"",true),
      this.sessions.getSessionsArray(true, '?order=startDate'),
      this.apps.getDownloadsArray(true,'?filter=helpTicketRelevant|eq|true&order=name'),
      this.people.getPeopleArray(true,'?order=lastName&fields=firstName lastName email phone fullName')
    ]);
    this.updateArray();
    
    this.isUCC = this.app.userRole >- this.config.UCC_TECH_ROLE;

    //var options = '?filter=[and]itemType|eq|ILNK:expiredDate|gt|' + currentDate + '&order=Category';
    this.dataTable.createPageButtons(1);
    this.filterValues.push({property:"helpTicketStatus", value:this.config.NEW_HELPTICKET_STATUS, type:'select-one'});
    if(this.baseArray) this.dataTable.filter(this.filterValues);
  }

  async refresh(){
    this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
    await this.helpTickets.getHelpTicketArray(true, '?filter=personId|eq|' + this.app.user._id);
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

  async selectHelpTicket(el, index){
      this.editIndex = this.displayArray[index + parseInt(this.dataTable.startRecord)].baseIndex;
      this.helpTickets.selectHelpTicket(this.editIndex);

      if(this.helpTickets.selectedHelpTicket.content[0].content.systemId){
        await this.sytems.getSystem(this.helpTickets.content.content.systemId);
      }

      if (this.selectedRow) this.selectedRow.children().removeClass('info');
      this.selectedRow = $(el.target).closest('tr');
      this.selectedRow.children().addClass('info')
      this.helpTicketSelected = true;

      this.viewHelpTicketsHeading = "Help Ticket " + this.helpTickets.selectedHelpTicket.referenceNo;
  }

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

  _createResponse(){
    this.helpTickets.selectedHelpTicketContent.personId = this.app.user._id;
    this.helpTickets.selectedHelpTicketContent.type =  this.config.HELP_TICKET_OTHER_TYPE;
  }

  async saveResponse(){
    this.helpTickets.uploadFile(this.files,this.helpTickets.selectedHelpTicket._id);
      // if(this.validation.validate(1, this)){
        this. _createResponse();
        let serverResponse = await this.helpTickets.saveHelpTicketResponse();
        if (!serverResponse.status) {
            this.utils.showNotification("The help ticket was updated", "", "", "", "", 5);
            if (this.files && this.files.length > 0) this.helpTickets.uploadFile(this.files, serverResponse._id);
        }
        this._cleanUp();
    // }
  }

  _cleanUp(){
    this.enterResponse = false;
    this.files = new Array();
    this.filesSelected = "";
  }

  async getCourses(){
    if(this.isTech()){
      var id = this.coursePerson;
    } else {
      var id = this.user.id;
    }
    let courseResponse = await this.data.getAllObjects(this.data.PERSON_COURSES + id);
    this.courses = courseResponse;
  }


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

  // _setUpValidation(){
  //   this.validation.addRule("00","curriculumTitle",{"rule":"required","message":"Curriculum Title is required"});
  //   this.validation.addRule("00","client",{"rule":"required","message":"You must select a client",
  //     "valFunction":function(context){
  //       return (context.helpTicket.clientId !== undefined);
  //     }});
  //   this.validation.addRule("01","resetPasswordUserIDs",{"rule":"required","message":"You must enter the passwords to reset"});
  //   this.validation.addRule("01","client",{"rule":"required","message":"You must enter the passwords to reset",
  //     "valFunction":function(context){
  //       return (context.helpTicket.clientId !== undefined);
  //     }});
  //   this.validation.addRule("02","application",{"rule":"required","message":"You must select the application",
  //     "valFunction":function(context){
  //       return (context.content.application !== undefined);
  //     }});
  // }

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



  async _cleanUpResponse(){
    this.enterResponse = false;
    this.responseContent = undefined;
  }

  _cleanUpFiles(){
    if (this.files.length !== 0 && this.cleanUpFiles) {
      for(var i = 0; i<this.files.length; i++){
        this.fileList.push(this.files[i])
      }
      $("#uploadFiles").wrap('<form>').closest('form').get(0).reset();
      $("#uploadFiles").unwrap();
      this.files = [];
      this.filesSelected = "";
    }
  }

    _cleanUpFilters(){
        $("#type").val("");
        $("#status").val("");
        $("#personStatus").val("");
    }

  async changeTab(el, index){
        $(".list-group").children().removeClass('active');
        $(el.target).parent().addClass('active');
        $(".in").removeClass('active').removeClass('in');
        $("#" + el.target.id + "Tab").addClass('in').addClass('active');
    }
}
