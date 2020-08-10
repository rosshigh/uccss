import { inject} from 'aurelia-framework';
import { DocumentsServices } from '../../../resources/data/documents';
import { Store } from '../../../store/store';
import { AppConfig } from '../../../appConfig';

@inject( DocumentsServices, Store, AppConfig)
export class Downloads {

    pageSize = 200;

    constructor(documentsService, store, config) {
        this.documentsService = documentsService;
        this.store = store;
        this.config = config;
    }

    activate(params){
        this.lookUpPageTitle(params.id);
        this.filter = '?filter=category|eq|' + params.id;
        this.refresh();
    }

    lookUpPageTitle(code){
        this.pageTitle = "";
        this.config.DOCUMENT_CATGORIES.forEach(item => {
            if(code === item.code) this.pageTitle = item.description;
        });
    }

    async attached() {
        $('[data-toggle="tooltip"]').tooltip();
    }

    async refresh() {
        let responses = await Promise.all([
            this.documentsService.getDocumentsCategoriesArray(this.filter)
        ]);
        this.selectedCat = this.documentsService.objectCategoriesArray[0];
        this.documentsService.setCategory( this.selectedCat);
    }

    toggleListItem(el, id) {
        let thisElement = el.target;
        thisElement.parentElement.querySelector(".nested").classList.toggle("active");
        thisElement.classList.toggle("caret-down");
        el.stopPropagation();
    }

    showSubCategoryDocuments(SubCategoryIndex, SubSubCategoryIndex, el) {
        this.selectedSubCategoryIndex = SubCategoryIndex;
        this.selectedSubSubCategoryIndex = SubSubCategoryIndex;
        this.showDocuments = true;
        this.filesToShow = this.selectedCat.subCategories[SubCategoryIndex].subSubCategories[SubSubCategoryIndex].documents.length > 0;
        el.stopPropagation();
    }

}