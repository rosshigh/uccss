import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";
import Validation from '../../resources/utils/validation';
import {Utils} from '../../resources/utils/utils';
import {is4ua} from '../../resources/data/is4ua';
import {People} from '../../resources/data/people';
import { CommonDialogs } from '../../resources/dialogs/common-dialogs';
import {AppConfig} from '../../config/appConfig';

@inject(is4ua,People, Router, Utils, Validation, CommonDialogs, AppConfig)
export class Profile {
    title="Profile";
    phoneMask = "";

    constructor(is4ua, people, router, utils, validation, dialog, config) {
        this.is4ua = is4ua;
        this.people = people;
        this.router = router;
        this.utils = utils;
        this.dialog = dialog;
        this.config = config;
        this.validation = validation;
        this.validation.initialize(this);
        this._setupValidation();

        this.userObj = JSON.parse(sessionStorage.getItem('user'));
    };

    _setupValidation(){
        this.validation.addRule(1,"editFirstName",[{"rule":"required","message":"First Name is required", "value": "people.selectedPerson.firstName"}]);
        this.validation.addRule(1,"editLastName",[{"rule":"required","message":"Last Name is required", "value": "people.selectedPerson.lastName"}]);
        this.validation.addRule(1,"editInstitution",[{"rule":"required","message":"Institution is required", "value": "people.selectedPerson.institutionId"}]);
        this.validation.addRule(1,"register_password",[{"rule":"required","message":"Password is required", "value": "people.selectedPerson.password"}]);
        this.validation.addRule(1,"register_password_repeat",[{"rule":"custom","message":"Passwords must match",
        "valFunction":function(context){
            return (context.password === context.password_repeat);
        }}], true);
        this.validation.addRule(4,"register_password",[{"rule":"custom","message": "Password should be at least " + this.thresholdLength + " characters long and should contain "  + (this.threshold < 4 ? "at least " + this.threshold + " of the following groups:" : "a combination of") + " of the following groups: a combination of lowercase letters, uppercase letters, digits or special characters",
            "valFunction":function(context){
            return context.complexPassword;
        }}]);
    }

    attached(){
        $('[data-toggle="tooltip"]').tooltip();
    }

    getPhoneMask(){
        this.phoneMask = "";
        setTimeout(() =>{
            for(let i = 0; i < this.config.PHONE_MASKS.length; i++){
                if(this.people.selectedPerson.country === this.config.PHONE_MASKS[i].country){
                    this.phoneMask = this.config.PHONE_MASKS[i].mask;
                    break;
                }
            }
        },500)
    }

    async activate() {
        let responses = await Promise.all([
            this.people.getPerson(this.userObj._id),
            this.people.getInstitutionsArray('?fields=_id name&order=name'),
            this.is4ua.loadIs4ua()
        ]);
        this.config.getConfig(true);
        this.user = this.people.selectedPerson;
        if(this.people.selectedPerson.file && this.people.selectedPerson.file.fileName) {
            this.personImage = this.people.selectedPerson.file.fileName;
        }
        this.getPhoneMask();
    }

    canActivate(){
        if(!this.userObj) {
        this.userObj = this.config.user;
        if(!this.userObj) {
            this.utils.showNotification("Couldn't find your user information.  Try logging in again or call the UCC.");
            this.router.navigate("home");
        }
        }
    }

    buildAudit(){
        var changes = this.people.isPersonDirty(this.user);
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
            if(this.password && this.password.length > 0){
                this.people.selectedPerson.password = this.password;
            }
            if(this.people.selectedPerson.roles.indexOf("PROV") > -1){
                this.people.selectedPerson.roles.splice(this.people.selectedPerson.roles.indexOf("PROV"), 1);
            }
            this.buildAudit();
            let response = await this.people.savePerson()
            if(!response.error){
                 if (this.filesToUpload && this.filesToUpload.length > 0) {
                    await this.people.uploadFile(this.filesToUpload);
                    this.personImage = this.people.selectedPerson._id + this.people.selectedPerson.file.fileName.substring(this.people.selectedPerson.file.fileName.indexOf('.'))
                }
                this.utils.showNotification("Your profile has been updated.");
                this.showPreview = false;
            } else {
                this.utils.showNotification("An error occurred updating your profile");
            }
        }
    };

    changePassword(){
     var passwords = {password: "", password_repeat: ""};
        return this.dialog.showPassword(
              "Change Password",
              passwords,
              ['Submit', 'Cancel']
          ).whenClosed(response => {
              if (!response.wasCancelled) {
                this.savePassword(response.output.password);
              } else {
                console.log("Cancelled");
              }
          });
    }

    async savePassword(password) {
        var obj = {
            password: password
        }
        let response = await this.people.updatePassword(obj);
        if (!response.error) {
            this.utils.showNotification("The password was updated");
        }
    }

    cancel(){
        this.utils.copyObject(this.users, this.people.selectedPerson);
    }

    changeFiles(){
        if(this.files[0].size > 100000){
            this.utils.showNotification("That image is too large.  The limit is 100,000 KB");
            return;
        }
        if(!this.people.selectedPerson.file) this.people.selectedPerson.file = new Object();
        this.filesToUpload = new Array(); 
        this.filesToUpload.push(this.files[0]);
        this.people.selectedPerson.file.fileName = this.filesToUpload[0].name;
        this.previewFile();
    }

    previewFile() {
        var preview = this.preview;
        var reader  = new FileReader(); 
        this.showPreview = true;

        reader.onloadend = function () {
            preview.src = reader.result;
        }

        if ( this.files[0]) {
            reader.readAsDataURL( this.files[0]);
        } else {
            preview.src = "";
        }
    }

	deleteImage(){
        this.people.selectedPerson.file = new Object();
        this.preview.src="";
        document.getElementById("fileUpload").value = "";
        this.personImage = undefined;
        this.showPreview = false;
    }

}
