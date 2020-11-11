import { Component, Input, OnInit } from '@angular/core';
import { OrderDetailBean } from 'src/app/_model/OrderDetailBean';
import { ProductBean } from 'src/app/_model/ProductBean';
import { ProductSalesBean } from 'src/app/_model/ProductSalesBean';
import { OrderService } from 'src/app/_service/order.service';
import { RestService } from 'src/app/_service/rest.service';
import { SharedService } from 'src/app/_service/shared.service';

@Component({
  selector: 'app-order-store-card',
  templateUrl: './order-store-card.component.html',
  styleUrls: ['./order-store-card.component.scss']
})
export class OrderStoreCardComponent implements OnInit {

  @Input() productSales: ProductSalesBean;
  quantity:number;
  constructor(
  private sharedData:SharedService,
  private orderService:OrderService
    
  ) { }

  ngOnInit(): void {

  }

  addProduct(){
    if(this.productSales.quantitySelect>this.productSales.totalQuantity){
      this.sharedData.messageChange.next("La cantidad ingresada supera a la cantidad disponible")
      this.productSales.quantitySelect=null;
    }else{
      let orderDetailSelect= new OrderDetailBean();
    orderDetailSelect.quantity=Number(this.productSales.quantitySelect);
    orderDetailSelect.productSales=new ProductSalesBean();
    orderDetailSelect.productSales.id=this.productSales.id;

    orderDetailSelect.productSales.product=new ProductBean();
    orderDetailSelect.productSales.product.id=this.productSales.product.id;
    orderDetailSelect.productSales.product.name=this.productSales.product.name;
    orderDetailSelect.price=this.productSales.price;
    orderDetailSelect.total=this.productSales.quantitySelect*this.productSales.price;
    this.orderService.addProductToCar(orderDetailSelect);
    this.sharedData.messageChange.next("Se agrego "+this.productSales.quantitySelect+" unidades al carrito");
    this.productSales.quantitySelect=null;
    
    }
    
  }

}
