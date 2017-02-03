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

@inject(Router, AppConfig, Validation, People, DataTable, Utils, HelpTickets, Sessions, Downloads, Products)
export class ArchiveHelpTickets {
  searchResults = false;
  helpTicketSelected = false;

  navControl = "supportNavButtons";
  spinnerHTML = "";
  helpTicketNo = "";
  dateFrom;
  dateTo;
  selectedProducts = new Array();
  selectedPeople = new Array();
  selectedInstitutions = new Array();
  
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

  async activate() {
    let responses = await Promise.all([
      this.helpTickets.getHelpTicketArray("",true),
      this.sessions.getSessionsArray('?order=startDate', true),
      this.products.getProductsArray('?order=name'),
      this.people.getInstitutionsArray('?order=name'),
      // this.apps.getDownloadsArray(true, '?filter=helpTicketRelevant|eq|true&order=name'),
      this.people.getPeopleArray('?order=lastName', true),
      this.config.getConfig()
    ]);
    this.filterList();
    this.filterPeopleList();
    this.filterInstitutionsList();
  }

  attached() {
    $("#helpTicketStatus").val(this.config.NEW_HELPTICKET_STATUS).change();
    this.dateFrom = "";
    this.dateTo = "";
    // this.selectedStatus = "99";
  }

  buildSearchCriteria(){
    this.searchObj = new Object();

    this.searchObj.helpTicketNo = this.helpTicketNo;

    this.searchObj.dateRange = {
      dateFrom: this.dateFrom,
      dateTo: this.dateTo
    };

    this.searchObj.status = this.selectedStatus;

    this.searchObj.keyWords = this.keyWords;

    this.searchObj.content = this.content;

    this.searchObj.type = this.selectedType;

    this.searchObj.productIds = this.selectedProducts;

    this.searchObj.peopleIds = this.selectedPeople;

    this.searchObj.institutionIds = this.selectedInstitutions;

  }

  search(){
    this.buildSearchCriteria();
    this.resultArray = this.helpTickets.advancedSearch(this.searchObj);
    this.helpTicketSelected = true;
    this.dataTable.updateArray(this.resultArray);
  }

  helpTicketNoEntered() {
    if (this.helpTicketNo.length > 0) {
        $('#elementsToOperateOn :input').attr('disabled', true);
    } else {
        $('#elementsToOperateOn :input').removeAttr('disabled');
    }   
  }

  async typeChanged(){
    this._hideTypes();
    var index = parseInt(this.selectedType) - 1;
    if(index === 3) {
      this.showAdditionalInfo = false;
    } else {
      this.showAdditionalInfo = true;
       this.config.HELP_TICKET_TYPES[index].show = true;
      if( this.config.HELP_TICKET_TYPES[index].appsRequired || !this.config.HELP_TICKET_TYPES[index].clientRequired ) {
          await this.apps.getDownloadsArray(true, '?fields=helpTicketRelevant|eq|true&order=name');
      } else {
          await this.products.getProductsArray('?fields=_id name');
      }
    }
  }

  _hideTypes(){
        for(var i = 0; i < this.config.HELP_TICKET_TYPES.length; i++){
            this.config.HELP_TICKET_TYPES[i].show = false;
        }
  }

  filterList(){
    if(this.filter){
      var thisFilter = this.filter
      this.filteredProductsArray = this.products.productsArray.filter((item) => {
        return item.name.toUpperCase().indexOf(thisFilter.toUpperCase()) != -1;
      });
    } else {
        this.filteredProductsArray = this.products.productsArray;
    }
  }

  selectProduct(el){
      $("#requestProductsLabel").html("Requested Products");
      this.selectedProducts.push(el.target.id);
  }

  removeProduct(el){
    this.selectedProducts.splice(this.selectedProducts.indexOf(el.target.id),1);
  }

