import {inject} from 'aurelia-framework';
import { AppConfig } from '../../../appConfig';
import { Utils } from '../../../resources/utils/utils';
import { Config } from '../../../resources/data/config';

@inject(Utils, AppConfig, Config)
export class EditConfig {
    parameterSelected = false;
    
    navControl = "configNavButtons";
    spinnerHTML = "";
    tabCode = "a";
    pageSize = 200;

    tabs = [{ id: 'Assignments' }, { id: 'Interface' }, { id: 'UCC Information' }, {id: "Email Content"}];
    tabPath = './';


    constructor(utils, config, appConfig) {
        this.utils = utils;
        this.config = config;
        this.appConfig = appConfig;

        
        this.filters = [
            { value: '', keys: ['parameter'] }
        ];
    }

    attached(){
        $('[data-toggle="tooltip"]').tooltip();
    }

    async activate() {
        await this.appConfig.getObjectArray();
        this.visibleCategory = "a";
    }

    async refresh() {
        await this.appConfig.getObjectArray();
    }

    edit(parameter){
        let index;
        for(let i = 0; i < this.appConfig.objectArray.length; i++){
            if(this.appConfig.objectArray[i].parameter === parameter.parameter){
                index = i;
            }
        }
        this.selectedIndex = index;
        this.originalParameter = this.utils.copyObject(this.appConfig.objectArray[index]);
        this.parameterSelected = true;
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }

	async save(){
		let response = await this.appConfig.saveAll();
		if(!response.error){  
            tils.showNotification('The confiugration was saved.')
		}
        this.cleanUp();
	}

    cleanUp(){
        this.filters[0].value = "";
        this.refresh();
        this.parameterSelected = false;
    }

    back(){
        this.parameterSelected = false;
    }

    cancel(){
         this.appConfig.objectArray[this.selectedIndex]= this.utils.copyObject(this.originalParameter );
    }

    switchValue(parameter, value){
        let index;
        for(let i = 0; i < this.appConfig.objectArray.length; i++){
            if(this.appConfig.objectArray[i].parameter === parameter.parameter){
                index = i;
            }
        }
        this.appConfig.objectArray[index].value = this.appConfig.objectArray[index].value == 'false' || this.appConfig.objectArray[index].value == false;
    }
}