import {inject} from 'aurelia-framework';
import {DataTable} from '../../resources/utils/dataTable';
import {AppConfig} from '../../config/appConfig';
import {Products} from '../../resources/data/products';
import {is4ua} from '../../resources/data/is4ua';

@inject(DataTable, Products, is4ua, AppConfig)
export class ViewProducts {

    constructor(datatable, products, is4ua, config) {
        this.dataTable = datatable;
        this.dataTable.initialize(this);
        this.products = products;
        this.is4ua = is4ua;
        this.config = config;
    }


    async activate() {
        let responses = await Promise.all([
            this.products.getProductsArray('?filter=active|eq|true&order=name', true),
            this.is4ua.loadIs4ua(),
            this.config.getConfig()
        ]);
        this.dataTable.updateArray(this.products.productsArray);
		this.dataTable.numRowsShown = "50";
		this.dataTable.updateTake();
    }
}