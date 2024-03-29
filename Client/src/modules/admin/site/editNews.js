import { inject } from 'aurelia-framework';
import { DataTable } from '../../../resources/utils/dataTable';
import { AppConfig } from '../../../config/appConfig';
import { Utils } from '../../../resources/utils/utils';
import { SiteInfo } from '../../../resources/data/siteInfo';
import { CommonDialogs } from '../../../resources/dialogs/common-dialogs';
import Validation from '../../../resources/utils/validation';

@inject(DataTable, SiteInfo, Utils, CommonDialogs, Validation, AppConfig)
export class EditNews {
  newsItemSelected = false;
  spinnerHTML = "";
  isInformationItem = false;
  isChecked = true;

  toolbar = [
    ['style', ['style', 'bold', 'italic', 'underline', 'clear']],
    ['color', ['color']],
    ['font', ['strikethrough', 'superscript', 'subscript']],
    ['layout', ['ul', 'ol', 'paragraph']],
    ['insert', ['link', 'table', 'hello']],
    ['misc', ['undo', 'redo', 'fullscreen', 'codeview']]
  ];

  constructor(datatable, siteinfo, utils, dialog, validation, config) {
    this.dataTable = datatable;
    this.dataTable.initialize(this);
    this.utils = utils;
    this.siteinfo = siteinfo;
    this.dialog = dialog;
    this.config = config;
    this.validation = validation;
    this.validation.initialize(this);
    this._setupValidation();

    this.userObj = JSON.parse(sessionStorage.getItem('user'));
  }

  attached() {
    $('[data-toggle="tooltip"]').tooltip();
  }

  async activate() {
    await this.siteinfo.getObjectsArray(true, '?order=createdDate');
    await this.config.getConfig();
    this.dataTable.updateArray(this.siteinfo.objectsArray);
    this.filterOutExpired();
  }

  async refresh() {
    this.spinnerHTML = "<i class='fa fa-spinner fa-spin'></i>";
    await this.siteinfo.getObjectsArray(true);
    this.dataTable.updateArray(this.siteinfo.objectsArray);
    this.spinnerHTML = "";
  }

  async new() {
    this.editIndex = -1;
    this.siteinfo.selectObject(this.editIndex);
    $("#editTitle").focus();
    this.newsItemSelected = true;
  }

  async edit(index, el, item) {
    // this.siteinfo.setSiteItem(item)
    // this.originalSiteInfo = this.utils.copyObject(this.siteinfo.selectedObject);
    await this.siteinfo.getObject(id);

    //Editing a product
    $("#editTitle").focus();

    //Reset the selected row
    if (this.selectedRow) this.selectedRow.children().removeClass('info');
    this.selectedRow = $(el.target).closest('tr');
    this.selectedRow.children().addClass('info')
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    this.newsItemSelected = true;
  }

  cancel() {
    if (this.editIndex == -1) {
      this.new();
    } else {
      this.siteinfo.selectObject(this.editIndex);
    }
  }

  async save() {
    if (this.validation.validate(1)) {
      let serverResponse = await this.siteinfo.saveObject();
      if (!serverResponse.error) {
        this.refresh();
        // this.dataTable.updateArray(this.siteinfo.objectsArray);
        this.utils.showNotification("The item was saved");
        if (this.filesToUpload && this.filesToUpload.length > 0) {
          this.siteinfo.uploadFile(this.filesToUpload);
        }
      } else {
        this.utils.showNotification("There was a problem saving the item", 'error');
      }
      this._cleanUp();
    }
  }

  changeFiles() {
    this.filesToUpload = new Array();
    this.filesToUpload.push(this.files[0]);
    this.siteinfo.selectedObject.url = this.config.DOWNLOAD_URL + '/site/' + this.filesToUpload[0].name;
    this.siteinfo.selectedObject.file.fileName = this.filesToUpload[0].name;
  }

  removeFile(index) {
    this.filesToUpload.splice(index, 1);
  }

  delete() {
    return this.dialog.showMessage(
      "Are you sure you want to delete the item?",
      "Delete Item",
      ['Yes', 'No']
    ).whenClosed(response => {
      if (!response.wasCancelled) {
        this.deleteItem();
      }
    });
  }

  async deleteItem() {
    let serverResponse = await this.siteinfo.deleteObject();
    if (!serverResponse.error) {
      this.refresh();
      // this.dataTable.updateArray(this.siteinfo.objectsArray);
      this.utils.showNotification("The Item was deleted");
    }
    this.newsItemSelected = false;
    this.selectedFiles = undefined;
    this.files = undefined;
  }

  back() {
    var changes = this.siteinfo.isDirty(this.originalSiteInfo);
    if (changes.length) {
      return this.dialog.showMessage(
        "The item has been changed. Do you want to save your changes?",
        "Save Changes",
        ['Yes', 'No']
      ).whenClosed(response => {
        if (!response.wasCancelled) {
          this.save();
        } else {
          this.newsItemSelected = false;
        }
      });
    } else {
      this.newsItemSelected = false;
    }
  }

  _cleanUp() {
    this._cleanUpFilters();
    this.filesToUpload = new Array(); 
    this.selectedFiles = undefined;
    this.files = undefined;
    this.newsItemSelected = false;
  }

  _cleanUpFilters() {
    this.urlFilterValue = "";
    this.itemTypeFilter = "";
    this.expiredDateFilterValue = "";
    this.createdDateFilterValue = "";
    this.titleFilterValue = "";
    this.urlFilterValue = "";
    this.dataTable.updateArray(this.siteinfo.objectsArray);
    this.filterOutExpired();
  }

  _setupValidation() {
    this.validation.addRule(1, "editTitle", [{ "rule": "required", "message": "Title is required", "value": "siteinfo.selectedObject.title" }]);
  }

  //TODO: Fix This
  filterOutExpired() {
    // this._cleanUpFilters();
    if (this.isChecked) {
      this.dataTable.filterList(new Date(), { type: 'date', filter: "expiredFilter", collectionProperty: 'expiredDate', compare: 'after' });
    } else {
      this.dataTable.updateArray(this.siteinfo.objectsArray);
    }
  }

}
