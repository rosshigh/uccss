import { inject } from 'aurelia-framework';
import { ValidationRules, ValidationControllerFactory, validationMessages } from 'aurelia-validation';
import { DocumentsServices } from '../../../resources/data/documents';
import { DialogService } from 'aurelia-dialog';
import { ConfirmDialog } from '../../../resources/dialogs/confirm-dialog';
import { MessageDialog } from '../../../resources/dialogs/message-dialog';
import { Utils } from '../../../resources/utils/utils';
import { AppConfig } from '../../../appConfig';
// import { Store } from '../../../store/store';

@inject(ValidationControllerFactory, DocumentsServices, Utils, DialogService, AppConfig)
export class Documents {

    pageSize = 200;
    selectedSubCatoryIndex = -1;

    constructor(ValidationControllerFactory, documents, utils, dialogService, config) {
        this.controller = ValidationControllerFactory.createForCurrentScope();
        this.documents = documents;
        this.utils = utils;
        this.dialogService = dialogService;
        this.config = config;

        this.view = 'categoryList';
        this.showDocuments = false;
        this.userObj = JSON.parse(sessionStorage.getItem('user'));

        this.pageTitle = 'File Management';

        this.systemMessage = sessionStorage.getItem('systemMessage');

    }

    toggleTheSideBar(){
        this.sideBarShown = !this.sideBarShown;
        if(!this.sideBarShown){
            $('#sidebar').hide();
            $('.main-panel').css('width','100%');
        } else {
            $('#sidebar').show();
            $('.main-panel').css('width','');
        }
    }

