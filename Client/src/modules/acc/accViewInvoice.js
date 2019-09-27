import { inject } from 'aurelia-framework';
import { DataTable } from '../../resources/utils/dataTable';
import { APJClientRequests } from '../../resources/data/apjClientRequests';
import { People } from '../../resources/data/people';
import { AppConfig } from '../../config/appConfig';
import { Utils } from '../../resources/utils/utils';
import moment from 'moment';

@inject(DataTable, APJClientRequests, People, AppConfig, Utils)
export class ViewInvoice {

  constructor(dataTable, apj, people, config, utils) {
    this.dataTable = dataTable;
    this.apj = apj;
    this.people = people;
    this.config = config;
    this.utils = utils;

    this.invoiceSelected = 'table';
    this.showLink = true;
  }

  async activate() {
    await this.apj.getInvoices();
    await this.people.getAPJPackages('?order=uccPayment');
    this.people.getInstitutionsArray('?filter=apj|eq|true&order=name', true);
    await this.config.getConfig(true);
    this.dataTable.updateArray(this.apj.invoicesArray);
  }

  attached() {
    $('#loading').hide();
  }

  selectInvoice(index, invoice) {
    this.institutionsToBeInvoiced = [];
    invoice.invoiceItems.forEach(item => {
      var thisInstitution = this.getInstitutionName(item.institution)
      var thisInvoice = {
        name: thisInstitution.name,
        invoiceAmount: item.amount,
        packageId: { packageId: thisInstitution.packageId.packageId }
      }
      this.institutionsToBeInvoiced.push(thisInvoice);
    })
    this.invoiceNumber = invoice.invoiceNumber;
    this.formattedDate = moment(invoice.createdDate).format('MM/DD/YYYY');
    this.totalInstitutionInvoiceAmount = invoice.Amount;
    this.invoiceSelected = 'form';
  }

  getInstitutionName(id){
    for(let i = 0; i < this.people.institutionsArray.length; i++){
      if(this.people.institutionsArray[i]._id == id){
        return this.people.institutionsArray[i];
      }
    }
  }

  back(){
    this.invoiceSelected = 'table';
  }

}
