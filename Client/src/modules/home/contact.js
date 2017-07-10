import {inject} from 'aurelia-framework';
import {SiteInfo} from '../../resources/data/siteInfo';
import {People} from '../../resources/data/people';
import {AppConfig} from '../../config/appConfig';

@inject(SiteInfo, People, AppConfig)
export class Contact {
	title="UCC Contact Information";

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
			if(item.roles.indexOf('TMAN') > -1){
				this.directors.push({item: item, role: 'TMAN'});
			} else if(item.roles.indexOf('EDIR') > -1) {
				this.directors.push({item: item, role: 'EDIR'});
			} else if(item.roles.indexOf('TDIR') > -1) {
				this.directors.push({item: item, role: 'TDIR'});
			} else if(item.roles.indexOf('TMGR') > -1) {
				this.directors.push({item: item, role: 'TMGR'});
			} else if(item.roles.indexOf('UCCT') > -1 && item.roles.indexOf('STUT') == -1) {
				this.staff.push(item);
			} else if(item.roles.indexOf('UCCA') > -1 ) {
				this.admin.push(item)
			}
		})

		this.staff = this.staff.sort((a, b) => {
			return a.lastName > b.lastName;
		});

		this.directors = this.directors.sort((a, b) => {
			return a.role > b.role;
		});
    }

}
