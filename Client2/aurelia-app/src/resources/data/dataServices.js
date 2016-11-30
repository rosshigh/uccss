import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import {Utils} from '../utils/utils';
import {AppConfig} from '../../config/appConfig';

@inject(HttpClient, Utils, AppConfig)
export class DataServices {
    isRequesting = false;

    constructor(http, utils, config) {
        this.http = http;
        this.utils = utils;
        this.config = config;

		this.http.configure(x => {
			x.withBaseUrl(this.config.BASE_URL);
		});
    }

	activate(){
	}

    get(url){
		this.isRequesting = true;
		return this.http.createRequest(url)
		.asGet()
		.withHeader('Authorization', 'JWT ' + sessionStorage.getItem('token'))
		.send().then(response => {
			this.isRequesting = false;
			if (!response.isSuccess) {
                     return response;
                 } else {
                     return JSON.parse(response.response);
                 }
             }).catch(e => {
				 this.isRequesting = false;
                 console.log(e);
                 return  {error: true, code: e.statusCode, message: e.statusText};
             });

	}

    getNoAuth(url){
        this.isRequesting = true;
		return this.http.createRequest(url)
		.asGet()
		.send().then(response => {
			this.isRequesting = false;
			if (!response.isSuccess) {
                     return response;
                 } else {
                     return JSON.parse(response.response);
                 }
             }).catch(e => {
				 this.isRequesting = false;
                 console.log(e);
                 return  {error: true, code: e.statusCode, message: e.statusText};
             });
    }

	saveObject(content, url, method) {
        this.isRequesting = true;
		if(method === 'put'){
 			return this.http.createRequest(url)
			 .asPut()
			 .withHeader('Authorization', 'JWT ' + sessionStorage.getItem('token'))
			 .withContent(content)
			 .send().then(response => {
				 this.isRequesting = false;
				if (!response.isSuccess) {
                     return response;
                 } else {
                     return JSON.parse(response.response);
                 }
             }).catch(e => {
				 this.isRequesting = false;
                 console.log(e);
                 return  {error: true, code: e.statusCode, message: e.statusText};
             });
			
		} else if(method === 'post'){
			return this.http.createRequest(url)
			 .asPost()
			 .withHeader('Authorization', 'JWT ' + sessionStorage.getItem('token'))
			 .withContent(content)
			 .send().then(response => {
				 this.isRequesting = false;
				if (!response.isSuccess) {
                     return response;
                 } else {
                     return JSON.parse(response.response);
                 }
             }).catch(e => {
				 this.isRequesting = false;
                 console.log(e);
                 return  {error: true, code: e.statusCode, message: e.statusText};
             });
		}
       
    }

	deleteObject(url){
		this.isRequesting = true;
		return this.http.createRequest(url)
		.asDelete()
		.withHeader('Authorization', 'JWT ' + sessionStorage.getItem('token'))
		.send().then(response => {
				this.isRequesting = false;
				if (!response.isSuccess) {
                     return response;
                 } else {
                     if(response.statusCode  === 204){
                        return response;
                     } else {
                        return JSON.parse(response.response);
                     }
                     
                 }
             }).catch(e => {
				 this.isRequesting = false;
                 console.log(e);
                 return  {error: true, code: e.statusCode, message: e.statusText};
             });
	}


    uploadFiles(files, url){
        this.isRequesting = true;
		let formData = new FormData();

		for (var i = 0; i < files.length; i++) {
			formData.append("file" + i, files[0]);
		}

		return this.http.createRequest(url)
			.asPost()
			.withHeader('Authorization', 'JWT ' + sessionStorage.getItem('token'))
			.withContent(formData)
			.skipContentProcessing()
			.send().then(response => {
				this.isRequesting = false;
				if (!response.isSuccess) {
                     return response;
                 } else {
                     return JSON.parse(response.response);
                 }
             }).catch(e => {
				 this.isRequesting = false;
                 console.log(e);
                 return  {error: true, code: e.statusCode, message: e.statusText};
             });

    }

