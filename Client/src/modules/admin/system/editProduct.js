import {inject} from 'aurelia-framework';
import {DataTable} from '../../../resources/utils/dataTable';
import {AppConfig} from '../../../config/appConfig';
import {Utils} from '../../../resources/utils/utils';
import {Systems} from '../../../resources/data/systems';
import {Products} from '../../../resources/data/products';
import {is4ua} from '../../../resources/data/is4ua';
import {CommonDialogs} from '../../../resources/dialogs/common-dialogs';
import Validation from '../../../resources/utils/validation';
import {DocumentsServices} from '../../../resources/data/documents';

@inject(DataTable, Products, Utils, Systems, is4ua, CommonDialogs, Validation, AppConfig, DocumentsServices)
export class EditProducts {
    productSelected = false;
    filesSelected = "";
    interfaceUpdate = false;
    showDocumentForm = false;
    showDocuments = false;
    selectedFiles;
    removedFiles = new Array();
    // spinnerHTML = "";

    tabs = [{id: 'Assignments'}, {id: 'Systems'}, {id: 'is4ua'}, {id: 'Documents'}, {id: 'Notes'}, {id: 'Description'}];
    tabPath = './';

    toolbar = [
		['style', ['style', 'bold', 'italic', 'underline','clear']],
		['color', ['color']],
        ['font', ['strikethrough', 'superscript', 'subscript']],
        ['fontsize', ['fontsize']],
		['layout', ['ul', 'ol', 'paragraph']],
		['insert', [ 'link', 'table', 'hello']],
		['misc', ['undo', 'redo', 'fullscreen', 'codeview']]
	];

    constructor(datatable, products, utils, systems, is4ua, dialog, validation, config, documents) {
        this.dataTable = datatable;
        this.dataTable.initialize(this);
        this.utils = utils;
        this.products = products;
        this.systems = systems;
        this.is4ua = is4ua;
        this.dialog = dialog;
        this.config = config;
        this.documents = documents;
        this.validation = validation;
        this.validation.initialize(this);
        this._setupValidation();

        this.systemChanges = new Array();
    }

    async attached(){
        $('[data-toggle="tooltip"]').tooltip();
        $('#loading').show();
        let responses = await Promise.all([
            this.products.getProductsArray('?order=name', true),
            this.systems.getSystemsArray('?order=sid', true),
            this.is4ua.loadIs4ua(),
            this.documents.getDocumentsCategoriesArray(),
            this.config.getConfig()
        ]);
        this.dataTable.updateArray(this.products.productsArray);
        this.filteredDocumentArray = this.documents.docCatsArray;
        this.dataTable.createPageButtons(1);
        $('#loading').hide();
        this.initialLoaded = true;
    }

    async activate() {
        this.initialLoaded = false;
    }

    async refresh() {
        // this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
        $('#loading').show();
        await this.products.getProductsArray('?order=name', true);
        this.dataTable.updateArray(this.products.productsArray);
        // this.spinnerHTML = "";
        $('#loading').hide();
    }

    async new() {
        this.editIndex = -1;
        this.products.selectProduct();
        this.editSystemsString = "";
        this.newProduct = true;
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
        this.editIndex = this.dataTable.getOriginalIndex(index);
        this.products.selectProduct(this.editIndex);
         this.newProduct = false;

        if(!this.products.selectedProduct.systems) this.products.selectedProduct.systems = new Array();
        if(!this.products.selectedProduct.clientInfo) this.products.selectedProduct.clientInfo = "";
        if(!this.products.selectedProduct.productInfo) this.products.selectedProduct.productInfo = "";

        this.camelizedProductName = this.utils.toCamelCase(this.products.selectedProduct.name);

        //Editing a product
        $("#editClientKey").focus();

        //Reset the selected row
        if (this.selectedRow) this.selectedRow.children().removeClass('info');
        this.selectedRow = $(el.target).closest('tr');
        this.selectedRow.children().addClass('info')
        this.productSelected = true;
    }

    cancel() {
        this.products.selectProduct(this.editIndex);
    }

    async save() {
        if(this.validation.validate(1)){
            let serverResponse = await this.products.saveProduct();
            if (!serverResponse.error) {
                if(this.systemChanges.length > 0) {                  
                    if(this.newProduct){                        
                        this.systemChanges.forEach(item => {
                            item.productId = serverResponse._id;
                        })
                    }
                    let response = await this.systems.saveProductChanges(this.systemChanges);
                }
                this.dataTable.updateArray(this.products.productsArray);
                this.utils.showNotification("Product " + serverResponse.name + " was updated");
            } else {
                this.utils.showNotification("There was a problem updating the product",'error');
            }
            this. _cleanUp();
        }
    }

