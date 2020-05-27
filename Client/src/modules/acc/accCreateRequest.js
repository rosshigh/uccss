import { inject } from 'aurelia-framework';
import { Router } from "aurelia-router";
import { DataTable } from '../../resources/utils/dataTable';
import { Sessions } from '../../resources/data/sessions';
import { Products } from '../../resources/data/products';
import { SiteInfo } from '../../resources/data/siteInfo';
import { APJClientRequests } from '../../resources/data/apjClientRequests';
import { AppConfig } from '../../config/appConfig';
import { Utils } from '../../resources/utils/utils';
import { People } from '../../resources/data/people';
import { Systems } from '../../resources/data/systems';
import Validation from '../../resources/utils/validation';
import { CommonDialogs } from '../../resources/dialogs/common-dialogs';
import Flatpickr from 'flatpickr';
import { EventAggregator } from 'aurelia-event-aggregator';

import moment from 'moment';

@inject(Router, AppConfig, Systems, Validation, People, CommonDialogs, DataTable, Utils, Sessions, Products, APJClientRequests, SiteInfo, EventAggregator)
export class ACCClientRequest {
  configDate = {};

  constructor(router, config, systems, validation, people, dialog, datatable, utils, sessions, products, requests, siteInfo, ea) {
    this.router = router;
    this.config = config;
    this.validation = validation;
    this.validation.initialize(this);
    this.people = people;
    this.dataTable = datatable;
    this.dataTable.initialize(this);
    this.utils = utils;
    this.sessions = sessions;
    this.products = products;
    this.requests = requests;
    this.siteInfo = siteInfo;
    this.systems = systems;
    this.dialog = dialog;
    this.ea = ea;

    this.userObj = JSON.parse(sessionStorage.getItem('user'));;
    this.invoiceRelevant = false;

  };

  async activate() {
    let responses = await Promise.all([
      this.products.getProductsArray('?filter=apj|eq|true&order=name', true),
      this.people.getInstitutionsArray('?filter=[and]institutionStatus|eq|01:apj|eq|true&order=name', true),
      this.siteInfo.getMessageArray('?filter=category|eq|CLIENT_REQUESTS', true),
      this.people.getAPJPackages(),
      this.systems.getSystemsArray('?filter=apj|eq|true', true),
      this.config.getConfig()
    ]);

    $('#loading').hide();

    this.requests.selectRequest()
    this.filterList();
    this._setUpValidation();

    // this.useSandbox = this.config.SANDBOX_USED;
    // if (!this.config.SANDBOX_USED) {
    // 	this.typeSelected = true;
    // 	this.regularClient = true;
    // 	this.requestType = "regularCourse";
    // }
    this.filterInstitutions();
  }

  filterInstitutions() {
    this.insitutionsArray = this.people.institutionsArray.filter(item => {
      return item.packageId !== null;
    });
  }

  filterInstiutionList() {
    if (!this.filterValue) {
      this.filterInstitutions();
      return;
    }
    let filterValue = this.filterValue.toLowerCase();
    this.insitutionsArray = this.people.institutionsArray.filter(item => {
      return item.packageId !== null && item.name.toLowerCase().indexOf(filterValue) > -1;
    });
  }

  attached() {
    $('#loading').hide();
  }

  selectProduct(product) {
    if (this.requestDetails.length >= this.selectedPackage.maxClients) {
      // this.utils.showNotification("This university has reached their maximum requested products.", "error");
      return this.dialog.showMessage(
        "This university has reached their maximum requested products.  Are you sure you want to proceed?",
        "Extra Client",
        ['Yes','No']
      ).whenClosed(response => {
        if(response.output.toUpperCase() == 'YES'){
          this.invoiceRelevant = true;
          this.addTheClient(product);
          return;
        } else {
          this.invoiceRelevant = false;
          this.addTheClient(product);
          return;
        }
      });
    }
    this.invoiceRelevant = false;
    this.addTheClient(product);
  }

  addTheClient(product) {
    $("#requestProductsLabel").html("Requested Products");
    var newObj = this.requests.emptyRequestDetail();
    newObj.productId = product._id;
    this.requestDetails.push(newObj);
    this.requests.selectedRequest.requestDetails.push(newObj);
    this.products.selectedProductFromId(newObj.productId);
    this.requests.selectedRequest.requestDetails[this.requests.selectedRequest.requestDetails.length - 1].productName = product.name;
    this.requests.selectedRequest.requestDetails[this.requests.selectedRequest.requestDetails.length - 1].invoiceRelevant = this.invoiceRelevant;
    if (this.invoiceRelevant) {
      this.requests.selectedRequest.requestDetails[this.requests.selectedRequest.requestDetails.length - 1].price = product.price;
    }

    this.validation.makeValid($("#productList"));
  }

  alreadyOnList(id) {
    for (let i = 0; i < this.requests.selectedRequest.requestDetails.length; i++) {
      if (this.requests.selectedRequest.requestDetails[i].productId === id) return true;
    }
    return false;
  }

