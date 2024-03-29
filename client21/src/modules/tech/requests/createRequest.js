import { inject } from 'aurelia-framework';
// import { HelpTickets } from '../../../resources/data/helpTickets';
import { ClientRequests } from '../../../resources/data/clientRequests';
import { Sessions } from '../../../resources/data/sessions';
import { Products } from '../../../resources/data/products';
import { People } from '../../../resources/data/people';
// import { DocumentsServices } from '../../../resources/data/documents';
import { Store } from '../../../store/store';
import { AppConfig } from '../../../appConfig';
import { Utils } from '../../../resources/utils/utils';

@inject( ClientRequests, Sessions, Products, People, Store, AppConfig, Utils)
export class CreateRequestTech {

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

    constructor(requests, sessions, products, people, store, config, utils) {
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
            this.people.getInstitutionArray('?order=name')
        ]);

        this.people.getCoursesArray('?filter=personId|eq|' + this.userObj._id + '&order=number');

        this.people.getTrialClient();

        this.filterList();
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

    sessionSelected() {
        let format = "dddd, MMMM Do YYYY";
        this.sessions.selectSessionById(this.selectedSession)
        this.aSessionHasBeenSelected = this.selectedSession !== "" ? true : false;
        if (this.aSessionHasBeenSelected) this.setDates();
    }

    setDates() {
        this.minStartDate = moment(this.sessions.selectedObject.startDate).add(7, 'hours').format('YYYY-MM-DD');
        this.maxStartDate = this.sessions.selectedObject.endDate;
        this.minEndDate = this.sessions.selectedObject.startDate;
        this.maxEndDate = this.sessions.selectedObject.endDate;
        var nowPlusLeeway = moment(new Date()).add(this.config.REQUEST_LEEWAY + 1, 'days');
        this.minRequiredDate = moment.max(nowPlusLeeway, moment(this.sessions.selectedObject.startDate));
    }

    async institutionSelected(){
        this.anInstitutionHasBeenSelected = this.selectedInstitution !== "" ? true : false;
        await this.people.getPeopleArray('?filter=[and]institutionId|eq|' + this.selectedInstitution + ':personStatus|eq|01&order=lastName');
    }

    async personSelected(){
        this.aPersonIsSelected = this.selectedPerson != "";
        this.people.getCoursesArray('?filter=personId|eq|' + this.selectedPerson + '&order=number');
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

    buildRequest() {
        this.requests.setRequest();
        this.requests.selectedObject.courseId = this.people.selectedCourse._id;
        this.requests.selectedObject.personId = this.selectedPerson;
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
        if(this.validateInput()){
            this.buildRequest();
            let response = await this.requests.saveRequest();
            if (!response.error) {
                this.utils.showNotification("The request was created");
                this.cleanUp();
            }
        }
    }

    cleanUp(){
        this.selectedSession = "";
        this.aSessionHasBeenSelected = false;
        this.selectedInstitution = "";
        this.anInstitutionHasBeenSelected = false;
        this.selectedPerson = "";
        this.aPersonIsSelected = false;
        this.requestTypeChosen = false;
        this.requestComments = "";

    }

    validateInput(){
        return true;
    }

    changeBeginDate(evt) {
        if (evt.detail && evt.detail.value.date !== "") {
            this.minEndDate = moment(evt.detail.value.date).format("YYYY-MM-DD");
        }
    }
}