    delete(){
        return this.dialog.showMessage(
            "Are you sure you want to delete the product?", 
            "Delete Product", 
            ['Yes', 'No']
            ).whenClosed(response => {
                if(!response.wasCancelled){
                    this.deleteProduct();    
                }
            });
    }

    async deleteProduct(){
        return this.dialog.showMessage(
        "Are you sure you want to delete this product?", 
        "Delete Product", 
        ['Yes', 'No']
        ).whenClosed(response => {
            if(!response.wasCancelled){
                this.deleteAProduct();
            }
        });
       
    }

   async deleteAProduct(){
        var name = this.products.selectedProduct.name;
        let serverResponse = await this.products.deleteProduct();
        if (!serverResponse.error) {
                this.dataTable.updateArray(this.products.productsArray);
                this.utils.showNotification("Product " + name + " was deleted");
        }
        this._cleanUp();
        this.productSelected = false;
    }

    _cleanUp(){
        this.newProduct = false; 
        this.productSelected = false;
        this.systemChanges = new Array();
        this._cleanUpFilters();
        this.validation.makeAllValid(1);
    }

    _cleanUpFilters(){
        this.nameFilterValue = "";
        this.systemFilterValue = "";
        this.activeFilter = "";
        this.sapNameFilterValue = "";

        this.dataTable.updateArray(this.products.productsArray);
    }

    back() {
        if(this.products.isDirty().length){
            return this.dialog.showMessage(
                "The product has been changed. Do you want to save your changes?", 
                "Save Changes", 
                ['Yes', 'No']
                ).whenClosed(response => {
                    if(!response.wasCancelled){
                        this.save();
                    } else {
                        this.productSelected = false;
                        this._cleanUp();
                    }
                });            
        } else {
            this.productSelected = false;
            this._cleanUp();
        }

    }

    addDocument(index){
        if(!this.products.selectedProduct.documents) this.products.selectedProduct.documents = new Array();
        for(var i = 0; i < this.products.selectedProduct.documents.length; i++){
            if(this.products.selectedProduct.documents[i].fileName == this.documents.selectedDocument.files[index].fileName){
                return;
            }
        }
        var newDoc = {
            categoryCode: this.documents.selectedDocument.categoryCode,
            categoryName: this.documents.selectedDocument.name,
            fileName: this.documents.selectedDocument.files[index].fileName,
            default: true
        }
        this.products.selectedProduct.documents.push(newDoc);
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
        this.products.selectedProduct.documents[index].default = ! this.products.selectedProduct.documents[index].default;
    }

    removeDocument(index){
        this.products.selectedProduct.documents.splice(index, 1);
    }

    async typeChanged(index){
      if(index >= 0){
        this.categoryIndex = index;
        this.documents.selectCategory(index);
        await this.documents.getDocumentsArray(true, '?filter=categoryCode|eq|' + this.documents.selectedCat.code);
        this.showDocuments = true; 
        this.showDocumentForm = false;
      }
    }

    _setupValidation(){
        this.validation.addRule(1,"editName",[{"rule":"required","message":"Product name is required", "value": "products.selectedProduct.name"},
         {"rule":"custom", "message":"A product with that name already exists",
            "valFunction":function(context){
                var found = false;
                for(var i = 0; i < context.products.productsArray.length; i++){
                    if( context.products.productsArray[i].name && context.products.productsArray[i].name.toUpperCase() === context.products.selectedProduct.name.toUpperCase()){
                        if(context.products.selectedProduct._id && context.products.selectedProduct._id != context.products.productsArray[i]._id){
                            found = true;
                        } else if (!context.products.selectedProduct._id){
                            found = true;
                        }
                    }
                }
                return !found;
            }}]);
    }

    async changeTab(el, index){
        $("#productListGroup.list-group").children().removeClass('menuButtons');
        $("#productListGroup.list-group").children().css("background-color","");
        $("#productListGroup.list-group").children().css("color","");
        $(el.target).parent().css("background-color",this.config.BUTTONS_BACKGROUND);
        $(el.target).parent().css("color",this.config.ACTIVE_SUBMENU_COLOR);
        $(".in").removeClass('active').removeClass('in');
        $("#" + el.target.id + "Tab").addClass('in').addClass('active');
    }

	systemCustomFilter(value, item, context){
		for(let i = 0; i < item.systems.length; i++){
			if(item.systems[i].sid.toUpperCase().indexOf(value.toUpperCase()) > -1) return true;
        }
        return false;
	}
}
