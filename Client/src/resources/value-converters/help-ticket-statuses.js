export class HelpTicketStatusesValueConverter {
	toView(array, remove){
		if(array === undefined) return;
		var newArray = new Array();
		array.forEach(item => {
			if(remove.indexOf(item.code) === -1){
				newArray.push(item);
			}
		})
		return newArray;
	}
}