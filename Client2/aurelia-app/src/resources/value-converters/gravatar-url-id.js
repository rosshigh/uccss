export class GravatarUrlIdValueConverter {
  toView(id, array, size, alt) {
    var email = "";
    if(id !== undefined && array !== undefined){
      for(var i = 0; i<array.length; i++){
        if(id === array[i]._id) {
          email = array[i].email;
          break;
        }
      }
      var size = size || 80;
      return '<img src="https://secure.gravatar.com/avatar/' + CryptoJS.MD5(email.toLowerCase()) + '.jpg?s=' + size + '"/>';
    } else {
      switch(alt){
        case 1:
        case 6:
          return "<i class='fa fa-file-text'></i>"
      }
    }

  }
}
