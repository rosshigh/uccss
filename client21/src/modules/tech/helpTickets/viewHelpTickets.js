import { inject } from 'aurelia-framework';
import { HelpTickets } from '../../../resources/data/helpTickets';
import { ClientRequests } from '../../../resources/data/clientRequests';
import { Sessions } from '../../../resources/data/sessions';
import { Products } from '../../../resources/data/products';
import { People } from '../../../resources/data/people';
import { Systems } from '../../../resources/data/systems';
import { DocumentsServices } from '../../../resources/data/documents';
import { Store } from '../../../store/store';
import { AppConfig } from '../../../appConfig';
import { Utils } from '../../../resources/utils/utils';
import { DialogService } from 'aurelia-dialog';
import { ConfirmDialog } from '../../../resources/dialogs/confirm-dialog';
import { thisExpression, tsImportEqualsDeclaration } from '../../../../../../../../AppData/Local/Microsoft/TypeScript/4.0/node_modules/@babel/types/lib/index';

@inject(HelpTickets, ClientRequests, Sessions, Products, People, Systems, DocumentsServices, Store, AppConfig, Utils, DialogService)
export class UserViewHelpTickets {

    pageSize = 200;
    chevronIcon = "fa-chevron-up";
    sendEmail = true;

    constructor(helpTickets, requests, sessions, products, people, systems, documents, store, config, utils, dialogs) {
        this.helpTickets = helpTickets;
        this.requests = requests;
        this.sessions = sessions;
        this.systems = systems;
        this.products = products;
        this.people = people;
        this.documents = documents;
        this.store = store;
        this.config = config;
        this.utils = utils;
        this.dialogs = dialogs;

        this.userObj = this.store.getUser('user');
        this.editorid = 'answerhtml';
        this.view = 'categoryList';
        this.showDocuments = false;
        this.showNotesPanel = false;
        this.privateChecked = false;

        this.filters = [
            { value: '', keys: ['helpTicketNo'] },
            { value: '', keys: ['helpTicketStatus'] },
            { value: '', custom: this.filterOwner },
            { value: "", keys: ['personId.fullName'] },
            { value: "", keys: ['institutionId.name'] },
            { value: "", custom: this.filterNickName }
        ];

        this.showTable = true;
    }

    filterNickName(filterValue, row) {
        if (filterValue === null || filterValue === undefined || filterValue === "") return true;
        return row.personId.nickName.indexOf(filterValue) > -1;
    }

    filterOwner(filterValue, row) {
        if (filterValue.length > 0) {
            if (row.owner[0].personId === null) {
                return false;
            } else {
                return row.owner[0].personId.fullName.indexOf(filterValue) > -1;
            }
        } else {
            return true;
        }
    }

    refreshSelects() {
        this.utils.refreshSelect("#session", this.sessions.objectsArray, "_id", this.selectedSession);
        // this.utils.refreshSelect("#institutionSelect", this.people.institutionsArray, "_id", this.people.selectedPerson.institutionId);
        // this.utils.refreshSelect("#specializationSelect", this.is4ua.specialArray, "code", this.people.selectedPerson.personSpecialization);
        // this.utils.refreshSelect("#departmentSelect", this.is4ua.deptArray, "code", this.people.selectedPerson.departmentCategory);
    }

    copyEmail(helpTicket) {
        const hiddenElement = document.createElement('textarea');
        hiddenElement.style.display = 'none !important;';
        hiddenElement.innerText = helpTicket.personId.email;

        document.body.appendChild(hiddenElement);
        hiddenElement.select();

        document.execCommand('SelectAll');
        document.execCommand('Copy');

        document.body.removeChild(hiddenElement);
    }

    async activate(params) {
        $("#loading").show();
        let responses = await Promise.all([
            this.helpTickets.getObjectArray("?filter=helpTicketStatus|lt|" + this.config.CLOSED_HELPTICKET_STATUS + "&order=createdDate:DSC"),
            this.products.getSmallObjectsArray(),
            this.people.getCoursesArray('?filter=personId|eq|' + this.userObj._id + '&order=number'),
            this.systems.getObjectsArray(),
            this.people.getPeopleArray('/small'),
            this.sessions.getObjectsArray('?order=startDate:DSC')
        ]);

        if (params.HTNumber == -1) {
            await this.showHTList();
        } else {
            await this.selectHelpTicket({_id: params.HTNumber});
        }
        $("#loading").hide();
    }

