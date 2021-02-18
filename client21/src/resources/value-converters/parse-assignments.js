export class ParseAssignmentsValueConverter {
	toView(value, systems) {
		if(!value || value === null){
			return "";
		} else {
			let assignments = "";
			value.forEach(item => {
				if(item.systemId.sid === "") system = "NA";
				assignments += item.systemId.sid + " " + item.client + "<br>"
			})
			return assignments;
		}
	}
}