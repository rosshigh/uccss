export class CheckBoxValueConverter {
  toView(value) {
    if(value){
        return '<i class="fa fa-check-square-o"></i>';
    } else {
        return '<i class="fa fa-square-o"></i>';
    }
  }

}