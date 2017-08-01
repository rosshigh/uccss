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
            this.sessions.getSessionsArray('?filter=[in]sessionStatus[list]Active:Requests&order=startDate', true),
            this.people.getInstitutionPeople('?filter=institutionId|eq|' + this.userObj.institutionId._id + '&order=lastName'),
            this.products.getProductsArray('?filter=active|eq|true&order=name'),
            this.systems.getSystemsArray(),
            this.config.getConfig()
        ]);
    }

    async getRequests() {
        if (this.selectedSession) {
            this.sessions.selectSessionById(this.selectedSession);
            await this.requests.getClientRequestsDetailFaccoArray(this.selectedSession,  this.userObj.institutionId);
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

    customNameSorter(sortProperty, sortDirection, sortArray, context){
        var sortProperty = 'fullName';
        sortArray.forEach((item) => {
          var obj = context.dataTable.findObj(context.people.instutionPeopleArray, '_id', item.requestId.personId);
          item[sortProperty] = obj ? obj[sortProperty] : null;
        })

        return sortArray.sort((a, b) => {
            var result = (a[sortProperty] < b[sortProperty]) ? -1 : (a[sortProperty] > b[sortProperty]) ? 1 : 0;
            return result * sortDirection;
          });
    }

    productSorter(sortProperty, sortDirection, sortArray, context){
        var sortProperty = 'name';
        sortArray.forEach((item) => {
          var obj = context.dataTable.findObj(context.products.productsArray, '_id', item.productId);
          item[sortProperty] = obj ? obj[sortProperty] : null;
        })

        return sortArray.sort((a, b) => {
            var result = (a[sortProperty] < b[sortProperty]) ? -1 : (a[sortProperty] > b[sortProperty]) ? 1 : 0;
            return result * sortDirection;
          });
    }
}