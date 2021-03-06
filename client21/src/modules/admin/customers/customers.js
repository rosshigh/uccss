import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";

@inject(Router)
export class Customers {

    constructor(router){
        this.router = router;
        this.pageTitle = 'Customers';

        this.systemMessage = sessionStorage.getItem('systemMessage');
    }

    attached(){
        $("#systemMessage").fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500);
    }

    toggleTheSideBar(){
        this.sideBarShown = !this.sideBarShown;
        if(!this.sideBarShown){
            $('#sidebar').hide();
            $('.main-panel').css('width','100%');
        } else {
            $('#sidebar').show();
            $('.main-panel').css('width','');
        }
    }

    configureRouter(config, router) {
        config.map([
        {
            route: ['', 'editPeople'],
            moduleId: PLATFORM.moduleName('./editPeople'),
            settings: { auth: true, roles: [] },
            nav: true,
            name: 'editPeople',
            title: "People"
        },
        {
            route: 'editInstitutions',
            moduleId: PLATFORM.moduleName('./editInstitutions'),
            settings: { auth: true, roles: [] },
            nav: true,
            name: 'editInstitutions',
            title: 'Institutions'
        },
        {
            route: 'bulkEmails',
            moduleId: PLATFORM.moduleName('./bulkEmails'),
            settings: { auth: true, roles: [] },
            nav: true,
            name: 'bulkEmails',
            title: 'Bulk Emails'
        }
        ]);

        this.router = router;
    }
}