import { inject, TemplatingEngine } from 'aurelia-framework';
import { Router } from "aurelia-router";
import { Utils } from '../../../resources/utils/utils';
import { Sessions } from '../../../resources/data/sessions';
import { Downloads } from '../../../resources/data/downloads';
import { Products } from '../../../resources/data/products';
import { Systems } from '../../../resources/data/systems';
import { HelpTickets } from '../../../resources/data/helpTickets';
import { ClientRequests } from '../../../resources/data/clientRequests';
import { People } from '../../../resources/data/people';
import Validation from '../../../resources/utils/validation';
import { DataTable } from '../../../resources/utils/dataTable';
import { AppConfig } from '../../../config/appConfig';
import { SiteInfo } from '../../../resources/data/siteInfo';


@inject(Router, Sessions, Downloads, HelpTickets, Validation, Utils, DataTable, AppConfig, People, ClientRequests, Products, Systems, SiteInfo, TemplatingEngine)
export class CreateHelpTickets {
    showInfoBox = false;
    courseSelected = false;
    showHelpTicketDescription = false;
    showInputForm = false;
    showRequests = false;
    inputForm = null;
    showTypes = false;
    showCategories = false;
    inputHTML = "";

    spinnerHTML = "";
    filesSelected;
    selectedFiles;
    removedFiles = new Array();

    showAdditionalInfo = false;

    constructor(router, sessions, apps, helpTickets, validation, utils, datatable, config, people, clientRequests, products, systems, site, templatingEngine) {
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
        this.templatingEngine = templatingEngine;

        this.userObj = JSON.parse(sessionStorage.getItem('user'));
    };

    canActivate() {
        if (!this.userObj) {
            this.userObj = this.config.user;
            this.isUCC = this.userObj.userRole >= this.config.UCC_ROLE;
            if (!this.userObj) {
                this.utils.showNotification("Couldn't find your user information.  Try logging in again or call the UCC.");
                this.router.navigate("home");
            }
        }
    }

    attached() {
        $('[data-toggle="tooltip"]').tooltip();
    }

