import { inject, TemplatingEngine } from 'aurelia-framework';
import { HelpTickets } from '../../../resources/data/helpTickets';
import { Sessions } from '../../../resources/data/sessions';
import { Products } from '../../../resources/data/products';
import { AppConfig } from '../../..//appConfig';
import { Utils } from '../../../resources/utils/utils';
import { People } from '../../../resources/data/people';
import { Systems } from '../../../resources/data/systems';
import { Store } from '../../../store/store';

import moment from 'moment';

@inject(AppConfig, People, Utils, HelpTickets, Sessions, Products, Systems, Store, TemplatingEngine)
export class Archive {

  pageSize = 200;

  constructor(config, people, utils, helpTickets, sessions, products, systems, store, templatingEngine) {
    this.config = config;
    this.people = people;
    this.utils = utils;
    this.helpTickets = helpTickets;
    this.sessions = sessions;
    this.products = products;
    this.systems = systems;
    this.store = store;
    this.templatingEngine = templatingEngine;

    this.userObj = this.store.getUser('user');
  };

  async activate() {
    let responses = await Promise.all([
      this.products.getObjectsArray('?order=name'),
      this.people.getPeopleArray('?order=lastName'),
      this.people.getInstitutionArray('?order=name'),
      this.sessions.getObjectsArray('?order=startDate:DSC'),
      this.products.getSmallObjectsArray('?order=name')
    ]);

    this.filterList();
    this.filterPeopleList();
    this.filterInstitutionsList();
  }

  attached() {
    $("#loading").hide();
    this.toolTips();
  }

  toolTips() {
    $('[data-toggle="tooltip"]').tooltip();
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  selectProduct(el) {
    if (!this.selectedProducts) this.selectedProducts = [];
    $("#requestProductsLabel").html("Requested Products");
    this.products.selectedObjectFromId(el.target.id);
    this.selectedProducts.push(this.products.selectedObject);
  }

  removeProduct(el) {
    this.selectedProducts.splice(this.selectedProducts.indexOf(el.target.id), 1);
  }

  filterList() {
    if (this.filter) {
      var thisFilter = this.filter
      this.filteredProductsArray = this.products.objectsArray.filter((item) => {
        return item.name.toUpperCase().indexOf(thisFilter.toUpperCase()) != -1;
      });
    } else {
      this.filteredProductsArray = this.products.objectsArray;
    }
  }

  filterPeopleList() {
    if (this.peopleFilter) {
      var thisFilter = this.peopleFilter
      this.filteredPersonArray = this.people.peopleArray.filter((item) => {
        return item.fullName.toUpperCase().indexOf(thisFilter.toUpperCase()) != -1;
      });
    } else {
      this.filteredPersonArray = this.people.peopleArray;
    }
  }

  selectPerson(el, person) {
    if (!this.selectedPeople) this.selectedPeople = [];
    $("#requestProductsLabel").html("Requested Person");
    this.people.setSelectedPerson(person)
    this.selectedPeople.push(this.people.selectedPerson);
  }

  removePerson(el) {
    this.selectedPeople.splice(this.selectedPeople.indexOf(el.target.id), 1);
  }

  filterInstitutionsList() {
    if (this.institutionsFilter) {
      var thisFilter = this.institutionsFilter;
      this.filteredInstitutionArray = this.people.institutionsArray.filter((item) => {
        return item.name.toUpperCase().indexOf(thisFilter.toUpperCase()) != -1;
      });
    } else {
      this.filteredInstitutionArray = this.people.institutionsArray;
    }
  }

  selectInstitution(el, obj) {
    if (!this.selectedInstitutions) this.selectedInstitutions = [];
    this.people.setInstitution(obj);
    this.selectedInstitutions.push(this.people.selectedInstitution);
  }

  removeInstitution(el) {
    this.selectedInstitutions.splice(this.selectedInstitutions.indexOf(el.target.id), 1);
  }

  buildSearchCriteria() {
    this.searchObj = new Object();

    if (this.helpTicketNo) {
      this.searchObj.helpTicketNo = this.helpTicketNo;
    }

    if (this.dateFrom || this.dateTo) {
      this.searchObj.dateRange = {
        dateFrom: this.dateFrom,
        dateTo: this.dateTo
      };
    }

    // if (this.selectedStatus) {
    //   if(this.selectedStatus == this.config.MY_HELPTICKET_STATUS){
    //     this.searchObj.owner = this.userObj._id;
    //   } else {
    //     this.searchObj.status = this.selectedStatus;
    //   }
    // }

    if (this.keyWords) {
      this.searchObj.keyWords = this.keyWords;
    }

    if (this.content) {
      this.searchObj.content = this.content;
    }

    // if (this.selectedType != -1) {
    //   this.searchObj.helpTicketType = this.selectedType;
    // }

    if (this.selectedProducts && this.selectedProducts.length) {
      this.searchObj.productIds = this.selectedProducts;
    }

    if (this.selectedPeople && this.selectedPeople.length) {
      this.searchObj.peopleIds = this.selectedPeople;
    }

    if (this.selectedInstitutions && this.selectedInstitutions.length) {
      this.searchObj.institutionIds = this.selectedInstitutions;
    }

  }

  async search() {
    $("#loading").show();
    this.buildSearchCriteria();
    this.resultArray = await this.helpTickets.archiveSearch(this.searchObj);
    this.helpTicketSelected = true;
    this.searchResults = true;
    this.showTable = true;
    $("#loading").hide();
    setTimeout(this.toolTips(), 3000);
  }

  backToSearch(){
    this.searchResults = false;
  }

  async selectHelpTicket(helpTicket, el) {
    await this.helpTickets.getArchiveHelpTicket(helpTicket._id);
    if (this.helpTickets.selectedObject.content[0].content.systemId) {
      await this.systems.getObject(this.helpTickets.content.content.systemId);
    }
    this.showTable = false;
    this.showRequestDetails = true;
    this.viewHelpTicketsHeading = "Help Ticket " + this.helpTickets.selectedObject.helpTicketNo;
  }

  back(){
    this.showTable = true;
  }

}