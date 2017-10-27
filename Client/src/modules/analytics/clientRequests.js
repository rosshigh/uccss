import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";
import {CommonDialogs} from '../../resources/dialogs/common-dialogs';
import {DataTable} from '../../resources/utils/dataTable';
import {Sessions} from '../../resources/data/sessions';
import {Systems} from '../../resources/data/systems';
import {Products} from '../../resources/data/products';
import {ClientRequests} from '../../resources/data/clientRequests';
import {AppConfig} from '../../config/appConfig';
import {Utils} from '../../resources/utils/utils';
import {People} from '../../resources/data/people';

import moment from 'moment';

@inject(Router, AppConfig, CommonDialogs, People, DataTable, Utils, Sessions, Products, Systems, ClientRequests)
export class ClientRequestAnalytics {
    chartOptions = { legend: { display: false } };
    summerTable = true;
    summerInstTable = true;
    categories = [
        {
            code: 0,
            description: 'Requests by Institution'
        },
        {
            code: 1,
            description: 'Requests by Product'
        },
        // {
        //     code: 2,
        //     description: 'Requests by SAP Product'
        // }
    ]
    backgroundColors =['#cc3300','#99e600','#0099cc','#ff0066','#6666ff','#1a8cff','#000080','#66ff99','#1aff66','#808000','#ffff66','#4d4d00','#ccffff','#006666','#339933','#b3ffff','#000099','#66ff33','#269900','#ffff00','#ffff66','#9999ff','#6600cc','#009933','','#0000b3','#ff0000','#00004d','#0000cc','#ff0000','#ff0000','#ffb3b3','#ffb3b3','#e63900','#ffb3b3','#330d00','#ffb3b3','#3333ff','#0000cc'];
    selectedTab = "institution";
    institutionTableSelected = true;
    productTableSelected = true;
    showExportPanel = false;

    constructor(router, config, dialog, people, datatable, utils, sessions, products, systems, requests) {
        this.router = router;
        this.config = config;
        this.dialog = dialog;
        this.people = people;
        this.dataTable = datatable;
        this.dataTable.initialize(this);
        this.utils = utils;
        this.sessions = sessions;
        this.products = products;
        this.requests = requests;
        this.systems = systems;

        this.userObj = JSON.parse(sessionStorage.getItem('user'));
        this.chartCount = 10;
    };

    attached() {
        $('[data-toggle="tooltip"]').tooltip();
    }

    async activate() {
        let responses = await Promise.all([
            this.sessions.getSessionsArray('?filter=[in]sessionStatus[list]Active:Requests&order=startDate', true),
            this.people.getInstitutionsArray('?order=name'),
            this.config.getConfig()
        ]);
        this.selectedCategory = this.categories[0];
        this.selectedSession = this.sessions.sessionsArray[0]._id;
        this.requests.requestsArray = new Array();
       
        // this.getProductsRequests();
        await this.getInstitutionRequests();
        this.dataTable.updateArray(this.requests.analyticsInstitutionResultArray);
        this.institutionChartDataFunction();
    }

