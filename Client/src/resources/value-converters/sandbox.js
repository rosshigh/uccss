export class SandboxValueConverter {
  toView(value, sandbox) {
    if(value && sandbox){
      if(value === sandbox){
        return "Sandbox";
      } else {
        return 'Regular';
      }
    }
  }
}
