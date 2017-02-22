import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';

@inject(HttpClient)
export class AppConfig {

    SEND_EMAILS = true;

    HOST = location.origin;
    // BASE_URL = "http://localhost:5000/api/";
    BASE_URL = this.HOST + "/api/";
    HELPTICKET_FILE_DOWNLOAD_URL = this.HOST + "/uploadedFiles/helpTickets";
    PRODUCT_FILE_DOWNLOAD_URL = this.HOST + "/uploadedFiles/productFiles";
    DOWNLOAD_FILE_DOWNLOAD_URL = this.HOST + '/uploadedFiles/downloads';
    DOCUMENT_FILE_DOWNLOAD_URL = this.HOST + '/uploadedFiles/documents';  
    SITE_FILE_DOWNLOAD_URL = this.HOST + '/uploadedFiles/site/'

    //User roles
    ROLES = [{ role: 'USER', label: 'User', UCConly: false },
        { role: 'PROV', label: "Provisional", UCConly: false },
        { role: 'LEGL', label: 'Legal', UCConly: false },
        { role: 'BUSI', label: 'Billing', UCConly: false },
        { role: 'PRIM', label: 'Primary', UCConly: false },
        { role: 'TECH', label: 'Technical', UCConly: false },
        { role: 'UCCT', label: 'UCC Technical Staff', UCConly: true },
        { role: 'UCCA', label: 'UCC Admin Staff', UCConly: true },
        { role: 'UCSA', label: 'UCCSS Admin', UCConly: true },
        { role: 'BLOG', label: 'Blog Author', UCConly: false }];

    UCC_ROLE = 6;
    UCC_TECH_ROLE = 8;
    USER_ROLE = 4;
    PROV_USER = 1;

    systemTypes = ['Switch','Router','Server','Storage','Other'];

    //User Status
    ACTIVE_PERSON = "01";
    INACTIVE_PERSON = "02";

    INSTITUTIONS_ACTIVE = '01';

    //Help Tickets
    NEW_HELPTICKET_STATUS = 1; 
    UNDER_REVIEW_HELPTICKET_STATUS = 2;
    CUSTOMER_ACTION_HELPTICKET_STATUS = 3;

    //Client requests
    UNASSIGNED_CLIENT_REQUEST = 1;
    UPDATED_CLIENT_REQUEST = 3;
    CUSTOMER_ACTION_CLIENT_REQUEST = 4;

     TIMEZONES = ["EST", "CST", "MST", "PST"];

     SESSION_STATUSES = ["Closed","Active","Requests","Next"];

      SESSION_EXPLANATION = "The UCC sessions are used to define when systems are available and when you can request products.  A session classified as <b>Active</b> is the currently active session whereas when a session classified as <b>Requests</b> it means customers may request products but the systems are not yet available.  A <b>Next</b> status means that we are not taking requests yet but will be soon.  Use the information on this page to plan.  We don't extend products across sessions so make sure you choose the session that matches your requirements."

     //Session parameters
    SESSION_TERM = "Session";

    //Client parametrs
    CLIENT_INCREMENT_INTERVAL = 1;

    ASSIGNED_CLIENT_CODE = 4;
    UNASSIGNED_CLIENT_CODE = 1;
    SHARED_CLIENT_CODE = 2;
    REFRESHED_CLIENT_CODE = 3;
    SANDBOX_CLIENT_CODE = 5;
    CLIENT_STATUSES = [{ code: 1, description: "Unassigned", OKToDelete: true, lock: false },
        { code: this.SHARED_CLIENT_CODE, description: "Shared", OKToDelete: false, lock: false },
        { code: this.REFRESHED_CLIENT_CODE, description: "Refresh", OKToDelete: true, lock: true },
        { code: this.ASSIGNED_CLIENT_CODE, description: "Assigned", OKToDelete: false, lock: true },
        { code: this.SANDBOX_CLIENT_CODE, description: "SANDBOX", OKToDelete: false, lock: false }];

    //Site parameters
    SITE_INFO_TYPES = [
        {
            'type': 'INFO',
            'description': 'Session Information'
        },
        {
            'type': 'NEWS',
            'description': 'UCC and UA News'
        },
        {
            'type': 'ILNK',
            'description': 'Useful Links - Useful Info Page'
        },
        {
            'type': 'OLNK',
            'description': 'Useful Links - Home Page'
        },
        {
            'type': 'SYST',
            'description': 'System Status'
        },
        {
            'type': "DLNK",
            'description': 'Useful Information - Home Page'
        }
    ];

