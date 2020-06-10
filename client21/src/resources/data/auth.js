import { inject } from 'aurelia-framework';
// import {EventAggregator} from 'aurelia-event-aggregator';
import { DataServices } from './dataServices';
import { Store } from 'aurelia-store';

// @inject(EventAggregator, DataServices, AppConfig)
@inject(DataServices, Store)
export class Auth {

	loginUrl = 'users/login';
	logoutUrl = 'users/logout';

	constructor(data, store) {
		// this.eventAggregator = eventAggregator;
		this.data = data;
		this.store = store;
	}

	bind() {
		this.subscription = this.store.state.subscribe(
			(state) => this.state = state
		);
	}

	unbind() {
		this.subscription.unsubscribe();
	}

	async login(email, password) {
		let content = {
			'email': email,
			'password': password
		};

		let response = await this.data.login(content, this.loginUrl);
		if (!response.error) {
			response.user.userRole = this.setRole(response.user.roles);
			this.store.token = response.token;
			this.store.user = JSON.stringify(response.user)
		}
		// this.eventAggregator.publish('auth:login', response);
		return response;
	}

	logout(email) {
		this.data.saveObject({ email: email }, this.logoutUrl, 'post');
		// sessionStorage.removeItem('token');
		// sessionStorage.removeItem('user');
		// sessionStorage.removeItem('role');
		// sessionStorage.removeItem('alert');
	}

	isAuthenticated() {
		let token = this.store.token;
		// let token = sessionStorage.getItem('token');

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

	/*****************************************************************************
 * Determine users role for authorizations
 ****************************************************************************/
	setRole(roles) {
		let userRole = 1;

		for (let i = 0; i < roles.length; i++) {
			// this.config.ROLES.forEach(item => {
			this.store.config.ROLES.forEach(item => {
				if (roles[i] == item.role) {
					userRole = item.authLevel > userRole ? item.authLevel : userRole;
				}
			})
		}
		return userRole;
	}

}
