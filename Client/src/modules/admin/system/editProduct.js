import {inject} from 'aurelia-framework';
import {DataTable} from '../../../resources/utils/dataTable';
import {AppConfig} from '../../../config/appConfig';
import {Utils} from '../../../resources/utils/utils';
import {Systems} from '../../../resources/data/systems';
import {Products} from '../../../resources/data/products';
import {is4ua} from '../../../resources/data/is4ua';
import {ConfirmDialog} from '../../../resources/elements/confirm-dialog';
import Validation from '../../../resources/utils/validation';
import {DialogService} from 'aurelia-dialog';
import $ from 'jquery';

@inject(DataTable, Products, Utils, Systems, is4ua, DialogService, Validation, AppConfig)
export class EditProducts {
    productSelected = false;
    filesSelected = "";
    interfaceUpdate = false;
    navControl = "productNavButtons";
    selectedFiles;
    removedFiles = new Array();
    spinnerHTML = "";

    tabs = [{id: 'Systems'},{id: 'Assignments'}, {id: 'is4ua'}];
    tabPath = './';

    constructor(datatable, products, utils, systems, is4ua, dialog, validation, config) {
        this.dataTable = datatable;
        this.dataTable.initialize(this);
        this.utils = utils;
        this.products = products;
        this.systems = systems;
        this.is4ua = is4ua;
        this.dialog = dialog;
        this.config = config;
        this.validation = validation;
        this._setupValidation();
    }

    attached(){
        $('[data-toggle="tooltip"]').tooltip();
    }

    async activate() {
        await this.getData();
    }

    async getData() {
      let responses = await Promise.all([
        this.products.getProductsArray(true, '?order=name'),
        this.systems.getSystemsArray(true, '?order=sid'),
        this.is4ua.loadIs4ua()
      ]);

        this.updateArray();
        this.dataTable.createPageButtons(1);
    }

    async refresh() {
        this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
        await this.products.getProductsArray(true, '?order=name');
        this.updateArray();
        this.spinnerHTML = "";
    }

    updateArray(){
        this.displayArray = this.products.productsArray;
        this.baseArray = this.displayArray;

        for (var i = 0; i < this.baseArray.length; i++) {
            this.baseArray[i].baseIndex = i;
        }
        this. _cleanUpFilters();
    }

    async new() {
        this.editIndex = -1;
        this.products.selectProduct();
        this.editSystemsString = "";
        this.newSystem = true;
        this.selectedProductSystems = new Array();
        if (this.files && this.files.length !== 0) {
            $("#uploadFiles").wrap('<form>').closest('form').get(0).reset();
            $("#uploadFiles").unwrap();
            this.files = [];
        }
        $("#editClientKey").focus();
        this.productSelected = true;
    }

    async edit(index, el) {
        this.editIndex = this.displayArray[index + parseInt(this.dataTable.startRecord)].baseIndex;
        this.displayIndex = index + parseInt(this.dataTable.startRecord);
        this.products.selectProduct(this.editIndex);

        this.editSystemsString = "";
        if(this.products.selectedProduct.systems){
            for (var i = 0, x = this.products.selectedProduct.systems.length; i < x; i++) {
                this.editSystemsString += this.products.selectedProduct.systems[i].sid + " "
            }
        }

        this.camelizedProductName = this.utils.toCamelCase(this.products.selectedProduct.name);

        //Editing a product
        $("#editClientKey").focus();

        //Reset the selected row
        if (this.selectedRow) this.selectedRow.children().removeClass('info');
        this.selectedRow = $(el.target).closest('tr');
        this.selectedRow.children().addClass('info')
        this.productSelected = true;
    }

    deleteFile(index){
        this.removedFiles.push(this.products.selectedProduct.files.splice(index,1));
    }

    changeFiles() {
        this.filesSelected = "";
        this.selectedFiles = new Array();
        for(var i = 0; i<this.files.length; i++){
             this.selectedFiles.push(this.files[i].name);
              this.filesSelected += this.files[i].name + " ";
        }
    }

    cancel() {
        if (this.editIndex == -1) {
            this.aNewProduct();
        } else {
            this.products.selectProduct(this.editIndex);
        }
        for(var i=0; i<this.removedFiles.length; i++){
            this.products.selectedProduct.files.push(this.removedFiles[i][0]);
        }
        this.selectedFiles = new Array();
        this.files = undefined;

         this.editSystemsString = "";
        if(this.products.selectedProduct.systems){
            for (var i = 0, x = this.products.selectedProduct.systems.length; i < x; i++) {
                this.editSystemsString += this.products.selectedProduct.systems[i].sid + " "
            }
        }
    }

    async save() {
        if(this.validation.validate(1, this)){
            let serverResponse = await this.products.saveProduct();
            if (!serverResponse.error) {
                this.updateArray();
                this.utils.showNotification("Product " + this.baseArray[this.editIndex].name + " was updated", "", "", "", "", 5);
                if (this.files && this.files.length > 0) this.products.uploadFile(this.files);
            }

            this. _cleanUp();
            this.productSelected = false;
            this.selectedFiles = new Array();
            this.files = undefined;
        }
    }

    delete(){
        var cmd = {
            header : "Delete Product",
            message : "Are you sure you want to delete the product?",
            cancelButton : false,
            okButton : true
        };

        this.dialog.open({ viewModel: ConfirmDialog, model: cmd}).then(response => {
            if (!response.wasCancelled) {
                this.deleteProduct();
            }
        });
    }

    async deleteProduct(){
        var name = this.products.selectedProduct.name;
        let serverResponse = await this.products.deleteProduct();
        if (!serverResponse.error) {
                this.updateArray();
                this.utils.showNotification("Product " + name + " was deleted", "", "", "", "", 5);
        }
        this.productSelected = false;
    }

    _cleanUp(){
        this.filesSelected = "";
    }

    _cleanUpFilters(){
        $("#name").val("");
        $("#systems.sid").val("");
        $("#sapName").val("");
        $("#active").val("");
    }

    back() {
        if(this.products.isDirty().length){
            var cmd = {
                header : "Save Changes",
                message : "The product has been changed. Do you want to save your changes?",
                cancelButton : false,
                okButton : true
            };

            this.dialog.open({ viewModel: ConfirmDialog, model: cmd}).then(response => {
                if (!response.wasCancelled) {
                   this.save();
                } else {
                    this.productSelected = false;
                }
            });

        } else {
            this.productSelected = false;
        }

    }

    _setupValidation(){
        this.validation.addRule(1,"editName",{"rule":"required","message":"Product name is required", "value": "products.selectedProduct.name"});
    }

     changeTab(el, index){
        $("#productListGroup.list-group").children().removeClass('active');
        var target = $( event.target );
        if(target.is('a')) target = $(target.children()[0]);
        target.parent().addClass('active');
        $(".in").removeClass('active').removeClass('in');
        $("#" + target.html() + "Tab").addClass('in').addClass('active');
    }

}