    // async activate(params) {
    //     let responses = await Promise.all([
    //       this.helpTickets.getHelpTicketTypes('?order=category'),
    //       this.config.getConfig()
    //     ]);

    //     if (params.HTNumber == -1) {
    //       await this.showHTList();
    //     } else {
    //       this.HTToShow = params.HTNumber;
    //       this.showHelpTicketImmediately = true;

    //     }
    //   }

    attached() {
        $("#loading").hide();
        $('[data-toggle="tooltip"]').tooltip();
        $('.selectpicker').selectpicker();
    }

    async refresh() {
        this.clearFilters();
        $('#loading').show();
        this.helpTickets.getObjectArray("?filter=helpTicketStatus|lt|" + this.config.CLOSED_HELPTICKET_STATUS + "&order=createdDate:DSC");
        $('#loading').hide();
    }

    async getClosedHelpTickets() {
        this.clearFilters();
        $('#loading').show();
        this.helpTickets.getObjectArray("?filter=helpTicketStatus|eq|" + this.config.CLOSED_HELPTICKET_STATUS + "&order=createdDate:DSC");
        $('#loading').hide();
    }

    async toggleShowClosedHelpTickets() {
        if (this.showClosed) {
            await this.getClosedHelpTickets();
        } else {
            await this.refresh();
        }
    }

    closeHelpTicket(helpTicket) {
        helpTicket.helpTicketStatus = this.config.CLOSED_HELPTICKET_STATUS;
        this.helpTickets.setHelpTicket(helpTicket);
        this.helpTickets.closeHelpTicket();
    }

    clearFilters() {
        this.filters[0].value = "";
    }

    async selectHelpTicket(helpTicket) {
        await this.helpTickets.getHelpTicket(helpTicket._id);
        this.showTable = false;
    }

    back() {
        this.showTable = true;
        this.enterResponse = false;
        this.enableButton = false;
    }

    respond() {
        if (!this.enterResponse) {
            this.content = {
                contentNo: this.helpTickets.selectedObject.content.length,
                response: "",
                personId: this.userObj._id,
                dateCreated: new Date(),
                files: [],
                private: this.privateChecked,
                documents: []
            };
            this.enterResponse = true;
            this.enableButton = true;
        }
    }

    changeFiles() {
        this.filesToUpload = this.filesToUpload ? this.filesToUpload : new Array();
        for (var i = 0; i < this.files.length; i++) {
            let addFile = true;
            this.filesToUpload.forEach(item => {
                if (item.name === this.files[i].name) addFile = false;
            })
            if (addFile) this.filesToUpload.push(this.files[i]);
        }
    }

    removeFile(index) {
        this.filesToUpload.splice(index, 1);
    }

    cancelResponse() {
        this.response = new Object();
        this.isUnchanged = true;
        this.enterResponse = false;
    }

    _createResponse(status) {
        this.helpTickets.selectedObject.helpTicketStatus = status;
        this.content.isPrivate = this.privateChecked;
        // this.helpTickets.selectedHelpTicketContent.emailSent = this.sendEmail;
        this.helpTickets.selectedObject.content.push(this.content);
    }

    async saveResponse(status) {
        if (status === this.config.CLOSED_HELPTICKET_STATUS) {
            $('#confirmClose').modal('show');
        } else {
            this._createResponse(status);
            await this.saveCheckForEmail();
        }
    }

    async saveAndCLoseIt() {
        this._createResponse(this.config.CLOSED_HELPTICKET_STATUS);
        await this.saveCheckForEmail();
        $('#confirmClose').modal('hide');
    }

    async saveCheckForEmail() {
        if (this.sendEmail && !this.privateChecked) {
            console.log('Send an email');
        }
        await this.save();
    }

    async save() {
        let serverResponse = await this.helpTickets.saveHelpTicket();
        if (!serverResponse.error) {
            this.utils.updateArrayItem(serverResponse, this.helpTickets.objectArray);
            this.utils.showNotification("The help ticket was updated");
            if (this.filesToUpload && this.filesToUpload.length > 0) {
                this.helpTickets.uploadFile(this.filesToUpload, serverResponse.content.length - 1, serverResponse._id);
            }
        } else {
            this.utils.showNotification("There was a problem saving the help ticket", 'error');
        }
        this._cleanUp();
    }

