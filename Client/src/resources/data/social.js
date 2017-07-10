import {inject} from 'aurelia-framework';
import {DataServices} from './dataServices';
import {Utils} from '../utils/utils';

@inject(DataServices, Utils)
export class Social {
	BLOGS_SERVICES = 'blogs';
    FORUMS_SERVICES = 'forums';
    FORUMS_MESSAGES_SERVICES = 'forumMessages';

    constructor(data, utils) {
        this.data = data;
		this.utils = utils;
    }

    async getBlogArray(options, refresh){
        if (!this.blogArray || refresh) {
          var url = this.BLOGS_SERVICES;
          url += options ? options : "";
            try {
                let serverResponse = await this.data.get(url);
                if (!serverResponse.error) {
                    this.blogArray = serverResponse;
                } 
            } catch (error) {
                console.log(error);
            }
        }
    }

	selectBlog(index){
		if(!index && index !== 0){
			this.selectedBlog = this.emptyBlog()
		} else {
			this.selectedBlog = this.utils.copyObject(this.blogArray[index]);
            this.selectedBlogIndex = index;
		}
	}

	emptyBlog(){
		let obj = new Object();
		obj.title = "";
		obj.text = "";
		obj.personId = "";
		return obj;
	}

	async saveBlog(){
		if(!this.selectedBlog){
		     return;
        }
        var url = this.BLOGS_SERVICES;

        if(!this.selectedBlog._id){
            var response = await this.data.saveObject(this.selectedBlog, url, "post");
            if (!response.error) {
                this.selectedBlog = this.utils.copyObject(response);
                if(this.blogArray) this.blogArray.push(this.selectedBlog);
            } else {
                     this.data.processError(response, "There was an error creating the blog.");
            }
            return response;
        } else {
            var response = await this.data.saveObject(this.selectedBlog, url, "put");
            if (!response.error) {
                this.selectedBlog = this.utils.copyObject(response);
                this.blogArray[this.editIndex] = this.utils.copyObject(this.selectedBlog, this.blogArray[this.editIndex]);

            } else {
                 this.data.processError(response, "There was an error updating the blog.");
                }
            return response;
        }
	}

    updateViews(){
        if(!this.selectedBlog){
		     return;
        }
        var url = this.BLOGS_SERVICES;
        this.data.saveObject(this.selectedBlog, url, "put");
    }

    async deleteBlog(){
         if(this.selectedBlog._id){
            let serverResponse = await this.data.deleteObject(this.BLOGS_SERVICES + '/' + this.selectedBlog._id);
            if (!serverResponse.error) {
                this.blogArray.splice(this.selectedBlogIndex, 1);
                this.selectedBlogIndex = - 1;
            }
            return serverResponse;
        }
        return null;
    }

    async getForumArray(options, refresh){
        if (!this.forumArray || refresh) {
          var url = this.FORUMS_SERVICES;
          url += options ? options : "";
            try {
                let serverResponse = await this.data.get(url);
                if (!serverResponse.error) {
                    this.forumArray = serverResponse;
                } else {
                    return undefined;
                }
            } catch (error) {
                console.log(error);
                return undefined;
            }
        }
        return this.forumArray;
    }

	selectForum(index){
		if(!index && index !== 0){
			this.selectedForum = this.emptyForum()
		} else {
			this.selectedForum = this.utils.copyObject(this.forumArray[index]);
		}
	}

	emptyForum(){
		let obj = new Object();
		obj.title = "";
		obj.text = "";
		obj.personId = "";
	    obj.type = "General";
		return obj;
	}

	async saveForum(){
		if(!this.selectedForum){
		     return;
        }
        var url = this.FORUMS_SERVICES;

        if(!this.selectedForum._id){
            var response = await this.data.saveObject(this.selectedForum, url, "post");
            if (!response.error) {
                this.selectedForum = this.utils.copyObject(response);
                if(this.forumArray) this.forumArray.push(this.selectedForum);
            } else {
                     this.data.processError(response, "There was an error creating the blog.");
                }
            return response;
        } else {
            var response = await this.data.saveObject(this.selectedForum, url, "put");
            if (!response.error) {
                this.selectedForum = this.utils.copyObject(response);
                this.forumArray[this.editIndex] = this.utils.copyObject(this.selectedForum, this.forumArray[this.editIndex]);

            } else {
                 this.data.processError(response, "There was an error updating the blog.");
                }
            return response;
        }
	}

    async getForumMessages(options, refresh){
        if (!this.forumMessageArray || refresh) {
          var url = this.FORUMS_MESSAGES_SERVICES;
          url += options ? options : "";
            try {
                let serverResponse = await this.data.get(url);
                if (!serverResponse.error) {
                    this.forumMessageArray = serverResponse;
                } else {
                    return undefined;
                }
            } catch (error) {
                console.log(error);
                return undefined;
            }
        }
        return this.forumMessageArray;
    }

    selectForumTopic(index){
		if(!index && index !== 0){
			this.selectedForumTopic = this.emptyForumTopic()
		} else {
			this.selectedForumTopic = this.utils.copyObject(this.forumMessageArray[index]);
		}
	}

	emptyForumTopic(){
		let obj = new Object();
        obj.discussionId = this.selectedForum._id;
		obj.title = "";
		obj.text = "";
		obj.personId = "";
        obj.parentId = "";
	    obj.level = 0;
		return obj;
	}

    selectTopicMessage(message, index){
        if(!index && index !== 0){
			this.selectedTopicMessage = this.emptyTopicMessage(message)
		} else {
			this.selectedTopicMessage = this.utils.copyObject(this.forumArray.messages[index]);
		}
    }

    emptyTopicMessage(message){
		let obj = new Object();
		obj.text = "";
		obj.personId = "";
        obj.parentId = message._id;
	    obj.level = 0;
		return obj;
	}


	async saveForumTopic(){
		if(!this.selectedForumTopic){
		     return;
        }
        var url = this.FORUMS_MESSAGES_SERVICES;

        if(!this.selectedForumTopic._id){
            var response = await this.data.saveObject(this.selectedForumTopic, url, "post");
            if (!response.error) {
                this.selectedForumTopic = this.utils.copyObject(response);
                 this.selectedForum.messages.push(this.selectedForumTopic);
                // if(this.forumMessageArray) this.forumArray.push(this.selectedForumTopic);
            } else {
                     this.data.processError(response, "There was an error creating the blog.");
                }
            return response;
        } else {
            var response = await this.data.saveObject(this.selectedForumTopic, url, "put");
            if (!response.error) {
                this.selectedForumTopic = this.utils.copyObject(response);
                 this.selectedForum.messages.push(this.selectedForumTopic);
                // this.forumMessageArray[this.editIndex] = this.utils.copyObject(this.selectedForumTopic, this.forumMessageArray[this.editIndex]);

            } else {
                 this.data.processError(response, "There was an error updating the blog.");
                }
            return response;
        }
	}

}