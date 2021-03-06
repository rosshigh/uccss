import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";
import {CommonDialogs} from '../../../resources/dialogs/common-dialogs';
import {Utils} from '../../../resources/utils/utils';
import {Inventory} from '../../../resources/data/inventory';
import {Events} from '../../../resources/data/events';
import Validation from '../../../resources/utils/validation';
import {DataTable} from '../../../resources/utils/dataTable';
import {AppConfig} from '../../../config/appConfig';
import {DocumentsServices} from '../../../resources/data/documents';

import moment from 'moment';

@inject(Router,  Inventory, Validation, Utils, DataTable, AppConfig, CommonDialogs, DocumentsServices, Events)
export class EditInventory {
    systemSelected = false;
    spinnerHTML = "";
    addressSelected = false;
    showDocumentForm = false;
    showDocuments = false;
    address = "";
    description = "";
    title="Inventory";

    tabs = [ {id: 'Maintenance', title: 'Maintenance'}, {id: 'History', title: 'History'},{id: 'Purchase', title: 'Purchase'}, {id: 'Technical', title: "Technical"}, {id: 'Documents', title: "Documents"}];
    tabPath = './';

    constructor(router, inventory, validation, utils, datatable, config, dialog, documents, events) {
        this.router = router;
        this.inventory = inventory;
        this.utils = utils;
        this.validation = validation;
        this.validation.initialize(this);
        this.dataTable = datatable;
        this.dataTable.initialize(this);
        this.config = config;
        this.dialog = dialog;
        this.documents = documents;
        this.eventLayer = events;
        // this._setupValidation();

         this.userObj = JSON.parse(sessionStorage.getItem('user'));
    }

    attached(){
        $('[data-toggle="tooltip"]').tooltip();
    }

    async activate() {
        let responses = await Promise.all([
            this.inventory.getInventoryArray('?order=systemName', true),
            this.config.getConfig(),
            this.documents.getDocumentsCategoriesArray(),
            this.config.getSessions(),
            this.eventLayer.getEventsArray('', true)
        ]);

        this.dataTable.updateArray(this.inventory.inventoryArray);
        this.filteredDocumentArray = this.documents.docCatsArray;
    }

    async refresh() {
        this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
        await this.inventory.getInventoryArray('?order=systemName', true);
		this.dataTable.updateArray(this.inventory.inventoryArray);
        this.spinnerHTML = "";
    }

    new() {
        this.editIndex = -1;
        this.inventory.selectInventory();
        $("#editSystemName").focus();
        this.systemSelected = true;
    }

    edit(index, el) {
         this.editIndex = this.dataTable.displayArray[index + parseInt(this.dataTable.startRecord)].baseIndex;
        this.inventory.selectInventory(this.editIndex);
        this.systemSelected = true;
        $("#editSystemName").focus();
        this.isDuplicate = false;

        this.eventScheduled = false;
        this.eventLayer.eventArray.forEach(item => {
            if(item.title.indexOf(this.inventory.selectedInventory.systemName) > -1){
                this.eventScheduled = true;
                this.eventObject = {
                    day: moment(item.start).format('YYYY-MM-DD')
                }
            }
        })

        if (this.selectedRow) this.selectedRow.children().removeClass('info');
        this.selectedRow = $(el.target).closest('tr');
        this.selectedRow.children().addClass('info')
    }

    async save(){
        let response = this.inventory.saveInventory();
        if(!response.error){
            this.utils.showNotification('The system was saved')
        }
        this._cleanUp();
    }

    async delete(){
        this.dialog.showMessage(
            "Are you sure you want to delete this device?",
            "Delete",
            ['Yes', 'No']
          ).whenClosed(response => {
            if (!response.wasCancelled) {
               this.deleteIt();
            }
          });
    }
    
    async deleteIt(){
        await this.inventory.deleteInventory();
        this._cleanUp();
        this.refresh();
    }

    _cleanUp(){
         this.systemSelected = false;
    }

    duplicate(){
      delete this.inventory.selectedInventory._id;
      this.isDuplicate = true;
      this.utils.showNotification('The inventory item was duplicated. You must save it to create the database record.');
    }

    cancel(){

    }

