import { inject } from 'aurelia-framework';
import { DataTable } from '../../resources/utils/dataTable';
import { AppConfig } from '../../config/appConfig';
import { Utils } from '../../resources/utils/utils';
import { Systems } from '../../resources/data/systems';
import { Products } from '../../resources/data/products';
import { CommonDialogs } from '../../resources/dialogs/common-dialogs';
import Validation from '../../resources/utils/validation';
import { DocumentsServices } from '../../resources/data/documents';
import { People } from '../../resources/data/people';

@inject(DataTable, Products, Utils, Systems, CommonDialogs, Validation, AppConfig, DocumentsServices, People)
export class EditProducts {
    selectedFiles;
    removedFiles = new Array();
    spinnerHTML = "";

    toolbar = [
        ['style', ['style', 'bold', 'italic', 'underline', 'clear']],
        ['color', ['color']],
        ['font', ['strikethrough', 'superscript', 'subscript']],
        ['fontsize', ['fontsize']],
        ['layout', ['ul', 'ol', 'paragraph']],
        ['insert', ['link', 'table', 'hello']],
        ['misc', ['undo', 'redo', 'fullscreen', 'codeview']]
    ];

    constructor(datatable, products, utils, systems, dialog, validation, config, documents, people) {
        this.dataTable = datatable;
        this.dataTable.initialize(this);
        this.utils = utils;
        this.products = products;
        this.systems = systems;
        this.dialog = dialog;
        this.config = config;
        this.documents = documents;
        this.people = people;
        this.validation = validation;
        this.validation.initialize(this);
        this._setupValidation();

        this.userObj = JSON.parse(sessionStorage.getItem('user'));
    }

    _setupValidation() {
        this.validation.addRule(1, "category", [{ "rule": "required", "message": "Category is required", "value": "people.selectedTechNote.categoryId" }]);
        this.validation.addRule(1, "noteError", [{ "rule": "required", "message": "The text of the note is required", "value": "people.selectedTechNote.note" }]);
    }

    attached() {
        $('[data-toggle="tooltip"]').tooltip();
    }

    async activate() {
        let responses = await Promise.all([
            this.people.getTechNotesArray('?order=dateCreated:DSC', true),
            this.people.getTechNotesCatArray('?order=category', true),
            this.products.getProductsArray('?order=name', true),
            this.systems.getSystemsArray('?order=sid', true),
            this.config.getConfig()
        ]);
        this.dataTable.updateArray(this.people.techNotesArray);
        this.dataTable.createPageButtons(1);
        this.filterList();
    }

    async refresh() {
        this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
        await this.people.getTechNotesArray('?order=dateCreated:DSC', true);
        this.dataTable.updateArray(this.people.techNotesArray);
        this.spinnerHTML = "";
        this._cleanUpFilters();
    }

    _cleanUpFilters() {

    }

    new() {
        this.people.selectTechNote();
        this.noteSelected = true;
    }

    edit(index, event) {
        this.people.selectTechNote(index);
        this.noteSelected = true;
    }

    back() {
        this.noteSelected = false;
    }

    cancel() {
        this.people.selectTechNote();
    }

    async save() {
        if (this.validation.validate(1)) {
            this.people.selectedTechNote.personId = this.userObj._id;
            let response = await this.people.saveTechNote();
            if (!response.error) {
                this.utils.showNotification('The note was saved');

                if (this.filesToUpload && this.filesToUpload.length > 0) {
                    await this.people.uploadTechFile(this.filesToUpload, response._id);
                }
                await this.refresh();
                this.dataTable.updateArray(this.people.techNotesArray);
                this._cleanUp();
            } else {
                this.utils.showNotification('There was an error saving the note');
            }
        }
    }

    changeFiles() {
        this.filesToUpload = new Array();
        this.filesToUpload.push(this.files[0]);
    }

    removeFile(index) {
        this.filesToUpload.splice(index, 1);
    }

    _cleanUp() {
        this.filesToUpload = new Array();
        this.selectedFiles = undefined;
        this.files = undefined;
        this.noteSelected = false;
    }

    openEditCatForm(newOrEdit) {
        if (newOrEdit === 'new') {
            this.people.selectTechNoteCat();
            this.categoryDescription = "";
            this.showCategoryForm = true;
        } else {
            if (this.people.selectedTechNote.categoryId) {
                this.people.selectTechNoteCatByID(this.people.selectedTechNote.categoryId);
                this.showCategoryForm = true;
            }
        }
    }

    cancelEditCategory() {
        this.showCategoryForm = false;
    }

