import { inject } from 'aurelia-framework';
import { Router } from "aurelia-router";
import { DataTable } from '../../../resources/utils/dataTable';
import { Sessions } from '../../../resources/data/sessions';
import { Products } from '../../../resources/data/products';
import { SiteInfo } from '../../../resources/data/siteInfo';
import { ClientRequests } from '../../../resources/data/clientRequests';
import { AppConfig } from '../../../config/appConfig';
import { Utils } from '../../../resources/utils/utils';
import { People } from '../../../resources/data/people';
import Validation from '../../../resources/utils/validation';
import { CommonDialogs } from '../../../resources/dialogs/common-dialogs';
import { SessionObj } from '../../../resources/data/sessionData';
import Flatpickr from 'flatpickr';
import { EventAggregator } from 'aurelia-event-aggregator';

import fuelux from 'fuelux';
import moment from 'moment';

@inject(Router, AppConfig, Validation, People, CommonDialogs, DataTable, Utils, Sessions, Products, ClientRequests, SiteInfo, EventAggregator)
export class ViewHelpTickets {
  sessionSelected = false;
  courseSelected = false;
  sandBoxClient = false;
  editCourse = false;
  editCourseFlag = false;
  showLockMessage = false;
  showInfoBox = true;
  spinnerHTML = "";
  sessionId = -1;
  courseId = -1;
  requestType = -1;
  requestReceived = false;
  existingRequest = false;

  tempRequests = new Array();
  productInfo = new Array();
  lockObject = new Object();

  minStartDate = "1/1/1900";
  maxStartDate = "1/1/9999";
  startDate = "";
  configDate = {
    "disable": [
      function (date) {
        // return true to disable
        return (date.getDay() === 6 || date.getDay() === 0);

      }
    ],
    "locale": {
      "firstDayOfWeek": 1 // start week on Monday
    }
  };

  constructor(router, config, validation, people, dialog, datatable, utils, sessions, products, requests, siteInfo, ea) {
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
    this.siteInfo = siteInfo;
    this.dialog = dialog;
    this.ea = ea;

    this.userObj = JSON.parse(sessionStorage.getItem('user'));

  };

  async activate() {
    let responses = await Promise.all([
      this.sessions.getSessionsArray('?filter=[or]sessionStatus|Requests&order=sortOrder', true),
      this.products.getProductsArray('?filter=active|eq|true&order=name', true),
      this.siteInfo.getMessageArray('?filter=category|eq|CLIENT_REQUESTS', true),
      this.config.getConfig()
    ]);

    this.people.getPeopleArray();
    this.people.getCoursesArray(true, '?filter=personId|eq|' + this.userObj._id + '&order=number');
    this.requests.selectRequest()
    this.filterList();
    this._setUpValidation();
    this.getMessages();

    this.useSandbox = this.config.SANDBOX_USED;
    if (!this.useSandbox) {
      this.typeSelected = true;
      this.regularClient = true;
      this.requestType = "regularCourse";
    }
  }

  canActivate() {
    if (!this.userObj) {
      this.userObj = this.config.user;
      if (!this.userObj) {
        this.utils.showNotification("Couldn't find your user information.  Try logging in again or call the UCC.", "warning");
        this.router.navigate("home");
      }
    }
  }

  getMessages() {
    this.CLIENT_REQUEST_START = this.siteInfo.selectMessageByKey('CLIENT_REQUEST_START');
    this.SESSION_SELECTED = this.siteInfo.selectMessageByKey('SESSION_SELECTED');
    this.REGULAR_NUMBER_OF_STUDENTS = this.siteInfo.selectMessageByKey('REGULAR_NUMBER_OF_STUDENTS');
    this.START_END_DATES = this.siteInfo.selectMessageByKey('START_END_DATES');
  }

