import { inject } from 'aurelia-framework';
import { HelpTickets } from '../../../resources/data/helpTickets';
import { ClientRequests } from '../../../resources/data/clientRequests';
import { Sessions } from '../../../resources/data/sessions';
import { Products } from '../../../resources/data/products';
import { Systems } from '../../../resources/data/systems';
import { People } from '../../../resources/data/people';
import { DocumentsServices } from '../../../resources/data/documents';
import { Store } from '../../../store/store';
import { AppConfig } from '../../../appConfig';
import { Utils } from '../../../resources/utils/utils';

@inject(HelpTickets, ClientRequests, Sessions, Products, Systems, People, DocumentsServices, Store, AppConfig, Utils)
export class Assignments {

    pageSize = 200;
    archive = false;


    constructor( helpTickets, requests, sessions, products, systems, people, documents, store, config, utils) {
        this.helpTickets = helpTickets;
        this.requests = requests;
        this.sessions = sessions;
        this.products = products;
        this.systems = systems;
        this.people = people;
        this.store = store;
        this.config = config;
        this.utils = utils;

        this.sessionDatesMessage = "";
        this.selectedProducts = [];
        this.view = 'table';
        this.filterAssigned = true;

        this.userObj = this.store.getUser('user');

        this.filters = [
            { value: '', keys: ['requestStatus'] },
            { value: '', keys: ['productId.name'] },
            { value: '', keys: ['requestId.courseId.name', 'requestId.courseId.number'] },
            { value: '', keys: ['requestId.personId.fullName'] },
            { value: '', keys: ['requestId.institutionId.name'] },
            { value: '', custom: this.filterSystem}
        ];

        this.verticalDisplay = true;
    }

    filterSystem(filterValue, row) {
        if(!filterValue) return true;
        let upperFilterValue = filterValue.toUpperCase();
        let keep = false;
        row.assignments.forEach(item => {
            if(item.systemId.sid.indexOf(upperFilterValue) > -1) keep = true;
        })
        return keep;
    }

    async activate() {
        let responses = await Promise.all([
            this.sessions.getObjectsArray('/active?order=sortOrder'),
            // this.systems.getObjectsArrayWithClients(),
            
        ]);

        let uccRoles = "";
        this.config.ROLES.forEach(item => {
            if (item.UCConly) uccRoles += item.role + ":";
        });
        await this.people.getUCCStaff(uccRoles);

        // this.systems.getObjectsArray();
        this.products.getObjectsArray('?order=name');

        this.filterStatuses = [this.config.UPDATED_REQUEST_CODE, this.config.RETIRED_REQUEST_CODE, this.config.ASSIGNED_REQUEST_CODE, this.config.REPLIED_REQUEST_CODE, this.config.PROVISIONAL_REQUEST_CODE, this.config.DELETED_REQUEST_CODE];
    }

    attached() {
        $('[data-toggle="tooltip"]').tooltip();
        // $('.selectpicker').selectpicker();
        $("#assignTab").addClass('active');
        this.getRequests();
    }

    async getRequests() {
        $("#loading").show();
        if (this.selectedSession) {
            this.sessions.selectSessionById(this.selectedSession);
            if (this.filterAssigned) {
                await this.requests.getRequestDetails('?filter=[and]sessionId|eq|' + this.selectedSession + ':requestStatus|gt|' + this.config.ASSIGNED_REQUEST_CODE);
                this.requestSelected = false;
            } else {
                await this.requests.getRequestDetails('?filter=sessionId|eq|' + this.selectedSession);
                this.requestSelected = false;
            }
        }
        $("#loading").hide();
    }

