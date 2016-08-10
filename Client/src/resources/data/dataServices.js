import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Utils} from '../utils/utils';
import {AppConfig} from '../../config/appConfig';

@inject(HttpClient, Utils, AppConfig)
export class DataServices {

    constructor(http, utils, config) {
        this.http = http;
        this.utils = utils;
        this.config = config;
    }

    get(url) {
        return this.http.fetch(url)
            .then(response => {
                if (response.statusText != 'OK') {
                    return response;
                } else {
                    return response.json();
                }
            })
            .catch(e => {
                console.log(e);
                this.postResult = e.status + '-' + e.statusText;
            });
    }

    saveObject(content, url, method) {
        return this.http.fetch(url, {
            method: method,
            body: JSON.stringify(content)
        })
            .then(response => {
                if (response.statusText != 'OK') {
                    return response;
                } else {
                    return response.json();
                }
            }).catch(e => {
                console.log(e);
                this.postResult = e.status + '-' + e.statusText;
            });
    }

    deleteObject(url) {
        return this.http.fetch(url, {
            method: 'delete'
        })
            .then(response => {
                if (response.statusText != 'OK') {
                    return response;
                } else {
                    return response.json();
                }
            }).catch(e => {
                console.log(e);
                this.postResult = e.status + '-' + e.statusText;
            });
    }

    upLoadFiles(id, container, files, type, content) {
        let formData = new FormData();
        var req = new XMLHttpRequest()

        for (var i = 0; i < files.length; i++) {
            formData.append("file" + i, files[i]);
        }
        var that = this;
        var url = this.config.FILE_URL + "/" + id + "/" + container + "/" + type + (content ? "?content=" + content : "");

        req.open('POST', url);
        req.onreadystatechange = function () {
            if (this.status == 200 && this.readyState == 4) {
                that.utils.showNotification("Files uploaded successfuly", "", "", "", "", 5);
                return { status: 200 };
            } else {
                if (this.status === 500) {
                    that.processError({ status: this.status }, 'uploading the file' + files.length > 1 ? "s" : "");
                }
            }
        }
        req.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('aurelia_token'));
        var response = req.send(formData);
    }

    ajaxSuccess() {
        console.log(this.responseText);
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
        this.utils.showNotification(msg, "", "", "", "", 6);
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
    // DELETE_ALL_CLIENTS = 'clients/system/SYSTEMID';
    

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
    // HELP_TICKET_CURRENT = 'helpTickets/current';
    // HELP_TICKET_UPDATE_OWNER = 'helpTickets/owner/HELPTICKETID';
    // HELP_TICKET_UPDATE_STATUS = 'helpTickets/status/HELPTICKETID';
    // HELP_TICKET_UPDATE_KEYWORDS = 'helpTickets/keywords/HELPTICKETID';
    // HELP_TICKET_EMAIL = "helpTickets/sendMail/HTID";

    // //Downloads
    DOWNLOADS_SERVICE = "apps";
    APPLICATION_CATEGORY_SERVICE = "appsCategory";

    // //Clientrequests Services
    COURSES_SERVICE = 'courses';
    PERSON_COURSES_SERVICE = 'courses/person/PERSONID';
    CLIENT_REQUESTS_SERVICES = 'clientRequests';
    CLIENT_REQUEST_DETAILS='clientRequestsDetails';
    // CLIENT_REQUESTS_PERSON_COURSEID_SESSION = 'clientRequests/person/PERSONID/session/SESSIONID/course/COURSEID';
    // CLIENT_REQUESTS_PERSON_SESSION ='clientRequests/person/PERSONID/session/SESSIONID';
    // CLIENT_REQUESTS_SEND_MESSAGE = 'clientRequests/customerAction';

}
