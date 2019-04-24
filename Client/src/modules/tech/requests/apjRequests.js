import { inject } from 'aurelia-framework';
import { CommonDialogs } from '../../../resources/dialogs/common-dialogs';
import { DataTable } from '../../../resources/utils/dataTable';
import { Systems } from '../../../resources/data/systems';
import { Products } from '../../../resources/data/products';
import { APJClientRequests } from '../../../resources/data/apjClientRequests';
import { AppConfig } from '../../../config/appConfig';
import { Utils } from '../../../resources/utils/utils';
import { People } from '../../../resources/data/people';
import Validation from '../../../resources/utils/validation';

import moment from 'moment';

@inject(AppConfig, Validation, CommonDialogs, DataTable, Utils, Products, Systems, People, APJClientRequests)
export class APJRequests {
    requestSelected = 'table';
    title = "Tech Staff APJ Client Assignments";
    isCheckedAssigned = true;
    noRequests = true;
    sortProperty = '';
    sortDirection;

    constructor(config, validation, dialog, datatable, utils, products, systems, people, requests) {
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
            if (this.requestSelected == 'table') this.getRequests();
        }, this.refreshInterval * 60 * 1000);
    }

    async activate() {
        let responses = await Promise.all([
            this.products.getProductsArray('?filter=[and]active|eq|true:apj|eq|true&order=name', true),
            this.systems.getSystemsArray('?filter=apj|eq|true', true),
            this.config.getConfig(true)
        ]);
        let uccRoles = "";
        this.config.ROLES.forEach(item => {
            if (item.UCConly) uccRoles += item.role + ":";
        });
        this.people.getUCCStaff(uccRoles);
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
            await this.clientRequests.getClientRequestsDetailsArray('?filter=[and]sessionId|eq|' + this.selectedSession 
                + ':requestStatus|in|' + this.config.UNASSIGNED_REQUEST_CODE + '$' + this.config.UPDATED_REQUEST_CODE + '$' + this.config.CUSTOMER_ACTION_REQUEST_CODE, true);
            $('#loading').hide();
            if (this.clientRequests.requestsDetailsArray && this.clientRequests.requestsDetailsArray.length) {
                this.noRequests = false;
                this.clientRequests.requestsDetailsArray.forEach(item => {
                    if (item.requestId && item.requestId.courseId === null) item.requestId.courseId = { _id: this.config.SANDBOX_ID, name: this.config.SANDBOX_NAME };
                })
                this.dataTable.updateArray(this.clientRequests.requestsDetailsArray, 'requiredDate', -1);
            } else {
                this.noRequests = true;
                this.displayArray = new Array();
            }

        } else {
            $('#loading').show();
            await this.clientRequests.getClientRequestsDetailsArray('?filter=sessionId|eq|' + this.selectedSession, true);
            $('#loading').hide();
            this.clientRequests.requestsDetailsArray.forEach(item => {
                if (item.requestId && item.requestId.courseId === null) item.requestId.courseId = { _id: this.config.SANDBOX_ID, name: this.config.SANDBOX_NAME };
            })
            this.dataTable.updateArray(this.clientRequests.requestsDetailsArray, 'requiredDate', -1);
            if(this.clientRequests.requestsDetailsArray.length) this.noRequests = false;
        }

    }


}