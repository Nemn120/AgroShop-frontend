import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleComponent } from './vehicle/vehicle.component';
import { VehicleDetailComponent } from './vehicle/vehicle-detail/vehicle-detail.component';
import { NewVehicleComponent } from './vehicle/new-vehicle/new-vehicle.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/_material/material.module';
import { FormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: 'list', component: VehicleComponent,
  },
  {
    path: '', component: VehicleComponent,
  }

];
@NgModule({
  declarations: [VehicleComponent, VehicleDetailComponent, NewVehicleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FormsModule
  ],
  entryComponents: [VehicleDetailComponent,NewVehicleComponent]
})
export class VehicleModule { }
