import {inject} from 'aurelia-framework';
import moment from 'moment';

import {DataServices} from './dataServices';
import {Utils} from '../utils/utils';

@inject(DataServices, Utils)
export class People {
    newObject = false;
    cleanObject = true;
    peopleArray = undefined;

    constructor(data, utils) {
        this.data = data;
        this.utils = utils;
    }

    async getPeopleArray(refresh, options) { 
        if (!this.peopleArray || refresh) {
            var url = this.data.PEOPLE_SERVICE;
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

    async getPerson(id) {
        var url = this.data.PEOPLE_SERVICE + "/" + id;
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

	selectPerson(index) {
        if (index === undefined) {
            this.selectedPerson = this.emptyPerson();
        } else {
            try {
                this.selectedPerson = this.utils.copyObject(this.peopleArray[index]);
                this.editIndex = index;
            } catch (error) {
                console.log(error);
                this.selectedPerson = this.emptyPerson();
            }

        }
    }

    selectedPersonFromId(id){
        this.peopleArray.forEach((item) => {
          if(item._id === id){
            this.selectedPerson = this.utils.copyObject(item);
            return;
          }
        });
        return null;
    }

	 emptyPerson() {
        var obj  = new Object();
        obj.lastName = "";
        obj.firstName = "";
        obj.middleName = "";
        obj.lastName = "";
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
        this.coursesArray = new Array();
        return obj;
    }

	 async checkEmail() {
        if (this.selectedPerson.email) {
            let serverResponse = await this.data.get(this.data.CHECK_EMAIL + '?email=' +  this.selectedPerson.email);
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
                var url = this.data.PERSON_REGISTER;
            } else {
                var url = this.data.PEOPLE_SERVICE;
            }
            let response = await this.data.saveObject(this.selectedPerson, url, "post")
                if (!response.status) {
                    if(this.peopleArray){
                        this.peopleArray.push(this.selectedPerson);;
                    }
                } else {
                     this.data.processError(response, "There was an error creating the account.");
                }
                return response;
        } else {
            let response = await this.data.saveObject(this.selectedPerson, this.data.PEOPLE_SERVICE, "put")
                if (!response.error) {
                    if(this.peopleArray){
                        this.peopleArray[this.editIndex] = this.utils.copyObject(this.selectedPerson, this.peopleArray[this.editIndex]);
                    }
                }  else {
                    this.data.processError(response, "There was an error updating the account.");
                }
                return response;
        }
    }

    async deletePerson(){
        if(this.selectedPerson._id){
            let serverResponse = await this.data.deleteObject(this.data.PEOPLE_SERVICE + '/' + this.selectedPerson._id);
            if (!serverResponse.error) {
                this.peopleArray.splice(this.editIndex, 1);
                this.editIndex = - 1;
            }
            return serverResponse;
        }
        return null;
    }

    updatePassword(obj){
        if (this.selectedPerson._id) {
            return this.data.saveObject(obj, this.data.PEOPLE_SERVICE + '/password/' + this.selectedPerson._id, "put");
        }
    }

    isPersonDirty(){
        if(this.selectedPerson){
            if(this.selectedPerson._id){
                var obj = this.peopleArray[this.editIndex];
            } else {
                var obj = this.emptyPerson();
            }
            return this.utils.objectsEqual(this.selectedPerson, obj);
        }
    }


    //Institutions
	async getInstitutionsArray(refresh, options) {
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
                this.utils.formatDateForDatesPicker(this.selectedInstitution)
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
        newInstitution.joinDate =  moment(this.utils.convertUTCDateToLocalDate(new Date().toString(0,10))).format("YYYY-MM-DD");

        newInstitution.name = "";
        return newInstitution;
    }

     getInstitutionPeople(id){
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
                if (!response.status) {
                    if(this.institutionsArray){
                        this.institutionsArray.push(this.selectedInstitution);
                    }
                } else {
                     this.data.processError(response, "There was an error creating the account.");
                }
                return response;
        } else {
            let response = await this.data.saveObject(this.selectedInstitution, this.data.INSTITUTION_SERVICES, "put")
                if (!response.status) {
                    if(this.institutionsArray){
                        this.institutionsArray[this.editInstitutionIndex] = this.utils.copyObject(this.selectedInstitution, this.institutionsArray[this.editInstitutionIndex]);
                    }
                }  else {
                    this.data.processError(response, "There was an error updating the account.");
                }
                return response;
        }
    }

    async deleteInstitution(){
         let serverResponse = await this.data.deleteObject(this.data.INSTITUTION_SERVICES + '/' + this.selectedInstitution._id);
            if (serverResponse.status === 204) {
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

    // async getMyCourses(refresh, options){
    //     if (!this.coursesArray || refresh) {
    //         if(this.selectedPerson._id){
    //             var url = this.data.COURSES_SERVICE;
    //             url += options ? options : "";
    //             try {
    //                 let serverResponse = await this.data.get(url);
    //                 if (!serverResponse.error) {
    //                     this.coursesArray = serverResponse;
    //                 } else {
    //                     return undefined;
    //                 }
    //             } catch (error) {
    //                 console.log(error);
    //                 return undefined;
    //             }
    //         } else {
    //             this.coursesArray = new Array();
    //         }
    //         return this.coursesArray;
    //     }
    // }

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
                this.coursesArray.push(this.selectedCourse);
                this.editIneditCourseIndexdex = this.coursesArrayInternal.length - 1;
            } else {
                this.data.processError(response, "There was an error creating the product.");
                }
            return serverResponse;
        } else {
            var serverResponse = await this.data.saveObject(this.selectedCourse, this.data.COURSES_SERVICE, "put");
            if (!serverResponse.error) {
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

}