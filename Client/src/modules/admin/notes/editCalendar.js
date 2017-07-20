import {inject} from 'aurelia-framework';
import { CommonDialogs } from '../../../resources/dialogs/common-dialogs';
import { Events } from '../../../resources/data/events';
import { Utils } from '../../../resources/utils/utils';
import moment from 'moment';

@inject(CommonDialogs, Events, Utils)
export class EditCalendar {
  events = [];

  constructor(dialog, events, utils) {
    this.dialog = dialog;
    this.event = events;
    this.utils = utils;

    this.userObj = JSON.parse(sessionStorage.getItem('user'));
  }

  async activate(){
    await this.event.getEventsArray('?filter=eventActive|eq|true', true);
    this.event.eventArray.forEach(item => {
      item.start = moment(new Date(item.start));
      item.end =  moment(new Date(item.end));
      this.events.push(item);
    })
  }

  eventClicked(start){
    console.log(start);
  }

  dayClicked(start){
   this.fireEvent(this.element, 'dayClicked', { date: start });
  }

  eventDialog(evt){
    var event = {eventTitle: "", eventStart: evt.detail.value.date, allDay: false, eventEnd: evt.detail.value.date};
    return this.dialog.showEvent(
          "Enter Event",
          event,
          ['Submit', 'Cancel']
      ).whenClosed(response => {
          if (!response.wasCancelled) {
              this.saveEvent(response.output);
          } else {
              console.log("Cancelled");
          }
      });
  }

  async saveEvent(event)
  {
    console.log(event);
    this.event.selectEvent();
    this.event.selectedEvent.start =moment(event.event.eventStart).format('YYYY-MM-DD, h:mm:ss a');
    this.event.selectedEvent.end = moment(event.event.eventEnd).format('YYYY-MM-DD, h:mm:ss a');
    this.event.selectedEvent.title = event.event.eventTitle;
    this.event.selectedEvent.personId = this.userObj._id;
    console.log(this.event.selectedEvent)
    let response = await this.event.saveEvent();
    if(!response.error){
       response.start = moment(new Date(this.event.selectedEvent.start));
      response.end =  moment(new Date(this.event.selectedEvent.end));
      this.events.push(this.event.selectedEvent)
    } else {
      this.utils.showNotification("There was a problem saving the event");
    }

  }

}