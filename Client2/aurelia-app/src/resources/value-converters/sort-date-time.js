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
      return (new Date(a[propertyName]).getTime() - new Date( b[propertyName]).getTime()) * sortOrder;
    });

    if(!trim) sortArray.unshift(firstItem);
    return sortArray;
  }

}