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
        switch (obj.code) {
            case 404:
                msg = msg += "The service wasn't found.  Contact your UCC.";
                break;
            case 422:
                msg = msg += "The request was bad.  Contact your UCC.";
                break;
            case 409:
                msg = msg += "The record already exists.";
                break;
            case 500:
                msg = msg += "An unspecified error occured on the server.  Contact your UCC.";
                break;
            default:
                msg = msg += "An unspecified error occured.  Contact your UCC."
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
    PERSON_REGISTER = "people/register"
    CHECK_EMAIL = 'people/checkEmail';
    CHECK_NAME = 'people/checkName'

    // //Sessions Services
    SESSIONS_SERVICE = "sessions";

    // //IS4UA Services
    IS4UA = 'is4ua';

    // //Systems Services
    SYSTEMS_SERVICE = "systems";

    // //Clients Services
    CLIENTS_SERVICE = 'clients';
    DELETE_ALL_CLIENTS = 'clients/system/SYSTEMID';


    // //Products Services
    PRODUCTS_SERVICE = 'products';

    // //Misc Services
    INFO_SERVICES = "site";
    MESSAGE_SERVICES = 'messages';

    // //Help Tickets
    HELP_TICKET_SERVICES = 'helpTickets';
    HELP_TICKET_CONTENT_SERVICES = "helpTickets/content/HELPTICKETID";

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

    CONFIG_SERVICE = 'config';
    SESSIONS_CONFIG_SERVICE = 'semesterConfig';

    //File upload 
    DOCUMENTS_FILE_UPLOAD = 'documents/file';

    API_KEY='0f85bb931f8faad7e35b6f685aa4e931';
    OPEN_WEATHER_MAP_SERVICE = 'http://api.openweathermap.org/data/2.5/weather';

}