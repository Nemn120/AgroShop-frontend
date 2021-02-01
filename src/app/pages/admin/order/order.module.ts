import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductMapComponent } from '../map/product-map/product-map.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/_material/material.module';
import { ExporterService } from 'src/app/_service/exporter.service';
import { MapModule } from '../map/map.module';
import { ProductSalesPlaceMapComponent } from '../map/product-sales-place-map/product-sales-place-map.component';
import { PanelAdminModule } from '../panel-admin/panel-admin.module';
import { ClientOrderPendingComponent } from './client-order-pending/client-order-pending.component';
import { ConfirmOrderComponent } from './confirm-order/confirm-order.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderNewComponent } from './order-new/order-new.component';
import { OrderPendingComponent } from './order-pending/order-pending.component';
import { OrderSearchComponent } from './order-search/order-search.component';
import { ViewProductsSalesMapComponent } from '../map/view-products-sales-map/view-products-sales-map.component';
import { JobOfferMapComponent } from '../map/job-offer-map/job-offer-map.component';

import { OrderCalendarComponent } from './order-calendar/order-calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { OrderReportComponent } from './order-report/order-report.component'; // a plugin
import { OrderStoreCardComponent } from './order-store-card/order-store-card.component';
import { OrderStoreComponent } from './order-store/order-store.component';
import { SearchProductComponent } from './search-product/search-product.component';
import { SendJobOfferComponent } from './send-job-offer/send-job-offer.component';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  timeGridPlugin
]);

const routes: Routes = [
  {
    path: '', component: OrderStoreComponent},
    {path: 'status', component: OrderListComponent},
    {path: 'store', component: OrderStoreComponent},
    {path: 'pending', component: OrderPendingComponent},
    {path: 'test', component: OrderSearchComponent},
    {path: 'clientPending', component:ClientOrderPendingComponent},
    {path: 'search/:nameProduct', component: SearchProductComponent},
    {path: 'confirm', component: ConfirmOrderComponent},
    {path: 'calendar', component: OrderCalendarComponent},
    {path: 'report', component: OrderReportComponent},
];
@NgModule({
  declarations: [OrderListComponent, OrderNewComponent, OrderStoreComponent, OrderStoreCardComponent, SearchProductComponent, OrderPendingComponent, OrderDetailsComponent, SendJobOfferComponent, OrderSearchComponent, ClientOrderPendingComponent, OrderCalendarComponent, OrderReportComponent,ConfirmOrderComponent],
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
  entryComponents: [
    OrderDetailsComponent,
    SendJobOfferComponent,
    ProductSalesPlaceMapComponent,
    ViewProductsSalesMapComponent,
    JobOfferMapComponent,
    ConfirmOrderComponent
  ],
  providers: [
    ExporterService
  ]
})
export class OrderModule { }
