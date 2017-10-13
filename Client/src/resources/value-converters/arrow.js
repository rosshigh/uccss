export class ArrowValueConverter {
	toView(value1, value2) {
	  if(value1 == value2){
		  return '<i class="fa fa-arrow-left" aria-hidden="true"></i>';
	  } else {
		  return '';
	  }
	}
  
  }