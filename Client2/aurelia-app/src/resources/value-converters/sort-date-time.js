import moment from 'moment';

export class SortDateTimeValueConverter {
  toView(array, propertyName, sortProp, tech) {
    if(array === undefined) return;

    var sortOrder = sortProp === "ASC" ? 1 : -1;

    var sortArray = [];

    for(var i = 0; i < array.length; i++){
      if(!tech && array[i].confidential) continue;
      sortArray.push(array[i]);
    }

    sortArray.sort((a,b) => {
      // return this.sortByDateDescAndTimeAsc(a[propertyName], b[propertyName]) * sortOrder;
      return (new Date(a[propertyName]).getTime() - new Date( b[propertyName]).getTime()) * sortOrder;
    });

    return sortArray;
  }

}