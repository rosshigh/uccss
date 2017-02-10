import {inject} from 'aurelia-framework';
import {DialogService} from 'aurelia-dialog';
import {ConfirmDialog} from './confirm-dialog';
import {MessageDialog} from './message-dialog';
import {NoteDialog} from './note-dialog';

@inject(DialogService)
export class CommonDialogs {
  noteBody = "";

  constructor(dialogService) {
    this.dialogService = dialogService;
  }

  showMessage(message, title = 'Message', options = ['Ok']) {
    return this.dialogService.open({ viewModel: MessageDialog, model: { message, title, options } });
  }

  showNote( title = 'Enter Note', note, options){
    return this.dialogService.open({ viewModel: NoteDialog, model: { title, note, options } })
  }

}