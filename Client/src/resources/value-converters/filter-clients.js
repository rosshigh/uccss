export class FilterClientsValueConverter {
  toView(array, unassigned, unassignedCode, sandbox, sandboxCode, client) {
    if(array){
        if(client){
            return array.filter((item) => {
                return item._id == client;
            })
        } else if(sandbox){
            return array.filter((item) => {
                return item.clientStatus == sandboxCode;
            })
        } else if(unassigned){
            return array.filter((item) => {
                return item.clientStatus == unassignedCode && item.clientStatus != sandboxCode;
            })
        } else {
            return array.filter((item) => {
                return item.clientStatus != sandboxCode;
            })
        }
    }
   return null;
  }
}