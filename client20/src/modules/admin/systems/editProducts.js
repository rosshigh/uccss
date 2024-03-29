import { inject } from 'aurelia-framework';
import { ValidationRules, ValidationControllerFactory, validationMessages } from 'aurelia-validation';
import { DialogService } from 'aurelia-dialog';
import { ConfirmDialog } from '../../../resources/dialogs/confirm-dialog';
import { MessageDialog } from '../../../resources/dialogs/message-dialog';
import { Products } from '../../../resources/data/products';
import { Systems } from '../../../resources/data/systems';
import { DocumentsServices } from '../../../resources/data/documents';
import { AppConfig } from '../../../appConfig';
import { Store } from '../../../store/store';
import { Utils } from '../../../resources/utils/utils';

@inject(ValidationControllerFactory, Products, Systems, DocumentsServices, AppConfig, Store, Utils, DialogService)
export class EditProducts {

    pageSize = 200;
    testVar = 'alksjdf;alskdfj;l';

    toolbar = [
        ['style', ['style', 'bold', 'italic', 'underline', 'clear']],
        ['color', ['color']],
        ['font', ['strikethrough', 'superscript', 'subscript']],
        ['layout', ['ul', 'ol', 'paragraph']],
        ['insert', ['link', 'table', 'hello']],
        ['misc', ['undo', 'redo', 'fullscreen', 'codeview']]
      ];

    constructor(ValidationControllerFactory, products, systems, documents, config, store, utils, dialog) {
        this.controller = ValidationControllerFactory.createForCurrentScope();
        this.products = products;
        this.systems = systems;
        this.documents = documents;
        this.config = config;
        this.store = store;
        this.utils = utils;
        this.dialog = dialog;

        this.filters = [
            { value: '', keys: ['name', 'systemList'] },
            { value: true, keys: ['active'] }
        ];

        this.configParameters = this.store.getConfig();

        this.foo = "mmmm";

        this.view = 'table';
    }

    async activate() {
        $("#loading").show();
        let responses = await Promise.all([
            this.products.getSmallObjectsArray('?order=name'),
            this.systems.getObjectsArray('?order=sid')
        ]);
        $("#loading").hide();
        this.calculateSystemList();
        this.filterList();
    }

    calculateSystemList() {
        let list;
        if (this.products.objectsArray) {
            this.products.objectsArray.forEach(item => {
                list = "";
                item.systems.forEach(system => {
                    list += system.sid + " "
                })
                item['systemList'] = list;
            })
        }
    }

    attached() {
        $("#loading").hide();
        $('#filterField').focus();
        $('[data-toggle="tooltip"]').tooltip();
    }

    async refresh() {
        $("#loading").show();
        this.clearFilters();
        await this.products.getSmallObjectsArray('?&order=name');
        this.calculateSystemList();
        $("#loading").hide();
    }

    new() {
        this.products.selectProduct();
        this.createValidationRules();
        this.view = 'form';
    }

    async edit(product) {
        await this.products.getObject(product._id);
        this.createValidationRules();
        this.saveFilterValues();
        this.productDescription = this.products.selectedObject.productDescription ? this.products.selectedObject.productDescription : "";
        this.view = 'form';
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
            .ensure('name').displayName('a Name').required()
            .on(this.products.selectedObject);
    }

