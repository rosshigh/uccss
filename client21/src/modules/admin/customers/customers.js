import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";
import{ Utils } from '../../../resources/utils/utils';

@inject(Router, Utils)
export class Customers {

    constructor(router, utils){
        this.router = router;
        this.utils = utils;

        this.utils.publishPageTitle('Customers')

        // this.systemMessage = sessionStorage.getItem('systemMessage');
    }

    attached(){
        $("#systemMessage").fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500);
        if(this.router.currentInstruction.fragment.length){
            $(".nav-link").removeClass('active');
            $("#" + this.router.currentInstruction.fragment).addClass('active');
        }
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

    navigate(el){
        $(".nav-link").removeClass('active');
        $(el.target).addClass('active');
        this.router.navigate(el.target.id)
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