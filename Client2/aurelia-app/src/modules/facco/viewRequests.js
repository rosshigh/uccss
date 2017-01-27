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

import $ from 'jquery';

@inject(Router, AppConfig, People, DataTable, Utils, Sessions, Products, Systems, ClientRequests)
export class ViewRequests {

    navControl = "requestsNavButtons";
    spinnerHTML = "";

    constructor(router, config,  people,  datatable, utils, sessions, products, systems, requests) {
        this.router = router;
        this.config = config;
        this.people = people;
        this.dataTable = datatable;
        this.dataTable.initialize(this);
        this.utils = utils;
        this.sessions = sessions;
        this.products = products;
        this.requests = requests;
        this.systems = systems;
    };

    attached(){
        $('[data-toggle="tooltip"]').tooltip();
    }
    
    canActivate(){
         this.userObj = JSON.parse(sessionStorage.getItem('user'));
    }

    async activate() {
        let responses = await Promise.all([
            this.sessions.getSessionsArray('?filter=[in]sessionStatus[list]Active:Requests&order=startDate', true),
            this.people.getPeopleArray('?order=lastName'),
            this.people.getInstitutionsArray( '?order=name'),
            this.products.getProductsArray('?filter=active|eq|true&order=Category'),
            this.systems.getSystemsArray(),
            this.config.getConfig()
        ]);
    }

    async getRequests() {
        if (this.selectedSession) {
            this.sessions.selectSessionById(this.selectedSession);
            await this.requests.getClientRequestsDetailFaccoArray(this.selectedSession,  this.userObj.institutionId);
            this.dataTable.updateArray(this.requests.requestsDetailsArray);
        } else {
            this.dataTable.updateArray([]);
        }
    }

    async refresh() {
        this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
        await this.getRequests();
        this.spinnerHTML = "";
    }
}