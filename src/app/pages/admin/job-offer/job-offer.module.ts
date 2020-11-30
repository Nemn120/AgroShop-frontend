import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OfferComponent } from './offer/offer.component';
import { MaterialModule } from 'src/app/_material/material.module';
import { FormsModule } from '@angular/forms';
import { OfferDetailComponent } from './offer-detail/offer-detail.component';

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
    FormsModule
  ],
  entryComponents: [OfferDetailComponent]
})
export class JobOfferModule { }
