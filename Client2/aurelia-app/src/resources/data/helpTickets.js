import {inject} from 'aurelia-framework';
import {DataServices} from './dataServices';
import {Utils} from '../utils/utils';
import {AppConfig} from '../../config/appConfig';
import moment from 'moment';

@inject(DataServices, Utils, AppConfig)
export class HelpTickets {
    newHelpTicket = false;      //Is the selected product a new product
    editIndex;                  //Index of selected product

    constructor(data, utils, config) {
        this.data = data;
        this.utils = utils;
        this.config = config;
    }

    async getHelpTicketArray(refresh, options){
         if (!this.helpTicketsArray || refresh) {
           var url = this.data.HELP_TICKET_SERVICES;
           url += options ? options : "";
            try {
                let serverResponse = await this.data.get(url);
                if (!serverResponse.error) {
                    this.helpTicketsArray = serverResponse;
                } else {
                    return undefined;
                }
            } catch (error) {
                console.log(error);
                return undefined;
            }
        }
        return this.helpTicketsArray;
    }
    
    async getCurrentCount(options){
        var url = this.data.HELP_TICKET_SERVICES +'/current/count';
        url += options ? "/" + options : "";
        var response = await this.data.get(url);
        if (!response.status) {
            this.newHelpTickets = this.utils.countItems(this.config.NEW_HELPTICKET_STATUS, 'helpTicketStatus', response);
            this.underReviewHelpTickets = this.utils.countItems(this.config.UNDER_REVIEW_HELPTICKET_STATUS, 'helpTicketStatus', response);
            this.customerActionHelpTickets = this.utils.countItems(this.config.CUSTOMER_ACTION_HELPTICKET_STATUS, 'helpTicketStatus', response);
            return response.count; 
        } else {
            return null;
        }
    }

    selectHelpTicket(index) {
        if (!index && index != 0) {
            this.emptyHelpTicket();
        } else {
            try {
                this.selectedHelpTicket = this.utils.copyObject(this.helpTicketsArray[index]);
                this.newHelpTicket = false;
                this.editIndex = index;
            } catch (error) {
                this.selectedHelpTicket = this.emptyHelpTicket();
            }

        }
    }

    emptyHelpTicket() {
        var newHelpTicketObj = new Object();

        newHelpTicketObj.sessionId = "";
        newHelpTicketObj.type = "";
        newHelpTicketObj.courseId = "";
        newHelpTicketObj.personId = "";
        newHelpTicketObj.helpTicketType = "";
        newHelpTicketObj.helpTicketStatus = 1;
        newHelpTicketObj.content = new Array();
        newHelpTicketObj.owner = new Array();
        newHelpTicketObj.createdDate = new Date();
        newHelpTicketObj.modifiedDate =new Date();
        newHelpTicketObj.audit = new Array();
        newHelpTicketObj.audit.push({
            event: 'Created',
            eventDate: this.utils.convertUTCDateToLocalDate(new Date())
        })

       this.selectedHelpTicket =  newHelpTicketObj;

       this.emptyHelpTicketContent();
    }

    selectHelpTicketContent(index){
        if (!index && index != 0) {
            this.emptyHelpTicketContent();
        } else {
            try {
            } catch (error) {
                console.log(error);
                this.emptyHelpTicketContent();
            }

        }
    }

    emptyHelpTicketContent(){
        var newHelpTicketContent = new Object();
        newHelpTicketContent.type = 0;
        newHelpTicketContent.createdDate = new Date();
        newHelpTicketContent.helpTicketId = "";
        newHelpTicketContent.files = new Array();
        newHelpTicketContent.confidential = false;
        newHelpTicketContent.personId = "";
        newHelpTicketContent.content = {};
        this.selectedHelpTicketContent = newHelpTicketContent;

    }

     async updateOwner(obj){
         if(!this.selectedHelpTicket){
            return;
        }

        var response = await this.data.saveObject(obj, this.data.HELP_TICKET_SERVICES + "/owner/" + this.selectedHelpTicket._id, "put");
        if (!response.error) {
            this.selectedHelpTicket.owner =  response.owner;
            this.helpTicketsArray[this.helpTicketsArray[this.editIndex].baseIndex].owner = response.owner;
        } else {
                this.data.processError(response, "There was an error updating the help ticket.");
            }
        return response;
    }
    
