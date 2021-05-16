import { inject } from 'aurelia-framework';
import { HelpTickets } from '../../../resources/data/helpTickets';
import { ClientRequests } from '../../../resources/data/clientRequests';
import { Sessions } from '../../../resources/data/sessions';
import { Products } from '../../../resources/data/products';
import { Systems } from '../../../resources/data/systems';
import { People } from '../../../resources/data/people';
import { DocumentsServices } from '../../../resources/data/documents';
import { Store } from '../../../store/store';
import { AppConfig } from '../../../appConfig';
import { Utils } from '../../../resources/utils/utils';

@inject(HelpTickets, ClientRequests, Sessions, Products, Systems, People, DocumentsServices, Store, AppConfig, Utils)
export class RequestsArchive {

    pageSize = 200;
    archive = true;

    constructor(helpTickets, requests, sessions, products, systems, people, documents, store, config, utils) {
        this.helpTickets = helpTickets;
        this.requests = requests;
        this.sessions = sessions;
        this.products = products;
        this.systems = systems;
        this.people = people;
        this.store = store;
        this.config = config;
        this.utils = utils;

        this.sessionDatesMessage = "";
        this.selectedProducts = [];
        this.view = 'table';
        this.filterAssigned = true;

        this.userObj = this.store.getUser('user');

        this.filters = [
            { value: '', keys: ['requestStatus'] },
            { value: '', keys: ['productId.name'] },
            { value: '', keys: ['requestId.courseId.name', 'requestId.courseId.number'] },
            { value: '', keys: ['requestId.personId.fullName'] },
            { value: '', keys: ['requestId.institutionId.name'] },
        ];

        this.verticalDisplay = true;
    }

    async activate() {
        let responses = await Promise.all([
            this.sessions.getObjectsArray('?order=startDate:DSC'),
            this.systems.getObjectsArrayWithClients(),
        ]);

        let uccRoles = "";
        this.config.ROLES.forEach(item => {
            if (item.UCConly) uccRoles += item.role + ":";
        });
        await this.people.getUCCStaff(uccRoles);

        this.systems.getObjectsArray();
        this.products.getObjectsArray('?order=name');
    }

    attached() {
        $('[data-toggle="tooltip"]').tooltip();
        // $('.selectpicker').selectpicker();
        this.getRequests();
    }

    async getRequests() {
        if (this.selectedSession) {
            this.sessions.selectSessionById(this.selectedSession);
            await this.requests.getRequestDetails('?filter=sessionId|eq|' + this.selectedSession);
            this.requestSelected = false;
        }
    }

    viewAssignment(detail, event) {
        event.stopPropagation();
        this.assignmentDetails = [];
        this.requests.setDetail(detail)
        this.requests.selectedDetail.assignments.forEach(item => {
            let system = this.getSystem(item.systemId);
            this.assignmentDetails.push({
                assignment: item,
                system: system
            });
        });
        this.view = 'form';
    }

    getSystem(id) {
        let system = null;
        for (let i = 0; i < this.systems.objectsArray.length; i++) {
            if (this.systems.objectsArray[i]._id === id) {
                system = this.systems.objectsArray[i];
                break;
            }
        }
        return system;
    }

    back() {
        this.requestSelected = false;
        this.selectedAssignmentIndex = -1;
        this.selectedClientIndex = -1;
        this.view = 'table';
    }

}