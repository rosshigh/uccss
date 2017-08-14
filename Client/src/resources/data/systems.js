import {inject} from 'aurelia-framework';
import {DataServices} from './dataServices';
import {Products} from './dataServices';
import {Utils} from '../utils/utils';
import {AppConfig} from '../../config/appConfig';
import { observable } from 'aurelia-framework';

@inject(DataServices, Utils, AppConfig)
export class Systems{

	SYSTEMS_SERVICE = "systems";

    constructor(data, utils, config){
        this.data = data;
        this.utils = utils;
        this.config = config;
    }

    async getSystemsArray(options, refresh){
        if(!this.systemsArray || refresh) {
            var url = this.SYSTEMS_SERVICE;
            url += options ? options : "";
             try{
                let serverResponse = await this.data.get(url);
                if(!serverResponse.error){
                    this.systemsArray = serverResponse;
                } 
            } catch(error){
                console.log(error);
                this.systemsArray = undefined;
            }
        }
    }

    async getSystem(index){
        if(index){
            let id = this.systemsArray[index]._id;
            let serverResponse = await this.data.get(this.SYSTEMS_SERVICE + "/" + id);
            if(!serverResponse.error){
                this.selectedSystem = serverResponse;
                this.systemsArray[index] = this.utils.copyObject(this.selectedSystem);
            }
            return serverResponse;
        }
    }

    selectSystem(index){
        if(!index && index != 0) {
            this.selectedSystem = this.emptySystem();
            this.newSystem = true;
        } else {
            try{
                this.selectedSystem = this.utils.copyObject(this.systemsArray[index]);
                this.newSystem = false;
                this.editIndex = index;
            } catch (error){
                console.log(error);
                this.selectedSystem = this.emptySystem();
                this.newSystem = true;
            }

        }
    }

    selectedSystemFromId(id){
      this.selectedSystem = null;
      for(var i = 0, x = this.systemsArray.length; i < x; i++){
        if(this.systemsArray[i]._id === id){
          this.selectedSystem = this.utils.copyObject(this.systemsArray[i]);
          this.editIndex = i;
          break;
        }
      };
    }

    setSelectedSystem(system){
        this.selectedSystem = this.utils.copyObject(system);
    }

    emptySystem(){
        var newSystemObj = {};
        newSystemObj.sid = "";
        newSystemObj.active = true;
        newSystemObj.description = "";
        newSystemObj.server = "";
        newSystemObj.instance = "";
        newSystemObj.its = "";
        newSystemObj.terms = "";
        newSystemObj.idsAvailable = 0;
        newSystemObj.productId = new Array();
        newSystemObj.clients = [];
        return newSystemObj;
    }

    async saveSystem(){
        if(!this.selectedSystem){
            return;
        }

        if(!this.selectedSystem._id){
            let serverResponse = await this.data.saveObject(this.selectedSystem, this.SYSTEMS_SERVICE, "post");
            if(!serverResponse.error){
                 this.systemsArray.push(serverResponse);
            } else {
                this.data.processError(serverResponse,"Error updating the system.<br>")
            }
            return serverResponse;
        } else {
            var serverResponse = await this.data.saveObject(this.selectedSystem, this.SYSTEMS_SERVICE, "put");
            if(!serverResponse.error){
                this.selectedSystem = serverResponse;
                this.systemsArray[this.editIndex] = this.utils.copyObject(this.selectedSystem);
            } else {
                this.data.processError(serverResponse,"Error updating the system.<br>")
            }
            return serverResponse;
        }
    }

    async deleteSystem(){
        let serverResponse = await this.data.deleteObject(this.SYSTEMS_SERVICE + '/' + this.selectedSystem._id);
        if (!serverResponse.error) {
            this.systemsArray.splice(this.editIndex, 1);
            this.editIndex = - 1;
        } else {
            this.data.processError(serverResponse,"Error deleting the system.<br>")
        }
        return serverResponse;
    }

    async saveProductChanges(obj){
        let response = await this.data.saveObject(obj, this.SYSTEMS_SERVICE + '/product/', "put");
        return response;
    }

    isDirty(obj, skip){
        if(this.selectedSystem){
            if(!obj){
                var obj = this.emptyRequest();
            }
            return this.utils.objectsEqual(this.selectedSystem, obj, skip);
        }
        return new Array();
    }

