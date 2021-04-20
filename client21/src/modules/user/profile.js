import { inject } from 'aurelia-framework';
import { People } from '../../resources/data/people';
import { Store } from '../../store/store';
import { Utils } from '../../resources/utils/utils';
import { AppConfig } from '../../appConfig';

@inject(People, Store, Utils, AppConfig)
export class Profile {

    constructor(people, store, utils, config) {
        this.people = people;
        this.store = store;
        this.utils = utils;
        this.config = config;

        this.userObj = this.store.getUser('user');
        this.pageTitle = "My Profile";

        this.people.setSelectedPerson(this.userObj);

        if (this.userObj.country === 'US' || this.userObj.country === 'CA') {
            this.useMask = true;
        } else {
            this.useMask = false;
        }

        this.thresholdLength = 6;
        this.threshold = 3;
    }

    async activate() {
        // this.facultyCoordinators = "";
        await this.people.getPeopleArray('?filter=[and]institutionId|eq|' + this.userObj.institutionId._id + ':roles|eq|PRIM');
        // if (this.people.peopleArray) {
        //     this.people.peopleArray.forEach(item => {
        //         this.facultyCoordinators = this.facultyCoordinators + item.fullName + " ";
        //     });
        // }
        this.savedPerson = JSON.parse(sessionStorage.getItem('user'));
    }

    attached() {
        $('[data-toggle="tooltip"]').tooltip();
    }

    changePassword() {
        $("#changePasswordModal").modal('show');
        setTimeout(() => { $("#register_password").focus() }, 200);
    }

    passwordComplexity() {
        if (!this.newPassword) return;
        var newValue = this.newPassword;
        this.longPassword = newValue.length >= this.thresholdLength;
        let strength = 0;
        strength += /[A-Z]+/.test(newValue) ? 1 : 0;
        strength += /[a-z]+/.test(newValue) ? 1 : 0;
        strength += /[0-9]+/.test(newValue) ? 1 : 0;
        strength += /[\W]+/.test(newValue) ? 1 : 0;

        this.complexPassword = strength >= this.threshold && this.longPassword;
        if (!this.complexPassword) {
            $("#register_password").focus();
            this.passwordError = true;
        } else {
            this.passwordError = false
        }
    }

    DoThePasswordsMatch() {
        setTimeout(() => { this.passwordsMatch = this.newPassword === this.password_repeat; }, 200);
        return true;
    }

    async savePassword() {
        if (this.complexPassword && this.DoThePasswordsMatch()) {
            let passwordObject = {
                password: this.newPassword
            }
            let response = await this.people.updatePassword(passwordObject);
            if (!response.error) {
                this.utils.showNotification('Your password was updated');
            }
        }
    }

    validate() {
        this.errors = [];
        if (this.people.selectedPerson.firstName === "") {
            this.errors.push('You must enter a first name')
        }
        if (this.people.selectedPerson.lastName === "") {
            this.errors.push('You must enter a last name')
        }
        if (this.people.selectedPerson.phone === "") {
            this.errors.push('You must enter a phone number')
        }
    }

    async save() {
        this.validate();
        if (!this.errors.length) {
            let response = await this.people.savePerson();
            if (!response.error) {
                this.utils.showNotification('Your profile was saved');
                if (this.filesToUpload && this.filesToUpload.length > 0) {
                    this.people.uploadPhoto(this.filesToUpload);
                }
                this.updateUserObject(response);
            }

        }
    }

    updateUserObject(person) {
        this.people.setSelectedPerson(person);
        sessionStorage.setItem('user', JSON.stringify(this.people.selectedPerson));
        this.savedPerson = this.people.selectedPerson;
    }

    changeFiles() {
        this.filesToUpload = this.filesToUpload ? this.filesToUpload : new Array();
        for (var i = 0; i < this.files.length; i++) {
            let addFile = true;
            this.filesToUpload.forEach(item => {
                if (item.name === this.files[i].name) addFile = false;
            })
            if (addFile) this.filesToUpload.push(this.files[i]);
            $("#myImg").attr("src", URL.createObjectURL(this.files[0]));
        }
    }

    removeFile(index) {
        this.filesToUpload.splice(index, 1);
    }

    cancel() {
        this.people.setSelectedPerson(this.userObj);
        this.errors = [];
    }

    canDeactivate() {
        if(this.utils.objectsEqual(this.savedPerson, this.people.selectedPerson).length){
           return confirm("You haven't saved your changes. Click cancel if you would like to save them?");
        }
        return true;
    }
}