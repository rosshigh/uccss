import {inject} from 'aurelia-framework';

import {DataTable} from '../../resources/utils/dataTable';
// import {Sessions} from '../../resources/data/sessions';
// import {Systems} from '../../resources/data/systems';
// import {Products} from '../../resources/data/products';
import {HelpTickets} from '../../resources/data/helpTickets';
import {AppConfig} from '../../config/appConfig';
import {Utils} from '../../resources/utils/utils';
// import {People} from '../../resources/data/people';

import moment from 'moment';

@inject( AppConfig,  DataTable, Utils, HelpTickets)
export class HelpTicketAnalytics {
    chartOptions = { legend: { display: false } };
    backgroundColors =['#cc3300','#99e600','#0099cc','#ff0066','#6666ff','#1a8cff','#000080','#66ff99','#1aff66','#808000','#ffff66','#4d4d00','#ccffff','#006666','#339933','#b3ffff','#000099','#66ff33','#269900','#ffff00','#ffff66','#9999ff','#6600cc','#009933','','#0000b3','#ff0000','#00004d','#0000cc','#ff0000','#ff0000','#ffb3b3','#ffb3b3','#e63900','#ffb3b3','#330d00','#ffb3b3','#3333ff','#0000cc'];
    categories = [
        {
            code: 0,
            description: 'Help Tickets By Types'
        },
        {
            code: 1,
            description: 'Help Tickets by Curriculum'
		},
		{
            code: 2,
            description: 'Help Tickets by Institution'
        },
		{
            code: 3,
            description: 'Help Tickets by People'
        },
		{
            code: 4,
            description: 'Help Tickets by Status'
        }
    ]
    backgroundColors =['#cc3300','#99e600','#0099cc','#ff0066','#6666ff','#006666','#000080','#66ff99','#1aff66','#808000','#ffff66','#4d4d00','#ccffff','#006666','#339933','#b3ffff','#000099','#66ff33','#269900','#ffff00','#ffff66','#9999ff','#6600cc','#009933','','#0000b3','#ff0000','#00004d','#0000cc','#ff0000','#ff0000','#ffb3b3','#ffb3b3','#e63900','#ffb3b3','#330d00','#ffb3b3','#3333ff','#0000cc'];
    selectedTab = "types";
    typeTableSelected = true;
    curriculumtableSelected = true;
    institutiontableSelected = true;
    peopleTableSelected = true;
    statusTableSelected = true;

    constructor(config,  datatable, utils, helpTickets) {
        this.config = config;
        this.dataTable = datatable;
        this.dataTable.initialize(this);
        this.utils = utils;
        this.helpTickets = helpTickets;

        this.userObj = JSON.parse(sessionStorage.getItem('user'));
    };

    attached() {
        $('[data-toggle="tooltip"]').tooltip();
    }

    async activate() {
        let responses = await Promise.all([
            this.helpTickets.getHelpTicketTypes(),
            this.config.getConfig()
        ]);
        this.selectedCategory = this.categories[0];
		this.getTypeHelpTickets();
		this.getInstitutionHelpTickets();
        this.getCurriculumHelpTickets();
        this.getPeopleHelpTickets();
		this.getStatusHelpTickets();
    }

