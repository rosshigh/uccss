import { inject } from 'aurelia-framework';
import { DataTable } from '../../../resources/utils/dataTable2';
import { AppConfig } from '../../../config/appConfig';
import { Utils } from '../../../resources/utils/utils';
import { Downloads } from '../../../resources/data/downloads';

@inject(DataTable, Downloads, Utils, AppConfig)
export class Download {
    navControl = "downloadsNavButtons";
    spinnerHTML = "";
    filterValues = new Array();

    constructor(datatable, downloads, utils, config) {
        this.dataTable = datatable;
        this.dataTable.initialize(this);
        this.utils = utils;
        this.downloads = downloads;
        this.config = config;
    }

    async activate() {
        await this.downloads.getDownloadsArray();
        await this.downloads.getDownloadCategoriesArray();

        this.updateArray();

        this.dataTable.createPageButtons(1);
    }

    async refresh() {
        this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
        await this.downloads.getDownloadsArray(true);
        this.updateArray();
        this.spinnerHTML = "";
    }

    updateArray() {
        this.dataTable.updateArray(this.downloads.appDownloadsArray);
    }

    typeChanged(el) {
        if (el.target.value != "") {
            this.filterValues = new Array();
            this.filterValues.push({ property: "type", value: el.target.value, type: 'select-one', compare: "id" });
            if (this.baseArray) this.displayArray = this.dataTable.filter(this.filterValues);

        }
    }
}
