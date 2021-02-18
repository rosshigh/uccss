import { inject } from 'aurelia-framework';
import { ValidationRules, ValidationControllerFactory, validationMessages } from 'aurelia-validation';
import { DocumentsServices } from '../../../resources/data/documents';
import { FAQServices } from '../../../resources/data/questions';
import { AppConfig } from '../../../appConfig';
import { Store } from '../../../store/store';
import { Utils } from '../../../resources/utils/utils';

@inject(ValidationControllerFactory, DocumentsServices, FAQServices, AppConfig, Store, Utils)
export class EditFAQ {


    constructor(validation, documentService, faqservices, config, store, utils) {
        this.validation = validation;
        this.documentsService = documentService;
        this.faqservices = faqservices;
        this.config = config;
        this.store = store;
        this.utils = utils;

        this.editorid = 'answerhtml';
        this.view = 'categoryList';
        this.userObj = this.store.getUser();
    }

    async attached() {
        $('[data-toggle="tooltip"]').tooltip();
        $(".hover").css("display", "none");
        $('.selectpicker').selectpicker();
        this.refresh();
    }

    async refresh() {
        let responses = await Promise.all([
            this.faqservices.getQuestionsArray("?filter=category|eq|FAQ")
        ]);
        this.filterQuestionList();
        this.showDocumentForm = false;
    }

    filterQuestionList() {
        this.filteredQuestionArray = [];
         let arrayToFilter = [];
        this.faqservices.objectQuesitonsArray.forEach(item => {
            arrayToFilter.push(item);
        })
        if (this.filter) {
            let thisFilter = this.filter.toUpperCase();
            let categoryToBuild;
            let subCategoryToBuild;
            let indicesToSplice;
            arrayToFilter.forEach(categoryItem => {
                categoryToBuild = {description: categoryItem.description, sortOrder: categoryItem.sortOrder, subCategories: []};
                categoryItem.subCategories.forEach(subCatItem => {
                    subCategoryToBuild = {description: subCatItem.description, sortOrder: subCatItem.sorOrder};
                    indicesToSplice = [];
                    subCatItem.questions.forEach((questItem, index) => {
                        if(questItem.question.toUpperCase().indexOf(thisFilter.toUpperCase()) === -1){
                            indicesToSplice.push(index);
                        } 
                    })
                    if(subCatItem.questions && subCatItem.questions.length > 0){
                        for(let i = indicesToSplice.length - 1; i >= 0; i--){
                            subCatItem.questions.splice(indicesToSplice[i], 1);
                        }
                        
                        categoryToBuild.subCategories.push(subCatItem);
                    }
                })
                if(categoryToBuild.subCategories.length > 0){
                    this.filteredQuestionArray.push(categoryToBuild);
                }
            })

            // this.filteredQuestionArray = this.faqservices.objectQuesitonsArray.filter((item) => {
            //     return item.description.toUpperCase().indexOf(thisFilter.toUpperCase()) > -1;
            // });
        } else {
            this.faqservices.objectQuesitonsArray.forEach(item => {
                this.filteredQuestionArray.push(item);
            })
        }
    }

    toggleListItem(el, id) {
        let thisElement = el.target;
        thisElement.parentElement.querySelector(".nested").classList.toggle("active");
        thisElement.classList.toggle("caret-down");
        el.stopPropagation();
    }

    refreshSelects() {
        this.utils.refreshSelect("#editCategory", this.config.DOCUMENT_CATGORIES, "code", this.faqservices.selectedCat.category);
    }

    newCategory() {
        this.faqservices.selectCategory();
        this.faqservices.selectedCat.sortOrder = this.faqservices.objectQuesitonsArray.length
        this.refreshSelects();
        this.modalTitle = "New Category";
        $('#categoryModal').modal('show');
        setTimeout(()=>{
            $('#categoryInput').focus();
        }, 500);
    }