 processError(obj, message) {
        console.log(obj);
        var msg = (message ? message : "") + " ";
        switch (obj.status) {
            case 404:
                msg = msg += "The service wasn't found.  Contact your UCC.";
                break;
            case 422:
                msg = msg += "The request was bad.  Contact your UCC.";
                break;
            case 409:
                msg = msg += "The record already exists.";
                break;
        }
        this.utils.showNotification(msg);
    }

    // //File URLs
    FILE_URL = "http://localhost:5000/api/upload";
    FILE_DOWNLOAD_URL = "http://localhost:5000/";

    // //Institution Services
    INSTITUTION_SERVICES = "institutions";

    // //People Services
    PEOPLE_SERVICE = "people";
    // PERSON_SERVICE = "people/PERSONID";
    PERSON_REGISTER = "people/register"
    CHECK_EMAIL = 'people/checkEmail';
    // INSTITUTION_PEOPLE = 'people/instituion/INSTITUTIONID';
    // PASSWORD_SERVICE = 'people/password/PERSONID';

    // //Sessions Services
    SESSIONS_SERVICE = "sessions";
    // ACTIVE_SESSIONS_SERVICE = "sessions/active";

    // //IS4UA Services
    IS4UA = 'is4ua';

    // //Systems Services
    SYSTEMS_SERVICE = 'systems';
    // SYSTEMS_UPDATE_PRODUCT = 'systems/product/SYSTEMID';

    // //Clients Services
    CLIENTS_SERVICE = 'clients';
    // DELETE_CLIENT = 'clients/CLIENTID';
    DELETE_ALL_CLIENTS = 'clients/system/SYSTEMID';


    // //Products Services
    PRODUCTS_SERVICE = 'products';
    // ACTIVE_PRODUCTS_SERVICE = 'products/active';

    // //File Services
    // FILES_SERVICE = 'upload';

    // //Misc Services
    INFO_SERVICES = "site";
    // CURRENT_INFO_SERVICES = 'site/current';
    MESSAGE_SERVICES = 'messages';

    // //Help Tickets
    HELP_TICKET_SERVICES = 'helpTickets';
    HELP_TICKET_CONTENT_SERVICES = "helpTickets/content/HELPTICKETID";
    // HELP_TICKET_UPLOADS = "helpTicket/upload";
    // HELP_TICKET_CURRENT = 'helpTickets/current';
    // HELP_TICKET_UPDATE_OWNER = 'helpTickets/owner/HELPTICKETID';
    // HELP_TICKET_UPDATE_STATUS = 'helpTickets/status/HELPTICKETID';
    // HELP_TICKET_UPDATE_KEYWORDS = 'helpTickets/keywords/HELPTICKETID';
    // HELP_TICKET_EMAIL = "helpTickets/sendMail/HTID";

    // //Downloads
    DOWNLOADS_SERVICE = "apps";
    APPLICATION_CATEGORY_SERVICE = "appsCategory";
    DOCUMENTS_SERVICE = "documents";
    DOCUMENTS_CATEGORY_SERVICE = "documentCategory";
    DOWNLOADS_UPLOADS = "downloads/upload";

    // //Clientrequests Services
    COURSES_SERVICE = 'courses';
    PERSON_COURSES_SERVICE = 'courses/person/PERSONID';
    CLIENT_REQUESTS_SERVICES = 'clientRequests';
    CLIENT_REQUEST_DETAILS='clientRequestsDetails';
    // CLIENT_REQUESTS_PERSON_COURSEID_SESSION = 'clientRequests/person/PERSONID/session/SESSIONID/course/COURSEID';
    // CLIENT_REQUESTS_PERSON_SESSION ='clientRequests/person/PERSONID/session/SESSIONID';
    // CLIENT_REQUESTS_SEND_MESSAGE = 'clientRequests/customerAction';

    CONFIG_SERVICE = 'config';
    SESSIONS_CONFIG_SERVICE = 'semesterConfig';

    //File upload 
    DOCUMENTS_FILE_UPLOAD = 'documents/file';

    API_KEY='0f85bb931f8faad7e35b6f685aa4e931';
    OPEN_WEATHER_MAP_SERVICE = 'http://api.openweathermap.org/data/2.5/weather';

}