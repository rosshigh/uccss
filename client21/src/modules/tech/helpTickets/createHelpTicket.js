import { inject } from 'aurelia-framework';
import { HelpTickets } from '../../../resources/data/helpTickets';
import { ClientRequests } from '../../../resources/data/clientRequests';
import { Sessions } from '../../../resources/data/sessions';
import { Systems } from '../../../resources/data/systems';
import { People } from '../../../resources/data/people';
import { DocumentsServices } from '../../../resources/data/documents';
import { Store } from '../../../store/store';
import { AppConfig } from '../../../appConfig';
import { Utils } from '../../../resources/utils/utils';
import { DialogService } from 'aurelia-dialog';
import { ConfirmDialog } from '../../../resources/dialogs/confirm-dialog';

@inject(HelpTickets, ClientRequests, Sessions, Systems, People, DocumentsServices, Store, AppConfig, Utils, DialogService)
export class UserCreateHelpTicket {

    testArray = [
        { item: 'a', index: 0, subItems: [1, 2] },
        { item: 'b', index: 1, subItems: [3, 4] }
    ];

    yesNo = ['Yes', 'No'];
    courseProduct = ['Course', 'Product'];
    filesToUpload = new Array();

    curriculumTitlePlaceholder = "e.g. Introduction to SAP S/4HANA using Global Bike 3.3";
    curriculumAuthorPlaceholder = "e.g. Magal and Word";
    curriculumModulePlaceHolder = "e.g. Material Planning Master Data";
    curriculumPageNumberPlaceHolder = "e.g. page 12";
    curriculumStepNumberPlaceHolder = "e.g. Section I.2, Step 1.2.7";
    curriculumUserIDsPlaceholder = "e.g. gbx-4 thru gbx-20, gbx-24";
    softwareNamePlaceholder = "e.g. SAP GUI 7.6";
    softwareVersionPlaceholder = "e.g. 7.6";
    softwareOSPlaceholder = "e.g. Windows";
    softwareOSVersionPlaceholder = "e.g. version 10";

    placeholder = '<p class="MsoNormal"><span style="color:gray;mso-themecolor:background1;mso-themeshade:128">For example: My student (GBI-20) is getting an SAP system error when trying to create a sales order. We are using system YOSHI and client 100.<br><br>Steps to reproduce: <br><ol><li>Go to transaction VA01</li><li>Enter Order Type “OR” and press Continue</li><li>Enter material “BIKE101” and press Save.</li><br>Error message appears.<o:p></o:p></span></p>';

    constructor(helpTickets, requests, sessions, systems, people, documents, store, config, utils, dialogService) {
        this.helpTickets = helpTickets;
        this.requests = requests;
        this.sessions = sessions;
        this.systems = systems;
        this.people = people;
        // this.documents = documents;
        this.store = store;
        this.config = config;
        this.utils = utils;
        this.dialogService = dialogService;

        this.userObj = this.store.getUser('user');
    }

    resetHelpTicket() {
        this.curriculumQuestion = null;
        this.softwareQuestion = null;
        this.selectedNextOnce = false;
        this.productAssignmentSelectedIndex = -1;
        this.filesToUpload = [];
        $("tr").removeClass('table-info');
        this.createContentObject();
    }

    createContentObject() {
        this.authorNotApplicable = false;
        this.moduleNotApplicable = false;
        this.pageNumberNotApplicable = false;
        this.stepNumberNotApplicable = false;
        this.idsNotApplicable = false;
        this.otherStudentsNotApplicable = false;
        this.versionNotApplicable = false;
        this.osNotApplicable = false;
        this.osVersionNotApplicable = false;
        this.affectedProductRequests = [];
        this.content = {
            curriculumTitle: "",
            curriculumAuthor: "",
            curriculumModule: "",
            curriculumPageNumber: "",
            curriculumStep: "",
            curriculumIDs: "",
            otherStudentsPastThisPoint: null,
            softwareName: "",
            version: "",
            os: "",
            osVersion: "",
            lab: null,
            problemDescription: "",
            files: [],
            private: false
        }
    }

