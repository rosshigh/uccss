import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";

import {DataTable} from '../../resources/utils/dataTable';
import {Sessions} from '../../resources/data/sessions';
import {Systems} from '../../resources/data/systems';
import {Products} from '../../resources/data/products';
import {ClientRequests} from '../../resources/data/clientRequests';
import {AppConfig} from '../../config/appConfig';
import {Utils} from '../../resources/utils/utils';
import {People} from '../../resources/data/people';
import {AppState} from '../../resources/data/appState';
import Validation from '../../resources/utils/validation';

import moment from 'moment';
import $ from 'jquery';

@inject(Router, AppConfig, Validation, People, AppState,  DataTable, Utils, Sessions, Products, Systems, ClientRequests)
export class EditClients {
    requestSelected = false;
    showAddStudentTemplate = false;
    manualMode = false;
    roundTo10 = false;
    lastIDidsRemaining = -1;

    navControl = "requestsNavButtons";
    spinnerHTML = "";

    constructor(router, config, validation, people, app,  datatable, utils, sessions, products, systems, requests) {
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
        this.getData();
    }

    attached(){
        $('[data-toggle="tooltip"]').tooltip();
    }

    async getData() {
        let responses = await Promise.all([
            this.sessions.getSessionsArray(true, '?filter=[or]sessionStatus|Active:Requests&order=startDate'),
            this.people.getPeopleArray(true, '?filter=institutionId|eq|' + this.app.user.institutionId + '&order=lastName'),
            this.products.getProductsArray(true, '?filter=active|eq|true&order=Category'),
            this.systems.getSystemsArray(true)
        ]);
    }

