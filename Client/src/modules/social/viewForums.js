import {inject} from 'aurelia-framework';
import {Social} from '../../resources/data/social';
import {People} from '../../resources/data/people';
import {AppConfig} from '../../config/appConfig';
import {Utils} from '../../resources/utils/utils';

@inject(Social, People, AppConfig, Utils)
export class ViewForums{
	forumSelected = false;
	openNewForumForm = false;
	openNewTopicForm = false;

	constructor(social, people, config, utils){
		this.social = social;
		this.people = people;
		this.config = config;
		this.utils = utils;

		this.userObj = JSON.parse(sessionStorage.getItem('user'));
	}

	attached(){
        $('[data-toggle="tooltip"]').tooltip();
    }

	async activate(){
		let responses = await Promise.all([
            this.people.getPeopleArray(),
			this.social.getForumArray('?order=-dateCreated',true)
		]);
	}

	async selectForum(index){
		this.selectedIndex = index;
		this.social.selectForum(index);
		await this.social.getForumMessages('?filter=discusssionId|eq|' + this.social.selectedForum._id + '&order=-dateCreated', true);
		this.forumSelected = true;
	}

	newForum(){
		this.social.selectForum();
		this.openNewForumForm = true;
	}

	async saveForum(){
		this.social.selectedForum.title = this.title;
		this.social.selectedForum.text = this.text;
		this.social.selectedForum.personId = this.userObj._id;
		let response = await this.social.saveForum();
		if(!response.error){
			this.utils.showNotification('The forum was saved');
			this._cleanUp();
		}

	}

	_cleanUp(){
		this.openNewForumForm = false;
		this.openNewTopicForm = false;
	}

	cancel(){
		this.text = "";
		this.title = "";
		this.openNewTopicForm = false;
		this.openMessageForm = false;
	}

	newForumTopic(){
		this.social.selectForumTopic();
		this.openNewTopicForm = true;
		this.openMessageForm = true;
	}

	async saveForumTopic(){
		if(this.openNewTopicForm){
			this.social.selectedForumTopic.title = this.FormTopicTitle;
			this.social.selectedForumTopic.text = this.ForumTopicText;
			this.social.selectedForumTopic.personId = this.userObj._id;
			this.social.selectedForumTopic.parentId = this.social.selectedForum._id;
		} else {
			this.social.selectedFormTopic.messages[this.selectedTopicIndex].messages.push()
		}
		let response = await this.social.saveForumTopic();
		if(!response.error){
			this.utils.showNotification('The forum was saved');
			this._cleanUp();
		}
	
	}

	respond(message, index){
		this.social.selectForumTopic(message, index);
		this.selectedTopicIndex = index;
		this.openMessageForm = true;
		this.openNewTopicForm = false;
	}

	back(){
		this.forumSelected = false;
		this.openNewTopicForm = false;
	}

}