    async typeChanged(category, el){
        this.selectedCategory = category;
        $('.categoryButtons').css("background-color","");
         $('.categoryButtons').css("color","");
        $('.categoryButtons').removeClass('menuButtons');
        if(el) {
            $(el.target).css("background-color", this.config.BUTTONS_BACKGROUND);
             $(el.target).css("color", this.config.ACTIVE_SUBMENU_COLOR);
        } 
        switch(category.code){
            case 0:
                if(!this.analyticsInstitutionResultArray || this.analyticsInstitutionResultArray.length === 0) {
                    await this.getInstitutionRequests();
                }
                this.dataTable.updateArray(this.requests.analyticsInstitutionResultArray);
                this.institutionChartDataFunction();
                this.selectedTab = "institution";
                break;
            case 1:
                if(!this.requests.analyticsProductsResultArray || this.requests.analyticsProductsResultArray.length === 0){
                    await this.getProductsRequests();
                }       
                this.dataTable.updateArray(this.requests.analyticsProductsResultArray);
                this.productChartDataFunction();
                this.selectedTab = "products";
                break;
             case 2:
                if(!this.requests.analyticsSAPProductsResultArray || this.requests.analyticsSAPProductsResultArray.length === 0){
                    await this.getSAPProductsRequests();
                }       
                this.dataTable.updateArray(this.requests.analyticsSAPProductsResultArray);
                this.sapProductChartDataFunction();
                this.selectedTab = "sapProducts";
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
            if (this.requests.requestsDetailsArrayAnalytics && this.requests.requestsDetailsArrayAnalytics.length) {
                await this.requests.groupRequestsByInstitution();
                this.totalsInstitutionArray = new Array();
                this.config.REQUEST_STATUS.forEach(item => {
                    this.totalsInstitutionArray.push(0);
                });
                this.totalsInstitutionArray.push(0);
                this.totalsInstitutionArray.push(0);
                this.requests.analyticsInstitutionResultArray.forEach(item => {
                    this.totalsInstitutionArray[0] += item['total'];
                    this.totalsInstitutionArray[1] += item[1];
                    this.totalsInstitutionArray[2] += item[2];
                    this.totalsInstitutionArray[3] += item[3];
                    this.totalsInstitutionArray[4] += item[4];
                    this.totalsInstitutionArray[5] += item[5];
                    this.totalsInstitutionArray[6] += item[6];
                    this.totalsInstitutionArray[7] += item[7];
                    this.totalsInstitutionArray[8] += item['studentIds'];
                    
                });
                // this.dataTable.updateArray(this.requests.analyticsInstitutionResultArray);
                // this.institutionChartDataFunction();
            } 
        }
    }

    institutionChartDataFunction(){        
        this.instChartData = new Array();
        this.instChartCategories = new Array();
        
        this.config.REQUEST_STATUS.forEach(item => {
            this.instChartData.push(new Array());
        })

        var sortedArray = this.requests.analyticsInstitutionResultArray.sort((a,b) => {
            return (a['total'] < b['total']) ? -1 : (a['total'] > b['total']) ? 1 : 0;
        });

        sortedArray.forEach(item => {
            this.instChartData[0].push(item["1"]);
            this.instChartData[1].push(item["2"]);
            this.instChartData[2].push(item["3"]);
            this.instChartData[3].push(item["4"]);
            this.instChartData[4].push(item["5"]);
            this.instChartData[5].push(item["6"]);
            this.instChartData[6].push(item["7"]);
            this.instChartCategories.push(item.name); 
        });

        this.fastBackIns()
    }

    backwardIns(){
        if(this.firstInstitutionChartRecord - this.chartCount < 0){
            return;
        } else {
            var count =  this.chartCount;
            this.firstInstitutionChartRecord = this.firstInstitutionChartRecord - this.chartCount;
        }
        this.pageInstitutionChartData(count);
    }

    forwardIns(){
        if(this.firstInstitutionChartRecord + this.chartCount < this.instChartCategories.length){
            var count = this.chartCount;
            this.firstInstitutionChartRecord = this.firstInstitutionChartRecord + this.chartCount;
        } else {
            return;
        }
        
        this.pageInstitutionChartData(count);
    }

    fastBackIns(){
        this.firstInstitutionChartRecord = 0;
        if(this.firstInstitutionChartRecord + this.chartCount < this.instChartCategories.length){
            var count = this.chartCount;
        } else {
            var count =  this.instChartCategories.length - this.firstInstitutionChartRecord;
        } 
        this.pageInstitutionChartData(count);
    }

    fastForwardIns(){
        if(this.instChartCategories.length > this.chartCount){
            this.firstInstitutionChartRecord = this.instChartCategories.length - this.chartCount;
            var count = this.chartCount;
        } else {
            this.firstInstitutionChartRecord = 0;
            var count =  this.instChartCategories.length - this.firstInstitutionChartRecord;
        } 
        this.pageInstitutionChartData(count);
    }

