import { inject } from 'aurelia-framework';
import { ValidationRules, ValidationControllerFactory, validationMessages } from 'aurelia-validation';
import { Systems } from '../../../resources/data/systems';
import { Sessions } from '../../../resources/data/sessions';
import { Products } from '../../../resources/data/products';
import { AppConfig } from '../../../appConfig';
import { Utils } from '../../../resources/utils/utils';

@inject(ValidationControllerFactory, Systems, Sessions, Products, AppConfig, Utils)
export class EditSystems {

    pageSize = 200;

    constructor(ValidationControllerFactory, systems, sessions, products, config, utils) {
        this.controller = ValidationControllerFactory.createForCurrentScope();
        this.systems = systems;
        this.sessions = sessions;
        this.products = products;
        this.config = config;
        this.utils = utils;

        this.filters = [
            { value: '', keys: ['sid', 'description'] },
            { value: true, keys: ['active'] }
        ];

        this.productsToSave = [];

        this.view = 'table';
        this.showClientTable = true
    }

    async activate() {
        $("#loading").show();
        let responses = await Promise.all([
            this.systems.getObjectsArray('?order=sid'),
            this.products.getObjectsArray('?filter=active|eq|true&order=name'),
            this.sessions.getSessionParameters()
        ]);
        $("#loading").hide();
    }

    attached() {
        $("#loading").hide();
        $('#filterField').focus();
        $('[data-toggle="tooltip"]').tooltip();
        $('.selectpicker').selectpicker();
    }

    async refresh() {
        $("#loading").show();
        this.clearFilters();
        await this.systems.getObjectsArray('?order=sid')
        $("#loading").hide();
    }

    new() {
        this.systems.selectObject();
        this.refreshSelects();
        this.createValidationRules();
        this.view = 'form';
    }

    async edit(system) {
        await this.systems.getObject(system._id);
        this.systems.selectedObject.systemNotes = this.systems.selectedObject.systemNotes ? this.systems.selectedObject.systemNotes : "";
        this.refreshSelects();
        this.createValidationRules();
        this.saveFilterValues();
        this.view = 'form';
    }

    refreshSelects(){
        this.utils.refreshSelect("#edittype", this.config.SYSTEM_TYPES, "type", this.systems.selectedObject.type);
        this.utils.refreshSelect("#sessions", this.sessions.SESSION_PARAMS, "session", this.systems.selectedObject.sessions);
    }

    saveFilterValues() {
        this.filterValues = [];
        this.filters.forEach(item => {
            this.filterValues.push(item.value);
        })
    }

    resetFilterValues() {
        if (this.filterValues && this.filterValues.length) {
            this.filterValues.forEach((item, index) => {
                this.filters[index].value = item;
            });
        }
    }

    createValidationRules() {

        validationMessages['required'] = 'You must enter \${$displayName}.'
        ValidationRules
            .ensure('sid').displayName('a SID').required()
            .ensure('description').displayName('a Description').required()
            .on(this.systems.selectedObject);
    }

    async save() {
        this.controller.validate()
            .then(result => {
                if (result.valid) {
                    this.saveSystem();
                } else {
                    $("#fixErrorsModal").modal('show');
                }
            });
    }

    async saveSystem() {
        let serverResponse = await this.systems.saveObject();
        if (!serverResponse.error) {
            this.utils.updateArrayItem(serverResponse, this.systems.objectsArray);
            this.utils.showNotification("The system was updated");
            this.productsToSave.forEach(item => {
                this.products.selectObject(item)
                this.products.saveObject();
            })
            this.productsToSave = [];
        } else {
            this.utils.showNotification("There was a problem saving the system", 'error');
        }
        this._cleanUp();
    }

    async deleteSystem() {
        this.modalMessage = 'Are you sure you want to delete the system?';
        $("#confirmDeleteModal").modal('show');
    }

    async delete() {
        var name = this.systems.selectedObject.sid;
        let serverResponse = await this.systems.deleteObject();
        if (!serverResponse.error) {
            this.utils.showNotification(name + " was deleted");
        }
        this._cleanUp();
    }

    back() {
        if (this.systems.isObjectDirty().length) {
            this.modalMessage = 'Do you want to save the system?';
            $("#confirmSaveModal").modal('show');
        } else {
            this.goBack();
        }
    }

    goBack() {
        this.refresh();
        this.resetFilterValues();
        this.backToClientTable()
        this.view = 'table';
    }

    cancel() {
        this.systems.selectedObjectById(this.systems.selectedObject._id);
    }

    editClientsButton() {
        this.showClientParametersForm = !this.showClientParametersForm;
        this.editClientStatus = this.config.UNASSIGNED_CLIENT_CODE;
        setTimeout(() => {
            $('#clientStatusSelect').selectpicker();
            this.utils.refreshSelect("#clientStatusSelect", this.config.CLIENT_STATUSES, "code", this.editClientStatus);
        },250); 
        $("#editFirstClient").focus();
    }

    editClient(client, index) {
        this.selectedClient = client;
        this.selectedIndex = index;
        this.showClientTable = false;
    }

    backToClientTable() {
        this.showClientTable = true;
    }

