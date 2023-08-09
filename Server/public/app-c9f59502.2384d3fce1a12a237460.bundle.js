"use strict";
(self["webpackChunkuccss_old_new"] = self["webpackChunkuccss_old_new"] || []).push([["app-c9f59502"],{

/***/ "modules/tech/support/viewHelpTickets":
/*!*****************************************************!*\
  !*** ./src/modules/tech/support/viewHelpTickets.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ViewHelpTickets: function() { return /* binding */ ViewHelpTickets; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var aurelia_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aurelia-router */ 6433);
/* harmony import */ var _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../resources/utils/dataTable */ 6847);
/* harmony import */ var _resources_data_helpTickets__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../resources/data/helpTickets */ 8142);
/* harmony import */ var _resources_data_sessions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../resources/data/sessions */ 2073);
/* harmony import */ var _resources_data_systems__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../resources/data/systems */ 4077);
/* harmony import */ var _resources_data_products__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../resources/data/products */ 8666);
/* harmony import */ var _resources_data_downloads__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../resources/data/downloads */ 9132);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../config/appConfig */ 1666);
/* harmony import */ var _resources_utils_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../resources/utils/utils */ 8741);
/* harmony import */ var _resources_data_people__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../resources/data/people */ 353);
/* harmony import */ var _resources_utils_validation__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../resources/utils/validation */ 2824);
/* harmony import */ var _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../resources/dialogs/common-dialogs */ 6545);
/* harmony import */ var _resources_data_clientRequests__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../resources/data/clientRequests */ 5446);
/* harmony import */ var _resources_data_documents__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../resources/data/documents */ 7188);
var _dec, _class;