    async activate() {
        let responses = await Promise.all([
            this.sessions.getObjectsArray('?filter=[or]sessionStatus|Active:Requests&order=startDate'),
            this.systems.getObjectsArray(),
            this.people.getInstitutionArray('?filter=institutionStatus|eq|01&order=name')
        ]);

        this.resetHelpTicket();
    }

    attached() {
        // $('.selectpicker').selectpicker();
        // $('.selectpicker').click(e => e.stopPropagation());
        var wizard = $('.wizard').wizard();
        var that = this;

        wizard.on('actionclicked.fu.wizard', (e, data) => {
            that.step = data.step;
            if (data.direction !== "previous") {
                switch (data.step) {
                    case 0:
                        break;
                    case 1:
                        that.validateStepZerError();
                        if (that.stepZerorErrors.length) {
                            e.preventDefault();
                        }
                        break;
                    case 2:
                        break;
                    case 3:
                        break;
                    case 4:
                        break;
                    case 5:
                        break;
                    case 6:
                        break;
                    case 7:
                        this.Save();
                        break;
                }
            }
        })

    }

    validateStepZerError(){
        this.stepZerorErrors = [];
        if(this.selectedPersonId === "" || this.selectedPersonId === undefined){
            this.stepZerorErrors.push('You must select a faculty member')
        }
    }

    async institutionSelected() {
        await this.people.getPeopleArray('?filter=institutionId|eq|' + this.selectedInsitutionId + '&order=lastName');
        // this.refreshSelects();
    }

    async personSelected(){
        await this.getActiveRequests();
    }

    // refreshSelects() {
    //     this.utils.refreshSelect("#personSelect", this.people.peopleArray, "_id", this.selectedPersonId);
    // }

    async getActiveRequests() {
        var sessions = "";
        this.sessions.objectsArray.forEach(item => {
            sessions += item._id + ":";
        });
        sessions = sessions.substring(0, sessions.length - 1);
        await this.requests.getActiveObjectsArray(this.selectedPersonId, sessions);
        this.originalClientRequestsArray = new Array();
        this.clientRequestsArray = new Array();
        //Cycle through request array
        this.requests.objectsArray.forEach(item => {
            //Cycle through details of request
            item.requestDetails.forEach(item2 => {
                //If there are assignments
                if (item2.assignments && item2.assignments.length > 0) {
                    //Cycle through the assignments
                    item2.assignments.forEach((assign) => {
                        this.originalClientRequestsArray.push({
                            productId: item2.productId._id,
                            productName: item2.productId.name,
                            sessionId: item.sessionId,
                            requestStatus: item2.requestStatus,
                            systemId: assign.systemId,
                            courseName: item.courseId ? item.courseId.name : 'Trial Client',
                            courseId: item.courseId ? item.courseId._id : null,
                            courseNumber: item.courseId ? item.courseId.number : 'Trial Client',
                            client: assign.client,
                            clientId: assign.clientId,
                            _id: item2._id
                        })
                    })
                } else {
                    this.originalClientRequestsArray.push({
                        productId: item2.productId._id,
                        productName: item2.productId.name,
                        courseName: item.courseId ? item.courseId.name : 'Trial Client',
                        courseId: item.courseId ? item.courseId._id : null,
                        courseNumber: item.courseId ? item.courseId.number : 'Trial Client',
                        sessionId: item.sessionId,
                        requestStatus: item2.requestStatus,
                        courseName: item.courseId ? item.courseId.name : 'Trial Client',
                        _id: item2._id
                    })
                }
            })
        });
        this.originalClientRequestsArray.forEach(item => {
            this.clientRequestsArray.push(item);
        })
    }

