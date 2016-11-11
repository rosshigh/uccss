import {customElement, bindable, inject, bindingMode} from 'aurelia-framework';
import {datepicker} from 'bootstrap-datepicker';
import moment from 'moment';

@inject(Element)
export class DatePicker {

  @bindable value = '';
  @bindable startdate;
  @bindable enddate;

    constructor(element) {
        this.element = element;
        this.pickerDate = '';
        this.datePicker = $(this.element);
    }

    valueChanged(newValue, oldValue){
         this.datePicker.datepicker('setDate', newValue);
    }

    startdateChanged(newValue, oldValue) { 
        this.datePicker.datepicker('setStartDate', newValue);
     }

    enddateChanged(newValue, oldValue) { 
        this.datePicker.datepicker('setEndDate', newValue);
     }

    bind(){
       this.datePicker.datepicker({ 
            autoclose: true,
            format: 'mm/dd/yyyy',
            daysOfWeekDisabled: "0,6"
        }).on('changeDate', (ev) => {
            this.value = ev.date;
        });

        this.datePicker.datepicker('setDate', this.value);
        this.datePicker.datepicker('setStartDate',this.startdate);
        this.datePicker.datepicker('setEndDate', this.enddate);
    }

}
