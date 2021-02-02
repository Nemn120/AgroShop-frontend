import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegistryComponent } from './registry/registry.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/_material/material.module';
import { DriverFormContainerComponent } from './registry/driver-form-container/driver-form-container.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeftBannerComponent } from './login/left-banner/left-banner.component';
import { CentralViewComponent } from './login/central-view/central-view.component';
import { RightBannerComponent } from './login/right-banner/right-banner.component';
import { ToolbarComponent } from '../public-view/toolbar/toolbar.component';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

const routes: Routes = [
  {
    path: '', component: LoginComponent,
  },
  {
    path: 'login', component: LoginComponent,
  },
  {
    path: 'registry', component: RegistryComponent
  },
  {
    path: 'registry/:rol', component: RegistryComponent
  }
];

@NgModule({
  declarations: [LoginComponent,RegistryComponent,DriverFormContainerComponent,LeftBannerComponent,CentralViewComponent,RightBannerComponent,ToolbarComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    FormsModule,

    MatProgressSpinnerModule,
  ],
  exports:[
    LoginComponent, RegistryComponent,DriverFormContainerComponent
  ]
})
export class AuthorizationModule { }
