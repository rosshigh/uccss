export class CourseNameValueConverter {
  toView(value, array, sandboxID, sandboxName) {
    if(value && array){
      if(value === sandboxID) return sandboxName;
      for(var i = 0; i<array.length; i++){
        if(value === array[i]._id){
          return array[i].name;
        }
      }
    }
    return "";
  }

}