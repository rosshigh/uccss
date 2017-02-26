import {inject} from 'aurelia-framework';
import {DataServices} from './dataServices';

@inject(DataServices)
export class AdminData{
	AUTH_SERVICE = "/adminLog/";
	LOG_SERVICE = "/log/";

	constructor(data){
		this.data = data;
	}

	async getAuthLogs(){
		let response = await this.data.get(this.AUTH_SERVICE);
		if(!response.error){
			this.authLogFileArray = response;
		} 
		return response;
	}

	async getAuthLogFile(fileName){
		if(fileName){
			let response = await this.data.get(this.AUTH_SERVICE + fileName);
			if(!response.error){
				this.authLogContents = response;
			}
			return response;
		}
	}

	async deleteAuthFiles(filesToDelete){
		let obj = {
			files: filesToDelete
		};
		let response = await this.data.saveObject(obj, this.AUTH_SERVICE, "put");	
		return response;
	}

	async getLogs(){
		let response = await this.data.get(this.LOG_SERVICE);
		if(!response.error){
			this.authLogFileArray = response;
		} 
		return response;
	}

	async getLogFile(fileName){
		if(fileName){
			let response = await this.data.get(this.LOG_SERVICE + fileName);
			if(!response.error){
				this.logContents = response;
			}
			return response;
		}
	}
}