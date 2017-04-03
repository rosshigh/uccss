import {inject} from 'aurelia-framework';
import moment from 'moment';
import {transient} from 'aurelia-framework';
import {Utils} from './utils';

@transient()
@inject(Utils)
export class DataTable{
  currentPage = 0;
  pages = [];
  rowOptions = [5,10,15,20,50];
  filterValues = [];
  displayLength;

  DEFAULT_TAKE = 20;
  DEFAULT_START = 0;

  sortProperty = '';
  sortDirection = 1;
  currentPageElement = 0;

  startRecord = this.DEFAULT_START; 
  take = this.DEFAULT_TAKE;
  firstVisible = this.startRecord + 1;
  lastVisible = this.startRecord + this.take - 1;
  numRowsShown = this.take.toString();

  active = false;
  
  constructor(utils){
    this.utils = utils;
  }

  initialize(context){
    this.context = context;
  }

  pageOne(){
    setTimeout(() => {
        $(".pagination").children().removeClass('active');
        $($(".pagination").children()[1]).addClass('active');
        // $("#" + this.context.navControl).children().removeClass('active');
        // $($("#" + this.context.navControl).children()[1]).addClass('active');
    },100);
  }

  createPageButtons(start){
    this.displayLength = this.baseArray.length;
    this.lastVisible = parseInt(this.take) < this.displayLength ? parseInt(this.take) : this.displayLength;
    var maxButtons = 7;
    this.currentPage = 1;
    this.pageButtons = [];
    this.numPageButtons = Math.ceil((this.displayLength - ((start - 1) * this.take)) / this.take);
    for(var j = 1; j<this.numPageButtons; j++){
      this.pages[j] = j;
    }

    if(this.numPageButtons <= maxButtons + 1){
      for(var i = start; i < this.numPageButtons + start; i++ ){
        this.pageButtons.push(i);
      }
    } else {
      for(var i = start; i < maxButtons + start; i++ ){
        this.pageButtons.push(i);
      }
      this.pageButtons.push('...');
      this.pageButtons.push(this.pages.length);
    }
  }

  buildDisplayArray(){
    this.displayArray = new Array();
    for(var i = 0; i <= this.take; i++){
      if(i + this.startRecord >= this.baseArray.length) break;
      this.displayArray.push(this.baseArray[i + this.startRecord]);
    }
    this.createPageButtons(1);
  }

  forward(){
     $(".pagination").children().removeClass('active');
    // $("#" + this.context.navControl).children().removeClass('active');
    this.currentPageElement = this.currentPageElement < this.pageButtons.length-1 ? this.currentPageElement += 1 : this.currentPageElement;
    if (this.pageButtons[this.currentPageElement] == "...") {
      this.createPageButtons(this.pageButtons[0] + 1)
      this.currentPageElement -= 1
    }
     $($(".pagination").children()[this.currentPageElement + 1]).addClass('active');
    // $($("#" + this.context.navControl).children()[this.currentPageElement + 1]).addClass('active');
    var start = parseInt(this.startRecord);
    var tk = parseInt(this.take);
    this.startRecord = start + tk > this.baseArray.length ? start : start + tk;
    this.firstVisible = this.startRecord + 1;
    this.lastVisible = parseInt(this.firstVisible) + tk - 1 > this.displayArray.length ? this.displayArray.length : parseInt(this.firstVisible) + tk - 1 ;
    this.buildDisplayArray();
    // if(typeof(this.context.navigate) === 'function')  this.context.navigate();
  }


  createPage(){
      $($(".pagination")[this.currentPage - 1]).addClass('active');
    // $($("." + this.context.navControl)[this.currentPage - 1]).addClass('active');
  }

  backward(){
      $(".pagination").children().removeClass('active');
    // $("#" + this.context.navControl).children().removeClass('active');
    this.currentPageElement = this.currentPageElement > 0 ? this.currentPageElement -= 1 : this.currentPageElement;
    if(this.currentPageElement == 0 && this.pageButtons[this.currentPageElement] != 1){
      this.createPageButtons(this.pageButtons[0] - 1)
    }
    if (this.pageButtons[this.currentPageElement] == "...") {
      var start = this.numPageButtons >= 8 ? this.numPageButtons - 8 : 1
      this.createPageButtons(start)
      //this.context.currentPageElement = 1
    }
    $($(".pagination").children()[this.currentPageElement + 1]).addClass('active');
    //  $($("#" + this.context.navControl).children()[this.currentPageElement + 1]).addClass('active');
    var start = parseInt(this.startRecord);
    var tk = parseInt(this.take);
    this.startRecord = start - tk < 0 ?
      0 : this.startRecord = start - tk;
    this.firstVisible = this.startRecord + 1;
    this.lastVisible = parseInt(this.firstVisible) + tk - 1;
    this.buildDisplayArray();
    // if(typeof(this.context.navigate) === 'function')  this.context.navigate();
  }

