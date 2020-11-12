import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductBean } from 'src/app/_model/ProductBean';
import { RestService } from 'src/app/_service/rest.service';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})
export class SearchProductComponent implements OnInit {

  productSearchedName: string;
  productSearch: ProductBean;
  farmerList: any;
  productList: any;

  constructor(private restService: RestService, private _activatedRoute:ActivatedRoute ) { }

  ngOnInit(): void {
    this.productSearch = new ProductBean();
    this._activatedRoute.params.subscribe(params=>{
      this.productSearchedName=params['nameProduct'];
      this.productSearch.name = this.productSearchedName;
    })
    this.restService.requestApiRestData('productsales/glsps',this.productSearch).subscribe(result=>{
      console.log(result);
      console.log(result.dataMap);
      this.productList = result.dataMap;
      console.log(this.productList);
    })


  }

}