    editCategory(obj, index, el) {
        this.faqservices.setCategory(obj);
        this.selectedCat = index;
        this.refreshSelects();
        this.modalTitle = "Edit Category";
        $('#categoryModal').modal('show');
        setTimeout(()=>{
            $('#categoryInput').focus();
        }, 500);
        el.stopPropagation();
    }

    async deleteCategory(obj) {
        this.faqservices.setCategory(obj);
        $("#confirmDeleteModal").modal('show');
    }

    async deleteTheCategory() {
        let serverResponse = this.faqservices.deleteCategory();
        if (!serverResponse.error) {
            this.utils.showNotification("Category Deleted");
        }
        this.cleanUp();
    }

    newSubCategory(obj, el) {
        this.faqservices.setCategory(obj);
        this.faqservices.selectedCat.subCategories.push(this.faqservices.emptySubCat());
        this.selectedSubCategoryIndex = this.faqservices.selectedCat.subCategories.length - 1;
        this.newSubCategoryFlag = true;
        this.modalTitle = "New Subcategory";
        $('#subCategoryModal').modal('show');
        setTimeout(() => {$("#subCategoryInput").focus();},500);
        el.stopPropagation();
    }

    editSubCategory(index, category, el) {
        this.faqservices.setCategory(category);
        this.selectedSubCategoryIndex = index;
        let descriptionNoSpaces = this.faqservices.selectedCat.subCategories[index].description.split(" ").join("");
        this.newSubCategoryFlag = false;
        this.modalTitle = "Edit Subcategory";
        $('#subCategoryModal').modal('show');
        $("#subCategoryInput").focus();
        el.stopPropagation();
    }

    async deleteSubCategory(obj, index, el) {
        this.selectedSubCategoryIndex = index;
        this.faqservices.setCategory(obj);
        $("#confirmSubDeleteModal").modal('show');
        el.stopPropagation();
    }

    async deleteTheSubCategory() {
        this.faqservices.selectedCat.subCategories.splice(this.selectedSubCategoryIndex, 1);
        this.saveCategory();
    }

    async validateCategoryToSave() {
        this.categoriesToSave = [];
        await this.saveCategory();
        if (this.categoriesToSave.length) {
            for (let i = 0; i < this.categoriesToSave.length; i++) {
                this.documentsService.setCategory(this.categoriesToSave[i]);
                await this.saveCategory();
            }
        }
    }

    createQuestion() {
        this.faqservices.selectQuestion();
        this.selectedQuestionIndex = undefined;
        this.showDocumentForm = true;
        this.keepDocuments = [];
    }

    selectQuestion(index, question) {
        this.faqservices.setQuestion(question);
        this.keepDocuments = [];
        this.faqservices.selectedQuestion.links.forEach(item => {
            this.keepDocuments.push(item);
        });
        this.selectedQuestionIndex = index;
        this.showDocumentForm = true;
    }

    async attachDocument() {
        let responses = await Promise.all([
            this.documentsService.getDocumentsCategoriesArray("?filter=[or]category|DOC:CUR:SOF:HPT:USE"),
        ]);
        this.filterDocumentList();
        this.modalTitle = "Choose a Document";
        this.keepDocuments = [];
        // $(".form-check-input").prop('checked', false);
        $('#documentsModal').modal('show');
    }

    filterDocumentList() {
        if (this.DocumentFilter) {
            let thisFilter = this.filter
            this.filteredDocumentArray = this.documentsService.objectCategoriesArray.filter((item) => {
                return item.description.toUpperCase().indexOf(thisFilter.toUpperCase()) > -1;
            });
        } else {
            this.filteredDocumentArray = this.documentsService.objectCategoriesArray;
        }
    }

    async saveCategory() {
        let serverResponse = await this.faqservices.saveCategory();
        if (!serverResponse.error) {
            this.utils.showNotification("Category Saved");
        }
        this.cleanUp();
        await this.refresh();
        $('#categoryModal').modal('hide');
        $('#subCategoryModal').modal('hide');
        $('#subSubCategoryModal').modal('hide');
        $('#documentsModal').modal('hide');
    }

