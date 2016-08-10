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

    async getHelpTicketArray(refresh, options, fields, current){
         if (!this.helpTicketsArray || refresh) {
           var url = this.data.HELP_TICKET_SERVICES;
           url += options ? options : "";
          //  var url = current ? this.data.HELP_TICKET_CURRENT : this.data.HELP_TICKET_SERVICES;
          //  var url =  this.utils.buildURL(url, options, fields);
            try {
                let serverResponse = await this.data.get(url);
                if (!serverResponse.status) {
                    this.helpTicketsArrayInternal = serverResponse;
                    this.helpTicketsArray = serverResponse;
                    for (var i = 0, x = this.helpTicketsArrayInternal.length; i < x; i++) {
                        this.helpTicketsArrayInternal[i].baseIndex = i;
                    }
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

    async getCount(options){
         var url = this.data.HELP_TICKET_SERVICES +'/count';
         url += options ? options : "";
        var response = await this.data.get(url);
        if (!response.status) {
            return response.count;
        } else {
            return null;
        }
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

         var response = await this.data.saveObject(obj, this.data.HELP_TICKET_UPDATE_OWNER.replace('HELPTICKETID', this.selectedHelpTicket._id), "put");
        if (!response.status) {
            this.helpTicketsArrayInternal[this.helpTicketsArray[this.editIndex].baseIndex].owner = response.owner;
            this.helpTicketsArray = this.helpTicketsArrayInternal;
        } else {
                this.data.processError(response, "There was an error updating the help ticket.");
            }
        return response;
    }
    
    async updateStatus(){
         if(!this.selectedHelpTicket){
            return;
        }

         var response = await this.data.saveObject(this.selectedHelpTicket, this.data.HELP_TICKET_UPDATE_STATUS.replace('HELPTICKETID', this.selectedHelpTicket._id), "put");
        if (!response.status) {
            this.helpTicketsArrayInternal[this.helpTicketsArray[this.editIndex].baseIndex].helpTicketStatus = response.helpTicketStatus;
            this.helpTicketsArray = this.helpTicketsArrayInternal;
        } else {
                this.data.processError(response, "There was an error updating the help ticket.");
            }
        return response;
    }
    
    async updateKeywords(){
        if(!this.selectedHelpTicket){
            return;
        }

         var response = await this.data.saveObject(this.selectedHelpTicket, this.data.HELP_TICKET_UPDATE_KEYWORDS.replace('HELPTICKETID', this.selectedHelpTicket._id), "put");
        if (!response.status) {
            this.helpTicketsArrayInternal[this.helpTicketsArray[this.editIndex].baseIndex].keyWords = response.keyWords;
            this.helpTicketsArray = this.helpTicketsArrayInternal;
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
            if (!response.status) {
                this.selectedHelpTicket = this.utils.copyObject(response);
                this.helpTicketsArrayInternal.push(this.selectedHelpTicket);
                this.helpTicketsArray = this.helpTicketsArrayInternal;
            } else {
                     this.data.processError(response, "There was an error creating the help ticket.");
                }
            return response;
        } else {
            var response = await this.data.saveObject(this.selectedHelpTicket, this.data.HELP_TICKET_SERVICES, "put");
            if (!response.status) {
                this.selectedHelpTicket = this.utils.copyObject(response);
                this.helpTicketsArrayInternal[this.helpTicketsArray[this.editIndex].baseIndex] = this.utils.copyObject(this.selectedHelpTicket, this.helpTicketsArrayInternal[this.helpTicketsArray[this.editIndex].baseIndex]);
                this.helpTicketsArray = this.helpTicketsArrayInternal;
            } else {
                 this.data.processError(response, "There was an error updating the help ticket.");
                }
            return response;
        }
    }

    async saveHelpTicketResponse(){
        if(this.selectedHelpTicket._id) {
            var response = await this.data.saveObject(this.selectedHelpTicketContent, this.data.HELP_TICKET_CONTENT_SERVICES.replace("HELPTICKETID", this.selectedHelpTicket._id), "put");
                if (!response.status) {
                    this.selectedHelpTicket.content.push(response);
                    this.helpTicketsArrayInternal[this.helpTicketsArray[this.editIndex].baseIndex] = this.utils.copyObject(this.selectedHelpTicket, this.helpTicketsArrayInternal[this.helpTicketsArray[this.editIndex].baseIndex]);
                    this.helpTicketsArray = this.helpTicketsArrayInternal;
                } else {
                     this.data.processError(response, "There was an error updating the help ticket.");
                }
            return response;
        }
    }

    async sendMail(obj){
        let serverResponse = await this.data.saveObject(obj, this.data.HELP_TICKET_EMAIL.replace('HTID',obj.id), "put");
        if (!response.status) {
            return response;
        } else {
            return null;
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

    uploadFile(files,content){
        this.data.upLoadFiles(this.selectedHelpTicket._id, this.selectedHelpTicket.helpTicketNo, files, 'helpTicket', content);
    }

}
