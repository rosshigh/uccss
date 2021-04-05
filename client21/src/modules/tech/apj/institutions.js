import { inject } from 'aurelia-framework';
import { ValidationRules, ValidationControllerFactory, validationMessages } from 'aurelia-validation';
import { is4ua } from '../../../resources/data/is4ua';
import { People } from '../../../resources/data/people';
import { Products } from '../../../resources/data/products';
import { APJClientRequests } from '../../../resources/data/apjClientRequests';
import { Utils } from '../../../resources/utils/utils';
import { AppConfig } from '../../../appConfig';
import { throwStatement } from '../../../../../../../../AppData/Local/Microsoft/TypeScript/4.2/node_modules/@babel/types/lib/index';

@inject(ValidationControllerFactory, is4ua, People, Products, APJClientRequests, Utils, AppConfig)
export class APJInstitutions {

    constructor(ValidationControllerFactory, is4ua, people, products, requests, utils, config) {
        this.controller = ValidationControllerFactory.createForCurrentScope();
        this.is4ua = is4ua;
        this.people = people;
        this.products = products;
        this.requests = requests;
        this.utils = utils;
        this.config = config;

        this.filters = [
            { value: '', keys: ['name', 'country'] },
            { value: '', keys: ['institutionStatus'] }

        ];

        this.newRequestDetails = [];
        this.filterRetired = true;

        this.view = 'table';
    }

    async activate() {
        let responses = await Promise.all([
            this.people.getInstitutionArray('?filter=apj|eq|true&order=name'),
            this.is4ua.loadIs4ua(),
            this.people.getAPJPackages('?order=name'),
            this.products.getObjectsArray('?filter=apj|eq|true&order=name')
        ]);

        this.filterList();
    }

    attached() {
        $("#loading").hide();
        $('#filterField').focus();
        $('[data-toggle="tooltip"]').tooltip();
        $('.selectpicker').selectpicker();
    }

    refreshSelects() {
        this.utils.refreshSelect("#editInstitutonStatusArray", this.is4ua.institutonStatusArray, "code", this.people.selectedInstitution.institutionStatus);
        this.utils.refreshSelect("#editInstitutionType", this.is4ua.institutionTypes, "code", this.people.selectedInstitution.institutionType);
    }

    async refresh() {
        $('#loading').show();
        await this.people.getInstitutionArray('?filter=apj|eq|true&order=name');
        $('#loading').hide();
    }

    new() {
        this.people.selectInstitution();
        this.refreshSelects();
        // this.createValidationRules();
    }

    newRequest() {
        if (this.newRequestDetails.length + this.requestDetails.length >= this.selectedPackage.maxClients) {
            $("#confirmExtraRequestModal").modal('show');
        } else {
            this.executeNewRequest();
        }

    }

    executeNewRequest() {
        this.newRequestDetails.push(this.requests.emptyRequestDetail());
        this.newRequestDetailsIndex = this.newRequestDetails.length - 1;
        $("#newRequestModal").modal('show');
    }

    editNewRequest(index) {
        this.newRequestDetailsIndex = index;
        $("#newRequestModal").modal('show');

    }

    cancelAddNewRequest() {
        this.newRequestDetails.splice(this.newRequestDetailsIndex, 1);
    }

    editRequest(index) {
        this.originalRequest = JSON.parse(JSON.stringify(this.requestDetails[index]));
        this.requestDetailsIndex = index;
        this.utils.refreshSelect("#selectExistingProduct", this.filteredProductsArray, "_id", this.requestDetails[this.requestDetailsIndex].productId);
        $("#requestModal").modal('show');
    }

    cancelEditRequest() {
        this.requestDetails[his.requestDetailsIndex] = JSON.parse(JSON.stringify(this.originalRequest));
    }

    retireRequest(event, index) {
        event.stopPropagation();
        this.retireRequestIndex = index;
        $("#confirmRetireModal").modal('show');
    }

