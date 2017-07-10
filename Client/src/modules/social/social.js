import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";
import {AppConfig} from '../../config/appConfig';

@inject(Router, AppConfig)
export class Social{

    title="Social";
    
    constructor(router, config){
        this.router = router;
        this.config = config;

        this.userObj = JSON.parse(sessionStorage.getItem('user'));
        this.blogAuthor = this.userObj.roles.indexOf('BLOG') > -1;
        this.uccStaff = this.userObj.roles.indexOf('BLOG') > -1;
    }

    attached(){
        $(".nav a").on("click", function(){
            $(".nav").find(".active").removeClass("active");
            $(this).parent().addClass("active");
        });
    }

    activate(){
         this.config.getConfig(true);
    }
    
    configureRouter(config, router) {
        config.map([
        {
            route: ['', 'blogs'],
            moduleId: './viewBlogs',
            settings: { auth: false, roles: [] },
            nav: true,
            name: 'blogs',
            title: 'Blogs'
        },
        {
            route: 'forums',
            moduleId: './viewForums',
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
            title: 'Write Blog'
        },
        {
            route: 'editBlog',
            moduleId: './editBlog',
            settings: { auth: false, roles: [] },
            nav: false,
            name: 'editBlog',
            title: 'Edit Blog'
        }
        ]);

        this.router = router;
    }

}