import { MaterialModule } from './../../../_material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PostulationListComponent } from '../farmer/postulation-list/postulation-list.component';
import { PostulationDetailComponent } from '../farmer/postulation-detail/postulation-detail.component';
import { PostulationApplicantsComponent } from './postulation-applicants/postulation-applicants.component';
import { PostulationApplicantsDetailComponent } from './postulation-applicants-detail/postulation-applicants-detail.component';

const routes: Routes = [
  { path: 'list', component: PostulationListComponent},
  { path: '', component: PostulationListComponent }
];

@NgModule({
  declarations: [PostulationDetailComponent, PostulationListComponent, PostulationApplicantsComponent, PostulationApplicantsDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FormsModule
  ],
  entryComponents: [PostulationDetailComponent, PostulationApplicantsComponent, PostulationApplicantsDetailComponent]
})
export class FarmerModule { }
