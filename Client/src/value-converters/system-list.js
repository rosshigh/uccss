export class SystemListValueConverter {
  toView(array) {
    if(array !== undefined && array.length > 0){
      var list = "";
      for(var i = 0; i<array.length; i++){
        list += array[i].sid + " "
      }
      return list;
    }
    return "";
  }
}
