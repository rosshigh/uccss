import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {FetchConfig} from 'aurelia-auth';
import {DataServices} from './resources/data/dataServices';

import AppRouterConfig from './config/routerConfig';
import {AppConfig} from './config/appConfig';
import 'bootstrap/js/bootstrap.min';

@inject(HttpClient, AppRouterConfig, AppConfig, FetchConfig, DataServices)
export class App {
  

  constructor(httpClient, appRouterConfig, appConfig, fetchConfig, data){
         this.httpClient = httpClient;
         this.appRouterConfig = appRouterConfig;
         this.appConfig = appConfig;
         this.fetchConfig = fetchConfig;
         this.data = data;
    }
    

  activate(){
        this.appRouterConfig.configure();
        this.fetchConfig.configure();
        this.httpClient.configure(config => {
        config
            .withBaseUrl(this.appConfig.BASE_URL)
            .withDefaults({
                credentials: 'same-origin',
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'Fetch',
                    'Content-Type': 'application/json'
                }
            })
            .withInterceptor({
                request(request) {
                    console.log(`Requesting ${request.method} ${request.url}`);
                    return request; // you can return a modified Request, or you can short-circuit the request by returning a Response
                },
                response(response) {
                    console.log(`Received ${response.status} ${response.url}`);
                    return response; // you can return a modified Response
                }
            });
        });
  }
  
}