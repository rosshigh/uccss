import {inject, bindable} from 'aurelia-framework';

export class TableNavigationBar {

  @bindable
  columnspan;
  
  @bindable
  dataTable;

  @bindable
  pagebuttons;
}
