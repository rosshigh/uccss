import {inject, TemplatingEngine} from 'aurelia-framework';
import { Router } from "aurelia-router";
import { DataTable } from '../../../resources/utils/dataTable';
import { HelpTickets } from '../../../resources/data/helpTickets';
import { Sessions } from '../../../resources/data/sessions';
import { Systems } from '../../../resources/data/systems';
import { Products } from '../../../resources/data/products';
import { Downloads } from '../../../resources/data/downloads';
import { AppConfig } from '../../../config/appConfig';
import { Utils } from '../../../resources/utils/utils';
import { People } from '../../../resources/data/people';
import Validation from '../../../resources/utils/validation';
import { CommonDialogs } from '../../../resources/dialogs/common-dialogs';
import {ClientRequests} from '../../../resources/data/clientRequests';
import {DocumentsServices} from '../../../resources/data/documents';

@inject(Router, AppConfig, Validation, People, CommonDialogs, DataTable, Utils, HelpTickets, Sessions, Systems, Downloads, Products, TemplatingEngine, ClientRequests, DocumentsServices, ClientRequests)
export class ViewHelpTickets {
  helpTicketSelected = false;
  enterResponse = false;
  sendMailDisable = false;
  notesHistory = false;
  showRequestPanel = false;
  viewHelpTickets = true;

  toolbar;

  colSpan = 10; 

  spinnerHTML = "";
  filterValues = new Array();
  commentShown = "";
  responseMessage = "";

  toolbar = [
		['style', ['style', 'bold', 'italic', 'underline','clear']],
		['color', ['color']],
		['font', ['strikethrough', 'superscript', 'subscript']],
		['layout', ['ul', 'ol', 'paragraph']],
		['insert', [ 'link', 'table', 'hello']],
		['misc', ['undo', 'redo', 'fullscreen', 'codeview']]
	];

  constructor(router, config, validation, people, dialog, datatable, utils, helpTickets, sessions, systems, apps, products, templatingEngine, requests, documents) {
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
  };

