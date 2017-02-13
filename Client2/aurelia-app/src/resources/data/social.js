import {inject} from 'aurelia-framework';
import {DataServices} from './dataServices';
import {Utils} from '../utils/utils';

@inject(DataServices, Utils)
export class Social {
	BLOGS_SERVICES = 'blogs';

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
                } else {
                    return undefined;
                }
            } catch (error) {
                console.log(error);
                return undefined;
            }
        }
        return this.blogArray;
    }

	selectBlog(index){
		if(!index && index !== 0){
			this.selectedBlog = this.emptyBlog()
		} else {
			this.selectedBlog = this.utils.copyObject(this.blogArray[index]);
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

}