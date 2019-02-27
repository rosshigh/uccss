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

		this.userObj = JSON.parse(sessionStorage.getItem('user'));
	}
	
	canActivate(){
		if(!this.userObj) {
			this.userObj = this.config.user;
			this.isUCC = this.userObj.userRole >= this.config.UCC_ROLE;
			if(!this.userObj) {
				this.utils.showNotification("Couldn't find your user information.  Try logging in again or call the UCC.",'warning');
				this.router.navigate("home");
			}
		}
	}  

	attached() {
		$('[data-toggle="tooltip"]').tooltip();
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

	typeChanged(index, el){
		 this.curriculum.selectCurriculumCategory(index);
		$("#buttonGroup").children().removeClass('menuButtons');
		$("#buttonGroup").children().css("background-color","");
		$("#buttonGroup").children().css("color","");
		$(el.target).css("background-color",this.config.BUTTONS_BACKGROUND);
		$(el.target).css("color",this.config.ACTIVE_SUBMENU_COLOR);
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
		this.curriculum.selectedCurriculum.raters = this.curriculum.selectedCurriculum.raters ? this.curriculum.selectedCurriculum.raters + 1 : 0;
		let serverResponse = this.curriculum.save();
	}
}