import {inject} from 'aurelia-framework';
import {DataTable} from '../../../resources/utils/dataTable';
import {AppConfig} from '../../../config/appConfig';
import {Utils} from '../../../resources/utils/utils';
import {Config} from '../../../resources/data/config';
import $ from 'jquery';

@inject(DataTable, Config, Utils, AppConfig)
export class EditConfig {
    parameterSelected = false;
    
    navControl = "configNavButtons";
    spinnerHTML = "";

    constructor(datatable, siteConfig, utils, config) {
        this.dataTable = datatable;
        this.dataTable.initialize(this);
        this.utils = utils;
        this.siteConfig = siteConfig;
        this.config = config;
    }

    attached(){
        $('[data-toggle="tooltip"]').tooltip();
    }

    async activate() {
        await this.getData();
    }

    async getData() {
      let responses = await Promise.all([
        this.siteConfig.getConfigArray(true)
      ]);

        this.updateArray();

        this.dataTable.createPageButtons(1);
    }

    async refresh() {
        this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
        await this.siteConfig.getConfigArray(true);
        this.updateArray();
        this.spinnerHTML = "";
    }

    updateArray(){
        this.displayArray = this.siteConfig.configArray ? this.siteConfig.configArray : new Array();
        this.baseArray = this.displayArray;

        for (var i = 0; i < this.baseArray.length; i++) {
            this.baseArray[i].baseIndex = i;
        }
    }

	async save(){
		let response = await this.siteConfig.saveAll(this.displayArray);
		if(!response.error){
			this.utils.showNotification('The confiugration was saved.')
		}
	}

	cancel(){
		this.updateArray();
	}

}