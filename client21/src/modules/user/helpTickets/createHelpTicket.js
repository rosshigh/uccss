import { inject, BindingEngine } from 'aurelia-framework';
import {BindingSignaler} from 'aurelia-templating-resources';
import { HelpTickets } from '../../../resources/data/helpTickets';
import {ClientRequests} from '../../../resources/data/clientRequests';
import {Sessions} from '../../../resources/data/sessions';
import {Systems} from '../../../resources/data/systems';
import { DocumentsServices } from '../../../resources/data/documents';
import { Store } from '../../../store/store';
import { AppConfig } from '../../../appConfig';
import { Utils } from '../../../resources/utils/utils';
import * as smartWizard from '../../../resources/js/jquery.smartWizard.min';

@inject( HelpTickets, ClientRequests, Sessions, Systems, DocumentsServices, Store, AppConfig, Utils)
export class UserCreateHelpTicket {
    
    testArray = [
        {item: 'a', index: 0, subItems: [1, 2]},
        {item: 'b', index: 1, subItems: [3, 4]}
    ];

    constructor( helpTickets, requests, sessions, systems, documents, store, config, utils){
        this.helpTickets = helpTickets;
        this.requests = requests;
        this.sessions = sessions;
        this.systems = systems;
        this.documents = documents;
        this.store = store;
        this.config = config;
        this.utils = utils;

        this.userObj = this.store.getUser('user');
    }

    async activate(){
        let responses = await Promise.all([
            this.helpTickets.getHelpTicketTypes('?order=category'),
            this.sessions.getObjectsArray('?filter=[or]sessionStatus|Active:Requests&order=startDate'),
            this.systems.getObjectsArray(),
            this.documents.getDocumentsCategoriesArray('?filter=category|eq|SOF')
        ]);

        this.appsArray = [];
        this.documents.objectCategoriesArray.forEach(item1 => {
            item1.subCategories.forEach(item2 => {
                item2.subSubCategories.forEach(item3 => {
                    item3.documents.forEach(item4 => {
                        if(item4.helpTicketRelevant){
                            this.appsArray.push(item4.name);
                        }
                    })
                })
            })
        })
        // let responses = await Promise.all([
        //     this.helpTickets.getHelpTicketTypes('?order=category'),
          
        //     this.people.getCoursesArray(true, '?filter=personId|eq|' + this.userObj._id + '&order=number'),
        //     this.apps.getDownloadsArray(true, '?filter=helpTicketRelevant[eq]true&order=name'),
        //     this.systems.getSystemsArray(),
        //     this.config.getConfig(),
        //     this.site.getMessageArray('?filter=category|eq|HELP_TICKETS', true)
        //  ]);
        this.helpTickets.selectObject();
    }

    attached(){
        $('.selectpicker').selectpicker();
        $('.selectpicker').click(e => e.stopPropagation());
        var wizard = $('.wizard').wizard();
        var that = this;

        wizard.on('actionclicked.fu.wizard', (e, data) => {
            that.step = data.step;
            if (data.direction !== "previous") {
                switch(data.step){
                    case 1:
                        that.validateStepOne();
                        if(that.stepOneErrors.length){
                            e.preventDefault();
                        } else {
                            that.showForm = true;
                            if(that.helpTickets.helpTicketTypesArray[that.catIndex].requestsRequired){
                                that.getActiveRequests();
                            } else {
                                $('.wizard').wizard('selectedItem', { step: 2 });
                            }
                        }
                        break;
                    case 2:
                        break;
                    case 3:
                        break;
                    case 4:
                        break;
                    case 5:
                        break;
                }
             


                // if (!that.validation.validate(data.step)) {
                //     e.preventDefault();
                // } else if (data.step === 2) {
                //     that.createInputForm(this.helpTickets.helpTicketTypesArray[this.catIndex].subtypes[this.selectedHelpTicketType].inputForm);
                //     this.setupValidation(this.helpTickets.helpTicketTypesArray[this.catIndex].subtypes[this.selectedHelpTicketType].validation);
                //     // $("#comments").focus();
                // } else if (data.step === 3) {
                //     setTimeout(() => { 
                //         $(".note-editable:first").focus().scroll(); 
                //     }, 500);
                // } else if (data.step === 4) {
                //     this.outputForm = this.helpTickets.helpTicketTypesArray[this.catIndex].subtypes[this.selectedHelpTicketType].outputForm;
                //     this.createOutputForm(this.outputForm)
                // } else if (data.step === 5) {
                //     that.save();
                // }
            } else {
                // that.validation.makeAllValid(data.step);
            }
        })

    }

