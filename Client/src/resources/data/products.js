import {inject} from 'aurelia-framework';
import {DataServices} from './dataServices';
import {Utils} from '../utils/utils';

@inject(DataServices, Utils)
export class Products {
    newSystem = false;      //Is the selected product a new product
    editIndex;              //Index of selected product

    constructor(data, utils) {
        this.data = data;
        this.utils = utils;
    }

    async getProductsArray(refresh, options) {
        if (!this.productsArray || refresh) {
            var url = this.data.PRODUCTS_SERVICE;
            url += options ? options : "";
            try {
                let serverResponse = await this.data.get(url);
                if (!serverResponse.error) {
                    this.productsArray = serverResponse;
                } else {
                    return undefined;
                }
            } catch (error) {
                console.log(error);
                return undefined;
            }
        }
        return this.productsArray;
    }

    selectProduct(index) {
        if (index === undefined) {
            this.selectedProduct = this.emptyProduct();
            this.newSystem = true;
        } else {
            try {
                this.selectedProduct = this.utils.copyObject(this.productsArray[index]);
                this.newSystem = false;
                this.editIndex = index;
            } catch (error) {
                console.log(error);
                this.selectedProduct = this.emptyProduct();
                this.newSystem = true;
            }

        }
    }

    selectedProductFromId(id){
        this.productsArray.forEach((item) => {
          if(item._id === id){
            this.selectedProduct = this.utils.copyObject(item);
            return;
          }
        });
        return null;
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
        return newProduct;
    }

    async saveProduct() {
        if(!this.selectedProduct){
            return;
        }

        if(!this.selectedProduct._id){
            let serverResponse = await this.data.saveObject(this.selectedProduct, this.data.PRODUCTS_SERVICE, "post");
            if (!serverResponse.error) {
                this.productsArray.push(this.selectedProduct);
                this.editIndex = this.productsArray.length - 1;
            } else {
                this.data.processError(serverResponse, "There was an error creating the product.");
                }
            return serverResponse;
        } else {
            var serverResponse = await this.data.saveObject(this.selectedProduct, this.data.PRODUCTS_SERVICE, "put");
            if (!serverResponse.error) {
                this.productsArray[this.editIndex] = this.utils.copyObject(this.selectedProduct, this.productsArray[this.editIndex]);
            } else {
                this.data.processError(serverResponse, "There was an error updating the product.");
                }
            return serverResponse;
        }

    }

    async deleteProduct(){
         let serverResponse = await this.data.deleteObject(this.data.PRODUCTS_SERVICE + '/' + this.selectedProduct._id);
            if (!serverResponse.error) {
                this.productsArray.splice(this.editIndex, 1);
                this.editIndex = - 1;
            }
            return serverResponse;
    }

    isDirty(){
        if(this.selectedProduct){
            if(this.selectedProduct._id){
                var obj = this.productsArray[this.editIndex];
            } else {
                var obj = this.emptyProduct();
            }
            return this.utils.objectsEqual(this.selectedProduct, obj);
        }
    }

    // filterProducts(filters, sort) {
    //     var keep;
    //     var index = 0;
    //     this.productsArray = this.productsArrayInternal.filter((item) => {
    //         //Assume the item should be eliminated
    //         keep = false;
    //         //For each filter in filterValues
    //         for (var i = 0, x = filters.length; i < x; i++) {
    //             keep = item[filters[i].property] === filters[i].value;
    //             if (!keep) break;
    //         }
    //         return keep;
    //     })

    //     if (sort) {
    //         this.sortArray(sort);
    //     } else {
    //         return this.productsArray;
    //     }
    // }

    // sortArray(propertyName) {
    //     var propName = sort.propertyName;
    //     var sortDirection = sort.direction = "ASC" ? 1 : -1;
    //     this.productsArray = filteredArray
    //         .slice(0)
    //         .sort((a, b) => {
    //             var result = (a[propName] < b[propName]) ? -1 : (a[propName] > b[propName]) ? 1 : 0;
    //             return result * sortDirection;
    //         });
    //     return this.productsArray;
    // }

}
