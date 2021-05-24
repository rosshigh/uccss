import { inject } from 'aurelia-framework';
import { HelpTickets } from '../../../resources/data/helpTickets';
import { ClientRequests } from '../../../resources/data/clientRequests';
import { Sessions } from '../../../resources/data/sessions';
import { Products } from '../../../resources/data/products';
import { People } from '../../../resources/data/people';
import { DocumentsServices } from '../../../resources/data/documents';
import { Store } from '../../../store/store';
import { AppConfig } from '../../../appConfig';
import { Utils } from '../../../resources/utils/utils';

@inject(HelpTickets, ClientRequests, Sessions, Products, People, DocumentsServices, Store, AppConfig, Utils)
export class CreateRequest {

    wizardHeight = 400;
    minStartDate = "1/1/1900";
    maxStartDate = "1/1/9999";
    dateOptions = { daysOfWeekDisabled: [0, 6] };
    startDate = "";
    configDate = {
        "disable": [
            function (date) {
                // return true to disable
                return (date.getDay() === 6 || date.getDay() === 0);

            }
        ],
        "locale": {
            "firstDayOfWeek": 1 // start week on Monday
        },
        minDate: this.minStartDate,
        maxDate: this.maxStartDate
    };

    constructor(helpTickets, requests, sessions, products, people, documents, store, config, utils) {
        this.helpTickets = helpTickets;
        this.requests = requests;
        this.sessions = sessions;
        this.products = products;
        this.people = people;
        this.store = store;
        this.config = config;
        this.utils = utils;

        this.sessionDatesMessage = "";
        this.selectedProducts = [];

        this.userObj = this.store.getUser('user');
    }

    async activate() {
        let responses = await Promise.all([
            this.sessions.getObjectsArray('/active?order=startDate:DSC'),
            this.products.getObjectsArray('?filter=active|eq|true&order=name'),

        ]);

        this.people.getCoursesArray('?filter=personId|eq|' + this.userObj._id + '&order=number');

        this.people.getTrialClient();


        this.filterList();
    }

    // refreshSelects() {
    //     this.utils.refreshSelect("#sessionSelect", this.config.HELP_TICKET_CLOSE_REASONS, "code", this.selectedReason);
    // }

    attached() {
        // $('.selectpicker').selectpicker();
        // $('.selectpicker').click(e => e.stopPropagation());
        var wizard = $('.wizard').wizard();
        var that = this;

        wizard.on('actionclicked.fu.wizard', (e, data) => {
            that.step = data.step;
            if (data.direction !== "previous") {
                switch (data.step) {
                    case 1:
                        that.validateStepOne();
                        if (that.stepOneErrors.length) {
                            e.preventDefault();
                        }
                        break;
                    case 2:
                        that.validateStepOneA();
                        if (that.stepOneAErrors.length) {
                            e.preventDefault();
                        }
                        break;
                    case 3:
                        that.validateStepTwo();
                        if (that.stepTwoErrors.length) {
                            e.preventDefault();
                        }
                        break;
                    case 4:
                        that.validateStepThree();
                        if (that.stepThreeErrors.length) {
                            e.preventDefault();
                        }
                        break;
                    case 5:
                        that.validateStepFour();
                        if (that.stepFourErrors.length) {
                            e.preventDefault()
                        }
                        this.save();
                        // $('.wizard').wizard('selectedItem', { step: 1 });
                        break;
                }
            }
        })


        var controls = {
            leftArrow: '<i class="fal fa-angle-left" style="font-size: 1.25rem"></i>',
            rightArrow: '<i class="fal fa-angle-right" style="font-size: 1.25rem"></i>'
        }


        // minimum setup
        $('#datepicker-1').datepicker(
            {
                todayHighlight: true,
                orientation: "bottom left",
                templates: controls
            });
    }

    validateStepOne() {
        this.stepOneErrors = [];
        if (!this.sessions.selectedObject) {
            this.stepOneErrors.push('Select a session');
            return;
        }
    }

    validateStepOneA() {
        this.stepOneAErrors = [];
        if (this.CourseSelected === undefined || this.CourseSelected === "") {
            this.stepOneAErrors.push('Select a course');
        } else {
            if (this.requestType !== 'sandboxCourse') {
                if (this.startDate === undefined) {
                    this.stepOnstepOneAErrorseErrors.push('Select the date your semester begins');
                }
                if (this.endDate === undefined) {
                    this.stepOneAErrors.push('Select the date your semester ends');
                }
                if ((!this.numberOfUndergradIds || this.numberOfUndergradIds == 0) && (!this.numberOfGraduateIds || this.numberOfGraduateIds == 0) && this.requestType !== 'sandboxCourse') {
                    this.stepOneAErrors.push('Enter the number of students');
                }
                if (moment(this.startDate).isAfter(this.endDate)) {
                    this.stepOneAErrors.push('Start date must be before end date.')
                }
            }
        }
    }

    validateStepTwo() {
        this.stepTwoErrors = [];
        if (this.selectedProducts.length === 0) {
            this.stepTwoErrors.push('You must select at least one product');
        }

    }

