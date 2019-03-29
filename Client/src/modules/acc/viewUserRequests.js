import { inject } from 'aurelia-framework';
import { CommonDialogs } from '../../resources/dialogs/common-dialogs';
import { DataTable } from '../../resources/utils/dataTable';
import { Systems } from '../../resources/data/systems';
import { Products } from '../../resources/data/products';
import { APJClientRequests } from '../../resources/data/apjClientRequests';
import { AppConfig } from '../../config/appConfig';
import { Utils } from '../../resources/utils/utils';
import { People } from '../../resources/data/people';
import Validation from '../../resources/utils/validation';

import moment from 'moment';

@inject(AppConfig, Validation, CommonDialogs, DataTable, Utils,  Products, Systems, People, APJClientRequests)
export class ViewUserAssignments {
    requestSelected = 'table';
    title = "ACC Product Requests";
    spinnerHTML = "";
    isCheckedAssigned = true;
    noRequests = true;
    sortProperty = '';
    sortDirection;

    constructor(config, validation, dialog, datatable, utils,  products, systems, people, requests) {
        this.config = config;
        this.validation = validation;
        this.validation.initialize(this);
        this._setUpValidation();
        this.dataTable = datatable;
        this.dataTable.initialize(this);
        this.utils = utils;
        this.products = products;
        this.clientRequests = requests;
        this.systems = systems;
        this.people = people;
        this.dialog = dialog;

        this.userObj = JSON.parse(sessionStorage.getItem('user'));
    };

    async attached() {
        $('[data-toggle="tooltip"]').tooltip();
        this.initialLoaded = true;

        await this.getRequests();
        $('#loading').hide();
        setInterval(() => {
            if( this.requestSelected == 'table') this.getRequests();
        }, this.refreshInterval * 60 * 1000);
    }

    async activate() {
        let responses = await Promise.all([
            this.products.getProductsArray('?filter=active|eq|true&order=name', true),
            this.systems.getSystemsArray('', true),
            this.config.getConfig(true)
        ]);
        let uccRoles = "";
        this.config.ROLES.forEach(item => {
            if (item.UCConly) uccRoles += item.role + ":";
        });
        this.people.getUCCStaff(uccRoles);
        this.unassignedOnly = localStorage.getItem('unassignedOnly') ? localStorage.getItem('unassignedOnly') == "true" : false;
        this.facultyDetails = localStorage.getItem("facultyDetails") ? localStorage.getItem("facultyDetails") == "true" : false;;
        this.initialLoaded = false;
        this.refreshInterval = this.config.CLIENT_REQUEST_REFRESH_INTERVAL;
    }

    async getRequests() {
            this.isCheckedAssigned = true;
            await this.filterInAssigned();
        
        this.clearFilters();
    }

    async refresh() {
        $('#loading').show();
        await this.getRequests();
        $('#loading').hide();
        this.spinnerHTML = "";
    }

    async editRequest(index, request) {
        this.editIndex = index;
        this.selectedRequestDetail = this.utils.copyObject(request);
        await this.products.selectedProductFromId(this.selectedRequestDetail.productId._id);
        this.editStartDate = this.selectedRequestDetail.requestId.startDate;
        this.originalRequestDetail = this.utils.copyObject(this.selectedRequestDetail);

        this.requestSelected = 'edit';
    }

    backEdit() {
        this.requestSelected = 'table';
    }

    async saveEdit() {
        var email = {};
        // this.buildAuditDetail();
        this.clientRequests.setTheSelectedRequestDetail(this.selectedRequestDetail);
        let serverResponse = await this.clientRequests.saveRequestDetail();
        if (!serverResponse.error) {
            this.utils.showNotification("The request was updated");
            this.dataTable.updateArrayMaintainFilters(this.clientRequests.requestsDetailsArray);
            this.reSort();
            this._cleanUp();
        }

    }

    /*****************************************************************************************************
     * Delete the assignment in the database
     ****************************************************************************************************/
    async deleteSaved(index) {
        //Update the client
        this.selectedSystem.clients[this.selectedClientIndex].idsAvailable = parseInt(this.selectedSystem.clients[this.selectedClientIndex].idsAvailable) + parseInt(this.selectedRequestDetail.assignments[this.assignmentDetailIndex].idsAssigned);
        this.idsRemaining = parseInt(this.idsRemaining) + parseInt(this.selectedRequestDetail.assignments[this.assignmentDetailIndex].idsAssigned);
        this.totalIdsAssigned = parseInt(this.totalIdsAssigned) - parseInt(this.selectedRequestDetail.assignments[this.assignmentDetailIndex].idsAssigned);

        //Construct the object to submit to the server
        this.selectedRequestDetail.idsAssigned = parseInt(this.selectedRequestDetail.idsAssigned) - parseInt(this.selectedRequestDetail.assignments[this.assignmentDetailIndex].idsAssigned);
        this.deleteProvisinoalClientAssignment()
        this.assignClientStatus();
        this.selectedRequestDetail.requestStatus = this.selectedRequestDetail.assignments && this.selectedRequestDetail.assignments.length > 0 ? this.config.ASSIGNED_REQUEST_CODE : this.config.UNASSIGNED_REQUEST_CODE;
        this.requestToSave = this.utils.copyObject(this.selectedRequestDetail.requestId);
        this.requestToSave.requestDetailsToSave = new Array();
        var request = this.utils.copyObject(this.selectedRequestDetail);
        delete request['requestId'];
        this.requestToSave.requestDetailsToSave.push(request);
        this.requestToSave.systemsToSave = [this.selectedSystem];

        this.clientRequests.setSelectedRequest(this.requestToSave);
        let serverResponse = await this.clientRequests.assignRequest(this.editIndex);
        if (!serverResponse.status) {
            this.dataTable.updateArrayMaintainFilters(this.clientRequests.requestsDetailsArray);
            this.reSort();
            await this.filterInAssigned();
            this.utils.showNotification("The assignment was deleted")
        }

        this.selectedAssignedClient = "";

    }

