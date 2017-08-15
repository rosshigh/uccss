import moment from 'moment';

export class SortDateTimeValueConverter {
  toView(array, propertyName, sortProp, tech, trim) {
    if(array === undefined) return;
    
    var sortOrder = sortProp === "ASC" ? 1 : -1;

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
        var sort = moment(a[propertyName]).isAfter(b[propertyName]) ? 1 : -1;
        return sort * sortOrder; 
    });

    if(!trim) sortArray.unshift(firstItem);
    return sortArray;
  }

}