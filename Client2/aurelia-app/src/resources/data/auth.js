import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {DataServices} from './dataServices';
import {Utils} from '../utils/utils';

@inject(EventAggregator, DataServices, Utils)
export class Auth {

	loginUrl = 'users/login';
	logoutUrl = 'users/logout';

	constructor(eventAggregator, data, utils){
		this.eventAggregator = eventAggregator;
		this.data = data;
		this.utils = utils;
	}

	async login(email, password) {
		// let loginUrl = this.auth.getLoginUrl();
		let content = {
			'email': email,
			'password': password
		};

		let response = await this.data.login(content, this.loginUrl);
		if(!response.error){
			response.user.userRole = this.utils.setRole(response.user.roles);
			sessionStorage.setItem('token', response.token);
			sessionStorage.setItem('user', JSON.stringify(response.user));
		}
		this.eventAggregator.publish('auth:login', response);
		return response;
	}

	logout(email){
		this.data.saveObject({email: email}, this.logoutUrl,'post');
		sessionStorage.removeItem('token');
		sessionStorage.removeItem('user');
	}

	isAuthenticated() {
		let token = sessionStorage.getItem('token');

		// There's no token, so user is not authenticated.
		if (!token) {
			return false;
		}

		// There is a token, but in a different format. Return true.
		if (token.split('.').length !== 3) {
			return true;
		}

		let exp;
		try {
			let base64Url = token.split('.')[1];
			let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
			exp = JSON.parse(window.atob(base64)).exp;
		} catch (error) {
			return false;
		}

		if (exp) {
			return Math.round(new Date().getTime() / 1000) <= exp;
		}

		return true;
	}
	
}