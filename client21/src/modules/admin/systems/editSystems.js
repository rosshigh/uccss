import { inject } from 'aurelia-framework';
import { ValidationRules, ValidationControllerFactory, validationMessages } from 'aurelia-validation';
import { Systems } from '../../../resources/data/systems';
import { Sessions } from '../../../resources/data/sessions';
import { AppConfig } from '../../../appConfig';
import { Store } from '../../../store/store';
import { Utils } from '../../../resources/utils/utils';

@inject(ValidationControllerFactory, Systems, Sessions, AppConfig, Store, Utils)
export class EditSystems {

    pageSize = 200;

    constructor(ValidationControllerFactory, systems, sessions, config, store, utils) {
        this.controller = ValidationControllerFactory.createForCurrentScope();
        this.systems = systems;
        this.sessions = sessions;
        this.config = config;
        this.store = store;
        this.utils = utils;


        this.filters = [
            { value: '', keys: ['sid', 'description'] },
            { value: true, keys: ['active'] }
        ];

        this.configParameters = this.store.getConfig();

        this.validationErrors = [];

        this.view = 'table';
    }

    async activate() {
        let responses = await Promise.all([
            this.systems.getSystemsArray('?order=sid'),
            this.sessions.getSessionParameters()
        ]);
    }

    attached() {
        $('#filterField').focus();
        $('[data-toggle="tooltip"]').tooltip();
        $('.selectpicker').selectpicker();
    }

    async refresh() {
        this.clearFilters();
        await this.systems.getSystemsArray('?order=sid')
    }

    new() {
        this.systems.selectSystem();
        this.createValidationRules();
        this.view = 'form';
    }

    async edit(system) {
        await this.systems.getSystem(system._id);
        this.createValidationRules();
        this.view = 'form';
    }

    createValidationRules() {

        validationMessages['required'] = 'You must enter \${$displayName}.'
        ValidationRules
            .ensure('sid').displayName('a SID').required()
            .ensure('description').displayName('a Description').required()
            .on(this.systems.selectedSystem);
    }

    async save() {
        this.controller.validate()
            .then(result => {
                if (result.valid) {
                    this.saveSystem();
                } else {
                    $("#fixErrors").modal();
                }
            });
    }

    async saveSystem() {
        let serverResponse = await this.systems.saveSystem();
        if (!serverResponse.error) {
            this.utils.showNotification("The system was updated");
            this.refresh();
        } else {
            this.utils.showNotification("There was a problem saving the system", 'error');
        }
        this._cleanUp();
    }

    async delete() {
        var name = this.systems.selectedSystem.sid;
        let serverResponse = await this.systems.deleteSystem();
        if (!serverResponse.error) {
            this.utils.showNotification(name + " was deleted");
            this.refresh();
        }
        this._cleanUp();
    }

    back() {
        if (this.systems.isSystemDirty().length) {
            this.modalMessage = "Do you want to save the system?"
            $("#objectChanged").modal()
        } else {
            this.goBack();
        }
    }

    goBack() {
        this.view = 'table';
    }

    cancel() {
        this.people.selectedSystemById(this.system.selectedSystem._id);
    }

    downloadInstExcel() {
        let csvContent = "data:text/csv;charset=utf-8;,First Name,Last Name,Email,Phone,Institution,Country,Region,Status,Roles\r\n";
        this.dataTable.baseArray.forEach(item => {
            let isActive = item.personStatus == '01' ? 'Active' : 'Inactive';
            csvContent += item.firstName + ","
                + item.lastName.replace(',', ' ') + ","
                + item.email + ","
                + item.phone + ","
                + item.institutionId.name.replace(",", " ") + ","
                + item.country + ","
                + item.region + ","
                + isActive + ","
                + item.roles.join(":");
            csvContent += "\r\n";
        })
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "people.csv");
        document.body.appendChild(link); // Required for FF

        link.click();
    }

    clearFilters() {
        this.filters[0].value = "";
        this.filters[1].value = true;
        $('#filterField').focus();
    }

    _cleanUp() {
        this.clearFilters();
        this.goBack();
    }

}
