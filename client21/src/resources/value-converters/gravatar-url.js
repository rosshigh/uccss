/**
 * Created by Ross on 12/11/2015.
 */

 export class GravatarUrlValueConverter {

  toView(email, size) {
    if (email) {
      var size = size || 80;
      var html = '<img class="img-circle" src="https://secure.gravatar.com/avatar/' + CryptoJS.MD5(email.toLowerCase()) + '.jpg?s=' + size + '"/>';
      return html;
    } else {
      return "<i class='fa fa-file-text'></i>"
    }
  }
}
