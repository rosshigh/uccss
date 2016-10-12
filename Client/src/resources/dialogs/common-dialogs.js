import {inject} from 'aurelia-framework';
import {DialogService} from 'aurelia-dialog';
import {ConfirmDialog} from './confirm-dialog';
import {MessageDialog} from './message-dialog';

@inject(DialogService)
export class CommonDialogs {
  constructor(dialogService) {
    this.dialogService = dialogService;
  }

  showMessage(message, title = 'Message', options = ['Ok']) {
    return this.dialogService.open({ viewModel: MessageDialog, model: { message, title, options } });
  }

}