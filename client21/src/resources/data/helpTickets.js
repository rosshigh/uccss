import { inject } from 'aurelia-framework';
import { DataServices } from './dataServices';
import { Utils } from '../utils/utils';
import { AppConfig } from '../../appConfig';

@inject(DataServices, Utils, AppConfig)
export class HelpTickets {

    HELP_TICKET_SERVICES = 'helpTickets';
    // HELP_TICKET_TYPES = "helpTicketsTypes";

    constructor(data, utils, config) {
        this.data = data;
        this.utils = utils;
        this.config = config;
    }

    async getObjectArray(options) {
        let url = this.HELP_TICKET_SERVICES;
        url += options ? options : "";
        try {
          let serverResponse = await this.data.get(url);
          if (!serverResponse.error) {
            this.objectArray = serverResponse;
          } else {
            this.data.processError(serverResponse);
          }
        } catch (error) {
          console.log(error);
        }
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
        newObject.notes = "";
        newObject.type = "";
        newObject.courseId = "";
        newObject.personId = "";
        newObject.helpTicketType = "";
        newObject.helpTicketStatus = this.config.NEW_HELPTICKET_STATUS;
        newObject.priority = "0";
        newObject.content = new Array();
        newObject.owner = [{ "personId": "b1b1b1b1b1b1b1b1b1b1b1b1", "date": new Date() }];
        newObject.createdDate = new Date();
        newObject.modifiedDate = new Date();
        newObject.audit = new Array();
        newObject.audit.push({
            event: 'Created',
            eventDate: new Date()
        })

        this.selectedObject = newObject;

        // this.emptyHelpTicketContent();
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

    // async getHelpTicketTypes(options) {
    //     var url = this.HELP_TICKET_TYPES;
    //     url += options ? options : "";
    //     try {
    //         let serverResponse = await this.data.get(url);
    //         if (!serverResponse.error) {
    //             this.helpTicketTypesArray = serverResponse.sort((a, b) => {
    //                 return a.category < b.category ? 0 : -1;
    //             });
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    setHelpTicket(obj){
        this.selectedObject = this.utils.copyObject(obj);
    }

    async saveHelpTicket(email) {
        if (!this.selectedObject) {
            return;
        }
        var url = this.HELP_TICKET_SERVICES;
        if (!this.selectedObject._id) {
            let response = await this.data.saveObject(this.selectedObject, url, "post");
            // if (!response.error) {
                // if (email && email.email) {
                //     let HTNo = response.helpTicketNo ? response.helpTicketNo : " ";
                //     email.subject = email.subject.replace('[[No]]', HTNo);
                //     email.MESSAGE = email.MESSAGE.replace('[[No]]', HTNo);
                //     this.data.saveObject(email, this.HELP_TICKET_EMAIL, "post");
                // }
            // } else {
            //     this.data.processError(response, "There was an error creating the help ticket.");
            // }
            return response;
        } else {
            let response = await this.data.saveObject(this.selectedObject, url, "put");
            // if (!response.error) {
                // if (email && email.email) {
                //     this.selectedHelpTicket = this.utils.copyObject(response);
                //     this.data.saveObject(email, this.HELP_TICKET_EMAIL, "post");
                // }
            // } else {
            //     this.data.processError(response, "There was an error updating the help ticket.");
            // }
            return response;
        }
    }

    async closeHelpTicket(){
        if (!this.selectedObject) {
            return;
        }
        let url = this.HELP_TICKET_SERVICES + '/close';
        let response = await this.data.saveObject(this.selectedObject, url, "put");
        return response;
    }

    async getHelpTicket(id){
      let url = this.HELP_TICKET_SERVICES + '/' + id;
      let response = await this.data.get(url);
      this.selectedObject = response;
    }

    async uploadFile(files, content, id) {
      let response = await this.data.uploadFiles(files, this.HELP_TICKET_SERVICES + "/files/" + content + '/' + id);
      return response;
  }

  updateHelpTicket(helpTicket){
      for(let i = 0; i < this.objectArray.length; i++){
          if(this.objectArray[i]._id === helpTicket._id){
            this.objectArray[i] = this.utils.copyObject(helpTicket);
            return;
          }
      }
  }
}