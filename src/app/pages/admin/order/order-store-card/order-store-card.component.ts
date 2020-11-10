import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-store-card',
  templateUrl: './order-store-card.component.html',
  styleUrls: ['./order-store-card.component.scss']
})
export class OrderStoreCardComponent implements OnInit {

  quantity:number;
  constructor() { }

  ngOnInit(): void {
  }

  addProduct(){
    console.log(this.quantity);
  }

}