    changeFiles() {
        this.filesToUpload = this.filesToUpload ? this.filesToUpload : new Array();
        for (var i = 0; i < this.files.length; i++) {
            let addFile = true;
            this.filesToUpload.forEach(item => {
                if (item.name === this.files[i].name) addFile = false;
            })
            if (addFile) this.filesToUpload.push(this.files[i]);
        }
    }

    removeFile(index) {
        this.filesToUpload.splice(index, 1);
    }

    toggleRequestTable() {
        this.requestTableButtonCaption = this.requestTableButtonCaption === "Hide Request Table" ? "Show Request Table" : "Hide Request Table";
    }

    togglecurriculumForm() {
        this.curriculumFormButtonCaption = this.curriculumFormButtonCaption === "Hide Curriculum Form" ? "Show Curriculum Form" : "Hide Curriculum Form";
    }

    toggleSoftwareForm() {
        this.softwareFormCaption = this.softwareFormCaption === "Hide Software Form" ? "Show Software Form" : "Hide Software Form";
    }

    toggleForACourse() {
        this.stepOneErrors = [];
        this.productAssignmentSelectedIndex = -1;
        $("tr").removeClass('table-info');
    }

    toggleCurriculumQuestion() {
        this.stepTwoErrors = [];
    }

    toggleSoftwareQuestion() {
        console.log(this.softwareQuestion)
    }

    requestChosen(el, index) {
        this.stepOneErrors = [];
        if (this.affectedProductRequests.indexOf(index) > -1) {
            this.affectedProductRequests.splice(index, 1);
            $(el.target).closest('tr').removeClass('table-info');
        } else {
            this.affectedProductRequests.push(index);
            $(el.target).closest('tr').addClass('table-info');
        }
    }

    aCourseIsSelected() {
        this.stepOneErrors = [];
    }

    showComment(element) {
        $("#" + element).css("display", "block");
    }

    hideComment(element) {
        $("#" + element).css("display", "none");
    }

    changeFiles() {
        this.filesToUpload = new Array();
        for (let i = 0; i < this.files.length; i++) {
            this.filesToUpload.push(this.files[i]);
        }
    }

    removeFile(index) {
        this.filesToUpload.splice(index, 1);
    }

    buildHelpTicket() {
        this.content.personId = this.userObj._id;
        this.content.date = new Date();
        this.helpTickets.selectObject();
        this.helpTickets.selectedObject.owner.unshift({ personId: this.userObj._id, dateAssigned: new Date() })
        this.helpTickets.selectedObject.personId = this.selectedPersonId;
        this.helpTickets.selectedObject.institutionId = this.selectedInsitutionId;
        this.helpTickets.selectedObject.assignedProduct = this.forACourse;
        this.helpTickets.selectedObject.curriculum = this.curriculumQuestion === 'Yes';
        this.helpTickets.selectedObject.software = this.softwareQuestion === 'Yes';
        if (this.affectedProductRequests.length > 0) {
            this.content.requests = [];
            this.affectedProductRequests.forEach(item => {
                this.content.requests.push({
                    productId: this.clientRequestsArray[item].productId, 
                    courseId: this.clientRequestsArray[item].courseId,
                    sessionId: this.clientRequestsArray[item].sessionId,
                    systemId: this.clientRequestsArray[item].systemId,
                    client: this.clientRequestsArray[item].client,
                    requestId: this.clientRequestsArray[item]._id
                })
            })
        }

        this.helpTickets.selectedObject.content = [this.content];
    }

    async Save() {
        this.buildHelpTicket();
        let serverResponse = await this.helpTickets.saveHelpTicket();
        if (!serverResponse.error) {
            this.utils.showNotification("The help ticket was updated");
            if (this.filesToUpload && this.filesToUpload.length > 0) {
                this.helpTickets.uploadFile(this.filesToUpload, 0, serverResponse._id);
            }
        } else {
            this.utils.showNotification("There was a problem saving the help ticket", 'error');
        }
        this._cleanUp();
    }

    _cleanUp() {
        $('.wizard').wizard('selectedItem', {
            step: 1
        })
        this.resetHelpTicket()
    }
}