    pageInstitutionChartData(count){
        var data = [];
        for(let index = 0; index < this.instChartData.length; index++){
            data[index] = this.instChartData[index].slice(this.firstInstitutionChartRecord, this.firstInstitutionChartRecord + count);
        }
        
        var categories = this.instChartCategories.slice(this.firstInstitutionChartRecord, this.firstInstitutionChartRecord + count);

        this.institutionChartData = {
            labels: categories,
            maintainAspectRatio: false,
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
            await this.requests.getClientRequestsDetailsArrayAnalytics('?filter=sessionId|eq|' + this.selectedSession);
            if (this.requests.requestsDetailsArrayAnalytics && this.requests.requestsDetailsArrayAnalytics.length) {
                this.requests.groupRequestsByProduct();
            } else {
                this.displayArray = new Array();
            }
        } else {
            this.displayArray = new Array();
        }
         
        // this.dataTable.updateArray(this.requests.analyticsProductsResultArray);
        // this.productChartDataFunction();
    }

    productChartDataFunction(){
        
        this.prodChartdata = new Array();
        this.prodChartCategories = new Array();

        this.config.REQUEST_STATUS.forEach(item => {
            this.prodChartdata.push(new Array());
        })

        var sortedArray = this.requests.analyticsProductsResultArray.sort((a,b) => {
            return (a['total'] < b['total']) ? -1 : (a['total'] > b['total']) ? 1 : 0;
        });

        sortedArray.forEach(item => {
            this.prodChartdata[0].push(item["1"]);
            this.prodChartdata[1].push(item["2"]);
            this.prodChartdata[2].push(item["3"]);
            this.prodChartdata[3].push(item["4"]);
            this.prodChartdata[4].push(item["5"]);
            this.prodChartdata[5].push(item["6"]);
            this.prodChartdata[6].push(item["7"]);
            this.prodChartCategories.push(item.productId.name); 
        });

        this.fastBackProd();
    }

    backwardProd(){
        if(this.firstProductChartRecord - this.chartCount < 0){
            return;
        } else {
            var count =  this.chartCount;
            this.firstProductChartRecord = this.firstProductChartRecord - this.chartCount;
        }
        this.pageProductChartData(count);
    }

    forwardProd(){
        if(this.firstProductChartRecord + this.chartCount < this.prodChartCategories.length){
            var count = this.chartCount;
            this.firstProductChartRecord = this.firstProductChartRecord + this.chartCount;
        } else {
            return;
        }
        
        this.pageProductChartData(count);
    }

    fastBackProd(){
        this.firstProductChartRecord = 0;
        if(this.firstProductChartRecord + this.chartCount < this.prodChartCategories.length){
            var count = this.chartCount;
        } else {
            var count =  this.prodChartCategories.length - this.firstProductChartRecord;
        } 
        this.pageProductChartData(count);
    }

    fastForwardProd(){
        if(this.prodChartCategories.length > this.chartCount){
            this.firstProductChartRecord = this.prodChartCategories.length - this.chartCount;
            var count = this.chartCount;
        } else {
            this.firstProductChartRecord = 0;
            var count =  this.prodChartCategories.length - this.firstProductChartRecord;
        } 
        this.pageProductChartData(count);
    }

