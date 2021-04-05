import * as environment from '../config/environment.json';
import 'regenerator-runtime/runtime';
import {PLATFORM} from 'aurelia-pal';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .globalResources(PLATFORM.moduleName("aurelia-mask/dist/masked-input"))
    .plugin(PLATFORM.moduleName('au-table'))
    .plugin(PLATFORM.moduleName("aurelia-validation"))
    .plugin(PLATFORM.moduleName("aurelia-validatejs"))
    .feature(PLATFORM.moduleName('resources/index'));

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  // aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
  aurelia.start().then(() => {
    let userObj = sessionStorage.getItem('user');
    let root = userObj ? PLATFORM.moduleName('app') : PLATFORM.moduleName('home');
    aurelia.setRoot(PLATFORM.moduleName(root))
  });
}
