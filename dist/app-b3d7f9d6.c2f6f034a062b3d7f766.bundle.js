"use strict";
(self["webpackChunkclient"] = self["webpackChunkclient"] || []).push([["app-b3d7f9d6"],{

/***/ 6847:
/*!******************************************!*\
  !*** ./src/resources/utils/dataTable.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataTable": function() { return /* binding */ DataTable; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ 381);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ 8741);
var _dec, _dec2, _class;





var DataTable = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.transient)(), _dec2 = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(_utils__WEBPACK_IMPORTED_MODULE_2__.Utils), _dec(_class = _dec2(_class = /*#__PURE__*/function () {
  function DataTable(utils) {
    this.currentPage = 0;
    this.pages = [];
    this.rowOptions = [5, 10, 15, 20, 50, 100, 200];
    this.filterValues = [];
    this.displayLength = void 0;
    this.DEFAULT_TAKE = 50;
    this.DEFAULT_START = 0;
    this.sortProperty = '';
    this.sortDirection = 1;
    this.currentPageElement = 0;
    this.startRecord = this.DEFAULT_START;
    this.take = this.DEFAULT_TAKE;
    this.firstVisible = this.startRecord + 1;
    this.lastVisible = this.startRecord + this.take - 1;
    this.numRowsShown = this.take.toString();
    this.active = false;
    this.utils = utils;
  }

  var _proto = DataTable.prototype;

  _proto.initialize = function initialize(context) {
    this.context = context;
  };

  _proto.pageOne = function pageOne() {
    setTimeout(function () {
      $(".pagination").children().removeClass('active');
      $($(".pagination").children()[1]).addClass('active'); // $("#" + this.context.navControl).children().removeClass('active');
      // $($("#" + this.context.navControl).children()[1]).addClass('active');
    }, 100);
  };

  _proto.createPageButtons = function createPageButtons(start) {
    this.displayLength = this.baseArray.length;
    this.lastVisible = parseInt(this.take) < this.displayLength ? parseInt(this.take) : this.displayLength;
    var maxButtons = 7;
    this.currentPage = 1;
    this.pageButtons = [];
    this.numPageButtons = Math.ceil((this.displayLength - (start - 1) * this.take) / this.take);

    for (var j = 1; j < this.numPageButtons; j++) {
      this.pages[j] = j;
    }

    if (this.numPageButtons <= maxButtons + 1) {
      for (var i = start; i < this.numPageButtons + start; i++) {
        this.pageButtons.push(i);
      }
    } else {
      for (var i = start; i < maxButtons + start; i++) {
        this.pageButtons.push(i);
      }

      this.pageButtons.push('...');
      this.pageButtons.push(this.pages.length);
    }
  };

  _proto.buildDisplayArray = function buildDisplayArray() {
    this.displayArray = new Array();

    for (var i = 0; i <= this.take; i++) {
      if (i + this.startRecord >= this.baseArray.length) break;
      this.displayArray.push(this.baseArray[i + this.startRecord]);
    }

    this.createPageButtons(1);
  };

  _proto.forward = function forward() {
    $(".pagination").children().removeClass('active'); // $("#" + this.context.navControl).children().removeClass('active');

    this.currentPageElement = this.currentPageElement < this.pageButtons.length - 1 ? this.currentPageElement += 1 : this.currentPageElement;

    if (this.pageButtons[this.currentPageElement] == "...") {
      this.createPageButtons(this.pageButtons[0] + 1);
      this.currentPageElement -= 1;
    }

    $($(".pagination").children()[this.currentPageElement + 1]).addClass('active'); // $($("#" + this.context.navControl).children()[this.currentPageElement + 1]).addClass('active');

    var start = parseInt(this.startRecord);
    var tk = parseInt(this.take);
    this.startRecord = start + tk > this.baseArray.length ? start : start + tk;
    this.firstVisible = this.startRecord + 1;
    this.lastVisible = parseInt(this.firstVisible) + tk - 1 > this.displayArray.length ? this.displayArray.length : parseInt(this.firstVisible) + tk - 1;
    this.buildDisplayArray(); // if(typeof(this.context.navigate) === 'function')  this.context.navigate();
  };

  _proto.createPage = function createPage() {
    $($(".pagination")[this.currentPage - 1]).addClass('active');
  };

  _proto.backward = function backward() {
    $(".pagination").children().removeClass('active');
    this.currentPageElement = this.currentPageElement > 0 ? this.currentPageElement -= 1 : this.currentPageElement;

    if (this.currentPageElement == 0 && this.pageButtons[this.currentPageElement] != 1) {
      this.createPageButtons(this.pageButtons[0] - 1);
    }

    if (this.pageButtons[this.currentPageElement] == "...") {
      var start = this.numPageButtons >= 8 ? this.numPageButtons - 8 : 1;
      this.createPageButtons(start); //this.context.currentPageElement = 1
    }

    $($(".pagination").children()[this.currentPageElement + 1]).addClass('active'); //  $($("#" + this.context.navControl).children()[this.currentPageElement + 1]).addClass('active');

    var start = parseInt(this.startRecord);
    var tk = parseInt(this.take);
    this.startRecord = start - tk < 0 ? 0 : this.startRecord = start - tk;
    this.firstVisible = this.startRecord + 1;
    this.lastVisible = parseInt(this.firstVisible) + tk - 1;
    this.buildDisplayArray(); // if(typeof(this.context.navigate) === 'function')  this.context.navigate();
  };

  _proto.pageButton = function pageButton(index, el) {
    $(".pagination").children().removeClass('active'); //  $("#" + this.context.navControl).children().removeClass('active');

    $(el.target).closest('li').addClass('active');
    this.currentPageElement = index;
    var start = parseInt(this.startRecord);
    var tk = parseInt(this.take);

    if (this.pageButtons[index] !== '...') {
      this.startRecord = (this.pageButtons[index] - 1) * tk;
      this.firstVisible = this.startRecord + 1;
      this.lastVisible = parseInt(this.firstVisible) + tk - 1 > this.displayArray.length ? this.displayArray.length : parseInt(this.firstVisible) + tk - 1;
    } // if(typeof(this.context.navigate) === 'function')  this.context.navigate();


    this.buildDisplayArray();
  };

  _proto.updateTake = function updateTake() {
    this.take = this.numRowsShown;
    this.startRecord = 0;
    this.lastVisible = parseInt(this.firstVisible) + parseInt(this.take) - 1;
    this.createPageButtons(1);
    this.pageOne();
    this.buildDisplayArray();
  };

  _proto.filterList = function filterList(el, array) {
    el.preventDefault();
    array = array || new Array(); //If the property is already in filterValues, filter it out

    this.filterValues = this.filterValues.filter(function (obj) {
      return obj.property !== el.target.id;
    }); //If the filter value is not set to empty, add it to filterValues

    if (el.target.value !== "") {
      switch (el.target.type) {
        case 'select-one':
          this.filterValues.push({
            property: el.target.id,
            value: el.target.options[el.target.selectedIndex].value,
            type: el.target.type,
            compare: $(el.target).attr("compare")
          });
          break;

        default:
          this.filterValues.push({
            property: el.target.id,
            value: el.target.value,
            type: el.target.type,
            compare: $(el.target).attr("compare")
          });
      }
    } //If there are no filters in filterValues, reset the displayArray to the original list


    if (this.filterValues.length > 0) {
      this.baseArray = this.filter(this.filterValues, array);
    } else {
      this.baseArray = this.sourceArray;
    }

    this.startRecord = this.DEFAULT_START;
    this.firstVisible = 1;
    this.buildDisplayArray();
    this.lastVisible = parseInt(this.take) < this.displayLength ? parseInt(this.take) : this.displayLength;
    this.pageOne();
  };

  _proto.filterList = function filterList(value, options) {
    options.lookupArray = options.lookupArray || new Array(); //If the property is already in filterValues, filter it out

    this.filterValues = this.filterValues.filter(function (obj) {
      return obj.options.filter !== options.filter;
    }); //Parse collection property

    if (options.type.indexOf('obj') == -1 && options.type != 'custom') {
      var properties = options.collectionProperty.split('.');
      var condition = "item";

      for (var j = 0; j < properties.length; j++) {
        if (properties[j].indexOf('[') > -1) {
          condition += properties[j];
        } else {
          condition += "['" + properties[j] + "']";
        }
      }

      options.collectionProperty = condition;
    } //If the filter value is not set to empty, add it to filterValues 


    if (typeof value == 'object' && !(value instanceof Date) && !Array.isArray(value)) value = value.target.value;

    if (value !== "") {
      this.filterValues.push({
        options: options,
        value: value
      });
    } //If there are no filters in filterValues, reset the displayArray to the original list


    if (this.filterValues.length > 0) {
      this.baseArray = this.filter(this.filterValues);
    } else {
      this.baseArray = this.sourceArray;
    }

    this.startRecord = this.DEFAULT_START;
    this.firstVisible = 1;
    this.buildDisplayArray();
    this.lastVisible = parseInt(this.take) < this.displayLength ? parseInt(this.take) : this.displayLength;
    this.pageOne();
  };

  _proto.applyFilters = function applyFilters() {
    this.filter(this.filterValues);
  };

  _proto.filter = function filter(filters) {
    var keep;
    var index = 0;
    var that = this;
    return this.sourceArray.filter(function (item) {
      keep = false;

      for (var i = 0; i < filters.length; i++) {
        var filterItem = filters[i];
        var matchValue = undefined;

        if (filterItem.options.compare.indexOf('custom') > -1) {
          matchValue = true;
        } else {
          try {
            matchValue = eval(filterItem.options.collectionProperty);
          } catch (err) {
            matchValue = false;
          }
        }

        if (matchValue != undefined || filterItem.options.type === "boolean" && matchValue == undefined) {
          switch (filterItem.options.type) {
            case 'custom':
              keep = filterItem.options.filter(filterItem.value, item, that.context);
              break;

            case 'text':
              if (filterItem.options.compare.indexOf('not') > -1) {
                keep = matchValue.toUpperCase().indexOf(filterItem.value.toUpperCase()) == -1;
              } else {
                keep = matchValue.toUpperCase().indexOf(filterItem.value.toUpperCase()) > -1;
              }

              break;

            case 'value':
              if (filterItem.options.compare.indexOf('not') > -1) {
                keep = matchValue != filterItem.value;
              } else {
                keep = matchValue == filterItem.value;
              }

              break;

            case "boolean":
              if (matchValue == undefined) {
                keep = eval(filterItem.value) == false;
              } else {
                keep = matchValue === eval(filterItem.value);
              }

              break;

            case "date":
              switch (filterItem.options.compare) {
                case 'after':
                  if (matchValue) {
                    var dt = moment__WEBPACK_IMPORTED_MODULE_1___default()(matchValue).format('YYYY-MM-DD');
                    keep = moment__WEBPACK_IMPORTED_MODULE_1___default()(dt).isAfter(filters[i].value);
                  }

                  break;

                default:
                  if (matchValue) {
                    var dt = moment__WEBPACK_IMPORTED_MODULE_1___default()(matchValue).format('YYYY-MM-DD');
                    keep = moment__WEBPACK_IMPORTED_MODULE_1___default()(dt).isSame(filters[i].value);
                  }

              }

          }
        }

        if (!keep) break;
      }

      return keep;
    });
  }
  /***************************************************************
   * propertyName - property to sort on unless a surrogate is provided 
   * type - indicates an alternate sorting method
   * surrogateArray - array that contains the property on which you want to sort
   * surrogateProperty - property in surrogate array that matches propertyname
   * sortProperty - property showing in table on which sort is actually performed
   * sortDirectionParam - direction of sort
   */
  ;

  _proto.sortArray = function sortArray(el, options, reSort) {
    var _this = this;

    //propertyName, type, surrogateArray, surrogateProperty, sortProperty, sortDirectionParam){
    if (reSort) {
      if (!this.lastOption || !this.lastEl) return;
      el = this.lastEl;
      options = this.lastOption;
    } else {
      this.lastEl = el;
      this.lastOption = options;
    }

    if (options.sortDirectionParam) this.sortDirection = sortDirectionParam;
    this.sortProperty = options.propertyName;

    if (options.propertyName === this.sortProperty) {
      this.sortDirection *= -1;
    } else {
      this.sortDirection = 1;
    }

    $(".sortable").next().replaceWith('<i class="fa fa-sort"></i>');

    if (this.sortDirection < 0) {
      var icon = '<i class="fa fa-sort-amount-desc" aria-hidden="true"></i>';
    } else {
      var icon = '<i class="fa fa-sort-amount-asc" aria-hidden="true"></i>';
    }

    $(el.target).next().replaceWith(icon);

    if (!options.type) {
      if (options.propertyName.indexOf('.') > -1) {
        var array = options.propertyName.split('.');
      }

      if (array) {
        this.baseArray = this.baseArray.sort(function (a, b) {
          var result = a[array[0]][array[1]] < b[array[0]][array[1]] ? -1 : a[array[0]][array[1]] > b[array[0]][array[1]] ? 1 : 0;
          return result * _this.sortDirection;
        });
      } else {
        this.baseArray = this.baseArray.sort(function (a, b) {
          var result = a[options.propertyName] < b[options.propertyName] ? -1 : a[options.propertyName] > b[options.propertyName] ? 1 : 0;
          return result * _this.sortDirection;
        });
      }
    } else if (options.type == 'custom') {
      if (typeof options.sorter == 'function') {
        var sortArray = this.utils.copyArray(this.baseArray);
        this.baseArray = options.sorter(this.sortProperty, this.sortDirection, sortArray, this.context);
      }
    } else {
      var properties = options.searchProperty.split('.');
      var condition = "item";

      for (var j = 0; j < properties.length; j++) {
        if (properties[j].indexOf('[') > -1) {
          condition += properties[j];
        } else {
          condition += "['" + properties[j] + "']";
        }
      }

      var sortArray = this.utils.copyArray(this.baseArray);
      sortArray.forEach(function (item) {
        var obj = _this.findObj(options.surrogateArray, options.surrogateProperty, eval(condition));

        item[options.propertyName] = obj ? obj[options.propertyName] : null;
      });
      this.baseArray = sortArray.sort(function (a, b) {
        var result = a[options.propertyName] < b[options.propertyName] ? -1 : a[options.propertyName] > b[options.propertyName] ? 1 : 0;
        return result * _this.sortDirection;
      });
    }

    this.startRecord = this.DEFAULT_START;
    this.firstVisible = 1;
    this.buildDisplayArray();
    this.lastVisible = parseInt(this.take) < this.displayLength ? parseInt(this.take) : this.displayLength;
    this.pageOne();
  };

  _proto.findObj = function findObj(surrogateArray, surrogateProperty, propertyValue) {
    for (var i = 0, x = surrogateArray.length; i < x; i++) {
      if (surrogateArray[i][surrogateProperty] == propertyValue) return surrogateArray[i];
    }

    return null;
  };

  _proto.updateArray = function updateArray(sourceArray, sortProperty, sortDirection) {
    var _this2 = this;

    if (sourceArray) {
      this.sourceArray = new Array();
      this.baseArray = new Array();
      this.active = true;
      this.filterValues = new Array();
      sourceArray.forEach(function (item, index) {
        item.baseIndex = index;
        item.originalIndex = index;

        _this2.sourceArray.push(item);

        _this2.baseArray.push(item);
      }); // this.baseArray.forEach(function(item, index){
      //   item.baseIndex = index;
      //   item.originalIndex = index;
      // });

      if (sortProperty) {
        this.baseArray.sort(function (a, b) {
          var result = a[sortProperty] - b[sortProperty];
          return result * sortDirection;
        });
      }

      this.buildDisplayArray();
    }
  };

  _proto.updateArrayMaintainFilters = function updateArrayMaintainFilters(sourceArray, sortProperty, sortDirection) {
    var _this3 = this;

    if (sourceArray) {
      this.sourceArray = new Array();
      this.baseArray = new Array();
      this.active = true;
      sourceArray.forEach(function (item) {
        _this3.sourceArray.push(item);

        _this3.baseArray.push(item);
      });
      if (this.filterValues.length) this.baseArray = this.filter(this.filterValues);
      this.baseArray.forEach(function (item, index) {
        item.baseIndex = index;
        item.originalIndex = index;
      });

      if (sortProperty) {
        this.baseArray.sort(function (a, b) {
          var result = a[sortProperty] - b[sortProperty];
          return result * sortDirection;
        });
      } // this.filter(this.filterValues);


      this.buildDisplayArray();
    }
  };

  _proto.getOriginalIndex = function getOriginalIndex(index) {
    return this.displayArray[index].originalIndex;
  };

  return DataTable;
}()) || _class) || _class);

