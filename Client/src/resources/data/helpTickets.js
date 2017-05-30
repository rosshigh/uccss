import {inject} from 'aurelia-framework';
import {DataServices} from './dataServices';
import {Utils} from '../utils/utils';
import {AppConfig} from '../../config/appConfig';
import moment from 'moment';

@inject(DataServices, Utils, AppConfig)
export class HelpTickets {
    newHelpTicket = false;      //Is the selected product a new product
    editIndex;                  //Index of selected product

    HELP_TICKET_SERVICES = 'helpTickets';
    HELP_TICKET_CONTENT_SERVICES = "helpTickets/content/HELPTICKETID/STATUS";
    HELP_TICKET_LOCK_SERVICES = "helpTicketLocks";
    HELP_TICKET_TYPES = "helpTicketsTypes";
    HELP_TICKET_EMAIL = "helpTickets/sendMail";

    constructor(data, utils, config) {
        this.data = data;
        this.utils = utils;
        this.config = config;
    }

    async getHelpTicketArray(options, refresh){
         if (!this.helpTicketsArray || refresh) {
           var url = this.HELP_TICKET_SERVICES;
           url += options ? options : "";
            try {
                let serverResponse = await this.data.get(url);
                if (!serverResponse.error) {
                    this.helpTicketsArray = serverResponse;
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    async getCurrentCount(options){
    var url = this.HELP_TICKET_SERVICES +'/current/count';
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

   async getHelpTicketTypes(options, refresh){
         if (!this.helpTicketTypesArray || refresh) {
           var url = this.HELP_TICKET_TYPES;
            url += options ? options : "";
            try {
                let serverResponse = await this.data.get(url);
                if (!serverResponse.error) {
                    this.helpTicketTypesArray = serverResponse;
                } 
            } catch (error) {
                console.log(error);
            }
        }
    }

    selectHelpTicketTypeCategory(index){
        if (!index && index != 0) {
            this.selectedHelpTicketType = this.emptyHelpTicketType();
        } else {
            try {
                this.selectedHelpTicketType = this.utils.copyObject(this.helpTicketTypesArray[index]);
                this.editTypeIndex = index;
            } catch (error) {
                this.selectedHelpTicket = this.emptyHelpTicketType();
            }
        }
    }

    emptyHelpTicketType(){
        let obj = new Object();
        return obj;
    }

    async saveHelpTicketType(){
        if(!this.selectedHelpTicketType){
            return;
        }
        var url = this.HELP_TICKET_TYPES;

        if(!this.selectedHelpTicketType._id){
            var response = await this.data.saveObject(this.selectedHelpTicket, url, "post");
            if (!response.error) {
                this.selectedHelpTicketType = this.utils.copyObject(response);
                if(this.helpTicketTypesArray) this.helpTicketTypesArray.push(this.selectedHelpTicketType);
            } else {
                     this.data.processError(response, "There was an error creating the help ticket type.");
                }
            return response;
        } else {
            var response = await this.data.saveObject(this.selectedHelpTicketType, url, "put");
            if (!response.error) {
                this.selectedHelpTicketType = this.utils.copyObject(response);
                this.helpTicketTypesArray[this.editTypeIndex] = this.utils.copyObject(this.selectedHelpTicketType, this.helpTicketTypesArray[this.editTypeIndex]);

            } else {
                 this.data.processError(response, "There was an error updating the help ticket type.");
                }
            return response;
        }
    }
}
