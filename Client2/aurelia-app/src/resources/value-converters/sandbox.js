export class SandboxValueConverter {
  toView(value, sandbox, name) {
    if(value && sandbox){
      if(value === sandbox){
        return name;
      } else {
        return 'Regular';
      }
    }
  }
}