    async updateStatus(){
         if(!this.selectedHelpTicket){
            return;
        }

         var response = await this.data.saveObject(this.selectedHelpTicket, this.data.HELP_TICKET_SERVICES + "/status/" + this.selectedHelpTicket._id, "put");
        if (!response.error) {
            this.helpTicketsArray[this.helpTicketsArray[this.editIndex].baseIndex].helpTicketStatus = response.helpTicketStatus;
        } else {
                this.data.processError(response, "There was an error updating the help ticket.");
            }
        return response;
    }
    
    async updateKeywords(){
        if(!this.selectedHelpTicket){
            return;
        }

         var response = await this.data.saveObject(this.selectedHelpTicket, this.data.HELP_TICKET_SERVICES + "/keywords/" + this.selectedHelpTicket._id, "put");
        if (!response.error) {
            this.helpTicketsArray[this.helpTicketsArray[this.editIndex].baseIndex].keyWords = response.keyWords;
        } else {
                this.data.processError(response, "There was an error updating the help ticket.");
            }
        return response;
    }

     async saveHelpTicket(){
          if(!this.selectedHelpTicket){
            return;
        }

        if(!this.selectedHelpTicket._id){
            var response = await this.data.saveObject(this.selectedHelpTicket, this.data.HELP_TICKET_SERVICES, "post");
            if (!response.error) {
                this.selectedHelpTicket = this.utils.copyObject(response);
                if(this.helpTicketsArray) this.helpTicketsArray.push(this.selectedHelpTicket);
            } else {
                     this.data.processError(response, "There was an error creating the help ticket.");
                }
            return response;
        } else {
            var response = await this.data.saveObject(this.selectedHelpTicket, this.data.HELP_TICKET_SERVICES, "put");
            if (!response.error) {
                this.selectedHelpTicket = this.utils.copyObject(response);
                this.helpTicketsArray[this.helpTicketsArray[this.editIndex].baseIndex] = this.utils.copyObject(this.selectedHelpTicket, this.helpTicketsArray[this.helpTicketsArray[this.editIndex].baseIndex]);

            } else {
                 this.data.processError(response, "There was an error updating the help ticket.");
                }
            return response;
        }
    }

    async saveHelpTicketResponse(){
        if(this.selectedHelpTicket._id) {
            var response = await this.data.saveObject(this.selectedHelpTicketContent, this.data.HELP_TICKET_CONTENT_SERVICES.replace("HELPTICKETID", this.selectedHelpTicket._id), "put");
                if (!response.error) {
                    this.selectedHelpTicket.content.push(response);
                    this.helpTicketsArray[this.helpTicketsArray[this.editIndex].baseIndex] = this.utils.copyObject(this.selectedHelpTicket, this.helpTicketsArray[this.helpTicketsArray[this.editIndex].baseIndex]);
                } else {
                     this.data.processError(response, "There was an error updating the help ticket.");
                }
            return response;
        }
    }

    isHelpTicketDirty(){
      if(this.selectedHelpTicket){
            if(this.selectedHelpTicket._id){
                var obj = this.helpTicketsArray[this.editIndex];
            } else {
                var obj = this.emptyHelpTicket();
            }
            return this.utils.objectsEqual(this.selectedHelpTicket, obj);
        }
        return new Array();
    }

    async uploadFile(files,content){
        let response = await this.data.uploadFiles(files,  this.data.HELP_TICKET_SERVICES + "/upload/" + this.selectedHelpTicket._id + '/' + this.selectedHelpTicket.helpTicketNo + '/' + content);
        if(!response.error){
            this.selectedHelpTicket = this.utils.copyObject(response);
            this.helpTicketsArray[this.helpTicketsArray[this.editIndex].baseIndex] = this.utils.copyObject(this.selectedHelpTicket, this.helpTicketsArray[this.helpTicketsArray[this.editIndex].baseIndex]);
        }
    }

}