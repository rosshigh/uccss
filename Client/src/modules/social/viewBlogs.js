import {inject} from 'aurelia-framework';
import {Social} from '../../resources/data/social';
import {AppConfig} from '../../config/appConfig';

@inject(Social, AppConfig)
export class ViewBlogs{
	blogSelected = false;

	constructor(social,  config){
		this.social = social;
		this.config = config;
	}

	attached(){
        $('[data-toggle="tooltip"]').tooltip();
    }

	async activate(){
		let responses = await Promise.all([
			this.social.getBlogArray('?order=-dateCreated',true)
		]);
	}

	selectBlog(index){
		this.selectedIndex = index;
		this.social.blogArray[index].views = this.social.blogArray[index].views ? this.social.blogArray[index].views + 1 : 1;
		this.social.selectBlog(index);
		this.social.updateViews()
		this.blogSelected = true;
		
	}

	like(index){
		if(index === 999) index = this.selectedIndex;
		this.social.blogArray[index].likes = this.social.blogArray[index].likes ? this.social.blogArray[index].likes + 1 : 1;
		this.social.selectBlog(index);
		this.social.updateViews();
	}

	back(){
		this.blogSelected = false;
	}

}