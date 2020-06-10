import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import "resources/css/styles.css";
import {Config} from 'resources/data/config';
import { inject } from 'aurelia-dependency-injection';
import { Store } from 'aurelia-store';

@inject(Config, Store)
export class App {
  constructor(config, store) { this.config = config; this.store = store; }
  
  bind() {
    this.subscription = this.store.state.subscribe(
      (state) => this.state = state
    );
  }

  unbind() {
    this.subscription.unsubscribe();
  }

  async activate(){
    await this.config.getConfigArray();
    this.store.config = {};
    this.config.configArray.forEach(item => {
      this.store.config[item.parameter] = item.value;
    })
    this.configParameters();
  }

  configureRouter(config, router) {
    this.router = router;
    config.title = 'UCCSS';
    config.map([
      {
        route: ['','home'],
        moduleId: PLATFORM.moduleName('./modules/home/home'),
        name: 'Home',
        settings: { auth: false, roles: [] },
        title: 'UCCSS'
      },
    ]);
  }

  configParameters(){
    this.store.config.INSTITUTIONS_ACTIVE = '01';
    this.store.config.ACTIVE_PERSON = "01";
    this.store.config.INACTIVE_PERSON = "02";
  }
}
