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
	curriculumSelected = false;
	addComment = false;
	description = "";
	comment = "";

    constructor(datatable, curriculum, products, config, utils) {
        this.dataTable = datatable;
        this.dataTable.initialize(this);
        this.utils = utils;
        this.curriculum = curriculum;
		this.products = products;
        this.config = config;
    }

	attached() {
		$('[data-toggle="tooltip"]').tooltip();
	}

	canActivate() {
		this.userObj = JSON.parse(sessionStorage.getItem('user'));
	}

    async activate() {
		 let responses =  await Promise.all([
		 	this.curriculum.getCurriculumCategoryArray(true, '?order=name'),
         	this.curriculum.getCurriculumArray(true, '?order=sortOrder'),
			this.products.getProductsArray('?order=name', true),
			this.config.getConfig()
		 ]);
		 this.curriculum.selectCurriculumCategory(0);
		  this.curriculum.selectCurriculum();
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
		 this.curriculumSelected = false;
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

	selectCurriculum(curriculum){
		this.curriculum.selectCurriculumById(curriculum._id);
		this.curriculumSelected = true;
	}

	add(){
		this.addComment = true;
	}

	cancel(){
		this.addComment = false;
		this.comment = "";
	}

	async save(){
		if(this.comment){
			if(!this.curriculum.selectedCurriculum.customerComments){
			this.curriculum.selectedCurriculum.customerComments = new Array();
		}
		this.curriculum.selectedCurriculum.customerComments.unshift({
			authorEmail: this.userObj.email,
			comment: this.comment,
			dateCreated: new Date()
		});
		let serverResponse = await this.curriculum.save();
		this.addComment = false;
		}
	}

	back(){
		this.curriculumSelected = false;
	}

	rateCurriculum(el){
		this.curriculum.selectCurriculumById(el.detail.id);
		this.curriculum.selectedCurriculum.rating = el.detail.rating;
		this.curriculum.selectedCurriculum.raters = el.detail.raters;
		let serverResponse = this.curriculum.save();
	}
}