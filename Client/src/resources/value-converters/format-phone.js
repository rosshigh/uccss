export class FormatPhoneValueConverter {
  toView(value) {
	  if(!value) return

	  return value.substring(0,3) + "-" + value.substring(3,6) + "-" + value.substring(6,10);
  }
}