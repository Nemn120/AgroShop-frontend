import { MaterialModule } from 'src/app/_material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogoConfirmacionComponent } from './dialogo-confirmacion/dialogo-confirmacion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { DataClientComponent } from './data-client/data-client.component';
import { ProductMapComponent } from '../pages/admin/map/product-map/product-map.component';
import { MapModule } from '../pages/admin/map/map.module';
import { OrderMapComponent } from '../pages/admin/map/order-map/order-map.component';

@NgModule({
  declarations: [DialogoConfirmacionComponent, OrderDetailComponent, DataClientComponent],
  imports: [
    
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,

    MapModule,

  ],
  exports:[
   DialogoConfirmacionComponent,OrderDetailComponent,DataClientComponent,
  ],
  entryComponents:[
    OrderMapComponent
  ],
})
export class SharedModule { }