    async selectARequest(request) {
        if(request.requestStatus === this.config.DELETED_REQUEST_CODE) {
            this.utils.showNotification('That request has been deleted');
            return;
        }
        this.anAssignmentChanged = false;
        this.provisionalClientList = [];
        this.assignmentsToUpdate = [];
        this.assignmentsToDelete = [];
        let responses = await Promise.all([
            this.requests.getRequestDetail(request._id),
            this.products.getObject(request.productId._id)
        ]);

        this.firstId = parseInt(this.requests.selectedDetail.productId.firstAllowableId);
        this.lastId = parseInt(this.requests.selectedDetail.requestId.undergradIds) + parseInt(this.requests.selectedDetail.requestId.graduateIds);
        this.defaultStudentIdPrefix = this.requests.selectedDetail.productId.defaultStudentIdPrefix;
        this.firstFacId = 1;
        this.lastFacId = 2;
        this.defaultFacultyIdPrefix = this.requests.selectedDetail.productId.defaultFacultyIdPrefix;

        if (!this.requests.selectedDetail.productId.systems[0]) {
            this.utils.showNotification("You need to assign a system to this product before you can assign this request", 'warning');
        } else {
            await this.getProductSystems();
        }

        if (this.productSystems && this.productSystems.length) {
            this.selectedSystem = this.productSystems[0];
            this.selectedSystemId = this.selectedSystem._id;
            $('#' + this.selectedSystemId).prop('checked', true)
        }
        $('.clientTabs').removeClass('active');
        $('.clientTabs').removeClass('show');
        if (this.requests.selectedDetail.requestStatus == this.config.ASSIGNED_REQUEST_CODE) {
            $('.assignedTab').addClass('active show');
            $('#assigned-tab').addClass('active');
            this.selectedAssignmentIndex = 0;
            if (this.verticalDisplay) {
                setTimeout(() => { $("#lastId").focus(); }, 500);
            } else {
                setTimeout(() => { $("#lastVerticalId").focus(); }, 500);
            }

        } else {
            $('.proposedTab').addClass('active show');
            $('#proposed-tab').addClass('active');
        }

        this.provisionalClientList = [];
        this.view = 'assign';
    }

    async getProductSystems() {
        this.systemConfigured = false;
        this.productSystems = new Array();
        var productSystemsSIDs = "";
        this.requests.selectedDetail.productId.systems.forEach(item => {
            let delimiterChar = productSystemsSIDs.length ? ":" : "";
            productSystemsSIDs += delimiterChar + item.sid;
        });

        let response = await this.systems.getConfiguredProductSystems(productSystemsSIDs);
        if (!response.error) {
            response.forEach(item => {
                if (item.sessions.indexOf(this.sessions.selectedObject.session) > -1 && item.active) this.productSystems.push(item);
            });
        }
        if (this.productSystems != null && this.productSystems.length) this.systemConfigured = true;
        this.productSystems = this.productSystems.sort((a, b) => {
            return (a['sid'] < b['sid']) ? -1 : (a['sid'] > b['sid']) ? 1 : 0;
        });

        // this.refreshSelects();
        // FIX THIS: this.selectedSystemId = this.productSystems[0]._id;
    }

    calcIDRangeFromTemplate() {
        if (!this.defaultStudentIdPrefix) {
            return;
        } else {
            if (this.defaultStudentIdPrefix.indexOf(this.config.ID_WILDCARD) == -1) {
                this.provisionalClientList[this.selectedClientIndex].proposedClient.studentUserIds = this.defaultStudentIdPrefix;
            } else {
                let firstID = this.firstId > 0 ? this.getID(this.defaultStudentIdPrefix, this.firstId) : "";
                let lastNumericalID = parseInt(this.lastId) + parseInt(this.firstId);
                let lastID = this.lastId > 0 ? this.getID(this.defaultStudentIdPrefix, lastNumericalID) : "";

                this.provisionalClientList[this.selectedClientIndex].proposedClient.studentUserIds = firstID + ' - ' + lastID;
            }

        }

        this.calcFacIDRangeFromTemplate();

    }

