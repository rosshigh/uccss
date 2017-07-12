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
    }
}