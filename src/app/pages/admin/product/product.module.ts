import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/_material/material.module';
import { PanelAdminModule } from '../panel-admin/panel-admin.module';
import { WelcomeComponent } from '../panel-admin/welcome/welcome.component';
const routes: Routes = [
  {
    path: '', component:WelcomeComponent},
    {path: 'list', component: ProductListComponent}
  
];

@NgModule({
  declarations: [ProductListComponent],
  imports: [
    CommonModule,
    MaterialModule,
    PanelAdminModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ],
})
export class ProductModule { }
