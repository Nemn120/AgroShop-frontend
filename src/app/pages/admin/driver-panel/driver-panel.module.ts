import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriverComponent } from './driver/driver.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/_material/material.module';
import { InfoDriverComponent } from './info-driver/info-driver.component';

const routes: Routes = [
  { path: '', component: DriverComponent }
];

@NgModule({
  declarations: [DriverComponent, InfoDriverComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  entryComponents: [InfoDriverComponent]
})
export class DriverPanelModule { }
