import { inject } from 'aurelia-framework';
import { DataServices } from './dataServices';
import { Utils } from '../utils/utils';

@inject(DataServices, Utils)
export class People {

  UCC_STAFF_SERVICE = 'uccStaff';
  PEOPLE_SERVICE = "people";
  PERSON_REGISTER = "people/register"
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

  selectPerson(index, array) {
    if (index === undefined) {
      this.selectedPerson = this.emptyPerson();
    } else {
      if (array && array === 'i') {
        this.selectedPerson = this.utils.copyObject(this.instutionPeopleArray[index]);
        this.editIndex = index;
      } else {
        this.selectedPerson = this.utils.copyObject(this.peopleArray[index]);
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

  async savePerson(register) {
    if (!this.selectedPerson._id) {
      if (register) {
        var url = this.PERSON_REGISTER;
      } else {
        var url = this.PEOPLE_SERVICE;
      }
      let response = await this.data.saveObject(this.selectedPerson, url, "post")
      if (!response.error) {
        if (this.peopleArray) {
          this.peopleArray.push(response);;
        }
      } else {
        this.data.processError(response, "There was an error creating the account.");
      }
      return response;
    } else {
      let response = await this.data.saveObject(this.selectedPerson, this.PEOPLE_SERVICE, "put")
      if (!response.error) {
        if (this.peopleArray) {
          this.peopleArray[this.editIndex] = this.utils.copyObject(this.selectedPerson, this.peopleArray[this.editIndex]);
        }
      }
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

  async getInstitutionsArray(options) {
    var url = this.INSTITUTION_SERVICES;
    url += options ? options : "";
    let response = await this.data.get(url)
    if (!response.error) {
      this.institutionsArray = response;
    } else {
      this.institutionsArray = undefined;
    }
  }
}
