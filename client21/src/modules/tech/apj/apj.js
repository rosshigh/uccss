import { inject } from 'aurelia-framework';
import { Router } from "aurelia-router";
import { Utils } from '../../../resources/utils/utils';

@inject(Router, Utils)
export class APJ {

    constructor(router, utils) {
        this.router = router;
        this.utils = utils;

        this.utils.publishPageTitle('APJ')
        
        this.sideBarShown = true;

        // this.systemMessage = sessionStorage.getItem('systemMessage');
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
                route: ['', 'apjInstitutions'],
                moduleId: PLATFORM.moduleName('./institutions'),
                settings: { auth: true, roles: [] },
                nav: true,
                name: 'institutions',
                title: "Institutions"
            },
            // {
            //     route: 'createRequest',
            //     moduleId: PLATFORM.moduleName('./createRequest'),
            //     settings: { auth: true, roles: [] },
            //     nav: true,
            //     name: 'createRequest',
            //     title: 'Create Request'
            // }
            // ,
            {
                route: 'assignments',
                moduleId: PLATFORM.moduleName('./assignments'),
                settings: { auth: true, roles: [] },
                nav: true,
                name: 'assignments',
                title: 'Assignments'
            }
        ]);

        this.router = router;
    }
}