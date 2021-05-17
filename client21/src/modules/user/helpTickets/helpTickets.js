import { inject } from 'aurelia-framework';
import { Router } from "aurelia-router";
import { Utils } from '../../../resources/utils/utils';

@inject(Router, Utils)
export class UserHelpTickets {

    constructor(router, utils) {
        this.router = router;
        this.utils = utils;

        this.utils.publishPageTitle('Help Tickets')

        // this.systemMessage = sessionStorage.getItem('systemMessage');
    }

    attached() {
        $("#systemMessage").fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500);
        if(this.router.currentInstruction.fragment.length){
            $(".nav-link").removeClass('active');
            $("#" + this.router.currentInstruction.fragment).addClass('active');
        }
    }

    navigate(el) {
        $(".nav-link").removeClass('active');
        $(el.target).addClass('active');
        this.router.navigate(el.target.id)
    }

    configureRouter(config, router) {
        config.map([
            {
                route: ['', 'viewHelpTickets'],
                moduleId: PLATFORM.moduleName('./viewHelpTickets'),
                settings: { auth: true, roles: [] },
                nav: true,
                name: 'viewHelpTickets',
                title: "View Help Tickets"
            },
            {
                route: 'createHelpTicket',
                moduleId: PLATFORM.moduleName('./createHelpTicket'),
                settings: { auth: true, roles: [] },
                nav: true,
                name: 'createHelpTicket',
                title: 'Create Help Ticket'
            }
        ]);

        this.router = router;
    }
}