/***/ }),

/***/ 8741:
/*!**************************************!*\
  !*** ./src/resources/utils/utils.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Utils": function() { return /* binding */ Utils; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery */ 9755);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! toastr */ 8901);
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(toastr__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var aurelia_notification__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! aurelia-notification */ 4204);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! moment */ 381);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _config_appConfig__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../config/appConfig */ 1666);
var _dec, _class;







var Utils = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.inject)(aurelia_notification__WEBPACK_IMPORTED_MODULE_3__.Notification, _config_appConfig__WEBPACK_IMPORTED_MODULE_5__.AppConfig), _dec(_class = /*#__PURE__*/function () {
  function Utils(notification, config) {
    this.config = config;
    this.notification = notification;
    this.notification.waitForMove = true;
    toastr__WEBPACK_IMPORTED_MODULE_2__.options.extendedTimeOut = "1000";
    toastr__WEBPACK_IMPORTED_MODULE_2__.options.timeOut = "1500";
    this.notification.note('it worked'); // toastr.options = {
    //   "closeButton": false,
    //   "debug": false,
    //   "newestOnTop": false,
    //   "progressBar": false,
    //   "positionClass": "toast-top-right",
    //   "preventDuplicates": false,
    //   "onclick": null,
    //   "showDuration": "100",
    //   "hideDuration": "1000",
    //   "timeOut": "1000",
    //   "extendedTimeOut": "1000",
    //   "showEasing": "swing",
    //   "hideEasing": "linear",
    //   "showMethod": "fadeIn",
    //   "hideMethod": "fadeOut"
    // }
  }

  var _proto = Utils.prototype;

  _proto.guid = function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : r & 0x3 | 0x8;
      return v.toString(16);
    });
  }
  /*****************************************************************************
   * Display a notification
   * msg - the message to display
   ****************************************************************************/
  ;

  _proto.showNotification = function showNotification(msg, type) {
    type = type ? type : "success";
    toastr__WEBPACK_IMPORTED_MODULE_2__[type](msg); // this.notification.note(msg);
  }
  /*****************************************************************************
  * Determine users role for authorizations
  ****************************************************************************/
  ;

  _proto.setRole = function setRole(roles) {
    var _this = this;

    var userRole = 1;

    var _loop = function _loop(i) {
      _this.config.ROLES.forEach(function (item) {
        if (roles[i] == item.role) {
          userRole = item.authLevel > userRole ? item.authLevel : userRole;
        }
      });
    };

    for (var i = 0; i < roles.length; i++) {
      _loop(i);
    }

    return userRole;
  }
  /*****************************************************************************
   * Count the the items in an array
   * value - the value to count
   * property - the object property to look for the value
   * itemArray - the array
   ****************************************************************************/
  ;

  _proto.countItems = function countItems(value, property, itemArray) {
    var countArray = itemArray.filter(function (item) {
      return item[property] == value;
    });
    return countArray.length;
  };

  _proto.arrayContainsValue = function arrayContainsValue(array, property, value) {
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
  *************************************************************************/
  ;

  _proto.objectsEqual = function objectsEqual(obj1, obj2, skip) {
    var changes = new Array();
    var skipArray = skip || new Array();

    for (var property in obj1) {
      if (obj1.hasOwnProperty(property)) {
        if (!obj1[property] && !obj2[property] || skipArray.indexOf(property) !== -1) {
          continue;
        } else if (Array.isArray(obj1[property])) {
          if (!this.arraysEqual(obj1[property], obj2[property])) {
            changes.push({
              property: property,
              oldValue: obj2[property].length,
              newValue: obj1[property].length
            });
          }
        } else if (property.indexOf('Date') > -1 || property.indexOf('date') > -1 || obj1[property] instanceof Date) {
          var date1 = new Date(obj1[property]);
          var date2 = new Date(obj2[property]);

          if (!moment__WEBPACK_IMPORTED_MODULE_4___default()(date1).isSame(date2, 'year') || !moment__WEBPACK_IMPORTED_MODULE_4___default()(date1).isSame(date2, 'month') || !moment__WEBPACK_IMPORTED_MODULE_4___default()(date1).isSame(date2, 'day')) {
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
  ;

  _proto.arraysEqual = function arraysEqual(array1, array2) {
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
  ;

  _proto.copyObject = function copyObject(objFrom, objTo, properties) {
    objTo = objTo || new Object();
    ;

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
  ;

  _proto.copyArray = function copyArray(array) {
    var _this2 = this;

    if (array) {
      var newArray = new Array();
      array.forEach(function (item) {
        if (Array.isArray(item)) {
          newArray.push(_this2.copyArray(item));
        } else if (_this2.isObject(item)) {
          newArray.push(_this2.copyObject(item));
        } else {
          newArray.push(item);
        }
      });
      return newArray;
    }

    return null;
  }
  /*********************************************************************************
   * Test of a variable is an object
  *********************************************************************************/
  ;

  _proto.isObject = function isObject(obj) {
    return obj === Object(obj);
  };

  _proto.toCamelCase = function toCamelCase(str) {
    return str.toLowerCase().replace(/['"]/g, '').replace(/\W+/g, ' ').replace(/ (.)/g, function ($1) {
      return $1.toUpperCase();
    }).replace(/ /g, '');
  };

  _proto.lookupValue = function lookupValue(value, array, lookUpProperty, returnProperty) {
    if (!value || !array) {
      return;
    }

    for (var i = 0, x = array.length; i < x; i++) {
      if (array[i][lookUpProperty] == value) {
        return array[i][returnProperty];
      }
    }

    return null;
  };

  _proto.isMobile = function isMobile(device) {
    switch (device) {
      case 'Android':
        return navigator.userAgent.match(/Android/i);
        break;

      case 'iOS':
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        break;

      default:
        return navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone|iPad|iPod/i);
        break;
    } // var isMobile = {
    //     Android: function() {
    //         return navigator.userAgent.match(/Android/i);
    //     },
    //     BlackBerry: function() {
    //         return navigator.userAgent.match(/BlackBerry/i);
    //     },
    //     iOS: function() {
    //         return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    //     },
    //     Opera: function() {
    //         return navigator.userAgent.match(/Opera Mini/i);
    //     },
    //     Windows: function() {
    //         return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    //     },
    //     any: function() {
    //         return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    //     }
    // };

  };

  return Utils;
}()) || _class);

/***/ }),

/***/ 2824:
/*!*******************************************!*\
  !*** ./src/resources/utils/validation.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _class; }
/* harmony export */ });
/* harmony import */ var aurelia_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurelia-framework */ "aurelia-framework");
var _dec, _class2;

