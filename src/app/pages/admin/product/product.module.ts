import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/_material/material.module';
import { PanelAdminModule } from '../panel-admin/panel-admin.module';
import { WelcomeComponent } from '../panel-admin/welcome/welcome.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductViewComponent } from './product-view/product-view.component';
const routes: Routes = [
  {
    path: '', component:WelcomeComponent},
    {path: 'list', component: ProductListComponent}
  
];

@NgModule({
  declarations: [
    ProductListComponent,
    ProductFormComponent,
    ProductViewComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PanelAdminModule,
    RouterModule.forChild(routes),

    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    RouterModule
  ],
  entryComponents: [
    ProductFormComponent,
    ProductViewComponent,
   ],
})
export class ProductModule { }
