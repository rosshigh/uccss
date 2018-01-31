import {inject} from 'aurelia-framework';
import {CommonDialogs} from '../../../resources/dialogs/common-dialogs';
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

@inject( AppConfig, Validation, CommonDialogs, DataTable, Utils, Sessions, Products, Systems, People, ClientRequests)
export class Assignments {
	requestSelected = 'table';
	title="Tech Staff Client Assignments";
	spinnerHTML = "";
    isCheckedAssigned = true; 
    noRequests = true;
    // showTemplates = false;
    sortProperty = '';
    sortDirection;

    constructor( config, validation, dialog, datatable, utils, sessions, products, systems, people, requests) {
        this.config = config;
        this.validation = validation;
        this.validation.initialize(this);
        this._setUpValidation();
        this.dataTable = datatable;
        this.dataTable.initialize(this);
        this.utils = utils;
        this.sessions = sessions;
        this.products = products;
        this.clientRequests = requests;
        this.systems = systems;
        this.people = people;
        this.dialog = dialog;

         this.userObj = JSON.parse(sessionStorage.getItem('user'));
	};
		
	attached(){
        $('[data-toggle="tooltip"]').tooltip();
    }
    
    async activate() { 
        let responses = await Promise.all([
            this.sessions.getSessionsArray('?filter=[in]sessionStatus[list]Active:Requests&order=startDate', true),
            this.products.getProductsArray('?filter=active|eq|true&order=name', true),
            this.systems.getSystemsArray('', true),
            this.config.getConfig(true)
        ]);
         let uccRoles = "";
		this.config.ROLES.forEach(item => {
			if(item.UCConly) uccRoles += item.role + ":";
        });
        this.people.getUCCStaff(uccRoles);
        this.sendEmail = this.config.SEND_EMAILS;
        this.manualMode = localStorage.getItem('manualMode')  ? localStorage.getItem('manualMode') == "true" : false;
        this.unassignedOnly = localStorage.getItem('unassignedOnly')  ? localStorage.getItem('unassignedOnly') == "true" : false;
        this.facultyDetails = localStorage.getItem("facultyDetails") ? localStorage.getItem("facultyDetails") == "true" : false;;
        this.numberOfFacIDs = this.config.DEFAULT_FACULTY_IDS;
        this.selectedSession = this.sessions.sessionsArray[0]._id;
        this.getRequests();
	}
	
	async getRequests() {
        if (this.selectedSession) {
            this.sessions.selectSessionById(this.selectedSession);
            await this.clientRequests.getClientRequestsDetailsArray('?filter=sessionId|eq|' + this.selectedSession, true);
            if(this.clientRequests.requestsDetailsArray && this.clientRequests.requestsDetailsArray.length){
                this.noRequests = false;
                this.clientRequests.requestsDetailsArray.forEach(item => {
                    if(item.requestId && item.requestId.courseId === null) item.requestId.courseId = {_id: this.config.SANDBOX_ID, name: this.config.SANDBOX_NAME};
                })
                this.dataTable.updateArray(this.clientRequests.requestsDetailsArray);
                this.filterInAssigned();
            } else {
                this.noRequests = true;
                this.displayArray = new Array();
            }
        } else {
            this.displayArray = new Array();
        }
        this.clearFilters();
	}

	async refresh() {
        this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
        await this.getRequests();
        this.spinnerHTML = "";
    }

	editRequest(index, request){
		this.editIndex = index;
        this.selectedRequestDetail = this.utils.copyObject(request);
        this.products.selectedProductFromId(this.selectedRequestDetail.productId._id);
        this.editStartDate = this.selectedRequestDetail.requestId.startDate;
        this.originalRequestDetail = this.utils.copyObject(this.selectedRequestDetail);

        this.requestSelected = 'edit'; 
    }

    backEdit(){
        this.requestSelected = 'table';
	}
	
	async saveEdit(){
        var email = {};
        this.buildAuditDetail();
        this.clientRequests.setTheSelectedRequestDetail(this.selectedRequestDetail);
        let serverResponse = await this.clientRequests.saveRequestDetail();
        if (!serverResponse.error) {
            this.utils.showNotification("The request was updated");
            this.dataTable.updateArrayMaintainFilters(this.clientRequests.requestsDetailsArray);
            this.reSort();
            this.dataTable.applyFilters();
            this.filterInAssigned();
            this._cleanUp();
        }

    }

    buildAuditDetail(){
        var obj = this.selectedRequestDetail;
        if(obj.productId != this.originalRequestDetail.productId._id){
            this.selectedRequestDetail.requestId.audit.push({
                property: "productId",
                eventDate: new Date(),
                oldValue: this.originalRequestDetail.productId._id,
                newValue: obj.productId._id,
                personId: this.userObj._id
            })
        }
        if(obj.requestStatus != this.originalRequestDetail.requestStatus){
            this.selectedRequestDetail.requestId.audit.push({
                property: 'requestStatus',
                eventDate: new Date(),
                oldValue: this.originalRequestDetail.requestStatus,
                newValue: obj.requestStatus,
                personId: this.userObj._id
            })
        }
        if(obj.requestId.undergradIds != this.originalRequestDetail.requestId.undergradIds){
            this.selectedRequestDetail.requestId.audit.push({
                property: "undergradIds",
                eventDate: new Date(),
                oldValue: this.originalRequestDetail.requestId.undergradIds,
                newValue: obj.requestId.undergradIds,
                personId: this.userObj._id
            })
        }
        if(obj.requestId.graduateIds != this.originalRequestDetail.requestId.graduateIds){
            this.selectedRequestDetail.requestId.audit.push({
                property: "graduateIds",
                eventDate: new Date(),
                oldValue: this.originalRequestDetail.requestId.graduateIds,
                newValue: obj.requestId.graduateIds,
                personId: this.userObj._id
            })
        }
        if(obj.requestId.startDate != this.originalRequestDetail.requestId.startDate){
            this.selectedRequestDetail.requestId.audit.push({
                property: 'startDate',
                eventDate: new Date(),
                oldValue: this.originalRequestDetailrequestId.startDate,
                newValue: obj.requestId.startDate,
                personId: this.userObj._id
            })
        }
        if(obj.requestId.endDate != this.originalRequestDetail.requestId.endDate){
            this.selectedRequestDetail.requestId.audit.push({
                property: 'endDate',
                eventDate: new Date(),
                oldValue: this.originalRequestDetail.requestId.endDate,
                newValue: obj.requestId.endDate,
                personId: this.userObj._id
            })
        }
        if(obj.requiredDate != this.originalRequestDetail.requiredDate){
            this.selectedRequestDetail.requestId.audit.push({
                property: "requiredDate",
                eventDate: new Date(),
                oldValue: this.originalRequestDetail.requiredDate,
                newValue: obj.requiredDate,
                personId: this.userObj._id
            })
        }
         if(obj.requestId.courseId != this.originalRequestDetail.requestId.courseId){
            this.selectedRequestDetail.requestId.audit.push({
                property: 'courseId',
                eventDate: new Date(),
                oldValue: this.originalRequestDetail.requestId.courseId,
                newValue: obj.requestId.courseId,
                personId: this.userObj._id
            })
        }
	}
	
