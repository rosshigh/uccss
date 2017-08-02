export class SessionSystemsValueConverter {
	toView(value, session, systems){
		if(value && session && systems){
			return value.filter(item => {
				for(let i = 0; i < systems.length; i++){
					if(systems[i]._id === item.systemId){
						return systems[i].sessions.indexOf(session) > -1
					}
				}
				return false;
			})
		}
	}
}