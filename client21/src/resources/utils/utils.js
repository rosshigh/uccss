import { inject } from 'aurelia-framework';
import { Notification } from 'aurelia-notification';
import{ EventAggregator } from 'aurelia-event-aggregator';
import { Router } from "aurelia-router";
import toastr from 'toastr';

@inject(Notification, EventAggregator, Router)
export class Utils {

  constructor(notification, eventAggregator, router) {
    this.notification = notification;
    this.eventAggregator = eventAggregator;
    this.router = router;
    this.notification.waitForMove = true;

    toastr.options.extendedTimeOut = "1000";
    toastr.options.timeOut = "1500";

    toastr.info("It worked!");
  }

  publishPageTitle(pageTitle){
    this.eventAggregator.publish('pageTitleUpdate', pageTitle);
  }

  navigate(root, el){
    $(".nav-link").removeClass('active');
    $(el.target).addClass('active');
    this.router.navigate(root + '/' + el.target.id)
}

  guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  refreshSelect(selectElement, collection, matchProperty, valueToMatch) {
    let selectedOption = null;
    if (Array.isArray(valueToMatch)) {
      selectedOption = valueToMatch;
    } else {
      collection.forEach(item => {
        if (this.isObject(item)) {
          if (valueToMatch === item[matchProperty]) {
            selectedOption = item[matchProperty];
          }
        } else {
          if (valueToMatch === item) {
            selectedOption = item;
          }
        }
      })
    }

    $(selectElement).val(selectedOption);
    $(selectElement).selectpicker('refresh');
  }

  /*****************************************************************************
   * Display a notification
   * msg - the message to display
   ****************************************************************************/
  showNotification(msg, type, title) {
    // type = type ? type : "success";
    // toastr[type](msg);
    msg = this.adjustMessage(msg);
    title = "";
    let bgColor;
    switch(type){
      case 'success': 
        bgColor = 'green';
        break;
      case 'error':
        bgColor = 'red';
        break;
      case 'warn':
        bgColor = 'orange';
        break;
      // default:
      //   bgColor = 'green';
    }

    iziToast.show({
      title: title,
      message: msg,
      backgroundColor: bgColor

  });
  }

  adjustMessage(msg){
    if(msg.length > 40){
      return msg.substring(0,40);
    }
    
    return msg;
  }

    // $(".notification").css("background-color", "ghostwhite");
    // switch (type) {
    //   case 'error':
    //     $(".notification").css("color", "red");
    //     $(".notification").html(msg).fadeIn(1000).fadeOut(100).fadeIn(1500).fadeOut(100);
    //     break;
    //   case 'warning':
    //     $(".notification").css("color", "orange");
    //     $(".notification").html(msg).fadeIn(1000).fadeOut(100).fadeIn(1500).fadeOut(100);
    //     break;
    //   default:
    //     $(".notification").css("color", "black");
    //     $(".notification").html(msg).fadeIn(1500).fadeOut(1500);
    // }


  getIndex(obj, array){
    let index = -1;
    if(array){
      for(let i = 0; i < array.length; i++){
        if(array[i]._id === obj._id){
          index = i;
          break
        }
      }
    }
    return index;
  }

  updateArrayItem(obj, array) {
    let index = this.getIndex(obj, array);
    if(index >= 0){
      array.splice(index,1,obj);
    }
  }

  dateSort(a, b, sortOrder) {
    let date1 = new Date(a.registered);
    let date2 = new Date(b.registered);

    if (date1 === date2) {
      return 0;
    }

    if (date1 > date2) {
      return 1 * sortOrder;
    }

    return -1 * sortOrder;
  }

  myCustomlookupFormatter(row, cell, value, columnDef, dataContext) {
    for (var i = 0; i < columnDef.lookupArray.length; i++) {
      if (value == columnDef.lookupArray[i].code) {
        value = columnDef.lookupArray[i].description;
      }
    }
    return value;
  }

  /*****************************************************************************
  * Determine users role for authorizations
  ****************************************************************************/
  // setRole(roles){
  //   let userRole = 1;

  //   for(let i = 0; i < roles.length; i++){
  //     this.config.ROLES.forEach(item => {
  //       if(roles[i] == item.role){
  //         userRole = item.authLevel > userRole ? item.authLevel : userRole;
  //       }
  //     })
  //   }
  //   return userRole;
  // }

  /*****************************************************************************
   * Count the the items in an array
   * value - the value to count
   * property - the object property to look for the value
   * itemArray - the array
   ****************************************************************************/
  countItems(value, property, itemArray) {
    var countArray = itemArray.filter(function (item) {
      return item[property] == value
    });
    return countArray.length;
  }

  arrayContainsValue(array, property, value) {
    for (var i = 0, x = array.length; i < x; i++) {
      if (array[i][property] == value) {
        return i;
      }
    }
    return -1;
  }

