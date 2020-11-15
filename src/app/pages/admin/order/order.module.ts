import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderNewComponent } from './order-new/order-new.component';
import { OrderStoreComponent } from './order-store/order-store.component';
import { MaterialModule } from 'src/app/_material/material.module';
import { PanelAdminModule } from '../panel-admin/panel-admin.module';
import { RouterModule, Routes } from '@angular/router';
import { OrderStoreCardComponent } from './order-store-card/order-store-card.component';
import { FormsModule } from '@angular/forms';
import { SearchProductComponent } from './search-product/search-product.component';

const routes: Routes = [
  {
    path: '', component:OrderStoreComponent},
    {path: 'list', component: OrderListComponent},
    {path: 'store', component: OrderStoreComponent},
    {path: 'search/:nameProduct', component: SearchProductComponent}
];

@NgModule({
  declarations: [OrderListComponent, OrderNewComponent, OrderStoreComponent, OrderStoreCardComponent, SearchProductComponent],
  imports: [
    CommonModule,
    MaterialModule,
    PanelAdminModule,
    FormsModule,
    RouterModule.forChild(routes),
  ]
})
export class OrderModule { }