  pageButton(index, el){
    $(".pagination").children().removeClass('active');
    //  $("#" + this.context.navControl).children().removeClass('active');
    $(el.target).closest('li').addClass('active');
    this.currentPageElement = index;
    var start = parseInt(this.startRecord);
    var tk = parseInt(this.take);
    if(this.pageButtons[index] !== '...'){
      this.startRecord = (this.pageButtons[index] - 1) * tk;
      this.firstVisible = this.startRecord + 1;
      this.lastVisible = parseInt(this.firstVisible) + tk - 1 > this.displayArray.length ?
        this.displayArray.length : parseInt(this.firstVisible) + tk - 1 ;
    }
    // if(typeof(this.context.navigate) === 'function')  this.context.navigate();
    this.buildDisplayArray();
  }

  updateTake(el){
    this.take = this.numRowsShown;
    this.startRecord = 0;
    this.lastVisible = parseInt(this.firstVisible) + parseInt(this.take) - 1;
    this.createPageButtons(1);
    this.pageOne();
    this.buildDisplayArray();
  }
 
  filterList(el, array){ 
    el.preventDefault();
    array = array || new Array();
    //If the property is already in filterValues, filter it out
    this.filterValues = this.filterValues.filter(function (obj) {
      return obj.property !== el.target.id;
    });

    //If the filter value is not set to empty, add it to filterValues
    if(el.target.value !== ""){
      switch(el.target.type){
        case 'select-one':
          this.filterValues.push({property:el.target.id,value:el.target.options[el.target.selectedIndex].value, type:el.target.type, compare:$(el.target).attr("compare")});
          break;
        default:
          this.filterValues.push({property:el.target.id,value:el.target.value, type:el.target.type, compare:$(el.target).attr("compare")});
      }
    }

    //If there are no filters in filterValues, reset the displayArray to the original list
    if(this.filterValues.length > 0){
      this.baseArray = this.filter(this.filterValues,  array);
    } else {
      this.baseArray = this.sourceArray;
    }
    this.startRecord = this.DEFAULT_START;
    this.firstVisible = 1;
    this.buildDisplayArray();
    this.lastVisible = parseInt(this.take) < this.displayLength ? parseInt(this.take) : this.displayLength;

    this.pageOne();
  }

  externalFilter(filters){
      if(filters.length > 0){
        this.baseArray = this.filter(filters);
      } else {
        this.baseArray = this.sourceArray;
      }
      this.startRecord = this.DEFAULT_START;
      this.firstVisible = 1;
      this.buildDisplayArray();
      this.lastVisible = parseInt(this.take) < this.displayLength ? parseInt(this.take) : this.displayLength;

      this.pageOne();
  }

