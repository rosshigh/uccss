export class FilterStatusesValueConverter {
	toView(array, remove){
		if(array === undefined) return;
		if(remove === undefined) return array;
		var newArray = new Array();
		array.forEach(item => {
			if(remove.indexOf(item.code) === -1){
				newArray.push(item);
			}
		})
		return newArray;
	}
}