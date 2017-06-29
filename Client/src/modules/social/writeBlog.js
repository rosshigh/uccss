import {inject} from 'aurelia-framework';
import {Social} from '../../resources/data/social';
import {People} from '../../resources/data/people';
import Validation from '../../resources/utils/validation';
import {Utils} from '../../resources/utils/utils';

@inject(Social, People, Validation, Utils)
export class WriteBlogs{
	blogSelected = false;

	constructor(social, people, validation, utils){
		this.social = social;
		this.people = people;
		this.validation = validation;
		this.validation.initialize(this);
		this.utils = utils;
		this._setupValidation();

		 this.userObj = JSON.parse(sessionStorage.getItem('user'));
	}

	attached(){
        $('[data-toggle="tooltip"]').tooltip();
    }

	async activate(){
		let responses = await Promise.all([
            this.people.getPeopleArray(),
			this.social.getBlogArray('?order=-dateCreated',true),
			this.social.getBlogArray("?filter=personId|eq|" + this.userObj._id + "&order=-dateCreated",true)
		]);
		this.social.selectBlog();
	}

	new(){
		this.social.selectBlog();
		this.blogSelected = true;
	}

	async save(){
		if(this.validation.validate(1)){
			this.social.selectedBlog.personId = this.userObj._id;
			let serverResponse = await this.social.saveBlog();
			if (serverResponse && !serverResponse.error) {
				this.utils.showNotification("The blog was saved");
			}
		}
	}

	selectBlog(index){
		this.social.selectBlog(index);
		this.blogSelected = true;	
	}

	back(){
		this.blogSelected = false;
	}

	_setupValidation(){
        this.validation.addRule(1,"editTitle", [{"rule":"required","message":"Title is required", "value": "social.selectedBlog.title"}]);
		this.validation.addRule(1,"editTeaser", [{"rule":"required","message":"Teaser is required", "value": "social.selectedBlog.teaser"}]);
		this.validation.addRule(1,"blogContent", [{"rule":"required","message":"Content is required", "value": "social.selectedBlog.text"}]);
    }

}