    async deleteAllClients(){
        if(this.selectedSystem._id){
            this.selectedSystem.clients = new Array();
        }
    }

    generateClients(start, end, status, product, interval, idsAvailable){
        if(!this.selectedSystem){
            return {error: "No system selected."};
        }

        this.selectedSystem.clients = this.selectedSystem.clients || new Array();
        var lastClientIndex = this.selectedSystem.clients.length - 1;
        if( start > 0 &&  end > 0 && end >= start){
            for(var i = start; i <= end; i += interval){
                if(this._findClient(i, 0, lastClientIndex) < 0){
                    this.selectedSystem.clients.push(this.emptyClient(i, status, product, idsAvailable));
                }
            }
            return true;
        } else {
            return {error: "Enter valid start and end client numbers"}
        }
    }

    refreshClients(status, products){
         for(var i = 0, x = this.selectedSystem.clients.length; i<x; i++){ 
            var aProduct = {firstAllowableID: 1, _id: null};
            this.selectedSystem.clients.forEach(item => {
                if(item.productId !== aProduct._id){
                    for(let j = 0; j < products.length; j++){
                        if(products[j]._id === item.productId){
                            aProduct = products[j]
                        }
                    }
                }
            })
            this.selectedSystem.clients[i] = this.emptyClient(this.selectedSystem.clients[i].client, status, aProduct );
        }
    }

    _findClient(client, start, end){
        if(end >= 0){
            for(var i = start; i<=end; i++ ){
                if(parseInt(this.selectedSystem.clients[i].client) === client) return i;
            }
        }
        return -1;
    }

    selectClient(index){
        if(index != undefined) {
            this.selectedClient = this.utils.copyObject(this.selectedSystem.clients[index]);
            this.clientIndex = index;
        }
    }
    
    selectClientFromID(systemId, clientId){
      this.selectedClient = null;
      for(var i = 0, x = this.systemsArray.length; i < x; i++){
        if(this.systemsArray[i]._id === systemId){
            this.selectedSystem = this.utils.copyObject(this.systemsArray[i]);
            for(var j = 0; j < this.systemsArray[i].clients.length; j++){
                if(this.systemsArray[i].clients[j].client == clientId){
                    this.selectedClient = this.utils.copyObject(this.systemsArray[i].clients[j]);
                    this.clientIndex = j;
                    break;
                }
            }  
        }
      }
    }

     selectClientFromNumber(systemId, client){
        this.selectedClient = null;
        for(var i = 0, x = this.systemsArray.length; i < x; i++){
            if(this.systemsArray[i]._id === systemId){
                this.selectedSystem = this.utils.copyObject(this.systemsArray[i]);
                for(var j = 0; j < this.systemsArray[i].clients.length; j++){
                    if(this.systemsArray[i].clients[j].client === client){
                        this.selectedClient = this.utils.copyObject(this.systemsArray[i].clients[j]);
                        this.clientIndex = j;
                        break;
                    }
                }  
            }
        }
    }

    emptyClient(clientNo, status, product, idsAvailable){
        let obj = new Object();
        obj.client = clientNo;
        obj.clientStatus = status;
        obj.systemId = this.selectedSystem._id;
        obj.idsAvailable = idsAvailable;
        obj.assignments = new Array(); 
        obj.createdDate = new Date();
        obj.lastIdAssigned = 0;
        obj.lastFacIdAssigned = 0;
        obj.firstFacIdAssigned = 0;
        obj.manual = false;
        obj.productId = product ? product._id : null;
        obj.firstAllowableID = product.firstAllowableId ? parseInt(product.firstAllowableId) : 1;
        return obj;
    }

    selectClient(index){
        if(index != undefined) {
            this.selectedClient = this.utils.copyObject(this.selectedSystem.clients[index]);
            this.clientIndex = index;
        }
    }
    
    /*****************************************************************************************************
     * Find the client in a systems client list and update it, used by client request assignment
     ****************************************************************************************************/
    updateClient(client){
        for(var i = 0, x = this.systemsArray.length; i < x; i++){
            if(this.systemsArray[i]._id === client.systemId){
                for(var j = 0; j < this.systemsArray[i].clients.length; j++){
                    if(this.systemsArray[i].clients[j].client == client.client){
                        this.systemsArray[i].clients[j] = this.utils.copyObject(client);
                        break;
                    }
                }  
            }
        };
    }

}