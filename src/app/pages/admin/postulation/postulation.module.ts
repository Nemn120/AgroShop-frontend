import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostulationListComponent } from './postulation-list/postulation-list.component';
import { MaterialModule } from 'src/app/_material/material.module';
import { RouterModule, Routes } from '@angular/router';
import { PostulationDetailComponent } from './postulation-detail/postulation-detail.component';
import { PostulationReplyComponent } from './postulation-reply/postulation-reply.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'list', component: PostulationListComponent},
  { path: '', component: PostulationListComponent }
];

@NgModule({
  declarations: [PostulationListComponent, PostulationDetailComponent, PostulationReplyComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FormsModule
  ],
  entryComponents: [ PostulationDetailComponent, PostulationReplyComponent ]
})
export class PostulationModule { }