    async getRequests() {
        if (this.selectedSession) {
            await this.requests.getClientRequestsDetailsArray(true, '?filter=sessionId|eq|' + this.selectedSession);
            this.updateArray();
            this.utils.formatDateForDatesPicker(this.requests.selectedRequest)
            this.dataTable.createPageButtons(1);
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
        if (this.requests.requestsDetailsArray && this.requests.requestsDetailsArray.length) {
            this.displayArray = this.requests.requestsDetailsArray.filter((item) => {
                return item.requestId.institutionId == this.app.user.institutionId;
            });;
            this.baseArray = this.displayArray;
            for (var i = 0; i < this.baseArray.length; i++) {
                this.baseArray[i].originalIndex = i;
            }
        } else {
            this.displayArray = new Array();
        }
    }

    /*****************************************************************************************************
     * User selected a requests table
     * index - index of the item selected
     * el - event object
     * request - the selected request object
     ****************************************************************************************************/
    selectRequest(index, el, request) {
        //Initiate temp arrays to hold selected clients and assignment details
        this.proposedClient = new Array();
        this.assignmentDetails = new Array();
        
        //Initiate interface flags
        this.enableButton = false;
        this.requestSelected = true;
        this.selectedClient = "";

        //Retrieve relevant data
        this.editIndex = this.displayArray[index + parseInt(this.dataTable.startRecord)].baseIndex;
        this.requests.selectRequestDetail(this.editIndex);
        this.people.selectedPersonFromId(this.requests.selectedRequestDetail.requestId.personId);
        this.products.selectedProductFromId(this.requests.selectedRequestDetail.productId);

        //Establish parameters
        this.lastIDAvailable = this.products.selectedProduct.lastAllowableId ? parseInt(this.products.selectedProduct.lastAllowableId) : parseInt(this.products.selectedProduct.idsAvailable)
        this.firstID = this.products.selectedProduct.firstAllowableId ? parseInt(this.products.selectedProduct.firstAllowableId) : this.config.FIRST_DEFAULT_ID;
        this.lastFirstID = this.firstID;
        this.firstAllowableID = this.firstID;
        this.firstNumericFacID = this.products.selectedProduct.firstAllowableId ? parseInt(this.products.selectedProduct.firstAllowableId) : this.config.FIRST_DEFAULT_ID;
        this.lastNumericFacID =  this.firstNumericFacID + this.numberOfFacIDs - 1;
        this.studentIDTemplates = this.products.selectedProduct.defaultStudentIdPrefix.split(":");
        this.facultyIDTemplates = this.products.selectedProduct.defaultFacultyIdPrefix.split(":");
        this.systems.selectedSystemFromId(this.products.selectedProduct.systems[0].systemId);
        this.customerMessageText = this.requests.selectedRequestDetail.customerMessage ? this.requests.selectedRequestDetail.customerMessage : "";
        
        //Check if the request is a sandbox request
        if (this.requests.selectedRequestDetail.requestId.courseId === this.config.SANDBOX_ID) {
            // this.idBuffer = localStorage.getItem('sandBoxIDs')  ? localStorage.getItem('sandBoxIDs') : this.config.SANDBOX_ID_BUFFER;
            this.numberOfIds = localStorage.getItem('sandBoxIDs')  ? localStorage.getItem('sandBoxIDs') : this.config.SANDBOX_ID_COUNT;
            this.sandBoxOnly = true;
        } else {
            this.idBuffer = localStorage.getItem('idBuffer')  ? localStorage.getItem('idBuffer') : this.config.REGULAR_ID_BUFFER;
            this.numberOfIds = parseInt(this.requests.selectedRequestDetail.requestId.graduateIds)
                + parseInt(this.requests.selectedRequestDetail.requestId.undergradIds)
                + parseInt(this.requests.selectedRequestDetail.requestId.addUndergraduates)
                + parseInt(this.requests.selectedRequestDetail.requestId.addGraduates);
            this.sandBoxOnly = false;
        }

        //Check to see if an assignment has already been made
        if (!this.requests.selectedRequestDetail.assignments || this.requests.selectedRequestDetail.assignments.length == 0) {
            //No assignment has been made
            this.requests.selectedRequestDetail.techComments = this.products.selectedProduct.clientInfo ? this.products.selectedProduct.clientInfo : "";
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
            this.idsAssigned = this.requests.selectedRequestDetail.idsAssigned;
            this.idsRequired = parseInt(this.numberOfIds)
            this.numberOfIds = this.numberOfIds - this.idsAssigned > 0 ? this.numberOfIds - this.idsAssigned : 0;
            this.totalIdsAssigned = this.idsAssigned;
            this.idsRemaining = this.idsRequired - this.idsAssigned > 0 ? this.idsRequired - this.idsAssigned : 0;
            this.assignmentDetails = this.requests.selectedRequestDetail.assignments;
            this.findAssignedClients(); 
        }

        this.assignmentDetailIndex = -1;
        
        this.calcLastID();

        if (this.selectedRow) this.selectedRow.children().removeClass('info');
        this.selectedRow = $(el.target).closest('tr');
        this.selectedRow.children().addClass('info')
    }

    /*****************************************************************************************************
     * User selected a client in the client list
     * index - index of the item selected
     * el - event object
     * client - the selected client object
     ****************************************************************************************************/
    selectClient(index, client, el) {
        //Don't allow a client to be selected if there are no ids to be assigned
        if (this.idsRemaining > 0) {
            //Make sure the selected client is compatible with the selected request
            if (this.requests.selectedRequestDetail.requestId.courseId === this.config.SANDBOX_ID && client.clientStatus != this.config.SANDBOX_CLIENT_CODE) {
                this.utils.showNotification("The request is for a sandbox and the client isn't a sandbox client", "", "", "", "", 5);
                return;
            }
            if (this.requests.selectedRequestDetail.requestId.courseId != this.config.SANDBOX_ID && client.clientStatus == this.config.SANDBOX_CLIENT_CODE) {
                this.utils.showNotification("The request is for a regular course and the client is a sandbox client", "", "", "", "", 5);
                return;
            }
            
            //Make sure the client hasn't already been selected
            if(this.utils.arrayContainsValue(this.assignmentDetails, 'clientId', client._id) > -1) return;

            //Save the client so we can update it
            this.selectedClient = client;
            this.proposedClient.push(client);

            //Save the first id 
            this.lastFirstID = this.firstID;
            
            this.calcLastID();
            
            //Create a new assignment
            this.assignmentDetails.push({
                staffId : this.app.user._id, 
                // assignedDate : new Date(),
                client : client.client,
                clientId : client._id,
                systemId : client.systemId,
                firstID: this.firstID,
                lastID : this.lastID,
                idsAssigned : parseInt(this.lastID) - parseInt(this.firstID)
            });
            this.totalIdsAssigned = parseInt(this.totalIdsAssigned) + parseInt(this.lastID) - parseInt(this.firstID);
            this.assignmentDetailIndex = this.assignmentDetails.length - 1;
            this.selectedClientIndex = this.proposedClient.length - 1;
            
            //Calculate the user ids and passwords
            this.calcAssignment();
            this.idsRemaining = parseInt(this.idsRemaining) - this.assignmentDetails[this.assignmentDetailIndex].idsAssigned;
             
            this.clientSelected = true;
            this.enableButton = true;
            
            if (this.selectedRow) this.selectedRow.children().removeClass('info');
            this.selectedRow = $(el.target).closest('tr');
            this.selectedRow.children().addClass('info')
        }
    }

    /*****************************************************************************************************
     * Calculate the last id when a client is selected
     ****************************************************************************************************/
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

    calcAssignment() {
        this.calcIDRangeFromTemplate();
        this.calculatePasswords();
    }

    /*****************************************************************************************************
     * Calculates the student and faculty id ranges from the configured id template
     ****************************************************************************************************/
    calcIDRangeFromTemplate() {
        //If the user has selected manual mode or no assignment is selected, skip the calculation
        if(this.manualMode || this.assignmentDetailIndex == -1 ){
            return;
        }
        //If there is no template, set the range to empty string
        if (this.products.selectedProduct.defaultStudentIdPrefix.indexOf(this.config.ID_WILDCARD) == -1 || this.studentIDTemplates.length == 0) {
            this.assignmentDetails[this.assignmentDetailIndex].studentUserIds = "";
        } else {
            //Determine if user has selected a template and if not, select the first one
            if (this.selectedStudentIDTemplate.length == 0) this.selectedStudentIDTemplate.push(this.studentIDTemplates[0]);
            //For each selected template, calculate the id range and add them to the ids allocated
            for (var i = 0; i < this.selectedStudentIDTemplate.length; i++) {
                var firstStudentId = this.getID(this.selectedStudentIDTemplate[i], this.firstID);
                var lastStudentId = this.getID(this.selectedStudentIDTemplate[i], this.lastID);
                this.assignmentDetails[this.assignmentDetailIndex].studentUserIds = firstStudentId + " to " + lastStudentId;
            }
        }

        //If there is no template configured for faculty ids or if this is a sandbox request set the faculty ids to empty string
        if (this.products.selectedProduct.defaultFacultyIdPrefix.indexOf(this.config.ID_WILDCARD) == -1
            || this.requests.selectedRequestDetail.requestId.courseId === this.config.SANDBOX_ID
            || this.facultyIDTemplates.length == 0) {
            this.assignmentDetails[this.assignmentDetailIndex].facultyUserIds = "";
        } else {
            // this.firstNumericFacID = this.proposedClient[this.assignmentDetailIndex].lastFacIdAssigned + 1 + this.config.FACULTY_ID_BUFFER;
            // this.lastNumericFacID = this.firstNumericFacID + this.config.DEFAULT_FACULTY_IDS - 1;
            //User doesn't select a faculty template so we have to create the array
            this.selectedFacultyIDTemplate = new Array();
            this.selectedFacultyIDTemplate.push(this.facultyIDTemplates[0]);
            for (i = 0; i < this.selectedStudentIDTemplate.length; i++) {
                var firstFacID = this.getID(this.selectedFacultyIDTemplate[i], this.firstNumericFacID);
                var lastFacID = this.getID(this.selectedFacultyIDTemplate[i],  this.lastNumericFacID);
                this.assignmentDetails[this.assignmentDetailIndex].facultyUserIds = firstFacID + " to " + lastFacID;
            }
        }

    }
    
    calcFacIDRangeFromTemplate(){
        if(this.assignmentDetailIndex > -1){
            //If there is no template configured for faculty ids or if this is a sandbox request set the faculty ids to empty string
            if (this.products.selectedProduct.defaultFacultyIdPrefix.indexOf(this.config.ID_WILDCARD) == -1
                || this.requests.selectedRequestDetail.requestId.courseId === this.config.SANDBOX_ID
                || this.facultyIDTemplates.length == 0) {
                this.assignmentDetails[this.assignmentDetailIndex].facultyUserIds = "";
            } else {
                //User doesn't select a faculty template so we have to create the array
                this.selectedFacultyIDTemplate = new Array();
                this.selectedFacultyIDTemplate.push(this.facultyIDTemplates[0]);
                for (var i = 0; i < this.selectedFacultyIDTemplate.length; i++) {
                    var firstFacID = this.getID(this.selectedFacultyIDTemplate[i], this.firstNumericFacID);
                    var lastFacID = this.getID(this.selectedFacultyIDTemplate[i],  this.lastNumericFacID);
                    this.assignmentDetails[this.assignmentDetailIndex].facultyUserIds = firstFacID + " to " + lastFacID;
                }
            }
        }
    }

     /*****************************************************************************************************
     * Calculate a user id from a template
     * idPrefix -an id template.  Templates are defined for products.
     * id - an integer
     ****************************************************************************************************/
    getID(idPrefix, id) {
        if (idPrefix) {
            var len = idPrefix.lastIndexOf(this.config.ID_WILDCARD) - idPrefix.indexOf(this.config.ID_WILDCARD) + 1;
            var prefix = "000".substr(0, len - id.toString().length)
            return idPrefix.substr(0, idPrefix.indexOf(this.config.ID_WILDCARD)) + prefix + id;
        }
        return "";
    }

    /*****************************************************************************************************
     * Calculate a password from a template
     ****************************************************************************************************/
    calculatePasswords() {
        //If the user selected manual mode or if no assignment is selected, return
        if(this.manualMode || this.assignmentDetailIndex == -1){
            return;
        }
            var random;
            var prefix;
            var len;
            //If the product student password template is defined with a wildcard calculate the password 
            if (this.products.selectedProduct.defaultStudentPassword.indexOf(this.config.ID_WILDCARD) != -1) {
                len = this.products.selectedProduct.defaultStudentPassword.lastIndexOf(this.config.ID_WILDCARD) - this.products.selectedProduct.defaultStudentPassword.indexOf(this.config.ID_WILDCARD) + 1;
                prefix = "9" + "000".substr(0, len - 1);
                random = Math.floor(Math.random() * parseInt(prefix));
                this.assignmentDetails[this.assignmentDetailIndex].studentPassword = this.products.selectedProduct.defaultStudentPassword.substr(0, this.products.selectedProduct.defaultStudentPassword.indexOf(this.config.ID_WILDCARD)) + random;
            }
            //Sandbox assignments don't have faculty ids so set the password to empty string
            if (this.requests.selectedRequestDetail.requestId.courseId === this.config.SANDBOX_ID) {
                this.assignmentDetails[this.assignmentDetailIndex].facultyUserIds = "";
            } else {
                //If the product faculty password template is defined with a wildcard calculate the password
                if (this.products.selectedProduct.defaultFacultyPassword.indexOf(this.config.ID_WILDCARD) != -1) {
                    len = this.products.selectedProduct.defaultFacultyPassword.lastIndexOf(this.config.ID_WILDCARD) - this.products.selectedProduct.defaultFacultyPassword.indexOf(this.config.ID_WILDCARD) + 1;
                    prefix = "9" + "000".substr(0, len - 1);
                    random = Math.floor(Math.random() * parseInt(prefix));
                    this.assignmentDetails[this.assignmentDetailIndex].facultyPassword = this.products.selectedProduct.defaultFacultyPassword.substr(0, this.products.selectedProduct.defaultFacultyPassword.indexOf(this.config.ID_WILDCARD)) + random;
                }
            }
    }

    /*****************************************************************************************************
     * The user changed the first id field
     ****************************************************************************************************/
    firstIDChanged() {
        //Make sure the id isn't lower than the first allowable id for the product
        if (this.firstID < this.firstAllowableID) this.firstID = this.firstAllowableID;

        //Calculate the last id using the difference between the previous firstID and the current firstID
        this.lastID = parseInt(this.lastID) + parseInt(this.firstID) - parseInt(this.lastFirstID);
        //If a client has been selected, update the assignment firstID then recalculate the id range
        if (this.assignmentDetailIndex > -1) {
            this.assignmentDetails[this.assignmentDetailIndex].firstID = this.firstID;
            this.calcIDRangeFromTemplate();
        }
        //Save the new firstID
        this.lastFirstID = this.firstID;
    }

    /*****************************************************************************************************
     * The user changed the last id field
     ****************************************************************************************************/
    lastIDChanged() {
        //Make sure the lastID isn't higher than the last ID available for the product
         if (this.lastID > this.lastIDAvailable) {
            this.lastID = this.lastIDAvailable;
         }
         //Adjust the required ids 
        this.idsRequired = parseInt(this.idsRequired) + parseInt(this.lastID) - parseInt(this.oldLastID);
        //If a client is selected and the assignment has already been saved
        if (this.assignmentDetailIndex > -1 || this.assignmentDetails[this.assignmentDetailIndex]._id) {
            //Adjust the ids assigned
            this.assignmentDetails[this.assignmentDetailIndex].idsAssigned = parseInt(this.assignmentDetails[this.assignmentDetailIndex].idsAssigned) + parseInt(this.lastID) - parseInt(this.oldLastID);
            this.totalIdsAssigned = parseInt(this.totalIdsAssigned) + parseInt(this.lastID) - parseInt(this.oldLastID);
            //Set the lastID in the assignment
            this.assignmentDetails[this.assignmentDetailIndex].lastID = this.lastID;
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
        this.calcFacIDRangeFromTemplate();
    }
    
    firstFacIDChanged(){
         this.lastNumericFacID = parseInt(this.firstNumericFacID) + parseInt(this.numberOfFacIDs) - 1;
         this.calcFacIDRangeFromTemplate();
    }

    /*****************************************************************************************************
     * The user selects an assignment 
     * index - the index of the selected assignment
     * el - the event object
     ****************************************************************************************************/
    selectProposedClient(index, el) {
        //Save the index 
        this.assignmentDetailIndex = this.assignmentDetailIndex == -1 ? index : -1;
        if(this.assignmentDetailIndex == -1){
            this.selectedAssignedClient = "";
            if (this.selectedRow) this.selectedRow.children().removeClass('info');
        } else {
            this.selectedAssignedClient = this.assignmentDetails[this.assignmentDetailIndex].clientId;

            //UPdate the firstID and lastID fileds with the assignment firstID and lastID
            this.firstID = this.assignmentDetails[this.assignmentDetailIndex].firstID;
            this.lastID = this.assignmentDetails[this.assignmentDetailIndex].lastID;
            this.firstNumericFacID = this.assignmentDetails[this.assignmentDetailIndex].firstFacID;
            this.lastNumericFacID = this.assignmentDetails[this.assignmentDetailIndex].lastFacID;
            this.oldLastID = this.lastID;

            //Highlight the table row
            if (this.selectedRow) this.selectedRow.children().removeClass('info');
            this.selectedRow = $(el.target).closest('tr');
            this.selectedRow.children().addClass('info')
        }
        
    }


    /*****************************************************************************************************
     * The user deletes an assignment 
     * index - the index of the selected assignment
     ****************************************************************************************************/
    async deleteProposedClient(index) {
        //Is this a saved assignment
        if (this.assignmentDetails[index].assignedDate) {
               //Update the client
               this.proposedClient[index].idsAvailable = parseInt(this.proposedClient[index].idsAvailable) + parseInt(this.assignmentDetails[index].idsAssigned);
               this.idsRemaining = parseInt(this.idsRemaining) + parseInt(this.assignmentDetails[index].idsAssigned);
               this.totalIdsAssigned = parseInt(this.totalIdsAssigned) - parseInt(this.assignmentDetails[index].idsAssigned);
               for(var i = 0; i<this.proposedClient[index].assignments.length; i++){
                   if(this.proposedClient[index].assignments[i].assignment == this.requests.selectedRequestDetail._id){
                       this.proposedClient[index].assignments.splice(i,1);
                       if(this.proposedClient[index].assignments.length == 0 && this.proposedClient[index].clientStatus != this.config.SANDBOX_ID ) this.proposedClient[index].clientStatus = this.config.UNASSIGNED_CLIENT_CODE;
                       break;
                   }
               }
               this.assignmentDetails.splice(index, 1);
               if(this.assignmentDetails.length == 0) this.requests.selectedRequestDetail.requestStatus = this.config.UNASSIGNED_REQUEST_CODE
               
        } else {
            //Undo the changes made by the assignment
            this.idsRemaining = parseInt(this.idsRemaining) + parseInt(this.assignmentDetails[index].idsAssigned);
            this.totalIdsAssigned = parseInt(this.totalIdsAssigned) - parseInt(this.assignmentDetails[index].idsAssigned);
            this.assignmentDetailIndex = -1;
            //Delete the assignment and the client
            this.assignmentDetails.splice(index, 1);
            this.proposedClient.splice(index, 1);
        }
    }

    /*****************************************************************************************************
     * Save the request 
     ****************************************************************************************************/
    async save() {
        // if (this.validation.validate(1, this)) {
        if(this._buildRequest()){
            this.requests.setSelectedRequest(this.requestToSave);
            let serverResponse = await this.requests.saveRequest();
            if (!serverResponse.status) {
                this.utils.showNotification("The request was updated", "", "", "", "", 5);
                await this.systems.saveClients(this.proposedClient);
                this._cleanUp();
            }

        }
        // }
    }

    /*****************************************************************************************************
     * Build the data objects to send to the server 
     ****************************************************************************************************/
    _buildRequest(){
        //Check to see if this assignment already exists
        if(this.requests.selectedRequestDetail.requestStatus == this.config.ASSIGNED_REQUEST_CODE){
            // this.requests.selectedRequestDetail.modifiedDate = new Date();    
            for(var i = 0; i < this.assignmentDetails.length; i++){
                for(var j = 0; j < this.proposedClient.length; j++){
                    this.proposedClient[j].lastFacIdAssigned = this.lastNumericFacID;
                    this.proposedClient[j].lastIdAssigned = this.lastID;
                    if(this.assignmentDetails[i].clientId == this.proposedClient[j]._id){
                        //If this isn't a new assignment
                        if(this.assignmentDetails[i].assignedDate){
                            this.assignmentDetails[i].firstFacID = this.firstNumericFacID;
                            this.assignmentDetails[i].lastFacID =  this.lastNumericFacID;
                            //If there are more than one assignment, make the client shared
                            if(this.proposedClient[j].assignments.length > 1) this.proposedClient[j].clientStatus = this.config.SHARED_CLIENT_CODE;
                            //Search for the assignment in the client and update it
                            for(var k = 0; k<this.proposedClient[j].assignments.length; k++){
                                if(this.proposedClient[j].assignments[k].assignment == this.requests.selectedRequestDetail._id){
                                    this.proposedClient[j].assignments[k].studentIDRange = this.assignmentDetails[i].studentUserIds;
                                    this.proposedClient[j].assignments[k].facultyIDRange = this.assignmentDetails[i].facultyUserIds;
                                }
                            }
                        } else {
                            //It's a new assignment
                            this.assignmentDetails[i].assignedDate = new Date();
                            if(this.requests.selectedRequestDetail.requestId.courseId != this.config.SANDBOX_ID) this.proposedClient[i].clientStatus = this.config.ASSIGNED_CLIENT_CODE;
                            this.proposedClient[i].idsAvailable = parseInt(this.proposedClient[i].idsAvailable) - parseInt(this.totalIdsAssigned);
                            this.proposedClient[i].assignments.push({
                                assignment: this.requests.selectedRequestDetail._id,
                                studentIDRange: this.assignmentDetails[i].studentUserIds,
                                facultyIDRange: this.assignmentDetails[i].facultyUserIds,
                                institutionId: this.requests.selectedRequestDetail.requestId.institutionId,
                            });
                        }
                    }
                }
            }    
            
        } else {
            //First assignment for this request
            this.requests.selectedRequestDetail.assignedDate = new Date();
            this.requests.selectedRequestDetail.requestStatus = this.config.ASSIGNED_REQUEST_CODE;
            
            //Update the client records
            for(var i = 0; i < this.proposedClient.length; i++){
                this.assignmentDetails[i].firstFacID = this.firstNumericFacID;
                this.assignmentDetails[i].lastFacID =  this.lastNumericFacID;
                this.proposedClient[i].lastFacIdAssigned = this.lastNumericFacID;
                this.proposedClient[i].lastIdAssigned = this.lastID;
                if(this.requests.selectedRequestDetail.requestId.courseId != this.config.SANDBOX_ID) this.proposedClient[i].clientStatus = this.config.ASSIGNED_CLIENT_CODE;
                this.proposedClient[i].idsAvailable = parseInt(this.proposedClient[i].idsAvailable) - parseInt(this.totalIdsAssigned);
                this.proposedClient[i].assignments.push({
                    assignment: this.requests.selectedRequestDetail._id,
                    studentIDRange: this.assignmentDetails[i].studentUserIds,
                    facultyIDRange: this.assignmentDetails[i].facultyUserIds,
                    institutionId: this.requests.selectedRequestDetail.requestId.institutionId                    
                });

            };
        }
        
        //Construct the object to submit to the server
        this.requests.selectedRequestDetail.idsAssigned = parseInt(this.totalIdsAssigned);
        this.requests.selectedRequestDetail.assignments = this.assignmentDetails;
        this.requestToSave = this.utils.copyObject(this.requests.selectedRequestDetail.requestId);
        this.requestToSave.requestDetailsToSave = new Array();
        delete this.requests.selectedRequestDetail['requestId'];
        this.requestToSave.requestDetailsToSave.push(this.requests.selectedRequestDetail);

        return true;
    }
    

    back() {
        this._cleanUp();
    }

    _cleanUp() {
        this.proposedClient = new Array();
        this.assignmentDetails = new Array();
        this.proposedAssignment = new Object();
        this.parameterIndex = new Object();
        this.systems.selectSystem();
        this.firstID = 0;
        this.lastID = 0;
        this.requestSelected = false;
        this.customerMessage = false;
    }

    findAssignedClients(){
        this.assignmentDetails.forEach((item) => {
            this.systems.selectClientFromID(item.systemId, item.clientId);
            this.proposedClient.push(this.systems.selectedClient);
        })
    }

    systemSelected(){
        this.systems.selectedSystemFromId($("#systemSelect").val());
    }

    openEditStudentTemplate() {
        this.showAddStudentTemplate = true;
    }

    cancelEditStudentTemplate(){
        this.showAddStudentTemplate = false;
    }

    async saveStudentTemplate(){
        await this.products.saveProduct();
        this.studentIDTemplates = this.products.selectedProduct.defaultStudentIdPrefix.split(":");
        this.showAddStudentTemplate = false;
    }

    changeManualMode(){
        localStorage.setItem('manualMode', this.manualMode);
    }
    
    changeUnassignedOnly(){
        localStorage.setItem('unassignedOnly', this.unassignedOnly);
    }

    changeRoundTo10(){
        localStorage.setItem('roundTo10', this.roundTo10);
    }

    customerAction(){
        this.message = {
            _id: this.requests.selectedRequestDetail._id,
            customerMessage: "",
            requestStatus: this.config.CUSTOMER_ACTION_REQUEST_CODE,
            audit: {
                property: 'Send Message',
                eventDate: new Date(),
                oldValue: this.customerMessageText,
                personId: this.app.user._id
            }
        }

        this.customerMessage = true;
        $("#customerMessage").focus();
    }

    async sendCustomerAction(){
        this.message.customerMessage = $("#customerMessage").val();
        let serverResponse = await this.requests.sendCustomerMessage(this.message);
        if (!serverResponse.status) {
            this.utils.showNotification("The message was sent", "", "", "", "", 5);
            this._cleanUp();
        }
    }

    cancelCustomerAction(){
        this.customerMessage = false;
    }
    
    openSettings(){
        this.showSettings = ! this.showSettings;
        if( this.showSettings){
            this.idBuffer = localStorage.getItem('idBuffer')  ? localStorage.getItem('idBuffer') : this.config.REGULAR_ID_BUFFER;
            this.sandBoxIDs = localStorage.getItem('sandBoxIDs')  ? localStorage.getItem('sandBoxIDs') : this.config.SANDBOX_ID_COUNT;
        }  
    }
    
    saveSettings(){
        localStorage.setItem('idBuffer', this.idBuffer);
        localStorage.setItem('sandBoxIDs', this.sandBoxIDs);
        this.showSettings = false;
    }
    
    restoreDefaults(){
        this.idBuffer = this.config.REGULAR_ID_BUFFER;
        this.sandBoxIDs = this.config.SANDBOX_ID_COUNT;
        // localStorage.setItem('idBuffer', this.config.REGULAR_ID_BUFFER);
        // localStorage.setItem('sandBoxIDs', this.config.SANDBOX_ID_BUFFER);
    }
    

}