    async ownHelpTicket(el, helpTicket) {
        if (el) el.stopPropagation();
        helpTicket.helpTicketStatus = this.config.REVIEW_HELPTICKET_STATUS;
        if (helpTicket) this.helpTickets.setHelpTicket(helpTicket);
        if (this.helpTickets.selectedObject.owner[0].personId == this.userObj._id) return;
        if (this.helpTickets.selectedObject.owner[0].personId !== this.userObj._id) {
            let message = 'Are you sure you want to change ownership of this help ticket?';
            let title = "Save Changes";
            let options = ['Yes', 'No'];
            this.dialogs.open({ viewModel: ConfirmDialog, model: { message, title, options }, lock: false }).whenClosed(response => {
                if (!response.wasCancelled) {
                    this.ownIt();
                }
            });
        }
    }

    async ownIt() {
        this.helpTickets.selectedObject.owner.unshift({ personId: this.userObj._id, dateAssigned: new Date() });
        await this.save();
        this.refresh();
    }

    async changeStatus() {
        if (this.userObj._id != this.helpTickets.selectedObject.owner[0].personId._id) {
            this.utils.showNotification('You must own this ticket before you can change the status');
            return;
        }

        if (this.newStatus.code === this.helpTickets.selectedObject.helpTicketStatustus) {
            return;
        }

        this.helpTickets.selectedObject.helpTicketStatus = this.newStatus.code

        let content = {
            contentNo: this.helpTickets.selectedObject.content.length,
            response: "Help Ticket status set to " + this.newStatus.description + " by " + this.userObj.fullName,
            personId: this.userObj._id,
            dateCreated: new Date(),
            files: []
        };
        this.helpTickets.selectedObject.content.push(content);
        await this.save();
        this.helpTickets.updateHelpTicket(this.helpTickets.selectedObject);
        this.clearStatusChecks();
        $('#statusModal').modal('hide');
    }

    statusModal(helpTicket, el) {
        el.stopPropagation();
        this.helpTickets.setHelpTicket(helpTicket)
        $('#statusModal').modal('show');
    }

    chooseStatus(status) {
        this.clearStatusChecks();
        $("#" + status.code).removeClass('hidden').addClass('visible');
        this.newStatus = status;
    }

    clearStatusChecks() {
        $(".fa-check").removeClass('visible').addClass('hidden');
    }

    _cleanUp() {
        this.enterResponse = false;
        this.showTable = true;
        this.showNotesPanel = false;
        this.filesToUpload = [];
    }

    toggleOriginalTicket() {
        $("#originalTicket").toggle();
        this.chevronIcon = this.chevronIcon === "fa-chevron-up" ? "fa-chevron-down" : "fa-chevron-up";
    }

    showComment(helpTicket, el) {
        this.commentShown = helpTicket.content[0].problemDescription;
        $(".hover").css("top", 10);
        $(".hover").css("right", 10);
        $(".hover").css("display", "block");
    }

    hideComment() {
        $(".hover").css("display", "none");
    }

    showProfile(el, helpTicket) {
        this.profileHelpTicket = helpTicket;
        $(".hoverProfile").css("top", el.clientY - 175);
        $(".hoverProfile").css("left", el.clientX - 200);
        $(".hoverProfile").css("display", "block");
        el.stopPropagation();
    }

    hideProfile() {
        $(".hoverProfile").css("display", "none");
    }

    async attachDocument() {
        let responses = await Promise.all([
            this.documents.getDocumentsCategoriesArray("?filter=[or]category|DOC:CUR:SOF:HPT:USE"),
        ]);
        this.filterDocumentList();
        this.modalTitle = "Choose Documents to Add";
        $('#documentsModal').modal('show');
    }

    filterDocumentList() {
        if (this.DocumentFilter) {
            let thisFilter = this.filter
            this.filteredDocumentArray = this.documents.objectCategoriesArray.filter((item) => {
                return item.description.toUpperCase().indexOf(thisFilter.toUpperCase()) > -1;
            });
        } else {
            this.filteredDocumentArray = this.documents.objectCategoriesArray;
        }
    }

    toggleListItem(el, id) {
        let thisElement = el.target;
        thisElement.parentElement.querySelector(".nested").classList.toggle("active");
        thisElement.classList.toggle("caret-down");
        el.stopPropagation();
    }

    closeDocumentForm() {
        this.showDocumentForm = false;
    }