    back(){
        this.systemSelected = false;
    }

    newIP(){
        this.address = "";
        this.description = "";
        this.selectedAddress = -1;
        this.addressSelected = true;
    }

    editIP(index, event){
        this.selectedAddress = index;
        this.address = this.inventory.selectedInventory.IPAddress[index].address;
        this.description = this.inventory.selectedInventory.IPAddress[index].description;
    }

    saveAddress(){
        if(this.selectedAddress > -1){
            this.inventory.selectedInventory.IPAddress[this.selectedAddress].address = this.address;
            this.inventory.selectedInventory.IPAddress[this.selectedAddress].description = this.description;
        } else {
            this.inventory.selectedInventory.IPAddress.push({
                "address": this.address,
                "description": this.description
            })
        }
         this.addressSelected = false;
    }

    cancelEditAddress(){
          if(this.selectedAddress > -1){
            this.address = this.inventory.selectedInventory.IPAddress[this.selectedAddress].address;
            this.description = this.inventory.selectedInventory.IPAddress[this.selectedAddress].description;
        } else {
            this.address = "";
            this.description = "";
        }
    }

    addDocument(index){
        if(!this.inventory.selectedInventory.documents) this.inventory.selectedInventory.documents = new Array();
        for(var i = 0; i < this.inventory.selectedInventory.documents.length; i++){
            if(this.inventory.selectedInventory.documents[i].fileName == this.documents.selectedDocument.files[index].fileName){
                return;
            }
        }
        var newDoc = {
            categoryCode: this.documents.selectedDocument.categoryCode,
            categoryName: this.documents.selectedDocument.name,
            fileName: this.documents.selectedDocument.files[index].fileName,
            default: true
        }
        this.inventory.selectedInventory.documents.push(newDoc);
    }

    chooseDocument(index, event){
        this.documents.selectDocument(index);

        //Reset the selected row
        if (this.selectedRow) this.selectedRow.children().removeClass('info');
        this.selectedRow = $(event.target).closest('tr');
        this.selectedRow.children().addClass('info')
        this.showDocumentForm = true;
    }

    toggleDefault(index){
        this.inventory.selectedInventory.documents[index].default = ! this.inventory.selectedInventory.documents[index].default;
    }

    removeDocument(index){
        this.inventory.selectedInventory.documents.splice(index, 1);
    }

    async scheduleEvent(){
        if(this.inventory.selectedInventory.maintenanceAlert === "0" || !this.inventory.selectedInventory.maintenanceAlert){
            this.utils.showNotification('You have to enter a number of days.','warning')
            return;
        }

        this.eventLayer.selectEvent();
        this.eventLayer.selectedEvent.start = moment(this.inventory.selectedInventory.maintenanceEndDate).subtract(parseInt(this.inventory.selectedInventory.maintenanceAlert), 'days');
        this.eventLayer.selectedEvent.end = this.eventLayer.selectedEvent.start
        this.eventLayer.selectedEvent.title = this.inventory.selectedInventory.systemName + ' expiration notice';
        this.eventLayer.selectedEvent.personId = this.userObj._id;
        this.eventLayer.selectedEvent.scope = "u";
    
        let response = await this.eventLayer.saveEvent();
        if(!response.error){
            this.utils.showNotification('The event was scheuled');
        }
    }

    async typeChanged(index){
      if(index >= 0){
        this.categoryIndex = index;
        this.documents.selectCategory(index);
        await this.documents.getDocumentsArray(true, '?filter=categoryCode|eq|' + this.documents.selectedCat.code);
        this.showDocuments = true;
      }
    }

    filterList(){
        if(this.filter){
            var thisFilter = this.filter
            this.filteredDocumentArray = this.documents.docCatsArray.filter((item) => {
            return item.description.substring(0, thisFilter.length).toUpperCase() === thisFilter.toUpperCase();
            });
        } else {
            this.filteredDocumentArray = this.documents.docCatsArray;
        }
    }

    async changeTab(el, index){
        $("#invFormListGroup.list-group").children().removeClass('active');
        $(el.target).parent().addClass('active');
        $(".in").removeClass('active').removeClass('in');
        $("#" + el.target.id + "Tab").addClass('in').addClass('active');
    }
}