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
    this.eventLayer = events;
    this.utils = utils;

    this.userObj = JSON.parse(sessionStorage.getItem('user'));
  }

  async activate(){
    await this.eventLayer.getEventsArray('', true);
    this.eventLayer.eventArray.forEach(item => {
      if(item.personId === this.userObj._id || item.scope === 'u') this.events.push(item);
    })
  }

  eventClicked(start){
    this.fireEvent(this.element, 'eventClicked', { date: start });
  }

  selectEvent(event){
    if(event.detail.value){
      this.eventLayer.selectEventById(event.detail.value.date._id);
    }
  }

  dayClicked(start){
    let startIndex = start._d.toString().indexOf('GMT-0') + 5;
    let hours = parseInt(start._d.toString().substring(startIndex, startIndex+1));
    start = moment(start).add(5, 'hours');
    this.fireEvent(this.element, 'dayClicked', { date: start });
  }

  eventDialog(evt){
    var event = {eventTitle: "", eventStart: evt.detail.value.date, allDay: false, scope: false, eventEnd: evt.detail.value.date, notes: ""};
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
    this.eventLayer.selectEvent();
    this.eventLayer.selectedEvent.start = event.event.eventStart
    this.eventLayer.selectedEvent.end = event.event.eventEnd
    this.eventLayer.selectedEvent.title = event.event.eventTitle;
    this.eventLayer.selectedEvent.personId = this.userObj._id;
    this.eventLayer.selectedEvent.notes = event.event.notes;
    this.eventLayer.selectedEvent.scope = event.event.scope ? "u" : "p";
    let response = await this.eventLayer.saveEvent();
    if(!response.error){
      this.events.push(this.eventLayer.selectedEvent)
    } else {
      this.utils.showNotification("There was a problem saving the event");
    }

  }

  async delete(){
    let response = await this.eventLayer.deleteEvent()
    if(!response.error){
      this.events.splice(this.eventLayer.editIndex,1);
      this.eventLayer.selectEvent();
    }
  }

}