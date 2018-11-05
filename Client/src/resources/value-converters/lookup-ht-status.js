export class LookupHTStatusValueConverter {
    toView(value, array) {
      if(value && array){
        if(value > 6){
            value = parseInt(value/10);
        }
        for(var i = 0; i<array.length; i++){
          if(value == array[i].code){
            return array[i].description;
          }
        }
      }
      return "";
    }
  }
  