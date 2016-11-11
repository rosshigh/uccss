
import * as moment from 'moment'
 
export class UtcFormatValueConverter {
  toView(value) {
    console.warn('to', value);
    return moment(value).format('YYYY-MM-DD HH:mm');
  }
  fromView(value) {
    console.warn('from', value);
    return moment(value,'YYYY-MM-DD HH:mm');
  }
}