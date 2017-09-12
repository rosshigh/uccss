import { inject } from 'aurelia-framework';
import { DataTable } from '../../../resources/utils/dataTable';
import { AppConfig } from '../../../config/appConfig';
import { Utils } from '../../../resources/utils/utils';
import { People } from '../../../resources/data/people';
import { is4ua } from '../../../resources/data/is4ua';
import { CommonDialogs } from '../../../resources/dialogs/common-dialogs';
import Validation from '../../../resources/utils/validation';
import $ from 'jquery';

@inject(DataTable, AppConfig, People, Utils, is4ua, CommonDialogs, Validation)
export class BulkEmails {
    composeEmailPanel = false;
    emailSubject = "";
    emailMessage = "";
    spinnerHTML = "";
    email = new Object();

    toolbar = [
		['style', ['style', 'bold', 'italic', 'underline','clear']],
		['color', ['color']],
		['font', ['strikethrough', 'superscript', 'subscript']],
		['layout', ['ul', 'ol', 'paragraph']],
		['insert', [ 'link', 'table', 'hello']],
		['misc', ['undo', 'redo', 'fullscreen', 'codeview']]
	];
    
    constructor(datatable, config, people, utils, is4ua, dialog, validation) {
        this.dataTable = datatable;
        this.dataTable.initialize(this);
        this.config = config;
        this.utils = utils;
        this.people = people;
        this.is4ua = is4ua;
        this.dialog = dialog;
        this.validation = validation;
        this.validation.initialize(this);

        this.userObj = JSON.parse(sessionStorage.getItem('user'));
    }

    async activate() {
        let responses = await Promise.all([
            this.people. getPeopleBulkEmailArray('?order=lastName&filter=personStatus|eq|01'),
            this.people.getInstitutionsArray('?order=name', true),
            this.is4ua.loadIs4ua(),
            this.config.getConfig()
        ]);
        this.activeFilterValue = "01";
        this.filteredArray = this.config.ROLES;
        this.dataTable.updateArray(this.people.peopleBulkEmailArray);
    }

    async filterActive(){
        this._clearFilters();
        await this.people.getPeopleBulkEmailArray('?order=lastName&filter=personStatus|eq|' + this.activeFilterValue, true);
        this.dataTable.updateArray(this.people.peopleBulkEmailArray);
    }

    attached() {
        $('[data-toggle="tooltip"]').tooltip();
        // this._setupValidation();
    }

    async refresh() {
        this._cleanUpFilters();
        this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
        await this.people.getPeopleBulkEmailArray('?order=lastName&filter=personStatus|eq|01', true),
        this.dataTable.updateArray(this.people.peopleBulkEmailArray);
        this.spinnerHTML = "";
    }

	_clearFilters(){
		this.institutionFilter = "";
        this.institutionTypeFilter = "";
        this.memberTypeFilter = "";
        this.cityFilter = "";
        this.regionFilter = "";
        this.countryFilter = "";
        this.roleFilterValue = "";
        // this.activeFilterValue = "01";
        this.dataTable.updateArray(this.people.peopleBulkEmailArray);
        // this.filterActive();
	}

    composeEmail(){
        this.composeEmailPanel = true;
    }

    cancel(){
        this.composeEmailPanel = false;
        this.email.emailMessage = "";
        this.email.subject = "";
    }

    sendBulkEmail(){
        if(this.email.emailMessage === "" || this.email.subject === ""){
            this.utils.showNotification("Enter a subject and messsage");
            return;
        }
        if(this.dataTable.baseArray.length === 0){
            this.utils.showNotification("You must include some recipients");
            return;
        }
        return this.dialog.showMessage(
            "Are you sure you want to send the email to these recipients?",
            "Confirm Send",
            ['Yes', 'No']
        ).whenClosed(response => {                      
            if (response.wasCancelled) {
                okToProcess = false;
            } else {
                this.sendTheBulkEmail();
            }
        });
    }

    sendTheBulkEmail(){
        var recipients = new Array();
        this.dataTable.baseArray.forEach(item => {
            recipients.push({name: item.fullName, email: item.email});
        });

        var email = {email: this.email, recipients: recipients}; 
        this.people.sendBuikEmail(email);
        this.utils.showNotification("Message sent");
    }


    // send(){
    //     var recipients = new Array();
    //     this.dataTable.baseArray.forEach(item => {
    //         recipients.push({name: item.fullName, email: item.email});
    //     });

    //     var email = {email.email: this.config.UCC_EMAIL, recipients: recipients}; 
    //     this.people.sendBuikEmail(email);
    // }

    // institutionCustomFilter(value, item, context){
    //     for(let i = 0; i < context.people.institutionsArray.length; i++){
    //         if(item.institutionId._id == context.people.institutionsArray[i]._id) {
    //             return context.people.institutionsArray[i].name.toUpperCase().indexOf(value.toUpperCase()) > -1;
    //         }
    //     }
    //     return false;
    // }

    regionCustomFilter(value, item, context){
        for(let i = 0; i < context.people.institutionsArray.length; i++){
            if(item.institutionId._id == context.people.institutionsArray[i]._id) {
                return context.people.institutionsArray[i].region.toUpperCase().indexOf(value.toUpperCase()) > -1;
            }
        }
        return false;
    }

    cityCustomFilter(value, item, context){
        for(let i = 0; i < context.people.institutionsArray.length; i++){
            if(item.institutionId._id == context.people.institutionsArray[i]._id) {
                return context.people.institutionsArray[i].city.toUpperCase().indexOf(value.toUpperCase()) > -1;
            }
        }
        return false;
    }

    countryCustomFilter(value, item, context){
        for(let i = 0; i < context.people.institutionsArray.length; i++){
            if(item.institutionId._id == context.people.institutionsArray[i]._id) {
                return context.people.institutionsArray[i].country.toUpperCase().indexOf(value.toUpperCase()) > -1;
            }
        }
        return false;
    }

    roleCustomFilter(value, item, context){
		var keep = false;
		if(item.roles && item.roles.length > 0){
			for(let i = 0; i < item.roles.length; i++){
				if(item.roles[i].toUpperCase().indexOf(value.toUpperCase()) > -1) keep = true;
			}
		}
        return keep;
    }


    customerCustomFilter(value, item, context){
        return item.fullName.toUpperCase().indexOf(value.toUpperCase()) > -1;
    }

    institutionCustomFilter(value, item, context){
        return item.institutionId && item.institutionId.name.toUpperCase().indexOf(value.toUpperCase()) > -1;
    }
}