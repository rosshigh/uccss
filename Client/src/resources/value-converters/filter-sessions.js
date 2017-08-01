export class filterSessionsValueConverter {
  toView(array, filter, keep) {
	  if(array && filter){
			let activePresent = false;
			let requestPresent = false;
			array.forEach(item => {
				if(item.sessionStatus === 'Active') activePresent = true;
				if(item.sessionStatus === 'Requests') requestPresent = true;
			});
			if(activePresent && requestPresent){
				return array.filter(item => {
					return item['sessionStatus'] === keep;
				})
			}
		} 
		return array;
  }
}