import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";

import {DialogService} from 'aurelia-dialog';

import {DataTable} from '../../../resources/utils/dataTable';
import {Sessions} from '../../../resources/data/sessions';
import {Systems} from '../../../resources/data/systems';
import {Products} from '../../../resources/data/products';
import {ClientRequests} from '../../../resources/data/clientRequests';
import {AppConfig} from '../../../config/appConfig';
import {Utils} from '../../../resources/utils/utils';
import {People} from '../../../resources/data/people';
import {AppState} from '../../../resources/data/appState';
import Validation from '../../../resources/utils/validation';
import {ConfirmDialog} from '../../../resources/elements/confirm-dialog';

import moment from 'moment';
import $ from 'jquery';

@inject(Router, AppConfig, Validation, People, AppState, DialogService, DataTable, Utils, Sessions, Systems, Products, ClientRequests)
export class ViewHelpTickets {
  requestSelected = false;

  navControl = "requestsNavButtons";
  spinnerHTML = "";

  constructor(router, config, validation, people, app, dialog, datatable, utils, sessions, systems, products, requests) {
    this.router = router;
    this.config = config;
    this.validation = validation;
    this.app = app;
    this.people = people;
    this.dataTable = datatable;
    this.dataTable.initialize(this);
    this.utils = utils;
    this.sessions = sessions;
    this.products = products;
    this.requests = requests;
    this.systems = systems;
  };

  activate() {
    $("#infoBox").fadeOut();
    $("#existingRequestInfo").fadeOut();
    this.getData();
    // this._setUpValidation();
  }

  async getData() {
    let responses =  await Promise.all([
      this.sessions.getSessionsArray(true, '?filter=[or]sessionStatus|Active:Requests&order=startDate' ),
      this.people.getMyCourses(true, "?filter=personId|eq|" + this.app.user._id),
      this.products.getProductsArray(true, '?filter=active|eq|true&order=Category'),
      this.systems.getSystemsArray(true)
    ]);
  }

  async getRequests() {
    if (this.selectedSession && this.selectedCourse) {
      await this.requests.getPersonClientRequestsArray(true, '?filter=[and]personId|eq|' + this.app.user._id + ':sessionId|eq|' + this.selectedSession + ':courseId|eq|' + this.selectedCourse);
      if (this.requests.requestsArray.length) this.requests.selectRequest(0);
      this.updateArray();
      this.utils.formatDateForDatesPicker(this.requests.selectedRequest);
      
      this.originalRequest = this.utils.copyObject(this.requests.selectedRequest);
      
      this.dataTable.createPageButtons(1);
      this.selectedDetailIndex = 0;
    } else {
      this.displayArray = new Array();
    }
  }

  async refresh() {
    this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
    await this.getRequests();
    this.spinnerHTML = "";
  }

  updateArray() {
    if (this.requests.requestsArray && this.requests.requestsArray.length) {
      $("#infoBox").html("");
      $("#infoBox").append(this.config.VIEW_REQUEST_MESSAGE);
      $("#infoBox").fadeIn();
      this.displayArray = this.requests.requestsArray[0].requestDetails;
      this.baseArray = this.displayArray;
      for (var i = 0; i < this.baseArray.length; i++) {
        this.baseArray[i].originalIndex = i;
      }
    } else {
      this.displayArray = new Array();
    }
  }

  edit(product, el, index) {
   
    this.selectedDetailIndex = index;
    this.requests.setSelectedRequestDetail(product);
    this.products.selectedProductFromId(this.requests.selectedRequestDetail.productId);
    this.selectedAssignmentIndex = 0;
    if(this.requests.selectedRequestDetail.assignments.length){
      this.systems.selectedSystemFromId(this.requests.selectedRequestDetail.assignments[this.selectedAssignmentIndex].systemId);
      this.showRequest = true;
    } else {
      this.showRequest = false;
    }
    this.changeBeginDate();
    
    if (this.selectedRow) this.selectedRow.children().removeClass('info');
    this.selectedRow = $(el.target).closest('tr');
    this.selectedRow.children().addClass('info')
  }

  async save() {
    if (this.validation.validate(1, this)) {
      if(this._buildRequest()){
        let serverResponse = await this.requests.saveRequest();
        if (!serverResponse.status) {
          this.utils.showNotification("The request was updated", "", "", "", "", 5);
          this._cleanUp();
        }
      }
    this._cleanUp();
    }
  }

  _buildRequest(){
    var changes = this.requests.isRequestDirty(this.originalRequest);
    if(changes.length){
      // this.requests.selectedRequest.requestDetails[this.selectedDetailIndex] = this.requests.setSelectedRequestDetail;
      this.requests.selectedRequest.requestDetails[this.selectedDetailIndex].requestStatus = this.config.UPDATED_REQUEST_CODE;
      // var that = this;
      var personId = this.app.user._id
      changes.forEach((currentValue) => {
        this.requests.selectedRequest.audit.push({
          property: currentValue.property,
          oldValue: currentValue.oldValue,
          newValue: currentValue.newValue,
          personId: personId
        })
        
        // if((currentValue.property == "addUndergraduates" || currentValue.property == "addGraduates") && that.requests.selectedRequest.courseId !== that.config.SANDBOX_ID){
        //   if(currentValue.property == "addUndergraduates")  that.requests.selectedRequest.studentIdsRequested += parseInt(that.requests.selectedRequest.addUndergraduates);

        //   if(currentValue.property == "addGraduates")  that.requests.selectedRequest.studentIdsRequested += parseInt(that.requests.selectedRequest.addGraduates);

        //   that.requests.selectedRequest.studentIdsRequested -= parseInt(currentValue.oldValue);
        // }
      });
      
      this.requests.selectedRequest.requestDetailsToSave = new Array();
      this.requests.selectedRequest.requestDetailsToSave = this.requests.selectedRequest.requestDetails;
      this.requests.selectedRequest.requestDetails = new Array();
      this.requests.selectedRequest.requestDetailsToSave.forEach((item) => {
          this.requests.selectedRequest.requestDetails.push(item._id);
      });
        
      return true;
    }
    return false;
  }

  _cleanUp(){

  }

  selectAssignment(assign, index){
    this.selectedAssignmentIndex = index;
    this.systems.selectedSystemFromId(assign.systemId);
  }
  
  cancel(){
    this.requests.selectRequest(0);
    this.utils.formatDateForDatesPicker(this.requests.selectedRequest);
  }

  changeBeginDate(){
    $("#endDate").attr("min", $("#beginDate").val());
    this.requests.selectedRequest.endDate = moment.max(moment($("#beginDate").val()), moment($("#endDate").val()));
  }

  changeEndDate(){
    $("#beginDate").attr("max", $("#endDate").val());
    this.requests.selectedRequest.startDate = moment.min(moment($("#beginDate").val()), moment($("#endDate").val()));
  }

}
