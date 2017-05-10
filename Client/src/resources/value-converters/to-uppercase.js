export class ToUppercaseValueConverter{
	toView(value){
		if(value){
			return value.toUpperCase();
		}
	}
}