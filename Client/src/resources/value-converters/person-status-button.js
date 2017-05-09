export class PersonStatusButtonValueConverter {
	toView(value){
		if(!value) return;

		switch(value){
			case '01':
				return '<span bootstrap-tooltip data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Deactivate"><i class="fa fa-toggle-off" aria-hidden="true"></i></span>'
				break;
			case '02':
				return '<span bootstrap-tooltip data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Activate"><i class="fa fa-toggle-on" aria-hidden="true"></i></span>'
				break;
			default:
				return "";
		}
	}
}