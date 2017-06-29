export class SessionNameValueConverter {
  toView(value, array) {
    if(value === undefined || array === undefined) return;
    for(var i = 0; i < array.length; i++){
      if(value === array[i]._id){
        return  array[i].session + " " + array[i].year;
      }
    }
    return "Unknown";
  }

}
