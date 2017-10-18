import moment from 'moment';

export class filterSessionsValueConverter { 
  toView(array, filter, keep, sort) {
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
		if(sort){
			var sortOrder = sort ? -1 : 1;
			array.sort((a,b) => {
				var sort = moment(a['startDate']).isAfter(b['startDate']) ? 1 : -1;
				return sort * sortOrder; 
			})
		}
		return array;
  }
}