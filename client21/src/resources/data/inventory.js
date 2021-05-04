import { inject } from 'aurelia-framework';
import { DataServices } from './dataServices';
import { Utils } from '../utils/utils';

@inject(DataServices, Utils)
export class Inventory {

    INVENTORY_SERVICE = 'inventory';

    constructor(data, utils) {
        this.data = data;
        this.utils = utils;
    }

    async getObjectsArray(options) {
        var url = this.INVENTORY_SERVICE;
        url += options ? options : "";
        try {
            let serverResponse = await this.data.get(url);
            if (!serverResponse.error) {
                this.objectsArray = serverResponse;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getSmallObjectsArray(options) {
        var url = this.INVENTORY_SERVICE +"/small";
        url += options ? options : "";
        try {
            let serverResponse = await this.data.get(url);
            if (!serverResponse.error) {
                this.objectsArray = serverResponse;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getObject(id) {
        let url = this.INVENTORY_SERVICE + '/' + id;
        try {
            let serverResponse = await this.data.get(url);
            if (!serverResponse.error) {
                this.selectedObject = serverResponse;
                this.originalObject = this.utils.copyObject(this.selectedObject);
            } else {
                this.data.processError(serverResponse);
            }
        } catch (error) {
            console.log(error);
        }
    }

    selectObject(index) {
        if (index === undefined) {
            this.selectedObject = this.emptyProduct();
            this.newSystem = true;
        } else {
            try {
                this.selectedObject = this.utils.copyObject(this.objectsArray[index]);
            } catch (error) {
                console.log(error);
                this.selectedObject = this.emptyProduct();
                this.newSystem = true;
            }
        }
    }

    selectedObjectById(id) {
        this.selectedObject = this.emptyInventory();
        for (let i = 0; i < this.objectsArray.length; i++) {
            if (this.objectsArray[i]._id === id) {
                this.selectedObject = this.utils.copyObject(this.objectsArray[i]);
                return i;
            }
        }
        return -1;
    }

    emptyInventory() {
        var newObj = new Object();;
        newObj.systemName = "";
        newObj.description = "";
        return newObj;
    }

    async saveObject() {
        if (!this.selectedObject) {
            return;
        }

        if (!this.selectedObject._id) {
            let serverResponse = await this.data.saveObject(this.selectedObject, this.INVENTORY_SERVICE, "post");
            return serverResponse;
        } else {
            var serverResponse = await this.data.saveObject(this.selectedObject, this.INVENTORY_SERVICE, "put");
            return serverResponse;
        }

    }

    isObjectDirty() {
        return this.utils.objectsEqual(this.selectedObject, this.originalObject);
    }

    async deleteObject() {
        let serverResponse = await this.data.deleteObject(this.INVENTORY_SERVICE + '/' + this.selectedObject._id);
        return serverResponse;
    }

}