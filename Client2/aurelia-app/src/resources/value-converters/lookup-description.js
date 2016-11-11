/**
 * Created by Ross on 12/4/2015.
 */
export class LookupDescriptionValueConverter {
  toView(value, array, property) {
    property = property || 'code';
    if(value && array){
      for(var i = 0; i<array.length; i++){
        if(parseInt(value) === parseInt(array[i][property])){
          return array[i].description;
        }
      }
    }
    return "";
  }

}
