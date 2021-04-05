import { inject } from 'aurelia-framework';
import { ValidationRules, ValidationControllerFactory, validationMessages } from 'aurelia-validation';
import { People } from '../../../resources/data/people';
import { is4ua } from '../../../resources/data/is4ua';
import { AppConfig } from '../../../appConfig';
import { Utils } from '../../../resources/utils/utils';

@inject(ValidationControllerFactory, People, is4ua, AppConfig, Utils)
export class EditInstitutions {

    pageSize = 200;

    constructor(ValidationControllerFactory, people, is4ua, config, utils) {
        this.controller = ValidationControllerFactory.createForCurrentScope();
        this.people = people;
        this.is4ua = is4ua;
        this.config = config;
        this.utils = utils;

        this.filters = [
            { value: '', keys: ['name', 'country', 'region'] },
            { value: '', keys: ['institutionType'] },
            { value: '', keys: ['institutionStatus'] }

        ];

        this.view = 'table';
    }

    async activate() {
        $("#loading").show();
        let responses = await Promise.all([
            this.people.getInstitutionArray('?order=name'),
            this.is4ua.loadIs4ua()
        ]);
        $("#loading").hide();
        this.timeZones = this.store.getter('')
    }

    attached() {
        $("#loading").hide();
        $('#filterField').focus();
        $('[data-toggle="tooltip"]').tooltip();
        $('.selectpicker').selectpicker();
    }

    async refresh() {
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

    refreshSelects() {
        this.utils.refreshSelect("#editInstitutonStatusArray", this.is4ua.institutonStatusArray, "code", this.people.selectedInstitution.institutionStatus);
        this.utils.refreshSelect("#editInstitutionType", this.is4ua.institutionTypes, "code", this.people.selectedInstitution.institutionType);
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
                  $("#fixErrorsModal").modal('show');
                }
            });
    }

    async saveInstitution() {
        let serverResponse = await this.people.saveInstitution();
        if (!serverResponse.error) {
            this.utils.updateArrayItem(serverResponse, this.people.institutionsArray);
            this.utils.showNotification(serverResponse.name + " was updated");
            this.refresh();
        } else {
            this.utils.showNotification("There was a problem saving the institution", 'error');
        }
        this._cleanUp();
    }

    async deleteInstitution() {
        this.modalMessage="Are you sure you want to delete that instititution?"
        $("#confirmDeleteModal").modal('show');
    }

    async delete() {
        let name = this.people.selectedInstitution.name;
        let serverResponse = await this.people.deleteInstitution();
        if (!serverResponse.error) {
            this.utils.showNotification(name + " was deleted");
            this.refresh();
        }
        this._cleanUp();
    }

    back() {
        if (this.people.isInstitutionDirty(this.people.selectedInstitution).length) {
            this.modalMessage = 'Do you want to save the institution?';
            $("#confirmSaveModal").modal('show');
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

