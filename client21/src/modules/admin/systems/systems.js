import { inject } from 'aurelia-framework';
import {Router} from "aurelia-router";

@inject(Router)
export class EditSystem{
    
    constructor(router){
        this.router = router;
        this.pageTitle = 'System Administration';

        this.systemMessage = sessionStorage.getItem('systemMessage');
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
            route: ['', 'editSessions'],
            moduleId: PLATFORM.moduleName('./editSessions'),
            settings: { auth: true, roles: [] },
            nav: true,
            name: 'editSessions',
            title: 'Sessions'
        },
        {
            route: 'editSystems',
            moduleId: PLATFORM.moduleName('./editSystems'),
            settings: { auth: true, roles: [] },
            nav: true,
            name: 'editSystems',
            title: 'Systems'
        },
        {
            route: 'editProducts',
            moduleId: PLATFORM.moduleName('./editProducts'),
            settings: { auth: true, roles: [] },
            nav: true,
            name: 'editProduct',
            title: 'Products'
        }
        ]);

        this.router = router;
    }
}