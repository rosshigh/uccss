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

import moment from 'moment';

@inject(Router, AppConfig, Validation, People, DataTable, Utils, HelpTickets, Sessions, Downloads, Products, CommonDialogs)
export class ArchiveHelpTickets {
  searchResults = false;
  helpTicketSelected = false;
  showPanel = false;
  showCustomer = false;
  showInstituion = false;
  colSpan = 10;

  navControl = "supportNavButtons";
  spinnerHTML = "";
  helpTicketNo = "";
  dateFrom;
  dateTo;
  selectedProducts = new Array();
  selectedPeople = new Array();
  selectedInstitutions = new Array();

  constructor(router, config, validation, people, datatable, utils, helpTickets, sessions, apps, products, dialogs) {
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
    this.dialogs = dialogs;

    this.userObj = JSON.parse(sessionStorage.getItem('user'));
    this.isUCC = this.userObj.userRole >= this.config.UCC_ROLE;
  };

  async activate() {

  }

  async attached() {
    $("#loading").hide();
    let responses = await Promise.all([
      this.helpTickets.getHelpTicketTypes('?order=category'),
      this.sessions.getSessionsArray('?order=startDate', true),
      this.products.getProductsArray('?order=name'),
      this.people.getInstitutionsArray('?order=name'),
      this.people.getPeopleArray('?order=lastName'),
      this.config.getConfig()
    ]);
    this.filterList();
    this.filterPeopleList();
    this.filterInstitutionsList();
    $("#helpTicketStatus").val(this.config.NEW_HELPTICKET_STATUS).change();
    this.dateFrom = "";
    this.dateTo = "";
    this.toolTips();
    // this.selectedStatus = "99";
  }

  toolTips() {
    $('[data-toggle="tooltip"]').tooltip();
    document.body.scrollTop = document.documentElement.scrollTop = 0;
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

    if (this.selectedStatus) {
      if(this.selectedStatus == this.config.MY_HELPTICKET_STATUS){
        this.searchObj.owner = this.userObj._id;
      } else {
        this.searchObj.status = this.selectedStatus;
      }
    }

    if (this.keyWords) {
      this.searchObj.keyWords = this.keyWords;
    }

    if (this.content) {
      this.searchObj.content = this.content;
    }

    if (this.selectedType != -1) {
      this.searchObj.helpTicketType = this.selectedType;
    }

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
    let searchCollection = this.isCheckedCurrent ? 'current' : 'archive';
    this.buildSearchCriteria();
    this.resultArray = await this.helpTickets.archiveSearch(this.searchObj, searchCollection);
    this.helpTicketSelected = true;
    this.dataTable.updateArray(this.resultArray);
    setTimeout(this.toolTips(), 3000);
    $("#loading").hide();
  }

  helpTicketNoEntered() {
    if (this.helpTicketNo.length > 0) {
      $('#elementsToOperateOn :input').attr('disabled', true);
    } else {
      $('#elementsToOperateOn :input').removeAttr('disabled');
    }
  }

  async typeChanged(type) {
    this.helpTickets.helpTicketTypesArray.forEach(item => {
      item.subtypes.forEach(item2 => {
        if (item2.type === this.selectedType) {
          this.selectedSubType = item2;
        }
      })
    })
    var index = parseInt(this.selectedType) - 1;
    if (this.selectedSubType.appsRequired) {
      await this.apps.getDownloadsArray(true, '?fields=helpTicketRelevant|eq|true&order=name');
    } else {
      await this.products.getProductsArray('?fields=_id name');
    }
  }

  _hideTypes() {
    for (var i = 0; i < this.config.HELP_TICKET_TYPES.length; i++) {
      this.config.HELP_TICKET_TYPES[i].show = false;
    }
  }

  filterList() {
    if (this.filter) {
      var thisFilter = this.filter
      this.filteredProductsArray = this.products.productsArray.filter((item) => {
        return item.name.toUpperCase().indexOf(thisFilter.toUpperCase()) != -1;
      });
    } else {
      this.filteredProductsArray = this.products.productsArray;
    }
  }

  selectProduct(el) {
    $("#requestProductsLabel").html("Requested Products");
    this.selectedProducts.push(el.target.id);
  }

  removeProduct(el) {
    this.selectedProducts.splice(this.selectedProducts.indexOf(el.target.id), 1);
  }

