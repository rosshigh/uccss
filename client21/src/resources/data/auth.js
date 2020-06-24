import { inject } from 'aurelia-framework';
import { DataServices } from './dataServices';
import {Store} from '../../store/store';

@inject(DataServices, Store)
export class Auth {

	loginUrl = 'users/login';
	logoutUrl = 'users/logout';

	constructor(data, store) {
		this.data = data;
		this.store = store;
	}

	async login(email, password) {


		let content = {
			'email': email,
			'password': password
		};

		let response = await this.data.login(content, this.loginUrl);
		if (!response.error) {
			response.user.userRole = this.setRole(response.user.roles);
			this.store.login(response.user, response.token);
		}
		return response;
	}

	logout() {
		this.store.logout();
	}

	isAuthenticated() {
		// let token = sessionStorage.getItem('token');
		let token = this.store.getter('token');

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
		let config = this.store.getConfig();
		let ROLES = config["ROLES"];
		let userRole = 1;

		for (let i = 0; i < roles.length; i++) {
			// this.config.ROLES.forEach(item => {
			ROLES.forEach(item => {
				if (roles[i] == item.role) {
					userRole = item.authLevel > userRole ? item.authLevel : userRole;
				}
			})
		}
		return userRole;
	}

}

