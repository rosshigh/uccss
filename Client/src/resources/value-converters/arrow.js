export class ArrowValueConverter {
	toView(value1, value2, value3, value4) {
	  if(value1 == value2 && value3 == value4){
		  return '<i class="fa fa-arrow-left" aria-hidden="true"></i>';
	  } else {
		  return '';
	  }
	}
  
  }