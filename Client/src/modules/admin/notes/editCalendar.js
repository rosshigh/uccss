import {inject} from 'aurelia-framework';
import { CommonDialogs } from '../../../resources/dialogs/common-dialogs';

@inject(CommonDialogs)
export class EditCalendar {
  events = [];

  constructor(dialog) {
    this.dialog = dialog;
  }

  eventDialog(start){
    var event = {eventTitle: "", eventStart: start, eventEnd: start};
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

  saveEvent(event)
  {
    console.log(event);
  }

}