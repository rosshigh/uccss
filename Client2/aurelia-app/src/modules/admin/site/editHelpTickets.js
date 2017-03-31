import {inject} from 'aurelia-framework';
import {HelpTickets} from '../../../resources/data/helpTickets';
import Validation from '../../../resources/utils/validation';
import {DataTable} from '../../../resources/utils/dataTable';
import {DocumentsServices} from '../../../resources/data/documents';

@inject(HelpTickets, Validation, DataTable, DocumentsServices)
export class EditHelpTickets {
	htTypeSelected = false;
	spinnerHTML = "";
	html="<h2>htmlText</h2>"

	constructor(helpTickets, validation, dataTable, documents){
		this.helpTickets = helpTickets;
		this.validation = validation;
		this.dataTable = dataTable;
		this.dataTable.initialize(this);
		this.documents = documents;
	}

	attached(){
        $('[data-toggle="tooltip"]').tooltip();
    }

	canActivate(){
        this.userObj = JSON.parse(sessionStorage.getItem('user'));
    }

	async activate(){
		let responses = await Promise.all([
		 	this.helpTickets.getHelpTicketTypes('?order=category', true),
		 	this.documents.getDocumentsCategoriesArray()
		]);
		this.dataTable.updateArray(this.helpTickets.helpTicketTypesArray);
		this.filteredDocumentArray = this.documents.docCatsArray;
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

	async save(){
		let resposne = await this.helpTickets.saveHelpTicketType();
		if(!response.error){
			this.dataTable.updateArray(this.helpTickets.helpTicketTypesArray);
			this.filteredDocumentArray = this.documents.docCatsArray;
			this.utils.showNotification('The help ticket type was updated');
		}
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

	addDocument(index){
        if(!this.helpTickets.selectedHelpTicketType.subtypes[this.selectedSubtype].documents) this.helpTickets.selectedHelpTicketType.subtypes[this.selectedSubtype].documents = new Array();
        for(var i = 0; i < this.helpTickets.selectedHelpTicketType.subtypes[this.selectedSubtype].documents.length; i++){
            if(this.helpTickets.selectedHelpTicketType.subtypes[this.selectedSubtype].documents[i].fileName == this.documents.selectedDocument.files[index].fileName){
                return;
            }
        }
        var newDoc = {
            categoryCode: this.documents.selectedDocument.categoryCode,
            categoryName: this.documents.selectedDocument.name,
            fileName: this.documents.selectedDocument.files[index].fileName,
            default: true
        }
        this.helpTickets.selectedHelpTicketType.subtypes[this.selectedSubtype].documents.push(newDoc);
    }

    chooseDocument(index, event){
        this.documents.selectDocument(index);

        //Reset the selected row
        if (this.selectedRow) this.selectedRow.children().removeClass('info');
        this.selectedRow = $(event.target).closest('tr');
        this.selectedRow.children().addClass('info')
        this.showDocumentForm = true;
    }

	toggleDefault(index){
        this.helpTickets.selectedHelpTicketType.subtypes[this.selectedSubtype].documents[index].default = ! this.helpTickets.selectedHelpTicketType.subtypes[this.selectedSubtype].documents[index].default;
    }

    removeDocument(index){
        this.helpTickets.selectedHelpTicketType.subtypes[this.selectedSubtype].documents.splice(index, 1);
    }

    async typeChanged(index){
      if(index >= 0){
        this.categoryIndex = index;
        this.documents.selectCategory(index);
        await this.documents.getDocumentsArray(true, '?filter=categoryCode|eq|' + this.documents.selectedCat.code);
        this.showDocuments = true;
      }
    }

}