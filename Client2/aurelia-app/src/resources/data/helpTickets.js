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

    async getHelpTicketArray(options, refresh){
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

     selectHelpTicketByID(id){
        this.helpTicketsArray.forEach((item, index) => {
          if(item._id === id){
            this.selectedHelpTicket = this.utils.copyObject(item);
            this.editIndex = index;
            return;
          }
        });
        return null;
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
        newHelpTicketObj.modifiedDate = new Date();
        newHelpTicketObj.audit = new Array();
        newHelpTicketObj.audit.push({
            event: 'Created',
            eventDate: new Date()
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
            this.selectedHelpTicket = this.utils.copyObject(response);
            this.helpTicketsArray[this.helpTicketsArray[this.editIndex].baseIndex] = this.utils.copyObject(this.selectedHelpTicket, this.helpTicketsArray[this.helpTicketsArray[this.editIndex].baseIndex]);
            
            // this.selectedHelpTicket.owner =  response.owner;
            // this.helpTicketsArray[this.helpTicketsArray[this.editIndex].baseIndex].owner = response.owner;
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

     async saveHelpTicket(email){
          if(!this.selectedHelpTicket){
            return;
        }
        var url = email ? this.data.HELP_TICKET_SERVICES + '?email=1' : this.data.HELP_TICKET_SERVICES;

        if(!this.selectedHelpTicket._id){
            var response = await this.data.saveObject(this.selectedHelpTicket, url, "post");
            if (!response.error) {
                this.selectedHelpTicket = this.utils.copyObject(response);
                if(this.helpTicketsArray) this.helpTicketsArray.push(this.selectedHelpTicket);
            } else {
                     this.data.processError(response, "There was an error creating the help ticket.");
                }
            return response;
        } else {
            var response = await this.data.saveObject(this.selectedHelpTicket, url, "put");
            if (!response.error) {
                this.selectedHelpTicket = this.utils.copyObject(response);
                this.helpTicketsArray[this.helpTicketsArray[this.editIndex].baseIndex] = this.utils.copyObject(this.selectedHelpTicket, this.helpTicketsArray[this.helpTicketsArray[this.editIndex].baseIndex]);

            } else {
                 this.data.processError(response, "There was an error updating the help ticket.");
                }
            return response;
        }
    }

    async saveHelpTicketResponse(email){
        if(this.selectedHelpTicket._id) {
            var url = email ? this.data.HELP_TICKET_CONTENT_SERVICES.replace("HELPTICKETID", this.selectedHelpTicket._id) + '?email=1' : this.data.HELP_TICKET_CONTENT_SERVICES.replace("HELPTICKETID", this.selectedHelpTicket._id);
            var response = await this.data.saveObject(this.selectedHelpTicketContent, url, "put");
                if (!response.error) {
                    this.selectedHelpTicket.content.push(response);
                    this.helpTicketsArray[this.editIndex] = this.utils.copyObject(this.selectedHelpTicket, this.helpTicketsArray[this.editIndex]);
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
            this.helpTicketsArray[this.editIndex] = this.utils.copyObject(this.selectedHelpTicket, this.helpTicketsArray[this.editIndex]);
        }
    }

    lockHelpTicket(obj){
        if(obj.helpTicketId) {
            var response = this.data.saveObject(obj, this.data.HELP_TICKET_LOCK_SERVICES, "post");
        }
    }

    async getHelpTicketLock(id){
        var response = await this.data.get(this.data.HELP_TICKET_LOCK_SERVICES + "/" + id);
        if (!response.error) {
                return response;
        } else {
                this.data.processError(response, "There was an error retrieving the help ticket lock.");
        }
    }

    removeHelpTicketLock(id){
        var response = this.data.deleteObject(this.data.HELP_TICKET_LOCK_SERVICES + "/" + id);
    }

    sendMail(){
        this.data.sendMail({message: "send an email"});
    }

    advancedSearch(searchObj){
        console.log(searchObj.type)

         var resultArray = this.utils.copyArray(this.helpTicketsArray);

         if(searchObj.helpTicketNo.length > 0){
             resultArray = resultArray.filter(item => {
                 return item.helpTicketNo == searchObj.helpTicketNo;
             });
         } else {
             //Dates
            if(searchObj.dateRange && searchObj.dateRange.dateFrom !== "" && searchObj.dateRange.dateFrom !== "Invalid date"){
                if(!searchObj.dateRange.dateTo || searchObj.dateRange.dateTo == "Invalid date"){
                    resultArray = resultArray.filter(item => {
                        var dt = moment(item.createdDate).format('YYYY-MM-DD');
                    return moment(item.createdDate).isAfter(searchObj.dateRange.dateFrom);
                    });
                } else {
                    resultArray = resultArray.filter(item => {
                        var dt = moment(item.createdDate).format('YYYY-MM-DD');
                        console.log(item.createdDate)
                        console.log(moment(item.createdDate).isAfter(searchObj.dateRange.dateFrom))
                        console.log(moment(item.createdDate).isBefore(searchObj.dateRange.dateTo))
                    return moment(item.createdDate).isAfter(searchObj.dateRange.dateFrom) && moment(item.createdDate).isBefore(searchObj.dateRange.dateTo);
                    });
                }
            }
            //Status
            if(searchObj.status && searchObj.status.length > 0){
                for(var i = 0; i < searchObj.status.length; i++){
                    searchObj.status[i] = parseInt(searchObj.status[i]);
                }
                resultArray = resultArray.filter(item => {
                    return searchObj.status.indexOf(item.helpTicketStatus) > -1;
                });
            }
            //Keywords
            if(searchObj.keyWords && searchObj.keyWords.length > 0){
                var searchKeyword = searchObj.keyWords.toUpperCase();
                resultArray = resultArray.filter(item => {
                    if(item.keyWords){
                        var htKeyword = item.keyWords.toUpperCase();
                        return htKeyword.indexOf(searchKeyword) > -1;
                    } else {
                        return false;
                    }
                    
                });
            }
            //Content
            if(searchObj.content && searchObj.content.length > 0){
                var searchContent = searchObj.content.toUpperCase();
                resultArray = resultArray.filter(item => {
                    for(var i = 0; i < item.content.length; i++){
                        if(item.content[i].content.comments.toUpperCase().indexOf(searchContent) > -1){
                            return true;
                        }
                    }
                    return false;
                });
            }         
            //Type
            if(searchObj.type && searchObj.type != -1){
                searchObj.type = parseInt(searchObj.type);
                resultArray = resultArray.filter(item => {
                    return searchObj.type == item.helpTicketType;
                });
            }   

            //Products
            if(searchObj.productIds && searchObj.productIds.length > 0){
                 resultArray = resultArray.filter(item => {
                    return searchObj.productIds.indexOf(item.productId) > -1;
                });
            }

            //People
             if(searchObj.peopleIds && searchObj.peopleIds.length > 0){
                 resultArray = resultArray.filter(item => {
                    return searchObj.peopleIds.indexOf(item.personId) > -1;
                });
            }

             //Instituions
             if(searchObj.institutionIds && searchObj.institutionIds.length > 0){
                 resultArray = resultArray.filter(item => {
                    return searchObj.institutionIds.indexOf(item.institutionId) > -1;
                });
            }
         }

         
         return resultArray;
    }

}