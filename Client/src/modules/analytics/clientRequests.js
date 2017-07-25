import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";

import {DataTable} from '../../resources/utils/dataTable';
import {Sessions} from '../../resources/data/sessions';
import {Systems} from '../../resources/data/systems';
import {Products} from '../../resources/data/products';
import {ClientRequests} from '../../resources/data/clientRequests';
import {AppConfig} from '../../config/appConfig';
import {Utils} from '../../resources/utils/utils';
import {People} from '../../resources/data/people';

import moment from 'moment';
import $ from 'jquery';

@inject(Router, AppConfig, People, DataTable, Utils, Sessions, Products, Systems, ClientRequests)
export class ClientRequestAnalytics {
    categories = [
        {
            code: 0,
            description: 'Requests by Institution'
        },
        {
            code: 1,
            description: 'Requests by Product'
        }
    ]
    backgroundColors =['#cc3300','#99e600','#0099cc','#ff0066','#6666ff','#1a8cff','#000080','#66ff99','#1aff66','#808000','#ffff66','#4d4d00','#ccffff','#006666','#339933','#b3ffff','#000099','#66ff33','#269900','#ffff00','#ffff66','#9999ff','#6600cc','#009933','','#0000b3','#ff0000','#00004d','#0000cc','#ff0000','#ff0000','#ffb3b3','#ffb3b3','#e63900','#ffb3b3','#330d00','#ffb3b3','#3333ff','#0000cc'];
    selectedTab = "institution";
    institutionTableSelected = true;
    productTableSelected = true;

