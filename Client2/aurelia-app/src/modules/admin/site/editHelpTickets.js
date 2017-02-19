import {inject} from 'aurelia-framework';
import {HelpTickets} from '../../../resources/data/helpTickets';
import Validation from '../../../resources/utils/validation';
import {DataTable} from '../../../resources/utils/dataTable';

@inject(HelpTickets, Validation, DataTable)
export class EditHelpTickets {
	htTypeSelected = false;
	spinnerHTML = "";
	html="<h2>htmlText</h2>"

	constructor(helpTickets, validation, dataTable){
		this.helpTickets = helpTickets;
		this.validation = validation;
		this.dataTable = dataTable;
		this.dataTable.initialize(this);
	}

	attached(){
        $('[data-toggle="tooltip"]').tooltip();
    }

	canActivate(){
        this.userObj = JSON.parse(sessionStorage.getItem('user'));
    }

	async activate(){
		await this.helpTickets.getHelpTicketTypes('?order=category', true);
		this.dataTable.updateArray(this.helpTickets.helpTicketTypesArray);
	}
	
	async refresh() {
		this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
		await await this.helpTickets.getHelpTicketTypes('?order=category', true);
		this.updateArray();
		this.spinnerHTML = "";
	}

	selectCategory(){
		if(this.selectedCategory > -1){
			this.helpTickets.selectHelpTicketTypeCategory(this.selectedCategory);
		}
	}

	typeSelected(){
		if(this.selectedSubtype > -1){
			this.htSubTypeSelected = true;
		} else {
			this.htTypeSelected = false;
		}
	}

	back(){
		this.htTypeSelected = false;
	}

	save(){
		this.htTypeSelected = false;
	}

	cancel(){
		if(this.selectedCategory > -1){
			this.helpTickets.selectHelpTicketTypeCategory(this.selectedCategory);
		}
	}

	newCategory(){
		
	}

	newSubtype(){

	}

}