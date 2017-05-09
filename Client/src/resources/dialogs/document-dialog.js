import {DialogController} from 'aurelia-dialog';
import {inject} from 'aurelia-framework';
import {DocumentsServices} from '../data/documents';

@inject(DialogController, DocumentsServices)
export class DocumentDialog {
  constructor(dialogController, documents) {
    this.dialogController = dialogController;
    this.documents = documents;
  }
  
  activate(model) {
    this.model = model;
    this.filteredDocumentArray = model.documents.documentCats;
  }
  
  selectOption(option) {
    if(isCancel(option)) {
      this.dialogController.cancel(option);
    } else {
      this.dialogController.ok(this.model);
    }
  }

  filterList(){
    if(this.filter){
          var thisFilter = this.filter
          this.filteredDocumentArray = this.model.documents.documentCats.filter((item) => {
          return item.description.substring(0, thisFilter.length).toUpperCase() === thisFilter.toUpperCase();
          });
      } else {
          this.filteredDocumentArray = this.model.documents.documentCats;
      }
  }

  async typeChanged(index){
    if(index >= 0){
        this.categoryIndex = index;
        this.documents.selectCategory(index);
        await this.documents.getDocumentsArray(true, '?filter=categoryCode|eq|' + this.documents.selectedCat.code);
        this.showDocuments = true;
      }
  }

  chooseDocument(index, event){
        this.documents.selectDocument(index);

        //Reset the selected row
        if (this.selectedRow) this.selectedRow.children().removeClass('info');
        this.selectedRow = $(event.target).closest('tr');
        this.selectedRow.children().addClass('info')
        this.showDocumentForm = true;
  }

  addDocument(index){
        // if(!this.selectedDocuments) this.selectedDocuments = new Array();
        for(var i = 0; i < this.model.documents.documents.length; i++){
            if(this.model.documents.documents[i].fileName == this.documents.selectedDocument.files[index].fileName){
                return;
            }
        }
        var newDoc = {
            categoryCode: this.documents.selectedDocument.categoryCode,
            categoryName: this.documents.selectedDocument.name,
            fileName: this.documents.selectedDocument.files[index].fileName,
            default: true
        }
        this.model.documents.documents.push(newDoc);
  }

  removeDocument(index){
         this.selectedDocuments.splice(index, 1);
  }
}

function isCancel(option) {
  return ['cancel', 'no'].indexOf(option.toLowerCase()) !== -1;
}