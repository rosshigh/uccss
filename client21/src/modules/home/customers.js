import { inject } from 'aurelia-framework';
import { People } from '../../resources/data/people';

@inject(People)
export class Customers {

    pageSize = 200;

    constructor(people){
        this.people = people;

        this.filters = [
            { value: '', keys: ['name', 'country', 'region'] }
        ];
    }

    async activate() {
        let responses = await Promise.all([
            this.people.getInstitutionArray('?filter=institutionStatus|eq|01&order=name')
        ]);

        this.people.institutionsArray.forEach((item, index) => {
            if(item.name == 'HEC Montréal'){
                this.people.institutionsArray.splice(index, 1);
            }
            if(item.name == '-- UA Staff --'){
                this.people.institutionsArray.splice(index, 1);
            }
            if(item.memberType == '04'){
                this.people.institutionsArray.splice(index, 1);
            }
        });
        // var inst = this.people.institutionsArray[0]
        // this.institutionName = inst.name;
        // this.institutionAddress = inst.address1 + "," + inst.city + ", " + inst.region + ", " + inst.postalCode;

        // this.geocoder = new google.maps.Geocoder();  
    }

}