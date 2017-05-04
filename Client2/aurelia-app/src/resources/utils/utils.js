import {inject} from 'aurelia-framework';
import $ from 'jquery';
import {Notification} from 'aurelia-notification';
import moment from 'moment';
import {AppConfig} from '../../config/appConfig';

@inject(Notification, AppConfig)
export class Utils{

    constructor(notification, config){
        this.config = config;
        this.notification = notification;
        this.notification.waitForMove = true 
    }

    /*****************************************************************************
     * Display a notification
     * msg - the message to display
     ****************************************************************************/
    showNotification(msg){
        this.notification.note(msg);
    }

    /*****************************************************************************
     * Count the the items in an array
     * value - the value to count
     * property - the object property to look for the value
     * itemArray - the array
     ****************************************************************************/
    countItems(value, property, itemArray){
        var countArray = itemArray.filter(function (item){
            return item[property] == value
         });
        return countArray.length;
    }


    /*************************************************************************
     * Compare to objects to determine if they are equal
     * obj1 - first object
     * obj2 - second object
     * skip - an array of properties to skip
     *************************************************************************/
  objectsEqual(obj1, obj2, skip){
      var changes = new Array();
      var skipArray = skip || new Array();
      for (var property in obj1) {
        if (obj1.hasOwnProperty(property)) {
            if(!obj1[property] && !obj2[property] || skipArray.indexOf(property) !== -1){
              continue;
            }
            else if(Array.isArray(obj1[property])){
                if(!this.arraysEqual(obj1[property], obj2[property])) {
                  changes.push({
                    property: property,
                    oldValue: obj2[property].length,
                    newValue: obj1[property].length
                  });
                }
            } else if ((property.indexOf('Date') > -1 || property.indexOf('date') > -1) ||  (obj1[property] instanceof Date)){
                var date1 = new Date(obj1[property]);
                var date2 = new Date(obj2[property]);
                if(!moment(date1).isSame(date2, 'year')
                    || !moment(date1).isSame(date2, 'month')
                    || !moment(date1).isSame(date2, 'day') ) {
                    changes.push({
                      property: property,
                      oldValue:  obj2[property],
                      newValue: obj1[property]
                    });
                    }
            } else {
                if(obj1[property] != obj2[property]) {
                    if(!(obj1[property] === ""  && obj2[property] === undefined)){
                        changes.push({
                          property: property,
                          oldValue: obj2[property],
                          newValue: obj1[property]
                        });
                      }
                    }
                }
            }
        }
        return changes;
  }

  /************************************************************************************
   * Convert a date to UTC local time
   ***********************************************************************************/
  convertUTCDateToLocalDate(date) {
    if(!(date instanceof Date))  date = new Date(date);
    var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);

    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate;
  }

  /************************************************************************************
   * Copy one object into another, used when you want a completly new object and not a reference
   * objFrom - object to copy from
   * objTO - object to copy to
   * properties - an array of specific properties to copy 
   ***********************************************************************************/
  copyObject(objFrom, objTo, properties){
    objTo = objTo || new Object();;
    if(!properties){
      for (var property in objFrom) {
        if (objFrom.hasOwnProperty(property)) {
          if(Array.isArray(objFrom[property])){
            objTo[property] = this.copyArray(objFrom[property]);
          } else if (objFrom[property] instanceof Date){ 
            objTo[property] = objFrom[property];
        } else if (this.isObject(objFrom[property])){
            objTo[property] = this.copyObject(objFrom[property]);
          } else {
            objTo[property] = objFrom[property];
          }
        }
      }
    } else {
      for(var i = 0, x = properties.length; i<x; i++){
        if (objFrom.hasOwnProperty(properties[i])) {
           if(Array.isArray(objFrom[property])){
            objTo[property] = this.copyArray(objFrom[property]);
          } else if (objFrom[property] instanceof Date){ 
            objTo[property] = objFrom[property];
          } else if (this.isObject(objFrom[property])){
            objTo[property] = this.copyObject(objFrom[property]);
          } else {
            objTo[property] = objFrom[property];
          }
        }
      }
    }
    return objTo;
  }
  
  /*******************************************************************************
   * Return a copy of an array
   *******************************************************************************/
  copyArray(array){
    if(array){
      var newArray = new Array();
      array.forEach((item) => {
        if(Array.isArray(item)){
            newArray.push(this.copyArray(item));
        } else if (this.isObject(item)){
            newArray.push(this.copyObject(item));
        } else {
            newArray.push(item);
        }
      })
      return newArray;
    }
    return null;
  }
  
 /*********************************************************************************
  * Test of a variable is an object
 *********************************************************************************/ 
 isObject(obj) {
    return obj === Object(obj);
 }

 /********************************************************************************
  * Compare to arrays
  ********************************************************************************/
  arraysEqual(array1, array2){
    var arraysEqual = true;
    if(array1.length != array2.length) {
      return false;
    } else {
      var newArray = new Array();
      for(var i = 0; i<array1.length; i++){
        newArray[i] = JSON.stringify(array1[i]);
      }
      for(var i = 0; i<array1.length; i++){
          if(newArray.indexOf(JSON.stringify(array2[i])) == -1){
            return false;
          }  
      }
    }
    return true;
  }

  /********************************************************************************
  * Format the dates in an object to be compatible with data picker controls
  ********************************************************************************/
  formatDateForDatesPicker(obj){
    for (var property in obj) {
      if (property.toUpperCase().indexOf('DATE') > -1  ||  obj[property] instanceof Date){
        if(obj[property] != null){
          obj[property] = this.convertUTCDateToLocalDate( obj[property]);
          obj[property] = moment(obj[property]).format("YYYY-MM-DD");
        }
      }
    } 
  }


  /*****************************************************************************
   * Determine users role for authorizations
   ****************************************************************************/
  setRole(roles){
    let userRole = 1;

    for(let i = 0; i < roles.length; i++){
      this.config.ROLES.forEach(item => {
        if(roles[i] == item.role){
          userRole = item.authLevel > userRole ? item.authLevel : userRole;
        }
      })
    }
    return userRole;
  }

  toCamelCase(str) {
    return str.toLowerCase()
      .replace( /['"]/g, '' )
      .replace( /\W+/g, ' ' )
      .replace( / (.)/g, function($1) { return $1.toUpperCase(); })
      .replace( / /g, '' );
  }

  arrayContainsValue(array, property, value){
    for(var i = 0, x = array.length; i < x; i++){
      if(array[i][property] == value){
        return i;
      }
    }
    return -1;
  }

  lookupValue(value, array, lookUpProperty, returnProperty){
      if(!value || !array){
        return;
      }
      for(var i = 0, x = array.length; i < x; i++){
        if(array[i][lookUpProperty] == value) {
            return array[i][returnProperty];
        }
      }
      return null;
    }

  


    
}