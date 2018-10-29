import {inject} from 'aurelia-framework';
import {CommonDialogs} from '../../../resources/dialogs/common-dialogs';
import {Utils} from '../../../resources/utils/utils';
import {Systems} from '../../../resources/data/systems';
import {Sessions} from '../../../resources/data/sessions';
import {Products} from '../../../resources/data/products';
import Validation from '../../../resources/utils/validation';
import {DataTable} from '../../../resources/utils/dataTable';
import {AppConfig} from '../../../config/appConfig';

import moment from 'moment';

@inject(Systems, Products, Validation, Utils, DataTable, AppConfig, CommonDialogs, Sessions)
export class EditSystem {
    systemSelected = false;
    editClients = false;
    // spinnerHTML = "";
    selectedProduct = "";

    dateConfig = {wrap: true};

    constructor(systems, products, validation, utils, datatable, config, dialog, sessions) {
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

    async attached(){
        $('#loading').show();
        let responses = await Promise.all([
            this.systems.getSystemsArray('?order=sid'),
            this.products.getProductsArray('?filter=active|eq|true&order=name'),
            this.sessions.getSessionsArray(),
            this.config.getConfig(),
            this.config.getSessions()
        ]);
        this.dataTable.updateArray(this.systems.systemsArray);
        this.clientInterval = this.config.CLIENT_INTERVAL
        $('#loading').hide();
        $('[data-toggle="tooltip"]').tooltip();
        this.initialLoaded = true;
    }

    async activate() {
        this.initialLoaded = false;
    }

    async refresh() {
        // this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
        $('#loading').show();
        await this.systems.getSystemsArray('?order=sid', true);
        this.dataTable.updateArray(this.systems.systemsArray);
        // this.spinnerHTML = "";
        $('#loading').hide();
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

    async edit(index, el) {
        this.systemDetails = true;
        this.editIndex = this.dataTable.getOriginalIndex(index); 
        let response = await this.systems.getSystem(this.editIndex)
        // this.systems.selectSystem(this.editIndex);
        if(response.error){
            this.utils.showNotification('There was an error retrieving the system');
            return;
        }
        this.originalSystem = this.utils.copyObject(this.systems.selectedSystem);
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

    async save() {
        if(this.validation.validate(1)){
            this.systems.selectedSystem.sid = this.systems.selectedSystem.sid.toUpperCase();
            this.systems.selectedSystem.server = this.systems.selectedSystem.server.toUpperCase();
            let serverResponse = await this.systems.saveSystem();
            if (!serverResponse.error) {
                if(this.saveProduct) this.products.saveProduct();
                if( this.productsToUpdate &&  this.productsToUpdate.length > 0){
                    this.productsToUpdate.forEach(item => {
                        this.products.selectedProductFromId(item._id);
                        this.products.selectedProduct.systems = item.systems;
                        this.products.saveProduct()
                    });
                    this.productsToUpdate = new Array();
                }
                this.utils.showNotification("System " + this.systems.selectedSystem.sid + " was updated");
                this._cleanUp();
            } 
        }
    }

    async saveBackups(system) {
        this.systems.setSelectedSystem(system);
        let serverResponse = await this.systems.saveSystem();
        if (!serverResponse.error) {
            this.utils.showNotification("System " + this.systems.selectedSystem.sid + " was updated");
        } 
    }

    toggleSandBox(index){
        if(this.systems.selectedSystem.clients[index].assignments.length > 0){
            this.utils.showNotification("The client has assignments. You must refresh it before changing it's status");
        } else {
            this.systems.selectedSystem.clients[index].clientStatus =   this.systems.selectedSystem.clients[index].clientStatus == this.config.SANDBOX_CLIENT_CODE ? this.config.UNASSIGNED_CLIENT_CODE : this.config.SANDBOX_CLIENT_CODE;
        }

    }

    updateProduct(client, index){
        if(client.assignments.length > 1) {
             this.utils.showNotification("The client has assignments. You must refresh it before changing it's product");
        } else {
             if(this.selectedProduct === ""){
                  this.utils.showNotification("Select a product first");
             } else {
                this.systems.selectedSystem.clients[index].productId = this.selectedProduct;
                this.saveProduct = true;
                this.products.selectedProductFromId(this.selectedProduct);
                if(this.products.selectedProduct.systems && this.products.selectedProduct.systems.length > 0) {
                    this.products.selectedProduct.systems.forEach(item => {
                        if(item.sid === this.systems.selectedSystem.sid) this.saveProduct = false;
                    })
                } else {
                    this.saveProduct = true
                }
                if(this.saveProduct){
                    this.products.selectedProduct.systems.push({systemId: this.systems.selectedSystem._id, sid: this.systems.selectedSystem.sid} );
                    
                }
             }
        }
    }

    updateAllProducts(){
        if(this.selectedProduct === "") {
             this.utils.showNotification("Select a product first");
        } else {
            this.dialog.showMessage(
                "This will only update the products for clients that have no assignments. Continue?", 
                "Refresh Clients", 
                ['Yes', 'No']
                ).whenClosed(response => {
                    if(!response.wasCancelled){
                        this.systems.selectedSystem.clients.forEach(item => {
                            if(item.assignments.length === 0){
                                item.productId = this.selectedProduct;
                            }
                        })
                        this.saveProduct = true;
                        this.products.selectedProductFromId(this.selectedProduct);
                        if(this.products.selectedProduct.systems && this.products.selectedProduct.systems.length > 0) {
                            this.products.selectedProduct.systems.forEach(item => {
                                if(item.sid === this.systems.selectedSystem.sid) this.saveProduct = false;
                            })
                        } else {
                            this.saveProduct = true
                        }
                        if(this.saveProduct){
                            this.products.selectedProduct.systems.push({systemId: this.systems.selectedSystem._id, sid: this.systems.selectedSystem.sid} );
                        }
                    }
                });
        }
    }

    refreshClient(index){
        this.dialog.showMessage(
            "This will return the client to the initial state.  You must save the system for this to take effect. Do you want to continue?", 
            "Refresh Clients", 
            ['Yes', 'No']
            ).whenClosed(response => {
                if(!response.wasCancelled){
                    this.systems.selectedSystem.clients[index].clientStatus =  this.config.UNASSIGNED_REQUEST_CODE;
                    this.systems.selectedSystem.clients[index].assignments = new Array();
                    this.systems.selectedSystem.clients[index].idsAvailable = this.systems.selectedSystem.idsAvailable;
                }
            });
    }

    delete(){
        this.dialog.showMessage(
            "Are you sure you want to delete the system?",
            "Delete System",
            ['Yes', 'No']
        ).whenClosed(response => {
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

    editClientsButton(){
        this.editClients = !this.editClients;
    }

    generateClients() {
         if(this.selectedProduct === ""){
             this.dialog.showMessage(
                "You must select a product.", 
                "Select a Product", 
                ['OK']
                ).whenClosed(response => {
                    return;
                });
        }
        if(this.idsAvailable === "0"){
             this.dialog.showMessage(
                "You must enter the number of IDs available.", 
                "Enter IDS Available", 
                ['OK']
                ).whenClosed(response => {
                    return;
                });
        }
        if(!this.editFirstClient || !this.editLastClient || this.editFirstClient.length != 3 || this.editLastClient.length != 3){
            this.dialog.showMessage(
                "Clients must have three digits", 
                "Invalid Client Number", 
                ['OK']
                ).whenClosed(response => {
                    return;
                });
        }
        var start = parseInt(this.editFirstClient);
        var end = parseInt(this.editLastClient);
        if(end < start){
             this.dialog.showMessage(
                "The first client number must be less than the last client number.", 
                "Invalid Client Number", 
                ['OK']
                ).whenClosed(response => {
                    return;
                });
        }
        this.saveProduct = true;
        var result = this.systems.generateClients(start, end, this.editClientStatus, this.products.selectedProduct, parseInt(this.clientInterval), this.idsAvailable);
        if (result.error) {
            this.utils.showNotification(result.error);
        } else {
            this.products.selectedProductFromId(this.selectedProduct);
            if(this.products.selectedProduct.systems && this.products.selectedProduct.systems.length > 0) {
                this.products.selectedProduct.systems.forEach(item => {
                    if(item.sid === this.systems.selectedSystem.sid) this.saveProduct = false;
                })
            } else {
                this.saveProduct = true
            }
            if(this.saveProduct){
                this.products.selectedProduct.systems.push({systemId: this.systems.selectedSystem._id, sid: this.systems.selectedSystem.sid} );
                
            }
        }
    }

    refreshClients() {
        if(!this.systems.selectedSystem.clients || this.systems.selectedSystem.clients.length === 0){
            this.dialog.showMessage(
                "The system doesn't have clients to refresh", 
                "No Clients",
                ['OK']
                ).whenClosed(response => {
                    return;
                });
        }
        this.dialog.showMessage(
            "This will return clients to an initial state.  You must save the system for this to take effect. Do you want to continue?", 
            "Refresh Clients", 
            ['Yes', 'No']
            ).whenClosed(response => {
                if(!response.wasCancelled){
                    this.systems.refreshClients(this.config.UNASSIGNED_REQUEST_CODE, this.products.productsArray); 
                }
            });
    }

    refreshTheClients(){
        this.systems.refreshClients(this.config.UNASSIGNED_REQUEST_CODE, this.products.productsArray);
        console.log(this.systems.selectedSystem)
    }

    deleteClients() {
        this.dialog.showMessage(
            "Are you sure about this, this action cannot be undone?", 
            "Delete Clients", 
            ['Yes', 'No']
            ).whenClosed(response => {
                if (!response.wasCancelled) {
                    this.deleteAllClients();
                }
            });
    }
    
    deleteAllClients(){
        var id =  this.systems.selectedSystem._id;
        this.productsToUpdate = new Array();
        var processedProducts = new Array();
        this.systems.selectedSystem.clients.forEach(item => {
            if(item.productId){
                if(processedProducts.indexOf(item.productId) === -1){
                    processedProducts.push(item.productId);
                    this.products.selectedProductFromId(item.productId);
                    if(this.products.selectedProduct._id){
                        this.products.selectedProduct.systems.forEach((system, index) => {
                            if(system.systemId === id) {
                                this.products.selectedProduct.systems.splice(index, 1);
                                this.productsToUpdate.push(this.products.selectedProduct);
                            }
                        })
                    }
                }
            }  
        })
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
    }

    deleteClient(index){
        if(!this. _okToDeleteClient(this.systems.selectedSystem.clients[index])){
            this.utils.showNotification("The client either has assignments or the status doesn't allow deletion. You must refresh it before deleting it.");
        } else {
            this.dialog.showMessage(
                "Are you sure about this, this action cannot be undone?", 
                "Delete Clients", 
                ['Yes', 'No']
                ).whenClosed(response => {
                    if (!response.wasCancelled) {
                        var productId = this.systems.selectedSystem.clients[index].productId;
                        var id = this.systems.selectedSystem._id;
                        var noUpdates = false;
                        this.productsToUpdate = new Array();
                        if(this.systems.selectedSystem.clients.length > 0){
                            for(let i = 0; i < this.systems.selectedSystem.clients.length; i++){
                                if(this.systems.selectedSystem.clients[i].productId === productId) {
                                    noUpdates = true;
                                    break;
                                }
                            }
                        }
                        this.systems.selectedSystem.clients.splice(index,1);
                        if(!noUpdates){
                            this.products.selectedProductFromId(productId);
                             this.products.selectedProduct.systems.forEach((system, index) => {
                                if(system.systemId === id) {
                                    this.products.selectedProduct.systems.splice(index, 1);
                                    this.productsToUpdate.push(this.products.selectedProduct);
                                }
                            })
                        }
                    }
                    this.utils.showNotification("You must save the system to complete the deletion");
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
        this.products.selectedProductFromId(this.selectedClient.productId);
        if(this.products.selectedProduct.systems && this.products.selectedProduct.systems.length > 0) {
            this.products.selectedProduct.systems.forEach(item => {
                if(item.sid === this.systems.selectedSystem.sid) this.saveProduct = false;
            })
        } else {
            this.saveProduct = true
        }
        if(this.saveProduct){
            this.products.selectedProduct.systems.push({systemId: this.systems.selectedSystem._id, sid: this.systems.selectedSystem.sid} );
            
        }
        this.clientSelected = false;
        this.utils.showNotification("You must save the system for any changes to take effect.");
    }

    _cleanUp(){
        this.systemSelected = false;
        this.newSystem = false;
        this.clientSelected = false;
        this.editClients = false;
        this.validation.makeAllValid(1);
        this.systemDetails = true;
    }

    _cleanUpFilters(){
        this.sidFilterValue = "";
        this.descriptionFilterValue = "";
        this.serverFilterValue = "";
        this.activeFilter = "";
        this.dataTable.updateArray(this.systems.systemsArray);
    }

    back() {
        if (this.systems.isDirty(this.originalSystem).length) {
            this.dialog.showMessage(
                "The system has been changed. Do you want to save your changes?", 
                "Save Changes", 
                ['Yes', 'No']
                ).whenClosed(response => {
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

    cancel(){
        this.systems.selectSystem(this.editIndex);
    }

    _setupValidation(){
        this.validation.addRule(1,"editSid",[{"rule":"required","message":"SID is required", "value": "systems.selectedSystem.sid"},
        {"rule":"custom", "message":"A system with that SID already exists",
            "valFunction":function(context){
                if(!context.systems.selectedSystem._id){
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
                }
                return true;
            }}],true);
        this.validation.addRule(1,"editDesc",[{"rule":"required","message":"Description is required", "value": "systems.selectedSystem.description"}]);
        // this.validation.addRule(1,"editServer",[{"rule":"required","message":"Server is required", "value": "systems.selectedSystem.server"},
        // {"rule":"custom", "message":"A system with that server already exists",
        //     "valFunction":function(context){
        //         if(!context.systems.selectedSystem._id){
        //             var found = false;
        //             for(var i = 0; i < context.systems.systemsArray.length; i++){
        //                 if( context.systems.systemsArray[i].server.toUpperCase() === context.systems.selectedSystem.server.toUpperCase()){
        //                     if(context.systems.selectedSystem._id && context.systems.selectedSystem._id != context.systems.systemsArray[i]._id){
        //                         found = true;
        //                     } else if (!context.systems.selectedSystem._id){
        //                         found = true;
        //                     }
        //                 }
        //             }
        //             return !found;
        //          }
        //         return true;
        //     }}]);
        this.validation.addRule(1,"editInst",[{"rule":"required","message":"Instance is required", "value": "systems.selectedSystem.instance"}]);
    }

    selectProduct(){
        this.products.selectedProductFromId(this.selectedProduct);
        if(this.products.selectedProduct) this.idsAvailable = this.products.selectedProduct.idsAvailable ? this.products.selectedProduct.idsAvailable : 0;
    }

    async assignmentDetails(){
        await this.systems.getAssignmentDetails(this.systems.selectedSystem._id);
        this.systemDetails = false;
    }

    backAssignmentDetails(){
        this.systemDetails = true;
    }

    sortOnFaculty(el){
        this.facultySort = this.facultySort ? this.facultySort * -1 : 1;
        this.systems.assignmentDetailsArray = this.systems.assignmentDetailsArray.sort((a,b) => {
            return (a.lastName < b.lastName ? -1 : 1) *  this.facultySort;
        });

        $(".sortable").next().replaceWith('<i class="fa fa-sort"></i>');
        if(this.facultySort < 0){
            var icon = '<i class="fa fa-sort-amount-desc" aria-hidden="true"></i>';  
        } else {
            var icon = '<i class="fa fa-sort-amount-asc" aria-hidden="true"></i>';
        }
    
        $(el.target).next().replaceWith(icon);
    }

    sortOnClient(el){
        this.clientSort = this.clientSort ? this.clientSort * -1 : 1;
        this.systems.assignmentDetailsArray = this.systems.assignmentDetailsArray.sort((a,b) => {
            return (a.client < b.client ? -1 : 1) * this.clientSort;
        });

        $(".sortable").next().replaceWith('<i class="fa fa-sort"></i>');
        if(this.clientSort < 0){
            var icon = '<i class="fa fa-sort-amount-desc" aria-hidden="true"></i>';  
        } else {
            var icon = '<i class="fa fa-sort-amount-asc" aria-hidden="true"></i>';
        }
    
        $(el.target).next().replaceWith(icon);
    }

    sortOnInst(el){
        this.instSort = this.instSort ? this.instSort * -1 : 1;
        this.systems.assignmentDetailsArray = this.systems.assignmentDetailsArray.sort((a,b) => {
            return (a.institution < b.institution ? -1 : 1) * this.instSort;
        });

        $(".sortable").next().replaceWith('<i class="fa fa-sort"></i>');
        if(this.instSort < 0){
            var icon = '<i class="fa fa-sort-amount-desc" aria-hidden="true"></i>';  
        } else {
            var icon = '<i class="fa fa-sort-amount-asc" aria-hidden="true"></i>';
        }
    
        $(el.target).next().replaceWith(icon);
    }


    downloadExcel(){
			var exportArray = this.systems.assignmentDetailsArray;
			var htmlContent = "<table><tr><th>Faculty</th><th>Institution</th><th>Client</th><th>Student IDs</th><th>FacultyIDs</th></tr>";


			exportArray.forEach(item => {
				var line = "<tr><td>" + item.firstName + " " + item.lastName + "</td><td>" + item.institution + "</td><td>" + item.client + "</td><td>" + item.studentIds + "</td><td>" + item.facultyIds + "</td>";
                
				line += "</tr>";
				htmlContent += line;
			});
			htmlContent += "</table>";
			window.open('data:application/vnd.ms-excel,' + htmlContent);
    }
}