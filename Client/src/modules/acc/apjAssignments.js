import { inject } from 'aurelia-framework';
import { Router } from "aurelia-router";
import { DataTable } from '../../resources/utils/dataTable';
import { Sessions } from '../../resources/data/sessions';
import { Products } from '../../resources/data/products';
import { SiteInfo } from '../../resources/data/siteInfo';
import { APJClientRequests } from '../../resources/data/apjClientRequests';
import { AppConfig } from '../../config/appConfig';
import { Utils } from '../../resources/utils/utils';
import { People } from '../../resources/data/people';
import { Systems } from '../../resources/data/systems';
import Validation from '../../resources/utils/validation';
import { CommonDialogs } from '../../resources/dialogs/common-dialogs';
import Flatpickr from 'flatpickr';
import { EventAggregator } from 'aurelia-event-aggregator';

import fuelux from 'fuelux';
import moment from 'moment';

@inject(Router, AppConfig, Validation, People, CommonDialogs, DataTable, Utils, Sessions, Products, Systems, APJClientRequests, SiteInfo, EventAggregator)
export class APJAssignments {

  constructor(router, config, validation, people, dialog, datatable, utils, sessions, products, systems, requests, siteInfo, ea) {
    this.router = router;
    this.config = config;
    this.validation = validation;
    this.validation.initialize(this);
    this.people = people;
    this.dataTable = datatable;
    this.dataTable.initialize(this);
    this.utils = utils;
    this.sessions = sessions;
    this.products = products;
    this.requests = requests;
    this.systems = systems;

    this.dialog = dialog;
    this.ea = ea;

    this.userObj = JSON.parse(sessionStorage.getItem('user'));
    // this.showTable = true;
    this.assignmentDetailIndex = 0;

  };

  async activate() {
    let responses = await Promise.all([
      this.products.getProductsArray('?filter=apj|eq|true&order=name', true),
      this.people.getInstitutionsArray('?filter=[and]institutionStatus|eq|01:apj|eq|true&order=name'),
      this.systems.getSystemsArray('?filter=apj|eq|true', true),
      this.people.getAPJPackages(),
      this.config.getConfig()
    ]);
    this.requestSelected = "table";

    $('#loading').hide();
    this.getRequests();
  }

  attached() {
    $('#loading').hide();
  }

  async getRequests() {
    this.isCheckedAssigned = true;
    await this.filterInAssigned();
    this.clearFilters();
  }

  async refresh() {
    $('#loading').show();
    await this.getRequests();
    $('#loading').hide();
    this.spinnerHTML = "";
  }

  async filterInAssigned() {

    this.requiredDateFilterValue = "";
    this.createdDateFilterValue = "";
    this.requestStatusFilter = "";
    this.productFilterValue = "";
    this.courseFilterValue = "";
    this.helpTicketTypeFilterValue = "";
    this.institutionFilterValue = "";
    if (this.isCheckedAssigned) {
      $('#loading').show();
      await this.requests.getClientRequestsDetailsArray('?filter=[in]requestStatus[list]' + this.config.UNASSIGNED_REQUEST_CODE + ':' + this.config.UPDATED_REQUEST_CODE + ':' + this.config.CUSTOMER_ACTION_REQUEST_CODE, true);
      $('#loading').hide();
      if (this.requests.requestsDetailsArray && this.requests.requestsDetailsArray.length) {
        this.noRequests = false;
        this.dataTable.updateArray(this.requests.requestsDetailsArray, 'requiredDate', -1);
      } else {
        this.noRequests = true;
        this.dataTable.displayArray = new Array();
      }
    } else {
      $('#loading').show();
      await this.requests.getClientRequestsDetailsArray('', true);
      $('#loading').hide();
      this.dataTable.updateArray(this.requests.requestsDetailsArray, 'requiredDate', -1);
      if (this.requests.requestsDetailsArray.length) this.noRequests = false;
    }

  }

  async clearFilters() {
    this.requiredDateFilterValue = "";
    this.createdDateFilterValue = "";
    this.requestStatusFilter = "";
    this.productFilterValue = "";
    this.courseFilterValue = "";
    this.helpTicketTypeFilterValue = "";
    this.institutionFilterValue = "";
    this.dataTable.updateArray(this.requests.requestsDetailsArray);
  }

