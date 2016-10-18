import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";
import {CommonDialogs} from '../../../resources/dialogs/common-dialogs';
import {Utils} from '../../../resources/utils/utils';
import {Systems} from '../../../resources/data/systems';
import {Sessions} from '../../../resources/data/sessions';
import {Products} from '../../../resources/data/products';
import Validation from '../../../resources/utils/validation';
import {DataTable} from '../../../resources/utils/dataTable2';
import {AppConfig} from '../../../config/appConfig';

import moment from 'moment';
import $ from 'jquery';

@inject(Router, Systems, Products, Validation, Utils, DataTable, AppConfig, CommonDialogs, Sessions)
export class EditSystem {
    systemSelected = false;
    navControl = "systemNavButtons";
    columnspan = 5;
    spinnerHTML = "";

    constructor(router, systems, products, validation, utils, datatable, config, dialog, sessions) {
        this.router = router;
        this.systems = systems;
        this.products = products;
        this.utils = utils;
        this.validation = validation;
        this.dataTable = datatable;
        this.dataTable.initialize(this);
        this.config = config;
        this.dialog = dialog;
        this.sessions = sessions;
        this._setupValidation();
    }

    attached(){
        $('[data-toggle="tooltip"]').tooltip();
    }

    async activate() {
        let responses = await Promise.all([
            this.systems.getSystemsArray(true,'?order=sid'),
            this.products.getProductsArray(),
            this.sessions.getSessionsArray()
        ]);
        this.dataTable.updateArray(this.systems.systemsArray);
        this.dataTable.createPageButtons(1);
    }

    async refresh() {
        this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
        await this.systems.getSystemsArray(true, '?order=sid');
         this.dataTable.updateArray(this.systems.systemsArray);
        this.spinnerHTML = "";
    }

    // updateArray(){
    //     this.displayArray = this.systems.systemsArray;
    //     this.baseArray = this.displayArray;
    //     for (var i = 0; i < this.baseArray.length; i++) {
    //         this.baseArray[i].baseIndex = i;
    //     }
    //     this._cleanUpFilters()
    // }

    new() {
        this.editIndex = -1;
        this.displayIndex = -1;
        this.systems.selectSystem();
        this.editStatus = true;
        this.saveClients = false;
        $("#editSid").focus();
        this.systemSelected = true;
    }

    edit(index, el) {
         this.editIndex = this.dataTable.getOriginalIndex(index);
        this.systems.selectSystem(this.editIndex);
        this.saveClients = false;
        this.editSystem = true;
        this.systemSelected = true;
        $("#editSid").focus();

        if (this.selectedRow) this.selectedRow.children().removeClass('info');
        this.selectedRow = $(el.target).closest('tr');
        this.selectedRow.children().addClass('info')
        this.showTable = false;
    }

    generateClients() {
        if(this.editFirstClient.length != 3 || this.editLastClient.length != 3){
            return this.dialog.showMessage(
                "Clients must have three digits", 
                "Invalid Client Number", 
                ['OK']
                ).then(response => {
                    return;
                });
        }
        var start = parseInt(this.editFirstClient);
        var end = parseInt(this.editLastClient);
        if(end <= start){
             return this.dialog.showMessage(
                "The first client number must be less than the last client number.", 
                "Invalid Client Number", 
                ['OK']
                ).then(response => {
                    return;
                });
        }
        var result = this.systems.generateClients(start, end, this.editClientStatus);
        this.saveClients = true;
        if (result.error) {
            this.utils.showNotification(result.error);
        }
    }

    refreshClients() {
        return this.dialog.showMessage(
            "This will return clients to an initial state.  You must save the system for this to take effect.", 
            "Refresh Clients", 
            ['Yes', 'No']
            ).then(response => {
                if(!response.wasCancelled){
                    this.saveClients = true;
                    this.systems.refreshClients(this.config.UNASSIGNED_REQUEST_CODE);    
                }
            });
    }

