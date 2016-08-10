import {inject} from 'aurelia-framework';
import {DataServices} from './dataServices';
import {Utils} from '../utils/utils';
import {AppConfig} from '../../config/appConfig';

@inject(DataServices, Utils, AppConfig)
export class ClientRequests {
    editIndex;              //Index of selected product

    constructor(data, utils, config) {
        this.data = data;
        this.utils = utils;
        this.config = config;
    }

    async getClientRequestsArray(refresh, options, fields){
        if (!this.requestsArray || refresh) {
          var url = this.data.CLIENT_REQUESTS_SERVICES;
          url += options ? options : "";
            try {
                let serverResponse = await this.data.get(url);
                if (!serverResponse.status) {
                    this.requestsArrayInternal = serverResponse;
                    this.requestsArray = serverResponse;
                    for (var i = 0, x = this.requestsArrayInternal.length; i < x; i++) {
                        this.requestsArrayInternal[i].baseIndex = i;
                    }
                } else {
                    return undefined;
                }
            } catch (error) {
                console.log(error);
                return undefined;
            }
        }
        return this.requestsArray;
    }

   async getPersonSesssionClientRequestsArray(personId, sessionId){
      sessionId = sessionId || this.selectedRequest.sessionId;

      if( !personId || !sessionId ) return;

      var url = this.data.CLIENT_REQUESTS_PERSON_SESSION.replace('PERSONID', personId).replace('SESSIONID', sessionId) ;
      try {
          let serverResponse = await this.data.get(url);
          if (!serverResponse.status) {
              this.requestsArrayInternal = serverResponse;
              this.requestsArray = serverResponse;
              for (var i = 0, x = this.requestsArrayInternal.length; i < x; i++) {
                  this.requestsArrayInternal[i].baseIndex = i;
              }
          } else {
              return undefined;
          }
      } catch (error) {
          console.log(error);
          return undefined;
      }
      return this.requestsArray;
   }

    async getPersonClientRequestsArray(refresh, options,){
        var url = this.data.CLIENT_REQUESTS_SERVICES;
        url += options ? options : "";
        try {
            let serverResponse = await this.data.get(url);
            if (!serverResponse.status) {
                this.requestsArrayInternal = serverResponse;
                this.requestsArray = serverResponse;
                for (var i = 0, x = this.requestsArrayInternal.length; i < x; i++) {
                    this.requestsArrayInternal[i].baseIndex = i;
                }
            } else {
                return undefined;
            }
        } catch (error) {
            console.log(error);
            return undefined;
        }
        return this.requestsArray;
    }

    async getCount(options){
         var url = this.data.CLIENT_REQUESTS_SERVICES +'/count';
         url += options ? options : "";
        var response = await this.data.get(url);
        if (!response.status) {
            return response.count;
        } else {
            return null;
        }
    }
    
    async getCurrentCount(options){
        var url = this.data.CLIENT_REQUESTS_SERVICES +'/current/count';
        url += options ? options : "";
        var response = await this.data.get(url);
        if (!response.status) {
            this.unassignedRequests = this.utils.countItems(1, 'requestStatus', response);
            this.updatedRequests =  this.utils.countItems(3, 'requestStatus', response);
            this.customerActionRequests =  this.utils.countItems(4, 'requestStatus', response);
            return response.count;
        } else {
            return null;
        }
    }

    selectRequest(index){
        if (index === undefined) {
            this.selectedRequest = this.emptyRequest();
        } else {
            try {
                this.selectedRequest = this.utils.copyObject(this.requestsArray[index]);
                this.editRequestIndex = index;
            } catch (error) {
                console.log(error);
                this.selectedRequest = this.emptyRequest();
            }

        }
    }

    selectRequstById(id){
      this.selectedRequest = null;
      for(var i = 0; i < this.requestsArrayInternal.length; i++){
        if(this.requestsArrayInternal[i]._id === id){
          this.selectedRequest = this.utils.copyObject(this.requestsArrayInternal[i]);
          break;
        }
      }
    }

    setSelectedRequest(request){
      this.selectedRequest = this.utils.copyObject(request);
    }

    emptyRequest(){
        var newObj = new Object();;
        newObj.requestStatus = this.config.UNASSIGNED_REQUEST_CODE;
        newObj.undergradIds = 0;
        newObj.graduateIds = 0;
        newObj.addUndergraduates = 0;
        newObj.addGraduates = 0;
        newObj.comments = "";
        newObj.requestDetails = new Array();
        newObj.audit = new Array();
        newObj.audit.push({
            event: 'Created',
            eventDate: this.utils.convertUTCDateToLocalDate(new Date()),
            personId: ""
        })
        return newObj;
    }