  async selectARequest(index, request) {
    this.editIndex = index;
    let response = await this.requests.getRequestDetail(request._id);
    if (!response.error) {
      this.selectedRequestDetail = response;
      this.products.selectedProductFromId(this.selectedRequestDetail.productId._id);
      if(!this.selectedRequestDetail.techComments || !this.selectedRequestDetail.techComments.length){
        this.selectedRequestDetail.techComments = this.products.selectedProduct.productInfoApj ? this.products.selectedProduct.productInfoApj : "";
      }
      if (this.selectedRequestDetail.assignments && this.selectedRequestDetail.assignments.length > 0) this.systems.selectedSystemFromId(this.selectedRequestDetail.assignments[0].systemId);
      await this.getProductSystems();
      this.requestSelected = 'form';
    }
  }

  async viewAssignment(index, request) {
    this.editIndex = index;
    let response = await this.requests.getRequestDetail(request._id);
    if (!response.error) {
      this.selectedRequestDetail = response;
      this.products.selectedProductFromId(this.selectedRequestDetail.productId._id);
      if (this.selectedRequestDetail.assignments && this.selectedRequestDetail.assignments.length > 0) this.systems.selectedSystemFromId(this.selectedRequestDetail.assignments[0].systemId);
      await this.getProductSystems();
      this.requestSelected = 'view';
    }

  }

  async getProductSystems() {
    this.systemConfigured = false;
    this.productSystems = new Array();
    var productSystemsSIDs = "";
    this.products.selectedProduct.systems.forEach(item => {
      let delimiterChar = productSystemsSIDs.length ? ":" : "";
      productSystemsSIDs += delimiterChar + item.sid;
    });
    let response = await this.systems.getAPJConfiguredProductSystems(productSystemsSIDs);
    if (!response.error) {
      response.forEach(item => {
        if (item.active) this.productSystems.push(item);
      });
    }
    if (this.productSystems != null && this.productSystems.length) {
      this.systemConfigured = true;
      this.productSystems = this.productSystems.sort((a, b) => {
        return (a['sid'] < b['sid']) ? -1 : (a['sid'] > b['sid']) ? 1 : 0;
      });
      this.selectedSystem = this.productSystems[0];
      this.clientsConfigured = true;
    }
  }

  selectClient(index, client) {
    this.selectedClientIndex = index;
    for (let k = 0; k < this.selectedRequestDetail.assignments.length; k++) {
      if (this.selectedRequestDetail.assignments[k].client == client.client) return;
    }

    this.selectedRequestDetail.assignments.push({
      staffId: this.userObj._id,
      client: client.client,
      systemId: client.systemId

    });
    // this.selectedRequestDetail.techComments = this.products.selectedProduct.productInfo ? this.products.selectedProduct.productInfo : "";
    this.assignClientStatus();
    this.insertAssignmentIntoSystem(client, this.selectedRequestDetail.assignments)

  }

  insertAssignmentIntoSystem(client, details) {
    let clientCopy = this.utils.copyObject(client);

    clientCopy.assignments.push({
      assignment: this.selectedRequestDetail._id,
      studentIDRange: details.studentUserIds,
      facultyIDRange: details.facultyUserIds,
      institutionId: this.selectedRequestDetail.requestId.institutionId,
      provisional: true
    });
    this.updateProductSystemsClient(clientCopy, clientCopy.systemId)
  }

  updateProductSystemsClient(client) {
    this.selectedSystem.clients[this.selectedClientIndex].assignments = client.assignments;
    this.clientSelectedIndex = client.assignments.length - 1;
  }

  assignClientStatus() {
    if (this.selectedSystem.clients[this.selectedClientIndex].clientStatus !== this.config.SANDBOX_CLIENT_CODE) {
      if (this.selectedSystem.clients[this.selectedClientIndex].assignments && this.selectedSystem.clients[this.selectedClientIndex].assignments.length === 0) {
        this.selectedSystem.clients[this.selectedClientIndex].clientStatus = this.config.UNASSIGNED_CLIENT_CODE;
      } else if (this.selectedSystem.clients[this.selectedClientIndex].assignments.length === 1) {
        this.selectedSystem.clients[this.selectedClientIndex].clientStatus = this.config.ASSIGNED_CLIENT_CODE;
      } else {
        this.selectedSystem.clients[this.selectedClientIndex].clientStatus = this.config.SHARED_CLIENT_CODE;
      }
    }
  }