    async activate() {
        let responses = await Promise.all([
            this.helpTickets.getHelpTicketTypes('?order=category'),
            this.sessions.getSessionsArray('?filter=[or]sessionStatus|Active:Requests&order=startDate', true),
            this.people.getInstitutionsArray('?filter=institutionStatus|eq|01&order=name', true),
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

    async changeInstitution(event) {
        await this.people.getPeopleArray('?filter=[and]institutionId|eq|' + this.selectedInstitution + ':personStatus|eq|01&order=lastName', true);
    }

    changePerson() {
        this.showCategories = this.selectedPerson != "";
        this.people.selectedPersonFromId(this.selectedPerson);
        this.helpTickets.selectedHelpTicket.helpTicketCategory = -1;
        this.helpTickets.selectedHelpTicket.helpTicketType = null;
    }

    async categoryChanged() {
        this.catIndex = this.getCategoryIndex();
        this.requestsRequired = this.helpTickets.helpTicketTypesArray[this.catIndex].requestsRequired;
        await this.getActiveRequests();
        this.showTypes = true;
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

    getMessage(messageKey) {
        for (var i = 0; i < this.site.messageArray.length; i++) {
            if (this.site.messageArray[i].key === messageKey) return this.site.messageArray[i].content
        }
        return "";
    }

    createInputForm(html) {
        $('#container').html(html);
        let extendedInput = $('.extend');
        for (let i = 0; i < extendedInput.length; i++) {
            this.helpTickets.selectedHelpTicketContent.content[$(extendedInput[i]).attr('id')] = "";
        }

        let el = document.getElementById('container');

        if (el) {
            if (!el.querySelectorAll('.au-target').length) {
                this.templatingEngine.enhance({ element: el, bindingContext: this });
            }
        }
    }

    // /*****************************************************************************************
    // * User selected a helpticket type
    // * el - event object
    // *****************************************************************************************/
    async typeChanged(el) {
        this.selectedHelpTicketType = this.getTypeIndex();
        this.requestsRequired = this.helpTickets.helpTicketTypesArray[this.catIndex].requestsRequired;
        this.descriptionRequired = this.helpTickets.helpTicketTypesArray[this.catIndex].subtypes[this.selectedHelpTicketType].descriptionRequired;
        this.showForm = true;
        if (this.clientRequestsArray.length > 0) this.showRequests = true;
        this.showAdditionalInfo = true;
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

    setupValidation(rules) {
        this.validation.clearRules();
        rules.forEach(item => {
            this.validation.addRule(1, item.control, [{ "rule": item.rule, "message": item.message, "value": item.value }]);
        });
    }

    getIndex() {
        var returnIndex;
        this.helpTickets.helpTicketTypesArray[this.helpTickets.selectedHelpTicket.helpTicketCategory].subtypes.forEach((item, index) => {
            if (item.type === this.helpTickets.selectedHelpTicket.helpTicketType) {
                returnIndex = index;
            }
        })
        return returnIndex;
    }

    async getActiveRequests() {
        var sessions = "";
        this.sessions.sessionsArray.forEach(item => {
            sessions += item._id + ":";
        });
        sessions = sessions.substring(0, sessions.length - 1);
        await this.clientRequests.getActiveClientRequestsArray(this.selectedPerson, sessions);
        this.originalClientRequestsArray = new Array();
        this.clientRequestsArray = new Array();
        //Cycle through request array
        this.clientRequests.requestsArray.forEach(item => {
            //Cycle through details of request
            item.requestDetails.forEach(item2 => {
                //If there are assignments
                if (item2.assignments && item2.assignments.length > 0) {
                    //Cycle through the assignments
                    item2.assignments.forEach((assign) => {
                        this.originalClientRequestsArray.push({
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
                        productName: item2.productId.name,
                        sessionId: item.sessionId,
                        requestStatus: item2.requestStatus,
                        courseName: item.courseId ? item.courseId.name : 'Trial Client',  //item.courseId.name,
                        _id: item2._id
                    })
                }
            })
        });
        this.originalClientRequestsArray.forEach(item => {
            this.clientRequestsArray.push(item);
        })
    }

    // /*****************************************************************************************
    // * The user selected a request
    // *****************************************************************************************/
    async requestChosen(el, index) {


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
    async buldHelpTicket() {
        this.helpTickets.selectedHelpTicket.owner = [{ "personId": "b1b1b1b1b1b1b1b1b1b1b1b1", "date": new Date() }];
        this.helpTickets.selectedHelpTicket.personId = this.selectedPerson;
        this.helpTickets.selectedHelpTicket.institutionId = this.selectedInstitution;
        this.helpTickets.selectedHelpTicket.sessionId = this.selectedSessionId;
        // this.helpTickets.selectedHelpTicket.helpTicketType = this.inputForm;

        if (!this.showTypes) {
            //If the help ticket type doesn't require a course, insert a dummy courseId
            this.helpTickets.selectedHelpTicket.courseId = 'b1b1b1b1b1b1b1b1b1b1b1b1';
        } else {
            if (this.SelectedClientRequest) {
                this.helpTickets.selectedHelpTicket.requestId = this.SelectedClientRequest._id;
                this.helpTickets.selectedHelpTicket.systemId = this.SelectedClientRequest.systemId;
                this.helpTickets.selectedHelpTicket.clientId = this.SelectedClientRequest.clientId;
                this.helpTickets.selectedHelpTicket.productId = this.SelectedClientRequest.productId;
                this.helpTickets.selectedHelpTicket.courseId = this.SelectedClientRequest.courseId;
            } else {
                this.helpTickets.selectedHelpTicket.courseId = 'b1b1b1b1b1b1b1b1b1b1b1b1';
            }
        }

        this.helpTickets.selectedHelpTicketContent.personId = this.userObj._id;
        this.helpTickets.selectedHelpTicketContent.type = this.helpTickets.selectedHelpTicket.helpTicketType;
        this.helpTickets.selectedHelpTicketContent.displayForm = this.inputForm;
        this.helpTickets.selectedHelpTicket.content.push(this.helpTickets.selectedHelpTicketContent);
    }

    // /*****************************************************************************************
    // * Save the help ticket
    // *****************************************************************************************/
    async save() {
        if (this.validation.validate(1)) {
            await this.buldHelpTicket();
            var email = new Object();
            if (this.sendEmail) {
                email.MESSAGE = this.config.TECH_STAFF_CREATED_HELP_TICKET_MESSAGE;
                email.INSTRUCTIONS = this.config.HELP_TICKET_INSTRUCTIONS;
                email.subject = this.config.TECH_STAFF_CREATED_HELP_TICKET_SUBJECT.replace('[[faculty name]]', this.people.selectedPerson.fullName);
                email.email = this.people.selectedPerson.email;
                email.helpTicketNo = 0;
                email.cc = this.config.HELP_TICKET_EMAIL_LIST ? this.config.HELP_TICKET_EMAIL_LIST + ";" + this.userObj.email : "";
            }
            let serverResponse = await this.helpTickets.saveHelpTicket(email);
            if (!serverResponse.status) {
                this.utils.showNotification("The help ticket was created");
                if (this.filesToUpload && this.filesToUpload.length > 0) {
                    this.helpTickets.uploadFile(this.filesToUpload, serverResponse.content[0]._id, this.helpTickets.selectedHelpTicket);
                }
            }

            this._cleanUp();
        }
    }

    _cleanUp() {
        this.showTypes = false;
        this.selectedInstitution = "";
        this.selectedPerson = "";
        this.showCategories = false;
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
    clearTables() {
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