    validateStepOne(){
        this.stepOneErrors = [];
        if(this.catIndex == -1){
            this.stepOneErrors.push('Choose a help ticket category')
        }
        if(!this.helpTickets.selectedHelpTicket.helpTicketType){
            this.stepOneErrors.push('Choose a help ticket type')
        }
    }

    async categoryChanged() {
        setTimeout(()=>{$("#helpTicketType").selectpicker('refresh');},500);
    }

    getCategoryIndex() {
        var index = 0;
        this.helpTickets.helpTicketTypesArray.forEach((item, categoryIndex) => {
            if (this.helpTickets.selectedHelpTicket.helpTicketCategory == item.category) {
                index = categoryIndex;                
            }
        });
        return index;
    }

    typeChanged() {
        this.formToShow = './help-ticket-input-' + this.helpTickets.selectedHelpTicket.helpTicketType + '.html';
        // this.selectedHelpTicketType = this.getTypeIndex();
        // this.requestsRequired = this.helpTickets.helpTicketTypesArray[this.catIndex].requestsRequired;
        // this.descriptionRequired = this.helpTickets.helpTicketTypesArray[this.catIndex].subtypes[this.selectedHelpTicketType].descriptionRequired;
        // this.showForm = true;
    }

    getTypeIndex() {
        var typeIndex = 0;
        this.helpTickets.helpTicketTypesArray[this.catIndex].subtypes.forEach((item, typIndex) => {
            if (this.helpTickets.selectedHelpTicket.helpTicketType == item.type) {
                typeIndex = typIndex;
            }
        });
        return typeIndex;
    }

    async getActiveRequests(){
        var sessions = "";
        this.sessions.objectsArray.forEach(item => {
            sessions += item._id + ":";
        });
        sessions = sessions.substring(0, sessions.length-1);
        await this.requests.getActiveObjectsArray(this.userObj._id, sessions);
        this.originalClientRequestsArray = new Array();
        this.clientRequestsArray = new Array();
        //Cycle through request array
        this.requests.objectsArray.forEach(item => {
            //Cycle through details of request
            item.requestDetails.forEach(item2 => {
                //If there are assignments
                if(item2.assignments && item2.assignments.length > 0){
                    //Cycle through the assignments
                    item2.assignments.forEach((assign) => {
                        this.originalClientRequestsArray.push({
                            // productId: item2.productId,
                            // sessionId: item.sessionId,
                            // requestStatus: item2.requestStatus,
                            // systemId: assign.systemId,
                            // courseId: item.courseId,
                            // client: assign.client,
                            // clientId: assign.clientId,
                            // _id: item2._id
                            productId: item2.productId,
                            productName: item2.productId.name,
                            sessionId: item.sessionId,
                            requestStatus: item2.requestStatus,
                            systemId: assign.systemId,
                            courseName: item.courseId ? item.courseId.name : 'Trial Client',
                            courseId: item.courseId ? item.courseId._id : null,
                            client: assign.client,
                            clientId: assign.clientId,
                            _id: item2._id
                        })
                    })
                } else {
                    this.originalClientRequestsArray.push({
                        // productId: item2.productId,
                        // sessionId: item.sessionId,
                        // requestStatus: item2.requestStatus,
                        // courseId: item.courseId,
                        // _id: item2._id
                        productName: item2.productId.name,
                        sessionId: item.sessionId,
                        requestStatus: item2.requestStatus,
                        courseName: item.courseId ? item.courseId.name : 'Trial Client',
                        _id: item2._id
                    })
                }
            }) 
        });
        this.originalClientRequestsArray.forEach(item => {
            this.clientRequestsArray.push(item);
        })
    }

    changeFiles() {
        this.filesToUpload = this.filesToUpload ? this.filesToUpload : new Array();
        for (var i = 0; i < this.files.length; i++) {
            let addFile = true;
            this.filesToUpload.forEach(item => {
                if (item.name === this.files[i].name) addFile = false;
            })
            if (addFile) this.filesToUpload.push(this.files[i]);
        }
    }

    removeFile(index) {
        this.filesToUpload.splice(index, 1);
    }
}