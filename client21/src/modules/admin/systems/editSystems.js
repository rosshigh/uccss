import { inject } from 'aurelia-framework';
import { ValidationRules, ValidationControllerFactory, validationMessages } from 'aurelia-validation';
import { DialogService } from 'aurelia-dialog';
import { ConfirmDialog } from '../../../resources/dialogs/confirm-dialog';
import { MessageDialog } from '../../../resources/dialogs/message-dialog';
import { Systems } from '../../../resources/data/systems';
import { Sessions } from '../../../resources/data/sessions';
import { Products } from '../../../resources/data/products';
import { AppConfig } from '../../../appConfig';
import { Store } from '../../../store/store';
import { Utils } from '../../../resources/utils/utils';

@inject(ValidationControllerFactory, Systems, Sessions, Products, AppConfig, Store, Utils, DialogService)
export class EditSystems {

    pageSize = 200;

    constructor(ValidationControllerFactory, systems, sessions, products, config, store, utils, dialog) {
        this.controller = ValidationControllerFactory.createForCurrentScope();
        this.systems = systems;
        this.sessions = sessions;
        this.products = products;
        this.config = config;
        this.store = store;
        this.utils = utils;
        this.dialog = dialog;

        this.filters = [
            { value: '', keys: ['sid', 'description'] },
            { value: true, keys: ['active'] }
        ];

        this.configParameters = this.store.getConfig();

        this.productsToSave = [];

        this.view = 'table';
        this.showClientTable = true
    }

