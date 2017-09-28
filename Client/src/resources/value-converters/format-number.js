export class FormatNumberValueConverter {

  toView(value, digits) {
	  if(value){
		return String(value).replace(/(.)(?=(\d{3})+$)/g,'$1,');
	  }
  }
}