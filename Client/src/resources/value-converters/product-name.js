/**
 * Created by Ross on 1/15/2016.
 */
export class ProductNameValueConverter {
  toView(value, array) {
    if(value === undefined || array === undefined) return "";
    for(var i = 0; i<array.length; i++){
      if(value === array[i]._id){
        return array[i].name;
      }
    }
    return "Unknown";
  }
}