	 // /*****************************************************************************************************
    //  * User selected a requests table
    //  * index - index of the item selected
    //  * el - event object
    //  * request - the selected request object
    //  ****************************************************************************************************/
    async selectARequest(index, el, request) {
        let response = await this.clientRequests.getRequestDetail(request._id);
        if(!response.error){
            this.selectedRequestDetail = response;
            if(this.selectedRequestDetail.requestId && this.selectedRequestDetail.requestId.courseId === null) this.selectedRequestDetail.requestId.courseId = {_id: this.config.SANDBOX_ID, name: this.config.SANDBOX_NAME};
            this.originalRequestDetail = this.utils.copyObject(this.selectedRequestDetail);
        }
        //Initiate temp arrays to hold selected clients and assignment details
        this.proposedClient = new Array();
        this.assignmentDetails = new Array();
        this.profileRequest = undefined;
        this.forceManual = false;
        this.manualMode = localStorage.getItem('manualMode')  ? localStorage.getItem('manualMode') == "true" : false;

        //Initiate interface flags
        this.requestSelected = 'form';
        if(this.manualMode) $(this.proposedIDRange).focus();

        // //Retrieve relevant data
        this.editIndex = this.dataTable.getOriginalIndex(index);
        // this.selectedRequestDetail = this.utils.copyObject(request);
        // this.originalRequestDetail = this.utils.copyObject(request);
		this.productId = this.selectedRequestDetail.productId._id;
        this.products.selectedProductFromId(this.productId);

        this.provisionalAssignment = this.selectedRequestDetail.requestStatus == this.config.PROVISIONAL_REQUEST_CODE;
        this.oldRequest = this.utils.copyObject(this.selectedRequestDetail);
        
        if(!this.products.selectedProduct.systems[0]){
             this.utils.showNotification("You need to assign a system to this product before you can assign this request");
        } else {
            let systemConfigured = false;
            this.session = this.sessions.selectedSession.session;
            this.productSystems = new Array();
            this.products.selectedProduct.systems.forEach(item => {
                this.systems.selectedSystemFromId(item.systemId);
                if(this.systems.selectedSystem && this.systems.selectedSystem.sessions.indexOf(this.session) > -1) {
                    this.systemConfigured = true;
                    this.productSystems.push(this.systems.selectedSystem);
                }
            });
            this.productSystems = this.productSystems.sort((a, b) => {
                return (a['sid'] < b['sid']) ? -1 : (a['sid'] > b['sid']) ? 1 : 0;
            });
             if(!this.systemConfigured){
                this.utils.showNotification("You need to assign a system to this product before you can assign this request");
             } 
        }

         //If the product has a system configured, select the first system on the list
       
        if(this.productSystems && this.productSystems.length > 0) {
			this.systems.selectedSystemFromId(this.productSystems[0]._id);
			//Select the system in the interface
            this.selectedSystemId = this.systems.selectedSystem._id;
            this.clientsConfigured = false;
            for(let i = 0; i < this.systems.selectedSystem.clients.length; i++){
                if(this.systems.selectedSystem.clients[i].productId === this.products.selectedProduct._id){
                    this.clientsConfigured = true;
                    break;
                }
            }    
        }
        
        this.clientRequired();

        if (this.selectedRow) this.selectedRow.children().removeClass('info');
        this.selectedRow = $(el.target).closest('tr');
        this.selectedRow.children().addClass('info')
	}
	
	clientRequired(){
		
		//Parse id templates into an array
        this.studentIDTemplates = this.products.selectedProduct.defaultStudentIdPrefix ? this.products.selectedProduct.defaultStudentIdPrefix.split(":") : new Array();
        this.facultyIDTemplates = this.products.selectedProduct.defaultFacultyIdPrefix ? this.products.selectedProduct.defaultFacultyIdPrefix.split(":") : new Array();

        if(this.studentIDTemplates.length === 0){
            this.forceManual = true;
            this.manualMode = true;
        }
		
		//Booleans to determine whether the id templates exist: they are present, contain a wildcard and, for faculty ids, the request isn't a sandbox
        this.studentIDTemplateAvailable = this.studentIDTemplates.length > 0 && this.products.selectedProduct.defaultStudentIdPrefix.indexOf(this.config.ID_WILDCARD) != -1; 
        this.facultyIDTemplateAvailable = this.facultyIDTemplates.length > 0
            && this.products.selectedProduct.defaultFacultyIdPrefix.indexOf(this.config.ID_WILDCARD) != -1
            && this.selectedRequestDetail.requestId.courseId._id !== this.config.SANDBOX_ID;

        //Check if the request is a sandbox request
        if (this.selectedRequestDetail.requestId.courseId._id === this.config.SANDBOX_ID) {
            this.idBuffer = localStorage.getItem('idSandboxBuffer')  ? localStorage.getItem('idSandboxBuffer') : this.config.SANDBOX_ID_BUFFER;
            this.numberOfIds = localStorage.getItem('sandBoxIDs')  ? localStorage.getItem('sandBoxIDs') : this.config.SANDBOX_ID_COUNT;
            this.sandBoxOnly = false;
        } else {
            this.idBuffer = localStorage.getItem('idBuffer')  ? localStorage.getItem('idBuffer') : this.config.REGULAR_ID_BUFFER;
            this.selectedRequestDetail.requestId.graduateIds = this.selectedRequestDetail.requestId.graduateIds === null ? 0 : this.selectedRequestDetail.requestId.graduateIds;
            this.selectedRequestDetail.requestId.undergradIds = this.selectedRequestDetail.requestId.undergradIds === null ? 0 : this.selectedRequestDetail.requestId.undergradIds;
            this.numberOfIds = parseInt(this.selectedRequestDetail.requestId.graduateIds)
                + parseInt(this.selectedRequestDetail.requestId.undergradIds);
            this.sandBoxOnly = false;
        }

        //Check to see if an assignment has already been made
        if (!this.selectedRequestDetail.assignments || this.selectedRequestDetail.assignments.length == 0) {
            //No assignment has been made
            this.selectedRequestDetail.techComments = this.products.selectedProduct.productInfo ? this.products.selectedProduct.productInfo : "";
            this.idsRequired = parseInt(this.numberOfIds) + parseInt(this.idBuffer);
            this.idsRemaining = this.idsRequired;
            this.existingRequest = false;
            this.totalIdsAssigned = 0;
            this.idsAssigned = 0;
            this.assignmentDetails = new Array();
        } else {
            //An assignment has already been made
            this.existingRequest = true;
            this.unassignedOnly = false;
            this.idsAssigned = this.selectedRequestDetail.idsAssigned;
            this.idsRequired = parseInt(this.numberOfIds)
            this.numberOfIds = this.numberOfIds - this.idsAssigned > 0 ? this.numberOfIds - this.idsAssigned : 0;
            this.totalIdsAssigned = this.idsAssigned;
            this.idsRemaining = this.idsRequired - this.idsAssigned > 0 ? this.idsRequired - this.idsAssigned : 0;
            this.assignmentDetails = this.selectedRequestDetail.assignments;
            this.findAssignedClients(); 
        }

        this.assignmentDetailIndex = -1;
        
        this.calcLastID();
	}
	
	findAssignedClients(){
        this.assignmentDetails.forEach(item => {
            this.systems.selectClientFromIDNoSystem(item.systemId, item.client);
            this.proposedClient.push(this.systems.selectedClient);
        })
	}
	
	// /*****************************************************************************************************
    //  * Calculate the last id when a client is selected
    //  ****************************************************************************************************/
    calcLastID() {
        //If the requested ids are more than the product supprts
        if (this.idsRemaining > this.lastIDAvailable) {
            //set the last id to the last id supported by the product
            this.lastID = this.lastIDAvailable;
        } else {
            //set the last id to the first id plus the ids requested
            this.lastID = parseInt(this.firstID) + parseInt(this.idsRemaining);
            // var next10 =  Math.round(this.lastID / 10) * 10 + 10;
            // if(next10 <  this.lastIDAvailable) this.lastID = next10;
        }    
        //Save the last id
        this.oldLastID = this.lastID;
	}

	// /*****************************************************************************************************
    //  * User selected a client in the client list
    //  * index - index of the item selected
    //  * el - event object
    //  * client - the selected client object
    //  ****************************************************************************************************/
    selectClient(index, client, el) {
        let message, okToProcess = true;
        //Don't allow a client to be selected if there are no ids to be assigned
        if (!this.idsRemaining > 0) {
			this.utils.showNotification("There are no more ids required for this request")
		}
        //Make sure the selected client is compatible with the selected request
        if (this.selectedRequestDetail.requestId.courseId._id === this.config.SANDBOX_ID && client.clientStatus != this.config.SANDBOX_CLIENT_CODE) {
            message = "The request is for a sandbox and the client isn't a sandbox client.  Are you sure you want to assign it?";
        }
        if (this.selectedRequestDetail.requestId.courseId._id != this.config.SANDBOX_ID && client.clientStatus == this.config.SANDBOX_CLIENT_CODE) {
            message = "The request is for a regular course and the client is a sandbox client.  Are you sure you want to assign it?";
        }

        if(message){
            return this.dialog.showMessage(
                    message,
                    "Confirm Assignment",
                    ['Yes', 'No']
                ).whenClosed(response => {                      
                    if (response.wasCancelled) {
                        okToProcess = false;
                    } else {
                        this.processClient(index, client, el);
                    }
                });
        } else {
            this.processClient(index, client, el);
        } 
	}
	
