export class OnoffSwitchValueConverter {
  toView(value) {
    if(value == 'false'){
		return '<i class="fa fa-toggle-on fa-lg" aria-hidden="true"></i> Turn On';
  	} else {
		return '<i class="fa fa-toggle-off fa-lg" aria-hidden="true"></i> Turn Off';
	}
  }
}
