/**
 * Created by Ross on 2/11/2016.
 */
export class LookupValueValueConverter {
  toView(value, array, key, property) {
    if(value && array && property && key){
      for(var i = 0; i<array.length; i++){
        if(value === array[i][key]){
          return array[i][property];
        }
      }
    }
    return "";
  }

}