	processClient(index, client, el){     
        if(client.manual) {
            this.manualMode = true; 
            this.forceManual = true;
        } else {
            this.forceManual = false;
            this.manualMode = localStorage.getItem('manualMode')  ? localStorage.getItem('manualMode') == "true" : false;
        }
        if(this.manualMode) $(this.proposedIDRange).focus();
        this.lastIDAvailable = this.products.selectedProduct.lastAllowableId ? parseInt(this.products.selectedProduct.lastAllowableId) : parseInt(this.products.selectedProduct.idsAvailable)
        
        if(client.firstAllowableID && client.firstAllowableID > 0){
             this.firstID = client.firstAllowableID ? parseInt(client.firstAllowableID) : this.config.FIRST_DEFAULT_ID;
        } else {
            this.firstID = this.products.selectedProduct.firstAllowableId ? parseInt(this.products.selectedProduct.firstAllowableId) : this.config.FIRST_DEFAULT_ID;
        }
        // this.firstID = this.products.selectedProduct.firstAllowableId ? parseInt(this.products.selectedProduct.firstAllowableId) : this.config.FIRST_DEFAULT_ID;
        // this.firstID = client.firstAllowableID ? parseInt(client.firstAllowableID) : this.config.FIRST_DEFAULT_ID;
        this.lastFirstID = this.firstID;
        this.firstAllowableID = this.firstID;
        this.firstNumericFacID = this.firstID;
        this.lastNumericFacID =  this.firstNumericFacID + this.numberOfFacIDs - 1;

		//Make sure the client hasn't already been selected
		let alreadySelected = false;
		this.assignmentDetails.forEach(item => {
			if(item.systemId === client.systemId && item.client === client.client) alreadySelected = true;
		})
		if(alreadySelected) return;

		//Save the client so we can update it
		this.proposedClient.push(client);

		//Look for the highest assigned id and set the first id equal to that plus the id buffer
		if(client.assignments.length > 0){
			let maxId = 0;
			client.assignments.forEach(item => {
				if(parseInt(item.lastID) > parseInt(maxId)) maxId = parseInt(item.lastID);
			});
			this.firstID = parseInt(maxId) + parseInt(this.idBuffer);
		}

		//Save the first id 
		this.lastFirstID = this.firstID;
		this.firstNumericFacID = client.lastFacIdAssigned == 0 ? parseInt(client.lastFacIdAssigned) : parseInt(client.lastFacIdAssigned) + parseInt(this.config.FACULTY_ID_BUFFER);
		this.lastNumericFacID =  this.firstNumericFacID + this.config.DEFAULT_FACULTY_IDS;
		
		this.calcLastID();
		
		//Create a new assignment
		this.assignmentDetails.push({
			staffId : this.userObj._id, 
			client : client.client,
			systemId : client.systemId,
			firstID: this.firstID,
			lastID : this.lastID,
			firstFacID: this.firstNumericFacID,
			lastFacID: this.lastNumericFacID,
			firstFacIdAssigned:  this.firstNumericFacID,
			lastFacIdAssigned:  this.lastNumericFacID,
			idsAssigned : parseInt(this.lastID) - parseInt(this.firstID)
		});
		//Calculate the total ids assigned so far
		this.totalIdsAssigned = parseInt(this.totalIdsAssigned) + parseInt(this.lastID) - parseInt(this.firstID);
		this.assignmentDetailIndex = this.assignmentDetails.length - 1;
		
		//Calculate the user ids and passwords
		if(this.studentIDTemplates.length)
		{
			this.calcAssignment();
			this.idsRemaining = parseInt(this.idsRemaining) - this.assignmentDetails[this.assignmentDetailIndex].idsAssigned;
		}
			
		this.clientSelected = true;
		this.enableButton = true;
		
		if (this.selectedRow) this.selectedRow.children().removeClass('info');
		this.selectedRow = $(el.target).closest('tr');
		this.selectedRow.children().addClass('info')
	}
	
	calcAssignment() {
        this.calcIDRangeFromTemplate();
        this.calculatePasswords();
    }

    // /*****************************************************************************************************
    //  * Calculates the student and faculty id ranges from the configured id template
    //  ****************************************************************************************************/
    calcIDRangeFromTemplate() {
        //If the user has selected manual mode or no assignment is selected, skip the calculation
        if(this.manualMode || this.assignmentDetailIndex == -1 ){
            return;
        }
        //If there is no template, set the range to empty string
        if (!this.studentIDTemplateAvailable) {
            this.assignmentDetails[this.assignmentDetailIndex].studentUserIds = this.products.selectedProduct.defaultStudentIdPrefix ? this.products.selectedProduct.defaultStudentIdPrefix : "";
        } else {
            //Determine if user has selected a template and if not, select the first one
            var selectedStudentIDTemplates = new Array();
            if (this.selectedStudentIDTemplate.length == 0){
              selectedStudentIDTemplates.push(this.studentIDTemplates[0]);  
            } else {
               for(var k = 0; k < this.selectedStudentIDTemplate.length; k++){
                   selectedStudentIDTemplates.push(this.studentIDTemplates[parseInt(this.selectedStudentIDTemplate[k])]); 
               } 
            }
            //For each selected template, calculate the id range and add them to the ids allocated
            this.assignmentDetails[this.assignmentDetailIndex].studentUserIds = "";
            for (var i = 0; i < selectedStudentIDTemplates.length; i++) {
                var firstStudentId = this.getID(selectedStudentIDTemplates[i], this.firstID);
                var lastStudentId = this.getID(selectedStudentIDTemplates[i], this.lastID);
                this.assignmentDetails[this.assignmentDetailIndex].studentUserIds += firstStudentId + " to " + lastStudentId + ":";
            }
            //Strip off the last colon
             this.assignmentDetails[this.assignmentDetailIndex].studentUserIds = this.assignmentDetails[this.assignmentDetailIndex].studentUserIds.substring(0,this.assignmentDetails[this.assignmentDetailIndex].studentUserIds.length-1);
             this.assignmentDetails[this.assignmentDetailIndex].notValid = this.validateIDRange(this.proposedClient[this.assignmentDetailIndex],  this.assignmentDetails[this.assignmentDetailIndex], this.selectedRequestDetail._id) ? '' : 'danger' ;
             if(this.assignmentDetails[this.assignmentDetailIndex].notValid != 'danger') this.validation.makeValid( $("#errorRange"));
        }
        
        this.calcFacIDRangeFromTemplate();

    }
    
    calcFacIDRangeFromTemplate(){
        //If there is no template configured for faculty ids or if this is a sandbox request set the faculty ids to empty string
        if (this.products.selectedProduct.defaultFacultyIdPrefix && this.products.selectedProduct.defaultFacultyIdPrefix.indexOf(this.config.ID_WILDCARD) == -1
            || this.selectedRequestDetail.requestId.courseId._id === this.config.SANDBOX_ID
            || this.facultyIDTemplates.length == 0) {

            if(this.selectedRequestDetail.requestId.courseId._id !== this.config.SANDBOX_ID) this.assignmentDetails[this.assignmentDetailIndex].facultyUserIds = this.products.selectedProduct.defaultFacultyIdPrefix;
        } else {
            var selectedFacultyIDTemplates = new Array();
            if (this.selectedStudentIDTemplate.length == 0){
              selectedFacultyIDTemplates.push(this.facultyIDTemplates[0]);  
            } else {
               for(var k = 0; k < this.selectedStudentIDTemplate.length; k++){
                   selectedFacultyIDTemplate.push(this.facultyIDTemplates[parseInt(this.selectedFacultyIDTemplate[k])]); 
               } 
            }
            
            this.assignmentDetails[this.assignmentDetailIndex].facultyUserIds = "";
            for (var i = 0; i < selectedFacultyIDTemplates.length; i++) {
                var firstFacID = this.getID(selectedFacultyIDTemplates[i], this.assignmentDetails[this.assignmentDetailIndex].firstFacID);
                var lastFacID = this.getID(selectedFacultyIDTemplates[i],  this.assignmentDetails[this.assignmentDetailIndex].lastFacID);
                this.assignmentDetails[this.assignmentDetailIndex].facultyUserIds += firstFacID + " to " + lastFacID + ":";
            }
            //Strip off the last colon
             this.assignmentDetails[this.assignmentDetailIndex].facultyUserIds = this.assignmentDetails[this.assignmentDetailIndex].facultyUserIds.substring(0,this.assignmentDetails[this.assignmentDetailIndex].facultyUserIds.length-1);
        }
    }

