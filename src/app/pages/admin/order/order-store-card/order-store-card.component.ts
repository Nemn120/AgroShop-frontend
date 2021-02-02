import { Component, Input, OnInit } from '@angular/core';
import { OrderDetailBean } from 'src/app/_model/OrderDetailBean';
import { ProductBean } from 'src/app/_model/ProductBean';
import { ProductSalesBean } from 'src/app/_model/ProductSalesBean';
import { OrderService } from 'src/app/_service/order.service';
import { SharedService } from 'src/app/_service/shared.service';

import { MatDialog } from '@angular/material/dialog';
import { ProductSalesPlaceMapComponent } from '../../map/product-sales-place-map/product-sales-place-map.component';
@Component({
  selector: 'app-order-store-card',
  templateUrl: './order-store-card.component.html',
  styleUrls: ['./order-store-card.component.scss']
})
export class OrderStoreCardComponent implements OnInit {

  @Input() productSales: ProductSalesBean;
  quantity:number;
  imagenEstado: boolean = false;
  profile:string;

  constructor(
  private sharedData:SharedService,
  private orderService:OrderService,
  public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.profile = this.sharedData.userSession.user.typeUser;
  }

  addProduct(){
    if(this.productSales.quantitySelect>this.productSales.availableQuantity){
      this.sharedData.messageChange.next("La cantidad ingresada supera a la cantidad disponible")
      this.productSales.quantitySelect=null;
    }else{
      let orderDetailSelect= new OrderDetailBean();
    if(this.productSales.quantitySelect == null)
      this.productSales.quantitySelect=1;
    orderDetailSelect.quantity=Number(this.productSales.quantitySelect);
    orderDetailSelect.productSales=new ProductSalesBean();
    orderDetailSelect.productSales.id=this.productSales.id;
    orderDetailSelect.productSales.availableQuantity=this.productSales.availableQuantity;
    orderDetailSelect.productSales.farmerNumber=this.productSales.farmerNumber;
    orderDetailSelect.productSales.measureUnite=this.productSales.measureUnite;
    orderDetailSelect.productSales.product=new ProductBean();
    orderDetailSelect.productSales.product.id=this.productSales.product.id;
    orderDetailSelect.productSales.product.name=this.productSales.product.name;
    orderDetailSelect.price=this.productSales.price;
    orderDetailSelect.total=this.productSales.quantitySelect*this.productSales.price;
    orderDetailSelect._isFoto=this.productSales.product._isFoto;
    orderDetailSelect._foto=this.productSales.product._foto;
    this.orderService.addProductToCar(orderDetailSelect);
    this.sharedData.messageChange.next("Se agrego "+this.productSales.quantitySelect+" unidades al carrito");
    this.productSales.quantitySelect=null;


    }

  }


   //open map product
   openProductMap(productSales: ProductSalesBean){
    this.dialog.open(ProductSalesPlaceMapComponent, {
      width: '50%',
      height: '70%',
      data: productSales,
    });
  }

}
