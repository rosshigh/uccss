export class GetArrayValueValueConverter {
	toView(value, array, property){
		return array[parseInt(value)][property];
	}
}