    //  /*****************************************************************************************************
    //  * Calculate a user id from a template
    //  * idPrefix -an id template.  Templates are defined for products.
    //  * id - an integer
    //  ****************************************************************************************************/
    getID(idPrefix, id) {
        if (idPrefix) {
            var len = idPrefix.lastIndexOf(this.config.ID_WILDCARD) - idPrefix.indexOf(this.config.ID_WILDCARD) + 1;
            var prefix = "000".substr(0, len - id.toString().length)
            return idPrefix.substr(0, idPrefix.indexOf(this.config.ID_WILDCARD)) + prefix + id;
        }
        return "";
    }

    // /*****************************************************************************************************
    //  * Calculate a password from a template
    //  ****************************************************************************************************/
    calculatePasswords() {
        //If the user selected manual mode or if no assignment is selected, return
        if(this.manualMode || this.assignmentDetailIndex == -1){
            return;
        }
        
        if(this.assignmentDetails.length > 0){
            this.assignmentDetails[this.assignmentDetailIndex].facultyPassword = this.assignmentDetails[0].facultyPassword;
            this.assignmentDetails[this.assignmentDetailIndex].studentPassword =  this.assignmentDetails[0].studentPassword;
        }
            var random;
            var prefix;
            var len;
            //If the product student password template is defined with a wildcard calculate the password 
            if (this.products.selectedProduct.defaultStudentPassword && this.products.selectedProduct.defaultStudentPassword.indexOf(this.config.ID_WILDCARD) != -1) {
                len = this.products.selectedProduct.defaultStudentPassword.lastIndexOf(this.config.ID_WILDCARD) - this.products.selectedProduct.defaultStudentPassword.indexOf(this.config.ID_WILDCARD) + 1;
                prefix = "9" + "000".substr(0, len - 1);
                random = Math.floor(Math.random() * parseInt(prefix));
                this.assignmentDetails[this.assignmentDetailIndex].studentPassword = this.products.selectedProduct.defaultStudentPassword.substr(0, this.products.selectedProduct.defaultStudentPassword.indexOf(this.config.ID_WILDCARD)) + random;
            } else {
                this.assignmentDetails[this.assignmentDetailIndex].studentPassword = this.products.selectedProduct.defaultStudentPassword;
            }
            //Sandbox assignments don't have faculty ids so set the password to empty string
            if (this.selectedRequestDetail.requestId.courseId._id === this.config.SANDBOX_ID) {
                this.assignmentDetails[this.assignmentDetailIndex].facultyPassword = "";
            } else {
                //If the product faculty password template is defined with a wildcard calculate the password
                if (this.products.selectedProduct.defaultFacultyPassword && this.products.selectedProduct.defaultFacultyPassword.indexOf(this.config.ID_WILDCARD) != -1) {
                    len = this.products.selectedProduct.defaultFacultyPassword.lastIndexOf(this.config.ID_WILDCARD) - this.products.selectedProduct.defaultFacultyPassword.indexOf(this.config.ID_WILDCARD) + 1;
                    prefix = "9" + "000".substr(0, len - 1);
                    random = Math.floor(Math.random() * parseInt(prefix));
                    this.assignmentDetails[this.assignmentDetailIndex].facultyPassword = this.products.selectedProduct.defaultFacultyPassword.substr(0, this.products.selectedProduct.defaultFacultyPassword.indexOf(this.config.ID_WILDCARD)) + random;
                } else {
                     this.assignmentDetails[this.assignmentDetailIndex].facultyPassword = this.products.selectedProduct.defaultFacultyPassword;
                }
            }
    }
    
    // /*****************************************************************************************************
    //  * The user changed the first id field
    //  ****************************************************************************************************/
    firstIDChanged() {
        //Make sure the id isn't lower than the first allowable id for the product
        if (this.firstID < this.firstAllowableID) this.firstID = this.firstAllowableID;
        if (parseInt(this.lastID) + parseInt(this.firstID) - parseInt(this.lastFirstID) > this.lastIDAvailable) {
            this.firstID = this.lastFirstID;
            return;
         }

        //Calculate the last id using the difference between the previous firstID and the current firstID
        this.lastID = parseInt(this.lastID) + parseInt(this.firstID) - parseInt(this.lastFirstID);
        
        //If a client has been selected, update the assignment firstID then recalculate the id range
        if (this.assignmentDetailIndex > -1) {
            this.assignmentDetails[this.assignmentDetailIndex].firstID = this.firstID;
            this.assignmentDetails[this.assignmentDetailIndex].lastID = this.lastID;
            this.calcIDRangeFromTemplate();
        }
        //Save the new firstID
        this.lastFirstID = this.firstID;
    }

    // /*****************************************************************************************************
    //  * The user changed the last id field
    //  ****************************************************************************************************/
    lastIDChanged() {
        //Make sure the lastID isn't higher than the last ID available for the product
         if (this.lastID > this.lastIDAvailable) {
            this.lastID = this.lastIDAvailable;
         }
         //Adjust the required ids 
        this.idsRequired = parseInt(this.idsRequired) + parseInt(this.lastID) - parseInt(this.oldLastID);
        //If a client is selected and the assignment has already been saved
        if (this.assignmentDetailIndex > -1) {
            //Adjust the ids assigned
            this.assignmentDetails[this.assignmentDetailIndex].idsAssigned = parseInt(this.assignmentDetails[this.assignmentDetailIndex].idsAssigned) + parseInt(this.lastID) - parseInt(this.oldLastID);
            this.totalIdsAssigned = parseInt(this.totalIdsAssigned) + parseInt(this.lastID) - parseInt(this.oldLastID);
            //Set the lastID in the assignment
            this.assignmentDetails[this.assignmentDetailIndex].lastID = this.lastID;
            this.proposedClient[this.assignmentDetailIndex].lastIdAssigned = this.lastID;
            //Recalculate the id range
            this.calcIDRangeFromTemplate();
        } else {
            //No client selected and no assignment, adjus the ids remaining
            this.idsRemaining = parseInt(this.idsRemaining) + parseInt(this.lastID) - parseInt(this.oldLastID);
        }
        this.oldLastID = this.lastID;
    }
    
    lastFacIDChanged(){
        this.numberOfFacIDs = parseInt(this.lastNumericFacID) - parseInt(this.firstNumericFacID) + 1;
        if (this.assignmentDetailIndex > -1){
            this.proposedClient[this.assignmentDetailIndex].lastFacIdAssigned = parseInt(this.lastNumericFacID);
            this.assignmentDetails[this.assignmentDetailIndex].lastFacID = parseInt(this.lastNumericFacID);
            this.calcFacIDRangeFromTemplate();
        }
        
    }
    
    firstFacIDChanged(){
         this.lastNumericFacID = parseInt(this.firstNumericFacID) + parseInt(this.numberOfFacIDs) - 1;
         if (this.assignmentDetailIndex > -1){
             this.proposedClient[this.assignmentDetailIndex].firstFacIdAssigned =  this.firstNumericFacID;
             this.assignmentDetails[this.assignmentDetailIndex].firstFacID = this.firstNumericFacID;
             this.proposedClient[this.assignmentDetailIndex].lastFacIdAssigned =  this.lastNumericFacID;
             this.assignmentDetails[this.assignmentDetailIndex].lastFacID = this.lastNumericFacID;
             this.calcFacIDRangeFromTemplate();
         }
    }

    /*****************************************************************************************************
     * Check to see if an id range overlaps other assignments in the same client
     ****************************************************************************************************/
    validateIDRange(client, assignment, id){

        if(!client.assignments || client.assignments.length == 0) return true;
        client.assignments.forEach(item => {
            if(item.firstID === null || item.firstID == "" || item.lastID === null || item.lastID === ""){
                return this.dialog.showMessage(
                    "You must enter the ID range manually with this client.", 
                    "Manual Assignment", 
                    ['OK']
                    ).whenClosed(response => {
                       return true;
                    }); 
            }
        })
        var valid = true;
        var x1 = parseInt(assignment.firstID);
        var x2 = parseInt(assignment.lastID);
        for(var i = 0; i < client.assignments.length; i++){
            if(this.existingRequest  && client.assignments[i].assignment == id){
                continue;
            } else {
                var y1 = parseInt(client.assignments[i].firstID);
                var y2 = parseInt(client.assignments[i].lastID)
                if(!(x2 < y1 || x1 > y2)) valid = false;
            }
        }
        return valid;
    }   

