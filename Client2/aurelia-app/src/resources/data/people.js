import {inject} from 'aurelia-framework';
// import moment from 'moment';

import {DataServices} from './dataServices';
import {Utils} from '../utils/utils';

@inject(DataServices, Utils)
export class People {
    newObject = false;
    cleanObject = true;
    peopleArray = undefined;

    UCC_STAFF_SERVICE = 'uccStaff';
    PEOPLE_SERVICE = "people";
    PERSON_REGISTER = "people/register"
    CHECK_EMAIL = 'people/checkEmail';
    CHECK_NAME = 'people/checkName';
    SEND_MAIL = 'people/sendMail';
    PASSWORD_RESET = 'passwordReset';
    NOTES_SERVICE = "notes";

    constructor(data, utils) {
        this.data = data;
        this.utils = utils;
    }

    async getPeopleArray(options, refresh) { 
        if (!this.peopleArray || refresh) {
            var url = this.PEOPLE_SERVICE;
            url += options ? options : "";
            try {
                let serverResponse = await this.data.get(url);
                if (!serverResponse.error) {
                    this.peopleArray = serverResponse;
                } else {
                    this.data.processError(serverResponse);
                    return undefined;
                }
            } catch (error) {
                console.log(error);
                return undefined;
            }
        }
        return this.peopleArray;
    }

    async getPeopleBulkEmailArray(options, refresh) { 
        if (!this.peopleBulkEmailArray || refresh) {
            var url = this.PEOPLE_SERVICE + '/bulkEmail';
            url += options ? options : "";
            try {
                let serverResponse = await this.data.get(url);
                if (!serverResponse.error) {
                    this.peopleBulkEmailArray = serverResponse;
                } else {
                    this.data.processError(serverResponse);
                    return undefined;
                }
            } catch (error) {
                console.log(error);
                return undefined;
            }
        }
        return this.peopleBulkEmailArray;
    }


    async getPerson(id) {
        var url = this.PEOPLE_SERVICE + "/" + id;
        try {
            let serverResponse = await this.data.get(url);
            if (!serverResponse.error) {
                this.selectedPerson = serverResponse;
            } else {
                this.selectedPerson = undefined;
                this.data.processError(serverResponse);
            }
        } catch (error) {
            this.selectedPerson = undefined;
            console.log(error);
        }
        return this.selectedPerson;
    }

    async getUCCStaff(uccRoles){
        var url = this.UCC_STAFF_SERVICE + '/' + uccRoles;
        try {
            let serverResponse = await this.data.get(url);
            if (!serverResponse.error) {
                this.uccPeople = serverResponse;
            } else {
                this.data.processError(serverResponse);
                return undefined;
            }
        } catch (error) {
            console.log(error);
            return undefined;
        }
        return this.uccPeople;
    }

    async getInstitutionPeople(options, refresh){
        if (!this.peopleArray || refresh) {
            var url = this.PEOPLE_SERVICE;
            url += options ? options : "";
            try {
                let serverResponse = await this.data.get(url);
                if (!serverResponse.error) {
                    this.instutionPeopleArray = serverResponse;
                } else {
                    this.data.processError(serverResponse);
                    return undefined;
                }
            } catch (error) {
                console.log(error);
                return undefined;
            }
        }
        return this.peopleArray;
    }

	selectPerson(index, array) {
        if (index === undefined) {
            this.selectedPerson = this.emptyPerson();
        } else {
            if(array && array === 'i'){
                this.selectedPerson = this.utils.copyObject(this.instutionPeopleArray[index]);
                this.editIndex = index;
            } else {
                this.selectedPerson = this.utils.copyObject(this.peopleArray[index]);
                this.editIndex = index;
            }
        }
    }

    selectedPersonFromId(id, array){
        if(array && array === 'i'){
            this.instutionPeopleArray.forEach((item, index) => {
                if(item._id === id){
                    this.editIndex = index;
                    this.selectedPerson = this.utils.copyObject(item);
                }
                
            });
            return;
        } else {
             this.peopleArray.forEach((item, index) => {
                if(item._id === id){
                    this.editIndex = index;
                    this.selectedPerson = this.utils.copyObject(item);
                }
            });
            return;
        }
    }

