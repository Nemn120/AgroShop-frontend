import { MaterialModule } from 'src/app/_material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogoConfirmacionComponent } from './dialogo-confirmacion/dialogo-confirmacion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { DataClientComponent } from './data-client/data-client.component';
import { PaymentComponent } from './payment/payment.component';



@NgModule({
  declarations: [DialogoConfirmacionComponent, OrderDetailComponent, DataClientComponent, PaymentComponent],
  imports: [

    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule

  ],
  exports:[
   DialogoConfirmacionComponent,OrderDetailComponent,DataClientComponent,PaymentComponent
  ],


})
export class SharedModule { }
