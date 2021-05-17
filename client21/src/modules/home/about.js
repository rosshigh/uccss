import { inject } from 'aurelia-framework';
import { Router } from "aurelia-router";
import { Utils } from '../../resources/utils/utils';

@inject(Router, Utils)
export class About {

    constructor(router, utils) {
        this.router = router;
        this.utils = utils;

        this.utils.publishPageTitle('About the UCC')

        // this.systemMessage = sessionStorage.getItem('systemMessage');

    }

    attached(){
        $("#systemMessage").fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500);
        if(this.router.currentInstruction.fragment.length){
            $(".nav-link").removeClass('active');
            $("#" + this.router.currentInstruction.fragment).addClass('active');
        }
    }

    navigate(el){
        $(".nav-link").removeClass('active');
        $(el.target).addClass('active');
        this.router.navigate(el.target.id)
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
                moduleId: PLATFORM.moduleName('./uccStaff'),
                settings: { auth: true, roles: [] },
                nav: true,
                name: 'uccStaff',
                title: "UCC Staff"
            },
            {
                route: 'products',
                moduleId: PLATFORM.moduleName('./products'),
                settings: { auth: true, roles: [] },
                nav: true,
                name: 'products',
                title: "UCC Products"
            },
            {
                route: 'customers',
                moduleId: PLATFORM.moduleName('./customers'),
                settings: { auth: true, roles: [] },
                nav: true,
                name: 'customers',
                title: "UCC Customers"
            }
        ]);

        this.router = router;
    }
}