  filterPeopleList(){
    if(this.peopleFilter){
      var thisFilter = this.peopleFilter
      this.filteredPersonArray = this.people.peopleArray.filter((item) => {
        return item.fullName.toUpperCase().indexOf(thisFilter.toUpperCase()) != -1;
      });
    } else {
        this.filteredPersonArray = this.people.peopleArray;
    }
  }

  selectPerson(el){
      $("#requestProductsLabel").html("Requested Person");
      this.selectedPeople.push(el.target.id);
  }

  removePerson(el){
    this.selectedPeople.splice(this.selectedPeople.indexOf(el.target.id),1);
  }

  filterInstitutionsList(){
    if(this.institutionsFilter){
      var thisFilter = this.institutionsFilter;
      this.filteredInstitutionArray = this.people.institutionsArray.filter((item) => {
        return item.name.toUpperCase().indexOf(thisFilter.toUpperCase()) != -1;
      });
    } else {
        this.filteredInstitutionArray = this.people.institutionsArray;
    }
  }

  selectInstitution(el){
      this.selectedInstitutions.push(el.target.id);
  }

  removeInstitution(el){
    this.selectedInstitutions.splice(this.selectedInstitutions.indexOf(el.target.id),1);
  }

  clearCriteria(){
    this.selectedInstitutions = new Array();
    this.selectedPeople = new Array();
    this.selectedProducts = new Array();
    this.searchInstitution = false;
    this.searchPeople = false;
    this.searchProduct = false;
    this.keyWords = "";
    this.content = "";
    this.dateFrom = "";
    this.dateTo = "";
    this.selectedStatus = new Array();
    this.helpTicketNo = "";
     $('#elementsToOperateOn :input').removeAttr('disabled');
  }

  // async refresh() {
  //   this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
  //   this.helpTickets.getHelpTicketArray(true, "?filter=helpTicketStatus|lte|" + this.config.FOLLOW_UP_HELPTICKET_STATUS + "&order=createdDate:DSC", "", true),
  //   this.dataTable.updateArray(this.helpTickets.helpTicketsArray);
  //   this._cleanUpFilters()
  //   this.spinnerHTML = "";
  // }

  // filterInsList(el) {
  //   this.selectInstitutions = this.institutions.filter(function (obj) {
  //     return obj.name.toUpperCase().indexOf(this.instSearch.toUpperCase()) > -1
  //   });
  // }

  /*****************************************************************************************
  * User selected a help ticket
  * el - event object
  * index - index of selected help ticket
  *****************************************************************************************/
  async selectHelpTicket(helpTicket, el) {
    //Make the selected help ticket the selected help ticket
     this.helpTickets.selectHelpTicketByID(helpTicket._id);

    //If the help ticket has a systemId, retrieve the system from the server
    if (this.helpTickets.selectedHelpTicket.content[0].content.systemId) {
      await this.systems.getSystem(this.helpTickets.content.content.systemId);
    }

    if (this.selectedRow) this.selectedRow.children().removeClass('info');
    this.selectedRow = $(el.target).closest('tr');
    this.selectedRow.children().addClass('info')
    this.searchResults = true;

    this.viewHelpTicketsHeading = "Help Ticket " + this.helpTickets.selectedHelpTicket.helpTicketNo;
  }

  /*****************************************************************************************
  * Open the response form and create an empty help ticket content object
  *****************************************************************************************/
  // respond() {
  //   this.helpTickets.selectHelpTicketContent();
  //   this.enterResponse = true;
  //   this.enableButton = true;
  // }

  // cancelResponse() {
  //   this.response = new Object();
  //   this.isUnchanged = true;
  //   this.enterResponse = false;
  // }

  /*****************************************************************************************
  * Create the response object
  *****************************************************************************************/
  // _createResponse() {
  //   this.helpTickets.selectedHelpTicketContent.personId = this.app.user._id;
  //   this.helpTickets.selectedHelpTicketContent.type = this.config.HELP_TICKET_RESPONSE_TYPE;
  // }

