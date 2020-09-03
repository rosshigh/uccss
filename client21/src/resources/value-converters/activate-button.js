export class ActivateButtonValueConverter {
  toView(value, activeValue) {
    if(value == activeValue){
		return '<i class="fa fa-toggle-on fa-lg" aria-hidden="true"></i>';
  	} else {
		return '<i class="fa fa-toggle-off fa-lg" aria-hidden="true"></i>';
	}
  }
}