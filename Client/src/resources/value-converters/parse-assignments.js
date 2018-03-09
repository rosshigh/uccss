export class ParseAssignmentsValueConverter {
	toView(value, systems) {
		if(!value || value === null){
			return "";
		} else {
			let assignments = "";
			value.forEach(item => {
				let system = "";
				for(let i = 0; i < systems.length; i++){
					if(systems[i]._id === item.systemId) {
						system = systems[i].sid;
						break;
					}
				}
				if(system === "") system = "NA";
				assignments += system + " " + item.client + "<br>"
			})
			return assignments;
		}
	}
}