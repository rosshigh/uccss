"use strict";
(self["webpackChunkuccss_old_new"] = self["webpackChunkuccss_old_new"] || []).push([["app-efc01b10"],{

/***/ 6617:
/*!*************************************!*\
  !*** ./src/resources/data/admin.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdminData: function() { return /* binding */ AdminData; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _dataServices__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dataServices */ 5086);
var _dec, _class;


let AdminData = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_dataServices__WEBPACK_IMPORTED_MODULE_1__.DataServices), _dec(_class = class AdminData {
  constructor(data) {
    this.AUTH_SERVICE = "/adminLog/";
    this.LOG_SERVICE = "/log/";
    this.FILES_SERVICE = '/files/';
    this.FOREVER_SERVICE = '/pm2Log/';
    this.data = data;
  }
  async getLogs(type) {
    let url;
    switch (type) {
      case 'auth':
        url = this.AUTH_SERVICE;
        break;
      case 'log':
        url = this.LOG_SERVICE;
        break;
      case 'forl':
        url = this.FOREVER_SERVICE + 'fileList/out';
        break;
      case 'fore':
        url = this.FOREVER_SERVICE + 'fileList/err';
        break;
      // case 'foro':
      // 	url = this.FOREVER_SERVICE + 'fileList/o';
      // 	break;
    }

    let response = await this.data.get(url);
    if (!response.error) {
      this.logFileArray = response;
    }
    return response;
  }
  async getLogFile(fileName, type) {
    if (fileName && type) {
      let url;
      switch (type) {
        case 'auth':
          url = this.AUTH_SERVICE;
          break;
        case 'log':
          url = this.LOG_SERVICE;
          break;
        case 'forl':
        case 'fore':
        case 'foreo':
          url = this.FOREVER_SERVICE;
      }
      let response = await this.data.get(url + fileName);
      if (!response.error) {
        this.logContents = response;
      }
      return response;
    }
  }

  // async getAuthLogs(){
  // 	let response = await this.data.get(this.AUTH_SERVICE);
  // 	if(!response.error){
  // 		this.authLogFileArray = response;
  // 	} 
  // 	return response;
  // }

  async getAuthLogFile(fileName) {
    if (fileName) {
      let response = await this.data.get(this.AUTH_SERVICE + fileName);
      if (!response.error) {
        this.authLogContents = response;
      }
      return response;
    }
  }
  async deleteAuthFiles(filesToDelete) {
    let obj = {
      files: filesToDelete
    };
    let response = await this.data.saveObject(obj, this.AUTH_SERVICE, "put");
    return response;
  }

  // async getLogs(){
  // 	let response = await this.data.get(this.LOG_SERVICE);
  // 	if(!response.error){
  // 		this.authLogFileArray = response;
  // 	} 
  // 	return response;
  // }

  // async getLogFile(fileName){
  // 	if(fileName){
  // 		let response = await this.data.get(this.LOG_SERVICE + fileName);
  // 		if(!response.error){
  // 			this.logContents = response;
  // 		}
  // 		return response;
  // 	}
  // }

  async deleteLogFiles(filesToDelete) {
    let obj = {
      files: filesToDelete
    };
    let response = await this.data.saveObject(obj, this.LOG_SERVICE, "put");
    return response;
  }
  async getFiles() {
    let response = await this.data.get(this.FILES_SERVICE);
    if (!response.error) {
      this.parseFileList(response);
    }
    return response;
  }
  parseFileList(response) {
    this.files = response;
    this.filesList = {
      name: "Uploaded Files",
      value: "root",
      file: false,
      children: new Array()
    };
    this.files.forEach(item => {
      let parts = item.split('\\');
      let index = this.categoryIndex(parts[2]);
      if (index === -1) {
        this.filesList.children.push({
          name: parts[2],
          value: parts[2],
          file: false,
          children: []
        });
      }
    });
    for (let index = 0; index < this.files.length; index++) {
      let parts = this.files[index].split('\\');
      let fileListindex = this.categoryIndex(parts[2]);
      if (parts.length === 4) {
        index = this.processShallowTree(fileListindex, index);
      } else {
        index = this.processDeepTree(fileListindex, index);
      }
    }
  }
  processShallowTree(fileListindex, index) {
    var parts = this.files[index].split('\\');
    var thisCategory = parts[2];
    var fileName = parts[3];
    do {
      this.filesList.children[fileListindex].children.push({
        name: fileName,
        value: thisCategory + '-' + fileName,
        file: true,
        path: this.files[index]
      });
      index++;
      parts = this.files[index].split('\\');
      fileName = parts[3];
    } while (thisCategory === parts[2]);
    return --index;
  }
  processDeepTree(fileListindex, index) {
    var parts = this.files[index].split('\\');
    var thisCategory = parts[2];
    var thisSubCategory = parts[3];
    var fileName = parts[4];
    this.filesList.children[fileListindex].children.push({
      name: thisSubCategory,
      value: thisCategory + '-' + thisSubCategory,
      file: false,
      children: [{
        name: fileName,
        value: thisSubCategory + '-' + fileName,
        file: true,
        path: this.files[index]
      }]
    });
    index++;
    if (index < this.files.length) {
      parts = this.files[index].split('\\');
      var childIndex = this.filesList.children[fileListindex].children.length - 1;
      while (thisSubCategory === parts[3]) {
        fileName = parts[4];
        this.filesList.children[fileListindex].children[childIndex].children.push({
          name: fileName,
          value: thisSubCategory + '-' + fileName,
          file: true,
          path: this.files[index]
        });
        index++;
        if (index < this.files.length) {
          parts = this.files[index].split('\\');
        } else {
          break;
        }
      }
    }
    return --index;
  }
  categoryIndex(category) {
    for (let i = 0; i < this.filesList.children.length; i++) {
      if (this.filesList.children[i].name === category) return i;
    }
    return -1;
  }
  async deleteFile(file) {
    if (file) {
      file = file.split('\\').join('$@');
      let response = await this.data.deleteObject(this.FILES_SERVICE + "/" + file);
      return response;
    }
  }
  async renameALogFile(oldFile, newFile) {
    if (oldFile && newFile) {
      oldFile = oldFile.split('\\').join('$@');
      newFile = newFile.split('\\').join('$@');
      let response = await this.data.saveObject({}, this.FOREVER_SERVICE + "/rename/" + oldFile + "/" + newFile, "put");
      return response;
    }
  }
}) || _class);

/***/ }),

/***/ 3444:
/*!*************************************************!*\
  !*** ./src/resources/data/apjClientRequests.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   APJClientRequests: function() { return /* binding */ APJClientRequests; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _dataServices__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dataServices */ 5086);
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/utils */ 8741);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
var _dec, _class;




