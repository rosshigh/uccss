import {inject, customAttribute} from 'aurelia-framework';

@customAttribute('masked')
@inject(Element)
export class Masked {  
  constructor(element) {
    this.element = element;
  }

  attached() {
    $(this.element).masked()
      .on('change', e => fireEvent(e.target, 'input'));

  }

  detached() {
    $(this.element).masked('destroy')
      .off('change');
  }
}

function createEvent(name) {  
  var event = document.createEvent('Event');
  event.initEvent(name, true, true);
  return event;
}

function fireEvent(element, name) {  
  var event = createEvent(name);
  element.dispatchEvent(event);
}