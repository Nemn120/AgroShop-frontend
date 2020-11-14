import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegistryComponent } from './registry/registry.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/_material/material.module';
import { DriverFormContainerComponent } from './registry/driver-form-container/driver-form-container.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '', component: LoginComponent,
  },
  {
    path: 'login', component: LoginComponent,
  },
  {
    path: 'registry', component: RegistryComponent
  }
];

@NgModule({
  declarations: [LoginComponent,RegistryComponent,DriverFormContainerComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),

    ReactiveFormsModule,
    FormsModule,
  ],
  exports:[
    LoginComponent, RegistryComponent,DriverFormContainerComponent
  ]
})
export class AuthorizationModule { }
