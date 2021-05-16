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
export class ViewRequests {

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

        this.userObj = this.store.getUser('user');

        this.pageTitle = 'View Product Requests';
    }

    async activate() {
        let responses = await Promise.all([
            this.sessions.getObjectsArray('?order=startDate:DSC')
        ]);

        this.systems.getObjectsArray();
    }

    attached() {
        // $('.selectpicker').selectpicker();
        this.getRequests();
    }

    async getRequests() {
        if (this.selectedSession) {
            await this.requests.getActiveObjectsArray(this.userObj._id, this.selectedSession);
            this.requestSelected = false;

            this.requests.objectsArray.forEach(item => {
                if (item.courseId === null) {
                    item.courseId = { name: this.config.SANDBOX_NAME, number: "" }
                }
            })
        }
    }

    edit(detail, request) {
        this.assignmentDetails = [];
        this.requests.setDetail(detail)
        this.requests.setRequest(request);
        this.requests.selectedDetail.assignments.forEach(item => {
            let system = this.getSystem(item.systemId);
            this.assignmentDetails.push({
                assignment: item,
                system: system
            });
        });
        this.requestSelected = true;
    }

    getSystem(id){
        let system = null;
        for(let i = 0; i < this.systems.objectsArray.length; i++){
            if(this.systems.objectsArray[i]._id === id){
                system = this.systems.objectsArray[i];
            }
        }
        return system;
    }

    back() {
        this.requestSelected = false;
    }

}