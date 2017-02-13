export class OneLineValueConverter {
	toView(value, width=80){
		if(value === undefined) return "";
		value = value.replace(/<(?:.|\n)*?>/gm, '');
		return value.substring(0, width) + "...";
	}
}