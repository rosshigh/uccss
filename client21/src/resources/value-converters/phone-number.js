export class PhoneNumberValueConverter {
	toView(value, masks, country, ext) {
		// var mask = "___-___-____";
		if (country === '99') return value;
		if (!country) country = 'US';
		if (value) {
			country = country.toUpperCase();
			value = value.replace(/ /g, '');
			value = value.replace(/-/g, '');
			var mask = "";
			let returnValue = "";
			for (let i = 0; i < masks.length; i++) {
				if (masks[i].country === country) {
					mask = masks[i].mask;
					break;
				}
			}
			if (!mask) {
				mask = '999-999-9999';
			}
			let numChars = mask.length;
			for (let j = 0; j < numChars; j++) {
				let digit = mask.substr(0, 1);
				mask = mask.slice(1);
				if (digit === '9') {
					returnValue += value.substr(0, 1);
					value = value.slice(1);
				} else {
					returnValue += digit;
				}
			}
			if (ext) returnValue += ' ext. ' + ext
			return returnValue;

			// if(value.length > 10) value = value.substr(0,10);
			// if(value.length === 0){
			// 	return mask;
			// }
			// else if(value.length <= 3){
			//   return value;// + mask.substr(value.length);
			// } else if (value.length > 3 && value.length <= 6) {
			//   return value.substr(0,3) + "-" + value.substr(3, value.length - 3);// + mask.substr(value.length + 1);
			// } else {
			//   return value.substr(0,3) + "-" + value.substr(3,3) + "-" + value.substr(6,value.length);// + mask.substr(value.length + 2);
			// }
		}
	}
}