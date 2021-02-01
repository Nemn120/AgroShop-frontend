import { CategoriesFormComponent } from './../gestion/categories/categories-form/categories-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/_material/material.module';
import { PanelAdminModule } from '../panel-admin/panel-admin.module';
import { ProductFormComponent } from './product-form/product-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductViewComponent } from './product-view/product-view.component';
import { CategoriesListComponent } from '../gestion/categories/categories-list/categories-list.component';
import { CategoriesViewComponent } from '../gestion/categories/categories-view/categories-view.component';
import { ProductsSalesFormComponent } from '../gestion/products-sales/products-sales-form/products-sales-form.component';
import { ProductsSalesListComponent } from '../gestion/products-sales/products-sales-list/products-sales-list.component';
import { ProductsSalesViewComponent } from '../gestion/products-sales/products-sales-view/products-sales-view.component';
import { MapModule } from '../map/map.module';
import { ProductMapComponent } from '../map/product-map/product-map.component';
import { ProductSalesMapComponent } from '../map/product-sales-map/product-sales-map.component';
const routes: Routes = [

   {path: 'list', component: ProductListComponent},//gestion productos
   {path: 'category', component: CategoriesListComponent},//gestion categorias
   {path: 'sales', component: ProductsSalesListComponent}//gestion productos venta

];

@NgModule({
  declarations: [
    ProductListComponent,
    ProductFormComponent,
    ProductViewComponent,
    CategoriesListComponent,
    CategoriesFormComponent,
    CategoriesViewComponent,
    ProductsSalesListComponent,
    ProductsSalesFormComponent,
    ProductsSalesViewComponent,

  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,

    MapModule,
  ],
  exports: [
    RouterModule
  ],
  entryComponents: [
    ProductFormComponent,
    ProductViewComponent,
    CategoriesFormComponent,
    CategoriesViewComponent,
    ProductsSalesFormComponent,
    ProductsSalesViewComponent,
    //map
    ProductMapComponent,
    ProductSalesMapComponent
   ],
})
export class ProductModule { }
