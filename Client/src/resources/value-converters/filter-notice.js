export class filterNoticeValueConverter {
  toView(array) {
    if (array) {
      if (array.length > 5) {
        let newArray = [];
        let updatedItems = 0;
        array.forEach(notice => {
          if (notice.notice.indexOf('Closed') > -1) {
            newArray.push(notice);
          } else if (updatedItems < 5) {
            newArray.push(notice);
            updatedItems = updatedItems++;
          }
        });
      } else if (array.length <= 5) {
        return array;
      }
    }
  }
}