  filter(filters, lookupArray){
    var keep;
    var index = 0;
    return this.sourceArray.filter((item) => {
      //Assume the item should be 
      keep = false;
      //For each filter in filterValues
      for(var i = 0, x =  filters.length; i < x; i++){
        switch(filters[i].type){
          //Filter control is a drop down\
          //compare is used to define the type of comparison to make
          case 'select-one':
            switch(filters[i].compare){
              case 'active':
                keep = filters[i].value == 'true' ? item[filters[i].property] : !item[filters[i].property];
                break;
              case 'id':
                keep = filters[i].value == item[filters[i].property];
                break;
              case 'obj':
                var properties = filters[i].property.split('.')
                var condition = "item"
                for(var j = 0; j<properties.length; j++){
                  if(properties[j].indexOf('[') > -1 ) {
                    condition += properties[j];
                  } else {
                    condition += "['" + properties[j] + "']";
                  }
                }
                if(filters[i].value.indexOf('NOT') === -1){
                  keep = eval(condition) === filters[i].value;
                } else {
                  let thisValue = filters[i].value.substring(3);
                  keep = eval(condition) !== thisValue;
                }
                break
              case "boolean":
                keep = eval(filters[i].value) === eval(item[filters[i].property]);
                break;
              case "not":
                break;
              default:
                // <select change.delegate="dataTable.filterList($event)" class="form-control" id="owner[0].personId"  ref="ownerFilter">
                // if( isNaN(filters[i].value)){
                //   keep = parseInt(filters[i].value) === parseInt(item[filters[i].property]);
                // } else {
                  keep = filters[i].value == item[filters[i].property];
                // }
                
            }
            break;
          case 'text':
            switch (filters[i].compare){
              case 'array':
                var array = eval("item." + filters[i].property);
                  keep = false;
                  if(array){
                    for(var l = 0; l<array.length; l++){
                      if(array[l].indexOf(filters[i].value.toUpperCase()) > -1){
                        keep = true;
                        break;
                      }
                    }
                  }
                break;
              case 'obj-array':
                if(filters[i].property.indexOf('.') > -1){
                  var properties = filters[i].property.split('.')
                  var array = eval("item." + properties[0]);
                  keep = false;
                  if(array){
                    for(var l = 0; l<array.length; l++){
                      if(array[l][properties[1]].indexOf(filters[i].value.toUpperCase()) > -1){
                        keep = true;
                        break;
                      }
                    }
                  }
                }
                break;
              case 'lookup':
                // <input input.delegate="dataTable.filterList($event, people.peopleArray)" id="personId-fullName" type="text" compare="lookup" class="form-control" ref="nameFilter"/>
                var arrayToLookup = filters[i].property.split('-');
                var properties = arrayToLookup[0].split('.');
                var condition = "item"
                for(var j = 0; j<properties.length; j++){
                  if(properties[j].indexOf('[') > -1 ) {
                    condition += properties[j];
                  } else {
                    condition += "['" + properties[j] + "']";
                  }
                }
                let value = this.lookup(eval(condition), arrayToLookup[1], lookupArray);
                if(value){
                   keep = value.toUpperCase().indexOf(filters[i].value.toUpperCase()) > -1;
                }
                break;
              // case 'lookup-deep':
              //   // <input input.delegate="dataTable.filterList($event, people.peopleArray)" id="requestId.personId-fullName" type="text" compare="lookup" class="form-control" ref="nameFilter"/>
              //   //Used when the property to lookup is in an object of the item
              //   var arrayToLookup = filters[i].property.split('-');
              //   var depth = arrayToLookup[0].split('.');
              //   let deepValue = this.lookup(item[depth[0]][depth[1]], arrayToLookup[1], lookupArray);
              //   if(deepValue){
              //     keep = deepValue.toUpperCase().indexOf(filters[i].value.toUpperCase()) > -1;
              //   }
              //   break;
              case 'lookup-array-item':
                //<input input.delegate="dataTable.filterList($event, people.peopleArray)" id="owner-fullName-0-personId" type="text" compare="lookup-array-item" class="form-control" ref="ownerFilter"/>
                var array = filters[i].property.split('-');
                var value = this.lookup(item[array[0]][array[2]][array[3]], array[1], lookupArray);
                if(value){
                   keep = value.toUpperCase().indexOf(filters[i].value.toUpperCase()) > -1;
                }
                break;
              case 'lookup-array':
                //<input input.delegate="dataTable.filterList($event, helpTicketTypeLookupArray)" id="helpTicketType-description" type="text" compare="lookup-array" class="form-control" ref="typeFilter"/>
                let arrayLookup = filters[i].property.split('-');
                for(var index = 0; index < lookupArray.length; index++){
                  if(lookupArray[index][arrayLookup[0]] === item[arrayLookup[0]]){
                    keep = lookupArray[index][arrayLookup[1]].toUpperCase().indexOf(filters[i].value.toUpperCase()) > -1;
                    break;
                  }
                }
                break;
              case 'not':
                let propValue = isNaN(item[filters[i].property]) ? item[filters[i].property] : item[filters[i].property].toString();
                let filterValue = isNaN(filters[i].value) ? filters[i].value : filters[i].value.toString();
                if(filters[i].property.indexOf('.') > -1){
                    var properties = filters[i].property.split('.')
                    var condition = "item"
                    for(var j = 0; j<properties.length; j++){
                      condition += "['" + properties[j] + "']"
                    }
                    keep = eval(condition).toUpperCase().indexOf(filters[i].value.toUpperCase()) === -1
                    //  keep = eval(condition).toUpperCase().indexOf(filters[i].value.toUpperCase()) === -1
                  } else {
                     keep = propValue.toUpperCase().indexOf(filterValue.toUpperCase()) === -1;
                    // keep = item[filters[i].property].toUpperCase().indexOf(filters[i].value.toUpperCase()) === -1;
                  }
                 break;
              case 'not-number':
                 if(filters[i].property.indexOf('.') > -1){
                    var properties = filters[i].property.split('.')
                    var condition = "item"
                    for(var j = 0; j<properties.length; j++){
                      condition += "['" + properties[j] + "']"
                    }
                    keep = eval(condition) !== filters[i].value
                  } else {
                    keep = item[filters[i].property] !== filters[i].value;
                  }
                 break;
              default:
                if(filters[i].property.indexOf('.') > -1){
                  var properties = filters[i].property.split('.')
                  var condition = "item"
                  for(var j = 0; j<properties.length; j++){
                    condition += "['" + properties[j] + "']"
                  }
                  keep = eval(condition).toUpperCase().indexOf(filters[i].value.toUpperCase()) > -1
                } else {
                  keep = item[filters[i].property].toUpperCase().indexOf(filters[i].value.toUpperCase()) > -1;
                }
                break;
            }
            break;
          case 'date':
            switch(filters[i].compare){
              case 'after':
                if(item[filters[i].property]){
                  var dt = moment(item[filters[i].property]).format('YYYY-MM-DD');
                  keep = moment(dt).isAfter(filters[i].value);
                }
                break;
              default:
                if(item[filters[i].property]){
                  var dt = moment(item[filters[i].property]).format('YYYY-MM-DD');
                  keep = moment(dt).isSame(filters[i].value);
                }
            }
        }
        if(!keep) break;
      }
      return keep;
    })
  }