    async saveCategory() {
        let response = await this.people.saveTechNoteCat();
        if (!response.error) {
            await this.people.getTechNotesCatArray('?order=category', true);
            this.showCategoryForm = false;
        } else {
            this.utils.showNotification('There was an error saving the category.')
        }

    }

    async deleteCat() {
        let response = await this.people.deleteTechNoteCat();
        if (response.error) {
            this.utils.showNotification('There was an error deleting the category');
        } else {
            this.showCategoryForm = false;
        }
    }

    customPersonSorter(sortProperty, sortDirection, sortArray, context) {
        context.sortDirection = context.sortDirection === null ? 1 : context.sortDirection === 1 ? -1 : 1;
        return sortArray.sort((a, b) => {
            if (a.personId === null && b.personId === null) return 0;
            if (a.personId === null && b.personId !== null) return context.sortDirection * -1;
            if (a.personId !== null && b.personId === null) return context.sortDirection;
            var result = (a.personId.lastName < b.personId.lastName) ? -1 : (a.personId.lastName > b.personId.lastName) ? 1 : 0;
            return result * context.sortDirection;
        })
    }

    customCategorySorter(sortProperty, sortDirection, sortArray, context) {
        context.sortDirection = context.sortDirection === null ? 1 : context.sortDirection === 1 ? -1 : 1;
        return sortArray.sort((a, b) => {
            if (a.categoryId === null && b.categoryId === null) return 0;
            if (a.categoryId === null && b.categoryId !== null) return context.sortDirection * -1;
            if (a.categoryId !== null && b.categoryId === null) return context.sortDirection;
            var result = (a.categoryId.category < b.categoryId.category) ? -1 : (a.categoryId.category > b.categoryId.category) ? 1 : 0;
            return result * context.sortDirection;
        })
    }

    customProductSorter(sortProperty, sortDirection, sortArray, context) {
        context.sortDirection = context.sortDirection === null ? 1 : context.sortDirection === 1 ? -1 : 1;
        return sortArray.sort((a, b) => {
            if ((a.productId === null && b.productId === null) || (a.productId === undefined && b.productId === undefined)) return 0;
            if ((a.productId === null && b.productId !== null) || (a.productId === undefined && b.productId !== undefined)) return context.sortDirection * -1;
            if ((a.productId !== null && b.productId === null) || (a.productId !== undefined && b.productId === undefined)) return context.sortDirection;
            var result = (a.productId.name < b.productId.name) ? -1 : (a.productId.name > b.productId.name) ? 1 : 0;
            return result * context.sortDirection;
        })
    }

    customSystemSorter(sortProperty, sortDirection, sortArray, context) {
        context.sortDirection = context.sortDirection === null ? 1 : context.sortDirection === 1 ? -1 : 1;
        return sortArray.sort((a, b) => {
            if ((a.systemId === null && b.systemId === null) || (a.systemId === undefined && b.systemId === undefined)) return 0;
            if ((a.systemId === null && b.systemId !== null) || (a.systemId === undefined && b.systemId !== undefined)) return context.sortDirection * -1;
            if ((a.systemId !== null && b.systemId === null) || (a.systemId !== undefined && b.systemId === undefined)) return context.sortDirection;
            var result = (a.systemId.sid < b.systemId.sid) ? -1 : (a.systemId.sid > b.systemId.sid) ? 1 : 0;
            return result * context.sortDirection;
        })
    }

    enableEdit() {
        this.enable = true;
    }

    filterList() {
        if (this.filter) {
            var thisFilter = this.filter
            this.filteredsystemsarray = this.systems.systemsArray.filter((item) => {
                return item.sid.substring(0, thisFilter.length).toUpperCase() === thisFilter.toUpperCase();
            });
        } else {
            this.filteredsystemsarray = this.systems.systemsArray;
        }

    }

    selectSystem(el, system) {

        if (!this._systemAlreadySelected(system.sid)) {
            // this.people.selectedTechNote.systems.push({ systemId: system._id, operation: "add" });
            this.people.selectedTechNote.systems.push({ sid: system.sid, systemId: system._id });
        }

    }

    _systemAlreadySelected(sid) {
        for (var i = 0; i < this.people.selectedTechNote.systems.length; i++) {
            if (this.people.selectedTechNote.systems[i].sid === sid) return true;
        }
        return false;
    }

    removeSystem(el, system) {

        for (var i = 0; i < this.people.selectedTechNote.systems.length; i++) {
            if (system.systemId === this.people.selectedTechNote.systems[i].systemId) {
                this.people.selectedTechNote.systems.splice(i, 1);
                break;
            }

        }
    }

}