// import moment from 'moment';

export class DateFormatValueConverter {

  toView(value, format ="dddd, MMMM Do YYYY, h:mm:ss a", fromNow) {
    if(value === undefined || value === null){
      return;
    }

    if(fromNow) {
      var formattedDate = moment(value).calendar();
    } else {
      var formattedDate = moment(value).format(format);
    }
    return formattedDate === "Invalid date" ? "" : formattedDate;
  }
}
