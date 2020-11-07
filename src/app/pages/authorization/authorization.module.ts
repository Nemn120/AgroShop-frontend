import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegistryComponent } from './registry/registry.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/_material/material.module';
import { CentralViewComponent } from './login/central-view/central-view.component';
import { CentralContentComponent } from './login/central-view/central-content/central-content.component';

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
    CentralContentComponent,
    
    RegistryComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
  ],
  exports:[
    LoginComponent
  ]
})
export class AuthorizationModule { }
