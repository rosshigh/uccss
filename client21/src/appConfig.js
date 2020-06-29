export class AppConfig {

  // HOST = location.origin, 

  // DOWNLOAD_URL = this.HOST + '/uploadedFiles', 

  // BASE_URL = "http=//localhost/api/";
  // IMG_DOWNLOAD_URL = "http=//localhost/img/";

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
    {code: "01", description: "Active"},
    {code: "02", description: "Inactive"}
  ]

  PHONE_MASKS = [
    { country: 'US', mask: '999-999-9999' },
    { country: 'CA', mask: '999-999-9999' },
    { country: 'CANADA', mask: '999-999-9999' },
    { country: 'BR', mask: '99 99999 9999' },
    { country: 'CO', mask: '9999999999999' }
  ];

};

