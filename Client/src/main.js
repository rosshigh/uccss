import environment from './environment';
import regeneratorRuntime from 'regenerator-runtime';

window.regeneratorRuntime = regeneratorRuntime;

//Configure Bluebird Promises.
Promise.config({
  longStackTraces: false,
  warnings: {
    wForgottenReturn: false
  }
});

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .globalResources("aurelia-mask")
    .plugin("aurelia-dialog")
    .plugin("aurelia-chart")
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
    // .plugin('aurelia-google-maps', config => {
    //         config.options({
    //             apiKey: 'AIzaSyAd2fTo7o6KOjL28VN8X1wqy-wRNxsxADA', // use `false` to disable the key
    //             options: { panControl: true, panControlOptions: { position: 9 } }, //add google.maps.MapOptions on construct (https://developers.google.com/maps/documentation/javascript/3.exp/reference#MapOptions)
    //             language:'' | 'en', // default: uses browser configuration (recommended). Set this parameter to set another language (https://developers.google.com/maps/documentation/javascript/localization)
    //             region: '' | 'US' // default: it applies a default bias for application behavior towards the United States. (https://developers.google.com/maps/documentation/javascript/localization)
    //         });
    // })
    .feature('resources');

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  aurelia.start().then(() => aurelia.setRoot());
}
