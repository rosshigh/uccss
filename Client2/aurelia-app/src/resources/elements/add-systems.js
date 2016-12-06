import {DataServices} from '../data/dataServices';
import {bindable} from 'aurelia-framework';
import {inject} from 'aurelia-framework';

@inject(DataServices)
export class AddSystems{
    filter = "";

  @bindable
  selectedproduct;

  @bindable
  systemsarray;

  @bindable
  filteredsystemsarray;

  @bindable
  systemstring;

  @bindable
  systemchanges

  constructor(data){
    this.data = data;
     this.systemsArray = this.systemsarray;
  }

  filterList(){
      if(this.filter){
        var thisFilter = this.filter
        this.filteredsystemsarray = this.systemsarray.filter((item) => {
          return item.sid.substring(0, thisFilter.length).toUpperCase() === thisFilter.toUpperCase();
        });
      } else {
          this.filteredsystemsarray = this.systemsarray;
      }

  }

  selectSystem(el, system){
    if(!this._systemAlreadySelected(system.sid)){
      this.systemchanges.push({productId: this.selectedproduct._id, systemId: system._id, operation: "add"});
      this.selectedproduct.systems.push({sid: system.sid, systemId: system._id});
    }
  }

  _systemAlreadySelected(sid){
    for(var i = 0; i<this.selectedproduct.systems.length; i++){
      if(this.selectedproduct.systems[i].sid === sid) return true;
    }
    return false;
  }

  removeSystem(el, system){
    for(var i = 0; i<this.selectedproduct.systems.length; i++){
      if(system.systemId === this.selectedproduct.systems[i].systemId){
        for(var j = 0; j < this.systemchanges.length; j++){
          if(this.systemchanges[j].systemId ===system.systemId ) break; 
        }
        if(this.systemChanges && j === this.systemChanges.length) {
          this.systemchanges.splice(j,1);
        } else {
          this.systemchanges.push({productId: this.selectedproduct._id, systemId: system.systemId, operation: "delete"});
        }
          this.selectedproduct.systems.splice(i,1);
        break;
      }
    }
  }
}