import {inject} from 'aurelia-framework';
import {DataTable} from '../../../resources/utils/dataTable';
import {AppConfig} from '../../../config/appConfig';
import {Utils} from '../../../resources/utils/utils';
import {AdminData} from '../../../resources/data/admin';
import moment from "moment";

@inject(DataTable, AppConfig, Utils, AdminData)
export class Admin {
	screenToShow = "";
	spinnerHTML = "";

	constructor(dataTable, config, utils, admin){
		this.dataTable = dataTable;
		this.dataTable.initialize(this);
		this.config = config;
		this.utils = utils;
		this.admin = admin;
	}

	canActivate(){
        this.userObj = JSON.parse(sessionStorage.getItem('user'));
    }

	attached(){
        $('[data-toggle="tooltip"]').tooltip();
    }

	async typeSelected(){
		this.clearFilters();
		switch(this.screenToShow){
			case 'auth':
				let response = await this.admin.getAuthLogs();
				if(!response.error){
					this.fileList = this.utils.copyArray(response);
					for(let i = 0; i < this.fileList.length; i++){
						this.fileList[i] = this.fileList[i].substring(0,this.fileList[i].indexOf('.log'));
					};
				}
				break;
			case 'log':
				let logResponse = await this.admin.getLogs();
				if(!logResponse.error){
					this.fileList = this.utils.copyArray(logResponse);
					for(let i = 0; i < this.fileList.length; i++){
						this.fileList[i] = this.fileList[i].substring(0,this.fileList[i].indexOf('.log'));
					};
				}
				break;
			default:
				this.fileList = new Array();
		}
		this.fileList.reverse();
		
	}

	async fileSelected(index){
		this.clearFilters();
		this.fileIndex = index;
		switch(this.screenToShow){
			case 'auth':
				let response = await this.admin.getAuthLogFile(this.fileList[index] + '.log');
				if(!response.error){
					this.fileContents = new Array();
					for(let i = 0; i < this.admin.authLogContents.length; i++){
						if(this.admin.authLogContents[i].message){
							let array = this.admin.authLogContents[i].message.split('-');
							let dateTime = new Date(this.admin.authLogContents[i].timestamp);
							this.fileContents.push({
								event: array[0],
								data: array[1],
								date: moment(dateTime).format("YYYY-MM-DD HH:mm:ss")
							})
						}
					};
					this.dataTable.updateArray(this.fileContents);
				}
				break;
			case 'log':
				let logResponse = await this.admin.getLogFile(this.fileList[index] + '.log');
				if(!logResponse.error){
					this.fileContents = new Array();
					for(let i = 0; i < this.admin.logContents.length; i++){
						var j, code;
						if(this.admin.logContents[i].message){
							let dateTime = new Date(this.admin.logContents[i].timestamp);
							let array = this.admin.logContents[i].message.split('-');
							let data = "";
							if(this.admin.logContents[i].level !== 'error'){
								j = 0;
								code = "";
							} else {
								j = 1;
								code = array[0];
							}
							for(; j < array.length; j++){
								data = data + array[j] + '</br>';
							}
							this.fileContents.push({
								event: this.admin.logContents[i].level,
								code: code,
								data: data,
								date: moment(dateTime).format("YYYY-MM-DD HH:mm:ss")
							})
						}
					};
					this.dataTable.updateArray(this.fileContents);
				}
				break;
			default:
				this.fileList = new Array();
		}
	}

	async deleteFiles(){
		switch(this.screenToShow){
			case 'auth':
				this.filesToDelete = parseInt(this.filesToDelete)
				if(this.filesToDelete > 0){
					let deleteFileArray = new Array();
					for(let i = 0; i <= this.filesToDelete, i < this.fileList.length; i++ ){
						deleteFileArray.push(this.fileList[i]);
					}
					let response = await this.admin.deleteAuthFiles(deleteFileArray);
					if(!response.error){

						this.utils.showNotification(this.filesToDelete + ' files were deleted');
					} else {
						this.utils.showNotification('There was problem deleting the files');
					}
				}
				break;
		}
	}

	clearFilters(){
		$(this.eventFilter).val('');
		$(this.codeFilter).val('');
		$(this.eventFilter).val('');
	}
}