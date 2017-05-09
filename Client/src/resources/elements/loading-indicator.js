import * as nprogress from 'nprogress';
import {bindable, noView} from 'aurelia-framework';

@noView(['nprogress/nprogress.css'])
export class LoadingIndicator {
  @bindable loading = false;
  @bindable progress = 0;

  loadingChanged(newValue){
    newValue ? nprogress.start() : nprogress.done();
    // if(newValue){
    //   nprogress.start();
    // }else{
    //   nprogress.done();
    // }
  }

  progressChanged(newValue){
    nprogress.set(newValue)
  }
}