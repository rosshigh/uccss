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
    subject = "";
    MESSAGE = "";
    spinnerHTML = "";
    email = new Object();
    roleFilterValue = new Array();
    roleExcludeFilterValue = new Array();

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
        this.initialLoaded = false;
    }

    async filterActive(){
        this._clearFilters();
        await this.people.getPeopleBulkEmailArray('?order=lastName&filter=personStatus|eq|' + this.activeFilterValue, true);
        this.dataTable.updateArray(this.people.peopleBulkEmailArray);
    }

    async attached() {
        $('[data-toggle="tooltip"]').tooltip();
        $('#loading').show();
        let responses = await Promise.all([
            this.people.getPeopleBulkEmailArray('?order=lastName&filter=personStatus|eq|01'),
            this.people.getInstitutionsArray('?order=name', true),
            this.is4ua.loadIs4ua(),
            this.config.getConfig()
        ]);
        this.activeFilterValue = "01";
        this.filteredArray = this.config.ROLES;
        this.dataTable.updateArray(this.people.peopleBulkEmailArray);

        this.roleSelect = new Array();
        this.config.ROLES.forEach(item => {
            this.roleSelect.push({code: item.role, description: item.role });
        });
        $('#loading').hide();
        this.institutionStatusValue = '01';
        this.dataTable.filterList(this.institutionStatusValue, { type: 'value',  filter: 'institutionStatusFilter',  collectionProperty: 'institutionId.institutionStatus', displayProperty: 'institutionId.institutionStatus', matchProperty:'', compare:'match'} );
        this.initialLoaded = true;
    }
    

    async refresh() {
        this._cleanUpFilters();
        // this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
        $('#loading').show();
        await this.people.getPeopleBulkEmailArray('?order=lastName&filter=personStatus|eq|01', true),
        this.dataTable.updateArray(this.people.peopleBulkEmailArray);
        // this.spinnerHTML = "";
        $('#loading').hide();
    }

	_clearFilters(){
        this.CustomerFilter = "";
		// this.activeFilterValue = "";
        this.roleFilterValue = new Array();
        this.roleExcludeFilterValue = new Array();
        this.institutionFilterValue = "";
        this.institutionStatusValue = "";
        this.institutionTypeFilter = "";
        this.memberTypeFilterValue = "";
        this.countryFilterValue = "";
        this.regionFilterValue = "";
        $(".filter-option-inner-inner").html('Nothing selected');
        this.dataTable.updateArray(this.people.peopleBulkEmailArray);
	}

    composeEmail(){
        this.email = {MESSAGE: "", INSTRUCTIONS: this.config.HELP_TICKET_INSTRUCTIONS, subject: ""} ;
        this.composeEmailPanel = true;
    }

    cancel(){
        this.composeEmailPanel = false;
        this.email = {MESSAGE: "", INSTRUCTIONS: this.config.HELP_TICKET_INSTRUCTIONS, subject: ""} ;
        // this.email.emailMessage = "";
        // this.email.subject = "";
    }

    sendBulkEmail(){
        if(this.email.MESSAGE === "" || this.email.subject === ""){
            this.utils.showNotification("Enter a subject and messsage",'warning');
            return;
        }
        if(this.dataTable.baseArray.length === 0){
            this.utils.showNotification("You must include some recipients",'warning');
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

    downloadInstExcel(){
        let csvContent = "data:text/csv;charset=utf-8;,First Name,FullName,Last Name,Email,Phone,City,Region,Country,Roles,Institution\r\n";
        this.dataTable.baseArray.forEach(item => {
          
            csvContent += item.firstName + "," + item.lastName.replace(',',' ') + "," + item.firstName + " " + item.lastName.replace(',',' ') + "," + item.email + "," + item.phone + "," + item.institutionId.city + "," + item.institutionId.region + "," + item.institutionId.country + "," + item.roles.join(':') + "," + item.institutionId.name ;
            csvContent +=  "\r\n";
        })
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "bulkEmail.csv");
        document.body.appendChild(link); // Required for FF

        link.click();
    }

    regionCustomFilter(value, item, context){
        if(item.institutionId && item.institutionId.region){
            return item.institutionId.region.toUpperCase().indexOf(value.toUpperCase()) > -1;
        }
        return false;
    }

    countryCustomFilter(value, item, context){
        if(item.institutionId && item.institutionId.country){
            return item.institutionId.country.toUpperCase().indexOf(value.toUpperCase()) > -1;
        }
        return false;
    }

    roleCustomFilter(value, item, context){
		var keep = false;
		if(item.roles && item.roles.length > 0 && value){
			for(let i = 0; i < item.roles.length; i++){
                for(let j = 0; j < value.length; j++) {
                    if(item.roles[i].toUpperCase().indexOf(value[j].toUpperCase()) > -1) keep = true;
                }
			}
		}
        return keep;
    }

    roleExcludeCustomFilter(value, item, context){
        var keep = true;
		if(item.roles && item.roles.length > 0 && value){
			for(let i = 0; i < item.roles.length; i++){
                for(let j = 0; j < value.length; j++) {
                    if(item.roles[i].toUpperCase().indexOf(value[j].toUpperCase()) > -1) keep = false;
                }
			}
		}
        return keep;
    }

    memberTypeCustomFilter(value, item, context){
        var keep = true;
		if(item.instiutionId.memberType && value && item.instiutionId.memberType.indexOf(valu)){
		
		}
        return keep;
    }

    customerCustomFilter(value, item, context){
        return item.fullName.toUpperCase().indexOf(value.toUpperCase()) > -1;
    }

    institutionCustomFilter(value, item, context){
        return item.institutionId && item.institutionId.name.toUpperCase().indexOf(value.toUpperCase()) > -1;
    }

    filterRoles(){
        this.dataTable.filterList(this.roleFilterValue, { type: 'custom',  filter: this.roleCustomFilter, compare:'custom'} )
    }

    excludeRoles(){
        this.dataTable.filterList(this.roleExcludeFilterValue, { type: 'custom',  filter: this.roleExcludeCustomFilter, compare:'custom'} )
    }
}