    saveQuestion() {
        if (this.selectedQuestionIndex != undefined && this.faqservices.selectedCat.subCategories[this.selectedSubCategoryIndex].questions[this.selectedQuestionIndex]) {
            this.faqservices.selectedCat.subCategories[this.selectedSubCategoryIndex].questions[this.selectedQuestionIndex].question = this.faqservices.selectedQuestion.question;
            this.faqservices.selectedCat.subCategories[this.selectedSubCategoryIndex].questions[this.selectedQuestionIndex].answer = this.faqservices.selectedQuestion.answer;
            this.faqservices.selectedCat.subCategories[this.selectedSubCategoryIndex].questions[this.selectedQuestionIndex].links = this.faqservices.selectedQuestion.links;
        } else {
            this.faqservices.selectedCat.subCategories[this.selectedSubCategoryIndex].questions.push(this.faqservices.selectedQuestion);
        }

        this.saveCategory();
    }

    addLinksToQuestion() {
        this.keepDocuments.forEach(item => {
            this.faqservices.selectedQuestion.links.push({
                docCode: this.documentsService.selectedCat.DocCode,
                subDocCode: this.selectedDocSubCategoryIndex,
                fileName: item.files[0].fileName
            })
        });
    }

    toggleAddToList(document) {
        let indexToRemove = -1;;
        this.keepDocuments.forEach((item, index) => {
            if (item.files[0].fileName == document.files[0].fileName) {
                indexToRemove = index;
            }
        })
        if (indexToRemove >= 0) {
            this.keepDocuments.splice(indexToRemove, 1);
        } else {
            this.keepDocuments.push(document);
        }

    }

    closeDocumentForm() {
        this.showDocumentForm = false;
    }

    showSubCategoryDocuments(category, SubCategoryIndex, SubSubCategoryIndex, el) {
        this.documentsService.setCategory(category);
        this.selectedDocSubCategoryIndex = SubCategoryIndex;
        this.selectedDocSubSubCategoryIndex = SubSubCategoryIndex;
        this.catDescription = this.documentsService.selectedCat.description;
        this.subCatDescription = this.documentsService.selectedCat.subCategories[this.selectedDocSubCategoryIndex].description;
        this.showDocuments = true;
        this.checkLinks();
        setTimeout(() => { $('[data-toggle="tooltip"]').tooltip(); }, 1000);
        el.stopPropagation();
    }

    checkLinks() {
        if (!this.faqservices.selectedQuestion.links || this.faqservices.selectedQuestion.links.length === 0) {
            this.documents = this.documentsService.selectedCat.subCategories[this.selectedDocSubCategoryIndex].subSubCategories[this.selectedDocSubSubCategoryIndex].documents;
            return;
        }
        this.documents = [];
        let pieces;
        let checked;
        this.faqservices.selectedQuestion.links.forEach(item => {
            this.documentsService.selectedCat.subCategories[this.selectedDocSubCategoryIndex].subSubCategories[this.selectedDocSubSubCategoryIndex].documents.forEach(doc => {
                pieces = item.split('/');
                if (doc.fileName === pieces[2]) {
                    checked = true;
                } else {
                    checked = false;
                }
                this.documents.push({
                    document: doc,
                    checked: checked
                })
            })
        })


    }

    showQuestions(category, categoryIndex, subCategoryIndex, el) {
        this.faqservices.setCategory(category);
        this.selectedSubCategoryIndex = subCategoryIndex;
        this.showDocuments = true;
        setTimeout(() => { $('[data-toggle="tooltip"]').tooltip(); }, 1000);
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
        // $("#SubSubCategoryForm").hide();
    }

    backCategory() {
        this.view = 'categoryList';
    }

    cancelEditCategory() {
        $('#CategoryForm').hide();
        $("#SubCategoryForm").hide();
        $("#SubSubCategoryForm").hide();
    }
}