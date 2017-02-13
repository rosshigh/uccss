import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";

@inject(Router)
export class Social{
    
    constructor(router){
        this.router = router;
    }

    canActivate(){
        this.userObj = JSON.parse(sessionStorage.getItem('user'));
        this.blogAuthor = this.userObj.roles.indexOf('BLOG') > -1;
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
            route: ['', 'blogs'],
            moduleId: './editBlogs',
            settings: { auth: false, roles: [] },
            nav: true,
            name: 'blogs',
            title: 'Blogs'
        },
        {
            route: 'forumus',
            moduleId: './editForums',
            settings: { auth: false, roles: [] },
            nav: true,
            name: 'forums',
            title: 'Forums'
        },
        {
            route: 'writeBlog',
            moduleId: './writeBlog',
            settings: { auth: false, roles: [] },
            nav: false,
            name: 'writeBlog',
            title: 'writeBlog'
        }
        ]);

        this.router = router;
    }

}