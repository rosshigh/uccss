export class AppConfig {

  HOST = location.origin;

  DOWNLOAD_URL = this.HOST + '/uploadedFiles';
  DOCUMENT_FILE_DOWNLOAD_URL = this.HOST + '/uploadedFiles/documents'; 

  // BASE_URL = "http://localhost/api/";
  // IMG_DOWNLOAD_URL = "http://localhost/img/";

  BASE_URL = this.HOST + "/api/";
  IMG_DOWNLOAD_URL = this.HOST + '/img/';  


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
    { code: "02", description: "Inactive" }
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

  SANDBOX_ID = 'a1a1a1a1a1a1a1a1a1a1a1a1';      //Name used for sandbox requests
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
    { code: 'DOC', description: "Document"},
    { code: 'CUR', description: "Curriculum"},
    { code: 'SOF', description: "Software"},
    { code: 'HPT', description: "Help Tickets"},
    { code: 'USE', description: "Useful Info"}
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
        'description': 'Useful Information - Home Page'
    }
];

HELP_TICKET_PRIORITIES = [
  {
    priority: "Low", 
    message:"<p>I'm walking into class in 10 minutes, and eventhough I didn't test this beforehand, I don't want to embarrass myself in my students.</p><ul><li>I know I should have thought of it earlier</li><li>I won't ever do it again</li><li>I don't expect you to move heaven and earth when I was so remiss</li></ul><p>Okay, I'm sorry.</p>",
    status: "card-header-success"
  },
  {
    priority: "Medium", 
    message:"<p>I'm walking into class in 10 minutes, and eventhough I didn't test this beforehand, I don't want to embarrass myself in my students.</p><ul><li>I know I should have thought of it earlier</li><li>I won't ever do it again</li><li>I don't expect you to move heaven and earth when I was so remiss</li></ul><p>Okay, I'm sorry.</p>",
    status: "card-header-warning"
  },
  {
    priority: "Critical", 
    message:"<p>I'm walking into class in 10 minutes, and eventhough I didn't test this beforehand, I don't want to embarrass myself in my students.</p><ul><li>I know I should have thought of it earlier</li><li>I won't ever do it again</li><li>I don't expect you to move heaven and earth when I was so remiss</li></ul><p>Okay, I'm sorry.</p>",
    status: "card-header-danger"
  }];

HELP_TICKET_TYPES = [
  {
    "description":"Other",
    "message": "This includes issues that don't fall into other categories.",
    "requstsRequired": false,
    "subTypes": [
      {"type":"OTHER_OTHER","description":"Other general"},
      {"type":"OTHER_UCCSS","description":"UCCSS account issues"},
      {"type":"OTHER_GENERAL","description":"General curriculum/client questions"},
      {"type":"OTHER_UA","description":"UA Learning Hub & UA INformation"},
    ]
  },
  {
    "description":"Desktop Application Help",
    "message": "This includes issues with applications other than those osted by the UCC.",
    "requstsRequired": false,
    "subTypes": [
      {"type":"APPLICATION_ERROR","description":"Application or installation problems"},
      {"type":"LICENSE_KEYS","description":"License keys for analytics software"},
      {"type":"APPLICATION_OTHER","description":"Other issues with software"}
    ]
  },
  {
    "description":"Issues with curriculum exercises",
    "message": "This includes any problems with requested products, clients assigned by the UCC.",
    "requstsRequired": true,
    "subTypes": [
      {"type":"CURRICULUM_EXERCISES","description":"Issues with curriculum exercises"},
      {"type":"RESET_PASSWORDS","description":"Reset passwords"},
      {"type":"OTHER_LOGON","description":"Other logon or connection problems"},
      {"type":"REFRESH_HEC","description":"Refresh ERPSim client"},
      {"type":"PRODUCT_OTHER","description":"Other product issues"}
    ]
  }
]

ASSIGNED_REQUEST_CODE = 2;
UNASSIGNED_REQUEST_CODE = 1;
UPDATED_REQUEST_CODE = 3;
CUSTOMER_ACTION_REQUEST_CODE = 4;
CANCELLED_REQUEST_CODE = 5;
PROVISIONAL_REQUEST_CODE = 6;
REPLIED_REQUEST_CODE = 7;
RETIRED_REQUEST_CODE = 8;

REQUEST_STATUS = [{ code: this.UNASSIGNED_REQUEST_CODE, description: 'Unassigned', status: "" }, 
                  { code: this.ASSIGNED_REQUEST_CODE, description: 'Assigned', status: "assign"  }, 
                  { code: this.UPDATED_REQUEST_CODE, description: 'Updated', status: "success"  }, 
                  { code: this.CUSTOMER_ACTION_REQUEST_CODE, description: 'Customer Action', status: "warning"  },
                  { code: this.CANCELLED_REQUEST_CODE, description: 'Cancelled', status: ""  },
                  { code: this.PROVISIONAL_REQUEST_CODE, description: 'Provisional', status: ""  },
                  { code: this.REPLIED_REQUEST_CODE, description: 'Replied', status: "danger" },
                  { code: this.RETIRED_REQUEST_CODE, description: 'Retired', status: "danger" }];

};