    emptyPerson() {
        var obj  = new Object();
        obj.lastName = "";
        obj.firstName = "";
        obj.middleName = "";
        obj.lastName = "";
        obj.nickName = "";
        obj.status = "";
        obj.phone = "";
        obj.mobile = ""
        obj.email = "";
        obj.gender = "";
        obj.roles = new Array();
        obj.roles.push("USER");
        obj.password = "";
        obj.institution = "";
        obj.active = false;
        obj.coursesArray = new Array();
        var auditObj = {
            property: "Created",
            eventDate: new Date()
        }
        obj.audit = [auditObj];
        return obj;
    }

	 async checkEmail() {
        if (this.selectedPerson.email) {
            let serverResponse = await this.data.get(this.CHECK_EMAIL + '?email=' +  this.selectedPerson.email);
            if (serverResponse.code === 409) {
                return true;
            } else {
                return false;
            }
        } 
    }

    async checkName(){
         if (this.selectedPerson.firstName && this.selectedPerson.lastName && this.selectedPerson.institutionId) {
            let serverResponse = await this.data.get(thisCHECK_NAME + '?filter=[and]firstName|eq|' +  this.selectedPerson.firstName + ':lastName|eq|' + this.selectedPerson.lastName + ':institutionId|eq|'+ this.selectedPerson.institutionId);
            if (serverResponse.code === 409) {
                return true;
            } else {
                return false;
            }
        } 
    }

    async savePerson(register) {
        if (!this.selectedPerson._id) {
            if(register) {
                var url = this.PERSON_REGISTER;
            } else {
                var url = this.PEOPLE_SERVICE;
            }
            let response = await this.data.saveObject(this.selectedPerson, url, "post")
                if (!response.error) {
                    if(this.peopleArray){
                        this.peopleArray.push(response);;
                    }
                } else {
                     this.data.processError(response, "There was an error creating the account.");
                }
                return response;
        } else {
            let response = await this.data.saveObject(this.selectedPerson, this.PEOPLE_SERVICE, "put")
                if (!response.error) {
                    if(this.peopleArray){
                        this.peopleArray[this.editIndex] = this.utils.copyObject(this.selectedPerson, this.peopleArray[this.editIndex]);
                    }
                }  
                return response;
        }
    }

    async deletePerson(){
        if(this.selectedPerson._id){
            let serverResponse = await this.data.deleteObject(this.PEOPLE_SERVICE + '/' + this.selectedPerson._id);
            if (!serverResponse.error) {
                this.peopleArray.splice(this.editIndex, 1);
                this.editIndex = - 1;
            }
            return serverResponse;
        }
        return null;
    }

    sendNewRegisterEmail(email){       
        this.data.saveObject(email, this.PERSON_REGISTER + "/facDev", 'post');
    }

    activateAccountEmail(email){
        this.data.saveObject(email, this.PEOPLE_SERVICE + "/facDev/activate", 'post');
    }

    updatePassword(obj){
        if (this.selectedPerson._id) {
            return this.data.saveObject(obj, this.PEOPLE_SERVICE + '/password/' + this.selectedPerson._id, "put");
        }
    }

    isPersonDirty(originalObj){
        if(this.selectedPerson){
            if(originalObj){
                var obj = originalObj;
            } else if(this.selectedPerson._id){
                var obj = this.selectedPersonFromId(this.selectedPerson._id)
            } else {
                var obj = this.emptyPerson();
            }
            return this.utils.objectsEqual(this.selectedPerson, obj);
        }
    }

    async sendCustomerMessage(message){
        if(message.email){
            var serverResponse = await this.data.saveObject(message, this.SEND_MAIL, "put");
            return serverResponse;
        } else {
            return {error: "no email"};
        }
    }

    sendBuikEmail(email){
        if(email.email){
            var serverResponse = this.data.saveObject(email, this.PEOPLE_SERVICE + '/sendBulkEmail', "post");
            return serverResponse;
        } else {
            return {error: "no email"};
        }
    }

    //Institutions
	async getInstitutionsArray(options, refresh) {
        if (!this.institutionsArray || refresh) {
            var url = this.data.INSTITUTION_SERVICES;
            url += options ? options : "";
            let response = await this.data.get(url)
            if (!response.error) {
                this.institutionsArray = response;
                return this.institutionArray;
            } else {
                this.institutionsArray = undefined;
                this.data.processError(response);
                return this.institutionArray;
            }

        }
    }

	async getInstitution(id){
        var url = this.data.INSTITUTION_SERVICES + '/' + id;
        let response = await this.data.get(url)
        if (!response.status) {
            return response;
        } else {
            return {institutionStatus: '99'};
        }
    }

