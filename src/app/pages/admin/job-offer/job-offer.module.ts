import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OfferComponent } from './offer/offer.component';
import { MaterialModule } from 'src/app/_material/material.module';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: 'offer', component: OfferComponent,
  },
  {
    path: '', component: OfferComponent,
  }

];

@NgModule({
  declarations: [OfferComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FormsModule
  ]
})
export class JobOfferModule { }