    async selectRequestDetails(index){
        if(this.selectedRequest._id){
            if(index === undefined || index > this.selectedRequest.requestDetails.length-1){
                this.emptyRequestDetail();
            } else {
                this.selectedRequestDetail = this.selectedRequest.requestDetails[index];
                this.requestDetailIndex = index;
            }
            return this.selectedRequestDetail;
        }
    }

    selectRequestDetail(index){
          if(index === undefined || index > this.requestsDetailsArray.length - 1){
              this.emptyRequestDetail();
          } else {
              this.selectedRequestDetail = this.requestsDetailsArray[index];
              this.requestDetailIndex = index;
          }
          return this.selectedRequestDetail;
    }

    setSelectedRequestDetail(request){
      this.selectedRequestDetail = this.utils.copyObject(request);
    }

    emptyRequestDetail(){
        var newObj = new Object();;
        newObj.createdDate = this.utils.convertUTCDateToLocalDate(new Date());
        newObj.modifiedDate = this.utils.convertUTCDateToLocalDate(new Date());;
        newObj.requestStatus = this.config.UNASSIGNED_REQUEST_CODE;
        return newObj;
    }

    async saveRequest(){
        if(!this.selectedRequest){
            return;
        }

        if(!this.selectedRequest._id){
            let serverResponse = await this.data.saveObject(this.selectedRequest, this.data.CLIENT_REQUESTS_SERVICES, "post");
            if(!serverResponse.status){
                if(this.requestsArrayInternal){
                    this.requestsArrayInternal.push(this.selectedRequest);
                    this.requestsArray =  this.requestsArrayInternal;
                }
            }
            return serverResponse;
        } else {
            var serverResponse = await this.data.saveObject(this.selectedRequest, this.data.CLIENT_REQUESTS_SERVICES, "put");
            if(!serverResponse.status){
                 if(this.requestsArrayInternal && this.editRequestIndex){
                    this.requestsArrayInternal[this.requestsArray[this.editRequestIndex].baseIndex] = this.utils.copyObject(this.selectedRequest);
                    this.requestsArray =  this.requestsArrayInternal;
                 }
            }
            return serverResponse;
        }
    }

    isRequestDirty(obj){
      if(this.selectedRequest){
          if(!obj){
              var obj = this.emptyRequest();
          }
            var skip = ['audit'];
            return this.utils.objectsEqual(this.selectedRequest, obj, skip);
        }
        return new Array();
    }
    
    async sendCustomerMessage(message){
        console.log(message)
        let serverResponse = await this.data.saveObject(message, this.data.CLIENT_REQUESTS_SEND_MESSAGE, "put");
        return serverResponse;
    }

    async getClientRequestsDetailsArray(refresh, options){
        if (!this.requestsArray || refresh) {
          var url = this.data.CLIENT_REQUEST_DETAILS;
          url += options ? options : "";
            try {
                let serverResponse = await this.data.get(url);
                if (!serverResponse.status) {
                    this.requestsDetailsArrayInternal = serverResponse;
                    this.requestsDetailsArray = serverResponse;
                    for (var i = 0, x = this.requestsDetailsArrayInternal.length; i < x; i++) {
                        this.requestsDetailsArrayInternal[i].baseIndex = i;
                    }
                } else {
                    return undefined;
                }
            } catch (error) {
                console.log(error);
                return undefined;
            }
        }
        return this.requestsDetailsArray;
    }

    async saveRequestDetail(){
      console.log(this.selectedRequestDetail);
        if(!this.selectedRequestDetail){
            return;
        }

        if(!this.selectedRequestDetail._id){
            let serverResponse = await this.data.saveObject(this.selectedRequestDetail, this.data.CLIENT_REQUEST_DETAILS, "post");
            if(!serverResponse.status){
                if(this.requestsDetailsArrayInternal){
                    this.requestsDetailsArrayInternal.push(this.selectedRequestDetail);
                    this.requestsDetailArray =  this.requestsDetailsArrayInternal;
                }
            }
            return serverResponse;
        } else {
            var serverResponse = await this.data.saveObject(this.selectedRequestDetail, this.data.CLIENT_REQUEST_DETAILS, "put");
            if(!serverResponse.status){
                 if(this.requestsDetailsArrayInternal && this.requestDetailIndex){
                    this.requestsDetailsArrayInternal[this.requestsArray[this.requestDetailIndex].baseIndex] = this.utils.copyObject(this.selectedRequestDetail);
                    this.requestsDetailArray =  this.requestsDetailsArrayInternal;
                 }
            }
            return serverResponse;
        }
    }

