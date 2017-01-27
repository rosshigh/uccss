export class IdsRequestedValueConverter {
  toView(value) {
    if(value){
      return parseInt(value.graduateIds) + parseInt(value.undergradIds);
    }
    return 0;
  }
}