  /*****************************************************************************************
  * Save the response
  *****************************************************************************************/
  // async saveResponse() {
  //   // if(this.validation.validate(1, this)){
  //   this._createResponse();
  //   let serverResponse = await this.helpTickets.saveHelpTicketResponse();
  //   if (!serverResponse.status) {
  //     this.utils.showNotification("The help ticket was updated", "", "", "", "", 5);
  //     if (this.files && this.files.length > 0) this.helpTickets.uploadFile(this.files, serverResponse._id);
  //   }
  //   this._cleanUp();
  //   // }
  // }

  /*****************************************************************************************
  * Update the helpticket status
  *****************************************************************************************/
  // async updateStatus() {
  //   // if(this.validation.validate(1, this)){
  //   let serverResponse = await this.helpTickets.updateStatus();
  //   if (!serverResponse.status) {
  //     this.utils.showNotification("The help ticket was updated", "", "", "", "", 5);
  //   }
  //   this._cleanUp();
  //   // }
  // }

  /*****************************************************************************************
  * Update the help ticket keywords
  *****************************************************************************************/
  // async updateKeywords() {
  //   // if(this.validation.validate(1, this)){
  //   let serverResponse = await this.helpTickets.updateKeywords();
  //   if (!serverResponse.status) {
  //     this.utils.showNotification("The help ticket was updated", "", "", "", "", 5);
  //   }
  //   this._cleanUp();
  //   // }
  // }

  /*****************************************************************************************
  * Update the help ticket ownder
  *****************************************************************************************/
  // async own() {
  //   if (this.validation.validate(9, this)) {
  //     var obj = {
  //       personId: this.app.user._id
  //     }
  //     let serverResponse = await this.helpTickets.updateOwner(obj);
  //     if (!serverResponse.status) {
  //       this.utils.showNotification("The help ticket was updated", "", "", "", "", 5);
  //     }
  //     this._cleanUp();
  //   }
  // }

  _cleanUp() {
    this.enterResponse = false;
  }

  /*****************************************************************************************
  * Retrieve a person's courses
  *****************************************************************************************/
  // async getCourses(){
  //   let courseResponse = await this.data.getAllObjects(this.data.PERSON_COURSES + this.coursePerson);
  //   this.courses = courseResponse;
  // }

  // changeFiles() {
  //   var foo = "";
  //   for (var i = 0; i < this.files.length; i++) {
  //     foo += this.files[i].name;
  //     if (i < this.files.length - 1) foo += ", ";
  //   }
  //   this.filesSelected = foo;
  // }

  back() {
    this.searchResults = false;
  }

  backToSearch(){
    this.helpTicketSelected = false;
  }

  // _setUpValidation() {
  //   this.validation.addRule("00", "curriculumTitle", [{ "rule": "required", "message": "Curriculum Title is required" }]);
  //   this.validation.addRule("00", "client", [{
  //     "rule": "required", "message": "You must select a client",
  //     "valFunction": function (context) {
  //       return (context.helpTicket.clientId !== undefined);
  //     }
  //   }]);
  //   this.validation.addRule("01", "resetPasswordUserIDs", [{ "rule": "required", "message": "You must enter the passwords to reset" }]);
  //   this.validation.addRule("01", "client", [{
  //     "rule": "required", "message": "You must enter the passwords to reset",
  //     "valFunction": function (context) {
  //       return (context.helpTicket.clientId !== undefined);
  //     }
  //   }]);
  //   this.validation.addRule("02", "application", [{
  //     "rule": "required", "message": "You must select the application",
  //     "valFunction": function (context) {
  //       return (context.content.application !== undefined);
  //     }
  //   }]);
  //   this.validation.addRule("9", "owner", [{
  //     "rule": "required", "message": "You are already the owner",
  //     "valFunction": function (context) {
  //       return (context.helpTickets.selectedHelpTicket.owner[0].personId !== context.app.user._id);
  //     }
  //   }]);
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

  _cleanUpFilters() {
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