    constructor(router, config, people, datatable, utils, sessions, products, systems, requests) {
        this.router = router;
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

    attached() {
        $('[data-toggle="tooltip"]').tooltip();
    }

    canActivate() {
        this.userObj = JSON.parse(sessionStorage.getItem('user'));
    }

    async activate() {
        let responses = await Promise.all([
            this.sessions.getSessionsArray('?filter=[in]sessionStatus[list]Active:Requests&order=startDate', true),
            this.people.getPeopleArray('?order=lastName'),
            this.people.getInstitutionsArray('?order=name'),
            this.products.getProductsArray('?order=name'),
            this.systems.getSystemsArray(),
            this.config.getConfig()
        ]);
        // this.dataTable.updateArray(this.requests.requestsDetailsArray);
        this.selectedCategory = this.categories[0];
        this.getInstitutionRequests();
        this.getProductsRequests();
    }

    typeChanged(category, el){
        this.selectedCategory = category;
        $('.categoryButtons').removeClass('active');
        $(el.target).addClass('active');
        switch(category.code){
            case 0:
                this.getInstitutionRequests();
                this.selectedTab = "institution";
                break;
            case 1:
                this.getProductsRequests();
                this.selectedTab = "products";
                break;
        }
    }

    async getSessionData(){
        switch(this.selectedTab){
            case 'institution':
                await this.getInstitutionRequests();
                break;
            case 'products':
                await this.getProductsRequests();
                break;
        }
    }

    async getInstitutionRequests() {
        if (this.selectedSession) {
            this.numCols = this.config.REQUEST_STATUS.length + 1
            this.sessions.selectSessionById(this.selectedSession);
            await this.requests.getClientRequestsDetailsArrayAnalytics('?filter=sessionId|eq|' + this.selectedSession, true);
            if (this.requests.requestsDetailsArray && this.requests.requestsDetailsArray.length) {
                this.requests.groupRequestsByInstitution();
                this.dataTable.updateArray(this.requests.analyticsInstitutionResultArray);
                this.institutionChartDataFunction();
            } else {
                this.displayArray = new Array();
            }
        } else {
            this.displayArray = new Array();
        }
    }

    institutionChartDataFunction(){
        
        var data = new Array();
        var categories = new Array();
        
        this.requests.analyticsInstitutionResultArray.forEach((item, index) => {
            item.total = item["1"] + item["2"] + item["4"] +  item["5"] +  item["6"] +  item["7"]; 
        });

        this.config.REQUEST_STATUS.forEach(item => {
            data.push(new Array());
        })

        var sortedArray = this.requests.analyticsInstitutionResultArray.sort((a,b) => {
            return (a['total'] < b['total']) ? -1 : (a['total'] > b['total']) ? 1 : 0;
        });

        sortedArray.forEach(item => {
            data[0].push(item["1"]);
            data[1].push(item["2"]);
            data[2].push(item["3"]);
            data[3].push(item["4"]);
            data[4].push(item["5"]);
            data[5].push(item["6"]);
            data[6].push(item["7"]);
            // data[7].push(item['total']);
            categories.push(item.name); 
        });

        this.institutionChartData = {
            labels: categories,
            datasets: [
                {
                    label: this.config.REQUEST_STATUS[0].description,
                    data: data[0],
                    backgroundColor: this.backgroundColors[0],
                    hoverBackgroundColor: this.backgroundColors[0],
                    hoverBorderWidth: 2,
                    hoverBorderColor: 'lightgrey'
                },
                {
                    label: this.config.REQUEST_STATUS[1].description,
                    data: data[1],
                    backgroundColor: this.backgroundColors[1],
                    hoverBackgroundColor: this.backgroundColors[1],
                    hoverBorderWidth: 2,
                    hoverBorderColor: 'lightgrey'
                },
                {
                    label: this.config.REQUEST_STATUS[2].description,
                    data: data[2],
                    backgroundColor: this.backgroundColors[2],
                    hoverBackgroundColor: this.backgroundColors[2],
                    hoverBorderWidth: 2,
                    hoverBorderColor: 'lightgrey'
                },
                {
                    label: this.config.REQUEST_STATUS[3].description,
                    data: data[3],
                    backgroundColor: this.backgroundColors[3],
                    hoverBackgroundColor: this.backgroundColors[3],
                    hoverBorderWidth: 2,
                    hoverBorderColor: 'lightgrey'
                },
                {
                    label: this.config.REQUEST_STATUS[4].description,
                    data: data[4],
                    backgroundColor: this.backgroundColors[4],
                    hoverBackgroundColor: this.backgroundColors[4],
                    hoverBorderWidth: 2,
                    hoverBorderColor: 'lightgrey'
                },
                {
                    label: this.config.REQUEST_STATUS[5].description,
                    data: data[5],
                    backgroundColor: this.backgroundColors[5],
                    hoverBackgroundColor: this.backgroundColors[5],
                    hoverBorderWidth: 2,
                    hoverBorderColor: 'lightgrey'
                },
                {
                    label: this.config.REQUEST_STATUS[6].description,
                    data: data[6],
                    backgroundColor: this.backgroundColors[6],
                    hoverBackgroundColor: this.backgroundColors[6],
                    hoverBorderWidth: 2,
                    hoverBorderColor: 'lightgrey'
                }
            ]
        };
    }

    async getProductsRequests(){
        if (this.selectedSession) {
            this.numCols = this.config.REQUEST_STATUS.length + 1
            this.sessions.selectSessionById(this.selectedSession);
            await this.requests.getClientRequestsDetailsArrayAnalytics('?filter=sessionId|eq|' + this.selectedSession, true);
            if (this.requests.requestsDetailsArray && this.requests.requestsDetailsArray.length) {
                this.requests.groupRequestsByProduct();
                this.dataTable.updateArray(this.requests.analyticsProductsResultArray);
                this.productChartDataFunction();
            } else {
                this.displayArray = new Array();
            }
        } else {
            this.displayArray = new Array();
        }

    }

    productChartDataFunction(){
        
        var data = new Array();
        var categories = new Array();
        
        this.requests.analyticsProductsResultArray.forEach((item, index) => {
            item.total = item["1"] + item["2"] + item["4"] +  item["5"] +  item["6"] +  item["7"]; 
        });

        this.config.REQUEST_STATUS.forEach(item => {
            data.push(new Array());
        })

        var sortedArray = this.requests.analyticsProductsResultArray.sort((a,b) => {
            return (a['total'] < b['total']) ? -1 : (a['total'] > b['total']) ? 1 : 0;
        });

        sortedArray.forEach(item => {
            data[0].push(item["1"]);
            data[1].push(item["2"]);
            data[2].push(item["3"]);
            data[3].push(item["4"]);
            data[4].push(item["5"]);
            data[5].push(item["6"]);
            data[6].push(item["7"]);
            categories.push(item.productId.name); 
        });

        this.productChartData = {
            labels: categories,
            datasets: [
                {
                    label: this.config.REQUEST_STATUS[0].description,
                    data: data[0],
                    backgroundColor: this.backgroundColors[0],
                    hoverBackgroundColor: this.backgroundColors[0],
                    hoverBorderWidth: 2,
                    hoverBorderColor: 'lightgrey'
                },
                {
                    label: this.config.REQUEST_STATUS[1].description,
                    data: data[1],
                    backgroundColor: this.backgroundColors[1],
                    hoverBackgroundColor: this.backgroundColors[1],
                    hoverBorderWidth: 2,
                    hoverBorderColor: 'lightgrey'
                },
                {
                    label: this.config.REQUEST_STATUS[2].description,
                    data: data[2],
                    backgroundColor: this.backgroundColors[2],
                    hoverBackgroundColor: this.backgroundColors[2],
                    hoverBorderWidth: 2,
                    hoverBorderColor: 'lightgrey'
                },
                {
                    label: this.config.REQUEST_STATUS[3].description,
                    data: data[3],
                    backgroundColor: this.backgroundColors[3],
                    hoverBackgroundColor: this.backgroundColors[3],
                    hoverBorderWidth: 2,
                    hoverBorderColor: 'lightgrey'
                },
                {
                    label: this.config.REQUEST_STATUS[4].description,
                    data: data[4],
                    backgroundColor: this.backgroundColors[4],
                    hoverBackgroundColor: this.backgroundColors[4],
                    hoverBorderWidth: 2,
                    hoverBorderColor: 'lightgrey'
                },
                {
                    label: this.config.REQUEST_STATUS[5].description,
                    data: data[5],
                    backgroundColor: this.backgroundColors[5],
                    hoverBackgroundColor: this.backgroundColors[5],
                    hoverBorderWidth: 2,
                    hoverBorderColor: 'lightgrey'
                },
                {
                    label: this.config.REQUEST_STATUS[6].description,
                    data: data[6],
                    backgroundColor: this.backgroundColors[6],
                    hoverBackgroundColor: this.backgroundColors[6],
                    hoverBorderWidth: 2,
                    hoverBorderColor: 'lightgrey'
                }
            ]
        };
    }

    showInstitutionTable(){
        this.institutionTableSelected = true;
    }

    showInstitutionGraph(){
        this.institutionTableSelected = false;
    }

     showProductTable(){
        this.productTableSelected = true;
    }

    showProductGraph(){
        this.productTableSelected = false;
    }

    customProductSorter(sortProperty, sortDirection, sortArray, context){  
        return sortArray.sort((a, b) => {
			var result = (a['productId']['name'] < b['productId']['name']) ? -1 : (a['productId']['name'] > b['productId']['name']) ? 1 : 0;
			return result * sortDirection;
		});
    }
    
    customInstitutionSorter(sortProperty, sortDirection, sortArray, context){  
        return sortArray.sort((a, b) => {
			var result = (a['institutionId']['name'] < b['institutionId']['name']) ? -1 : (a['institutionId']['name'] > b['institutionId']['name']) ? 1 : 0;
			return result * sortDirection;
		});
    }
}