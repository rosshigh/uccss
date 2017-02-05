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
            this.sessions.getSessionsArray('?filter=[or]sessionStatus|Active:Requests&order=startDate', true),
            this.apps.getDownloadsArray(true, '?filter=helpTicketRelevant[eq]true&order=name'),
            this.systems.getSystemsArray(),
            this.config.getConfig()
         ]);
        this.helpTickets.selectHelpTicket();
        this.sendEmail = this.config.SEND_EMAILS;
        this._hideTypes();
    }

    /*****************************************************************************************
    * Used to reset the interface when the help ticket type is changed
    *****************************************************************************************/
    _hideTypes(){
        for(var i = 0; i < this.config.HELP_TICKET_TYPES.length; i++){
            this.config.HELP_TICKET_TYPES[i].show = false;
        }
    }

    // /*****************************************************************************************
    // * User selected a session so retrieve the user's client requests
    // *****************************************************************************************/
    async sessionChanged(el){
        this.clearTables();
        await this.clientRequests.getClientRequestsArray( '?filter=[and]sessionId|eq|' + this.helpTickets.selectedHelpTicket.sessionId + ':personId|eq|' + this.userObj._id, true);
    }

    // /*****************************************************************************************
    // * User selected a helpticket type
    // * el - event object
    // *****************************************************************************************/
    async typeChanged(el){
        //Reset the interface
        this. _hideTypes();
        this.clearTables();
        //Make sure the user selected a help ticket type
        if(this.helpTickets.selectedHelpTicket.helpTicketType){
           var index = parseInt(this.helpTickets.selectedHelpTicket.helpTicketType) - 1;
           //Update the interface with the correct form
           this.config.HELP_TICKET_TYPES[index].show = true;
           //If the help ticket involves application help  
           if( this.config.HELP_TICKET_TYPES[index].appsRequired || !this.config.HELP_TICKET_TYPES[index].clientRequired ) {
               //get the supported apps and show the apps form
               await this.apps.getDownloadsArray(true, '?filter=helpTicketRelevant[eq]true');
               this.showAdditionalInfo = true;
           } else {
               //get support SAP products and, if a client is required for help, refresh the courses table
                await this.products.getProductsArray('?fields=_id name');
                if( this.config.HELP_TICKET_TYPES[index].clientRequired) await this.refreshCourses();
                this.showAdditionalInfo = false;
           }
        }
    }

    // /*****************************************************************************************
    // * The user selected a request
    // *****************************************************************************************/
    async requestChosen(el, product){
       this.showAdditionalInfo = true;

        this.clientRequest = product;

       if (this.selectedProductRow) this.selectedProductRow.children().removeClass('info');
       this.selectedProductRow = $(el.target).closest('tr');
       this.selectedProductRow.children().addClass('info')
    }

    cancel() {
        this.helpTickets.selectHelpTicket();
        this.courseSelected = false;
        this.showAdditionalInfo = false;
    }

    // /*****************************************************************************************
    // * Prepare the help ticket to submit to the server
    // *****************************************************************************************/
    async buldHelpTicket(){
        this.helpTickets.selectedHelpTicket.owner = [{ "personId": "b1b1b1b1b1b1b1b1b1b1b1b1", "date": new Date() }];
        this.helpTickets.selectedHelpTicket.personId = this.userObj._id;
        this.helpTickets.selectedHelpTicket.institutionId = this.userObj.institutionId;
        // this.helpTickets.selectedHelpTicketContent.content.comments =  this.commentsResponse;

        if(!this.config.HELP_TICKET_TYPES[this.helpTickets.selectedHelpTicket.helpTicketType - 1].clientRequired){
            //If the help ticket type doesn't require a course, insert a dummy courseId
            this.helpTickets.selectedHelpTicket.courseId = 'b1b1b1b1b1b1b1b1b1b1b1b1';
        } else {
            this.helpTickets.selectedHelpTicketContent.requestId = this.clientRequest._id;
            this.helpTickets.selectedHelpTicketContent.systemId = this.clientRequest.systemId;
            this.helpTickets.selectedHelpTicketContent.clientId = this.clientRequest.clientId;
            this.helpTickets.selectedHelpTicket.productId = this.clientRequest.productId;
        }

        this.helpTickets.selectedHelpTicketContent.personId = this.userObj._id;
        this.helpTickets.selectedHelpTicketContent.type =   this.helpTickets.selectedHelpTicket.helpTicketType;

        this.helpTickets.selectedHelpTicket.content.push( this.helpTickets.selectedHelpTicketContent);
    }

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
         this.showAdditionalInfo = false;
         this.helpTickets.selectHelpTicket();
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
    async openEditCourseForm(){
        if(!this.showCourses) await this.refreshCourses();
        this.showCourses = !this.showCourses;
    }

    async refreshCourses(){
        await this.people.getCoursesArray(true, '?filter=personId|eq|' + this.userObj._id + '&order=number');
    }

    // /*****************************************************************************************
    // * User selected a course
    // * index - index of selected item
    // * el - event object
    // *****************************************************************************************/
    selectCourse(index, el){
        //A sandbox course was selected, update the help ticket course id
        if(index === this.config.SANDBOX_ID){
            this.helpTickets.selectedHelpTicket.courseId = this.config.SANDBOX_ID;
        } else {
            this.editCourseIndex = index;
            //Select the course record
            this.people.selectCourse(this.editCourseIndex);
            this.helpTickets.selectedHelpTicket.courseId = this.people.selectedCourse._id;

            if (this.selectedCourseRow) this.selectedCourseRow.children().removeClass('info');
            this.selectedCourseRow = $(el.target).closest('tr');
            this.selectedCourseRow.children().addClass('info')
        }
        
        //Filter the requests array for the selected course
        var myArray = this.clientRequests.requestsArray.filter(item => {
                return item.courseId == this.helpTickets.selectedHelpTicket.courseId;
            })
        
        if(myArray.length > 0){
            //Build an array of the request details and assignments for display
            this.clientRequestsArray = new Array();
            myArray[0].requestDetails.forEach((item) => {
                //Assignments have already been created
                if(item.assignments.length > 0){
                    item.assignments.forEach((assign) => {
                        this.clientRequestsArray.push({
                            productId: item.productId,
                            requestStatus: item.requestStatus,
                            systemId: assign.systemId,
                            client: assign.client,
                            clientId: assign.clientId,
                            _id: item._id
                        })
                    })
                } else {
                    this.clientRequestsArray.push({
                        productId: item.productId,
                        requestStatus: item.requestStatus
                    })
                } 
            })
        }
    }

    editACourse(index, el){
        if(this.people.selectedCourse){
           $("#number").focus();
            this.courseSelected = true;
        }
    }

    newCourse(){
        this.editCourseIndex = -1;
        this.people.selectCourse();
        $("#number").focus();
        this.courseSelected = true;
    }

    async saveCourse(){
        if(this.validation.validate(99, this)){
            if(this.userObj._id){
                this.people.selectedCourse.personId = this.userObj._id;
                let serverResponse = await this.people.saveCourse();
                if (!serverResponse.status) {
                    this.utils.showNotification("The course was updated");
                }
            this.courseSelected = false;
            }
        }
    }

    cancelEditCourse(){
         this.courseSelected = false;
         showAdditionalInfo = false;
    }

    // /*****************************************************************************************
    // * Create the validation rules
    // *****************************************************************************************/
     _setupValidation(){
         this.validation.addRule(this.config.HELP_TICKET_TYPES[0].code,"curriculumTitle",[{"rule":"required","message":"Curriculum title is required", "value": "helpTickets.selectedHelpTicketContent.content.curriculumTitle"}]);
         this.validation.addRule(this.config.HELP_TICKET_TYPES[1].code,"resetPasswordUserIDs",[{"rule":"required","message":"The user IDs to reset are required", "value": "helpTickets.selectedHelpTicketContent.content.resetPasswordUserIDs"}]);
         this.validation.addRule(this.config.HELP_TICKET_TYPES[2].code,"application",[{"rule":"required","message":"Choose an application", "value": "helpTickets.selectedHelpTicketContent.content.applicationId"}]);
         this.validation.addRule(this.config.HELP_TICKET_TYPES[3].code,"descriptionID",[{"rule":"required","message":"Enter a description", "value": "helpTickets.selectedHelpTicketContent.content.comments"}]);
         this.validation.addRule(99,"number",[{"rule":"required","message":"Course number is required", "value": "people.selectedCourse.number"}]);
         this.validation.addRule(99,"name",[{"rule":"required","message":"Course name is required", "value": "people.selectedCourse.name"}]);

    }
}
