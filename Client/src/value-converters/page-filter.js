/**
 * Created by Ross on 1/20/2016.
 */
export class PageFilterValueConverter {
  toView(array, start, take) {
    if(array !== undefined){
      return array.slice(start, parseInt(take)+start);
    }
  }
}
