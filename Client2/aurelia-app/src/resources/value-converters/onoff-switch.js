export class OnoffSwitchValueConverter {
  toView(value) {
    if(value == 'false'){
		return '<i class="fa fa-toggle-on fa-2x" aria-hidden="true"></i> Turn On';
  	} else {
		return '<i class="fa fa-toggle-off fa-2x" aria-hidden="true"></i> Turn Off';
	}
  }
}
