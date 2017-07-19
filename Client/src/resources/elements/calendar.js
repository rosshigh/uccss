import {
  inject, noView, bindable, bindingMode,
  customElement, BindingEngine, inlineView
} from 'aurelia-framework';

import 'jquery';
import moment from  'moment';
import {fullCalendar} from 'fullcalendar';

@customElement('calendar')
@inlineView('<template><require from="../css/fullcalendar.css"></require></template>')
@inject(Element, BindingEngine)
export class calendar {
  @bindable weekends = true;
  @bindable dayClick;
  @bindable eventClick;
  @bindable events = [];
  @bindable options;
  @bindable view;

  subscription = null;

  constructor(element, bindingEngine) {
    this.element = element;
    this.bindingEngine = bindingEngine;

    this.subscription = this.bindingEngine.collectionObserver(this.events).subscribe( (splices) => {this.eventListChanged(splices)});
  }

  eventListChanged(splices) {
    if(this.calendar)
      this.calendar.fullCalendar( 'refetchEvents');
  }

  eventsChanged(newValue) {
    if(this.subscription !== null) {
      this.subscription.dispose();
    }
    this.subscription = this.bindingEngine.collectionObserver(this.events).subscribe( (splices) => {this.eventListChanged(splices)});

    if(this.calendar)
      this.calendar.fullCalendar( 'refetchEvents');
  }

  attached() {
    this.calendar = $(this.element);
    let eventSource = (start, end, timezone, callback) => {
      callback(this.events);
    }

    let defaultValues = {
      defaultView: this.view || 'month',
      weekends: this.weekends,
      firstDay: 1,
      dayClick: (date, jsEvent, view) => this.dayClick(date, jsEvent, view),
      eventClick: (event) => this.eventClick(event),
      events: eventSource
    }

    this.calendar.fullCalendar(Object.assign(defaultValues, this.options));
  }

}
