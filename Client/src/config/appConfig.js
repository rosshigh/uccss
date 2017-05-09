import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';

@inject(HttpClient)
export class AppConfig {

    HOST = location.origin;

    BASE_URL = "http://localhost:5000/api/";
    IMG_DOWNLOAD_URL = "http://localhost:5000/" + '/img/'

    // BASE_URL = this.HOST + "/api/";
    // IMG_DOWNLOAD_URL = this.HOST + '/img/'

    INSTITUTIONS_ACTIVE = '01';
   ACTIVE_PERSON = "01";
   INACTIVE_PERSON = "02";

    ROLES = [{ role: 'USER', label: 'User', UCConly: false, authLevel: 2 },
            { role: 'PROV', label: "Provisional", UCConly: false, authLevel: 1 },
            { role: 'LEGL', label: 'Legal', UCConly: false, authLevel: 2 },
            { role: 'BUSI', label: 'Billing', UCConly: false, authLevel: 2 },
            { role: 'PRIM', label: 'Primary', UCConly: false, authLevel: 4 },
            { role: 'TECH', label: 'Technical', UCConly: false, authLevel: 2 },
            { role: 'UCCT', label: 'UCC Technical Staff', UCConly: true, authLevel: 8 },
            { role: 'UCCA', label: 'UCC Admin Staff', UCConly: true, authLevel: 6 },
            { role: 'UCSA', label: 'UCCSS Admin', UCConly: true, authLevel:  11},
            { role: 'BLOG', label: 'Blog Author', UCConly: false, authLevel:  2},
            { role: "TMAN", label: "Director", UCConly: true, authLevel: 11},
            { role: "EDIR", label: "Executive Director", UCConly: true, authLevel: 11},
            { role: "TDIR", label: "Technical Director", UCConly: true, authLevel: 11},
            { role: "TMGR", label: "Technical Manager", UCConly: true, authLevel: 11},
            { role: "STUT", label: "Student Worker", UCConly: true, authLevel: 8}];

    UCC_ROLE = 6;
    UCC_TECH_ROLE = 8;
    USER_ROLE = 4;
    PROV_USER = 1;

    rowOptions = [5,10,15,20,50];
    defaultPageSize = 20;

    systemTypes = ['Switch','Router','Server','Storage','Other'];

    SESSION_STATUSES = ["Closed","Active","Requests","Next"];

    SANDBOX_ID = 'a1a1a1a1a1a1a1a1a1a1a1a1'; 

    ASSIGNED_REQUEST_CODE = 2;
    UNASSIGNED_REQUEST_CODE = 1;
    UPDATED_REQUEST_CODE = 3;
    CUSTOMER_ACTION_REQUEST_CODE = 4;
    CANCELLED_REQUEST_CODE = 5;
    PROVISIONAL_REQUEST_CODE = 6;
    REPLIED_REQUEST_CODE = 7;

    REQUEST_STATUS = [{ code: this.UNASSIGNED_REQUEST_CODE, description: 'Unassigned', status: "" }, 
                      { code: this.ASSIGNED_REQUEST_CODE, description: 'Assigned', status: ""  }, 
                      { code: this.UPDATED_REQUEST_CODE, description: 'Updated', status: "info"  }, 
                      { code: this.CUSTOMER_ACTION_REQUEST_CODE, description: 'Customer Action', status: "warning"  },
                      { code: this.CANCELLED_REQUEST_CODE, description: 'Cancelled', status: ""  },
                      { code: this.PROVISIONAL_REQUEST_CODE, description: 'Provisional', status: ""  },
                      { code: this.REPLIED_REQUEST_CODE, description: 'Replied', status: "danger" }];

    constructor(http){
        this.http = http;
    }