  /*************************************************************************
  * Compare to objects to determine if they are equal
  * obj1 - first object
  * obj2 - second object
  * skip - an array of properties to skip
  // *************************************************************************/
  objectsEqual(obj1, obj2, skip) {
    var changes = new Array();
    var skipArray = skip || new Array();
    for (var property in obj1) {
      if (obj1.hasOwnProperty(property)) {
        if (!obj1[property] && !obj2[property] || skipArray.indexOf(property) !== -1) {
          continue;
        }
        else if (Array.isArray(obj1[property])) {
          if (!this.arraysEqual(obj1[property], obj2[property])) {
            changes.push({
              property: property,
              oldValue: obj2[property].length,
              newValue: obj1[property].length
            });
          }
        } else if ((property.indexOf('Date') > -1 || property.indexOf('date') > -1) || (obj1[property] instanceof Date)) {
          var date1 = new Date(obj1[property]);
          var date2 = new Date(obj2[property]);
          if (!moment(date1).isSame(date2, 'year')
            || !moment(date1).isSame(date2, 'month')
            || !moment(date1).isSame(date2, 'day')) {
            changes.push({
              property: property,
              oldValue: obj2[property],
              newValue: obj1[property]
            });
          }
        } else if (typeof obj1[property] === 'object') {
          var areEqual = true;
          for (var x in obj1[property]) {
            if (obj1[property][x] != obj2[property][x]) areEqual = false;
          }
          if (!areEqual) {
            changes.push({
              property: property,
              oldValue: obj2[property],
              newValue: obj1[property]
            });
          }
        } else {
          if (obj1[property] != obj2[property]) {
            if (!(obj1[property] === "" && obj2[property] === undefined)) {
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

  /********************************************************************************
  * Compare to arrays
  ********************************************************************************/
  arraysEqual(array1, array2) {
    var arraysEqual = true;
    if (array1.length != array2.length) {
      return false;
    } else {
      var newArray = new Array();
      for (var i = 0; i < array1.length; i++) {
        newArray[i] = JSON.stringify(array1[i]);
      }
      for (var i = 0; i < array1.length; i++) {
        if (newArray.indexOf(JSON.stringify(array2[i])) == -1) {
          return false;
        }
      }
    }
    return true;
  }

  /************************************************************************************
  * Copy one object into another, used when you want a completly new object and not a reference
  * objFrom - object to copy from
  * objTO - object to copy to
  * properties - an array of specific properties to copy
  ***********************************************************************************/
  copyObject(objFrom, objTo, properties) {
    objTo = objTo || new Object();;
    if (!properties) {
      for (var property in objFrom) {
        if (objFrom.hasOwnProperty(property)) {
          if (Array.isArray(objFrom[property])) {
            objTo[property] = this.copyArray(objFrom[property]);
          } else if (objFrom[property] instanceof Date) {
            objTo[property] = objFrom[property];
          } else if (this.isObject(objFrom[property])) {
            objTo[property] = this.copyObject(objFrom[property]);
          } else {
            objTo[property] = objFrom[property];
          }
        }
      }
    } else {
      for (var i = 0, x = properties.length; i < x; i++) {
        if (objFrom.hasOwnProperty(properties[i])) {
          if (Array.isArray(objFrom[property])) {
            objTo[property] = this.copyArray(objFrom[property]);
          } else if (objFrom[property] instanceof Date) {
            objTo[property] = objFrom[property];
          } else if (this.isObject(objFrom[property])) {
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
  copyArray(array) {
    if (array) {
      var newArray = new Array();
      array.forEach((item) => {
        if (Array.isArray(item)) {
          newArray.push(this.copyArray(item));
        } else if (this.isObject(item)) {
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

  // toCamelCase(str) {
  //   return str.toLowerCase()
  //     .replace( /['"]/g, '' )
  //     .replace( /\W+/g, ' ' )
  //     .replace( / (.)/g, function($1) { return $1.toUpperCase(); })
  //     .replace( / /g, '' );
  // }

  // lookupValue(value, array, lookUpProperty, returnProperty){
  //     if(!value || !array){
  //       return;
  //     }
  //     for(var i = 0, x = array.length; i < x; i++){
  //       if(array[i][lookUpProperty] == value) {
  //           return array[i][returnProperty];
  //       }
  //     }
  //     return null;
  //   }

  //   isMobile(device){
  //       switch(device){
  //           case 'Android':
  //               return navigator.userAgent.match(/Android/i);
  //               break;
  //           case 'iOS':
  //               return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  //               break;
  //           default:
  //                return  navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone|iPad|iPod/i);
  //               break;
  //       }
  //       // var isMobile = {
  //       //     Android: function() {
  //       //         return navigator.userAgent.match(/Android/i);
  //       //     },
  //       //     BlackBerry: function() {
  //       //         return navigator.userAgent.match(/BlackBerry/i);
  //       //     },
  //       //     iOS: function() {
  //       //         return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  //       //     },
  //       //     Opera: function() {
  //       //         return navigator.userAgent.match(/Opera Mini/i);
  //       //     },
  //       //     Windows: function() {
  //       //         return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
  //       //     },
  //       //     any: function() {
  //       //         return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  //       //     }
  //       // };
  //   }

}
