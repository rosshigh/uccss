import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";
import {DataTable} from '../../../resources/utils/dataTable';
import {Sessions} from '../../../resources/data/sessions';
import {Systems} from '../../../resources/data/systems';
import {Products} from '../../../resources/data/products';
import {ClientRequests} from '../../../resources/data/clientRequests';
import {AppConfig} from '../../../config/appConfig';
import {Utils} from '../../../resources/utils/utils';
import {People} from '../../../resources/data/people';
import Validation from '../../../resources/utils/validation';


import moment from 'moment';
import $ from 'jquery';

@inject(Router, AppConfig, Validation, People, DataTable, Utils, Sessions, Systems, Products, ClientRequests)
export class ViewRequests {
  requestSelected = false;
  showLockMessage = false;
  showRequests = false;

  navControl = "requestsNavButtons";
  spinnerHTML = "";
  commentsResponse = "";
  lockObject = new Object();

  constructor(router, config, validation, people, datatable, utils, sessions, systems, products, requests) {
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
  };;

  canActivate(){
    this.userObj = JSON.parse(sessionStorage.getItem('user'))
  }

  async activate() {
    $("#infoBox").fadeOut();
    $("#existingRequestInfo").fadeOut();
    let responses =  await Promise.all([
      this.sessions.getSessionsArray('?filter=[or]sessionStatus|Active:Requests&order=startDate',true ),
      this.people.getPeopleArray(),
      this.people.getCoursesArray(true, "?filter=personId|eq|" + this.userObj._id),
      this.products.getProductsArray('?filter=active|eq|true&order=Category'),
      this.systems.getSystemsArray(),
      this.config.getConfig() 
    ]);
    // this._setUpValidation();
  }

  detached(){
    this. _unLock();
  }

  async getRequests() {
    if (this.selectedSession && this.selectedCourse) {
      this._unLock();
      await this.requests.getPersonClientRequestsArray('?filter=[and]personId|eq|' + this.userObj._id + ':sessionId|eq|' + this.selectedSession + ':courseId|eq|' + this.selectedCourse, true);
      if (this.requests.requestsArray.length) {
        //Select the first request by default
        this.requests.selectRequest(0);
         await this._lock();
        //Update the display array
        this.updateArray();
        //Select the displayed session
        this.sessions.selectSessionById(this.selectedSession);
        //Set the date limits in the date controls
        this.setDates();
        //Save the request so we can check if it's dirty later'
        this.originalRequest = this.utils.copyObject(this.requests.selectedRequest);
        // this.dataTable.createPageButtons(1);
        this.selectedDetailIndex = 0;
        this.showRequests = true;
      } else {
        this.showRequests = false;
      }
     
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
      $("#infoBox").html("");
      $("#infoBox").append(this.config.VIEW_REQUEST_MESSAGE);
      $("#infoBox").fadeIn();
      this.dataTable.updateArray(this.requests.requestsArray[0].requestDetails);
  }

  setDates(){
    this.minStartDate = this.sessions.selectedSession.startDate;
    this.maxStartDate = this.sessions.selectedSession.endDate;
    this.minEndDate = this.sessions.selectedSession.startDate;
    this.maxEndDate = this.sessions.selectedSession.endDate;
  }

  async edit(product, el, index) { 
    this.selectedDetailIndex = index;
    this.requests.setSelectedRequestDetail(product);
    this.products.selectedProductFromId(this.requests.selectedRequestDetail.productId);
    this.selectedAssignmentIndex = 0;
    this.commentsResponse = this.requests.selectedRequest.comments;
    if(this.requests.selectedRequestDetail.assignments.length){
      this.systems.selectedSystemFromId(this.requests.selectedRequestDetail.assignments[this.selectedAssignmentIndex].systemId);
      this.showRequest = true;
    } else {
      this.showRequest = false;
    }
    
    if (this.selectedRow) this.selectedRow.children().removeClass('info');
    this.selectedRow = $(el.target).closest('tr');
    this.selectedRow.children().addClass('info')
  }

  async save() {
    if(!showLockMessage){
      this.requests.selectedRequest.comments = this.commentsResponse;
      if (this.validation.validate(1)) {
        if(this._buildRequest()){
          let serverResponse = await this.requests.saveRequest(this.config.SEND_EMAILS);
          if (!serverResponse.status) {
            this.utils.showNotification("The request was updated");
            this._cleanUp();
          }
        }
      this._cleanUp();
      }
    }
  }

  _buildRequest(){
    var changes = this.requests.isRequestDirty(this.originalRequest);
    if(changes.length){
      this.requests.selectedRequest.requestDetails[this.selectedDetailIndex].requestStatus = this.config.UPDATED_REQUEST_CODE;
      var personId = this.userObj._id
      changes.forEach((currentValue) => {
        this.requests.selectedRequest.audit.push({
          property: currentValue.property,
          oldValue: currentValue.oldValue,
          newValue: currentValue.newValue,
          personId: personId
        })
        
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
  }

  changeBeginDate(evt){
    this.minEndDate = moment(evt.detail.event.date).format("MM/DD/YYYY");
    this.requests.selectedRequest.endDate = moment.max(this.requests.selectedRequest.startDate, this.requests.selectedRequest.endDate);
  }

  async _lock(){
    var response = await this.requests.getRequestLock(this.requests.selectedRequest._id);
    if(!response.error){
      if(response.requestId === 0){
            //Lock help ticket
          this.requests.lockRequest({
            requestId: this.requests.selectedRequest._id,
            personId: this.userObj._id
          });
          this.showLockMessage = false;
          this.lockObject = {}; 
      } else {
          this.lockObject = response[0];
          this.showLockMessage = true;  
      }
    }
  }

   _unLock(){
    if(!this.showLockMessage){
      if(this.requests.selectedRequest._id){
         this.showLockMessage = false;
        this.requests.removeRequestLock(this.requests.selectedRequest._id);
      }    
    }
  }

}