/**
 * Created by Ross on 11/30/2015.
 */


var _class = (_dec = (0,aurelia_framework__WEBPACK_IMPORTED_MODULE_0__.transient)(), _dec(_class2 = /*#__PURE__*/function () {
  function _class2() {
    this.ruleGroups = [];
    this.rules = [];

    this.addRule = function (ruleGroup, field, rule, blur) {
      if (blur) {
        var that = this;
        $("#" + field).blur(function () {
          that.validateRule(rule, field);
        });
      }

      var index = -1; //See if rule group exists already

      for (var k = 0; k < this.rules.length; k++) {
        if (this.rules[k].ruleGroup === ruleGroup) {
          index = k;
          break;
        }
      }

      var fieldArray = [];
      var ruleArray = []; //The rules that apply to a field

      if (index === -1) {
        //This is a new rule group
        this.rules.push({
          ruleGroup: ruleGroup,
          fields: fieldArray
        });
        this.rules[this.rules.length - 1].fields[0] = {
          field: field,
          rules: ruleArray
        };
        this.rules[this.rules.length - 1].fields[0].rules = rule;
      } else {
        //Existing rule group
        var found = false; // for(var i = 0; i<this.rules[index].fields.length; i++){
        //   if(this.rules[index].fields[i].field === field){
        //     this.rules[index].fields[i].rules.push(rule);
        //     found = true;
        //     break;
        //   }
        // }

        if (!found) {
          this.rules[index].fields.push({
            field: field,
            rules: ruleArray
          });
          this.rules[index].fields[this.rules[index].fields.length - 1].rules = rule;
        }
      }
    };

    this.validate = function (ruleGroup) {
      var index = -1;

      for (var k = 0; k < this.rules.length; k++) {
        if (this.rules[k].ruleGroup == ruleGroup) {
          index = k;
          break;
        }
      }

      if (index === -1) {
        return true;
      } else {
        var valid = true;

        for (var i = 0; i < this.rules[index].fields.length; i++) {
          var fields = this.rules[index].fields[i];
          var thisValid = true;

          for (var k = 0; k < fields.rules.length; k++) {
            thisValid = true;
            var rules = fields.rules[k];
            thisValid = this.validateRule(rules, fields.field);

            if (!thisValid) {
              valid = false;
              break;
            }
          }
        }
      }

      return valid;
    };

    this._inValidate = function (field, rule) {
      var el = $("#" + field);

      if (el.next().is("span.help-block")) {
        el.next().html(rule.message);
      } else {
        var msg = "<span class='help-block'>{message}</span>".replace("{message}", rule.message);
      }

      if (el.is(':visible')) {
        if (!el.parent().hasClass("has-error")) {
          el.parent().addClass("has-error");

          if (!el.next().is("span.help-block")) {
            el.after(msg);
          }
        }
      }
    };

    this.makeValid = function (field) {
      field.parent().removeClass("has-error");

      if (field.next().is("span.help-block")) {
        field.next().html("");
      }
    };

    this.makeAllValid = function (ruleGroup) {
      var index = -1;

      for (var k = 0; k < this.rules.length; k++) {
        if (this.rules[k].ruleGroup == ruleGroup) {
          index = k;
          break;
        }
      }

      if (index === -1) {
        return true;
      } else {
        for (var i = 0; i < this.rules[index].fields.length; i++) {
          this.makeValid($('#' + this.rules[index].fields[i].field));
        }
      }
    };
  }

  var _proto = _class2.prototype;

  _proto.initialize = function initialize(context) {
    this.context = context;
  }
  /**
   *
   * @param ruleGroup - A group of rules
   * @param field - Field the rule applies to
   * @param rule - Rule is an object - rule: name of the rule, val: Value defining limit, valFunction: custom validation function
     */
  ;

  _proto.validateRule = function validateRule(rules, field) {
    var thisValid = true;

    switch (rules.rule) {
      case "custom":
        thisValid = rules.valFunction(this.context);
        break;

      case "required":
        if (!eval('this.context.' + rules.value) || eval('this.context.' + rules.value).length === 0) {
          thisValid = false;
        }

        break;

      case "min":
        if (eval('this.context.' + rules.value) < rules.ruleValue) {
          thisValid = false;
        }

        break;

      case "max":
        if (eval('this.context.' + rules.value) > rules.ruleValue) {
          thisValid = false;
        }

        break;

      case "length":
        if (eval('this.context.' + rules.value).length > 0 && eval('this.context.' + rules.value).length < rules.ruleValue) {
          thisValid = false;
        }

        break;
    }

    if (thisValid) {
      if (thisValid) this.makeValid($("#" + field));
    } else {
      this._inValidate(field, rules);
    }

    return thisValid;
  };

  _proto.clearRules = function clearRules() {
    this.ruleGroups = [];
    this.rules = [];
  };

  _proto.clearRuleGroup = function clearRuleGroup(group) {
    var _this = this;

    this.ruleGroups[group] = "";
    this.rules.forEach(function (rule, index) {
      if (rule.ruleGroup == group) {
        _this.rules.splice(index, 1);
      }
    });
  };

  return _class2;
}()) || _class2);



