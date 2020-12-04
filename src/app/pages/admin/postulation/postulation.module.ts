import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostulationListComponent } from './postulation-list/postulation-list.component';
import { MaterialModule } from 'src/app/_material/material.module';
import { RouterModule, Routes } from '@angular/router';
import { PostulationDetailComponent } from './postulation-detail/postulation-detail.component';

const routes: Routes = [
  { path: 'list', component: PostulationListComponent},
  { path: '', component: PostulationListComponent }
];

@NgModule({
  declarations: [PostulationListComponent, PostulationDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule
  ],
  entryComponents: [ PostulationDetailComponent ]
})
export class PostulationModule { }