	/*****************************************************************************************************
     * The user selects an assignment 
     * index - the index of the selected assignment
     * el - the event object
     ****************************************************************************************************/
    selectProposedClient(index, el) {
        //Save the index 
        // this.assignmentDetailIndex = this.assignmentDetailIndex == -1 ? index : -1;
		this.assignmentDetailIndex = index;
        if(this.assignmentDetailIndex == -1){
            this.selectedAssignedClient = "";
            if (this.selectedRow) this.selectedRow.children().removeClass('info');
        } else {
            this.selectedAssignedClient = this.assignmentDetails[this.assignmentDetailIndex].client;

            //Update the firstID and lastID fileds with the assignment firstID and lastID
            this.firstID = this.assignmentDetails[this.assignmentDetailIndex].firstID;
            this.lastID = this.assignmentDetails[this.assignmentDetailIndex].lastID;
            this.proposedClient[this.assignmentDetailIndex].lastIdAssigned = this.lastID;
            this.firstNumericFacID = this.assignmentDetails[this.assignmentDetailIndex].firstFacID;
            this.lastNumericFacID = this.assignmentDetails[this.assignmentDetailIndex].lastFacID;
            this.proposedClient[this.assignmentDetailIndex].lastFacIdAssigned = this.assignmentDetails[this.assignmentDetailIndex].lastFacID;
            this.oldIdsAssigned = parseInt(this.lastID) - parseInt(this.lastID);
            this.oldLastID = this.lastID;
            this.lastFirstID = this.firstID;
            this.forceManual = this.proposedClient[this.assignmentDetailIndex].manual;
            this.manualMode = this.proposedClient[this.assignmentDetailIndex].manual;

            //Highlight the table row
            if (this.selectedAssignmentRow) this.selectedAssignmentRow.children().removeClass('info');
            this.selectedAssignmentRow = $(el.target).closest('tr');
            this.selectedAssignmentRow.children().addClass('info')
        }
        
    }

    /*****************************************************************************************************
     * The user deletes an assignment 
     * index - the index of the selected assignment
     ****************************************************************************************************/
    async deleteProposedClient(index) {
        //Is this a saved assignment
        if (this.assignmentDetails[index].assignedDate) {
            return this.dialog.showMessage(
                "This will delete the assignment.  Are you sure you want to do that?", 
                "Delete Assignment", 
                ['Yes', 'No']
                ).whenClosed(response => {
                    if(!response.wasCancelled){
                        this.deleteSaved(index);    
                    }
                });               
        } else {
            if(this.forceManual) this.manualMode = false;
            this.forceManual = false;
            //Undo the changes made by the assignment
            this.idsRemaining = parseInt(this.idsRemaining) + parseInt(this.assignmentDetails[index].idsAssigned);
            this.totalIdsAssigned = parseInt(this.totalIdsAssigned) - parseInt(this.assignmentDetails[index].idsAssigned);
            this.assignmentDetailIndex = -1;
            //Delete the assignment and the client
            this.assignmentDetails.splice(index, 1);
			this.proposedClient.splice(index, 1);
			if (this.selectedRow) this.selectedRow.children().removeClass('info');
        }
	}
	
    /*****************************************************************************************************
     * Delete the assignment in the database
     ****************************************************************************************************/
    async deleteSaved(index){
        //Update the client
        this.proposedClient[index].idsAvailable = parseInt(this.proposedClient[index].idsAvailable) + parseInt(this.assignmentDetails[index].idsAssigned);
        this.idsRemaining = parseInt(this.idsRemaining) + parseInt(this.assignmentDetails[index].idsAssigned);
        this.totalIdsAssigned = parseInt(this.totalIdsAssigned) - parseInt(this.assignmentDetails[index].idsAssigned);
        
        for(var i = 0; i<this.proposedClient[index].assignments.length; i++){
            if(this.proposedClient[index].assignments[i].assignment == this.selectedRequestDetail._id){
                this.proposedClient[index].assignments.splice(i,1);
                if(this.proposedClient[index].assignments.length == 0 && this.proposedClient[index].SANDBOX_CLIENT_CODE != this.config.SANDBOX_ID ) this.proposedClient[index].clientStatus = this.config.UNASSIGNED_CLIENT_CODE;
                break;
            }
        }
        this.systems.updateClient(this.proposedClient[index]);
        this.systems. selectedSystemFromId(this.proposedClient[index].systemId);
        this.assignment = this.assignmentDetails[index];
        this.assignmentDetails.splice(index, 1);
        this.proposedClient.splice(index, 1);
        if(this.assignmentDetails.length == 0) this.selectedRequestDetail.requestStatus = this.config.UNASSIGNED_REQUEST_CODE
        
        //Construct the object to submit to the server
        this.selectedRequestDetail.idsAssigned = parseInt(this.selectedRequestDetail.idsAssigned) - parseInt(this.assignment.idsAssigned);
        this.selectedRequestDetail.assignments = this.assignmentDetails;
        this.requestToSave = this.utils.copyObject(this.selectedRequestDetail.requestId);
        this.requestToSave.audit.push({
            property: 'Delete Assignment',
            newValue: JSON.stringify(this.assignment),
            oldValue: this.selectedRequestDetail.productId.name,
            eventDate: new  Date(),
            personId: this.userObj.fullName
        })
        this.requestToSave.requestDetailsToSave = new Array();
        var request = this.utils.copyObject(this.selectedRequestDetail);
        delete request['requestId'];
        this.requestToSave.requestDetailsToSave.push(request);
        
        this.clientRequests.setSelectedRequest(this.requestToSave);
        let serverResponse = await this.clientRequests.deleteAssignment(this.editIndex);  
        if (!serverResponse.status) {
            this.dataTable.updateArrayMaintainFilters(this.clientRequests.requestsDetailsArray);
            this.reSort();
            this.filterInAssigned();
            this.utils.showNotification("The assignment was deleted");
            await this.systems.saveSystem();
           
        }
        this.selectedAssignedClient = "";
	}	
	
   	/**
	* Delete the request
	 */
	delete(){
        if(this.selectedRequestDetail.assignments && this.selectedRequestDetail.assignments.length > 0) {
             return this.dialog.showMessage(
                "Please delete the assignments before deleting the request",
                "Delete Request",
                ['OK']
            ).whenClosed(response => {
                if (!response.wasCancelled) {
                  return;
                }
            });
        } else {
            return this.dialog.showMessage(
                "Are you sure you want to delete the request?",
                "Delete Request",
                ['Yes', 'No']
            ).whenClosed(response => {
                if (!response.wasCancelled) {
                    this.deleteRequest();
                }
            });
        }
       
    }

    async deleteRequest() {
        this.clientRequests.setTheSelectedRequestDetail(this.selectedRequestDetail);
        let serverResponse = await this.clientRequests.deleteRequest();
        if (!serverResponse.error) {
            this.filterInAssigned()
            this.utils.showNotification("The request was deleted");
            this.dataTable.updateArray(this.clientRequests.requestsDetailsArray);
            this.filterInAssigned();
        }
       this.requestSelected = 'table';
	}	
	
	/*****************************************************************************************************
     * Save the request 
     ****************************************************************************************************/
    async save() {
        if( this.assignmentDetails &&  this.assignmentDetails.length > 0){
            if (this.validation.validate(1)) {
                if(this._buildRequest()){
                    this.clientRequests.setSelectedRequest(this.requestToSave);
                    var email = this._buildEmailObject();
                    let serverResponse = await this.clientRequests.assignRequest(email, this.editIndex);
                    if (!serverResponse.status) {
                        this.utils.showNotification("The request was updated");
                        this.dataTable.updateArrayMaintainFilters(this.clientRequests.requestsDetailsArray);
                        this.reSort();
                        this.filterInAssigned();
                        var that = this;
                        if(this.systemQueue && this.systemQueue.length > 0){
                            this.systemQueue.forEach(item => {
                                this.systems.selectedSystemFromId(item)
                                this.systems.saveSystem();
                            }); 
                        }
                        this._cleanUp();
                    }
                }
            }
        }
    }

