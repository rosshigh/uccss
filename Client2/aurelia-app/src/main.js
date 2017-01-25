import environment from './environment';
import regeneratorRuntime from 'regenerator-runtime'; 

window.regeneratorRuntime = regeneratorRuntime;

//Configure Bluebird Promises.
//Note: You may want to use environment-specific configuration.
Promise.config({
  warnings: {
    wForgottenReturn: false
  }
});

//  var CKEDITOR_BASEPATH = 'src/resources/editor/';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .plugin("aurelia-dialog")
    .globalResources("aurelia-mask")
    .plugin('aurelia-notification', config => {
      config.configure({
        translate: false,  // 'true' needs aurelia-i18n to be configured
        notifications: {
          'success': 'humane-libnotify-success',
          'error': 'humane-libnotify-error',
          'info': 'humane-libnotify-info'
        }
      });
    })
    .feature('resources');

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  aurelia.start().then(() => aurelia.setRoot());
}
