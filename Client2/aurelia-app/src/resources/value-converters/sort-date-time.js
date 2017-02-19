import moment from 'moment';

export class SortDateTimeValueConverter {
  toView(array, propertyName, sortProp, tech, trim) {
    if(array === undefined) return;

    var sortOrder = sortProp === "ASC" ? true : false;

    var sortArray = [];
    var firstItem;
    
    array.forEach((item, index) => {
      if( index === 0 ){
        firstItem = item;
      } else {
         if(tech || (!tech && !item.confidential)) sortArray.push(item);;
      }
    })

    sortArray.sort((a,b) => {
        return sortOrder ? moment(a[propertyName]).isAfter(b[propertyName]) : !moment(a[propertyName]).isAfter(b[propertyName]);
    });

    if(!trim) sortArray.unshift(firstItem);
    return sortArray;
  }

}