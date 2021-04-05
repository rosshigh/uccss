import { inject } from 'aurelia-framework';
import { People } from '../../../resources/data/people';
import { Systems } from '../../../resources/data/systems';
import { Products } from '../../../resources/data/products';
import { APJClientRequests } from '../../../resources/data/apjClientRequests';
import { Utils } from '../../../resources/utils/utils';
import { AppConfig } from '../../../appConfig';

@inject(People, Systems, Products, APJClientRequests, Utils, AppConfig)
export class APJAssignments {

    constructor(people, systems, products, requests, utils, config) {
        this.people = people;
        this.systems = systems;
        this.products = products;
        this.requests = requests;
        this.utils = utils;
        this.config = config;

        this.filters = [
            { value: '', keys: ['requestStatus'] },
            { value: '', keys: ['productId.name'] },
            { value: '', keys: ['requestId.institutionId.name'] },
            { value: '', custom: this.filterSystem }
        ];

        this.filterAssigned = true;

        this.userObj = JSON.parse(sessionStorage.getItem('user'));

        this.view = 'table';
    }

    filterSystem(filterValue, row) {
        if (!filterValue) return true;
        let upperFilterValue = filterValue.toUpperCase();
        let keep = false;
        row.assignments.forEach(item => {
            if (item.systemId.sid.indexOf(upperFilterValue) > -1) keep = true;
        })
        return keep;
    }

    async activate() {
        let responses = await Promise.all([
            this.products.getObjectsArray('?filter=apj|eq|true&order=name'),
            this.people.getInstitutionArray('?filter=[and]institutionStatus|eq|01:apj|eq|true&order=name'),
            this.systems.getObjectsArray('?filter=apj|eq|true'),
            this.people.getAPJPackages()
        ]);
        this.getRequests();

        let uccRoles = "";
        this.config.ROLES.forEach(item => {
            if (item.UCConly) uccRoles += item.role + ":";
        });
        this.people.getUCCStaff(uccRoles);
    }

    attached() {
        $('[data-toggle="tooltip"]').tooltip();
    }

    async getRequests() {
        $('#loading').show();
        if (this.filterAssigned) {
            await this.requests.getClientRequestsDetailsArray('?filter=requestStatus|eq|' + this.config.UNASSIGNED_REQUEST_CODE);
        } else {
            await this.requests.getClientRequestsDetailsArray('?filter=[in]requestStatus[list]' + this.config.UNASSIGNED_REQUEST_CODE + ":" + this.config.ASSIGNED_REQUEST_CODE);
        }
        $('#loading').hide();
    }

    async selectARequest(request){
        this.provisionalClientList = [];
        this.assignmentsToDelete = [];
        this.assignmentsToUpdate = [];
        let responses = await Promise.all([
            this.requests.getRequestDetail(request._id),
            this.products.getObject(request.productId._id)
        ]);
        
        if (!this.requests.selectedRequestDetail.productId.systems[0]) {
            this.utils.showNotification("You need to assign a system to this product before you can assign this request", 'warning');
        } else {
            await this.getProductSystems();
        }

        if (this.productSystems && this.productSystems.length) {
            this.selectedSystem = this.productSystems[0];
            this.selectedSystemId = this.selectedSystem._id;
            $('#' + this.selectedSystemId).prop('checked', true)
        }

        this.view = 'form';
    }

    async getProductSystems() {
        this.systemConfigured = false;
        this.productSystems = new Array();
        var productSystemsSIDs = "";
        this.requests.selectedRequestDetail.productId.systems.forEach(item => {
            let delimiterChar = productSystemsSIDs.length ? ":" : "";
            productSystemsSIDs += delimiterChar + item.sid;
        });

        let response = await this.systems.getAPJConfiguredProductSystems(productSystemsSIDs);
        if (!response.error) {
            response.forEach(item => {
               this.productSystems.push(item);
            });
        }
        if (this.productSystems != null && this.productSystems.length) this.systemConfigured = true;
        this.productSystems = this.productSystems.sort((a, b) => {
            return (a['sid'] < b['sid']) ? -1 : (a['sid'] > b['sid']) ? 1 : 0;
        });

        // this.refreshSelects();
        // FIX THIS: this.selectedSystemId = this.productSystems[0]._id;
    }

    selectClient(client, index) {
        let clientIndex = this.getClientIndex(client.client);
        if (!this.checkForExitingClientonProvisionalList(client)) {
            if (client.clientStatus == this.config.ASSIGNED_CLIENT_CODE) {
                this.proposedClient = this.utils.copyObject(client);
                this.proposedIndex = clientIndex;
                $('#confirmShare').modal('show');
            } else {
                this.provisionalClientList.push({
                    proposedClient: this.utils.copyObject(client),
                    proposedClientIndex: clientIndex,
                    proposedSystem: this.selectedSystem,
                    share: false
                });
                this.selectedClientIndex = this.provisionalClientList.length - 1;
            }
        }
        // this.calcIDRangeFromTemplate();
        // if (this.verticalDisplay) {
        //     setTimeout(() => { $("#lastId").focus(); }, 500);
        // } else {
        //     setTimeout(() => { $("#lastVerticalId").focus(); }, 500);
        // }
    }

    checkForExitingClientonProvisionalList(client) {
        let alreadyOnList = false;
        this.provisionalClientList.forEach(item => {
            if (client.client === item.proposedSystem.clients[item.proposedClientIndex].client && client.systemId === this.selectedSystemId) {
                alreadyOnList = true;
            }
        })
        return alreadyOnList;
    }

    getClientIndex(client) {
        for (let i = 0; i < this.selectedSystem.clients.length; i++) {
            if (this.selectedSystem.clients[i].client === client) return i;
        }
        return 0;
    }

