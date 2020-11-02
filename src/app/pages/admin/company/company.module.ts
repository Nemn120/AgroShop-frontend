
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyFormComponent } from './company-form/company-form.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { DriverComponent } from './driver/driver.component';
import { MaterialModule } from '../../../_material/material.module';

const routes: Routes = [
  { path: '', component: DriverComponent }
];

@NgModule({
  declarations: [ CompanyFormComponent, CompanyListComponent, DriverComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule
  ]
})
export class CompanyModule { }
