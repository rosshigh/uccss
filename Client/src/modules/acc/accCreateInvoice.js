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
      if (moment(today).isBetween(item.startDate, item.endDate)) {
        this.invoicePeriod = index;
      }
    });
    this.selectedInvoicePeriod = this.apj.invoiceDataArray[this.invoicePeriod];
    await this.getInstitutionToBeInvoiced();
    await this.getInvoiceRelevantRequests();
  }

  async periodChanged() {
    this.selectedInvoicePeriod = this.apj.invoiceDataArray[this.invoicePeriod];
    await this.getInstitutionToBeInvoiced();
    await this.getInvoiceRelevantRequests();
  }

  editInvoicePeriods() {
    this.openEditPanel = !this.openEditPanel;
  }

  async getInstitutionToBeInvoiced() {
    await this.people.getInstitutionsArray('?filter=apj|eq|true&order=name', true);
    this.totalInvoiceAmount = 0;
    this.institutionsToBeInvoiced = new Array();
    this.classifyInstitutions();
  }

  invoiceAllInstitutions() {
    this.classifyInstitutionsArray.forEach(item => {
      this.institutionsToBeInvoiced.push(item);
      this.totalInvoiceAmount += item.packageId.amount * this.config.UCC_PACKAGE_PERCENTAGE;
    })
    this.classifyInstitutionsArray = [];
  }

  invoiceNoInstitutions() {
    this.institutionsToBeInvoiced.forEach(item => {
      this.classifyInstitutionsArray.push(item);
    })
    this.totalInvoiceAmount = 0;
    this.institutionsToBeInvoiced = [];
  }

  deleteClassifiedInvoiceInstitution(index) {
    this.classifyInstitutionsArray.splice(index, 1);
  }

  deleteInstitutionsToBeInvoiced(index) {
    this.totalInvoiceAmount -= this.institutionsToBeInvoiced[index].packageId.amount * this.config.UCC_PACKAGE_PERCENTAGE;
    this.institutionsToBeInvoiced.splice(index, 1);
  }

  classifyInstitutions() {
    this.classifyInstitutionsArray = [];
    let yearAgo = moment(this.selectedInvoicePeriod.startDate).subtract(365, 'days');
    if (this.apj.invoiceDataArray) {
      this.people.institutionsArray.forEach(packageItem => {
        if (packageItem.packageId !== null) {
          if (packageItem.packageId.datePaid !== null && moment(packageItem.packageId.datePaid).isBetween(this.selectedInvoicePeriod.startDate, this.selectedInvoicePeriod.endDate)) {
            //datePaid between selectedInvoicePeriod.startDate and selectedInvoicePeriod.endDate
            packageItem.category = 'backColorOne';
            this.classifyInstitutionsArray.push(packageItem);
            console.log('in session');
          } else if (moment(packageItem.packageId.dateStarted).isBetween(this.selectedInvoicePeriod.startDate, this.selectedInvoicePeriod.endDate)) {
            packageItem.category = 'backColorTwo';
            this.classifyInstitutionsArray.push(packageItem);
          } else if (packageItem.packageId.datePaid !== null && moment(packageItem.packageId.datePaid).before(yearAgo)) {
            //datePaid over a year before selectedInvoicePeriod.startDate
            packageItem.category = 'backColorThree';
            this.classifyInstitutionsArray.push(packageItem);
            console.log('over a year old');
          } else if (packageItem.packageId.dateInvoiced === null) {
            packageItem.category = 'backColorFour';
            this.classifyInstitutionsArray.push(packageItem);
          }
        }
      });
    }
  }

  addInsitution(index, institution) {
    this.totalInvoiceAmount += parseFloat(this.classifyInstitutionsArray[index].packageId.amount) * this.config.UCC_PACKAGE_PERCENTAGE;
    this.institutionsToBeInvoiced.push(institution);
    this.classifyInstitutionsArray.splice(index, 1);
  }

  subtractInstitution(index, institution) {
    this.totalInvoiceAmount -= this.institutionsToBeInvoiced[index].packageId.amount * this.config.UCC_PACKAGE_PERCENTAGE;
    this.classifyInstitutionsArray.push(institution);
    this.institutionsToBeInvoiced.splice(index, 1);
  }

  async getInvoiceRelevantRequests() {
    await this.apj.getClientRequestsDetailsArray('?filter=invoiceRelevant|eq|true', true);
    this.invoiceRelevantRequests = [];
    // this.filterRequests();
  }

  // filterRequests() {
  //   this.invoiceRelevantRequests = [];
  //   this.apj.requestsDetailsArray.forEach(item => {
  //     // if()
  //   });
  // }

  addRequest(index, request){
    this.invoiceRelevantRequests.push(request);
    this.apj.requestsDetailsArray.splice(index, 1);
  }

  subtractRequest(index, request){
    this.apj.requestsDetailsArray.push(request);
    this.invoiceRelevantRequests.splice(index, 1);
  }

}
