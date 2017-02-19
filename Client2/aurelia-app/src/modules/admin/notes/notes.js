import {inject} from 'aurelia-framework';
import { Router } from "aurelia-router";
import {DataTable} from '../../../resources/utils/dataTable';
import {AppConfig} from '../../../config/appConfig';
import {People} from '../../../resources/data/people';
import {Utils} from '../../../resources/utils/utils';
import {HelpTickets} from '../../../resources/data/helpTickets';

@inject(Router, DataTable, AppConfig, People, Utils, HelpTickets)
export class Notes{
	noteSelected = "No";
	showCategoryForm = false;
	spinnerHTML = "";
	navControl = "notesNavButtons";
    
    constructor(router, dataTable, config, people, utils, helpTickets){
		this.router = router;
		this.dataTable = dataTable;
		this.dataTable.initialize(this);
		this.config = config;
		this.people = people;
		this.utils = utils;
		this.helpTickets = helpTickets;
    }

	attached(){
        $('[data-toggle="tooltip"]').tooltip();
    }

	canActivate(){
		 this.userObj = JSON.parse(sessionStorage.getItem('user'));
	}

    async activate() {
		 let responses = await Promise.all([
			this.people.getPeopleArray(),
			this.people.getNotesArray('?filter=personId|eq|' + this.userObj._id + '&order=dateCreated', true),
			this.config.getConfig()
		 ]);
        this.dataTable.updateArray(this.people.notesArray);
    }

    async refresh() {
        this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
        await this.people.getNotesArray('?filter=personId|eq|' + this.userObj._id + '&order=dateCreated', true);
        this.dataTable.updateArray(this.people.notesArray);
        this.spinnerHTML = "";
    }

	new(){
		this.noteSelected = 'Yes';
		this.people.selectNote();
		this.editIndex = undefined;
		this.people.selectedNote.personId = this.userObj._id;
		this.people.selectedNote.category = this.userObj.noteCategories[0];
	}

	edit(index, el){
		this.editIndex = this.dataTable.getOriginalIndex(index);
		this.people.selectNote(this.editIndex);

        //Reset the selected row
        if (this.selectedRow) this.selectedRow.children().removeClass('info');
        this.selectedRow = $(el.target).closest('tr');
        this.selectedRow.children().addClass('info')
        this.noteSelected = 'Yes';
	}

	async save(){
		let response = await this.people.saveNote();
		if(!response.error){
			this.utils.showNotification('The note was saved');
			this.dataTable.updateArray(this.people.notesArray);
			this.noteSelected = 'No';
		}
	}

	async delete(note){
		if(note) this.people.selectNoteById(note._id);
		if(this.people.selectedNote._id){
			let response = await this.people.deleteNote();
			if(!response.error){
				this.utils.showNotification('The note was deleted');
				this.dataTable.updateArray(this.people.notesArray);
				this.noteSelected = 'No';
			}
		}
	}

	back(){
		this.noteSelected = 'No';
	}

	cancel(){
		this.people.selectNote(this.editIndex);
	}

    openEditCatForm(newOrEdit){ 
        if(newOrEdit === 'new'){;
            this.categoryDescription = "";
            this.showCategoryForm = true; 
            this.editCategoryFlag = false;
        } else {
			this.categoryDescription = this.people.selectedNote.category;
			this.editCategoryIndex = this.userObj.noteCategories.indexOf(this.categoryDescription);
            this.showCategoryForm = true;
            this.editCategoryFlag = true;
        }
    }

	async saveCategory(){
		this.people.selectedPersonFromId(this.userObj._id);
		if(this.editCategoryFlag){
			this.userObj.noteCategories[this.editCategoryIndex] =  this.categoryDescription;
			this.people.selectedPerson.noteCategories[this.editCategoryIndex] =  this.categoryDescription;
		} else {
			this.userObj.noteCategories.push(this.categoryDescription);
			this.people.selectedPerson.noteCategories.push(this.categoryDescription);
		}
		
		await this.people.savePerson();
		sessionStorage.setItem('user',JSON.stringify(this.userObj));
		this.showCategoryForm = false; 
	}

	async deleteCat(){

	}

	backHelpTicket(){
		this.noteSelected = "No";
	}

	async navigateToHelpTicket(note){
		let response = await this.helpTickets.getHelpTicket(note.reference);
		if(!response.error){
			this.noteSelected = "helpTicket";
		} else {
			this.utils.showNotification("Help Ticket not found");
		}
		
	}
   
}