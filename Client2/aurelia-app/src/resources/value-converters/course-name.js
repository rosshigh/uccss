export class CourseNameValueConverter {
  toView(value, array) {
    if(value && array){
      if(value === 'a1a1a1a1a1a1a1a1a1a1a1a1') return "Sandbox";
      for(var i = 0; i<array.length; i++){
        if(value === array[i]._id){
          return array[i].name;
        }
      }
    }
    return "";
  }

}