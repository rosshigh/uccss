export class ConcatenateStringValueConverter {
    toView(value, length) {
        if(value){
            if(value.length <= length) return value;
            return value.substring(0, length) + '...';
        } else {
            return "";
        }
      
    }
}