  async removeProduct(index) {
    if (this.requestDetails[index].requestStatus == this.config.ASSIGNED_REQUEST_CODE) {
      return this.dialog.showMessage(
        "That request has already been assigned.  Are you sure you want to retire that assignment?",
        "Retire Assignment",
        ['Yes', 'No']
      ).whenClosed(response => {
        if (!response.wasCancelled) {
          this.requestDetails[index].requestStatus = this.config.RETIRED_REQUEST_CODE;
          this.saveIt();
          this.updateClient(this.requestDetails[index]);
        }
      });

    } else {
      return this.dialog.showMessage(
        "Are you sure you want to delete that request?",
        "Delete Request",
        ['Yes', 'No']
      ).whenClosed(response => {
        if (!response.wasCancelled) {
          this.requestDetails[index].delete = true;
          this.removeRequestDetail(this.requestDetails[index]);
          this.requestDetails.splice(index, 1);
          this.saveIt();
        }
      });
    }
  }

  removeRequestDetail(request) {
    let spliceIndex = -1;
    this.requests.selectedRequest.requestDetails.forEach((item, index) => {
      if (item._id === request._id) spliceIndex = index;
    });
    this.requests.selectedRequest.requestDetails.splice(spliceIndex, 1);
  }

  async updateClient(request) {
    var clientToProcess;
    var indexToSplice;
    request.assignments.forEach(item => {
      indexToSplice = -1;
      clientToProcess = -1;
      this.systems.selectedSystemFromId(item.systemId);
      for (let i = 0; i < this.systems.selectedSystem.clients.length; i++) {
        if (this.systems.selectedSystem.clients[i].client == item.client) {
          clientToProcess = i;
          this.systems.selectedSystem.clients[i].assignments.forEach((assign, index) => {
            if (request._id === assign.assignment) {
              // indexToSplice = index;
              this.systems.selectedSystem.clients[clientToProcess].assignments.splice(index, 1);
            }
          });
          if (this.systems.selectedSystem.clients[clientToProcess].assignments.length === 0) {
            this.systems.selectedSystem.clients[clientToProcess].clientStatus = this.config.RETIRED_CLIENT_CODE;
          }
        }
        // if (indexToSplice > -1) {
        //   this.systems.selectedSystem.clients[clientToProcess].assignments.splice(indexToSplice, 1);
        // }
      
      }
      this.systems.saveSystem();
    });
  }

  _buildRequest() {
    if (this.requests.selectedRequest._id) {
      this.requests.selectedRequest.requestDetails.invoiceRelevant = this.invoiceRelevant;
      this.requests.selectedRequest.requestDetailsToSave = this.requests.selectedRequest.requestDetails;
      this.requests.selectedRequest.requestDetailsToSave.forEach((item, index) => {
        if (item.requestStatus != this.config.ASSIGNED_REQUEST_CODE && item.requestStatus != this.config.RETIRED_REQUEST_CODE) item.requestStatus = this.config.UPDATED_REQUEST_CODE;
        // if (item.requestStatus == this.config.RETIRED_REQUEST_CODE) {
        //   this.requests.selectedRequest.requestDetails.splice(index, 1);
        // }
      })
      this.requests.selectedRequest.requestStatus = this.config.UPDATED_REQUEST_CODE;
    } else {
      this.requests.selectedRequest.requestStatus = this.config.UNASSIGNED_REQUEST_CODE;
    }
    this.requests.selectedRequest.institutionId = this.selectedInstitution;
  }

  _cleanUp() {
    this.requests.selectRequest();
    this.institutionSelected = false;
    this.selectedInstitution = "";
    this.personSelected = false
    this.typeSelected = false;
    if (!this.config.SANDBOX_USED) {
      this.typeSelected = true;
      this.regularClient = true;
      this.requestType = "regularCourse";
    }
    this.sandBoxClient = false;
    $("#existingRequestInfo").hide();
    this.requestType = -1;
  }

  async changeInstitution(el) {
    if (this.selectedInstitution != "") {
      await this.people.selectInstitutionByID(this.selectedInstitution);
      this.getPackage();
      this.institutionSelected = true;
      if (!this.config.SANDBOX_USED) {
        this.typeSelected = true;
        this.regularClient = true;
        this.requestType = "regularCourse";
      }
      this.selectedPerson = "";
      this.requestType = "";
      $("#existingRequestInfo").empty().hide();
      await this.requests.getAPJInstitutionRequests('?filter=institutionId|eq|' + this.selectedInstitution, true);
      if (!this.requests.apjInstitutionRequestArray.length) {
        this.requests.selectRequest();
      } else {
        this.requests.selectRequest(0);
      }
      this.filterNotActiveRequests();
    } else {
      this.people.selectInstitution();
      this.institutionSelected = false;
    }

  }

  filterNotActiveRequests() {
    this.requestDetails = [];
    this.requests.selectedRequest.requestDetails.forEach(item => {
      if (item.requestStatus != this.config.RETIRED_REQUEST_CODE) {
        this.requestDetails.push(item);
      }
    })
  }

