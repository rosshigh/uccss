import {inject, bindable} from 'aurelia-framework';

export class SubMenu{

  @bindable
  title;

  @bindable
  menuitems; 

  @bindable
  config;

  bind(){
	  console.log(this.title);
  }

}