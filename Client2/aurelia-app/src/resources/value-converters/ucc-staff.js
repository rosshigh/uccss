export class UccStaffValueConverter {
  toView(array) {
    if(array){
      return array.filter((item) => {
          return item.roles.indexOf('UCCT') > -1;
      })
    }
    return array;
  }

}