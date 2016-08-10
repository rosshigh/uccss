export class RequestNumberValueConverter {
  toView(value, array) {
    if(value && array){
      for(var i = 0; i<array.length; i++){
        if(value === array[i]._id){
          return array[i].requestNo;
        }
      }
    }
    return "";
  }

}