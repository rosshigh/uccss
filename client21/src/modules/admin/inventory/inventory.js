import { inject } from 'aurelia-framework';
import { ValidationRules, ValidationControllerFactory, validationMessages } from 'aurelia-validation';
import { Inventory } from '../../../resources/data/inventory';
import { DocumentsServices } from '../../../resources/data/documents';
import { AppConfig } from '../../../appConfig';
import { Utils } from '../../../resources/utils/utils';

@inject(ValidationControllerFactory, Inventory, DocumentsServices, AppConfig, Utils)
export class ManageInventory {

    constructor(ValidationControllerFactory, inventory, documents, config, utils){
        this.controller = ValidationControllerFactory.createForCurrentScope();
        this.inventory = inventory;
        this.documents = documents;
        this.config = config;
        this.utils = utils;

        this.filters = [
            { value: '', keys: ['systemName'] },
            { value: '', keys: ['serialNumber'] },
            { value: '', keys: ['modelNumber'] },
            { value: '', keys: ['type'] }
        ];

        this.utils.publishPageTitle('Inventory')

        this.view = 'table';
    }

    clearFilters(){
        this.filters.forEach(item => {
            item = "";
        });
    }

    async activate(){
        $("#loading").show();
        let responses = await Promise.all([
          this.inventory.getObjectsArray()
        ]);
    }

    attached(){
        $("#loading").hide();
        $('[data-toggle="tooltip"]').tooltip();
    }

    async refresh() {
        $("#loading").show();
        await his.inventory.getObjectsArray();
        $("#loading").hide();
    }

    new() {
        this.inventory.selectInventory();
        $("#editSystemName").focus();
        this.isDuplicate = false;
        this.view = 'form';
    }

    edit(object) {
        this.inventory.setObject(object)
        $("#editSystemName").focus();
        this.isDuplicate = false;
        // this.utils.refreshSelect("#systemType", this.config.HARDWARE_TYPES, "type", this.inventory.selectedObject.type);
        this.view = 'form';
    }

    async save(){
        let response = this.inventory.saveObject();
        if(!response.error){
            this.utils.showNotification('The system was saved')
        }
        this._cleanUp();
    }

    async confirmDelete(){
        this.modalMessage = 'Are you sure you want to delete that system?'
       $("#confirmDeleteModal").modal('show');
    }
    
    async delete(){
        await this.inventory.deleteObject();
        this._cleanUp();
        this.refresh();
    }

    _cleanUp(){
         this.view = 'table';
    }

    duplicate(){
      delete this.inventory.selectedObject._id;
      this.isDuplicate = true;
      this.utils.showNotification('The inventory item was duplicated. You must save it to create the database record.');
    }

    back(){
        this.view = 'table';
    }

    filterArray() {
        this.downLoadArray = [];
        let keep;
        let nameFilter = this.filters[0].value.toUpperCase();
        let serNumFilter = this.filters[1].value.toUpperCase();
        let modeNumFilter = this.filters[2].value.toUpperCase();
        let typeFilter = this.filters[3].value.toUpperCase();
        this.inventory.objectsArray.forEach(item => {
            keep = false;
            if (nameFilter.length) {
                keep = (item.systemName !== null && item.systemName.toUpperCase().indexOf(nameFilter) > -1);
            } else {
                keep = true;
            }
            if (keep) this.downLoadArray.push(item);
        });
        if (serNumFilter.length) {
            this.downLoadArray = this.downLoadArray.filter(item => {
                return item.serialNumber !== null && item.serialNumber.toUpperCase().indexOf(serNumFilter) > -1;

            })
        }
        if (modeNumFilter.length) {
            this.downLoadArray = this.downLoadArray.filter(item => {
                return item.modelNumber !== null && item.modelNumber.toUpperCase().indexOf(modeNumFilter) > -1;

            })
        }
        if (typeFilter.length) {
            this.downLoadArray = this.downLoadArray.filter(item => {
                return item.type !== null && item.type.indexOf(typeFilter) > -1;

            })
        }

    }

    fnExcelReport() {
        this.filterArray();
        var tab_text = "<table><tr><th>Name</th><th>Serial Number</th><th>Model Number</th><th>Type</th></tr><tr>";

        this.downLoadArray.forEach(item => {
            tab_text = tab_text + "<td>" + item.systemName + "</td>"
                + "<td>" + item.serialNumber + "</td>"
                + "<td>" + item.modelNumber + "</td>"
                + "<td>" + item.type + "</td></tr>";
        });

        tab_text = tab_text + "</table>";

        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");

        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
            txtArea1.document.open("txt/html", "replace");
            txtArea1.document.write(tab_text);
            txtArea1.document.close();
            txtArea1.focus();
            sa = txtArea1.document.execCommand("SaveAs", true, "inventory.xls");
        } else {
            var link = document.createElement('a');
            link.download = "inventory.xls";
            link.href = 'data:application/vnd.ms-excel,' + encodeURIComponent(tab_text);
            link.click();
        }
    }
}