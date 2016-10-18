import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";
import {DataTable} from '../../../resources/utils/dataTable';
import {Sessions} from '../../../resources/data/sessions';
import {Products} from '../../../resources/data/products';
import {SiteInfo} from '../../../resources/data/siteInfo';
import {ClientRequests} from '../../../resources/data/clientRequests';
import {AppConfig} from '../../../config/appConfig';
import {Utils} from '../../../resources/utils/utils';
import {People} from '../../../resources/data/people';
import {AppState} from '../../../resources/data/appState';
import Validation from '../../../resources/utils/validation';
import {CommonDialogs} from '../../../resources/dialogs/common-dialogs';

import fuelux from 'fuelux';
import moment from 'moment';
import $ from 'jquery';

@inject(Router, AppConfig, Validation, People, AppState, CommonDialogs, DataTable, Utils, Sessions, Products, ClientRequests, SiteInfo)
export class ViewHelpTickets {
  sessionSelected = false;
  courseSelected = false;
  editCourse = false;
  editCourseFlag = false;
  spinnerHTML="";
  courseId = -1;
  requestType = -1;
  commentsResponse = "";

  tempRequests = new Array();
  productInfo = new Array();

  constructor(router, config, validation, people, app, dialog, datatable, utils, sessions,  products, requests, siteInfo) {
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
    this.siteInfo = siteInfo;
    this.dialog = dialog;
  };

  async activate() {
      let responses =  await Promise.all([
      this.sessions.getSessionsArray(true, '?order=startDate'),
      this.products.getProductsArray(true, '?order=name'),
      this.siteInfo.getMessageArray(true, '?filter=category|eq|CLIENT_REQUESTS')
    ]);
    this.requests.selectRequest()
    this.filterList();
    this.updateMessages(true);
    this._setUpValidation();
  }

  async getRequests(){
    if( this.sessionId != -1 &&  this.courseId != -1  ){
        this.existingRequest = false;
        await this.requests.getPersonClientRequestsArray(true, '?filter=[and]personId|eq|' + this.app.user._id + ':sessionId|eq|' + this.sessionId + ':courseId|eq|' + this.courseId);

        if(this.requests.requestsArray && this.requests.requestsArray.length > 0) {
            this.requests.selectRequest(0);
            // var that = this;
            // this.requests.selectedRequest.requestDetails.forEach(function(currentValue){
            // });
            this.commentsResponse = this.requests.selectedRequest.comments || "";
            this.existingRequest = true;
            this.updateMessages(false);
        } else{
          this.existingRequest = false;
          this.updateMessages(false);
          this.requests.selectRequest();
          this.requests.selectedRequest.sessionId = this.sessionId;
        }
        this.setDates();
    } else {
      this.existingRequest = false;
      this.updateMessages(true);
    }
  }

  async refresh(){
    this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
    await this.getRequests();
    this.spinnerHTML = "";
  }

  attached(){
    var wizard = $('.wizard').wizard();
    var that = this;

    wizard.on('actionclicked.fu.wizard', function(e, data) {
      if(data.direction !== "previous"){
        if (!that.validation.validate(data.step, that)){
          e.preventDefault();
        } else if(data.step === 4){
          that.validation.makeValid( $("#productListTable"));
          that.save();
        }
      }
    })
  }

  detach(){
    this.updateMessages(true);
  }

  /*******************************************************************
   * User changes the session
   * el - event object
   ******************************************************************/
  async changeSession(el){
    if(!this.sessionId ){
      //Drop down list changed to no session selected
      this.sessionSelected = false;
    } else {
        this.sessionSelected = true;
        //Select a session
        this.sessions.selectSession(el.target.selectedIndex - 1);
        //Format the dates for the date pickers
        // this.utils.formatDateForDatesPicker(this.sessions.selectedSession);
        
        this.setDates();

        this.validation.makeValid( $(el.target));

        this.updateMessages(false);
        await this.getRequests();
    }
  }

  setDates(){
    this.requests.selectedRequest.startDate = this.sessions.selectedSession.startDate;
    this.requests.selectedRequest.endDate = this.sessions.selectedSession.endDate;
    this.minStartDate =this.sessions.selectedSession.startDate;
    this.maxStartDate =this.sessions.selectedSession.endDate;
    this.minEndDate =this.sessions.selectedSession.startDate;
    this.maxEndDate =this.sessions.selectedSession.endDate;
    var nowPlusLeeway = moment(new Date()).add(this.config.REQUEST_LEEWAY,'days');
    this.minRequiredDate = moment.max(nowPlusLeeway, moment(this.sessions.selectedSession.startDate));
    this.minRequiredDate = moment(this.minRequiredDate._d).format('YYYY-MM-DD');
    this.maxRequiredDate = this.sessions.selectedSession.endDate;
    
  }

