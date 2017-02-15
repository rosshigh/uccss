import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";
import {Utils} from '../../../resources/utils/utils';
import {Sessions} from '../../../resources/data/sessions';
import {Downloads} from '../../../resources/data/downloads';
import {Products} from '../../../resources/data/products';
import {Systems} from '../../../resources/data/systems';
import {HelpTickets} from '../../../resources/data/helpTickets';
import {ClientRequests} from '../../../resources/data/clientRequests';
import {People} from '../../../resources/data/people';
import Validation from '../../../resources/utils/validation';
import {DataTable} from '../../../resources/utils/dataTable';
import {AppConfig} from '../../../config/appConfig';
import {SiteInfo} from '../../../resources/data/siteInfo';

import moment from 'moment';
import $ from 'jquery';

@inject(Router, Sessions, Downloads, HelpTickets, Validation, Utils, DataTable, AppConfig, People, ClientRequests, Products, Systems, SiteInfo)
export class CreateHelpTickets{
    showInfoBox = false;
    courseSelected = false;
    showHelpTicketDescription = false;
    showInputForm = false;
    showRequests = false;
    inputForm = null;
    showTypes = false;
    inputHTML = "";
   
    spinnerHTML = "";
    filesSelected;
    selectedFiles;
    removedFiles = new Array();

    showAdditionalInfo=false;

     constructor(router, sessions, apps, helpTickets, validation, utils, datatable, config, people, clientRequests, products, systems, site) {
        this.router = router;
        this.sessions = sessions;
        this.apps = apps;
        this.helpTickets = helpTickets;
        this.people = people;
        this.utils = utils;
        this.validation = validation;
        this.validation.initialize(this);
        this.dataTable = datatable;
        this.dataTable.initialize(this);
        this.config = config;
        this.clientRequests = clientRequests;
        this.products = products;
        this.systems = systems;
        this.site = site;
    };

    attached(){
      $('[data-toggle="tooltip"]').tooltip();
    }

    canActivate(){
        this.userObj = JSON.parse(sessionStorage.getItem('user'));
    }

    async activate(){ 
         let responses = await Promise.all([
            this.helpTickets.getHelpTicketTypes('?order=category'),
            this.sessions.getSessionsArray('?filter=[or]sessionStatus|Active:Requests&order=startDate', true),
            this.people.getCoursesArray(true, '?filter=personId|eq|' + this.userObj._id + '&order=number'),
            this.apps.getDownloadsArray(true, '?filter=helpTicketRelevant[eq]true&order=name'),
            this.systems.getSystemsArray(),
            this.config.getConfig(),
            this.site.getMessageArray('?filter=category|eq|HELP_TICKETS', true)
         ]);
        this.helpTickets.selectHelpTicket();
        this.sendEmail = this.config.SEND_EMAILS;
        this.appsArray = this.apps.appDownloadsArray.filter(item => {
            return item.helpTicketRelevant;
        })
        this.editorMessage = this.getMessage('EDITOR_DESCRIPTION_MESSAGE');
        this.fileUploadMessage = this.getMessage('FILE_UPLOAD_DESCRIPTION');
    }

    categoryChanged(){
        if(this.helpTickets.selectedHelpTicket.helpTicketCategory > -1){
            this.showTypes = this.helpTickets.helpTicketTypesArray[this.helpTickets.selectedHelpTicket.helpTicketCategory].showSubtypes;
            if(!this.showTypes){
                this.helpTicketTypeMessage = this.getMessage(this.helpTickets.helpTicketTypesArray[this.helpTickets.selectedHelpTicket.helpTicketCategory].subtypes[0].message);
                this.resources = this.helpTickets.helpTicketTypesArray[this.helpTickets.selectedHelpTicket.helpTicketCategory].subtypes[0].documents;
                this.helpTickets.selectedHelpTicket.helpTicketType = this.helpTickets.helpTicketTypesArray[this.helpTickets.selectedHelpTicket.helpTicketCategory].subtypes[0].type;
                this.showRequests = false; 
                this.showHelpTicketDescription = true;
                this.showAdditionalInfo = true;
                this.inputForm = this.helpTickets.helpTicketTypesArray[this.helpTickets.selectedHelpTicket.helpTicketCategory].subtypes[0].inputForm;
                this.setupValidation(this.helpTickets.helpTicketTypesArray[this.helpTickets.selectedHelpTicket.helpTicketCategory].subtypes[0].validation);
            } else {
                this.inputForm = null;
                this.showAdditionalInfo = false;
                this.showHelpTicketDescription = false;
                this.showRequests = false;
            }
        } else {
            this.inputForm = null;
            this.showTypes = false;
            this.showAdditionalInfo = false;
            this.showHelpTicketDescription = false;
            this.showRequests = false;
        }
    }

