export class SessionStatusButtonValueConverter {
	toView(value){
		if(!value) return; 

		switch(value){
			case 'Active':
			return '<span bootstrap-tooltip data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Close"><i class="fa fa-hourglass-end" aria-hidden="true"></i></span>'
				break;
			case 'Requests':
			return '<span bootstrap-tooltip data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Activate"><i class="fa fa-check-square-o" aria-hidden="true"></i></span>'
				break;
			case 'Next':
			return '<span bootstrap-tooltip data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Open"><i class="fa fa-cart-plus" aria-hidden="true"></i></span>'
				break;
			default:
				return "";
		}
	}
}