import { inject } from 'aurelia-framework';
import { ValidationRules, ValidationControllerFactory, validationMessages } from 'aurelia-validation';
import { DocumentsServices } from '../data/documents';
import { DialogService } from 'aurelia-dialog';
import { ConfirmDialog } from '../dialogs/confirm-dialog';
import { MessageDialog } from '../dialogs/message-dialog';
import { Utils } from '../utils/utils';
import { Store } from '../../store/store';
import { AppConfig } from '../../appConfig';

@inject(ValidationControllerFactory, DocumentsServices, Utils, Store, DialogService, AppConfig)
export class DocumentsManagementCustomElement {

    pageSize = 200;

    constructor(ValidationControllerFactory, documentsService, utils, store, dialogService, config) {
        this.controller = ValidationControllerFactory.createForCurrentScope();
        this.documentsService = documentsService;
        this.utils = utils;
        this.store = store;
        this.dialogService = dialogService;
        this.config = config;

        this.view = 'categoryList';
        this.showDocuments = false;
        this.userObj = this.store.getUser();
        this.configParameters = this.store.getConfig();

    }

    async attached() {
        $('[data-toggle="tooltip"]').tooltip();
        $(".hover").css("display", "none");
        $('.selectpicker').selectpicker();
        this.refresh();
    }

    toggleListItem(el, id) {
        let thisElement = el.target;
        thisElement.parentElement.querySelector(".nested").classList.toggle("active");
        thisElement.classList.toggle("caret-down");
        el.stopPropagation();
    }

    refreshSelects() {
        this.utils.refreshSelect("#editCategory", this.config.DOCUMENT_CATGORIES, "code", this.documentsService.selectedCat.category);
    }

    async refresh() {
        let responses = await Promise.all([
            this.documentsService.getDocumentsCategoriesArray(),
        ]);
        this.filterList();
        this.showDocumentForm = false;
    }

    filterList() {
        if (this.filter) {
            let thisFilter = this.filter
            this.filteredDocumentArray = this.documentsService.objectCategoriesArray.filter((item) => {
                return item.description.toUpperCase().indexOf(thisFilter.toUpperCase()) > -1;
            });
        } else {
            this.filteredDocumentArray = this.documentsService.objectCategoriesArray;
        }
    }

    newCategory() {
        this.documentsService.selectCategory();
        this.refreshSelects();
        this.modalTitle = "New Category";
        // $('#CategoryForm').show()
        $('#categoryModal').modal('show');
        $('#categoryInput').focus();
    }

    editCategory(obj, index, el) {
        this.documentsService.setCategory(obj);
        this.selectedCategory = index;
        this.refreshSelects();
        this.modalTitle = "Edit Category";
        // $('#CategoryForm').show()
        $('#categoryModal').modal('show');
        $('#categoryInput').focus();
        el.stopPropagation();
    }

    async deleteCategory() {
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
        let serverResponse = this.documentsService.deleteCategory();
        if (!serverResponse.error) {
            this.utils.showNotification("Category Deleted");
        }
        this.cleanUp();
    }
    
    newSubCategory(obj, el) {
        this.documentsService.setCategory(obj);
        this.documentsService.selectedCat.subCategories.push(this.documentsService.emptySubCat());
        this.selectedSubCategoryIndex = this.documentsService.selectedCat.subCategories.length - 1;
        this.newSubCategoryFlag = true;
        this.modalTitle = "New Subcategory";
        // $("#SubCategoryForm").show();
        $('#subCategoryModal').modal('show');
        $("#subCategoryInput").focus();
        el.stopPropagation();
    }

    editSubCategory(index, category, el) {
        this.documentsService.setCategory(category);
        this.selectedSubCategoryIndex = index;
        let descriptionNoSpaces = this.documentsService.selectedCat.subCategories[index].description.split(" ").join("");
        this.newSubCategoryFlag = false;
        this.modalTitle = "Edit Subcategory";
        // $("#SubCategoryForm").show();
        $('#subCategoryModal').modal('show');
        $("#subCategoryInput").focus();
        el.stopPropagation();
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
        this.documentsService.selectedCat.subCategories.splice(this.selectedSubCategoryIndex, 1);
        this.saveCategory();
    }

    newSubSubCategory(index, obj, el) {
        this.documentsService.setCategory(obj);
        this.selectedSubCategoryIndex = index;
        if (!this.documentsService.selectedCat.subCategories[index].subSubCategories) this.documentsService.selectedCat.subCategories[index].subSubCategories = [];
        this.documentsService.selectedCat.subCategories[index].subSubCategories.push(this.documentsService.emptySubSubCat(index));
        this.selectedSubSubCategoryIndex = this.documentsService.selectedCat.subCategories[index].subSubCategories.length - 1;
        this.newSubSubCategoryFlag = true;
        // $("#SubSubCategoryForm").show();
        $('#subSubCategoryModal').modal('show');
        $("#subSubCategoryInput").focus();
        el.stopPropagation();
    }

    editSubSubCategory(index, obj, subCatIndex, el) {
        this.documentsService.setCategory(obj);
        this.selectedSubCategoryIndex = subCatIndex;
        this.selectedSubSubCategoryIndex = index;
        this.newSubSubCategoryFlag = false;
        // $("#SubSubCategoryForm").show();
        $('#subSubCategoryModal').modal('show');
        $("#subSubCategoryInput").focus();
        el.stopPropagation();
    }

