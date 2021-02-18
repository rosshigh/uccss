import { inject } from 'aurelia-framework';
import { HelpTickets } from '../../../resources/data/helpTickets';
import { ClientRequests } from '../../../resources/data/clientRequests';
import { Sessions } from '../../../resources/data/sessions';
import { Products } from '../../../resources/data/products';
import { People } from '../../../resources/data/people';
import { Systems } from '../../../resources/data/systems';
import { DocumentsServices } from '../../../resources/data/documents';
import { Store } from '../../../store/store';
import { AppConfig } from '../../../appConfig';
import { Utils } from '../../../resources/utils/utils';
import { DialogService } from 'aurelia-dialog';
import { HelpTicketDialog } from '../../../resources/dialogs/helpTicket-dialog';

@inject(HelpTickets, ClientRequests, Sessions, Products, People, Systems, DocumentsServices, Store, AppConfig, Utils, DialogService)
export class UserViewHelpTickets {

    pageSize = 200;
    chevronIcon = "fa-chevron-up";

    constructor(helpTickets, requests, sessions, products, people, systems, documents, store, config, utils, dialogs) {
        this.helpTickets = helpTickets;
        this.requests = requests;
        this.sessions = sessions;
        this.systems = systems;
        this.products = products;
        this.people = people;
        this.documents = documents;
        this.store = store;
        this.config = config;
        this.utils = utils;
        this.dialogs = dialogs;

        this.userObj = this.store.getUser('user');


        this.filters = [
            { value: '', keys: ['helpTicketNo'] }
        ];

        this.showTable = true;
    }

    async activate() {
        let responses = await Promise.all([
            this.helpTickets.getObjectArray('?filter=personId|eq|' + this.userObj._id + '&order=createdDate'),
            this.products.getSmallObjectsArray(),
            this.people.getCoursesArray('?filter=personId|eq|' + this.userObj._id + '&order=number'),
            this.systems.getObjectsArray(),
            this.people.getPeopleArray('/small')
        ]);
    }

    attached() {
        $('[data-toggle="tooltip"]').tooltip();
        $('.selectpicker').selectpicker();
    }

    async refresh() {
        this.clearFilters();
        $('#loading').show();
        await this.helpTickets.getPersonObjectArray('?filter=personId|eq|' + this.userObj._id + '&order=createdDate');
        $('#loading').hide();
    }

    refreshSelects(){
        $('.selectpicker').selectpicker();
        // this.utils.refreshSelect("#reason", this.config.HELP_TICKET_CLOSE_REASONS, "code", this.selectedReason);
    }

    closeHelpTicket(helpTicket, event) {
        event.stopPropagation();
        this.helpTickets.setHelpTicket(helpTicket);
        $('#requestCloseModal').modal('show');
        setTimeout(()=>{this.refreshSelects()},500);
        // let message = "You have chosen to close this help ticket.";
        // let title = "Close Help Ticket";
        // let options = ['Submit', 'Cancel']
        // this.dialogs.open({ viewModel: HelpTicketDialog, model: { message, title, options }, lock: false }).whenClosed(response => {
        //     if (!response.wasCancelled) {
        //         this.helpTickets.setHelpTicket(helpTicket);
        //         this.responseMessage = "Help Ticket closed by " + this.userObj.fullName + "<p>Reason: " + this.config.HELP_TICKET_CLOSE_REASONS[response.output.selectedReason].reason + "</p>";
        //         if (response.output.selectedReason == this.config.HELP_TICKET_CLOSE_REASON_OTHER) {
        //             if (response.output.otherReason) {
        //                 this.responseMessage += "<p>Other reason:  " + response.output.otherReason + "</p>";
        //             } else {
        //                 this.responseMessage += "<p>No explanation provided for other reason for closing ticket.</p>";
        //             }
        //         }
        //         if (response.output.method) {
        //             this.responseMessage += this.responseMessage = "<p>Method for resolving: " + response.output.method + "</p>";
        //         } else {
        //             this.responseMessage += "<p>No method was provided for resolving the issue.</p>"
        //         }
        //         let content = {
        //             problemDescipription: this.responseMessage,
        //             contentNo: this.helpTickets.selectedObject.content.length,
        //             dateCreated: new Date(),
        //             personId: this.userObj._id
        //         }
        //         this.helpTickets.selectedObject.content.push(content);

        //         this.closeTicket();
        //     }
        // });
    }

