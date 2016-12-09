import {inject} from 'aurelia-framework';
import {DataTable} from '../../../resources/utils/dataTable';
import {AppConfig} from '../../../config/appConfig';
import {Utils} from '../../../resources/utils/utils';
import {Curriculum} from '../../../resources/data/curriculum';
import {Products} from '../../../resources/data/products';

@inject(DataTable, Curriculum, Products, AppConfig, Utils)
export class CurrInfo{
    curriculumItemSelected = false;
    spinnerHTML = "";
    curriculumContent = " ";
	newItem = false;

    constructor(datatable, curriculum, products, config, utils) {
        this.dataTable = datatable;
        this.dataTable.initialize(this);
        this.utils = utils;
        this.curriculum = curriculum;
		this.products = products;
        this.config = config;
    }

    // attached(){
	// 	// $('.panel-body').slideUp();
    // }

    async activate() {
		 let responses =  await Promise.all([
		 	this.curriculum.getCurriculumCategoryArray(true, '?order=name'),
         	this.curriculum.getCurriculumArray(true, '?order=sortOrder'),
			this.products.getProductsArray(true, '?order=name'),
			this.config.getConfig()
		 ]);
		 this.curriculum.selectCurriculumCategory(0);
		 this.filterList();
    }

	filterList(){
		this.curriculumArray = this.curriculum.curriculumArray.filter(item => {
			return item.category === this.curriculum.selectedCurriculumCategory.name;
		});
	}

	typeChanged(index){
		 this.curriculum.selectCurriculumCategory(index);
		 this.filterList();
	}

	togglePanel(el){
		let panel = $(el.target);
		if(!panel.hasClass('panel-collapsed')){
			panel.parents('.panel').find('.panel-body').slideUp();
			panel.addClass('panel-collapsed');
			panel.find('i').removeClass('fa-chevron-up').addClass('fa-chevron-down');
		} else {
			panel.parents('.panel').find('.panel-body').slideDown();
			panel.removeClass('panel-collapsed');
			panel.find('i').removeClass('fa-chevron-down').addClass('fa-chevron-up');
		}
	}
}