    groupRequestsByInstitution(){
        if(!this.requestsDetailsArray) {
            return;
        }

        // var sortedArray = this.sortArray("requestId.institutionID","ASC")
        var sortedArray = this.requestsDetailsArrayInternal 
            .sort((a, b) => {
                var result = (a['requestId'].institutionId < b['requestId'].institutionId) ? -1 : (a['requestId'].institutionId > b['requestId'].institutionId) ? 1 : 0;
                return result;
            });

        this.analyticsResultArray = new Array();
        var instID = "";
        var numStatuses = this.config.REQUEST_STATUS.length;
        var templateObj = new Object();
        for(var i = 0; i < numStatuses; i++){
            templateObj[this.config.REQUEST_STATUS[i].code] = 0;
        }
        var that = this;
        sortedArray.forEach(function(item){
            if(item.requestId.institutionId != instID){
                instID = item.requestId.institutionId;
                var obj = that.utils.copyObject(templateObj);
                obj.institutionId = item.requestId.institutionId;
                that.analyticsResultArray.push(obj);
            }
            that.analyticsResultArray[that.analyticsResultArray.length-1][item.requestStatus] += 1;
        })
        
    }

    async getCoursessArray(refresh, options, fields) {
        if (!this.productsArray || refresh) {
            var url = this.data.COURSES_SERVICE
            url += (options || fields ? "?" : "");
            url += (options ? 'order=' + options.sortProp : "");
            url += (options && fields ? "&" : "");
            url +=  (fields ? 'fields=' + fields.fields : "");
            try {
                let serverResponse = await this.data.get(url);
                if (!serverResponse.status) {
                    this.coursesArrayInternal = serverResponse;
                    this.coursesArray = serverResponse;
                    for (var i = 0, x = this.coursesArrayInternal.length; i < x; i++) {
                        this.coursesArrayInternal[i].baseIndex = i;
                    }
                } else {
                    return undefined;
                }
            } catch (error) {
                console.log(error);
                return undefined;
            }
        }
        return this.coursesArray;
    }

    selectCourse(index) {
        if (index === undefined) {
            this.selectedCourse = this.emptyCourse();
        } else {
            try {
                this.selectedCourse = this.utils.copyObject(this.coursesArray[index]);
                this.newSystem = false;
                this.editCourseIndex = index;
            } catch (error) {
                console.log(error);
                this.selectedCourse = this.emptyCourse();
                this.newSystem = true;
            }

        }
    }

    emptyCourse() {
        var newObj = new Object();;
        newObj.name = "";
        newObj.description = "";
        newObj.number = "";
        newObj.active = true;
        return newObj;
    }

    async saveCourse() {
        if(!this.selectedCourse){
            return;
        }

        if(!this.selectedCourse._id){
            let serverResponse = await this.data.saveObject(this.selectedCourse, this.data.PRODUCTS_SERVICE, "post");
            if (!serverResponse.status) {
                this.coursesArrayInternal.push(this.selectedCourse);
                this.coursesArray = coursesArrayInternal;
                this.editIneditCourseIndexdex = this.coursesArrayInternal.length - 1;
                this.newSystem = false;
            } else {
                     this.data.processError(response, "There was an error creating the product.");
                }
            return serverResponse;
        } else {
            var serverResponse = await this.data.saveObject(this.selectedCourse, this.data.PRODUCTS_SERVICE, "put");
            if (!serverResponse.status) {
                this.coursesArray[this.editCourseIndex] = this.utils.copyObject(this.selectedCourse, this.coursesArray[this.editCourseIndex]);
                this.coursesArrayInternal[this.coursesArray[this.editCourseIndex].baseIndex] = this.utils.copyObject(this.selectedCourse, this.coursesArrayInternal[this.coursesArray[this.editCourseIndex].baseIndex]);
            } else {
                     this.data.processError(response, "There was an error updating the course.");
                }
            return serverResponse;
        }

    }

    isDirty(){
        if(this.editCourseIndex >= 0 && this.selectedCourse){
            return this.utils.objectsEqual(this.selectedCourse, this.coursesArray[this.editCourseIndex]);
        }
    }

    // filterProducts(filters, sort) {
    //     var keep;
    //     var index = 0;
    //     this.productsArray = this.productsArrayInternal.filter((item) => {
    //         //Assume the item should be eliminated
    //         keep = false;
    //         //For each filter in filterValues
    //         for (var i = 0, x = filters.length; i < x; i++) {
    //             keep = item[filters[i].property] === filters[i].value;
    //             if (!keep) break;
    //         }
    //         return keep;
    //     })

    //     if (sort) {
    //         this.sortArray(sort);
    //     } else {
    //         return this.productsArray;
    //     }
    // }

    sortArray(propertyName, sortDirection) {
        var propName = propertyName;
        var sortDirection = sortDirection = "ASC" ? 1 : -1;
        return this.requestsDetailsArrayInternal 
            // .slice(0)
            .sort((a, b) => {
                var result = (a[propName] < b[propName]) ? -1 : (a[propName] > b[propName]) ? 1 : 0;
                return result * sortDirection;
            });
    }

}