  /*****************************************************************************************
  * Retrieve the help tickets, sessions, downloads and people
  * Only active help tickets are retrieved
  *****************************************************************************************/
  async activate(params) {
    let responses = await Promise.all([
      this.helpTickets.getHelpTicketTypes('?order=category'),
      this.helpTickets.getHelpTicketArray("?filter=helpTicketStatus|lt|" + this.config.CLOSED_HELPTICKET_STATUS + '&order=helpTicketNo:DSC', true),
      //filter=helpTicketStatus|lt|" + this.config.CLOSED_HELPTICKET_STATUS + "&
      this.config.getConfig()
    ]);
    this.helpTickets.calcHelpTicketAges();
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
    })

    this.helpTicketTypeLookupArray = new Array();
    this.helpTickets.helpTicketTypesArray.forEach(item => {
      item.subtypes.forEach(item2 => {
        this.helpTicketTypeLookupArray.push({helpTicketType: item2.type, description: item2.description});
      })
    })

    this.removeHTStatus = [this.config.NEW_HELPTICKET_STATUS, this.config.REPLIED_HELPTICKET_STATUS];

    if(this.utils.isMobile()){
      this.mobile = true;
      this.toolbar = [['style', ['style', 'bold', 'clear']]];
    }
  }

  attached() {
    if(!this.mobile) this.toolTips();
  }

  toolTips(){
    $('[data-toggle="tooltip"]').tooltip();
  }
  
  // detached() {
  //   this._unLock();
  // }

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

  showProfile(helpTicket, el){
      this.profileHelpTicket = helpTicket;
      $(".hoverProfile").css("top", el.clientY - 175);
      $(".hoverProfile").css("left", el.clientX - 100);
      $(".hoverProfile").css("display", "block");
  }

  hideProfile(){
     $(".hoverProfile").css("display", "none");
  }

  sendAnEmail(person){   
    if(person){
      let email = {emailBody: "", emailSubject: "", person: person};
      return this.dialog.showEmail(
            "Enter Email",
            email,
            ['Submit', 'Cancel']
        ).whenClosed(response => {
            if (!response.wasCancelled) {
                this.sendTheEmail(response.output);
            } else {
                console.log("Cancelled");
            }
        });
    }
  }

  async sendTheEmail(email){ 
    if(email){
        var message = {
            id: email.email.person._id,
            fullName: email.email.person.fullName,
            message : email.email.emailBody,
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
  async refresh() {
    this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
    await this.helpTickets.getHelpTicketArray("?filter=helpTicketStatus|lt|" + this.config.CLOSED_HELPTICKET_STATUS + "&order=createdDate:DSC", true),
    this.dataTable.updateArray(this.helpTickets.helpTicketsArray);
    this.helpTickets.calcHelpTicketAges();
    this.spinnerHTML = "";
    this._cleanUpFilters()
  }

  /*****************************************************************************************
  * User selected a help ticket
  * el - event object
  * index - index of selected help ticket
  *****************************************************************************************/
  async selectHelpTicket(el, index) { 
    //Make the selected help ticket the selected help ticket
    this.editIndex = this.dataTable.getOriginalIndex(index);
    this.helpTickets.selectHelpTicket(this.editIndex);
    this.oroginalHelpTicket = this.helpTickets.selectedHelpTicket;
    this.openHelpTicket();

    // let categoryIndex = this.helpTickets.selectedHelpTicket.helpTicketCategory;
    // let subTypeIndex =  getIndex(this.getIndex[categoryIndex].subtypes, this.helpTickets.selectedHelpTicket.content[0].type);
    let indices  =  this.getIndex();
    let subTypeIndex = indices.subTypeIndex;
    let categoryIndex = indices.categoryIndex;
    // this.clientRequired = this.getCategoryIndex();
    //  this.helpTickets.helpTicketTypesArray[categoryIndex].subtypes[subTypeIndex].clientRequired;
    this.createOutputForm(this.helpTickets.helpTicketTypesArray[categoryIndex].subtypes[subTypeIndex].outputForm);

    if (this.selectedRow) this.selectedRow.children().removeClass('info');
    this.selectedRow = $(el.target).closest('tr');
    this.selectedRow.children().addClass('info');

    this.viewHelpTicketsHeading = "Help Ticket " + this.helpTickets.selectedHelpTicket.helpTicketNo;
    this.helpTicketSelected = true;

  }

  getCategoryIndex(){
    for(var i = 0; i < this.helpTickets.helpTicketTypesArray.length; i++){
      if(this.helpTickets.helpTicketTypesArray[i] == this.helpTickets.selectedHelpTicket.helpTicketCategory){
        return i;
      }
    }
  }

  getIndex(){
    for(var j = 0; j < this.helpTickets.helpTicketTypesArray.length; j++){
      for(var i = 0; i < this.helpTickets.helpTicketTypesArray[j].subtypes.length; i++){
        if( this.helpTickets.helpTicketTypesArray[j].subtypes[i].type === this.helpTickets.selectedHelpTicket.content[0].type){
          return { subTypeIndex: i, categoryIndex: j};
        }
      }
    }
  }

  createOutputForm(html){    
    let el = document.getElementById('container');
    el.innerHTML = html;

    if (el) {
        if (!el.querySelectorAll('.au-target').length) {
            this.templatingEngine.enhance({element: el, bindingContext: this});
        }
    }
  }

  async openHelpTicket(){
    if(this.helpTickets.selectedHelpTicket._id.length){
      await this.getDetails();
    } else {
      this.utils.showNotification('Help Ticket not found')
    }
   
  }

  async getDetails(){
    this.showRequestDetails = false;
    if(this.helpTickets.selectedHelpTicket.requestId){
      if(this.helpTickets.selectedHelpTicket.requestId.assignments && this.helpTickets.selectedHelpTicket.requestId.assignments.length > 0) this.showRequestDetails = true;
      this.showCourse = false;
      this.course = "";
      this.showCourse = true;
      if(this.helpTickets.selectedHelpTicket.courseId) {
        this.course = this.helpTickets.selectedHelpTicket.courseId.number + " - " + this.helpTickets.selectedHelpTicket.courseId.name;
      } else {
        this.course = this.config.SANDBOX_NAME
      }
    } 
  }

  async save(changes){
    changes =  changes ?  changes : this.helpTickets.isHelpTicketDirty(this.oroginalHelpTicket,["requestId","courseId","personId","institutionId"]);
     if(changes && changes.length > 0){
       changes.forEach(item => {
         this.helpTickets.selectedHelpTicket.audit.push({
           property: item.property,
           oldValue: item.oldValue,
           newValue: item.newValue,
           eventDate: new  Date(),
           personId: this.userObj._id
         })
       })
     }
    
    var email = new Object();
    let serverResponse = await this.helpTickets.saveHelpTicket(email);
    if (!serverResponse.error) {
      this.dataTable.updateArray(this.helpTickets.helpTicketsArray);
      this.utils.showNotification("The help ticket was updated");
    }
    this._cleanUp();
  }

  getStatusDescription(status){
    for(let i = 0; i < this.config.HELP_TICKET_STATUSES.length; i++){
      if(status == this.config.HELP_TICKET_STATUSES[i].code){
        return this.config.HELP_TICKET_STATUSES[i].description;
      }
    }
    return "";
  }

  /*****************************************************************************************
  * Open the response form and create an empty help ticket content object
  *****************************************************************************************/
  respond() {
    if (!this.enterResponse) {
      this.sendMailDisable = false;

      this.responseMessage = "";
      this.helpTickets.selectHelpTicketContent();
      this.enterResponse = true;
      this.enableButton = true;
      setTimeout(()=>{$(".note-editable").focus().scroll();},500);
    }
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
    if(status === this.config.CLOSED_HELPTICKET_STATUS){
      this.dialog.showMessage(
            "Are you sure you want to close this help ticket",
            "Save Changes",
            ['Yes', 'No']
        ).whenClosed(response => {
            if (!response.wasCancelled) {
               this.saveIt(status);
            }
        });
    } else {
      this.saveIt(status);
    }
  
  }

  async saveIt(status){
    this.helpTickets.selectedHelpTicket.helpTicketStatus = status;
    this._createResponse();
    var email = new Object();
    if(this.sendEmail){
      if(status ==  this.config.CUSTOMER_ACTION_HELPTICKET_STATUS){
        email.MESSAGE = this.config.HELP_TICKET_UPDATED_MESSAGE_CA.replace('[[No]]',this.helpTickets.selectedHelpTicket.helpTicketNo);
        email.subject = this.config.HELP_TICKET_UPDATED_SUBJECT_CA.replace('[[No]]',this.helpTickets.selectedHelpTicket.helpTicketNo);
      } else if (status == this.config.CLOSED_HELPTICKET_STATUS) {
        email.MESSAGE = this.config.HELP_TICKET_UPDATE_CLOSED_MESSAGE_C.replace('[[No]]',this.helpTickets.selectedHelpTicket.helpTicketNo);;
        email.subject = this.config.HELP_TICKET_UPDATE_CLOSED_SUBJECT_C.replace('[[No]]',this.helpTickets.selectedHelpTicket.helpTicketNo);
      } else {
        email.MESSAGE = this.config.HELP_TICKET_UPDATE_MESSAGE_R.replace('[[No]]',this.helpTickets.selectedHelpTicket.helpTicketNo);;
        email.subject = this.config.HELP_TICKET_UPDATE_SUBJECT_R.replace('[[No]]',this.helpTickets.selectedHelpTicket.helpTicketNo);
      }
        email.INSTRUCTIONS = this.config.HELP_TICKET_INSTRUCTIONS;
        
        email.email = this.helpTickets.selectedHelpTicket.personId.email; 
        email.cc = this.config.HELP_TICKET_EMAIL_LIST ? this.config.HELP_TICKET_EMAIL_LIST : "";
    }
    let serverResponse = await this.helpTickets.saveHelpTicketResponse(email);
    if (!serverResponse.error) {
      if(status == this.config.CLOSED_HELPTICKET_STATUS) await this.refresh();
      this.utils.showNotification("The help ticket was updated");
      if (this.filesToUpload && this.filesToUpload.length > 0) this.helpTickets.uploadFile(this.filesToUpload, serverResponse._id);
    }
    this._cleanUp();
    // this.unlockIt();
  }

  async ownHelpTicket(helpTicket) {
    if(helpTicket) {
      this.helpTickets.selectHelpTicketByID(helpTicket._id);
    }
    if(this.helpTickets.selectedHelpTicket.owner[0].personId === null || this.helpTickets.selectedHelpTicket.owner[0].personId._id != this.userObj._id){
          var obj = {status: this.config.REVIEW_HELPTICKET_STATUS, personId: this.userObj._id}
          let serverResponse = await this.helpTickets.updateOwner(obj);
          if (!serverResponse.error) {
            this.dataTable.updateArray(this.helpTickets.helpTicketsArray);
            this.utils.showNotification("The help ticket was updated");
          }
          if(helpTicket){
            this._cleanUp();
          }
    }
  }

  async changeStatus(helpTicket, status, description){
    this.helpTickets.selectHelpTicketByID(helpTicket._id);
    var obj = {
      property: "helpTicketStatus",
      oldValue: this.helpTickets.selectedHelpTicket.helpTicketStatus,
      newValue: status,
      personId: this.userObj._id,
      date: new Date
    }
    this.helpTickets.selectedHelpTicket.audit.push(obj);
    this.helpTickets.selectedHelpTicket.helpTicketStatus = status;
    let serverResponse = await this.helpTickets.saveHelpTicket();
    if (!serverResponse.error) {
      this.dataTable.updateArray(this.helpTickets.helpTicketsArray);
      this.utils.showNotification("The help ticket was updated");
    }
    this._cleanUp();
  }

  _cleanUp() {
    this.enterResponse = false;
    this.filesToUpload = new Array();
    this.files = new Array();
    this.filesSelected = "";
    this.helpTicketSelected = false;
    $('input[type=file]').wrap('<form></form>').parent().trigger('reset').children().unwrap();
  }

  flag(){
     var note = {noteBody: "", noteCategories: this.userObj.noteCategories, selectedCategory: 0};
         return this.dialog.showNote(
                "Save Changes",
                note,
                ['Submit', 'Cancel']
            ).whenClosed(response => {
                if (!response.wasCancelled) {
                    this.saveNote(response.output);
                } else {
                    console.log("Cancelled");
                }
            });
  }

  async saveNote(note){
        this.people.selectNote();
        this.people.selectedNote.type = "h";
        this.people.selectedNote.personId = this.userObj._id;
        this.people.selectedNote.category = this.userObj.noteCategories[note.selectedCategory];
        this.people.selectedNote.note = note.note.noteBody;
        this.people.selectedNote.reference = this.helpTickets.selectedHelpTicket._id;
        this.people.selectedNote.referenceNo = this.helpTickets.selectedHelpTicket.helpTicketNo;
        let response = await this.people.saveNote();
            if(!response.error){
                this.utils.showNotification('The note was saved');
            }
  }
    
  back() {
     var changes = this.helpTickets.isHelpTicketDirty(this.oroginalHelpTicket,["requestId","courseId","personId","institutionId"]);
     if (changes.length) {
       let that = this;
        this.message = "The help ticket has been changed. Do you want to save your changes?"
        return this.dialog.showMessage(
            that.message,
            "Save Changes",
            ['Yes', 'No']
        ).whenClosed(response => {
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
    this.validation.addRule("00", "curriculumTitle", [{ "rule": "required", "message": "Curriculum Title is required" }]);
    this.validation.addRule("00", "client", [{
      "rule": "custom", "message": "You must select a client",
      "valFunction": function (context) {
        return (context.helpTicket.clientId !== undefined);
      }
    }]);
    this.validation.addRule("01", "resetPasswordUserIDs", [{ "rule": "required", "message": "You must enter the passwords to reset" }]);
    this.validation.addRule("01", "client", [{
      "rule": "custom", "message": "You must enter the passwords to reset",
      "valFunction": function (context) {
        return (context.helpTicket.clientId !== undefined);
      }
    }]);
    this.validation.addRule("02", "application", [{
      "rule": "custom", "message": "You must select the application",
      "valFunction": function (context) {
        return (context.content.application !== undefined);
      }
    }]);
    this.validation.addRule("9", "owner", [{
      "rule": "custom", "message": "You are already the owner",
      "valFunction": function (context) {
        return (context.helpTickets.selectedHelpTicket.owner[0].personId !== context.userObj._id);
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
      for(var i = 0; i < this.files.length; i++){
          let addFile = true;
          this.filesToUpload.forEach(item => {
              if(item.name === this.files[i].name) addFile = false;
          })
          if(addFile) this.filesToUpload.push(this.files[i]);
      }
  }

  removeFile(index){
      this.filesToUpload.splice(index,1);
  }

  insertDocument(){
    var document = {documentURL: "", documentCats: this.documents.docCatsArray, documents: new Array(), selectedCategory: 0};
        return this.dialog.showDocument(
              "Select Document",
              document,
              ['Submit', 'Cancel']
          ).whenClosed(response => {
              if (!response.wasCancelled) {
                this.helpTickets.selectedHelpTicketContent.documents = this.helpTickets.selectedHelpTicketContent.documents ? this.helpTickets.selectedHelpTicketContent.documents : new Array();
                response.output.documents.documents.forEach(item => {
                  this.helpTickets.selectedHelpTicketContent.documents.push({
                    categoryCode: item.categoryCode,
                    categoryName: item.categoryName,
                    fileName: item.fileName,
                  });
                })
              } else {
                  console.log("Cancelled");
              }
          });
  }

  removeDocument(index){
     this.helpTickets.selectedHelpTicketContent.documents.splice(index,1);
  }

  showRequestsPanel(){
    this.showRequestPanel = !this.showRequestPanel;
    this.getRequests();
  }

  async getRequests() {
    if (this.selectedSession) {
        this.sessions.selectSessionById(this.selectedSession);
        await this.requests.getActiveClientRequestsArray(this.helpTickets.selectedHelpTicket.personId.id, this.selectedSession);
        await this.people.getCoursesArray(true, '?filter=personId|eq|' + this.helpTickets.selectedHelpTicket.personId.id + '&order=number')
        this.originalClientRequestsArray = new Array();
        this.clientRequestsArray = new Array();
        //Cycle through request array
        this.requests.requestsArray.forEach(item => {
            //Cycle through details of request
            item.requestDetails.forEach(item2 => {
                //If there are assignments
                if(item2.assignments && item2.assignments.length > 0){
                    //Cycle through the assignments
                    item2.assignments.forEach((assign) => {
                        this.originalClientRequestsArray.push({
                            productId: item2.productId,
                            sessionId: item.sessionId,
                            requestStatus: item2.requestStatus,
                            systemId: assign.systemId,
                            courseId: item.courseId,
                            client: assign.client,
                            clientId: assign.clientId,
                            studentIds: assign.studentUserIds,
                            studentPassword: assign.studentPassword,
                            facultyIds: assign.facultyUserIds,
                            facultyPassword: assign.facultyPassword,
                            _id: item2._id
                        })
                    })
                } else {
                    this.originalClientRequestsArray.push({
                        productId: item2.productId,
                        sessionId: item.sessionId,
                        requestStatus: item2.requestStatus,
                        courseId: item.courseId,
                        _id: item2._id
                    })
                }
            }) 
        });
        this.originalClientRequestsArray.forEach(item => {
            this.clientRequestsArray.push(item);
        })
      }
}

  customHelpTicketTypeFilter(value, item, context){
    var foo = value.toUpperCase();
    for(let i = 0; i < context.helpTickets.helpTicketTypesArray.length; i++){
      for(let j = 0; j < context.helpTickets.helpTicketTypesArray[i].subtypes.length; j++){
        if(context.helpTickets.helpTicketTypesArray[i].subtypes[j].type == item.helpTicketType) {
          return  context.helpTickets.helpTicketTypesArray[i].subtypes[j].description.toUpperCase().indexOf(foo) > -1;
        }
      }
    }
    return false
  }

  customOwnerFilter(value, item, context){
      if(item.owner[0].personId === null) return false;
      return item.owner[0].personId.fullName.toUpperCase().indexOf(value.toUpperCase()) > -1;
  }

  customNameFilter(value, item, context){
      return item.personId.fullName.toUpperCase().indexOf(value.toUpperCase()) > -1;
  }

  institutionCustomFilter(value, item, context){
      return item.institutionId.name.toUpperCase().indexOf(value.toUpperCase()) > -1;
  }

  customOwnerSorter(sortProperty, sortDirection, sortArray, context){
    context.sortDirection = context.sortDirection === null ? 1 : context.sortDirection === 1 ? -1 : 1;
    return sortArray.sort((a,b) => {
      if(a.owner[0].personId === null && b.owner[0].personId === null) return 0;
      if(a.owner[0].personId === null && b.owner[0].personId !== null) return context.sortDirection * -1;
      if(a.owner[0].personId !== null && b.owner[0].personId === null) return context.sortDirection;
      var result = (a.owner[0].personId.lastName < b.owner[0].personId.lastName) ? -1 : (a.owner[0].personId.lastName > b.owner[0].personId.lastName) ? 1 : 0;
      return result *context.sortDirection;
    })
  }
}
