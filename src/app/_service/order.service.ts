import { Injectable } from '@angular/core';
import { OrderBean } from '../_model/OrderBean';
import { OrderDetailBean } from '../_model/OrderDetailBean';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  newOrder:OrderBean;
  orderDetailList:OrderDetailBean[]=[];
  constructor() { }


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