    //Message types
    MESSAGE_TYPES = ['CLIENT_REQUESTS', 'HELP_TICKETS'];

        //Help Ticket parameters
    HELP_TICKET_OTHER_TYPE = "2";
    HELP_TICKET_APP_TYPE = 3;
    HELP_TICKET_PASSWORD_RESET_TYPE = "02";
    HELP_TICKET_CURRICULUM_TYPE = "01";
    HELP_TICKET_PRODUCT_REQUESTS = 0;
    HELP_TICKET_CLIENT_REFRESH_TYPE = 5;
    HELP_TICKET_LOGON_TYPE = 6;
    HELP_TICKET_CLIENT_OTHER_TYPE = 7;
    HELP_TICKET_APP_ERROR_TYPE = "1";
    HELP_TICKET_APP_LICENSE_TYPE = 9;
    HELP_TICKET_APP_OTHER_TYPE = 10;
    HELP_TICKET_OTHER_UA_TYPE = 11;
    HELP_TICKET_OTHER_UCCSS_TYPE = 12;
    HELP_TICKET_OTHER_CURRICULUM_TYPE = 13;
    HELP_TICKET_OTHER_TYPE = 99;

    REFRESH_KEYWORDS = ["ERPSIM"];

    HELP_TICKET_TYPES = [
          {
            "code": 0,
            "description": "Help with My Product Requests",
            "message": "This includes any problems with requested or assigned products in current sessions. </p>",
            "showSubtypes": true,
            "subtypes": [
                {
                    "code": this.HELP_TICKET_CURRICULUM_TYPE,
                    "description": "Issues with curriculum exercises",
                    "message": "Select the product for which you need help and provide as much information about the curriculum as possible.  <br><br><p>If you can, upload screen shots of error messages.</p>",
                    "clientRequired": true,
                    "appsRequired": false,
                    "show": false
                },
                {
                    "code": this.HELP_TICKET_PASSWORD_RESET_TYPE,
                    "description": "Reset Passwords",
                    "message": "Select the product and enter the user ids of the passwords you need reset.<br><br><p>If the user ids are on a ERP system, you can reset passwords and unlock user accounts in transaction SU01.</p>",
                    "clientRequired": true,
                    "appsRequired": false,
                    "show": false
                },
                {
                    "code": this.HELP_TICKET_LOGON_TYPE,
                    "description": "Other logon or connection problems",
                    "message": "Select the product and describe the problem as thouroughly as possible.",
                    "clientRequired": true,
                    "appsRequired": false,
                    "show": false
                },
                {
                    "code": this.HELP_TICKET_CLIENT_REFRESH_TYPE,
                    "description": "Refresh an ERPSim client",
                    "message": "Select the client to refresh",
                    "clientRequired": true,
                    "appsRequired": false,
                    "show": false
                },
                {
                    "code": this.HELP_TICKET_CLIENT_OTHER_TYPE,
                    "description": "Other",
                    "message": "Select the product request and enter a description of the problem.",
                    "clientRequired": true,
                    "appsRequired": false,
                    "show": false
                }

            ]
        },
        {
            "code": 1,
            "description": "Desktop Application Help",
            "message": "This includes applications other than those hosted at the UCC.  Select the product from the drop down list and provide as much information about the error as possible.<br><br><p>If possible upload screen shots that show the problem.</p>",
            "clientRequired": false,
            "appsRequired": true,
            "show": false,
            "showSubtypes": false,
            "subtypes": [
                {
                    "code": this.HELP_TICKET_APP_ERROR_TYPE,
                    "description": "Application or Installation problems",
                    "message": "Select the application software and provide as many details as possible.",
                    "clientRequired": false,
                    "appsRequired": true,
                    "show": false
                },
                {
                    "code": this.HELP_TICKET_APP_LICENSE_TYPE,
                    "description": "License keys for analytics software",
                    "message": "Select the application software.",
                    "clientRequired": false,
                    "appsRequired": true,
                    "show": false
                },
                {
                    "code": this.HELP_TICKET_APP_OTHER_TYPE,
                    "description": "Other issuew with software",
                    "message": "Select the application software.",
                    "clientRequired": false,
                    "appsRequired": true,
                    "show": false
                }
            ]
        },
        {
            "code": 2,
            "description": "Other",
            "message": "Use this for any issue that doesn't fall easily into one of the other categories.",
            "clientRequired": false,
            "appsRequired": false,
            "show": false,
            "showSubtypes": false,
            "subtypes": [
                {
                    "code": this.HELP_TICKET_OTHER_UA_TYPE,
                    "description": "Questions about the UA or UA Learning Hub",
                    "message": "Select the application software and provide as many details as possible.",
                    "clientRequired": false,
                    "appsRequired": false,
                    "show": false
                },
                {
                    "code": this.HELP_TICKET_OTHER_UCCSS_TYPE,
                    "description": "Questions about the UCCSS or faculy accounts",
                    "message": "Select the application software.",
                    "clientRequired": false,
                    "appsRequired": false,
                    "show": false
                },
                {
                    "code": this.HELP_TICKET_OTHER_CURRICULUM_TYPE,
                    "description": "General questions on UA curriculum",
                    "message": "Select the application software.",
                    "clientRequired": false,
                    "appsRequired": false,
                    "show": false
                },
                {
                    "code": this.HELP_TICKET_OTHER_TYPE,
                    "description": "Other questions",
                    "message": "Select the application software.",
                    "clientRequired": false,
                    "appsRequired": false,
                    "show": false
                }
            ]
        }
    ];


