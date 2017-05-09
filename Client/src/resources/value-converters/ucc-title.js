export class uccTitleValueConverter {
  toView(value, array) {
	  for(let i = 0; i < array.length; i++){
		  if(value == array[i].role) return array[i].label;
	  }
	  return "";
  }
}