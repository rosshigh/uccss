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
import {CommonDialogs} from '../../../resources/dialogs/common-dialogs';

import moment from 'moment';

@inject(Router, AppConfig, Validation, People, DataTable, Utils, Sessions, Systems, Products, ClientRequests, CommonDialogs)
export class ViewRequests {
  requestSelected = false;
  showLockMessage = false;
  showRequests = false;
  statusClass = ["", "unassigned", "assigned","","customer"];

  navControl = "requestsNavButtons";
  spinnerHTML = "";
  lockObject = new Object();

  constructor(router, config, validation, people, datatable, utils, sessions, systems, products, requests, dialogs) {
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
    this.dialogs = dialogs;

    this.userObj = JSON.parse(sessionStorage.getItem('user'))
  };

  async activate() {
    $("#infoBox").fadeOut();
    $("#existingRequestInfo").fadeOut(); 
    let responses =  await Promise.all([
      this.sessions.getSessionsArray('?filter=[or]sessionStatus|Active:Requests&order=startDate',true ),
      this.people.getCoursesArray(true, "?filter=personId|eq|" + this.userObj._id),
      this.products.getProductsArray('?filter=active|eq|true&order=Category'),
      this.systems.getSystemsArray(),
      this.config.getConfig() 
    ]);
    this.people.coursesArray.push({_id: this.config.SANDBOX_ID, name: this.config.SANDBOX_NAME});
  }

  deactivate(){
    this._unLock();
  }

  async getRequests() {
    if (this.selectedSession) {
          this.sessions.selectSessionById(this.selectedSession);
          await this.requests.getClientRequestsArray('?filter=[and]sessionId|eq|' + this.selectedSession + ':personId|eq|' + this.userObj._id, true);
          if(this.requests.requestsArray && this.requests.requestsArray.length){
              this.dataTable.updateArray(this.requests.requestsArray);
          } 
      } 
  }

  async refresh() {
    await this._unLock();
    this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
    await this.getRequests();
    this.spinnerHTML = "";
  }

  // setDates(){
  //   this.minStartDate = this.sessions.selectedSession.startDate;
  //   this.maxStartDate = this.sessions.selectedSession.endDate;
  //   this.minEndDate = this.sessions.selectedSession.startDate;
  //   this.maxEndDate = this.sessions.selectedSession.endDate;
  // }

  async edit(product, el, index) { 
    this.requestSelected = true;
    this.selectedDetailIndex = index;
    this.showDetails = true;
    this.requests.setSelectedRequestDetail(product);
    this.customerActionRequired = this.requests.selectedRequestDetail.requestStatus == this.config.CUSTOMER_ACTION_REQUEST_CODE;
    this.customerMessage = this.requests.selectedRequestDetail.customerMessage;
    this.requests.selectRequstById(product.requestId);
    this.sessions.selectSessionById(this.requests.selectedRequest.sessionId);
    this.products.selectedProductFromId(this.requests.selectedRequestDetail.productId);
    // this.setDates();
   
    if(this.requests.selectedRequestDetail.assignments.length){
      this.selectedAssignmentIndex = 0;
      this.systems.selectedSystemFromId(this.requests.selectedRequestDetail.assignments[this.selectedAssignmentIndex].systemId);
    }
    
    if (this.selectedRow) this.selectedRow.children().removeClass('info');
    this.selectedRow = $(el.target).closest('tr');
    this.selectedRow.children().addClass('info')
  }

  back(){
     this.requestSelected = false;
  }

  customerActionResponse(request, el){
    if(request.requestStatus == this.config.CUSTOMER_ACTION_REQUEST_CODE){
      this.requests.setSelectedRequest(request);
      this.showDetails = false;
      this.requestSelected = true;
      this.customerActionRequired = true;
      this.selectedDetailIndex = -1;
      this.customerMessage = request.customerMessage;

      if (this.selectedRow) this.selectedRow.children().removeClass('info');
      this.selectedRow = $(el.target).closest('tr');
      this.selectedRow.children().addClass('info')
    }
  }

  async save() {
    if(!this.showLockMessage){
        if(this._buildRequest()){
          let serverResponse = await this.requests.saveRequest(this.config.SEND_EMAILS);
          if (!serverResponse.error) {
            this.getRequests();
            this.utils.showNotification("The request was updated");
          }
      this._cleanUp();
      }
    } else {
      this.utils.showNotification("The request is locked and can't be saved");
    }
  }

  _buildRequest(){
    //Update the selected request to update
    this.requests.selectedRequest.requestDetails.forEach(item => {
      if(item.requestStatus != this.config.ASSIGNED_REQUEST_CODE) item.requestStatus = this.config.REPLIED_REQUEST_CODE;
      item.modifiedDate = new Date();
    });
    this.requests.selectedRequest.requestStatus = this.config.REPLIED_REQUEST_CODE;
    this.requests.selectedRequest.comments = '<div class="well">' + this.customerResponse + '</div><p>' + this.requests.selectedRequest.comments
    this.requests.selectedRequest.audit.push({
      property: "Replied to Message",
      newValue: this.customerResponse,
      personId: this.userObj._id
    })
      
    this.requests.selectedRequest.requestDetailsToSave = new Array();
    this.requests.selectedRequest.requestDetailsToSave = this.requests.selectedRequest.requestDetails;
    this.requests.selectedRequest.requestDetails = new Array();
    this.requests.selectedRequest.requestDetailsToSave.forEach((item) => {
        this.requests.selectedRequest.requestDetails.push(item._id)
    });
    return true;
  }

  delete(){
     return this.dialogs.showMessage(
        "Are you sure you want to delete that request?",
        "Delete Request",
        ['Yes','No']
        ).whenClosed(response => {
          if (!response.wasCancelled) {
             this.deleteRequest();
          }
        });
  }

  async deleteRequest(){
      this.requests.selectedRequest.requestDetails[this.selectedDetailIndex].delete = true;
      this.requests.selectedRequest.audit.push({
        property: "Deleted Product",
        newValue: this.requests.selectedRequest.requestDetails[this.selectedDetailIndex].productId,
        personId: this.userObj._id
      })
      
    this.requests.selectedRequest.requestDetailsToSave = new Array();
    this.requests.selectedRequest.requestDetailsToSave = this.requests.selectedRequest.requestDetails;
    this.requests.selectedRequest.requestDetails = new Array();
    this.requests.selectedRequest.requestDetailsToSave.forEach((item) => {
        this.requests.selectedRequest.requestDetails.push(item._id)
    });
    let serverResponse = await this.requests.saveRequest(this.config.SEND_EMAILS);
    if (!serverResponse.error) {
      this.getRequests();
      this.utils.showNotification("The request was deleted");
    }
    this._cleanUp();
  }

  _cleanUp(){
    this.requestSelected = false;
    this.customeResponse = "";
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
    this.requests.selectedRequest.endDate = moment.max(moment(this.requests.selectedRequest.startDate).format("MM/DD/YYYY"), moment(this.requests.selectedRequest.endDate).format("MM/DD/YYYY")).format("MM/DD/YYYY");
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
      if(this.requests.selectedRequest && this.requests.selectedRequest._id){
         this.showLockMessage = false;
        this.requests.removeRequestLock(this.requests.selectedRequest._id);
      }    
    }
  }

}
