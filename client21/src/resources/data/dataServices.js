import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import {Utils} from '../utils/utils';
// import {AppConfig} from '../../config/appConfig';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(HttpClient, Utils,  EventAggregator)
export class DataServices {
    isRequesting = false;
    config= {
        BASE_URL : 'http://localhost/api'
    }

    constructor(http, utils,  eventAggregator) {
        this.http = http;
        this.utils = utils;
        // this.config = config;
        this.eventAggregator = eventAggregator;

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

    sendMail(content) {
        this.isRequesting = true;
			return this.http.createRequest('sendMail')
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

    login(content, url){
        return this.http.createRequest(url)
			 .asPost()
			 .withContent(content)
			 .send().then(response => {
				 this.isRequesting = false;
                 return JSON.parse(response.response);
             }).catch(e => {
				 this.isRequesting = false;
                 console.log(e);
                 return  {error: true, code: e.statusCode, message: e.statusText};
             });
    }

    uploadFiles(files, url){
        // this.isRequesting = true;
        this.progress = 0;
		let formData = new FormData();

		files.forEach((item, index) => {
            formData.append("file" + index, item);
        })

		return this.http.createRequest(url)
			.asPost()
			.withHeader('Authorization', 'JWT ' + sessionStorage.getItem('token'))
			.withContent(formData)
			.skipContentProcessing()
            .withProgressCallback(progress => {
                console.log(progress.loaded)
                this.eventAggregator.publish('upload-progress', {progress: progress.loaded, total: progress.total});
                this.progress = progress.loaded / progress.total;
            })
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
                msg = undefined;
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
        if(msg && msg.length > 0) this.utils.showNotification(msg);
    }

    // //File URLs
    FILE_URL = "http://localhost:5000/api/upload";
    FILE_DOWNLOAD_URL = "http://localhost:5000/";

    // //Institution Services
    // INSTITUTION_SERVICES = "institutions";

    // //People Services
    // PEOPLE_SERVICE = "people";
    // PERSON_REGISTER = "people/register"
    // CHECK_EMAIL = 'people/checkEmail';
    // CHECK_NAME = 'people/checkName';
    // SEND_MAIL = 'people/sendMail';
    // PASSWORD_RESET = 'passwordReset';
    // NOTES_SERVICE = "notes";

    // CURRICULUM_SERVICE = 'curriculum';
    // CURRICULUM_CATEGORY_SERVICE = 'curriculumcategory';

    // //IS4UA Services
    IS4UA = 'is4ua';

    // //Systems Services
    // SYSTEMS_SERVICE = "systems";

    // //Clients Services
    CLIENTS_SERVICE = 'clients';
    DELETE_ALL_CLIENTS = 'clients/system/SYSTEMID';


    // //Products Services
    // PRODUCTS_SERVICE = 'products';



    // //Help Tickets
    // HELP_TICKET_SERVICES = 'helpTickets';
    // HELP_TICKET_CONTENT_SERVICES = "helpTickets/content/HELPTICKETID/STATUS";
    // HELP_TICKET_LOCK_SERVICES = "helpTicketLocks";
    // HELP_TICKET_TYPES = "helpTicketsTypes";

    // //Downloads
    // DOWNLOADS_SERVICE = "apps";
    // APPLICATION_CATEGORY_SERVICE = "appsCategory";
    // DOCUMENTS_SERVICE = "documents";
    // DOCUMENTS_CATEGORY_SERVICE = "documentCategory";
    // DOWNLOADS_UPLOADS = "downloads/upload";

    // //Clientrequests Services
    COURSES_SERVICE = 'courses';
    PERSON_COURSES_SERVICE = 'courses/person/PERSONID';
    // CLIENT_REQUESTS_SERVICES = 'clientRequests';
    // CLIENT_REQUEST_DETAILS='clientRequestsDetails';
    // CLIENT_REQUEST_LOCK_SERVICES = 'clientRequestLocks';
    // CUSTOMER_ACTION = 'clientRequests/customerAction';

    CONFIG_SERVICE = 'config';
    SESSIONS_CONFIG_SERVICE = 'semesterConfig';

    //File upload
    DOCUMENTS_FILE_UPLOAD = 'documents/file';

    // API_KEY='0f85bb931f8faad7e35b6f685aa4e931';
    // OPEN_WEATHER_MAP_SERVICE = 'http://api.openweathermap.org/data/2.5/weather';

}
