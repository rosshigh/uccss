import { inject } from 'aurelia-framework';
import { ValidationRules, ValidationControllerFactory, validationMessages } from 'aurelia-validation';
import { Inventory } from '../../../resources/data/inventory';
import { DocumentsServices } from '../../../resources/data/documents';
import { AppConfig } from '../../../appConfig';
import { Utils } from '../../../resources/utils/utils';

@inject(ValidationControllerFactory, Inventory, DocumentsServices, AppConfig, Utils)
export class ManageInventory {

    constructor(ValidationControllerFactory, inventory, systems, documents, config, utils){
        this.controller = ValidationControllerFactory.createForCurrentScope();
        this.inventory = inventory;
        this.systems = systems;
        this.documents = documents;
        this.config = config;
        this.utils = utils;
    }

    async activate(){
        $("#loading").show();
        let responses = await Promise.all([
          this.inventory.getObjectsArray()
        ]);
        $("#loading").hide();
    }
}