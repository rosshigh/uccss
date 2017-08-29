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

    async getHelpTicketsArrayAnalytics(options, refresh){
        if (!this.requestsArray || refresh) {
          var url = this.HELP_TICKET_SERVICES + "/analytics"; 
          url += options ? options : "";
            try {
                let serverResponse = await this.data.get(url);
                if (!serverResponse.error) {
                    this.helpTicketArrayAnalytics = serverResponse;
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    async getHelpTicket(id){
        if(id){
            try {
                let serverResponse = await this.data.get(this.HELP_TICKET_SERVICES + "/" + id );
                if (!serverResponse.error) {
                    this.selectedHelpTicket = serverResponse;
                }
                return serverResponse;
            } catch (error) {
                console.log(error);
                return undefined;
            }
           
        }
    }

    async getCurrentCount(options){
        var url = this.HELP_TICKET_SERVICES +'/current/count';
        url += options ? "/" + options : "";
        var response = await this.data.get(url);
        if (!response.status) {
            this.newHelpTickets = this.utils.countItems(this.config.NEW_HELPTICKET_STATUS, 'helpTicketStatus', response);
            this.inProcessHelpTickets = this.utils.countItems(this.config.IN_PROCESS_HELPTICKET_STATUS, 'helpTicketStatus', response);
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
        newHelpTicketObj.helpTicketStatus = this.config.NEW_HELPTICKET_STATUS;
        newHelpTicketObj.priority = 0;
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
        newHelpTicketContent.content.comments = "";
        this.selectedHelpTicketContent = newHelpTicketContent;

    }

    async updateOwner(obj){
         if(!this.selectedHelpTicket){
            return;
        }

        var response = await this.data.saveObject(obj, this.HELP_TICKET_SERVICES + "/owner/" + this.selectedHelpTicket._id, "put");
        if (!response.error) {
            this.selectedHelpTicket = response;
            this.helpTicketsArray[this.editIndex] = this.utils.copyObject(this.selectedHelpTicket, this.helpTicketsArray[this.editIndex]);
        } else {
                this.data.processError(response, "There was an error updating the help ticket.");
            }
        return response;
    }

    async updateStatus(email){
         if(!this.selectedHelpTicket){
            return;
        }

         var response = await this.data.saveObject(this.selectedHelpTicket, this.HELP_TICKET_SERVICES + "/status/" + this.selectedHelpTicket._id, "put");
        if (!response.error) {
            this.helpTicketsArray[this.editIndex].helpTicketStatus = response.helpTicketStatus;
        } else {
            this.data.processError(response, "There was an error updating the help ticket.");
            }
        return response;
    }
    
    async updateKeywords(){
        if(!this.selectedHelpTicket){
            return;
        }

         var response = await this.data.saveObject(this.selectedHelpTicket, this.HELP_TICKET_SERVICES + "/keywords/" + this.selectedHelpTicket._id, "put");
        if (!response.error) {
            this.helpTicketsArray[this.editIndex].keyWords = response.keyWords;
        } else {
                this.data.processError(response, "There was an error updating the help ticket.");
            }
        return response;
    }

    async saveHelpTicket(email){
        if(!this.selectedHelpTicket){
            return;
        }
        var url = this.HELP_TICKET_SERVICES;
        if(!this.selectedHelpTicket._id){
            var response = await this.data.saveObject(this.selectedHelpTicket, url, "post");
            if (!response.error) {
                if(email && email.email){
                    email.helpTicketNo = response.helpTicketNo;
                    this.data.saveObject(email, this.HELP_TICKET_EMAIL, "post");
                }
                this.selectedHelpTicket = this.utils.copyObject(response);
                if(this.helpTicketsArray) this.helpTicketsArray.push(this.selectedHelpTicket);
            } else {
                     this.data.processError(response, "There was an error creating the help ticket.");
                }
            return response;
        } else {
            var response = await this.data.saveObject(this.selectedHelpTicket, url, "put");
            if (!response.error) {
                if(email && email.email){
                    this.selectedHelpTicket = this.utils.copyObject(response);
                    this.data.saveObject(email, this.HELP_TICKET_EMAIL, "post");
                }
                this.helpTicketsArray[this.editIndex] = this.utils.copyObject(this.selectedHelpTicket, this.helpTicketsArray[this.editIndex]);
            } else {
                 this.data.processError(response, "There was an error updating the help ticket.");
                }
            return response;
        }
    }

    async saveHelpTicketResponse(email){
        if(this.selectedHelpTicket._id) {
            var url = this.HELP_TICKET_CONTENT_SERVICES.replace("HELPTICKETID", this.selectedHelpTicket._id).replace("STATUS", this.selectedHelpTicket.helpTicketStatus);
            var response = await this.data.saveObject(this.selectedHelpTicketContent, url, "put");
                if (!response.error) {
                    if(!this.selectedHelpTicketContent.confidential && email.email) this.data.saveObject(email, this.HELP_TICKET_EMAIL, "post");
                    this.selectedHelpTicket.content.push(response);
                    this.helpTicketsArray[this.editIndex] = this.utils.copyObject(this.selectedHelpTicket, this.helpTicketsArray[this.editIndex]);
                } else {
                     this.data.processError(response, "There was an error updating the help ticket.");
                }
            return response;
        }
    }

    isHelpTicketDirty(obj, skip){
      if(this.selectedHelpTicket){
            if(this.selectedHelpTicket._id){
                var obj = obj ? this.helpTicketsArray[this.editIndex] : obj;
            } else {
                var obj = this.emptyHelpTicket();
            }
            return this.utils.objectsEqual(this.selectedHelpTicket, obj, skip);
        }
        return new Array();
    }

    async uploadFile(files,content){
        let response = await this.data.uploadFiles(files,  this.HELP_TICKET_SERVICES + "/upload/" + this.selectedHelpTicket._id + '/' + this.selectedHelpTicket.helpTicketNo + '/' + content);
        if(!response.error){
            this.selectedHelpTicket = this.utils.copyObject(response);
            this.helpTicketsArray[this.editIndex] = this.utils.copyObject(this.selectedHelpTicket, this.helpTicketsArray[this.editIndex]);
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

    groupRequestsByType(){
        if(!this.helpTicketArrayAnalytics) {
            return;
        }
        var sortedArray = this.helpTicketArrayAnalytics 
            .sort((a, b) => {
                var result = (a.helpTicketType < b.helpTicketType) ? -1 : (a.helpTicketType > b.helpTicketType) ? 1 : 0;
                return result;
            });

        this.helpTicketTypeArrayAnalytics = new Array();
        var type = "";
        var templateObj = new Object({helpTicketType: "", count: 0});

        sortedArray.forEach(item => {
            if(item.helpTicketType != type){
                type = item.helpTicketType;
                var obj = this.utils.copyObject(templateObj);
                obj.helpTicketType = item.helpTicketType;
                this.helpTicketTypeArrayAnalytics.push(obj);
            }
            this.helpTicketTypeArrayAnalytics[this.helpTicketTypeArrayAnalytics.length-1].count += 1;
        })

    }

    groupRequestsByCurriculum(){
        if(!this.helpTicketArrayAnalytics) {
            return;
        }

        let filteredArray = this.helpTicketArrayAnalytics.filter(item => {
            return item.content[0].content.curriculumTitle != undefined;
        })

        var sortedArray = filteredArray 
            .sort((a, b) => {
                var result = (a.content[0].content.curriculumTitle < b.content[0].content.curriculumTitle) ? -1 : (a.content[0].content.curriculumTitle > b.content[0].content.curriculumTitle) ? 1 : 0;
                return result;
            });

        this.helpTicketCurriculumArrayAnalytics = new Array();
        var type = "";
        var templateObj = new Object({curriculum: "", count: 0});

        sortedArray.forEach(item => {
            if(item.content[0].content.curriculumTitle != type){
                type = item.content[0].content.curriculumTitle;
                var obj = this.utils.copyObject(templateObj);
                obj.curriculumTitle = item.content[0].content.curriculumTitle;
                this.helpTicketCurriculumArrayAnalytics.push(obj);
            }
            if(this.helpTicketCurriculumArrayAnalytics[this.helpTicketCurriculumArrayAnalytics.length-1]) this.helpTicketCurriculumArrayAnalytics[this.helpTicketCurriculumArrayAnalytics.length-1].count += 1;
        })
    }

     groupHelpTicketsByInstitution(){
        if(!this.helpTicketArrayAnalytics) {
            return;
        }

        var sortedArray = this.helpTicketArrayAnalytics 
            .sort((a, b) => {
                var result = (a.institutionId.name < b.institutionId.name) ? -1 : (a.institutionId.name > b.institutionId.name) ? 1 : 0;
                return result;
            });

        this.helpTicketInstitutionArrayAnalytics = new Array();
        var type = "";
        var templateObj = new Object({institution: "", count: 0});

        sortedArray.forEach(item => {
            if(item.institutionId.name != type){
                type = item.institutionId.name;
                var obj = this.utils.copyObject(templateObj);
                obj.institution = item.institutionId.name;
                this.helpTicketInstitutionArrayAnalytics.push(obj);
            }
            if(this.helpTicketInstitutionArrayAnalytics[this.helpTicketInstitutionArrayAnalytics.length-1]) this.helpTicketInstitutionArrayAnalytics[this.helpTicketInstitutionArrayAnalytics.length-1].count += 1;
        })
    }

    groupHelpTicketsByPeople(){
         if(!this.helpTicketArrayAnalytics) {
            return;
        }

        var sortedArray = this.helpTicketArrayAnalytics 
            .sort((a, b) => {
                 if(!a['personId'] || !b['personId']) return -1;
                var result = (a.personId.fullName < b.personId.fullName) ? -1 : (a.personId.fullName > b.personId.fullName) ? 1 : 0;
                return result;
            });

        this.helpTicketPeopleArrayAnalytics = new Array();
        var type = "";
        var templateObj = new Object({name: "", count: 0});

        sortedArray.forEach(item => {
            if(item.personId){
                if(item.personId.fullName != type){
                    type = item.personId.fullName;
                    var obj = this.utils.copyObject(templateObj);
                    obj.name = item.personId.fullName;
                    this.helpTicketPeopleArrayAnalytics.push(obj);
                }
                if(this.helpTicketPeopleArrayAnalytics[this.helpTicketPeopleArrayAnalytics.length-1]) this.helpTicketPeopleArrayAnalytics[this.helpTicketPeopleArrayAnalytics.length-1].count += 1;
            }
          
        })
    }

    groupHelpTicketsByStatus(){
         if(!this.helpTicketArrayAnalytics) {
            return;
        }

        var sortedArray = this.helpTicketArrayAnalytics 
            .sort((a, b) => {
                var result = (a.helpTicketStatus < b.helpTicketStatus) ? -1 : (a.helpTicketStatus > b.helpTicketStatus) ? 1 : 0;
                return result;
            });

        this.helpTicketStatusArrayAnalytics = new Array();
        var type = "";
        var templateObj = new Object({helpTicketStatus: "", count: 0});

        sortedArray.forEach(item => {
            if(item.helpTicketStatus != type){
                type = item.helpTicketStatus;
                var obj = this.utils.copyObject(templateObj);
                obj.helpTicketStatus = item.helpTicketStatus;
                this.helpTicketStatusArrayAnalytics.push(obj);
            }
            if(this.helpTicketStatusArrayAnalytics[this.helpTicketStatusArrayAnalytics.length-1]) this.helpTicketStatusArrayAnalytics[this.helpTicketStatusArrayAnalytics.length-1].count += 1;
        })
    }

    async archiveSearch(searchObj){
        if(searchObj){
            var resultArray = new Array();
            let response = await this.data.saveObject(searchObj, this.HELP_TICKET_SERVICES + "/archive", "post");
            if(!response.error){
                resultArray = response;
                return resultArray;
            }
        }
    }

    advancedSearch(searchObj){

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
                    return searchObj.peopleIds.indexOf(item.personId._id) > -1;
                });
            }

             //Instituions
             if(searchObj.institutionIds && searchObj.institutionIds.length > 0){
                 resultArray = resultArray.filter(item => {
                    return searchObj.institutionIds.indexOf(item.institutionId._id) > -1;
                });
            }
         }

         
         return resultArray;
    }

    lockHelpTicket(obj){
        if(obj.helpTicketId) {
            var response = this.data.saveObject(obj, this.HELP_TICKET_LOCK_SERVICES, "post");
        }
    }

    async getHelpTicketLock(id){
        var response = await this.data.get(this.HELP_TICKET_LOCK_SERVICES + "/" + id);
        if (!response.error) {
                return response;
        } else {
                this.data.processError(response, "There was an error retrieving the help ticket lock.");
        }
    }

    removeHelpTicketLock(id){
        var response = this.data.deleteObject(this.HELP_TICKET_LOCK_SERVICES + "/" + id);
    }
}
