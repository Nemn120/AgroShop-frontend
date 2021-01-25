import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ProductBean } from 'src/app/_model/ProductBean';
import { RestService } from 'src/app/_service/rest.service';
import { SharedService } from 'src/app/_service/shared.service';
import { ProductSalesBean } from '../../../../_model/ProductSalesBean';
import { FarmerAndProductsDTO } from '../../../../_DTO/FarmerAndProductsDTO';
import { OrderDetailBean} from '../../../../_model/OrderDetailBean';
import { OrderService } from 'src/app/_service/order.service';

import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ViewProductsSalesMapComponent } from '../../map/view-products-sales-map/view-products-sales-map.component';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})
export class SearchProductComponent implements OnInit {


  quantity:number;
  productSearch: ProductSalesBean;
  farmerList: any;
  productList: any;
  param: any;
  flag: any;
  farmerWithProductsList: FarmerAndProductsDTO[] = [];

  constructor(
    private orderService: OrderService, 
    private sharedData:SharedService, 
    private sharedService: SharedService, 
    private restService: RestService, 
    private _activatedRoute:ActivatedRoute, 
    private sanitization: DomSanitizer,
    public dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.productSearch = new ProductSalesBean();
    this.productSearch.product = new ProductBean();
    this._activatedRoute.params.subscribe(params=>{
      this.productSearch.product.name=params['nameProduct'];
      this.farmerWithProductsList = [];
      const param = {
        data: this.productSearch
      }

      this.restService.requestApiRestData('productsales/glsps',param).subscribe(result=>{
          for(let [farmer,products] of Object.entries(result.dataMap)){
            this.activatedPhoto(products);
          }
          for(let [farmer, products] of Object.entries(result.dataMap)){
            let dto = new FarmerAndProductsDTO();
            dto._listOfProductsShowed = [];
            const dat ={
              id: farmer
            }
            for(let [key,value] of Object.entries(products)){
              dto._listOfProductsShowed.push(value);
            }
            this.restService.requestApiRestData('farmer/gfbi',dat).subscribe(result2=>{
              console.log(result2.data.user.username);
              dto._farmer = result2;
              console.log(dto._farmer);
              this.farmerWithProductsList.push(dto);
            })
          }

      })
    })
    console.log('products: ',this.farmerWithProductsList);
  }


  activatedPhoto(data:any){
    for(const m of data){
      this.restService.getPhotoById(m.product.id).subscribe(photo=>{
        const reader = new FileReader();
        reader.readAsDataURL(photo);
        reader.onloadend = () =>{
          const base64 = reader.result;
          m.product._foto = this.setterPhoto(base64);
          m.product._isFoto = true;
        };

      });
    }
  }

 public setterPhoto(data:any){
    return this.sanitization.bypassSecurityTrustResourceUrl(data);
  }

openMap(){
  this.dialog.open(ViewProductsSalesMapComponent, {
    width: '50%',
    height: '70%',
    data: this.farmerWithProductsList[0]._listOfProductsShowed,
  });
}

}
