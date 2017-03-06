import {customElement, bindable, inject, bindingMode} from 'aurelia-framework';
import {datepicker} from 'eonasdan-bootstrap-datetimepicker';

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
          this.datePicker.data("DateTimePicker").date(new Date(newValue).toLocaleDateString());
        }
        
      }
    }

    startdateChanged(newValue, oldValue) {
      if(this.datePicker){
        this.datePicker.data("DateTimePicker").minDate(new Date(newValue).toLocaleDateString());
      }
     }

    enddateChanged(newValue, oldValue) {
      if(this.datePicker){
        this.datePicker.data("DateTimePicker").maxDate(new Date(newValue).toLocaleDateString());
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
        self.value = e.date.toISOString()
      });
    }
}