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
import Flatpickr from 'flatpickr';
import { EventAggregator } from 'aurelia-event-aggregator';

import fuelux from 'fuelux';
import moment from 'moment';

@inject(Router, AppConfig, Validation, People, CommonDialogs, DataTable, Utils, Sessions, Products, ClientRequests, SiteInfo, EventAggregator)
export class CreateRequestTech {
	sessionSelected = false;
	spinnerHTML = "";

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

		this.userObj = JSON.parse(sessionStorage.getItem('user'));;

	};

	async activate() {
		let responses = await Promise.all([
			this.sessions.getSessionsArray('?filter=[or]sessionStatus|Active:Requests&order=startDate', true),
			this.products.getProductsArray('?filter=active|eq|true&order=name', true),
			this.people.getInstitutionsArray('?filter=institutionStatus|eq|01&order=name'),
			this.siteInfo.getMessageArray('?filter=category|eq|CLIENT_REQUESTS',true),
			this.config.getConfig()
		]);

		this.requests.selectRequest()
		this.filterList();
		this._setUpValidation();

		if (!this.config.SANDBOX_USED) {
			this.typeSelected = true;
			this.regularClient = true;
			this.requestType = "regularCourse";
		}
	}

	changeBeginDate(evt){
		if(evt.detail && evt.detail.value.date !== ""){
		this.minEndDate = moment(evt.detail.value.date).format("MM/DD/YYYY");
		this.requests.selectedRequest.endDate = moment.max(this.requests.selectedRequest.startDate, this.requests.selectedRequest.endDate);
		}
		
	}

	selectProduct(el){
    	if(this.requests.selectedRequest.requestDetails.length < this.config.REQUEST_LIMIT && !this.showLockMessage){
			if(this.alreadyOnList(el.target.id)){
				this.utils.showNotification("You can't add the same product more than once")
			} else {
				$("#requestProductsLabel").html("Requested Products");
					var newObj = this.requests.emptyRequestDetail();
					newObj.productId = el.target.id;
					newObj.sessionId = this.sessionId;
					newObj.courseId = this.courseId;
					this.requests.selectedRequest.requestDetails.push(newObj);
					this.products.selectedProductFromId(newObj.productId);
					this.requests.selectedRequest.requestDetails[this.requests.selectedRequest.requestDetails.length - 1].productName = this.products.selectedProduct.name;
					// var productInfo = this.products.selectedProduct.productInfo ? this.products.selectedProduct.productInfo : "";
					// if(productInfo) {
					// 	this.productInfo.push({
					// 		info: productInfo,
					// 		productId: newObj.productId,
					// 		header: this.products.selectedProduct.name
					// 	});
					// }
				}
			}
			
			this.validation.makeValid( $("#productList"));
	}

	alreadyOnList(id){
		for(let i = 0; i < this.requests.selectedRequest.requestDetails.length; i++ ){
		if(this.requests.selectedRequest.requestDetails[i].productId === id) return true;
		}
		return false;
	}

	removeProduct(el){
		if(!this.showLockMessage){
		for(var i = 0; i<this.requests.selectedRequest.requestDetails.length; i++){
			if(el.target.id === this.requests.selectedRequest.requestDetails[i].productId){
			if(this.requests.selectedRequest.requestDetails[i]._id){
				if(this.requests.selectedRequest.requestDetails[i].requestStatus == this.config.ASSIGNED_REQUEST_CODE){
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
					['Yes','No']
					).whenClosed(response => {
					if (!response.wasCancelled) {
						this.requests.selectedRequest.requestDetails[i].delete = true;
						// this.requests.selectedRequest.requestDetails.splice(i,1);
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
	}

	 _buildRequest(){
		if(this.requests.selectedRequest._id){
			this.requests.selectedRequest.requestDetailsToSave =  this.requests.selectedRequest.requestDetails;
			this.requests.selectedRequest.requestDetailsToSave.forEach((item, index) => {
				if(item.requestStatus != this.config.ASSIGNED_REQUEST_CODE) item.requestStatus = this.config.UPDATED_REQUEST_CODE;
			})
			this.requests.selectedRequest.requestStatus = this.config.UPDATED_REQUEST_CODE;
		} else {
			this.requests.selectedRequest.requestStatus = this.config.UNASSIGNED_REQUEST_CODE;
		}

		this.requests.selectedRequest.audit[0].personId = this.userObj._id;
		this.requests.selectedRequest.institutionId = this.selectedInstitution;
		this.requests.selectedRequest.sessionId = this.sessionId;
		this.requests.selectedRequest.courseId = this.courseId;
		this.requests.selectedRequest.personId = this.selectedPerson;
		
	}

	async save(){
		if(this.validation.validate(1)){
			this._buildRequest();
			let email = this._buildEmailObject();
			let serverResponse = await this.requests.saveRequest(email);
			if (!serverResponse.status) {
				this.utils.showNotification("The product request was updated");
				this.systemSelected = false;
			}
			this._cleanUp();
		}
	}

	_buildEmailObject(){
		var mailObject = new Object();
		mailObject.products = new Array();
		this.requests.selectedRequest.requestDetails.forEach((detail, index) => {
			this.products.selectedProductFromId(detail.productId);
			var date = new Date(detail.requiredDate);
			var day = date.getDate();
			var month = date.getMonth();
			var year = date.getFullYear();
			mailObject.products.push({id: detail.productId, requiredDate: month + "/" + day + "/" + year, name: this.products.selectedProduct.name})    
		});

		mailObject.comments = this.requests.selectedRequest.comments;
		mailObject.name = this.userObj.fullName;
		mailObject.numStudents =  parseInt(this.requests.selectedRequest.undergradIds) + parseInt(this.requests.selectedRequest.graduateIds);
		mailObject.email = this.people.selectedPerson.email
		mailObject.reason = 1;
		mailObject.cc = this.config.REQUESTS_EMAIL_LIST ? this.config.REQUESTS_EMAIL_LIST : "";
    	// mailObject.message = "The status was changed to " + description;
		return mailObject;
	}

	_cleanUp(){
		this.requests.selectRequest();
		this.productInfo = new Array();
		this.sessionSelected = false;
		this.institutionSelected = false;
		this.personSelected = false
		this.typeSelected = false;
		this.courseSelected = false;
		this.regularClient = false;
		this.sandBoxClient = false;
		$("#existingRequestInfo").hide();
		this.courseId = "-1";
		this.sessionId = "";
		this.requestType = -1;
	}

	/*******************************************************************
	 * User changes the session
	 * el - event object
	 ******************************************************************/
	async changeSession(el) {
		if (this.sessionId == "") {
			//Drop down list changed to no session selected
			this.sessionSelected = false;
			this.courseSelected = false;
			this.sandBoxClient = false;
		} else {
			// this._unLock();
			this.sessionSelected = true;
			//Select a session
			this.sessions.selectSession(el.target.selectedIndex - 1);
			this.setDates();
			// this.validation.makeValid( $(el.target));
			// await this.getRequests();
		}
	}

	changeInstitution(el) {
		console.log(this.selectedInstitution)
		this.institutionSelected = true;
		this.people.getInstitutionPeople('?filter=institutionId|eq|' + this.selectedInstitution + '&order=lastName', true);
	}

	changePerson(el) {
		this.personSelected = true;
		this.people.selectedPersonFromId(this.selectedPerson, 'i');
	}

	changeRequestType(el) {
		switch (this.requestType) {
			case -1:
				this.regularClient = false;
				break;
			case "regularCourse":
				this.regularClient = true;
				this.people.getCoursesArray(true, '?filter=personId|eq|' + this.selectedPerson + '&order=number', true);
				break;
			case "sandboxCourse":
				this.courseId = this.config.SANDBOX_ID;
				this.sandBoxClient = true;
				break;
		}
	}

	//Courses
	async openEditCourseForm() {
		if (!this.showCourses) await this.refreshCourses();
		this.showCourses = !this.showCourses;
	}

	async refreshCourses() {
		await this.people.getCoursesArray(true, '?filter=personId|eq|' + this.selectedPerson + '&order=number', true);
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
				if (this.people.selectedCourse._id) this.editCourseIndex = this.baseArray.length;
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

	async getRequests() {
		// await this._unLock();
		if (this.sessionId != -1 && this.courseId != -1) {
			this.ILockedIt = false;
			this.existingRequest = false; 
			await this.requests.getClientRequestsArray('?filter=[and]personId|eq|' + this.selectedPerson + ':sessionId|eq|' + this.sessionId + ':courseId|eq|' + this.courseId, true);
			if (this.requests.requestsArray && this.requests.requestsArray.length > 0) {
				this.requests.selectRequest(0);
				 this.setDates(false);
				// await this._lock();
				this.ILockedIt = true;
				this.existingRequest = true;
				if (this.requests.requestsArray && this.requests.requestsArray.length > 0) {
					let dateFoo = moment(new Date(this.requests.selectedRequest.requestDetails[0].createdDate)).format(this.config.DATE_FORMAT_TABLE);
					  let existingMsg = this.siteInfo.selectMessageByKey('EXISTING_REQUEST_MESSAGE').content.replace('DATECREATED', dateFoo);
					  $("#existingRequestInfo").html('').append(existingMsg).fadeIn();
					} else {
					  $("#existingRequestInfo").empty().hide();
					}
				} else {
					$("#existingRequestInfo").empty().hide();
					this.setDates(true);
					this.existingRequest = false;
					this.requests.selectRequest();
					this.requests.selectedRequest.sessionId = this.sessionId;
				}

			} else {
				this.existingRequest = false;
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

	setDates(session){ 
		if(session){
		$("#input-startDate").val("")
		$("#input-endDate").val("")
		}  
		this.minStartDate = this.sessions.selectedSession.startDate;
		this.maxStartDate = this.sessions.selectedSession.endDate;
		this.minEndDate = this.sessions.selectedSession.startDate;
		this.maxEndDate = this.sessions.selectedSession.endDate;

		var nowPlusLeeway = moment(new Date()).add(this.config.REQUEST_LEEWAY,'days');
		this.minRequiredDate = moment.max(nowPlusLeeway, moment(this.sessions.selectedSession.startDate));
		this.minRequiredDate = moment(this.minRequiredDate._d).format('YYYY-MM-DD');
		this.maxRequiredDate = this.sessions.selectedSession.endDate;
	}

	async changeCourse(el){
		var courseId = el.target.options[el.target.selectedIndex].value;
		this.selectedCourseIndex = el.target.selectedIndex;
		if(courseId === ""){
		this.courseSelected = false;
		} else {
		this.courseSelected = true;
		this.courseName = this.courses[el.target.selectedIndex - 1].number + " - " + this.courses[el.target.selectedIndex - 1].name;
		this.validation.makeValid( $(el.target));
		await this.getRequests();
		}
	}

	_setUpValidation(){
		this.validation.addRule(1,"session",[
			{"rule":"custom","message":"Select a session",
			"valFunction":function(context){
				return !(context.sessionId == -1);
			}}
      
      	]);
		this.validation.addRule(1,"institution",[
			{"rule":"custom","message":"Select an institution",
			"valFunction":function(context){
				return !(context.selectedInstitution == "");
			}}
      
      	]);
		this.validation.addRule(1,"faculty",[
			{"rule":"custom","message":"Select a person",
			"valFunction":function(context){
				return !(context.selectedPerson == "");
			}}
      
      	]);
		this.validation.addRule(1,"course",[{"rule":"custom","message":"Select a course",
		"valFunction":function(context){
			return context.courseId != undefined && !(context.courseId == "-1");
		}
		}]);
		this.validation.addRule(1,"startDateError",[
			{"rule":"required","message":"Select a date",
			"value": "requests.selectedRequest.startDate"}
		]);
		this.validation.addRule(1,"endDateError",[
			{"rule":"required","message":"Select a date",
			"value": "requests.selectedRequest.endDate"}
		]);

		this.validation.addRule(1,"requestType",[{"rule":"custom","message":"Select a request type",
		"valFunction":function(context){
			return !(context.requestType == -1);
		}}]);
		this.validation.addRule(1,"numberOfStudentsError",[{"rule":"custom","message":"Enter either the number of undergradate or graduate students",
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
		}]);
		this.validation.addRule(1,"productList",[{"rule":"custom","message":"Select at least one product",
		"valFunction":function(context){
			if(context.requests.selectedRequest.requestDetails.length === 0){
			return false;
			} else {
			return true;
			}
		}
		}
		]);
		this.validation.addRule(1,"productListTable",[{"rule":"custom","message":"Enter all required dates",
		"valFunction":function(context){
			for(var i = 0; i < context.requests.selectedRequest.requestDetails.length; i++ ){
			if(!context.requests.selectedRequest.requestDetails[i].requiredDate || context.requests.selectedRequest.requestDetails[i].requiredDate === ""){
				return false;
			}
			}
			return true;
		}
		}]);
		this.validation.addRule(5,"number",[
		{"rule":"required","message":"Enter the course number", "value": "people.selectedCourse.number"},
		{"rule":"required","message":"Enter the course name", "value": "people.selectedCourse.name"}
		]);
	}
	

}