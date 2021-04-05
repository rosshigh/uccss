import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { People } from '../../../resources/data/people';
import { is4ua } from '../../../resources/data/is4ua';
import { AppConfig } from '../../../appConfig';
import { Utils } from '../../../resources/utils/utils';

@inject(Router, People, is4ua, AppConfig, Utils)
export class PeopleTable {

    pageSize = 200;
    defaultPhoneMask = "999-999-9999";

    constructor(router, people, is4ua, config, utils) {
        this.router = router;
        this.people = people;
        this.is4ua = is4ua;
        this.config = config;
        this.utils = utils;

        this.filters = [
            { value: '', keys: ['fullName', 'email', 'roles'] }
        ];
    }

    async activate() {
        $("#loading").show();
        let responses = await Promise.all([
            this.people.getPeopleArray('?order=lastName&filter=personStatus|eq|01'),
            this.is4ua.loadIs4ua(),
            this.people.getInstitutionArray('?order=name')
        ]);
        $("#loading").hide();
    }

    attached() {
        $("#loading").hide();
        var $th = $('.tableFixHead').find('thead th')
        $('.tableFixHead').on('scroll', function () {
            $th.css('transform', 'translateY(' + this.scrollTop + 'px)');
        });
        $('#filterField').focus();
        $('[data-toggle="tooltip"]').tooltip();
    }

    async refresh() {
        $('#loading').show();
        await this.people.getPeopleArray('?order=lastName&filter=personStatus|eq|' + this.loadStatus);
        $('#loading').hide();
    }

    institutionName(row) {
        if (row.institutionId !== null) {
            return row.institutionId.name;
        } else {
            return null;
        }
    }

    sortInstitutionName(a, b, sortOrder) {

        if (a.institutionId == null || b.institutionId == null) {
            return -1 * sortOrder;
        }

        let name1 = a.institutionId.name;
        let name2 = b.institutionId.name;

        if (name1 === name2) {
            return 0;
        }

        if (name1 > name2) {
            return 1 * sortOrder;
        }

        return -1 * sortOrder;
    }

    async edit(person) {
        this.selectedPersonId = person._id;
        this.router.navigate("editPerson/" + this.selectedPersonId);
        // await this.people.getPerson(this.selectedPersonId);
      
        // this.filterRoles();
        // this.router.navigate("home");
    }
   
    downloadInstExcel() {
        let csvContent = "data:text/csv;charset=utf-8;,First Name,Last Name,Email,Phone,Institution,Country,Region,Status,Roles\r\n";
        this.dataTable.baseArray.forEach(item => {
            let isActive = item.personStatus == '01' ? 'Active' : 'Inactive';
            csvContent += item.firstName + ","
                + item.lastName.replace(',', ' ') + ","
                + item.email + ","
                + item.phone + ","
                + item.institutionId.name.replace(",", " ") + ","
                + item.country + ","
                + item.region + ","
                + isActive + ","
                + item.roles.join(":");
            csvContent += "\r\n";
        })
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "people.csv");
        document.body.appendChild(link); // Required for FF

        link.click();
    }
}