     _buildEmailObject(){
        let mailObject = {};
        if(!this.sendEmail) return mailObject;
        var date = new Date(this.selectedRequestDetail.requiredDate);
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear(); 
        if(this.selectedRequestDetail.requestStatus !== this.config.PROVISIONAL_REQUEST_CODE ){
            mailObject.reason = 2;
            mailObject.numStudents = parseInt(this.selectedRequestDetail.requestId.undergradIds) + parseInt(this.selectedRequestDetail.requestId.graduateIds);
            mailObject.fullName = this.selectedRequestDetail.requestId.personId.fullName; 
            mailObject.requestNo = this.selectedRequestDetail.requestId.clientRequestNo;
            mailObject.email = this.selectedRequestDetail.requestId.personId.email; 
            mailObject.product = [{name: this.selectedRequestDetail.productId.name, requiredDate: month + "/" + day + "/" + year}],
            mailObject.course = this.selectedRequestDetail.requestId.courseId.name;
            mailObject.cc = this.config.PRODUCT_REQUESTS_EMAIL_LIST ? this.config.PRODUCT_REQUESTS_EMAIL_LIST : "";
            mailObject.message = "Your product request has been updated."
        }       
		
		return mailObject;
	}

    /*****************************************************************************************************
     * Build the data objects to send to the server 
     ****************************************************************************************************/
    _buildRequest(){
        this.systemQueue = new Array();
        //Check to see if this assignment already exists
        if(this.selectedRequestDetail.requestStatus == this.config.ASSIGNED_REQUEST_CODE){  
            for(var i = 0; i < this.assignmentDetails.length; i++){
                for(var j = 0; j < this.proposedClient.length; j++){
                    //Save the previous ids assigned and available from the proposed client
                    this.proposedClient[j].idsAvailable = this.proposedClient[j].idsAvailable ? parseInt(this.proposedClient[j].idsAvailable) : parseInt(this.products.selectedProduct.idsAvailable);
                    var oldIdsAssigned = parseInt(this.proposedClient[j].idsAssigned);
                    var oldIdsAvailable = parseInt(this.proposedClient[j].idsAvailable);
                    if((this.assignmentDetails[i].client == this.proposedClient[j].client) && (this.assignmentDetails[i].systemId == this.proposedClient[j].systemId)){
                        //If this isn't a new assignment
                        if(this.assignmentDetails[i].assignedDate){
                            //If there are more than one assignment, make the client shared
                            //Search for the assignment in the client and update it
                            if(this.proposedClient[j].assignments){
                                for(var k = 0; k<this.proposedClient[j].assignments.length; k++){
                                    if(this.proposedClient[j].assignments[k].assignment == this.selectedRequestDetail._id){
                                        var totalIdsAssigned = parseInt(this.assignmentDetails[i].lastID) - parseInt(this.assignmentDetails[i].firstID);
                                        this.proposedClient[j].idsAvailable = parseInt(this.proposedClient[j].idsAvailable) + parseInt(this.oldRequest.assignments[i].idsAssigned) - totalIdsAssigned;
                                        this.proposedClient[j].assignments[k].studentIDRange = this.assignmentDetails[i].studentUserIds;
                                        this.proposedClient[j].assignments[k].facultyIDRange = this.assignmentDetails[i].facultyUserIds;
                                        this.proposedClient[j].assignments[k].firstID = this.assignmentDetails[i].firstID;
                                        this.proposedClient[j].assignments[k].lastID = this.assignmentDetails[i].lastID;
                                        this.proposedClient[j].manual = this.manualMode;
                                        if(this.proposedClient[i].assignments.length > 1 && this.proposedClient[i].clientStatus != this.config.SANDBOX_CLIENT_CODE) this.proposedClient[i].clientStatus = this.config.SHARED_CLIENT_CODE;
                                        this.systems.updateClient(this.proposedClient[j]);
                                        this.systemQueue.push(this.proposedClient[j].systemId);
                                    }
                                }
                            }
                        } else {
                            //It's a new assignment
                            this.assignmentDetails[i].assignedDate = new Date();
                            this.selectedRequestDetail.assignedDate = new Date();
                            if(this.selectedRequestDetail.requestId.courseId._id != this.config.SANDBOX_ID) {
                                this.proposedClient[i].clientStatus = this.config.ASSIGNED_CLIENT_CODE;
                            } else {
                                this.proposedClient[i].clientStatus = this.config.SANDBOX_CLIENT_CODE;
                            }

                            var totalIdsAssigned = parseInt(this.assignmentDetails[i].lastID) - parseInt(this.assignmentDetails[i].firstID);
                            this.proposedClient[i].idsAvailable = parseInt(this.proposedClient[i].idsAvailable) - parseInt(totalIdsAssigned);
                            this.proposedClient[i].manual = this.manualMode;
                            this.proposedClient[i].assignments.push({
                                assignment: this.selectedRequestDetail._id,
                                studentIDRange: this.assignmentDetails[i].studentUserIds,
                                facultyIDRange: this.assignmentDetails[i].facultyUserIds,
                                institutionId: this.selectedRequestDetail.requestId.institutionId,
                                personId: this.selectedRequestDetail.requestId.personId._id,
                                firstID: this.assignmentDetails[i].firstID,
                                lastID: this.assignmentDetails[i].lastID,  
                            });
                            if(this.proposedClient[i].assignments.length > 1 && this.proposedClient[i].clientStatus != this.config.SANDBOX_CLIENT_CODE) this.proposedClient[i].clientStatus = this.config.SHARED_CLIENT_CODE;
                            this.systems.updateClient(this.proposedClient[i]);
                            this.systemQueue.push(this.proposedClient[i].systemId);
                        }
                    }
                }
            }    
            
        } else {
            //First assignment for this request
            if(this.provisionalAssignment){
                this.selectedRequestDetail.requestStatus = this.config.PROVISIONAL_REQUEST_CODE;
            } else {
                this.selectedRequestDetail.requestStatus = this.config.ASSIGNED_REQUEST_CODE;
            }
            
            
            //Update the client records
            for(var i = 0; i < this.proposedClient.length; i++){
                this.assignmentDetails[i].assignedDate = new Date();
                this.assignmentDetails[i].modifiedDate = new Date();
                if(this.selectedRequestDetail.requestId.courseId._id != this.config.SANDBOX_ID) {
                    this.proposedClient[i].clientStatus = this.config.ASSIGNED_CLIENT_CODE;
                } else {
                    this.proposedClient[i].clientStatus = this.config.SANDBOX_CLIENT_CODE;
                }
                if(this.proposedClient[i].assignments.length > 1 && this.proposedClient[i].clientStatus != this.config.SANDBOX_CLIENT_CODE) this.proposedClient[i].clientStatus = this.config.SHARED_CLIENT_CODE;
                var totalIdsAssigned = parseInt(this.assignmentDetails[i].lastID) - parseInt(this.assignmentDetails[i].firstID);
                this.proposedClient[i].idsAvailable = this.proposedClient[i].idsAvailable ? parseInt(this.proposedClient[i].idsAvailable) : parseInt(this.products.selectedProduct.idsAvailable);
                this.proposedClient[i].idsAvailable = parseInt(this.proposedClient[i].idsAvailable) - totalIdsAssigned;
                this.proposedClient[i].manual = this.manualMode;
                this.proposedClient[i].assignments.push({
                    assignment: this.selectedRequestDetail._id,
                    studentIDRange: this.assignmentDetails[i].studentUserIds,
                    facultyIDRange: this.assignmentDetails[i].facultyUserIds,
                    institutionId: this.selectedRequestDetail.requestId.institutionId,
                    personId: this.selectedRequestDetail.requestId.personId._id,
                    firstID: this.assignmentDetails[i].firstID,
                    lastID: this.assignmentDetails[i].lastID,   
                    assignedDate: new Date()                 
                });
                if(this.proposedClient[i].assignments.length > 1 && this.proposedClient[i].clientStatus != this.config.SANDBOX_CLIENT_CODE) this.proposedClient[i].clientStatus = this.config.SHARED_CLIENT_CODE;
                this.systems.updateClient(this.proposedClient[i]);
                this.systemQueue.push(this.proposedClient[i].systemId);
            };
        }
        
        //Construct the object to submit to the server
        this.selectedRequestDetail.idsAssigned = parseInt(this.totalIdsAssigned);
        this.selectedRequestDetail.assignments = this.assignmentDetails;
        this.requestToSave = this.utils.copyObject(this.selectedRequestDetail.requestId);
        this.requestToSave.audit.push({
           property: 'Assigned',
           newValue: JSON.stringify(this.selectedRequestDetail.assignments),
           oldValue: this.selectedRequestDetail.productId.name,
           eventDate: new  Date(),
           personId: this.userObj.fullName
        })
        this.requestToSave.requestDetailsToSave = new Array();
        var request = this.utils.copyObject(this.selectedRequestDetail);
        delete request['requestId'];
        this.requestToSave.requestDetailsToSave.push(request);

        return true;
    }