    getMessage(messageKey){
        for(var i = 0; i< this.site.messageArray.length; i++){
            if(this.site.messageArray[i].key === messageKey) return this.site.messageArray[i].content
        }
        return "";
    }

    // /*****************************************************************************************
    // * User selected a helpticket type
    // * el - event object
    // *****************************************************************************************/
    async typeChanged(el){
        //Reset the interface
        this.clearTables();
        //Make sure the user selected a help ticket type
        if(this.helpTicketType > -1){
            this.helpTickets.selectedHelpTicket.helpTicketType = this.helpTicketType;
            this.selectedHelpTicketType = this.getIndex()

            // this.inputFormCode = this.helpTickets.helpTicketTypesArray[this.helpTickets.selectedHelpTicket.helpTicketCategory].subtypes[this.selectedHelpTicketType].inputForm.split("|");            
            // this.inputFormProcess = JSON.parse(this.inputFormCode[1]);
            // this.inputFormProcess.forEach(item => {
            //     if(item.required){
            //         var field = "helpTickets.selectedHelpTicketContent.content." + item.id;
            //         this.validation.addRule(this.helpTickets.selectedHelpTicket.helpTicketType,item.id,[{"rule":"required","message":item.message, "value": field}]);
            //     }
            // });
            

            // this.inputHTML = this.helpTickets.helpTicketTypesArray[this.helpTickets.selectedHelpTicket.helpTicketCategory].subtypes[this.selectedHelpTicketType].inputForm;

            // this.helpTicketTypeMessage = this.helpTickets.helpTicketTypesArray[this.helpTickets.selectedHelpTicket.helpTicketCategory].subtypes[this.selectedHelpTicketType].message;
            this.helpTicketTypeMessage = this.getMessage(this.helpTickets.helpTicketTypesArray[this.helpTickets.selectedHelpTicket.helpTicketCategory].subtypes[this.selectedHelpTicketType].message);
            this.showHelpTicketDescription = true;
            this.inputForm = this.helpTickets.helpTicketTypesArray[this.helpTickets.selectedHelpTicket.helpTicketCategory].subtypes[this.selectedHelpTicketType].inputForm;
            this.setupValidation(this.helpTickets.helpTicketTypesArray[this.helpTickets.selectedHelpTicket.helpTicketCategory].subtypes[this.selectedHelpTicketType].validation);
          
            await this.products.getProductsArray('?fields=_id name');
            if( this.helpTickets.helpTicketTypesArray[this.helpTickets.selectedHelpTicket.helpTicketCategory].subtypes[this.selectedHelpTicketType].clientRequired) await this.getActiveRequests();
            this.showAdditionalInfo = false;

            if(this.helpTickets.selectedHelpTicket.helpTicketType == this.config.HELP_TICKET_CLIENT_REFRESH_TYPE){
                let refreshProductArray = new Array();
                this.products.productsArray.forEach(item => {
                    var foo = item.name.toUpperCase();
                    for(var i = 0; i < this.config.REFRESH_KEYWORDS.length; i++){
                        if(foo.indexOf( this.config.REFRESH_KEYWORDS[i]) > -1) {
                            refreshProductArray.push(item._id);
                        }
                    }
                });
                 this.clientRequestsArray = this.clientRequestsArray.filter(item => {
                    return refreshProductArray.indexOf(item.productId) > -1 && item.systemId;
                });
            }
        } else {
            this.inputForm = null;
            this.showAdditionalInfo = false;
            this.showHelpTicketDescription = false;
            this.showRequests = false;
        }
    }

    setupValidation(rules){
        this.validation.clearRules();
        rules.forEach(item => {
            this.validation.addRule(1,item.control,[{"rule":item.rule,"message":item.message, "value": item.value}]);
        });
    }

    getIndex(){
        var returnIndex;
        this.helpTickets.helpTicketTypesArray[this.helpTickets.selectedHelpTicket.helpTicketCategory].subtypes.forEach((item, index) => {
            if(item.type === this.helpTickets.selectedHelpTicket.helpTicketType) {
                returnIndex = index;
            }
        })
        return returnIndex;
    }

    async getActiveRequests(){
        var sessions = "";
        this.sessions.sessionsArray.forEach(item => {
            sessions += item._id + ":";
        });
        sessions = sessions.substring(0, sessions.length-1);
        await this.clientRequests.getActiveClientRequestsArray(this.userObj._id, sessions);
        this.clientRequestsArray = new Array();
        this.clientRequests.requestsArray.forEach(item => {
            item.requestDetails.forEach(item2 => {
                if(item2.assignments && item2.assignments.length > 0){
                    item2.assignments.forEach((assign) => {
                        this.clientRequestsArray.push({
                            productId: item2.productId,
                            sessionId: item.sessionId,
                            requestStatus: item2.requestStatus,
                            systemId: assign.systemId,
                            courseId: item.courseId,
                            client: assign.client,
                            clientId: assign.clientId,
                            _id: item2._id
                        })
                    })
                } else {
                    this.clientRequestsArray.push({
                        productId: item2.productId,
                        sessionId: item.sessionId,
                        requestStatus: item2.requestStatus,
                        courseId: item.courseId,
                    })
                }
            }) 
        });
        if(this.clientRequestsArray.length > 0) this.showRequests = true;
    }