    NEW_HELPTICKET_STATUS = 1; 
    REVIEW_HELPTICKET_STATUS = 2;
    IN_PROCESS_HELPTICKET_STATUS = 3;
    CUSTOMER_ACTION_HELPTICKET_STATUS = 4;
    REPLIED_HELPTICKET_STATUS = 5;
    CLOSED_HELPTICKET_STATUS = 6;

    HELP_TICKET_STATUSES = [
        {
            "code": this.NEW_HELPTICKET_STATUS,
            "description": "New"
        },
        {
            "code": this.REVIEW_HELPTICKET_STATUS,
            "description": "Review"
        },
        {
            "code": this.IN_PROCESS_HELPTICKET_STATUS,
            "description": "In Process"
        },
        {
            "code": this.CUSTOMER_ACTION_HELPTICKET_STATUS,
            "description": "Customer Action"
        },
        {
            "code": this.REPLIED_HELPTICKET_STATUS,
            "description": "Replied"
        },
        {
            "code": this.CLOSED_HELPTICKET_STATUS,
            "description": "Closed"
        }
    ];

    SANDBOX_ID = 'a1a1a1a1a1a1a1a1a1a1a1a1';      //Name used for sandbox requests
    ID_WILDCARD = "#";                          //Wildcard in id templates
    SANDBOX_NAME = "Sandbox"
    FIRST_DEFAULT_ID = 1;
    FACULTY_ID_BUFFER = 2;

    ASSIGNED_REQUEST_CODE = 2;
    UNASSIGNED_REQUEST_CODE = 1;
    UPDATED_REQUEST_CODE = 3;
    CUSTOMER_ACTION_REQUEST_CODE = 4;
    CANCELLED_REQUEST_CODE = 5;
    PROVISIONAL_REQUEST_CODE = 6;

    REQUEST_STATUS = [{ code: this.UNASSIGNED_REQUEST_CODE, description: 'Unassigned' }, 
                      { code: this.ASSIGNED_REQUEST_CODE, description: 'Assigned' }, 
                      { code: this.UPDATED_REQUEST_CODE, description: 'Updated' }, 
                      { code: this.CUSTOMER_ACTION_REQUEST_CODE, description: 'Customer Action' },
                      { code: this.CANCELLED_REQUEST_CODE, description: 'Cancelled' },
                      { code: this.PROVISIONAL_REQUEST_CODE, description: 'Provisional' }];
    
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
        console.log(JSON.stringify(this.SESSION_PARAMS));
    }

    getParameter(parameter){
        for(var i = 0; i < this.configArray.length; i++){
            if(this.configArray[i].parameter === parameter) return this.configArray[i].value;
        }
        return null;
    }
       
}
