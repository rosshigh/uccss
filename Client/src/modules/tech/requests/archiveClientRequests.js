import {inject} from 'aurelia-framework';
import {DataTable} from '../../../resources/utils/dataTable';
import {Sessions} from '../../../resources/data/sessions';
import {Systems} from '../../../resources/data/systems';
import {Products} from '../../../resources/data/products';
import {ClientRequests} from '../../../resources/data/clientRequests';
import {AppConfig} from '../../../config/appConfig';
import {Utils} from '../../../resources/utils/utils';
import {People} from '../../../resources/data/people';

import moment from 'moment';

@inject( AppConfig,   DataTable, Utils, Sessions, Products, Systems, People, ClientRequests)
export class ArchiveRequests {
	requestSelected = false;
	title="Tech Staff Client Assignments";
	spinnerHTML = "";
	isCheckedAssigned = true;

    constructor( config, datatable, utils, sessions, products, systems, people, requests) {
        this.config = config;

        this.dataTable = datatable;
        this.dataTable.initialize(this);
        this.utils = utils;
        this.sessions = sessions;
        this.products = products;
        this.clientRequests = requests;
        this.systems = systems;
        this.people = people;

         this.userObj = JSON.parse(sessionStorage.getItem('user'));
	};
		
	attached(){
        $('[data-toggle="tooltip"]').tooltip();
    }
    
    async activate() { 
        let responses = await Promise.all([
            this.sessions.getSessionsArray('?filter=sessionStatus|eq|Closed&order=sortOrder', true),
            this.products.getProductsArray('?filter=active|eq|true&order=name'),
            this.systems.getSystemsArray(),
            this.config.getConfig()
        ]);
         let uccRoles = "";
		this.config.ROLES.forEach(item => {
			if(item.UCConly) uccRoles += item.role + ":";
        });
        this.people.getUCCStaff(uccRoles);
        
        this.selectedSession = this.sessions.sessionsArray[0]._id;
        this.getRequests();
	}
	
	async getRequests() {
        if (this.selectedSession) {
            this.sessions.selectSessionById(this.selectedSession);
            await this.clientRequests.getClientRequestsDetailsArray('?filter=sessionId|eq|' + this.selectedSession, true);
            if(this.clientRequests.requestsDetailsArray && this.clientRequests.requestsDetailsArray.length){
                this.clientRequests.requestsDetailsArray.forEach(item => {
                    if(item.requestId && item.requestId.courseId === null) item.requestId.courseId = {_id: this.config.SANDBOX_ID, name: this.config.SANDBOX_NAME};
                })
                this.dataTable.updateArray(this.clientRequests.requestsDetailsArray);
            } else {
                this.displayArray = new Array();
            }
        } else {
            this.displayArray = new Array();
        }
        // this.clearFilters();
	}

	async refresh() {
        this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
        await this.getRequests();
        this.spinnerHTML = "";
    }

    selectARequest(index,el, request){
        this.editIndex = this.dataTable.getOriginalIndex(index);
        this.selectedRequestDetail = this.utils.copyObject(request);
		this.productId = this.selectedRequestDetail.productId._id;
        this.products.selectedProductFromId(this.productId);
        if(this.selectedRequestDetail.assignments && this.selectedRequestDetail.assignments.length > 0) this.systems.selectedSystemFromId(this.selectedRequestDetail.assignments[0].systemId);
        this.idsRequired = parseInt(this.selectedRequestDetail.requestId.graduateIds) + parseInt(this.selectedRequestDetail.requestId.undergradIds);
        this.totalIdsAssigned = 0;
        if(this.selectedRequestDetail.assignments && this.selectedRequestDetail.assignments.length > 0){
            this.selectedRequestDetail.assignments.forEach(item => {
                this.totalIdsAssigned += item.idsAssigned;
            })
        }
        this.idsRemaining = this.idsRequired - this.totalIdsAssigned > 0 ?  this.idsRequired - this.totalIdsAssigned : 0;
        this.requestSelected = true;

        if (this.selectedRow) this.selectedRow.children().removeClass('info');
        this.selectedRow = $(el.target).closest('tr');
        this.selectedRow.children().addClass('info')
    }

    back(){
        this.requestSelected = false;
    }
    
    customNameFilter(value, item, context){
        return item.requestId && item.requestId.personId.fullName.toUpperCase().indexOf(value.toUpperCase()) > -1;
    }

    statusCustomFilter(value, item, context){
        if(item.requestStatus == value) return false;
        return true;
    }

    institutionCustomFilter(value, item, context){
        return item.requestId && item.requestId.institutionId.name.toUpperCase().indexOf(value.toUpperCase()) > -1;
    }

    courseCustomFilter(value, item, context){
        return item.requestId && item.requestId.courseId.name.toUpperCase().indexOf(value.toUpperCase()) > -1;
    }

    customProductNameFilter(value, item, context){
        for(let i = 0; i < context.products.productsArray.length; i++){
            if(item.productId._id == context.products.productsArray[i]._id) {
                return context.products.productsArray[i].name.toUpperCase().indexOf(value.toUpperCase()) > -1;
            }
        }
        return false;
    }

    customCourseSorter(sortProperty, sortDirection, sortArray, context){ 
        return sortArray.sort((a, b) => {
            if(a['requestId']['courseId']['name'] && b['requestId']['courseId']['name']) {
                var result = (a['requestId']['courseId']['name'] < b['requestId']['courseId']['name']) ? -1 : (a['requestId']['courseId']['name'] > b['requestId']['courseId']['name']) ? 1 : 0;
            } else {
                var result = -1;
            }
            return result * sortDirection;
        });
    }

    customInstitutionsSorter(sortProperty, sortDirection, sortArray, context){ 
        return sortArray.sort((a, b) => {
            if(a['requestId']['institutionId']['name'] && b['requestId']['institutionId']['name']) {
                var result = (a['requestId']['institutionId']['name'] < b['requestId']['institutionId']['name']) ? -1 : (a['requestId']['institutionId']['name'] > b['requestId']['institutionId']['name']) ? 1 : 0;
            } else {
                 var result = -1;
            }
            return result * sortDirection;
        });
    }

    customPersonSorter(sortProperty, sortDirection, sortArray, context){ 
        return sortArray.sort((a, b) => {
            if(a['requestId']['personId']['lastName'] && b['requestId']['personId']['lastName']){
                var result = (a['requestId']['personId']['lastName'] < b['requestId']['personId']['lastName']) ? -1 : (a['requestId']['personId']['lastName'] > b['requestId']['personId']['lastName']) ? 1 : 0;
            } else {
                var result = -1;
            }
            return result * sortDirection;
        });
    }

    customRequestStatusSorter(sortProperty, sortDirection, sortArray, context){ 
        return sortArray.sort((a, b) => {
			var result = (a[sortProperty] < b[sortProperty]) ? -1 : (a[sortProperty] > b[sortProperty]) ? 1 : 0;
			return result * sortDirection;
		});
    }
	
}