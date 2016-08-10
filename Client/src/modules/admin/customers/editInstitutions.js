import {inject} from 'aurelia-framework';
import {DataTable} from '../../../resources/utils/dataTable';
import {AppConfig} from '../../../config/appConfig';
import {Utils} from '../../../resources/utils/utils';
import {People} from '../../../resources/data/people';
import {is4ua} from '../../../resources/data/is4ua';
import {ConfirmDialog} from '../../../resources/elements/confirm-dialog';
import Validation from '../../../resources/utils/validation';
import {DialogService} from 'aurelia-dialog';
import $ from 'jquery';

@inject(DataTable, AppConfig, People, Utils, is4ua, DialogService, Validation)
export class EditPeople {
    institutionSelected = false;
    navControl = "institutionsNavButtons";
    spinnerHTML = "";

    tabs = [ {id: 'instAddress', title: 'Address'}, {id: 'instPeople', title: 'People'}, {id: 'instIs4ua', title: "IS4UA"}];
    tabPath = './';
    //{id: 'instStatus', title: 'Status'},

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
    }

    attached(){
        $('[data-toggle="tooltip"]').tooltip();
    }

    async activate() {
        await this.getData();
    }

    async getData(){
      let responses = await Promise.all([
        this.people.getPeopleArray(true, '?order=lastName'),
        this.people.getInstitutionsArray(true, '?order=name'),
        this.is4ua.loadIs4ua()
      ]);

        this. updateArray();

        this.dataTable.createPageButtons(1);
    }

    async refresh(){
         this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
         await this.people.getInstitutionsArray(true, '?order=name');
         this. updateArray();
         this.spinnerHTML = "";
    }

    updateArray(){
        this.displayArray = this.people.institutionsArray;
        this.baseArray = this.displayArray;

        for (var i = 0; i < this.baseArray.length; i++) {
            this.baseArray[i].baseIndex = i;
        }
        this._cleanUpFilters();
    }

    edit(index, el){
        this.editIndex = this.displayArray[index + parseInt(this.dataTable.startRecord)].baseIndex;
        this.people.selectInstitution(this.editIndex);

        this.people.getInstitutionPeople(this.people.selectedInstitution._id);

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
        $("#editName").focus();
        this.institutionSelected = true;
    }

    async save() {
        if(this.validation.validate(1, this)){
            if(!this.people.selectedInstitution._id) this.editIndex = this.baseArray.length;
            let serverResponse = await this.people.saveInstitution();
            if (!serverResponse.status) {
                this. updateArray();
                this.utils.showNotification(serverResponse.name + " was updated", "", "", "", "", 5);
            }
            this.institutionSelected = false;
        } else {
            this.utils.showNotification("There are errors in the data you enetered. Please check your inputs.", "", "", "", "", 6);
        }
    }

    delete(){
        var cmd = {
            header : "Delete Institution",
            message : "Are you sure you want to delete the institution?",
            cancelButton : false,
            okButton : true
        };

        this.dialog.open({ viewModel: ConfirmDialog, model: cmd}).then(response => {
            if (!response.wasCancelled) {
                this.deleteInstitution();
            }
        });
    }

    async deleteInstitution(){
        var name = this.people.selectedInstitution.name;
        let serverResponse = await this.people.deleteInstitution();
        if (!serverResponse.error) {
                this.updateArray();
                this.utils.showNotification(name + " was deleted", "", "", "", "", 5);
        }
        this.institutionSelected = false;
    }

    cancel(){
         this.people.selectInstitution(this.editIndex);
    }

    back(){
         if(this.people.isInstitutionDirty().length){
            var cmd = {
                header : "Save Changes",
                message : "The institution has been changed. Do you want to save your changes?",
                cancelButton : false,
                okButton : true
            };

            this.dialog.open({ viewModel: ConfirmDialog, model: cmd}).then(response => {
                if (!response.wasCancelled) {
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
        this.validation.addRule(1,"editName",{"rule":"required","message":"Name is required", "value": "people.selectedInstitution.name"});
        this.validation.addRule(1,"editInstitutionType",{"rule":"required","message":"Institution type is required", "value": "people.selectedInstitution.institutionType"});
        this.validation.addRule(1,"editMemberType",{"rule":"required","message":"Institution type is required", "value": "people.selectedInstitution.memberType"});
        this.validation.addRule(1,"editInstitutonStatusArray",{"rule":"required","message":"Institution status is required", "value": "people.selectedInstitution.institutionStatus"});
        this.validation.addRule(1,"editHighestDegree",{"rule":"required","message":"Institution type is required", "value": "people.selectedInstitution.highestDegree"});
    }

    _cleanUpFilters(){
        $("#name").val("");
        $("#memberType").val("");
        $("#highestDegree").val("");
        $("#institutionStatus").val("");
    }

    async changeTab(el, index){
        $("#instFormListGroup.list-group").children().removeClass('active');
        $(el.target).parent().addClass('active');
        $(".in").removeClass('active').removeClass('in');
        $("#" + el.target.id + "Tab").addClass('in').addClass('active');
    }
}