let ViewHelpTickets = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(aurelia_router__WEBPACK_IMPORTED_MODULE_1__.Router, _config_appConfig__WEBPACK_IMPORTED_MODULE_8__.AppConfig, _resources_utils_validation__WEBPACK_IMPORTED_MODULE_11__["default"], _resources_data_people__WEBPACK_IMPORTED_MODULE_10__.People, _resources_dialogs_common_dialogs__WEBPACK_IMPORTED_MODULE_12__.CommonDialogs, _resources_utils_dataTable__WEBPACK_IMPORTED_MODULE_2__.DataTable, _resources_utils_utils__WEBPACK_IMPORTED_MODULE_9__.Utils, _resources_data_helpTickets__WEBPACK_IMPORTED_MODULE_3__.HelpTickets, _resources_data_sessions__WEBPACK_IMPORTED_MODULE_4__.Sessions, _resources_data_systems__WEBPACK_IMPORTED_MODULE_5__.Systems, _resources_data_downloads__WEBPACK_IMPORTED_MODULE_7__.Downloads, _resources_data_products__WEBPACK_IMPORTED_MODULE_6__.Products, aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.TemplatingEngine, _resources_data_clientRequests__WEBPACK_IMPORTED_MODULE_13__.ClientRequests, _resources_data_documents__WEBPACK_IMPORTED_MODULE_14__.DocumentsServices, _resources_data_clientRequests__WEBPACK_IMPORTED_MODULE_13__.ClientRequests), _dec(_class = class ViewHelpTickets {
  constructor(router, config, validation, people, dialog, datatable, utils, helpTickets, sessions, systems, apps, products, templatingEngine, requests, documents) {
    this.helpTicketSelected = false;
    this.enterResponse = false;
    this.sendMailDisable = false;
    this.notesHistory = false;
    this.showRequestPanel = false;
    this.viewHelpTickets = true;
    this.showAssignment = false;
    this.refreshInterval = 10;
    //minutes
    this.tableMargin = "margin-top:0px;";
    this.toolbar = void 0;
    this.colSpan = 10;
    this.spinnerHTML = "";
    this.filterValues = new Array();
    this.commentShown = "";
    this.responseMessage = "";
    this.toolbar = [['style', ['style', 'bold', 'italic', 'underline', 'clear']], ['color', ['color']], ['font', ['strikethrough', 'superscript', 'subscript']], ['layout', ['ul', 'ol', 'paragraph']], ['insert', ['link', 'table', 'hello']], ['misc', ['undo', 'redo', 'fullscreen', 'codeview']]];
    this.router = router;
    this.config = config;
    this.validation = validation;
    this.validation.initialize(this);
    this.people = people;
    this.dataTable = datatable;
    this.dataTable.initialize(this);
    this.utils = utils;
    this.helpTickets = helpTickets;
    this.sessions = sessions;
    this.systems = systems;
    this.apps = apps;
    this.products = products;
    this.dialog = dialog;
    this.templatingEngine = templatingEngine;
    this.requests = requests;
    this.documents = documents;
    this.userObj = JSON.parse(sessionStorage.getItem('user'));
    this.isUCC = this.userObj.userRole >= this.config.UCC_ROLE;
  }
  /*****************************************************************************************
  * Retrieve the help tickets, sessions, downloads and people
  * Only active help tickets are retrieved
  *****************************************************************************************/
  async activate(params) {
    let responses = await Promise.all([this.helpTickets.getHelpTicketTypes('?order=category'), this.config.getConfig()]);
    if (params.HTNumber == -1) {
      await this.showHTList();
    } else {
      this.HTToShow = params.HTNumber;
      this.showHelpTicketImmediately = true;
    }
  }
  async showHTList() {
    this.sessions.getSessionsArray('?order=startDate:DSC');
    this.apps.getDownloadsArray(true, '?filter=helpTicketRelevant|eq|true&order=name');
    this.systems.getSystemsArray();
    this.documents.getDocumentsCategoriesArray();
    this.products.getProductsArray('?fields=_id name');
    this.dataTable.updateArray(this.helpTickets.helpTicketsArray);
    this.sendEmail = this.config.SEND_EMAILS;
    this._setUpValidation();
    this.helpTicketTypes = this.config.HELP_TICKET_STATUSES.filter(item => {
      return item.code !== this.config.CLOSED_HELPTICKET_STATUS;
    });
    this.helpTicketTypeLookupArray = new Array();
    this.helpTickets.helpTicketTypesArray.forEach(item => {
      item.subtypes.forEach(item2 => {
        this.helpTicketTypeLookupArray.push({
          helpTicketType: item2.type,
          description: item2.description
        });
      });
    });
    this.removeHTStatus = [this.config.NEW_HELPTICKET_STATUS, this.config.REPLIED_HELPTICKET_STATUS];
    if (this.utils.isMobile()) {
      this.mobile = true;
      this.toolbar = [['style', ['style', 'bold', 'clear']]];
    }
    this.initialLoaded = false;
    this.refreshInterval = this.config.HELP_TICKET_REFRESH_INTERVAL;
  }
  async showHT(HTNumber) {
    this.tableMargin = "margin-top:0px;";
    //Make the selected help ticket the selected help ticket
    await this.helpTickets.getHelpTicketByNumber(HTNumber);
    this.oroginalHelpTicket = this.helpTickets.selectedHelpTicket;
    this.openHelpTicket();
    let indices = this.getIndex();
    let subTypeIndex = indices.subTypeIndex;
    let categoryIndex = indices.categoryIndex;
    this.createOutputForm(this.helpTickets.helpTicketTypesArray[categoryIndex].subtypes[subTypeIndex].outputForm);
    this.viewHelpTicketsHeading = "Help Ticket " + this.helpTickets.selectedHelpTicket.helpTicketNo;
    this.helpTicketSelected = true;
    window.scrollTo(0, 0);
  }
  async attached() {
    this.refresh(false);
    if (!this.mobile) this.toolTips();
    this.initialLoaded = true;
    setInterval(() => {
      if (!this.helpTicketSelected) this.refresh(false);
    }, this.refreshInterval * 60 * 1000);
    $.summernote.dom.emptyPara = "<div><br/></div>";
    if (this.showHelpTicketImmediately) await this.showHT(this.HTToShow);
  }
  toolTips() {
    $('[data-toggle="tooltip"]').tooltip();
  }
  sendMailNow() {
    this.helpTickets.sendMail();
  }
  showComment(helpTicket, el) {
    this.commentShown = helpTicket.content[0].content.comments;
    $(".hover").css("top", el.clientY - 100);
    $(".hover").css("left", el.clientX + 10);
    $(".hover").css("display", "block");
  }
  hideComment() {
    $(".hover").css("display", "none");
  }
  showProfile(helpTicket, el) {
    this.profileHelpTicket = helpTicket;
    $(".hoverProfile").css("top", el.clientY - 175);
    $(".hoverProfile").css("left", el.clientX - 200);
    $(".hoverProfile").css("display", "block");
  }
  hideProfile() {
    $(".hoverProfile").css("display", "none");
  }
  async viewAssignment(index, request) {
    this.editIndex = index;
    let response = await this.requests.getRequestDetail(request._id);
    if (!response.error) {
      this.selectedRequestDetail = response;
      if (this.selectedRequestDetail.requestId && this.selectedRequestDetail.requestId.courseId === null) this.selectedRequestDetail.requestId.courseId = {
        _id: this.config.SANDBOX_ID,
        name: this.config.SANDBOX_NAME
      };
      this.products.selectedProductFromId(this.selectedRequestDetail.productId._id);
      if (this.selectedRequestDetail.assignments && this.selectedRequestDetail.assignments.length > 0) this.systems.selectedSystemFromId(this.selectedRequestDetail.assignments[0].systemId);
      this.showAssignment = true;
    }
  }
  backView() {
    this.showAssignment = false;
  }
  sendAnEmail(person) {
    if (person) {
      let email = {
        emailBody: "",
        emailSubject: "",
        person: person
      };
      return this.dialog.showEmail("Enter Email", email, ['Submit', 'Cancel']).whenClosed(response => {
        if (!response.wasCancelled) {
          this.sendTheEmail(response.output);
        } else {
          console.log("Cancelled");
        }
      });
    }
  }
  async sendTheEmail(email) {
    if (email) {
      var message = {
        id: email.email.person._id,
        fullName: email.email.person.fullName,
        message: email.email.emailBody,
        email: email.email.person.email,
        subject: email.email.emailSubject,
        audit: {
          property: 'Send Message',
          eventDate: new Date(),
          newValue: email.email.emailBody,
          personId: this.userObj._id
        }
      };
      let serverResponse = await this.people.sendCustomerMessage(message);
      if (!serverResponse.error) {
        this.utils.showNotification("The message was sent");
        this.hideProfile();
      }
    }
  }
  confidentialChecked() {
    if (document.getElementById('confidentialCheckBox').checked) {
      this.sendMailDisable = true;
      this.sendEmail = false;
    } else {
      this.sendMailDisable = false;
      this.sendEmail = true;
    }
  }

  /*****************************************************************************************
  * Refresh the helpticket collection
  *****************************************************************************************/
  async refresh(clickRefresh) {
    if (!clickRefresh) $("#loading").show();
    await this.helpTickets.getHelpTicketArray("?filter=helpTicketStatus|lt|" + this.config.CLOSED_HELPTICKET_STATUS + "&order=createdDate:DSC", true), this.dataTable.updateArray(this.helpTickets.helpTicketsArray);
    this.helpTickets.calcHelpTicketAges();
    $("#loading").hide();
    this._cleanUpFilters();
  }

  /*****************************************************************************************
  * User selected a help ticket
  * el - event object
  * index - index of selected help ticket
  *****************************************************************************************/
  async selectHelpTicket(el, index, helpTicket) {
    this.tableMargin = "margin-top:0px;";
    //Make the selected help ticket the selected help ticket
    this.editIndex = this.dataTable.getOriginalIndex(index);
    await this.helpTickets.getHelpTicket(helpTicket._id);
    this.proceedWithSelect(el);
  }
  proceedWithSelect(el) {
    this.oroginalHelpTicket = this.helpTickets.selectedHelpTicket;
    this.openHelpTicket();
    let indices = this.getIndex();
    let subTypeIndex = indices.subTypeIndex;
    let categoryIndex = indices.categoryIndex;
    this.createOutputForm(this.helpTickets.helpTicketTypesArray[categoryIndex].subtypes[subTypeIndex].outputForm);
    if (this.selectedRow) this.selectedRow.children().removeClass('info');
    this.selectedRow = $(el.target).closest('tr');
    this.selectedRow.children().addClass('info');
    this.viewHelpTicketsHeading = "Help Ticket " + this.helpTickets.selectedHelpTicket.helpTicketNo;
    this.helpTicketSelected = true;
    window.scrollTo(0, 0);
  }
  getCategoryIndex() {
    for (var i = 0; i < this.helpTickets.helpTicketTypesArray.length; i++) {
      if (this.helpTickets.helpTicketTypesArray[i] == this.helpTickets.selectedHelpTicket.helpTicketCategory) {
        return i;
      }
    }
  }
  getIndex() {
    for (var j = 0; j < this.helpTickets.helpTicketTypesArray.length; j++) {
      for (var i = 0; i < this.helpTickets.helpTicketTypesArray[j].subtypes.length; i++) {
        if (this.helpTickets.helpTicketTypesArray[j].subtypes[i].type === this.helpTickets.selectedHelpTicket.content[0].type || this.helpTickets.helpTicketTypesArray[j].subtypes[i].type === 'OTHER_OTHER' && this.helpTickets.selectedHelpTicket.content[0].type === 'OTHER') {
          return {
            subTypeIndex: i,
            categoryIndex: j
          };
        }
      }
    }
  }
  createOutputForm(html) {
    let el = document.getElementById('container');
    el.innerHTML = html;
    if (el) {
      if (!el.querySelectorAll('.au-target').length) {
        this.templatingEngine.enhance({
          element: el,
          bindingContext: this
        });
      }
    }
  }
  async openHelpTicket() {
    if (this.helpTickets.selectedHelpTicket._id.length) {
      await this.getDetails();
    } else {
      this.utils.showNotification('Help Ticket not found');
    }
  }
  async getDetails() {
    this.showRequestDetails = false;
    if (this.helpTickets.selectedHelpTicket.requestId) {
      if (this.helpTickets.selectedHelpTicket.requestId.assignments && this.helpTickets.selectedHelpTicket.requestId.assignments.length > 0) this.showRequestDetails = true;
      this.showCourse = false;
      this.course = "";
      this.showCourse = true;
      if (this.helpTickets.selectedHelpTicket.courseId) {
        this.course = this.helpTickets.selectedHelpTicket.courseId.number + " - " + this.helpTickets.selectedHelpTicket.courseId.name;
      } else {
        this.course = this.config.SANDBOX_NAME;
      }
    }
  }
  async save(changes) {
    changes = changes ? changes : this.helpTickets.isHelpTicketDirty(this.oroginalHelpTicket, ["requestId", "courseId", "personId", "institutionId"]);
    if (changes && changes.length > 0) {
      changes.forEach(item => {
        this.helpTickets.selectedHelpTicket.audit.push({
          property: item.property,
          oldValue: item.oldValue,
          newValue: item.newValue,
          eventDate: new Date(),
          personId: this.userObj._id
        });
      });
    }
    if (this.helpTickets.selectedHelpTicket.helpTicketStatus == this.config.CLOSED_HELPTICKET_STATUS) {
      this.helpTickets.selectHelpTicketContent();
      this.responseMessage = "Help Ticket closed by " + this.userObj.fullName;
      this._createResponse();
      let serverResponse = await this.helpTickets.closeHelpTicket();
      if (!serverResponse.error) {
        // this.dataTable.updateArray(this.helpTickets.helpTicketsArray);
        this.dataTable.updateArrayMaintainFilters(this.helpTickets.helpTicketsArray);
        this.reSort();
        this.utils.showNotification("The help ticket was updated");
      }
    } else {
      let serverResponse = await this.helpTickets.saveHelpTicket();
      if (!serverResponse.error) {
        this.dataTable.updateArrayMaintainFilters(this.helpTickets.helpTicketsArray);
        this.reSort();
        // this.dataTable.updateArray(this.helpTickets.helpTicketsArray);
        this.utils.showNotification("The help ticket was updated");
      }
    }

    // var email = new Object();
    // let serverResponse = await this.helpTickets.saveHelpTicket(email);
    // if (!serverResponse.error) {
    //   // if (serverResponse.helpTicketStatus == this.config.CLOSED_HELPTICKET_STATUS) await this.refresh(false);
    //   this.dataTable.updateArray(this.helpTickets.helpTicketsArray);
    //   this.utils.showNotification("The help ticket was updated");
    // }
    this._cleanUp();
  }
  getStatusDescription(status) {
    for (let i = 0; i < this.config.HELP_TICKET_STATUSES.length; i++) {
      if (status == this.config.HELP_TICKET_STATUSES[i].code) {
        return this.config.HELP_TICKET_STATUSES[i].description;
      }
    }
    return "";
  }

  /*****************************************************************************************
  * Open the response form and create an empty help ticket content object
  *****************************************************************************************/
  async respond() {
    if (!this.enterResponse) {
      let owner = await this.helpTickets.getOwner(this.helpTickets.selectedHelpTicket._id);
      if (this.helpTickets.selectedHelpTicket.owner[0].personId == null) {
        await this.noOwnerRespond();
      } else if (owner.owner[0].personId._id != this.userObj._id) {
        await this.dontOwnItRespond(owner);
      } else {
        this.proceedWithResponse();
      }
    }
  }
  async noOwnerRespond() {
    this.dialog.showMessage("Please take ownership of this help ticket before responding. Press OK to take ownership or Cancel to return to the list.", "Continue", ['OK', 'Cancel']).whenClosed(response => {
      if (!response.wasCancelled) {
        this.ownAndRespond();
      } else {
        this.back();
      }
    });
  }
  async ownAndRespond() {
    var obj = {
      status: this.config.REVIEW_HELPTICKET_STATUS,
      personId: this.userObj._id
    };
    let serverResponse = await this.helpTickets.updateOwner(obj);
    this.proceedWithResponse();
  }
  async dontOwnItRespond(owner) {
    this.dialog.showMessage("This help ticket is owned by " + owner.owner[0].personId.firstName + " " + owner.owner[0].personId.lastName + ".  If you continue your response may conflict with their efforts.", "Continue", ['Proceed', 'Cancel']).whenClosed(response => {
      if (!response.wasCancelled) {
        this.proceedWithResponse();
      }
    });
  }
  proceedWithResponse() {
    this.sendMailDisable = false;
    // this.responseMessage = "<p></p>";
    this.responseMessage = "";
    this.helpTickets.selectHelpTicketContent();
    this.enterResponse = true;
    this.enableButton = true;
    window.scrollTo(0, 0);
    setTimeout(() => {
      $(".note-editable").focus().scroll();
    }, 500);
  }
  cancelResponse() {
    this.response = new Object();
    this.isUnchanged = true;
    this.enterResponse = false;
  }

  /*****************************************************************************************
  * Create the response object
  *****************************************************************************************/
  _createResponse() {
    this.helpTickets.selectedHelpTicketContent.personId = this.userObj._id;
    this.helpTickets.selectedHelpTicketContent.type = this.config.HELP_TICKET_OTHER_TYPE;
    this.helpTickets.selectedHelpTicketContent.emailSent = this.sendEmail;
    this.helpTickets.selectedHelpTicketContent.content.comments = this.responseMessage;
    this.helpTickets.selectedHelpTicketContent.displayForm = this.config.HELP_TICKET_OTHER_TYPE;
  }

  /*****************************************************************************************
  * Save the response
  *****************************************************************************************/
  async saveResponse(status) {
    if (status === this.config.CLOSED_HELPTICKET_STATUS) {
      this.dialog.showMessage("Are you sure you want to close this help ticket", "Save Changes", ['Yes', 'No']).whenClosed(response => {
        if (!response.wasCancelled) {
          this.saveAndCLoseIt(status);
        }
      });
    } else {
      this.saveIt(status);
    }
  }
  async saveAndCLoseIt(status) {
    this.helpTickets.selectedHelpTicket.helpTicketStatus = status;
    var helpTicket = this.helpTickets.selectedHelpTicket._id;
    this._createResponse();
    var email = new Object();
    if (this.sendEmail) {
      if (status == this.config.CUSTOMER_ACTION_HELPTICKET_STATUS) {
        email.MESSAGE = this.config.HELP_TICKET_UPDATED_MESSAGE_CA.replace('[[No]]', this.helpTickets.selectedHelpTicket.helpTicketNo);
        email.subject = this.config.HELP_TICKET_UPDATED_SUBJECT_CA.replace('[[No]]', this.helpTickets.selectedHelpTicket.helpTicketNo);
      } else if (status == this.config.CLOSED_HELPTICKET_STATUS) {
        email.MESSAGE = this.config.HELP_TICKET_UPDATE_CLOSED_MESSAGE_C.replace('[[No]]', this.helpTickets.selectedHelpTicket.helpTicketNo);
        ;
        email.subject = this.config.HELP_TICKET_UPDATE_CLOSED_SUBJECT_C.replace('[[No]]', this.helpTickets.selectedHelpTicket.helpTicketNo);
      } else {
        email.MESSAGE = this.config.HELP_TICKET_UPDATE_MESSAGE_R.replace('[[No]]', this.helpTickets.selectedHelpTicket.helpTicketNo);
        ;
        email.subject = this.config.HELP_TICKET_UPDATE_SUBJECT_R.replace('[[No]]', this.helpTickets.selectedHelpTicket.helpTicketNo);
      }
      email.INSTRUCTIONS = this.config.HELP_TICKET_INSTRUCTIONS;
      email.email = this.helpTickets.selectedHelpTicket.personId.email;
      email.cc = this.config.HELP_TICKET_EMAIL_LIST ? this.config.HELP_TICKET_EMAIL_LIST : "";
    }
    let serverResponse = await this.helpTickets.saveHelpTicketResponseAndCLose(email);
    if (!serverResponse.error) {
      await this.refresh(false);
      this.utils.showNotification("The help ticket was updated");
      if (this.filesToUpload && this.filesToUpload.length > 0) this.helpTickets.uploadFileArchive(this.filesToUpload, this.helpTickets.selectedHelpTicket._id);
    }
    this._cleanUp();
  }
  async saveIt(status) {
    this.helpTickets.selectedHelpTicket.helpTicketStatus = status;
    var helpTicket = this.helpTickets.selectedHelpTicket;
    this._createResponse();
    var email = new Object();
    if (this.sendEmail) {
      if (status == this.config.CUSTOMER_ACTION_HELPTICKET_STATUS) {
        email.MESSAGE = this.config.HELP_TICKET_UPDATED_MESSAGE_CA.replace('[[No]]', this.helpTickets.selectedHelpTicket.helpTicketNo);
        email.subject = this.config.HELP_TICKET_UPDATED_SUBJECT_CA.replace('[[No]]', this.helpTickets.selectedHelpTicket.helpTicketNo);
      } else if (status == this.config.CLOSED_HELPTICKET_STATUS) {
        email.MESSAGE = this.config.HELP_TICKET_UPDATE_CLOSED_MESSAGE_C.replace('[[No]]', this.helpTickets.selectedHelpTicket.helpTicketNo);
        ;
        email.subject = this.config.HELP_TICKET_UPDATE_CLOSED_SUBJECT_C.replace('[[No]]', this.helpTickets.selectedHelpTicket.helpTicketNo);
      } else {
        email.MESSAGE = this.config.HELP_TICKET_UPDATE_MESSAGE_R.replace('[[No]]', this.helpTickets.selectedHelpTicket.helpTicketNo);
        ;
        email.subject = this.config.HELP_TICKET_UPDATE_SUBJECT_R.replace('[[No]]', this.helpTickets.selectedHelpTicket.helpTicketNo);
      }
      email.INSTRUCTIONS = this.config.HELP_TICKET_INSTRUCTIONS;
      email.email = this.helpTickets.selectedHelpTicket.personId.email;
      email.cc = this.config.HELP_TICKET_EMAIL_LIST ? this.config.HELP_TICKET_EMAIL_LIST : "";
    }
    let serverResponse = await this.helpTickets.saveHelpTicketResponse(email);
    if (!serverResponse.error) {
      if (status == this.config.CLOSED_HELPTICKET_STATUS) {
        await this.refresh(false);
      } else {
        this.dataTable.updateArrayMaintainFilters(this.helpTickets.helpTicketsArray);
        this.reSort();
      }
      this.utils.showNotification("The help ticket was updated");
      if (this.filesToUpload && this.filesToUpload.length > 0) this.helpTickets.uploadFile(this.filesToUpload, this.helpTickets.selectedHelpTicket._id);
    }
    this._cleanUp();
  }
  async ownHelpTicket(helpTicket) {
    if (helpTicket) {
      this.helpTickets.selectHelpTicketByID(helpTicket._id);
    }
    if (this.helpTickets.selectedHelpTicket.owner[0].personId == this.userObj._id) return;
    if (this.helpTickets.selectedHelpTicket.owner[0].personId !== this.userObj._id && this.helpTickets.selectedHelpTicket.owner[0].personId != null) {
      this.dialog.showMessage("Are you sure you want to change ownership of this help ticket", "Save Changes", ['Yes', 'No']).whenClosed(response => {
        if (!response.wasCancelled) {
          this.ownIt();
        }
      });
    } else {
      this.ownIt();
    }
  }
  async ownIt() {
    if (this.helpTickets.selectedHelpTicket.owner[0].personId === null) {
      var obj = {
        status: this.config.REVIEW_HELPTICKET_STATUS,
        personId: this.userObj._id
      };
    } else {
      if (this.helpTickets.selectedHelpTicket.owner[0].personId._id != this.userObj._id) {
        var obj = {
          status: this.config.REVIEW_HELPTICKET_STATUS,
          personId: this.userObj._id
        };
      } else {
        var obj = {
          status: this.config.NEW_HELPTICKET_STATUS,
          personId: "b1b1b1b1b1b1b1b1b1b1b1b1"
        };
      }
    }
    let serverResponse = await this.helpTickets.updateOwner(obj);
    if (!serverResponse.error) {
      this.dataTable.updateArrayMaintainFilters(this.helpTickets.helpTicketsArray);
      this.reSort();
      // this.dataTable.updateArray(this.helpTickets.helpTicketsArray);
      this.utils.showNotification("The help ticket was updated");
    }
    if (this.helpTickets.selectedHelpTicket) {
      this._cleanUp();
    }
  }
  async changeStatus(helpTicket, status) {
    if (status == this.config.MY_HELPTICKET_STATUS && this.userObj._id != helpTicket.owner[0].personId._id) {
      this.utils.showNotification('You must own this ticket before you can make it yours');
      return;
    }
    this.helpTickets.selectHelpTicketByID(helpTicket._id);
    var obj = {
      property: "helpTicketStatus",
      oldValue: this.helpTickets.selectedHelpTicket.helpTicketStatus,
      newValue: status,
      personId: this.userObj._id,
      date: new Date()
    };
    this.helpTickets.selectedHelpTicket.audit.push(obj);
    if (status == this.config.MY_HELPTICKET_STATUS) {
      this.helpTickets.selectedHelpTicket.helpTicketStatus = this.helpTickets.selectedHelpTicket.helpTicketStatus.toString() + status;
    } else {
      this.helpTickets.selectedHelpTicket.helpTicketStatus = status;
    }
    if (status == this.config.CLOSED_HELPTICKET_STATUS) {
      this.helpTickets.selectHelpTicketContent();
      this.responseMessage = "Help Ticket closed by " + this.userObj.fullName;
      this._createResponse();
      let serverResponse = await this.helpTickets.closeHelpTicket();
      if (!serverResponse.error) {
        this.dataTable.updateArrayMaintainFilters(this.helpTickets.helpTicketsArray);
        this.reSort();
        // this.dataTable.updateArray(this.helpTickets.helpTicketsArray);
        this.utils.showNotification("The help ticket was updated");
      }
    } else {
      let serverResponse = await this.helpTickets.saveHelpTicket();
      if (!serverResponse.error) {
        this.dataTable.updateArrayMaintainFilters(this.helpTickets.helpTicketsArray);
        this.reSort();
        // this.dataTable.updateArray(this.helpTickets.helpTicketsArray);
        this.utils.showNotification("The help ticket was updated");
      }
    }
    this._cleanUp();
  }
  _cleanUp() {
    if (this.showHelpTicketImmediately) {
      this.showHelpTicketImmediately = false;
      this.router.navigateToRoute('techHt', {
        HTNumber: -1
      });
    } else {
      this.enterResponse = false;
      this.filesToUpload = new Array();
      this.files = new Array();
      this.filesSelected = "";
      $('input[type=file]').wrap('<form></form>').parent().trigger('reset').children().unwrap();
      this.helpTicketSelected = false;
      this.showRequestPanel = false;
    }
  }
  flag() {
    var note = {
      noteBody: "",
      noteCategories: this.userObj.noteCategories,
      selectedCategory: 0
    };
    return this.dialog.showNote("Save Changes", note, ['Submit', 'Cancel']).whenClosed(response => {
      if (!response.wasCancelled) {
        this.saveNote(response.output);
      } else {
        console.log("Cancelled");
      }
    });
  }
  async saveNote(note) {
    this.people.selectNote();
    this.people.selectedNote.type = "h";
    this.people.selectedNote.personId = this.userObj._id;
    this.people.selectedNote.category = this.userObj.noteCategories[note.selectedCategory];
    this.people.selectedNote.note = note.note.noteBody;
    this.people.selectedNote.reference = this.helpTickets.selectedHelpTicket._id;
    this.people.selectedNote.referenceNo = this.helpTickets.selectedHelpTicket.helpTicketNo;
    let response = await this.people.saveNote();
    if (!response.error) {
      this.utils.showNotification('The note was saved');
    }
  }
  back() {
    this.helpTicketSelected = false;
    var changes = this.helpTickets.isHelpTicketDirty(this.oroginalHelpTicket, ["requestId", "courseId", "personId", "institutionId"]);
    if (changes.length) {
      let that = this;
      this.message = "The help ticket has been changed. Do you want to save your changes?";
      return this.dialog.showMessage(that.message, "Save Changes", ['Yes', 'No']).whenClosed(response => {
        if (!response.wasCancelled) {
          this.save(changes);
        } else {
          this._cleanUp();
        }
      });
    } else {
      this._cleanUp();
    }
  }

  /*****************************************************************************************
  * Setup validation rules for each help ticket type
  *****************************************************************************************/
  _setUpValidation() {
    this.validation.addRule("00", "curriculumTitle", [{
      "rule": "required",
      "message": "Curriculum Title is required"
    }]);
    this.validation.addRule("00", "client", [{
      "rule": "custom",
      "message": "You must select a client",
      "valFunction": function (context) {
        return context.helpTicket.clientId !== undefined;
      }
    }]);
    this.validation.addRule("01", "resetPasswordUserIDs", [{
      "rule": "required",
      "message": "You must enter the passwords to reset"
    }]);
    this.validation.addRule("01", "client", [{
      "rule": "custom",
      "message": "You must enter the passwords to reset",
      "valFunction": function (context) {
        return context.helpTicket.clientId !== undefined;
      }
    }]);
    this.validation.addRule("02", "application", [{
      "rule": "custom",
      "message": "You must select the application",
      "valFunction": function (context) {
        return context.content.application !== undefined;
      }
    }]);
    this.validation.addRule("9", "owner", [{
      "rule": "custom",
      "message": "You are already the owner",
      "valFunction": function (context) {
        return context.helpTickets.selectedHelpTicket.owner[0].personId !== context.userObj._id;
      }
    }]);
  }
  _cleanUpFilters() {
    this.helpTicketNoFilterValue = "";
    this.helpTicketTypeFilterValue = "";
    this.ownerFilterValue = "";
    this.helpTicketStatusFilter = "";
    this.personFilterValue = "";
    this.institutionFilterValue = "";
    this.dataTable.updateArray(this.helpTickets.helpTicketsArray);
  }
  checkSendMail() {
    this.sendMail = !this.sendMail;
  }
  changeFiles() {
    this.filesToUpload = this.filesToUpload ? this.filesToUpload : new Array();
    for (var i = 0; i < this.files.length; i++) {
      let addFile = true;
      this.filesToUpload.forEach(item => {
        if (item.name === this.files[i].name) addFile = false;
      });
      if (addFile) this.filesToUpload.push(this.files[i]);
    }
  }
  removeFile(index) {
    this.filesToUpload.splice(index, 1);
  }
  insertDocument() {
    var document = {
      documentURL: "",
      documentCats: this.documents.docCatsArray,
      documents: new Array(),
      selectedCategory: 0
    };
    return this.dialog.showDocument("Select Document", document, ['Submit', 'Cancel']).whenClosed(response => {
      if (!response.wasCancelled) {
        this.helpTickets.selectedHelpTicketContent.documents = this.helpTickets.selectedHelpTicketContent.documents ? this.helpTickets.selectedHelpTicketContent.documents : new Array();
        response.output.documents.documents.forEach(item => {
          this.helpTickets.selectedHelpTicketContent.documents.push({
            categoryCode: item.categoryCode,
            categoryName: item.categoryName,
            fileName: item.fileName
          });
        });
      } else {
        console.log("Cancelled");
      }
    });
  }
  removeDocument(index) {
    this.helpTickets.selectedHelpTicketContent.documents.splice(index, 1);
  }
  showRequestsPanel() {
    this.showRequestPanel = !this.showRequestPanel;
    this.getRequests();
    window.scrollTo(0, 0);
  }
  async getRequests() {
    if (this.selectedSession) {
      this.sessions.selectSessionById(this.selectedSession);
      await this.requests.getActiveClientRequestsArray(this.helpTickets.selectedHelpTicket.personId.id, this.selectedSession);
      await this.people.getCoursesArray(true, '?filter=personId|eq|' + this.helpTickets.selectedHelpTicket.personId.id + '&order=number');
      this.originalClientRequestsArray = new Array();
      this.clientRequestsArray = new Array();
      //Cycle through request array
      this.requests.requestsArray.forEach(item => {
        //Cycle through details of request
        item.requestDetails.forEach(item2 => {
          //If there are assignments
          if (item2.assignments && item2.assignments.length > 0) {
            //Cycle through the assignments
            item2.assignments.forEach(assign => {
              this.originalClientRequestsArray.push({
                productId: item2.productId._id,
                sessionId: item.sessionId,
                requestStatus: item2.requestStatus,
                systemId: assign.systemId,
                courseName: item.courseId ? item.courseId.name : 'Trial Client',
                productName: item2.productId.name,
                client: assign.client,
                clientId: assign.clientId,
                studentIds: assign.studentUserIds,
                studentPassword: assign.studentPassword,
                facultyIds: assign.facultyUserIds,
                facultyPassword: assign.facultyPassword,
                _id: item2._id
              });
            });
          } else {
            this.originalClientRequestsArray.push({
              productId: item2.productId._id,
              productName: item2.productId.name,
              sessionId: item.sessionId,
              requestStatus: item2.requestStatus,
              courseName: item.courseId ? item.courseId.name : 'Trial Client',
              _id: item2._id
            });
          }
        });
      });
      this.originalClientRequestsArray.forEach(item => {
        this.clientRequestsArray.push(item);
      });
    }
  }

  // showProfile(request, el) {
  //   this.profileRequest = request;
  //   $(".hoverProfile").css("top", window.pageYOffset + el.clientY - 175);
  //   $(".hoverProfile").css("left", el.clientX + 100);
  //   $(".hoverProfile").css("display", "block");
  // }

  // hideProfile() {
  //   $(".hoverProfile").css("display", "none");
  // }

  async customHelpTicketStatusFilter() {
    if (this.helpTicketStatusFilter > this.config.CLOSED_HELPTICKET_STATUS) {
      await this.helpTickets.getMyHelpTickets(this.userObj._id);
      this.dataTable.updateArray(this.helpTickets.helpTicketsArray);
    } else {
      if (this.oldHelpTicketStatus == this.config.MY_HELPTICKET_STATUS) {
        $("#loading").show();
        await this.helpTickets.getHelpTicketArray("?filter=helpTicketStatus|lt|" + this.config.CLOSED_HELPTICKET_STATUS + "&order=createdDate:DSC", true), this.dataTable.updateArray(this.helpTickets.helpTicketsArray);
        this.helpTickets.calcHelpTicketAges();
        $("#loading").hide();
      }
      this.dataTable.filterList({
        target: {
          value: this.helpTicketStatusFilter
        }
      }, {
        type: 'value',
        filter: 'helpTicketStatusFilter',
        collectionProperty: 'helpTicketStatus',
        displayProperty: 'helpTicketStatus',
        compare: 'match'
      });
    }
    this.oldHelpTicketStatus = this.helpTicketStatusFilter;
  }
  customHelpTicketTypeFilter(value, item, context) {
    var foo = value.toUpperCase();
    for (let i = 0; i < context.helpTickets.helpTicketTypesArray.length; i++) {
      for (let j = 0; j < context.helpTickets.helpTicketTypesArray[i].subtypes.length; j++) {
        if (context.helpTickets.helpTicketTypesArray[i].subtypes[j].type == item.helpTicketType) {
          return context.helpTickets.helpTicketTypesArray[i].subtypes[j].description.toUpperCase().indexOf(foo) > -1;
        }
      }
    }
    return false;
  }
  customOwnerFilter(value, item, context) {
    if (item.owner[0].personId === null) return false;
    return item.owner[0].personId.fullName.toUpperCase().indexOf(value.toUpperCase()) > -1;
  }
  customNameFilter(value, item, context) {
    return item.personId.fullName.toUpperCase().indexOf(value.toUpperCase()) > -1;
  }
  institutionCustomFilter(value, item, context) {
    return item.institutionId.name.toUpperCase().indexOf(value.toUpperCase()) > -1;
  }
  customOwnerSorter(sortProperty, sortDirection, sortArray, context) {
    context.sortDirection = context.sortDirection === null ? 1 : context.sortDirection === 1 ? -1 : 1;
    return sortArray.sort((a, b) => {
      if (a.owner[0].personId === null && b.owner[0].personId === null) return 0;
      if (a.owner[0].personId === null && b.owner[0].personId !== null) return context.sortDirection * -1;
      if (a.owner[0].personId !== null && b.owner[0].personId === null) return context.sortDirection;
      var result = a.owner[0].personId.lastName < b.owner[0].personId.lastName ? -1 : a.owner[0].personId.lastName > b.owner[0].personId.lastName ? 1 : 0;
      return result * context.sortDirection;
    });
  }
  reSort() {
    this.dataTable.sortArray({}, {}, true);
  }
}) || _class);