    async deleteClients() {
        return this.dialog.showMessage(
            "Are you sure about this, this action cannot be undone?", 
            "Delete Clients", 
            ['Yes', 'No']
            ).then(response => {
                if (!response.wasCancelled) {
                    this.deleteAllClients();
                }
            });
    }
    
    async deleteAllClients(){
        let serverResponse = await this.systems.deleteAllClients();
        if (!serverResponse.error) {
            this.utils.showNotification("The clients were successfully deleted");
            this.dataTable.sourceArray[this.editIndex].clients = [];
        }
    }

    editAClient(client, index, el) {
        this.selectedClientIndex = index;
        this.selectedClient = client;
        this.systems.selectClient(index);

        if (this.selectedRow) this.selectedRow.children().removeClass('info');
        this.selectedRow = $(el.target).closest('tr');
        this.selectedRow.children().addClass('info')
        this.interfaceUpdate = true;
        this.saveClients = true;
    }

    async deleteClient(){
        return this.dialog.showMessage(
            "Are you sure about this, this action cannot be undone?", 
            "Delete Clients", 
            ['Yes', 'No']
            ).then(response => {
                if (!response.wasCancelled) {
                    that.deleteC();
                }
            });
    }
    
    async deleteC(){
        let serverResponse = await this.systems.deleteClient();
        if (!serverResponse.error) {
            this.utils.showNotification("Client " + this.selectedClient.client + " was deleted");
            this.interfaceUpdate = false;
        }
    }

    async saveClient(){
        try {
            let serverResponse = await this.systems.saveClient();
            if (!serverResponse.error) {
                this.utils.showNotification("Client " + this.selectedClient.client + " updated");
                this.interfaceUpdate = false;
            }
        } catch(error){
            console.log(error)
        }
    }

    cancel() {
        if (this.editIndex == -1) {
            this.new();;
        } else {
            this.systems.selectSystem(this.editIndex);
        }
    }

    async save() {
        if(this.validation.validate(1, this)){
            let serverResponse = await this.systems.saveSystem();
            if (!serverResponse.error) {
                 this.dataTable.updateArray(this.systems.systemsArray);
                this.utils.showNotification("System " + this.systems.selectedSystem.sid + " was updated");
                this.systemSelected = false;
                this._cleanUp();
            }
        }
    }

    delete(){
        var cmd = {
            header : "Delete System",
            message : "Are you sure you want to delete the system?",
            cancelButton : false,
            okButton : true
        };

        this.dialog.open({ viewModel: ConfirmDialog, model: cmd}).then(response => {
            if (!response.wasCancelled) {
                this.deleteSystem();
            }
        });
    }

    async deleteSystem(){
        var name = this.systems.selectedSystem.sid;
        let serverResponse = await this.systems.deleteSystem();
        if (!serverResponse.error) {
                this.dataTable.updateArray(this.systems.systemsArray);
                this.utils.showNotification("System " + name + " was deleted");
        }
        this.systemSelected = false;
    }

    _cleanUp(){
        this._cleanUpFilters()
    }

    _cleanUpFilters(){
        $("#sid").val("");
        $("#description").val("");
        $("#server").val("");
    }


    back() {
        if (this.systems.isDirty().length) {
            return this.dialog.showMessage(
                "The system has been changed. Do you want to save your changes?", 
                "Save Changes", 
                ['Yes', 'No']
                ).then(response => {
                    if (!response.wasCancelled) {
                        this.save();
                    } else {
                        this.systemSelected = false;
                    }
                });
        } else {
            this.systemSelected = false;
        }
    }

    _setupValidation(){
        this.validation.addRule(1,"editSid",{"rule":"required","message":"SID is required", "value": "systems.selectedSystem.sid"});
        this.validation.addRule(1,"editDescription",{"rule":"required","message":"Description is required", "value": "systems.selectedSystem.description"});
        this.validation.addRule(1,"editServer",{"rule":"required","message":"Server is required", "value": "systems.selectedSystem.server"});
        this.validation.addRule(1,"editInst",{"rule":"required","message":"Instance is required", "value": "systems.selectedSystem.instance"});
    }
}
