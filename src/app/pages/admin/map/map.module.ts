import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductMapComponent } from './product-map/product-map.component';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { ProductSalesMapComponent } from './product-sales-map/product-sales-map.component';
import { MaterialModule } from '../../../_material/material.module';
import { environment } from '../../../../environments/environment.prod';
import { ProductSalesPlaceMapComponent } from './product-sales-place-map/product-sales-place-map.component';
import { OrderMapComponent } from './order-map/order-map.component';
import { ViewProductsSalesMapComponent } from './view-products-sales-map/view-products-sales-map.component';
import { JobOfferMapComponent } from './job-offer-map/job-offer-map.component';
import { PlaceMapComponent } from './place-map/place-map.component';

@NgModule({
  declarations: [
    ProductMapComponent, 
    ProductSalesMapComponent, 
    ProductSalesPlaceMapComponent, 
    OrderMapComponent, ViewProductsSalesMapComponent, JobOfferMapComponent, PlaceMapComponent],
  imports: [
    CommonModule,
    MaterialModule,
    
    NgxMapboxGLModule.withConfig({
      accessToken:  environment.TOKEN_MAPBOX,   // Optional, can also be set per map (accessToken input of mgl-map)
      geocoderAccessToken:  environment.TOKEN_MAPBOX,   // Optional, specify if different from the map access token, can also be set per mgl-geocoder (accessToken input of mgl-geocoder)
    })
  ],
  exports:[

    ProductMapComponent,
    ProductSalesMapComponent,
    ProductSalesPlaceMapComponent
  
  ],
})
export class MapModule { }
