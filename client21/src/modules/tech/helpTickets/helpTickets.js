import { inject } from 'aurelia-framework';
import { Router } from "aurelia-router";

@inject(Router)
export class TechHelpTickets {

    constructor(router) {
        this.router = router;
        this.pageTitle = 'Help Tickets';

        this.systemMessage = sessionStorage.getItem('systemMessage');

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
            },
            {
                route: 'archive',
                moduleId: PLATFORM.moduleName('./archive'),
                settings: { auth: true, roles: [] },
                nav: true,
                name: 'archive',
                title: 'Help Ticket Archive'
            }
        ]);

        this.router = router;
    }
}