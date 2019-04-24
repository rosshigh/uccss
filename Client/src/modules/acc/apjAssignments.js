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
import { Systems } from '../../resources/data/systems';
import Validation from '../../resources/utils/validation';
import { CommonDialogs } from '../../resources/dialogs/common-dialogs';
import Flatpickr from 'flatpickr';
import { EventAggregator } from 'aurelia-event-aggregator';

import fuelux from 'fuelux';
import moment from 'moment';

@inject(Router, AppConfig, Validation, People, CommonDialogs, DataTable, Utils, Sessions, Products, Systems, APJClientRequests, SiteInfo, EventAggregator)
export class APJAssignments {

    constructor(router, config, validation, people, dialog, datatable, utils, sessions, products, systems, requests, siteInfo, ea) {
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
        this.systems = systems;

        this.dialog = dialog;
        this.ea = ea;

        this.userObj = JSON.parse(sessionStorage.getItem('user'));
        this.showTable = true;
        this.assignmentDetailIndex = 0;

    };

    async activate() {
        let responses = await Promise.all([
            this.products.getProductsArray('?filter=[and]active|eq|true:apj|eq|true&order=name', true),
            this.people.getInstitutionsArray('?filter=[and]institutionStatus|eq|01:apj|eq|true&order=name'),
            this.systems.getSystemsArray('?filter=apj|eq|true',true),
            this.people.getAPJPackages(),
            this.config.getConfig()
        ]);

        $('#loading').hide();

        // this.requests.selectRequest()
        // this.filterList();
        // this._setUpValidation();
        this.getRequests();
    }

    attached() {
        $('#loading').hide();
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
            await this.requests.getClientRequestsDetailsArray('?filter=requestStatus|in|' + this.config.UNASSIGNED_REQUEST_CODE + '$' + this.config.UPDATED_REQUEST_CODE + '$' + this.config.CUSTOMER_ACTION_REQUEST_CODE, true);
            $('#loading').hide();
            if (this.requests.requestsDetailsArray && this.requests.requestsDetailsArray.length) {
                this.noRequests = false;
                this.dataTable.updateArray(this.requests.requestsDetailsArray, 'requiredDate', -1);
            } else {
                this.noRequests = true;
                this.displayArray = new Array();
            }
        } else {
            $('#loading').show();
            await this.requests.getClientRequestsDetailsArray('?filter=sessionId|eq|' + this.selectedSession, true);
            $('#loading').hide();
            this.dataTable.updateArray(this.requests.requestsDetailsArray, 'requiredDate', -1);
            if (this.requests.requestsDetailsArray.length) this.noRequests = false;
        }

    }

    async clearFilters() {
        this.requiredDateFilterValue = "";
        this.createdDateFilterValue = "";
        this.requestStatusFilter = "";
        this.productFilterValue = "";
        this.courseFilterValue = "";
        this.helpTicketTypeFilterValue = "";
        this.institutionFilterValue = "";
        this.dataTable.updateArray(this.requests.requestsDetailsArray);
    }

    async viewAssignment(index, request) {
        this.editIndex = index;
        let response = await this.requests.getRequestDetail(request._id);
        if (!response.error) {
            this.selectedRequestDetail = response;
            this.products.selectedProductFromId(this.selectedRequestDetail.productId._id);
            if (this.selectedRequestDetail.assignments && this.selectedRequestDetail.assignments.length > 0) this.systems.selectedSystemFromId(this.selectedRequestDetail.assignments[0].systemId);
            await this.getProductSystems();
            this.showTable = false;
        }

    }

    async getProductSystems() {
        this.systemConfigured = false;
        this.productSystems = new Array();
        var productSystemsSIDs = "";
        this.products.selectedProduct.systems.forEach(item => {
            let delimiterChar = productSystemsSIDs.length ? ":" : "";
            productSystemsSIDs += delimiterChar + item.sid;
        });
        let response = await this.systems.getAPJConfiguredProductSystems(productSystemsSIDs);
        if (!response.error) {
            response.forEach(item => {
                if (item.active) this.productSystems.push(item);
            });
        }
        if (this.productSystems != null && this.productSystems.length) {
            this.systemConfigured = true;
            this.productSystems = this.productSystems.sort((a, b) => {
                return (a['sid'] < b['sid']) ? -1 : (a['sid'] > b['sid']) ? 1 : 0;
            });
            this.selectedSystem = this.productSystems[0];
            this.clientsConfigured = true;
        }
    }

    selectClient(index, client){
        this.selectedClientIndex = index;
        for (let k = 0; k < this.selectedRequestDetail.assignments.length; k++) {
            if (this.selectedRequestDetail.assignments[k].client == client.client) return;
        }

        this.selectedRequestDetail.assignments.push({
            staffId: this.userObj._id,
            client: client.client,
            systemId: client.systemId,
            assignedDate: new Date()
        });

        this.insertAssignmentIntoSystem(client,  this.selectedRequestDetail.assignments)

    }

    insertAssignmentIntoSystem(client, details) {
        let clientCopy = this.utils.copyObject(client);

        clientCopy.assignments.push({
            assignment: this.selectedRequestDetail._id,
            studentIDRange: details.studentUserIds,
            facultyIDRange: details.facultyUserIds,
            institutionId: this.selectedRequestDetail.requestId.institutionId,
            firstID: details.firstID,
            lastID: details.lastID,
            provisional: true
        });
        this.updateProductSystemsClient(clientCopy, clientCopy.systemId)
    }

    updateProductSystemsClient(client) {
        this.selectedSystem.clients[this.selectedClientIndex].assignments = client.assignments;
        this.clientSelectedIndex = client.assignments.length - 1;
    }

    save(){
        console.log(this.selectedRequestDetail.assignments)
    }

    updateClientAssignments(){
        this.selectedSystem.clients[this.selectedClientIndex].studentIDRange = this.selectedRequestDetail.assignments[this.assignmentDetailIndex].studentUserIds;
        this.selectedSystem.clients[this.selectedClientIndex].studentPassword = this.selectedRequestDetail.assignments[this.assignmentDetailIndex].studentPassword;
        this.selectedSystem.clients[this.selectedClientIndex].facultyIDRange = this.selectedRequestDetail.assignments[this.assignmentDetailIndex].facultyIDRange;
        this.selectedSystem.clients[this.selectedClientIndex].facultyPassword = this.selectedRequestDetail.assignments[this.assignmentDetailIndex].facultyPassword;
    }

    back() {
        this.showTable = true;
    }
}