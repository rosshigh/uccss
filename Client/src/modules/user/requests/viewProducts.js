import {inject} from 'aurelia-framework';
import {DataTable} from '../../../resources/utils/dataTable';
import {Products} from '../../../resources/data/products';
import {AppConfig} from '../../../config/appConfig';

@inject( AppConfig, DataTable, Products)
export class ViewProducts {

	constructor( config, datatable, products) {
    this.config = config;
    this.dataTable = datatable;
    this.dataTable.initialize(this);
    this.products = products;

    this.userObj = JSON.parse(sessionStorage.getItem('user'))
  };

  async activate() {
    let responses =  await Promise.all([
      this.products.getProductsArray('?filter=active|eq|true&order=name', true),
      this.config.getConfig() 
    ]);
	//  this.dataTable.updateArray(this.products.productsArray);
	this.filterList();
  }

  filterList(){
      if(this.filter){
        var thisFilter = this.filter
        this.filteredProductsArray = this.products.productsArray.filter((item) => {
          return item.name.toUpperCase().indexOf(thisFilter.toUpperCase()) != -1;
        });
      } else {
          this.filteredProductsArray = this.products.productsArray;
      }
  }

   showCurriculum(product, $event){
    this.productInfoObject = this.products.getProductInfo(product._id);
    if(this.productInfoObject)  $("#curriculumInfo").css("display", "block");
  }

  hideCurriculum() {
    $("#curriculumInfo").css("display", "none");
  }
}