    selectInstitution(index) {
        if (index === undefined) {
            this.selectedInstitution = this.emptyInstitution();
            this.newInstitution = true;
        } else {
            try {
                this.selectedInstitution = this.utils.copyObject(this.institutionsArray[index]);
                // this.utils.formatDateForDatesPicker(this.selectedInstitution)
                this.newInstitution = false;
                this.editInstitutionIndex = index;
            } catch (error) {
                console.log(error);
                this.selectedInstitution = this.emptyInstitution();
                this.newInstitution = true;
            }

        }
    }

    selectInstitutionByID(id){
        this.institutionsArray.forEach((item, index) => {
          if(item._id === id){
            this.selectedInstitution = this.utils.copyObject(item);
            this.editInstitutionIndex = index;
            return;
          }
        });
        return null;
    }

    emptyInstitution() {
        var newInstitution = new Object();
        newInstitution.joinDate =  new Date();
        // moment(this.utils.convertUTCDateToLocalDate(new Date().toString(0,10))).format("YYYY-MM-DD");

        newInstitution.name = "";
        return newInstitution;
    }

    getInstitutionPeopleFilter(id){
        this.peopleInstArray = new Array();
        if(id == -1){
           return;
        }

        this.peopleInstArray = this.peopleArray.filter((item) => {
            return item.institutionId === id;
        });
    }

    async saveInstitution() {
        if (!this.selectedInstitution._id) {
            let response = await this.data.saveObject(this.selectedInstitution, this.data.INSTITUTION_SERVICES, "post")
                if (!response.error) {
                    if(this.institutionsArray){
                        this.institutionsArray.push(response);
                    }
                } 
                return response;
        } else {
            let response = await this.data.saveObject(this.selectedInstitution, this.data.INSTITUTION_SERVICES, "put")
                if (!response.status) {
                    if(this.institutionsArray){
                        this.institutionsArray[this.editInstitutionIndex] = this.utils.copyObject(this.selectedInstitution, this.institutionsArray[this.editInstitutionIndex]);
                    }
                }  
                return response;
        }
    }

    async deleteInstitution(){
         let serverResponse = await this.data.deleteObject(this.data.INSTITUTION_SERVICES + '/' + this.selectedInstitution._id);
            if (!serverResponse.error) {
                this.institutionsArray.splice(this.editInstitutionIndex, 1);
                this.editInstitutionIndex = - 1;
            }
            return serverResponse;
    }

    isInstitutionDirty(){
        if(this.selectedInstitution){
            if(this.selectedInstitution._id){
                var obj = this.institutionsArray[this.editInstitutionIndex];
            } else {
                var obj = this.emptyInstitution();
            }
            return this.utils.objectsEqual(this.selectedInstitution, obj);
        }
    }

    //courses
     async getCoursesArray(refresh, options, fields) { 
        if (!this.coursesArray || refresh) {
              var url = this.data.COURSES_SERVICE;
              url += options ? options : "";
              try {
                  let serverResponse = await this.data.get(url);
                  if (!serverResponse.error) {
                      this.coursesArray = serverResponse;
                  } else {
                      return undefined;
                  }
              } catch (error) {
                  console.log(error);
                  return undefined;
              }
            return this.coursesArray;
        }
    }

    selectCourse(index) {
        if (index === undefined) {
            this.selectedCourse = this.emptyCourse();
        } else {
            try {
                this.selectedCourse = this.utils.copyObject(this.coursesArray[index]);
                this.editCourseIndex = index;
            } catch (error) {
                console.log(error);
                this.selectedCourse = this.emptyCourse();
            }

        }
    }

    emptyCourse() {
        var newObj = new Object();;
        newObj.name = "";
        newObj.description = "";
        newObj.number = "";
        newObj.active = true;
        return newObj;
    }

    async saveCourse() {
        if(!this.selectedCourse){
            return;
        }

        if(!this.selectedCourse._id){
            let serverResponse = await this.data.saveObject(this.selectedCourse, this.data.COURSES_SERVICE, "post");
            if (!serverResponse.error) {
                this.selectedCourse = this.utils.copyObject(serverResponse);
                if(this.coursesArray) this.coursesArray.push(this.selectedCourse);
                this.editIneditCourseIndex = this.coursesArray.length - 1;
            } else {
                this.data.processError(response, "There was an error creating the product.");
                }
            return serverResponse;
        } else {
            var serverResponse = await this.data.saveObject(this.selectedCourse, this.data.COURSES_SERVICE, "put");
            if (!serverResponse.error) {
                this.selectedCourse = this.utils.copyObject(serverResponse);
                this.coursesArray[this.editCourseIndex] = this.utils.copyObject(this.selectedCourse, this.coursesArray[this.editCourseIndex]);
            } else {
                this.data.processError(response, "There was an error updating the course.");
            }
            return serverResponse;
        }
    }

