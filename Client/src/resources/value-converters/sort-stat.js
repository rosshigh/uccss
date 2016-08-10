export class SortStatValueConverter {
  toView(value, array, index) {
    if(value && array && index >= 0){
        return value + " <span click.trigger='dataTable.sortArray(" + array[index].code + ")><i class='fa fa-sort'></i></span>"
        // return value[array[index].code];
    }
  }
}