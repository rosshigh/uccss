import { inject } from 'aurelia-framework';
import { DataTable } from '../../../resources/utils/dataTable';
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

        this.typeSelected = this.downloads.appCatsArray[0].downCatcode;
        this.filterList();
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
        if (el.target.id != "") {
            this.typeSelected = el.target.id;
            this.filterList();
            // this.filterValues = new Array();
            // this.filterValues.push({ property: "downCatcode", value: el.target.id, type: 'select-one', compare: "id" });
            // if (this.dataTable.active) this.dataTable.externalFilter(this.filterValues);
            // if (this.baseArray) this.displayArray = this.dataTable.filter(this.filterValues);

        }
    }

    filterList(){
        this.filterValues = new Array();
        this.filterValues.push({ property: "downCatcode", value:  this.typeSelected, type: 'select-one', compare: "id" });
        if (this.dataTable.active) this.dataTable.externalFilter(this.filterValues);
    }
}
