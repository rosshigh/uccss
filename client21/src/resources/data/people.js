import { inject } from 'aurelia-framework';
// import { DataServices } from './dataServices';
import { Utils } from '../utils/utils';

// @inject(DataServices, Utils)
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

  // constructor(data, utils) {
  //   this.data = data;
  //   this.utils = utils;
  // }

  
}