    /**
* Delete the request
*/
    delete() {
        if (this.selectedRequestDetail.assignments && this.selectedRequestDetail.assignments.length > 0) {
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
            await this.filterInAssigned()
            this.utils.showNotification("The request was deleted");
            this.dataTable.updateArray(this.clientRequests.requestsDetailsArray);
        }
        this.requestSelected = 'table';
    }

	
    back() {
        this.clientRequests.setTheSelectedRequestDetail(this.selectedRequestDetail);
        let changes = this.clientRequests.isRequestDetailDirty(this.originalRequestDetail, ['requestId', 'productId', 'techComments']);

        var newAssignment = false;
        if (this.selectedRequestDetail.assignments) {
            this.selectedRequestDetail.assignments.forEach(item => {
                if (!item.assignedDate) newAssignment = true;
            })
        }

        if (this.selectedRequestDetail.assignments.length > 0 && (changes.length > 0 || newAssignment)) {
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

    async viewAssignment(index, request) {
        this.editIndex = index;
        let response = await this.clientRequests.getRequestDetail(request._id);
        if (!response.error) {
            this.selectedRequestDetail = response;
            if (this.selectedRequestDetail.requestId && this.selectedRequestDetail.requestId.courseId === null) this.selectedRequestDetail.requestId.courseId = { _id: this.config.SANDBOX_ID, name: this.config.SANDBOX_NAME };
            this.products.selectedProductFromId(this.selectedRequestDetail.productId._id);
            if (this.selectedRequestDetail.assignments && this.selectedRequestDetail.assignments.length > 0) this.systems.selectedSystemFromId(this.selectedRequestDetail.assignments[0].systemId);
            this.requestSelected = 'view';
        }

    }

    backView() {
        this.requestSelected = 'table';
    }

    systemSelected() {
        this.selectProductSystem(this.selectedSystemId)
        if (!this.products.selectedProduct.clientRelevant) {
            this.calcAssignment();
        }
    }

    selectProductSystem(id) {
        this.selectedSystemId = id;
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
            if (this.selectedSystem.clients[i].productId === this.products.selectedProduct._id) {
                this.clientsConfigured = true;
                break;
            }
        }
    }

   
    showProfile(request, el) {
        this.profileRequest = request;
        $(".hoverProfile").css("top", window.pageYOffset + el.clientY - 175);
        $(".hoverProfile").css("left", el.clientX - 200);
        $(".hoverProfile").css("display", "block");
    }

    hideProfile() {
        $(".hoverProfile").css("display", "none");
    }

    showComment(request, el) {
        if (request.requestStatus == this.config.REPLIED_REQUEST_CODE) {
            this.commentShown = request.requestId.comments;
            $(".hover").css("top", el.clientY - 200);
            $(".hover").css("left", el.clientX - 10);
            $(".hover").css("display", "block");
        }
    }

    hideComment() {
        $(".hover").css("display", "none");
    }

   
   
    openFacultyDetails() {
        this.facultyDetails = !this.facultyDetails;
        localStorage.setItem("facultyDetails", this.facultyDetails);
    }

    changeUnassignedOnly() {
        localStorage.setItem('unassignedOnly', this.unassignedOnly);
    }

    _setUpValidation() {
        this.validation.addRule(1, "errorRange", [{
            "rule": "custom", "message": "Invalid ID range",
            "valFunction": function (context) {
                var valid = true;
                if (context.assignmentDetails) {
                    for (var i = 0; i < context.assignmentDetails.length; i++) {
                        if (context.assignmentDetails[i].notValid == 'danger') valid = false;
                    }
                }
                return valid;
            }
        }]);
    }

    _cleanUp() {
        this.firstID = 0;
        this.lastID = 0;
        this.requestSelected = 'table';
        this.customerMessage = false;
        this.selectedRequestDetail.assignments = [];
        this.selectedSystem = {};
    }

   
    async clearFilters() {
        this.requiredDateFilterValue = "";
        this.createdDateFilterValue = "";
        this.requestStatusFilter = "";
        this.productFilterValue = "";
        this.courseFilterValue = "";
        this.helpTicketTypeFilterValue = "";
        this.institutionFilterValue = "";
        this.dataTable.updateArray(this.clientRequests.requestsDetailsArray);
        // await this.filterInAssigned();
    }

    async filterInAssigned() {

        this.requiredDateFilterValue = "";
        this.createdDateFilterValue = "";
        this.requestStatusFilter = "";
        this.productFilterValue = "";
        this.courseFilterValue = "";
        this.helpTicketTypeFilterValue = "";
        this.institutionFilterValue = "";
        if (this.isCheckedAssigned) {
            $('#loading').show();
            await this.clientRequests.getClientRequestsDetailsArray('?filter=requestStatus|in|' + this.config.UNASSIGNED_REQUEST_CODE + '$' + this.config.UPDATED_REQUEST_CODE + '$' + this.config.CUSTOMER_ACTION_REQUEST_CODE, true);
            $('#loading').hide();
            if (this.clientRequests.requestsDetailsArray && this.clientRequests.requestsDetailsArray.length) {
                this.noRequests = false;
                this.dataTable.updateArray(this.clientRequests.requestsDetailsArray, 'requiredDate', -1);
            } else {
                this.noRequests = true;
                this.displayArray = new Array();
            }

        } else {
            $('#loading').show();
            await this.clientRequests.getClientRequestsDetailsArray('', true);
            $('#loading').hide();
            this.dataTable.updateArray(this.clientRequests.requestsDetailsArray, 'requiredDate', -1);
            if(this.clientRequests.requestsDetailsArray.length) this.noRequests = false;
        }

    }

    customNameFilter(value, item, context) {
        return item.requestId && item.requestId.personId.fullName.toUpperCase().indexOf(value.toUpperCase()) > -1;
    }

    statusCustomFilter(value, item, context) {
        if (item.requestStatus == context.config.ASSIGNED_REQUEST_CODE || item.requestStatus == context.config.CANCELLED_REQUEST_CODE) return false;
        return true;
    }

    institutionCustomFilter(value, item, context) {
        return item.requestId && item.requestId.institutionId && item.requestId.institutionId.name.toUpperCase().indexOf(value.toUpperCase()) > -1;
    }

    courseCustomFilter(value, item, context) {
        return item.requestId && item.requestId.courseId.name.toUpperCase().indexOf(value.toUpperCase()) > -1;
    }

    customProductNameFilter(value, item, context) {
        return item.productId.name.toUpperCase().indexOf(value.toUpperCase()) > -1;
    }

    customCourseSorter(sortProperty, sortDirection, sortArray, context) {
        this.sortProperty = 'course';
        this.sortDirection = sortDirection;
        return sortArray.sort((a, b) => {
            if (a['requestId'] !== null && b['requestId'] !== null && a['requestId']['courseId']['name'] && b['requestId']['courseId']['name']) {
                var result = (a['requestId']['courseId']['name'] < b['requestId']['courseId']['name']) ? -1 : (a['requestId']['courseId']['name'] > b['requestId']['courseId']['name']) ? 1 : 0;
            } else {
                var result = -1;
            }
            return result * sortDirection;
        });
    }

    customInstitutionsSorter(sortProperty, sortDirection, sortArray, context) {
        this.sortProperty = 'institution';
        this.sortDirection = sortDirection;
        return sortArray.sort((a, b) => {
            if (a['requestId'] !== null && b['requestId'] !== null && a['requestId']['institutionId'] && b['requestId']['institutionId']) {
                var result = (a['requestId']['institutionId']['name'] < b['requestId']['institutionId']['name']) ? -1 : (a['requestId']['institutionId']['name'] > b['requestId']['institutionId']['name']) ? 1 : 0;
            } else {
                var result = -1;
            }
            return result * sortDirection;
        });
    }

    customPersonSorter(sortProperty, sortDirection, sortArray, context) {
        this.sortProperty = 'person';
        this.sortDirection = sortDirection;
        return sortArray.sort((a, b) => {
            if (a['requestId'] !== null && b['requestId'] !== null && a['requestId']['personId']['lastName'] && b['requestId']['personId']['lastName']) {
                var result = (a['requestId']['personId']['lastName'] < b['requestId']['personId']['lastName']) ? -1 : (a['requestId']['personId']['lastName'] > b['requestId']['personId']['lastName']) ? 1 : 0;
            } else {
                var result = -1;
            }
            return result * sortDirection;
        });
    }

    customRequestStatusSorter(sortProperty, sortDirection, sortArray, context) {
        this.sortProperty = 'status';
        this.sortDirection = sortDirection;
        return sortArray.sort((a, b) => {
            var result = (a[sortProperty] < b[sortProperty]) ? -1 : (a[sortProperty] > b[sortProperty]) ? 1 : 0;
            return result * sortDirection;
        });
    }

    reSort() {
        this.dataTable.sortArray({}, {}, true);
    }

}