	back() { 
        this.clientRequests.setTheSelectedRequestDetail(this.selectedRequestDetail);
        let changes = this.clientRequests.isRequestDetailDirty(this.originalRequestDetail,['requestId','productId','techComments']);

        var newAssignment = false;
        if(this.assignmentDetails) {
            this.assignmentDetails.forEach(item => {
                if(!item.assignedDate) newAssignment = true;
            })
        }

        if(this.assignmentDetails.length > 0 && (changes.length > 0 || newAssignment) ){
             return this.dialog.showMessage(
                    "There is an unsaved assignment. Are you sure you want to leave this page?",
                    "Confirm Back",
                    ['Yes', 'No']
                ).whenClosed(response => {                      
                    if (response.wasCancelled) {
                       return;
                    } else {
                        this._cleanUp();
                    }
                });
        }
        this._cleanUp();
    }
    
    viewAssignment(index, request){
        this.editIndex = index;
        this.selectedRequestDetail = this.utils.copyObject(request);
        this.products.selectedProductFromId(this.selectedRequestDetail.productId._id);
        if(this.selectedRequestDetail.assignments && this.selectedRequestDetail.assignments.length > 0) this.systems.selectedSystemFromId(this.selectedRequestDetail.assignments[0].systemId);
        this.requestSelected = 'view';
    }

    backView(){
        this.requestSelected = 'table';
    }
	
	systemSelected(){
        this.systems.selectedSystemFromId(this.selectedSystemId);
        if(!this.products.selectedProduct.clientRelevant){
            this.calcAssignment();
        }
        this.clientsConfigured = false;
        for(let i = 0; i < this.systems.selectedSystem.clients.length; i++){
            if(this.systems.selectedSystem.clients[i].productId === this.products.selectedProduct._id){
                this.clientsConfigured = true;
                break;
            }
        }  
    }

	async customerActionDialog(){ 
         if(this.profileRequest){
           await this.clientRequests.getRequest(this.profileRequest.requestId._id);
            this.model = 'header';
            this.hideProfile();
         } else {
            await this.clientRequests.getRequest(this.selectedRequestDetail.requestId._id);
         }  
        
        this.selectedRequestNo = this.clientRequests.selectedRequest.clientRequestNo;
        this.requestId = this.clientRequests.selectedRequest._id;
        this.course = this.clientRequests.selectedRequest.courseId !== null ? this.clientRequests.selectedRequest.courseId.name : this.config.SANDBOX_NAME;
        this.email = this.clientRequests.selectedRequest.personId.email;
        this.personId = this.clientRequests.selectedRequest.personId._id;
        this.emailProducts = this.clientRequests.selectedRequest.requestDetails;
        this.productsSelected = new Array();
            
        let subject = "Question about product request " +  this.selectedRequestNo;
        let email = {emailBody: "", emailSubject: subject, emailId: this.email, products: this.clientRequests.selectedRequest.requestDetails, productsSelected: this.productsSelected};
        return this.dialog.showEmail(
                "Enter Email",
                email,
                ['Submit', 'Cancel']
            ).whenClosed(response => {
                if (!response.wasCancelled) {
                    this.sendTheEmail(response.output);
                } else {
                    console.log("Cancelled");
                }
            });
    }

    async sendTheEmail(email){
        if(email){

            this.clientRequests.selectedRequest.requestStatus = this.config.CUSTOMER_ACTION_REQUEST_CODE;
            var updateIds = new Array();
            this.productsSelected.forEach(item => {
                this.clientRequests.selectedRequest.requestDetails[item.index].audit.push({
                        property: 'Customer Action',
                        newValue: this.config.CUSTOMER_ACTION_REQUEST_CODE,
                        oldValue: item.requestStatus,
                        eventDate: new  Date(),
                        personId: this.userObj._id
                    });
                    this.clientRequests.selectedRequest.requestDetails[item.index].requestStatus = this.config.CUSTOMER_ACTION_REQUEST_CODE;
                    updateIds.push(item._id);
            })
            
            this.filterInAssigned();
             var date = new Date(this.requiredDate);
            var day = date.getDate();
            var month = date.getMonth() + 1;
            var year = date.getFullYear(); 
            this.message = {
                reason: 3,
                personId: this.personId,
                from: this.userObj._id,
                id: this.requestId,
                customerMessage : email.email.emailBody, 
                email: email.email.emailId,
                subject: email.email.emailSubject,
                clientRequestNo: this.selectedRequestNo,
                // product: [{name: this.productName, requiredDate: month + "/" + day + "/" + year}],
                session: this.sessions.selectedSession.session + ' ' + this.sessions.selectedSession.year,
                course: this.course,
                requestStatus: this.config.CUSTOMER_ACTION_REQUEST_CODE,
                model: this.model,
            };     

            this.clientRequests.selectedRequest.audit.push({
                property: 'Send Message',
                eventDate: new Date(),
                newValue: email.email.emailBody,
                personId: this.userObj._id
            });
            this.clientRequests.selectedRequest.customerMessage = email.email.emailBody;
            let response = await this.clientRequests.saveRequestWithId();
            if(!response.error){
                this.clientRequests.updateStatuses(updateIds, this.config.CUSTOMER_ACTION_REQUEST_CODE);
                this.dataTable.updateArray(this.clientRequests.requestsDetailsArray);
                let serverResponse = await this.clientRequests.sendCustomerMessage(this.message);
                if (!serverResponse.error) {
                    this.utils.showNotification("The message was sent");
                }
                this.filterInAssigned();
            }

        } 
    }
	
	showProfile(request, el){ 
        this.profileRequest = request;
        $(".hoverProfile").css("top", window.pageYOffset + el.clientY - 175);
        $(".hoverProfile").css("left", el.clientX - 500);
        $(".hoverProfile").css("display", "block");
    }

    hideProfile(){
        $(".hoverProfile").css("display", "none");
    }

    showComment(request, el) {
        if(request.requestStatus == this.config.REPLIED_REQUEST_CODE){
            this.commentShown = request.requestId.comments;
            $(".hover").css("top", el.clientY - 200);
            $(".hover").css("left", el.clientX - 10);
            $(".hover").css("display", "block");
        }
    }

    hideComment() {
            $(".hover").css("display", "none");
	}

	openAudit(){
        this.showAudit = !this.showAudit;
	}

	openEditStudentTemplate() {
        this.showAddStudentTemplate = !this.showAddStudentTemplate;
    }

    openStudentTemplate(){
        this.showTemplates = !this.showTemplates;
    }

    cancelEditStudentTemplate(){
        this.showAddStudentTemplate = false;
    }

    async saveStudentTemplate(){
        await this.products.saveProduct();
        this.studentIDTemplates = this.products.selectedProduct.defaultStudentIdPrefix.split(":");
        if(this.studentIDTemplates.length > 0 &&  ( !this.selectedAssignedClient || !this.selectedAssignedClient.manual)) {
            this.forceManual = false;
            this.manualMode = false;
        }
        this.showAddStudentTemplate = false;
    }
    
    openSettings(){
        this.showSettings = ! this.showSettings;
        if( this.showSettings){
            this.idSandboxBuffer = localStorage.getItem('idSandboxBuffer') ? localStorage.getItem('idBuffer') : this.config.SANDBOX_ID_BUFFER;
            this.idBuffer = localStorage.getItem('idBuffer')  ? localStorage.getItem('idBuffer') : this.config.REGULAR_ID_BUFFER;
            this.sandBoxIDs = localStorage.getItem('sandBoxIDs')  ? localStorage.getItem('sandBoxIDs') : this.config.SANDBOX_ID_COUNT;
        }  
    }
    
    saveSettings(){
        localStorage.setItem('idSandboxBuffer', this.idSandboxBuffer);
        localStorage.setItem('idBuffer', this.idBuffer);
        localStorage.setItem('sandBoxIDs', this.sandBoxIDs);
        this.showSettings = false;
    }
    
    restoreDefaults(){
        this.idBuffer = this.config.REGULAR_ID_BUFFER;
        this.sandBoxIDs = this.config.SANDBOX_ID_COUNT;
        localStorage.setItem('idBuffer', this.config.REGULAR_ID_BUFFER);
        localStorage.setItem('sandBoxIDs', this.config.SANDBOX_ID_BUFFER);
	}
	
	openFacultyDetails(){
        this.facultyDetails = !this.facultyDetails;
        localStorage.setItem("facultyDetails", this.facultyDetails);
    }
	
