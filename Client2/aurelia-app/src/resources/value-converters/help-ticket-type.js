export class HelpTicketTypeValueConverter {
	toView(value, array){
		if(value === undefined || array === undefined) return;

		for(var j = 0; j < array.length; j++){
			for(var i = 0; i < array[j].subtypes.length; i++){
				if(array[j].subtypes[i].type === value) return array[j].subtypes[i].description;
			}
		}
		return undefined;
	}
}