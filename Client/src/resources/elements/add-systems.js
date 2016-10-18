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
      if( this._updateSystem(system, this.selectedproduct._id)) {
        this.selectedproduct.systems.push({sid: system.sid, systemId: system._id});
      }
    }
    this.updateSystemsString();
  }

  _systemAlreadySelected(sid){
    for(var i = 0; i<this.selectedproduct.systems.length; i++){
      if(this.selectedproduct.systems[i].sid === sid) return true;
    }
    return false;
  }

  removeSystem(el, system){
    for(var i = 0; i<this.selectedproduct.systems.length; i++){
      if(system.id === this.selectedproduct.systems[i].id){
        if(this._updateSystem(system, "")) this.selectedproduct.systems.splice(i,1);
        break;
      }
    }
    this.updateSystemsString();
  }

  updateSystemsString(){
    this.systemstring = "";
    if(this.selectedproduct.systems){
            for (var i = 0, x = this.selectedproduct.systems.length; i < x; i++) {
                this.systemstring += this.selectedproduct.systems[i].sid + " "
            }
        }
  }

  async _updateSystem(system, productId){
    var obj = {productId: productId};
    let serverResponse = await this.data.saveObject(obj, this.data.SYSTEMS_SERVICE + '/product/' + system._id, "put");
    return !serverResponse.error;
  }
}