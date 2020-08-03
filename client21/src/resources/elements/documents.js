import { inject, bindable, bindingMode } from 'aurelia-framework';
import { ValidationRules, ValidationControllerFactory, validationMessages } from 'aurelia-validation';
import { DocumentsServices } from '../data/documents';
import { DialogService } from 'aurelia-dialog';
import { MessageDialog } from '../dialogs/message-dialog';
import { Utils } from '../utils/utils';
import { Store } from '../../store/store';
import { AppConfig } from '../../appConfig';

@inject(ValidationControllerFactory, Element, DocumentsServices, Utils, Store, DialogService, AppConfig)
export class DocumentsManagementCustomElement {

    pageSize = 200;

    constructor(ValidationControllerFactory, element, documentsService, utils, store, dialogService, config) {
        this.controller = ValidationControllerFactory.createForCurrentScope();
        this.element = element;
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
        this.refresh();
    }

    toggleListItem(el, id) {
        let thisElement = el.target;
        thisElement.parentElement.querySelector(".nested").classList.toggle("active");
        thisElement.classList.toggle("caret-down");
        el.stopPropagation();
    }

    async refresh() {
        let responses = await Promise.all([
            this.documentsService.getDocumentsCategoriesArray(),
        ]);
        this.filterList();
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
        $('#CategoryForm').show()
        $('#categoryInput').focus();
    }

    editCategory(obj, el) {
        this.documentsService.setCategory(obj);
        $('#CategoryForm').show()
        $('#categoryInput').focus();
        el.stopPropagation();
    }

    newSubCategory(obj, el) {
        this.documentsService.setCategory(obj);
        this.documentsService.selectedCat.subCategories.push(this.documentsService.emptySubCat());
        this.selectedSubCategoryIndex = this.documentsService.selectedCat.subCategories.length - 1;
        $("#SubCategoryForm").show();
        $("#subCategoryInput").focus();
        el.stopPropagation();
    }

    editSubCategory(index, category, el) {
        this.documentsService.setCategory(category);
        this.selectedSubCategoryIndex = index;
        let descriptionNoSpaces = this.documentsService.selectedCat.subCategories[index].description.split(" ").join("");
        $("#SubCategoryForm").show();
        $("#subCategoryInput").focus();
        el.stopPropagation();
    }

    newSubSubCategory(index, obj, el){
        this.documentsService.setCategory(obj);
        this.selectedSubCategoryIndex = index;
        if(!this.documentsService.selectedCat.subCategories[index].subSubCategories) this.documentsService.selectedCat.subCategories[index].subSubCategories = [];
        this.documentsService.selectedCat.subCategories[index].subSubCategories.push(this.documentsService.emptySubSubCat());
        this.selectedSubSubCategoryIndex = this.documentsService.selectedCat.subCategories[index].subSubCategories.length - 1;
        $("#SubSubCategoryForm").show();
        $("#subSubCategoryInput").focus();
        el.stopPropagation();
    }

    editSubSubCategory(index, obj, subCatIndex, el){
        this.documentsService.setCategory(obj);
        this.selectedSubCategoryIndex = subCatIndex;
        this.selectedSubSubCategoryIndex = index;
        $("#SubSubCategoryForm").show();
        $("#subSubCategoryInput").focus();
        el.stopPropagation();
    }

    async validateCategoryToSave() {
        this.categoriesToSave = [];
        if(this.documentsService.selectedCat.curriculum) this.checkCurriculum();
        if(this.documentsService.selectedCat.downloads) this.checkDownloads();
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
                this.documentsService.uploadFile(this.filesToUpload, this.selectedSubCategoryIndex);
            }
        }
        this.cleanUp();
    }

    checkCurriculum() {
        this.documentsService.objectCategoriesArray.forEach(item => {
            if (item.curriculum && item.DocCode != this.documentsService.selectedCat.DocCode) {
                item.curriculum = false;
                this.categoriesToSave.push(item);
            }
        })
    }

    checkDownloads() {
        this.documentsService.objectCategoriesArray.forEach(item => {
            if (item.downloads && item.DocCode != this.documentsService.selectedCat.DocCode) {
                item.downloads = false;
                this.categoriesToSave.push(item);
            }
        })
    }

    showSubCategoryDocuments(category, SubCategoryIndex, SubSubCategoryIndex, el) {
        this.documentsService.setCategory(category);
        this.selectedSubCategoryIndex = SubCategoryIndex;
        this.selectedSubSubCategoryIndex = SubSubCategoryIndex;
        this.showDocuments = true;
        el.stopPropagation();
    }

    cleanUp() {
        this.refresh();
        this.backCategory();
        this.showDocumentForm = false;
        this.showSaveButton = false;
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
                        this.documentsService.selectedDocument.files.push({
                            fileName: this.filesToUpload[0].name,
                            personId: this.userObj._id
                        });
                    }
                    this.documentsService.selectedCat.subCategories[this.selectedSubCategoryIndex].subSubCategories[this.selectedSubSubCategoryIndex].documents.push(this.documentsService.selectedDocument);
                    this.saveCategory();
                } else {
                    let message = 'You must fix the errors before you can save the document?';
                    let title = "Fix Errors";
                    let options = ['Ok'];
                    this.dialog.open({ viewModel: MessageDialog, model: { message, title, options }, lock: false }).whenClosed(response => {
                        return;
                    });
                }
            });
    }

    deleteDocument(index) {
        this.documentsService.selectedCat.subCategories[this.selectedSubCategoryIndex].subSubCategories[this.selectedSubSubCategoryIndex].documents.splice(index, 1);
        this.showSaveButton = true;
    }

    editDocument(index) {
        this.documentsService.setDocument(this.documentsService.selectedCat.subCategories[this.selectedSubCategoryIndex].subSubCategories[this.selectedSubSubCategoryIndex].documents[index]);
        this.showDocumentForm = true;
        this.showSaveButton = true;
        this.createValidationRules();
    }

    closeDocumentForm() {
        this.showDocumentForm = false;
    }

    toggleFileActive(index) {
        this.documentsService.selectedCat.subCategories[this.selectedSubCategoryIndex].documents[index].active =
            !this.documentsService.selectedCat.subCategories[this.selectedSubCategoryIndex].documents[index].active;
    }

}