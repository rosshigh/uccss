import {inject} from 'aurelia-framework';
import {DataServices} from './dataServices';
import {Utils} from '../utils/utils';
import {AppConfig} from '../../config/appConfig';

@inject(DataServices, Utils, AppConfig)
export class Inventory {
    INVENTORY_SERVICE = 'inventory';           

    constructor(data, utils, config) {
        this.data = data;
        this.utils = utils;
        this.config = config; 
    }

    //Downloads
    async getInventoryArray(options, refresh) {
        if (!this.inventoryArray || refresh) {
            var url = this.INVENTORY_SERVICE;
            url += options ? options : "";
            try {
                let serverResponse = await this.data.get(url);
                if (!serverResponse.error) {
                    this.inventoryArray = serverResponse;
                } else {
                    return undefined;
                }
            } catch (error) {
                console.log(error);
                return undefined;
            }
        }
        return this.inventoryArray;
    }

    selectInventory(index) {
        if (!index && index != 0) {
            this.selectedInventory = this.emptyInventory();
        } else {
            try {
                this.selectedInventory = this.utils.copyObject(this.inventoryArray[index]);
                this.selectedIndex = index;
            } catch (error) {
                this.selectedInventory = this.emptyInventory();
            }

        }

    }

    emptyInventory() {
        var newObj = new Object();
		newObj.IPAddress = new Array();
        return newObj;
    }

    async saveInventory() {
        if (!this.selectedInventory) {
            return;
        }

        if (!this.selectedInventory._id) {
            let serverResponse = await this.data.saveObject(this.selectedInventory, this.INVENTORY_SERVICE, "post");
            if (!serverResponse.error) {
                this.selectedInventory = serverResponse;
                this.inventoryArray.push(this.selectedInventory);
                this.selectedIndex = this.inventoryArray.length - 1;
            }
            return serverResponse;
        } else {
            var serverResponse = await this.data.saveObject(this.selectedInventory, this.INVENTORY_SERVICE, "put");
            if (!serverResponse.error) {
                this.inventoryArray[this.selectedIndex] = this.utils.copyObject(this.selectedInventory, this.inventoryArray[this.selectedIndex]);
            }
            return serverResponse;
        }

    }


    isDirty(obj){
        if(this.selectedInventory){
            if(!obj){
                var obj = this.emptyInventory();
            }
            var skip = ['file'];  
            return this.utils.objectsEqual(this.selectedInventory, obj, skip );
        }
        return new Array();
     }
     

   
   
}