export class FormatNumberValueConverter {

  toView(value, digits) {
	  if(value){
      let x =  value.toFixed(2);
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	  }
  }
}
