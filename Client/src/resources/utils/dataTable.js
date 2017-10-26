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
  }

  backward(){
      $(".pagination").children().removeClass('active');
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

  updateTake(){
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

  filterList(value, options){
    options.lookupArray = options.lookupArray || new Array();
    //If the property is already in filterValues, filter it out
    this.filterValues = this.filterValues.filter(function (obj) {
      return obj.options.filter !== options.filter;
    });

    //Parse collection property
    if(options.type.indexOf('obj') == -1 && options.type != 'custom'){
      var properties = options.collectionProperty.split('.');
      var condition = "item"
      for(var j = 0; j<properties.length; j++){
        if(properties[j].indexOf('[') > -1 ) {
          condition += properties[j];
        } else {
          condition += "['" + properties[j] + "']";
        }
      }
      options.collectionProperty = condition;
    }

    //If the filter value is not set to empty, add it to filterValues 
    if(typeof value == 'object' && !(value instanceof Date)) value = value.target.value;
    if(value !== ""){
      this.filterValues.push({options: options, value: value});
    }

    //If there are no filters in filterValues, reset the displayArray to the original list
    if(this.filterValues.length > 0){
      this.baseArray = this.filter(this.filterValues);
    } else {
      this.baseArray = this.sourceArray;
    }
    this.startRecord = this.DEFAULT_START;
    this.firstVisible = 1;
    this.buildDisplayArray();
    this.lastVisible = parseInt(this.take) < this.displayLength ? parseInt(this.take) : this.displayLength;

    this.pageOne();
  }

  applyFilters(){
    this.filter(this.filterValues);
  }

  filter(filters){
    var keep;
    var index = 0;
    var that = this;
    return this.sourceArray.filter(item => {
      keep = false;
      for(let i = 0; i < filters.length; i++) {
        let filterItem = filters[i];
        var matchValue = undefined;
        if (filterItem.options.compare.indexOf('custom') > -1) {
          matchValue = true;
        } else  {
          matchValue = eval(filterItem.options.collectionProperty);
        }

        if(matchValue != undefined || (filterItem.options.type === "boolean" && matchValue == undefined)) {
          switch(filterItem.options.type){
            case 'custom':
              keep = filterItem.options.filter(filterItem.value, item, that.context);
              break;
            case 'text':  
              if(filterItem.options.compare.indexOf('not') > -1){
                keep = matchValue.toUpperCase().indexOf(filterItem.value.toUpperCase()) == -1;
              } else {
                keep = matchValue.toUpperCase().indexOf(filterItem.value.toUpperCase()) > -1;
              }
              break;
            case 'value':
              if(filterItem.options.compare.indexOf('not') > -1){
                  keep = matchValue != filterItem.value;
                } else {
                   keep = matchValue == filterItem.value;
                }
              break;  
            case "boolean":
                if(matchValue == undefined) {
                  keep = eval(filterItem.value) == false;
                } else {
                  keep = matchValue === eval(filterItem.value);
                }
                break;
            case "date":
              switch(filterItem.options.compare){
                case 'after':
                  if(matchValue){
                    var dt = moment(matchValue).format('YYYY-MM-DD');
                    keep = moment(dt).isAfter(filters[i].value);
                  }
                  break;
                default:
                  if(matchValue){
                    var dt = moment(matchValue).format('YYYY-MM-DD');
                    keep = moment(dt).isSame(filters[i].value);
                  }
              }
          }
        }

       if(!keep) break;
      }
      return keep;
      })
  }


  /***************************************************************
   * propertyName - property to sort on unless a surrogate is provided 
   * type - indicates an alternate sorting method
   * surrogateArray - array that contains the property on which you want to sort
   * surrogateProperty - property in surrogate array that matches propertyname
   * sortProperty - property showing in table on which sort is actually performed
   * sortDirectionParam - direction of sort
   */
  sortArray(el, options, reSort){ //propertyName, type, surrogateArray, surrogateProperty, sortProperty, sortDirectionParam){
    if(reSort){
      if(!this.lastOption || !this.lastEl) return;
      el = this.lastEl;
      options = this.lastOption;
    } else {
      this.lastEl = el;
      this.lastOption = options;
    }
    if(options.sortDirectionParam) this.sortDirection = sortDirectionParam;
    this.sortProperty=options.propertyName;
    if(options.propertyName === this.sortProperty){
      this.sortDirection *= -1;
    } else {
      this.sortDirection = 1;
    }

    $(".sortable").next().replaceWith('<i class="fa fa-sort"></i>');
    if(this.sortDirection < 0){
      var icon = '<i class="fa fa-sort-amount-desc" aria-hidden="true"></i>';  
    } else {
      var icon = '<i class="fa fa-sort-amount-asc" aria-hidden="true"></i>';
    }
   
   $(el.target).next().replaceWith(icon);
    
    if(!options.type){
        if(options.propertyName.indexOf('.') > -1){
          var array = options.propertyName.split('.');          
        }

        if(array){
           this.baseArray = this.baseArray
          .sort((a, b) => {
            var result = (a[array[0]][array[1]] < b[array[0]][array[1]]) ? -1 : (a[array[0]][array[1]] > b[array[0]][array[1]]) ? 1 : 0;
            return result * this.sortDirection;
          });
        } else {
          this.baseArray = this.baseArray
          .sort((a, b) => {
            var result = (a[options.propertyName] < b[options.propertyName]) ? -1 : (a[options.propertyName] > b[options.propertyName]) ? 1 : 0;
            return result * this.sortDirection;
          });
        }
      
    } else if(options.type == 'custom') {
      if(typeof options.sorter == 'function'){
        var sortArray = this.utils.copyArray(this.baseArray);  
        this.baseArray = options.sorter(this.sortProperty, this.sortDirection, sortArray, this.context);
      }
    } else {
      var properties = options.searchProperty.split('.');
      var condition = "item"
      for(let j = 0; j<properties.length; j++){
        if(properties[j].indexOf('[') > -1 ) {
          condition += properties[j];
        } else {
          condition += "['" + properties[j] + "']";
        }
      }
        var sortArray = this.utils.copyArray(this.baseArray);
        sortArray.forEach((item) => {
          var obj = this.findObj(options.surrogateArray, options.surrogateProperty, eval(condition));
          item[options.propertyName] = obj ? obj[options.propertyName] : null;
        })

        this.baseArray = sortArray.sort((a, b) => {
            var result = (a[options.propertyName] < b[options.propertyName]) ? -1 : (a[options.propertyName] > b[options.propertyName]) ? 1 : 0;
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
      this.filterValues = new Array();
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

  updateArrayMaintainFilters(sourceArray, sortProperty, sortDirection){
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

      this.buildDisplayArray();
      this.filter(this.filterValues);
    }
  }

  getOriginalIndex(index){
    return this.displayArray[index].originalIndex;
  }

}