  async save(changes) {
    changes = changes ? changes : this.helpTickets.isHelpTicketDirty(this.oroginalHelpTicket, ["requestId", "courseId", "personId", "institutionId"]);
    if (changes && changes.length > 0) {
      changes.forEach(item => {
        this.helpTickets.selectedHelpTicket.audit.push({
          property: item.property,
          oldValue: item.oldValue,
          newValue: item.newValue,
          eventDate: new Date(),
          personId: this.userObj._id
        })
      })
    }
    var email = {};
    let serverResponse = await this.helpTickets.saveHelpTicket(email);
    if (!serverResponse.error) {
      this.dataTable.updateArray(this.helpTickets.helpTicketsArray);
      this.utils.showNotification("The help ticket was updated");
    }
    this._cleanUp();
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
    $("#requestProductsLabel").html("Requested Person");
    this.selectedPeople.push(person._id);
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

  selectInstitution(el) {
    this.selectedInstitutions.push(el.target.id);
  }

  removeInstitution(el) {
    this.selectedInstitutions.splice(this.selectedInstitutions.indexOf(el.target.id), 1);
  }

  clearCriteria() {
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
    this.helpTickets.setHelpTicket(helpTicket);
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

  backToSearch() {
    this.helpTicketSelected = false;
  }

  _cleanUpFilters() {
    $("#type").val("");
    $("#status").val("");
    $("#personStatus").val("");
  }

  toggleProduct() {
    this.showPanel = !this.showPanel;
  }

  toggleCustomer() {
    this.showCustomer = !this.showCustomer;
  }

  toggleInstitution() {
    this.showInstitution = !this.showInstitution;
  }

  async openHelpTicket(helpTicket) {
    $("#loading").show();
    this.helpTickets.setHelpTicket(helpTicket);
    var obj = {
      property: "helpTicketStatus",
      oldValue: this.helpTickets.selectedHelpTicket.helpTicketStatus,
      newValue: this.config.REVIEW_HELPTICKET_STATUS,
      personId: this.userObj._id,
      date: new Date
    }
    this.helpTickets.selectedHelpTicket.audit.push(obj);
    this.helpTickets.selectHelpTicketContent();
    this.responseMessage = "Help Ticket reopened by " + this.userObj.fullName
    this._createResponse();
    this.helpTickets.selectedHelpTicket.helpTicketStatus = this.config.REVIEW_HELPTICKET_STATUS;
    let serverResponse = await this.helpTickets.reopenHelpTicket();
    if (!serverResponse.error) {
      this.utils.showNotification("The help ticket was updated");
    }
    $("#loading").hide();
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

  async archiveClosedTickets() {
    $("#loading").show();
    var closedHelpTickets = 0;
    let response = await this.helpTickets.countHelpTicketsStatus(this.config.CLOSED_HELPTICKET_STATUS);
    if (!response.error) closedHelpTickets = response.count;
    if (closedHelpTickets) {
      return this.dialogs.showMessage(
        "This will archive " + closedHelpTickets + " closed help tickets.  Are you sure you want to do that?",
        "Archive Help Tickets",
        ['Yes', 'No']
      ).whenClosed(response => {
        if (!response.wasCancelled) {
          this.archiveTickets();
        }
      });
    } else {
      this.utils.showNotification('There are currently no closed help tickets in the active help ticket collection.');
    }
    $("#loading").hide();
  }

  async archiveTickets() {
    let response = await this.helpTickets.archiveHelpTickets();
    if (!response.error) {
      this.utils.showNotification(response.number + ' Help Tickets were archived successfully')
    }
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

  customHelpTicketTypeFilter(value, item, context) {
    var foo = value.toUpperCase();
    for (let i = 0; i < context.helpTickets.helpTicketTypesArray.length; i++) {
      for (let j = 0; j < context.helpTickets.helpTicketTypesArray[i].subtypes.length; j++) {
        if (context.helpTickets.helpTicketTypesArray[i].subtypes[j].type == item.helpTicketType) {
          return context.helpTickets.helpTicketTypesArray[i].subtypes[j].description.toUpperCase().indexOf(foo) > -1;
        }
      }
    }
    return false
  }

  customOwnerFilter(value, item, context) {
    if (item.owner[0].personId === null) return false;
    return item.owner[0].personId.fullName.toUpperCase().indexOf(value.toUpperCase()) > -1;
  }

  customNameFilter(value, item, context) {
    return item.personId.fullName.toUpperCase().indexOf(value.toUpperCase()) > -1;
  }

  institutionCustomFilter(value, item, context) {
    return item.institutionId.name.toUpperCase().indexOf(value.toUpperCase()) > -1;
  }

  customOwnerSorter(sortProperty, sortDirection, sortArray, context) {
    context.sortDirection = context.sortDirection === null ? 1 : context.sortDirection === 1 ? -1 : 1;
    return sortArray.sort((a, b) => {
      if (a.owner[0].personId === null && b.owner[0].personId === null) return 0;
      if (a.owner[0].personId === null && b.owner[0].personId !== null) return context.sortDirection * -1;
      if (a.owner[0].personId !== null && b.owner[0].personId === null) return context.sortDirection;
      var result = (a.owner[0].personId.lastName < b.owner[0].personId.lastName) ? -1 : (a.owner[0].personId.lastName > b.owner[0].personId.lastName) ? 1 : 0;
      return result * context.sortDirection;
    })
  }

  changeMe() {
    console.log(this.selectedStatus);
  }
}
