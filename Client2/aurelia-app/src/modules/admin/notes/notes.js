import {inject} from 'aurelia-framework';
import { Router } from "aurelia-router";
import {DataTable} from '../../../resources/utils/dataTable';
import {AppConfig} from '../../../config/appConfig';
import {People} from '../../../resources/data/people';
import {Utils} from '../../../resources/utils/utils';
import {HelpTickets} from '../../../resources/data/helpTickets';
import Flatpickr from 'flatpickr';
import moment from 'moment';

@inject(Router, DataTable, AppConfig, People, Utils, HelpTickets)
export class Notes{
	noteSelected = "No";
	showCategoryForm = false;
	showDates = true;
	spinnerHTML = "";
	navControl = "notesNavButtons";
	days = [{number: 0, day: "Sunday"},{number: 1, day: "Monday"},{number: 2, day: "uesday"},{number: 3, day: "Wednesday"},{number: 4, day: "Thursday"},{number: 5, day: "Friday"},{number: 6, day: "Saturday"}];
    
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
		let configT = {
			dateFormat: 'F j, Y h:i K',
			enableTime: true
		};
		let config = {

		}
    	// this.dateRemindPicker = new Flatpickr(this.dateRemind, config);
		// this.dateRemindTPicker = new Flatpickr(this.dateRemindT, configT);
		// this.dateEndRemindPicker = new Flatpickr(this.dateEndRemind, config);
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
		// let d1 = new Date(this.people.selectedNote.dateRemind)
		// let d2 = new Date(this.people.selectedNote.dateRemind)
		// let d3 = new Date(this.people.selectedNote.dateEndRemind)
		// this.dateRemindPicker.setDate(d2);
		// this.dateRemindTPicker.setDate(d2);
		// this.dateEndRemindPicker.setDate(d3);
		// this.people.selectedNote.dateRemind = new Date(d.getTime() ? d.valueOf() : d);
        //Reset the selected row
        if (this.selectedRow) this.selectedRow.children().removeClass('info');
        this.selectedRow = $(el.target).closest('tr');
        this.selectedRow.children().addClass('info')
        this.noteSelected = 'Yes';
	}

	// buildNote(){
	// 	this.people.selectedNote.dateRemind = moment(this.people.selectedNote.dateRemind );
	// 	this.people.selectedNote.dateRemind = new Date(this.people.selectedNote.dateRemind);
	// }

	async save(){
		// this.buildNote();
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

	openReminderForm(){
		this.people.selectedNote.reminderType = "T";
		this.people.selectedNote.dateRemind = new Date();	
		this.people.selectedNote.dateEndRemind = new Date();
	}
   
   typeSelected(){
	   this.showDates = true;
	   switch($(this.reminderType).val()){
		   	case "W":
				this.days = [{number: 0, day: "Sunday"},{number: 1, day: "Monday"},{number: 2, day: "Tuesday"},{number: 3, day: "Wednesday"},{number: 4, day: "Thursday"},{number: 5, day: "Friday"},{number: 6, day: "Saturday"}];
				break;
			case "M":
				this.days = new Array();
				for(let i = 1; i < 31; i++){
					this.days.push({number: i, day: i});
				}
				break;
			case "D":
				break;
			case "T":
				this.people.selectedNote.reminderType = "T";
				this.people.selectedNote.dateRemind = new Date();	
				this.people.selectedNote.dateEndRemind = new Date();	
			default:
				 this.showDates = true;
	   }
   }
}