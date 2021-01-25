import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OfferComponent } from './offer/offer.component';
import { MaterialModule } from 'src/app/_material/material.module';
import { FormsModule } from '@angular/forms';
import { OfferDetailComponent } from './offer-detail/offer-detail.component';
import { MapModule } from '../map/map.module';
import { MapComponent } from 'ngx-mapbox-gl';
import { PlaceMapComponent } from '../map/place-map/place-map.component';

const routes: Routes = [
  {
    path: 'offer', component: OfferComponent,
  },
  {
    path: '', component: OfferComponent,
  }
];

@NgModule({
  declarations: [OfferComponent, OfferDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FormsModule,

    MapModule,
  ],
  entryComponents: [
    OfferDetailComponent,
    MapComponent,
    PlaceMapComponent,
]
})
export class JobOfferModule { }