    async activate() {
        let responses = await Promise.all([
            this.systems.getObjectsArray('?order=sid'),
            this.products.getObjectsArray('?filter=active|eq|true&order=name'),
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
        await this.systems.getObjectsArray('?order=sid')
    }

    new() {
        this.systems.selectObject();
        this.refreshSelects();
        this.createValidationRules();
        this.view = 'form';
    }

    async edit(system) {
        await this.systems.getObject(system._id);
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
                    let message = 'You must fix the errors before you can save the system?';
                    let title = "Fix Errors";
                    let options = ['Ok'];
                    this.dialog.open({ viewModel: MessageDialog, model: { message, title, options }, lock: false }).whenClosed(response => {
                        return;
                    });
                }
            });
    }

    async saveSystem() {
        let serverResponse = await this.systems.saveObject();
        if (!serverResponse.error) {
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

    async delete() {
        let message = 'Are you sure you want to delete the system?';
        let title = "Confirm Delete";
        let options = {};
        this.dialog.open({ viewModel: ConfirmDialog, model: { message, title, options }, lock: false }).whenClosed(response => {
            if (!response.wasCancelled) {
                this.deleteSystem();
            } else {
                this.goBack();
            }
        });
    }

    async deleteSystem() {
        var name = this.systems.selectedObject.sid;
        let serverResponse = await this.systems.deleteObject();
        if (!serverResponse.error) {
            this.utils.showNotification(name + " was deleted");
        }
        this._cleanUp();
    }

    back() {
        if (this.systems.isObjectDirty().length) {
            let message = 'Do you want to save the system?';
            let title = "Save System";
            let options = {};
            this.dialog.open({ viewModel: ConfirmDialog, model: { message, title, options }, lock: false }).whenClosed(response => {
                if (!response.wasCancelled) {
                    this.saveSystem();
                } else {
                    this.goBack();
                }
            });
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
            let message = 'Enter all the required parameters.';
            let title = "Enter Parameters";
            let options = ['Ok'];
            this.dialog.open({ viewModel: MessageDialog, model: { message, title, options }, lock: false }).whenClosed(response => {
                if (!response.wasCancelled) {
                    return;
                }
            });
        };
        if (end < start) {
            let message = 'The first client number must be less than the last client number.';
            let title = "Invalid Client Number";
            let options = ['Ok'];
            this.dialog.open({ viewModel: MessageDialog, model: { message, title, options }, lock: false }).whenClosed(response => {
                if (!response.wasCancelled) {
                    return;
                }
            });
        }
        if (this.editFirstClient.length != 3 || this.editLastClient.length != 3) {
            let message = 'The client number must be 3 digits.';
            let title = "Invalid Client Number";
            let options = ['Ok'];
            this.dialog.open({ viewModel: MessageDialog, model: { message, title, options }, lock: false }).whenClosed(response => {
                if (!response.wasCancelled) {
                    return;
                }
            });
        }
        let result = this.generateAllClients(start, end, parseInt(this.clientInterval));
        if (result.error) {
            this.utils.showNotification(result.error, 'error');
        } else {
            let indexOfProduct = this.products.selectedObjectFromId(this.selectedProduct);
            this.saveProduct = true;
            if (this.products.selectedObject.systems && this.products.selectedObject.systems.length > 0) {
                this.products.selectedObject.systems.forEach(item => {
                    if (item.sid === this.systems.selectedObject.sid) this.saveProduct = false;
                })
            }
            if (this.saveProduct) {
                this.products.selectedObject.systems.push({ systemId: this.systems.selectedObject._id, sid: this.systems.selectedObject.sid });
                if(this.productsToSave.indexOf(indexOfProduct) === -1) this.productsToSave.push(indexOfProduct);
            }
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
        let message = 'Are you sure you want to return all the clients to their initial state?';
        let title = "Confirm Refresh";
        let options = {};
        this.dialog.open({ viewModel: ConfirmDialog, model: { message, title, options }, lock: false }).whenClosed(response => {
            if (!response.wasCancelled) {
                this.executeRefreshAllClients();
            } else {
            }
        });
    }

    executeRefreshAllClients() {
        this.systems.selectedObject.clients.forEach((item, index) => {
            this.selectedIndex = index;
            this.executeRefreshClient();
        })
    }

    deleteAllClients() {
        let message = 'Are you sure you want to delete all the clients?';
        let title = "Confirm Deelete";
        let options = {};
        this.dialog.open({ viewModel: ConfirmDialog, model: { message, title, options }, lock: false }).whenClosed(response => {
            if (!response.wasCancelled) {
                let productToUpdate = this.systems.selectedObject.clients[0].productId;
                this.executeDeleteAllClients();
                let indexOfProduct = this.products.selectedObjectFromId(productToUpdate);
                this.saveProduct = false;
                if (this.products.selectedObject.systems && this.products.selectedObject.systems.length > 0) {
                    this.products.selectedObject.systems.forEach((item, index) => {
                        if (item.sid === this.systems.selectedObject.sid) {
                            this.products.selectedObject.systems.splice(index, 1);
                            this.saveProduct = true;
                        }
                    })
                }
                if (this.saveProduct) {
                    if(this.productsToSave.indexOf(indexOfProduct) === -1) this.productsToSave.push(indexOfProduct);
                }
            } else {
            }
        });
    }

    executeDeleteAllClients() {
        this.systems.selectedObject.clients = [];
    }

    updateAllProducts() {
        if (!this.selectedProduct) {
            let message = 'You must choose a product?';
            let title = "Choose a Product";
            let options = ['Ok'];
            this.dialog.open({ viewModel: MessageDialog, model: { message, title, options }, lock: false }).whenClosed(response => {
                if (!response.wasCancelled) {

                } else {

                }
            });
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
    }

    selectProduct() {
        this.products.selectedObjectFromId(this.selectedProduct);
        // if (this.products.selectedProduct) this.idsAvailable = this.products.selectedProduct.idsAvailable ? this.products.selectedProduct.idsAvailable : 0;
    }

    toggleSandBox() {
        if (this.systems.selectedObject.clients[this.selectedIndex].assignments.length > 0) {
            this.utils.showNotification("The client has assignments. You must refresh it before changing it's status", 'warning');
        } else {
            this.systems.selectedObject.clients[this.selectedIndex].clientStatus = this.systems.selectedObject.clients[this.selectedIndex].clientStatus == this.config.SANDBOX_CLIENT_CODE ? this.config.UNASSIGNED_CLIENT_CODE : this.config.SANDBOX_CLIENT_CODE;
        }

    }

    refreshClient(index) {
        let message = 'Are you sure you want to return the client to its initial state?';
        let title = "Confirm Refresh";
        let options = {};
        this.dialog.open({ viewModel: ConfirmDialog, model: { message, title, options }, lock: false }).whenClosed(response => {
            if (!response.wasCancelled) {
                this.executeRefreshClient();
            } else {
            }
        });
    }

    executeRefreshClient() {
        this.systems.selectedObject.clients[this.selectedIndex].clientStatus = this.config.UNASSIGNED_CLIENT_CODE;
        this.systems.selectedObject.clients[this.selectedIndex].assignments = new Array();
        this.systems.selectedObject.clients[this.selectedIndex].idsAvailable = this.systems.selectedObject.idsAvailable;
    }

    deleteClient() {
        let message = 'Are you sure you want to delete the client?';
        let title = "Confirm Delete";
        let options = {};
        this.dialog.open({ viewModel: ConfirmDialog, model: { message, title, options }, lock: false }).whenClosed(response => {
            if (!response.wasCancelled) {
                this.systems.selectedObject.clients.splice(this.selectedIndex, 1);
                this.backToClientTable();
            } else {
            }
        });
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
