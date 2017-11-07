import { inject } from 'aurelia-framework';
import { DataTable } from '../../../resources/utils/dataTable';
import { Sessions } from '../../../resources/data/sessions';
import { Products } from '../../../resources/data/products';
import { Systems } from '../../../resources/data/systems';
import { ClientRequests } from '../../../resources/data/clientRequests';
import { AppConfig } from '../../../config/appConfig';
import { People } from '../../../resources/data/people';

import Flatpickr from 'flatpickr';

@inject(AppConfig, People, DataTable,  Sessions, Products, ClientRequests, Systems)
export class ViewUserRequests {
	sessionSelected = false;
	spinnerHTML = "";
	configDate = {};

	constructor( config, people,  datatable, sessions, products, requests, systems) {
		this.config = config;
		this.people = people;
		this.dataTable = datatable;
		this.dataTable.initialize(this);
		this.sessions = sessions;
		this.products = products;
		this.requests = requests;
		this.systems = systems;

		this.userObj = JSON.parse(sessionStorage.getItem('user'));;

	};

	async activate() {
		let responses = await Promise.all([
			this.sessions.getSessionsArray('?order=startDate:DSC', true),
			this.products.getProductsArray('?filter=active|eq|true&order=name', true),
			this.people.getInstitutionsArray('?filter=institutionStatus|eq|01&order=name'),
			this.systems.getSystemsArray(),
			this.config.getConfig()
		]);

		this.requests.selectRequest()
		this.filterList();
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

	/*******************************************************************
	 * User changes the session
	 * el - event object
	 ******************************************************************/
	async changeSession(el) {
		if (this.sessionId == "") {
			//Drop down list changed to no session selected
			this.sessionSelected = false;
		} else {
			this.sessionSelected = true;
			this.sessions.selectSessionById(this.sessionId);
			// this.sessions.selectSession(el.target.selectedIndex - 1);
			this.getRequests();
		}
	}

	changeInstitution(el) {
		console.log(this.selectedInstitution)
		this.institutionSelected = true;
		this.personSelected = false;
		this.selectedPerson = "";
		 $("#existingRequestInfo").empty().hide();
		this.people.getInstitutionPeople('?filter=institutionId|eq|' + this.selectedInstitution + '&order=lastName', true);
	}

	changePerson(el) {
		this.personSelected = true;
		this.people.selectedPersonFromId(this.selectedPerson, 'i');
	}

	async getRequests() {
		if (this.personSelected) {
			  await this.requests.getClientRequestsArray('?filter=[and]sessionId|eq|' + this.sessions.selectedSession._id + ':personId|eq|' + this.people.selectedPerson._id, true);
			  if(this.requests.requestsArray && this.requests.requestsArray.length){
				this.dataTable.updateArray(this.requests.requestsArray);
				this.noRequests = false;
			  } else { 
				this.noRequests = true;
			  }
		  } 
	}

	async refresh() {
		await this._unLock();
		this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
		await this.getRequests();
		this.spinnerHTML = "";
	  }
	
	  async edit(product, el, index) { 
		this.requestSelected = true;
		this.selectedDetailIndex = index;
		this.showDetails = true;
		this.requests.setTheSelectedRequestDetail(product); 
		this.customerActionRequired = this.requests.selectedRequestDetail.requestStatus == this.config.CUSTOMER_ACTION_REQUEST_CODE;
		this.requests.selectRequstById(product.requestId);
		this.customerMessage = this.requests.selectedRequest.customerMessage ? this.requests.selectedRequest.customerMessage : ""; 
		this.sessions.selectSessionById(this.requests.selectedRequest.sessionId);
		this.products.selectedProductFromId(this.requests.selectedRequestDetail.productId);
	   
		if(this.requests.selectedRequestDetail.assignments.length){
		  this.selectedAssignmentIndex = 0;
		  this.systems.selectedSystemFromId(this.requests.selectedRequestDetail.assignments[this.selectedAssignmentIndex].systemId);
		}
	
		this.selectedRowAss = $("#assignmentTable").closest('tr');
		
		if (this.selectedRow) this.selectedRow.children().removeClass('info');
		this.selectedRow = $(el.target).closest('tr');
		this.selectedRow.children().addClass('info')
	  }
	
	  back(){
		 this.requestSelected = false;
	  }
}