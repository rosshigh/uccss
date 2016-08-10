import {inject} from 'aurelia-framework';
import {AuthService} from 'aurelia-auth';
import {AppState} from '../../resources/data/appState';

// Using Aurelia's dependency injection, we inject the AuthService
// with the @inject decorator
@inject(AuthService, AppState)

export class Logout {

  constructor(authService, app) {
    this.authService = authService;
    this.app = app;
  };

  activate() {
    // When we get to the logout route, the logout
    // method on the auth service will be called
    // and we will be redirected to the login view
    this.authService.logout("/#")
      .then(response => {
        this.app.logout();
        localStorage.removeItem("user");
        console.log("Logged Out");
      })
      .catch(err => {
        console.log("Error Logging Out");
      });

  };
}