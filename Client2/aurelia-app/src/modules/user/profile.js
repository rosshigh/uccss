import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";
import Validation from '../../resources/utils/validation';
import {Utils} from '../../resources/utils/utils';
import {is4ua} from '../../resources/data/is4ua';
import {People} from '../../resources/data/people';
import moment from 'moment';
import $ from 'jquery';

@inject(is4ua,People, Router, Utils, Validation)
export class Profile {

    constructor(is4ua, people, router, utils, validation) {
        this.is4ua = is4ua;
        this.people = people;
        this.router = router;
        this.utils = utils;
        this.validation = validation;
        this.validation.initialize(this);
        this._setupValidation();

        this.userObj = JSON.parse(sessionStorage.getItem('user'));
       
    };

    _setupValidation(){
        this.validation.addRule(1,"editFirstName",[{"rule":"required","message":"First Name is required", "value": "people.selectedPerson.firstName"}]);
        this.validation.addRule(1,"editLastName",[{"rule":"required","message":"Last Name is required", "value": "people.selectedPerson.lastName"}]);
        // this.validation.addRule(1,"editEmail",[{"rule":"required","message":"Email is required", "value": "people.selectedPerson.email"}]);
        this.validation.addRule(1,"editInstitution",[{"rule":"required","message":"Institution is required", "value": "people.selectedPerson.institutionId"}]);
        // this.validation.addRule(1,"register_password",[{"rule":"required","message":"Password is required", "value": "people.selectedPerson.password"}]);
        // this.validation.addRule(1,"register_password_repeat",[{"rule":"Custom","message":"Passwords must match",
        //     "valFunction":function(context){
        //         return (context.people.selectedPerson.password === context.password_repeat);
        //     }}]);
    }

    attached(){
        $('[data-toggle="tooltip"]').tooltip();
    }

    async activate() {
        let responses = await Promise.all([
            this.people.getPerson(this.userObj._id),
            this.people.getInstitutionsArray('?fields=_id name&order=name'),
            this.is4ua.loadIs4ua()
        ]);
        
        this.user = this.people.selectedPerson;
    }

    buildAudit(){
        var changes = this.people.isPersonDirty();
        changes.forEach(item => {
            this.people.selectedPerson.audit.push({
                 property: item.property,
                eventDate: new Date(),
                oldValue: item.oldValue,
                newValue: item.newValue,
                personId: JSON.parse(sessionStorage.getItem('user'))._id
            })
        });
    }

    async save() {
        if(this.validation.validate(1,this)) {
            if(this.people.selectedPerson.roles.indexOf("PROV") > -1){
                this.people.selectedPerson.roles.splice(this.people.selectedPerson.roles.indexOf("PROV"), 1);
            }
            this.buildAudit();
            let response = await this.people.savePerson()
            if(!response.error){
                this.utils.showNotification("Your profile has been updated");
                this.router.navigate("user");
            } else {
                this.utils.showNotification("An error occurred updating your profile");
            }
        }
    };

    cancel(){
        this.utils.copyObject(this.users, this.people.selectedPerson);
    }

}