    showSubCategoryDocuments(category, SubCategoryIndex, SubSubCategoryIndex, el) {
        this.documents.setCategory(category);
        this.selectedDocSubCategoryIndex = SubCategoryIndex;
        this.selectedDocSubSubCategoryIndex = SubSubCategoryIndex;
        this.catDescription = this.documents.selectedCat.description;
        this.subCatDescription = this.documents.selectedCat.subCategories[this.selectedDocSubCategoryIndex].description;
        this.showDocuments = true;
        setTimeout(() => {
            $('[data-toggle="tooltip"]').tooltip();
            $(".form-check-input").prop('checked', false);
            this.content.documents.forEach(item => {
                let id = item.fileName.split(" ").join("");
                $("#" + id).prop('checked', true);
            })
        }, 1000);
        el.stopPropagation();
    }

    // addLinksToQuestion() {
    //     // this.content.documents.forEach(item => {
    //     //     this.faqservices.selectedQuestion.links.push({
    //     //         docCode: this.documentsService.selectedCat.DocCode,
    //     //         subDocCode: this.selectedDocSubCategoryIndex,
    //     //         fileName: item.files[0].fileName
    //     //     })
    //     // });
    // }

    toggleAddToList(document, el) {
        if ($(el.target)[0].checked) {
            this.content.documents.push(document.files[0])
        } else {
            var indexToRemove = -1;
            this.content.documents.forEach((item, index) => {
                if (item.fileName === document.files[0].fileName) {
                    indexToRemove = index;
                }
            });
            if (indexToRemove >= 0) {
                this.content.documents.splice(indexToRemove, 1);
            }
        }
    }

    removeDocument(index) {
        this.content.documents.splice(index, 1);
    }

    showRequestsPanel() {
        this.showRequestPanel = !this.showRequestPanel;
        this.requestTableOrForm = 'table'
        this.refreshSelects();
        this.getActiveRequests();
        window.scrollTo(0, 0);
    }

    async getActiveRequests() {
        if (this.selectedSession) {
            this.sessions.selectSessionById(this.selectedSession);
            await this.requests.getActiveObjectsArray(this.helpTickets.selectedObject.personId._id, this.selectedSession);
            this.originalClientRequestsArray = new Array();
            this.clientRequestsArray = new Array();
            //Cycle through request array
            this.requests.objectsArray.forEach(item => {
                //Cycle through details of request
                item.requestDetails.forEach(item2 => {
                    //If there are assignments
                    if (item2.assignments && item2.assignments.length > 0) {
                        //Cycle through the assignments
                        item2.assignments.forEach((assign) => {
                            this.originalClientRequestsArray.push({
                                productId: item2.productId,
                                productName: item2.productId.name,
                                sessionId: item.sessionId,
                                requestStatus: item2.requestStatus,
                                systemId: assign.systemId,
                                courseName: item.courseId ? item.courseId.name : 'Trial Client',
                                courseId: item.courseId ? item.courseId._id : null,
                                courseNumber: item.courseId ? item.courseId.number : 'Trial Client',
                                client: assign.client,
                                clientId: assign.clientId,
                                _id: item2._id
                            })
                        })
                    } else {
                        this.originalClientRequestsArray.push({
                            productName: item2.productId.name,
                            sessionId: item.sessionId,
                            requestStatus: item2.requestStatus,
                            courseName: item.courseId ? item.courseId.name : 'Trial Client',
                            _id: item2._id
                        })
                    }
                })
            });
            this.originalClientRequestsArray.forEach(item => {
                this.clientRequestsArray.push(item);
            })
        }
    }

    showNotePanel() {
        this.showNotesPanel = !this.showNotesPanel;
    }

    async viewAssignment(id) {
        console.log(id);
        await this.requests.getRequestDetail(id);
        this.showRequestPanel = true;
        // // this.selectedRequestDetail = this.utils.copyObject(request);
        // let response = await this.clientRequests.getRequestDetail(request._id);
        // if (!response.error) {
        //     this.selectedRequestDetail = response;
        //     if (this.selectedRequestDetail.requestId && this.selectedRequestDetail.requestId.courseId === null) this.selectedRequestDetail.requestId.courseId = { _id: this.config.SANDBOX_ID, name: this.config.SANDBOX_NAME };
        //     this.products.selectedProductFromId(this.selectedRequestDetail.productId._id);
        //     if (this.selectedRequestDetail.assignments && this.selectedRequestDetail.assignments.length > 0) this.systems.selectedSystemFromId(this.selectedRequestDetail.assignments[0].systemId);
        this.requestTableOrForm = 'form';
        // }

    }