let APJClientRequests = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_dataServices__WEBPACK_IMPORTED_MODULE_1__.DataServices, _utils_utils__WEBPACK_IMPORTED_MODULE_2__.Utils, _config_appConfig__WEBPACK_IMPORTED_MODULE_3__.AppConfig), _dec(_class = class APJClientRequests {
  constructor(data, utils, config) {
    this.CLIENT_REQUESTS_SERVICES = 'apj/clientRequests';
    this.CLIENT_REQUEST_DETAILS = 'apj/clientRequestsDetails';
    this.CUSTOMER_ACTION = 'clientRequests/customerAction';
    this.CLIENT_REQUEST_EMAIL = "clientRequests/sendMail";
    this.INVOICE_DATA = "apj/invoicedata";
    this.INVOICES_SERVICE = 'apj/invoices';
    this.data = data;
    this.utils = utils;
    this.config = config;
  }
  async getClientRequestsDetailsArray(options, refresh) {
    if (!this.requestsArray || refresh) {
      var url = this.CLIENT_REQUEST_DETAILS;
      url += options ? options : "";
      try {
        let serverResponse = await this.data.get(url);
        if (!serverResponse.error) {
          this.requestsDetailsArray = serverResponse;
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  async getAPJInstitutionRequests(options, refresh) {
    if (!this.apjInstitutionRequestArray || refresh) {
      var url = this.CLIENT_REQUESTS_SERVICES;
      url += options ? options : "";
      let response = await this.data.get(url);
      if (!response.error) {
        this.apjInstitutionRequestArray = response;
      } else {
        this.apjInstitutionRequestArray = undefined;
      }
    }
  }
  async getRequestDetail(id) {
    let serverResponse = await this.data.get(this.CLIENT_REQUEST_DETAILS + "/" + id);
    if (!serverResponse.error) {
      this.selectedRequestDetail = serverResponse;
    } else {
      this.selectedRequestDetail = null;
    }
    return serverResponse;
  }
  selectRequest(index) {
    if (index === undefined) {
      this.selectedRequest = this.emptyRequest();
    } else {
      try {
        this.selectedRequest = this.utils.copyObject(this.apjInstitutionRequestArray[index]);
        this.editRequestIndex = index;
      } catch (error) {
        console.log(error);
        this.selectedRequest = this.emptyRequest();
      }
    }
  }
  emptyRequest() {
    var newObj = new Object();
    ;
    newObj.requestStatus = this.config.UNASSIGNED_REQUEST_CODE;
    newObj.startDate = "";
    newObj.endDate = "";
    newObj.comments = "";
    newObj.requestDetails = new Array();
    newObj.audit = new Array();
    newObj.audit.push({
      event: 'Created',
      eventDate: new Date(),
      personId: ""
    });
    return newObj;
  }
  setTheSelectedRequestDetail(request) {
    this.selectedRequestDetail = this.utils.copyObject(request);
    if (this.requestsDetailsArray) {
      for (let i = 0; i < this.requestsDetailsArray.length; i++) {
        if (this.requestsDetailsArray[i]._id === request._id) {
          this.requestDetailIndex = i;
          break;
        }
      }
    }
  }
  emptyRequestDetail() {
    var newObj = new Object();
    ;
    newObj.createdDate = new Date();
    newObj.modifiedDate = new Date();
    newObj.requestStatus = this.config.UNASSIGNED_REQUEST_CODE;
    return newObj;
  }
  async saveRequestDetail() {
    if (!this.selectedRequestDetail) {
      return;
    }
    let response = await this.data.saveObject(this.selectedRequestDetail, this.CLIENT_REQUEST_DETAILS, "put");
    if (!response.error) {
      this.selectedRequestDetail = response;
      this.requestsDetailsArray[this.requestDetailIndex] = this.utils.copyObject(this.selectedRequestDetail);
      return response;
    }
  }
  setSelectedRequest(request) {
    this.selectedRequest = this.utils.copyObject(request);
  }
  async assignRequest(index) {
    if (!this.selectedRequest) {
      return;
    }
    var url = this.CLIENT_REQUESTS_SERVICES + '/assign';
    var serverResponse = await this.data.saveObject(this.selectedRequest, url, "put");
    if (!serverResponse.error) {
      this.selectedRequestDetail = serverResponse;
      // if(!this.selectedRequestDetail.requestId.courseId || this.selectedRequestDetail.requestId.courseId === null){
      //   this.selectedRequestDetail.requestId.courseId = {_id: this.config.SANDBOX_ID, name: this.config.SANDBOX_NAME};
      // }
      this.requestsDetailsArray[index] = this.utils.copyObject(this.selectedRequestDetail);
    }
    return serverResponse;
  }
  async saveRequest() {
    if (!this.selectedRequest) {
      return;
    }
    var url = this.CLIENT_REQUESTS_SERVICES;
    if (!this.selectedRequest._id) {
      let serverResponse = await this.data.saveObject(this.selectedRequest, url, "post");
      if (!serverResponse.error) {
        if (this.requestsArray) {
          this.requestsArray.push(this.selectedRequest);
        }
      }
      return serverResponse;
    } else {
      var serverResponse = await this.data.saveObject(this.selectedRequest, url, "put");
      if (!serverResponse.error) {
        if (this.requestsArray && this.editRequestIndex) {
          this.requestsArray[this.editRequestIndex] = this.utils.copyObject(this.selectedRequest);
        }
      }
      return serverResponse;
    }
  }
  async saveRequestWithId() {
    if (!this.selectedRequest) {
      return;
    }
    var serverResponse = await this.data.saveObject(this.selectedRequest, this.CLIENT_REQUESTS_SERVICES + "/" + this.selectedRequest._id, "put");
    if (!serverResponse.error) {
      if (this.requestsArray && this.editRequestIndex) {
        this.requestsArray[this.editRequestIndex] = this.utils.copyObject(this.selectedRequest);
      }
    }
    return serverResponse;
  }
  async getInvoiceDataArray(options, refresh) {
    if (!this.invoiceDataArray || refresh) {
      var url = this.INVOICE_DATA;
      url += options ? options : "";
      try {
        let serverResponse = await this.data.get(url);
        if (!serverResponse.error) {
          this.invoiceDataArray = serverResponse;
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  async getInvoices(options) {
    var url = this.INVOICES_SERVICE;
    url += options ? options : "";
    try {
      let serverResponse = await this.data.get(url);
      if (!serverResponse.error) {
        this.invoicesArray = serverResponse;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async saveInvoice(invoiceToSave) {
    if (!invoiceToSave) {
      return;
    }
    let response = await this.data.saveObject(invoiceToSave, this.INVOICES_SERVICE, "post");
    if (!response.error) {
      return response;
    }
  }
  async createPDF(object) {
    let url = 'apj/invoices/createPDF';
    // let object = {page: html};
    let serverResponse = await this.data.saveObject(object, url, "post");
    return serverResponse;
    // http://localhost/api/apj/invoices/createPDF
  }
}) || _class);

/***/ }),

/***/ 5849:
/*!************************************!*\
  !*** ./src/resources/data/auth.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Auth: function() { return /* binding */ Auth; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var aurelia_event_aggregator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-event-aggregator */ "aurelia-event-aggregator");
/* harmony import */ var _dataServices__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dataServices */ 5086);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
var _dec, _class;




let Auth = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(aurelia_event_aggregator__WEBPACK_IMPORTED_MODULE_1__.EventAggregator, _dataServices__WEBPACK_IMPORTED_MODULE_2__.DataServices, _config_appConfig__WEBPACK_IMPORTED_MODULE_3__.AppConfig), _dec(_class = class Auth {
  constructor(eventAggregator, data, config) {
    this.loginUrl = 'users/login';
    this.logoutUrl = 'users/logout';
    this.eventAggregator = eventAggregator;
    this.data = data;
    this.config = config;
  }
  async login(email, password) {
    let content = {
      'email': email,
      'password': password
    };
    let response = await this.data.login(content, this.loginUrl);
    if (!response.error) {
      response.user.userRole = this.setRole(response.user.roles);
      sessionStorage.setItem('token', response.token);
      sessionStorage.setItem('user', JSON.stringify(response.user));
      this.config.token = response.token;
      this.config.user = response.user;
    }
    this.eventAggregator.publish('auth:login', response);
    return response;
  }
  logout(email) {
    this.data.saveObject({
      email: email
    }, this.logoutUrl, 'post');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('alert');
  }
  isAuthenticated() {
    let token = sessionStorage.getItem('token');

    // There's no token, so user is not authenticated.
    if (!token) {
      return false;
    }

    // There is a token, but in a different format. Return true.
    if (token.split('.').length !== 3) {
      return true;
    }
    let exp;
    try {
      let base64Url = token.split('.')[1];
      let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      exp = JSON.parse(window.atob(base64)).exp;
    } catch (error) {
      return false;
    }
    if (exp) {
      return Math.round(new Date().getTime() / 1000) <= exp;
    }
    return true;
  }

  /*****************************************************************************
  * Determine users role for authorizations
  ****************************************************************************/
  setRole(roles) {
    let userRole = 1;
    for (let i = 0; i < roles.length; i++) {
      this.config.ROLES.forEach(item => {
        if (roles[i] == item.role) {
          userRole = item.authLevel > userRole ? item.authLevel : userRole;
        }
      });
    }
    return userRole;
  }
}) || _class);

/***/ }),

/***/ 5446:
/*!**********************************************!*\
  !*** ./src/resources/data/clientRequests.js ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ClientRequests: function() { return /* binding */ ClientRequests; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _dataServices__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dataServices */ 5086);
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/utils */ 8741);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
var _dec, _class;




let ClientRequests = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_dataServices__WEBPACK_IMPORTED_MODULE_1__.DataServices, _utils_utils__WEBPACK_IMPORTED_MODULE_2__.Utils, _config_appConfig__WEBPACK_IMPORTED_MODULE_3__.AppConfig), _dec(_class = class ClientRequests {
  constructor(data, utils, config) {
    this.CLIENT_REQUESTS_SERVICES = 'clientRequests';
    this.CLIENT_REQUEST_DETAILS = 'clientRequestsDetails';
    this.CLIENT_REQUEST_LOCK_SERVICES = 'clientRequestLocks';
    this.CUSTOMER_ACTION = 'clientRequests/customerAction';
    this.CLIENT_REQUEST_EMAIL = "clientRequests/sendMail";
    this.data = data;
    this.utils = utils;
    this.config = config;
  }
  async getClientRequestsArray(options, refresh) {
    if (!this.requestsArray || refresh) {
      var url = this.CLIENT_REQUESTS_SERVICES;
      url += options ? options : "";
      try {
        let serverResponse = await this.data.get(url);
        if (!serverResponse.error) {
          this.requestsArray = serverResponse;
        } else {
          this.data.processError(serverResponse);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  async getActiveClientRequestsArray(personId, sessions) {
    var url = this.CLIENT_REQUESTS_SERVICES;
    url += "/" + personId + "/" + sessions;
    try {
      let serverResponse = await this.data.get(url);
      if (!serverResponse.error) {
        this.requestsArray = serverResponse;
      } else {
        this.requestsArray = new Array();
      }
    } catch (error) {
      console.log(error);
    }
  }
  async getRequest(id) {
    try {
      let serverResponse = await this.data.get(this.CLIENT_REQUESTS_SERVICES + "/" + id);
      if (!serverResponse.error) {
        this.selectedRequest = serverResponse;
      } else {
        this.selectedRequest = null;
      }
    } catch (error) {
      console.log(error);
    }
  }
  selectRequest(index) {
    if (index === undefined) {
      this.selectedRequest = this.emptyRequest();
    } else {
      try {
        this.selectedRequest = this.utils.copyObject(this.requestsArray[index]);
        this.editRequestIndex = index;
      } catch (error) {
        console.log(error);
        this.selectedRequest = this.emptyRequest();
      }
    }
  }
  selectRequstById(id) {
    this.selectedRequest = null;
    for (var i = 0; i < this.requestsArray.length; i++) {
      if (this.requestsArray[i]._id === id) {
        this.selectedRequest = this.utils.copyObject(this.requestsArray[i]);
        this.editRequestIndex = i;
        break;
      }
    }
  }
  setSelectedRequest(request) {
    this.selectedRequest = this.utils.copyObject(request);
  }
  emptyRequest() {
    var newObj = new Object();
    ;
    newObj.requestStatus = this.config.UNASSIGNED_REQUEST_CODE;
    newObj.undergradIds = 0;
    newObj.graduateIds = 0;
    newObj.startDate = "";
    newObj.endDate = "";
    newObj.addUndergraduates = 0;
    newObj.addGraduates = 0;
    newObj.comments = "";
    newObj.requestDetails = new Array();
    newObj.audit = new Array();
    newObj.audit.push({
      event: 'Created',
      eventDate: new Date(),
      personId: ""
    });
    return newObj;
  }
  async getCurrentCount(options) {
    var url = this.CLIENT_REQUESTS_SERVICES + '/current/count';
    url += options ? options : "";
    var response = await this.data.get(url);
    if (!response.error) {
      this.unassignedRequests = this.utils.countItems(this.config.UNASSIGNED_REQUEST_CODE, 'requestStatus', response);
      this.updatedRequests = this.utils.countItems(this.config.UPDATED_REQUEST_CODE, 'requestStatus', response);
      this.customerActionRequests = this.utils.countItems(this.config.CUSTOMER_ACTION_REQUEST_CODE, 'requestStatus', response);
      return response.count;
    } else {
      return null;
    }
  }
  async getClientRequestsDetailsArray(options, refresh) {
    if (!this.requestsArray || refresh) {
      var url = this.CLIENT_REQUEST_DETAILS;
      url += options ? options : "";
      try {
        let serverResponse = await this.data.get(url);
        if (!serverResponse.error) {
          this.requestsDetailsArray = serverResponse;
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  async getClientRequestsDetailsArrayAnalytics(options, refresh) {
    if (!this.requestsArray || refresh) {
      var url = this.CLIENT_REQUEST_DETAILS + "/analytics";
      url += options ? options : "";
      try {
        let serverResponse = await this.data.get(url);
        if (!serverResponse.error) {
          this.requestsDetailsArrayAnalytics = serverResponse;
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  async getClientRequestsDetailFaccoArray(sessionId, institutionId, refresh) {
    if (!this.requestsDetailsArray || !this.requestsDetailsArray.length || refresh) {
      let serverResponse = await this.data.get(this.CLIENT_REQUEST_DETAILS + '/' + sessionId + '/' + institutionId);
      if (!serverResponse.error) {
        this.requestsDetailsArray = serverResponse;
      } else {
        return undefined;
      }
    }
  }
  async saveRequestWithId() {
    if (!this.selectedRequest) {
      return;
    }
    var serverResponse = await this.data.saveObject(this.selectedRequest, this.CLIENT_REQUESTS_SERVICES + "/" + this.selectedRequest._id, "put");
    if (!serverResponse.error) {
      if (this.requestsArray && this.editRequestIndex) {
        this.requestsArray[this.editRequestIndex] = this.utils.copyObject(this.selectedRequest);
      }
    }
    return serverResponse;
  }
  async saveRequest(email) {
    if (!this.selectedRequest) {
      return;
    }
    var url = this.CLIENT_REQUESTS_SERVICES;
    if (!this.selectedRequest._id) {
      let serverResponse = await this.data.saveObject(this.selectedRequest, url, "post");
      if (!serverResponse.error) {
        if (email.email) {
          email.clientRequestNo = serverResponse.clientRequestNo;
          email.reason = 1;
          this.data.saveObject(email, this.CLIENT_REQUEST_EMAIL, "post");
        }
        if (this.requestsArray) {
          this.requestsArray.push(this.selectedRequest);
        }
      }
      return serverResponse;
    } else {
      var serverResponse = await this.data.saveObject(this.selectedRequest, url, "put");
      if (!serverResponse.error) {
        if (email.email) {
          email.requestNo = this.selectedRequest.requestNo;
          email.reason = 2;
          this.data.saveObject(email, this.CLIENT_REQUEST_EMAIL, "post");
        }
        if (this.requestsArray && this.editRequestIndex) {
          this.requestsArray[this.editRequestIndex] = this.utils.copyObject(this.selectedRequest);
        }
      }
      return serverResponse;
    }
  }
  async deleteAssignment(index) {
    if (!this.selectedRequest) {
      return;
    }
    var url = this.CLIENT_REQUESTS_SERVICES + "/deleteAssignment";
    var serverResponse = await this.data.saveObject(this.selectedRequest, url, "put");
    if (!serverResponse.error) {
      this.selectedRequestDetail = serverResponse;
      if (!this.selectedRequestDetail.requestId.courseId || this.selectedRequestDetail.requestId.courseId === null) {
        this.selectedRequestDetail.requestId.courseId = {
          _id: this.config.SANDBOX_ID,
          name: this.config.SANDBOX_NAME
        };
      }
      this.requestsDetailsArray[index] = this.utils.copyObject(this.selectedRequestDetail);
    }
    return serverResponse;
  }
  updateStatuses(updateIds, status) {
    for (let i = 0; i < this.requestsDetailsArray.length; i++) {
      if (updateIds.indexOf(this.requestsDetailsArray[i]._id) > -1) {
        this.requestsDetailsArray[i].requestStatus = status;
        this.requestsDetailsArray[i].requestId.requestStatus = status;
      }
    }
  }
  async assignRequest(index, email) {
    if (!this.selectedRequest) {
      return;
    }
    var url = email ? this.CLIENT_REQUESTS_SERVICES + '/assign/?email=1' : this.CLIENT_REQUESTS_SERVICES + '/assign';
    var serverResponse = await this.data.saveObject(this.selectedRequest, url, "put");
    if (!serverResponse.error) {
      if (email && email.email) {
        this.data.saveObject(email, this.CLIENT_REQUEST_EMAIL, "post");
      }
      this.selectedRequestDetail = serverResponse;
      if (!this.selectedRequestDetail.requestId.courseId || this.selectedRequestDetail.requestId.courseId === null) {
        this.selectedRequestDetail.requestId.courseId = {
          _id: this.config.SANDBOX_ID,
          name: this.config.SANDBOX_NAME
        };
      }
      this.requestsDetailsArray[index] = this.utils.copyObject(this.selectedRequestDetail);
    }
    return serverResponse;
  }
  async deleteRequest() {
    if (!this.selectedRequestDetail._id) {
      return;
    }
    if (this.selectedRequestDetail.requestId) {
      let serverResponse = await this.data.deleteObject(this.CLIENT_REQUEST_DETAILS + '/' + this.selectedRequestDetail._id + '/' + this.selectedRequestDetail.requestId._id);
      if (!serverResponse.error) {
        this.requestsDetailsArray.splice(this.requestDetailIndex, 1);
        return serverResponse;
      } else {
        return undefined;
      }
    } else {
      let serverResponse = await this.data.deleteObject(this.CLIENT_REQUEST_DETAILS + '/' + this.selectedRequestDetail._id);
      if (!serverResponse.error) {
        this.requestsDetailsArray.splice(this.requestDetailIndex, 1);
        return serverResponse;
      } else {
        return undefined;
      }
    }
  }
  isRequestDirty(obj, skip) {
    if (this.selectedRequest) {
      if (!obj) {
        var obj = this.emptyRequest();
      }
      if (!skip) skip = new Array();
      skip.push('audit');
      return this.utils.objectsEqual(this.selectedRequest, obj, skip);
    }
    return new Array();
  }
  selectRequestDetail(index) {
    if (index === undefined || index > this.requestsDetailsArray.length - 1) {
      this.emptyRequestDetail();
    } else {
      this.selectedRequestDetail = this.requestsDetailsArray[index];
      this.requestDetailIndex = index;
    }
    return this.selectedRequestDetail;
  }
  async getRequestDetail(id) {
    let serverResponse = await this.data.get(this.CLIENT_REQUEST_DETAILS + "/" + id);
    if (!serverResponse.error) {
      this.selectedRequestDetail = serverResponse;
    } else {
      this.selectedRequestDetail = null;
    }
    return serverResponse;
  }
  selectRequestDetailFromId(id) {
    this.requestsDetailsArray.forEach((item, index) => {
      if (item._id === id) {
        this.selectedRequestDetail = this.utils.copyObject(item);
        this.requestDetailIndex = index;
        return;
      }
    });
    return null;
  }
  setTheSelectedRequestDetail(request) {
    this.selectedRequestDetail = this.utils.copyObject(request);
    if (this.requestsDetailsArray) {
      for (let i = 0; i < this.requestsDetailsArray.length; i++) {
        if (this.requestsDetailsArray[i]._id === request._id) {
          this.requestDetailIndex = i;
          break;
        }
      }
    }
  }
  emptyRequestDetail() {
    var newObj = new Object();
    ;
    newObj.createdDate = new Date();
    newObj.modifiedDate = new Date();
    newObj.requestStatus = this.config.UNASSIGNED_REQUEST_CODE;
    return newObj;
  }
  async saveRequestDetail() {
    if (!this.selectedRequestDetail) {
      return;
    }
    let response = await this.data.saveObject(this.selectedRequestDetail, this.CLIENT_REQUEST_DETAILS, "put");
    if (!response.error) {
      this.selectedRequestDetail = response;
      if (!this.selectedRequestDetail.requestId.courseId || this.selectedRequestDetail.requestId.courseId === null) {
        this.selectedRequestDetail.requestId.courseId = {
          _id: this.config.SANDBOX_ID,
          name: this.config.SANDBOX_NAME
        };
      }
      this.requestsDetailsArray[this.requestDetailIndex] = this.utils.copyObject(this.selectedRequestDetail);
      return response;
    }
  }
  isRequestDetailDirty(obj, skip) {
    if (this.selectedRequestDetail) {
      if (!obj) {
        var obj = this.emptyRequestDetail();
      }
      var skip = skip ? skip : new Array();
      skip.push('audit');
      return this.utils.objectsEqual(this.selectedRequestDetail, obj, skip);
    }
    return new Array();
  }
  async getClientRequest(id) {
    let serverResponse = await this.data.get(this.CLIENT_REQUEST_DETAILS + '/' + id);
    if (!serverResponse.error) {
      this.selectedRequest = serverResponse;
    }
    return serverResponse;
  }
  async getSessionCount(sessionArray, numSessions, options, requestStatus) {
    var url = this.CLIENT_REQUESTS_SERVICES;
    url += options ? options : "";
    var response = await this.data.get(url);
    if (!response.error) {
      var sessions = new Array();
      var sessionCount = new Array();
      numSessions = numSessions < sessionArray.length ? numSessions : sessionArray.length - 1;
      for (var i = 0; i <= numSessions; i++) {
        sessions.push(sessionArray[i]._id);
        sessionCount.push({
          count: 0,
          session: sessionArray[i].session
        });
      }
      requestStatus = requestStatus ? requestStatus.split(':') : undefined;
      response.forEach(request => {
        var index = sessions.indexOf(request.sessionId);
        if (index > -1) {
          if (requestStatus) {
            request.requestDetails.forEach(detail => {
              if (requestStatus.indexOf(detail.requestStatus) > -1) {
                sessionCount[index].count += 1;
              }
            });
          } else {
            sessionCount[index].count += request.requestDetails.length;
          }
        }
      });
      return sessionCount;
    }
  }
  async sendCustomerMessage(message) {
    console.log(message);
    var serverResponse = await this.data.saveObject(message, this.CLIENT_REQUEST_EMAIL, "post");
    return serverResponse;
  }
  updateDetailStatuses(selectedRequestNo, status) {
    this.requestsDetailsArray.forEach(item => {
      if (item.requestId && item.requestId.clientRequestNo == selectedRequestNo) {
        if (item.requestStatus != this.config.ASSIGNED_REQUEST_CODE) item.requestStatus = status;
      }
    });
  }
  updateDetailStatus(id, status) {
    this.requestsDetailsArray.forEach(item => {
      if (item.requestId._id == id) {
        if (item.requestStatus != this.config.ASSIGNED_REQUEST_CODE) item.requestStatus = status;
      }
    });
  }
  async groupRequestsByInstitutionCountry() {
    if (!this.requestsDetailsArrayAnalytics) {
      return;
    }
    var sortedArray = new Array();
    this.requestsDetailsArrayAnalytics.forEach(item => {
      if (item['requestId'] && item['requestId'].institutionId && item['productId'] && item['productId'].name) {
        item.sortValue = item['requestId'].institutionId.name + item['productId'].name;
        sortedArray.push(item);
      }
    });
    var sortedArray = this.requestsDetailsArrayAnalytics.sort((a, b) => {
      var result = a.sortValue < b.sortValue ? -1 : a.sortValue > b.sortValue ? 1 : 0;
      return result;
    });
    this.analyticsInstitutionCountryResultArray = new Array();
    var instID = "";
    var templateObj = new Object();
    var that = this;
    sortedArray.forEach(function (item) {
      // if(item.requestId){
      if (item.sortValue != instID) {
        instID = item.sortValue;
        var obj = that.utils.copyObject(templateObj);
        obj.name = item.requestId.institutionId.name;
        obj.institutionId = item.requestId.institutionId._id;
        obj.person = item.requestId.clientRequestsDetails.fullName;
        obj.productName = item.productId.name;
        obj.country = item.requestId.institutionId.country;
        obj.total = 0;
        obj.students = 0;
        that.analyticsInstitutionCountryResultArray.push(obj);
      }
      // if(item.requestStatus != skip){
      that.analyticsInstitutionCountryResultArray[that.analyticsInstitutionCountryResultArray.length - 1]['total'] += 1;
      that.analyticsInstitutionCountryResultArray[that.analyticsInstitutionCountryResultArray.length - 1]['students'] += parseInt(item.requestId.undergradIds) + parseInt(item.requestId.graduateIds);
      // var gradIds = item.requestId.graduateIds != null ? parseInt(item.requestId.graduateIds) : 0;
      // var underIds = item.requestId.undergradIds != null ? parseInt(item.requestId.undergradIds) : 0;
      // that.analyticsInstitutionResultArray[that.analyticsInstitutionResultArray.length-1]['studentIds'] += gradIds + underIds;
      // that.analyticsInstitutionResultArray[that.analyticsInstitutionResultArray.length-1]['studentIds'] += parseInt(item.requestId.graduateIds) + parseInt(item.requestId.undergradIds);
      // }
      // that.analyticsInstitutionResultArray[that.analyticsInstitutionResultArray.length-1][item.requestStatus] += 1;
      // }
    });
  }

  async groupRequestsByInstitution() {
    if (!this.requestsDetailsArrayAnalytics) {
      return;
    }
    var sortedArray = this.requestsDetailsArrayAnalytics.sort((a, b) => {
      if (!a['requestId'] || !b['requestId'] || !a['requestId'].institutionId || !b['requestId'].institutionId) return -1;
      var result = a['requestId'].institutionId.name < b['requestId'].institutionId.name ? -1 : a['requestId'].institutionId.name > b['requestId'].institutionId.name ? 1 : 0;
      return result;
    });
    this.analyticsInstitutionResultArray = new Array();
    var instID = "";
    var numStatuses = this.config.REQUEST_STATUS.length;
    var templateObj = new Object();
    templateObj['total'] = 0;
    templateObj['studentIds'] = 0;
    for (var i = 0; i < numStatuses; i++) {
      templateObj[this.config.REQUEST_STATUS[i].code] = 0;
      if (this.config.REQUEST_STATUS[i].description === "Cancelled") {
        var skip = this.config.REQUEST_STATUS[i].code;
      }
    }
    var that = this;
    sortedArray.forEach(function (item) {
      if (item.requestId) {
        if (item.requestId.institutionId && item.requestId.institutionId.name != instID) {
          instID = item.requestId.institutionId.name;
          var obj = that.utils.copyObject(templateObj);
          obj.name = item.requestId.institutionId.name;
          obj.institutionId = item.requestId.institutionId._id;
          that.analyticsInstitutionResultArray.push(obj);
        }
        if (item.requestStatus != skip) {
          that.analyticsInstitutionResultArray[that.analyticsInstitutionResultArray.length - 1]['total'] += 1;
          var gradIds = item.requestId.graduateIds != null ? parseInt(item.requestId.graduateIds) : 0;
          var underIds = item.requestId.undergradIds != null ? parseInt(item.requestId.undergradIds) : 0;
          that.analyticsInstitutionResultArray[that.analyticsInstitutionResultArray.length - 1]['studentIds'] += gradIds + underIds;
          // that.analyticsInstitutionResultArray[that.analyticsInstitutionResultArray.length-1]['studentIds'] += parseInt(item.requestId.graduateIds) + parseInt(item.requestId.undergradIds);
        }

        that.analyticsInstitutionResultArray[that.analyticsInstitutionResultArray.length - 1][item.requestStatus] += 1;
      }
    });
  }
  groupRequestsByProduct() {
    if (!this.requestsDetailsArrayAnalytics) {
      return;
    }
    var sortedArray = this.requestsDetailsArrayAnalytics.sort((a, b) => {
      if (!a.productId || !b.productId) return -1;
      var result = a.productId.name < b.productId.name ? -1 : a.productId.name > b.productId.name ? 1 : 0;
      return result;
    });
    this.analyticsProductsResultArray = new Array();
    var prodID = "";
    var numStatuses = this.config.REQUEST_STATUS.length;
    var templateObj = new Object();
    templateObj['total'] = 0;
    templateObj['studentIds'] = 0;
    for (var i = 0; i < numStatuses; i++) {
      templateObj[this.config.REQUEST_STATUS[i].code] = 0;
      if (this.config.REQUEST_STATUS[i].description === "Cancelled") {
        var skip = this.config.REQUEST_STATUS[i].code;
      }
    }
    sortedArray.forEach(item => {
      if (item.productId.name != prodID) {
        prodID = item.productId.name;
        var obj = this.utils.copyObject(templateObj);
        obj.productId = item.productId;
        obj.country = item.requestId.institutionId.country;
        this.analyticsProductsResultArray.push(obj);
      }
      if (item.requestStatus != skip) {
        this.analyticsProductsResultArray[this.analyticsProductsResultArray.length - 1]['total'] += 1;
        var gradIds = item.requestId.graduateIds != null ? parseInt(item.requestId.graduateIds) : 0;
        var underIds = item.requestId.undergradIds != null ? parseInt(item.requestId.undergradIds) : 0;
        this.analyticsProductsResultArray[this.analyticsProductsResultArray.length - 1]['studentIds'] += gradIds + underIds;
      }
      this.analyticsProductsResultArray[this.analyticsProductsResultArray.length - 1][item.requestStatus] += 1;
    });
  }
  fieldSorter(fields) {
    return (a, b) => fields.map(o => {
      let dir = 1;
      if (o[0] === '-') {
        dir = -1;
        o = o.substring(1);
      }
      return a[o] > b[o] ? dir : a[o] < b[o] ? -dir : 0;
    }).reduce((p, n) => p ? p : n, 0);
  }
  groupRequestsByCountry() {
    if (!this.requestsDetailsArrayAnalytics) {
      return;
    }
    var preSortedArray = this.requestsDetailsArrayAnalytics.forEach(item => {
      if (item.requestId.institutionId && item.requestId.institutionId.country && item.productId.name) {
        item.sortProperty = item.requestId.institutionId.country + item.productId.name;
      } else {
        item.sortProperty = "ZZZZ";
      }
    });
    var sortedArray = this.requestsDetailsArrayAnalytics.sort((a, b) => {
      var result = a.sortProperty < b.sortProperty ? -1 : a.sortProperty > b.sortProperty ? 1 : 0;
      return result;
    });
    this.analyticsCountryProductsResultArray = new Array();
    var prodID = "";
    var country = "";
    var numStatuses = this.config.REQUEST_STATUS.length;
    var templateObj = new Object();
    templateObj['total'] = 0;
    templateObj['studentIds'] = 0;
    for (var i = 0; i < numStatuses; i++) {
      templateObj[this.config.REQUEST_STATUS[i].code] = 0;
      if (this.config.REQUEST_STATUS[i].description === "Cancelled") {
        var skip = this.config.REQUEST_STATUS[i].code;
      }
    }
    sortedArray.forEach(item => {
      if (item.productId.name != prodID || item.requestId.institutionId.country != country) {
        prodID = item.productId.name;
        country = item.requestId.institutionId ? item.requestId.institutionId.country : "";
        var obj = this.utils.copyObject(templateObj);
        obj.productId = item.productId;
        obj.country = item.requestId.institutionId ? item.requestId.institutionId.country : "";
        this.analyticsCountryProductsResultArray.push(obj);
      }
      if (item.requestStatus != skip) {
        this.analyticsCountryProductsResultArray[this.analyticsCountryProductsResultArray.length - 1]['total'] += 1;
        var gradIds = item.requestId.graduateIds != null ? parseInt(item.requestId.graduateIds) : 0;
        var underIds = item.requestId.undergradIds != null ? parseInt(item.requestId.undergradIds) : 0;
        this.analyticsCountryProductsResultArray[this.analyticsCountryProductsResultArray.length - 1]['studentIds'] += gradIds + underIds;
      }
      this.analyticsCountryProductsResultArray[this.analyticsCountryProductsResultArray.length - 1][item.requestStatus] += 1;
    });
  }
  lockRequest(obj) {
    if (obj.requestId) {
      var response = this.data.saveObject(obj, this.CLIENT_REQUEST_LOCK_SERVICES, "post");
    }
  }
  async getRequestLock(id) {
    var response = await this.data.get(this.CLIENT_REQUEST_LOCK_SERVICES + "/" + id);
    if (!response.error) {
      return response;
    } else {
      this.data.processError(response, "There was an error retrieving the help ticket lock.");
    }
  }
  async removeRequestLock(id) {
    await this.data.deleteObject(this.CLIENT_REQUEST_LOCK_SERVICES + "/" + id);
  }
}) || _class);

/***/ }),

/***/ 748:
/*!**************************************!*\
  !*** ./src/resources/data/config.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Config: function() { return /* binding */ Config; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _dataServices__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dataServices */ 5086);
var _dec, _class;


let Config = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_dataServices__WEBPACK_IMPORTED_MODULE_1__.DataServices), _dec(_class = class Config {
  constructor(data) {
    this.CONFIG_SERVICE = 'config';
    this.SESSIONS_CONFIG_SERVICE = 'semesterConfig';
    this.token = void 0;
    this.user = void 0;
    this.data = data;
  }
  async getConfigArray(refresh, options) {
    if (!this.configArray || refresh) {
      var url = this.data.CONFIG_SERVICE;
      url += options ? options : "";
      try {
        let serverResponse = await this.data.get(url);
        if (!serverResponse.error) {
          this.configArray = serverResponse;
        } else {
          this.data.processError(serverResponse);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  async saveAll(saveConfigArray) {
    if (saveConfigArray) {
      var saveObj = {
        parameters: saveConfigArray
      };
      let response = await this.data.saveObject(saveObj, this.CONFIG_SERVICE + '/saveAll', "put");
      if (!response.error) {
        return response;
      } else {
        this.data.processError(response, "There was an error updating the configuration.");
      }
      return response;
    }
    return null;
  }
  async saveSessions(saveSessionArray) {
    if (saveSessionArray) {
      let response = await this.data.saveObject(saveSessionArray, this.SESSIONS_CONFIG_SERVICE, "put");
      if (!response.error) {
        return response;
      } else {
        this.data.processError(response, "There was an error updating the configuration.");
      }
      return response;
    }
    return null;
  }
}) || _class);

/***/ }),

/***/ 7701:
/*!******************************************!*\
  !*** ./src/resources/data/curriculum.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Curriculum: function() { return /* binding */ Curriculum; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/utils */ 8741);
/* harmony import */ var _dataServices__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dataServices */ 5086);
var _dec, _class;



let Curriculum = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_dataServices__WEBPACK_IMPORTED_MODULE_2__.DataServices, _utils_utils__WEBPACK_IMPORTED_MODULE_1__.Utils), _dec(_class = class Curriculum {
  constructor(data, utils) {
    this.curriculumArray = undefined;
    this.curriculumCatArray = undefined;
    this.CURRICULUM_SERVICE = 'curriculum';
    this.CURRICULUM_CATEGORY_SERVICE = 'curriculumcategory';
    this.data = data;
    this.utils = utils;
  }
  async getCurriculumArray(refresh, options) {
    if (!this.configArray || refresh) {
      var url = this.CURRICULUM_SERVICE;
      url += options ? options : "";
      try {
        let serverResponse = await this.data.get(url);
        if (!serverResponse.error) {
          this.curriculumArray = serverResponse;
        } else {
          this.data.processError(serverResponse);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  async getCurriculumCategoryArray(refresh, options) {
    if (!this.configArray || refresh) {
      var url = this.CURRICULUM_CATEGORY_SERVICE;
      url += options ? options : "";
      try {
        let serverResponse = await this.data.get(url);
        if (!serverResponse.error) {
          this.curriculumCatArray = serverResponse;
        } else {
          this.data.processError(serverResponse);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  selectCurriculum(index) {
    if (index === undefined) {
      this.selectedCurriculum = this.emptyCurriculum();
    } else {
      try {
        this.selectedCurriculum = this.utils.copyObject(this.curriculumArray[index]);
        this.editIndex = index;
      } catch (error) {
        console.log(error);
        this.selectedCurriculum = this.emptyCurriculum();
      }
    }
  }
  selectCurriculumById(id) {
    if (!id) {
      this.selectedCurriculum = this.emptyCurriculum();
    } else {
      for (var i = 0; i < this.curriculumArray.length; i++) {
        if (this.curriculumArray[i]._id === id) {
          this.selectedCurriculum = this.utils.copyObject(this.curriculumArray[i]);
          this.editIndex = i;
          return;
        }
      }
    }
  }
  emptyCurriculum() {
    var obj = new Object();
    obj.category = "";
    obj.title = "";
    obj.description = "";
    obj.notes = "";
    obj.rating = 0;
    obj.comments = new Array();
    obj.products = new Array();
    return obj;
  }
  async save() {
    if (!this.selectedCurriculum._id) {
      let response = await this.data.saveObject(this.selectedCurriculum, this.CURRICULUM_SERVICE, "post");
      if (!response.error) {
        if (this.curriculumArray) {
          this.curriculumArray.push(response);
          ;
        }
      } else {
        this.data.processError(response, "There was an error creating the curriculum.");
      }
      return response;
    } else {
      let response = await this.data.saveObject(this.selectedCurriculum, this.CURRICULUM_SERVICE, "put");
      if (!response.error) {
        if (this.curriculumArray) {
          this.curriculumArray[this.editIndex] = this.utils.copyObject(this.selectedCurriculum, this.curriculumArray[this.editIndex]);
        }
      }
      return response;
    }
  }
  isDirty(obj) {
    if (this.selectedCurriculum) {
      if (!obj) {
        var obj = this.emptyCurriculum();
      }
      return this.utils.objectsEqual(this.selectedCurriculum, obj, ['file']);
    }
    return new Array();
  }
  async delete() {
    if (this.selectedCurriculum._id) {
      let serverResponse = await this.data.deleteObject(this.CURRICULUM_SERVICE + '/' + this.selectedCurriculum._id);
      if (!serverResponse.error) {
        this.curriculumArray.splice(this.editIndex, 1);
        this.editIndex = -1;
      }
      return serverResponse;
    }
  }
  selectCurriculumCategory(index) {
    if (index === undefined) {
      this.selectedCurriculumCategory = this.emptyCurriculumCategory();
    } else {
      try {
        this.selectedCurriculumCategory = this.utils.copyObject(this.curriculumCatArray[index]);
        this.editCategoryIndex = index;
      } catch (error) {
        console.log(error);
        this.selectedCurriculumCategory = this.emptyCurriculumCategory();
      }
    }
  }
  selectCurriculumCategoryByName(name) {
    if (name === undefined) {
      this.selectedCurriculumCategory = this.emptyCurriculumCategory();
    } else {
      try {
        for (var i = 0; i < this.curriculumCatArray.length; i++) {
          if (this.curriculumCatArray[i].name === name) {
            this.selectedCurriculumCategory = this.utils.copyObject(this.curriculumCatArray[i]);
            this.editCategoryIndex = i;
            break;
          }
        }
      } catch (error) {
        console.log(error);
        this.selectedCurriculumCategory = this.emptyCurriculumCategory();
      }
    }
  }
  emptyCurriculumCategory() {
    var obj = new Object();
    obj.name = "";
    obj.description = "";
    return obj;
  }
  async saveCategory() {
    if (!this.selectedCurriculumCategory._id) {
      let response = await this.data.saveObject(this.selectedCurriculumCategory, this.CURRICULUM_CATEGORY_SERVICE, "post");
      if (!response.error) {
        if (this.curriculumCatArray) {
          this.curriculumCatArray.push(response);
          ;
        }
      } else {
        this.data.processError(response, "There was an error creating the curriculum catgory.");
      }
      return response;
    } else {
      let response = await this.data.saveObject(this.selectedCurriculumCategory, this.CURRICULUM_CATEGORY_SERVICE, "put");
      if (!response.error) {
        if (this.curriculumCatArray) {
          this.curriculumCatArray[this.editCategoryIndex] = this.utils.copyObject(this.selectedCurriculumCategory, this.curriculumCatArray[this.editCategoryIndex]);
        }
      } else {
        this.data.processError(response, "There was an error creating the curriculum catgory.");
      }
      return response;
    }
  }
  async deleteCategory() {
    if (this.selectedCurriculumCategory._id) {
      let serverResponse = await this.data.deleteObject(this.CURRICULUM_CATEGORY_SERVICE + '/' + this.selectedCurriculumCategory._id);
      if (!serverResponse.error) {
        this.curriculumCatArray.splice(this.editCategoryIndex, 1);
        this.editCategoryIndex = -1;
      }
      return serverResponse;
    }
  }
  curriculumExist(category) {
    let exists = false;
    for (var i = 0; i < this.curriculumArray.length; i++) {
      if (this.curriculumArray[i].category === category) {
        exists = true;
        break;
      }
    }
    return exists;
  }
  async uploadFile(files) {
    let response = await this.data.uploadFiles(files, this.CURRICULUM_SERVICE + "/upload" + "/" + this.selectedCurriculum._id + '/' + this.selectedCurriculum.category);
    if (!response.error) {
      this.curriculumArray[this.editIndex].file = response.file;
    }
  }
}) || _class);

/***/ }),

/***/ 5086:
/*!********************************************!*\
  !*** ./src/resources/data/dataServices.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DataServices: function() { return /* binding */ DataServices; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var aurelia_http_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-http-client */ 3139);
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/utils */ 8741);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
/* harmony import */ var aurelia_event_aggregator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! aurelia-event-aggregator */ "aurelia-event-aggregator");
var _dec, _class;





let DataServices = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(aurelia_http_client__WEBPACK_IMPORTED_MODULE_1__.HttpClient, _utils_utils__WEBPACK_IMPORTED_MODULE_2__.Utils, _config_appConfig__WEBPACK_IMPORTED_MODULE_3__.AppConfig, aurelia_event_aggregator__WEBPACK_IMPORTED_MODULE_4__.EventAggregator), _dec(_class = class DataServices {
  constructor(http, utils, config, eventAggregator) {
    this.isRequesting = false;
    // //File URLs
    this.FILE_URL = "http://localhost:5000/api/upload";
    this.FILE_DOWNLOAD_URL = "http://localhost:5000/";
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
    this.IS4UA = 'is4ua';
    // //Systems Services
    // SYSTEMS_SERVICE = "systems";
    // //Clients Services
    this.CLIENTS_SERVICE = 'clients';
    this.DELETE_ALL_CLIENTS = 'clients/system/SYSTEMID';
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
    this.COURSES_SERVICE = 'courses';
    this.PERSON_COURSES_SERVICE = 'courses/person/PERSONID';
    // CLIENT_REQUESTS_SERVICES = 'clientRequests';
    // CLIENT_REQUEST_DETAILS='clientRequestsDetails';
    // CLIENT_REQUEST_LOCK_SERVICES = 'clientRequestLocks';
    // CUSTOMER_ACTION = 'clientRequests/customerAction';
    this.CONFIG_SERVICE = 'config';
    this.SESSIONS_CONFIG_SERVICE = 'semesterConfig';
    //File upload
    this.DOCUMENTS_FILE_UPLOAD = 'documents/file';
    this.http = http;
    this.utils = utils;
    this.config = config;
    this.eventAggregator = eventAggregator;
    this.http.configure(x => {
      x.withBaseUrl(this.config.BASE_URL);
    });
  }
  activate() {}
  get(url) {
    this.isRequesting = true;
    return this.http.createRequest(url).asGet().withHeader('Authorization', 'JWT ' + sessionStorage.getItem('token')).send().then(response => {
      this.isRequesting = false;
      if (!response.isSuccess) {
        return response;
      } else {
        return JSON.parse(response.response);
      }
    }).catch(e => {
      this.isRequesting = false;
      console.log(e);
      return {
        error: true,
        code: e.statusCode,
        message: e.statusText
      };
    });
  }
  getNoAuth(url) {
    this.isRequesting = true;
    return this.http.createRequest(url).asGet().send().then(response => {
      this.isRequesting = false;
      if (!response.isSuccess) {
        return response;
      } else {
        return JSON.parse(response.response);
      }
    }).catch(e => {
      this.isRequesting = false;
      console.log(e);
      return {
        error: true,
        code: e.statusCode,
        message: e.statusText
      };
    });
  }
  saveObject(content, url, method) {
    this.isRequesting = true;
    if (method === 'put') {
      return this.http.createRequest(url).asPut().withHeader('Authorization', 'JWT ' + sessionStorage.getItem('token')).withContent(content).send().then(response => {
        this.isRequesting = false;
        if (!response.isSuccess) {
          return response;
        } else {
          return JSON.parse(response.response);
        }
      }).catch(e => {
        this.isRequesting = false;
        console.log(e);
        return {
          error: true,
          code: e.statusCode,
          message: e.statusText
        };
      });
    } else if (method === 'post') {
      return this.http.createRequest(url).asPost().withHeader('Authorization', 'JWT ' + sessionStorage.getItem('token')).withContent(content).send().then(response => {
        this.isRequesting = false;
        if (!response.isSuccess) {
          return response;
        } else {
          return JSON.parse(response.response);
        }
      }).catch(e => {
        this.isRequesting = false;
        console.log(e);
        return {
          error: true,
          code: e.statusCode,
          message: e.statusText
        };
      });
    }
  }
  deleteObject(url) {
    this.isRequesting = true;
    return this.http.createRequest(url).asDelete().withHeader('Authorization', 'JWT ' + sessionStorage.getItem('token')).send().then(response => {
      this.isRequesting = false;
      if (!response.isSuccess) {
        return response;
      } else {
        if (response.statusCode === 204) {
          return response;
        } else {
          return JSON.parse(response.response);
        }
      }
    }).catch(e => {
      this.isRequesting = false;
      console.log(e);
      return {
        error: true,
        code: e.statusCode,
        message: e.statusText
      };
    });
  }
  sendMail(content) {
    this.isRequesting = true;
    return this.http.createRequest('sendMail').asPost().withHeader('Authorization', 'JWT ' + sessionStorage.getItem('token')).withContent(content).send().then(response => {
      this.isRequesting = false;
      if (!response.isSuccess) {
        return response;
      } else {
        return JSON.parse(response.response);
      }
    }).catch(e => {
      this.isRequesting = false;
      console.log(e);
      return {
        error: true,
        code: e.statusCode,
        message: e.statusText
      };
    });
  }
  login(content, url) {
    return this.http.createRequest(url).asPost().withContent(content).send().then(response => {
      this.isRequesting = false;
      return JSON.parse(response.response);
    }).catch(e => {
      this.isRequesting = false;
      console.log(e);
      return {
        error: true,
        code: e.statusCode,
        message: e.statusText
      };
    });
  }
  uploadFiles(files, url) {
    // this.isRequesting = true;
    this.progress = 0;
    let formData = new FormData();
    files.forEach((item, index) => {
      formData.append("file" + index, item);
    });
    return this.http.createRequest(url).asPost().withHeader('Authorization', 'JWT ' + sessionStorage.getItem('token')).withContent(formData).skipContentProcessing().withProgressCallback(progress => {
      console.log(progress.loaded);
      this.eventAggregator.publish('upload-progress', {
        progress: progress.loaded,
        total: progress.total
      });
      this.progress = progress.loaded / progress.total;
    }).send().then(response => {
      this.isRequesting = false;
      if (!response.isSuccess) {
        return response;
      } else {
        return JSON.parse(response.response);
      }
    }).catch(e => {
      this.isRequesting = false;
      console.log(e);
      return {
        error: true,
        code: e.statusCode,
        message: e.statusText
      };
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
        msg = msg += "An unspecified error occured.  Contact your UCC.";
    }
    if (msg && msg.length > 0) this.utils.showNotification(msg);
  } // API_KEY='0f85bb931f8faad7e35b6f685aa4e931';
  // OPEN_WEATHER_MAP_SERVICE = 'http://api.openweathermap.org/data/2.5/weather';
}) || _class);

/***/ }),

/***/ 7188:
/*!*****************************************!*\
  !*** ./src/resources/data/documents.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DocumentsServices: function() { return /* binding */ DocumentsServices; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _dataServices__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dataServices */ 5086);
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/utils */ 8741);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! moment */ 381);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_4__);
var _dec, _class;





let DocumentsServices = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_dataServices__WEBPACK_IMPORTED_MODULE_1__.DataServices, _utils_utils__WEBPACK_IMPORTED_MODULE_2__.Utils, _config_appConfig__WEBPACK_IMPORTED_MODULE_3__.AppConfig), _dec(_class = class DocumentsServices {
  constructor(data, utils, config) {
    this.DOCUMENTS_SERVICE = "documents";
    this.DOCUMENTS_CATEGORY_SERVICE = "documentCategory";
    this.data = data;
    this.utils = utils;
    this.config = config;
  }

  //Documents
  async getDocumentsArray(refresh, options) {
    if (!this.documentsArray || refresh) {
      var url = this.DOCUMENTS_SERVICE;
      url += options ? options : "";
      try {
        let serverResponse = await this.data.get(url);
        if (!serverResponse.status) {
          this.documentsArray = serverResponse;
        } else {
          return undefined;
        }
      } catch (error) {
        console.log(error);
        return undefined;
      }
    }
    return this.documentsArray;
  }
  selectDocument(index) {
    if (!index && index != 0) {
      this.selectedDocument = this.emptyDocument();
    } else {
      try {
        this.selectedDocument = this.utils.copyObject(this.documentsArray[index]);
        this.editDocumentIndex = index;
      } catch (error) {
        this.selectedDocument = this.emptyDocument();
      }
    }
  }
  emptyDocument() {
    var newObj = new Object();
    newObj.name = "";
    newObj.description = "";
    newObj.type = 0;
    newObj.files = new Array();
    newObj.active = true;
    newObj.createdDate = new Date();
    return newObj;
  }
  async saveDocument() {
    if (!this.selectedDocument) {
      return;
    }
    if (!this.selectedDocument._id) {
      let serverResponse = await this.data.saveObject(this.selectedDocument, this.DOCUMENTS_SERVICE, "post");
      if (!serverResponse.status) {
        this.selectedDocument = serverResponse;
        this.documentsArray.push(this.selectedDocument);
        this.editDocumentIndex = this.documentsArray.length - 1;
      }
      return serverResponse;
    } else {
      var serverResponse = await this.data.saveObject(this.selectedDocument, this.DOCUMENTS_SERVICE, "put");
      if (!serverResponse.status) {
        this.documentsArray[this.editDocumentIndex] = this.utils.copyObject(this.selectedDocument, this.documentsArray[this.editDocumentIndex]);
      }
      return serverResponse;
    }
  }
  uploadFile(files, version) {
    let path = this.selectedCat.code + '$@' + this.selectedDocument.name;
    this.data.uploadFiles(files, this.data.DOCUMENTS_FILE_UPLOAD + "/" + path + '/' + version);
  }
  async deleteFile(index) {
    if (!this.selectedDocument || !this.selectedDocument._id) {
      return;
    }
    let serverResponse = await this.data.deleteObject(this.data.DOCUMENTS_FILE_UPLOAD + '/' + this.selectedDocument._id + '/' + index);
    if (!serverResponse.status) {
      this.selectedDocument.files.splice(index, 1);
      this.documentsArray[this.editDocumentIndex] = this.utils.copyObject(this.selectedDocument, this.documentsArray[this.editDocumentIndex]);
    }
    return serverResponse;
  }
  async deleteDocument() {
    let serverResponse = await this.data.deleteObject(this.DOCUMENTS_SERVICE + '/' + this.selectedDocument._id);
    if (serverResponse.status === 204) {
      this.documentsArray.splice(this.editDocumentIndex, 1);
      this.editDownloadIndex = -1;
    }
    return serverResponse;
  }
  isDirty(obj) {
    if (this.selectedDocument) {
      if (!obj) {
        var obj = this.emptyDocument();
      }
      var skip = ['file'];
      return this.utils.objectsEqual(this.selectedDocument, obj, skip);
    }
    return new Array();
  }

  //Categories
  async getDocumentsCategoriesArray(refresh, options) {
    if (!this.docCatsArray || refresh) {
      var url = this.DOCUMENTS_CATEGORY_SERVICE;
      url += options ? options : "";
      ;
      try {
        let serverResponse = await this.data.get(url);
        if (!serverResponse.error) {
          this.docCatsArray = serverResponse;
        } else {
          return undefined;
        }
      } catch (error) {
        console.log(error);
        return undefined;
      }
    }
    return this.docCatsArray;
  }
  selectCategory(index) {
    if (!index && index != 0) {
      this.selectedCat = this.emptyCat();
    } else {
      try {
        this.selectedCat = this.utils.copyObject(this.docCatsArray[index]);
        this.editCatIndex = index;
      } catch (error) {
        this.selectedCat = this.emptyCat();
      }
    }
  }
  selectCategoryByCode(index) {
    if (!index && index != 0) {
      this.selectedCat = this.emptyCat();
    } else {
      try {
        for (var i = 0; i < this.docCatsArray.length; i++) {
          if (this.docCatsArray[i].code == index) {
            index = i;
            break;
          }
        }
        this.selectedCat = this.utils.copyObject(this.docCatsArray[index]);
        this.editCatIndex = index;
      } catch (error) {
        this.selectedCat = this.emptyCat();
      }
    }
  }
  emptyCat() {
    var newObj = new Object();
    var newCode = 0;
    for (var i = 0; i < this.docCatsArray.length; i++) {
      if (this.docCatsArray[i].code > newCode) newCode = this.docCatsArray[i].code;
    }
    newObj.code = newCode + 1;
    newObj.description = "";
    return newObj;
  }
  async saveCategory() {
    if (!this.selectedCat) {
      return;
    }
    if (!this.selectedCat._id) {
      let serverResponse = await this.data.saveObject(this.selectedCat, this.DOCUMENTS_CATEGORY_SERVICE, "post");
      if (!serverResponse.status) {
        this.docCatsArray.push(serverResponse);
        this.editCatIndex = this.docCatsArray.length - 1;
      }
      return serverResponse;
    } else {
      var serverResponse = await this.data.saveObject(this.selectedCat, this.DOCUMENTS_CATEGORY_SERVICE, "put");
      if (!serverResponse.status) {
        this.docCatsArray[this.editCatIndex] = this.utils.copyObject(this.selectedCat, this.docCatsArray[this.editCatIndex]);
      }
      return serverResponse;
    }
  }
  async deleteCat() {
    if (this.selectedCat._id) {
      let serverResponse = await this.data.deleteObject(this.DOCUMENTS_CATEGORY_SERVICE + '/' + this.selectedCat._id);
      if (serverResponse.status === 204) {
        this.docCatsArray.splice(this.editCatIndex, 1);
        this.editCatIndex = -1;
      }
      return serverResponse;
    } else {
      return {
        error: "no category selected"
      };
    }
  }
}) || _class);

