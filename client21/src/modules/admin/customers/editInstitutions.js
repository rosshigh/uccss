import { inject } from 'aurelia-framework';
import { ValidationRules, ValidationControllerFactory, validationMessages } from 'aurelia-validation';
import { DialogService } from 'aurelia-dialog';
import { ConfirmDialog } from '../../../resources/dialogs/confirm-dialog';
import { MessageDialog } from '../../../resources/dialogs/message-dialog';
import { People } from '../../../resources/data/people';
import { is4ua } from '../../../resources/data/is4ua';
import { AppConfig } from '../../../appConfig';
import { Store } from '../../../store/store';
import { Utils } from '../../../resources/utils/utils';

@inject(ValidationControllerFactory, People, is4ua, AppConfig, Store, Utils, DialogService)
export class EditInstitutions {

    pageSize = 200;

    constructor(ValidationControllerFactory, people, is4ua, config, store, utils, dialogService) {
        this.controller = ValidationControllerFactory.createForCurrentScope();
        this.people = people;
        this.is4ua = is4ua;
        this.config = config;
        this.store = store;
        this.utils = utils;
        this.dialogService = dialogService;

        this.configParameters = this.store.getConfig();

        this.filters = [
            { value: '', keys: ['name', 'country', 'region'] },
            { value: '', keys: ['institutionType'] },
            { value: '', keys: ['institutionStatus'] }

        ];

        this.view = 'table';
    }

    async activate() {
        let responses = await Promise.all([
            this.people.getInstitutionArray('?order=name'),
            this.is4ua.loadIs4ua()
        ]);

        this.timeZones = this.store.getter('')
    }

    attached() {
        $('#filterField').focus();
        $('[data-toggle="tooltip"]').tooltip();
        $('.selectpicker').selectpicker();
    }

    async refresh() {
        this.clearFilters();
        $('#loading').show();
        await this.people.getInstitutionArray('?order=lastName');
        $('#loading').hide();
    }

    new() {
        this.people.selectInstitution();
        this.refreshSelects();
        this.people.getInstitutionPeople(-1);
        this.createValidationRules();
        this.view = 'form';
    }

    async edit(institution) {
        this.selectedInstitutionId = institution._id;
        await this.people.getInstitution(institution._id);
        this.refreshSelects();
        this.people.getInstitutionPeople('?filter=institutionId|eq|' + this.people.selectedInstitution._id);
        this.createValidationRules();
        this.view = 'form';
    }

    refreshSelects(){
        this.utils.refreshSelect("#editInstitutonStatusArray", this.is4ua.institutonStatusArray, "code", this.people.selectedInstitution.institutionStatus);
        this.utils.refreshSelect("#editInstitutionType", this.is4ua.institutionTypes, "code", this.people.selectedInstitution.institutionType );
    }

    createValidationRules() {

        validationMessages['required'] = 'You must enter \${$displayName}.'
        ValidationRules
            .ensure('name').displayName('a name').required()
            .ensure('institutionType').displayName('an institution type').required()
            .ensure('country').displayName('a country').required()
            .ensure('institutionStatus').displayName('an Status').required()
            .on(this.people.selectedInstitution);
    }

    async save() {
        this.controller.validate()
            .then(result => {
                if (result.valid) {
                    this.saveInstitution();
                } else {
                    let message = 'You must fix the errors before you can save the system?';
                    let title = "Fix Errors";
                    let options = ['Ok'];
                    this.dialog.open({ viewModel: MessageDialog, model: { message, title, options }, lock: false }).whenClosed(response => {
                        return;
                    });
                }
            });
    }

    async saveInstitution() {
        let serverResponse = await this.people.saveInstitution();
        if (!serverResponse.error) {
            this.utils.showNotification(serverResponse.name + " was updated");
            this.refresh();
        } else {
            this.utils.showNotification("There was a problem saving the institution", 'error');
        }
        this._cleanUp();
    }

    async delete() {
        let message = 'Are you sure you want to delete the institution?';
        let title = "Confirm Delete";
        let options = {};
        this.dialog.open({ viewModel: ConfirmDialog, model: { message, title, options }, lock: false }).whenClosed(response => {
            if (!response.wasCancelled) {
                this.deleteInstitution();
            } else {
                this.goBack();
            }
        });
    }

    async deleteInstitution(){
        var name = this.people.selectedPerson.fullName;
        let serverResponse = await this.people.deletePerson();
        if (!serverResponse.error) {
            this.utils.showNotification(name + " was deleted");
            this.refresh();
        }
        this._cleanUp();
    }

    back() {
        if (this.people.isInstitutionDirty(this.people.selectedInstitution).length) {
            let message = 'Do you want to save the institution?';
            let title = "Save Instituion";
            let options = {};
            this.dialog.open({ viewModel: ConfirmDialog, model: { message, title, options }, lock: false }).whenClosed(response => {
                if (!response.wasCancelled) {
                    this.save();
                } else {
                    this.goBack();
                }
            });
        } else {
            this.goBack();
        }
    }

    goBack() {
        this.view = 'table';
    }

    cancel() {
        this.people.selectInstitutionByID(this.selectedInstitutionId);
    }

    downloadInstExcel() {
        let csvContent = "data:text/csv;charset=utf-8;,Name,City,State,Country,Type,Status\r\n";
        this.dataTable.baseArray.forEach(item => {
            csvContent += item.name + "," + item.city + "," + item.region + "," + item.country + "," + item.institutionType + "," + item.institutionStatus;
            csvContent += "\r\n";
        })
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "institutions.csv");
        document.body.appendChild(link); // Required for FF

        link.click();
    }

    clearFilters() {
        this.filters[0].value = "";
        this.filters[1].value = "";
        this.filters[2].value = "";
        $('#filterField').focus();
    }

    _cleanUp() {
        this.clearFilters();
        this.goBack();
    }

    copyEmail(person) {
        const el = document.createElement('textarea');
        el.value = person.email;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }
}