    executeRetireRequest() {
        this.requestDetails[this.retireRequestIndex].oldRequestStatus = this.requestDetails[this.retireRequestIndex].requestStatus;
        this.requestDetails[this.retireRequestIndex].requestStatus = this.config.RETIRED_REQUEST_CODE;

    }

    unRetireRequest(event, index) {
        event.stopPropagation();
        this.requestDetails[index].requestStatus = this.requestDetails[index].oldRequestStatus;
    }

    async edit(institution) {
        this.selectedInstitutionId = institution._id;
        await this.people.getInstitution(institution._id);
        this.getPackage();
        await this.requests.getAPJInstitutionRequests('?filter=institutionId|eq|' + this.selectedInstitutionId);
        if (!this.requests.apjInstitutionRequestArray.length) {
            this.requests.selectRequest();
        } else {
            this.requests.selectRequest(0);
        }
        this.filterNotActiveRequests();
        this.refreshSelects();
        this.createValidationRules();
        this.newRequestDetails = [];
        $('[data-toggle="tooltip"]').tooltip();
        this.view = 'form';
    }

    // addProduct() {
    //     this.requestTable = false;
    // }

    // backAdProduct() {
    //     this.requestTable = true;
    // }

    // async changeInstitution(el) {
    //     if (this.selectedInstitution != "") {
    //       await this.people.selectInstitutionByID(this.selectedInstitution);
    //       this.getPackage();
    //       this.institutionSelected = true;
    //       if (!this.config.SANDBOX_USED) {
    //         this.typeSelected = true;
    //         this.regularClient = true;
    //         this.requestType = "regularCourse";
    //       }
    //       this.selectedPerson = "";
    //       this.requestType = "";
    //       $("#existingRequestInfo").empty().hide();
    //       await this.requests.getAPJInstitutionRequests('?filter=institutionId|eq|' + this.selectedInstitution, true);
    //       if (!this.requests.apjInstitutionRequestArray.length) {
    //         this.requests.selectRequest();
    //       } else {
    //         this.requests.selectRequest(0);
    //       }
    //       this.filterNotActiveRequests();
    //     } else {
    //       this.people.selectInstitution();
    //       this.institutionSelected = false;
    //     }

    //   }

    filterNotActiveRequests() {
        this.requestDetails = [];
        if (this.filterRetired) {
            this.requests.selectedRequest.requestDetails.forEach(item => {
                if (item.requestStatus != this.config.RETIRED_REQUEST_CODE) {
                    this.requestDetails.push(item);
                }
            })
        } else {
            this.requests.selectedRequest.requestDetails.forEach(item => {
                this.requestDetails.push(item);
            })
        }
    }

    getPackage() {
        this.selectedPackage = undefined;
        let packageId = undefined;
        this.people.selectedInstitution.packages.forEach(item => {
            if (item.active) packageId = item.packageId;
        });
        this.people.packageArray.forEach(item => {
            if (item._id === packageId) this.selectedPackage = item;
        })
    }

    createValidationRules() {

        validationMessages['required'] = 'You must enter \${$displayName}.'
        ValidationRules
            .ensure('name').displayName('a name').required()
            .ensure('institutionType').displayName('an institution type').required()
            .ensure('country').displayName('a country').required()
            .ensure('institutionStatus').displayName('an Status').required()
            .ensure('packageId').displayName('a Package').required()
            .on(this.people.selectedInstitution);
    }

    async save() {
        this.saveInstitution();
    }

    async saveInstitution() {
        let serverResponse = await this.people.saveInstitution();
        if (!serverResponse.error) {
            this.utils.updateArrayItem(serverResponse, this.people.institutionsArray);
            this.utils.showNotification(serverResponse.name + " was updated");
            this.refresh();
        } else {
            this.utils.showNotification("There was a problem saving the institution", 'error');
        }
        this._cleanUp();
    }

    async deleteInstitution() {
        this.modalMessage = "Are you sure you want to delete that instititution?"
        $("#confirmDeleteModal").modal('show');
    }

