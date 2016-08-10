import {inject} from 'aurelia-framework';
import {DataServices} from './dataServices';

@inject(DataServices)
export class is4ua {

    constructor(data) {
        this.data = data;
    }
    
    async loadIs4ua(){
        if(!this.personStatusArray){
        let responses = await this.data.get(this.data.IS4UA);
           
        this.personStatusArray = responses[0].personStatus;
        this.deptArray = responses[0].deptCat;
        this.specialArray = responses[0].personSpecialization;
        
        this.sapProductsArray = responses[0]["sap-products"];
        this.uaCurriculumArray = responses[0]["ua-curriculum"];
        this.uaDataSetsArray = responses[0]["ua-datasets"];
        
        this.institutonStatusArray = responses[0].institutionStatus;
        this.institutionTypes = responses[0].institutionTypes;
        this.memberTypes = responses[0].memberTypes;
        this.highestDegrees = responses[0].highestDegree;    
        }
    }

    async loadProductKeys() {
        let responses = await Promise.all([
            this.data.getAllObjects(this.data.SAP_PRODUCTS),
            this.data.getAllObjects(this.data.UA_CURRICULUM),
            this.data.getAllObjects(this.data.UA_DATA_SETS)
        ]);
        this.sapProductsArray = responses[0];
        this.uaCurriculumArray = responses[1];
        this.uaDataSetsArray = responses[2];
    }

    async loadPeopleKeys() {
        let responses = await Promise.all([
            this.data.getAllObjects(this.data.UA_PERSON_STATUS),
            this.data.getAllObjects(this.data.UA_PERSON_DEPT),
            this.data.getAllObjects(this.data.UA_PERSON_SPECIAL)
        ]);
        this.personStatusArray = responses[0];
        this.deptArray = responses[1];
        this.specialArray = responses[2];
    }

    async loadInstitutionKeys() {
        let responses = await Promise.all([
            this.data.getAllObjects(this.data.UA_INST_STATUS),
            this.data.getAllObjects(this.data.UA_INST_TYPES),
            this.data.getAllObjects(this.data.UA_MEMBER_TYPES),
            this.data.getAllObjects(this.data.UA_INST_DEGREES)
        ]);
        this.institutonStatusArray = responses[0];
        this.institutionTypes = responses[1];
        this.memberTypes = responses[2];
        this.highestDegrees = responses[3];
    }
}