/***/ }),

/***/ "resources/value-converters/activate-button":
/*!***********************************************************!*\
  !*** ./src/resources/value-converters/activate-button.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ActivateButtonValueConverter": function() { return /* binding */ ActivateButtonValueConverter; }
/* harmony export */ });
var ActivateButtonValueConverter = /*#__PURE__*/function () {
  function ActivateButtonValueConverter() {}

  var _proto = ActivateButtonValueConverter.prototype;

  _proto.toView = function toView(value) {
    if (value == '02') {
      return '<i class="fa fa-toggle-on fa-lg" aria-hidden="true"></i>';
    } else {
      return '<i class="fa fa-toggle-off fa-lg" aria-hidden="true"></i>';
    }
  };

  return ActivateButtonValueConverter;
}();

/***/ }),

/***/ "resources/value-converters/check-box":
/*!*****************************************************!*\
  !*** ./src/resources/value-converters/check-box.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CheckBoxValueConverter": function() { return /* binding */ CheckBoxValueConverter; }
/* harmony export */ });
var CheckBoxValueConverter = /*#__PURE__*/function () {
  function CheckBoxValueConverter() {}

  var _proto = CheckBoxValueConverter.prototype;

  _proto.toView = function toView(value) {
    if (value) {
      return '<i class="fa fa-check-square-o"></i>';
    } else {
      return '<i class="fa fa-square-o"></i>';
    }
  };

  return CheckBoxValueConverter;
}();

/***/ }),

/***/ "resources/value-converters/course-name":
/*!*******************************************************!*\
  !*** ./src/resources/value-converters/course-name.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CourseNameValueConverter": function() { return /* binding */ CourseNameValueConverter; }
/* harmony export */ });
var CourseNameValueConverter = /*#__PURE__*/function () {
  function CourseNameValueConverter() {}

  var _proto = CourseNameValueConverter.prototype;

  _proto.toView = function toView(value, array, sandboxID, sandboxName) {
    if (value && array) {
      if (value === sandboxID) return sandboxName;

      for (var i = 0; i < array.length; i++) {
        if (value._id === array[i]._id) {
          return array[i].name;
        }
      }
    }

    return "";
  };

  return CourseNameValueConverter;
}();

/***/ }),

/***/ "resources/value-converters/date-format":
/*!*******************************************************!*\
  !*** ./src/resources/value-converters/date-format.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DateFormatValueConverter": function() { return /* binding */ DateFormatValueConverter; }
/* harmony export */ });
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ 381);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);

var DateFormatValueConverter = /*#__PURE__*/function () {
  function DateFormatValueConverter() {}

  var _proto = DateFormatValueConverter.prototype;

  _proto.toView = function toView(value, format, fromNow) {
    if (format === void 0) {
      format = 'MMM Do YYYY';
    }

    if (value === undefined || value === null) {
      return;
    }

    if (fromNow) {
      var formattedDate = moment__WEBPACK_IMPORTED_MODULE_0___default()(value).calendar();
    } else {
      var formattedDate = moment__WEBPACK_IMPORTED_MODULE_0___default()(value).format(format);
    }

    return formattedDate === "Invalid date" ? "" : formattedDate;
  };

  return DateFormatValueConverter;
}();

/***/ }),

/***/ "resources/value-converters/filter-clients":
/*!**********************************************************!*\
  !*** ./src/resources/value-converters/filter-clients.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FilterClientsValueConverter": function() { return /* binding */ FilterClientsValueConverter; }
/* harmony export */ });
var FilterClientsValueConverter = /*#__PURE__*/function () {
  function FilterClientsValueConverter() {}

  var _proto = FilterClientsValueConverter.prototype;

  _proto.toView = function toView(array, unassigned, unassignedCode, sandbox, sandboxCode, product) {
    if (array) {
      // if(!clientRelevant) return array;
      if (product) {
        array = array.filter(function (item) {
          return item.productId === product;
        });
      }

      if (sandbox) {
        array = array.filter(function (item) {
          return item.clientStatus == sandboxCode;
        });
      } else if (unassigned) {
        array = array.filter(function (item) {
          return item.clientStatus == unassignedCode;
        });
      } // else {
      //     array = array.filter((item) => {
      //         return item.clientStatus != sandboxCode;
      //     })
      // }

    }

    return array;
  };

  return FilterClientsValueConverter;
}();

/***/ }),

/***/ "resources/value-converters/filter-sessions":
/*!***********************************************************!*\
  !*** ./src/resources/value-converters/filter-sessions.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "filterSessionsValueConverter": function() { return /* binding */ filterSessionsValueConverter; }
/* harmony export */ });
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ 381);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);

var filterSessionsValueConverter = /*#__PURE__*/function () {
  function filterSessionsValueConverter() {}

  var _proto = filterSessionsValueConverter.prototype;

  _proto.toView = function toView(array, filter, keep, sort) {
    if (array && filter) {
      var activePresent = false;
      var requestPresent = false;
      array.forEach(function (item) {
        if (item.sessionStatus === 'Active') activePresent = true;
        if (item.sessionStatus === 'Requests') requestPresent = true;
      });

      if (activePresent && requestPresent) {
        return array.filter(function (item) {
          return item['sessionStatus'] === keep;
        });
      }
    }

    if (sort) {
      var sortOrder = sort ? -1 : 1;
      array.sort(function (a, b) {
        var sort = moment__WEBPACK_IMPORTED_MODULE_0___default()(a['startDate']).isAfter(b['startDate']) ? 1 : -1;
        return sort * sortOrder;
      });
    }

    return array;
  };

  return filterSessionsValueConverter;
}();

/***/ }),

/***/ "resources/value-converters/format-phone":
/*!********************************************************!*\
  !*** ./src/resources/value-converters/format-phone.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FormatPhoneValueConverter": function() { return /* binding */ FormatPhoneValueConverter; }
/* harmony export */ });
var FormatPhoneValueConverter = /*#__PURE__*/function () {
  function FormatPhoneValueConverter() {}

  var _proto = FormatPhoneValueConverter.prototype;

  _proto.toView = function toView(value, ext) {
    if (!value) return;
    var phone = value.substring(0, 3) + "-" + value.substring(3, 6) + "-" + value.substring(6, 10);
    if (ext) phone += ' ext. ' + ext;
    return phone;
  };

  return FormatPhoneValueConverter;
}();

/***/ }),

/***/ "resources/value-converters/get-array-value":
/*!***********************************************************!*\
  !*** ./src/resources/value-converters/get-array-value.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GetArrayValueValueConverter": function() { return /* binding */ GetArrayValueValueConverter; }
/* harmony export */ });
var GetArrayValueValueConverter = /*#__PURE__*/function () {
  function GetArrayValueValueConverter() {}

  var _proto = GetArrayValueValueConverter.prototype;

  _proto.toView = function toView(value, array, property, indexAdjust) {
    if (value != undefined && array && property) {
      var index = indexAdjust ? parseInt(value) + indexAdjust : parseInt(value);
      return array[index][property];
    }

    return "";
  };

  return GetArrayValueValueConverter;
}();

/***/ }),

/***/ "resources/value-converters/gravatar-url":
/*!********************************************************!*\
  !*** ./src/resources/value-converters/gravatar-url.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GravatarUrlValueConverter": function() { return /* binding */ GravatarUrlValueConverter; }
/* harmony export */ });
/**
 * Created by Ross on 12/11/2015.
 */
var GravatarUrlValueConverter = /*#__PURE__*/function () {
  function GravatarUrlValueConverter() {}

  var _proto = GravatarUrlValueConverter.prototype;

  _proto.toView = function toView(email, size) {
    if (email) {
      var size = size || 80;
      var html = '<img class="img-circle" src="https://secure.gravatar.com/avatar/' + CryptoJS.MD5(email.toLowerCase()) + '.jpg?s=' + size + '"/>';
      return html;
    } else {
      return "<i class='fa fa-file-text'></i>";
    }
  };

  return GravatarUrlValueConverter;
}();

/***/ }),

/***/ "resources/value-converters/help-ticket-statuses":
/*!****************************************************************!*\
  !*** ./src/resources/value-converters/help-ticket-statuses.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HelpTicketStatusesValueConverter": function() { return /* binding */ HelpTicketStatusesValueConverter; }