/***/ }),

/***/ 9132:
/*!*****************************************!*\
  !*** ./src/resources/data/downloads.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Downloads: function() { return /* binding */ Downloads; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _dataServices__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dataServices */ 5086);
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/utils */ 8741);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! moment */ 381);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_4__);
var _dec, _class;





let Downloads = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_dataServices__WEBPACK_IMPORTED_MODULE_1__.DataServices, _utils_utils__WEBPACK_IMPORTED_MODULE_2__.Utils, _config_appConfig__WEBPACK_IMPORTED_MODULE_3__.AppConfig), _dec(_class = class Downloads {
  constructor(data, utils, config) {
    this.DOWNLOADS_SERVICE = "apps";
    this.APPLICATION_CATEGORY_SERVICE = "appsCategory";
    this.DOWNLOADS_UPLOADS = "downloads/upload";
    this.data = data;
    this.utils = utils;
    this.config = config;
  }

  //Downloads
  async getDownloadsArray(refresh, options) {
    if (!this.appDownloadsArray || refresh) {
      var url = this.DOWNLOADS_SERVICE;
      url += options ? options : "";
      try {
        let serverResponse = await this.data.get(url);
        if (!serverResponse.error) {
          this.appDownloadsArray = serverResponse;
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  selectDownload(index) {
    if (!index && index != 0) {
      this.selectedDownload = this.emptyDownload();
    } else {
      try {
        this.selectedDownload = this.utils.copyObject(this.appDownloadsArray[index]);
        this.editDownloadIndex = index;
      } catch (error) {
        this.selectedDownload = this.emptyDownload();
      }
    }
  }
  emptyDownload() {
    var newObj = new Object();
    newObj.name = "";
    newObj.description = "";
    newObj.type = 0;
    newObj.file = "";
    newObj.createdDate = new Date();
    newObj.active = true;
    newObj.helpTicketRelevant = false;
    return newObj;
  }
  async saveDownload() {
    if (!this.selectedDownload) {
      return;
    }
    if (!this.selectedDownload._id) {
      let serverResponse = await this.data.saveObject(this.selectedDownload, this.DOWNLOADS_SERVICE, "post");
      if (!serverResponse.error) {
        this.selectedDownload = serverResponse;
        this.appDownloadsArray.push(this.selectedDownload);
        this.editDownloadIndex = this.appDownloadsArray.length - 1;
      }
      return serverResponse;
    } else {
      var serverResponse = await this.data.saveObject(this.selectedDownload, this.DOWNLOADS_SERVICE, "put");
      if (!serverResponse.error) {
        this.appDownloadsArray[this.editDownloadIndex] = this.utils.copyObject(this.selectedDownload, this.appDownloadsArray[this.editDownloadIndex]);
      }
      return serverResponse;
    }
  }
  async uploadFile(files) {
    let response = await this.data.uploadFiles(files, this.DOWNLOADS_UPLOADS + "/" + this.selectedDownload._id + '/' + this.selectedDownload.downCatcode);
    if (!response.error) {
      this.appDownloadsArray[this.editDownloadIndex].file = response.file;
    }
  }
  async deleteDownload() {
    let serverResponse = await this.data.deleteObject(this.DOWNLOADS_SERVICE + '/' + this.selectedDownload._id);
    if (!serverResponse.error) {
      this.appDownloadsArray.splice(this.editDownloadIndex, 1);
      this.editDownloadIndex = -1;
    }
    return serverResponse;
  }
  isDirty(obj) {
    if (this.selectedDownload) {
      if (!obj) {
        var obj = this.emptyDownload();
      }
      var skip = ['file'];
      return this.utils.objectsEqual(this.selectedDownload, obj, skip);
    }
    return new Array();
  }

  //Categories
  async getDownloadCategoriesArray(refresh, options) {
    if (!this.appCatsArray || refresh) {
      var url = this.APPLICATION_CATEGORY_SERVICE;
      url += options ? options : "";
      ;
      try {
        let serverResponse = await this.data.get(url);
        if (!serverResponse.error) {
          this.appCatsArray = serverResponse;
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  selectCategory(index) {
    if (!index && index != 0) {
      this.selectedCat = this.emptyCat();
    } else {
      try {
        this.selectedCat = this.utils.copyObject(this.appCatsArray[index]);
        this.editCatIndex = index;
      } catch (error) {
        this.selectedCat = this.emptyCat();
      }
    }
  }
  selectCategoryByCode(code) {
    if (!code && code != 0) {
      this.selectedCat = this.emptyCat();
    } else {
      try {
        this.editCatIndex = 0;
        this.appCatsArray.forEach((item, index) => {
          if (item.downCatcode == code) this.editCatIndex = index;
        });
        this.selectedCat = this.utils.copyObject(this.appCatsArray[this.editCatIndex]);
      } catch (error) {
        this.selectedCat = this.emptyCat();
      }
    }
  }
  emptyCat() {
    var newObj = new Object();
    newObj.code = 0;
    newObj.description = "";
    return newObj;
  }
  documentsExist(code) {
    if (!code && code != 0) {
      return false;
    } else {
      for (var i = 0; i < this.appDownloadsArray.length; i++) {
        if (this.appDownloadsArray[i].downCatcode == code) return true;
      }
      return false;
    }
  }
  async saveCategory() {
    if (!this.selectedCat) {
      return;
    }
    if (!this.selectedCat._id) {
      let serverResponse = await this.data.saveObject(this.selectedCat, this.APPLICATION_CATEGORY_SERVICE, "post");
      if (!serverResponse.error) {
        this.appCatsArray.push(serverResponse);
        this.selectedCat = serverReponse;
        this.editCatIndex = this.appCatsArrayInternal.length - 1;
      }
      return serverResponse;
    } else {
      var serverResponse = await this.data.saveObject(this.selectedCat, this.APPLICATION_CATEGORY_SERVICE, "put");
      if (!serverResponse.error) {
        this.appCatsArray[this.editCatIndex] = this.utils.copyObject(this.selectedCat, this.appCatsArray[this.editCatIndex]);
      }
      return serverResponse;
    }
  }
  async deleteCat() {
    if (this.selectedCat._id) {
      let serverResponse = await this.data.deleteObject(this.APPLICATION_CATEGORY_SERVICE + '/' + this.selectedCat._id);
      if (!serverResponse.error) {
        this.appCatsArray.splice(this.editCatIndex, 1);
        this.editCatIndex = -1;
      }
      return serverResponse;
    } else {
      return {
        error: "no category selected"
      };
    }
  }
}) || _class);

/***/ }),

/***/ 4247:
/*!**************************************!*\
  !*** ./src/resources/data/events.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Events: function() { return /* binding */ Events; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _dataServices__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dataServices */ 5086);
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/utils */ 8741);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! moment */ 381);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_3__);
var _dec, _class;




let Events = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_dataServices__WEBPACK_IMPORTED_MODULE_1__.DataServices, _utils_utils__WEBPACK_IMPORTED_MODULE_2__.Utils), _dec(_class = class Events {
  constructor(data, utils) {
    this.EVENTS_SERVICE = 'events';
    this.data = data;
    this.utils = utils;
  }
  async getEventsArray(options, refresh) {
    if (!this.eventArray || refresh) {
      var url = this.EVENTS_SERVICE;
      url += options ? options : "";
      try {
        let serverResponse = await this.data.get(url);
        if (!serverResponse.error) {
          if (Object.prototype.toString.call(serverResponse) == '[object Array]') {
            this.eventArray = serverResponse;
          } else {
            this.eventArray = new Array();
            ;
          }
        } else {
          this.data.processError(serverResponse);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  async getEventsPersonArray(personId, refresh) {
    if (!this.eventArray || refresh) {
      var url = this.EVENTS_SERVICE + "/" + personId;
      try {
        let serverResponse = await this.data.get(url);
        if (!serverResponse.error) {
          if (Object.prototype.toString.call(serverResponse) == '[object Array]') {
            this.eventArray = serverResponse;
          } else {
            this.eventArray = new Array();
            ;
          }
        } else {
          this.data.processError(serverResponse);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  selectEvent(index) {
    if (index === undefined) {
      this.selectedEvent = this.emptyEvent();
    } else {
      this.selectedEvent = this.utils.copyObject(this.eventArray[index]);
      this.editIndex = index;
    }
  }
  selectEventById(eventId) {
    if (eventId == undefined) {
      this.selectedEvent = this.emptyEvent();
    } else {
      for (var i = 0; i < this.eventArray.length; i++) {
        if (this.eventArray[i]._id === eventId) {
          this.editIndex = i;
          this.selectedEvent = this.utils.copyObject(this.eventArray[i]);
          return;
        }
      }
    }
    this.selectedEvent = this.emptyEvent();
  }
  setEvent(event) {
    this.selectedEvent = this.utils.copyObject(event);
  }
  createEvent(event) {
    var obj = new Object();
    obj.title = event.eventTitle;
    obj.end = event.eventEnd;
    obj.start = event.eventStart;
    obj.eventType = "";
    obj.allDay = false;
    obj.notes = event.notes;
    obj.scope = event.scope ? "u" : "p";
    return obj;
  }
  emptyEvent() {
    var obj = new Object();
    obj.title = "";
    obj.eventType = "";
    obj.allDay = false;
    obj.notes = "";
    obj.scope = "p";
    return obj;
  }
  async saveEvent() {
    if (!this.selectedEvent._id) {
      let response = await this.data.saveObject(this.selectedEvent, this.EVENTS_SERVICE, "post");
      if (!response.error) {
        if (this.eventArray) {
          this.selectedEvent = response;
          this.eventArray.push(response);
        }
      } else {
        this.data.processError(response, "There was an error creating the event.");
      }
      return response;
    } else {
      let response = await this.data.saveObject(this.selectedEvent, this.EVENTS_SERVICE, "put");
      if (!response.error) {
        if (this.eventArray) {
          this.eventArray[this.editIndex] = this.utils.copyObject(this.selectedEvent, this.eventArray[this.editIndex]);
        }
      }
      return response;
    }
  }
  async deleteEvent() {
    if (this.selectedEvent._id) {
      let serverResponse = await this.data.deleteObject(this.EVENTS_SERVICE + '/' + this.selectedEvent._id);
      if (!serverResponse.error) {
        this.eventArray.splice(this.editIndex, 1);
        this.editIndex = -1;
      }
      return serverResponse;
    }
    return null;
  }
}) || _class);

/***/ }),

/***/ 8142:
/*!*******************************************!*\
  !*** ./src/resources/data/helpTickets.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HelpTickets: function() { return /* binding */ HelpTickets; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _dataServices__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dataServices */ 5086);
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/utils */ 8741);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! moment */ 381);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_4__);
var _dec, _class;





let HelpTickets = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_dataServices__WEBPACK_IMPORTED_MODULE_1__.DataServices, _utils_utils__WEBPACK_IMPORTED_MODULE_2__.Utils, _config_appConfig__WEBPACK_IMPORTED_MODULE_3__.AppConfig), _dec(_class = class HelpTickets {
  constructor(data, utils, config) {
    this.newHelpTicket = false;
    //Is the selected product a new product
    this.editIndex = void 0;
    //Index of selected product
    this.HELP_TICKET_SERVICES = 'helpTickets';
    this.HELP_TICKET_CONTENT_SERVICES = "helpTickets/content/HELPTICKETID/STATUS";
    this.HELP_TICKET_LOCK_SERVICES = "helpTicketLocks";
    this.HELP_TICKET_TYPES = "helpTicketsTypes";
    this.HELP_TICKET_EMAIL = "helpTickets/sendMail";
    this.NOTIFICATION_SERVICES = "notifications";
    this.data = data;
    this.utils = utils;
    this.config = config;
  }
  async getHelpTicketArray(options, refresh) {
    if (!this.helpTicketsArray || refresh) {
      var url = this.HELP_TICKET_SERVICES;
      url += options ? options : "";
      try {
        let serverResponse = await this.data.get(url);
        if (!serverResponse.error) {
          this.helpTicketsArray = serverResponse;
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  async getMyHelpTickets(id) {
    let serverResponse = await this.data.get(this.HELP_TICKET_SERVICES + '/mine/' + id);
    if (!serverResponse.error) {
      this.helpTicketsArray = serverResponse;
    }
  }
  async getUserHelpTicketArray(options, refresh) {
    if (!this.helpTicketsArray || refresh) {
      var url = this.HELP_TICKET_SERVICES + '/users';
      url += options ? options : "";
      try {
        let serverResponse = await this.data.get(url);
        if (!serverResponse.error) {
          this.helpTicketsArray = serverResponse;
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  async getArchivedHelpTicketArray(options, refresh) {
    if (!this.helpTicketsArray || refresh) {
      var url = this.HELP_TICKET_SERVICES + '/archived';
      url += options ? options : "";
      try {
        let serverResponse = await this.data.get(url);
        if (!serverResponse.error) {
          this.helpTicketsArray = serverResponse;
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  async getHelpTicketsArrayAnalytics(options, refresh) {
    if (!this.requestsArray || refresh) {
      var url = this.HELP_TICKET_SERVICES + "/analytics";
      url += options ? options : "";
      try {
        let serverResponse = await this.data.get(url);
        if (!serverResponse.error) {
          this.helpTicketArrayAnalytics = serverResponse;
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  async getHelpTicket(id) {
    if (id) {
      try {
        let serverResponse = await this.data.get(this.HELP_TICKET_SERVICES + "/" + id);
        if (!serverResponse.error) {
          this.selectedHelpTicket = serverResponse;
        }
        return serverResponse;
      } catch (error) {
        console.log(error);
        return undefined;
      }
    }
  }
  async getHelpTicketByNumber(id) {
    if (id) {
      try {
        let serverResponse = await this.data.get(this.HELP_TICKET_SERVICES + "?filter=helpTicketNo|eq|" + id);
        if (!serverResponse.error) {
          this.selectedHelpTicket = serverResponse[0];
        }
        return serverResponse;
      } catch (error) {
        console.log(error);
        return undefined;
      }
    }
  }
  async getArchiveHelpTicket(id) {
    if (id) {
      try {
        let serverResponse = await this.data.get(this.HELP_TICKET_SERVICES + "/archive" + "/" + id);
        if (!serverResponse.error) {
          this.selectedHelpTicket = serverResponse;
        }
        return serverResponse;
      } catch (error) {
        console.log(error);
        return undefined;
      }
    }
  }
  setHelpTicket(helpTicket) {
    if (!helpTicket) {
      this.emptyHelpTicket();
    } else {
      this.selectedHelpTicket = this.utils.copyObject(helpTicket);
    }
  }
  async getCurrentCount(options) {
    var url = this.HELP_TICKET_SERVICES + '/current/count';
    url += options ? "/" + options : "";
    var response = await this.data.get(url);
    if (!response.status) {
      this.newHelpTickets = this.utils.countItems(this.config.NEW_HELPTICKET_STATUS, 'helpTicketStatus', response);
      this.inProcessHelpTickets = this.utils.countItems(this.config.IN_PROCESS_HELPTICKET_STATUS, 'helpTicketStatus', response);
      this.underReviewHelpTickets = this.utils.countItems(this.config.UNDER_REVIEW_HELPTICKET_STATUS, 'helpTicketStatus', response);
      this.customerActionHelpTickets = this.utils.countItems(this.config.CUSTOMER_ACTION_HELPTICKET_STATUS, 'helpTicketStatus', response);
      return response.count;
    } else {
      return null;
    }
  }
  selectHelpTicket(index) {
    if (!index && index != 0) {
      this.emptyHelpTicket();
    } else {
      try {
        this.selectedHelpTicket = this.utils.copyObject(this.helpTicketsArray[index]);
        this.editIndex = index;
      } catch (error) {
        this.selectedHelpTicket = this.emptyHelpTicket();
      }
    }
  }
  updateHelpTicket(helpTicket) {
    for (let i = 0; i < this.helpTicketsArray.length; i++) {
      if (this.helpTicketsArray[i]._id === helpTicket._id) {
        this.helpTicketsArray[i] = this.utils.copyObject(helpTicket, this.helpTicketsArray[i]);
      }
    }
  }
  selectHelpTicketByID(id) {
    this.helpTicketsArray.forEach((item, index) => {
      if (item._id === id) {
        this.selectedHelpTicket = this.utils.copyObject(item);
        this.editIndex = index;
        return;
      }
    });
    return null;
  }
  emptyHelpTicket() {
    var newHelpTicketObj = new Object();
    newHelpTicketObj.sessionId = "";
    newHelpTicketObj.type = "";
    newHelpTicketObj.courseId = "";
    newHelpTicketObj.personId = "";
    newHelpTicketObj.helpTicketType = "";
    newHelpTicketObj.helpTicketStatus = this.config.NEW_HELPTICKET_STATUS;
    newHelpTicketObj.priority = "0";
    newHelpTicketObj.content = new Array();
    newHelpTicketObj.owner = new Array();
    newHelpTicketObj.createdDate = new Date();
    newHelpTicketObj.modifiedDate = new Date();
    newHelpTicketObj.audit = new Array();
    newHelpTicketObj.audit.push({
      event: 'Created',
      eventDate: new Date()
    });
    this.selectedHelpTicket = newHelpTicketObj;
    this.emptyHelpTicketContent();
  }
  selectHelpTicketContent(index) {
    if (!index && index != 0) {
      this.emptyHelpTicketContent();
    } else {
      try {} catch (error) {
        console.log(error);
        this.emptyHelpTicketContent();
      }
    }
  }
  emptyHelpTicketContent() {
    var newHelpTicketContent = new Object();
    newHelpTicketContent.type = 0;
    newHelpTicketContent.createdDate = new Date();
    newHelpTicketContent.helpTicketId = "";
    newHelpTicketContent.files = new Array();
    newHelpTicketContent.confidential = false;
    newHelpTicketContent.personId = "";
    newHelpTicketContent.content = {};
    newHelpTicketContent.content.comments = "";
    this.selectedHelpTicketContent = newHelpTicketContent;
  }
  async getOwner(id) {
    let serverResponse = await this.data.get(this.HELP_TICKET_SERVICES + '/owner/' + id);
    return serverResponse;
  }
  async updateOwner(obj) {
    if (!this.selectedHelpTicket) {
      return;
    }
    var response = await this.data.saveObject(obj, this.HELP_TICKET_SERVICES + "/owner/" + this.selectedHelpTicket._id, "put");
    if (!response.error) {
      this.selectedHelpTicket = response;
      this.updateHelpTicket(this.selectedHelpTicket);
    } else {
      this.data.processError(response, "There was an error updating the help ticket.");
    }
    return response;
  }
  async updateStatus(email) {
    if (!this.selectedHelpTicket) {
      return;
    }
    var response = await this.data.saveObject(this.selectedHelpTicket, this.HELP_TICKET_SERVICES + "/status/" + this.selectedHelpTicket._id, "put");
    if (!response.error) {
      this.helpTicketsArray[this.editIndex].helpTicketStatus = response.helpTicketStatus;
    } else {
      this.data.processError(response, "There was an error updating the help ticket.");
    }
    return response;
  }
  async updateKeywords() {
    if (!this.selectedHelpTicket) {
      return;
    }
    var response = await this.data.saveObject(this.selectedHelpTicket, this.HELP_TICKET_SERVICES + "/keywords/" + this.selectedHelpTicket._id, "put");
    if (!response.error) {
      this.helpTicketsArray[this.editIndex].keyWords = response.keyWords;
    } else {
      this.data.processError(response, "There was an error updating the help ticket.");
    }
    return response;
  }
  async reopenHelpTicket() {
    if (!this.selectedHelpTicket) {
      return;
    }
    if (this.selectedHelpTicketContent) this.selectedHelpTicket.content.push(this.selectedHelpTicketContent);
    var url = this.HELP_TICKET_SERVICES + '/reopen';
    var response = await this.data.saveObject(this.selectedHelpTicket, url, "put");
    if (!response.error) {} else {
      this.data.processError(response, "There was an error updating the help ticket.");
    }
    return response;
  }
  async closeHelpTicket() {
    if (!this.selectedHelpTicket) {
      return;
    }
    if (this.selectedHelpTicketContent) this.selectedHelpTicket.content.push(this.selectedHelpTicketContent);
    var response = await this.data.saveObject(this.selectedHelpTicket, this.HELP_TICKET_SERVICES + '/close', "put");
    if (!response.error) {
      this.helpTicketsArray.splice(this.editIndex, 1);
    } else {
      this.data.processError(response, "There was an error updating the help ticket.");
    }
    return response;
  }
  async saveHelpTicket(email) {
    if (!this.selectedHelpTicket) {
      return;
    }
    var url = this.HELP_TICKET_SERVICES;
    if (!this.selectedHelpTicket._id) {
      var response = await this.data.saveObject(this.selectedHelpTicket, url, "post");
      if (!response.error) {
        if (email && email.email) {
          let HTNo = response.helpTicketNo ? response.helpTicketNo : " ";
          email.subject = email.subject.replace('[[No]]', HTNo);
          email.MESSAGE = email.MESSAGE.replace('[[No]]', HTNo);
          this.data.saveObject(email, this.HELP_TICKET_EMAIL, "post");
        }
        this.selectedHelpTicket = this.utils.copyObject(response);
        if (this.helpTicketsArray) this.helpTicketsArray.push(this.selectedHelpTicket);
      } else {
        this.data.processError(response, "There was an error creating the help ticket.");
      }
      return response;
    } else {
      var status = this.selectedHelpTicket.helpTicketStatus;
      var response = await this.data.saveObject(this.selectedHelpTicket, url, "put");
      if (!response.error) {
        if (email && email.email) {
          this.selectedHelpTicket = this.utils.copyObject(response);
          this.data.saveObject(email, this.HELP_TICKET_EMAIL, "post");
        }
        this.selectHelpTicketByID(this.selectedHelpTicket._id);
        if (status !== this.config.CLOSED_HELPTICKET_STATUS) {
          // this.updateHelpTicket(this.selectedHelpTicket);
          this.helpTicketsArray[this.editIndex] = this.utils.copyObject(response, this.helpTicketsArray[this.editIndex]);
        } else {
          this.helpTicketsArray.splice(this.editIndex, 1);
        }
      } else {
        this.data.processError(response, "There was an error updating the help ticket.");
      }
      return response;
    }
  }
  async saveHelpTicketResponse(email) {
    if (this.selectedHelpTicket._id) {
      var url = this.HELP_TICKET_CONTENT_SERVICES.replace("HELPTICKETID", this.selectedHelpTicket._id).replace("STATUS", this.selectedHelpTicket.helpTicketStatus);
      var response = await this.data.saveObject(this.selectedHelpTicketContent, url, "put");
      if (!response.error) {
        if (!this.selectedHelpTicketContent.confidential && email.email) this.data.saveObject(email, this.HELP_TICKET_EMAIL, "post");
        this.selectedHelpTicket = this.utils.copyObject(response);
        this.updateHelpTicket(this.selectedHelpTicket);
        // this.helpTicketsArray[this.editIndex] = this.utils.copyObject(this.selectedHelpTicket, this.helpTicketsArray[this.editIndex]);
      } else {
        this.data.processError(response, "There was an error updating the help ticket.");
      }
      return response;
    }
  }
  async saveHelpTicketResponseAndCLose(email) {
    if (this.selectedHelpTicket._id) {
      var url = this.HELP_TICKET_CONTENT_SERVICES.replace("HELPTICKETID", this.selectedHelpTicket._id).replace("STATUS", this.selectedHelpTicket.helpTicketStatus);
      var response = await this.data.saveObject(this.selectedHelpTicketContent, url, "put");
      if (!response.error) {
        if (!this.selectedHelpTicketContent.confidential && email.email) this.data.saveObject(email, this.HELP_TICKET_EMAIL, "post");
        this.selectedHelpTicket = this.utils.copyObject(response);
        this.updateHelpTicket(this.selectedHelpTicket);
        this.helpTicketsArray[this.editIndex] = this.utils.copyObject(this.selectedHelpTicket, this.helpTicketsArray[this.editIndex]);
      } else {
        this.data.processError(response, "There was an error updating the help ticket.");
      }
      return response;
    }
  }
  saveNotification(notice) {
    this.data.saveObject(notice, this.NOTIFICATION_SERVICES, "post");
  }
  isHelpTicketDirty(obj, skip) {
    if (this.selectedHelpTicket) {
      if (!this.selectedHelpTicket._id) {
        //     var obj = obj ? this.helpTicketsArray[this.editIndex] : obj;
        // } else {
        var obj = this.emptyHelpTicket();
      }
      return this.utils.objectsEqual(this.selectedHelpTicket, obj, skip);
    }
    return new Array();
  }
  async uploadFile(files, content) {
    let response = await this.data.uploadFiles(files, this.HELP_TICKET_SERVICES + "/upload/" + this.selectedHelpTicket._id + '/' + this.selectedHelpTicket.helpTicketNo + '/' + content);
    if (!response.error) {
      if (this.selectedHelpTicket) this.selectedHelpTicket = this.utils.copyObject(response);
      if (this.helpTicketsArray && this.editIndex) this.updateHelpTicket(this.selectHelpTicket);
      // this.helpTicketsArray[this.editIndex] = this.utils.copyObject(this.selectedHelpTicket, this.helpTicketsArray[this.editIndex]);
    }
  }

  async uploadFileArchive(files, content) {
    let response = await this.data.uploadFiles(files, this.HELP_TICKET_SERVICES + "/uploadArchive/" + this.selectedHelpTicket._id + '/' + this.selectedHelpTicket.helpTicketNo + '/' + content);
    if (!response.error) {
      if (this.selectedHelpTicket) this.selectedHelpTicket = this.utils.copyObject(response);
      if (this.helpTicketsArray && this.editIndex) this.updateHelpTicket(this.selectHelpTicket);
      // this.helpTicketsArray[this.editIndex] = this.utils.copyObject(this.selectedHelpTicket, this.helpTicketsArray[this.editIndex]);
    }
  }

  calcHelpTicketAges() {
    this.helpTickeAges = {
      today: [0, 0],
      yesterday: [0, 0],
      oneWeek: [0, 0],
      twoWeeks: [0, 0],
      older: [0, 0]
    };
    let today = moment__WEBPACK_IMPORTED_MODULE_4___default()(new Date());
    this.helpTicketsArray.forEach(item => {
      // let index = item.owner[0].personId === null ? 1 : 0;
      let ageCreated = today.diff(moment__WEBPACK_IMPORTED_MODULE_4___default()(item.createdDate), 'days');
      let ageModifed = today.diff(moment__WEBPACK_IMPORTED_MODULE_4___default()(item.modifiedDate), 'days');
      if (ageCreated === 0) {
        this.helpTickeAges.today[0] += 1;
      } else if (ageCreated === 1) {
        this.helpTickeAges.yesterday[0] += 1;
      } else if (ageCreated <= 7) {
        this.helpTickeAges.oneWeek[0] += 1;
      } else if (ageCreated <= 14) {
        this.helpTickeAges.twoWeeks[0] += 1;
      } else {
        this.helpTickeAges.older[0] += 1;
      }
      if (ageModifed === 0) {
        this.helpTickeAges.today[1] += 1;
      } else if (ageModifed === 1) {
        this.helpTickeAges.yesterday[1] += 1;
      } else if (ageModifed <= 7) {
        this.helpTickeAges.oneWeek[1] += 1;
      } else if (ageModifed <= 14) {
        this.helpTickeAges.twoWeeks[1] += 1;
      } else {
        this.helpTickeAges.older[1] += 1;
      }
    });
  }
  async getHelpTicketTypes(options, refresh) {
    if (!this.helpTicketTypesArray || refresh) {
      var url = this.HELP_TICKET_TYPES;
      url += options ? options : "";
      try {
        let serverResponse = await this.data.get(url);
        if (!serverResponse.error) {
          this.helpTicketTypesArray = serverResponse.sort((a, b) => {
            return a.category < b.category ? 0 : -1;
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  selectHelpTicketTypeCategory(index) {
    if (!index && index != 0) {
      this.selectedHelpTicketType = this.emptyHelpTicketType();
    } else {
      try {
        this.selectedHelpTicketType = this.utils.copyObject(this.helpTicketTypesArray[index]);
        this.editTypeIndex = index;
      } catch (error) {
        this.selectedHelpTicket = this.emptyHelpTicketType();
      }
    }
  }
  emptyHelpTicketType() {
    let obj = new Object();
    return obj;
  }
  async saveHelpTicketType() {
    if (!this.selectedHelpTicketType) {
      return;
    }
    var url = this.HELP_TICKET_TYPES;
    if (!this.selectedHelpTicketType._id) {
      var response = await this.data.saveObject(this.selectedHelpTicket, url, "post");
      if (!response.error) {
        this.selectedHelpTicketType = this.utils.copyObject(response);
        if (this.helpTicketTypesArray) this.helpTicketTypesArray.push(this.selectedHelpTicketType);
      } else {
        this.data.processError(response, "There was an error creating the help ticket type.");
      }
      return response;
    } else {
      var response = await this.data.saveObject(this.selectedHelpTicketType, url, "put");
      if (!response.error) {
        this.selectedHelpTicketType = this.utils.copyObject(response);
        this.helpTicketTypesArray[this.editTypeIndex] = this.utils.copyObject(this.selectedHelpTicketType, this.helpTicketTypesArray[this.editTypeIndex]);
      } else {
        this.data.processError(response, "There was an error updating the help ticket type.");
      }
      return response;
    }
  }
  async countHelpTicketsStatus(status) {
    let response = await this.data.get(this.HELP_TICKET_SERVICES + '/count/' + status);
    return response;
  }
  groupRequestsByType() {
    if (!this.helpTicketArrayAnalytics) {
      return;
    }
    var sortedArray = this.helpTicketArrayAnalytics.sort((a, b) => {
      var result = a.helpTicketType < b.helpTicketType ? -1 : a.helpTicketType > b.helpTicketType ? 1 : 0;
      return result;
    });
    this.helpTicketTypeArrayAnalytics = new Array();
    var type = "";
    var templateObj = new Object({
      helpTicketType: "",
      count: 0
    });
    sortedArray.forEach(item => {
      if (item.helpTicketType != type) {
        type = item.helpTicketType;
        var obj = this.utils.copyObject(templateObj);
        obj.helpTicketType = item.helpTicketType;
        this.helpTicketTypeArrayAnalytics.push(obj);
      }
      this.helpTicketTypeArrayAnalytics[this.helpTicketTypeArrayAnalytics.length - 1].count += 1;
    });
  }
  groupRequestsByCurriculum() {
    if (!this.helpTicketArrayAnalytics) {
      return;
    }
    let filteredArray = this.helpTicketArrayAnalytics.filter(item => {
      return item.content[0].content.curriculumTitle != undefined;
    });
    var sortedArray = filteredArray.sort((a, b) => {
      var result = a.content[0].content.curriculumTitle < b.content[0].content.curriculumTitle ? -1 : a.content[0].content.curriculumTitle > b.content[0].content.curriculumTitle ? 1 : 0;
      return result;
    });
    this.helpTicketCurriculumArrayAnalytics = new Array();
    var type = "";
    var templateObj = new Object({
      curriculum: "",
      count: 0
    });
    sortedArray.forEach(item => {
      if (item.content[0].content.curriculumTitle != type) {
        type = item.content[0].content.curriculumTitle;
        var obj = this.utils.copyObject(templateObj);
        obj.curriculumTitle = item.content[0].content.curriculumTitle;
        this.helpTicketCurriculumArrayAnalytics.push(obj);
      }
      if (this.helpTicketCurriculumArrayAnalytics[this.helpTicketCurriculumArrayAnalytics.length - 1]) this.helpTicketCurriculumArrayAnalytics[this.helpTicketCurriculumArrayAnalytics.length - 1].count += 1;
    });
  }
  groupHelpTicketsByInstitution() {
    if (!this.helpTicketArrayAnalytics) {
      return;
    }
    var sortedArray = this.helpTicketArrayAnalytics.sort((a, b) => {
      var result = a.institutionId.name < b.institutionId.name ? -1 : a.institutionId.name > b.institutionId.name ? 1 : 0;
      return result;
    });
    this.helpTicketInstitutionArrayAnalytics = new Array();
    var type = "";
    var templateObj = new Object({
      institution: "",
      count: 0
    });
    sortedArray.forEach(item => {
      if (item.institutionId.name != type) {
        type = item.institutionId.name;
        var obj = this.utils.copyObject(templateObj);
        obj.institution = item.institutionId.name;
        this.helpTicketInstitutionArrayAnalytics.push(obj);
      }
      if (this.helpTicketInstitutionArrayAnalytics[this.helpTicketInstitutionArrayAnalytics.length - 1]) this.helpTicketInstitutionArrayAnalytics[this.helpTicketInstitutionArrayAnalytics.length - 1].count += 1;
    });
  }
  groupHelpTicketsByPeople() {
    if (!this.helpTicketArrayAnalytics) {
      return;
    }
    var sortedArray = this.helpTicketArrayAnalytics.sort((a, b) => {
      if (!a['personId'] || !b['personId']) return -1;
      var result = a.personId.fullName < b.personId.fullName ? -1 : a.personId.fullName > b.personId.fullName ? 1 : 0;
      return result;
    });
    this.helpTicketPeopleArrayAnalytics = new Array();
    var type = "";
    var templateObj = new Object({
      name: "",
      count: 0
    });
    sortedArray.forEach(item => {
      if (item.personId) {
        if (item.personId.fullName != type) {
          type = item.personId.fullName;
          var obj = this.utils.copyObject(templateObj);
          obj.name = item.personId.fullName;
          this.helpTicketPeopleArrayAnalytics.push(obj);
        }
        if (this.helpTicketPeopleArrayAnalytics[this.helpTicketPeopleArrayAnalytics.length - 1]) this.helpTicketPeopleArrayAnalytics[this.helpTicketPeopleArrayAnalytics.length - 1].count += 1;
      }
    });
  }
  groupHelpTicketsByStatus() {
    if (!this.helpTicketArrayAnalytics) {
      return;
    }
    var sortedArray = this.helpTicketArrayAnalytics.sort((a, b) => {
      var result = a.helpTicketStatus < b.helpTicketStatus ? -1 : a.helpTicketStatus > b.helpTicketStatus ? 1 : 0;
      return result;
    });
    this.helpTicketStatusArrayAnalytics = new Array();
    var type = "";
    var templateObj = new Object({
      helpTicketStatus: "",
      count: 0
    });
    sortedArray.forEach(item => {
      if (item.helpTicketStatus != type) {
        type = item.helpTicketStatus;
        var obj = this.utils.copyObject(templateObj);
        obj.helpTicketStatus = item.helpTicketStatus;
        this.helpTicketStatusArrayAnalytics.push(obj);
      }
      if (this.helpTicketStatusArrayAnalytics[this.helpTicketStatusArrayAnalytics.length - 1]) this.helpTicketStatusArrayAnalytics[this.helpTicketStatusArrayAnalytics.length - 1].count += 1;
    });
  }
  async archiveSearch(searchObj, collection) {
    if (searchObj) {
      var url = this.HELP_TICKET_SERVICES + "/archive" + (collection ? '/' + collection : '');
      var resultArray = new Array();
      let response = await this.data.saveObject(searchObj, url, "post");
      if (!response.error) {
        resultArray = response;
        return resultArray;
      } else {
        return new Array();
      }
    }
  }
  advancedSearch(searchObj) {
    var resultArray = this.utils.copyArray(this.helpTicketsArray);
    if (searchObj.helpTicketNo.length > 0) {
      resultArray = resultArray.filter(item => {
        return item.helpTicketNo == searchObj.helpTicketNo;
      });
    } else {
      //Dates
      if (searchObj.dateRange && searchObj.dateRange.dateFrom !== "" && searchObj.dateRange.dateFrom !== "Invalid date") {
        if (!searchObj.dateRange.dateTo || searchObj.dateRange.dateTo == "Invalid date") {
          resultArray = resultArray.filter(item => {
            var dt = moment__WEBPACK_IMPORTED_MODULE_4___default()(item.createdDate).format('YYYY-MM-DD');
            return moment__WEBPACK_IMPORTED_MODULE_4___default()(item.createdDate).isAfter(searchObj.dateRange.dateFrom);
          });
        } else {
          resultArray = resultArray.filter(item => {
            var dt = moment__WEBPACK_IMPORTED_MODULE_4___default()(item.createdDate).format('YYYY-MM-DD');
            return moment__WEBPACK_IMPORTED_MODULE_4___default()(item.createdDate).isAfter(searchObj.dateRange.dateFrom) && moment__WEBPACK_IMPORTED_MODULE_4___default()(item.createdDate).isBefore(searchObj.dateRange.dateTo);
          });
        }
      }
      //Status
      if (searchObj.status && searchObj.status.length > 0) {
        for (var i = 0; i < searchObj.status.length; i++) {
          searchObj.status[i] = parseInt(searchObj.status[i]);
        }
        resultArray = resultArray.filter(item => {
          return searchObj.status.indexOf(item.helpTicketStatus) > -1;
        });
      }
      //Keywords
      if (searchObj.keyWords && searchObj.keyWords.length > 0) {
        var searchKeyword = searchObj.keyWords.toUpperCase();
        resultArray = resultArray.filter(item => {
          if (item.keyWords) {
            var htKeyword = item.keyWords.toUpperCase();
            return htKeyword.indexOf(searchKeyword) > -1;
          } else {
            return false;
          }
        });
      }
      //Content
      if (searchObj.content && searchObj.content.length > 0) {
        var searchContent = searchObj.content.toUpperCase();
        resultArray = resultArray.filter(item => {
          for (var i = 0; i < item.content.length; i++) {
            if (item.content[i].content.comments.toUpperCase().indexOf(searchContent) > -1) {
              return true;
            }
          }
          return false;
        });
      }
      //Type
      if (searchObj.type && searchObj.type != -1) {
        resultArray = resultArray.filter(item => {
          return searchObj.type == item.helpTicketType;
        });
      }

      //Products
      if (searchObj.productIds && searchObj.productIds.length > 0) {
        resultArray = resultArray.filter(item => {
          return searchObj.productIds.indexOf(item.productId) > -1;
        });
      }

      //People
      if (searchObj.peopleIds && searchObj.peopleIds.length > 0) {
        resultArray = resultArray.filter(item => {
          return searchObj.peopleIds.indexOf(item.personId._id) > -1;
        });
      }

      //Instituions
      if (searchObj.institutionIds && searchObj.institutionIds.length > 0) {
        resultArray = resultArray.filter(item => {
          return searchObj.institutionIds.indexOf(item.institutionId._id) > -1;
        });
      }
    }
    return resultArray;
  }
  lockHelpTicket(obj) {
    if (obj.helpTicketId) {
      var response = this.data.saveObject(obj, this.HELP_TICKET_LOCK_SERVICES, "post");
    }
  }
  async getHelpTicketLock(id) {
    var response = await this.data.get(this.HELP_TICKET_LOCK_SERVICES + "/" + id);
    if (!response.error) {
      return response;
    } else {
      this.data.processError(response, "There was an error retrieving the help ticket lock.");
    }
  }
  removeHelpTicketLock(id) {
    var response = this.data.deleteObject(this.HELP_TICKET_LOCK_SERVICES + "/" + id);
  }
  async archiveHelpTickets() {
    let response = await this.data.saveObject({}, this.HELP_TICKET_SERVICES + '/archiveClosed', "post");
    return response;
  }
}) || _class);

/***/ }),

/***/ 5151:
/*!*****************************************!*\
  !*** ./src/resources/data/inventory.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Inventory: function() { return /* binding */ Inventory; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _dataServices__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dataServices */ 5086);
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/utils */ 8741);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
var _dec, _class;




let Inventory = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_dataServices__WEBPACK_IMPORTED_MODULE_1__.DataServices, _utils_utils__WEBPACK_IMPORTED_MODULE_2__.Utils, _config_appConfig__WEBPACK_IMPORTED_MODULE_3__.AppConfig), _dec(_class = class Inventory {
  constructor(data, utils, config) {
    this.INVENTORY_SERVICE = 'inventory';
    this.data = data;
    this.utils = utils;
    this.config = config;
  }

  //Downloads
  async getInventoryArray(options, refresh) {
    if (!this.inventoryArray || refresh) {
      var url = this.INVENTORY_SERVICE;
      url += options ? options : "";
      try {
        let serverResponse = await this.data.get(url);
        if (!serverResponse.error) {
          this.inventoryArray = serverResponse;
        } else {
          return undefined;
        }
      } catch (error) {
        console.log(error);
        return undefined;
      }
    }
    return this.inventoryArray;
  }
  selectInventory(index) {
    if (!index && index != 0) {
      this.selectedInventory = this.emptyInventory();
    } else {
      try {
        this.selectedInventory = this.utils.copyObject(this.inventoryArray[index]);
        this.selectedIndex = index;
      } catch (error) {
        this.selectedInventory = this.emptyInventory();
      }
    }
  }
  emptyInventory() {
    var newObj = new Object();
    newObj.IPAddress = new Array();
    return newObj;
  }
  async saveInventory() {
    if (!this.selectedInventory) {
      return;
    }
    if (!this.selectedInventory._id) {
      let serverResponse = await this.data.saveObject(this.selectedInventory, this.INVENTORY_SERVICE, "post");
      if (!serverResponse.error) {
        this.selectedInventory = serverResponse;
        this.inventoryArray.push(this.selectedInventory);
        this.selectedIndex = this.inventoryArray.length - 1;
      }
      return serverResponse;
    } else {
      var serverResponse = await this.data.saveObject(this.selectedInventory, this.INVENTORY_SERVICE, "put");
      if (!serverResponse.error) {
        this.inventoryArray[this.selectedIndex] = this.utils.copyObject(this.selectedInventory, this.inventoryArray[this.selectedIndex]);
      }
      return serverResponse;
    }
  }
  isDirty(obj) {
    if (this.selectedInventory) {
      if (!obj) {
        var obj = this.emptyInventory();
      }
      var skip = ['file'];
      return this.utils.objectsEqual(this.selectedInventory, obj, skip);
    }
    return new Array();
  }
  async deleteInventory() {
    if (this.selectedInventory._id) {
      var response = this.data.deleteObject(this.INVENTORY_SERVICE + "/" + this.selectedInventory._id);
    }
  }
}) || _class);

/***/ }),

/***/ 5175:
/*!*************************************!*\
  !*** ./src/resources/data/is4ua.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   is4ua: function() { return /* binding */ is4ua; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _dataServices__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dataServices */ 5086);
var _dec, _class;


let is4ua = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_dataServices__WEBPACK_IMPORTED_MODULE_1__.DataServices), _dec(_class = class is4ua {
  constructor(data) {
    this.data = data;
  }
  async loadIs4ua() {
    // if(!this.personStatusArray){
    let responses = await this.data.get(this.data.IS4UA);
    this.personStatusArray = responses[0].personStatus;
    this.deptArray = responses[0].deptCat;
    this.specialArray = responses[0].personSpecialization;
    this.sapProductsArray = responses[0].sapProducts;
    this.uaCurriculumArray = responses[0].uaCurriculum;
    this.uaDataSetsArray = responses[0].uaDatasets;
    this.institutonStatusArray = responses[0].institutionStatus;
    this.institutionTypes = responses[0].institutionTypes;
    this.memberTypes = responses[0].memberTypes;
    this.highestDegrees = responses[0].highestDegree;
    // }
  }

  async loadProductKeys() {
    let responses = await Promise.all([this.data.getAllObjects(this.data.SAP_PRODUCTS), this.data.getAllObjects(this.data.UA_CURRICULUM), this.data.getAllObjects(this.data.UA_DATA_SETS)]);
    this.sapProductsArray = responses[0];
    this.uaCurriculumArray = responses[1];
    this.uaDataSetsArray = responses[2];
  }
  async loadPeopleKeys() {
    let responses = await Promise.all([this.data.getAllObjects(this.data.UA_PERSON_STATUS), this.data.getAllObjects(this.data.UA_PERSON_DEPT), this.data.getAllObjects(this.data.UA_PERSON_SPECIAL)]);
    this.personStatusArray = responses[0];
    this.deptArray = responses[1];
    this.specialArray = responses[2];
  }
  async loadInstitutionKeys() {
    let responses = await Promise.all([this.data.getAllObjects(this.data.UA_INST_STATUS), this.data.getAllObjects(this.data.UA_INST_TYPES), this.data.getAllObjects(this.data.UA_MEMBER_TYPES), this.data.getAllObjects(this.data.UA_INST_DEGREES)]);
    this.institutonStatusArray = responses[0];
    this.institutionTypes = responses[1];
    this.memberTypes = responses[2];
    this.highestDegrees = responses[3];
  }
}) || _class);

/***/ }),

/***/ 353:
/*!**************************************!*\
  !*** ./src/resources/data/people.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   People: function() { return /* binding */ People; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _dataServices__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dataServices */ 5086);
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/utils */ 8741);
var _dec, _class;



let People = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_dataServices__WEBPACK_IMPORTED_MODULE_1__.DataServices, _utils_utils__WEBPACK_IMPORTED_MODULE_2__.Utils), _dec(_class = class People {
  constructor(data, utils) {
    this.newObject = false;
    this.cleanObject = true;
    this.peopleArray = undefined;
    this.UCC_STAFF_SERVICE = 'uccStaff';
    this.PEOPLE_SERVICE = "people";
    this.PERSON_REGISTER = "people/register";
    this.CHECK_EMAIL = 'people/checkEmail';
    this.CHECK_NAME = 'people/checkName';
    this.SEND_MAIL = 'people/sendMail';
    this.PASSWORD_RESET = 'passwordReset';
    this.NOTES_SERVICE = "notes";
    this.TECHNOTES_SERVICE = "techNotes";
    this.TECHNOTESCAT_SERVICE = "technotecats";
    this.INSTITUTION_SERVICES = "institutions";
    this.COURSES_SERVICE = 'courses';
    this.PEOPLE_UPLOAD_SERVICE = '/people/upload/';
    this.NOTIFICATION_SERVICE = 'notifications';
    this.PACKAGES_SERVICES = 'apj/packages';
    this.data = data;
    this.utils = utils;
  }
  async getPeopleArray(options, refresh) {
    if (!this.peopleArray || refresh) {
      var url = this.PEOPLE_SERVICE;
      url += options ? options : "";
      try {
        let serverResponse = await this.data.get(url);
        if (!serverResponse.error) {
          this.peopleArray = serverResponse;
        } else {
          this.data.processError(serverResponse);
          return undefined;
        }
      } catch (error) {
        console.log(error);
        return undefined;
      }
    }
    return this.peopleArray;
  }
  async getUCCStaff(uccRoles) {
    var url = this.UCC_STAFF_SERVICE + '/' + uccRoles;
    try {
      let serverResponse = await this.data.get(url);
      if (!serverResponse.error) {
        this.uccPeople = serverResponse;
      } else {
        this.data.processError(serverResponse);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async getInstitutionPeople(options, refresh) {
    if (!this.peopleArray || refresh) {
      var url = this.PEOPLE_SERVICE;
      url += options ? options : "";
      try {
        let serverResponse = await this.data.get(url);
        if (!serverResponse.error) {
          this.instutionPeopleArray = serverResponse;
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  async getPeopleBulkEmailArray(options, refresh) {
    if (!this.peopleBulkEmailArray || refresh) {
      var url = this.PEOPLE_SERVICE + '/bulkEmail';
      url += options ? options : "";
      try {
        let serverResponse = await this.data.get(url);
        if (!serverResponse.error) {
          this.peopleBulkEmailArray = serverResponse;
        } else {
          this.data.processError(serverResponse);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  async getNotifications(personId) {
    this.notificationsArray = [];
    let response = await this.data.get(this.NOTIFICATION_SERVICE + "/" + personId + "?filter=checked|eq|false&order=dateCreated:DSC" + false);
    if (!response.error) {
      this.notificationsArray = response;
    }
  }
  saveNotification(notice) {
    this.data.saveObject(notice, this.NOTIFICATION_SERVICE, "put");
  }
  async getPerson(id) {
    var url = this.PEOPLE_SERVICE + "/" + id;
    try {
      let serverResponse = await this.data.get(url);
      if (!serverResponse.error) {
        this.selectedPerson = serverResponse;
      } else {
        this.selectedPerson = undefined;
        this.data.processError(serverResponse);
      }
    } catch (error) {
      this.selectedPerson = undefined;
      console.log(error);
      return this.selectedPerson;
    }
  }
  selectPerson(index, array) {
    if (index === undefined) {
      this.selectedPerson = this.emptyPerson();
    } else {
      if (array && array === 'i') {
        this.selectedPerson = this.utils.copyObject(this.instutionPeopleArray[index]);
        this.editIndex = index;
      } else {
        this.selectedPerson = this.utils.copyObject(this.peopleArray[index]);
        this.editIndex = index;
      }
    }
  }
  selectedPersonFromId(id, array) {
    if (array && array === 'i') {
      this.instutionPeopleArray.forEach((item, index) => {
        if (item._id === id) {
          this.editIndex = index;
          this.selectedPerson = this.utils.copyObject(item);
        }
      });
      return;
    } else {
      this.peopleArray.forEach((item, index) => {
        if (item._id === id) {
          this.editIndex = index;
          this.selectedPerson = this.utils.copyObject(item);
        }
      });
      return;
    }
  }
  setSelectedPerson(userObj) {
    if (userObj) {
      this.selectedPerson = this.utils.copyObject(userObj);
    }
  }
  emptyPerson() {
    var obj = new Object();
    obj.lastName = "";
    obj.firstName = "";
    obj.middleName = "";
    obj.lastName = "";
    obj.nickName = "";
    obj.status = "";
    obj.phone = "";
    obj.mobile = "";
    obj.email = "";
    obj.gender = "";
    obj.roles = new Array();
    obj.roles.push("USER");
    obj.password = "";
    obj.institution = "";
    obj.active = false;
    obj.coursesArray = new Array();
    obj.file = new Object();
    var auditObj = {
      property: "Created",
      eventDate: new Date()
    };
    obj.audit = [auditObj];
    return obj;
  }
  async checkEmail() {
    if (this.selectedPerson.email) {
      let serverResponse = await this.data.get(this.CHECK_EMAIL + '?email=' + this.selectedPerson.email);
      if (serverResponse.code === 409) {
        return true;
      } else {
        return false;
      }
    }
  }
  async checkName() {
    if (this.selectedPerson.firstName && this.selectedPerson.lastName && this.selectedPerson.institutionId) {
      let serverResponse = await this.data.get(thisCHECK_NAME + '?filter=[and]firstName|eq|' + this.selectedPerson.firstName + ':lastName|eq|' + this.selectedPerson.lastName + ':institutionId|eq|' + this.selectedPerson.institutionId);
      if (serverResponse.code === 409) {
        return true;
      } else {
        return false;
      }
    }
  }
  async savePerson(register) {
    if (!this.selectedPerson._id) {
      if (register) {
        var url = this.PERSON_REGISTER;
      } else {
        var url = this.PEOPLE_SERVICE;
      }
      let response = await this.data.saveObject(this.selectedPerson, url, "post");
      if (!response.error) {
        if (this.peopleArray) {
          this.peopleArray.push(response);
          ;
        }
      } else {
        this.data.processError(response, "There was an error creating the account.");
      }
      return response;
    } else {
      let response = await this.data.saveObject(this.selectedPerson, this.PEOPLE_SERVICE, "put");
      if (!response.error) {
        if (this.peopleArray) {
          this.peopleArray[this.editIndex] = this.utils.copyObject(this.selectedPerson, this.peopleArray[this.editIndex]);
        }
      }
      return response;
    }
  }
  async deletePerson() {
    if (this.selectedPerson._id) {
      let serverResponse = await this.data.deleteObject(this.PEOPLE_SERVICE + '/' + this.selectedPerson._id);
      if (!serverResponse.error) {
        this.peopleArray.splice(this.editIndex, 1);
        this.editIndex = -1;
      }
      return serverResponse;
    }
    return null;
  }
  isPersonDirty(originalObj) {
    if (this.selectedPerson) {
      if (originalObj) {
        var obj = originalObj;
      } else if (this.selectedPerson._id) {
        var obj = this.selectedPersonFromId(this.selectedPerson._id);
      } else {
        var obj = this.emptyPerson();
      }
      return this.utils.objectsEqual(this.selectedPerson, obj);
    }
  }
  async uploadFile(files) {
    let response = await this.data.uploadFiles(files, this.PEOPLE_UPLOAD_SERVICE + "/" + this.selectedPerson._id);
  }
  async uploadTechFile(files, id) {
    let response = await this.data.uploadFiles(files, this.TECHNOTES_SERVICE + "/upload/" + id);
  }
  async sendCustomerMessage(message) {
    if (message.email) {
      var serverResponse = await this.data.saveObject(message, this.SEND_MAIL, "put");
      return serverResponse;
    } else {
      return {
        error: "no email"
      };
    }
  }
  sendNewRegisterEmail(email) {
    this.data.saveObject(email, this.PERSON_REGISTER + "/facDev", 'post');
  }
  sendBuikEmail(email) {
    if (email.email) {
      var serverResponse = this.data.saveObject(email, this.PEOPLE_SERVICE + '/sendBulkEmail', "post");
      return serverResponse;
    } else {
      return {
        error: "no email"
      };
    }
  }
  async getEmailLog(options, refresh) {
    if (!this.selectedPerson._id) {
      return;
    }
    if (!this.emailArray || refresh) {
      var url = this.PEOPLE_SERVICE + "/emailLog";
      url += options ? options : "";
      try {
        let serverResponse = await this.data.get(url);
        if (!serverResponse.error) {
          this.emailArray = serverResponse;
        } else {
          this.data.processError(serverResponse);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  updatePassword(obj) {
    if (this.selectedPerson._id) {
      return this.data.saveObject(obj, this.PEOPLE_SERVICE + '/password/' + this.selectedPerson._id, "put");
    }
  }
  activateAccountEmail(email) {
    this.data.saveObject(email, this.PEOPLE_SERVICE + "/facDev/activate", 'post');
  }
  async countPeopleStatus(status) {
    let response = await this.data.get(this.PEOPLE_SERVICE + '/count/' + status);
    return response;
  }
  async archiveInactivePeople() {
    let response = await this.data.saveObject({}, this.PEOPLE_SERVICE + '/archive', "post");
    return response;
  }

  //Institutions
  async getInstitutionsArray(options, refresh) {
    if (!this.institutionsArray || refresh) {
      var url = this.INSTITUTION_SERVICES;
      url += options ? options : "";
      let response = await this.data.get(url);
      if (!response.error) {
        this.institutionsArray = response;
      } else {
        this.institutionsArray = undefined;
      }
    }
  }
  async getAPJPackages(options, refresh) {
    if (!this.packageArray || refresh) {
      var url = this.PACKAGES_SERVICES;
      url += options ? options : "";
      let response = await this.data.get(url);
      if (!response.error) {
        this.packageArray = response;
      } else {
        this.packageArray = undefined;
      }
    }
  }
  async getInstitution(id) {
    var url = this.INSTITUTION_SERVICES + '/' + id;
    let response = await this.data.get(url);
    if (!response.status) {
      return response;
    } else {
      return {
        institutionStatus: '99'
      };
    }
  }
  selectInstitution(index) {
    if (index === undefined) {
      this.selectedInstitution = this.emptyInstitution();
      this.newInstitution = true;
    } else {
      try {
        this.selectedInstitution = this.utils.copyObject(this.institutionsArray[index]);
        this.newInstitution = false;
        this.editInstitutionIndex = index;
      } catch (error) {
        console.log(error);
        this.selectedInstitution = this.emptyInstitution();
        this.newInstitution = true;
      }
    }
  }
  selectInstitutionByID(id) {
    this.institutionsArray.forEach((item, index) => {
      if (item._id === id) {
        this.selectedInstitution = this.utils.copyObject(item);
        this.editInstitutionIndex = index;
        return;
      }
    });
    return null;
  }
  emptyInstitution() {
    var newInstitution = new Object();
    newInstitution.joinDate = new Date();
    newInstitution.name = "";
    newInstitution.mac = "";
    return newInstitution;
  }
  async saveInstitution() {
    if (!this.selectedInstitution._id) {
      let response = await this.data.saveObject(this.selectedInstitution, this.INSTITUTION_SERVICES, "post");
      if (!response.error) {
        if (this.institutionsArray) {
          this.institutionsArray.push(response);
        }
      }
      return response;
    } else {
      let response = await this.data.saveObject(this.selectedInstitution, this.INSTITUTION_SERVICES, "put");
      if (!response.status) {
        if (this.institutionsArray) {
          this.institutionsArray[this.editInstitutionIndex] = this.utils.copyObject(this.selectedInstitution, this.institutionsArray[this.editInstitutionIndex]);
        }
      }
      return response;
    }
  }
  async saveAPJInstitution() {
    if (!this.selectedInstitution._id) {
      let response = await this.data.saveObject(this.selectedInstitution, 'apj/' + this.INSTITUTION_SERVICES, "post");
      if (!response.error) {
        if (this.institutionsArray) {
          this.institutionsArray.push(response);
        }
      }
      return response;
    } else {
      let response = await this.data.saveObject(this.selectedInstitution, 'apj/' + this.INSTITUTION_SERVICES, "put");
      if (!response.status) {
        if (this.institutionsArray) {
          this.institutionsArray[this.editInstitutionIndex] = this.utils.copyObject(this.selectedInstitution, this.institutionsArray[this.editInstitutionIndex]);
        }
      }
      return response;
    }
  }
  async deleteInstitution() {
    let serverResponse = await this.data.deleteObject(this.INSTITUTION_SERVICES + '/' + this.selectedInstitution._id);
    if (!serverResponse.error) {
      this.institutionsArray.splice(this.editInstitutionIndex, 1);
      this.editInstitutionIndex = -1;
    }
    return serverResponse;
  }
  isInstitutionDirty() {
    if (this.selectedInstitution) {
      if (this.selectedInstitution._id) {
        var obj = this.institutionsArray[this.editInstitutionIndex];
      } else {
        var obj = this.emptyInstitution();
      }
      return this.utils.objectsEqual(this.selectedInstitution, obj);
    }
  }

  //notes
  async getNotesArray(options, refresh) {
    if (!this.notesArray || refresh) {
      var url = this.NOTES_SERVICE;
      url += options ? options : "";
      try {
        let serverResponse = await this.data.get(url);
        if (!serverResponse.error) {
          this.notesArray = serverResponse;
        } else {
          this.data.processError(serverResponse);
          return undefined;
        }
      } catch (error) {
        console.log(error);
        return undefined;
      }
    }
  }
  async getRemindersArray(options, refresh) {
    if (!this.remindersArray || refresh) {
      var url = this.NOTES_SERVICE;
      url += options ? options : "";
      try {
        let serverResponse = await this.data.get(url);
        if (!serverResponse.error) {
          this.remindersArray = serverResponse;
          if (Object.prototype.toString.call(this.remindersArray) === '[object Array]') {
            this.remindersArray = this.remindersArray.filter(item => {
              return item.isReminder;
            });
          }
          return serverResponse;
        } else {
          this.data.processError(serverResponse);
          return undefined;
        }
      } catch (error) {
        console.log(error);
        return undefined;
      }
    }
  }
  selectNote(index) {
    if (index === undefined) {
      this.selectedNote = this.emptyNote();
    } else {
      try {
        this.selectedNote = this.utils.copyObject(this.notesArray[index]);
        this.editNoteIndex = index;
      } catch (error) {
        console.log(error);
        this.selectedNote = this.emptyNote();
      }
    }
  }
  selectNoteById(id) {
    if (!id) return;
    for (let i = 0; i < this.notesArray.length; i++) {
      if (this.notesArray[i]._id === id) {
        this.selectedNote = this.utils.copyObject(this.notesArray[i]);
        this.editNoteIndex = i;
        return;
      }
    }
    this.selectedNote = this.emptyNote();
  }
  emptyNote() {
    var obj = new Object();
    obj.note = "";
    obj.dateCreated = new Date();
    obj.category = "";
    obj.type = "g";
    return obj;
  }
  async saveNote(index) {
    if (!this.selectedNote) {
      return;
    }
    if (!this.selectedNote._id) {
      let serverResponse = await this.data.saveObject(this.selectedNote, this.NOTES_SERVICE, "post");
      if (!serverResponse.error) {
        if (this.notesArray) {
          this.notesArray.push(this.selectedNote);
          this.editNoteIndex = this.notesArray.length - 1;
        }
      } else {
        this.data.processError(response, "There was an error creating the note.");
      }
      return serverResponse;
    } else {
      var serverResponse = await this.data.saveObject(this.selectedNote, this.NOTES_SERVICE, "put");
      if (!serverResponse.error) {
        this.notesArray[this.editNoteIndex] = this.utils.copyObject(this.selectedNote, this.notesArray[this.editNoteIndex]);
      } else {
        this.data.processError(response, "There was an error updating the course.");
      }
      return serverResponse;
    }
  }
  async saveReminder(item, index) {
    console.log(item);
    if (item === undefined) {
      return;
    }
    var serverResponse = await this.data.saveObject(item, this.NOTES_SERVICE, "put");
    if (!serverResponse.error) {
      this.remindersArray[index] = this.utils.copyObject(this.noteToSave, this.remindersArray[index]);
    } else {
      this.data.processError(response, "There was an error updating the course.");
    }
    return serverResponse;
  }
  async deleteNote() {
    if (!this.selectedNote) {
      return;
    }
    let serverResponse = await this.data.deleteObject(this.NOTES_SERVICE + '/' + this.selectedNote._id);
    if (!serverResponse.error) {
      this.notesArray.splice(this.editNoteIndex, 1);
      this.editNoteIndex = -1;
    }
    return serverResponse;
  }

  //tech notes
  async getTechNotesArray(options, refresh) {
    if (!this.notesArray || refresh) {
      var url = this.TECHNOTES_SERVICE;
      url += options ? options : "";
      try {
        let serverResponse = await this.data.get(url);
        if (!serverResponse.error) {
          this.techNotesArray = serverResponse;
        } else {
          this.data.processError(serverResponse);
          return undefined;
        }
      } catch (error) {
        console.log(error);
        return undefined;
      }
    }
  }
  selectTechNote(index) {
    if (index === undefined) {
      this.selectedTechNote = this.emptyTechNote();
    } else {
      try {
        this.selectedTechNote = this.utils.copyObject(this.techNotesArray[index]);
        this.editTechNoteIndex = index;
      } catch (error) {
        console.log(error);
        this.selectedTechNote = this.emptyTechNote();
      }
    }
  }
  emptyTechNote() {
    var obj = new Object();
    obj.note = "";
    obj.dateCreated = new Date();
    obj.file = {};
    obj.category = "";
    return obj;
  }
  async saveTechNote() {
    if (!this.selectedTechNote) {
      return;
    }
    if (!this.selectedTechNote._id) {
      let serverResponse = await this.data.saveObject(this.selectedTechNote, this.TECHNOTES_SERVICE, "post");
      return serverResponse;
    } else {
      var serverResponse = await this.data.saveObject(this.selectedTechNote, this.TECHNOTES_SERVICE, "put");
      return serverResponse;
    }
  }
  async deleteTechNote() {
    if (!this.selectedTechNote) {
      return;
    }
    let serverResponse = await this.data.deleteObject(this.TECHNOTES_SERVICE + '/' + this.selectedTechNote._id);
    if (!serverResponse.error) {
      this.techNotesArray.splice(this.editTechNoteIndex, 1);
      this.editTechNoteIndex = -1;
    }
    return serverResponse;
  }
  async getTechNotesCatArray(options, refresh) {
    if (!this.notesArray || refresh) {
      var url = this.TECHNOTESCAT_SERVICE;
      url += options ? options : "";
      try {
        let serverResponse = await this.data.get(url);
        if (!serverResponse.error) {
          this.techNotesCatArray = serverResponse;
        } else {
          this.data.processError(serverResponse);
          return undefined;
        }
      } catch (error) {
        console.log(error);
        return undefined;
      }
    }
  }
  selectTechNoteCat(index) {
    if (index === undefined) {
      this.selectedTechNoteCat = this.emptyTechNoteCat();
    } else {
      try {
        this.selectedTechNoteCat = this.utils.copyObject(this.techNotesCatArray[index]);
        this.editTechNoteCatIndex = index;
      } catch (error) {
        console.log(error);
        this.selectedTechNoteCat = this.emptyTechNoteCat();
      }
    }
  }
  selectTechNoteCatByID(id) {
    this.techNotesCatArray.forEach((item, index) => {
      if (item._id === id) {
        this.selectedTechNoteCat = this.utils.copyObject(item);
        this.editTechNoteCatIndex = index;
        return;
      }
    });
    return null;
  }
  emptyTechNoteCat() {
    var obj = new Object();
    obj.category = "";
    return obj;
  }
  async saveTechNoteCat() {
    if (!this.selectedTechNoteCat) {
      return;
    }
    if (!this.selectedTechNoteCat._id) {
      let serverResponse = await this.data.saveObject(this.selectedTechNoteCat, this.TECHNOTESCAT_SERVICE, "post");
      if (!serverResponse.error) {
        if (this.notesArray) {
          this.techNotesCatArray.push(this.selectedTechNoteCat);
          this.editTechNoteCatIndex = this.techNotesCatArray.length - 1;
        }
      } else {
        this.data.processError(response, "There was an error creating the note.");
      }
      return serverResponse;
    } else {
      var serverResponse = await this.data.saveObject(this.selectedTechNoteCat, this.TECHNOTESCAT_SERVICE, "put");
      if (!serverResponse.error) {
        this.techNotesCatArray[this.editTechNoteCatIndex] = this.utils.copyObject(this.selectedTechNoteCat, this.techNotesCatArray[this.editTechNoteCatIndex]);
      } else {
        this.data.processError(response, "There was an error updating the tech note.");
      }
      return serverResponse;
    }
  }
  async deleteTechNoteCat() {
    if (this.selectedTechNoteCat._id) {
      let serverResponse = await this.data.deleteObject(this.TECHNOTESCAT_SERVICE + '/' + this.selectedTechNoteCat._id);
      if (!serverResponse.error) {
        this.techNotesCatArray.splice(this.editTechNoteCatIndex, 1);
        this.editTechNoteCatIndex = -1;
      }
      return serverResponse;
    }
    return null;
  }

  //courses
  async getCoursesArray(refresh, options, fields) {
    if (!this.coursesArray || refresh) {
      var url = this.COURSES_SERVICE;
      url += options ? options : "";
      try {
        let serverResponse = await this.data.get(url);
        if (!serverResponse.error) {
          this.coursesArray = serverResponse;
        }
      } catch (error) {
        console.log(error);
      }
      ;
    }
  }
  selectCourse(index) {
    if (index === undefined) {
      this.selectedCourse = this.emptyCourse();
    } else {
      try {
        this.selectedCourse = this.utils.copyObject(this.coursesArray[index]);
        this.editCourseIndex = index;
      } catch (error) {
        console.log(error);
        this.selectedCourse = this.emptyCourse();
      }
    }
  }
  emptyCourse() {
    var newObj = new Object();
    ;
    newObj.name = "";
    newObj.description = "";
    newObj.number = "";
    newObj.active = true;
    return newObj;
  }
  async saveCourse() {
    if (!this.selectedCourse) {
      return;
    }
    if (!this.selectedCourse._id) {
      let serverResponse = await this.data.saveObject(this.selectedCourse, this.COURSES_SERVICE, "post");
      if (!serverResponse.error) {
        this.selectedCourse = this.utils.copyObject(serverResponse);
        if (this.coursesArray) this.coursesArray.push(this.selectedCourse);
        this.editIneditCourseIndex = this.coursesArray.length - 1;
      } else {
        this.data.processError(response, "There was an error creating the product.");
      }
      return serverResponse;
    } else {
      var serverResponse = await this.data.saveObject(this.selectedCourse, this.COURSES_SERVICE, "put");
      if (!serverResponse.error) {
        this.selectedCourse = this.utils.copyObject(serverResponse);
        this.coursesArray[this.editCourseIndex] = this.utils.copyObject(this.selectedCourse, this.coursesArray[this.editCourseIndex]);
      } else {
        this.data.processError(response, "There was an error updating the course.");
      }
      return serverResponse;
    }
  }
  isCourseDirty() {
    if (this.editCourseIndex >= 0 && this.selectedCourse) {
      return this.utils.objectsEqual(this.selectedCourse, this.coursesArray[this.editCourseIndex]);
    }
  }
  async requestPasswordReset(obj) {
    let serverResponse = await this.data.saveObject(obj, this.PASSWORD_RESET, "post");
    return serverResponse;
  }
  async getPasswordReset(validationCode) {
    let serverResponse = await this.data.get(this.PASSWORD_RESET + '/' + validationCode);
    if (!serverResponse.code) {
      this.selectedPerson = serverResponse;
    }
    return serverResponse;
  }
}) || _class);

/***/ }),

/***/ 8666:
/*!****************************************!*\
  !*** ./src/resources/data/products.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Products: function() { return /* binding */ Products; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _dataServices__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dataServices */ 5086);
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/utils */ 8741);
var _dec, _class;



let Products = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_dataServices__WEBPACK_IMPORTED_MODULE_1__.DataServices, _utils_utils__WEBPACK_IMPORTED_MODULE_2__.Utils), _dec(_class = class Products {
  constructor(data, utils) {
    this.PRODUCTS_SERVICE = 'products';
    this.data = data;
    this.utils = utils;
  }
  async getProductsArray(options, refresh) {
    if (!this.productsArray || refresh) {
      var url = this.PRODUCTS_SERVICE;
      url += options ? options : "";
      try {
        let serverResponse = await this.data.get(url);
        if (!serverResponse.error) {
          this.productsArray = serverResponse;
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  async getProduct(index) {
    if (index) {
      let id = this.productsArray[index]._id;
      let serverResponse = await this.data.get(this.PRODUCTS_SERVICE + "/" + id);
      if (!serverResponse.error) {
        this.selectedProduct = serverResponse;
        this.productsArray[index] = this.utils.copyObject(this.selectedProduct);
      }
      return serverResponse;
    }
  }
  selectProduct(index) {
    if (index === undefined) {
      this.selectedProduct = this.emptyProduct();
      this.newSystem = true;
    } else {
      try {
        this.selectedProduct = this.utils.copyObject(this.productsArray[index]);
        this.newSystem = false;
        this.editIndex = index;
      } catch (error) {
        console.log(error);
        this.selectedProduct = this.emptyProduct();
        this.newSystem = true;
      }
    }
  }
  selectedProductFromId(id) {
    this.selectedProduct = this.emptyProduct();
    this.productsArray.forEach(item => {
      if (item._id === id) {
        this.selectedProduct = this.utils.copyObject(item);
        return;
      }
    });
    return null;
  }
  emptyProduct() {
    var newProduct = new Object();
    ;
    newProduct.clientKey = "";
    newProduct.name = "";
    newProduct.sapName = "";
    newProduct.hostWhere = "";
    newProduct.uaCurriculum = "";
    newProduct.defaultStudentIdPrefix = "";
    newProduct.defaultFacultyIdPrefix = "";
    newProduct.defaultStudentPassword = "";
    newProduct.defaultFacultyPassword = "";
    newProduct.comment = "";
    newProduct.Client_Info = "";
    newProduct.fileName = "";
    newProduct.dataset = "";
    newProduct.idsAvailable = "";
    newProduct.firstAllowableId = 1;
    newProduct.active = true;
    newProduct.systems = new Array();
    return newProduct;
  }
  getProductInfo(id) {
    if (!id) return null;
    for (var i = 0; i < this.productsArray.length; i++) {
      if (this.productsArray[i]._id === id) {
        if (this.productsArray[i].productDescription) {
          return {
            info: this.productsArray[i].productDescription,
            productId: id,
            header: this.productsArray[i].name
          };
        } else {
          return null;
        }
      }
    }
    return null;
  }
  async saveProduct() {
    if (!this.selectedProduct) {
      return;
    }
    if (!this.selectedProduct._id) {
      let serverResponse = await this.data.saveObject(this.selectedProduct, this.PRODUCTS_SERVICE, "post");
      if (!serverResponse.error) {
        this.productsArray.push(serverResponse);
        this.editIndex = this.productsArray.length - 1;
      } else {
        this.data.processError(serverResponse, "There was an error creating the product.");
      }
      return serverResponse;
    } else {
      var serverResponse = await this.data.saveObject(this.selectedProduct, this.PRODUCTS_SERVICE, "put");
      if (!serverResponse.error) {
        this.productsArray[this.editIndex] = this.utils.copyObject(this.selectedProduct, this.productsArray[this.editIndex]);
      } else {
        this.data.processError(serverResponse, "There was an error updating the product.");
      }
      return serverResponse;
    }
  }
  async deleteProduct() {
    let serverResponse = await this.data.deleteObject(this.PRODUCTS_SERVICE + '/' + this.selectedProduct._id);
    if (!serverResponse.error) {
      this.productsArray.splice(this.editIndex, 1);
      this.editIndex = -1;
    }
    return serverResponse;
  }
  isDirty() {
    if (this.selectedProduct) {
      if (this.selectedProduct._id) {
        var obj = this.productsArray[this.editIndex];
      } else {
        var obj = this.emptyProduct();
      }
      return this.utils.objectsEqual(this.selectedProduct, obj);
    }
  }
}) || _class);

/***/ }),

/***/ 4517:
/*!*******************************************!*\
  !*** ./src/resources/data/sessionData.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SessionObj: function() { return /* binding */ SessionObj; }
/* harmony export */ });
class SessionObj {
  constructor() {
    this.token = void 0;
    this.user = void 0;
  }
}

/***/ }),

/***/ 2073:
/*!****************************************!*\
  !*** ./src/resources/data/sessions.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Sessions: function() { return /* binding */ Sessions; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _dataServices__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dataServices */ 5086);
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/utils */ 8741);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! moment */ 381);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_4__);
var _dec, _class;





let Sessions = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_dataServices__WEBPACK_IMPORTED_MODULE_1__.DataServices, _utils_utils__WEBPACK_IMPORTED_MODULE_2__.Utils, _config_appConfig__WEBPACK_IMPORTED_MODULE_3__.AppConfig), _dec(_class = class Sessions {
  constructor(data, utils, config) {
    this.SESSIONS_SERVICE = "sessions";
    this.data = data;
    this.utils = utils;
    this.config = config;
  }
  async getSessionsArray(options, refresh) {
    if (!this.sessionsArray || refresh) {
      var url = this.SESSIONS_SERVICE;
      url += options ? options : "";
      try {
        let serverResponse = await this.data.get(url);
        if (!serverResponse.error) {
          this.sessionsArray = serverResponse;
        } else {
          return undefined;
        }
      } catch (error) {
        console.log(error);
        return undefined;
      }
    }
  }
  selectSession(index) {
    if (!index && index != 0) {
      this.selectedSession = this.emptySession();
    } else {
      try {
        this.selectedSession = this.utils.copyObject(this.sessionsArray[index]);
        this.editIndex = index;
      } catch (error) {
        console.log(error);
        this.selectedSession = this.emptySesssion();
        this.newSession = true;
      }
    }
  }
  selectSessionById(id) {
    this.selectedSession = null;
    for (var i = 0; i < this.sessionsArray.length; i++) {
      if (this.sessionsArray[i]._id === id) {
        this.selectedSession = this.utils.copyObject(this.sessionsArray[i]);
        this.editIndex = i;
        break;
      }
    }
  }
  setSession(session) {
    this.selectedSession = session;
  }
  emptySession() {
    var newSessionObj = new Object();
    newSessionObj.session = "";
    newSessionObj.year = "";
    newSessionObj.startDate = "";
    newSessionObj.endDate = "";
    newSessionObj.requestsOpenDate = "";
    newSessionObj.sessionStatus = "Next";
    let sessions = this.sessionsArray.sort((a, b) => {
      return moment__WEBPACK_IMPORTED_MODULE_4___default()(a.startDate).isBefore(b.startDate);
    });
    var nextSession = -1;
    //Search for the most recent session and set the next session
    if (!sessions[0]) {
      var today = new Date();
      var month = today.getMonth();
      var year = today.getFullYear();
      nextSession = 1;
      for (var i = 0, x = this.config.SESSION_PARAMS.length; i < x; i++) {
        if (month >= parseInt(this.config.SESSION_PARAMS[i].startMonth) && month <= parseInt(this.config.SESSION_PARAMS[i].endMonth)) {
          nextSession = i + 1;
          break;
        }
      }
      var thisYear = nextSession != 4 ? year : year--;
    } else {
      for (var i = 0, x = this.config.SESSION_PARAMS.length; i < x; i++) {
        if (sessions[0].session === this.config.SESSION_PARAMS[i].session) {
          nextSession = i + 1;
          break;
        }
      }
      var thisYear = parseInt(sessions[0].year);
    }

    //If the next session is the fifth session then set it to the first session
    if (nextSession === 4) nextSession = 0;
    //Set the session name
    newSessionObj.session = this.config.SESSION_PARAMS[nextSession].session;
    //And the year
    // let thisYear = parseInt(sessions[0].year);
    if (nextSession === 0) thisYear++;
    newSessionObj.year = thisYear;
    if (nextSession === 3) {
      newSessionObj.year = thisYear + "/" + (parseInt(thisYear) + 1);
    }

    //Set the dates
    newSessionObj.startDate = thisYear + "-" + this.config.SESSION_PARAMS[nextSession].startMonth + "-" + this.config.SESSION_PARAMS[nextSession].startDay;
    if (nextSession === 3) {
      thisYear = parseInt(thisYear) + 1;
      newSessionObj.endDate = thisYear + "-" + this.config.SESSION_PARAMS[nextSession].endMonth + "-" + this.config.SESSION_PARAMS[nextSession].endDay;
    } else {
      newSessionObj.endDate = thisYear + "-" + this.config.SESSION_PARAMS[nextSession].endMonth + "-" + this.config.SESSION_PARAMS[nextSession].endDay;
    }
    newSessionObj.requestsOpenDate = thisYear + "-" + this.config.SESSION_PARAMS[nextSession].openMonth + "-" + this.config.SESSION_PARAMS[nextSession].openDay;
    return newSessionObj;
  }
  async saveSession() {
    if (!this.selectedSession) {
      return;
    }
    if (!this.selectedSession._id) {
      let serverResponse = await this.data.saveObject(this.selectedSession, this.SESSIONS_SERVICE, "post");
      if (!serverResponse.error) {
        this.sessionsArray.unshift(serverResponse);
      }
      return serverResponse;
    } else {
      var serverResponse = await this.data.saveObject(this.selectedSession, this.SESSIONS_SERVICE, "put");
      if (!serverResponse.error) {
        this.sessionsArray[this.editIndex] = this.utils.copyObject(this.selectedSession);
      }
      return serverResponse;
    }
  }
  isDirty() {
    if (this.selectedSession) {
      if (this.selectedSession._id) {
        var obj = this.sessionsArray[this.editIndex];
      } else {
        var obj = this.emptySession();
      }
      return this.utils.objectsEqual(this.selectedSession, obj);
    }
  }
}) || _class);

/***/ }),

/***/ 1290:
/*!****************************************!*\
  !*** ./src/resources/data/siteInfo.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SiteInfo: function() { return /* binding */ SiteInfo; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _dataServices__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dataServices */ 5086);
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/utils */ 8741);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! moment */ 381);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_4__);
var _dec, _class;





