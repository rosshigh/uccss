import { inject } from 'aurelia-framework';
import { People } from '../../resources/data/people';
import { Store } from '../../store/store';
import { Utils } from '../../resources/utils/utils';
import { AppConfig } from '../../appConfig';

@inject(People, Store, Utils, AppConfig)
export class FacCoord {

    pageSize = 200;
    defaultPhoneMask = "999-999-9999";
    roles = [
        { role: 'FACU', label: 'Faculty', keep: false },
        { role: 'LEGL', label: 'Legal Contact', keep: false },
        { role: 'BUSI', label: 'Billing Contact', keep: false },
        { role: 'TECH', label: 'Technical Contact', keep: false }
    ];

    constructor(people, store, utils, config) {
        this.people = people;
        this.store = store;
        this.utils = utils;
        this.config = config;

        this.userObj = this.store.getUser('user');
        this.pageTitle = "Faculty Coordinator";

        this.filters = [
            { value: '', keys: ['fullName'] },
            { value: '', keys: ['email'] },
            { value: '', keys: ['roles'] },
            { value: false, custom: this.filterStatus },
        ];

        this.loadStatus = "01";
    }

    async activate() {
        await this.refresh();
    }

    async refresh() {
        $('#loading').show();
        if (this.loadStatus === "03") {
            await this.people.getPeopleArray('?order=lastName&filter=institutionId|eq|' + this.userObj.institutionId._id);
        } else {
            await this.people.getPeopleArray('?order=lastName&filter=[and]personStatus|eq|' + this.loadStatus + ':institutionId|eq|' + this.userObj.institutionId._id);
        }
        $('#loading').hide();
    }

    clearFilters() {
        this.filters[0].value = "";
    }

    copyEmail(person, event) {
        event.stopPropagation();
        const el = document.createElement('textarea');
        el.value = person.email;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        this.utils.showNotification('Email copied')
    }

    async save(){
        this.setRoles();
        this.people.selectedPerson.personStatus = personStatus === this.config.ACTIVE_PERSON ? this.config.INACTIVE_PERSON : this.config.ACTIVE_PERSON;
        let serverResponse = await this.people.savePerson();
            if (!serverResponse.error) {
                this.utils.updateArrayItem(serverResponse, this.people.peopleArray);
                this.utils.showNotification(serverResponse.firstName + " " + serverResponse.lastName + " was updated");
            } else {
                this.utils.showNotification("There was a problem saving the person", 'error');
            }
    }

    async toggleStatus(id, personStatus, event) {
        event.stopPropagation();
        if (id && personStatus) {
            this.people.selectedPersonById(id);
            this.roles.forEach(item => {
                item.keep = this.people.selectedPerson.roles.indexOf(item.role) !== -1;
            });
            $("#pickRolesClone").modal('show'); 
        }
    }

    setRoles(){
        this.roles.forEach(item => {
            if(item.keep && this.people.selectedPerson.roles.indexOf(item.role) === -1){
                this.people.selectedPerson.roles.push(item.role);
            }
            item.keep = false;
        });
    }

    downloadInstExcel() {
        let csvContent = "data:text/csv;charset=utf-8;,First Name,Last Name,Email,Phone,Institution,Country,Region,Status,Roles\r\n";
        this.dataTable.baseArray.forEach(item => {
            let isActive = item.personStatus == '01' ? 'Active' : 'Inactive';
            csvContent += item.firstName + ","
                + item.lastName.replace(',', ' ') + ","
                + item.email + ","
                + item.phone + ","
                + item.institutionId.name.replace(",", " ") + ","
                + item.country + ","
                + item.region + ","
                + isActive + ","
                + item.roles.join(":");
            csvContent += "\r\n";
        })
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "people.csv");
        document.body.appendChild(link); // Required for FF

        link.click();
    }

}