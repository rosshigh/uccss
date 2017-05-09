import {inject} from 'aurelia-framework';
import {DataTable} from '../../resources/utils/dataTable';
import {AppConfig} from '../../config/appConfig';
import {Utils} from '../../resources/utils/utils';
import {People} from '../../resources/data/people';
import {is4ua} from '../../resources/data/is4ua';
import {CommonDialogs} from '../../resources/dialogs/common-dialogs';


@inject(DataTable, AppConfig, People, Utils, is4ua, CommonDialogs)
export class EditPeople {
   
    spinnerHTML="";


    constructor(dataTable, config, people, utils, is4ua, dialog) {
        this.dataTable = dataTable;
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
            this.is4ua.loadIs4ua(),
           this.config.getConfig()
        ]);
        this.pageSize = this.config.defaultPageSize;
        this.dataTable.updateArray(this.people.instutionPeopleArray);
    }

    async refresh(){
        this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
        await this.people.getInstitutionPeople('?filter=institutionId|eq|' + this.userObj.institutionId + '&order=lastName', true);
        this.dataTable.updateArray(this.people.instutionPeopleArray);
        this.spinnerHTML = "";
    }

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

   customRoleFilter(value, item){
    var value = value.toUpperCase();
    for(let i = 0; i < item.roles.length; i++){
      if(item.roles[i].indexOf(value) > -1) return true;
    }
    return false;
   }

   customStatusFilter(value, item){
    var value = value.toUpperCase();
    for(let i = 0; i < item.roles.length; i++){
      if(item.roles[i].indexOf(value) > -1) return true;
    }
    return false;
   }

  }
