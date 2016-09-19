import {inject} from 'aurelia-framework';

import {DialogService} from 'aurelia-dialog';

import {DataTable} from '../../resources/utils/dataTable';
import {AppConfig} from '../../config/appConfig';
import {Utils} from '../../resources/utils/utils';
import {People} from '../../resources/data/people';
import {is4ua} from '../../resources/data/is4ua';
import {AppState} from '../../resources/data/appState';
import {ConfirmDialog} from '../../resources/elements/confirm-dialog';

import $ from 'jquery';

@inject(DataTable, AppConfig, People, Utils, is4ua, AppState, DialogService)
export class EditPeople {
    personSelected = false;
    navControl = "peopleNavButtons";
    spinnerHTML="";

    constructor(datatable, config, people, utils, is4ua, app, dialog) {
        this.dataTable = datatable;
        this.dataTable.initialize(this);
        this.config = config;
        this.utils = utils;
        this.people = people;
        this.is4ua = is4ua;
        this.app = app;
        this.dialog = dialog;
    }

    attached(){
        $('[data-toggle="tooltip"]').tooltip();
    }

    async activate() {
        await this.getData();
    }

    async getData (){ 
      let responses = await Promise.all([
        this.people.getPeopleArray(true, '?filter=institutionId|eq|' + this.app.user.institutionId + '&order=lastName'),
        this.is4ua.loadIs4ua(),
      ]);
        // this.people.getInstitutionPeople(this.app.user.institutionId);

        this. updateArray();

        this.dataTable.createPageButtons(1);
    }

    async refresh(){
        this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
        await tthis.people.getPeopleArray(true, '?order=lastName');
        this.people. getInstitutionPeople(this.app.user.institutionId);
        this. updateArray();
        this.spinnerHTML = "";
    }

    edit(index, el){
        this.editIndex = this.displayArray[index + parseInt(this.dataTable.startRecord)].baseIndex;
        this.people.selectPerson(this.editIndex);
        this.roles = "";
        for (var i = 0; i < this.config.ROLES.length; i++) {
            if(this.people.selectedPerson.roles.indexOf(this.config.ROLES[i].role) > -1){
                this.roles += this.config.ROLES[i].label + "<br/>";
            }
        }

        $("#editFirstName").focus();

        if (this.selectedRow) this.selectedRow.children().removeClass('info');
        this.selectedRow = $(el.target).closest('tr');
        this.selectedRow.children().addClass('info')
        this.personSelected = true;
    }

    async save() {
        if(this.people.selectedPerson._id) this.editIndex = this.baseArray.length;
        let serverResponse = await this.people.savePerson();
        if (!serverResponse.status) {
            this. updateArray();
            this.utils.showNotification(serverResponse.firstName +  " " + serverResponse.lastName + " was updated", "", "", "", "", 5);
        }
        this.personSelected = false;
    }

    updateArray(){
        this.displayArray = this.people.peopleArray;
        this.baseArray = this.displayArray;

        for (var i = 0; i < this.baseArray.length; i++) {
            this.baseArray[i].baseIndex = i;
        }
        this. _cleanUpFilters();
    }

    cancel(){
         this.people.selectPerson(this.editIndex);
    }

    back(){
         if(this.people.isPersonDirty().length){
            var cmd = {
                header : "Save Changes",
                message : "The account has been changed. Do you want to save your changes?",
                cancelButton : false,
                okButton : true
            };

            this.dialog.open({ viewModel: ConfirmDialog, model: cmd}).then(response => {
                if (!response.wasCancelled) {
                   this.save();
                } else {
                     this.personSelected = false;
                }
            });

        } else {
             this.personSelected = false;
        }

    }

    _cleanUpFilters(){
        $("#lastName").val("");
        $("#roles").val("");
        $("#personStatus").val("");
    }

    get Name(){
        return this.people.selectedPerson ? (this.people.selectedPerson.firstName + " " + (this.people.selectedPerson.middleName ?  this.people.selectedPerson.middleName + " " : "") + this.people.selectedPerson.lastName) : "" ;
    }
}
