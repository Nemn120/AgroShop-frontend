import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/_material/material.module';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule, Routes } from '@angular/router';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderModule } from '../order/order.module';

const routes: Routes = [
  //{path: 'profile', component: ProfileComponent},
  {path: 'profile/:id/:idFarmer', component: ProfileComponent}
]; 
@NgModule({
  declarations: [ProfileComponent, ProfileEditComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    OrderModule
  ],
  entryComponents: [ProfileEditComponent]
})
export class UserModule { }
