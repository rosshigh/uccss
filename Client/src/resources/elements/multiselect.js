import {inject, bindable, bindingMode, TaskQueue} from 'aurelia-framework';
import 'bootstrap-select'

@inject(TaskQueue)
export class MultiselectCustomElement {
  
  @bindable options;
  @bindable label;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) value = [];
  
  constructor(taskQueue) {
   this.taskQueue = taskQueue;
  }
  
  valueChanged(newValue, oldValue){
    if(newValue && newValue.length === 0) $('span.filter-option').html("");
  }

  bind(){
    console.log('laksjdflj')
  }

  attached() {
    $(this.select).selectpicker({ 
      onChange: (option, checked) => {
        if (checked) {
          this.value.push(option[0].value);
        } else {
          let index = this.value.indexOf(option[0].value);
          this.value.splice(index, 1);
        }
      }
    });
  }
  
  optionsChanged(newValue, oldValue) {
    if (oldValue) { 
      this.taskQueue.queueTask(() => { 
        this.value = [];
        $(this.select).multiselect('rebuild');
      });
    }
  }
}