let SiteInfo = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_dataServices__WEBPACK_IMPORTED_MODULE_1__.DataServices, _utils_utils__WEBPACK_IMPORTED_MODULE_2__.Utils, _config_appConfig__WEBPACK_IMPORTED_MODULE_3__.AppConfig), _dec(_class = class SiteInfo {
  constructor(data, utils, config) {
    this.SITE_SERVICES = 'site';
    this.MESSAGE_SERVICES = 'messages';
    this.data = data;
    this.utils = utils;
    this.config = config;
  }
  async getInfoArray(refresh, options) {
    if (!this.siteArray || refresh) {
      var url = this.SITE_SERVICES;
      url += options ? options : "";
      try {
        let serverResponse = await this.data.get(url);
        if (!serverResponse.error) {
          this.siteArray = serverResponse;
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  async getObject(id) {
    if (id) {
      let serverResponse = await this.data.get(this.SITE_SERVICES + "/" + id);
      if (!serverResponse.error) {
        this.selectedObject = serverResponse;
      }
      return serverResponse;
    }
  }
  selectObject(index) {
    if (!index || index === -1) {
      this.selectedItem = this.emptyItem();
    } else {
      try {
        this.selectedItem = this.utils.copyObject(this.siteArray[index]);
        this.editIndex = index;
      } catch (error) {
        console.log(error);
      }
    }
  }
  setObject(item) {
    this.selectedItem = this.utils.copyObject(item);
  }
  emptyItem() {
    var newItem = new Object();
    ;
    newItem.title = "";
    newItem.content = "";
    newItem.url = "";
    newItem.createdDate = new Date();
    newItem.expiredDate = moment__WEBPACK_IMPORTED_MODULE_4___default()(new Date()).add(1, 'years');
    newItem.image = "";
    newItem.priority = "INFO";
    newItem.itemType = "NEWS";
    newItem.sortOrder = 0;
    newItem.file = new Object();
    return newItem;
  }
  async saveObject() {
    if (!this.selectedObject) {
      return;
    }
    if (!this.selectedObject._id) {
      let serverResponse = await this.data.saveObject(this.selectedObject, this.SITE_SERVICES, "post");
      return serverResponse;
    } else {
      var serverResponse = await this.data.saveObject(this.selectedObject, this.SITE_SERVICES, "put");
      return serverResponse;
    }
  }
  async uploadFile(files) {
    let response = await this.data.uploadFiles(files, this.SITE_SERVICES + '/upload/' + this.selectedItem._id);
    if (!response.error) {
      this.siteArray[this.editIndex] = this.utils.copyObject(response, this.siteArray[this.editIndex]);
    }
  }
  async deleteObject() {
    let serverResponse = await this.data.deleteObject(this.SITE_SERVICES + '/' + this.selectedItem._id);
    if (!serverResponse.error) {
      this.siteArray.splice(this.editIndex, 1);
      this.editIndex = -1;
    }
    return serverResponse;
  }
  isDirty(obj) {
    if (this.selectedItem) {
      if (!obj) {
        var obj = this.emptyItem();
      }
      var skip = ['file'];
      return this.utils.objectsEqual(this.selectedItem, obj, skip);
    }
    return new Array();
  }
  async getWeather(city) {
    let response = this.data.get('getWeather/' + city);
    return response;
  }
  showCarousel() {
    for (let i = 0; i < this.siteArray.length; i++) {
      if (this.siteArray[i].itemType === 'CARO') return true;
    }
    return false;
  }
  async getMessageArray(options, refresh) {
    if (!this.messageArray || refresh) {
      var url = this.MESSAGE_SERVICES;
      url += options ? options : "";
      try {
        let serverResponse = await this.data.get(url);
        if (!serverResponse.error) {
          this.messageArray = serverResponse;
        } else {
          this.data.processError(serverResponse);
          return undefined;
        }
      } catch (error) {
        console.log(error);
        return undefined;
      }
    }
    return this.messageArray;
  }
  selectMessageByKey(key) {
    var index = this.utils.arrayContainsValue(this.messageArray, 'key', key);
    if (index > -1) {
      return this.messageArray[index];
    }
    return null;
  }
  selectMessage(index) {
    if (index === -1) {
      this.selectedMessage = this.emptyMessage();
    } else {
      try {
        this.selectedMessage = this.utils.copyObject(this.messageArray[index]);
        this.editMessageIndex = index;
      } catch (error) {
        console.log(error);
      }
    }
  }
  emptyMessage() {
    var newMessage = new Object();
    ;
    newMessage.description = "";
    newMessage.content = "";
    return newMessage;
  }
  async saveMessageItem() {
    if (!this.selectedMessage) {
      return;
    }
    if (!this.selectedMessage._id) {
      let serverResponse = await this.data.saveObject(this.selectedMessage, this.MESSAGE_SERVICES, "post");
      if (!serverResponse.error) {
        this.messageArray.push(this.selectedMessage);
      }
      return serverResponse;
    } else {
      var serverResponse = await this.data.saveObject(this.selectedMessage, this.MESSAGE_SERVICES, "put");
      if (!serverResponse.error) {
        this.messageArray[this.editMessageIndex] = this.utils.copyObject(this.selectedMessage, this.messageArray[this.editMessageIndex]);
      }
      return serverResponse;
    }
  }
  isMessageDirty(obj) {
    if (this.selectedMessage) {
      if (!obj) {
        var obj = this.emptyItem();
      }
      return this.utils.objectsEqual(this.selectedMessage, obj);
    }
    return new Array();
  }
  async deleteMessage() {
    let serverResponse = await this.data.deleteObject(this.SITE_SERVICES + '/' + this.selectedMessage._id);
    if (!serverResponse.error) {
      this.messageArray.splice(this.editMessageIndex, 1);
      this.editMessageIndex = -1;
    }
    return serverResponse;
  }
}) || _class);

/***/ }),

/***/ 4077:
/*!***************************************!*\
  !*** ./src/resources/data/systems.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Systems: function() { return /* binding */ Systems; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var _dataServices__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dataServices */ 5086);
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/utils */ 8741);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
var _dec, _class;






