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
        this.documents = documentService;
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
                categoryToBuild = { description: categoryItem.description, sortOrder: categoryItem.sortOrder, subCategories: [] };
                categoryItem.subCategories.forEach(subCatItem => {
                    subCategoryToBuild = { description: subCatItem.description, sortOrder: subCatItem.sorOrder };
                    indicesToSplice = [];
                    subCatItem.questions.forEach((questItem, index) => {
                        if (questItem.question.toUpperCase().indexOf(thisFilter.toUpperCase()) === -1) {
                            indicesToSplice.push(index);
                        }
                    })
                    if (subCatItem.questions && subCatItem.questions.length > 0) {
                        for (let i = indicesToSplice.length - 1; i >= 0; i--) {
                            subCatItem.questions.splice(indicesToSplice[i], 1);
                        }

                        categoryToBuild.subCategories.push(subCatItem);
                    }
                })
                if (categoryToBuild.subCategories.length > 0) {
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

    toggleListItem(el, object, type, index) {

        if (!this.faqservices.selectedCat || object._id !== this.faqservices.selectedCat._id) {
            this.faqservices.setCategory(object);
        }
        if (type === "C") {
            this.categorySelected = true;
            this.selectedSubCategoryIndex = -1;
        }
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
        setTimeout(() => {
            $('#categoryInput').focus();
        }, 500);
    }

    editCategory(obj, index, el) {
        this.selectedCategory = index;
        this.refreshSelects();
        this.modalTitle = "Edit Category";
        $('#categoryModal').modal('show');
        setTimeout(() => {
            $('#categoryInput').focus();
        }, 500);
        el.stopPropagation();
    }

    async deleteCategory() {
        $("#confirmDeleteModal").modal('show');
    }

    async deleteTheCategory() {
        let serverResponse = this.faqservices.deleteCategory();
        if (!serverResponse.error) {
            this.utils.showNotification("Category Deleted");
        }
        this.categorySelected = false;
        this.cleanUp();
    }

    newSubCategory() {
        this.faqservices.selectedCat.subCategories.push(this.faqservices.emptySubCat());
        this.selectedSubCategoryIndex = this.faqservices.selectedCat.subCategories.length - 1;
        this.newSubCategoryFlag = true;
        this.modalTitle = "New Subcategory";
        $('#subCategoryModal').modal('show');
        setTimeout(() => { $("#subCategoryInput").focus(); }, 500);
    }

    editSubCategory() {
        this.newSubCategoryFlag = false;
        this.modalTitle = "Edit Subcategory";
        $('#subCategoryModal').modal('show');
        setTimeout(() => {
            $('#subCategoryInput').focus();
        }, 500);
    }

    async deleteSubCategory() {
        $("#confirmSubDeleteModal").modal('show');
    }

    async deleteTheSubCategory() {
        this.faqservices.selectedCat.subCategories.splice(this.selectedSubCategoryIndex, 1);
        this.selectedSubCategoryIndex = -1;
        this.saveCategory();
    }

    async validateCategoryToSave() {
        this.categoriesToSave = [];
        await this.saveCategory();
        if (this.categoriesToSave.length) {
            for (let i = 0; i < this.categoriesToSave.length; i++) {
                this.documents.setCategory(this.categoriesToSave[i]);
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
        // this.keepDocuments = [];
        // this.faqservices.selectedQuestion.links.forEach(item => {
        //     this.keepDocuments.push(item);
        // });
        this.selectedQuestionIndex = index;
        this.showDocumentForm = true;
    }

    async attachDocument() {
        let responses = await Promise.all([
            this.documents.getDocumentsCategoriesArray("?filter=[or]category|DOC:CUR:SOF:HPT:USE"),
        ]);
        this.filterDocumentList();
        this.modalTitle = "Choose a Document";
        // this.keepDocuments = [];
        // $(".form-check-input").prop('checked', false);
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
            this.faqservices.selectedCat.subCategories[this.selectedSubCategoryIndex].questions[this.selectedQuestionIndex] = this.faqservices.selectedQuestion;
            //     this.faqservices.selectedCat.subCategories[this.selectedSubCategoryIndex].questions[this.selectedQuestionIndex].answer = this.faqservices.selectedQuestion.answer;
            //     this.faqservices.selectedCat.subCategories[this.selectedSubCategoryIndex].questions[this.selectedQuestionIndex].links = this.faqservices.selectedQuestion.links;
        } else {
            this.faqservices.selectedCat.subCategories[this.selectedSubCategoryIndex].questions.push(this.faqservices.selectedQuestion);
        }

        this.saveCategory();
    }

    // addLinksToQuestion() {
    //     this.keepDocuments.forEach(item => {
    //         this.faqservices.selectedQuestion.links.push({
    //             docCode: this.documents.selectedCat.DocCode,
    //             subDocCode: this.selectedDocSubCategoryIndex,
    //             fileName: item.files[0].fileName
    //         })
    //     });
    // }

    toggleAddToList(document) {
        let indexToRemove = -1;;
        // this.faqservices.selectedCat.subCategories[this.selectedSubCategoryIndex].questions[this.selectedQuestionIndex].links.forEach((item, index) =>{
        this.faqservices.selectedQuestion.links.forEach((item, index) => {
            if (item.fileName == document.file.fileName) {
                indexToRemove = index;
            }
        })


        // this.keepDocuments.forEach((item, index) => {
        //     if (item.file.fileName == document.file.fileName) {
        //         indexToRemove = index;
        //     }
        // })
        if (indexToRemove >= 0) {
            this.faqservices.selectedQuestion.links.splice(indexToRemove, 1);
        } else {
            this.faqservices.selectedQuestion.links.push({
                docCode: this.documents.selectedCat.DocCode,
                subDocCode: this.selectedDocSubCategoryIndex,
                subSubDocCode: this.selectedDocSubSubCategoryIndex,
                fileName: document.file.fileName
            });
        }

    }

    closeDocumentForm() {
        this.showDocumentForm = false;
    }

    showQuestions(category, categoryIndex, subCategoryIndex, el) {
        // this.faqservices.setCategory(category);
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


    toggleDocListItem(el, object, type, index) {
        if (!this.documents.selectedCat || object._id !== this.documents.selectedCat._id) {
            this.documents.setCategory(object);
        }
        if (type === "C") {
            this.categorySelected = true;
            this.selectedDocSubCategoryIndex = -1;
            this.selectedDocSubSubCategoryIndex = -1;
        }
        if (type === 'S') {
            this.selectedDocSubCategoryIndex = index;
        }
        let thisElement = el.target;
        thisElement.parentElement.querySelector(".nested").classList.toggle("active");
        thisElement.classList.toggle("caret-down");
        el.stopPropagation();
    }

    showSubCategoryDocuments(category, SubCategoryIndex, SubSubCategoryIndex, el) {
        if (category._id !== this.documents.selectedCat._id) {
            this.documents.setCategory(category);
        }
        // this.selectedDocSubCategoryIndex = SubCategoryIndex;
        this.selectedDocSubSubCategoryIndex = SubSubCategoryIndex;
        this.catDescription = this.documents.selectedCat.description;
        this.subCatDescription = this.documents.selectedCat.subCategories[this.selectedDocSubCategoryIndex].description;
        this.showDocuments = true;
        setTimeout(() => {this.checkLinks();}, 500);
        setTimeout(() => { $('[data-toggle="tooltip"]').tooltip(); }, 1000);
        el.stopPropagation();
    }

    checkLinks() {
        // if (!this.faqservices.selectedQuestion.links || this.faqservices.selectedQuestion.links.length === 0) {
        //     this.documents = this.documents.selectedCat.subCategories[this.selectedDocSubCategoryIndex].subSubCategories[this.selectedDocSubSubCategoryIndex].documents;
        //     return;
        // }
        // this.document = [];
        // let pieces;
        // let checked;
        // this.faqservices.selectedQuestion.links.forEach(item => {
        //     this.documents.selectedCat.subCategories[this.selectedDocSubCategoryIndex].subSubCategories[this.selectedDocSubSubCategoryIndex].documents.forEach(doc => {
        //         pieces = item.split('/');
        //         if (doc.fileName === pieces[2]) {
        //             checked = true;
        //         } else {
        //             checked = false;
        //         }
        //         this.documents.push({
        //             document: doc,
        //             checked: checked
        //         })
        //     })
        // })
        this.documents.selectedCat.subCategories[this.selectedDocSubCategoryIndex].subSubCategories[this.selectedDocSubSubCategoryIndex].documents.forEach((doc, index) => {
            this.faqservices.selectedQuestion.links.forEach(item => {
                if(item.fileName === doc.file.fileName){
                    $("#DOC-" + index).prop('checked', true);
                }
            });
        });


    }
}