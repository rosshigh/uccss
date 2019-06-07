var Mongoose = require('mongoose'),
    Counters = Mongoose.model('Counters');

module.exports = function (app) {

  //filter=field1|eq|value1	gt,lt,ge,le
  //filter=[or]field1|value1:value2
  //filter=[and]field1|eq|value1:field2|eq|value2
  //filter=[in]field|list|value1:value2:value3
  buildQuery = function(queryObject, reqQuery){    
    if(queryObject.order) {
      var order = queryObject.order.split(':');  
      let sortOrder = 1;
      let sortField = order[0];
      if(order[1] && order[1] =='DSC')  sortOrder = -1;   
      let sortObject = {};
      sortObject[sortField] = sortOrder
      reqQuery.sort(sortObject);
    }
    if(queryObject.fields) reqQuery.select(queryObject.fields);   
    if(queryObject.filter){    
      var queryString = queryObject.filter;           
      if(queryString.indexOf('[or]') > -1){
        queryString = queryString.substring(4);
        var queryArray = queryString.split('|');
        var field = queryArray[0];
        var queryValues = queryArray[1].split(":");
        var query = new Array();
        queryValues.forEach(function(item){
          var obj = new Object();
          obj[field] = item;
          query.push(obj)
        });
        reqQuery.or(query);
      } else if(queryString.indexOf('[and]') > -1){
        queryString = queryString.substring(5);
        var queryArray = queryString.split(':');
        queryArray.forEach(function(item){
          var component = item.split('|');
          switch(component[1]) {
            case 'eq':
                reqQuery.where(component[0]).eq(component[2]);
              break;
            case 'gt':
              reqQuery.where(component[0]).gt(component[2]);
              break;
            case 'lt':
              reqQuery.where(component[0]).lt(component[2]);
              break;
            case 'lte':
              reqQuery.where(component[0]).lte(component[2]);
              break;
            case 'in':
              var values = component[2].split('$');
              reqQuery.where(component[0]).in(values);
          }
        });
      } else if (queryString.indexOf('[in]') > -1){     
        queryString = queryString.substring(4);
        var component = queryString.split('[list]');
        var list = component[1].split(':');       
        reqQuery.where(component[0]).in(list)
      } else {
        var component = queryString.split('|');      
        switch(component[1]) {
          case 'eq':
            reqQuery.where(component[0]).eq(component[2]);
            break;
          case 'gt':
            reqQuery.where(component[0]).gt(component[2]);
            break;
          case 'lt':
            reqQuery.where(component[0]).lt(component[2]);
            break;
          case 'lte':
            console.log(component[0])
            console.log(component[2])
            reqQuery.where(component[0]).lte(component[2]);
            break;
        }
      }
    }

    return reqQuery;
  }
};
