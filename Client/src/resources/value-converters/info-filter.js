export class InfoFilterValueConverter {
  toView(array, value) {
    if(value && array){
      return array.filter((item) => {
          return item.itemType == value;
      })
    }
    return array;
  }

}