  /*****************************************************************************************************
* The user selects an assignment 
* index - the index of the selected assignment
* el - the event object
****************************************************************************************************/
  selectProposedClient(index, el) {
    //Save the index 
    this.assignmentDetailIndex = index;
    this.setClientIndex(this.selectedRequestDetail.assignments[this.assignmentDetailIndex].client);
    this.setClientAssignmentIndex(this.selectedSystem.clients[this.selectedClientIndex]);

    if (this.assignmentDetailIndex == -1) {
      this.selectedAssignedClient = "";
      if (this.selectedRow) this.selectedRow.children().removeClass('info');
    } else {
      this.selectedAssignedClient = this.selectedRequestDetail.assignments[this.assignmentDetailIndex].client;

      //Update the firstID and lastID fileds with the assignment firstID and lastID
      // this.firstID = this.selectedRequestDetail.assignments[this.assignmentDetailIndex].firstID;
      // this.lastID = this.selectedRequestDetail.assignments[this.assignmentDetailIndex].lastID;
      // this.selectedSystem.clients[this.selectedClientIndex].lastIdAssigned = this.lastID;
      // this.productSystems[this.selectedSystemIndex].clients[this.selectedClientIndex].lastIdAssigned = this.lastID;
      // this.firstNumericFacID = this.selectedRequestDetail.assignments[this.assignmentDetailIndex].firstFacID;
      // this.lastNumericFacID = this.selectedRequestDetail.assignments[this.assignmentDetailIndex].lastFacID;
      // this.selectedSystem.clients[this.selectedClientIndex].lastFacIdAssigned = this.selectedRequestDetail.assignments[this.assignmentDetailIndex].lastFacID;

      // this.productSystems[this.selectedSystemIndex].clients[this.selectedClientIndex].lastFacIdAssigned = this.selectedRequestDetail.assignments[this.assignmentDetailIndex].lastFacID;
      // this.oldIdsAssigned = parseInt(this.lastID) - parseInt(this.lastID);
      // this.oldLastID = this.lastID;
      // this.lastFirstID = this.firstID;
      // this.forceManual = this.selectedSystem.clients[this.selectedClientIndex].manual;
      // this.manualMode = this.selectedSystem.clients[this.selectedClientIndex].manual;

      //Highlight the table row
      if (this.selectedAssignmentRow) this.selectedAssignmentRow.children().removeClass('info');
      this.selectedAssignmentRow = $(el.target).closest('tr');
      this.selectedAssignmentRow.children().addClass('info')
    }

  }

  /*****************************************************************************************************
    * Save the request 
    ****************************************************************************************************/
  async save() {
    if (this._buildRequest()) {
      this.requests.setSelectedRequest(this.requestToSave);
      let serverResponse = await this.requests.assignRequest(this.editIndex);
      if (!serverResponse.status) {
        this.utils.showNotification("The request was updated");
        this._cleanUp();
        this.dataTable.updateArrayMaintainFilters(this.requests.requestsDetailsArray);
        this.reSort();
        await this.filterInAssigned();
        this._cleanUp();
      }
    }
  }

  _cleanUp() {
    this.selectedRequestDetail.assignments = [];
    this.selectedSystem = {};
    this.requestSelected = "table";
    // this.showTable = true;
  }

  reSort() {
    this.dataTable.sortArray({}, {}, true);
  }

  systemSelected() {
    this.selectProductSystem(this.selectedSystemId)
  }

  selectProductSystem(id) {
    this.selectedSystemId = id;
    this.productSystems.forEach((item, index) => {
      if (item._id === id) {
        this.selectedSystem = item;
        this.selectedSystemIndex = index;
      }
    });
    this.checkClientConfigured();
  }

  checkClientConfigured() {
    this.clientsConfigured = false;
    for (let i = 0; i < this.selectedSystem.clients.length; i++) {
      if (this.selectedSystem.clients[i].productId === this.products.selectedProduct._id) {
        this.clientsConfigured = true;
        break;
      }
    }
  }

