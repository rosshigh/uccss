import { inject } from 'aurelia-framework';
import { DataServices } from './dataServices';
import { Utils } from '../utils/utils';
import {AppConfig} from '../../appConfig';

@inject(DataServices, AppConfig, Utils)
export class Auth {

	loginUrl = 'users/login';
	logoutUrl = 'users/logout';

	constructor(data, config, utils) {
		this.data = data;
		this.config = config;
		this.utils = utils;
	}

	async login(email, password) {


		let content = {
			'email': email,
			'password': password
		};

		let response = await this.data.login(content, this.loginUrl);
		if (!response.error) {
			response.user.userRole = this.setRole(response.user.roles);
			this.utils.login(response.user, response.token);
		}
		return response;
	}

	logout() {
		this.utils.logout();
	}

	isAuthenticated() {
		// let token = sessionStorage.getItem('token');
		let token = this.utils.getter('token');

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
			this.config.ROLES.forEach(item => {
				if (roles[i] == item.role) {
					userRole = item.authLevel > userRole ? item.authLevel : userRole;
				}
			})
		}
		return userRole;
	}

}

