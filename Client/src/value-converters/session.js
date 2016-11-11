export class SessionValueConverter {
  toView(value, array) {
    var openSessions = [];
    if(value === undefined || array === undefined) return;
    for(var i = 0; i<array.length; i++){
      if(value === array[i]._id && array[i].status !== 'Next'){
        return  array[i].session + " " + array[i].year;
      }
    }
    return "Unknown";
  }

}
