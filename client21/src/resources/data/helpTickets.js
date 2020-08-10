import { inject } from 'aurelia-framework';
import { DataServices } from './dataServices';
import { Utils } from '../utils/utils';
import { AppConfig } from '../../appConfig';

@inject(DataServices, Utils, AppConfig)
export class HelpTickets {

    HELP_TICKET_SERVICES = 'helpTickets';
    HELP_TICKET_TYPES = "helpTicketsTypes";

    constructor(data, utils, config) {
        this.data = data;
        this.utils = utils;
        this.config = config;
    }

    selectObject(index) {
        if (!index && index != 0) {
            this.emptyObject();
        } else {
            try {
                this.selectedObject = this.utils.copyObject(this.ObjectsArray[index]);
                this.originalObject = this.utils.copyObject(this.selectedObject);
            } catch (error) {
                this.selectedObject = this.emptyObject();
            }

        }
    }

    emptyObject() {
        var newObject = new Object();

        newObject.sessionId = "";
        newObject.type = "";
        newObject.courseId = "";
        newObject.personId = "";
        newObject.helpTicketType = "";
        newObject.helpTicketStatus = this.config.NEW_HELPTICKET_STATUS;
        newObject.priority = "0";
        newObject.content = new Array();
        newObject.owner = new Array();
        newObject.createdDate = new Date();
        newObject.modifiedDate = new Date();
        newObject.audit = new Array();
        newObject.audit.push({
            event: 'Created',
            eventDate: new Date()
        })

        this.selectedObject = newObject;

        this.emptyHelpTicketContent();
    }

    emptyHelpTicketContent() {
        var newObjectContent = new Object();
        newObjectContent.type = 0;
        newObjectContent.createdDate = new Date();
        newObjectContent.helpTicketId = "";
        newObjectContent.files = new Array();
        newObjectContent.confidential = false;
        newObjectContent.personId = "";
        newObjectContent.content = {};
        newObjectContent.content.comments = "";
        this.selectedObjectContent = newObjectContent;

    }

    async getHelpTicketTypes(options) {
        var url = this.HELP_TICKET_TYPES;
        url += options ? options : "";
        try {
            let serverResponse = await this.data.get(url);
            if (!serverResponse.error) {
                this.helpTicketTypesArray = serverResponse.sort((a, b) => {
                    return a.category < b.category ? 0 : -1;
                });
            }
        } catch (error) {
            console.log(error);
        }
    }
}