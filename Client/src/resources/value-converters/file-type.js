import {inject} from "aurelia-framework";
import {AppConfig} from "../../config/appConfig";

@inject(AppConfig)
export class FileTypeValueConverter {

  constructor(appconfig){
    this.config = appconfig;
  }

  toView(file, number, type='helpTickets', orignalFilename) {
    var ext = file.substr(file.indexOf('.') + 1);
    var html = "";
    switch(ext.toUpperCase()){
      case "GIF":
      case "PNG":
      case "JPG":
            html = orignalFilename + "<span><img src='" + this.config.HELPTICKET_FILE_DOWNLOAD_URL + "/" + number + "/" + file + "' /></span>";
            break;
      default:
        html = file; 
    }
    return html;
  } 
}