/***/ }),

/***/ "modules/tech/support/viewHelpTickets.html":
/*!*******************************************************!*\
  !*** ./src/modules/tech/support/viewHelpTickets.html ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n    <span id=\"loading\">\r\n        <ul class=\"bokeh\">\r\n            <li></li>\r\n            <li></li>\r\n            <li></li>\r\n        </ul>\r\n    </span>\r\n    <div>\r\n        <compose  view=\"./components/viewHTTable.html\"></compose>\r\n    </div>\r\n\r\n    <div show.bind=\"helpTicketSelected && !showAssignment\" class=\"col-lg-12\">\r\n        <compose view=\"./components/viewHTForm.html\"></compose>\r\n    </div>\r\n\r\n    <div show.bind=\"helpTicketSelected && showAssignment\" class=\"col-lg-12\">\r\n        <compose view=\"./components/viewAssignmentForm.html\"></compose>\r\n    </div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/user/components/banner.html":
/*!*************************************************!*\
  !*** ./src/modules/user/components/banner.html ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n  <div class=\"subMenu-container\">\r\n    <div class=\"textContainer banner subMenu\">\r\n      <span show.bind=\"temp\" class=\"leftMargin hidden-sm hidden-xs\">\r\n        <h4>${userObj.institutionId.city} weather: ${temp} </h4>\r\n        <img src=\"${weatherIcon}\" class=\"weatherIcon smallLeftMargin\">\r\n      </span>\r\n      <span show.bind=\"ucctemp\" class=\"leftMargin hidden-sm hidden-xs\">\r\n        <h4>UCC weather: ${ucctemp} </h4>\r\n        <img src=\"${uccweatherIcon}\" class=\"weatherIcon smallLeftMargin\">\r\n      </span>\r\n      <span id=\"notice\" repeat.for=\"site of siteinfo.siteArray | infoFilter:'BANN'\" innerhtml.bind=\"site.content\">\r\n       \r\n      </span>\r\n      <div class=\"pull-right\">\r\n        <span show.bind=\"userObj.userRole < config.UCC_ROLE\" class=\"hidden-sm hidden-xs\">\r\n\t\t\t\t\t<a href=\"#/clientRequests\" class=\"rightMargin\" if.bind=\"showRequests > 0\" style=\"text-decoration: none;\">Requests <span class=\"badge\">${showRequests}</span></a>            \r\n\t\t\t\t\t<a href=\"#/support\" class=\"rightMargin\" if.bind=\"showHelpTickets > 0\" style=\"text-decoration: none;\">Help Tickets <span class=\"badge\">${showHelpTickets}</span></a>\r\n\t\t\t\t</span>\r\n\t\t\t\t<span show.bind=\"userObj.userRole >= config.UCC_ROLE\" class=\"hidden-sm hidden-xs\">\r\n          <a href=\"#/notes/editCalendar\" class=\"rightMargin\" if.bind=\"eventArray.length > 0\" style=\"text-decoration: none;\">Events <span class=\"badge\">${eventArray.length}</span></a>  \r\n\t\t\t\t\t<a href=\"#/techRq\" class=\"rightMargin\" if.bind=\"showRequests > 0\" style=\"text-decoration: none;\">Requests <span class=\"badge\">${showRequests}</span></a>            \r\n\t\t\t\t\t<a href=\"#/techHt\" class=\"rightMargin\" if.bind=\"showHelpTickets > 0\" style=\"text-decoration: none;\">Help Tickets <span class=\"badge\">${showHelpTickets}</span></a>\r\n\t\t\t\t</span>\r\n        <span show.bind=\"alertIndex > -1\" click.delegate=\"openAlert(siteinfo.siteArray[alertIndex])\" class=\"smallMarginRight\" bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"bottom\"\r\n          title=\"\" data-original-title=\"Alerts\"><i class=\"fa fa-bell-o fa-border\" aria-hidden=\"true\"></i></span>\r\n        <span class=\"rightMargin\"><h4>Welcome ${userObj.fullName}</h4></span>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>\r\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/user/components/homePageLinks.html":
/*!********************************************************!*\
  !*** ./src/modules/user/components/homePageLinks.html ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n  <blockquote class=\"topMargin\">\r\n    <a href.bind=\"item.url\" target=\"_blank\"><h6>${item.title}</h6></a>\r\n    <p  innerhtml.bind=\"item.content\"></p>\r\n    <!--innerhtml.bind=\"item.content\"></p> -->\r\n  </blockquote>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/user/components/newsItem.html":
/*!***************************************************!*\
  !*** ./src/modules/user/components/newsItem.html ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n  <blockquote class=\"topMargin\">\r\n    <a if.bind=\"item.url\" href.bind=\"item.url\" target=\"_blank\"><h6>${item.title}</h6></a>\r\n    <h6 if.bind=\"!item.url\">${item.title}</h6>\r\n    <p  innerhtml.bind=\"item.content\"></p>\r\n    <!--\r\n    <small show.bind=\"moreInfoExists(item)\"><a show.bind=\"moreInfoExists(item)\" href.bind=\"item.url\" target=\"_blank\">more info...</a></small>\r\n    -->\r\n  </blockquote> \r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "modules/user/components/uccInformation.html":
/*!*********************************************************!*\
  !*** ./src/modules/user/components/uccInformation.html ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<template>\r\n\t\t<h2 class=\"underline\">UCC Information</h2>\r\n\t\t<div class=\"${item.priority}\" repeat.for=\"item of siteinfo.siteArray | infoFilter:'SYST'\">\r\n\t\t\t<h3>${item.title}</h3>\r\n\t\t\t<span innerhtml=\"${item.content}\"></span>\r\n\t\t\t<hr/>\r\n\t\t</div>\r\n\t\t<div repeat.for=\"item of siteinfo.siteArray | infoFilter:'INFO'\">\r\n\t\t\t<h3>${item.title}</h3>\r\n\t\t\t<span innerhtml=\"${item.content}\"></span>\r\n\t\t\t<hr/>\r\n\t\t</div>\r\n\t\t<div class=\"bigTopMargin\">\r\n\t\t\t<h2 class=\"underline\">Sessions</h2>\r\n\t\t\t<div class=\"list-group\">\r\n\t\t\t\t<a class=\"list-group-item\" repeat.for=\"session of sessions.sessionsArray | sessionType:'Active:Requests:Next'\">\r\n\t\t\t\t\t<h4 class=\"list-group-item-heading\">${session.sessionStatus}: Session ${session.session} - ${session.year}</h4>\r\n\t\t\t\t\t<p class=\"list-group-item-text\">Requests open: ${session.requestsOpenDate | dateFormat:config.DATE_FORMAT_TABLE}</p>\r\n\t\t\t\t\t<p class=\"list-group-item-text\">Clients available: ${session.startDate | dateFormat:config.DATE_FORMAT_TABLE}</p>\r\n\t\t\t\t\t<p class=\"list-group-item-text\">Session ends: ${session.endDate | dateFormat:config.DATE_FORMAT_TABLE}</p>\r\n\t\t\t\t</a>\r\n\t\t\t</div>\r\n\t\t</div>\r\n</template>";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ })

}]);
//# sourceMappingURL=app-c9f59502.2384d3fce1a12a237460.bundle.js.map