  lookup(lookupValue, lookupProperty, lookupArray){
    for(var i = 0, x=lookupArray.length; i < x; i++){
      if(lookupArray[i]._id == lookupValue ) return lookupArray[i][lookupProperty];
    }
    return "";
  }

  /***************************************************************
   * propertyName - property to sort on unless a surrogate is provided 
   * type - indicates an alternate sorting method
   * surrogateArray - array that contains the property on which you want to sort
   * surrogateProperty - property in surrogate array that matches propertyname
   * sortProperty - property showing in table on which sort is actually performed
   * sortDirectionParam - direction of sort
   */
  sortArray(propertyName, type, surrogateArray, surrogateProperty, sortProperty, sortDirectionParam){
    if(sortDirectionParam) this.sortDirecction = sortDirectionParam;
    if(propertyName === this.sortProperty){
      this.sortDirection *= -1;
    } else {
      this.sortDirection = 1;
    }

    if(!type){
        this.sortProperty=propertyName;

        this.baseArray = this.baseArray
          .sort((a, b) => {
            var result = (a[propertyName] < b[propertyName]) ? -1 : (a[propertyName] > b[propertyName]) ? 1 : 0;
            return result * this.sortDirection;
          });
      
    } else if (type == 'id'){
      
        var sortArray = this.utils.copyArray(this.baseArray);
        sortArray.forEach((item) => {
          var obj = this.findObj(surrogateArray, surrogateProperty, eval('item.' + propertyName));

          item[sortProperty] = obj ? obj[sortProperty] : null;
        })
        
        this.sortProperty=propertyName;

        this.baseArray = sortArray
          .sort((a, b) => {
            var result;
            if(a[sortProperty] === null) {
              result = -1;
            } else {
              result = (a[sortProperty] < b[sortProperty]) ? -1 : (a[sortProperty] > b[sortProperty]) ? 1 : 0;
            }
            return result * this.sortDirection;
          });
    } else if (type == 'object'){
       this.sortProperty = propertyName;
       propertyName = propertyName.split('.');

        this.baseArray = this.baseArray
          .sort((a, b) => { 
            var result = (a[propertyName[0]][propertyName[1]] < b[propertyName[0]][propertyName[1]]) ? -1 : (a[propertyName[0]][propertyName[1]] > b[propertyName[0]][propertyName[1]]) ? 1 : 0;
            return result * this.sortDirection;
          });
    }
     this.startRecord = this.DEFAULT_START;
      this.firstVisible = 1;
      this.buildDisplayArray();
      this.lastVisible = parseInt(this.take) < this.displayLength ? parseInt(this.take) : this.displayLength;

      this.pageOne();
  }
  
  findObj(surrogateArray, surrogateProperty, propertyValue){
    for(var i =0, x = surrogateArray.length; i < x; i++){
      if(surrogateArray[i][surrogateProperty] == propertyValue) return surrogateArray[i];
    }
    return null;
  }
  
  updateArray(sourceArray, sortProperty, sortDirection){
    if(sourceArray) {
      this.sourceArray = new Array();
      this.baseArray = new Array();
      this.active = true;
      sourceArray.forEach(item => {
        this.sourceArray.push(item);
        this.baseArray.push(item);
      })
     
      this.baseArray.forEach(function(item, index){
        item.baseIndex = index;
        item.originalIndex = index;
      });

      if(sortProperty){
          this.baseArray.sort((a,b) => {
            let result =  a[sortProperty] - b[sortProperty];
            return result * sortDirection
          })
      }

      this.buildDisplayArray()
    }
  }

  getOriginalIndex(index){
    return this.displayArray[index].originalIndex;
  }

}
