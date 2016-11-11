export class SortArrayValueConverter{
  toView(array, propertyName, direction){
    if(array && propertyName){
        this.sortDirection = direction === "ASC" ? 1 : -1;
        return array
          .sort((a, b) => {
            var result = (a[propertyName] < b[propertyName]) ? -1 : (a[propertyName] > b[propertyName]) ? 1 : 0;
            return result * this.sortDirection;
          });
    }
  }
}
