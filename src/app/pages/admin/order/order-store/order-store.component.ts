import { Component, OnInit } from '@angular/core';
import { ProductSalesBean } from 'src/app/_model/ProductSalesBean';
import { RestService } from 'src/app/_service/rest.service';

@Component({
  selector: 'app-order-store',
  templateUrl: './order-store.component.html',
  styleUrls: ['./order-store.component.scss']
})
export class OrderStoreComponent implements OnInit {
  productSalesList:ProductSalesBean[]=[];
  constructor(
    private restService:RestService,

  ) { }

  ngOnInit(): void {
    this.restService.requestApiRestData("productsales/glps",{}).subscribe(result =>{
      this.productSalesList=result.datalist;
    })
  }

}