    buildHelpTicketCloseReason(){
        this.responseMessage =  this.userObj.fullName + "requested to close this help ticket.<p>Reason: " + this.config.HELP_TICKET_CLOSE_REASONS[this.selectedReason].reason + "</p>";
                if (this.electedReason == this.config.HELP_TICKET_CLOSE_REASON_OTHER) {
                    if (this.otherReason) {
                        this.responseMessage += "<p>Other reason:  " + this.otherReason + "</p>";
                    } else {
                        this.responseMessage += "<p>No explanation provided for other reason for closing ticket.</p>";
                    }
                }
                if (method) {
                    this.responseMessage += this.responseMessage = "<p>Method for resolving: " + this.method + "</p>";
                } else {
                    this.responseMessage += "<p>No method was provided for resolving the issue.</p>"
                }
                let content = {
                    response: this.responseMessage,
                    contentNo: this.helpTickets.selectedObject.content.length,
                    dateCreated: new Date(),
                    personId: this.userObj._id
                }
                this.helpTickets.selectedObject.content.push(content);
    }

    async closeTicket() {
        $('#requestCloseModal').modal('hide');
        this.buildHelpTicketCloseReason();
        this.helpTickets.selectedObject.helpTicketStatus = this.config.REPLIED_HELPTICKET_STATUS;
        let serverResponse = await this.helpTickets.saveHelpTicket();
        if (!serverResponse.error) {
            this.utils.showNotification("The help ticket was updated");
        } else {
            this.utils.showNotification("There was a problem saving the help ticket", 'error');
        }
    }

    reasonSelected(){
        if(this.selectedReason === this.config.HELP_TICKET_CLOSE_REASON_OTHER){
            setTimeout(()=>{$("#otherReason").focus();},500);
        } else {
            $("#method").focus();
        }
        
    }

    clearFilters() {
        this.filters[0].value = "";
    }

    async selectHelpTicket(helpTicket) {
        await this.helpTickets.getHelpTicket(helpTicket._id);
        this.showTable = false;
    }

    back() {
        this.showTable = true;
    }

    respond() {
        if (!this.enterResponse) {
            this.content = {
                contentNo: this.helpTickets.selectedObject.content.length,
                response: "",
                personId: this.userObj._id,
                dateCreated: new Date(),
                files: []
            };
            this.enterResponse = true;
            this.enableButton = true;
        }
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

    cancelResponse() {
        this.response = new Object();
        this.isUnchanged = true;
        this.enterResponse = false;
    }

    _createResponse() {
        this.helpTickets.selectedObject.helpTicketStatus = this.config.REPLIED_HELPTICKET_STATUS;
        // this.helpTickets.selectedHelpTicketContent.emailSent = this.sendEmail;
        this.helpTickets.selectedObject.content.push(this.content);
    }

    async saveResponse() {
        this._createResponse();
        let serverResponse = await this.helpTickets.saveHelpTicket();
        if (!serverResponse.error) {
            this.utils.showNotification("The help ticket was updated");
            if (this.filesToUpload && this.filesToUpload.length > 0) {
                this.helpTickets.uploadFile(this.filesToUpload, serverResponse.content.length - 1, serverResponse._id);
            }
        } else {
            this.utils.showNotification("There was a problem saving the help ticket", 'error');
        }
        this._cleanUp();
    }

    _cleanUp() {
        this.enterResponse = false;
        this.showTable = true;
        this.filesToUpload = [];
    }

    toggleOriginalTicket() {
        $("#originalTicket").toggle();
        this.chevronIcon = this.chevronIcon === "fa-chevron-up" ? "fa-chevron-down" : "fa-chevron-up";
    }
}