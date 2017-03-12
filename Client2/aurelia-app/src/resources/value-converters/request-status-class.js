export class RequestStatusClassValueConverter {
  toView(value, array, request, customerActionStatus) {
	  if(!value || !array || !request ) return;

	  customerActionStatus = customerActionStatus ? customerActionStatus : '4';

	  if(request.requestStatus == customerActionStatus) return "";

	  return array[value];
  }
}