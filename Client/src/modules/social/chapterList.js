import {inject} from 'aurelia-framework';
import {Chapters} from '../../resources/data/chapters';
import {People} from '../../resources/data/people';
import {AppConfig} from '../../config/appConfig';

@inject(Chapters, People, AppConfig)
export class ChapterList {
    constructor(chapters, people, config){
		this.chapters = chapters;
		this.people = people;
		this.config = config;
    }
    
    attached(){
        $('[data-toggle="tooltip"]').tooltip();
    }

	async activate(){
		let responses = await Promise.all([
			this.chapters.getChaptersArray('',true)
		]);
	}
}