    generateClients() {
        var start = parseInt(this.editFirstClient);
        var end = parseInt(this.editLastClient);
        this.clientInterval = parseInt(this.clientInterval) > 0 ? parseInt(this.clientInterval) : 1;
        if (this.selectedProduct === "" || this.idsAvailable === "0" || !this.editFirstClient || !this.editLastClient) {
            this.modalMessage = 'Enter all the required parameters.';
           $("#messageModal").modal('show');
        };
        if (end < start) {
            this.modalMessage = 'The first client number must be less than the last client number.';
            $("#messageModal").modal('show');
        }
        if (this.editFirstClient.length != 3 || this.editLastClient.length != 3) {
            this.modalMessage = 'The client number must be 3 digits.';
            $("#messageModal").modal('show');
        }
        let result = this.generateAllClients(start, end, parseInt(this.clientInterval));
        if (result.error) {
            this.utils.showNotification(result.error, 'error');
        } else {
           this.addSystemToProduct();
        }
    }

    addSystemToProduct(){
        let indexOfProduct = this.products.selectedObjectById(this.selectedProduct);
        this.saveProduct = true;
        if (this.products.selectedObject.systems && this.products.selectedObject.systems.length > 0) {
            this.products.selectedObject.systems.forEach(item => {
                if (item.sid === this.systems.selectedObject.sid) this.saveProduct = false;
            })
        }
        if (this.saveProduct) {
            this.products.objectsArray[indexOfProduct].systems.push({ systemId: this.systems.selectedObject._id, sid: this.systems.selectedObject.sid });
            if(this.productsToSave.indexOf(indexOfProduct) === -1) this.productsToSave.push(indexOfProduct);
        }
    }

    generateAllClients(start, end, interval) {
        this.systems.selectedObject.clients = this.systems.selectedObject.clients || new Array();
        let lastClientIndex = this.systems.selectedObject.clients.length - 1;
        if (start > 0 && end > 0 && end >= start) {
            for (let i = start; i <= end; i += interval) {
                if (lastClientIndex === -1 || this._findClient(i, 0, lastClientIndex) < 0) {
                    this.systems.selectedObject.clients.push(this.systems.emptyClient(i, this.editClientStatus, this.selectedProduct, this.idsAvailable));
                }
            }
            return true;
        } else {
            return { error: "Enter valid start and end client numbers" }
        }
    }

    _findClient(client, start, end) {
        if (end >= 0) {
            for (let i = start; i <= end; i++) {
                if (this.systems.selectedObject.clients[i].client == client) return i;
            }
        }
        return -1;
    }

    refreshAllClients() {
        // this.modalMessage = 'Are you sure you want to refresh client ?';
        $("#refreshClientsModal").modal('show');
    }

    executeRefreshAllClients() {
        this.systems.selectedObject.clients.forEach((item, index) => {
            this.selectedIndex = index;
            this.executeRefreshClient();
        })
    }

    deleteAllClients() {
        $("#confirmDeleteAllClientsModal").modal('show');
    }

    executeUpdateProducts(){
        let productToUpdate = this.systems.selectedObject.clients[0].productId;
        this.executeDeleteAllClients();
        this.addSystemToProduct();
    }

    executeDeleteAllClients() {
        this.systems.selectedObject.clients = [];
    }

    updateAllProducts() {
        if (!this.selectedProduct) {
            this.modalMessage = "You must choose a product?";
            $("#messageModal").modal('show');
        } else {
            this.executeUpdateAllProducts();
        }
    }

    executeUpdateAllProducts() {
        this.selectProduct();
        if (this.products.selectedObject._id) {
            let newProductId = this.products.selectedObject._id;
            this.systems.selectedObject.clients.forEach((item, index) => {
                item.productId = newProductId;
            })
        }
        this.addSystemToProduct();
    }

    selectProduct() {
        this.products.selectedObjectById(this.selectedProduct);
    }

    toggleSandBox() {
        if (this.systems.selectedObject.clients[this.selectedIndex].assignments.length > 0) {
            this.utils.showNotification("The client has assignments. You must refresh it before changing it's status", 'warning');
        } else {
            this.systems.selectedObject.clients[this.selectedIndex].clientStatus = this.systems.selectedObject.clients[this.selectedIndex].clientStatus == this.config.SANDBOX_CLIENT_CODE ? this.config.UNASSIGNED_CLIENT_CODE : this.config.SANDBOX_CLIENT_CODE;
        }
        this.backToClientTable();
    }

    refreshClient(index) {
        this.modalMessage = 'Are you sure you want to refresh client ' + this.selectedClient.client + '?';
        $("#refreshClientModal").modal('show');
    }

    executeRefreshClient() {
        this.systems.selectedObject.clients[this.selectedIndex].clientStatus = this.config.UNASSIGNED_CLIENT_CODE;
        this.systems.selectedObject.clients[this.selectedIndex].assignments = new Array();
        this.systems.selectedObject.clients[this.selectedIndex].idsAvailable = this.systems.selectedObject.idsAvailable;
        this.backToClientTable();
    }

    deleteClient() {
        this.modalMessage = "Are you sure you want to delete client" + this.selectedClient.client + '?';
        $("#confirmDeleteClientModal").modal('show');
    }

    executeDeleteClient(){
        this.systems.selectedObject.clients.splice(this.selectedIndex, 1);
        this.backToClientTable();
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
