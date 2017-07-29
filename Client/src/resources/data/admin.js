import {inject} from 'aurelia-framework';
import {DataServices} from './dataServices';

@inject(DataServices)
export class AdminData{
	AUTH_SERVICE = "/adminLog/";
	LOG_SERVICE = "/log/";
	FILES_SERVICE = '/files/';
	FOREVER_SERVICE = '/foreverLog/'

	constructor(data){
		this.data = data;
	}

	async getLogs(type){
		let url;
		switch(type){
			case 'auth':
				url = this.AUTH_SERVICE;
				break;
			case 'log':
				url = this.LOG_SERVICE;
				break;
			case 'forl':
				url = this.FOREVER_SERVICE + 'fileList/f';
				break;
			case 'fore':
				url = this.FOREVER_SERVICE + 'fileList/e';
				break;
			case 'foro':
				url = this.FOREVER_SERVICE + 'fileList/o';
				break;
		}
		let response = await this.data.get(url);
		if(!response.error){
			this.logFileArray = response;
		} 
		return response;

	}

	async getLogFile(fileName, type){ 
		if(fileName && type){
				let url; 
			switch(type){
				case 'auth':
					url = this.AUTH_SERVICE;
					break;
				case 'log':
					url = this.LOG_SERVICE;
					break;
				case 'forl':
				case 'fore':
				case 'foreo':
					url = this.FOREVER_SERVICE;
			}
			let response = await this.data.get(url + fileName);
			if(!response.error){
				this.logContents = response;
			}
			return response;
		}
	}

	// async getAuthLogs(){
	// 	let response = await this.data.get(this.AUTH_SERVICE);
	// 	if(!response.error){
	// 		this.authLogFileArray = response;
	// 	} 
	// 	return response;
	// }

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

	// async getLogs(){
	// 	let response = await this.data.get(this.LOG_SERVICE);
	// 	if(!response.error){
	// 		this.authLogFileArray = response;
	// 	} 
	// 	return response;
	// }

	// async getLogFile(fileName){
	// 	if(fileName){
	// 		let response = await this.data.get(this.LOG_SERVICE + fileName);
	// 		if(!response.error){
	// 			this.logContents = response;
	// 		}
	// 		return response;
	// 	}
	// }

	async deleteLogFiles(filesToDelete){
		let obj = {
			files: filesToDelete
		};
		let response = await this.data.saveObject(obj, this.LOG_SERVICE, "put");	
		return response;
	}

	async getFiles(){
		let response = await this.data.get(this.FILES_SERVICE);
		if(!response.error){
			this.parseFileList(response);
		} 
		return response;
	}

	parseFileList(response){
		this.files = response;
		this.filesList = {
			name: "Uploaded Files",
			value: "root",
			file: false,
			children: new Array()
		};
		this.files.forEach(item => {
			let parts = item.split('\\');
			let index = this.categoryIndex(parts[2]);
			if(index === -1){
				this.filesList.children.push({
					name: parts[2],
					value: parts[2],
					file: false,
					children: []
				})
			}
		})
		for( let index = 0; index < this.files.length; index++){
			let parts = this.files[index].split('\\');
			let fileListindex = this.categoryIndex(parts[2]);
			if(parts.length === 4){
				index = this.processShallowTree(fileListindex, index);
			} else {
				index = this.processDeepTree(fileListindex, index);
			}
		}
	}
  
	processShallowTree(fileListindex, index){
		var parts = this.files[index].split('\\');
		var thisCategory = parts[2];
		var fileName = parts[3];
		do {
			this.filesList.children[fileListindex].children.push({
				name: fileName,
				value: thisCategory +'-'+ fileName,
				file: true,
				path: this.files[index]
			});
			index++;
			parts = this.files[index].split('\\');
			fileName = parts[3];
		} while(thisCategory === parts[2])

		return --index;
	}

	processDeepTree(fileListindex, index){
		var parts = this.files[index].split('\\');
		var thisCategory = parts[2];
		var thisSubCategory = parts[3];
		var fileName = parts[4];
		this.filesList.children[fileListindex].children.push({
			name: thisSubCategory,
			value: thisCategory +'-'+ thisSubCategory,
			file: false,
			children: [{
				name: fileName,
				value: thisSubCategory + '-' + fileName,
				file: true,
				path: this.files[index]
			}]
		});
		index++;
		if(index < this.files.length){
		parts = this.files[index].split('\\');
		var childIndex = this.filesList.children[fileListindex].children.length - 1;
		while(thisSubCategory === parts[3]) {
			fileName = parts[4];
			this.filesList.children[fileListindex].children[childIndex].children.push({
				name: fileName,
				value: thisSubCategory +'-'+ fileName,
				file: true,
				path: this.files[index]
			});
			index++;
			if(index < this.files.length) {
				parts = this.files[index].split('\\');
			} else {
				break;
			}
			}
		}
		return --index;
	}

	categoryIndex(category){
		for(let i = 0; i < this.filesList.children.length; i++){
		if(this.filesList.children[i].name === category) return i;
		}
		return -1;
	}

	async deleteFile(file){
		if(file){
			file = file.split('\\').join('$@');
			let response = await this.data.deleteObject(this.FILES_SERVICE + "/" + file);
			return response
		}
	}

}