    validateStepThree() {
        this.stepThreeErrors = [];
        this.minRequiredDate = new Date(this.minRequiredDate);
        this.maxRequiredDate = new Date(this.sessions.selectedObject.endDate);
    }

    validateStepFour() {
        this.stepFourErrors = [];
        this.selectedProducts.forEach(item => {
            if (item.requiredDate === "") {
                if (this.stepFourErrors.length === 0) {
                    this.stepFourErrors.push('Enter required dates for all requested products')
                }
            }
        })
    }

    sessionSelected() {
        let format = "dddd, MMMM Do YYYY";
        this.sessions.selectSessionById(this.selectedSession)
        this.aSessionHasBeenSelected = this.selectedSession !== "" ? true : false;
        if (this.aSessionHasBeenSelected) this.setDates();
        this.sessionDatesMessage = "This session runs from <b>" + moment(this.sessions.selectedObject.startDate).format(format) + "</b> to <b>" + moment(this.sessions.selectedObject.endDate).format(format) + "</b>";

        // this.utils.refreshSelect("#courseSelect", this.people.coursesArray, "_id", this.selectedCourse);
    }

    setDates() {
        this.minStartDate = moment(this.sessions.selectedObject.startDate).add(7, 'hours').format('YYYY-MM-DD');
        this.maxStartDate = this.sessions.selectedObject.endDate;
        this.minEndDate = this.sessions.selectedObject.startDate;
        this.maxEndDate = this.sessions.selectedObject.endDate;
        var nowPlusLeeway = moment(new Date()).add(this.config.REQUEST_LEEWAY + 1, 'days');
        this.minRequiredDate = moment.max(nowPlusLeeway, moment(this.sessions.selectedObject.startDate));
        // this.minRequiredDate = moment(this.minRequiredDate).add(7, 'hours').format('YYYY-MM-DD');

        // this.minRequiredDate = this.minStartDate;
        // this.maxRequiredDate = this.sessions.selectedObject.endDate;
    }

    changeRequestType(event) {
        if (this.requestType === "regularCourse") {
            this.requestTypeChosen = true;
            this.CourseSelected = "";
            this.startDate = "";
            this.endDate = "";
        } else {
            this.requestTypeChosen = false;
            this.startDate = this.sessions.selectedObject.startDate
            this.endDate = this.sessions.selectedObject.endDate;
            this.CourseSelected = this.config.SANDBOX_NAME;
        }
        // this.utils.refreshSelect("#courseSelect", this.people.coursesArray, "_id", this.selectedCourse);
    }

    buildRequest() {
        this.requests.setRequest();
        this.requests.selectedObject.courseId = this.people.selectedCourse._id;
        // ? this.people.selectedCourse._id : this.config.SANDBOX_ID;
        this.requests.selectedObject.personId = this.userObj._id;
        this.requests.selectedObject.institutionId = this.userObj.institutionId._id;
        this.requests.selectedObject.sessionId = this.sessions.selectedObject._id;
        this.requests.selectedObject.startDate = new Date(this.startDate);
        this.requests.selectedObject.endDate = new Date(this.endDate);
        this.requests.selectedObject.customerMessage = this.requestComments;
        this.requests.selectedObject.requestStatus = this.config.UNASSIGNED_REQUEST_CODE;
        this.requests.selectedObject.graduateIds = this.numberOfUndergradIds;
        this.requests.selectedObject.undergradIds = this.numberOfGraduateIds;
        this.selectedProducts.forEach(item => {
            this.requests.selectedObject.requestDetailsToSave.push({
                productId: item.product._id,
                requiredDate: item.requiredDate,
                requestStatus: this.config.UNASSIGNED_REQUEST_CODE,
                modifiedDate: new Date(),
                createdDate: new Date(),
                sessionId: this.sessions.selectedObject._id
            })
        })

    }

    async save() {
        this.buildRequest();
        let response = await this.requests.saveRequest();
        if (!response.error) {
            this.utils.showNotification("The request was created");
            this.cleanUp();
        }
    }

    cleanUp() {
        this.sessions.setSession();
        this.startDate = "";
        this.endDate = "";
        this.CourseSelected = "";
        this.numberOfUndergradIds = "";
        this.numberOfGraduateIds = "";
        this.selectedSession = "";
        this.aSessionHasBeenSelected = false;
        this.requestTypeChosen = false;
        this.selectedProducts = [];
        this.existingRequest = false;
        // this.refreshSelects();
        $('.wizard').wizard('selectedItem', {
            step: 1
        })
    }

    async refreshCourses() {
        await this.people.getCoursesArray('?filter=personId|eq|' + this.userObj._id + '&order=number');
        // this.utils.refreshSelect("#courseSelect", this.people.coursesArray, "_id", this.selectedCourse);
    }

    editACourse() {
        if (this.courseId != -1) {
            $('#courseEditModal').modal('show');
            $("#number").focus();
        }
    }

    newCourse() {
        this.editCourseIndex = -1;
        this.people.selectCourse();
        $('#courseEditModal').modal('show');
        $("#number").focus();
    }

