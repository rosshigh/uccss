export class AppendProductsValueConverter {
	toView(value, productArray){
		if(value && productArray){
			let content = value.description + "<br>";
			if(value.products.length > 0) content += '<h4>Products required for this Curriculum</h4>';
			value.products.forEach(item => {
				for(var i = 0; i < productArray.length; i++){
					if(item === productArray[i]._id){
						content += productArray[i].name + "<br>";
						break;
					}
				}
			})
			return content;
		}
		return "";
	}
}