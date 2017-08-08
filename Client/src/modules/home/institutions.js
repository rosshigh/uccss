import {inject} from 'aurelia-framework';
import {DataTable} from '../../resources/utils/dataTable';
import {AppConfig} from '../../config/appConfig';
import {People} from '../../resources/data/people';
import {is4ua} from '../../resources/data/is4ua';

@inject(DataTable, AppConfig, People, is4ua)
export class ViewInstitutions {


    constructor(datatable, config, people, is4ua) {
        this.dataTable = datatable;
        this.dataTable.initialize(this);
        this.config = config;
        this.people = people;
		this.is4ua = is4ua;
    }

    async activate() {
        let responses = await Promise.all([
            this.people.getInstitutionsArray('?order=name'),
			this.is4ua.loadIs4ua()
        ]);

        this.dataTable.updateArray(this.people.institutionsArray);
		this.dataTable.numRowsShown = "50";
        this.dataTable.updateTake();
        var inst = this.people.institutionsArray[0]
        this.institutionAddress = inst.address1 + "," + inst.city + ", " + inst.region + ", " + inst.postalCode;

        this.geocoder = new google.maps.Geocoder();  
    }

    attached(){
        this.selectedRow = $('#firstRow');
        var that = this;
        var map;
        this.geocoder.geocode({ 'address': this.institutionAddress }, function (results, status) {  
            if (status == google.maps.GeocoderStatus.OK) {  
                 that.map = new google.maps.Map(document.getElementById('map'), {
                    center: results[0].geometry.location,
                    zoom: 8
                });
            }
        })
    }

    getAddress(inst, el){
        this.institutionAddress = inst.address1 + "," + inst.city + ", " + inst.region + ", " + inst.postalCode;
        if (this.selectedRow) this.selectedRow.children().removeClass('info');
        this.selectedRow = $(el.target).closest('tr');
        this.selectedRow.children().addClass('info')
        this.drawMap();
    }

    drawMap(){
        var map = this.map;
        this.geocoder.geocode({ 'address': this.institutionAddress }, function (results, status) {  
            if (status == google.maps.GeocoderStatus.OK) {  
                map.setCenter(results[0].geometry.location);  
                var marker = new google.maps.Marker({  
                    map: map,  
                    position: results[0].geometry.location  
                });  
            } else {  
                alert('Geocode was not successful for the following reason: ' + status);  
            }  
        });  

    }

}