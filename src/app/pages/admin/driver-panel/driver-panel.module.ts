import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriverComponent } from './driver/driver.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/_material/material.module';
import { InfoDriverComponent } from './info-driver/info-driver.component';
import { DriverProfileComponent } from './driver-profile/driver-profile.component';
import { DriveJobProfileComponent } from './drive-job-profile/drive-job-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'list', component: DriverComponent },
  //{ path: 'profile', component: DriverProfileComponent },
  { path: 'profileJob', component: DriveJobProfileComponent }
];

@NgModule({
  declarations: [DriverComponent, InfoDriverComponent, DriverProfileComponent, DriveJobProfileComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),

    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    RouterModule
  ],
  entryComponents: [ 
    InfoDriverComponent,
    DriveJobProfileComponent,
  ],
})
export class DriverPanelModule { }
