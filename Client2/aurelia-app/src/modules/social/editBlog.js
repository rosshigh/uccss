import {inject} from 'aurelia-framework';
import {Social} from '../../resources/data/social';
import {People} from '../../resources/data/people';
import {AppConfig} from '../../config/appConfig';

@inject(Social, People, AppConfig)
export class EditBlogs{
	blogSelected = false;

	constructor(social, people, config){
		this.social = social;
		this.people = people;
		this.config = config;
	}

	attached(){
        $('[data-toggle="tooltip"]').tooltip();
    }

	async activate(){
		let responses = await Promise.all([
            this.people.getPeopleArray('', true),
			this.social.getBlogArray('?order=-dateCreated',true)
		]);
	}

	selectBlog(index){
		this.social.selectBlog(index);
		this.blogSelected = true;	
	}

	toggleActivation(){
		this.social.selectedBlog.active = !this.social.selectedBlog.active;
		this.social.saveBlog();
	}

	back(){
		this.blogSelected = false;
	}

}