/* harmony export */ });
var HelpTicketStatusesValueConverter = /*#__PURE__*/function () {
  function HelpTicketStatusesValueConverter() {}

  var _proto = HelpTicketStatusesValueConverter.prototype;

  _proto.toView = function toView(array, remove) {
    if (array === undefined) return;
    if (remove === undefined) return array;
    var newArray = new Array();
    array.forEach(function (item) {
      if (remove.indexOf(item.code) === -1) {
        newArray.push(item);
      }
    });
    return newArray;
  };

  return HelpTicketStatusesValueConverter;
}();

/***/ }),

/***/ "resources/value-converters/help-ticket-subtypes":
/*!****************************************************************!*\
  !*** ./src/resources/value-converters/help-ticket-subtypes.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HelpTicketSubtypesValueConverter": function() { return /* binding */ HelpTicketSubtypesValueConverter; }
/* harmony export */ });
var HelpTicketSubtypesValueConverter = /*#__PURE__*/function () {
  function HelpTicketSubtypesValueConverter() {}

  var _proto = HelpTicketSubtypesValueConverter.prototype;

  _proto.toView = function toView(array) {
    if (array === undefined) return;
    var newArray = new Array();
    array.forEach(function (item) {
      item.subtypes.forEach(function (itemSub) {
        newArray.push(itemSub);
      });
    });
    return newArray;
  };

  return HelpTicketSubtypesValueConverter;
}();

/***/ }),

/***/ "resources/value-converters/help-ticket-type":
/*!************************************************************!*\
  !*** ./src/resources/value-converters/help-ticket-type.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HelpTicketTypeValueConverter": function() { return /* binding */ HelpTicketTypeValueConverter; }
/* harmony export */ });
var HelpTicketTypeValueConverter = /*#__PURE__*/function () {
  function HelpTicketTypeValueConverter() {}

  var _proto = HelpTicketTypeValueConverter.prototype;

  _proto.toView = function toView(value, array) {
    if (value === undefined || array === undefined) return;
    if (value === "OTHER") return "Other General";

    for (var j = 0; j < array.length; j++) {
      for (var i = 0; i < array[j].subtypes.length; i++) {
        if (array[j].subtypes[i].type === value) return array[j].subtypes[i].description;
      }
    }

    return "";
  };

  return HelpTicketTypeValueConverter;
}();

/***/ }),

/***/ "resources/value-converters/idsRequested":
/*!********************************************************!*\
  !*** ./src/resources/value-converters/idsRequested.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IdsRequestedValueConverter": function() { return /* binding */ IdsRequestedValueConverter; }
/* harmony export */ });
var IdsRequestedValueConverter = /*#__PURE__*/function () {
  function IdsRequestedValueConverter() {}

  var _proto = IdsRequestedValueConverter.prototype;

  _proto.toView = function toView(value) {
    if (value) {
      value.graduateIds = value.graduateIds === null ? 0 : value.graduateIds;
      value.undergradIds = value.undergradIds === null ? 0 : value.undergradIds;
      return parseInt(value.graduateIds) + parseInt(value.undergradIds);
    }

    return 0;
  };

  return IdsRequestedValueConverter;
}();

/***/ }),

/***/ "resources/value-converters/info-filter":
/*!*******************************************************!*\
  !*** ./src/resources/value-converters/info-filter.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InfoFilterValueConverter": function() { return /* binding */ InfoFilterValueConverter; }
/* harmony export */ });
var InfoFilterValueConverter = /*#__PURE__*/function () {
  function InfoFilterValueConverter() {}

  var _proto = InfoFilterValueConverter.prototype;

  _proto.toView = function toView(array, value, length) {
    if (value && array) {
      return array.filter(function (item) {
        return item.itemType == value;
      });
    }

    return length ? array.length > 0 : array;
  };

  return InfoFilterValueConverter;
}();

/***/ }),

/***/ "resources/value-converters/lookup-ht-status":
/*!************************************************************!*\
  !*** ./src/resources/value-converters/lookup-ht-status.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LookupHTStatusValueConverter": function() { return /* binding */ LookupHTStatusValueConverter; }
/* harmony export */ });
var LookupHTStatusValueConverter = /*#__PURE__*/function () {
  function LookupHTStatusValueConverter() {}

  var _proto = LookupHTStatusValueConverter.prototype;

  _proto.toView = function toView(value, array) {
    if (value && array) {
      if (value > 6) {
        value = parseInt(value / 10);
      }

      for (var i = 0; i < array.length; i++) {
        if (value == array[i].code) {
          return array[i].description;
        }
      }
    }

    return "";
  };

  return LookupHTStatusValueConverter;
}();

/***/ }),

/***/ "resources/value-converters/lookup-value":
/*!********************************************************!*\
  !*** ./src/resources/value-converters/lookup-value.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LookupValueValueConverter": function() { return /* binding */ LookupValueValueConverter; }
/* harmony export */ });
var LookupValueValueConverter = /*#__PURE__*/function () {
  function LookupValueValueConverter() {}

  var _proto = LookupValueValueConverter.prototype;

  _proto.toView = function toView(value, array, key, property) {
    if (value && array && property && key) {
      for (var i = 0; i < array.length; i++) {
        if (value == array[i][key]) {
          return array[i][property];
        }
      }
    }

    return "";
  };

  return LookupValueValueConverter;
}();

/***/ }),

/***/ "resources/value-converters/onoff-switch":
/*!********************************************************!*\
  !*** ./src/resources/value-converters/onoff-switch.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OnoffSwitchValueConverter": function() { return /* binding */ OnoffSwitchValueConverter; }
/* harmony export */ });
var OnoffSwitchValueConverter = /*#__PURE__*/function () {
  function OnoffSwitchValueConverter() {}

  var _proto = OnoffSwitchValueConverter.prototype;

  _proto.toView = function toView(value) {
    if (value == 'false') {
      return '<i class="fa fa-toggle-on fa-lg" aria-hidden="true"></i> Turn On';
    } else {
      return '<i class="fa fa-toggle-off fa-lg" aria-hidden="true"></i> Turn Off';
    }
  };

  return OnoffSwitchValueConverter;
}();

/***/ }),

/***/ "resources/value-converters/overlap":
/*!***************************************************!*\
  !*** ./src/resources/value-converters/overlap.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OverlapValueConverter": function() { return /* binding */ OverlapValueConverter; }
/* harmony export */ });
var OverlapValueConverter = /*#__PURE__*/function () {
  function OverlapValueConverter() {}

  var _proto = OverlapValueConverter.prototype;

  _proto.toView = function toView(value) {
    if (value) {
      return value == 'danger' ? 'Overlapping Range' : 'Valid Range';
    }

    return "";
  };

  return OverlapValueConverter;
}();

/***/ }),

/***/ "resources/value-converters/parse-assignments":
/*!*************************************************************!*\
  !*** ./src/resources/value-converters/parse-assignments.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ParseAssignmentsValueConverter": function() { return /* binding */ ParseAssignmentsValueConverter; }
/* harmony export */ });
var ParseAssignmentsValueConverter = /*#__PURE__*/function () {
  function ParseAssignmentsValueConverter() {}

  var _proto = ParseAssignmentsValueConverter.prototype;

  _proto.toView = function toView(value, systems) {
    if (!value || value === null) {
      return "";
    } else {
      var assignments = "";
      value.forEach(function (item) {
        var system = "";

        for (var i = 0; i < systems.length; i++) {
          if (systems[i]._id === item.systemId) {
            system = systems[i].sid;
            break;
          }
        }

        if (system === "") system = "NA";
        assignments += system + " " + item.client + "<br>";
      });
      return assignments;
    }
  };

  return ParseAssignmentsValueConverter;
}();

/***/ }),

/***/ "resources/value-converters/person-status-button":
/*!****************************************************************!*\
  !*** ./src/resources/value-converters/person-status-button.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PersonStatusButtonValueConverter": function() { return /* binding */ PersonStatusButtonValueConverter; }
/* harmony export */ });
var PersonStatusButtonValueConverter = /*#__PURE__*/function () {
  function PersonStatusButtonValueConverter() {}

  var _proto = PersonStatusButtonValueConverter.prototype;

  _proto.toView = function toView(value) {
    if (!value) return;

    switch (value) {
      case '01':
        return '<span bootstrap-tooltip data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Deactivate"><i class="fa fa-toggle-off" aria-hidden="true"></i></span>';
        break;

      case '02':
        return '<span bootstrap-tooltip data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Activate"><i class="fa fa-toggle-on" aria-hidden="true"></i></span>';
        break;

      default:
        return "";
    }
  };

  return PersonStatusButtonValueConverter;
}();

/***/ }),

/***/ "resources/value-converters/phone-number":
/*!********************************************************!*\
  !*** ./src/resources/value-converters/phone-number.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PhoneNumberValueConverter": function() { return /* binding */ PhoneNumberValueConverter; }
