import { inject } from 'aurelia-framework';
import { DataTable } from '../../resources/utils/dataTable';
import { APJClientRequests } from '../../resources/data/apjClientRequests';
import { People } from '../../resources/data/people';
import { AppConfig } from '../../config/appConfig';
import { Utils } from '../../resources/utils/utils';
import moment from 'moment';

@inject(DataTable, APJClientRequests, People, AppConfig, Utils)
export class AccCreateInvoice {

    constructor(dataTable, apj, people, config, utils) {
        this.dataTable = dataTable;
        this.apj = apj;
        this.people = people;
        this.config = config;
        this.utils = utils;

        this.invoiceDate = new Date();
        this.startDate = new Date();
    }

    async activate() {
        await this.apj.getInvoiceDataArray();
        await this.people.getAPJPackages('?order=price');
        await this.config.getConfig(true);
        this.createDates();
        // this.compuateInvoiceEndDate();
    }

    attached() {
        $('#loading').hide();
    }

    async createDates() {
        this.invoicePeriod = -1;
        var today = new Date();
        this.formattedDate = moment(today).format('MM/DD/YYYY');
        var thisYear = today.getFullYear();
        this.apj.invoiceDataArray.forEach((item, index) => {
            item.startDate = new Date(item.invoiceMonth + "/" + item.invoiceDay + "/" + thisYear);
            item.endDate = new Date(item.invoiceEndMonth + "/" + item.invoiceEndDay + "/" + thisYear);
            if ( moment(today).isBetween( item.startDate, item.endDate)) {
                this.invoicePeriod = index;
            }
        });
        this.selectedInvoicePeriod = this.apj.invoiceDataArray[this.invoicePeriod];
        await this.getInstitutionToBeInvoiced();
    }

    async periodChanged() {
        this.selectedInvoicePeriod = this.apj.invoiceDataArray[this.invoicePeriod];
        await this.getInstitutionToBeInvoiced();
    }

    editInvoicePeriods() {
        this.openEditPanel = !this.openEditPanel;
    }

    async getInstitutionToBeInvoiced() {  
        await this.people.getInstitutionsArray('?filter=apj|eq|true&order=name', true);
        this.totalInvoiceAmount = 0;

        this.institutionsToBeInvoiced = new Array();
        this.people.institutionsArray.forEach(item => {
            if (item.packageId && moment(item.packageId.dateStarted).isBetween( this.selectedInvoicePeriod.startDate, this.selectedInvoicePeriod.endDate)) {
                this.institutionsToBeInvoiced.push(item);
                this.totalInvoiceAmount += parseFloat(item.packageId.amount) * this.config.UCC_PACKAGE_PERCENTAGE;
            }
        });
    }

    getClientsToBeInvoiced() {

    }

    invoiceAllInstitutions(){
        this.institutionsThatWillBeInvoiced = new Array();
        this.institutionsToBeInvoiced.forEach(item => {
            this.institutionsThatWillBeInvoiced.push(item);
        })
        
    }
}