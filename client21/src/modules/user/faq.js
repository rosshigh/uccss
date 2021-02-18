import { inject } from 'aurelia-framework';
import { FAQServices } from '../../resources/data/questions';
import { AppConfig } from '../../appConfig';
import { Store } from '../../store/store';
import { Utils } from '../../resources/utils/utils';

@inject(FAQServices, AppConfig, Store, Utils)
export class ShowFAQ {


    constructor(faqservices, config, store, utils) {
        this.faqservices = faqservices;
        this.config = config;
        this.store = store;
        this.utils = utils;

        this.editorid = 'answerhtml';
        this.view = 'categoryList';
        this.userObj = this.store.getUser();
        this.pageTitle = "Frequently Asked Questions";
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
            let arrayToBuild = [];;
            let categoryToBuild;
            let subCategoryToBuild;
            let indicesToSplice;
            let filteredQuestions;
            arrayToFilter.forEach(categoryItem => {
                categoryToBuild = {description: categoryItem.description, sortOrder: categoryItem.sortOrder, subCategories: []};
                categoryItem.subCategories.forEach(subCatItem => {
                    subCategoryToBuild = {description: subCatItem.description, sortOrder: subCatItem.sorOrder, questions: []};
                    indicesToSplice = [];
                    filteredQuestions = subCatItem.questions.filter(que => {
                        return que.question.toUpperCase().indexOf(thisFilter) > -1;
                    })
                    filteredQuestions.forEach(item => {
                        subCategoryToBuild.questions.push(item);
                    })
                    if(subCategoryToBuild.questions.length > 0){
                        categoryToBuild.subCategories.push(subCategoryToBuild);
                    }
                })
                if(categoryToBuild.subCategories.length > 0){
                    arrayToBuild.push(categoryToBuild);
                }
            })
            this.filteredQuestionArray = arrayToBuild;;
        } else {
            this.filteredQuestionArray = this.faqservices.objectQuesitonsArray
        }
    }

    clearFilter(){
        this.filter = "";
        this.filterQuestionList();
    }

    toggleListItem(el, id) {
        let thisElement = el.target;
        thisElement.parentElement.querySelector(".nested").classList.toggle("active");
        thisElement.classList.toggle("caret-down");
        el.stopPropagation();
    }

    showQuestions(category, categoryIndex, subCategoryIndex, el) {
        this.faqservices.setCategory(category);
        this.selectedCategoryIndex = categoryIndex;
        this.selectedSubCategoryIndex = subCategoryIndex;
        this.showDocuments = true;
        setTimeout(() => { $('[data-toggle="tooltip"]').tooltip(); }, 1000);
        el.stopPropagation();
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

    closeDocumentForm() {
        this.showDocumentForm = false;
    }
}