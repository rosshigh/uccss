export class SessionTypeValueConverter {
  toView(array, value) {
    var sessions = [];
	var statuses = value.split(':');
    if(value === undefined || array === undefined) return sessions;
		array.forEach(function(session){
			if(statuses.indexOf(session.sessionStatus) > -1){
				sessions.push(session);
			}
		});
		return sessions;
    }
}
