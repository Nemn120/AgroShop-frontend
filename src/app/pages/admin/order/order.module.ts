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
import { OrderPendingComponent } from './order-pending/order-pending.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

const routes: Routes = [
  {
    path: '', component:OrderStoreComponent},
    {path: 'list', component: OrderListComponent},
    {path: 'store', component: OrderStoreComponent},
    {path: 'pending', component: OrderPendingComponent},
    {path: 'search/:nameProduct', component: SearchProductComponent}
];

@NgModule({
  declarations: [OrderListComponent, OrderNewComponent, OrderStoreComponent, OrderStoreCardComponent, SearchProductComponent, OrderPendingComponent, OrderDetailsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    PanelAdminModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  entryComponents:[
    OrderDetailsComponent
  ],
})
export class OrderModule { }
