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

import moment from 'moment';
import $ from 'jquery';

@inject(Router, AppConfig, People, AppState, DataTable, Utils, Sessions, Products, Systems, ClientRequests)
export class ClientRequestAnalytics {


    constructor(router, config, people, app, datatable, utils, sessions, products, systems, requests) {
        this.router = router;
        this.config = config;
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

    attached() {
        $('[data-toggle="tooltip"]').tooltip();
    }

    canActivate() {
        if (!this.app.user._id) this.router.navigate('logout');
    }

    activate() {
        this.getData();
    }

    async getData() {
        let responses = await Promise.all([
            this.sessions.getSessionsArray(true, '?filter=[in]sessionStatus[list]Active:Requests&order=startDate'),
            this.people.getPeopleArray(true, '?order=lastName'),
            this.people.getInstitutionsArray(true, '?order=name'),
            this.products.getProductsArray(true, '?filter=active|eq|true&order=Category'),
            this.systems.getSystemsArray(true)
        ]);
    }

    updateArray() {
        if (this.requests.requestsDetailsArray && this.requests.requestsDetailsArray.length) {
            this.displayArray = this.requests.analyticsResultArray;
            this.baseArray = this.displayArray;
            for (var i = 0; i < this.baseArray.length; i++) {
                this.baseArray[i].originalIndex = i;
            }
        } else {
            this.displayArray = new Array();
        }
    }

    async getRequests() {
        if (this.selectedSession) {
            this.numCols = this.config.REQUEST_STATUS.length + 1
            this.sessions.selectSessionById(this.selectedSession);
            await this.requests.getClientRequestsDetailsArray(true, '?filter=sessionId|eq|' + this.selectedSession);
            if (this.requests.requestsDetailsArray && this.requests.requestsDetailsArray.length) {
                this.requests.groupRequestsByInstitution();
                this.updateArray();
                // this.utils.formatDateForDatesPicker(this.requests.selectedRequest)
                this.dataTable.createPageButtons(1);
            } else {
                this.displayArray = new Array();
            }
        } else {
            this.displayArray = new Array();
        }
        
    }
}