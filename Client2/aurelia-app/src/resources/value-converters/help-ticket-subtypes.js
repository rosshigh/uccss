export class HelpTicketSubtypesValueConverter {
	toView(array){
		if(array === undefined ) return;

		var newArray = new Array();
		array.forEach(item => {
			item.subtypes.forEach(itemSub => {
				newArray.push(itemSub);
			})
		});
		return newArray;
	}
}