    typeChanged(category, el){
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
                // this.getTypeHelpTickets();
                this.dataTable.updateArray(this.helpTickets.helpTicketTypeArrayAnalytics);
                this.selectedTab = "types";
                break;
            case 1:
                // this.getCurriculumHelpTickets();
                this.selectedTab = "curriculum";
                this.dataTable.updateArray(this.helpTickets.helpTicketCurriculumArrayAnalytics);
				break;
			case 2:
                // this.getInstitutionHelpTickets();
                 this.dataTable.updateArray(this.helpTickets.helpTicketInstitutionArrayAnalytics);
				this.selectedTab = 'institutions';
				break;
			case 3:
                this.getPeopleHelpTickets();
                this.dataTable.updateArray(this.helpTickets.helpTicketPeopleArrayAnalytics);
				this.selectedTab = 'people'
                break;
            case 4:
                this.getStatusHelpTickets();
                this.dataTable.updateArray(this.helpTickets.helpTicketStatusArrayAnalytics);
				this.selectedTab = 'status'
				break;
        }
    }

    async getTypeHelpTickets(){
        if (this.selectedTab) {
            this.numCols = 2;
            await this.helpTickets.getHelpTicketsArrayAnalytics();
            if (this.helpTickets.helpTicketArrayAnalytics && this.helpTickets.helpTicketArrayAnalytics.length) {
                this.helpTickets.groupRequestsByType();
                this.substituteTypeDescriptions();
                this.dataTable.updateArray(this.helpTickets.helpTicketTypeArrayAnalytics);
                this.typeChartDataFunction();
            } else {
                this.displayArray = new Array();
            }
        } else {
            this.displayArray = new Array();
        }
    }

    substituteTypeDescriptions(){
        this.helpTickets.helpTicketTypeArrayAnalytics.forEach((item,index) => {
            for(let i = 0; i < this.helpTickets.helpTicketTypesArray.length; i++){
                for(let j = 0; j < this.helpTickets.helpTicketTypesArray[i].subtypes.length; j++){
                    if(this.helpTickets.helpTicketTypesArray[i].subtypes[j].type == item.helpTicketType) {
                        this.helpTickets.helpTicketTypeArrayAnalytics[index].description = this.helpTickets.helpTicketTypesArray[i].subtypes[j].description;
                    }
                }
            }
        });
    }

    typeChartDataFunction(){
        
        var data = new Array();
        var categories = new Array();

        var sortedArray = this.helpTickets.helpTicketTypeArrayAnalytics.sort((a,b) => {
            return (a['description'] < b['description']) ? -1 : (a['description'] > b['description']) ? 1 : 0;
        });

        sortedArray.forEach(item => {
            categories.push(item.description);
            data.push(item.count);
        })
        
        this.typeChartData = {
            labels: categories,
           
            datasets: [
                {
                    data: data,
                    backgroundColor: this.backgroundColors,
                    hoverBackgroundColor: this.backgroundColors,
                    hoverBorderWidth: 2,
                    hoverBorderColor: 'lightgrey'
                }
            ]
        };
    }

    async getCurriculumHelpTickets(){
        if (this.selectedTab) {
            await this.helpTickets.getHelpTicketsArrayAnalytics();
            if (this.helpTickets.helpTicketArrayAnalytics && this.helpTickets.helpTicketArrayAnalytics.length) {
                this.helpTickets.groupRequestsByCurriculum();
                this.curriculumChartDataFunction();
            } else {
                this.displayArray = new Array();
            }
        } else {
            this.displayArray = new Array();
        }
    }

    curriculumChartDataFunction(){
        var data = new Array();
        var categories = new Array();

        var sortedArray = this.helpTickets.helpTicketCurriculumArrayAnalytics.sort((a,b) => {
            return (a['curriculumTitle'] < b['curriculumTitle']) ? -1 : (a['curriculumTitle'] > b['curriculumTitle']) ? 1 : 0;
        });

        sortedArray.forEach(item => {
            categories.push(item.curriculumTitle);
            data.push(item.count);
        })
        
        this.curriculumChartData = {
            labels: categories,
            datasets: [
                {
                    data: data,
                    backgroundColor: this.backgroundColors,
                    hoverBackgroundColor: this.backgroundColors,
                    hoverBorderWidth: 2,
                    hoverBorderColor: 'lightgrey'
                }
            ]
        };
    }

    async getInstitutionHelpTickets(){
        if (this.selectedTab) {
            await this.helpTickets.getHelpTicketsArrayAnalytics();
            if (this.helpTickets.helpTicketArrayAnalytics && this.helpTickets.helpTicketArrayAnalytics.length) {
                this.helpTickets.groupHelpTicketsByInstitution();
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

        var sortedArray = this.helpTickets.helpTicketInstitutionArrayAnalytics.sort((a,b) => {
            return (a['institution'] < b['institution']) ? -1 : (a['institution'] > b['institution']) ? 1 : 0;
        });

        sortedArray.forEach(item => {
            categories.push(item.institution);
            data.push(item.count);
        })
        
        this.institutionChartData = {
            labels: categories,
            datasets: [
                {
                    data: data,
                    backgroundColor: this.backgroundColors,
                    hoverBackgroundColor: this.backgroundColors,
                    hoverBorderWidth: 2,
                    hoverBorderColor: 'lightgrey'
                }
            ]
        };
    }

    async getPeopleHelpTickets(){
        if (this.selectedTab) {
            await this.helpTickets.getHelpTicketsArrayAnalytics();
            if (this.helpTickets.helpTicketArrayAnalytics && this.helpTickets.helpTicketArrayAnalytics.length) {
                this.helpTickets.groupHelpTicketsByPeople();
                this.peopleChartDataFunction();
            } else {
                this.displayArray = new Array();
            }
        } else {
            this.displayArray = new Array();
        }
    }

    peopleChartDataFunction(){
        var data = new Array();
        var categories = new Array();

        var sortedArray = this.helpTickets.helpTicketPeopleArrayAnalytics.sort((a,b) => {
            return (a['name'] < b['name']) ? -1 : (a['name'] > b['name']) ? 1 : 0;
        });

        sortedArray.forEach(item => {
            categories.push(item.name);
            data.push(item.count);
        })
        
        this.peopleChartData = {
            labels: categories,
            datasets: [
                {
                    data: data,
                    backgroundColor: this.backgroundColors,
                    hoverBackgroundColor: this.backgroundColors,
                    hoverBorderWidth: 2,
                    hoverBorderColor: 'lightgrey'
                }
            ]
        };
    }

    async getStatusHelpTickets(){
        if (this.selectedTab) {
            await this.helpTickets.getHelpTicketsArrayAnalytics();
            if (this.helpTickets.helpTicketArrayAnalytics && this.helpTickets.helpTicketArrayAnalytics.length) {
                this.helpTickets.groupHelpTicketsByStatus();
                this.substituteStatusDescriptions();
                this.statusChartDataFunction();
            } else {
                this.displayArray = new Array();
            }
        } else {
            this.displayArray = new Array();
        }
    }

    substituteStatusDescriptions(){
        this.helpTickets.helpTicketStatusArrayAnalytics.forEach((item,index) => {
            for(let i = 0; i < this.config.HELP_TICKET_STATUSES.length; i++){
                if(this.config.HELP_TICKET_STATUSES[i].code == item.helpTicketStatus) {
                    this.helpTickets.helpTicketStatusArrayAnalytics[index].helpTicketStatus = this.config.HELP_TICKET_STATUSES[i].description;
                }
            }
        });
    }

    statusChartDataFunction(){
        var data = new Array();
        var categories = new Array();

        var sortedArray = this.helpTickets.helpTicketStatusArrayAnalytics.sort((a,b) => {
            return (a['helpTicketStatus'] < b['helpTicketStatus']) ? -1 : (a['helpTicketStatus'] > b['helpTicketStatus']) ? 1 : 0;
        });

        sortedArray.forEach(item => {
            categories.push(item.helpTicketStatus);
            data.push(item.count);
        })
        
        this.statusChartData = {
            labels: categories,
            datasets: [
                {
                    data: data,
                    backgroundColor: this.backgroundColors,
                    hoverBackgroundColor: this.backgroundColors,
                    hoverBorderWidth: 2,
                    hoverBorderColor: 'lightgrey'
                }
            ]
        };
    }

    showTypeTable(){
        this.typeTableSelected = true;
    }

    showTypeGraph(){
        this.typeTableSelected = false;
    }

    showCurriculumTable(){
        this.curriculumtableSelected = true;
    }

    showCurriculumGraph(){
        this.curriculumtableSelected = false;
    }

    showInstitutionTable(){
        this.institutiontableSelected = true;
    }

    showInstitutionGraph(){
        this.institutiontableSelected = false;
    }

    showPeopleTable(){
        this.peopleTableSelected = true;
    }

    showPeopleGraph(){  
        this.peopleTableSelected = false;
    }

    showStatusTable(){
        this.statusTableSelected = true;
    }

    showStatusGraph(){
        this.statusTableSelected = false;
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
}