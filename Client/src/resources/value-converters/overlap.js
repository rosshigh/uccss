export class OverlapValueConverter {
  toView(value) {
    if(value){
        return value == 'danger' ? 'Overlapping Range' : 'Valid Range';  
    }
    return "";
  }

}