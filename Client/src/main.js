import environment from './environment';
import regeneratorRuntime from 'regenerator-runtime';

window.regeneratorRuntime = regeneratorRuntime;

//Configure Bluebird Promises.
Promise.config({
  longStackTraces: environment.debug,
  warnings: {
    wForgottenReturn: false
  }
});

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .globalResources("aurelia-mask")
    .plugin("aurelia-dialog")
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