/* harmony export */ });
var PhoneNumberValueConverter = /*#__PURE__*/function () {
  function PhoneNumberValueConverter() {}

  var _proto = PhoneNumberValueConverter.prototype;

  _proto.toView = function toView(value, masks, country, ext) {
    // var mask = "___-___-____";
    if (!country || country === '99') return value;

    if (value) {
      value = value.replace(/ /g, '');
      value = value.replace(/-/g, '');
      var mask = "";
      var returnValue = "";

      for (var i = 0; i < masks.length; i++) {
        if (masks[i].country === country) {
          mask = masks[i].mask;
          break;
        }
      }

      if (mask) {
        var numChars = mask.length;

        for (var j = 0; j < numChars; j++) {
          var digit = mask.substr(0, 1);
          mask = mask.slice(1);

          if (digit === '9') {
            returnValue += value.substr(0, 1);
            value = value.slice(1);
          } else {
            returnValue += digit;
          }
        }
      } else {
        return value;
      }

      if (ext) returnValue += ' ext. ' + ext;
      return returnValue; // if(value.length > 10) value = value.substr(0,10);
      // if(value.length === 0){
      // 	return mask;
      // }
      // else if(value.length <= 3){
      //   return value;// + mask.substr(value.length);
      // } else if (value.length > 3 && value.length <= 6) {
      //   return value.substr(0,3) + "-" + value.substr(3, value.length - 3);// + mask.substr(value.length + 1);
      // } else {
      //   return value.substr(0,3) + "-" + value.substr(3,3) + "-" + value.substr(6,value.length);// + mask.substr(value.length + 2);
      // }
    }
  };

  return PhoneNumberValueConverter;
}();

/***/ }),

/***/ "resources/value-converters/session-name":
/*!********************************************************!*\
  !*** ./src/resources/value-converters/session-name.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SessionNameValueConverter": function() { return /* binding */ SessionNameValueConverter; }
/* harmony export */ });
var SessionNameValueConverter = /*#__PURE__*/function () {
  function SessionNameValueConverter() {}

  var _proto = SessionNameValueConverter.prototype;

  _proto.toView = function toView(value, array) {
    if (value === undefined || array === undefined) return;

    for (var i = 0; i < array.length; i++) {
      if (value === array[i]._id) {
        return array[i].session + " " + array[i].year;
      }
    }

    return "Unknown";
  };

  return SessionNameValueConverter;
}();

/***/ }),

/***/ "resources/value-converters/session-status-button":
/*!*****************************************************************!*\
  !*** ./src/resources/value-converters/session-status-button.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SessionStatusButtonValueConverter": function() { return /* binding */ SessionStatusButtonValueConverter; }
/* harmony export */ });
var SessionStatusButtonValueConverter = /*#__PURE__*/function () {
  function SessionStatusButtonValueConverter() {}

  var _proto = SessionStatusButtonValueConverter.prototype;

  _proto.toView = function toView(value) {
    if (!value) return;

    switch (value) {
      case 'Active':
        return '<span bootstrap-tooltip data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Close"><i class="fa fa-hourglass-end" aria-hidden="true"></i></span>';
        break;

      case 'Requests':
        return '<span bootstrap-tooltip data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Activate"><i class="fa fa-check-square-o" aria-hidden="true"></i></span>';
        break;

      case 'Next':
        return '<span bootstrap-tooltip data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Open"><i class="fa fa-cart-plus" aria-hidden="true"></i></span>';
        break;

      default:
        return "";
    }
  };

  return SessionStatusButtonValueConverter;
}();

/***/ }),

/***/ "resources/value-converters/session-type":
/*!********************************************************!*\
  !*** ./src/resources/value-converters/session-type.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SessionTypeValueConverter": function() { return /* binding */ SessionTypeValueConverter; }
/* harmony export */ });
var SessionTypeValueConverter = /*#__PURE__*/function () {
  function SessionTypeValueConverter() {}

  var _proto = SessionTypeValueConverter.prototype;

  _proto.toView = function toView(array, value) {
    var sessions = [];
    var statuses = value.split(':');
    if (value === undefined || array === undefined) return sessions;
    array.forEach(function (session) {
      if (statuses.indexOf(session.sessionStatus) > -1) {
        sessions.push(session);
      }
    });
    return sessions;
  };

  return SessionTypeValueConverter;
}();

/***/ }),

/***/ "resources/value-converters/session":
/*!***************************************************!*\
  !*** ./src/resources/value-converters/session.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SessionValueConverter": function() { return /* binding */ SessionValueConverter; }
/* harmony export */ });
var SessionValueConverter = /*#__PURE__*/function () {
  function SessionValueConverter() {}

  var _proto = SessionValueConverter.prototype;

  _proto.toView = function toView(value, array) {
    var openSessions = [];
    if (value === undefined || array === undefined) return;

    for (var i = 0; i < array.length; i++) {
      if (value === array[i]._id && array[i].status !== 'Next') {
        return array[i].session + " " + array[i].year;
      }
    }

    return "Unknown";
  };

  return SessionValueConverter;
}();

/***/ }),

/***/ "resources/value-converters/sort-array":
/*!******************************************************!*\
  !*** ./src/resources/value-converters/sort-array.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SortArrayValueConverter": function() { return /* binding */ SortArrayValueConverter; }
/* harmony export */ });
var SortArrayValueConverter = /*#__PURE__*/function () {
  function SortArrayValueConverter() {}

  var _proto = SortArrayValueConverter.prototype;

  _proto.toView = function toView(array, propertyName, direction) {
    var _this = this;

    if (array && propertyName) {
      this.sortDirection = direction === "ASC" ? 1 : -1;
      return array.sort(function (a, b) {
        var result = a[propertyName] < b[propertyName] ? -1 : a[propertyName] > b[propertyName] ? 1 : 0;
        return result * _this.sortDirection;
      });
    }
  };

  return SortArrayValueConverter;
}();

/***/ }),

/***/ "resources/value-converters/sort-date-time":
/*!**********************************************************!*\
  !*** ./src/resources/value-converters/sort-date-time.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SortDateTimeValueConverter": function() { return /* binding */ SortDateTimeValueConverter; }
/* harmony export */ });
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ 381);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);

var SortDateTimeValueConverter = /*#__PURE__*/function () {
  function SortDateTimeValueConverter() {}

  var _proto = SortDateTimeValueConverter.prototype;

  _proto.toView = function toView(array, propertyName, sortProp, tech, trim) {
    if (array === undefined) return;
    var sortOrder = sortProp === "ASC" ? 1 : -1;
    var sortArray = [];
    var firstItem;
    array.forEach(function (item, index) {
      if (index === 0) {
        firstItem = item;
      } else {
        if (tech || !tech && !item.confidential) sortArray.push(item);
        ;
      }
    });
    sortArray.sort(function (a, b) {
      var sort = moment__WEBPACK_IMPORTED_MODULE_0___default()(a[propertyName]).isAfter(b[propertyName]) ? 1 : -1;
      return sort * sortOrder;
    });
    if (!trim) sortArray.unshift(firstItem);
    return sortArray;
  };

  return SortDateTimeValueConverter;
}();

/***/ }),

/***/ "resources/value-converters/system-list":
/*!*******************************************************!*\
  !*** ./src/resources/value-converters/system-list.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SystemListValueConverter": function() { return /* binding */ SystemListValueConverter; }
/* harmony export */ });
var SystemListValueConverter = /*#__PURE__*/function () {
  function SystemListValueConverter() {}

  var _proto = SystemListValueConverter.prototype;

  _proto.toView = function toView(array) {
    if (array !== undefined && array.length > 0) {
      var list = "";

      for (var i = 0; i < array.length; i++) {
        list += array[i].sid + " ";
      }

      return list;
    }

    return "";
  };

  return SystemListValueConverter;
}();

/***/ }),

/***/ "resources/value-converters/to-uppercase":
/*!********************************************************!*\
  !*** ./src/resources/value-converters/to-uppercase.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ToUppercaseValueConverter": function() { return /* binding */ ToUppercaseValueConverter; }
/* harmony export */ });
var ToUppercaseValueConverter = /*#__PURE__*/function () {
  function ToUppercaseValueConverter() {}

  var _proto = ToUppercaseValueConverter.prototype;

  _proto.toView = function toView(value) {
    if (value) {
      return value.toUpperCase();
    }
  };

  return ToUppercaseValueConverter;
}();

/***/ }),

/***/ "resources/value-converters/translate-status":
/*!************************************************************!*\
  !*** ./src/resources/value-converters/translate-status.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TranslateStatusValueConverter": function() { return /* binding */ TranslateStatusValueConverter; }
/* harmony export */ });
/**
 * Created by Ross on 1/21/2016.
 */
var TranslateStatusValueConverter = /*#__PURE__*/function () {
  function TranslateStatusValueConverter() {}

  var _proto = TranslateStatusValueConverter.prototype;

  _proto.toView = function toView(value) {
    return value ? "Active" : "Inactive";
  };

  return TranslateStatusValueConverter;
}();

/***/ }),