    async attached() {
        $('[data-toggle="tooltip"]').tooltip();
        $(".hover").css("display", "none");
        $('.selectpicker').selectpicker();
        this.refresh();
        $("#systemMessage").fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500);
    }

    toggleListItem(el, object, type, index) {
       
        if(!this.documents.selectedCat || object._id !== this.documents.selectedCat._id){
            this.documents.setCategory(object);
        }
        if(type === "C"){
            this.categorySelected = true;
            this.selectedSubCategoryIndex = -1;
            this.selectedSubSubCategoryIndex = -1;
        }
        if(type === 'S'){
            this.selectedSubCategoryIndex = index;
        }
        let thisElement = el.target;
        thisElement.parentElement.querySelector(".nested").classList.toggle("active");
        thisElement.classList.toggle("caret-down");
        el.stopPropagation();
    }

    refreshSelects() {
        this.utils.refreshSelect("#editCategory", this.config.DOCUMENT_CATGORIES, "code", this.documents.selectedCat.category);
    }

    async refresh() {
        let responses = await Promise.all([
            this.documents.getDocumentsCategoriesArray("?filter=[or]category|DOC:CUR:SOF:HPT:USE"),
        ]);
        this.filterList();
        this.showDocumentForm = false;
    }

    filterList() {
        if (this.filter) {
            let thisFilter = this.filter.toUpperCase();
            this.filteredDocumentArray = this.documents.objectCategoriesArray.filter((item) => {
                return item.description.toUpperCase().indexOf(thisFilter) > -1;
            });
        } else {
            this.filteredDocumentArray = this.documents.objectCategoriesArray;
        }
    }

    newCategory() {
        this.documents.selectCategory();
        this.documents.selectedCat.sortOrder = this.documents.objectCategoriesArray.length
        this.refreshSelects();
        this.modalTitle = "New Category";
        $('#categoryModal').modal('show');
        setTimeout(()=>{
            $('#categoryInput').focus();
        }, 500);
    }

    editCategory(obj, index, el) {
        this.selectedCategory = index;
        this.refreshSelects();
        this.modalTitle = "Edit Category";
        $('#categoryModal').modal('show');
        setTimeout(()=>{
            $('#categoryInput').focus();
        }, 500);
        el.stopPropagation();
    }

    async deleteCategory(index) {
        this.selectedCategory = index;
        let message = 'Are you sure you want to delete this category?';
        let title = "Confirm Delete";
        let options = {};
        this.dialogService.open({ viewModel: ConfirmDialog, model: { message, title, options }, lock: false }).whenClosed(response => {
            if (!response.wasCancelled) {
                this.deleteTheCategory();
            }
        });
    }

    async deleteTheCategory() {
        let serverResponse = this.documents.deleteCategory();
        if (!serverResponse.error) {
            this.utils.showNotification("Category Deleted");
        }
        this.categorySelected = false;
        this.cleanUp();
    }
    
    newSubCategory() {
        this.documents.selectedCat.subCategories.push(this.documents.emptySubCat());
        this.selectedSubCategoryIndex = this.documents.selectedCat.subCategories.length - 1;
        this.newSubCategoryFlag = true;
        this.modalTitle = "New Subcategory";
        $('#subCategoryModal').modal('show');
        setTimeout(()=>{
            $('#subCategoryInput').focus();
        }, 500);
    }

    editSubCategory() {
        this.newSubCategoryFlag = false;
        this.modalTitle = "Edit Subcategory";
        $('#subCategoryModal').modal('show');
        setTimeout(()=>{
            $('#subCategoryInput').focus();
        }, 500);
    }

    async deleteSubCategory() {
        let message = 'Are you sure you want to delete this subcategory?';
        let title = "Confirm Delete";
        let options = {};
        this.dialogService.open({ viewModel: ConfirmDialog, model: { message, title, options }, lock: false }).whenClosed(response => {
            if (!response.wasCancelled) {
                this.deleteTheSubCategory();
            }
        });
    }

    async deleteTheSubCategory() {
        this.documents.selectedCat.subCategories.splice(this.selectedSubCategoryIndex, 1);
        this.selectedSubCategoryIndex = -1;
        this.saveCategory();
    }

    newSubSubCategory() {;
        if (!this.documents.selectedCat.subCategories[this.selectedSubCategoryIndex ].subSubCategories) this.documents.selectedCat.subCategories[this.selectedSubCategoryIndex ].subSubCategories = [];
        this.documents.selectedCat.subCategories[this.selectedSubCategoryIndex ].subSubCategories.push(this.documents.emptySubSubCat(this.selectedSubCategoryIndex ));
        this.selectedSubSubCategoryIndex = this.documents.selectedCat.subCategories[this.selectedSubCategoryIndex].subSubCategories.length - 1;
        this.documents.selectedCat.subCategories[this.selectedSubCategoryIndex ].subSubCategories[this.selectedSubSubCategoryIndex].sortOrder = this.selectedSubSubCategoryIndex + 1;
        this.newSubSubCategoryFlag = true;
        $('#subSubCategoryModal').modal('show');
        setTimeout(()=>{
            $('#subSubCategoryInput').focus();
        }, 500);
    }

    editSubSubCategory() {
        this.newSubSubCategoryFlag = false;
        $('#subSubCategoryModal').modal('show');
        setTimeout(()=>{
            $('#subSubCategoryInput').focus();
        }, 500);
    }

    deleteSubSubCategory(obj, parent, parentParent, el) {
        let message = 'Are you sure you want to delete this subcategory?';
        let title = "Confirm Delete";
        let options = {};
        this.dialogService.open({ viewModel: ConfirmDialog, model: { message, title, options }, lock: false }).whenClosed(response => {
            if (!response.wasCancelled) {
                this.deleteTheSubSubCategory();
            }
        });
    }

    findIndex(array, value, property){
        let arrayIndex = -1;
        array.forEach((item, index) => {
            if(item[property] == value){
                arrayIndex = index;
            }
        })
        return arrayIndex;
    }

    deleteTheSubSubCategory() {
        this.documents.selectedCat.subCategories[this.selectedSubCategoryIndex].subSubCategories.splice(this.selectedSubSubCategoryIndex, 1);
        this.selectedSubSubCategoryIndex = -1;
        this.saveCategory();
    }

    async validateCategoryToSave() {
        this.categoriesToSave = [];
        if (this.documents.selectedCat.category === 'CUR') this.checkCurriculum();
        if (this.documents.selectedCat.category === 'SOF') this.checkDownloads();
        await this.saveCategory();
        if (this.categoriesToSave.length) {
            for (let i = 0; i < this.categoriesToSave.length; i++) {
                this.documents.setCategory(this.categoriesToSave[i]);
                await this.saveCategory();
            }
        }
    }

    async saveCategory() {
        let serverResponse = await this.documents.saveCategory(); 
        if (!serverResponse.error) {
            this.utils.showNotification("Category Saved");
            if (this.filesToUpload && this.filesToUpload.length) {
                let filePrefix = this.documents.selectedCat.DocCode + ':' + this.selectedSubCategoryIndex + ':' + this.selectedSubSubCategoryIndex + ':' + this.editDocumentIndex;
                this.documents.uploadFile(this.filesToUpload, filePrefix);
            }
        }
        this.cleanUp();
        $('#categoryModal').modal('hide');
        $('#subCategoryModal').modal('hide');
        $('#subSubCategoryModal').modal('hide');
    }

    checkCurriculum() {
        this.documents.objectCategoriesArray.forEach(item => {
            if (item.category === 'CUR' && item.DocCode != this.documents.selectedCat.DocCode) {
                item.category = 'DOC';
                this.categoriesToSave.push(item);
            }
        })
    }

    checkDownloads() {
        this.documents.objectCategoriesArray.forEach(item => {
            if (item.category === 'SOF' && item.DocCode != this.documents.selectedCat.DocCode) {
                item.category = 'DOC';
                this.categoriesToSave.push(item);
            }
        })
    }

    showSubCategoryDocuments(object, SubCategoryIndex, SubSubCategoryIndex, el) {
        if(object._id !== this.documents.selectedCat._id){
            this.documents.setCategory(object);
        }

        // this.documents.setCategory(category);
        this.selectedSubCategoryIndex = SubCategoryIndex;
        this.selectedSubSubCategoryIndex = SubSubCategoryIndex;
        this.showDocuments = true;
        setTimeout(()=>{$('[data-toggle="tooltip"]').tooltip();}, 1000);
        el.stopPropagation();
    }

    cleanUp() {
        this.refresh();
        this.backCategory();
        this.showDocumentForm = false;
        this.showSaveButton = false;
        this.editDocumentIndex = -1;
        this.filesToUpload = new Array();
        $('#CategoryForm').hide();
        $("#SubCategoryForm").hide();
        $("#SubSubCategoryForm").hide();
    }

    backCategory() {
        this.view = 'categoryList';
    }

    cancelEditCategory() {
        $('#CategoryForm').hide();
        $("#SubCategoryForm").hide();
        $("#SubSubCategoryForm").hide();
    }

    createDocument() {
        this.documents.setDocument();
        this.showDocumentForm = true;
        this.editDocumentIndex =  this.documents.selectedCat.subCategories[this.selectedSubCategoryIndex].subSubCategories[this.selectedSubSubCategoryIndex].documents.length;
        this.createValidationRules();
        setTimeout(()=>{
            $('#documentName').focus();
        }, 500);
    }

    createValidationRules() {
        validationMessages['required'] = 'You must enter \${$displayName}.'
        ValidationRules
            .ensure('name').displayName('a Name').required()
            .on(this.documents.selectedDocument);
    }

    changeFiles() {
        this.filesToUpload = new Array();
        this.filesToUpload.push(this.files[0]);
    }

    removeFile(index) {
        this.filesToUpload.splice(index, 1);
    }

    saveDocument() {
        this.controller.validate()
            .then(result => {
                if (result.valid) {
                    if (this.filesToUpload && this.filesToUpload.length) {
                        if (this.editDocumentIndex === this.documents.selectedCat.subCategories[this.selectedSubCategoryIndex].subSubCategories[this.selectedSubSubCategoryIndex].documents.length) {
                            this.documents.selectedDocument.file = {
                                fileName: this.filesToUpload[0].name,
                                size: this.filesToUpload[0].size,
                                personId: this.userObj._id
                            };
                            this.documents.selectedCat.subCategories[this.selectedSubCategoryIndex].subSubCategories[this.selectedSubSubCategoryIndex].documents.push(this.documents.selectedDocument);
                        } else {
                            this.documents.selectedDocument.file.fileName = this.filesToUpload[0].name;
                            this.documents.selectedDocument.file.size = this.filesToUpload[0].size;
                            this.documents.selectedDocument.file.personId = this.userObj._id;
                            this.documents.selectedCat.subCategories[this.selectedSubCategoryIndex].subSubCategories[this.selectedSubSubCategoryIndex].documents[this.editDocumentIndex] = this.documents.selectedDocument;
                        };
                    } else {
                        this.documents.selectedCat.subCategories[this.selectedSubCategoryIndex].subSubCategories[this.selectedSubSubCategoryIndex].documents[this.editDocumentIndex] = this.documents.selectedDocument;
                    }
                    this.saveCategory();
                } else {
                    let message = 'You must fix the errors before you can save the document?';
                    let title = "Fix Errors";
                    let options = ['Ok'];
                    this.dialogService.open({ viewModel: MessageDialog, model: { message, title, options }, lock: false }).whenClosed(response => {
                        return;
                    });
                }
            });
    }

    async deleteDocument(document) {
        this.editDocumentIndex = this.findDocumentIndex(document);
        let message = 'Are you sure you want to delete this document?';
        let title = "Confirm Delete";
        let options = {};
        this.dialogService.open({ viewModel: ConfirmDialog, model: { message, title, options }, lock: false }).whenClosed(response => {
            if (!response.wasCancelled) {
                this.deleteTheDocument();
            }
        });
    }

    async deleteTheDocument() {
        this.documents.selectedCat.subCategories[this.selectedSubCategoryIndex].subSubCategories[this.selectedSubSubCategoryIndex].documents.splice(this.editDocumentIndex, 1);
        await this.saveCategory();
    }

    editDocument(document) {
        this.documents.setDocument(document);
        this.showDocumentForm = true;
        this.showSaveButton = true;
        this.editDocumentIndex = this.findDocumentIndex(document);
        this.createValidationRules();
        setTimeout(()=>{
            $('#documentName').focus();
        }, 500);
    }

    findDocumentIndex(document){
        let documentIndex = -1;
        this.documents.selectedCat.subCategories[this.selectedSubCategoryIndex].subSubCategories[this.selectedSubSubCategoryIndex].documents.forEach((item, index) => {
            if(item.guid === document.guid){
                documentIndex = index;
            }
        })
        return documentIndex;
    }

    closeDocumentForm() {
        this.showDocumentForm = false;
    }

    toggleFileActive(document) {
        let index = this.findDocumentIndex(document);
        this.documents.selectedCat.subCategories[this.selectedSubCategoryIndex].subSubCategories[this.selectedSubSubCategoryIndex].documents[index].active =
            !this.documents.selectedCat.subCategories[this.selectedSubCategoryIndex].subSubCategories[this.selectedSubSubCategoryIndex].documents[index].active;
            this.saveCategory();
    }

}