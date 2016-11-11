/**
 * Created by Ross on 2/9/2016.
 */
export class LookupSidValueConverter {
  toView(value, array) {
    if(value && array){
      for(var i = 0; i<array.length; i++){
        if(value === array[i]._id){
          return array[i].sid;
        }
      }
    }
    return "";
  }

}