  /*****************************************************************************************************
  * Build the data objects to send to the server 
  ****************************************************************************************************/
  _buildRequest() {
    this.productSystems.forEach(system => {
      system.clients.forEach(client => {
        client.assignments.forEach(assignment => {
          assignment.provisional = false;
        });
      });
    });
    this.systemQueue = new Array();
    this.selectedRequestDetail.assignments.forEach((item, index) => {
      let saveSystem = true;
      this.systemQueue.forEach(system => {
        if (item.systemId === system._id) saveSystem = false;
      })
      if (saveSystem) this.systemQueue.push(this._getSystem(item.systemId));
      delete item['provisional'];

      item.assignedDate = item.assignedDate ? item.assignedDate : new Date();
    });

    this.systemQueue.forEach(server => {
      server.clients.forEach(client => {
        client.assignments.forEach(assignment => {
          assignment.assignment = assignment.assignment != null && assignment.assignment._id ? assignment.assignment._id : assignment.assignment;
        })
      })
    });

    this.selectedRequestDetail.requestStatus = this.selectedRequestDetail.assignments && this.selectedRequestDetail.assignments.length > 0 ? this.config.ASSIGNED_REQUEST_CODE : this.config.UNASSIGNED_REQUEST_CODE;
    this.requestToSave = this.utils.copyObject(this.selectedRequestDetail.requestId);
    this.requestToSave.requestDetailsToSave = new Array();
    var request = this.utils.copyObject(this.selectedRequestDetail);
    delete request['requestId'];
    this.requestToSave.requestDetailsToSave.push(request);
    this.requestToSave.systemsToSave = this.systemQueue;

    return true;
  }

  _getSystem(id) {
    for (let k = 0; k < this.productSystems.length; k++) {
      if (this.productSystems[k]._id === id) return this.productSystems[k];
    }
    return null;
  }

  updateClientAssignments() {
    if (this.selectedClientIndex) {
      this.selectedSystem.clients[this.selectedClientIndex].studentIDRange = this.selectedRequestDetail.assignments[this.assignmentDetailIndex].studentUserIds;
      this.selectedSystem.clients[this.selectedClientIndex].studentPassword = this.selectedRequestDetail.assignments[this.assignmentDetailIndex].studentPassword;
      this.selectedSystem.clients[this.selectedClientIndex].facultyIDRange = this.selectedRequestDetail.assignments[this.assignmentDetailIndex].facultyIDRange;
      this.selectedSystem.clients[this.selectedClientIndex].facultyPassword = this.selectedRequestDetail.assignments[this.assignmentDetailIndex].facultyPassword;
    }
  }

  back() {
    // this.showTable = true;
    this.requestSelected = "table";
  }

  backView() {
    this.requestSelected = "table";
  }

  deleteTable(assignment) {
    this.setAssignmentIndex(assignment.client);
    this.setClientIndex(assignment.client);
    this.setClientAssignmentIndex(this.selectedSystem.clients[this.selectedClientIndex]);
    this.deleteProposedClient(assignment);
  }

  findSystemClient(assignment) {
    this.selectedClientIndex = null;
    this.selectedSystem.clients.forEach((item, index) => {
      if (item.client == assignment.client) {
        this.selectedClientIndex = index;
      }
    });
  }

  //Find index of assignment in request detail
  setAssignmentIndex(client) {
    for (let k = 0; k < this.selectedRequestDetail.assignments.length; k++) {
      if (this.selectedRequestDetail.assignments[k].client == client) {
        this.assignmentDetailIndex = k;
        return;
      }
    }
  }

  //Find index of client in selected system
  setClientIndex(client) {
    for (let k = 0; k < this.selectedSystem.clients.length; k++) {
      if (this.selectedSystem.clients[k].client == client) {
        this.selectedClientIndex = k;
        return;
      }
    }
  }

  setClientAssignmentIndex(client) {
    for (let k = 0; k < client.assignments.length; k++) {
      if (client.assignments[k].assignment._id) {
        if (client.assignments[k].assignment._id === this.selectedRequestDetail._id) {
          this.clientSelectedIndex = k;
          return;
        }
      } else if (client.assignments[k].assignment === this.selectedRequestDetail._id) {
        this.clientSelectedIndex = k;
        return;
      }

    }
  }

