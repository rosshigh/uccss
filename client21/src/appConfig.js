export class AppConfig {

    constructor(){
        this.screenHeight = $(window).height();
    }

    HOST = location.origin;

    DOWNLOAD_URL = this.HOST + '/uploadedFiles';
    DOCUMENT_FILE_DOWNLOAD_URL = this.HOST + '/uploadedFiles/documents';
    HELPTICKET_FILE_DOWNLOAD_URL = this.HOST + '/uploadedFiles/helpTickets';

    //Development
    BASE_URL = "http://localhost/api";
    IMG_DOWNLOAD_URL = "http://localhost/img/";
    PHOTO_DOWNLOAD_URL = "http://localhost/uploadedFiles/photos/";

    //Production
    // BASE_URL = this.HOST + "/api/";
    // IMG_DOWNLOAD_URL = this.HOST + '/img/';  
    // PHOTO_DOWNLOAD_URL = this.HOST + "/uploadedFiles/photos/";

    REQUEST_LIMIT = 7;
    REQUEST_LEEWAY = 5;

    INSTITUTIONS_ACTIVE = '01';
    ACTIVE_PERSON = "01";
    INACTIVE_PERSON = "02";

    ROLES = [{ role: 'USER', label: 'User', UCConly: false, authLevel: 2 },
    { role: 'FACU', label: 'Faculty', UCConly: false, authLevel: 3 },
    // { role: 'PROV', label: "Provisional", UCConly: false, authLevel: 1 },
    { role: 'LEGL', label: 'Legal', UCConly: false, authLevel: 2 },
    { role: 'BUSI', label: 'Billing', UCConly: false, authLevel: 2 },
    { role: 'PRIM', label: 'Primary', UCConly: false, authLevel: 4 },
    { role: 'TECH', label: 'Technical', UCConly: false, authLevel: 2 },
    { role: "ACCT", label: "ACC", UCConly: false, authLevel: 5 },
    { role: 'UCCT', label: 'UCC Technical Staff', UCConly: true, authLevel: 8 },
    { role: 'UCCA', label: 'UCC Admin Staff', UCConly: true, authLevel: 6 },
    { role: 'UCSA', label: 'UCCSS Admin', UCConly: true, authLevel: 11 },
    // { role: 'BLOG', label: 'Blog Author', UCConly: false, authLevel: 2 },
    { role: "TMAN", label: "Director", UCConly: true, authLevel: 11 },
    { role: "EDIR", label: "Executive Director", UCConly: true, authLevel: 11 },
    { role: "TDIR", label: "Technical Director", UCConly: true, authLevel: 11 },
    { role: "TMGR", label: "Technical Manager", UCConly: true, authLevel: 11 },
    { role: "STUT", label: "Student Worker", UCConly: true, authLevel: 8 },
    { role: "UAST", label: "UA Staff", UCConly: false, authLevel: 7 }];

    UCC_ROLE = 6;
    UCC_TECH_ROLE = 8;
    UA_ROLE = 7;
    ACC_ROLE = 5;
    USER_ROLE = 4; d
    PROV_USER = 1;

    USER_STATUS = [
        { code: "01", description: "Active" },
        { code: "02", description: "Inactive" },
        { code: "03", description: 'All' }
    ]

    PHONE_MASKS = [
        { country: 'US', mask: '999-999-9999' },
        { country: 'CA', mask: '999-999-9999' },
        { country: 'CANADA', mask: '999-999-9999' },
        { country: 'BR', mask: '99 99999 9999' },
        { country: 'CO', mask: '9999999999999' }
    ];

    SESSION_STATUSES = ["Closed", "Active", "Requests", "Next"];

    SYSTEM_TYPES = ["ERP", "HANA", "BO"];

    HARDWARE_TYPES = ['Switch','Router','Server','Storage','Other'];

    // SANDBOX_ID = 'a1a1a1a1a1a1a1a1a1a1a1a1';      //Name used for sandbox requests
    SANDBOX_ID = '58a746e8dddd74e80be43a70';
    SANDBOX_NAME = "Trial Client"
    ASSIGNED_CLIENT_CODE = 4;
    UNASSIGNED_CLIENT_CODE = 1;
    SHARED_CLIENT_CODE = 2;
    REFRESHED_CLIENT_CODE = 3;
    SANDBOX_CLIENT_CODE = 5;
    RETIRED_CLIENT_CODE = 6;
    CLIENT_STATUSES = [
        { code: this.ASSIGNED_CLIENT_CODE, description: "Assigned", OKToDelete: false, lock: true },
        { code: this.REFRESHED_CLIENT_CODE, description: "Refresh", OKToDelete: true, lock: true },
        { code: this.RETIRED_CLIENT_CODE, description: "Retired", OKToDelete: false, lock: false },
        { code: this.SHARED_CLIENT_CODE, description: "Shared", OKToDelete: false, lock: false },
        { code: this.UNASSIGNED_CLIENT_CODE, description: "Unassigned", OKToDelete: true, lock: false },
        { code: this.SANDBOX_CLIENT_CODE, description: this.SANDBOX_NAME, OKToDelete: false, lock: false },
    ];


    DOCUMENT_CATGORIES = [
        { code: 'DOC', description: "Document" },
        { code: 'CUR', description: "Curriculum" },
        { code: 'SOF', description: "Software" },
        { code: 'HPT', description: "Help Tickets" },
        { code: 'USE', description: "Useful Info" }
    ]

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
            'type': 'SYST',
            'description': 'System Status'
        },
        {
            'type': "DLNK",
            'description': 'Useful Links'
        },
        {
            'type': "MESS",
            'description': 'Banner Messages'
        }
    ];

    TOOLBAR = [
        ['style', ['style', 'bold', 'italic', 'underline', 'clear']],
        ['color', ['color']],
        ['layout', ['ul', 'ol', 'paragraph']],
        ['insert', ['link', 'table', 'hello']],
        ['misc', ['undo', 'redo', 'fullscreen', 'codeview']]
      ];

    // HELP_TICKET_PRIORITIES = [
    //   {
    //     priority: "Low", 
    //     message:"<p>I'm walking into class in 10 minutes, and eventhough I didn't test this beforehand, I don't want to embarrass myself in my students.</p><ul><li>I know I should have thought of it earlier</li><li>I won't ever do it again</li><li>I don't expect you to move heaven and earth when I was so remiss</li></ul><p>Okay, I'm sorry.</p>",
    //     status: "card-header-success"
    //   },
    //   {
    //     priority: "Medium", 
    //     message:"<p>I'm walking into class in 10 minutes, and eventhough I didn't test this beforehand, I don't want to embarrass myself in my students.</p><ul><li>I know I should have thought of it earlier</li><li>I won't ever do it again</li><li>I don't expect you to move heaven and earth when I was so remiss</li></ul><p>Okay, I'm sorry.</p>",
    //     status: "card-header-warning"
    //   },
    //   {
    //     priority: "Critical", 
    //     message:"<p>I'm walking into class in 10 minutes, and eventhough I didn't test this beforehand, I don't want to embarrass myself in my students.</p><ul><li>I know I should have thought of it earlier</li><li>I won't ever do it again</li><li>I don't expect you to move heaven and earth when I was so remiss</li></ul><p>Okay, I'm sorry.</p>",
    //     status: "card-header-danger"
    //   }];

    // HELP_TICKET_TYPES = [
    //   {
    //     "description":"Other",
    //     "message": "This includes issues that don't fall into other categories.",
    //     "requstsRequired": false,
    //     "subTypes": [
    //       {"type":"OTHER_OTHER","description":"Other general"},
    //       {"type":"OTHER_UCCSS","description":"UCCSS account issues"},
    //       {"type":"OTHER_GENERAL","description":"General curriculum/client questions"},
    //       {"type":"OTHER_UA","description":"UA Learning Hub & UA INformation"},
    //     ]
    //   },
    //   {
    //     "description":"Desktop Application Help",
    //     "message": "This includes issues with applications other than those osted by the UCC.",
    //     "requstsRequired": false,
    //     "subTypes": [
    //       {"type":"APPLICATION_ERROR","description":"Application or installation problems"},
    //       {"type":"LICENSE_KEYS","description":"License keys for analytics software"},
    //       {"type":"APPLICATION_OTHER","description":"Other issues with software"}
    //     ]
    //   },
    //   {
    //     "description":"Issues with curriculum exercises",
    //     "message": "This includes any problems with requested products, clients assigned by the UCC.",
    //     "requstsRequired": true,
    //     "subTypes": [
    //       {"type":"CURRICULUM_EXERCISES","description":"Issues with curriculum exercises"},
    //       {"type":"RESET_PASSWORDS","description":"Reset passwords"},
    //       {"type":"OTHER_LOGON","description":"Other logon or connection problems"},
    //       {"type":"REFRESH_HEC","description":"Refresh ERPSim client"},
    //       {"type":"PRODUCT_OTHER","description":"Other product issues"}
    //     ]
    //   }
    // ]

    NEW_HELPTICKET_STATUS = 1;
    REVIEW_HELPTICKET_STATUS = 2;
    IN_PROCESS_HELPTICKET_STATUS = 3;
    CUSTOMER_ACTION_HELPTICKET_STATUS = 4;
    REPLIED_HELPTICKET_STATUS = 5;
    CLOSED_HELPTICKET_STATUS = 6;
    MY_HELPTICKET_STATUS = 7;

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

    HELP_TICKET_CLOSE_REASON_OTHER = 3;
    HELP_TICKET_CLOSE_REASONS = [
        {
            "reason": "Help ticket was submitted in error"
        },
        {
            "reason": "I was able to resolve the issue"
        },
        {
            "reason": "The issue is no longer relevant"
        },
        {
            "reason": "Other"
        }
    ]

    DATE_FORMAT_TABLE = 'MMM Do YYYY';

    ASSIGNED_REQUEST_CODE = 1;
    UNASSIGNED_REQUEST_CODE = 2;
    UPDATED_REQUEST_CODE = 3;
    CUSTOMER_ACTION_REQUEST_CODE = 4;
    CANCELLED_REQUEST_CODE = 5;
    PROVISIONAL_REQUEST_CODE = 6;
    REPLIED_REQUEST_CODE = 7;
    RETIRED_REQUEST_CODE = 8;
    DELETED_REQUEST_CODE = 9;

    REQUEST_STATUS = [{ code: this.UNASSIGNED_REQUEST_CODE, description: 'Unassigned', status: "" },
    { code: this.ASSIGNED_REQUEST_CODE, description: 'Assigned', status: "assign" },
    { code: this.UPDATED_REQUEST_CODE, description: 'Updated', status: "success" },
    { code: this.CUSTOMER_ACTION_REQUEST_CODE, description: 'Customer Action', status: "warning" },
    { code: this.CANCELLED_REQUEST_CODE, description: 'Cancelled', status: "" },
    { code: this.PROVISIONAL_REQUEST_CODE, description: 'Provisional', status: "" },
    { code: this.REPLIED_REQUEST_CODE, description: 'Replied', status: "danger" },
    { code: this.RETIRED_REQUEST_CODE, description: 'Retired', status: "danger" },
    { code: this.DELETED_REQUEST_CODE, description: 'Deleted', status: "danger" }];


    ID_WILDCARD = "#";

    HELP_TICKET_TYPES = [
        {
            "_id": "589f79e3caaf40d0069d1619",
            "category": 2,
            "description": "Other",
            "message": "This includes any problems that don't fall in the other categories. </p>",
            "showSubtypes": false,
            "__v": 0,
            "requestsRequired": false,
            "subtypes": [
                {
                    "_id": "589f79e3caaf40d0069d161d",
                    "public": true,
                    "appsRequired": false,
                    "clientRequired": false,
                    "outputForm": "",
                    "inputForm": "",
                    "description": "Other general",
                    "type": "OTHER_OTHER",
                    "validation": [
                    ],
                    "documents": [
                        {
                            "categoryName": "NetApp",
                            "fileName": "AF8WCN_20160119102805627.pdf - version 1",
                            "_id": "58a8b1de26cef69837ca5e9d",
                            "default": true
                        }
                    ],
                    "descriptionRequired": false,
                    "active": true
                },
                {
                    "_id": "589f79e3caaf40d0069d161d",
                    "public": true,
                    "appsRequired": false,
                    "clientRequired": false,
                    "outputForm": "",
                    "inputForm": "",
                    "description": "UA Learning Hub & UA Information",
                    "type": "OTHER_UA",
                    "validation": [
                    ],
                    "documents": [
                        {
                            "categoryName": "NetApp",
                            "fileName": "AF8WCN_20160119102805627.pdf - version 1",
                            "_id": "58a8b1de26cef69837ca5e9c",
                            "default": true
                        }
                    ],
                    "descriptionRequired": true,
                    "active": true
                },
                {
                    "_id": "589f79e3caaf40d0069d161c",
                    "public": true,
                    "appsRequired": false,
                    "clientRequired": false,
                    "outputForm": "",
                    "inputForm": "",
                    "description": "UCCSS account issues",
                    "type": "OTHER_UCCSS",
                    "validation": [
                    ],
                    "documents": [
                    ],
                    "descriptionRequired": true,
                    "active": true
                },
                {
                    "_id": "589f79e3caaf40d0069d161b",
                    "public": true,
                    "appsRequired": false,
                    "clientRequired": false,
                    "outputForm": "",
                    "inputForm": "",
                    "description": "General curriculum/client questions",
                    "type": "OTHER_GENERAL",
                    "validation": [
                    ],
                    "documents": [
                    ],
                    "descriptionRequired": true,
                    "active": true
                }
            ]
        },
        {
            "_id": "589f7654caaf40d0069d160a",
            "category": 0,
            "description": "Help with My Product Requests",
            "message": "This includes any problems with requested or assigned products in current sessions. </p>",
            "showSubtypes": true,
            "__v": 0,
            "requestsRequired": true,
            "subtypes": [
                {
                    "inputForm": "<div class=' col-md-12' id='inputContainer'><div class='form-group'><input type='text' value.bind='helpTickets.selectedHelpTicketContent.content.curriculumTitle' class='form-control extend' id='curriculumTitle' placeholder='Curriculum Title'></div><div class='form-group'><input type='text' value.bind='helpTickets.selectedHelpTicketContent.content.curriculumVersion' class='form-control extend' id='curriculumVersion' placeholder='Version'></div><div class='form-group'><input type='text' value.bind='helpTickets.selectedHelpTicketContent.content.exerciseModule' class='form-control extend' id='exerciseModule' placeholder='Exercise/Module'></div><div class='form-group'><input type='text' value.bind='helpTickets.selectedHelpTicketContent.content.pageNumber' class='form-control extend' id='pageNumber' placeholder='Page Number'></div><div class='form-group'><input type='text' value.bind='helpTickets.selectedHelpTicketContent.content.userIDsaffected' class='form-control extend' id='userIDsaffected' placeholder='User IDs affected'></div></div>",
                    "outputForm": "<h5 class='topMargin'>Curriculum Title: ${helpTickets.selectedHelpTicket.content[0].content.curriculumTitle}</h5><h5>Version: ${helpTickets.selectedHelpTicket.content[0].content.curriculumVersion}</h5><h5>Exercise Module: ${helpTickets.selectedHelpTicket.content[0].content.exerciseModule}</h5><h5>Page: ${helpTickets.selectedHelpTicket.content[0].content.pageNumber}</h5><h5>User IDs: ${helpTickets.selectedHelpTicket.content[0].content.userIDsaffected}</h5><hr/>",
                    "type": "CURRICULUM_EXERCISES",
                    "description": "Issues with curriculum exercises",
                    "clientRequired": true,
                    "appsRequired": false,
                    "public": true,
                    "_id": "589f7654caaf40d0069d1612",
                    "validation": [
                        {
                            "rule": "required",
                            "control": "curriculumTitle",
                            "message": "Curriculum title is required",
                            "value": "helpTickets.selectedHelpTicketContent.content.curriculumTitle",
                            "_id": "589f7654caaf40d0069d1613"
                        }
                    ],
                    "documents": [
                    ],
                    "descriptionRequired": true,
                    "active": true
                },
                {
                    "type": "RESET_PASSWORDS",
                    "description": "Reset Passwords",
                    "clientRequired": true,
                    "appsRequired": false,
                    "public": true,
                    "inputForm": "<div class='col-lg-12' id='resetPassword'><label for='resetPasswordUserIDs'>You can enter a range of user IDs or a list separated by commas.</label><input id='resetPasswordUserIDs' value.bind='helpTickets.selectedHelpTicketContent.content.resetPasswordUserIDs' type='text' class='form-control extend' placeholder='User IDs'></div>",
                    "outputForm": "<h4 class='topMargin'>User Ids: ${helpTickets.selectedHelpTicket.content[0].content.resetPasswordUserIDs}</h4>",
                    "_id": "589f7654caaf40d0069d1610",
                    "validation": [
                        {
                            "rule": "required",
                            "control": "resetPasswordUserIDs",
                            "message": "The user IDs to reset are required",
                            "value": "helpTickets.selectedHelpTicketContent.content.resetPasswordUserIDs",
                            "_id": "589f7654caaf40d0069d1611"
                        }
                    ],
                    "documents": [
                    ],
                    "descriptionRequired": false,
                    "active": true
                },
                {
                    "type": "OTHER_LOGON",
                    "description": "Other logon or connection problems",
                    "clientRequired": true,
                    "appsRequired": false,
                    "public": true,
                    "inputForm": "",
                    "outputForm": "",
                    "_id": "589f7654caaf40d0069d160e",
                    "validation": [
                    ],
                    "documents": [
                    ],
                    "descriptionRequired": true,
                    "active": true
                },
                {
                    "type": "REFRESH_HEC",
                    "description": "Refresh an ERPSim client",
                    "requestKeywords": "ERPSIM",
                    "clientRequired": true,
                    "appsRequired": false,
                    "public": true,
                    "inputForm": "",
                    "outputForm": "",
                    "_id": "589f7654caaf40d0069d160d",
                    "validation": [
                    ],
                    "documents": [
                    ],
                    "descriptionRequired": false,
                    "active": true
                },
                {
                    "type": "PRODUCT_OTHER",
                    "description": "Other Product Issues",
                    "clientRequired": true,
                    "appsRequired": false,
                    "public": true,
                    "inputForm": "",
                    "outputForm": "",
                    "_id": "589f7654caaf40d0069d160b",
                    "validation": [
                    ],
                    "documents": [
                    ],
                    "descriptionRequired": true,
                    "active": true
                }
            ]
        },
        {
            "_id": "589f79a8caaf40d0069d1614",
            "category": 1,
            "description": "Desktop Application Help",
            "message": "This includes applications other than those hosted at the UCC.  Select the product from the drop down list and provide as much information about the error as possible.<br><br><p>If possible upload screen shots that show the problem.</p>",
            "showSubtypes": false,
            "__v": 0,
            "requestsRequired": false,
            "subtypes": [
                {
                    "type": "APPLICATION_ERROR",
                    "description": "Application or Installation problems",
                    "clientRequired": false,
                    "appsRequired": true,
                    "inputForm": "    <div class='col-md-12' id='appHelp'>\n        <div class='col-lg-12'>\n            <div class='topMargin form-group'>\n                <label class='control-label'>Application</label>\n                <select value.bind='helpTickets.selectedHelpTicketContent.content.applicationId' id='applicationId'\n                    class='form-control'>\n                    <option value=''>Select an application</option>\n                    <option repeat.for='app of appsArray' value.bind='app._id'>${app.name}</option>\n                </select>\n            </div>\n        </div>\n        <div class='col-lg-12'>\n            <div class='topMargin form-group'>\n                <label class='control-label'>Describe the Operating System</label>\n                <div class='panel panel-default'>\n                    <div class='panel-body'>\n                        <div class='row'>\n                            <div class='col-lg-6'>\n                                <span id='osWindows'>\n                                    <i click.trigger='toggleField($event)' show.bind='helpTickets.selectedHelpTicketContent.content.osWindows'\n                                        class='fa fa-check-square-o'></i>\n                                    <i click.trigger='toggleField($event)' show.bind='!helpTickets.selectedHelpTicketContent.content.osWindows'\n                                        class='fa fa-square-o'></i>\n                                </span> Windows\n\n                                <input show.bind='helpTickets.selectedHelpTicketContent.content.osWindows' value.bind='helpTickets.selectedHelpTicketContent.content.windowsVersion'\n                                    id='windowsVersion' class='form-control extend topMargin' placeholder='Windows 8, 8.1, 10, etc.'\n                                    type='text' />\n\n                                <div class='row topMargin' show.bind='helpTickets.selectedHelpTicketContent.content.osWindows'>\n                                    <span class='leftMargin ' id='osWindows32bit'>\n                                        <i click.trigger='toggleField($event)' show.bind='helpTickets.selectedHelpTicketContent.content.osWindows32bit'\n                                            class='fa fa-check-square-o'></i>\n                                        <i click.trigger='toggleField($event)' show.bind='!helpTickets.selectedHelpTicketContent.content.osWindows32bit'\n                                            class='fa fa-square-o'></i>\n                                    </span> 32-bit\n                                    <span class='leftMargin ' id='osWindows64bit'>\n                                        <i click.trigger='toggleField($event)' show.bind='helpTickets.selectedHelpTicketContent.content.osWindows64bit'\n                                            class='fa fa-check-square-o'></i>\n                                        <i click.trigger='toggleField($event)' show.bind='!helpTickets.selectedHelpTicketContent.content.osWindows64bit'\n                                            class='fa fa-square-o'></i>\n                                    </span> 64-bit\n\n                                </div>\n                            </div>\n                            <div class='col-lg-6'>\n                                <span class='leftMargin topMargin' id='osMac'>\n                                    <i click.trigger='toggleField($event)' show.bind='helpTickets.selectedHelpTicketContent.content.osMac'\n                                        class='fa fa-check-square-o'></i>\n                                    <i click.trigger='toggleField($event)' show.bind='!helpTickets.selectedHelpTicketContent.content.osMac'\n                                        class='fa fa-square-o'></i>\n                                </span> Mac OS\n\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class='col-lg-12'>\n        <div class='topMargin col-lg-6 form-group '><label class='control-label'>Other Software Involved</label>\n            <div class='panel panel-default'>\n                <div class='panel-body'>\n                    <div class='col-lg-12'>\n                        <div class='col-lg-8'>\n                            <span class='topMargin' id='officeInvolved'>\n                                <i click.trigger='toggleField($event)' show.bind='helpTickets.selectedHelpTicketContent.content.officeInvolved'\n                                    class='fa fa-check-square-o'></i>\n                                <i click.trigger='toggleField($event)' show.bind='!helpTickets.selectedHelpTicketContent.content.officeInvolved'\n                                    class='fa fa-square-o'></i>\n                            </span> Is Microsoft Office involved?\n                            <input show.bind='helpTickets.selectedHelpTicketContent.content.officeInvolved' value.bind='helpTickets.selectedHelpTicketContent.content.officeVersion'\n                                id='officeVersion' class='form-control extend topMargin' placeholder='2007, 2010, 2013, etc.'\n                                type='text' />\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class='topMargin col-lg-6 form-group'><label class='control-label'>Describe the Network\n                Connection</label>\n            <div class='panel panel-default'>\n                <div class='panel-body'>\n                    <div class='row'>\n                        <span class='leftMargin topMargin' id='wiredNetwork'>\n                            <i click.trigger='toggleField($event)' show.bind='helpTickets.selectedHelpTicketContent.content.wiredNetwork'\n                                class='fa fa-check-square-o'></i>\n                            <i click.trigger='toggleField($event)' show.bind='!helpTickets.selectedHelpTicketContent.content.wiredNetwork'\n                                class='fa fa-square-o'></i>\n                        </span> Wired\n                        <span class='leftMargin topMargin' id='wirelessNetwork'>\n                            <i click.trigger='toggleField($event)' show.bind='helpTickets.selectedHelpTicketContent.content.wirelessNetwork'\n                                class='fa fa-check-square-o'></i>\n                            <i click.trigger='toggleField($event)' show.bind='!helpTickets.selectedHelpTicketContent.content.wirelessNetwork'\n                                class='fa fa-square-o'></i>\n                        </span> Wired\n                    </div>\n                    <div class='row topMargin'>\n                        <span class='leftMargin topMargin' id='campusNetwork'>\n                            <i click.trigger='toggleField($event)' show.bind='helpTickets.selectedHelpTicketContent.content.campusNetwork'\n                                class='fa fa-check-square-o'></i>\n                            <i click.trigger='toggleField($event)' show.bind='!helpTickets.selectedHelpTicketContent.content.campusNetwork'\n                                class='fa fa-square-o'></i>\n                        </span> Campus\n                        <span class='leftMargin topMargin' id='personalNetwork'>\n                            <i click.trigger='toggleField($event)' show.bind='helpTickets.selectedHelpTicketContent.content.personalNetwork'\n                                class='fa fa-check-square-o'></i>\n                            <i click.trigger='toggleField($event)' show.bind='!helpTickets.selectedHelpTicketContent.content.personalNetwork'\n                                class='fa fa-square-o'></i>\n                        </span> Personal/Private Network\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    </div>",
                    "outputForm": "<h4 class='topMargin'>Application: ${helpTickets.selectedHelpTicket.content[0].content.applicationId | lookupValue:apps.appDownloadsArray:\"_id\":\"name\"}</h4><div show.bind='helpTickets.selectedHelpTicket.content[0].content.osWindows || helpTickets.selectedHelpTicket.content[0].content.osMac'><h4 class='topMargin'>Operating System</h4><label show.bind='helpTickets.selectedHelpTicket.content[0].content.osWindows' class='smallMarginRight' >Windows versions: ${helpTickets.selectedHelpTicket.content[0].content.windowsVersion}</label><label class='smallMarginRight' show.bind='helpTickets.selectedHelpTicket.content[0].content.osWindows32bit'> 32-bit</label><label class='smallMarginRight' show.bind='helpTickets.selectedHelpTicket.content[0].content.osWindows64bit'> 64-bit</label><label show.bind='helpTickets.selectedHelpTicket.content[0].content.osMac'>Mac versions: ${helpTickets.selectedHelpTicket.content[0].content.macVersion}</label></div><div show.bind='helpTickets.selectedHelpTicket.content[0].content.officeInvolved'><h4 class='topMargin'>Microsoft Office</h4><label show.bind='officeVersion'>Office versions: ${officeVersion}</label></div><div show.bind='helpTickets.selectedHelpTicket.content[0].content.wiredNetwork || helpTickets.selectedHelpTicket.content[0].content.wirelessNetwork || helpTickets.selectedHelpTicket.content[0].content.campusNetwork || helpTickets.selectedHelpTicket.content[0].content.personalNetwork'><h4 class='topMargin'>Network</h4><label class='smallMarginRight' show.bind='helpTickets.selectedHelpTicket.content[0].content.wiredNetwork'>Wired</label><label class='smallMarginRight' show.bind='helpTickets.selectedHelpTicket.content[0].content.wirelessNetwork'> Wireless</label><label class='smallMarginRight' show.bind='helpTickets.selectedHelpTicket.content[0].content.campusNetwork'> Campus</label><label class='smallMarginRight' show.bind='helpTickets.selectedHelpTicket.content[0].content.personalNetwork'> Personal/Private Network</label></div>",
                    "public": false,
                    "_id": "589f79a8caaf40d0069d1617",
                    "validation": [
                        {
                            "rule": "required",
                            "control": "applicationId",
                            "message": "Choose an application",
                            "value": "helpTickets.selectedHelpTicketContent.content.applicationId",
                            "_id": "589f79a8caaf40d0069d1618"
                        }
                    ],
                    "documents": [
                        {
                            "fileName": "Homework 7 (1).docx - version 1",
                            "categoryName": "A New Document",
                            "categoryCode": 6,
                            "_id": "58de73019a03f1c038ffa3f5",
                            "default": true
                        }
                    ],
                    "descriptionRequired": true,
                    "active": true
                },
                {
                    "type": "LICENSE_KEYS",
                    "description": "License keys for analytics software",
                    "clientRequired": false,
                    "appsRequired": true,
                    "public": false,
                    "inputForm": "",
                    "outputForm": "",
                    "_id": "589f79a8caaf40d0069d1616",
                    "validation": [
                    ],
                    "documents": [
                    ],
                    "descriptionRequired": true,
                    "active": true
                },
                {
                    "type": "APPLICATION_OTHER",
                    "description": "Other issues with software",
                    "clientRequired": false,
                    "appsRequired": true,
                    "public": false,
                    "inputForm": "",
                    "outputForm": "",
                    "_id": "589f79a8caaf40d0069d1615",
                    "validation": [
                    ],
                    "documents": [
                    ],
                    "descriptionRequired": true,
                    "active": true
                }
            ]
        }
    ]
    

};