  async getRequests() {
    await this._unLock();
    this.requestReceived = false;
    if (this.sessionId != -1 && this.courseId != -1) {
      this.ILockedIt = false;
      this.existingRequest = false;
      await this.requests.getClientRequestsArray('?filter=[and]personId|eq|' + this.userObj._id + ':sessionId|eq|' + this.sessionId + ':courseId|eq|' + this.courseId, true);
      if (this.requests.requestsArray && this.requests.requestsArray.length > 0) {
        this.requests.selectRequest(0);
        this.originalRequest = this.utils.copyObject(this.requests.selectedRequest);
        this.existingRequestLength = this.requests.selectedRequest.requestDetails.length;
        this.setDates(false);
        await this._lock();
        this.ILockedIt = true;
        this.existingRequest = true;
        if (this.requests.requestsArray && this.requests.requestsArray.length > 0) {
          let dateFoo = moment(new Date(this.requests.selectedRequest.requestDetails[0].createdDate)).format(this.config.DATE_FORMAT_TABLE);
          let existingMsg = this.siteInfo.selectMessageByKey('EXISTING_REQUEST_MESSAGE').content.replace('DATECREATED', dateFoo);
          $("#existingRequestInfo").html('').append(existingMsg).fadeIn();
        } else {
          $("#existingRequestInfo").empty().hide();
        }
        this.requestReceived = true;
      } else {
        $("#existingRequestInfo").empty().hide();
        this.setDates(true);
        this.existingRequestLength = 0;
        this.existingRequest = false;
        this.requests.selectRequest();
        this.requests.selectedRequest.sessionId = this.sessionId;
        this.requestReceived = true;
      }

    } else {
      this.existingRequest = false;
    }
  }

  async refresh() {
    this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
    await this.getRequests();
    this.spinnerHTML = "";
  }

  attached() {
    var wizard = $('.wizard').wizard();
    this.toolTips();
    var that = this;

    wizard.on('actionclicked.fu.wizard', function (e, data) {
      that.step = data.step;
      if (data.direction !== "previous") {
        if (!that.validation.validate(data.step)) {
          e.preventDefault();
        } else if (data.step === 4) {
          that.validation.makeValid($("#productListTable"));
          that.save();
        }
      }
    })
    let config = {
      altInput: true,
      altFormat: "F j, Y"
    };
  }

  deactivate() {
    this._unLock();
  }

  /*******************************************************************
   * User changes the session
   * el - event object
   ******************************************************************/
  async changeSession(el) {
    if (this.sessionId == -1) {
      //Drop down list changed to no session selected
      this.sessionSelected = false;
      this.courseSelected = false;
      this.sandBoxClient = false;
    } else {
      this._unLock();
      this.sessionSelected = true;
      //Select a session
      this.sessions.selectSession(el.target.selectedIndex - 1);
      this.setDates();
      this.validation.makeValid($(el.target));
      await this.getRequests();
    }
  }

  async selectCourse(index, el) {
    this.editCourseIndex = index;
    this.people.selectCourse(this.editCourseIndex);
    this.courseSelected = true;
    this.courseId = this.people.selectedCourse._id;
    await this.getRequests();

    if (this.selectedCourseRow) this.selectedCourseRow.children().removeClass('info');
    this.selectedCourseRow = $(el.target).closest('tr');
    this.selectedCourseRow.children().addClass('info')
  }

  setDates(session) {
    if (session) {
      $("#input-startDate").val("")
      $("#input-endDate").val("")
    }
    this.minStartDate = moment(this.sessions.selectedSession.startDate).add(7, 'hours').format('YYYY-MM-DD');
    this.maxStartDate = this.sessions.selectedSession.endDate;
    this.minEndDate = this.sessions.selectedSession.startDate;
    this.maxEndDate = this.sessions.selectedSession.endDate;

    this.minRequiredDate = this.minStartDate;
    // var nowPlusLeeway = moment(new Date()).add(this.config.REQUEST_LEEWAY + 1,'days');
    // this.minRequiredDate = moment.max(nowPlusLeeway, moment(this.sessions.selectedSession.startDate));
    // this.minRequiredDate = moment(this.minRequiredDate).add(7, 'hours').format('YYYY-MM-DD');
    this.maxRequiredDate = this.sessions.selectedSession.endDate;
  }

