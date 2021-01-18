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
import { ProductMapComponent } from '../map/product-map/product-map.component';
import { MapModule } from '../map/map.module';
import { ProductSalesPlaceMapComponent } from '../map/product-sales-place-map/product-sales-place-map.component';
import { ClientOrderPendingComponent } from './client-order-pending/client-order-pending.component';
import { OrderSearchComponent } from './order-search/order-search.component';
import { ViewProductsSalesMapComponent } from '../map/view-products-sales-map/view-products-sales-map.component';
import { JobOfferMapComponent } from '../map/job-offer-map/job-offer-map.component';
import { OrderCalendarComponent } from './order-calendar/order-calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);


const routes: Routes = [
  {
    path: '', component:OrderStoreComponent}, 
    {path: 'list', component: OrderListComponent},
    {path: 'store', component: OrderStoreComponent},
    {path: 'pending', component: OrderPendingComponent},
    {path: 'clientPending', component:ClientOrderPendingComponent},
    {path: 'test', component: OrderSearchComponent},
    {path: 'calendar', component: OrderCalendarComponent},
    {path: 'search/:nameProduct', component: SearchProductComponent}
];

@NgModule({
  declarations: [OrderListComponent, OrderNewComponent, OrderStoreComponent, OrderStoreCardComponent, SearchProductComponent, OrderPendingComponent, OrderDetailsComponent, SendJobOfferComponent, OrderSearchComponent,ClientOrderPendingComponent, OrderCalendarComponent],
  imports: [
    CommonModule,
    MaterialModule,
    PanelAdminModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    FullCalendarModule,
    MapModule
  ],
  entryComponents:[
    OrderDetailsComponent,
    SendJobOfferComponent,
  
    ProductSalesPlaceMapComponent,
    ViewProductsSalesMapComponent,
    JobOfferMapComponent,
  ],
})
export class OrderModule { }
