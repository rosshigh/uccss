import {inject} from 'aurelia-framework';
import {DataServices} from './dataServices';
import {Utils} from '../utils/utils';

@inject(DataServices, Utils)
export class People {

    EVENTS_SERVICE = 'events';

    constructor(data, utils) {
        this.data = data;
        this.utils = utils;
    }

    async getEventsArray(options, refresh) {
        if (!this.eventArray || refresh) {
            var url = this.EVENTS_SERVICE;
            url += options ? options : "";
            try {
                let serverResponse = await this.data.get(url);
                if (!serverResponse.error) {
                    this.eventArray = serverResponse;
                } else {
                    this.data.processError(serverResponse);
                }
            } catch (error) {
                console.log(error);
            }
        }
	}

	selectEvent(index, array) {
        if (index === undefined) {
            this.selectedEvent = this.emptyEvent();
        } else {
			this.selectedEvent = this.utils.copyObject(this.eventArray[index]);
			this.editIndex = index;
        }
	}
	
	emptyEvent(){
		var obj = new Object();
		eventTitle = "";
		eventType = "";
		return obj;
	}

	async saveEvent() {
       if (!this.selectedPerson._id) {
			let response = await this.data.saveObject(this.selectedEvent, this.EVENTS_SERVICE, "post")
				if (!response.error) {
					if(this.eventArray){
						this.eventArray.push(response);;
					}
				} else {
					this.data.processError(response, "There was an error creating the event.");
				}
				return response;
		} else {
			let response = await this.data.saveObject(this.selectedEvent, this.EVENTS_SERVICE, "put")
				if (!response.error) {
					if(this.eventArray){
						this.eventArray[this.editIndex] = this.utils.copyObject(this.selectedEvent, this.eventArray[this.editIndex]);
					}
				}
				return response;
		}
   }

    async deleteEvent(){
        if(this.selectedEvent._id){
            let serverResponse = await this.data.deleteObject(this.EVENTS_SERVICE + '/' + this.selectedEvent._id);
            if (!serverResponse.error) {
                this.eventArray.splice(this.editIndex, 1);
                this.editIndex = - 1;
            }
            return serverResponse;
        }
        return null;
    }
}