  async changeCourse(el) {
    var courseId = el.target.options[el.target.selectedIndex].value;
    this.selectedCourseIndex = el.target.selectedIndex;
    if (courseId === "") {
      this.courseSelected = false;
    } else {
      this.courseSelected = true;
      this.courseName = this.courses[el.target.selectedIndex - 1].number + " - " + this.courses[el.target.selectedIndex - 1].name;
      this.validation.makeValid($(el.target));
      await this.getRequests();
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

  changeBeginDate(evt) {
    if (evt.detail && evt.detail.value.date !== "") {
      this.minEndDate = moment(evt.detail.value.date).format("YYYY-MM-DD");
      this.requests.selectedRequest.endDate = moment.max(this.requests.selectedRequest.startDate, this.requests.selectedRequest.endDate);
    }
  }

  async changeRequestType(el) {
    $("#existingRequestInfo").empty().hide();
    switch (el.target.value) {
      case "-1":
        this.typeSelected = false;
        this.courseSelected = false;
        this.sandBoxClient = false;
        break;
      case 'sandboxCourse':
        this.typeSelected = true;
        this.courseSelected = false;
        this.sandBoxClient = true;
        this.regularClient = false;
        this.courseId = this.config.SANDBOX_ID;
        await this.getRequests();
        this.validation.makeValid($(el.target));
        break;
      case 'regularCourse':
        this.typeSelected = true;
        this.courseId = "-1";
        this.regularClient = true;
        this.sandBoxClient = false;
        this.validation.makeValid($(el.target));
        await this.getRequests();
    }
  }

  _cleanRequest() {
    this.request.undergraduates = 0;
    this.request.graduates = 0;
    this.request.comments = "";
    this.tempRequests = [];
    this.tempRequest = {};
  }

  selectProduct(el) {
    if (this.requests.selectedRequest.requestDetails.length < this.config.REQUEST_LIMIT && !this.showLockMessage) {
      if (this.alreadyOnList(el.target.id)) {
        this.utils.showNotification('If you need more than one client of a product, add a comment on the next step.', 'warning')
      } else {
        $("#requestProductsLabel").html("Requested Products");
        var newObj = this.requests.emptyRequestDetail();
        newObj.productId = el.target.id;
        newObj.sessionId = this.requests.selectedRequest.sessionId;
        this.requests.selectedRequest.requestDetails.push(newObj);
        this.products.testFunction();
        this.products.selectedObjectById(newObj.productId);
        this.requests.selectedRequest.requestDetails[this.requests.selectedRequest.requestDetails.length - 1].productName = this.products.selectedProduct.name;
        // this.requiredDates.push(false);
      }
    } else {
      if (this.requests.selectedRequest.requestDetails.length === this.config.REQUEST_LIMIT) {
        this.utils.showNotification('Only ' + this.config.REQUEST_LIMIT + ' products per request are allowed.', 'warning')
      }
    }

    this.validation.makeValid($("#productList"));
  }

  alreadyOnList(id) {
    for (let i = 0; i < this.requests.selectedRequest.requestDetails.length; i++) {
      if (this.requests.selectedRequest.requestDetails[i].productId === id) return true;
    }
    return false;
  }

  removeProduct(el) {
    if (!this.showLockMessage) {
      for (var i = 0; i < this.requests.selectedRequest.requestDetails.length; i++) {
        if (el.target.id === this.requests.selectedRequest.requestDetails[i].productId) {
          if (this.requests.selectedRequest.requestDetails[i]._id) {
            if (this.requests.selectedRequest.requestDetails[i].requestStatus == this.config.ASSIGNED_REQUEST_CODE) {
              return this.dialog.showMessage(
                "That request has already been assigned and cannot be deleted?",
                "Cannot Delete Request",
                ['Ok']
              ).whenClosed(response => {
              });

            } else {
              return this.dialog.showMessage(
                "Are you sure you want to delete that request?",
                "Delete Request",
                ['Yes', 'No']
              ).whenClosed(response => {
                if (!response.wasCancelled) {
                  this.requests.selectedRequest.requestDetails[i].delete = true;
                }
              });
            }
            break;
          } else {
            this.requests.selectedRequest.requestDetails.splice(i, 1);
            // this.requiredDates.splice(i,1);
            for (var j = 0; j < this.productInfo.length; j++) {
              if (el.target.id == this.productInfo[j].productId) {
                this.productInfo.splice(j, 1);
                break;
              }
            }
            break;
          }
        }
      }
    }
  }

  showCurriculum(product, $event) {
    this.productInfoObject = this.products.getProductInfo(product._id);
    if (this.productInfoObject) $("#curriculumInfo").css("display", "block");
  }

  hideCurriculum() {
    $("#curriculumInfo").css("display", "none");
  }

  _setUpValidation() {
    this.validation.addRule(1, "course", [{
      "rule": "custom", "message": "Select a course",
      "valFunction": function (context) {
        if (context.requestType === "sandboxCourse") {
          return true
        } else {
          return !(context.courseId == -1);
        }
      }
    }]);
    this.validation.addRule(1, "session", [
      {
        "rule": "custom", "message": "Select a session",
        "valFunction": function (context) {
          return !(context.sessionId == -1);
        }
      }

    ]);
    this.validation.addRule(1, "startDateError", [
      {
        "rule": "required", "message": "Select a date",
        "value": "requests.selectedRequest.startDate"
      }
    ]);
    this.validation.addRule(1, "endDateError", [
      {
        "rule": "required", "message": "Select a date",
        "value": "requests.selectedRequest.endDate"
      }
    ]);

    this.validation.addRule(1, "requestType", [{
      "rule": "custom", "message": "Select a request type",
      "valFunction": function (context) {
        return !(context.requestType == -1);
      }
    }]);
    this.validation.addRule(1, "numberOfStudentsError", [{
      "rule": "custom", "message": "Enter either the number of undergradate or graduate students",
      "valFunction": function (context) {
        if (context.requestType === "sandboxCourse") {
          return true;
        } else if (context.requests.selectedRequest.undergradIds == 0 && context.requests.selectedRequest.graduateIds == 0) {
          return false;
        } else {
          return true;
        }
      }
    }]);
    this.validation.addRule(2, "productList", [{
      "rule": "custom", "message": "Select at least one product",
      "valFunction": function (context) {
        if (context.requests.selectedRequest.requestDetails.length === 0) {
          return false;
        } else {
          return true;
        }
      }
    }
    ]);
    this.validation.addRule(4, "productListTable", [{
      "rule": "custom", "message": "Enter all required dates",
      "valFunction": function (context) {
        for (var i = 0; i < context.requests.selectedRequest.requestDetails.length; i++) {
          if ((!context.requests.selectedRequest.requestDetails[i].requiredDate || context.requests.selectedRequest.requestDetails[i].requiredDate === ""
            || moment(context.requests.selectedRequest.requestDetails[i].requiredDate).isBefore(context.minStartDate))
          ) {
            return false;
          }
        }
        return true;
      }
    },
    {
      "rule": "custom", "message": "Required date cannot be earlier than 5 days from today",
      "valFunction": function (context) {
        var nowPlusLeeway = moment(new Date()).add(context.config.REQUEST_LEEWAY + 1, 'days');
        var minRequiredDate = moment.max(nowPlusLeeway, moment(context.sessions.selectedSession.startDate));
        for (var i = context.existingRequestLength; i < context.requests.selectedRequest.requestDetails.length; i++) {
          if (moment(context.requests.selectedRequest.requestDetails[i].requiredDate).isBefore(minRequiredDate, 'day')) {
            return false;
          }
        }
        return true;
      }
    }]);
    this.validation.addRule(5, "number", [
      { "rule": "required", "message": "Enter the course number", "value": "people.selectedCourse.number" },
      { "rule": "required", "message": "Enter the course name", "value": "people.selectedCourse.name" }
    ]);
  }

  _buildRequest() {
    if (this.existingRequest && this.userObj._id) {
      let changes = this.requests.isRequestDirty(this.originalRequest, ['personId', 'requestDetailsToSave']);
      this.requests.selectedRequest.requestDetailsToSave = this.requests.selectedRequest.requestDetails;
      this.requests.selectedRequest.requestDetailsToSave.forEach((item, index) => {
        if (item.requestStatus != this.config.ASSIGNED_REQUEST_CODE) item.requestStatus = this.config.UPDATED_REQUEST_CODE;

      });

      changes.forEach(item => {
        if (item.property === 'requestDetails') {
          item.oldValue = "";
          this.originalRequest.requestDetails.forEach(item2 => {
            this.products.selectedProductFromId(item.productId);
            item.oldValue += this.products.selectedProduct.name + " ";
          });
          item.newValue = "";
          this.requests.selectedRequest.requestDetails.forEach(item2 => {
            this.products.selectedProductFromId(item.productId);
            item.newValue += this.products.selectedProduct.name + " ";
          });
        }
        this.requests.selectedRequest.audit.push({
          personId: this.userObj._id,
          property: item.property,
          oldValue: item.oldValue,
          newValue: item.newValue
        })
      })

    } else {
      this.requests.selectedRequest.audit[0].personId = this.userObj._id;
    }

    // this.requests.selectedRequest.requestDetails.forEach((item, index) => {
    //   if(!item.requiredDate){
    //      this.requests.selectedRequest.requestDetails[index].requiredDate = this.requiredDates[index];
    //   }
    // });

    this.requests.selectedRequest.institutionId = this.userObj.institutionId._id;
    this.requests.selectedRequest.sessionId = this.sessionId;
    this.requests.selectedRequest.courseId = this.courseId;
    this.requests.selectedRequest.personId = this.userObj._id;
    this.requests.selectedRequest.requestStatus = this.config.UPDATED_REQUEST_CODE;
  }

  async save() {
    if (this.validation.validate(1)) {
      this._buildRequest();
      let email = this._buildEmailObject();
      let serverResponse = await this.requests.saveRequest(email);
      if (!serverResponse.status) {
        this.systemSelected = false;
        this.utils.showNotification("Product request " + serverResponse.clientRequestNo + " was updated");
      }
    }
    this._cleanUp();
  }

  _buildEmailObject() {
    var mailObject = new Object();
    if (this.config.SEND_EMAILS) {
      mailObject.products = new Array();
      this.requests.selectedRequest.requestDetails.forEach((detail, index) => {
        this.products.selectedProductFromId(detail.productId);
        var date = new Date(detail.requiredDate);
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        mailObject.products.push({ id: detail.productId, requiredDate: month + "/" + day + "/" + year, name: this.products.selectedProduct.name })
      });

      let course = this.people.selectedCourse ? this.people.selectedCourse.name : 'Trial Client';
      mailObject.MESSAGE = this.config.CLIENT_REQUEST_CREATED_TOP
        .replace('[CUSTOMER]', this.userObj.fullName)
        .replace('[SESSION]', this.sessions.selectedSession.session)
        .replace('[COURSE]', course)
      mailObject.BOTTOM = this.config.CLIENT_REQUEST_CREATED_BOTTOM;
      // mailObject.comments = this.requests.selectedRequest.comments;
      // mailObject.name = this.userObj.fullName;
      mailObject.numStudents = parseInt(this.requests.selectedRequest.undergradIds) + parseInt(this.requests.selectedRequest.graduateIds);
      mailObject.email = this.userObj.email
      mailObject.cc = this.config.REQUESTS_EMAIL_LIST ? this.config.REQUESTS_EMAIL_LIST : "";
    }

    return mailObject;
  }

  _cleanUp() {
    this._unLock()
    this.requests.selectRequest();
    this.productInfo = new Array();
    this.sessionSelected = false;
    this.typeSelected = false;
    this.sandBoxClient = false;
    this.courseSelected = false;
    this.courseId = "-1";
    this.sessionId = -1;
    this.requestType = -1;
    $("#existingRequestInfo").hide();
    $('.wizard').wizard('selectedItem', {
      step: 1
    })
  }

  //Courses
  async openEditCourseForm() {
    if (!this.showCourses) await this.refreshCourses();
    this.showCourses = !this.showCourses;
  }

  async refreshCourses() {
    await this.people.getCoursesArray(true, '?filter=personId|eq|' + this.userObj._id + '&order=number');
  }

  editACourse() {
    if (this.courseId != -1) {
      this.editCourse = true;
      $("#number").focus();
    }
  }

  newCourse() {
    this.editCourseIndex = -1;
    this.people.selectCourse();
    $("#number").focus();
    this.editCourse = true;
  }

  async saveCourse() {
    if (this.validation.validate(5)) {
      if (this.userObj._id) {
        // if (this.people.selectedCourse._id) this.editCourseIndex = this.baseArray.length;
        this.people.selectedCourse.personId = this.userObj._id;
        let serverResponse = await this.people.saveCourse();
        if (!serverResponse.status) {
          this.utils.showNotification("The course was updated");
        }
        this.editCourse = false;
      }
    }
  }

  cancelEditCourse() {
    this.editCourse = false;
  }

  async _lock() {
    var response = await this.requests.getRequestLock(this.requests.selectedRequest._id);
    if (!response.error) {
      if (response.requestId === 0) {
        //Lock help ticket
        this.requests.lockRequest({
          requestId: this.requests.selectedRequest._id,
          personId: this.userObj._id
        });
        this.showLockMessage = false;
        this.lockObject = {};
      } else {
        if (response[0].personId !== this.userObj._id) {
          this.lockObject = response[0];
          this.showLockMessage = true;
        }
      }
    }
  }

  _unLock() {
    if (this.ILockedIt) {
      if (this.requests.selectedRequest._id) {
        this.showLockMessage = false;
        this.requests.removeRequestLock(this.requests.selectedRequest._id);
      }
    }
  }

  toolTips() {
    $('[data-toggle="tooltip"]').tooltip();
  }

}
