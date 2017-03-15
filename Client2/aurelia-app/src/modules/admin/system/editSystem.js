import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";
import {CommonDialogs} from '../../../resources/dialogs/common-dialogs';
import {Utils} from '../../../resources/utils/utils';
import {Systems} from '../../../resources/data/systems';
import {Sessions} from '../../../resources/data/sessions';
import {Products} from '../../../resources/data/products';
import Validation from '../../../resources/utils/validation';
import {DataTable} from '../../../resources/utils/dataTable';
import {AppConfig} from '../../../config/appConfig';

import moment from 'moment';
import $ from 'jquery';

@inject(Router, Systems, Products, Validation, Utils, DataTable, AppConfig, CommonDialogs, Sessions)
export class EditSystem {
    systemSelected = false;
    editClients = false;
    navControl = "systemNavButtons";
    spinnerHTML = "";

    constructor(router, systems, products, validation, utils, datatable, config, dialog, sessions) {
        this.router = router;
        this.systems = systems;
        this.products = products;
        this.utils = utils;
        this.validation = validation;
        this.validation.initialize(this);
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
            this.systems.getSystemsArray('?order=sid'),
            this.products.getProductsArray('?filter=active|eq|true'),
            this.sessions.getSessionsArray(),
            this.config.getConfig(),
            this.config.getSessions()
        ]);
        this.dataTable.updateArray(this.systems.systemsArray);
    }

    async refresh() {
        this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
        await this.systems.getSystemsArray('?order=sid', true);
        this.dataTable.updateArray(this.systems.systemsArray);
        this.spinnerHTML = "";
        this. _cleanUpFilters();
    }

    new() {
        this.editIndex = -1;
        this.displayIndex = -1;
        this.systems.selectSystem();
        this.editStatus = true;
        // this.saveClients = false;
        $("#editSid").focus();
        this.systemSelected = true;
        this.newSystem = true;
    }

    edit(index, el) {
        this.editIndex = this.dataTable.getOriginalIndex(index);
        this.systems.selectSystem(this.editIndex);
        this.editSystem = true;
        this.systemSelected = true;
        this.newSystem = false;
        $("#editSid").focus();

        if (this.selectedRow) this.selectedRow.children().removeClass('info');
        this.selectedRow = $(el.target).closest('tr');
        this.selectedRow.children().addClass('info')
        this.showTable = false;
        setTimeout(function(){$('[data-toggle="tooltip"]').tooltip()},500);
    }

    editClientsButton(){
        this.editClients = !this.editClients;
    }

    generateClients() {
        if(!this.editFirstClient || !this.editLastClient || this.editFirstClient.length != 3 || this.editLastClient.length != 3){
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
        // this.saveClients = true;
        if (result.error) {
            this.utils.showNotification(result.error);
        }
    }

    refreshClients() {
        if(!this.systems.selectedSystem.clients || this.systems.selectedSystem.clients.length === 0){
            return this.dialog.showMessage(
                "The system doesn't have clients to refresh", 
                "No Clients",
                ['OK']
                ).then(response => {
                    return;
                });
        }
        return this.dialog.showMessage(
            "This will return clients to an initial state.  You must save the system for this to take effect. Do you want to continue?", 
            "Refresh Clients", 
            ['Yes', 'No']
            ).then(response => {
                if(!response.wasCancelled){
                    // this.saveClients = true; 
                    this.systems.refreshClients(this.config.UNASSIGNED_REQUEST_CODE);    
                }
            });
    }

    deleteClients() {
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
    
    deleteAllClients(){
        this.systems.deleteAllClients();
        this.utils.showNotification("You must save the system to complete the deletion");
    }

    editAClient(client, index, el) {
        this.selectedClientIndex = index;
        this.selectedClient = client;
        this.systems.selectClient(index);

        if (this.selectedRow) this.selectedRow.children().removeClass('info');
        this.selectedRow = $(el.target).closest('tr');
        this.selectedRow.children().addClass('info')
        this.interfaceUpdate = true;
        // this.saveClients = true;
    }

    deleteClient(index){
        if(!this. _okToDeleteClient(this.systems.selectedSystem.clients[index])){
            this.utils.showNotification("The client either has assignments or the status doesn't allow deletion. You must refresh it before deleting it.");
        } else {
            return this.dialog.showMessage(
                "Are you sure about this, this action cannot be undone?", 
                "Delete Clients", 
                ['Yes', 'No']
                ).then(response => {
                    if (!response.wasCancelled) {
                        this.systems.selectedSystem.clients.splice(index,1);
                    }
                });
        }
    }

    _okToDeleteClient(client){
        if(client.assignments.length > 0) return false;
        let status = client.clientStatus;
        for(var i = 0; i<this.config.CLIENT_STATUSES.length; i++){
            if(this.config.CLIENT_STATUSES[i].code == status && this.config.CLIENT_STATUSES[i].OKToDelete) {
                return true;
            }
        }
        return false;
    }
    
    async deleteC(){
        this.systems.deleteClient();
        this.utils.showNotification("The client was deleted but you must save the system to complete the deltion");
    }

    // async saveClient(){
    //     let serverResponse = await this.systems.saveClient();
    //     if (!serverResponse.error) {
    //         this.utils.showNotification("The client was updated");
    //         this.interfaceUpdate = false;
    //     }
    // }

    cancel() {
        if (this.editIndex == -1) {
            this.new();;
        } else {
            this.systems.selectSystem(this.editIndex);
        }
    }

    async save() {
        if(this.validation.validate(1)){
            this.systems.selectedSystem.sid = this.systems.selectedSystem.sid.toUpperCase();
            this.systems.selectedSystem.server = this.systems.selectedSystem.server.toUpperCase();
            let serverResponse = await this.systems.saveSystem();
            if (!serverResponse.error) {
                this.utils.showNotification("System " + this.systems.selectedSystem.sid + " was updated");
                this._cleanUp();
            } 
        }
    }

    toggleSandBox(index){
        if(this.systems.selectedSystem.clients[index].assignments.length > 0){
            this.utils.showNotification("The client has assignments. You must refresh it before changing it's status");
        } else {
            this.systems.selectedSystem.clients[index].clientStatus =   this.systems.selectedSystem.clients[index].clientStatus == this.config.SANDBOX_CLIENT_CODE ? this.config.UNASSIGNED_CLIENT_CODE : this.config.SANDBOX_CLIENT_CODE;
        }

    }

    refreshClient(index){
        return this.dialog.showMessage(
            "This will return the client to the initial state.  You must save the system for this to take effect. Do you want to continue?", 
            "Refresh Clients", 
            ['Yes', 'No']
            ).then(response => {
                if(!response.wasCancelled){
                    this.systems.selectedSystem.clients[index].clientStatus =  this.config.UNASSIGNED_REQUEST_CODE;
                    this.systems.selectedSystem.clients[index].assignments = new Array();
                    this.systems.selectedSystem.clients[index].idsAvailable = this.systems.selectedSystem.idsAvailable;
                }
            });
    }

    delete(){
        return this.dialog.showMessage(
            "Are you sure you want to delete the system?",
            "Delete System",
            ['Yes', 'No']
        ).then(response => {
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
        this._cleanUp();
        this.systemSelected = false;
    }

    _cleanUp(){
        // this._cleanUpFilters()
        this.systemSelected = false;
        this.newSystem = false;
        this.validation.makeAllValid(1);
    }

    _cleanUpFilters(){
        $("#sid").val("");
        $("#description").val("");
        $("#server").val("");
        this.dataTable.updateArray(this.systems.systemsArray,'sid',1);
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
                        this._cleanUp();
                    }
                });
        } else {
             this._cleanUp();
        }
    }

    selectClient(client, index){
        this.selectedClient = this.utils.copyObject(client);
        this.clientSelected = true;
        this.selectedClientIndex = index;
    }

    backClient(){
        this.clientSelected = false;
    }

    saveClient(){
        this.systems.selectedSystem.clients[this.selectedClientIndex] = this.selectedClient;
        this.clientSelected = false;
    }

    _setupValidation(){
        this.validation.addRule(1,"editSid",[{"rule":"required","message":"SID is required", "value": "systems.selectedSystem.sid"},
        {"rule":"custom", "message":"A system with that SID already exists",
            "valFunction":function(context){
                var found = false;
                for(var i = 0; i < context.systems.systemsArray.length; i++){
                    if( context.systems.systemsArray[i].sid.toUpperCase() === context.systems.selectedSystem.sid.toUpperCase()){
                        if(context.systems.selectedSystem._id && context.systems.selectedSystem._id != context.systems.systemsArray[i]._id){
                            found = true;
                        } else if (!context.systems.selectedSystem._id){
                            found = true;
                        }
                    }
                }
                return !found;
            }}],true);
        this.validation.addRule(1,"editDesc",[{"rule":"required","message":"Description is required", "value": "systems.selectedSystem.description"}]);
        this.validation.addRule(1,"editServer",[{"rule":"required","message":"Server is required", "value": "systems.selectedSystem.server"},
        {"rule":"custom", "message":"A system with that server already exists",
            "valFunction":function(context){
                var found = false;
                for(var i = 0; i < context.systems.systemsArray.length; i++){
                    if( context.systems.systemsArray[i].server.toUpperCase() === context.systems.selectedSystem.server.toUpperCase()){
                        if(context.systems.selectedSystem._id && context.systems.selectedSystem._id != context.systems.systemsArray[i]._id){
                            found = true;
                        } else if (!context.systems.selectedSystem._id){
                            found = true;
                        }
                    }
                }
                return !found;
            }}]);
        this.validation.addRule(1,"editInst",[{"rule":"required","message":"Instance is required", "value": "systems.selectedSystem.instance"}]);
    }
}