let Systems = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_dataServices__WEBPACK_IMPORTED_MODULE_1__.DataServices, _utils_utils__WEBPACK_IMPORTED_MODULE_2__.Utils, _config_appConfig__WEBPACK_IMPORTED_MODULE_3__.AppConfig), _dec(_class = class Systems {
  constructor(data, utils, config) {
    this.SYSTEMS_SERVICE = "systems";
    this.CHANGE_SERVICE = "change";
    this.CHANGE_CATEGORY_SERVICE = "changeCategory";
    this.data = data;
    this.utils = utils;
    this.config = config;
  }
  async getSystemsArray(options, refresh) {
    if (!this.systemsArray || refresh) {
      var url = this.SYSTEMS_SERVICE;
      url += options ? options : "";
      try {
        let serverResponse = await this.data.get(url);
        if (!serverResponse.error) {
          this.systemsArray = serverResponse;
        }
      } catch (error) {
        console.log(error);
        this.systemsArray = undefined;
      }
    }
  }
  async getSystem(index) {
    if (index >= 0) {
      let id = this.systemsArray[index]._id;
      let serverResponse = await this.data.get(this.SYSTEMS_SERVICE + "/" + id);
      if (!serverResponse.error) {
        this.selectedSystem = serverResponse;
        this.systemsArray[index] = this.utils.copyObject(this.selectedSystem);
      }
      return serverResponse;
    }
  }
  async getConfiguredProductSystems(sids) {
    if (sids) {
      let serverResponse = await this.data.get(this.SYSTEMS_SERVICE + "/product/" + sids);
      return serverResponse;
    }
  }
  async getAPJConfiguredProductSystems(sids) {
    if (sids) {
      let serverResponse = await this.data.get('apj/' + this.SYSTEMS_SERVICE + "/product/" + sids);
      return serverResponse;
    }
  }
  selectSystem(index) {
    if (!index && index != 0) {
      this.selectedSystem = this.emptySystem();
      this.newSystem = true;
    } else {
      try {
        this.selectedSystem = this.utils.copyObject(this.systemsArray[index]);
        this.newSystem = false;
        this.editIndex = index;
      } catch (error) {
        console.log(error);
        this.selectedSystem = this.emptySystem();
        this.newSystem = true;
      }
    }
  }
  selectedSystemFromId(id) {
    this.selectedSystem = null;
    for (var i = 0, x = this.systemsArray.length; i < x; i++) {
      if (this.systemsArray[i]._id === id) {
        this.selectedSystem = this.utils.copyObject(this.systemsArray[i]);
        this.editIndex = i;
        break;
      }
    }
    ;
  }
  selectedProductSystemFromId(id, systems) {
    this.selectedSystem = null;
    for (var i = 0, x = systems.length; i < x; i++) {
      if (systems[i]._id === id) {
        this.selectedSystem = this.utils.copyObject(systems[i]);
        this.editIndex = i;
        break;
      }
    }
    ;
  }
  setSelectedSystem(system) {
    this.selectedSystem = this.utils.copyObject(system);
  }
  emptySystem() {
    var newSystemObj = {};
    newSystemObj.sid = "";
    newSystemObj.active = true;
    newSystemObj.description = "";
    newSystemObj.server = "";
    newSystemObj.instance = "";
    newSystemObj.its = "";
    newSystemObj.terms = "";
    newSystemObj.idsAvailable = 0;
    newSystemObj.productId = new Array();
    newSystemObj.clients = [];
    return newSystemObj;
  }
  async saveSystem() {
    if (!this.selectedSystem) {
      return;
    }
    if (!this.selectedSystem._id) {
      let serverResponse = await this.data.saveObject(this.selectedSystem, this.SYSTEMS_SERVICE, "post");
      if (!serverResponse.error) {
        this.systemsArray.push(serverResponse);
      } else {
        this.data.processError(serverResponse, "Error updating the system.<br>");
      }
      return serverResponse;
    } else {
      var serverResponse = await this.data.saveObject(this.selectedSystem, this.SYSTEMS_SERVICE, "put");
      if (!serverResponse.error) {
        this.selectedSystem = serverResponse;
        this.systemsArray[this.editIndex] = this.utils.copyObject(this.selectedSystem);
      } else {
        this.data.processError(serverResponse, "Error updating the system.<br>");
      }
      return serverResponse;
    }
  }
  async saveClient(clientToSave) {
    await this.data.saveObject(clientToSave, this.SYSTEMS_SERVICE + "/client", "put");
  }
  async deleteSystem() {
    let serverResponse = await this.data.deleteObject(this.SYSTEMS_SERVICE + '/' + this.selectedSystem._id);
    if (!serverResponse.error) {
      this.systemsArray.splice(this.editIndex, 1);
      this.editIndex = -1;
    } else {
      this.data.processError(serverResponse, "Error deleting the system.<br>");
    }
    return serverResponse;
  }
  async saveProductChanges(obj) {
    let response = await this.data.saveObject(obj, this.SYSTEMS_SERVICE + '/product/', "put");
    return response;
  }
  isDirty(obj, skip) {
    if (this.selectedSystem) {
      if (!obj) {
        var obj = this.emptySystem();
      }
      return this.utils.objectsEqual(this.selectedSystem, obj, skip);
    }
    return new Array();
  }
  async deleteAllClients() {
    if (this.selectedSystem._id) {
      this.selectedSystem.clients = new Array();
    }
  }
  generateClients(start, end, status, product, interval, idsAvailable) {
    if (!this.selectedSystem) {
      return {
        error: "No system selected."
      };
    }
    this.selectedSystem.clients = this.selectedSystem.clients || new Array();
    var lastClientIndex = this.selectedSystem.clients.length - 1;
    if (start > 0 && end > 0 && end >= start) {
      for (var i = start; i <= end; i += interval) {
        if (this._findClient(i, 0, lastClientIndex) < 0) {
          this.selectedSystem.clients.push(this.emptyClient(i, status, product, idsAvailable));
        }
      }
      return true;
    } else {
      return {
        error: "Enter valid start and end client numbers"
      };
    }
  }
  refreshClients(status, products) {
    for (var i = 0, x = this.selectedSystem.clients.length; i < x; i++) {
      var aProduct = {
        firstAllowableID: 1,
        _id: null
      };
      this.selectedSystem.clients.forEach(item => {
        if (item.productId !== aProduct._id) {
          for (let j = 0; j < products.length; j++) {
            if (products[j]._id === item.productId) {
              aProduct = products[j];
              this.selectedSystem.clients[i] = this.emptyClient(this.selectedSystem.clients[i].client, status, aProduct, aProduct.idsAvailable);
              break;
            }
          }
        } else {
          this.selectedSystem.clients[i] = this.emptyClient(this.selectedSystem.clients[i].client, status, aProduct, aProduct.idsAvailable);
        }
      });
    }
  }
  _findClient(client, start, end) {
    if (end >= 0) {
      for (var i = start; i <= end; i++) {
        if (parseInt(this.selectedSystem.clients[i].client) === client) return i;
      }
    }
    return -1;
  }
  selectClient(index) {
    if (index != undefined) {
      this.selectedClient = this.utils.copyObject(this.selectedSystem.clients[index]);
      this.clientIndex = index;
    }
  }
  selectClientFromIDNoSystem(systemId, clientId) {
    console.log('The wrong function');
    this.selectedClient = null;
    for (var i = 0, x = this.systemsArray.length; i < x; i++) {
      if (this.systemsArray[i]._id === systemId) {
        for (var j = 0; j < this.systemsArray[i].clients.length; j++) {
          if (this.systemsArray[i].clients[j].client == clientId) {
            this.selectedClient = this.utils.copyObject(this.systemsArray[i].clients[j]);
            this.clientIndex = j;
            break;
          }
        }
      }
    }
  }
  selectClientFromIDNoSystem(systemId, clientId, systems) {
    console.log('Using the right one');
    this.selectedClient = null;
    for (var i = 0, x = systems.length; i < x; i++) {
      if (systems[i]._id === systemId) {
        for (var j = 0; j < systems[i].clients.length; j++) {
          if (systems[i].clients[j].client == clientId) {
            this.selectedClient = this.utils.copyObject(systems[i].clients[j]);
            this.clientIndex = j;
            break;
          }
        }
      }
    }
  }
  selectClientFromID(systemId, clientId) {
    this.selectedClient = null;
    for (var i = 0, x = this.systemsArray.length; i < x; i++) {
      if (this.systemsArray[i]._id === systemId) {
        this.selectedSystem = this.utils.copyObject(this.systemsArray[i]);
        for (var j = 0; j < this.systemsArray[i].clients.length; j++) {
          if (this.systemsArray[i].clients[j].client == clientId) {
            this.selectedClient = this.utils.copyObject(this.systemsArray[i].clients[j]);
            this.clientIndex = j;
            break;
          }
        }
      }
    }
  }
  selectClientFromNumber(systemId, client) {
    this.selectedClient = null;
    for (var i = 0, x = this.systemsArray.length; i < x; i++) {
      if (this.systemsArray[i]._id === systemId) {
        this.selectedSystem = this.utils.copyObject(this.systemsArray[i]);
        for (var j = 0; j < this.systemsArray[i].clients.length; j++) {
          if (this.systemsArray[i].clients[j].client === client) {
            this.selectedClient = this.utils.copyObject(this.systemsArray[i].clients[j]);
            this.clientIndex = j;
            break;
          }
        }
      }
    }
  }
  emptyClient(clientNo, status, product, idsAvailable) {
    let obj = new Object();
    obj.client = clientNo;
    obj.clientStatus = status;
    obj.systemId = this.selectedSystem._id;
    obj.idsAvailable = product.idsAvailable;
    obj.assignments = new Array();
    obj.createdDate = new Date();
    obj.lastIdAssigned = 0;
    obj.lastFacIdAssigned = 0;
    obj.firstFacIdAssigned = 0;
    obj.manual = false;
    obj.productId = product ? product._id : null;
    obj.firstAllowableID = product.firstAllowableId ? parseInt(product.firstAllowableId) : 1;
    return obj;
  }
  selectClient(index) {
    if (index != undefined) {
      this.selectedClient = this.utils.copyObject(this.selectedSystem.clients[index]);
      this.clientIndex = index;
    }
  }

  /*****************************************************************************************************
   * Find the client in a systems client list and update it, used by client request assignment
   ****************************************************************************************************/
  updateClient(client, systemId) {
    if (!systemId) {
      for (var i = 0, x = this.systemsArray.length; i < x; i++) {
        if (this.systemsArray[i]._id === client.systemId) {
          for (var j = 0; j < this.systemsArray[i].clients.length; j++) {
            if (this.systemsArray[i].clients[j].client == client.client) {
              this.systemsArray[i].clients[j] = this.utils.copyObject(client);
              break;
            }
          }
        }
      }
      ;
    } else {
      for (var j = 0; j < this.systemsArray[i].clients.length; j++) {
        if (this.systemsArray[i].clients[j].client == client.client) {
          this.systemsArray[i].clients[j] = this.utils.copyObject(client);
          break;
        }
      }
    }
  }
  async getAssignmentDetails(id) {
    var url = "/serverAssignments/" + id;
    let serverResponse = await this.data.get(url);
    if (!serverResponse.error) {
      this.assignmentDetailsArray = serverResponse.sort((a, b) => {
        return a.lastName < b.lastName ? -1 : 1;
      });
    } else {
      this.data.processError(serverResponse);
    }
  }

  //Change
  async getChangeArray(options, refresh) {
    if (!this.changeArray || refresh) {
      var url = this.CHANGE_SERVICE;
      url += options ? options : "";
      try {
        let serverResponse = await this.data.get(url);
        if (!serverResponse.error) {
          this.changeArray = serverResponse;
        }
      } catch (error) {
        console.log(error);
        this.changeArray = undefined;
      }
    }
  }
  async getChange(index) {
    if (index >= 0) {
      let id = this.changeArray[index]._id;
      let serverResponse = await this.data.get(this.CHANGE_SERVICE + "/" + id);
      if (!serverResponse.error) {
        this.selectedChange = serverResponse;
        this.changeArray[index] = this.utils.copyObject(this.selectedChange);
      }
      return serverResponse;
    }
  }
  selectChange(index) {
    if (!index && index != 0) {
      this.selectedChange = this.emptyChange();
    } else {
      try {
        this.selectedChange = this.utils.copyObject(this.changeArray[index]);
        this.changeIndex = index;
      } catch (error) {
        console.log(error);
        this.selectedChange = this.emptyChange();
      }
    }
  }
  emptyChange() {
    var newObj = {};
    newObj.category = "";
    newObj.content = "";
    return newObj;
  }
  async saveChange() {
    if (!this.selectedChange) {
      return;
    }
    if (!this.selectedChange._id) {
      let serverResponse = await this.data.saveObject(this.selectedChange, this.CHANGE_SERVICE, "post");
      if (!serverResponse.error) {
        this.changeArray.push(serverResponse);
      } else {
        this.data.processError(serverResponse, "Error updating the change.<br>");
      }
      return serverResponse;
    } else {
      var serverResponse = await this.data.saveObject(this.selectedChange, this.CHANGE_SERVICE, "put");
      if (!serverResponse.error) {
        this.selectedChange = serverResponse;
        this.changeArray[this.changeIndex] = this.utils.copyObject(this.selectedChange);
      } else {
        this.data.processError(serverResponse, "Error updating the change .<br>");
      }
      return serverResponse;
    }
  }
  async deleteChange() {
    let serverResponse = await this.data.deleteObject(this.CHANGE_SERVICE + '/' + this.selectedChange._id);
    if (!serverResponse.error) {
      this.changeArray.splice(this.editIndex, 1);
      this.editIndex = -1;
    } else {
      this.data.processError(serverResponse, "Error deleting the change.<br>");
    }
    return serverResponse;
  }

  //Change Category
  async getChangeCategoryArray(options, refresh) {
    if (!this.changeCategoryArray || refresh) {
      var url = this.CHANGE_CATEGORY_SERVICE;
      url += options ? options : "";
      try {
        let serverResponse = await this.data.get(url);
        if (!serverResponse.error) {
          this.changeCategoryArray = serverResponse;
        }
      } catch (error) {
        console.log(error);
        this.changeCategoryArray = undefined;
      }
    }
  }
  async getChangeCategory(index) {
    if (index >= 0) {
      let id = this.changeCategoryArray[index]._id;
      let serverResponse = await this.data.get(this.CHANGE_CATEGORY_SERVICE + "/" + id);
      if (!serverResponse.error) {
        this.selectedChangeCategory = serverResponse;
        this.changeCategoryArray[index] = this.utils.copyObject(this.selectedChangeCategory);
      }
      return serverResponse;
    }
  }
  selectChangeCategory(index) {
    if (!index && index != 0) {
      this.selectedChangeCategory = this.emptyChangeCategory();
    } else {
      try {
        this.selectedChangeCategory = this.utils.copyObject(this.changeCategoryArray[index]);
        this.categoryIndex = index;
      } catch (error) {
        console.log(error);
        this.selectedChangeCategory = this.emptyChangeCategory();
      }
    }
  }
  selectChangeCategoryByCategory(category) {
    this.changeCategoryArray.forEach((item, index) => {
      if (item.category == category) {
        this.selectedChangeCategory = this.utils.copyObject(item);
        this.categoryIndex = index;
      }
    });
  }
  emptyChangeCategory() {
    var newCategoryObj = {};
    newCategoryObj.category = "";
    return newCategoryObj;
  }
  async categortInUse() {
    let response = await this.data.get(this.CHANGE_CATEGORY_SERVICE + "?filter=category|eq|" + this.selectedChangeCategory.category);
    if (!response.error) {
      return true;
    } else {
      return false;
    }
  }
  async saveChangeCategory() {
    if (!this.selectedChangeCategory) {
      return;
    }
    if (!this.selectedChangeCategory._id) {
      let serverResponse = await this.data.saveObject(this.selectedChangeCategory, this.CHANGE_CATEGORY_SERVICE, "post");
      if (!serverResponse.error) {
        this.changeCategoryArray.push(serverResponse);
      } else {
        this.data.processError(serverResponse, "Error updating the change category.<br>");
      }
      return serverResponse;
    } else {
      var serverResponse = await this.data.saveObject(this.selectedChangeCategory, this.CHANGE_CATEGORY_SERVICE, "put");
      if (!serverResponse.error) {
        this.selectedChangeCategory = serverResponse;
        this.changeCategoryArray[this.categoryIndex] = this.utils.copyObject(this.selectedChangeCategory);
      } else {
        this.data.processError(serverResponse, "Error updating the change category.<br>");
      }
      return serverResponse;
    }
  }
  async deleteChangeCategory() {
    let serverResponse = await this.data.deleteObject(this.CHANGE_CATEGORY_SERVICE + '/' + this.selectedChangeCategory._id);
    if (!serverResponse.error) {
      this.changeCategoryArray.splice(this.editIndex, 1);
      this.editIndex = -1;
    } else {
      this.data.processError(serverResponse, "Error deleting the change category.<br>");
    }
    return serverResponse;
  }
}) || _class);

