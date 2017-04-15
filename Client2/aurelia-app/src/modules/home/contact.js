import {inject} from 'aurelia-framework';
import {SiteInfo} from '../../resources/data/siteInfo';

@inject(SiteInfo)
export class Contact {

	constructor( siteinfo ) {
        this.siteinfo = siteinfo;
    }

	async activate() {
        await this.siteinfo.getInfoArray();

		this.contactInfo = "";
		for(let i = 0; this.siteinfo.siteArray.length; i++){
			if(this.siteinfo.siteArray[i].itemType === 'CONT') {
				this.contactInfo = this.siteinfo.siteArray[i].content;
				break;
			}
		}
    }
	
}