    // /*****************************************************************************************
    // * The user selected a request
    // *****************************************************************************************/
    async requestChosen(el, index){
        this.showAdditionalInfo = true;
        this.SelectedClientRequest = this.clientRequestsArray[index];
        this.selectedSessionId = this.clientRequestsArray[index].sessionId;

        if (this.selectedProductRow) this.selectedProductRow.children().removeClass('info');
        this.selectedProductRow = $(el.target).closest('tr');
        this.selectedProductRow.children().addClass('info')
    }

    cancel() {
        this.helpTickets.selectHelpTicket();
        this.helpTickets.selectHelpTicketContent();
        this.showHelpTicketDescription = false;
        this.courseSelected = false;
        this.showAdditionalInfo = false;
        this.showRequests = false;
    }

    // /*****************************************************************************************
    // * Prepare the help ticket to submit to the server
    // *****************************************************************************************/
    async buldHelpTicket(){
        this.helpTickets.selectedHelpTicket.owner = [{ "personId": "b1b1b1b1b1b1b1b1b1b1b1b1", "date": new Date() }];
        this.helpTickets.selectedHelpTicket.personId = this.userObj._id;
        this.helpTickets.selectedHelpTicket.institutionId = this.userObj.institutionId;;
        this.helpTickets.selectedHelpTicket.sessionId = this.selectedSessionId;
        // this.helpTickets.selectedHelpTicket.helpTicketType = this.inputForm;
       
        if(!this.showTypes){
            //If the help ticket type doesn't require a course, insert a dummy courseId
            this.helpTickets.selectedHelpTicket.courseId = 'b1b1b1b1b1b1b1b1b1b1b1b1';
        } else {
            this.helpTickets.selectedHelpTicket.requestId = this.SelectedClientRequest._id;
            this.helpTickets.selectedHelpTicket.systemId = this.SelectedClientRequest.systemId;
            this.helpTickets.selectedHelpTicket.clientId = this.SelectedClientRequest.clientId;
            this.helpTickets.selectedHelpTicket.productId = this.SelectedClientRequest.productId;
            this.helpTickets.selectedHelpTicket.courseId = this.SelectedClientRequest.courseId;
        }

        // this.helpTickets.selectedHelpTicketContent.content = this.processInputForm();

        this.helpTickets.selectedHelpTicketContent.personId = this.userObj._id;
        this.helpTickets.selectedHelpTicketContent.type = this.helpTickets.selectedHelpTicket.helpTicketType;//  this.helpTickets.selectedHelpTicket.helpTicketType;
        this.helpTickets.selectedHelpTicketContent.displayForm = this.inputForm;
        this.helpTickets.selectedHelpTicket.content.push( this.helpTickets.selectedHelpTicketContent);
    }

    // /*****************************************************************************************
    // * Save the help ticket
    // *****************************************************************************************/
    async save(){
        if(this.validation.validate(1)){ //this.helpTickets.selectedHelpTicket.helpTicketType
            await this.buldHelpTicket();
            let serverResponse = await this.helpTickets.saveHelpTicket(this.sendEmail);
            if (!serverResponse.status) {
                this.utils.showNotification("The help ticket was created");
                if (this.files && this.files.length > 0) this.helpTickets.uploadFile(this.files,serverResponse.content[0]._id);
            }
            this._cleanUp();
        }
    }

    _cleanUp(){
        this.showTypes = false;
        this.showHelpTicketDescription = false;
        this.showRequests = false;
        this.showAdditionalInfo = false;
        this.helpTickets.selectHelpTicket();
        this.helpTickets.selectHelpTicketContent();
        this.clearTables();
        this.filesSelected = "";
    }

    // /*****************************************************************************************
    // * Remove styling from selected rows on tables
    // *****************************************************************************************/
    clearTables(){
        if (this.selectedCourseRow) this.selectedCourseRow.children().removeClass('rowSelected');
        if (this.selectedProductRow) this.selectedProductRow.children().removeClass('rowSelected');
    }

    // /*****************************************************************************************
    // * Upload files
    // *****************************************************************************************/
    uploadFiles() {
        this.helpTickets.uploadFile(this.files);
    }

    // /*****************************************************************************************
    // * THe user selected files to upload to update the ineterface with the file names
    // *****************************************************************************************/
    changeFiles() {
        this.filesSelected = "";
        this.selectedFiles = new Array();
        for(var i = 0; i<this.files.length; i++){
             this.selectedFiles.push(this.files[i].name);
             this.filesSelected += this.files[i].name + " ";
        }
    }
}
