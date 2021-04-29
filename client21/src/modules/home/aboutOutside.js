import { inject } from 'aurelia-framework';
import { Router } from "aurelia-router";

@inject(Router)
export class AboutOutside {

    constructor(router) {
        this.router = router;
        this.pageTitle = 'About the UCC';

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
                route: ['', 'uccStaff'],
                moduleId: PLATFORM.moduleName('./uccStaffOutside'),
                settings: { auth: true, roles: [] },
                nav: true,
                name: 'uccStaff',
                title: "UCC Staff"
            },
            {
                route: 'products',
                moduleId: PLATFORM.moduleName('./productsOutside'),
                settings: { auth: true, roles: [] },
                nav: true,
                name: 'products',
                title: "UCC Products"
            },
            {
                route: 'customers',
                moduleId: PLATFORM.moduleName('./customersOutside'),
                settings: { auth: true, roles: [] },
                nav: true,
                name: 'customers',
                title: "UCC Customers"
            }
        ]);

        this.router = router;
    }
}