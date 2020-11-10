import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriverComponent } from './driver/driver.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/_material/material.module';

const routes: Routes = [
  { path: '', component: DriverComponent }
];

@NgModule({
  declarations: [DriverComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class DriverPanelModule { }
