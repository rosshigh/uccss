import {inject} from 'aurelia-framework';
import {DataTable} from '../../resources/utils/dataTable';
import {AppConfig} from '../../config/appConfig';
import {Utils} from '../../resources/utils/utils';
import {People} from '../../resources/data/people';
import {is4ua} from '../../resources/data/is4ua';
import {CommonDialogs} from '../../resources/dialogs/common-dialogs';

import $ from 'jquery';

@inject(DataTable, AppConfig, People, Utils, is4ua, CommonDialogs)
export class EditPeople {
    personSelected = false;
    navControl = "peopleNavButtons";
    spinnerHTML="";

    constructor(datatable, config, people, utils, is4ua, dialog) {
        this.dataTable = datatable;
        this.dataTable.initialize(this);
        this.config = config;
        this.utils = utils;
        this.people = people;
        this.is4ua = is4ua;
        this.dialog = dialog;
    }

    attached(){
        $('[data-toggle="tooltip"]').tooltip();
    }

    canActivate(){
        this.userObj = JSON.parse(sessionStorage.getItem('user'));
    }

    async activate() {
        let responses = await Promise.all([
            this.people.getInstitutionPeople('?filter=institutionId|eq|' + this.userObj.institutionId + '&order=lastName', true),
            this.is4ua.loadIs4ua()
        ]);

        this.dataTable.updateArray(this.people.instutionPeopleArray);

        this.dataTable.createPageButtons(1);
    }

    async refresh(){
        this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
        await this.people.getInstitutionPeople('?filter=institutionId|eq|' + this.userObj.institutionId + '&order=lastName', true);
        this.dataTable.updateArray(this.people.instutionPeopleArray);
        this.spinnerHTML = "";
    }

    // edit(index, el){
    //     this.editIndex = this.dataTable.getOriginalIndex(index);
    //     this.people.selectPerson(this.editIndex,'i');
    //     this.roles = "";
    //     for (var i = 0; i < this.config.ROLES.length; i++) {
    //         if(this.people.selectedPerson.roles.indexOf(this.config.ROLES[i].role) > -1){
    //             this.roles += this.config.ROLES[i].label + "<br/>";
    //         }
    //     }

    //     $("#editFirstName").focus();

    //     if (this.selectedRow) this.selectedRow.children().removeClass('info');
    //     this.selectedRow = $(el.target).closest('tr');
    //     this.selectedRow.children().addClass('info')
    //     this.personSelected = true;
    // }

    buildAudit(){
        var changes = this.people.isPersonDirty(this.originalPerson);
        changes.forEach(item => {
            this.people.selectedPerson.audit.push({
                property: item.property,
                eventDate: new Date(),
                oldValue: item.oldValue,
                newValue: item.newValue,
                personId: this.userObj._id
            })
        });
    }

    async save() {
        this.buildAudit();
        let serverResponse = await this.people.savePerson();
        if (!serverResponse.error) {
            if(this.people.selectedPerson.personStatus === '01') this.sendActivateEmail()
            this.people.instutionPeopleArray[this.people.editIndex] = this.utils.copyObject(this.people.selectedPerson);
            this.dataTable.updateArray(this.people.instutionPeopleArray);
            this.utils.showNotification(serverResponse.firstName +  " " + serverResponse.lastName + " was updated");
        }
        this.personSelected = false;
    }

    sendActivateEmail(){
        var email = {
            email: this.people.selectedPerson.email,
            name: this.people.selectedPerson.firstName
        }
        this.people.activateAccountEmail(email)
    }

    updateStatus(person){
        this.people.selectedPersonFromId(person._id, 'i');
        this.originalPerson = this.utils.copyObject(this.people.selectedPerson);
        if(this.people.selectedPerson.personStatus === '01'){
            this.people.selectedPerson.personStatus = '02';
        } else {
            this.people.selectedPerson.personStatus = '01';
        }
        this.save();
    }

    cancel(){
         this.people.selectPerson(this.editIndex);
    }

    back(){
         if(this.people.isPersonDirty().length){
            return this.dialog.showMessage(
                "The account has been changed. Do you want to save your changes?", 
                "Save Changes", 
                ['Yes', 'No']
                ).then(response => {
                    if(!response.wasCancelled){
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
}
