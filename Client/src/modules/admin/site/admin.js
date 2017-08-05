import {inject} from 'aurelia-framework';
import {DataTable} from '../../../resources/utils/dataTable';
import {AppConfig} from '../../../config/appConfig';
import {Utils} from '../../../resources/utils/utils';
import {AdminData} from '../../../resources/data/admin';
import {CommonDialogs} from '../../../resources/dialogs/common-dialogs';
import {EventAggregator} from 'aurelia-event-aggregator';
import moment from "moment";

@inject(DataTable, AppConfig, Utils, AdminData, CommonDialogs, EventAggregator)
export class Admin {
	screenToShow = "";
	spinnerHTML = "";
	foreverLog = "";
	showFileList = false;

	tabs = [
		{ id: 'Authorization Log', screenToShow: 'auth' }, 
		{ id: 'Transaction Log', screenToShow: 'log' }, 
		{ id: 'Files', screenToShow: 'files' }, 
		{ id: 'Forever Log', screenToShow: 'forl' }, 
		{ id: 'Forever Error Log', screenToShow: 'fore' },
		{id: "Forever Out Log", screenToShow: 'foro'}];
    tabPath = './';


	constructor(dataTable, config, utils, admin, dialog, EventAggregator){
		this.dataTable = dataTable;
		this.dataTable.initialize(this);
		this.config = config;
		this.utils = utils;
		this.admin = admin;
		this.dialog = dialog;
		this.ea = EventAggregator;

		this.userObj = JSON.parse(sessionStorage.getItem('user'));

	}

	activate(){
        this.firstLoad();
    }

	attached(){
        $('[data-toggle="tooltip"]').tooltip();

		this.ea.subscribe('delete-file', obj => {
			if(obj.file.file) this.deleteFile(obj);
		});
    }

	async refresh(){
		await this.typeSelected();
		this.fileSelected(this.fileIndex);
	}

	async firstLoad(){
		this.screenToShow = 'auth';
		let response = await this.admin.getLogs(this.screenToShow);
		if(!response.error){
			this.fileList = this.utils.copyArray(response);
			for(let i = 0; i < this.fileList.length; i++){
				this.fileList[i] = this.fileList[i].substring(0,this.fileList[i].indexOf('.log'));
			};
			this.fileList.reverse();
		}
	}

    updateButtons(el) {
        if (el.target.id != "") {
            $("#buttonGroup").children().removeClass('menuButtons');
            $("#buttonGroup").children().css("background-color","");
            $("#buttonGroup").children().css("color","");
            $(el.target).css("background-color",this.config.BUTTONS_BACKGROUND);
            $(el.target).css("color",this.config.ACTIVE_SUBMENU_COLOR);
        }
    }

