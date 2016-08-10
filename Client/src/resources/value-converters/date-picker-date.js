import moment from 'moment';

export class DatePickerDateValueConverter {
  
  toView(value, format, fromNow) {
    if(value === undefined || value === null){
      return;
    }
    
   return  moment(value).format("YYYY-MM-DD");
  }

}