    async openSearchForm() {
        let responses = await Promise.all([
            this.products.getObjectsArray('?order=name'),
            this.people.getPeopleArray('?order=lastName'),
            this.people.getInstitutionArray('?order=name'),
            this.sessions.getObjectsArray('?order=startDate:DSC'),
            this.products.getSmallObjectsArray('?order=name')
        ]);

        this.filterList();
        this.filterPeopleList();
        this.filterInstitutionsList();
        this.searchForm = true;
    }

    backToTable() {
        this.searchForm = false;
    }

    selectProduct(el) {
        if (!this.selectedProducts) this.selectedProducts = [];
        $("#requestProductsLabel").html("Requested Products");
        this.products.selectedObjectFromId(el.target.id);
        this.selectedProducts.push(this.products.selectedObject);
    }

    removeProduct(el) {
        this.selectedProducts.splice(this.selectedProducts.indexOf(el.target.id), 1);
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

    filterPeopleList() {
        if (this.peopleFilter) {
            var thisFilter = this.peopleFilter
            this.filteredPersonArray = this.people.peopleArray.filter((item) => {
                return item.fullName.toUpperCase().indexOf(thisFilter.toUpperCase()) != -1;
            });
        } else {
            this.filteredPersonArray = this.people.peopleArray;
        }
    }

    selectPerson(el, person) {
        if (!this.selectedPeople) this.selectedPeople = [];
        $("#requestProductsLabel").html("Requested Person");
        this.people.setSelectedPerson(person)
        this.selectedPeople.push(this.people.selectedPerson);
    }

    removePerson(el) {
        this.selectedPeople.splice(this.selectedPeople.indexOf(el.target.id), 1);
    }

    filterInstitutionsList() {
        if (this.institutionsFilter) {
            var thisFilter = this.institutionsFilter;
            this.filteredInstitutionArray = this.people.institutionsArray.filter((item) => {
                return item.name.toUpperCase().indexOf(thisFilter.toUpperCase()) != -1;
            });
        } else {
            this.filteredInstitutionArray = this.people.institutionsArray;
        }
    }

    selectInstitution(el, obj) {
        if (!this.selectedInstitutions) this.selectedInstitutions = [];
        this.people.setInstitution(obj);
        this.selectedInstitutions.push(this.people.selectedInstitution);
    }

    removeInstitution(el) {
        this.selectedInstitutions.splice(this.selectedInstitutions.indexOf(el.target.id), 1);
    }

    //   buildSearchCriteria() {
    //     console.log('lkasjdflj')
    //     this.searchObj = new Object();

    //     if (this.helpTicketNo) {
    //       this.searchObj.helpTicketNo = this.helpTicketNo;
    //     }

    //     if (this.dateFrom || this.dateTo) {
    //       this.searchObj.dateRange = {
    //         dateFrom: this.dateFrom,
    //         dateTo: this.dateTo
    //       };
    //     }

    //     // if (this.selectedStatus) {
    //     //   if(this.selectedStatus == this.config.MY_HELPTICKET_STATUS){
    //     //     this.searchObj.owner = this.userObj._id;
    //     //   } else {
    //     //     this.searchObj.status = this.selectedStatus;
    //     //   }
    //     // }

    //     if (this.keyWords) {
    //       this.searchObj.keyWords = this.keyWords;
    //     }

    //     if (this.content) {
    //       this.searchObj.content = this.contentSearchTerm;
    //     }

    //     // if (this.selectedType != -1) {
    //     //   this.searchObj.helpTicketType = this.selectedType;
    //     // }

    //     if (this.selectedProducts && this.selectedProducts.length) {
    //       this.searchObj.productIds = this.selectedProducts;
    //     }

    //     if (this.selectedPeople && this.selectedPeople.length) {
    //       this.searchObj.peopleIds = this.selectedPeople;
    //     }

    //     if (this.selectedInstitutions && this.selectedInstitutions.length) {
    //       this.searchObj.institutionIds = this.selectedInstitutions;
    //     }

    //   }

    //   async search() {
    //     $("#loading").show();
    //     this.buildSearchCriteria();
    //     this.resultArray = await this.helpTickets.archiveSearch(this.searchObj);
    //     this.helpTicketSelected = true;
    //     this.searchResults = true;
    //     this.showTable = true;
    //     $("#loading").hide();
    //     setTimeout(this.toolTips(), 3000);
    //   }

}