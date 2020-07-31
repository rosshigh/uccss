import { inject } from 'aurelia-framework';
import { ValidationRules, ValidationControllerFactory, validationMessages } from 'aurelia-validation';
import { DialogService } from 'aurelia-dialog';
import { ConfirmDialog } from '../../../resources/dialogs/confirm-dialog';
import { MessageDialog } from '../../../resources/dialogs/message-dialog';
import { SiteInfo } from '../../../resources/data/site';
import { AppConfig } from '../../../appConfig';
import { Store } from '../../../store/store';
import { Utils } from '../../../resources/utils/utils';

@inject(ValidationControllerFactory, SiteInfo, AppConfig, Store, Utils, DialogService)
export class EditInfo {

    pageSize = 200;
    defaultPhoneMask = "999-999-9999";

    constructor(ValidationControllerFactory, siteInfo, config, store, utils, dialogService) {
        this.controller = ValidationControllerFactory.createForCurrentScope();
        this.siteInfo = siteInfo;
        this.config = config;
        this.store = store;
        this.utils = utils;
        this.dialogService = dialogService;

        this.configParameters = this.store.getConfig();

        this.filters = [
            { value: '', keys: ['fullName', 'institutionId.name', 'email', 'roles'] },
            { value: this.config.ACTIVE_PERSON, keys: ['personStatus'] }
        ];

        this.validationErrors = [];

        this.view = 'table';
    }

    async activate() {
        let responses = await Promise.all([
            this.siteInfo.getObjectArray( '?order=createdDate')
        ]);
        this.filterOutExpired();
    }

    attached() {
        $('#filterField').focus();
        $('[data-toggle="tooltip"]').tooltip();
        $('.selectpicker').selectpicker();
        
    }

    async refresh() {
        this.clearFilters();
        await  this.siteInfo.getObjectArray( '?order=createdDate')
    }

    new() {
        this.siteInfo.selectInfo();
        this.refreshSelects();
        this.createValidationRules();
        this.view = 'form';
    }

    async edit(info) {
        this.selectedInfoId = info._id;
        await this.siteInfo.getobject(this.selectedInfoId);
        this.refreshSelects();
        this.createValidationRules();
        this.view = 'form';
    }

    // refreshSelects(){
    //     this.utils.refreshSelect("#editStatus", this.is4ua.personStatusArray, "code", this.people.selectedPerson.personStatus);
    //     this.utils.refreshSelect("#institutionSelect", this.people.institutionsArray, "_id", this.people.selectedPerson.institutionId);
    //     this.utils.refreshSelect("#specializationSelect", this.is4ua.specialArray, "code", this.people.selectedPerson.personSpecialization);
    //     this.utils.refreshSelect("#departmentSelect", this.is4ua.deptArray, "code", this.people.selectedPerson.departmentCategory);
    // }

    createValidationRules() {

        validationMessages['required'] = 'You must enter \${$displayName}.'
        ValidationRules
            .ensure('title').displayName('a Title').required()
            .ensure('content').displayName('a Content').required()
            .on(this.siteInfo.selectedObject);
    }

    // async save() {
    //     this.controller.validate()
    //         .then(result => {
    //             if (result.valid) {
    //                 this.savePerson();
    //             } else {
    //                 let message = 'You must fix the errors before you can save the system?';
    //                 let title = "Fix Errors";
    //                 let options = ['Ok'];
    //                 this.dialog.open({ viewModel: MessageDialog, model: { message, title, options }, lock: false }).whenClosed(response => {
    //                     return;
    //                 });
    //             }
    //         });
    // }

    // async savePerson() {
    //     this.localValidation()
    //     if (this.validationErrors.length === 0) {
    //         let serverResponse = await this.people.savePerson();
    //         if (!serverResponse.error) {
    //             this.utils.showNotification(serverResponse.firstName + " " + serverResponse.lastName + " was updated");
    //             this.refresh();
    //         } else {
    //             this.utils.showNotification("There was a problem saving the person", 'error');
    //         }
    //         this._cleanUp();
    //     } else {
    //         let message = 'You must fix the errors before you can save the system?';
    //         let title = "Fix Errors";
    //         let options = ['Ok'];
    //         this.dialog.open({ viewModel: MessageDialog, model: { message, title, options }, lock: false }).whenClosed(response => {
    //             return;
    //         });
    //     }
    // }

    // async delete() {
    //     let message = 'Are you sure you want to delete this person?';
    //     let title = "Confirm Delete";
    //     let options = {};
    //     this.dialog.open({ viewModel: ConfirmDialog, model: { message, title, options }, lock: false }).whenClosed(response => {
    //         if (!response.wasCancelled) {
    //             this.deletePersion();
    //         } else {
    //             this.goBack();
    //         }
    //     });


    // }

    // async deletePersion() {
    //     var name = this.people.selectedPerson.fullName;
    //     let serverResponse = await this.people.deletePerson();
    //     if (!serverResponse.error) {
    //         this.utils.showNotification(name + " was deleted");
    //         this.refresh();
    //     }
    //     this._cleanUp();
    // }

    // back() {
    //     if (this.people.isPersonDirty(this.people.selectedPerson).length) {
    //         let message = 'Do you want to save the system?';
    //         let title = "Save System";
    //         let options = {};
    //         this.dialog.open({ viewModel: ConfirmDialog, model: { message, title, options }, lock: false }).whenClosed(response => {
    //             if (!response.wasCancelled) {
    //                 this.save();
    //             } else {
    //                 this.goBack();
    //             }
    //         });
    //     } else {
    //         this.goBack();
    //     }
    // }

    // goBack() {
    //     this.view = 'table';
    // }

    // cancel() {
    //     this.people.selectedPersonById(this.people.selectedPerson._id);
    // }

    // downloadInstExcel() {
    //     let csvContent = "data:text/csv;charset=utf-8;,First Name,Last Name,Email,Phone,Institution,Country,Region,Status,Roles\r\n";
    //     this.dataTable.baseArray.forEach(item => {
    //         let isActive = item.personStatus == '01' ? 'Active' : 'Inactive';
    //         csvContent += item.firstName + ","
    //             + item.lastName.replace(',', ' ') + ","
    //             + item.email + ","
    //             + item.phone + ","
    //             + item.institutionId.name.replace(",", " ") + ","
    //             + item.country + ","
    //             + item.region + ","
    //             + isActive + ","
    //             + item.roles.join(":");
    //         csvContent += "\r\n";
    //     })
    //     var encodedUri = encodeURI(csvContent);
    //     var link = document.createElement("a");
    //     link.setAttribute("href", encodedUri);
    //     link.setAttribute("download", "people.csv");
    //     document.body.appendChild(link); // Required for FF

    //     link.click();
    // }

    // clearFilters() {
    //     this.filters[0].value = "";
    //     this.filters[1].value = this.config.ACTIVE_PERSON;
    //     $('#filterField').focus();
    // }

    // _cleanUp() {
    //     this.institutionId = "";
    //     this.clearFilters();
    //     // this.validation.makeAllValid(1);
    //     this.goBack();
    // }

    filterOutExpired() {
        // this._cleanUpFilters();
        if (this.isChecked) {
          this.dataTable.filterList(new Date(), { type: 'date', filter: "expiredFilter", collectionProperty: 'expiredDate', compare: 'after' });
        } else {
          this.dataTable.updateArray(this.siteinfo.siteArray);
        }
      }
    }