    async saveCourse() {
        this.validateCourse();
        if (this.courseErrors.length === 0) {
            if (this.userObj._id) {
                this.people.selectedCourse.personId = this.userObj._id;
                let serverResponse = await this.people.saveCourse();
                if (!serverResponse.status) {
                    this.utils.showNotification("The course was updated");
                    this.refreshCourses();
                }
                $('#courseEditModal').modal('hide');
            }
        }
    }

    validateCourse() {
        this.courseErrors = [];
        if (this.people.selectedCourse.number.length === 0) {
            this.courseErrors.push('Enter a course number')
        }
        if (this.people.selectedCourse.name.length === 0) {
            this.courseErrors.push('Enter a course name')
        }
    }

    cancelEditCourse() {
        $('#courseEditModal').modal('hide');
    }

    async selectCourse(course, event) {
        let serverResponse = await this.requests.getRequest('?filter=[and]personId|eq|' + this.userObj._id + ':sessionId|eq|' + this.selectedSession + ':courseId|eq|' + course._id);
        this.selectedProducts = [];
        if (this.requests.selectedObject !== null) {
            this.CourseSelected = this.requests.selectedObject.courseId.number + " - " + this.requests.selectedObject.courseId.name;
            this.startDate = this.requests.selectedObject.startDate;
            this.endDate = this.requests.selectedObject.endDate;
            this.numberOfUndergradIds = parseInt(this.requests.selectedObject.undergradIds);
            this.numberOfGraduateIds = parseInt(this.requests.selectedObject.graduateIds);
            this.requestComments = this.requests.selectedObject.customerMessage;
            this.requests.selectedObject.requestDetails.forEach(item => {
                this.products.selectedObjectById(item.productId);
                if (item.requestStatus == this.config.ASSIGNED_REQUEST_CODE) this.existingRequest = true;
                this.selectedProducts.push({
                    detailId: item._id,
                    product: this.products.selectedObject,
                    requiredDate: item.requiredDate,
                    assigned: item.requestStatus == this.config.ASSIGNED_REQUEST_CODE
                })
            });
            // this.requestType = 'regularCourse';
            this.requestType !== 'sandboxCourse'
        } 
            if (this.people.trialClient && course._id === this.people.trialClient._id) {
                this.people.setCourse(this.people.trialClient);
                this.numberOfUndergradIds = 0;
                this.numberOfGraduateIds = 0;
                this.startDate = this.sessions.selectedObject.startDate;
                this.endDate = this.sessions.selectedObject.endDate;
                this.CourseSelected = this.people.trialClient.name;
                this.requestType = 'sandboxCourse';
            } else {
                this.people.setCourse(course);
                this.CourseSelected = this.people.selectedCourse.number + " - " + this.people.selectedCourse.name;
                // this.numberOfUndergradIds = 0;
                // this.numberOfGraduateIds = 0;
                // this.startDate = this.sessions.selectedObject.startDate;
                // this.endDate = this.sessions.selectedObject.endDate;
                this.courseSelected = true;
                this.requestType = 'regularCourse';
            }
            this.existingRequest = false;


        this.requestTypeChosen = true;
        if (this.selectedRow) this.selectedRow.children().removeClass('bold');
        this.selectedRow = $(event.target).closest('tr');
        this.selectedRow.children().addClass('bold')
    }

    selectProduct(el) {
        if (this.selectedProducts.length < this.config.REQUEST_LIMIT) {
            if (this.alreadyOnList(el.target.id)) {
                this.utils.showNotification('If you need more than one client of a product, add a comment on the next step.', 'warning')
            } else {
                this.products.selectedObjectById(el.target.id);
                this.selectedProducts.push({
                    product: this.products.selectedObject,
                    requiredDate: "",
                    assigned: false
                })
            }
        } else {
            if (this.requests.selectedRequest.requestDetails.length === this.config.REQUEST_LIMIT) {
                this.utils.showNotification('Only ' + this.config.REQUEST_LIMIT + ' products per request are allowed.', 'warning')
            }
        }
    }

    alreadyOnList(id) {
        for (let i = 0; i < this.selectedProducts.length; i++) {
            if (this.selectedProducts[i]._id === id) return true;
        }
        return false;
    }

    removeProduct(index, product) {
        if (product.assigned) {
            return;
        }
        this.selectedProducts.splice(index, 1);
    }

    filterList() {
        if (this.filter) {
            var thisFilter = this.filter
            this.filteredProductsArray = this.products.objectsArray.filter((item) => {
                return item.name.toUpperCase().indexOf(thisFilter.toUpperCase()) != -1;
            });
        } else {
            this.filteredProductsArray = this.products.objectsArray;
        }
    }

    changeBeginDate(evt) {
        if (evt.detail && evt.detail.value.date !== "") {
            this.minEndDate = moment(evt.detail.value.date).format("YYYY-MM-DD");
        }
    }

    showCurriculum(product) {
        this.productInfoObject = this.products.getProductInfo(product._id);
        this.showCurriculumBoolean = true;
    }

    hideCurriculum() {
        this.showCurriculumBoolean = false;
    }

    showSessionInfo() {
        $('#currentSessionsModal').modal('show');
    }

}