    async delete() {
        let name = this.people.selectedInstitution.name;
        let serverResponse = await this.people.deleteInstitution();
        if (!serverResponse.error) {
            this.utils.showNotification(name + " was deleted");
            this.refresh();
        }
        this._cleanUp();
    }

    back() {
        if (this.people.isInstitutionDirty(this.people.selectedInstitution).length) {
            this.modalMessage = 'Do you want to save the institution?';
            $("#confirmSaveModal").modal('show');
        } else {
            this.goBack();
        }
    }

    goBack() {
        this.view = 'table';
    }

    cancel() {
        this.people.selectInstitutionByID(this.selectedInstitutionId);
    }

    downloadInstExcel() {
        let csvContent = "data:text/csv;charset=utf-8;,Name,City,State,Country,Type,Status\r\n";
        this.dataTable.baseArray.forEach(item => {
            csvContent += item.name + "," + item.city + "," + item.region + "," + item.country + "," + item.institutionType + "," + item.institutionStatus;
            csvContent += "\r\n";
        })
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "institutions.csv");
        document.body.appendChild(link); // Required for FF

        link.click();
    }

    clearFilters() {
        this.filters[0].value = "";
        this.filters[1].value = "";
        $('#filterField').focus();
    }

    _cleanUp() {
        this.clearFilters();
        this.goBack();
    }

    addPackage() {
        $("#addPackageModal").modal('show');
    }

    executeAddPackage() {
        if (this.selectedPackage !== "") {
            if (!this.people.selectedInstitution.packages) this.people.selectedInstitution.packages = [];
            this.people.selectedInstitution.packages.forEach(item => {
                if (item.active) {
                    item.active = false;
                    item.dateEnded = new Date();
                }
            })
            this.people.selectedInstitution.packages.push({
                packageId: this.selectedPackage,
                dateStarted: new Date(),
                active: true
            })
        }
    }

    editPackage(index) {
        this.editPackageIndex = index;
        this.packageId = this.people.selectedInstitution.packages[index].packageId;
        this.utils.refreshSelect("#editPackageID", this.people.packageArray, "_id", this.people.selectedInstitution.packages[index].packageId);
        $("#editPackageModal").modal('show');
    }

    executeEditPackage() {
        this.people.selectedInstitution.packages[this.editPackageIndex].packageId = this.packageId;
    }


    // selectProduct(product) {
    //     if (this.requestDetails.length >= this.selectedPackage.maxClients) {
    //         // this.utils.showNotification("This university has reached their maximum requested products.", "error");
    //         return this.dialog.showMessage(
    //             "This university has reached their maximum requested products.  Are you sure you want to proceed?",
    //             "Extra Client",
    //             ['Yes', 'No']
    //         ).whenClosed(response => {
    //             if (response.output.toUpperCase() == 'YES') {
    //                 this.invoiceRelevant = true;
    //                 this.addTheClient(product);
    //                 return;
    //             } else {
    //                 this.invoiceRelevant = false;
    //                 this.addTheClient(product);
    //                 return;
    //             }
    //         });
    //     }
    //     this.invoiceRelevant = false;
    //     this.addTheClient(product);
    // }

    // addTheClient(product) {
    // var newObj = this.requests.emptyRequestDetail();
    // newObj.productId = product._id;
    // this.requestDetails.push(newObj);
    // this.requests.selectedRequest.requestDetails.push(newObj);
    // this.products.selectedObjectFromId(newObj.productId);
    // this.requests.selectedRequest.requestDetails[this.requests.selectedRequest.requestDetails.length - 1].productName = product.name;
    // this.requests.selectedRequest.requestDetails[this.requests.selectedRequest.requestDetails.length - 1].invoiceRelevant = this.invoiceRelevant;
    // if (this.invoiceRelevant) {
    //     this.requests.selectedRequest.requestDetails[this.requests.selectedRequest.requestDetails.length - 1].price = product.price;
    // }

    // this.validation.makeValid($("#productList"));
    // }

    // alreadyOnList(id) {
    //     for (let i = 0; i < this.requests.selectedRequest.requestDetails.length; i++) {
    //         if (this.requests.selectedRequest.requestDetails[i].productId === id) return true;
    //     }
    //     return false;
    // }

    // async removeProduct(index) {
    //     if (this.requestDetails[index].requestStatus == this.config.ASSIGNED_REQUEST_CODE) {
    //         return this.dialog.showMessage(
    //             "That request has already been assigned.  Are you sure you want to retire that assignment?",
    //             "Retire Assignment",
    //             ['Yes', 'No']
    //         ).whenClosed(response => {
    //             if (!response.wasCancelled) {
    //                 this.requestDetails[index].requestStatus = this.config.RETIRED_REQUEST_CODE;
    //                 this.saveIt();
    //                 this.updateClient(this.requestDetails[index]);
    //             }
    //         });

    //     } else {
    //         return this.dialog.showMessage(
    //             "Are you sure you want to delete that request?",
    //             "Delete Request",
    //             ['Yes', 'No']
    //         ).whenClosed(response => {
    //             if (!response.wasCancelled) {
    //                 this.requestDetails[index].delete = true;
    //                 this.removeRequestDetail(this.requestDetails[index]);
    //                 this.requestDetails.splice(index, 1);
    //                 this.saveIt();
    //             }
    //         });
    //     }
    // }

    removeRequestDetail(request) {
        let spliceIndex = -1;
        this.requests.selectedRequest.requestDetails.forEach((item, index) => {
            if (item._id === request._id) spliceIndex = index;
        });
        this.requests.selectedRequest.requestDetails.splice(spliceIndex, 1);
    }

    filterList() {
        if (this.filter) {
            var thisFilter = this.filter
            this.filteredProductsArray = this.products.objectsArray.filter((item) => {
                return item.name.toUpperCase().indexOf(thisFilter.toUpperCase()) != -1;
            });
        } else {
            this.filteredProductsArray = this.products.objectsArray;
        }
    }

    _validateRequest() {

    }

    _buildRequest() {
        let newDetailsToSave = [];
        if (!this.requests.selectedRequest.institutionId) {
            this.requests.selectedRequest.institutionId = this.selectedInstitutionId;
        }
        this.newRequestDetails.forEach(item => {
            newDetailsToSave.push({
                productId: item.productId,
                requestStatus: this.config.UNASSIGNED_REQUEST_CODE,
                numberOfStudents: item.numberOfStudents,
                requiredDate: item.requiredDate,
                assignments: []
            });
        });

        this.packageToSave = {
            request: this.requests.selectedRequest,
            newDetailsToSave: newDetailsToSave,
            detailsToSave: this.requestDetails
        }

        // this.requests.selectedRequest.requestDetails;
        // this.requests.selectedRequest.requestDetailsToSave.forEach((item, index) => {
        //     if (item.requestStatus != this.config.ASSIGNED_REQUEST_CODE && item.requestStatus != this.config.RETIRED_REQUEST_CODE) item.requestStatus = this.config.UPDATED_REQUEST_CODE;
        // })
        // this.requests.selectedRequest.requestStatus = this.config.UPDATED_REQUEST_CODE;
    }

    async saveRequests() {
        // if (this.validation.validate(1)) {
        this._buildRequest();
        if (!this.requests.selectedRequest._id) {
            let serverResponse = await this.requests.saveRequest(this.packageToSave);
            if (!serverResponse.status) {
                this.systemSelected = false;
                this.utils.showNotification("Product request " + serverResponse.clientRequestNo + " was updated");
            }
        } else {
            let serverResponse = await this.requests.saveRequestWithId(this.packageToSave);
            if (!serverResponse.status) {
                this.utils.showNotification("The product request was updated");
                this.systemSelected = false;
            }
        }
        this._cleanUp();
        // }
    }
}