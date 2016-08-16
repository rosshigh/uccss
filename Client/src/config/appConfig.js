export class AppConfig {
    //URIs
    BASE_URL = "/api/";
    FILE_URL = "/api/upload";
    FILE_DOWNLOAD_URL = "/uploadedFiles";
    HELPTICKET_FILE_DOWNLOAD_URL = "uploadedFiles/helpTickets";
    PRODUCT_FILE_DOWNLOAD_URL = "uploadedFiles/productFiles";
    DOWNLOAD_FILE_DOWNLOAD_URL = 'uploadedFiles/downloads';


    DATE_FORMAT_TABLE = "MMM Do YYYY"
    DATE_FORMAT_GENERAL = "MM-DD-YYYY"
    TIMEZONES = ["EST", "CST", "MST", "PST"];


    //User roles
    ROLES = [{ role: 'USER', label: 'User', UCConly: false },
        { role: 'PROV', label: "Provisional", UCConly: false },
        { role: 'LEGL', label: 'Legal', UCConly: false },
        { role: 'BUSI', label: 'Billing', UCConly: false },
        { role: 'PRIM', label: 'Primary', UCConly: false },
        { role: 'UCCT', label: 'UCC Technical Staff', UCConly: true },
        { role: 'UCCA', label: 'UCC Admin Staff', UCConly: true },
        { role: 'UCSA', label: 'UCCSS Admin', UCConly: true }];

    UCC_ROLE = 6;
    UCC_TECH_ROLE = 8;
    PROV_USER = 1;

    //User Status
    ACTIVE_PERSON = "01";
    INACTIVE_PERSON = "02";

    //Session parameters
    SESSION_TERM = "Session";
    SESSION_PARAMS = [
        { "session": "A", "startMonth": "01", "startDay": "04", "endMonth": "06", "endDay": "30", "openMonth": "12", "openDay": "01" },
        { "session": "B", "startMonth": "05", "startDay": "01", "endMonth": "09", "endDay": "30", "openMonth": "04", "openDay": "01" },
        { "session": "C", "startMonth": "08", "startDay": "01", "endMonth": "12", "endDay": "24", "openMonth": "07", "openDay": "01" },
        { "session": "D", "startMonth": "11", "startDay": "01", "endMonth": "03", "endDay": "31", "openMonth": "10", "openDay": "01" }
    ];

    //Site parameters
    SITE_INFO_TYPES = [
        {
            'type': 'INFO',
            'description': 'Information'
        },
        {
            'type': 'NEWS',
            'description': 'News'
        },
        {
            'type': 'ILNK',
            'description': 'Inside Link'
        },
        {
            'type': 'OLNK',
            'description': 'Outside Link'
        },
        {
            'type': 'SYST',
            'description': 'System Status'
        },
        {
            'type': "DLNK",
            'description': 'Dashboard Link'
        }
    ];

    MESSAGE_TYPES = ['CLIENT_REQUESTS', 'HELP_TICKETS'];


    //Help Ticket parameters
    HELP_TICKET_OTHER_TYPE = 4;
    HELP_TICKET_APP_TYPE = 3;
    HELP_TICKET_RESET_TYPE = 2;
    HELP_TICKET_CURRICULUM_TYPE = 1;

    HELP_TICKET_TYPES = [
        {
            "code": this.HELP_TICKET_CURRICULUM_TYPE,
            "description": "Curriculum Help",
            "message": "Select the product for which you need help and provide as much information about the curriculum as possible.  <br><br><p>If you can, upload screen shots of error messages.</p>",
            "clientRequired": true,
            "appsRequired": false,
            "show": false
        },
        {
            "code": this.HELP_TICKET_RESET_TYPE,
            "description": "Reset Passwords",
            "message": "Select the product and enter the user ids of the passwords you need reset.<br><br><p>If the user ids are on a ERP system, you can reset passwords and unlock user accounts in transaction SU01.</p>",
            "clientRequired": true,
            "appsRequired": false,
            "show": false
        },
        {
            "code": this.HELP_TICKET_APP_TYPE,
            "description": "Application Help",
            "message": "This includes applications other than those hosted at the UCC.  Select the product from the drop down list and provide as much information about the error as possible.<br><br><p>If possible upload screen shots that show the problem.</p>",
            "clientRequired": false,
            "appsRequired": true,
            "show": false
        },
        {
            "code": this.HELP_TICKET_OTHER_TYPE,
            "description": "Other",
            "message": "Use this for any issue that doesn't fall easily into one of the other categories.",
            "clientRequired": false,
            "appsRequired": false,
            "show": false
        }
    ];

    NEW_HELPTICKET_STATUS = 1; 
    UNDER_REVIEW_HELPTICKET_STATUS = 2;
    CUSTOMER_ACTION_HELPTICKET_STATUS = 3;
    FOLLOW_UP_HELPTICKET_STATUS = 4;
    CLOSED_RESOLVED_HELPTICKET_STATUS = 5;
    CLOSED_UNRESOLVED_HELPTICKET_STATUS = 6;

    HELP_TICKET_STATUSES = [
        {
            "code": this.NEW_HELPTICKET_STATUS,
            "description": "New"
        },
        {
            "code": this.UNDER_REVIEW_HELPTICKET_STATUS,
            "description": "Under Review"
        },
        {
            "code": this.CUSTOMER_ACTION_HELPTICKET_STATUS,
            "description": "Customer Action"
        },
        {
            "code": this.FOLLOW_UP_HELPTICKET_STATUS,
            "description": "Follow Up"
        },
        {
            "code": this.CLOSED_RESOLVED_HELPTICKET_STATUS,
            "description": "Closed/Resolved"
        },
        {
            "code": this.CLOSED_UNRESOLVED_HELPTICKET_STATUS,
            "description": "Closed/Unresolved"
        }
    ];

    

    OS = [{ name: "Windows" }, { name: 'Mac OS' }];
    Office = [{ name: "2007" }, { name: '2010' }, { name: '2013' }];


    //Client request parameters
    DEFAULT_FACULTY_IDS = 2;                    //Default number of faculty IDs
    REQUEST_LIMIT = 7;                          //Maximum products in a request
    REQUEST_LEEWAY = 5;
    REGULAR_ID_BUFFER = 5;                      //IDS between assignments in shared clients
    REGULAR_ID_ALLOWANCE = 5;                   //Additional IDs assigned
    SANDBOX_ID_BUFFER = 0;                      //IDS between assigned sandbox ranges
    SHARED_ID_BUFFER = 5;                       //IDS between assigned shared ranges
    SANDBOX_ID_COUNT = 2;                       //Default ids assigned to sandbox
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


    INSTITUTIONS_ACTIVE = '01';
    
}
