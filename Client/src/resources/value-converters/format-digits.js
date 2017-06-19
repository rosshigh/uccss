export class FormatDigitsValueConverter {

  toView(value, digits) {
	  if(value){
		  digits = digits || 2;
		  if(typeof value === "string") value = Number(value);
		  return  +value.toFixed(digits)
	  }
  }
}