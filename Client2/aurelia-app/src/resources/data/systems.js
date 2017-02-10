import {inject} from 'aurelia-framework';
import {DataServices} from './dataServices';
import {Utils} from '../utils/utils';
import {AppConfig} from '../../config/appConfig';

@inject(DataServices, Utils, AppConfig)
export class Systems{
    newSystem = false;      //Is the selected product a new product
    editIndex;              //Index of selected product

    constructor(data, utils, config){
        this.data = data;
        this.utils = utils;
        this.config = config;
    }

    async getSystemsArray(options, refresh){
        if(!this.systemsArray || refresh) {
            var url = this.data.SYSTEMS_SERVICE;
            url += options ? options : "";
             try{
                let serverResponse = await this.data.get(url);
                if(!serverResponse.error){
                    this.systemsArray = serverResponse;
                } else {
                    this.systemsArray = undefined;
                }
            } catch(error){
                console.log(error);
                this.systemsArray = undefined;
            }
        }
        return this.systemsArray;
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

    selectSystemBySID(sid){
         this.selectedSystem = undefined;
         for(var i = 0, x = this.systemsArray.length; i<x; i++){
             if(this.systemsArray[i].sid === sid){
                 this.selectedSystem = this.utils.copyObject(this.systemsArray[i]);
                 this.editIndex = i;
                 i = x;
             }
         }
         return this.selectedSystem;
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

    async getSystemsForProduct(productId){
        let serverResponse = await this.data.getAllObjects(this.data.SYSTEMS_PRODUCTS_SERVICE.replace("PRODUCTID", productId))
        return serverResponse;
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
        this.clientList = [];
        return newSystemObj;
    }

    async saveSystem(){
        if(!this.selectedSystem){
            return;
        }

        if(!this.selectedSystem._id){
            let serverResponse = await this.data.saveObject(this.selectedSystem, this.data.SYSTEMS_SERVICE + "A", "post");
            if(!serverResponse.error){
                 this.systemsArray.push(serverResponse);
            } else {
                this.data.processError(serverResponse,"Error updating the system.<br>")
            }
            return serverResponse;
        } else {
            var serverResponse = await this.data.saveObject(this.selectedSystem, this.data.SYSTEMS_SERVICE, "put");
            if(!serverResponse.error){
                this.systemsArray[this.editIndex] = this.utils.copyObject(this.selectedSystem);
            } else {
                this.data.processError(serverResponse,"Error updating the system.<br>")
            }
            return serverResponse;
        }
    }

    async saveProductChanges(obj){
        let response = await this.data.saveObject(obj, this.data.SYSTEMS_SERVICE + '/product/', "put");
        return response;
    }

    async deleteSystem(){
         let serverResponse = await this.data.deleteObject(this.data.SYSTEMS_SERVICE + '/' + this.selectedSystem._id);
            if (!serverResponse.error) {
                this.systemsArray.splice(this.editIndex, 1);
                this.editIndex = - 1;
            } else {
                this.data.processError(serverResponse,"Error deleting the system.<br>")
            }
            return serverResponse;
    }

    isDirty(){
        if(this.selectedSystem){
            if(this.selectedSystem._id){
                var obj = this.systemsArray[this.editIndex];
            } else {
                var obj = this.emptySystem();
            }
            return this.utils.objectsEqual(this.selectedSystem, obj);
        }
    }

    async deleteAllClients(){
        let serverResponse = await this.data.deleteObject(this.data.DELETE_ALL_CLIENTS.replace('SYSTEMID', this.selectedSystem._id));
        if(!serverResponse.error){
            this.systemsArray[this.editIndex].clients = [];
            this.selectedSystem.clients = new Array();
        } else {
                this.data.processError(serverResponse,"Error deleting the clients.<br>")
            }
        return serverResponse;
    }

    generateClients(start, end, status){
        if(!this.selectedSystem){
            return {error: "No system selected."};
        }

        this.selectedSystem.clients = this.selectedSystem.clients || new Array();
        var lastClientIndex = this.selectedSystem.clients.length - 1;
        if( start > 0 &&  end > 0 && end > start){
            for(var i = start; i <= end; i += this.config.CLIENT_INTERVAL){
                if(this._findClient(i, 0, lastClientIndex) < 0){
                    this.selectedSystem.clients.push({client: i, clientStatus: status, systemId: this.selectedSystem._id,  idsAvailable: this.selectedSystem.idsAvailable})
                }
            }
            return true;
        } else {
            return {error: "Enter valid start and end client numbers"}
        }
    }

    refreshClients(status){
         for(var i = 0, x = this.selectedSystem.clients.length; i<x; i++){
            this.selectedSystem.clients[i].clientStatus = status;
            this.selectedSystem.clients[i].idsAvailable = this.selectedSystem.idsAvailable;
            this.selectedSystem.clients[i].lastIdAllocated = 0;
            this.selectedSystem.clients[i].assignments = new Array();
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
              if(this.systemsArray[i].clients[j]._id === clientId){
                  this.selectedClient = this.utils.copyObject(this.systemsArray[i].clients[j]);
                    break;
              }
          }  
          
        }
      }
    }
    
    /*****************************************************************************************************
     * Find the client in a systems client list and update it, used by client request assignment
     ****************************************************************************************************/
    updateClient(client){
        for(var i = 0, x = this.systemsArray.length; i < x; i++){
            if(this.systemsArray[i]._id === client.systemId){
                for(var j = 0; j < this.systemsArray[i].clients.length; j++){
                    if(this.systemsArray[i].clients[j]._id === client._id){
                        this.systemsArray[i].clients[j] = this.utils.copyObject(client);
                        break;
                    }
                }  
            }
        };
    }

    async saveClients(array){
      if(array){
        var obj = {clients: array};
          var serverResponse = await this.data.saveObject(obj, this.data.CLIENTS_SERVICE + '/multiple', "put");
        }
    }

    async saveClient(){
        var serverResponse = await this.data.saveObject(this.selectedClient, this.data.CLIENTS_SERVICE, "put");
        if(!serverResponse.error){
            this.updateClient(serverResponse);
            this.selectedSystem.clients[this.clientIndex] = serverResponse;
        }
        return serverResponse;
    }

    async deleteClient(){
            if(this.selectedClient._id){
                if(this._okToDeleteClient(this.selectedClient.clientStatus)){
                    var response = await this.data.deleteObject(this.data.CLIENTS_SERVICE +'/' +  this.selectedClient._id);
                    if(!response.error) {
                        this.selectedSystem.clients.splice(this.clientIndex,1);
                    }
                    return response;
                }
            }
            return {status: "500"};
    }

    _okToDeleteClient(status){
        for(var i = 0; i<this.config.CLIENT_STATUSES.length; i++){
            if(this.config.CLIENT_STATUSES[i].code == status && this.config.CLIENT_STATUSES[i].OKToDelete) {
                return true;
            }
        }
        return false;
    }
}