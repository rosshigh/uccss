import { inject } from 'aurelia-framework';
import { ValidationRules, ValidationControllerFactory, validationMessages } from 'aurelia-validation';
import { People } from '../../../resources/data/people';
import { is4ua } from '../../../resources/data/is4ua';
import { AppConfig } from '../../../appConfig';
import { Store } from '../../../store/store';
import { Utils } from '../../../resources/utils/utils';
import Validation from '../../../resources/utils/validation';

@inject(ValidationControllerFactory, People, is4ua, AppConfig, Store, Utils, Validation)
export class EditInstitutions {

    pageSize = 200;

    constructor(ValidationControllerFactory, people, is4ua, config, store, utils, validation) {
        this.controller = ValidationControllerFactory.createForCurrentScope();
        this.people = people;
        this.is4ua = is4ua;
        this.config = config;
        this.store = store;
        this.utils = utils;
        this.validation = validation;

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
        this.people.getInstitutionPeople(-1);
        this.createValidationRules();
        this.view = 'form';
    }

    async edit(institution) {
        this.selectedInstitutionId = institution._id;
        await this.people.getInstitution(institution._id);
        this.people.getInstitutionPeople('?filter=institutionId|eq|' + this.people.selectedInstitution._id);
        this.createValidationRules();
        this.view = 'form';
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
                    $("#fixErrors").modal();
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
            this.modalMessage = "Do you want to save the institution?";
            $("#objectChanged").modal()
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
}
