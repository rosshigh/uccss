export class PhoneNumberValueConverter {
  toView(value) {
		var mask = "___-___-____";
	  if(value){
			
			value = value.replace(/-/g, '');
			if(value.length > 10) value = value.substr(0,10);
			if(value.length === 0){
				return mask;
			}
		  else if(value.length <= 3){
			  return value;// + mask.substr(value.length);
		  } else if (value.length > 3 && value.length <= 6) {
			  return value.substr(0,3) + "-" + value.substr(3, value.length - 3);// + mask.substr(value.length + 1);
		  } else {
			  return value.substr(0,3) + "-" + value.substr(3,3) + "-" + value.substr(6,value.length);// + mask.substr(value.length + 2);
		  }
	  }
	}
}