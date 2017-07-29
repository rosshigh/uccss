export class filterArrayValueConverter {
  toView(array, property, value) {
	  if(array && property && value){
		  return array.filter(item => {
			  return item[property] === value;
		  })
	  }
  }
}