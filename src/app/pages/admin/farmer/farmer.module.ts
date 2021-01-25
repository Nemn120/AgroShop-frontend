import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PostulationDetailComponent } from '../farmer/postulation-detail/postulation-detail.component';
import { PostulationListComponent } from '../farmer/postulation-list/postulation-list.component';
import { MaterialModule } from './../../../_material/material.module';
import { FormContractComponent } from './form-contract/form-contract.component';
import { PostulationApplicantsDetailComponent } from './postulation-applicants-detail/postulation-applicants-detail.component';
import { PostulationApplicantsComponent } from './postulation-applicants/postulation-applicants.component';

const routes: Routes = [
  { path: 'list', component: PostulationListComponent},
  { path: '', component: PostulationListComponent }
];

@NgModule({
  declarations: [
    PostulationDetailComponent,
    PostulationListComponent,
    PostulationApplicantsComponent,
    PostulationApplicantsDetailComponent,
    FormContractComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FormsModule
  ],
  entryComponents: [
    PostulationDetailComponent,
    PostulationApplicantsComponent,
    PostulationApplicantsDetailComponent,
    FormContractComponent
  ]
})
export class FarmerModule { }
