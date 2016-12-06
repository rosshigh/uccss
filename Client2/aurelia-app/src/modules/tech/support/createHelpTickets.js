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
import {CommonDialogs} from '../../../resources/dialogs/common-dialogs';
import moment from 'moment';
import $ from 'jquery';

@inject(Router, Sessions, Downloads, HelpTickets, Validation, Utils, DataTable, AppConfig, CommonDialogs, People, ClientRequests, Products, Systems)
export class CreateHelpTickets{
    showInfoBox = false;
    courseSelected = false;
    spinnerHTML = "";
    filesSelected;
    selectedFiles;
    removedFiles = new Array();

    showAdditionalInfo=false;

     constructor(router, sessions, apps, helpTickets, validation, utils, datatable, config, dialog, people, clientRequests, products, systems) {
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
        this.dialog = dialog;
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
            this.sessions.getSessionsArray(true, '?filter=[or]sessionStatus|Active:Requests&order=startDate:DSC'),
            this.apps.getDownloadsArray(true, '?fields=helpTicketRelevant|eq|true&order=name'),
            this.people.getInstitutionsArray(true, '?filter=institutionStatus|eq|01&order=name'),
            this.systems.getSystemsArray(true),
            this.config.getConfig()
        ]);
        this.selectedInstitutions = this.people.institutionsArray;
        this.helpTickets.selectHelpTicket();
        this._hideTypes();
    }

    _hideTypes(){
        for(var i = 0; i < this.config.HELP_TICKET_TYPES.length; i++){
            this.config.HELP_TICKET_TYPES[i].show = false;
        }
    }

    async sessionChanged(el){
        this.clearTables();
        await this.clientRequests.getPersonSesssionClientRequestsArray(this.editPerson,  this.helpTickets.selectedHelpTicket.sessionId);
    }

    // filterInsList(el){
    //     var searchTerm = this.instSearch
    //     this.selectedInstitutions = this.people.institutionsArray.filter(function (obj) {
    //         return obj.name.toUpperCase().indexOf(searchTerm.toUpperCase()) > -1
    //     });
    // }

    async changeInstitution(){
       this.showPeople = true;
       await this.people.getPeopleArray(true, '?filter=institutionId|eq|' + this.editInstitution + '&order=lastName');
    };

    async typeChanged(el){
        this. _hideTypes();
        this.clearTables();
        if(this.helpTickets.selectedHelpTicket.helpTicketType){
           var index = parseInt(this.helpTickets.selectedHelpTicket.helpTicketType) - 1;
           this.config.HELP_TICKET_TYPES[index].show = true;
           if( this.config.HELP_TICKET_TYPES[index].appsRequired || !this.config.HELP_TICKET_TYPES[index].clientRequired ) {
               await this.apps.getDownloadsArray(true, '?fields=helpTicketRelevant|eq|true&order=name');
               this.showAdditionalInfo = true;
           } else {
                await this.products.getProductsArray(true,'?fields=_id name');
                if( this.config.HELP_TICKET_TYPES[index].clientRequired) await this.refreshCourses();
                this.showAdditionalInfo = false;
           }
        }
        console.log( this.showAdditionalInfo)
    }

    changePerson($event){
        this.showSession = true;
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
        this.showAdditionalInfo = false;
    }

    // /*****************************************************************************************
    // * Prepare the help ticket to submit to the server
    // *****************************************************************************************/
    async buldHelpTicket(){
        this.helpTickets.selectedHelpTicket.owner = [{ "personId": this.userObj._id,  "date": new Date() }];
        this.helpTickets.selectedHelpTicket.personId = this.editPerson;

        if(!this.config.HELP_TICKET_TYPES[this.helpTickets.selectedHelpTicket.helpTicketType - 1].clientRequired){
            this.helpTickets.selectedHelpTicket.courseId = 'b1b1b1b1b1b1b1b1b1b1b1b1';
        } else {
            this.helpTickets.selectedHelpTicketContent.requestId = this.clientRequest._id;
            this.helpTickets.selectedHelpTicketContent.systemId = this.clientRequest.systemId;
            this.helpTickets.selectedHelpTicketContent.clientId = this.clientRequest.clientId;
        }

        this.helpTickets.selectedHelpTicketContent.personId = this.editPerson;
        this.helpTickets.selectedHelpTicketContent.type =   this.helpTickets.selectedHelpTicket.helpTicketType;

        this.helpTickets.selectedHelpTicket.content.push( this.helpTickets.selectedHelpTicketContent);
    }

    async save(){
        if(this.validation.validate(this.helpTickets.selectedHelpTicket.helpTicketType, this)){
            await this.buldHelpTicket();
            let serverResponse = await this.helpTickets.saveHelpTicket();
            if (!serverResponse.error) {
                this.utils.showNotification("The help ticket was created");
                if (this.files && this.files.length > 0) this.helpTickets.uploadFile(this.files,serverResponse.content[0]._id);
            }
            this._cleanUp();
        }
    }

    _cleanUp(){
         this.showAdditionalInfo = false;
         this.showPeople = false;
         this.showSession = false;
         $("#institution").val("").change();
         this.helpTickets.selectHelpTicket();
         this.clearTables();
         this.filesSelected = "";
    }

    clearTables(){
        if (this.selectedCourseRow) this.selectedCourseRow.children().removeClass('rowSelected');
        if (this.selectedProductRow) this.selectedProductRow.children().removeClass('rowSelected');
    }

    //File functions
    uploadFiles() {
        this.helpTickets.uploadFile(this.files);
    }

    changeFiles() {
        this.filesSelected = "";
        this.selectedFiles = new Array();
        for(var i = 0; i<this.files.length; i++){
             this.selectedFiles.push(this.files[i].name);
             this.filesSelected += this.files[i].name + " ";
        }

    }

    //Course functions
    async openEditCourseForm(){
        if(!this.showCourses) await this.refreshCourses();
        this.showCourses = !this.showCourses;
    }

    async refreshCourses(){
        await this.people.getCoursesArray(true, '?filter=personId|eq|' + this.editPerson + '&order=number');
    }

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

        // if(index === 99){
        //     this.helpTickets.selectedHelpTicket.courseId = this.config.SANDBOX_ID;
        //     var courseId = this.config.SANDBOX_ID;
        //     this.clientRequestsArray = this.clientRequests.requestsArray.filter(item => {
        //         return item.courseId == courseId;
        //     })
        //     console.log(this.clientRequestsArray)
        // } else {
        //     this.editCourseIndex = index;
        //     this.people.selectCourse(this.editCourseIndex);
        //     this.helpTickets.selectedHelpTicket.courseId = this.people.selectedCourse._id;
        //     var courseId = this.people.selectedCourse._id;
            
        //      //Filter the requests array for the selected course
        //     var myArray = this.clientRequests.requestsArray.filter(item => {
        //         return item.courseId == this.helpTickets.selectedHelpTicket.courseId;
        //     })
        
        //     //Build an array of the request details and assignments for display
        //     this.clientRequestsArray = new Array();
        //     myArray[0].requestDetails.forEach((item) => {
        //         //Assignments have already been created
        //         if(item.assignments.length > 0){
        //             item.assignments.forEach((assign) => {
        //                 this.clientRequestsArray.push({
        //                     productId: item.productId,
        //                     requestStatus: item.requestStatus,
        //                     systemId: assign.systemId,
        //                     client: assign.client,
        //                     clientId: assign.clientId,
        //                     _id: item._id
        //                 })
        //             })
        //         } else {
        //             this.clientRequestsArray.push({
        //                 productId: item.productId,
        //                 requestStatus: item.requestStatus
        //             })
        //         } 
        //     })

        //     if (this.selectedCourseRow) this.selectedCourseRow.children().removeClass('info');
        //     this.selectedCourseRow = $(el.target).closest('tr');
        //     this.selectedCourseRow.children().addClass('info')
        // }

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
    }

     _setupValidation(){
         this.validation.addRule(this.config.HELP_TICKET_TYPES[0].code,"curriculumTitle",[{"rule":"required","message":"Curriculum title is required", "value": "helpTickets.selectedHelpTicketContent.content.curriculumTitle"}]);
         this.validation.addRule(this.config.HELP_TICKET_TYPES[1].code,"resetPasswordUserIDs",[{"rule":"required","message":"The user IDs to reset are required", "value": "helpTickets.selectedHelpTicketContent.content.resetPasswordUserIDs"}]);
         this.validation.addRule(this.config.HELP_TICKET_TYPES[2].code,"application",[{"rule":"required","message":"Choose an application", "value": "helpTickets.selectedHelpTicketContent.content.applicationId"}]);
         this.validation.addRule(this.config.HELP_TICKET_TYPES[3].code,"descriptionID",[{"rule":"required","message":"Enter a description", "value": "helpTickets.selectedHelpTicketContent.content.comments"}]);
         this.validation.addRule(99,"number",[{"rule":"required","message":"Course number is required", "value": "people.selectedCourse.number"}]);
         this.validation.addRule(99,"name",[{"rule":"required","message":"Course name is required", "value": "people.selectedCourse.name"}]);
    }
}