/***/ }),

/***/ "resources/css/styles.css":
/*!**************************************!*\
  !*** ./src/resources/css/styles.css ***!
  \**************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ 7537);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ 3645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".toast {\n    opacity: 1 !important;\n}\n\n.assignedColor {\n  background-color: #dff0d8;\n}\n\n.toolbar {\n    position:fixed;\n    z-index:1000;\n    width:100%;\n    top:91px;\n    left:0;\n    background-color:ghostwhite;\n}\n\n.panelContrastColor {\n    background-color:ghostwhite;\n}\n\n.positionUnderToolbar{\n    margin-top:50px;\n}\n\n.provisional {\n    background-color: cyan;\n}\n\n.existing {\n    background-color: LightGoldenRodYellow;\n}\n\n.danger {\n    background-color:deeppink;\n}\n\n.customFont {\n    font-family: 'Montserrat', sans-serif;\n}\n.card-header{\n    font-size: 1.640625rem;\n}\n\n.card-title {\n    padding: 5px;\n}\n\n.card-title {\n    background-color: rgba(0, 0, 0, 0.03);\n    border: 1px solid rgba(0, 0, 0, 0.125);\n}\n\n.bigLabel{\n    font-size: 1.5rem;\n}\n\n.btn-default{\n    background-color:white;\n}\n    .hover_img a { position:relative; }\n    .hover_img a span { position:absolute; display:none; z-index:99; }\n    .hover_img a:hover span { display:block; }\n\n    .hover {\n        position:absolute;\n        height: 200px;\n        width: 600px;\n        z-index:99;\n        display:none; \n        box-shadow: 10px 10px 5px #888888;\n        overflow: hidden;\n        background-color: white;\n        padding: 10px;\n    }\n\n.fixed\n{\n    position: fixed;\n    top: 20px;\n    right: 40px;\n}\n\n.bold {\n    font-weight: bold;\n}\n\n.redText {\n    color: purple;\n    font-weight: bolder !important;\n}\n\n.banner {\n    height: 50px;\n    width: 100%;\n    background-color: white;\n    border-bottom-style: solid;\n    border-bottom-width: 1px;\n}\n\n.banner #notice {\n    margin-left: 30px;\n    font-size: 1.25em;\n    color: indianred;\n}\n\n.browse .textContainer {\n    height: 430px;\n    line-height: 400px;\n}\n\n.textContainer h4 {\n    vertical-align: middle;\n    display: inline-block;\n}\n\n.vertical-align {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.table-borderless td,\n.table-borderless th {\n    border: 0 !important;\n}\n\n.topMargin {\n    margin-top: 25px;\n}\n\n.smallTopMargin {\n  margin-top: 5px;\n}\n\n.bottomMargin {\n    margin-bottom: 25px;\n}\n\n.leftMargin {\n    margin-left: 25px;\n}\n\n.rightMargin {\n  margin-right: 25px;\n}\n\n.smallLeftMargin {\n    margin-left: 10px;\n}\n\n.backColorOne {\n  background-color: ghostwhite;\n}\n\n.backColorTwo{\n  background-color: LightSalmon;\n}\n\n.backColorThree {\n  background-color: cyan;\n}\n\n.backColorFour{\n  background-color: lightgrey;\n}\n\n\n.bigTopMargin {\n    margin-top: 50px;\n}\n\n.bigLeftMargin {\n    margin-left: 50px;\n}\n\n.smallMarginTop {\n    margin-top: 5px;\n}\n\n.smallMarginRight {\n    margin-right: 10px;\n}\n\n.parallax1 {\n\n    /* Set a specific height */\n    min-height: 300px;\n\n    /* Create the parallax scrolling effect */\n    background-attachment: fixed;\n    background-position: center;\n    background-repeat: no-repeat;\n    background-size: cover;\n}\n\n.parallax2 {\n\n    /* Set a specific height */\n    min-height: 200px;\n\n    /* Create the parallax scrolling effect */\n    background-attachment: fixed;\n    background-position: center;\n    background-repeat: no-repeat;\n    background-size: cover;\n}\n\n.caption span.border {\n    background-color: #111;\n    color: #fff;\n    padding: 18px;\n    font-size: 25px;\n    letter-spacing: 10px;\n}\n\n.caption {\n  position: absolute;\n  left: 0;\n  top: 25%;\n  width: 100%;\n  text-align: center;\n  color: #000;\n}\n\n.center-text {\n   text-align: center;\n}\n\n.home-page-header{\n    text-align: center;\n    font-size: 30px;\n}\n\n.underline {\n    text-decoration: underline;\n}\n\n.subMenu{\n    position: relative;\n    top: -5px;\n    left: 0px;\n    width: 100%;\n}\n\n.subMenu-container {\n    position: fixed; /* Set the navbar to fixed position */\n    top: 5rem;\n    width: 100%;\n    z-index:99;\n}\n\n.hover {\n    position:absolute;\n    height: 200px;\n    width: 600px;\n    z-index:99;\n    display:none;\n    box-shadow: 10px 10px 5px #888888;\n    overflow: hidden;\n    background-color: white;\n    padding: 10px;\n}\n\n.hoverProfile {\n    position:absolute;\n    height: 250px;\n    width: 500px;\n    z-index:99;\n    display:none;\n    box-shadow: 10px 10px 5px #888888;\n    overflow: hidden;\n    background-color: white;\n    padding: 10px;\n     right:0;\n    bottom:0;\n}\n\n.overFlow {\n    overflow-y:scroll;\n}\n\n.carouselSize {\n    width:700px;\n    height:500px;\n}\n\n.carouselImage {\n    height:500px;\n}\n\n.weatherIcon {\n    height: 50px;\n    width: 50px;\n}\n\n.page-host {\n    margin-top: 10rem;\n}\n\nspan i {\n    cursor: pointer;\n}\n\n.sortable {\n    cursor: pointer;   \n}\n\n.aurelia-flatpickr {\n    background-color: white !important;\n}\n\n/* Dropdown Button */\n.dropbtn {\n    border: none;\n    cursor: pointer;\n}\n\n/* The container <div> - needed to position the dropdown content */\n.dropdown {\n    position: relative;\n    display: inline-block;\n}\n\n/* Dropdown Content (Hidden by Default) */\n.dropdown-content {\n    display: none;\n    position: absolute;\n    background-color: #f9f9f9;\n    min-width: 160px;\n    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);\n    z-index: 1;\n}\n\n/* Links inside the dropdown */\n.dropdown-content a {\n    color: black;\n    padding: 12px 16px;\n    text-decoration: none;\n    display: block;\n}\n\n/* Change color of dropdown links on hover */\n.dropdown-content a:hover {background-color: #f1f1f1}\n\n/* Show the dropdown menu on hover */\n.dropdown:hover .dropdown-content {\n    display: block;\n}\n\n/* Change the background color of the dropdown button when the dropdown content is shown */\n.dropdown:hover .dropbtn {\n    background-color: #3e8e41;\n}\n\n.smart-timeline{position:relative}\n.smart-timeline-list{list-style:none;margin:0;padding:0}\n.smart-timeline-list:after{content:\" \";background-color:#eee;position:absolute;display:block;width:2px;top:0;left:95px;bottom:0;z-index:1}\n.smart-timeline-list li{position:relative;margin:0;padding:15px 0}\n.smart-timeline-list>li:hover{background-color:#f4f4f4}\n.smart-timeline-hover li:hover{background-color:#f9f9f9}\n.smart-timeline-icon{background:#3276b1;color:#fff;border-radius:50%;position:absolute;width:32px;height:32px;line-height:28px;font-size:14px;text-align:center;left:80px;top:10px;z-index:100;padding:2px}\n.smart-timeline-icon>img{height:32px;width:32px;border-radius:50%;margin-top:-2px;margin-left:-2px;border:2px solid #3276b1}\n.smart-timeline-time{float:left;width:70px;text-align:right}\n.smart-timeline-time>small{font-style:italic}\n.smart-timeline-content{margin-left:123px}\n\n\n/****** Style Star Rating Widget *****/\n\n.rating { \n  border: none;\n  float: left;\n}\n\n.rating > span > input { display: none; } \n.rating > span > label:before { \n  margin: 5px;\n  font-size: 1.25em;\n  font-family: FontAwesome;\n  display: inline-block;\n  content: \"\\f005\";\n}\n\n.rating > span > .half:before { \n  content: \"\\f089\";\n  position: absolute;\n}\n\n.rating > span > label { \n    color: #ddd; \n    float: right; \n}\n\n/***** CSS Magic to Highlight Stars on Hover *****/\n\n.rating > span > input:checked ~ label, /* show gold star when clicked */\n.rating:not(:checked) > span > label:hover, /* hover current star */\n.rating:not(:checked) > span > label:hover ~ label { color: #FFD700;  } /* hover previous stars in list */\n\n.rating > span > input:checked + label:hover, /* hover current star when changing rating */\n.rating > span >  input:checked ~ label:hover,\n.rating > span > label:hover ~ input:checked ~ label, /* lighten current selection */\n.rating > span > input:checked ~ label:hover ~ label { color: #FFED85;  }\n\n.link-shadow {\n    -webkit-box-shadow: 3px 4px 11px 0px rgba(105,97,105,1);\n    -moz-box-shadow: 3px 4px 11px 0px rgba(105,97,105,1);\n    box-shadow: 3px 4px 11px 0px rgba(105,97,105,1);\n}\n\n#curriculumInfo{\n     display:none;\n}\n\nux-dialog-header {\n    background-color: #ffbd00 ;\n    color: white;\n}\n\n.col-centered{\n    float: none;\n    margin: 0 auto;\n}\n\n.circular--square {\n  border-radius: 50%;\n}\n\n@media only screen and (max-width: 800px) {\n    \n    /* Force table to not be like tables anymore */\n\t#no-more-tables table, \n\t#no-more-tables thead, \n\t#no-more-tables tbody, \n\t#no-more-tables th, \n\t#no-more-tables td, \n\t#no-more-tables tr { \n\t\tdisplay: block; \n\t}\n \n\t/* Hide table headers (but not display: none;, for accessibility) */\n\t#no-more-tables thead tr { \n\t\tposition: absolute;\n\t\ttop: -9999px;\n\t\tleft: -9999px;\n\t}\n \n\t#no-more-tables tr { border: 1px solid #ccc; }\n \n\t#no-more-tables td { \n\t\t/* Behave  like a \"row\" */\n\t\tborder: none;\n\t\tborder-bottom: 1px solid #eee; \n\t\tposition: relative;\n\t\tpadding-left: 50%; \n\t\twhite-space: normal;\n\t\ttext-align:left;\n\t}\n \n\t#no-more-tables td:before { \n\t\t/* Now like a table header */\n\t\tposition: absolute;\n\t\t/* Top/left values mimic padding */\n\t\ttop: 6px;\n\t\tleft: 6px;\n\t\twidth: 45%; \n\t\tpadding-right: 10px; \n\t\twhite-space: nowrap;\n\t\ttext-align:left;\n\t\tfont-weight: bold;\n\t}\n\n    .clickable{\n        cursor: pointer;   \n    }\n\n    .smallFont{\n        font-size: small;\n    }\n\n\t/*\n\tLabel the data\n\t*/\n    #no-more-tables td:before { content: attr(data-title); }\n    \n    }\n\n    #loading {\n        background: repeat scroll 0 0;\n        height: 100%;\n        left: 0;\n        margin: auto;\n        position: fixed;\n        top: 0;\n        width: 100%;\n        z-index:99;\n    }\n\n    .bokeh {\n        border: 0.01em solid rgba(150, 150, 150, 0.1);\n        border-radius: 50%;\n        font-size: 100px;\n        height: 1em;\n        list-style: outside none none;\n        margin: 0 auto;\n        position: relative;\n        top: 35%;\n        width: 1em;\n        z-index: 2147483647;\n    }\n    .bokeh li {\n        border-radius: 50%;\n        height: 0.2em;\n        position: absolute;\n        width: 0.2em;\n    }\n    .bokeh li:nth-child(1) {\n        animation: 1.13s linear 0s normal none infinite running rota, 3.67s ease-in-out 0s alternate none infinite running opa;\n        background: #00c176 none repeat scroll 0 0;\n        left: 50%;\n        margin: 0 0 0 -0.1em;\n        top: 0;\n        transform-origin: 50% 250% 0;\n    }\n    .bokeh li:nth-child(2) {\n        animation: 1.86s linear 0s normal none infinite running rota, 4.29s ease-in-out 0s alternate none infinite running opa;\n        background: #ff003c none repeat scroll 0 0;\n        margin: -0.1em 0 0;\n        right: 0;\n        top: 50%;\n        transform-origin: -150% 50% 0;\n    }\n    .bokeh li:nth-child(3) {\n        animation: 1.45s linear 0s normal none infinite running rota, 5.12s ease-in-out 0s alternate none infinite running opa;\n        background: #fabe28 none repeat scroll 0 0;\n        bottom: 0;\n        left: 50%;\n        margin: 0 0 0 -0.1em;\n        transform-origin: 50% -150% 0;\n    }\n    .bokeh li:nth-child(4) {\n        animation: 1.72s linear 0s normal none infinite running rota, 5.25s ease-in-out 0s alternate none infinite running opa;\n        background: #88c100 none repeat scroll 0 0;\n        margin: -0.1em 0 0;\n        top: 50%;\n        transform-origin: 250% 50% 0;\n    }\n    \n    .translucent{\n        opacity: 0.2;\n    }\n    \n    @keyframes opa {\n    12% {\n        opacity: 0.8;\n    }\n    19.5% {\n        opacity: 0.88;\n    }\n    37.2% {\n        opacity: 0.64;\n    }\n    40.5% {\n        opacity: 0.52;\n    }\n    52.7% {\n        opacity: 0.69;\n    }\n    60.2% {\n        opacity: 0.6;\n    }\n    66.6% {\n        opacity: 0.52;\n    }\n    70% {\n        opacity: 0.63;\n    }\n    79.9% {\n        opacity: 0.6;\n    }\n    84.2% {\n        opacity: 0.75;\n    }\n    91% {\n        opacity: 0.87;\n    }\n    }\n    \n    @keyframes rota {\n        100% {\n            transform: rotate(360deg);\n        }\n    }\n\n    /* Tabs panel */\n.tabbable-panel {\n  border:1px solid #eee;\n  padding: 10px;\n}\n\n/* Default mode */\n.tabbable-line > .nav-tabs {\n  border: none;\n  margin: 0px;\n}\n.tabbable-line > .nav-tabs > li {\n  margin-right: 2px;\n}\n.tabbable-line > .nav-tabs > li > a {\n  border: 0;\n  margin-right: 0;\n  color: #737373;\n}\n.tabbable-line > .nav-tabs > li > a > i {\n  color: #a6a6a6;\n}\n.tabbable-line > .nav-tabs > li.open, .tabbable-line > .nav-tabs > li:hover {\n  border-bottom: 4px solid #fbcdcf;\n}\n.tabbable-line > .nav-tabs > li.open > a, .tabbable-line > .nav-tabs > li:hover > a {\n  border: 0;\n  background: none !important;\n  color: #333333;\n}\n.tabbable-line > .nav-tabs > li.open > a > i, .tabbable-line > .nav-tabs > li:hover > a > i {\n  color: #a6a6a6;\n}\n.tabbable-line > .nav-tabs > li.open .dropdown-menu, .tabbable-line > .nav-tabs > li:hover .dropdown-menu {\n  margin-top: 0px;\n}\n.tabbable-line > .nav-tabs > li.active {\n  border-bottom: 4px solid #f3565d;\n  position: relative;\n}\n.tabbable-line > .nav-tabs > li.active > a {\n  border: 0;\n  color: #333333;\n}\n.tabbable-line > .nav-tabs > li.active > a > i {\n  color: #404040;\n}\n.tabbable-line > .tab-content {\n  margin-top: -3px;\n  background-color: #fff;\n  border: 0;\n  border-top: 1px solid #eee;\n  padding: 15px 0;\n}\n.portlet .tabbable-line > .tab-content {\n  padding-bottom: 0;\n}\n\n/* Below tabs mode */\n\n.tabbable-line.tabs-below > .nav-tabs > li {\n  border-top: 4px solid transparent;\n}\n.tabbable-line.tabs-below > .nav-tabs > li > a {\n  margin-top: 0;\n}\n.tabbable-line.tabs-below > .nav-tabs > li:hover {\n  border-bottom: 0;\n  border-top: 4px solid #fbcdcf;\n}\n.tabbable-line.tabs-below > .nav-tabs > li.active {\n  margin-bottom: -2px;\n  border-bottom: 0;\n  border-top: 4px solid #f3565d;\n}\n.tabbable-line.tabs-below > .tab-content {\n  margin-top: -10px;\n  border-top: 0;\n  border-bottom: 1px solid #eee;\n  padding-bottom: 15px;\n}\n", "",{"version":3,"sources":["webpack://./src/resources/css/styles.css"],"names":[],"mappings":"AAEA;IACI,qBAAqB;AACzB;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;IACI,cAAc;IACd,YAAY;IACZ,UAAU;IACV,QAAQ;IACR,MAAM;IACN,2BAA2B;AAC/B;;AAEA;IACI,2BAA2B;AAC/B;;AAEA;IACI,eAAe;AACnB;;AAEA;IACI,sBAAsB;AAC1B;;AAEA;IACI,sCAAsC;AAC1C;;AAEA;IACI,yBAAyB;AAC7B;;AAEA;IACI,qCAAqC;AACzC;AACA;IACI,sBAAsB;AAC1B;;AAEA;IACI,YAAY;AAChB;;AAEA;IACI,qCAAqC;IACrC,sCAAsC;AAC1C;;AAEA;IACI,iBAAiB;AACrB;;AAEA;IACI,sBAAsB;AAC1B;IACI,eAAe,iBAAiB,EAAE;IAClC,oBAAoB,iBAAiB,EAAE,YAAY,EAAE,UAAU,EAAE;IACjE,0BAA0B,aAAa,EAAE;;IAEzC;QACI,iBAAiB;QACjB,aAAa;QACb,YAAY;QACZ,UAAU;QACV,YAAY;QACZ,iCAAiC;QACjC,gBAAgB;QAChB,uBAAuB;QACvB,aAAa;IACjB;;AAEJ;;IAEI,eAAe;IACf,SAAS;IACT,WAAW;AACf;;AAEA;IACI,iBAAiB;AACrB;;AAEA;IACI,aAAa;IACb,8BAA8B;AAClC;;AAEA;IACI,YAAY;IACZ,WAAW;IACX,uBAAuB;IACvB,0BAA0B;IAC1B,wBAAwB;AAC5B;;AAEA;IACI,iBAAiB;IACjB,iBAAiB;IACjB,gBAAgB;AACpB;;AAEA;IACI,aAAa;IACb,kBAAkB;AACtB;;AAEA;IACI,sBAAsB;IACtB,qBAAqB;AACzB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,uBAAuB;AACzB;;AAEA;;IAEI,oBAAoB;AACxB;;AAEA;IACI,gBAAgB;AACpB;;AAEA;EACE,eAAe;AACjB;;AAEA;IACI,mBAAmB;AACvB;;AAEA;IACI,iBAAiB;AACrB;;AAEA;EACE,kBAAkB;AACpB;;AAEA;IACI,iBAAiB;AACrB;;AAEA;EACE,4BAA4B;AAC9B;;AAEA;EACE,6BAA6B;AAC/B;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,2BAA2B;AAC7B;;;AAGA;IACI,gBAAgB;AACpB;;AAEA;IACI,iBAAiB;AACrB;;AAEA;IACI,eAAe;AACnB;;AAEA;IACI,kBAAkB;AACtB;;AAEA;;IAEI,0BAA0B;IAC1B,iBAAiB;;IAEjB,yCAAyC;IACzC,4BAA4B;IAC5B,2BAA2B;IAC3B,4BAA4B;IAC5B,sBAAsB;AAC1B;;AAEA;;IAEI,0BAA0B;IAC1B,iBAAiB;;IAEjB,yCAAyC;IACzC,4BAA4B;IAC5B,2BAA2B;IAC3B,4BAA4B;IAC5B,sBAAsB;AAC1B;;AAEA;IACI,sBAAsB;IACtB,WAAW;IACX,aAAa;IACb,eAAe;IACf,oBAAoB;AACxB;;AAEA;EACE,kBAAkB;EAClB,OAAO;EACP,QAAQ;EACR,WAAW;EACX,kBAAkB;EAClB,WAAW;AACb;;AAEA;GACG,kBAAkB;AACrB;;AAEA;IACI,kBAAkB;IAClB,eAAe;AACnB;;AAEA;IACI,0BAA0B;AAC9B;;AAEA;IACI,kBAAkB;IAClB,SAAS;IACT,SAAS;IACT,WAAW;AACf;;AAEA;IACI,eAAe,EAAE,qCAAqC;IACtD,SAAS;IACT,WAAW;IACX,UAAU;AACd;;AAEA;IACI,iBAAiB;IACjB,aAAa;IACb,YAAY;IACZ,UAAU;IACV,YAAY;IACZ,iCAAiC;IACjC,gBAAgB;IAChB,uBAAuB;IACvB,aAAa;AACjB;;AAEA;IACI,iBAAiB;IACjB,aAAa;IACb,YAAY;IACZ,UAAU;IACV,YAAY;IACZ,iCAAiC;IACjC,gBAAgB;IAChB,uBAAuB;IACvB,aAAa;KACZ,OAAO;IACR,QAAQ;AACZ;;AAEA;IACI,iBAAiB;AACrB;;AAEA;IACI,WAAW;IACX,YAAY;AAChB;;AAEA;IACI,YAAY;AAChB;;AAEA;IACI,YAAY;IACZ,WAAW;AACf;;AAEA;IACI,iBAAiB;AACrB;;AAEA;IACI,eAAe;AACnB;;AAEA;IACI,eAAe;AACnB;;AAEA;IACI,kCAAkC;AACtC;;AAEA,oBAAoB;AACpB;IACI,YAAY;IACZ,eAAe;AACnB;;AAEA,kEAAkE;AAClE;IACI,kBAAkB;IAClB,qBAAqB;AACzB;;AAEA,yCAAyC;AACzC;IACI,aAAa;IACb,kBAAkB;IAClB,yBAAyB;IACzB,gBAAgB;IAChB,4CAA4C;IAC5C,UAAU;AACd;;AAEA,8BAA8B;AAC9B;IACI,YAAY;IACZ,kBAAkB;IAClB,qBAAqB;IACrB,cAAc;AAClB;;AAEA,4CAA4C;AAC5C,2BAA2B,yBAAyB;;AAEpD,oCAAoC;AACpC;IACI,cAAc;AAClB;;AAEA,0FAA0F;AAC1F;IACI,yBAAyB;AAC7B;;AAEA,gBAAgB,iBAAiB;AACjC,qBAAqB,eAAe,CAAC,QAAQ,CAAC,SAAS;AACvD,2BAA2B,WAAW,CAAC,qBAAqB,CAAC,iBAAiB,CAAC,aAAa,CAAC,SAAS,CAAC,KAAK,CAAC,SAAS,CAAC,QAAQ,CAAC,SAAS;AACzI,wBAAwB,iBAAiB,CAAC,QAAQ,CAAC,cAAc;AACjE,8BAA8B,wBAAwB;AACtD,+BAA+B,wBAAwB;AACvD,qBAAqB,kBAAkB,CAAC,UAAU,CAAC,iBAAiB,CAAC,iBAAiB,CAAC,UAAU,CAAC,WAAW,CAAC,gBAAgB,CAAC,cAAc,CAAC,iBAAiB,CAAC,SAAS,CAAC,QAAQ,CAAC,WAAW,CAAC,WAAW;AAC1M,yBAAyB,WAAW,CAAC,UAAU,CAAC,iBAAiB,CAAC,eAAe,CAAC,gBAAgB,CAAC,wBAAwB;AAC3H,qBAAqB,UAAU,CAAC,UAAU,CAAC,gBAAgB;AAC3D,2BAA2B,iBAAiB;AAC5C,wBAAwB,iBAAiB;;;AAGzC,sCAAsC;;AAEtC;EACE,YAAY;EACZ,WAAW;AACb;;AAEA,yBAAyB,aAAa,EAAE;AACxC;EACE,WAAW;EACX,iBAAiB;EACjB,wBAAwB;EACxB,qBAAqB;EACrB,gBAAgB;AAClB;;AAEA;EACE,gBAAgB;EAChB,kBAAkB;AACpB;;AAEA;IACI,WAAW;IACX,YAAY;AAChB;;AAEA,kDAAkD;;AAElD;;qDAEqD,cAAc,GAAG,EAAE,iCAAiC;;AAEzG;;;uDAGuD,cAAc,GAAG;;AAExE;IACI,uDAAuD;IACvD,oDAAoD;IACpD,+CAA+C;AACnD;;AAEA;KACK,YAAY;AACjB;;AAEA;IACI,0BAA0B;IAC1B,YAAY;AAChB;;AAEA;IACI,WAAW;IACX,cAAc;AAClB;;AAEA;EACE,kBAAkB;AACpB;;AAEA;;IAEI,8CAA8C;CACjD;;;;;;EAMC,cAAc;CACf;;CAEA,mEAAmE;CACnE;EACC,kBAAkB;EAClB,YAAY;EACZ,aAAa;CACd;;CAEA,qBAAqB,sBAAsB,EAAE;;CAE7C;EACC,yBAAyB;EACzB,YAAY;EACZ,6BAA6B;EAC7B,kBAAkB;EAClB,iBAAiB;EACjB,mBAAmB;EACnB,eAAe;CAChB;;CAEA;EACC,4BAA4B;EAC5B,kBAAkB;EAClB,kCAAkC;EAClC,QAAQ;EACR,SAAS;EACT,UAAU;EACV,mBAAmB;EACnB,mBAAmB;EACnB,eAAe;EACf,iBAAiB;CAClB;;IAEG;QACI,eAAe;IACnB;;IAEA;QACI,gBAAgB;IACpB;;CAEH;;EAEC;IACE,4BAA4B,yBAAyB,EAAE;;IAEvD;;IAEA;QACI,6BAA6B;QAC7B,YAAY;QACZ,OAAO;QACP,YAAY;QACZ,eAAe;QACf,MAAM;QACN,WAAW;QACX,UAAU;IACd;;IAEA;QACI,6CAA6C;QAC7C,kBAAkB;QAClB,gBAAgB;QAChB,WAAW;QACX,6BAA6B;QAC7B,cAAc;QACd,kBAAkB;QAClB,QAAQ;QACR,UAAU;QACV,mBAAmB;IACvB;IACA;QACI,kBAAkB;QAClB,aAAa;QACb,kBAAkB;QAClB,YAAY;IAChB;IACA;QACI,sHAAsH;QACtH,0CAA0C;QAC1C,SAAS;QACT,oBAAoB;QACpB,MAAM;QACN,4BAA4B;IAChC;IACA;QACI,sHAAsH;QACtH,0CAA0C;QAC1C,kBAAkB;QAClB,QAAQ;QACR,QAAQ;QACR,6BAA6B;IACjC;IACA;QACI,sHAAsH;QACtH,0CAA0C;QAC1C,SAAS;QACT,SAAS;QACT,oBAAoB;QACpB,6BAA6B;IACjC;IACA;QACI,sHAAsH;QACtH,0CAA0C;QAC1C,kBAAkB;QAClB,QAAQ;QACR,4BAA4B;IAChC;;IAEA;QACI,YAAY;IAChB;;IAEA;IACA;QACI,YAAY;IAChB;IACA;QACI,aAAa;IACjB;IACA;QACI,aAAa;IACjB;IACA;QACI,aAAa;IACjB;IACA;QACI,aAAa;IACjB;IACA;QACI,YAAY;IAChB;IACA;QACI,aAAa;IACjB;IACA;QACI,aAAa;IACjB;IACA;QACI,YAAY;IAChB;IACA;QACI,aAAa;IACjB;IACA;QACI,aAAa;IACjB;IACA;;IAEA;QACI;YACI,yBAAyB;QAC7B;IACJ;;IAEA,eAAe;AACnB;EACE,qBAAqB;EACrB,aAAa;AACf;;AAEA,iBAAiB;AACjB;EACE,YAAY;EACZ,WAAW;AACb;AACA;EACE,iBAAiB;AACnB;AACA;EACE,SAAS;EACT,eAAe;EACf,cAAc;AAChB;AACA;EACE,cAAc;AAChB;AACA;EACE,gCAAgC;AAClC;AACA;EACE,SAAS;EACT,2BAA2B;EAC3B,cAAc;AAChB;AACA;EACE,cAAc;AAChB;AACA;EACE,eAAe;AACjB;AACA;EACE,gCAAgC;EAChC,kBAAkB;AACpB;AACA;EACE,SAAS;EACT,cAAc;AAChB;AACA;EACE,cAAc;AAChB;AACA;EACE,gBAAgB;EAChB,sBAAsB;EACtB,SAAS;EACT,0BAA0B;EAC1B,eAAe;AACjB;AACA;EACE,iBAAiB;AACnB;;AAEA,oBAAoB;;AAEpB;EACE,iCAAiC;AACnC;AACA;EACE,aAAa;AACf;AACA;EACE,gBAAgB;EAChB,6BAA6B;AAC/B;AACA;EACE,mBAAmB;EACnB,gBAAgB;EAChB,6BAA6B;AAC/B;AACA;EACE,iBAAiB;EACjB,aAAa;EACb,6BAA6B;EAC7B,oBAAoB;AACtB","sourcesContent":["@import url(//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css);\n\n.toast {\n    opacity: 1 !important;\n}\n\n.assignedColor {\n  background-color: #dff0d8;\n}\n\n.toolbar {\n    position:fixed;\n    z-index:1000;\n    width:100%;\n    top:91px;\n    left:0;\n    background-color:ghostwhite;\n}\n\n.panelContrastColor {\n    background-color:ghostwhite;\n}\n\n.positionUnderToolbar{\n    margin-top:50px;\n}\n\n.provisional {\n    background-color: cyan;\n}\n\n.existing {\n    background-color: LightGoldenRodYellow;\n}\n\n.danger {\n    background-color:deeppink;\n}\n\n.customFont {\n    font-family: 'Montserrat', sans-serif;\n}\n.card-header{\n    font-size: 1.640625rem;\n}\n\n.card-title {\n    padding: 5px;\n}\n\n.card-title {\n    background-color: rgba(0, 0, 0, 0.03);\n    border: 1px solid rgba(0, 0, 0, 0.125);\n}\n\n.bigLabel{\n    font-size: 1.5rem;\n}\n\n.btn-default{\n    background-color:white;\n}\n    .hover_img a { position:relative; }\n    .hover_img a span { position:absolute; display:none; z-index:99; }\n    .hover_img a:hover span { display:block; }\n\n    .hover {\n        position:absolute;\n        height: 200px;\n        width: 600px;\n        z-index:99;\n        display:none; \n        box-shadow: 10px 10px 5px #888888;\n        overflow: hidden;\n        background-color: white;\n        padding: 10px;\n    }\n\n.fixed\n{\n    position: fixed;\n    top: 20px;\n    right: 40px;\n}\n\n.bold {\n    font-weight: bold;\n}\n\n.redText {\n    color: purple;\n    font-weight: bolder !important;\n}\n\n.banner {\n    height: 50px;\n    width: 100%;\n    background-color: white;\n    border-bottom-style: solid;\n    border-bottom-width: 1px;\n}\n\n.banner #notice {\n    margin-left: 30px;\n    font-size: 1.25em;\n    color: indianred;\n}\n\n.browse .textContainer {\n    height: 430px;\n    line-height: 400px;\n}\n\n.textContainer h4 {\n    vertical-align: middle;\n    display: inline-block;\n}\n\n.vertical-align {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.table-borderless td,\n.table-borderless th {\n    border: 0 !important;\n}\n\n.topMargin {\n    margin-top: 25px;\n}\n\n.smallTopMargin {\n  margin-top: 5px;\n}\n\n.bottomMargin {\n    margin-bottom: 25px;\n}\n\n.leftMargin {\n    margin-left: 25px;\n}\n\n.rightMargin {\n  margin-right: 25px;\n}\n\n.smallLeftMargin {\n    margin-left: 10px;\n}\n\n.backColorOne {\n  background-color: ghostwhite;\n}\n\n.backColorTwo{\n  background-color: LightSalmon;\n}\n\n.backColorThree {\n  background-color: cyan;\n}\n\n.backColorFour{\n  background-color: lightgrey;\n}\n\n\n.bigTopMargin {\n    margin-top: 50px;\n}\n\n.bigLeftMargin {\n    margin-left: 50px;\n}\n\n.smallMarginTop {\n    margin-top: 5px;\n}\n\n.smallMarginRight {\n    margin-right: 10px;\n}\n\n.parallax1 {\n\n    /* Set a specific height */\n    min-height: 300px;\n\n    /* Create the parallax scrolling effect */\n    background-attachment: fixed;\n    background-position: center;\n    background-repeat: no-repeat;\n    background-size: cover;\n}\n\n.parallax2 {\n\n    /* Set a specific height */\n    min-height: 200px;\n\n    /* Create the parallax scrolling effect */\n    background-attachment: fixed;\n    background-position: center;\n    background-repeat: no-repeat;\n    background-size: cover;\n}\n\n.caption span.border {\n    background-color: #111;\n    color: #fff;\n    padding: 18px;\n    font-size: 25px;\n    letter-spacing: 10px;\n}\n\n.caption {\n  position: absolute;\n  left: 0;\n  top: 25%;\n  width: 100%;\n  text-align: center;\n  color: #000;\n}\n\n.center-text {\n   text-align: center;\n}\n\n.home-page-header{\n    text-align: center;\n    font-size: 30px;\n}\n\n.underline {\n    text-decoration: underline;\n}\n\n.subMenu{\n    position: relative;\n    top: -5px;\n    left: 0px;\n    width: 100%;\n}\n\n.subMenu-container {\n    position: fixed; /* Set the navbar to fixed position */\n    top: 5rem;\n    width: 100%;\n    z-index:99;\n}\n\n.hover {\n    position:absolute;\n    height: 200px;\n    width: 600px;\n    z-index:99;\n    display:none;\n    box-shadow: 10px 10px 5px #888888;\n    overflow: hidden;\n    background-color: white;\n    padding: 10px;\n}\n\n.hoverProfile {\n    position:absolute;\n    height: 250px;\n    width: 500px;\n    z-index:99;\n    display:none;\n    box-shadow: 10px 10px 5px #888888;\n    overflow: hidden;\n    background-color: white;\n    padding: 10px;\n     right:0;\n    bottom:0;\n}\n\n.overFlow {\n    overflow-y:scroll;\n}\n\n.carouselSize {\n    width:700px;\n    height:500px;\n}\n\n.carouselImage {\n    height:500px;\n}\n\n.weatherIcon {\n    height: 50px;\n    width: 50px;\n}\n\n.page-host {\n    margin-top: 10rem;\n}\n\nspan i {\n    cursor: pointer;\n}\n\n.sortable {\n    cursor: pointer;   \n}\n\n.aurelia-flatpickr {\n    background-color: white !important;\n}\n\n/* Dropdown Button */\n.dropbtn {\n    border: none;\n    cursor: pointer;\n}\n\n/* The container <div> - needed to position the dropdown content */\n.dropdown {\n    position: relative;\n    display: inline-block;\n}\n\n/* Dropdown Content (Hidden by Default) */\n.dropdown-content {\n    display: none;\n    position: absolute;\n    background-color: #f9f9f9;\n    min-width: 160px;\n    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);\n    z-index: 1;\n}\n\n/* Links inside the dropdown */\n.dropdown-content a {\n    color: black;\n    padding: 12px 16px;\n    text-decoration: none;\n    display: block;\n}\n\n/* Change color of dropdown links on hover */\n.dropdown-content a:hover {background-color: #f1f1f1}\n\n/* Show the dropdown menu on hover */\n.dropdown:hover .dropdown-content {\n    display: block;\n}\n\n/* Change the background color of the dropdown button when the dropdown content is shown */\n.dropdown:hover .dropbtn {\n    background-color: #3e8e41;\n}\n\n.smart-timeline{position:relative}\n.smart-timeline-list{list-style:none;margin:0;padding:0}\n.smart-timeline-list:after{content:\" \";background-color:#eee;position:absolute;display:block;width:2px;top:0;left:95px;bottom:0;z-index:1}\n.smart-timeline-list li{position:relative;margin:0;padding:15px 0}\n.smart-timeline-list>li:hover{background-color:#f4f4f4}\n.smart-timeline-hover li:hover{background-color:#f9f9f9}\n.smart-timeline-icon{background:#3276b1;color:#fff;border-radius:50%;position:absolute;width:32px;height:32px;line-height:28px;font-size:14px;text-align:center;left:80px;top:10px;z-index:100;padding:2px}\n.smart-timeline-icon>img{height:32px;width:32px;border-radius:50%;margin-top:-2px;margin-left:-2px;border:2px solid #3276b1}\n.smart-timeline-time{float:left;width:70px;text-align:right}\n.smart-timeline-time>small{font-style:italic}\n.smart-timeline-content{margin-left:123px}\n\n\n/****** Style Star Rating Widget *****/\n\n.rating { \n  border: none;\n  float: left;\n}\n\n.rating > span > input { display: none; } \n.rating > span > label:before { \n  margin: 5px;\n  font-size: 1.25em;\n  font-family: FontAwesome;\n  display: inline-block;\n  content: \"\\f005\";\n}\n\n.rating > span > .half:before { \n  content: \"\\f089\";\n  position: absolute;\n}\n\n.rating > span > label { \n    color: #ddd; \n    float: right; \n}\n\n/***** CSS Magic to Highlight Stars on Hover *****/\n\n.rating > span > input:checked ~ label, /* show gold star when clicked */\n.rating:not(:checked) > span > label:hover, /* hover current star */\n.rating:not(:checked) > span > label:hover ~ label { color: #FFD700;  } /* hover previous stars in list */\n\n.rating > span > input:checked + label:hover, /* hover current star when changing rating */\n.rating > span >  input:checked ~ label:hover,\n.rating > span > label:hover ~ input:checked ~ label, /* lighten current selection */\n.rating > span > input:checked ~ label:hover ~ label { color: #FFED85;  }\n\n.link-shadow {\n    -webkit-box-shadow: 3px 4px 11px 0px rgba(105,97,105,1);\n    -moz-box-shadow: 3px 4px 11px 0px rgba(105,97,105,1);\n    box-shadow: 3px 4px 11px 0px rgba(105,97,105,1);\n}\n\n#curriculumInfo{\n     display:none;\n}\n\nux-dialog-header {\n    background-color: #ffbd00 ;\n    color: white;\n}\n\n.col-centered{\n    float: none;\n    margin: 0 auto;\n}\n\n.circular--square {\n  border-radius: 50%;\n}\n\n@media only screen and (max-width: 800px) {\n    \n    /* Force table to not be like tables anymore */\n\t#no-more-tables table, \n\t#no-more-tables thead, \n\t#no-more-tables tbody, \n\t#no-more-tables th, \n\t#no-more-tables td, \n\t#no-more-tables tr { \n\t\tdisplay: block; \n\t}\n \n\t/* Hide table headers (but not display: none;, for accessibility) */\n\t#no-more-tables thead tr { \n\t\tposition: absolute;\n\t\ttop: -9999px;\n\t\tleft: -9999px;\n\t}\n \n\t#no-more-tables tr { border: 1px solid #ccc; }\n \n\t#no-more-tables td { \n\t\t/* Behave  like a \"row\" */\n\t\tborder: none;\n\t\tborder-bottom: 1px solid #eee; \n\t\tposition: relative;\n\t\tpadding-left: 50%; \n\t\twhite-space: normal;\n\t\ttext-align:left;\n\t}\n \n\t#no-more-tables td:before { \n\t\t/* Now like a table header */\n\t\tposition: absolute;\n\t\t/* Top/left values mimic padding */\n\t\ttop: 6px;\n\t\tleft: 6px;\n\t\twidth: 45%; \n\t\tpadding-right: 10px; \n\t\twhite-space: nowrap;\n\t\ttext-align:left;\n\t\tfont-weight: bold;\n\t}\n\n    .clickable{\n        cursor: pointer;   \n    }\n\n    .smallFont{\n        font-size: small;\n    }\n\n\t/*\n\tLabel the data\n\t*/\n    #no-more-tables td:before { content: attr(data-title); }\n    \n    }\n\n    #loading {\n        background: repeat scroll 0 0;\n        height: 100%;\n        left: 0;\n        margin: auto;\n        position: fixed;\n        top: 0;\n        width: 100%;\n        z-index:99;\n    }\n\n    .bokeh {\n        border: 0.01em solid rgba(150, 150, 150, 0.1);\n        border-radius: 50%;\n        font-size: 100px;\n        height: 1em;\n        list-style: outside none none;\n        margin: 0 auto;\n        position: relative;\n        top: 35%;\n        width: 1em;\n        z-index: 2147483647;\n    }\n    .bokeh li {\n        border-radius: 50%;\n        height: 0.2em;\n        position: absolute;\n        width: 0.2em;\n    }\n    .bokeh li:nth-child(1) {\n        animation: 1.13s linear 0s normal none infinite running rota, 3.67s ease-in-out 0s alternate none infinite running opa;\n        background: #00c176 none repeat scroll 0 0;\n        left: 50%;\n        margin: 0 0 0 -0.1em;\n        top: 0;\n        transform-origin: 50% 250% 0;\n    }\n    .bokeh li:nth-child(2) {\n        animation: 1.86s linear 0s normal none infinite running rota, 4.29s ease-in-out 0s alternate none infinite running opa;\n        background: #ff003c none repeat scroll 0 0;\n        margin: -0.1em 0 0;\n        right: 0;\n        top: 50%;\n        transform-origin: -150% 50% 0;\n    }\n    .bokeh li:nth-child(3) {\n        animation: 1.45s linear 0s normal none infinite running rota, 5.12s ease-in-out 0s alternate none infinite running opa;\n        background: #fabe28 none repeat scroll 0 0;\n        bottom: 0;\n        left: 50%;\n        margin: 0 0 0 -0.1em;\n        transform-origin: 50% -150% 0;\n    }\n    .bokeh li:nth-child(4) {\n        animation: 1.72s linear 0s normal none infinite running rota, 5.25s ease-in-out 0s alternate none infinite running opa;\n        background: #88c100 none repeat scroll 0 0;\n        margin: -0.1em 0 0;\n        top: 50%;\n        transform-origin: 250% 50% 0;\n    }\n    \n    .translucent{\n        opacity: 0.2;\n    }\n    \n    @keyframes opa {\n    12% {\n        opacity: 0.8;\n    }\n    19.5% {\n        opacity: 0.88;\n    }\n    37.2% {\n        opacity: 0.64;\n    }\n    40.5% {\n        opacity: 0.52;\n    }\n    52.7% {\n        opacity: 0.69;\n    }\n    60.2% {\n        opacity: 0.6;\n    }\n    66.6% {\n        opacity: 0.52;\n    }\n    70% {\n        opacity: 0.63;\n    }\n    79.9% {\n        opacity: 0.6;\n    }\n    84.2% {\n        opacity: 0.75;\n    }\n    91% {\n        opacity: 0.87;\n    }\n    }\n    \n    @keyframes rota {\n        100% {\n            transform: rotate(360deg);\n        }\n    }\n\n    /* Tabs panel */\n.tabbable-panel {\n  border:1px solid #eee;\n  padding: 10px;\n}\n\n/* Default mode */\n.tabbable-line > .nav-tabs {\n  border: none;\n  margin: 0px;\n}\n.tabbable-line > .nav-tabs > li {\n  margin-right: 2px;\n}\n.tabbable-line > .nav-tabs > li > a {\n  border: 0;\n  margin-right: 0;\n  color: #737373;\n}\n.tabbable-line > .nav-tabs > li > a > i {\n  color: #a6a6a6;\n}\n.tabbable-line > .nav-tabs > li.open, .tabbable-line > .nav-tabs > li:hover {\n  border-bottom: 4px solid #fbcdcf;\n}\n.tabbable-line > .nav-tabs > li.open > a, .tabbable-line > .nav-tabs > li:hover > a {\n  border: 0;\n  background: none !important;\n  color: #333333;\n}\n.tabbable-line > .nav-tabs > li.open > a > i, .tabbable-line > .nav-tabs > li:hover > a > i {\n  color: #a6a6a6;\n}\n.tabbable-line > .nav-tabs > li.open .dropdown-menu, .tabbable-line > .nav-tabs > li:hover .dropdown-menu {\n  margin-top: 0px;\n}\n.tabbable-line > .nav-tabs > li.active {\n  border-bottom: 4px solid #f3565d;\n  position: relative;\n}\n.tabbable-line > .nav-tabs > li.active > a {\n  border: 0;\n  color: #333333;\n}\n.tabbable-line > .nav-tabs > li.active > a > i {\n  color: #404040;\n}\n.tabbable-line > .tab-content {\n  margin-top: -3px;\n  background-color: #fff;\n  border: 0;\n  border-top: 1px solid #eee;\n  padding: 15px 0;\n}\n.portlet .tabbable-line > .tab-content {\n  padding-bottom: 0;\n}\n\n/* Below tabs mode */\n\n.tabbable-line.tabs-below > .nav-tabs > li {\n  border-top: 4px solid transparent;\n}\n.tabbable-line.tabs-below > .nav-tabs > li > a {\n  margin-top: 0;\n}\n.tabbable-line.tabs-below > .nav-tabs > li:hover {\n  border-bottom: 0;\n  border-top: 4px solid #fbcdcf;\n}\n.tabbable-line.tabs-below > .nav-tabs > li.active {\n  margin-bottom: -2px;\n  border-bottom: 0;\n  border-top: 4px solid #f3565d;\n}\n.tabbable-line.tabs-below > .tab-content {\n  margin-top: -10px;\n  border-top: 0;\n  border-bottom: 1px solid #eee;\n  padding-bottom: 15px;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ })

}]);
//# sourceMappingURL=app-efc01b10.2384d3fce1a12a237460.bundle.js.map