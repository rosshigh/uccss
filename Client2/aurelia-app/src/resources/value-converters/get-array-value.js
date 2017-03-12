export class GetArrayValueValueConverter {
	toView(value, array, property, indexAdjust){
		if(value && array && property){
			let index = indexAdjust ? parseInt(value) + indexAdjust : parseInt(value);
			return array[index][property];
		}
		return "";
	}
}