import {inject} from 'aurelia-framework';
import {Auth} from '../../resources/data/auth';

@inject(Auth)
export class Logout {

  constructor(auth) {
    this.auth = auth;
  };

  activate() {
    this.auth.logout(); 
    this.router.navigate("home");
  };
}