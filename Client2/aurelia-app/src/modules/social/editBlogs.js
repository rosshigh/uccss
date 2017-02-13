import {inject} from 'aurelia-framework';
import {Social} from '../../resources/data/social';
import {People} from '../../resources/data/people';

@inject(Social, People)
export class EditBlogs{
	blogSelected = false;

	constructor(social, people){
		this.social = social;
		this.people = people;
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

	like(index){
		this.social.blogArray[index].likes = this.social.blogArray[index].likes ? this.social.blogArray[index].likes++ : 1;;
		this.social.selectBlog(index);
		// this.social.selectedBlog.likes += 1;
		
		this.social.saveBlog();
	}

	back(){
		this.blogSelected = false;
	}

}