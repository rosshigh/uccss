export class FilterClientsValueConverter {
  toView(array, unassigned, unassignedCode, sandbox, sandboxCode, product) {
    if(array){
        // if(!clientRelevant) return array;
        if(product){
           array =  array.filter(item => {
                return item.productId === product;
            })
        }
        if(sandbox){
            array =   array.filter((item) => {
                return item.clientStatus == sandboxCode;
            })
        } else if(unassigned){
            array =   array.filter((item) => {
                return item.clientStatus == unassignedCode;
            })
        } 
        // else {
        //     array = array.filter((item) => {
        //         return item.clientStatus != sandboxCode;
        //     })
        // }
    }
   return array;
  }
}