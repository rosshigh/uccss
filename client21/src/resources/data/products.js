import { inject } from 'aurelia-framework';
import { DataServices } from './dataServices';
import { Utils } from '../utils/utils';

@inject(DataServices, Utils)
export class Products {

    PRODUCTS_SERVICE = 'products';

    constructor(data, utils) {
        this.data = data;
        this.utils = utils;
    }

    testFunction(){
        console.log('here')
    }

    async getObjectsArray(options) {
        var url = this.PRODUCTS_SERVICE;
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
        var url = this.PRODUCTS_SERVICE +"/small";
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
        let url = this.PRODUCTS_SERVICE + '/' + id;
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
        this.selectedObject = this.emptyProduct();
        for (let i = 0; i < this.objectsArray.length; i++) {
            if (this.objectsArray[i]._id === id) {
                this.selectedObject = this.utils.copyObject(this.objectsArray[i]);
                return i;
            }
        }
        return -1;
    }




    emptyProduct() {
        var newProduct = new Object();;
        newProduct.clientKey = "";
        newProduct.name = "";
        newProduct.sapName = "";
        newProduct.hostWhere = "";
        newProduct.uaCurriculum = "";
        newProduct.defaultStudentIdPrefix = "";
        newProduct.defaultFacultyIdPrefix = "";
        newProduct.defaultStudentPassword = "";
        newProduct.defaultFacultyPassword = "";
        newProduct.comment = "";
        newProduct.Client_Info = "";
        newProduct.fileName = "";
        newProduct.dataset = "";
        newProduct.idsAvailable = "";
        newProduct.firstAllowableId = 1;
        newProduct.active = true;
        newProduct.systems = new Array();
        newProduct.documents = new Array();
        return newProduct;
    }

    async saveObject() {
        if (!this.selectedObject) {
            return;
        }

        if (!this.selectedObject._id) {
            let serverResponse = await this.data.saveObject(this.selectedObject, this.PRODUCTS_SERVICE, "post");
            return serverResponse;
        } else {
            var serverResponse = await this.data.saveObject(this.selectedObject, this.PRODUCTS_SERVICE, "put");
            return serverResponse;
        }

    }

    async uploadFile(files){
        let response = await this.data.uploadFiles(files, this.PRODUCTS_SERVICE + '/upload/' + this.selectedObject._id);
     }

    isObjectDirty() {
        return this.utils.objectsEqual(this.selectedObject, this.originalObject);
    }

    async deleteObject() {
        let serverResponse = await this.data.deleteObject(this.PRODUCTS_SERVICE + '/' + this.selectedObject._id);
        return serverResponse;
    }

    getProductInfo(id) {
        if (!id) return null;
        for (var i = 0; i < this.objectsArray.length; i++) {
            if (this.objectsArray[i]._id === id) {
                if (this.objectsArray[i].productDescription) {
                    return {
                        info: this.objectsArray[i].productDescription,
                        productId: id,
                        header: this.objectsArray[i].name
                    }
                } else {
                    return null;
                }
            }
        }
        return null;
    }
}