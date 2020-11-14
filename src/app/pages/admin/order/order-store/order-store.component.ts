import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
    private sanitization: DomSanitizer  

  ) { }

  ngOnInit(): void {
    this.restService.requestApiRestData("productsales/glps",{}).subscribe(result =>{
      this.activatedPhoto(result.datalist);
      this.productSalesList=result.datalist; 
    }) 
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
}
