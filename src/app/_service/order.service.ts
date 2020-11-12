import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { OrderBean } from '../_model/OrderBean';
import { OrderDetailBean } from '../_model/OrderDetailBean';
import { ProductBean } from '../_model/ProductBean';
import { ProductSalesBean } from '../_model/ProductSalesBean';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  newOrder:OrderBean;
  orderDetailList:OrderDetailBean[]=[];
  totalQuantity:number=0;
  totalQuantitySubject= new Subject<number>();
  constructor(
  
  ) { 
  }

  addProductToCar(orderDetail:OrderDetailBean){
    this.totalQuantity+=orderDetail.quantity
    this.totalQuantitySubject.next(this.totalQuantity);
    let indexProductSelect= this.orderDetailList.findIndex(x => x.productSales.id==orderDetail.productSales.id);
    if(indexProductSelect != -1){
      let totalProductQuantitySelect:number=this.orderDetailList[indexProductSelect].quantity+orderDetail.quantity;
      this.orderDetailList[indexProductSelect].quantity=totalProductQuantitySelect;
    }else{
      
      this.orderDetailList.push(orderDetail);
    }
    console.log(this.totalQuantity);

  }
  getCountItemsCar(){
    return this.totalQuantity;
  }


  sendNewOrder(address:string,reference:string,phone:string){
    this.newOrder.address=address;
    this.newOrder.reference=reference;
    this.newOrder.phone=phone;
    this.newOrder.orderDetailList=this.orderDetailList;
    console.log(this.newOrder);
    this.newOrder = new OrderBean();
    this.orderDetailList=[];
  }
}
