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
    this.openSelectionPanel = true;
    this.showToolbar = true;
  }

  async activate() {
    await this.apj.getInvoiceDataArray();
    await this.people.getAPJPackages('?order=uccPayment');
    await this.config.getConfig(true);
    this.createDates();
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

  async getInstitutionToBeInvoiced() {
    await this.people.getInstitutionsArray('?filter=apj|eq|true&order=name', true);
    this.totalInvoiceAmount = 0;
    this.totalInstitutionInvoiceAmount = 0;
    this.totalProductInvoiceAmount = 0;
    this.institutionsToBeInvoiced = new Array();
    this.classifyInstitutions();
  }

  invoiceAllInstitutions() {
    this.classifyInstitutionsArray.forEach(item => {
      this.institutionsToBeInvoiced.push(item);
      this.totalInstitutionInvoiceAmount += item.packageId.amount * this.config.UCC_PACKAGE_PERCENTAGE;
    })
    this.classifyInstitutionsArray = [];
  }

  invoiceNoInstitutions() {
    this.institutionsToBeInvoiced.forEach(item => {
      this.classifyInstitutionsArray.push(item);
    })
    this.totalInstitutionInvoiceAmount = 0;
    this.institutionsToBeInvoiced = [];
  }

  invoiceAllProducts(){
    this.apj.requestsDetailsArray.forEach(item => {
      this.invoiceRelevantRequests.push(item);
      if(item.price != null) this.totalProductInvoiceAmount += parseFloat(item.price);
    })
    this.apj.requestsDetailsArray = [];
  }

  invoiceNoProducts(){
    this.invoiceRelevantRequests.forEach(item => {
      this.apj.requestsDetailsArray.push(item);
    })
    this.totalProductInvoiceAmount = 0;
    this.invoiceRelevantRequests = [];
  }

  deleteClassifiedInvoiceInstitution(index) {
    this.classifyInstitutionsArray.splice(index, 1);
  }

  deleteInstitutionsToBeInvoiced(index) {
    this.totalInstitutionInvoiceAmount -= this.institutionsToBeInvoiced[index].packageId.amount * this.config.UCC_PACKAGE_PERCENTAGE;
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
            // this.classifyInstitutionsArray.push(packageItem);
            console.log('in session');
          } else if (moment(packageItem.packageId.dateStarted).isBetween(this.selectedInvoicePeriod.startDate, this.selectedInvoicePeriod.endDate)) {
            packageItem.category = 'backColorTwo';
            // this.classifyInstitutionsArray.push(packageItem);
          } else if (packageItem.packageId.datePaid !== null && moment(packageItem.packageId.datePaid).before(yearAgo)) {
            //datePaid over a year before selectedInvoicePeriod.startDate
            packageItem.category = 'backColorThree';
            // this.classifyInstitutionsArray.push(packageItem);
          } else if (packageItem.packageId.dateInvoiced === null) {
            packageItem.category = 'backColorFour';
           
          }
          packageItem.invoiceAmount = this.getUCCPayment(packageItem);
          // parseFloat(packageItem.packageId.amount) * this.config.UCC_PACKAGE_PERCENTAGE
          this.classifyInstitutionsArray.push(packageItem);
        }
      });
    }
  }

  getUCCPayment(packageToProcess){
    let thisAmount = 0;
    this.people.packageArray.forEach(item => {
      if(item._id === packageToProcess.packageId.packageId) thisAmount = parseFloat(item.uccPayment);
    });
    return thisAmount;
  }

  addInsitution(index, institution) {
    this.totalInstitutionInvoiceAmount += parseFloat(this.classifyInstitutionsArray[index].invoiceAmount) //* this.config.UCC_PACKAGE_PERCENTAGE;
    this.institutionsToBeInvoiced.push(institution);
    this.classifyInstitutionsArray.splice(index, 1);
  }

  subtractInstitution(index, institution) {
    this.totalInstitutionInvoiceAmount -= this.institutionsToBeInvoiced[index].packageId.amount * this.config.UCC_PACKAGE_PERCENTAGE;
    this.classifyInstitutionsArray.push(institution);
    this.institutionsToBeInvoiced.splice(index, 1);
  }

  async getInvoiceRelevantRequests() {
    await this.apj.getClientRequestsDetailsArray('?filter=invoiceRelevant|eq|true', true);
    this.invoiceRelevantRequests = [];
  }

  addRequest(index, request){
    if(request.price != null) this.totalProductInvoiceAmount += parseFloat(request.price);
    this.invoiceRelevantRequests.push(request);
    this.apj.requestsDetailsArray.splice(index, 1);
  }

  subtractRequest(index, request){
    if(request.price != null) this.totalProductInvoiceAmount -= parseFloat(request.price);
    this.apj.requestsDetailsArray.push(request);
    this.invoiceRelevantRequests.splice(index, 1);
  }

  openSelectionPanelFunction(){
    this.openInvoicePanel = false;
    this.openEditPanel = false;
    this.openSelectionPanel = true;
  }

  editInvoicePeriods() {
    this.openInvoicePanel = false;
    this.openEditPanel = true;
    this.openSelectionPanel = false;
  }

  openInvoicePanelFunction(){
    this.invoiceNumber = this.invoiceDate.getFullYear() + '-' + this.invoicePeriod;
    this.openInvoicePanel = true;
    this.openEditPanel = false;
    this.openSelectionPanel = false;
  }

  async printInvoicetoPDF(){
    $('#loading').show();
    var inputField = $("#invoiceNumberForm").html();
    console.log(inputField)
    var invoice = $("#invoicePanel").html().replace(/h3/g,'h6').replace(/h4/g,'h7').replace(inputField, 'Invoice No. ' + this.invoiceNumber);
   
    var html = "<!DOCTYPE HTML>";
    html += '<html lang="en-us">';
    html += '<head><link href="https://cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.7/yeti/bootstrap.min.css" rel="stylesheet"><style>.table-borderless td,.table-borderless th {border: 0 !important;}</style></head>';
    
    html += "<body style='padding:25px;'>";
    html += invoice;
    html += "</body></html>";
    let result = await this.apj.createPDF({page: html, number: this.invoiceNumber});
    console.log(result);
    if(result.message === 'done')  this.showLink  = true;
    $('#loading').hide();
  }


}
