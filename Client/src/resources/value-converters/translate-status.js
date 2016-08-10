/**
 * Created by Ross on 1/21/2016.
 */
export class TranslateStatusValueConverter {
  toView(value) {
    return value ? "Active" : "Inactive";
  }

}
