
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CompanyFormComponent } from './company-form/company-form.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { MaterialModule } from '../../../_material/material.module';
import { DriverComponent } from '../../driver/driver.component';
import { RouterModule, Routes } from '@angular/router';

@NgModule({
  declarations: [ CompanyFormComponent, CompanyListComponent, DriverComponent],
  imports: [
    CommonModule,
    MaterialModule
  ], exports: [DriverComponent]
})
export class CompanyModule { }
