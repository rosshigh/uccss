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
        await this.siteConfig.getConfigArray(true)

        this.dataTable.updateArray(this.siteConfig.configArray);
    }

    async refresh() {
        this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
        await this.siteConfig.getConfigArray(true);
        this.dataTable.updateArray(this.siteConfig.configArray);
        this.spinnerHTML = "";
    }

    edit(parameter){
        let index;
        for(let i = 0; i < this.siteConfig.configArray.length; i++){
            if(this.siteConfig.configArray[i].parameter === parameter.parameter){
                index = i;
            }
        }
        this.selectedIndex = index;
        this.originalParameter = this.utils.copyObject(this.siteConfig.configArray[index]);
        this.parameterSelected = true;
    }

	async save(){
		let response = await this.siteConfig.saveAll(this.dataTable.displayArray);
		if(!response.error){
            this.refresh();
            this.parameterSelected = false;
			this.utils.showNotification('The confiugration was saved.')
		}
	}

    back(){
        this.parameterSelected = false;
    }

    cancel(){
         this.siteConfig.configArray[this.selectedIndex]= this.utils.copyObject(this.originalParameter );
    }

    switchValue(parameter, value){
        let index;
        for(let i = 0; i < this.siteConfig.configArray.length; i++){
            if(this.siteConfig.configArray[i].parameter === parameter.parameter){
                index = i;
            }
        }
        this.siteConfig.configArray[index].value = this.siteConfig.configArray[index].value == 'false' || this.siteConfig.configArray[index].value == false;
        this.dataTable.updateArray(this.siteConfig.configArray);
    }

	cancel(){
		this.siteConfig.configArray
	}

}