export class ErpsimValueConverter{
	toView(array, erpSimId){
		if(array === undefined || erpSimId === undefined) return;
		var newArray = new Array();
		array.forEach(item => {
			if(item.productId === erpSimId) newArray.push(item);
		});
		return newArray;
	}
}