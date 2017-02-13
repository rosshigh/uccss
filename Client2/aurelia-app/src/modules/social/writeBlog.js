import {inject} from 'aurelia-framework';
import {Social} from '../../resources/data/social';
import {People} from '../../resources/data/people';
import Validation from '../../resources/utils/validation';
import {Utils} from '../../resources/utils/utils';

@inject(Social, People, Validation, Utils)
export class WriteBlogs{
	blogContent = "";

	constructor(social, people, validation, utils){
		this.social = social;
		this.people = people;
		this.validation = validation;
		this.validation.initialize(this);
		this.utils = utils;
		this._setupValidation();
	}

	canActivate(){
        this.userObj = JSON.parse(sessionStorage.getItem('user'));
    }

	attached(){
        $('[data-toggle="tooltip"]').tooltip();
    }

	async activate(){
		let responses = await Promise.all([
            this.people.getPeopleArray('', true),
			this.social.getBlogArray('?order=-dateCreated',true)
		]);
		this.social.selectBlog();
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

	_setupValidation(){
        this.validation.addRule(1,"editTitle", [{"rule":"required","message":"Title is required", "value": "social.selectedBlog.text"}]);
		this.validation.addRule(1,"blogContent", [{"rule":"required","message":"Content is required", "value": "social.selectedBlog.text"}]);
    }

}