    deleteClientFromProposedList(index) {
        setTimeout(() => {this.provisionalClientList.splice(index, 1)},250);
    }

    buildAssignment() {
        this.systemsToSave = [];
        this.provisionalClientList.forEach(item => {
            this.requests.selectedRequestDetail.requestStatus = this.config.ASSIGNED_REQUEST_CODE;
            this.requests.selectedRequestDetail.techComments = this.uccMessage ? this.uccMessage : "";
            this.requests.selectedRequestDetail.assignments.push({
                systemId: item.proposedClient.systemId,
                client: item.proposedClient.client,
                staffId: this.userObj._id,
                assignedDate: new Date()
            });

            item.proposedSystem.clients[item.proposedClientIndex].assignments.push({
                personId: this.requests.selectedRequestDetail.requestId.personId,
                institutionId: this.requests.selectedRequestDetail.requestId.institutionId,
                requestDetail: this.requests.selectedRequestDetail._id
            });

            if (item.proposedSystem.clients[item.proposedClientIndex].clientStatus == this.config.UNASSIGNED_CLIENT_CODE) {
                item.proposedSystem.clients[item.proposedClientIndex].clientStatus = this.config.ASSIGNED_CLIENT_CODE;
            } else if (item.proposedSystem.clients[item.proposedClientIndex].clientStatus == this.config.ASSIGNED_CLIENT_CODE &&
                item.share) {
                item.proposedSystem.clients[item.proposedClientIndex].clientStatus = this.config.SHARED_CLIENT_CODE;
            }
        });

        // if (this.anAssignmentChanged) {
        //     this.assignmentsToUpdate.forEach(item => {
        //         this.updateClient(item);
        //     });
        // }

        this.assignmentsToDelete.forEach(item => {
            this.deleteAnAssignment(item);
            this.requests.selectedRequestDetail.assignments.splice(item.assignmentIndex, 1);
            if (this.requests.selectedRequestDetail.assignments.length === 0) {
                this.requests.selectedRequestDetail.requestStatus = this.config.UNASSIGNED_REQUEST_CODE;
            }
        });
    }

    deleteAnAssignment(item) {
        for (let i = 0; i < item.systemToUpdate.clients.length; i++) {
            if (item.systemToUpdate.clients[i].client === this.requests.selectedRequestDetail.assignments[item.assignmentIndex].client) {
                for (let j = 0; j < item.systemToUpdate.clients[i].assignments.length; j++) {
                    if (item.systemToUpdate.clients[i].assignments[j].requestDetail === this.requests.selectedRequestDetail._id) {
                        item.systemToUpdate.clients[i].assignments.splice(j, 1);
                        if (item.systemToUpdate.clients[i].assignments.length === 0) {
                            item.systemToUpdate.clients[i].clientStatus = this.config.UNASSIGNED_CLIENT_CODE;
                        }
                        break;
                    }
                }
            }
        }
    }

    updateClient(item) {
        for (let i = 0; i < item.systemToUpdate.clients.length; i++) {
            if (item.systemToUpdate.clients[i].client === this.requests.selectedDetail.assignments[item.assignmentIndex].client) {
                item.systemToUpdate.clients[i].assignments.forEach(assignment => {
                    if (assignment.requestDetail === this.requests.selectedDetail._id) {
                        assignment.studentIDRange = this.requests.selectedDetail.assignments[item.assignmentIndex].studentUserIds;
                        assignment.facultyIDRange = this.requests.selectedDetail.assignments[item.assignmentIndex].facultyUserIds;
                    }
                })
            }
        }
    }

    async save() {
        this.buildAssignment();
        let response = await this.requests.saveRequestDetail();
        if (!response.error) {
            this.utils.updateArrayItem(response, this.requests.detailsArray);
            this.requests.replaceObject(response);
            this.filters[0].value="2";
            this.filters[0].value="";
            this.provisionalClientList.forEach(item => {
                this.systems.setObject(item.proposedSystem);
                this.systems.saveObject()
            });
            this.assignmentsToUpdate.forEach(item => {
                this.systems.setObject(item.systemToUpdate);
                this.systems.saveObject()
            });
            this.assignmentsToDelete.forEach(item => {
                this.systems.setObject(item.systemToUpdate);
                this.systems.saveObject()
            });
            this.cleanUp();
        }
    }

    cleanUp(){
        this.provisionalClientList = [];
        this.back();
    }

    back(){
        this.view = 'table';
    }

    async getSystemForAssignment() {
        let systemFound = false;
        let object;
        this.productSystems.forEach(item => {
            if (this.requests.selectedRequestDetail.assignments[this.selectedAssignmentIndex].systemId === item._id) {
                object = {
                    systemToUpdate: item,
                    assignmentIndex: this.selectedAssignmentIndex
                };
                systemFound = true;
            }
        })

        if (!systemFound) {
            let response = this.systems.getObject(this.requests.selectedRequestDetail.assignments[this.selectedAssignmentIndex].systemId);
            if (!response.error) {
                object = {
                    systemToUpdate: response,
                    assignmentIndex: this.selectedAssignmentIndex
                };
            }
        }
        return object;

    }

    deleteClientFromAssignedList(index, event) {
        event.stopPropagation();
        this.selectedAssignmentIndex = index;
        $('#confirmDeleteAssigned').modal('show');
    }

    async deleteAssignment() {
        let response = await this.getSystemForAssignment();
        this.assignmentsToDelete.push(response);
        $('#' + this.requests.selectedRequestDetail.assignments[response.assignmentIndex].systemId + "-" + this.requests.selectedRequestDetail.assignments[response.assignmentIndex].client).addClass('deletedAssignment');
        $('#confirmDeleteAssigned').modal('hide');
        this.utils.showNotification('You must save the request to complete the operation');
    }
}