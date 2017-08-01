import {inject} from 'aurelia-framework';
import {DataServices} from './dataServices';
import {Utils} from '../utils/utils';

@inject(DataServices, Utils)
export class Events {

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
                    if(Object.prototype.toString.call(serverResponse) == '[object Array]'){
                        this.eventArray = serverResponse;
                    } else {
                        this.eventArray = new Array();;                        
                    }
                } else {
                    this.data.processError(serverResponse);
                }
            } catch (error) {
                console.log(error);
            }
        }
	}

	selectEvent(index) {
        if (index === undefined) {
            this.selectedEvent = this.emptyEvent();
        } else {
			this.selectedEvent = this.utils.copyObject(this.eventArray[index]);
			this.editIndex = index;
        }
    }
    
    selectEventById(eventId){
        if(eventId == undefined) {
            this.selectedEvent = this.emptyEvent();
        } else {
            for(var i = 0; i < this.eventArray.length; i++){
                if(this.eventArray[i]._id === eventId) {
                    this.selectedEvent = this.utils.copyObject(this.eventArray[i]);
                    return;
                }
            }
        }
         this.selectedEvent = this.emptyEvent();
    }
	
	emptyEvent(){
		var obj = new Object();
		obj.title = "";
        obj.eventType = "";
        obj.allDay = false
        obj.notes = "";
		return obj;
	}

	async saveEvent() {
       if (!this.selectedEvent._id) {
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