// import {inject} from 'aurelia-framework';
// import {Router} from "aurelia-router";
// import {CommonDialogs} from '../../../resources/dialogs/common-dialogs';
// import {DataTable} from '../../../resources/utils/dataTable';
// import {Sessions} from '../../../resources/data/sessions';
// import {Systems} from '../../../resources/data/systems';
// import {Products} from '../../../resources/data/products';
// import {ClientRequests} from '../../../resources/data/clientRequests';
// import {AppConfig} from '../../../config/appConfig';
// import {Utils} from '../../../resources/utils/utils';
// import {People} from '../../../resources/data/people';
// import Validation from '../../../resources/utils/validation';

// import moment from 'moment';
// import $ from 'jquery';

// @inject(Router, AppConfig, Validation, People, CommonDialogs, DataTable, Utils, Sessions, Products, Systems, ClientRequests)
export class ViewRequests {
    // requestSelected = false;
    // showAddStudentTemplate = false;
    // manualMode = false;
    // roundTo10 = false;
    // showAudit = false;
    // lastIDidsRemaining = -1;

    // navControl = "requestsNavButtons";
    // spinnerHTML = "";

    // constructor(router, config, validation, people, dialog, datatable, utils, sessions, products, systems, requests) {
    //     this.router = router;
    //     this.config = config;
    //     this.validation = validation;
    //     this.validation.initialize(this);
    //     this.people = people;
    //     this.dataTable = datatable;
    //     this.dataTable.initialize(this);
    //     this.utils = utils;
    //     this.sessions = sessions;
    //     this.products = products;
    //     this.requests = requests;
    //     this.systems = systems;
    //     this.dialog = dialog;
    // };

    // attached(){
    //     $('[data-toggle="tooltip"]').tooltip();
    // }
    
    // canActivate(){
    //      this.userObj = JSON.parse(sessionStorage.getItem('user'));
    // }

    // async activate() {
    //     let responses = await Promise.all([
    //         this.sessions.getSessionsArray('?filter=[in]sessionStatus[list]Active:Requests&order=startDate', true),
    //         this.people.getPeopleArray('?order=lastName'),
    //         this.people.getInstitutionsArray( '?order=name'),
    //         this.products.getProductsArray('?filter=active|eq|true&order=Category'),
    //         this.systems.getSystemsArray(),
    //         this.config.getConfig()
    //     ]);
    //     this._setUpValidation();
    // }

    // async getRequests() {
    //     if (this.selectedSession) {
    //         this.sessions.selectSessionById(this.selectedSession);
    //         await this.requests.getClientRequestsDetailsArray('?filter=sessionId|eq|' + this.selectedSession, true);
    //         if(this.requests.requestsDetailsArray && this.requests.requestsDetailsArray.length){
    //             this.dataTable.updateArray(this.requests.requestsDetailsArray);
    //         } else {
    //             this.displayArray = new Array();
    //         }
    //     } else {
    //         this.displayArray = new Array();
    //     }
    // }

    // async refresh() {
    //     this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
    //     await this.getRequests();
    //     this.spinnerHTML = "";
    // }
}