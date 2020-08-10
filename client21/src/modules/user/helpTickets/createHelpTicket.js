import { inject, BindingEngine } from 'aurelia-framework';
import {BindingSignaler} from 'aurelia-templating-resources';
import { HelpTickets } from '../../../resources/data/helpTickets';
import { Store } from '../../../store/store';
import { AppConfig } from '../../../appConfig';
import { Utils } from '../../../resources/utils/utils';
import * as smartWizard from '../../../resources/js/jquery.smartWizard.min';

@inject( BindingEngine, HelpTickets, Store, AppConfig, Utils)
export class UserCreateHelpTicket {
    
    constructor(bindingEngine, helpTickets, store, config, utils){
        this.bindingEngine = bindingEngine;
        this.helpTickets = helpTickets;
        this.store = store;
        this.config = config;
        this.utils = utils;

        let subscriptionOne = bindingEngine
        .propertyObserver(this, 'helpTicketCategory')
        .subscribe((newValue, oldValue) => this.helpTicketCategoryChange(newValue, oldValue));
    }

    helpTicketCategoryChange(newValue, oldValue){
        this.helpTicketType = '';
    }

    async activate(){
        let responses = await Promise.all([
            this.helpTickets.getHelpTicketTypes('?order=category'),
        ]);
        this.helpTickets.selectObject();
       
        this.subCategoryArray = undefined;
        // this.helpTickets.helpTicketTypesArray[0].subtypes.forEach(item => {
        //     this.subCategoryArray.push(item);
        // })
    }

    attached(){
        $('.selectpicker').selectpicker();
        $('#smartwizard').smartWizard();
    }

    async categoryChanged() {
        this.catIndex = this.getCategoryIndex();
        // await this.getActiveRequests();
        this.subCategoryArray = [];
        this.helpTickets.helpTicketTypesArray[this.catIndex].subtypes.forEach(item => {
            this.subCategoryArray.push(item);
        })
      
        this.showTypes = true;
        console.log(this.subCategoryArray)
    }

    getCategoryIndex() {
        var index = 0;
        this.helpTickets.helpTicketTypesArray.forEach((item, categoryIndex) => {
            if (this.helpTickets.selectedHelpTicket.helpTicketCategory == item.category) {
                index = categoryIndex;                
            }
        });
        return index;
    }

    typeChanged() {
        this.selectedHelpTicketType = this.getTypeIndex();
        this.requestsRequired = this.helpTickets.helpTicketTypesArray[this.catIndex].requestsRequired;
        this.descriptionRequired = this.helpTickets.helpTicketTypesArray[this.catIndex].subtypes[this.selectedHelpTicketType].descriptionRequired;
        this.showForm = true;
    }

    getTypeIndex() {
        var typeIndex = 0;
        this.helpTickets.helpTicketTypesArray[this.catIndex].subtypes.forEach((item, typIndex) => {
            if (this.helpTickets.selectedHelpTicket.helpTicketType == item.type) {
                typeIndex = typIndex;
            }
        });
        return typeIndex;
    }

    refreshSelects(){
        this.utils.refreshSelect("#helpTicketType", this.helpTickets.helpTicketTypesArray[this.catIndex].subtypes, "_id", this.helpTickets.selectedHelpTicket.helpTicketType);
    }
}