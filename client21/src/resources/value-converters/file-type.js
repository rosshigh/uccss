import {inject} from "aurelia-framework";
import {AppConfig} from "../../appConfig";

@inject(AppConfig)
export class FileTypeValueConverter {

  constructor(appconfig){
    this.config = appconfig;
  }

  toView(file) {
    var ext = file.substr(file.indexOf('.') + 1);
    var html = "";
    switch(ext.toUpperCase()){
      case "GIF":
        html = file + "<span><img src='" + this.config.HELPTICKET_FILE_DOWNLOAD_URL + "/" +  file + "' /></span>";
        break;
      case "PNG":
        html = file + "<span><img src='" + this.config.HELPTICKET_FILE_DOWNLOAD_URL + "/" +  file + "' /></span>";
        break;
      case "JPG":
            html = file + "<span><img src='" + this.config.HELPTICKET_FILE_DOWNLOAD_URL + "/" +  file + "' /></span>";
            break;
      default:
        html = file; 
    }
    return html;
  } 
}
