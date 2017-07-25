export class SandboxValueConverter {
  toView(value, sandbox) {
    if(value === null){
      return sandbox;
    } else {
      return 'Regular';
    }
  }
}
