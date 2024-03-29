import { inject } from 'aurelia-framework';
import { DataServices } from './dataServices';
import { Utils } from '../utils/utils';
import { AppConfig } from '../../appConfig';

@inject(DataServices, Utils, AppConfig)
export class APJClientRequests {

  CLIENT_REQUESTS_SERVICES = 'apj/clientRequests';
  CLIENT_REQUEST_DETAILS = 'apj/clientRequestsDetails';

  CUSTOMER_ACTION = 'clientRequests/customerAction';
  CLIENT_REQUEST_EMAIL = "clientRequests/sendMail";
  INVOICE_DATA = "apj/invoicedata";
  INVOICES_SERVICE = 'apj/invoices';

  constructor(data, utils, config) {
    this.data = data;
    this.utils = utils;
    this.config = config;
  }

  async getClientRequestsDetailsArray(options, refresh) {
      var url = this.CLIENT_REQUEST_DETAILS;
      url += options ? options : "";
      try {
        let serverResponse = await this.data.get(url);
        if (!serverResponse.error) {
          this.requestsDetailsArray = serverResponse;
        }
      } catch (error) {
        console.log(error);
      }
  }

  async getAPJInstitutionRequests(options) {
      var url = this.CLIENT_REQUESTS_SERVICES;
      url += options ? options : "";
      let response = await this.data.get(url)
      if (!response.error) {
        this.apjInstitutionRequestArray = response;
      } else {
        this.apjInstitutionRequestArray = undefined;
      }
  }

  async getRequestDetail(id) {

    let serverResponse = await this.data.get(this.CLIENT_REQUEST_DETAILS + "/" + id);
    if (!serverResponse.error) {
      this.selectedRequestDetail = serverResponse;

    } else {
      this.selectedRequestDetail = null;
    }
    return serverResponse;
  }

  selectRequest(index) {
    if (index === undefined) {
      this.selectedRequest = this.emptyRequest();
    } else {
      try {
        this.selectedRequest = this.utils.copyObject(this.apjInstitutionRequestArray[index]);
        this.editRequestIndex = index;
      } catch (error) {
        console.log(error);
        this.selectedRequest = this.emptyRequest();
      }

    }
  }

  emptyRequest() {
    var newObj = new Object();;
    newObj.requestStatus = this.config.UNASSIGNED_REQUEST_CODE;
    newObj.startDate = "";
    newObj.endDate = "";
    newObj.comments = "";
    newObj.requestDetails = new Array();
    newObj.audit = new Array();
    newObj.audit.push({
      event: 'Created',
      eventDate: new Date(),
      personId: ""
    })
    return newObj;
  }

  setTheSelectedRequestDetail(request) {
    this.selectedRequestDetail = this.utils.copyObject(request);
    if (this.requestsDetailsArray) {
      for (let i = 0; i < this.requestsDetailsArray.length; i++) {
        if (this.requestsDetailsArray[i]._id === request._id) {
          this.requestDetailIndex = i;
          break;
        }
      }
    }
  }

  emptyRequestDetail() {
    var newObj = new Object();;
    newObj.createdDate = new Date();
    newObj.modifiedDate = new Date();
    newObj.productId = "";
    newObj.numberOfStudents = 0;
    newObj.requiredDate = new Date();
    newObj.requestStatus = this.config.UNASSIGNED_REQUEST_CODE;
    return newObj;
  }

  async saveRequestDetail() {
    if (!this.selectedRequestDetail) {
      return;
    }
    let response = await this.data.saveObject(this.selectedRequestDetail, this.CLIENT_REQUEST_DETAILS, "put");
    if (!response.error) {
      this.selectedRequestDetail = response;
      this.requestsDetailsArray[this.requestDetailIndex] = this.utils.copyObject(this.selectedRequestDetail);
      return response;
    }
  }

  setSelectedRequest(request) {
    this.selectedRequest = this.utils.copyObject(request);
  }

  async assignRequest(index) {
    if (!this.selectedRequest) {
      return;
    }
    var url = this.CLIENT_REQUESTS_SERVICES + '/assign';
    var serverResponse = await this.data.saveObject(this.selectedRequest, url, "put");
    if (!serverResponse.error) {
      this.selectedRequestDetail = serverResponse;
      // if(!this.selectedRequestDetail.requestId.courseId || this.selectedRequestDetail.requestId.courseId === null){
      //   this.selectedRequestDetail.requestId.courseId = {_id: this.config.SANDBOX_ID, name: this.config.SANDBOX_NAME};
      // }
      this.requestsDetailsArray[index] = this.utils.copyObject(this.selectedRequestDetail);
    }
    return serverResponse;
  }

  async saveRequest(packageToSave) {
    let url = this.CLIENT_REQUESTS_SERVICES;
    let serverResponse = await this.data.saveObject(packageToSave, url, "post");
    return serverResponse;
  }

  async saveRequestWithId(packageToSave) {
    let url = this.CLIENT_REQUESTS_SERVICES;
    let serverResponse = await this.data.saveObject(packageToSave, url, "put");
    return serverResponse;
  }

  replaceObject(obj){
    if(!obj._id || !this.requestsDetailsArray){
        return;
    }

    for(let i = 0; i < this.requestsDetailsArray.length; i++){
        if(this.requestsDetailsArray[i]._id === obj._id){
            this.requestsDetailsArray[i] = this.utils.copyObject(obj);
            break;
        }
    }
}

  // async getInvoiceDataArray(options, refresh) {
  //   if (!this.invoiceDataArray || refresh) {
  //     var url = this.INVOICE_DATA;
  //     url += options ? options : "";
  //     try {
  //       let serverResponse = await this.data.get(url);
  //       if (!serverResponse.error) {
  //         this.invoiceDataArray = serverResponse;
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // }

  // async getInvoices(options) {
  //   var url = this.INVOICES_SERVICE;
  //   url += options ? options : "";
  //   try {
  //     let serverResponse = await this.data.get(url);
  //     if (!serverResponse.error) {
  //       this.invoicesArray = serverResponse;
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // async saveInvoice(invoiceToSave) {
  //   if (!invoiceToSave) {
  //     return;
  //   }
  //   let response = await this.data.saveObject(invoiceToSave, this.INVOICES_SERVICE, "post");
  //   if (!response.error) {
  //     return response;
  //   }
  // }

  // async createPDF(object) {
  //   let url = 'apj/invoices/createPDF';
  //   // let object = {page: html};
  //   let serverResponse = await this.data.saveObject(object, url, "post");
  //   return serverResponse;
  //   // http://localhost/api/apj/invoices/createPDF
  // }
}
