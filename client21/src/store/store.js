import { Config } from '../resources/data/config';
import { inject } from 'aurelia-dependency-injection';


@inject(Config)
export class Store {

  constructor(config){
    this.config = config;
  }

  async retrieveConfig(){
    let responses = await Promise.all([
      this.config.getConfigArray()
    ]);

    this.saveConfig(this.config.configArray);
  }

  saveConfig(configArray){
    let savedConfigArray = {};
    configArray.forEach(item => {
      savedConfigArray[item.parameter] = item.value;
    })
    sessionStorage.setItem('config', JSON.stringify(savedConfigArray));
  }
  
  getConfig(){
    return JSON.parse(sessionStorage.getItem('config'))
  }
  
  removeConfig(){
    sessionStorage.removeItem('config');
  }

  saveUser(user){
    if(user){
     sessionStorage.setItem('user', JSON.stringify(user));
    }
  }
  
  removeUser(){
    sessionStorage.removeItem('user');
  }
  
  getUser(){
    return JSON.parse(sessionStorage.getItem('user'));
  }

  login(user, token){
    if(user && token){
      saveUser(user);
      sessionStorage.setItem('token', token);
    }
  }
  
  setUserRole(role){
    sessionStorage.setItem('role', role);
  }
  
  removeUserRole(){
    sessionStorage.removeItem('role');
  }
  
  logout(){
    removeUser();
    sessionStorage.removeItem('token');
    removeUserRole();
  }
  
  getToken(){
    return sessionStorage.getItem('token');
  }
  
  loadState(){
    newState = {};
    newState.user = JSON.parse(sessionStorage.getItem('user'));
    newState.token = sessionStorage.getItem('token');
    newState.config = sessionStorage.getItem('config');
  }
  
  deleteState(){
    logout();
    sessionStorage.removeItem('config');
  }
  
  getter(parameter){
    return sessionStorage.getItem(parameter);
  }
  
  deleteStorage(parameter){
    sessionStorage.removeItem(parameter);
  }
  
}



function saveUser(user){
  if(user){
   sessionStorage.setItem('user', JSON.stringify(user));
  }
}

function removeUser(){
  sessionStorage.removeItem('user');
}

function getUser(){
  return JSON.parse(sessionStorage.getItem('user'));
}

function login(user, token){
  if(user && token){
    saveUser(user);
    sessionStorage.setItem('token', token);
  }
}

function setUserRole(role){
  sessionStorage.setItem('role', role);
}

function removeUserRole(){
  sessionStorage.removeItem('role');
}

function logout(){
  removeUser();
  sessionStorage.removeItem('token');
  removeUserRole();
}

function getToken(){
  return sessionStorage.getItem('token');
}

function loadState(){
  newState = {};
  newState.user = JSON.parse(sessionStorage.getItem('user'));
  newState.token = sessionStorage.getItem('token');
  newState.config = sessionStorage.getItem('config');
}

function deleteState(){
  logout();
  sessionStorage.removeItem('config');
}

function getter(parameter){ 
  return sessionStorage.getItem(parameter);
}

function deleteStorage(parameter){
  sessionStorage.removeItem(parameter);
}

function saveConfig(configArray){
  let savedConfigArray = {};
  configArray.forEach(item => {
    savedConfigArray[item.parameter] = item.value;
  })
  sessionStorage.setItem('config', JSON.stringify(savedConfigArray));
}

function getConfig(){
  return JSON.parse(sessionStorage.getItem('config'))
}

function removeConfig(){
  sessionStorage.removeItem('config');
}

export {
  login,
  logout,
  getUser,
  saveConfig,
  deleteStorage,
  getter,
  getConfig,
  setUserRole,
  removeUserRole
};