  changeCourse(el){
    var courseId = el.target.options[el.target.selectedIndex].value;
    this.selectedCourseIndex = el.target.selectedIndex;
    if(courseId === ""){
      this.courseSelected = false;
    } else {
      this.courseSelected = true;
      this.courseName = this.courses[el.target.selectedIndex - 1].number + " - " + this.courses[el.target.selectedIndex - 1].name;
      this.validation.makeValid( $(el.target));
      this.getClients();
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

  changeBeginDate(){
    $("#endDate").attr("min", $("#beginDate").val());
    this.requests.selectedRequest.endDate = moment.max($("#beginDate").val(), $("#endDate").val());
  }

  changeEndDate(){
    $("#beginDate").attr("max", $("#endDate").val());
    this.requests.selectedRequest.startDate = moment.min($("#beginDate").val(), $("#endDate").val());
  }

  async changeRequestType(el){
    switch(el.target.value){
      case 'sandboxCourse':
        this.courseSelected = false;
        this.sandBoxClient = true;
        this.regularClient = false;
        this.courseId = this.config.SANDBOX_ID;
        await this.getRequests();
         this.validation.makeValid( $(el.target));
        break;
      case 'regularCourse':
       this.regularClient = true;
        this.validation.makeValid( $(el.target));
       await this.getRequests();
    }
  }

  /*****************************************************************************************
  * Update the screen messages
  * clean - if true erase all messages except the start message
  *****************************************************************************************/
  updateMessages(clean){
    $("#existingRequestInfo").empty().hide();
    $("#infoBox").empty().hide();
    if(!clean) {
      this.productInfo = new Array();
      if(this.regularClient){
        $("#infoBox").html(this.siteInfo.selectMessageByKey('REGULAR_CLIENT_MESSAGE').content).fadeIn();
      } else if(this.sandBoxClient){
        $("#infoBox").html(this.siteInfo.selectMessageByKey('SANDBOX_MESSAGE').content).fadeIn();
      }
      if(this.existingRequest){
        $("#existingRequestInfo").append(this.siteInfo.selectMessageByKey('EXISTING_REQUEST_MESSAGE').content.replace('DATECREATED', moment(this.requests.requestsArray[0].dateCreated).format(this.config.DATE_FORMAT_TABLE))).fadeIn();
      }
    } else {
      $("#infoBox").html(this.siteInfo.selectMessageByKey('CLIENT_REQUEST_START').content).fadeIn();
    }
  }

  _cleanRequest(){
    this.request.undergraduates = 0;
    this.request.graduates = 0;
    this.request.comments = "";
    this.tempRequests = [];
    this.tempRequest = {};
  }

  selectProduct(el){
    if(this.requests.selectedRequest.requestDetails.length < this.config.REQUEST_LIMIT){
      $("#requestProductsLabel").html("Requested Products");
      var newObj = this.requests.emptyRequestDetail();
      newObj.productId = el.target.id;
      newObj.sessionId = this.requests.selectedRequest.sessionId;
      this.requests.selectedRequest.requestDetails.push(newObj);
      this.products.selectedProductFromId(newObj.productId);
      var productInfo = this.products.selectedProduct.productInfo ? this.products.selectedProduct.productInfo : "";
      if(productInfo) this.productInfo.push({
        info: productInfo,
        productId: newObj.productId,
        header: this.products.selectedProduct.name
      });
    }
    this.validation.makeValid( $("#productList"));
  }

  removeProduct(el){
    for(var i = 0; i<this.requests.selectedRequest.requestDetails.length; i++){
      if(el.target.id === this.requests.selectedRequest.requestDetails[i].productId){
        if(this.requests.selectedRequest.requestDetails[i]._id){
          if(this.requests.selectedRequest.requestDetails[i].requestStatus == this.config.ASSIGNED_REQUEST_CODE){
            return this.dialog.showMessage(
              "That request has already been assigned and cannot be deleted?", 
              "Cannot Delete Request", 
              ['Ok']
              ).then(response => {
              });
          
          } else {
            return this.dialog.showMessage(
              "Are you sure you want to delete that request?", 
              "Delete Request", 
              ['Yes','No']
              ).then(response => {
                 if (!response.wasCancelled) {
                     this.requests.selectedRequest.requestDetails.splice(i,1);
                }
              });
          }
          break;
        } else {
          this.requests.selectedRequest.requestDetails.splice(i,1);
          for(var j=0; j<this.productInfo.length; j++){
            if(el.target.id == this.productInfo[j].productId) {
              this.productInfo.splice(j,1);
              break;
            }
          }
          break;
        }
      }
    }
  }

  _setUpValidation(){
    this.validation.addRule(1,"session",{"rule":"required","message":"Select a session",
      "valFunction":function(context){
        return !(context.sessionId == -1);
      }});
      
     this.validation.addRule(1,"requestType",{"rule":"required","message":"Select a request type",
      "valFunction":function(context){
        return !(context.requestType == -1);
      }
    });  
      
    this.validation.addRule(1,"course",{"rule":"required","message":"Select a course",
      "valFunction":function(context){
        if(context.requestType === "sandboxCourse"){
          return true
        } else {
          return !(context.courseId == -1);
        }
      }
    });
    this.validation.addRule(1,"numStudents",{"rule":"required","message":"Enter the number of students",
      "valFunction":function(context){
        if(context.requestType === "sandboxCourse"){
          return true;
        // } else if(($("#undergraduates").val() === "" || $("#undergraduates").val() == 0) && ($("#graduates").val() === "" || $("#graduates").val() == 0)){
        } else if(context.requests.selectedRequest.undergradIds == 0 && context.requests.selectedRequest.graduateIds == 0){
          return false;
        } else {
          return true;
        }
      }
    });
    this.validation.addRule(2,"productList",{"rule":"required","message":"Select at least one product",
      "valFunction":function(context){
        if(context.requests.selectedRequest.requestDetails.length === 0){
          return false;
        } else {
          return true;
        }
      }
    });
    this.validation.addRule(4,"productListTable",{"rule":"required","message":"Enter all required dates",
      "valFunction":function(context){
        for(var i = 0; i < context.requests.selectedRequest.requestDetails.length; i++ ){
          var foo = '#requiredDate-' + i;
          if($(foo).val() === ""){
            return false;
          }
        }
        return true;
      }
    });
    this.validation.addRule(5,"number",{"rule":"required","message":"Enter the course number", "value": "people.selectedCourse.number"});
    this.validation.addRule(5,"name",{"rule":"required","message":"Enter the course name", "value": "people.selectedCourse.name"});
  }

  _buildRequest(){
    if(this.existingRequest){
      this.requests.selectedRequest.requestDetailsToSave =  this.requests.selectedRequest.requestDetails;
    }
    this.requests.selectedRequest.comments = this.commentsResponse;
    this.requests.selectedRequest.audit[0].personId = this.app.user._id;
    this.requests.selectedRequest.institutionId = this.app.user.institutionId;
    this.requests.selectedRequest.sessionId = this.sessionId;
    this.requests.selectedRequest.courseId = this.courseId;
    this.requests.selectedRequest.personId = this.app.user._id;
    this.requests.selectedRequest.requestStatus = this.config.UNASSIGNED_REQUEST_CODE;
  }

  async save(){
    if(this.validation.validate(1, this)){
      this._buildRequest();
        let serverResponse = await this.requests.saveRequest();
        if (!serverResponse.status) {
            this.utils.showNotification("System client request was updated", "", "", "", "", 5);
            this.systemSelected = false;
            // this._cleanUp();
        }
    }

    this._cleanUp();
  }

  _cleanUp(){
    this.requests.selectRequest();
    this.productInfo = new Array();
    this.sessionSelected = false;
    this.sandBoxClient = false;
    this.courseSelected = false;
    this.updateMessages(true);
    this.sessionId = -1;
    $('.wizard').wizard('selectedItem', {
      step: 1
    })
  }

  //Courses
 async openEditCourseForm(){
      if(!this.showCourses) await this.refreshCourses();
      this.showCourses = !this.showCourses;
 }

  async refreshCourses(){
      await this.people.getCoursesArray(true,{ personId: this.app.user._id, order: 'number' });
  }

  async selectCourse(index, el){
      this.editCourseIndex = index;
      this.people.selectCourse(this.editCourseIndex);
      this.courseSelected = true;
      this.courseId = this.people.selectedCourse._id;
      await this.getRequests();

      if (this.selectedCourseRow) this.selectedCourseRow.children().removeClass('info');
      this.selectedCourseRow = $(el.target).closest('tr');
      this.selectedCourseRow.children().addClass('info')
  }

  editACourse(){
    this.editCourse = true;
    $("#number").focus();
  }

  newCourse(){
      this.editCourseIndex = -1;
      this.people.selectCourse();
      $("#number").focus();
      this.editCourse = true;
  }

  async saveCourse(){
        if(this.validation.validate(5, this)){
          if(this.people.selectedPerson._id){
              if(this.people.selectedCourse._id)  this.editCourseIndex = this.baseArray.length;
              this.people.selectedCourse.personId = this.people.selectedPerson._id;
              let serverResponse = await this.people.saveCourse();
              if (!serverResponse.status) {
                  this.utils.showNotification("The course was updated", "", "", "", "", 5);
              }
         this.editCourse = false;
          }
      }
  }

  cancelEditCourse(){
      this.editCourse = false;
  }

}
