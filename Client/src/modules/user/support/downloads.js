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
            $("#buttonGroup").children().removeClass('menuButtons');
            $("#buttonGroup").children().css("background-color","");
            $("#buttonGroup").children().css("color","");
            $(el.target).css("background-color",this.config.BUTTONS_BACKGROUND);
            $(el.target).css("color",this.config.ACTIVE_SUBMENU_COLOR);
            this.typeSelected = el.target.id;
            this.filterList();
        }
    }

    filterList(){ 
        this.dataTable.filterList(this.typeSelected, {type: 'value', filter: "downCatcodeFilter",  collectionProperty: 'downCatcode', compare: 'match'});
    }
}