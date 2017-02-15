import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

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
                { route: ['','home'],       moduleId: './modules/home/home',                    name: 'Home', settings: { auth: false, roles: [] }},
                // { route: 'contact',         moduleId: './modules/home/contact',                 name: 'Contact' },
                { route: 'register',        moduleId: './modules/home/register',                name: 'Register',        settings: { auth: false, roles: [] }  },
                { route: 'user',            moduleId: './modules/user/user',                    name: 'User',           settings: { auth: true, roles: [] } },
                { route: 'profile',         moduleId: './modules/user/profile',                 name: 'Profile',         settings: { auth: true, roles: [] }  },
                { route: 'resetPassword/:id',   moduleId: './modules/user/resetPassword',            name: 'ResetPassword',  settings: { auth: false, roles: [] }  },
                { route: 'system',          moduleId: './modules/admin/system/system',          name: 'system',         settings: { auth: true, roles: [] }  },
                { route: 'customers',       moduleId: './modules/admin/customers/customers',    name: 'customers',      settings: { auth: true, roles: [] }  },
                { route: 'inventory',       moduleId: './modules/admin/inventory/editInventory',    name: 'inventory',      settings: { auth: true, roles: [] }  },
                { route: 'site',            moduleId: './modules/admin/site/site',              name: 'site',           settings: { auth: true, roles: [] } },
                { route: 'documents',       moduleId: './modules/admin/documents/documents',    name: 'documents',      settings: { auth: true, roles: [] } },
                { route: 'notes',           moduleId: './modules/admin/notes/notes',            name: 'notes',          settings: { auth: true, roles: [] } },
                { route: 'logout',          moduleId: './modules/home/logout',                  name: 'logout',        settings: { auth: true, roles: [] } },
                { route: 'facco',           moduleId: './modules/facco/facco',                  name: 'facco',          settings: { auth: true, roles: [] } },
                { route: 'support',         moduleId: './modules/user/support/support',         name: 'support',        settings: { auth: true, roles: [] } },
                { route: 'analytics',       moduleId: './modules/analytics/analytics',          name: 'analytics',     settings: { auth: true, roles: [] } },
                { route: 'clientRequests',  moduleId: './modules/user/requests/clientRequests', name: 'clientRequests', settings: { auth: true, roles: [] } },
                { route: 'techHt',          moduleId: './modules/tech/support/support',         name: 'techHt',         settings: { auth: true, roles: [] } },
                { route: 'techRq',          moduleId: './modules/tech/requests/assignments',    name: 'techRq',          settings: { auth: true, roles: [] } },
                { route: 'social',          moduleId: './modules/social/social',                name: 'social',          settings: { auth: true, roles: [] } },
                { route: 'htNote/:id',      moduleId: './modules/tech/support/support',         name: 'htNote',         settings: { auth: true, roles: [] } }
            ]);

            config.mapUnknownRoutes('home');
  
        }
        this.router.configure(appRouterConfig); 
    }
}

class AuthorizeStep {
  run(navigationInstruction, next) {
    if (navigationInstruction.getAllInstructions().some(i => i.config.settings.auth)) {
      var role = sessionStorage.getItem('role');
      if (!role) {
        return next.cancel(new Redirect('home'));
      }
    }
    return next();
  }
}