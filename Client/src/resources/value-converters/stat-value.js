export class StatValueValueConverter {
  toView(value, array, index) {
    if(value && array && index >= 0){
        return value[array[index].code];
    }
  }
}