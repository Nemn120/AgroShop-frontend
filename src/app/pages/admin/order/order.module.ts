import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderNewComponent } from './order-new/order-new.component';
import { OrderStoreComponent } from './order-store/order-store.component';
import { MaterialModule } from 'src/app/_material/material.module';
import { PanelAdminModule } from '../panel-admin/panel-admin.module';
import { RouterModule, Routes } from '@angular/router';
import { OrderStoreCardComponent } from './order-store-card/order-store-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchProductComponent } from './search-product/search-product.component';
import { OrderPendingComponent } from './order-pending/order-pending.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { SendJobOfferComponent } from './send-job-offer/send-job-offer.component';
import { OrderSearchComponent } from './order-search/order-search.component';

const routes: Routes = [
  {
    path: '', component:OrderStoreComponent},
    {path: 'list', component: OrderListComponent},
    {path: 'store', component: OrderStoreComponent},
    {path: 'pending', component: OrderPendingComponent},
    {path: 'test', component: OrderSearchComponent},
    {path: 'search/:nameProduct', component: SearchProductComponent}
];

@NgModule({
  declarations: [OrderListComponent, OrderNewComponent, OrderStoreComponent, OrderStoreCardComponent, SearchProductComponent, OrderPendingComponent, OrderDetailsComponent, SendJobOfferComponent, OrderSearchComponent],
  imports: [
    CommonModule,
    MaterialModule,
    PanelAdminModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  entryComponents:[
    OrderDetailsComponent,SendJobOfferComponent
  ],
})
export class OrderModule { }
