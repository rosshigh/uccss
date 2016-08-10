import {inject} from "aurelia-framework";
import {AppConfig} from "../../config/appConfig";

@inject(AppConfig)
export class FileTypeValueConverter {

  constructor(appconfig){
    this.config = appconfig;
  }

  toView(file, number, type) {
    var ext = file.substr(file.indexOf('.') + 1);
    var html = "";
    switch(ext.toUpperCase()){
      case "GIF":
      case "PNG":
      case "JPG":
            html = file + "<span><img src='" + this.config.FILE_DOWNLOAD_URL + type + "/" + number + "/" + file + "' /></span>";
            break;
      default:
        html = file;
    }
    return html;
  }
}