    deleteSubSubCategory() {
        let message = 'Are you sure you want to delete this subcategory?';
        let title = "Confirm Delete";
        let options = {};
        this.dialogService.open({ viewModel: ConfirmDialog, model: { message, title, options }, lock: false }).whenClosed(response => {
            if (!response.wasCancelled) {
                this.deleteTheSubSubCategory();
            }
        });
    }

    deleteTheSubSubCategory() {
        this.documentsService.selectedCat.subCategories[this.selectedSubCategoryIndex].subSubCategories.splice(this.selectedSubSubCategoryIndex, 1);
        this.saveCategory();
    }

    async validateCategoryToSave() {
        this.categoriesToSave = [];
        if (this.documentsService.selectedCat.category === 'CUR') this.checkCurriculum();
        if (this.documentsService.selectedCat.category === 'SOF') this.checkDownloads();
        await this.saveCategory();
        if (this.categoriesToSave.length) {
            for (let i = 0; i < this.categoriesToSave.length; i++) {
                this.documentsService.setCategory(this.categoriesToSave[i]);
                await this.saveCategory();
            }
        }
    }

    async saveCategory() {
        let serverResponse = await this.documentsService.saveCategory();
        if (!serverResponse.error) {
            this.utils.showNotification("Category Saved");
            if (this.filesToUpload && this.filesToUpload.length) {
                this.documentsService.uploadFile(this.filesToUpload, 'documents', this.documentsService.selectedCat.DocCode, this.selectedSubCategoryIndex);
            }
        }
        this.cleanUp();
        $('#categoryModal').modal('hide');
        $('#subCategoryModal').modal('hide');
        $('#subSubCategoryModal').modal('hide');
    }

    checkCurriculum() {
        this.documentsService.objectCategoriesArray.forEach(item => {
            if (item.category === 'CUR' && item.DocCode != this.documentsService.selectedCat.DocCode) {
                item.category = 'DOC';
                this.categoriesToSave.push(item);
            }
        })
    }

    checkDownloads() {
        this.documentsService.objectCategoriesArray.forEach(item => {
            if (item.category === 'SOF' && item.DocCode != this.documentsService.selectedCat.DocCode) {
                item.category = 'DOC';
                this.categoriesToSave.push(item);
            }
        })
    }

    showSubCategoryDocuments(category, SubCategoryIndex, SubSubCategoryIndex, el) {
        this.documentsService.setCategory(category);
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
        this.documentsService.setDocument();
        this.showDocumentForm = true;
        this.createValidationRules();
    }

    createValidationRules() {
        validationMessages['required'] = 'You must enter \${$displayName}.'
        ValidationRules
            .ensure('name').displayName('a Name').required()
            .on(this.documentsService.selectedDocument);
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
                        if (this.editDocumentIndex < 0) {
                            this.documentsService.selectedDocument.files.push({
                                fileName: this.filesToUpload[0].name,
                                size: this.filesToUpload[0].size,
                                personId: this.userObj._id
                            });
                            this.documentsService.selectedCat.subCategories[this.selectedSubCategoryIndex].subSubCategories[this.selectedSubSubCategoryIndex].documents.push(this.documentsService.selectedDocument);
                        } else {
                            this.documentsService.selectedDocument.files[0].fileName = this.filesToUpload[0].name;
                            this.documentsService.selectedDocument.files[0].size = this.filesToUpload[0].size;
                            this.documentsService.selectedDocument.files[0].personId = this.userObj._id;
                            this.documentsService.selectedCat.subCategories[this.selectedSubCategoryIndex].subSubCategories[this.selectedSubSubCategoryIndex].documents[this.editDocumentIndex] = this.documentsService.selectedDocument;
                        };
                    } else {
                        this.documentsService.selectedCat.subCategories[this.selectedSubCategoryIndex].subSubCategories[this.selectedSubSubCategoryIndex].documents[this.editDocumentIndex] = this.documentsService.selectedDocument;
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
        this.documentsService.selectedCat.subCategories[this.selectedSubCategoryIndex].subSubCategories[this.selectedSubSubCategoryIndex].documents.splice(this.editDocumentIndex, 1);
        await this.saveCategory();
    }

    editDocument(document) {
        this.documentsService.setDocument(document);
        this.showDocumentForm = true;
        this.showSaveButton = true;
        this.editDocumentIndex = this.findDocumentIndex(document);
        this.createValidationRules();
    }

    findDocumentIndex(document){
        let documentIndex = -1;
        this.documentsService.selectedCat.subCategories[this.selectedSubCategoryIndex].subSubCategories[this.selectedSubSubCategoryIndex].documents.forEach((item, index) => {
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
        this.documentsService.selectedCat.subCategories[this.selectedSubCategoryIndex].subSubCategories[this.selectedSubSubCategoryIndex].documents[index].active =
            !this.documentsService.selectedCat.subCategories[this.selectedSubCategoryIndex].subSubCategories[this.selectedSubSubCategoryIndex].documents[index].active;
            this.saveCategory();
    }

    nameSort(){
        
    }

}