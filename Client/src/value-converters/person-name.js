export class PersonNameValueConverter {

  toView(id, array) {
    if(id === undefined || array === undefined) return "";
    for(var i = 0; i < array.length; i++){
      if(array[i]._id === id) return array[i].firstName + " " + array[i].lastName;
    }
    return ""
  }

}