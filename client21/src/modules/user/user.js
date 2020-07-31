import { Config } from 'resources/data/config';
import { inject } from 'aurelia-dependency-injection';
import { Store } from '../../store/store';

@inject(Config, Store)

export class User {
    pageTitle = "Home";

    constructor(config, store) {
        this.config = config;
        this.store = store;
    }

    async activate() {
        let responses = await Promise.all([
            this.config.getConfigArray()
        ]);

        this.store.saveConfig(this.config.configArray);
    }
}