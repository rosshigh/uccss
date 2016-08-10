import moment from 'moment';

export class SortDateTimeValueConverter {
  toView(array, propertyName, sortProp, tech) {
    if(array === undefined) return;

    var sortOrder = sortProp === "ASC" ? 1 : -1;

    

    var sortArray = [];

    // for(i = 0; i < skip; i++){
    //   sortArray.push(array[i]);
    // }

    for(var i = 0; i < array.length; i++){
      if((!tech && array[i].confidential)) continue;
      sortArray.push(array[i]);
    }

    sortArray.sort((a,b) => {
      return this.sortByDateDescAndTimeAsc(a[propertyName], b[propertyName]) * sortOrder;
    });

    return sortArray;
  }

  sortByDateDescAndTimeAsc = function (lhs, rhs) {
    var results;

    results = moment(lhs).year() < moment(rhs).year() ? 1 : moment(lhs).year() > moment(rhs).year() ? -1 : 0;

    if (results === 0) results = moment(lhs).month() < moment(rhs).month()  ? 1 : moment(lhs).month() > moment(rhs).month()  ? -1 : 0;

    if (results === 0) results = moment(lhs).date() < moment(rhs).date() ? 1 : moment(lhs).date() > moment(rhs).date() ? -1 : 0;

    if (results === 0) results = moment(lhs).hours() > moment(rhs).hours() ? 1 : moment(lhs).hours() < moment(rhs).hours() ? -1 : 0;

    if (results === 0) results = moment(lhs).minutes() > moment(rhs).minutes() ? 1 : moment(lhs).minutes()  < moment(rhs).minutes()  ? -1 : 0;

    if (results === 0) results = moment(lhs).seconds() > moment(rhs).seconds() ? 1 : moment(lhs).seconds() < moment(rhs).seconds() ? -1 : 0;

    return results;
  }
}