/***/ "resources/styles/styles.css":
/*!*****************************************!*\
  !*** ./src/resources/styles/styles.css ***!
  \*****************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ 7537);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ 3645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".hover {\r\n    position:absolute;\r\n    height: 200px;\r\n    width: 600px;\r\n    z-index:99;\r\n    display:none;\r\n    box-shadow: 10px 10px 5px #888888;\r\n    overflow: hidden;\r\n    background-color: white;\r\n    padding: 10px;\r\n}\r\n\r\n.hoverProfile {\r\n    position:absolute;\r\n    height: 250px;\r\n    width: 500px;\r\n    z-index:99;\r\n    display:none;\r\n    box-shadow: 10px 10px 5px #888888;\r\n    overflow: hidden;\r\n    background-color: white;\r\n    padding: 10px;\r\n     right:0;\r\n    bottom:0;\r\n}\r\n\r\n.toolbar {\r\n    position:fixed;\r\n    z-index:1000;\r\n    width:100%;\r\n    top:91px;\r\n    left:0;\r\n    background-color:ghostwhite;\r\n}\r\n\r\n.clickable {\r\n    cursor: pointer;\r\n}\r\n\r\n.positionUnderToolbar{\r\n    margin-top:50px;\r\n}\r\n\r\n.topMargin {\r\n    margin-top: 25px;\r\n}\r\n\r\n.smallTopMargin {\r\n  margin-top: 5px;\r\n}\r\n\r\n.bottomMargin {\r\n    margin-bottom: 25px;\r\n}\r\n\r\n.leftMargin {\r\n    margin-left: 25px;\r\n}\r\n\r\n.rightMargin {\r\n  margin-right: 25px;\r\n}\r\n\r\n.smallLeftMargin {\r\n    margin-left: 10px;\r\n}\r\n\r\n.bigTopMargin {\r\n    margin-top: 50px;\r\n}\r\n\r\n.bigLeftMargin {\r\n    margin-left: 50px;\r\n}\r\n\r\n.smallMarginTop {\r\n    margin-top: 5px;\r\n}\r\n\r\n.smallMarginRight {\r\n    margin-right: 10px; \r\n}\r\n\r\n.overFlow {\r\n    overflow-y:scroll;\r\n}\r\n\r\n.subMenu{\r\n    position: relative;\r\n    top: -5px;\r\n    left: 0px;\r\n    width: 100%;\r\n}\r\n\r\n.subMenu-container {\r\n    position: fixed; /* Set the navbar to fixed position */\r\n    top: 5rem;\r\n    width: 100%;\r\n    z-index:99;\r\n} \r\n\r\n.positionUnderToolbar{\r\n    margin-top:50px;\r\n}\r\n\r\n.page-host {\r\n    margin-top: 10rem;\r\n}\r\n\r\n.banner {\r\n    height: 50px;\r\n    width: 100%;\r\n    background-color: white;\r\n    border-bottom-style: solid;\r\n    border-bottom-width: 1px;\r\n}\r\n\r\n.banner #notice {\r\n    margin-left: 30px;\r\n    font-size: 1.25em;\r\n    color: indianred;\r\n}\r\n\r\n.browse .textContainer {\r\n    height: 430px;\r\n    line-height: 400px;\r\n}\r\n\r\n.textContainer h4 {\r\n    vertical-align: middle;\r\n    display: inline-block;\r\n}\r\n\r\n#loading {\r\n    background: repeat scroll 0 0;\r\n    height: 100%;\r\n    left: 0;\r\n    margin: auto;\r\n    position: fixed;\r\n    top: 0;\r\n    width: 100%;\r\n    z-index:99;\r\n}\r\n\r\n.bokeh {\r\n    border: 0.01em solid rgba(150, 150, 150, 0.1);\r\n    border-radius: 50%;\r\n    font-size: 100px;\r\n    height: 1em;\r\n    list-style: outside none none;\r\n    margin: 0 auto;\r\n    position: relative;\r\n    top: 35%;\r\n    width: 1em;\r\n    z-index: 2147483647;\r\n}\r\n.bokeh li {\r\n    border-radius: 50%;\r\n    height: 0.2em;\r\n    position: absolute;\r\n    width: 0.2em;\r\n}\r\n.bokeh li:nth-child(1) {\r\n    animation: 1.13s linear 0s normal none infinite running rota, 3.67s ease-in-out 0s alternate none infinite running opa;\r\n    background: #00c176 none repeat scroll 0 0;\r\n    left: 50%;\r\n    margin: 0 0 0 -0.1em;\r\n    top: 0;\r\n    transform-origin: 50% 250% 0;\r\n}\r\n.bokeh li:nth-child(2) {\r\n    animation: 1.86s linear 0s normal none infinite running rota, 4.29s ease-in-out 0s alternate none infinite running opa;\r\n    background: #ff003c none repeat scroll 0 0;\r\n    margin: -0.1em 0 0;\r\n    right: 0;\r\n    top: 50%;\r\n    transform-origin: -150% 50% 0;\r\n}\r\n.bokeh li:nth-child(3) {\r\n    animation: 1.45s linear 0s normal none infinite running rota, 5.12s ease-in-out 0s alternate none infinite running opa;\r\n    background: #fabe28 none repeat scroll 0 0;\r\n    bottom: 0;\r\n    left: 50%;\r\n    margin: 0 0 0 -0.1em;\r\n    transform-origin: 50% -150% 0;\r\n}\r\n.bokeh li:nth-child(4) {\r\n    animation: 1.72s linear 0s normal none infinite running rota, 5.25s ease-in-out 0s alternate none infinite running opa;\r\n    background: #88c100 none repeat scroll 0 0;\r\n    margin: -0.1em 0 0;\r\n    top: 50%;\r\n    transform-origin: 250% 50% 0;\r\n}\r\n\r\n.translucent{\r\n    opacity: 0.2;\r\n}\r\n\r\n@keyframes opa {\r\n12% {\r\n    opacity: 0.8;\r\n}\r\n19.5% {\r\n    opacity: 0.88;\r\n}\r\n37.2% {\r\n    opacity: 0.64;\r\n}\r\n40.5% {\r\n    opacity: 0.52;\r\n}\r\n52.7% {\r\n    opacity: 0.69;\r\n}\r\n60.2% {\r\n    opacity: 0.6;\r\n}\r\n66.6% {\r\n    opacity: 0.52;\r\n}\r\n70% {\r\n    opacity: 0.63;\r\n}\r\n79.9% {\r\n    opacity: 0.6;\r\n}\r\n84.2% {\r\n    opacity: 0.75;\r\n}\r\n91% {\r\n    opacity: 0.87;\r\n}\r\n}\r\n\r\n@keyframes rota {\r\n    100% {\r\n        transform: rotate(360deg);\r\n    }\r\n}", "",{"version":3,"sources":["webpack://./src/resources/styles/styles.css"],"names":[],"mappings":"AAAA;IACI,iBAAiB;IACjB,aAAa;IACb,YAAY;IACZ,UAAU;IACV,YAAY;IACZ,iCAAiC;IACjC,gBAAgB;IAChB,uBAAuB;IACvB,aAAa;AACjB;;AAEA;IACI,iBAAiB;IACjB,aAAa;IACb,YAAY;IACZ,UAAU;IACV,YAAY;IACZ,iCAAiC;IACjC,gBAAgB;IAChB,uBAAuB;IACvB,aAAa;KACZ,OAAO;IACR,QAAQ;AACZ;;AAEA;IACI,cAAc;IACd,YAAY;IACZ,UAAU;IACV,QAAQ;IACR,MAAM;IACN,2BAA2B;AAC/B;;AAEA;IACI,eAAe;AACnB;;AAEA;IACI,eAAe;AACnB;;AAEA;IACI,gBAAgB;AACpB;;AAEA;EACE,eAAe;AACjB;;AAEA;IACI,mBAAmB;AACvB;;AAEA;IACI,iBAAiB;AACrB;;AAEA;EACE,kBAAkB;AACpB;;AAEA;IACI,iBAAiB;AACrB;;AAEA;IACI,gBAAgB;AACpB;;AAEA;IACI,iBAAiB;AACrB;;AAEA;IACI,eAAe;AACnB;;AAEA;IACI,kBAAkB;AACtB;;AAEA;IACI,iBAAiB;AACrB;;AAEA;IACI,kBAAkB;IAClB,SAAS;IACT,SAAS;IACT,WAAW;AACf;;AAEA;IACI,eAAe,EAAE,qCAAqC;IACtD,SAAS;IACT,WAAW;IACX,UAAU;AACd;;AAEA;IACI,eAAe;AACnB;;AAEA;IACI,iBAAiB;AACrB;;AAEA;IACI,YAAY;IACZ,WAAW;IACX,uBAAuB;IACvB,0BAA0B;IAC1B,wBAAwB;AAC5B;;AAEA;IACI,iBAAiB;IACjB,iBAAiB;IACjB,gBAAgB;AACpB;;AAEA;IACI,aAAa;IACb,kBAAkB;AACtB;;AAEA;IACI,sBAAsB;IACtB,qBAAqB;AACzB;;AAEA;IACI,6BAA6B;IAC7B,YAAY;IACZ,OAAO;IACP,YAAY;IACZ,eAAe;IACf,MAAM;IACN,WAAW;IACX,UAAU;AACd;;AAEA;IACI,6CAA6C;IAC7C,kBAAkB;IAClB,gBAAgB;IAChB,WAAW;IACX,6BAA6B;IAC7B,cAAc;IACd,kBAAkB;IAClB,QAAQ;IACR,UAAU;IACV,mBAAmB;AACvB;AACA;IACI,kBAAkB;IAClB,aAAa;IACb,kBAAkB;IAClB,YAAY;AAChB;AACA;IACI,sHAAsH;IACtH,0CAA0C;IAC1C,SAAS;IACT,oBAAoB;IACpB,MAAM;IACN,4BAA4B;AAChC;AACA;IACI,sHAAsH;IACtH,0CAA0C;IAC1C,kBAAkB;IAClB,QAAQ;IACR,QAAQ;IACR,6BAA6B;AACjC;AACA;IACI,sHAAsH;IACtH,0CAA0C;IAC1C,SAAS;IACT,SAAS;IACT,oBAAoB;IACpB,6BAA6B;AACjC;AACA;IACI,sHAAsH;IACtH,0CAA0C;IAC1C,kBAAkB;IAClB,QAAQ;IACR,4BAA4B;AAChC;;AAEA;IACI,YAAY;AAChB;;AAEA;AACA;IACI,YAAY;AAChB;AACA;IACI,aAAa;AACjB;AACA;IACI,aAAa;AACjB;AACA;IACI,aAAa;AACjB;AACA;IACI,aAAa;AACjB;AACA;IACI,YAAY;AAChB;AACA;IACI,aAAa;AACjB;AACA;IACI,aAAa;AACjB;AACA;IACI,YAAY;AAChB;AACA;IACI,aAAa;AACjB;AACA;IACI,aAAa;AACjB;AACA;;AAEA;IACI;QACI,yBAAyB;IAC7B;AACJ","sourcesContent":[".hover {\r\n    position:absolute;\r\n    height: 200px;\r\n    width: 600px;\r\n    z-index:99;\r\n    display:none;\r\n    box-shadow: 10px 10px 5px #888888;\r\n    overflow: hidden;\r\n    background-color: white;\r\n    padding: 10px;\r\n}\r\n\r\n.hoverProfile {\r\n    position:absolute;\r\n    height: 250px;\r\n    width: 500px;\r\n    z-index:99;\r\n    display:none;\r\n    box-shadow: 10px 10px 5px #888888;\r\n    overflow: hidden;\r\n    background-color: white;\r\n    padding: 10px;\r\n     right:0;\r\n    bottom:0;\r\n}\r\n\r\n.toolbar {\r\n    position:fixed;\r\n    z-index:1000;\r\n    width:100%;\r\n    top:91px;\r\n    left:0;\r\n    background-color:ghostwhite;\r\n}\r\n\r\n.clickable {\r\n    cursor: pointer;\r\n}\r\n\r\n.positionUnderToolbar{\r\n    margin-top:50px;\r\n}\r\n\r\n.topMargin {\r\n    margin-top: 25px;\r\n}\r\n\r\n.smallTopMargin {\r\n  margin-top: 5px;\r\n}\r\n\r\n.bottomMargin {\r\n    margin-bottom: 25px;\r\n}\r\n\r\n.leftMargin {\r\n    margin-left: 25px;\r\n}\r\n\r\n.rightMargin {\r\n  margin-right: 25px;\r\n}\r\n\r\n.smallLeftMargin {\r\n    margin-left: 10px;\r\n}\r\n\r\n.bigTopMargin {\r\n    margin-top: 50px;\r\n}\r\n\r\n.bigLeftMargin {\r\n    margin-left: 50px;\r\n}\r\n\r\n.smallMarginTop {\r\n    margin-top: 5px;\r\n}\r\n\r\n.smallMarginRight {\r\n    margin-right: 10px; \r\n}\r\n\r\n.overFlow {\r\n    overflow-y:scroll;\r\n}\r\n\r\n.subMenu{\r\n    position: relative;\r\n    top: -5px;\r\n    left: 0px;\r\n    width: 100%;\r\n}\r\n\r\n.subMenu-container {\r\n    position: fixed; /* Set the navbar to fixed position */\r\n    top: 5rem;\r\n    width: 100%;\r\n    z-index:99;\r\n} \r\n\r\n.positionUnderToolbar{\r\n    margin-top:50px;\r\n}\r\n\r\n.page-host {\r\n    margin-top: 10rem;\r\n}\r\n\r\n.banner {\r\n    height: 50px;\r\n    width: 100%;\r\n    background-color: white;\r\n    border-bottom-style: solid;\r\n    border-bottom-width: 1px;\r\n}\r\n\r\n.banner #notice {\r\n    margin-left: 30px;\r\n    font-size: 1.25em;\r\n    color: indianred;\r\n}\r\n\r\n.browse .textContainer {\r\n    height: 430px;\r\n    line-height: 400px;\r\n}\r\n\r\n.textContainer h4 {\r\n    vertical-align: middle;\r\n    display: inline-block;\r\n}\r\n\r\n#loading {\r\n    background: repeat scroll 0 0;\r\n    height: 100%;\r\n    left: 0;\r\n    margin: auto;\r\n    position: fixed;\r\n    top: 0;\r\n    width: 100%;\r\n    z-index:99;\r\n}\r\n\r\n.bokeh {\r\n    border: 0.01em solid rgba(150, 150, 150, 0.1);\r\n    border-radius: 50%;\r\n    font-size: 100px;\r\n    height: 1em;\r\n    list-style: outside none none;\r\n    margin: 0 auto;\r\n    position: relative;\r\n    top: 35%;\r\n    width: 1em;\r\n    z-index: 2147483647;\r\n}\r\n.bokeh li {\r\n    border-radius: 50%;\r\n    height: 0.2em;\r\n    position: absolute;\r\n    width: 0.2em;\r\n}\r\n.bokeh li:nth-child(1) {\r\n    animation: 1.13s linear 0s normal none infinite running rota, 3.67s ease-in-out 0s alternate none infinite running opa;\r\n    background: #00c176 none repeat scroll 0 0;\r\n    left: 50%;\r\n    margin: 0 0 0 -0.1em;\r\n    top: 0;\r\n    transform-origin: 50% 250% 0;\r\n}\r\n.bokeh li:nth-child(2) {\r\n    animation: 1.86s linear 0s normal none infinite running rota, 4.29s ease-in-out 0s alternate none infinite running opa;\r\n    background: #ff003c none repeat scroll 0 0;\r\n    margin: -0.1em 0 0;\r\n    right: 0;\r\n    top: 50%;\r\n    transform-origin: -150% 50% 0;\r\n}\r\n.bokeh li:nth-child(3) {\r\n    animation: 1.45s linear 0s normal none infinite running rota, 5.12s ease-in-out 0s alternate none infinite running opa;\r\n    background: #fabe28 none repeat scroll 0 0;\r\n    bottom: 0;\r\n    left: 50%;\r\n    margin: 0 0 0 -0.1em;\r\n    transform-origin: 50% -150% 0;\r\n}\r\n.bokeh li:nth-child(4) {\r\n    animation: 1.72s linear 0s normal none infinite running rota, 5.25s ease-in-out 0s alternate none infinite running opa;\r\n    background: #88c100 none repeat scroll 0 0;\r\n    margin: -0.1em 0 0;\r\n    top: 50%;\r\n    transform-origin: 250% 50% 0;\r\n}\r\n\r\n.translucent{\r\n    opacity: 0.2;\r\n}\r\n\r\n@keyframes opa {\r\n12% {\r\n    opacity: 0.8;\r\n}\r\n19.5% {\r\n    opacity: 0.88;\r\n}\r\n37.2% {\r\n    opacity: 0.64;\r\n}\r\n40.5% {\r\n    opacity: 0.52;\r\n}\r\n52.7% {\r\n    opacity: 0.69;\r\n}\r\n60.2% {\r\n    opacity: 0.6;\r\n}\r\n66.6% {\r\n    opacity: 0.52;\r\n}\r\n70% {\r\n    opacity: 0.63;\r\n}\r\n79.9% {\r\n    opacity: 0.6;\r\n}\r\n84.2% {\r\n    opacity: 0.75;\r\n}\r\n91% {\r\n    opacity: 0.87;\r\n}\r\n}\r\n\r\n@keyframes rota {\r\n    100% {\r\n        transform: rotate(360deg);\r\n    }\r\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["vendors-212c64e5","vendors-7e9c6a9f","vendors-319a6989","vendors-bff14f0d","vendors-4e64aa37","vendors-3ce50090","vendors-fcadf5bb","vendors-cdd60c62","vendors-2b4841d6","vendors-b1140668","vendors-ba5cce0a","vendors-16aa39bf","vendors-b63e7516","vendors-5ee9077d","vendors-b7633cdf","vendors-0ac0411d","vendors-3e3507c7","vendors-e8642ab4","vendors-c99f8745","app-9a8b795a","app-2ef08ec8","app-43e0dfcb","app-8e048d9f","app-90cc99ba","app-92bcf446","app-c8cdc254","app-92e19ffb","app-99af21d7","app-fc1603ca","app-a9233e0e","app-648a8bb9","app-12db51ab","app-d8d712bf","app-5faa557d","app-6ac23984","app-f524a2c8","app-2500ebb2"], function() { return __webpack_exec__(4639), __webpack_exec__(3231), __webpack_exec__(7062); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=app-b3d7f9d6.c2f6f034a062b3d7f766.bundle.js.map