  getPackage() {
    this.selectedPackage = undefined;
    this.people.packageArray.forEach(item => {
      if (this.people.selectedInstitution.packageId != null && item._id === this.people.selectedInstitution.packageId.packageId) this.selectedPackage = item;
    })
  }

  changePerson(el) {
    this.personSelected = true;
    this.people.selectedPersonFromId(this.selectedPerson, 'i');
    if (!this.config.SANDBOX_USED) {
      this.people.getCoursesArray(true, '?filter=personId|eq|' + this.selectedPerson + '&order=number', true);
    }
  }

  changeRequestType(el) {
    switch (this.requestType) {
      case -1:
        if (!this.config.SANDBOX_USED) {
          this.typeSelected = true;
          this.regularClient = true;
          this.requestType = "regularCourse";
        }
        break;
      case "regularCourse":
        this.typeSelected = true;
        this.regularClient = true;
        this.requestType = "regularCourse";
        this.people.getCoursesArray(true, '?filter=personId|eq|' + this.selectedPerson + '&order=number', true);
        break;
      case "sandboxCourse":
        this.courseId = this.config.SANDBOX_ID;
        this.sandBoxClient = true;
        this.regularClient = false;
        break;
    }
  }

  filterList() {
    if (this.filter) {
      var thisFilter = this.filter
      this.filteredProductsArray = this.products.productsArray.filter((item) => {
        return item.name.toUpperCase().indexOf(thisFilter.toUpperCase()) != -1;
      });
    } else {
      this.filteredProductsArray = this.products.productsArray;
    }
  }

  setDates(session) {
    if (session) {
      $("#input-startDate").val("")
      $("#input-endDate").val("")
    }
    this.minStartDate = this.sessions.selectedSession.startDate;
    this.maxStartDate = this.sessions.selectedSession.endDate;
    this.minEndDate = this.sessions.selectedSession.startDate;
    this.maxEndDate = this.sessions.selectedSession.endDate;

    var nowPlusLeeway = moment(new Date()).add(this.config.REQUEST_LEEWAY, 'days');
    this.minRequiredDate = moment.max(nowPlusLeeway, moment(this.sessions.selectedSession.startDate));
    this.minRequiredDate = moment(this.minRequiredDate._d).format('YYYY-MM-DD');
    this.maxRequiredDate = this.sessions.selectedSession.endDate;
  }

  _setUpValidation() {
    this.validation.addRule(1, "institution", [
      {
        "rule": "custom", "message": "Select an institution",
        "valFunction": function (context) {
          return !(context.selectedInstitution == "");
        }
      }

    ]);
    this.validation.addRule(1, "numberOfStudentsError", [{
      "rule": "custom", "message": "Enter the number of students",
      "valFunction": function (context) {
        var now = moment(new Date());
        for (var i = 0; i < context.requests.selectedRequest.requestDetails.length; i++) {
          if (moment(context.requests.selectedRequest.requestDetails[i].createdDate).diff(now, 'day') === 0) {
            if (!context.requests.selectedRequest.requestDetails[i].numberOfStudents || context.requests.selectedRequest.requestDetails[i].numberOfStudents == 0) {
              return false;
            }
          }
        }
        return true;
      }
    }]);
    this.validation.addRule(1, "requiredDateError", [{
      "rule": "custom", "message": "Required date cannot be earlier than 5 days from today",
      "valFunction": function (context) {
        var nowPlusLeeway = moment(new Date()).add(context.config.REQUEST_LEEWAY + 1, 'days');
        var now = moment(new Date());
        for (var i = 0; i < context.requests.selectedRequest.requestDetails.length; i++) {
          if (moment(context.requests.selectedRequest.requestDetails[i].createdDate).diff(now, 'day') === 0) {
            if (moment(context.requests.selectedRequest.requestDetails[i].requiredDate).isBefore(nowPlusLeeway, 'day')) {
              return false;
            }
          }
        }
        return true;
      }
    }]);
    this.validation.addRule(1, "dateError", [{
      "rule": "custom", "message": "Enter all required dates",
      "valFunction": function (context) {
        for (var i = 0; i < context.requests.selectedRequest.requestDetails.length; i++) {
          if (!context.requests.selectedRequest.requestDetails[i].requiredDate || context.requests.selectedRequest.requestDetails[i].requiredDate === "") {
            return false;
          }
        }
        return true;
      }
    }]);
  }

  async saveIt() {
    if (this.validation.validate(1)) {
      if (!this.requests.selectedRequest._id) {
        this._buildRequest();
        let serverResponse = await this.requests.saveRequest();
        if (!serverResponse.status) {
          this.systemSelected = false;
          this.utils.showNotification("Product request " + serverResponse.clientRequestNo + " was updated");
        }
      } else {
        this._buildRequest();
        let serverResponse = await this.requests.saveRequestWithId();
        if (!serverResponse.status) {
          this.utils.showNotification("The product request was updated");
          this.systemSelected = false;
        }
      }
      this._cleanUp();
    }
  }

}
