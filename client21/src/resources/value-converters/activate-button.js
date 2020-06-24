export class ActivateButtonValueConverter {
  toView(value) {
    if(value == '02'){
		return '<i class="fa fa-toggle-on fa-lg" aria-hidden="true"></i>';
  	} else {
		return '<i class="fa fa-toggle-off fa-lg" aria-hidden="true"></i>';
	}
  }
}