    isCourseDirty(){
        if(this.editCourseIndex >= 0 && this.selectedCourse){
            return this.utils.objectsEqual(this.selectedCourse, this.coursesArray[this.editCourseIndex]);
        }
    }

    async requestPasswordReset(obj){
        let serverResponse = await this.data.saveObject(obj, this.PASSWORD_RESET, "post");
        return serverResponse;
    }

    async getPasswordReset(validationCode){
        let serverResponse = await this.data.get(this.PASSWORD_RESET + '/' + validationCode);
        if(!serverResponse.code){
            this.selectedPerson = serverResponse;
        }
        return serverResponse;
    }

    async getNotesArray(options, refresh){
        if (!this.notesArray || refresh) {
            var url = this.NOTES_SERVICE;
            url += options ? options : "";
            try {
                let serverResponse = await this.data.get(url);
                if (!serverResponse.error) {
                    this.notesArray = serverResponse;
                } else {
                    this.data.processError(serverResponse);
                    return undefined;
                }
            } catch (error) {
                console.log(error);
                return undefined;
            }
        }
    }

    async getRemindersArray(options, refresh){
        if (!this.remindersArray || refresh) {
            var url = this.NOTES_SERVICE;
            url += options ? options : "";
            try {
                let serverResponse = await this.data.get(url);
                if (!serverResponse.error) {
                    this.remindersArray = serverResponse;
                    this.remindersArray = this.remindersArray.filter(item => {
                        return item.isReminder;
                    });
                    return serverResponse;
                } else {
                    this.data.processError(serverResponse);
                    return undefined;
                }
            } catch (error) {
                console.log(error);
                return undefined;
            }
        }
    }

    selectNote(index) {
        if (index === undefined) {
            this.selectedNote = this.emptyNote();
        } else {
            try {
                this.selectedNote = this.utils.copyObject(this.notesArray[index]);
                this.editNoteIndex = index;
            } catch (error) {
                console.log(error);
                this.selectedNote = this.emptyNote();
            }

        }
    }

    selectNoteById(id){
        if(!id) return;
        for(let i = 0; i < this.notesArray.length; i++){
            if(this.notesArray[i]._id === id){
                this.selectedNote = this.utils.copyObject(this.notesArray[i]);
                this.editNoteIndex = i;
                return;
            }
        }
        this.selectedNote = this.emptyNote();
    }

    emptyNote() {
        var obj  = new Object();
        obj.note = "";
        obj.dateCreated = new Date();
        obj.category = "";
        return obj;
    }

    async saveNote(index){
        if(!this.selectedNote){
            return;
        }

        if(!this.selectedNote._id){
            let serverResponse = await this.data.saveObject(this.selectedNote, this.NOTES_SERVICE, "post");
            if (!serverResponse.error) {
                if(this.notesArray){
                    this.notesArray.push(this.selectedNote);
                    this.editNoteIndex = this.notesArray.length - 1;
                }
            } else {
                this.data.processError(response, "There was an error creating the note.");
                }
            return serverResponse;
        } else {
            var serverResponse = await this.data.saveObject(this.selectedNote, this.NOTES_SERVICE, "put");
            if (!serverResponse.error) {
                this.notesArray[this.editNoteIndex] = this.utils.copyObject(this.selectedNote, this.notesArray[this.editNoteIndex]);
            } else {
                this.data.processError(response, "There was an error updating the course.");
            }
            return serverResponse;
        }
    }

    async saveReminder(item, index){
        console.log(item)
        if(item === undefined){
            return;
        }
      
        var serverResponse = await this.data.saveObject(item, this.NOTES_SERVICE, "put");
        if (!serverResponse.error) {
            this.remindersArray[index] = this.utils.copyObject(this.noteToSave, this.remindersArray[index]);
        } else {
            this.data.processError(response, "There was an error updating the course.");
        }
        return serverResponse;
    }

    async deleteNote(){
        if(!this.selectedNote){
            return;
        }

        let serverResponse = await this.data.deleteObject(this.NOTES_SERVICE + '/' + this.selectedNote._id);
        if (!serverResponse.error) {
            this.notesArray.splice(this.editNoteIndex, 1);
            this.editNoteIndex = - 1;
        }
        return serverResponse;

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