import {inject} from 'aurelia-framework';
import {DataTable} from '../../resources/utils/dataTable';
import {Sessions} from '../../resources/data/sessions';
import {Systems} from '../../resources/data/systems';
import {Products} from '../../resources/data/products';
import {ClientRequests} from '../../resources/data/clientRequests';
import {AppConfig} from '../../config/appConfig';
import {Utils} from '../../resources/utils/utils';
import {People} from '../../resources/data/people';


@inject( AppConfig, People, DataTable, Utils, Sessions, Products, Systems, ClientRequests)
export class ViewRequests {

    spinnerHTML = "";

    constructor(config,  people,  datatable, utils, sessions, products, systems, requests) {
        this.config = config;
        this.people = people;
        this.dataTable = datatable;
        this.dataTable.initialize(this);
        this.utils = utils;
        this.sessions = sessions;
        this.products = products;
        this.requests = requests;
        this.systems = systems;
    };

    attached(){
        $('[data-toggle="tooltip"]').tooltip();
    }
    
    canActivate(){
         this.userObj = JSON.parse(sessionStorage.getItem('user'));
    }

    async activate() {
        let responses = await Promise.all([
            this.sessions.getSessionsArray('?order=startDate:DSC', true),
            this.people.getInstitutionPeople('?filter=institutionId|eq|' + this.userObj.institutionId._id + '&order=lastName'),
            this.products.getProductsArray('?filter=active|eq|true&order=name'),
            this.systems.getSystemsArray(),
            this.config.getConfig()
        ]);
    }

    async getRequests() {
        if (this.selectedSession) {
            this.sessions.selectSessionById(this.selectedSession);
            await this.requests.getClientRequestsDetailFaccoArray(this.selectedSession,  this.userObj.institutionId._id, true);
            this.requests.requestsDetailsArray.forEach(item => {
                item.course = item.requestId.courseId !== null ? item.requestId.courseId.number : this.config.SANDBOX_NAME
            })
            this.dataTable.updateArray(this.requests.requestsDetailsArray);
        } else {
            this.dataTable.updateArray([]);
        }
    }

    async refresh() {
        this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
        await this.getRequests();
        this.spinnerHTML = "";
    }

    courseCustomFilter(value, item, context){
        if(value == 'Regular' && item.requestId.courseId != context.config.SANDBOX_ID)  return true;
        if(value == context.config.SANDBOX_ID && item.requestId.courseId == context.config.SANDBOX_ID) return true;
        return false;
    }

    nameCustomFilter(value, item, context){
        for(let i = 0; i < context.people.instutionPeopleArray.length; i++){
            if(item.requestId.personId == context.people.instutionPeopleArray[i]._id) {
                return context.people.instutionPeopleArray[i].fullName.toUpperCase().indexOf(value.toUpperCase()) > -1;
            }
        }
        return false;
    }


    customPersonSorter(sortProperty, sortDirection, sortArray, context){ 
        return sortArray.sort((a, b) => {
            if(a['requestId']['personId']['lastName'] && b['requestId']['personId']['lastName']){
                var result = (a['requestId']['personId']['lastName'] < b['requestId']['personId']['lastName']) ? -1 : (a['requestId']['personId']['lastName'] > b['requestId']['personId']['lastName']) ? 1 : 0;
            } else {
                var result = -1;
            }
            return result * sortDirection;
        });
    }

    customNameFilter(value, item, context){
        return item.requestId && item.requestId.personId.fullName.toUpperCase().indexOf(value.toUpperCase()) > -1;
    }

    customProductNameFilter(value, item, context){
        return item.productId.name.toUpperCase().indexOf(value.toUpperCase()) > -1;
    }
}