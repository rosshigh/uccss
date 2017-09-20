import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';

@inject(HttpClient)
export class AppConfig {


    HOST = location.origin; 

    DOWNLOAD_URL = this.HOST + '/uploadedFiles';  

    // BASE_URL = "http://localhost:5000/api/";
    // IMG_DOWNLOAD_URL = "http://localhost:5000/img/";  

    BASE_URL = this.HOST + "/api/";
    IMG_DOWNLOAD_URL = this.HOST + '/img/'  

    isMobile = false;

     HELPTICKET_FILE_DOWNLOAD_URL = this.HOST + "/uploadedFiles/helpTickets";
    PRODUCT_FILE_DOWNLOAD_URL = this.HOST + "/uploadedFiles/productFiles";
    DOWNLOAD_FILE_DOWNLOAD_URL = this.HOST + '/uploadedFiles/downloads';
    DOCUMENT_FILE_DOWNLOAD_URL = this.HOST + '/uploadedFiles/documents';  
    DOCUMENT_FILE_CURRICULUM_URL = this.HOST + '/uploadedFiles/curriculum';
    SITE_FILE_DOWNLOAD_URL = this.HOST + '/uploadedFiles/site/';
    PERSON_IMAGE_DOWNLOAD_URL = this.HOST + '/uploadedFiles/peopleImages';

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
            { role: "STUT", label: "Student Worker", UCConly: true, authLevel: 8},
            { role: "UAST", label: "UA Staff", UCConly: false, authLevel: 7}];

    UCC_ROLE = 6;
    UCC_TECH_ROLE = 8;
    UA_ROLE = 7;
    USER_ROLE = 4;
    PROV_USER = 1;

    rowOptions = [5,10,15,20,50];
    defaultPageSize = 20;

    systemTypes = ['Switch','Router','Server','Storage','Other'];

    SESSION_STATUSES = ["Closed","Active","Requests","Next"];

    ASSIGNED_REQUEST_CODE = 2;
    UNASSIGNED_REQUEST_CODE = 1;
    UPDATED_REQUEST_CODE = 3;
    CUSTOMER_ACTION_REQUEST_CODE = 4;
    CANCELLED_REQUEST_CODE = 5;
    PROVISIONAL_REQUEST_CODE = 6;
    REPLIED_REQUEST_CODE = 7;

    REQUEST_STATUS = [{ code: this.UNASSIGNED_REQUEST_CODE, description: 'Unassigned', status: "" }, 
                      { code: this.ASSIGNED_REQUEST_CODE, description: 'Assigned', status: "assign"  }, 
                      { code: this.UPDATED_REQUEST_CODE, description: 'Updated', status: "success"  }, 
                      { code: this.CUSTOMER_ACTION_REQUEST_CODE, description: 'Customer Action', status: "warning"  },
                      { code: this.CANCELLED_REQUEST_CODE, description: 'Cancelled', status: ""  },
                      { code: this.PROVISIONAL_REQUEST_CODE, description: 'Provisional', status: ""  },
                      { code: this.REPLIED_REQUEST_CODE, description: 'Replied', status: "danger" }];

    SANDBOX_ID = 'a1a1a1a1a1a1a1a1a1a1a1a1';      //Name used for sandbox requests
    ID_WILDCARD = "#";                          //Wildcard in id templates
    SANDBOX_NAME = "Trial Client"
    FIRST_DEFAULT_ID = 1;
    FACULTY_ID_BUFFER = 2;
    DEFAULT_FACULTY_IDS = 2;
    
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

    HELP_TICKET_PRIORITIES = [{priority: "Low", message: "Not time sensitive", status: ""},{priority: "Medium", message: "Time sensitive but doesn't require immediate attention", status: "warning"},{priority: "Critical", message:"Critical, time sensitive issue",status: "danger"}];

    REFRESH_KEYWORDS = ["ERPSIM"];

    SYSTEM_TYPES = ["ERP", "HANA", "BO"];

    // HELP_TICKET_TYPES = [
    //       {
    //         "code": 0,
    //         "description": "Help with My Product Requests",
    //         "message": "This includes any problems with requested or assigned products in current sessions. </p>",
    //         "showSubtypes": true,
    //         "subtypes": [
    //             {
    //                 "code": this.HELP_TICKET_CURRICULUM_TYPE,
    //                 "description": "Issues with curriculum exercises",
    //                 "message": "Select the product for which you need help and provide as much information about the curriculum as possible.  <br><br><p>If you can, upload screen shots of error messages.</p>",
    //                 "clientRequired": true,
    //                 "appsRequired": false,
    //                 "show": false
    //             },
    //             {
    //                 "code": this.HELP_TICKET_PASSWORD_RESET_TYPE,
    //                 "description": "Reset Passwords",
    //                 "message": "Select the product and enter the user ids of the passwords you need reset.<br><br><p>If the user ids are on a ERP system, you can reset passwords and unlock user accounts in transaction SU01.</p>",
    //                 "clientRequired": true,
    //                 "appsRequired": false,
    //                 "show": false
    //             },
    //             {
    //                 "code": this.HELP_TICKET_LOGON_TYPE,
    //                 "description": "Other logon or connection problems",
    //                 "message": "Select the product and describe the problem as thouroughly as possible.",
    //                 "clientRequired": true,
    //                 "appsRequired": false,
    //                 "show": false
    //             },
    //             {
    //                 "code": this.HELP_TICKET_CLIENT_REFRESH_TYPE,
    //                 "description": "Refresh an ERPSim client",
    //                 "message": "Select the client to refresh",
    //                 "clientRequired": true,
    //                 "appsRequired": false,
    //                 "show": false
    //             },
    //             {
    //                 "code": this.HELP_TICKET_CLIENT_OTHER_TYPE,
    //                 "description": "Other",
    //                 "message": "Select the product request and enter a description of the problem.",
    //                 "clientRequired": true,
    //                 "appsRequired": false,
    //                 "show": false
    //             }

    //         ]
    //     },
    //     {
    //         "code": 1,
    //         "description": "Desktop Application Help",
    //         "message": "This includes applications other than those hosted at the UCC.  Select the product from the drop down list and provide as much information about the error as possible.<br><br><p>If possible upload screen shots that show the problem.</p>",
    //         "clientRequired": false,
    //         "appsRequired": true,
    //         "show": false,
    //         "showSubtypes": false,
    //         "subtypes": [
    //             {
    //                 "code": this.HELP_TICKET_APP_ERROR_TYPE,
    //                 "description": "Application or Installation problems",
    //                 "message": "Select the application software and provide as many details as possible.",
    //                 "clientRequired": false,
    //                 "appsRequired": true,
    //                 "show": false
    //             },
    //             {
    //                 "code": this.HELP_TICKET_APP_LICENSE_TYPE,
    //                 "description": "License keys for analytics software",
    //                 "message": "Select the application software.",
    //                 "clientRequired": false,
    //                 "appsRequired": true,
    //                 "show": false
    //             },
    //             {
    //                 "code": this.HELP_TICKET_APP_OTHER_TYPE,
    //                 "description": "Other issuew with software",
    //                 "message": "Select the application software.",
    //                 "clientRequired": false,
    //                 "appsRequired": true,
    //                 "show": false
    //             }
    //         ]
    //     },
    //     {
    //         "code": 2,
    //         "description": "Other",
    //         "message": "Use this for any issue that doesn't fall easily into one of the other categories.",
    //         "clientRequired": false,
    //         "appsRequired": false,
    //         "show": false,
    //         "showSubtypes": false,
    //         "subtypes": [
    //             {
    //                 "code": this.HELP_TICKET_OTHER_UA_TYPE,
    //                 "description": "Questions about the UA or UA Learning Hub",
    //                 "message": "Select the application software and provide as many details as possible.",
    //                 "clientRequired": false,
    //                 "appsRequired": false,
    //                 "show": false
    //             },
    //             {
    //                 "code": this.HELP_TICKET_OTHER_UCCSS_TYPE,
    //                 "description": "Questions about the UCCSS or faculy accounts",
    //                 "message": "Select the application software.",
    //                 "clientRequired": false,
    //                 "appsRequired": false,
    //                 "show": false
    //             },
    //             {
    //                 "code": this.HELP_TICKET_OTHER_CURRICULUM_TYPE,
    //                 "description": "General questions on UA curriculum",
    //                 "message": "Select the application software.",
    //                 "clientRequired": false,
    //                 "appsRequired": false,
    //                 "show": false
    //             },
    //             {
    //                 "code": this.HELP_TICKET_OTHER_TYPE,
    //                 "description": "Other questions",
    //                 "message": "Select the application software.",
    //                 "clientRequired": false,
    //                 "appsRequired": false,
    //                 "show": false
    //             }
    //         ]
    //     }
    // ];
    
    NEW_HELPTICKET_STATUS = 1; 
    REVIEW_HELPTICKET_STATUS = 2;
    IN_PROCESS_HELPTICKET_STATUS = 3;
    CUSTOMER_ACTION_HELPTICKET_STATUS = 4;
    REPLIED_HELPTICKET_STATUS = 5;
    CLOSED_HELPTICKET_STATUS = 6;

    HELP_TICKET_EMAIL_CREATE = 1;
    HELP_TICKET_EMAIL_STATUS_CHANGE = 9;

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
        },
        {
            'type': "ALRT",
            'description': 'Alerts'
        },
        {
            'type': "CARO",
            'description': 'Carousel'
        },
        {
            'type': "CONT",
            'description': 'Contact Info'
        }
    ];

    //Message types
    MESSAGE_TYPES = ['CLIENT_REQUESTS', 'HELP_TICKETS'];            

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
        this.SUBMENU_BACKGROUND = this.getParameter('SUBMENU_BACKGROUND');
        this.SUBMENU_COLOR = this.getParameter('SUBMENU_COLOR');
        this.ACTIVE_SUBMENU_COLOR = this.getParameter('ACTIVE_SUBMENU_COLOR');
        this.SUBMENU_BACKGROUND = this.getParameter('SUBMENU_BACKGROUND');
        this.MENU_COLOR = this.getParameter('MENU_COLOR');
        this.MENU_BACKGROUND = this.getParameter('MENU_BACKGROUND');
        this.ACTIVE_MENU_COLOR = this.getParameter('ACTIVE_MENU_COLOR');
        this.MENU_BACKGROUND = this.getParameter('MENU_BACKGROUND');
        this.HOVER_SUBMENU_BACKGROUND = this.getParameter('HOVER_SUBMENU_BACKGROUND');
        this.HOME_PAGE_UCC_TITLE = this.getParameter('HOME_PAGE_UCC_TITLE');
        this.HOME_PAGE_LEFT = this.getParameter('HOME_PAGE_LEFT');
        this.HOME_PAGE_MIDDLE = this.getParameter('HOME_PAGE_MIDDLE');
        this.HOME_PAGE_RIGHT = this.getParameter('HOME_PAGE_RIGHT');
        this.UCC_PARALLAX_LOGO = this.getParameter('UCC_PARALLAX_LOGO');
        this.NAVBAR_LOGO = this.getParameter('NAVBAR_LOGO');
        this.PRODUCT_REQUESTS_EMAIL_LIST = this.getParameter('PRODUCT_REQUESTS_EMAIL_LIST');
        this.BUTTONS_BACKGROUND = this.getParameter('BUTTONS_BACKGROUND');
        this.ACTIVE_REQUEST_OVERLAP = this.getParameter('ACTIVE_REQUEST_OVERLAP');

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
