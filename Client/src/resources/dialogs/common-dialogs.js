import {inject} from 'aurelia-framework';
import {DialogService} from 'aurelia-dialog';
import {ConfirmDialog} from './confirm-dialog';
import {MessageDialog} from './message-dialog';
import {NoteDialog} from './note-dialog';
import {EmailDialog} from './email-dialog';
import {DocumentDialog} from './document-dialog';
import {PasswordDialog} from './password-dialog';
import {EventDialog} from './event-dialog';

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

  showEmail( title = 'Enter Email', email, options){
    return this.dialogService.open({ viewModel: EmailDialog, model: { title, email, options } })
  }

  showDocument(title = "Select Document", documents, options){
     return this.dialogService.open({ viewModel: DocumentDialog, model: { title, documents, options } })
  }

  showPassword(title = "Change Password", passwords, options){
     return this.dialogService.open({ viewModel: PasswordDialog, model: { title, passwords, options } })
  }

  showEvent( title = 'Enter Event', event, options){
    return this.dialogService.open({ viewModel: EventDialog, model: { title, note, options } })
  }

}