import {bindable} from 'aurelia-framework';

export class TableNavBar {
    @bindable totalitems = 0;
    @bindable currentpage;
    @bindable totalpages;
    @bindable displaypages;
}