export class FormatPhoneValueConverter {
  toView(value, ext) {
	  if(!value) return
    let phone = value.substring(0,3) + "-" + value.substring(3,6) + "-" + value.substring(6,10);
    if(ext) phone += ' ext. ' + ext;
    return phone; 
  }
}