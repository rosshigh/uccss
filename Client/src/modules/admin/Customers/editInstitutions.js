import {inject} from 'aurelia-framework';
import {DataTable} from '../../../resources/utils/dataTable';
import {AppConfig} from '../../../config/appConfig';
import {Utils} from '../../../resources/utils/utils';
import {People} from '../../../resources/data/people';
import {is4ua} from '../../../resources/data/is4ua';
import {CommonDialogs} from '../../../resources/dialogs/common-dialogs';
import Validation from '../../../resources/utils/validation';
import $ from 'jquery';

@inject(DataTable, AppConfig, People, Utils, is4ua, CommonDialogs, Validation)
export class EditInstitutions {
    institutionSelected = false;
    spinnerHTML = "";

    tabs = [ {id: 'instAddress', title: 'Address'}, {id: 'instPeople', title: 'People'}, {id: 'instIs4ua', title: "IS4UA"}];
    tabPath = './';

    constructor(datatable, config, people, utils, is4ua, dialog, validation) {
        this.dataTable = datatable;
        this.dataTable.initialize(this);
        this.config = config;
        this.utils = utils;
        this.people = people;
        this.is4ua = is4ua;
        this.dialog = dialog;
        this.validation = validation;
        this._setupValidation();
        this.validation.initialize(this);

		this.userObj = JSON.parse(sessionStorage.getItem('user'));
    }

    attached(){
        $('[data-toggle="tooltip"]').tooltip();
    }

    async activate() {
        let responses = await Promise.all([
            this.people.getPeopleArray('?order=lastName'),
            this.people.getInstitutionsArray('?order=name'),
            this.is4ua.loadIs4ua()
        ]);

        this.dataTable.updateArray(this.people.institutionsArray);
    }

    async refresh(){
        this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
        await this.people.getInstitutionsArray('?order=name', true);
        this.dataTable.updateArray(this.people.institutionArray);
        this.spinnerHTML = "";
    }

    edit(index, el){
        this.editIndex = this.dataTable.getOriginalIndex(index);
        this.people.selectInstitution(this.editIndex);
        this.newInstitution = false;

        this.people.getInstitutionPeople('?filter=institutionId|eq|' + this.people.selectedInstitution._id, true);

        $("#editName").focus();

        if (this.selectedRow) this.selectedRow.children().removeClass('info');
        this.selectedRow = $(el.target).closest('tr');
        this.selectedRow.children().addClass('info')
        this.institutionSelected = true;
    }

    async new(){
        this.editIndex = -1;
        this.people.getInstitutionPeople(-1);
        this.people.selectInstitution();
        this.newInstitution = true;
        $("#editName").focus();
        this.institutionSelected = true;
    }

    async save() {
         if(this.validation.validate(1)){
            let serverResponse = await this.people.saveInstitution();
            if (!serverResponse.error) {
                this.dataTable.updateArray(this.people.institutionsArray);
                this.utils.showNotification(serverResponse.name + " was updated");
            } else {
                 this.utils.showNotification("There was a problem updating saving the institution");
            }
            this._cleanUp();
        } else {
            if(!this.people.selectedInstitution.institutionType || !this.people.selectedInstitution.memberType || !this.people.selectedInstitution.institutionStatus || !this.people.selectedInstitution.highestDegree){
                 return this.dialog.showMessage(
                    "The IS4UA fields on the IS4UA tab are required", 
                    "Missing Data", 
                    ['OK']
                    ).then(response => {
                        
                    });
            }
        }
    }

    delete(){
        return this.dialog.showMessage(
            "Are you sure you want to delete the institution?", 
            "Delete Institution", 
            ['Yes', 'No']
            ).whenClosed(response => {
                if(!response.wasCancelled){
                    this.deleteInstitution();    
                }
            });
    }

    async deleteInstitution(){
        var name = this.people.selectedInstitution.name;
        let serverResponse = await this.people.deleteInstitution();
        if (!serverResponse.error) {
                this.dataTable.updateArray(this.people.institutionsArray);
                this.utils.showNotification(name + " was deleted");
        } else {
             this.utils.showNotification("There was a problem deleting the user");
        }
        this._cleanUp();
    }

    cancel(){
         this.people.selectInstitution(this.editIndex);
    }

    back(){
         if(this.people.isInstitutionDirty().length){
            return this.dialog.showMessage(
                "The institution has been changed. Do you want to save your changes?", 
                "Save Changes", 
                ['Yes', 'No']
                ).whenClosed(response => {
                    if(!response.wasCancelled){
                        this.save();
                    } else {
                        this.institutionSelected = false;
                    }
                });
        } else {
             this.institutionSelected = false;
        }

    }

    _setupValidation(){
        this.validation.addRule(1,"editName",[{"rule":"required","message":"Name is required", "value": "people.selectedInstitution.name"}]);
        this.validation.addRule(1,"editInstitutionType",[{"rule":"required","message":"Institution type is required", "value": "people.selectedInstitution.institutionType"}]);
        this.validation.addRule(1,"editMemberType",[{"rule":"required","message":"Institution type is required", "value": "people.selectedInstitution.memberType"}]);
        this.validation.addRule(1,"editInstitutonStatusArray",[{"rule":"required","message":"Institution status is required", "value": "people.selectedInstitution.institutionStatus"}]);
        this.validation.addRule(1,"editHighestDegree",[{"rule":"required","message":"Institution type is required", "value": "people.selectedInstitution.highestDegree"}]);
    }

    _cleanUp(){
        this.newInstitution = false;
        this.institutionSelected = false;
        this._cleanUpFilters();
    }

    _clearFilters(){
        this._cleanUpFilters();
        this.dataTable.updateArray(this.people.institutionsArray);
    }

    _cleanUpFilters(){
        this.nameFilterValue = "";
        this.institutionTypeFilter = "";
        this.memberTypeFilter = "";
        this.highestDegreeFilter = "";

        $("#institutionStatus").val("");
    }

    async changeTab(el, index){
        $("#instFormListGroup.list-group").children().removeClass('active');
        $(el.target).parent().addClass('active');
        $(".in").removeClass('active').removeClass('in');
        $("#" + el.target.id + "Tab").addClass('in').addClass('active');
    }
}