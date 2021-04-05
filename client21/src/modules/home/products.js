import { inject } from 'aurelia-framework';
import { Products } from '../../resources/data/products';

@inject(Products)
export class UCCProducts {

    pageSize = 200;

    constructor(products){
        this.products = products;

        this.filters = [
            { value: '', keys: ['name'] }
        ];

    }

    async activate() {
        $("#loading").show();
        let responses = await Promise.all([
            this.products.getSmallObjectsArray('?filter=active|eq|true&order=name')
        ]);
        $("#loading").hide();
    }

}