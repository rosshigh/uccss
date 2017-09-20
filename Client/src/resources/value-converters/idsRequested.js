export class IdsRequestedValueConverter {
  toView(value) {
    if(value){
      value.graduateIds = value.graduateIds === null ? 0 : value.graduateIds;
      value.undergradIds = value.undergradIds === null ? 0 : value.undergradIds; 
      return parseInt(value.graduateIds) + parseInt(value.undergradIds);
    }
    return 0;
  }
}

