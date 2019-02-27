import { inject, TemplatingEngine } from 'aurelia-framework';
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

import fuelux from 'fuelux';

@inject(Sessions, Downloads, HelpTickets, Validation, Utils, DataTable, AppConfig, People, ClientRequests, Products, Systems, SiteInfo, TemplatingEngine)
export class CreateHelpTickets {
    showInfoBox = false;
    courseSelected = false;
    showHelpTicketDescription = false;
    showInputForm = false;
    showRequests = false;
    inputForm = null;
    showTypes = false;
    inputHTML = "";
    filesSelected;
    selectedFiles;
    removedFiles = new Array();
    test = true;

    showAdditionalInfo = false;

    constructor(sessions, apps, helpTickets, validation, utils, datatable, config, people, clientRequests, products, systems, site, templatingEngine) {
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
                this.utils.showNotification("Couldn't find your user information.  Try logging in again or call the UCC.",'warning');
                this.router.navigate("home");
            }
        }
    }

    attached() {
        $('[data-toggle="tooltip"]').tooltip();
        var wizard = $('.wizard').wizard();
        var that = this;

        wizard.on('actionclicked.fu.wizard', (e, data) => {
            that.step = data.step;
            if (data.direction !== "previous") {
                if (!that.validation.validate(data.step)) {
                    e.preventDefault();
                } else if (data.step === 2) {
                    that.createInputForm(this.helpTickets.helpTicketTypesArray[this.catIndex].subtypes[this.selectedHelpTicketType].inputForm);
                    this.setupValidation(this.helpTickets.helpTicketTypesArray[this.catIndex].subtypes[this.selectedHelpTicketType].validation);
                    // $("#comments").focus();
                } else if (data.step === 3) {
                    setTimeout(() => { 
                        $(".note-editable:first").focus().scroll(); 
                    }, 500);
                } else if (data.step === 4) {
                    this.outputForm = this.helpTickets.helpTicketTypesArray[this.catIndex].subtypes[this.selectedHelpTicketType].outputForm;
                    this.createOutputForm(this.outputForm)
                } else if (data.step === 5) {
                    that.save();
                }
            } else {
                that.validation.makeAllValid(data.step);
            }
        })
    }

    async activate() {
        let responses = await Promise.all([
            this.helpTickets.getHelpTicketTypes('?order=category'),
            this.sessions.getSessionsArray('?filter=[or]sessionStatus|Active:Requests&order=startDate', true),
            this.people.getCoursesArray(true, '?filter=personId|eq|' + this.userObj._id + '&order=number'),
            this.apps.getDownloadsArray(true, '?filter=helpTicketRelevant[eq]true&order=name'),
            this.systems.getSystemsArray(),
            this.config.getConfig(),
            this.site.getMessageArray('?filter=category|eq|HELP_TICKETS', true)
        ]);
        this._setUpValidation();
        this.initialize();
        this.sendEmail = this.config.SEND_EMAILS;
        this.appsArray = this.apps.appDownloadsArray.filter(item => {
            return item.helpTicketRelevant;
        })
        this.editorMessage = this.getMessage('EDITOR_DESCRIPTION_MESSAGE');
        this.fileUploadMessage = this.getMessage('FILE_UPLOAD_DESCRIPTION');
        this.stepsMessage = this.getMessage('RECREATE_STEPS');
    }

    initialize(){
        this.helpTickets.selectHelpTicket();
    }

    async categoryChanged() {
        this.catIndex = this.getCategoryIndex();
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

    // /*****************************************************************************************
    // * The user selected a request
    // *****************************************************************************************/
    async requestChosen(el, index) {
        this.showAdditionalInfo = true;
        if (this.SelectedClientRequest && this.SelectedClientRequest._id === this.clientRequestsArray[index]._id) {
            this.SelectedClientRequest = undefined;
            this.selectedSessionId = undefined;
            if (this.selectedProductRow) this.selectedProductRow.children().removeClass('info');
        } else {
            this.SelectedClientRequest = this.clientRequestsArray[index];
            this.selectedSessionId = this.clientRequestsArray[index].sessionId;

            if (this.selectedProductRow) this.selectedProductRow.children().removeClass('info');
            this.selectedProductRow = $(el.target).closest('tr');
            this.selectedProductRow.children().addClass('info')
        }
    }

    typeChanged() {
        this.selectedHelpTicketType = this.getTypeIndex();
        this.requestsRequired = this.helpTickets.helpTicketTypesArray[this.catIndex].requestsRequired;
        this.descriptionRequired = this.helpTickets.helpTicketTypesArray[this.catIndex].subtypes[this.selectedHelpTicketType].descriptionRequired;
        this.showForm = true;
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

    async getActiveRequests() {
        var sessions = "";
        this.sessions.sessionsArray.forEach(item => {
            sessions += item._id + ":";
        });
        sessions = sessions.substring(0, sessions.length - 1);
        await this.clientRequests.getActiveClientRequestsArray(this.userObj._id, sessions);
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

    // /*****************************************************************************************
    // * Save the help ticket
    // *****************************************************************************************/
    async save() {
        await this.buldHelpTicket();
        var email = new Object();
        if (this.sendEmail) {
            email.MESSAGE = this.config.HELP_TICKET_CREATED_MESSAGE;
            email.INSTRUCTIONS = this.config.HELP_TICKET_INSTRUCTIONS;
            email.subject = this.config.HELP_TICKET_CREATED_SUBJECT.replace('[[faculty name]]', this.userObj.fullName);
            email.email = this.userObj.email;
            email.helpTicketNo = 0;
            email.cc = this.config.HELP_TICKET_EMAIL_LIST ? this.config.HELP_TICKET_EMAIL_LIST : "";
        }

        let serverResponse = await this.helpTickets.saveHelpTicket(email);
        if (!serverResponse.status) {
            this.utils.showNotification("Help ticket number " + serverResponse.helpTicketNo + " was created");
            if (this.filesToUpload && this.filesToUpload.length > 0) {
                this.helpTickets.uploadFile(this.filesToUpload, serverResponse.content[0]._id, this.helpTickets.selectedHelpTicket);
            }
        }
        this._cleanUp();
    }

    // /*****************************************************************************************
    // * Prepare the help ticket to submit to the server
    // *****************************************************************************************/
    async buldHelpTicket() {
        this.helpTickets.selectedHelpTicket.owner = [{ "personId": "b1b1b1b1b1b1b1b1b1b1b1b1", "date": new Date() }];
        this.helpTickets.selectedHelpTicket.personId = this.userObj._id;
        this.helpTickets.selectedHelpTicket.institutionId = this.userObj.institutionId._id;
        this.helpTickets.selectedHelpTicket.sessionId = this.selectedSessionId;

        if (!this.SelectedClientRequest || !this.SelectedClientRequest._id) {
            //If the help ticket type doesn't require a course, insert a dummy courseId
            this.helpTickets.selectedHelpTicket.courseId = 'b1b1b1b1b1b1b1b1b1b1b1b1';
        } else {
            this.helpTickets.selectedHelpTicket.requestId = this.SelectedClientRequest._id;
            this.helpTickets.selectedHelpTicket.systemId = this.SelectedClientRequest.systemId;
            this.helpTickets.selectedHelpTicket.client = this.SelectedClientRequest.client;
            this.helpTickets.selectedHelpTicket.productId = this.SelectedClientRequest.productId;
            this.helpTickets.selectedHelpTicket.courseId = this.SelectedClientRequest.courseId;
        }

        this.helpTickets.selectedHelpTicketContent.personId = this.userObj._id;
        this.helpTickets.selectedHelpTicketContent.type = this.helpTickets.selectedHelpTicket.helpTicketType;
        // this.helpTickets.selectedHelpTicketContent.displayForm = this.inputForm;
        this.helpTickets.selectedHelpTicket.content.push(this.helpTickets.selectedHelpTicketContent);
    }

    _cleanUp() {
        this.showTypes = false;
        // this.helpTicketTypeMessage = undefined;
        // this.showAdditionalInfo = false;
        // this.helpTickets.selectHelpTicket();
        this.helpTickets.selectHelpTicketContent();
        this.clearTables();
        this.filesToUpload = new Array();
        this.showDetails = false;
        this.initialize();
        $('.wizard').wizard('selectedItem', {
            step: 1
          })
    }

    // /*****************************************************************************************
    // * Remove styling from selected rows on tables
    // *****************************************************************************************/
    clearTables() {
        if (this.selectedCourseRow) this.selectedCourseRow.children().removeClass('rowSelected');
        if (this.selectedProductRow) this.selectedProductRow.children().removeClass('rowSelected');
    }

    _setUpValidation() {
        this.validation.addRule(1, "helpTicketCategory", [{
            "rule": "custom", "message": "Select a category",
            "valFunction": function (context) {
                return !(context.helpTickets.selectedHelpTicket.helpTicketCategory == -1);
            }
        }]);
        this.validation.addRule(1, "helpTicketType", [{
            "rule": "custom", "message": "Select a type",
            "valFunction": function (context) {
                return !(context.helpTickets.selectedHelpTicket.helpTicketType == -1);
            }
        }]);
        this.validation.addRule(2, "selectProductRequestError", [{
            "rule": "custom", "message": "Select a product request",
            "valFunction": function (context) {
                if (context.requestsRequired) {
                    return context.SelectedClientRequest;
                } else {
                    return true;
                }
            }
        }]);
        this.validation.addRule(4, "descriptionErrorMessage", [{
            "rule": "custom", "message": "Enter a description of the problem",
            "valFunction": function (context) {
                return !context.descriptionRequired || context.helpTickets.selectedHelpTicketContent.content.comments;
            }
        }]);
    }

    setupValidation(rules) {
        this.validation.clearRuleGroup(3);
        rules.forEach(item => {
            this.validation.addRule(3, item.control, [{ "rule": item.rule, "message": item.message, "value": item.value }]);
        });
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

    createOutputForm(html) {
        html = html.split('selectedHelpTicket.content[0]').join('selectedHelpTicketContent');
        // html = html.replace('selectedHelpTicket.content[0]','selectedHelpTicketContent');
        let el = document.getElementById('outputContainer');
        el.innerHTML = html;

        if (el) {
            if (!el.querySelectorAll('.au-target').length) {
                this.templatingEngine.enhance({ element: el, bindingContext: this });
            }
        }
    }

    toggleField(el) {
        this.helpTickets.selectedHelpTicketContent.content[$(el.target).parent().attr('id')] = !this.helpTickets.selectedHelpTicketContent.content[$(el.target).parent().attr('id')];
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