	async typeSelected(el, index, type){
		this.updateButtons(el, index)
		this.clearFilters();
		this.screenToShow = type.screenToShow;
		switch(this.screenToShow){
			case 'auth':
			case 'log':
			case 'forl':
			case 'fore':
			case 'foro':
				this.foreverLog = "";
				let logResponse = await this.admin.getLogs(this.screenToShow);
				if(!logResponse.error){
					this.fileList = this.utils.copyArray(logResponse);
					for(let i = 0; i < this.fileList.length; i++){
						this.fileList[i] = this.fileList[i].substring(0,this.fileList[i].indexOf('.log'));
					};
					this.fileList.reverse();
				}
				break;
			case 'files':
				let fileResponse = await this.admin.getFiles();
				if(!fileResponse.error){
					this.showFileList = true;
					this.uploadedFileList = this.admin.filesList;
				}
				this.fileList = new Array();
				break;
			default:
				this.fileList = new Array();
		}
		
		
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
				let logResponse = await this.admin.getLogFile(this.fileList[index] + '.log', this.screenToShow);
				if(!logResponse.error){
					this.fileContents = new Array();
					for(let i = 0; i < this.admin.logContents.length; i++){
						var j, code;					
						if(this.admin.logContents[i].message){
							let dateTime = new Date(this.admin.logContents[i].timestamp);
							let array = this.admin.logContents[i].message.split('@@');
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
								data: data.replace(/%/g,":"),
								date: moment(dateTime).format("YYYY-MM-DD HH:mm:ss")
							})
						}
					};
					this.dataTable.updateArray(this.fileContents);
				}
				break;
				case 'forl':
				case 'fore':
				case 'foro':
					let foreveLogResponse = await this.admin.getLogFile(this.fileList[index] + '.log', this.screenToShow);
					if(!foreveLogResponse.error){
						this.foreverLog = foreveLogResponse;
					}
					break;
			default:
				this.fileList = new Array();
		}
	}

	uploadedFileSelected(file){
		this.selectedCategoryFiles = file;
		this.uploadedFilesArray = file.files;
		this.dataTable.updateArray(this.uploadedFilesArray);
	}

	deleteLogFile(file, index, path){	
		this.deletedFileIndex = index;
		if(file.indexOf('auth') > -1){
			var path = "log-auth\\"
		} else if(file.indexOf('results') > -1) {
			var path = "log\\";
		} else {
			var path = "forever-log\\"
		}
		file = path + file + ".log";
		var msg = "Are you sure you want to delete the file? This cannot be undone.";
		
		return this.dialog.showMessage(
			msg,
			"Confirm", 
			['Yes', 'No']
			).whenClosed(response => {
				if(!response.wasCancelled){
					this.deleteALogFile(file);
				} 
			});
	}

	async deleteALogFile(path){
		let response = await this.admin.deleteFile(path);
		if(!response.error){
			this.fileList.splice(this.deletedFileIndex,1);
			this.utils.showNotification('The file was deleted');
		}
	}

	deleteFile(obj){	
		var type = obj.file.value.split('-');
		this.deletedFile = obj.file.value;
		var msg = "Are you sure you want to delete the file?  It may affect links in other parts of the system.";
		
		return this.dialog.showMessage(
			msg,
			"Confirm", 
			['Yes', 'No']
			).whenClosed(response => {
				if(!response.wasCancelled){
					this.deleteAFile(obj.file.path);
				} 
			});
	}

	async deleteAFile(path){
		let response = await this.admin.deleteFile(path);
		if(!response.error){
			this.sliceDeletedFile();
			this.utils.showNotification('The file was deleted');
		}
	}

	sliceDeletedFile(){
		console.log(this.uploadedFileList)
		for(let i = 0; i < this.uploadedFileList.children.length; i++){
			for(let j = 0; j < this.uploadedFileList.children[i].children.length; j++){
				if(this.uploadedFileList.children[i].children[j].file){
					if(this.uploadedFileList.children[i].children[j].value === this.deletedFile){
						this.uploadedFileList.children[i].children.splice( j, 1 );
					}
				} else {
					for(let k = 0; k < this.uploadedFileList.children[i].children[j].children.length; k++){
						if(this.uploadedFileList.children[i].children[j].children[k].value === this.deletedFile){
							this.uploadedFileList.children[i].children[j].children.splice( k, 1 );
						}
					}
				}
			}
		}
		console.log(this.uploadedFileList)
		console.log(this.deletedFile)
	}

	deleteFiles(){	
		if(!this.filesToDelete || this.filesToDelete <= 0) return;
		var msg = "Are you sure you want to delete " + this.filesToDelete + " log files?  This action cannot be undone.";
		
		return this.dialog.showMessage(
			msg,
			"Confirm", 
			['Yes', 'No']
			).then(response => {
				if(!response.wasCancelled){
					this.deleteTheFiles();
				} 
			});
	}

	async deleteTheFiles(){
		switch(this.screenToShow){
			case 'auth':
				this.filesToDelete = parseInt(this.filesToDelete) <= this.fileList.length - 1  ? parseInt(this.filesToDelete) : this.fileList.length - 1;
				if(this.filesToDelete > 0){
					var deleteFileArray = new Array();
					for(let i = 1; i <= this.filesToDelete; i++ ){
						deleteFileArray.push(this.fileList[ this.fileList.length - i]);
					}
					let response = await this.admin.deleteAuthFiles(deleteFileArray);
					if(!response.error){

						this.utils.showNotification(this.filesToDelete + ' files were deleted');
					} else {
						this.utils.showNotification('There was problem deleting the files');
					}
				}
				break;
			case 'log':
				this.filesToDelete = parseInt(this.filesToDelete) <= this.fileList.length - 1  ? parseInt(this.filesToDelete) : this.fileList.length - 1;
				if(this.filesToDelete > 0){
					var deleteFileArray = new Array();
					for(let i = 1; i <= this.filesToDelete; i++ ){
						deleteFileArray.push(this.fileList[this.fileList.length - i]);
					}
					let response = await this.admin.deleteLogFiles(deleteFileArray);
					if(!response.error){

						this.utils.showNotification(this.filesToDelete + ' files were deleted');
					} else {
						this.utils.showNotification('There was problem deleting the files');
					}
				}
				break;
		}
	}

	rename(oldFile, index){
		this.renamedFileIndex = index;
		var msg = "Enter the new name";
		var fileObject = {title: "New name:", valueName: ""};
		
		return this.dialog.input(
			"Enter New Name", 
			fileObject,
			['Save', 'Cancel']
			).whenClosed(response => {
				if(!response.wasCancelled){
					this.renameAFile(oldFile, response.output.valueName);
				} 
			});
	}

	async renameAFile(oldFile, newFile){
		let response = await this.admin.renameALogFile(oldFile, newFile);
		if(!response.error){
			if(oldFile.indexOf('forever') > -1){
				var screenToShow = 'forl';
			} else if(oldFile.indexOf('error') > -1){
				var screenToShow = 'fore';
			} else {
				var screenToShow = 'foro';
			}
			this.foreverLog = "";
			let logResponse = await this.admin.getLogs(this.screenToShow);
			if(!logResponse.error){
				this.fileList = this.utils.copyArray(logResponse);
				for(let i = 0; i < this.fileList.length; i++){
					this.fileList[i] = this.fileList[i].substring(0,this.fileList[i].indexOf('.log'));
				};
				this.fileList.reverse();
			}
			this.utils.showNotification('The file was renamed');
		}
	}

	clearFilters(){
		$(this.eventFilter).val('');
		$(this.codeFilter).val('');
		$(this.eventFilter).val('');
	}
}