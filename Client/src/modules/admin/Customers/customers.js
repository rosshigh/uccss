import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";

@inject(Router)
export class Customers{
    
    tabs = [{id: 'editPeople', label: 'People'},{id: 'editInstitutions', label: 'Institutions'}];
    tabPath = "modules/admin/customers/";
    
    constructor(router){
        this.router = router;
    }

    attached(){
        $(".nav a").on("click", function(){
            $(".nav").find(".active").removeClass("active");
            $(this).parent().addClass("active");
        });
    }
    
    configureRouter(config, router) {
        config.map([
        {
            route: ['', 'editPeople'],
            moduleId: './editPeople',
            settings: { auth: true, roles: [] },
            nav: true,
            name: 'editPeople',
            title: "People"
        },
        {
            route: 'editInstitutions',
            moduleId: './editInstitutions',
            settings: { auth: true, roles: [] },
            nav: true,
            name: 'editInstitutions',
            title: 'Institutions'
        },
        {
            route: 'bulkEmails',
            moduleId: './bulkEmails',
            settings: { auth: true, roles: [] },
            nav: true,
            name: 'bulkEmails',
            title: 'Bulk Emails'
        }
        ]);

        this.router = router;
    }
    
}