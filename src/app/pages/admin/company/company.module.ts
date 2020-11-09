
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CompanyFormComponent } from './company-form/company-form.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { MaterialModule } from '../../../_material/material.module';
import { RouterModule, Routes } from '@angular/router';

@NgModule({
  declarations: [ CompanyFormComponent, CompanyListComponent],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class CompanyModule { }