    pageProductChartData(count){
        var data = [];
        for(let index = 0; index < this.prodChartdata.length; index++){
            data[index] = this.prodChartdata[index].slice(this.firstProductChartRecord, this.firstProductChartRecord + count);
        }
        
        var categories = this.prodChartCategories.slice(this.firstProductChartRecord, this.firstProductChartRecord + count);

        this.productChartData = {
            labels: categories,

                    maintainAspectRatio: false,

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

    async getSAPProductsRequests() {
        if (this.selectedSession) {
            this.numCols = this.config.REQUEST_STATUS.length + 1
            this.sessions.selectSessionById(this.selectedSession);
            await this.requests.getClientRequestsDetailsArrayAnalytics('?filter=sessionId|eq|' + this.selectedSession, true);
            if (this.requests.requestsDetailsArrayAnalytics && this.requests.requestsDetailsArrayAnalytics.length) {
                await this.requests.groupRequestsByInstitution();
                this.totalsInstitutionArray = new Array();
                this.config.REQUEST_STATUS.forEach(item => {
                    this.totalsInstitutionArray.push(0);
                });
                this.totalsInstitutionArray.push(0);
                this.requests.analyticsInstitutionResultArray.forEach(item => {
                    this.totalsInstitutionArray[0] += item['total'];
                    this.totalsInstitutionArray[1] += item[1];
                    this.totalsInstitutionArray[2] += item[2];
                    this.totalsInstitutionArray[3] += item[3];
                    this.totalsInstitutionArray[4] += item[4];
                    this.totalsInstitutionArray[5] += item[5];
                    this.totalsInstitutionArray[6] += item[6];
                    this.totalsInstitutionArray[7] += item[7];
                    
                });
                // this.dataTable.updateArray(this.requests.analyticsInstitutionResultArray);
                // this.institutionChartDataFunction();
            } 
        }
    }

    sapProductChartDataFunction(){        
        var data = new Array();
        var categories = new Array();
        
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
            categories.push(item.name); 
        });

        this.institutionChartData = {
            labels: categories,
             maintainAspectRatio: false,
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

    async showProductDetail(product){
        this.summerTable = !this.summerTable;
        if(!this.summerTable){
            let response = await this.requests.getClientRequestsDetailsArray('?filter=[and]productId|eq|' + product.productId._id + ':sessionId|eq|' + this.selectedSession, true);
            this.dataTable.updateArray(this.requests.requestsDetailsArray);
            this.selectedProductDetails = product.productId.name;
        } else {
            this.dataTable.updateArray(this.requests.analyticsProductsResultArray);
        }
    }

    async showProductInstitutionDetail(product){
        this.summerInstTable = !this.summerInstTable;
        if(!this.summerInstTable){
            let response = await this.requests.getClientRequestsDetailFaccoArray(this.selectedSession,  product.institutionId);
            this.dataTable.updateArray(this.requests.requestsDetailsArray);
            this.selectedInstitutionDetail = product.requestId.institutionId.name;
        } else {
            this.dataTable.updateArray(this.requests.analyticsInstitutionResultArray);
        }
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

    showSAPProductTable(){
        this.sapProductTableSelected = true;
    }

    showSAPProductGraph(){
        this.sapProductTableSelected = false;
    }

    customerActionDialog(){
         if(this.profileRequest){
            this.model = 'header';
            this.selectedRequestNo = this.profileRequest.requestId.clientRequestNo;
            this.requestId = this.profileRequest.requestId._id;
            this.course = this.profileRequest.requestId.courseId ? this.profileRequest.requestId.courseId.name : this.config.SANDBOX_NAME;
            this.productName = this.profileRequest.productId.name;
            this.requiredDate = this.profileRequest.requiredDate;
            this.email = this.profileRequest.requestId.personId.email;
            this.hideProfile();
         } 
            
        let subject = "Question about product request " +  this.selectedRequestNo;
        let email = {emailBody: "", emailSubject: subject, emailId: this.email};
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

    async sendTheEmail(email){
        if(email){
            var date = new Date(this.requiredDate);
            var day = date.getDate();
            var month = date.getMonth() + 1;
            var year = date.getFullYear(); 
            this.message = {
                reason: 3,
                id: this.requestId,
                customerMessage : email.email.emailBody, 
                email: email.email.emailId,
                subject: email.email.emailSubject,
                clientRequestNo: this.selectedRequestNo,
                product: [{name: this.productName, requiredDate: month + "/" + day + "/" + year}],
                session: this.sessions.selectedSession.session + ' ' + this.sessions.selectedSession.year,
                course: this.course,
                requestStatus: this.config.CUSTOMER_ACTION_REQUEST_CODE,
                model: this.model,
                audit: {
                    property: 'Send Message',
                    eventDate: new Date(),
                    newValue: email.email.emailBody,
                    personId: this.userObj._id
                }
            };     
            let serverResponse = await this.requests.sendCustomerMessage(this.message);
            if (!serverResponse.error) {
                this.utils.showNotification("The message was sent");
            }
        } 
    }
	
	showProfile(request, el){
        this.profileRequest = request;
        $(".hoverProfile").css("top", el.clientY - 250);
        $(".hoverProfile").css("left", el.clientX - 300);
        $(".hoverProfile").css("display", "block");
    }

    hideProfile(){
        $(".hoverProfile").css("display", "none");
    }

    downloadExcel(){
			var exportArray = this.utils.copyArray(this.requests.analyticsProductsResultArray);
			var htmlContent = "<table><tr><th>Product</th>";
			var numFields = this.config.REQUEST_STATUS.length;
			
			this.config.REQUEST_STATUS.forEach(item => {
				htmlContent += "<th>" + item.description + "</th>";
			})
			htmlContent += "</tr>";

			exportArray.forEach(item => {
				var line = "<tr><td>" + item.productId.name + "</td>";
				this.config.REQUEST_STATUS.forEach((field, index) => {
					line += "<td>" + item[field.code] + "</td>"; 
				})
				line += "</tr>";
				htmlContent += line;
			});
			htmlContent += "</table>";
			window.open('data:application/vnd.ms-excel,' + htmlContent);
    }
        
    downloadInstExcel(){
        var exportArray = this.utils.copyArray(this.requests.analyticsInstitutionResultArray);
        var htmlContent = "<table><tr><th>Product</th>";
        var numFields = this.config.REQUEST_STATUS.length;
        
        this.config.REQUEST_STATUS.forEach(item => {
            htmlContent += "<th>" + item.description + "</th>";
        })
        htmlContent += "</tr>";

        exportArray.forEach(item => {
            var line = "<tr><td>" + item.name + "</td>";
            this.config.REQUEST_STATUS.forEach((field, index) => {
                line += "<td>" + item[field.code] + "</td>"; 
            })
            line += "</tr>";
            htmlContent += line;
        });
        htmlContent += "</table>";
        window.open('data:application/vnd.ms-excel,' + htmlContent);
    }

    customProductSorter(sortProperty, sortDirection, sortArray, context){  
        return sortArray.sort((a, b) => {
			var result = (a['productId']['name'] < b['productId']['name']) ? -1 : (a['productId']['name'] > b['productId']['name']) ? 1 : 0;
			return result * sortDirection;
		});
    }
    
    customInstitutionSorter(sortProperty, sortDirection, sortArray, context){  
        return sortArray.sort((a, b) => {
			var result = (a['name'] < b['name']) ? -1 : (a['name'] > b['name']) ? 1 : 0;
			return result * sortDirection;
		});
    }

    customNameFilterValue(value, item, context){
        return item.name.toUpperCase().indexOf(value.toUpperCase()) > -1;
    }

    customProductFilterValue(value, item, context){
        return item.productId.name.toUpperCase().indexOf(value.toUpperCase()) > -1;
    }

    customPersonSorter(sortProperty, sortDirection, sortArray, context){ 
        return sortArray.sort((a, b) => {
            var result = (a['requestId']['personId']['lastName'] < b['requestId']['personId']['lastName']) ? -1 : (a['requestId']['personId']['lastName'] > b['requestId']['personId']['lastName']) ? 1 : 0;
            return result * sortDirection;
        });
    }

    customInstituteSorter(sortProperty, sortDirection, sortArray, context){ 
        return sortArray.sort((a, b) => {
            var result = (a['requestId']['institutionId']['name'] < b['requestId']['institutionId']['name']) ? -1 : (a['requestId']['institutionId']['name'] > b['requestId']['institutionId']['name']) ? 1 : 0;
            return result * sortDirection;
        });
    }

    customRequestStatusSorter(sortProperty, sortDirection, sortArray, context){ 
        return sortArray.sort((a, b) => {
			var result = (a[sortProperty] < b[sortProperty]) ? -1 : (a[sortProperty] > b[sortProperty]) ? 1 : 0;
			return result * sortDirection;
		});
    }

    customProductDetailSorter(sortProperty, sortDirection, sortArray, context){ 
        return sortArray.sort((a, b) => {
			var result = (a.productId.name < b.productId.name) ? -1 : (a.productId.name > b.productId.name) ? 1 : 0;
			return result * sortDirection; 
		});
    }

    customNameFilter(value, item, context){
        return item.requestId.personId.fullName.toUpperCase().indexOf(value.toUpperCase()) > -1;
    }

    statusCustomFilter(value, item, context){
        if(item.requestStatus == value) return false;
        return true;
    }

    institutionCustomFilter(value, item, context){
        return item.requestId.institutionId.name.toUpperCase().indexOf(value.toUpperCase()) > -1;
    }

    customProductFilter(value, item, context){
        return item.productId.name.toUpperCase().indexOf(value.toUpperCase()) > -1;
    }
}