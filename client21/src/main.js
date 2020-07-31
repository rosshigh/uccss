// regenerator-runtime is to support async/await syntax in ESNext.
// If you target latest browsers (have native support), or don't use async/await, you can remove regenerator-runtime.
import 'regenerator-runtime/runtime';
import * as environment from '../config/environment.json';
import { PLATFORM } from 'aurelia-pal';
import "froala-editor/js/froala_editor.pkgd.min";

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .globalResources(PLATFORM.moduleName("aurelia-mask/dist/masked-input"))
    .plugin(PLATFORM.moduleName('au-table'))
    .plugin(PLATFORM.moduleName("aurelia-validation"))
    .plugin(PLATFORM.moduleName("aurelia-validatejs"))
    .plugin(PLATFORM.moduleName('aurelia-dialog'))
    .feature(PLATFORM.moduleName('resources/index'));

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');
  aurelia.use.plugin(PLATFORM.moduleName('aurelia-froala-editor'));

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  aurelia.start().then(() => {
    let userObj = sessionStorage.getItem('user');
    let root = userObj ? 'app' : 'home';
    aurelia.setRoot(PLATFORM.moduleName(root))
  });

  // aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