	changeUnassignedOnly(){
        localStorage.setItem('unassignedOnly', this.unassignedOnly);
    }
		
    _setUpValidation(){
        this.validation.addRule(1,"errorRange",[{"rule":"custom","message":"Invalid ID range",
            "valFunction":function(context){
                var valid = true;
                if(context.assignmentDetails){
                    for(var i = 0; i < context.assignmentDetails.length; i++){
                        if(context.assignmentDetails[i].notValid == 'danger') valid = false;
                    }
                }
                return valid;
            }}]);  
	}

	_cleanUp() {
        this.proposedClient = new Array();
        this.assignmentDetails = new Array();
        this.proposedAssignment = new Object();
        this.parameterIndex = new Object();
        this.systems.selectSystem();
        this.selectedAssignedClient = "";
        this.firstID = 0;
        this.lastID = 0;
        this.requestSelected = 'table';
        this.customerMessage = false;
        //  this.clearFilters();
    }

    flag(){
     var note = {noteBody: "", noteCategories: this.userObj.noteCategories, selectedCategory: 0};
         return this.dialog.showNote(
                "Save Changes",
                note,
                ['Submit', 'Cancel']
            ).whenClosed(response => {
                if (!response.wasCancelled) {
                    this.saveNote(response.output);
                } else {
                    console.log("Cancelled");
                }
            });
  }

  async saveNote(note){
        this.people.selectNote();
        this.people.selectedNote.type = "r";
        this.people.selectedNote.personId = this.userObj._id;
        this.people.selectedNote.category = this.userObj.noteCategories[note.selectedCategory];
        this.people.selectedNote.note = note.note.noteBody;
        this.people.selectedNote.reference = this.selectedRequestDetail._id;
        this.people.selectedNote.referenceNo = this.selectedRequestDetail.requestId.clientRequestNo;
        let response = await this.people.saveNote();
            if(!response.error){
                this.utils.showNotification('The note was saved');
            }
  }

  deleteRecipient(index){
    this.emailArray.splice(index,1);
  }

  bulkEmail(){
      this.email = {MESSAGE: "", INSTRUCTIONS: this.config.HELP_TICKET_INSTRUCTIONS, subject: ""} ;
      this.emailArray = new Array();
      this.dataTable.baseArray.forEach(item => {
        let keep = true;  
        for(let i = 0; i < this.emailArray.length; i++ ){
            if(item.requestId.personId.email === this.emailArray[i].email) keep = false;
        }
        if(keep){
            var systemsAssigned = "Unassigned";
            if(item.assignments && item.assignments.length){
                systemsAssigned = ""
                item.assignments.forEach(item => {
                    this.systems.selectedSystemFromId(item.systemId);
                    systemsAssigned += this.systems.selectedSystem.sid + "(" + item.client + ") ";
                })
            }
            this.emailArray.push({
                fullName: item.requestId.personId.fullName,
                email: item.requestId.personId.email,
                institution: item.requestId.institutionId.name,
                status: systemsAssigned
            })
        }
      })
      this.requestSelected = 'email';
  }

  backBulkEmail(){
      this.requestSelected = 'table';
  }

  sendBulkEmail(){
    if(this.email.MESSAGE === "" || this.email.subject === ""){
        this.utils.showNotification("Enter a subject and messsage");
        return;
    }
    if(this.emailArray.length === 0){
        this.utils.showNotification("You must include some recipients");
        return;
    }
    return this.dialog.showMessage(
        "Are you sure you want to send the email to these recipients?",
        "Confirm Send",
        ['Yes', 'No']
    ).whenClosed(response => {                      
        if (response.wasCancelled) {
            okToProcess = false;
        } else {
            this.sendTheBulkEmail();
        }
    });
  }

  sendTheBulkEmail(){
     var recipients = new Array();
    this.emailArray.forEach(item => {
        recipients.push({name: item.fullName, email: item.email});
    });

    var email = {email: this.email, recipients: recipients}; 
    this.people.sendBuikEmail(email);
    this.utils.showNotification("Message sent");
    this.requestSelected = 'table';
  }

    clearFilters(){
        this.requiredDateFilterValue = "";
        this.createdDateFilterValue = "";
        this.requestStatusFilter = "";
        this.productFilterValue = "";
        this.courseFilterValue = "";
        this.helpTicketTypeFilterValue = "";
        this.institutionFilterValue = "";
         this.dataTable.updateArray(this.clientRequests.requestsDetailsArray);
        this.filterInAssigned();
    }
		
	filterInAssigned() {
        this.requiredDateFilterValue = "";
        this.createdDateFilterValue = "";
        this.requestStatusFilter = "";
        this.productFilterValue = "";
        this.courseFilterValue = "";
        this.helpTicketTypeFilterValue = "";
        this.institutionFilterValue = "";
        if(this.isCheckedAssigned){
            this.dataTable.filterList(this.config.ASSIGNED_REQUEST_CODE, { type: 'custom',  filter: this.statusCustomFilter, compare:'custom'} )
        } else {
            this.dataTable.updateArray(this.clientRequests.requestsDetailsArray,'requiredDate',-1);
        }
    }
    
    changeManualMode(){
        localStorage.setItem('manualMode', this.manualMode);
        
    }
	
	customNameFilter(value, item, context){
        return item.requestId && item.requestId.personId.fullName.toUpperCase().indexOf(value.toUpperCase()) > -1;
    }

    statusCustomFilter(value, item, context){
        if(item.requestStatus == context.config.ASSIGNED_REQUEST_CODE || item.requestStatus == context.config.CANCELLED_REQUEST_CODE) return false;
        return true;
    }

    institutionCustomFilter(value, item, context){
        return item.requestId && item.requestId.institutionId && item.requestId.institutionId.name.toUpperCase().indexOf(value.toUpperCase()) > -1;
    }

    courseCustomFilter(value, item, context){
        return item.requestId && item.requestId.courseId.name.toUpperCase().indexOf(value.toUpperCase()) > -1;
    }

    customProductNameFilter(value, item, context){
        return item.productId.name.toUpperCase().indexOf(value.toUpperCase()) > -1;
    }

    customCourseSorter(sortProperty, sortDirection, sortArray, context){ 
        this.sortProperty = 'course';
        this.sortDirection = sortDirection;
        return sortArray.sort((a, b) => {
            if(a['requestId'] !== null &&  b['requestId'] !== null && a['requestId']['courseId']['name'] && b['requestId']['courseId']['name']) {
                var result = (a['requestId']['courseId']['name'] < b['requestId']['courseId']['name']) ? -1 : (a['requestId']['courseId']['name'] > b['requestId']['courseId']['name']) ? 1 : 0;
            } else {
                var result = -1;
            }
            return result * sortDirection;
        });
    }

    customInstitutionsSorter(sortProperty, sortDirection, sortArray, context){ 
        this.sortProperty = 'institution';
        this.sortDirection = sortDirection;
        return sortArray.sort((a, b) => {
            if(a['requestId'] !== null &&  b['requestId'] !== null && a['requestId']['institutionId'] && b['requestId']['institutionId']) {
                var result = (a['requestId']['institutionId']['name'] < b['requestId']['institutionId']['name']) ? -1 : (a['requestId']['institutionId']['name'] > b['requestId']['institutionId']['name']) ? 1 : 0;
            } else {
                 var result = -1;
            }
            return result * sortDirection;
        });
    }

    customPersonSorter(sortProperty, sortDirection, sortArray, context){ 
        this.sortProperty = 'person';
        this.sortDirection = sortDirection;
        return sortArray.sort((a, b) => {
            if(a['requestId'] !== null &&  b['requestId'] !== null && a['requestId']['personId']['lastName'] && b['requestId']['personId']['lastName']){
                var result = (a['requestId']['personId']['lastName'] < b['requestId']['personId']['lastName']) ? -1 : (a['requestId']['personId']['lastName'] > b['requestId']['personId']['lastName']) ? 1 : 0;
            } else {
                var result = -1;
            }
            return result * sortDirection;
        });
    }

    customRequestStatusSorter(sortProperty, sortDirection, sortArray, context){ 
        this.sortProperty = 'status';
        this.sortDirection = sortDirection;
        return sortArray.sort((a, b) => {
			var result = (a[sortProperty] < b[sortProperty]) ? -1 : (a[sortProperty] > b[sortProperty]) ? 1 : 0;
			return result * sortDirection;
		});
    }

    reSort(){
       this.dataTable.sortArray({}, {}, true);
    }

}