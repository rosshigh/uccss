import {inject} from "aurelia-framework";
import {AppConfig} from "../../config/appConfig";

@inject(AppConfig)
export class FileTypeValueConverter {

  constructor(appconfig){
    this.config = appconfig;
  }

  toView(file, number, type='helpTickets') {
    var ext = file.substr(file.indexOf('.') + 1);
    var html = "";
    switch(ext.toUpperCase()){
      case "GIF":
      case "PNG":
      case "JPG":
            html = file + "<span><img src='" + this.config.HELPTICKET_FILE_DOWNLOAD_URL + "/" + number + "/" + file + "' /></span>";
            // ${config.HELPTICKET_FILE_DOWNLOAD_URL}/${helpTickets.selectedHelpTicket.helpTicketNo}/${file.fileName}
            break;
      default:
        html = file;
    }
    return html;
  } 
}
