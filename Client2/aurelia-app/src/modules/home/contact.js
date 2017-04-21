import {inject} from 'aurelia-framework';
import {SiteInfo} from '../../resources/data/siteInfo';
import {People} from '../../resources/data/people';
import {AppConfig} from '../../config/appConfig';

@inject(SiteInfo, People, AppConfig)
export class Contact {

	constructor( siteinfo, people, config ) {
        this.siteinfo = siteinfo;
		this.people = people;
		this.config = config;
    }

	async activate() {
		let uccRoles = "";
		this.config.ROLES.forEach(item => {
			if(item.UCConly) uccRoles += item.role + ":";
		});

        // await this.siteinfo.getInfoArray();
		await this.config.getConfig()
		await this.people.getUCCStaff(uccRoles);

		this.showPersonalContactInfo = this.config.SHOW_STAFF_CONTACT == 0;

		this.directors = new Array();
		this.staff = new Array();
		this.admin = new Array();
		this.people.uccPeople.forEach(item => {
			if(item.roles.indexOf('TMAN') > -1) {
				this.directors.push(item);
			} else if(item.roles.indexOf('UCCT') > -1) {
				this.staff.push(item);
			} else if(item.roles.indexOf('UCCA') > -1 ) {
				this.admin.push(item)
			}
		})
		
		this.staff = this.staff.sort((a, b) => {
			return a.lastName > b.lastName;
		})

		// this.contactInfo = "";
		// for(let i = 0; this.siteinfo.siteArray.length; i++){
		// 	if(this.siteinfo.siteArray[i].itemType === 'CONT') {
		// 		this.contactInfo = this.siteinfo.siteArray[i].content;
		// 		break;
		// 	}
		// }
    }
	
}