    async save() {
        this.controller.validate()
            .then(result => {
                if (result.valid) {
                    this.saveObject();
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

    async saveObject() {
        let serverResponse = await this.products.saveObject();
        if (!serverResponse.error) {
            this.utils.updateArrayItem(serverResponse, this.products.objectsArray);
            this.utils.showNotification("The product was updated");
            // this.uploadFile();
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
        var name = this.products.selectedObject.sid;
        let serverResponse = await this.products.deleteSystem();
        if (!serverResponse.error) {
            this.utils.showNotification(name + " was deleted");
        }
        this._cleanUp();
    }

    back() {
        if (this.products.isObjectDirty().length) {
            let message = 'Do you want to save the product?';
            let title = "Save Product";
            let options = {};
            this.dialog.open({ viewModel: ConfirmDialog, model: { message, title, options }, lock: false }).whenClosed(response => {
                if (!response.wasCancelled) {
                    this.saveObject();
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
        this.view = 'table';
    }

    cancel() {
        this.products.selectedObjectById(this.products.selectedObject._id);
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

    enableEdit() {
        this.enable = true;
    }

    filterList() {
        if (this.filter) {
            var thisFilter = this.filter
            this.filteredsystemsarray = this.systems.objectsArray.filter((item) => {
                return item.sid.substring(0, thisFilter.length).toUpperCase() === thisFilter.toUpperCase();
            });
        } else {
            this.filteredsystemsarray = this.systems.objectsArray;
        }

    }

    selectSystem(el, system) {
        if (this.enable) {
            if (!this._systemAlreadySelected(system.sid)) {
                this.products.selectedObject.systems.push({ sid: system.sid, systemId: system._id });
            }
        }else {
            this.utils.showNotification("You can edit the system unless you click enable.", 'error');
        }
    }

    _systemAlreadySelected(sid) {
        for (var i = 0; i < this.products.selectedObject.systems.length; i++) {
            if (this.products.selectedObject.systems[i].sid === sid) return true;
        }
        return false;
    }

    removeSystem(el, system) {
        if (this.enable) {
            for (var i = 0; i < this.products.selectedObject.systems.length; i++) {
                if (system.systemId === this.products.selectedObject.systems[i].systemId) {
                    this.products.selectedObject.systems.splice(i, 1);
                    break;
                }
            }
        } else {
            this.utils.showNotification("You can edit the system unless you click enable.", 'error');
        }
    }

    async attachDocument() {
        let responses = await Promise.all([
            this.documents.getDocumentsCategoriesArray("?filter=[or]category|DOC:CUR:SOF:HPT:USE"),
        ]);
        this.filterDocumentList();
        this.modalTitle = "Choose Documents to Add";
        $('#documentsModal').modal('show');
    }

    filterDocumentList() {
        if (this.DocumentFilter) {
            let thisFilter = this.filter
            this.filteredDocumentArray = this.documents.objectCategoriesArray.filter((item) => {
                return item.description.toUpperCase().indexOf(thisFilter.toUpperCase()) > -1;
            });
        } else {
            this.filteredDocumentArray = this.documents.objectCategoriesArray;
        }
    }

    toggleListItem(el, id) {
        let thisElement = el.target;
        thisElement.parentElement.querySelector(".nested").classList.toggle("active");
        thisElement.classList.toggle("caret-down");
        el.stopPropagation();
    }

    closeDocumentForm() {
        this.showDocumentForm = false;
    }

    showSubCategoryDocuments(category, SubCategoryIndex, SubSubCategoryIndex, el) {
        this.documents.setCategory(category);
        this.selectedDocSubCategoryIndex = SubCategoryIndex;
        this.selectedDocSubSubCategoryIndex = SubSubCategoryIndex;
        this.catDescription = this.documents.selectedCat.description;
        this.subCatDescription = this.documents.selectedCat.subCategories[this.selectedDocSubCategoryIndex].description;
        this.showDocuments = true;
        setTimeout(() => { 
            $('[data-toggle="tooltip"]').tooltip();
            $(".form-check-input").prop('checked', false);
            this.products.selectedObject.documents.forEach(item => {
                let id = item.fileName.split(" ").join("");
                $("#" + id).prop('checked',true);
            })
        }, 1000);
        el.stopPropagation();
    }

    toggleAddToList(document, el, index) {
        if ($(el.target)[0].checked) {
            this.products.selectedObject.documents.push({
                fileName: this.documents.selectedCat.subCategories[this.selectedDocSubCategoryIndex].subSubCategories[this.selectedDocSubSubCategoryIndex].documents[index].file.fileName,
                path: this.documents.selectedCat.subCategories[this.selectedDocSubCategoryIndex].subSubCategories[this.selectedDocSubSubCategoryIndex].documents[index].file.path
            })
        } else {
            var indexToRemove = -1;
            this.products.selectedObject.documents.forEach((item, index) => {
                if (item.fileName === document.file.fileName) {
                    indexToRemove = index; 
                }
            });
            if (indexToRemove >= 0) {
                this.products.selectedObject.documents.splice(indexToRemove, 1);
            }
        }
    }

    // documents: [{
    //     categoryCode: { type: Number }, 
    //     categoryName: { type: String },
    //     fileName: { type: String },
    //     default: { type: Boolean, default: true } 
    //   }],

    removeDocument(index){
        this.products.selectedObject.documents.splice(index, 1);
    }

}