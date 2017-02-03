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

  _cleanUp() {
    this.enterResponse = false;
  }

  back() {
    this.searchResults = false;
  }

  backToSearch(){
    this.helpTicketSelected = false;
  }

  _cleanUpFilters() {
    $("#type").val("");
    $("#status").val("");
    $("#personStatus").val("");
  }

}