  /*****************************************************************************************************
  * The user deletes an assignment 
  * index - the index of the selected assignment
  ****************************************************************************************************/
  async deleteProposedClient() {
    //Is this a saved assignment
    if (this.selectedRequestDetail.assignments[this.assignmentDetailIndex].assignedDate) {
      return this.dialog.showMessage(
        "This will delete the assignment.  Are you sure you want to do that?",
        "Delete Assignment",
        ['Yes', 'No']
      ).whenClosed(response => {
        if (!response.wasCancelled) {
          this.deleteSaved(this.assignmentDetailIndex);
        }
      });
    } else {
      // if (this.forceManual) this.manualMode = false;
      // this.forceManual = false;
      //Undo the changes made by the assignment
      // this.idsRemaining = parseInt(this.idsRemaining) + parseInt(this.selectedRequestDetail.assignments[this.assignmentDetailIndex].idsAssigned);
      // this.selectedSystem.clients[this.selectedClientIndex].idsAvailable = parseInt(this.selectedSystem.clients[this.selectedClientIndex].idsAvailable) + parseInt(this.selectedRequestDetail.assignments[this.assignmentDetailIndex].idsAssigned);
      // this.totalIdsAssigned = parseInt(this.totalIdsAssigned) - parseInt(this.selectedRequestDetail.assignments[this.assignmentDetailIndex].idsAssigned);

      //Delete the assignment and the client
      this.deleteProvisinoalClientAssignment();
      this.assignClientStatus()
      this.assignmentDetailIndex = -1;
      if (this.selectedRow) this.selectedRow.children().removeClass('info');
    }
  }


  deleteProvisinoalClientAssignment() {
    this.setClientIndex(this.selectedRequestDetail.assignments[this.assignmentDetailIndex].client);
    // this.productSystems[this.selectedSystemIndex].clients[this.selectedClientIndex].assignments.splice(this.clientSelectedIndex, 1);
    this.selectedSystem.clients[this.selectedClientIndex].assignments.splice(this.clientSelectedIndex, 1);
    this.selectedRequestDetail.assignments.splice(this.assignmentDetailIndex, 1);
  }

  assignClientStatus() {
    if (this.selectedSystem.clients[this.selectedClientIndex].clientStatus !== this.config.SANDBOX_CLIENT_CODE) {
      if (this.selectedSystem.clients[this.selectedClientIndex].assignments && this.selectedSystem.clients[this.selectedClientIndex].assignments.length === 0) {
        this.selectedSystem.clients[this.selectedClientIndex].clientStatus = this.config.UNASSIGNED_CLIENT_CODE;
        // this.productSystems[this.selectedSystemIndex].clients[this.selectedClientIndex].clientStatus = this.config.UNASSIGNED_CLIENT_CODE;
      } else if (this.selectedSystem.clients[this.selectedClientIndex].assignments.length === 1) {
        this.selectedSystem.clients[this.selectedClientIndex].clientStatus = this.config.ASSIGNED_CLIENT_CODE;
        // this.productSystems[this.selectedSystemIndex].clients[this.selectedClientIndex].clientStatus = this.config.ASSIGNED_CLIENT_CODE;
      } else {
        this.selectedSystem.clients[this.selectedClientIndex].clientStatus = this.config.SHARED_CLIENT_CODE;
        // this.productSystems[this.selectedSystemIndex].clients[this.selectedClientIndex].clientStatus = this.config.SHARED_CLIENT_CODE;
      }
    }
  }

  institutionCustomFilter(value, item, context) {
    return item.requestId && item.requestId.institutionId && item.requestId.institutionId.name.toUpperCase().indexOf(value.toUpperCase()) > -1;
  }

  customInstitutionsSorter(sortProperty, sortDirection, sortArray, context) {
    this.sortProperty = 'institution';
    this.sortDirection = sortDirection;
    return sortArray.sort((a, b) => {
      if (a['requestId'] !== null && b['requestId'] !== null && a['requestId']['institutionId'] && b['requestId']['institutionId']) {
        var result = (a['requestId']['institutionId']['name'] < b['requestId']['institutionId']['name']) ? -1 : (a['requestId']['institutionId']['name'] > b['requestId']['institutionId']['name']) ? 1 : 0;
      } else {
        var result = -1;
      }
      return result * sortDirection;
    });
  }

  customProductNameFilter(value, item, context) {
    return item.productId.name.toUpperCase().indexOf(value.toUpperCase()) > -1;
  }

}
