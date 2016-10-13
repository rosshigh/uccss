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
                if (!serverResponse.status) {
                    this.peopleArrayInternal = serverResponse;
                    this.peopleArray = serverResponse;
                    for (var i = 0, x = this.peopleArrayInternal.length; i < x; i++) {
                        this.peopleArrayInternal[i].baseIndex = i;
                    }
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

    clearPeopleArray(){
        this.peopleArrayInternal = new Array();
         this.peopleArray = new Array();
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
            this.emptyPerson();
            // this.newPerson = true;
        } else {
            try {
                this.selectedPerson = this.utils.copyObject(this.peopleArray[index]);
                // this.newPerson = false;
                this.editIndex = index;
            } catch (error) {
                console.log(error);
                this.selectedPerson = this.emptyPerson();
                // this.newPerson = true;
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
        //TODO: All properties
        this.selectedPerson = new Object();
        this.selectedPerson.lastName = "";
        this.selectedPerson.firstName = "";
        this.selectedPerson.middleName = "";
        this.selectedPerson.lastName = "";
        this.selectedPerson.status = "";
        this.selectedPerson.phone = "";
        this.selectedPerson.mobile = ""
        this.selectedPerson.email = "";
        this.selectedPerson.gender = "";
        this.selectedPerson.roles = new Array();
        this.selectedPerson.roles.push("USER");
        this.selectedPerson.password = "";
        this.selectedPerson.institution = "";
        this.selectedPerson.active = false;
        this.coursesArray = new Array();
    }

    async checkEmail() {
        if (this.selectedPerson.email) {
            let serverResponse = await this.data.get(this.data.CHECK_EMAIL + '?email=' +  this.selectedPerson.email);
            if (serverResponse.status === 409) {
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
                    if(this.peopleArrayInternal){
                        this.peopleArrayInternal.push(this.selectedPerson);
                        this.peopleArray = this.peopleArrayInternal;
                    }
                } else {
                     this.data.processError(response, "There was an error creating the account.");
                }
                return response;
        } else {
            let response = await this.data.saveObject(this.selectedPerson, this.data.PEOPLE_SERVICE, "put")
                if (!response.status) {
                    if(this.peopleArray){
                        this.peopleArray[this.editIndex] = this.utils.copyObject(this.selectedPerson, this.peopleArray[this.editIndex]);
                        this.peopleArrayInternal[this.peopleArray[this.editIndex].baseIndex] = this.utils.copyObject(this.selectedPerson, this.peopleArrayInternal[this.peopleArray[this.editIndex].baseIndex]);
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

    async getInstitutionsArray(refresh, options) {
        if (!this.institutionsArray || refresh) {
            var url = this.data.INSTITUTION_SERVICES;
            url += options ? options : "";
            let response = await this.data.get(url)
            if (!response.status) {
                this.institutionsArrayInternal = response;
                this.institutionsArray = response;
                for (var i = 0, x = this.institutionsArrayInternal.length; i < x; i++) {
                    this.institutionsArrayInternal[i].baseIndex = i;
                }
                if(options.sortProp){
                    this.institutionsArray =  this.sortArray(this.institutionsArrayInternal, options.sortProp, options.direction);
                }
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
        this.institutionsArray.forEach((item) => {
          if(item._id === id){
            this.selectedInstitution = this.utils.copyObject(item);
            return;
          }
        });
        return null;
    }

    emptyInstitution() {
        //TODO: All properties
        var newInstitution = new Object();
        newInstitution.joinDate =  moment(this.utils.convertUTCDateToLocalDate(new Date().toString(0,10))).format("YYYY-MM-DD");

        newInstitution.name = "";
        return newInstitution;
    }

    sortArray(sortArray, propName, direction) {
        var sortDirection = direction == "ASC" ? 1 : -1;
        return  sortArray
            .sort((a, b) => {
                return ((a[propName] < b[propName]) ? -1 : (a[propName] > b[propName]) ? 1 : 0) * sortDirection;
            });
    }

     async saveInstitution() {
        if (!this.selectedInstitution._id) {
            let response = await this.data.saveObject(this.selectedInstitution, this.data.INSTITUTION_SERVICES, "post")
                if (!response.status) {
                    if(this.institutionsArrayInternal){
                        this.institutionsArrayInternal.push(this.selectedInstitution);
                        this.institutionsArray = this.institutionsArrayInternal;
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
                        this.institutionsArrayInternal[this.institutionsArray[this.editInstitutionIndex].baseIndex] = this.utils.copyObject(this.selectedInstitution, this.institutionsArrayInternal[this.institutionsArray[this.editInstitutionIndex].baseIndex]);
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
                this.institutionsArrayInternal.splice(this.editInstitutionIndex, 1);
                this.institutionsArray = this.institutionsArrayInternal;
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

    getInstitutionPeople(id){
        this.peopleInstArray = new Array();
        if(id == -1){
           return;
        }

        this.peopleInstArray = this.peopleArrayInternal.filter((item) => {
            return item.institutionId === id;
        });
    }

    filterInstitutions(filters){
        this.filters = filters;
        this.filter(this.institutionsArray, this.institutionsArrayInternal);
    }

    filter(array1, array2) {
        var keep;
        var index = 0;
        var filters = this.filters;
        array1 = array2.filter((item) => {
            //Assume the item should be eliminated
            keep = false;
            //For each filter in filterValues
            for (var i = 0, x = filters.length; i < x; i++) {
                switch (filters[i].compound){
                    case 'or':
                        var values = filters[i].value.split(':');
                        for(var j = 0; j < values.length; j++){
                            keep = keep || item[filters[i].property] === values[j];
                        }
                        break;
                    case 'and':
                    break;
                    default:
                        var convertVal = convertValues(item[filters[i].property], filters[i].value, filters[i].type)
                        keep = keep || item[filters[i].property] === filters[i].value;

                }

                if (!keep) break;
            }
            return keep;
        })

    }

    convertValues(val1, val2, type){
        var obj = new Object();
        switch(type){
            case 'string':
                var obj = {val1: val1.toUpperCase(), val2: val2.toUpperCase()};
        }
        return obj;
    }

    async getCoursesArray(refresh, options, fields) {
        if (!this.coursesArray || refresh) {
            if(this.selectedPerson._id){
              var url = this.data.COURSES_SERVICE;
              url += options ? options : "";
              try {
                  let serverResponse = await this.data.get(url);
                  if (!serverResponse.status) {
                      this.coursesArrayInternal = serverResponse;
                      this.coursesArray = serverResponse;
                      for (var i = 0, x = this.coursesArrayInternal.length; i < x; i++) {
                          this.coursesArrayInternal[i].baseIndex = i;
                      }
                  } else {
                      return undefined;
                  }
              } catch (error) {
                  console.log(error);
                  return undefined;
              }
            } else {
                this.coursesArray = new Array();
            }
            return this.coursesArray;
        }

    }

    async getMyCourses(refresh, options){
        if (!this.coursesArray || refresh) {
            if(this.selectedPerson._id){
                var url = this.data.COURSES_SERVICE;
                url += options ? options : "";
                try {
                    let serverResponse = await this.data.get(url);
                    if (!serverResponse.status) {
                        this.coursesArrayInternal = serverResponse;
                        this.coursesArray = serverResponse;
                        for (var i = 0, x = this.coursesArrayInternal.length; i < x; i++) {
                            this.coursesArrayInternal[i].baseIndex = i;
                        }
                    } else {
                        return undefined;
                    }
                } catch (error) {
                    console.log(error);
                    return undefined;
                }
            } else {
                this.coursesArray = new Array();
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
                this.newSystem = false;
                this.editCourseIndex = index;
            } catch (error) {
                console.log(error);
                this.selectedCourse = this.emptyCourse();
                this.newSystem = true;
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
            if (!serverResponse.status) {
                this.coursesArrayInternal.push(this.selectedCourse);
                this.coursesArray = this.coursesArrayInternal;
                this.editIneditCourseIndexdex = this.coursesArrayInternal.length - 1;
                this.newSystem = false;
            } else {
                     this.data.processError(response, "There was an error creating the product.");
                }
            return serverResponse;
        } else {
            var serverResponse = await this.data.saveObject(this.selectedCourse, this.data.COURSES_SERVICE, "put");
            if (!serverResponse.status) {
                this.coursesArray[this.editCourseIndex] = this.utils.copyObject(this.selectedCourse, this.coursesArray[this.editCourseIndex]);
                this.coursesArrayInternal[this.coursesArray[this.editCourseIndex].baseIndex] = this.utils.copyObject(this.selectedCourse, this.coursesArrayInternal[this.coursesArray[this.editCourseIndex].baseIndex]);
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