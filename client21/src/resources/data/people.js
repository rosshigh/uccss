import { inject } from 'aurelia-framework';
import { DataServices } from './dataServices';
import { Utils } from '../utils/utils';

@inject(DataServices, Utils)
export class People {

  UCC_STAFF_SERVICE = 'uccStaff';
  PEOPLE_SERVICE = "people";
  // PERSON_REGISTER = "people/register"
  CHECK_EMAIL = 'people/checkEmail';
  CHECK_NAME = 'people/checkName';
  SEND_MAIL = 'people/sendMail';
  PASSWORD_RESET = 'passwordReset';
  NOTES_SERVICE = "notes";
  TECHNOTES_SERVICE = "techNotes";
  TECHNOTESCAT_SERVICE = "technotecats";
  INSTITUTION_SERVICES = "institutions";
  COURSES_SERVICE = 'courses';
  PEOPLE_UPLOAD_SERVICE = '/people/upload/';
  NOTIFICATION_SERVICE = 'notifications';
  PACKAGES_SERVICES = 'apj/packages';

  constructor(data, utils) {
    this.data = data;
    this.utils = utils;
  }

  async getPeopleArray(options) {
    let url = this.PEOPLE_SERVICE;
    url += options ? options : "";
    try {
      let serverResponse = await this.data.get(url);
      if (!serverResponse.error) {
        this.peopleArray = serverResponse;
      } else {
        this.data.processError(serverResponse);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getPeopleBulkEmailArray(options) {
    var url = this.PEOPLE_SERVICE + '/bulkEmail';
    url += options ? options : "";
    try {
      let serverResponse = await this.data.get(url);
      if (!serverResponse.error) {
        this.peopleBulkEmailArray = serverResponse;
      } else {
        this.data.processError(serverResponse);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getPerson(id) {
    let url = this.PEOPLE_SERVICE + '/' + id;
    try {
      let serverResponse = await this.data.get(url);
      if (!serverResponse.error) {
        this.selectedPerson = serverResponse;
        this.originalPerson = this.utils.copyObject(serverResponse);
      } else {
        this.data.processError(serverResponse);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getUCCStaff(uccRoles) {
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

  selectPerson(index, array) {
    if (index === undefined) {
      this.selectedPerson = this.emptyPerson();
    } else {
      if (array && array === 'i') {
        this.selectedPerson = this.utils.copyObject(this.instutionPeopleArray[index]);
        this.editIndex = index;
      } else {
        this.selectedPerson = this.utils.copyObject(this.peopleArray[index]);
        this.originalPerson = this.utils.copyObject(this.selectedPerson);
        this.editIndex = index;
      }
    }
  }

  selectedPersonById(id, array) {
    if (array && array === 'i') {
      this.instutionPeopleArray.forEach((item, index) => {
        if (item._id === id) {
          this.editIndex = index;
          this.selectedPerson = this.utils.copyObject(item);
        }
      });
      return;
    } else {
      this.peopleArray.forEach((item, index) => {
        if (item._id === id) {
          this.editIndex = index;
          this.selectedPerson = this.utils.copyObject(item);
        }
      });
      return;
    }
  }

  setSelectedPerson(userObj) {
    if (userObj) {
      this.selectedPerson = this.utils.copyObject(userObj);
    }
  }

  emptyPerson() {
    var obj = new Object();
    obj.lastName = "";
    obj.firstName = "";
    obj.middleName = "";
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
    obj.file = new Object();
    var auditObj = {
      property: "Created",
      eventDate: new Date()
    }
    obj.audit = [auditObj];
    return obj;
  }

  async savePerson() {
    let url = this.PEOPLE_SERVICE;
    if (!this.selectedPerson._id) {
      let response = await this.data.saveObject(this.selectedPerson, url, "post")
      return response;
    } else {
      let response = await this.data.saveObject(this.selectedPerson, url, "put")
      return response;
    }
  }

  isPersonDirty() {
    if (this.selectedPerson) {
      return this.utils.objectsEqual(this.selectedPerson, this.originalPerson);
    }
  }

  async deletePerson() {
    if (this.selectedPerson._id) {
      let serverResponse = await this.data.deleteObject(this.PEOPLE_SERVICE + '/' + this.selectedPerson._id);
      return serverResponse;
    }
    return null;
  }

  updatePassword(obj) {
    if (this.selectedPerson._id) {
      return this.data.saveObject(obj, this.PEOPLE_SERVICE + '/password/' + this.selectedPerson._id, "put");
    }
  }

  async checkEmail() {
    if (this.selectedPerson.email) {
      let serverResponse = await this.data.get(this.CHECK_EMAIL + '/' + this.selectedPerson.email);
      if (serverResponse.code === 409) {
        return true;
      } else {
        return false;
      }
    }
  }

  async checkName() {
    if (this.selectedPerson.firstName && this.selectedPerson.lastName && this.selectedPerson.institutionId) {
      let serverResponse = await this.data.get(thisCHECK_NAME + '?filter=[and]firstName|eq|' + this.selectedPerson.firstName + ':lastName|eq|' + this.selectedPerson.lastName + ':institutionId|eq|' + this.selectedPerson.institutionId);
      if (serverResponse.code === 409) {
        return true;
      } else {
        return false;
      }
    }
  }

  async uploadPhoto(files) {
    if (!this.selectedPerson._id) {
      return;
    }
    let url = this.PEOPLE_SERVICE + "/files/" + this.selectedPerson._id;
    let response = await this.data.uploadFiles(files, url);
    return response;
  }

  //Institutions
  async getInstitutionArray(options) {
    var url = this.INSTITUTION_SERVICES;
    url += options ? options : "";
    let response = await this.data.get(url)
    if (!response.error) {
      this.institutionsArray = response;
    } else {
      this.institutionsArray = undefined;
    }
  }

  async getAPJPackages(options) {
      var url = this.PACKAGES_SERVICES;
      url += options ? options : "";
      let response = await this.data.get(url)
      if (!response.error) {
        this.packageArray = response;
      } else {
        this.packageArray = undefined;
      }
  }

  async getInstitution(id) {
    try {
      var url = this.INSTITUTION_SERVICES + '/' + id;
      let serverResponse = await this.data.get(url)
      if (!serverResponse.status) {
        this.selectedInstitution = serverResponse;
        this.originalInstitution = this.utils.copyObject(serverResponse);
      } else {
        this.data.processError(serverResponse);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getInstitutionPeople(options) {
    if (options === -1) {
      this.institutionPeopleArray = [];
      return;
    }
    var url = this.PEOPLE_SERVICE;
    url += options ? options : "";
    try {
      let serverResponse = await this.data.get(url);
      if (!serverResponse.error) {
        this.institutionPeopleArray = serverResponse;
      }
    } catch (error) {
      console.log(error);
    }
  }

  selectInstitution(index) {
    if (index === undefined) {
      this.selectedInstitution = this.emptyInstitution();
    } else {
      try {
        this.selectedInstitution = this.utils.copyObject(this.institutionsArray[index]);
        this.editInstitutionIndex = index;
      } catch (error) {
        console.log(error);
        this.selectedInstitution = this.emptyInstitution();
      }

    }
  }

  selectInstitutionByID(id) {
    this.institutionsArray.forEach((item, index) => {
      if (item._id === id) {
        this.selectedInstitution = this.utils.copyObject(item);
        this.editInstitutionIndex = index;
        return;
      }
    });
    return null;
  }

  setInstitution(obj){
    this.selectedInstitution = this.utils.copyObject(obj);
  }

  emptyInstitution() {
    var newInstitution = new Object();
    newInstitution.joinDate = new Date();
    newInstitution.name = "";
    newInstitution.packages = [];
    return newInstitution;
  }

  async saveInstitution() {
    if (!this.selectedInstitution._id) {
      let response = await this.data.saveObject(this.selectedInstitution, this.INSTITUTION_SERVICES, "post")
      return response;
    } else {
      let response = await this.data.saveObject(this.selectedInstitution, this.INSTITUTION_SERVICES, "put")
      return response;
    }
  }

  isInstitutionDirty() {
    if (this.selectedInstitution) {
      return this.utils.objectsEqual(this.selectedInstitution, this.originalInstitution);
    }
  }

  async deleteInstitution() {
    if (this.selectedInstitution._id) {
      let serverResponse = await this.data.deleteObject(this.INSTITUTION_SERVICES + '/' + this.selectedInstitution._id);
      return serverResponse;
    }
    return null;
  }

  async getCoursesArray(options) {
    var url = this.COURSES_SERVICE;
    url += options ? options : "";
    try {
      let serverResponse = await this.data.get(url);
      if (!serverResponse.error) {
        this.coursesArray = serverResponse;
      }
    } catch (error) {
      console.log(error);
    };
  }

  async getTrialClient() {
    let url = this.COURSES_SERVICE + '?filter=name|eq|Trial Client';
    let serverResponse = await this.data.get(url);
    if (!serverResponse.error) {
      this.trialClient = serverResponse[0];
    } else {
      this.trialClient = null;
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

  selectCourseByID(id) {

    this.selectedCourse = this.emptyCourse();
    this.coursesArray.forEach(item => {
      if (item._id === id) {
        this.selectedCourse = this.utils.copyObject(item);
      }
    })
  }

  setCourse(object) {
    this.selectedCourse = this.utils.copyObject(object);
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
    if (!this.selectedCourse) {
      return;
    }

    if (!this.selectedCourse._id) {
      let serverResponse = await this.data.saveObject(this.selectedCourse, this.COURSES_SERVICE, "post");
      return serverResponse;
    } else {
      var serverResponse = await this.data.saveObject(this.selectedCourse, this.COURSES_SERVICE, "put");
      return serverResponse;
    }
  }
}
