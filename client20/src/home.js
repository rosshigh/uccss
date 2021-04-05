export class Home {

    configureRouter(config, router) {
        this.router = router;
        config.title = 'UCCSS';
        config.map([
            {
                route: ['', 'landing'],
                moduleId: PLATFORM.moduleName('./modules/home/landing'),
                name: 'Landing',
                settings: { auth: false, roles: [] }
            }
        ]);
    }
}