import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductMapComponent } from './product-map/product-map.component';

import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { ProductSalesMapComponent } from './product-sales-map/product-sales-map.component';
import { MaterialModule } from '../../../_material/material.module';

@NgModule({
  declarations: [ProductMapComponent, ProductSalesMapComponent],
  imports: [
    CommonModule,
    MaterialModule,
    
    NgxMapboxGLModule.withConfig({
      accessToken: 'pk.eyJ1Ijoiam9zZWNvbmRvcmk1IiwiYSI6ImNrZTR0cW5nZzB3bjkyeXBkZXlmank2a3kifQ.z8hPiaEmZpSaEV67dtKlkw', // Optional, can also be set per map (accessToken input of mgl-map)
      geocoderAccessToken: 'pk.eyJ1Ijoiam9zZWNvbmRvcmk1IiwiYSI6ImNrZTR0cW5nZzB3bjkyeXBkZXlmank2a3kifQ.z8hPiaEmZpSaEV67dtKlkw' // Optional, specify if different from the map access token, can also be set per mgl-geocoder (accessToken input of mgl-geocoder)
    })

  ],
  exports:[
    ProductMapComponent
  ],
})
export class MapModule { }
