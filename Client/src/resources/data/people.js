import {inject} from 'aurelia-framework';
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
    INSTITUTION_SERVICES = "institutions";

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

    async getUCCStaff(uccRoles){
        var url = this.UCC_STAFF_SERVICE + '/' + uccRoles;
        try {
            let serverResponse = await this.data.get(url);
            if (!serverResponse.error) {
                this.uccPeople = serverResponse;
            } else {
                this.data.processError(serverResponse);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getInstitutionPeople(options, refresh){
        if (!this.peopleArray || refresh) {
            var url = this.PEOPLE_SERVICE;
            url += options ? options : "";
            try {
                let serverResponse = await this.data.get(url);
                if (!serverResponse.error) {
                    this.instutionPeopleArray = serverResponse;
                }
            } catch (error) {
                console.log(error);
            }
        }
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

   updatePassword(obj){
        if (this.selectedPerson._id) {
            return this.data.saveObject(obj, this.PEOPLE_SERVICE + '/password/' + this.selectedPerson._id, "put");
        }
    }


  activateAccountEmail(email){
    this.data.saveObject(email, this.PEOPLE_SERVICE + "/facDev/activate", 'post');
  }

    //Institutions
    async getInstitutionsArray(options, refresh) {
       if (!this.institutionsArray || refresh) {
           var url = this.data.INSTITUTION_SERVICES;
           url += options ? options : "";
           let response = await this.data.get(url)
           if (!response.error) {
               this.institutionsArray = response;
           } else {
               this.institutionsArray = undefined;
           }

       }
   }

    async getInstitution(id){
        var url = this.INSTITUTION_SERVICES + '/' + id;
        let response = await this.data.get(url)
        if (!response.status) {
            return response;
        } else {
            return {institutionStatus: '99'};
        }
    }

    //notes
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
               }
           } catch (error) {
               console.log(error);
           }
       }
   }

}