    async getConfig(refresh){
        if(refresh || !this.configArray){
            return this.http.createRequest('/config')
                .asGet()
                .withHeader('Authorization', 'JWT ' + sessionStorage.getItem('token'))
                .send().then(response => {
                    if (!response.isSuccess) {
                            return response;
                        } else {
                            this.configArray = JSON.parse(response.response);
                            this.setParameters();
                        }
                    }).catch(e => {
                        this.configArray = new Array();
                        console.log(e);
                        return  {error: true, code: e.statusCode, message: e.statusText};
                    });
            }
    }

    async getSessions(refresh){
        if(refresh || !this.SESSION_PARAMS){
            return this.http.createRequest('/semesterConfig')
                .asGet()
                .withHeader('Authorization', 'JWT ' + sessionStorage.getItem('token'))
                .send().then(response => {
                    if (!response.isSuccess) {
                            return response;
                        } else {
                            this.SESSION_PARAMS = JSON.parse(response.response);
                        }
                    }).catch(e => {
                        this.SESSION_PARAMS = new Array();
                        console.log(e);
                        return  {error: true, code: e.statusCode, message: e.statusText};
                    });
        }
    }

    setParameters(){
         //Client request parameters
        this.DEFAULT_FACULTY_IDS = parseInt(this.getParameter('DEFAULT_FACULTY_IDS'));
        this.REQUEST_LIMIT = parseInt(this.getParameter('REQUEST_LIMIT'));
        this.REQUEST_LEEWAY = parseInt(this.getParameter('REQUEST_LEEWAY'));
        this.REGULAR_ID_BUFFER = parseInt(this.getParameter('REGULAR_ID_BUFFER'));
        this.REGULAR_ID_ALLOWANCE = parseInt(this.getParameter('REGULAR_ID_ALLOWANCE'));
        this.SANDBOX_ID_BUFFER = parseInt(this.getParameter('SANDBOX_ID_BUFFER'));
        this.SHARED_ID_BUFFER = parseInt(this.getParameter('SHARED_ID_BUFFER'));
        this.SANDBOX_ID_COUNT = parseInt(this.getParameter('SANDBOX_ID_COUNT'));
        this.CLIENT_INTERVAL = parseInt(this.getParameter('CLIENT_INTERVAL'));
        this.DATE_FORMAT_TABLE = this.getParameter('DATE_FORMAT_TABLE');
        this.UCC_HOME = this.getParameter('UCC_HOME');
        this.SANDBOX_USED = this.getParameter('SANDBOX_USED');
        this.HOME_WELCOME = this.getParameter('HOME_WELCOME');
        this.DEFAULT_HOME_IMAGE = this.getParameter('DEFAULT_HOME_IMAGE');
        this.WEATHER_API_KEY = this.getParameter('WEATHER_API_KEY');
        this.UCC_PHONE = this.getParameter('UCC_PHONE');
        this.UCC_EMAIL = this.getParameter('UCC_EMAIL');
        this.UCC_ADMIN_PHONE = this.getParameter('UCC_ADMIN_PHONE');
        this.UCC_ADMIN_EMAIL = this.getParameter('UCC_ADMIN_EMAIL');
        this.UCC_ADDRESS = this.getParameter('UCC_ADDRESS');
        this.SHOW_STAFF_CONTACT = this.getParameter('SHOW_STAFF_CONTACT');
        this.UCC_HEADER_IMAGE = this.getParameter('UCC_HEADER_IMAGE');
        this.CONTACT_CONTENT = this.getParameter('CONTACT_CONTENT');
        this.SEND_EMAILS = this.getParameter('SEND_EMAILS');
        this.TEMP_SCALE = this.getParameter('TEMP_SCALE');
        this.HELP_TICKET_EMAIL_LIST = this.getParameter('HELP_TICKET_EMAIL_LIST');
        this.SESSION_EXPLANATION = this.getParameter('SESSION_EXPLANATION');
    }

    getParameter(parameter){
        for(var i = 0; i < this.configArray.length; i++){
            if(this.configArray[i].parameter === parameter){
                if(this.configArray[i].type === 'boolean') {
                    return this.configArray[i].value == "true";
                } else {
                    return this.configArray[i].value;
                }
            }
        }
        return null;
    }
}
