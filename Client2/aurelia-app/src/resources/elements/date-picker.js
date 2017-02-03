import {customElement, bindable, inject, bindingMode} from 'aurelia-framework';
import {datepicker} from 'eonasdan-bootstrap-datetimepicker';
import moment from 'moment';

@inject(Element)
export class DatePicker {

  @bindable value;
  @bindable startdate ="1/1/1900";
  @bindable enddate = "12/31/3000";
  @bindable controlid;
  @bindable format = "MM/DD/YYYY";
  @bindable changedate;
  @bindable disabled = false;

    constructor(element) {
        this.element = element;
    }

    valueChanged(newValue, oldValue){ 
      if(this.datePicker && newValue !== oldValue){
        if(newValue === ""){
          $("#input-" + this.controlid).val("");
        } else {
          this.datePicker.data("DateTimePicker").date(moment(newValue).format(this.format));
        }
        
      }
    }

    startdateChanged(newValue, oldValue) {
      if(this.datePicker){
            this.datePicker.data("DateTimePicker").minDate(moment(newValue).format(this.format));
      }
     }

    enddateChanged(newValue, oldValue) {
      if(this.datePicker){
            this.datePicker.data("DateTimePicker").maxDate(moment(newValue).format(this.format));
      }
     }

    attached(){
      var self = this;
  		this.datePicker = $("#" + this.controlid);
  		this.datePicker.datetimepicker({
  			daysOfWeekDisabled: [0, 6],
  			toolbarPlacement: "top",
  			showClose: true,
  			format: self.format
  		});

      this.datePicker.on("dp.change", function (e) {
        self.value = moment(e.date).format(self.format);
        var changeDateEvent = new CustomEvent('changedate', { detail: { event: e }, bubbles: true });
        self.element.dispatchEvent(changeDateEvent);
      });

      if(this.value) this.datePicker.data("DateTimePicker").date(moment(this.value).format(self.format));
  		if(this.startdate) this.datePicker.data("DateTimePicker").minDate(moment(this.startdate).format(self.format));
  		if(this.enddate) this.datePicker.data("DateTimePicker").maxDate(moment(this.enddate).format(self.format));

    }
}