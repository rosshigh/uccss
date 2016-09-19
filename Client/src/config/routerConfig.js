import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

import {AuthorizeStep} from 'aurelia-auth';

@inject(Router)
export default class {

    constructor(router) {
        this.router = router;
    };

    configure() {
        var appRouterConfig = function(config) {
            config.addPipelineStep('authorize', AuthorizeStep);
            config.title = 'UCCSS';
            config.map([
                { route: ['','home'],       moduleId: './modules/home/home',                    name: 'Home'},
                { route: 'contact',         moduleId: './modules/home/contact',                 name: 'Contact' },
                { route: 'register',        moduleId: './modules/home/register',                name: 'Register' },
                { route: 'user',            moduleId: './modules/user/user',                    name: 'User',           auth: true },
                { route: 'profile',         moduleId: './modules/user/profile',                 name: 'Profile',        auth: true },
                { route: 'system',          moduleId: './modules/admin/system/system',          name: 'system',         auth: true },
                { route: 'customers',       moduleId: './modules/admin/customers/customers',    name: 'customers',      auth: true },
                { route: 'site',            moduleId: './modules/admin/site/site',              name: 'site',           auth: true },
                { route: 'documents',       moduleId: './modules/admin/documents/documents',    name: 'documents',      auth: true },
                { route: 'logout',          moduleId: './modules/home/logout',                  name: 'logout',         auth: true },
                { route: 'facco',           moduleId: './modules/facco/facco',                  name: 'facco',          auth: true },
                { route: 'support',         moduleId: './modules/user/support/support',         name: 'support',        auth: true },
                { route: 'analytics',       moduleId: './modules/analytics/analytics',          name: 'analytics',      auth: true },
                { route: 'clientRequests',  moduleId: './modules/user/requests/clientRequests', name: 'clientRequests', auth: true },
                { route: 'techHt',          moduleId: './modules/tech/support/support',         name: 'techHt',         auth: true },
                { route: 'techRq',          moduleId: './modules/tech/requests/assignments',    name: 'techRq',         auth: true }
            ]);

            config.mapUnknownRoutes('home');
  
        }
        this.router.configure(appRouterConfig);
    }
}