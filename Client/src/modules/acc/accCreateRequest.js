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
import Validation from '../../resources/utils/validation';
import { CommonDialogs } from '../../resources/dialogs/common-dialogs';
import Flatpickr from 'flatpickr';
import { EventAggregator } from 'aurelia-event-aggregator';

import fuelux from 'fuelux';
import moment from 'moment';

@inject(Router, AppConfig, Validation, People, CommonDialogs, DataTable, Utils, Sessions, Products, APJClientRequests, SiteInfo, EventAggregator)
export class ACCClientRequest {
	configDate = {};

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
			this.products.getProductsArray('?filter=active|eq|true&order=name', true),
			this.people.getInstitutionsArray('?filter=[and]institutionStatus|eq|01:apj|eq|true&order=name'),
			this.siteInfo.getMessageArray('?filter=category|eq|CLIENT_REQUESTS', true),
			this.people.getAPJPackages(),
			this.config.getConfig()
		]);

		$('#loading').hide();

		this.requests.selectRequest()
		this.filterList();
		this._setUpValidation();

		this.useSandbox = this.config.SANDBOX_USED;
		if (!this.config.SANDBOX_USED) {
			this.typeSelected = true;
			this.regularClient = true;
			this.requestType = "regularCourse";
		}
	}

	attached() {
		$('#loading').hide();
	}

	changeBeginDate(evt) {
		if (evt.detail && evt.detail.value.date !== "") {
			this.minEndDate = moment(evt.detail.value.date).format("MM/DD/YYYY");
			this.requests.selectedRequest.endDate = moment.max(this.requests.selectedRequest.startDate, this.requests.selectedRequest.endDate);
		}

	}

	selectProduct(el) {

		if (this.alreadyOnList(el.target.id)) {
			this.utils.showNotification("You can't add the same product more than once.", "warning")
		} else {
			$("#requestProductsLabel").html("Requested Products");
			var newObj = this.requests.emptyRequestDetail();
			newObj.productId = el.target.id;
			// newObj.sessionId = this.sessionId;
			// newObj.courseId = this.courseId;
			this.requests.selectedRequest.requestDetails.push(newObj);
			this.products.selectedProductFromId(newObj.productId);
			this.requests.selectedRequest.requestDetails[this.requests.selectedRequest.requestDetails.length - 1].productName = this.products.selectedProduct.name;
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
								this.requests.selectedRequest.requestDetails.splice(i, 1);
							}
						});
					}
					break;
				} else {
					this.requests.selectedRequest.requestDetails.splice(i, 1);
					break;
				}
			}
		}
	}

	_buildRequest() {
		if (this.requests.selectedRequest._id) {
			this.requests.selectedRequest.requestDetailsToSave = this.requests.selectedRequest.requestDetails;
			this.requests.selectedRequest.requestDetailsToSave.forEach((item, index) => {
				if (item.requestStatus != this.config.ASSIGNED_REQUEST_CODE) item.requestStatus = this.config.UPDATED_REQUEST_CODE;
			})
			this.requests.selectedRequest.requestStatus = this.config.UPDATED_REQUEST_CODE;
		} else {
			this.requests.selectedRequest.requestStatus = this.config.UNASSIGNED_REQUEST_CODE;
		}
		this.requests.selectedRequest.institutionId = this.selectedInstitution;
	}

	async save() {
		if (this.validation.validate(1)) {
			this._buildRequest();
			let serverResponse = await this.requests.saveRequest({});
			if (!serverResponse.status) {
				this.utils.showNotification("The product request was updated");
				this.systemSelected = false;
			}
			this._cleanUp();
		}
	}

	_cleanUp() {
		this.requests.selectRequest();
		this.institutionSelected = false;
		this.selectedInstitution = "";
		this.personSelected = false
		this.typeSelected = false;
		if (!this.config.SANDBOX_USED) {
			this.typeSelected = true;
			this.regularClient = true;
			this.requestType = "regularCourse";
		}
		this.sandBoxClient = false;
		$("#existingRequestInfo").hide();
		this.requestType = -1;
	}

	async changeInstitution(el) {
		await this.people.selectInstitutionByID(this.selectedInstitution);
		this.institutionSelected = true;
		if (!this.config.SANDBOX_USED) {
			this.typeSelected = true;
			this.regularClient = true;
			this.requestType = "regularCourse";
		}
		this.selectedPerson = "";
		this.requestType = "";
		$("#existingRequestInfo").empty().hide();
		await this.requests.getAPJInstitutionRequests('?filter=institutionId|eq|' + this.selectedInstitution, true);
		if (!this.requests.apjInstitutionRequestArray.length) {
			this.requests.selectRequest();
		} else {
			this.requests.selectRequest(0);
		}
	}

	changePerson(el) {
		this.personSelected = true;
		this.people.selectedPersonFromId(this.selectedPerson, 'i');
		if (!this.config.SANDBOX_USED) {
			this.people.getCoursesArray(true, '?filter=personId|eq|' + this.selectedPerson + '&order=number', true);
		}
	}

	changeRequestType(el) {
		switch (this.requestType) {
			case -1:
				if (!this.config.SANDBOX_USED) {
					this.typeSelected = true;
					this.regularClient = true;
					this.requestType = "regularCourse";
				}
				break;
			case "regularCourse":
				this.typeSelected = true;
				this.regularClient = true;
				this.requestType = "regularCourse";
				this.people.getCoursesArray(true, '?filter=personId|eq|' + this.selectedPerson + '&order=number', true);
				break;
			case "sandboxCourse":
				this.courseId = this.config.SANDBOX_ID;
				this.sandBoxClient = true;
				this.regularClient = false;
				break;
		}
	}

	// async getRequests() {
	// 	// await this._unLock();
	// 	if (this.sessionId != -1 && this.courseId != -1) {
	// 		this.ILockedIt = false;
	// 		this.existingRequest = false;
	// 		await this.requests.getClientRequestsArray('?filter=[and]personId|eq|' + this.selectedPerson + ':sessionId|eq|' + this.sessionId + ':courseId|eq|' + this.courseId, true);
	// 		if (this.requests.requestsArray && this.requests.requestsArray.length > 0) {
	// 			this.requests.selectRequest(0);
	// 			this.setDates(false);
	// 			// await this._lock();
	// 			this.ILockedIt = true;
	// 			this.existingRequest = true;
	// 			if (this.requests.requestsArray && this.requests.requestsArray.length > 0) {
	// 				let dateFoo = moment(new Date(this.requests.selectedRequest.requestDetails[0].createdDate)).format(this.config.DATE_FORMAT_TABLE);
	// 				let existingMsg = this.siteInfo.selectMessageByKey('EXISTING_REQUEST_MESSAGE').content.replace('DATECREATED', dateFoo);
	// 				$("#existingRequestInfo").html('').append(existingMsg).fadeIn();
	// 			} else {
	// 				$("#existingRequestInfo").empty().hide();
	// 			}
	// 		} else {
	// 			$("#existingRequestInfo").empty().hide();
	// 			this.setDates(true);
	// 			this.existingRequest = false;
	// 			this.requests.selectRequest();
	// 			this.requests.selectedRequest.sessionId = this.sessionId;
	// 		}

	// 	} else {
	// 		this.existingRequest = false;
	// 	}
	// }

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

	setDates(session) {
		if (session) {
			$("#input-startDate").val("")
			$("#input-endDate").val("")
		}
		this.minStartDate = this.sessions.selectedSession.startDate;
		this.maxStartDate = this.sessions.selectedSession.endDate;
		this.minEndDate = this.sessions.selectedSession.startDate;
		this.maxEndDate = this.sessions.selectedSession.endDate;

		var nowPlusLeeway = moment(new Date()).add(this.config.REQUEST_LEEWAY, 'days');
		this.minRequiredDate = moment.max(nowPlusLeeway, moment(this.sessions.selectedSession.startDate));
		this.minRequiredDate = moment(this.minRequiredDate._d).format('YYYY-MM-DD');
		this.maxRequiredDate = this.sessions.selectedSession.endDate;
	}

	_setUpValidation() {
		this.validation.addRule(1, "institution", [
			{
				"rule": "custom", "message": "Select an institution",
				"valFunction": function (context) {
					return !(context.selectedInstitution == "");
				}
			}

		]);
		// this.validation.addRule(1, "faculty", [
		// 	{
		// 		"rule": "custom", "message": "Select a person",
		// 		"valFunction": function (context) {
		// 			return !(context.selectedPerson == "");
		// 		}
		// 	}

		// ]);
		// this.validation.addRule(1, "startDateError", [
		// 	{
		// 		"rule": "required", "message": "Select a date",
		// 		"value": "requests.selectedRequest.startDate"
		// 	}
		// ]);
		// this.validation.addRule(1, "endDateError", [
		// 	{
		// 		"rule": "required", "message": "Select a date",
		// 		"value": "requests.selectedRequest.endDate"
		// 	}
		// ]);

		// this.validation.addRule(1, "requestType", [{
		// 	"rule": "custom", "message": "Select a request type",
		// 	"valFunction": function (context) {
		// 		return !(context.requestType == "");
		// 	}
		// }]);
		// this.validation.addRule(1, "numberOfStudentsError", [{
		// 	"rule": "custom", "message": "Enter either the number of undergradate or graduate students",
		// 	"valFunction": function (context) {
		// 		if (context.requestType === "sandboxCourse" || context.requestType === "") {
		// 			return true;
		// 			// } else if(($("#undergraduates").val() === "" || $("#undergraduates").val() == 0) && ($("#graduates").val() === "" || $("#graduates").val() == 0)){
		// 		} else if (context.requests.selectedRequest.undergradIds == 0 && context.requests.selectedRequest.graduateIds == 0) {
		// 			return false;
		// 		} else {
		// 			return true;
		// 		}
		// 	}
		// }]);
		// this.validation.addRule(1, "productList", [{
		// 	"rule": "custom", "message": "Select at least one product",
		// 	"valFunction": function (context) {
		// 		if (context.requests.selectedRequest.requestDetails.length === 0) {
		// 			return false;
		// 		} else {
		// 			return true;
		// 		}
		// 	}
		// }
		// ]);
		this.validation.addRule(1, "productListTable", [{
			"rule": "custom", "message": "Enter all required dates",
			"valFunction": function (context) {
				for (var i = 0; i < context.requests.selectedRequest.requestDetails.length; i++) {
					if (!context.requests.selectedRequest.requestDetails[i].requiredDate || context.requests.selectedRequest.requestDetails[i].requiredDate === "") {
						return false;
					}
				}
				return true;
			}
		}]);
		// this.validation.addRule(5, "number", [
		// 	{ "rule": "required", "message": "Enter the course number", "value": "people.selectedCourse.number" },
		// 	{ "rule": "required", "message": "Enter the course name", "value": "people.selectedCourse.name" }
		// ]);
	}

}