export class InfoFilterValueConverter {
  toView(array, value, length) {
    if(value && array){
      return array.filter((item) => {
          return item.itemType == value;
      })
    }
    return length ? array.length > 0 : array;
  }

}
