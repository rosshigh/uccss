import {
  inject,
  bindable,
  bindingMode
} from 'aurelia-framework';

// http://stackoverflow.com/a/995193/725866
function isNavigationOrSelectionKey(e) {
  // Allow: backspace, delete, tab, escape, enter and .
  if ([46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
    // Allow: Ctrl+A/X/C/V, Command+A/X/C/V
    ([65, 67, 86, 88].indexOf(e.keyCode) !== -1 && (e.ctrlKey === true || e.metaKey === true)) ||
    // Allow: home, end, left, right, down, up
    (e.keyCode >= 35 && e.keyCode <= 40)) {
     // let it happen, don't do anything
     return true;
  }
  return false;
}

// http://stackoverflow.com/a/995193/725866
function keydown (e) {
  if (isNavigationOrSelectionKey(e)) {
    return;
  }
  // Ensure that it is a number and stop the keypress
  if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
    e.preventDefault();
  }
}

@inject(Element)
export class NumericInput {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
  @bindable placeholder = '';
  @bindable maxlength = 0;
  @bindable classes = "";
  
  constructor(element) {
    this.element = element;
	
  }

  attached() {
    this.element.addEventListener('keydown', keydown);
  }

  detached() {
    this.element.removeEventListener('keydown', keydown);
  }
}