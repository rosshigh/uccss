import {inject} from 'aurelia-framework';
import {Social} from '../../resources/data/social';
import {People} from '../../resources/data/people';
import {AppConfig} from '../../config/appConfig';
import Validation from '../../resources/utils/validation';
import {Utils} from '../../resources/utils/utils';

@inject(Social, People, AppConfig, Validation, Utils)
export class EditBlogs{
	blogSelected = false;

	constructor(social, people, config, validation, utils){
		this.social = social;
		this.people = people;
		this.config = config;
		this.utils = utils;
		this.validation = validation;
		this.validation.initialize(this);		

		this._setupValidation();
	}

	attached(){
        $('[data-toggle="tooltip"]').tooltip();
    }

	async activate(){
		let responses = await Promise.all([
            this.people.getPeopleArray(),
			this.social.getBlogArray('?order=-dateCreated',true)
		]);
	}

	selectBlog(index){
		this.social.selectBlog(index);
		this.selectedIndex = index;
		this.blogSelected = true;	
	}

	toggleActivation(){
		this.social.selectedBlog.active = !this.social.selectedBlog.active;
		this.social.saveBlog();
	}

	back(){
		this.blogSelected = false;
	}

	async save(){
		if(this.validation.validate(1)){
			let serverResponse = await this.social.saveBlog();
			if (serverResponse && !serverResponse.error) {
				this.utils.showNotification("The blog was saved");
			}
		}
	}

	cancel(){
		this.social.selectBlog(this.selectedIndex);
	}

	async delete(){
		let response = await this.social.deleteBlog();
		if(!response.error){
			this.utils.showNotification("The blog was deleted");
			this.blogSelected = false;
		}
	}

	_setupValidation(){
        this.validation.addRule(1,"editTitle", [{"rule":"required","message":"Title is required", "value": "social.selectedBlog.title"}]);
		this.validation.addRule(1,"editTeaser", [{"rule":"required","message":"Teaser is required", "value": "social.selectedBlog.teaser"}]);
		this.validation.addRule(1,"blogContent", [{"rule":"required","message":"Content is required", "value": "social.selectedBlog.text"}]);
    }

}