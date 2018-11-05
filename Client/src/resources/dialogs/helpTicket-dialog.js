import { DialogController } from 'aurelia-dialog';
import { inject } from 'aurelia-framework';
import { AppConfig } from '../../config/appConfig';

@inject(DialogController, AppConfig)
export class HelpTicketDialog {
    constructor(dialogController, config) {
        this.dialogController = dialogController;
        this.config = config;
        this.otherReason = "";
        this.method = "";
    }

    activate(model) {
        this.model = model;
        this.model.selectedReason = "";
    }

    selectOption(option) {
        if (isCancel(option)) {
            this.dialogController.cancel(option);
        } else {
            this.dialogController.ok(this.model);
        }
    }

    reasonSelected() {
        if (this.model.selectedReason == this.config.HELP_TICKET_CLOSE_REASON_OTHER) {
            setTimeout(() => {$("#otherReason").focus()},200);
        } else {
            $("#method").focus();
        }
    }
}

function isCancel(option) {
    return ['cancel', 'no'].indexOf(option.toLowerCase()) !== -1;
}

