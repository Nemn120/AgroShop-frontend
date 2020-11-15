import { CategoriesFormComponent } from './../gestion/categories/categories-form/categories-form.component';
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
import { CategoriesListComponent } from '../gestion/categories/categories-list/categories-list.component';
import { CategoriesViewComponent } from '../gestion/categories/categories-view/categories-view.component';
const routes: Routes = [
  
    

   {path: 'list', component: ProductListComponent},//gestion productos

    //temporal
   {path: 'category', component: CategoriesListComponent}//gestion categorias
  
];

@NgModule({
  declarations: [
    ProductListComponent,
    ProductFormComponent,
    ProductViewComponent,

    //temporal
    CategoriesListComponent,
    CategoriesFormComponent,
    CategoriesViewComponent,
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
    //temporal
    CategoriesFormComponent,
    CategoriesViewComponent,
   ],
})
export class ProductModule { }
