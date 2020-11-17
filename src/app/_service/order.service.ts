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
  orderDetailListSelect:OrderDetailBean[]=[];
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
  }
  getCountItemsCar(){
    let totalquantity:number=0;
    this.orderDetailList.forEach(data =>{
      totalquantity+=data.quantity;
    })
    this.totalQuantitySubject.next(this.totalQuantity);
  }

  removeItemsCar(orderDetailSelect: OrderDetailBean[]){
    orderDetailSelect.forEach(x =>{
      this.orderDetailList= this.orderDetailList.filter(data => data.productSales.id != x.productSales.id)
    })
  }

  sendNewOrder(address:string,reference:string,phone:string){
    this.newOrder.address=address;
    this.newOrder.reference=reference;
    this.newOrder.phone=phone;
    this.newOrder.orderDetailList=this.orderDetailList;
    this.newOrder = new OrderBean();
    this.orderDetailList=[];
  }
}
