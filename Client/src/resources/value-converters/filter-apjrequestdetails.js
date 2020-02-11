export class filterApjRequestDetailsValueConverter { 
  toView(array) {
    let returnArray = [];
    if(!array || !array.length) return returnArray;
    array.forEach(item => {
      if(item.active === null || item.active === undefined || item.active) {
        returnArray.push(item);
      }
    })
    return returnArray;
  }
}