    calcFacIDRangeFromTemplate() {
        if (!this.defaultFacultyIdPrefix) {
            return;
        } else {
            if (this.defaultFacultyIdPrefix.indexOf(this.config.ID_WILDCARD) == -1 || this.requests.selectedDetail.requestId.courseId._id === this.config.SANDBOX_ID) {
                this.provisionalClientList[this.selectedClientIndex].proposedClient.facultyUserIds = this.defaultFacultyIdPrefix;
            } else {
                let firstID = this.firstId > 0 ? this.getID(this.defaultStudentIdPrefix, this.firstFacId) : "";
                let lastNumericalID = parseInt(this.lastFacId) + parseInt(this.firstFacId);
                let lastID = this.lastId > 0 ? this.getID(this.defaultStudentIdPrefix, lastNumericalID) : "";
                this.provisionalClientList[this.selectedClientIndex].proposedClient.facultyUserIds = firstID + ' - ' + lastID;
            }
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

    // refreshSelects() {
    //     this.utils.refreshSelect("#systemSelector", this.productSystems, "_id", this.selectedSystemId);
    // }

    // refreshProductSelect() {
    //     this.utils.refreshSelect("#productSelect", this.products.objectsArray, "_id", this.selectedRequestDetail.productId._id);
    // }

    selectClient(client, index) {
        let clientIndex = this.getClientIndex(client.client);
        if (!this.checkForExitingClientonProvisionalList(client)) {
            if (client.clientStatus == this.config.ASSIGNED_CLIENT_CODE) {
                this.proposedClient = this.utils.copyObject(client);
                this.proposedIndex = clientIndex;
                $('#confirmShare').modal('show');
            } else {
                this.provisionalClientList.push({
                    proposedClient: this.utils.copyObject(client),
                    proposedClientIndex: clientIndex,
                    proposedSystem: this.selectedSystem,
                    share: false
                });
                this.selectedClientIndex = this.provisionalClientList.length - 1;
            }
        }
        this.calcIDRangeFromTemplate();
        if (this.verticalDisplay) {
            setTimeout(() => { $("#lastId").focus(); }, 500);
        } else {
            setTimeout(() => { $("#lastVerticalId").focus(); }, 500);
        }
    }

    checkForExitingClientonProvisionalList(client) {
        let alreadyOnList = false;
        this.provisionalClientList.forEach(item => {
            if (client.client === item.proposedSystem.clients[item.proposedClientIndex].client && client.systemId === this.selectedSystemId) {
                alreadyOnList = true;
            }
        })
        return alreadyOnList;
    }

    getClientIndex(client) {
        for (let i = 0; i < this.selectedSystem.clients.length; i++) {
            if (this.selectedSystem.clients[i].client === client) return i;
        }
        return 0;
    }

    shareClient() {
        this.provisionalClientList.push({
            proposedClient: this.proposedClient,
            proposedClientIndex: this.proposedIndex,
            proposedSystem: this.selectedSystem,
            share: true
        });
        this.selectedClientIndex = this.provisionalClientList.length - 1;
        $('#confirmShare').modal('hide');
        if (this.verticalDisplay) {
            setTimeout(() => { $("#lastId").focus(); }, 500);
        } else {
            setTimeout(() => { $("#lastVerticalId").focus(); }, 500);
        }
    }

    async selectAssignedClient(index) {
        this.selectedAssignmentIndex = index;
        let response = await this.getSystemForAssignment();
        this.assignmentsToUpdate.push(response);
        $("#assignedStudentIDs").focus();
    }

    async getSystemForAssignment() {
        let systemFound = false;
        let object;
        this.productSystems.forEach(item => {
            if (this.requests.selectedDetail.assignments[this.selectedAssignmentIndex].systemId === item._id) {
                object = {
                    systemToUpdate: item,
                    assignmentIndex: this.selectedAssignmentIndex
                };
                systemFound = true;
            }
        })

        if (!systemFound) {
            let response = this.systems.getObject(this.requests.selectedDetail.assignments[this.selectedAssignmentIndex].systemId);
            if (!response.error) {
                object = {
                    systemToUpdate: response,
                    assignmentIndex: this.selectedAssignmentIndex
                };
            }
        }
        return object;

    }

    deleteClientFromAssignedList(index, event) {
        event.stopPropagation();
        this.selectedAssignmentIndex = index;
        $('#confirmDeleteAssigned').modal('show');
    }

    async deleteAssignment() {
        let response = await this.getSystemForAssignment();
        this.assignmentsToDelete.push(response);
        $('#' + this.requests.selectedDetail.assignments[response.assignmentIndex].systemId + "-" + this.requests.selectedDetail.assignments[response.assignmentIndex].client).addClass('deletedAssignment');
        $('#confirmDeleteAssigned').modal('hide');
        this.utils.showNotification('You must save the request to complete the operation');
    }

    assignmentChanged() {
        this.anAssignmentChanged = true;
    }

    cancel() {
        this.provisionalClientList = [];
    }

    deleteClientFromProposedList(index) {
        this.provisionalClientList[index].proposedClient.facultyPassword = "";
        this.provisionalClientList[index].proposedClient.facultyUserIds = "";
        this.provisionalClientList[index].proposedClient.studentPassword = "";
        this.provisionalClientList[index].proposedClient.studentUserIds = "";
        setTimeout(() => {this.provisionalClientList.splice(index, 1)},500);
    }

    systemSelected(id) {
        this.selectedSystemId = id;
        this.selectProductSystem(this.selectedSystemId)
    }

    selectProductSystem(id) {
        this.productSystems.forEach((item, index) => {
            if (item._id === id) {
                this.selectedSystem = item;
                this.selectedSystemIndex = index;
            }
        });
        this.checkClientConfigured();
    }

    checkClientConfigured() {
        this.clientsConfigured = false;
        for (let i = 0; i < this.selectedSystem.clients.length; i++) {
            if (this.selectedSystem.clients[i].productId === this.products.selectedObject._id) {
                this.clientsConfigured = true;
                break;
            }
        }
    }

    selectProposedClient(index) {
        //TODO: Mark this as the selected client
        this.selectedClientIndex = index;
    }

    editRequest(request, event) {
        event.stopPropagation();
    }

    buildRequestDetailToSave(request) {
        this.requestDetailToSave = {
            productId: request.productId._id,
            requiredDate: request.requiredDate,
            requestStatus: this.config.UNASSIGNED_REQUEST_CODE,
            modifiedDate: new Date(),
            createdDate: new Date(),
            sessionId: request.requestId.sessionId,
            requestId: request.requestId._id
        }
    }

    openCloneModal(request, event) {
        event.stopPropagation();
        this.buildRequestDetailToSave(request);
        $('#confirmClone').modal('show');
    }

    async cloneRequest() {
        let response = await this.requests.cloneRequest(this.requestDetailToSave);
        if (!response.error) {
            this.utils.showNotification("The request was cloned");
        }
        $('#confirmClone').modal('hide');
    }

    async viewAssignment(detail, event) {
        event.stopPropagation();
        this.assignmentDetails = [];
        this.systemNotes = [];
        this.notes = "";
        await this.requests.getRequestDetail(detail._id);
        await this.products.getObject(detail.productId._id);
        await this.systems.getObjectsArray();
        this.notes += this.requests.selectedDetail.techComments ? this.requests.selectedDetail.techComments : "";
        this.requests.selectedDetail.assignments.forEach(item => {
            let system = this.getSystem(item.systemId);
            this.assignmentDetails.push({
                assignment: item,
                system: system
            });
            if(system.systemNotes && system.systemNotes !== null && system.systemNotes.length && !this.isSystemOnList(system.sid)) {
                // this.systemNotes.push({sid: system.sid, notes: system.systemNotes});
                this.notes += "<div class='topMargin'><h3>System " + system.sid + "</h3>" + system.systemNotes + "</div>"  
                this.systemNotes.push(system.sid)
            }
        });
        this.notes += this.products.selectedObject.productInfo ? "<h3>" + this.products.selectedObject.name + "</h3>" + this.products.selectedObject.productInfo : "";
     
        this.view = 'form';
    }

    isSystemOnList(sid){
        let onList = false;
        this.systemNotes.forEach(item => {
            if(item === sid) onList = true;
        })
        return onList;
    }

    getSystem(id) {
        let system = null;
        for (let i = 0; i < this.systems.objectsArray.length; i++) {
            if (this.systems.objectsArray[i]._id === id) {
                system = this.systems.objectsArray[i];
                break;
            }
        }
        return system;
    }

    buildAssignment() {
        this.systemsToSave = [];
        this.provisionalClientList.forEach(item => {
            this.requests.selectedDetail.requestStatus = this.config.ASSIGNED_REQUEST_CODE;
            this.requests.selectedDetail.assignments.push({
                systemId: item.proposedClient.systemId,
                client: item.proposedClient.client,
                studentUserIds: item.proposedClient.studentUserIds,
                studentPassword: item.proposedClient.studentPassword,
                facultyUserIds: item.proposedClient.facultyUserIds,
                facultyPassword: item.proposedClient.facultyPassword,
                staffId: this.userObj._id,
                assignedDate: new Date()
            });

            item.proposedSystem.clients[item.proposedClientIndex].assignments.push({
                personId: this.requests.selectedDetail.requestId.personId,
                institutionId: this.requests.selectedDetail.requestId.institutionId,
                studentIDRange: item.proposedClient.studentUserIds,
                facultyIDRange: item.proposedClient.facultyUserIds,
                requestDetail: this.requests.selectedDetail._id
            });

            if (item.proposedSystem.clients[item.proposedClientIndex].clientStatus == this.config.UNASSIGNED_CLIENT_CODE) {
                item.proposedSystem.clients[item.proposedClientIndex].clientStatus = this.config.ASSIGNED_CLIENT_CODE;
            } else if (item.proposedSystem.clients[item.proposedClientIndex].clientStatus == this.config.ASSIGNED_CLIENT_CODE &&
                item.share) {
                item.proposedSystem.clients[item.proposedClientIndex].clientStatus = this.config.SHARED_CLIENT_CODE;
            }
        });

        if (this.anAssignmentChanged) {
            this.assignmentsToUpdate.forEach(item => {
                this.updateClient(item);
            });
        }

        this.assignmentsToDelete.forEach(item => {
            this.deleteAnAssignment(item);
            this.requests.selectedDetail.assignments.splice(item.assignmentIndex, 1);
            if (this.requests.selectedDetail.assignments.length === 0) {
                this.requests.selectedDetail.requestStatus = this.config.UNASSIGNED_REQUEST_CODE;
            }
        });
    }

    updateClient(item) {
        for (let i = 0; i < item.systemToUpdate.clients.length; i++) {
            if (item.systemToUpdate.clients[i].client === this.requests.selectedDetail.assignments[item.assignmentIndex].client) {
                item.systemToUpdate.clients[i].assignments.forEach(assignment => {
                    if (assignment.requestDetail === this.requests.selectedDetail._id) {
                        assignment.studentIDRange = this.requests.selectedDetail.assignments[item.assignmentIndex].studentUserIds;
                        assignment.facultyIDRange = this.requests.selectedDetail.assignments[item.assignmentIndex].facultyUserIds;
                    }
                })
            }
        }
    }

    deleteAnAssignment(item) {
        for (let i = 0; i < item.systemToUpdate.clients.length; i++) {
            if (item.systemToUpdate.clients[i].client === this.requests.selectedDetail.assignments[item.assignmentIndex].client) {
                for (let j = 0; j < item.systemToUpdate.clients[i].assignments.length; j++) {
                    if (item.systemToUpdate.clients[i].assignments[j].requestDetail === this.requests.selectedDetail._id) {
                        item.systemToUpdate.clients[i].assignments.splice(j, 1);
                        if (item.systemToUpdate.clients[i].assignments.length === 0) {
                            item.systemToUpdate.clients[i].clientStatus = this.config.UNASSIGNED_CLIENT_CODE;
                        }
                        break;
                    }
                }
            }
        }
    }

    async save() {
        this.buildAssignment();
        let response = await this.requests.saveRequestDetail();
        if (!response.error) {
            this.utils.updateArrayItem(response, this.requests.detailsArray);
            this.requests.replaceObject(response);
            this.filters[0].value="2";
            this.filters[0].value="";
            this.provisionalClientList.forEach(item => {
                this.systems.setObject(item.proposedSystem);
                this.systems.saveObject()
            });
            this.assignmentsToUpdate.forEach(item => {
                this.systems.setObject(item.systemToUpdate);
                this.systems.saveObject()
            });
            this.assignmentsToDelete.forEach(item => {
                this.systems.setObject(item.systemToUpdate);
                this.systems.saveObject()
            });
            this.cleanUp();
        }
    }

    async delete(){
        this.requests.findDetailIndex();    
        let response = await this.requests.deleteDetail();
        if(!response.error){
            this.requests.deleteSelected();
            this.utils.showNotification('The request was deleted');
        }
        this.cleanUp();
    }

    back() {
        this.requestSelected = false;
        this.selectedAssignmentIndex = -1;
        this.selectedClientIndex = -1;
        this.view = 'table';
    }

    cleanUp() {
        this.provisionalClientList = [];
        this.back();
    }

    clearFilters() {
        this.filters[0].value = "";
        this.filters[1].value = "";
        this.filters[2].value = "";
        this.filters[3].value = "";
        this.filters[4].value = "";
        this.filters[5].value = "";
    }

    showProfile(request, event) {
        this.profileRequest = request;
        $("#hoverProfile").css("top", event.clientY - 150);
        $("#hoverProfile").css("left", event.clientX - 400);
        $("#hoverProfile").css("display", "block");
        event.stopPropagation();
    }

    hideProfile() {
        $("#hoverProfile").css("display", "none");
    }

    showStatusList(request, event){
        event.stopPropagation();
        if(request.requestStatus == this.config.ASSIGNED_REQUEST_CODE){
            return;
        }
        this.profileRequest = request;
        $("#statusMenu").css("top", event.clientY - 150);
        $("#statusMenu").css("left", event.clientX - 400);
        $("#statusMenu").css("display", "block");
        event.stopPropagation();
    }

    hideStatusMenu(){
        $("#statusMenu").css("display", "none");
    }

    async changeStatus(code){
        this.profileRequest.requestStatus = code;
        this.requests.setDetail(this.profileRequest );
        let serverResponse = await this.requests.saveRequestDetail();
        if (!serverResponse.error) {
            this.utils.showNotification("The request was updated");
            this.hideStatusMenu();
        }
    }

    copyEmail(request) {
        const hiddenElement = document.createElement('textarea');
        hiddenElement.style.display = 'none !important;';
        hiddenElement.innerText = request.requestId.personId.email;

        document.body.appendChild(hiddenElement);
        hiddenElement.select();

        document.execCommand('SelectAll');
        document.execCommand('Copy');

        document.body.removeChild(hiddenElement);
        this.hideProfile();
    }

    async editRequest(request, event) {
        event.stopPropagation();
        this.selectedRequestDetail = this.utils.copyObject(request);
        this.editStartDate = this.selectedRequestDetail.requestId.startDate;
        this.originalRequestDetail = this.utils.copyObject(this.selectedRequestDetail);
        this.refreshProductSelect();

        this.view = 'edit';
    }

    backEdit() {
        this.view = 'table';
    }

    async saveEdit() {
        this.requests.setDetail(this.selectedRequestDetail);
        let serverResponse = await this.requests.saveRequestDetail();
        if (!serverResponse.error) {
            this.utils.updateArrayItem(serverResponse, this.requests.detailsArray);
            this.utils.showNotification("The request was updated");
            this.backEdit();
        }
    }
}