import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegistryComponent } from './registry/registry.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/_material/material.module';
import { CentralViewComponent } from './login/central-view/central-view.component';
import { ToolbarComponent } from '../public-view/toolbar/toolbar.component';
import { RightBannerComponent } from './login/right-banner/right-banner.component';
import { LeftBannerComponent } from './login/left-banner/left-banner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '', component: LoginComponent,
  },
  {
    path: 'login', component: LoginComponent,
  },
  {
    path: 'registry', component: RegistryComponent, 
  }
];

@NgModule({
  declarations: [
    LoginComponent,
    CentralViewComponent,
    RegistryComponent,

    ToolbarComponent,

    RightBannerComponent,

    LeftBannerComponent,

    
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),

    ReactiveFormsModule,
    FormsModule,
  ],
  exports:[
    LoginComponent
  ]
})
export class AuthorizationModule { }
