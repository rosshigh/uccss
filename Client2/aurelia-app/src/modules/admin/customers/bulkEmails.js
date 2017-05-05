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
		$(this.institutionFilter).val('');
        $(this.institutionTypeFilter).val('');
        $(this.memberTypeFilter).val("");
        $(this.cityFilter).val("");
        $(this.regionFilter).val("");
        $(this.countryFilter).val("");
        this.activeFilterValue = "01";
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

    send(){
        var recipients = new Array();
        this.dataTable.baseArray.forEach(item => {
            recipients.push({name: item.fullName, email: item.email});
        });

        var email = {email: this.email, recipients: recipients};
        this.people.sendBuikEmail(email);
    }
}