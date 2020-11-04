import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderNewComponent } from './order-new/order-new.component';



@NgModule({
  declarations: [OrderListComponent, OrderNewComponent],
  imports: [
    CommonModule
  ]
})
export class OrderModule { }
