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

import moment from 'moment';
import $ from 'jquery';

@inject(Router, Sessions, Downloads, HelpTickets, Validation, Utils, DataTable, AppConfig, People, ClientRequests, Products, Systems)
export class CreateHelpTickets{
    showInfoBox = false;
    courseSelected = false;
    showHelpTicketDescription = false;
    showInputForm = false;
    showRequests = false;
    inputForm = -1;
    showTypes = false;
    inputHTML = "";
   
    spinnerHTML = "";
    filesSelected;
    selectedFiles;
    removedFiles = new Array();

    showAdditionalInfo=false;

     constructor(router, sessions, apps, helpTickets, validation, utils, datatable, config, people, clientRequests, products, systems) {
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

        this._setupValidation();
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
            this.config.getConfig()
         ]);
        this.helpTickets.selectHelpTicket();
        this.sendEmail = this.config.SEND_EMAILS;
    }

    /*****************************************************************************************
    * Used to reset the interface when the help ticket type is changed
    *****************************************************************************************/
    // _hideTypes(){
    //     for(var i = 0; i < this.config.HELP_TICKET_TYPES.length; i++){
    //         this.config.HELP_TICKET_TYPES[i].show = false;
    //     }
    // }

    // /*****************************************************************************************
    // * User selected a session so retrieve the user's client requests
    // *****************************************************************************************/
    // async sessionChanged(el){
    //     this.clearTables();
    //     await this.clientRequests.getClientRequestsArray( '?filter=[and]sessionId|eq|' + this.helpTickets.selectedHelpTicket.sessionId + ':personId|eq|' + this.userObj._id, true);
    // }

    categoryChanged(){
        if(this.helpTickets.selectedHelpTicket.helpTicketCategory > -1){
            this.showTypes = this.helpTickets.helpTicketTypesArray[this.helpTickets.selectedHelpTicket.helpTicketCategory].showSubtypes;
            // if(this.helpTickets.helpTicketTypesArray && !this.helpTickets.helpTicketTypesArray[this.helpTickets.selectedHelpTicket.helpTicketCategory].showSubtypes) {
            if(!this.showTypes){
                this.helpTicketTypeMessage = this.helpTickets.helpTicketTypesArray[this.helpTickets.selectedHelpTicket.helpTicketCategory].subtypes[0].message;
                this.showRequests = false; 
                this.showHelpTicketDescription = true;
                this.showAdditionalInfo = true;
                this.inputForm = this.helpTickets.helpTicketTypesArray[this.helpTickets.selectedHelpTicket.helpTicketCategory].subtypes[0].inputForm;
            } else {
                this.inputForm = -1;
                this.showAdditionalInfo = false;
                this.showHelpTicketDescription = false;
                this.showRequests = false;
            }
        } else {
            this.inputForm = -1;
            this.showTypes = false;
            this.showAdditionalInfo = false;
            this.showHelpTicketDescription = false;
            this.showRequests = false;
        }
    }

    // /*****************************************************************************************
    // * User selected a helpticket type
    // * el - event object
    // *****************************************************************************************/
    async typeChanged(el){
        //Reset the interface
        this.clearTables();
        //Make sure the user selected a help ticket type
        if(this.helpTickets.selectedHelpTicket.helpTicketType > -1){
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

            this.helpTicketTypeMessage = this.helpTickets.helpTicketTypesArray[this.helpTickets.selectedHelpTicket.helpTicketCategory].subtypes[this.selectedHelpTicketType].message;
            this.showHelpTicketDescription = true;
            this.inputForm = this.helpTickets.helpTicketTypesArray[this.helpTickets.selectedHelpTicket.helpTicketCategory].subtypes[this.selectedHelpTicketType].inputForm;
          
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
            this.inputForm = -1;
            this.showAdditionalInfo = false;
            this.showHelpTicketDescription = false;
            this.showRequests = false;
        }
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

    // async refreshCourses(){
    //     await this.people.getCoursesArray(true, '?filter=personId|eq|' + this.userObj._id + '&order=number');
    // }

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
        this.helpTickets.selectedHelpTicket.helpTicketType = this.inputForm;
       
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

        this.helpTickets.selectedHelpTicket.content.push( this.helpTickets.selectedHelpTicketContent);
    }

    // processInputForm(){
    //     var contentObj = new Object();
    //     this.inputFormProcess.forEach(item => {
    //         switch(item.type){
    //             case "text":
    //                 contentObj[item.id] = $("#" + item.id).val();
    //                 break;
    //             case "checkbox":
    //                  contentObj[item.id] = $("#" + item.id).is(':checked');
    //                 break;
    //         }
    //     });
    //     return contentObj;
    // }

    // /*****************************************************************************************
    // * Save the help ticket
    // *****************************************************************************************/
    async save(){
        if(this.validation.validate(this.helpTickets.selectedHelpTicket.helpTicketType)){
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
        this.inputForm = -1;
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

    // //Course functions
    // async openEditCourseForm(){
    //     if(!this.showCourses) await this.refreshCourses();
    //     this.showCourses = !this.showCourses;
    // }

    // /*****************************************************************************************
    // * User selected a course
    // * index - index of selected item
    // * el - event object
    // *****************************************************************************************/
    // selectCourse(index, el){
    //     //A sandbox course was selected, update the help ticket course id
    //     if(index === this.config.SANDBOX_ID){
    //         this.helpTickets.selectedHelpTicket.courseId = this.config.SANDBOX_ID;
    //     } else {
    //         this.editCourseIndex = index;
    //         //Select the course record
    //         this.people.selectCourse(this.editCourseIndex);
    //         this.helpTickets.selectedHelpTicket.courseId = this.people.selectedCourse._id;

    //         if (this.selectedCourseRow) this.selectedCourseRow.children().removeClass('info');
    //         this.selectedCourseRow = $(el.target).closest('tr');
    //         this.selectedCourseRow.children().addClass('info')
    //     }
        
    //     //Filter the requests array for the selected course
    //     var myArray = this.clientRequests.requestsArray.filter(item => {
    //             return item.courseId == this.helpTickets.selectedHelpTicket.courseId;
    //         })
        
    //     if(myArray.length > 0){
    //         //Build an array of the request details and assignments for display
    //         this.clientRequestsArray = new Array();
    //         myArray[0].requestDetails.forEach((item) => {
    //             //Assignments have already been created
    //             if(item.assignments.length > 0){
    //                 item.assignments.forEach((assign) => {
    //                     this.clientRequestsArray.push({
    //                         productId: item.productId,
    //                         requestStatus: item.requestStatus,
    //                         systemId: assign.systemId,
    //                         client: assign.client,
    //                         clientId: assign.clientId,
    //                         _id: item._id
    //                     })
    //                 })
    //             } else {
    //                 this.clientRequestsArray.push({
    //                     productId: item.productId,
    //                     requestStatus: item.requestStatus
    //                 })
    //             } 
    //         })
    //     }
    // }

    // editACourse(index, el){
    //     if(this.people.selectedCourse){
    //        $("#number").focus();
    //         this.courseSelected = true;
    //     }
    // }

    // newCourse(){
    //     this.editCourseIndex = -1;
    //     this.people.selectCourse();
    //     $("#number").focus();
    //     this.courseSelected = true;
    // }

    // async saveCourse(){
    //     if(this.validation.validate(99, this)){
    //         if(this.userObj._id){
    //             this.people.selectedCourse.personId = this.userObj._id;
    //             let serverResponse = await this.people.saveCourse();
    //             if (!serverResponse.status) {
    //                 this.utils.showNotification("The course was updated");
    //             }
    //         this.courseSelected = false;
    //         }
    //     }
    // }

    // cancelEditCourse(){
    //      this.courseSelected = false;
    //      showAdditionalInfo = false;
    // }

    // /*****************************************************************************************
    // * Create the validation rules
    // *****************************************************************************************/
    _setupValidation(){
         this.validation.addRule(this.config.HELP_TICKET_OTHER_CURRICULUM_TYPE,"curriculumTitle",[{"rule":"required","message":"Curriculum title is required", "value": "helpTickets.selectedHelpTicketContent.content.curriculumTitle"}]);
         this.validation.addRule(this.config.HELP_TICKET_PASSWORD_RESET_TYPE,"resetPasswordUserIDs",[{"rule":"required","message":"The user IDs to reset are required", "value": "helpTickets.selectedHelpTicketContent.content.resetPasswordUserIDs"}]);
         this.validation.addRule(this.config.HELP_TICKET_APP_ERROR_TYPE,"application",[{"rule":"required","message":"Choose an application", "value": "helpTickets.selectedHelpTicketContent.content.applicationId"}]);
         this.validation.addRule(this.config.HELP_TICKET_OTHER_TYPE,"descriptionID",[{"rule":"required","message":"Enter a description", "value": "helpTickets.selectedHelpTicketContent.content.comments"}]);
         this.validation.addRule(99,"number",[{"rule":"required","message":"Course number is required", "value": "people.selectedCourse.number"}]);
         this.validation.addRule(99,"name",[{"rule":"required","message":"Course name is required", "value": "people.selectedCourse.name"}]);
    }
}
